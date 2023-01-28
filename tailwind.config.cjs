const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,css}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
        yellow: colors.amber
      },
      fontFamily: {
        serif: ['Charter', 'serif'],
      },
      maxWidth: {
        'desc': '65ch',
      }
    }
  },
  plugins: [],
}
