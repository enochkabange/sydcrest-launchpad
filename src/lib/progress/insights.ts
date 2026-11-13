/**
 * My progress (issue #337): the learner's own insights, worked out from their
 * own rows. Pure, so the page stays thin and every rule is unit tested.
 *
 * Copy rules for this page: kind and encouraging, never comparing the learner
 * with anyone else, and no dashes. Device, region and connection never appear
 * in a suggestion; study hour may, because it helps the learner plan.
 */
import { addDays, daysBetween, type Day } from "@/lib/learning-loop/dates";
import { PARTS, WEIGHTS, type Band, type PartKey } from "@/lib/readiness/score";

// Rhythm -------------------------------------------------------------------------------

/** Distinct days in the `window` days up to and including `today`. */
export function activeDaysIn(days: Iterable<Day>, today: Day, window = 30): number {
  const from = addDays(today, -(window - 1));
  return new Set([...days].filter((d) => d >= from && d <= today)).size;
}

/** Weeks the pace is measured over. Long enough to smooth one busy week. */
export const PACE_WEEKS = 4;

/** Topics finished per week over the last PACE_WEEKS weeks (one decimal). */
export function topicsPerWeek(doneDays: Iterable<Day>, today: Day, weeks = PACE_WEEKS): number {
  const from = addDays(today, -(weeks * 7 - 1));
  const n = [...doneDays].filter((d) => d >= from && d <= today).length;
  return Math.round((n / weeks) * 10) / 10;
}

export type FinishEstimate = { weeks: number; label: string };

/**
 * How long the rest of a roadmap would take at this pace, or null when there
 * is no pace yet (nothing finished lately) or nothing left.
 */
export function finishEstimate(remaining: number, perWeek: number): FinishEstimate | null {
  if (remaining <= 0 || !(perWeek > 0)) return null;
  const weeks = Math.max(1, Math.ceil(remaining / perWeek));
  return { weeks, label: durationLabel(weeks) };
}

/** "about a week", "about 3 weeks", "about 2 months". */
export function durationLabel(weeks: number): string {
  if (weeks <= 1) return "about a week";
  if (weeks < 9) return `about ${weeks} weeks`;
  const months = Math.round(weeks / 4.35);
  return months <= 1 ? "about a month" : `about ${months} months`;
}

const HOUR_PHRASES: Record<string, string> = {
  night: "late at night",
  morning: "in the morning",
  afternoon: "in the afternoon",
  evening: "in the evening",
  late: "late in the evening",
};

/** "in the evening" for a usual hour band, or null when it is not known. */
export function studyTimePhrase(band: string | null | undefined): string | null {
  return (band && HOUR_PHRASES[band]) || null;
}

// Quiz trend -----------------------------------------------------------------------------

/** Scores needed before the page says anything about a trend. */
export const TREND_MIN = 4;
/** How many of the latest scores make "recent". */
export const TREND_RECENT = 3;

export type QuizTrend = { direction: "up" | "steady" | "down"; recent: number; earlier: number } | null;

/**
 * The average of the latest TREND_RECENT scores against the ones before, in
 * the order the topics were passed. Within five points counts as steady.
 */
export function quizTrend(scores: number[]): QuizTrend {
  if (scores.length < TREND_MIN) return null;
  const avg = (xs: number[]) => Math.round(xs.reduce((a, b) => a + b, 0) / xs.length);
  const recent = avg(scores.slice(-TREND_RECENT));
  const earlier = avg(scores.slice(0, -TREND_RECENT));
  const diff = recent - earlier;
  return { direction: diff >= 5 ? "up" : diff <= -5 ? "down" : "steady", recent, earlier };
}

// Readiness explained -------------------------------------------------------------------

export type ReadinessRow = {
  roadmap_slug: string;
  score: number;
  band: string;
  skills_points: number;
  progress_points: number;
  portfolio_points: number;
  activity_points: number;
  profile_points: number;
  points_available: number;
  skills_verified: number;
  skills_total: number;
  topics_done: number;
  topics_total: number;
  portfolio_pieces: number;
  active_days_30: number;
  about_complete: boolean;
  profile_public: boolean;
};

export const BAND_MESSAGES: Record<Band, string> = {
  getting_started: "You are laying the groundwork. Every topic and skill you finish moves you forward.",
  building: "You are building real skills for this track. Keep going.",
  job_ready: "You have the skills and the work to show for this track. Well done.",
};

export type PartLine = { key: PartKey; label: string; points: number; max: number; detail: string };

/** The parts that count for this track (a track with no skills or required topics skips them). */
export function readinessParts(row: ReadinessRow): PartLine[] {
  return PARTS.filter(({ key }) => counts(row, key)).map(({ key, label }) => ({
    key,
    label,
    points: Number(row[`${key}_points`]),
    max: WEIGHTS[key],
    detail: partDetail(row, key),
  }));
}

function counts(row: ReadinessRow, key: PartKey): boolean {
  if (key === "skills") return row.skills_total > 0;
  if (key === "progress") return row.topics_total > 0;
  return true;
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function partDetail(row: ReadinessRow, key: PartKey): string {
  switch (key) {
    case "skills":
      return `${row.skills_verified} of ${plural(row.skills_total, "skill")} verified`;
    case "progress":
      return `${row.topics_done} of ${plural(row.topics_total, "required topic")} done`;
    case "portfolio":
      return `${plural(Math.min(row.portfolio_pieces, WEIGHTS.portfolio_target), "piece")} of ${WEIGHTS.portfolio_target} approved`;
    case "activity":
      return `${plural(Math.min(row.active_days_30, WEIGHTS.activity_target_days), "day")} of ${WEIGHTS.activity_target_days} in the last 30`;
    case "profile":
      return [row.about_complete ? "About you done" : "About you to finish", row.profile_public ? "public profile on" : "public profile off"].join(", ");
  }
}

export type NextStep = { part: PartKey; title: string; href: string; cta: string; gain: number };

/**
 * The one or two steps that would raise this track's readiness most: each
 * part's missing points, as score points (scaled by the points the track can
 * award), biggest first. Each step names one concrete thing to do.
 */
export function nextSteps(row: ReadinessRow, limit = 2): NextStep[] {
  const available = row.points_available > 0 ? row.points_available : 100;
  return PARTS.filter(({ key }) => counts(row, key))
    .map(({ key }) => {
      const missing = WEIGHTS[key] - Number(row[`${key}_points`]);
      return { key, gain: Math.round((missing * 100) / available) };
    })
    .filter((p) => p.gain >= 1)
    .sort((a, b) => b.gain - a.gain)
    .slice(0, limit)
    .map(({ key, gain }) => ({ part: key, gain, ...stepFor(row, key) }));
}

function stepFor(row: ReadinessRow, key: PartKey): Omit<NextStep, "part" | "gain"> {
  switch (key) {
    case "skills": {
      const left = row.skills_total - row.skills_verified;
      return {
        title: `Verify ${left === 1 ? "the last skill" : `one of the ${left} skills`} for this track with a skill quiz or portfolio.`,
        href: "/skills",
        cta: "See skills",
      };
    }
    case "progress": {
      const left = row.topics_total - row.topics_done;
      return {
        title: `Finish ${left === 1 ? "the last required topic" : `the ${left} required topics left`} in this track.`,
        href: `/roadmaps/${row.roadmap_slug}`,
        cta: "Open the roadmap",
      };
    }
    case "portfolio": {
      const left = WEIGHTS.portfolio_target - Math.min(row.portfolio_pieces, WEIGHTS.portfolio_target);
      return {
        title: `Send ${left === 1 ? "one more piece" : `${left} pieces`} of work for review and get it approved.`,
        href: "/skills",
        cta: "Find a portfolio task",
      };
    }
    case "activity": {
      const left = WEIGHTS.activity_target_days - Math.min(row.active_days_30, WEIGHTS.activity_target_days);
      return {
        title: `Learn on ${plural(left, "more day")} this month. A 5 minute review counts.`,
        href: "/review",
        cta: "Start a review",
      };
    }
    case "profile":
      return row.about_complete
        ? { title: "Turn on your public profile and add a headline.", href: "/profile", cta: "Edit your profile" }
        : { title: "Finish About you: your goal, career stage and a track.", href: "/profile/about", cta: "Finish About you" };
  }
}

// Suggestions ------------------------------------------------------------------------------

export type SuggestionInput = {
  today: Day;
  usualHourBand: string | null;
  lastActiveOn: Day | null;
  topicsStarted: number;
  quizRetries90: number;
  streakDays: number;
  activeToday: boolean;
  weeklyGoal: number | null;
  reviewQuestions: number;
  reviewedToday: boolean;
  nextTopic: { title: string; href: string } | null;
};

export type Suggestion = { key: string; text: string; href: string; cta: string };

/**
 * Gentle suggestions from the same signals as the early warning (#325), as
 * help: no alarm, no comparison, at most `limit`, most useful first.
 */
export function suggestions(i: SuggestionInput, limit = 3): Suggestion[] {
  const out: Suggestion[] = [];
  const quietDays = i.lastActiveOn ? daysBetween(i.lastActiveOn, i.today) : null;

  if (i.topicsStarted === 0) {
    out.push({
      key: "first_topic",
      text: "Your first topic is the hardest one to start. Pick a roadmap and open its first topic; ten minutes is enough.",
      href: "/roadmaps",
      cta: "Browse roadmaps",
    });
  } else if (quietDays !== null && quietDays > 7 && i.nextTopic) {
    out.push({
      key: "welcome_back",
      text: `Welcome back. Pick up where you left off with ${i.nextTopic.title}; even a short session counts.`,
      href: i.nextTopic.href,
      cta: "Carry on",
    });
  }

  if (i.streakDays > 0 && !i.activeToday) {
    out.push({
      key: "keep_streak",
      text: `Pass a topic or finish a 5 minute review today to add to your ${i.streakDays} day streak.`,
      href: i.reviewQuestions > 0 ? "/review" : (i.nextTopic?.href ?? "/roadmaps"),
      cta: i.reviewQuestions > 0 ? "Start a review" : "Keep learning",
    });
  }

  const when = studyTimePhrase(i.usualHourBand);
  if (when) {
    out.push({
      key: "reminder",
      text: `You usually study ${when}. A reminder at that time can help you keep your rhythm.`,
      href: "/profile#settings",
      cta: "Set up reminders",
    });
  }

  if (i.quizRetries90 >= 3 && i.reviewQuestions > 0 && !i.reviewedToday) {
    out.push({
      key: "review_after_retries",
      text: "Some quizzes took a few tries, which is how learning works. A quick review helps the ideas stick.",
      href: "/review",
      cta: "Start a review",
    });
  }

  if (i.weeklyGoal === null && i.topicsStarted > 0) {
    out.push({
      key: "weekly_goal",
      text: "Set a small weekly goal. A number of topics you can keep to makes steady progress easier.",
      href: "/dashboard",
      cta: "Set a goal",
    });
  }

  return out.slice(0, limit);
}
