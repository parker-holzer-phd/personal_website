import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const site = process.env.SITE_URL || process.env.CF_PAGES_URL;
export default defineConfig({
  site: site || 'http://localhost:4321',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, wrap: true },
    }),
  },
  vite: { define: { 'import.meta.env.SITE_CONFIGURED': JSON.stringify(Boolean(site)) } },
});
