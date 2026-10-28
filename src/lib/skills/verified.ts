/**
 * Verified skills (issue #165, Product Enrichment §7.5): earned, never
 * bought. Pure helpers shared by public profiles, expert pages, the talent
 * directory and the learner's own profile. Rows come from the database only
 * (`private.issue_verified_skill`); nothing here can create one.
 */

export const VERIFIED_SKILL_SOURCES = ["path_completion", "assessment", "portfolio_review"] as const;
export type VerifiedSkillSource = (typeof VERIFIED_SKILL_SOURCES)[number];

export type VerifiedSkill = {
  slug: string;
  name: string;
  source: VerifiedSkillSource;
  issuedAt: string;
};

const SOURCE_LABELS: Record<VerifiedSkillSource, string> = {
  path_completion: "Completed the path",
  assessment: "Passed the assessment",
  portfolio_review: "Portfolio reviewed",
};

/** How the skill was earned, in words a visitor understands. */
export function sourceLabel(source: VerifiedSkillSource): string {
  return SOURCE_LABELS[source];
}

export function isVerifiedSkillSource(value: unknown): value is VerifiedSkillSource {
  return typeof value === "string" && (VERIFIED_SKILL_SOURCES as readonly string[]).includes(value);
}

/**
 * The `verified_skills` column of `talent_directory` and `public_experts`:
 * `[{slug, name, source, issued_at}]`. Keeps well formed entries only, one per
 * slug, sorted by name.
 */
export function parseVerifiedSkills(json: unknown): VerifiedSkill[] {
  if (!Array.isArray(json)) return [];
  const bySlug = new Map<string, VerifiedSkill>();
  for (const item of json) {
    if (!item || typeof item !== "object") continue;
    const { slug, name, source, issued_at } = item as Record<string, unknown>;
    if (typeof slug !== "string" || !slug || typeof name !== "string" || !name.trim()) continue;
    if (!isVerifiedSkillSource(source) || typeof issued_at !== "string") continue;
    if (!bySlug.has(slug)) bySlug.set(slug, { slug, name: name.trim(), source, issuedAt: issued_at });
  }
  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Rows read straight from `verified_skills` with the skill embedded
 * (`skill:skills(slug, name)`). RLS already hides revoked rows from anyone
 * but the holder and admins, so revoked ones are dropped here too.
 */
export type VerifiedSkillRow = {
  id: string;
  source: string;
  issued_at: string;
  revoked_at?: string | null;
  skill: { slug: string; name: string } | null;
};

export function fromVerifiedSkillRows(rows: VerifiedSkillRow[]): (VerifiedSkill & { id: string })[] {
  return rows
    .flatMap((r) =>
      r.skill && !r.revoked_at && isVerifiedSkillSource(r.source)
        ? [{ id: r.id, slug: r.skill.slug, name: r.skill.name, source: r.source, issuedAt: r.issued_at }]
        : [],
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function formatIssued(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "Africa/Accra" }).format(new Date(iso));
}
