import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Tier B outline (issue #96): topics and free resources only, lessons to follow.
 * Research and sources: src/content/research/ai-ml.md.
 * Track specific links not in the shared pool; each checked to resolve (October 2026).
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const khanLinearAlgebra = r("Khan Academy: Linear algebra", "https://www.khanacademy.org/math/linear-algebra", "video");
const linearAlgebraVideos = r(
  "3Blue1Brown: Essence of linear algebra",
  "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
  "video",
);
const khanCalculus = r("Khan Academy: Differential calculus", "https://www.khanacademy.org/math/differential-calculus", "video");
const khanProbability = r(
  "Khan Academy: Probability",
  "https://www.khanacademy.org/math/statistics-probability/probability-library",
  "video",
);
const mlccLinear = r(
  "Google ML Crash Course: Linear regression",
  "https://developers.google.com/machine-learning/crash-course/linear-regression",
);
const mlccOverfitting = r(
  "Google ML Crash Course: Overfitting",
  "https://developers.google.com/machine-learning/crash-course/overfitting",
);
const mlccNumerical = r(
  "Google ML Crash Course: Working with numerical data",
  "https://developers.google.com/machine-learning/crash-course/numerical-data",
);
const mlccNeural = r(
  "Google ML Crash Course: Neural networks",
  "https://developers.google.com/machine-learning/crash-course/neural-networks",
);
const mlccEmbeddings = r(
  "Google ML Crash Course: Embeddings",
  "https://developers.google.com/machine-learning/crash-course/embeddings",
);
const mlccLlm = r(
  "Google ML Crash Course: Intro to large language models",
  "https://developers.google.com/machine-learning/crash-course/llm",
);
const mlccProduction = r(
  "Google ML Crash Course: Production ML systems",
  "https://developers.google.com/machine-learning/crash-course/production-ml-systems",
);
const mlccFairness = r(
  "Google ML Crash Course: Fairness",
  "https://developers.google.com/machine-learning/crash-course/fairness",
);
const numpyBeginners = r("NumPy: The absolute basics for beginners", "https://numpy.org/doc/stable/user/absolute_beginners.html");
const sklearnStart = r("scikit learn: Getting started", "https://scikit-learn.org/stable/getting_started.html");
const sklearnCv = r("scikit learn: Cross validation", "https://scikit-learn.org/stable/modules/cross_validation.html");
const sklearnClustering = r("scikit learn: Clustering", "https://scikit-learn.org/stable/modules/clustering.html");
const kaggleIntermediate = r(
  "Kaggle Learn: Intermediate Machine Learning",
  "https://www.kaggle.com/learn/intermediate-machine-learning",
  "practice",
);
const kaggleFeatures = r("Kaggle Learn: Feature Engineering", "https://www.kaggle.com/learn/feature-engineering", "practice");
const kaggleDeep = r("Kaggle Learn: Intro to Deep Learning", "https://www.kaggle.com/learn/intro-to-deep-learning", "practice");
const fastai = r("fast.ai: Practical Deep Learning (free course)", "https://course.fast.ai/", "video");
const neuralNetVideos = r("3Blue1Brown: Neural networks", "https://www.3blue1brown.com/?topic=neural-networks", "video");
const hfCourse = r("Hugging Face: LLM course (free)", "https://huggingface.co/learn/llm-course/chapter1/1");
const hfTransformers = r("Hugging Face: Transformers docs", "https://huggingface.co/docs/transformers/index");
const masakhane = r("Masakhane: NLP for African languages", "https://www.masakhane.io/");
const fastapi = r("FastAPI documentation", "https://fastapi.tiangolo.com/");
const zindi = r("Zindi: data science challenges in Africa", "https://zindi.world/", "practice");
const kaggleCompetitions = r("Kaggle competitions", "https://www.kaggle.com/competitions", "practice");

export const aiMl: RoadmapDraft = {
  slug: "ai-machine-learning",
  title: "AI and Machine Learning",
  description:
    "Learn how machine learning models are built, tested and put to work, from classic prediction to language models and Ghanaian language tools. This is an advanced track to take after the Data Analyst track: you will need Python, school level maths you are willing to extend, and a laptop.",
  track: "ai-ml",
  field_category: "ai",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "before-you-start",
      title: "Before you start",
      summary:
        "Machine learning builds on programming, data handling and maths, so this is not a first tech track. Read this section to check you are ready and to see honestly what AI work looks like in Ghana.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [],
    },
    {
      slug: "what-you-need-first",
      title: "What you need first",
      summary:
        "Finish the Data Analyst track first, or be equally comfortable with Python, pandas, SQL and basic statistics. You can read and watch on a phone, but training models needs a laptop, even when the heavy work runs in a free online notebook.",
      parent: "before-you-start",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.kagglePython, RES.kagglePandas],
    },
    {
      slug: "ai-work-in-ghana",
      title: "AI work in Ghana",
      summary:
        "AI and machine learning roles in Ghana exist at agritech, fintech, consulting and AI product companies, but the adverts we found asked for degrees and experience rather than beginners. Most people enter through data analyst, data science or software jobs first and grow into machine learning from there.",
      parent: "before-you-start",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [],
    },
    {
      slug: "maths-for-ml",
      title: "The maths behind models",
      summary:
        "You do not need to be a mathematician, but models are built from a few pieces of maths you must understand. Take this section slowly and come back to it whenever a later topic feels like magic.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "foundation",
      jobs: [],
      resources: [],
    },
    {
      slug: "vectors-and-matrices",
      title: "Vectors and matrices",
      summary:
        "Data inside a model is stored as lists and grids of numbers called vectors and matrices. Learn what they mean, how to multiply them and why that is the heart of most models.",
      parent: "maths-for-ml",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [linearAlgebraVideos, khanLinearAlgebra],
    },
    {
      slug: "gradients-and-optimisation",
      title: "Rates of change and gradient descent",
      summary:
        "Models learn by measuring how wrong they are and nudging their numbers to be a little less wrong, again and again. Learn what a derivative tells you and how gradient descent uses it to train a model.",
      parent: "maths-for-ml",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [khanCalculus, mlccLinear],
    },
    {
      slug: "probability-for-ml",
      title: "Probability for prediction",
      summary:
        "Many models output a probability, such as how likely a loan is to be repaid, rather than a yes or no. Learn conditional probability, distributions and why a confident model can still be wrong.",
      parent: "maths-for-ml",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [khanProbability, RES.khanStats],
    },
    {
      slug: "python-ml-tools",
      title: "Python tools for machine learning",
      summary:
        "Machine learning in practice happens in Python notebooks with a small set of libraries. This section sets up the tools you will use for the rest of the track.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Junior Data Scientist", "Research Assistant"],
      resources: [],
    },
    {
      slug: "numpy-and-pandas",
      title: "NumPy and pandas for model data",
      summary:
        "NumPy handles fast maths on arrays and pandas handles tables, and together they prepare almost all data for a model. Practise loading a dataset, cleaning it and turning it into the arrays a model expects.",
      parent: "python-ml-tools",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [numpyBeginners, RES.pandasStart],
    },
    {
      slug: "notebooks-and-free-compute",
      title: "Notebooks and free compute",
      summary:
        "Free hosted notebooks give you a powerful computer in the browser, including time on graphics processors for deep learning. Learn to save your work often, keep datasets small to protect your data bundle, and download results before a session ends.",
      parent: "python-ml-tools",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.colab, RES.kaggleLearn],
    },
    {
      slug: "classic-ml",
      title: "Classic machine learning",
      summary:
        "Most real business problems are still solved with classic models on tables of data. This section teaches the full workflow from raw data to a model you can trust.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Junior Data Scientist", "Data Scientist"],
      resources: [],
    },
    {
      slug: "regression-and-classification",
      title: "Regression and classification",
      summary:
        "Regression predicts a number, such as next month's maize price, and classification predicts a category, such as whether a transaction looks like fraud. Train your first models with scikit learn and compare them with a simple baseline.",
      parent: "classic-ml",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.kaggleMl, sklearnStart, RES.mlCrash],
    },
    {
      slug: "model-evaluation",
      title: "Training, testing and avoiding overfitting",
      summary:
        "A model that only memorises its training data will fail on new cases, so you must always test it on data it has never seen. Learn train and test splits, cross validation and which accuracy measures matter when one outcome is rare.",
      parent: "classic-ml",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [mlccOverfitting, sklearnCv],
    },
    {
      slug: "feature-engineering",
      title: "Features and messy real data",
      summary:
        "The way you prepare inputs often matters more than the model you pick. Practise handling missing values, categories like region names and dates, and data leaks that make a model look better than it is.",
      parent: "classic-ml",
      optional: false,
      difficulty: "advanced",
      complexity: 5,
      resources: [kaggleFeatures, kaggleIntermediate, mlccNumerical],
    },
    {
      slug: "unsupervised-learning",
      title: "Clustering and finding patterns",
      summary:
        "Unsupervised methods find groups and patterns without labelled answers, such as grouping customers by how they use a service. They are useful for exploration but harder to evaluate, so treat their results as questions rather than answers.",
      parent: "classic-ml",
      optional: true,
      difficulty: "advanced",
      complexity: 4,
      resources: [sklearnClustering],
    },
    {
      slug: "deep-learning",
      title: "Deep learning",
      summary:
        "Deep learning powers image recognition, speech and language models. This section explains how it works and where it is being applied to Ghanaian problems.",
      parent: null,
      optional: false,
      difficulty: "advanced",
      complexity: 3,
      careerLevel: "mid",
      jobs: ["Machine Learning Engineer", "AI Engineer"],
      resources: [],
    },
    {
      slug: "neural-networks",
      title: "Neural networks",
      summary:
        "A neural network stacks many simple units that each learn a small part of the pattern. Build and train a small one in a free notebook so you understand layers, activation functions and training loops.",
      parent: "deep-learning",
      optional: false,
      difficulty: "advanced",
      complexity: 5,
      resources: [neuralNetVideos, mlccNeural, kaggleDeep],
    },
    {
      slug: "language-and-speech",
      title: "Language, speech and Ghanaian languages",
      summary:
        "Language and speech models for languages such as Dagbani, Twi and Ewe have far less training data than English, which makes them hard and valuable work. Learn how text and audio become model inputs and follow the African research communities building these tools.",
      parent: "deep-learning",
      optional: false,
      difficulty: "advanced",
      complexity: 5,
      resources: [masakhane, hfCourse],
    },
    {
      slug: "llms-and-embeddings",
      title: "Large language models and embeddings",
      summary:
        "Large language models predict text one piece at a time, and embeddings turn words or documents into numbers that capture meaning. Learn what these models can and cannot do, and why they sometimes state false things confidently.",
      parent: "deep-learning",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [mlccLlm, mlccEmbeddings, hfTransformers],
    },
    {
      slug: "building-with-ai",
      title: "Building with AI",
      summary:
        "Many AI jobs are about putting models to work inside products rather than inventing new ones. This section covers using AI services, serving your own model and doing it responsibly.",
      parent: null,
      optional: false,
      difficulty: "advanced",
      complexity: 3,
      careerLevel: "mid",
      jobs: ["AI Prompt Engineer", "Machine Learning Engineer"],
      resources: [],
    },
    {
      slug: "ai-apis",
      title: "Building apps with AI APIs",
      summary:
        "Hosted model APIs let you add summarising, translation or question answering to an app with a few calls. Learn to write clear prompts, test outputs on real examples and keep costs and private data under control.",
      parent: "building-with-ai",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [hfCourse, RES.mdnHttp],
    },
    {
      slug: "serving-models",
      title: "Serving a model",
      summary:
        "A model is only useful once other software can call it, usually through a small web API running in a container. Learn to save a trained model, wrap it in an API and monitor it for the slow drift that makes predictions worse over time.",
      parent: "building-with-ai",
      optional: false,
      difficulty: "advanced",
      complexity: 5,
      resources: [fastapi, RES.docker, mlccProduction],
    },
    {
      slug: "responsible-ai",
      title: "Fairness, privacy and responsible AI",
      summary:
        "A model trained on biased or incomplete data can treat some groups unfairly, for example turning down loans for people outside big cities. Learn to check results across groups, protect personal data under Ghana's data protection law and explain your model's limits honestly.",
      parent: "building-with-ai",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [mlccFairness, RES.dpc],
    },
    {
      slug: "getting-hired",
      title: "Getting hired",
      summary:
        "Employers want to see that you can take a real problem from data to a working, honest model. This section helps you build that proof and plan a realistic route in.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "specialist",
      jobs: ["Senior Machine Learning Engineer", "ML and Data Science Engineer", "Lead AI and Software Engineer"],
      resources: [],
    },
    {
      slug: "ml-portfolio",
      title: "A machine learning portfolio",
      summary:
        "Build two or three projects on Ghanaian or African data, each with a clear question, a baseline, an honest evaluation and a short write up. Competitions on platforms such as Zindi and Kaggle give you real datasets and a public record of your work.",
      parent: "getting-hired",
      optional: false,
      difficulty: "advanced",
      complexity: 3,
      resources: [zindi, kaggleCompetitions, RES.kaggleDatasets],
    },
    {
      slug: "routes-into-ai",
      title: "Routes into AI roles",
      summary:
        "Realistic first steps are data analyst, data science, software or research assistant roles where you can use machine learning on the side. Keep learning in public, contribute to open projects and apply for fellowships and research programmes as your portfolio grows.",
      parent: "getting-hired",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [fastai, masakhane],
    },
  ],
};
