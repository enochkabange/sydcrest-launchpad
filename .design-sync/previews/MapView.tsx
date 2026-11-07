// MapView: the roadmap as a vertical journey map, inside its RoadmapUi provider.
import * as React from "react";
import { MapView } from "sydcrest-launchpad";
import { ROADMAP_SLUG, PARTWAY, WithRoadmapUi, viewWith, visitorView } from "./_roadmap";

/** Visitor (no progress) */
export const VisitorNoProgress = () => (
  <WithRoadmapUi view={visitorView}>
    <MapView slug={ROADMAP_SLUG} view={visitorView} />
  </WithRoadmapUi>
);

/** Learner partway through */
export const LearnerPartway = () => {
  const view = viewWith(PARTWAY);
  return (
    <WithRoadmapUi view={view}>
      <MapView slug={ROADMAP_SLUG} view={view} />
    </WithRoadmapUi>
  );
};
