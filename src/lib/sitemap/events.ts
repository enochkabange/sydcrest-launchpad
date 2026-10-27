import { eventPath, getPublicEvents } from "@/lib/events/public";

import { siteUrl, type SitemapSource } from "./url";

/** /events, the recordings library and every public event (refreshed by revalidateEvents). */
export const eventEntries: SitemapSource = async () => [
  { url: siteUrl("/events"), changeFrequency: "weekly" as const, priority: 0.8 },
  { url: siteUrl("/events/recordings"), changeFrequency: "weekly" as const, priority: 0.6 },
  ...(await getPublicEvents()).map((e) => ({
    url: siteUrl(eventPath(e.slug)),
    lastModified: e.updated_at,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  })),
];
