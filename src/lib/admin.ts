import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import { getMyProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

/**
 * The admin check for pages and Server Actions: a signed in user whose
 * profiles.role is 'admin'. Signed out visitors go to /login (via
 * requireUser); everyone else gets a 404 so the admin area stays unlisted.
 * Reads the session, so page callers must sit inside <Suspense>. RLS
 * (private.is_admin) enforces the same rule again in the database.
 */
export const requireAdmin = cache(async () => {
  const profile = await getMyProfile();
  if (profile.role !== "admin") notFound();
  return { supabase: await createClient() };
});
