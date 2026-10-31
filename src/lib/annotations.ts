export interface TagDefinition {
  label: string;
  color?: string;
}

export interface AnnotationGroup {
  title: string;
  tags: TagDefinition[];
}

// Tag groups (the folders of content/tags/) in display order.
export const GROUP_TITLES: Readonly<Record<string, string>> = {
  category: 'Catégorie',
  style: 'Style',
  period: 'Période',
  region: 'Région',
  mood: 'Sentiment',
  rarity: 'Rareté',
  part: 'Partie',
};

/**
 * Groups tag keys ("style/baroque") for display.
 * `definitions` is keyed by tag key; an unknown key is a content error and throws.
 * ignore "category/" tags when building groups.
 */
export function buildAnnotationGroups(
  tagKeys: readonly string[],
  definitions: ReadonlyMap<string, TagDefinition>,
): AnnotationGroup[] {
  const byGroup = new Map<string, TagDefinition[]>();

  for (const key of tagKeys) {
    const definition = definitions.get(key);
    if (!definition) throw new Error(`Unknown tag "${key}": no matching file in content/tags/`);
    const group = key.split('/')[0]!;
    if (group === 'category') continue;
    byGroup.set(group, [...(byGroup.get(group) ?? []), definition]);
  }

  return Object.entries(GROUP_TITLES)
    .filter(([group]) => byGroup.has(group))
    .map(([group, title]) => ({ title, tags: byGroup.get(group)! }));
}
