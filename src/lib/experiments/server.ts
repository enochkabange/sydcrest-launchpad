import "server-only";
import { cache } from "react";
import { after } from "next/server";
import { cookies, headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  ANONYMOUS_ID_COOKIE,
  isAnonymousId,
} from "@/lib/analytics/anonymous-id";
import {
  OPT_OUT_COOKIE,
  ROUTE_COOKIE,
  SESSION_COOKIE,
  cleanRoute,
  deviceClass,
  isSessionId,
  optedOutRequest,
} from "@/lib/analytics/context";
import { assign, parseVariants, type Variant } from "./assign";
import { recordExposure } from "./record";

/** The variants of a running experiment, or null. One read per experiment per request. */
const runningVariants = cache(
  async (key: string): Promise<Variant[] | null> => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.rpc("running_experiment", {
        p_key: key,
      });
      if (error) {
        console.error("experiments: could not read", {
          key,
          code: error.code,
          message: error.message,
        });
        return null;
      }
      return parseVariants(data);
    } catch (error) {
      console.error("experiments: could not read", {
        key,
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  },
);

/**
 * The variant of experiment `key` for whoever is making this request, for
 * Server Components and Server Actions. Stable per person (signed in: their
 * account; signed out: this device's anonymous id). Records the first
 * exposure after the response.
 *
 * Returns null, and records nothing, when no experiment by that key is
 * running: test for the change, never for the control, e.g.
 * `(await variant("new_welcome")) === "on"`, so null behaves as the control.
 * Returns the control (the first variant) and records nothing when the
 * visitor turned analytics off (or has Do Not Track or Global Privacy
 * Control on), or when there is no one to assign yet (a first visit, before
 * the anonymous id cookie is set).
 */
export async function variant(key: string): Promise<string | null> {
  const variants = await runningVariants(key);
  if (!variants) return null;
  const control = variants[0].code;
  try {
    const [h, c] = await Promise.all([headers(), cookies()]);
    if (optedOutRequest(h, c.get(OPT_OUT_COOKIE)?.value)) return control;

    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const profileId =
      typeof data?.claims?.sub === "string" ? data.claims.sub : null;
    const anonymousId = c.get(ANONYMOUS_ID_COOKIE)?.value;
    const subject =
      profileId ?? (isAnonymousId(anonymousId) ? anonymousId : null);
    if (!subject) return control;

    const chosen = assign(key, subject, variants);
    const sessionId = c.get(SESSION_COOKIE)?.value;
    const context = {
      anonymous_id: isAnonymousId(anonymousId) ? anonymousId : null,
      session_id: isSessionId(sessionId) ? sessionId : null,
      device_class: deviceClass(h),
      route: cleanRoute(c.get(ROUTE_COOKIE)?.value),
    };
    const task = () => recordExposure(supabase, key, chosen, context);
    try {
      after(task);
    } catch {
      await task();
    }
    return chosen;
  } catch (error) {
    console.error("experiments: assignment failed", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });
    return control;
  }
}
