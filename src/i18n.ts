/**
 * Every user-facing string in the app.
 *
 * No display copy lives anywhere else in the tree. Components receive text as
 * props or read it from here; they never inline it. Values are frozen literal
 * types, so a typo in a key is a compile error rather than a blank label.
 *
 * `brand` is deliberately not translatable — see the note on that group.
 */
export const copy = {
  brand: {
    /** Logotype. Renders identically in every locale; do not translate. */
    name: 'Ascension',
    /** The sect glyph, "martial". A mark rather than a word; do not translate. */
    glyph: '武',
  },

  auth: {
    /** Eyebrow under the sect seal. */
    eyebrow: 'The Gate of the Sect',

    fields: {
      name: 'DISCIPLE NAME',
      mantra: 'SECRET MANTRA',
    },

    /** Toggle inside the mantra field. Reads as the action, not the state. */
    reveal: {
      show: 'SHOW',
      hide: 'HIDE',
    },

    submit: 'Enter the Sect',

    forgot: {
      prompt: 'Forgot your mantra?',
      action: 'Consult the elders',
    },

    /** Divider above the third-party sign-in row. */
    providersDivider: 'OR ARRIVE BY',

    register: {
      prompt: 'No record in the annals?',
      action: 'Begin initiation',
    },

    /** Proper nouns, but still copy: a locale may transliterate them. */
    providers: {
      apple: 'Apple',
      google: 'Google',
    },

    a11y: {
      continueWith: (provider: string) => `Continue with ${provider}`,
    },
  },
} as const;

export type Copy = typeof copy;
