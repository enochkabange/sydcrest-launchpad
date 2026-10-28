import { buildIcs } from "@/lib/events/ics";
import { eventPath, getPublicEvent } from "@/lib/events/public";
import { SITE_URL } from "@/lib/site";

/**
 * Add to calendar: an .ics file with the public details of one event. It
 * never includes the joining link, which only people going may see.
 */
export async function GET(_request: Request, { params }: RouteContext<"/events/[slug]/calendar.ics">) {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) return new Response("Not found", { status: 404 });
  const ics = buildIcs(event, new URL(eventPath(slug), SITE_URL).toString());
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}
