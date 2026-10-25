"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import type { FieldErrors } from "@/lib/validation";
import { parsePublicProfile, type PublicProfileData, type PublicProfileFields } from "@/lib/social/public-profile";

export type PublicProfileState = {
  errors?: FieldErrors<PublicProfileFields>;
  message?: string;
  saved?: PublicProfileData & { at: number };
};

export async function updatePublicProfile(_prev: PublicProfileState, form: FormData): Promise<PublicProfileState> {
  const user = await requireUser();
  const { data, errors } = parsePublicProfile(form);
  if (Object.keys(errors).length) return { errors };

  const supabase = await createClient();
  const { data: before } = await supabase.from("profiles").select("is_public, public_slug").eq("id", user.id).single();
  const { error } = await supabase.from("profiles").update(data).eq("id", user.id);
  if (error) {
    if (error.code === "23505") return { errors: { public_slug: "That link name is taken. Try another." } };
    if (error.code === "23514") return { message: "Some of those details don't fit. Check the fields and try again." };
    return { message: "We couldn't save your changes. Try again." };
  }

  if (data.is_public && !before?.is_public) {
    // Insert only: no .select(), learners cannot read events back.
    await supabase.from("events").insert({ name: "profile_published", profile_id: user.id });
  }
  if (before?.public_slug) revalidatePath(`/u/${before.public_slug}`);
  if (data.public_slug) revalidatePath(`/u/${data.public_slug}`);
  return { saved: { ...data, at: Date.now() } };
}
