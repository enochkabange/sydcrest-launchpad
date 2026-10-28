"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { OPPORTUNITY_REPORT_REASONS } from "./model";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";

/**
 * A learner's private saved and applied markers. Each action re-checks the
 * session; RLS lets a learner touch only their own rows, and the database
 * stamps applied_at. The opportunity id is untrusted and only used as a value.
 */

export type SaveActionState = { error?: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function learner(form: FormData) {
  const user = await getCurrentUser();
  const id = form.get("opportunity_id");
  if (!user) {
    const back = form.get("back");
    redirect(`/login${typeof back === "string" && back.startsWith("/") ? `?next=${encodeURIComponent(back)}` : ""}`);
  }
  if (!user.hasAgeAndConsent) redirect("/welcome");
  if (typeof id !== "string" || !UUID.test(id)) return null;
  return { user, id, supabase: await createClient() };
}

/** Save (status saved), mark applied (status applied) or go back to saved. */
export async function setOpportunityStatus(_prev: SaveActionState, form: FormData): Promise<SaveActionState> {
  const ctx = await learner(form);
  if (!ctx) return { error: "We couldn't find that opportunity." };
  const status = form.get("status") === "applied" ? "applied" : "saved";
  // Not an upsert: learners may update only `status`, and an upsert would set every column.
  const update = () =>
    ctx.supabase.from("opportunity_saves").update({ status }).eq("profile_id", ctx.user.id).eq("opportunity_id", ctx.id).select("status");
  let { data, error } = await update();
  if (!error && !data?.length) {
    ({ error } = await ctx.supabase.from("opportunity_saves").insert({ profile_id: ctx.user.id, opportunity_id: ctx.id, status }));
    // Saved in another tab a moment ago: change that row instead.
    if (error?.code === "23505") ({ data, error } = await update());
  }
  if (error) {
    console.error("setOpportunityStatus failed", { code: error.code, message: error.message });
    return { error: "We couldn't save that. Try again." };
  }
  refresh();
  return {};
}

/** Remove the marker entirely. */
export async function removeOpportunitySave(_prev: SaveActionState, form: FormData): Promise<SaveActionState> {
  const ctx = await learner(form);
  if (!ctx) return { error: "We couldn't find that opportunity." };
  const { error } = await ctx.supabase.from("opportunity_saves").delete().eq("profile_id", ctx.user.id).eq("opportunity_id", ctx.id);
  if (error) {
    console.error("removeOpportunitySave failed", { code: error.code, message: error.message });
    return { error: "We couldn't remove that. Try again." };
  }
  refresh();
  return {};
}

export type ReportState = { done?: boolean; error?: string };

/** A signed in learner flags a post for the admin reports queue. */
export async function reportOpportunity(_prev: ReportState, form: FormData): Promise<ReportState> {
  const ctx = await learner(form);
  if (!ctx) return { error: "We couldn't find that opportunity." };
  const reason = String(form.get("reason") ?? "");
  const details = String(form.get("details") ?? "").trim();
  if (!OPPORTUNITY_REPORT_REASONS.includes(reason as (typeof OPPORTUNITY_REPORT_REASONS)[number])) return { error: "Choose a reason." };
  if (details.length > 900) return { error: "Keep the details under 900 characters." };
  // Insert only: reporters cannot read reports back, so no .select().
  const { error } = await ctx.supabase.from("reports").insert({
    reporter_id: ctx.user.id,
    target_type: "opportunity",
    target_id: ctx.id,
    reason: details ? `${reason}: ${details}` : reason,
  });
  if (error) {
    console.error("reportOpportunity failed", { code: error.code, message: error.message });
    return { error: isRateLimited(error) ? RATE_LIMIT_MESSAGE : "We couldn't send your report. Try again." };
  }
  return { done: true };
}
