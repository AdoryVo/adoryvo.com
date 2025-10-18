import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      watch: {
        usePolling: true, // Needed for refresh in WSL, see Astro issue #6043
      },
    },
  },
  integrations: [tailwind(), react(), sitemap(), mdx()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  redirects: {
    '/split': '/projects/check-splitter',
  },
  site: 'https://www.adoryvo.com',
})
