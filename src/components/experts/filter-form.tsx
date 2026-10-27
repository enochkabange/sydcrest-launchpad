import Form from "next/form";
import { Search } from "lucide-react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { EXPERT_CATEGORIES } from "@/lib/experts/categories";
import { AVAILABILITY, RATINGS, SORTS, filtersHref, isFiltered, type Filters, type facets } from "@/lib/experts/directory";
import { OFFER_KINDS } from "@/lib/experts/offers";

/**
 * The directory filters: a GET form, so every filtered list is a shareable
 * URL and the form works before any script loads. Two columns of selects on
 * phones (above the list), one column in the rail from lg. Keyed by the
 * current filters so the controls reset after navigation.
 */
export function FilterForm({ filters, options }: { filters: Filters; options: ReturnType<typeof facets> }) {
  const skills = filters.skill && !options.skills.includes(filters.skill) ? [filters.skill, ...options.skills] : options.skills;
  return (
    <Form
      key={filtersHref(filters)}
      action="/experts"
      role="search"
      aria-label="Find an expert"
      className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 xl:p-5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="q" className="text-sm font-semibold text-content">
          Search
        </label>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-content-3" />
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={filters.q}
            placeholder="Skill, name or service"
            maxLength={100}
            className="min-h-11 w-full rounded-md border border-line-strong bg-surface pr-3 pl-9 text-base text-content placeholder:text-content-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <SelectField id="skill" label="Skill" defaultValue={filters.skill}>
          <option value="">Any skill</option>
          {skills.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectField>
        <SelectField id="type" label="Service type" defaultValue={filters.kind}>
          <option value="">Any service</option>
          {OFFER_KINDS.map((k) => (
            <option key={k.kind} value={k.kind}>
              {k.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="category" label="Category" defaultValue={filters.category}>
          <option value="">All categories</option>
          {EXPERT_CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="availability" label="Availability" defaultValue={filters.availability}>
          <option value="">Anyone</option>
          {AVAILABILITY.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="rating" label="Rating" defaultValue={filters.minRating === null ? "" : String(filters.minRating)}>
          <option value="">Any rating</option>
          {RATINGS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="sort" label="Sort by" defaultValue={filters.sort}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className={buttonClasses("primary", "flex-1")}>
          Show experts
        </button>
        {(isFiltered(filters) || filters.sort !== "recommended") && (
          <Link href="/experts" className={buttonClasses("ghost")}>
            Clear filters
          </Link>
        )}
      </div>
    </Form>
  );
}
