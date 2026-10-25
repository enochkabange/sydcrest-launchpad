/**
 * Pre generate node content with the Anthropic Message Batches API.
 *
 *   pnpm tsx scripts/generate-node-content.ts --dry-run [--roadmap <slug> | --node <id>] [--regenerate]
 *   pnpm tsx scripts/generate-node-content.ts --submit  [--roadmap <slug> | --node <id>] [--regenerate]
 *   pnpm tsx scripts/generate-node-content.ts --collect <batch_id>
 *
 * Without --roadmap or --node it covers every node that has no content yet.
 * --regenerate (only with --roadmap or --node) includes nodes that already
 * have content; their content_version goes up by one when collected.
 * --model <id> overrides CONTENT_MODEL (default claude-sonnet-5-5).
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY (read from
 * .env.local if present). --submit and --collect also need ANTHROPIC_API_KEY.
 */
import { parseArgs } from "node:util";
import { formatUsd } from "../src/lib/content-generation/cost";
import { createAdminDb, selectionError, type Selection } from "../src/lib/content-generation/db";
import { collectRun, createAnthropic, planRun, submitRun } from "../src/lib/content-generation/run";

const POLL_MS = 60_000;

function loadEnv() {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    // No .env.local: rely on the environment.
  }
}

function fail(message: string, code = 1): never {
  console.error(message);
  process.exit(code);
}

async function main() {
  loadEnv();
  const { values } = parseArgs({
    options: {
      roadmap: { type: "string" },
      node: { type: "string" },
      regenerate: { type: "boolean", default: false },
      "dry-run": { type: "boolean", default: false },
      submit: { type: "boolean", default: false },
      collect: { type: "string" },
      model: { type: "string" },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  const modes = [values["dry-run"], values.submit, values.collect !== undefined].filter(Boolean).length;
  if (values.help || modes !== 1) {
    fail(
      "Usage: pnpm tsx scripts/generate-node-content.ts (--dry-run | --submit | --collect <batch_id>) [--roadmap <slug> | --node <id>] [--regenerate] [--model <id>]",
      values.help ? 0 : 1,
    );
  }

  const db = createAdminDb();
  if (!db) fail("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY to read and write content.");

  if (values.collect !== undefined) {
    const client = createAnthropic();
    if (!client) fail("ANTHROPIC_API_KEY is not set; nothing to collect.", 3);
    for (;;) {
      const summary = await collectRun(db, client, values.collect);
      if (summary.status === "in_progress") {
        const c = summary.counts;
        console.log(`Batch still processing (${c.processing} left). Checking again in a minute.`);
        await new Promise((r) => setTimeout(r, POLL_MS));
        continue;
      }
      console.log(`Written: ${summary.written}. Already collected: ${summary.alreadyCollected}. Failed: ${summary.failed.length}.`);
      for (const f of summary.failed) console.log(`  ${f.nodeId ?? f.customId}: ${f.errors.join("; ")}`);
      if (summary.failed.length) console.log("Regenerate failed nodes one at a time with --submit --node <id> --regenerate.");
      return;
    }
  }

  const sel: Selection = { roadmapSlug: values.roadmap, nodeId: values.node, regenerate: values.regenerate };
  const problem = selectionError(sel);
  if (problem) fail(problem);

  const plan = await planRun(db, sel, values.model);
  console.log(`Nodes to generate: ${plan.count} (model ${plan.model}).`);
  if (plan.estimate) {
    const e = plan.estimate;
    console.log(
      `Estimated cost at batch rates: ${formatUsd(e.lowUsd)} to ${formatUsd(e.highUsd)} ` +
        `(about ${e.userTokens + e.systemTokens * e.requests} input and ${e.outputTokens} output tokens before caching).`,
    );
  } else {
    console.log(`No price table for ${plan.model}; cost not estimated.`);
  }
  if (plan.count === 0) return;
  if (values["dry-run"]) {
    for (const t of plan.nodeTitles.slice(0, 20)) console.log(`  ${t}`);
    if (plan.count > 20) console.log(`  and ${plan.count - 20} more`);
    return;
  }

  const client = createAnthropic();
  if (!client) fail("ANTHROPIC_API_KEY is not set; not submitting.", 3);
  const submitted = await submitRun(db, client, sel, values.model);
  if (!submitted) return console.log("Nothing to submit.");
  console.log(`Submitted batch ${submitted.batchId} with ${submitted.count} requests.`);
  console.log(`Collect it with: pnpm tsx scripts/generate-node-content.ts --collect ${submitted.batchId}`);
}

main().catch((e) => fail(e instanceof Error ? e.message : String(e)));
