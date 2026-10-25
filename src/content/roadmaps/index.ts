import { backend } from "./backend";
import { data } from "./data";
import { digitalBusiness } from "./digital-business";
import { digitalMarketing } from "./digital-marketing";
import { digitalSkillsBridge } from "./digital-skills-bridge";
import { frontend } from "./frontend";
import { product } from "./product";
import type { RoadmapDraft } from "./types";
import { uiUx } from "./ui-ux";

export type { NodeDraft, ResourceDraft, RoadmapDraft } from "./types";

/**
 * Draft roadmap outlines for founder review (issue #43). Ordered with the
 * bridge first because it is the entry point for complete beginners.
 * Not yet imported into the database; the admin editor issue owns that.
 */
export const ROADMAP_DRAFTS: RoadmapDraft[] = [
  digitalSkillsBridge,
  digitalMarketing,
  frontend,
  backend,
  data,
  uiUx,
  product,
  digitalBusiness,
];
