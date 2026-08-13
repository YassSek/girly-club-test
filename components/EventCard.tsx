"use client";

import { useState } from "react";
import Image from "next/image";
import { GirlyEvent, localizeEvent } from "@/lib/events";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Props = {
  event: GirlyEvent;
  spotsLeft: number;
  onSelect: () => void;
};

export default function EventCard({ event, spotsLeft, onSelect }: Props) {
  const isFull = spotsLeft <= 0;
  const [expanded, setExpanded] = useState(false);
  const { locale, t } = useLanguage();
  const L = localizeEvent(event, locale);

  return (
    <div className="group flex w-[300px] shrink-0 snap-start flex-col overflow-hidden border border-ink/10 bg-paper text-left transition-shadow duration-300 hover:shadow-xl sm:w-[340px]">
      {/* Visuel — cliquable pour réserver */}
      <button
        type="button"
        onClick={onSelect}
        disabled={isFull}
        aria-label={isFull ? t.eventCard.fullAria(L.title) : t.eventCard.bookAria(L.title)}
        className="relative block aspect-[900/1272] w-full appearance-none overflow-hidden border-0 bg-ink p-0 disabled:cursor-not-allowed"
      >
        {event.image ? (
          <Image
            src={event.image}
            alt={L.title}
            fill
            sizes="(max-width: 640px) 300px, 340px"
            quality={90}
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-end bg-gradient-to-br from-ink via-bordeaux to-ink p-6">
            <div>
              <p className="text-xs uppercase tracking-widest2 text-paper/70">
                {L.city}
              </p>
              <p className="mt-2 font-vibes text-4xl text-paper">{L.title}</p>
            </div>
          </div>
        )}
      </button>

      {/* Infos — le texte reste tronqué par défaut (même hauteur pour
          toutes les cartes) ; "Voir les détails" déplie le texte complet
          et ne déforme que la carte concernée. */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="line-clamp-1 text-xs uppercase tracking-widest2 text-bordeaux">
          {L.city} · {L.date}
        </p>
        <h3
          className={`text-xl font-bold uppercase ${
            expanded ? "" : "line-clamp-1"
          }`}
        >
          {L.title}
        </h3>
        <p
          className={`text-sm italic text-ink/60 ${
            expanded ? "" : "line-clamp-1"
          }`}
        >
          {L.venue}
        </p>
        <p
          className={`whitespace-pre-line text-sm leading-relaxed text-ink/80 ${
            expanded ? "" : "line-clamp-2"
          }`}
        >
          {L.description}
        </p>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="self-start text-xs font-bold uppercase tracking-widest2 text-bordeaux underline underline-offset-4 hover:opacity-70"
        >
          {expanded ? t.eventCard.seeLess : t.eventCard.seeDetails}
        </button>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm">
            {t.eventCard.from}{" "}
            <span className="font-bold text-bordeaux">
              {event.pricePerPerson}€
            </span>{" "}
            {t.eventCard.perPerson}
          </span>
          <span className="text-xs uppercase tracking-widest2 text-ink/50">
            {isFull ? t.eventCard.full : t.eventCard.spot(spotsLeft)}
          </span>
        </div>

        <button
          type="button"
          onClick={onSelect}
          disabled={isFull}
          className="btn-bordeaux mt-2 block w-full px-5 py-2 text-center text-xs font-bold uppercase tracking-widest2"
        >
          {isFull ? t.eventCard.full : t.eventCard.book}
        </button>
      </div>
    </div>
  );
}
