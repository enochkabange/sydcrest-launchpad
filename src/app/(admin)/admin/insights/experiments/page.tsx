import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { DataTable, type Column } from "@/components/ui/layout";
import { NothingYet } from "@/components/insights/charts";
import { loadTable } from "@/lib/insights/data";
import { formatDay } from "@/lib/insights/filters";
import {
  MIN_SAMPLE,
  NOT_ENOUGH,
  formatCount,
  formatShare,
} from "@/lib/insights/metrics";
import {
  METRIC_LABELS,
  STATUS_LABELS,
  experimentReports,
  formatPoints,
  type Arm,
} from "@/lib/experiments/report";
import {
  Definitions,
  InsightsPage,
  Section,
  type InsightsContext,
} from "../shell";

export const metadata: Metadata = {
  title: "Experiments",
  robots: { index: false },
};

function verdict(arm: Arm, control: string) {
  if (arm.control) return <span className="text-content-3">The baseline</span>;
  if (arm.difference === null)
    return <span className="text-content-3">{NOT_ENOUGH}</span>;
  return (
    <span className="flex flex-col">
      <span className="font-semibold text-content">
        {formatPoints(arm.difference)} vs {control}
      </span>
      <span className="text-sm text-content-2">
        {arm.clear ? "Unlikely to be chance" : "Could still be chance"}
      </span>
    </span>
  );
}

async function Experiments({ supabase, filters }: InsightsContext) {
  const reports = experimentReports(
    await loadTable(supabase, "experiments", filters),
  );

  return (
    <>
      <Section
        id="experiments"
        title="Experiments by variant"
        lead={`People are counted from the day they first met the experiment in this range. A variant's share shows once ${MIN_SAMPLE} of its people have had seven full days to come back.`}
        table="experiments"
        filters={filters}
      >
        {reports.length === 0 ? (
          <NothingYet>
            No experiments have started yet.{" "}
            <Link href="/admin/experiments">Create one</Link>.
          </NothingYet>
        ) : (
          <div className="flex flex-col gap-8">
            {reports.map((r) => {
              const control = r.arms[0].variant;
              const columns: Column<Arm>[] = [
                {
                  header: "Variant",
                  className: "min-w-0 flex-1",
                  cell: (a) => (
                    <span className="flex flex-col">
                      <span className="font-semibold text-content">
                        {a.variant}
                      </span>
                      <span className="text-sm text-content-3">
                        {formatShare(a.share)} of people
                      </span>
                    </span>
                  ),
                },
                {
                  header: "People",
                  align: "end",
                  phone: "hide",
                  className: "tabular-nums",
                  cell: (a) => formatCount(a.people),
                },
                {
                  header: "Seven days passed",
                  align: "end",
                  phone: "hide",
                  className: "tabular-nums",
                  cell: (a) => formatCount(a.measured),
                },
                {
                  header: "Came back",
                  align: "end",
                  className: "tabular-nums",
                  cell: (a) =>
                    a.rate === null ? (
                      <span className="text-content-3">{NOT_ENOUGH}</span>
                    ) : (
                      `${formatShare(a.rate)} (${formatCount(a.cameBack)})`
                    ),
                },
                {
                  header: "Difference",
                  phone: "hide",
                  cell: (a) => verdict(a, control),
                },
              ];
              return (
                <article
                  key={r.key}
                  aria-labelledby={`exp-${r.key}`}
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-1">
                    <h3 id={`exp-${r.key}`} className="text-title text-content">
                      {r.key}
                    </h3>
                    <p className="text-sm text-content-2">
                      {STATUS_LABELS[r.status] ?? r.status}
                      {r.startedAt
                        ? ` since ${formatDay(r.startedAt.slice(0, 10))}`
                        : ""}
                      {r.stoppedAt
                        ? `, stopped ${formatDay(r.stoppedAt.slice(0, 10))}`
                        : ""}{" "}
                      · {METRIC_LABELS[r.metric] ?? r.metric} ·{" "}
                      {formatCount(r.people)} people in this range
                    </p>
                  </div>
                  <DataTable
                    caption={`Variants of ${r.key}`}
                    rows={r.arms}
                    rowKey={(a) => a.variant}
                    columns={columns}
                  />
                </article>
              );
            })}
          </div>
        )}
      </Section>

      <Definitions
        items={[
          [
            "Variant",
            "Each person gets one variant, the same one every time, from their account (or, signed out, their device). The first variant is the baseline: everyone gets it while an experiment is not running, and so does anyone who turned analytics off.",
          ],
          [
            "People",
            "People who first met the experiment in the date range. Each person counts once per experiment.",
          ],
          [
            "Seven days passed",
            "Of those, people who met it at least seven days ago. Only they are counted for coming back; a newer person is not a failure yet.",
          ],
          [
            "Came back",
            "Came back on a later day within 7 days: did anything that records an event on a later day than the one they met the experiment, within seven days. Active within 7 days (for messages to people who are away): did anything at all in the seven days after.",
          ],
          [
            "Difference",
            `The variant's share minus the baseline's, in percentage points. Shown once both have ${MIN_SAMPLE} people measured. "Unlikely to be chance" means a two proportion test gives under a 5% chance of a gap this big if the variants were the same.`,
          ],
          [
            "reengage_holdout",
            "The weekly WhatsApp nudge. One in ten learners it would message are held out and get no nudge. The difference is the nudge's real effect on people coming back.",
          ],
        ]}
      />
    </>
  );
}

/** Admin insights: experiments, holdouts and flags, and how many people came back in each variant. */
export default function ExperimentsInsightsPage({
  searchParams,
}: PageProps<"/admin/insights/experiments">) {
  return (
    <InsightsPage
      slug="experiments"
      searchParams={searchParams}
      render={Experiments}
    />
  );
}
