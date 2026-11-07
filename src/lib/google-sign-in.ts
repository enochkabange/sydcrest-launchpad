import "server-only";

/**
 * Google sign in stays hidden until the Supabase Google provider is set up
 * (issue #34); set AUTH_GOOGLE_ENABLED=true then. The auth pages are static,
 * so a change takes effect on the next deploy.
 */
export function googleSignInEnabled() {
  return process.env.AUTH_GOOGLE_ENABLED === "true";
}
