# Contributing to Le Petit Vitruve

Before you start, read:

- `README.md` for the architecture
- `ROADMAP.md` for the current version
- `EDITORIAL_GUIDELINES_fr.md` before writing French prose
- `GRAPHICS_GUIDELINES.md` and `DESIGN_GUIDELINES.md` before touching SVGs or styles

## Scope

We are building **Version 1** only. Do not add locale routing, a language switcher, tag pages or filters, relations between entries, a buildings section, or search. If a change seems to need one of these, open an issue or ask first. See `ROADMAP.md` for the full list.

Do not add photographs, third-party scripts, fonts, or images at runtime.

## Setup

```bash
npm install
npm run dev
```

## Making a change

1. Create a branch from `main`.
2. Keep each change small and focused on one concern.
3. Update tests and documentation in the same change.
4. Run the checks below before opening a pull request.

### Checks

```bash
npm run check:content   # run after any change to content/ or the schema
npm run lint
npm run typecheck
npm run test
npm run build           # run when routing or the index page changes
```

All checks run in CI on every push. A content error also blocks deployment, because `npm run build` includes `check:content`.

### Definition of done

- [ ] The change is within the current version's scope in `ROADMAP.md`, or was explicitly requested
- [ ] `check:content`, `lint`, `typecheck` and `test` pass; `build` passes if routing or the index page changed
- [ ] The page works with JavaScript disabled and is keyboard-operable
- [ ] Touch targets and layout checked at a 375px width
- [ ] French prose follows `EDITORIAL_GUIDELINES_fr.md`
- [ ] `README.md`, `ROADMAP.md` or `AGENTS.md` updated if behavior, structure or commands changed

## Adding an element

Each element lives in its own folder, `content/elements/<id>/`, and contains:

```
annotation.yaml   # localized name, slug, aliases, gender, category, tags, optional parts
fr.md             # French prose: # title, ## Définition, ## Rôle, ## Exemples (and optional sections)
preview.svg       # optional, compact index drawing
full.svg          # optional, annotated detail drawing
```

Rules to keep in mind:

- The folder name is the technical `id`. It is lowercase kebab-case, language-neutral, and **never renamed**.
- `gender.fr` is required and must be `n.m.` or `n.f.`.
- `slug.fr` must be lowercase ASCII kebab-case, unique, and must not be `index`, `about`, `404` or `sitemap`.
- Every key in `tags` must match a file under `content/tags/`. Add the tag file rather than inventing a key.
- If `parts` is present, every part `id` must match a `<g data-part>` group in `full.svg`, and vice versa.
- `fr.md` is plain Markdown. Do not add front matter, HTML comments as markers, components or custom syntax.
- Write original prose. Do not paste text from Wikipedia or other sources. If you adapt share-alike content, add visible attribution and the licence. If you are unsure of a fact, add a `TODO(verify)` note rather than guessing.

## Writing French prose

Follow `EDITORIAL_GUIDELINES_fr.md`. In short:

- Start definitions directly with the nominal group. Do not write "C'est un…" or "Il s'agit d'un…".
- The first Définition paragraph gives the definition. The second explains confusions with nearby terms.
- No bold or italics in body text. Bullets appear only in Exemples.
- External links appear only in Exemples, in the form `- [{nom}, {ville}, {pays}](url)`.

## SVG graphics

- Preview icons use the fixed `0 0 120 120` viewBox, stroke-only with `currentColor`.
- Colors come from CSS custom properties. Do not use hex colors, including as `var()` fallbacks.
- No `<text>`, scripts, external references, or `prefers-color-scheme` rules inside SVG files.
- Keep markers at least twice the touch-target radius apart.

## Commit messages

We follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

- Write the subject in English, in the imperative mood, in lowercase after the colon, with no trailing period, and no more than 72 characters.
- Explain *why* in the body, not *what*. Wrap at about 72 characters.

### Types

| Type | Use for |
|---|---|
| `feat` | A new user-visible capability within the current roadmap version |
| `fix` | A bug fix |
| `content` | Adding or editing element prose, metadata or diagrams |
| `docs` | README, guidelines or code comments only |
| `style` | Formatting or CSS-only changes with no behavior change |
| `refactor` | Restructuring with no behavior change |
| `test` | Adding or fixing tests |
| `build` | Dependencies, `package.json`, Astro, Vite or tsx configuration |
| `ci` | GitHub Actions and `deploy.yml` |
| `chore` | Maintenance that fits nowhere else |
| `revert` | Reverting a previous commit; the body references its SHA |


### Examples

```
content(element): add serlian-window

Adds the French entry with a preview and full SVG. Part ids match the
parts list in annotation.yaml.
```

```
feat(schema): require gender.fr on every element
```

## Pull requests

- Use a title that follows the commit convention.
- Describe what changed and why, and list the checks you ran.
- For visual changes, include a screenshot at 375px and at desktop width.
- Link the relevant item in `ROADMAP.md` when there is one.


## Reporting problems

If you find a broken link, a wrong fact, or an accessibility issue, open an issue with the page URL and what you expected. For factual corrections, cite a reliable source.