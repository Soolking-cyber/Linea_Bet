/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Syne', 'sans-serif'],
      },
      colors: {
        'linea-blue': '#0000FF',
        'linea-light-blue': '#E6E6FF',
        'linea-black': '#141414',
        'linea-gray': '#F3F3F3',
      },
    },
  },
  plugins: [],
}