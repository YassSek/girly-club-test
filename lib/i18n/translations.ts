// -----------------------------------------------------------------------
// Dictionnaire FR / EN pour tous les textes fixes de l'interface (nav,
// header, footer, formulaire, messages...). Le contenu des événements
// (titre, lieu, description) se traduit séparément dans lib/events.ts,
// via le champ optionnel `en` de chaque événement.
// -----------------------------------------------------------------------

export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];

export type Dictionary = {
  nav: {
    home: string;
    about: string;
  };
  header: {
    cities: string;
    tagline: string;
    cta: string;
  };
  eventsGrid: {
    kicker: string;
    title: string;
    swipeHint: string;
  };
  eventCard: {
    seeDetails: string;
    seeLess: string;
    from: string;
    perPerson: string;
    full: string;
    spot: (n: number) => string;
    book: string;
    bookAria: (title: string) => string;
    fullAria: (title: string) => string;
  };
  bookingModal: {
    close: string;
    numParticipants: string;
    removeParticipant: string;
    addParticipant: string;
    maxPerBooking: (n: number) => string;
    participantNames: string;
    yourFullName: string;
    participantN: (n: number) => string;
    contactDetails: string;
    fullName: string;
    email: string;
    phone: string;
    totalDue: string;
    submitLoading: string;
    submit: (total: number) => string;
    disclaimer: string;
    errorMissingNames: string;
    errorMissingContact: string;
    errorGeneric: string;
    errorNetwork: string;
  };
  footer: {
    cities: string;
    followUs: string;
  };
  about: {
    kicker: string;
    title: string;
    intro: string;
    photoComingSoon: string;
    subtitle: string;
    body: string;
  };
  success: {
    thanks: string;
    invalidLink: string;
    pending: string;
    confirmed: string;
    confirming: string;
    participant: (n: number) => string;
    amountPaid: string;
    backToClub: string;
  };
};

const dictionary: Record<Locale, Dictionary> = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
    },
    header: {
      cities: "Paris · Côte d'Azur · Belgique · Monaco & Genève",
      tagline:
        "Vous ne réservez pas simplement une séance.\nVous vivez une expérience.",
      cta: "Découvrez nos expériences",
    },
    eventsGrid: {
      kicker: "Agenda",
      title: "Nos prochaines expériences",
      swipeHint: "Faites glisser pour découvrir →",
    },
    eventCard: {
      seeDetails: "Voir les détails",
      seeLess: "Réduire",
      from: "À partir de",
      perPerson: "/ pers.",
      full: "Complet",
      spot: (n: number) => `${n} place${n > 1 ? "s" : ""}`,
      book: "Réserver",
      bookAria: (title: string) => `Réserver : ${title}`,
      fullAria: (title: string) => `${title} — complet`,
    },
    bookingModal: {
      close: "Fermer",
      numParticipants: "Nombre de participantes",
      removeParticipant: "Retirer une participante",
      addParticipant: "Ajouter une participante",
      maxPerBooking: (n: number) => `${n} maximum par réservation`,
      participantNames: "Noms des participantes",
      yourFullName: "Ton nom complet",
      participantN: (n: number) => `Participante ${n}`,
      contactDetails: "Coordonnées",
      fullName: "Nom complet",
      email: "Adresse email",
      phone: "Téléphone",
      totalDue: "Total à régler maintenant",
      submitLoading: "Redirection vers le paiement…",
      submit: (total: number) => `Payer ${total}€`,
      disclaimer:
        "Paiement sécurisé par Stripe. Ta place est confirmée dès réception du paiement.",
      errorMissingNames: "Merci de renseigner le nom de chaque participante.",
      errorMissingContact: "Merci de compléter tes coordonnées.",
      errorGeneric: "Une erreur est survenue. Réessaie dans un instant.",
      errorNetwork: "Impossible de contacter le serveur. Vérifie ta connexion.",
    },
    footer: {
      cities: "Paris · Côte d'Azur · Belgique · Monaco & Genève",
      followUs: "Suivez-nous",
    },
    about: {
      kicker: "À propos",
      title: "Notre histoire",
      intro:
        "THE GIRLY CLUB The Girly Club est né d’une envie simple : créer des moments que l’on a vraiment envie de vivre. De Paris à Cannes, de Bruxelles à Genève, nous imaginons des expériences dans des lieux qui sortent de l’ordinaire : une séance de Pilates sur la Seine, un déjeuner au bord d’une piscine, un dîner dans une adresse confidentielle ou encore une expérience pensée spécialement pour notre communauté. Chaque événement est imaginé avec la même envie : découvrir un lieu, vivre quelque chose de différent et surtout, le partager avec des femmes inspirantes. Parce que The Girly Club, ce n’est pas seulement une succession d’événements. C’est une communauté qui se retrouve, se rencontre et évolue au fil des expériences.Des lieux d’exception, des expériences atypiques et des femmes qui ont envie de vivre plus.",
      photoComingSoon: "Photo à venir",
      subtitle: "L'esprit du club",
      body: "Un deuxième texte peut venir ici — envoie-moi le contenu quand tu es prête.",
    },
    success: {
      thanks: "Merci",
      invalidLink: "Lien de confirmation invalide.",
      pending:
        "Ton paiement est en cours de confirmation. Tu vas recevoir un email de confirmation d'ici quelques instants. Si rien ne se passe sous 10 minutes, contacte-nous directement.",
      confirmed: "Réservation confirmée",
      confirming: "Confirmation en cours",
      participant: (n: number) => `${n} participante${n > 1 ? "s" : ""}`,
      amountPaid: "Montant réglé :",
      backToClub: "Retour au club",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About us",
    },
    header: {
      cities: "Paris · French Riviera · Belgium · Monaco & Geneva",
      tagline:
        "You're not just booking a class.\nYou're living an experience.",
      cta: "Discover our experiences",
    },
    eventsGrid: {
      kicker: "Schedule",
      title: "Our upcoming experiences",
      swipeHint: "Swipe to explore →",
    },
    eventCard: {
      seeDetails: "See details",
      seeLess: "Show less",
      from: "From",
      perPerson: "/ person",
      full: "Full",
      spot: (n: number) => `${n} spot${n > 1 ? "s" : ""}`,
      book: "Book now",
      bookAria: (title: string) => `Book: ${title}`,
      fullAria: (title: string) => `${title} — full`,
    },
    bookingModal: {
      close: "Close",
      numParticipants: "Number of participants",
      removeParticipant: "Remove a participant",
      addParticipant: "Add a participant",
      maxPerBooking: (n: number) => `${n} max per booking`,
      participantNames: "Participants' names",
      yourFullName: "Your full name",
      participantN: (n: number) => `Participant ${n}`,
      contactDetails: "Contact details",
      fullName: "Full name",
      email: "Email address",
      phone: "Phone number",
      totalDue: "Total due now",
      submitLoading: "Redirecting to payment…",
      submit: (total: number) => `Pay ${total}€`,
      disclaimer:
        "Secure payment via Stripe. Your spot is confirmed once payment is received.",
      errorMissingNames: "Please enter the name of each participant.",
      errorMissingContact: "Please complete your contact details.",
      errorGeneric: "Something went wrong. Please try again in a moment.",
      errorNetwork: "Couldn't reach the server. Check your connection.",
    },
    footer: {
      cities: "Paris · French Riviera · Belgium · Monaco & Geneva",
      followUs: "Follow us",
    },
    about: {
      kicker: "About us",
      title: "Our story",
      intro:
        "The Girly Club's introduction will go here soon. In the meantime, this placeholder keeps the layout ready for your final content.",
      photoComingSoon: "Photo coming soon",
      subtitle: "The spirit of the club",
      body: "A second block of text can go here — send me the content whenever you're ready.",
    },
    success: {
      thanks: "Thank you",
      invalidLink: "Invalid confirmation link.",
      pending:
        "Your payment is being confirmed. You'll receive a confirmation email shortly. If nothing happens within 10 minutes, please contact us directly.",
      confirmed: "Booking confirmed",
      confirming: "Confirmation in progress",
      participant: (n: number) => `${n} participant${n > 1 ? "s" : ""}`,
      amountPaid: "Amount paid:",
      backToClub: "Back to the club",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}

// -----------------------------------------------------------------------
// Traduction des dates/horaires écrits en français dans lib/events.ts
// (ex: "25 août 2026", "à confirmer") quand aucune traduction manuelle
// n'est fournie sur l'événement.
// -----------------------------------------------------------------------

const KNOWN_PHRASES: Record<string, string> = {
  "à confirmer": "to be confirmed",
  "Date à venir": "Date coming soon",
};

const FRENCH_MONTHS: Record<string, string> = {
  janvier: "January",
  février: "February",
  mars: "March",
  avril: "April",
  mai: "May",
  juin: "June",
  juillet: "July",
  août: "August",
  septembre: "September",
  octobre: "October",
  novembre: "November",
  décembre: "December",
};

export function translateDateLike(value: string, locale: Locale): string {
  if (locale === "fr") return value;
  if (KNOWN_PHRASES[value]) return KNOWN_PHRASES[value];

  const match = value.match(/^(\d{1,2})\s+([a-zà-ÿ]+)\s+(\d{4})$/i);
  if (!match) return value;
  const [, day, monthFr, year] = match;
  const monthEn = FRENCH_MONTHS[monthFr.toLowerCase()];
  return monthEn ? `${monthEn} ${day}, ${year}` : value;
}
