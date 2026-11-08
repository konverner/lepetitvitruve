# Contributing to Le Petit Vitruve

You do not need to know TypeScript to contribute. You can correct a fact, improve
French text, suggest an example, or draw an illustration. If you cannot make the
change yourself, [report a problem](#reporting-problems) instead.

This guide covers the steps for a content contribution. For the project's
architecture, see the [README](README.md); for French writing, see the
[editorial guidelines](EDITORIAL_GUIDELINES_fr.md). For drawings and styles,
also consult the [graphics](GRAPHICS_GUIDELINES.md) and
[design](DESIGN_GUIDELINES.md) guidelines.

## Scope

We are building **Version 1** only. Do not add locale routing, a language switcher, tag pages or filters, relations between entries, a buildings section, or search. If a change seems to need one of these, open an issue or ask first. See the [roadmap](ROADMAP.md) for the full list.

Do not add photographs, third-party scripts, fonts, or images at runtime.

## Setup for local contributions

1. Install Git and a current LTS version of [Node.js](https://nodejs.org/),
   which includes npm. CI uses Node.js LTS. Check the installation with
   `git --version`, `node --version` and `npm --version`.
2. Clone the repository or your fork, then open a terminal in its root folder:

```bash
git clone https://github.com/konverner/le-petit-vitruve.git
cd le-petit-vitruve
npm ci
npm run dev
```

If you forked the repository, use the clone URL of your fork instead. `npm ci`
installs the versions recorded in the lockfile. `npm run dev` starts a local
preview: open the address printed in the terminal. Stop it with `Ctrl+C`.

## Your first content change

1. Start from an up-to-date `main` and create a branch, for example
   `git switch -c content/fix-example`.
2. Find the entry in [`content/elements/`](content/elements/). Edit its `fr.md`
   for French prose, or `annotation.yaml` for its name, aliases, tags and other
   metadata. A text editor is enough. See [Adding an element](#adding-an-element)
   for the file formats; you do not need to edit `.ts` files.
3. Keep the change focused, use reliable sources for facts, and follow the
   [French writing rules](#writing-french-prose). Update related documentation
   or tests if your change affects them.
4. Preview the page locally. Its address is the local preview URL followed by
   the entry's `slug.fr` and a trailing slash, for example
   `http://localhost:4321/fenetre-serlienne/` if the server uses port 4321.
5. Run the [checks](#checks). If a check fails, read its message, fix the
   reported file and run the check again. Ask for help in the pull request if
   you cannot resolve it; include the command and error message.
6. Review your changes with `git diff` and `git status`, then stage the intended
   files with `git add <file>`, commit them, and push your branch to your fork
   or repository. See [commit messages](#commit-messages).
7. Open a pull request on GitHub against `main` and describe the change,
   sources and checks. See [pull requests](#pull-requests). Automated checks
   also run there; maintainers can help with review.

You can also propose a small correction using GitHub's file editor and its
pull request flow. You will not have a local preview or local checks in that
workflow; CI runs the automated checks on the pull request.

### Checks

```bash
npm run check:content   # run after any change to content/ or the schema
npm run lint
npm run typecheck
npm run test
npm run build           # run when routing or the index page changes
```

Run these commands from the repository root. `check:content` checks metadata,
file references and some SVG rules; `lint` checks code style; `typecheck`
checks Astro and TypeScript; `test` runs automated tests; and `build` generates
the static site. You do not need to understand TypeScript to run them.
All checks run in CI on pushes and pull requests. A content error also blocks
deployment, because `npm run build` includes `check:content`.

Automated checks do not verify every editorial rule or fact. Review the prose,
sources and page yourself as well. If you cannot run a check or perform a
visual or accessibility check, say so in the pull request.

### Definition of done

- [ ] The change is within the current version's scope in `ROADMAP.md`, or was explicitly requested
- [ ] `check:content`, `lint`, `typecheck` and `test` pass; `build` passes if routing or the index page changed
- [ ] The page works with JavaScript disabled and is keyboard-operable
- [ ] Touch targets and layout checked at a 375px width
- [ ] French prose follows `EDITORIAL_GUIDELINES_fr.md`
- [ ] `README.md`, `ROADMAP.md` or `AGENTS.md` updated if behavior, structure or commands changed

## Adding an element

Create a new folder under `content/elements/` for the element. Do not rename an
existing folder: its name is a stable identifier. Each folder contains:

```
annotation.yaml   # required metadata
fr.md             # required French prose
preview.svg       # optional, compact index drawing
full.svg          # optional detail drawing
```

For a new entry, choose a unique, language-neutral lowercase kebab-case folder
name, such as `example-element` (letters and numbers separated by hyphens).
The folder is the technical ID; do not put an `id` field in the YAML. Existing
folder names must stay unchanged, even if they do not follow this convention.

Create `annotation.yaml`. YAML uses indentation to express structure: use spaces,
not tabs, and keep fields at the same indentation as in this example. Replace
the values with the new element's details:

```yaml
name:
  fr: Fenêtre serlienne
  en: Serlian window
gender:
  fr: n.f.
slug:
  fr: fenetre-serlienne
  en: serlian-window
aliases:
  fr: []
  en: []
category: opening
tags:
  - style/classical
```

This illustrates the required fields, not a new entry to submit: the example
already exists. Both `fr` and `en` values are required for `name`, `slug` and
`aliases`, even though the site currently displays French only. `aliases`
lists alternative names; `[]` means no known aliases. If a translation is
uncertain, ask for help rather than guessing.

- `gender.fr` is `n.m.` for a masculine noun or `n.f.` for a feminine noun.
- `slug.fr` is the French page's URL segment: use lowercase unaccented ASCII
  letters, numbers and hyphens. It must be unique and cannot be `index`,
  `about`, `404` or `sitemap`.
- `category` must be one of `opening`, `support`, `roof`, `ornament` or
  `structure`; it selects the page's header icon.
- `tags` is a list of existing keys. For example, `style/classical` refers to
  [`content/tags/style/classical.yaml`](content/tags/style/classical.yaml).
  Browse [`content/tags/`](content/tags/) for others; use `tags: []` if none
  apply. To add a tag, create a matching tag file in an existing group, with
  French and English slug, label and description; use an existing file as a
  model. Its `key` must match its path, and slugs must be unique within the
  group for each language.
- Omit `parts` unless describing annotated regions of a `full.svg`. Each part
  ID must match a `<g data-part>` group in that drawing, and vice versa. See
  the [graphics guidelines](GRAPHICS_GUIDELINES.md).

Create `fr.md` with the title and required sections in plain Markdown. A `#`
introduces the title, `##` a section heading, and `-` a list item:

```md
# Nom du terme

## Définition
Définition en français.

Précision sur les confusions avec des termes proches.

## Rôle
Description de la fonction de l'élément.

## Exemples
- Nom du bâtiment, Ville, Pays
```

Replace the placeholder text with original, verified prose and real examples.
`## Caractéristiques` and `## Trivia` are optional; do not add front matter,
HTML comments as markers, components or custom syntax. An example can be plain
text when no link is known. See the full
[editorial guidelines](EDITORIAL_GUIDELINES_fr.md) before submitting.
Do not paste text from Wikipedia or other sources. If you adapt share-alike
content, add visible attribution and the licence. If unsure of a fact, add a
`TODO(verify)` note rather than guessing.

Diagrams are optional; a contribution can contain only the metadata and prose.
Run `npm run check:content` and preview the page as described above.

## Writing French prose

Follow `EDITORIAL_GUIDELINES_fr.md`. In short:

- Start definitions directly with the nominal group. Do not write "C'est un…" or "Il s'agit d'un…".
- The first Définition paragraph gives the definition. The second explains confusions with nearby terms.
- No bold or italics in body text. Bullets appear only in Exemples.
- External links appear only in Exemples, in the form `- [{nom}, {ville}, {pays}](url)`.

## SVG graphics

- Preview icons use the fixed `0 0 120 120` viewBox, stroke-only with `currentColor`.
- Colors come from CSS custom properties. Do not use hex colors, including as `var()` fallbacks.
- No `<text>`, scripts, or external references inside SVG files.
- An SVG must not carry its own theme rules: no `prefers-color-scheme` media queries and no `<style>` that sets theme colors. Theming lives in `src/styles/tokens.css`; SVGs only reference the CSS variables.
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