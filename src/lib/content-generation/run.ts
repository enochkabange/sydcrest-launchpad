import Anthropic from "@anthropic-ai/sdk";
import { contentModel } from "./config";
import { estimateBatchCost, type CostEstimate } from "./cost";
import { loadTargets, writeGenerated, type AdminDb, type Selection } from "./db";
import { buildUserPrompt, SYSTEM_PROMPT } from "./prompt";
import { buildBatchRequest, interpretResult } from "./requests";

/** The Anthropic client, or null when ANTHROPIC_API_KEY is not set. */
export function createAnthropic(env: NodeJS.ProcessEnv = process.env): Anthropic | null {
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey });
}

/** The part of the SDK this module uses; lets tests pass a fake. */
export type BatchClient = {
  messages: {
    batches: Pick<Anthropic["messages"]["batches"], "create" | "retrieve" | "results">;
  };
};

export type Plan = { count: number; nodeTitles: string[]; estimate: CostEstimate | null; model: string };

export async function planRun(db: AdminDb, sel: Selection, modelOverride?: string | null): Promise<Plan> {
  const model = contentModel(modelOverride);
  const targets = await loadTargets(db, sel);
  const estimate = estimateBatchCost({
    model,
    systemPrompt: SYSTEM_PROMPT,
    userPrompts: targets.map(buildUserPrompt),
  });
  return { count: targets.length, nodeTitles: targets.map((t) => t.nodeTitle), estimate, model };
}

export type Submitted = { batchId: string; count: number; estimate: CostEstimate | null; model: string };

export async function submitRun(
  db: AdminDb,
  client: BatchClient,
  sel: Selection,
  modelOverride?: string | null,
): Promise<Submitted | null> {
  const model = contentModel(modelOverride);
  const targets = await loadTargets(db, sel);
  if (!targets.length) return null;
  const estimate = estimateBatchCost({ model, systemPrompt: SYSTEM_PROMPT, userPrompts: targets.map(buildUserPrompt) });
  const batch = await client.messages.batches.create({ requests: targets.map((t) => buildBatchRequest(t, model)) });
  return { batchId: batch.id, count: targets.length, estimate, model };
}

export type BatchCounts = Anthropic.Messages.MessageBatchRequestCounts;

export type CollectSummary =
  | { status: "in_progress"; counts: BatchCounts }
  | {
      status: "ended";
      counts: BatchCounts;
      written: number;
      alreadyCollected: number;
      failed: { nodeId: string | null; customId: string; errors: string[] }[];
    };

/**
 * Checks a batch once. When it has ended, validates every result and stores
 * the good ones; anything malformed is reported per node and nothing is
 * written for it.
 */
export async function collectRun(db: AdminDb, client: BatchClient, batchId: string): Promise<CollectSummary> {
  const batch = await client.messages.batches.retrieve(batchId);
  if (batch.processing_status !== "ended") return { status: "in_progress", counts: batch.request_counts };

  const summary = {
    status: "ended" as const,
    counts: batch.request_counts,
    written: 0,
    alreadyCollected: 0,
    failed: [] as { nodeId: string | null; customId: string; errors: string[] }[],
  };
  for await (const line of await client.messages.batches.results(batchId)) {
    const outcome = interpretResult(line);
    if (!outcome.ok) {
      summary.failed.push({ nodeId: outcome.nodeId, customId: outcome.customId, errors: outcome.errors });
      continue;
    }
    try {
      const result = await writeGenerated(db, outcome.nodeId!, outcome.content, batch.created_at);
      if (result === "written") summary.written++;
      else summary.alreadyCollected++;
    } catch (e) {
      summary.failed.push({
        nodeId: outcome.nodeId,
        customId: outcome.customId,
        errors: [e instanceof Error ? e.message : String(e)],
      });
    }
  }
  return summary;
}
