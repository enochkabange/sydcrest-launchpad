import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * New track for issue #96 (wave 3), researched as in issue #84.
 * Evidence for every node: src/content/research/virtual-assistant.md.
 * Track specific links are defined here rather than in the shared pool.
 * Every URL was checked to resolve to a real page on 25 October 2026
 * (LearnFree slugs checked against its sitemap, Google Help pages by title).
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const VA = {
  lfDocs: r("GCFGlobal LearnFree: Google Docs", "https://www.learnfree.org/series/google-docs"),
  lfBusinessComm: r("GCFGlobal LearnFree: Business Communication", "https://www.learnfree.org/series/business-communication"),
  lfWorkplace: r("GCFGlobal LearnFree: Workplace Basics", "https://www.learnfree.org/series/workplace-basics"),
  lfJobSearch: r("GCFGlobal LearnFree: Job Search and Networking", "https://www.learnfree.org/series/job-search-and-networking"),
  lfOutlook: r("GCFGlobal LearnFree: Introduction to Microsoft Outlook", "https://www.learnfree.org/series/introduction-to-microsoft-outlook"),
  lfTeams: r("GCFGlobal LearnFree: Introduction to Microsoft Teams", "https://www.learnfree.org/series/introduction-to-microsoft-teams"),
  workspaceLearning: r("Google Workspace Learning Center", "https://support.google.com/a/users"),
  gmailLabels: r("Gmail Help: Create and manage labels", "https://support.google.com/mail/answer/118708"),
  gmailFilters: r("Gmail Help: Create rules to filter your emails", "https://support.google.com/mail/answer/6579"),
  gmailSignature: r("Gmail Help: Create a Gmail signature", "https://support.google.com/mail/answer/8395"),
  calendarTimeZones: r("Google Calendar Help: Use Calendar in different time zones", "https://support.google.com/calendar/answer/37064"),
  calendarBooking: r("Google Calendar Help: Create an appointment schedule", "https://support.google.com/calendar/answer/10729749"),
  meetSchedule: r("Google Meet Help: Start or schedule a meeting", "https://support.google.com/meet/answer/9302870"),
  driveSharing: r("Google Drive Help: Share files from Google Drive", "https://support.google.com/drive/answer/2494822"),
  docsOffline: r("Google Docs Editors Help: Work offline", "https://support.google.com/docs/answer/6388102"),
  twoStep: r("Google Account Help: Turn on 2 Step Verification", "https://support.google.com/accounts/answer/185839"),
  strongPassword: r("Google Account Help: Create a strong password", "https://support.google.com/accounts/answer/32040"),
  metaBusinessSuite: r("Meta Business Suite", "https://www.facebook.com/business/tools/meta-business-suite"),
  csa: r("Cyber Security Authority Ghana", "https://www.csa.gov.gh/"),
  csaReport: r("Cyber Security Authority: Report a cyber incident", "https://www.csa.gov.gh/report"),
};

export const virtualAssistant: RoadmapDraft = {
  slug: "virtual-assistant",
  title: "Virtual Assistant and Remote Work",
  description:
    "Support busy people and businesses with email, calendars, documents, research and customer messages, for local employers or remote clients abroad. Learn the tools on your phone or computer, work reliably through power and data cuts, find honest clients and get paid safely.",
  track: "virtual-assistant",
  field_category: "business",
  level: "beginner",
  leads_to: ["project-management", "freelancing", "customer-service"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "getting-started",
      title: "Getting started as a virtual assistant",
      summary:
        "Learn what assistants actually do all day, how remote work is organised and how to work with clients in other time zones. This section sets the habits every later skill depends on.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [VA.lfWorkplace, RES.lfFreelancing],
    },
    {
      slug: "what-a-va-does",
      title: "What a virtual assistant does",
      summary:
        "A virtual assistant handles admin, communication and organising work for a client from a distance. The same skills also open office and front desk jobs in Ghanaian companies.",
      parent: "getting-started",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [VA.lfWorkplace],
    },
    {
      slug: "how-remote-work-works",
      title: "How remote work works",
      summary:
        "Remote teams rely on written updates, agreed hours and shared tools instead of sitting together. Being visible, predictable and quick to flag problems is what makes a remote worker trusted.",
      parent: "getting-started",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [VA.lfTeams, VA.workspaceLearning],
    },
    {
      slug: "time-zones",
      title: "Working across time zones",
      summary:
        "Ghana keeps GMT all year while many client countries move their clocks for summer time. Learn to convert times, state the time zone in every message and plan your day around a client's hours.",
      parent: "getting-started",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [VA.calendarTimeZones],
    },
    {
      slug: "communication",
      title: "Professional communication",
      summary:
        "Clients judge an assistant first by how they write and speak. This section covers clear writing, chat etiquette and running calls and meetings well.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [VA.lfBusinessComm, RES.lfCommunication],
    },
    {
      slug: "professional-writing",
      title: "Clear professional writing",
      summary:
        "Write short, polite and complete emails and messages in plain English that a busy reader can act on. Learn a simple structure, the right tone and how to check your work before sending.",
      parent: "communication",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [VA.lfBusinessComm, RES.lfWriting, RES.bbcEnglish],
    },
    {
      slug: "calls-and-meetings",
      title: "Calls, chat and video meetings",
      summary:
        "Handle work chat, phone calls and video meetings professionally on a phone or a laptop, even with limited data. Take clear notes and send a short summary with the actions afterwards.",
      parent: "communication",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [VA.meetSchedule, VA.lfTeams],
    },
    {
      slug: "inbox-and-calendar",
      title: "Email and calendar management",
      summary:
        "Looking after someone's inbox and diary comes up again and again in both local and remote adverts. This section teaches a system for each.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Virtual Assistant", "Administrative Secretary", "Personal Assistant and Administrator"],
      resources: [RES.lfGmail, VA.lfOutlook],
    },
    {
      slug: "email-management",
      title: "Managing a client's inbox",
      summary:
        "Sort incoming email into what needs action, waiting and reference, using labels, filters and saved replies. Agree clear rules with the client about what you may answer on their behalf.",
      parent: "inbox-and-calendar",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [VA.gmailLabels, VA.gmailFilters, VA.gmailSignature],
    },
    {
      slug: "calendar-management",
      title: "Managing calendars and bookings",
      summary:
        "Schedule meetings, send invitations, protect focus time and handle changes without double bookings. The same care applies when you arrange travel or an event for a client.",
      parent: "inbox-and-calendar",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [VA.calendarBooking, VA.calendarTimeZones],
    },
    {
      slug: "documents-and-data",
      title: "Documents, spreadsheets and research",
      summary:
        "Assistants produce letters, reports, trackers and research summaries every week. This section covers the free office tools and the habits that keep that work accurate and easy to find.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Virtual Assistant / Admin Assistant", "Administrative and Operations Assistant"],
      resources: [VA.workspaceLearning, RES.lfDrive],
    },
    {
      slug: "documents",
      title: "Documents, templates and shared files",
      summary:
        "Format clean documents with headings and templates, export PDFs and keep files in a tidy shared folder structure. Share with the right access so nothing private leaks.",
      parent: "documents-and-data",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [VA.lfDocs, VA.driveSharing],
    },
    {
      slug: "spreadsheets",
      title: "Spreadsheets and data entry",
      summary:
        "Enter data accurately, keep a tidy table and use sorting, filters and a few simple formulas. Trackers for leads, invoices, stock and tasks are everyday assistant work.",
      parent: "documents-and-data",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfSheets, RES.sheetsHelp],
    },
    {
      slug: "online-research",
      title: "Online research",
      summary:
        "Find reliable information quickly, check it against a second source and present it as a short summary with links. Clients ask assistants to research suppliers, prices, venues, contacts and competitors.",
      parent: "documents-and-data",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfSearch, RES.lfThinking],
    },
    {
      slug: "client-tasks",
      title: "Everyday client tasks",
      summary:
        "Beyond inbox and documents, clients often hand assistants their customer messages, social media posting and task lists. This section covers each at a beginner level.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Customer Service Representative", "Customer Support", "Office Assistant / Front Desk Executive"],
      resources: [VA.lfWorkplace],
    },
    {
      slug: "customer-support",
      title: "Customer support basics",
      summary:
        "Answer customer questions by email, chat and phone with patience, accuracy and a record of every case. Know when to solve a problem yourself and when to pass it to the client.",
      parent: "client-tasks",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfCommunication, RES.whatsappBusiness],
    },
    {
      slug: "social-media-scheduling",
      title: "Social media scheduling",
      summary:
        "Plan a simple content calendar and schedule a client's posts in advance with free tools. Report back on what was posted and pass comments and messages to the right person.",
      parent: "client-tasks",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [VA.metaBusinessSuite, RES.lfCanva],
    },
    {
      slug: "task-tools-and-sops",
      title: "Task lists, tools and written procedures",
      summary:
        "Track your work in a shared task board or list so the client always sees progress. Write simple step by step procedures for repeated tasks so the work is consistent and easy to hand over.",
      parent: "client-tasks",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [VA.workspaceLearning, VA.lfTeams],
    },
    {
      slug: "working-reliably",
      title: "Working reliably and safely from Ghana",
      summary:
        "Remote clients care most that work arrives on time and their information stays safe. This section covers power and data cuts, devices and account security.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Executive Assistant", "Executive Virtual Assistant and Executive Assistant"],
      resources: [RES.lfSafety],
    },
    {
      slug: "power-and-data",
      title: "Staying reliable with patchy power and data",
      summary:
        "Plan for power cuts and weak signal with offline tools, charged backups, a second network and early warnings to the client. Being honest about your setup builds more trust than pretending it is perfect.",
      parent: "working-reliably",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [VA.docsOffline],
    },
    {
      slug: "account-security",
      title: "Keeping client accounts and data safe",
      summary:
        "Protect your own and your client's accounts with strong passwords, two step verification and careful sharing. Treat client information as confidential and spot phishing before it costs anyone money.",
      parent: "working-reliably",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [VA.twoStep, VA.strongPassword, RES.lfSafety],
    },
    {
      slug: "getting-work",
      title: "Finding work and getting paid",
      summary:
        "Skills only pay when someone hires you and the money reaches you safely. This section covers your profile, finding honest clients, avoiding scams and receiving payment.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Office Administrator", "HR and Administration Officer"],
      resources: [RES.lfFreelancing, VA.lfJobSearch],
    },
    {
      slug: "portfolio-and-profile",
      title: "Your profile and work samples",
      summary:
        "Build a short profile and a few sample pieces that prove you can do assistant work, even before your first client. Practice tasks from this roadmap make good samples.",
      parent: "getting-work",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfResume, RES.lfLinkedin],
    },
    {
      slug: "finding-clients",
      title: "Finding clients and jobs",
      summary:
        "Look for work with local businesses, Ghanaian job boards, remote job boards and freelance platforms, and check every advert's location rules and hours. Start close to home and grow from there.",
      parent: "getting-work",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [VA.lfJobSearch, RES.lfFreelancing],
    },
    {
      slug: "avoiding-scams",
      title: "Spotting job and payment scams",
      summary:
        "Fake remote jobs often ask for fees, promise easy money or try to use your accounts. Learn the warning signs and where to report a scam in Ghana.",
      parent: "getting-work",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [VA.csaReport, VA.csa, RES.lfSafety],
    },
    {
      slug: "getting-paid",
      title: "Agreements, invoices and getting paid from abroad",
      summary:
        "Agree the scope, rate and payment terms in writing, send clear invoices and choose a payment route you understand. Compare every fee and exchange rate before you accept a client's payment method.",
      parent: "getting-work",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfMoney, RES.bog],
    },
  ],
};
