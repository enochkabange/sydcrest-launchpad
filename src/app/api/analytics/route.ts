import { cookies } from "next/headers";
import { ANONYMOUS_ID_COOKIE, isAnonymousId } from "@/lib/analytics/anonymous-id";
import { BEACON_MAX_BYTES, parseBeacon, sameOrigin } from "@/lib/analytics/beacon";
import { OPT_OUT_COOKIE, deviceClass, optedOutRequest } from "@/lib/analytics/context";
import { recordEvents } from "@/lib/analytics/track";
import { allowFormSubmission } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

/**
 * The browser analytics beacon (issue #242). POST a batch from
 * src/lib/analytics/client (navigator.sendBeacon, text/plain JSON); answers
 * 204 with no body whatever happens to the events, so the page never waits
 * on it or retries.
 *
 * Refused: another site (Origin or Sec-Fetch-Site), bodies over 16 KB, and
 * more than the per address limit. Dropped without a write: Do Not Track,
 * Global Privacy Control and the visitor's own switch. Only browser events
 * (page_view, web_vital, form_started, form_submitted, share_clicked,
 * client_error) are accepted, each with its props checked; the database adds
 * who the person is from the session.
 */

const NO_STORE = { "Cache-Control": "no-store" };

function respond(status: number) {
  return new Response(null, { status, headers: NO_STORE });
}

export async function POST(request: Request) {
  const headers = request.headers;
  if (!sameOrigin(headers)) return respond(403);
  const length = Number(headers.get("content-length") ?? "0");
  if (length > BEACON_MAX_BYTES) return respond(413);

  const jar = await cookies();
  if (optedOutRequest(headers, jar.get(OPT_OUT_COOKIE)?.value)) return respond(204);

  const text = await request.text();
  if (text.length > BEACON_MAX_BYTES) return respond(413);
  const beacon = parseBeacon(text);
  if (!beacon) return respond(400);
  if (!beacon.events.length) return respond(204);

  const supabase = await createClient();
  if (!(await allowFormSubmission(supabase, "beacon", headers))) return respond(429);

  const anonymousId = jar.get(ANONYMOUS_ID_COOKIE)?.value;
  await recordEvents(supabase, beacon.events, {
    anonymous_id: isAnonymousId(anonymousId) ? anonymousId : null,
    session_id: beacon.sessionId,
    device_class: deviceClass(headers),
    source: "client",
    route: null,
  });
  return respond(204);
}
