import { ogImage } from "@/components/marketing/og-card";
import { describeAchievement } from "@/lib/social/public-profile";
import { getSharedAchievement } from "@/lib/social/queries";

export const alt = "An achievement on SydCrest Launchpad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card for an achievement. Private profiles get the generic card. */
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const shared = await getSharedAchievement(id);
  if (!shared) return ogImage("Find your path into tech.", "Free roadmaps for Ghana on SydCrest Launchpad.");
  const name = shared.owner.display_name ?? "A Launchpad learner";
  return ogImage(
    describeAchievement(shared.achievement.type, shared.achievement.ref_id, shared.achievement.title),
    `${name} on SydCrest Launchpad`,
  );
}
