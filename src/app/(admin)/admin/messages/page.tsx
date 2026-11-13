import type { Metadata } from "next";
import { Suspense } from "react";
import { Composer } from "@/components/messaging/composer";
import { SentList } from "@/components/messaging/results";
import { requireAdmin } from "@/lib/admin";
import { DAILY_SENDS, SEND_CAP } from "@/lib/messaging/audience";
import { getStaffOptions, getTrackOptions, listSentMessages } from "@/lib/messaging/composer-server";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Messages", robots: { index: false } };

async function StaffComposer() {
  await requireAdmin();
  const [tracks, options] = await Promise.all([getTrackOptions(), getStaffOptions()]);
  return (
    <Composer
      chapterId={null}
      tracks={tracks}
      chapters={options.chapters}
      cohorts={options.cohorts}
      origin={SITE_URL}
      resultsBase="/admin/messages"
    />
  );
}

async function Sent() {
  await requireAdmin();
  const messages = await listSentMessages();
  return <SentList messages={messages} base="/admin/messages" />;
}

/** Staff: message an audience of members and see who came back (epic #320, #334). */
export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Messages</h1>
        <p className="max-w-reading text-content-2">
          Choose who to reach, check how many people that is, and send an in app notification or a WhatsApp message. Up to {SEND_CAP} people a
          message and {DAILY_SENDS.staff} messages a day. Chapter leads send to their own chapter from their chapter page.
        </p>
      </div>
      <div className="grid gap-10 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section aria-labelledby="compose-heading" className="flex flex-col gap-4">
          <h2 id="compose-heading" className="text-subtitle text-content">
            New message
          </h2>
          <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
            <StaffComposer />
          </Suspense>
        </section>
        <section aria-labelledby="sent-heading" className="flex flex-col gap-4">
          <h2 id="sent-heading" className="text-subtitle text-content">
            Sent
          </h2>
          <Suspense fallback={<div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />}>
            <Sent />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
