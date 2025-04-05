// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#fafafa',
          100: '#ffede8',
          200: '#f6a793',
          300: '#FFF4F1',
          400: '#fb923c',
          500: '#F2542D',
          600: '#ca3e1b',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        secondary: {
          50: '#fdf8f8',
          100: '#fae9e9',
          200: '#f4d4d4',
          300: '#eab4b4',
          400: '#d98888',
          500: '#562C2C',
          600: '#4d2727',
          700: '#412121',
          800: '#361c1c',
          900: '#2c1717',
          950: '#1a0d0d',
        },
        orange: {
          DEFAULT: '#F2542D'
        }
      },
    },
  },
  plugins: [],
}
