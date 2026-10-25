import { RES } from "./resources";
import type { RoadmapDraft } from "./types";

export const product: RoadmapDraft = {
  slug: "product-manager",
  title: "Product Manager",
  description:
    "Learn to decide what to build and why, for products that work in Ghana's mobile money and messaging era. Practise with real problems, cheap experiments and clear writing, then build a portfolio that shows your judgement.",
  track: "product",
  field_category: "product",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Foundations",
      summary:
        "Product managers connect users, the business and the team that builds. This section explains the role and the local context products live in.",
      parent: null,
      optional: false,
      resources: [RES.atlassianPm],
    },
    {
      slug: "what-pms-do",
      title: "What a product manager does",
      summary:
        "Learn how a product manager finds problems worth solving, sets priorities and helps a team ship. The role varies a lot between companies, so read real job adverts to see what each one means.",
      parent: "foundations",
      optional: false,
      resources: [RES.atlassianPm],
    },
    {
      slug: "ghana-product-context",
      title: "How products work in Ghana",
      summary:
        "Study how mobile money, USSD, WhatsApp and agent networks shape what people expect from products here. Pick three local apps or services you use and write down why people trust them or not.",
      parent: "foundations",
      optional: false,
      resources: [RES.ycLibrary],
    },
    {
      slug: "business-basics",
      title: "Business basics",
      summary:
        "Understand revenue, costs, margins and how a product makes money, using prices in cedis. Every product decision eventually comes back to these numbers.",
      parent: "foundations",
      optional: false,
      resources: [RES.lfMoney, RES.startupSchool],
    },
    {
      slug: "discovery",
      title: "Discovery",
      summary:
        "Discovery means learning what people really need before building anything. It is the habit that most separates good product managers from feature takers.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "problem-interviews",
      title: "Problem interviews",
      summary:
        "Talk to traders, students, farmers or small business owners about how they handle a task today and what it costs them. Ask about real past events, not what they think they would do.",
      parent: "discovery",
      optional: false,
      resources: [RES.govResearch, RES.ycLibrary],
    },
    {
      slug: "choosing-problems",
      title: "Choosing which problem to solve",
      summary:
        "Compare problems by how painful, how frequent and how widespread they are, and whether people already pay to solve them. Write down your reasoning so others can challenge it.",
      parent: "discovery",
      optional: false,
      resources: [RES.lfThinking],
    },
    {
      slug: "defining",
      title: "Defining what to build",
      summary:
        "Once the problem is clear, you need to describe a solution and decide what comes first. Clear writing matters more here than any tool.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "writing-specs",
      title: "Writing product specs",
      summary:
        "Write a short document covering the problem, who it is for, what success looks like and what is out of scope. A good spec lets designers and engineers work without waiting for you.",
      parent: "defining",
      optional: false,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "prioritisation",
      title: "Prioritisation",
      summary:
        "Rank ideas by value and effort using simple frameworks, and learn to say no politely. Small teams in Ghana rarely have spare capacity, so focus is essential.",
      parent: "defining",
      optional: false,
      resources: [RES.atlassianPm],
    },
    {
      slug: "goals-and-roadmaps",
      title: "Goals and product roadmaps",
      summary:
        "Set a few measurable goals and turn them into a roadmap of problems to solve, not a list of dates. Share it so the whole team knows why work is ordered the way it is.",
      parent: "defining",
      optional: false,
      resources: [RES.atlassianPm],
    },
    {
      slug: "building",
      title: "Building with a team",
      summary:
        "Product managers do not build alone, so working well with others is the core skill. This section covers how teams plan and how to speak their language.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "agile-basics",
      title: "Agile ways of working",
      summary:
        "Learn sprints, backlogs, standups and retrospectives, and why teams ship in small pieces. Focus on the ideas rather than the ceremony, because every team runs them differently.",
      parent: "building",
      optional: false,
      resources: [RES.atlassianAgile],
    },
    {
      slug: "technical-literacy",
      title: "Technical literacy",
      summary:
        "Understand what APIs, databases, payments integrations and app releases involve, without needing to code. This helps you judge effort and ask engineers better questions.",
      parent: "building",
      optional: false,
      resources: [RES.cs50, RES.mdnHttp],
    },
    {
      slug: "working-with-design",
      title: "Working with designers",
      summary:
        "Learn the basics of user flows, wireframes and usability testing so you can give useful feedback. Judge designs by whether users can complete the task, not by personal taste.",
      parent: "building",
      optional: false,
      resources: [RES.nngHeuristics],
    },
    {
      slug: "mvp-and-launch",
      title: "MVPs and launching",
      summary:
        "Test ideas as cheaply as possible before investing in software. Then plan how real customers will hear about the product and start paying.",
      parent: null,
      optional: false,
      resources: [RES.startupSchool],
    },
    {
      slug: "no-code-mvp",
      title: "MVPs without code",
      summary:
        "Run a service by hand using WhatsApp, Google Forms and a spreadsheet to see if people want it. If nobody uses the manual version, building an app will not fix that.",
      parent: "mvp-and-launch",
      optional: false,
      resources: [RES.whatsappBusiness, RES.lfSheets],
    },
    {
      slug: "pricing-and-payments",
      title: "Pricing and payments",
      summary:
        "Decide how to charge, test prices in cedis and make paying easy with mobile money. Clear receipts and quick refunds build the trust that Ghanaian customers look for.",
      parent: "mvp-and-launch",
      optional: false,
      resources: [RES.ycLibrary],
    },
    {
      slug: "go-to-market",
      title: "Launching to real customers",
      summary:
        "Plan which customers you will reach first, through which channels, and what message will make them try it. Partnerships with agents, churches, schools or associations can reach people ads cannot.",
      parent: "mvp-and-launch",
      optional: false,
      resources: [RES.skillshop],
    },
    {
      slug: "measuring",
      title: "Measuring and learning",
      summary:
        "After launch, data and feedback tell you what to do next. This section helps you read both honestly.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "metrics",
      title: "Product metrics",
      summary:
        "Track activation, retention and revenue rather than only downloads. Choose one main metric that shows whether users are getting real value.",
      parent: "measuring",
      optional: false,
      resources: [RES.gaHelp, RES.ycLibrary],
    },
    {
      slug: "experiments",
      title: "Running experiments",
      summary:
        "Change one thing, compare results against a control and decide in advance what result would change your mind. Small user bases need patience and simple tests.",
      parent: "measuring",
      optional: true,
      resources: [RES.khanStats],
    },
    {
      slug: "customer-feedback",
      title: "Customer feedback loops",
      summary:
        "Collect feedback from support chats, calls and reviews, and share patterns with the team every week. Close the loop by telling customers what you changed.",
      parent: "measuring",
      optional: false,
      resources: [RES.lfCommunication],
    },
    {
      slug: "getting-hired",
      title: "Getting hired",
      summary:
        "Product roles rarely go to complete beginners, so plan a route in. This section shows how to build evidence and find a first opening.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "product-portfolio",
      title: "A product portfolio",
      summary:
        "Write two or three case studies covering a problem you researched, what you tested and what you learned, ideally from a real small business or community project. Show your reasoning and your mistakes, not only the outcome.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "breaking-in",
      title: "Routes into product",
      summary:
        "Many product managers start in customer support, operations, quality assurance, design or engineering, then move across. Look for associate product roles, internships and startup jobs where you can take on product work early.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfJobsearch, RES.lfLinkedin],
    },
    {
      slug: "pm-interviews",
      title: "Product interviews",
      summary:
        "Practise questions about improving a product you use, prioritising features and choosing metrics. Use local products in your answers to show you understand the market.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfInterview],
    },
  ],
};
