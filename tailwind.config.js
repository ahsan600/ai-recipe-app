/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7A00", // Warm Orange
        secondary: "#4CAF50", // Fresh Green
        background: "#FFFDF8", // Warm White
        textPrimary: "#1F2933", // Dark Charcoal
      },
    },
  },
  plugins: [],
};
