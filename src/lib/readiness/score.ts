/**
 * Readiness score v1 (epic #320 step 5): weights, bands and the arithmetic,
 * mirroring private.readiness_weights() and private.refresh_readiness() in
 * supabase/migrations/20261114100000_readiness_score.sql. A unit test fails
 * when the weights here and in the migration differ. Model card:
 * docs/readiness.md. Staff only until the founder approves the weights. Pure.
 */
import { enough } from "@/lib/insights/metrics";

/** A proposal for founder review. Change it here AND in a new migration. */
export const WEIGHTS = {
  skills: 40,
  progress: 25,
  portfolio: 15,
  activity: 10,
  profile: 10,
  portfolio_target: 3,
  activity_target_days: 8,
  building_from: 40,
  job_ready_from: 70,
} as const;

export const PARTS = [
  { key: "skills", label: "Core skills verified", source: "Verified skills mapped to the track (skill quizzes, portfolio reviews, finished paths)" },
  { key: "progress", label: "Track progress", source: "Required topics done in the track's roadmap" },
  { key: "portfolio", label: "Approved portfolio pieces", source: `Approved skill portfolios and passed programme work for the track, full marks at ${WEIGHTS.portfolio_target}` },
  { key: "activity", label: "Recent learning", source: `Days with lessons, reviews or submissions in the last 30, full marks at ${WEIGHTS.activity_target_days}` },
  { key: "profile", label: "Profile", source: "Half for About you (goal, career stage and a track), half for a public profile with a headline" },
] as const;
export type PartKey = (typeof PARTS)[number]["key"];

export const BANDS = [
  { value: "getting_started", label: "Getting started", from: 0 },
  { value: "building", label: "Building", from: WEIGHTS.building_from },
  { value: "job_ready", label: "Job ready", from: WEIGHTS.job_ready_from },
] as const;
export type Band = (typeof BANDS)[number]["value"];

export function bandFor(score: number): Band {
  if (score >= WEIGHTS.job_ready_from) return "job_ready";
  if (score >= WEIGHTS.building_from) return "building";
  return "getting_started";
}

export function bandLabel(value: string | null | undefined): string {
  return BANDS.find((b) => b.value === value)?.label ?? "Not scored yet";
}

/**
 * What the score may read: tables and columns named in the refresh. Kept as
 * data so a test can check it never overlaps NEVER_INPUTS.
 */
export const INPUTS = [
  "skill_roadmaps.roadmap_slug",
  "skills.is_published",
  "verified_skills.revoked_at",
  "roadmap_nodes.is_optional",
  "roadmap_progress.status",
  "roadmap_progress.updated_at",
  "skill_assessment_attempts.status",
  "submissions.final_score",
  "programs.pass_score",
  "review_sessions.completed_at",
  "learner_profiles.main_goal",
  "learner_profiles.career_stage",
  "learner_profiles.tracks",
  "profiles.is_public",
  "profiles.headline",
  "profiles.role",
] as const;

/**
 * Never a score input, directly or as a stand in (the tracking plan's "Never"
 * list and the About you answers that describe access, background or work
 * preferences). Gender, ethnicity, religion and disability are not collected.
 */
export const NEVER_INPUTS = [
  "region",
  "device_class",
  "usual_device",
  "usual_hour_band",
  "main_device",
  "internet",
  "study_hours",
  "study_times",
  "hour_band",
  "date_of_birth",
  "education",
  "field_of_study",
  "employment_status",
  "experience",
  "languages",
  "heard_from",
  "work_styles",
  "work_regions",
  "available_from",
  "willing_to_relocate",
  "min_pay_band",
  "industries",
  "first_touch_source",
  "utm_source",
] as const;

export type ReadinessInputs = {
  skillsVerified: number;
  skillsTotal: number;
  topicsDone: number;
  topicsTotal: number;
  portfolioPieces: number;
  activeDays30: number;
  aboutComplete: boolean;
  profilePublic: boolean;
};

export type ReadinessResult = { score: number; band: Band; available: number; points: Record<PartKey, number> };

const round1 = (n: number) => Math.round(n * 10) / 10;

/** The same arithmetic as private.refresh_readiness(). */
export function computeReadiness(i: ReadinessInputs): ReadinessResult {
  const points: Record<PartKey, number> = {
    skills: i.skillsTotal > 0 ? round1((WEIGHTS.skills * Math.min(i.skillsVerified, i.skillsTotal)) / i.skillsTotal) : 0,
    progress: i.topicsTotal > 0 ? round1((WEIGHTS.progress * i.topicsDone) / i.topicsTotal) : 0,
    portfolio: round1((WEIGHTS.portfolio * Math.min(i.portfolioPieces, WEIGHTS.portfolio_target)) / WEIGHTS.portfolio_target),
    activity: round1((WEIGHTS.activity * Math.min(i.activeDays30, WEIGHTS.activity_target_days)) / WEIGHTS.activity_target_days),
    profile: (WEIGHTS.profile / 2) * (Number(i.aboutComplete) + Number(i.profilePublic)),
  };
  const available = 100 - (i.skillsTotal > 0 ? 0 : WEIGHTS.skills) - (i.topicsTotal > 0 ? 0 : WEIGHTS.progress);
  const sum = Object.values(points).reduce((a, b) => a + b, 0);
  const score = Math.min(100, Math.max(0, Math.round((100 * sum) / available)));
  return { score, band: bandFor(score), available, points };
}

/** The part that would raise this score most if finished, for the "why" view. */
export function biggestGap(row: Record<`${PartKey}_points`, number> & { skills_total: number; topics_total: number }): PartKey | null {
  let best: PartKey | null = null;
  let gap = 0.05;
  for (const { key } of PARTS) {
    if (key === "skills" && row.skills_total === 0) continue;
    if (key === "progress" && row.topics_total === 0) continue;
    const missing = WEIGHTS[key] - Number(row[`${key}_points`]);
    if (missing > gap) {
      gap = missing;
      best = key;
    }
  }
  return best;
}

// Fairness report (issue #328) -----------------------------------------------------------

/** A group's average differing from its dimension's average by more than this many points is flagged. */
export const FAIRNESS_GAP = 10;

export const DIMENSIONS = [
  { value: "region", label: "Region" },
  { value: "device", label: "Usual device" },
  { value: "internet", label: "Internet (About you)" },
  { value: "age", label: "Age band" },
  { value: "education", label: "Education (About you)" },
  { value: "track", label: "Track" },
] as const;
export type Dimension = (typeof DIMENSIONS)[number]["value"];

export type ReportRow = {
  dimension: string;
  grp: string;
  learners: number;
  score_sum: number;
  getting_started: number;
  building: number;
  job_ready: number;
};

export type GroupLine = ReportRow & { average: number | null; gap: number | null; flagged: boolean };
export type DimensionReport = { dimension: Dimension; label: string; average: number | null; total: number; groups: GroupLine[]; flags: number };

/**
 * Per dimension: the overall average (all groups, unknown included), each
 * group's average and its gap to the overall, flagged beyond FAIRNESS_GAP.
 * Groups under MIN_SAMPLE show no average and are never flagged.
 */
export function fairnessReport(rows: ReportRow[]): DimensionReport[] {
  return DIMENSIONS.map(({ value, label }) => {
    const mine = rows.filter((r) => r.dimension === value);
    const total = mine.reduce((a, r) => a + r.learners, 0);
    const sum = mine.reduce((a, r) => a + r.score_sum, 0);
    const average = enough(total) ? sum / total : null;
    const groups = mine
      .map((r) => {
        const avg = enough(r.learners) ? r.score_sum / r.learners : null;
        const gap = avg !== null && average !== null ? avg - average : null;
        return { ...r, average: avg, gap, flagged: gap !== null && Math.abs(gap) > FAIRNESS_GAP };
      })
      .sort((a, b) => b.learners - a.learners || a.grp.localeCompare(b.grp));
    return { dimension: value, label, average, total, groups, flags: groups.filter((g) => g.flagged).length };
  });
}

/** Score histogram in 10 point buckets (0–9 … 90–100), from the 'score' dimension. */
export function histogram(rows: ReportRow[]): { from: number; learners: number }[] {
  const counts = new Map(rows.filter((r) => r.dimension === "score").map((r) => [Number(r.grp), r.learners]));
  return Array.from({ length: 10 }, (_, i) => ({ from: i * 10, learners: counts.get(i * 10) ?? 0 }));
}
