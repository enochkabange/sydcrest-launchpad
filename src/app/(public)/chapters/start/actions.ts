"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { parseChapterApplication, type ChapterApplicationValues } from "@/lib/chapters/applications";
import { createClient } from "@/lib/supabase/server";

export type StartChapterState = {
  errors?: Partial<Record<keyof ChapterApplicationValues, string>>;
  message?: string;
  values?: ChapterApplicationValues;
};

/**
 * Sends an application to start and lead a chapter (#301). The database
 * checks the applicant is an adult and keeps one open application per
 * person (23505 here); an admin decides in /admin/chapters/applications.
 */
export async function applyToStartChapter(_prev: StartChapterState, form: FormData): Promise<StartChapterState> {
  await requireUser();
  const { data, errors } = parseChapterApplication(form);
  if (Object.keys(errors).length) return { errors, values: data };

  const supabase = await createClient();
  const { error } = await supabase.from("chapter_applications").insert(data);
  if (error) {
    if (error.code === "23505") return { message: "You already have an application in review.", values: data };
    console.error("chapter application failed", { code: error.code, message: error.message });
    return { message: "We couldn't send that. Try again.", values: data };
  }
  revalidatePath("/chapters/start");
  redirect("/chapters/start?sent=1");
}

/** Withdraws the caller's open application. Status is the only column an applicant may change. */
export async function withdrawChapterApplication(applicationId: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("chapter_applications")
    .update({ status: "withdrawn" })
    .eq("id", applicationId)
    .eq("profile_id", user.id)
    .eq("status", "submitted");
  if (error) throw new Error(`Could not withdraw the application: ${error.message}`);
  revalidatePath("/chapters/start");
}
