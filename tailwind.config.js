/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      lato: ['Lato', 'Cairo', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ addVariant }) {
      addVariant('night', '[data-theme="night"] &')
    }),
  ],
  daisyui: {
    themes: ['emerald', 'night'],
  },
}
