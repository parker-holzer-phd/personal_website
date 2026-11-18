# Personal website

A static Astro portfolio, resume, blog, and research archive. Plain CSS, typed Markdown collections, no database, and no server runtime. The implementation follows the adjacent `personal_website_plan.md`.

## Run locally

Use **Node.js 22.23.4 or newer** (the tested runtime is 22.23.5) and npm 9.6.5 or newer.

```sh
cd personal-website
npm install
npm run dev
```

Open the local address Astro prints, normally `http://localhost:4321`. If you already opened this folder as your terminal's working directory, omit the `cd` command.

This workspace also has a downloaded, checksum-verified runtime in the parent `.tools` folder. If `node` is unavailable in your terminal, temporarily add it:

```sh
export PATH="$(cd .. && pwd)/.tools/node-v22.23.5-darwin-x64/bin:$PATH"
npm run dev
```

If you opt into an Astro background server, use `npm run dev -- stop` or `npm run preview -- stop` to stop it.

The runtime is local tooling, not website source. It is not needed on Cloudflare.

```sh
npm run check        # Astro and TypeScript diagnostics
npm run build        # Static output + route, metadata, link, and draft checks
npm test             # Publishing checks against the built output
npm run preview      # Serve the production output
```

For browser checks, install Chromium once with `npx playwright install chromium`, then run `npm run test:browser`. Tests cover desktop/mobile/320px layouts, WCAG A/AA automated checks, navigation, search and filters, persisted/system themes, math, code, draft URLs, and operation without JavaScript. You may instead set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to a locally installed Chromium/Chrome executable. Automated accessibility checks supplement manual keyboard and screen-reader review.

## Edit your identity and resume

Edit `src/config.ts` for your name, initials, introduction, biography, interests, professional topics, resume sections, email, and verified social profile URLs. Empty contact fields do not render links. The current profile, career history, education, skills, awards, and mentorship are transcribed from the owner-supplied `ParkerHolzer_Resume.pdf`. The original PDF is included at `public/resume.pdf`, and the supplied email, LinkedIn, and Google Scholar links are active. The supplied portrait is used on the homepage and About page; the supplied family photo appears in the About page’s family section. Additional personal interests can be added in `src/config.ts`. A personal GitHub profile was not supplied, so no account is inferred. See `CONTENT_SOURCES.md` for publication and project sources.

Put your PDF at `public/resume.pdf`. The download button appears only when this file exists **at build time**. The web resume also has a print stylesheet. The homepage uses your supplied portrait. The About page includes both the portrait and family photo.

The site has no contact form and collects no messages. Setting an email exposes that address as a `mailto:` link. Use only contact details you intend to share.

## Personal photos

The supplied images are stored as `src/assets/photos/parker-portrait.jpg` and `src/assets/photos/holzer-family.jpg`. Replace those files to change the photos. Edit alternative text and the family caption in `site.photos` in `src/config.ts`; edit the short personal introduction in `site.personal`.

`PersonalPhoto.astro` generates responsive AVIF, WebP, and JPEG variants through Astro’s image pipeline. The portrait has a modest display crop; the family photo retains its original proportions so everyone remains in frame. The homepage portrait loads eagerly and the lower family photo loads lazily. Your original files in the parent workspace are unchanged.

## Add or edit a project

Edit Markdown in `src/content/projects/`. The filename supplies the URL; `hearye.md` becomes `/projects/hearye/`. Delete unused sample entries or replace their content.

```yaml
---
title: My verified project
description: A concise, accurate explanation of the work.
tags: [Software, Statistics]
draft: false
sample: false
status: In progress
featured: true
order: 1
role: Your actual contribution
technologies: [Python, R]
visual: model
links: []
---
```

Write the problem, role, approach, technologies, results, and limitations below the frontmatter. Use verified links, for example `links: [{ label: Source code, url: 'https://github.com/ACCOUNT/REPOSITORY' }]` with your actual repository. Optional `image: /images/project.webp` and `imageAlt` replace the abstract card artwork. Keep images small, include accurate alternative text, and use approved screenshots. Available abstract `visual` values are `signal`, `model`, `package`, and `object`.

`draft` defaults to `true`, so unfinished entries stay out of listings and routes. `sample: true` keeps the sample label and prevents search indexing on the detail page. `featured: true` adds a project to the homepage, up to three in `order` sequence. The homepage features three verified entries: RepIQ, Hermite–Gaussian exoplanet research, and rvmethod. The HearYe and making-project entries remain labeled samples awaiting owner details. Business metrics come from the supplied resume; package installation counts retain their November 16, 2026 date. The research case study uses the published paper’s evaluation metrics.

## Publish an article

1. Create `src/content/blog/my-article.md`.
2. Add the following frontmatter and write Markdown below it.
3. Preview locally. Set `draft: false` only when finished, then commit and push.

```yaml
---
title: Your article title
description: A short description for readers and search engines.
pubDate: 2026-11-18
category: Statistics
tags: [Modeling, Explanation]
draft: true
sample: false
---
```

Optional fields: `updatedDate`, `image` (under `/images/`), and `imageAlt`. Categories may include Artificial Intelligence, Statistics, Software Development, Mathematics, Science, and Personal; filters are generated from published content. Project search matches titles, descriptions, tags, and technologies. Article search matches titles, descriptions, tags, and categories. Category/topic filters, tag filters, and search combine.

Use fenced code blocks with a language (`python`, `r`, `ts`, etc.) for syntax highlighting. Inline math uses `$...$`; display math uses `$$` on separate lines. KaTeX CSS/fonts ship locally. Markdown images scale to their text column; add alternative text between `![` and `]`. No MDX installation is needed for this MVP.

`draft: true` entries are excluded from **all** listings, direct article routes, homepage cards, RSS, and sitemap, even in local development. The example neural-network article intentionally remains a draft. Three published **sample** notes demonstrate the design; replace or delete them before launch. Sample notes are excluded from RSS and the homepage, and marked `noindex` even when the rest of the site is indexable. The homepage currently features real research publications instead of sample blog notes. RSS becomes useful when you add real, published, `sample: false` writing.

## Add a publication

Copy `src/content/publications/example.md` and supply verified title, description, authors, year, venue, abstract, and optional `doi`, `pdf`, `code`, or `url` values. Link fields require full HTTP(S) URLs; DOI values should use `https://doi.org/...`. Set **both** `draft: false` and `sample: false` for a real publication. Sample and draft publications never appear on the public list. Five real research papers linked in the supplied resume have been added, with verified authors, journal issue years, venues, DOI links, and short original summaries. Citation years use the journal issue year: the trophoblast subtypes paper is 2021 (online 2020), and the pregnancy-loss pathology paper is 2024 (online 2023).

## Design and structure

- `src/config.ts`: owner-editable profile and resume.
- `src/content.config.ts`: schema-validated collections.
- `src/content/`: Markdown articles, projects, and publication records.
- `src/components/`: navigation, theme control, cards, diagrams, filters, and footer.
- `src/layouts/BaseLayout.astro`: shared metadata and page shell.
- `src/styles/global.css`: responsive layouts and light/dark design tokens.
- `src/pages/`: all requested routes, RSS, robots, and 404.
- `public/`: original diagrams, favicon, social image, optional PDF, and Cloudflare response headers.

Only the menu, theme toggle, and filters require small browser scripts. The site uses system fonts and no third-party requests, analytics, accounts, paid services, or notification integration. Local-storage errors do not prevent theme switching; system preference is used until the user chooses a theme. Motion preferences are respected.

## GitHub and Cloudflare Pages

The project is initialized as a separate local Git repository with a `main` branch. The parent plan and downloaded tooling remain outside that repository. No GitHub remote, hosted repository, or Cloudflare project has been created.

Create an empty dedicated GitHub repository, then run from this directory, replacing the remote with your actual URL:

```sh
git add .
git commit -m "Build personal portfolio website"
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

In Cloudflare's **Workers & Pages**, create a **Pages** application and import that GitHub repository. Use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Leave empty when pushing this project's repository |
| Node version | `22.23.5` (set `NODE_VERSION` if necessary; `.node-version` is included) |
| Production `SITE_URL` | The actual assigned `https://PROJECT.pages.dev` URL |
| `PUBLIC_LAUNCH_READY` | `false` until identity and content are ready, then `true` |

If you instead commit the entire parent workspace as your repository, set the Cloudflare root directory to `personal-website` and ignore the parent `.tools` directory. The preferred workflow is the separate repository already initialized here.

Astro is explicitly configured with `output: 'static'`. **No Cloudflare adapter, Worker, Functions, database, or secret is required.** The current Astro docs emphasize Workers for new projects, but Cloudflare still documents Pages' Git-based Astro workflow. This project preserves the plan's Pages choice.

Cloudflare builds each push on `main` and creates preview deployments for enabled branches/PRs. Review a preview before merging. Restrict preview access in Cloudflare if the source content is private; `noindex` does not provide access control. Set preview `PUBLIC_LAUNCH_READY=false`. If `SITE_URL` is omitted, Cloudflare's `CF_PAGES_URL` supplies the deployment origin. Explicitly set the production `SITE_URL` for stable canonical URLs; preview deployments can use their own `CF_PAGES_URL` by omitting `SITE_URL` in preview variables.

The build always generates `/rss.xml`, `/sitemap-index.xml`, and `/sitemap-0.xml`. With no configured origin, local builds use the real development origin `http://localhost:4321` for these feeds/maps and omit page canonical tags. This fallback is only for local work. Set `SITE_URL` before uploading `dist` outside Cloudflare. Never deploy localhost URLs. Unknown profile details keep HTML and robots nonindexable until **both** `profileIsPlaceholder: false` and `PUBLIC_LAUNCH_READY=true` are set.

Deploying a static build to Cloudflare Pages uses no database and may fit free hosting allowances. Check current provider limits and any domain pricing before purchase; no paid service has been added.

### Custom domain later

After the Pages deployment works, open its **Custom domains**, add a domain you own, and follow Cloudflare's DNS/HTTPS instructions. Update production `SITE_URL` to the final HTTPS domain and rebuild. Verify canonical URLs, sitemap, RSS, and social images use that domain. Configure redirects in Cloudflare if you want only the custom domain to be indexed; avoid a site-wide redirect in the shared artifact that would also redirect preview deployments.

## Remaining owner information before public launch

Already supplied: name, professional bio, career history, education, skills, awards, mentorship, resume PDF, email, LinkedIn, Google Scholar, three real project entries, and five research-paper citations.

Still useful:

- Any additional personal interests or family copy you would like to share.
- HearYe’s verified role, technology stack, results, screenshots, and links; details for any additional hands-on projects.
- A personal GitHub profile URL, if you want one displayed.
- Finished blog articles to replace or remove the labeled sample notes.
- The production hostname and GitHub/Cloudflare account setup.

Review the remaining sample/placeholder content, configure `SITE_URL`, and enable indexing with `PUBLIC_LAUNCH_READY=true` when ready. The real profile already has `profileIsPlaceholder: false`; the launch flag remains disabled by default. Check every page in light/dark themes, on a phone, and with keyboard navigation before launch.

## Official implementation references

Verified during implementation on November 18, 2026:

- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro 7 upgrade and Markdown processor changes](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [Astro Markdown](https://docs.astro.build/en/guides/markdown-content/)
- [Astro RSS](https://docs.astro.build/en/recipes/rss/)
- [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Cloudflare preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Cloudflare custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

Astro 7.4.13 is pinned. Its official Unified Markdown processor is explicitly installed for compatible remark-math/rehype-katex rendering. Exact resolved dependency versions are in `package-lock.json`; use `npm ci` for reproducible installations.
