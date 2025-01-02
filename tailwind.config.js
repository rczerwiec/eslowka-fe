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
        secondarylight: "#A0EEE3",
        third: "#3C4A48",
        fourth: "#F9F9F9",
        fifth: "#868686",
        fifth_light: "#F5F4F4",
        gold: "#FFD700",
        transparent_gray: "rgba(0,0,0, .6)",
        gradient_from: "#D9D9D9",
        gradient_to: "#93DED3"
      },
      borderRadius: {
        login_screen: '190px',
      }
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    }
  },
  plugins: [],
}

