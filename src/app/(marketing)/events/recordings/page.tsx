import { RecordingCard } from "@/components/events/recording-card";
import { PageHeader } from "@/components/marketing/section";
import Link from "@/components/ui/link";
import { AutoGrid, Container } from "@/components/ui/layout";
import { getPublicRecordings } from "@/lib/events/public";
import { roadmapMetadata } from "@/lib/roadmaps/seo";

export const metadata = roadmapMetadata({
  title: "Event recordings",
  description: "Recordings of Launchpad Blueprint webinars and other SydCrest sessions. Watch the ones you missed, whenever suits you.",
  path: "/events/recordings",
  image: "/og/events",
});

/** Prerendered from cached, published recordings; refreshed when a host adds or publishes one. */
export default async function RecordingsPage() {
  const recordings = await getPublicRecordings();
  return (
    <>
      <PageHeader
        eyebrow="Recordings"
        title="Watch past sessions"
        lead={
          <p>
            Webinars and sessions you missed, recorded so you can catch up when it suits you. Each one opens where it is hosted, so nothing
            plays until you choose to watch.
          </p>
        }
      />
      <Container className="pb-16 xl:pb-24">
        {recordings.length === 0 ? (
          <div className="rounded-lg border border-line bg-surface-sunken p-6 xl:p-8">
            <h2 className="text-subtitle text-content">No recordings yet</h2>
            <p className="mt-2 max-w-reading text-body text-content-2">
              Launchpad Blueprint webinars are recorded, and each recording appears here once the session has run. In the meantime, see
              what is coming up.
            </p>
            <Link href="/events" className="mt-4 inline-flex min-h-11 items-center font-semibold text-content-link underline-offset-2 hover:underline">
              See upcoming events
            </Link>
          </div>
        ) : (
          <AutoGrid as="ul" min="lg">
            {recordings.map((r) => (
              <li key={r.id}>
                <RecordingCard recording={r} />
              </li>
            ))}
          </AutoGrid>
        )}
      </Container>
    </>
  );
}
