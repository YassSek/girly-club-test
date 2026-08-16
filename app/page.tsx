import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventsGrid, { EventWithAvailability } from "@/components/EventsGrid";
import { events } from "@/lib/events";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getEventsWithAvailability(): Promise<EventWithAvailability[]> {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("event_id, num_participants, session_ids")
    .eq("status", "confirmed");

  if (error) {
    console.error("Erreur Supabase (availability):", error.message);
    return events.map((e) => ({
      ...e,
      spotsLeft: e.maxParticipants,
      sessionsAvailability: e.sessions?.map((s) => ({
        id: s.id,
        spotsLeft: s.maxParticipants,
      })),
    }));
  }

  const bookedByEvent = new Map<string, number>();
  const bookedBySession = new Map<string, number>();
  for (const row of data ?? []) {
    bookedByEvent.set(
      row.event_id,
      (bookedByEvent.get(row.event_id) ?? 0) + row.num_participants
    );
    for (const sessionId of (row.session_ids ?? []) as string[]) {
      const key = `${row.event_id}:${sessionId}`;
      bookedBySession.set(key, (bookedBySession.get(key) ?? 0) + row.num_participants);
    }
  }

  return events.map((e) => {
    if (e.sessions) {
      const sessionsAvailability = e.sessions.map((s) => ({
        id: s.id,
        spotsLeft: Math.max(
          0,
          s.maxParticipants - (bookedBySession.get(`${e.id}:${s.id}`) ?? 0)
        ),
      }));
      const spotsLeft = sessionsAvailability.reduce((sum, s) => sum + s.spotsLeft, 0);
      return { ...e, spotsLeft, sessionsAvailability };
    }

    return {
      ...e,
      spotsLeft: Math.max(0, e.maxParticipants - (bookedByEvent.get(e.id) ?? 0)),
    };
  });
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
