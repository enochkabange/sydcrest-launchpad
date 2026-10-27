import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import { getMyProfile, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ProgramWeek, SubmissionStatus } from "./progress";

/**
 * Reads for the mentor console (issue #146). Every query runs as the signed
 * in user, so RLS decides what comes back: staff see their cohorts, admins
 * see every cohort. Names come only through the cohort_roster view.
 * Reads the session, so callers sit inside <Suspense>.
 */

export type ConsoleProgram = {
  id: string;
  slug: string;
  title: string;
  grace_days: number;
  pass_score: number;
  min_peer_reviews: number;
  specializations: { slug: string; label: string }[];
};

export type ConsoleCohort = {
  id: string;
  name: string;
  starts_on: string;
  max_size: number;
  status: string;
  program: ConsoleProgram;
  /** The caller's role here; null for an admin who is not on the staff. */
  myRole: "mentor" | "coordinator" | null;
};

const COHORT_SELECT =
  "id, name, starts_on, max_size, status, programs!inner(id, slug, title, grace_days, pass_score, min_peer_reviews, specializations)";

type CohortRow = {
  id: string;
  name: string;
  starts_on: string;
  max_size: number;
  status: string;
  programs: Omit<ConsoleProgram, "specializations"> & { specializations: unknown };
};

function specializationsOf(json: unknown): { slug: string; label: string }[] {
  if (!Array.isArray(json)) return [];
  return json.flatMap((s) =>
    s && typeof s === "object" && typeof s.slug === "string" && typeof s.label === "string" ? [{ slug: s.slug, label: s.label }] : [],
  );
}

function toCohort(row: CohortRow, myRole: ConsoleCohort["myRole"]): ConsoleCohort {
  const { programs, ...rest } = row;
  return { ...rest, myRole, program: { ...programs, specializations: specializationsOf(programs.specializations) } };
}

/**
 * The cohorts the caller mentors or coordinates (admins: every cohort, with
 * their own staff role where they have one). Anyone else gets a 404, so the
 * console stays unlisted, as the admin area does.
 */
export const requireStaff = cache(async () => {
  const user = await requireUser();
  const profile = await getMyProfile();
  const isAdmin = profile.role === "admin";
  const supabase = await createClient();

  const { data: mine, error } = await supabase
    .from("cohort_members")
    .select(`role, cohorts!cohort_members_cohort_id_fkey!inner(${COHORT_SELECT})`)
    .eq("profile_id", user.id)
    .in("role", ["mentor", "coordinator"]);
  if (error) throw new Error(`Could not load your cohorts: ${error.message}`);

  const roles = new Map<string, ConsoleCohort["myRole"]>();
  const cohorts: ConsoleCohort[] = [];
  for (const m of mine ?? []) {
    const c = m.cohorts as unknown as CohortRow;
    roles.set(c.id, m.role as ConsoleCohort["myRole"]);
    cohorts.push(toCohort(c, m.role as ConsoleCohort["myRole"]));
  }

  if (isAdmin) {
    const { data: all, error: allError } = await supabase.from("cohorts").select(COHORT_SELECT);
    if (allError) throw new Error(`Could not load cohorts: ${allError.message}`);
    for (const c of (all ?? []) as unknown as CohortRow[]) {
      if (!roles.has(c.id)) cohorts.push(toCohort(c, null));
    }
  }

  if (!cohorts.length && !isAdmin) notFound();
  // Running and enrolling cohorts first, then by start date, newest first.
  const rank = (s: string) => (s === "running" ? 0 : s === "enrolling" ? 1 : s === "planned" ? 2 : 3);
  cohorts.sort((a, b) => rank(a.status) - rank(b.status) || b.starts_on.localeCompare(a.starts_on));
  return { userId: user.id, isAdmin, cohorts, supabase };
});

export type RosterRow = {
  member_id: string;
  cohort_id: string;
  profile_id: string;
  display_name: string | null;
  avatar_url: string | null;
  public_slug: string | null;
  role: string;
  specialization: string | null;
  status: string;
  deferred_to: string | null;
};

export type ConsoleSubmission = {
  id: string;
  profile_id: string;
  program_week_id: string;
  cohort_id: string;
  status: SubmissionStatus;
  attempt: number;
  final_score: number | null;
  ai_score: number | null;
  submitted_at: string | null;
};

export type ConsoleWeek = ProgramWeek & { assignment: string | null };

/** Roster, weeks, sent work and capstone peer reviews for one cohort. */
export async function loadCohort(cohort: ConsoleCohort) {
  const supabase = await createClient();
  const [roster, weeks] = await Promise.all([
    supabase.from("cohort_roster").select("*").eq("cohort_id", cohort.id),
    supabase
      .from("program_weeks")
      .select("id, week_number, specialization, theme, is_capstone, assignment")
      .eq("program_id", cohort.program.id)
      .order("week_number"),
  ]);
  if (roster.error) throw new Error(`Could not load the roster: ${roster.error.message}`);
  if (weeks.error) throw new Error(`Could not load the weeks: ${weeks.error.message}`);

  const members = (roster.data ?? []) as RosterRow[];
  const learners = members.filter((m) => m.role === "learner");
  const learnerIds = learners.map((m) => m.profile_id);

  // Progress follows the learner across a deferral: all their sent work in
  // this programme. The review queue below filters on this cohort only.
  let submissions: ConsoleSubmission[] = [];
  if (learnerIds.length) {
    const { data, error } = await supabase
      .from("submissions")
      .select("id, profile_id, program_week_id, cohort_id, status, attempt, final_score, ai_score, submitted_at")
      .eq("program_id", cohort.program.id)
      .in("profile_id", learnerIds)
      .neq("status", "draft");
    if (error) throw new Error(`Could not load submissions: ${error.message}`);
    submissions = (data ?? []) as ConsoleSubmission[];
  }

  const capstoneIds = new Set((weeks.data ?? []).filter((w) => w.is_capstone).map((w) => w.id));
  const capstoneSubs = submissions.filter((s) => capstoneIds.has(s.program_week_id));
  let reviews: { id: string; submission_id: string; reviewer_id: string; status: string }[] = [];
  if (capstoneSubs.length) {
    const { data, error } = await supabase
      .from("peer_reviews")
      .select("id, submission_id, reviewer_id, status")
      .in(
        "submission_id",
        capstoneSubs.map((s) => s.id),
      );
    if (error) throw new Error(`Could not load peer reviews: ${error.message}`);
    reviews = data ?? [];
  }

  return {
    members,
    learners,
    staff: members.filter((m) => m.role !== "learner"),
    weeks: (weeks.data ?? []) as ConsoleWeek[],
    submissions,
    queue: submissions
      .filter((s) => s.cohort_id === cohort.id && (s.status === "submitted" || s.status === "ai_reviewed"))
      .sort((a, b) => (a.submitted_at ?? "").localeCompare(b.submitted_at ?? "")),
    reviews,
  };
}

/** Picks the cohort named in ?cohort= when the caller may see it, else the first. */
export function pickCohort(cohorts: ConsoleCohort[], wanted: string | string[] | undefined) {
  const id = Array.isArray(wanted) ? wanted[0] : wanted;
  return cohorts.find((c) => c.id === id) ?? cohorts[0] ?? null;
}

export function nameOf(row: { display_name: string | null } | undefined) {
  return row?.display_name?.trim() || "Unnamed learner";
}

export const shortDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso),
  );
