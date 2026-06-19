export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05070d',
        graphite: '#0b101b',
        acid: '#9aff35',
        violet: '#a855f7',
        plasma: '#f43fbe',
        signal: '#22d3ee'
      },
      boxShadow: {
        acid: '0 0 28px rgba(154, 255, 53, 0.32)',
        violet: '0 0 28px rgba(168, 85, 247, 0.32)'
      },
      fontFamily: {
        display: ['Arial Black', 'Impact', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
