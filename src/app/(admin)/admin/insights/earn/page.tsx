import type { Metadata } from "next";
import { DataTable, SectionGrid, type Column } from "@/components/ui/layout";
import { ColumnChart, NothingYet, StatTile } from "@/components/insights/charts";
import type { RowOf } from "@/lib/insights/dashboards";
import { loadRow, loadTable } from "@/lib/insights/data";
import { formatCount, formatHours, formatRate } from "@/lib/insights/metrics";
import { Definitions, ExportLink, InsightsPage, Section, type InsightsContext } from "../shell";

export const metadata: Metadata = { title: "Mentors and Earn", robots: { index: false } };

const OUTCOME_LABELS: Record<string, string> = {
  job: "Job",
  internship: "Internship",
  freelance_contract: "Freelance contract",
  scholarship: "Scholarship",
  grant: "Grant",
};

type OutcomeRow = RowOf<"admin_insights_outcomes">;

async function Earn({ supabase, filters }: InsightsContext) {
  const [head, daily, outcomes] = await Promise.all([
    loadRow(supabase, "admin_insights_earn", filters),
    loadTable(supabase, "earn_daily", filters),
    loadTable(supabase, "outcomes", filters),
  ]);
  const e = head!;
  const csv = <ExportLink table="earn_daily" filters={filters} />;

  const outcomeColumns: Column<OutcomeRow>[] = [
    { header: "Type", cell: (r) => <span className="font-semibold text-content">{OUTCOME_LABELS[r.type] ?? r.type}</span>, className: "min-w-0 flex-1" },
    { header: "Reported", cell: (r) => formatCount(r.reported), align: "end", phone: "hide" },
    { header: "Verified", cell: (r) => formatCount(r.verified), align: "end" },
    { header: "Rejected", cell: (r) => formatCount(r.rejected), align: "end", phone: "hide" },
  ];

  return (
    <>
      <section aria-labelledby="mentors-heading" className="flex flex-col gap-3">
        <h2 id="mentors-heading" className="text-subtitle text-content">
          Mentors and bookings
        </h2>
        <SectionGrid cols={4} as="dl">
          <StatTile value={formatCount(e.bookings_requested)} label="Booking requests" detail={`${formatCount(e.bookings_completed)} completed so far`} />
          <StatTile value={formatRate(e.bookings_accepted, e.bookings_requested)} label="Accepted" detail={`${formatCount(e.bookings_accepted)} accepted, ${formatCount(e.bookings_declined)} declined`} />
          <StatTile value={formatHours(e.booking_response_hours, e.booking_responses)} label="Median time to respond" detail="From request to accept or decline" />
          <StatTile value={formatCount(e.experts_listed)} label="Experts listed" detail={`${formatCount(e.experts_approved)} approved in the range`} />
        </SectionGrid>
      </section>

      <section aria-labelledby="briefs-heading" className="flex flex-col gap-3">
        <h2 id="briefs-heading" className="text-subtitle text-content">
          Briefs, pitches and outcomes
        </h2>
        <SectionGrid cols={4} as="dl">
          <StatTile value={formatCount(e.briefs_posted)} label="Briefs posted" detail={`${formatCount(e.briefs_awarded)} awarded`} />
          <StatTile value={formatCount(e.pitches_submitted)} label="Pitches sent" detail={`${formatRate(e.pitches_accepted, e.pitches_submitted)} accepted`} />
          <StatTile value={formatHours(e.pitch_decision_hours, e.pitches_decided)} label="Median time to decide a pitch" />
          <StatTile value={formatCount(e.outcomes_verified)} label="Outcomes verified" detail={`${formatCount(e.outcomes_reported)} reported in the range`} />
        </SectionGrid>
      </section>

      <div className="grid gap-4 lg:grid-cols-3 xl:gap-6">
        <ColumnChart title="Booking requests" valueLabel="Requests" points={daily.map((d) => ({ x: d.day, y: d.bookings }))} actions={csv} />
        <ColumnChart title="Briefs posted" valueLabel="Briefs" points={daily.map((d) => ({ x: d.day, y: d.briefs }))} actions={csv} />
        <ColumnChart title="Pitches sent" valueLabel="Pitches" points={daily.map((d) => ({ x: d.day, y: d.pitches }))} actions={csv} />
      </div>

      <Section id="outcomes" title="Outcomes by type" lead="Reported in the range, with where verification stands now." table="outcomes" filters={filters}>
        {outcomes.length === 0 ? (
          <NothingYet>No outcomes reported in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Outcomes by type" columns={outcomeColumns} rows={outcomes} rowKey={(r) => r.type} />
        )}
      </Section>

      <Definitions
        items={[
          ["Booking requests", "Requests made in the range, whatever their status now. Accepted includes completed."],
          ["Median time to respond", "From a request to the expert accepting or declining it, for requests made in the range (bookings opened from a pitch are left out). Shown from five responses."],
          ["Experts listed", "Experts whose profile is approved now."],
          ["Briefs and pitches", "Posted or sent in the range; awarded and accepted is where they stand now."],
          ["Outcomes", "Jobs, internships, contracts and awards learners reported in the range. Verified ones count towards the North Star."],
          ["Filters", "Track, region, chapter and cohort apply to the person asking: the requester, the poster, the expert pitching or the learner reporting."],
        ]}
      />
    </>
  );
}

/** Admin insights: mentors, bookings, briefs, pitches and outcomes. */
export default function EarnInsightsPage({ searchParams }: PageProps<"/admin/insights/earn">) {
  return <InsightsPage slug="earn" searchParams={searchParams} render={Earn} />;
}
