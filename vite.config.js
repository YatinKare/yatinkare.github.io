import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const staticBlogRoutes = () => ({
  name: 'static-blog-routes',
  closeBundle() {
    const output = resolve('docs');
    const articleRoutes = readdirSync(resolve('src/content/blog'))
      .filter((file) => file.endsWith('.md'))
      .map((file) => `blog/${file.replace(/\.md$/, '')}`);
    const routes = ['blog', ...articleRoutes];

    routes.forEach((route) => {
      const routeDirectory = resolve(output, route);
      mkdirSync(routeDirectory, { recursive: true });
      copyFileSync(resolve(output, 'index.html'), resolve(routeDirectory, 'index.html'));
    });
  },
});

export default defineConfig({
  plugins: [svelte(), staticBlogRoutes()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
