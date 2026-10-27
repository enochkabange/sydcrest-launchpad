import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import type { Database } from "@/lib/supabase/database.types";
import { ALL_ROADMAPS_TAG } from "@/lib/roadmaps/public";
import { parseQuestions, type QuizQuestion } from "@/components/learn/quiz-data";
import type { AssessmentKind } from "./assessment";

/**
 * The published skill catalogue for /skills and /skills/[slug], cached with
 * `use cache` and read anonymously (RLS returns published skills, their
 * roadmap mappings and published assessments; never answer keys). Admin
 * writes expire the tags (./revalidate.ts). Roadmap titles come along, so a
 * roadmap refresh expires these too.
 */

export const SKILLS_TAG = "skills";
export const skillTag = (slug: string) => `skill:${slug}`;
export const ALL_SKILLS_TAG = "skills:all";

function anonClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
  );
}

/** As in roadmaps/public.ts: the CI build has no database, so a build time failure renders on demand instead. */
async function guarded<T>(what: string, empty: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`Skills: could not load ${what} at build time (${message}); rendering on demand.`);
      return empty;
    }
    throw new Error(`Could not load ${what}: ${message}`);
  }
}

function check(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export type SkillPath = { slug: string; title: string };

export type SkillSummary = {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  /** Published roadmaps whose completion verifies the skill. */
  paths: SkillPath[];
  /** Kinds of the published assessments, quiz first. */
  assessments: AssessmentKind[];
};

export type PublicAssessment = {
  id: string;
  kind: AssessmentKind;
  title: string;
  instructions: string | null;
  questions: QuizQuestion[];
  pass_threshold: number;
  retry_after_hours: number;
};

export type PublishedSkill = Omit<SkillSummary, "assessments"> & {
  updated_at: string;
  assessments: PublicAssessment[];
};

const KINDS: AssessmentKind[] = ["quiz", "portfolio"];
const asKind = (kind: string): AssessmentKind | null => (kind === "quiz" || kind === "portfolio" ? kind : null);

async function roadmapTitles(slugs: string[]): Promise<Map<string, string>> {
  if (slugs.length === 0) return new Map();
  const { data, error } = await anonClient()
    .from("roadmaps")
    .select("slug, title")
    .eq("is_published", true)
    .in("slug", [...new Set(slugs)]);
  check(error);
  return new Map((data ?? []).map((r) => [r.slug, r.title]));
}

function pathsFor(slugs: string[], titles: Map<string, string>): SkillPath[] {
  return slugs
    .flatMap((slug) => (titles.has(slug) ? [{ slug, title: titles.get(slug)! }] : []))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPublishedSkills(): Promise<SkillSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(SKILLS_TAG, ALL_SKILLS_TAG, ALL_ROADMAPS_TAG);

  return guarded("skills", [], async () => {
    const { data, error } = await anonClient()
      .from("skills")
      .select("id, slug, name, summary, skill_roadmaps(roadmap_slug), skill_assessments(kind, is_published)")
      .eq("is_published", true)
      .order("name");
    check(error);
    const rows = data ?? [];
    const titles = await roadmapTitles(rows.flatMap((s) => s.skill_roadmaps.map((m) => m.roadmap_slug)));
    return rows.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      summary: s.summary,
      paths: pathsFor(
        s.skill_roadmaps.map((m) => m.roadmap_slug),
        titles,
      ),
      assessments: KINDS.filter((k) => s.skill_assessments.some((a) => a.is_published && a.kind === k)),
    }));
  });
}

export async function getPublishedSkill(slug: string): Promise<PublishedSkill | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(skillTag(slug), ALL_SKILLS_TAG, ALL_ROADMAPS_TAG);

  return guarded("skill", null, async () => {
    const { data, error } = await anonClient()
      .from("skills")
      .select(
        "id, slug, name, summary, updated_at, skill_roadmaps(roadmap_slug), skill_assessments(id, kind, title, instructions, questions, pass_threshold, retry_after_hours, is_published, created_at)",
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    check(error);
    if (!data) return null;
    const titles = await roadmapTitles(data.skill_roadmaps.map((m) => m.roadmap_slug));
    const assessments = data.skill_assessments
      .filter((a) => a.is_published)
      .sort((a, b) => (a.kind === b.kind ? a.created_at.localeCompare(b.created_at) : a.kind === "quiz" ? -1 : 1))
      .flatMap((a) => {
        const kind = asKind(a.kind);
        if (!kind) return [];
        const questions = kind === "quiz" ? parseQuestions(a.questions) : [];
        if (kind === "quiz" && questions.length === 0) return [];
        return [
          {
            id: a.id,
            kind,
            title: a.title,
            instructions: a.instructions,
            questions,
            pass_threshold: a.pass_threshold,
            retry_after_hours: a.retry_after_hours,
          },
        ];
      });
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      summary: data.summary,
      updated_at: data.updated_at,
      paths: pathsFor(
        data.skill_roadmaps.map((m) => m.roadmap_slug),
        titles,
      ),
      assessments,
    };
  });
}
