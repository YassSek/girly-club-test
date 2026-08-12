import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About us — The Girly Club",
  description: "Découvre l'histoire et l'esprit du Girly Club.",
};

export default function AboutPage() {
  return <AboutContent />;
}
