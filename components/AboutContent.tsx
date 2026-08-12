"use client";

import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// -----------------------------------------------------------------------
// Page "About us" — squelette en attendant ton contenu.
// Envoie-moi tes textes et tes photos (en français ET en anglais) et je
// les intègre directement ici (remplace simplement les blocs marqués
// "à venir" ci-dessous, dans t.about côté lib/i18n/translations.ts).
// -----------------------------------------------------------------------

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <p className="text-xs uppercase tracking-widest2 text-bordeaux">
          {t.about.kicker}
        </p>
        <h1 className="mt-2 text-3xl font-bold uppercase sm:text-4xl">
          {t.about.title}
        </h1>

        {/* Texte à venir — dis-moi ce que tu veux raconter ici (qui vous
            êtes, votre vision, ce qui rend le Girly Club unique). */}
        <p className="mt-6 text-base leading-relaxed text-ink/70">
          {t.about.intro}
        </p>
      </section>

      {/* Photo à venir — remplace ce bloc par une vraie image une fois
          fournie (même logique que pour les événements). */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-bordeaux to-ink">
          <p className="font-vibes text-4xl text-paper/80">
            {t.about.photoComingSoon}
          </p>
        </div>
      </section>

      {/* Second bloc de texte à venir, si besoin d'une deuxième section
          (ex : les valeurs du club, l'équipe...). */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="text-2xl font-bold uppercase sm:text-3xl">
          {t.about.subtitle}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-ink/70">
          {t.about.body}
        </p>
      </section>

      <Footer />
    </main>
  );
}
