import "server-only";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPublicChapter, type PublicChapter } from "./public";
import { getChapterViewer } from "./viewer";

/**
 * The chapter lead toolkit (#335) is for the chapter's leads and staff only.
 * Signed out visitors go to sign in; anyone else gets a 404, so the pages stay
 * unlisted. The database checks again (chapter_dashboard, send_message).
 * Reads the session: callers sit inside <Suspense>.
 */
export async function requireChapterLead(slug: string): Promise<{ chapter: PublicChapter; isAdmin: boolean }> {
  const chapter = await getPublicChapter(slug);
  if (!chapter) notFound();
  const viewer = await getChapterViewer(chapter.id);
  if (!viewer) redirect(`/login?next=/chapters/${slug}/lead`);
  if (viewer.role !== "lead" && !viewer.isAdmin) notFound();
  return { chapter, isAdmin: viewer.isAdmin };
}

export type ChapterDashboard = {
  members: number;
  joined_30: number;
  from_chapter_links: number;
  joins_by_source: { source: string; count: number }[];
  by_stage: Record<string, number>;
  events: { slug: string; title: string; starts_at: string; status: string; going: number; checked_in: number }[];
};

const EMPTY: ChapterDashboard = { members: 0, joined_30: 0, from_chapter_links: 0, joins_by_source: [], by_stage: {}, events: [] };

/** Counts for the chapter dashboard. */
export async function getChapterDashboard(chapterId: string): Promise<ChapterDashboard> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("chapter_dashboard", { p_chapter_id: chapterId });
  if (error) throw new Error(`Could not load the chapter dashboard: ${error.message}`);
  return { ...EMPTY, ...((data ?? {}) as Partial<ChapterDashboard>) };
}
