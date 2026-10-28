import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { DataTable, SectionGrid, rowLinkClass, type Column } from "@/components/ui/layout";
import { NothingYet, StatTile } from "@/components/insights/charts";
import type { RowOf } from "@/lib/insights/dashboards";
import { loadTable } from "@/lib/insights/data";
import { formatDay } from "@/lib/insights/filters";
import { formatCount, formatHours, formatRate } from "@/lib/insights/metrics";
import { Definitions, InsightsPage, Section, type InsightsContext } from "../shell";

export const metadata: Metadata = { title: "DMP cohorts", robots: { index: false } };

type CohortRow = RowOf<"admin_insights_cohorts">;
type RiskRow = RowOf<"admin_insights_at_risk">;

async function Cohorts({ supabase, filters }: InsightsContext) {
  const [cohorts, risk] = await Promise.all([loadTable(supabase, "cohorts", filters), loadTable(supabase, "at_risk", filters)]);
  const t = cohorts.reduce(
    (s, c) => ({
      learners: s.learners + c.learners,
      onTime: s.onTime + c.on_time,
      sent: s.sent + c.on_time + c.late,
      due: s.due + c.on_time + c.late + c.missing,
      graded: s.graded + c.graded,
      active: s.active + c.active_7d,
      risk: s.risk + c.at_risk,
    }),
    { learners: 0, onTime: 0, sent: 0, due: 0, graded: 0, active: 0, risk: 0 },
  );
  // A single median across cohorts cannot be built from medians, so the headline shows one only for a single cohort.
  const single = cohorts.length === 1 ? cohorts[0] : null;

  const columns: Column<CohortRow>[] = [
    {
      header: "Cohort",
      cell: (c) => (
        <span className="flex flex-col">
          <Link href={`/admin/cohorts/${c.cohort_id}`} className={`font-semibold text-content hover:underline ${rowLinkClass}`}>
            {c.cohort_name}
          </Link>
          <span className="text-sm text-content-3">
            {c.program_title}, from {formatDay(c.starts_on)}
          </span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Learners", cell: (c) => formatCount(c.learners), align: "end", phone: "hide" },
    { header: "Weeks due", cell: (c) => formatCount(c.weeks_due), align: "end", phone: "hide" },
    { header: "On time", cell: (c) => formatRate(c.on_time, c.on_time + c.late + c.missing), align: "end", phone: "hide" },
    { header: "Missing", cell: (c) => formatCount(c.missing), align: "end", phone: "hide" },
    { header: "Median time to grade", cell: (c) => formatHours(c.grading_hours_median, c.graded), align: "end", phone: "hide" },
    { header: "Active in 7 days", cell: (c) => `${formatCount(c.active_7d)} of ${formatCount(c.learners)}`, align: "end", phone: "hide" },
    { header: "At risk", cell: (c) => formatCount(c.at_risk), align: "end" },
  ];
  const riskColumns: Column<RiskRow>[] = [
    {
      header: "Learner",
      cell: (r) => (
        <span className="flex flex-col">
          <span className="font-semibold text-content">{r.learner_name}</span>
          <span className="text-sm text-content-3">
            {r.cohort_name}
            {r.specialization ? `, ${r.specialization}` : ""}
          </span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Missing weeks", cell: (r) => formatCount(r.missing_weeks), align: "end" },
    { header: "Late weeks", cell: (r) => formatCount(r.late_weeks), align: "end", phone: "hide" },
    { header: "Below pass mark", cell: (r) => formatCount(r.below_pass), align: "end", phone: "hide" },
    { header: "Last sent", cell: (r) => (r.last_submitted ? formatDay(r.last_submitted) : "Nothing yet"), align: "end", phone: "hide" },
  ];

  return (
    <>
      {cohorts.length === 0 ? (
        <NothingYet>No cohort runs during this range. Cohorts appear here from their start date to the end of their last week.</NothingYet>
      ) : (
        <>
          <SectionGrid cols={4} as="dl">
            <StatTile value={formatCount(t.learners)} label="Active learners" detail={`${cohorts.length} ${cohorts.length === 1 ? "cohort" : "cohorts"}`} />
            <StatTile value={formatRate(t.onTime, t.due)} label="Weeks sent on time" detail={`${formatCount(t.onTime)} of ${formatCount(t.due)} due learner weeks`} />
            <StatTile
              value={single ? formatHours(single.grading_hours_median, single.graded) : formatCount(t.graded)}
              label={single ? "Median time to grade" : "Submissions graded"}
              detail={single ? `${formatCount(single.graded)} graded in the range` : "Pick one cohort for its grading time"}
            />
            <StatTile value={formatCount(t.risk)} label="Learners at risk" detail={`${formatCount(t.active)} learners active in the last 7 days`} />
          </SectionGrid>
          <Section id="cohorts" title="By cohort" table="cohorts" filters={filters}>
            <DataTable caption="Cohorts" columns={columns} rows={cohorts} rowKey={(c) => c.cohort_id} />
          </Section>
        </>
      )}

      <Section
        id="risk"
        title="Learners at risk"
        lead="Names as on the cohort pages; no contact details. Open the mentor console to follow up."
        table="at_risk"
        filters={filters}
      >
        {risk.length === 0 ? (
          <NothingYet>No learner is at risk in these cohorts.</NothingYet>
        ) : (
          <DataTable caption="Learners at risk" columns={riskColumns} rows={risk} rowKey={(r) => `${r.cohort_name}:${r.learner_name}:${r.last_submitted}`} />
        )}
      </Section>

      <Definitions
        items={[
          ["Cohorts in range", "Cohorts (not cancelled) running at some point in the range: from the start date to the due date of their last week."],
          ["Weeks due", "Programme weeks whose due date (the start date plus seven days per week) has passed."],
          ["On time", "Learner weeks whose first submission came by the end of the grace days after the due date, over all due learner weeks. Active and completed learners count; deferred ones do not."],
          ["Missing", "Learner weeks with nothing sent once the grace days have passed."],
          ["Median time to grade", "From submission to grade, for work graded in the range. Shown from five graded pieces."],
          ["Active in 7 days", "Learners who did anything on the platform in the last 7 days. Attendance at live sessions is not recorded on the platform yet, so this is not attendance."],
          ["At risk", "An active learner with two or more missing weeks, or two or more weeks graded below the pass mark."],
        ]}
      />
    </>
  );
}

/** Admin insights: DMP cohort health. */
export default function CohortsInsightsPage({ searchParams }: PageProps<"/admin/insights/cohorts">) {
  return <InsightsPage slug="cohorts" searchParams={searchParams} render={Cohorts} />;
}
