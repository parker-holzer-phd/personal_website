import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Use the verified production origin; environment variables can override it.
const site = process.env.SITE_URL || process.env.CF_PAGES_URL ||
  'https://parker-holzer-personal-website.holzerparker.workers.dev';
export default defineConfig({
  site,
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
