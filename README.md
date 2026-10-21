# Le Petit Vitruve (lepetitvitruve.fr)

A **visual reference for architecture vocabulary**: one page per element, each pairing a plain-language description with a simple annotated diagram, so a reader can match a word to what they're looking at.

Example page: `/fenetre-serlienne` shows the name, aliases (*fenêtre vénitienne*), and an annotated SVG diagram next to a description of what the element looks like and how to recognize it.

This README describes **Version 1 only**. See `ROADMAP.md` for what Version 2 (English, tag browsing, related elements, buildings) and Version 3 (search) add on top of this. Do not build ahead of V1 scope; if something below looks like it's missing a feature, it's probably deferred on purpose — check the roadmap before adding it.

The site is **fully static and framework-free on the client**: content is validated at build time and turned into plain HTML, and the only JavaScript is a couple of small vanilla scripts. There is no backend, no database, no React, no MDX, and no photos stored in the repository.

---

## 1. Architecture at a glance

```
content/ (YAML + Markdown + SVG, versioned in Git)      <- source of truth
        |  Astro content collections (Zod validation)
        |  scripts/check-content.ts (extra cross-checks)
        v
Astro (static output)  -->  dist/ (plain HTML + CSS + tiny scripts)
        |
        v
Static host (Cloudflare Pages, Netlify or GitHub Pages)
```

**Key decisions for V1**

| Topic | Decision |
|---|---|
| Framework | **Astro** (static output). Pages are HTML; interactivity is limited to small vanilla TypeScript scripts. |
| Content | Files in `content/`, reviewed through PRs. |
| Language | **French only.** No locale routing, no `/en`, no language switcher. |
| Prose format | **Plain Markdown, rendered as-is.** No front matter, no section markers. Each entry's file is one ordinary article, `# Title` then `##` sections. |
| Page layout | Four rows: site header; title with gender and aliases; a diagram card and a Markdown card side by side; site footer. |
| Navigation | A single, unfiltered index page listing every entry. Tags are metadata only; there are no tag pages, filters, or search. |
| Connections | None. Entries do not link to each other; there is no "related elements" section. Exemples lists real buildings with external links; these are not links between entries. |
| Type safety | Zod schemas in `src/content.config.ts` validate `annotation.yaml` and give TS types. |
| Diagrams | Original hand-authored SVGs, styled with CSS variables. Hovering or focusing a part highlights it as a labeling aid; it does not change the text shown. |
| Photos | **None stored and none embedded**, now or later. |
| Progressive enhancement | Pages are fully readable without JavaScript; scripts only add interactivity. |
| Mobile | Mobile-first layout, touch-sized targets (24px minimum for markers, 44px for legend rows), light pages. |
| Backend | None. See section 11. |

---

## 2. Repository layout (V1)

```
.
├── AGENTS.md
├── EDITORIAL_GUIDELINES_fr.md      # French writing rules for fr.md (structure, definitions, links)
├── README.md
├── ROADMAP.md
├── GRAPHICS_GUIDELINES.md    # visual spec of vector graphics
├── DESIGN_GUIDELINES.md      # visual and structural spec
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── .github/workflows/ci.yml
├── content/
│   └── elements/
│       └── serlian-window/
│           ├── annotation.yaml        # localized name, slug, aliases, tags, gender, optional parts
│           ├── fr.md               # plain Markdown, no front matter
│           ├── preview.svg         # optional compact drawing
│           └── full.svg            # optional annotated drawing
├── scripts/
│   └── check-content.ts            # cross-checks Zod cannot express (read-only)
├── public/                         # favicon, robots.txt
└── src/
    ├── content.config.ts           # collection + Zod schema
    ├── layouts/BaseLayout.astro    # <html lang="fr">, SEO head, header/footer
    ├── components/                 # SiteHeader, SiteFooter, TitleRow,
    │                               # DiagramCard, AnnotationsCard, MarkdownCard, SeoHead
    ├── views/ElementView.astro
    ├── pages/
    │   ├── index.astro             # the unfiltered index of all entries
    │   └── [slug].astro            # element pages
    ├── scripts/                    # diagram.ts (vanilla)
    ├── styles/                     # tokens.css, base.css, element.css
    └── lib/                        # content queries, slugs, seo
```

There is no `content/buildings/`, no `src/pages/en/`, no `src/pages/etiquette/`, no `src/pages/batiment/`, no `src/pages/recherche.astro`, and no `glossary-filter.ts`. These arrive with V2 and V3. `content/tags/<group>/<name>.yaml` only holds tag definitions (label, optional chip color) used by the annotations card.

---

## 3. Content model (V1)

### 3.1. Tag

A tag is a label that can be attached to an element to indicate its style, region, artistic intention, or other classification. `content/tags/<group>/<name>.yaml` is the single source of truth: an element's `tags` field is a list of tag keys, and every key must match a tag file (`check:content` enforces it). Each tag file carries French (`fr`) and English (`en`) texts.

```yaml
key: mood/cozy
slug: { fr: intime, en: cozy }
label: { fr: Intime, en: Cozy }
color: "#f8e1c8"           # optional light chip background; default is light gray
description:
  fr: "..."
  en: "..."
```

The element page's annotations card (below the diagram) lists an element's tags as French-labelled chips, grouped by tag group (Catégorie = `category`, Style, Période, Région, Sentiment = `mood`, Rarité = `rarity`, Partie = `part`; see `GROUP_TITLES` in `src/lib/annotations.ts`). A tag file's `key` must equal its path (`style/baroque` for `content/tags/style/baroque.yaml`). Slugs must be unique within a group, per language.


### 3.2. Element

`content/elements/serlian-window/annotation.yaml`:

```yaml
name:
  fr: Fenêtre serlienne
  en: Serlian window
gender:
  fr: n.f.                    # Le Robert notation: n.m. | n.f.
slug:
  fr: fenetre-serlienne
  en: serlian-window
aliases:
  fr:
    - fenêtre vénitienne
    - fenêtre palladienne
  en:
    - Venetian window
    - Palladian window
category: opening             # opening | support | roof | ornament | structure
tags:
  - style/classical
  - region/europe   # keys of content/tags/ files
parts: []
```

Names, slugs and aliases use the `{ fr, en }` shape; `tags` is a language-neutral list of tag keys. `gender` is French only (`gender.fr`) and gives the part of speech and grammatical gender in the Le Robert dictionary notation: `n.m.` (nom masculin) or `n.f.` (nom féminin). It is required on every element and is shown just after the title on the element's page, in muted italic. The collection folder supplies the stable technical `id`; it is not duplicated in YAML. `parts` is optional and describes annotated regions when a `full.svg` exists. `category` only drives the header icon on the entry's own page.

`fr.md` is plain Markdown, no front matter, no comment markers. Its structure and writing rules are in `EDITORIAL_GUIDELINES_fr.md`:

```md
# Fenêtre serlienne

## Définition
Ouverture composée de trois baies, la centrale en plein cintre et plus large que les deux latérales...

Il ne faut pas la confondre avec la fenêtre en baie, ...

## Rôle
...

## Exemples
- [Palais Farnèse, Rome, Italie](https://maps.app.goo.gl/...)
- Villa ..., Vicence, Italie
```

Definitions open with a noun phrase, not "C'est un…". `## Rôle` and `## Exemples` are required; `## Caractéristiques` and `## Trivia` are optional. Bullets, external links and emphasis are restricted as set out in the guidelines.

`##` headings render as real headings; everything else renders through ordinary Markdown rules. The French file is named `fr.md`; V2 may add `en.md` next to it and turn on locale routing.

---

## 4. Validation

Two layers, both run in `npm run build` and in CI:

1. **Astro content collections (Zod).** Field types on `annotation.yaml` (`name`, `gender`, `slug`, `aliases`, `tags`, `category`, and optional `parts`); `gender.fr` must be `n.m.` or `n.f.`. The folder supplies `id`.
2. **`scripts/check-content.ts`.** What a schema cannot express:
   - `slug.fr` is lowercase ASCII kebab-case, unique across entries, and does not collide with a reserved route (`index`, `about`, `404`, `sitemap`)
   - every entry in `tags` has a matching file in `content/tags/`, with no duplicates; every tag file's `key` matches its path, its group is known, and its slugs are unique within the group
   - `parts` ids are unique
  - every `parts[].id` exists as `data-part` in an annotated SVG, and vice versa
   - marker coordinates fall inside the SVG `viewBox`, and no two markers are closer than twice the touch-target radius
  - SVG rules: optional `preview.svg`/`full.svg`, no `<text>`, no scripts, no external references, no hard-coded hex colors, no `prefers-color-scheme` rules of their own
   - `fr.md` is non-empty and starts with an `h1`

Errors name the file and the field, and the build stops.

---

## 5. Routing

Single locale, flat routes, generated by `getStaticPaths` from `content/elements/`:

| Page | Route |
|---|---|
| Index (all entries) | `/` |
| Element | `/fenetre-serlienne/` |

URLs end with a trailing slash (`trailingSlash: 'always'`) so the canonical URL, the sitemap and the static host all agree. No aliasing routes, no redirects, no `hreflang`, no sitemap alternates — there's only one URL per entry and one language. `astro.config.mjs` declares the `fr`/`en` i18n locales with French unprefixed, but no English route exists yet.

---

## 6. Front end and mobile

- **Astro components** and plain CSS. Design tokens are CSS variables (`src/styles/tokens.css`). The light theme is always the default, whatever the OS preference; the dark tokens only apply when `<html data-theme="dark">` is set (no switcher yet).
- **Fonts** self-hosted (`@fontsource-variable` package for Inter), with `font-display: swap`.
- **Two vanilla scripts**, each small and progressive:
  - `diagram.ts`: hover/focus highlighting between the SVG parts and the legend
- **No Pagefind, no glossary filter** in V1.

**Mobile rules**

- Single-column layout below 880px, diagram first; the sticky diagram is disabled there; nothing relies on hover.
- Marker hit areas are at least 24×24 CSS px (WCAG 2.2 minimum), implemented as an invisible larger circle, and the visible marker is enlarged on narrow screens. Legend rows are at least 44px tall on touch devices, in one column below 480px.
- Pinch-zoom is never disabled.
- Pages stay light: no framework runtime, minimal script, inline SVG.
- Test on real phones and a throttled connection, not only in desktop emulation.

Without JavaScript, the diagram and legend render as a plain labeled drawing with no highlighting, and the Markdown card is already fully visible either way.

---

## 7. Basic SEO (V1)

Kept minimal on purpose — richer SEO (hreflang, sitemap alternates, structured data, share cards) is a V2/V3 concern, since most of it depends on having more than one language or more than one kind of page to cross-link.

- `<html lang="fr">`, a page title, a meta description, basic Open Graph tags and a self-referencing canonical URL on every page (`site` is `https://lepetitvitruve.fr`).
- `src/pages/sitemap.xml.ts` generates a plain `sitemap.xml` of the flat route list; `public/robots.txt` points to it.
- `src/pages/404.astro` is `noindex`.

---

## 8. Getting started

```bash
npm install
npm run dev
```

### Commands

```bash
npm run dev             # Astro dev server
npm run build           # astro check, check:content, astro build
npm run preview         # serve dist/
npm run check:content   # scripts/check-content.ts only
npm run typecheck       # astro check
npm run lint
npm run test
```

### Adding a new element

1. Create `content/elements/<id>/` with `annotation.yaml` and `fr.md`, writing `fr.md` according to `EDITORIAL_GUIDELINES_fr.md`; add `preview.svg` and/or `full.svg` when an illustration is available.
2. Run `npm run check:content`, then `npm run dev` to review the page.
3. Open a PR. CI validates content and builds the site.

Docker is optional and not used in production. For dev parity, one Node service is enough:

```yaml
services:
  web:
    image: node:lts
    working_dir: /app
    volumes: [".:/app"]
    command: sh -c "npm ci && npm run dev -- --host"
    ports: ["4321:4321"]
```

---

## 9. Deployment

The site is served at `https://lepetitvitruve.fr` from GitHub Pages.

- Build command: `npm run build`; output directory: `dist`.
- `.github/workflows/ci.yml` runs lint, tests, typecheck, content checks and build on every push and PR.
- `.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on every push to `main`. In the repository settings, set Pages > Source to "GitHub Actions" and the custom domain to `lepetitvitruve.fr`.
- `public/CNAME` keeps the custom domain across deployments.
- DNS: an `A`/`AAAA` (or `ALIAS`) record set for the apex pointing to GitHub Pages, and a `CNAME` for `www` if wanted.

---

## 10. Content and media policy

- Diagrams are original work.
- No photographs are stored, embedded or hotlinked, in any version.
- Prose is written in your own words. If text is adapted from a source under a share-alike licence (for example Wikipedia, CC BY-SA), show the attribution and licence on the page.
- French prose follows `EDITORIAL_GUIDELINES_fr.md`. Its rules (nominal definitions, the section list, no emphasis in body text, bullets and external links only in Exemples) are checked in review, not by `check:content`.

---

## 11. Out of scope

See `ROADMAP.md` for what V2 and V3 add. Indefinitely out of scope, unless explicitly requested: quizzes, maps, study paths, photo storage or image pipelines, MDX, user accounts, captures, gamification, and any mobile app.

A backend would only become useful for user-generated data, per-user sync, comments, or an admin UI that writes content — none of which this project needs.