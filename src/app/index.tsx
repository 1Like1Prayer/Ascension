import { Show } from '@clerk/expo';

import { LoginScreen, SignedInScreen } from '@/features/auth';

/**
 * The gate. `Show` renders by Clerk's session state; the root layout holds the
 * splash until Clerk has loaded, so there's no signed-out flash on launch.
 */
export default function Index() {
  return (
    <>
      <Show when="signed-out">
        <LoginScreen />
      </Show>
      <Show when="signed-in">
        <SignedInScreen />
      </Show>
    </>
  );
}
