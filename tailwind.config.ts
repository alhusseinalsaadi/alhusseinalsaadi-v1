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
        primary: {
          DEFAULT: "#1A2744",
          dark: "#0F1B35",
          light: "#2A3D6E",
        },
        accent: {
          DEFAULT: "#C9A84C",
          light: "#E8D5A3",
          dark: "#A8882E",
        },
        bg: {
          DEFAULT: "#FAFAF8",
          dark: "#0F1B35",
        },
        surface: "#FFFFFF",
        border: "#E5E5E0",
        muted: "#6B6B6B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(26, 39, 68, 0.08)",
        elevated: "0 8px 48px rgba(26, 39, 68, 0.16)",
        gold: "0 4px 24px rgba(201, 168, 76, 0.3)",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "pulse-gold": "pulseGold 2s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(201,168,76,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
