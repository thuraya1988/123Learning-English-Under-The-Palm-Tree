import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fbf4e7",
          100: "#f4e8cf",
          200: "#ead4a5",
          300: "#dbb978",
          400: "#c89c52",
          500: "#a87f3a",
          600: "#8a6529",
          700: "#6b4e1f",
          800: "#4c3815",
          900: "#2d220d",
        },
        gold: {
          light: "#e9c97c",
          DEFAULT: "#c9a14a",
          dark: "#8a6529",
        },
        cocoa: {
          light: "#5a4327",
          DEFAULT: "#3a2a17",
          dark: "#1f1509",
        },
        cream: "#f6ecd5",
        ivory: "#fbf4e7",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(60, 40, 20, 0.18)",
        gold: "0 0 24px 0 rgba(201, 161, 74, 0.35)",
        bevel:
          "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.18), 0 12px 32px rgba(60,40,20,0.22)",
        inset:
          "inset 0 8px 16px rgba(60,40,20,0.25), inset 0 -2px 4px rgba(255,255,255,0.18)",
      },
      backdropBlur: {
        luxe: "22px",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "shimmer": "shimmer 4s linear infinite",
        "fade-in": "fadeIn 1.2s ease forwards",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
