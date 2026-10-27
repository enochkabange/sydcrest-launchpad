import { RES } from "./resources";
import type { RoadmapDraft } from "./types";

/**
 * Revised against job advert and skills framework research for issue #84.
 * Evidence for every node: src/content/research/digital-marketing.md.
 */
export const digitalMarketing: RoadmapDraft = {
  slug: "digital-marketer",
  title: "Digital Marketer",
  description:
    "Help Ghanaian businesses, churches and NGOs find and keep customers on WhatsApp, social media, email and search. Learn on your phone or computer with free tools and build a portfolio from real local clients.",
  track: "digital-marketing",
  field_category: "marketing",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Marketing foundations",
      summary:
        "Marketing is about understanding people before it is about posting. This section gives you the thinking that every channel builds on.",
      parent: null,
      optional: false,
      resources: [RES.skillshop],
    },
    {
      slug: "customer-journey",
      title: "How customers find and buy",
      summary:
        "Follow how a customer moves from first hearing about a business to paying and coming back. In Ghana that journey often runs through a WhatsApp chat and a mobile money payment.",
      parent: "foundations",
      optional: false,
      resources: [RES.skillshop],
    },
    {
      slug: "know-your-audience",
      title: "Knowing your audience and competitors",
      summary:
        "Describe who the customer is, what they need, which language they prefer and which apps they use, then study what similar businesses already do. A post in Dagbani, Twi or Pidgin can reach people an English post misses.",
      parent: "foundations",
      optional: false,
      resources: [RES.lfCommunication],
    },
    {
      slug: "channels-overview",
      title: "The main channels",
      summary:
        "Compare messaging, social media, search, email and paid ads, and what each one is good for. Small budgets mean choosing a few channels and doing them well.",
      parent: "foundations",
      optional: false,
      resources: [RES.skillshop],
    },
    {
      slug: "content",
      title: "Content creation",
      summary:
        "Content is what people see, read and share. You can produce professional work with only a phone and free apps.",
      parent: null,
      optional: false,
      resources: [RES.lfCanva],
    },
    {
      slug: "copywriting",
      title: "Writing that sells",
      summary:
        "Write short, clear posts, captions and messages in a consistent brand voice that tell people what to do next. Lead with the benefit and include the price and how to pay when you can.",
      parent: "content",
      optional: false,
      resources: [RES.lfWriting, RES.lfBizWriting],
    },
    {
      slug: "graphics-and-photos",
      title: "Product photos and graphics",
      summary:
        "Take clean product photos in daylight and design simple branded graphics in a free tool. Keep files small so customers on limited data can still load them.",
      parent: "content",
      optional: false,
      resources: [RES.lfCanva, RES.lfDesign],
    },
    {
      slug: "short-video",
      title: "Short video and live selling",
      summary:
        "Shoot and edit short vertical videos on a phone for TikTok, Reels and WhatsApp Status, and learn how businesses sell during live streams. Clear sound, a strong first few seconds and captions matter more than expensive gear.",
      parent: "content",
      optional: false,
      resources: [RES.tiktokBusiness, RES.metaLearn],
    },
    {
      slug: "content-calendar",
      title: "Planning a content calendar",
      summary:
        "Plan posts a few weeks ahead around market days, holidays and local events. A simple spreadsheet calendar keeps a business consistent.",
      parent: "content",
      optional: false,
      resources: [RES.lfSheets],
    },
    {
      slug: "social-and-messaging",
      title: "Social media, messaging and email",
      summary:
        "Many Ghanaian businesses sell directly through chat, social apps and email lists. This section teaches you to run those channels professionally.",
      parent: null,
      optional: false,
      resources: [RES.metaLearn],
    },
    {
      slug: "whatsapp-business",
      title: "WhatsApp Business",
      summary:
        "Set up a business profile, catalogue, quick replies, labels and status updates. Good WhatsApp management is one of the most practical services you can offer a local shop.",
      parent: "social-and-messaging",
      optional: false,
      resources: [RES.whatsappBusiness, RES.whatsappFaq],
    },
    {
      slug: "facebook-instagram",
      title: "Facebook and Instagram pages",
      summary:
        "Run a business page, post consistently and use the free insights to learn what works. Learn the platform's own free training before paying for any course.",
      parent: "social-and-messaging",
      optional: false,
      resources: [RES.metaLearn],
    },
    {
      slug: "community-management",
      title: "Community management and customer care",
      summary:
        "Reply to comments and messages quickly, handle complaints politely in public, and work with trusted local voices who can speak for a brand. Never ask customers to share PINs or codes in comments.",
      parent: "social-and-messaging",
      optional: false,
      resources: [RES.lfCommunication],
    },
    {
      slug: "email-marketing",
      title: "Email newsletters",
      summary:
        "Build a list of people who agreed to hear from a business and send them short, useful newsletters. Email reaches people without depending on a social app deciding who sees a post.",
      parent: "social-and-messaging",
      optional: false,
      resources: [RES.lfGmail, RES.lfBizWriting],
    },
    {
      slug: "search-and-local",
      title: "Search and local visibility",
      summary:
        "People search for businesses near them on Google and maps. This section makes sure your clients show up when they do.",
      parent: null,
      optional: false,
      resources: [RES.lfSearch],
    },
    {
      slug: "google-business-profile",
      title: "Google Business Profile",
      summary:
        "Create and verify a profile with correct hours, location, photos and phone number, then encourage genuine customer reviews. It is free and often the first thing a nearby customer sees.",
      parent: "search-and-local",
      optional: false,
      resources: [RES.googleBusiness],
    },
    {
      slug: "seo-basics",
      title: "SEO and keyword basics",
      summary:
        "Learn how search engines find and rank pages, and how to research the words people actually type. Focus on local searches such as a service plus a town name.",
      parent: "search-and-local",
      optional: false,
      resources: [RES.seoStarter],
    },
    {
      slug: "paid-ads",
      title: "Paid advertising",
      summary:
        "Paid ads reach people beyond a page's followers. Learn to spend small amounts carefully and measure the result.",
      parent: null,
      optional: false,
      resources: [RES.skillshop],
    },
    {
      slug: "social-ads",
      title: "Social media ads",
      summary:
        "Set up a campaign with a clear goal, a target audience by location and interest, and a small daily budget. Start with a test and only increase spend on what works.",
      parent: "paid-ads",
      optional: false,
      resources: [RES.metaLearn],
    },
    {
      slug: "search-ads",
      title: "Search ads",
      summary:
        "Learn how search ads match keywords to what people type and how bidding works. Google's free Skillshop training includes certifications you can add to your CV.",
      parent: "paid-ads",
      optional: false,
      resources: [RES.skillshop, RES.adsHelp],
    },
    {
      slug: "budgets-in-cedis",
      title: "Budgets and payment for ads",
      summary:
        "Plan budgets in cedis, understand how ad platforms charge and keep a record for the client. Agree clearly who pays the platform and who pays you.",
      parent: "paid-ads",
      optional: false,
      resources: [RES.lfMoney],
    },
    {
      slug: "measurement",
      title: "Campaigns and results",
      summary:
        "Clients keep paying marketers who can plan a campaign and show what their money achieved. This section covers planning, tracking and honest reporting.",
      parent: null,
      optional: false,
      resources: [RES.gaHelp],
    },
    {
      slug: "campaign-plan",
      title: "Planning a campaign",
      summary:
        "Turn a goal into a short plan with an audience, a message, channels, a budget, dates and a number to watch. One clear page keeps you and the client on the same track.",
      parent: "measurement",
      optional: false,
      resources: [RES.lfSheets, RES.skillshop],
    },
    {
      slug: "analytics",
      title: "Analytics basics",
      summary:
        "Read platform insights and website analytics to see reach, clicks, messages and sales. Track the numbers that connect to money, not only likes.",
      parent: "measurement",
      optional: false,
      resources: [RES.gaHelp, RES.skillshop],
    },
    {
      slug: "client-reporting",
      title: "Reporting to clients",
      summary:
        "Send a short monthly report covering what you did, what happened and what you will try next. Be honest when something did not work, because trust keeps clients longer than good numbers.",
      parent: "measurement",
      optional: false,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "earning",
      title: "Getting hired and getting paid",
      summary:
        "Digital marketing can lead to agency jobs, in house roles or your own freelance business. This section helps you choose and start.",
      parent: null,
      optional: false,
      resources: [RES.lfJobsearch],
    },
    {
      slug: "portfolio",
      title: "A portfolio from real businesses",
      summary:
        "Offer a short trial to two or three local businesses and document the before, the work and the results. Real accounts with honest numbers convince employers more than mock projects.",
      parent: "earning",
      optional: false,
      resources: [RES.lfResume],
    },
    {
      slug: "job-applications",
      title: "Certificates, CVs and applications",
      summary:
        "Take free platform courses and earn certificates where they are free, write a CV that shows real work, and apply to agencies, companies and NGOs. Never pay anyone to get a job interview.",
      parent: "earning",
      optional: false,
      resources: [RES.skillshop, RES.lfJobsearch, RES.lfInterview],
    },
    {
      slug: "freelancing",
      title: "Freelancing and retainers",
      summary:
        "Package your services with clear monthly prices, write a simple agreement and invoice on time. Ask happy clients for referrals, since many local clients find marketers by word of mouth.",
      parent: "earning",
      optional: false,
      resources: [RES.lfFreelancing],
    },
    {
      slug: "dmp-cohort",
      title: "Join a mentored cohort",
      summary:
        "SydCrest's Delta Mentoring Program covers this field over twelve weeks with mentors and a capstone project in SEO, social media or Google Ads. Join the waitlist if you want structure, feedback and a certificate alongside this roadmap.",
      parent: "earning",
      optional: true,
      resources: [],
    },
  ],
};
