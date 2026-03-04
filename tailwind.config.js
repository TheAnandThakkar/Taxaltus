/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1B2A4A",
        teal: { DEFAULT: "#0D9488", light: "#0D948815" },
        gold: { DEFAULT: "#D97706", light: "#D9770615" },
        indigo: { DEFAULT: "#6366F1", light: "#6366F115" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
