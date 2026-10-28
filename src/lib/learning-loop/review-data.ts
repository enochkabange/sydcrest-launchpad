/**
 * Shapes and form parsing for the 5 minute review, shared by the form and
 * its server action. Nothing here knows the correct options: submit_review
 * grades in the database and returns only which questions were right.
 */

export const GOAL_TARGETS = [1, 3, 5] as const;
export type GoalTarget = (typeof GOAL_TARGETS)[number];

export function parseGoalTarget(raw: unknown): GoalTarget | null {
  const n = typeof raw === "string" ? Number(raw) : NaN;
  return (GOAL_TARGETS as readonly number[]).includes(n) ? (n as GoalTarget) : null;
}

export type ReviewRef = { nodeId: string; questionId: string };

export const reviewKey = (r: ReviewRef) => `${r.nodeId}:${r.questionId}`;
export const reviewAnswerField = (r: ReviewRef) => `answer:${reviewKey(r)}`;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** The questions this review asked, from the form's hidden field. Null when malformed. */
export function parseReviewRefs(raw: unknown): ReviewRef[] | null {
  if (typeof raw !== "string") return null;
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(json) || json.length < 1 || json.length > 5) return null;
  const refs: ReviewRef[] = [];
  for (const item of json) {
    if (!item || typeof item !== "object") return null;
    const { nodeId, questionId } = item as Record<string, unknown>;
    if (typeof nodeId !== "string" || !UUID.test(nodeId)) return null;
    if (typeof questionId !== "string" || !questionId || questionId.length > 100) return null;
    refs.push({ nodeId, questionId });
  }
  return new Set(refs.map(reviewKey)).size === refs.length ? refs : null;
}

/**
 * The chosen option per question, as JSON numbers for the grader (it compares
 * jsonb values, so "1" would never match 1). Null unless every question has one.
 */
export function parseReviewAnswers(
  form: FormData,
  refs: ReviewRef[],
): { node_id: string; question_id: string; choice: number }[] | null {
  const answers = [];
  for (const r of refs) {
    const raw = form.get(reviewAnswerField(r));
    if (typeof raw !== "string" || !/^\d{1,2}$/.test(raw)) return null;
    answers.push({ node_id: r.nodeId, question_id: r.questionId, choice: Number(raw) });
  }
  return answers;
}

/** submit_review's results array as key to right or wrong. */
export function parseReviewResults(json: unknown): Record<string, boolean> {
  if (!Array.isArray(json)) return {};
  const out: Record<string, boolean> = {};
  for (const r of json) {
    if (!r || typeof r !== "object") continue;
    const { node_id, question_id, correct } = r as Record<string, unknown>;
    if (typeof node_id === "string" && typeof question_id === "string" && typeof correct === "boolean") {
      out[reviewKey({ nodeId: node_id, questionId: question_id })] = correct;
    }
  }
  return out;
}

export type ReviewState = {
  outcome?: { correct: number; total: number; results: Record<string, boolean> };
  message?: string;
};

export type GoalState = { message?: string; saved?: number };
