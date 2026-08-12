import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventsGrid, { EventWithAvailability } from "@/components/EventsGrid";
import { events } from "@/lib/events";
import { supabaseAdmin } from "@/lib/supabase";

// Toujours recalculer les places disponibles à la demande (pas de cache statique)
export const dynamic = "force-dynamic";

async function getEventsWithAvailability(): Promise<EventWithAvailability[]> {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("event_id, num_participants")
    .eq("status", "confirmed");

  if (error) {
    // En cas de souci Supabase, on affiche quand même le site avec la capacité max
    console.error("Erreur Supabase (availability):", error.message);
    return events.map((e) => ({ ...e, spotsLeft: e.maxParticipants }));
  }

  const bookedByEvent = new Map<string, number>();
  for (const row of data ?? []) {
    bookedByEvent.set(
      row.event_id,
      (bookedByEvent.get(row.event_id) ?? 0) + row.num_participants
    );
  }

  return events.map((e) => ({
    ...e,
    spotsLeft: Math.max(0, e.maxParticipants - (bookedByEvent.get(e.id) ?? 0)),
  }));
}

export default async function Home() {
  const eventsWithAvailability = await getEventsWithAvailability();

  return (
    <main>
      <Header />
      <EventsGrid events={eventsWithAvailability} />
      <Footer />
    </main>
  );
}
