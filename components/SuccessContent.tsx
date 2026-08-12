"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ReservationRow } from "@/lib/supabase";

type Props = {
  sessionId?: string;
  reservation: ReservationRow | null;
};

export default function SuccessContent({ sessionId, reservation }: Props) {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-24 text-center text-paper">
      <p className="font-vibes text-5xl">{t.success.thanks}</p>

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
    </main>
  );
}
