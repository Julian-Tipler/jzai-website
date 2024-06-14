const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100vw)" },
          "1%": { visibility: "visible" },
          "100%": { transform: "translateX(0)", visibility: "visible" },
        },
        "bounce-once": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25%)" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 1s forwards",
        "bounce-once": "bounce-once 0.5s ease-in-out",
        "fade-in-up": "fade-in-up 1s ease-out",
      },
      colors: {
        brand: "#1C4CC7",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          border: "#E4E5E6",
          bg: "#FAFAFA",
          text: {
            light: "#717476",
          },
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      height: {
        128: "40rem",
      },
      width: {
        128: "26rem",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
