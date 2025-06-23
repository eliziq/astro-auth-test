// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server', // This ensures all pages are server-rendered by default
  adapter: node({
    mode: 'standalone'
  }),
});
