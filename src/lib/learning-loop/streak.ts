import { addDays, weekStart, type Day } from "./dates";

/**
 * The learner's private streaks (issue #232). Kinder than the leaderboard
 * streak, which stays strict and public: these show only on the learner's
 * own home screen.
 *
 * Daily streak. An active day is an Africa/Accra day with a topic passed
 * with its checkpoint quiz or a finished 5 minute review. Each Monday to
 * Sunday week allows up to REST_DAYS_PER_WEEK missed days without breaking
 * the streak. Walking back from today:
 * - an active day adds one to the streak;
 * - today, if not active yet, is skipped (the day is not over);
 * - a missed day uses one of its week's rest days;
 * - a missed day when its week has no rest days left ends the streak.
 * Rest days are not counted in the length, so the number is honest: it is
 * the number of days the learner actually learned.
 */
export const REST_DAYS_PER_WEEK = 2;

export type DailyStreak = {
  /** Active days in the current streak. */
  days: number;
  /** Rest days still free in the current week, before today. */
  restDaysLeft: number;
  activeToday: boolean;
};

export function dailyStreak(activeDays: Iterable<Day>, today: Day): DailyStreak {
  const active = new Set(activeDays);
  const restsUsed = new Map<Day, number>();
  const activeToday = active.has(today);
  let days = 0;

  // The furthest a streak can reach back is bounded by the earliest activity.
  const earliest = [...active].sort()[0];
  if (earliest) {
    for (let day = today; day >= earliest; day = addDays(day, -1)) {
      if (active.has(day)) {
        days += 1;
        continue;
      }
      if (day === today) continue;
      const week = weekStart(day);
      const used = restsUsed.get(week) ?? 0;
      if (used >= REST_DAYS_PER_WEEK) break;
      restsUsed.set(week, used + 1);
    }
  }

  // Rest days already missed this week. Days before the learner's first
  // activity are not missed days: a new learner starts with both rest days.
  const thisWeek = weekStart(today);
  let missedThisWeek = 0;
  if (earliest) {
    for (let day = earliest > thisWeek ? earliest : thisWeek; day < today; day = addDays(day, 1)) {
      if (!active.has(day)) missedThisWeek += 1;
    }
  }

  return { days, restDaysLeft: Math.max(0, REST_DAYS_PER_WEEK - missedThisWeek), activeToday };
}

export type GoalWeek = { weekStart: Day; target: number };

/** The goal in force for a week: its own, else the latest earlier one. Null before the first goal. */
export function goalFor(goals: GoalWeek[], week: Day): number | null {
  let found: GoalWeek | null = null;
  for (const g of goals) {
    if (g.weekStart <= week && (!found || g.weekStart > found.weekStart)) found = g;
  }
  return found?.target ?? null;
}

export type WeeklyProgress = {
  /** Goal for this week, or null when the learner has not set one. */
  target: number | null;
  /** Topics passed with a checkpoint quiz this week. */
  done: number;
  met: boolean;
  /** Weeks in a row the goal was met, counting this week once it is met. */
  weeksInARow: number;
};

/**
 * This week's goal progress and the weekly streak. `passedDays` has one entry
 * per topic passed with its quiz (the Accra day of verified_at). This week
 * counts once the goal is met; until then it is still in play and does not
 * break the run of earlier weeks.
 */
export function weeklyProgress(goals: GoalWeek[], passedDays: Day[], today: Day): WeeklyProgress {
  const perWeek = new Map<Day, number>();
  for (const d of passedDays) {
    const w = weekStart(d);
    perWeek.set(w, (perWeek.get(w) ?? 0) + 1);
  }
  const thisWeek = weekStart(today);
  const target = goalFor(goals, thisWeek);
  const done = perWeek.get(thisWeek) ?? 0;
  const met = target !== null && done >= target;

  let weeksInARow = met ? 1 : 0;
  for (let week = addDays(thisWeek, -7); ; week = addDays(week, -7)) {
    const goal = goalFor(goals, week);
    if (goal === null || (perWeek.get(week) ?? 0) < goal) break;
    weeksInARow += 1;
  }
  return { target, done, met, weeksInARow };
}
