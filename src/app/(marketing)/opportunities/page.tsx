import { Bookmark, LayoutGrid, Rows3 } from "lucide-react";
import { Suspense } from "react";
import { PageHeader } from "@/components/marketing/section";
import { OpportunityFiltersForm } from "@/components/opportunities/filters";
import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import { OpportunityTable } from "@/components/opportunities/opportunity-table";
import { opportunitiesPath, savedOpportunitiesPath } from "@/components/opportunities/paths";
import { SuggestedForYou } from "@/components/opportunities/suggested";
import { buttonClasses } from "@/components/ui/button";
import { AutoGrid, Container, MainWithRail } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { getViewer } from "@/lib/opportunities/learner";
import {
  filterOpportunities,
  filtersQuery,
  hasActiveFilters,
  parseFilters,
  type OpportunityFilters,
} from "@/lib/opportunities/model";
import { getAccraToday, getOpenOpportunities } from "@/lib/opportunities/public";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Opportunities",
  description:
    "Jobs, internships, scholarships, grants and gigs for young people in Ghana, each checked before it is listed. Filter by type, field, region or remote, and deadline.",
  path: opportunitiesPath,
  og: "opportunities",
});

/**
 * The public board (issue #159). The header is prerendered; the list reads
 * the filters from the query string inside <Suspense>, from cached open
 * posts (row level security hides drafts, closed posts and anything past its
 * deadline). Today's Accra date is cached until midnight with the posts, so
 * the list stays prerenderable and filters on the right day. Signed in
 * extras are their own islands.
 */
export default function OpportunitiesPage({ searchParams }: PageProps<"/opportunities">) {
  return (
    <>
      <PageHeader
        eyebrow="Earn"
        title="Opportunities"
        lead={
          <p>
            Jobs, internships, scholarships, grants and gigs, each checked by the SydCrest team or posted by a verified
            organisation. You apply directly with the organisation. Never pay anyone to apply.
          </p>
        }
      />
      <Container className="pb-16 xl:pb-24">
        <Suspense fallback={<BoardSkeleton />}>
          <Board searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}

async function Board({ searchParams }: Pick<PageProps<"/opportunities">, "searchParams">) {
  const filters = parseFilters(await searchParams);
  // Today comes from the same Accra midnight cache as the posts: the board
  // may be prerendered (partial prefetching), where reading the clock
  // directly is not allowed.
  const [all, today] = await Promise.all([getOpenOpportunities(), getAccraToday()]);
  const results = filterOpportunities(all, filters, today);

  return (
    <MainWithRail
      railFirst
      railLabel="Filters"
      rail={
        <>
          <OpportunityFiltersForm filters={filters} />
          <Suspense fallback={null}>
            <SavedLink />
          </Suspense>
        </>
      }
    >
      {!hasActiveFilters(filters) && all.length > 0 && (
        <Suspense fallback={null}>
          <SuggestedForYou />
        </Suspense>
      )}
      <section aria-labelledby="results-heading" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="results-heading" className="text-subtitle text-content">
              {hasActiveFilters(filters) ? "Matching opportunities" : "All open opportunities"}
            </h2>
            {all.length > 0 && (
              <p className="text-sm text-content-2" aria-live="polite">
                {results.length} {results.length === 1 ? "opportunity" : "opportunities"}
                {hasActiveFilters(filters) ? " match" : " open now"}
              </p>
            )}
          </div>
          {results.length > 0 && <ViewSwitch filters={filters} />}
        </div>
        <Results all={all.length} results={results} filters={filters} today={today} />
      </section>
    </MainWithRail>
  );
}

function Results({
  all,
  results,
  filters,
  today,
}: {
  all: number;
  results: ReturnType<typeof filterOpportunities>;
  filters: OpportunityFilters;
  today: string;
}) {
  if (all === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:p-8">
        <p className="font-semibold text-content">The first opportunities are on their way.</p>
        <p className="max-w-reading text-content-2">
          We list jobs, internships, scholarships, grants and gigs only after checking they are real and open, so this
          board starts small. While you wait, build the skills employers ask for.
        </p>
        <Link href="/roadmaps" className={buttonClasses("secondary")}>
          Explore the roadmaps
        </Link>
      </div>
    );
  }
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:p-8">
        <p className="font-semibold text-content">Nothing matches these filters right now.</p>
        <p className="max-w-reading text-content-2">Try a wider deadline, another region or remote, or clear the filters to see everything open.</p>
        <Link href={`${opportunitiesPath}${filtersQuery({ view: filters.view })}`} className={buttonClasses("secondary")}>
          Clear filters
        </Link>
      </div>
    );
  }
  if (filters.view === "table") {
    return <OpportunityTable rows={results} today={today} caption="Open opportunities" />;
  }
  return (
    <AutoGrid as="ul">
      {results.map((o) => (
        <li key={o.id}>
          <OpportunityCard o={o} today={today} headingLevel="h3" />
        </li>
      ))}
    </AutoGrid>
  );
}

function ViewSwitch({ filters }: { filters: OpportunityFilters }) {
  const views = [
    { view: "cards" as const, label: "Cards", Icon: LayoutGrid },
    { view: "table" as const, label: "Table", Icon: Rows3 },
  ];
  return (
    <nav aria-label="Show as" className="flex gap-1 rounded-md border border-line p-0.5">
      {views.map(({ view, label, Icon }) => (
        <Link
          key={view}
          href={`${opportunitiesPath}${filtersQuery({ ...filters, view })}`}
          aria-current={filters.view === view ? "page" : undefined}
          scroll={false}
          className={`inline-flex min-h-11 items-center gap-2 rounded px-3 text-sm font-semibold ${
            filters.view === view ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
          }`}
        >
          <Icon aria-hidden className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

/** Signed in learners get a way to their saved list; nothing for visitors. */
async function SavedLink() {
  const viewer = await getViewer();
  if (!viewer) {
    return (
      <p className="text-sm text-content-2">
        <Link href={`/login?next=${encodeURIComponent(opportunitiesPath)}`} className="font-semibold text-content-link underline">
          Sign in
        </Link>{" "}
        to save opportunities, track the ones you applied for and see suggestions for your path.
      </p>
    );
  }
  return (
    <Link href={savedOpportunitiesPath} className={buttonClasses("secondary", "w-full")}>
      <Bookmark aria-hidden className="size-4" />
      Your saved opportunities
    </Link>
  );
}

function BoardSkeleton() {
  return (
    <div aria-busy="true" className="flex min-h-dvh flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22.5rem] xl:gap-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:col-start-1 lg:row-start-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />
        ))}
      </div>
      <div className="h-80 animate-skeleton rounded-lg bg-surface-sunken lg:col-start-2 lg:row-start-1" />
    </div>
  );
}
