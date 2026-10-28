import { Suspense } from "react";
import { ExpertCard } from "@/components/experts/expert-card";
import { FilterForm } from "@/components/experts/filter-form";
import { PageHeader } from "@/components/marketing/section";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { AutoGrid, Container, MainWithRail, SectionGrid } from "@/components/ui/layout";
import { EXPERT_CATEGORIES } from "@/lib/experts/categories";
import {
  facets,
  featuredExperts,
  filtersHref,
  isFiltered,
  parseFilters,
  rankExperts,
  type DirectoryExpert,
  type Filters,
} from "@/lib/experts/directory";
import { OFFER_KINDS, SOFT_LAUNCH_PRICE } from "@/lib/experts/offers";
import { getDirectory } from "@/lib/experts/queries";
import { expertsMetadata } from "@/lib/experts/seo";

export const metadata = expertsMetadata({
  title: "Find an expert",
  description:
    "Book time with people doing the work in tech: one to one sessions, reviews of your work, project help and gigs. Free during the soft launch.",
  path: "/experts",
});

/**
 * The header is prerendered; the directory reads the database and the URL at
 * request time inside <Suspense>, so new approvals and reviews show at once.
 */
export default function ExpertsPage({ searchParams }: PageProps<"/experts">) {
  return (
    <>
      <PageHeader
        eyebrow="Experts"
        title="Learn from people doing the work"
        lead={
          <p>
            Book a session, get your work reviewed or hire help for a project, from practitioners approved by the SydCrest team. {SOFT_LAUNCH_PRICE}.
          </p>
        }
      />
      <Container className="pb-16 xl:pb-24">
        <Suspense fallback={<DirectorySkeleton />}>
          <Directory searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}

async function Directory({ searchParams }: Pick<PageProps<"/experts">, "searchParams">) {
  const [params, experts] = await Promise.all([searchParams, getDirectory()]);
  if (experts.length === 0) return <NoExpertsYet />;

  const filters = parseFilters(params);
  const results = rankExperts(experts, filters);
  const options = facets(experts);
  const featured = isFiltered(filters) ? [] : featuredExperts(experts);

  return (
    <div className="flex flex-col gap-8 xl:gap-10">
      <CategoryNav filters={filters} counts={options.categories} />
      <MainWithRail railFirst sticky railLabel="Filters" rail={<FilterForm filters={filters} options={options} />}>
        {featured.length > 0 && (
          <section aria-labelledby="featured-heading" className="flex flex-col gap-4">
            <h2 id="featured-heading" className="text-subtitle text-content">
              Featured
            </h2>
            <AutoGrid as="ul">
              {featured.map((e) => (
                <li key={e.slug}>
                  <ExpertCard expert={e} featured />
                </li>
              ))}
            </AutoGrid>
          </section>
        )}
        <Results filters={filters} results={results} total={experts.length} />
      </MainWithRail>
    </div>
  );
}

function CategoryNav({ filters, counts }: { filters: Filters; counts: Map<string, number> }) {
  const listed = EXPERT_CATEGORIES.filter((c) => counts.has(c.slug));
  if (listed.length === 0) return null;
  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
      active ? "border-action bg-action text-action-fg" : "border-line bg-surface text-content hover:bg-surface-sunken"
    }`;
  return (
    <nav aria-label="Categories">
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        <li>
          <Link href={filtersHref({ ...filters, category: "" })} aria-current={!filters.category ? "page" : undefined} className={chip(!filters.category)}>
            All
          </Link>
        </li>
        {listed.map((c) => (
          <li key={c.slug}>
            <Link
              href={filtersHref({ ...filters, category: c.slug })}
              aria-current={filters.category === c.slug ? "page" : undefined}
              className={chip(filters.category === c.slug)}
            >
              {c.label}
              <span className="text-xs font-normal opacity-80">{counts.get(c.slug)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Results({ filters, results, total }: { filters: Filters; results: DirectoryExpert[]; total: number }) {
  const filtered = isFiltered(filters);
  return (
    <section aria-labelledby="results-heading" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="results-heading" className="text-subtitle text-content">
          {filtered ? "Matching experts" : "All experts"}
        </h2>
        <p className="text-sm text-content-2" aria-live="polite">
          {filtered ? `${results.length} of ${total}` : total} {total === 1 && !filtered ? "expert" : "experts"}
        </p>
      </div>
      {results.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-6 xl:p-8">
          <p className="font-semibold text-content">No experts match these filters.</p>
          <p className="max-w-reading text-content-2">
            Try fewer filters or a different word. New experts are added as they are approved, so check back soon.
          </p>
          <Link href="/experts" className={buttonClasses("secondary")}>
            Clear filters
          </Link>
        </div>
      ) : (
        <AutoGrid as="ul">
          {results.map((e) => (
            <li key={e.slug}>
              <ExpertCard expert={e} />
            </li>
          ))}
        </AutoGrid>
      )}
    </section>
  );
}

/** Honest, and still a full composition on a wide screen: what is coming, what you will be able to book. */
function NoExpertsYet() {
  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-12">
      <div className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface-sunken p-6 xl:p-8">
        <h2 className="text-subtitle text-content">The first experts are being approved</h2>
        <p className="text-content-2">
          Every expert applies and is checked by the SydCrest team before they appear here. No one has been approved yet, so
          there is no one to book today. This page fills up as they are.
        </p>
        <p className="text-content-2">Meanwhile, every roadmap is free to follow.</p>
        <Link href="/roadmaps" className={buttonClasses("primary")}>
          Browse roadmaps
        </Link>
      </div>
      <section aria-labelledby="kinds-heading" className="flex flex-col gap-4">
        <h2 id="kinds-heading" className="text-h3 text-content">
          What you will be able to book
        </h2>
        <SectionGrid cols={2} as="ul">
          {OFFER_KINDS.map((k) => (
            <li key={k.kind} className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-4 xl:p-5">
              <span className="font-semibold text-content">{k.label}</span>
              <span className="text-sm text-content-2">{k.blurb}</span>
            </li>
          ))}
        </SectionGrid>
      </section>
    </div>
  );
}

function DirectorySkeleton() {
  return (
    <div aria-busy="true" className="flex animate-pulse flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-56 rounded-lg bg-surface-sunken" />
        ))}
      </div>
      <div className="hidden h-96 rounded-lg bg-surface-sunken lg:block" />
    </div>
  );
}
