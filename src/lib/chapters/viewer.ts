import "server-only";
import { cache } from "react";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { toPeople, type ChapterPerson } from "./public";

/**
 * Request time chapter reads that depend on who is looking. They read
 * cookies, so callers sit inside <Suspense>. Row level security decides
 * what comes back: the full roster only reaches members of that chapter and
 * admins; everyone else gets the public leads.
 */

export type Viewer = {
  id: string;
  /** The viewer's role in this chapter, or null when they are not in it. */
  role: "member" | "lead" | null;
  isAdmin: boolean;
};

/** Null when signed out. */
export const getChapterViewer = cache(async (chapterId: string): Promise<Viewer | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  const [membership, profile] = await Promise.all([
    supabase.from("chapter_members").select("role").eq("chapter_id", chapterId).eq("profile_id", user.id).maybeSingle(),
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
  ]);
  const role = membership.data?.role;
  return {
    id: user.id,
    role: role === "lead" || role === "member" ? role : null,
    isAdmin: profile.data?.role === "admin",
  };
});

/** Everyone in the chapter, leads first, for members and admins. */
export async function getChapterRoster(chapterId: string): Promise<ChapterPerson[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chapter_roster")
    .select("chapter_id, profile_id, display_name, avatar_url, public_slug, role, joined_at")
    .eq("chapter_id", chapterId)
    .order("joined_at");
  if (error) throw new Error(`Could not load the chapter roster: ${error.message}`);
  return toPeople(data).sort((a, b) => (a.role === b.role ? 0 : a.role === "lead" ? -1 : 1));
}

/** The chapters the signed in viewer belongs to, for the dashboard. */
export async function getMyChapters(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("chapter_members")
    .select("role, chapters (slug, name, city, status)")
    .eq("profile_id", userId);
  return (data ?? []).flatMap((m) => (m.chapters ? [{ role: m.role, ...m.chapters }] : []));
}

export type ChapterEvent = {
  slug: string;
  title: string;
  kind: string;
  format: string;
  starts_at: string;
  ends_at: string;
  venue_name: string | null;
  city: string | null;
};

/** Published events of this chapter that have not ended yet, soonest first. */
export async function getUpcomingChapterEvents(chapterId: string, limit = 5): Promise<ChapterEvent[]> {
  const supabase = await createPublicClient();
  const { data, error } = await supabase
    .from("community_events")
    .select("slug, title, kind, format, starts_at, ends_at, venue_name, city")
    .eq("chapter_id", chapterId)
    .eq("status", "published")
    .gte("ends_at", new Date().toISOString())
    .order("starts_at")
    .limit(limit);
  if (error) throw new Error(`Could not load chapter events: ${error.message}`);
  return data ?? [];
}
