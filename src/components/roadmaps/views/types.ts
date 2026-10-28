import type { ComponentType } from "react";
import type { RoadmapView } from "@/lib/roadmaps/view-model";

/** What every roadmap renderer receives. Renderers draw from `view` only. */
export type RoadmapViewProps = {
  /** The roadmap's slug, for building node links. */
  slug: string;
  /**
   * The prerendered structure (statuses are null). For learner state, read
   * `liveView(view)` inside a <Suspense> island; never await it at the top.
   */
  view: RoadmapView;
};

export type RoadmapViewDefinition = {
  /** Stable id, stored on the device as the learner's choice. */
  id: string;
  /** The switcher's button label. */
  label: string;
  Component: ComponentType<RoadmapViewProps>;
  /**
   * Shown before the learner picks a view: "wide" from md, "narrow" below.
   * Exactly one view has each.
   */
  auto?: "wide" | "narrow";
};
