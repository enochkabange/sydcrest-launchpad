import { CalendarCheck, CircleCheck, Clock, ExternalLink, Users } from "lucide-react";
import { connection } from "next/server";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { cancelRsvpAction, rsvpAction } from "@/lib/events/actions";
import { hasJoinLink } from "@/lib/events/labels";
import type { PublicEventDetail } from "@/lib/events/public";
import { checkInOpen, checkInOpensAt, eventPhase, feedbackOpen, formatEventDayShort, formatEventTime, rsvpOpen } from "@/lib/events/time";
import { getAttendance, getEventViewer, getJoinLink, type Attendance } from "@/lib/events/viewer";
import { ActionButton } from "./action-button";

/*
 * The request time part of an event page: where the event is in its life,
 * real seat numbers, and what this viewer can do (RSVP, cancel, join, check
 * in, give feedback, host). Rendered inside <Suspense> so the page itself
 * stays prerendered.
 */

function SeatsLine({ attendance, capacity }: { attendance: Attendance; capacity: number | null }) {
  const full = capacity !== null && attendance.seatsLeft === 0;
  return (
    <p className="flex items-start gap-2 text-sm text-content-2" data-testid="seats">
      <Users aria-hidden className="mt-0.5 size-4 shrink-0 text-content-3" />
      <span>
        {attendance.going} going
        {capacity !== null && !full && `, ${attendance.seatsLeft} of ${capacity} seats left`}
        {full && `. All ${capacity} seats are taken, so new RSVPs join the waitlist`}
        {attendance.waitlisted > 0 && ` (${attendance.waitlisted} waiting)`}.
      </span>
    </p>
  );
}

function StatusLine({ tone, children }: { tone: "success" | "info"; children: React.ReactNode }) {
  const Icon = tone === "success" ? CircleCheck : Clock;
  return (
    <p className={`flex items-start gap-2 rounded-md px-3 py-2.5 text-sm font-semibold ${tone === "success" ? "bg-success-bg text-success-fg" : "bg-info-bg text-info-fg"}`}>
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export async function RsvpPanel({ event }: { event: PublicEventDetail }) {
  await connection();
  const [viewer, attendance] = await Promise.all([getEventViewer(event.id), getAttendance(event.id)]);
  const now = new Date();
  const phase = eventPhase(event, now);
  const path = `/events/${event.slug}`;
  const going = viewer.signedIn && viewer.rsvp === "going";
  const waitlisted = viewer.signedIn && viewer.rsvp === "waitlisted";
  const checkedIn = viewer.signedIn && Boolean(viewer.checkedInAt);
  const joinLink = going && hasJoinLink(event.format) && phase !== "past" ? await getJoinLink(event.id) : null;
  const full = event.capacity !== null && attendance.seatsLeft === 0;

  return (
    <div className="flex flex-col gap-4" data-testid="rsvp-panel">
      {phase === "cancelled" && (
        <div className="rounded-md border border-danger-fg/30 bg-danger-bg p-4 text-sm text-danger-fg">
          <p className="font-semibold">This event was cancelled.</p>
          <p className="mt-1">Everyone who RSVPed has been told. Have a look at what else is coming up.</p>
          <Link href="/events" className="mt-2 inline-flex min-h-11 items-center font-semibold underline underline-offset-2">
            See upcoming events
          </Link>
        </div>
      )}

      {phase === "past" && (
        <div className="rounded-md border border-line bg-surface-sunken p-4 text-sm text-content-2">
          <p className="font-semibold text-content">This event has ended.</p>
          <p className="mt-1">
            {attendance.going > 0 ? `${attendance.going} people RSVPed.` : "Thank you to everyone who came."}
            {event.recording_count > 0 ? " The recording is below." : ""}
          </p>
        </div>
      )}

      {(phase === "upcoming" || phase === "live") && (
        <>
          {phase === "live" && <StatusLine tone="info">Happening now</StatusLine>}
          <SeatsLine attendance={attendance} capacity={event.capacity} />
        </>
      )}

      {!viewer.signedIn && rsvpOpen(event, now) && (
        <div className="flex flex-col gap-2">
          <Link href={`/login?next=${encodeURIComponent(path)}`} className={buttonClasses("primary")}>
            Sign in to RSVP
          </Link>
          <Link href={`/signup?next=${encodeURIComponent(path)}`} className={buttonClasses("ghost")}>
            New here? Create a free account
          </Link>
        </div>
      )}

      {viewer.signedIn && rsvpOpen(event, now) && !going && !waitlisted && !checkedIn && (
        <ActionButton
          action={rsvpAction}
          fields={{ event_id: event.id }}
          label={full ? "Join the waitlist" : "RSVP"}
          pendingLabel="Saving your place…"
        />
      )}

      {going && phase !== "past" && phase !== "cancelled" && (
        <div className="flex flex-col gap-3">
          <StatusLine tone="success">{checkedIn ? "You are checked in." : "You are going."}</StatusLine>
          {hasJoinLink(event.format) &&
            (joinLink ? (
              <a href={joinLink} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary")}>
                Join online <ExternalLink aria-hidden className="size-4" />
              </a>
            ) : (
              <p className="text-sm text-content-2">The joining link will appear here before the start.</p>
            ))}
        </div>
      )}

      {waitlisted && phase !== "past" && phase !== "cancelled" && (
        <StatusLine tone="info">
          You are on the waitlist. If a seat frees up it goes to the next person in line, and we will let you know.
        </StatusLine>
      )}

      {viewer.signedIn && checkInOpen(event, now) && !checkedIn && (
        <Link href={`${path}/check-in`} className={buttonClasses(going ? "secondary" : "primary")}>
          <CalendarCheck aria-hidden className="size-4" /> Check in with the code
        </Link>
      )}
      {!viewer.signedIn && checkInOpen(event, now) && (
        <p className="text-sm text-content-2">At the event? Sign in, then check in with the code from the host.</p>
      )}
      {viewer.signedIn && !checkInOpen(event, now) && phase === "upcoming" && going && (
        <p className="text-sm text-content-2">
          Check in opens on {formatEventDayShort(checkInOpensAt(event))} at {formatEventTime(checkInOpensAt(event))} GMT.
        </p>
      )}

      {checkedIn && feedbackOpen(event, now) && (
        <div className="flex flex-col gap-2 rounded-md border border-line p-4">
          <p className="text-sm font-semibold text-content">{viewer.hasFeedback ? "Thanks for your feedback." : "How was it?"}</p>
          <p className="text-sm text-content-2">
            {viewer.hasFeedback ? "You can change your answers at any time." : "Two minutes of feedback helps the next event start on time and teach better."}
          </p>
          <Link href={`${path}/feedback`} className={buttonClasses(viewer.hasFeedback ? "secondary" : "primary")}>
            {viewer.hasFeedback ? "Edit your feedback" : "Give feedback"}
          </Link>
        </div>
      )}

      {(going || waitlisted) && rsvpOpen(event, now) && !checkedIn && (
        <ActionButton
          action={cancelRsvpAction}
          fields={{ event_id: event.id }}
          label={waitlisted ? "Leave the waitlist" : "Cancel my RSVP"}
          pendingLabel="Cancelling…"
          variant="ghost"
          confirm={waitlisted ? "Leave the waitlist?" : "Cancel your RSVP? Your seat goes to the next person waiting."}
        />
      )}

      {viewer.signedIn && viewer.isHost && (
        <Link href={`${path}/host`} className={buttonClasses("secondary")}>
          Host tools
        </Link>
      )}
    </div>
  );
}

/** Same footprint as the panel while it loads, so the page does not jump. */
export function RsvpPanelSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-busy="true">
      <div className="h-5 w-3/4 animate-skeleton rounded bg-surface-sunken" />
      <div className="h-11 w-full animate-skeleton rounded-md bg-surface-sunken" />
    </div>
  );
}
