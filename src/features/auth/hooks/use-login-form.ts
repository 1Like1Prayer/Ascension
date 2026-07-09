import { useCallback, useMemo, useState } from 'react';

import {
  EMPTY_CREDENTIALS,
  isComplete,
  normalizeName,
  type Credentials,
} from '../utils/credentials';

/**
 * Everything the gate screen needs to drive its inputs. No view concerns.
 *
 * `onAuthenticate` receives normalized credentials, and only when the form is
 * complete — the guard lives here so the screen never has to re-check.
 */
export function useLoginForm(onAuthenticate?: (credentials: Credentials) => void) {
  const [credentials, setCredentials] = useState<Credentials>(EMPTY_CREDENTIALS);
  const [revealed, setRevealed] = useState(false);

  const setName = useCallback(
    (name: string) => setCredentials((c) => ({ ...c, name })),
    [],
  );
  const setMantra = useCallback(
    (mantra: string) => setCredentials((c) => ({ ...c, mantra })),
    [],
  );
  const toggleReveal = useCallback(() => setRevealed((r) => !r), []);

  const canSubmit = useMemo(() => isComplete(credentials), [credentials]);

  const submit = useCallback(() => {
    if (!canSubmit) return;
    onAuthenticate?.({ ...credentials, name: normalizeName(credentials.name) });
  }, [canSubmit, credentials, onAuthenticate]);

  return {
    credentials,
    setName,
    setMantra,
    revealed,
    toggleReveal,
    canSubmit,
    submit,
  };
}
