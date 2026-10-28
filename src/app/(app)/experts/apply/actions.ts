"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { FieldErrors } from "@/lib/validation";
import { parseApplication, type ApplicationFields } from "@/lib/market-apply/expert";
import { ADULTS_ONLY_MESSAGE, PG } from "@/lib/market-apply/data";

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
 * Creates (or refreshes) the pending expert profile, then the application an
 * admin reviews. The profile must exist first: applications reference it.
 * The database checks the applicant is an adult and keeps one open
 * application per person; fast track for mentors is set there too.
 */
export async function applyAsExpert(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  const user = await requireUser();
  const values = echo(form);
  const { data, errors } = parseApplication(form);
  if (Object.keys(errors).length) return { errors, values };

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("expert_profiles")
    .select("profile_id, status")
    .eq("profile_id", user.id)
    .maybeSingle();
  if (existing?.status === "approved") redirect("/expert");

  const profileWrite = existing
    ? supabase.from("expert_profiles").update(data.profile).eq("profile_id", user.id)
    : supabase.from("expert_profiles").insert({ profile_id: user.id, ...data.profile });
  const { error: profileError } = await profileWrite;
  if (profileError) {
    if (profileError.code === PG.uniqueViolation) {
      return { errors: { slug: "That link name is taken. Try another." }, values };
    }
    if (profileError.code === PG.rlsViolation) return { message: ADULTS_ONLY_MESSAGE, values };
    return { message: "We couldn't save your application. Try again.", values };
  }

  const { error } = await supabase.from("expert_applications").insert({ profile_id: user.id, ...data.application });
  if (error) {
    if (error.code === PG.uniqueViolation) {
      return { message: "You already have an application in review. You can see its status on this page.", values };
    }
    if (error.code === PG.rlsViolation) return { message: ADULTS_ONLY_MESSAGE, values };
    return { message: "We couldn't send your application. Try again.", values };
  }

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
