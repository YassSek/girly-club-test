import { supabaseAdmin } from "@/lib/supabase";
import SuccessContent from "@/components/SuccessContent";

export const dynamic = "force-dynamic";

async function getReservation(sessionId: string) {
  const { data } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .single();
  return data;
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  const reservation = sessionId ? await getReservation(sessionId) : null;

  return <SuccessContent sessionId={sessionId} reservation={reservation} />;
}
