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
        vibes: ["var(--font-vibes)", "cursive"],
        playfair: ["var(--font-playfair)", "serif"],
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
