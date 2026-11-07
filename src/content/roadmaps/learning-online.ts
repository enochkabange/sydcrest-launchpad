import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Learning online (issue #294): how adults new to studying online choose a
 * course, use free platforms, earn certificates that mean something, study on
 * limited data and shared devices, learn well, stay safe and start a four week
 * plan. It sits after the Digital Skills Bridge and before any career track.
 *
 * Platforms are named as examples, never endorsements. Evidence and the node by
 * node coverage table: src/content/research/learning-online.md.
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const L = {
  growWithGoogle: r("Grow with Google", "https://grow.google/"),
  msLearn: r("Microsoft Learn: Training", "https://learn.microsoft.com/en-us/training/", "practice"),
  msCredentials: r("Microsoft Learn: Credentials", "https://learn.microsoft.com/en-us/credentials/"),
  khan: r("Khan Academy", "https://www.khanacademy.org/", "video"),
  learnfree: r("GCFGlobal LearnFree", "https://www.learnfree.org/"),
  coursera: r("Coursera", "https://www.coursera.org/"),
  edxAudit: r("edX Help: What is the audit track", "https://support.edx.org/hc/en-us/articles/1500003964681"),
  datacampDonates: r("DataCamp Donates", "https://www.datacamp.com/donates"),
  ytOffline: r("YouTube Help: Watch videos offline", "https://support.google.com/youtube/answer/6141269"),
  ytQuality: r("YouTube Help: Change video quality", "https://support.google.com/youtube/answer/91449"),
  learningScientists: r("The Learning Scientists: Six strategies", "https://www.learningscientists.org/downloadable-materials"),
  twoStep: r("Google Account Help: 2 Step Verification", "https://support.google.com/accounts/answer/185839"),
  csa: r("Cyber Security Authority Ghana", "https://www.csa.gov.gh/"),
};

export const learningOnline: RoadmapDraft = {
  slug: "learning-online",
  title: "Learning online",
  description:
    "Learn how to study online as an adult: choose a course worth your time, use free platforms, earn certificates that mean something and keep learning on limited data. It ends with a four week plan you have already started.",
  track: "learning-online",
  field_category: "foundations",
  level: "beginner",
  leads_to: ["ai-tools-for-work", "virtual-assistant", "excel-power-bi", "digital-marketing", "data", "frontend", "it-support"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "start-learning-online",
      title: "Starting to learn online",
      summary:
        "Online courses let you learn around work and family, at your own pace. This section helps you set a clear goal and pick a course that is worth your time and data.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.lfInternet],
    },
    {
      slug: "why-learn-online",
      title: "Why and how adults learn online",
      summary:
        "See the main ways people learn online, from short videos to full courses with tests. Knowing the formats helps you pick one that fits your life.",
      parent: "start-learning-online",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [L.learnfree],
    },
    {
      slug: "setting-a-learning-goal",
      title: "Setting a learning goal",
      summary:
        "Turn a wish such as learning computers into a goal you can finish and check. A clear goal tells you which course to take and when you are done.",
      parent: "start-learning-online",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [],
    },
    {
      slug: "choosing-a-course",
      title: "Choosing a course worth your time",
      summary:
        "Read the syllabus, check who made the course and count the real cost in time and data before you start. A few minutes of checking saves weeks on the wrong course.",
      parent: "start-learning-online",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [L.edxAudit],
    },
    {
      slug: "free-places-to-learn",
      title: "Free places to learn",
      summary:
        "Many good courses cost nothing to study. This section shows well known free platforms as examples, so you know where to look and what each one is good for.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [],
    },
    {
      slug: "work-skills-platforms",
      title: "Google, Microsoft and freeCodeCamp courses",
      summary:
        "Google Skillshop, Grow with Google, Microsoft Learn and freeCodeCamp teach skills that are used at work. Learn what each offers and how to find a first course.",
      parent: "free-places-to-learn",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.skillshop, L.msLearn, RES.fccLearn],
    },
    {
      slug: "everyday-skills-platforms",
      title: "GCFGlobal, Khan Academy and YouTube",
      summary:
        "GCFGlobal LearnFree and Khan Academy teach everyday computer, maths and study skills for free, and YouTube has lessons on almost anything. Learn how to use each one well.",
      parent: "free-places-to-learn",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [L.learnfree, L.khan],
    },
    {
      slug: "course-sites-and-auditing",
      title: "Coursera, edX and free audit options",
      summary:
        "Coursera and edX host courses from universities and companies, and many can be studied free through an audit option. Learn what auditing gives you and what it leaves out.",
      parent: "free-places-to-learn",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [L.coursera, L.edxAudit, L.datacampDonates],
    },
    {
      slug: "certificates",
      title: "Certificates that carry weight",
      summary:
        "A certificate is only useful if the person reading it trusts it. This section helps you choose certificates with care and show them well.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "foundation",
      jobs: [],
      resources: [L.msCredentials],
    },
    {
      slug: "choosing-certificates",
      title: "Which certificates are worth earning",
      summary:
        "Compare certificates by who issues them, how they are earned and whether they cost money. Employers trust a certificate more when it was earned by passing a real test or task.",
      parent: "certificates",
      optional: false,
      difficulty: "beginner",
      complexity: 3,
      resources: [L.msCredentials, RES.skillshop],
    },
    {
      slug: "showing-certificates",
      title: "Showing your certificates",
      summary:
        "Save, name and share your certificates so an employer can check them. Pair each one with something you made, because proof of skill beats a list of badges.",
      parent: "certificates",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfResume],
    },
    {
      slug: "learning-on-limited-data",
      title: "Learning on limited data and shared devices",
      summary:
        "Limited data and a shared device do not have to stop you. This section shows how to download lessons, make video use less data and find places to study.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.lfInternet],
    },
    {
      slug: "downloading-lessons",
      title: "Downloading lessons and offline modes",
      summary:
        "Download videos, notes and whole lessons while you have WiFi, then study offline later. Learn which apps allow this and how to keep your storage under control.",
      parent: "learning-on-limited-data",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [L.ytOffline],
    },
    {
      slug: "low-data-video",
      title: "Data saving and low data video",
      summary:
        "Choose a lower video quality, turn off autoplay and prefer text lessons when they exist. These settings can make a small bundle cover a whole week of study.",
      parent: "learning-on-limited-data",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [L.ytQuality],
    },
    {
      slug: "shared-devices-and-hubs",
      title: "Shared devices, hubs and libraries",
      summary:
        "Plan your study when you share a phone or computer, and find hubs, libraries and centres with computers or WiFi. Sign out and keep your files safe every time.",
      parent: "learning-on-limited-data",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfSafety],
    },
    {
      slug: "learning-well",
      title: "Learning well",
      summary:
        "Watching a lesson is not the same as learning it. This section covers the study habits that help skills stay with you.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "foundation",
      jobs: [],
      resources: [L.learningScientists],
    },
    {
      slug: "notes-and-spaced-review",
      title: "Notes and spaced review",
      summary:
        "Take short notes in your own words, then test yourself on them over several days. Spreading out your review helps you remember far longer than one long session.",
      parent: "learning-well",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [L.learningScientists],
    },
    {
      slug: "practice-and-projects",
      title: "Practice and small projects",
      summary:
        "Use every new skill on a small real task as soon as you can. A finished project shows you can do the work, not only that you watched the course.",
      parent: "learning-well",
      optional: false,
      difficulty: "beginner",
      complexity: 3,
      resources: [RES.fccLearn],
    },
    {
      slug: "asking-good-questions",
      title: "Asking good questions in communities",
      summary:
        "Write questions that say what you tried, what happened and what you expected. Clear questions get faster, better answers from study groups and online forums.",
      parent: "learning-well",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfCommunication],
    },
    {
      slug: "time-and-motivation",
      title: "Fitting study around work and family",
      summary:
        "Find small, regular study times in a busy week and protect them. Plan for missed days so one bad week does not end your course.",
      parent: "learning-well",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [],
    },
    {
      slug: "stay-safe-and-start",
      title: "Stay safe and get started",
      summary:
        "Wherever there are learners, there are people trying to take their money. This section helps you avoid scams, protect your accounts and start your own plan.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.lfSafety],
    },
    {
      slug: "fake-courses-and-scams",
      title: "Fake courses and certificate scams",
      summary:
        "Learn the warning signs of fake, overpriced and copied courses and of certificates that can be bought without learning. Check before you pay, and never pay to receive a free course.",
      parent: "stay-safe-and-start",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfSafety, L.csa],
    },
    {
      slug: "protecting-learning-accounts",
      title: "Protecting your learning accounts",
      summary:
        "Your course accounts hold your progress and your certificates. Protect them with a strong password, two step verification and an email you can always recover.",
      parent: "stay-safe-and-start",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [L.twoStep],
    },
    {
      slug: "four-week-plan",
      title: "Your four week learning plan",
      summary:
        "Write a four week plan with a goal, a course, study times and a small project, then complete its first session today. At the end, choose the SydCrest track you will take next.",
      parent: "stay-safe-and-start",
      optional: false,
      kind: "checkpoint",
      difficulty: "beginner",
      complexity: 3,
      resources: [],
    },
  ],
};
