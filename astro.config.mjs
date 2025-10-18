import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true, // Needed for refresh in WSL, see Astro issue #6043
      },
    },
  },
  integrations: [react(), sitemap(), mdx()],
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
