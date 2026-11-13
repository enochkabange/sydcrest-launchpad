import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { requireUser } from "@/lib/auth";
import { trackNow } from "@/lib/analytics/track";
import { getLearningLoop } from "@/lib/learning-loop/server";
import { REST_DAYS_PER_WEEK } from "@/lib/learning-loop/streak";
import { bandFor, bandLabel, type Band } from "@/lib/readiness/score";
import {
  BAND_MESSAGES,
  PACE_WEEKS,
  TREND_MIN,
  activeDaysIn,
  finishEstimate,
  nextSteps,
  quizTrend,
  readinessParts,
  studyTimePhrase,
  suggestions,
  topicsPerWeek,
} from "@/lib/progress/insights";
import { readinessForLearners } from "@/lib/progress/flags";
import { getMyProgress, getMyReadiness, type MyReadiness } from "@/lib/progress/server";

export const metadata: Metadata = { title: "My progress" };

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const skeleton = (h: string) => <div className={`${h} animate-skeleton rounded-lg bg-surface-sunken`} aria-hidden="true" />;

/**
 * My progress (issue #337): what SydCrest knows about the learner's own
 * progress and what to do next. The header and the rail's explanation are
 * static; every section that reads the session is its own Suspense island.
 * Phones read rhythm, readiness, then suggestions and the note. From lg the
 * suggestions and the note sit in a rail beside the main column.
 */
export default function ProgressPage() {
  return (
    <MainWithRail
      railLabel="Suggestions and about this page"
      sticky
      rail={
        <>
          <Suspense fallback={skeleton("h-40")}>
            <Suggestions />
          </Suspense>
          <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
            <h2 className="text-h3 text-content">About this page</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-content-2">
              <li>Only you and SydCrest staff can see it. Employers cannot.</li>
              <li>It is worked out from your own learning, never from where you live, your device or your connection.</li>
              <li>It shows how you are getting on at SydCrest. It is not a test of you.</li>
            </ul>
            <Link href="/privacy#my-progress" className="text-sm font-semibold text-content-link hover:underline">
              How we use your data
            </Link>
          </section>
        </>
      }
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">My progress</h1>
        <p className="max-w-reading text-lead text-content-2">
          How you have been learning, how your current roadmap is going, and ideas for what to do next.
        </p>
      </div>
      <Suspense fallback={skeleton("h-64")}>
        <Rhythm />
      </Suspense>
      <Suspense fallback={null}>
        <Readiness />
      </Suspense>
    </MainWithRail>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-surface-sunken p-4">
      <dt className="text-sm text-content-2">{label}</dt>
      <dd className="text-subtitle font-semibold text-content">{value}</dd>
      {hint && <dd className="text-sm text-content-3">{hint}</dd>}
    </div>
  );
}

async function Rhythm() {
  const user = await requireUser();
  const [mine, loop] = await Promise.all([getMyProgress(user.id), getLearningLoop(user.id)]);
  await trackNow("progress_viewed");

  const days30 = activeDaysIn(mine.learningDays, mine.today);
  const when = studyTimePhrase(mine.attributes?.usual_hour_band);
  const pace = topicsPerWeek(mine.doneDays, mine.today);
  const trend = quizTrend(mine.quizScores);
  const current = mine.current;
  const remaining = current ? current.total - current.done : 0;
  const estimate = finishEstimate(remaining, pace);

  return (
    <section aria-labelledby="rhythm-heading" className="flex flex-col gap-5 rounded-lg border border-line p-5 xl:p-6">
      <h2 id="rhythm-heading" className="text-subtitle text-content">
        Your study rhythm
      </h2>
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:gap-4">
        <Stat
          label="Learning streak"
          value={plural(loop.daily.days, "day")}
          hint={loop.daily.activeToday ? "Today already counts" : `Up to ${REST_DAYS_PER_WEEK} missed days a week never break it`}
        />
        <Stat label="Days you learned" value={plural(days30, "day")} hint="In the last 30 days" />
        <Stat label="Usual study time" value={when ? capitalise(when) : "Not known yet"} />
        <Stat label="Topics done" value={String(mine.topicsDone)} />
        <Stat label="Quizzes passed" value={String(mine.quizzesPassed)} />
        <Stat label="Pace" value={`${pace} a week`} hint={`Topics done, last ${PACE_WEEKS} weeks`} />
      </dl>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-line">
        <div className="flex flex-col gap-2 lg:pr-6 xl:pr-8">
          <h3 className="text-h3 text-content">Quiz scores</h3>
          {mine.quizScores.length ? (
            <>
              <ol aria-label="Checkpoint quiz scores, oldest first" className="flex h-16 items-end gap-1">
                {mine.quizScores.slice(-12).map((s, i) => (
                  <li
                    key={i}
                    className="w-3 rounded-t-sm"
                    style={{ height: `${Math.max(8, s)}%`, background: "var(--progress-active)" }}
                  >
                    <span className="sr-only">{s} out of 100</span>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-content-2">
                {trend === null
                  ? `After ${TREND_MIN} passed quizzes we can show how your scores are moving.`
                  : trend.direction === "up"
                    ? `Your recent scores are rising: about ${trend.recent} now, up from ${trend.earlier}. Nice work.`
                    : trend.direction === "down"
                      ? `Your recent scores are a little lower, about ${trend.recent}. A 5 minute review can help the ideas stick.`
                      : `Your scores are steady at about ${trend.recent}.`}
              </p>
            </>
          ) : (
            <p className="text-sm text-content-2">Pass a checkpoint quiz on any topic and your scores will show here.</p>
          )}
        </div>
        <div className="flex flex-col gap-2 border-t border-line pt-5 lg:border-t-0 lg:pt-0 lg:pl-6 xl:pl-8">
          <h3 className="text-h3 text-content">Time to finish</h3>
          {!current ? (
            <p className="text-sm text-content-2">Start a roadmap and we will show how long it could take at your pace.</p>
          ) : current.complete ? (
            <p className="text-sm text-content-2">You finished every required topic in {current.title}. Well done.</p>
          ) : (
            <>
              <p className="text-sm text-content-2">
                {current.title}: {current.done} of {plural(current.total, "required topic")} done.
              </p>
              <p className="font-semibold text-content" data-testid="finish-estimate">
                {estimate
                  ? `At your pace, ${estimate.label} to finish.`
                  : "Finish a topic this week and we can estimate how long the rest will take."}
              </p>
              {current.next && (
                <Link href={current.next.href} className="text-sm font-semibold text-content-link hover:underline">
                  Next: {current.next.title}
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Off until READINESS_FOR_LEARNERS=on (founder approval and a fairness review first). */
async function Readiness() {
  const user = await requireUser();
  if (!readinessForLearners()) return null;
  const tracks = await getMyReadiness(user.id);

  return (
    <section aria-labelledby="readiness-heading" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 id="readiness-heading" className="text-subtitle text-content">
          Your readiness
        </h2>
        <p className="max-w-reading text-content-2">
          For each track you are working on or chose in About you: where you are, what counts, and the steps that would help
          most. It is updated once a day.
        </p>
      </div>
      {tracks.length ? (
        <ul className="flex flex-col gap-4">
          {tracks.map((t) => (
            <TrackReadiness key={t.roadmap_slug} track={t} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="max-w-reading text-content-2">
            Your readiness shows here the day after you start a topic or choose a track in About you.
          </p>
          <Link href="/roadmaps" className={buttonClasses("primary", "shrink-0")}>
            Browse roadmaps
          </Link>
        </div>
      )}
    </section>
  );
}

function TrackReadiness({ track }: { track: MyReadiness }) {
  const band = (["getting_started", "building", "job_ready"].includes(track.band) ? track.band : bandFor(track.score)) as Band;
  const parts = readinessParts(track);
  const steps = nextSteps(track);

  return (
    <li data-testid="readiness-track" className="flex flex-col gap-5 rounded-lg border border-line p-5 xl:p-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-h3 text-content">{track.title}</h3>
        <p className="text-lead font-semibold text-content" data-testid="readiness-band">
          {bandLabel(band)}
        </p>
        <p className="text-sm text-content-2">{BAND_MESSAGES[band]}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-content">What counts</h4>
          <ul className="flex flex-col gap-3">
            {parts.map((p) => (
              <li key={p.key} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-content">{p.label}</span>
                  <span className="shrink-0 text-content-2">
                    {p.points} of {p.max} points
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={p.label}
                  aria-valuemin={0}
                  aria-valuemax={p.max}
                  aria-valuenow={p.points}
                  className="h-2 overflow-hidden rounded-full"
                  style={{ background: "var(--progress-track)" }}
                >
                  <div
                    className="h-full origin-left rounded-full"
                    style={{
                      background: p.points >= p.max ? "var(--progress-complete)" : "var(--progress-active)",
                      transform: `scaleX(${p.max ? Math.min(1, p.points / p.max) : 0})`,
                    }}
                  />
                </div>
                <span className="text-sm text-content-3">{p.detail}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-content-3">
            Together these make {track.score} of 100
            {track.points_available < 100 ? `, counted out of the ${track.points_available} points this track can give for now` : ""}.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-content">Your next steps</h4>
          {steps.length ? (
            <ol className="flex flex-col gap-3">
              {steps.map((s) => (
                <li key={s.part} data-testid="readiness-step" className="flex flex-col gap-2 rounded-lg bg-surface-sunken p-4">
                  <p className="text-content">{s.title}</p>
                  <p className="text-sm text-content-3">Could add up to {plural(s.gain, "point")}.</p>
                  <Link href={s.href} className="text-sm font-semibold text-content-link hover:underline">
                    {s.cta}
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-content-2">You have full marks on every part of this track. Well done.</p>
          )}
        </div>
      </div>
    </li>
  );
}

async function Suggestions() {
  const user = await requireUser();
  const [mine, loop] = await Promise.all([getMyProgress(user.id), getLearningLoop(user.id)]);
  const list = suggestions({
    today: mine.today,
    usualHourBand: mine.attributes?.usual_hour_band ?? null,
    lastActiveOn: mine.attributes?.last_active_on ?? null,
    topicsStarted: Math.max(mine.attributes?.topics_started ?? 0, mine.current ? 1 : 0),
    quizRetries90: mine.attributes?.quiz_retries_90 ?? 0,
    streakDays: loop.daily.days,
    activeToday: loop.daily.activeToday,
    weeklyGoal: loop.weekly.target,
    reviewQuestions: loop.reviewQuestions,
    reviewedToday: loop.reviewedToday,
    nextTopic: mine.current?.next ?? null,
  });

  return (
    <section aria-labelledby="suggestions-heading" className="flex flex-col gap-3 rounded-lg border border-line p-5">
      <h2 id="suggestions-heading" className="text-h3 text-content">
        Ideas for you
      </h2>
      {list.length ? (
        <ul className="flex flex-col gap-4">
          {list.map((s) => (
            <li key={s.key} className="flex flex-col gap-1">
              <p className="text-sm text-content-2">{s.text}</p>
              <Link href={s.href} className="text-sm font-semibold text-content-link hover:underline">
                {s.cta}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-content-2">You are in a good rhythm. Keep going.</p>
      )}
    </section>
  );
}
