import { ogImage } from "@/components/marketing/og-card";
import { kindLabel } from "@/lib/events/labels";
import { getPublicEvent } from "@/lib/events/public";
import { formatEventDay } from "@/lib/events/time";
import { truncate } from "@/lib/roadmaps/seo";

/** Share card for one public event: its title, type and date. */
export async function GET(_request: Request, { params }: RouteContext<"/og/events/[slug]">) {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) return new Response("Not found", { status: 404 });
  const where = event.format === "online" ? "Online" : (event.city ?? "In person");
  const subline =
    event.status === "cancelled"
      ? `Cancelled. ${kindLabel(event.kind)}, ${formatEventDay(event.starts_at)}`
      : `${kindLabel(event.kind)}. ${formatEventDay(event.starts_at)}, ${where}`;
  return ogImage(truncate(event.title, 70), subline);
}
