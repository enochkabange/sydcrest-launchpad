import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ActionButton } from "@/components/events/action-button";
import { EventPageHeader } from "@/components/events/event-page-header";
import Link from "@/components/ui/link";
import { DataTable, MainWithRail, type Column } from "@/components/ui/layout";
import { getMyProfile } from "@/lib/auth";
import { hostCheckInAction, rotateCodeAction } from "@/lib/events/actions";
import { displayCode } from "@/lib/events/forms";
import { hasJoinLink, statusLabel } from "@/lib/events/labels";
import { snapshotRows, type FeedbackSummary } from "@/lib/events/snapshot";
import { requireEventPage } from "@/lib/events/session";
import { formatEventDayShort, formatEventTime } from "@/lib/events/time";
import { getAttendance } from "@/lib/events/viewer";
import { SITE_URL } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Host tools", robots: { index: false } };

export default function HostPage({ params }: PageProps<"/events/[slug]/host">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" aria-busy="true" />}>
      <Host params={params} />
    </Suspense>
  );
}

type Attendee = {
  profile_id: string;
  display_name: string;
  rsvp_status: string;
  responded_at: string;
  checked_in_at: string | null;
};

const RSVP_LABEL: Record<string, string> = { going: "Going", waitlisted: "Waitlist", cancelled: "Cancelled" };
const RSVP_TONE: Record<string, string> = {
  going: "bg-success-bg text-success-fg",
  waitlisted: "bg-info-bg text-info-fg",
  cancelled: "bg-surface-sunken text-content-2",
};

async function Host({ params }: Pick<PageProps<"/events/[slug]/host">, "params">) {
  const { slug } = await params;
  const { event } = await requireEventPage(slug, "host");
  const supabase = await createClient();

  // event_access is readable by hosts only, so it doubles as the host check.
  const { data: access } = await supabase.from("event_access").select("checkin_code, join_url").eq("event_id", event.id).maybeSingle();
  if (!access) notFound();

  const [profile, attendance, summary, attendees, comments] = await Promise.all([
    getMyProfile(),
    getAttendance(event.id),
    supabase.rpc("event_feedback_summary", { p_event_id: event.id }),
    supabase
      .from("event_attendees")
      .select("profile_id, display_name, rsvp_status, responded_at, checked_in_at")
      .eq("event_id", event.id)
      .order("responded_at"),
    supabase
      .from("event_feedback")
      .select("profile_id, comment, quote_consent, updated_at")
      .eq("event_id", event.id)
      .not("comment", "is", null)
      .order("updated_at", { ascending: false }),
  ]);

  const people = (attendees.data ?? []) as Attendee[];
  const names = new Map(people.map((p) => [p.profile_id, p.display_name]));
  const snapshot = (summary.data?.[0] ?? null) as FeedbackSummary | null;
  const checkInUrl = new URL(`/events/${slug}/check-in`, SITE_URL).toString();

  const columns: Column<Attendee>[] = [
    { header: "Name", cell: (a) => <span className="font-semibold text-content">{a.display_name}</span>, className: "min-w-0 flex-1" },
    {
      header: "RSVP",
      cell: (a) => (
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${RSVP_TONE[a.rsvp_status] ?? ""}`}>{RSVP_LABEL[a.rsvp_status] ?? a.rsvp_status}</span>
      ),
    },
    { header: "Responded", cell: (a) => <span className="text-sm text-content-2">{formatEventDayShort(a.responded_at)}</span>, phone: "hide" },
    {
      header: "Checked in",
      align: "end",
      cell: (a) =>
        a.checked_in_at ? (
          <span className="text-sm font-semibold text-success-fg">{formatEventTime(a.checked_in_at)}</span>
        ) : (
          <ActionButton
            action={hostCheckInAction}
            fields={{ event_id: event.id, profile_id: a.profile_id }}
            label="Check in"
            accessibleLabel={`Check in ${a.display_name}`}
            pendingLabel="…"
            variant="secondary"
          />
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <EventPageHeader event={event} title="Host tools" />
        <div className="flex flex-wrap gap-x-5 text-sm">
          <span className="inline-flex min-h-11 items-center text-content-2">Status: {statusLabel(event.status)}</span>
          {profile.role === "admin" && (
            <Link href={`/admin/events/${event.id}`} className="inline-flex min-h-11 items-center font-semibold text-content-link underline-offset-2 hover:underline">
              Edit event
            </Link>
          )}
        </div>
      </div>

      <MainWithRail
        railFirst
        railLabel="Check in code and impact"
        rail={
          <>
            <section aria-labelledby="code-heading" className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5">
              <h2 id="code-heading" className="text-h3 text-content">
                Check in code
              </h2>
              <p className="rounded-md bg-surface-sunken py-4 text-center font-mono text-3xl font-bold tracking-[0.1em] whitespace-nowrap text-content" data-testid="checkin-code">
                {displayCode(access.checkin_code)}
              </p>
              <p className="text-sm text-content-2">
                Show it at the venue or read it out in the webinar. People enter it at <span className="break-all font-semibold text-content">{checkInUrl}</span>{" "}
                from two hours before the start to two hours after the end.
              </p>
              <ActionButton
                action={rotateCodeAction}
                fields={{ event_id: event.id }}
                label="Make a new code"
                pendingLabel="Making a new code…"
                variant="secondary"
                confirm="Make a new code? The old one stops working straight away."
              />
              {hasJoinLink(event.format) && !access.join_url && (
                <p className="text-sm text-danger-fg">No joining link yet. People going will not see one until it is added.</p>
              )}
            </section>

            <section aria-labelledby="impact-heading" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5">
              <h2 id="impact-heading" className="text-h3 text-content">
                Impact snapshot
              </h2>
              <dl className="grid grid-cols-2 gap-3">
                {[
                  ["Going", attendance.going],
                  ["Waitlist", attendance.waitlisted],
                  ["Checked in", snapshot?.checked_in ?? 0],
                  ["Feedback", snapshot?.responses ?? 0],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-surface-sunken p-3">
                    <dt className="text-xs text-content-2">{label}</dt>
                    <dd className="text-2xl font-bold text-content">{value}</dd>
                  </div>
                ))}
              </dl>
              {snapshot && snapshot.responses > 0 ? (
                <dl className="flex flex-col divide-y divide-line text-sm">
                  {snapshotRows(snapshot).map((row) => (
                    <div key={row.label} className="flex justify-between gap-3 py-2">
                      <dt className="text-content-2">{row.label}</dt>
                      <dd className="font-semibold text-content">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-content-2">No feedback yet. People who checked in can give it once the event starts.</p>
              )}
            </section>
          </>
        }
      >
        <section aria-labelledby="attendees-heading">
          <h2 id="attendees-heading" className="text-subtitle text-content">
            Attendees
          </h2>
          <p className="mt-1 text-sm text-content-2">Check in anyone who RSVPed but cannot enter the code themselves.</p>
          <div className="mt-4">
            {people.length ? (
              <DataTable caption="RSVPs and check ins" columns={columns} rows={people} rowKey={(a) => a.profile_id} />
            ) : (
              <div className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
                <p className="font-semibold text-content">No RSVPs yet.</p>
                <p className="mt-1">People who RSVP or check in appear here with their status.</p>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="comments-heading">
          <h2 id="comments-heading" className="text-subtitle text-content">
            Comments
          </h2>
          {comments.data?.length ? (
            <ul className="mt-4 flex flex-col gap-3">
              {comments.data.map((c) => (
                <li key={c.profile_id} className="rounded-lg border border-line bg-surface p-4">
                  <p className="whitespace-pre-line text-body text-content">{c.comment}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-content-2">
                    {names.get(c.profile_id) ?? "An attendee"}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.quote_consent ? "bg-success-bg text-success-fg" : "bg-surface-sunken text-content-2"}`}
                    >
                      {c.quote_consent ? "OK to quote with first name" : "Do not quote"}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-lg border border-line bg-surface-sunken p-5 text-content-2">Comments from feedback appear here.</p>
          )}
        </section>
      </MainWithRail>
    </div>
  );
}
