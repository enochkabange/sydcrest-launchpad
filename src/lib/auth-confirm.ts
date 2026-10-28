import type { EmailOtpType } from "@supabase/supabase-js";
import { safeNextPath } from "@/lib/validation";

/** The link types our email templates send to /auth/confirm. */
const EMAIL_OTP_TYPES = ["signup", "recovery", "email_change", "invite", "magiclink", "email"] as const;

export function isEmailOtpType(value: string | null): value is EmailOtpType {
  return (EMAIL_OTP_TYPES as readonly string[]).includes(value ?? "");
}

/**
 * Where an emailed link lands after /auth/confirm. `next` is normally a local
 * path. The sign up template passes Supabase's `{{ .RedirectTo }}` instead,
 * the full URL the sign up form asked for (".../auth/callback?next=/path"),
 * so a learner who signed up from /path still lands on /path. Only the local
 * path is ever taken from a full URL, never its host, so the link cannot
 * send anyone to another site.
 */
export function confirmNextPath(raw: string | null, fallback: string): string {
  let next = raw;
  if (next && /^https?:\/\//i.test(next) && URL.canParse(next)) {
    const url = new URL(next);
    next = url.pathname === "/auth/callback" ? url.searchParams.get("next") : `${url.pathname}${url.search}`;
  }
  // "/" alone is the Site URL Supabase falls back to; the default is more useful.
  return next === "/" ? fallback : safeNextPath(next, fallback);
}
