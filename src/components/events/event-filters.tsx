import { buttonClasses } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import Link from "@/components/ui/link";
import { hasFilters, type EventFilters } from "@/lib/events/filters";
import { EVENT_KINDS } from "@/lib/events/labels";
import type { EventChapter } from "@/lib/events/public";

/**
 * Filters as a plain GET form: works without JavaScript, and every filtered
 * list has its own shareable address. Native selects on purpose.
 */
export function EventFilterForm({ filters, chapters }: { filters: EventFilters; chapters: EventChapter[] }) {
  return (
    <form method="get" action="/events" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <h2 className="text-h3 text-content">Filter events</h2>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <SelectField id="kind" label="Type" defaultValue={filters.kind ?? ""}>
          <option value="">All types</option>
          {EVENT_KINDS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.plural}
            </option>
          ))}
        </SelectField>
        <SelectField id="format" label="How to attend" defaultValue={filters.format ?? ""}>
          <option value="">In person or online</option>
          <option value="in_person">In person</option>
          <option value="online">Online</option>
        </SelectField>
        <SelectField id="chapter" label="Chapter" defaultValue={filters.chapter ?? ""} disabled={chapters.length === 0}>
          <option value="">{chapters.length ? "All chapters" : "No chapter events yet"}</option>
          {chapters.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </SelectField>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="submit" className={buttonClasses("primary")}>
          Show events
        </button>
        {hasFilters(filters) && (
          <Link href="/events" className={buttonClasses("ghost")}>
            Clear filters
          </Link>
        )}
      </div>
    </form>
  );
}
