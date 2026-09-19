/** @type {import('tailwindcss').Config} */

// A színek CSS változókból jönnek (src/styles/tokens.css), így a sötét mód
// egyetlen változócserével működik, és az átlátszóság-módosítók (pl. bg-ink/10) is.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: token('bg'),
        surface: token('surface'),
        linen: token('surface-alt'),
        ink: { DEFAULT: token('ink'), soft: token('ink-soft') },
        line: token('line'),
        paprika: { DEFAULT: token('paprika'), deep: token('paprika-deep') },
        'on-paprika': token('on-paprika'),
        crust: token('crust'),
        dough: token('dough'),
        dill: token('dill'),
        // Régi nevek (admin oldalak) – az új palettára mutatnak
        brand: {
          dark: token('ink'),
          mid: token('ink-soft'),
          light: token('paprika'),
          beige: token('line'),
          bg: token('surface-alt'),
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Manrope Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        hand: ['"Caveat Variable"', 'cursive'],
      },
      fontSize: {
        'step-n1': ['var(--step-n1)', { lineHeight: '1.4' }],
        'step-0': ['var(--step-0)', { lineHeight: '1.65' }],
        'step-1': ['var(--step-1)', { lineHeight: '1.3' }],
        'step-2': ['var(--step-2)', { lineHeight: '1.15' }],
        'step-3': ['var(--step-3)', { lineHeight: '1.05' }],
        'step-4': ['var(--step-4)', { lineHeight: '1' }],
      },
      borderRadius: {
        card: '20px',
        frame: '28px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(41 28 14 / .06), 0 8px 24px -12px rgb(41 28 14 / .14)',
        lift: '0 24px 48px -16px rgb(143 42 21 / .28)',
        soft: '0 4px 20px -2px rgb(41 28 14 / .08)',
        nav: '0 8px 32px -12px rgb(41 28 14 / .18)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        site: '1280px',
      },
    },
  },
  plugins: [],
};
