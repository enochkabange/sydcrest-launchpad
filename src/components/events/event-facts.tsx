import { CalendarDays, CalendarPlus, Clock, MapPin, MonitorPlay, Users } from "lucide-react";
import type { ReactNode } from "react";
import { formatLabel, hasVenue } from "@/lib/events/labels";
import { regionLabel } from "@/lib/regions";
import { formatEventDay, formatEventTimes } from "@/lib/events/time";

type FactsEvent = {
  slug: string;
  format: string;
  starts_at: string;
  ends_at: string;
  venue_name: string | null;
  venue_address?: string | null;
  city: string | null;
  region: string | null;
  capacity: number | null;
  status: string;
  chapter?: { name: string } | null;
};

function Fact({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-content-3">{icon}</span>
      <div className="min-w-0">
        <dt className="sr-only">{label}</dt>
        <dd className="text-sm text-content">{children}</dd>
      </div>
    </div>
  );
}

/** When, where and how many seats. Static facts from the event row. */
export function EventFacts({ event, calendar = true }: { event: FactsEvent; calendar?: boolean }) {
  const region = regionLabel(event.region);
  const icon = "size-5";
  return (
    <div className="flex flex-col gap-4">
      <dl className="flex flex-col gap-3">
        <Fact icon={<CalendarDays aria-hidden className={icon} />} label="Date">
          <time dateTime={event.starts_at} className="font-semibold">
            {formatEventDay(event.starts_at)}
          </time>
        </Fact>
        <Fact icon={<Clock aria-hidden className={icon} />} label="Time">
          {formatEventTimes(event.starts_at, event.ends_at)}
          <span className="block text-content-2">Ghana time</span>
        </Fact>
        {hasVenue(event.format) && (
          <Fact icon={<MapPin aria-hidden className={icon} />} label="Venue">
            <span className="font-semibold">{event.venue_name ?? "Venue to be announced"}</span>
            {event.venue_address && <span className="block text-content-2">{event.venue_address}</span>}
            {(event.city || region) && <span className="block text-content-2">{[event.city, region && `${region} Region`].filter(Boolean).join(", ")}</span>}
          </Fact>
        )}
        {event.format !== "in_person" && (
          <Fact icon={<MonitorPlay aria-hidden className={icon} />} label="Online">
            {formatLabel(event.format) === "Online" ? "Online." : "Also online."} The joining link is shown to people going.
          </Fact>
        )}
        <Fact icon={<Users aria-hidden className={icon} />} label="Seats">
          {event.capacity ? `${event.capacity} ${event.capacity === 1 ? "seat" : "seats"}` : "No seat limit"}
          {event.chapter && <span className="block text-content-2">Hosted by the {event.chapter.name} chapter</span>}
        </Fact>
      </dl>
      {calendar && event.status !== "cancelled" && (
        // A plain link: the browser downloads the .ics file.
        <a
          href={`/events/${event.slug}/calendar.ics`}
          download
          className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-content-link underline-offset-2 hover:underline"
        >
          <CalendarPlus aria-hidden className="size-4" /> Add to calendar
        </a>
      )}
    </div>
  );
}
