"use server";

import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { track } from "@/lib/analytics/track";
import { achievementShareTarget } from "@/lib/share/card";
import { biggestMilestone, sectionIdOf } from "@/lib/share/milestones";
import { SITE_URL } from "@/lib/site";
import {
  parseAnswers,
  parseQuestions,
  parseResults,
  type CompletionState,
  type QuizOutcome,
} from "@/components/learn/quiz-data";

/**
 * Progress writes for the study view. Every action re-checks the session and
 * goes through the database functions (set_node_status, submit_node_quiz),
 * which take identity from auth.uid() and refuse anything a learner should
 * not be able to do, such as completing a quiz node without passing.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function friendly(code: string | undefined, fallback: string) {
  if (code === "42501") return "Sign in again to save your progress.";
  if (code === "P0002") return "This topic is not available right now.";
  return fallback;
}

/** Reads back what the database minted, rather than assuming it worked. */
async function readUnlocked(supabase: Awaited<ReturnType<typeof createClient>>, userId: string, nodeId: string) {
  const { data: node } = await supabase
    .from("roadmap_nodes")
    .select("roadmap_id, roadmaps(slug, title)")
    .eq("id", nodeId)
    .single();
  const roadmapId = node?.roadmap_id ?? null;
  const [{ data: tree }, { data: profile }] = await Promise.all([
    roadmapId
      ? supabase.from("roadmap_nodes").select("id, parent_id, kind, title").eq("roadmap_id", roadmapId)
      : Promise.resolve({ data: [] as { id: string; parent_id: string | null; kind: string | null; title: string }[] }),
    supabase.from("profiles").select("is_public").eq("id", userId).single(),
  ]);
  const nodes = tree ?? [];
  const sectionId = sectionIdOf(nodes, nodeId);
  const refs = [nodeId, sectionId, roadmapId].filter((r): r is string => !!r);
  const { data } = await supabase
    .from("achievements")
    .select("id, type, ref_id, created_at")
    .eq("profile_id", userId)
    .in("type", ["roadmap_node_completed", "section_completed", "roadmap_completed"])
    .in("ref_id", refs);
  const rows = data ?? [];
  const best = biggestMilestone(rows, { nodeId, sectionId, roadmapId });
  const titleOf = (id: string | null) => nodes.find((n) => n.id === id)?.title ?? null;
  const roadmapTitle = node?.roadmaps?.title ?? null;
  const share = best
    ? achievementShareTarget(
        best.id,
        {
          ...best,
          title: best.type === "roadmap_completed" ? roadmapTitle : titleOf(best.ref_id),
          roadmapTitle,
        },
        SITE_URL,
      )
    : null;
  return {
    unlocked: {
      node: rows.some((a) => a.type === "roadmap_node_completed" && a.ref_id === nodeId),
      section: rows.some((a) => a.type === "section_completed" && a.ref_id === sectionId),
      roadmap: rows.some((a) => a.type === "roadmap_completed" && a.ref_id === roadmapId),
      share,
      isPublic: profile?.is_public ?? false,
    },
    roadmapSlug: node?.roadmaps?.slug ?? "",
  };
}

async function wasDone(supabase: Awaited<ReturnType<typeof createClient>>, userId: string, nodeId: string) {
  const { data } = await supabase
    .from("roadmap_progress")
    .select("status")
    .eq("profile_id", userId)
    .eq("node_id", nodeId)
    .maybeSingle();
  return data?.status === "done";
}

/** Marks a node in progress when the learner opens it, unless they already started or finished it. */
export async function startNode(nodeId: string): Promise<void> {
  const user = await requireUser();
  if (!UUID.test(nodeId)) return;
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("roadmap_progress")
    .select("status")
    .eq("profile_id", user.id)
    .eq("node_id", nodeId)
    .maybeSingle();
  // set_node_status overwrites the status, so calling it on a done node would undo the completion.
  if (existing && existing.status !== "not_started") return;
  const { error } = await supabase.rpc("set_node_status", { p_node_id: nodeId, p_status: "in_progress" });
  if (error) return;
  const { data: node } = await supabase.from("roadmap_nodes").select("roadmaps(slug)").eq("id", nodeId).single();
  await track("node_started", { roadmap: node?.roadmaps?.slug ?? "", node_id: nodeId }, { profileId: user.id });
}

export async function submitQuiz(_prev: CompletionState, form: FormData): Promise<CompletionState> {
  const user = await requireUser();
  const nodeId = String(form.get("node_id") ?? "");
  if (!UUID.test(nodeId)) return { message: "This topic is not available right now." };

  const supabase = await createClient();
  const { data: quiz } = await supabase.from("node_quiz").select("questions").eq("node_id", nodeId).maybeSingle();
  const questions = parseQuestions(quiz?.questions);
  if (!questions.length) return { message: "This topic has no checkpoint quiz yet." };

  const answers = parseAnswers(form, questions);
  if (!answers) return { message: "Choose an answer for every question, then check again." };

  const doneBefore = await wasDone(supabase, user.id, nodeId);
  const { data, error } = await supabase
    .rpc("submit_node_quiz", { p_node_id: nodeId, p_answers: answers })
    .single();
  if (error || !data) return { message: friendly(error?.code, "We couldn't check your answers. Try again.") };

  const outcome: QuizOutcome = { score: data.score, passed: data.passed, results: parseResults(data.results) };
  if (!outcome.passed) return { outcome, at: Date.now() };

  const { unlocked, roadmapSlug } = await readUnlocked(supabase, user.id, nodeId);
  // Count the first completion only; retaking a passed quiz is not a new one.
  if (!doneBefore) {
    await track("node_completed", { roadmap: roadmapSlug, node_id: nodeId, via: "quiz" }, { profileId: user.id });
  }
  refresh();
  return { outcome, unlocked, at: Date.now() };
}

/** Self attested completion for nodes without a quiz; the database refuses it for quiz nodes. */
export async function markComplete(_prev: CompletionState, form: FormData): Promise<CompletionState> {
  const user = await requireUser();
  const nodeId = String(form.get("node_id") ?? "");
  if (!UUID.test(nodeId)) return { message: "This topic is not available right now." };

  const supabase = await createClient();
  const doneBefore = await wasDone(supabase, user.id, nodeId);
  const { error } = await supabase.rpc("set_node_status", { p_node_id: nodeId, p_status: "done" });
  if (error) {
    const message =
      error.code === "42501" && error.message.includes("quiz")
        ? "Pass the checkpoint quiz to complete this topic."
        : friendly(error.code, "We couldn't save that. Try again.");
    return { message };
  }

  const { unlocked, roadmapSlug } = await readUnlocked(supabase, user.id, nodeId);
  if (!doneBefore) {
    await track("node_completed", { roadmap: roadmapSlug, node_id: nodeId, via: "self" }, { profileId: user.id });
  }
  refresh();
  // Marking by hand is personal tracking: it never offers a share card.
  return { unlocked: { ...unlocked, share: null }, at: Date.now() };
}
