/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colYellow: '#FEDE2B',
        colYellowHover: '#e3c205',
        colPurple: '#9176FF',
        colGray: '#A7A9B7',
        colBgGray: '#F5F5F5',
      }
    },
  },
  plugins: [],
}

