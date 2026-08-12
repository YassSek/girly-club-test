"use client";

import { useState } from "react";
import { GirlyEvent } from "@/lib/events";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import EventCard from "./EventCard";
import BookingModal from "./BookingModal";

export type EventWithAvailability = GirlyEvent & { spotsLeft: number };

export default function EventsGrid({
  events,
}: {
  events: EventWithAvailability[];
}) {
  const [selected, setSelected] = useState<EventWithAvailability | null>(
    null
  );
  const { t } = useLanguage();

  return (
    <>
      <section id="experiences" className="py-20">
        <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
          <p className="text-xs uppercase tracking-widest2 text-bordeaux">
            {t.eventsGrid.kicker}
          </p>
          <h2 className="mt-2 text-3xl font-bold uppercase sm:text-4xl">
            {t.eventsGrid.title}
          </h2>
        </div>

        {/* Toutes les cartes sur une seule ligne, défilement horizontal fluide */}
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {events.map((event, i) => (
            <div
              key={event.id}
              className="animate-fade-up shrink-0"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <EventCard
                event={event}
                spotsLeft={event.spotsLeft}
                onSelect={() => setSelected(event)}
              />
            </div>
          ))}
        </div>
      </section>

      {selected && (
        <BookingModal
          event={selected}
          spotsLeft={selected.spotsLeft}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
