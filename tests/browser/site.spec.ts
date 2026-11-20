import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/about/', '/resume/', '/projects/', '/projects/statistical-modeling/', '/blog/', '/blog/reading-a-residual-plot/', '/publications/', '/contact/', '/404.html'];

test('core pages are accessible at desktop and mobile sizes without overflow', async ({ page }) => {
  test.setTimeout(120_000);
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('h1')).toHaveCount(1);
      if (['/', '/about/', '/projects/', '/publications/'].includes(route) && width !== 320) {
        // Bring lazy photos into view before capturing the full page.
        for (const photo of await page.locator('main img').all()) {
          await photo.scrollIntoViewIfNeeded();
          await photo.evaluate((image: HTMLImageElement) => image.decode());
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: `.tools/previews/${route === '/' ? 'home' : route.split('/')[1]}-${width}.png`, fullPage: true });
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${route}`).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations, `${width}px ${route}`).toEqual([]);
    }
  }
});

test('theme follows system and persists choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Use light color theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Use dark color theme' }).click();
  await page.goto('/resume/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  for (const route of ['/resume/', '/', '/about/', '/projects/', '/publications/']) {
    await page.goto(route);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations, `Dark theme: ${route}`).toEqual([]);
  }
  await page.goto('/');
  for (const image of await page.locator('main img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node: HTMLImageElement) => node.decode());
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: '.tools/previews/home-dark.png', fullPage: true });
});

test('mobile menu supports keyboard and escape; skip link focuses main', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.focus(); await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Home', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});

test('search, topic, category, and tag filters work, including empty states', async ({ page }) => {
  await page.goto('/projects/');
  await page.getByRole('button', { name: 'Statistics', exact: true }).click();
  await expect(page.locator('[data-filter-item]:visible')).toHaveCount(4);
  await page.getByRole('button', { name: 'All projects', exact: true }).click();
  await page.getByRole('searchbox').fill('safe');
  await expect(page.locator('[data-filter-item]:visible')).toHaveCount(1);
  await page.getByRole('searchbox').fill('not-a-real-project');
  await expect(page.locator('[data-filter-empty]')).toBeVisible();
  await page.goto('/blog/');
  await page.getByRole('button', { name: 'Statistics', exact: true }).click();
  await expect(page.locator('[data-filter-item]:visible')).toHaveCount(1);
  await page.getByRole('combobox', { name: 'Tag' }).selectOption('Software');
  await expect(page.locator('[data-filter-empty]')).toBeVisible();
  await page.getByRole('button', { name: 'All articles', exact: true }).click();
  await expect(page.locator('[data-filter-item]:visible')).toHaveCount(1);
});

test('math, code, responsive images, draft exclusion and supplied PDF behavior', async ({ page, request }) => {
  await page.goto('/blog/reading-a-residual-plot/');
  await expect(page.locator('.katex').first()).toBeVisible();
  await expect(page.locator('.prose img')).toHaveAttribute('alt', /Illustrative residual/);
  await page.goto('/blog/the-baseline-comes-first/');
  await expect(page.locator('pre.astro-code')).toBeVisible();
  await page.goto('/resume/');
  await expect(page.getByRole('link', { name: 'Download resume PDF' })).toHaveAttribute('href', '/resume.pdf');
  const pdf = await request.get('/resume.pdf');
  expect(pdf.ok()).toBe(true);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  const response = await request.get('/blog/understanding-neural-networks/');
  expect(response.status()).toBe(404);
});

test('navigation and content remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/projects/');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.locator('[data-filter-item]')).toHaveCount(10);
  await expect(page.locator('[data-filter-controls]')).toBeHidden();
  await context.close();
});


test('theme toggle works when local storage is blocked', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'light' });
  await context.addInitScript(() => {
    Object.defineProperty(Storage.prototype, 'getItem', { value() { throw new Error('Storage unavailable'); } });
    Object.defineProperty(Storage.prototype, 'setItem', { value() { throw new Error('Storage unavailable'); } });
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await page.getByRole('button', { name: 'Use dark color theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await context.close();
});


test('resume, contact, research, and homepage use the supplied identity', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Parker Holzer home' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Published work' })).toBeVisible();
  await expect(page.locator('.preview-note')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('Sample article');
  await page.goto('/resume/');
  await expect(page.getByRole('heading', { name: 'Parker Holzer, Ph.D.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Principal Data Scientist — Reputation.com' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Awards', exact: true })).toBeVisible();
  await page.goto('/contact/');
  await expect(page.getByRole('link', { name: 'Visit Google Scholar profile' })).toHaveAttribute('href', 'https://scholar.google.com/citations?user=RqViEccAAAAJ&hl=en');
  await expect(page.getByRole('link', { name: 'holzerparker@gmail.com' })).toHaveAttribute('href', 'mailto:holzerparker@gmail.com');
  await page.goto('/publications/');
  await expect(page.locator('article.publication')).toHaveCount(5);
  await expect(page.getByRole('link', { name: 'DOI', exact: false })).toHaveCount(5);
});


test('portfolio and research show sourced images and remove the retired project', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Building High-Integrity AI');
  await page.goto('/projects/');
  await expect(page.locator('.project-card')).toHaveCount(10);
  await expect(page.locator('.project-card img')).toHaveCount(10);
  await expect(page.locator('main')).not.toContainText('RepIQ');
  const retired = await request.get('/projects/repiq/');
  expect(retired.status()).toBe(404);
  const links = await page.locator('.project-card h3 a').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')!));
  for (const link of links) {
    await page.goto(link);
    const image = page.locator('.detail-visual img');
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node: HTMLImageElement) => node.decode());
    await expect(image).toHaveAttribute('alt', /.+/);
    await expect(page.locator('.detail-visual figcaption a')).toHaveAttribute('href', /^https:\/\//);
  }
  await page.goto('/publications/');
  await expect(page.locator('.publication img')).toHaveCount(5);
  for (const image of await page.locator('.publication img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node: HTMLImageElement) => node.decode());
    await expect(image).toHaveAttribute('alt', /.+/);
  }
  await expect(page.locator('.publication figcaption a')).toHaveCount(5);
});
