import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Social Media Management outline (issue #96, Tier B). Original SydCrest
 * content; research and coverage in src/content/research/social-media-management.md.
 * This track is the job of running pages for a business or organisation. It
 * leans on the Digital Marketer track for ads and campaigns and on the Video
 * and Content Creation track for filming and editing, rather than repeating them.
 */

/** Track specific links not in the shared pool; each checked to load (27 October 2026). */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const metaStandards = r("Meta Transparency Center: Community Standards", "https://transparency.meta.com/policies/community-standards/");
const tiktokGuidelines = r("TikTok Community Guidelines", "https://www.tiktok.com/community-guidelines/en");
const tiktokSafety = r("TikTok Safety Center: account security", "https://www.tiktok.com/safety/en/account-security");
const tiktokAcademy = r("TikTok Creator Academy", "https://www.tiktok.com/creator-academy/en", "video");
const youtubeStrikes = r("YouTube Help: Community Guidelines strike basics", "https://support.google.com/youtube/answer/2802032");
const metaCert = r(
  "Meta Social Media Marketing Professional Certificate (Coursera)",
  "https://www.coursera.org/professional-certificates/facebook-social-media-marketing",
);
const nngTone = r("Nielsen Norman Group: The four dimensions of tone of voice", "https://www.nngroup.com/articles/tone-of-voice-dimensions/");
const govukTone = r(
  "GOV.UK: Writing in a clear tone of voice",
  "https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/tone-of-voice/",
);
const bufferCalendar = r("Buffer: How to create a social media content calendar", "https://buffer.com/library/social-media-content-calendar/");
const bufferLibrary = r("Buffer library: social media guides", "https://buffer.com/library/");
const sheetsHowTo = r("Google Sheets help: How to use Google Sheets", "https://support.google.com/docs/answer/6000292", "practice");
const cisaMfa = r("CISA: Turn on multifactor authentication", "https://www.cisa.gov/secure-our-world/turn-mfa");
const cisaPasswords = r("CISA: Use strong passwords", "https://www.cisa.gov/secure-our-world/use-strong-passwords");
const cisaPhishing = r("CISA: Recognise and report phishing", "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing");
const ncscSocial = r("NCSC: Social media, how to use it safely", "https://www.ncsc.gov.uk/guidance/social-media-how-to-use-it-safely");
const ghanaCsa = r("Cyber Security Authority, Ghana", "https://www.csa.gov.gh/");
const tiktokDisclosure = r(
  "TikTok Business Help: content disclosure setting for creators",
  "https://ads.tiktok.com/help/article/about-the-content-disclosure-setting-for-creators",
);
const tiktokBcRoles = r(
  "TikTok Business Help: Business Center roles and permissions",
  "https://ads.tiktok.com/help/article/about-business-center-roles-and-permissions",
);
const tiktokAnalytics = r("TikTok Creator Academy: introduction to analytics", "https://www.tiktok.com/creator-academy/en/article/tool-analytics-intro");
const linkedinRoles = r("LinkedIn Help: Page admin roles", "https://www.linkedin.com/help/linkedin/answer/a541981");
const metaRecovery = r("Meta Account Recovery Hub", "https://www.meta.com/account-recovery-support/");
const fdaAds = r("Ghana FDA: guidelines for advertisement of regulated products", "https://fdaghana.gov.gh/guidelines-for-advertisement-of-regulated-products");
const asaAds = r("ASA: Recognising ads on social media and influencer marketing", "https://www.asa.org.uk/advice-online/recognising-ads-social-media.html");

export const socialMediaManagement: RoadmapDraft = {
  slug: "social-media-manager",
  title: "Social Media Management",
  description:
    "Run Facebook, Instagram, TikTok and WhatsApp pages for shops, brands, churches, schools and NGOs. Learn to onboard a client, keep their accounts safe, plan and schedule posts, run the inbox and community, host live selling, follow platform rules and report results, all from a phone or a computer, then build a portfolio and manage several clients.",
  track: "social-media-management",
  field_category: "marketing",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "the-job",
      title: "The social media manager job",
      summary:
        "A social media manager runs a brand's pages day to day so the owner can focus on the business. This section covers the roles you can aim for and how each platform is used in Ghana.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [metaCert, RES.metaLearn],
    },
    {
      slug: "roles-in-ghana",
      title: "Social media roles in Ghana",
      summary:
        "Shops, agencies, media houses, NGOs and churches hire social media officers, executives, community managers, live selling hosts and freelance page managers. Learn what each one does in a normal week and which skills this track borrows from the Digital Marketer and Video and Content Creation tracks.",
      parent: "the-job",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [metaCert],
    },
    {
      slug: "platforms",
      title: "Platforms and what each one is for",
      summary:
        "Facebook, Instagram, TikTok, WhatsApp channels, X, LinkedIn and YouTube reach different people and reward different kinds of posts. Learn to choose two or three platforms that fit a client's customers instead of trying to be everywhere at once.",
      parent: "the-job",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.metaLearn, RES.tiktokBusiness, RES.whatsappBusiness],
    },
    {
      slug: "taking-on-a-client",
      title: "Taking on a client or brand",
      summary:
        "Before you post anything you need to understand the business, agree on goals and get safe access to its accounts. This section covers onboarding, brand voice, page access and account security.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["SMM Assistant", "Social Media Officer"],
      resources: [RES.metaLearn],
    },
    {
      slug: "client-onboarding",
      title: "Onboarding a new client",
      summary:
        "A short brief tells you who the customers are, what the business wants from social media and who approves posts. Learn to audit the pages a client already has and agree a simple goal, like more WhatsApp orders for a Tamale fabric shop.",
      parent: "taking-on-a-client",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [bufferLibrary, sheetsHowTo],
    },
    {
      slug: "brand-voice",
      title: "Brand voice and a simple style guide",
      summary:
        "Every post should sound like the same business, whether it is a friendly chop bar or a serious microfinance company. Learn to write a one page style guide covering tone, words to use and avoid, languages, colours and logo use.",
      parent: "taking-on-a-client",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [nngTone, govukTone],
    },
    {
      slug: "page-access",
      title: "Page access without sharing passwords",
      summary:
        "Business tools like Meta Business Suite let an owner give you a role on their page so nobody has to hand over a password. Learn the difference between full control and partial control, and how the owner removes you cleanly when the work ends.",
      parent: "taking-on-a-client",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.metaLearn, tiktokBcRoles, linkedinRoles],
    },
    {
      slug: "account-security",
      title: "Two step verification and account recovery",
      summary:
        "A hacked business page can lose years of followers and be used to scam customers. Learn to turn on two step verification, keep recovery details current, spot phishing messages that pretend to be from Meta or TikTok and know what to do if a page is taken over.",
      parent: "taking-on-a-client",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [metaRecovery, tiktokSafety, ghanaCsa],
    },
    {
      slug: "planning",
      title: "Planning what to post",
      summary:
        "Good pages post with a plan rather than whenever someone remembers. This section covers content pillars, getting material from busy clients and scheduling with approvals.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Social Media Executive", "Community Marketer / Social Media Personnel"],
      resources: [bufferCalendar],
    },
    {
      slug: "content-pillars",
      title: "Content pillars and a monthly plan",
      summary:
        "Content pillars are three to five themes a brand keeps returning to, such as products, how to use them, customer stories and behind the scenes. Learn to turn pillars into a month of post ideas that also marks Ghanaian moments like Eid, Damba, Independence Day and back to school.",
      parent: "planning",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [bufferCalendar, sheetsHowTo],
    },
    {
      slug: "getting-content",
      title: "Getting content from busy clients",
      summary:
        "Most small business owners will not write captions, but they can send photos and voice notes on WhatsApp if you ask clearly. Learn to set up a simple weekly request, reuse one photo shoot across many posts and keep a shared folder so nothing gets lost.",
      parent: "planning",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [bufferLibrary],
    },
    {
      slug: "scheduling-and-approvals",
      title: "Scheduling posts and getting approval",
      summary:
        "Scheduling tools, including the free planners built into Meta Business Suite and TikTok, let you prepare a week of posts in one sitting. Learn to share drafts for approval, schedule them from a phone or a computer and check that each post went out correctly.",
      parent: "planning",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.metaLearn, bufferLibrary],
    },
    {
      slug: "community",
      title: "Running the inbox and community",
      summary:
        "Comments and messages are where followers become customers, so they need fast and polite replies. This section covers the inbox, moderation, complaints and live selling.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Social Media Community Manager", "Community Manager"],
      resources: [RES.whatsappFaq],
    },
    {
      slug: "inbox-and-messages",
      title: "Handling comments and messages",
      summary:
        "Replying quickly and kindly turns a question about price or delivery into a sale. Learn to use saved replies, label conversations, agree reply times with the client and pass real orders or complaints to the right person.",
      parent: "community",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.whatsappBusiness, RES.metaLearn],
    },
    {
      slug: "moderation",
      title: "Moderation, spam and scam comments",
      summary:
        "Busy pages attract spam, insults and fake accounts that copy the brand and ask followers for MoMo payments. Learn to hide, delete and report harmful comments, warn followers about impostors and write simple house rules for a community.",
      parent: "community",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [metaStandards, cisaPhishing, ghanaCsa],
    },
    {
      slug: "complaints-and-crises",
      title: "Complaints and a bad day online",
      summary:
        "An angry customer post or a mistake by the brand can spread fast, and a calm public reply often matters more than the problem itself. Learn when to reply publicly, when to move to private messages and when to stop and call the client before saying anything.",
      parent: "community",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [nngTone],
    },
    {
      slug: "live-selling",
      title: "Hosting live streams for a brand",
      summary:
        "Some shops and brands in Ghana sell through Facebook and TikTok live streams, and some advertise for hosts just for this. Learn to plan a live session, show products clearly, answer questions as they arrive and follow up every order after the stream ends.",
      parent: "community",
      optional: true,
      difficulty: "intermediate",
      complexity: 3,
      resources: [tiktokAcademy, RES.tiktokBusiness],
    },
    {
      slug: "rules-and-ethics",
      title: "Platform rules, privacy and honesty",
      summary:
        "Breaking platform rules or the law can get a client's page restricted or land them in trouble. This section covers community standards, customer privacy and honest promotion.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Social Media Manager", "Social Media Marketing Specialist"],
      resources: [metaStandards],
    },
    {
      slug: "platform-rules",
      title: "Community standards and why posts get removed",
      summary:
        "Every platform publishes rules on hate, violence, spam, fake accounts and regulated goods like medicine and betting. Learn where to read them, why posts get removed or pages restricted and how to appeal when you think a decision was wrong.",
      parent: "rules-and-ethics",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [metaStandards, tiktokGuidelines, youtubeStrikes],
    },
    {
      slug: "privacy-and-consent",
      title: "Customer privacy and consent",
      summary:
        "Messages, phone numbers and photos of customers are personal data, and Ghana's Data Protection Act sets rules for how they are used. Learn to ask before posting a customer's photo or review, never share inbox details and keep client data off your personal phone gallery when the work ends.",
      parent: "rules-and-ethics",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.dpc, ncscSocial],
    },
    {
      slug: "honest-promotion",
      title: "Paid partnerships and honest promotion",
      summary:
        "When a brand pays an influencer, or a post is an advert, followers should be able to tell. Learn to label sponsored posts with the platform's branded content tools, avoid claims a client cannot back up and brief influencers clearly.",
      parent: "rules-and-ethics",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [tiktokDisclosure, fdaAds, asaAds],
    },
    {
      slug: "results",
      title: "Results and reporting",
      summary:
        "Clients keep paying when they can see what the work achieved. This section covers platform insights, boosting posts and a monthly review that improves the plan.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Social Media Content and Strategy Executive", "Social Media Manager"],
      resources: [metaCert],
    },
    {
      slug: "platform-insights",
      title: "Reading platform insights",
      summary:
        "Each platform shows reach, engagement, followers and messages in its own insights screen, all readable on a phone or a computer. Learn which numbers matter for the client's goal and how to record them in a simple sheet every week.",
      parent: "results",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.metaLearn, tiktokAnalytics, sheetsHowTo],
    },
    {
      slug: "boosting-posts",
      title: "Boosting posts and when to hand over to ads",
      summary:
        "Boosting puts a small budget behind a post that is already doing well, and many page managers are asked to do it. Learn the basics and safe payment habits, then move to the Digital Marketer track when a client needs proper ad campaigns.",
      parent: "results",
      optional: true,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.metaLearn, RES.tiktokBusiness],
    },
    {
      slug: "monthly-review",
      title: "A monthly review that improves the plan",
      summary:
        "A short monthly report should say what you posted, what worked, what did not and what you will change next month. Learn to present it in plain words a busy owner understands and use it to adjust the content pillars.",
      parent: "results",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [sheetsHowTo, bufferLibrary],
    },
    {
      slug: "working-and-earning",
      title: "Working and earning",
      summary:
        "Employers and clients want proof that you have run real pages, not just a certificate. This section covers your portfolio, applications and handling several clients at once.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "specialist",
      jobs: ["Digital and Social Media Manager", "Social Media Manager"],
      resources: [metaCert],
    },
    {
      slug: "portfolio",
      title: "A portfolio of pages you have run",
      summary:
        "Many adverts ask for links to pages you have managed, so start with a church, school, family business or your own project page. Learn to write a short case study for each one showing the goal, what you did and what changed.",
      parent: "working-and-earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [bufferLibrary],
    },
    {
      slug: "applying-for-roles",
      title: "Applying for social media roles",
      summary:
        "Applications usually ask for a CV, a few page links and sometimes a sample content plan or test task. Learn to tailor each one to the business, prepare a one week sample plan and handle an interview question about a page that went wrong.",
      parent: "working-and-earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [metaCert, RES.skillshop],
    },
    {
      slug: "several-clients",
      title: "Managing several clients at once",
      summary:
        "Freelance page managers often look after a few small businesses on monthly retainers, which needs good organisation and clear limits. Learn to keep a separate plan, folder and login record for each client, protect the phone and computer you work on, and use the Freelancing track for pricing, contracts and getting paid.",
      parent: "working-and-earning",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [cisaPasswords, cisaMfa, sheetsHowTo],
    },
  ],
};
