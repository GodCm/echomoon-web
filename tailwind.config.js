/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          lighter: '#A5B4FC',
        },
        background: {
          DEFAULT: '#0F0F1A',
          light: '#1A1A2E',
          lighter: '#16213E',
        },
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#E0E0E0',
          muted: '#A0A0A0',
        },
        functional: {
          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
        },
        moon: {
          glow: 'rgba(196, 180, 136, 0.3)',
          gold: '#C4B488',
          silver: '#B8C5D6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
