import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const httpUrl = z.url().refine((value) => /^https?:\/\//.test(value), 'Use an HTTP(S) URL');
const localImage = z.string().refine((value) => value.startsWith('/images/'), 'Put images in public/images');
const common = {
  title: z.string(), description: z.string(), tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true), sample: z.boolean().default(false),
};
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({ ...common, pubDate: z.coerce.date(), updatedDate: z.coerce.date().optional(), category: z.string(), image: localImage.optional(), imageAlt: z.string().optional() }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({ ...common, status: z.string(), featured: z.boolean().default(false), order: z.number().default(0), role: z.string(), technologies: z.array(z.string()), image: localImage.optional(), imageAlt: z.string().optional(), visual: z.enum(['signal', 'model', 'package', 'object']).default('model'), links: z.array(z.object({ label: z.string(), url: httpUrl })).default([]) }),
});
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({ ...common, authors: z.array(z.string()), year: z.number().int(), venue: z.string(), abstract: z.string(), doi: httpUrl.optional(), pdf: httpUrl.optional(), code: httpUrl.optional(), url: httpUrl.optional() }),
});
export const collections = { blog, projects, publications };
