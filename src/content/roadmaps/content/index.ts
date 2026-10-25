import type { TrackContent } from "./types";
import frontend from "./frontend.content";
import digitalMarketing from "./digital-marketing.content";
import product from "./product.content";
import data from "./data.content";
import uiUx from "./ui-ux.content";
import digitalSkillsBridge from "./digital-skills-bridge.content";
import backend from "./backend.content";

/**
 * Lesson content imported by /admin/roadmaps "Import draft roadmaps". Add each
 * track's *.content.ts here when its PR merges (the Vitest in this folder
 * validates every file whether or not it is listed).
 */
export const TRACK_CONTENT: TrackContent[] = [frontend, digitalMarketing, product, data, uiUx, digitalSkillsBridge, backend];
