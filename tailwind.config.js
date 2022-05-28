module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#2a3b4a',
        'dark': '#0f172a' // slate-900
      },
      keyframes: {
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.3)' }
        }
      },
      animation: {
        heartbeat: 'heartbeat 2s linear infinite alternate'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
