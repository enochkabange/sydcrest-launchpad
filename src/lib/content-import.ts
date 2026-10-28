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

type ContentRow = {
  explanation_md: string;
  practice_task_md: string | null;
  outcomes?: string[] | null;
  worked_example_md?: string | null;
  key_terms?: unknown;
  common_mistakes?: string[] | null;
  self_check?: string[] | null;
};

/** The optional lesson anatomy (issue #255) as node_content columns; null when a lesson leaves a part out. */
export function anatomyColumns(content: GeneratedContent) {
  return {
    outcomes: content.outcomes ?? null,
    worked_example_md: content.workedExample_md ?? null,
    key_terms: content.keyTerms ?? null,
    common_mistakes: content.commonMistakes ?? null,
    self_check: content.selfCheck ?? null,
  };
}

/** Same comparison the import uses, exported for tests. */
export function sameContent(
  existing: ContentRow | null,
  existingQuiz: { questions: unknown; pass_threshold: number } | null,
  existingKey: unknown,
  content: GeneratedContent,
) {
  if (!existing || !existingQuiz) return false;
  const { questions, answerKey, passThreshold } = toQuizRows(content.quiz);
  return (
    existing.explanation_md === content.explanation_md &&
    existing.practice_task_md === content.practice_task_md &&
    JSON.stringify(pickAnatomy(existing)) === JSON.stringify(anatomyColumns(content)) &&
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

    const work: [string, GeneratedContent][] = [];
    for (const [slug, content] of Object.entries(track.nodes)) {
      const nodeId = nodeIds.get(slug);
      if (nodeId) work.push([nodeId, content]);
      else summary.missingNodes.push(`${track.roadmap}/${slug}`);
    }
    // A few nodes at a time: one by one, 27 tracks outlast the function's time limit.
    const results = await mapLimit(work, NODE_CONCURRENCY, ([nodeId, content]) => writeNode(supabase, nodeId, content));
    for (const written of results) {
      if (written) summary.written++;
      else summary.unchanged++;
    }
  }
  return summary;
}

/** Stored anatomy in the same shape as anatomyColumns; key terms rebuilt so jsonb key order never matters. */
function pickAnatomy(row: ContentRow) {
  const terms = Array.isArray(row.key_terms)
    ? (row.key_terms as { term?: unknown; definition?: unknown }[]).map((t) => ({ term: t.term, definition: t.definition }))
    : null;
  return {
    outcomes: row.outcomes ?? null,
    worked_example_md: row.worked_example_md ?? null,
    key_terms: terms,
    common_mistakes: row.common_mistakes ?? null,
    self_check: row.self_check ?? null,
  };
}

const NODE_CONCURRENCY = 6;

/** Runs fn over items with at most `limit` in flight, keeping results in input order. */
export async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/** Returns true when something was written, false when the node was already up to date. */
async function writeNode(supabase: Client, nodeId: string, content: GeneratedContent): Promise<boolean> {
  const [{ data: existing, error: contentError }, { data: quiz, error: quizError }] = await Promise.all([
    supabase.from("node_content").select("id, explanation_md, practice_task_md, content_version, outcomes, worked_example_md, key_terms, common_mistakes, self_check").eq("node_id", nodeId).maybeSingle(),
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
    ...anatomyColumns(content),
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
