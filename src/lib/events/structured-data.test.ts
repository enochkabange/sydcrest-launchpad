import { describe, expect, it } from "vitest";
import { eventJsonLd, jsonLdString } from "./structured-data";

const base = {
  slug: "bolga-skillshop",
  title: "Bolgatanga Skillshop",
  summary: "Hands on data skills with Fuseini Alhassan.",
  status: "published",
  format: "in_person",
  starts_at: "2026-12-12T09:00:00Z",
  ends_at: "2026-12-12T14:00:00Z",
  venue_name: "Bolgatanga Library",
  venue_address: "Zuarungu Road",
  city: "Bolgatanga",
  region: "upper_east",
};
const urls = {
  pageUrl: "https://launchpad.sydcrest.com/events/bolga-skillshop",
  imageUrl: "https://launchpad.sydcrest.com/og/events/bolga-skillshop",
  siteUrl: "https://launchpad.sydcrest.com",
};

describe("eventJsonLd", () => {
  it("describes an in person event with its place", () => {
    const data = eventJsonLd(base, urls);
    expect(data["@type"]).toBe("Event");
    expect(data.eventAttendanceMode).toBe("https://schema.org/OfflineEventAttendanceMode");
    expect(data.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(data.location).toMatchObject({
      "@type": "Place",
      name: "Bolgatanga Library",
      address: { addressLocality: "Bolgatanga", addressRegion: "Upper East Region", addressCountry: "GH" },
    });
    expect(data).not.toHaveProperty("offers");
  });

  it("uses the event page as the virtual location, never the joining link", () => {
    const data = eventJsonLd({ ...base, format: "online", venue_name: null }, urls);
    expect(data.eventAttendanceMode).toBe("https://schema.org/OnlineEventAttendanceMode");
    expect(data.location).toEqual({ "@type": "VirtualLocation", url: urls.pageUrl });
  });

  it("lists both locations for a hybrid event and marks cancellations", () => {
    const data = eventJsonLd({ ...base, format: "hybrid", status: "cancelled" }, urls);
    expect(Array.isArray(data.location)).toBe(true);
    expect(data.eventStatus).toBe("https://schema.org/EventCancelled");
  });

  it("escapes < so a title cannot close the script tag", () => {
    expect(jsonLdString({ name: "</script><b>" })).not.toContain("</script>");
  });
});
