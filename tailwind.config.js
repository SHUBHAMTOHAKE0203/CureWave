/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-clip-path');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'nutrition-green': {
          DEFAULT: '#28A745',
          50: '#E6F5E6',
          100: '#C2E7C2',
          200: '#9BD69B',
          500: '#28A745',
          600: '#208C38',
        },
        'nutrition-earth': {
          DEFAULT: '#FFD700',
          50: '#FFFBE6',
          100: '#FFF3C2',
          200: '#FFEB9B',
          500: '#FFD700',
          600: '#D4B000',
        },
        'custom-blue': '#133E87',
        'my-blue': '#a2d9ff',
      },
    },
  },
  plugins: [
    plugin, // Add the clip-path plugin here
  ],
};
