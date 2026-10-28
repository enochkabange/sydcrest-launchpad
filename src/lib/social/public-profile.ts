import type { FieldErrors } from "@/lib/validation";

/** Same rule as the profiles.public_slug check constraint. */
export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/;
export const MAX_SKILLS = 30;
export const MAX_SKILL_LENGTH = 40;
export const MAX_HEADLINE = 120;
export const MAX_GOALS = 500;

export type PublicProfileFields = "public_slug" | "is_public" | "headline" | "skills" | "goals";

export type PublicProfileData = {
  public_slug: string | null;
  is_public: boolean;
  headline: string | null;
  skills: string[];
  goals: string | null;
};

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Comma or new line separated, trimmed, without repeats (ignoring case). */
export function parseSkills(input: string): string[] {
  const seen = new Set<string>();
  const skills: string[] = [];
  for (const raw of input.split(/[,\n]/)) {
    const skill = raw.trim().replace(/\s+/g, " ");
    if (!skill || seen.has(skill.toLowerCase())) continue;
    seen.add(skill.toLowerCase());
    skills.push(skill);
  }
  return skills;
}

export function parsePublicProfile(form: FormData) {
  const slug = text(form, "public_slug").toLowerCase();
  const headline = text(form, "headline");
  const goals = text(form, "goals");
  const skills = parseSkills(text(form, "skills"));
  const isPublic = form.get("is_public") === "on";
  const errors: FieldErrors<PublicProfileFields> = {};

  if (slug && !SLUG_PATTERN.test(slug)) {
    errors.public_slug = "Use 3 to 40 lowercase letters, numbers or hyphens, starting and ending with a letter or number.";
  }
  if (isPublic && !slug) errors.is_public = "Choose a profile link name before making your profile public.";
  if (headline.length > MAX_HEADLINE) errors.headline = `Keep your headline under ${MAX_HEADLINE} characters.`;
  if (goals.length > MAX_GOALS) errors.goals = `Keep your goals under ${MAX_GOALS} characters.`;
  if (skills.length > MAX_SKILLS) errors.skills = `List up to ${MAX_SKILLS} skills.`;
  else if (skills.some((s) => s.length > MAX_SKILL_LENGTH)) {
    errors.skills = `Keep each skill under ${MAX_SKILL_LENGTH} characters.`;
  }

  const data: PublicProfileData = {
    public_slug: slug || null,
    is_public: isPublic,
    headline: headline || null,
    skills,
    goals: goals || null,
  };
  return { data, errors };
}

export const ACHIEVEMENT_LABELS: Record<string, string> = {
  roadmap_node_completed: "Completed a topic",
  roadmap_completed: "Completed a roadmap",
  section_completed: "Completed a section",
  streak: "Learning streak",
  track_chosen: "Chose a track",
  path_personalized: "Got a personal learning plan",
};

/** A short line for an achievement, using the topic or roadmap title when known. */
export function describeAchievement(type: string, refId: string | null, title?: string | null) {
  if (type === "streak" && refId) return `${refId} day learning streak`;
  if (type === "roadmap_node_completed" && title) return `Completed ${title}`;
  if (type === "roadmap_completed" && title) return `Completed the ${title} roadmap`;
  if (type === "section_completed" && title) return `Completed the ${title} section`;
  return ACHIEVEMENT_LABELS[type] ?? "Achievement";
}

/** The invite link a learner shares. No rewards are attached to it. */
export function inviteLink(origin: string, slug: string | null) {
  return slug ? `${origin}/signup?ref=${encodeURIComponent(slug)}` : `${origin}/signup`;
}

/** Reasons offered when reporting a public profile. */
export const REPORT_REASONS = [
  "Spam or scam",
  "Harassment or hate",
  "Pretending to be someone else",
  "Inappropriate content",
  "Something else",
] as const;
