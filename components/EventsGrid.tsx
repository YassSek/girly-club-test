"use client";

import { useState } from "react";
import { GirlyEvent } from "@/lib/events";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import EventCard from "./EventCard";
import BookingModal from "./BookingModal";

export type EventWithAvailability = GirlyEvent & {
  spotsLeft: number;
  sessionsAvailability?: { id: string; spotsLeft: number }[];
};

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
      <section id="experiences" className="pb-20 pt-10 sm:pt-14">
        <div className="mx-auto mb-3 max-w-6xl px-6 text-center">
          <p className="text-xs uppercase tracking-widest2 text-bordeaux">
            {t.eventsGrid.kicker}
          </p>
          <h2 className="mt-2 text-3xl font-bold uppercase sm:text-4xl">
            {t.eventsGrid.title}
          </h2>
        </div>

        {/* Petit repère qui indique qu'on peut glisser horizontalement */}
        <p className="mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-widest2 text-ink/40">
          {t.eventsGrid.swipeHint}
          <span aria-hidden className="animate-swipe-hint inline-block">
            →
          </span>
        </p>

        {/* Toutes les cartes sur une seule ligne, défilement horizontal fluide.
            Le padding gauche est plus généreux pour que la première carte
            paraisse centrée plutôt que collée au bord. */}
        <div className="relative">
          <div className="flex snap-x snap-mandatory scroll-px-8 gap-6 overflow-x-auto px-8 pb-4 sm:scroll-px-16 sm:px-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
          {/* Léger fondu sur le bord droit pour suggérer qu'il y a d'autres
              cartes hors champ */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-paper to-transparent sm:block"
          />
        </div>
      </section>

      {selected && (
        <BookingModal
          event={selected}
          spotsLeft={selected.spotsLeft}
          sessionsAvailability={selected.sessionsAvailability}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
