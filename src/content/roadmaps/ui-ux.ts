import { RES } from "./resources";
import type { RoadmapDraft } from "./types";

export const uiUx: RoadmapDraft = {
  slug: "ui-ux-designer",
  title: "UI/UX Designer",
  description:
    "Design apps and websites that real Ghanaian users find easy, from traders on shared phones to students on slow data. Learn research, interface design and testing with free tools, and leave with case studies employers can trust.",
  track: "ui-ux",
  field_category: "design",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Foundations",
      summary:
        "UX is about how something works for the person using it, and UI is how it looks and feels. This section explains both and how design teams work.",
      parent: null,
      optional: false,
      resources: [RES.nngArticles],
    },
    {
      slug: "what-ux-and-ui-mean",
      title: "What UX and UI designers do",
      summary:
        "Learn the difference between research, interaction design and visual design, and how they fit together. Read real job adverts to see which mix local and remote employers want.",
      parent: "foundations",
      optional: false,
      resources: [RES.nngArticles],
    },
    {
      slug: "design-process",
      title: "The design process",
      summary:
        "Understand the loop of learning about users, defining the problem, sketching ideas, testing and improving. Every project in this roadmap follows that loop.",
      parent: "foundations",
      optional: false,
      resources: [RES.govService],
    },
    {
      slug: "research",
      title: "User research",
      summary:
        "Good design starts with understanding people in their real setting. Research in Ghana means meeting users where they are, often in person and in their own language.",
      parent: null,
      optional: false,
      resources: [RES.govResearch],
    },
    {
      slug: "user-interviews",
      title: "Interviewing users",
      summary:
        "Plan open questions, listen more than you talk and ask about real past behaviour rather than opinions. Practise with traders, students or drivers who would use the product.",
      parent: "research",
      optional: false,
      resources: [RES.govResearch, RES.nngArticles],
    },
    {
      slug: "context-and-constraints",
      title: "Understanding local context",
      summary:
        "Observe the conditions people use technology in, such as shared phones, small data bundles, bright sunlight and noisy markets. These constraints should shape your designs from the start.",
      parent: "research",
      optional: false,
      resources: [RES.govResearch],
    },
    {
      slug: "synthesis",
      title: "Making sense of research",
      summary:
        "Group your notes into patterns, pick the most important problems and write them as clear statements. This is what you share with the team before anyone designs screens.",
      parent: "research",
      optional: false,
      resources: [RES.nngArticles],
    },
    {
      slug: "structure",
      title: "Structure and flow",
      summary:
        "Before colours and fonts, decide what goes where and how people move through the product. Cheap sketches here save expensive changes later.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "information-architecture",
      title: "Information architecture",
      summary:
        "Organise content and features so people can find things without thinking hard. Use the words your users use, not internal company terms.",
      parent: "structure",
      optional: false,
      resources: [RES.nngArticles],
    },
    {
      slug: "user-flows",
      title: "User flows",
      summary:
        "Map every step a user takes to finish a task, such as paying a bill with mobile money, including errors and dead ends. Flows reveal problems that single screens hide.",
      parent: "structure",
      optional: false,
      resources: [RES.nngArticles],
    },
    {
      slug: "wireframes",
      title: "Wireframes and sketches",
      summary:
        "Sketch screens on paper first, then make simple grey wireframes. Paper sketches cost nothing and are easy to test with users in person.",
      parent: "structure",
      optional: false,
      resources: [RES.figmaLibrary],
    },
    {
      slug: "interface-design",
      title: "Interface design",
      summary:
        "This is where designs become polished, consistent screens. You will learn the main tool and the visual principles behind good interfaces.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "figma",
      title: "Figma basics",
      summary:
        "Learn frames, auto layout, components and prototyping in Figma, which has a free plan. It runs in the browser, so a modest laptop is enough.",
      parent: "interface-design",
      optional: false,
      resources: [RES.figmaHelp, RES.figmaLibrary],
    },
    {
      slug: "visual-design",
      title: "Typography, colour and layout",
      summary:
        "Use type scale, spacing, contrast and alignment to create clear hierarchy. Check your colours outdoors on a phone, because strong sun washes out weak contrast.",
      parent: "interface-design",
      optional: false,
      resources: [RES.lfDesign, RES.lawsOfUx],
    },
    {
      slug: "mobile-patterns",
      title: "Mobile interface patterns",
      summary:
        "Learn platform conventions for navigation, buttons, forms and touch targets on Android and iOS. Design for one handed use on small screens, since many people hold their phone that way while busy.",
      parent: "interface-design",
      optional: false,
      resources: [RES.material, RES.hig],
    },
    {
      slug: "design-systems",
      title: "Components and design systems",
      summary:
        "Build reusable components and styles so a product looks and behaves consistently. Teams value designers who make developers' work easier.",
      parent: "interface-design",
      optional: true,
      resources: [RES.material, RES.figmaHelp],
    },
    {
      slug: "inclusive-design",
      title: "Inclusive design for Ghana",
      summary:
        "A product that works for everyone reaches more customers. This section covers disability, literacy, language and connectivity.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "accessibility",
      title: "Accessibility",
      summary:
        "Design for people with low vision, colour blindness, motor difficulties or screen readers. Follow the WCAG guidelines and test with real users where you can.",
      parent: "inclusive-design",
      optional: false,
      resources: [RES.waiFundamentals, RES.wcagQuickref],
    },
    {
      slug: "literacy-and-language",
      title: "Literacy and local languages",
      summary:
        "Use plain words, familiar icons, clear numbers and voice or local language options where they help. Test whether people understand your labels, rather than assuming they do.",
      parent: "inclusive-design",
      optional: false,
      resources: [RES.govService],
    },
    {
      slug: "low-bandwidth-design",
      title: "Designing for slow and costly data",
      summary:
        "Keep images light, show progress clearly and design useful offline and error states. Users who pay for every megabyte notice heavy designs quickly.",
      parent: "inclusive-design",
      optional: false,
      resources: [RES.webdevPerf],
    },
    {
      slug: "testing",
      title: "Prototyping and testing",
      summary:
        "Testing shows whether a design actually works before it is built. A handful of short sessions can reveal the biggest problems.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "prototyping",
      title: "Clickable prototypes",
      summary:
        "Link your screens into a prototype that runs on a phone. Keep it focused on the one task you want to test.",
      parent: "testing",
      optional: false,
      resources: [RES.figmaHelp],
    },
    {
      slug: "usability-testing",
      title: "Usability testing",
      summary:
        "Give users a task, watch quietly and note where they hesitate or fail. Sessions in a market, school or office near you are as valid as formal lab tests.",
      parent: "testing",
      optional: false,
      resources: [RES.nngUsability, RES.nngHeuristics],
    },
    {
      slug: "developer-handoff",
      title: "Working with developers",
      summary:
        "Share specs, states and assets clearly and stay involved while the product is built. Learn enough HTML and CSS to understand what is easy and what is costly to build.",
      parent: "testing",
      optional: false,
      resources: [RES.webdevCss],
    },
    {
      slug: "getting-hired",
      title: "Getting hired and getting paid",
      summary:
        "Design jobs go to people who can show their thinking, not only nice screens. This section helps you present your work.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "case-studies",
      title: "Case study portfolio",
      summary:
        "Write two or three case studies that show the problem, your research, the options you tried, the final design and what changed. Redesigning a real local app or service, with real user feedback, makes a strong case study.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.nngArticles],
    },
    {
      slug: "freelancing",
      title: "Freelancing for local businesses",
      summary:
        "Offer logo refreshes, menu boards, social graphics and simple app or website designs to nearby businesses. Agree what is included and how many revisions are allowed before you start.",
      parent: "getting-hired",
      optional: true,
      resources: [RES.lfFreelancing, RES.lfCanva],
    },
    {
      slug: "job-search",
      title: "Job search and design interviews",
      summary:
        "Apply to agencies, startups, banks and remote teams, and prepare to walk through a case study in fifteen minutes. Expect a design exercise, and practise explaining your decisions aloud.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfJobsearch, RES.lfInterview, RES.lfLinkedin],
    },
  ],
};
