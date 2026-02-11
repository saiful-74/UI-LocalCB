/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Poppins', 'sans-serif'],
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'sans': ['Poppins', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      colors: {
        'brand': {
          'orange': '#D35400',
          'amber': '#FFAC33',
          'green': '#2E8B57',
        }
      }
    },
  },
  plugins: [],
}