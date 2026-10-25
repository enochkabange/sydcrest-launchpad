import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasAgeAndConsent } from "@/lib/legal";

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
  return {
    id: claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    // Google sign ups arrive without these until they finish /welcome.
    hasAgeAndConsent: hasAgeAndConsent(claims.user_metadata),
  };
});

/**
 * A signed in user who has passed the age check and agreed to the terms.
 * Anyone missing those (Google sign ups on first visit) goes to /welcome.
 * The proxy does the same redirect earlier; this is the authoritative check.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.hasAgeAndConsent) redirect("/welcome");
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
