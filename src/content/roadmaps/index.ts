import { backend } from "./backend";
import { data } from "./data";
import { digitalMarketing } from "./digital-marketing";
import { digitalSkillsBridge } from "./digital-skills-bridge";
import { frontend } from "./frontend";
import { product } from "./product";
import { aiToolsForWork } from "./ai-tools-for-work";
import { graphicDesign } from "./graphic-design";
import { digitalBusiness } from "./digital-business";
import { itSupport } from "./it-support";
import { contentCreation } from "./content-creation";
import { cybersecurity } from "./cybersecurity";
import { virtualAssistant } from "./virtual-assistant";
import { mobileAppDeveloper } from "./mobile-app-developer";
import type { RoadmapDraft } from "./types";
import { uiUx } from "./ui-ux";

export type { NodeDraft, ResourceDraft, RoadmapDraft } from "./types";

/**
 * Draft roadmap outlines for founder review (issue #43). Ordered with the
 * bridge first because it is the entry point for complete beginners.
 * Imported into the database by /admin/roadmaps, Import draft roadmaps.
 */
export const ROADMAP_DRAFTS: RoadmapDraft[] = [
  digitalSkillsBridge,
  digitalMarketing,
  frontend,
  backend,
  data,
  uiUx,
  product,
  aiToolsForWork,
  graphicDesign,
  digitalBusiness,
  itSupport,
  contentCreation,
  cybersecurity,
  virtualAssistant,
  mobileAppDeveloper,
];
