"use client";

import { useEffect, useMemo, useState } from "react";
import { GirlyEvent, localizeEvent } from "@/lib/events";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Props = {
  event: GirlyEvent;
  spotsLeft: number;
  onClose: () => void;
};

// Classes réutilisées telles quelles à plusieurs endroits du formulaire —
// centralisées ici pour n'avoir qu'un seul endroit à modifier.
const FIELD_LABEL_CLASS = "block text-xs font-bold uppercase tracking-widest2";
const TEXT_INPUT_CLASS =
  "w-full border border-ink/20 px-4 py-2.5 text-sm focus:border-bordeaux";
const STEPPER_BUTTON_CLASS =
  "h-9 w-9 border border-ink/20 text-lg hover:border-bordeaux hover:text-bordeaux";

export default function BookingModal({ event, spotsLeft, onClose }: Props) {
  const { locale, t } = useLanguage();
  const L = localizeEvent(event, locale);

  const maxSelectable = Math.max(
    1,
    Math.min(event.maxPerBooking, spotsLeft)
  );

  const [numParticipants, setNumParticipants] = useState(1);
  const [participantNames, setParticipantNames] = useState<string[]>([""]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ferme la modale avec Échap
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Ajuste dynamiquement le nombre de champs "nom de la participante"
  useEffect(() => {
    setParticipantNames((prev) => {
      const next = [...prev];
      while (next.length < numParticipants) next.push("");
      while (next.length > numParticipants) next.pop();
      return next;
    });
  }, [numParticipants]);

  const totalPrice = useMemo(
    () => event.pricePerPerson * numParticipants,
    [event.pricePerPerson, numParticipants]
  );

  function updateParticipantName(index: number, value: string) {
    setParticipantNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (participantNames.some((n) => n.trim().length === 0)) {
      setError(t.bookingModal.errorMissingNames);
      return;
    }
    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
      setError(t.bookingModal.errorMissingContact);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          participants: participantNames.map((n) => n.trim()),
          contactName: contactName.trim(),
          contactEmail: contactEmail.trim(),
          contactPhone: contactPhone.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? t.bookingModal.errorGeneric);
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError(t.bookingModal.errorNetwork);
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="animate-modal-in max-h-[90vh] w-full max-w-lg overflow-y-auto bg-paper p-8 sm:p-10">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-bordeaux">
              {L.city} · {L.date}
            </p>
            <h2 className="mt-1 text-2xl font-bold uppercase">{L.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.bookingModal.close}
            className="text-2xl leading-none text-ink/50 hover:text-bordeaux"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre de participantes */}
          <div>
            <label className={FIELD_LABEL_CLASS}>
              {t.bookingModal.numParticipants}
            </label>
            <div className="mt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setNumParticipants((n) => Math.max(1, n - 1))}
                className={STEPPER_BUTTON_CLASS}
                aria-label={t.bookingModal.removeParticipant}
              >
                −
              </button>
              <span className="w-6 text-center font-playfair text-lg">
                {numParticipants}
              </span>
              <button
                type="button"
                onClick={() =>
                  setNumParticipants((n) => Math.min(maxSelectable, n + 1))
                }
                className={STEPPER_BUTTON_CLASS}
                aria-label={t.bookingModal.addParticipant}
              >
                +
              </button>
              <span className="text-xs italic text-ink/50">
                {t.bookingModal.maxPerBooking(maxSelectable)}
              </span>
            </div>
          </div>

          {/* Noms des participantes */}
          <div className="space-y-3">
            <label className={FIELD_LABEL_CLASS}>
              {t.bookingModal.participantNames}
            </label>
            {participantNames.map((name, i) => (
              <input
                key={i}
                type="text"
                required
                value={name}
                onChange={(ev) => updateParticipantName(i, ev.target.value)}
                placeholder={
                  i === 0
                    ? t.bookingModal.yourFullName
                    : t.bookingModal.participantN(i + 1)
                }
                className={TEXT_INPUT_CLASS}
              />
            ))}
          </div>

          {/* Coordonnées de contact */}
          <div className="space-y-3">
            <label className={FIELD_LABEL_CLASS}>
              {t.bookingModal.contactDetails}
            </label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder={t.bookingModal.fullName}
              className={TEXT_INPUT_CLASS}
            />
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder={t.bookingModal.email}
              className={TEXT_INPUT_CLASS}
            />
            <input
              type="tel"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder={t.bookingModal.phone}
              className={TEXT_INPUT_CLASS}
            />
          </div>

          {/* Récapitulatif prix */}
          <div className="space-y-1.5 border-t border-ink/10 pt-5 text-sm">
            <div className="flex justify-between text-ink/60">
              <span>
                {event.pricePerPerson}€ × {numParticipants}
              </span>
              <span>{totalPrice}€</span>
            </div>
            <div className="flex justify-between font-bold text-bordeaux">
              <span>{t.bookingModal.totalDue}</span>
              <span>{totalPrice}€</span>
            </div>
          </div>

          {error && <p className="text-sm text-bordeaux">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-bordeaux w-full py-3.5 text-sm font-bold uppercase tracking-widest2"
          >
            {loading ? t.bookingModal.submitLoading : t.bookingModal.submit(totalPrice)}
          </button>
          <p className="text-center text-xs italic text-ink/40">
            {t.bookingModal.disclaimer}
          </p>
        </form>
      </div>
    </div>
  );
}
