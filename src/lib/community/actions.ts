"use server";

import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { REPORT_REASONS } from "@/lib/social/public-profile";
import { loadFeedPage, REPORT_STATUSES } from "./data";
import {
  checkBody,
  checkLink,
  communityErrorMessage,
  HIDE_REASON_MAX,
  isReactionKind,
  isUuid,
  POST_MAX,
  REPLY_MAX,
  REPORT_DETAILS_MAX,
  SCOPES,
  type FeedPage,
  type FeedRef,
} from "./model";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";

/**
 * Mutations for the community feed (#162). Every one re-checks the user;
 * RLS and the definer functions decide who may do what. refresh() re-renders
 * whichever page mounted the feed (/community, a thread, a chapter page).
 */

export type FormState = { ok?: boolean; error?: string };

function toRef(scope: unknown, scopeId: unknown): FeedRef | null {
  if (scope === "everyone") return { scope: "everyone", scopeId: null };
  if ((scope === "chapter" || scope === "cohort") && isUuid(scopeId)) return { scope, scopeId };
  return null;
}

/** The next page for "Load more". */
export async function fetchFeedPage(scope: string, scopeId: string | null, before: string): Promise<FeedPage | { error: string }> {
  const ref = toRef(scope, scopeId);
  if (!ref || typeof before !== "string" || Number.isNaN(Date.parse(before))) return { error: "Unknown feed." };
  try {
    return await loadFeedPage(ref, before);
  } catch (e) {
    return { error: communityErrorMessage((e as { code?: string }).code) };
  }
}

export async function createPost(scope: string, scopeId: string | null, _prev: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  const ref = toRef(scope, scopeId);
  if (!ref || !(SCOPES as readonly string[]).includes(ref.scope)) return { error: "Unknown feed." };
  const body = checkBody(form.get("body"), POST_MAX);
  if ("error" in body) return { error: body.error };
  const link = checkLink(form.get("link"));
  if ("error" in link) return { error: link.error };

  const supabase = await createClient();
  const { error } = await supabase.from("community_posts").insert({
    author_id: user.id,
    scope: ref.scope,
    chapter_id: ref.scope === "chapter" ? ref.scopeId : null,
    cohort_id: ref.scope === "cohort" ? ref.scopeId : null,
    body: body.body,
    link_url: link.link,
  });
  if (error) return { error: communityErrorMessage(error.code) };
  refresh();
  return { ok: true };
}

export async function createReply(postId: string, _prev: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  if (!isUuid(postId)) return { error: communityErrorMessage("P0002") };
  const body = checkBody(form.get("body"), REPLY_MAX);
  if ("error" in body) return { error: body.error };
  const supabase = await createClient();
  const { error } = await supabase.from("community_replies").insert({ post_id: postId, author_id: user.id, body: body.body });
  if (error) {
    // RLS refuses replies to hidden posts or outside the group.
    return { error: error.code === "42501" ? "You can't reply to this post." : communityErrorMessage(error.code) };
  }
  refresh();
  return { ok: true };
}

/** Adds or removes the viewer's reaction of one kind on a post or reply. */
export async function setReaction(
  target: "post" | "reply",
  targetId: string,
  kind: string,
  on: boolean,
): Promise<{ error?: string }> {
  const user = await requireUser();
  if (!isUuid(targetId) || !isReactionKind(kind) || (target !== "post" && target !== "reply")) return { error: "Unknown reaction." };
  const column = target === "post" ? "post_id" : "reply_id";
  const supabase = await createClient();
  if (on) {
    const { error } = await supabase
      .from("community_reactions")
      .insert(target === "post" ? { profile_id: user.id, kind, post_id: targetId } : { profile_id: user.id, kind, reply_id: targetId });
    // A repeat is fine: one per kind per target.
    if (error && error.code !== "23505") return { error: communityErrorMessage(error.code) };
  } else {
    const { error } = await supabase
      .from("community_reactions")
      .delete()
      .eq("profile_id", user.id)
      .eq(column, targetId)
      .eq("kind", kind);
    if (error) return { error: communityErrorMessage(error.code) };
  }
  return {};
}

export async function deleteContent(target: "post" | "reply", id: string): Promise<{ error?: string }> {
  await requireUser();
  if (!isUuid(id)) return { error: communityErrorMessage("P0002") };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(target === "post" ? "community_posts" : "community_replies")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) return { error: communityErrorMessage(error.code) };
  if (!data?.length) return { error: "You can't delete this." };
  refresh();
  return {};
}

export async function reportContent(
  target: "post" | "reply",
  id: string,
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  const user = await requireUser();
  if (!isUuid(id)) return { error: communityErrorMessage("P0002") };
  const reason = String(form.get("reason") ?? "");
  const details = String(form.get("details") ?? "").trim();
  if (!REPORT_REASONS.includes(reason as (typeof REPORT_REASONS)[number])) return { error: "Choose a reason." };
  if (details.length > REPORT_DETAILS_MAX) return { error: `Keep the details under ${REPORT_DETAILS_MAX} characters.` };
  const supabase = await createClient();
  // Insert only: reporters cannot read reports back, so no .select().
  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    target_type: target === "post" ? "community_post" : "community_reply",
    target_id: id,
    reason: details ? `${reason}: ${details}` : reason,
  });
  if (error) return { error: isRateLimited(error) ? RATE_LIMIT_MESSAGE : "We couldn't send your report. Try again." };
  return { ok: true };
}

/** Hide (reason required) or unhide a post or reply. Moderators of its group only. */
export async function moderateContent(
  target: "post" | "reply",
  id: string,
  hide: boolean,
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  await requireUser();
  if (!isUuid(id)) return { error: communityErrorMessage("P0002") };
  const reason = String(form.get("reason") ?? "").trim();
  if (hide && !reason) return { error: "Give a reason. The author will not see it, other moderators will." };
  if (reason.length > HIDE_REASON_MAX) return { error: `Keep the reason under ${HIDE_REASON_MAX} characters.` };
  const supabase = await createClient();
  const { error } = await supabase.rpc("moderate_community_content", {
    p_target_type: target === "post" ? "community_post" : "community_reply",
    p_target_id: id,
    p_hide: hide,
    ...(hide ? { p_reason: reason } : {}),
  });
  if (error) return { error: error.code === "42501" ? "Only moderators of this group can do that." : communityErrorMessage(error.code) };
  refresh();
  return { ok: true };
}

export async function pinPost(id: string, pinned: boolean): Promise<{ error?: string }> {
  await requireUser();
  if (!isUuid(id)) return { error: communityErrorMessage("P0002") };
  const supabase = await createClient();
  const { error } = await supabase.rpc("pin_community_post", { p_post_id: id, p_pinned: pinned });
  if (error) return { error: error.code === "42501" ? "Only moderators of this group can pin." : communityErrorMessage(error.code) };
  refresh();
  return {};
}

export async function setReportStatus(id: string, status: string): Promise<{ error?: string }> {
  await requireUser();
  if (!isUuid(id) || !(REPORT_STATUSES as readonly string[]).includes(status)) return { error: "Unknown status." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("set_community_report_status", { p_report_id: id, p_status: status });
  if (error) return { error: communityErrorMessage(error.code) };
  refresh();
  return {};
}
