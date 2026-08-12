"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// -----------------------------------------------------------------------
// Fond du header : bordeaux uni pour l'instant. Après les premiers
// événements, on pourra remplacer par une vidéo de fond (pas maintenant) —
// il suffira d'ajouter un <video> en absolute inset-0 avec object-cover,
// comme pour les photos des cartes d'événements.
// -----------------------------------------------------------------------

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-bordeaux text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="mb-4 text-xs uppercase tracking-widest2 text-paper/60">
          {t.header.cities}
        </p>
        <div className="relative h-40 w-64 max-w-[80%] sm:h-56 sm:w-96 sm:max-w-[70%]">
          <Image
            src="/images/logo/logo-white-crop.png"
            alt="The Girly Club"
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Le slogan reste volontairement en Playfair Display (registre
            display), même si le reste du texte du site est en Raleway. */}
        <p className="mt-6 max-w-xl font-playfair text-base italic text-paper/80 sm:text-lg">
          {t.header.tagline}
        </p>
        <a
          href="#experiences"
          className="mt-10 inline-block border border-paper bg-bordeaux px-8 py-3 text-sm font-bold uppercase tracking-widest2 text-paper transition-colors duration-300 hover:border-bordeaux hover:bg-paper hover:text-bordeaux"
        >
          {t.header.cta}
        </a>
      </div>
    </header>
  );
}
