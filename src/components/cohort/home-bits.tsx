import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { getCohortHome, type CohortHome } from "@/lib/cohort/data";
import { dayNumber, formatDay, weekStarts } from "@/lib/cohort/schedule";
import { SpecializationChooser } from "./specialization-chooser";
import { WeekPlan } from "./week-plan";

/** The cohort name, the programme and where the cohort is in its twelve weeks, plus any deferral note. */
export function CohortIntro({ home }: { home: CohortHome }) {
  const { timing, cohort, program, membership } = home;
  const where =
    membership.status === "deferred"
      ? "Your progress is kept while you wait for a place"
      : timing.phase === "running"
      ? `Week ${timing.week} of ${program.durationWeeks}`
      : timing.phase === "upcoming"
        ? `Starts ${formatDay(cohort.startsOn)}, in ${timing.daysToStart} ${timing.daysToStart === 1 ? "day" : "days"}`
        : `Finished its ${program.durationWeeks} weeks`;
  const spec = program.specializations.find((s) => s.slug === membership.specialization);

  return (
    <header className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-content-3">{program.title}</p>
      <h1 className="text-title text-content">{cohort.name}</h1>
      <p className="text-lead text-content-2">
        {where}
        {spec ? ` · ${spec.label}` : ""}
      </p>
      {home.movedFrom && (
        <Alert tone="info">
          You moved here from {home.movedFrom.name}. Everything you sent there still counts toward your certificate.
        </Alert>
      )}
      {membership.status === "completed" && (
        <Alert tone="success">You completed this programme. Your work stays here for you to look back on.</Alert>
      )}
      {membership.status === "deferred" && <DeferredNotice home={home} />}
    </header>
  );
}

/** A deferred learner waiting for a place: their progress is kept and the next cohort is shown when there is one. */
function DeferredNotice({ home }: { home: CohortHome }) {
  return (
    <section
      aria-labelledby="deferred-heading"
      className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6"
    >
      <h2 id="deferred-heading" className="text-h3 text-content">
        Your place moves to a later cohort
      </h2>
      <p className="max-w-reading text-content-2">
        Your mentor has moved your place to a later cohort. Every lesson you finished and all the work you sent are
        kept, and you pick up from where you stopped.
      </p>
      {home.nextCohort ? (
        <p className="text-content">
          <span className="font-semibold">Next cohort: {home.nextCohort.name}</span>, starting{" "}
          {formatDay(home.nextCohort.startsOn)}. Your mentor confirms your seat in it.
        </p>
      ) : (
        <p className="text-content">
          The next cohort has not been scheduled yet. You will see it here as soon as it is, and your mentor confirms
          your seat.
        </p>
      )}
    </section>
  );
}

/** Weeks 7 to 9 follow one specialization: shown while the choice still matters. */
export function SpecializationCard({ home }: { home: CohortHome }) {
  const { program, membership } = home;
  if (!program.specializations.length || membership.status !== "active") return null;

  const forkNumbers = [...new Set(home.forkWeeks.map((w) => w.week_number))].sort((a, b) => a - b);
  const lastFork = forkNumbers.at(-1);
  // Once the specialization weeks are over, the choice is history; the plan shows it.
  if (lastFork && membership.specialization && dayNumber(home.today) >= dayNumber(weekStarts(home.cohort.startsOn, lastFork + 1))) {
    return null;
  }

  const options = program.specializations.map((s) => ({
    slug: s.slug,
    label: s.label,
    weeks: home.forkWeeks
      .filter((w) => w.specialization === s.slug)
      .sort((a, b) => a.week_number - b.week_number)
      .map((w) => ({ week_number: w.week_number, theme: displayTheme(w.theme) })),
  }));

  return (
    <SpecializationChooser
      memberId={membership.id}
      current={membership.specialization}
      options={options}
      locked={home.specializationLocked}
      canChoose
      weeksLabel={
        forkNumbers.length > 1 ? `Weeks ${forkNumbers[0]} to ${lastFork}` : `Week ${forkNumbers[0] ?? ""}`.trim()
      }
    />
  );
}

/** No cohort yet: an honest empty state with the one next step. */
export function NoCohort() {
  return (
    <section className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface-sunken p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:p-8">
      <div className="flex max-w-reading flex-col gap-3">
        <h1 className="text-title text-content">Your cohort</h1>
        <p className="text-lead text-content-2">
          You are not in a cohort yet. When you join one, this is where you will find each week&apos;s lessons, your
          assignment and due date, your mentor and the people learning with you.
        </p>
      </div>
      <Link href="/programme" className={buttonClasses("primary", "shrink-0")}>
        See the programme
      </Link>
    </section>
  );
}

export function PlanSkeleton() {
  return <div className="h-[36rem] animate-skeleton rounded-lg bg-surface-sunken" aria-hidden="true" />;
}

/** The rail: the twelve week plan, or what a cohort covers for someone not in one. */
export async function CohortRail({ selected }: { selected?: number }) {
  const home = await getCohortHome();
  if (!home) {
    return (
      <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
        <h2 className="text-h3 text-content">How a cohort works</h2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-content-2">
          <li>Twelve weeks with a mentor and a small group.</li>
          <li>Each week has lessons on the site and one assignment.</li>
          <li>Weeks 7 to 9 follow the specialization you choose.</li>
        </ul>
      </section>
    );
  }
  return <WeekPlan home={home} selected={selected} />;
}
