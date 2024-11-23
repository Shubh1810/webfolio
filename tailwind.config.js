// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */

 
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'instagram-pink': '#E1306C',
        'github-gray': '#6e5494',
        'linkedin-blue': '#0077B5',
        'twitter-blue': '#1DA1F2',
        yellow: {
          500: '#EAB308',
        },
        red: {
          500: '#EF4444',
        },
        blue: {
          500: '#3B82F6',
        },
        cyan: {
          500: '#06B6D4',
        },
        violet: {
          500: '#8B5CF6',
        },
        neutral: {
          200: '#E5E5E5',
          800: '#262626',
        }
      },
      backgroundImage: {
        'gradient-rainbow':
          'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)',
      },
      animation: {
        'border-rainbow': 'borderRainbow 5s linear infinite',
        'gradient-x': 'gradient-x 5s ease infinite',
      },
      keyframes: {
        borderRainbow: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        },
        'gradient-x': {
          '0%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
          '100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          }
        }
      },
      fontFamily: {
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
      },
    }
  },
  plugins: [addVariablesForColors]
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, value]) => [`--tw-${key}`, value])
  );
  
  addBase({
    ':root': newVars,
  });
}