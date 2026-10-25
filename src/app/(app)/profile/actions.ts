"use server";

import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { parseProfile, type FieldErrors } from "@/lib/validation";

export type ProfileState = {
  errors?: FieldErrors<"display_name" | "region" | "phone">;
  message?: string;
  saved?: { display_name: string; region: string | null; phone: string | null; at: number };
};

export async function updateProfile(_prev: ProfileState, form: FormData): Promise<ProfileState> {
  // Re-check the session inside the action; never trust the form for identity.
  const user = await requireUser();
  const { data, errors } = parseProfile(form);
  if (Object.keys(errors).length) return { errors };

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update(data).eq("id", user.id);
  if (error) return { message: "We couldn't save your changes. Try again." };
  return { saved: { ...data, at: Date.now() } };
}
