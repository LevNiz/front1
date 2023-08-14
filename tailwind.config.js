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
        colPurple2: '#C192FF',
        colGray: '#A7A9B7',
        colGray2: '#C3C3C3',
        colGray3: '#8391A1',
        colBgGray: '#F5F5F5',
        colBgGray2: '#F2F2F2',
        colGreen: '#58FF90',
        colGreen2: '#AFF4C6',
        colBlue: '#C1F0FF',
        colOrange: '#FFC7C2',
      }
    },
    screens: {
      xs: '320px',
      sm: '480px',
      mm: '576px',
      md: '768px',
      lg: '991px',
      xl: '1200px',
      xl2: '1360px',
    }
  },
  plugins: [],
}

