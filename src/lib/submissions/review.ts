import Anthropic from "@anthropic-ai/sdk";
import type { AdminDb } from "@/lib/content-generation/db";
import { PRICING } from "@/lib/content-generation/cost";
import { REVIEW_EFFORT, REVIEW_MAX_TOKENS, REVIEW_MODELS, type ReviewTier } from "./config";
import { readRubricCriteria, reviewOutputSchema, validateReview, type Rubric } from "./feedback";
import { buildSystemPrompt, buildUserMessage, type WeekContext } from "./prompt";

/**
 * The AI rubric review job. It runs after the learner's response has been
 * sent (next/server after()), with the secret key database client, because
 * record_ai_review is service role only. Everything it needs is passed in,
 * so tests use a fake model client and a fake database: no live calls.
 */

/** The slice of the SDK this module uses; tests pass a fake. */
export type ReviewClient = {
  messages: { create(params: Anthropic.MessageCreateParamsNonStreaming): Promise<Anthropic.Message> };
};

/** The row save_submission returned, at the attempt that was sent. */
export type SubmissionToReview = {
  id: string;
  attempt: number;
  programWeekId: string;
  bodyText: string | null;
  linkUrl: string | null;
  filePath: string | null;
};

export type ReviewOutcome =
  | { status: "recorded"; score: number; model: string }
  | { status: "stale"; model: string }
  | { status: "skipped"; reason: "no_text" | "no_rubric" | "week_not_found" }
  | { status: "failed"; reason: string; model?: string };

export type UsageLogEntry = {
  event: "submission_ai_review";
  submission_id: string;
  attempt: number;
  model: string;
  outcome: ReviewOutcome["status"];
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number;
  cache_read_input_tokens: number;
  estimated_usd: number | null;
};

export type ReviewDeps = {
  db: AdminDb;
  client: ReviewClient;
  /** Where usage goes; defaults to one structured server log line per model call. */
  log?: (entry: UsageLogEntry) => void;
};

/** Whether reviews can run at all, so the page can show a friendly resting state instead. */
export function isAiReviewConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(env.ANTHROPIC_API_KEY && env.SUPABASE_SECRET_KEY && env.NEXT_PUBLIC_SUPABASE_URL);
}

/** Null when ANTHROPIC_API_KEY is missing: the job is a no op and the work waits for the mentor. */
export function createReviewClient(apiKey = process.env.ANTHROPIC_API_KEY): ReviewClient | null {
  if (!apiKey) return null;
  return new Anthropic({ apiKey, maxRetries: 2, timeout: 120_000 });
}

/** AI review reads written work only; a link or file on its own goes straight to the mentor. */
export function needsAiReview(sub: Pick<SubmissionToReview, "bodyText">): boolean {
  return Boolean(sub.bodyText?.trim());
}

export function tierFor(isCapstone: boolean): ReviewTier {
  return isCapstone ? "capstone" : "routine";
}

export function buildReviewParams(
  tier: ReviewTier,
  week: WeekContext,
  rubric: Rubric,
  sub: SubmissionToReview,
): Anthropic.MessageCreateParamsNonStreaming {
  return {
    model: REVIEW_MODELS[tier],
    max_tokens: REVIEW_MAX_TOKENS[tier],
    system: buildSystemPrompt(week, rubric),
    messages: [
      {
        role: "user",
        content: buildUserMessage({ bodyText: sub.bodyText, linkUrl: sub.linkUrl, hasFile: Boolean(sub.filePath) }),
      },
    ],
    output_config: { effort: REVIEW_EFFORT[tier], format: { type: "json_schema", schema: reviewOutputSchema(rubric) } },
  };
}

/** Standard rates; cache writes (5 minute TTL) bill at 1.25x input. */
export function estimateUsd(model: string, usage: Partial<Anthropic.Usage> | null | undefined): number | null {
  const price = PRICING[model];
  if (!price || !usage) return null;
  const perM = (tokens: number | null | undefined, usd: number) => ((tokens ?? 0) / 1_000_000) * usd;
  const total =
    perM(usage.input_tokens, price.input) +
    perM(usage.cache_creation_input_tokens, price.input * 1.25) +
    perM(usage.cache_read_input_tokens, price.cacheRead) +
    perM(usage.output_tokens, price.output);
  return Math.round(total * 1_000_000) / 1_000_000;
}

function defaultLog(entry: UsageLogEntry) {
  console.info(JSON.stringify(entry));
}

type WeekRow = {
  id: string;
  program_id: string;
  week_number: number;
  theme: string;
  objectives: string[] | null;
  assignment: string | null;
  is_capstone: boolean;
  programs: { title: string } | null;
};

async function loadWeek(db: AdminDb, weekId: string): Promise<WeekRow | null> {
  const { data, error } = await db
    .from("program_weeks")
    .select("id, program_id, week_number, theme, objectives, assignment, is_capstone, programs(title)")
    .eq("id", weekId)
    .maybeSingle();
  if (error) throw new Error(`Could not load week: ${error.message}`);
  return data as WeekRow | null;
}

/** The week's rubric, else the programme default (the same lookup as rubric_for_week). */
export async function loadRubric(db: AdminDb, programId: string, weekId: string): Promise<Rubric | null> {
  const { data, error } = await db
    .from("rubrics")
    .select("id, title, criteria, program_week_id")
    .eq("program_id", programId)
    .or(`program_week_id.eq.${weekId},program_week_id.is.null`);
  if (error) throw new Error(`Could not load rubric: ${error.message}`);
  const row = (data ?? []).find((r) => r.program_week_id === weekId) ?? (data ?? []).find((r) => !r.program_week_id);
  if (!row) return null;
  const criteria = readRubricCriteria(row.criteria);
  return criteria.length ? { id: row.id, title: row.title, criteria } : null;
}

function answerText(message: Anthropic.Message): string {
  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
}

/**
 * Reviews one attempt and stores it with record_ai_review. Never throws:
 * a failed review leaves the work as submitted for the mentor, and the
 * outcome says why. Usage is logged for every model call, also failed ones.
 */
export async function reviewSubmission(deps: ReviewDeps, sub: SubmissionToReview): Promise<ReviewOutcome> {
  const log = deps.log ?? defaultLog;
  if (!needsAiReview(sub)) return { status: "skipped", reason: "no_text" };

  let week: WeekRow | null;
  let rubric: Rubric | null;
  try {
    week = await loadWeek(deps.db, sub.programWeekId);
    if (!week) return { status: "skipped", reason: "week_not_found" };
    rubric = await loadRubric(deps.db, week.program_id, week.id);
    if (!rubric) return { status: "skipped", reason: "no_rubric" };
  } catch (error) {
    return { status: "failed", reason: error instanceof Error ? error.message : String(error) };
  }

  const tier = tierFor(week.is_capstone);
  const context: WeekContext = {
    programTitle: week.programs?.title ?? "SydCrest Launchpad",
    weekNumber: week.week_number,
    theme: week.theme,
    objectives: week.objectives ?? [],
    assignment: week.assignment,
    isCapstone: week.is_capstone,
  };
  const params = buildReviewParams(tier, context, rubric, sub);
  const model = params.model;

  let message: Anthropic.Message;
  try {
    message = await deps.client.messages.create(params);
  } catch (error) {
    return { status: "failed", reason: error instanceof Error ? error.message : String(error), model };
  }

  const outcome = await interpret(deps.db, message, rubric, sub, model);
  const usage = message.usage;
  log({
    event: "submission_ai_review",
    submission_id: sub.id,
    attempt: sub.attempt,
    model,
    outcome: outcome.status,
    input_tokens: usage?.input_tokens ?? 0,
    output_tokens: usage?.output_tokens ?? 0,
    cache_creation_input_tokens: usage?.cache_creation_input_tokens ?? 0,
    cache_read_input_tokens: usage?.cache_read_input_tokens ?? 0,
    estimated_usd: estimateUsd(model, usage),
  });
  return outcome;
}

async function interpret(
  db: AdminDb,
  message: Anthropic.Message,
  rubric: Rubric,
  sub: SubmissionToReview,
  model: string,
): Promise<ReviewOutcome> {
  if (message.stop_reason === "refusal") return { status: "failed", reason: "refusal", model };
  if (message.stop_reason === "max_tokens") return { status: "failed", reason: "max_tokens", model };

  let parsed: unknown;
  try {
    parsed = JSON.parse(answerText(message));
  } catch {
    return { status: "failed", reason: "invalid_json", model };
  }
  const checked = validateReview(parsed, rubric);
  if (!checked.ok) return { status: "failed", reason: `invalid_review: ${checked.errors.join("; ")}`, model };

  const { data, error } = await db.rpc("record_ai_review", {
    p_submission_id: sub.id,
    p_attempt: sub.attempt,
    p_feedback: checked.feedback,
    p_score: checked.score,
    p_model: model,
  });
  if (error) return { status: "failed", reason: `record_ai_review: ${error.message}`, model };
  return data ? { status: "recorded", score: checked.score, model } : { status: "stale", model };
}
