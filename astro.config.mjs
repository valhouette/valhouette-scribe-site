import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://valhouettescribe.com',
  integrations: [sitemap()],
  output: 'static',
  compressHTML: true,
  adapter: cloudflare(),
});