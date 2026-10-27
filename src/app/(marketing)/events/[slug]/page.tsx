import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PlayCircle } from "lucide-react";
import { SectionAccent } from "@/components/brand/illustrations";
import { EventFacts } from "@/components/events/event-facts";
import { RecordingCard } from "@/components/events/recording-card";
import { RsvpPanel, RsvpPanelSkeleton } from "@/components/events/rsvp-panel";
import Link from "@/components/ui/link";
import { Container, MainWithRail } from "@/components/ui/layout";
import { kindLabel } from "@/lib/events/labels";
import { eventPath, getEventRecordings, getPublicEvent, getPublicEvents, PLACEHOLDER_EVENT_SLUG } from "@/lib/events/public";
import { eventJsonLd, jsonLdString } from "@/lib/events/structured-data";
import { formatEventDay } from "@/lib/events/time";
import { roadmapMetadata } from "@/lib/roadmaps/seo";
import { SITE_URL } from "@/lib/site";

/** Public events are prerendered at build; one published later renders on its first visit, then is cached. */
export async function generateStaticParams() {
  const events = await getPublicEvents();
  return events.length ? events.map(({ slug }) => ({ slug })) : [{ slug: PLACEHOLDER_EVENT_SLUG }];
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) return { title: "Event not found", robots: { index: false } };
  const when = formatEventDay(event.starts_at);
  return roadmapMetadata({
    title: event.status === "cancelled" ? `${event.title} (cancelled)` : event.title,
    description: event.summary ?? `${kindLabel(event.kind)} on ${when}. RSVP on SydCrest Launchpad.`,
    path: eventPath(slug),
    image: `/og/events/${slug}`,
  });
}

export default function EventPage({ params }: PageProps<"/events/[slug]">) {
  return (
    <Suspense fallback={<EventSkeleton />}>
      <EventDetail params={params} />
    </Suspense>
  );
}

/** Blank lines separate paragraphs; single line breaks are kept. */
function Paragraphs({ text }: { text: string }) {
  return (
    <div className="flex max-w-reading flex-col gap-4 text-body text-content-2">
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="whitespace-pre-line">
            {p}
          </p>
        ))}
    </div>
  );
}

async function EventDetail({ params }: Pick<PageProps<"/events/[slug]">, "params">) {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) notFound();
  const recordings = event.recording_count > 0 ? await getEventRecordings(slug) : [];
  const pageUrl = new URL(eventPath(slug), SITE_URL).toString();
  const jsonLd = eventJsonLd(event, {
    pageUrl,
    imageUrl: new URL(`/og/events/${slug}`, SITE_URL).toString(),
    siteUrl: SITE_URL,
  });

  return (
    <Container className="pt-6 pb-16 md:pt-10 xl:pt-14 xl:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href="/events" className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-content">
          Events
        </Link>
      </nav>

      <header className="mt-2 max-w-4xl">
        <SectionAccent />
        <p className="mt-3 text-xs font-bold tracking-widest text-content-3 uppercase">
          {kindLabel(event.kind)}
          {event.chapter ? `, ${event.chapter.name}` : ""}
        </p>
        <h1 className={`mt-1 text-title text-content ${event.status === "cancelled" ? "line-through decoration-2" : ""}`}>{event.title}</h1>
        {event.status === "cancelled" && <p className="mt-2 font-semibold text-danger-fg">Cancelled</p>}
        {event.summary && <p className="mt-3 max-w-reading text-lead text-content-2">{event.summary}</p>}
      </header>

      <MainWithRail
        className="mt-8 xl:mt-12"
        railFirst
        sticky
        railLabel="Date, place and RSVP"
        rail={
          <div className="flex flex-col gap-6 rounded-lg border border-line bg-surface p-5 xl:p-6">
            <EventFacts event={event} />
            <div className="border-t border-line pt-5">
              <Suspense fallback={<RsvpPanelSkeleton />}>
                <RsvpPanel event={event} />
              </Suspense>
            </div>
          </div>
        }
      >
        <section aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-h2 lg:text-subtitle text-content">
            About this event
          </h2>
          <div className="mt-4">
            {event.description ? (
              <Paragraphs text={event.description} />
            ) : (
              <p className="max-w-reading text-body text-content-2">
                {event.summary ? "The full programme will be shared here closer to the day." : "Details are coming soon."}
              </p>
            )}
          </div>
        </section>

        {recordings.length > 0 && (
          <section aria-labelledby="recording-heading">
            <h2 id="recording-heading" className="flex items-center gap-2 text-h2 lg:text-subtitle text-content">
              <PlayCircle aria-hidden className="size-6 text-content-3" /> {recordings.length === 1 ? "Recording" : "Recordings"}
            </h2>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {recordings.map((r) => (
                <li key={r.id}>
                  <RecordingCard recording={r} showEvent={false} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="after-heading" className="rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
          <h2 id="after-heading" className="text-h3 text-content">
            Keep going after the event
          </h2>
          <p className="mt-2 max-w-reading text-body text-content-2">
            Every event ends with a next step. Pick a roadmap and follow it at your own pace, or find out where to start with five quick
            questions.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/roadmaps" className="inline-flex min-h-11 items-center font-semibold text-content-link underline-offset-2 hover:underline">
              Browse roadmaps
            </Link>
            <Link href="/start" className="inline-flex min-h-11 items-center font-semibold text-content-link underline-offset-2 hover:underline">
              Where do I start?
            </Link>
            <Link href="/events/recordings" className="inline-flex min-h-11 items-center font-semibold text-content-link underline-offset-2 hover:underline">
              Watch past sessions
            </Link>
          </div>
        </section>
      </MainWithRail>
    </Container>
  );
}

function EventSkeleton() {
  return (
    <div className="mx-auto w-full max-w-page px-4 pt-6 pb-16 md:px-8 md:pt-10" aria-busy="true">
      <div className="h-4 w-16 animate-skeleton rounded bg-surface-sunken" />
      <div className="mt-8 h-10 w-2/3 animate-skeleton rounded bg-surface-sunken" />
      <div className="mt-4 h-5 w-full max-w-2xl animate-skeleton rounded bg-surface-sunken" />
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />
        <div className="h-80 animate-skeleton rounded-lg bg-surface-sunken" />
      </div>
    </div>
  );
}
