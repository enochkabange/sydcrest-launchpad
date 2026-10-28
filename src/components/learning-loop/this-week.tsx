import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { getLearningLoop } from "@/lib/learning-loop/server";
import { REVIEW_SIZE } from "@/lib/learning-loop/review-select";
import { GoalPicker } from "./goal-picker";
import { GoalRing } from "./goal-ring";

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/**
 * Home's learning loop card (issue #232): the weekly goal ring, the kind
 * streaks and the way into a 5 minute review. Request time (reads the
 * session), so the dashboard renders it inside <Suspense>.
 *
 * Phones stack goal, streak and review in that order. From lg the goal and
 * the streak sit side by side, divided by a rule, with the review as a band
 * across the bottom: its words on the left and its button on the right.
 */
export async function ThisWeek() {
  const user = await requireUser();
  const { daily, weekly, reviewedToday, reviewQuestions } = await getLearningLoop(user.id);
  const { target, done, met, weeksInARow } = weekly;

  return (
    <section
      aria-labelledby="this-week-heading"
      className="flex flex-col gap-5 rounded-lg border border-line p-5 xl:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="this-week-heading" className="text-subtitle text-content">
          This week
        </h2>
        <p className="text-sm text-content-3">Your goal resets every Monday</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-line">
        {/* Goal */}
        <div className="flex flex-col gap-3 lg:pr-6 xl:pr-8">
          {target === null ? (
            <>
              <h3 className="text-h3 text-content">Set a weekly goal</h3>
              <p className="text-sm text-content-2">
                How many topics do you want to pass each week? A topic counts when you pass its checkpoint quiz.
              </p>
              <GoalPicker current={null} />
            </>
          ) : (
            <>
              <h3 className="sr-only">Weekly goal</h3>
              <div className="flex items-center gap-4">
                <GoalRing done={done} target={target} />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-content">
                    {met ? "Goal met. Well done." : `${plural(target - done, "topic", "topics")} to go`}
                  </p>
                  <p className="text-sm text-content-2">
                    {met
                      ? "Anything more this week is a bonus."
                      : `Pass ${done ? "them" : plural(target, "topic", "topics")} with a checkpoint quiz by Sunday.`}
                  </p>
                </div>
              </div>
              <details className="group">
                <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-content-link hover:underline">
                  Change your goal
                </summary>
                <div className="pt-2">
                  <GoalPicker current={target} />
                </div>
              </details>
            </>
          )}
        </div>

        {/* Streak */}
        <div className="flex flex-col gap-2 border-t border-line pt-5 lg:border-t-0 lg:pt-0 lg:pl-6 xl:pl-8">
          <h3 className="text-h3 text-content">Learning streak</h3>
          <p className="text-subtitle font-semibold text-content">{plural(daily.days, "day", "days")}</p>
          <p className="text-sm text-content-2">
            {daily.days === 0
              ? "Pass a checkpoint quiz or finish a review to start one."
              : daily.activeToday
                ? "You learned today."
                : daily.restDaysLeft === 0
                  ? "No rest days left this week, so learn today to keep it going."
                  : "Learn today to add a day."}
          </p>
          {daily.days > 0 && (
            <p className="text-sm text-content-2">
              {plural(daily.restDaysLeft, "rest day", "rest days")} left this week. Up to two missed days a week never
              break your streak.
            </p>
          )}
          {target !== null && (
            <p className="text-sm text-content-2">
              {weeksInARow > 0
                ? `Weekly goal met ${plural(weeksInARow, "week", "weeks")} in a row.`
                : "Meet your goal this week to start a run of weeks."}
            </p>
          )}
        </div>

      </div>

      {/* Review */}
      <div className="flex flex-col items-start gap-3 border-t border-line pt-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex max-w-reading flex-col gap-1">
          <h3 className="text-h3 text-content">5 minute review</h3>
          <p className="text-sm text-content-2">
            {reviewQuestions > 0
              ? `${plural(Math.min(REVIEW_SIZE, reviewQuestions), "question", "questions")} from quizzes you have passed. Ones you missed come back sooner. It counts toward your streak and never changes your passed topics.`
              : "Once you pass a checkpoint quiz, its questions come back here for quick reviews, so what you learned sticks."}
          </p>
          {reviewedToday && <p className="text-sm text-content-2">You reviewed today. Another one is welcome.</p>}
        </div>
        {reviewQuestions > 0 ? (
          <Link href="/review" className={buttonClasses("primary", "shrink-0")}>
            Start a 5 minute review
          </Link>
        ) : (
          <Link href="/roadmaps" className={buttonClasses("secondary", "shrink-0")}>
            Find a topic to pass
          </Link>
        )}
      </div>
    </section>
  );
}

export function ThisWeekSkeleton() {
  return <div className="h-72 animate-skeleton rounded-lg bg-surface-sunken lg:h-56" aria-hidden="true" />;
}
