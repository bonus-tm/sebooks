const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gray: colors.warmGray,
        yellow: colors.amber
      }
    }
  }
}
