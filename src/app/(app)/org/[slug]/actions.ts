"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getPublicProfileBySlug } from "@/lib/social/queries";
import {
  assignableRoles,
  isOrgRole,
  organisationErrorMessage,
  parseOrganisation,
  parseProfileSlug,
  type OrganisationFields,
} from "@/lib/organisations/forms";
import { isUuid } from "@/lib/talent/forms";
import type { FieldErrors } from "@/lib/validation";
import { parseOpportunityForm, rejected, type OpportunityFormState } from "@/lib/opportunities/form";
import { revalidateOpportunities } from "@/lib/opportunities/revalidate";

/**
 * Server Actions for an organisation's member area. Each re-checks the user
 * and leaves the real decision to the database: RLS on organisations and
 * organisation_members, the last owner trigger, and the definer functions
 * request_organisation_verification and withdraw_talent_contact.
 */

async function myRole(organisationId: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from("organisation_members")
    .select("role, status")
    .eq("organisation_id", organisationId)
    .eq("profile_id", user.id)
    .maybeSingle();
  return { user, supabase, role: data?.status === "active" ? data.role : null };
}

export type UpdateOrganisationState = {
  errors?: FieldErrors<OrganisationFields>;
  message?: string;
  saved?: number;
  /** A verified organisation changed its name or registration number and went back to review. */
  backToReview?: boolean;
};

export async function updateOrganisation(
  organisationId: string,
  _prev: UpdateOrganisationState,
  form: FormData,
): Promise<UpdateOrganisationState> {
  if (!isUuid(organisationId)) return { message: "That organisation is not valid." };
  const { supabase, role } = await myRole(organisationId);
  if (role !== "owner" && role !== "admin") return { message: "Only owners and admins can edit the profile." };
  const { data, errors } = parseOrganisation(form);
  if (Object.keys(errors).length) return { errors };

  const { data: before } = await supabase.from("organisations").select("slug, verification_status").eq("id", organisationId).single();
  const { data: after, error } = await supabase
    .from("organisations")
    .update(data)
    .eq("id", organisationId)
    .select("slug, verification_status")
    .single();
  if (error) {
    if (error.code === "23505") return { errors: { slug: organisationErrorMessage("23505", "") } };
    return { message: organisationErrorMessage(error.code, "We couldn't save your changes. Try again.") };
  }
  if (before && after.slug !== before.slug) redirect(`/org/${after.slug}/manage`);
  refresh();
  return {
    saved: Date.now(),
    backToReview: before?.verification_status === "verified" && after.verification_status === "pending",
  };
}

export async function requestVerification(organisationId: string): Promise<{ message?: string }> {
  await requireUser();
  if (!isUuid(organisationId)) return { message: "That organisation is not valid." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("request_organisation_verification", { p_organisation_id: organisationId });
  if (error) {
    return {
      message:
        error.code === "42501"
          ? "Only owners and admins can ask for verification."
          : "This organisation is already verified or waiting for review.",
    };
  }
  refresh();
  return {};
}

export type InviteState = { errors?: { profile?: string; role?: string }; message?: string; invited?: string };

/**
 * Invite someone by their public profile link. SydCrest never looks people
 * up by email or phone for this: the colleague shares their own link.
 */
export async function inviteMember(organisationId: string, _prev: InviteState, form: FormData): Promise<InviteState> {
  if (!isUuid(organisationId)) return { message: "That organisation is not valid." };
  const { user, supabase, role: mine } = await myRole(organisationId);
  const roleRaw = form.get("role");
  const role = isOrgRole(roleRaw) ? roleRaw : null;
  if (!role || !assignableRoles(mine).includes(role)) return { errors: { role: "Choose a role you are allowed to give." } };

  const slug = parseProfileSlug(String(form.get("profile") ?? ""));
  if (!slug) return { errors: { profile: "Paste their public profile link, such as https://…/u/their-name." } };
  const profile = await getPublicProfileBySlug(slug);
  if (!profile?.id) {
    return { errors: { profile: "We couldn't find a public profile at that link. Ask them to turn on their public profile and send it again." } };
  }
  if (profile.id === user.id) return { errors: { profile: "That is your own profile." } };

  const { error } = await supabase
    .from("organisation_members")
    .insert({ organisation_id: organisationId, profile_id: profile.id, role, invited_by: user.id });
  if (error) {
    if (error.code === "23505") return { errors: { profile: "They are already a member or invited." } };
    return { message: error.code === "42501" ? "You can't invite people at that role." : "We couldn't send the invitation. Try again." };
  }
  refresh();
  return { invited: profile.display_name ?? "They" };
}

export async function changeMemberRole(organisationId: string, profileId: string, form: FormData): Promise<{ message?: string }> {
  if (!isUuid(organisationId) || !isUuid(profileId)) return { message: "That member is not valid." };
  const { supabase } = await myRole(organisationId);
  const roleRaw = form.get("role");
  if (!isOrgRole(roleRaw)) return { message: "Choose a role." };
  const { data, error } = await supabase
    .from("organisation_members")
    .update({ role: roleRaw })
    .eq("organisation_id", organisationId)
    .eq("profile_id", profileId)
    .select("role");
  if (error) return { message: organisationErrorMessage(error.code, "We couldn't change the role.") };
  if (!data?.length) return { message: "You can't change that member's role." };
  refresh();
  return {};
}

export async function removeMember(organisationId: string, profileId: string): Promise<{ message?: string }> {
  if (!isUuid(organisationId) || !isUuid(profileId)) return { message: "That member is not valid." };
  const { supabase, user } = await myRole(organisationId);
  const { error, count } = await supabase
    .from("organisation_members")
    .delete({ count: "exact" })
    .eq("organisation_id", organisationId)
    .eq("profile_id", profileId);
  if (error) return { message: organisationErrorMessage(error.code, "We couldn't remove them.") };
  if (!count) return { message: "You can't remove that member." };
  if (profileId === user.id) redirect("/org");
  refresh();
  return {};
}

export async function withdrawContactRequest(requestId: string): Promise<{ message?: string }> {
  await requireUser();
  if (!isUuid(requestId)) return { message: "That request is not valid." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("withdraw_talent_contact", { p_request_id: requestId });
  if (error) return { message: "Only a request still waiting for a reply can be withdrawn." };
  refresh();
  return {};
}

const UNIQUE_VIOLATION = "23505";
const RLS_VIOLATION = "42501";

/**
 * Posts an opportunity under the organisation (#161, #177). Owners, admins
 * and recruiters of a verified organisation may post; RLS
 * (private.can_post_for_org) checks that again, and a trigger sets the
 * poster name from the organisation, so the form has no name field.
 */
export async function createOrgOpportunity(
  organisationId: string,
  _prev: OpportunityFormState,
  form: FormData,
): Promise<OpportunityFormState> {
  if (!isUuid(organisationId)) return { message: "That organisation is not valid." };
  const { supabase, role } = await myRole(organisationId);
  const { data, errors } = parseOpportunityForm(form, { mode: "organisation" });
  if (role !== "owner" && role !== "admin" && role !== "recruiter") {
    return rejected(data, form, {}, "Only owners, admins and recruiters can post opportunities.");
  }
  if (Object.keys(errors).length) return rejected(data, form, errors);

  const { data: org } = await supabase.from("organisations").select("slug, verification_status").eq("id", organisationId).single();
  if (org?.verification_status !== "verified") {
    return rejected(data, form, {}, "Posting opens once your organisation is verified.");
  }

  // posted_by defaults to the caller (auth.uid()); RLS requires that. The
  // prepare_opportunity trigger replaces organisation_name with the
  // organisation's own name, so nobody posts as someone else.
  const { error } = await supabase.from("opportunities").insert({ ...data, organisation_id: organisationId, organisation_name: "" });
  if (error?.code === UNIQUE_VIOLATION) return rejected(data, form, { slug: "Another opportunity already uses this slug." });
  if (error) {
    console.error("createOrgOpportunity failed", { code: error.code, message: error.message });
    return rejected(
      data,
      form,
      {},
      error.code === RLS_VIOLATION ? "You can't post for this organisation." : "We couldn't post the opportunity. Try again.",
    );
  }
  revalidateOpportunities();
  redirect(`/org/${org.slug}/opportunities`);
}
