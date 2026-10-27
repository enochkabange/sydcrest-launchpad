import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { SIGNED_URL_SECONDS, SUBMISSIONS_BUCKET } from "./config";
import { readAiFeedback, type AiFeedback, type Rubric } from "./feedback";
import { loadRubric } from "./review";
import type { SubmissionStatus } from "./status";

/**
 * Reads for the submission screens, all as the signed in user (RLS decides):
 * a learner reads their own work; cohort staff and admins read sent work.
 * Callers sit inside <Suspense>, because these read cookies.
 */

type SubmissionRow = Database["public"]["Tables"]["submissions"]["Row"];

export type WeekInfo = {
  id: string;
  programId: string;
  programTitle: string;
  passScore: number;
  weekNumber: number;
  theme: string;
  assignment: string;
  isCapstone: boolean;
};

export type SubmissionView = {
  id: string;
  profileId: string;
  status: SubmissionStatus;
  attempt: number;
  bodyText: string | null;
  linkUrl: string | null;
  filePath: string | null;
  fileUrl: string | null;
  aiFeedback: AiFeedback | null;
  aiScore: number | null;
  aiModel: string | null;
  aiReviewedAt: string | null;
  mentorFeedback: string | null;
  finalScore: number | null;
  gradedAt: string | null;
  inPortfolio: boolean;
  submittedAt: string | null;
  updatedAt: string;
};

type Db = Awaited<ReturnType<typeof createClient>>;

async function signedUrl(db: Db, path: string | null): Promise<string | null> {
  if (!path) return null;
  const { data } = await db.storage.from(SUBMISSIONS_BUCKET).createSignedUrl(path, SIGNED_URL_SECONDS);
  return data?.signedUrl ?? null;
}

export async function toView(db: Db, row: SubmissionRow): Promise<SubmissionView> {
  return {
    id: row.id,
    profileId: row.profile_id,
    status: row.status as SubmissionStatus,
    attempt: row.attempt,
    bodyText: row.body_text,
    linkUrl: row.link_url,
    filePath: row.file_path,
    fileUrl: await signedUrl(db, row.file_path),
    aiFeedback: readAiFeedback(row.ai_feedback),
    aiScore: row.ai_score,
    aiModel: row.ai_model,
    aiReviewedAt: row.ai_reviewed_at,
    mentorFeedback: row.mentor_feedback,
    finalScore: row.final_score,
    gradedAt: row.graded_at,
    inPortfolio: row.in_portfolio,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
  };
}

const WEEK_COLUMNS = "id, program_id, week_number, theme, assignment, is_capstone, programs(title, pass_score)";

type WeekRow = {
  id: string;
  program_id: string;
  week_number: number;
  theme: string;
  assignment: string;
  is_capstone: boolean;
  programs: { title: string; pass_score: number } | null;
};

function toWeek(row: WeekRow): WeekInfo {
  return {
    id: row.id,
    programId: row.program_id,
    programTitle: row.programs?.title ?? "",
    passScore: row.programs?.pass_score ?? 60,
    weekNumber: row.week_number,
    theme: row.theme,
    assignment: row.assignment,
    isCapstone: row.is_capstone,
  };
}

export const getWeek = cache(async (weekId: string): Promise<WeekInfo | null> => {
  const db = await createClient();
  const { data, error } = await db.from("program_weeks").select(WEEK_COLUMNS).eq("id", weekId).maybeSingle();
  if (error) throw new Error(`Could not load week: ${error.message}`);
  return data ? toWeek(data as unknown as WeekRow) : null;
});

export const getRubric = cache(async (programId: string, weekId: string): Promise<Rubric | null> => {
  const db = await createClient();
  return loadRubric(db, programId, weekId);
});

/** The signed in learner's work for one week, or null when they have not started it. */
export const getMySubmission = cache(async (profileId: string, weekId: string): Promise<SubmissionView | null> => {
  const db = await createClient();
  const { data, error } = await db
    .from("submissions")
    .select("*")
    .eq("profile_id", profileId)
    .eq("program_week_id", weekId)
    .maybeSingle();
  if (error) throw new Error(`Could not load your work: ${error.message}`);
  return data ? toView(db, data) : null;
});

/** Whether the learner may submit for this week: an active learner membership in the programme. */
export const getMyLearnerMembership = cache(async (profileId: string, programId: string) => {
  const db = await createClient();
  const { data, error } = await db
    .from("cohort_members")
    .select("id, cohort_id, specialization, status, cohorts!inner(program_id)")
    .eq("profile_id", profileId)
    .eq("role", "learner")
    .eq("status", "active")
    .eq("cohorts.program_id", programId)
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`Could not load membership: ${error.message}`);
  return data ? { id: data.id, cohortId: data.cohort_id, specialization: data.specialization } : null;
});

export type StaffSubmission = {
  submission: SubmissionView;
  week: WeekInfo;
  rubric: Rubric | null;
  learnerName: string;
};

/** Sent work as cohort staff or an admin see it (RLS hides drafts and other cohorts). */
export const getSubmissionForStaff = cache(async (submissionId: string): Promise<StaffSubmission | null> => {
  const db = await createClient();
  const { data: row, error } = await db.from("submissions").select("*").eq("id", submissionId).maybeSingle();
  if (error) throw new Error(`Could not load submission: ${error.message}`);
  if (!row) return null;
  const [week, roster] = await Promise.all([
    getWeek(row.program_week_id),
    db.from("cohort_roster").select("display_name").eq("profile_id", row.profile_id).limit(1).maybeSingle(),
  ]);
  if (!week) return null;
  return {
    submission: await toView(db, row),
    week,
    rubric: await getRubric(week.programId, week.id),
    learnerName: roster.data?.display_name ?? "Learner",
  };
});

export type WorkListItem = {
  id: string;
  weekId: string;
  weekNumber: number;
  theme: string;
  programTitle: string;
  status: SubmissionStatus;
  finalScore: number | null;
  aiScore: number | null;
  inPortfolio: boolean;
  submittedAt: string | null;
  updatedAt: string;
};

/** Every piece of work the learner has started, newest week first. */
export const listMyWork = cache(async (profileId: string): Promise<WorkListItem[]> => {
  const db = await createClient();
  const { data, error } = await db
    .from("submissions")
    .select("id, program_week_id, status, final_score, ai_score, in_portfolio, submitted_at, updated_at, program_weeks(week_number, theme), programs(title)")
    .eq("profile_id", profileId)
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`Could not load your work: ${error.message}`);
  type Row = {
    id: string;
    program_week_id: string;
    status: string;
    final_score: number | null;
    ai_score: number | null;
    in_portfolio: boolean;
    submitted_at: string | null;
    updated_at: string;
    program_weeks: { week_number: number; theme: string } | null;
    programs: { title: string } | null;
  };
  return ((data ?? []) as unknown as Row[])
    .map((r) => ({
      id: r.id,
      weekId: r.program_week_id,
      weekNumber: r.program_weeks?.week_number ?? 0,
      theme: r.program_weeks?.theme ?? "",
      programTitle: r.programs?.title ?? "",
      status: r.status as SubmissionStatus,
      finalScore: r.final_score,
      aiScore: r.ai_score,
      inPortfolio: r.in_portfolio,
      submittedAt: r.submitted_at,
      updatedAt: r.updated_at,
    }))
    .sort((a, b) => b.weekNumber - a.weekNumber);
});
