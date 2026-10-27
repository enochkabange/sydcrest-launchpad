import "server-only";
import { cache } from "react";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  cohortTiming,
  focusWeek,
  parseSpecializations,
  pathFor,
  pickMembership,
  specializationLocked,
  todayInGhana,
  type Specialization,
  type SubmissionLite,
} from "./schedule";

/**
 * Everything the learner's cohort screens read, in one request scoped load
 * (React cache), so /cohort and /cohort/week/[n] share it and every Suspense
 * island on a page reuses the same queries. RLS does the authorising: a
 * learner reads their own memberships, the cohorts and published weeks, their
 * own submissions and the roster of cohorts they are in. Request time
 * (cookies), so callers sit inside <Suspense>.
 */

export type Lesson = { roadmapSlug: string; nodeSlug: string; title: string; done: boolean };

export type CohortWeek = {
  id: string;
  week_number: number;
  specialization: string | null;
  theme: string;
  objectives: string[];
  resource_name: string | null;
  resource_url: string | null;
  assignment: string;
  is_capstone: boolean;
  /** Linked topics that are published on the site, in order. */
  lessons: Lesson[];
  /** Linked topics not yet published on the site. */
  unpublishedLessons: number;
};

export type RosterMember = {
  memberId: string;
  name: string;
  publicSlug: string | null;
  role: string;
  isMe: boolean;
};

export type MySubmission = SubmissionLite & {
  id: string;
  attempt: number;
  mentor_feedback: string | null;
};

export type CohortHome = {
  membership: {
    id: string;
    status: "active" | "deferred" | "completed";
    specialization: string | null;
    deferredTo: string | null;
  };
  /** The cohort this learner left, when the shown membership came from a deferral. */
  movedFrom: { name: string } | null;
  cohort: { id: string; name: string; startsOn: string; status: string };
  program: {
    id: string;
    slug: string;
    title: string;
    durationWeeks: number;
    graceDays: number;
    passScore: number;
    specializations: Specialization[];
  };
  /** The learner's path, one entry per week number; `week` is null for a fork they have not chosen. */
  path: { week_number: number; week: CohortWeek | null; forks: boolean }[];
  /** Every specialization row, so the chooser can show what each one covers. */
  forkWeeks: CohortWeek[];
  submissions: Map<string, MySubmission>;
  specializationLocked: boolean;
  roster: RosterMember[];
  /** For a deferred learner still waiting: the next cohort of the programme that has not started. */
  nextCohort: { name: string; startsOn: string } | null;
  today: string;
  timing: ReturnType<typeof cohortTiming>;
  focusWeek: number;
};

export const getCohortHome = cache(async (): Promise<CohortHome | null> => {
  const user = await requireUser();
  const supabase = await createClient();
  const today = todayInGhana();

  const { data: rows, error } = await supabase
    .from("cohort_members")
    .select(
      "id, role, status, specialization, deferred_to, deferred_at, created_at, cohort:cohorts!cohort_members_cohort_id_fkey(id, name, starts_on, status, program_id)",
    )
    .eq("profile_id", user.id);
  if (error) throw new Error(`Could not load your cohort: ${error.message}`);

  const memberships = (rows ?? []).flatMap((r) => (r.cohort ? [{ ...r, cohort: r.cohort, starts_on: r.cohort.starts_on }] : []));
  const membership = pickMembership(memberships);
  if (!membership) return null;
  const { cohort } = membership;

  // The deferred row that points at this cohort, if the learner was moved here.
  const from = memberships.find((m) => m.status === "deferred" && m.deferred_to === cohort.id);

  const [{ data: program }, { data: weeks }, { data: submissions }, { data: roster }] = await Promise.all([
    supabase
      .from("programs")
      .select("id, slug, title, duration_weeks, grace_days, pass_score, specializations")
      .eq("id", cohort.program_id)
      .single(),
    supabase
      .from("program_weeks")
      .select(
        "id, week_number, specialization, theme, objectives, resource_name, resource_url, assignment, is_capstone, program_week_nodes(roadmap_slug, node_slug, position)",
      )
      .eq("program_id", cohort.program_id)
      .order("week_number"),
    supabase
      .from("submissions")
      .select("id, program_week_id, status, final_score, submitted_at, attempt, mentor_feedback")
      .eq("profile_id", user.id)
      .eq("program_id", cohort.program_id),
    supabase
      .from("cohort_roster")
      .select("member_id, profile_id, display_name, public_slug, role, status")
      .eq("cohort_id", cohort.id),
  ]);
  if (!program) throw new Error("Could not load the programme for your cohort.");

  // Resolve linked topics to published roadmap nodes, plus the learner's progress on them.
  const links = (weeks ?? []).flatMap((w) => w.program_week_nodes);
  const roadmapSlugs = [...new Set(links.map((l) => l.roadmap_slug))];
  const { data: roadmaps } = roadmapSlugs.length
    ? await supabase.from("roadmaps").select("id, slug").in("slug", roadmapSlugs).eq("is_published", true)
    : { data: [] };
  const { data: nodes } = roadmaps?.length
    ? await supabase
        .from("roadmap_nodes")
        .select("id, roadmap_id, slug, title")
        .in(
          "roadmap_id",
          roadmaps.map((r) => r.id),
        )
    : { data: [] };
  const nodeByKey = new Map(
    (nodes ?? []).map((n) => [`${roadmaps?.find((r) => r.id === n.roadmap_id)?.slug}/${n.slug}`, n]),
  );
  const nodeIds = [...nodeByKey.values()].map((n) => n.id);
  const { data: progress } = nodeIds.length
    ? await supabase.from("roadmap_progress").select("node_id, status").eq("profile_id", user.id).in("node_id", nodeIds)
    : { data: [] };
  const doneIds = new Set((progress ?? []).filter((p) => p.status === "done").map((p) => p.node_id));

  const allWeeks: CohortWeek[] = (weeks ?? []).map((w) => {
    const ordered = [...w.program_week_nodes].sort((a, b) => a.position - b.position);
    const lessons = ordered.flatMap((l) => {
      const node = nodeByKey.get(`${l.roadmap_slug}/${l.node_slug}`);
      return node ? [{ roadmapSlug: l.roadmap_slug, nodeSlug: l.node_slug, title: node.title, done: doneIds.has(node.id) }] : [];
    });
    return {
      id: w.id,
      week_number: w.week_number,
      specialization: w.specialization,
      theme: w.theme,
      objectives: w.objectives,
      resource_name: w.resource_name,
      resource_url: w.resource_url,
      assignment: w.assignment,
      is_capstone: w.is_capstone,
      lessons,
      unpublishedLessons: ordered.length - lessons.length,
    };
  });

  const subs: MySubmission[] = submissions ?? [];
  const timing = cohortTiming(cohort.starts_on, program.duration_weeks, today);

  let nextCohort: CohortHome["nextCohort"] = null;
  if (membership.status === "deferred" && !membership.deferred_to) {
    const { data: upcoming } = await supabase
      .from("cohorts")
      .select("name, starts_on")
      .eq("program_id", cohort.program_id)
      .in("status", ["planned", "enrolling"])
      .gt("starts_on", today)
      .order("starts_on")
      .limit(1);
    if (upcoming?.[0]) nextCohort = { name: upcoming[0].name, startsOn: upcoming[0].starts_on };
  }

  return {
    membership: {
      id: membership.id,
      status: membership.status as CohortHome["membership"]["status"],
      specialization: membership.specialization,
      deferredTo: membership.deferred_to,
    },
    movedFrom: from ? { name: from.cohort.name } : null,
    cohort: { id: cohort.id, name: cohort.name, startsOn: cohort.starts_on, status: cohort.status },
    program: {
      id: program.id,
      slug: program.slug,
      title: program.title,
      durationWeeks: program.duration_weeks,
      graceDays: program.grace_days,
      passScore: program.pass_score,
      specializations: parseSpecializations(program.specializations),
    },
    path: pathFor(allWeeks, membership.specialization, program.duration_weeks),
    forkWeeks: allWeeks.filter((w) => w.specialization !== null),
    submissions: new Map(subs.map((s) => [s.program_week_id, s])),
    specializationLocked: specializationLocked(allWeeks, subs),
    roster: (roster ?? [])
      .filter((r) => r.status !== "deferred" && r.member_id)
      .map((r) => ({
        memberId: r.member_id!,
        name: r.display_name?.trim() || "A SydCrest learner",
        publicSlug: r.public_slug,
        role: r.role ?? "learner",
        isMe: r.profile_id === user.id,
      })),
    nextCohort,
    today,
    timing,
    focusWeek: focusWeek(timing, program.duration_weeks),
  };
});
