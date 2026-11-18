import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, access } from 'node:fs/promises';
import astroConfig from '../astro.config.mjs';

test('drafts have no generated page, feed item, or sitemap entry', async () => {
  await assert.rejects(access('dist/blog/understanding-neural-networks/index.html'));
  for (const file of ['dist/index.html', 'dist/blog/index.html', 'dist/rss.xml', 'dist/sitemap-0.xml']) {
    const data = await readFile(file, 'utf8');
    assert(!data.includes('understanding-neural-networks'), `Draft appears in ${file}`);
    assert(!data.includes('DRAFT_ONLY_SENTINEL_NEURAL_NETWORKS'));
  }
});

test('resume download reflects whether a PDF was supplied; contact has no dummy links', async () => {
  const resume = await readFile('dist/resume/index.html', 'utf8');
  assert.equal(resume.includes('href="/resume.pdf"'), existsSync('public/resume.pdf'));
  const contact = await readFile('dist/contact/index.html', 'utf8');
  assert(!contact.includes('href="#"'));
});

test('math and syntax highlighting render in static output', async () => {
  if (existsSync('src/content/blog/reading-a-residual-plot.md')) assert.match(await readFile('dist/blog/reading-a-residual-plot/index.html', 'utf8'), /class="katex"/);
  if (existsSync('src/content/blog/the-baseline-comes-first.md')) assert.match(await readFile('dist/blog/the-baseline-comes-first/index.html', 'utf8'), /astro-code/);
});

test('supplied resume PDF is available and resume metrics retain dates', async () => {
  const pdf = await readFile('public/resume.pdf');
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  assert.deepEqual(await readFile('dist/resume.pdf'), pdf);
  const resume = await readFile('dist/resume/index.html', 'utf8');
  assert.match(resume, /Parker Holzer, Ph.D./);
  assert.match(resume, /November 16, 2026/);
  assert.match(resume, /November 2026/);
  assert(!resume.includes('[Role / organization]'));
  const publications = await readFile('dist/publications/index.html', 'utf8');
  assert.equal([...publications.matchAll(/class="publication"/g)].length, 5);
  assert(!publications.includes('No verified publications'));
});


test('canonical, sharing, sitemap, and feed URLs use the configured production origin', async () => {
  const origin = new URL(astroConfig.site).origin;
  assert(!origin.includes('localhost'), 'A production origin must be configured');
  for (const route of ['', 'about/', 'resume/', 'projects/', 'publications/', 'contact/']) {
    const html = await readFile(`dist/${route}index.html`, 'utf8');
    const expected = new URL(`/${route}`, origin).href;
    assert(html.includes(`rel="canonical" href="${expected}"`), `Incorrect canonical for /${route}`);
    assert(html.includes(`property="og:url" content="${expected}"`), `Incorrect sharing URL for /${route}`);
    assert(html.includes(`property="og:image" content="${origin}/images/social-card.png"`));
  }
  for (const file of ['rss.xml', 'sitemap-index.xml', 'sitemap-0.xml', 'robots.txt']) {
    const output = await readFile(`dist/${file}`, 'utf8');
    assert(output.includes(origin), `Missing production origin in ${file}`);
    assert(!output.includes('localhost'), `Development URL leaked into ${file}`);
  }
});
