/**
 * Browse categories for the expert market. `expert_profiles.categories`
 * stores these slugs (up to five per expert) and the app owns the list
 * (see the column comment in the earn_experts migration). The expert
 * application form (#149) and the directory (#150) both read this list, so
 * add a category here, never in a screen. Slugs are stable once used.
 */
export const EXPERT_CATEGORIES = [
  { slug: "software", label: "Software development" },
  { slug: "data", label: "Data and analytics" },
  { slug: "design", label: "Design" },
  { slug: "marketing", label: "Digital marketing and content" },
  { slug: "it-cloud", label: "IT support, cloud and networking" },
  { slug: "cybersecurity", label: "Cybersecurity" },
  { slug: "product-business", label: "Product and business" },
  { slug: "ai-tools", label: "AI tools for work" },
  { slug: "careers", label: "Careers and job search" },
] as const;

/** The list as checkbox options for the expert application and profile forms. */
export const EXPERT_CATEGORY_OPTIONS = EXPERT_CATEGORIES.map((c) => ({ value: c.slug, label: c.label }));

export type ExpertCategory = (typeof EXPERT_CATEGORIES)[number]["slug"];

export function isExpertCategory(value: string): value is ExpertCategory {
  return EXPERT_CATEGORIES.some((c) => c.slug === value);
}

/** The label for a category slug, or null for a slug the app no longer lists. */
export function categoryLabel(slug: string): string | null {
  return EXPERT_CATEGORIES.find((c) => c.slug === slug)?.label ?? null;
}
