/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-clip-path');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#133E87',
        'my-blue': '#a2d9ff',
      
      },
    },
  },
  plugins: [
    plugin, // add the clip-path plugin here
  ],
}
