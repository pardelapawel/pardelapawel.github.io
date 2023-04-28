/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['**/*.html'],
  theme: {
    screens: {
      mobile: {
        'raw': '(hover: none)'
      },
    },
    extend: {
      colors: {
        'bg-col': '#FCF7E7',
        'bg-acc': '#f7edca',
        text: '#464440',
        'text-acc': '#9A8A74',
        drawing: '#B8B4A9'
      }
    },
  },
  plugins: [],
}

