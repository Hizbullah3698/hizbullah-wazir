import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-hover": "var(--color-surface-hover)",
        border: "var(--color-border)",
        "accent-blue": "var(--color-accent-blue)",
        "accent-green": "var(--color-accent-green)",
        "accent-purple": "var(--color-accent-purple)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
      },
      fontFamily: {
        syne: ["var(--font-syne)"],
        jetbrains: ["var(--font-jetbrains)"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(88, 166, 255, 0.1)",
        "glow-strong": "0 0 30px rgba(88, 166, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
