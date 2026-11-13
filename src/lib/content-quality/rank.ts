import { reasonLabel } from "./reasons";

/**
 * Content quality maths (epic #320, issue #326): which quiz questions and
 * lessons are most worth rewriting, and the evidence for each. Pure, so it is
 * unit tested; the counts come from public.admin_content_questions and
 * public.admin_content_lessons (admins only).
 *
 * Questions
 *   difficulty      share of all answers that were right (lower is harder).
 *   discrimination  share right in attempts that passed the quiz minus the
 *                   share right in attempts that failed. A good question is
 *                   answered better by learners who pass (a positive gap);
 *                   near zero or negative means it does not tell strong and
 *                   weak learners apart, usually a badly worded question.
 *   confuses strong learners  learners who passed still get it wrong often.
 *   misconception   one wrong option draws most of the wrong answers.
 *
 * Lessons
 *   not clear share from "Was this lesson clear?", the fail rate of the
 *   topic's quiz, how often it was the lesson read just before a failed quiz,
 *   shallow reading (median scroll) and how many Study Buddy questions it
 *   prompts per visit.
 *
 * Nothing is flagged or ranked below a minimum sample, so one learner's bad
 * day never sends a lesson to the rewrite queue.
 */

/** Answers needed before a question is judged at all. */
export const MIN_ANSWERS = 10;
/** Answers needed in a group (passed or failed attempts, wrong answers with a choice) before comparing it. */
export const MIN_GROUP = 5;
/** Feedback taps needed before the not clear share counts. */
export const MIN_FEEDBACK = 3;
/** Quiz attempts needed before a topic's fail rate counts. */
export const MIN_ATTEMPTS = 5;
/** Lesson visits needed before reading depth counts. */
export const MIN_VISITS = 10;
/** Failed quizzes after a lesson needed before it counts. */
export const MIN_LEFT_BEFORE_FAIL = 3;
/** Study Buddy messages needed before the question rate counts. */
export const MIN_BUDDY = 5;

export type QuestionCounts = {
  node_id: string;
  roadmap_slug: string;
  topic_title: string;
  question_id: string;
  prompt: string | null;
  answers: number;
  correct: number;
  passed_answers: number;
  passed_correct: number;
  failed_answers: number;
  failed_correct: number;
  wrong_with_choice: number;
  wrong_choice: number | null;
  wrong_choice_count: number | null;
  wrong_option: string | null;
};

export type LessonCounts = {
  node_id: string;
  roadmap_slug: string;
  topic_title: string;
  visits: number;
  median_ms: number | null;
  median_scroll: number | null;
  left_before_fail: number;
  quiz_attempts: number;
  quiz_fails: number;
  clear_yes: number;
  clear_no: number;
  top_reason: string | null;
  buddy_messages: number;
  buddy_chats: number;
  buddy_deep: number;
  buddy_why: number;
  buddy_code: number;
  buddy_long: number;
};

export type QuestionFlag = "confuses_strong" | "no_separation" | "hard" | "misconception";
export type LessonFlag = "unclear" | "fails" | "left_before_fail" | "skimmed" | "many_questions";

export type QuestionAnalysis = {
  kind: "question";
  key: string;
  row: QuestionCounts;
  /** Share of answers that were right, or null below MIN_ANSWERS. */
  difficulty: number | null;
  strongCorrect: number | null;
  weakCorrect: number | null;
  discrimination: number | null;
  /** Share of wrong answers (with a recorded choice) that picked the most chosen wrong option. */
  wrongShare: number | null;
  flags: QuestionFlag[];
  score: number;
  evidence: string[];
};

export type LessonAnalysis = {
  kind: "lesson";
  key: string;
  row: LessonCounts;
  unclearShare: number | null;
  failShare: number | null;
  buddyPerVisit: number | null;
  flags: LessonFlag[];
  score: number;
  evidence: string[];
};

export type QueueItem = QuestionAnalysis | LessonAnalysis;

/** part / whole when whole reaches min, else null. */
export function share(part: number, whole: number, min = 1): number | null {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole < Math.max(1, min)) return null;
  return Math.min(1, Math.max(0, part / whole));
}

/** Upper share minus lower share; null unless both groups reach MIN_GROUP. */
export function discrimination(
  passed: { answers: number; correct: number },
  failed: { answers: number; correct: number },
  min = MIN_GROUP,
): number | null {
  const strong = share(passed.correct, passed.answers, min);
  const weak = share(failed.correct, failed.answers, min);
  if (strong === null || weak === null) return null;
  return Math.round((strong - weak) * 1000) / 1000;
}

/** How much to trust a signal from n observations: rises to 1 at `full`. */
export function confidence(n: number, full: number): number {
  if (n <= 0) return 0;
  return Math.min(1, Math.sqrt(n / full));
}

const pct = (v: number) => `${Math.round(v * 100)}%`;
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const round = (v: number) => Math.round(v * 100) / 100;

export function analyseQuestion(row: QuestionCounts): QuestionAnalysis {
  const difficulty = share(row.correct, row.answers, MIN_ANSWERS);
  const strongCorrect = share(row.passed_correct, row.passed_answers, MIN_GROUP);
  const weakCorrect = share(row.failed_correct, row.failed_answers, MIN_GROUP);
  const disc = discrimination(
    { answers: row.passed_answers, correct: row.passed_correct },
    { answers: row.failed_answers, correct: row.failed_correct },
  );
  const wrongShare = row.wrong_choice_count != null ? share(row.wrong_choice_count, row.wrong_with_choice, MIN_GROUP) : null;

  const flags: QuestionFlag[] = [];
  if (strongCorrect !== null && strongCorrect < 0.6) flags.push("confuses_strong");
  if (disc !== null && disc < 0.1) flags.push("no_separation");
  if (difficulty !== null && difficulty < 0.4) flags.push("hard");
  if (wrongShare !== null && wrongShare >= 0.6) flags.push("misconception");

  let score = 0;
  if (difficulty !== null) {
    score += 1 - difficulty;
    if (flags.includes("confuses_strong")) score += 1.5 * (1 - (strongCorrect ?? 1));
    if (flags.includes("no_separation")) score += 0.5 + Math.max(0, -(disc ?? 0));
    if (flags.includes("misconception")) score += 0.5 * (wrongShare ?? 0);
    score *= confidence(row.answers, 50);
  }

  const evidence: string[] = [];
  if (difficulty !== null) evidence.push(`${pct(difficulty)} of ${plural(row.answers, "answer")} are right`);
  else evidence.push(`Only ${plural(row.answers, "answer")} so far, too few to judge`);
  if (strongCorrect !== null && flags.includes("confuses_strong")) {
    evidence.push(`Learners who passed the quiz get it right only ${pct(strongCorrect)} of the time`);
  }
  if (disc !== null && strongCorrect !== null && weakCorrect !== null) {
    evidence.push(
      flags.includes("no_separation")
        ? `Does not separate strong from weak learners: ${pct(strongCorrect)} right in passed attempts, ${pct(weakCorrect)} in failed ones`
        : `${pct(strongCorrect)} right in passed attempts, ${pct(weakCorrect)} in failed ones`,
    );
  }
  if (wrongShare !== null && row.wrong_choice_count != null) {
    const option = row.wrong_option ? `"${row.wrong_option}"` : `option ${(row.wrong_choice ?? 0) + 1}`;
    evidence.push(`Most chosen wrong answer: ${option} (${row.wrong_choice_count} of ${row.wrong_with_choice} wrong answers)`);
  }

  return {
    kind: "question",
    key: `q:${row.node_id}:${row.question_id}`,
    row,
    difficulty,
    strongCorrect,
    weakCorrect,
    discrimination: disc,
    wrongShare,
    flags,
    score: round(score),
    evidence,
  };
}

export function analyseLesson(row: LessonCounts): LessonAnalysis {
  const unclearShare = share(row.clear_no, row.clear_yes + row.clear_no, MIN_FEEDBACK);
  const failShare = share(row.quiz_fails, row.quiz_attempts, MIN_ATTEMPTS);
  const buddyPerVisit = row.buddy_messages >= MIN_BUDDY ? round(row.buddy_messages / Math.max(row.visits, 1)) : null;
  const skimmed = row.visits >= MIN_VISITS && row.median_scroll !== null && row.median_scroll < 50;

  const flags: LessonFlag[] = [];
  if (unclearShare !== null && unclearShare >= 0.3) flags.push("unclear");
  if (failShare !== null && failShare >= 0.5) flags.push("fails");
  if (row.left_before_fail >= MIN_LEFT_BEFORE_FAIL) flags.push("left_before_fail");
  if (skimmed) flags.push("skimmed");
  if (buddyPerVisit !== null && buddyPerVisit >= 0.5) flags.push("many_questions");

  let score = 0;
  if (unclearShare !== null) score += 2 * unclearShare * confidence(row.clear_yes + row.clear_no, 20);
  if (failShare !== null) score += failShare * confidence(row.quiz_attempts, 30);
  if (row.left_before_fail >= MIN_LEFT_BEFORE_FAIL) score += Math.min(1, row.left_before_fail / 10);
  if (skimmed) score += 0.3;
  if (buddyPerVisit !== null) score += 0.5 * Math.min(1, buddyPerVisit);

  const evidence: string[] = [];
  const answered = row.clear_yes + row.clear_no;
  if (unclearShare !== null) {
    const reason = reasonLabel(row.top_reason);
    evidence.push(
      `${row.clear_no} of ${answered} learners said it was not clear (${pct(unclearShare)})${reason ? `; most said: ${reason.toLowerCase()}` : ""}`,
    );
  } else if (answered > 0) {
    evidence.push(`${plural(answered, "learner")} answered "Was this lesson clear?" so far, ${row.clear_no} said not really`);
  }
  if (failShare !== null) evidence.push(`${pct(failShare)} of ${plural(row.quiz_attempts, "quiz attempt")} fail`);
  if (row.left_before_fail >= MIN_LEFT_BEFORE_FAIL) {
    evidence.push(`The lesson read just before ${plural(row.left_before_fail, "failed quiz", "failed quizzes")}`);
  }
  if (row.visits > 0 && row.median_scroll !== null) {
    const minutes = row.median_ms !== null ? `, about ${Math.max(1, Math.round(row.median_ms / 60000))} min visible` : "";
    evidence.push(`Median visit reads ${row.median_scroll}% of the page${minutes} (${plural(row.visits, "visit")})`);
  }
  if (buddyPerVisit !== null) {
    const kinds = [
      row.buddy_why ? `${row.buddy_why} why or compare` : null,
      row.buddy_code ? `${row.buddy_code} about code` : null,
      row.buddy_long ? `${row.buddy_long} long` : null,
    ].filter(Boolean);
    evidence.push(
      `${plural(row.buddy_messages, "Study Buddy question")} (${buddyPerVisit} per visit${kinds.length ? `; ${kinds.join(", ")}` : ""})`,
    );
  }

  return {
    kind: "lesson",
    key: `l:${row.node_id}`,
    row,
    unclearShare,
    failShare,
    buddyPerVisit,
    flags,
    score: round(score),
    evidence,
  };
}

/** Highest score first; ties go to the item with more evidence behind it, then by name for a stable order. */
function byScore(a: QueueItem, b: QueueItem) {
  if (b.score !== a.score) return b.score - a.score;
  const weight = (i: QueueItem) =>
    i.kind === "question" ? i.row.answers : i.row.visits + i.row.clear_yes + i.row.clear_no + i.row.quiz_attempts;
  if (weight(b) !== weight(a)) return weight(b) - weight(a);
  return a.key.localeCompare(b.key);
}

export function rankQuestions(rows: QuestionCounts[]): QuestionAnalysis[] {
  return rows.map(analyseQuestion).sort(byScore) as QuestionAnalysis[];
}

export function rankLessons(rows: LessonCounts[]): LessonAnalysis[] {
  return rows.map(analyseLesson).sort(byScore) as LessonAnalysis[];
}

/**
 * The rewrite queue: lessons and questions together, only those with at least
 * one flag (so a sample big enough to judge), best candidates first.
 */
export function rewriteQueue(questions: QuestionAnalysis[], lessons: LessonAnalysis[], limit = 10): QueueItem[] {
  return [...questions, ...lessons]
    .filter((i) => i.flags.length > 0 && i.score > 0)
    .sort(byScore)
    .slice(0, limit);
}

export const QUESTION_FLAG_LABELS: Record<QuestionFlag, string> = {
  confuses_strong: "Confuses strong learners",
  no_separation: "Does not separate",
  hard: "Hard",
  misconception: "Common wrong answer",
};

export const LESSON_FLAG_LABELS: Record<LessonFlag, string> = {
  unclear: "Not clear",
  fails: "Quiz often failed",
  left_before_fail: "Read before fails",
  skimmed: "Skimmed",
  many_questions: "Many questions",
};
