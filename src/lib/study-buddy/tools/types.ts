/**
 * What the companion tools read about the signed in learner and the app.
 * The Supabase implementation (data.ts) reads through the learner's own
 * client, so RLS scopes every row; tests pass a fake.
 */

export type LearnerContext = {
  /** Roadmap track slug from the learner's latest path, or null before the path quiz. */
  track: string | null;
  roadmap: { slug: string; title: string } | null;
  /** The next step the path quiz suggested, if any. */
  pathNextAction: { label: string; href: string | null } | null;
  region: string | null;
  skills: string[];
  verifiedSkills: string[];
  chapters: { id: string; slug: string; name: string }[];
  /** Topics done and in total on the path roadmap (null without one). */
  progress: { done: number; inProgress: number; total: number } | null;
  /** The next unfinished topics on the path roadmap, in roadmap order. */
  nextTopics: { title: string; slug: string; status: "not_started" | "in_progress" }[];
};

export type ExpertRow = {
  slug: string | null;
  display_name: string | null;
  headline: string | null;
  skills: string[] | null;
  categories: string[] | null;
  region: string | null;
  accepting_requests: boolean | null;
  offers_free_intro: boolean | null;
  completed_bookings: number | null;
  review_count: number | null;
  average_rating: number | null;
  is_featured: boolean | null;
  verified_skills: unknown;
};

export type OpportunityRow = {
  slug: string;
  title: string;
  kind: string;
  organisation_name: string;
  summary: string | null;
  deadline: string | null;
  location: string | null;
  region: string | null;
  is_remote: boolean;
  tracks: string[];
  skills: string[];
  compensation_note: string | null;
};

export type EventRow = {
  slug: string;
  title: string;
  kind: string;
  format: string;
  summary: string | null;
  starts_at: string;
  city: string | null;
  region: string | null;
  chapter_id: string | null;
  seats_left: number | null;
};

export type CompanionData = {
  learner(): Promise<LearnerContext>;
  experts(): Promise<ExpertRow[]>;
  opportunities(): Promise<OpportunityRow[]>;
  events(): Promise<EventRow[]>;
};
