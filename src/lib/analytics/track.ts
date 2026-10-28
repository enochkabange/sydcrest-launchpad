import "server-only";
import { after } from "next/server";
import { cookies, headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { ANONYMOUS_ID_COOKIE, isAnonymousId } from "./anonymous-id";
import {
  OPT_OUT_COOKIE,
  ROUTE_COOKIE,
  SESSION_COOKIE,
  cleanRoute,
  coarseRoute,
  deviceClass,
  isSessionId,
  optedOutRequest,
} from "./context";
import { isEventName, validateProps, type EventName, type EventProps, type PropsOf, type Refusal } from "./events";
import { classifyError, errorCode, type ErrorLike } from "./refusal";

/**
 * Server side analytics (issue #242). Every function here is fire and
 * forget: it never throws, and the database write runs after the response
 * (next/server `after`), so analytics can never slow down or break the action
 * that calls it.
 *
 * Who the person is, and their role, track, region, chapter and cohort, are
 * worked out by the database from the session (public.record_events); the
 * app sends only the event, its props and the request context (device class,
 * route pattern, tab session, anonymous visitor id).
 *
 * Nothing is recorded when the visitor has Do Not Track or Global Privacy
 * Control on, or turned analytics off on the privacy page.
 */

export type EventRow = { name: EventName; props: EventProps; route?: string | null };

export type EventContext = {
  anonymous_id: string | null;
  session_id: string | null;
  device_class: string;
  source: "server" | "client";
  route: string | null;
};

type RecordClient = Awaited<ReturnType<typeof createClient>>;

/** Writes a batch through the definer function. Logs, never throws. */
export async function recordEvents(client: Pick<RecordClient, "rpc">, events: EventRow[], context: EventContext) {
  if (!events.length) return;
  try {
    const { error } = await client.rpc("record_events", { p_events: events, p_context: context });
    if (error) console.error("analytics failed", { count: events.length, code: error.code, message: error.message });
  } catch (error) {
    console.error("analytics failed", { count: events.length, error: error instanceof Error ? error.message : String(error) });
  }
}

/** The request's context, or null when the visitor opted out. */
async function requestContext(): Promise<EventContext | null> {
  const [h, c] = await Promise.all([headers(), cookies()]);
  if (optedOutRequest(h, c.get(OPT_OUT_COOKIE)?.value)) return null;
  const anonymousId = c.get(ANONYMOUS_ID_COOKIE)?.value;
  const sessionId = c.get(SESSION_COOKIE)?.value;
  return {
    anonymous_id: isAnonymousId(anonymousId) ? anonymousId : null,
    session_id: isSessionId(sessionId) ? sessionId : null,
    device_class: deviceClass(h),
    source: "server",
    route: cleanRoute(c.get(ROUTE_COOKIE)?.value) ?? refererRoute(h.get("referer"), h.get("host")),
  };
}

/** Same site referer only, reduced to a safe route shape. */
function refererRoute(referer: string | null, host: string | null): string | null {
  if (!referer || !URL.canParse(referer)) return null;
  const url = new URL(referer);
  if (host && url.host !== host) return null;
  return coarseRoute(url.pathname);
}

/** Runs the write after the response; outside a request (tests, scripts) it runs now. */
async function later(task: () => Promise<void>) {
  try {
    after(task);
  } catch {
    await task();
  }
}

async function send(events: EventRow[], wait: boolean) {
  try {
    const context = await requestContext();
    if (!context) return;
    const supabase = await createClient();
    const task = () => recordEvents(supabase, events, context);
    if (wait) await task();
    else await later(task);
  } catch (error) {
    console.error("analytics failed", { error: error instanceof Error ? error.message : String(error) });
  }
}

/** Records one event for the signed in person or the anonymous visitor. */
export async function track<N extends EventName>(name: N, props?: PropsOf<N>): Promise<void> {
  if (!isEventName(name)) return;
  await send([{ name, props: validateProps(name, props) }], false);
}

/**
 * As track, but waits for the write. For Server Components, where request
 * data is not available inside `after`.
 */
export async function trackNow<N extends EventName>(name: N, props?: PropsOf<N>): Promise<void> {
  if (!isEventName(name)) return;
  await send([{ name, props: validateProps(name, props) }], true);
}

/** Records that an action refused: which action, why, and the database code if there was one. */
export async function trackRefusal(action: EventName, refusal: Refusal, code?: string): Promise<void> {
  await send([{ name: "action_failed", props: validateProps("action_failed", { action, refusal, code }) }], false);
}

/**
 * The one line most actions need after their main write: the success event
 * when there was no error, action_failed with the refusal type and code when
 * there was.
 */
export async function trackResult<N extends EventName>(name: N, error: ErrorLike, props?: PropsOf<N>): Promise<void> {
  if (error) await trackRefusal(name, classifyError(error), errorCode(error));
  else await track(name, props);
}
