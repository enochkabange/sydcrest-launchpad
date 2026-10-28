import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve (October 2026). */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const sheetsTraining = r(
  "Google Workspace Learning Center: Sheets training and help",
  "https://support.google.com/a/users/answer/9282959",
  "practice",
);
const sheetsSortFilter = r("Google Sheets Help: Sort and filter your data", "https://support.google.com/docs/answer/3540681");
const sheetsDropdown = r("Google Sheets Help: Create an in cell dropdown list", "https://support.google.com/docs/answer/186103");
const sheetsPivot = r("Google Sheets Help: Create and use pivot tables", "https://support.google.com/docs/answer/1272900");
const formsFirst = r(
  "Google Workspace Learning Center: Create your first form",
  "https://support.google.com/a/users/answer/9303071",
  "practice",
);
const formsHowTo = r("Google Forms Help: How to use Google Forms", "https://support.google.com/docs/answer/6281888");
const formsResponses = r("Google Forms Help: Choose where to save form responses", "https://support.google.com/docs/answer/2917686");
const koboDocs = r("KoboToolbox documentation", "https://support.kobotoolbox.org/");
const odkDocs = r("ODK documentation: Getting started", "https://docs.getodk.org/getting-started/");
const odkCollect = r("ODK documentation: ODK Collect", "https://docs.getodk.org/collect-intro/");
const xlsform = r("XLSForm reference", "https://xlsform.org/en/");
const sitesHelp = r("Google Sites Help: How to use Google Sites", "https://support.google.com/sites/answer/6372878", "practice");
const learnWp = r("Learn WordPress: Beginner WordPress User course", "https://learn.wordpress.org/course/beginner-wordpress-user/", "practice");
const wpDocs = r("WordPress documentation", "https://wordpress.org/documentation/");
const mdnDomain = r(
  "MDN: What is a domain name",
  "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name",
);
const mdnServer = r(
  "MDN: What is a web server",
  "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server",
);
const glideStart = r("Glide Docs: Quick start", "https://www.glideapps.com/docs/getting-started", "practice");
const appsheetDesign = r("AppSheet Help: App design 101", "https://support.google.com/appsheet/answer/10099795");
const powerApps = r("Microsoft Learn: Power Apps documentation", "https://learn.microsoft.com/en-us/power-apps/");
const airtableHelp = r("Airtable Support", "https://support.airtable.com/");
const zapierZap = r("Zapier Help: What is a Zap", "https://help.zapier.com/hc/en-us/articles/8496309697421");
const zapierLearn = r("Zapier Guides", "https://zapier.com/learn");
const makeAcademy = r("Make Academy (free lessons)", "https://academy.make.com/", "practice");
const powerAutomate = r("Microsoft Learn: Power Automate documentation", "https://learn.microsoft.com/en-us/power-automate/");
const powerPlatformPath = r(
  "Microsoft Learn: Power Platform fundamentals path",
  "https://learn.microsoft.com/en-us/training/paths/power-plat-fundamentals/",
  "practice",
);
const appsScript = r("Google Apps Script overview", "https://developers.google.com/apps-script");
const n8nDocs = r("n8n documentation", "https://docs.n8n.io/");
const copilotStudio = r("Microsoft Learn: Copilot Studio documentation", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/");
const driveSharing = r(
  "Google Drive Help: Share and manage access to files and folders",
  "https://support.google.com/drive/answer/2494822",
);
const google2sv = r("Google Account Help: Turn on 2 Step Verification", "https://support.google.com/accounts/answer/185839");
const nngTesting = r("NN/g: Usability testing 101", "https://www.nngroup.com/articles/usability-testing-101/");
const writeTheDocs = r("Write the Docs: How to write software documentation", "https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/");
const jobberman = r("Jobberman Ghana job listings (example board)", "https://www.jobberman.com.gh/", "practice");

export const noCode: RoadmapDraft = {
  slug: "no-code-automation",
  title: "No Code and Automation",
  description:
    "Build forms, field surveys, simple apps, websites and time saving automations for shops, NGOs, schools and small offices without writing code. Learn to keep data clean and private, test your builds, hand them over to clients, and turn small projects into paid work, with honest notes on what you can do on a phone and when a computer really helps.",
  track: "no-code",
  field_category: "software",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "no-code-basics",
      title: "Starting with no code",
      summary:
        "No code tools let you build useful things by clicking, dragging and filling in settings instead of writing programs. This section explains what you can build, which device you need, and how free plans work.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [zapierLearn],
    },
    {
      slug: "what-no-code-builds",
      title: "What you can build without code",
      summary:
        "A Tamale shop can take orders through a form, an NGO can run a field survey, and a school can track fees in a small app, all without a programmer. Learn to spot the repeated, manual tasks in a business that a form, app, website or automation could take over.",
      parent: "no-code-basics",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [powerPlatformPath],
    },
    {
      slug: "phone-or-laptop",
      title: "Phone, computer and data honestly",
      summary:
        "Filling in forms, collecting survey data and checking automations work well on a phone, but building apps, websites and multi step workflows is far easier on a computer, whether your own or one at a school, hub or cafe. Learn which tasks to do where, and how to plan your building time around data bundles and power.",
      parent: "no-code-basics",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [sheetsTraining],
    },
    {
      slug: "free-plans-and-limits",
      title: "Free plans, limits and accounts",
      summary:
        "Most no code tools offer a free plan with limits on users, records or how many automated tasks run each month, and those limits can change. Learn to read a plan page, keep your logins safe with two step verification, and choose tools a client can afford to keep.",
      parent: "no-code-basics",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [google2sv],
    },
    {
      slug: "data-first",
      title: "Data first: spreadsheets",
      summary:
        "Almost every no code build stores its information in a table, so spreadsheet skills come before anything else. This section covers setting up tables, keeping data clean and turning it into simple reports.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "junior",
      jobs: ["Operations Assistant"],
      resources: [RES.sheetsHelp],
    },
    {
      slug: "spreadsheets-as-databases",
      title: "Spreadsheets as a simple database",
      summary:
        "A spreadsheet works like a database when each row is one record, each column holds one kind of information and every row has a unique ID. Learn to design tables for customers, orders or stock that apps and automations can read without breaking.",
      parent: "data-first",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [sheetsTraining, airtableHelp],
    },
    {
      slug: "clean-data",
      title: "Clean data and validation",
      summary:
        "Messy data, like phone numbers typed five different ways or blank required fields, breaks reports and automations. Learn to use dropdowns, validation rules, sorting and filtering to stop mistakes at the start and fix the ones that slip through.",
      parent: "data-first",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [sheetsDropdown, sheetsSortFilter],
    },
    {
      slug: "reports-and-dashboards",
      title: "Simple reports and dashboards",
      summary:
        "Clients want answers, like which product sold most this week or how many households a survey reached. Learn to build summaries with pivot tables and simple charts, and to share a dashboard that updates as new data arrives.",
      parent: "data-first",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [sheetsPivot, RES.lookerHelp],
    },
    {
      slug: "forms",
      title: "Forms and data collection",
      summary:
        "Forms are the front door for most no code systems, collecting orders, bookings, registrations and survey answers. This section covers everyday online forms and offline field surveys used by NGOs.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "junior",
      jobs: ["Enumerator", "Field/Data Collection Officer", "Enumerators, digital data collection"],
      resources: [formsHowTo],
    },
    {
      slug: "online-forms",
      title: "Online forms for orders and bookings",
      summary:
        "An online form can take orders for a chop bar, register members of a church youth group or book appointments, with every answer landing in a spreadsheet. Learn to write clear questions, choose the right question types and connect responses to a sheet, all of which works on a phone or a computer.",
      parent: "forms",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [formsFirst, formsResponses],
    },
    {
      slug: "field-surveys",
      title: "Field surveys with KoboToolbox and ODK",
      summary:
        "NGOs and research teams in the north collect household and farm data with mobile survey tools that keep working offline and upload later. Learn how these tools work, how enumerators use them on Android phones, and why this skill appears in data collection adverts.",
      parent: "forms",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [koboDocs, odkCollect],
    },
    {
      slug: "survey-logic",
      title: "Skip logic, checks and XLSForm",
      summary:
        "Good surveys skip questions that do not apply, check answers as they are entered and only ask what the project needs. Learn skip logic, constraints and the XLSForm spreadsheet format, which is easiest to edit on a computer.",
      parent: "forms",
      optional: true,
      difficulty: "advanced",
      complexity: 4,
      resources: [xlsform, odkDocs],
    },
    {
      slug: "websites",
      title: "Websites without code",
      summary:
        "Many small businesses and organisations need a simple website they can show customers and funders. This section covers choosing a builder, WordPress basics and putting a site live on its own address.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Web Developer", "Social Media Officer"],
      resources: [mdnServer],
    },
    {
      slug: "site-builders",
      title: "Choosing a website builder",
      summary:
        "Website builders range from very simple page tools to full systems that grow with a business, and each one trades ease against control and cost. Learn to match the builder to the client, and start with a free one page site you can partly edit from a phone.",
      parent: "websites",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [sitesHelp],
    },
    {
      slug: "wordpress-basics",
      title: "WordPress basics",
      summary:
        "WordPress runs many business and NGO websites and appears in Ghanaian job adverts for web and communications roles. Learn pages, posts, themes, plugins and user roles, ideally on a computer, and how to keep a site updated and backed up.",
      parent: "websites",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [learnWp, wpDocs],
    },
    {
      slug: "going-live",
      title: "Domains, hosting and a findable site",
      summary:
        "A real business site needs a domain name, hosting and basic care so customers can find it on Google and it loads quickly on slow mobile data. Learn how domains and hosting fit together, who should own the accounts, and the simple checks for speed, search and accessibility.",
      parent: "websites",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [mdnDomain, RES.seoStarter, RES.pagespeed],
    },
    {
      slug: "apps",
      title: "Simple apps",
      summary:
        "App builders turn a spreadsheet into a phone app that staff or customers can use. This section covers building from a sheet and planning screens around real users.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Airtable and Softr Assistant Developer", "No Code Platform Specialist"],
      resources: [glideStart],
    },
    {
      slug: "apps-from-sheets",
      title: "Apps from a spreadsheet",
      summary:
        "Tools such as Glide, AppSheet and Power Apps read your table and build screens for listing, adding and editing records, like a stock app for a Bolgatanga provisions shop. Learn to connect a sheet, add forms and filters, and share the app, building on a computer and testing on the phones your users carry.",
      parent: "apps",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [glideStart, powerApps],
    },
    {
      slug: "planning-app-screens",
      title: "Planning screens, users and permissions",
      summary:
        "A useful app shows each person only what they need, so a shop assistant records sales while the owner sees the totals. Learn to sketch screens on paper first, decide who can see and change what, and keep the design simple for small phone screens.",
      parent: "apps",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [appsheetDesign],
    },
    {
      slug: "automation",
      title: "Automations",
      summary:
        "Automations move information between tools by themselves, saving hours of copying, pasting and reminding. This section covers how workflows are built, common tools, automatic messages and careful use of AI steps.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Automation and Systems Operator", "Power Apps and Power Automate role"],
      resources: [zapierLearn],
    },
    {
      slug: "triggers-and-actions",
      title: "Triggers, actions and workflows",
      summary:
        "Every automation starts with a trigger, like a new form response, and then runs one or more actions, like adding a row or sending an email. Learn to map a manual process step by step on paper before you build it, so you automate the right thing.",
      parent: "automation",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [zapierZap],
    },
    {
      slug: "automation-tools",
      title: "Automation tools and their limits",
      summary:
        "Tools such as Zapier, Make and Power Automate connect hundreds of apps, while built in options like Google Apps Script go further with a little code. Learn what each type is good for, how free plan limits affect a client, and how to check runs and fix a failed step.",
      parent: "automation",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [makeAcademy, powerAutomate, appsScript],
    },
    {
      slug: "message-automation",
      title: "Automatic emails and messages",
      summary:
        "Many automations end by telling someone something, like a booking confirmation email or a WhatsApp Business greeting and quick reply. Learn to send helpful automatic messages without spamming people, and to respect what each messaging platform allows.",
      parent: "automation",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.whatsappBusiness, formsResponses],
    },
    {
      slug: "ai-steps",
      title: "AI steps and agents, used carefully",
      summary:
        "Newer tools can add an AI step that sorts messages or drafts replies, and some can run small agents that take several steps on their own. Learn where AI helps, why a person should check its output, and why you should never feed it private customer data without permission.",
      parent: "automation",
      optional: true,
      difficulty: "advanced",
      complexity: 4,
      resources: [copilotStudio, n8nDocs],
    },
    {
      slug: "clients-and-earning",
      title: "Clients, safety and earning",
      summary:
        "Building for other people means protecting their data, testing carefully and leaving them able to run what you built. This section also covers building a portfolio and finding paid work.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "specialist",
      jobs: ["Low Code AI Implementation Consultant", "No Code Platform Specialist"],
      resources: [jobberman],
    },
    {
      slug: "privacy-and-permissions",
      title: "Privacy, consent and sharing",
      summary:
        "Forms and apps often collect names, phone numbers and locations, and Ghana's Data Protection Act sets rules on how personal data is collected and kept. Learn to ask only for what you need, explain why you collect it, and set sharing permissions so the wrong people cannot see it.",
      parent: "clients-and-earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.dpc, driveSharing],
    },
    {
      slug: "testing-and-handover",
      title: "Testing and handing over",
      summary:
        "Before a client relies on your build, test it with real users and odd inputs, and fix what breaks. Learn to write a short guide, hand over every account and password safely, and agree how support will work after you finish.",
      parent: "clients-and-earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [nngTesting, writeTheDocs],
    },
    {
      slug: "portfolio-and-work",
      title: "Portfolio, jobs and gigs",
      summary:
        "Small real builds, like a youth group registration form or a shop stock app, make a stronger portfolio than certificates alone. Learn where no code skills show up in jobs, such as data collection, operations and website roles, and how to price and offer small projects to local businesses and remote clients.",
      parent: "clients-and-earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [jobberman],
    },
  ],
};
