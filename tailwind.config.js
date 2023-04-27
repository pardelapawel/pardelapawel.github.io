/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['**/*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
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

