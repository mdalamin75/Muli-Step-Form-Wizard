/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        abel: ['Abel', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#5533FF',
        gray: '#F9FAFBB2',
        gray5: '#6B7280',
        gray7: '#3C4257',
        gray8: '#3E4958',
        gray9: '#54595E',
        blue5: '#5469D4',
        blue6: '#3D4EAC',
      }
    },
  },
  plugins: [],
}

