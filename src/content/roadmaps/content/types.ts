import type { GeneratedContent } from "@/lib/content-generation/schema";

/**
 * Hand written (in session) lesson content for one roadmap track, keyed by node
 * slug. Same shape the Batch API generator produces, so the admin import can
 * write either into node_content, node_quiz and node_quiz_answers.
 */
export type TrackContent = {
  /** Must match the `slug` of a roadmap in src/content/roadmaps. */
  roadmap: string;
  nodes: Record<string, GeneratedContent>;
};
