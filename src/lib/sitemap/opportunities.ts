import { opportunityPath } from "@/components/opportunities/paths";
import { getOpenOpportunities } from "@/lib/opportunities/public";

import { staticPages, siteUrl, type SitemapSource } from "./url";

/** The public opportunities board. */
export const opportunityPages = staticPages([{ path: "/opportunities", priority: 0.8 }]);

/** Open opportunities, from the cached board read (refreshed by revalidateOpportunities). */
export const opportunityEntries: SitemapSource = async () =>
  (await getOpenOpportunities()).map((o) => ({
    url: siteUrl(opportunityPath(o.slug)),
    lastModified: o.updated_at,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));
