import type { ReactNode } from "react";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import Link from "@/components/ui/link";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import type { CohortWeek } from "@/lib/cohort/data";
import { dueDate, formatDay, lateAfter, type WeekState } from "@/lib/cohort/schedule";
import { StateBadge } from "./week-plan";

/**
 * The sections of one programme week, exported separately so other screens
 * compose them: /cohort shows this week with them, /cohort/week/[n] shows the
 * whole week, and the submission form (#145, WeekSubmission) goes in
 * `WeekAssignment`'s children, under the `#submit` anchor.
 */

export function WeekHeader({
  week,
  weekNumber,
  total,
  state,
  headingLevel = 1,
}: {
  week: CohortWeek;
  weekNumber: number;
  total: number;
  state: WeekState;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <header className="flex flex-col gap-2">
      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-content-3">
        <span>
          Week {weekNumber} of {total}
          {week.is_capstone ? " · Capstone" : ""}
        </span>
        <StateBadge state={state} />
      </p>
      <Heading className={headingLevel === 1 ? "text-title text-content" : "text-subtitle text-content"}>
        {displayTheme(week.theme)}
      </Heading>
    </header>
  );
}

function Block({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  const headingId = `${id ?? title.toLowerCase().replace(/[^a-z]+/g, "-")}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="flex scroll-mt-8 flex-col gap-3">
      <h3 id={headingId} className="text-h3 text-content">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function WeekObjectives({ week }: { week: CohortWeek }) {
  if (!week.objectives.length) return null;
  return (
    <Block title="By the end of the week you can">
      <ul className="flex max-w-reading list-disc flex-col gap-1.5 pl-5 text-content-2">
        {week.objectives.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
    </Block>
  );
}

export function WeekLessons({ week }: { week: CohortWeek }) {
  const done = week.lessons.filter((l) => l.done).length;
  return (
    <Block title="Lessons">
      {week.lessons.length > 0 ? (
        <>
          <p className="text-sm text-content-3">
            {done} of {week.lessons.length} done
          </p>
          <ul className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
            {week.lessons.map((l) => (
              <li key={`${l.roadmapSlug}/${l.nodeSlug}`}>
                <Link
                  href={`/learn/${l.roadmapSlug}/${l.nodeSlug}`}
                  className="flex min-h-11 h-full items-center gap-3 rounded-md border border-line px-3 py-2 no-underline transition-colors hover:border-line-strong hover:bg-surface-sunken"
                >
                  {l.done ? (
                    <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-success-fg" />
                  ) : (
                    <Circle aria-hidden="true" className="size-5 shrink-0 text-content-3" />
                  )}
                  <span className="text-sm font-semibold text-content">{l.title}</span>
                  <span className="sr-only">{l.done ? "(done)" : "(not done yet)"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {week.unpublishedLessons > 0 && (
        <p className="rounded-md border border-line bg-surface-sunken p-3 text-sm text-content-2">
          {week.lessons.length > 0
            ? `${week.unpublishedLessons} more ${week.unpublishedLessons === 1 ? "lesson is" : "lessons are"} being published on the site.`
            : "The lessons for this week are being published on the site. They will show here as they go live."}
        </p>
      )}
      {week.lessons.length === 0 && week.unpublishedLessons === 0 && (
        <p className="text-sm text-content-2">This week is about the assignment and the free resource.</p>
      )}
    </Block>
  );
}

export function WeekResource({ week }: { week: CohortWeek }) {
  if (!week.resource_name || !week.resource_url) return null;
  return (
    <Block title="Free resource">
      <a
        href={week.resource_url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold"
      >
        {week.resource_name}
        <ExternalLink aria-hidden="true" className="size-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </Block>
  );
}

/** When work is due and when it turns late, from the cohort start and the grace days. */
export function DueLine({ startsOn, weekNumber, graceDays }: { startsOn: string; weekNumber: number; graceDays: number }) {
  return (
    <p className="text-sm text-content-2">
      <span className="font-semibold text-content">Due {formatDay(dueDate(startsOn, weekNumber))}.</span>{" "}
      {graceDays > 0
        ? `Work sent by ${formatDay(lateAfter(startsOn, weekNumber, graceDays))} still counts; after that it is late.`
        : "Work sent after that is late."}
    </p>
  );
}

/**
 * The assignment, its due date and, as `children`, the form for sending
 * work. This section is the `#submit` anchor.
 */
export function WeekAssignment({
  week,
  weekNumber,
  startsOn,
  graceDays,
  children,
}: {
  week: CohortWeek;
  weekNumber: number;
  startsOn: string;
  graceDays: number;
  children?: ReactNode;
}) {
  return (
    <section
      id="submit"
      aria-labelledby="assignment-heading"
      className="flex scroll-mt-8 flex-col gap-3 rounded-lg border border-line p-5 xl:p-6"
    >
      <h3 id="assignment-heading" className="text-h3 text-content">
        {week.is_capstone ? "Capstone assignment" : "Assignment"}
      </h3>
      <p className="max-w-reading text-content">{week.assignment}</p>
      <DueLine startsOn={startsOn} weekNumber={weekNumber} graceDays={graceDays} />
      {children}
    </section>
  );
}
