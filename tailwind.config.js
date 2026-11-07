/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Emmaüs A.G.I.R. design tokens
        fond: '#f1ece1',
        fond2: '#e7e1d3',
        gris: '#1b1b1b',
        grisDoux: '#5f5d57',
        jaune: '#d99b26',
        vert: '#235338',
        vertDoux: '#3a694e',
        bleu: '#33669b',
        // Harmonious FoodBridge aliases
        forest: '#235338',
        deep: '#1b1b1b',
        ivory: '#f1ece1',
        cream: '#e7e1d3',
        harvest: '#d99b26',
        sage: '#d8e1d6',
        ink: '#1b1b1b'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      lineHeight: {
        tighter: '0.92',
        tightest: '0.86'
      },
      letterSpacing: {
        tighter: '-0.035em'
      }
    }
  },
  plugins: []
}
