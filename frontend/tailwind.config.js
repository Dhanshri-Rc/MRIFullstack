/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9960C',
          light: '#D4A017',
          dark: '#8B6508',
        },
        mri: {
          black: '#0A0A0A',
          dark: '#111111',
          gold: '#C9960C',
          'gold-light': '#D4A017',
          'gold-hover': '#B8860B',
          text: '#1A1A1A',
          'text-light': '#555555',
          border: '#E5E5E5',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
