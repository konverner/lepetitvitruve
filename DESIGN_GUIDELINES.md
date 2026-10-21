# Design Guidelines — Le Petit Vitruve

A visual dictionary of architecture elements. Design language adapted from an editorial glossary reference (sidebar-index + numbered entry grid), reworked here around **image-led entries**: each term is represented first by a line-drawing, not by descriptive text.

---

## 1. Design Principles

1. **Typography is the hierarchy** everywhere except the entry itself. No accent color in the chrome — scale, weight, and gray-value do the organizing work.
2. **The index is always present.** The full numbered list of entries lives permanently in a sidebar (desktop) or one tap away (mobile).
3. **Numbering is functional, not decorative.** Entries are genuinely enumerable, so a two-digit index number (`01`, `02`…) is a legitimate structural device — it's how you find entry #43 again.
4. **Square, quiet, restrained.** Zero border-radius, hairline 1px borders, no shadows, restrained gradients, near-monochrome chrome. The drawings carry the identity; everything around them disappears.
5. **The card *is* the definition, in miniature.** Each card shows only the index number, an **SVG line drawing** of the element (`/elements/{slug}/preview.svg`), and its title — no descriptive text at grid level. The full definition, style/era tag, and any secondary imagery live on the entry's own page (§11), reached by tapping the card.

---

## 2. Color Palette

Monochrome, warm-gray editorial palette. No brand/accent color in the chrome; interactive graphics may use the dedicated accent token.

| Token | Hex (approx.) | Usage |
|---|---|---|
| `--bg-page` | `#F5F5F3` | Main content background (everything except header/sidebar); also used as the "opening" fill inside diagrams, see §11.5 |
| `--bg-surface` | `#FFFFFF` | Header bar, sidebar/index column, entry cards, detail-page cards |
| `--bg-surface-hover` | `#EDEDEB` | Card hover/active fill; also the diagram's secondary fill tone, see §11.5 |
| `--text-primary` | `#141414` | Headings, nav links, entry titles, **default SVG stroke color** |
| `--text-body` | `#2A2A2A` | Detail-page description text, legend/alias copy |
| `--text-muted` | `#8F8F8C` | Eyebrow/meta labels, entry numbers, hints, plate captions |
| `--border` | `#E2E2DF` | Hairline dividers between cards / list rows / detail-page cards |
| `--border-strong` | `#2B2B2B` → transparent | Short gradient rule used above the meta line |

**Adapting it:** keep the neutral gray scaffold and use one accent color for interactive graphics and other functional signals. Keep the accent out of passive chrome and static preview drawings.

---

## 3. Typography

**Typeface:** one grotesque/neo-grotesque sans-serif throughout — visually close to **Inter, Helvetica Neue, or Suisse Int'l**. No decorative treatments; hierarchy comes from size, weight, and color. The one exception is the grammatical gender shown after the detail page title (italic, muted; see the table below and §11.2), following dictionary convention.

| Role | Size | Weight | Case / spacing | Color |
|---|---|---|---|---|
| Site title ("Le Petit Vitruve") | 32–40px | 800 | Sentence case, tight leading (~1.05) | `--text-primary` |
| Eyebrow / meta label ("Dictionnaire visuel · 2026 · {N} éléments") | 11–12px | 500 | UPPERCASE, letter-spacing ~0.08em | `--text-muted` |
| Intro / lede paragraph | 18–20px | 400 | Sentence case, leading 1.5 | `--text-body` |
| Nav links | 15px | 600 | Sentence case | `--text-primary` |
| Sidebar/index list item | 15–16px | 400 | Sentence case | `--text-primary` |
| Sidebar/index item number | 13–14px | 400, tabular figures | — | `--text-muted` |
| Entry card number | 13–14px | 400, tabular figures | — | `--text-muted` |
| Entry card title | 16–18px | 700 | Sentence case, centered under image | `--text-primary` |
| Detail page: entry title (h1) | 28–32px | 800 | Sentence case | `--text-primary` |
| Detail page: grammatical gender (e.g. *n.m.*) | 16–18px | 400, italic | Sentence case, margin-left ~var(--space-2), inline after the title | `--text-muted` |
| Detail page: aliases | 15–16px | 400 | Sentence case | `--text-muted` |
| Detail page: style/era tag | 12–13px | 500 | UPPERCASE, letter-spacing ~0.06em | `--text-muted` (or accent, §2) |
| Detail page: description | 16–17px | 400 | Leading 1.6, no clamp — full text | `--text-body` |
| Detail page: prose `##` heading | 22–24px | 700 | Sentence case, margin-top 1.6em (0 on first) | `--text-primary` |
| Detail page: prose `###` heading | 17–18px | 600 | Sentence case | `--text-primary` |
| Detail page: plate caption / hint | 13px / 12px | 400 | Sentence case | `--text-muted` |
| Detail page: legend item | 14–15px | 400 (number 600, tabular) | Sentence case | `--text-body` |

Card titles are a caption under an image (16–18px), not a headline over text. Full-size definition typography lives on the detail page.

---

## 4. Layout & Grid

### Desktop (≥ ~1024px)

```
┌──────────────┬──────────────────────────────────────────────┐
│              │                                              │
│  SIDEBAR     ├──────────────────────────────────────────────┤
│  (white)     │                                                │
│  ~320–360px  │   ─ (short rule)                     GRAY BG  │
│  fixed,      │   EYEBROW META LINE                            │
│  full height │   Intro paragraph (1–2 lines, larger type)     │
│              │                                                │
│  Wordmark    │   ┌────────┬────────┬────────┐                │
│  + eyebrow   │   │  01    │  02    │  03    │                │
│              │   │ [ svg ]│ [ svg ]│ [ svg ]│  3-col grid,   │
│  Full index  │   │ Title  │ Title  │ Title  │  hairline      │
│  list,       │   ├────────┼────────┼────────┤  borders       │
│  scrollable  │   │  04    │  05    │  06    │  shared        │
│  (numbered,  │   │ [ svg ]│ [ svg ]│ [ svg ]│  between       │
│  01…NN)      │   │ Title  │ Title  │ Title  │  cells         │
│              │   └────────┴────────┴────────┘                │
└──────────────┴──────────────────────────────────────────────┘
```

- Two-column shell: fixed-width white sidebar (persistent index) + fluid gray content column.
- Sidebar and top bar share the same white surface, reading as one continuous "chrome" plane above the gray content.
- Entry grid: **3 columns**, cells rendered like a spreadsheet/table — hairline borders shared between adjacent cells, not individual card shadows.
- Each cell: index number (top-left, small) → square image slot (the SVG, centered, generous padding) → title (centered caption below).
- Generous outer padding on the content column (~40–48px); comfortable cell padding (~28–32px).

### Mobile (< ~768px)

```
┌────────────────────────────────┐
│ ☰   Le Petit Vitruve            │ ← white app bar
│     Dictionnaire visuel         │
├────────────────────────────────┤
│  ─ (short rule)         GRAY BG│
│  EYEBROW META LINE              │
│  Intro paragraph (wraps 4+ lns)│
│                                  │
│  ┌────────────────────────────┐│
│  │ 01                         ││
│  │        [   svg   ]         ││  discrete cards,
│  │          Title              ││  own border,
│  └────────────────────────────┘│  margin/gap
│                                  │  between them
│  ┌────────────────────────────┐│  (not touching)
│  │ 02                         ││
│  │        [   svg   ]         ││
│  │          Title              ││
│  └────────────────────────────┘│
└────────────────────────────────┘
```

- Sidebar collapses into a **hamburger icon** (☰) at top-left of a slim white app bar; wordmark + eyebrow move into that bar. The full index opens as a drawer/overlay from the hamburger.
- Entry grid drops to **1 column**; cards become **discrete boxes with visible margin between them** on the gray page background, rather than touching grid cells. At single-column width the image slot can grow larger than its desktop counterpart — use the room.
- Edge padding narrows to ~20px.

**Breakpoint:** one primary breakpoint around 768–1024px covers this system (sidebar↔hamburger, 3-col↔1-col, shared-border↔gapped-card). Consider a secondary breakpoint at ~1400px to move from 3 to 4 columns on very wide screens.

---

## 5. Components (index/grid page)

**Header / Wordmark**
Bold, large sentence-case site title + a small tracked-out eyebrow label underneath. Repeated, smaller, in the footer.

**Primary navigation**
Flat text links, semibold, black, no pills/buttons. Plain by default; a simple underline or weight bump is enough to signal an active page.

**Index / sidebar list (desktop)**
The complete, always-visible table of contents: two-digit number (muted) + entry name (primary), one per row, comfortable vertical rhythm, no row dividers — spacing alone separates rows.

**Hamburger menu (mobile)**
Three-line icon, top-left. Opens the same index list as a drawer/overlay.

**Hero / intro block**
Fixed recipe: short gradient rule (~64–80px wide, decorative) → eyebrow meta line (project · year · count) → one short lede paragraph. Same recipe on desktop and mobile, just re-flowed.

**Entry card** *(index/grid view)*
- Muted 2-digit index number, top-left of the cell
- SVG line drawing centered in a square image slot with even padding (see §6)
- Entry title, centered caption below the image
- No description at this level — the drawing does the identifying work
- Entire card is a single clickable link; `border-radius: 0`; background flips to `--bg-surface-hover` on hover/focus

**Footer**
Minimal: wordmark + nav (or a subset) + one-line project credit and year.

---

## 6. SVG Guidelines — index icon (`preview.svg`)

The compact drawing used on the grid card. Detail-page diagrams are a related but distinct asset — see §11.5–§11.9 for how the same conventions extend to a larger, more detailed plate.

**Canvas & geometry**
- One shared `viewBox` for every entry, e.g. `0 0 120 120` (square, 1:1). Never vary it — it's what keeps the grid aligned without per-image scaling.
- Consistent safe margin, ~12–15% per side.
- Every element drawn on a shared baseline near the bottom of the safe area, the way elevations in a textbook share a ground line — scale the element to fit the canvas, don't scale the canvas to fit the element.

**Line style**
- Stroke only, `fill: none` — technical line-drawing, not filled icon silhouettes.
- Two-level stroke hierarchy at 120×120 scale: primary silhouette **2px**, secondary/construction detail **1.25–1.5px**.
- `stroke-linecap: round`, `stroke-linejoin: round` everywhere, so every entry reads as the same "pen."
- No shadows or textures. A restrained gradient rule is allowed in the surrounding interface.

**Color**
- `stroke="currentColor"`, set to `--text-primary` by the card — never a hardcoded hex inside the file.
- accent color: `style="stroke:var(--a)` is allowed to highlight specific parts of the icon; for example [balconnet](content/elements/balconnet/preview.svg).
- The preview icon does not change color, weight, or scale on hover — only the card's background tints (`--bg-surface-hover`). The detail-page diagram may use the accent color for interactive hover and active states.

**Level of detail**
Simplified and schematic — one or two details that make the element identifiable, calibrated across the whole set so simple and complex entries still feel like the same family.

**Files & accessibility**
- `/entries/{slug}/preview.svg`, run through an optimizer (e.g. SVGO), target well under 5KB.
- `<title>` naming the element for screen readers; `aria-hidden="true"` if the adjacent caption already carries the accessible name.

**Reference example** (round arch):

```svg
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Round arch</title>
  <line x1="15" y1="96" x2="105" y2="96"
        stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
  <path d="M30 96 V58 A30 30 0 0 1 90 58 V96"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="30" y1="58" x2="90" y2="58"
        stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
</svg>
```

---

## 7. Spacing Scale

An 8px base unit governs macro layout (columns, card padding, gaps):

`4 · 8 · 16 · 24 · 32 · 40 · 48 · 64`

- Card internal padding: 28–32px (desktop), ~20px (mobile)
- Gap between mobile cards: 12–16px
- Outer page/content padding: 40–48px (desktop), 20px (mobile)
- Vertical rhythm between sidebar list rows: ~24–32px row height

Small, one-off UI values below the base unit (a 2px chip padding, a 10px marker radius) are fine as exceptions — the scale governs page rhythm, not every micro-measurement.

---

## 8. Interaction & States (index/grid page)

- **Hover (card):** background fill shifts from white to `--bg-surface-hover`; cursor becomes a pointer. The SVG itself does not change on hover.
- **Focus:** visible keyboard-focus outline on cards and nav links, e.g. a 2px outline in `--text-primary`, offset 2px.
- **Motion:** none beyond the hover fill. No page-load animation, no scroll-reveal.

---

## 9. Content Pattern

**Index/grid card:**
```
Number → 01 (2-digit, zero-padded, sequential)
SVG    → /entries/{slug}/preview.svg (shared viewBox, stroke-only, currentColor)
Title  → the element's name, e.g. "Arc en plein cintre" / "Round arch"
```

**Detail page** — see §11 for the full spec:
```
Diagram    → a larger, more detailed plate of the same element
Title      → full name + aliases
Tag        → V1 metadata, displayed only where the page explicitly supports it
Definition → free-form Markdown prose
```

---

## 10. Quick-reference CSS tokens

```css
:root {
  --bg-page: #F5F5F3;
  --bg-surface: #FFFFFF;
  --bg-surface-hover: #EDEDEB;

  --text-primary: #141414;
  --text-body: #2A2A2A;
  --text-muted: #8F8F8C;

  --border: #E2E2DF;

  --radius: 0px;
  --radius-pill: 999px; /* tag chips only — the one deliberate exception, §11.8 */

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 40px;
  --space-7: 48px;
  --space-8: 64px;

  --content-max-width: 1180px;
  --stage-gap: var(--space-6);       /* gap between DiagramCard and MarkdownCard, §11.2 */
  --stage-breakpoint: 880px;         /* two columns above, stacked below, §11.2 */

  --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;

  /* SVG line-drawing system, §6 and §11.5–§11.9 */
  --icon-viewbox: 120;           /* shared viewBox size, index icons only */
  --icon-stroke-primary: 2;      /* px, at --icon-viewbox scale */
  --icon-stroke-secondary: 1.25; /* px, at --icon-viewbox scale */
      --icon-color: var(--text-primary); /* SVGs use stroke="currentColor" */
      --accent-interactive: #8f2f3f;      /* active detail-graphic state */
}
```

---

## 11. Element Detail Page

The page an entry card links to (`/arc-en-plein-cintre`, `/fleche`, …). Same header, footer, and design tokens as the rest of the site — this section adds the title row and a two-card "stage" (a larger diagram beside the full-text definition), plus an accent-colored interaction system for labeling parts of the diagram.

### 11.1 Page layout

Four stacked rows, full width unless noted:

```
Row 1  Header       same SiteHeader as the index page (§5)
Row 2  Title row    h1 + gender, aliases, tag chip(s)        — §11.2
Row 3  Stage        DiagramCard  |  MarkdownCard, one row    — §11.3–§11.7
Row 4  Footer        same SiteFooter as the index page (§5)
```

Reading order on mobile matches row order: header, title, diagram, prose, footer.

### 11.2 Title row

- Centered column, max-width `680px`, margin `var(--space-8) auto var(--space-7)` (64px top, 48px bottom).
- h1 — "Detail page: entry title" token (§3), margin-bottom `var(--space-2)`.
- Gender — inline after the title text, same line, in the "Detail page: grammatical gender" token (§3), e.g. *Fronton à jour n.m.* It is decorative metadata, so it is muted and italic. It wraps with the title on narrow screens rather than moving to its own line.
- Aliases directly under the title — "Detail page: aliases" token, e.g. *"aussi appelée fenêtre vénitienne, fenêtre palladienne"* — plain visible text, not hidden, so it's searchable.
- Tag chip(s) below the aliases — see §11.8.

### 11.3 Stage row — two cards, one row

This is the layout to keep from the draft, unchanged in structure, only re-tokenized:

- CSS grid: `grid-template-columns: minmax(320px, 1fr) minmax(340px, 1.2fr)`, `gap: var(--stage-gap)` (40px), `align-items: start`. The MarkdownCard gets the slightly larger share — it carries most of the reading.
- **Below `--stage-breakpoint` (880px):** single column, DiagramCard first, MarkdownCard second; the DiagramCard stops being sticky.
- **Above 880px:** DiagramCard is `position: sticky; top: var(--space-4)` (24px), so the drawing stays visible while the prose scrolls.
- Check at 375px and 320px: the two `minmax()` floors (320px, 340px) can exceed a narrow phone's content width, so the single-column rule must take over comfortably before that — 880px gives enough margin.

### 11.4 DiagramCard

For diagram card we load svg from `/content/elements/{element-slug}/full.svg`; if it is not available, we use `preview.svg`; and if that is also not available, we display a placeholder.

- `background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius);` — flat white card, hairline border, **square corners** (not the 4px radius a first draft might reach for — stay consistent with principle 4).
- Padding: `var(--space-4) var(--space-4) var(--space-2)` (24px sides/top, 8px bottom, before the SVG).
- **Caption row:** flex, space-between, baseline-aligned, bottom rule in `--border`. Left: plate label (e.g. "Élévation — face antérieure") in the muted caption token. Right: hint ("survolez un élément"), `--text-muted`, shown only when the highlight script is active.
- **SVG:** `width: 100%; height: auto; display: block`. Each entry defines its own `viewBox` — sized for its own proportions, unlike the fixed square used for index icons (§6).
- **Ground line:** a solid line at ~50% opacity plus a lighter second line at ~25%, both `stroke: var(--text-muted)`, where relevant to the drawing.
- **Legend**, below the SVG: 2-column grid (1 column below 480px), gap `var(--space-2) var(--space-3)` (8/16px). Each item is the part's number + short label — no long description here; the description lives in the MarkdownCard. Rows at least 44px tall on touch.
- **Behavior:** hovering or tapping a marker or legend item highlights the matching part in the SVG (§11.5). It's a labeling aid for the drawing, not a navigation control — it changes nothing else on the page.

### 11.5 Drawing parts (inside the diagram SVG)

Each part is a `<g data-part="id">` with two classes on its shapes:

| Class | Default | Active (hover/focus/selected) |
|---|---|---|
| `.part-shape` (outline) | `fill: none; stroke: var(--text-primary); stroke-width: 1.6` | `stroke-width: 2.1` *(same color — see note below)* |
| `.part-fill` | `opacity: 0.5` | `opacity: 0.85` |

While one part is active, the others fade: `.diagram.has-active g[data-part]:not(.active) { opacity: 0.32; }`.

**On color:** interactive graphics use `--accent-interactive` for the active part. Static outlines and fills remain themeable through the neutral tokens.

Two shared hatch patterns give material identity, injected once (never defined per file):

| Pattern id | Size | Angle | Stroke | Meaning |
|---|---|---|---|---|
| `stoneHatch` | 9px | 45° | `var(--text-primary)`, width 0.6, opacity 0.28 | Masonry, stone |
| `slateHatch` | 7px | -45° | `var(--text-primary)`, width 0.6, opacity 0.32 | Roofing, slate |

Secondary strokes (masonry courses, facet lines): `var(--text-primary)`, width `0.6`, opacity `0.3`–`0.35`. Hidden/internal elements: dashed (`4 4`, or `2 3` for small details). **Windows and doors are filled with `var(--bg-page)`**, not white — since the card sits on `--bg-surface` (white) and the page behind it is the light gray `--bg-page`, an opening filled with the page color reads as a genuine cut-through to "outside," a small effect worth keeping deliberately.

### 11.6 Marker

- Visible dot: numbered circle, radius `10` (SVG units), `fill: var(--bg-surface); stroke: var(--text-primary); stroke-width: 1.4`.
- Hover: stroke-width increases to `1.8` and uses `var(--accent-interactive)`.
- Active/selected: `fill: var(--accent-interactive)`, number text in `var(--bg-surface)`.
- Invisible touch target: a second, transparent circle at ~4.5% of the viewBox width, so the tappable area meets the 24px WCAG 2.2 minimum on a phone even though the visible dot is small. Space markers so hit areas never overlap.
- Markers are generated at build time from each part's marker coordinates and inserted into the SVG.

### 11.7 MarkdownCard

- `background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius); padding: var(--space-5)` (32px), reduced to `var(--space-4)` (24px) on phones.
- Renders the entry's body **unmodified**, as plain Markdown, through a standard renderer — no custom parsing, no section-splitting, no marker comments, no per-part text switching. There is no "intro state / part state" to manage: the full definition is always shown, top to bottom, next to the diagram.
- `##` headings get the "Detail page: prose heading" token (§3) automatically; `###` gets the smaller variant; paragraphs, links, emphasis, and lists render with normal Markdown rules.
- **Links:** `color: var(--text-primary)`, underline in `var(--border)` offset ~3px; hover underline solid `var(--text-primary)`. Kept monochrome rather than colored, consistent with §2 — a page-wide link accent would be the one place color sneaks back into chrome, so it doesn't get one.
- External links: opened in a new tab with the appropriate `rel` attribute, a small external-link icon, and hidden "opens in a new tab" text for screen readers — handled once by the rendering pipeline, not repeated by hand in each entry's prose.
- Nothing on this card changes after load, so there's no `min-height` trick and no `aria-live` region to manage.

### 11.8 Tag chip

- `border: 1px solid var(--border); border-radius: var(--radius-pill)` — fully rounded. This is the **one deliberate exception** to "zero border-radius everywhere": a small pill reads better here than a square tag, and an isolated, named exception is easier to defend than quietly breaking the rule.
- Text: `--text-muted`; padding ~`2px 10px`; hover: border and text `var(--accent-interactive)`, background `--bg-surface-hover`.
- 44px tap height on touch devices even though the visible chip is smaller. In V1, tags are metadata and are not links to a tag/index page; always show the translated label, never a raw internal key.

### 11.9 SVG authoring rules (detail-page diagram)

Same family of conventions as the index icon (§6), extended for a larger, more informative plate:

- `viewBox` required, sized per entry (not the fixed square used for index icons); no fixed width/height on the element.
- Colors only through CSS custom properties (`var(--text-primary)`, `var(--bg-page)`, `var(--bg-surface)`, `var(--accent-interactive)`) — never a hardcoded hex, so the drawing stays themeable.
- Every interactive part is `<g data-part="kebab-id">`, matching one entry in the entry's part list, and vice versa.
- Outline shapes carry `part-shape`; hatched or filled areas carry `part-fill`.
- Reuse the shared hatch pattern ids (`stoneHatch`, `slateHatch`) — never redefine a pattern per file.
- No `<text>`, no marker circles, and no scripts inside the source file — labels and markers are generated from data by the component that renders it.
- Source order back to front: ground line → structure → detail on top.

### 11.10 Accessibility

- Focus ring: `2px solid var(--text-primary)`, offset 2px, on markers, legend items, chips, and links.
- Contrast: check `--text-muted` (`#8F8F8C`) against both `--bg-page` and `--bg-surface` with a contrast checker before relying on it for anything but decorative or already-redundant text (hints, plate captions, marker numbers) — at that lightness it may sit under the 4.5:1 needed for body copy.
- SVG gets `role="img"` and a `<title>` naming the element; the legend is the drawing's text equivalent.
- Reduced motion: disable the hover/highlight transitions under `prefers-reduced-motion: reduce`.
- Never disable pinch-zoom.
- Because the MarkdownCard is always fully visible, there's nothing hidden or expandable to announce — a screen reader reads the page top to bottom like an ordinary article.

### 11.11 Implementation notes

- Keep structured data (id, slug, name, aliases, tags, plate label, and each part's id/marker coordinates/short label) separate from the prose. The prose itself is a plain-text Markdown body per language, with no front matter and no comment markers inside it — it should be exactly what an author or an LLM would produce from a normal "write the definition" prompt, nothing added or stripped afterward.
- A light content check can confirm every part id has a matching `<g data-part>` in the SVG and that marker coordinates fall inside the `viewBox`. Whether to also check that every part is actually mentioned somewhere in the prose is optional — worth adding only if diagram/text drift turns out to be a real problem in practice.
- The only script this page needs handles hover/focus highlighting (pointer + keyboard) for markers and legend items. Everything else is static markup: without JavaScript, the diagram and legend still render as a correctly labeled drawing, and the full definition is already visible in the MarkdownCard regardless.

### 11.12 Open questions

1. **Marker density.** Elements with many small parts may not have room for comfortable 24px touch targets — lean on the legend and keep marker counts low per diagram.
2. **Text provenance.** If any definition text is adapted from an existing source, rewrite it in your own words or carry visible attribution and a licence note; flag unverified factual claims rather than publishing them silently.