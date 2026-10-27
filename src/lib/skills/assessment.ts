/**
 * Skill assessments (issue #165): the quiz and the portfolio review that let
 * someone earn a verified skill without the learning path. Pure helpers, so
 * the rules are unit tested; the database grades quizzes against a key no
 * learner can read (`submit_skill_quiz`) and enforces the retry wait again.
 */
import type { QuizQuestion } from "@/components/learn/quiz-data";

export type AssessmentKind = "quiz" | "portfolio";

export type AttemptStatus = "passed" | "failed" | "pending_review" | "approved" | "rejected";

export type Attempt = {
  id: string;
  assessment_id: string;
  kind: string;
  status: string;
  score: number | null;
  portfolio_url: string | null;
  review_note: string | null;
  reviewed_at: string | null;
  submitted_at: string;
};

/**
 * Where a person stands on one assessment, from their own attempts (newest
 * first or in any order). Mirrors `private.check_skill_retry`:
 * - `pending`: a portfolio is waiting for review, nothing new until then;
 * - `wait`: the last quiz failed or the last portfolio was sent back, and the
 *   retry wait has not passed;
 * - `ready`: free to start (with the last attempt, if any, for context).
 */
export type AttemptGate =
  | { state: "ready"; last: Attempt | null }
  | { state: "pending"; last: Attempt }
  | { state: "wait"; last: Attempt; until: Date };

export function latestAttempt(attempts: Attempt[], assessmentId: string): Attempt | null {
  return (
    attempts
      .filter((a) => a.assessment_id === assessmentId)
      .sort((a, b) => Date.parse(b.submitted_at) - Date.parse(a.submitted_at))[0] ?? null
  );
}

/** When the next attempt opens after a fail or rejection: the review time (or submission) plus the wait. */
export function retryOpensAt(last: Pick<Attempt, "reviewed_at" | "submitted_at">, retryAfterHours: number): Date {
  const from = Date.parse(last.reviewed_at ?? last.submitted_at);
  return new Date(from + retryAfterHours * 3_600_000);
}

export function attemptGate(
  attempts: Attempt[],
  assessment: { id: string; retry_after_hours: number },
  now: Date = new Date(),
): AttemptGate {
  const last = latestAttempt(attempts, assessment.id);
  if (!last) return { state: "ready", last: null };
  if (last.status === "pending_review") return { state: "pending", last };
  if (last.status === "failed" || last.status === "rejected") {
    const until = retryOpensAt(last, assessment.retry_after_hours);
    if (until.getTime() > now.getTime()) return { state: "wait", last, until };
  }
  return { state: "ready", last };
}

export function formatWhen(date: Date | string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Accra",
  }).format(typeof date === "string" ? new Date(date) : date);
}

/** "24 hours", "1 hour", "no wait". */
export function describeWait(hours: number) {
  if (hours <= 0) return "no wait";
  if (hours % 24 === 0) {
    const days = hours / 24;
    return days === 1 ? "one day" : `${days} days`;
  }
  return hours === 1 ? "one hour" : `${hours} hours`;
}

// Portfolio -------------------------------------------------------------------------------------

/** A full https link to a real looking host (the database only checks the prefix). */
export function isHttpsLink(value: string) {
  if (/\s/.test(value) || !URL.canParse(value)) return false;
  const url = new URL(value);
  return url.protocol === "https:" && url.hostname.includes(".") && !url.username && !url.password;
}

export function parsePortfolioForm(form: FormData) {
  const url = String(form.get("portfolio_url") ?? "").trim();
  const note = String(form.get("note") ?? "").trim();
  const errors: { portfolio_url?: string; note?: string } = {};
  if (!url) errors.portfolio_url = "Add a link to your work.";
  else if (url.length > 500) errors.portfolio_url = "Keep the link to 500 characters.";
  else if (!isHttpsLink(url)) errors.portfolio_url = "Use a full link that starts with https://";
  if (note.length > 2000) errors.note = "Keep the note to 2000 characters.";
  return { data: { url, note: note || null }, errors };
}

// Authoring (admins) ----------------------------------------------------------------------------

export const MAX_QUESTIONS = 30;
export const MAX_OPTIONS = 6;

/** Form field names of the question editor. Index `i` is the question's position, `j` the option's. */
export const authoringField = {
  count: "question_count",
  prompt: (i: number) => `prompt:${i}`,
  option: (i: number, j: number) => `option:${i}:${j}`,
  correct: (i: number) => `correct:${i}`,
};

export type AuthoredQuiz = {
  questions: QuizQuestion[];
  /** `{q1: 2}`: question id to the 0 based index of the right option. */
  answerKey: Record<string, number>;
};

/**
 * Reads the question editor. Questions get ids q1, q2 and so on in order.
 * Empty options are dropped (and the right answer re-indexed), so an editor
 * can offer spare option boxes. Every question needs a prompt, at least two
 * options and a right answer that is one of them: the grader counts answer
 * key entries, so a question without one would never count and one without
 * a question would be impossible to get right.
 */
export function parseQuizAuthoring(form: FormData): { data: AuthoredQuiz; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const count = Number(form.get(authoringField.count));
  const questions: QuizQuestion[] = [];
  const answerKey: Record<string, number> = {};

  if (!Number.isInteger(count) || count < 1) {
    errors.form = "Add at least one question.";
    return { data: { questions, answerKey }, errors };
  }
  if (count > MAX_QUESTIONS) {
    errors.form = `Keep the quiz to ${MAX_QUESTIONS} questions.`;
    return { data: { questions, answerKey }, errors };
  }

  for (let i = 0; i < count; i++) {
    const prompt = String(form.get(authoringField.prompt(i)) ?? "").trim();
    const raw = Array.from({ length: MAX_OPTIONS }, (_, j) => String(form.get(authoringField.option(i, j)) ?? "").trim());
    const kept = raw.map((text, j) => ({ text, j })).filter((o) => o.text);
    const correctRaw = String(form.get(authoringField.correct(i)) ?? "");
    const correctOriginal = /^\d+$/.test(correctRaw) ? Number(correctRaw) : -1;
    const correct = kept.findIndex((o) => o.j === correctOriginal);

    if (!prompt) errors[authoringField.prompt(i)] = "Write the question.";
    else if (prompt.length > 500) errors[authoringField.prompt(i)] = "Keep the question to 500 characters.";
    if (kept.length < 2) errors[`options:${i}`] = "Give at least two options.";
    else if (kept.some((o) => o.text.length > 300)) errors[`options:${i}`] = "Keep each option to 300 characters.";
    else if (new Set(kept.map((o) => o.text.toLowerCase())).size !== kept.length)
      errors[`options:${i}`] = "Each option must be different.";
    if (correct === -1) errors[authoringField.correct(i)] = "Choose the right answer from the options you wrote.";

    const id = `q${i + 1}`;
    questions.push({ id, prompt, options: kept.map((o) => o.text) });
    if (correct !== -1) answerKey[id] = correct;
  }
  return { data: { questions, answerKey }, errors };
}

/** True when the key has exactly one valid answer per question and nothing else. */
export function keyMatchesQuestions(questions: QuizQuestion[], key: Record<string, unknown>): boolean {
  const ids = new Set(questions.map((q) => q.id));
  if (Object.keys(key).length !== ids.size) return false;
  return questions.every((q) => {
    const answer = key[q.id];
    return typeof answer === "number" && Number.isInteger(answer) && answer >= 0 && answer < q.options.length;
  });
}

/** The answer key JSON from the database as `{q1: 2}`, keeping numeric entries only. */
export function parseAnswerKey(json: unknown): Record<string, number> {
  if (!json || typeof json !== "object" || Array.isArray(json)) return {};
  return Object.fromEntries(
    Object.entries(json as Record<string, unknown>).filter((e): e is [string, number] => typeof e[1] === "number"),
  );
}
