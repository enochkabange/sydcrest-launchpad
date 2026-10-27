import type Anthropic from "@anthropic-ai/sdk";
import { describe, expect, it, vi } from "vitest";
import type { AdminDb } from "@/lib/content-generation/db";
import {
  buildReviewParams,
  createReviewClient,
  estimateUsd,
  isAiReviewConfigured,
  reviewSubmission,
  type ReviewClient,
  type SubmissionToReview,
  type UsageLogEntry,
} from "./review";

const WEEK_ID = "00000000-0000-4000-8000-000000000003";
const PROGRAM_ID = "00000000-0000-4000-8000-000000000001";

const criteria = [
  { id: "understanding", label: "Understanding", description: "", max_points: 4 },
  { id: "communication", label: "Communication", description: "", max_points: 2 },
];

function fakeDb(opts: { capstone?: boolean; rubric?: "week" | "default" | "none"; recorded?: boolean; recordError?: string } = {}) {
  const rpc = vi.fn(async () =>
    opts.recordError ? { data: null, error: { message: opts.recordError } } : { data: opts.recorded ?? true, error: null },
  );
  const week = {
    id: WEEK_ID,
    program_id: PROGRAM_ID,
    week_number: 3,
    theme: "Social media basics",
    objectives: ["Plan posts"],
    assignment: "Plan a week of posts.",
    is_capstone: opts.capstone ?? false,
    programs: { title: "Digital Marketing Professional" },
  };
  const rubrics =
    opts.rubric === "none"
      ? []
      : [
          { id: "default", title: "Default", criteria, program_week_id: null },
          ...(opts.rubric === "default" ? [] : [{ id: "weekly", title: "Week 3", criteria, program_week_id: WEEK_ID }]),
        ];
  const insert = vi.fn<(row: Record<string, unknown>) => Promise<{ error: { message: string } | null }>>(async () => ({ error: null }));
  const from = vi.fn((table: string) => {
    const chain = {
      insert,
      select: () => chain,
      eq: () => chain,
      or: async () => ({ data: table === "rubrics" ? rubrics : [], error: null }),
      maybeSingle: async () => ({ data: table === "program_weeks" ? week : null, error: null }),
    };
    return chain;
  });
  return { db: { from, rpc } as unknown as AdminDb, rpc, insert, from };
}

const usage = { input_tokens: 120, output_tokens: 300, cache_creation_input_tokens: 0, cache_read_input_tokens: 900 } as Anthropic.Usage;

function fakeClient(answer: unknown, stop: Anthropic.StopReason = "end_turn") {
  const calls: Anthropic.MessageCreateParamsNonStreaming[] = [];
  const client: ReviewClient = {
    messages: {
      async create(params) {
        calls.push(params);
        return {
          stop_reason: stop,
          usage,
          content: [{ type: "text", text: typeof answer === "string" ? answer : JSON.stringify(answer) }],
        } as unknown as Anthropic.Message;
      },
    },
  };
  return { client, calls };
}

const sub: SubmissionToReview = {
  id: "00000000-0000-4000-8000-0000000000aa",
  attempt: 2,
  programWeekId: WEEK_ID,
  bodyText: "Fuseini's plan: three posts a week about the Tamale market.",
  linkUrl: null,
  filePath: null,
};

const answer = {
  summary: "A clear plan.",
  criteria: [
    { id: "understanding", points: 3, comment: "Good." },
    { id: "communication", points: 2, comment: "Clear." },
  ],
};

describe("configuration", () => {
  it("is a no op without the keys", () => {
    expect(createReviewClient("")).toBeNull();
    expect(createReviewClient(undefined)).toBeNull();
    expect(isAiReviewConfigured({} as NodeJS.ProcessEnv)).toBe(false);
    expect(isAiReviewConfigured({ ANTHROPIC_API_KEY: "k" } as unknown as NodeJS.ProcessEnv)).toBe(false);
    expect(
      isAiReviewConfigured({ ANTHROPIC_API_KEY: "k", SUPABASE_SECRET_KEY: "s", NEXT_PUBLIC_SUPABASE_URL: "u" } as unknown as NodeJS.ProcessEnv),
    ).toBe(true);
  });
});

describe("reviewSubmission", () => {
  it("reviews with Haiku, caches the system prompt, records the attempt it read and logs usage", async () => {
    const { db, rpc, from, insert } = fakeDb();
    const { client, calls } = fakeClient(answer);
    const log = vi.fn<(e: UsageLogEntry) => void>();
    const outcome = await reviewSubmission({ db, client, log }, sub);

    expect(outcome).toEqual({ status: "recorded", score: 83, model: "claude-haiku-5-5" });
    expect(calls).toHaveLength(1);
    const params = calls[0];
    expect(params.model).toBe("claude-haiku-5-5");
    expect(params.output_config?.format?.type).toBe("json_schema");
    expect(Array.isArray(params.system) && params.system.every((b) => b.cache_control?.type === "ephemeral")).toBe(true);
    expect(String(params.messages[0].content)).toContain("<submission>");

    expect(rpc).toHaveBeenCalledWith("record_ai_review", {
      p_submission_id: sub.id,
      p_attempt: 2,
      p_feedback: { summary: "A clear plan.", criteria: answer.criteria },
      p_score: 83,
      p_model: "claude-haiku-5-5",
    });
    expect(log).toHaveBeenCalledTimes(1);
    expect(log.mock.calls[0][0]).toMatchObject({
      event: "submission_ai_review",
      outcome: "recorded",
      input_tokens: 120,
      output_tokens: 300,
      cache_read_input_tokens: 900,
    });
    expect(from).toHaveBeenCalledWith("ai_review_usage");
    expect(insert).toHaveBeenCalledTimes(1);
    expect(insert.mock.calls[0][0]).toMatchObject({
      submission_id: sub.id,
      attempt: 2,
      model: "claude-haiku-5-5",
      outcome: "recorded",
      input_tokens: 120,
      output_tokens: 300,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 900,
    });
  });

  it("still returns the outcome when storing usage fails", async () => {
    const { db, insert } = fakeDb();
    insert.mockResolvedValueOnce({ error: { message: "permission denied" } });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { client } = fakeClient(answer);
    expect((await reviewSubmission({ db, client, log: () => {} }, sub)).status).toBe("recorded");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("permission denied"));
    warn.mockRestore();
  });

  it("uses Sonnet for capstone weeks and the programme default rubric when the week has none", async () => {
    const { db } = fakeDb({ capstone: true, rubric: "default" });
    const { client, calls } = fakeClient(answer);
    const outcome = await reviewSubmission({ db, client, log: () => {} }, sub);
    expect(outcome.status).toBe("recorded");
    expect(calls[0].model).toBe("claude-sonnet-5-5");
    expect(calls[0].max_tokens).toBeGreaterThan(4000);
  });

  it("reports a stale attempt when record_ai_review ignores it", async () => {
    const { db } = fakeDb({ recorded: false });
    const { client } = fakeClient(answer);
    expect(await reviewSubmission({ db, client, log: () => {} }, sub)).toEqual({ status: "stale", model: "claude-haiku-5-5" });
  });

  it("never stores a malformed, refused or cut off answer, but still logs and stores its usage", async () => {
    for (const [reply, stop, reason] of [
      ["not json", "end_turn", "invalid_json"],
      [{ summary: "x", criteria: [{ id: "understanding", points: 9, comment: "?" }] }, "end_turn", "invalid_review"],
      [answer, "refusal", "refusal"],
      [answer, "max_tokens", "max_tokens"],
    ] as const) {
      const { db, rpc, insert } = fakeDb();
      const { client } = fakeClient(reply, stop);
      const log = vi.fn();
      const outcome = await reviewSubmission({ db, client, log }, sub);
      expect(outcome.status).toBe("failed");
      expect(outcome.status === "failed" && outcome.reason).toMatch(new RegExp(`^${reason}`));
      expect(rpc).not.toHaveBeenCalled();
      expect(log).toHaveBeenCalledTimes(1);
      expect(insert.mock.calls[0][0]).toMatchObject({ outcome: "failed" });
    }
  });

  it("skips work with no written text, and weeks without a rubric, without calling the model", async () => {
    const { db } = fakeDb();
    const { client, calls } = fakeClient(answer);
    expect(await reviewSubmission({ db, client }, { ...sub, bodyText: "  ", linkUrl: "https://example.com" })).toEqual({
      status: "skipped",
      reason: "no_text",
    });
    const none = fakeDb({ rubric: "none" });
    expect(await reviewSubmission({ db: none.db, client }, sub)).toEqual({ status: "skipped", reason: "no_rubric" });
    expect(calls).toHaveLength(0);
  });

  it("does not throw when the API call fails", async () => {
    const { db, rpc } = fakeDb();
    const client: ReviewClient = { messages: { create: async () => Promise.reject(new Error("overloaded")) } };
    expect(await reviewSubmission({ db, client, log: () => {} }, sub)).toEqual({
      status: "failed",
      reason: "overloaded",
      model: "claude-haiku-5-5",
    });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("reports a database error from record_ai_review", async () => {
    const { db } = fakeDb({ recordError: "permission denied" });
    const { client } = fakeClient(answer);
    const outcome = await reviewSubmission({ db, client, log: () => {} }, sub);
    expect(outcome.status === "failed" && outcome.reason).toMatch(/record_ai_review/);
  });
});

describe("buildReviewParams and estimateUsd", () => {
  it("caps tokens and sets effort per tier", () => {
    const week = { programTitle: "P", weekNumber: 1, theme: "T", objectives: [], assignment: null, isCapstone: false };
    const rubric = { id: "r", title: "R", criteria };
    expect(buildReviewParams("routine", week, rubric, sub)).toMatchObject({ max_tokens: 4000, output_config: { effort: "low" } });
    expect(buildReviewParams("capstone", week, rubric, sub)).toMatchObject({ output_config: { effort: "medium" } });
  });

  it("estimates cost from usage, and null for an unknown model", () => {
    expect(estimateUsd("claude-haiku-5-5", usage)).toBeGreaterThan(0);
    expect(estimateUsd("unknown", usage)).toBeNull();
  });
});
