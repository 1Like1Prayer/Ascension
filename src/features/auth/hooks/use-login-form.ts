import { useSignIn, useSignUp, useSSO } from '@clerk/expo';
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

/** The screen shows one of these at a time. */
export type AuthMode = 'signIn' | 'verifyEmail' | 'forgotRequest' | 'forgotReset';

export type SsoProvider = 'apple' | 'google';
const SSO_STRATEGY = {
  apple: 'oauth_apple',
  google: 'oauth_google',
} as const;

/**
 * Drives the gate screen against Clerk. One hook, four modes:
 *  - signIn: email + password. Signs in, or falls through to sign-up + email code.
 *  - verifyEmail: confirm the emailed code for a brand-new account.
 *  - forgotRequest / forgotReset: password reset by email code.
 *  - SSO: Google / Apple via the browser flow.
 *
 * Method-based `@clerk/expo` v3 API throughout (`signIn.password`, `finalize`,
 * `resetPasswordEmailCode.*`). SSO is the one exception that uses
 * `setActive({ session })` rather than `finalize()`. Once the session is set,
 * the provider's auth state flips and the router swaps this screen out.
 */
export function useLoginForm() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleReveal = useCallback(() => setRevealed((r) => !r), []);
  const clear = useCallback(() => {
    setError(null);
    setCode('');
  }, []);

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

      if (firstCode(signInError as ClerkErrorLike) === 'form_identifier_not_found') {
        const { error: signUpError } = await signUp.password({
          emailAddress: email.trim(),
          password,
        });
        if (signUpError) return setError(messageOf(signUpError as ClerkErrorLike));

        const { error: sendError } = await signUp.verifications.sendEmailCode();
        if (sendError) return setError(messageOf(sendError as ClerkErrorLike));

        setMode('verifyEmail');
        return;
      }

      setError(messageOf(signInError as ClerkErrorLike));
    } finally {
      setBusy(false);
    }
  }, [busy, canSubmit, email, password, signIn, signUp]);

  /** Confirm the sign-up email code and activate the session. */
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

  /** Forgot password, step 1: create the attempt and email a reset code. */
  const sendResetCode = useCallback(async () => {
    if (email.trim().length === 0 || busy) return;
    setError(null);
    setBusy(true);
    try {
      const { error: createError } = await signIn.create({ identifier: email.trim() });
      if (createError) return setError(messageOf(createError as ClerkErrorLike));

      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendError) return setError(messageOf(sendError as ClerkErrorLike));

      setCode('');
      setPassword('');
      setMode('forgotReset');
    } finally {
      setBusy(false);
    }
  }, [busy, email, signIn]);

  /** Forgot password, step 2: verify the code, set the new password, sign in. */
  const resetPassword = useCallback(async () => {
    if (code.trim().length === 0 || password.length === 0 || busy) return;
    setError(null);
    setBusy(true);
    try {
      const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({
        code: code.trim(),
      });
      if (verifyError) return setError(messageOf(verifyError as ClerkErrorLike));

      const { error: submitError } = await signIn.resetPasswordEmailCode.submitPassword({
        password,
      });
      if (submitError) return setError(messageOf(submitError as ClerkErrorLike));

      if (signIn.status === 'complete') await signIn.finalize();
      else setError(login.error.unsupportedStep);
    } finally {
      setBusy(false);
    }
  }, [busy, code, password, signIn]);

  /** Google / Apple via the browser SSO flow (setActive, not finalize). */
  const startSso = useCallback(
    async (provider: SsoProvider) => {
      setError(null);
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy: SSO_STRATEGY[provider],
        });
        // No session and no throw = the user cancelled; stay silent.
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
        }
      } catch {
        setError(login.error.fallback);
      }
    },
    [startSSOFlow],
  );

  const goToForgot = useCallback(() => {
    clear();
    setPassword('');
    setMode('forgotRequest');
  }, [clear]);

  const backToSignIn = useCallback(() => {
    clear();
    setMode('signIn');
  }, [clear]);

  return {
    mode,
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    revealed,
    toggleReveal,
    canSubmit,
    busy,
    error,
    submit,
    verify,
    resendCode,
    sendResetCode,
    resetPassword,
    startSso,
    goToForgot,
    backToSignIn,
  };
}
