/**
 * Draft roadmap outlines for founder review (issue #43).
 *
 * Every outline here is original SydCrest content, written from first
 * principles for Ghanaian learners. Nothing is copied or adapted from
 * roadmap.sh or any other roadmap site.
 *
 * The shape mirrors the planned `roadmaps`, `roadmap_nodes` and
 * `node_resources` tables (08_TECHNICAL_BUILD.md §3) so the admin editor can
 * import these later: `parent` becomes `parent_id`, array order becomes
 * `position`, `optional` becomes `is_optional`, and the optional `kind` and
 * `choice_group` carry over as they are.
 */

export type ResourceKind = "article" | "video" | "practice";

export type ResourceDraft = {
  label: string;
  /** https only; free, reputable, works on a phone. */
  url: string;
  kind: ResourceKind;
};

/**
 * What a node means on the roadmap. Leave it out to derive it from the tree:
 * a top level node is a section, anything below it is a topic.
 */
export type NodeKind = "section" | "topic" | "checkpoint";

/** How hard a topic is for someone who has done the topics before it (issue #255). */
export type Difficulty = "beginner" | "intermediate" | "advanced";

/** How much there is to hold in your head at once, 1 (one simple idea) to 5 (many moving parts). */
export type Complexity = 1 | 2 | 3 | 4 | 5;

/**
 * Where a section sits on the way to work: foundation (before any job),
 * junior (first job), mid (a few years in) or specialist (a focus you grow into).
 */
export type CareerLevel = "foundation" | "junior" | "mid" | "specialist";

export type NodeDraft = {
  /** Unique within its roadmap; kebab case. */
  slug: string;
  title: string;
  /** Two plain sentences, no dashes. */
  summary: string;
  /** Slug of the parent section, or null for a top level section. Parents come before children. */
  parent: string | null;
  optional: boolean;
  /** Optional; derived from the tree when left out (see NodeKind). */
  kind?: NodeKind;
  /**
   * Optional slug style key. Siblings sharing it are "pick one of these"
   * alternatives (for example "spreadsheet-tool" on Excel and Google Sheets).
   */
  choice_group?: string;
  resources: ResourceDraft[];
  /** Every node (sections have lessons too). Judged from the lesson and its place in the track. */
  difficulty?: Difficulty;
  complexity?: Complexity;
  /** Sections only (parent null). */
  careerLevel?: CareerLevel;
  /**
   * Sections only. Job titles (no salaries) that appear in this track's
   * src/content/research/<track>.md adverts and fit this level. Empty when none fit.
   */
  jobs?: string[];
};

export type RoadmapTrack =
  | "frontend"
  | "backend"
  | "data"
  | "digital-marketing"
  | "ui-ux"
  | "product"
  | "digital-skills-bridge"
  | "ai-tools-for-work"
  | "graphic-design"
  | "virtual-assistant"
  | "digital-business"
  | "it-support"
  | "content-creation"
  | "cybersecurity"
  | "mobile-app-developer"
  | "cloud-devops"
  | "software-testing"
  | "ai-ml"
  | "no-code"
  | "customer-service"
  | "digital-sales"
  | "excel-power-bi"
  | "social-media-management"
  | "freelancing"
  | "project-management"
  | "data-science"
  | "digital-marketing-specialisations";

/** Coarse grouping for browsing; not yet fixed in the schema, founder to confirm. */
export type FieldCategory =
  | "software"
  | "data"
  | "marketing"
  | "design"
  | "product"
  | "foundations"
  | "business"
  | "creative"
  | "infrastructure"
  | "security"
  | "ai";

/**
 * Who a roadmap is for, for the roadmap index filter: first-steps (new to
 * digital tools), beginner (no tech experience needed), next-step (best
 * after another track).
 */
export type RoadmapLevel = "first-steps" | "beginner" | "next-step";

export type RoadmapDraft = {
  slug: string;
  title: string;
  description: string;
  track: RoadmapTrack;
  field_category: FieldCategory;
  level: RoadmapLevel;
  /**
   * Tracks a learner can move on to after this one ("Leads to"). "Builds on"
   * is derived as the inverse (src/lib/roadmaps/links.ts), never written.
   */
  leads_to: readonly RoadmapTrack[];
  locale: "en-GH";
  status: "draft";
  nodes: NodeDraft[];
};
