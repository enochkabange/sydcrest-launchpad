import type { DmpTrack } from "./curriculum";

/**
 * Which roadmap lessons teach each DMP specialisation week (issue #198).
 *
 * `lessons` are SydCrest's own lessons in the companion roadmap
 * `digital-marketing-specialisations`, in teaching order; week 7 also opens
 * with the specialisation's section lesson. `refreshers` are the existing
 * Digital Marketer topics the phase 2 DMP seed already links to that week;
 * they stay linked as background reading. A data migration links both into
 * program_week_nodes (lessons first, then refreshers).
 */

export const SPECIALISATION_ROADMAP = "digital-marketing-specialisations";
export const DIGITAL_MARKETER_ROADMAP = "digital-marketer";

export type SpecialisationWeek = 7 | 8 | 9;
export const SPECIALISATION_WEEKS: readonly SpecialisationWeek[] = [7, 8, 9];

export type WeekLessons = {
  /** Node slugs in the digital-marketing-specialisations roadmap. */
  lessons: string[];
  /** Node slugs in the digital-marketer roadmap (already linked by the seed). */
  refreshers: string[];
};

export const WEEK_LESSONS: Record<DmpTrack, Record<SpecialisationWeek, WeekLessons>> = {
  seo: {
    7: { lessons: ["seo-content", "keyword-research", "search-intent", "on-page-seo"], refreshers: ["seo-basics", "copywriting"] },
    8: { lessons: ["backlinks", "local-seo", "listings-and-outreach"], refreshers: ["google-business-profile", "seo-basics"] },
    9: { lessons: ["content-pillars", "faqs-and-multimedia", "seo-strategy-plan"], refreshers: ["content-calendar", "copywriting"] },
  },
  social_media: {
    7: {
      lessons: ["social-media-marketing", "social-campaign-structure", "audience-targeting", "social-budgets-and-testing"],
      refreshers: ["social-ads", "budgets-in-cedis"],
    },
    8: {
      lessons: ["social-storytelling", "video-scripting-and-shooting", "video-editing-and-captions"],
      refreshers: ["short-video", "graphics-and-photos"],
    },
    9: {
      lessons: ["community-building", "micro-influencers", "influencer-collaborations"],
      refreshers: ["community-management", "know-your-audience"],
    },
  },
  google_ads: {
    7: { lessons: ["google-ads", "google-ads-auction", "campaign-types-and-goals", "account-structure"], refreshers: ["search-ads"] },
    8: {
      lessons: ["keywords-and-match-types", "responsive-search-ads", "assets-and-landing-pages"],
      refreshers: ["search-ads", "copywriting"],
    },
    9: {
      lessons: ["budgets-and-bidding", "reading-campaign-data", "optimising-campaigns"],
      refreshers: ["budgets-in-cedis", "analytics"],
    },
  },
};

/** One week's links in the program_week_nodes shape the DMP seed uses. */
export function weekNodeLinks(track: DmpTrack, week: SpecialisationWeek): { roadmap_slug: string; node_slug: string }[] {
  const { lessons, refreshers } = WEEK_LESSONS[track][week];
  return [
    ...lessons.map((node_slug) => ({ roadmap_slug: SPECIALISATION_ROADMAP, node_slug })),
    ...refreshers.map((node_slug) => ({ roadmap_slug: DIGITAL_MARKETER_ROADMAP, node_slug })),
  ];
}

export const BRIDGE_ROADMAP = "digital-skills-bridge";

export type SharedWeek = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 11 | 12;
export const SHARED_WEEKS: readonly SharedWeek[] = [1, 2, 3, 4, 5, 6, 10, 11, 12];

type Link = { roadmap_slug: string; node_slug: string };
const bridge = (node_slug: string): Link => ({ roadmap_slug: BRIDGE_ROADMAP, node_slug });
const marketer = (node_slug: string): Link => ({ roadmap_slug: DIGITAL_MARKETER_ROADMAP, node_slug });

/**
 * SydCrest lessons for the shared weeks (issue #239), 2 to 5 per week in
 * teaching order. Weeks 1 to 3 draw on the Digital Skills Bridge, weeks 3
 * onwards on the Digital Marketer roadmap; both now have full lessons. A data
 * migration links them into program_week_nodes.
 */
export const SHARED_WEEK_LINKS: Record<SharedWeek, Link[]> = {
  1: [bridge("computer-access"), bridge("mouse-and-keyboard"), bridge("files-on-your-phone"), bridge("email-account"), bridge("spotting-scams")],
  2: [bridge("typing"), bridge("clear-english"), bridge("money-records")],
  3: [
    bridge("passwords-and-two-step"),
    bridge("privacy-and-shared-phones"),
    bridge("searching-well"),
    marketer("facebook-instagram"),
    marketer("email-marketing"),
  ],
  4: [marketer("customer-journey"), marketer("channels-overview"), marketer("seo-basics"), marketer("copywriting"), marketer("google-business-profile")],
  5: [marketer("know-your-audience"), marketer("content-calendar"), marketer("graphics-and-photos"), marketer("community-management")],
  6: [marketer("measurement"), marketer("analytics"), marketer("social-ads"), marketer("client-reporting")],
  10: [marketer("campaign-plan"), marketer("channels-overview"), marketer("content-calendar"), marketer("budgets-in-cedis")],
  11: [marketer("portfolio"), marketer("job-applications"), marketer("freelancing")],
  12: [marketer("campaign-plan"), marketer("client-reporting"), marketer("portfolio")],
};
