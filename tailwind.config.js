/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark Green and Black Typography Palette
        forest: '#123B2A',         // Primary background: Deep forest green
        forestDark: '#0D2B1E',     // Deepest forest green
        darkGreen: '#194B35',      // Secondary background: Dark green
        borderGreen: '#365B46',    // Borders on dark: #365B46
        ivory: '#F5F2E9',          // Light section background / Primary typography on dark
        ivoryLight: '#FAF8F3',     // Crisp ivory
        ivoryDark: '#E9E4D6',      // Ivory card surface
        borderIvory: '#D8D2C2',    // Border on light
        nearBlack: '#111411',      // Primary typography on light / Black buttons
        charcoal: '#333A34',       // Secondary typography on light
        mutedSage: '#C5D2C7',      // Secondary typography on dark
        naturalLime: '#B7D66B',    // Accent color: Natural lime
        limeDark: '#9DBA58',       // Accent hover: Lime dark

        // Semantic aliases ensuring full backwards compatibility
        fond: '#F5F2E9',
        fond2: '#E9E4D6',
        fond3: '#D8D2C2',
        gris: '#111411',
        grisDoux: '#4A534B',
        jaune: '#B7D66B',
        vert: '#123B2A',
        vertDoux: '#194B35',
        terracotta: '#B7D66B'
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
