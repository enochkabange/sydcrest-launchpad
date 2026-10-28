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
    "python-ml-tools": {
      explanation_md: `## Why tools come next

Machine learning teams in Ghana and abroad work in Python, and adverts for data science and machine learning roles name the same small set of libraries again and again: NumPy, pandas, scikit learn, and a deep learning library such as PyTorch, TensorFlow or Keras. Learning this toolkit well matters more than chasing every new tool you see online.

## The toolkit

Think of the tools as a workshop with a few benches:

* **Python** is the language that ties everything together. You already know the basics from the Data Analyst track.
* **NumPy** handles fast maths on arrays of numbers. Vectors and matrices from the maths section live here.
* **pandas** handles tables with named columns, which is how real data arrives: CSV files, spreadsheet exports and database queries.
* **scikit learn** provides classic models, tools to split and test data, and ways to prepare features. You will use it throughout the classic machine learning section.
* **A deep learning library**, such as PyTorch or Keras, builds neural networks. You meet one later in the track.
* **matplotlib** or a similar library draws charts so you can see your data and your results.

## Where the code runs

You write and run all of this in a **notebook**: a document that mixes code cells, their output and your notes. Notebooks are how most data scientists explore data and share results. You can run them on your own computer with Jupyter, or in a browser through a free hosted service, which is often easier on a low spec laptop because the service's servers do the heavy computing.

## A typical workflow

Here is the shape of almost every project in this track, with the tool for each step:

1. Load data from a CSV or database into **pandas**.
2. Explore it with summaries and charts.
3. Clean it: fix missing values, wrong types and odd entries.
4. Convert the columns you need into **NumPy** arrays or let **scikit learn** do it.
5. Train a model with **scikit learn** or a deep learning library.
6. Test it on data it has not seen.
7. Write up what you found in the notebook's text cells.

Amina, an NGO data officer in Damongo, follows exactly this pattern when she predicts which villages need extra supplies. Most of her time goes on steps 1 to 4. The model step is a few lines.

## Good habits from day one

* **Restart and run all** before you share a notebook, so you know it works from top to bottom.
* **Name things clearly.** \`yield_bags\` is better than \`y2\`.
* **Note library versions** at the top of a notebook. Libraries change, and code that worked last year can break.
* **Keep data small while learning.** It is faster, kinder to your data bundle, and easier to check by eye.

The two topics in this section cover NumPy with pandas, and how to use free notebooks without losing work.`,
      practice_task_md: `**Goal:** set up a tidy starter notebook you will reuse for the whole track.

1. On a laptop or desktop, open a free hosted notebook or a local Jupyter install.
2. In the first cell, import NumPy, pandas, scikit learn and matplotlib, and print each library's \`__version__\`.
3. Add a text cell with a title, your name, the date and one sentence on what the notebook is for.
4. Add the seven workflow steps from this lesson as empty headings in text cells.
5. Choose **Restart and run all** and confirm it runs without errors. Save a copy to your own storage.

**Done looks like:** a template notebook with version numbers printed and seven headed sections, saved where you can find it again.`,
      quiz: {
        questions: [
          {
            prompt: "Which library in the lesson is used mainly for tables with named columns?",
            options: [
              "NumPy",
              "pandas",
              "matplotlib",
              "PyTorch",
            ],
            answer_index: 1,
            explanation: "pandas handles tables, which is how most real data arrives.",
          },
          {
            prompt: "What does scikit learn provide, according to the lesson?",
            options: [
              "Only charts",
              "Classic models, tools to split and test data, and feature preparation",
              "A web server for apps",
              "A replacement for Python",
            ],
            answer_index: 1,
            explanation: "scikit learn is used throughout the classic machine learning section for models, testing and preparation.",
          },
          {
            prompt: "In Amina's work, where does most of her time go?",
            options: [
              "Choosing a deep learning library",
              "Loading, exploring, cleaning and converting data",
              "Writing the model line",
              "Drawing logos for her reports",
            ],
            answer_index: 1,
            explanation: "The model step is short; preparing data takes most of the time.",
          },
          {
            prompt: "Why should you choose Restart and run all before sharing a notebook?",
            options: [
              "It deletes your data",
              "It proves the notebook works from top to bottom",
              "It makes the model more accurate",
              "It uploads the notebook automatically",
            ],
            answer_index: 1,
            explanation: "Running everything in order catches cells that only worked because of earlier, hidden state.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "numpy-and-pandas": {
      explanation_md: `## Why this matters

A model never sees a spreadsheet. It sees an array of numbers called **features**, usually written \`X\`, and an array of answers called the **target**, usually written \`y\`. Getting from a messy table to clean \`X\` and \`y\` is the most common task in machine learning work, and adverts that mention pipelines and data preparation are describing exactly this.

## pandas for the table, NumPy for the numbers

pandas is where you load, inspect and clean. NumPy is the format models expect underneath. In practice you move from one to the other in a few lines.

Useful pandas checks before any model:

* \`df.head()\` shows the first rows, so you see what the columns really contain.
* \`df.info()\` shows each column's type and how many values are missing.
* \`df.describe()\` gives counts, means and ranges, which reveals impossible values such as negative rainfall.
* \`df["district"].value_counts()\` shows how often each category appears.

## A worked example

Imagine an invented example file, \`farms.csv\`, from a cooperative near Tamale, with columns \`rainfall_mm\`, \`fertiliser_bags\`, \`district\`, \`planting_week\` and \`yield_bags\`. Some rows have a blank yield, and a few have a blank fertiliser value.

\`\`\`python
import pandas as pd

df = pd.read_csv("farms.csv")
df = df.dropna(subset=["yield_bags"])
median = df["fertiliser_bags"].median()
df["fertiliser_bags"] = df["fertiliser_bags"].fillna(median)

X = df[["rainfall_mm", "fertiliser_bags"]].to_numpy()
y = df["yield_bags"].to_numpy()
print(X.shape, y.shape)
\`\`\`

Step by step:

* Rows with no yield are dropped, because a row without an answer cannot teach the model anything.
* Blank fertiliser values are filled with the median. This is a **choice**, not a fact. If a blank really means the farmer used none, filling with zero would be more honest. Ask the people who collected the data.
* \`X\` becomes a matrix with one row per farm and two columns. \`y\` becomes a vector with one value per farm. Their row counts must match.

## Arrays and why shape matters

\`X.shape\` might print \`(199, 2)\` and \`y.shape\` \`(199,)\`. The first number in each is the number of farms, and they must agree. If they differ, rows were dropped from one and not the other, and the model will refuse to train.

NumPy also lets you do maths on whole columns at once, which is called **vectorisation**. \`X[:, 0] / 100\` converts every rainfall value to hundreds of millimetres in one step, with no loop. Vectorised code is shorter and much faster than looping over rows.

## Common traps

* Numbers stored as text, such as "1,200" with a comma, will not convert. Clean them first.
* Dates need converting with \`pd.to_datetime\` before you can use them.
* Never fill in missing **target** values. Guessing the answers you are trying to predict makes the model look better than it is.`,
      practice_task_md: `**Goal:** turn a messy table into clean \`X\` and \`y\`.

1. In a spreadsheet, make an invented example table of 30 rows for a Bolgatanga shoe seller: \`price_ghs\`, \`days_on_display\`, \`colour\` and \`sold\` (1 or 0). Leave three prices blank and type one price as text with a comma, such as "1,200".
2. Download it as CSV and load it in a free notebook with pandas.
3. Use \`info()\` and \`describe()\` to find the problems. Write down each one.
4. Fix the text price, fill the blank prices with a value you justify in a text cell, and build \`X\` from the two numeric columns and \`y\` from \`sold\`.
5. Print both shapes and confirm the row counts match.

**Done looks like:** a notebook that loads the file, lists the problems found, fixes them with a reason for each choice, and prints matching shapes.`,
      quiz: {
        questions: [
          {
            prompt: "In machine learning code, what are `X` and `y` usually?",
            options: [
              "Two charts",
              "The features and the target answers",
              "Two Python libraries",
              "The training time and test time",
            ],
            answer_index: 1,
            explanation: "`X` holds the input features and `y` holds the answers the model learns to predict.",
          },
          {
            prompt: "Why are rows with a blank yield dropped in the example?",
            options: [
              "They make the file too big",
              "A row without an answer cannot teach the model anything",
              "pandas cannot read blank values",
              "Yield is not important",
            ],
            answer_index: 1,
            explanation: "The target is what the model learns from, so rows without it are removed rather than guessed.",
          },
          {
            prompt: "What does the lesson say about filling blank fertiliser values with the median?",
            options: [
              "It is always correct",
              "It is a choice, and zero might be more honest if a blank means none was used",
              "It should never be done",
              "It changes the target values",
            ],
            answer_index: 1,
            explanation: "Filling missing values is a judgement you should check with whoever collected the data.",
          },
          {
            prompt: "`X.shape` is `(199, 2)` and `y.shape` is `(150,)`. What is most likely wrong?",
            options: [
              "The model is too small",
              "Rows were dropped from one array and not the other",
              "There are too many features",
              "NumPy is not installed",
            ],
            answer_index: 1,
            explanation: "The first numbers must match because each row of `X` needs one answer in `y`.",
          },
          {
            prompt: "Which of these should you never fill in with a guess?",
            options: [
              "Missing fertiliser values",
              "Missing rainfall values",
              "Missing target values you are trying to predict",
              "Missing planting weeks",
            ],
            answer_index: 2,
            explanation: "Guessing the answers makes the model look better than it is.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "notebooks-and-free-compute": {
      explanation_md: `## Why this matters

You do not need an expensive computer to learn machine learning. Free hosted notebooks give you a capable machine in the browser, sometimes with a **GPU** (graphics processing unit), the chip that makes deep learning practical. Using them well, without losing work or burning through your data bundle, is a real skill.

## What a hosted notebook is

A hosted notebook runs on a computer in a data centre. Your browser shows the cells and sends your code there; the results come back to your screen. Well known free examples are **Google Colab** and **Kaggle Notebooks**. Both use the same notebook format as Jupyter, so a notebook from one usually opens in the others.

These are named as examples, not recommendations. Free tiers and their limits change over time, so always read the current terms on each service's official pages, such as the Colab FAQ and Kaggle's notebook documentation.

## The limits you must plan for

Free hosted notebooks are generous but not unlimited:

* **Sessions end.** If you are idle for a while, or a session runs for a long time, the service shuts it down. Colab's own FAQ says free resources are not guaranteed and its limits change.
* **The machine is temporary.** Files you upload or create in the session's storage disappear when the session ends. Save anything important to your own cloud drive or download it.
* **GPU time is rationed.** Free GPU access is limited and sometimes unavailable. Some services give a weekly allowance and may ask you to verify your account first.
* **Rules apply.** Free notebooks are for interactive work and learning. Read the terms on what is and is not allowed.

## Habits that protect your work

* **Save early and often.** Save a copy of the notebook to your own drive at the start, not the end.
* **Write checkpoints.** After a long training run, save the trained model to a file and download it or copy it to your drive straight away.
* **Use the GPU only when you need it.** Classic models in scikit learn run fine on a normal processor. Switch on a GPU for neural networks and switch it off afterwards, so you keep your allowance for when it matters.
* **Make notebooks rerunnable.** Put downloads and installs at the top so a fresh session can rebuild everything with Restart and run all.

## Protecting your data bundle

Notebooks use data while open, and downloading datasets uses more. Work with small samples while you build and test, for example the first few thousand rows. Download a dataset once into the session rather than reloading it in every cell. Close tabs you are not using. Where possible, do your heavy sessions on Wi Fi at a hub, school or office.

## A worked example

Sumaila is training a small model in a free notebook at a Tamale hub. He saves a copy to his drive first. He tests his code on 2,000 rows with the GPU off, then switches the GPU on for the full run. When training ends he saves the model to his drive at once. Ten minutes later the session times out while he steps out for lunch. He loses nothing.`,
      practice_task_md: `**Goal:** practise a safe notebook routine.

1. Open a free hosted notebook on a laptop or desktop and read the service's current FAQ or usage page. Write down two limits it mentions, in your own words.
2. Save a copy of the notebook to your own drive before writing any code.
3. In a cell, create a small pandas table of invented example data and save it to a CSV file in the session.
4. Copy or download that CSV to your drive or device.
5. Restart the session, confirm the session file has gone, and reload it from your saved copy.

**Done looks like:** a notebook with a text cell listing the two limits, and code that reloads your data from your own storage after a restart.`,
      quiz: {
        questions: [
          {
            prompt: "What happens to files saved in a hosted notebook's session storage when the session ends?",
            options: [
              "They are kept forever",
              "They disappear, so you must save important files elsewhere",
              "They are emailed to you",
              "They move to the next notebook automatically",
            ],
            answer_index: 1,
            explanation: "The hosted machine is temporary, so copy anything important to your drive or device.",
          },
          {
            prompt: "When does the lesson suggest switching on a GPU?",
            options: [
              "For every notebook, all the time",
              "For training neural networks, switching it off afterwards",
              "Only for loading CSV files",
              "Never, GPUs are not allowed",
            ],
            answer_index: 1,
            explanation: "Classic models run fine without one, so save your GPU allowance for deep learning.",
          },
          {
            prompt: "Why should you check a free notebook service's official pages?",
            options: [
              "To find a discount code",
              "Because free tiers and their limits change over time",
              "Because the lesson recommends one service over all others",
              "To download the notebook software",
            ],
            answer_index: 1,
            explanation: "Limits are not fixed, so the official terms are the only reliable source.",
          },
          {
            prompt: "Which habit saved Sumaila's work when his session timed out?",
            options: [
              "He never trained a model",
              "He saved the notebook at the start and saved the trained model to his drive straight away",
              "He used a bigger dataset",
              "He kept the GPU on all day",
            ],
            answer_index: 1,
            explanation: "Saving early and saving the model as soon as training ended meant the timeout cost him nothing.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "classic-ml": {
      explanation_md: `## Why classic machine learning first

When people hear "AI" they picture chatbots and image generators. But much of the machine learning that companies actually use runs on ordinary tables of data: credit scoring from mobile money histories, predicting which customers might leave a telecom network, estimating crop yields, flagging unusual transactions. Data science adverts in Accra describe exactly this kind of predictive modelling. Classic models are faster to train, easier to explain and often just as accurate on tabular data as deep learning.

## Supervised learning

Most classic machine learning is **supervised**: you have past examples where you know the answer, and the model learns to predict that answer for new cases. The answer is called the **label** or target.

* If the label is a **number**, such as yield in bags or a price in cedis, the task is **regression**.
* If the label is a **category**, such as repaid or defaulted, the task is **classification**.

There is also **unsupervised** learning, where there is no label and the model looks for structure, such as groups of similar customers. It appears as an optional topic in this section.

## The workflow you will learn

Every project in this section follows the same steps:

1. **Frame the question.** What exactly are you predicting, for whom, and what will someone do with the prediction?
2. **Prepare the data.** Clean it, choose features and turn categories and dates into numbers.
3. **Split the data.** Keep some records aside that the model never sees during training.
4. **Start with a baseline.** A simple rule, such as always predicting the average. Any model must beat this.
5. **Train a model.** Fit it on the training records.
6. **Evaluate honestly.** Test it on the held out records with a measure that fits the problem.
7. **Explain and decide.** Describe what the model gets right and wrong, and whether it is good enough to use.

## A worked example in words

Mariama works for a savings group network in the Upper East Region. Leaders want to know which members might fall behind on loan repayments, so they can offer support early. She frames it as classification: will this member miss two or more repayments in the next three months? She prepares features such as savings history and past repayment record, holds back a portion of the records, and compares a simple model with a baseline that predicts nobody will fall behind. Her model catches more members who need help than the baseline does, so she writes up its accuracy and its limits, including that new members with short histories get less reliable predictions.

## What this section covers

* **Regression and classification:** your first scikit learn models and a baseline.
* **Training, testing and avoiding overfitting:** how to measure honestly.
* **Features and messy real data:** the preparation that often matters most.
* **Clustering and finding patterns:** an optional look at unsupervised learning.`,
      practice_task_md: `**Goal:** frame three Ghanaian problems as machine learning tasks.

1. Pick three problems you know from your community, for example: estimating next month's sales at a provisions shop, predicting whether a patient will miss a clinic appointment, or grouping market traders by how they use mobile money.
2. For each, write: what you would predict, whether it is regression, classification or unsupervised, which features you might use, and what simple baseline a model would need to beat.
3. For each, write one way a wrong prediction could harm someone, and how you would reduce that risk.

**Done looks like:** a one page note covering all three problems with every item answered. Share it with a mentor for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Predicting a maize price in cedis is which kind of task?",
            options: [
              "Regression",
              "Classification",
              "Clustering",
              "Translation",
            ],
            answer_index: 0,
            explanation: "The label is a number, so it is regression.",
          },
          {
            prompt: "Predicting whether a loan will be repaid or defaulted is which kind of task?",
            options: [
              "Regression",
              "Classification",
              "Unsupervised learning",
              "Data cleaning",
            ],
            answer_index: 1,
            explanation: "The label is a category, so it is classification.",
          },
          {
            prompt: "Why does the workflow start with a baseline?",
            options: [
              "It is the most accurate model available",
              "It gives a simple standard that any real model must beat",
              "It replaces the need for test data",
              "It makes training faster",
            ],
            answer_index: 1,
            explanation: "If a model cannot beat a simple rule like predicting the average, it is not useful.",
          },
          {
            prompt: "Why does the lesson say classic models are often used on tables of business data?",
            options: [
              "They only work in English",
              "They are faster to train, easier to explain and often as accurate on tabular data",
              "They never make mistakes",
              "They need no data at all",
            ],
            answer_index: 1,
            explanation: "For tabular problems, classic models are practical and explainable.",
          },
          {
            prompt: "In Mariama's project, which limit did she report?",
            options: [
              "The model works perfectly for everyone",
              "New members with short histories get less reliable predictions",
              "The model cannot use savings data",
              "The baseline was better than the model",
            ],
            answer_index: 1,
            explanation: "Reporting limits honestly is part of the final step of the workflow.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "regression-and-classification": {
      explanation_md: `## Why this matters

Regression and classification are the two everyday tasks of machine learning. A fintech estimating a safe loan size is doing regression; the same company deciding whether to approve the loan is doing classification. scikit learn, named in junior data science adverts, makes both possible in a few lines, and its pattern is the same for every model.

## The scikit learn pattern

Every scikit learn model follows three steps:

* **Create** the model: \`model = LinearRegression()\`.
* **Fit** it to training data: \`model.fit(X_train, y_train)\`.
* **Predict** on new data: \`model.predict(X_test)\`.

Learn this once and you can swap in dozens of other models with one changed line.

## Regression with a baseline

Using the invented example farm data from earlier, with \`X\` holding rainfall and fertiliser and \`y\` holding yield in bags:

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_absolute_error

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

baseline = DummyRegressor().fit(X_train, y_train)
model = LinearRegression().fit(X_train, y_train)

print(mean_absolute_error(y_test, baseline.predict(X_test)))
print(mean_absolute_error(y_test, model.predict(X_test)))
\`\`\`

\`train_test_split\` keeps a fifth of the farms aside. The \`DummyRegressor\` always predicts the average yield: that is the baseline. **Mean absolute error** is the average size of the mistakes, in bags. If the baseline is off by about 3 bags and the model by under 1, the model has learned something real. If the model barely beats the baseline, your features are not telling it much.

## Classification and probabilities

For a yes or no label, such as whether a farm's yield was above the cooperative's usual level, swap in \`LogisticRegression\`. Despite the name, it is a classification model. It has two useful outputs:

* \`model.predict(X_test)\` gives the class, 0 or 1.
* \`model.predict_proba(X_test)\` gives the probability of each class, such as 0.16 for no and 0.84 for yes.

Use the probabilities when the decision needs a threshold you choose, as in the probability lesson. The baseline for classification is \`DummyClassifier\`, which always predicts the most common class.

## Other models worth knowing

* **Decision trees** split the data with simple questions such as "is rainfall above 600 mm?". Easy to explain, but a single tree overfits easily.
* **Random forests** and **gradient boosting** combine many trees. They are often the strongest choice for tabular data and are widely used in industry.

All of them use the same create, fit, predict pattern.`,
      practice_task_md: `**Goal:** train and compare your first models.

1. In a free notebook on a laptop or desktop, create an invented example dataset of 100 farms with pandas and NumPy: rainfall between 400 and 900 mm, fertiliser between 0 and 4 bags, and a yield you calculate from them plus some random noise. Label it as example data.
2. Split it 80 to 20 with \`train_test_split\`.
3. Train a \`DummyRegressor\` and a \`LinearRegression\`, and print the mean absolute error of each on the test set.
4. Add a \`RandomForestRegressor\` from \`sklearn.ensemble\` and compare all three.
5. In a text cell, explain in plain words which model did best and by how many bags.

**Done looks like:** a notebook that runs from top to bottom, three error numbers, and a short plain language comparison.`,
      quiz: {
        questions: [
          {
            prompt: "What are the three steps every scikit learn model follows?",
            options: [
              "Load, chart, delete",
              "Create, fit, predict",
              "Import, export, upload",
              "Clean, sort, print",
            ],
            answer_index: 1,
            explanation: "You create a model, fit it to training data, then predict on new data.",
          },
          {
            prompt: "What does the `DummyRegressor` in the example always predict?",
            options: [
              "Zero",
              "The average of the training targets",
              "The largest yield seen",
              "A random number",
            ],
            answer_index: 1,
            explanation: "It is a baseline that predicts the average, which a real model must beat.",
          },
          {
            prompt: "What does mean absolute error tell you?",
            options: [
              "How many rows were used",
              "The average size of the model's mistakes in the target's units",
              "The probability of each class",
              "How long training took",
            ],
            answer_index: 1,
            explanation: "It averages the size of the errors, here in bags of maize.",
          },
          {
            prompt: "Logistic regression is used for which kind of task?",
            options: [
              "Regression only",
              "Classification",
              "Clustering",
              "Drawing charts",
            ],
            answer_index: 1,
            explanation: "Despite its name, logistic regression predicts classes and their probabilities.",
          },
          {
            prompt: "Which method gives the probability of each class?",
            options: [
              "`fit`",
              "`predict`",
              "`predict_proba`",
              "`train_test_split`",
            ],
            answer_index: 2,
            explanation: "`predict_proba` returns class probabilities, while `predict` returns the class.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "model-evaluation": {
      explanation_md: `## Why this matters

Anyone can train a model that looks brilliant on the data it learned from. The real question is how it performs on cases it has never seen, because that is what happens once it is in use. Employers list "evaluating models" and "testing and validating models" because a badly evaluated model can approve bad loans, miss sick patients or waste a company's money, while everyone believes it works.

## Overfitting

**Overfitting** is when a model memorises its training data, including its noise and accidents, instead of learning the general pattern. Think of a student who memorises last year's exam answers word for word. They score full marks on that paper and fail a new one. An overfit model does the same. The opposite problem, **underfitting**, is a model too simple to capture the pattern at all.

The signal of overfitting is a big gap: excellent scores on training data, much worse scores on test data.

## Train, validation and test

* The **training set** is what the model learns from.
* The **validation set** is used to compare models and settings while you work.
* The **test set** is locked away and used once, at the end, to report honest performance.

If you keep checking the test set and adjusting, you slowly tune the model to it, and the final score stops being honest.

## Cross validation

With small datasets, one split can be lucky or unlucky. **Cross validation** splits the data into, say, five parts, trains five times with a different part held out each time, and averages the scores:

\`\`\`python
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression

scores = cross_val_score(
    LogisticRegression(max_iter=1000), X, y, cv=5)
print(scores.mean(), scores.std())
\`\`\`

The mean is your estimate; the standard deviation shows how much it varies between splits.

## When accuracy misleads

**Accuracy** is the share of predictions that are right. It fails badly when one outcome is rare. If only 2 in 100 invented example clinic patients have a condition, a model that always says "healthy" is 98 percent accurate and completely useless.

Better measures for rare outcomes come from the **confusion matrix**, which counts four kinds of result: true positives, false positives, true negatives and false negatives. From it:

* **Precision:** of the cases the model flagged, how many were really positive? Low precision means many false alarms.
* **Recall:** of the real positive cases, how many did the model catch? Low recall means many missed cases.

Which matters more depends on the cost of each mistake. Missing a sick patient is worse than an extra test, so a screening model needs high recall. Blocking honest customers is costly, so a fraud model needs good precision too.

## A worked example

Issahaku's model predicts which motorbike loans will default. Training accuracy is 99 percent, test accuracy 81 percent: a clear sign of overfitting. He simplifies the model, uses cross validation, and reports recall on defaulters, which is what the lender cares about.`,
      practice_task_md: `**Goal:** catch overfitting and choose the right measure.

1. In a free notebook, create an invented example classification dataset of 300 rows where only about 1 in 10 rows is positive, for example clinic patients who miss a follow up visit.
2. Train a \`DecisionTreeClassifier\` with no depth limit. Print its accuracy on the training set and on a test set.
3. Train it again with \`max_depth=3\` and compare the gap.
4. For the better model, print the \`confusion_matrix\`, \`precision_score\` and \`recall_score\` from \`sklearn.metrics\`.
5. In a text cell, explain which measure the clinic should care about most and why.

**Done looks like:** a notebook showing the training and test scores for both trees, a confusion matrix, precision and recall, and your short explanation.`,
      quiz: {
        questions: [
          {
            prompt: "What is the clearest sign of overfitting?",
            options: [
              "Low scores on both training and test data",
              "Excellent scores on training data and much worse scores on test data",
              "The model trains very quickly",
              "The dataset has many columns",
            ],
            answer_index: 1,
            explanation: "A big gap between training and test performance shows the model memorised rather than learned.",
          },
          {
            prompt: "Why should the test set be used only once, at the end?",
            options: [
              "It is too large to use more often",
              "Repeatedly checking and adjusting tunes the model to it, so the final score stops being honest",
              "scikit learn deletes it after one use",
              "It contains no labels",
            ],
            answer_index: 1,
            explanation: "Keeping the test set locked away keeps the final measurement honest.",
          },
          {
            prompt: "A model always predicts \"healthy\" when 2 in 100 patients are sick. Why is its accuracy misleading?",
            options: [
              "Accuracy cannot be calculated for health data",
              "It is 98 percent accurate yet catches none of the sick patients",
              "The model is overfitting",
              "Accuracy only works for regression",
            ],
            answer_index: 1,
            explanation: "With a rare outcome, accuracy can be high while the model is useless.",
          },
          {
            prompt: "What does recall measure?",
            options: [
              "How fast the model predicts",
              "Of the real positive cases, how many the model caught",
              "Of the flagged cases, how many were real",
              "The number of features used",
            ],
            answer_index: 1,
            explanation: "Recall is about catching real positives, which matters most when missing a case is costly.",
          },
          {
            prompt: "What does cross validation do?",
            options: [
              "Removes duplicate rows",
              "Trains and tests several times on different splits and averages the scores",
              "Translates the data into another format",
              "Doubles the size of the dataset",
            ],
            answer_index: 1,
            explanation: "Averaging over several splits gives a steadier estimate than one lucky or unlucky split.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "feature-engineering": {
      explanation_md: `## Why this matters

Experienced practitioners often say the data matters more than the model. A simple model with well prepared inputs usually beats a clever model with poor ones. Ghanaian adverts for machine learning roles name feature engineering directly, and real Ghanaian data is messy: district names typed three ways, dates in mixed formats, blank cells from field surveys and amounts recorded in old and new cedis.

## What a feature is

A **feature** is one input column the model uses. Feature engineering means choosing, cleaning and creating those columns so they carry useful signal. Some examples:

* From a planting date, create \`planting_week\` or \`days_after_first_rain\`.
* From a transaction time, create \`hour_of_day\` or \`is_weekend\`.
* From total sales and number of days, create \`sales_per_day\`.

## Categories

Models need numbers, but many columns are categories, such as district or crop type. You cannot just number them Tolon = 1, Savelugu = 2, Yendi = 3, because the model would think Yendi is "bigger" than Tolon. Instead use **one hot encoding**: one column per category, holding 1 if the row belongs to it and 0 otherwise. Clean the spelling first, or "Savelugu" and "savelugu " become two different districts.

## Missing values

Decide case by case. Fill with the median, fill with a fixed value, or add a column that flags "this was missing", which sometimes carries signal itself. Never fill missing targets.

## Putting it together with a pipeline

A scikit learn **pipeline** bundles preparation and model together so the same steps run every time:

\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LinearRegression

prep = ColumnTransformer([
    ("num", SimpleImputer(strategy="median"),
     ["rainfall_mm", "fertiliser_bags"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"),
     ["district"]),
])
model = make_pipeline(prep, LinearRegression())
model.fit(X_train, y_train)
\`\`\`

Here \`X_train\` is a pandas table with the three named columns. Because the imputer and encoder sit inside the pipeline, they learn only from training rows, even inside cross validation. \`handle_unknown="ignore"\` stops the model crashing if a new district appears later.

## Data leakage

**Leakage** is when information that would not be available at prediction time sneaks into the features. The model looks amazing in testing and fails in real use. Common examples:

* Predicting whether a loan defaults using a column like \`days_overdue\`, which only exists after the default happened.
* Filling missing values using the whole dataset's median before splitting, so the test rows influence training.
* Having the same farm appear in both training and test sets across different years, so the model recognises the farm instead of learning the pattern.

Always ask of every feature: would I really know this at the moment I need the prediction?

## A worked example

Wumpini's first model to predict clinic no shows looks almost perfect. She checks her features and finds \`rescheduled_date\`, which is only filled after a patient misses a visit. She removes it. Accuracy drops, but now the model is honest and can actually be used.`,
      practice_task_md: `**Goal:** prepare messy data with a pipeline and hunt for leakage.

1. Create an invented example table of 60 rows for a Wa shop: \`date\`, \`district\` (type some names with different capitals or trailing spaces), \`promo\` (yes or no), \`items_sold\`, and \`restock_ordered\` (filled only after a day sells out).
2. Clean the district spellings and create \`day_of_week\` from \`date\`.
3. Build a pipeline that one hot encodes \`district\`, \`promo\` and \`day_of_week\` and trains a model to predict \`items_sold\`.
4. Look at \`restock_ordered\`. Decide whether it leaks information and write why.
5. Compare cross validation scores with and without it.

**Done looks like:** a notebook with a working pipeline, the two scores, and a short note explaining the leak.`,
      quiz: {
        questions: [
          {
            prompt: "Why should district names not simply be numbered 1, 2 and 3?",
            options: [
              "Numbers take more memory",
              "The model would treat the numbers as an order or size that does not exist",
              "scikit learn cannot read numbers",
              "Districts are never useful features",
            ],
            answer_index: 1,
            explanation: "One hot encoding avoids inventing a false order between categories.",
          },
          {
            prompt: "What is data leakage?",
            options: [
              "Losing data when a session times out",
              "Information that would not be available at prediction time getting into the features",
              "Sharing data with a colleague",
              "Having too few rows",
            ],
            answer_index: 1,
            explanation: "Leakage makes a model look good in testing and fail in real use.",
          },
          {
            prompt: "Why does the example put the imputer and encoder inside a pipeline?",
            options: [
              "To make the code longer",
              "So they learn only from training rows and the same steps run every time",
              "Because models cannot be trained without a pipeline",
              "To remove the need for test data",
            ],
            answer_index: 1,
            explanation: "Pipelines keep preparation consistent and stop test rows influencing training.",
          },
          {
            prompt: "In Wumpini's example, why was `rescheduled_date` a problem?",
            options: [
              "It had the wrong format",
              "It is only filled after a patient misses a visit, so it leaks the answer",
              "It was a category column",
              "It had no missing values",
            ],
            answer_index: 1,
            explanation: "The model was using information from after the event it was meant to predict.",
          },
          {
            prompt: "Which question should you ask of every feature?",
            options: [
              "Is this column the longest?",
              "Would I really know this at the moment I need the prediction?",
              "Does this column have a short name?",
              "Was this column added last?",
            ],
            answer_index: 1,
            explanation: "This question catches most leakage before it fools you.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "unsupervised-learning": {
      explanation_md: `## Why this matters

Sometimes there is no label to predict. A mobile money agent network might want to understand its customers before designing new services, or an NGO might want to see which villages have similar needs. **Unsupervised learning** looks for structure in data without answers to learn from. It is less common in job adverts than prediction, which is why this topic is optional, but it is a useful tool for exploring data and starting conversations.

## Clustering

**Clustering** groups records that are similar to each other. The most common method is **k means**:

1. You choose how many groups you want, called k.
2. The algorithm places k centre points.
3. Each record joins its nearest centre.
4. Each centre moves to the middle of its group.
5. Steps 3 and 4 repeat until the groups stop changing.

The result is a group number for every record. The algorithm does not tell you what the groups mean. You work that out by looking at them.

## Scale matters

k means measures distance between records. If one column is transfers per month (1 to 60) and another is average amount in cedis (5 to 800), the cedi column dominates simply because its numbers are bigger. Scale the columns first so each has a similar range. \`StandardScaler\` does this.

## A worked example

With an invented example table of 100 agent customers:

\`\`\`python
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

scaled = StandardScaler().fit_transform(cust)
km = KMeans(n_clusters=3, n_init=10, random_state=0)
cust["group"] = km.fit_predict(scaled)
print(cust.groupby("group").mean().round(1))
\`\`\`

The final line shows the average of each column per group. You might see one group making many small transfers, one making a few large transfers, and one in between. Abdul-Rahman, who manages the agents, might call them "daily traders", "monthly remitters" and "occasional users", and test whether a new service suits one group.

## Choosing k

There is no single right answer. Try several values and look at whether the groups make sense to people who know the customers. Charts help: plot two features and colour each point by group. If the groups are not useful or change wildly when you rerun with a different random seed, the structure may not really be there.

## Treat results as questions

Clustering always produces groups, even in random data. So treat its output as a set of questions to check, not as facts. Are these groups stable? Do they match what field staff see? Would acting on them treat anyone unfairly? Be careful with personal data too: grouping people by behaviour is still processing personal data, and the same privacy rules apply.

## Other unsupervised tools

* **Dimensionality reduction**, such as principal component analysis, squeezes many columns into a few so you can plot and explore them.
* **Anomaly detection** finds records that look unlike the rest, such as unusual transactions worth a human check.`,
      practice_task_md: `**Goal:** cluster invented customers and interpret the groups honestly.

1. In a free notebook, create an invented example table of 150 customers with \`transfers_per_month\` and \`avg_amount_ghs\`. Make three loose patterns on purpose: many small transfers, few large ones, and few small ones.
2. Scale the columns and run k means with k = 2, 3 and 4.
3. For each k, print the group averages and draw a scatter plot coloured by group.
4. Choose the k that makes most sense and give each group a plain name.
5. Write two questions you would ask field staff to check whether the groups are real.

**Done looks like:** a notebook with three runs, plots, named groups and your two check questions.`,
      quiz: {
        questions: [
          {
            prompt: "What makes unsupervised learning different from supervised learning?",
            options: [
              "It needs more labels",
              "It looks for structure without any answers to learn from",
              "It only works on images",
              "It always gives perfect results",
            ],
            answer_index: 1,
            explanation: "There is no target column; the method looks for patterns on its own.",
          },
          {
            prompt: "Why should you scale columns before k means?",
            options: [
              "Scaling removes missing values",
              "Otherwise the column with bigger numbers dominates the distance",
              "k means only accepts text",
              "Scaling chooses k for you",
            ],
            answer_index: 1,
            explanation: "k means uses distance, so columns need similar ranges to count fairly.",
          },
          {
            prompt: "What does k means not tell you?",
            options: [
              "Which group each record belongs to",
              "Where the group centres are",
              "What each group means",
              "How many groups you asked for",
            ],
            answer_index: 2,
            explanation: "You interpret the groups yourself by looking at their averages and talking to people who know the data.",
          },
          {
            prompt: "Why does the lesson say to treat clustering results as questions?",
            options: [
              "Clustering is illegal in Ghana",
              "Clustering always produces groups, even in random data",
              "The groups are always wrong",
              "Questions are easier to code",
            ],
            answer_index: 1,
            explanation: "Groups must be checked for stability and real meaning before anyone acts on them.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
