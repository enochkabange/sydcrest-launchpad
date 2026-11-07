import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Office tools: Google Workspace or Microsoft 365 (issue #294). Original
 * SydCrest outline; sources, adverts and the coverage table are in
 * src/content/research/office-tools.md. Every link checked to resolve on
 * 7 November 2026. Sibling nodes sharing a choice_group are "pick one"
 * alternatives: a Google option and a Microsoft option.
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });
const g = (label: string, url: string) => r(`Google Help: ${label}`, url);
const ms = (label: string, url: string) => r(`Microsoft Support: ${label}`, url);
const lf = (label: string, slug: string) => r(`GCFGlobal LearnFree: ${label}`, `https://www.learnfree.org/series/${slug}`);

const m365Free = r(
  "Free Microsoft 365 for the web (Word, Excel, PowerPoint)",
  "https://www.microsoft.com/en-us/microsoft-365/free-office-online-for-the-web",
  "practice",
);
const googleStorage = g("How your Google storage works", "https://support.google.com/googleone/answer/9312312");
const msStorage = ms("Microsoft storage FAQs", "https://support.microsoft.com/en-us/onedrive/microsoft-storage-faqs");
const lfWorkplace = lf("Workplace Basics", "workplace-basics");

const gmailPhishing = g("Avoid and report phishing emails", "https://support.google.com/mail/answer/8253");
const gmailLabels = g("Create and manage labels in Gmail", "https://support.google.com/mail/answer/118708");
const gmailSignature = g("Create a Gmail signature", "https://support.google.com/mail/answer/8395");
const outlookHelp = r("Microsoft Support: Outlook help and learning", "https://support.microsoft.com/en-us/outlook");
const outlookSignature = ms(
  "Add and change an email signature in Outlook",
  "https://support.microsoft.com/en-us/office/create-and-add-an-email-signature-in-outlook-com-776d9006-abdf-444e-b5b7-a61821dff034",
);
const outlookPhishing = ms(
  "Phishing and suspicious behaviour in Outlook",
  "https://support.microsoft.com/en-us/office/phishing-and-suspicious-behavior-0d882ea5-eedc-4bed-aebc-079ffa1105a3",
);
const lfOutlook = lf("Introduction to Microsoft Outlook", "introduction-to-microsoft-outlook");

const driveUpload = g("Upload files and folders to Google Drive", "https://support.google.com/drive/answer/2424368");
const driveOffline = g("Use Google Drive files offline", "https://support.google.com/drive/answer/2375012");
const driveShare = g("Share and manage access in Google Drive", "https://support.google.com/drive/answer/2494822");
const onedriveHelp = r("Microsoft Support: OneDrive help and learning", "https://support.microsoft.com/en-us/onedrive");
const onedriveShare = ms(
  "Share files and folders in OneDrive",
  "https://support.microsoft.com/en-us/office/share-onedrive-files-and-folders-9fcc2f7d-de0c-4cec-93b0-a82024800c07",
);
const lfOnedrive = lf("OneDrive and Office Online", "onedrive-and-office-online");

const docsHelp = g("How to use Google Docs", "https://support.google.com/docs/answer/7068618");
const docsHeadings = g("Add a title, heading or table of contents", "https://support.google.com/docs/answer/116338");
const docsSuggest = g("Suggest edits in Google Docs", "https://support.google.com/docs/answer/6033474");
const docsComments = g("Use comments in Google Docs", "https://support.google.com/docs/answer/65129");
const lfDocs = lf("Google Docs", "google-docs");
const wordHelp = r("Microsoft Support: Word help and learning", "https://support.microsoft.com/en-us/word");
const wordTrack = ms(
  "Track Changes in Word for the web",
  "https://support.microsoft.com/en-us/word/can-i-use-track-changes-in-word-for-the-web",
);
const lfWord = lf("Introduction to Microsoft Word", "introduction-to-microsoft-word");

const excelHelp = r("Microsoft Support: Excel help and learning", "https://support.microsoft.com/en-us/excel");
const lfExcel = lf("Excel Foundations", "excel-foundations");
const slidesHelp = g("How to use Google Slides", "https://support.google.com/docs/answer/2763168");
const lfSlides = lf("Google Slides", "google-slides");
const pptHelp = r("Microsoft Support: PowerPoint help and learning", "https://support.microsoft.com/en-us/powerpoint");
const lfPpt = lf("Introduction to Microsoft PowerPoint", "introduction-to-microsoft-powerpoint");

const formsHelp = g("How to use Google Forms", "https://support.google.com/docs/answer/6281888");
const formsShare = g("Publish and share your form", "https://support.google.com/docs/answer/2839588");
const msForms = ms(
  "Create a form with Microsoft Forms",
  "https://support.microsoft.com/en-us/office/create-a-form-with-microsoft-forms-4ffb64cc-7d5d-402f-b82e-b1d49418fd9d",
);
const msFormsHelp = r("Microsoft Support: Forms help and learning", "https://support.microsoft.com/en-us/forms");
const calendarEvent = g("Create an event in Google Calendar", "https://support.google.com/calendar/answer/72143");
const meetStart = g("Start or schedule a Google Meet meeting", "https://support.google.com/meet/answer/9302870");
const teamsFree = ms(
  "Audio and video calls in Microsoft Teams (free)",
  "https://support.microsoft.com/en-au/office/connect-over-audio-or-video-ce0e30dd-604c-4c2d-ace6-f119ebaccf84",
);
const lfTeams = lf("Introduction to Microsoft Teams", "introduction-to-microsoft-teams");

export const officeTools: RoadmapDraft = {
  slug: "office-tools",
  title: "Office tools: Google and Microsoft",
  description:
    "Everyday office software on free accounts: email, cloud files, documents, spreadsheets, slides, forms, calendars and video meetings. At most steps you choose Google Workspace or Microsoft 365, and everything works on a phone or a computer.",
  track: "office-tools",
  field_category: "foundations",
  level: "beginner",
  leads_to: ["excel-power-bi", "virtual-assistant"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "office-suites",
      title: "Your office suite",
      summary:
        "Offices in Ghana run on Google Workspace or Microsoft 365, and adverts ask for both. You will pick one to learn first, set up a free account and learn what the free version can and cannot do.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [m365Free, googleStorage, lfWorkplace],
    },
    {
      slug: "professional-email",
      title: "Professional email and phishing",
      summary:
        "A clear subject line, a polite greeting and one purpose per email make you look professional from your first day. You will also learn the warning signs of a phishing email and what to do with one.",
      parent: "office-suites",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfBizWriting, gmailPhishing, outlookPhishing],
    },
    {
      slug: "gmail",
      title: "Gmail for work",
      summary:
        "Gmail keeps your inbox tidy with labels, archiving and search, and it adds a signature to every message. You will set these up and send attachments the right way.",
      parent: "office-suites",
      optional: false,
      choice_group: "email-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [gmailLabels, gmailSignature, RES.lfGmail],
    },
    {
      slug: "outlook",
      title: "Outlook for work",
      summary:
        "Outlook uses folders, rules and search to keep a busy inbox under control, and it adds a signature to every message. You will set these up in a free Outlook account and send attachments the right way.",
      parent: "office-suites",
      optional: false,
      choice_group: "email-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [outlookHelp, outlookSignature, lfOutlook],
    },
    {
      slug: "cloud-files",
      title: "Files in the cloud",
      summary:
        "Cloud storage keeps your work safe when a phone is lost and lets you open it on any device. This section covers organising, uploading, offline use and sharing without leaking private data.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [googleStorage, msStorage],
    },
    {
      slug: "google-drive",
      title: "Google Drive",
      summary:
        "Google Drive stores your files in your free Google storage, which Gmail and Photos share. You will build a clear folder structure, upload files and keep important ones available offline.",
      parent: "cloud-files",
      optional: false,
      choice_group: "file-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [driveUpload, driveOffline, RES.lfDrive],
    },
    {
      slug: "onedrive",
      title: "OneDrive",
      summary:
        "OneDrive is where Word, Excel and PowerPoint for the web save your work, inside a small free storage allowance. You will build a clear folder structure, upload files and keep important ones available offline.",
      parent: "cloud-files",
      optional: false,
      choice_group: "file-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [onedriveHelp, msStorage, lfOnedrive],
    },
    {
      slug: "sharing-safely",
      title: "Sharing files safely",
      summary:
        "Sharing a link is quick, but the wrong setting can put a staff list or a payment record in front of strangers. You will learn view, comment and edit access, the risk of anyone with the link, and how to stop sharing.",
      parent: "cloud-files",
      optional: false,
      difficulty: "beginner",
      complexity: 3,
      resources: [driveShare, onedriveShare],
    },
    {
      slug: "documents",
      title: "Documents",
      summary:
        "Letters, reports, minutes and memos are the daily output of most offices. This section teaches you to build them with proper structure and to review them with colleagues.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Office Assistant", "Administrative Assistant"],
      resources: [lfDocs, lfWord],
    },
    {
      slug: "google-docs",
      title: "Google Docs",
      summary:
        "Google Docs gives you headings, tables, page setup and PDF export for free in a browser or app. You will format a short report properly instead of with spaces and bold text.",
      parent: "documents",
      optional: false,
      choice_group: "doc-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [docsHelp, docsHeadings, lfDocs],
    },
    {
      slug: "word",
      title: "Word",
      summary:
        "Word for the web and the Word app are free with a Microsoft account and handle most office documents. You will format a short report with styles and tables, then save it as a PDF.",
      parent: "documents",
      optional: false,
      choice_group: "doc-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [wordHelp, m365Free, lfWord],
    },
    {
      slug: "reviewing-documents",
      title: "Comments, suggestions and tracked changes",
      summary:
        "Most office documents pass through several hands before they are final. You will comment, suggest edits in Google Docs or track changes in Word, and accept or reject what others propose.",
      parent: "documents",
      optional: false,
      difficulty: "beginner",
      complexity: 3,
      resources: [docsSuggest, docsComments, wordTrack],
    },
    {
      slug: "sheets-and-slides",
      title: "Spreadsheets and presentations",
      summary:
        "Offices keep lists in spreadsheets and explain plans with slides. This section gives you enough of both for everyday office work.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Administration Officer", "Office Administrator"],
      resources: [RES.lfSheets, lfExcel],
    },
    {
      slug: "google-sheets",
      title: "Google Sheets basics",
      summary:
        "A tidy Google Sheet with a frozen header, sensible formats and a few totals covers most office lists. You will build one, and the Excel and Power BI track takes you much further.",
      parent: "sheets-and-slides",
      optional: false,
      choice_group: "sheet-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.sheetsHelp, RES.lfSheets],
    },
    {
      slug: "excel",
      title: "Excel basics",
      summary:
        "A tidy Excel sheet with a frozen header, sensible formats and a few totals covers most office lists. You will build one in free Excel for the web, and the Excel and Power BI track takes you much further.",
      parent: "sheets-and-slides",
      optional: false,
      choice_group: "sheet-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [excelHelp, lfExcel],
    },
    {
      slug: "google-slides",
      title: "Google Slides",
      summary:
        "A short, clear deck helps a manager or a community meeting follow your point. You will build one in Google Slides with layouts, speaker notes and a PDF copy for people with weak connections.",
      parent: "sheets-and-slides",
      optional: false,
      choice_group: "slide-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [slidesHelp, lfSlides],
    },
    {
      slug: "powerpoint",
      title: "PowerPoint",
      summary:
        "A short, clear deck helps a manager or a community meeting follow your point. You will build one in free PowerPoint for the web with layouts, speaker notes and a PDF copy for people with weak connections.",
      parent: "sheets-and-slides",
      optional: false,
      choice_group: "slide-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [pptHelp, lfPpt],
    },
    {
      slug: "working-together",
      title: "Forms, calendars and meetings",
      summary:
        "Offices collect information with forms and agree times with calendar invites and video calls. This section covers both, on free accounts and with data costs in mind.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Secretary", "Digital Admin Assistant"],
      resources: [calendarEvent, teamsFree],
    },
    {
      slug: "google-forms",
      title: "Google Forms",
      summary:
        "A Google Form collects registrations, feedback or survey answers straight into a spreadsheet. You will build one with the right question types, share the link and read the responses.",
      parent: "working-together",
      optional: false,
      choice_group: "form-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [formsHelp, formsShare],
    },
    {
      slug: "microsoft-forms",
      title: "Microsoft Forms",
      summary:
        "Microsoft Forms is free with a Microsoft account and collects registrations, feedback or quiz answers. You will build one with the right question types, share the link and open the responses in Excel.",
      parent: "working-together",
      optional: false,
      choice_group: "form-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [msForms, msFormsHelp],
    },
    {
      slug: "google-calendar-meet",
      title: "Google Calendar and Meet",
      summary:
        "A calendar invite with a Meet link tells everyone when, where and how to join in one message. You will schedule a meeting, invite guests and run a short call within the free limits.",
      parent: "working-together",
      optional: false,
      choice_group: "meeting-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [calendarEvent, meetStart],
    },
    {
      slug: "outlook-calendar-teams",
      title: "Outlook calendar and Teams",
      summary:
        "An Outlook calendar invite with a Teams link tells everyone when, where and how to join. You will schedule a meeting, invite guests and run a short call within the free Teams limits.",
      parent: "working-together",
      optional: false,
      choice_group: "meeting-tool",
      difficulty: "beginner",
      complexity: 2,
      resources: [outlookHelp, teamsFree, lfTeams],
    },
    {
      slug: "office-practical",
      title: "Putting it together",
      summary:
        "Real office work strings these tools together in one task. This section has you do exactly that and then choose where to go next.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 3,
      careerLevel: "junior",
      jobs: ["Administrative Assistant", "Virtual Assistant"],
      resources: [lfWorkplace],
    },
    {
      slug: "office-task-project",
      title: "Practical: a workshop from start to finish",
      summary:
        "You will organise a small training workshop using a form, a spreadsheet, a letter, a short deck, shared files and a calendar invite. The finished folder is a portfolio piece you can show an employer.",
      parent: "office-practical",
      optional: false,
      difficulty: "intermediate",
      complexity: 4,
      resources: [formsHelp, msForms, lfWorkplace],
    },
    {
      slug: "next-steps",
      title: "Next steps",
      summary:
        "Office tools open several doors, from data reporting to remote assistant work. You will pick your next track and describe your skills honestly on a CV.",
      parent: "office-practical",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfResume, RES.lfJobsearch],
    },
  ],
};
