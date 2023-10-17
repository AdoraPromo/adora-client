/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "scaffoldEthDark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        scaffoldEth: {
          primary: "#B565A7", // Main - Purple
          "primary-focus": "F8F1F7", // Shadow - Purple

          secondary: "#F5D83D", // Main - Yellow

          accent: "#FAFAFA", // Main - White
          "accent-focus": "#666666", // Dark - Medium Grey
          "accent-content": "#999999", // Dark - Light Grey

          neutral: "#1A1A1A", // Dark - Black
          "neutral-content": "#242424", // Dark - Black Background

          // "base-100": "#FAFAFA",
          // "base-200": "#f4f8ff",
          // "base-300": "#DAE8FF",
          // "base-content": "#212638",

          info: "#149BFF", // Main - Blue
          success: "#5BB85F", // Main - Green
          warning: "#FFA829", // Main - Orange
          error: "#FF5452", // Main - Red

          // TODO:
          "shadow-red": "#FFEBEB",
          "shadow-orange": "#FFF7EB",
          "shadow-green": "#F1F9F1",
          "shadow-blue": "#E5F4FF",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        "pt-sans": ["PT Sans", "sans-serif"],
        "pt-sans-caption": ["PT Sans Caption", "sans-serif"],
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        grow: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        zoom: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.1, 1.1)" },
        },
      },
      animation: {
        grow: "grow 5s linear infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        zoom: "zoom 1s ease infinite",
      },
    },
  },
  important: true,
};
