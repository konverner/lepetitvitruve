import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { elementSchema, tagSchema } from './lib/element-schema';

const elements = defineCollection({
  loader: glob({
    pattern: '*/annotation.yaml',
    base: './content/elements',
    // Use the folder name as the entry id, not the glob loader's default slug.
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: elementSchema,
});

const tags = defineCollection({
  loader: glob({
    pattern: '*/*.yaml',
    base: './content/tags',
    // "style/classical.yaml" -> "style/classical"
    generateId: ({ entry }) => entry.replace(/\.yaml$/, ''),
  }),
  schema: tagSchema,
});

export const collections = { elements, tags };
