import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getEventById } from "@/lib/events";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventId,
      participants,
      contactName,
      contactEmail,
      contactPhone,
      sessionIds,
    } = body as {
      eventId: string;
      participants: string[];
      contactName: string;
      contactEmail: string;
      contactPhone: string;
      sessionIds?: string[];
    };

    // --- Validation de base ---------------------------------------------
    const event = getEventById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
    }
    if (event.bookable === false) {
      return NextResponse.json(
        { error: "Cet événement n'est pas ouvert à la réservation." },
        { status: 400 }
      );
    }
    if (!Array.isArray(participants) || participants.length === 0) {
      return NextResponse.json(
        { error: "Au moins une participante est requise." },
        { status: 400 }
      );
    }
    if (participants.length > event.maxPerBooking) {
      return NextResponse.json(
        { error: `Maximum ${event.maxPerBooking} participantes par réservation.` },
        { status: 400 }
      );
    }
    if (!contactName || !contactEmail || !contactPhone) {
      return NextResponse.json(
        { error: "Coordonnées incomplètes." },
        { status: 400 }
      );
    }
    if (event.sessions) {
      const validIds = new Set(event.sessions.map((s) => s.id));
      if (
        !Array.isArray(sessionIds) ||
        sessionIds.length === 0 ||
        sessionIds.some((id) => !validIds.has(id))
      ) {
        return NextResponse.json(
          { error: "Merci de choisir au moins un créneau valide." },
          { status: 400 }
        );
      }
    }

    const numParticipants = participants.length;

    // --- Vérification des places restantes --------------------------------
    const { data: confirmedRows, error: fetchError } = await supabaseAdmin
      .from("reservations")
      .select("num_participants, session_ids")
      .eq("event_id", eventId)
      .eq("status", "confirmed");

    if (fetchError) {
      console.error("Erreur Supabase (fetch availability):", fetchError.message);
      return NextResponse.json(
        { error: "Erreur serveur. Réessaie dans un instant." },
        { status: 500 }
      );
    }

    let spotsLeft: number;
    if (event.sessions) {
      // Capacité indépendante par créneau : une réservation qui couvre
      // plusieurs créneaux est limitée par le plus juste d'entre eux.
      const bookedBySession = new Map<string, number>();
      for (const row of confirmedRows ?? []) {
        for (const sid of (row.session_ids ?? []) as string[]) {
          bookedBySession.set(sid, (bookedBySession.get(sid) ?? 0) + row.num_participants);
        }
      }
      const remainingPerSession = sessionIds!.map((sid) => {
        const session = event.sessions!.find((s) => s.id === sid)!;
        return session.maxParticipants - (bookedBySession.get(sid) ?? 0);
      });
      spotsLeft = Math.min(...remainingPerSession);
    } else {
      const alreadyBooked = (confirmedRows ?? []).reduce(
        (sum, r) => sum + r.num_participants,
        0
      );
      spotsLeft = event.maxParticipants - alreadyBooked;
    }

    if (numParticipants > spotsLeft) {
      return NextResponse.json(
        {
          error:
            spotsLeft <= 0
              ? "Cet événement est complet."
              : `Il ne reste que ${spotsLeft} place(s) pour ce choix de créneau.`,
        },
        { status: 409 }
      );
    }

    // --- Calcul du montant ------------------------------------------------
    const totalPrice = event.pricePerPerson * numParticipants;

    // --- Création de la session Stripe Checkout ------------------------------
    // On génère l'id de la réservation nous-mêmes (au lieu de laisser
    // Supabase le générer à l'insertion) pour pouvoir le passer à Stripe
    // dès la création de la session, et n'avoir qu'un seul insert ensuite
    // — pas d'aller-retour supplémentaire pour rattacher stripe_session_id.
    const reservationId = randomUUID();

    const sessionLabel = event.sessions
      ? sessionIds!
          .map((id) => event.sessions!.find((s) => s.id === id)?.label)
          .filter(Boolean)
          .join(" + ")
      : null;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: contactEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: Math.round(totalPrice * 100), // en centimes
            product_data: {
              name: `${event.title} (${numParticipants} participante${numParticipants > 1 ? "s" : ""})`,
              description: sessionLabel
                ? `${event.venue}, ${event.date} — ${sessionLabel}.`
                : `${event.venue}, ${event.date} à ${event.time}.`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        reservation_id: reservationId,
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?booking=cancelled`,
    });

    // --- Création de la réservation "pending" --------------------------------
    const { error: insertError } = await supabaseAdmin.from("reservations").insert({
      id: reservationId,
      event_id: event.id,
      event_title: event.title,
      event_date: event.date,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      participants,
      num_participants: numParticipants,
      total_price: totalPrice,
      status: "pending",
      stripe_session_id: session.id,
      session_ids: event.sessions ? sessionIds : null,
    });

    if (insertError) {
      console.error("Erreur Supabase (insert):", insertError.message);
      return NextResponse.json(
        { error: "Impossible de créer la réservation. Réessaie." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Erreur /api/checkout:", err);
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue." },
      { status: 500 }
    );
  }
}
