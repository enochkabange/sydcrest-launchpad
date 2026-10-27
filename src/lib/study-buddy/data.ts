import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { accraDay, capStatus, type CapStatus } from "./cap";
import { quizPromptsFrom, type NodeContext } from "./prompt";
import type { TokenUsage } from "./chat";

type Db = SupabaseClient<Database>;

/** Messages the learner has sent today (0 when there is no row yet). RLS: own rows only. */
export async function getMessagesUsedToday(supabase: Db, userId: string, now = new Date()): Promise<number> {
  const { data, error } = await supabase
    .from("ai_usage")
    .select("messages")
    .eq("profile_id", userId)
    .eq("day", accraDay(now))
    .maybeSingle();
  if (error) throw new Error(`Could not read Study Buddy usage: ${error.message}`);
  return data?.messages ?? 0;
}

/**
 * Today's allowance for the signed in learner, for a page to pass to
 * <StudyBuddy remainingToday>. Null when signed out. Reads cookies, so call it
 * inside a <Suspense> boundary.
 */
export async function getStudyBuddyAllowance(): Promise<CapStatus | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  return capStatus(await getMessagesUsedToday(supabase, user.id));
}

/**
 * Published content for one node, as the learner's own client sees it (RLS
 * hides drafts). Reads node_quiz question prompts only; node_quiz_answers is
 * never queried.
 */
export async function loadNodeContext(supabase: Db, nodeId: string): Promise<NodeContext | null> {
  const [node, content, quiz] = await Promise.all([
    supabase.from("roadmap_nodes").select("title, summary, roadmaps(title)").eq("id", nodeId).maybeSingle(),
    supabase.from("node_content").select("explanation_md, practice_task_md").eq("node_id", nodeId).maybeSingle(),
    supabase.from("node_quiz").select("questions").eq("node_id", nodeId).maybeSingle(),
  ]);
  if (node.error) throw new Error(`Could not load topic: ${node.error.message}`);
  if (!node.data) return null;

  const roadmap = node.data.roadmaps as { title: string } | { title: string }[] | null;
  const roadmapTitle = Array.isArray(roadmap) ? (roadmap[0]?.title ?? null) : (roadmap?.title ?? null);

  return {
    roadmapTitle,
    title: node.data.title,
    summary: node.data.summary,
    explanationMd: content.data?.explanation_md ?? null,
    practiceTaskMd: content.data?.practice_task_md ?? null,
    quizPrompts: quizPromptsFrom(quiz.data?.questions),
  };
}

/**
 * Counts one message on today's row before the model is called, and returns
 * the count after it. Run this before streaming so parallel requests cannot
 * slip past the cap (see reservationStatus).
 */
export async function reserveMessage(supabase: Db): Promise<number> {
  const { data, error } = await supabase.rpc("record_ai_usage", { p_input_tokens: 0, p_output_tokens: 0 });
  if (error) throw new Error(`Could not reserve a Study Buddy message: ${error.message}`);
  return data?.messages ?? 0;
}

/** Adds a finished reply's tokens to today's row without counting another message. */
export async function recordTokens(supabase: Db, usage: TokenUsage) {
  const { error } = await supabase.rpc("record_ai_tokens", {
    p_input_tokens: usage.inputTokens,
    p_output_tokens: usage.outputTokens,
  });
  if (error) throw new Error(`Could not record Study Buddy tokens: ${error.message}`);
}
