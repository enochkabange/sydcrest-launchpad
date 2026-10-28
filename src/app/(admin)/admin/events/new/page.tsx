import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { EVENT_KINDS } from "@/lib/events/labels";
import { chapterOptions } from "../chapters";
import { EventForm } from "../event-form";

export const metadata: Metadata = { title: "New event" };

async function Form() {
  await requireAdmin();
  return <EventForm chapters={await chapterOptions()} />;
}

/** The form checks the admin role (the layout gate does not stop a page rendering); createEvent checks it again. */
export default function NewEventPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/events" className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to events
      </Link>
      <h1 className="text-title text-content">New event</h1>
      <MainWithRail
        railLabel="Event types"
        rail={
          <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 text-sm">
            <h2 className="text-h3 text-content">Event types</h2>
            <dl className="flex flex-col gap-3">
              {EVENT_KINDS.map((k) => (
                <div key={k.value}>
                  <dt className="font-semibold text-content">{k.label}</dt>
                  <dd className="text-content-2">{k.blurb}</dd>
                </div>
              ))}
            </dl>
            <p className="text-content-2">New events start as drafts. Every event gets its own check in code when it is created.</p>
          </div>
        }
      >
        <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <Form />
        </Suspense>
      </MainWithRail>
    </div>
  );
}
