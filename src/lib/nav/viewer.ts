import "server-only";
import { cache } from "react";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { NavRoles } from "./config";

export type NavViewer = {
  name: string | null;
  email: string | null;
  roles: NavRoles;
  /** profiles.display_prefs, unparsed (DisplayPrefsSync validates it). */
  displayPrefs: unknown;
};

/**
 * Who is looking, for the navigation only: null for a visitor. Never
 * redirects (unlike requireUser), so public pages can call it for signed out
 * visitors and for Google sign ups who have not finished /welcome yet; every
 * page still authorizes itself. Reads the session, so callers sit inside
 * <Suspense>. Each check is an existence read that RLS scopes to the user.
 * A failed read hides that role's items rather than breaking the page.
 */
export const getNavViewer = cache(async (): Promise<NavViewer | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  const [profile, staff, expert, business] = await Promise.all([
    supabase.from("profiles").select("display_name, role, display_prefs").eq("id", user.id).maybeSingle(),
    supabase
      .from("cohort_members")
      .select("cohort_id", { count: "exact", head: true })
      .eq("profile_id", user.id)
      .in("role", ["mentor", "coordinator"]),
    supabase.from("expert_profiles").select("profile_id", { count: "exact", head: true }).eq("profile_id", user.id),
    supabase
      .from("organisation_members")
      .select("organisation_id", { count: "exact", head: true })
      .eq("profile_id", user.id)
      .in("status", ["active", "invited"]),
  ]);
  const has = (r: { count: number | null; error: unknown }) => !r.error && (r.count ?? 0) > 0;
  const admin = profile.data?.role === "admin";
  return {
    name: profile.data?.display_name ?? null,
    email: user.email,
    roles: { admin, staff: admin || has(staff), expert: has(expert), business: has(business) },
    displayPrefs: profile.data?.display_prefs ?? null,
  };
});
