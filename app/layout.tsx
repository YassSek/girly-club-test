import type { Metadata } from "next";
import { Great_Vibes, Raleway, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import "./globals.css";
import "./typography.css";

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vibes",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thegirlyclub.fr"),
  title: "The Girly Club — Rejoins l'expérience",
  description:
    "Une communauté lifestyle féminine premium. Pilates, déjeuners, dîners et expériences dans des lieux d'exception.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${vibes.variable} ${playfair.variable} ${raleway.variable} font-raleway bg-paper text-ink antialiased`}
      >
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
