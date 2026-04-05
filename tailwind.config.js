/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#291C0E',   // sötét barna
          mid: '#6E473B',    // közép barna
          light: '#A78D78',  // világos barna
          beige: '#BEB5A9',  // szürkésebb bézs
          bg: '#E1D4C2',     // világos háttér
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(41, 28, 14, 0.08)',
      }
    },
  },
  plugins: [],
}