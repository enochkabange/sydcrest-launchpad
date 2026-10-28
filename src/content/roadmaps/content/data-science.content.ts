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
