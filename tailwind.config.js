export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0B0908',
          900: '#14110F',
          800: '#1E1A16',
          700: '#2A2420',
          600: '#3A322C',
          500: '#544A42',
        },
        cream: {
          50:  '#FBF7F1',
          100: '#F5EEE2',
          200: '#E9DEC9',
          300: '#D9C9AC',
        },
        amber: {
          300: '#F0C97A',
          400: '#E8B85E',
          500: '#E0A64B',
          600: '#C78A2E',
          700: '#A16F21',
        },
        tomato: {
          400: '#D85940',
          500: '#C8432C',
          600: '#A8321F',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(20,17,15,0.08)',
        lift: '0 16px 48px -12px rgba(20,17,15,0.35)',
      },
      letterSpacing: {
        wider2: '0.18em',
      },
    },
  },
  plugins: [],
}
