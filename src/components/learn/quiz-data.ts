/**
 * Shapes for the checkpoint quiz. Questions come from node_quiz (no answers
 * there); grading is done by the database (submit_node_quiz), which returns a
 * score, a pass flag and which question ids were right. Nothing here knows
 * the correct options.
 */

export type QuizQuestion = { id: string; prompt: string; options: string[] };

export type QuizOutcome = {
  score: number;
  passed: boolean;
  /** Question id to whether the learner's choice was right. */
  results: Record<string, boolean>;
};

/** Questions JSON from the database, keeping only well formed entries. */
export function parseQuestions(json: unknown): QuizQuestion[] {
  if (!Array.isArray(json)) return [];
  return json.flatMap((q) => {
    if (!q || typeof q !== "object") return [];
    const { id, prompt, options } = q as Record<string, unknown>;
    if (typeof id !== "string" || !id || typeof prompt !== "string") return [];
    if (!Array.isArray(options) || options.length < 2 || !options.every((o) => typeof o === "string")) return [];
    return [{ id, prompt, options: options as string[] }];
  });
}

export const answerField = (questionId: string) => `answer:${questionId}`;

/**
 * Reads the chosen option per question from the form. Options are sent as
 * JSON numbers: the grader compares jsonb values, so "1" would never match 1.
 * Returns null unless every question has a valid option.
 */
export function parseAnswers(form: FormData, questions: QuizQuestion[]): Record<string, number> | null {
  const answers: Record<string, number> = {};
  for (const q of questions) {
    const raw = form.get(answerField(q.id));
    if (typeof raw !== "string" || !/^\d+$/.test(raw)) return null;
    const choice = Number(raw);
    if (choice >= q.options.length) return null;
    answers[q.id] = choice;
  }
  return answers;
}

/** The per question results object from submit_node_quiz. */
export function parseResults(json: unknown): Record<string, boolean> {
  if (!json || typeof json !== "object" || Array.isArray(json)) return {};
  return Object.fromEntries(
    Object.entries(json as Record<string, unknown>).filter((e): e is [string, boolean] => typeof e[1] === "boolean"),
  );
}

/** Which achievements the database holds for a completed node, read back after completion. */
export type Unlocked = { node: boolean; roadmap: boolean };

/** State returned by the submit and mark complete server actions. */
export type CompletionState = {
  outcome?: QuizOutcome;
  unlocked?: Unlocked;
  message?: string;
  at?: number;
};
