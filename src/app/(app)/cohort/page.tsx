import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { getCohortHome } from "@/lib/cohort/data";
import { CohortIntro, CohortRail, NoCohort, PlanSkeleton, SpecializationCard } from "@/components/cohort/home-bits";
import { CohortPeople } from "@/components/cohort/people";
import { CohortProgress } from "@/components/cohort/progress";
import { WeekAssignment, WeekHeader, WeekLessons, WeekObjectives } from "@/components/cohort/week-sections";
import { stateFor } from "@/components/cohort/week-plan";
import { CertificationChecklist, CertificationChecklistSkeleton } from "@/components/certificates/certification-checklist";

export const metadata: Metadata = { title: "Cohort" };

/** The week to work on now: theme, objectives, lessons and the assignment with its due date. */
async function ThisWeek() {
  const home = await getCohortHome();
  if (!home) return <NoCohort />;
  const n = home.focusWeek;
  const entry = home.path[n - 1];
  const heading =
    home.timing.phase === "running" ? "This week" : home.timing.phase === "upcoming" ? "Your first week" : "Your last week";

  return (
    <div className="flex flex-col gap-8">
      <CohortIntro home={home} />
      {home.membership.status !== "deferred" && (
        <section aria-labelledby="this-week-heading" className="flex flex-col gap-5 rounded-lg border border-line p-5 xl:p-6">
          <h2 id="this-week-heading" className="text-sm font-semibold tracking-wide text-content-3 uppercase">
            {heading}
          </h2>
          {entry?.week ? (
            <>
              <WeekHeader
                week={entry.week}
                weekNumber={n}
                total={home.path.length}
                state={stateFor(home, n)}
                headingLevel={2}
              />
              <WeekObjectives week={entry.week} />
              <WeekLessons week={entry.week} />
              <WeekAssignment
                week={entry.week}
                weekNumber={n}
                startsOn={home.cohort.startsOn}
                graceDays={home.program.graceDays}
              >
                <div className="flex flex-wrap gap-3">
                  <Link href={`/cohort/week/${n}#submit`} className={buttonClasses("primary")}>
                    Submit your work
                  </Link>
                  <Link href={`/cohort/week/${n}`} className={buttonClasses("secondary")}>
                    Open week {n}
                  </Link>
                </div>
              </WeekAssignment>
            </>
          ) : (
            <p className="text-content-2">
              Week {n} follows your specialization. Choose one below to see what it covers.
            </p>
          )}
        </section>
      )}
      <SpecializationCard home={home} />
      <CohortProgress home={home} />
      <Suspense fallback={<CertificationChecklistSkeleton />}>
        <CertificationChecklist programId={home.program.id} />
      </Suspense>
      {home.membership.status !== "deferred" && <CohortPeople roster={home.roster} />}
    </div>
  );
}

/**
 * The learner's cohort home. Main column: where the cohort is, this week's
 * work, the specialization choice, progress and the people. Rail (beside from
 * lg, below on phones): the twelve week plan. Both read the session, so each
 * is its own Suspense island; they share one cached load.
 */
export default function CohortPage() {
  return (
    <MainWithRail
      railLabel="Week plan"
      rail={
        <Suspense fallback={<PlanSkeleton />}>
          <CohortRail />
        </Suspense>
      }
    >
      <Suspense
        fallback={
          <div className="flex flex-col gap-6" aria-busy="true">
            <div className="h-10 w-64 animate-skeleton rounded-md bg-surface-sunken" />
            <div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />
          </div>
        }
      >
        <ThisWeek />
      </Suspense>
    </MainWithRail>
  );
}
