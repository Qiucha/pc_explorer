/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blueprint: {
          dark: '#0a0e17',
          surface: '#111827',
          card: '#182234',
          border: '#23354d',
          trace: '#0ea5e9',
          accent: '#38bdf8',
        },
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow-glow': 'flowGlow 3s linear infinite',
      },
      keyframes: {
        flowGlow: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
}

