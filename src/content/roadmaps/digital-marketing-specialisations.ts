import { RES as SHARED } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

/**
 * Official help pages used only by this roadmap, kept here so the shared pool
 * in resources.ts stays untouched. Every URL was checked to resolve on
 * 27 October 2026.
 */
const RES = {
  ...SHARED,
  googleTrends: r("Google Trends", "https://trends.google.com/", "practice"),
  helpfulContent: r("Google Search: Creating helpful content", "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"),
  titleLinks: r("Google Search: Title links", "https://developers.google.com/search/docs/appearance/title-link"),
  spamPolicies: r("Google Search: Spam policies", "https://developers.google.com/search/docs/essentials/spam-policies"),
  qualifyLinks: r("Google Search: Qualify your outbound links", "https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links"),
  localRanking: r("Google Business Profile Help: Improve your local ranking", "https://support.google.com/business/answer/7091"),
  imageSeo: r("Google Search: Image SEO best practices", "https://developers.google.com/search/docs/appearance/google-images"),
  videoSeo: r("Google Search: Video SEO best practices", "https://developers.google.com/search/docs/appearance/video"),
  gscHelp: r("Search Console Help", "https://support.google.com/webmasters"),
  metaAdsHelp: r("Meta Business Help Center", "https://www.facebook.com/business/help"),
  metaObjectives: r("Meta Business Help: Choose the right ad objective", "https://www.facebook.com/business/help/1438417719786914"),
  youtubeShorts: r("YouTube Help: Shorts", "https://support.google.com/youtube/answer/15424877"),
  igPaidPartnership: r("Instagram Help: Use the paid partnership label", "https://help.instagram.com/1109894795810258"),
  tiktokDisclosure: r("TikTok Help: Promoting a brand, product or service", "https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/promoting-a-brand-product-or-service"),
  adRank: r("Google Ads Help: About Ad Rank", "https://support.google.com/google-ads/answer/1752122"),
  qualityScore: r("Google Ads Help: About Quality Score", "https://support.google.com/google-ads/answer/6167118"),
  campaignTypes: r("Google Ads Help: Choose a campaign type", "https://support.google.com/google-ads/answer/2567043"),
  matchTypes: r("Google Ads Help: Keyword match types", "https://support.google.com/google-ads/answer/7478529"),
  rsaHelp: r("Google Ads Help: Responsive search ads", "https://support.google.com/google-ads/answer/7684791"),
  adsBudget: r("Google Ads Help: Average daily budgets", "https://support.google.com/google-ads/answer/2375420"),
  bidStrategies: r("Google Ads Help: Bid strategy types", "https://support.google.com/google-ads/answer/2472725"),
};

/**
 * Companion to the Digital Marketer roadmap for the Delta Mentoring Program
 * (issue #198). Weeks 7 to 9 of the DMP fork into three specialisations; each
 * section here teaches one of them, three lessons per week, in week order.
 * Evidence for every node: src/content/research/digital-marketing-specialisations.md.
 * Week to lesson mapping: src/content/dmp/week-lessons.ts.
 */
export const digitalMarketingSpecialisations: RoadmapDraft = {
  slug: "digital-marketing-specialisations",
  title: "Digital Marketing Specialisations",
  description:
    "Go deeper in one area of digital marketing after the foundations: search engine optimisation and content, social media advertising and video, or Google search ads. Each specialisation is taught in full with Ghanaian examples and practice you can do with free tools.",
  track: "digital-marketing-specialisations",
  field_category: "marketing",
  locale: "en-GH",
  status: "draft",
  nodes: [
    // SEO and content marketing
    {
      slug: "seo-content",
      title: "SEO and content marketing",
      summary:
        "Help a business get found on search engines without paying for each visit. You will research what people search for, improve pages, earn links and plan content that keeps working for months.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "specialist",
      jobs: ["SEO and Content Marketing Specialist", "SEO Specialist", "Search Engine Optimization Specialist"],
      resources: [RES.seoStarter],
    },
    {
      slug: "keyword-research",
      title: "Keyword research with free tools",
      summary:
        "Find the words real customers type when they look for what a business sells. You will use search suggestions, related searches and trend tools that cost nothing.",
      parent: "seo-content",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.seoStarter, RES.googleTrends],
    },
    {
      slug: "search-intent",
      title: "Search intent and keyword mapping",
      summary:
        "Work out what a searcher actually wants and match each keyword to the one page that answers it best. This stops pages competing with each other and keeps every page focused.",
      parent: "seo-content",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.helpfulContent],
    },
    {
      slug: "on-page-seo",
      title: "On page SEO",
      summary:
        "Improve a page so both people and search engines understand it: the title, the main heading, the opening, the links and the images. You will rewrite a real page using your keyword map.",
      parent: "seo-content",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.seoStarter, RES.titleLinks],
    },
    {
      slug: "backlinks",
      title: "Backlinks and trust",
      summary:
        "Learn why links from other websites help a page and which kinds of links help or harm. You will spot honest ways a Ghanaian business can earn links.",
      parent: "seo-content",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.spamPolicies, RES.qualifyLinks],
    },
    {
      slug: "local-seo",
      title: "Local SEO",
      summary:
        "Help a business show up when people nearby search for it. You will work on relevance, distance and prominence, and keep its name, address and phone number the same everywhere.",
      parent: "seo-content",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.localRanking, RES.googleBusiness],
    },
    {
      slug: "listings-and-outreach",
      title: "Local listings and outreach",
      summary:
        "Find directories, associations and local blogs where a business can be listed or mentioned. Then write short, polite outreach emails that people want to answer.",
      parent: "seo-content",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.spamPolicies],
    },
    {
      slug: "content-pillars",
      title: "Content pillars and topic clusters",
      summary:
        "Organise content around a few big topics the business knows well, with smaller pages linked to each. This shows search engines and readers that the business is a reliable source.",
      parent: "seo-content",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.helpfulContent],
    },
    {
      slug: "faqs-and-multimedia",
      title: "FAQs, images and video for search",
      summary:
        "Turn the questions customers already ask into pages, and make images and videos easy for search engines to find. Good answers to real questions are some of the most useful content a small business can publish.",
      parent: "seo-content",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.imageSeo, RES.videoSeo],
    },
    {
      slug: "seo-strategy-plan",
      title: "Your SEO content calendar and strategy",
      summary:
        "Bring keywords, pages, links and content together in a calendar and a one page strategy. This is the plan you present at the end of the specialisation.",
      parent: "seo-content",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.gscHelp],
    },

    // Social media marketing
    {
      slug: "social-media-marketing",
      title: "Social media marketing",
      summary:
        "Go beyond posting to run paid campaigns, make short videos that tell a story and grow a loyal community. This specialisation suits people who enjoy people, pictures and quick feedback.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "specialist",
      jobs: ["Social Media Manager / Digital Marketer", "Digital Ads and Social Media Specialist", "Social Media Team Lead"],
      resources: [RES.metaLearn],
    },
    {
      slug: "social-campaign-structure",
      title: "Campaigns, ad sets and ads",
      summary:
        "Learn how a social ad campaign is built in three layers and which objective fits which goal. Choosing the right objective is the first decision that shapes everything after it.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.metaLearn, RES.metaObjectives],
    },
    {
      slug: "audience-targeting",
      title: "Advanced audience targeting",
      summary:
        "Reach the right people with location, interest, custom and lookalike audiences, or let the platform find them. You will learn when to narrow an audience and when to leave it broad.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.metaAdsHelp],
    },
    {
      slug: "social-budgets-and-testing",
      title: "Budgets, schedules and ad tests",
      summary:
        "Set a budget and schedule in cedis, then test one change at a time to learn what works. You will plan a full mock campaign with a defined audience and budget.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.metaAdsHelp],
    },
    {
      slug: "social-storytelling",
      title: "Storytelling for social media",
      summary:
        "Use a simple story shape so people stop scrolling, care and act. Real customers and real moments from the business make the strongest stories.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfCommunication],
    },
    {
      slug: "video-scripting-and-shooting",
      title: "Scripting and shooting a short promo",
      summary:
        "Plan a 30 second promo shot by shot, then film it with the camera you already have. Good light, steady shots and clear sound matter more than expensive equipment.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.youtubeShorts],
    },
    {
      slug: "video-editing-and-captions",
      title: "Editing, captions and publishing video",
      summary:
        "Cut your clips into a tight video, add captions and text, and publish it in the right shape for each platform. Captions help people who watch without sound and people who read better than they listen.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfCanva, RES.youtubeShorts],
    },
    {
      slug: "community-building",
      title: "Building an online community",
      summary:
        "Turn followers into a community that talks, helps each other and comes back. You will set a purpose, simple rules and regular rituals for a group or page.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.whatsappFaq],
    },
    {
      slug: "micro-influencers",
      title: "Finding micro influencers",
      summary:
        "Find local creators whose audiences trust them and match the business. You will check that their followers are real and that their values fit the brand.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.igPaidPartnership],
    },
    {
      slug: "influencer-collaborations",
      title: "Pitching and running a collaboration",
      summary:
        "Write a clear collaboration proposal, agree what each side does, and make sure paid posts are labelled honestly. Then measure what the collaboration brought in.",
      parent: "social-media-marketing",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.igPaidPartnership, RES.tiktokDisclosure],
    },

    // Google Ads
    {
      slug: "google-ads",
      title: "Google Ads and search marketing",
      summary:
        "Put a business in front of people at the moment they search for what it sells. You will learn how search ads work, build a campaign and manage its budget responsibly.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "specialist",
      jobs: ["Digital Ads and Social Media Specialist", "Social Media Manager / Digital Marketer"],
      resources: [RES.adsHelp, RES.skillshop],
    },
    {
      slug: "google-ads-auction",
      title: "How the search ads auction works",
      summary:
        "See what happens in the moment between a search and an ad appearing. You will learn why a relevant ad can beat a bigger bid.",
      parent: "google-ads",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.adRank, RES.qualityScore],
    },
    {
      slug: "campaign-types-and-goals",
      title: "Campaign types and goals",
      summary:
        "Compare the main campaign types and match each to a business goal. Search campaigns are the best place for a beginner to start.",
      parent: "google-ads",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.campaignTypes],
    },
    {
      slug: "account-structure",
      title: "Account structure",
      summary:
        "Organise an account into campaigns, ad groups, keywords and ads so it is easy to manage and measure. A tidy structure makes every later decision easier.",
      parent: "google-ads",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.adsHelp],
    },
    {
      slug: "keywords-and-match-types",
      title: "Keywords, match types and negatives",
      summary:
        "Choose keywords that show buying intent and control which searches trigger your ads. Negative keywords stop money being spent on searches that will never buy.",
      parent: "google-ads",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.matchTypes],
    },
    {
      slug: "responsive-search-ads",
      title: "Writing responsive search ads",
      summary:
        "Write headlines and descriptions that the system can combine into many versions of an ad. You will write three complete ads for a mock business.",
      parent: "google-ads",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.rsaHelp],
    },
    {
      slug: "assets-and-landing-pages",
      title: "Assets and landing pages",
      summary:
        "Add extra information such as a phone number or more links, and make sure the page people land on keeps the ad's promise. A great ad that lands on a poor page wastes money.",
      parent: "google-ads",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.qualityScore],
    },
    {
      slug: "budgets-and-bidding",
      title: "Budgets and bid strategies",
      summary:
        "Set a daily budget in cedis that the owner can afford and choose a bid strategy that fits the goal. You will understand how daily and monthly spending limits work.",
      parent: "google-ads",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.adsBudget, RES.bidStrategies],
    },
    {
      slug: "reading-campaign-data",
      title: "Reading campaign data",
      summary:
        "Read the key numbers in a campaign report and what each one tells you. The search terms report shows the real words people typed before they clicked.",
      parent: "google-ads",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.adsHelp],
    },
    {
      slug: "optimising-campaigns",
      title: "Optimising a campaign",
      summary:
        "Use the data to cut waste, adjust bids and test better ads, one change at a time. You will write clear recommendations an owner can approve.",
      parent: "google-ads",
      optional: false,
      difficulty: "advanced",
      complexity: 5,
      resources: [RES.adsHelp],
    },
  ],
};
