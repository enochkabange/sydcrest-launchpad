"use server";

import { refresh } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { parseProfile, type FieldErrors } from "@/lib/validation";
import { phoneChangeRevokes, WHATSAPP_CONSENT_KIND } from "@/lib/messaging/consent";

export type ProfileState = {
  errors?: FieldErrors<"display_name" | "region" | "phone">;
  message?: string;
  saved?: { display_name: string; region: string | null; phone: string | null; at: number };
  /** The new number turned WhatsApp updates off; ask them to opt in again. */
  whatsappOff?: boolean;
};

export async function updateProfile(_prev: ProfileState, form: FormData): Promise<ProfileState> {
  // Re-check the session inside the action; never trust the form for identity.
  const user = await requireUser();
  const { data, errors } = parseProfile(form);
  if (Object.keys(errors).length) return { errors };

  const supabase = await createClient();
  // A database trigger revokes WhatsApp consent given for another number when
  // the phone changes; look first so we can say so.
  const { data: live } = await supabase
    .from("consents")
    .select("phone")
    .eq("profile_id", user.id)
    .eq("kind", WHATSAPP_CONSENT_KIND)
    .is("revoked_at", null);
  const { error } = await supabase.from("profiles").update(data).eq("id", user.id);
  if (error) return { message: "We couldn't save your changes. Try again." };
  const whatsappOff = phoneChangeRevokes(live ?? [], data.phone);
  // Re-render the page so the public profile preview shows the new name and region.
  refresh();
  return { saved: { ...data, at: Date.now() }, whatsappOff };
}
