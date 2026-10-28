// OutlineView: the roadmap as section cards, inside its RoadmapUi provider.
import * as React from "react";
import { OutlineView } from "sydcrest-launchpad";
import { ROADMAP_SLUG, PARTWAY, WithRoadmapUi, viewWith, visitorView } from "./_roadmap";

/** Visitor (no progress) */
export const Visitor = () => (
  <WithRoadmapUi view={visitorView}>
    <OutlineView slug={ROADMAP_SLUG} view={visitorView} />
  </WithRoadmapUi>
);

/** Learner partway through */
export const LearnerPartway = () => {
  const view = viewWith(PARTWAY);
  return (
    <WithRoadmapUi view={view}>
      <OutlineView slug={ROADMAP_SLUG} view={view} />
    </WithRoadmapUi>
  );
};
