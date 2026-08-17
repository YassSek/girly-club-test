"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

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

      <section className="mx-auto max-w-md px-6 pb-20">
        <div className="relative aspect-[1131/1600] w-full overflow-hidden">
          <Image
            src="/images/gallery/1000015266.jpeg"
            alt={t.about.title}
            fill
            sizes="(max-width: 640px) 100vw, 448px"
            quality={90}
            className="object-cover"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
