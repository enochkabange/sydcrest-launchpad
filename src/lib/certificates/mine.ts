/**
 * Splits a learner's certificates for /certificates (issue #238). A live
 * certificate whose programme already has a cohort card shows on that card;
 * every other live certificate gets a card of its own, so holding a
 * certificate never depends on still being in a cohort. Pure: no I/O.
 */
export type CertificateRow = { program_id: string; revoked_at: string | null };

export function splitCertificates<C extends CertificateRow>(certificates: C[], cohortProgramIds: Iterable<string>) {
  const covered = new Set(cohortProgramIds);
  const live = certificates.filter((c) => !c.revoked_at);
  return {
    /** Live certificates for programmes the learner has no cohort card for. */
    standalone: live.filter((c) => !covered.has(c.program_id)),
    revoked: certificates.filter((c) => !!c.revoked_at),
    hasLive: live.length > 0,
  };
}
