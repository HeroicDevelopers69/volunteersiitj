const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ["'Roboto'", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)' },
          '50%': { boxShadow: '0 1px 20px 1px rgba(0,0,0,1)' },
        },
      },
      animation: {
        glow: 'glow 2s infinite',
      },
    },
  },
  plugins: [],
}

