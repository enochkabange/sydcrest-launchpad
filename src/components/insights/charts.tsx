import type { ReactNode } from "react";
import { formatDay } from "@/lib/insights/filters";
import { formatCount, total, weekly, type Point } from "@/lib/insights/metrics";

/**
 * Lightweight charts for the admin insights dashboards (issue #243). Server
 * rendered SVG and HTML on the semantic tokens, no chart library. Daily counts
 * are columns, not lines, so nothing between two days is ever implied. Every
 * chart has its numbers one tap away in a real table, and a summary sentence
 * for screen readers; hovering a column shows its value.
 */

/** Daily columns get too thin past this many days, so longer ranges show weekly totals. */
const MAX_COLUMNS = 92;

function shortDay(day: string) {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

/** A titled chart with its table one tap away. */
export function ChartFrame({
  title,
  summary,
  table,
  children,
  actions,
}: {
  title: string;
  summary: string;
  table: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-3 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-base font-semibold text-content">{title}</span>
        <span className="text-sm text-content-2 tabular-nums">{summary}</span>
      </figcaption>
      {children}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <details className="group min-w-0 flex-1">
          <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-content-link">
            Show the numbers
          </summary>
          <div className="mt-2">{table}</div>
        </details>
        {actions}
      </div>
    </figure>
  );
}

/** An honest empty state for a chart or table with nothing in it. */
export function NothingYet({ children }: { children: ReactNode }) {
  return (
    <p className="flex min-h-32 items-center justify-center rounded-md border border-dashed border-line-strong bg-surface-sunken px-4 py-6 text-center text-sm text-content-2">
      {children}
    </p>
  );
}

/** A small plain table: first column a row header, the rest numbers. */
export function NumbersTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    // Focusable so keyboard users can scroll it sideways on a phone.
    <div tabIndex={0} role="region" aria-label={caption} className="max-h-80 overflow-auto rounded-md border border-line">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="sticky top-0 bg-surface-sunken text-content-2">
          <tr>
            {headers.map((h, i) => (
              <th key={h} scope="col" className={`px-3 py-2 font-semibold whitespace-nowrap ${i > 0 ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-content tabular-nums">
          {rows.map((r) => (
            <tr key={String(r[0])} className="border-t border-line">
              {r.map((v, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-3 py-2 font-normal whitespace-nowrap">
                    {v}
                  </th>
                ) : (
                  <td key={i} className="px-3 py-2 text-right">
                    {typeof v === "number" ? formatCount(v) : v}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Columns for a daily count. The plot stretches to its box (so it fills a
 * phone or a wide screen alike) while labels stay in HTML at their real size.
 */
export function ColumnChart({
  title,
  points,
  valueLabel,
  empty = "Nothing recorded in this range yet.",
  actions,
}: {
  title: string;
  points: Point[];
  valueLabel: string;
  empty?: string;
  actions?: ReactNode;
}) {
  const isWeekly = points.length > MAX_COLUMNS;
  const data = isWeekly ? weekly(points) : points;
  const sum = total(data);
  const max = Math.max(1, ...data.map((p) => p.y));
  const peak = data.reduce<Point | null>((best, p) => (!best || p.y > best.y ? p : best), null);
  const unit = isWeekly ? "Week of" : "Day";
  const summary =
    sum === 0
      ? "None"
      : `${formatCount(sum)} in total${peak ? `, most ${isWeekly ? "in the week of" : "on"} ${shortDay(peak.x)} (${formatCount(peak.y)})` : ""}`;

  const table = (
    <NumbersTable caption={`${title}, ${isWeekly ? "by week" : "by day"}`} headers={[unit, valueLabel]} rows={data.map((p) => [formatDay(p.x), p.y])} />
  );

  return (
    <ChartFrame title={title} summary={summary} table={table} actions={actions}>
      {sum === 0 ? (
        <NothingYet>{empty}</NothingYet>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
            <div className="flex h-40 flex-col justify-between text-right text-xs text-content-3 tabular-nums xl:h-48" aria-hidden="true">
              <span>{formatCount(max)}</span>
              {max >= 4 && max % 2 === 0 && <span>{formatCount(max / 2)}</span>}
              <span>0</span>
            </div>
            <svg
              role="img"
              aria-label={`${title}: ${summary}. The table under the chart lists every ${isWeekly ? "week" : "day"}.`}
              viewBox={`0 0 ${data.length * 10} 100`}
              preserveAspectRatio="none"
              className="h-40 w-full overflow-visible xl:h-48"
            >
              {(max >= 4 && max % 2 === 0 ? [0, 50, 100] : [0, 100]).map((y) => (
                <line key={y} x1={0} x2={data.length * 10} y1={y} y2={y} className="stroke-line" vectorEffect="non-scaling-stroke" strokeWidth={1} />
              ))}
              {data.map((p, i) => {
                const h = (p.y / max) * 100;
                return (
                  <g key={p.x}>
                    {p.y > 0 && <rect x={i * 10 + 1.5} y={100 - h} width={7} height={h} className="fill-action" />}
                    {/* A full height hit area so hovering anywhere over the day shows its value. */}
                    <rect x={i * 10} y={0} width={10} height={100} className="fill-transparent hover:fill-surface-sunken/40">
                      <title>{`${isWeekly ? "Week of " : ""}${formatDay(p.x)}: ${formatCount(p.y)} ${valueLabel.toLowerCase()}`}</title>
                    </rect>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="ml-8 flex justify-between text-xs text-content-3" aria-hidden="true">
            <span>{shortDay(data[0].x)}</span>
            {data.length > 2 && <span>{shortDay(data[Math.floor(data.length / 2)].x)}</span>}
            <span>{shortDay(data[data.length - 1].x)}</span>
          </div>
        </div>
      )}
    </ChartFrame>
  );
}

export type Bar = { label: string; value: number; detail?: string };

/**
 * Horizontal bars for categories (devices, features, steps). Every bar carries
 * its number as text, so the list itself is the table.
 */
export function BarList({ label, bars, format = formatCount }: { label: string; bars: Bar[]; format?: (n: number) => string }) {
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <ul aria-label={label} className="flex flex-col gap-3">
      {bars.map((b) => (
        <li key={b.label} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate font-semibold text-content">{b.label}</span>
            <span className="shrink-0 text-content tabular-nums">
              {format(b.value)}
              {b.detail && <span className="ml-2 text-content-2">{b.detail}</span>}
            </span>
          </div>
          <div className="h-2 rounded-full bg-surface-sunken" aria-hidden="true">
            {b.value > 0 && <div className="h-2 rounded-full bg-action" style={{ width: `${Math.max(1, (b.value / max) * 100)}%` }} />}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Headline numbers: two across on phones (as on the North Star page), four from lg. */
export function StatGrid({ children }: { children: ReactNode }) {
  return <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:gap-6">{children}</dl>;
}

/** A headline number. */
export function StatTile({ value, label, detail }: { value: string; label: string; detail?: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <dt className="order-2 text-sm font-semibold text-content">{label}</dt>
      <dd className={`order-1 text-content tabular-nums ${value.length > 9 ? "text-subtitle" : "text-h2"}`}>{value}</dd>
      {detail && <dd className="order-3 text-sm text-content-2">{detail}</dd>}
    </div>
  );
}
