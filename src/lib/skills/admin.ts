/**
 * Pure form parsing for /admin/skills (issue #165). The Server Actions in
 * src/app/(admin)/admin/skills call these, then write with the admin's own
 * session so RLS (private.is_admin) checks the role again.
 */
import { slugify } from "@/lib/roadmap-admin";

/** Same rule as the slug check on public.skills. */
export const SKILL_SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,48}[a-z0-9]$/;
/** Same rule as the roadmap_slug check on public.skill_roadmaps. */
export const ROADMAP_SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,78}[a-z0-9]$/;

/**
 * Static routes under /skills that a skill slug would collide with: the
 * review queue lives at /skills/reviews, so no skill may be called that.
 */
export const RESERVED_SKILL_SLUGS = new Set(["reviews", "new", "admin"]);

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export type SkillFields = { name: string; slug: string; summary: string | null };

export function parseSkillForm(form: FormData) {
  const errors: Partial<Record<keyof SkillFields, string>> = {};
  const name = text(form, "name");
  const slug = (text(form, "slug") || slugify(name).slice(0, 50).replace(/-+$/, "")).toLowerCase();
  const summary = text(form, "summary");

  if (!name) errors.name = "Enter the skill's name.";
  else if (name.length > 80) errors.name = "Keep the name to 80 characters.";
  if (!SKILL_SLUG_PATTERN.test(slug)) errors.slug = "Use lowercase letters, numbers and hyphens, 2 to 50 characters.";
  else if (RESERVED_SKILL_SLUGS.has(slug)) errors.slug = `"${slug}" is used by another page. Choose a different slug.`;
  if (summary.length > 1000) errors.summary = "Keep the summary to 1000 characters.";

  return { data: { name, slug, summary: summary || null } satisfies SkillFields, errors };
}

export type AssessmentFields = {
  kind: "quiz" | "portfolio";
  title: string;
  instructions: string | null;
  pass_threshold: number;
  retry_after_hours: number;
};

function wholeNumber(value: string, min: number, max: number) {
  if (!/^\d{1,4}$/.test(value)) return null;
  const n = Number(value);
  return n >= min && n <= max ? n : null;
}

/** `kind` is fixed once created, so edits pass the stored kind in. */
export function parseAssessmentForm(form: FormData, fixedKind?: AssessmentFields["kind"]) {
  const errors: Partial<Record<keyof AssessmentFields, string>> = {};
  const rawKind = fixedKind ?? text(form, "kind");
  const kind = rawKind === "quiz" || rawKind === "portfolio" ? rawKind : null;
  const title = text(form, "title");
  const instructions = text(form, "instructions");
  const threshold = wholeNumber(text(form, "pass_threshold") || "80", 1, 100);
  const retry = wholeNumber(text(form, "retry_after_hours") || "24", 0, 720);

  if (!kind) errors.kind = "Choose a quiz or a portfolio review.";
  if (!title) errors.title = "Enter a title.";
  else if (title.length > 120) errors.title = "Keep the title to 120 characters.";
  if (instructions.length > 4000) errors.instructions = "Keep the instructions to 4000 characters.";
  if (threshold === null) errors.pass_threshold = "Enter a whole number from 1 to 100.";
  if (retry === null) errors.retry_after_hours = "Enter a whole number of hours from 0 to 720.";

  const data: AssessmentFields = {
    kind: kind ?? "quiz",
    title,
    instructions: instructions || null,
    pass_threshold: threshold ?? 80,
    retry_after_hours: retry ?? 24,
  };
  return { data, errors };
}

export function parseRevokeReason(form: FormData) {
  const reason = text(form, "reason");
  if (!reason) return { reason, error: "Give a reason. The holder can ask about it." };
  if (reason.length > 500) return { reason, error: "Keep the reason to 500 characters." };
  return { reason, error: undefined };
}
