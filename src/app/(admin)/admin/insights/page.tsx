import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { AutoGrid } from "@/components/ui/layout";
import { ColumnChart, StatTile, StatGrid } from "@/components/insights/charts";
import { DASHBOARDS } from "@/lib/insights/dashboards";
import { loadRow, loadTable } from "@/lib/insights/data";
import { formatDay } from "@/lib/insights/filters";
import { formatCount, formatRate } from "@/lib/insights/metrics";
import { NORTH_STAR_MONTHS, totalCohorts, type CohortOutcomeRow } from "@/lib/outcomes/stats";
import { Definitions, ExportLink, InsightsPage, Section, type InsightsContext } from "./shell";

export const metadata: Metadata = { title: "Insights", robots: { index: false } };

async function Overview({ supabase, filters }: InsightsContext) {
  const [head, daily, outcomes] = await Promise.all([
    loadRow(supabase, "admin_insights_overview", filters),
    loadTable(supabase, "daily", filters),
    supabase.rpc("admin_cohort_outcomes", { p_months: NORTH_STAR_MONTHS }),
  ]);
  if (outcomes.error) throw new Error(`Could not load cohort outcomes: ${outcomes.error.message}`);
  const north = totalCohorts((outcomes.data ?? []) as CohortOutcomeRow[]);
  const h = head ?? { active_people: 0, visitors: 0, dau: 0, wau: 0, mau: 0, signups: 0, topics_completed: 0 };
  const endLabel = formatDay(filters.to);
  const series = (key: "active_people" | "visitors" | "signups" | "topics_completed") => daily.map((d) => ({ x: d.day, y: d[key] }));
  const csv = <ExportLink table="daily" filters={filters} />;

  return (
    <>
      <section aria-labelledby="headline-heading" className="flex flex-col gap-3">
        <h2 id="headline-heading" className="text-subtitle text-content">
          Headline numbers
        </h2>
        <StatGrid>
          <StatTile value={formatCount(h.dau)} label="Active that day" detail={`Signed in people on ${endLabel}`} />
          <StatTile value={formatCount(h.wau)} label="Active in 7 days" detail={`The week to ${endLabel}`} />
          <StatTile value={formatCount(h.mau)} label="Active in 30 days" detail={`Daily share of monthly: ${formatRate(h.dau, h.mau)}`} />
          <StatTile value={formatCount(h.active_people)} label="Active in the range" detail={`${formatCount(h.visitors)} signed out visitors too`} />
          <StatTile value={formatCount(h.signups)} label="Sign ups" detail="New accounts in the range" />
          <StatTile value={formatCount(h.topics_completed)} label="Topics completed" detail="Across every roadmap" />
          <StatTile
            value={north.learners ? `${formatCount(north.placed)} of ${formatCount(north.learners)}` : "No cohorts yet"}
            label={`North Star: placed within ${NORTH_STAR_MONTHS} months`}
            detail={north.learners ? `${formatRate(north.placed, north.learners)} of cohort learners, all cohorts` : "Counts start with the first cohort"}
          />
          <div className="flex min-w-0 flex-col justify-center gap-1 rounded-lg border border-dashed border-line-strong p-4 xl:p-5">
            <dt className="text-sm font-semibold text-content">By cohort</dt>
            <dd>
              <Link href="/admin/impact" className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline">
                Open the North Star view
              </Link>
            </dd>
          </div>
        </StatGrid>
      </section>

      <section aria-labelledby="trends-heading" className="flex flex-col gap-3">
        <h2 id="trends-heading" className="text-subtitle text-content">
          Trends
        </h2>
        <div className="grid gap-4 lg:grid-cols-2 xl:gap-6">
          <ColumnChart title="Active people" valueLabel="Active people" points={series("active_people")} actions={csv} />
          <ColumnChart title="Sign ups" valueLabel="Sign ups" points={series("signups")} actions={csv} />
          <ColumnChart title="Signed out visitors" valueLabel="Visitors" points={series("visitors")} actions={csv} />
          <ColumnChart title="Topics completed" valueLabel="Topics completed" points={series("topics_completed")} actions={csv} />
        </div>
      </section>

      <Section id="dashboards" title="More dashboards" filters={filters}>
        <AutoGrid as="ul" min="md">
          {DASHBOARDS.filter((d) => d.slug !== "overview").map((d) => (
            <li key={d.slug}>
              <Link
                href={d.href}
                className="flex h-full min-h-11 flex-col gap-1 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-sunken"
              >
                <span className="text-lg font-semibold text-content">{d.title}</span>
                <span className="text-sm text-content-2">{d.description}</span>
              </Link>
            </li>
          ))}
        </AutoGrid>
      </Section>

      <Definitions
        items={[
          ["Active", "A signed in person who did anything that records an event: a page view, a lesson, a post. Bots are left out."],
          ["Active that day, in 7 days, in 30 days", "Daily, weekly and monthly active people, counted on and back from the last day of the range. Each person counts once."],
          ["Daily share of monthly", "Active that day divided by active in 30 days: how much of the month's audience came back that day."],
          ["Signed out visitors", "Distinct browsers that viewed a page without signing in. One person on two devices counts twice."],
          ["Sign ups", "New accounts created, from the sign up event."],
          ["North Star", "Cohort learners with a verified outcome within six months of their cohort ending, across all cohorts. Not affected by the filters."],
        ]}
      />
    </>
  );
}

/** Admin insights overview: active people, sign ups, the North Star and trends. */
export default function InsightsOverviewPage({ searchParams }: PageProps<"/admin/insights">) {
  return <InsightsPage slug="overview" searchParams={searchParams} render={Overview} />;
}
