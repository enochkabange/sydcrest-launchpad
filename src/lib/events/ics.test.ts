import { describe, expect, it } from "vitest";
import { buildIcs, eventLocation, icsDate, icsEscape, icsFold } from "./ics";

const event = {
  id: "7b1c3a52-4c1e-4f7a-9f0e-6a3f2b1d0c9e",
  title: "Tamale Skillshop: build your first web page",
  summary: "A hands on morning with Wumpini Abukari and Mariama Seidu, for beginners.",
  status: "published",
  format: "in_person",
  starts_at: "2026-12-05T10:00:00Z",
  ends_at: "2026-12-05T15:00:00Z",
  venue_name: "Tamale Tech Hub",
  venue_address: "Off Bolgatanga Road, Kalpohin",
  city: "Tamale",
  updated_at: "2026-11-01T09:30:00Z",
};
const url = "https://launchpad.sydcrest.com/events/tamale-skillshop";

describe("ics helpers", () => {
  it("formats UTC dates", () => {
    expect(icsDate("2026-12-05T10:00:00.000Z")).toBe("20261205T100000Z");
  });

  it("escapes text values", () => {
    expect(icsEscape("Bring water; a pen, and a phone\nor laptop")).toBe("Bring water\\; a pen\\, and a phone\\nor laptop");
  });

  it("folds long lines at 75 octets", () => {
    const folded = icsFold(`DESCRIPTION:${"a".repeat(200)}`);
    for (const line of folded.split("\r\n")) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    expect(folded.replace(/\r\n /g, "")).toBe(`DESCRIPTION:${"a".repeat(200)}`);
  });

  it("describes where the event is", () => {
    expect(eventLocation(event)).toBe("Tamale Tech Hub, Off Bolgatanga Road, Kalpohin, Tamale");
    expect(eventLocation({ ...event, format: "online" })).toBe("Online");
    expect(eventLocation({ ...event, format: "hybrid" })).toBe("Tamale Tech Hub, Off Bolgatanga Road, Kalpohin, Tamale (also online)");
  });
});

describe("buildIcs", () => {
  const ics = buildIcs(event, url, new Date("2026-11-10T08:00:00Z"));

  it("is a calendar with one event and CRLF line ends", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR\r\nVERSION:2.0\r\n")).toBe(true);
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("UID:7b1c3a52-4c1e-4f7a-9f0e-6a3f2b1d0c9e@sydcrest-launchpad\r\n");
    expect(ics).toContain("DTSTART:20261205T100000Z\r\n");
    expect(ics).toContain("DTEND:20261205T150000Z\r\n");
    expect(ics).toContain("STATUS:CONFIRMED");
    expect(ics).toContain(`URL:${url}`);
  });

  it("marks cancelled events", () => {
    expect(buildIcs({ ...event, status: "cancelled" }, url)).toContain("STATUS:CANCELLED");
  });

  it("never carries a joining link, only the event page", () => {
    const online = buildIcs({ ...event, format: "online" }, url);
    expect(online.replace(/\r\n /g, "")).toContain(`Details and RSVP: ${url}`);
    expect(online).not.toMatch(/meet\.google|zoom\.us/);
  });
});
