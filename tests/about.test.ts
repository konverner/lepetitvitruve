import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ABOUT_PATH = join(__dirname, '../content/about/fr.md');

describe('about/fr.md', () => {
  it('starts with a top-level heading and is non-empty', () => {
    const body = readFileSync(ABOUT_PATH, 'utf-8').trim();
    expect(body.length).toBeGreaterThan(0);
    expect(body.startsWith('# ')).toBe(true);
  });

  it('has no front matter or HTML comment markers', () => {
    const body = readFileSync(ABOUT_PATH, 'utf-8');
    expect(body.startsWith('---')).toBe(false);
    expect(body).not.toMatch(/<!--/);
  });
});
