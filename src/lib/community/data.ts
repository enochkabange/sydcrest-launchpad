import "server-only";
import { cache } from "react";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  nextCursor,
  PAGE_SIZE,
  toPostView,
  toReplyView,
  type FeedPage,
  type FeedRef,
  type PostView,
  type ReplyView,
} from "./model";

/**
 * Request scoped reads for the community feed (#162). Names of other people
 * only come through the definer functions (community_feed, community_thread,
 * community_report_queue); our own memberships come from tables under RLS.
 * Request time (cookies), so callers sit inside <Suspense>.
 */

export type MyChapter = { id: string; slug: string; name: string; city: string; whatsappUrl: string | null; isLead: boolean };
export type MyCohort = { id: string; name: string; whatsappUrl: string | null; isStaff: boolean };

export type MyCommunity = {
  userId: string;
  isAdmin: boolean;
  chapters: MyChapter[];
  cohorts: MyCohort[];
  /** Admin, a chapter lead or cohort staff: may open the moderation queue. */
  isModerator: boolean;
};

export const getMyCommunity = cache(async (): Promise<MyCommunity> => {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data: profile }, { data: chapterRows, error: chapterError }, { data: cohortRows, error: cohortError }] =
    await Promise.all([
      supabase.from("profiles").select("role").eq("id", user.id).single(),
      supabase
        .from("chapter_members")
        .select("role, chapter:chapters(id, slug, name, city, whatsapp_url)")
        .eq("profile_id", user.id),
      supabase
        .from("cohort_members")
        .select("role, status, cohort:cohorts!cohort_members_cohort_id_fkey(id, name, status)")
        .eq("profile_id", user.id),
    ]);
  if (chapterError) throw new Error(`Could not load your chapters: ${chapterError.message}`);
  if (cohortError) throw new Error(`Could not load your cohorts: ${cohortError.message}`);

  const chapters: MyChapter[] = (chapterRows ?? [])
    .flatMap((r) =>
      r.chapter
        ? [
            {
              id: r.chapter.id,
              slug: r.chapter.slug,
              name: r.chapter.name,
              city: r.chapter.city,
              whatsappUrl: r.chapter.whatsapp_url,
              isLead: r.role === "lead",
            },
          ]
        : [],
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const cohortList = (cohortRows ?? []).flatMap((r) =>
    r.cohort && r.status !== "deferred" && r.cohort.status !== "cancelled"
      ? [{ id: r.cohort.id, name: r.cohort.name, isStaff: r.role === "mentor" || r.role === "coordinator" }]
      : [],
  );
  // Members read their cohort's WhatsApp link (RLS); one query for all of them.
  const links = new Map<string, string>();
  if (cohortList.length) {
    const { data: channels } = await supabase
      .from("cohort_channels")
      .select("cohort_id, whatsapp_url")
      .in(
        "cohort_id",
        cohortList.map((c) => c.id),
      );
    for (const c of channels ?? []) links.set(c.cohort_id, c.whatsapp_url);
  }
  const cohorts: MyCohort[] = cohortList.map((c) => ({ ...c, whatsappUrl: links.get(c.id) ?? null }));

  const isAdmin = profile?.role === "admin";
  return {
    userId: user.id,
    isAdmin,
    chapters,
    cohorts,
    isModerator: isAdmin || chapters.some((c) => c.isLead) || cohorts.some((c) => c.isStaff),
  };
});

/** What the viewer may do in one feed. */
export type FeedAccess = {
  /** Can read (and post: admins outside the group can only read). */
  canRead: boolean;
  canPost: boolean;
  canModerate: boolean;
  /** Display name of the group, for headings. */
  label: string;
  whatsappUrl: string | null;
  chapterSlug: string | null;
};

export function feedAccess(me: MyCommunity, ref: FeedRef): FeedAccess {
  if (ref.scope === "everyone") {
    return { canRead: true, canPost: true, canModerate: me.isAdmin, label: "Everyone", whatsappUrl: null, chapterSlug: null };
  }
  if (ref.scope === "chapter") {
    const c = me.chapters.find((x) => x.id === ref.scopeId);
    return {
      canRead: Boolean(c) || me.isAdmin,
      canPost: Boolean(c),
      canModerate: me.isAdmin || Boolean(c?.isLead),
      label: c ? `${c.name}` : "Chapter",
      whatsappUrl: c?.whatsappUrl ?? null,
      chapterSlug: c?.slug ?? null,
    };
  }
  const c = me.cohorts.find((x) => x.id === ref.scopeId);
  return {
    canRead: Boolean(c) || me.isAdmin,
    canPost: Boolean(c),
    canModerate: me.isAdmin || Boolean(c?.isStaff),
    label: c ? c.name : "Cohort",
    whatsappUrl: c?.whatsappUrl ?? null,
    chapterSlug: null,
  };
}

/** One page of a feed, newest first (pinned first on the first page). */
export async function loadFeedPage(ref: FeedRef, before: string | null = null): Promise<FeedPage> {
  await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("community_feed", {
    p_scope: ref.scope,
    ...(ref.scopeId ? { p_scope_id: ref.scopeId } : {}),
    ...(before ? { p_before: before } : {}),
    p_limit: PAGE_SIZE,
  });
  if (error) throw Object.assign(new Error(`Could not load the feed: ${error.message}`), { code: error.code });
  const posts = (data ?? []).map(toPostView);
  return { posts, cursor: nextCursor(posts) };
}

export type PostWithThread = { post: PostView; replies: ReplyView[] };

/**
 * A post and its replies. community_thread returns replies only, and author
 * names only come through definer functions, so the post itself is read
 * through community_feed just above its own created_at (where the feed is
 * plain newest first) and picked by id. Null when the viewer cannot read it.
 */
export const loadThread = cache(async (postId: string): Promise<PostWithThread | null> => {
  await requireUser();
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("community_posts")
    .select("id, scope, chapter_id, cohort_id, created_at")
    .eq("id", postId)
    .maybeSingle();
  if (!row) return null;

  const justAfter = new Date(Date.parse(row.created_at) + 1).toISOString();
  const [{ data: feed, error: feedError }, { data: replies, error: threadError }] = await Promise.all([
    supabase.rpc("community_feed", {
      p_scope: row.scope,
      ...(row.chapter_id ? { p_scope_id: row.chapter_id } : row.cohort_id ? { p_scope_id: row.cohort_id } : {}),
      p_before: justAfter,
      p_limit: 10,
    }),
    supabase.rpc("community_thread", { p_post_id: postId }),
  ]);
  if (feedError?.code === "42501" || threadError?.code === "P0002") return null;
  if (feedError) throw new Error(`Could not load the post: ${feedError.message}`);
  if (threadError) throw new Error(`Could not load the replies: ${threadError.message}`);
  const match = (feed ?? []).find((p) => p.id === postId);
  if (!match) return null;
  return { post: toPostView(match), replies: (replies ?? []).map(toReplyView) };
});

export const REPORT_STATUSES = ["open", "reviewing", "actioned", "dismissed"] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export type QueueItem = {
  id: string;
  targetType: "community_post" | "community_reply";
  targetId: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
  reporterName: string;
  postId: string;
  scope: string;
  chapterId: string | null;
  cohortId: string | null;
  body: string;
  authorName: string;
  hidden: boolean;
};

/** Reports on posts and replies the viewer moderates (admins: all of them). */
export async function loadReportQueue(status: ReportStatus): Promise<QueueItem[]> {
  await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("community_report_queue", { p_status: status });
  if (error) throw new Error(`Could not load the reports: ${error.message}`);
  return (data ?? []).map((r) => ({
    id: r.id,
    targetType: r.target_type === "community_reply" ? "community_reply" : "community_post",
    targetId: r.target_id,
    reason: r.reason,
    status: (REPORT_STATUSES as readonly string[]).includes(r.status) ? (r.status as ReportStatus) : "open",
    createdAt: r.created_at,
    reporterName: r.reporter_name?.trim() || "A member",
    postId: r.post_id,
    scope: r.scope,
    chapterId: r.chapter_id,
    cohortId: r.cohort_id,
    body: r.content_body ?? "",
    authorName: r.author_name?.trim() || "A member",
    hidden: r.hidden_at !== null,
  }));
}
