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
        colGray2: '#C3C3C3',
        colBgGray: '#F5F5F5',
        colBgGray2: '#F2F2F2',
        colGreen: '#58FF90',
        colGreen2: '#AFF4C6',
      }
    },
  },
  plugins: [],
}

