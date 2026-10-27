/**
 * Outcome types as the database checks them (public.outcomes.type), with the
 * words learners and visitors see. The North Star in the master roadmap names
 * a job, internship, freelance contract or scholarship; grants are recorded
 * too because the schema allows them.
 */
export const OUTCOME_TYPES = [
  { value: "job", label: "Job", plural: "Jobs", definition: "Paid employment, full or part time." },
  { value: "internship", label: "Internship", plural: "Internships", definition: "A paid or unpaid internship or attachment with an organisation." },
  {
    value: "freelance_contract",
    label: "Freelance contract",
    plural: "Freelance contracts",
    definition: "Paid work for a client under an agreed scope.",
  },
  { value: "scholarship", label: "Scholarship", plural: "Scholarships", definition: "A scholarship awarded for study or training." },
  { value: "grant", label: "Grant", plural: "Grants", definition: "Funding awarded for a project or a business." },
] as const;

export type OutcomeType = (typeof OUTCOME_TYPES)[number]["value"];

export function isOutcomeType(value: string): value is OutcomeType {
  return OUTCOME_TYPES.some((t) => t.value === value);
}

export function outcomeTypeLabel(value: string) {
  return OUTCOME_TYPES.find((t) => t.value === value)?.label ?? value;
}

export const VERIFICATION_STATUSES = ["pending", "verified", "rejected"] as const;
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export function isVerificationStatus(value: string): value is VerificationStatus {
  return (VERIFICATION_STATUSES as readonly string[]).includes(value);
}

/** What a learner sees beside each of their outcomes. */
export const STATUS_LABELS: Record<VerificationStatus, string> = {
  pending: "Waiting for review",
  verified: "Verified",
  rejected: "Needs more evidence",
};

/** Semantic token classes for the status pill. */
export const STATUS_TONES: Record<VerificationStatus, string> = {
  pending: "border-line bg-surface-sunken text-content-2",
  verified: "border-success-fg/30 bg-success-bg text-success-fg",
  rejected: "border-danger-fg/30 bg-danger-bg text-danger-fg",
};

/** A calendar date stored as YYYY-MM-DD, shown as "4 Jan 2027" without a timezone shift. */
export function formatDay(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}
