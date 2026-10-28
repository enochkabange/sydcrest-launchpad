import type { TrackContent } from "./types";

/**
 * Lesson content for the Data Science track (issue #198). Original SydCrest
 * writing; sources and the coverage table are in
 * src/content/research/data-science.md. Every dataset in these lessons is
 * invented for teaching and is labelled as an example; none of the numbers
 * describe real places, people or companies. Code snippets were run against
 * the library versions listed in the research file.
 */
const content: TrackContent = {
  roadmap: "data-scientist",
  nodes: {
    "advanced-sql": {
      explanation_md: `## Why this matters

Most company data lives in databases, and most data science adverts ask for SQL alongside Python. Analysts write queries that filter, join and group. Data scientists go further: they compute features such as running totals and gaps between events inside the database, so only a tidy, manageable table travels to the notebook. This saves time, memory and mobile data.

You should already be comfortable with SELECT, WHERE, JOIN, GROUP BY and HAVING from the Data Analyst track. This lesson builds three tools on top.

## Subqueries

A subquery is a query inside another. It answers "compared with what?" questions:

\`\`\`sql
SELECT farmer_id, amount
FROM repayments
WHERE amount > (SELECT AVG(amount) FROM repayments);
\`\`\`

## Common table expressions

A common table expression (CTE) names a step with \`WITH\`, so long queries read top to bottom like a recipe instead of nesting inside each other. You can chain several:

\`\`\`sql
WITH recent AS (
  SELECT * FROM repayments WHERE paid_on >= '2026-01-01'
),
totals AS (
  SELECT farmer_id, SUM(amount) AS total FROM recent
  GROUP BY farmer_id
)
SELECT * FROM totals WHERE total > 300;
\`\`\`

## Window functions

GROUP BY collapses rows into one per group. A **window function** calculates across related rows but keeps every row. The \`OVER\` clause says which rows: \`PARTITION BY\` splits them into groups, \`ORDER BY\` sets the order inside each group.

Useful ones:

* \`SUM(...) OVER (...)\` for running totals
* \`LAG(col)\` for the previous row's value, \`LEAD(col)\` for the next
* \`ROW_NUMBER()\` and \`RANK()\` to number rows, for example to pick each customer's latest record
* \`AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)\` for a seven row moving average

Here is a made up repayments table for input loans, with a running total and the gap since the previous payment:

\`\`\`sql
WITH ordered AS (
  SELECT farmer_id, paid_on, amount,
    SUM(amount) OVER (PARTITION BY farmer_id
                      ORDER BY paid_on) AS paid_so_far,
    LAG(paid_on) OVER (PARTITION BY farmer_id
                       ORDER BY paid_on) AS prev_paid
  FROM repayments
)
SELECT farmer_id, paid_on, paid_so_far,
       paid_on - prev_paid AS days_gap
FROM ordered;
\`\`\`

In PostgreSQL, subtracting one date from another gives whole days. For a farmer who paid 100, 150 and 100 cedis on 10 January, 12 February and 30 March, \`paid_so_far\` reads 100, 250, 350 and \`days_gap\` reads empty, 33, 46. Each row stays, and the gaps become a feature for a repayment model.

To keep only each farmer's latest payment, number the rows newest first and filter:

\`\`\`sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY farmer_id
                               ORDER BY paid_on DESC) AS rn
  FROM repayments) AS t
WHERE rn = 1;
\`\`\`

## Good habits

* Check row counts after every join.
* Filter early in a CTE so later steps handle fewer rows.
* Never paste user input into SQL strings; use parameters.

## A small example

Alhassan works with a large table of transactions at a payments company. Instead of exporting millions of rows, he writes one query with CTEs and window functions that produces one row per customer: transactions in the last 30 days, days since the last transaction, and average gap between transactions. The result is small enough to load into pandas in seconds.`,
      practice_task_md: `**Goal:** practise CTEs and window functions on a small table.

1. Use a free browser SQL playground or Python's built in \`sqlite3\` module (SQLite supports window functions; for date gaps use \`julianday(paid_on) - julianday(prev_paid)\`).
2. Create a \`repayments\` table with at least three farmers and four payments each, all made up.
3. Write a query with a running total and days between payments per farmer.
4. Write a query that keeps only each farmer's latest payment using \`ROW_NUMBER()\`.
5. Write a CTE that finds farmers whose average gap between payments is over 40 days.

**Done looks like:** three working queries saved in a text file with a one line comment above each explaining what it does.`,
      quiz: {
        questions: [
          {
            prompt: "How does a window function differ from GROUP BY?",
            options: [
              "It deletes duplicate rows",
              "It calculates across related rows but keeps every row",
              "It can only be used on dates",
              "It always returns one row per table",
            ],
            answer_index: 1,
            explanation: "GROUP BY collapses rows, while a window function keeps every row and adds a calculation.",
          },
          {
            prompt: "Which function gives you the previous row's value within a group?",
            options: [
              "LEAD",
              "RANK",
              "LAG",
              "HAVING",
            ],
            answer_index: 2,
            explanation: "LAG returns the value from the previous row in the window order.",
          },
          {
            prompt: "What is the main benefit of a common table expression?",
            options: [
              "It names each step so long queries read top to bottom",
              "It makes queries run without a database",
              "It replaces the need for joins",
              "It encrypts the results",
            ],
            answer_index: 0,
            explanation: "CTEs name steps with WITH so complex queries read like a recipe.",
          },
          {
            prompt: "Why compute features like days since last transaction in SQL rather than exporting all rows?",
            options: [
              "Python cannot calculate dates",
              "Exporting is illegal",
              "Only a small, tidy table needs to travel to the notebook, saving time and memory",
              "SQL results are always more accurate than pandas",
            ],
            answer_index: 2,
            explanation: "Doing the work in the database means only a manageable table comes to Python.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "before-you-start": {
      explanation_md: `## Why this matters

Banks, savings and loans companies, mobile money providers, agritech firms, NGOs and research projects in Ghana all collect more data than they can read. An analyst tells them what happened last month. A data scientist goes further: how sure are we that this change is real, what caused it, what is likely to happen next, and what should we do about it? Those questions decide where money, seed, medicine and staff time go, so the people who can answer them carefully are valuable.

## Four kinds of question

It helps to sort the work into four kinds of question.

* **Describe:** how many farmers in the cooperative repaid their input loans on time? This is analyst work, and you already know it.
* **Infer:** the repayment rate in our sample of 300 farmers is 82 percent; what range is the true rate for all 4,000 members likely to sit in?
* **Explain or test:** did the new SMS reminder actually raise repayment, or did repayment rise because the harvest was good?
* **Predict and decide:** which members are likely to struggle next season, and is it worth a field officer visiting them first?

This track spends most of its time on the middle two, because that is where careless work does the most damage. A model that predicts well but answers the wrong question, or a confident claim built on a tiny sample, can send resources to the wrong place.

## What the track covers

* **Statistics for decisions:** probability, inference, experiments and regression.
* **Programming for data science:** deeper pandas, advanced SQL and reproducible projects.
* **Predictive modelling:** classic models with scikit learn, feature engineering, honest validation, forecasting and maps.
* **Communicating results:** turning numbers into decisions, sharing them and handling personal data ethically.
* **Getting hired:** a portfolio and a realistic route into your first role.

Neural networks, language models and building AI products sit in the separate AI and Machine Learning track. The two tracks share some classic modelling on purpose; here the focus stays on evidence and decisions.

## How to work through it

Read each lesson, try the small example, then do the practice task and the quiz. You can read the lessons and do the thinking tasks on any device. The coding tasks need a laptop or desktop, because notebooks, data files and long code are hard to manage on a small screen. A free online notebook in your browser works if your own computer is slow.

## A small example

Amina works for an NGO in Bolgatanga that runs a nutrition programme. Her manager asks whether children in the programme gained more weight than children outside it. Amina describes the averages first (analyst work). Then she asks whether the two groups were similar before the programme started, how much of the gap could be chance, and what else changed that year. That second set of questions is data science, and it is what this track teaches.`,
      practice_task_md: `**Goal:** sort real questions into the four kinds before you start the track.

1. Think of an organisation you know: a cooperative, a clinic, a school, a shop or a mobile money agent.
2. Write eight questions someone there might ask of their data. Try for two of each kind: describe, infer, explain or test, predict and decide.
3. Beside each question, write the data you would need and one way the answer could mislead if done carelessly.
4. Circle the question you would most like to be able to answer by the end of this track.

**Done looks like:** a list of eight labelled questions with data needs and risks, kept in a notebook or document so you can come back to it in the final section.`,
      quiz: {
        questions: [
          {
            prompt: "A cooperative asks how many members repaid their loans on time last season. Which kind of question is this?",
            options: [
              "Describe",
              "Infer",
              "Explain or test",
              "Predict and decide",
            ],
            answer_index: 0,
            explanation: "Counting what already happened is a describing question, the kind analysts answer every day.",
          },
          {
            prompt: "What makes \"did the SMS reminder actually raise repayment?\" harder than a describing question?",
            options: [
              "It needs a bigger spreadsheet",
              "It can only be answered with a neural network",
              "Other things, such as a good harvest, could also explain a rise",
              "It has no data behind it at all",
            ],
            answer_index: 2,
            explanation: "Testing whether a change caused a result means ruling out other explanations, such as a good harvest.",
          },
          {
            prompt: "Where in SydCrest are neural networks and language models taught?",
            options: [
              "In the statistics section of this track",
              "In the separate AI and Machine Learning track",
              "In the Data Analyst track",
              "They are not taught anywhere",
            ],
            answer_index: 1,
            explanation: "The lesson says neural networks and AI products sit in the AI and Machine Learning track.",
          },
          {
            prompt: "Why do the coding tasks in this track need a laptop or desktop?",
            options: [
              "Phones cannot connect to the internet",
              "The lessons cannot be read on a phone",
              "Data science tools are only sold for computers",
              "Notebooks, data files and long code are hard to manage on a small screen",
            ],
            answer_index: 3,
            explanation: "The lesson explains that reading works anywhere but coding with notebooks and files is hard on a small screen.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "data-science-in-ghana": {
      explanation_md: `## Why this matters

Knowing where data scientists work, and what those employers actually ask for, stops you from studying in a vacuum. It also helps you see a realistic route in, rather than waiting for a perfect job title to appear.

## Who hires

Data science roles in Ghana appear at:

* **mobile money providers and banks**, studying transaction patterns, credit risk and customer behaviour
* **savings and loans companies and microfinance**, deciding who to lend to and how to remind people to repay
* **consulting and audit firms**, building analyses for clients in many sectors
* **agritech companies**, estimating yields, scoring farmers for input credit and planning extension visits
* **energy, climate and carbon projects**, working with sensor, satellite and map data
* **NGOs, research projects and development partners**, running surveys, evaluations and experiments in health, education and agriculture
* **remote employers** abroad that accept applicants based in Africa

Most of these roles are based in Accra, with some remote. Northern Ghana has many research, health and agriculture projects that need people who can analyse survey and field data, often starting under titles such as research assistant or M&E officer.

## What adverts ask for

Reading many adverts shows a consistent pattern:

* **Python** in nearly every advert, sometimes with R as an alternative
* **SQL** in most, often alongside a named database
* **statistics, inference and experiment design**, especially for the stronger roles
* **machine learning and predictive modelling**
* **dashboards and visualisation**, with Power BI and Tableau named often
* **communication with non technical people**
* a **quantitative degree** and some experience, in most adverts

Some adverts also name cloud platforms, big data tools, geospatial software or knowledge of West African languages. You do not need all of these. A strong base in statistics, Python, SQL and clear communication makes the rest learnable on the job.

## The realistic route

Few people walk straight into a data scientist post. A common path is analyst, M&E officer, research assistant or intern first, then taking on modelling work as you prove yourself. Each lesson in this track adds a skill you can use in those roles straight away, so you grow into the title rather than waiting for it.

## A small example

Issahaku is an M&E assistant for an agriculture NGO in Damongo. He already cleans survey data and builds monthly reports. He starts adding confidence intervals to his reports and suggests testing two versions of a farmer training message with random assignment. His manager notices, and he becomes the person asked to design the next evaluation. His title has not changed yet, but his work is now data science, and his portfolio shows it.`,
      practice_task_md: `**Goal:** build your own picture of the market using real adverts.

1. Search a Ghanaian job board and one remote board that welcomes Africa based applicants for "data scientist", "research analyst" and "M&E officer".
2. Pick five adverts. Do not copy their text; for each, note the employer type, location or remote, level, and the skills named.
3. Tally how often each skill appears across your five.
4. Mark which skills this track covers and which you would need to learn elsewhere.
5. Write two sentences on which entry title suits you best right now and why.

**Done looks like:** a short skills tally from five adverts, with your own notes and a chosen entry route. Keep it for the final section.`,
      quiz: {
        questions: [
          {
            prompt: "Which skill does the lesson say appears in nearly every data science advert?",
            options: [
              "Geospatial software",
              "Python",
              "Knowledge of West African languages",
              "Cloud certification",
            ],
            answer_index: 1,
            explanation: "The lesson says Python appears in nearly every advert, sometimes with R as an alternative.",
          },
          {
            prompt: "What is a common realistic route into a data scientist role?",
            options: [
              "Waiting until a data scientist post opens in your town",
              "Learning every tool named in every advert first",
              "Starting as an analyst, M&E officer, research assistant or intern and taking on modelling work",
              "Applying only to remote employers abroad",
            ],
            answer_index: 2,
            explanation: "The lesson describes growing into the role from analyst, M&E, research assistant or intern positions.",
          },
          {
            prompt: "Why might Northern Ghana offer good starting roles for this track?",
            options: [
              "Every bank headquarters is in the north",
              "Many research, health and agriculture projects there need survey and field data analysis",
              "Data scientist titles are only used in the north",
              "Northern employers do not ask for statistics",
            ],
            answer_index: 1,
            explanation: "The lesson points to research, health and agriculture projects in the north that need people to analyse field data.",
          },
          {
            prompt: "What did Issahaku do that turned his M&E work into data science?",
            options: [
              "He changed his job title himself",
              "He stopped writing monthly reports",
              "He added confidence intervals and proposed a randomised test of training messages",
              "He bought a paid analytics tool",
            ],
            answer_index: 2,
            explanation: "Adding inference and proposing a fair experiment moved his work beyond description.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "experiments": {
      explanation_md: `## Why this matters

Organisations in Ghana constantly try changes: a new SMS reminder for loan repayments, a different fee message in a mobile money app, a radio programme for farmers, a home visit schedule for community health volunteers. The question is always whether the change caused the improvement. A fair experiment is the most reliable way to know, and adverts for stronger roles name experiment design and A/B testing directly.

## Why random assignment works

If you simply compare people who chose the new thing with people who did not, the groups differ in other ways. Farmers who attend a training may already be more motivated. Randomly assigning who gets each version, by a coin flip or a computer, makes the groups alike on average in everything, including things you never measured. Then a difference in outcomes can fairly be put down to the change.

## Designing an experiment

1. **Write the question and the decision.** "Does reminder B raise on time repayment compared with reminder A? If yes by at least 3 points, we switch."
2. **Choose one main outcome** before you start, such as repaid within 7 days of the due date.
3. **Randomise at the right level.** If borrowers in the same savings group talk to each other, randomise whole groups, not individuals, or the versions leak.
4. **Work out the sample size** you need to detect the smallest difference worth acting on.
5. **Fix the run time and stick to it.** Stopping as soon as the result looks good inflates false positives.
6. **Analyse what you planned**, then report the effect with its interval.

## How many people?

Small differences need large samples. To detect a rise from 65 to 70 percent with the usual settings (5 percent significance, 80 percent power):

\`\`\`python
from statsmodels.stats.proportion import proportion_effectsize
from statsmodels.stats.power import NormalIndPower
h = proportion_effectsize(0.70, 0.65)
n = NormalIndPower().solve_power(effect_size=h,
                                 alpha=0.05, power=0.8)
print(round(n))
\`\`\`

This prints \`1376\`: about 1,376 people per version. If you only have 300 borrowers, a test this fine cannot work, and it is better to know that before you start.

## Reading the result

Suppose 312 of 500 repaid on time with reminder A and 351 of 500 with B:

\`\`\`python
from statsmodels.stats.proportion import proportions_ztest
stat, p = proportions_ztest(count=[312, 351], nobs=[500, 500])
print(round(p, 3))
\`\`\`

This prints \`0.009\`. The rise is 62.4 to 70.2 percent, nearly 8 points, unlikely to be chance. Because assignment was random, the reminder is the likely cause.

## Ethics

People in experiments deserve respect. Never test something that could harm, such as withholding a known helpful service from a sick child. For research with people, get approval from an ethics committee and informed consent where required. Tell participants what data you collect, and keep it secure.

## A small example

Abdul-Rahman at a savings and loans company in Tamale proposed testing two reminder messages. His sample size check showed he needed far more borrowers than one branch had, so he ran it across five branches, randomised by borrower, and fixed a six week window before looking at any results.`,
      practice_task_md: `**Goal:** write a complete experiment plan, ready to show a manager.

1. Pick a change worth testing in a setting you know, such as two WhatsApp messages inviting farmers to a training.
2. Write the question, the decision rule, and one main outcome.
3. Decide what to randomise (people, groups, or villages) and explain why.
4. In a free online notebook, use the sample size code from the lesson with your own baseline and target rates.
5. List two ways the experiment could be spoiled and how you would prevent each, plus one ethical risk.

**Done looks like:** a one page plan with question, decision rule, outcome, randomisation unit, sample size, run time, risks and ethics.`,
      quiz: {
        questions: [
          {
            prompt: "Why does random assignment let you say a change caused a result?",
            options: [
              "It guarantees a large sample",
              "It makes the groups alike on average, including in things you did not measure",
              "It removes the need for a main outcome",
              "It makes p values smaller",
            ],
            answer_index: 1,
            explanation: "Randomising balances the groups on average, so a difference in outcomes can be put down to the change.",
          },
          {
            prompt: "Borrowers in the same savings group talk to each other. What should you randomise?",
            options: [
              "Individual borrowers, ignoring groups",
              "Only the borrowers who volunteer",
              "Whole savings groups",
              "Nothing; just compare branches",
            ],
            answer_index: 2,
            explanation: "If people in a group talk, randomising individuals lets versions leak, so randomise whole groups.",
          },
          {
            prompt: "The sample size check says you need about 1,376 people per version but you have 300. What should you do?",
            options: [
              "Run it anyway and report any p value",
              "Stop as soon as the result looks good",
              "Recognise the test cannot detect that difference and change the design or scale",
              "Double the result to make up for the small sample",
            ],
            answer_index: 2,
            explanation: "The lesson says it is better to know before starting that a small sample cannot detect a fine difference.",
          },
          {
            prompt: "Why is stopping an experiment as soon as the result looks good a mistake?",
            options: [
              "It inflates the chance of a false positive",
              "It makes the experiment too expensive",
              "It breaks the randomisation software",
              "It always hides real effects",
            ],
            answer_index: 0,
            explanation: "Peeking and stopping early raises false positives, so fix the run time in advance.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "features-for-decisions": {
      explanation_md: `## Why this matters

Raw records rarely arrive in a form a model can use well. A list of repayment dates says little until you turn it into "days since last payment" or "number of late payments this year". The columns you build, called **features**, usually matter more than which algorithm you pick. Adverts for modelling roles name feature engineering directly, and it is where your knowledge of the people and places behind the data pays off.

## Build features that mean something

Good features come from understanding the situation. Ask what a sensible field officer would look at.

* **Time since:** days since last repayment, last transaction, or last clinic visit.
* **Counts and rates over a window:** transactions in the last 30 days, share of payments made late this season.
* **Ratios:** loan size per acre farmed, spending relative to the person's own usual level.
* **Place:** district, distance to the nearest market or clinic, rainfall zone.
* **Season:** month, or whether a date falls in the lean season before harvest.

Here is a made up example for farmers on an input credit scheme:

\`\`\`python
as_of = pd.Timestamp("2026-04-01")
paid = pd.to_datetime(farmers["last_paid"])
farmers["days_since_paid"] = (as_of - paid).dt.days
farmers["loan_per_acre"] = farmers["loan_cedis"] / farmers["acres"]
\`\`\`

A farmer who last paid on 20 February gets 40 days; one who borrowed 800 cedis for 2 acres gets 400 cedis per acre.

## Encoding and scaling

Models need numbers. Categories such as district become separate 0 or 1 columns with **one hot encoding**. Many models, including logistic regression, also work better when numeric features share a similar scale. scikit learn bundles these steps so they are learned from training data only:

\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

prep = ColumnTransformer([
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["district"]),
    ("num", StandardScaler(), ["days_since_paid", "loan_per_acre"]),
])
model = Pipeline([("prep", prep), ("clf", LogisticRegression())])
\`\`\`

\`handle_unknown="ignore"\` stops the model crashing when a new district appears later.

## Leakage: the silent killer

**Leakage** happens when a feature contains information you would not have at the moment of prediction. The model looks brilliant in testing and fails in real use. Classic examples:

* using "number of reminder calls received" to predict lateness, when calls only happen after someone is late
* computing averages over the whole dataset, including the future, before splitting
* using a "loan written off" flag to predict default

Always ask: on the day I make this prediction, would I really know this value? Set an "as of" date and build every feature only from records before it.

## Missing values carry meaning

A blank "last repayment date" might mean a new member, not missing data. Create a flag such as \`is_new_member\` rather than filling blanks with an average that hides the meaning.

## A small example

Mahama builds features for a pharmacy chain forecasting which branches will run short of malaria medicines. Branch size alone predicts little. He adds rainfall in the previous four weeks, the month, and the branch's own sales trend. These features reflect how malaria cases rise after rains, and the model improves sharply. He documents each feature with a sentence explaining why it should matter.`,
      practice_task_md: `**Goal:** design and build leak free features.

1. Create a made up table of 30 repayments for 8 farmers with dates and amounts in a free online notebook.
2. Choose an "as of" date and build at least four features per farmer: days since last payment, number of payments, average gap between payments, and one ratio of your own.
3. Write one feature that would leak the answer and explain why you will not use it.
4. Put a \`ColumnTransformer\` with one hot encoding and scaling inside a \`Pipeline\` and fit a logistic regression.
5. Write a one line reason for each feature explaining why it should matter.

**Done looks like:** a feature table, a fitted pipeline, a documented leaky feature, and a short feature dictionary.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say features often matter more than the algorithm?",
            options: [
              "Algorithms are all identical",
              "Well built features capture what actually drives the outcome, which any model can then use",
              "Features are easier to download",
              "scikit learn chooses the algorithm automatically",
            ],
            answer_index: 1,
            explanation: "Meaningful features carry the real signal, so they usually matter more than the choice of model.",
          },
          {
            prompt: "Which feature would leak the answer when predicting late repayment?",
            options: [
              "Days since the last payment, measured before the prediction date",
              "Loan size per acre",
              "Number of reminder calls, when calls only happen after someone is late",
              "The farmer's district",
            ],
            answer_index: 2,
            explanation: "Reminder calls happen after lateness, so they contain information unavailable at prediction time.",
          },
          {
            prompt: "What does `handle_unknown=\"ignore\"` do in OneHotEncoder?",
            options: [
              "Deletes rows with unknown districts from training",
              "Stops the model crashing when a category appears that was not in training",
              "Converts unknown categories into the most common one",
              "Scales numeric columns",
            ],
            answer_index: 1,
            explanation: "It lets the model handle new categories, such as a new district, without errors.",
          },
          {
            prompt: "A blank last repayment date often means a new member. What should you do?",
            options: [
              "Fill it with the average date",
              "Delete those members",
              "Ignore the column entirely",
              "Create a flag such as is_new_member",
            ],
            answer_index: 3,
            explanation: "A flag keeps the meaning of the blank instead of hiding it with an average.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "geospatial-data": {
      explanation_md: `## Why this matters

Where something happens often explains why. Yields depend on rainfall zones and soils, clinic use depends on distance, solar demand depends on grid coverage, and carbon projects depend on land cover from satellite images. Agriculture, health, energy and climate employers in Ghana use location data, and some adverts name geospatial or remote sensing skills. This lesson is optional, but valuable if you want to work in those sectors.

## Two kinds of spatial data

* **Vector data:** points, lines and shapes. A farm or clinic is a point with latitude and longitude; a road is a line; a district boundary is a polygon. Common file formats are GeoJSON, GeoPackage and shapefile.
* **Raster data:** a grid of cells, each with a value, such as satellite images, rainfall surfaces or elevation.

## Coordinates and projections

Latitude and longitude are angles on a curved Earth, so you cannot measure distance in metres with them directly. A **coordinate reference system** (CRS) describes how coordinates map to the Earth. GPS gives coordinates in the system coded EPSG:4326. To measure distances, convert to a projected system in metres. For most of Ghana, UTM zone 30N (EPSG:32630) works; eastern parts of the country fall in zone 31N.

## Nearest clinic, in code

geopandas extends pandas with a geometry column. Here are made up homes and clinics near Tamale:

\`\`\`python
import geopandas as gpd

def to_gdf(df):
    pts = gpd.points_from_xy(df.lon, df.lat)
    gdf = gpd.GeoDataFrame(df, geometry=pts, crs="EPSG:4326")
    return gdf.to_crs("EPSG:32630")

near = gpd.sjoin_nearest(to_gdf(homes), to_gdf(clinics),
                         distance_col="metres")
\`\`\`

When we ran it on three homes and two clinics, the distances came out at about 1.6 km, 7.8 km and 21.4 km. Remember these are straight lines. Real travel by road or footpath is longer, and a river without a bridge in the rainy season can make a near clinic far.

## Joining data to places

The most common task is attaching numbers to areas: join a table of district results to district boundaries by name, then draw a **choropleth** (a map shaded by value) with \`gdf.plot(column="value", legend=True)\`. Check names carefully: spellings differ between sources, and districts are sometimes created or renamed, so boundaries and data must come from the same period.

## Free tools

* **QGIS:** a free desktop program for viewing, editing and mapping spatial data, with no coding.
* **geopandas:** spatial data in Python notebooks.
* **OpenStreetMap:** free, community mapped roads, buildings and facilities.

Satellite imagery and rasters are large downloads, so work on small areas first and download once.

## Location is personal data

A household's coordinates can identify the family, especially in a small village. Never publish precise home locations from surveys. Share results by district or a coarse grid, or move points slightly at random, and store raw coordinates securely.

## A small example

Amina maps a health survey in the Northern Region to see whether distance affects whether children were fully vaccinated. She computes each household's distance to the nearest health facility, groups households into distance bands, and shows a district level map. Her published map contains no household points at all.`,
      practice_task_md: `**Goal:** compute distances and make a privacy safe map.

1. In a free online notebook, run \`pip install geopandas\` if it is missing, or install QGIS on a laptop for a no code version.
2. Create made up coordinates for ten homes and three clinics around a Northern town.
3. Use \`sjoin_nearest\` after converting to EPSG:32630 to find each home's nearest clinic and distance.
4. Group homes into distance bands (under 2 km, 2 to 5 km, over 5 km) and count each band.
5. Write two sentences on why straight line distance may understate real travel, and one on how you would share results without exposing homes.

**Done looks like:** a distance table, a band summary, and short notes on travel and privacy.`,
      quiz: {
        questions: [
          {
            prompt: "Why convert latitude and longitude to a projected system such as EPSG:32630 before measuring distance?",
            options: [
              "GPS coordinates are always wrong",
              "Latitude and longitude are angles, so distances in metres need a projected system",
              "geopandas cannot read EPSG:4326",
              "Projected systems make files smaller",
            ],
            answer_index: 1,
            explanation: "Measuring in metres needs a projected coordinate system rather than angles.",
          },
          {
            prompt: "A satellite image of rainfall stored as a grid of cells is which kind of data?",
            options: [
              "Vector data",
              "A shapefile of points",
              "Raster data",
              "A choropleth",
            ],
            answer_index: 2,
            explanation: "Raster data is a grid of cells, each with a value.",
          },
          {
            prompt: "Why might a clinic 3 km away in a straight line be far in practice?",
            options: [
              "Straight line distances are always overestimates",
              "Roads, footpaths and rivers in the rainy season can make real travel much longer",
              "Clinics move often",
              "The CRS was wrong",
            ],
            answer_index: 1,
            explanation: "Real travel follows roads and crossings, so straight line distance can understate it.",
          },
          {
            prompt: "How should you share a map from a household health survey?",
            options: [
              "Publish every household point so it is accurate",
              "Show results by district or a coarse grid, without precise home locations",
              "Share raw coordinates with anyone who asks",
              "Only share the map on WhatsApp",
            ],
            answer_index: 1,
            explanation: "Precise coordinates can identify families, so share aggregated results.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "inference-and-hypothesis-tests": {
      explanation_md: `## Why this matters

Managers constantly ask "is this difference real?" Did the northern branch really have more late repayments, or is it noise? Did the new seed variety really yield more? Inference gives you an honest answer, and just as important, it stops you from announcing discoveries that vanish next month.

## Confidence intervals

A sample estimate on its own hides its uncertainty. A **confidence interval** gives a range of plausible values for the true figure. Suppose 246 of 300 sampled farmers repaid an input loan on time, an estimate of 82 percent:

\`\`\`python
from statsmodels.stats.proportion import proportion_confint
low, high = proportion_confint(count=246, nobs=300,
                               method="wilson")
print(round(low, 3), round(high, 3))
\`\`\`

This prints \`0.773 0.859\`. You would report: "We estimate 82 percent repay on time; a 95 percent confidence interval runs from about 77 to 86 percent." The 95 percent describes the method: if you repeated the sampling many times, about 95 in 100 intervals built this way would contain the true rate. It does not mean there is a 95 percent chance this particular interval is right, though in plain speech "we are fairly confident the true rate is in this range" is acceptable.

Wider intervals mean more uncertainty. Bigger samples give narrower intervals.

## Hypothesis tests and p values

A hypothesis test starts from a **null hypothesis**, usually "there is no difference". You then ask: if the null were true, how surprising would data like mine be? The **p value** is that probability. A small p value, conventionally below 0.05, means the data would be unusual if there were no difference, so you reject the null.

Know what a p value is **not**:

* It is not the probability that the null hypothesis is true.
* It does not tell you how big or important the difference is.
* A p value above 0.05 does not prove there is no difference; the sample may just be too small to see it.

## Size matters more than stars

With a huge dataset, such as millions of transactions, tiny and useless differences become "significant". With a small survey, important differences can fail to reach significance. So always report the **effect size** with its confidence interval. "Branch A's on time rate is 3 points higher, interval 1 to 5 points" is far more useful than "p = 0.002".

## Traps to avoid

* **Testing many things and reporting the one that worked.** Run twenty tests on random noise and, on average, one will fall below 0.05 by chance. Decide your main question before you look.
* **Biased samples.** No formula fixes a sample that left out people without phones or those far from the road.
* **Confusing statistical with practical significance.**

## A small example

Mariama compares two maize varieties on demonstration plots near Savelugu. Variety B averages 140 kg more per acre, p = 0.21. She does not write "no difference". She writes that B looked better, the interval runs from a loss to a large gain, and more plots are needed before advising farmers to switch.`,
      practice_task_md: `**Goal:** compute and explain a confidence interval and a test.

1. In a free online notebook, run the confidence interval code from the lesson.
2. Change the sample to 82 of 100 and then to 820 of 1,000. Record each interval and describe how the width changes.
3. Use \`proportions_ztest\` from \`statsmodels.stats.proportion\` to compare two made up branches: 246 of 300 on time versus 228 of 300. Record the p value and the difference in rates.
4. Write a four sentence summary for a manager that includes the difference, its uncertainty, and whether you would act on it.

**Done looks like:** three intervals with a note on width, one test result, and a short plain language summary that avoids the traps in the lesson.`,
      quiz: {
        questions: [
          {
            prompt: "What is the best plain way to report 246 of 300 farmers repaying, with interval 0.773 to 0.859?",
            options: [
              "Exactly 82 percent of all farmers repay",
              "We estimate 82 percent repay on time, plausibly between about 77 and 86 percent",
              "There is a 0.773 chance a farmer repays",
              "The interval proves the rate is 86 percent",
            ],
            answer_index: 1,
            explanation: "A confidence interval gives a range of plausible values around the estimate.",
          },
          {
            prompt: "What does a p value measure?",
            options: [
              "The probability that the null hypothesis is true",
              "How large and important a difference is",
              "How surprising data like yours would be if there were no real difference",
              "The share of the sample that was wrong",
            ],
            answer_index: 2,
            explanation: "The p value is the probability of data this extreme if the null hypothesis were true.",
          },
          {
            prompt: "Mariama's test gave p = 0.21. What is the correct conclusion?",
            options: [
              "The two varieties definitely yield the same",
              "Variety B is definitely better",
              "The plots must have been measured wrongly",
              "The data cannot rule out chance, so more evidence is needed before advising a switch",
            ],
            answer_index: 3,
            explanation: "A large p value does not prove no difference; the sample may be too small to see it.",
          },
          {
            prompt: "Why can tiny, useless differences become significant in very large datasets?",
            options: [
              "Large datasets always contain errors",
              "With huge samples even very small differences produce small p values",
              "Software rounds p values down for big files",
              "Large datasets are never randomly sampled",
            ],
            answer_index: 1,
            explanation: "The lesson explains that with millions of records tiny differences reach significance, so effect size matters.",
          },
          {
            prompt: "What is wrong with running twenty tests and reporting only the one below 0.05?",
            options: [
              "Nothing, it is efficient",
              "Statsmodels does not allow it",
              "One in twenty tests on pure noise can fall below 0.05 by chance",
              "It makes confidence intervals wider",
            ],
            answer_index: 2,
            explanation: "Many tests on noise produce false positives by chance, so the main question should be fixed in advance.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "machine-learning-basics": {
      explanation_md: `## Why this matters

scikit learn is the standard free Python library for classic machine learning, and adverts that name a library name it often. Its consistent pattern means once you can train one model, you can train dozens. More important than any single model is the habit of comparing against a baseline and measuring what matters for the decision.

## Regression and classification

* **Regression** predicts a number: yield in kilograms, next month's sales, a household's water use.
* **Classification** predicts a category: repaid or late, will buy or not, high or low risk. Most classifiers also give a probability, which is often more useful than the label.

## The scikit learn pattern

Every model follows the same steps: create it, \`fit\` on training data, then \`predict\` or \`predict_proba\` on new data. Keep some data aside that the model never sees during training, so you can test it fairly.

Here is a made up dataset of 2,000 borrowers with loan size, past late payments and months of membership, where about 17 percent paid late:

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42)
base = DummyClassifier(strategy="most_frequent")
base.fit(X_train, y_train)
model = make_pipeline(StandardScaler(), LogisticRegression())
model.fit(X_train, y_train)
risk = model.predict_proba(X_test)[:, 1]
\`\`\`

## The accuracy trap

When we ran this, the baseline that predicts "on time" for everyone scored 83 percent accuracy. So did the logistic regression's yes or no labels. Yet the baseline caught zero late payers. Accuracy looks impressive when one outcome is rare, and it hides failure.

Instead, use the probabilities to rank borrowers. In our run, the quarter of test borrowers with the highest predicted risk included about half of all the late payers, roughly double what picking a quarter at random would catch. That is a result a manager can use: "if officers call the top quarter, they reach about half of those likely to be late."

## Common models

* **Linear and logistic regression:** fast, stable, easy to explain. Always try first.
* **Decision trees:** a series of yes or no splits, easy to draw, but a single deep tree overfits.
* **Random forests and gradient boosting:** many trees combined; often strong on tabular data, harder to explain.

In our run, a random forest did slightly worse than logistic regression. Complex models do not always win, especially with few features or small data. That is exactly why you compare.

## Explaining the model

Decision makers will ask why. For logistic regression, coefficients show direction. For any model, scikit learn's \`permutation_importance\` shows how much performance drops when each feature is shuffled. Report it in plain words: "past late payments matter most; loan size matters a little."

## A small example

Sumaila builds a model to predict which villages will need extra seed stock. A random forest scores slightly better than linear regression, but the difference is within the variation he sees between test runs, and the cooperative's board wants to understand the logic. He chooses linear regression, explains its three main factors in a short note, and keeps the forest for comparison next season.`,
      practice_task_md: `**Goal:** train a model, beat a baseline, and report it in plain words.

1. In a free online notebook, generate made up borrower data with numpy (loan size, past late payments, months of membership, and a late flag that depends on them).
2. Split into training and test sets with \`stratify=y\` and \`random_state=42\`.
3. Fit a \`DummyClassifier\` baseline and a logistic regression. Record accuracy for both.
4. Rank test borrowers by predicted risk and work out what share of late payers fall in the top quarter.
5. Try a \`RandomForestClassifier\` and compare.
6. Write three sentences for a manager explaining which model you recommend and why.

**Done looks like:** a notebook with the baseline, two models, a top quarter capture rate, and a plain language recommendation.`,
      quiz: {
        questions: [
          {
            prompt: "A baseline that predicts \"on time\" for everyone scores 83 percent accuracy. What does this show?",
            options: [
              "The baseline is an excellent model",
              "Accuracy can look high when one outcome is rare while catching none of the cases that matter",
              "Logistic regression is not needed for any problem",
              "The data must be wrong",
            ],
            answer_index: 1,
            explanation: "The baseline caught zero late payers despite high accuracy, which is the accuracy trap.",
          },
          {
            prompt: "What does `predict_proba` give you that `predict` does not?",
            options: [
              "The training data",
              "The model's coefficients",
              "A probability for each case, which lets you rank by risk",
              "A confidence interval for accuracy",
            ],
            answer_index: 2,
            explanation: "Probabilities let you rank cases, such as borrowers by risk, rather than only labelling them.",
          },
          {
            prompt: "In the example, a random forest did slightly worse than logistic regression. What is the lesson?",
            options: [
              "Random forests are always worse",
              "Logistic regression is always best",
              "Complex models do not always win, so you compare against simpler ones",
              "The test set must have been too large",
            ],
            answer_index: 2,
            explanation: "The lesson stresses comparing models because complexity does not guarantee better results.",
          },
          {
            prompt: "Which tool shows how much performance drops when each feature is shuffled?",
            options: [
              "train_test_split",
              "DummyClassifier",
              "StandardScaler",
              "permutation_importance",
            ],
            answer_index: 3,
            explanation: "permutation_importance measures each feature's contribution by shuffling it and seeing the drop.",
          },
          {
            prompt: "Which kind of task is predicting a household's water use in litres?",
            options: [
              "Regression",
              "Classification",
              "Clustering",
              "Hypothesis testing",
            ],
            answer_index: 0,
            explanation: "Predicting a number such as litres is a regression task.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "model-validation": {
      explanation_md: `## Why this matters

A model that looks excellent on the data it learned from can fail badly on new cases. When that model decides who gets a loan offer or which villages get extra seed, the failure lands on real people. Testing models honestly is a core part of the job, named directly in skills frameworks for data scientists.

## Overfitting

A model **overfits** when it memorises quirks of its training data instead of general patterns. A very deep decision tree can score perfectly on training data and poorly on anything else. The cure is to always judge a model on data it has not seen, and to prefer simpler models when they do about as well.

## Train, validate, test

* **Training set:** the model learns from it.
* **Validation:** used to compare models and settings.
* **Test set:** locked away and used once at the end, to report final performance.

If you keep checking the test set while tuning, it stops being a fair test.

## Cross validation

With modest data, one split can be lucky or unlucky. **Cross validation** splits the data into, say, five folds, trains on four and tests on the fifth, rotating through all five:

\`\`\`python
from sklearn.model_selection import cross_val_score, StratifiedKFold
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv, scoring="roc_auc")
print(scores.round(2), round(scores.mean(), 2))
\`\`\`

On our made up borrower data it printed \`[0.7 0.69 0.73 0.71 0.7] 0.71\`. The spread between folds tells you how much a score moves by chance. A rival model that beats this by 0.01 has not clearly won.

Put all preparation (scaling, encoding, filling blanks) inside a \`Pipeline\`, so each fold learns it only from its own training part.

## Respect time

If you predict the future, test on the future. Randomly shuffling last year's and this year's records lets the model peek ahead. Train on earlier months and test on later ones, or use \`TimeSeriesSplit\`. This is one of the most common ways models look better in testing than in use.

## Choose a measure that fits the decision

* **ROC AUC:** how well the model ranks positives above negatives; 0.5 is random, 1 is perfect.
* **Precision:** of those flagged, how many really were late.
* **Recall:** of all who were late, how many were flagged.
* For numbers, **mean absolute error** in real units, such as kilograms, is easy to explain.

If officers can make only 40 visits, measure how many struggling customers the top 40 contain.

## Check every group

A model can work well on average and badly for one region, gender or age group. Score it separately for each:

\`\`\`python
test.groupby("region")[["late", "risk"]].apply(
    lambda g: roc_auc_score(g.late, g.risk))
\`\`\`

In our made up run, scores were 0.69 for Northern, 0.67 for Upper East and 0.64 for Upper West, but Upper West had only 41 test borrowers, so its score is very uncertain. The honest report says so and recommends collecting more data there before relying on the model.

## A small example

Hawa's yield model scored brilliantly until she noticed the training data included the harvest month's rainfall, which is unknown at planting time. Removing it lowered the score to something real, and the cooperative could actually use it.`,
      practice_task_md: `**Goal:** validate a model honestly and report its weak spots.

1. Using the borrower data from the machine learning lesson, add a made up \`region\` column.
2. Run five fold cross validation with a pipeline and record the mean and the spread.
3. Score the model separately for each region and note how many test rows each has.
4. Train a very deep \`DecisionTreeClassifier\` and compare its training score with its cross validated score.
5. Write a short validation note: overall performance, spread, group results, and one limitation.

**Done looks like:** cross validation scores, group scores with counts, an overfitting comparison, and a plain language validation note.`,
      quiz: {
        questions: [
          {
            prompt: "What does it mean when a model overfits?",
            options: [
              "It is too simple to learn anything",
              "It memorises quirks of the training data and does poorly on new data",
              "It was trained on too much data",
              "It has a perfect test score",
            ],
            answer_index: 1,
            explanation: "Overfitting is memorising training quirks instead of general patterns.",
          },
          {
            prompt: "Why put scaling and encoding inside a Pipeline when cross validating?",
            options: [
              "So each fold learns preparation only from its own training part",
              "Because Pipelines run faster on phones",
              "Because cross validation cannot run without scaling",
              "So the test set is used during training",
            ],
            answer_index: 0,
            explanation: "A Pipeline keeps preparation inside each fold, avoiding leakage from the test part.",
          },
          {
            prompt: "You are predicting next season's defaults. How should you split the data?",
            options: [
              "Shuffle all seasons randomly",
              "Test on the oldest season",
              "Train on earlier periods and test on later ones",
              "Use the same data for training and testing",
            ],
            answer_index: 2,
            explanation: "When predicting the future, test on later data so the model cannot peek ahead.",
          },
          {
            prompt: "Of all borrowers who were late, the share the model flagged is called what?",
            options: [
              "Precision",
              "Recall",
              "ROC AUC",
              "Mean absolute error",
            ],
            answer_index: 1,
            explanation: "Recall is the share of actual positives that the model flagged.",
          },
          {
            prompt: "Upper West scored 0.64 but had only 41 test borrowers. What is the honest report?",
            options: [
              "Upper West borrowers are riskier",
              "The model is broken everywhere",
              "Drop Upper West from the report",
              "The score is very uncertain, so more data is needed before relying on the model there",
            ],
            answer_index: 3,
            explanation: "Small groups give uncertain scores, which an honest report states clearly.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "predictive-modelling": {
      explanation_md: `## Why this matters

Organisations need to plan before things happen. A lender wants to know which borrowers may struggle so a field officer can call early. An agritech company wants yield estimates before harvest to arrange storage and buyers. A health programme wants to know which months will be busiest at clinics. Predictive models turn past records into these estimates, and most data science adverts name machine learning or predictive modelling.

## Prediction is not explanation

The statistics section asked "what caused this?" This section asks "what is likely to happen?" The two need different habits. A model can predict well using features that cause nothing: a household that tops up airtime often may be a good credit risk, but airtime does not cause repayment. That is fine for prediction, as long as you never present the model as proof of cause, and as long as the features are fair and lawful to use.

## Models serve decisions

A good modelling project in this track starts from a decision, not an algorithm.

* **What action will the prediction trigger?** A phone call, a visit, a loan offer, extra stock.
* **What does each mistake cost?** Missing a struggling borrower costs one thing; calling a reliable one costs another.
* **What will you compare against?** A simple rule, such as "call everyone who was late last season", is the baseline the model must beat.

If a model cannot beat a sensible simple rule, it does not get used, however clever it looks.

## What this section covers

* **Machine learning with scikit learn:** training regression and classification models, from logistic regression to decision trees and random forests, always against a baseline.
* **Feature engineering:** building meaningful columns from raw records without leaking the answer.
* **Validating models honestly:** testing on unseen data, cross validation, measures that match the decision, and checking performance for every group.
* **Forecasting with time series:** trends, seasons and forecast uncertainty.
* **Maps and geospatial data (optional):** joining and mapping data by place.

Neural networks and deep learning, which suit images, audio and language, are taught in the AI and Machine Learning track. For the tables of records that most Ghanaian organisations hold, the classic methods here are usually the right first choice: easier to explain, quicker to train on a modest laptop, and often just as accurate.

## A small example

Ayishetu works for a solar home system company that sells on credit in the Upper West Region. Her manager asks for "an AI model" to predict missed payments. Ayishetu first asks what happens with the prediction. Answer: an agent visits the customer. Agents can make about 40 visits a week. So the real task is ranking customers so the 40 visits go where they help most. She compares her model against the current rule (visit anyone more than a week late) and shows how many more struggling customers the model's top 40 would reach. The manager now understands what the model is for and how to judge it.`,
      practice_task_md: `**Goal:** frame a predictive project around a decision before touching code.

1. Pick a setting: a savings group, an input credit scheme, a pharmacy's stock, or a clinic's patient numbers.
2. Write the prediction you would make and the action it triggers.
3. List the two kinds of mistake the model could make and what each costs in plain words.
4. Write a simple rule that could act as a baseline.
5. Note any feature you would refuse to use because it would be unfair, unlawful or invasive.

**Done looks like:** a half page project framing with prediction, action, costs of mistakes, baseline rule and excluded features.`,
      quiz: {
        questions: [
          {
            prompt: "A model uses airtime top up frequency to predict loan repayment. What can you fairly claim?",
            options: [
              "Airtime top ups cause people to repay",
              "It may predict repayment well, but it does not show that airtime causes repayment",
              "The model must be wrong because airtime is unrelated to loans",
              "Prediction and explanation are the same thing",
            ],
            answer_index: 1,
            explanation: "Features can predict without causing anything, so a predictive model is never proof of cause.",
          },
          {
            prompt: "Where should a good modelling project start?",
            options: [
              "With the most advanced algorithm available",
              "With the largest possible dataset",
              "With the decision the prediction will trigger",
              "With a dashboard design",
            ],
            answer_index: 2,
            explanation: "The lesson says modelling for decisions starts by asking what action the prediction triggers.",
          },
          {
            prompt: "What is a baseline in predictive modelling?",
            options: [
              "A simple rule or model the new model must beat to be worth using",
              "The first row of the dataset",
              "The most complex model you can build",
              "The test score you hope to reach",
            ],
            answer_index: 0,
            explanation: "A baseline, such as a simple rule, sets the bar the model must clear.",
          },
          {
            prompt: "Why did Ayishetu treat the task as ranking customers?",
            options: [
              "Ranking is the only thing scikit learn can do",
              "Her manager asked for a ranking by name",
              "Agents could make a limited number of visits, so the visits needed to go where they help most",
              "Customers asked to be ranked",
            ],
            answer_index: 2,
            explanation: "With limited visits each week, the useful output was an ordered list of who to visit first.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "probability-and-distributions": {
      explanation_md: `## Why this matters

Every survey, experiment and model you build rests on probability. If you understand how random variation behaves, you can tell a lender whether a jump in defaults is alarming or normal, and tell an NGO why 400 households can say something useful about a district of thousands.

## Probability in one paragraph

A probability is a number from 0 to 1 describing how likely something is. If 3 in every 10 maize farmers in a cooperative grow soya too, the probability that a randomly chosen member grows soya is 0.3. Two rules carry you a long way. The chance that something does **not** happen is 1 minus the chance it does. And for independent events, the chance that both happen is the product: two randomly chosen members both growing soya has probability 0.3 × 0.3 = 0.09.

## Distributions: the shape of variation

A distribution describes which values a variable takes and how often. Three shapes appear constantly.

* **Binomial:** counts of yes or no outcomes, such as how many of 20 borrowers repay on time.
* **Normal:** the symmetric bell shape, common for measurements like heights, and central to inference.
* **Skewed:** most values small with a long tail of large ones, typical of incomes, mobile money transaction amounts and farm sizes.

For skewed data the mean is pulled up by the tail, so the median often describes a typical value better. Always plot a histogram before choosing a summary.

## Spread: standard deviation

The standard deviation measures how far values typically sit from the mean. Roughly: square each distance from the mean, average those squares, then take the square root. For data close to a normal shape, about two thirds of values sit within one standard deviation of the mean and about 95 percent within two.

## The most useful fact in statistics

Take many random samples from any population, even a skewed one, and calculate the mean of each. Those sample means form a near normal distribution centred on the true mean, and their spread shrinks as samples get bigger. This is the **central limit theorem**. The spread of sample means is called the **standard error**, roughly the standard deviation divided by the square root of the sample size.

You can see it with a simulation on made up farm yields:

\`\`\`python
import numpy as np
rng = np.random.default_rng(1)
farms = rng.gamma(shape=2, scale=400, size=4000)
means = [rng.choice(farms, 100).mean()
         for _ in range(1000)]
print(round(farms.mean()), round(np.mean(means)),
      round(np.std(means)))
\`\`\`

When we ran it, it printed \`785 785 53\`. The 4,000 yields are skewed, yet the 1,000 sample means centre on the true mean of 785 kg, and most fall within about 106 kg (two standard errors) of it.

## A small example

Fuseini checks a savings group's records. Weekly deposits are skewed: most members save small amounts, a few save a lot. He reports the median deposit, not the mean. When asked whether a sample of 50 members can estimate the group's average deposit, he explains that the sample mean will vary, but predictably, and that quadrupling the sample would roughly halve the standard error.`,
      practice_task_md: `**Goal:** see the central limit theorem with your own eyes.

1. Open a free online notebook. Run the simulation from the lesson.
2. Change the sample size from 100 to 25, then to 400. Write down the standard error each time.
3. Plot histograms of \`farms\` and of \`means\` (use \`import matplotlib.pyplot as plt\` and \`plt.hist\`). Describe each shape in one sentence.
4. If you only have a phone today, use the free Seeing Theory site in your browser to draw samples and watch the sample means build up.
5. Write three sentences explaining to a cooperative manager why a sample of 100 farmers can estimate the average yield.

**Done looks like:** three standard errors that shrink as samples grow, two described histograms, and a plain language explanation.`,
      quiz: {
        questions: [
          {
            prompt: "In a cooperative, the probability a randomly chosen member grows soya is 0.3. What is the probability a member does not grow soya?",
            options: [
              "0.3",
              "0.09",
              "0.7",
              "1.3",
            ],
            answer_index: 2,
            explanation: "The chance something does not happen is 1 minus the chance it does, so 1 minus 0.3 is 0.7.",
          },
          {
            prompt: "Mobile money transaction amounts are heavily skewed. Which summary usually describes a typical transaction better?",
            options: [
              "The mean",
              "The median",
              "The largest value",
              "The standard error",
            ],
            answer_index: 1,
            explanation: "A long tail pulls the mean up, so the median often describes a typical value better for skewed data.",
          },
          {
            prompt: "What does the central limit theorem say about sample means?",
            options: [
              "They form a near normal distribution centred on the true mean, even if the population is skewed",
              "They are always exactly equal to the population mean",
              "They only work when the population is already normal",
              "They become more spread out as samples get bigger",
            ],
            answer_index: 0,
            explanation: "Sample means settle into a near normal shape around the true mean, with spread shrinking as sample size grows.",
          },
          {
            prompt: "Roughly what happens to the standard error if you make a sample four times bigger?",
            options: [
              "It doubles",
              "It stays the same",
              "It falls to a quarter",
              "It roughly halves",
            ],
            answer_index: 3,
            explanation: "Standard error is about the standard deviation divided by the square root of the sample size, and the square root of 4 is 2.",
          },
          {
            prompt: "In the simulation, why did the sample means centre on 785 kg?",
            options: [
              "Because the yields were normally distributed",
              "Because the mean of many sample means sits at the true population mean",
              "Because the code rounded every value to 785",
              "Because only 100 farms existed",
            ],
            answer_index: 1,
            explanation: "Sample means centre on the true mean of the population, which was 785 kg in that run.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "programming-for-data-science": {
      explanation_md: `## Why this matters

An analyst can often get away with a one off spreadsheet or a notebook full of copied cells. A data scientist's work is reused: the same model is retrained next quarter, the same survey analysis runs on the next round, a colleague picks up your project when you go on leave. Adverts reflect this. Python appears in nearly all of them, SQL in most, and the stronger ones mention clean code, Git or software design. Code that others can read, rerun and trust is part of the job, not a bonus.

## What changes from analyst code

As an analyst you learned to load a file, filter it, group it and chart it. In this section you move from "it worked once on my machine" to "anyone can run it again and get the same answer". That means:

* **Functions instead of copied cells.** If you clean the same columns every month, write a function once and call it.
* **Reshaping and joining with confidence.** Real projects combine several tables: transactions with agent details, survey answers with household rosters, yields with rainfall. Joins that silently duplicate rows are one of the most common sources of wrong answers.
* **Doing heavy work in the database.** When data lives in a database with millions of rows, you prepare it with SQL before pulling a manageable table into Python.
* **Version control and records.** Git keeps a history of every change, and a short record of data sources and library versions lets someone repeat your work.

## What this section covers

* **Python, NumPy and pandas in depth:** dates, reshaping, joins with checks, and writing reusable functions.
* **Advanced SQL:** common table expressions, subqueries and window functions such as running totals and "previous value" lookups.
* **Git and reproducible analysis:** project layout, version control, recording environments, and keeping secrets and personal data out of shared code.

## Where to practise

The coding in this section needs a laptop or desktop. A free online notebook works in a browser on a modest machine. For SQL, many free browser based playgrounds let you run queries without installing anything, and SQLite runs inside Python with no setup. Save data by downloading datasets once and working offline where you can.

## A small example

Salifu joined an agritech company in Tamale and inherited a notebook that produced a monthly farmer report. It had 140 cells, many copied with small changes, and a join that counted some farmers twice whenever they had two plots. He rewrote it as three functions: load, clean and summarise. He added a check that the number of farmers stayed the same after each join, moved the heaviest filtering into a SQL query, and put the project in Git. The next month the report ran in minutes, and his manager trusted the numbers because Salifu could explain every step.`,
      practice_task_md: `**Goal:** audit a notebook and plan how to make it reproducible.

1. Open any notebook you wrote during the Data Analyst track (or a public notebook on a free platform).
2. List every place where code is copied with small changes.
3. List every join or merge, and note whether anything checks the row count before and after.
4. Write down every file, website or database the notebook depends on, and which library versions it uses (run \`pd.__version__\` for pandas).
5. Write a short plan: which functions you would create, which checks you would add, and how someone else could rerun it.

**Done looks like:** a one page audit with copied code, joins, dependencies and a clear improvement plan.`,
      quiz: {
        questions: [
          {
            prompt: "Why does a data scientist's code need to be rerunnable by others?",
            options: [
              "Because notebooks cannot be saved",
              "Because models and analyses are reused, retrained and handed to colleagues",
              "Because Python only runs once per file",
              "Because managers read the code instead of reports",
            ],
            answer_index: 1,
            explanation: "The lesson explains that data science work is reused, so others must be able to read and rerun it.",
          },
          {
            prompt: "What went wrong in the notebook Salifu inherited?",
            options: [
              "It used SQL instead of Python",
              "It had no charts",
              "A join counted some farmers twice when they had two plots",
              "It was stored in Git",
            ],
            answer_index: 2,
            explanation: "The join silently duplicated farmers who had two plots, a common source of wrong answers.",
          },
          {
            prompt: "When data has millions of rows in a database, what does the lesson recommend?",
            options: [
              "Download everything into a spreadsheet first",
              "Prepare it with SQL in the database, then pull a manageable table into Python",
              "Avoid using the database at all",
              "Copy the data into many notebook cells",
            ],
            answer_index: 1,
            explanation: "The lesson says to do heavy preparation in SQL before bringing a smaller table into Python.",
          },
          {
            prompt: "Which habit helps someone repeat your analysis later?",
            options: [
              "Keeping the data source a secret",
              "Deleting old versions of the code",
              "Recording data sources and library versions, and using Git",
              "Writing all code in a single long cell",
            ],
            answer_index: 2,
            explanation: "Recording sources and versions and keeping history in Git lets others repeat the work.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "python-data-stack": {
      explanation_md: `## Why this matters

Most of a data scientist's time goes on preparing data, not modelling. Transactions arrive with text dates, survey rounds need reshaping, and tables need joining. Doing this cleanly in pandas, with checks, is what makes later models trustworthy. Adverts that name Python often name pandas and NumPy alongside it.

## NumPy in a sentence

NumPy stores numbers in arrays and applies operations to a whole array at once. pandas is built on it. Whenever you can, write \`df["amount"] * 1.1\` rather than a loop over rows: it is clearer and much faster.

## Dates

Convert text to real dates once with \`pd.to_datetime\`, then use the \`.dt\` accessor: \`.dt.month\`, \`.dt.day_name()\`, \`.dt.hour\`, or \`.dt.to_period("W")\` for weeks. Date arithmetic then works: subtracting two dates gives a gap you can turn into days with \`.dt.days\`.

## Reshaping

* **Wide to long** with \`melt\`: a survey with columns \`round1\`, \`round2\`, \`round3\` becomes one row per household per round, which suits grouping and plotting.
* **Long to wide** with \`pivot_table\`: one row per district and one column per week, ready for a report.

## Joins with checks

\`merge\` is powerful and dangerous. If the lookup table has duplicate keys, rows multiply silently. Protect yourself:

* pass \`validate="many_to_one"\` so pandas raises an error if the right table has duplicate keys
* compare \`len(df)\` before and after
* use \`indicator=True\` to see rows that did not match

## Write functions

Wrap repeated steps in a function with a clear name. Here is a made up example of agent transactions, described generically, summarised by district and week:

\`\`\`python
import pandas as pd

def weekly_summary(tx, agents):
    tx = tx.assign(time=pd.to_datetime(tx["time"]))
    tx["week"] = tx["time"].dt.to_period("W").astype(str)
    out = tx.merge(agents, on="agent", how="left",
                   validate="many_to_one")
    return out.pivot_table(index="district", columns="week",
                           values="amount", aggfunc="sum",
                           fill_value=0)
\`\`\`

With five sample transactions from two agents, one in Tamale and one in Yendi, it returned a small table: Tamale 50 cedis in the first week and 260 in the second, Yendi 200 then 0. Next month you call \`weekly_summary(new_tx, agents)\` instead of repeating ten cells.

## Text and categories

Clean text with the \`.str\` accessor: \`.str.strip().str.title()\` turns " tamale " and "TAMALE" into "Tamale". Convert repeated labels such as district to the \`category\` type to save memory on large files.

## Large files on modest machines

Read only the columns you need with \`usecols\`, set types with \`dtype\`, and for files bigger than memory, read in pieces with \`chunksize\` and combine summaries. This matters on a laptop with little RAM.

## A small example

Napari has three rounds of a household survey from the Northern Region, each in its own file with slightly different column names. She writes a \`load_round\` function that renames columns to one standard, stacks the rounds with \`pd.concat\`, melts the food security questions into long form, and merges in a district table with \`validate\`. When the fourth round arrives, she adds one line.`,
      practice_task_md: `**Goal:** build a reusable cleaning and summary function.

1. In a free online notebook, create a made up table of 20 agent transactions with columns \`agent\`, \`time\` (as text), and \`amount\`, plus a table of agents and districts.
2. Copy the \`weekly_summary\` function from the lesson and run it.
3. Add a deliberate duplicate agent to the agents table and run it again. Read the error that \`validate\` raises and explain it in one sentence.
4. Add a step that cleans messy district names with \`.str.strip().str.title()\`.
5. Add a column for the hour of day and find the busiest hour per district.

**Done looks like:** a working function, a captured \`validate\` error with your explanation, and a busiest hour table.`,
      quiz: {
        questions: [
          {
            prompt: "Why is `df[\"amount\"] * 1.1` better than looping over rows?",
            options: [
              "Loops are not allowed in Python",
              "NumPy applies the operation to the whole array at once, which is clearer and faster",
              "It changes the data type to text",
              "It only works on small tables",
            ],
            answer_index: 1,
            explanation: "Whole array operations are clearer and much faster than row by row loops.",
          },
          {
            prompt: "What does `validate=\"many_to_one\"` do in a pandas merge?",
            options: [
              "It deletes rows that do not match",
              "It sorts the result by key",
              "It converts dates automatically",
              "It raises an error if the right table has duplicate keys",
            ],
            answer_index: 3,
            explanation: "The validate option stops silent row multiplication by raising an error on duplicate keys.",
          },
          {
            prompt: "A survey has columns round1, round2 and round3. Which tool turns it into one row per household per round?",
            options: [
              "melt",
              "pivot_table",
              "to_datetime",
              "usecols",
            ],
            answer_index: 0,
            explanation: "melt reshapes wide data to long form, one row per household per round.",
          },
          {
            prompt: "Your laptop has little memory and the file is very large. Which approach does the lesson suggest?",
            options: [
              "Open it in a spreadsheet instead",
              "Buy a new laptop before starting",
              "Read only needed columns with usecols and process in pieces with chunksize",
              "Delete half the rows at random",
            ],
            answer_index: 2,
            explanation: "Reading fewer columns and processing in chunks lets modest machines handle big files.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "regression-analysis": {
      explanation_md: `## Why this matters

Many questions involve several factors at once. Does fertiliser raise maize yield once you allow for rainfall? Do borrowers with longer histories repay better once you allow for loan size? Regression estimates how an outcome changes with one factor while holding others steady. It is the workhorse of research, evaluation and credit analysis, and the starting point for predictive models.

## The idea

Linear regression fits an equation of the form:

\`\`\`
yield = intercept + b1 × fertiliser + b2 × rainfall + error
\`\`\`

Each **coefficient** (b1, b2) says how much the outcome changes, on average, when that factor rises by one unit and the other factors stay the same. The error term is everything the model does not capture.

## Fitting one in Python

With statsmodels and a pandas table \`df\` holding one row per farm:

\`\`\`python
import statsmodels.formula.api as smf
model = smf.ols("yield_kg ~ fertiliser_kg + rain_mm",
                data=df).fit()
print(model.params.round(2))
print(model.conf_int().round(2))
\`\`\`

On a made up dataset of 200 farms we generated, the fertiliser coefficient was 3.68 with a 95 percent interval of 3.15 to 4.20, and rainfall was 0.44 (0.33 to 0.54). In words: comparing farms with the same rainfall, each extra kilogram of fertiliser went with about 3.7 kg more maize, and we are fairly confident the true figure lies between about 3.2 and 4.2. \`model.summary()\` prints a fuller table with p values and R squared.

## Reading the output carefully

* **R squared** is the share of variation in the outcome the model explains. Our example gave 0.56. A low R squared does not make a coefficient wrong; it means other things matter too.
* **Categorical factors** such as district enter as comparisons with a reference category. Write \`C(district)\` in the formula.
* **Check the residuals** (actual minus predicted). Plot them against predictions; a curve or funnel shape means the straight line assumption is poor.
* For yes or no outcomes such as repaid or not, use **logistic regression** (\`smf.logit\`), whose coefficients describe changes in the log odds; \`np.exp(model.params)\` turns them into odds ratios.

## Association is not causation

This is the most important point in the lesson. A regression on observational data shows association while holding the included factors steady. It cannot rule out factors you left out. Farmers who use more fertiliser may also have better land, more labour or closer markets. If those are not in the model, the fertiliser coefficient absorbs their effect. Only random assignment, or a very careful design, supports a causal claim. Say "is associated with" unless you have that.

## A small example

Wumpini studies a microfinance dataset and finds that borrowers who received financial literacy training repaid more often, even holding loan size and age steady. Before reporting, she checks how people got the training. They volunteered. Volunteers may be more organised to begin with, so she reports an association, recommends a randomised rollout to test the training properly, and suggests which branches could take part.`,
      practice_task_md: `**Goal:** fit, read and honestly report a regression.

1. In a free online notebook, create made up data for 200 farms with columns for fertiliser, rainfall and yield, as in the lesson (use \`numpy.random.default_rng\` to generate values, and build yield from the other two plus random noise).
2. Fit the model from the lesson and print the coefficients and intervals.
3. Check that the coefficients are close to the numbers you used to generate the data. Explain why they are not exact.
4. Plot residuals against fitted values (\`model.fittedvalues\`, \`model.resid\`).
5. Write a short paragraph naming one factor left out of real farm data that could bias the fertiliser coefficient, and how a randomised trial would avoid it.

**Done looks like:** working code, coefficients with intervals, a residual plot, and a paragraph on causation.`,
      quiz: {
        questions: [
          {
            prompt: "In the farm model, what does the fertiliser coefficient of 3.68 mean?",
            options: [
              "Comparing farms with the same rainfall, each extra kilogram of fertiliser went with about 3.7 kg more maize",
              "Every farm produced 3.68 kg of maize",
              "Fertiliser explains 3.68 percent of yield",
              "Rainfall has no effect on yield",
            ],
            answer_index: 0,
            explanation: "A coefficient is the average change in the outcome per unit of that factor, holding the other factors steady.",
          },
          {
            prompt: "Which kind of regression suits a yes or no outcome such as repaid or not?",
            options: [
              "Linear regression with R squared",
              "Logistic regression",
              "A confidence interval",
              "A histogram",
            ],
            answer_index: 1,
            explanation: "The lesson says to use logistic regression for yes or no outcomes.",
          },
          {
            prompt: "Wumpini found trained borrowers repaid more, but the training was voluntary. Why did she report only an association?",
            options: [
              "Logistic regression cannot handle training data",
              "Her sample was larger than needed",
              "Volunteers may differ in ways not in the model, such as being more organised",
              "Associations are always stronger than causes",
            ],
            answer_index: 2,
            explanation: "Without random assignment, left out differences between volunteers and others could explain the result.",
          },
          {
            prompt: "Your residual plot shows a clear curve. What does that suggest?",
            options: [
              "The model is perfect",
              "R squared must be 1",
              "The data contains no errors",
              "The straight line assumption fits poorly",
            ],
            answer_index: 3,
            explanation: "The lesson says a curve or funnel in residuals means the straight line assumption is poor.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "reproducible-work": {
      explanation_md: `## Why this matters

A result nobody can repeat is a result nobody should trust. If your manager asks in three months why the forecast changed, you need to show exactly which data and code produced each version. Adverts name Git, clean code and maintainable software, and teams that share work depend on it. Reproducible habits also protect you: when something breaks, you can go back to the version that worked.

## Git in practice

Git records snapshots of your project. Each snapshot, a **commit**, has a message saying what changed and why. The everyday loop is short:

\`\`\`bash
git init
git add clean.py README.md
git commit -m "Clean district names before joining"
git log --oneline
\`\`\`

Push to a free hosted service such as GitHub or GitLab to back up your work and share it. Use **branches** to try an idea without breaking the main version, and merge it back once it works. Write commit messages a colleague could understand: "Fix duplicate farmers after plot join" beats "update".

## A project layout others can follow

\`\`\`
farm-yields/
  README.md
  requirements.txt
  data/raw/
  data/clean/
  notebooks/
  src/clean.py
  reports/
\`\`\`

* **data/raw** holds data exactly as received. Never edit it by hand; every change happens in code.
* **src** holds functions you reuse; notebooks call them and stay short.
* **README.md** says what the project answers, where the data came from, and the steps to rerun it.

## Record the environment

Library updates can change results or break code. Save the exact versions:

\`\`\`bash
pip freeze > requirements.txt
\`\`\`

Someone else then runs \`pip install -r requirements.txt\` to match your setup. In a free online notebook, add a cell that prints the versions of pandas, statsmodels and scikit learn at the top.

## Control randomness

Sampling, train and test splits and many models use random numbers. Set a seed so reruns match: \`np.random.default_rng(42)\` in NumPy, or \`random_state=42\` in scikit learn functions. Note the seed in your README.

## Keep secrets and personal data out

This matters as much as anything technical.

* Never commit passwords, API keys or database connection strings. Keep them in a file listed in \`.gitignore\`, or in environment variables.
* Do not commit personal data such as names, phone numbers, Ghana Card numbers or transaction records, even to a private repository. Add \`data/\` to \`.gitignore\` and describe in the README how an authorised person obtains it.
* If you commit a secret by mistake, deleting it in a new commit is not enough, because it stays in history. Change the password or key immediately.

## A small example

Zenabu builds a rainfall and yield analysis for a farmer group in Wa. Her repository holds the code, a README, \`requirements.txt\` and a small made up sample file so others can test the code. The real farm records stay on the organisation's secure drive, listed in \`.gitignore\`. When a colleague in Accra reruns the project months later with the real data, she gets the same numbers, and the commit history shows exactly when and why each change was made.`,
      practice_task_md: `**Goal:** turn one analysis into a reproducible project.

1. Pick a small analysis you have done before. On a laptop or desktop, create a folder with the layout from the lesson.
2. Move reusable code into \`src/\` and keep the notebook short.
3. Write a README with the question, data source, and steps to rerun.
4. Create \`requirements.txt\` with \`pip freeze\`, or list versions in a notebook cell if you work online.
5. Add a \`.gitignore\` that excludes \`data/\` and any secrets file, then make at least three commits with clear messages and push to a free GitHub or GitLab account.

**Done looks like:** a public repository with a clear README, a sensible layout, pinned versions, no personal data, and a readable commit history to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What should you do with files in data/raw?",
            options: [
              "Edit them by hand to fix errors quickly",
              "Keep them exactly as received and make every change in code",
              "Delete them once cleaning is done",
              "Commit them to a public repository",
            ],
            answer_index: 1,
            explanation: "Raw data stays untouched so every change is recorded in code and can be repeated.",
          },
          {
            prompt: "Why save library versions with pip freeze?",
            options: [
              "It makes the code run faster",
              "It hides your code from others",
              "Library updates can change results, so others need the same versions",
              "Git refuses to work without it",
            ],
            answer_index: 2,
            explanation: "Recording exact versions lets someone else match your setup and get the same results.",
          },
          {
            prompt: "You accidentally committed an API key. What is the right response?",
            options: [
              "Delete it in the next commit and carry on",
              "Change the key immediately, because it stays in the history",
              "Rename the repository",
              "Make the repository private and do nothing else",
            ],
            answer_index: 1,
            explanation: "A committed secret stays in Git history, so the key must be changed.",
          },
          {
            prompt: "How do you make a scikit learn train and test split give the same result on every run?",
            options: [
              "Run it twice and average",
              "Use a bigger dataset",
              "Sort the data alphabetically",
              "Set random_state to a fixed number",
            ],
            answer_index: 3,
            explanation: "Setting random_state fixes the random numbers so reruns match.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "statistics-for-decisions": {
      explanation_md: `## Why this matters

Anyone can run a model in a few lines of code. What employers pay a data scientist for is judgement: knowing how sure you are, knowing when a difference is real, and knowing when a pattern is only a coincidence. That judgement comes from statistics. It is also the skill that protects people. When an NGO decides which communities get a health programme, or a lender decides who gets credit, a careless statistical claim has real consequences.

## The big idea: you almost never see everything

You rarely have data on every farmer, customer or household. You have a sample, and the sample would have come out a little differently if you had picked other people. Statistics is the toolkit for reasoning about that variation honestly. Every lesson in this section answers a version of one question: given the data I have, what can I fairly say about the wider world, and how sure can I be?

## What this section covers

* **Probability and distributions:** how random variation behaves, what common shapes of data look like, and why averages from samples settle into a predictable pattern.
* **Sampling, confidence and hypothesis tests:** confidence intervals, p values, and the limits of both, so you neither overclaim nor miss real effects.
* **Experiments and A/B tests:** why random assignment is the most reliable way to show that a change caused a result, how big a test needs to be, and the mistakes that spoil it.
* **Regression for explanation:** estimating how one thing changes with another while holding other factors steady, and why a strong relationship is not proof of cause.

These four build on each other, so take them in order.

## How sure is sure?

A good habit to build now: every number you report should come with a sense of its uncertainty. Compare these two sentences.

* "Repayment rose from 78 percent to 83 percent after the new reminder."
* "In this sample repayment rose from 78 to 83 percent; the true change could plausibly be anywhere from about 1 to 9 points, and because we randomised who got the reminder, the reminder is the likely cause."

The second is longer, but a manager can act on it safely. The first invites a costly mistake if the rise was just chance or was caused by something else.

## A small example

Hawa analyses a district health survey of 400 households in the Upper East Region. She finds that 61 percent of sampled households sleep under a treated mosquito net. Her report does not say "61 percent of the district". It says the sample estimate is 61 percent, gives a range for the district as a whole, explains how households were chosen, and notes that the survey ran in the dry season when net use may differ. That is statistical thinking: the same number, reported in a way that cannot mislead.

These figures are invented for teaching. Real survey reports from bodies such as the Ghana Statistical Service follow the same habit of giving ranges and describing how samples were drawn.`,
      practice_task_md: `**Goal:** practise reporting uncertainty in plain words.

1. Find any number reported from a sample: a news story about a poll, an NGO report, or a survey summary from the Ghana Statistical Service website.
2. Write down the claim exactly as reported, in your own notes.
3. Answer: how big was the sample? How were people chosen? Is a range or margin of error given? What else could explain the result?
4. Rewrite the claim in two or three sentences that a manager could act on safely, in the style of the second example in the lesson.

**Done looks like:** the original claim, your four answers, and a rewritten claim that states the uncertainty and the sampling method. Share it with a mentor or study partner for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say employers really pay a data scientist for?",
            options: [
              "Typing code faster than an analyst",
              "Owning expensive software",
              "Judgement about how sure you are and when a difference is real",
              "Producing as many charts as possible",
            ],
            answer_index: 2,
            explanation: "The lesson says running a model is easy; judgement about uncertainty is what employers pay for.",
          },
          {
            prompt: "Why do we need statistics when working with a sample?",
            options: [
              "A different sample would have given slightly different results",
              "Samples always contain errors that must be deleted",
              "Samples are only used in spreadsheets",
              "A sample tells you nothing about the wider world",
            ],
            answer_index: 0,
            explanation: "Sampling variation means results would differ with other people, and statistics reasons about that honestly.",
          },
          {
            prompt: "Which report of a sample result is safest for a manager to act on?",
            options: [
              "A single number with no context",
              "A number rounded to look more impressive",
              "A number with the word \"significant\" added",
              "An estimate with a plausible range, how the sample was drawn and the likely cause",
            ],
            answer_index: 3,
            explanation: "The lesson's preferred style gives the estimate, its uncertainty, the method and the reason to believe the cause.",
          },
          {
            prompt: "Why did Hawa avoid writing \"61 percent of the district\"?",
            options: [
              "The survey was not about mosquito nets",
              "The figure came from a sample of households, not every household in the district",
              "Percentages are not allowed in health reports",
              "The district had fewer than 400 households",
            ],
            answer_index: 1,
            explanation: "Her 61 percent came from a sample, so she reported it as an estimate with a range for the district.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "time-series-forecasting": {
      explanation_md: `## Why this matters

Much of the data organisations hold is recorded over time: monthly sales at a provisions shop, weekly maize prices at a market, daily mobile money transaction counts across an agent network, clinic attendance, rainfall. Planning stock, staff and cash depends on forecasting it. Adverts mention forecasting, and sensor and transaction data that arrive over time.

## The parts of a time series

Plot the series before anything else. Most series combine:

* **Trend:** a long term rise or fall, such as growing transaction counts as more people use an agent.
* **Seasonality:** a pattern that repeats on a fixed calendar, such as maize prices rising in the lean season before harvest, or transactions peaking at month end when salaries arrive.
* **Events:** festivals, school fees time, public holidays, or a network outage.
* **Noise:** random variation left over.

statsmodels' \`seasonal_decompose\` splits a series into trend, seasonal and leftover parts so you can see each.

## Start with simple forecasts

Two simple methods are surprisingly hard to beat and make good baselines:

* **Naive:** next month equals this month.
* **Seasonal naive:** next March equals last March.

## Exponential smoothing

Exponential smoothing gives recent observations more weight and can model trend and seasonality. Here, with four years of made up monthly sales, we hold out the last year to test:

\`\`\`python
from statsmodels.tsa.holtwinters import ExponentialSmoothing
train, test = sales[:-12], sales[-12:]
naive = train[-12:].to_numpy()
hw = ExponentialSmoothing(train, trend="add", seasonal="mul",
                          seasonal_periods=12).fit()
fc = hw.forecast(12)
\`\`\`

Here \`sales\` is a pandas Series with a monthly date index. When we ran it, the seasonal naive forecast was off by 30 units a month on average (mean absolute error), and Holt Winters by 15. Halving the error over a sensible baseline is a result worth reporting. On another series, the baseline might win, and then you use the baseline.

## Always show uncertainty

A forecast is a range, not a single line. statsmodels' \`ETSModel\` can give prediction intervals through \`get_prediction(...).summary_frame()\`, which returns \`pi_lower\` and \`pi_upper\` columns. Show them on the chart and in words: "we expect between 239 and 265 units in January (an 80 percent interval), most likely about 252". Intervals widen the further ahead you forecast, which is honest.

## Test the way you will use it

Never shuffle time series data. Train on the past and test on the period that follows. For a fuller check, repeat this at several cut off points, which is what \`TimeSeriesSplit\` in scikit learn does.

## When the future breaks the past

Forecasts assume the patterns continue. A new competitor, a fuel price jump, a policy change or an unusual rainy season can break them. Say this plainly in reports, and update forecasts as new data arrives.

## A small example

Fuseini helps a grain trader in Tamale plan storage. He gathers three years of weekly maize prices from the trader's own records and plots them. Prices dip after harvest and climb through the lean season. A seasonal naive forecast does reasonably well; exponential smoothing does a little better. He gives the trader a forecast with a range for the next twelve weeks and a note that an unusual harvest would change everything.`,
      practice_task_md: `**Goal:** build and test a forecast against a baseline.

1. In a free online notebook, create four years of made up monthly sales with a trend, a yearly season and noise (use \`pd.date_range\` with \`freq="MS"\` for the index).
2. Plot the series and run \`seasonal_decompose\` on it.
3. Hold out the last 12 months. Compute a seasonal naive forecast and a Holt Winters forecast.
4. Calculate the mean absolute error for both.
5. Write a short forecast note for a shop owner: next three months with a range, the method, and one thing that could make it wrong.

**Done looks like:** a plot, a decomposition, two error figures, and a plain language forecast note.`,
      quiz: {
        questions: [
          {
            prompt: "Maize prices rise each lean season before harvest. Which part of a time series is this?",
            options: [
              "Trend",
              "Seasonality",
              "Noise",
              "Leakage",
            ],
            answer_index: 1,
            explanation: "A pattern repeating on a fixed calendar is seasonality.",
          },
          {
            prompt: "What is a seasonal naive forecast?",
            options: [
              "Next month equals the average of all months",
              "Next March equals last March",
              "A forecast made by a neural network",
              "A forecast that ignores the calendar",
            ],
            answer_index: 1,
            explanation: "Seasonal naive repeats the value from the same period last cycle.",
          },
          {
            prompt: "In the example, Holt Winters had an error of 15 and seasonal naive 30. What should you conclude?",
            options: [
              "Holt Winters halved the error over a sensible baseline on this series",
              "Seasonal naive is useless for every series",
              "Holt Winters will always win",
              "The test period was too short to compare anything",
            ],
            answer_index: 0,
            explanation: "On this series the model halved the baseline's error, but on another series the baseline might win.",
          },
          {
            prompt: "Why must you not shuffle time series data when testing?",
            options: [
              "Shuffling deletes the dates",
              "statsmodels cannot read shuffled data",
              "It makes plots harder to read",
              "The model would learn from the future it is meant to predict",
            ],
            answer_index: 3,
            explanation: "Shuffling lets the model peek at later data, so test on the period after training.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-you-need-first": {
      explanation_md: `## Why this matters

Data science adverts in Ghana almost always ask for Python, SQL and statistics together, and most ask for a degree with a strong maths or numbers component. This track builds on that base rather than repeating it. Starting without the base is the most common reason people stall, so check yourself honestly now.

## The base: the Data Analyst track

If you have not finished it, start with the [SydCrest Data Analyst track](/roadmaps/data-analyst). You should be comfortable with everything it teaches, especially:

* tidy data, cleaning and checking records
* means, medians, percentages and spotting a biased sample
* SQL queries with joins, grouping and aggregation
* basic Python and pandas: loading a CSV, filtering, grouping, simple charts
* collecting survey data responsibly

This track does not reteach those skills. When a lesson says "group by district", it assumes you can already do it.

## The maths you need

You do not need to be a mathematician, but you must be calm with numbers. Check that you can:

* work with fractions, percentages and powers without a calculator panic
* read a formula such as \`mean = sum of values / number of values\` and apply it
* understand that a square root undoes squaring, which matters for standard deviation
* read a graph with two axes and describe a trend in words

If any of these feel shaky, spend a week on free school level maths revision before going further. It will pay back in every statistics lesson.

## The tools you need

* **A laptop or desktop for coding.** Any machine that runs a modern browser is enough if you use a free online notebook.
* **A free notebook service.** Google Colab and Kaggle Notebooks are two examples that run Python in your browser with pandas, statsmodels and scikit learn already installed. Both are free with limits. Colab's FAQ says resources are not guaranteed, idle sessions time out and sessions have a maximum length. Kaggle asks you to verify a phone number before you can turn on internet access or accelerators in a notebook. Terms change, so read each service's current help pages before you rely on it.
* **A local option.** If you have a decent laptop, installing Python with pandas, statsmodels and scikit learn lets you work offline once set up, which saves data.

## A quick self check

Try this in a notebook without looking anything up:

\`\`\`python
import pandas as pd
df = pd.DataFrame({"district": ["Tamale", "Yendi", "Tamale"],
                   "yield_kg": [820, 640, 910]})
print(df.groupby("district")["yield_kg"].mean())
\`\`\`

If you can predict the output (Tamale 865, Yendi 640) and explain each line, you are ready. If not, go back to the pandas lesson in the Data Analyst track first. Sumaila did exactly that, spent two weeks on it, and found the statistics section far easier afterwards.`,
      practice_task_md: `**Goal:** prove you are ready, or find exactly what to revise.

1. Open a free online notebook or your own Python setup.
2. Type and run the self check code from the lesson, then change it to add a third district and a fourth farm.
3. Write a SQL query (on paper or in a free online SQL playground) that counts farms per district and keeps only districts with more than two farms.
4. Without a calculator, work out the mean of 4, 8 and 12, and the square root of 49.
5. Write down every step you could not do and the matching Data Analyst lesson to revisit.

**Done looks like:** working code, a SQL query using GROUP BY and HAVING, two correct sums, and an honest revision list (an empty list is fine).`,
      quiz: {
        questions: [
          {
            prompt: "What should you do if loading and grouping a CSV in pandas still feels unfamiliar?",
            options: [
              "Skip ahead to machine learning, which hides pandas",
              "Go back to the pandas lesson in the Data Analyst track first",
              "Switch to doing everything in a spreadsheet",
              "Start the AI and Machine Learning track instead",
            ],
            answer_index: 1,
            explanation: "The lesson says this track assumes analyst skills and sends you back to the Data Analyst pandas lesson if they are shaky.",
          },
          {
            prompt: "According to Colab's FAQ, which statement about its free tier is true?",
            options: [
              "It guarantees a fixed amount of memory forever",
              "Sessions never time out",
              "Resources are not guaranteed and idle sessions time out",
              "It requires a paid plan to run pandas",
            ],
            answer_index: 2,
            explanation: "Colab's FAQ says free resources are not guaranteed and idle sessions time out.",
          },
          {
            prompt: "What does Kaggle ask before you can turn on internet access or accelerators in a notebook?",
            options: [
              "A paid subscription",
              "A university email address",
              "Verification of a phone number",
              "A letter from an employer",
            ],
            answer_index: 2,
            explanation: "The lesson notes Kaggle asks you to verify a phone number before enabling internet access or accelerators.",
          },
          {
            prompt: "Why does the lesson mention square roots in the maths check?",
            options: [
              "They are needed to install Python",
              "Standard deviation uses a square root",
              "SQL queries need them for joins",
              "They decide which notebook service you can use",
            ],
            answer_index: 1,
            explanation: "The lesson links square roots to standard deviation, which appears throughout statistics.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
