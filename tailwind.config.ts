import type { Config } from 'tailwindcss';

/**
 * Premium, minimal, gallery-like palette per the brand spec.
 *   paper     → pure white background         (#FFFFFF)
 *   ink       → primary dark-grey text        (#222222)
 *   muted     → secondary text                (#666666)
 *   gold      → single accent, used sparingly (#C8A542)
 *   line      → hairline borders              (#ECECEC)
 *   hover     → subtle hover surface          (#F7F7F7)
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        ink: '#222222',
        muted: '#666666',
        faint: '#999999',
        line: '#ECECEC',
        hover: '#F7F7F7',
        gold: '#C8A542',
        'gold-soft': '#E7D6A6',
        'gold-deep': '#A5842E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
        widest3: '0.4em',
      },
      maxWidth: {
        content: '80rem',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(34,34,34,0.12)',
        card: '0 6px 24px -10px rgba(34,34,34,0.14)',
        lift: '0 24px 60px -18px rgba(34,34,34,0.22)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        floatNote: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-120px) rotate(12deg)', opacity: '0' },
        },
        eq: {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float-note': 'floatNote 9s linear infinite',
        eq: 'eq 1.1s ease-in-out infinite',
        'spin-slow': 'spinSlow 14s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
