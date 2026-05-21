// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [svelte(), alpinejs()],
  vite: {
    plugins: [tailwindcss()],
  },
});
