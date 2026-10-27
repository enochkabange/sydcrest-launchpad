import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve (27 October 2026). */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const ms = (label: string, path: string, kind: ResourceDraft["kind"] = "article") =>
  r(`Microsoft Support: ${label}`, `https://support.microsoft.com/en-us/office/${path}`, kind);
const learn = (label: string, path: string, kind: ResourceDraft["kind"] = "article") =>
  r(`Microsoft Learn: ${label}`, `https://learn.microsoft.com/en-us/${path}`, kind);

const excelHelp = r("Microsoft Support: Excel help and learning", "https://support.microsoft.com/en-us/excel");
const excelVideos = ms("Excel video training", "excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb", "video");
const officeWeb = r(
  "Microsoft 365 for the web (free Excel in a browser)",
  "https://www.microsoft.com/en-us/microsoft-365/free-office-online-for-the-web",
  "practice",
);
const excelAndroid = r("Microsoft Excel for Android (Google Play)", "https://play.google.com/store/apps/details?id=com.microsoft.office.excel", "practice");
const lfExcel = r("GCFGlobal LearnFree: Excel Foundations", "https://www.learnfree.org/series/excel-foundations");
const excelTables = ms("Format an Excel table", "format-an-excel-table-6789619f-c889-495c-99c2-2f971c0e2370");
const excelFormulas = ms("Overview of formulas in Excel", "overview-of-formulas-in-excel-ecfdc708-9162-49e8-b993-c311f47ca173");
const excelXlookup = ms("XLOOKUP function", "xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929");
const excelValidation = ms("Apply data validation to cells", "apply-data-validation-to-cells-29fecbcc-d1b9-42c1-9d76-eff3ce5f7249");
const excelPivot = ms(
  "Create a PivotTable",
  "create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576",
);
const excelChart = ms("Create a chart from start to finish", "create-a-chart-from-start-to-finish-0baf399e-dd61-4e18-8a73-b3fd5d5680c2");
const excelConditional = ms(
  "Use conditional formatting",
  "use-conditional-formatting-to-highlight-information-fed60dfa-1d3f-4e13-9ecb-f1951ff89d7f",
);
const excelPowerQuery = ms("About Power Query in Excel", "about-power-query-in-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a");
const sheetsPivot = r("Google Sheets: Create and use pivot tables", "https://support.google.com/docs/answer/1272900");
const sheetsXlookup = r("Google Sheets: XLOOKUP function", "https://support.google.com/docs/answer/12405947");
const sheetsConditional = r("Google Sheets: Conditional formatting rules", "https://support.google.com/docs/answer/78413");

const pbiDesktopDownload = r(
  "Power BI Desktop download (Windows)",
  "https://www.microsoft.com/en-us/power-platform/products/power-bi/desktop",
  "practice",
);
const pbiDesktopStart = learn("Get started with Power BI Desktop", "power-bi/fundamentals/desktop-getting-started");
const pbiPrepare = learn("Prepare data for analysis with Power BI", "training/paths/prepare-data-power-bi/", "practice");
const powerQueryWhat = learn("What is Power Query", "power-query/power-query-what-is-power-query");
const pbiModelPath = learn("Model data with Power BI", "training/paths/model-data-power-bi/", "practice");
const pbiRelationships = learn("Model relationships in Power BI Desktop", "power-bi/transform-model/desktop-relationships-understand");
const pbiStarSchema = learn("Star schema and why it matters for Power BI", "power-bi/guidance/star-schema");
const daxModule = learn("Write DAX formulas for Power BI models", "training/modules/dax-power-bi-write-formulas/", "practice");
const daxReference = learn("DAX reference", "dax/");
const pbiVisualsPath = learn("Build Power BI visuals and reports", "training/paths/build-power-bi-visuals-reports/", "practice");
const pbiAccessibility = learn("Accessible Power BI reports", "power-bi/create-reports/desktop-accessibility-overview");
const pbiService = learn("Get started with the Power BI service", "power-bi/fundamentals/service-get-started");
const pbiRefresh = learn("Data refresh in Power BI", "power-bi/connect-data/refresh-data");
const pbiPublishWeb = learn("Publish to web and its risks", "power-bi/collaborate-share/service-publish-to-web");
const pbiMobile = learn("Power BI mobile apps", "power-bi/consumer/mobile/mobile-apps-for-mobile-devices");
const dataStudio = r("Google Data Studio help (free, formerly Looker Studio)", "https://docs.cloud.google.com/data-studio");
const pl300 = learn("Power BI Data Analyst Associate certification", "credentials/certifications/data-analyst-associate/");
const mosExcel = learn(
  "Microsoft Office Specialist: Excel Associate (Microsoft 365 Apps)",
  "credentials/certifications/mos-excel-associate-m365-apps/",
);

export const excelPowerBi: RoadmapDraft = {
  slug: "excel-power-bi",
  title: "Excel and Power BI",
  description:
    "The office data skills employers everywhere ask for: clean tables, formulas, lookups, PivotTables and charts in Excel, then dashboards in Power BI. Excel works on a phone or a computer; Power BI Desktop needs a Windows computer.",
  track: "excel-power-bi",
  field_category: "data",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "spreadsheet-basics",
      title: "Spreadsheet basics",
      summary:
        "Banks, NGOs, shops and offices keep their records in spreadsheets, and almost every office job expects you to use one. This section gets you working in Excel on a phone or in a browser.",
      parent: null,
      optional: false,
      resources: [excelHelp, lfExcel],
    },
    {
      slug: "excel-on-a-phone",
      title: "Getting Excel for free",
      summary:
        "Excel for the web and the Excel mobile app are free with a Microsoft account, with some features missing, and Google Sheets works much the same way. You will set one up, save files to OneDrive and learn which tasks are easier on a bigger screen.",
      parent: "spreadsheet-basics",
      optional: false,
      resources: [officeWeb, excelAndroid, RES.lfSheets],
    },
    {
      slug: "tidy-tables",
      title: "Entering data in tidy tables",
      summary:
        "Good reports start with one row per record, one column per detail and no merged cells. You will turn a messy list, such as a Tamale shop's stock sheet, into a proper Excel table.",
      parent: "spreadsheet-basics",
      optional: false,
      resources: [excelTables, lfExcel],
    },
    {
      slug: "formulas-and-references",
      title: "Formulas and cell references",
      summary:
        "Formulas let Excel do the arithmetic, and references decide what happens when you copy a formula to other cells. You will learn relative and absolute references so your totals stay correct.",
      parent: "spreadsheet-basics",
      optional: false,
      resources: [excelFormulas, excelVideos],
    },
    {
      slug: "working-with-data",
      title: "Working with data",
      summary:
        "Most office reporting is a handful of functions used well on clean data. This section covers those functions, lookups and cleaning.",
      parent: null,
      optional: false,
      resources: [excelVideos],
    },
    {
      slug: "everyday-functions",
      title: "Everyday functions",
      summary:
        "SUM, AVERAGE, COUNTIF, SUMIFS and IF answer most questions a manager asks, such as sales by branch or how many beneficiaries are female. You will practise them on a small cedis sales or survey dataset.",
      parent: "working-with-data",
      optional: false,
      resources: [excelFormulas, excelVideos],
    },
    {
      slug: "lookups",
      title: "Lookups with XLOOKUP",
      summary:
        "Lookups pull matching details from another table, such as a price from a product list or a district from a staff ID. You will learn XLOOKUP and recognise the older VLOOKUP that many offices still use.",
      parent: "working-with-data",
      optional: false,
      resources: [excelXlookup, sheetsXlookup],
    },
    {
      slug: "sort-filter-validate",
      title: "Sorting, filtering and data validation",
      summary:
        "Sorting and filtering help you find what matters, while dropdown lists and validation rules stop bad data being typed in at all. You will build an entry sheet that only accepts sensible values.",
      parent: "working-with-data",
      optional: false,
      resources: [excelValidation],
    },
    {
      slug: "cleaning-text-and-dates",
      title: "Cleaning text and dates",
      summary:
        "Real data arrives with extra spaces, mixed capitals, phone numbers stored as numbers and dates Excel cannot read. You will learn TRIM, text functions, Text to Columns and how to fix dates so calculations work.",
      parent: "working-with-data",
      optional: false,
      resources: [excelFormulas, RES.kaggleCleaning],
    },
    {
      slug: "summaries-and-charts",
      title: "Summaries and charts",
      summary:
        "Managers want the answer, not the raw rows. This section turns data into summaries, charts and highlights.",
      parent: null,
      optional: false,
      resources: [excelPivot],
    },
    {
      slug: "pivottables",
      title: "PivotTables",
      summary:
        "A PivotTable summarises thousands of rows in seconds, for example total sales by month and region. You will build and rearrange PivotTables, which is easier on a laptop but possible in Excel for the web.",
      parent: "summaries-and-charts",
      optional: false,
      resources: [excelPivot, sheetsPivot],
    },
    {
      slug: "charts",
      title: "Charts that make a point",
      summary:
        "A good chart answers one question at a glance, so you will learn when to use bars, lines or a simple table instead. You will also learn to title and label charts so nobody misreads them.",
      parent: "summaries-and-charts",
      optional: false,
      resources: [excelChart, RES.kaggleViz],
    },
    {
      slug: "conditional-formatting",
      title: "Conditional formatting",
      summary:
        "Colour rules can flag overdue payments, low stock or targets missed without anyone searching for them. You will add rules that highlight what needs attention and avoid rainbow sheets that hide the message.",
      parent: "summaries-and-charts",
      optional: false,
      resources: [excelConditional, sheetsConditional],
    },
    {
      slug: "excel-reports",
      title: "Excel reports",
      summary:
        "Weekly and monthly reports are where Excel skills turn into value for an employer. This section makes them repeatable and readable.",
      parent: null,
      optional: false,
      resources: [excelPowerQuery],
    },
    {
      slug: "power-query-in-excel",
      title: "Power Query for repeat cleaning",
      summary:
        "Power Query records your cleaning steps so next month's file can be cleaned with one click. The editor is in desktop Excel for Windows and Mac, not in free Excel for the web, and the same engine is free inside Power BI Desktop.",
      parent: "excel-reports",
      optional: false,
      resources: [excelPowerQuery, powerQueryWhat],
    },
    {
      slug: "one-page-excel-report",
      title: "A one page Excel report",
      summary:
        "You will combine a PivotTable, a few key numbers, a chart and highlights into one clean page a manager can read on a phone. Building one for a real or realistic case, such as an NGO's monthly activity summary, gives you a strong portfolio piece.",
      parent: "excel-reports",
      optional: false,
      resources: [excelPivot, excelChart],
    },
    {
      slug: "power-bi",
      title: "Power BI",
      summary:
        "Power BI builds interactive dashboards from one or many data sources and appears in many Ghanaian reporting, MIS and monitoring adverts. Power BI Desktop runs only on Windows, so for this section you need a Windows computer, for example at a school lab, library or internet café; without one, a free browser tool such as Google's Data Studio teaches the same ideas.",
      parent: null,
      optional: false,
      resources: [RES.powerBi, pbiDesktopStart, dataStudio],
    },
    {
      slug: "power-bi-desktop-setup",
      title: "Setting up Power BI Desktop",
      summary:
        "Power BI Desktop is a free download for Windows, and you can build and save reports in it without any account or licence. You will check the computer can run it, install it, tour the report, table and model views, and open a sample file.",
      parent: "power-bi",
      optional: false,
      resources: [pbiDesktopDownload, pbiDesktopStart],
    },
    {
      slug: "getting-data-into-power-bi",
      title: "Getting data into Power BI",
      summary:
        "You will load Excel and CSV files and shape them in Power Query, using the same cleaning ideas you learned in Excel. Clean, well named columns now save hours later.",
      parent: "power-bi",
      optional: false,
      resources: [pbiPrepare, powerQueryWhat],
    },
    {
      slug: "relationships-and-models",
      title: "Relationships and a simple model",
      summary:
        "A model links tables, such as sales to products and branches, so one filter works across them all. You will build a small star shaped model with one fact table and a few lookup tables.",
      parent: "power-bi",
      optional: false,
      resources: [pbiModelPath, pbiRelationships, pbiStarSchema],
    },
    {
      slug: "first-dax-measures",
      title: "First DAX measures",
      summary:
        "DAX is Power BI's formula language, and measures such as total sales or average score update as users click filters. You will write a few simple measures and learn why measures beat calculated columns for totals.",
      parent: "power-bi",
      optional: false,
      resources: [daxModule, daxReference],
    },
    {
      slug: "reports-people-use",
      title: "Reports people use",
      summary:
        "A dashboard is only useful if the right people read it and trust it. This section covers design, sharing and keeping data fresh.",
      parent: null,
      optional: false,
      resources: [pbiVisualsPath],
    },
    {
      slug: "report-design",
      title: "Designing a clear report page",
      summary:
        "Put the most important numbers top left, keep to a few visuals per page and use colour only to draw attention. You will also check your report reads well on a phone screen and for people with colour blindness.",
      parent: "reports-people-use",
      optional: false,
      resources: [pbiVisualsPath, pbiAccessibility],
    },
    {
      slug: "sharing-and-refresh",
      title: "Sharing reports and keeping them fresh",
      summary:
        "Organisations share reports through the Power BI service and mobile app, which need a work or school account, and set data to refresh on a schedule. You will learn how sharing works once you join an organisation, and why publish to web makes a report public to anyone, which must never be used for bank, health or beneficiary data.",
      parent: "reports-people-use",
      optional: false,
      resources: [pbiService, pbiRefresh, pbiPublishWeb],
    },
    {
      slug: "getting-hired-excel",
      title: "Getting hired",
      summary:
        "Employers trust what they can see, so a few clear sample reports matter more than a list of skills. This section helps you show your work and choose what to learn next.",
      parent: null,
      optional: false,
      resources: [RES.lfJobsearch],
    },
    {
      slug: "office-report-portfolio",
      title: "A portfolio of office reports",
      summary:
        "Build two or three reports on open or made up data, such as a market trader's sales or an NGO field survey, and share screenshots and a short write up. Never use real customer or beneficiary data without permission.",
      parent: "getting-hired-excel",
      optional: false,
      resources: [RES.kaggleDatasets, RES.gss, pbiMobile],
    },
    {
      slug: "jobs-and-next-steps",
      title: "Jobs, certifications and next steps",
      summary:
        "These skills fit admin, accounts, MIS, monitoring and evaluation, and reporting roles, and optional paid exams such as Microsoft Office Specialist Excel Associate and Power BI Data Analyst (PL 300) exist if an employer asks for them. To go further into SQL and Python, continue with the Data Analyst track.",
      parent: "getting-hired-excel",
      optional: false,
      resources: [mosExcel, pl300],
    },
  ],
};
