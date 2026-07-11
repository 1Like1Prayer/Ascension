import { useSignIn, useSignUp } from '@clerk/expo';
import { useCallback, useMemo, useState } from 'react';

import { login } from '@/copies';

/** Minimal view of a Clerk error return; we only read the first entry. */
type ClerkErrorLike = {
  errors?: { code?: string; message?: string; longMessage?: string }[];
  message?: string;
} | null;

const firstCode = (e: ClerkErrorLike) => e?.errors?.[0]?.code;
const messageOf = (e: ClerkErrorLike) =>
  e?.errors?.[0]?.longMessage ?? e?.errors?.[0]?.message ?? e?.message ?? login.error.fallback;

/**
 * Drives the gate screen against Clerk with a single combined flow: try to sign
 * in with the email + password; if no account exists, create one and switch to
 * email-code verification. The screen stays presentational — it renders the
 * fields, the verification step, and any error this hook surfaces.
 *
 * Uses the method-based `@clerk/expo` v3 API (`signIn.password`, `finalize`,
 * `signUp.verifications.*`) — never the legacy `create()`/`setActive` shape.
 * Once `finalize()` runs, the provider's auth state flips and the router swaps
 * this screen out, so no manual navigation is needed.
 */
export function useLoginForm() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleReveal = useCallback(() => setRevealed((r) => !r), []);

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.length > 0,
    [email, password],
  );

  /** Sign in, or fall through to sign-up + email verification when new. */
  const submit = useCallback(async () => {
    if (!canSubmit || busy) return;
    setError(null);
    setBusy(true);
    try {
      const { error: signInError } = await signIn.password({
        identifier: email.trim(),
        password,
      });

      if (!signInError) {
        if (signIn.status === 'complete') await signIn.finalize();
        else setError(login.error.unsupportedStep);
        return;
      }

      // No such account yet → create it and verify the email.
      if (firstCode(signInError as ClerkErrorLike) === 'form_identifier_not_found') {
        const { error: signUpError } = await signUp.password({
          emailAddress: email.trim(),
          password,
        });
        if (signUpError) return setError(messageOf(signUpError as ClerkErrorLike));

        const { error: sendError } = await signUp.verifications.sendEmailCode();
        if (sendError) return setError(messageOf(sendError as ClerkErrorLike));

        setPendingVerification(true);
        return;
      }

      setError(messageOf(signInError as ClerkErrorLike));
    } finally {
      setBusy(false);
    }
  }, [busy, canSubmit, email, password, signIn, signUp]);

  /** Confirm the emailed code and activate the new session. */
  const verify = useCallback(async () => {
    if (code.trim().length === 0 || busy) return;
    setError(null);
    setBusy(true);
    try {
      const { error: verifyError } = await signUp.verifications.verifyEmailCode({
        code: code.trim(),
      });
      if (verifyError) return setError(messageOf(verifyError as ClerkErrorLike));

      if (signUp.status === 'complete') await signUp.finalize();
      else setError(login.error.unsupportedStep);
    } finally {
      setBusy(false);
    }
  }, [busy, code, signUp]);

  const resendCode = useCallback(async () => {
    setError(null);
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) setError(messageOf(sendError as ClerkErrorLike));
  }, [signUp]);

  /** Abandon the verification step and return to the credentials form. */
  const cancelVerification = useCallback(() => {
    setPendingVerification(false);
    setCode('');
    setError(null);
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    revealed,
    toggleReveal,
    pendingVerification,
    canSubmit,
    busy,
    error,
    submit,
    verify,
    resendCode,
    cancelVerification,
  };
}
