import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "gradient-shift": "gradient-shift 15s ease infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        "business-premium": {
          // Couleurs de base avec excellent contraste
          "base-100": "oklch(98% 0 0)", // Blanc très légèrement teinté pour mode clair
          "base-200": "oklch(95% 0 0)",
          "base-300": "oklch(90% 0 0)",
          "base-content": "oklch(25% 0 0)", // Texte très sombre pour excellent contraste

          // Primary - Violet/Bleu vibrant
          primary: "oklch(58% 0.22 269)", // Violet vibrant
          "primary-content": "oklch(98% 0 0)", // Blanc pour texte sur primary

          // Secondary - Rose
          secondary: "oklch(65% 0.20 340)", // Rose vif
          "secondary-content": "oklch(98% 0 0)",

          // Accent - Cyan
          accent: "oklch(70% 0.18 186)", // Cyan éclatant
          "accent-content": "oklch(20% 0 0)", // Texte sombre

          // Neutral
          neutral: "oklch(30% 0.01 253)",
          "neutral-content": "oklch(95% 0 0)",

          // States avec bon contraste
          info: "oklch(63% 0.14 240)",
          "info-content": "oklch(98% 0 0)",

          success: "oklch(70% 0.10 142)",
          "success-content": "oklch(20% 0 0)",

          warning: "oklch(78% 0.12 82)",
          "warning-content": "oklch(20% 0 0)",

          error: "oklch(60% 0.20 29)",
          "error-content": "oklch(98% 0 0)",
        },
        "dark-premium": {
          // Mode sombre avec contraste optimisé
          "base-100": "oklch(18% 0.01 253)", // Gris très sombre
          "base-200": "oklch(15% 0.01 253)",
          "base-300": "oklch(12% 0.01 253)",
          "base-content": "oklch(92% 0 0)", // Texte clair mais pas blanc pur

          // Primary - Violet/Bleu plus clair pour mode sombre
          primary: "oklch(65% 0.22 269)",
          "primary-content": "oklch(12% 0 0)",

          // Secondary - Rose plus clair
          secondary: "oklch(70% 0.20 340)",
          "secondary-content": "oklch(12% 0 0)",

          // Accent - Cyan plus clair
          accent: "oklch(75% 0.18 186)",
          "accent-content": "oklch(12% 0 0)",

          // Neutral
          neutral: "oklch(25% 0.01 253)",
          "neutral-content": "oklch(92% 0 0)",

          // States avec contraste adapté au dark
          info: "oklch(68% 0.14 240)",
          "info-content": "oklch(12% 0 0)",

          success: "oklch(72% 0.10 142)",
          "success-content": "oklch(12% 0 0)",

          warning: "oklch(80% 0.12 82)",
          "warning-content": "oklch(12% 0 0)",

          error: "oklch(65% 0.20 29)",
          "error-content": "oklch(98% 0 0)",
        },
      },
      "light",
      "dark",
    ],
    darkTheme: "dark-premium",
  },
};

export default config;
