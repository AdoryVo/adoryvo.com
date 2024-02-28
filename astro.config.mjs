import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      watch: {
        usePolling: true // Needed for refresh in WSL, see Astro issue #6043
      }
    }
  },
  integrations: [tailwind(), react(), sitemap()],
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  site: 'https://www.adoryvo.com'
});