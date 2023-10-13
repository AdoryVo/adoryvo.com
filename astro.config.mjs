import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/static'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      watch: {
        usePolling: true, // Needed for refresh in WSL, see Astro issue #6043
      },
    },
  },
  integrations: [tailwind()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
})