// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#004e5f',
        highlight: '#def7f7',
        lightgrey: '#e6ebf4',
        lightblue: '#bdc0cf'
      },
      fontFamily: {
        sans: ['sans-serif']
      },
      fontSize: {
        // Should maybe use 0.875rem and 2.5rem instead
        button: ['14px', '40px']
      },
      letterSpacing: {
        button: '0.4px'
      },
      minWidth: {
        20: '4rem'
      },
      width: {
        90: '22rem'
      },
      animation: {
        success: 'success 0.4s ease',
        ellipsis_1: 'ellipsis_1 0.6s infinite',
        ellipsis_2: 'ellipsis_2 0.6s infinite',
        ellipsis_3: 'ellipsis_3 0.6s infinite'
      },
      animationDelay: {},
      keyframes: {
        success: {
          '0%': { transform: 'scale(0)' },
          '30%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1.1)' }
        },
        ellipsis_1: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        ellipsis_2: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(24px, 0)' }
        },
        ellipsis_3: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' }
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('enabled', '&:enabled');
    })
  ]
};
