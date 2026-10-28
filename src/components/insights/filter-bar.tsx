import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import type { FilterOptions, Option } from "@/lib/insights/data";
import { DEVICES, PRESETS, hasFilters, type FilterKey, type InsightFilters } from "@/lib/insights/filters";

const SELECT =
  "min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content";

function Select({ id, label, value, all, options }: { id: string; label: string; value: string | null; all: string; options: readonly Option[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={`f-${id}`} className="text-sm font-semibold text-content">
        {label}
      </label>
      <select id={`f-${id}`} name={id} defaultValue={value ?? ""} className={SELECT}>
        <option value="">{all}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * The filters above every dashboard: a plain GET form, so it works without
 * JavaScript and every view is a link. Shows only the filters the dashboard
 * supports. A custom range uses the two dates; a preset ignores them.
 */
export function FilterBar({
  action,
  filters,
  allowed,
  options,
}: {
  action: string;
  filters: InsightFilters;
  allowed: FilterKey[];
  options: FilterOptions;
}) {
  const show = new Set(allowed);
  return (
    <form action={action} method="get" aria-label="Filters" className="rounded-lg border border-line bg-surface-sunken p-4 xl:p-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        <div className="col-span-2 flex min-w-0 flex-col gap-1.5 md:col-span-1">
          <label htmlFor="f-range" className="text-sm font-semibold text-content">
            Dates
          </label>
          <select id="f-range" name="range" defaultValue={filters.preset ? String(filters.preset) : "custom"} className={SELECT}>
            {PRESETS.map((p) => (
              <option key={p} value={p}>
                Last {p} days
              </option>
            ))}
            <option value="custom">Custom dates</option>
          </select>
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="f-from" className="text-sm font-semibold text-content">
            From
          </label>
          <input id="f-from" name="from" type="date" defaultValue={filters.from} className={SELECT} />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="f-to" className="text-sm font-semibold text-content">
            To
          </label>
          <input id="f-to" name="to" type="date" defaultValue={filters.to} className={SELECT} />
        </div>
        {show.has("track") && <Select id="track" label="Track" value={filters.track} all="All tracks" options={options.tracks} />}
        {show.has("region") && <Select id="region" label="Region" value={filters.region} all="All regions" options={options.regions} />}
        {show.has("chapter") && <Select id="chapter" label="Chapter" value={filters.chapter} all="All chapters" options={options.chapters} />}
        {show.has("cohort") && <Select id="cohort" label="Cohort" value={filters.cohort} all="All cohorts" options={options.cohorts} />}
        {show.has("device") && <Select id="device" label="Device" value={filters.device} all="All devices" options={DEVICES} />}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" className={buttonClasses("primary")}>
          Apply filters
        </button>
        {(hasFilters(filters) || filters.preset !== 30) && (
          <Link href={action} className={buttonClasses("ghost")}>
            Clear filters
          </Link>
        )}
        <p className="text-sm text-content-2">Pick Custom dates to use From and To. Ranges can be up to 400 days.</p>
      </div>
    </form>
  );
}
