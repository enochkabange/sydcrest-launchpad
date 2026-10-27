import { RES } from "./resources";
import type { RoadmapDraft } from "./types";

/**
 * The on ramp into the Delta Mentoring Program (src/content/dmp/curriculum.ts).
 * DMP week 1 starts with computer hardware, files and folders, safe browsing,
 * phishing and Gmail with attachments, so this roadmap stops just before that
 * point and covers what the cohort assumes: phone confidence, data habits,
 * calls and WhatsApp used professionally, an email account you can recover,
 * files and forms on a phone, first keyboard practice and study habits.
 * It deliberately does not re teach DMP weeks 1 to 6.
 *
 * Revised for issue #84 against entry level Ghanaian adverts (office,
 * customer service, sales, NGO field roles) and DigComp 3.0. Evidence and the
 * node by node coverage table: src/content/research/digital-skills-bridge.md.
 */
export const digitalSkillsBridge: RoadmapDraft = {
  slug: "digital-skills-bridge",
  title: "Digital Skills Bridge",
  description:
    "Start from the phone or computer you already have and build the everyday digital skills that entry level jobs and tech courses expect. It ends with you ready to apply for SydCrest's Delta Mentoring Program.",
  track: "digital-skills-bridge",
  field_category: "foundations",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "phone-as-a-tool",
      title: "Your phone or computer as a learning tool",
      summary:
        "The phone or computer you already have can take you a long way. This section helps you get comfortable with it and set it up for learning without wasting data or money.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "phone-first-steps",
      title: "First steps on a phone or computer",
      summary:
        "Learn the taps, swipes and buttons that every phone app uses, the clicks and keys that do the same jobs on a computer, and how to switch WiFi and mobile data on and off. Once these feel natural, every other skill gets easier.",
      parent: "phone-as-a-tool",
      optional: false,
      resources: [RES.lfComputer],
    },
    {
      slug: "phone-settings-and-storage",
      title: "Settings, storage and battery",
      summary:
        "Learn to free up storage, manage notifications and keep your battery going through a study session. A tidy phone or computer runs faster and crashes less.",
      parent: "phone-as-a-tool",
      optional: false,
      resources: [RES.lfComputer],
    },
    {
      slug: "saving-data",
      title: "Saving data and money",
      summary:
        "Use WiFi when you can, download lessons to watch offline and stop apps from eating your bundle in the background. Small habits make a data bundle last much longer.",
      parent: "phone-as-a-tool",
      optional: false,
      resources: [RES.lfInternet],
    },
    {
      slug: "apps-safely",
      title: "Installing apps safely",
      summary:
        "Install apps only from the official app store or the maker's own website, and check what permissions they ask for. Delete apps you do not use, since they take space and data.",
      parent: "phone-as-a-tool",
      optional: false,
      resources: [RES.lfSafety],
    },
    {
      slug: "communicating-at-work",
      title: "Calls, messages and video for work",
      summary:
        "Entry level job adverts in Ghana regularly ask for good phone, WhatsApp and email skills. This section turns the phone habits you already have into professional ones.",
      parent: null,
      optional: false,
      resources: [RES.lfCommunication],
    },
    {
      slug: "phone-calls-at-work",
      title: "Handling work phone calls",
      summary:
        "Answer politely, take a clear message and follow up when you promised. Good phone manners are one of the first things a customer notices.",
      parent: "communicating-at-work",
      optional: false,
      resources: [RES.lfCommunication],
    },
    {
      slug: "whatsapp-for-work",
      title: "WhatsApp for work",
      summary:
        "Write clear messages, share photos and documents, and behave well in work and class groups. Many shops, offices and NGOs in Ghana use WhatsApp every day.",
      parent: "communicating-at-work",
      optional: false,
      resources: [RES.whatsappFaq, RES.whatsappBusiness],
    },
    {
      slug: "video-calls",
      title: "Joining a video call",
      summary:
        "Join a video call from a link, use the mute and camera buttons, and save data while you are on the call. Many online classes, meetings and interviews now happen this way.",
      parent: "communicating-at-work",
      optional: false,
      resources: [],
    },
    {
      slug: "clear-english",
      title: "Reading and writing clear English",
      summary:
        "Many free courses and most office jobs use written English, so practise reading short lessons and writing short, polite messages. It is fine to read slowly and look up words at first.",
      parent: "communicating-at-work",
      optional: false,
      resources: [RES.bbcEnglish, RES.lfWriting, RES.lfBizWriting],
    },
    {
      slug: "accounts-and-safety",
      title: "Accounts and staying safe",
      summary:
        "Online learning and job applications need accounts, and accounts need protecting. This section covers the basics before you sign up for anything else.",
      parent: null,
      optional: false,
      resources: [RES.lfSafety],
    },
    {
      slug: "email-account",
      title: "One email address you control",
      summary:
        "Create a personal email address with a sensible name and make sure you can recover it with your own phone number. You will use it for every course, job application and certificate.",
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
      slug: "privacy-and-shared-phones",
      title: "Privacy on shared phones and computers",
      summary:
        "Decide what you share about yourself online and keep your accounts private on a phone or computer that others use. Employers trust people who protect their own information and other people's too.",
      parent: "accounts-and-safety",
      optional: false,
      resources: [RES.lfSafety],
    },
    {
      slug: "files-and-forms",
      title: "Files, forms and finding things",
      summary:
        "Jobs and courses ask you to send documents, fill in forms and look things up. This section teaches those skills on a phone or a computer, ready for the computer work in the DMP cohort.",
      parent: null,
      optional: false,
      resources: [RES.lfWeb],
    },
    {
      slug: "files-on-your-phone",
      title: "Photos, documents and files",
      summary:
        "Find what you downloaded, take a clear photo or scan of a document, and send it as a file. Job applications and course registrations usually ask you to attach something.",
      parent: "files-and-forms",
      optional: false,
      resources: [RES.lfDrive],
    },
    {
      slug: "online-forms",
      title: "Filling in online forms",
      summary:
        "Fill in registration, application and survey forms carefully and check them before you press submit. Field and office jobs often involve entering information into forms all day.",
      parent: "files-and-forms",
      optional: false,
      resources: [RES.lfWeb],
    },
    {
      slug: "searching-well",
      title: "Searching and judging information",
      summary:
        "Use better search words to find answers quickly and check whether a source can be trusted. Being able to look things up is one of the most useful skills in any job.",
      parent: "files-and-forms",
      optional: false,
      resources: [RES.lfSearch],
    },
    {
      slug: "computer-access",
      title: "Getting comfortable with a computer",
      summary:
        "Office jobs and tech courses need a keyboard sooner or later. This section helps you find access and build basic comfort before a cohort starts.",
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
        "Learn to type with all your fingers using free online lessons, a little every day. Faster typing makes every later course and office task easier.",
      parent: "computer-access",
      optional: false,
      resources: [RES.lfTyping, RES.monkeytype],
    },
    {
      slug: "learning-and-earning",
      title: "Learning, records and digital work",
      summary:
        "Digital skills are worth learning because they can lead to income. This section helps you keep learning, keep simple records and see where your skills can take you.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "study-habits",
      title: "Study habits that last",
      summary:
        "Set a small daily goal, take notes in your own words and find a study partner or group. Steady practice over weeks matters more than long sessions.",
      parent: "learning-and-earning",
      optional: false,
      resources: [],
    },
    {
      slug: "money-records",
      title: "Mobile money and simple records",
      summary:
        "Use mobile money confidently, read your transaction history and keep a simple record of sales or spending. Shop, office and field jobs regularly ask for accurate records.",
      parent: "learning-and-earning",
      optional: false,
      resources: [RES.lfMoney, RES.sheetsHelp],
    },
    {
      slug: "digital-careers",
      title: "Exploring digital careers",
      summary:
        "Look at the roadmaps for marketing, design, data, product and software to see what each job involves day to day. You do not need to choose now, but knowing the options helps you stay motivated.",
      parent: "learning-and-earning",
      optional: false,
      resources: [RES.lfJobsearch],
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
        "Confirm you can type a short paragraph, sign in to your email, send a document and join a video call. If anything is missing, revisit that part of this roadmap first.",
      parent: "ready-for-dmp",
      optional: false,
      resources: [],
    },
    {
      slug: "apply-to-dmp",
      title: "Apply to the DMP cohort",
      summary:
        "Join the waitlist on SydCrest's Programme page for the free pilot cohort and be ready to show the progress you made on this roadmap. If you do not get a seat this time, keep learning on the free roadmaps and apply again if another cohort is announced.",
      parent: "ready-for-dmp",
      optional: false,
      resources: [],
    },
  ],
};
