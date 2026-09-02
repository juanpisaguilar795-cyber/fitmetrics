import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#C8FF00',
          dim:     '#9abf00',
        },
      },
      fontFamily: {
        // Mapean a las variables CSS definidas en globals.css
        display: ['var(--font-barlow)', 'Arial Narrow', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'Courier New', 'monospace'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-lime': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200,255,0,0)' },
          '50%':      { boxShadow: '0 0 20px 4px rgba(200,255,0,0.12)' },
        },
      },
      animation: {
        ticker:      'ticker 24s linear infinite',
        'fade-up':   'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-lime':'pulse-lime 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
