import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { sortCaseload } from "./rules";

type Fns = Database["public"]["Functions"];
export type CaseloadEntry = Fns["mentor_caseload"]["Returns"][number];
export type CheckInEntry = Fns["chapter_check_ins"]["Returns"][number];

/**
 * One cohort's caseload, sorted (risk, then longest since contact, then the
 * nearest deadline). Runs as the signed in user: mentor_caseload refuses
 * anyone who is not staff of the cohort or an admin.
 */
export async function loadCaseload(cohortId: string): Promise<CaseloadEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("mentor_caseload", { p_cohort_id: cohortId });
  if (error) throw new Error(`Could not load the caseload: ${error.message}`);
  return sortCaseload(data ?? []);
}

/** Flagged members routed to a chapter's lead, sorted like the caseload. Leads and admins only. */
export async function loadChapterCheckIns(chapterId: string): Promise<CheckInEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("chapter_check_ins", { p_chapter_id: chapterId });
  if (error) throw new Error(`Could not load the check in list: ${error.message}`);
  return sortCaseload(data ?? []);
}
