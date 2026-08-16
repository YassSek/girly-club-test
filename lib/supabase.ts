import { createClient } from "@supabase/supabase-js";

// -----------------------------------------------------------------------
// Ce client utilise la clé "service_role" : il ne doit JAMAIS être importé
// dans un composant client ("use client") ni exposé au navigateur.
// Il n'est utilisé que côté serveur : Server Components, Route Handlers
// (app/api/.../route.ts).
// -----------------------------------------------------------------------

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Variables d'environnement Supabase manquantes (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). Vérifie ton fichier .env.local."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type ReservationRow = {
  id: string;
  event_id: string;
  event_title: string;
  event_date: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  participants: string[];
  num_participants: number;
  total_price: number;
  session_ids: string[] | null;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  status: ReservationStatus;
  created_at: string;
};
