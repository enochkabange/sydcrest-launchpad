/**
 * Whether learners see their own readiness on My progress (#337). Off until
 * the founder approves the weights and a fairness review is recorded
 * (docs/readiness.md); switch on with READINESS_FOR_LEARNERS=on. Server only:
 * read it at request time, never in client code.
 */
export function readinessForLearners(env: Record<string, string | undefined> = process.env): boolean {
  return env.READINESS_FOR_LEARNERS?.trim().toLowerCase() === "on";
}
