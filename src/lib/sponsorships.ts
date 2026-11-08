/**
 * Sponsorships (#307): labels and wording shared by the sponsor's Impact tab
 * and the admin page. The database (sponsorship_impact) hides any count under
 * five; this turns that null into words.
 */

export const SPONSOR_TIERS = [
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "bronze", label: "Bronze" },
  { value: "partner", label: "Partner" },
] as const;

export const SPONSOR_SCOPES = [
  { value: "programme", label: "Programme" },
  { value: "cohort", label: "Cohort" },
  { value: "chapter", label: "Chapter" },
] as const;

export function tierLabel(tier: string) {
  return SPONSOR_TIERS.find((t) => t.value === tier)?.label ?? tier;
}

/** A total, or "Fewer than 5" when the database held it back to protect privacy. */
export function impactCount(value: number | null) {
  return value === null ? "Fewer than 5" : new Intl.NumberFormat("en-GB").format(value);
}
