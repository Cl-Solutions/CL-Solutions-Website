import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        'dark-lighter': '#111111',
        'dark-border': '#1a1a1a',
        accent: '#00E5FF',
        'accent-dim': 'rgba(0, 229, 255, 0.1)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow':       'pulse-glow 2s ease-in-out infinite',
        'float':            'float 6s ease-in-out infinite',
        'shimmer':          'shimmer 2.4s linear infinite',
        'border-spin':      'border-spin 6s linear infinite',
        'spotlight':        'spotlight 2s ease 0.75s 1 forwards',
        'fade-in-up':       'fade-in-up 0.6s ease both',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.2)' },
          '50%':       { boxShadow: '0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'border-spin': {
          '0%':   { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
        'spotlight': {
          '0%':   { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [tailwindAnimate],
};
