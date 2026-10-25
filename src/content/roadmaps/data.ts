import { RES } from "./resources";
import type { RoadmapDraft } from "./types";

export const data: RoadmapDraft = {
  slug: "data-analyst",
  title: "Data Analyst",
  description:
    "Turn messy numbers into clear answers for businesses, NGOs and public bodies. Start in a spreadsheet on any device and build up to SQL, Python and dashboards that decision makers act on.",
  track: "data",
  field_category: "data",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Foundations",
      summary:
        "Good analysis starts with a clear question and comfort with numbers, not with code. You can do everything in this section with free tools and a phone or basic laptop.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "spreadsheets",
      title: "Spreadsheets first",
      summary:
        "Learn sorting, filtering, formulas, lookups and pivot tables in Google Sheets. Many Ghanaian businesses and NGOs run on spreadsheets, so this skill is useful from day one.",
      parent: "foundations",
      optional: false,
      resources: [RES.lfSheets, RES.sheetsHelp],
    },
    {
      slug: "statistics-basics",
      title: "Everyday statistics",
      summary:
        "Understand averages, medians, percentages, spread and why a sample can mislead. These ideas stop you from drawing the wrong conclusion from a chart.",
      parent: "foundations",
      optional: false,
      resources: [RES.khanStats],
    },
    {
      slug: "asking-questions",
      title: "Asking the right question",
      summary:
        "Turn a vague request such as why sales are down into a question data can answer. Practise by interviewing a shop owner about what they wish they knew.",
      parent: "foundations",
      optional: false,
      resources: [RES.lfThinking],
    },
    {
      slug: "sql",
      title: "SQL",
      summary:
        "SQL lets you pull exactly the data you need from a database. It appears in many data analyst job adverts, so give it real practice time.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "sql-basics",
      title: "Querying with SQL",
      summary:
        "Select, filter and sort rows from a table. Interactive lessons let you practise in the browser without installing anything.",
      parent: "sql",
      optional: false,
      resources: [RES.sqlbolt, RES.khanSql],
    },
    {
      slug: "sql-joins-aggregation",
      title: "Joins and aggregation",
      summary:
        "Combine tables and summarise data with group by, counts and sums. Answer questions like which district had the most mobile money transactions in a month.",
      parent: "sql",
      optional: false,
      resources: [RES.kaggleSql, RES.sqlbolt],
    },
    {
      slug: "python",
      title: "Python for analysis",
      summary:
        "Python handles data that is too big or too messy for a spreadsheet. Free online notebooks mean you do not need a powerful computer to start.",
      parent: null,
      optional: false,
      resources: [RES.colab],
    },
    {
      slug: "python-basics",
      title: "Python basics",
      summary:
        "Learn variables, lists, loops, functions and reading files. Short daily exercises work better than long sessions.",
      parent: "python",
      optional: false,
      resources: [RES.kagglePython, RES.pythonTutorial],
    },
    {
      slug: "pandas",
      title: "Working with tables in pandas",
      summary:
        "Load, filter, group and reshape tables of data with pandas. Redo one of your spreadsheet analyses in pandas to see the difference.",
      parent: "python",
      optional: false,
      resources: [RES.kagglePandas, RES.pandasStart],
    },
    {
      slug: "notebooks",
      title: "Notebooks you can share",
      summary:
        "Write analysis in a notebook that mixes code, charts and explanation, and share it with a link. Google Colab runs in the browser, which saves you from installing heavy software.",
      parent: "python",
      optional: false,
      resources: [RES.colab],
    },
    {
      slug: "intro-ml",
      title: "A first look at machine learning",
      summary:
        "See how simple models make predictions and how to check if they are any good. This is optional for analyst roles, but it helps you understand where the field is going.",
      parent: "python",
      optional: true,
      resources: [RES.kaggleMl, RES.mlCrash],
    },
    {
      slug: "real-data",
      title: "Collecting and cleaning real data",
      summary:
        "Real data is incomplete and inconsistent, and cleaning it is a large part of the job. This section uses Ghanaian sources and the kind of survey work common in the north.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "mobile-surveys",
      title: "Mobile surveys and field data",
      summary:
        "Design short surveys and collect responses on phones, even offline, using free tools. NGOs and development projects in northern Ghana often hire people who can run this monitoring and evaluation work.",
      parent: "real-data",
      optional: false,
      resources: [RES.kobo],
    },
    {
      slug: "data-cleaning",
      title: "Cleaning data",
      summary:
        "Fix missing values, duplicates, inconsistent spellings of town names and wrong data types. Keep a record of every change so others can trust your results.",
      parent: "real-data",
      optional: false,
      resources: [RES.kaggleCleaning],
    },
    {
      slug: "ghana-data-sources",
      title: "Ghanaian public data",
      summary:
        "Find and use published data from the Ghana Statistical Service and the Bank of Ghana. Local datasets make your portfolio far more relevant to Ghanaian employers than generic examples.",
      parent: "real-data",
      optional: false,
      resources: [RES.gss, RES.bog, RES.kaggleDatasets],
    },
    {
      slug: "data-privacy",
      title: "Data privacy and ethics",
      summary:
        "Learn what personal data is, how to anonymise it and what Ghana's Data Protection Act expects. Respondents in small communities can be identified easily, so take extra care.",
      parent: "real-data",
      optional: false,
      resources: [RES.dpc],
    },
    {
      slug: "communicating",
      title: "Visualising and communicating",
      summary:
        "An analysis only matters if someone understands it and acts. This section turns your results into charts, dashboards and short reports.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "charts",
      title: "Charts that tell the truth",
      summary:
        "Choose the right chart for the question and label it so it reads on a small screen. Avoid tricks like cut off axes that mislead the reader.",
      parent: "communicating",
      optional: false,
      resources: [RES.kaggleViz],
    },
    {
      slug: "dashboards",
      title: "Dashboards",
      summary:
        "Build a simple dashboard in a free tool such as Looker Studio that updates from a spreadsheet. Keep it to the few numbers a manager checks every week.",
      parent: "communicating",
      optional: false,
      resources: [RES.lookerHelp, RES.powerBi],
    },
    {
      slug: "presenting-findings",
      title: "Presenting findings",
      summary:
        "Write a one page summary that leads with the answer, then the evidence, then the recommendation. Practise presenting it in five minutes to someone with no data background.",
      parent: "communicating",
      optional: false,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "getting-hired",
      title: "Getting hired and getting paid",
      summary:
        "Employers want proof that you can find a useful answer in real data. This section helps you show that clearly.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "portfolio",
      title: "A portfolio of case studies",
      summary:
        "Publish three analyses with the question, the data, your method and what you found, ideally using Ghanaian data. Share notebooks and dashboards as links so they open on a phone.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.kaggleDatasets, RES.githubDocs],
    },
    {
      slug: "freelancing",
      title: "Freelancing for SMEs and NGOs",
      summary:
        "Offer to clean records, build sales dashboards or analyse survey results for local businesses and organisations. Agree the scope and price in cedis in writing before you start.",
      parent: "getting-hired",
      optional: true,
      resources: [RES.lfFreelancing],
    },
    {
      slug: "job-search",
      title: "Job search and interviews",
      summary:
        "Look beyond the title data analyst to roles in monitoring and evaluation, finance, operations and research. Expect a practical test, so practise SQL and spreadsheet tasks under time pressure.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfJobsearch, RES.lfInterview],
    },
  ],
};
