import Form from "next/form";
import { buttonClasses } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import Link from "@/components/ui/link";
import { DEADLINE_FILTERS, OPPORTUNITY_KINDS, hasActiveFilters, type OpportunityFilters } from "@/lib/opportunities/model";
import { REGIONS } from "@/lib/regions";
import { FIELD_CATEGORIES } from "@/lib/roadmap-admin";
import { opportunitiesPath } from "./paths";

/**
 * The board's filters as a plain GET form, so they work before any script
 * loads and every filtered view has a link of its own. Two columns on
 * phones, one in the rail from lg.
 */
export function OpportunityFiltersForm({ filters }: { filters: OpportunityFilters }) {
  return (
    <Form action={opportunitiesPath} prefetch={false} className="flex flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-4 xl:p-5" aria-label="Filter opportunities">
      <h2 className="text-h3 text-content">Filter</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <SelectField id="type" label="Type" defaultValue={filters.kind ?? ""}>
          <option value="">All types</option>
          {OPPORTUNITY_KINDS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.plural}
            </option>
          ))}
        </SelectField>
        <SelectField id="field" label="Field" defaultValue={filters.field ?? ""}>
          <option value="">All fields</option>
          {FIELD_CATEGORIES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="location" label="Location" defaultValue={filters.location ?? ""}>
          <option value="">Anywhere</option>
          <option value="remote">Remote</option>
          <optgroup label="Region">
            {REGIONS.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.label}
              </option>
            ))}
          </optgroup>
        </SelectField>
        <SelectField id="deadline" label="Deadline" defaultValue={filters.deadline ?? ""}>
          <option value="">Any deadline</option>
          {DEADLINE_FILTERS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </SelectField>
      </div>
      {filters.view === "table" && <input type="hidden" name="view" value="table" />}
      <div className="flex flex-wrap items-center gap-2">
        <button type="submit" className={buttonClasses("primary")}>
          Show results
        </button>
        {hasActiveFilters(filters) && (
          <Link href={filters.view === "table" ? `${opportunitiesPath}?view=table` : opportunitiesPath} className={buttonClasses("ghost")}>
            Clear filters
          </Link>
        )}
      </div>
    </Form>
  );
}
