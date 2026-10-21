import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ELEMENTS_DIR = join(process.cwd(), 'content/elements');

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Inlined SVGs share one HTML document, so their ids must be unique across the page.
function scopeIds(svg: string, prefix: string): string {
  const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]!);
  if (ids.length === 0) return svg;

  let out = svg;
  for (const id of ids) {
    const escaped = escapeRegExp(id);
    out = out
      .replace(new RegExp(`(\\sid=")${escaped}"`, 'g'), `$1${prefix}${id}"`)
      .replace(new RegExp(`url\\((['"]?)#${escaped}\\1\\)`, 'g'), `url($1#${prefix}${id}$1)`)
      .replace(new RegExp(`(href=")#${escaped}"`, 'g'), `$1#${prefix}${id}"`);
  }
  return out.replace(/aria-labelledby="([^"]*)"/g, (_, value: string) => {
    const scoped = value.split(/\s+/).map((id) => (ids.includes(id) ? `${prefix}${id}` : id));
    return `aria-labelledby="${scoped.join(' ')}"`;
  });
}

/** Load a named diagram asset, or null when the element has none. */
export function loadDiagramSvg(
  elementId: string,
  filename: 'preview.svg' | 'full.svg',
): string | null {
  const path = join(ELEMENTS_DIR, elementId, filename);
  if (!existsSync(path)) return null;
  const prefix = `${elementId.replace(/[^a-z0-9]+/gi, '-')}-${filename.replace('.svg', '')}-`;
  return scopeIds(readFileSync(path, 'utf-8'), prefix);
}
