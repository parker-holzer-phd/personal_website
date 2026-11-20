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

Edit `src/config.ts` for your name, initials, introduction, biography, interests, professional topics, resume sections, email, and verified social profile URLs. Empty contact fields do not render links. The current profile, career history, education, skills, awards, and mentorship are transcribed from the owner-supplied `ParkerHolzer_Resume.pdf`. The original PDF is included at `public/resume.pdf`, and the supplied email, LinkedIn, and Google Scholar links are active. The supplied portrait is used on the homepage and About page; the supplied family photo appears in the About page’s family section. The owner’s November 20 improvement notes add a lifelong interest in math, family, biking, basketball, gardening, 3D printing, the Parker Polymers Etsy shop, the older GitHub account, and the University of Utah astronomy research description. These are editable in `src/config.ts`. The original downloadable resume PDF is unchanged; the new education description appears in the web resume. See `CONTENT_SOURCES.md` for publication and project sources.

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
image: /images/projects/my-project.webp
imageAlt: Describe the actual project visualization.
imageWidth: 1200
imageHeight: 720
imageCaption: Brief context for the image.
imageSource: https://github.com/ACCOUNT/REPOSITORY
links: []
---
```

Write the problem, role, approach, technologies, results, and limitations below the frontmatter. Use verified links, for example `links: [{ label: Source code, url: 'https://github.com/ACCOUNT/REPOSITORY' }]` with your actual repository. Use `image: /images/projects/project.webp`, descriptive `imageAlt`, intrinsic `imageWidth`/`imageHeight`, `imageCaption`, and an HTTP(S) `imageSource` for original project figures. Cards show the entire visualization without cropping; the detail page includes its caption and source. Keep images small and use approved screenshots. Published projects and publications require an image, alternative text, caption, and source URL; the content schema validates these before building. Draft/sample entries may still use the abstract `visual` options `signal`, `model`, `package`, and `object`.

`draft` defaults to `true`, so unfinished entries stay out of listings and routes. `sample: true` keeps the sample label and prevents search indexing on the detail page. `featured: true` adds a project to the homepage, up to three in `order` sequence. The homepage features Hermite–Gaussian exoplanet research, Connecticut housing topic models, and rvmethod. RepIQ was removed from the project collection at the owner’s request; the resume retains the supplied career history. Ten entries cover rvmethod and all nine public repositories from the older GitHub account, including an explicitly attributed deployment-course fork. HearYe and the generic making entry are drafts awaiting real project content and images. Business metrics come from the supplied resume; package installation counts retain their November 16, 2026 date. The research case study uses the published paper’s evaluation metrics. Other historical analyses are described as exploratory, with no new performance claims.

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

Copy `src/content/publications/example.md` and supply verified title, description, authors, year, venue, abstract, and optional `doi`, `pdf`, `code`, or `url` values. Link fields require full HTTP(S) URLs; DOI values should use `https://doi.org/...`. Set **both** `draft: false` and `sample: false` for a real publication. Sample and draft publications never appear on the public list. Five real research papers linked in the supplied resume have been added, with verified authors, journal issue years, venues, DOI links, and short original summaries. Each publication now includes a locally hosted original figure, alternative text, a short caption, and a source link. Images also appear on the homepage research cards. Citation years use the journal issue year: the trophoblast subtypes paper is 2021 (online 2020), and the pregnancy-loss pathology paper is 2024 (online 2023).

## Design and structure

- `src/config.ts`: owner-editable profile and resume.
- `src/content.config.ts`: schema-validated collections.
- `src/content/`: Markdown articles, projects, and publication records.
- `src/components/`: navigation, theme control, cards, diagrams, filters, and footer.
- `src/layouts/BaseLayout.astro`: shared metadata and page shell.
- `src/styles/global.css`: responsive layouts and light/dark design tokens, with a navy/teal hero, gold accents, teal page backgrounds, and illustrated cards.
- `src/components/ResearchImage.astro`: shared publication imagery for the homepage and archive.
- `public/images/projects/` and `public/images/publications/`: optimized original figures and two repository-structure diagrams; provenance is documented in `CONTENT_SOURCES.md`.
- `src/pages/`: all requested routes, RSS, robots, and 404.
- `public/`: original diagrams, favicon, social image, optional PDF, and Cloudflare response headers.

Only the menu, theme toggle, and filters require small browser scripts. The site uses system fonts and no third-party requests, analytics, accounts, paid services, or notification integration. Local-storage errors do not prevent theme switching; system preference is used until the user chooses a theme. Motion preferences are respected.

## GitHub and Cloudflare deployment

The dedicated repository is [parker-holzer-phd/personal_website](https://github.com/parker-holzer-phd/personal_website), using the `main` branch. The parent workspace, plan, and downloaded tooling stay outside this repository.

### Existing Cloudflare Workers project

The connected Cloudflare project is `parker-holzer-personal-website`. It uses **Workers Builds**. The tracked `wrangler.jsonc` explicitly deploys the prebuilt `dist/` directory as static assets, with directory-index routing and the custom `404.html` page.

Keep these settings in Cloudflare's **Settings → Build**:

| Setting | Value |
| --- | --- |
| Repository | `parker-holzer-phd/personal_website` |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (or `npm run deploy`) |
| Root directory | Leave empty |
| Build variable `NODE_VERSION` | `22.23.5` |
| Build variable `SITE_URL` | Optional override; defaults to `https://parker-holzer-personal-website.holzerparker.workers.dev` |
| Build variable `PUBLIC_LAUNCH_READY` | `false` for initial review; `true` when ready for search indexing |

The build command generates and validates the static website once. The deploy command uploads that output. There is no custom build command in `wrangler.jsonc`, so deployment does not rebuild or reconfigure Astro. Wrangler is pinned to `4.164.0`, matching the version in the reported deployment log.

The website stays entirely static: no Astro Cloudflare adapter, server script, database, session storage, or Cloudflare Images binding is required. Photos are optimized at build time. `wrangler.jsonc` names the existing Worker from the log, so deployment targets the same project.

The original deployment failed because no Wrangler configuration existed. Wrangler automatically ran `astro add cloudflare`, rebuilt the website into `dist/client/`, and then the build verifier correctly reported that the expected `dist/index.html` was missing. The explicit asset configuration prevents that automatic framework conversion and preserves the existing `dist/` output contract.

Validate locally before pushing:

```sh
npm run check
npm run build
npm test
npm run check:deploy
```

`check:deploy` performs Wrangler's dry run; it validates configuration without publishing. `npm run deploy` performs an actual deployment using your Cloudflare authentication, after you have run `npm run build`. The Git integration handles authentication when Cloudflare runs these commands.

After the fix is pushed, use the latest commit in Cloudflare's build history. Retrying an older failed commit will still use that commit's files. Automatic Git deployments normally start on pushes to `main`.

The verified production address is **https://parker-holzer-personal-website.holzerparker.workers.dev**. It is the default origin in `astro.config.mjs`, so canonical links, RSS, sitemap, structured data, and sharing metadata work without an extra dashboard variable. `SITE_URL` takes priority if set; update or remove any old dashboard value. Pages preview deployments can supply `CF_PAGES_URL`. For a custom domain, set `SITE_URL` as a **build** variable to that domain and redeploy. `PUBLIC_LAUNCH_READY=false` keeps indexing disabled while the site remains accessible by URL.

### Cloudflare Pages alternative

The same static build is also deployable to Pages, as proposed in the original plan. For a separate Pages application, import this repository, use branch `main`, framework preset Astro, build command `npm run build`, output directory `dist`, and an empty root directory. Set `NODE_VERSION=22.23.5` and use the real `*.pages.dev` URL for `SITE_URL`. A Pages deployment publishes the build output directly.

### Custom domain later

After the deployment works, add a domain you own in the Cloudflare project's domain settings and follow the DNS/HTTPS instructions. Set production `SITE_URL` to the final HTTPS domain and rebuild. Verify canonical URLs, sitemap, RSS, and social images use that domain.

No paid service has been added. Check current provider limits and domain pricing before purchasing anything.

## Remaining owner information before public launch

Already supplied: name, professional bio, career history, education and astronomy research details, skills, awards, mentorship, resume PDF, email, LinkedIn, Google Scholar, GitHub, personal interests, Etsy shop, project repositories, and five research-paper citations. The November 20 improvements are implemented without needing additional owner content.

Still useful:

- HearYe’s verified role, technology stack, results, screenshots, and links; details for any additional hands-on projects.
- Optional product photos and a specific 3D-printing case study if you want a making project in the portfolio; the Etsy link is already on About.
- Finished blog articles to replace or remove the labeled sample notes.
- An optional custom domain; the initial workers.dev deployment is live.

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

Deployment references checked while fixing the reported build failure:

- [Workers static assets configuration](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Workers Builds settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Wrangler automatic framework setup](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy)
