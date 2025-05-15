/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6ecf5',
          100: '#c2d2e8',
          200: '#9ab5da',
          300: '#7298cc',
          400: '#4f82c1',
          500: '#2c6cb7',
          600: '#1d5ba7',
          700: '#0a4997',
          800: '#0a3777',
          900: '#0A2463',
        },
        accent: {
          50: '#e7f2fa',
          100: '#c4e0f3',
          200: '#9ccded',
          300: '#74b9e7',
          400: '#56aae3',
          500: '#3E92CC',
          600: '#3583bb',
          700: '#2b73aa',
          800: '#236499',
          900: '#1a4a7a',
        },
        success: {
          500: '#2A9D8F',
        },
        warning: {
          500: '#E9C46A',
        },
        error: {
          500: '#E76F51',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};