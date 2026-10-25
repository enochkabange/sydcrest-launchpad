"use server";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatUsd } from "@/lib/content-generation/cost";
import { selectionError } from "@/lib/content-generation/db";
import {
  collectRun,
  createAdminDb,
  createAnthropic,
  planRun,
  submitRun,
  type Selection,
} from "@/lib/content-generation/server";

export type ContentActionState = {
  status?: 200 | 400 | 403 | 500 | 503;
  message?: string;
  details?: string[];
};

const NO_KEY: ContentActionState = {
  status: 503,
  message: "AI generation is not set up yet. Add ANTHROPIC_API_KEY to the server environment, then try again.",
};
const NO_DB: ContentActionState = {
  status: 503,
  message: "Content writes are not set up yet. Add SUPABASE_SECRET_KEY to the server environment.",
};

/** Every action re-checks the caller; the page check alone is not enough. */
async function isAdmin(): Promise<boolean> {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return data?.role === "admin";
}

const FORBIDDEN: ContentActionState = { status: 403, message: "Only admins can generate content." };

function readSelection(form: FormData): Selection {
  const roadmapSlug = String(form.get("roadmap") ?? "").trim() || null;
  const nodeId = String(form.get("node") ?? "").trim() || null;
  return { roadmapSlug, nodeId, regenerate: form.get("regenerate") === "on" };
}

function describeError(e: unknown): ContentActionState {
  return { status: 500, message: e instanceof Error ? e.message : "Something went wrong. Try again." };
}

export async function estimateContent(_prev: ContentActionState, form: FormData): Promise<ContentActionState> {
  if (!(await isAdmin())) return FORBIDDEN;
  const sel = readSelection(form);
  const problem = selectionError(sel);
  if (problem) return { status: 400, message: problem };
  // Estimating only reads, which an admin's own session may do under RLS, so
  // it works before the secret key is configured.
  const db = createAdminDb() ?? (await createClient());
  try {
    const plan = await planRun(db, sel);
    if (!plan.count) return { status: 200, message: "Every node in this selection already has content." };
    const cost = plan.estimate
      ? `Estimated cost at batch rates: ${formatUsd(plan.estimate.lowUsd)} to ${formatUsd(plan.estimate.highUsd)}.`
      : `No price table for ${plan.model}, so no estimate.`;
    return {
      status: 200,
      message: `${plan.count} ${plan.count === 1 ? "node" : "nodes"} to generate with ${plan.model}. ${cost}`,
      details: plan.nodeTitles.slice(0, 30),
    };
  } catch (e) {
    return describeError(e);
  }
}

export async function submitContent(_prev: ContentActionState, form: FormData): Promise<ContentActionState> {
  if (!(await isAdmin())) return FORBIDDEN;
  const sel = readSelection(form);
  const problem = selectionError(sel);
  if (problem) return { status: 400, message: problem };
  const client = createAnthropic();
  if (!client) return NO_KEY;
  const db = createAdminDb();
  if (!db) return NO_DB;
  try {
    const submitted = await submitRun(db, client, sel);
    if (!submitted) return { status: 200, message: "Nothing to submit: every node in this selection has content." };
    return {
      status: 200,
      message: `Submitted batch ${submitted.batchId} with ${submitted.count} requests. Batches usually finish within an hour; collect it below.`,
    };
  } catch (e) {
    return describeError(e);
  }
}

export async function collectContent(_prev: ContentActionState, form: FormData): Promise<ContentActionState> {
  if (!(await isAdmin())) return FORBIDDEN;
  const batchId = String(form.get("batch_id_typed") ?? "").trim() || String(form.get("batch_id") ?? "").trim();
  if (!/^[A-Za-z0-9_]{1,128}$/.test(batchId)) return { status: 400, message: "Choose or paste a batch id." };
  const client = createAnthropic();
  if (!client) return NO_KEY;
  const db = createAdminDb();
  if (!db) return NO_DB;
  try {
    const summary = await collectRun(db, client, batchId);
    if (summary.status === "in_progress") {
      return { status: 200, message: `Still processing: ${summary.counts.processing} requests left. Check again later.` };
    }
    return {
      status: 200,
      message: `Saved ${summary.written}. Already saved earlier: ${summary.alreadyCollected}. Failed: ${summary.failed.length}.`,
      details: summary.failed.map((f) => `${f.nodeId ?? f.customId}: ${f.errors.join("; ")}`),
    };
  } catch (e) {
    return describeError(e);
  }
}
