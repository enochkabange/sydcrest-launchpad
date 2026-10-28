import { describe, expect, it } from "vitest";
import { buildUserPrompt, SYSTEM_PROMPT, type NodeContext } from "./prompt";
import { findDashes, parseGeneratedContent, toQuizRows, CONTENT_JSON_SCHEMA } from "./schema";
import { estimateBatchCost, estimateTokens, formatUsd } from "./cost";
import { buildBatchRequest, customIdFor, interpretResult } from "./requests";
import { contentModel, DEFAULT_CONTENT_MODEL } from "./config";
import { contextFor, selectionError, writeGenerated, type AdminDb } from "./db";
import { collectRun, type BatchClient } from "./run";

const NODE_ID = "2b0f6c1e-8d3a-4f5b-9c7d-1a2b3c4d5e6f";

const ctx: NodeContext = {
  nodeId: NODE_ID,
  nodeTitle: "Sorting and filtering",
  nodeSummary: "Find the rows you need in a sheet.",
  roadmapTitle: "Data Analyst",
  roadmapDescription: "From spreadsheets to dashboards.",
  track: "data",
  parentTitle: "Spreadsheets",
  siblingTitles: ["Cells and formulas", "Charts"],
};

const explanation =
  "## What sorting means\n\nSorting puts rows in order. Wumpini runs a provisions shop in Tamale and keeps a sheet of sales.\n\n" +
  "- Sort by date to see the newest sales first.\n- Filter to show only rice.\n\n" +
  "Sorting does not change your data, it only changes the order you see it in. Filtering hides rows you do not need right now. " +
  "Together they help Wumpini answer questions like which product sold most this week.\n\n```\n=SORT(A2:C20, 2, -1)\n```\n\n" +
  "## Key points\n\n- Sorting orders rows.\n- Filtering hides rows.\n- Your data stays the same.";
const practice =
  "Mariama sells fabric at Tamale Central Market. 1. Make a sheet with ten sales. 2. Sort by amount. 3. Filter to one fabric. You are done when you can name her best seller.";

function question(answer = 1) {
  return {
    prompt: "What does sorting change?",
    options: ["The values", "The order of rows", "The file name", "The colours"],
    answer_index: answer,
    explanation: "Sorting only changes the order rows appear in.",
  };
}

function valid() {
  return {
    explanation_md: explanation,
    practice_task_md: practice,
    quiz: { questions: [question(1), { ...question(2), prompt: "Q2?", options: ["a", "b", "c", "d"] }, { ...question(0), prompt: "Q3?" }], pass_threshold: 70 },
  };
}

describe("prompt building", () => {
  it("keeps the system prompt stable and long enough to cache", () => {
    expect(SYSTEM_PROMPT).not.toContain("${");
    // Minimum cacheable prefix on current models is 512 tokens.
    expect(SYSTEM_PROMPT.length / 4).toBeGreaterThan(700);
    expect(SYSTEM_PROMPT).toMatch(/Ghana/);
    expect(SYSTEM_PROMPT).toMatch(/Never use dashes/);
    expect(SYSTEM_PROMPT).toMatch(/Never invent statistics/);
    expect(SYSTEM_PROMPT).toMatch(/original material/);
    expect(SYSTEM_PROMPT).toMatch(/Wumpini/);
  });

  it("puts the roadmap context in the user prompt", () => {
    const p = buildUserPrompt(ctx);
    expect(p).toContain("Roadmap: Data Analyst");
    expect(p).toContain("Track: data");
    expect(p).toContain("Section: Spreadsheets");
    expect(p).toContain("Other topics in this section: Cells and formulas; Charts");
    expect(p).toContain("Topic to write: Sorting and filtering");
    expect(p).toContain("Find the rows you need");
  });

  it("handles a top level node with no track or siblings", () => {
    const p = buildUserPrompt({ ...ctx, track: null, parentTitle: null, siblingTitles: [], nodeSummary: null, roadmapDescription: null });
    expect(p).toContain("Section: none");
    expect(p).toContain("Other topics in this section: none");
    expect(p).not.toContain("Track:");
    expect(p).not.toContain("null");
  });

  it("builds context from the node tree", () => {
    const nodes = [
      { id: "p", roadmap_id: "r", parent_id: null, title: "Spreadsheets", summary: null, position: 0, node_content: null },
      { id: "b", roadmap_id: "r", parent_id: "p", title: "Charts", summary: null, position: 2, node_content: null },
      { id: "a", roadmap_id: "r", parent_id: "p", title: "Formulas", summary: null, position: 1, node_content: null },
      { id: "c", roadmap_id: "r", parent_id: "p", title: "Sorting", summary: "s", position: 3, node_content: null },
    ];
    const c = contextFor(nodes[3], { id: "r", title: "Data Analyst", description: null, track: "data" }, nodes);
    expect(c.parentTitle).toBe("Spreadsheets");
    expect(c.siblingTitles).toEqual(["Formulas", "Charts"]);
  });
});

describe("batch requests", () => {
  it("caches the shared system prompt and asks for the JSON schema", () => {
    const req = buildBatchRequest(ctx, "claude-sonnet-5-5");
    expect(req.custom_id).toBe(NODE_ID);
    expect(req.params.model).toBe("claude-sonnet-5-5");
    const system = req.params.system as { text: string; cache_control: unknown }[];
    expect(system).toHaveLength(1);
    expect(system[0].text).toBe(SYSTEM_PROMPT);
    expect(system[0].cache_control).toEqual({ type: "ephemeral", ttl: "1h" });
    expect(req.params.output_config?.format).toEqual({ type: "json_schema", schema: CONTENT_JSON_SCHEMA });
    expect(req.params.messages[0].content).toBe(buildUserPrompt(ctx));
  });

  it("refuses custom ids that are not node ids", () => {
    expect(() => customIdFor("not a uuid")).toThrow();
  });

  it("defaults to the content model and allows overrides", () => {
    const saved = process.env.CONTENT_MODEL;
    delete process.env.CONTENT_MODEL;
    expect(contentModel()).toBe(DEFAULT_CONTENT_MODEL);
    expect(DEFAULT_CONTENT_MODEL).toBe("claude-sonnet-5-5");
    expect(contentModel("claude-haiku-5-5")).toBe("claude-haiku-5-5");
    process.env.CONTENT_MODEL = "claude-opus-5-5";
    expect(contentModel()).toBe("claude-opus-5-5");
    if (saved === undefined) delete process.env.CONTENT_MODEL;
    else process.env.CONTENT_MODEL = saved;
  });
});

describe("result parsing", () => {
  it("accepts a valid result from text", () => {
    const r = parseGeneratedContent(JSON.stringify(valid()));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.content.quiz.questions).toHaveLength(3);
  });

  it("rejects text that is not JSON", () => {
    expect(parseGeneratedContent("Here is your lesson: {")).toEqual({ ok: false, errors: ["response is not valid JSON"] });
    expect(parseGeneratedContent("[1,2]")).toEqual({ ok: false, errors: ["response is not a JSON object"] });
    expect(parseGeneratedContent("null").ok).toBe(false);
  });

  it("rejects missing and extra fields", () => {
    const { practice_task_md: _drop, ...noPractice } = valid();
    void _drop;
    const r = parseGeneratedContent({ ...noPractice, title: "x" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors).toContain('unexpected field "title"');
      expect(r.errors).toContain("practice_task_md must be a non empty string");
    }
  });

  it("enforces the quiz size, options and answer index", () => {
    const tooFew = { ...valid(), quiz: { questions: [question()], pass_threshold: 70 } };
    expect(parseGeneratedContent(tooFew).ok).toBe(false);

    const six = { ...valid(), quiz: { questions: Array.from({ length: 6 }, () => question()), pass_threshold: 70 } };
    expect(parseGeneratedContent(six).ok).toBe(false);

    const threeOptions = valid();
    threeOptions.quiz.questions[0].options = ["a", "b", "c"];
    expect(parseGeneratedContent(threeOptions).ok).toBe(false);

    const dupes = valid();
    dupes.quiz.questions[0].options = ["a", "A", "b", "c"];
    const d = parseGeneratedContent(dupes);
    expect(!d.ok && d.errors.some((e) => e.includes("must all be different"))).toBe(true);

    for (const bad of [4, -1, 1.5, "1"]) {
      const v = valid();
      (v.quiz.questions[0] as { answer_index: unknown }).answer_index = bad;
      expect(parseGeneratedContent(v).ok).toBe(false);
    }
  });

  it("enforces the pass threshold range", () => {
    for (const bad of [0, 49, 101, 70.5, "70"]) {
      const v = valid();
      (v.quiz as { pass_threshold: unknown }).pass_threshold = bad;
      expect(parseGeneratedContent(v).ok).toBe(false);
    }
    const v = valid();
    v.quiz.pass_threshold = 80;
    expect(parseGeneratedContent(v).ok).toBe(true);
  });

  it("rejects dashes in prose but allows bullets, hyphenated words and code", () => {
    expect(findDashes("Abdul-Rahman uses a step-by-step plan.")).toEqual([]);
    expect(findDashes("- a list item\n  - nested")).toEqual([]);
    expect(findDashes("Run `ls -la` or\n```\nSELECT a - b -- comment\n```")).toEqual([]);
    expect(findDashes("Sorting — the basics")).toHaveLength(1);
    expect(findDashes("Pages 1–5")).toHaveLength(1);
    expect(findDashes("Sorting - the basics")).toHaveLength(1);

    const v = valid();
    v.quiz.questions[1].explanation = "Because — obviously.";
    const r = parseGeneratedContent(v);
    expect(!r.ok && r.errors[0]).toMatch(/quiz.questions\[1\].explanation contains an em or en dash/);
  });

  it("rejects content that is too short", () => {
    const r = parseGeneratedContent({ ...valid(), explanation_md: "Too short." });
    expect(!r.ok && r.errors).toContain("explanation_md is too short");
  });

  it("splits the quiz into public questions and a hidden answer key", () => {
    const r = parseGeneratedContent(valid());
    if (!r.ok) throw new Error("expected valid");
    const rows = toQuizRows(r.content.quiz);
    expect(rows.questions[0]).toEqual({ id: "q1", prompt: "What does sorting change?", options: question().options });
    expect(JSON.stringify(rows.questions)).not.toMatch(/answer|explanation/);
    expect(rows.answerKey).toEqual({ q1: 1, q2: 2, q3: 0 });
    expect(rows.passThreshold).toBe(70);
  });
});

type Line = Parameters<typeof interpretResult>[0];

function succeeded(text: string, stop: string = "end_turn"): Line {
  return {
    custom_id: NODE_ID,
    result: {
      type: "succeeded",
      message: {
        stop_reason: stop,
        content: [
          { type: "thinking", thinking: "", signature: "x" },
          { type: "text", text },
        ],
      },
    },
  } as unknown as Line;
}

describe("batch results", () => {
  it("reads the text block and skips thinking", () => {
    const r = interpretResult(succeeded(JSON.stringify(valid())));
    expect(r.ok).toBe(true);
    expect(r.nodeId).toBe(NODE_ID);
  });

  it("reports errored, expired, refused and truncated requests", () => {
    const errored = { custom_id: NODE_ID, result: { type: "errored", error: { type: "error", error: { type: "overloaded_error", message: "Overloaded" } } } } as unknown as Line;
    expect(interpretResult(errored)).toMatchObject({ ok: false, errors: ["request errored: Overloaded"] });
    expect(interpretResult({ custom_id: NODE_ID, result: { type: "expired" } } as Line)).toMatchObject({ ok: false, errors: ["request expired"] });
    expect(interpretResult(succeeded("{}", "refusal"))).toMatchObject({ ok: false, errors: ["model declined the request"] });
    expect(interpretResult(succeeded('{"explanation_md": "cut', "max_tokens"))).toMatchObject({ ok: false });
    expect(interpretResult(succeeded("not json"))).toMatchObject({ ok: false, errors: ["response is not valid JSON"] });
    expect(interpretResult({ ...succeeded("{}"), custom_id: "weird" })).toMatchObject({ ok: false, nodeId: null });
  });
});

describe("cost maths", () => {
  it("estimates tokens on the high side", () => {
    expect(estimateTokens("")).toBe(0);
    expect(estimateTokens("a".repeat(35))).toBe(10);
    expect(estimateTokens("a".repeat(36))).toBe(11);
  });

  it("prices a batch with caching and the batch discount", () => {
    // 7,000 chars = 2,000 system tokens; 350 chars = 100 user tokens each.
    const e = estimateBatchCost({
      model: "claude-sonnet-5-5",
      systemPrompt: "s".repeat(7000),
      userPrompts: ["u".repeat(350), "u".repeat(350), "u".repeat(350)],
      outputTokensPerRequest: 1000,
    })!;
    expect(e.systemTokens).toBe(2000);
    expect(e.userTokens).toBe(300);
    expect(e.outputTokens).toBe(3000);
    // write = 2000 * $4/M = 0.008; read = 2000 * $0.20/M = 0.0004
    // variable = 300 * $2/M + 3000 * $10/M = 0.0006 + 0.03 = 0.0306
    // high = (3 * 0.008 + 0.0306) / 2 = 0.0273
    // low = (0.008 + 2 * 0.0004 + 0.0306) / 2 = 0.0197
    expect(e.highUsd).toBeCloseTo(0.0273, 4);
    expect(e.lowUsd).toBeCloseTo(0.0197, 4);
  });

  it("is zero for no requests and null for an unknown model", () => {
    const e = estimateBatchCost({ model: "claude-sonnet-5-5", systemPrompt: SYSTEM_PROMPT, userPrompts: [] })!;
    expect(e.highUsd).toBe(0);
    expect(e.lowUsd).toBe(0);
    expect(estimateBatchCost({ model: "mystery-model", systemPrompt: "x", userPrompts: ["y"] })).toBeNull();
  });

  it("formats dollars", () => {
    expect(formatUsd(0)).toBe("$0.00");
    expect(formatUsd(0.004)).toBe("under $0.01");
    expect(formatUsd(1.236)).toBe("$1.24");
  });
});

describe("selection", () => {
  it("requires a roadmap or node to regenerate, and not both", () => {
    expect(selectionError({})).toBeNull();
    expect(selectionError({ roadmapSlug: "data-analyst" })).toBeNull();
    expect(selectionError({ regenerate: true })).toMatch(/deliberate/);
    expect(selectionError({ roadmapSlug: "x", nodeId: NODE_ID })).toMatch(/not both/);
    expect(selectionError({ nodeId: NODE_ID, regenerate: true })).toBeNull();
  });
});

/**
 * A tiny in memory stand in for the supabase-js query builder, covering only
 * the calls writeGenerated makes.
 */
function fakeDb(existing: { id: string; content_version: number; generated_at: string } | null) {
  const writes: { table: string; op: string; values: unknown }[] = [];
  const db = {
    from(table: string) {
      const builder = {
        select: () => builder,
        eq: () => builder,
        maybeSingle: async () => ({ data: table === "node_content" ? existing : null, error: null }),
        single: async () => ({ data: { id: "quiz-1" }, error: null }),
        upsert(values: unknown) {
          writes.push({ table, op: "upsert", values });
          return Object.assign(Promise.resolve({ error: null }), builder);
        },
        insert(values: unknown) {
          writes.push({ table, op: "insert", values });
          return Promise.resolve({ error: null });
        },
        update(values: unknown) {
          writes.push({ table, op: "update", values });
          return { eq: async () => ({ error: null }) };
        },
      };
      return builder;
    },
  };
  return { db: db as unknown as AdminDb, writes };
}

describe("writing results", () => {
  const parsed = parseGeneratedContent(valid());
  if (!parsed.ok) throw new Error("expected valid");
  const content = parsed.content;

  it("inserts version 1 with the quiz and answer key", async () => {
    const { db, writes } = fakeDb(null);
    expect(await writeGenerated(db, NODE_ID, content, "2026-10-25T10:00:00Z")).toBe("written");
    expect(writes.map((w) => `${w.table}:${w.op}`)).toEqual([
      "node_quiz:upsert",
      "node_quiz_answers:upsert",
      "node_content:insert",
    ]);
    expect(writes[1].values).toEqual({ quiz_id: "quiz-1", answer_key: { q1: 1, q2: 2, q3: 0 } });
    expect(writes[2].values).toMatchObject({ node_id: NODE_ID, content_version: 1 });
  });

  it("bumps content_version when regenerating", async () => {
    const { db, writes } = fakeDb({ id: "c1", content_version: 3, generated_at: "2026-10-01T00:00:00Z" });
    expect(await writeGenerated(db, NODE_ID, content, "2026-10-25T10:00:00Z")).toBe("written");
    expect(writes[2]).toMatchObject({ table: "node_content", op: "update", values: { content_version: 4 } });
  });

  it("skips results already collected from the same batch", async () => {
    const { db, writes } = fakeDb({ id: "c1", content_version: 1, generated_at: "2026-10-25T11:00:00Z" });
    expect(await writeGenerated(db, NODE_ID, content, "2026-10-25T10:00:00Z")).toBe("already_collected");
    expect(writes).toHaveLength(0);
  });
});

describe("collecting a batch", () => {
  const counts = { processing: 0, succeeded: 1, errored: 1, canceled: 0, expired: 0 };

  function client(status: "in_progress" | "ended", lines: Line[]): BatchClient {
    return {
      messages: {
        batches: {
          create: async () => {
            throw new Error("not used");
          },
          retrieve: async () => ({ processing_status: status, request_counts: counts, created_at: "2026-10-25T10:00:00Z" }),
          results: async () =>
            (async function* () {
              yield* lines;
            })(),
        },
      },
    } as unknown as BatchClient;
  }

  it("does nothing while the batch is processing", async () => {
    const { db, writes } = fakeDb(null);
    const s = await collectRun(db, client("in_progress", []), "msgbatch_1");
    expect(s.status).toBe("in_progress");
    expect(writes).toHaveLength(0);
  });

  it("writes valid results and reports malformed ones without writing them", async () => {
    const { db, writes } = fakeDb(null);
    const bad = { ...succeeded('{"explanation_md": 1}'), custom_id: "3c1e7d2f-9e4b-4a6c-8d8e-2b3c4d5e6f70" };
    const s = await collectRun(db, client("ended", [succeeded(JSON.stringify(valid())), bad]), "msgbatch_1");
    expect(s.status).toBe("ended");
    if (s.status !== "ended") return;
    expect(s.written).toBe(1);
    expect(s.failed).toHaveLength(1);
    expect(s.failed[0].nodeId).toBe("3c1e7d2f-9e4b-4a6c-8d8e-2b3c4d5e6f70");
    expect(writes.filter((w) => w.table === "node_content")).toHaveLength(1);
  });
});

describe("parseGeneratedContent: lesson anatomy (#255)", () => {
  const base = {
    explanation_md: "Why it matters. ".repeat(40),
    practice_task_md: "**Goal:** a stock list for a Tamale shop. ".repeat(4),
    quiz: {
      pass_threshold: 75,
      questions: Array.from({ length: 4 }, (_, i) => ({
        prompt: `Question ${i + 1}?`,
        options: ["One", "Two", "Three", "Four"],
        answer_index: i % 4,
        explanation: "Because the lesson says so.",
      })),
    },
  };

  it("accepts a lesson without any anatomy (the 742 existing lessons)", () => {
    const result = parseGeneratedContent(base);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.content.outcomes).toBeUndefined();
  });

  it("accepts and keeps every anatomy field", () => {
    const result = parseGeneratedContent({
      ...base,
      outcomes: ["Sort a stock list", "Total a column", "Share a sheet"],
      workedExample_md: "Hawa lists her stock.",
      keyTerms: [{ term: "Cell", definition: "One box in a sheet." }],
      commonMistakes: ["Typing totals by hand"],
      selfCheck: ["Can you total a column?"],
    });
    expect(result.ok ? [] : result.errors).toEqual([]);
    if (result.ok) {
      expect(result.content.outcomes).toHaveLength(3);
      expect(result.content.keyTerms).toEqual([{ term: "Cell", definition: "One box in a sheet." }]);
    }
  });

  it("rejects outcomes of the wrong size, length or shape, and dashes", () => {
    const errors = (extra: object) => {
      const r = parseGeneratedContent({ ...base, ...extra });
      return r.ok ? [] : r.errors;
    };
    expect(errors({ outcomes: ["One", "Two"] }).join()).toMatch(/3 to 4 items/);
    expect(errors({ outcomes: ["a", "b", "c", "d", "e"] }).join()).toMatch(/3 to 4 items/);
    expect(errors({ outcomes: ["a", "b", "x".repeat(121)] }).join()).toMatch(/longer than 120/);
    expect(errors({ outcomes: "Sort a list" }).join()).toMatch(/list of non empty strings/);
    expect(errors({ outcomes: ["Sort a list — fast", "b", "c"] }).join()).toMatch(/em or en dash/);
    expect(errors({ keyTerms: [{ term: "Cell" }] }).join()).toMatch(/term and definition/);
    expect(errors({ keyTerms: [] }).join()).toMatch(/non empty list/);
    expect(errors({ workedExample_md: "" }).join()).toMatch(/workedExample_md/);
    expect(errors({ commonMistakes: [""] }).join()).toMatch(/commonMistakes/);
  });
});
