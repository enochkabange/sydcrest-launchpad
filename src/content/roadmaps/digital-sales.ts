import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve (27 October 2026). */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const hubspotInboundSales = r(
  "HubSpot Academy: Inbound sales course (free account)",
  "https://academy.hubspot.com/courses/inbound-sales",
  "video",
);
const hubspotObjections = r(
  "HubSpot: Handling common sales objections",
  "https://blog.hubspot.com/sales/handling-common-sales-objections",
);
const hubspotPipeline = r("HubSpot: What a sales pipeline is", "https://blog.hubspot.com/sales/sales-pipeline");
const hubspotBant = r("HubSpot: BANT lead qualification", "https://blog.hubspot.com/sales/bant");
const hubspotCrm = r("HubSpot free CRM (example)", "https://www.hubspot.com/products/crm/free", "practice");
const zohoBigin = r("Zoho Bigin (example small business CRM)", "https://www.zoho.com/bigin/", "practice");
const salesforceCrm = r("Salesforce: What is CRM", "https://www.salesforce.com/crm/what-is-crm/");
const ponDaily = r("Harvard Program on Negotiation: free articles", "https://www.pon.harvard.edu/daily/");
const tedConversation = r(
  "TED: Ten ways to have a better conversation",
  "https://www.ted.com/talks/celeste_headlee_10_ways_to_have_a_better_conversation",
  "video",
);
const tedListen = r("TED: Five ways to listen better", "https://www.ted.com/talks/julian_treasure_5_ways_to_listen_better", "video");
const linkedinHelp = r("LinkedIn Help", "https://www.linkedin.com/help/linkedin");
const gmailHelp = r("Gmail Help", "https://support.google.com/mail");
const sheetsConditional = r(
  "Google Sheets: Conditional formatting rules",
  "https://support.google.com/docs/answer/78413",
);
const sheetsPivot = r("Google Sheets: Create and use pivot tables", "https://support.google.com/docs/answer/1272900");
const whoStress = r("WHO: Questions and answers on stress", "https://www.who.int/news-room/questions-and-answers/item/stress");

export const digitalSales: RoadmapDraft = {
  slug: "digital-sales",
  title: "Digital Sales",
  description:
    "Sell for businesses using the phone, WhatsApp, email and a simple CRM. Learn to find and qualify leads, hold good sales conversations, keep a pipeline and close honestly, all from a phone or a computer.",
  track: "digital-sales",
  field_category: "business",
  level: "beginner",
  leads_to: ["digital-business"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "sales-foundations",
      title: "Sales foundations",
      summary:
        "Selling well means understanding people, your product and how sales teams measure work. This section sets out what a sales job really involves before you pick up the phone.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.lfCommunication, hubspotInboundSales],
    },
    {
      slug: "how-selling-works",
      title: "How selling works",
      summary:
        "You will see the difference between selling to individuals and selling to businesses, and roles such as telesales, field sales, sales executive and business development representative. You will also learn how a lead becomes a customer through a series of steps.",
      parent: "sales-foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [hubspotPipeline, hubspotInboundSales],
    },
    {
      slug: "knowing-your-product",
      title: "Knowing your product and your customer",
      summary:
        "People buy solutions to their problems, so you need to know what your product does, who it helps and why it beats the alternatives. You will practise describing a product's value in one or two plain sentences, for example an internet plan for a Tamale shop.",
      parent: "sales-foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfCommunication],
    },
    {
      slug: "targets-and-numbers",
      title: "Targets and sales numbers",
      summary:
        "Sales teams track calls made, meetings booked, deals won and money collected against daily, weekly and monthly targets. You will learn what these numbers mean, how commission usually works, and how to read an offer letter carefully before you accept.",
      parent: "sales-foundations",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [hubspotPipeline],
    },
    {
      slug: "finding-prospects",
      title: "Finding prospects",
      summary:
        "Every sale starts with someone who might need what you sell. This section covers finding leads, deciding which ones are worth your time and answering people who come to you.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Business Development Rep", "Graduate Trainee Sales", "Sales Representative"],
      resources: [hubspotBant],
    },
    {
      slug: "finding-leads",
      title: "Finding and listing leads",
      summary:
        "Leads come from referrals, business directories, Google Maps, social media, events and walking a market street. You will build a simple lead list in a spreadsheet with the details you need to contact each one.",
      parent: "finding-prospects",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfSheets, RES.googleBusiness],
    },
    {
      slug: "qualifying-leads",
      title: "Qualifying leads",
      summary:
        "Not every lead can or will buy, so you will learn quick checks on need, budget, timing and who makes the decision, often called BANT. Qualifying early saves your time and the customer's.",
      parent: "finding-prospects",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [hubspotBant],
    },
    {
      slug: "inbound-enquiries",
      title: "Responding to inbound enquiries",
      summary:
        "When someone messages or calls about a product, a fast and helpful reply often decides the sale. You will learn to answer quickly, ask the right questions and record each enquiry so it is not forgotten.",
      parent: "finding-prospects",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.whatsappBusiness, RES.lfBizWriting],
    },
    {
      slug: "reaching-out",
      title: "Reaching out",
      summary:
        "Once you have leads, you contact them by phone, WhatsApp, email or LinkedIn. This section covers each channel and how to stay polite and persistent without spamming.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Outbound Telesales Agent", "Telesales Representative"],
      resources: [RES.lfBizWriting],
    },
    {
      slug: "calls-and-telesales",
      title: "Cold calls and telesales",
      summary:
        "Phone selling means a short opening, a reason for the call and a clear question, all in the first few seconds. You will practise scripts you can adapt, handling a quick no, and booking a next step.",
      parent: "reaching-out",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [tedConversation, hubspotInboundSales],
    },
    {
      slug: "selling-on-whatsapp",
      title: "Selling on WhatsApp Business",
      summary:
        "Many Ghanaian customers prefer to buy through WhatsApp, so you will learn catalogues, labels, quick replies and broadcast lists in WhatsApp Business. You will also learn the line between helpful follow up and spam, and why consent matters.",
      parent: "reaching-out",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.whatsappBusiness, RES.whatsappFaq],
    },
    {
      slug: "email-and-linkedin-outreach",
      title: "Email and LinkedIn outreach",
      summary:
        "Selling to businesses often starts with a short, personal email or LinkedIn message that explains why you are writing to that person. You will write outreach messages and polite follow ups that get replies.",
      parent: "reaching-out",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [gmailHelp, linkedinHelp, RES.lfLinkedin],
    },
    {
      slug: "sales-conversations",
      title: "Sales conversations",
      summary:
        "A sales conversation is mostly listening, then matching your offer to what you heard. This section covers questions, offers, objections and closing.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Sales Executive", "Sales and Marketing Officer"],
      resources: [tedListen],
    },
    {
      slug: "discovery-questions",
      title: "Discovery questions and listening",
      summary:
        "Good open questions uncover what the customer needs, what they use now and what is stopping them. You will practise asking, listening and summarising before you suggest anything.",
      parent: "sales-conversations",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [tedListen, tedConversation],
    },
    {
      slug: "presenting-offers",
      title: "Presenting offers, quotes and proposals",
      summary:
        "You will learn to present an offer around the customer's needs and to prepare a clear quote or short proposal. Simple, honest pricing and a clear next step make it easy to say yes.",
      parent: "sales-conversations",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "handling-objections",
      title: "Handling objections",
      summary:
        "Objections about price, timing or trust are normal and often mean the customer is interested. You will learn to listen, ask what lies behind the concern and answer honestly, without pressure.",
      parent: "sales-conversations",
      optional: false,
      difficulty: "intermediate",
      complexity: 4,
      resources: [hubspotObjections],
    },
    {
      slug: "negotiating-and-closing",
      title: "Negotiating and closing",
      summary:
        "Closing means asking clearly for the decision and agreeing the details, such as price, delivery and payment by mobile money or bank. You will practise negotiating fairly so both sides are happy and the customer comes back.",
      parent: "sales-conversations",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [ponDaily],
    },
    {
      slug: "pipeline-and-crm",
      title: "Pipeline and CRM",
      summary:
        "A pipeline shows every deal and what stage it is at, so nothing slips through the cracks. You can run one in a free CRM or a spreadsheet on your phone or computer.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Sales Account Representative", "Business Development and Telesales Consultant"],
      resources: [hubspotPipeline, salesforceCrm],
    },
    {
      slug: "using-a-crm",
      title: "Using a free CRM",
      summary:
        "A CRM stores contacts, deals, calls and notes in one place, and many employers ask for CRM experience. You will set up a free CRM such as HubSpot or Zoho Bigin, named only as examples, and log a few practice deals.",
      parent: "pipeline-and-crm",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [hubspotCrm, zohoBigin, salesforceCrm],
    },
    {
      slug: "pipeline-and-follow-up",
      title: "Pipeline stages and follow up",
      summary:
        "Most deals need several contacts before a decision, so you will learn to set pipeline stages and schedule the next action for every lead. Regular, useful follow up is where many sales are won.",
      parent: "pipeline-and-crm",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [hubspotPipeline],
    },
    {
      slug: "sales-reports",
      title: "Sales reports in a spreadsheet",
      summary:
        "Managers want to know what you sold, what is coming and where deals get stuck. You will build a weekly sales report in Google Sheets or Excel with totals, a simple chart and highlighted overdue follow ups.",
      parent: "pipeline-and-crm",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [sheetsPivot, sheetsConditional, RES.lfSheets],
    },
    {
      slug: "working-well-in-sales",
      title: "Working well in sales",
      summary:
        "Lasting sales careers are built on trust, good habits and the ability to bounce back. This section covers ethics, data, tools and resilience.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Growth and Strategic Partnerships Associate", "Customer Reactivation Specialist"],
      resources: [RES.lfThinking],
    },
    {
      slug: "honest-selling-and-data",
      title: "Honest selling and customer data",
      summary:
        "Never promise what a product cannot do, never pressure people into debt and always respect a no. You will also learn the basics of Ghana's Data Protection Act for contact lists, consent and opting out.",
      parent: "working-well-in-sales",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.dpc],
    },
    {
      slug: "ai-for-sales",
      title: "Using AI assistants in sales",
      summary:
        "AI assistants can draft messages, summarise calls and research a company, but you must check every fact and never paste private customer data into them. This topic is optional and builds on the AI Tools for Work track.",
      parent: "working-well-in-sales",
      optional: true,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfThinking],
    },
    {
      slug: "resilience-and-planning",
      title: "Resilience and planning your day",
      summary:
        "Hearing no many times a day is part of sales, so you will learn to treat rejection as information rather than failure. You will also plan your day in blocks for calls, follow ups and admin so targets feel manageable.",
      parent: "working-well-in-sales",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [whoStress],
    },
    {
      slug: "getting-hired-sales",
      title: "Getting hired",
      summary:
        "Sales employers want proof you can talk to people, stay organised and keep going. This section helps you show that and find a first role.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Sales Representative", "Graduate Trainee Sales", "Field Sales Executive"],
      resources: [RES.lfJobsearch],
    },
    {
      slug: "showing-sales-skills",
      title: "Showing your sales skills",
      summary:
        "Record a practice call, keep a sample pipeline and write up a small real sale you made, such as helping a relative sell farm produce or phone credit. These make your CV and interviews far more convincing than words alone.",
      parent: "getting-hired-sales",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfResume, RES.lfInterview],
    },
    {
      slug: "finding-sales-roles",
      title: "Finding sales roles",
      summary:
        "Entry routes include graduate trainee schemes, telesales teams, field sales for telcos, fintechs and agri input firms, and remote roles for software companies. You will learn to read adverts and offers carefully, and to walk away from any job that asks you to pay to start.",
      parent: "getting-hired-sales",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfJobsearch, RES.lfInterview],
    },
  ],
};
