import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { getCohortHome } from "@/lib/cohort/data";
import { CohortRail, NoCohort, PlanSkeleton, SpecializationCard } from "@/components/cohort/home-bits";
import { stateFor } from "@/components/cohort/week-plan";
import {
  SubmissionSlot,
  WeekAssignment,
  WeekHeader,
  WeekLessons,
  WeekObjectives,
  WeekResource,
} from "@/components/cohort/week-sections";

export const metadata: Metadata = { title: "Cohort week" };

// The app shell's nav reads usePathname() outside a Suspense boundary, which
// a dynamic segment cannot prerender (same as /learn/[slug]/[node]).
export const instant = false;

/** "7" to 7; anything that is not a whole week number is a 404. */
function weekParam(raw: string): number | null {
  return /^[1-9][0-9]?$/.test(raw) ? Number(raw) : null;
}

async function Week({ params }: { params: Promise<{ n: string }> }) {
  const n = weekParam((await params).n);
  if (!n) notFound();
  const home = await getCohortHome();
  if (!home) return <NoCohort />;
  if (n > home.path.length) notFound();
  const entry = home.path[n - 1];

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/cohort"
        className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-content-link hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        {home.cohort.name}
      </Link>
      {entry.week ? (
        <>
          <WeekHeader week={entry.week} weekNumber={n} total={home.path.length} state={stateFor(home, n)} />
          <WeekObjectives week={entry.week} />
          <WeekLessons week={entry.week} />
          <WeekResource week={entry.week} />
          <WeekAssignment
            week={entry.week}
            weekNumber={n}
            startsOn={home.cohort.startsOn}
            graceDays={home.program.graceDays}
          >
            <SubmissionSlot submission={home.submissions.get(entry.week.id)} passScore={home.program.passScore} />
          </WeekAssignment>
        </>
      ) : (
        <>
          <header className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-content-3">
              Week {n} of {home.path.length}
            </p>
            <h1 className="text-title text-content">Your specialization week</h1>
            <p className="max-w-reading text-lead text-content-2">
              Week {n} follows the specialization you choose. Pick one to see its lessons and assignment.
            </p>
          </header>
          <SpecializationCard home={home} />
        </>
      )}
    </div>
  );
}

async function Rail({ params }: { params: Promise<{ n: string }> }) {
  const n = weekParam((await params).n) ?? undefined;
  return <CohortRail selected={n} />;
}

/**
 * One programme week: objectives, lessons, resource and the assignment with
 * its submission slot (`#submit`). The twelve week plan sits in the rail.
 */
export default function CohortWeekPage({ params }: PageProps<"/cohort/week/[n]">) {
  return (
    <MainWithRail
      railLabel="Week plan"
      rail={
        <Suspense fallback={<PlanSkeleton />}>
          <Rail params={params} />
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
        <Week params={params} />
      </Suspense>
    </MainWithRail>
  );
}
