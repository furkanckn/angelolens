import type { Config } from "tailwindcss";

/**
 * Design tokens mirror app/globals.css (@theme).
 * Light cream base + anthracite hero sections + champagne gold accent.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F4EF",
        ink: "#1A1A1A",
        anthracite: "#0E0D0C",
        gold: {
          DEFAULT: "#B08D57",
          deep: "#A67C3D",
          light: "#C9A86A",
        },
        bordeaux: "#5C1A2E",
        lens: {
          emerald: "#2F5233",
          sapphire: "#1B3A57",
          amber: "#C17A2E",
          hazel: "#8A7A63",
        },
      },
      fontFamily: {
        display: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.35em",
        elegant: "0.22em",
      },
      transitionDuration: {
        elegant: "700ms",
        slow: "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;
