import { describe, expect, it } from 'vitest';
import { buildAnnotationGroups, type TagDefinition } from '../src/lib/annotations';

const definitions = new Map<string, TagDefinition>([
  ['style/classical', { label: 'Classique', color: '#d9e4f5' }],
  ['region/europe', { label: 'Europe' }],
  ['mood/grand', { label: 'Grand' }],
  ['rarity/rare', { label: 'Rare' }],
]);

describe('buildAnnotationGroups', () => {
  it('orders groups as Style, Région, Sentiment, Rarité and skips empty ones', () => {
    const groups = buildAnnotationGroups(
      ['rarity/rare', 'mood/grand', 'region/europe', 'style/classical'],
      definitions,
    );
    expect(groups.map((g) => g.title)).toEqual(['Style', 'Région', 'Sentiment', 'Rareté']);
    expect(buildAnnotationGroups(['style/classical'], definitions)).toHaveLength(1);
  });

  it('uses the defined label and color', () => {
    const [style] = buildAnnotationGroups(['style/classical'], definitions);
    expect(style?.tags).toEqual([{ label: 'Classique', color: '#d9e4f5' }]);
  });

  it('returns no groups for an element without tags', () => {
    expect(buildAnnotationGroups([], definitions)).toEqual([]);
  });

  it('throws on a tag that has no definition', () => {
    expect(() => buildAnnotationGroups(['region/atlantis'], definitions)).toThrow(/region\/atlantis/);
  });
});
