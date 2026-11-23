/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        volt: {
          bg: '#FFFFFF',
          surface: '#F5F5F3',
          card: '#EFECE8',
          dark: '#181818',
          muted: '#6E6E6B',
          border: '#E5E5E2',
          lime: '#DDFD5B',
          limeHover: '#D1F542',
        },
      },
    },
  },
  plugins: [],
};