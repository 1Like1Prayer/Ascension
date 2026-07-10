/** Copy for the login screen and the components only it renders. */
export const login = {
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
} as const;

export type LoginCopy = typeof login;
