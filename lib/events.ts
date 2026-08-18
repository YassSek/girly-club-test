import { Locale, translateDateLike } from "./i18n/translations";

export type EventSession = {
  id: string;
  label: string;
  maxParticipants: number;
  en?: {
    label?: string;
  };
};

export type GirlyEvent = {
  id: string;
  title: string;
  city: string;
  venue: string;
  date: string;
  time: string;
  pricePerPerson: number;
  maxParticipants: number;
  maxPerBooking: number;
  description: string;
  image: string;
  en?: {
    title?: string;
    city?: string;
    venue?: string;
    description?: string;
  };
  sessions?: EventSession[];
  bookable?: boolean;
  includedNotice?: { fr: string; en: string };
};

export const events: GirlyEvent[] = [
  {
    id: "pilates-bateau-cannes",
    title: "Pilates on a Boat",
    city: "Cannes",
    venue: "Port de Cannes",
    date: "25 août 2026",
    time: "10h-14h ou 14h30-18h",
    pricePerPerson: 125,
    maxParticipants: 15,
    maxPerBooking: 4,
    description:
      "Une journée en mer au départ de Cannes, entre Pilates, brunch, baignade et moments entre girls — deux sessions au choix (10h-14h ou 14h30-18h). Une expérience pensée pour profiter de la French Riviera, prendre soin de soi et rencontrer la communauté The Girly Club.\n\nVotre ticket comprend :\n• Séance de Pilates sur le bateau\n• Matériel de Pilates fourni\n• Navigation au départ de Cannes\n• Brunch & boissons\n• Baignade & temps libre à bord\n• Goodie bag The Girly Club\n\nEt parce que la journée ne s'arrête pas au retour au port… votre ticket inclut dès 20h une entrée au The Bloom, sur la Croisette, pour prolonger l'expérience The Girly Club dans un espace entièrement privatisé pour nos participantes. 🍒",
    image: "/images/events/pilates-bateau-cannes.jpg",
    en: {
      title: "Pilates on a Boat",
      venue: "Cannes Harbour",
      description:
        "A day at sea from Cannes — Pilates, brunch, swimming and quality time between girls, with two sessions to choose from (10am-2pm or 2:30pm-6pm). An experience designed to enjoy the French Riviera, take care of yourself and meet the Girly Club community.\n\nYour ticket includes:\n• Pilates session on the boat\n• Pilates equipment provided\n• Departure from Cannes\n• Brunch & drinks\n• Swimming & free time on board\n• The Girly Club goodie bag\n\nAnd because the day doesn't stop once you're back at the harbour… your ticket includes entry to The Bloom on La Croisette from 8pm, to keep the Girly Club experience going in a space fully privatised for our guests. 🍒",
    },
    sessions: [
      {
        id: "matin",
        label: "Matin · 10h-14h",
        maxParticipants: 7,
        en: { label: "Morning · 10am-2pm" },
      },
      {
        id: "apres-midi",
        label: "Après-midi · 14h30-18h",
        maxParticipants: 8,
        en: { label: "Afternoon · 2:30pm-6pm" },
      },
    ],
  },
  {
    id: "pilates-piscine-cannes",
    title: "Pilates Pool Day",
    city: "Cannes",
    venue: "Villa privée avec piscine — à 20 min de Cannes (côté Mandelieu)",
    date: "26 août 2026",
    time: "10h30-14h30",
    pricePerPerson: 75,
    maxParticipants: 20,
    maxPerBooking: 4,
    description:
      "Une parenthèse bien-être dans une villa privée avec piscine, à seulement 20 minutes de Cannes (côté Mandelieu).\n\n🕥 Accueil à 10h30 - Fin à 14h30\n\nVotre ticket comprend :\n• 1h de Pilates avec une coach privée\n• Matériel de Pilates fourni\n• Accès à la villa et à la piscine privatisée\n• Brunch & boissons\n• Baignade & moment de détente au bord de la piscine\n• Goodie bag The Girly Club\n• Un moment privilégié pour rencontrer et profiter avec la communauté The Girly Club\n\nAprès le Pilates et le brunch, place au pool time : baignade, soleil, musique et détente entre filles dans une villa entièrement privatisée pour l'occasion. 🍒",
    image: "/images/events/pilates-piscine-cannes.jpg",
    en: {
      title: "Pilates Pool Day",
      venue: "Private villa with pool — 20 min from Cannes (Mandelieu side)",
      description:
        "A wellness break in a private villa with a pool, just 20 minutes from Cannes (Mandelieu side).\n\n🕥 Arrival at 10:30am - End at 2:30pm\n\nYour ticket includes:\n• 1h Pilates class with a private coach\n• Pilates equipment provided\n• Access to the villa and the private pool\n• Brunch & drinks\n• Swimming & relaxation by the pool\n• The Girly Club goodie bag\n• A special moment to meet and enjoy the Girly Club community\n\nAfter Pilates and brunch, it's pool time: swimming, sun, music and relaxation between girls in a villa fully privatised for the occasion. 🍒",
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
    bookable: false,
    includedNotice: {
      fr: "Cet after-pilates est un événement privé, inclus automatiquement pour les participantes ayant réservé Pilates on a Boat ou Pilates Pool Day le 25 ou 26 août. Aucune réservation supplémentaire n'est nécessaire ici — ta place est déjà garantie via ta réservation.",
      en: "This after-pilates is a private event, automatically included for guests who booked Pilates on a Boat or Pilates Pool Day on August 25 or 26. No separate booking is needed here — your spot is already secured through your booking.",
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
    bookable: false,
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
    bookable: false,
  },
];

export function getEventById(id: string): GirlyEvent | undefined {
  return events.find((e) => e.id === id);
}

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
    sessions: event.sessions?.map((s) => ({
      id: s.id,
      maxParticipants: s.maxParticipants,
      label: locale === "en" ? s.en?.label ?? s.label : s.label,
    })),
  };
}
