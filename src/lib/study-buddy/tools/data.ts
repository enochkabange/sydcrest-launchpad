import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { readingOrder } from "./reading-order";
import type { CompanionData, EventRow, ExpertRow, LearnerContext, OpportunityRow } from "./types";

type Db = SupabaseClient<Database>;

/**
 * The companion tools' reads, through the learner's own client: RLS returns
 * only their own path, progress, skills and chapter memberships, and only
 * public rows of experts, opportunities and events. Never the service role.
 */

/** How many candidate rows are ranked in code. Plenty for the soft launch catalogue. */
const CANDIDATES = 80;

function fail(what: string, error: { message: string }): never {
  throw new Error(`Could not read ${what}: ${error.message}`);
}

function one<T>(value: T | T[] | null | undefined): T | null {
  return Array.isArray(value) ? (value[0] ?? null) : (value ?? null);
}

type PlanJson = { track?: unknown; next_action?: { label?: unknown; href?: unknown } | null } | null;

async function loadLearner(supabase: Db, userId: string): Promise<LearnerContext> {
  const [profile, path, verified, chapters] = await Promise.all([
    supabase.from("profiles").select("region, skills").eq("id", userId).maybeSingle(),
    supabase
      .from("personalized_paths")
      .select("plan, recommended_roadmap_id")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("verified_skills").select("skills(name)").eq("profile_id", userId).is("revoked_at", null),
    supabase.from("chapter_members").select("chapters(id, slug, name)").eq("profile_id", userId),
  ]);
  if (profile.error) fail("profile", profile.error);
  if (path.error) fail("path", path.error);

  const plan = (path.data?.plan ?? null) as PlanJson;
  let track = typeof plan?.track === "string" ? plan.track : null;
  const nextAction = plan?.next_action;
  const pathNextAction =
    nextAction && typeof nextAction.label === "string"
      ? { label: nextAction.label, href: typeof nextAction.href === "string" ? nextAction.href : null }
      : null;

  let roadmap: LearnerContext["roadmap"] = null;
  let progress: LearnerContext["progress"] = null;
  let nextTopics: LearnerContext["nextTopics"] = [];

  const roadmapId = path.data?.recommended_roadmap_id ?? null;
  if (roadmapId) {
    const [rm, nodes] = await Promise.all([
      supabase.from("roadmaps").select("slug, title, track").eq("id", roadmapId).maybeSingle(),
      supabase.from("roadmap_nodes").select("id, slug, title, parent_id, position").eq("roadmap_id", roadmapId),
    ]);
    if (rm.data) {
      roadmap = { slug: rm.data.slug, title: rm.data.title };
      track ??= rm.data.track;
      const ordered = readingOrder(nodes.data ?? []);
      const leafIds = new Set(ordered.map((n) => n.parent_id).filter(Boolean));
      // Topics are the nodes a learner opens; sections with children are headings.
      const topics = ordered.filter((n) => !leafIds.has(n.id));
      const { data: rows } = topics.length
        ? await supabase.from("roadmap_progress").select("node_id, status").eq("profile_id", userId).in("node_id", topics.map((t) => t.id))
        : { data: [] as { node_id: string; status: string }[] };
      const status = new Map((rows ?? []).map((r) => [r.node_id, r.status]));
      progress = {
        done: topics.filter((t) => status.get(t.id) === "done").length,
        inProgress: topics.filter((t) => status.get(t.id) === "in_progress").length,
        total: topics.length,
      };
      nextTopics = topics
        .filter((t) => status.get(t.id) !== "done")
        .slice(0, 5)
        .map((t) => ({ title: t.title, slug: t.slug, status: status.get(t.id) === "in_progress" ? "in_progress" : "not_started" }));
      // Started topics first, so "carry on" comes before "begin".
      nextTopics.sort((a, b) => (a.status === b.status ? 0 : a.status === "in_progress" ? -1 : 1));
    }
  }

  return {
    track,
    roadmap,
    pathNextAction,
    region: profile.data?.region ?? null,
    skills: profile.data?.skills ?? [],
    verifiedSkills: (verified.data ?? [])
      .map((v) => one(v.skills as { name: string } | { name: string }[] | null)?.name)
      .filter((n): n is string => Boolean(n)),
    chapters: (chapters.data ?? [])
      .map((c) => one(c.chapters as { id: string; slug: string; name: string } | { id: string; slug: string; name: string }[] | null))
      .filter((c): c is { id: string; slug: string; name: string } => Boolean(c)),
    progress,
    nextTopics,
  };
}

export function createCompanionData(supabase: Db, userId: string, now = () => new Date()): CompanionData {
  return {
    learner: () => loadLearner(supabase, userId),

    async experts(): Promise<ExpertRow[]> {
      const { data, error } = await supabase
        .from("public_experts")
        .select(
          "slug, display_name, headline, skills, categories, region, accepting_requests, offers_free_intro, completed_bookings, review_count, average_rating, is_featured, verified_skills",
        )
        .order("is_featured", { ascending: false })
        .limit(CANDIDATES);
      if (error) fail("experts", error);
      return data ?? [];
    },

    async opportunities(): Promise<OpportunityRow[]> {
      const { data, error } = await supabase
        .from("opportunities")
        .select("slug, title, kind, organisation_name, summary, deadline, location, region, is_remote, tracks, skills, compensation_note")
        .eq("status", "open")
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(CANDIDATES);
      if (error) fail("opportunities", error);
      return data ?? [];
    },

    async events(): Promise<EventRow[]> {
      const { data, error } = await supabase
        .from("community_events")
        .select("id, slug, title, kind, format, summary, starts_at, city, region, chapter_id")
        .eq("status", "published")
        .gte("starts_at", now().toISOString())
        .order("starts_at")
        .limit(CANDIDATES);
      if (error) fail("events", error);
      const rows = data ?? [];
      const seats = new Map<string, number | null>();
      if (rows.length) {
        const { data: attendance } = await supabase
          .from("event_attendance")
          .select("event_id, seats_left")
          .in("event_id", rows.map((r) => r.id));
        for (const a of attendance ?? []) if (a.event_id) seats.set(a.event_id, a.seats_left);
      }
      return rows.map(({ id, ...e }) => ({ ...e, seats_left: seats.get(id) ?? null }));
    },
  };
}
