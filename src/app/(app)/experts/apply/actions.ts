"use server";

import { trackRefusal, trackResult } from "@/lib/analytics/track";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { FieldErrors } from "@/lib/validation";
import { applyErrorState, parseApplication, type ApplicationFields } from "@/lib/market-apply/expert";

export type ApplyValues = {
  slug: string;
  headline: string;
  skills: string;
  categories: string[];
  links: string;
  evidence_links: string;
  experience: string;
  motivation: string;
};

export type ApplyState = { errors?: FieldErrors<ApplicationFields>; message?: string; values?: ApplyValues };

function echo(form: FormData): ApplyValues {
  const get = (k: string) => (typeof form.get(k) === "string" ? (form.get(k) as string) : "");
  return {
    slug: get("slug"),
    headline: get("headline"),
    skills: get("skills"),
    categories: form.getAll("categories").filter((c): c is string => typeof c === "string"),
    links: get("links"),
    evidence_links: get("evidence_links"),
    experience: get("experience"),
    motivation: get("motivation"),
  };
}

/**
 * Creates (or refreshes) the pending expert profile and the application an
 * admin reviews, together, through apply_as_expert (issue #249): a profile
 * can no longer exist without an application, so every pending expert is in
 * the admin queue. The database checks the applicant is an adult and keeps
 * one open application per person; fast track for mentors is set there too.
 */
export async function applyAsExpert(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  const user = await requireUser();
  const values = echo(form);
  const { data, errors } = parseApplication(form);
  if (Object.keys(errors).length) {
    await trackRefusal("expert_applied", "validation");
    return { errors, values };
  }

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("expert_profiles")
    .select("profile_id, status")
    .eq("profile_id", user.id)
    .maybeSingle();
  if (existing?.status === "approved") redirect("/expert");

  const { error } = await supabase.rpc("apply_as_expert", {
    p_slug: data.profile.slug,
    p_headline: data.profile.headline,
    p_skills: data.profile.skills,
    p_categories: data.profile.categories,
    p_links: data.profile.links,
    p_motivation: data.application.motivation,
    p_experience: data.application.experience ?? "",
    p_evidence_links: data.application.evidence_links,
  });
  await trackResult("expert_applied", error);
  if (error) return { ...applyErrorState(error.code), values };

  revalidatePath("/experts/apply");
  redirect("/experts/apply?sent=1");
}

/** Withdraws the caller's open application. Status is the only column an applicant may change. */
export async function withdrawApplication(applicationId: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("expert_applications")
    .update({ status: "withdrawn" })
    .eq("id", applicationId)
    .eq("profile_id", user.id)
    .eq("status", "submitted");
  if (error) throw new Error(`Could not withdraw the application: ${error.message}`);
  revalidatePath("/experts/apply");
}
