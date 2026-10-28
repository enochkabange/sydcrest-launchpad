// RoadmapProgress: the progress summary at the top of a roadmap.
import * as React from "react";
import { RoadmapProgress } from "sydcrest-launchpad";
import { ALL_DONE, PARTWAY, viewWith, visitorView } from "./_roadmap";

/** Visitor (signed out, no progress) */
export const Visitor = () => <RoadmapProgress view={visitorView} />;
/** Signed in, not started */
export const NotStarted = () => <RoadmapProgress view={viewWith({})} />;
/** Partway */
export const Partway = () => <RoadmapProgress view={viewWith(PARTWAY)} />;
/** Complete */
export const Complete = () => <RoadmapProgress view={viewWith(ALL_DONE)} />;
