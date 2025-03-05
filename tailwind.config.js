/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lightSlateGray: "#778899",
        customBlue: "#324D69",
      },
    },
  },
  plugins: [],
}

