/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"','sans-serif'],
      }
    },
    colors: {
      "black": "#090909",
      "black-1": "#555555",
      "black-2":"#1d1d1d",
      "white": "#FFF",
      "gray-.5": "#F4F4F4",
      "gray-1": "#F4F4F4",
      "gray-2": "#E1E1E1",
      "gray-3": "#E6E8EC",
      "gray-4": "#C9C9C9"
    },
  },
  plugins: [],
}

