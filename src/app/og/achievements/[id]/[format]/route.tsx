import { achievementCard, isCardFormat } from "@/lib/share/card";
import { shareCardImage, withCardCache } from "@/lib/share/image";
import { getSharedAchievement } from "@/lib/social/queries";
import { SITE_URL } from "@/lib/site";

/**
 * Story or square share card for an achievement. Same gate as /a/[id]: the
 * owner's profile must be public, so the card shows only what that profile
 * already shows (the name they chose and the milestone). Anything else is a
 * 404, never a card with someone's name on it.
 */
export async function GET(_request: Request, { params }: RouteContext<"/og/achievements/[id]/[format]">) {
  const { id, format } = await params;
  if (!isCardFormat(format)) return new Response("Not found", { status: 404 });
  const shared = await getSharedAchievement(id);
  if (!shared) return new Response("Not found", { status: 404 });
  const card = achievementCard(shared.achievement, shared.owner.display_name);
  if (!card) return new Response("Not found", { status: 404 });
  return withCardCache(shareCardImage(card, format, new URL(SITE_URL).host));
}
