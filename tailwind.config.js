/** @type {import('tailwindcss').Config} */
module.g_exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        'home': "url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}