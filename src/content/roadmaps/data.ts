import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve (October 2026). */
const odkDocs: ResourceDraft = { label: "ODK documentation", url: "https://docs.getodk.org/", kind: "article" };
const koboDocs: ResourceDraft = { label: "KoboToolbox help docs", url: "https://support.kobotoolbox.org/", kind: "article" };
const xlsform: ResourceDraft = { label: "XLSForm reference", url: "https://xlsform.org/en/", kind: "article" };
const sheetsPivot: ResourceDraft = {
  label: "Google Sheets: Create and use pivot tables",
  url: "https://support.google.com/docs/answer/1272900",
  kind: "article",
};
const sheetsXlookup: ResourceDraft = {
  label: "Google Sheets: XLOOKUP function",
  url: "https://support.google.com/docs/answer/12405947",
  kind: "article",
};
const sheetsDropdown: ResourceDraft = {
  label: "Google Sheets: Create a dropdown list",
  url: "https://support.google.com/docs/answer/139705",
  kind: "article",
};
const lookerStudio: ResourceDraft = { label: "Looker Studio (free)", url: "https://lookerstudio.google.com/", kind: "practice" };

export const data: RoadmapDraft = {
  slug: "data-analyst",
  title: "Data Analyst",
  description:
    "Turn messy records into clear answers for NGOs, businesses, banks and public bodies. Start with spreadsheets and field surveys on any device, then build up to monitoring and evaluation, SQL, dashboards and Python.",
  track: "data",
  field_category: "data",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Foundations",
      summary:
        "Good analysis starts with a clear question, comfort with numbers and tidy records, not with code. Everything in this section works with free tools on a phone or basic laptop.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.lfThinking],
    },
    {
      slug: "statistics-basics",
      title: "Everyday statistics",
      summary:
        "Understand averages, medians, percentages, spread and why a small or biased sample can mislead. These ideas stop you from drawing the wrong conclusion from a table or chart.",
      parent: "foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.khanStats],
    },
    {
      slug: "tidy-data",
      title: "Accurate data entry and tidy tables",
      summary:
        "Learn to enter records accurately and lay them out as one row per record and one column per fact. Clean, consistent entry is the first job many data assistants do and it makes every later step easier.",
      parent: "foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfSheets, sheetsDropdown],
    },
    {
      slug: "spreadsheets",
      title: "Spreadsheets for analysis",
      summary:
        "Spreadsheets are the first tool most data and M&E adverts ask for. This section takes you from basic formulas to lookups and pivot tables in Google Sheets.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "junior",
      jobs: ["Data Entry Officer", "Data Clerk", "Data Analyst Assistant"],
      resources: [RES.sheetsHelp],
    },
    {
      slug: "spreadsheet-formulas",
      title: "Formulas, sorting and filtering",
      summary:
        "Use SUM, AVERAGE, COUNTIF, SUMIF and IF to answer questions, and sort and filter to explore a table. Practise on a made up record of a market stall's daily sales.",
      parent: "spreadsheets",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfSheets, RES.sheetsHelp],
    },
    {
      slug: "lookups-pivots",
      title: "Lookups, validation and pivot tables",
      summary:
        "Join information from two sheets with XLOOKUP or VLOOKUP, stop bad entries with dropdown validation, and summarise thousands of rows with a pivot table. Employers often test these three skills directly.",
      parent: "spreadsheets",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [sheetsXlookup, sheetsPivot, sheetsDropdown],
    },
    {
      slug: "field-data",
      title: "Surveys and field data",
      summary:
        "NGOs, research groups and public programmes across northern Ghana collect data in communities with phone surveys. This section covers designing the survey, collecting it, cleaning it and protecting the people in it.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Research Assistant", "M&E Officer"],
      resources: [RES.kobo],
    },
    {
      slug: "survey-design",
      title: "Designing questionnaires and samples",
      summary:
        "Write clear, neutral questions with sensible answer choices, and choose who to ask so the results represent the group you care about. A short, well tested questionnaire beats a long confusing one.",
      parent: "field-data",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.khanStats],
    },
    {
      slug: "mobile-surveys",
      title: "Mobile data collection with KoboToolbox or ODK",
      summary:
        "Build a phone form with skip logic and checks, collect responses offline and download the results as a spreadsheet. KoboToolbox and ODK both have free options and are widely used by development projects.",
      parent: "field-data",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [koboDocs, odkDocs, xlsform],
    },
    {
      slug: "data-cleaning",
      title: "Cleaning data",
      summary:
        "Fix missing values, duplicates, inconsistent spellings of town names and wrong data types. Keep a log of every change so others can trust your results.",
      parent: "field-data",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.kaggleCleaning],
    },
    {
      slug: "data-privacy",
      title: "Data privacy and ethics",
      summary:
        "Learn what personal data is, how to ask for consent, how to anonymise records and what Ghana's Data Protection Act expects. People in small communities are easy to identify, so take extra care.",
      parent: "field-data",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.dpc],
    },
    {
      slug: "monitoring-evaluation",
      title: "Monitoring and evaluation",
      summary:
        "M&E officers track whether a project is doing what it promised and whether it is making a difference. Many data jobs in northern Ghana sit inside NGO M&E teams.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["M&E Officer", "MEAL Officer", "MER Officer"],
      resources: [],
    },
    {
      slug: "indicators-frameworks",
      title: "Indicators, baselines and logframes",
      summary:
        "Learn how a project turns its goals into measurable indicators with baselines and targets, and how a logframe links activities to results. This is the language of every M&E advert.",
      parent: "monitoring-evaluation",
      optional: false,
      difficulty: "intermediate",
      complexity: 4,
      resources: [],
    },
    {
      slug: "data-quality-reporting",
      title: "Data quality checks and progress reports",
      summary:
        "Check that reported numbers match the source records, then present progress against targets in a clear monthly or quarterly report. Donors and managers rely on these reports to make decisions.",
      parent: "monitoring-evaluation",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [],
    },
    {
      slug: "sql",
      title: "SQL",
      summary:
        "SQL lets you pull exactly the rows you need from a database. Banks, telcos, government data teams and remote employers ask for it often, so give it real practice time.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Data Analyst", "Business Intelligence Analyst"],
      resources: [],
    },
    {
      slug: "sql-basics",
      title: "Querying with SQL",
      summary:
        "Select, filter and sort rows from a table with SELECT, WHERE and ORDER BY. Interactive lessons let you practise in the browser without installing anything.",
      parent: "sql",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.sqlbolt, RES.khanSql],
    },
    {
      slug: "sql-joins-aggregation",
      title: "Joins and aggregation",
      summary:
        "Combine tables with joins and summarise them with GROUP BY, COUNT and SUM. Answer questions like which district recorded the most mobile money transactions in a month.",
      parent: "sql",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.kaggleSql, RES.sqlbolt],
    },
    {
      slug: "communicating",
      title: "Visualising and communicating",
      summary:
        "An analysis only matters if someone understands it and acts on it. This section turns your results into honest charts, simple dashboards and short summaries that lead with the answer.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Junior Data Analyst", "Research Analyst"],
      resources: [RES.lfBizWriting],
    },
    {
      slug: "charts",
      title: "Charts that tell the truth",
      summary:
        "Choose the right chart for the question and label it so it reads on a small screen. Avoid tricks like cut off axes that mislead the reader.",
      parent: "communicating",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.kaggleViz],
    },
    {
      slug: "dashboards",
      title: "Dashboards in Looker Studio or Power BI",
      summary:
        "Build a simple dashboard that updates from a spreadsheet and shows the few numbers a manager checks every week. Looker Studio is free in the browser, and Power BI Desktop is free on Windows.",
      parent: "communicating",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [lookerStudio, RES.lookerHelp, RES.powerBi],
    },
    {
      slug: "python",
      title: "Python for analysis",
      summary:
        "Python handles data that is too big or too repetitive for a spreadsheet. Free online notebooks mean you do not need a powerful computer to start.",
      parent: null,
      optional: false,
      difficulty: "advanced",
      complexity: 2,
      careerLevel: "specialist",
      jobs: ["Officer, Data Science", "Associate Research Manager"],
      resources: [RES.colab],
    },
    {
      slug: "python-basics",
      title: "Python basics in a notebook",
      summary:
        "Learn variables, lists, loops and functions in a Google Colab notebook that mixes code with notes. Short daily exercises work better than long sessions.",
      parent: "python",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.kagglePython, RES.colab, RES.pythonTutorial],
    },
    {
      slug: "pandas",
      title: "Working with tables in pandas",
      summary:
        "Load a CSV file, filter, group and clean it with pandas. Redo one of your spreadsheet analyses in pandas to see the difference.",
      parent: "python",
      optional: false,
      difficulty: "advanced",
      complexity: 5,
      resources: [RES.kagglePandas, RES.pandasStart],
    },
    {
      slug: "getting-hired",
      title: "Getting hired",
      summary:
        "Employers want proof that you can find a useful answer in real data. This section helps you show that clearly and find the right first role.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Junior Data Analyst", "Data Analyst Assistant"],
      resources: [],
    },
    {
      slug: "portfolio",
      title: "A portfolio of case studies",
      summary:
        "Publish three short analyses that show the question, the data, your method and what you found, ideally using Ghanaian public data. Share them as links that open on a phone.",
      parent: "getting-hired",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.gss, RES.kaggleDatasets, RES.githubDocs],
    },
    {
      slug: "job-search",
      title: "Job search and practical tests",
      summary:
        "Look beyond the title data analyst to data entry, M&E assistant, research assistant and reporting roles. Expect a practical test, so practise spreadsheet and SQL tasks against the clock.",
      parent: "getting-hired",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfJobsearch, RES.lfInterview],
    },
  ],
};
