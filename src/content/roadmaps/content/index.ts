import aiToolsForWork from "./ai-tools-for-work.content";
import graphicDesign from "./graphic-design.content";
import digitalBusiness from "./digital-business.content";
import itSupport from "./it-support.content";
import contentCreation from "./content-creation.content";
import cybersecurity from "./cybersecurity.content";
import virtualAssistant from "./virtual-assistant.content";
import mobileAppDeveloper from "./mobile-app-developer.content";
import type { TrackContent } from "./types";
import frontend from "./frontend.content";
import digitalMarketing from "./digital-marketing.content";
import product from "./product.content";
import data from "./data.content";
import uiUx from "./ui-ux.content";
import digitalSkillsBridge from "./digital-skills-bridge.content";
import backend from "./backend.content";
import customerService from "./customer-service.content";
import excelPowerBi from "./excel-power-bi.content";
import digitalMarketingSpecialisations from "./digital-marketing-specialisations.content";
import socialMediaManagement from "./social-media-management.content";
import projectManagement from "./project-management.content";
import freelancing from "./freelancing.content";
import cloudDevops from "./cloud-devops.content";
import softwareTesting from "./software-testing.content";
import aiMl from "./ai-ml.content";
import dataScience from "./data-science.content";
import digitalSales from "./digital-sales.content";
import noCode from "./no-code.content";

/**
 * Lesson content imported by /admin/roadmaps "Import draft roadmaps". Every
 * track now has full lessons; a new track's *.content.ts is added here when its
 * PR merges (the Vitest in this folder validates every file whether or not it
 * is listed).
 */
export const TRACK_CONTENT: TrackContent[] = [
  frontend,
  digitalMarketing,
  product,
  data,
  uiUx,
  digitalSkillsBridge,
  backend,
  aiToolsForWork,
  graphicDesign,
  digitalBusiness,
  itSupport,
  contentCreation,
  cybersecurity,
  virtualAssistant,
  mobileAppDeveloper,
  customerService,
  excelPowerBi,
  digitalMarketingSpecialisations,
  socialMediaManagement,
  projectManagement,
  freelancing,
  cloudDevops,
  softwareTesting,
  aiMl,
  dataScience,
  digitalSales,
  noCode,
];
