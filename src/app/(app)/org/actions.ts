"use server";

import { trackResult } from "@/lib/analytics/track";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { isUuid } from "@/lib/talent/forms";
import { organisationErrorMessage } from "@/lib/organisations/forms";

export type InviteResponseState = { message?: string };

/** Accept an invitation (accept_organisation_invite: adults only). */
export async function acceptInvite(organisationId: string, slug: string): Promise<InviteResponseState> {
  await requireUser();
  if (!isUuid(organisationId)) return { message: "That invitation is not valid." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("accept_organisation_invite", { p_organisation_id: organisationId });
  await trackResult("organisation_invite_accepted", error);
  if (error) {
    return {
      message:
        error.code === "42501"
          ? "Business accounts are for adults (18 and over)."
          : "That invitation is no longer open.",
    };
  }
  redirect(`/org/${slug}/manage`);
}

/** Decline an invitation or leave an organisation: delete your own membership row (RLS allows it). */
export async function leaveOrganisation(organisationId: string): Promise<InviteResponseState> {
  const user = await requireUser();
  if (!isUuid(organisationId)) return { message: "That organisation is not valid." };
  const supabase = await createClient();
  const { error, count } = await supabase
    .from("organisation_members")
    .delete({ count: "exact" })
    .eq("organisation_id", organisationId)
    .eq("profile_id", user.id);
  if (error) return { message: organisationErrorMessage(error.code, "We couldn't do that. Try again.") };
  if (!count) return { message: "You are not a member of that organisation." };
  refresh();
  return {};
}
