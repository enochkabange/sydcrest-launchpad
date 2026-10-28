import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve (27 October 2026). */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const googlePm = r(
  "Coursera: Google Project Management certificate",
  "https://www.coursera.org/professional-certificates/google-project-management",
  "video",
);
const googlePmFoundations = r(
  "Coursera: Foundations of Project Management",
  "https://www.coursera.org/learn/project-management-foundations-initiation",
  "video",
);
const projectDpro = r("PM4NGOs: Project DPro guide (free download)", "https://pm4ngos.org/project-dpro/");
const pm4ngosGuides = r("PM4NGOs: Guides for development projects", "https://pm4ngos.org/guides/");
const atlassianPm = r("Atlassian: Project management guide", "https://www.atlassian.com/work-management/project-management");
const atlassianScope = r("Atlassian: Project scope", "https://www.atlassian.com/work-management/project-management/project-scope");
const atlassianKickoff = r("Atlassian Team Playbook: Project kick off", "https://www.atlassian.com/team-playbook/plays/project-kick-off", "practice");
const atlassianRaci = r("Atlassian: RACI charts", "https://www.atlassian.com/work-management/project-management/raci-chart");
const atlassianGantt = r("Atlassian: Gantt charts", "https://www.atlassian.com/agile/project-management/gantt-chart");
const atlassianRisk = r("Atlassian: Risk registers", "https://www.atlassian.com/work-management/project-management/risk-register");
const atlassianKanban = r("Atlassian: Kanban", "https://www.atlassian.com/agile/kanban");
const atlassianScrum = r("Atlassian: Scrum", "https://www.atlassian.com/agile/scrum");
const atlassianRetro = r("Atlassian Team Playbook: Retrospectives", "https://www.atlassian.com/team-playbook/plays/retrospective", "practice");
const asanaCharter = r("Asana: Project charters", "https://asana.com/resources/project-charter");
const asanaScope = r("Asana: Project scope", "https://asana.com/resources/project-scope");
const asanaWbs = r("Asana: Work breakdown structure", "https://asana.com/resources/work-breakdown-structure");
const asanaBudget = r("Asana: Project budgets", "https://asana.com/resources/project-budget");
const asanaClosure = r("Asana: Project closure", "https://asana.com/resources/project-closure");
const tools4devLogframe = r(
  "tools4dev: How to write a logical framework",
  "https://tools4dev.org/resources/how-to-write-a-logical-framework-logframe/",
);
const tools4dev = r("tools4dev: Practical tools for development work", "https://tools4dev.org/");
const trelloGuide = r("Trello guide", "https://trello.com/guide", "practice");
const trelloTemplates = r("Trello templates", "https://trello.com/templates", "practice");
const sheetsConditional = r("Google Sheets: Conditional formatting rules", "https://support.google.com/docs/answer/78413");
const scrumGuide = r("The Scrum Guide", "https://scrumguides.org/scrum-guide.html");
const peoplecert = r("PeopleCert (PRINCE2 exams)", "https://www.peoplecert.org/");

export const projectManagement: RoadmapDraft = {
  slug: "project-management",
  title: "Project Management",
  description:
    "Plan, run and report on projects for NGOs, donors and businesses, the kind of coordination work common across northern Ghana. Learn scope, work plans, budgets, risks, logframes and reports with free tools on a phone or a computer.",
  track: "project-management",
  field_category: "business",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "project-basics",
      title: "Project basics",
      summary:
        "Project managers keep work on time, within budget and focused on its goals, from a borehole project to a training programme. This section explains what projects are and who works on them.",
      parent: null,
      optional: false,
      resources: [atlassianPm, googlePmFoundations],
    },
    {
      slug: "what-is-a-project",
      title: "What makes something a project",
      summary:
        "A project has a clear goal, a start and an end, a budget and limited people and time, unlike routine work. You will learn how scope, time and cost pull against each other and why changing one affects the others.",
      parent: "project-basics",
      optional: false,
      resources: [atlassianPm, googlePmFoundations],
    },
    {
      slug: "project-roles",
      title: "Who does what on a project",
      summary:
        "You will meet the common roles, such as project assistant, project officer, coordinator, manager, M&E officer, finance staff, donors and community partners. A simple RACI chart shows who does, approves, advises and is informed for each task.",
      parent: "project-basics",
      optional: false,
      resources: [atlassianRaci],
    },
    {
      slug: "project-life-cycle",
      title: "The project life cycle",
      summary:
        "Most projects move through starting, planning, doing, monitoring and closing, even when the names differ between organisations. Knowing the stage you are in tells you which documents and decisions matter right now.",
      parent: "project-basics",
      optional: false,
      resources: [projectDpro, googlePm],
    },
    {
      slug: "starting-a-project",
      title: "Starting a project",
      summary:
        "Projects go wrong most often because nobody agreed at the start what success looks like. This section covers goals, people and results frameworks.",
      parent: null,
      optional: false,
      resources: [atlassianKickoff],
    },
    {
      slug: "goals-scope-charter",
      title: "Goals, scope and a project charter",
      summary:
        "A short charter records why the project exists, what it will and will not deliver, the budget, the dates and who is in charge. You will write one page for a small project, such as a youth skills workshop in Wa.",
      parent: "starting-a-project",
      optional: false,
      resources: [asanaCharter, asanaScope, atlassianScope],
    },
    {
      slug: "stakeholders-and-communities",
      title: "Stakeholders and community engagement",
      summary:
        "Stakeholders include donors, district assemblies, chiefs, community groups and the people the project serves. You will map who has influence and interest and plan how to involve and update each group respectfully.",
      parent: "starting-a-project",
      optional: false,
      resources: [atlassianKickoff, projectDpro],
    },
    {
      slug: "logframes",
      title: "Logical frameworks for NGO projects",
      summary:
        "Many donor funded projects are planned with a logframe that links activities to outputs, outcomes and goals, with indicators for each. You will learn to read one and see how it shapes work plans and reports.",
      parent: "starting-a-project",
      optional: false,
      resources: [tools4devLogframe, pm4ngosGuides],
    },
    {
      slug: "planning",
      title: "Planning",
      summary:
        "A plan turns goals into tasks, dates, money and responsibilities. You can build every plan in this section in Google Sheets on a phone or a computer.",
      parent: null,
      optional: false,
      resources: [RES.lfSheets],
    },
    {
      slug: "breaking-down-work",
      title: "Breaking work into tasks",
      summary:
        "A work breakdown splits a big goal into deliverables and then into tasks small enough to assign and track. You will break down a real example, such as organising a three day farmer training.",
      parent: "planning",
      optional: false,
      resources: [asanaWbs],
    },
    {
      slug: "schedules-and-gantt-charts",
      title: "Schedules and Gantt charts",
      summary:
        "A schedule puts tasks in order, notes which ones depend on others and sets realistic dates around holidays, market days and the rainy season. You will draw a simple Gantt chart or timeline in a spreadsheet.",
      parent: "planning",
      optional: false,
      resources: [atlassianGantt, sheetsConditional],
    },
    {
      slug: "simple-budgets",
      title: "Simple project budgets",
      summary:
        "A budget lists every cost line, such as transport, venue, meals, materials and allowances, with quantities and unit costs in cedis. You will build one in a spreadsheet and learn how donors expect spending to match approved lines.",
      parent: "planning",
      optional: false,
      resources: [asanaBudget, RES.lfSheets],
    },
    {
      slug: "risks-and-issues",
      title: "Risks and issues",
      summary:
        "A risk is something that might go wrong, like flooded roads or late funds, and an issue is something that already has. You will keep a simple risk register with likelihood, impact, owner and a plan for each.",
      parent: "planning",
      optional: false,
      resources: [atlassianRisk],
    },
    {
      slug: "running-the-work",
      title: "Running the work",
      summary:
        "Once the plan is agreed, the job is keeping people, tasks and supplies moving. This section covers task tracking, meetings and logistics.",
      parent: null,
      optional: false,
      resources: [trelloGuide],
    },
    {
      slug: "task-boards",
      title: "Task boards with Trello or a spreadsheet",
      summary:
        "A task board shows what is to do, in progress and done, so the whole team can see where things stand. You will set one up in a free tool such as Trello, named here as an example, or in a shared spreadsheet.",
      parent: "running-the-work",
      optional: false,
      resources: [trelloGuide, trelloTemplates, atlassianKanban],
    },
    {
      slug: "meetings-and-minutes",
      title: "Meetings, minutes and action points",
      summary:
        "Good meetings have an agenda, end on time and produce clear action points with names and dates. You will practise taking short minutes and sharing them on email or WhatsApp the same day.",
      parent: "running-the-work",
      optional: false,
      resources: [RES.lfBizWriting, atlassianKickoff],
    },
    {
      slug: "logistics-and-procurement",
      title: "Logistics, vendors and procurement",
      summary:
        "Assistants often arrange venues, transport, materials and payments, following the organisation's procurement rules such as getting several quotes. You will learn to keep receipts, track payment requests and plan field trips so nothing is forgotten.",
      parent: "running-the-work",
      optional: false,
      resources: [tools4dev, asanaBudget],
    },
    {
      slug: "monitoring-and-reporting",
      title: "Monitoring and reporting",
      summary:
        "Donors and managers need to know what has been done, what it cost and what changed. This section covers tracking, reports and records.",
      parent: null,
      optional: false,
      resources: [projectDpro],
    },
    {
      slug: "tracking-progress-and-spending",
      title: "Tracking progress and spending",
      summary:
        "You will compare planned and actual dates, outputs and spending in a spreadsheet and flag anything running late or over budget. Catching problems early is most of the job.",
      parent: "monitoring-and-reporting",
      optional: false,
      resources: [sheetsConditional, RES.lfSheets],
    },
    {
      slug: "status-and-donor-reports",
      title: "Status and donor reports",
      summary:
        "Reports explain progress against the plan, challenges, spending and next steps, often with a short success story. You will write a one page status update and learn how donor reports follow the logframe and indicators.",
      parent: "monitoring-and-reporting",
      optional: false,
      resources: [RES.lfBizWriting, tools4devLogframe],
    },
    {
      slug: "records-and-documentation",
      title: "Records, filing and documentation",
      summary:
        "Attendance sheets, receipts, photos with consent and signed agreements are the evidence auditors and donors ask for. You will set up a simple folder system in Google Drive and learn to protect personal data.",
      parent: "monitoring-and-reporting",
      optional: false,
      resources: [RES.lfDrive, RES.dpc],
    },
    {
      slug: "closing-and-other-ways",
      title: "Closing and other ways of working",
      summary:
        "Finishing well is as important as starting well. This section covers closing a project and the agile approach some teams use.",
      parent: null,
      optional: false,
      resources: [asanaClosure],
    },
    {
      slug: "closing-and-lessons-learned",
      title: "Closing a project and lessons learned",
      summary:
        "Closing means handing over results, settling accounts, archiving records and thanking partners. A short lessons learned session helps the next project avoid the same mistakes.",
      parent: "closing-and-other-ways",
      optional: false,
      resources: [asanaClosure, atlassianRetro],
    },
    {
      slug: "agile-basics",
      title: "Agile and Scrum basics",
      summary:
        "Agile teams plan in short cycles, review often and adjust as they learn, which suits software and some business projects. This topic is optional and introduces Scrum and Kanban in plain terms.",
      parent: "closing-and-other-ways",
      optional: true,
      resources: [scrumGuide, atlassianScrum, RES.atlassianAgile],
    },
    {
      slug: "getting-hired-pm",
      title: "Getting hired",
      summary:
        "Most people enter project work as an assistant, intern or national service person and grow from there. This section covers certificates and first roles.",
      parent: null,
      optional: false,
      resources: [RES.lfJobsearch],
    },
    {
      slug: "entry-certifications",
      title: "Entry certifications explained",
      summary:
        "Recognised entry options include PMI's CAPM, the Project DPro certification exam built on a free guide for development projects, PRINCE2 Foundation and Google's Project Management certificate. The assistant adverts we studied did not ask for one, so check each official page for current rules and costs before deciding.",
      parent: "getting-hired-pm",
      optional: false,
      resources: [projectDpro, googlePm, peoplecert],
    },
    {
      slug: "first-coordination-roles",
      title: "Your portfolio and first coordination roles",
      summary:
        "Run a small real project, such as a church fundraiser or a school cleanup, and keep the charter, plan, budget and report as your portfolio. Then look for project assistant, programme support and internship roles with NGOs and businesses in Tamale, Bolgatanga, Wa and beyond.",
      parent: "getting-hired-pm",
      optional: false,
      resources: [RES.lfResume, RES.lfInterview, RES.lfJobsearch],
    },
  ],
};
