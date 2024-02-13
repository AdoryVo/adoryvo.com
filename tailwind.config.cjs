/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        scales: "url('/src/assets/scales.png')",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#2a3b4a',
        dark: '#0f172a', // slate-900
      },
      keyframes: {
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.3)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 2s linear infinite alternate',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
