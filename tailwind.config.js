module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    screens: {
      sm: { max: '450px' },
      md: { max: '700px' },
      'md-min': '700px',
    },
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      colors: {
        primary: '#2563eb',
        secondary: '#dc2626',
      },
    },
  },
  plugins: [],
};
