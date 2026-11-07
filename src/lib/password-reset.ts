/**
 * Forgot password (issue #227). Shared by the reset actions, the
 * /reset-password page and their tests. No server only imports.
 */

/** Shown after every reset request, whether or not an account uses the address. */
export const RESET_SENT_MESSAGE =
  "If an account uses that email, we have sent a link to reset your password. It can take a few minutes; check your spam folder too.";

/** Where the reset email lands once /auth/confirm has checked its link. */
export const RESET_PASSWORD_PATH = "/reset-password";

/** The dashboard notice after a new password is saved. */
export const PASSWORD_CHANGED_NOTICE = "password";

type AmrClaim = { method?: unknown } | string;

/**
 * Marks the session a reset email's link made. /auth/confirm sets it to that
 * session's `session_id` claim; only a session with the same id counts as a
 * reset session. Lasts as long as the link would.
 */
export const RECOVERY_COOKIE = "sc_recovery";
export const RECOVERY_COOKIE_MAX_AGE = 60 * 60;

/**
 * True when the session came from a password reset link, so only that
 * session may set a new password here and a session left signed in on a
 * shared computer cannot be used to take the account.
 *
 * Two ways in. A link landed by /auth/confirm (`verifyOtp`) records "otp" in
 * the `amr` claim, the same as a sign up confirmation, so it is recognised by
 * the RECOVERY_COOKIE holding this session's id. A link landed by
 * /auth/callback (Supabase's default template, PKCE code exchange) records
 * "recovery" in `amr`.
 */
export function isRecoverySession(
  claims: { amr?: unknown; session_id?: unknown } | null | undefined,
  recoveryCookie?: string | null,
): boolean {
  if (!claims) return false;
  if (recoveryCookie && typeof claims.session_id === "string" && recoveryCookie === claims.session_id) return true;
  const amr = claims.amr;
  if (!Array.isArray(amr)) return false;
  return (amr as AmrClaim[]).some((entry) => (typeof entry === "string" ? entry : entry?.method) === "recovery");
}
