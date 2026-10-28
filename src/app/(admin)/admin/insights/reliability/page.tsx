import type { Metadata } from "next";
import { DataTable, SectionGrid, type Column } from "@/components/ui/layout";
import { ColumnChart, NothingYet, StatTile } from "@/components/insights/charts";
import type { RowOf } from "@/lib/insights/dashboards";
import { loadTable } from "@/lib/insights/data";
import { DEVICES } from "@/lib/insights/filters";
import {
  RATING_LABELS,
  VITAL_LABELS,
  enough,
  eventLabel,
  formatCount,
  formatRate,
  formatVital,
  vitalRating,
  type VitalMetric,
} from "@/lib/insights/metrics";
import { Definitions, ExportLink, InsightsPage, Section, type InsightsContext } from "../shell";

export const metadata: Metadata = { title: "Reliability", robots: { index: false } };

type FailureRow = RowOf<"admin_insights_failures">;
type ErrorRow = RowOf<"admin_insights_errors">;
type VitalRow = RowOf<"admin_insights_vitals">;

const KIND: Record<string, string> = { action_failed: "Failed action", server_error: "Server error", client_error: "Browser error" };
const RATING_CLASS = { good: "text-success-fg", needs_improvement: "text-warning-fg", poor: "text-danger-fg" } as const;

function device(value: string) {
  return DEVICES.find((d) => d.value === value)?.label ?? (value === "unknown" ? "Not known" : value);
}

/** Errors per 1,000 page views, or NOT_ENOUGH under the sample floor. */
function perThousand(errors: number, views: number) {
  return enough(views) ? `${((errors / views) * 1000).toFixed(1).replace(/\.0$/, "")} per 1,000 page views` : "Not enough page views yet";
}

async function Reliability({ supabase, filters }: InsightsContext) {
  const [daily, errors, failures, vitals] = await Promise.all([
    loadTable(supabase, "error_daily", filters),
    loadTable(supabase, "errors", filters),
    loadTable(supabase, "failures", filters),
    loadTable(supabase, "vitals", filters),
  ]);
  const t = daily.reduce(
    (s, d) => ({ views: s.views + d.page_views, server: s.server + d.server_errors, client: s.client + d.client_errors, failed: s.failed + d.failed_actions }),
    { views: 0, server: 0, client: 0, failed: 0 },
  );

  const failureColumns: Column<FailureRow>[] = [
    { header: "Action", cell: (r) => <span className="font-semibold text-content">{eventLabel(r.action)}</span>, className: "min-w-0 flex-1" },
    { header: "Succeeded", cell: (r) => formatCount(r.successes), align: "end", phone: "hide" },
    { header: "Failed", cell: (r) => formatCount(r.failures), align: "end", phone: "hide" },
    { header: "Failure rate", cell: (r) => formatRate(r.failures, r.failures + r.successes), align: "end" },
    {
      header: "Why",
      cell: (r) =>
        [
          r.validation && `${formatCount(r.validation)} validation`,
          r.forbidden && `${formatCount(r.forbidden)} forbidden`,
          r.rate_limited && `${formatCount(r.rate_limited)} rate limited`,
          r.server_error && `${formatCount(r.server_error)} server error`,
        ]
          .filter(Boolean)
          .join(", ") || "Not recorded",
      phone: "hide",
      className: "text-sm text-content-2",
    },
  ];
  const errorColumns: Column<ErrorRow>[] = [
    {
      header: "Error",
      cell: (r) => (
        <span className="flex flex-col">
          <span className="font-semibold text-content">
            {KIND[r.name] ?? r.name}
            {r.subject ? `: ${eventLabel(r.subject)}` : ""}
          </span>
          <span className="text-sm break-all text-content-3">{r.route || "Page not known"}</span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Times", cell: (r) => formatCount(r.occurrences), align: "end" },
    { header: "Days seen", cell: (r) => formatCount(r.days), align: "end", phone: "hide" },
  ];
  const vitalColumns: Column<VitalRow>[] = [
    {
      header: "Page",
      cell: (r) => (
        <span className="flex flex-col">
          <span className="font-semibold break-all text-content">{r.route || "Page not known"}</span>
          <span className="text-sm text-content-3">
            {VITAL_LABELS[r.metric as VitalMetric] ?? r.metric}, {device(r.device_class)}
          </span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Samples", cell: (r) => formatCount(r.samples), align: "end", phone: "hide" },
    {
      header: "p75",
      cell: (r) => {
        const rating = enough(r.samples) ? vitalRating(r.metric, r.p75) : null;
        return (
          <span className="flex flex-col items-end">
            <span className="tabular-nums">{formatVital(r.metric, r.p75, r.samples)}</span>
            {rating && <span className={`text-sm font-semibold ${RATING_CLASS[rating]}`}>{RATING_LABELS[rating]}</span>}
          </span>
        );
      },
      align: "end",
    },
    { header: "Rated good", cell: (r) => formatRate(r.good, r.samples), align: "end", phone: "hide" },
    { header: "Rated poor", cell: (r) => formatRate(r.poor, r.samples), align: "end", phone: "hide" },
  ];

  return (
    <>
      <SectionGrid cols={4} as="dl">
        <StatTile value={formatCount(t.views)} label="Page views" />
        <StatTile value={formatCount(t.server)} label="Server errors" detail={perThousand(t.server, t.views)} />
        <StatTile value={formatCount(t.client)} label="Browser errors" detail={`${perThousand(t.client, t.views)}, from half of sessions`} />
        <StatTile value={formatCount(t.failed)} label="Failed actions" detail="Refused or broken form submissions" />
      </SectionGrid>

      <div className="grid gap-4 lg:grid-cols-2 xl:gap-6">
        <ColumnChart
          title="Errors"
          valueLabel="Errors"
          empty="No errors recorded in this range."
          points={daily.map((d) => ({ x: d.day, y: d.server_errors + d.client_errors }))}
          actions={<ExportLink table="error_daily" filters={filters} />}
        />
        <ColumnChart
          title="Failed actions"
          valueLabel="Failed actions"
          empty="No failed actions recorded in this range."
          points={daily.map((d) => ({ x: d.day, y: d.failed_actions }))}
          actions={<ExportLink table="error_daily" filters={filters} />}
        />
      </div>

      <Section id="failures" title="Failure rate by action" lead="Actions that failed at least once in the range." table="failures" filters={filters}>
        {failures.length === 0 ? (
          <NothingYet>No action failed in this range.</NothingYet>
        ) : (
          <DataTable caption="Failure rate by action" columns={failureColumns} rows={failures} rowKey={(r) => r.action} />
        )}
      </Section>

      <Section id="errors" title="Errors by page" lead="The 100 most frequent, by kind, action and page." table="errors" filters={filters}>
        {errors.length === 0 ? (
          <NothingYet>No errors recorded in this range.</NothingYet>
        ) : (
          <DataTable caption="Errors by page" columns={errorColumns} rows={errors} rowKey={(r) => `${r.name}:${r.subject}:${r.route}`} />
        )}
      </Section>

      <Section id="vitals" title="Web Vitals by page and device" lead="The 75th percentile, the figure Core Web Vitals are judged on, from a quarter of sessions." table="vitals" filters={filters}>
        {vitals.length === 0 ? (
          <NothingYet>No Web Vitals samples in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Web Vitals by page and device" columns={vitalColumns} rows={vitals} rowKey={(r) => `${r.route}:${r.device_class}:${r.metric}`} />
        )}
      </Section>

      <Definitions
        items={[
          ["Server errors", "Errors thrown while rendering a page, in a route or in a form action. Every one is recorded."],
          ["Browser errors", "Errors caught in the browser, from half of sessions, at most 10 per page."],
          ["Failed actions", "A form or button that was refused (validation, permission, rate limit) or broke. Every one is recorded."],
          ["Failure rate", "Failures over failures plus successes of the same action. Shown from five attempts."],
          ["p75", "Three quarters of visits were this fast or faster. Shown from five samples, rated against Google's thresholds."],
          ["Device", "Phone, tablet or computer, from the browser. The device filter applies to every table here."],
        ]}
      />
    </>
  );
}

/** Admin insights: errors, failure rates and Web Vitals. */
export default function ReliabilityInsightsPage({ searchParams }: PageProps<"/admin/insights/reliability">) {
  return <InsightsPage slug="reliability" searchParams={searchParams} render={Reliability} />;
}
