// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',       // For Next.js pages directory
    './components/**/*.{js,ts,jsx,tsx}',  // For your components directory
    './app/**/*.{js,ts,jsx,tsx}',         // If using the app directory in Next.js 13+
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for social media icons hover effects
        'instagram-pink': '#E1306C',
        'github-gray': '#6e5494',
        'linkedin-blue': '#0077B5',
        'twitter-blue': '#1DA1F2',
      },
      backgroundImage: {
        // Gradient for the rainbow animation
        'gradient-rainbow':
          'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
      },
      animation: {
        // Animation for the border
        'border-rainbow': 'borderRainbow 5s linear infinite',
      },
      keyframes: {
        // Keyframes for the rainbow border animation
        borderRainbow: {
          '0%': {
            'border-image-source':
              'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
          },
          '100%': {
            'border-image-source':
              'linear-gradient(450deg, red, orange, yellow, green, blue, indigo, violet)',
          },
        },
      },
    },
  },
  plugins: [],
};