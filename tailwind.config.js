/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        petrol: '#0b3a46',
        deepgreen: '#0f4a3c',
        aqua: '#7bd8c8'
      },
    },
  },
  plugins: [],
}
