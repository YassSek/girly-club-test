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
    } = body as {
      eventId: string;
      participants: string[];
      contactName: string;
      contactEmail: string;
      contactPhone: string;
    };

    // --- Validation de base ---------------------------------------------
    const event = getEventById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
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

    const numParticipants = participants.length;

    // --- Vérification des places restantes --------------------------------
    const { data: confirmedRows, error: fetchError } = await supabaseAdmin
      .from("reservations")
      .select("num_participants")
      .eq("event_id", eventId)
      .eq("status", "confirmed");

    if (fetchError) {
      console.error("Erreur Supabase (fetch availability):", fetchError.message);
      return NextResponse.json(
        { error: "Erreur serveur. Réessaie dans un instant." },
        { status: 500 }
      );
    }

    const alreadyBooked = (confirmedRows ?? []).reduce(
      (sum, r) => sum + r.num_participants,
      0
    );
    const spotsLeft = event.maxParticipants - alreadyBooked;

    if (numParticipants > spotsLeft) {
      return NextResponse.json(
        {
          error:
            spotsLeft <= 0
              ? "Cet événement est complet."
              : `Il ne reste que ${spotsLeft} place(s) pour cet événement.`,
        },
        { status: 409 }
      );
    }

    // --- Calcul du montant ------------------------------------------------
    const totalPrice = event.pricePerPerson * numParticipants;

    // --- Création de la réservation "pending" --------------------------------
    const { data: reservation, error: insertError } = await supabaseAdmin
      .from("reservations")
      .insert({
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
      })
      .select()
      .single();

    if (insertError || !reservation) {
      console.error("Erreur Supabase (insert):", insertError?.message);
      return NextResponse.json(
        { error: "Impossible de créer la réservation. Réessaie." },
        { status: 500 }
      );
    }

    // --- Création de la session Stripe Checkout ------------------------------
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
              description: `${event.venue}, ${event.date} à ${event.time}.`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        reservation_id: reservation.id,
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?booking=cancelled`,
    });

    // On rattache l'id de session Stripe à la réservation
    await supabaseAdmin
      .from("reservations")
      .update({ stripe_session_id: session.id })
      .eq("id", reservation.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Erreur /api/checkout:", err);
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue." },
      { status: 500 }
    );
  }
}
