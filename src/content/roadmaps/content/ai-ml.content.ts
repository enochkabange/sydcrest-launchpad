import type { TrackContent } from "./types";

/**
 * Lesson content for the AI and Machine Learning track (issue #198). Original
 * SydCrest writing; sources and the coverage table are in
 * src/content/research/ai-ml.md. Every dataset in these lessons is invented
 * for teaching and is labelled as an example; none of the numbers describe
 * real places or people. Code was run against the library versions listed in
 * the research file.
 */
const content: TrackContent = {
  roadmap: "ai-machine-learning",
  nodes: {
    "before-you-start": {
      explanation_md: `## Why this section comes first

Machine learning is one of the most talked about skills in tech, and it is easy to start in the wrong place. People watch a video about chatbots, open a course on neural networks, and give up two weeks later because the maths, the code and the jargon all arrive at once. This section exists so that does not happen to you.

This is an **advanced track**. It is designed as the next step after the [Data Analyst track](/roadmaps/data-analyst), not as a first tech course. If you have not done any programming or data work yet, start there. Everything you learn in the Data Analyst track (spreadsheets, SQL, Python, pandas, charts and basic statistics) is used again here, every single day.

## What machine learning actually is

Machine learning means writing software that learns a pattern from examples instead of following rules a person typed in. Imagine a farmer cooperative in the Northern Region that has records from past seasons: rainfall, fertiliser used, planting date and the maize yield each farm got. A machine learning model can study those records and learn how the inputs relate to the yield. Given a new farm's details, it can then estimate a likely yield.

Notice three things in that example:

* The model needs **data**, and the data must be good. Bad records give bad predictions.
* The model gives an **estimate**, never a promise. Part of the job is measuring how wrong it tends to be.
* People will **act** on the prediction, so you are responsible for checking it is fair and explaining its limits.

That is most of the track in one picture: data, models, testing, and responsibility.

## What you need

You will need three things beyond motivation:

* **Python and data skills** at the level the Data Analyst track teaches.
* **Maths you are willing to extend.** School level algebra is the starting point. This track teaches the extra pieces (vectors, rates of change and probability) slowly and with examples.
* **A laptop or desktop computer.** You can read every lesson on any device, but writing and running model code needs a proper keyboard and a bigger screen. The heavy computing can run in a free online notebook, so the computer does not need to be powerful.

## Being honest about jobs

Entry level machine learning jobs in Ghana are rare. Most adverts we studied asked for a degree and several years of experience. That does not mean the skill is not worth learning. It means most people get in through a data, software or research role first and grow into machine learning from there. The next two topics explain exactly what to check before you start and what AI work in Ghana looks like today.

## How to use this track

Go slowly. Run every code example yourself in a notebook. When a topic feels like magic, go back to the maths section. Keep notes of what you build, because those notes become your portfolio.`,
      practice_task_md: `**Goal:** decide honestly whether you are ready for this track, and make a plan.

1. Write down, in a notebook or a note on your device, which of these you can already do without help: write a Python function, load a CSV file with pandas, filter and group a table, calculate an average and a median, and draw a simple chart.
2. For anything you cannot do yet, find the matching topic in the [Data Analyst track](/roadmaps/data-analyst) and add it to your plan.
3. Write two sentences on why you want to learn machine learning and one Ghanaian problem you would like a model to help with, such as crop yields, clinic queues or translation for a local language.
4. Write down how you will get regular time on a laptop or desktop: your own, a school lab, a hub or a friend's.

**Done looks like:** a one page readiness note with your skills checklist, your plan for any gaps, your reason and problem, and your computer access plan. Share it with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which track does SydCrest recommend you finish before starting AI and Machine Learning?",
            options: [
              "Digital Skills Bridge only",
              "The Data Analyst track",
              "Graphic Design",
              "No track is needed first",
            ],
            answer_index: 1,
            explanation: "This is an advanced track built on the Python, pandas, SQL and statistics taught in the Data Analyst track.",
          },
          {
            prompt: "In the maize yield example, what does the model actually learn from?",
            options: [
              "Rules a programmer typed in about each farm",
              "The farmers' opinions about next season",
              "Records of past seasons with inputs and the yield each farm got",
              "A list of fertiliser prices",
            ],
            answer_index: 2,
            explanation: "Machine learning learns a pattern from past examples rather than from hand written rules.",
          },
          {
            prompt: "Why does this track say you need a laptop or desktop computer?",
            options: [
              "Lessons cannot be read on a phone",
              "Models only run on expensive computers",
              "Writing and running model code needs a keyboard and bigger screen, even when the computing runs in a free online notebook",
              "Free online notebooks do not exist",
            ],
            answer_index: 2,
            explanation: "You can read anywhere, but coding work needs a proper computer, though it does not have to be powerful.",
          },
          {
            prompt: "What does the lesson say about entry level machine learning jobs in Ghana?",
            options: [
              "They are the easiest tech jobs to get",
              "They are rare, and most people get in through data, software or research roles first",
              "They need no experience or qualifications",
              "They only exist outside Africa",
            ],
            answer_index: 1,
            explanation: "The adverts studied asked for degrees and experience, so a stepping stone role is the realistic route.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-you-need-first": {
      explanation_md: `## Why check first

Machine learning code is mostly ordinary data code with a small model step in the middle. If loading, cleaning and summarising data still feels hard, every lesson in this track will feel twice as hard, and you may decide wrongly that machine learning is not for you. Checking your readiness now saves you weeks.

## Skill one: Python you can write without copying

You should be able to write a short Python script on your own: variables, lists, dictionaries, \`if\` statements, \`for\` loops and functions. You do not need to be an expert, but you should be able to read an error message and fix a simple bug.

## Skill two: pandas and data cleaning

Almost every model starts as a pandas table. You should be able to load a CSV file, look at the first rows, select columns, filter rows, handle missing values and group data to get totals or averages. If \`df.groupby("region")["yield_kg"].mean()\` makes sense to you, you are in good shape.

## Skill three: basic statistics

You should know what a mean, median and standard deviation tell you, what a sample is, and why a small or unfair sample can mislead you. Models are statistics at heart, and their results are always estimates with error.

## Skill four: SQL basics

In many jobs the data lives in a database, not a CSV file. Being able to write a \`SELECT\` with \`WHERE\`, \`GROUP BY\` and a simple \`JOIN\` means you can fetch your own training data instead of waiting for someone else.

All four skills are taught in the [Data Analyst track](/roadmaps/data-analyst). If any feel shaky, do those topics first. This is not a detour. It is the foundation.

## Maths

Be comfortable with school algebra: rearranging a formula, plotting a straight line such as \`y = 2x + 3\`, and working with powers and fractions. The next section builds from there, one idea at a time.

## Your computer and your data bundle

You can read and watch on any device. For the hands on work you need regular access to a **laptop or desktop**, because writing and testing code on a small touch screen is slow and error prone. The machine does not need to be powerful: free hosted notebooks such as Google Colab or Kaggle Notebooks run the code on their own servers, and you only need a browser. Free tiers come with usage limits that change over time, so check the current terms on each service's official pages before you rely on them.

Online notebooks use data. Work with small datasets, save your notebook often, and download files once rather than reloading them every session.

## A quick self test

Hawa thinks she is ready. She loads a CSV of a shop's sales, removes rows with missing prices, works out average sales per day of the week and draws a bar chart, all in about half an hour without searching for every step. That is the level to aim for before you continue.`,
      practice_task_md: `**Goal:** run your own readiness test in a free notebook.

1. On a laptop or desktop, open a free hosted notebook (for example Google Colab or Kaggle Notebooks) or a local Jupyter install.
2. Create a small CSV in a spreadsheet with 20 invented rows: \`date\`, \`product\`, \`quantity\`, \`price_ghs\`. Leave two prices blank on purpose. Label it as example data.
3. In the notebook, load it with pandas, drop or fill the missing prices, add a \`sales_ghs\` column (quantity times price), and find total sales per product.
4. Draw one bar chart of the totals.
5. Time yourself and note every step where you had to look something up.

**Done looks like:** a notebook that runs from top to bottom without errors, plus a short list of the steps you had to look up. If the list is long, revisit those topics in the Data Analyst track before moving on.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say pandas skills matter so much for machine learning?",
            options: [
              "pandas trains neural networks",
              "Almost every model starts as a pandas table that must be loaded and cleaned",
              "pandas replaces the need for statistics",
              "Models cannot use any other data format",
            ],
            answer_index: 1,
            explanation: "The lesson explains that most model work is ordinary data code, and the data usually starts as a pandas table.",
          },
          {
            prompt: "What does SQL let you do in a machine learning job, according to the lesson?",
            options: [
              "Draw charts of model accuracy",
              "Speed up neural network training",
              "Fetch your own training data from a database",
              "Replace Python entirely",
            ],
            answer_index: 2,
            explanation: "Data often lives in a database, and SQL lets you get it yourself.",
          },
          {
            prompt: "What does the lesson say about free hosted notebooks such as Google Colab?",
            options: [
              "They need a powerful laptop to run",
              "They have no limits at all",
              "They run code on their servers through your browser, but free tiers have limits that change, so check the official terms",
              "They only work offline",
            ],
            answer_index: 2,
            explanation: "The heavy computing happens on the service's servers, and free usage limits can change over time.",
          },
          {
            prompt: "Which maths level does the lesson say you should start from?",
            options: [
              "University calculus",
              "School algebra such as rearranging formulas and plotting straight lines",
              "No maths at all, ever",
              "Advanced statistics proofs",
            ],
            answer_index: 1,
            explanation: "You start from school algebra, and the next section builds the extra maths step by step.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "ai-work-in-ghana": {
      explanation_md: `## Why look at the jobs first

It is better to know the real picture before you invest months of study. AI and machine learning work does exist in Ghana, and the problems it tackles here are interesting: farming advice, credit decisions for people without bank histories, speech tools for local languages, and fraud checks on mobile money. But the way into this work is usually indirect, and you should plan for that.

## Who hires for AI work

When we studied job adverts in Ghana and remote roles open to Ghana based applicants, machine learning work appeared in a few kinds of employer:

* **Agritech and fintech companies** that use models for farming advice, credit scoring and speech or language tools.
* **Telecoms and large companies** with data science teams that build prediction models from customer data.
* **Consulting and technology firms** that build AI features for clients, often using hosted language models.
* **Universities and research groups** that run projects on health, agriculture and African languages.

## What the adverts asked for

The honest finding: almost every machine learning advert asked for a degree and several years of experience. We found no entry level machine learning engineer roles in Ghana. Common asks were Python, SQL, statistics, a deep learning library, experience training and evaluating models, cloud platforms and some way of putting models into use.

That is why this track is an advanced follow on, and why the last section is about routes in rather than a single job title.

## The realistic routes in

Most people who now do machine learning work started in a neighbouring role and moved across. Good stepping stones are:

* **Data analyst or data officer roles**, where you can try simple prediction models on real business data and show results.
* **Research assistant posts** at universities, NGOs and survey firms, where you clean data, run analyses and sometimes support model building.
* **Software developer roles**, especially at companies starting to add AI features.
* **Remote and contract work**, such as data labelling, model evaluation or junior data science contracts open to applicants in Africa. Read every offer carefully and never pay to apply.

## A worked example

Fuseini finishes the Data Analyst track and gets a data officer job at an NGO in Tamale. He cleans survey data every week. In his spare time he builds a small model that predicts which households are likely to miss follow up visits, tests it honestly and shows his manager. The NGO starts using it to plan visits. A year later he has a real machine learning project on his CV, a manager who can vouch for it, and a much stronger application for data science roles.

## What this means for you

Treat machine learning as a skill you grow inside a job, not a ticket to your first one. Keep your data skills sharp, build projects on Ghanaian data, and look for chances to apply a model where you already work.`,
      practice_task_md: `**Goal:** map AI work you could realistically reach.

1. Search public job boards and company career pages for three adverts that mention machine learning, data science or AI and are open to people in Ghana. Do not log in anywhere.
2. For each, note the employer type, the location or remote status, the level asked for, and the skills named. Do not copy advert text; write the skills in your own words.
3. Find one stepping stone role (data analyst, research assistant or junior developer) that you could apply for within a year.
4. Write which skills from the three adverts you already have, and which you will build in this track.

**Done looks like:** a short table or list of three adverts, one stepping stone role, and a skills gap list. Keep it in your portfolio folder and update it as you learn.`,
      quiz: {
        questions: [
          {
            prompt: "What did the job adverts studied for this track mostly ask for?",
            options: [
              "No experience and no qualifications",
              "A degree and several years of experience",
              "Only a social media following",
              "A certificate from a single online course",
            ],
            answer_index: 1,
            explanation: "Almost every machine learning advert asked for a degree and experience, and none was entry level.",
          },
          {
            prompt: "Which of these is a stepping stone role named in the lesson?",
            options: [
              "Delivery rider",
              "Research assistant at a university, NGO or survey firm",
              "Football coach",
              "Chef in a hotel kitchen",
            ],
            answer_index: 1,
            explanation: "Research assistant posts involve data cleaning and analysis and sometimes model work.",
          },
          {
            prompt: "What advice does the lesson give about remote and contract offers?",
            options: [
              "Accept any offer that mentions AI",
              "Pay a fee to secure your place",
              "Read every offer carefully and never pay to apply",
              "Only apply to roles outside Africa",
            ],
            answer_index: 2,
            explanation: "Remote work can be a real route, but genuine employers do not charge you to apply.",
          },
          {
            prompt: "In the worked example, how did Fuseini get his first real machine learning project?",
            options: [
              "By winning a lottery",
              "By building and honestly testing a small model to help the NGO he already worked for",
              "By copying a project from the internet",
              "By waiting for a machine learning job advert",
            ],
            answer_index: 1,
            explanation: "He applied a model inside his existing data job, which gave him real experience and a reference.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "maths-for-ml": {
      explanation_md: `## Why maths, and why not too much

Employers who hire for machine learning roles often list linear algebra, probability and statistics, and skills frameworks for data science put mathematics near the top. The reason is practical. When a model behaves strangely, the person who understands what it is doing inside can find the problem. The person who only knows which buttons to press is stuck.

The good news: you do not need a maths degree to start. You need three ideas, understood well enough to explain to a friend. This section teaches them one at a time.

## The three ideas

* **Vectors and matrices.** A model sees data as lists and grids of numbers. One farm's record (rainfall, fertiliser, planting week) becomes a list of three numbers called a vector. A whole table of farms becomes a grid called a matrix. Most of the work a model does is multiplying these grids together.
* **Rates of change and gradient descent.** A model starts with random settings and is badly wrong. It measures how wrong it is, works out which direction to nudge each setting to be less wrong, and repeats thousands of times. The maths of "which direction and how much" is the rate of change, also called the derivative or gradient.
* **Probability.** Many models do not answer yes or no. They say something like "this loan has a 0.8 chance of being repaid". Probability tells you what that number means, how to turn it into a decision, and why even a confident model can be wrong.

## How they fit together

Take a simple model that predicts maize yield from rainfall. It multiplies rainfall by a number called a **weight**, then adds another number called a **bias**: \`yield = weight * rainfall + bias\`. That is just the straight line \`y = mx + c\` from school, with new names. With several inputs, the multiplication becomes a vector calculation. Training means finding the best weight and bias, which is what gradient descent does. And because no prediction is perfect, probability and statistics describe the error you should expect.

## How to study maths here

* **Go slowly and use pen and paper.** Work each small example by hand once before you trust the code to do it.
* **Connect every formula to a picture.** A weight is the slope of a line. A gradient tells you which way is downhill.
* **Check with code.** After working an example by hand, repeat it in Python with NumPy and see if you get the same answer.
* **Come back often.** When a later topic such as neural networks feels like magic, return here. Understanding grows with each pass.

Free video courses on linear algebra, calculus and probability are linked as further reading, but the three lessons in this section give you everything you need for this track.`,
      practice_task_md: `**Goal:** connect a school straight line to a simple model.

1. On paper, draw axes with rainfall in millimetres on the horizontal axis and maize yield in bags on the vertical axis.
2. Plot these five invented example farms: (400, 6), (500, 8), (600, 9), (700, 11), (800, 13).
3. Draw by eye the straight line that fits best. Estimate its slope (the weight) and where it would cross the vertical axis (the bias).
4. Write your model as \`yield = weight * rainfall + bias\` and use it to predict the yield for 650 mm.
5. For each of the five farms, work out how far your line is from the real yield. Add up the gaps, ignoring signs.

**Done looks like:** a photo or scan of your graph, your model written out, one prediction, and your total error. Keep it; you will improve this model with code later in the track.`,
      quiz: {
        questions: [
          {
            prompt: "In the lesson, what is a vector?",
            options: [
              "A type of chart",
              "A list of numbers, such as one farm's rainfall, fertiliser and planting week",
              "A Python library",
              "A kind of probability",
            ],
            answer_index: 1,
            explanation: "One record becomes a list of numbers called a vector, and a table becomes a matrix.",
          },
          {
            prompt: "What does gradient descent do during training?",
            options: [
              "Deletes the worst rows of data",
              "Draws a chart of the results",
              "Repeatedly nudges the model's settings in the direction that makes it less wrong",
              "Chooses which Python library to use",
            ],
            answer_index: 2,
            explanation: "The model measures its error, works out which way to adjust each setting, and repeats many times.",
          },
          {
            prompt: "The model `yield = weight * rainfall + bias` is the same shape as which school formula?",
            options: [
              "The area of a circle",
              "The straight line `y = mx + c`",
              "Pythagoras' theorem",
              "Simple interest",
            ],
            answer_index: 1,
            explanation: "The weight is the slope and the bias is where the line crosses the vertical axis.",
          },
          {
            prompt: "What does a model output such as \"0.8 chance of being repaid\" describe?",
            options: [
              "A guaranteed result",
              "A probability, which can still turn out wrong",
              "The number of loans in the dataset",
              "The model's training time",
            ],
            answer_index: 1,
            explanation: "Probability tells you how likely an outcome is, and even confident predictions are sometimes wrong.",
          },
          {
            prompt: "What study habit does the lesson recommend for maths?",
            options: [
              "Skip the maths and only use code",
              "Work a small example by hand, then check it with NumPy",
              "Memorise formulas without pictures",
              "Only study maths after finishing the track",
            ],
            answer_index: 1,
            explanation: "Working by hand then checking in code builds real understanding.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "vectors-and-matrices": {
      explanation_md: `## Why this matters

Every model you will build, from a simple price predictor to a language model, stores its data and its learned settings as vectors and matrices. Job adverts for data science roles in Accra name linear algebra for exactly this reason. Once you can read these objects, error messages like "shapes do not match" stop being scary and start being useful clues.

## Vectors

A **vector** is an ordered list of numbers. One farm's record can be a vector: rainfall of 5 (hundreds of millimetres) and 2 bags of fertiliser gives \`[5, 2]\`. Order matters: \`[2, 5]\` would mean something different. The number of entries is the vector's **length** or dimension.

The most important operation is the **dot product**. Multiply matching entries and add the results. With weights \`[1.5, 0.8]\`:

\`[5, 2] · [1.5, 0.8] = 5 × 1.5 + 2 × 0.8 = 7.5 + 1.6 = 9.1\`

That is exactly what a simple model does: each input is multiplied by its weight and the results are added. Add a bias of 1 and the predicted yield is 10.1 bags. A weight shows how much the model cares about each input.

## Matrices

A **matrix** is a grid of numbers with rows and columns. Stack several farm vectors as rows and you get a matrix where each row is a farm and each column is a feature. Three farms with two features gives a matrix of **shape** (3, 2): three rows, two columns.

Multiplying this matrix by the weight vector does the dot product for every row at once, giving one prediction per farm. This is why matrix multiplication sits at the heart of machine learning: it handles thousands of records in one step, and computers are very fast at it.

The rule to remember: the number of **columns** in the matrix must equal the **length** of the vector. Two features need two weights. If you get a shape error, check this first.

## A worked example in NumPy

\`\`\`python
import numpy as np

farms = np.array([[5, 2],
                  [6, 3],
                  [4, 1]])
weights = np.array([1.5, 0.8])
bias = 1.0

print(farms.shape)            # (3, 2)
print(farms @ weights + bias) # [10.1 12.4  7.8]
\`\`\`

The \`@\` symbol means matrix multiplication. Check the second farm by hand: 6 × 1.5 + 3 × 0.8 + 1 = 9 + 2.4 + 1 = 12.4. It matches.

## Where you will see this again

In neural networks, each layer holds a matrix of weights, and data flows through the network as a chain of matrix multiplications. In language models, every word piece becomes a long vector of numbers. The ideas stay the same; only the sizes grow. These numbers are invented for teaching and do not describe real farms.`,
      practice_task_md: `**Goal:** compute predictions by hand and confirm them with code.

1. Invent four example market traders in Tamale with two features each: hours open per day and number of products stocked. Write them as a (4, 2) matrix on paper.
2. Choose weights \`[2, 0.5]\` and a bias of 10, as if predicting daily customers.
3. Work out the prediction for each trader by hand using the dot product.
4. In a free notebook, create the matrix and weights with NumPy and compute \`matrix @ weights + bias\`.
5. Now try a weight vector of length 3 and read the error message. Write one sentence explaining it.

**Done looks like:** your hand calculations, a notebook cell whose output matches them, and your sentence explaining the shape error.`,
      quiz: {
        questions: [
          {
            prompt: "What is the dot product of `[5, 2]` and `[1.5, 0.8]`?",
            options: [
              "6.5",
              "7.7",
              "9.1",
              "10.5",
            ],
            answer_index: 2,
            explanation: "Multiply matching entries and add them: 5 × 1.5 + 2 × 0.8 = 9.1.",
          },
          {
            prompt: "A matrix with 3 rows and 2 columns has which shape?",
            options: [
              "(3, 2)",
              "(2, 3)",
              "(6, 1)",
              "(5, 0)",
            ],
            answer_index: 0,
            explanation: "Shape is written as rows first, then columns.",
          },
          {
            prompt: "For a matrix times a vector to work, what must match?",
            options: [
              "The number of rows in the matrix and the bias",
              "The number of columns in the matrix and the length of the vector",
              "The largest number in each",
              "The number of rows and the number of columns",
            ],
            answer_index: 1,
            explanation: "Each row's entries are paired with the vector's entries, so the counts must be equal.",
          },
          {
            prompt: "What does the `@` symbol do in the NumPy example?",
            options: [
              "Adds two arrays",
              "Prints the shape",
              "Performs matrix multiplication",
              "Imports NumPy",
            ],
            answer_index: 2,
            explanation: "In Python, `@` multiplies matrices, here giving one prediction per farm.",
          },
          {
            prompt: "Why is matrix multiplication so important in machine learning?",
            options: [
              "It makes data smaller",
              "It computes predictions for many records at once, and computers do it very fast",
              "It removes missing values",
              "It is only used for drawing charts",
            ],
            answer_index: 1,
            explanation: "One matrix multiplication handles every row in a single step.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "gradients-and-optimisation": {
      explanation_md: `## Why this matters

Training is the word you will hear most in machine learning, and gradient descent is what training actually is for most models, including the largest language models. If you understand it, you can tell why a model is not learning, why it learns too slowly, and what the settings in a training script mean.

## Step one: measure how wrong the model is

A model makes predictions. We compare them with the true answers using a **loss**, one number that says how wrong the model is overall. A common loss for predicting numbers is the **mean squared error**: for each record, take the prediction minus the true value, square it so negatives do not cancel positives, then average. Lower is better. Zero would be perfect.

## Step two: the rate of change

A **derivative** tells you how fast one thing changes when you change another. Picture walking on a hill in thick harmattan haze. You cannot see the valley, but you can feel whether the ground slopes up or down under your feet. The derivative of the loss with respect to a weight is that slope: it says whether increasing the weight makes the loss go up or down, and how steeply.

When a model has many weights, the collection of all these slopes is called the **gradient**.

## Step three: take a small step downhill

Gradient descent repeats a simple loop:

1. Make predictions with the current weights.
2. Compute the loss.
3. Compute the gradient.
4. Move each weight a small step in the downhill direction.

The size of the step is the **learning rate**. Too big and the model jumps past the valley and may never settle. Too small and training takes forever. Choosing it is part of the craft.

## A worked example

Five invented example farms, with rainfall in hundreds of millimetres and yield in bags:

\`\`\`python
import numpy as np

rain = np.array([4, 5, 6, 7, 8])
bags = np.array([6, 8, 9, 11, 13])
w, b, lr = 0.0, 0.0, 0.01

for step in range(10000):
    error = (w * rain + b) - bags
    w -= lr * 2 * (error * rain).mean()
    b -= lr * 2 * error.mean()

print(round(w, 2), round(b, 2))  # 1.7 -0.8
\`\`\`

The two update lines use the derivatives of the mean squared error for this straight line model. You do not need to derive them yet; notice the pattern. Each pass nudges \`w\` and \`b\` against the slope. At the start the loss is about 94. By the end it is about 0.06, and the line \`bags = 1.7 * rain - 0.8\` fits the farms closely. A farm with 650 mm of rain would be predicted at 1.7 × 6.5 minus 0.8, about 10.3 bags.

## What to remember

Libraries such as scikit learn and PyTorch compute gradients for you, so you will rarely write these update lines by hand. But every time you see "epochs", "learning rate" or "loss went down" in a training log, this loop is what is happening underneath.`,
      practice_task_md: `**Goal:** see the learning rate change training.

1. In a free notebook, copy the worked example and run it. Confirm you get about 1.7 and minus 0.8.
2. Inside the loop, every 1000 steps, print the step number and the mean squared error, \`(error ** 2).mean()\`.
3. Run it again with \`lr = 0.001\`. Then with \`lr = 0.05\`. Note what happens to the loss each time.
4. Write three sentences: which learning rate worked best, what went wrong with the others, and why.

**Done looks like:** a notebook with three runs, their printed losses, and your three sentence explanation. Share it with a mentor or study partner.`,
      quiz: {
        questions: [
          {
            prompt: "What does a loss such as mean squared error measure?",
            options: [
              "How long training takes",
              "How wrong the model's predictions are overall",
              "How many features the data has",
              "How fast the computer is",
            ],
            answer_index: 1,
            explanation: "The loss is one number summarising the model's error, and lower is better.",
          },
          {
            prompt: "In the hill picture, what does the derivative tell you?",
            options: [
              "How high the hill is",
              "Which way the ground slopes and how steeply",
              "Where the valley is exactly",
              "How many steps you have taken",
            ],
            answer_index: 1,
            explanation: "The derivative is the slope of the loss, showing which direction makes it go down.",
          },
          {
            prompt: "What happens if the learning rate is far too big?",
            options: [
              "Training becomes perfectly accurate",
              "The model jumps past the low point and may never settle",
              "The data gets deleted",
              "Nothing changes",
            ],
            answer_index: 1,
            explanation: "Steps that are too large overshoot the valley in the loss.",
          },
          {
            prompt: "In each pass of gradient descent, how are the weights changed?",
            options: [
              "They are set to random values",
              "They are doubled",
              "They move a small step against the slope of the loss",
              "They stay the same",
            ],
            answer_index: 2,
            explanation: "Each update nudges the weights downhill on the loss.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "probability-for-ml": {
      explanation_md: `## Why this matters

Many models used by Ghanaian companies output a probability rather than a plain answer: how likely a loan is to be repaid, how likely a mobile money transfer is fraud, how likely a customer is to stop using a service. Someone must turn that number into a decision, and someone must explain what it means. Data science adverts name probability for this reason.

## Probability in one line

A probability is a number from 0 to 1 that says how likely something is. 0 means it never happens, 1 means it always happens, and 0.25 means it happens about one time in four over many similar cases. A single prediction of 0.9 can still turn out wrong. It only promises that, across many cases given 0.9, about nine in ten should happen.

## Conditional probability

Most useful questions are **conditional**: how likely is A, given that we know B? We write it as P(A | B), read "the probability of A given B". The chance a maize farm gets a good harvest is one number. The chance it gets a good harvest **given** that the rains came early is a different, more useful number. A classification model is really estimating a conditional probability: the chance of a label given the inputs.

## The base rate trap

Here is an invented example that catches many beginners. Out of 1,000 mobile money transfers, 10 are fraud. A model flags 9 of those 10 fraud cases, which sounds great. But it also wrongly flags 50 of the 990 honest transfers.

So 59 transfers are flagged in total, and only 9 are really fraud. Given that a transfer is flagged, the chance it is fraud is 9 ÷ 59, about 0.15. Most flagged customers are honest. Because fraud is rare (a low **base rate**), even a decent model produces many false alarms. If a company blocks every flagged account, it will anger many innocent people.

## Distributions

A **distribution** describes how likely each possible value is. Heights of students in a Bolgatanga school cluster around an average with fewer very short or very tall students; this bell shape is the **normal distribution**. Yes or no outcomes, like repaid or not repaid, follow a simpler pattern with one probability for yes. Knowing the shape of your data helps you choose a model and spot strange values.

## From probability to decision

A model gives 0.7 for a loan. Approve or not? You choose a **threshold**. At 0.5, more loans are approved and more go bad. At 0.8, fewer go bad but many good borrowers are turned away. There is no single correct threshold. It depends on the cost of each kind of mistake, which is a business and ethical choice, not only a maths one. Your job is to show the trade off clearly so the right people can decide.`,
      practice_task_md: `**Goal:** work through a base rate problem in a Ghanaian setting.

1. Invent a clinic screening example: out of 2,000 people screened, 40 have a condition. A test correctly flags 36 of the 40, and wrongly flags 100 of the healthy people. Label it as example data.
2. On paper, work out how many people are flagged in total, and the probability that a flagged person really has the condition.
3. Repeat with only 10 people out of 2,000 having the condition, keeping the same flag rates (9 of 10, and about 5 in every 100 healthy people).
4. Write a short note, as if to a clinic manager, explaining why a positive flag should lead to a follow up test rather than a diagnosis.

**Done looks like:** both calculations shown step by step, and a plain language note of four to six sentences.`,
      quiz: {
        questions: [
          {
            prompt: "What does P(A | B) mean?",
            options: [
              "The probability of A plus B",
              "The probability of A given that B is known to be true",
              "The probability that A and B never happen",
              "A divided by B",
            ],
            answer_index: 1,
            explanation: "The bar is read as \"given\", so it is the chance of A when we already know B.",
          },
          {
            prompt: "In the fraud example, why are most flagged transfers honest?",
            options: [
              "The model is broken",
              "Fraud is rare, so even a small rate of false alarms on honest transfers outnumbers the real fraud",
              "Honest customers are more likely to commit fraud",
              "The threshold was set to zero",
            ],
            answer_index: 1,
            explanation: "With a low base rate, false alarms from the large honest group dominate the flags.",
          },
          {
            prompt: "A model gives a probability of 0.9 for one case. What does that promise?",
            options: [
              "The outcome will definitely happen",
              "Across many cases given 0.9, about nine in ten should happen, but this one could still be wrong",
              "The model is 90 percent accurate overall",
              "The outcome will happen within nine days",
            ],
            answer_index: 1,
            explanation: "A probability describes likelihood over many similar cases, not certainty for one.",
          },
          {
            prompt: "How should the threshold for approving loans be chosen?",
            options: [
              "Always use 0.5",
              "Pick the highest number possible",
              "By weighing the costs of each kind of mistake, which is partly a business and ethical choice",
              "Let the model choose its own threshold",
            ],
            answer_index: 2,
            explanation: "Different thresholds trade one kind of error for another, so people must decide which costs matter more.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
