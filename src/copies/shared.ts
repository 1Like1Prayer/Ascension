/**
 * Copy used by more than one screen. Anything read from a single screen belongs
 * in that screen's own file instead — see `./index.ts`.
 */
export const shared = {
  brand: {
    /** Logotype. Renders identically in every locale; do not translate. */
    name: 'Ascension',
    /** The sect glyph, "martial". A mark rather than a word; do not translate. */
    glyph: '武',
  },
} as const;

export type SharedCopy = typeof shared;
