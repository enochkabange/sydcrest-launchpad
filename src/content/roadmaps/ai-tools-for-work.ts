import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Track specific links not in the shared pool; each checked to resolve (October 2026).
 * Tools from several makers are linked on purpose: every one is an example, not an endorsement.
 */
const elementsOfAi: ResourceDraft = { label: "Elements of AI (free online course)", url: "https://www.elementsofai.com/", kind: "article" };
const unescoAi: ResourceDraft = {
  label: "UNESCO: AI competency framework for students",
  url: "https://www.unesco.org/en/articles/ai-competency-framework-students",
  kind: "article",
};
const geminiPrivacy: ResourceDraft = {
  label: "Gemini Apps Privacy Hub",
  url: "https://support.google.com/gemini/answer/13594961",
  kind: "article",
};
const geminiHelp: ResourceDraft = { label: "Gemini Apps Help", url: "https://support.google.com/gemini", kind: "article" };
const copilotPrompts: ResourceDraft = {
  label: "Microsoft Support: Get started writing prompts in Copilot",
  url: "https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot",
  kind: "article",
};
const claudePrompting: ResourceDraft = {
  label: "Claude docs: Prompt engineering overview",
  url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
  kind: "article",
};
const ghanaFact: ResourceDraft = { label: "GhanaFact (independent fact checking)", url: "https://ghanafact.com/", kind: "article" };
const dubawa: ResourceDraft = { label: "Dubawa (West African fact checking)", url: "https://dubawa.org/", kind: "article" };
const docsGemini: ResourceDraft = {
  label: "Google Docs Help: Collaborate with Gemini in Docs",
  url: "https://support.google.com/docs/answer/14206696",
  kind: "article",
};
const sheetsFormulas: ResourceDraft = {
  label: "Google Sheets Help: Add formulas and functions",
  url: "https://support.google.com/docs/answer/46977",
  kind: "article",
};
const synthId: ResourceDraft = { label: "Google DeepMind: SynthID watermarking", url: "https://deepmind.google/models/synthid/", kind: "article" };
const khaya: ResourceDraft = { label: "Khaya AI (Ghanaian language translation)", url: "https://www.khaya.ai/", kind: "practice" };
const ghanaNlp: ResourceDraft = { label: "Ghana NLP", url: "https://ghananlp.org/", kind: "article" };
const translateHelp: ResourceDraft = { label: "Google Translate Help", url: "https://support.google.com/translate", kind: "article" };
const gmailFilters: ResourceDraft = {
  label: "Gmail Help: Create rules to filter your emails",
  url: "https://support.google.com/mail/answer/6579",
  kind: "article",
};
const aiPrinciples: ResourceDraft = { label: "Google AI Principles", url: "https://ai.google/principles/", kind: "article" };

export const aiToolsForWork: RoadmapDraft = {
  slug: "ai-tools-for-work",
  title: "AI Tools for Work",
  description:
    "Use AI assistants safely and well for real work and earning, on a phone or a computer. Learn to prompt, check facts, protect privacy, write, handle data, translate, automate small tasks and build simple digital products you can sell honestly.",
  track: "ai-tools-for-work",
  field_category: "ai",
  level: "beginner",
  leads_to: ["no-code", "virtual-assistant", "ai-ml"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "ai-basics",
      title: "Understanding AI assistants",
      summary:
        "Before you rely on an AI assistant for work, learn what it really is, where it shines and where it fails. This section also covers picking a free tool and keeping your data and your clients safe.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [elementsOfAi, unescoAi],
    },
    {
      slug: "what-ai-can-do",
      title: "What AI can and cannot do",
      summary:
        "AI chat assistants predict likely words, which makes them fast at drafting but able to state wrong things with confidence. Knowing this one fact shapes how you use them for every task in this track.",
      parent: "ai-basics",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [elementsOfAi],
    },
    {
      slug: "choosing-tools",
      title: "Choosing and setting up a free assistant",
      summary:
        "Several companies offer free AI assistants that work in a web browser or an app, and their free plans change often. Learn how to compare them on what matters to you, such as data use, languages and limits.",
      parent: "ai-basics",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [geminiHelp, copilotPrompts],
    },
    {
      slug: "privacy-safety",
      title: "Privacy and safe use",
      summary:
        "Whatever you type into an AI tool may be stored or reviewed, so some information must never go in. Learn what to keep out, how to change your settings and how Ghana's data protection law applies to you.",
      parent: "ai-basics",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [geminiPrivacy, RES.dpc, RES.lfSafety],
    },
    {
      slug: "prompting",
      title: "Prompting well",
      summary:
        "The quality of what you get back depends heavily on what you ask. This section teaches you to write clear prompts, improve answers step by step and check everything before you use it.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [claudePrompting],
    },
    {
      slug: "prompt-basics",
      title: "Writing clear prompts",
      summary:
        "A strong prompt gives the assistant a task, the context, who it is for and the format you want. Practise turning vague requests into prompts that get useful answers the first time.",
      parent: "prompting",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [copilotPrompts, claudePrompting],
    },
    {
      slug: "improving-answers",
      title: "Improving answers step by step",
      summary:
        "Good results usually come from a short conversation, not one perfect prompt. Learn to give feedback, show examples and break big jobs into small steps.",
      parent: "prompting",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [claudePrompting, geminiHelp],
    },
    {
      slug: "checking-facts",
      title: "Checking facts and spotting made up answers",
      summary:
        "AI assistants sometimes invent facts, quotes, figures and links that look real. Learn a simple routine to verify claims before your name goes on the work.",
      parent: "prompting",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [ghanaFact, dubawa, RES.lfSearch],
    },
    {
      slug: "everyday-work",
      title: "AI for everyday work tasks",
      summary:
        "Most paid work that uses AI is ordinary work done faster: writing, summarising, handling data, making visuals and translating. Each topic here is a skill you can show an employer or client.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Virtual Assistant", "Entry level AI and automation assistant"],
      resources: [RES.lfBizWriting],
    },
    {
      slug: "writing-editing",
      title: "Writing and editing with AI",
      summary:
        "Use AI to draft and polish emails, messages, CVs, reports and social posts while keeping your own voice. You stay the editor who decides what is true, kind and right for the reader.",
      parent: "everyday-work",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfBizWriting, RES.lfWriting, docsGemini],
    },
    {
      slug: "summarising-research",
      title: "Summarising and research",
      summary:
        "AI can shrink long documents, meeting notes and reports into clear summaries and help you plan research. Learn to ask for the right kind of summary and to check it against the source.",
      parent: "everyday-work",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfSearch, RES.lfThinking],
    },
    {
      slug: "spreadsheets-data",
      title: "Spreadsheets and data help",
      summary:
        "AI can explain formulas, suggest how to clean messy lists and help you read a table. You still test every formula on real rows before you trust it.",
      parent: "everyday-work",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfSheets, sheetsFormulas],
    },
    {
      slug: "images-visuals",
      title: "Images and visuals",
      summary:
        "AI image tools can produce illustrations, backgrounds and design ideas from a text description. Learn where they help, where they go wrong and how to use them honestly.",
      parent: "everyday-work",
      optional: true,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfCanva, synthId],
    },
    {
      slug: "translation-local-languages",
      title: "Translation and local languages",
      summary:
        "AI translation between English and Ghanaian languages such as Dagbani, Twi and Ewe is improving but still makes mistakes. Learn to use it as a first draft and always check with a fluent speaker.",
      parent: "everyday-work",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [khaya, ghanaNlp, translateHelp],
    },
    {
      slug: "automation",
      title: "Saving time with small automations",
      summary:
        "Repeated tasks like answering the same questions or sorting emails can be partly handed to tools. This section shows how to save prompts you reuse and automate small jobs without writing code.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["No code automation specialist", "Virtual executive assistant and business development associate"],
      resources: [gmailFilters],
    },
    {
      slug: "prompt-templates",
      title: "Reusable prompts and templates",
      summary:
        "A tested prompt with blanks to fill in saves time and gives steady results. Build a small personal library of templates for tasks you do often.",
      parent: "automation",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [copilotPrompts, RES.lfDrive],
    },
    {
      slug: "automating-tasks",
      title: "Automating small repetitive tasks",
      summary:
        "Quick replies, email filters, form and sheet workflows and simple no code tools can take routine work off your hands. Start with one small, safe task and keep a person checking the results.",
      parent: "automation",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [gmailFilters, RES.whatsappBusiness, RES.lfSheets],
    },
    {
      slug: "earning",
      title: "Earning with AI skills",
      summary:
        "AI skills can help you land a job, take on freelance work or sell a simple digital product. This section covers where the opportunities are and how to earn honestly.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["AI specialist", "Twi AI training quality specialist", "Hausa AI training writer"],
      resources: [RES.lfFreelancing],
    },
    {
      slug: "ai-jobs-gigs",
      title: "Jobs and gigs that use AI skills",
      summary:
        "Adverts for assistants, content and social media roles now ask for AI tool skills, and some remote projects pay people to train and check AI. Learn how to find real openings and avoid scams.",
      parent: "earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfJobsearch, RES.lfFreelancing],
    },
    {
      slug: "digital-products",
      title: "Building simple AI powered digital products",
      summary:
        "A digital product is something you make once and sell many times, such as a template pack, a guide or a planner. Learn how AI can help you plan and build one that solves a real problem for real buyers.",
      parent: "earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfCanva, RES.lfDrive],
    },
    {
      slug: "selling-products",
      title: "Pricing and selling your product",
      summary:
        "A good product still needs buyers, a fair price and a safe way to get paid. Learn to test demand cheaply, take payment with mobile money and treat customers well.",
      parent: "earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.whatsappBusiness, RES.lfMoney],
    },
    {
      slug: "working-professionally",
      title: "Working professionally with AI",
      summary:
        "Clients and employers hire people they can trust and whose skills they can see. This last section covers honesty and ethics with AI and how to prove your skills with a portfolio.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Content editor", "Content creator and social media manager"],
      resources: [unescoAi, RES.lfResume],
    },
    {
      slug: "client-ethics",
      title: "Honesty and ethics with clients",
      summary:
        "Clients and employers trust you to be open about how you work and to respect other people's rights. Learn when to tell people you used AI, how to avoid copying and bias, and why your judgement matters most.",
      parent: "working-professionally",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [aiPrinciples, unescoAi],
    },
    {
      slug: "ai-portfolio",
      title: "Your AI skills portfolio",
      summary:
        "Employers and clients want proof, not claims, that you use AI well. Bring your best work from this track together into a short portfolio you can share from any device.",
      parent: "working-professionally",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfResume, RES.lfDrive],
    },
  ],
};
