import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve, dirname, relative } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('dist');
async function walk(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map((e) => e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name)))).flat(); }
const files = await walk(root);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const drafts = [];
const samples = [];
for (const collection of ['blog', 'projects']) {
  const base = resolve(`src/content/${collection}`);
  for (const source of await walk(base)) {
    if (!source.endsWith('.md')) continue;
    const markdown = await readFile(source, 'utf8');
    const frontmatter = markdown.split('---')[1] || '';
    const id = relative(base, source).replace(/\.md$/, '');
    const route = `/${collection}/${id}/`;
    if (!/^draft:\s*false\s*(?:#.*)?$/m.test(frontmatter)) drafts.push(route);
    if (collection === 'blog' && /^sample:\s*true\s*(?:#.*)?$/m.test(frontmatter)) samples.push(route);
  }
}
const required = ['index.html', 'about/index.html', 'resume/index.html', 'projects/index.html', 'blog/index.html', 'publications/index.html', 'contact/index.html', '404.html', 'rss.xml', 'robots.txt', 'sitemap-index.xml'];
for (const file of required) assert(files.includes(join(root, file)), `Missing required output: ${file}`);
for (const route of drafts) assert(!files.includes(join(root, route, 'index.html')), `Draft route exists: ${route}`);
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  assert(/<h1[\s>]/.test(html), `Missing h1: ${file}`);
  assert(/<title>.+?<\/title>/.test(html), `Missing title: ${file}`);
  assert(/<meta name="description" content="[^"]+"/.test(html), `Missing description: ${file}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(link)) continue;
    const target = decodeURIComponent(link.split(/[?#]/)[0]);
    if (!target) continue;
    let path = target.startsWith('/') ? join(root, target) : resolve(dirname(file), target);
    try { if ((await stat(path)).isDirectory()) path = join(path, 'index.html'); await stat(path); }
    catch { throw new Error(`Broken local link ${link} in ${file.replace(root, 'dist')}`); }
  }
}
const feed = await readFile(join(root, 'rss.xml'), 'utf8');
for (const route of samples) assert(!feed.includes(route), `Sample article in RSS feed: ${route}`);
for (const file of files.filter((file) => /\.(html|xml)$/.test(file))) {
  const output = await readFile(file, 'utf8');
  for (const route of drafts) assert(!output.includes(route), `Draft linked in output: ${route}`);
}
console.log(`Verified ${htmlFiles.length} HTML pages, core routes, local links, metadata, and draft exclusion.`);
