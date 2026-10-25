/** Ghana's 16 regions. Slugs match the profiles.region check constraint. */
export const REGIONS = [
  { slug: "ahafo", label: "Ahafo" },
  { slug: "ashanti", label: "Ashanti" },
  { slug: "bono", label: "Bono" },
  { slug: "bono_east", label: "Bono East" },
  { slug: "central", label: "Central" },
  { slug: "eastern", label: "Eastern" },
  { slug: "greater_accra", label: "Greater Accra" },
  { slug: "north_east", label: "North East" },
  { slug: "northern", label: "Northern" },
  { slug: "oti", label: "Oti" },
  { slug: "savannah", label: "Savannah" },
  { slug: "upper_east", label: "Upper East" },
  { slug: "upper_west", label: "Upper West" },
  { slug: "volta", label: "Volta" },
  { slug: "western", label: "Western" },
  { slug: "western_north", label: "Western North" },
] as const;

export type RegionSlug = (typeof REGIONS)[number]["slug"];

export function isRegionSlug(value: string): value is RegionSlug {
  return REGIONS.some((r) => r.slug === value);
}

export function regionLabel(slug: string | null) {
  return REGIONS.find((r) => r.slug === slug)?.label ?? null;
}
