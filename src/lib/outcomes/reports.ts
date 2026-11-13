import "server-only";
import type { createClient } from "@/lib/supabase/server";
import { shapeReport, type CheckinMonths } from "./checkins";

type Client = Awaited<ReturnType<typeof createClient>>;

export const REPORT_SCOPES = ["programme", "cohort", "chapter"] as const;
export type ReportScope = (typeof REPORT_SCOPES)[number];

export function isReportScope(value: unknown): value is ReportScope {
  return REPORT_SCOPES.includes(value as ReportScope);
}

/** A sponsor's report (counts under five held back). Null when the caller may not see it. */
export async function sponsorReport(supabase: Client, sponsorshipId: string, months: CheckinMonths) {
  const [report, stories] = await Promise.all([
    supabase.rpc("sponsorship_outcome_report", { p_sponsorship_id: sponsorshipId, p_months: months }),
    supabase.rpc("sponsorship_stories", { p_sponsorship_id: sponsorshipId }),
  ]);
  if (report.error) throw new Error(`Could not load the report: ${report.error.message}`);
  if (!report.data.length) return null;
  return { report: shapeReport(report.data), stories: stories.data ?? [] };
}

/** An admin's report for any programme, cohort or chapter (raw counts). */
export async function adminReport(supabase: Client, scope: ReportScope, id: string, months: CheckinMonths) {
  const [report, stories] = await Promise.all([
    supabase.rpc("admin_outcome_report", { p_scope: scope, p_id: id, p_months: months }),
    supabase.rpc("admin_outcome_stories", { p_scope: scope, p_id: id }),
  ]);
  if (report.error) throw new Error(`Could not load the report: ${report.error.message}`);
  return { report: shapeReport(report.data), stories: stories.data ?? [] };
}

/** The name of a programme, cohort or chapter, for report headings. */
export async function scopeName(supabase: Client, scope: ReportScope, id: string) {
  if (scope === "chapter") return (await supabase.from("chapters").select("name").eq("id", id).maybeSingle()).data?.name ?? null;
  if (scope === "programme") return (await supabase.from("programs").select("title").eq("id", id).maybeSingle()).data?.title ?? null;
  const { data } = await supabase.from("cohorts").select("name, programs(title)").eq("id", id).maybeSingle();
  return data ? `${data.programs?.title ?? "Programme"}, ${data.name}` : null;
}
