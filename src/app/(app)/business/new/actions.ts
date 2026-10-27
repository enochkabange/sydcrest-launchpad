"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  organisationErrorMessage,
  parseOrganisation,
  slugWithSuffix,
  type OrganisationFields,
} from "@/lib/organisations/forms";
import type { FieldErrors } from "@/lib/validation";
import type { OrganisationValues } from "@/components/business/organisation-fields";

export type CreateOrganisationState = {
  errors?: FieldErrors<OrganisationFields>;
  message?: string;
  values?: Partial<OrganisationValues>;
};

/**
 * Creates an organisation. The database makes the creator its active owner
 * (a trigger) and only lets adults create one (RLS on private.is_adult).
 * New organisations start unverified; the owner asks for review next.
 */
export async function createOrganisation(_prev: CreateOrganisationState, form: FormData): Promise<CreateOrganisationState> {
  const user = await requireUser();
  const { data, errors } = parseOrganisation(form);
  const values = { ...data, slug: typeof form.get("slug") === "string" ? String(form.get("slug")) : "" };
  if (Object.keys(errors).length) return { errors, values };
  if (form.get("acts_for") !== "on") {
    return { message: "Confirm that you are allowed to act for this organisation.", values };
  }

  const supabase = await createClient();
  const slugTyped = Boolean(values.slug.trim());
  let slug = data.slug;
  for (let attempt = 0; attempt < 3; attempt++) {
    const { error } = await supabase.from("organisations").insert({ ...data, slug, created_by: user.id });
    if (!error) redirect(`/org/${slug}/manage?created=1`);
    if (error.code === "23505" && !slugTyped) {
      // The address made from the name is taken; add a short random tail and try again.
      slug = slugWithSuffix(data.slug, crypto.randomUUID().slice(0, 6));
      continue;
    }
    if (error.code === "23505") return { errors: { slug: organisationErrorMessage("23505", "") }, values };
    return { message: organisationErrorMessage(error.code, "We couldn't create the organisation. Try again."), values };
  }
  return { message: "We couldn't find a free web address. Type one yourself.", values };
}
