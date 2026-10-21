import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ELEMENTS_DIR = join(__dirname, '../content/elements');

const elementDirs = readdirSync(ELEMENTS_DIR).filter(
  (name) =>
    statSync(join(ELEMENTS_DIR, name)).isDirectory() &&
    existsSync(join(ELEMENTS_DIR, name, 'annotation.yaml')),
);

describe('fr.md prose', () => {
  it.each(elementDirs)('%s starts with a top-level heading and is non-empty', (dir) => {
    const body = readFileSync(join(ELEMENTS_DIR, dir, 'fr.md'), 'utf-8').trim();
    expect(body.length).toBeGreaterThan(0);
    expect(body.startsWith('# ')).toBe(true);
  });

  it.each(elementDirs)('%s has no front matter or HTML comment markers', (dir) => {
    const body = readFileSync(join(ELEMENTS_DIR, dir, 'fr.md'), 'utf-8');
    expect(body.startsWith('---')).toBe(false);
    expect(body).not.toMatch(/<!--/);
  });
});