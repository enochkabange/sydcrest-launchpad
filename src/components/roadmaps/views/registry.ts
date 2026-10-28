import { JourneyView } from "./journey-view";
import { MapView } from "./map-view";
import { OutlineView } from "./outline-view";
import type { RoadmapViewDefinition } from "./types";

/**
 * Every way a roadmap can be drawn. The switcher lists them in this order and
 * remembers the learner's choice per device by `id`. Until the learner
 * chooses, the view whose `auto` matches the width shows (CSS only, so there
 * is no layout shift): the map from md, the journey below. To add a view:
 * write a component that takes RoadmapViewProps, add it here. See
 * docs/roadmap-views.md.
 */
export const ROADMAP_VIEWS: readonly RoadmapViewDefinition[] = [
  { id: "map", label: "Map", Component: MapView, auto: "wide" },
  { id: "outline", label: "List", Component: OutlineView },
  { id: "journey", label: "Journey", Component: JourneyView, auto: "narrow" },
];
