import "server-only";
import { createAdminClient } from "@/lib/messaging/admin";
import { OPT_OUT_COOKIE, deviceClass, optedOutRequest, routeFromFilePath } from "./context";
import { validateProps } from "./events";
import { recordEvents } from "./track";

type RequestInfo = { path: string; method: string; headers: Record<string, string | string[] | undefined> };
type ContextInfo = { routePath?: string; routeType?: string };

/** Errors Next throws on purpose (redirect, notFound, dynamic bailouts): not failures. */
const CONTROL_FLOW = /^(NEXT_REDIRECT|NEXT_HTTP_ERROR_FALLBACK|NEXT_NOT_FOUND|DYNAMIC_SERVER_USAGE|BAILOUT_TO_CLIENT_SIDE_RENDERING|NEXT_PRERENDER_INTERRUPTED|HANGING_PROMISE_REJECTION)/;

function headerSource(headers: RequestInfo["headers"]) {
  return {
    get(name: string) {
      const value = headers[name.toLowerCase()];
      return Array.isArray(value) ? (value[0] ?? null) : (value ?? null);
    },
  };
}

function cookieValue(cookieHeader: string | null, name: string) {
  return cookieHeader?.split(/;\s*/).find((c) => c.startsWith(`${name}=`))?.slice(name.length + 1) ?? null;
}

/** The server_error event for an error Next caught, or null when it is not one to record. Pure. */
export function serverErrorEvent(error: unknown, request: RequestInfo, context: ContextInfo) {
  const err = error as { digest?: unknown; name?: unknown } | null;
  const digest = typeof err?.digest === "string" ? err.digest : undefined;
  if (digest && CONTROL_FLOW.test(digest)) return null;
  const headers = headerSource(request.headers);
  if (optedOutRequest(headers, cookieValue(headers.get("cookie"), OPT_OUT_COOKIE))) return null;
  return {
    event: {
      name: "server_error" as const,
      props: validateProps("server_error", {
        route_type: context.routeType,
        digest,
        error: typeof err?.name === "string" ? err.name : undefined,
      }),
    },
    route: routeFromFilePath(context.routePath),
    device: deviceClass(headers),
  };
}

/**
 * Records a server error from instrumentation's onRequestError: thrown
 * Server Action errors, Route Handler errors (which answer 500) and render
 * errors. Written with the service role (there is no user session here), so
 * it is anonymous. Never the message or the stack. Without
 * SUPABASE_SECRET_KEY it only logs.
 */
export async function reportServerError(error: unknown, request: RequestInfo, context: ContextInfo) {
  try {
    const found = serverErrorEvent(error, request, context);
    if (!found) return;
    const admin = createAdminClient();
    if (!admin) return;
    await recordEvents(admin, [{ ...found.event, route: found.route }], {
      anonymous_id: null,
      session_id: null,
      device_class: found.device,
      source: "server",
      route: found.route,
    });
  } catch (cause) {
    console.error("server error not recorded", { message: cause instanceof Error ? cause.message : String(cause) });
  }
}
