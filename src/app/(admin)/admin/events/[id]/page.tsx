import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { displayCode } from "@/lib/events/forms";
import { hasJoinLink, statusLabel } from "@/lib/events/labels";
import { formatDuration } from "@/lib/events/time";
import { Badge } from "../../roadmaps/fields";
import { JoinLinkForm, RecordingForm } from "../access-forms";
import { deleteRecording, setRecordingPublished } from "../actions";
import { chapterOptions } from "../chapters";
import { EventForm } from "../event-form";

export const metadata: Metadata = { title: "Edit event" };

export default function EditEventPage({ params }: PageProps<"/admin/events/[id]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Editor params={params} />
    </Suspense>
  );
}

async function Editor({ params }: Pick<PageProps<"/admin/events/[id]">, "params">) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: event } = await supabase
    .from("community_events")
    .select("id, slug, kind, title, summary, description, format, starts_at, ends_at, venue_name, venue_address, city, region, chapter_id, capacity, status")
    .eq("id", id)
    .maybeSingle();
  if (!event) notFound();
  const [chapters, access, recordings] = await Promise.all([
    chapterOptions(),
    supabase.from("event_access").select("join_url, checkin_code").eq("event_id", id).maybeSingle(),
    supabase.from("event_recordings").select("id, title, video_url, duration_minutes, is_published").eq("event_id", id).order("created_at"),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/events" className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to events
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-title text-content">{event.title}</h1>
        <Badge tone={event.status === "published" ? "success" : event.status === "cancelled" ? "danger" : "neutral"}>{statusLabel(event.status)}</Badge>
      </div>
      <MainWithRail
        railLabel="Access, hosting and recordings"
        rail={
          <>
            <section className="flex flex-col gap-3 rounded-lg border border-line p-5" aria-labelledby="hosting-heading">
              <h2 id="hosting-heading" className="text-h3 text-content">
                Hosting
              </h2>
              {access.data && (
                <p className="text-sm text-content-2">
                  Check in code <span className="font-mono font-semibold text-content">{displayCode(access.data.checkin_code)}</span>
                </p>
              )}
              <div className="flex flex-wrap gap-x-5">
                <Link href={`/events/${event.slug}/host`} className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link">
                  Host tools
                </Link>
                {event.status !== "draft" && (
                  <Link href={`/events/${event.slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link">
                    Public page
                  </Link>
                )}
              </div>
            </section>
            {hasJoinLink(event.format) && (
              <section className="rounded-lg border border-line p-5" aria-label="Online access">
                <JoinLinkForm eventId={event.id} format={event.format} joinUrl={access.data?.join_url ?? null} />
              </section>
            )}
            <section className="flex flex-col gap-4 rounded-lg border border-line p-5" aria-labelledby="recordings-heading">
              <h2 id="recordings-heading" className="text-h3 text-content">
                Recordings
              </h2>
              {recordings.data?.length ? (
                <ul className="flex flex-col divide-y divide-line">
                  {recordings.data.map((r) => (
                    <li key={r.id} className="flex flex-col gap-2 py-3">
                      <a href={r.video_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-content-link">
                        {r.title}
                      </a>
                      <span className="text-sm text-content-2">
                        {[formatDuration(r.duration_minutes), r.is_published ? "Published" : "Hidden"].filter(Boolean).join(", ")}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <form action={setRecordingPublished}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="slug" value={event.slug} />
                          <input type="hidden" name="publish" value={String(!r.is_published)} />
                          <Button type="submit" variant="secondary">
                            {r.is_published ? "Hide" : "Publish"}
                          </Button>
                        </form>
                        <form action={deleteRecording}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="slug" value={event.slug} />
                          <Button type="submit" variant="ghost">
                            Remove
                          </Button>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-content-2">No recordings yet. Add the link once the session is recorded.</p>
              )}
              <RecordingForm eventId={event.id} slug={event.slug} />
            </section>
          </>
        }
      >
        <EventForm event={event} chapters={chapters} />
      </MainWithRail>
    </div>
  );
}
