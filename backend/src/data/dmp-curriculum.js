/**
 * The real Delta Mentoring Program curriculum — transcribed from
 * "Delta Mentoring Program (DMP) – 12-Week Curriculum.pdf" (the program
 * SydCrest actually runs), not the software-engineering tracks the AI
 * path-generator produces. Weeks 1–6 and 10–12 are shared; weeks 7–9 fork
 * by the learner's chosen specialization.
 *
 * Shape matches learning_weeks columns exactly (week_number, theme,
 * objectives[], resource_name, resource_url, assignment) so this plugs
 * straight into the same insert the AI-generated paths use.
 */

const SHARED_WEEKS_1_TO_6 = [
  {
    week_number: 1,
    theme: 'Computer & Internet Basics',
    objectives: [
      'Use basic computer hardware and manage files and folders',
      'Navigate the internet safely and recognize phishing attempts',
      'Set up and use a Gmail account to send and receive email with attachments',
    ],
    resource_name: 'GCFGlobal: Digital Skills Tutorials',
    resource_url: 'https://edu.gcfglobal.org/en/topics/digitalskills/',
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
    resource_name: 'GCFGlobal: Google Drive & Docs Tutorials',
    resource_url: 'https://edu.gcfglobal.org/en/topics/digitalskills/',
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
    resource_name: 'Meta Blueprint',
    resource_url: 'https://www.facebook.com/business/learn',
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
    resource_name: 'Google Skillshop: Fundamentals of Digital Marketing',
    resource_url: 'https://skillshop.exceedlms.com/student/collection/1384851-fundamentals-of-digital-marketing',
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
    resource_name: 'Meta Blueprint: Increase Sales',
    resource_url: 'https://www.facebook.com/business/learn',
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
    resource_name: 'Google Analytics Academy',
    resource_url: 'https://analytics.google.com/analytics/academy/',
    assignment: "Submit a one-page \"Analytics Report\" summarizing a mock business's key metrics and proposed next steps.",
  },
];

const SPECIALIZATION_WEEKS_7_TO_9 = {
  seo: [
    {
      week_number: 7,
      theme: 'SEO Basics — Keyword Research & On-Page SEO',
      objectives: ['Conduct keyword research for a business', 'Apply on-page SEO techniques to existing content'],
      resource_name: 'Google Skillshop: Search',
      resource_url: 'https://skillshop.exceedlms.com/student/collection/1384851-fundamentals-of-digital-marketing',
      assignment: "Optimize the mock business's homepage and blog post from Week 4 using keyword research.",
    },
    {
      week_number: 8,
      theme: 'Off-Page SEO — Backlinks & Local SEO',
      objectives: ['Understand backlinks and local SEO fundamentals', 'Identify local listing opportunities'],
      resource_name: 'GCFGlobal: SEO Basics',
      resource_url: 'https://edu.gcfglobal.org/en/topics/digitalskills/',
      assignment: 'Identify 3 local directories or blogs where the business could be listed and draft outreach emails.',
    },
    {
      week_number: 9,
      theme: 'Advanced Content Strategy',
      objectives: ['Build a content calendar covering blogs, FAQs, and multimedia'],
      resource_name: null,
      resource_url: null,
      assignment: 'Present a 1-page SEO strategy plan in Google Slides.',
    },
  ],
  social_media: [
    {
      week_number: 7,
      theme: 'Advanced Ad Targeting',
      objectives: ['Set up a mock ad campaign with a defined audience and budget'],
      resource_name: 'Meta Blueprint',
      resource_url: 'https://www.facebook.com/business/learn',
      assignment: 'Set up a mock Facebook/Instagram ad campaign using Meta Blueprint modules (audience, budget defined).',
    },
    {
      week_number: 8,
      theme: 'Content Creation Mastery — Video & Storytelling',
      objectives: ['Create short-form video content and storytelling for social platforms'],
      resource_name: null,
      resource_url: null,
      assignment: 'Create a 30-second promo video (smartphone or Canva) for a small business.',
    },
    {
      week_number: 9,
      theme: 'Community Building & Influencer Outreach',
      objectives: ['Identify and pitch micro-influencers for collaboration'],
      resource_name: null,
      resource_url: null,
      assignment: 'Identify 2 local micro-influencers and draft collaboration proposals.',
    },
  ],
  google_ads: [
    {
      week_number: 7,
      theme: 'Google Ads Fundamentals',
      objectives: ['Complete the Google Skillshop Search Ads readiness unit'],
      resource_name: 'Google Skillshop: Get Search Ad Campaign Ready',
      resource_url: 'https://skillshop.exceedlms.com/student/collection/1384851-fundamentals-of-digital-marketing',
      assignment: "Complete Google Skillshop's \"Get Search Ad Campaign Ready\" module.",
    },
    {
      week_number: 8,
      theme: 'Campaign Setup — Keywords & Ad Copy',
      objectives: ['Choose keywords and write ad copy for a search campaign'],
      resource_name: null,
      resource_url: null,
      assignment: 'Build a sample search campaign for a mock business with 3 ad copies.',
    },
    {
      week_number: 9,
      theme: 'Optimization and Budgeting',
      objectives: ['Analyze mock campaign data and suggest bid adjustments'],
      resource_name: null,
      resource_url: null,
      assignment: 'Create a Google Ads account, set up a demo campaign, and submit screenshots of the settings.',
    },
  ],
};

const SHARED_WEEKS_10_TO_12 = [
  {
    week_number: 10,
    theme: 'Integrative Marketing Campaign',
    objectives: [
      'Collaborate on a unified, cross-channel marketing campaign',
      'Define campaign objectives, channels, and timeline',
    ],
    resource_name: null,
    resource_url: null,
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
    resource_name: 'Google Sites',
    resource_url: 'https://sites.google.com/',
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
    resource_name: null,
    resource_url: null,
    assignment: 'Submit all capstone artifacts and complete the comprehensive 20-question final quiz for certification.',
  },
];

const TRACKS = ['seo', 'social_media', 'google_ads'];
const TRACK_LABELS = { seo: 'SEO & Content Marketing', social_media: 'Social Media Marketing', google_ads: 'Google Ads (SEM)' };

function buildWeeks(track) {
  if (!TRACKS.includes(track)) throw new Error(`Unknown DMP track: ${track}`);
  return [...SHARED_WEEKS_1_TO_6, ...SPECIALIZATION_WEEKS_7_TO_9[track], ...SHARED_WEEKS_10_TO_12];
}

module.exports = { TRACKS, TRACK_LABELS, buildWeeks };
