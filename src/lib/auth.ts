import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
  return { id: claims.sub, email: typeof claims.email === "string" ? claims.email : null };
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export const getMyProfile = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, region, avatar_url, role")
    .eq("id", user.id)
    .single();
  if (error) throw new Error(`Could not load profile: ${error.message}`);
  return { ...data, email: user.email };
});
