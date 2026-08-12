// -----------------------------------------------------------------------
// Les événements du Girly Club.
// Pas de panneau d'admin pour l'instant : pour ajouter, modifier ou retirer
// un événement, modifie simplement ce fichier puis redéploie le site.
//
// `image` : laisse vide ("") pour un placeholder élégant en attendant tes
// vraies photos, ou mets une URL (ex: depuis Supabase Storage) une fois
// prêtes.
//
// `en` : traduction anglaise optionnelle, pour la version EN du site
// (bouton FR/EN dans la navbar). Si tu ne remplis pas `en` pour un nouvel
// événement, le site affichera simplement le texte français par défaut
// même en mode EN — rien ne casse, mais pense à la compléter pour une
// vraie expérience bilingue. `date`/`time` sont traduits automatiquement
// (voir lib/i18n/translations.ts) tant qu'ils gardent le format habituel
// ("25 août 2026", "à confirmer"...).
// -----------------------------------------------------------------------

import { Locale, translateDateLike } from "./i18n/translations";

export type GirlyEvent = {
  id: string;
  title: string;
  city: string;
  venue: string;
  date: string; // format lisible, ex: "14 septembre 2026"
  time: string; // ex: "10h00"
  pricePerPerson: number; // en euros
  maxParticipants: number;
  maxPerBooking: number; // nb max de participantes par réservation individuelle
  description: string;
  image: string;
  en?: {
    title?: string;
    city?: string;
    venue?: string;
    description?: string;
  };
};

export const events: GirlyEvent[] = [
  {
    id: "pilates-bateau-cannes",
    title: "Pilates sur Bateau",
    city: "Cannes",
    venue: "À bord d'un bateau d'exception",
    date: "25 août 2026",
    time: "à confirmer",
    pricePerPerson: 65,
    maxParticipants: 16,
    maxPerBooking: 4,
    description:
      "Une séance de Pilates au soleil, à bord d'un bateau d'exception. Le temps d'un moment entre girls.",
    image: "/images/events/pilates-bateau-cannes.jpg",
    en: {
      title: "Pilates on a Boat",
      venue: "Aboard an exceptional boat",
      description:
        "A sun-soaked Pilates session aboard an exceptional boat. A moment to share between girls.",
    },
  },
  {
    id: "pilates-piscine-cannes",
    title: "Pilates à la Piscine",
    city: "Cannes",
    venue: "Au bord d'une magnifique piscine",
    date: "26 août 2026",
    time: "à confirmer",
    pricePerPerson: 55,
    maxParticipants: 20,
    maxPerBooking: 4,
    description:
      "Une séance de Pilates au soleil, au bord d'une magnifique piscine à Cannes. Un moment privilégié entre girls.",
    image: "/images/events/pilates-piscine-cannes.jpg",
    en: {
      title: "Poolside Pilates",
      venue: "By a stunning swimming pool",
      description:
        "A sun-soaked Pilates session by a stunning pool in Cannes. A special moment to share between girls.",
    },
  },
  {
    id: "after-pilates-bloom-concept-cannes",
    title: "After-Pilates x Bloom Concept",
    city: "Cannes",
    venue: "Bloom Concept, La Croisette",
    date: "25 août 2026",
    time: "20h00",
    pricePerPerson: 25,
    maxParticipants: 30,
    maxPerBooking: 6,
    description:
      "Après notre séance de Pilates à bord d'un bateau d'exception, retrouvez-nous au Bloom Concept sur la Croisette pour prolonger l'expérience — même sans avoir réservé la séance à bord.",
    image: "/images/events/bloom-concept-after-pilates-cannes.jpg",
    en: {
      title: "After-Pilates x Bloom Concept",
      venue: "Bloom Concept, La Croisette",
      description:
        "After our Pilates session aboard an exceptional boat, join us at Bloom Concept on La Croisette to keep the experience going — even if you didn't book the session on board.",
    },
  },
  {
    id: "pilates-bateau-paris",
    title: "Pilates sur Bateau",
    city: "Paris",
    venue: "À bord d'un bateau d'exception, la Seine",
    date: "Date à venir",
    time: "à confirmer",
    pricePerPerson: 65,
    maxParticipants: 16,
    maxPerBooking: 4,
    description:
      "Un cours de Pilates exclusif à bord d'un bateau d'exception, entre mouvement, soleil et douceur parisienne.",
    image: "/images/events/pilates-bateau-paris.jpg",
    en: {
      title: "Pilates on a Boat",
      venue: "Aboard an exceptional boat, on the Seine",
      description:
        "An exclusive Pilates class aboard an exceptional boat, between movement, sunshine and Parisian charm.",
    },
  },
  {
    id: "pilates-bruxelles",
    title: "Cours de Pilates",
    city: "Bruxelles",
    venue: "Lieu d'exception au cœur de Bruxelles",
    date: "Date à venir",
    time: "à confirmer",
    pricePerPerson: 55,
    maxParticipants: 16,
    maxPerBooking: 4,
    description:
      "Un moment privilégié entre girls, dans un lieu d'exception au cœur de Bruxelles, autour d'un cours de Pilates pensé pour se retrouver, bouger et profiter.",
    image: "/images/events/pilates-bruxelles.jpg",
    en: {
      title: "Pilates Class",
      city: "Brussels",
      venue: "Exceptional venue in the heart of Brussels",
      description:
        "A special moment between girls, in an exceptional venue in the heart of Brussels, around a Pilates class designed to reconnect, move and enjoy.",
    },
  },
];

export function getEventById(id: string): GirlyEvent | undefined {
  return events.find((e) => e.id === id);
}

// Renvoie les champs d'un événement dans la langue demandée (voir le champ
// `en` ci-dessus et lib/i18n/translations.ts pour la traduction des
// dates/horaires).
export function localizeEvent(event: GirlyEvent, locale: Locale) {
  const en = event.en;
  return {
    title: locale === "en" ? en?.title ?? event.title : event.title,
    city: locale === "en" ? en?.city ?? event.city : event.city,
    venue: locale === "en" ? en?.venue ?? event.venue : event.venue,
    description:
      locale === "en" ? en?.description ?? event.description : event.description,
    date: translateDateLike(event.date, locale),
    time: translateDateLike(event.time, locale),
  };
}
