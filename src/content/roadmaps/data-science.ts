import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Outline from issue #96; full SydCrest lessons in content/data-science.content.ts (issue #198).
 * Research and sources: src/content/research/data-science.md.
 * Track specific links not in the shared pool; each checked to resolve (October 2026).
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const openIntro = r("OpenIntro Statistics (free PDF)", "https://www.openintro.org/book/os/");
const seeingTheory = r("Seeing Theory: visual probability and statistics", "https://seeing-theory.brown.edu/", "practice");
const khanSignificance = r(
  "Khan Academy: Significance tests",
  "https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample",
  "video",
);
const pdsh = r("Python Data Science Handbook (free online)", "https://jakevdp.github.io/PythonDataScienceHandbook/");
const numpyBeginners = r("NumPy: The absolute basics for beginners", "https://numpy.org/doc/stable/user/absolute_beginners.html");
const pgWindow = r("PostgreSQL tutorial: Window functions", "https://www.postgresql.org/docs/current/tutorial-window.html");
const carpentryGit = r("Software Carpentry: Version control with Git", "https://swcarpentry.github.io/git-novice/", "practice");
const sklearnStart = r("scikit learn: Getting started", "https://scikit-learn.org/stable/getting_started.html");
const sklearnCv = r("scikit learn: Cross validation", "https://scikit-learn.org/stable/modules/cross_validation.html");
const sklearnPreprocessing = r(
  "scikit learn: Preprocessing data",
  "https://scikit-learn.org/stable/modules/preprocessing.html",
);
const mlccOverfitting = r(
  "Google ML Crash Course: Overfitting",
  "https://developers.google.com/machine-learning/crash-course/overfitting",
);
const mlccFairness = r(
  "Google ML Crash Course: Fairness",
  "https://developers.google.com/machine-learning/crash-course/fairness",
);
const fpp3 = r("Forecasting: Principles and Practice (free book)", "https://otexts.com/fpp3/");
const kaggleTimeSeries = r("Kaggle Learn: Time Series", "https://www.kaggle.com/learn/time-series", "practice");
const kaggleGeo = r("Kaggle Learn: Geospatial Analysis", "https://www.kaggle.com/learn/geospatial-analysis", "practice");
const qgisManual = r("QGIS training manual", "https://docs.qgis.org/latest/en/docs/training_manual/");
const socviz = r("Kieran Healy: Data Visualization (free book)", "https://socviz.co/");
const streamlit = r("Streamlit documentation", "https://docs.streamlit.io/");
const zindi = r("Zindi: data science challenges in Africa", "https://zindi.world/", "practice");

export const dataScience: RoadmapDraft = {
  slug: "data-scientist",
  title: "Data Science",
  description:
    "Use statistics, experiments and predictive models to help banks, mobile money providers, NGOs and climate projects make better decisions. This is an advanced step after the Data Analyst track, and it needs comfort with maths and a laptop.",
  track: "data-science",
  field_category: "data",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "before-you-start",
      title: "Before you start",
      summary:
        "Data science goes beyond describing what happened to estimating why and predicting what comes next. This section checks you are ready and shows what the work looks like in Ghana.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "what-you-need-first",
      title: "What you need first",
      summary:
        "Finish the Data Analyst track first, or be confident with spreadsheets, SQL, basic Python and simple statistics. You can study the ideas on a phone, but the coding work in this track needs a laptop.",
      parent: "before-you-start",
      optional: false,
      resources: [RES.kagglePython, RES.kaggleSql],
    },
    {
      slug: "data-science-in-ghana",
      title: "Data science work in Ghana",
      summary:
        "Data scientist roles appear at mobile money providers, banks and savings companies, consulting firms, energy and agritech startups and climate projects, mostly in Accra. Most adverts ask for a quantitative degree and some experience, so many people start as analysts and grow into the role.",
      parent: "before-you-start",
      optional: false,
      resources: [],
    },
    {
      slug: "statistics-for-decisions",
      title: "Statistics for decisions",
      summary:
        "Statistics is what separates a data scientist from someone who runs code. This section builds the reasoning you need to say how sure you are and why.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "probability-and-distributions",
      title: "Probability and distributions",
      summary:
        "Learn how random variation works, what common distributions look like and why averages from samples behave predictably. These ideas explain why a survey of a few hundred households can say something about a whole district.",
      parent: "statistics-for-decisions",
      optional: false,
      resources: [seeingTheory, RES.khanStats],
    },
    {
      slug: "inference-and-hypothesis-tests",
      title: "Sampling, confidence and hypothesis tests",
      summary:
        "Inference lets you judge whether a difference you see is real or could just be chance. Learn confidence intervals, p values and their limits so you neither overclaim nor miss real effects.",
      parent: "statistics-for-decisions",
      optional: false,
      resources: [openIntro, khanSignificance],
    },
    {
      slug: "experiments",
      title: "Experiments and A/B tests",
      summary:
        "A fair experiment, where people are randomly assigned to versions, is the most reliable way to know whether a change caused a result. Learn to design one, such as testing two SMS reminders for loan repayments, and to spot the mistakes that spoil it.",
      parent: "statistics-for-decisions",
      optional: false,
      resources: [openIntro],
    },
    {
      slug: "regression-analysis",
      title: "Regression for explanation",
      summary:
        "Regression estimates how one thing changes with another while holding other factors steady. Learn to fit and read a regression and to explain why a strong relationship is not the same as cause and effect.",
      parent: "statistics-for-decisions",
      optional: false,
      resources: [openIntro, RES.khanStats],
    },
    {
      slug: "programming-for-data-science",
      title: "Programming for data science",
      summary:
        "Data scientists write code that others can read, rerun and trust. This section deepens the Python and SQL you started as an analyst.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "python-data-stack",
      title: "Python, NumPy and pandas in depth",
      summary:
        "Go beyond basic tables to reshaping, joining, grouping and working with dates and text at scale. Write functions instead of copying cells so your analysis can run again next month with new data.",
      parent: "programming-for-data-science",
      optional: false,
      resources: [pdsh, numpyBeginners, RES.pandasStart],
    },
    {
      slug: "advanced-sql",
      title: "Advanced SQL",
      summary:
        "Most company data lives in databases, and adverts ask for strong SQL alongside Python. Learn window functions, subqueries and common table expressions to prepare data inside the database before it reaches your notebook.",
      parent: "programming-for-data-science",
      optional: false,
      resources: [pgWindow, RES.pgTutorial],
    },
    {
      slug: "reproducible-work",
      title: "Git and reproducible analysis",
      summary:
        "Keep your code in Git, record which data and library versions you used, and organise projects so a colleague can rerun them. Reproducible work is what lets a team trust and build on your results.",
      parent: "programming-for-data-science",
      optional: false,
      resources: [carpentryGit, RES.githubDocs],
    },
    {
      slug: "predictive-modelling",
      title: "Predictive modelling",
      summary:
        "Prediction helps organisations plan, such as estimating which customers may stop using a service. This section covers building features and models for real decisions and checking them honestly.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "machine-learning-basics",
      title: "Machine learning with scikit learn",
      summary:
        "Train regression and classification models, from simple linear models to decision trees and random forests, using scikit learn. Always compare against a simple baseline so you know the model is adding value.",
      parent: "predictive-modelling",
      optional: false,
      resources: [RES.kaggleMl, sklearnStart, RES.mlCrash],
    },
    {
      slug: "features-for-decisions",
      title: "Feature engineering",
      summary:
        "The columns you build from raw records, such as days since a farmer's last loan repayment or a household's distance to the nearest clinic, usually matter more than the choice of algorithm. Learn to create, encode and scale features that carry real meaning without leaking the answer into the model.",
      parent: "predictive-modelling",
      optional: false,
      resources: [sklearnPreprocessing, RES.kaggleMl],
    },
    {
      slug: "model-validation",
      title: "Validating models honestly",
      summary:
        "Test models on data they have not seen, using cross validation and measures that fit the problem. Watch for leaks from the future and for models that work well on average but badly for one region or group.",
      parent: "predictive-modelling",
      optional: false,
      resources: [sklearnCv, mlccOverfitting],
    },
    {
      slug: "time-series-forecasting",
      title: "Forecasting with time series",
      summary:
        "Sales, rainfall, prices and transaction volumes all change over time with trends and seasons. Learn to plot, decompose and forecast a time series, and to say how uncertain the forecast is.",
      parent: "predictive-modelling",
      optional: false,
      resources: [fpp3, kaggleTimeSeries],
    },
    {
      slug: "geospatial-data",
      title: "Maps and geospatial data",
      summary:
        "Location data drives work in agriculture, health, energy and climate, from mapping farms to planning clinics. Learn to load, join and map data by district or coordinates with free tools.",
      parent: "predictive-modelling",
      optional: true,
      resources: [kaggleGeo, qgisManual],
    },
    {
      slug: "communicating-results",
      title: "Communicating results",
      summary:
        "A model nobody understands changes nothing. This section covers turning analysis into decisions, sharing it well and doing it ethically.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "data-storytelling",
      title: "Turning analysis into decisions",
      summary:
        "Start with the decision the reader faces, give the answer first, then show the evidence and how sure you are. Practise writing a one page summary a manager can act on without reading your code.",
      parent: "communicating-results",
      optional: false,
      resources: [socviz],
    },
    {
      slug: "sharing-results",
      title: "Dashboards and simple data apps",
      summary:
        "Share results as a dashboard or a small interactive app so people can explore them without you. Keep pages light so they load on a phone over mobile data.",
      parent: "communicating-results",
      optional: false,
      resources: [streamlit, RES.lookerHelp],
    },
    {
      slug: "ethics-and-privacy",
      title: "Ethics, bias and data protection",
      summary:
        "Data science often uses personal data such as transactions and phone records, which Ghana's data protection law protects. Learn to collect only what you need, anonymise where you can and check that models do not treat groups unfairly.",
      parent: "communicating-results",
      optional: false,
      resources: [RES.dpc, mlccFairness],
    },
    {
      slug: "getting-hired",
      title: "Getting hired",
      summary:
        "Employers hire data scientists who can show clear thinking on real problems. This section helps you prove it and find a way in.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "data-science-portfolio",
      title: "A data science portfolio",
      summary:
        "Build two or three end to end projects on Ghanaian data, such as public statistics or a competition dataset, each with a question, method, honest results and a plain language summary. Publish the code on GitHub and the summary somewhere easy to read on a phone.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.gss, zindi, RES.kaggleDatasets],
    },
    {
      slug: "first-data-science-role",
      title: "Landing a data science role",
      summary:
        "Many data scientists start as analysts, research assistants or interns and take on modelling work as they prove themselves. Expect practical tests with a dataset and a deadline, and practise explaining your choices out loud.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.kaggleLearn],
    },
  ],
};
