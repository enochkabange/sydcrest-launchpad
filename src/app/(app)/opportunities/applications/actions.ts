"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

/** Withdraws one of the caller's applications. Stage is the only column a learner may change, and only to withdrawn. */
export async function withdrawOpportunityApplication(applicationId: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("opportunity_applications")
    .update({ stage: "withdrawn" })
    .eq("id", applicationId)
    .eq("profile_id", user.id);
  if (error) throw new Error(`Could not withdraw the application: ${error.message}`);
  revalidatePath("/opportunities/applications");
}
