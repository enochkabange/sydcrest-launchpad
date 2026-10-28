import {
  PASS_THRESHOLD_MAX,
  PASS_THRESHOLD_MIN,
  QUIZ_MAX_QUESTIONS,
  QUIZ_MIN_QUESTIONS,
  QUIZ_OPTIONS,
} from "./config";

export type GeneratedQuestion = {
  prompt: string;
  options: string[];
  answer_index: number;
  explanation: string;
};

export type KeyTerm = { term: string; definition: string };

/**
 * Optional structured parts of a lesson (issue #255). All optional so lessons
 * written before them still validate and render; a lesson page shows each one
 * in a fixed order when it is present.
 */
export type LessonAnatomy = {
  /** "You will be able to" items: 3 or 4 short, plain statements. */
  outcomes?: string[];
  workedExample_md?: string;
  keyTerms?: KeyTerm[];
  commonMistakes?: string[];
  selfCheck?: string[];
};

export type GeneratedContent = LessonAnatomy & {
  explanation_md: string;
  practice_task_md: string;
  quiz: { questions: GeneratedQuestion[]; pass_threshold: number };
};

export const OUTCOMES_MIN = 3;
export const OUTCOMES_MAX = 4;
/** Outcomes are short: one line in the lesson header. */
export const OUTCOME_MAX_CHARS = 120;

/**
 * JSON schema sent as output_config.format. Structured outputs reject numeric,
 * string length and array size constraints, so those rules are enforced by
 * parseGeneratedContent below instead; the schema fixes the shape.
 */
export const CONTENT_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["explanation_md", "practice_task_md", "quiz"],
  properties: {
    explanation_md: { type: "string" },
    practice_task_md: { type: "string" },
    quiz: {
      type: "object",
      additionalProperties: false,
      required: ["questions", "pass_threshold"],
      properties: {
        questions: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["prompt", "options", "answer_index", "explanation"],
            properties: {
              prompt: { type: "string" },
              options: { type: "array", items: { type: "string" } },
              answer_index: { type: "integer", enum: [0, 1, 2, 3] },
              explanation: { type: "string" },
            },
          },
        },
        pass_threshold: { type: "integer" },
      },
    },
  },
} as const;

export type ParseResult = { ok: true; content: GeneratedContent } | { ok: false; errors: string[] };

const EXPLANATION_MIN_CHARS = 400;
const PRACTICE_MIN_CHARS = 100;

/** Removes fenced and inline code, where hyphens and "--" are legitimate. */
function stripCode(md: string): string {
  return md.replace(/```[\s\S]*?```/g, " ").replace(/`[^`\n]*`/g, " ");
}

/**
 * Finds dash punctuation: em or en dashes anywhere outside code, or a hyphen
 * used as a spaced pause in prose. A hyphen that starts a Markdown list item
 * ("- item") and hyphens inside words are fine.
 */
export function findDashes(text: string): string[] {
  const prose = stripCode(text);
  const problems: string[] = [];
  if (/[—–]/.test(prose)) problems.push("contains an em or en dash");
  const spaced = prose.split("\n").some((line) => / -{1,2} /.test(line.replace(/^\s*[-*+]\s+/, "")));
  if (spaced) problems.push("uses a spaced hyphen as a dash");
  return problems;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Validates one model answer against the strict content shape. Accepts the raw
 * text (JSON) or an already parsed value. Never throws: every problem comes
 * back as a readable error so a batch can report failures per node.
 */
export function parseGeneratedContent(raw: unknown): ParseResult {
  let value: unknown = raw;
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw);
    } catch {
      return { ok: false, errors: ["response is not valid JSON"] };
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, errors: ["response is not a JSON object"] };
  }

  const errors: string[] = [];
  const obj = value as Record<string, unknown>;
  const allowedTop = new Set([
    "explanation_md",
    "practice_task_md",
    "quiz",
    "outcomes",
    "workedExample_md",
    "keyTerms",
    "commonMistakes",
    "selfCheck",
  ]);
  for (const key of Object.keys(obj)) if (!allowedTop.has(key)) errors.push(`unexpected field "${key}"`);

  const strings: { label: string; text: string }[] = [];

  if (!isNonEmptyString(obj.explanation_md)) errors.push("explanation_md must be a non empty string");
  else if (obj.explanation_md.trim().length < EXPLANATION_MIN_CHARS) errors.push("explanation_md is too short");
  else strings.push({ label: "explanation_md", text: obj.explanation_md });

  if (!isNonEmptyString(obj.practice_task_md)) errors.push("practice_task_md must be a non empty string");
  else if (obj.practice_task_md.trim().length < PRACTICE_MIN_CHARS) errors.push("practice_task_md is too short");
  else strings.push({ label: "practice_task_md", text: obj.practice_task_md });

  const quiz = obj.quiz as Record<string, unknown> | undefined;
  const questions: GeneratedQuestion[] = [];
  let passThreshold = 0;

  if (!quiz || typeof quiz !== "object" || Array.isArray(quiz)) {
    errors.push("quiz must be an object");
  } else {
    for (const key of Object.keys(quiz)) {
      if (key !== "questions" && key !== "pass_threshold") errors.push(`unexpected field "quiz.${key}"`);
    }
    const pt = quiz.pass_threshold;
    if (typeof pt !== "number" || !Number.isInteger(pt) || pt < PASS_THRESHOLD_MIN || pt > PASS_THRESHOLD_MAX) {
      errors.push(`quiz.pass_threshold must be a whole number from ${PASS_THRESHOLD_MIN} to ${PASS_THRESHOLD_MAX}`);
    } else {
      passThreshold = pt;
    }

    const qs = quiz.questions;
    if (!Array.isArray(qs)) {
      errors.push("quiz.questions must be an array");
    } else {
      if (qs.length < QUIZ_MIN_QUESTIONS || qs.length > QUIZ_MAX_QUESTIONS) {
        errors.push(`quiz must have ${QUIZ_MIN_QUESTIONS} to ${QUIZ_MAX_QUESTIONS} questions, got ${qs.length}`);
      }
      qs.forEach((q, i) => {
        const at = `quiz.questions[${i}]`;
        if (!q || typeof q !== "object" || Array.isArray(q)) {
          errors.push(`${at} must be an object`);
          return;
        }
        const item = q as Record<string, unknown>;
        const allowed = new Set(["prompt", "options", "answer_index", "explanation"]);
        for (const key of Object.keys(item)) if (!allowed.has(key)) errors.push(`unexpected field "${at}.${key}"`);
        const before = errors.length;
        if (!isNonEmptyString(item.prompt)) errors.push(`${at}.prompt must be a non empty string`);
        if (!isNonEmptyString(item.explanation)) errors.push(`${at}.explanation must be a non empty string`);
        const opts = item.options;
        if (!Array.isArray(opts) || opts.length !== QUIZ_OPTIONS || !opts.every(isNonEmptyString)) {
          errors.push(`${at}.options must be exactly ${QUIZ_OPTIONS} non empty strings`);
        } else if (new Set(opts.map((o) => o.trim().toLowerCase())).size !== QUIZ_OPTIONS) {
          errors.push(`${at}.options must all be different`);
        }
        const ai = item.answer_index;
        if (typeof ai !== "number" || !Number.isInteger(ai) || ai < 0 || ai >= QUIZ_OPTIONS) {
          errors.push(`${at}.answer_index must be a whole number from 0 to ${QUIZ_OPTIONS - 1}`);
        }
        if (errors.length === before) {
          const question = {
            prompt: (item.prompt as string).trim(),
            options: (opts as string[]).map((o) => o.trim()),
            answer_index: ai as number,
            explanation: (item.explanation as string).trim(),
          };
          questions.push(question);
          strings.push({ label: `${at}.prompt`, text: question.prompt });
          question.options.forEach((o, j) => strings.push({ label: `${at}.options[${j}]`, text: o }));
          strings.push({ label: `${at}.explanation`, text: question.explanation });
        }
      });
    }
  }

  const anatomy = parseAnatomy(obj, errors, strings);

  for (const { label, text } of strings) {
    for (const problem of findDashes(text)) errors.push(`${label} ${problem}`);
  }

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    content: {
      ...anatomy,
      explanation_md: (obj.explanation_md as string).trim(),
      practice_task_md: (obj.practice_task_md as string).trim(),
      quiz: { questions, pass_threshold: passThreshold },
    },
  };
}

function stringList(
  value: unknown,
  label: string,
  errors: string[],
  strings: { label: string; text: string }[],
  { min = 1, max = 12, maxChars }: { min?: number; max?: number; maxChars?: number } = {},
): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || !value.every(isNonEmptyString)) {
    errors.push(`${label} must be a list of non empty strings`);
    return undefined;
  }
  if (value.length < min || value.length > max) errors.push(`${label} must have ${min} to ${max} items, got ${value.length}`);
  const items = value.map((v) => v.trim());
  items.forEach((text, i) => {
    if (maxChars && text.length > maxChars) errors.push(`${label}[${i}] is longer than ${maxChars} characters`);
    strings.push({ label: `${label}[${i}]`, text });
  });
  return items;
}

/** The optional anatomy fields: each is checked only when present. */
function parseAnatomy(obj: Record<string, unknown>, errors: string[], strings: { label: string; text: string }[]): LessonAnatomy {
  const anatomy: LessonAnatomy = {};
  const outcomes = stringList(obj.outcomes, "outcomes", errors, strings, {
    min: OUTCOMES_MIN,
    max: OUTCOMES_MAX,
    maxChars: OUTCOME_MAX_CHARS,
  });
  if (outcomes) anatomy.outcomes = outcomes;

  if (obj.workedExample_md !== undefined) {
    if (!isNonEmptyString(obj.workedExample_md)) errors.push("workedExample_md must be a non empty string");
    else {
      anatomy.workedExample_md = obj.workedExample_md.trim();
      strings.push({ label: "workedExample_md", text: anatomy.workedExample_md });
    }
  }

  if (obj.keyTerms !== undefined) {
    const terms = obj.keyTerms;
    if (!Array.isArray(terms) || terms.length === 0) errors.push("keyTerms must be a non empty list");
    else {
      const parsed: KeyTerm[] = [];
      terms.forEach((t, i) => {
        const item = t as Record<string, unknown> | null;
        if (!item || typeof item !== "object" || Array.isArray(item) || !isNonEmptyString(item.term) || !isNonEmptyString(item.definition)) {
          errors.push(`keyTerms[${i}] must have a non empty term and definition`);
          return;
        }
        for (const key of Object.keys(item)) if (key !== "term" && key !== "definition") errors.push(`unexpected field "keyTerms[${i}].${key}"`);
        const term = { term: item.term.trim(), definition: item.definition.trim() };
        parsed.push(term);
        strings.push({ label: `keyTerms[${i}].term`, text: term.term }, { label: `keyTerms[${i}].definition`, text: term.definition });
      });
      if (parsed.length === terms.length) anatomy.keyTerms = parsed;
    }
  }

  const mistakes = stringList(obj.commonMistakes, "commonMistakes", errors, strings);
  if (mistakes) anatomy.commonMistakes = mistakes;
  const selfCheck = stringList(obj.selfCheck, "selfCheck", errors, strings);
  if (selfCheck) anatomy.selfCheck = selfCheck;
  return anatomy;
}

/**
 * Splits a validated quiz into the two tables: questions learners may read,
 * and the answer key only admins and the grader see. Ids are q1, q2... to
 * match docs/data-model.md and submit_node_quiz.
 */
export function toQuizRows(quiz: GeneratedContent["quiz"]) {
  const questions = quiz.questions.map((q, i) => ({ id: `q${i + 1}`, prompt: q.prompt, options: q.options }));
  const answerKey = Object.fromEntries(quiz.questions.map((q, i) => [`q${i + 1}`, q.answer_index]));
  return { questions, answerKey, passThreshold: quiz.pass_threshold };
}
