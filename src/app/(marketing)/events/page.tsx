import { Suspense } from "react";
import { connection } from "next/server";
import { PlayCircle } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { EventFilterForm } from "@/components/events/event-filters";
import { PageHeader } from "@/components/marketing/section";
import Link from "@/components/ui/link";
import { AutoGrid, Container, MainWithRail } from "@/components/ui/layout";
import { hasFilters, matchesFilters, parseEventFilters, splitByTime } from "@/lib/events/filters";
import { EVENT_KINDS } from "@/lib/events/labels";
import { getEventChapters, getPublicEvents } from "@/lib/events/public";
import { roadmapMetadata } from "@/lib/roadmaps/seo";

export const metadata = roadmapMetadata({
  title: "Events",
  description:
    "Skillshops in northern chapter cities, Launchpad Blueprint webinars, flagship events and campus activations. RSVP, check in and catch up on recordings.",
  path: "/events",
  image: "/og/events",
});

/** The header is prerendered; the lists depend on the filters and the clock, so they stream in. */
export default function EventsPage({ searchParams }: PageProps<"/events">) {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Meet, learn and build together"
        lead={
          <p>
            Hands on Skillshops in chapter cities, online Launchpad Blueprint webinars, and bigger days with expert speakers. RSVP to save
            your seat, check in on the day, and watch recordings of past sessions.
          </p>
        }
        aside={
          <dl className="grid gap-3 sm:grid-cols-2">
            {EVENT_KINDS.map((k) => (
              <div key={k.value} className="rounded-lg border border-line bg-surface p-4">
                <dt className="font-semibold text-content">{k.plural}</dt>
                <dd className="mt-1 text-sm text-content-2">{k.blurb}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <Container className="pb-16 xl:pb-24">
        <Suspense fallback={<ListSkeleton />}>
          <EventLists searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}

async function EventLists({ searchParams }: Pick<PageProps<"/events">, "searchParams">) {
  const [params, events, chapters] = await Promise.all([searchParams, getPublicEvents(), getEventChapters()]);
  await connection();
  const filters = parseEventFilters(params, chapters.map((c) => c.slug));
  const filtered = events.filter((e) => matchesFilters(e, filters));
  const { upcoming, past } = splitByTime(filtered);
  const filtering = hasFilters(filters);

  return (
    <MainWithRail
      railFirst
      sticky
      railLabel="Filter events"
      rail={
        <>
          <EventFilterForm filters={filters} chapters={chapters} />
          <Link
            href="/events/recordings"
            className="flex min-h-11 items-center gap-3 rounded-lg border border-line bg-surface p-4 text-sm transition-colors hover:border-line-strong hover:bg-surface-sunken"
          >
            <PlayCircle aria-hidden className="size-6 shrink-0 text-content-3" />
            <span>
              <span className="block font-semibold text-content">Recordings library</span>
              <span className="text-content-2">Watch webinars and sessions you missed.</span>
            </span>
          </Link>
        </>
      }
    >
      {events.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface-sunken p-6 xl:p-8">
          <h2 className="text-subtitle text-content">The first events are being planned</h2>
          <p className="mt-2 max-w-reading text-body text-content-2">
            Skillshops, webinars and other events appear here as soon as they are announced. Until then, start on a roadmap so you are ready
            for the first session.
          </p>
          <Link href="/roadmaps" className="mt-4 inline-flex min-h-11 items-center font-semibold text-content-link underline-offset-2 hover:underline">
            Browse roadmaps
          </Link>
        </div>
      ) : (
        <>
          <section aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="text-h2 lg:text-subtitle text-content">
              Upcoming
            </h2>
            {upcoming.length === 0 ? (
              <div className="mt-4 rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
                <p className="font-semibold text-content">{filtering ? "No upcoming events match these filters." : "Nothing is scheduled right now."}</p>
                <p className="mt-1">
                  {filtering ? (
                    <Link href="/events" className="font-semibold text-content-link underline-offset-2 hover:underline">
                      Show all events
                    </Link>
                  ) : (
                    "New events appear here as soon as they are announced."
                  )}
                </p>
              </div>
            ) : (
              <AutoGrid as="ul" className="mt-4">
                {upcoming.map((e) => (
                  <li key={e.id}>
                    <EventCard event={e} />
                  </li>
                ))}
              </AutoGrid>
            )}
          </section>

          {past.length > 0 && (
            <section aria-labelledby="past-heading">
              <h2 id="past-heading" className="text-h2 lg:text-subtitle text-content">
                Past events
              </h2>
              <AutoGrid as="ul" className="mt-4">
                {past.slice(0, 24).map((e) => (
                  <li key={e.id}>
                    <EventCard event={e} past />
                  </li>
                ))}
              </AutoGrid>
              {past.length > 24 && (
                <p className="mt-4 text-sm text-content-2">Showing the latest 24 of {past.length}. Use the filters to narrow them.</p>
              )}
            </section>
          )}
        </>
      )}
    </MainWithRail>
  );
}

function ListSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]" aria-busy="true">
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-40 animate-skeleton rounded-lg bg-surface-sunken" />
        ))}
      </div>
      <div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />
    </div>
  );
}
