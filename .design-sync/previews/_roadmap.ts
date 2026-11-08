// Shared roadmap sample for the roadmap previews: the first three sections of the
// repo's own Data Analyst roadmap (src/content/roadmaps/data.ts), turned into a
// view with the repo's own view model. No time estimates: none are invented.
import * as React from "react";
import type { ReactNode } from "react";
import { data } from "@/content/roadmaps/data";
import { RoadmapUi, roadmapViewOf, withProgress } from "sydcrest-launchpad";

const SECTIONS = ["foundations", "spreadsheets", "field-data"];
const nodes = data.nodes
  .filter((n) => SECTIONS.includes(n.slug) || (n.parent !== null && SECTIONS.includes(n.parent)))
  .map((n, i) => ({
    id: `n-${n.slug}`,
    parent_id: n.parent ? `n-${n.parent}` : null,
    slug: n.slug,
    title: n.title,
    summary: n.summary,
    position: i,
    is_optional: n.optional,
    kind: n.kind ?? null,
    choice_group: n.choice_group ?? null,
    difficulty: n.difficulty ?? null,
    complexity: n.complexity ?? null,
    career_level: n.careerLevel ?? null,
    jobs: n.jobs ?? null,
  }));

export const ROADMAP_SLUG = data.slug;
export const visitorView = roadmapViewOf({ nodes });
type Status = "not_started" | "in_progress" | "done";
export const viewWith = (statuses: Record<string, Status>) =>
  withProgress(visitorView, new Map(Object.entries(statuses).map(([slug, s]) => [`n-${slug}`, s])));
export const PARTWAY: Record<string, Status> = {
  foundations: "done",
  "statistics-basics": "done",
  "tidy-data": "done",
  spreadsheets: "in_progress",
  "spreadsheet-formulas": "in_progress",
};
export const ALL_DONE: Record<string, Status> = Object.fromEntries(nodes.map((n) => [n.slug, "done" as Status]));

/** The provider every roadmap view sits inside on a roadmap page. */
export function WithRoadmapUi({ view, children }: { view: typeof visitorView; children: ReactNode }) {
  const sectionOf = Object.fromEntries(Object.values(view.byId).map((n) => [n.id, n.sectionId]));
  return React.createElement(
    RoadmapUi,
    { slug: ROADMAP_SLUG, sectionIds: view.sections.map((s) => s.node.id), sectionOf },
    children,
  );
}
