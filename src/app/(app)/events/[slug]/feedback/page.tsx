import type { Metadata } from "next";
import { Suspense } from "react";
import { EventPageHeader } from "@/components/events/event-page-header";
import { FeedbackForm } from "@/components/events/feedback-form";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import type { FeedbackInput } from "@/lib/events/forms";
import { requireEventPage } from "@/lib/events/session";
import { checkInOpen, feedbackOpen } from "@/lib/events/time";
import { getEventViewer } from "@/lib/events/viewer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Event feedback", robots: { index: false } };

export default function FeedbackPage({ params }: PageProps<"/events/[slug]/feedback">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" aria-busy="true" />}>
      <Feedback params={params} />
    </Suspense>
  );
}

async function Feedback({ params }: Pick<PageProps<"/events/[slug]/feedback">, "params">) {
  const { slug } = await params;
  const { event, user } = await requireEventPage(slug, "feedback");
  const viewer = await getEventViewer(event.id);
  const checkedIn = viewer.signedIn && Boolean(viewer.checkedInAt);
  const now = new Date();

  let saved: FeedbackInput | null = null;
  if (checkedIn) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("event_feedback")
      .select("confidence, usefulness, clarity, logistics, recommend, attend_again, comment, quote_consent")
      .eq("event_id", event.id)
      .eq("profile_id", user.id)
      .maybeSingle();
    saved = data;
  }

  const rail = (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">
      <h2 className="text-h3 text-content">Why we ask</h2>
      <p>
        Your answers shape the next event: what to teach, how long each part runs, and whether we start on time. Hosts see the totals and
        your comment, never your phone number or email.
      </p>
      <p>Every question is optional. You can come back and change your answers.</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <EventPageHeader event={event} title={saved ? "Your feedback" : "How was it?"} lead={checkedIn ? "Two minutes, and every question is optional." : undefined} />
      <MainWithRail railLabel="About this feedback" rail={rail}>
        <section className="rounded-lg border border-line bg-surface p-5 md:p-6 xl:p-8" aria-label="Feedback form">
          {!checkedIn ? (
            <div className="flex flex-col gap-3">
              <p className="text-subtitle text-content">Feedback is for people who checked in</p>
              <p className="max-w-reading text-body text-content-2">
                {checkInOpen(event, now)
                  ? "Check in with the code from the host first, then come back here."
                  : "Only people who checked in at the event can give feedback on it."}
              </p>
              {checkInOpen(event, now) ? (
                <Link href={`/events/${slug}/check-in`} className={buttonClasses("primary", "self-start")}>
                  Check in
                </Link>
              ) : (
                <Link href={`/events/${slug}`} className={buttonClasses("secondary", "self-start")}>
                  Back to the event
                </Link>
              )}
            </div>
          ) : !feedbackOpen(event, now) ? (
            <p className="text-body text-content-2">Feedback opens when the event starts. Come back once it is under way or after it ends.</p>
          ) : (
            <FeedbackForm eventId={event.id} saved={saved} />
          )}
        </section>
      </MainWithRail>
    </div>
  );
}
