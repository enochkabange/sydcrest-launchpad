# Research: Data Science track (`data-science`)

Tier B outline (issue #96). Researched and written 27 October 2026. Outline only: topic
summaries and free resources in `src/content/roadmaps/data-science.ts`, lessons to follow.
Everything is original. roadmap.sh was not opened, searched or used, and no "<field> roadmap"
style searches were run. No logins; LinkedIn was not opened. Job adverts were read for which
skills appear; no advert text is reproduced. Pay figures shown on some pages were ignored.

## Who the track is for

The catalogue (`Planning/12_TRACK_CATALOGUE.md`, row 24 and Tier B notes) lists data science at
ALX, Blossom Academy, IPMC and Moringa, plus IBM, edX and Codecademy, and describes it as the
natural next step after the data analyst track, needing a laptop and maths. Ghana adverts found
were at mobile money, banking and savings, consulting, energy, agritech and climate employers,
almost all in Accra and almost all asking for a quantitative degree and experience. The outline
therefore starts from the Data Analyst track and does not repeat its spreadsheet, survey or
basic SQL topics. It overlaps with the AI and Machine Learning track only on classic modelling;
this track leans on statistics, experiments, forecasting and communication, the AI track on
deep learning and building AI products.

## Sources

| # | Title | URL | Date read | Licence / type |
|---|---|---|---|---|
| S1 | Climate jobs board: Data Scientist, Kofa, Accra (closed) | https://climatejobs.shortlist.net/companies/kofa/jobs/63269293-data-scientist | 2026-10-27 | Job board, full listing, skills only |
| S2 | JobSearchGH: Carbon Data Scientist, Rainforest Builder, Accra (2024) | https://www.jobsearchgh.com/jobs/21675/carbon-data-scientist-rainforest-builder-accra/ | 2026-10-27 | Job board, full listing, skills only |
| S3 | JobSearchGH: Data Scientist, Ernst and Young, Accra (2022, expired) | https://www.jobsearchgh.com/amp/jobs/17424/data-scientist-ernest-young/ | 2026-10-27 | Job board, full listing, skills only |
| S4 | JobSearchGH: Data Scientist, MTN Ghana (Mobile Money Limited), Accra (2023) | https://www.jobsearchgh.com/jobs/19281/data-scientist-mtn-ghana/ | 2026-10-27 | Job board, full listing, skills only |
| S5 | Built In: ML and Data Science Engineer, Farmerline, Accra (removed 2025; also in ai-ml.md) | https://builtin.com/job/ml-data-science-engineer/4686639 | 2026-10-27 | Job board, full listing, skills only |
| S6 | Web search snippets: Careerjet, Data Scientist / Analyst, Adehyeman Savings and Loans, Accra | https://www.careerjet.com.gh/jobad/ghc5c2b3726834d7ac56bef5c715521187 | 2026-10-27 | Search snippet only (page behind a bot check) |
| S7 | Web search snippets: Zof AI, Data Scientist, Accra (page now 404) | https://zof.ai/careers/accra/data-scientist | 2026-10-27 | Search snippet only |
| S8 | Web search snippets: Carrot Institute, Data Scientist / Analyst, remote, Accra based | https://echojobs.io/job/carrot-institute-data-scientist-analyst-0fme6 | 2026-10-27 | Search snippet only |
| S9 | Web search snippets: Jobberman, Data Analytics Engineer (entry level), DevOps Africa | https://jobberman.com.gh/listings/data-analytics-engineer-6djm7n | 2026-10-27 | Search snippet only |
| S10 | Web search snippets: remote Junior Data Scientist, AI Research (aggregator) | https://usemimi.com/jobs/junior-data-scientist-ai-research-at-whatjobs-direct-mnl8se3o | 2026-10-27 | Search snippet only |
| S11 | Web search snippets: remote Data Scientist open to Ghana applicants (VacancyGlobal) | https://dev-cm.dentaquest.com/job/data-scientist-remote-at-the-elite-job-wfh-data-science-jobs-in-ghana-vacancyglobal-vlntk.html | 2026-10-27 | Search snippet only; low trust aggregator, used for skills keywords only |
| F1 | O*NET 15-2051.00 Data Scientists | https://www.onetonline.org/link/summary/15-2051.00 | 2026-10-27 | Public domain (US DOL), read for tasks and tools |
| C1 | OpenIntro Statistics (free textbook), table of contents | https://www.openintro.org/book/os/ | 2026-10-27 | Free PDF; licence linked from the page, not confirmed on the day; topic list only |
| C2 | Google Machine Learning Crash Course, module list | https://developers.google.com/machine-learning/crash-course | 2026-10-27 | Content CC BY 4.0 per Google Developers site policies; topic list only |
| P1 | SydCrest track catalogue, row 24 and Tier B notes | Planning/12_TRACK_CATALOGUE.md | 2026-10-27 | Internal |

All resource links in the outline were checked to return HTTP 200 on 2026-10-27 (OpenIntro
returned 406 to the command line checker but loaded normally in a fetch).

## Adverts analysed (11)

| # | Role, employer, place | Level | Read as | Skills named |
|---|---|---|---|---|
| A1 | Data Scientist, Kofa, Accra | Degree or three years | Full text (S1) | Python, MATLAB, C++, statistics, probability, linear algebra, ML algorithms, predictive modelling, dashboards, visualisation, IoT sensor data, software design |
| A2 | Carbon Data Scientist, Rainforest Builder, Accra | Graduate | Full text (S2) | Python or R, Git, ML for geospatial and remote sensing data, AWS, Shiny dashboards, data cleaning, visualisation, clean code, West African languages an advantage |
| A3 | Data Scientist, Ernst and Young, Accra, 2022 | Not stated | Full text (S3) | Numerate degree, Python, SQL, PostgreSQL, MySQL, Azure ML, Databricks, S3, Power BI, ArcGIS Pro, simulation, communication |
| A4 | Data Scientist, MTN Mobile Money, Accra, 2023 | Senior | Full text (S4) | SQL, Python, SAS, R, SPSS, Power BI, Tableau, big data platforms, machine learning, statistical analysis, forecasting, data mining, text analytics, multivariate testing, stakeholder management |
| A5 | ML and Data Science Engineer, Farmerline, Accra | Experienced | Full text (S5) | Python, SQL, R, ML frameworks, predictive analytics, feature engineering, data pipelines, cloud, fairness and bias, credit scoring |
| A6 | Data Scientist / Analyst, Adehyeman Savings and Loans, Accra | Two years | Snippet (S6) | Degree, Python, SQL, Tableau or Power BI, banking or finance experience |
| A7 | Data Scientist, Zof AI, Accra | Mid level | Snippet (S7) | Python, SQL, statistics, experiment design, inference |
| A8 | Data Scientist / Analyst, Carrot Institute, remote | Not stated | Snippet (S8) | Python, R, SQL, pandas, scikit learn, TensorFlow, PyTorch, cloud |
| A9 | Data Analytics Engineer, DevOps Africa | Entry | Snippet (S9) | Strong Python, building an analytics API |
| A10 | Junior Data Scientist, AI Research, remote | Student or graduate | Snippet (S10) | Statistics, hypothesis testing, pandas, NumPy, scikit learn, SQL |
| A11 | Data Scientist, remote, open to Ghana | Not stated | Snippet (S11) | Machine learning models for trends, Python or R |

## Skills frequency (11 adverts, rough)

* Python: 11 (every advert, sometimes alongside R)
* SQL: 7 (A3, A4, A5, A6, A7, A8, A10)
* Statistics, inference, experiments: 4 (A1, A4 including multivariate testing, A7, A10) plus F1
* Machine learning and predictive modelling: 7 (A1, A2, A4, A5, A8, A10, A11)
* Visualisation and dashboards (Power BI, Tableau, Shiny): 5 (A1, A2, A3, A4, A6)
* Forecasting: 1 (A4) plus sensor and transaction data in A1 and A5
* Geospatial data: 2 (A2, A3)
* Git and clean, reproducible code: 2 (A1 software design, A2 Git) plus F1 Git
* Cloud platforms: 4 (A2, A3, A5, A8)
* Communication and stakeholders: 3 (A3, A4, A5)
* Ethics, fairness and bias: 1 (A5)
* Quantitative degree: 6 (A1, A2, A3, A4, A5, A6)

## Frameworks and curricula

* **F1 O*NET Data Scientists:** analyse large data sets with statistical software, create
  visualisations, test and validate predictive models, present results and recommend
  solutions; Mathematics is the top knowledge area; tools include Python, SQL databases, Power
  BI, Looker, Git, cloud platforms.
* **C1 OpenIntro Statistics (topic list):** data, probability, distributions, foundations for
  inference, inference for numerical and categorical data, linear and multiple regression.
* **C2 Google ML Crash Course (topic list):** regression, classification, data preparation,
  overfitting, fairness.

## Outline decisions and why

24 nodes in six sections.

* **Prerequisites first** so the track does not repeat the Data Analyst outline (spreadsheets,
  surveys, basic SQL, basic pandas, dashboards).
* **Statistics is the biggest section** (four nodes) because A1, A4, A7 and A10 name statistics,
  inference and experiments, F1 puts Mathematics first, and it is what distinguishes this track
  from the AI one. The A/B test node uses an SMS reminder example; mobile money and lenders are
  among the employers seen.
* **Advanced SQL** gets a node because SQL appears in seven adverts and data scientists are
  expected to go beyond the analyst level.
* **Reproducible work** reflects A1 software design, A2 Git and clean code, and F1 Git.
* **Forecasting** gets a node from A4 forecasting plus time based sensor and transaction data in
  A1, A4 and A5.
* **Geospatial is optional**: two adverts (A2, A3), both specialised.
* **Communication and ethics** reflect A3, A4 and A5 and Ghana's data protection law.
* **Not included as nodes:** big data platforms such as Spark and Databricks (A3, A4; mentioned
  as later learning), SAS and SPSS (A4 only), deep learning (covered by the AI and Machine
  Learning track).

## Coverage table

| Node slug | Justifying signals |
|---|---|
| `before-you-start` | Section. P1 follow on from data analyst |
| `what-you-need-first` | P1 laptop and maths; A6 A7 A10 Python and SQL; prerequisite of all later nodes |
| `data-science-in-ghana` | Employers and levels across A1 to A9; quantitative degree in six adverts |
| `statistics-for-decisions` | Section. A1 A4 A7 A10 statistics; F1 Mathematics |
| `probability-and-distributions` | A1 probability; C1 probability and distributions; prerequisite of `inference-and-hypothesis-tests` |
| `inference-and-hypothesis-tests` | A7 inference; A10 hypothesis testing; C1 foundations for inference |
| `experiments` | A7 experiment design; A4 multivariate testing |
| `regression-analysis` | C1 linear and multiple regression; A4 statistical analysis; prerequisite of `machine-learning-basics` |
| `programming-for-data-science` | Section. Python in 10 adverts; SQL in 7 |
| `python-data-stack` | A8 A10 pandas and NumPy; A9 strong Python; F1 Python |
| `advanced-sql` | A3 A4 A5 A6 A7 A8 A10 SQL; A3 PostgreSQL and MySQL |
| `reproducible-work` | A2 Git and clean code; A1 software design and maintainability; F1 Git |
| `predictive-modelling` | Section. Machine learning in 7 adverts; F1 predictive models |
| `machine-learning-basics` | A8 A10 scikit learn; A1 A5 predictive modelling; C2 regression and classification |
| `model-validation` | F1 test and validate models; C2 overfitting; A5 fairness |
| `time-series-forecasting` | A4 forecasting; A1 sensor data; A5 transaction and credit data |
| `geospatial-data` | A2 geospatial and remote sensing; A3 ArcGIS (optional) |
| `communicating-results` | Section. F1 present results; A3 A4 communication and stakeholders |
| `data-storytelling` | F1 present results and recommend solutions; A4 stakeholder management |
| `sharing-results` | A1 dashboards; A2 Shiny; A3 A4 A6 Power BI and Tableau |
| `ethics-and-privacy` | A5 fairness and bias; Ghana Data Protection Commission; C2 fairness |
| `getting-hired` | Section. Degree and experience asks across adverts |
| `data-science-portfolio` | Evidence needed given experience asks; A10 entry route; Ghana Statistical Service open data |
| `first-data-science-role` | A9 A10 entry routes; analyst to scientist path in P1 |

## Founder spot checks

* Overlap with the AI and Machine Learning track on `machine-learning-basics` and
  `model-validation` is deliberate; confirm you want both tracks to carry classic modelling.
* `sharing-results` links Streamlit as one example of a free data app tool.
