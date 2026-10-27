/**
 * The certification checklist (issue #147), from the jsonb that
 * certification_status(program_id, profile_id?) returns. Pure: the database
 * decides eligibility; this only turns its answer into checklist lines.
 */

export type CertificationStatus = {
  eligible: boolean;
  specialization: string | null;
  weeksRequired: number;
  weeksPassed: number;
  missingWeeks: number[];
  capstonePassed: boolean;
  peerReviewsGiven: number;
  peerReviewsRequired: number;
  passScore: number;
};

function num(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

/** Defensive parse: anything unexpected reads as "not yet", never as eligible. */
export function parseCertificationStatus(json: unknown): CertificationStatus | null {
  if (!json || typeof json !== "object" || Array.isArray(json)) return null;
  const o = json as Record<string, unknown>;
  return {
    eligible: o.eligible === true,
    specialization: typeof o.specialization === "string" ? o.specialization : null,
    weeksRequired: num(o.weeks_required),
    weeksPassed: num(o.weeks_passed),
    missingWeeks: Array.isArray(o.missing_weeks) ? o.missing_weeks.filter((w): w is number => typeof w === "number") : [],
    capstonePassed: o.capstone_passed === true,
    peerReviewsGiven: num(o.peer_reviews_given),
    peerReviewsRequired: num(o.peer_reviews_required, 1),
    passScore: num(o.pass_score, 60),
  };
}

export type ChecklistItem = { id: "weeks" | "capstone" | "peer" | "mentor"; label: string; detail: string; done: boolean };

/** "weeks 3, 4 and 7" */
export function listWeeks(weeks: number[]) {
  if (weeks.length === 0) return "";
  const nums = weeks.map(String);
  const label = weeks.length === 1 ? "week" : "weeks";
  if (nums.length === 1) return `${label} ${nums[0]}`;
  return `${label} ${nums.slice(0, -1).join(", ")} and ${nums[nums.length - 1]}`;
}

/**
 * The four steps to a certificate, in order. `issued` marks the mentor's
 * final review done. Copy speaks to the learner ("you"); staff screens pass
 * `audience: "staff"`.
 */
export function checklistItems(
  status: CertificationStatus,
  { issued = false, audience = "learner" }: { issued?: boolean; audience?: "learner" | "staff" } = {},
): ChecklistItem[] {
  const you = audience === "learner";
  const remaining = status.missingWeeks;
  const weeksDone = status.weeksRequired > 0 && remaining.length === 0;
  const peerDone = status.peerReviewsGiven >= status.peerReviewsRequired;
  const reviews = (n: number) => `${n} ${n === 1 ? "review" : "reviews"}`;
  return [
    {
      id: "weeks",
      label: "Pass every week",
      detail: weeksDone
        ? `All ${status.weeksRequired} weeks graded ${status.passScore} or above.`
        : `${status.weeksPassed} of ${status.weeksRequired} passed. A week passes when it is graded ${status.passScore} or above.${
            remaining.length ? ` Still to pass: ${listWeeks(remaining)}.` : ""
          }`,
      done: weeksDone,
    },
    {
      id: "capstone",
      label: "Pass the capstone",
      detail: status.capstonePassed
        ? "Capstone graded and passed."
        : `The capstone needs a grade of ${status.passScore} or above.`,
      done: status.capstonePassed && status.weeksRequired > 0,
    },
    {
      id: "peer",
      label: you ? "Review a classmate's capstone" : "Capstone peer review given",
      detail: `${reviews(status.peerReviewsGiven)} given, ${status.peerReviewsRequired} needed. This step cannot be skipped.`,
      done: peerDone,
    },
    {
      id: "mentor",
      label: "Mentor's final review",
      detail: issued
        ? "Certificate issued."
        : status.eligible
          ? you
            ? "Every criterion is met. Your mentor makes the final review and issues the certificate."
            : "Every criterion is met. Ready to issue."
          : you
            ? "Your mentor issues the certificate once the steps above are done."
            : "Available once the steps above are done.",
      done: issued,
    },
  ];
}
