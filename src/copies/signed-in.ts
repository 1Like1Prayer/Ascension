export const signedIn = {
  eyebrow: "Ascended",
  greeting: "Welcome back",
  signOut: "Sign out",
} as const;

export type SignedInCopy = typeof signedIn;
