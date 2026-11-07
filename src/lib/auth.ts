import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasAgeAndRecordedConsent } from "@/lib/consent-records";
import { hasRecordedPhone } from "@/lib/phone-records";

/**
 * The one place that decides who is signed in (the Data Access Layer).
 * getClaims verifies the JWT signature; never authorize from getSession.
 * Reads cookies, so callers must sit inside a <Suspense> boundary.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) return null;
  // Google sign ups arrive without these until they finish /welcome.
  // Terms and privacy come from the consents table (backfilled from
  // metadata on first use); the metadata check is the fallback.
  const hasAgeAndConsent = await hasAgeAndRecordedConsent(supabase, claims.sub, claims.user_metadata);
  // Every account needs a phone number (#285); accounts without one go to /welcome.
  const hasPhone = await hasRecordedPhone(supabase, claims.sub, claims.user_metadata);
  return {
    id: claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    hasAgeAndConsent,
    hasPhone,
    /** Age, terms and phone all done: what every signed in feature checks. */
    isSetUp: hasAgeAndConsent && hasPhone,
  };
});

/**
 * A signed in user who has passed the age check, agreed to the terms and
 * given a phone number. Anyone missing those (Google sign ups on first visit,
 * accounts from before #285) goes to /welcome.
 * The proxy does the same redirect earlier; this is the authoritative check.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isSetUp) redirect("/welcome");
  return user;
}

export const getMyProfile = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, region, phone, avatar_url, role")
    .eq("id", user.id)
    .single();
  if (error) throw new Error(`Could not load profile: ${error.message}`);
  return { ...data, email: user.email };
});
