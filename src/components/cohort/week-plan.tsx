import Link from "@/components/ui/link";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import type { CohortHome } from "@/lib/cohort/data";
import { WEEK_STATE_LABEL, weekState, type WeekState } from "@/lib/cohort/schedule";

const TONE: Record<WeekState, string> = {
  passed: "bg-success-bg text-success-fg",
  graded: "bg-surface-sunken text-content-2",
  returned: "bg-warning-bg text-warning-fg",
  sent: "bg-info-bg text-info-fg",
  draft: "bg-surface-sunken text-content-2",
  upcoming: "bg-surface-sunken text-content-3",
  current: "bg-info-bg text-info-fg",
  due: "bg-warning-bg text-warning-fg",
  grace: "bg-warning-bg text-warning-fg",
  late: "bg-danger-bg text-danger-fg",
  choose: "bg-warning-bg text-warning-fg",
};

export function stateFor(home: CohortHome, weekNumber: number): WeekState {
  const entry = home.path[weekNumber - 1];
  return weekState({
    week: weekNumber,
    hasWeek: !!entry?.week,
    submission: entry?.week ? home.submissions.get(entry.week.id) : undefined,
    startsOn: home.cohort.startsOn,
    graceDays: home.program.graceDays,
    passScore: home.program.passScore,
    today: home.today,
  });
}

export function StateBadge({ state }: { state: WeekState }) {
  return (
    <span className={`inline-flex shrink-0 items-center self-start rounded-full px-2 py-0.5 text-xs font-semibold ${TONE[state]}`}>
      {WEEK_STATE_LABEL[state]}
    </span>
  );
}

/**
 * The twelve week plan: one link per week with its theme and status. Sits in
 * the rail beside the main column from lg and below it on phones. `selected`
 * marks the week being viewed (aria-current).
 */
export function WeekPlan({ home, selected }: { home: CohortHome; selected?: number }) {
  const current = home.timing.phase === "running" ? home.timing.week : null;
  return (
    <nav aria-label="Week plan" className="flex flex-col gap-3 rounded-lg border border-line p-4 xl:p-5">
      <h2 className="text-h3 text-content">The {home.path.length} week plan</h2>
      <ol className="flex flex-col">
        {home.path.map(({ week_number, week, forks }) => {
          const state = stateFor(home, week_number);
          const isSelected = selected === week_number;
          const label = week
            ? displayTheme(week.theme)
            : forks
              ? "Your specialization week"
              : "Week details coming";
          return (
            <li key={week_number}>
              <Link
                href={`/cohort/week/${week_number}`}
                aria-current={isSelected ? "page" : undefined}
                className={`flex min-h-11 items-start gap-3 rounded-md px-2 py-2 no-underline transition-colors hover:bg-surface-sunken ${
                  isSelected ? "bg-surface-sunken" : ""
                }`}
              >
                <span
                  className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    week_number === current ? "bg-action text-action-fg" : "bg-surface-sunken text-content-2 ring-1 ring-line"
                  }`}
                >
                  <span className="sr-only">Week </span>
                  {week_number}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className={`text-sm ${isSelected ? "font-semibold text-content" : "text-content"}`}>{label}</span>
                  <StateBadge state={state} />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
