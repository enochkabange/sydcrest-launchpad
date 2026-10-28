/**
 * Paths only signed in users can open (issue #190). The proxy sends signed
 * out visitors on these to /login; pages still authorize themselves through
 * lib/auth.ts, so this list errs towards leaving a path out: wrongly
 * protecting a public page would lock visitors out of it.
 *
 * A prefix covers the path and everything below it (`/mentor` covers
 * /mentor/learners/1 but not /mentors). Public and signed in pages share some
 * prefixes (/skills/[slug] is public, /skills/[slug]/quiz is not), so those
 * are patterns.
 *
 * /forgot-password and /reset-password stay public on purpose: someone who
 * has lost their password is signed out, and /reset-password checks for the
 * session a reset link signs in itself, explaining an expired link instead
 * of bouncing to /login.
 */
export const SIGNED_IN_PREFIXES = [
  "/dashboard",
  "/profile",
  "/notifications",
  // Learn
  "/learn",
  "/cohort",
  "/certificates",
  "/study-buddy",
  "/programme/apply",
  "/skills/reviews",
  // Mentors
  "/mentors",
  "/mentor",
  "/expert",
  "/experts/apply",
  "/bookings",
  "/briefs",
  // Community
  "/community",
  "/leaderboards",
  // Earn
  "/earn",
  "/opportunities/saved",
  "/outcomes",
  "/talent",
  "/business/new",
  // Staff
  "/admin",
];

export const SIGNED_IN_PATTERNS: RegExp[] = [
  // /org lists your organisations; /org/[slug] is the public organisation page.
  /^\/org\/?$/,
  /^\/org\/[^/]+\/(manage|team|requests|opportunities)(\/|$)/,
  /^\/events\/[^/]+\/(check-in|feedback|host)(\/|$)/,
  /^\/skills\/[^/]+\/(quiz|portfolio)(\/|$)/,
  /^\/experts\/[^/]+\/offers\/[^/]+\/request(\/|$)/,
];

export function matchesPrefix(path: string, prefixes: string[]): boolean {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

export function isSignedInPath(path: string): boolean {
  return matchesPrefix(path, SIGNED_IN_PREFIXES) || SIGNED_IN_PATTERNS.some((re) => re.test(path));
}
