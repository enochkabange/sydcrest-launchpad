/**
 * Forgot password (issue #227). Shared by the reset actions, the
 * /reset-password page and their tests. No server only imports.
 */

/** Shown after every reset request, whether or not an account uses the address. */
export const RESET_SENT_MESSAGE =
  "If an account uses that email, we have sent a link to reset your password. It can take a few minutes; check your spam folder too.";

/** Where the reset email lands after /auth/callback has exchanged its code. */
export const RESET_PASSWORD_PATH = "/reset-password";

/** The dashboard notice after a new password is saved. */
export const PASSWORD_CHANGED_NOTICE = "password";

type AmrClaim = { method?: unknown } | string;

/**
 * True when the session came from a password reset link. Supabase records
 * how a session was made in the `amr` claim, and a reset link adds
 * "recovery". Only that session may set a new password here, so a session
 * left signed in on a shared computer cannot be used to take the account.
 */
export function isRecoverySession(claims: { amr?: unknown } | null | undefined): boolean {
  const amr = claims?.amr;
  if (!Array.isArray(amr)) return false;
  return (amr as AmrClaim[]).some((entry) => (typeof entry === "string" ? entry : entry?.method) === "recovery");
}
