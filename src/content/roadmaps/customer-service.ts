import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve (27 October 2026). */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const generationDcs = r("Generation Ghana: Digital Customer Service programme", "https://ghana.generation.org/digital-customer-service/");
const hubspotServiceCourse = r(
  "HubSpot Academy: Customer service course (free account)",
  "https://academy.hubspot.com/courses/customer-service",
  "video",
);
const hubspotServiceSkills = r("HubSpot: Customer service skills", "https://blog.hubspot.com/service/customer-service-skills");
const hubspotEmailTemplates = r(
  "HubSpot: Customer service email templates",
  "https://blog.hubspot.com/service/customer-service-email-templates",
);
const hubspotEscalation = r("HubSpot: Escalation management", "https://blog.hubspot.com/service/escalation-management");
const hubspotFirstCall = r("HubSpot: First call resolution", "https://blog.hubspot.com/service/first-call-resolution");
const hubspotServiceResume = r("HubSpot: Customer service resume tips", "https://blog.hubspot.com/service/customer-service-resume");
const zendeskSkills = r("Zendesk: Customer service skills", "https://www.zendesk.com/blog/customer-service-skills/");
const zendeskTickets = r("Zendesk: What a ticketing system is", "https://www.zendesk.com/blog/ticketing-system/");
const zendeskKnowledgeBase = r("Zendesk: Knowledge bases explained", "https://www.zendesk.com/blog/knowledge-base/");
const zendeskCsat = r("Zendesk: Customer satisfaction score", "https://www.zendesk.com/blog/customer-satisfaction-score/");
const zendeskBurnout = r("Zendesk: Avoiding call centre burnout", "https://www.zendesk.com/blog/call-center-burnout/");
const freshdesk = r("Freshdesk (example help desk with a free plan)", "https://www.freshworks.com/freshdesk/", "practice");
const zohoDesk = r("Zoho Desk (example help desk)", "https://www.zoho.com/desk/", "practice");
const hubspotCrm = r("HubSpot free CRM (example)", "https://www.hubspot.com/products/crm/free", "practice");
const salesforceCrm = r("Salesforce: What is CRM", "https://www.salesforce.com/crm/what-is-crm/");
const tedListen = r("TED: Five ways to listen better", "https://www.ted.com/talks/julian_treasure_5_ways_to_listen_better", "video");
const tedConversation = r(
  "TED: Ten ways to have a better conversation",
  "https://www.ted.com/talks/celeste_headlee_10_ways_to_have_a_better_conversation",
  "video",
);
const whoStress = r("WHO: Questions and answers on stress", "https://www.who.int/news-room/questions-and-answers/item/stress");
const bog = r("Bank of Ghana", "https://www.bog.gov.gh/");
const csa = r("Cyber Security Authority, Ghana", "https://www.csa.gov.gh/");

export const customerService: RoadmapDraft = {
  slug: "customer-service",
  title: "Digital Customer Service",
  description:
    "Help customers by phone, chat, WhatsApp and email for banks, fintechs, delivery firms and remote support teams. Learn tickets, CRM records, calm problem solving and service quality, and do almost all of it on a phone or a computer.",
  track: "customer-service",
  field_category: "business",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "service-foundations",
      title: "Service foundations",
      summary:
        "Good support starts with listening, clear writing and knowing what the job involves day to day. You can do everything in this section on a phone or a computer with a small data bundle.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.lfCommunication, hubspotServiceSkills],
    },
    {
      slug: "what-support-agents-do",
      title: "What a support agent does",
      summary:
        "Support agents answer questions, fix problems and keep records for banks, fintechs, delivery firms, online businesses and remote companies, often in shifts. You will see the common job titles and how call centre, live chat and remote roles differ.",
      parent: "service-foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [zendeskSkills, generationDcs],
    },
    {
      slug: "listening-and-empathy",
      title: "Listening, empathy and tone",
      summary:
        "Customers calm down when they feel heard, so you will practise listening fully, repeating the problem back and choosing warm, respectful words. Tone matters on the phone and in text, where a short reply can sound rude without meaning to.",
      parent: "service-foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [tedListen, tedConversation],
    },
    {
      slug: "typing-and-writing",
      title: "Typing speed and clear writing",
      summary:
        "Chat and email agents type all day, so speed and accuracy are often tested at interview. You will build typing speed on a phone or laptop and learn to write short, correct, friendly sentences.",
      parent: "service-foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfTyping, RES.monkeytype, RES.lfWriting],
    },
    {
      slug: "languages-at-work",
      title: "English and local languages at work",
      summary:
        "Most support in Ghana runs in English, but speaking Dagbani, Hausa, Twi or another language can win trust and is sometimes asked for in adverts. You will practise clear spoken English and learn when and how to switch language politely.",
      parent: "service-foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.bbcEnglish],
    },
    {
      slug: "support-channels",
      title: "Support channels",
      summary:
        "Customers reach companies by phone, live chat, WhatsApp, email and social media, and each channel has its own habits. This section covers how to handle each one well.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "junior",
      jobs: ["Customer Service Representative", "Customer Service Agent", "Call Centre Agent"],
      resources: [hubspotServiceCourse],
    },
    {
      slug: "phone-support",
      title: "Phone calls and call scripts",
      summary:
        "Phone work means greeting, verifying the caller, solving or logging the issue and closing the call politely, often while following a script. You will learn to use a script without sounding like a robot and to handle both inbound and outbound calls.",
      parent: "support-channels",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [hubspotFirstCall, tedConversation],
    },
    {
      slug: "chat-and-whatsapp",
      title: "Live chat and WhatsApp support",
      summary:
        "Chat agents often handle several conversations at once, so short clear messages and saved replies matter. You will learn chat manners, how to keep customers updated while you check something, and how businesses use WhatsApp Business for support.",
      parent: "support-channels",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.whatsappBusiness, RES.whatsappFaq],
    },
    {
      slug: "email-support",
      title: "Email replies that solve the problem",
      summary:
        "A good support email answers the question fully, in plain words, with clear next steps so the customer does not have to write again. You will practise structure, subject lines and templates you can adapt.",
      parent: "support-channels",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [hubspotEmailTemplates, RES.lfBizWriting],
    },
    {
      slug: "social-media-replies",
      title: "Public replies on social media",
      summary:
        "Complaints on Facebook, X or Instagram are seen by everyone, so replies must be calm, quick and move private details into a direct message. This is optional but useful for roles at brands and small businesses.",
      parent: "support-channels",
      optional: true,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.metaLearn],
    },
    {
      slug: "tickets-and-tools",
      title: "Tickets and support tools",
      summary:
        "Support teams track every request in a help desk or CRM so nothing gets lost. Many of these tools have free plans or trials you can explore in a browser.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Live Chat Support Agent", "Customer Service Associate", "Customer Support"],
      resources: [zendeskTickets, freshdesk],
    },
    {
      slug: "helpdesk-tickets",
      title: "Tickets, queues and priorities",
      summary:
        "A ticket records who asked, what the problem is, how urgent it is and what has been done so far. You will learn how queues, priorities, statuses and tags work in tools like Zendesk, Freshdesk or Zoho Desk, which are named here only as examples.",
      parent: "tickets-and-tools",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [zendeskTickets, freshdesk, zohoDesk],
    },
    {
      slug: "crm-records",
      title: "Customer records in a CRM",
      summary:
        "A CRM keeps each customer's details and history so any agent can pick up where the last one stopped. You will learn to search, update and write useful notes on a customer record, and why accurate records matter for the whole team.",
      parent: "tickets-and-tools",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [salesforceCrm, hubspotCrm],
    },
    {
      slug: "knowledge-base",
      title: "Knowledge bases and saved replies",
      summary:
        "Help articles and saved replies let you answer common questions quickly and consistently. You will learn to find answers fast, adapt saved replies so they sound human, and suggest new articles when the same question keeps coming up.",
      parent: "tickets-and-tools",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [zendeskKnowledgeBase],
    },
    {
      slug: "solving-problems",
      title: "Solving problems",
      summary:
        "The heart of the job is finding out what is really wrong and fixing it or passing it to the right person. This section covers questioning, complaints, escalation and payment issues.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Customer Experience Associate", "Customer Service and App Support Agent"],
      resources: [RES.lfThinking],
    },
    {
      slug: "finding-the-real-problem",
      title: "Asking questions to find the real problem",
      summary:
        "Customers describe symptoms, not causes, so you will learn a simple order of questions to narrow a problem down. This includes first level troubleshooting such as checking the app version, network, account status and recent changes.",
      parent: "solving-problems",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfThinking, hubspotFirstCall],
    },
    {
      slug: "complaints-and-upset-customers",
      title: "Handling complaints and upset customers",
      summary:
        "An angry customer is usually a worried one, so you will practise staying calm, apologising for the experience and agreeing a clear next step. You will also learn when to set a polite limit if a customer becomes abusive.",
      parent: "solving-problems",
      optional: false,
      difficulty: "intermediate",
      complexity: 4,
      resources: [RES.lfCommunication, zendeskSkills],
    },
    {
      slug: "escalation-and-handover",
      title: "Escalation and handover",
      summary:
        "Some problems need a supervisor, a technical team or another department, and a good handover saves the customer from repeating everything. You will learn when to escalate, what to write in the note and how to tell the customer what happens next.",
      parent: "solving-problems",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [hubspotEscalation],
    },
    {
      slug: "payments-and-account-security",
      title: "Payments, refunds and account security",
      summary:
        "Many support roles deal with mobile money transfers, failed payments, reversals and refunds, where mistakes cost real cedis. You will learn to verify customers safely, never ask for a PIN or password, and spot common fraud and impersonation tricks.",
      parent: "solving-problems",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [bog, csa],
    },
    {
      slug: "quality-and-wellbeing",
      title: "Quality and wellbeing",
      summary:
        "Support teams measure quality, protect customer data and work long shifts. This section helps you do well on all three without burning out.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Customer Success Lead", "Call Center Specialist"],
      resources: [zendeskCsat],
    },
    {
      slug: "service-metrics",
      title: "Service levels and quality scores",
      summary:
        "Teams track measures such as response time, first contact resolution and customer satisfaction scores, and your targets will be built on them. You will learn what each measure means and how to improve yours without rushing customers.",
      parent: "quality-and-wellbeing",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [zendeskCsat, hubspotFirstCall],
    },
    {
      slug: "protecting-customer-data",
      title: "Protecting customer data",
      summary:
        "Agents see phone numbers, account details and sometimes ID numbers, and Ghana's Data Protection Act sets rules for handling them. You will learn safe habits such as verifying identity, not sharing screens or photos of records, and locking your device.",
      parent: "quality-and-wellbeing",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.dpc],
    },
    {
      slug: "stress-and-shifts",
      title: "Managing stress and shift work",
      summary:
        "Back to back calls, night shifts and difficult customers can wear you down. You will learn practical ways to recover between contacts, plan sleep and meals around shifts, and ask for help early.",
      parent: "quality-and-wellbeing",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [zendeskBurnout, whoStress],
    },
    {
      slug: "getting-hired-support",
      title: "Getting hired",
      summary:
        "Support employers test how you write, speak and solve problems, so practice matters more than certificates. This section helps you show those skills and find your first role.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Customer Service Representative", "Lead Caller", "Customer Service Agent"],
      resources: [RES.lfJobsearch],
    },
    {
      slug: "support-practice-portfolio",
      title: "A practice portfolio for support roles",
      summary:
        "Collect sample email and chat replies, a recorded practice call and a few mock tickets you have handled from start to finish. These show an employer or a training programme what you can already do.",
      parent: "getting-hired-support",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [hubspotServiceResume, RES.lfResume],
    },
    {
      slug: "finding-support-roles",
      title: "Finding support roles and programmes",
      summary:
        "Entry routes include call centres, national service placements, part time chat roles, remote support teams and free training programmes such as Generation Ghana's Digital Customer Service. You will learn to read adverts, prepare for typing and voice tests, and check that an offer is genuine before you share documents or pay anything.",
      parent: "getting-hired-support",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [generationDcs, RES.lfInterview, RES.lfJobsearch],
    },
  ],
};
