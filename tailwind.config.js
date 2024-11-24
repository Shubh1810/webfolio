// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");
const svgToDataUri = require("mini-svg-data-uri");

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
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid': 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
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
  plugins: [addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
    matchUtilities(
      {
        "bg-grid": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
        "bg-grid-small": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
        "bg-dot": (value: any) => ({
          backgroundImage: `radial-gradient(circle, ${value} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }),
      },
      
    );
  },
],
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