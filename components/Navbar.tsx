"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-bordeaux text-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        <Link href="/" className="relative block h-10 w-16 shrink-0 sm:h-11 sm:w-[4.5rem]">
          <Image
            src="/images/logo/logo-white-crop.png"
            alt="The Girly Club"
            fill
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest2 sm:text-sm">
            <Link href="/" className="text-paper transition-colors hover:text-bordeaux">
              {t.nav.home}
            </Link>
            <Link href="/about" className="text-paper transition-colors hover:text-bordeaux">
              {t.nav.about}
            </Link>
          </div>

          {/* Bascule FR / EN */}
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
            className="relative h-7 w-14 shrink-0 rounded-full border-2 border-paper/60 bg-paper/5 transition-colors hover:border-paper"
          >
            <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5 text-[10px] font-bold uppercase">
              <span className={locale === "fr" ? "text-paper" : "text-paper/35"}>Fr</span>
              <span className={locale === "en" ? "text-paper" : "text-paper/35"}>En</span>
            </span>
            <span
              aria-hidden
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-bordeaux shadow transition-transform duration-300 ${
                locale === "en" ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
