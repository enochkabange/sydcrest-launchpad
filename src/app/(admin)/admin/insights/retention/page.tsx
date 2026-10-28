import type { Metadata } from "next";
import { NothingYet } from "@/components/insights/charts";
import { loadTable } from "@/lib/insights/data";
import { formatDay } from "@/lib/insights/filters";
import {
  MIN_SAMPLE,
  NOT_ENOUGH,
  RETENTION_WEEKS,
  formatCount,
  formatShare,
  retentionAverage,
  retentionMatrix,
  type RetentionCell,
} from "@/lib/insights/metrics";
import { Definitions, InsightsPage, Section, type InsightsContext } from "../shell";

export const metadata: Metadata = { title: "Retention", robots: { index: false } };

const WEEKS = Array.from({ length: RETENTION_WEEKS }, (_, i) => i + 1);

/** Shade from the surface towards the action colour by the share retained. */
function shade(rate: number | null) {
  if (rate === null) return undefined;
  const pct = Math.round(Math.min(1, rate) * 70);
  return { backgroundColor: `color-mix(in oklab, var(--color-action) ${pct}%, var(--color-surface))` };
}

function Cell({ cell }: { cell: RetentionCell }) {
  if (cell === null) return <td className="px-3 py-2 text-center text-xs text-content-3">Not yet</td>;
  const dark = cell.rate !== null && cell.rate >= 0.5;
  return (
    <td className={`px-3 py-2 text-center tabular-nums ${dark ? "text-action-fg" : "text-content"}`} style={shade(cell.rate)}>
      {cell.rate === null ? (
        <span className="text-content">{formatCount(cell.active)}</span>
      ) : (
        <span className="flex flex-col leading-tight">
          <span className="font-semibold">{formatShare(cell.rate)}</span>
          <span className="text-xs">{formatCount(cell.active)}</span>
        </span>
      )}
    </td>
  );
}

async function Retention({ supabase, filters }: InsightsContext) {
  const [rows, cohorts] = await Promise.all([loadTable(supabase, "retention", filters), loadTable(supabase, "retention_cohorts", filters)]);
  const lines = retentionMatrix(rows, cohorts);
  const average = retentionAverage(lines);

  return (
    <>
      <Section
        id="matrix"
        title="Weekly sign up cohorts"
        lead={`Each row is the people who signed up that week; each column, the share of them active in that week after. Shares show once a cohort has ${MIN_SAMPLE} people; smaller cohorts show the count only.`}
        table="retention"
        filters={filters}
      >
        {lines.length === 0 ? (
          <NothingYet>No one signed up in this range yet, so there are no cohorts to follow.</NothingYet>
        ) : (
          <div tabIndex={0} role="region" aria-label="Retention by sign up week" className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-sm">
              <caption className="sr-only">
                Share of each weekly sign up cohort active in weeks 1 to 8 after signing up. Not yet means the week has not ended.
              </caption>
              <thead className="bg-surface-sunken text-content-2">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left font-semibold whitespace-nowrap">Sign up week</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold whitespace-nowrap">People</th>
                  {WEEKS.map((w) => (
                    <th key={w} scope="col" className="px-3 py-3 text-center font-semibold whitespace-nowrap">
                      Week {w}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-line bg-surface-sunken">
                  <th scope="row" className="px-3 py-2 text-left font-semibold whitespace-nowrap text-content">All cohorts</th>
                  <td className="px-3 py-2 text-right text-content tabular-nums">{formatCount(lines.reduce((s, l) => s + l.size, 0))}</td>
                  {average.map((r, i) => (
                    <td key={i} className="px-3 py-2 text-center text-xs text-content tabular-nums">
                      {r === null ? (lines.some((l) => l.cells[i]) ? NOT_ENOUGH : "Not yet") : <span className="text-sm font-semibold">{formatShare(r)}</span>}
                    </td>
                  ))}
                </tr>
                {lines.map((line) => (
                  <tr key={line.week} className="border-t border-line">
                    <th scope="row" className="px-3 py-2 text-left font-normal whitespace-nowrap text-content">
                      {formatDay(line.week)}
                    </th>
                    <td className="px-3 py-2 text-right text-content tabular-nums">{formatCount(line.size)}</td>
                    {line.cells.map((cell, i) => (
                      <Cell key={i} cell={cell} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Definitions
        items={[
          ["Sign up week", "The Monday of the week the account was created (UTC, which is Ghana time). Cohorts are the weeks that overlap the date range."],
          ["Week 1 to week 8", "Week n is the seven days starting n weeks after the sign up week began. A person is active if they did anything that records an event while signed in."],
          ["Not yet", "That week has not ended, so there is nothing to count. It is not zero."],
          ["All cohorts", "Everyone active in that week over everyone in cohorts that have reached it, so bigger cohorts weigh more."],
          ["Filters", "Track, region, chapter and cohort select the people by what is true of them now."],
        ]}
      />
    </>
  );
}

/** Admin insights: weekly sign up cohorts over their first eight weeks. */
export default function RetentionInsightsPage({ searchParams }: PageProps<"/admin/insights/retention">) {
  return <InsightsPage slug="retention" searchParams={searchParams} render={Retention} />;
}
