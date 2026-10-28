import { getPublishedSkills } from "@/lib/skills/public";
import { siteUrl, type SitemapSource } from "./url";

/** The verified skill catalogue and each published skill's page (#165). */
export const skillEntries: SitemapSource = async () => [
  { url: siteUrl("/skills"), changeFrequency: "weekly" as const, priority: 0.6 },
  ...(await getPublishedSkills()).map(({ slug }) => ({
    url: siteUrl(`/skills/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  })),
];
