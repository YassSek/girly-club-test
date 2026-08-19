"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ReservationRow } from "@/lib/supabase";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
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
  { name: "Instagram", href: "https://www.instagram.com/thegirlyclubgc", Icon: InstagramIcon },
  { name: "TikTok", href: "https://www.tiktok.com/@the.girlyclub", Icon: TikTokIcon },
];

type Props = {
  sessionId?: string;
  reservation: ReservationRow | null;
};

export default function SuccessContent({ sessionId, reservation }: Props) {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-24 text-center text-paper">
      <div className="relative h-20 w-28">
        <Image
          src="/images/logo/logo-white-crop.png"
          alt="The Girly Club"
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-4 font-vibes text-5xl">{t.success.thanks}</p>

      {!sessionId && (
        <p className="mt-6 max-w-md text-sm text-paper/70">
          {t.success.invalidLink}
        </p>
      )}

      {sessionId && !reservation && (
        <p className="mt-6 max-w-md text-sm text-paper/70">
          {t.success.pending}
        </p>
      )}

      {reservation && (
        <div className="mt-8 max-w-md space-y-2 border border-paper/20 p-8 text-left text-sm">
          <p className="text-xs uppercase tracking-widest2 text-paper/50">
            {reservation.status === "confirmed"
              ? t.success.confirmed
              : t.success.confirming}
          </p>
          <h2 className="text-lg font-bold uppercase">
            {reservation.event_title}
          </h2>
          <p className="text-paper/70">{reservation.event_date}</p>
          <p className="pt-3 text-paper/70">
            {t.success.participant(reservation.num_participants)}
          </p>
          <ul className="list-inside list-disc text-paper/70">
            {(reservation.participants as string[]).map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
          <p className="pt-3 text-paper/70">
            {t.success.amountPaid}{" "}
            <span className="font-bold text-paper">
              {reservation.total_price}€
            </span>
          </p>
        </div>
      )}

      <Link
        href="/"
        className="mt-10 border border-paper bg-ink px-8 py-3 text-xs font-bold uppercase tracking-widest2 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
      >
        {t.success.backToClub}
      </Link>

      <div className="mt-8 flex items-center gap-4">
        {socials.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-bordeaux/60 bg-bordeaux/10 text-paper transition-colors duration-300 hover:border-bordeaux hover:bg-bordeaux"
          >
            <Icon />
          </a>
        ))}
      </div>
    </main>
  );
}
