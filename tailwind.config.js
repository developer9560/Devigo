/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0A66C2',
          dark: '#064584',
          bg: '#1E1E1E',
          'secondary-bg': '#252525',
          white: '#FFFFFF',
          'gray-text': '#AAAAAA',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

