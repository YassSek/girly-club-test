"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-bordeaux text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-24 text-center sm:pb-24 sm:pt-32">
        <p className="mb-4 font-playfair text-base italic text-paper/80 sm:text-lg">
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
        <p className="mt-6 max-w-xl whitespace-pre-line font-playfair text-base italic text-paper/80 sm:text-lg">
          {t.header.tagline}
        </p>
        <a
          href="#experiences"
          className="tracking-widest2 font-raleway mt-10 inline-block border border-paper bg-bordeaux px-8 py-3 text-xs font-bold uppercase text-paper transition-colors duration-300 hover:border-bordeaux hover:bg-paper hover:text-bordeaux sm:text-sm"
        >
          {t.header.cta}
        </a>
      </div>
    </header>
  );
}
