"use client";

import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// -----------------------------------------------------------------------
// Page "About us" — squelette en attendant ton contenu définitif.
// Le texte se modifie dans lib/i18n/translations.ts, sous t.about :
// - introParagraphs : un tableau, un paragraphe par élément (plus il y en
//   a, plus le texte est aéré — pas besoin de tout mettre dans un seul bloc)
// - pullQuotes : les petites citations mises en avant entre les
//   paragraphes (distribuées automatiquement, voir interleaveWithQuotes
//   ci-dessous)
// -----------------------------------------------------------------------

// Répartit les citations entre les paragraphes de façon régulière (ex: 3
// paragraphes + 2 citations → paragraphe, citation, paragraphe, citation,
// paragraphe). Fonctionne quel que soit le nombre de paragraphes/citations.
function interleaveWithQuotes(paragraphs: string[], quotes: string[]) {
  const items: { type: "paragraph" | "quote"; text: string }[] = [];
  const gap = paragraphs.length / (quotes.length + 1);
  let quoteIndex = 0;

  paragraphs.forEach((paragraph, i) => {
    items.push({ type: "paragraph", text: paragraph });

    const isLastParagraph = i === paragraphs.length - 1;
    const dueForQuote = i + 1 >= Math.round(gap * (quoteIndex + 1));

    if (quoteIndex < quotes.length && dueForQuote && !isLastParagraph) {
      items.push({ type: "quote", text: quotes[quoteIndex] });
      quoteIndex += 1;
    }
  });

  // Citations restantes (cas limite), ajoutées à la fin
  while (quoteIndex < quotes.length) {
    items.push({ type: "quote", text: quotes[quoteIndex] });
    quoteIndex += 1;
  }

  return items;
}

export default function AboutContent() {
  const { t } = useLanguage();
  const content = interleaveWithQuotes(t.about.introParagraphs, t.about.pullQuotes);

  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-28">
        <p className="text-xs uppercase tracking-widest2 text-bordeaux">
          {t.about.kicker}
        </p>
        <h1 className="mt-2 text-3xl font-bold uppercase sm:text-4xl">
          {t.about.title}
        </h1>

        <div className="mt-8 text-left sm:text-center">
          {content.map((item, i) =>
            item.type === "quote" ? (
              <blockquote
                key={i}
                className="my-8 border-y border-ink/10 py-6 text-center font-playfair text-lg italic text-bordeaux sm:text-xl"
              >
                « {item.text} »
              </blockquote>
            ) : (
              <p
                key={i}
                className="text-base leading-relaxed text-ink/70 [&+p]:mt-5"
              >
                {item.text}
              </p>
            )
          )}
        </div>
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
