import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:    '#0A0F1E',
          dark:    '#0D1526',
          card:    '#111827',
          border:  '#1E2D45',
          blue:    '#2563EB',
          indigo:  '#4F46E5',
          violet:  '#7C3AED',
          accent:  '#38BDF8',
          muted:   '#64748B',
          light:   '#94A3B8',
          white:   '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
        'gradient-hero':  'linear-gradient(180deg, #0A0F1E 0%, #0D1526 100%)',
        'gradient-card':  'linear-gradient(145deg, #111827 0%, #0D1526 100%)',
      },
      animation: {
        'fade-up':   'fadeUp 0.5s ease forwards',
        'glow-pulse':'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
