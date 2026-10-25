import { RES } from "./resources";
import type { RoadmapDraft } from "./types";

export const backend: RoadmapDraft = {
  slug: "backend-developer",
  title: "Backend Developer",
  description:
    "Build the servers, databases and APIs behind apps, including the payment and messaging integrations Ghanaian products rely on. Go from your first script to deployed services you can show an employer.",
  track: "backend",
  field_category: "software",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Foundations",
      summary:
        "Backend work happens on servers you cannot see, so you need a clear picture of how requests travel. This section also gives you the everyday tools every developer uses.",
      parent: null,
      optional: false,
      resources: [RES.cs50],
    },
    {
      slug: "how-servers-work",
      title: "Clients, servers and HTTP",
      summary:
        "Learn how a phone app sends a request, how a server replies, and what status codes and headers mean. Every API you build later is a conversation in HTTP.",
      parent: "foundations",
      optional: false,
      resources: [RES.mdnHttp],
    },
    {
      slug: "command-line",
      title: "The command line and Linux basics",
      summary:
        "Move around files, run programs and read logs from a terminal. Most servers run Linux and have no screen, so this is how you will work with them.",
      parent: "foundations",
      optional: false,
      resources: [RES.odin],
    },
    {
      slug: "git-and-github",
      title: "Git and GitHub",
      summary:
        "Track changes, work on branches and open pull requests. Teams expect you to use Git from your first day.",
      parent: "foundations",
      optional: false,
      resources: [RES.githubDocs, RES.gitBook],
    },
    {
      slug: "a-language",
      title: "One programming language, learned well",
      summary:
        "Pick one language and stay with it until you can build things without a tutorial. JavaScript with Node.js and Python are both widely used and have strong free learning material.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "choose-a-language",
      title: "Choosing Node.js or Python",
      summary:
        "Node.js lets you use the same language as the frontend, while Python is popular for data and scripting work. Look at local job adverts you would like to apply for and let them guide the choice.",
      parent: "a-language",
      optional: false,
      resources: [RES.nodeLearn, RES.pythonTutorial],
    },
    {
      slug: "programming-fundamentals",
      title: "Programming fundamentals and problem solving",
      summary:
        "Practise functions, data structures, error handling and breaking a problem into steps. Solve small exercises daily, because interviews test this directly.",
      parent: "a-language",
      optional: false,
      resources: [RES.fccLearn, RES.cs50],
    },
    {
      slug: "databases",
      title: "Databases",
      summary:
        "Almost every backend stores data, and relational databases such as PostgreSQL are the common starting point. Learn to design tables before you learn any framework.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "sql",
      title: "SQL fundamentals",
      summary:
        "Write queries to select, filter, join and group data. SQL is useful in nearly every tech role, so the time you spend here pays off widely.",
      parent: "databases",
      optional: false,
      resources: [RES.sqlbolt, RES.khanSql, RES.pgTutorial],
    },
    {
      slug: "database-design",
      title: "Designing a database",
      summary:
        "Model real things such as customers, orders and payments as tables with keys and relationships. Practise by designing the database for a small shop that sells on WhatsApp.",
      parent: "databases",
      optional: false,
      resources: [RES.pgTutorial],
    },
    {
      slug: "migrations-and-orms",
      title: "Migrations and ORMs",
      summary:
        "Change a database safely over time with versioned migrations, and see how an ORM maps tables to code. Teams rely on migrations so nobody edits production data by hand.",
      parent: "databases",
      optional: true,
      resources: [RES.supabase],
    },
    {
      slug: "apis",
      title: "Building APIs",
      summary:
        "An API is how apps, websites and partners talk to your server. This section covers building one that is predictable, safe and documented.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "rest-apis",
      title: "REST API design",
      summary:
        "Design clear routes, use the right HTTP methods and return consistent JSON with sensible status codes. Build an API for a simple product catalogue as your first project.",
      parent: "apis",
      optional: false,
      resources: [RES.express, RES.mdnHttp],
    },
    {
      slug: "auth",
      title: "Authentication and authorisation",
      summary:
        "Learn how users sign in, how sessions and tokens work, and how to check what each user is allowed to do. Many local apps sign users in with a phone number and a one time code, so understand that flow too.",
      parent: "apis",
      optional: false,
      resources: [RES.owasp],
    },
    {
      slug: "validation-and-errors",
      title: "Validation and error handling",
      summary:
        "Check every input from users and return helpful errors instead of crashing. Validate Ghanaian phone numbers and amounts in cedis carefully, because payments depend on them.",
      parent: "apis",
      optional: false,
      resources: [RES.owasp],
    },
    {
      slug: "api-docs",
      title: "Documenting an API",
      summary:
        "Describe your endpoints so another developer can use them without asking you. A standard format such as OpenAPI also lets tools generate examples and tests.",
      parent: "apis",
      optional: true,
      resources: [RES.openapi],
    },
    {
      slug: "local-integrations",
      title: "Integrations Ghanaian products need",
      summary:
        "Local products often depend on mobile money, SMS and WhatsApp. Knowing how to integrate them safely makes you useful to Ghanaian startups and businesses quickly.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "payments-and-webhooks",
      title: "Mobile money payments and webhooks",
      summary:
        "Learn how a payment provider such as Hubtel or Paystack sends your server a webhook when a payment succeeds or fails, and why the same event can arrive twice. Record every payment once, verify the provider's signature and reconcile against their dashboard.",
      parent: "local-integrations",
      optional: false,
      resources: [RES.hubtelDocs, RES.mdnHttp],
    },
    {
      slug: "sms-and-whatsapp",
      title: "SMS and WhatsApp notifications",
      summary:
        "Send order updates, reminders and one time codes by SMS or WhatsApp through a provider API. Keep messages short, respect opt outs and make sure your app still works when a message is delayed.",
      parent: "local-integrations",
      optional: false,
      resources: [RES.twilioSms],
    },
    {
      slug: "ussd",
      title: "USSD services",
      summary:
        "Understand how USSD menus work as a series of short requests between the network and your server. USSD reaches people on basic phones without data, which matters for many customers outside the cities.",
      parent: "local-integrations",
      optional: true,
      resources: [],
    },
    {
      slug: "production",
      title: "Running code in production",
      summary:
        "Code that works on your laptop still has to survive real users and real attackers. This section covers the habits that make a service trustworthy.",
      parent: null,
      optional: false,
      resources: [RES.twelveFactor],
    },
    {
      slug: "security",
      title: "Security basics",
      summary:
        "Learn the common attacks such as injection and broken access control, and keep secrets out of your code. Handling personal data also means following Ghana's Data Protection Act.",
      parent: "production",
      optional: false,
      resources: [RES.owasp, RES.dpc],
    },
    {
      slug: "testing",
      title: "Automated testing",
      summary:
        "Write tests that check your API behaves correctly, especially around payments and permissions. Tests let you change code with confidence and show employers you care about quality.",
      parent: "production",
      optional: false,
      resources: [RES.vitest],
    },
    {
      slug: "deploy-and-monitor",
      title: "Deploying and monitoring on free tiers",
      summary:
        "Deploy an API and database on free hosting tiers, use environment variables for secrets and read logs when something breaks. A live API with a public link is a strong portfolio piece.",
      parent: "production",
      optional: false,
      resources: [RES.render, RES.supabase, RES.twelveFactor],
    },
    {
      slug: "containers",
      title: "Containers with Docker",
      summary:
        "Package an app and its dependencies so it runs the same everywhere. Useful once you are deploying to larger teams, but not needed for your first role.",
      parent: "production",
      optional: true,
      resources: [RES.docker],
    },
    {
      slug: "getting-hired",
      title: "Getting hired and getting paid",
      summary:
        "Backend skills are hard to see, so you must make them visible. Show working systems, clear code and good written explanations.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "portfolio",
      title: "A backend portfolio",
      summary:
        "Build two or three deployed APIs with tests and a README that explains the design, such as an ordering system with mobile money webhooks. Include a short demo video recorded on your phone for people who cannot run the code.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.githubDocs, RES.markdown],
    },
    {
      slug: "job-search",
      title: "Job search, freelancing and interviews",
      summary:
        "Apply to local startups, banks, telcos and agencies as well as remote roles, and offer small integrations to businesses near you. Practise explaining a system you built, including what you would do differently.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfJobsearch, RES.lfInterview, RES.lfFreelancing],
    },
  ],
};
