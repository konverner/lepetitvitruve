import { z } from 'zod';

const localizedStringSchema = z.object({
  fr: z.string(),
  en: z.string(),
}).strict();

const localizedStringListSchema = z.object({
  fr: z.array(z.string()),
  en: z.array(z.string()),
}).strict();

// Le Robert notation: part of speech, then grammatical gender. V1 entries are all French nouns.
export const genderSchema = z.object({
  fr: z.string().regex(/^n\.[mf]\.$/, 'must be "n.m." or "n.f." (Le Robert notation)'),
}).strict();

// Hover-only diagrams need just id + French label; marker is for numbered markers (not built yet).
const partSchema = z.object({
  id: z.string(),
  label: z.object({
    fr: z.string(),
    en: z.string().optional(),
  }).strict(),
  marker: z.object({
    x: z.number(),
    y: z.number(),
  }).strict().optional(),
}).strict();

// "group/name", e.g. "style/baroque"; must match a file in content/tags/ (see scripts/check-content.ts).
export const tagKeySchema = z.string().regex(/^[a-z]+\/[a-z0-9]+(-[a-z0-9]+)*$/, 'must look like "group/name"');

// Shared with scripts/check-content.ts, which can't import from 'astro:content'.
export const elementSchema = z.object({
  name: localizedStringSchema,
  gender: genderSchema,
  slug: localizedStringSchema,
  aliases: localizedStringListSchema,
  category: z.enum(['opening', 'support', 'roof', 'ornament', 'structure']),
  tags: z.array(tagKeySchema),
  parts: z.array(partSchema).optional(),
}).strict();

export type ElementData = z.infer<typeof elementSchema>;

// Chip text is always dark, so `color` must be a light background.
export const tagSchema = z.object({
  key: tagKeySchema,
  slug: localizedStringSchema,
  label: localizedStringSchema,
  description: localizedStringSchema,
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'must be a 6-digit hex color like "#d9e4f5"').optional(),
}).strict();

export type TagData = z.infer<typeof tagSchema>;
