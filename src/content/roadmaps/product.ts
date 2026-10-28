import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Revised against job advert and skills framework research (issue #84); see
 * src/content/research/product.md for sources and the coverage table.
 * Resources specific to this track are defined here, not in the shared pool,
 * so parallel track authors never conflict.
 */
const govAgile: ResourceDraft = {
  label: "GOV.UK Service Manual: Agile delivery",
  url: "https://www.gov.uk/service-manual/agile-delivery",
  kind: "article",
};
const govMeasuring: ResourceDraft = {
  label: "GOV.UK Service Manual: Measuring success",
  url: "https://www.gov.uk/service-manual/measuring-success",
  kind: "article",
};
const govTeam: ResourceDraft = {
  label: "GOV.UK Service Manual: The team",
  url: "https://www.gov.uk/service-manual/the-team",
  kind: "article",
};

export const product: RoadmapDraft = {
  slug: "product-manager",
  title: "Product Manager",
  description:
    "Learn to decide what to build and why, for products that work in Ghana's mobile money and messaging era. Practise the skills junior product, business analyst and product operations roles ask for, then build a portfolio that shows your judgement.",
  track: "product",
  field_category: "product",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Foundations",
      summary:
        "Product work connects users, the business and the team that builds. This section explains the roles, the local context and the basic skills every product job relies on.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.atlassianPm],
    },
    {
      slug: "what-product-roles-do",
      title: "Product roles and what they do",
      summary:
        "Learn what product managers, associate product managers, business analysts, product analysts and product operations staff actually do. Few first jobs carry the product manager title, so knowing the neighbouring roles shows you where to start.",
      parent: "foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [RES.atlassianPm, govTeam],
    },
    {
      slug: "ghana-product-context",
      title: "How products work in Ghana",
      summary:
        "Study how mobile money, USSD, WhatsApp and agent networks shape what people expect from products here. Pick three local services you use and write down why people trust them or not.",
      parent: "foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.ycLibrary],
    },
    {
      slug: "business-basics",
      title: "Business basics and pricing",
      summary:
        "Understand revenue, costs, margins and pricing in cedis, and how mobile money payments affect what customers will pay. Every product decision eventually comes back to these numbers.",
      parent: "foundations",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfMoney, RES.startupSchool],
    },
    {
      slug: "stakeholder-communication",
      title: "Communicating with stakeholders",
      summary:
        "Learn to listen, write short updates and present a recommendation to managers, engineers and partners. Employers often ask for clear communication, whatever tools the job uses.",
      parent: "foundations",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfCommunication, RES.lfBizWriting],
    },
    {
      slug: "discovery",
      title: "Discovery",
      summary:
        "Discovery means learning what people really need before building anything. It is the habit that most separates good product people from order takers.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Product Analyst", "Product Associate", "Associate Product Manager"],
      resources: [RES.govResearch],
    },
    {
      slug: "problem-interviews",
      title: "Problem interviews",
      summary:
        "Talk to traders, students, farmers or small business owners about how they handle a task today and what it costs them. Ask about real past events, not what they think they would do.",
      parent: "discovery",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.govResearch, RES.ycLibrary],
    },
    {
      slug: "choosing-problems",
      title: "Choosing which problem to solve",
      summary:
        "Compare problems by how painful, frequent and widespread they are, and check what people and competitors already use to solve them. Write down your reasoning so others can challenge it.",
      parent: "discovery",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfThinking],
    },
    {
      slug: "no-code-mvp",
      title: "Testing ideas without code",
      summary:
        "Run a service by hand using WhatsApp, Google Forms and a spreadsheet to see if people want it. If nobody uses the manual version, building an app will not fix that.",
      parent: "discovery",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.whatsappBusiness, RES.lfSheets],
    },
    {
      slug: "defining",
      title: "Defining what to build",
      summary:
        "Once the problem is clear, you describe how work happens today, what the new solution must do and what comes first. Clear writing matters more here than any tool.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Business Analyst", "Project Business Analyst", "Information Systems Business Analyst"],
      resources: [],
    },
    {
      slug: "process-mapping",
      title: "Mapping processes",
      summary:
        "Draw how a task flows today, step by step and person by person, to find delays, errors and handovers. Business analyst roles often ask for this skill.",
      parent: "defining",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfThinking],
    },
    {
      slug: "requirements-and-user-stories",
      title: "Requirements and user stories",
      summary:
        "Turn what users and the business need into clear requirements, user stories and acceptance criteria. Junior product and analyst roles often ask for this skill.",
      parent: "defining",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [govAgile, RES.atlassianAgile],
    },
    {
      slug: "writing-specs",
      title: "Writing product specs",
      summary:
        "Write a short document covering the problem, who it is for, the requirements, what success looks like and what is out of scope. A good spec lets designers and engineers work without waiting for you.",
      parent: "defining",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "prioritisation-and-roadmaps",
      title: "Prioritisation and roadmaps",
      summary:
        "Rank ideas by value and effort, learn to say no politely and turn goals into a roadmap of problems to solve. Small teams rarely have spare capacity, so focus is essential.",
      parent: "defining",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.atlassianPm],
    },
    {
      slug: "building",
      title: "Building with a team",
      summary:
        "Product people do not build alone, so working well with engineers and designers is the core skill. This section covers how teams plan, how to speak their language and how to check work before release.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Product Manager", "Product Executive"],
      resources: [],
    },
    {
      slug: "agile-basics",
      title: "Agile ways of working",
      summary:
        "Learn sprints, backlogs, boards, standups and retrospectives, and why teams ship in small pieces. Focus on the ideas rather than the ceremony, because every team runs them differently.",
      parent: "building",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.atlassianAgile, govAgile],
    },
    {
      slug: "technical-literacy",
      title: "Technical literacy",
      summary:
        "Understand what APIs, databases, mobile money integrations and app releases involve, without needing to code. This helps you judge effort and ask engineers better questions.",
      parent: "building",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.cs50, RES.mdnHttp],
    },
    {
      slug: "working-with-design",
      title: "Working with designers",
      summary:
        "Learn the basics of user flows, wireframes and usability testing so you can give useful feedback. Judge designs by whether users can complete the task, not by personal taste.",
      parent: "building",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.nngHeuristics, RES.nngUsability],
    },
    {
      slug: "acceptance-testing",
      title: "Acceptance testing and release",
      summary:
        "Check that what was built meets the acceptance criteria before real users see it, and plan a safe release. Analyst and associate product roles often include testing before go live.",
      parent: "building",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [govAgile],
    },
    {
      slug: "live-product",
      title: "Running a live product",
      summary:
        "Once a product is live, someone must onboard users, answer problems and feed lessons back to the team. This work is a common first job and a strong route into product management.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Product Operations Officer", "Associate, Product Operations"],
      resources: [],
    },
    {
      slug: "product-operations",
      title: "Product operations",
      summary:
        "Learn to onboard and train users, write help guides and standard procedures, and pass issues to engineers clearly. Good operations work keeps a product trusted between releases.",
      parent: "live-product",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.whatsappBusiness, RES.lfBizWriting],
    },
    {
      slug: "customer-feedback",
      title: "Customer feedback loops",
      summary:
        "Collect feedback from support chats, calls and reviews, and share patterns with the team every week. Close the loop by telling customers what you changed.",
      parent: "live-product",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfCommunication],
    },
    {
      slug: "measuring",
      title: "Measuring and learning",
      summary:
        "Data tells you whether a product is working and what to do next. This section covers the spreadsheet and query skills analyst roles ask for, and how to read numbers honestly.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      careerLevel: "mid",
      jobs: ["Business Intelligence Analyst", "MERL Associate & Data Analyst"],
      resources: [govMeasuring],
    },
    {
      slug: "spreadsheets-and-sql",
      title: "Spreadsheets and SQL basics",
      summary:
        "Use spreadsheets to sort, filter, count and chart product data, then learn the basic SQL queries analyst adverts mention. Start with a small, real dataset you understand.",
      parent: "measuring",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfSheets, RES.sqlbolt],
    },
    {
      slug: "metrics",
      title: "Product metrics",
      summary:
        "Track activation, retention and revenue rather than only downloads or sign ups. Choose one main metric that shows whether users are getting real value.",
      parent: "measuring",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [govMeasuring, RES.gaHelp],
    },
    {
      slug: "experiments",
      title: "Running experiments",
      summary:
        "Change one thing, compare results against a control and decide in advance what result would change your mind. Small user bases need patience and simple tests.",
      parent: "measuring",
      optional: true,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.khanStats],
    },
    {
      slug: "getting-hired",
      title: "Getting hired",
      summary:
        "Product manager jobs rarely go to complete beginners, so plan a realistic route in. This section shows which first roles to aim for and how to build evidence.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "specialist",
      jobs: ["Senior Technical Product Manager", "Product Manager, API Payments", "Senior Product Analyst"],
      resources: [],
    },
    {
      slug: "breaking-in",
      title: "Realistic routes into product",
      summary:
        "Many people reach product management through business analysis, product operations, customer support, data or monitoring and evaluation work. Aim for those roles first and take on product tasks wherever you are.",
      parent: "getting-hired",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfJobsearch, RES.lfLinkedin],
    },
    {
      slug: "product-portfolio",
      title: "A product portfolio",
      summary:
        "Write two or three case studies covering a problem you researched, what you tested and what you learned, ideally from a real small business or community project. Show your reasoning and your mistakes, not only the outcome.",
      parent: "getting-hired",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "product-interviews",
      title: "Product and analyst interviews",
      summary:
        "Practise questions about improving a product, writing a user story, prioritising features and choosing metrics. Use local products in your answers to show you understand the market.",
      parent: "getting-hired",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfInterview],
    },
  ],
};
