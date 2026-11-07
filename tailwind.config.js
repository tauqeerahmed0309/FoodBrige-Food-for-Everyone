/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Bespoke Editorial Palette — Non-generic, tactile, organic
        fond: '#FAF8F5',
        fond2: '#F1EDE6',
        fond3: '#E7E1D8',
        gris: '#141715',
        grisDoux: '#555B56',
        jaune: '#C4823F',
        vert: '#1B3F2F',
        vertDoux: '#2E5F47',
        terracotta: '#B65E2A',
        // Preserved compatibility aliases
        forest: '#1B3F2F',
        deep: '#141715',
        ivory: '#FAF8F5',
        cream: '#F1EDE6',
        harvest: '#C4823F',
        sage: '#D7E0D6',
        ink: '#141715'
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace']
      },
      lineHeight: {
        tighter: '0.90',
        tightest: '0.84'
      },
      letterSpacing: {
        tighter: '-0.04em',
        tightest: '-0.05em'
      }
    }
  },
  plugins: []
}
