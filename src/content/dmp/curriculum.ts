/**
 * The real Delta Mentoring Program curriculum — transcribed from
 * "Delta Mentoring Program (DMP) – 12-Week Curriculum.pdf" (the program
 * SydCrest actually runs), not the software-engineering tracks the AI
 * path-generator produces. Weeks 1–6 and 10–12 are shared; weeks 7–9 fork
 * by the learner's chosen specialization.
 *
 * Kept as typed data rather than seeded rows so it can be reviewed in a PR;
 * the cohort tables will load it once the Learn data model exists.
 */

/** A free, official page for extra practice (issue #239). Never roadmap.sh, never paid. */
export type DmpResource = { name: string; url: string };

/** Up to three extra practice resources per week; the DB check matches. */
export const MAX_WEEK_RESOURCES = 3;

/** A week as authored below: its resources are a list. */
type AuthoredWeek = {
  week_number: number;
  theme: string;
  objectives: string[];
  resources: DmpResource[];
  assignment: string;
};

/**
 * A week as the database holds it. `resource_name` and `resource_url` mirror
 * the first resource, kept for compatibility with readers of the old columns.
 */
export type DmpWeek = AuthoredWeek & {
  resource_name: string | null;
  resource_url: string | null;
};

const SHARED_WEEKS_1_TO_6: AuthoredWeek[] = [
  {
    week_number: 1,
    theme: 'Computer & Internet Basics',
    objectives: [
      'Use basic computer hardware and manage files and folders',
      'Navigate the internet safely and recognize phishing attempts',
      'Set up and use a Gmail account to send and receive email with attachments',
    ],
    resources: [
      { name: 'GCFGlobal LearnFree: Computer Basics', url: 'https://www.learnfree.org/series/computer-basics' },
      { name: 'GCFGlobal LearnFree: Internet Basics', url: 'https://www.learnfree.org/series/internet-basics' },
      { name: 'GCFGlobal LearnFree: Gmail', url: 'https://www.learnfree.org/series/gmail' },
    ],
    assignment: "Write a 1-paragraph \"tip sheet\" summarizing safe internet practices in Google Docs and submit it.",
  },
  {
    week_number: 2,
    theme: 'Cloud Collaboration & Productivity Tools',
    objectives: [
      'Create, upload, and organize files in Google Drive',
      'Format and share documents in Google Docs',
      'Build a short presentation in Google Slides',
      'Enter data and use simple formulas in Google Sheets',
    ],
    resources: [
      { name: 'GCFGlobal LearnFree: Google Drive', url: 'https://www.learnfree.org/series/google-drive' },
      { name: 'GCFGlobal LearnFree: Google Slides', url: 'https://www.learnfree.org/series/google-slides' },
      { name: 'GCFGlobal LearnFree: Google Sheets', url: 'https://www.learnfree.org/series/google-sheets' },
    ],
    assignment: 'Finalize a 3-slide presentation about yourself or a mock business, export it as a PDF, and submit it.',
  },
  {
    week_number: 3,
    theme: 'Online Communication & Digital Citizenship',
    objectives: [
      'Create a Facebook Page or Group for a mock project',
      'Write clear, engaging content for online posts',
      'Recognize phishing attempts and apply cyber-safety basics (strong passwords, privacy settings)',
      'Evaluate online sources for credibility',
    ],
    resources: [
      { name: 'Meta Blueprint: How to create a Facebook Page', url: 'https://www.facebookblueprint.com/student/activity/409145-how-to-create-a-facebook-page' },
      { name: 'GCFGlobal LearnFree: Internet Safety', url: 'https://www.learnfree.org/series/internet-safety' },
      { name: 'Mailchimp: What is email marketing?', url: 'https://mailchimp.com/marketing-glossary/email-marketing/' },
    ],
    assignment: "Compose an email newsletter draft for a mock organization's weekly update and explain your content choices.",
  },
  {
    week_number: 4,
    theme: 'Introduction to Digital Marketing Concepts',
    objectives: [
      'Understand the core digital marketing channels: SEO, social, email, ads',
      'Learn how search engines work and why a website matters',
      'Write basic web content using keyword principles',
      'Create a Google My Business profile for a sample shop',
    ],
    resources: [
      { name: 'Google Skillshop: Fundamentals of Digital Marketing', url: 'https://skillshop.exceedlms.com/student/collection/1830706' },
      { name: 'Google Search Central: SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
      { name: 'Google Business Profile Help: Sign up for a Business Profile', url: 'https://support.google.com/business/answer/10514137' },
    ],
    assignment: 'Draft a basic homepage layout for a small business using Google Slides (image and text placeholders).',
  },
  {
    week_number: 5,
    theme: 'Social Media Marketing — Strategy & Content',
    objectives: [
      'Choose the right social platforms for a business',
      'Plan a two-week content calendar',
      'Design a promotional social graphic using a free tool',
      'Practice responding to customer comments and questions',
    ],
    resources: [
      { name: 'Meta Blueprint: How to post on a Facebook Page', url: 'https://www.facebookblueprint.com/student/activity/409148-how-to-post-on-a-facebook-page' },
      { name: 'GCFGlobal LearnFree: Canva', url: 'https://www.learnfree.org/series/canva' },
      { name: 'HubSpot Academy: Social Media Marketing', url: 'https://academy.hubspot.com/courses/social-media' },
    ],
    assignment: 'Prepare a 3-slide social media campaign proposal (strategy plus two example posts) for a mock business.',
  },
  {
    week_number: 6,
    theme: 'Analytics and Data in Marketing',
    objectives: [
      'Understand core web analytics metrics (visitors, engagement)',
      'Navigate a Google Analytics report',
      'Interpret basic social media analytics',
      'Understand A/B testing basics for ads and posts',
    ],
    resources: [
      { name: 'Google Analytics Help: Analytics Academy courses on Skillshop', url: 'https://support.google.com/analytics/answer/15068052' },
      { name: 'Google Analytics Help: How Google Analytics works', url: 'https://support.google.com/analytics/answer/12159447' },
      { name: 'Google Analytics Help: Overview of reports', url: 'https://support.google.com/analytics/answer/9212670' },
    ],
    assignment: "Submit a one-page \"Analytics Report\" summarizing a mock business's key metrics and proposed next steps.",
  },
];

const SPECIALIZATION_WEEKS_7_TO_9: Record<DmpTrack, AuthoredWeek[]> = {
  seo: [
    {
      week_number: 7,
      theme: 'SEO Basics — Keyword Research & On-Page SEO',
      objectives: ['Conduct keyword research for a business', 'Apply on-page SEO techniques to existing content'],
      resources: [
        { name: 'Google Search Central: SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
        { name: 'Google Ads Help: Use Keyword Planner', url: 'https://support.google.com/google-ads/answer/7337243' },
      ],
      assignment: "Optimize the mock business's homepage and blog post from Week 4 using keyword research.",
    },
    {
      week_number: 8,
      theme: 'Off-Page SEO — Backlinks & Local SEO',
      objectives: ['Understand backlinks and local SEO fundamentals', 'Identify local listing opportunities'],
      resources: [
        { name: 'Google Business Profile Help: Improve your local ranking', url: 'https://support.google.com/business/answer/7091' },
        { name: 'GCFGlobal LearnFree: SEO Basics for Beginners', url: 'https://www.learnfree.org/series/seo-basics-for-beginners' },
        { name: 'Google Business Profile Help: Get more reviews', url: 'https://support.google.com/business/answer/3474122' },
      ],
      assignment: 'Identify 3 local directories or blogs where the business could be listed and draft outreach emails.',
    },
    {
      week_number: 9,
      theme: 'Advanced Content Strategy',
      objectives: ['Build a content calendar covering blogs, FAQs, and multimedia'],
      resources: [
        { name: 'Google Search Central: Creating helpful content', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content' },
        { name: 'HubSpot Academy: Content Marketing', url: 'https://academy.hubspot.com/courses/content-marketing' },
      ],
      assignment: 'Present a 1-page SEO strategy plan in Google Slides.',
    },
  ],
  social_media: [
    {
      week_number: 7,
      theme: 'Advanced Ad Targeting',
      objectives: ['Set up a mock ad campaign with a defined audience and budget'],
      resources: [
        { name: 'Meta Blueprint: Get started with Ads Manager', url: 'https://www.facebookblueprint.com/student/activity/415305-get-started-with-ads-manager' },
        { name: 'Meta Blueprint: Your guide to audience targeting', url: 'https://www.facebookblueprint.com/student/catalog/list?category_ids=7506-your-guide-to-audience-targeting' },
      ],
      assignment: 'Set up a mock Facebook/Instagram ad campaign using Meta Blueprint modules (audience, budget defined).',
    },
    {
      week_number: 8,
      theme: 'Content Creation Mastery — Video & Storytelling',
      objectives: ['Create short-form video content and storytelling for social platforms'],
      resources: [
        { name: 'YouTube Help: Get started creating YouTube Shorts', url: 'https://support.google.com/youtube/answer/10059070' },
        { name: 'Meta Blueprint: Creative inspiration', url: 'https://www.facebookblueprint.com/student/catalog/list?category_ids=7508-creative-inspiration' },
        { name: 'GCFGlobal LearnFree: Canva', url: 'https://www.learnfree.org/series/canva' },
      ],
      assignment: 'Create a 30-second promo video (smartphone or Canva) for a small business.',
    },
    {
      week_number: 9,
      theme: 'Community Building & Influencer Outreach',
      objectives: ['Identify and pitch micro-influencers for collaboration'],
      resources: [
        { name: 'Meta Blueprint: Messaging tools to build deeper connections with customers', url: 'https://www.facebookblueprint.com/student/activity/579392-how-to-use-messaging-tools-to-build-deeper-connections-with-customers' },
        { name: 'HubSpot Academy: Social Media Marketing', url: 'https://academy.hubspot.com/courses/social-media' },
      ],
      assignment: 'Identify 2 local micro-influencers and draft collaboration proposals.',
    },
  ],
  google_ads: [
    {
      week_number: 7,
      theme: 'Google Ads Fundamentals',
      objectives: ['Complete the Google Skillshop Search Ads readiness unit'],
      resources: [
        { name: 'Google Ads Help: Create a Search campaign', url: 'https://support.google.com/google-ads/answer/9510373' },
      ],
      assignment: "Complete Google Skillshop's \"Get Search Ad Campaign Ready\" module.",
    },
    {
      week_number: 8,
      theme: 'Campaign Setup — Keywords & Ad Copy',
      objectives: ['Choose keywords and write ad copy for a search campaign'],
      resources: [
        { name: 'Google Ads Help: About keyword matching options', url: 'https://support.google.com/google-ads/answer/7478529' },
        { name: 'Google Ads Help: About responsive search ads', url: 'https://support.google.com/google-ads/answer/7684791' },
        { name: 'Google Ads Help: Use Keyword Planner', url: 'https://support.google.com/google-ads/answer/7337243' },
      ],
      assignment: 'Build a sample search campaign for a mock business with 3 ad copies.',
    },
    {
      week_number: 9,
      theme: 'Optimization and Budgeting',
      objectives: ['Analyze mock campaign data and suggest bid adjustments'],
      resources: [
        { name: 'Google Ads Help: Understanding bidding basics', url: 'https://support.google.com/google-ads/answer/2459326' },
        { name: 'Google Ads Help: About optimisation score', url: 'https://support.google.com/google-ads/answer/9061546' },
      ],
      assignment: 'Create a Google Ads account, set up a demo campaign, and submit screenshots of the settings.',
    },
  ],
};

const SHARED_WEEKS_10_TO_12: AuthoredWeek[] = [
  {
    week_number: 10,
    theme: 'Integrative Marketing Campaign',
    objectives: [
      'Collaborate on a unified, cross-channel marketing campaign',
      'Define campaign objectives, channels, and timeline',
    ],
    resources: [
      { name: 'HubSpot Academy: Digital Marketing', url: 'https://academy.hubspot.com/courses/digital-marketing' },
      { name: 'Mailchimp: Marketing plan template', url: 'https://mailchimp.com/resources/marketing-plan-template/' },
    ],
    assignment: 'Present a unified marketing campaign plan and complete the Final Quiz covering digital literacy and marketing fundamentals.',
  },
  {
    week_number: 11,
    theme: 'Portfolio Development & Practice',
    objectives: [
      'Build an online portfolio using Google Sites',
      'Practice presenting your portfolio',
      'Complete the final specialization quiz',
    ],
    resources: [
      { name: 'Google Sites Help: How to use Google Sites', url: 'https://support.google.com/sites/answer/6372878' },
      { name: 'GCFGlobal LearnFree: Resume Writing', url: 'https://www.learnfree.org/series/resume-writing' },
      { name: 'GCFGlobal LearnFree: Interviewing Skills', url: 'https://www.learnfree.org/series/interviewing-skills' },
    ],
    assignment: 'Draft a portfolio with at least 3 pieces of work and get mentor feedback on readiness.',
  },
  {
    week_number: 12,
    theme: 'Final Assessment and Graduation',
    objectives: [
      'Finalize a capstone project based on your specialization',
      'Complete the comprehensive final quiz',
      "Peer-review a classmate's capstone using a rubric",
    ],
    resources: [
      { name: 'GCFGlobal LearnFree: Job Search and Networking', url: 'https://www.learnfree.org/series/job-search-and-networking' },
    ],
    assignment: 'Submit all capstone artifacts and complete the comprehensive 20-question final quiz for certification.',
  },
];

export const TRACKS = ['seo', 'social_media', 'google_ads'] as const;
export type DmpTrack = (typeof TRACKS)[number];
export const TRACK_LABELS: Record<DmpTrack, string> = { seo: 'SEO & Content Marketing', social_media: 'Social Media Marketing', google_ads: 'Google Ads (SEM)' };

export function buildWeeks(track: DmpTrack): DmpWeek[] {
  if (!TRACKS.includes(track)) throw new Error(`Unknown DMP track: ${track}`);
  return [...SHARED_WEEKS_1_TO_6, ...SPECIALIZATION_WEEKS_7_TO_9[track], ...SHARED_WEEKS_10_TO_12].map((w) => ({
    week_number: w.week_number,
    theme: w.theme,
    objectives: w.objectives,
    resource_name: w.resources[0]?.name ?? null,
    resource_url: w.resources[0]?.url ?? null,
    resources: w.resources,
    assignment: w.assignment,
  }));
}
