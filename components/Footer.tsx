"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// Icônes minimalistes (traits fins, cohérentes avec l'identité graphique).
// Remplace les href="#" par les vraies URLs une fois tes comptes prêts.

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.6 17.4 4 20l2.7-.7A8.4 8.4 0 1 0 4 12.4 8.3 8.3 0 0 0 6.6 17.4Z" />
      <path
        d="M9.2 10.1c.3 2 2 3.6 3.9 3.9.5.1.9-.1 1.2-.5l.3-.5c.2-.3.1-.6-.2-.8l-1.1-.7c-.3-.2-.6-.1-.8.1l-.3.3c-.8-.4-1.5-1.1-1.9-1.9l.3-.3c.2-.2.3-.5.1-.8l-.7-1.1c-.2-.3-.5-.4-.8-.2l-.5.3c-.4.3-.6.7-.5 1.2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3v11.2a3.8 3.8 0 1 1-3.8-3.8c.3 0 .6 0 .9.1" />
      <path d="M15 3c.4 2.7 2.4 4.7 5.1 5.1" />
    </svg>
  );
}

const socials = [
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "WhatsApp", href: "#", Icon: WhatsAppIcon },
  { name: "TikTok", href: "#", Icon: TikTokIcon },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink py-12 text-center text-paper/60">
      {/* Réseaux sociaux — liens à renseigner plus tard (href="#" pour l'instant) */}
      <div className="mx-auto flex max-w-xs flex-col items-center gap-4">
        <p className="text-xs uppercase tracking-widest2 text-paper/50">
          {t.footer.followUs}
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-bordeaux/60 bg-bordeaux/10 text-paper transition-colors duration-300 hover:border-bordeaux hover:bg-bordeaux"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-xs border-t border-paper/10 pt-10">
        <div className="relative mx-auto h-14 w-20">
          <Image
            src="/images/logo/logo-white-crop.png"
            alt="The Girly Club"
            fill
            className="object-contain"
          />
        </div>
        <p className="mt-3 text-xs uppercase tracking-widest2">
          {t.footer.cities}
        </p>
      </div>
    </footer>
  );
}
