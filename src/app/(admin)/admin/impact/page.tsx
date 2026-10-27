import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, SectionGrid, type Column } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { formatDay } from "@/lib/outcomes/labels";
import {
  cohortPhase,
  formatRate,
  NORTH_STAR_MONTHS,
  parseMonths,
  PHASE_LABELS,
  totalCohorts,
  WINDOW_MONTHS,
  type CohortOutcomeRow,
} from "@/lib/outcomes/stats";
import { todayIso } from "@/lib/outcomes/validation";

export const metadata: Metadata = { title: "North Star", robots: { index: false } };

function Tile({ value, label, detail }: { value: string; label: string; detail?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <span className="text-3xl font-bold text-content tabular-nums">{value}</span>
      <span className="text-sm font-semibold text-content">{label}</span>
      {detail && <span className="text-sm text-content-2">{detail}</span>}
    </div>
  );
}

function definitions(months: number) {
  return [
    ["Learners", "People with a learner place in the cohort, whatever their status now."],
    ["Completed", "Learners whose cohort place is marked completed."],
    ["Certified", "Live certificates issued for the cohort (revoked ones are left out)."],
    [
      "Placed",
      `Learners in the cohort with at least one verified outcome (job, internship, freelance contract, scholarship or grant) that started between the cohort start and ${months} months after the cohort ended. Counted once per person, whether or not they completed.`,
    ],
    ["Completion rate", "Completed divided by learners."],
    ["Placement rate", "Placed divided by learners."],
    [
      "Cohort end",
      "The cohort start plus seven days for each week of its programme, the due date of the last week.",
    ],
    [
      "Status",
      `Running until the cohort ends; Counting outcomes until ${months} months after; Final once that window has closed.`,
    ],
  ] as const;
}

async function NorthStar({ searchParams }: Pick<PageProps<"/admin/impact">, "searchParams">) {
  const { supabase } = await requireAdmin();
  const months = parseMonths((await searchParams).months);
  const { data, error } = await supabase.rpc("admin_cohort_outcomes", { p_months: months });
  if (error) throw new Error(`Could not load cohort outcomes: ${error.message}`);
  const rows = (data ?? []) as CohortOutcomeRow[];
  const today = todayIso();
  const total = totalCohorts(rows);
  const final = totalCohorts(rows.filter((r) => cohortPhase(r, today) === "window_closed"));

  const columns: Column<CohortOutcomeRow>[] = [
    {
      header: "Cohort",
      cell: (r) => (
        <span className="flex flex-col">
          <span className="font-semibold text-content">{r.cohort_name}</span>
          <span className="text-sm text-content-3">{r.program_title}</span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Status", cell: (r) => PHASE_LABELS[cohortPhase(r, today)], phone: "hide", className: "text-sm text-content-2" },
    {
      header: "Dates",
      cell: (r) => (
        <span className="text-sm text-content-2">
          {formatDay(r.starts_on)} to {formatDay(r.ends_on)}
          <span className="block text-content-3">Window to {formatDay(r.window_ends_on)}</span>
        </span>
      ),
      phone: "hide",
    },
    { header: "Learners", cell: (r) => r.learners, align: "end", phone: "hide" },
    { header: "Completed", cell: (r) => `${r.completed} (${formatRate(r.completed, r.learners)})`, align: "end", phone: "hide" },
    { header: "Certified", cell: (r) => r.certified, align: "end", phone: "hide" },
    { header: "Placed", cell: (r) => `${r.placed} (${formatRate(r.placed, r.learners)})`, align: "end", phone: "hide" },
    {
      header: "Summary",
      cell: (r) => (
        <span className="text-sm text-content-2 tabular-nums">
          {r.placed} of {r.learners} placed
        </span>
      ),
      phone: "only",
      align: "end",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <nav aria-label="Outcome window" className="flex flex-wrap items-center gap-1">
        <span className="mr-2 text-sm text-content-2">Window after cohort end:</span>
        {WINDOW_MONTHS.map((m) => (
          <Link
            key={m}
            href={m === NORTH_STAR_MONTHS ? "/admin/impact" : `/admin/impact?months=${m}`}
            aria-current={m === months ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              m === months ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            {m} months{m === NORTH_STAR_MONTHS ? " (North Star)" : ""}
          </Link>
        ))}
      </nav>

      {rows.length === 0 ? (
        <section className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
          <h2 className="text-h3 text-content">No cohorts yet</h2>
          <p className="max-w-reading text-content-2">
            Numbers appear here once the first cohort exists. Placements count once learners report outcomes and you verify them
            in <Link href="/admin/outcomes" className="text-content-link underline">Outcomes</Link>.
          </p>
        </section>
      ) : (
        <>
          <section aria-labelledby="totals-heading" className="flex flex-col gap-3">
            <h2 id="totals-heading" className="text-subtitle text-content">
              All cohorts
            </h2>
            <SectionGrid cols={4}>
              <Tile value={String(total.learners)} label="Learners" detail={`${rows.length} ${rows.length === 1 ? "cohort" : "cohorts"}`} />
              <Tile value={String(total.completed)} label="Completed" detail={`${formatRate(total.completed, total.learners)} of learners`} />
              <Tile value={String(total.certified)} label="Certified" />
              <Tile
                value={String(total.placed)}
                label={`Placed within ${months} months`}
                detail={`${formatRate(total.placed, total.learners)} of learners`}
              />
            </SectionGrid>
            <p className="max-w-reading text-sm text-content-2">
              {final.learners > 0
                ? `Final cohorts only (window closed): ${final.placed} of ${final.learners} learners placed, ${formatRate(final.placed, final.learners)}.`
                : "No cohort has finished its outcome window yet, so every placement number above can still grow."}
            </p>
          </section>

          <section aria-labelledby="cohorts-heading" className="flex flex-col gap-3">
            <h2 id="cohorts-heading" className="text-subtitle text-content">
              By cohort
            </h2>
            <DataTable caption="Completion and placement by cohort" columns={columns} rows={rows} rowKey={(r) => r.cohort_id} />
          </section>
        </>
      )}

      <section aria-labelledby="definitions-heading" className="flex flex-col gap-3">
        <h2 id="definitions-heading" className="text-subtitle text-content">
          What each number means
        </h2>
        <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2">
          {definitions(months).map(([term, text]) => (
            <div key={term}>
              <dt className="font-semibold text-content">{term}</dt>
              <dd className="text-sm text-content-2">{text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

/**
 * The North Star for admins: verified outcomes within six months of a
 * cohort ending, with completion and placement by cohort. Every figure comes
 * from admin_cohort_outcomes; nothing is estimated.
 */
export default function AdminImpactPage({ searchParams }: PageProps<"/admin/impact">) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">North Star</h1>
        <p className="max-w-reading text-lead text-content-2">
          Learners who complete a cohort and land a verifiable opportunity (a job, internship, freelance contract or scholarship)
          within six months.
        </p>
      </div>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <NorthStar searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
