"use server";

import { trackResult } from "@/lib/analytics/track";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { parseDisplayPrefs } from "./prefs";

/**
 * Saves display prefs on the signed in user's profile so they follow them to
 * other devices. Re-checks the session and re-validates the value; RLS and
 * the column grant limit the write to the user's own display_prefs. Signed
 * out callers get ok: false (the device copy is all they have).
 */
export async function saveDisplayPrefsToProfile(input: unknown): Promise<{ ok: boolean }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false };
  const prefs = parseDisplayPrefs(input);
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ display_prefs: prefs }).eq("id", user.id);
  await trackResult("display_prefs_saved", error);
  return { ok: !error };
}
