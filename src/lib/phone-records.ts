import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { normalizePhone } from "@/lib/validation";

type Client = SupabaseClient<Database>;

/** Postgres unique violation: the number is already on another account. */
export const PHONE_TAKEN_CODE = "23505";

/** The number an email sign up typed, waiting in metadata until there is a session. */
export function phoneFromMetadata(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const { phone } = metadata as Record<string, unknown>;
  return typeof phone === "string" ? normalizePhone(phone) : null;
}

/**
 * Every account needs a phone number (issue #285). True when the profile has
 * one. An email sign up's number waits in metadata (there is no session at
 * sign up, so it cannot be written then) and is copied over here on the first
 * signed in request, like the consents. False sends the user to /welcome,
 * including when the copy hits another account's number. If the profile
 * cannot be read, returns true so nobody is locked out by an outage.
 */
export async function hasRecordedPhone(supabase: Client, userId: string, metadata: unknown): Promise<boolean> {
  const { data, error } = await supabase.from("profiles").select("phone").eq("id", userId).maybeSingle();
  if (error) {
    console.error("phone lookup failed", { code: error.code, message: error.message });
    return true;
  }
  if (data?.phone) return true;
  const pending = phoneFromMetadata(metadata);
  if (!pending) return false;
  return (await savePhone(supabase, userId, pending)) === "saved";
}

/** Writes the number to the profile. "taken" when another account has it. */
export async function savePhone(supabase: Client, userId: string, phone: string): Promise<"saved" | "taken" | "failed"> {
  const { error } = await supabase.from("profiles").update({ phone }).eq("id", userId);
  if (!error) return "saved";
  if (error.code === PHONE_TAKEN_CODE) return "taken";
  console.error("savePhone failed", { code: error.code, message: error.message });
  return "failed";
}
