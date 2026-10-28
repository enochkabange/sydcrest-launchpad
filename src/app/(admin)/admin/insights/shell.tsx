import type { ReactNode } from "react";
import { Suspense } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import Link from "@/components/ui/link";
import { FilterBar } from "@/components/insights/filter-bar";
import { requireAdmin } from "@/lib/admin";
import { DASHBOARDS, TABLES, dashboard, type DashboardSlug, type TableKey } from "@/lib/insights/dashboards";
import { loadFilterOptions, loadRollupsTo } from "@/lib/insights/data";
import { describeRange, filterQuery, formatDay, parseFilters, type InsightFilters, type SearchParams } from "@/lib/insights/filters";
import { todayInAccra } from "@/lib/mentor/progress";
import type { Database } from "@/lib/supabase/database.types";

export type InsightsContext = { supabase: SupabaseClient<Database>; filters: InsightFilters };

/** Links between the dashboards. Static, so it renders before the session is read. */
function InsightsNav({ current }: { current: DashboardSlug }) {
  return (
    <nav aria-label="Insights dashboards">
      <ul className="flex flex-wrap gap-1">
        {DASHBOARDS.map((d) => (
          <li key={d.slug}>
            <Link
              href={d.href}
              aria-current={d.slug === current ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
                d.slug === current ? "bg-surface-sunken text-content" : "text-content-2 hover:bg-surface-sunken hover:text-content"
              }`}
            >
              {d.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** "Download CSV" for one table, with the page's filters. A plain link: the route sends a file. */
export function ExportLink({ table, filters, label = "Download CSV" }: { table: TableKey; filters: InsightFilters; label?: string }) {
  const q = filterQuery(filters);
  const href = `/admin/insights/export${q ? `${q}&` : "?"}table=${table}`;
  return (
    <a href={href} download className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline">
      {label}
      <span className="sr-only">: {TABLES[table].title}</span>
    </a>
  );
}

/** A titled section of a dashboard with its CSV link. */
export function Section({
  id,
  title,
  lead,
  table,
  filters,
  children,
}: {
  id: string;
  title: string;
  lead?: ReactNode;
  table?: TableKey;
  filters: InsightFilters;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 id={`${id}-heading`} className="text-subtitle text-content">
            {title}
          </h2>
          {lead && <p className="max-w-reading text-sm text-content-2">{lead}</p>}
        </div>
        {table && <ExportLink table={table} filters={filters} label={`Download CSV`} />}
      </div>
      {children}
    </section>
  );
}

/** What each number means, at the foot of every dashboard. */
export function Definitions({ items }: { items: [term: string, text: string][] }) {
  return (
    <section aria-labelledby="definitions-heading" className="flex flex-col gap-3 border-t border-line pt-8">
      <h2 id="definitions-heading" className="text-subtitle text-content">
        What each number means
      </h2>
      <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(([term, text]) => (
          <div key={term}>
            <dt className="font-semibold text-content">{term}</dt>
            <dd className="text-sm text-content-2">{text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

async function Body({
  slug,
  searchParams,
  render,
}: {
  slug: DashboardSlug;
  searchParams: Promise<SearchParams>;
  render: (ctx: InsightsContext) => Promise<ReactNode>;
}) {
  // Each page checks for itself: a layout gate alone still streams the page (#240).
  const { supabase } = await requireAdmin();
  const d = dashboard(slug);
  const filters = parseFilters(await searchParams, todayInAccra(), d.filters);
  const [options, rollupsTo] = await Promise.all([loadFilterOptions(supabase), d.events ? loadRollupsTo(supabase) : null]);
  const content = await render({ supabase, filters });

  return (
    <div className="flex flex-col gap-8">
      <FilterBar action={d.href} filters={filters} allowed={d.filters} options={options} />
      <p className="text-sm text-content-2">
        <span className="font-semibold text-content">{describeRange(filters)}.</span>{" "}
        {d.events &&
          (rollupsTo
            ? `Daily totals are rebuilt each morning and currently run to ${formatDay(rollupsTo)}. Counts of people read live events.`
            : "Daily totals have not been built yet; the scheduled job builds them each morning. Counts of people read live events.")}
        {!d.events && "Read live from the platform's records."}
      </p>
      {content}
    </div>
  );
}

/**
 * The frame of every insights dashboard: title, links to the others, then the
 * filters and the dashboard itself inside Suspense (it reads the session).
 */
export function InsightsPage({
  slug,
  searchParams,
  render,
}: {
  slug: DashboardSlug;
  searchParams: Promise<SearchParams>;
  render: (ctx: InsightsContext) => Promise<ReactNode>;
}) {
  const d = dashboard(slug);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-content-2">Insights</p>
        <h1 className="text-h1 text-content">{d.title}</h1>
        <p className="max-w-reading text-lead text-content-2">{d.description}</p>
      </div>
      <InsightsNav current={slug} />
      <Suspense fallback={<div aria-busy="true" className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Body slug={slug} searchParams={searchParams} render={render} />
      </Suspense>
    </div>
  );
}
