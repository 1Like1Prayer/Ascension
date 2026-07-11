/** Copy for the login screen and the components only it renders. */
export const login = {
  /** Eyebrow under the sect seal. */
  eyebrow: "Your next realm awaits",

  fields: {
    // Clerk's default identifier is the email address; sign-in and sign-up both
    // key off it. Switch to a username here only if you enable it in the Clerk
    // dashboard (User & authentication → Username).
    name: "EMAIL",
    mantra: "PASSWORD",
  },

  /** Toggle inside the mantra field. Reads as the action, not the state. */
  reveal: {
    show: "SHOW",
    hide: "HIDE",
  },

  submit: "Log In",

  /** Email-code step shown to a brand-new account after sign-up. */
  verify: {
    label: "VERIFICATION CODE",
    hint: (email: string) => `We sent a 6-digit code to ${email}.`,
    submit: "Verify email",
    resend: "Resend code",
    back: "Use a different email",
  },

  error: {
    fallback: "Something went wrong. Please try again.",
    unsupportedStep: "This account needs another step to sign in.",
  },

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
