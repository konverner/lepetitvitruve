import { getCollection, type CollectionEntry } from 'astro:content';
import { buildAnnotationGroups, type AnnotationGroup, type TagDefinition } from './annotations';

export type Element = CollectionEntry<'elements'>['data'] & { id: string };

/** Every element, sorted alphabetically by French name. */
export async function getAllElements(): Promise<Element[]> {
  const entries = await getCollection('elements');
  return entries
    .map((entry) => ({ ...entry.data, id: entry.id }))
    .sort((a, b) => a.name.fr.localeCompare(b.name.fr, 'fr'));
}

/** Tag chips for an element, grouped for the annotations card. */
export async function getAnnotationGroups(element: Element): Promise<AnnotationGroup[]> {
  const entries = await getCollection('tags');
  const definitions = new Map<string, TagDefinition>(
    entries.map((entry) => [entry.id, { label: entry.data.label.fr, color: entry.data.color }]),
  );
  return buildAnnotationGroups(element.tags, definitions);
}
