import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { genderSchema } from '../src/lib/element-schema';

const ELEMENTS_DIR = join(__dirname, '../content/elements');

const elementDirs = readdirSync(ELEMENTS_DIR).filter(
  (name) =>
    statSync(join(ELEMENTS_DIR, name)).isDirectory() &&
    existsSync(join(ELEMENTS_DIR, name, 'annotation.yaml')),
);

describe('genderSchema (Le Robert notation)', () => {
  it.each(['n.m.', 'n.f.'])('accepts %s', (value) => {
    expect(genderSchema.safeParse({ fr: value }).success).toBe(true);
  });

  it.each(['n. m.', 'm.', 'n.x.', 'N.M.', 'n.m', ''])('rejects %j', (value) => {
    expect(genderSchema.safeParse({ fr: value }).success).toBe(false);
  });
});

describe('annotation.yaml gender', () => {
  it.each(elementDirs)('%s has a valid gender.fr', (dir) => {
    const data = parseYaml(readFileSync(join(ELEMENTS_DIR, dir, 'annotation.yaml'), 'utf-8'));
    expect(genderSchema.safeParse(data.gender).success).toBe(true);
  });
});
