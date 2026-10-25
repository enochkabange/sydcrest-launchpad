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
 * `position`, `optional` becomes `is_optional`.
 */

export type ResourceKind = "article" | "video" | "practice";

export type ResourceDraft = {
  label: string;
  /** https only; free, reputable, works on a phone. */
  url: string;
  kind: ResourceKind;
};

export type NodeDraft = {
  /** Unique within its roadmap; kebab case. */
  slug: string;
  title: string;
  /** Two plain sentences, no dashes. */
  summary: string;
  /** Slug of the parent section, or null for a top level section. Parents come before children. */
  parent: string | null;
  optional: boolean;
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
  | "it-support";

/** Coarse grouping for browsing; not yet fixed in the schema, founder to confirm. */
export type FieldCategory =
  | "software"
  | "data"
  | "marketing"
  | "design"
  | "product"
  | "foundations"
  | "infrastructure";

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
