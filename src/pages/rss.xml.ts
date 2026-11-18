import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedPosts } from '../lib/content';
import { site } from '../config';
export async function GET(context: APIContext) {
  const posts = (await publishedPosts()).filter((post) => !post.data.sample);
  // Without a production origin, emit a valid empty feed with no invented domain.
  if (!context.site) return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Portfolio notebook</title><link>/</link><description>Set SITE_URL to enable absolute feed links.</description></channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
  return rss({ title: `${site.name} — Notebook`, description: site.description, site: context.site, items: posts.map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.pubDate, categories: post.data.tags, link: `/blog/${post.id}/` })), customData: '<language>en-us</language>' });
}
