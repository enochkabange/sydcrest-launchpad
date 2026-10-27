import { MAX_COMMENT_CHARS, MAX_SUMMARY_CHARS } from "./config";

/**
 * The AI rubric review, as stored in submissions.ai_feedback and shown to the
 * learner and their mentor. The shape is the one documented on the column:
 * {"summary", "criteria": [{"id", "points", "comment"}]}.
 */
export type RubricCriterion = { id: string; label: string; description: string; max_points: number };
export type Rubric = { id: string; title: string; criteria: RubricCriterion[] };

export type CriterionFeedback = { id: string; points: number; comment: string };
export type AiFeedback = { summary: string; criteria: CriterionFeedback[] };

/** Reads rubrics.criteria (jsonb) defensively; the database already checks its shape. */
export function readRubricCriteria(value: unknown): RubricCriterion[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((c) => {
    if (!c || typeof c !== "object") return [];
    const { id, label, description, max_points } = c as Record<string, unknown>;
    if (typeof id !== "string" || typeof label !== "string" || typeof max_points !== "number") return [];
    return [{ id, label, description: typeof description === "string" ? description : "", max_points }];
  });
}

/**
 * The JSON schema the model must answer in (structured outputs). Points are
 * range checked afterwards in validateReview, since numeric bounds are not
 * part of the constrained schema.
 */
export function reviewOutputSchema(rubric: Rubric): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    required: ["summary", "criteria"],
    properties: {
      summary: { type: "string", description: "Two to four sentences of overall feedback for the learner." },
      criteria: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "points", "comment"],
          properties: {
            id: { type: "string", enum: rubric.criteria.map((c) => c.id) },
            points: { type: "integer", description: "Whole points from 0 to the criterion's max_points." },
            comment: { type: "string", description: "One or two sentences: what works and one concrete next step." },
          },
        },
      },
    },
  };
}

export type ValidatedReview = { ok: true; feedback: AiFeedback; score: number } | { ok: false; errors: string[] };

function clean(text: string, max: number) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1).trimEnd()}…` : trimmed;
}

/**
 * Checks the model's answer against the rubric before anything is stored:
 * every criterion scored exactly once with whole points in range, no unknown
 * criteria, a summary and a comment each. Returns the feedback in rubric
 * order and the score out of 100.
 */
export function validateReview(raw: unknown, rubric: Rubric): ValidatedReview {
  const errors: string[] = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ok: false, errors: ["Answer is not an object"] };
  const { summary, criteria } = raw as Record<string, unknown>;
  if (typeof summary !== "string" || !summary.trim()) errors.push("Missing summary");
  if (!Array.isArray(criteria)) return { ok: false, errors: [...errors, "Missing criteria"] };

  const byId = new Map(rubric.criteria.map((c) => [c.id, c]));
  const seen = new Map<string, CriterionFeedback>();
  for (const item of criteria) {
    if (!item || typeof item !== "object") {
      errors.push("A criterion is not an object");
      continue;
    }
    const { id, points, comment } = item as Record<string, unknown>;
    const criterion = typeof id === "string" ? byId.get(id) : undefined;
    if (!criterion) {
      errors.push(`Unknown criterion ${String(id)}`);
      continue;
    }
    if (seen.has(criterion.id)) {
      errors.push(`Criterion ${criterion.id} scored twice`);
      continue;
    }
    if (typeof points !== "number" || !Number.isInteger(points) || points < 0 || points > criterion.max_points) {
      errors.push(`Criterion ${criterion.id} points must be a whole number from 0 to ${criterion.max_points}`);
      continue;
    }
    if (typeof comment !== "string" || !comment.trim()) {
      errors.push(`Criterion ${criterion.id} has no comment`);
      continue;
    }
    seen.set(criterion.id, { id: criterion.id, points, comment: clean(comment, MAX_COMMENT_CHARS) });
  }
  for (const c of rubric.criteria) if (!seen.has(c.id)) errors.push(`Criterion ${c.id} not scored`);
  if (errors.length) return { ok: false, errors };

  const feedback: AiFeedback = {
    summary: clean(summary as string, MAX_SUMMARY_CHARS),
    criteria: rubric.criteria.map((c) => seen.get(c.id)!),
  };
  return { ok: true, feedback, score: scoreOutOf100(feedback, rubric) };
}

export function scoreOutOf100(feedback: AiFeedback, rubric: Rubric): number {
  const max = rubric.criteria.reduce((sum, c) => sum + c.max_points, 0);
  if (max <= 0) return 0;
  const got = feedback.criteria.reduce((sum, c) => sum + c.points, 0);
  return Math.max(0, Math.min(100, Math.round((100 * got) / max)));
}

/** Reads stored ai_feedback for display; null when it is missing or malformed. */
export function readAiFeedback(value: unknown): AiFeedback | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const { summary, criteria } = value as Record<string, unknown>;
  if (typeof summary !== "string") return null;
  const list = Array.isArray(criteria)
    ? criteria.flatMap((c) => {
        if (!c || typeof c !== "object") return [];
        const { id, points, comment } = c as Record<string, unknown>;
        if (typeof id !== "string" || typeof points !== "number") return [];
        return [{ id, points, comment: typeof comment === "string" ? comment : "" }];
      })
    : [];
  return { summary, criteria: list };
}
