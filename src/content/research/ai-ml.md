# Research: AI and Machine Learning track (`ai-ml`)

Tier B outline (issue #96). Researched and written 27 October 2026. Lessons and quizzes
for every node added 28 October 2026 (issue #198) in
`src/content/roadmaps/content/ai-ml.content.ts`; see "Lesson wave refresh" at the end. Everything
is original. roadmap.sh was not opened, searched or used, and no "<field> roadmap" style
searches were run. No logins; LinkedIn was not opened. Job adverts were read for which skills
appear; no advert text is reproduced. Pay figures shown on some pages were ignored.

Note: the catalogue row calls this track `ai-machine-learning`; the registered key in
`types.ts` is `ai-ml`, which the outline uses. The roadmap slug is `ai-machine-learning`.

## Who the track is for, honestly

The catalogue (`Planning/12_TRACK_CATALOGUE.md`, row 25 and Tier B notes) rates this "weak for
beginners: maths, laptop and prerequisites; few local entry jobs" and says to present it as an
advanced follow on from the data analyst track so beginners are not misled. Research agreed:
every Ghana machine learning advert found asked for a degree and experience, and none was entry
level. The description and the first section say this plainly and send learners to the Data
Analyst track first.

## Sources

| # | Title | URL | Date read | Licence / type |
|---|---|---|---|---|
| S1 | Built In: ML and Data Science Engineer, Farmerline, Accra (removed May 2025) | https://builtin.com/job/ml-data-science-engineer/4686639 | 2026-10-27 | Job board, full listing, skills only |
| S2 | JobSearchGH: Machine Learning Engineer, Heidelberg Materials Digital Hub, Accra (2023) | https://www.jobsearchgh.com/jobs/20483/machine-learning-engineer-heidelberg-materials-digital-hub-accra | 2026-10-27 | Job board, full listing, skills only |
| S3 | Web search snippets: Zof AI, Machine Learning Engineer, Accra (page now 404) | https://zof.ai/careers/accra/machine-learning-engineer | 2026-10-27 | Search snippet only |
| S4 | Web search snippets: Zof AI, Senior Machine Learning Engineer, Accra | https://zof.ai/careers/accra/senior-machine-learning-engineer | 2026-10-27 | Search snippet only |
| S5 | Web search snippets: Zof AI, Senior AI Applications Engineer, Accra | https://zof.ai/careers/accra | 2026-10-27 | Search snippet only |
| S6 | Web search snippets: Deloitte, AI Engineer, Accra (page blocked to fetch) | https://startup.jobs/ai-engineer-deloitte-5769991 | 2026-10-27 | Search snippet only |
| S7 | Web search snippets: Really Great Tech, Lead AI and Software Engineer, Accra | https://pitchmeai.com/jobs/really-great-tech/lead-ai-and-software-engineer-k0brk3r2ga | 2026-10-27 | Search snippet only |
| S8 | Web search snippets: Dataware Tech Ghana, Machine Learning Engineer (page returned an error) | https://www.jobsearchgh.com/jobs/15168/machine-learning-engineer-dataware-tech-ghana | 2026-10-27 | Search snippet only (title only) |
| S9 | Web search snippets: AI Prompt Engineer, DLP, Accra (deadline May 2026) | https://ghanacareers.com/?p=40621 | 2026-10-27 | Search snippet only |
| S10 | Web search snippets: remote Junior Data Scientist, AI Research (aggregator) | https://usemimi.com/jobs/junior-data-scientist-ai-research-at-whatjobs-direct-mnl8se3o | 2026-10-27 | Search snippet only |
| S11 | Web search snippets: Jobberman Nigeria, machine learning data scientist, Lagos | https://jobberman.com/listings/data-scientist-9jdd95-v1 | 2026-10-27 | Search snippet only |
| S12 | Climate jobs board: Data Scientist, Kofa, Accra (also used in data-science.md) | https://climatejobs.shortlist.net/companies/kofa/jobs/63269293-data-scientist | 2026-10-27 | Job board, full listing (closed), skills only |
| F1 | O*NET 15-2051.00 Data Scientists (closest O*NET profile; no separate machine learning engineer profile was used) | https://www.onetonline.org/link/summary/15-2051.00 | 2026-10-27 | Public domain (US DOL), read for tasks and tools |
| C1 | Google Machine Learning Crash Course, module list | https://developers.google.com/machine-learning/crash-course | 2026-10-27 | Content CC BY 4.0 per Google Developers site policies (https://developers.google.com/site-policies); topic list read, no text reused |
| P1 | SydCrest track catalogue, row 25 and Tier B notes | Planning/12_TRACK_CATALOGUE.md | 2026-10-27 | Internal |
| S13 | Web search snippets: MTN Ghana, Data Scientist (Digital), Accra (Careerjet Ghana) | https://www.careerjet.com.gh/jobad/gha0d68881f4605a583a20717ec44f63eb | 2026-10-28 | Search snippet only |
| S14 | Web search snippets: M-KOPA, Senior Analytics Manager, Customer Behaviour, Accra (March 2026) | https://resumegeni.com/jobs/senior-analytics-manager-customer-behaviour-at-m-kopa-accra | 2026-10-28 | Search snippet only |
| S15 | Web search snippets: Appruve, Machine Learning Engineer, remote (older listing) | https://www.jobsearchgh.com/jobs/11516/machine-learning-engineer-remote-appruve/ | 2026-10-28 | Search snippet only (title and remote status) |
| S16 | Web search snippets: Google, Student Researcher 2026 (deadline February 2026) | https://ghanacareers.com/job/student-researcher-2026-at-google | 2026-10-28 | Search snippet only |
| S17 | Web search snippets: Penuel-Charis Consultancy, Research Assistant, Hohoe (February 2026) | https://ghanacareers.com/job/research-assistant-at-penuel-charis-consultancy/ | 2026-10-28 | Search snippet only |
| S18 | Web search snippets: remote Junior Data Scientist contract open to Ghana (October 2026) | https://remowork.life/remote-jobs-in/ghana/ai-expert-data-science | 2026-10-28 | Search snippet only |
| D1 | Google Colab FAQ (free tier: resources not guaranteed, limits dynamic, idle timeouts, temporary VM) | https://research.google.com/colaboratory/faq.html | 2026-10-28 | Official documentation, read for facts only |
| D2 | Kaggle: Efficient GPU usage tips and notebooks docs (weekly accelerator quota; page is script rendered, so no numbers are stated in lessons) | https://www.kaggle.com/docs/efficient-gpu-usage | 2026-10-28 | Official documentation and forum search results, read for facts only |
| D3 | Ghana Data Protection Commission | https://dpc.gov.gh/ | 2026-10-28 | Regulator site, linked as further reading |
| D4 | Act 843 secondary summaries (Wikipedia "Data Protection Act, 2012"; DLA Piper Data Protection in Ghana) used to confirm: the Act's name and year, the Commission as enforcer, registration of processors, health data as special personal data | https://en.wikipedia.org/wiki/Data_Protection_Act,_2012 and https://www.dlapiperdataprotection.com/?t=law&c=GH | 2026-10-28 | Secondary sources; section numbers conflict between sources, so lessons cite none |
| D5 | scikit learn, pandas, NumPy, PyTorch, FastAPI official docs (API names only) | https://scikit-learn.org/stable/ , https://pandas.pydata.org/docs/ , https://pytorch.org/docs/stable/ , https://fastapi.tiangolo.com/ | 2026-10-28 | Official documentation (BSD, BSD, BSD, BSD style and MIT licensed projects); no text reused |

All resource links in the outline were checked to return HTTP 200 on 2026-10-27.

## Adverts analysed (12)

| # | Role, employer, place | Level | Read as | Skills named |
|---|---|---|---|---|
| A1 | ML and Data Science Engineer, Farmerline, Accra | Degree; experienced | Full text (S1) | Python, SQL; TensorFlow, PyTorch, Keras, Hugging Face; speech recognition and synthesis for low resource languages; NLP and LLM fine tuning; feature engineering; data pipelines; AWS, GCP or Azure; Docker and Kubernetes a plus; fairness, explainability, bias mitigation; credit scoring |
| A2 | Machine Learning Engineer, Heidelberg Materials Digital Hub, Accra, 2023 | Two years | Full text (S2) | Python, PySpark; TensorFlow, PyTorch, Keras; generative models, NLP, prompt design; MLflow, CI/CD, testing; Azure, Databricks, AWS, GCP; Git; secure API endpoints |
| A3 | Machine Learning Engineer, Zof AI, Accra | Mid to senior | Snippet (S3) | Datasets, training pipelines, training, fine tuning and evaluating models; PyTorch or JAX, LLM fine tuning, model serving a plus |
| A4 | Senior Machine Learning Engineer, Zof AI, Accra | Senior | Snippet (S4) | Title and seniority only |
| A5 | Senior AI Applications Engineer, Zof AI, Accra | Senior | Snippet (S5) | Building AI applications (title level) |
| A6 | AI Engineer, Deloitte, Accra | Experienced | Snippet (S6) | Machine learning, deep learning, NLP, AI frameworks, cloud |
| A7 | Lead AI and Software Engineer, Really Great Tech, Accra | Lead | Snippet (S7) | AI and generative AI client work, software engineering |
| A8 | Machine Learning Engineer, Dataware Tech Ghana | Not stated | Snippet, title only (S8) | Title only |
| A9 | AI Prompt Engineer, DLP, Accra | Degree, three years | Snippet (S9) | Prompting (title level) |
| A10 | Junior Data Scientist, AI Research, remote (aggregator) | Student or graduate | Snippet (S10) | Statistics, programming, pandas, NumPy, scikit learn, TensorFlow or PyTorch, SQL, hypothesis testing |
| A11 | Machine learning focused data scientist, Lagos | Three years | Snippet (S11) | Developing and optimising ML models, predictive models |
| A12 | Data Scientist, Kofa, Accra | Degree or three years | Full text (S12) | Python, statistics, probability, linear algebra, ML algorithms, predictive modelling, software design, data structures |

## Skills frequency (12 adverts, rough)

* Python: 4 (A1, A2, A10, A12) plus F1
* Deep learning frameworks (TensorFlow, PyTorch, Keras, JAX): 4 (A1, A2, A3, A10)
* Model training and evaluation: 5 (A1, A2, A3, A11, A12)
* NLP, speech and language models: 4 (A1, A2, A3, A6)
* Generative AI, prompting and LLM apps: 5 (A2, A5, A7, A9, A3 fine tuning)
* Maths and statistics (linear algebra, probability, statistics): 2 (A10, A12) plus F1 Mathematics as the top knowledge area
* Cloud platforms: 3 (A1, A2, A6) plus F1
* Model serving, MLOps, APIs, Docker: 3 (A1, A2, A3)
* Feature engineering and data pipelines: 2 (A1, A2)
* Fairness, explainability and bias: 1 (A1) plus C1 fairness module
* SQL: 2 (A1, A10)

## Frameworks and curricula

* **F1 O*NET Data Scientists:** tasks of analysing data, testing and validating predictive
  models, presenting results; tools include Python, TensorFlow, PyTorch, cloud platforms,
  Docker, Git; Mathematics is the top knowledge area.
* **C1 Google ML Crash Course modules:** linear and logistic regression, classification,
  numerical and categorical data, generalisation and overfitting, neural networks, embeddings,
  large language models, production systems, AutoML, fairness. Used to check the outline covers
  the core concepts; wording and order are our own. Several C1 modules are linked as resources.

## Outline decisions and why

26 nodes in seven sections.

* **Prerequisites and honesty first** (`what-you-need-first`, `ai-work-in-ghana`) as required by
  P1 and the brief: Data Analyst track first, maths and a laptop needed, no entry level local
  roles seen.
* **A maths section** with three nodes because A12 and A10 name linear algebra, probability and
  statistics, F1 ranks Mathematics first, and later nodes depend on it.
* **Classic ML before deep learning**: A1, A11 and A12 are about predictive models on tabular
  business data (credit scoring, sensors), the most realistic first ML work.
* **Language and speech for Ghanaian languages** is its own node because A1 (a Ghana employer)
  centres on speech and language models for low resource languages; Masakhane is linked as a
  community resource, not an endorsement.
* **Building with AI APIs** and **serving models** reflect A2, A3, A5, A7 and A9 (applications,
  prompting, serving) and C1 production systems.
* **Responsible AI** links Ghana's data protection regulator and C1 fairness; A1 names fairness
  and bias mitigation.
* **Unsupervised learning is optional**: no advert names it; C1 and O*NET cover it lightly.
* **Not included as nodes:** reinforcement learning and multimodal learning (A1 only, advanced),
  Spark and Databricks (A2 only), AutoML (C1 only).

## Coverage table

| Node slug | Justifying signals |
|---|---|
| `before-you-start` | Section. P1 advanced follow on |
| `what-you-need-first` | P1 maths, laptop and prerequisites; A10 A12 Python and statistics; prerequisite of all later nodes |
| `ai-work-in-ghana` | Employers and levels across A1 to A9; no entry level Ghana advert |
| `maths-for-ml` | Section. A10 A12 maths and statistics; F1 Mathematics |
| `vectors-and-matrices` | A12 linear algebra; prerequisite of `neural-networks` |
| `gradients-and-optimisation` | C1 linear regression (gradient descent); prerequisite of `neural-networks` |
| `probability-for-ml` | A12 probability; A10 statistics; C1 logistic regression |
| `python-ml-tools` | Section. Python in A1 A2 A10 A12; F1 Python |
| `numpy-and-pandas` | A10 pandas and NumPy; A1 A2 data pipelines |
| `notebooks-and-free-compute` | Local necessity (laptop limits, data bundles); prerequisite of practice in later nodes |
| `classic-ml` | Section. A11 A12 predictive modelling; C1 ML models module |
| `regression-and-classification` | C1 regression and classification; A1 credit scoring; A10 scikit learn |
| `model-evaluation` | A3 evaluating models; F1 test and validate models; C1 overfitting |
| `feature-engineering` | A1 feature engineering; C1 numerical and categorical data |
| `unsupervised-learning` | F1 data mining tools; optional (no advert) |
| `deep-learning` | Section. A1 A2 A3 A6 frameworks and deep learning |
| `neural-networks` | C1 neural networks; A6 deep learning; A1 A2 TensorFlow, PyTorch, Keras |
| `language-and-speech` | A1 speech and NLP for low resource languages; A2 A6 NLP |
| `llms-and-embeddings` | C1 embeddings and LLMs; A1 A3 LLM fine tuning; A2 generative AI |
| `building-with-ai` | Section. A5 A7 AI applications |
| `ai-apis` | A2 prompt design and OpenAI style APIs; A9 prompting; A7 generative AI client work |
| `serving-models` | A3 model serving; A2 MLflow, CI/CD and secure APIs; A1 Docker; C1 production systems |
| `responsible-ai` | A1 fairness, explainability, bias mitigation; C1 fairness; Ghana Data Protection Commission |
| `getting-hired` | Section. Degree and experience asks across adverts |
| `ml-portfolio` | Evidence needed given A1 to A12 experience asks; A10 entry route |
| `routes-into-ai` | No entry level Ghana adverts; A10 student and graduate route; P1 follow on from data analyst |

## Lesson wave refresh (28 October 2026, issue #198)

### More adverts (snippet level; skills only, no text copied, pay figures ignored)

| # | Role, employer, place | Level | Read as | Skills named |
|---|---|---|---|---|
| A13 | Data Scientist (Digital), MTN Ghana, Accra | Experienced | Snippet (S13) | Python with scikit learn, TensorFlow and PyTorch; SQL; BigQuery ML; cloud AI services |
| A14 | Senior Analytics Manager, M-KOPA, Accra | Senior | Snippet (S14) | Python or R, pandas, scikit learn; building models, not only queries |
| A15 | Machine Learning Engineer, Appruve, remote | Not stated | Snippet, title only (S15) | Title and remote status only |
| A16 | Student Researcher 2026, Google (listed in Ghana) | Master's | Snippet (S16) | Machine learning research areas; research route needs formal study |
| A17 | Research Assistant, Penuel-Charis Consultancy, Hohoe | Entry | Snippet (S17) | Data collection and analysis (general research, not ML specific) |
| A18 | Junior Data Scientist, contract, remote, open to Ghana | Junior | Snippet (S18) | Junior data science contract work (title level) |

Now 18 adverts. Effect on frequencies: scikit learn and pandas rise (A10, A13, A14); model
building on business data rises (A11, A12, A13, A14); A17 and A18 confirm research assistant
and remote junior data routes; A16 confirms research roles expect formal study. Still no entry
level machine learning engineer advert in Ghana. No outline change needed: every new signal
maps to an existing node, so all 26 slugs are kept (the roadmap is published) and there are
no renames.

### How the lessons use the research

* `what-you-need-first`, `before-you-start`, `routes-into-ai` link to the Data Analyst track
  (`/roadmaps/data-analyst`) as the prerequisite and say plainly that a laptop or desktop is
  needed for hands on work.
* Free notebooks (Google Colab, Kaggle Notebooks) are named as examples only. Following D1 and
  D2, no hour counts or quotas are stated; lessons say limits change and point to the official
  pages.
* Act 843: lessons state only facts confirmed by D3 and D4 (Act name, the Commission as
  enforcer, registration, health data as special personal data needing explicit consent or a
  narrow legal basis). No section numbers and no principle count, because sources disagree.
  `responsible-ai` says it is an introduction, not legal advice.
* Google ML Crash Course (C1, CC BY 4.0) was used as a topic checklist only; no text, examples
  or ordering were copied.
* Ghanaian languages: lessons name Dagbani, Twi and Ewe and the letters ɛ and ɔ, but contain no
  sentences in those languages, to avoid publishing incorrect text. The practice task asks
  learners to write their own and have a native speaker check them.
* All datasets in lessons are invented and labelled as examples. No statistics or salaries.

### Code checked

Every snippet was run on 28 October 2026 in a fresh Python 3.14 virtual environment with
scikit learn 1.9.1, pandas 3.1.0, NumPy 2.5.4, PyTorch 2.14.1, FastAPI
0.162.0 and pydantic 2.14.1, against an invented farm dataset. The `ai-apis` snippet is a
provider neutral test loop; it calls a function the learner writes with their provider's own
client library, because model names and client APIs change often.

## Founder spot checks

* `language-and-speech` names Dagbani, Twi and Ewe as example languages; confirm the choice.
* `ai-work-in-ghana` states no beginner adverts were found; confirm the tone is right for a
  heavily searched track.
* Lessons (28 October): `ai-work-in-ghana` and `routes-into-ai` say no entry level machine
  learning roles were found and point to data, research assistant, software and remote roles;
  confirm the tone.
* `responsible-ai` and `building-with-ai`: confirm the Act 843 wording (no section numbers by
  design) before publishing.
* `language-and-speech`: contains no sentences in Ghanaian languages by design; a Dagbani, Twi
  or Ewe speaker could add one checked example later.
