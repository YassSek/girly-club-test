import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bordeaux: "#6F0E16",
        ink: "#000000",
        paper: "#FFFFFF",
      },
      fontFamily: {
        // H1 / moments émotionnels
        vibes: ["var(--font-vibes)", "cursive"],
        // Titres, boutons, petits labels en majuscules
        playfair: ["var(--font-playfair)", "serif"],
        // Corps de texte : descriptions, formulaires, paragraphes
        raleway: ["var(--font-raleway)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
