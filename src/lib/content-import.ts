import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { toQuizRows, type GeneratedContent } from "@/lib/content-generation/schema";
import type { TrackContent } from "@/content/roadmaps/content/types";

type Client = SupabaseClient<Database>;

export type ContentImportSummary = {
  written: number;
  unchanged: number;
  /** Content for node slugs the database doesn't have yet (import the outline first). */
  missingNodes: string[];
  missingRoadmaps: string[];
};

/** Same comparison the import uses, exported for tests. */
export function sameContent(
  existing: { explanation_md: string; practice_task_md: string | null } | null,
  existingQuiz: { questions: unknown; pass_threshold: number } | null,
  existingKey: unknown,
  content: GeneratedContent,
) {
  if (!existing || !existingQuiz) return false;
  const { questions, answerKey, passThreshold } = toQuizRows(content.quiz);
  return (
    existing.explanation_md === content.explanation_md &&
    existing.practice_task_md === content.practice_task_md &&
    existingQuiz.pass_threshold === passThreshold &&
    JSON.stringify(existingQuiz.questions) === JSON.stringify(questions) &&
    JSON.stringify(existingKey) === JSON.stringify(answerKey)
  );
}

/**
 * Loads in-session written lesson content (src/content/roadmaps/content) into
 * node_content, node_quiz and node_quiz_answers, matched by roadmap and node
 * slug. Runs under the admin's own session (RLS lets admins write content), so
 * no secret key is needed. Idempotent: unchanged nodes are skipped, changed
 * ones bump content_version. Never deletes anything.
 */
export async function importTrackContent(supabase: Client, tracks: TrackContent[]): Promise<ContentImportSummary> {
  const summary: ContentImportSummary = { written: 0, unchanged: 0, missingNodes: [], missingRoadmaps: [] };

  for (const track of tracks) {
    const { data: roadmap, error: roadmapError } = await supabase
      .from("roadmaps")
      .select("id")
      .eq("slug", track.roadmap)
      .maybeSingle();
    if (roadmapError) throw new Error(`Could not read roadmap ${track.roadmap}: ${roadmapError.message}`);
    if (!roadmap) {
      summary.missingRoadmaps.push(track.roadmap);
      continue;
    }

    const { data: nodes, error: nodesError } = await supabase
      .from("roadmap_nodes")
      .select("id, slug")
      .eq("roadmap_id", roadmap.id);
    if (nodesError) throw new Error(`Could not read nodes of ${track.roadmap}: ${nodesError.message}`);
    const nodeIds = new Map(nodes.map((n) => [n.slug, n.id]));

    for (const [slug, content] of Object.entries(track.nodes)) {
      const nodeId = nodeIds.get(slug);
      if (!nodeId) {
        summary.missingNodes.push(`${track.roadmap}/${slug}`);
        continue;
      }
      if (await writeNode(supabase, nodeId, content)) summary.written++;
      else summary.unchanged++;
    }
  }
  return summary;
}

/** Returns true when something was written, false when the node was already up to date. */
async function writeNode(supabase: Client, nodeId: string, content: GeneratedContent): Promise<boolean> {
  const [{ data: existing, error: contentError }, { data: quiz, error: quizError }] = await Promise.all([
    supabase.from("node_content").select("id, explanation_md, practice_task_md, content_version").eq("node_id", nodeId).maybeSingle(),
    supabase.from("node_quiz").select("id, questions, pass_threshold").eq("node_id", nodeId).maybeSingle(),
  ]);
  if (contentError) throw new Error(`Could not read node_content: ${contentError.message}`);
  if (quizError) throw new Error(`Could not read node_quiz: ${quizError.message}`);

  let existingKey: unknown = null;
  if (quiz) {
    const { data: key, error: keyError } = await supabase
      .from("node_quiz_answers")
      .select("answer_key")
      .eq("quiz_id", quiz.id)
      .maybeSingle();
    if (keyError) throw new Error(`Could not read answer key: ${keyError.message}`);
    existingKey = key?.answer_key ?? null;
  }
  if (sameContent(existing, quiz, existingKey, content)) return false;

  const { questions, answerKey, passThreshold } = toQuizRows(content.quiz);
  const { data: savedQuiz, error: saveQuizError } = await supabase
    .from("node_quiz")
    .upsert({ node_id: nodeId, questions, pass_threshold: passThreshold }, { onConflict: "node_id" })
    .select("id")
    .single();
  if (saveQuizError) throw new Error(`Could not save quiz: ${saveQuizError.message}`);

  const { error: saveKeyError } = await supabase
    .from("node_quiz_answers")
    .upsert({ quiz_id: savedQuiz.id, answer_key: answerKey }, { onConflict: "quiz_id" });
  if (saveKeyError) throw new Error(`Could not save answer key: ${saveKeyError.message}`);

  const fields = {
    explanation_md: content.explanation_md,
    practice_task_md: content.practice_task_md,
    generated_at: new Date().toISOString(),
  };
  const { error: saveContentError } = existing
    ? await supabase
        .from("node_content")
        .update({ ...fields, content_version: existing.content_version + 1 })
        .eq("id", existing.id)
    : await supabase.from("node_content").insert({ ...fields, node_id: nodeId, content_version: 1 });
  if (saveContentError) throw new Error(`Could not save content: ${saveContentError.message}`);
  return true;
}
