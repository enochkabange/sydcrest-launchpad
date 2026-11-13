import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { buildExport, type DataExport, type ExportSection } from "./export";

type Client = SupabaseClient<Database>;
type Result = PromiseLike<{ data: unknown; error: { code?: string; message: string } | null }>;

/**
 * Reads the signed in member's own rows for "Download my data", through
 * their own session: RLS returns only their rows, so nothing here can leak
 * someone else's data. Each section is filtered by profile_id as well, which
 * also matters for admins (RLS lets them read everyone). A section that
 * fails is left out and named in the file's `missing` list.
 */
export async function collectMyData(supabase: Client, account: { id: string; email: string | null }, now = new Date()): Promise<DataExport> {
  const id = account.id;
  const queries: Record<ExportSection, () => Result> = {
    profile: () =>
      supabase
        .from("profiles")
        .select("id, display_name, region, phone, avatar_url, role, public_slug, is_public, headline, skills, goals, milestone_posts, display_prefs, suspended_at, created_at, updated_at")
        .eq("id", id),
    about_you: () => supabase.from("learner_profiles").select("*").eq("profile_id", id),
    learner_attributes: () => supabase.from("learner_attributes").select("*").eq("profile_id", id),
    first_touch: () => supabase.from("profile_first_touch").select("*").eq("profile_id", id),
    progress: () =>
      supabase
        .from("roadmap_progress")
        .select("status, quiz_score, verified_at, completed_at, created_at, updated_at, roadmap_nodes(slug, title, roadmaps(slug, title))")
        .eq("profile_id", id)
        .order("created_at"),
    // Metadata only: the work and any files stay in the account.
    submissions: () =>
      supabase
        .from("submissions")
        .select("id, program_id, program_week_id, cohort_id, attempt, status, submitted_at, graded_at, final_score, ai_score, in_portfolio, link_url, created_at, updated_at")
        .eq("profile_id", id)
        .order("created_at"),
    certificates: () =>
      supabase
        .from("certificates")
        .select("verification_id, recipient_name, program_title, specialization_label, issued_at, revoked_at, revocation_reason")
        .eq("profile_id", id)
        .order("issued_at"),
    verified_skills: () =>
      supabase.from("verified_skills").select("source, source_ref, issued_at, revoked_at, revocation_reason, skills(slug, name)").eq("profile_id", id),
    external_credentials: () =>
      supabase
        .from("external_credentials")
        .select("title, issuer_name, issued_on, expires_on, credential_id, verification_url, source, visibility, verification, verified_at, created_at")
        .eq("profile_id", id),
    programme_applications: () =>
      supabase
        .from("cohort_applications")
        .select("program_id, cohort_id, preferred_cohort_id, specialization, status, screening_answers, decided_at, created_at, updated_at")
        .eq("profile_id", id),
    cohort_memberships: () =>
      supabase.from("cohort_members").select("cohort_id, role, specialization, status, completed_at, deferred_at, created_at").eq("profile_id", id),
    chapter_memberships: () => supabase.from("chapter_members").select("role, joined_at, chapters(slug, name)").eq("profile_id", id),
    opportunity_applications: () =>
      supabase
        .from("opportunity_applications")
        .select("opportunity_id, stage, stage_changed_at, note, portfolio_url, contact_consent, created_at")
        .eq("profile_id", id),
    outcomes: () =>
      supabase
        .from("outcomes")
        .select("type, title, organisation_name, started_on, evidence_url, evidence_note, show_on_profile, verification_status, verified_at, created_at")
        .eq("profile_id", id),
    consents: () => supabase.from("consents").select("kind, version, granted_at, revoked_at").eq("profile_id", id).order("granted_at"),
    deletion_requests: () =>
      supabase.from("deletion_requests").select("status, requested_at, delete_after, cancelled_at").eq("profile_id", id).order("requested_at"),
  };

  const keys = Object.keys(queries) as ExportSection[];
  const results = await Promise.all(keys.map((k) => Promise.resolve(queries[k]()).catch((cause: unknown) => ({ data: null, error: { code: "thrown", message: String(cause) } }))));
  const sections: Partial<Record<ExportSection, unknown[] | null>> = {};
  keys.forEach((k, i) => {
    const { data, error } = results[i];
    if (error) {
      console.error("[data-rights] export section failed", { section: k, code: error.code, message: error.message });
      return;
    }
    sections[k] = Array.isArray(data) ? data : data == null ? [] : [data];
  });
  return buildExport({ generatedAt: now, account, sections });
}
