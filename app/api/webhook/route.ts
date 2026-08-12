import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET manquant.");
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("Signature manquante.");
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Signature Stripe invalide:", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const reservationId = session.metadata?.reservation_id;

    if (reservationId) {
      const { error } = await supabaseAdmin
        .from("reservations")
        .update({
          status: "confirmed",
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
        })
        .eq("id", reservationId);

      if (error) {
        console.error("Erreur Supabase (confirm reservation):", error.message);
        // On renvoie quand même 200 pour ne pas faire boucler Stripe indéfiniment ;
        // à surveiller manuellement via les logs si ça arrive.
      }
    }
  }

  return NextResponse.json({ received: true });
}
