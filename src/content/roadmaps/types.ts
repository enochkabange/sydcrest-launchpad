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
  | "data-science";

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

export type RoadmapDraft = {
  slug: string;
  title: string;
  description: string;
  track: RoadmapTrack;
  field_category: FieldCategory;
  locale: "en-GH";
  status: "draft";
  nodes: NodeDraft[];
};
