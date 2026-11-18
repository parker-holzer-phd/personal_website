import { getCollection } from 'astro:content';
export const publishedPosts = async () => (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
export const publishedProjects = async () => (await getCollection('projects', ({ data }) => !data.draft)).sort((a, b) => a.data.order - b.data.order);
export const publishedPublications = async () => (await getCollection('publications', ({ data }) => !data.draft && !data.sample)).sort((a, b) => b.data.year - a.data.year);
export const readingTime = (body = '') => Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220));
export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date);
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
