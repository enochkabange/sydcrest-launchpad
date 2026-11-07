import type { Metadata } from "next";
import { DataTable, type Column } from "@/components/ui/layout";
import { BarList, NothingYet } from "@/components/insights/charts";
import { loadTable } from "@/lib/insights/data";
import { eventLabel, formatChange, formatCount, groupFeatures, type FeatureUse } from "@/lib/insights/metrics";
import { Definitions, InsightsPage, Section, type InsightsContext } from "../shell";

export const metadata: Metadata = { title: "Feature use", robots: { index: false } };

function perPerson(n: number | null) {
  return n === null ? "Not enough data yet" : n.toFixed(1).replace(/\.0$/, "");
}

async function Features({ supabase, filters }: InsightsContext) {
  const rows = await loadTable(supabase, "features", filters);
  const features = groupFeatures(rows);

  const columns: Column<FeatureUse>[] = [
    {
      header: "Feature",
      cell: (f) => (
        <details className="min-w-0">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-content">{f.label}</summary>
          <ul className="flex flex-col gap-1 pb-2 text-sm text-content-2">
            {f.actions.map((a) => (
              <li key={a.name} className="tabular-nums">
                {eventLabel(a.name)}: {formatCount(a.events)} times by {formatCount(a.users)}
              </li>
            ))}
          </ul>
        </details>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "People", cell: (f) => formatCount(f.users), align: "end" },
    { header: "Times", cell: (f) => formatCount(f.events), align: "end", phone: "hide" },
    { header: "Times per person", cell: (f) => perPerson(f.perUser), align: "end", phone: "hide" },
    { header: "Days used", cell: (f) => `${formatCount(f.activeDays)} of ${formatCount(filters.days)}`, align: "end", phone: "hide" },
    { header: "Trend", cell: (f) => formatChange(f.events, f.previous) ?? "Too few to compare", align: "end", phone: "hide", className: "text-content-2" },
  ];

  return (
    <>
      {features.length === 0 ? (
        <NothingYet>No feature was used in this range yet.</NothingYet>
      ) : (
        <>
          <Section id="top" title="Most used, by people" lead="The most people using any one action of the feature." table="features" filters={filters}>
            <div className="rounded-lg border border-line bg-surface p-4 xl:p-5">
              <BarList label="Features by people" bars={features.slice(0, 12).map((f) => ({ label: f.label, value: f.users }))} />
            </div>
          </Section>
          <Section id="all" title="Every feature" lead="Open a feature to see each of its actions." table="features" filters={filters}>
            <DataTable caption="Use of every feature" columns={columns} rows={features} rowKey={(f) => f.feature} />
          </Section>
        </>
      )}
      <Definitions
        items={[
          ["People", "For each action, distinct signed in people (or browsers when signed out) who did it; a feature shows its busiest action, because one person can do several."],
          ["Times", "How many times its actions happened in the range, from the daily totals."],
          ["Times per person", "Times over people. Shown once at least five people used it."],
          ["Days used", "Days in the range with at least one use."],
          ["Trend", "Times in the range against the same number of days just before it."],
          ["Not listed", "Failures, forms and Web Vitals are on the Reliability and funnel dashboards."],
        ]}
      />
    </>
  );
}

/** Admin insights: use of every feature. */
export default function FeaturesInsightsPage({ searchParams }: PageProps<"/admin/insights/features">) {
  return <InsightsPage slug="features" searchParams={searchParams} render={Features} />;
}
