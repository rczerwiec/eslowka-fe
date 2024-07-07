/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#232A29",
        secondary: "#86CCC2",
        third: "#3C4A48",
        fourth: "#F9F9F9",
        fifth: "#868686",
      }
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    }
  },
  plugins: [],
}

