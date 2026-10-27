import { ArrowRight, MapPin, MonitorPlay, PlayCircle } from "lucide-react";
import Link from "@/components/ui/link";
import { formatLabel, kindLabel } from "@/lib/events/labels";
import { eventPath, type PublicEvent } from "@/lib/events/public";
import { EVENT_TIME_ZONE, formatEventDayShort, formatEventTimes } from "@/lib/events/time";

const monthFormat = new Intl.DateTimeFormat("en-GB", { timeZone: EVENT_TIME_ZONE, month: "short" });
const dayFormat = new Intl.DateTimeFormat("en-GB", { timeZone: EVENT_TIME_ZONE, day: "numeric" });

/** The date tile beside an event: a calendar page with month and day. */
export function DateTile({ iso, muted = false }: { iso: string; muted?: boolean }) {
  const date = new Date(iso);
  return (
    <div
      aria-hidden
      className={`flex w-16 shrink-0 flex-col items-center overflow-hidden rounded-md border text-center ${muted ? "border-line text-content-2" : "border-blue-200 text-content"}`}
    >
      <span className={`w-full py-0.5 text-xs font-bold tracking-wider uppercase ${muted ? "bg-surface-sunken" : "bg-info-bg text-info-fg"}`}>
        {monthFormat.format(date)}
      </span>
      <span className="py-1 text-2xl font-bold">{dayFormat.format(date)}</span>
    </div>
  );
}

export function placeLine(event: Pick<PublicEvent, "format" | "venue_name" | "city">) {
  const place = [event.venue_name, event.city].filter(Boolean).join(", ");
  if (event.format === "online") return "Online";
  if (event.format === "hybrid") return place ? `${place}, and online` : "In person and online";
  return place || formatLabel(event.format);
}

/** One event in a list. The whole card is the link. */
export function EventCard({ event, past = false }: { event: PublicEvent; past?: boolean }) {
  const cancelled = event.status === "cancelled";
  const Icon = event.format === "online" ? MonitorPlay : MapPin;
  return (
    <Link
      href={eventPath(event.slug)}
      className="group flex h-full gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-sunken xl:p-5"
    >
      <DateTile iso={event.starts_at} muted={past || cancelled} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="text-xs font-bold tracking-wider text-content-3 uppercase">{kindLabel(event.kind)}</p>
        <h3 className={`text-h3 text-content ${cancelled ? "line-through decoration-1" : ""}`}>{event.title}</h3>
        <p className="text-sm text-content-2">
          <time dateTime={event.starts_at}>{formatEventDayShort(event.starts_at)}</time>, {formatEventTimes(event.starts_at, event.ends_at)}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-content-2">
          <Icon aria-hidden className="size-4 shrink-0 text-content-3" />
          <span className="truncate">{placeLine(event)}</span>
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          {cancelled && <span className="rounded-full bg-danger-bg px-2 py-0.5 text-xs font-semibold text-danger-fg">Cancelled</span>}
          {event.chapter && (
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs font-semibold text-content-2">{event.chapter.name}</span>
          )}
          {event.recording_count > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-info-bg px-2 py-0.5 text-xs font-semibold text-info-fg">
              <PlayCircle aria-hidden className="size-3.5" /> Recording
            </span>
          )}
          <ArrowRight aria-hidden className="ml-auto size-4 text-content-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
