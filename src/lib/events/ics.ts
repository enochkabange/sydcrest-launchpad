/**
 * An add to calendar file (RFC 5545) for one event. It carries the public
 * details and the event page link only, never the joining link: that stays
 * with people going (event_join_link). Pure, so it is unit tested.
 */

export type IcsEvent = {
  id: string;
  title: string;
  summary: string | null;
  status: string;
  format: string;
  starts_at: string;
  ends_at: string;
  venue_name: string | null;
  venue_address: string | null;
  city: string | null;
  updated_at: string;
};

/** 2026-11-14T10:00:00.000Z -> 20261114T100000Z */
export function icsDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Escape a TEXT value: backslash, semicolon, comma and line breaks. */
export function icsEscape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** Fold a content line at 75 octets, continuing with a space (RFC 5545 §3.1). */
export function icsFold(line: string) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const parts: string[] = [];
  let current = "";
  let size = 0;
  for (const char of line) {
    const len = new TextEncoder().encode(char).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (size + len > limit) {
      parts.push(current);
      current = "";
      size = 0;
    }
    current += char;
    size += len;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

export function eventLocation(event: Pick<IcsEvent, "format" | "venue_name" | "venue_address" | "city">) {
  const place = [event.venue_name, event.venue_address, event.city].filter(Boolean).join(", ");
  if (event.format === "online") return "Online";
  if (event.format === "hybrid") return place ? `${place} (also online)` : "Online";
  return place;
}

export function buildIcs(event: IcsEvent, pageUrl: string, now: Date = new Date()) {
  const description = [event.summary?.trim(), `Details and RSVP: ${pageUrl}`].filter(Boolean).join("\n\n");
  const location = eventLocation(event);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SydCrest Launchpad//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@sydcrest-launchpad`,
    `DTSTAMP:${icsDate(now.toISOString())}`,
    `LAST-MODIFIED:${icsDate(event.updated_at)}`,
    `DTSTART:${icsDate(event.starts_at)}`,
    `DTEND:${icsDate(event.ends_at)}`,
    `SUMMARY:${icsEscape(event.title)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    ...(location ? [`LOCATION:${icsEscape(location)}`] : []),
    `URL:${pageUrl}`,
    `STATUS:${event.status === "cancelled" ? "CANCELLED" : "CONFIRMED"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `${lines.map(icsFold).join("\r\n")}\r\n`;
}
