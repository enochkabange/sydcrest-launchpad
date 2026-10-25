import "server-only";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { ANONYMOUS_ID_COOKIE, isAnonymousId } from "./anonymous-id";
import { isEventName, sanitizeProps, type EventName, type EventProps } from "./events";

/**
 * Records one analytics event. Server side only; never throws, so analytics
 * can never break the action that calls it.
 *
 * - Signed in: attributed to the user (RLS allows only their own id).
 * - Signed out: attributed to the anonymous visitor cookie, if there is one.
 *   Pass `profileId: null` when the request is still anonymous even though
 *   an account was just created (sign up awaiting email confirmation).
 *
 * Insert only: never chain .select(); nobody but admins can read events.
 */
export async function track(
  name: EventName,
  props: EventProps = {},
  options: { profileId?: string | null } = {},
): Promise<void> {
  try {
    if (!isEventName(name)) return;
    const supabase = await createClient();
    let profileId = options.profileId;
    if (profileId === undefined) {
      const { data } = await supabase.auth.getClaims();
      profileId = data?.claims?.sub ?? null;
    }
    const cookieValue = (await cookies()).get(ANONYMOUS_ID_COOKIE)?.value;
    const { error } = await supabase.from("events").insert({
      name,
      profile_id: profileId,
      anonymous_id: isAnonymousId(cookieValue) ? cookieValue : null,
      props: sanitizeProps(props),
    });
    if (error) console.error("track failed", { name, code: error.code, message: error.message });
  } catch (error) {
    console.error("track failed", { name, error: error instanceof Error ? error.message : String(error) });
  }
}
