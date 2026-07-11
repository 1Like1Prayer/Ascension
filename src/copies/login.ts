/** Copy for the login screen and the components only it renders. */
export const login = {
  /** Eyebrow under the sect seal. */
  eyebrow: "Your next realm awaits",

  fields: {
    name: "USERNAME",
    mantra: "PASSWORD",
  },

  /** Toggle inside the mantra field. Reads as the action, not the state. */
  reveal: {
    show: "SHOW",
    hide: "HIDE",
  },

  submit: "Log In",

  forgot: {
    prompt: "Forgot ",
    action: "password?",
  },

  /** Divider above the third-party sign-in row. */
  providersDivider: "OR CONTINUE WITH",

  register: {
    prompt: "Don't have an account?",
    action: "Sign up",
  },

  /** Proper nouns, but still copy: a locale may transliterate them. */
  providers: {
    apple: "Apple",
    google: "Google",
  },

  a11y: {
    continueWith: (provider: string) => `Continue with ${provider}`,
  },
} as const;

export type LoginCopy = typeof login;
