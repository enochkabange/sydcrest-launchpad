/**
 * Switches for matching (#336). Both off until the founder approves the
 * readiness weights and a fairness review is recorded (docs/readiness.md).
 * Server only: read at request time (after the session is read), never in
 * client code. /admin/matching ignores them.
 *
 * READINESS_FOR_LEARNERS=on (the same switch as My progress, #337): "Why
 * this fits you", "What would improve your fit" and ranking "Suggested for
 * you" by match. READINESS_FOR_EMPLOYERS=on: the share boxes on the apply
 * form, My applications and the talent listing, and shared bands on the org
 * applicants page and in the talent directory.
 */
type Env = Record<string, string | undefined>;

const on = (value: string | undefined) => value?.trim().toLowerCase() === "on";

export function matchingForLearners(env: Env = process.env): boolean {
  return on(env.READINESS_FOR_LEARNERS);
}

export function matchingForEmployers(env: Env = process.env): boolean {
  return on(env.READINESS_FOR_EMPLOYERS);
}
