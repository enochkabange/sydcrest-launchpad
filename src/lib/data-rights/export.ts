/**
 * "Download my data" (issue #333, Ghana Data Protection Act, Act 843): the
 * shape of the file a member downloads from /profile/data. Pure, so the shape
 * is unit tested; src/lib/data-rights/collect.ts fills it with the member's
 * own rows, read through their own session (RLS).
 */

/** Every section of the file, in the order it is written. */
export const EXPORT_SECTIONS = [
  "profile",
  "about_you",
  "learner_attributes",
  "first_touch",
  "progress",
  "submissions",
  "certificates",
  "verified_skills",
  "external_credentials",
  "programme_applications",
  "cohort_memberships",
  "chapter_memberships",
  "opportunity_applications",
  "outcomes",
  "consents",
  "deletion_requests",
] as const;

export type ExportSection = (typeof EXPORT_SECTIONS)[number];

/** Sections that hold one row (or none); the rest are lists. */
const SINGLE: ReadonlySet<ExportSection> = new Set(["profile", "about_you", "learner_attributes", "first_touch"]);

export const EXPORT_FORMAT = "sydcrest-my-data";
export const EXPORT_VERSION = 1;

/** What the file says about itself, in plain words. */
export const EXPORT_NOTES = [
  "This is the personal data SydCrest Launchpad holds about you, as of generated_at.",
  "Submissions list what you sent and how it was graded; the work itself and any files stay in your account.",
  "Your activity on the site is summarised in learner_attributes. Raw activity events are kept for 13 months and are not linked to you once your account is deleted.",
  "A section listed under missing could not be read just now. Download again later, or contact us.",
];

export type ExportInput = {
  generatedAt: Date;
  account: { id: string; email: string | null };
  /** Rows per section; a section that failed to load is undefined. */
  sections: Partial<Record<ExportSection, unknown[] | null>>;
};

export type DataExport = {
  format: typeof EXPORT_FORMAT;
  version: typeof EXPORT_VERSION;
  generated_at: string;
  account: { id: string; email: string | null };
  notes: string[];
  missing: ExportSection[];
  data: Record<ExportSection, unknown>;
};

/**
 * Builds the file. Single row sections become an object or null, list
 * sections an array (empty when there is nothing). A section that failed is
 * null and named in `missing`, so a partial file never looks complete.
 */
export function buildExport({ generatedAt, account, sections }: ExportInput): DataExport {
  const missing: ExportSection[] = [];
  const data = {} as Record<ExportSection, unknown>;
  for (const key of EXPORT_SECTIONS) {
    const rows = sections[key];
    if (rows === undefined || rows === null) {
      missing.push(key);
      data[key] = null;
    } else if (SINGLE.has(key)) {
      data[key] = rows[0] ?? null;
    } else {
      data[key] = rows;
    }
  }
  return {
    format: EXPORT_FORMAT,
    version: EXPORT_VERSION,
    generated_at: generatedAt.toISOString(),
    account,
    notes: EXPORT_NOTES,
    missing,
    data,
  };
}

/** The download's file name: sydcrest-my-data-2026-11-14.json. */
export function exportFileName(generatedAt: Date): string {
  return `${EXPORT_FORMAT}-${generatedAt.toISOString().slice(0, 10)}.json`;
}
