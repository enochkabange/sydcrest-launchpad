"use server";

import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { WHATSAPP_CONSENT_KIND, WHATSAPP_CONSENT_VERSION } from "@/lib/messaging/consent";
import { sendWhatsApp } from "@/lib/messaging/send";
import { firstName } from "@/lib/messaging/templates";

export type WhatsAppState = { enabled?: boolean; message?: string; saved?: number };

export async function setWhatsAppConsent(_prev: WhatsAppState, form: FormData): Promise<WhatsAppState> {
  // Re-check the session inside the action; never trust the form for identity.
  const user = await requireUser();
  const want = form.get("whatsapp") === "on";
  const supabase = await createClient();

  if (!want) {
    const { error } = await supabase.rpc("revoke_consent", { p_kind: WHATSAPP_CONSENT_KIND });
    if (error) return { enabled: true, message: "We couldn't save your choice. Try again." };
    return { enabled: false, saved: Date.now() };
  }

  const { data: profile } = await supabase.from("profiles").select("phone, display_name").eq("id", user.id).single();
  if (!profile?.phone) {
    return { enabled: false, message: "Save a phone number above first, then turn on WhatsApp updates." };
  }

  const { data: existing, error: readError } = await supabase
    .from("consents")
    .select("version, revoked_at")
    .eq("profile_id", user.id)
    .eq("kind", WHATSAPP_CONSENT_KIND);
  if (readError) return { enabled: false, message: "We couldn't save your choice. Try again." };

  const live = existing.some((c) => c.version === WHATSAPP_CONSENT_VERSION && c.revoked_at === null);
  if (!live) {
    // No .select() after insert: the insert grant is column restricted.
    const { error } = await supabase.from("consents").insert({ kind: WHATSAPP_CONSENT_KIND, version: WHATSAPP_CONSENT_VERSION });
    if (error) return { enabled: false, message: "We couldn't save your choice. Try again." };
  }

  // Welcome only on the very first opt in, never when someone turns it back on.
  if (existing.length === 0) {
    await sendWhatsApp(profile.phone, "welcome", { name: firstName(profile.display_name) });
  }
  return { enabled: true, saved: Date.now() };
}
