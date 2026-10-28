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
              "The Data Analyst track",
              "Digital Skills Bridge only",
              "Graphic Design",
              "No track is needed first",
            ],
            answer_index: 0,
            explanation: "This is an advanced track built on the Python, pandas, SQL and statistics taught in the Data Analyst track.",
          },
          {
            prompt: "In the maize yield example, what does the model actually learn from?",
            options: [
              "Rules a programmer typed in for each farm",
              "Farmers' opinions about how next season will go",
              "This year's list of fertiliser prices by district",
              "Records of past seasons with inputs and yields",
            ],
            answer_index: 3,
            explanation: "Machine learning learns a pattern from past examples rather than from hand written rules.",
          },
          {
            prompt: "Why does this track say you need a laptop or desktop computer?",
            options: [
              "The lessons cannot be opened on a phone at all",
              "Models only run on very expensive, powerful computers",
              "Writing and running model code needs a keyboard and bigger screen",
              "Free online notebooks are blocked on other devices",
            ],
            answer_index: 2,
            explanation: "You can read anywhere, but coding work needs a proper computer, though it does not have to be powerful because free online notebooks can do the computing.",
          },
          {
            prompt: "What does the lesson say about entry level machine learning jobs in Ghana?",
            options: [
              "They are the easiest tech jobs to get with a certificate",
              "They are rare, so most people start in a related role",
              "They need no experience or qualifications of any kind",
              "They exist only outside Africa, so you must relocate",
            ],
            answer_index: 1,
            explanation: "The adverts studied asked for degrees and experience, so a stepping stone role in data, software or research is the realistic route.",
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
              "Almost every model starts as a table that must be cleaned",
              "pandas is the library that trains neural networks",
              "pandas removes the need to learn any statistics",
              "Models refuse to read data in any other format",
            ],
            answer_index: 0,
            explanation: "The lesson explains that most model work is ordinary data code, and the data usually starts as a pandas table.",
          },
          {
            prompt: "What does SQL let you do in a machine learning job, according to the lesson?",
            options: [
              "Draw charts of a model's accuracy",
              "Speed up neural network training",
              "Replace Python for writing models",
              "Fetch your own training data from a database",
            ],
            answer_index: 3,
            explanation: "Data often lives in a database, and SQL lets you get it yourself.",
          },
          {
            prompt: "What does the lesson say about free hosted notebooks such as Google Colab?",
            options: [
              "They only work on a powerful laptop with a large graphics card",
              "They are unlimited, so you never need to read their terms",
              "They run code on their servers, but free limits change over time",
              "They only run offline, so they use no data at all",
            ],
            answer_index: 2,
            explanation: "The heavy computing happens on the service's servers, and free usage limits can change, so check the official terms.",
          },
          {
            prompt: "Which maths level does the lesson say you should start from?",
            options: [
              "University calculus and proofs",
              "School algebra and straight lines",
              "No maths at any point in the track",
              "Advanced statistics from a degree",
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
              "A large social media following",
              "A degree and several years of experience",
              "One certificate from an online course",
            ],
            answer_index: 2,
            explanation: "Almost every machine learning advert asked for a degree and experience, and none was entry level.",
          },
          {
            prompt: "Which of these is a stepping stone role named in the lesson?",
            options: [
              "Sales agent for a phone network",
              "Research assistant at an NGO or university",
              "Social media influencer for a brand",
              "Cashier at a supermarket in Accra",
            ],
            answer_index: 1,
            explanation: "Research assistant posts involve data cleaning and analysis and sometimes model work.",
          },
          {
            prompt: "What advice does the lesson give about remote and contract offers?",
            options: [
              "Read every offer carefully and never pay to apply",
              "Accept any offer that mentions AI in the title",
              "Pay a small fee to secure your place early",
              "Apply only to roles based outside Africa",
            ],
            answer_index: 0,
            explanation: "Remote work can be a real route, but genuine employers do not charge you to apply.",
          },
          {
            prompt: "In the worked example, how did Fuseini get his first real machine learning project?",
            options: [
              "He copied a finished project from the internet",
              "He waited until a machine learning advert appeared",
              "He paid a company to give him a project to do",
              "He built a model for the NGO he already worked at",
            ],
            answer_index: 3,
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
              "A chart that shows how data changes",
              "A Python library for loading files",
              "The probability that a model is right",
              "A list of numbers describing one record",
            ],
            answer_index: 3,
            explanation: "One record, such as a farm's rainfall, fertiliser and planting week, becomes a list of numbers called a vector.",
          },
          {
            prompt: "What does gradient descent do during training?",
            options: [
              "Deletes the rows the model gets most wrong",
              "Draws a chart of the training results",
              "Nudges settings to make the model less wrong",
              "Chooses which Python library to use next",
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
              "A probability that can still turn out wrong",
              "A guaranteed result for that loan",
              "The number of loans in the dataset",
              "How long the model took to train",
            ],
            answer_index: 0,
            explanation: "Probability tells you how likely an outcome is, and even confident predictions are sometimes wrong.",
          },
          {
            prompt: "What study habit does the lesson recommend for maths?",
            options: [
              "Skip the maths and rely only on library code",
              "Memorise each formula without drawing pictures",
              "Leave all maths until the end of the track",
              "Work an example by hand, then check it in code",
            ],
            answer_index: 3,
            explanation: "Working by hand then checking with NumPy builds real understanding.",
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
              "10.5",
              "9.1",
            ],
            answer_index: 3,
            explanation: "Multiply matching entries and add them: 5 × 1.5 + 2 × 0.8 = 9.1.",
          },
          {
            prompt: "A matrix with 3 rows and 2 columns has which shape?",
            options: [
              "(2, 3)",
              "(6, 1)",
              "(3, 2)",
              "(5, 0)",
            ],
            answer_index: 2,
            explanation: "Shape is written as rows first, then columns.",
          },
          {
            prompt: "For a matrix times a vector to work, what must match?",
            options: [
              "The number of rows and the size of the bias",
              "The matrix's columns and the vector's length",
              "The largest number in the matrix and vector",
              "The number of rows and the number of columns",
            ],
            answer_index: 1,
            explanation: "Each row's entries are paired with the vector's entries, so the counts must be equal.",
          },
          {
            prompt: "What does the `@` symbol do in the NumPy example?",
            options: [
              "Multiplies matrices together",
              "Adds two arrays together",
              "Prints the shape of an array",
              "Imports the NumPy library",
            ],
            answer_index: 0,
            explanation: "In Python, `@` multiplies matrices, here giving one prediction per farm.",
          },
          {
            prompt: "Why is matrix multiplication so important in machine learning?",
            options: [
              "It makes datasets smaller before training",
              "It removes missing values from the data",
              "It is mainly used for drawing charts",
              "It computes predictions for many rows at once",
            ],
            answer_index: 3,
            explanation: "One matrix multiplication handles every row in a single step, and computers do it very fast.",
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
              "How long training takes to finish",
              "How many features the data contains",
              "How wrong the predictions are overall",
              "How fast the computer can calculate",
            ],
            answer_index: 2,
            explanation: "The loss is one number summarising the model's error, and lower is better.",
          },
          {
            prompt: "In the hill picture, what does the derivative tell you?",
            options: [
              "How high the hill is above the valley",
              "Which way the ground slopes and how steeply",
              "Exactly where the lowest point of the valley is",
              "How many steps you have taken so far",
            ],
            answer_index: 1,
            explanation: "The derivative is the slope of the loss, showing which direction makes it go down.",
          },
          {
            prompt: "What happens if the learning rate is far too big?",
            options: [
              "The model overshoots and may never settle",
              "Training quickly becomes perfectly accurate",
              "The training data is deleted after each step",
              "Nothing changes because the rate is ignored",
            ],
            answer_index: 0,
            explanation: "Steps that are too large jump past the valley in the loss.",
          },
          {
            prompt: "In each pass of gradient descent, how are the weights changed?",
            options: [
              "They are reset to new random values",
              "They are doubled to speed up learning",
              "They stay fixed while the data changes",
              "They take a small step against the slope",
            ],
            answer_index: 3,
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

A probability is a number from 0 to 1 that says how likely something is. 0 means it never happens, 1 means it always happens, and 0.25 means it happens about one time in four over many similar cases. A single prediction of 0.9 can still turn out wrong. It only promises that, across many cases given 0.9, about nine in ten should happen, and only if the model is well **calibrated**, meaning its numbers have been checked against real outcomes.

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
              "The probability of A plus the probability of B",
              "The probability that A and B never happen",
              "The number A divided by the number B",
              "The probability of A given that B is true",
            ],
            answer_index: 3,
            explanation: "The bar is read as \"given\", so it is the chance of A when we already know B.",
          },
          {
            prompt: "In the fraud example, why are most flagged transfers honest?",
            options: [
              "The model was trained on the wrong country's data",
              "Honest customers send more money than fraudsters",
              "Fraud is rare, so false alarms outnumber real cases",
              "The threshold was set to zero by mistake",
            ],
            answer_index: 2,
            explanation: "With a low base rate, false alarms from the large honest group dominate the flags.",
          },
          {
            prompt: "A model gives a probability of 0.9 for one case. What does that promise?",
            options: [
              "The outcome will definitely happen this time",
              "About nine in ten such cases should happen",
              "The model is right 90 percent of the time overall",
              "The outcome will happen within nine days",
            ],
            answer_index: 1,
            explanation: "A probability describes likelihood over many similar cases, so this one case could still go the other way.",
          },
          {
            prompt: "How should the threshold for approving loans be chosen?",
            options: [
              "By weighing the cost of each kind of mistake",
              "Always use 0.5, because it is the standard value",
              "Pick the highest number possible to be safe",
              "Let the model pick its own threshold in training",
            ],
            answer_index: 0,
            explanation: "Different thresholds trade one kind of error for another, so people must decide which costs matter more, partly as a business and ethical choice.",
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
              "matplotlib",
              "pandas",
              "PyTorch",
            ],
            answer_index: 2,
            explanation: "pandas handles tables, which is how most real data arrives.",
          },
          {
            prompt: "What does scikit learn provide, according to the lesson?",
            options: [
              "Charts and dashboards for reports",
              "Classic models and tools to test them",
              "A web server for hosting apps",
              "A faster replacement for Python",
            ],
            answer_index: 1,
            explanation: "scikit learn gives classic models, tools to split and test data, and ways to prepare features.",
          },
          {
            prompt: "In Amina's work, where does most of her time go?",
            options: [
              "Loading, exploring and cleaning the data",
              "Choosing between deep learning libraries",
              "Writing the single line that trains the model",
              "Designing logos and covers for her reports",
            ],
            answer_index: 0,
            explanation: "The model step is short; preparing data takes most of the time.",
          },
          {
            prompt: "Why should you choose Restart and run all before sharing a notebook?",
            options: [
              "It deletes any private data in the notebook",
              "It makes the model's predictions more accurate",
              "It uploads the notebook to your drive for you",
              "It proves the notebook runs from top to bottom",
            ],
            answer_index: 3,
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
              "Two charts of the data",
              "The features and the target",
              "Two Python libraries",
              "Training time and test time",
            ],
            answer_index: 1,
            explanation: "`X` holds the input features and `y` holds the answers the model learns to predict.",
          },
          {
            prompt: "Why are rows with a blank yield dropped in the example?",
            options: [
              "A row with no answer cannot teach the model",
              "They make the CSV file too large to load",
              "pandas is unable to read blank values",
              "Yield is the least important column",
            ],
            answer_index: 0,
            explanation: "The target is what the model learns from, so rows without it are removed rather than guessed.",
          },
          {
            prompt: "What does the lesson say about filling blank fertiliser values with the median?",
            options: [
              "It is always the correct thing to do",
              "It should never be done under any circumstances",
              "It also fills in the missing target values",
              "It is a choice to check with the data collectors",
            ],
            answer_index: 3,
            explanation: "If a blank really means no fertiliser was used, zero might be more honest, so ask whoever collected the data.",
          },
          {
            prompt: "`X.shape` is `(199, 2)` and `y.shape` is `(150,)`. What is most likely wrong?",
            options: [
              "The model is too small for the data",
              "There are too many feature columns",
              "Rows were dropped from only one of them",
              "NumPy has not been installed properly",
            ],
            answer_index: 2,
            explanation: "The first numbers must match because each row of `X` needs one answer in `y`.",
          },
          {
            prompt: "Which of these should you never fill in with a guess?",
            options: [
              "Missing fertiliser values",
              "Missing target values",
              "Missing rainfall values",
              "Missing planting weeks",
            ],
            answer_index: 1,
            explanation: "Guessing the answers you are trying to predict makes the model look better than it is.",
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

These are named as examples, not recommendations. Free tiers and their limits change over time, so always read the current terms on each service's official pages, such as the [Colab FAQ](https://research.google.com/colaboratory/faq.html) and [Kaggle's notebook documentation](https://www.kaggle.com/docs/notebooks).

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
              "They are kept safely on the service forever",
              "They disappear unless you saved them elsewhere",
              "They are emailed to your account automatically",
              "They move into your next notebook by themselves",
            ],
            answer_index: 1,
            explanation: "The hosted machine is temporary, so copy anything important to your drive or device.",
          },
          {
            prompt: "When does the lesson suggest switching on a GPU?",
            options: [
              "For training neural networks, then off again",
              "For every notebook, from start to finish",
              "Only while loading CSV files into pandas",
              "Never, because GPUs are not allowed for free",
            ],
            answer_index: 0,
            explanation: "Classic models run fine without one, so save your GPU allowance for deep learning.",
          },
          {
            prompt: "Why should you check a free notebook service's official pages?",
            options: [
              "To find a discount code for a paid plan",
              "Because the lesson names one service as the best",
              "To download the notebook software to install",
              "Because free tiers and limits change over time",
            ],
            answer_index: 3,
            explanation: "Limits are not fixed, so the official terms are the only reliable source.",
          },
          {
            prompt: "Which habit saved Sumaila's work when his session timed out?",
            options: [
              "He kept the GPU switched on all day long",
              "He trained on a much bigger dataset instead",
              "He saved early and saved the model at once",
              "He avoided training a model in the session",
            ],
            answer_index: 2,
            explanation: "Saving the notebook first and saving the model as soon as training ended meant the timeout cost him nothing.",
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

Mariama works for a savings group network in the Upper East Region. Leaders want to know which members might fall behind on loan repayments, so they can offer support early. She frames it as classification: will this member miss two or more repayments in the next three months? She prepares features such as savings history and past repayment record, holds back a portion of the records, and compares a simple model with a baseline that predicts nobody will fall behind. Her model catches more members who need help than the baseline does, so she writes up how many it catches, how many it wrongly flags, and its limits, including that new members with short histories get less reliable predictions.

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
              "Unsupervised learning",
              "Data cleaning",
              "Classification",
            ],
            answer_index: 3,
            explanation: "The label is a category, so it is classification.",
          },
          {
            prompt: "Why does the workflow start with a baseline?",
            options: [
              "It is the most accurate model you can build",
              "It replaces the need for a held out test set",
              "It sets a simple standard any model must beat",
              "It makes every later model train faster",
            ],
            answer_index: 2,
            explanation: "If a model cannot beat a simple rule like predicting the average, it is not useful.",
          },
          {
            prompt: "Why does the lesson say classic models are often used on tables of business data?",
            options: [
              "They are the only models that can read numbers",
              "They are quick, explainable and often accurate",
              "They never make mistakes on business data",
              "They need no data at all to make predictions",
            ],
            answer_index: 1,
            explanation: "For tabular problems, classic models are faster to train, easier to explain and often as accurate as deep learning.",
          },
          {
            prompt: "In Mariama's project, which limit did she report?",
            options: [
              "Predictions are weaker for newer members",
              "The model needs a GPU to make predictions",
              "The model cannot use savings history data",
              "The baseline did better than her model",
            ],
            answer_index: 0,
            explanation: "New members with short histories get less reliable predictions, and reporting this is part of the final step.",
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
              "Import, export, upload",
              "Create, fit, predict",
              "Clean, sort, print",
            ],
            answer_index: 2,
            explanation: "You create a model, fit it to training data, then predict on new data.",
          },
          {
            prompt: "What does the `DummyRegressor` in the example always predict?",
            options: [
              "Zero for every farm",
              "The average training target",
              "The largest yield it has seen",
              "A new random number each time",
            ],
            answer_index: 1,
            explanation: "It is a baseline that predicts the average, which a real model must beat.",
          },
          {
            prompt: "What does mean absolute error tell you?",
            options: [
              "The average size of the model's mistakes",
              "How many rows were used for testing",
              "The probability of each possible class",
              "How long the model took to train",
            ],
            answer_index: 0,
            explanation: "It averages the size of the errors in the target's units, here bags of maize.",
          },
          {
            prompt: "Logistic regression is used for which kind of task?",
            options: [
              "Regression only",
              "Clustering",
              "Drawing charts",
              "Classification",
            ],
            answer_index: 3,
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

**Overfitting** is when a model memorises its training data, including its noise and accidents, instead of learning the general pattern. Think of a student who memorises last year's exam answers word for word. They score full marks on that paper and fail a new one. An overfit model does the same. The opposite problem, **underfitting**, is a model too simple to capture the pattern at all. In books and interviews you will also hear these called high **variance** (overfitting) and high **bias** (underfitting). This bias is a different idea from the bias number inside a model and from unfair bias.

The signal of overfitting is a big gap: excellent scores on training data, much worse scores on test data.

## Train, validation and test

* The **training set** is what the model learns from.
* The **validation set** is used to compare models and settings while you work.
* The **test set** is locked away and used once, at the end, to report honest performance.

If you keep checking the test set and adjusting, you slowly tune the model to it, and the final score stops being honest.

## Cross validation

With small datasets, one split can be lucky or unlucky. **Cross validation** splits the data into, say, five parts, trains five times with a different part held out each time, and averages the scores. Here \`y\` is a yes or no label:

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
              "Low scores on both the training and the test data",
              "The model finishes training in a few seconds",
              "High training scores but much lower test scores",
              "The dataset has a large number of columns",
            ],
            answer_index: 2,
            explanation: "A big gap between training and test performance shows the model memorised rather than learned.",
          },
          {
            prompt: "Why should the test set be used only once, at the end?",
            options: [
              "It is too large to load into memory more than once",
              "Repeated checking tunes the model to it, so scores stop being honest",
              "scikit learn deletes the test set after it is used once",
              "The test set has no labels until the very end",
            ],
            answer_index: 1,
            explanation: "Keeping the test set locked away keeps the final measurement honest.",
          },
          {
            prompt: "A model always predicts \"healthy\" when 2 in 100 patients are sick. Why is its accuracy misleading?",
            options: [
              "It scores 98 percent yet catches no sick patients",
              "Accuracy cannot be calculated for health data",
              "The model is overfitting to the training data",
              "Accuracy is a measure used only for regression",
            ],
            answer_index: 0,
            explanation: "With a rare outcome, accuracy can be high while the model is useless.",
          },
          {
            prompt: "What does recall measure?",
            options: [
              "How quickly the model makes a prediction",
              "The share of flagged cases that were real",
              "The number of features used by the model",
              "The share of real positive cases it caught",
            ],
            answer_index: 3,
            explanation: "Recall is about catching real positives, which matters most when missing a case is costly.",
          },
          {
            prompt: "What does cross validation do?",
            options: [
              "Removes duplicate rows from the dataset before training",
              "Converts the data into a format the model can read",
              "Trains and tests on several splits and averages the scores",
              "Doubles the size of the dataset by copying rows",
            ],
            answer_index: 2,
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
              "The model would read a false order or size into them",
              "Numbers use far more memory than text does",
              "scikit learn is unable to read numeric columns",
              "District is never a useful feature for a model",
            ],
            answer_index: 0,
            explanation: "One hot encoding avoids inventing a false order between categories.",
          },
          {
            prompt: "What is data leakage?",
            options: [
              "Losing your files when a notebook session times out",
              "Sharing a dataset with a colleague by email",
              "Having too few rows to train a reliable model",
              "Features that use information unknown at prediction time",
            ],
            answer_index: 3,
            explanation: "Leakage makes a model look good in testing and fail in real use.",
          },
          {
            prompt: "Why does the example put the imputer and encoder inside a pipeline?",
            options: [
              "To make the code longer and easier to grade",
              "Because models cannot be trained without one",
              "So they learn only from training rows, every time",
              "To remove the need for a held out test set",
            ],
            answer_index: 2,
            explanation: "Pipelines keep preparation consistent and stop test rows influencing training.",
          },
          {
            prompt: "In Wumpini's example, why was `rescheduled_date` a problem?",
            options: [
              "Its dates were stored in the wrong format",
              "It is only filled after a visit is missed",
              "It was a category column with many values",
              "It had no missing values, so it added nothing",
            ],
            answer_index: 1,
            explanation: "The model was using information from after the event it was meant to predict.",
          },
          {
            prompt: "Which question should you ask of every feature?",
            options: [
              "Would I know this when I need the prediction?",
              "Is this the column with the most unique values?",
              "Does this column have a short, clear name?",
              "Was this column added to the file last?",
            ],
            answer_index: 0,
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
              "It needs many more labelled examples",
              "It only works on photos and audio",
              "It finds structure without labelled answers",
              "It always gives perfectly stable results",
            ],
            answer_index: 2,
            explanation: "There is no target column; the method looks for patterns on its own.",
          },
          {
            prompt: "Why should you scale columns before k means?",
            options: [
              "Scaling fills in any missing values",
              "Otherwise bigger numbers dominate distance",
              "k means only accepts text columns",
              "Scaling chooses the value of k for you",
            ],
            answer_index: 1,
            explanation: "k means uses distance, so columns need similar ranges to count fairly.",
          },
          {
            prompt: "What does k means not tell you?",
            options: [
              "What each group actually means",
              "Which group each record belongs to",
              "Where each group's centre is",
              "How many groups you asked for",
            ],
            answer_index: 0,
            explanation: "You interpret the groups yourself by looking at their averages and talking to people who know the data.",
          },
          {
            prompt: "Why does the lesson say to treat clustering results as questions?",
            options: [
              "Clustering is not allowed on Ghanaian data",
              "The groups it finds are always wrong",
              "Questions are easier to put into code",
              "It always makes groups, even in random data",
            ],
            answer_index: 3,
            explanation: "Groups must be checked for stability and real meaning before anyone acts on them.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "deep-learning": {
      explanation_md: `## Why deep learning matters

Classic models work well on tables. But some data has no neat columns: a photo of a cassava leaf, a voice note in Dagbani, a paragraph of Twi text, a satellite image of farmland. **Deep learning** is the family of methods that handles this kind of data, and it powers speech recognition, image recognition, translation and the large language models behind modern chat assistants. Ghanaian employers working on speech tools for local languages and on AI products name deep learning libraries such as PyTorch, TensorFlow and Keras in their adverts.

## What makes it "deep"

Deep learning uses **neural networks**: layers of simple units, each taking numbers in, multiplying them by weights, adding them up and passing the result on. "Deep" just means many layers. Early layers learn simple patterns; later layers combine them into complex ones. In an image model, early layers might respond to edges, middle layers to shapes like leaf spots, and the last layers to "healthy" or "diseased".

The important change from classic machine learning is that you no longer have to design every feature by hand. Given enough examples, the network learns useful features from the raw pixels, sounds or text itself.

## The trade offs

Deep learning is powerful but not always the right choice:

* **It needs a lot of data.** Thousands or millions of labelled examples are common. For Ghanaian languages and local problems, that data often does not exist yet, which is both a challenge and an opportunity.
* **It needs more computing.** Training usually needs a GPU, which is why free hosted notebooks matter for learners.
* **It is harder to explain.** Saying why a network made a decision is difficult, which matters for loans, health and anything that affects people's lives.
* **On ordinary tables, classic models often win.** Try a classic model first and use deep learning when the data calls for it.

## A common shortcut: reuse a trained model

Very few people train big networks from scratch. Instead they take a model already trained on a large dataset and **fine tune** it on their smaller, local dataset. A model trained on millions of general photos can be fine tuned on a few thousand photos of maize leaves from farms around Yendi. This is called **transfer learning**, and it is how most practical deep learning gets done, especially where data is scarce.

## A worked example in words

Hawa's team wants to help farmers spot a leaf disease from a photo. They collect a few thousand labelled leaf photos with the farmers' permission, fine tune an existing image model in a free notebook, and test it on photos from farms the model never saw. It works well in good light but struggles with blurry photos taken at dusk, so they add a message asking farmers to retake unclear photos.

## What this section covers

* **Neural networks:** how they work and how to train a small one.
* **Language, speech and Ghanaian languages:** how text and audio become model inputs.
* **Large language models and embeddings:** what they are, what they can do and where they fail.`,
      practice_task_md: `**Goal:** decide when deep learning is the right tool.

1. List five Ghanaian problems where data might be used, such as predicting monthly shop sales, recognising spoken numbers in Dagbani, sorting photos of cassava leaves, flagging unusual mobile money transfers, or summarising long reports.
2. For each, write the type of data (table, image, audio or text), whether you would start with a classic model or deep learning, and why.
3. For the deep learning cases, write where the training data could come from, how you would get permission, and whether an existing trained model might be fine tuned.

**Done looks like:** a short table or list covering all five problems, with a reason for each choice. Discuss it with a mentor or study partner.`,
      quiz: {
        questions: [
          {
            prompt: "What kind of data is deep learning especially good at?",
            options: [
              "Small spreadsheets with a few clean columns",
              "Only numbers that fall between 0 and 1",
              "Data where no examples exist at all",
              "Images, audio and text without neat columns",
            ],
            answer_index: 3,
            explanation: "Deep learning learns features from raw pixels, sounds and text.",
          },
          {
            prompt: "What does \"deep\" mean in deep learning?",
            options: [
              "The model is always very accurate",
              "The data is stored deep in a database",
              "The network has many stacked layers",
              "The code runs to thousands of lines",
            ],
            answer_index: 2,
            explanation: "Deep simply refers to many stacked layers.",
          },
          {
            prompt: "What is transfer learning?",
            options: [
              "Moving a dataset from a phone onto a laptop",
              "Fine tuning an already trained model on local data",
              "Training a brand new model for every single problem",
              "Rewriting a model's code in another language",
            ],
            answer_index: 1,
            explanation: "Reusing a trained model is how most practical deep learning gets done, especially where data is scarce.",
          },
          {
            prompt: "According to the lesson, what should you usually try first for ordinary table data?",
            options: [
              "A classic model",
              "The largest neural network you can find",
              "A large language model",
              "Nothing, tables cannot be modelled",
            ],
            answer_index: 0,
            explanation: "On tabular data, classic models are often as good and easier to explain.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "neural-networks": {
      explanation_md: `## Why this matters

Neural networks sit behind speech recognition, image models and language models. You will rarely design a big one from scratch in your first roles, but you must understand what layers, activations, epochs and loss mean, or every training log and fine tuning guide will look like noise. Ghanaian AI adverts name PyTorch, TensorFlow and Keras for this reason.

## One unit, then a layer

A single unit (often called a neuron) does what you already know from the maths section: a dot product of inputs and weights, plus a bias. Then it applies an **activation function**. The most common is **ReLU**, which keeps positive numbers and turns negatives into zero.

A **layer** is many units side by side, each with its own weights. In matrix terms, a layer is one matrix multiplication followed by the activation.

## Why the activation matters

Without activations, stacking layers is pointless: a chain of straight line calculations is still a straight line. The activation adds a bend. With enough units and layers, those bends let a network fit very complicated patterns.

## Training

Training a network is gradient descent, the same loop from the maths section:

1. **Forward pass:** feed inputs through the layers to get predictions.
2. **Loss:** measure how wrong they are.
3. **Backward pass:** the library works out the gradient of the loss for every weight. This step is called **backpropagation**.
4. **Update:** an **optimiser** such as Adam nudges every weight.

One pass through all the training data is an **epoch**.

## A small network in PyTorch

This predicts whether an invented example farm had an above usual yield, from scaled rainfall and fertiliser values:

\`\`\`python
import torch
from torch import nn

X = torch.tensor(X_train, dtype=torch.float32)
y = torch.tensor(y_train, dtype=torch.float32).reshape(-1, 1)

model = nn.Sequential(nn.Linear(2, 16), nn.ReLU(), nn.Linear(16, 1))
loss_fn = nn.BCEWithLogitsLoss()
opt = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(300):
    opt.zero_grad()
    loss = loss_fn(model(X), y)
    loss.backward()
    opt.step()
\`\`\`

Reading it: the first layer takes 2 inputs to 16 units, ReLU adds the bend, and the last layer gives one number. \`BCEWithLogitsLoss\` is a loss for yes or no labels. In the loop, \`zero_grad\` clears old gradients, \`backward\` computes new ones and \`step\` updates the weights. Afterwards, \`torch.sigmoid(model(X))\` turns outputs into probabilities from 0 to 1.

## Practical lessons

* **Scale your inputs.** Networks train badly when one feature is in hundreds and another in single digits.
* **Watch validation loss.** If training loss keeps falling while validation loss rises, the network is overfitting. Stop earlier or use more data.
* **Start small.** A tiny network that trains is more useful than a huge one that does not.
* **Compare with a classic model.** On a small table like this, logistic regression may do just as well.`,
      practice_task_md: `**Goal:** train a small network and compare it with a classic model.

1. On a laptop or desktop, open a free hosted notebook. PyTorch is usually already installed on hosted services; if not, install it.
2. Create an invented example dataset of 300 farms with rainfall, fertiliser and a yes or no label for above usual yield. Split it, then scale the features with \`StandardScaler\`.
3. Train the network from the lesson. Every 50 epochs, print the training loss.
4. Compute accuracy on the test set by turning probabilities above 0.5 into a yes.
5. Train a \`LogisticRegression\` on the same split and compare accuracies.

**Done looks like:** a notebook with a falling loss log, two test accuracies and a short note saying which model you would use and why.`,
      quiz: {
        questions: [
          {
            prompt: "What does the ReLU activation do?",
            options: [
              "Doubles every number it receives",
              "Keeps positives and turns negatives to zero",
              "Converts the numbers it receives into text",
              "Removes the bias from every unit",
            ],
            answer_index: 1,
            explanation: "ReLU passes positives through and sets negatives to zero, adding a bend to the calculation.",
          },
          {
            prompt: "Why does a network need activation functions between layers?",
            options: [
              "Without them, the layers add up to one straight line",
              "They make each training step run faster",
              "They store the training data inside the network",
              "They choose the learning rate automatically",
            ],
            answer_index: 0,
            explanation: "Activations add the bends that let networks fit complex patterns.",
          },
          {
            prompt: "What is an epoch?",
            options: [
              "One weight inside the network",
              "A type of activation function",
              "The final accuracy on the test set",
              "One pass through all the training data",
            ],
            answer_index: 3,
            explanation: "Training usually runs for many epochs.",
          },
          {
            prompt: "In the PyTorch loop, what does `loss.backward()` do?",
            options: [
              "Deletes the loss value",
              "Prints the loss on screen",
              "Computes every weight's gradient",
              "Saves the model to a file",
            ],
            answer_index: 2,
            explanation: "This is backpropagation, after which the optimiser updates the weights.",
          },
          {
            prompt: "Training loss keeps falling while validation loss rises. What is happening?",
            options: [
              "The network is underfitting",
              "The network is overfitting",
              "The learning rate is zero",
              "The data has no labels",
            ],
            answer_index: 1,
            explanation: "Improving on training data while getting worse on unseen data is overfitting.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "language-and-speech": {
      explanation_md: `## Why this matters

Ghanaians speak Dagbani, Twi, Ewe, Ga, Dagaare, Gonja and many other languages every day, yet most language technology works best in English. Speech and text tools in local languages could let a farmer in Karaga ask for weather advice by voice, or let a health worker hear guidance in a patient's own language. At least one Ghanaian agritech employer has advertised for engineers to build speech recognition and language models for exactly these low resource languages. It is hard work, and valuable.

## What "low resource" means

Language models learn from huge amounts of text and recorded speech. English has an enormous supply online. Most Ghanaian languages have far less written text, few labelled datasets and limited recorded speech with transcripts. Other complications:

* **Spelling varies.** People write the same word in different ways, especially in WhatsApp messages and social media.
* **Special letters and tone.** Letters such as ɛ and ɔ appear in Twi, Ewe and Dagbani writing, but many keyboards drop them, so the same word appears with and without them.
* **Code switching.** People mix English and a local language in one sentence, which confuses models trained on one language at a time.

## Turning text into numbers

Models need numbers, so text is first split into pieces called **tokens**: whole words, parts of words or single characters. Each token gets an ID number, and later a vector. For languages with little data, splitting into **characters or short character sequences** often works better than whole words, because it copes with spelling variation and rare words.

## Turning speech into numbers

Audio is a long list of pressure readings, many thousands per second. Speech models usually convert it into a **spectrogram**, a picture of which frequencies are loud at each moment, and learn from that. A speech recogniser learns to map those pictures to text, which is why it needs many hours of recordings paired with accurate transcripts.

## A worked example: which language is this?

A first project could be **language identification**: given a short message, predict whether it is Dagbani, Twi, Ewe or English. With a few hundred labelled messages per language, a classic model on character sequences is a sensible first approach:

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

model = make_pipeline(
    TfidfVectorizer(analyzer="char_wb", ngram_range=(1, 3)),
    LogisticRegression(max_iter=1000))
model.fit(train_texts, train_labels)
\`\`\`

Here \`train_texts\` is a list of messages and \`train_labels\` the language of each, from a dataset you collected with permission or an openly licensed one.

## Doing it responsibly

Collect text and voice only with clear consent, explain how it will be used, and remove names and phone numbers. Work with native speakers to check labels and transcripts, and credit the communities whose language you use. African research communities such as Masakhane work openly on language tools for African languages and welcome contributors.`,
      practice_task_md: `**Goal:** plan a small, ethical language dataset.

1. Choose a Ghanaian language you speak well, such as Dagbani, Twi or Ewe.
2. Write a one page plan to collect 200 short text messages in that language and 200 in English for a language identification model: who you would ask, how you would explain the purpose and get consent, and how you would remove names and phone numbers.
3. Write ten short sentences yourself in your chosen language, then note any spelling choices (special letters, tone marks, alternative spellings) a model would need to cope with.
4. If you have a laptop or desktop, try the pipeline from the lesson on your own small labelled set, using sentences you wrote yourself.

**Done looks like:** your consent and collection plan, your ten sentences with spelling notes, and optionally a notebook with a first model. Ask a native speaker to check your sentences.`,
      quiz: {
        questions: [
          {
            prompt: "What does it mean that many Ghanaian languages are \"low resource\"?",
            options: [
              "Very few people speak them at home today",
              "Little text, labelled data and transcribed speech exist",
              "They have no written grammar or spelling at all",
              "They cannot be typed on any phone or computer",
            ],
            answer_index: 1,
            explanation: "Low resource refers to the shortage of data, not the number of speakers.",
          },
          {
            prompt: "Why can splitting text into characters work better than whole words for these languages?",
            options: [
              "It copes better with varied spellings and rare words",
              "Characters are more accurate than words in every language",
              "Models are unable to read whole words as input",
              "It makes the dataset much smaller to download",
            ],
            answer_index: 0,
            explanation: "Character pieces handle the same word spelled in different ways.",
          },
          {
            prompt: "What is a spectrogram?",
            options: [
              "A list of the tokens in a sentence",
              "A type of microphone for recording speech",
              "A label saying which language was spoken",
              "A picture of loud frequencies over time",
            ],
            answer_index: 3,
            explanation: "Speech models usually learn from spectrograms rather than raw audio readings.",
          },
          {
            prompt: "What is code switching?",
            options: [
              "Changing from one programming language to another",
              "Encrypting a message before sending it",
              "Mixing English and a local language in one sentence",
              "Switching a GPU on and off to save time",
            ],
            answer_index: 2,
            explanation: "Mixed language sentences are common and challenge models trained on one language.",
          },
          {
            prompt: "Which practice does the lesson require when collecting voice or text data?",
            options: [
              "Collect as much as possible without asking anyone",
              "Get consent and remove names and phone numbers",
              "Use only messages copied from strangers online",
              "Keep the purpose secret so people speak naturally",
            ],
            answer_index: 1,
            explanation: "People's words and voices are personal data and must be collected with consent and a clear explanation.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "llms-and-embeddings": {
      explanation_md: `## Why this matters

Large language models (LLMs) power the chat assistants many people now use for writing, summarising and answering questions. Ghanaian employers advertise for engineers who can build applications on them, fine tune them, and design prompts. To do that work well, and safely, you need to understand what these models actually do, because it is not what most people assume.

## What an LLM does

An LLM is a very large neural network trained to do one thing: **predict the next token** of text. Given "The capital of the Northern Region is", it assigns a probability to every possible next token and picks one. Then it adds that token to the text and predicts again, one piece at a time, until it stops.

Trained on enormous amounts of text, this simple task produces models that can answer questions, summarise, translate and write code. Most modern LLMs use a design called the **transformer**, whose key idea, **attention**, lets each token look at every other token in the text to decide what matters for the next prediction.

After this first training, models are usually tuned further on examples of helpful answers and human feedback, which makes them better at following instructions.

## Why LLMs state false things confidently

An LLM predicts text that **sounds** likely. It has no built in way to check facts. When it does not know something, it can still produce fluent, confident text that is wrong. This is often called **hallucination**. It may invent a statistic, a law section, a reference or a person. Everything an LLM produces for real use must be checked, especially anything about health, money or the law.

LLMs also have other limits: knowledge that stops at their training date, weaker performance in low resource languages such as many Ghanaian languages, and biases learned from their training text.

## Embeddings

An **embedding** is a vector of numbers that represents the meaning of a word, sentence or document. Models learn embeddings so that texts with similar meanings get vectors that are close together. "Maize price in Tamale market" and "cost of corn in Tamale" should land near each other even though they share few words.

You measure closeness with **cosine similarity**, which compares the direction of two vectors: close to 1 means very similar, close to 0 means unrelated.

## A worked example: search by meaning

Mariama works for an agricultural NGO with hundreds of advice sheets. Farmers ask questions in many different words. She:

1. Uses an embedding model to turn every advice sheet into a vector, once.
2. Turns each farmer's question into a vector.
3. Finds the advice sheets with the highest cosine similarity to the question.

This is **semantic search**. It finds relevant sheets even when the question uses different words from the sheet. If she then gives the best sheets to an LLM and asks it to answer **only** from them, that is called **retrieval augmented generation**. Grounding the answer in trusted documents reduces made up answers, though it does not remove them, so she still tests the answers carefully with real questions.`,
      practice_task_md: `**Goal:** see embeddings and LLM limits for yourself, using little data.

1. Write ten short questions a farmer, trader or student in your area might ask, in English. Group them by hand into topics.
2. On a laptop or desktop with a free hosted notebook, use a small, openly available sentence embedding model (for example one listed in the Hugging Face model hub) to embed the questions, then compute cosine similarity between them. Check whether the closest pairs match your hand grouping.
3. Separately, ask any free chat assistant three factual questions about your district or a Ghanaian law. Check each answer against an official source.
4. Note which answers were right, wrong or impossible to verify.

**Done looks like:** a notebook or note with your similarity results compared with your grouping, plus your fact check table. Never paste personal data into a chat assistant.`,
      quiz: {
        questions: [
          {
            prompt: "What is the core task an LLM is trained to do?",
            options: [
              "Search the internet for answers",
              "Check facts against a database",
              "Translate only English and French",
              "Predict the next token of text",
            ],
            answer_index: 3,
            explanation: "LLMs generate text one token at a time by predicting what comes next.",
          },
          {
            prompt: "Why can an LLM state false things confidently?",
            options: [
              "It is deliberately designed to mislead people",
              "It only works without an internet connection",
              "It predicts likely text and cannot check facts",
              "It always copies its answers from one website",
            ],
            answer_index: 2,
            explanation: "Fluent text is not the same as true text, so outputs must be checked.",
          },
          {
            prompt: "What is an embedding?",
            options: [
              "A chat assistant built into an app",
              "A vector that represents text's meaning",
              "A spelling checker for local languages",
              "A file format used for storing images",
            ],
            answer_index: 1,
            explanation: "Texts with similar meanings get embedding vectors that are close together.",
          },
          {
            prompt: "In Mariama's semantic search, how are relevant advice sheets found?",
            options: [
              "By comparing embeddings with cosine similarity",
              "By matching only the exact words in the question",
              "By picking a few advice sheets at random",
              "By asking each farmer to search the sheets",
            ],
            answer_index: 0,
            explanation: "Comparing embeddings finds sheets with similar meaning even when the words differ.",
          },
          {
            prompt: "What does retrieval augmented generation do?",
            options: [
              "Removes the need to test the answers",
              "Trains a new language model from scratch",
              "Guarantees every answer is correct",
              "Grounds answers in trusted documents",
            ],
            answer_index: 3,
            explanation: "Giving the model trusted documents to answer from reduces made up answers but does not remove them, so testing is still needed.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "building-with-ai": {
      explanation_md: `## Why this section matters

A model sitting in a notebook helps nobody. Much of the AI work companies hire for is about putting models to work inside real products: a loan app that gives a decision in seconds, a farm advice line that answers questions, a dashboard that flags unusual transactions for a person to check. Adverts in Accra for AI engineers and AI application engineers describe exactly this, often more than inventing new models. Some of the most employable AI skills are therefore software and judgement skills, not only maths.

## Two ways to put AI to work

* **Use a hosted model through an API.** A company runs a large model on its servers, and your app sends text and receives answers over the internet. This is the fastest way to add summarising, translation or question answering, and you pay for what you use.
* **Serve your own model.** You train a model, such as a credit scoring model in scikit learn, and run it yourself behind a small web API so other software can call it. You control the model and the data, but you are responsible for keeping it running and accurate.

Many real products use both: their own classic model for decisions on internal data, and a hosted language model for working with text.

## What changes when a model meets real users

In a notebook, you control everything. In a product:

* **Inputs are messy.** People type in unexpected ways, leave fields blank and send text in several languages.
* **Mistakes have consequences.** A wrong answer can cost someone money or give bad health advice.
* **The world changes.** Prices, seasons and customer habits shift, and a model trained last year slowly gets worse.
* **Costs are real.** Every API call or server hour costs money.
* **Data must be protected.** Personal data sent to a model or stored in logs is covered by Ghana's Data Protection Act, 2012 (Act 843).

## A worked example in words

Issahaku's team at a small Tamale startup builds a WhatsApp helper for market traders. It uses a hosted language model to answer questions about stock records, and their own small model to predict which items will run out next week. They test both on real (anonymised) examples before launch, keep phone numbers out of what they send to the API, set a monthly spending limit, and give traders an easy way to reach a person when the bot is unsure.

## What this section covers

* **Building apps with AI APIs:** prompts, testing outputs, costs and private data.
* **Serving a model:** saving a model, wrapping it in an API and watching it over time.
* **Fairness, privacy and responsible AI:** checking who a model fails, and protecting the people in your data.

The final lesson in this section is not an extra. In Ghana and everywhere else, responsible use is part of doing the job properly.`,
      practice_task_md: `**Goal:** design an AI feature on paper before writing any code.

1. Pick a product idea that could help people in your area, such as a clinic appointment reminder that predicts no shows, or a helper that summarises long community meeting notes.
2. Decide whether it needs a hosted model through an API, your own served model, or both. Write why.
3. List what could go wrong for real users: messy inputs, wrong answers, changing conditions, costs and personal data.
4. For each risk, write one practical safeguard, such as a human check, a spending limit or removing names before sending data.

**Done looks like:** a one page design note with your idea, your approach, at least five risks and a safeguard for each. Share it with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What does using a hosted model through an API mean?",
            options: [
              "Training a model on your own laptop each time",
              "Printing model results on paper for users",
              "Your app calls a model on a provider's servers",
              "Copying the model's code into your own app",
            ],
            answer_index: 2,
            explanation: "Hosted models run elsewhere and are called over the internet, usually at a cost per use.",
          },
          {
            prompt: "Which is an advantage of serving your own model?",
            options: [
              "Someone else keeps it accurate for you",
              "You control the model and the data",
              "It never needs updating or checking",
              "It costs nothing at all to run",
            ],
            answer_index: 1,
            explanation: "Running your own model gives control but also makes you responsible for it.",
          },
          {
            prompt: "Why does a model trained last year slowly get worse in a product?",
            options: [
              "Prices, seasons and habits change",
              "Computers get slower as they age",
              "Models gradually forget their weights",
              "Users delete parts of the model",
            ],
            answer_index: 0,
            explanation: "When real conditions shift away from the training data, predictions degrade.",
          },
          {
            prompt: "Which Ghanaian law covers personal data sent to models or stored in logs?",
            options: [
              "The Copyright Act",
              "The Road Traffic Act",
              "The Labour Act",
              "The Data Protection Act, 2012 (Act 843)",
            ],
            answer_index: 3,
            explanation: "Act 843 governs how personal data is collected, used and protected.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "ai-apis": {
      explanation_md: `## Why this matters

Adding AI to an app no longer needs a research team. Hosted model APIs let a small Ghanaian startup add summarising, translation, classification or question answering with a few web requests. Adverts for AI engineers and prompt engineers in Accra ask for exactly this: designing prompts, testing outputs and building them safely into products. Doing it well is a real engineering skill.

## How an AI API works

Your app sends an HTTP request to the provider's server. The request contains your **API key** (a secret that identifies your account), the model name, and your **prompt**: the instructions and text you want the model to work on. The server sends back the model's answer, usually as JSON. Providers charge by the amount of text processed, usually counted in tokens, so long prompts and long answers cost more.

Most providers publish official client libraries for Python and other languages. Use those and follow the provider's own documentation, because model names and options change often.

## Writing good prompts

A prompt is a set of instructions for a capable assistant that knows nothing about your situation. Good prompts:

* **Give context.** Say who the users are and what the output is for: "You help market traders in Tamale understand their stock records."
* **Are specific about the task and format.** "Summarise in three bullet points of plain English, under 60 words."
* **Include an example** of a good answer when the format matters.
* **Say what to do when unsure.** "If the records do not answer the question, say so instead of guessing."

## Test on real examples, not one lucky try

A prompt that works once may fail on the next input. Build a small set of test cases from real (anonymised) examples, with what a good answer must contain, and run them every time you change the prompt or model:

\`\`\`python
tests = [
    ("When does the clinic open?", "8am"),
    ("When does the clinic close?", "4pm"),
]
for question, must_contain in tests:
    answer = ask_model(question)  # your provider call
    ok = must_contain.lower() in answer.lower()
    print("PASS" if ok else "FAIL", question)
\`\`\`

Simple checks like this catch many problems. For subtler qualities, such as tone, have a person review a sample of answers.

## Keep secrets, costs and private data under control

* **Never put an API key in your code** or in a public repository. Load it from an environment variable or a secrets manager. If a key leaks, revoke it at once.
* **Set spending limits** in the provider's dashboard and log how many requests you make.
* **Send the least personal data possible.** Remove names, phone numbers and Ghana Card numbers before text leaves your system. Under the Data Protection Act, 2012 (Act 843) your organisation stays responsible for personal data that a provider processes for it, including keeping it secure, so check your organisation's data protection rules first.
* **Read the provider's data terms** to know whether your inputs are stored or used for training.

## A worked example

Amina builds a feature that turns long community meeting notes into short summaries. She writes a clear prompt with context, format and an "if unsure" rule, tests it on twenty anonymised notes, finds it sometimes invents decisions, adds the instruction "only include decisions stated in the notes", and reruns her tests until they pass.`,
      practice_task_md: `**Goal:** design and test a prompt without spending money.

1. Pick a task, such as summarising a school announcement or sorting customer messages into "order", "complaint" or "question".
2. Write five realistic test inputs yourself, with no real personal data, and for each write what a good answer must contain.
3. Write a first prompt using context, task, format, an example and an "if unsure" rule.
4. Using any free chat assistant, paste your prompt with each test input and record pass or fail.
5. Improve the prompt once and rerun all five tests.

**Done looks like:** your test set, both prompt versions and a pass or fail table for each. Optionally, on a laptop or desktop, turn the tests into a short Python script like the one in the lesson.`,
      quiz: {
        questions: [
          {
            prompt: "What is an API key?",
            options: [
              "A secret that identifies your account",
              "A keyboard shortcut for the editor",
              "The answer the model sends back",
              "A special kind of prompt template",
            ],
            answer_index: 0,
            explanation: "The key proves who is calling the API, so it must be kept secret.",
          },
          {
            prompt: "Where should you keep an API key?",
            options: [
              "Typed directly into your code",
              "In a public repository for teammates",
              "Inside the prompt text itself",
              "In an environment variable",
            ],
            answer_index: 3,
            explanation: "Keys in code or public repositories leak easily; load them from the environment or a secrets manager.",
          },
          {
            prompt: "Why does the lesson recommend a set of test cases for prompts?",
            options: [
              "Providers refuse requests from apps without them",
              "Running tests makes the API free of charge",
              "A prompt that works once may fail on other inputs",
              "Tests remove the need to write a prompt at all",
            ],
            answer_index: 2,
            explanation: "Repeatable tests, rerun after every change, catch failures that one lucky try hides.",
          },
          {
            prompt: "Which practice protects personal data when using an AI API?",
            options: [
              "Sending full customer records for better answers",
              "Removing names and phone numbers before sending",
              "Posting your test data in a public WhatsApp group",
              "Skipping the provider's data terms to save time",
            ],
            answer_index: 1,
            explanation: "Send the least personal data possible, including removing Ghana Card numbers, and follow Act 843.",
          },
          {
            prompt: "In Amina's example, what problem did testing reveal?",
            options: [
              "Summaries invented decisions",
              "Her API key had expired",
              "The meeting notes were too short",
              "The model refused to answer",
            ],
            answer_index: 0,
            explanation: "Testing showed made up decisions, which she fixed with a clearer instruction.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "serving-models": {
      explanation_md: `## Why this matters

A model becomes useful when other software can ask it for predictions: a mobile app, a website, a spreadsheet tool or another service. Ghanaian machine learning adverts mention model serving, secure API endpoints, Docker and keeping models working in production. This work sits between data science and software development, and it is a strong skill to show.

## Step one: save the trained model

After training, save the model to a file so you do not retrain it every time. For scikit learn models, \`joblib\` is the usual tool:

\`\`\`python
import joblib
joblib.dump(model, "yield_model.joblib")
\`\`\`

Only load model files you created or fully trust. Loading a file like this can run code inside it, so never load one from an unknown source.

## Step two: wrap it in a web API

A small web framework such as FastAPI turns a Python function into a web address that accepts requests:

\`\`\`python
import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
model = joblib.load("yield_model.joblib")

class Farm(BaseModel):
    rainfall_mm: float
    fertiliser_bags: float

@app.post("/predict")
def predict(farm: Farm):
    row = pd.DataFrame([farm.model_dump()])
    return {"yield_bags": round(float(model.predict(row)[0]), 1)}
\`\`\`

The \`Farm\` class describes the expected input, so a request with missing or non numeric values is rejected automatically before it reaches the model. Other software sends JSON such as rainfall 650 and fertiliser 2, and gets back a predicted yield. You can run it on your computer with a server such as uvicorn and try it in the browser page FastAPI generates.

## Step three: package it

A **container**, built with a tool like Docker, packages the code, the model file and the exact library versions together, so the API runs the same way on your laptop and on a cloud server. This avoids the classic problem of "it worked on my computer".

## Step four: watch it after launch

Serving is not the end. Models get worse over time when the world changes, which is called **drift**. A yield model trained before a drought year, or a credit model trained before prices rose, may slowly become wrong. Good practice:

* **Log** inputs and predictions, without storing more personal data than needed.
* **Compare** predictions with real outcomes when they arrive, such as the actual harvest.
* **Watch the inputs** for shifts, such as rainfall values outside anything in the training data.
* **Retrain** on fresh data on a schedule or when performance drops, and keep the old version so you can roll back.
* **Secure the endpoint** with authentication so only approved software can call it.

## A worked example

Fuseini serves a yield model for a cooperative's field officers. After one season he compares predictions with real harvests and finds the model overestimates yields in a district hit by late rains. He retrains with the new season's data, records the change, and adds an alert when rainfall inputs fall outside the training range.`,
      practice_task_md: `**Goal:** serve a small model on your own computer.

1. On a laptop or desktop with Python installed, train a simple scikit learn model on an invented example dataset (for example, yield from rainfall and fertiliser) and save it with \`joblib\`.
2. Install FastAPI and uvicorn, then create the API from the lesson in a file called \`app.py\`.
3. Start it with \`uvicorn app:app\` and open the automatic docs page at \`/docs\` on the local address uvicorn prints.
4. Send three test requests from the docs page, including one with a missing field. Note what happens.
5. Write three things you would monitor if this model were used by real field officers.

**Done looks like:** screenshots of a successful prediction and a rejected bad request, plus your monitoring list. If you cannot install Python locally, do steps 1 and 5 in a free notebook and write out how you would serve it.`,
      quiz: {
        questions: [
          {
            prompt: "Why save a trained model with joblib?",
            options: [
              "To make its predictions more accurate",
              "To share it publicly on social media",
              "To delete the training data safely",
              "To reuse it without retraining each time",
            ],
            answer_index: 3,
            explanation: "Saving the model lets the API load it once and serve predictions.",
          },
          {
            prompt: "What safety rule does the lesson give about model files?",
            options: [
              "Load any model file you find online",
              "Model files can never contain code",
              "Only load model files you trust",
              "Email model files to every customer",
            ],
            answer_index: 2,
            explanation: "Loading an untrusted model file can run harmful code.",
          },
          {
            prompt: "What does the `Farm` class do in the FastAPI example?",
            options: [
              "It trains the model on new farm data",
              "It checks inputs and rejects bad requests",
              "It draws a chart of every prediction",
              "It stores farmers' names and numbers",
            ],
            answer_index: 1,
            explanation: "Input validation stops missing or wrong values reaching the model.",
          },
          {
            prompt: "What is drift?",
            options: [
              "A model worsening as the world changes",
              "A bug in an old Python version",
              "A way to package code into containers",
              "A type of neural network layer",
            ],
            answer_index: 0,
            explanation: "When real conditions move away from the training data, predictions degrade.",
          },
          {
            prompt: "Why package a model API in a container?",
            options: [
              "To make the model file smaller",
              "Containers make predictions more accurate",
              "Containers remove the need for testing",
              "So it runs the same way everywhere",
            ],
            answer_index: 3,
            explanation: "Packaging code, model and exact library versions together avoids \"it worked on my computer\" problems.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "responsible-ai": {
      explanation_md: `## Why this matters

Models make or shape decisions about people: who gets a loan, which patients get a follow up call, which job applications a recruiter reads first. A model can be accurate on average and still fail one group badly. Ghanaian AI adverts name fairness, explainability and bias mitigation as skills, and every model that touches personal data in Ghana falls under the Data Protection Act, 2012 (Act 843).

## Where unfairness comes from

* **Unrepresentative data.** A credit model trained mostly on city salary earners may score farmers and traders in the north poorly, simply because it saw few of them.
* **Historical bias.** If past decisions were unfair, a model trained on them learns to repeat them.
* **Proxies.** Even if you remove a sensitive column, others can stand in for it. A home district or a phone type can act as a proxy for income or ethnicity.
* **Measurement gaps.** A speech model tested only on Accra accents may fail for speakers from Bawku or Lawra.

## Check results across groups

Never report one overall score and stop. Split your test results by group (region, gender, age band, language) and compare the error rates. Suppose an invented example loan model has good overall accuracy, but when Sumaila breaks it down, it wrongly rejects good borrowers in the Upper West Region far more often than in Greater Accra. Fixes might include collecting more representative data, removing proxy features, choosing different thresholds, or deciding the model should not be used for that group at all.

## Explain your model's limits

People affected by a decision deserve a clear explanation. Prefer simpler models where decisions matter a lot, show which features drive predictions, and write down what the model was trained on, what it should and should not be used for, and where it performs worse. A short document like this is often called a **model card**.

## Protecting personal data under Act 843

Act 843 governs how personal data is collected, used and kept, and the Data Protection Commission enforces it. In practice for machine learning work:

* **Collect only what you need** for a stated purpose, and do not reuse data for an unrelated purpose without a lawful basis.
* **Treat health data with extra care.** The Act classes health information as special personal data, which may only be processed with the person's consent or under a few narrow conditions the Act sets out. Use aggregated or anonymised data wherever possible.
* **Keep data accurate and secure.** Limit who can access it, never share raw files on WhatsApp or personal drives, and delete what you no longer need.
* **Respect people's rights**, such as asking what data you hold about them and correcting it.
* **Plan for automated decisions.** People have rights when a decision that significantly affects them is made only by automatic processing, such as being told and asking for it to be reconsidered, with some exceptions. Keeping a person in the loop is good practice anyway.
* **Data controllers must register** with the Data Protection Commission.

The law is under review, so check the Commission's official website for current guidance; this lesson is an introduction, not legal advice.

## A worked example

Hawa builds a model to predict which pregnant women may miss antenatal visits at clinics in Northern Region. She works only with anonymised records the health service approved, checks error rates by district and age group, finds younger women are missed more often, and writes a model card stating the model supports nurses' judgement and never replaces it.`,
      practice_task_md: `**Goal:** run a simple fairness and privacy check.

1. In a free notebook, create an invented example loan dataset of 400 rows with a \`region\` column (four regions), a few features and a \`repaid\` label. Make one region smaller than the others. Label it as example data.
2. Train a classifier and report overall accuracy.
3. Split the test results by region and compare accuracy and the rate of wrongly rejected good borrowers for each.
4. Write a short model card: what the model is for, what it was trained on, where it performs worse and what it must not be used for.
5. List which columns in your dataset would count as personal data and how you would protect them.

**Done looks like:** a notebook with per region results, a one page model card and your personal data list.`,
      quiz: {
        questions: [
          {
            prompt: "What is a proxy feature?",
            options: [
              "A feature with many missing values",
              "A column that stands in for a sensitive one",
              "The target column the model predicts",
              "A feature that a pipeline creates",
            ],
            answer_index: 1,
            explanation: "Removing a sensitive column is not enough if others, such as home district standing in for income, carry the same information.",
          },
          {
            prompt: "Why should you split test results by group?",
            options: [
              "A good average can hide a group's failures",
              "To make the test dataset bigger",
              "Because scikit learn requires it",
              "To make the model train faster",
            ],
            answer_index: 0,
            explanation: "Comparing error rates across groups reveals problems the average hides.",
          },
          {
            prompt: "How does Act 843 treat health information?",
            options: [
              "As public data that anyone may use freely",
              "It says nothing at all about health data",
              "As data that only doctors may ever see",
              "As special personal data needing extra care",
            ],
            answer_index: 3,
            explanation: "Health data may only be processed with consent or under a few narrow conditions, and anonymised or aggregated data should be used where possible.",
          },
          {
            prompt: "Which body enforces Act 843 in Ghana?",
            options: [
              "The Ghana Revenue Authority",
              "The Electoral Commission",
              "The Data Protection Commission",
              "The Ghana Statistical Service",
            ],
            answer_index: 2,
            explanation: "The Data Protection Commission enforces the Act and registers organisations that process personal data.",
          },
          {
            prompt: "What is a model card?",
            options: [
              "A payment card for buying AI services",
              "A short note on a model's purpose and limits",
              "A graphics card used for training",
              "A list of the model's passwords",
            ],
            answer_index: 1,
            explanation: "Model cards describe what a model is for, its training data and its limits, so people can use it responsibly.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "getting-hired": {
      explanation_md: `## Why this section matters

You now know how models are built, tested, served and checked for fairness. The next challenge is convincing someone to pay you to do it. As the first section said honestly, machine learning adverts in Ghana almost always ask for a degree and experience, and entry level machine learning engineer roles are rare. That does not shut you out. It means your evidence has to work harder, and your route in may go through a neighbouring role first.

## What employers want to see

Reading across adverts for data science and machine learning roles, a few things come up again and again:

* **You can take a real problem from data to a working model.** Not a copied tutorial, but a question you framed, data you cleaned and a model you evaluated.
* **You evaluate honestly.** A baseline, a held out test set, the right measure for the problem, and a clear statement of limits.
* **You can explain your work** to people who do not know machine learning, in writing and in conversation.
* **You know the core tools**: Python, pandas, SQL, scikit learn, Git and at least some exposure to a deep learning library.
* **You can work with others**: clear notebooks, readable code and good habits with data.

## Evidence beats claims

Writing "skilled in machine learning" on a CV proves nothing. A short, public project that shows your thinking proves a lot. That is why this section starts with a portfolio. Two or three well documented projects on Ghanaian or African data, each with a clear question and an honest evaluation, are worth more than a long list of course certificates.

## Planning a realistic route

Think in steps rather than one leap:

1. **Get into data work.** Data analyst, data officer, monitoring and evaluation, or research assistant roles let you handle real data every day.
2. **Use machine learning where you are.** Find a problem in your workplace that a simple model could help with, and do it properly.
3. **Build a public record.** Competitions, open source contributions and short write ups show steady growth.
4. **Move across.** With real projects and references, apply for data science, machine learning or AI application roles, locally or remote.

## A worked example in words

Abdul-Rahman finishes this track while working as a research assistant on a farming survey in Savelugu. He builds a portfolio project predicting maize yields from the survey's anonymised data (with his supervisor's permission), enters two data science competitions focused on African problems, and writes short posts explaining what he learned. When a remote junior data science contract appears, his application links to real work, and he can talk through every decision in the interview.

## What this section covers

* **A machine learning portfolio:** what to build and how to present it.
* **Routes into AI roles:** stepping stone jobs, remote work, research posts and how to keep growing.`,
      practice_task_md: `**Goal:** write a twelve month plan into AI work.

1. Write down your current situation: skills, job or studies, computer access and time per week.
2. Choose one stepping stone role you could apply for in the next six months, and one AI related role you aim for within two years.
3. List the evidence each role would need: projects, skills and references.
4. Break the next twelve months into four three month blocks, each with one project or learning goal and one public output, such as a write up or competition entry.

**Done looks like:** a one page plan with your two target roles, the evidence list and four dated blocks. Review it with a mentor every three months.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what proves your machine learning skill best?",
            options: [
              "A long list of online course certificates",
              "The words \"skilled in machine learning\" on a CV",
              "The number of libraries you have installed",
              "A public project showing your full process",
            ],
            answer_index: 3,
            explanation: "Documented projects showing your question, data work, model and honest evaluation prove what claims cannot.",
          },
          {
            prompt: "What is the first step in the realistic route the lesson describes?",
            options: [
              "Apply only for senior machine learning roles",
              "Wait until you have finished a PhD abroad",
              "Get into data work, such as a data officer job",
              "Stop learning and apply for every AI job",
            ],
            answer_index: 2,
            explanation: "Data roles give daily practice with real data and chances to use models.",
          },
          {
            prompt: "Which of these is listed as something employers want to see?",
            options: [
              "That you have never made a single mistake",
              "That you can explain your work in plain words",
              "That you have memorised every algorithm",
              "That you have used the costliest cloud tools",
            ],
            answer_index: 1,
            explanation: "Clear explanation, in writing and conversation, appears repeatedly in what employers want.",
          },
          {
            prompt: "In the worked example, why was Abdul-Rahman's application strong?",
            options: [
              "It linked to real work he could explain",
              "He had a famous person as his referee",
              "He sent it to hundreds of jobs at once",
              "He had paid for a premium online course",
            ],
            answer_index: 0,
            explanation: "Real projects plus the ability to explain every decision made his evidence convincing.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "ml-portfolio": {
      explanation_md: `## Why this matters

When you have no machine learning job on your CV yet, your portfolio is your experience. A reviewer at a Ghanaian startup or a remote team will spend a few minutes on it. In that time they want to see that you can frame a problem, handle messy data, evaluate honestly and explain clearly. Two or three strong projects beat ten weak ones.

## What makes a strong project

Each project should have:

* **A clear question** that matters to someone: "Can we estimate maize yield per acre from rainfall, fertiliser and planting date, well enough to help a cooperative plan storage?"
* **Real or realistic data**, with its source and licence stated. Ghanaian or African datasets make your work stand out and show you understand local problems.
* **A baseline** and at least one model that beats it, or an honest note that none did.
* **Honest evaluation** on held out data, with a measure that fits the problem and results broken down by group where it matters.
* **A short write up** at the top: the question, the data, what you did, what you found, the limits, and what you would do next.
* **Clean, runnable code**, so someone can rerun your notebook from top to bottom.

## Where to find data

* **Open data portals** run by governments, universities and international organisations publish agriculture, health and economic data. Check each dataset's licence.
* **Competition platforms** such as Zindi, which focuses on African problems, and Kaggle offer real datasets, a clear goal and a public leaderboard. Read each competition's rules on how you may use and share the data.
* **Data you collect yourself**, with consent and personal details removed, can make the most original project of all.

Never use leaked data, scraped personal profiles or private records without permission. A portfolio built on data you should not have is a warning sign to employers.

## A balanced set of projects

Aim for variety:

1. **A tabular prediction project**, such as yields, prices or loan repayment, with a careful evaluation.
2. **A text or language project**, such as language identification or classifying messages, ideally including a Ghanaian language.
3. **An applied project** that serves a model through a small API or uses a hosted model with proper testing.

## Present it well

Put each project in its own public repository with a clear README. Keep data files small or link to the source instead of uploading large files. Add a short summary of each project to a single page you can share, and link to it from your CV.

## A worked example

Mariama's portfolio has three projects: a crop yield model on open agricultural data with results by region, a Twi and English message classifier built with friends who checked the labels, and a small yield prediction API. Each README starts with a five line summary. In interviews she is asked mostly about her limits sections, because they show judgement.`,
      practice_task_md: `**Goal:** plan and start your first portfolio project.

1. Choose a question that matters to someone in Ghana and write it in one sentence.
2. Find a dataset for it on an open data portal or a competition platform. Record its source, licence and any rules on use.
3. Create a public repository with a README containing: the question, the data source and licence, your planned baseline and evaluation measure, and a "limits" heading you will fill in later.
4. On a laptop or desktop, load the data in a notebook, explore it, and build the baseline.

**Done looks like:** a public repository with a README and a notebook that loads the data and reports a baseline score. Share the link with a mentor for early feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these should every portfolio project include?",
            options: [
              "A baseline and honest held out evaluation",
              "A list of every library you have heard of",
              "Only the final accuracy number, nothing else",
              "Private records you collected without asking",
            ],
            answer_index: 0,
            explanation: "A baseline and honest evaluation show you can judge whether a model really works.",
          },
          {
            prompt: "What should you check before using a dataset from a competition platform?",
            options: [
              "The colour scheme of the data files",
              "Whether it is the largest one available",
              "Nothing, because all data is free to use",
              "The rules on how you may use the data",
            ],
            answer_index: 3,
            explanation: "Competition data comes with rules on use and sharing that you must follow.",
          },
          {
            prompt: "Why does the lesson warn against leaked or scraped personal data?",
            options: [
              "It is usually too large to download",
              "It always has too many missing values",
              "It is unethical and worries employers",
              "It cannot be loaded with pandas",
            ],
            answer_index: 2,
            explanation: "Employers look for judgement, and misusing data shows the opposite.",
          },
          {
            prompt: "In Mariama's interviews, which part of her projects was she asked about most?",
            options: [
              "The colours of her charts",
              "Her sections on limits",
              "How long her code was",
              "Which laptop she used",
            ],
            answer_index: 1,
            explanation: "Honest limits sections show the judgement employers value.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "routes-into-ai": {
      explanation_md: `## Why this matters

You have the skills and a portfolio. Now you need a plan that fits the real job market. In Ghana, machine learning engineer roles mostly ask for degrees and years of experience, and we found no entry level ones. So the smart move is to aim at the roles that are open to you now, and grow into AI work from inside them.

## Stepping stone roles in Ghana

* **Data analyst and data officer roles** at banks, telecoms, NGOs, government agencies and startups. You work with real data daily and can introduce simple models where they help. The [Data Analyst track](/roadmaps/data-analyst) prepares you for these.
* **Monitoring and evaluation roles** at NGOs and development projects, which involve survey data, analysis and reporting across the northern regions and beyond.
* **Research assistant posts** at universities, research institutes and survey firms. Some projects involve health, agriculture or language data and machine learning methods. Watch university career pages and research group announcements.
* **Junior software developer roles**, especially where companies are adding AI features to their products.

## Remote and contract work

Some remote employers welcome applicants based in Africa for data and AI work: data labelling, evaluating model outputs, junior data science contracts and research support. These can build experience and income. Protect yourself:

* **Never pay to apply** or to receive "training" before a job starts.
* **Check the company** has a real website, real people and a clear contract.
* **Be careful with personal documents**; share them only once an offer is genuine.
* **Agree payment terms** in writing, including how you will be paid in Ghana.

## Keep growing in public

* **Competitions** on platforms such as Zindi and Kaggle give practice and a public record.
* **Open source and research communities** such as Masakhane, which works on African language technology, welcome contributors; you can help with datasets, evaluation and documentation as well as code.
* **Write short posts** about what you build and learn. Clear writing gets noticed.
* **Fellowships, internships and research programmes** sometimes open to early career Africans. Read eligibility carefully and apply early.

## Further study

Some AI roles, especially research ones, expect a degree in computer science, statistics, mathematics or engineering, and sometimes a master's. Free university level courses can deepen your knowledge, but if research is your goal, plan for formal study too, and look for scholarships.

## A worked example

Wumpini takes a data officer job with an NGO in Bolgatanga after the Data Analyst track. She uses machine learning to predict which water points are likely to break down, contributes evaluation work to an open African language project in the evenings, and keeps a simple public portfolio. Two years later she moves to a junior data scientist role with a remote team, with real projects and references behind her.

## Your next step

Pick one stepping stone role and one public activity, and start this month. Progress in AI comes from steady, honest work over time.`,
      practice_task_md: `**Goal:** take three concrete steps toward your first role.

1. Find two current stepping stone adverts (data analyst, monitoring and evaluation, research assistant or junior developer) open to you in Ghana or remotely. Note the skills they ask for in your own words.
2. Update your CV so it links to your portfolio and lists only skills you can show evidence for.
3. Choose one public activity, such as a competition, an open source issue or a short blog post, and complete it within a month.
4. Write a short message to someone already working in data or AI in Ghana, asking one specific question about their route in. Send it only through a channel they use publicly for that purpose.

**Done looks like:** two analysed adverts, an updated CV with a portfolio link, one completed public activity, and one sent question. Review progress with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson recommend stepping stone roles?",
            options: [
              "ML roles want experience, so you grow in from a related job",
              "Machine learning work does not exist in Ghana at all",
              "Stepping stone roles always pay more than AI roles",
              "AI employers only hire people who worked at NGOs",
            ],
            answer_index: 0,
            explanation: "Entry level machine learning roles were not found, so neighbouring roles are the realistic way in.",
          },
          {
            prompt: "Which of these is a warning sign in a remote job offer?",
            options: [
              "A clear written contract",
              "A company with a real website",
              "Payment terms agreed in writing",
              "Being asked to pay before starting",
            ],
            answer_index: 3,
            explanation: "Genuine employers do not charge you to apply or start work.",
          },
          {
            prompt: "How can you contribute to an open African language project, according to the lesson?",
            options: [
              "Only by writing complex model code yourself",
              "By paying a monthly membership fee first",
              "With datasets, evaluation, documentation or code",
              "Only once you have completed a PhD",
            ],
            answer_index: 2,
            explanation: "Communities such as Masakhane value many kinds of contribution.",
          },
          {
            prompt: "What does the lesson say about further study for research roles?",
            options: [
              "Degrees never matter for any AI role",
              "Plan for a relevant degree if research is your goal",
              "Free online courses always replace degrees",
              "Only medical degrees are accepted for AI research",
            ],
            answer_index: 1,
            explanation: "Some research roles expect a relevant degree and sometimes a master's, so plan formal study and look for scholarships.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
