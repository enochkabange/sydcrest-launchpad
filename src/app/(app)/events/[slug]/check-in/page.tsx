import type { Metadata } from "next";
import { Suspense } from "react";
import { CircleCheck } from "lucide-react";
import { CheckInForm } from "@/components/events/check-in-form";
import { EventFacts } from "@/components/events/event-facts";
import { EventPageHeader } from "@/components/events/event-page-header";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { requireEventPage } from "@/lib/events/session";
import { checkInOpen, checkInOpensAt, eventPhase, feedbackOpen, formatEventDayShort, formatEventTime } from "@/lib/events/time";
import { getEventViewer } from "@/lib/events/viewer";

export const metadata: Metadata = { title: "Check in", robots: { index: false } };

export default function CheckInPage({ params }: PageProps<"/events/[slug]/check-in">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CheckIn params={params} />
    </Suspense>
  );
}

async function CheckIn({ params }: Pick<PageProps<"/events/[slug]/check-in">, "params">) {
  const { slug } = await params;
  const { event } = await requireEventPage(slug, "check-in");
  const viewer = await getEventViewer(event.id);
  const checkedInAt = viewer.signedIn ? viewer.checkedInAt : null;
  const now = new Date();
  const phase = eventPhase(event, now);
  const open = checkInOpen(event, now);

  return (
    <div className="flex flex-col gap-8">
      <EventPageHeader event={event} title={checkedInAt ? "You are checked in" : "Check in"} />
      <MainWithRail
        railLabel="Event details"
        rail={
          <div className="rounded-lg border border-line bg-surface p-5">
            <EventFacts event={event} calendar={false} />
          </div>
        }
      >
        <section className="rounded-lg border border-line bg-surface p-5 md:p-6 xl:p-8" aria-label="Check in">
          {checkedInAt ? (
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-2 text-subtitle text-success-fg">
                <CircleCheck aria-hidden className="size-7" /> Welcome, you are in.
              </p>
              <p className="max-w-reading text-body text-content-2">
                Checked in at {formatEventTime(checkedInAt)} GMT. Enjoy the session.
                {feedbackOpen(event, now) ? " When it ends, tell us how it went." : " Once it starts, you can tell us how it is going."}
              </p>
              <div className="flex flex-wrap gap-3">
                {feedbackOpen(event, now) && (
                  <Link href={`/events/${slug}/feedback`} className={buttonClasses("primary")}>
                    Give feedback
                  </Link>
                )}
                <Link href="/roadmaps" className={buttonClasses("secondary")}>
                  Pick a roadmap
                </Link>
                <Link href={`/events/${slug}`} className={buttonClasses("ghost")}>
                  Back to the event
                </Link>
              </div>
            </div>
          ) : phase === "cancelled" ? (
            <p className="text-body text-content-2">This event was cancelled, so there is nothing to check in to.</p>
          ) : phase === "draft" ? (
            <p className="text-body text-content-2">This event is not published yet. Check in opens once it is.</p>
          ) : !open && now < new Date(event.starts_at) ? (
            <div className="flex flex-col gap-2">
              <p className="text-subtitle text-content">Check in is not open yet</p>
              <p className="max-w-reading text-body text-content-2">
                It opens on {formatEventDayShort(checkInOpensAt(event))} at {formatEventTime(checkInOpensAt(event))} GMT, two hours before
                the start. Come back to this page then.
              </p>
            </div>
          ) : !open ? (
            <div className="flex flex-col gap-2">
              <p className="text-subtitle text-content">Check in has closed</p>
              <p className="max-w-reading text-body text-content-2">
                Check in closes two hours after the end. If you were there and could not check in, ask the host to check you in.
              </p>
            </div>
          ) : (
            <div className="flex max-w-xl flex-col gap-4">
              <p className="text-body text-content-2">
                The host shows the code at the venue or reads it out in the webinar. You do not need to have RSVPed.
              </p>
              <CheckInForm eventId={event.id} />
            </div>
          )}
        </section>
      </MainWithRail>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true">
      <div className="h-10 w-2/3 animate-skeleton rounded bg-surface-sunken" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />
        <div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />
      </div>
    </div>
  );
}
