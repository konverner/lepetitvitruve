# Graphics Guidelines

An element may include either or both of these optional assets:

- `preview.svg`: compact index drawing.
- `full.svg`: larger detail-page drawing, optionally annotated with interactive parts.

## Content model

The folder name is the stable technical `id`. `annotation.yaml` stores localized `name`, `slug`, and `aliases`, the French `gender` notation (`n.m.` or `n.f.`, Le Robert style), and `tags`. The optional `parts` list describes annotated regions in `full.svg`; each part has an `id`, localized `label`, and `marker` coordinates.

Parts are optional. When `parts` metadata is present, its ids must match the annotated SVG groups used by the page. If no diagram is available, the page displays its normal placeholder.

## Preview SVG

Follow the index icon rules in `DESIGN_GUIDELINES.md`:

- Fixed `viewBox="0 0 120 120"`.
- Stroke-only with `stroke="currentColor"` and `fill="none"`.
- A shared baseline and approximately 15% safe margin.
- Two-tier stroke weights: 2px for the silhouette and 1.25px for secondary detail.
- Round caps and joins; no shadows or textures.
- Show only the one or two details that identify the element.

Preview drawings remain neutral on hover. The card may change its background, but the drawing itself does not change color, weight, or scale.

The preview has to represent an element in a simplified and easily recognizable form, capturing its most distinctive features without overwhelming detail. For example, a preview of ionique order features chapiteaux and volutes without including the full column shaft but only part of it.

Reference:

```
------
O----O
 |  |
```

## Full SVG

- Use an entry-specific `viewBox` sized to the element's proportions.
- When `parts` metadata exists, use matching `data-part` groups; otherwise the SVG remains an unannotated drawing.
- Keep source labels and marker circles out of the SVG; the component supplies accessible labels and interaction controls.
- Use CSS custom properties for colors. Static geometry uses the neutral tokens; interactive hover and active states use `var(--accent-interactive)`.
- Keep external references, scripts, and `<text>` elements out of the source SVG.
- An SVG must not carry its own theme rules: no `prefers-color-scheme` media queries and no `<style>` that sets theme colors. Theming lives in `src/styles/tokens.css`; SVGs only reference the CSS variables.
- Shared hatch patterns may be used for material identity; do not define unnecessary local copies.
- Draw context first, then the structure, then detail on top.

Interactive parts may change stroke, opacity, and accent color. The interaction is a labeling aid only: it must not hide or replace the Markdown description.

The full SVG should provide a detailed and accurate representation of the element, including all relevant parts and annotations. It must be clear, precise, and suitable for interactive exploration, while remaining visually consistent with the overall design system.

## QA

- Ensure that all `data-part` attributes in the SVG match the `id`s listed in the `parts` metadata.
- Verify that the preview and full SVGs are visually consistent and accurately represent the element.
- Check that interactive parts respond correctly to hover and active states.
- Confirm that no external references, scripts, or `<text>` elements are present in the SVG.
- Validate that the SVG uses the correct CSS custom properties for colors and that static geometry remains neutral.
- Review the overall clarity and precision of the full SVG to ensure it supports interactive exploration effectively.

