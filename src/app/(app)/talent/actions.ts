"use server";

import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getMyVerifiedOrganisations } from "@/lib/organisations/queries";
import {
  isUuid,
  parseContactMessage,
  parseListing,
  parseSharedContact,
  type ListingFields,
} from "@/lib/talent/forms";
import type { FieldErrors } from "@/lib/validation";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";

/**
 * Server Actions for the talent directory. Eligibility (adult, live
 * certificate), who may contact whom and what is shared are decided by the
 * database: talent_listings RLS, the contact request insert policy and
 * respond_talent_contact.
 */

export type ListingState = { errors?: FieldErrors<ListingFields>; message?: string; saved?: number };

export async function saveListing(_prev: ListingState, form: FormData): Promise<ListingState> {
  const user = await requireUser();
  const { data, errors } = parseListing(form);
  if (Object.keys(errors).length) return { errors };
  const supabase = await createClient();
  // Insert or update, not upsert: profile_id is insert only (column grants), and an upsert updates every column it sends.
  const { data: existing } = await supabase.from("talent_listings").select("profile_id").eq("profile_id", user.id).maybeSingle();
  const { error } = existing
    ? await supabase.from("talent_listings").update(data).eq("profile_id", user.id)
    : await supabase.from("talent_listings").insert({ ...data, profile_id: user.id });
  if (error) {
    return {
      message:
        error.code === "42501"
          ? "The directory is for adults with a live SydCrest certificate. You can still switch your listing off."
          : "We couldn't save your listing. Try again.",
    };
  }
  refresh();
  return { saved: Date.now() };
}

/** Switching off is always allowed, even after a certificate is revoked. */
export async function setListingActive(active: boolean): Promise<{ message?: string }> {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("talent_listings").update({ is_active: active }).eq("profile_id", user.id);
  if (error) {
    return { message: active ? "You need a live certificate to show your listing." : "We couldn't hide your listing. Try again." };
  }
  refresh();
  return {};
}

export async function deleteListing(): Promise<{ message?: string }> {
  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("talent_listings").delete().eq("profile_id", user.id);
  if (error) return { message: "We couldn't remove your listing. Try again." };
  refresh();
  return {};
}

export type RespondState = { message?: string; error?: string };

/** The learner answers a request. Only what they type here is ever shared. */
export async function respondToRequest(requestId: string, _prev: RespondState, form: FormData): Promise<RespondState> {
  await requireUser();
  if (!isUuid(requestId)) return { message: "That request is not valid." };
  const accept = form.get("answer") === "accept";
  const { contact, error: contactError } = parseSharedContact(String(form.get("shared_contact") ?? ""));
  if (accept && contactError) return { error: contactError };
  const supabase = await createClient();
  const { error } = await supabase.rpc("respond_talent_contact", {
    p_request_id: requestId,
    p_accept: accept,
    ...(accept && contact ? { p_shared_contact: contact } : {}),
  });
  if (error) return { message: "This request was withdrawn or already answered." };
  refresh();
  return {};
}

export type ContactState = { message?: string; error?: string; sent?: boolean };

/** A verified organisation's member asks a listed learner to talk. */
export async function requestContact(profileId: string, _prev: ContactState, form: FormData): Promise<ContactState> {
  const user = await requireUser();
  if (!isUuid(profileId)) return { message: "That learner is not valid." };
  const orgs = await getMyVerifiedOrganisations();
  const organisationId = String(form.get("organisation_id") ?? orgs[0]?.id ?? "");
  if (!orgs.some((o) => o.id === organisationId)) return { message: "Choose one of your verified organisations." };
  const { message, error: messageError } = parseContactMessage(String(form.get("message") ?? ""));
  if (messageError) return { error: messageError };

  const supabase = await createClient();
  const { error } = await supabase.from("talent_contact_requests").insert({
    organisation_id: organisationId,
    profile_id: profileId,
    requested_by: user.id,
    message,
  });
  if (error) {
    if (error.code === "23505") return { message: "Your organisation already has a request waiting for their reply." };
    if (isRateLimited(error)) return { message: RATE_LIMIT_MESSAGE };
    return { message: "We couldn't send the request. They may have left the directory." };
  }
  refresh();
  return { sent: true };
}
