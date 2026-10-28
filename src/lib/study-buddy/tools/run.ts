import { OPPORTUNITY_KINDS, TOOL_NAMES, type ToolName } from "./definitions";
import { fenceToolResult } from "./fence";
import type { CompanionData, EventRow, ExpertRow, LearnerContext, OpportunityRow } from "./types";

/**
 * Runs one companion tool call and returns the text for its tool_result.
 * The model only sees compact rows (names, short fields, links), never ids,
 * contact details or other people's private data; it writes the reply. A bad
 * input or a failed read comes back as an error result for the model to
 * apologise for, never as a thrown error that would end the reply.
 */

export type ToolOutcome = { content: string; isError: boolean };

/** How many rows each tool returns at most. Small on purpose: a chat reply, not a directory. */
export const MAX_ROWS = { mentors: 4, opportunities: 5, events: 5, topics: 3 } as const;

/** Expert market categories that suit each roadmap track (src/lib/experts/categories.ts). */
export const TRACK_CATEGORIES: Record<string, string[]> = {
  frontend: ["software"],
  backend: ["software"],
  "mobile-app-developer": ["software"],
  "software-testing": ["software"],
  data: ["data"],
  "data-science": ["data"],
  "excel-power-bi": ["data"],
  "ai-ml": ["data", "ai-tools"],
  "ui-ux": ["design"],
  "graphic-design": ["design"],
  "digital-marketing": ["marketing"],
  "content-creation": ["marketing"],
  "social-media-management": ["marketing"],
  "it-support": ["it-cloud"],
  "cloud-devops": ["it-cloud"],
  cybersecurity: ["cybersecurity"],
  product: ["product-business"],
  "project-management": ["product-business"],
  "digital-business": ["product-business"],
  freelancing: ["product-business", "careers"],
  "digital-sales": ["product-business"],
  "customer-service": ["product-business"],
  "virtual-assistant": ["product-business"],
  "ai-tools-for-work": ["ai-tools"],
  "no-code": ["ai-tools"],
  "digital-skills-bridge": ["careers"],
};

function norm(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9+#]+/g, " ").trim();
}

/** Loose match between two short phrases: equal, or one contains the other (3+ characters). */
export function termsMatch(a: string, b: string): boolean {
  const x = norm(a);
  const y = norm(b);
  if (x.length < 2 || y.length < 2) return false;
  if (x === y) return true;
  return (x.length >= 3 && y.includes(x)) || (y.length >= 3 && x.includes(y));
}

function overlap(terms: string[], values: (string | null | undefined)[]): number {
  const clean = values.filter((v): v is string => Boolean(v));
  return terms.filter((t) => clean.some((v) => termsMatch(t, v))).length;
}

function learnerTerms(learner: LearnerContext): string[] {
  return [...new Set([...learner.skills, ...learner.verifiedSkills].map((s) => s.trim()).filter(Boolean))];
}

export type ToolInput = { focus: string | null; kind: string | null };

/** Validates a tool's input object. Unknown keys and wrong types are an error the model can correct. */
export function parseToolInput(name: ToolName, input: unknown): { ok: true; value: ToolInput } | { ok: false; error: string } {
  if (input === undefined || input === null) return { ok: true, value: { focus: null, kind: null } };
  if (typeof input !== "object" || Array.isArray(input)) return { ok: false, error: "Input must be an object." };
  const allowed = name === "find_opportunities" ? ["focus", "kind"] : name === "suggest_mentors" ? ["focus"] : [];
  const record = input as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (!allowed.includes(key)) return { ok: false, error: `Unknown field "${key}".` };
  }
  let focus: string | null = null;
  if (record.focus !== undefined && record.focus !== null) {
    if (typeof record.focus !== "string") return { ok: false, error: "focus must be text." };
    focus = record.focus.trim().slice(0, 60) || null;
  }
  let kind: string | null = null;
  if (record.kind !== undefined && record.kind !== null) {
    if (typeof record.kind !== "string" || !(OPPORTUNITY_KINDS as readonly string[]).includes(record.kind)) {
      return { ok: false, error: `kind must be one of ${OPPORTUNITY_KINDS.join(", ")}.` };
    }
    kind = record.kind;
  }
  return { ok: true, value: { focus, kind } };
}

function verifiedSkillNames(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (v && typeof v === "object" && "name" in v ? (v as { name: unknown }).name : null))
    .filter((n): n is string => typeof n === "string");
}

export function nextSteps(learner: LearnerContext) {
  if (!learner.track && !learner.roadmap) {
    return {
      has_path: false,
      suggestion: "The learner has not taken the path quiz yet. It takes a few minutes and picks a roadmap for them.",
      path_quiz_href: "/start",
      verified_skills: learner.verifiedSkills,
      chapters: learner.chapters.map((c) => ({ name: c.name, href: `/chapters/${c.slug}` })),
    };
  }
  return {
    has_path: true,
    track: learner.track,
    roadmap: learner.roadmap ? { title: learner.roadmap.title, href: `/roadmaps/${learner.roadmap.slug}` } : null,
    path_href: "/path",
    progress: learner.progress
      ? { topics_done: learner.progress.done, topics_in_progress: learner.progress.inProgress, topics_total: learner.progress.total }
      : null,
    next_topics: learner.roadmap
      ? learner.nextTopics.slice(0, MAX_ROWS.topics).map((t) => ({
          title: t.title,
          status: t.status === "in_progress" ? "started" : "not started",
          href: `/learn/${learner.roadmap!.slug}/${t.slug}`,
        }))
      : [],
    path_next_action: learner.progress && learner.progress.done > 0 ? null : learner.pathNextAction,
    verified_skills: learner.verifiedSkills,
    chapters: learner.chapters.map((c) => ({ name: c.name, href: `/chapters/${c.slug}` })),
  };
}

export function rankMentors(learner: LearnerContext, experts: ExpertRow[], focus: string | null = null) {
  const terms = learnerTerms(learner);
  const categories = learner.track ? (TRACK_CATEGORIES[learner.track] ?? []) : [];
  const scored = experts
    .filter((e) => e.slug && e.display_name)
    .map((e) => {
      const verified = verifiedSkillNames(e.verified_skills);
      const focusHit = focus ? overlap([focus], [...(e.skills ?? []), ...verified, e.headline]) : 0;
      const score =
        focusHit * 4 +
        (e.categories ?? []).filter((c) => categories.includes(c)).length * 2 +
        overlap(terms, [...(e.skills ?? []), ...verified]) +
        (verified.length > 0 ? 0.5 : 0) +
        (e.accepting_requests ? 0.25 : 0);
      return { e, verified, score, focusHit };
    })
    .filter((x) => (focus ? x.focusHit > 0 : x.score >= 1))
    .sort((a, b) => b.score - a.score || (b.e.completed_bookings ?? 0) - (a.e.completed_bookings ?? 0));

  return {
    matched_on: focus ? `the learner's question about ${focus}` : learner.track ? `the ${learner.track} track and the learner's skills` : "the learner's skills",
    mentors: scored.slice(0, MAX_ROWS.mentors).map(({ e, verified }) => ({
      name: e.display_name,
      headline: e.headline,
      skills: (e.skills ?? []).slice(0, 6),
      verified_skills: verified.slice(0, 4),
      region: e.region,
      accepting_requests: Boolean(e.accepting_requests),
      free_intro: Boolean(e.offers_free_intro),
      completed_bookings: e.completed_bookings ?? 0,
      review_count: e.review_count ?? 0,
      average_rating: e.review_count ? e.average_rating : null,
      href: `/experts/${e.slug}`,
    })),
    browse_all_href: "/experts",
  };
}

export function rankOpportunities(
  learner: LearnerContext,
  rows: OpportunityRow[],
  input: ToolInput,
  today: string,
) {
  const terms = learnerTerms(learner);
  const open = rows.filter((o) => (!o.deadline || o.deadline >= today) && (!input.kind || o.kind === input.kind));
  const scored = open
    .map((o) => {
      const focusHit = input.focus ? overlap([input.focus], [o.title, o.summary, ...o.skills, ...o.tracks]) : 0;
      const trackHit = learner.track && o.tracks.includes(learner.track) ? 1 : 0;
      const score =
        focusHit * 4 +
        trackHit * 3 +
        overlap(terms, o.skills) +
        (learner.region && o.region === learner.region ? 1 : 0) +
        (o.is_remote ? 0.25 : 0);
      return { o, score, matched: input.focus ? focusHit > 0 : trackHit > 0 || overlap(terms, o.skills) > 0 };
    })
    .sort((a, b) => b.score - a.score || (a.o.deadline ?? "9999").localeCompare(b.o.deadline ?? "9999"));

  const matched = scored.filter((s) => s.matched);
  // Nothing matched: still show a few open ones, clearly marked, so the reply can be honest about it.
  const shown = matched.length > 0 ? matched : scored;
  return {
    today,
    matched_your_path: matched.length > 0,
    open_count: open.length,
    opportunities: shown.slice(0, MAX_ROWS.opportunities).map(({ o }) => ({
      title: o.title,
      kind: o.kind,
      organisation: o.organisation_name,
      summary: o.summary,
      deadline: o.deadline,
      location: o.is_remote ? (o.location ? `${o.location} or remote` : "Remote") : o.location,
      pay: o.compensation_note,
      href: `/opportunities/${o.slug}`,
    })),
    browse_all_href: "/opportunities",
  };
}

export function rankEvents(learner: LearnerContext, rows: EventRow[], now: Date) {
  const chapterIds = new Set(learner.chapters.map((c) => c.id));
  const chapterNames = new Map(learner.chapters.map((c) => [c.id, c.name]));
  const upcoming = rows.filter((e) => new Date(e.starts_at).getTime() >= now.getTime());
  const rank = (e: EventRow) =>
    e.chapter_id && chapterIds.has(e.chapter_id) ? 0 : learner.region && e.region === learner.region ? 1 : e.format !== "in_person" ? 2 : 3;
  const sorted = upcoming
    .map((e) => ({ e, r: rank(e) }))
    .sort((a, b) => a.r - b.r || a.e.starts_at.localeCompare(b.e.starts_at));
  return {
    now: now.toISOString(),
    in_a_chapter: learner.chapters.length > 0,
    chapters_href: "/chapters",
    events: sorted.slice(0, MAX_ROWS.events).map(({ e, r }) => ({
      title: e.title,
      kind: e.kind,
      format: e.format.replace("_", " "),
      starts_at: e.starts_at,
      city: e.city,
      why: r === 0 ? `your chapter (${chapterNames.get(e.chapter_id!)})` : r === 1 ? "in your region" : r === 2 ? "online, open to everyone" : "in person elsewhere",
      seats_left: e.seats_left,
      href: `/events/${e.slug}`,
    })),
    browse_all_href: "/events",
  };
}

/** Africa/Accra is UTC all year, so the ISO date is the local date. */
function isoDay(now: Date) {
  return now.toISOString().slice(0, 10);
}

export function isToolName(name: string): name is ToolName {
  return (TOOL_NAMES as readonly string[]).includes(name);
}

/**
 * Builds the executor for one turn. The learner context is read once per
 * turn however many tools the model calls.
 */
export function createToolRunner(data: CompanionData, now = () => new Date()) {
  let learner: Promise<LearnerContext> | null = null;
  const getLearner = () => (learner ??= data.learner());

  return async function runTool(name: string, input: unknown): Promise<ToolOutcome> {
    if (!isToolName(name)) return { content: `There is no tool called ${name}.`, isError: true };
    const parsed = parseToolInput(name, input);
    if (!parsed.ok) return { content: parsed.error, isError: true };
    try {
      let result: unknown;
      switch (name) {
        case "my_next_steps":
          result = nextSteps(await getLearner());
          break;
        case "suggest_mentors": {
          const [ctx, experts] = await Promise.all([getLearner(), data.experts()]);
          result = rankMentors(ctx, experts, parsed.value.focus);
          break;
        }
        case "find_opportunities": {
          const [ctx, rows] = await Promise.all([getLearner(), data.opportunities()]);
          result = rankOpportunities(ctx, rows, parsed.value, isoDay(now()));
          break;
        }
        case "upcoming_events": {
          const [ctx, rows] = await Promise.all([getLearner(), data.events()]);
          result = rankEvents(ctx, rows, now());
          break;
        }
      }
      return { content: fenceToolResult(result), isError: false };
    } catch (error) {
      console.error(`Study Buddy tool ${name} failed`, error);
      return { content: "That information could not be loaded just now.", isError: true };
    }
  };
}

export type ToolRunner = ReturnType<typeof createToolRunner>;
