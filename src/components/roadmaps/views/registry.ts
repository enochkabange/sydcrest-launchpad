import { MapView } from "./map-view";
import { OutlineView } from "./outline-view";
import type { RoadmapViewDefinition } from "./types";

/**
 * Every way a roadmap can be drawn. The first entry is the default; the
 * switcher lists them in this order and remembers the learner's choice per
 * device by `id`. To add a view: write a component that takes
 * RoadmapViewProps, add it here. See docs/roadmap-views.md.
 */
export const ROADMAP_VIEWS: readonly RoadmapViewDefinition[] = [
  { id: "map", label: "Map", Component: MapView },
  { id: "outline", label: "List", Component: OutlineView },
];
