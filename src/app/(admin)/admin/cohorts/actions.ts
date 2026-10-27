"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { friendlyDbError, isEmail, parseCohortForm } from "@/lib/mentor/progress";
import { findUserIdByEmail } from "@/lib/mentor/staff-lookup";

/**
 * Cohort admin (issue #146). Admins create cohorts and add, change and remove
 * mentors and coordinators directly, as RLS allows. Learners join only
 * through decide_application, so nothing here touches learner rows.
 */

export type AdminFormState = {
  ok?: string;
  message?: string;
  errors?: Partial<Record<string, string>>;
  at?: number;
};

export async function createCohort(_prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseCohortForm(form);
  if (Object.keys(errors).length) return { errors };
  const { data: row, error } = await supabase.from("cohorts").insert(data).select("id").single();
  if (error) {
    if (error.code === "23505") return { errors: { name: "This programme already has a cohort with that name." } };
    return { message: friendlyDbError(error, "We could not create the cohort. Try again.") };
  }
  redirect(`/admin/cohorts/${row.id}`);
}

export async function updateCohort(cohortId: string, _prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseCohortForm(form);
  if (Object.keys(errors).length) return { errors };
  const { name, starts_on, max_size, status } = data;
  const { error } = await supabase.from("cohorts").update({ name, starts_on, max_size, status }).eq("id", cohortId);
  if (error) {
    if (error.code === "23505") return { errors: { name: "This programme already has a cohort with that name." } };
    return { message: friendlyDbError(error, "We could not save the cohort. Try again.") };
  }
  refresh();
  return { ok: "Cohort saved.", at: Date.now() };
}

export async function addStaff(cohortId: string, _prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  const { supabase } = await requireAdmin();
  const email = String(form.get("email") ?? "").trim();
  const role = String(form.get("role") ?? "");
  const errors: AdminFormState["errors"] = {};
  if (!isEmail(email)) errors.email = "Enter the email they sign in with.";
  if (role !== "mentor" && role !== "coordinator") errors.role = "Choose mentor or coordinator.";
  if (Object.keys(errors).length) return { errors };

  const id = await findUserIdByEmail(email);
  if (id === "unavailable") return { message: "Looking people up by email needs the server key, which is not set here." };
  if (!id) return { errors: { email: "No account uses that email. Ask them to sign up first." } };

  const { error } = await supabase.from("cohort_members").insert({ cohort_id: cohortId, profile_id: id, role });
  if (error) {
    if (error.code === "23505") return { message: "That person is already in this cohort." };
    return { message: friendlyDbError(error, "We could not add them. Try again.") };
  }
  refresh();
  return { ok: `Added as ${role}.`, at: Date.now() };
}

export async function setStaffRole(memberId: string, role: "mentor" | "coordinator") {
  const { supabase } = await requireAdmin();
  await supabase.from("cohort_members").update({ role }).eq("id", memberId).neq("role", "learner");
  refresh();
}

export async function removeStaff(memberId: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("cohort_members").delete().eq("id", memberId).neq("role", "learner");
  refresh();
}
