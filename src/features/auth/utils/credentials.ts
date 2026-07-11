export type Credentials = { name: string; mantra: string };

export const EMPTY_CREDENTIALS: Credentials = { name: '', mantra: '' };

/** Disciple names are matched trimmed; mantras are never trimmed. */
export const normalizeName = (name: string): string => name.trim();

/**
 * Whether the gate will accept a submission attempt. Presence only — the server
 * owns every real rule (length, charset, whether the disciple exists).
 */
export function isComplete({ name, mantra }: Credentials): boolean {
  return normalizeName(name).length > 0 && mantra.length > 0;
}
