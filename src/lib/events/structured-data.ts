import { regionLabel } from "@/lib/regions";

/**
 * schema.org Event data for an event page, so search engines can show the
 * date, place and status. Only facts from the event row: no offers, no
 * ratings, no attendee numbers. Pure, so it is unit tested.
 */

export type StructuredEvent = {
  slug: string;
  title: string;
  summary: string | null;
  status: string;
  format: string;
  starts_at: string;
  ends_at: string;
  venue_name: string | null;
  venue_address: string | null;
  city: string | null;
  region: string | null;
};

const ATTENDANCE = {
  online: "https://schema.org/OnlineEventAttendanceMode",
  in_person: "https://schema.org/OfflineEventAttendanceMode",
  hybrid: "https://schema.org/MixedEventAttendanceMode",
} as const;

export function eventJsonLd(event: StructuredEvent, { pageUrl, imageUrl, siteUrl }: { pageUrl: string; imageUrl: string; siteUrl: string }) {
  const place =
    event.format !== "online" && event.venue_name
      ? {
          "@type": "Place",
          name: event.venue_name,
          address: {
            "@type": "PostalAddress",
            ...(event.venue_address ? { streetAddress: event.venue_address } : {}),
            ...(event.city ? { addressLocality: event.city } : {}),
            ...(regionLabel(event.region) ? { addressRegion: `${regionLabel(event.region)} Region` } : {}),
            addressCountry: "GH",
          },
        }
      : null;
  // The joining link is private (people going only), so the virtual location is the event page.
  const virtual = event.format !== "in_person" ? { "@type": "VirtualLocation", url: pageUrl } : null;
  const location = place && virtual ? [place, virtual] : (place ?? virtual);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    ...(event.summary ? { description: event.summary } : {}),
    startDate: event.starts_at,
    endDate: event.ends_at,
    eventStatus: event.status === "cancelled" ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
    eventAttendanceMode: ATTENDANCE[event.format as keyof typeof ATTENDANCE] ?? ATTENDANCE.in_person,
    ...(location ? { location } : {}),
    image: [imageUrl],
    url: pageUrl,
    organizer: { "@type": "Organization", name: "SydCrest", url: siteUrl },
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so text can never close the tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
