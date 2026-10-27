import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Reads for business accounts (issue #161). Member reads go through the
 * signed in client, so RLS decides; public reads use the anon client and the
 * public_organisations view (verified only, never the registration number).
 * Reads cookies: callers sit inside <Suspense>.
 */

export type Membership = {
  role: string;
  status: string;
  organisation: {
    id: string;
    slug: string;
    name: string;
    kind: string;
    region: string | null;
    verification_status: string;
  };
};

/** Every organisation the signed in person belongs to or is invited to. */
export const getMyMemberships = cache(async (): Promise<Membership[]> => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organisation_members")
    .select("role, status, created_at, organisations(id, slug, name, kind, region, verification_status)")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Could not load your organisations: ${error.message}`);
  return (data ?? []).flatMap((m) => (m.organisations ? [{ role: m.role, status: m.status, organisation: m.organisations }] : []));
});

/** Verified organisations the person acts for (any active role may contact talent). */
export async function getMyVerifiedOrganisations() {
  const memberships = await getMyMemberships();
  return memberships
    .filter((m) => m.status === "active" && m.organisation.verification_status === "verified")
    .map((m) => ({ ...m.organisation, role: m.role }));
}

/**
 * The organisation behind /org/[slug] for one of its active members, with
 * their role. Anyone else gets a 404, so the area stays unlisted.
 */
export const getOrgForMember = cache(async (slug: string) => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: org } = await supabase
    .from("organisations")
    .select("id, slug, name, kind, description, website, region, logo_url, registration_number, verification_status, verification_note, verified_at, created_at")
    .eq("slug", slug.toLowerCase())
    .maybeSingle();
  if (!org) notFound();
  const { data: me } = await supabase
    .from("organisation_members")
    .select("role, status")
    .eq("organisation_id", org.id)
    .eq("profile_id", user.id)
    .maybeSingle();
  if (!me || me.status !== "active") notFound();
  return { org, role: me.role, userId: user.id };
});

/** A verified organisation's public profile, or null. */
export const getPublicOrganisation = cache(async (slug: string) => {
  const supabase = await createPublicClient();
  const { data } = await supabase.from("public_organisations").select("*").eq("slug", slug.toLowerCase()).maybeSingle();
  return data?.id ? data : null;
});

/** Names of verified organisations by id, for people who are not members (learners reading requests). */
export async function getPublicOrganisationNames(ids: string[]) {
  if (!ids.length) return new Map<string, { name: string; slug: string }>();
  const supabase = await createPublicClient();
  const { data } = await supabase.from("public_organisations").select("id, name, slug").in("id", ids);
  return new Map((data ?? []).flatMap((o) => (o.id && o.name && o.slug ? [[o.id, { name: o.name, slug: o.slug }]] : [])));
}
