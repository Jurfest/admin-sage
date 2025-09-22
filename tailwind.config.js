const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        moss: '#4a5d23',
        fern: '#7cb342',
        sage: '#9ccc65',
        bamboo: '#c5e1a5',
        earth: '#5d4037',
        clay: '#8d6e63',
        sand: '#d7ccc8',
        sky: '#81c784',
        ocean: '#4db6ac',
        coral: '#ff8a65',
        sunset: '#ffb74d',
        background: '#f1f8e9',
        surface: '#ffffff',
        primary: '#7cb342',
        secondary: '#4db6ac',
        accent: '#ff8a65',
        'text-primary': '#2e2e2e',
        'text-muted': '#616161',
        border: '#c5e1a5',
      },
      backgroundImage: {
        'cyber-neon': 'linear-gradient(135deg, #ff00ff, #00ffff, #ffff00)',
        'cyber-matrix': 'linear-gradient(45deg, #0f0f23, #00ff41, #000000)',
        'cyber-pulse': 'linear-gradient(90deg, #ff0080, #7928ca, #ff0080)',
      },
    },
  },
  plugins: [],
};
