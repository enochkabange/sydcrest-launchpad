"use client";

import { useId, useState, type ReactNode } from "react";
import { matchesFilters, NO_FILTERS, type Facets, type Filters } from "@/lib/roadmaps/catalogue";

type Option = { id: string; label: string };

/**
 * The filter bar and the cards it filters. Cards arrive rendered on the
 * server (with their progress islands); this only hides the ones that do not
 * match, so filtering never refetches anything.
 */
export function RoadmapFilters({
  items,
  options,
}: {
  items: { slug: string; facets: Facets; card: ReactNode }[];
  options: { fields: Option[]; bands: Option[]; levels: Option[]; phone: boolean };
}) {
  const id = useId();
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const shown = items.filter((i) => matchesFilters(i.facets, filters));
  const active = filters.field || filters.band || filters.level || filters.phone;
  const set = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));

  const select = "min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-content";
  const label = "flex flex-col gap-1 text-sm font-semibold text-content-2";

  return (
    <div>
      <form
        role="search"
        aria-label="Filter roadmaps"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-3 rounded-lg border border-line bg-surface-sunken p-4 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto_auto] lg:items-end"
      >
        <label className={label} htmlFor={`${id}-field`}>
          Field
          <select id={`${id}-field`} className={select} value={filters.field} onChange={(e) => set({ field: e.target.value })}>
            <option value="">Every field</option>
            {options.fields.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label} htmlFor={`${id}-band`}>
          Time to finish
          <select id={`${id}-band`} className={select} value={filters.band} onChange={(e) => set({ band: e.target.value })}>
            <option value="">Any length</option>
            {options.bands.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label} htmlFor={`${id}-level`}>
          Level
          <select id={`${id}-level`} className={select} value={filters.level} onChange={(e) => set({ level: e.target.value })}>
            <option value="">Every level</option>
            {options.levels.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        {options.phone && (
          <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-content">
            <input type="checkbox" className="size-5" checked={filters.phone} onChange={(e) => set({ phone: e.target.checked })} />
            Works on a phone
          </label>
        )}
        <button
          type="button"
          disabled={!active}
          onClick={() => setFilters(NO_FILTERS)}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-4 text-sm font-semibold text-content-2 hover:bg-surface hover:text-content disabled:opacity-50"
        >
          Clear filters
        </button>
      </form>

      <p className="mt-4 text-sm text-content-2" aria-live="polite" data-testid="roadmap-count">
        {active ? `${shown.length} of ${items.length} roadmaps match.` : `${items.length} roadmaps.`}
      </p>

      {shown.length === 0 && (
        <div className="mt-4 max-w-reading rounded-lg border border-dashed border-line-strong p-5 text-content-2">
          <p className="font-semibold text-content">No roadmap matches every filter.</p>
          <p className="mt-1">Try a different field or length, or clear the filters to see them all.</p>
        </div>
      )}
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6" hidden={shown.length === 0}>
        {items.map((item) => (
          <li key={item.slug} hidden={!matchesFilters(item.facets, filters)}>
            {item.card}
          </li>
        ))}
      </ul>
    </div>
  );
}
