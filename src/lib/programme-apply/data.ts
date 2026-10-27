import "server-only";
import { createClient } from "@/lib/supabase/server";
import { parseScreeningQuestions, parseSpecializations } from "./screening";

type Client = Awaited<ReturnType<typeof createClient>>;

/** A published programme (admins also see drafts) with its JSON fields parsed. Null when missing. */
export async function loadProgramme(supabase: Client, slug: string) {
  const { data, error } = await supabase
    .from("programs")
    .select(
      "id, slug, title, summary, duration_weeks, eligibility, certification_summary, specializations, screening_questions, is_published",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`Could not load the programme: ${error.message}`);
  if (!data) return null;
  return {
    ...data,
    questions: parseScreeningQuestions(data.screening_questions),
    specializations: parseSpecializations(data.specializations),
  };
}

export type Programme = NonNullable<Awaited<ReturnType<typeof loadProgramme>>>;

/** Cohorts an applicant can ask for: planned or enrolling, soonest first. */
export async function loadUpcomingCohorts(supabase: Client, programId: string) {
  const { data, error } = await supabase
    .from("cohorts")
    .select("id, name, starts_on, status")
    .eq("program_id", programId)
    .in("status", ["planned", "enrolling"])
    .order("starts_on");
  if (error) throw new Error(`Could not load cohorts: ${error.message}`);
  return data ?? [];
}

/** "12 January 2027", from a date column, in Ghana time. */
export function formatDay(isoDate: string) {
  // Date columns arrive as YYYY-MM-DD; noon UTC keeps the day whatever the zone.
  const d = /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? new Date(`${isoDate}T12:00:00Z`) : new Date(isoDate);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Africa/Accra" }).format(d);
}
