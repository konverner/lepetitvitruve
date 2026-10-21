// Read-only cross-checks that Zod alone can't express. Never writes files.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { elementSchema, tagSchema } from '../src/lib/element-schema.ts';
import { GROUP_TITLES } from '../src/lib/annotations.ts';

const ELEMENTS_DIR = join(process.cwd(), 'content/elements');
const TAGS_DIR = join(process.cwd(), 'content/tags');
const RESERVED_SLUGS = new Set(['index', 'about', '404', 'sitemap']);
const KEBAB_ASCII = /^[a-z0-9]+(-[a-z0-9]+)*$/;

let hasErrors = false;

function fail(file: string, message: string): void {
  hasErrors = true;
  console.error(`✖ ${file}: ${message}`);
}

function readYaml(path: string): unknown {
  try {
    return parseYaml(readFileSync(path, 'utf-8'));
  } catch (err) {
    fail(path, `invalid YAML (${(err as Error).message})`);
    return undefined;
  }
}

// Tags are the source of truth: elements may only reference keys defined here.
const tagKeys = new Set<string>();
if (existsSync(TAGS_DIR)) {
  for (const group of readdirSync(TAGS_DIR)) {
    const groupDir = join(TAGS_DIR, group);
    if (!statSync(groupDir).isDirectory()) continue;
    if (!(group in GROUP_TITLES)) {
      fail(groupDir, `unknown tag group "${group}"; add it to GROUP_TITLES in src/lib/annotations.ts`);
    }

    const seenSlugs = new Map<string, string>();
    for (const fileName of readdirSync(groupDir).filter((name) => name.endsWith('.yaml'))) {
      const tagPath = join(groupDir, fileName);
      const parsedTag = readYaml(tagPath);
      if (parsedTag === undefined) continue;

      const tagResult = tagSchema.safeParse(parsedTag);
      if (!tagResult.success) {
        for (const issue of tagResult.error.issues) {
          fail(tagPath, `${issue.path.join('.') || '(root)'}: ${issue.message}`);
        }
        continue;
      }

      const expectedKey = `${group}/${fileName.replace(/\.yaml$/, '')}`;
      if (tagResult.data.key !== expectedKey) {
        fail(tagPath, `key "${tagResult.data.key}" must match its path ("${expectedKey}")`);
      }
      tagKeys.add(expectedKey);

      for (const lang of ['fr', 'en'] as const) {
        const slug = `${lang}:${tagResult.data.slug[lang]}`;
        const owner = seenSlugs.get(slug);
        if (owner) fail(tagPath, `slug.${lang} "${tagResult.data.slug[lang]}" is already used by ${owner}`);
        else seenSlugs.set(slug, fileName);
      }
    }
  }
}

const dirNames = readdirSync(ELEMENTS_DIR).filter((name) =>
  statSync(join(ELEMENTS_DIR, name)).isDirectory(),
);

const seenSlugs = new Map<string, string>(); // slug -> owning dir

for (const dirName of dirNames) {
  const dir = join(ELEMENTS_DIR, dirName);
  const yamlPath = join(dir, 'annotation.yaml');
  // Folders without annotation.yaml aren't elements; skip them.
  if (!existsSync(yamlPath)) continue;

  const parsedYaml = readYaml(yamlPath);
  if (parsedYaml === undefined) continue;

  const result = elementSchema.safeParse(parsedYaml);
  if (!result.success) {
    for (const issue of result.error.issues) {
      fail(yamlPath, `${issue.path.join('.') || '(root)'}: ${issue.message}`);
    }
    continue;
  }
  const data = result.data;

  if (!KEBAB_ASCII.test(data.slug.fr)) {
    fail(yamlPath, `slug.fr "${data.slug.fr}" must be lowercase ASCII kebab-case`);
  }
  if (RESERVED_SLUGS.has(data.slug.fr)) {
    fail(yamlPath, `slug "${data.slug.fr}" collides with a reserved route`);
  }
  const owner = seenSlugs.get(data.slug.fr);
  if (owner) {
    fail(yamlPath, `slug "${data.slug.fr}" is already used by ${owner}`);
  } else {
    seenSlugs.set(data.slug.fr, dirName);
  }

  const seenTags = new Set<string>();
  for (const tag of data.tags) {
    if (!tagKeys.has(tag)) fail(yamlPath, `tags: "${tag}" has no matching file in content/tags/`);
    if (seenTags.has(tag)) fail(yamlPath, `tags: "${tag}" is listed twice`);
    seenTags.add(tag);
  }

  const partIds = new Set<string>();
  for (const part of data.parts ?? []) {
    if (partIds.has(part.id)) fail(yamlPath, `parts: duplicate id "${part.id}"`);
    partIds.add(part.id);
  }

  const mdPath = join(dir, 'fr.md');
  if (!existsSync(mdPath)) {
    fail(mdPath, 'missing fr.md');
  } else {
    const body = readFileSync(mdPath, 'utf-8').trim();
    if (body.length === 0) {
      fail(mdPath, 'fr.md is empty');
    } else if (!body.startsWith('# ')) {
      fail(mdPath, 'fr.md must start with an "# {Title}" heading');
    }
  }

  for (const fileName of ['preview.svg', 'full.svg']) {
    const svgPath = join(dir, fileName);
    if (!existsSync(svgPath)) continue;

    const svg = readFileSync(svgPath, 'utf-8');
    if (/<text[\s>]/i.test(svg)) fail(svgPath, 'must not contain <text>');
    if (/<script[\s>]/i.test(svg)) fail(svgPath, 'must not contain <script>');
    if (/\bhref\s*=\s*["']https?:/i.test(svg)) fail(svgPath, 'must not reference external URLs');

    // Fragment references (url(#id), href="#id") look like hex colors but aren't.
    const withoutRefs = svg.replace(/url\(\s*#[^)]*\)/g, '').replace(/\bhref\s*=\s*["']#[^"']*["']/g, '');
    if (/#[0-9a-fA-F]{3,8}\b/.test(withoutRefs)) fail(svgPath, 'must not hard-code hex colors; use CSS variables');
    if (/prefers-color-scheme/.test(svg)) fail(svgPath, 'must not carry its own theme rules; theming lives in tokens.css');

    if (fileName === 'full.svg') {
      const svgPartIds = new Set([...svg.matchAll(/data-part="([^"]+)"/g)].map((m) => m[1]!));
      for (const partId of partIds) {
        if (!svgPartIds.has(partId)) fail(svgPath, `part "${partId}" is missing from the SVG`);
      }
      for (const svgPartId of svgPartIds) {
        if (!partIds.has(svgPartId)) fail(svgPath, `data-part "${svgPartId}" has no entry in annotation.yaml parts`);
      }
    }
  }
}

if (hasErrors) {
  console.error('\ncheck:content failed.');
  process.exit(1);
} else {
  console.log(
    `check:content passed (${seenSlugs.size} element${seenSlugs.size === 1 ? '' : 's'}, ${tagKeys.size} tags).`,
  );
}
