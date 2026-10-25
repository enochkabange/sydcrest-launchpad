import { RES } from "./resources";
import type { RoadmapDraft } from "./types";

/**
 * The on ramp into the Delta Mentoring Program (src/content/dmp/curriculum.ts).
 * DMP week 1 starts with computer basics, safe browsing and Gmail, so this
 * roadmap stops just before that point and covers what the cohort assumes:
 * phone confidence, data habits, a safe account, keyboard access and the
 * study habits a twelve week programme needs. It deliberately does not
 * re teach DMP weeks 1 to 6.
 */
export const digitalSkillsBridge: RoadmapDraft = {
  slug: "digital-skills-bridge",
  title: "Digital Skills Bridge",
  description:
    "Start from your phone and build the everyday digital skills you need before joining a tech course. It ends with you ready to apply for SydCrest's Delta Mentoring Program.",
  track: "digital-skills-bridge",
  field_category: "foundations",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "phone-as-a-tool",
      title: "Your phone as a learning tool",
      summary:
        "The phone you already have can take you a long way. This section helps you set it up for learning without wasting data or money.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "phone-settings-and-storage",
      title: "Settings, storage and battery",
      summary:
        "Learn to free up storage, manage notifications and keep your battery going through a study session. A tidy phone runs faster and crashes less.",
      parent: "phone-as-a-tool",
      optional: false,
      resources: [RES.lfComputer],
    },
    {
      slug: "saving-data",
      title: "Saving data and money",
      summary:
        "Compare bundles, use WiFi when you can and download lessons and videos to watch offline. Turn off automatic video play and app updates on mobile data.",
      parent: "phone-as-a-tool",
      optional: false,
      resources: [RES.lfInternet],
    },
    {
      slug: "apps-safely",
      title: "Installing apps safely",
      summary:
        "Install apps only from the official app store and check what permissions they ask for. Delete apps you do not use, since they take space and data.",
      parent: "phone-as-a-tool",
      optional: false,
      resources: [RES.lfSafety],
    },
    {
      slug: "accounts-and-safety",
      title: "Accounts and staying safe",
      summary:
        "Online learning needs accounts, and accounts need protecting. This section covers the basics before you sign up for anything else.",
      parent: null,
      optional: false,
      resources: [RES.lfSafety],
    },
    {
      slug: "email-account",
      title: "One email address you control",
      summary:
        "Create a personal email address with a professional name and make sure you can recover it with your own phone number. You will use it for every course, job application and certificate.",
      parent: "accounts-and-safety",
      optional: false,
      resources: [RES.lfGmail],
    },
    {
      slug: "passwords-and-two-step",
      title: "Strong passwords and two step verification",
      summary:
        "Use long, different passwords for important accounts and turn on two step verification. Never share a verification code with anyone, even someone claiming to be from a company.",
      parent: "accounts-and-safety",
      optional: false,
      resources: [RES.lfSafety],
    },
    {
      slug: "spotting-scams",
      title: "Spotting mobile money and online scams",
      summary:
        "Learn common tricks such as fake wrong transfer messages, prize calls and fake job offers that ask for a fee. Never give out your mobile money PIN, and check any request by calling the official number yourself.",
      parent: "accounts-and-safety",
      optional: false,
      resources: [RES.lfSafety],
    },
    {
      slug: "computer-access",
      title: "Getting comfortable with a computer",
      summary:
        "Tech courses and jobs need a keyboard sooner or later. This section helps you find access and build basic comfort before a cohort starts.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "finding-a-computer",
      title: "Finding a computer to practise on",
      summary:
        "Ask about computer access at your school, a library, a community centre or a business centre near you. Plan a regular time slot so practice becomes a habit.",
      parent: "computer-access",
      optional: false,
      resources: [],
    },
    {
      slug: "mouse-and-keyboard",
      title: "Mouse and keyboard basics",
      summary:
        "Practise clicking, dragging, scrolling and using common keys such as shift, enter and backspace. A few short sessions make a big difference to your confidence.",
      parent: "computer-access",
      optional: false,
      resources: [RES.lfMouse],
    },
    {
      slug: "typing",
      title: "Typing practice",
      summary:
        "Learn to type with all your fingers using free online lessons, a little every day. Faster typing makes every later course easier.",
      parent: "computer-access",
      optional: false,
      resources: [RES.lfTyping, RES.monkeytype],
    },
    {
      slug: "learning-online",
      title: "Learning online",
      summary:
        "Studying alone on a screen is a skill of its own. This section helps you find good information and keep going when it gets hard.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "english-for-learning",
      title: "Reading and writing English for learning",
      summary:
        "Many free tech courses are in English, so practise reading short lessons and writing clear messages. It is fine to look up words and read slowly at first.",
      parent: "learning-online",
      optional: false,
      resources: [RES.bbcEnglish, RES.lfWriting],
    },
    {
      slug: "searching-well",
      title: "Searching and judging information",
      summary:
        "Use better search words to find answers quickly and check whether a source can be trusted. Being able to look things up is one of the most useful skills in tech.",
      parent: "learning-online",
      optional: false,
      resources: [RES.lfSearch],
    },
    {
      slug: "study-habits",
      title: "Study habits that last",
      summary:
        "Set a small daily goal, take notes in your own words and find a study partner or group. Consistency over weeks matters more than long sessions.",
      parent: "learning-online",
      optional: false,
      resources: [],
    },
    {
      slug: "digital-work",
      title: "Money and work in a digital world",
      summary:
        "Digital skills are worth learning because they can lead to income. This section connects what you are learning to real opportunities.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "money-records",
      title: "Mobile money and simple records",
      summary:
        "Use mobile money confidently, read your transaction history and keep a simple record of what you spend and earn. These habits matter as soon as you start freelancing.",
      parent: "digital-work",
      optional: false,
      resources: [RES.lfMoney],
    },
    {
      slug: "digital-careers",
      title: "Exploring digital careers",
      summary:
        "Look at the roadmaps for marketing, design, data, product and software to see what each job involves day to day. You do not need to choose now, but knowing the options helps you stay motivated.",
      parent: "digital-work",
      optional: false,
      resources: [],
    },
    {
      slug: "ready-for-dmp",
      title: "Ready for the Delta Mentoring Program",
      summary:
        "The Delta Mentoring Program is SydCrest's twelve week mentored cohort in digital skills and digital marketing. It starts with computer basics, safe browsing and Gmail, so this section checks you are ready for that first week.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "readiness-check",
      title: "Readiness checklist",
      summary:
        "Confirm you can type a short paragraph, sign in to your email, join a video call and set aside a few hours each week. If anything is missing, revisit that part of this roadmap first.",
      parent: "ready-for-dmp",
      optional: false,
      resources: [],
    },
    {
      slug: "apply-to-dmp",
      title: "Apply to the DMP cohort",
      summary:
        "Apply for the next cohort and mention the progress you made on this roadmap in your application. If you do not get a seat this time, keep learning on the free roadmaps and apply again.",
      parent: "ready-for-dmp",
      optional: false,
      resources: [],
    },
  ],
};
