import type { TrackContent } from "./types";

/**
 * Original lesson content for Learning online (issue #294).
 * Research, sources and coverage: src/content/research/learning-online.md.
 * Written for adults who can use a phone or computer but are new to studying
 * online, usually on prepaid data and often on a shared device. Platforms are
 * examples, not endorsements; free options and prices can change.
 */
const content: TrackContent = {
  roadmap: "learning-online",
  nodes: {
    "start-learning-online": {
      outcomes: [
        "Explain what learning online can and cannot do for you",
        "Describe the steps this track takes you through",
        "Write down what you want from learning online",
      ],
      explanation_md: `Many adults in Ghana want new skills but cannot sit in a classroom every day. You may work at a shop in Tamale, farm near Walewale, care for children in Bolgatanga or travel for work around Wa. Learning online lets you study at times that suit you, on the phone or computer you already use, often for free. It is how many people pick up the computer, office, marketing and data skills that employers in Ghana ask for.

But learning online is different from school. Nobody takes the register. Nobody tells you which course to pick. Nobody stops you from paying for a course that is not worth it. You decide what to learn, when to study and whether to keep going. That freedom is the best part, and it is also why many people start a course and never finish it.

This track exists so that you finish.

## What this track covers

* **Starting to learn online.** The main ways people learn online, how to set a goal you can actually reach, and how to choose a course that is worth your time and data.
* **Free places to learn.** Well known free platforms, such as GCFGlobal LearnFree, Khan Academy, YouTube, Google Skillshop, Microsoft Learn, freeCodeCamp, Coursera and edX. They are examples to help you look, not the only good options.
* **Certificates that carry weight.** Which certificates an employer is likely to trust, the difference between free and paid ones, and how to show them.
* **Learning on limited data and shared devices.** Downloading lessons, lowering video quality, and finding places with computers or WiFi.
* **Learning well.** Notes, spaced review, practice, asking good questions and fitting study around work and family.
* **Stay safe and get started.** Fake courses, certificate scams and protecting your accounts, then a four week plan that you start before the track ends.

## What learning online can and cannot do

Learning online can teach you real skills. Thousands of free lessons explain spreadsheets, writing, design, coding and much more, often very clearly. You can repeat a video as many times as you need, which no classroom teacher has time for.

Learning online cannot do the practice for you. Watching someone use a spreadsheet does not teach your fingers to use one. The people who gain the most from online courses are the ones who stop the video and try each step themselves.

It also cannot promise you a job. A course or certificate helps you show what you know. Employers still want to see that you can do the work, which is why this track keeps asking you to make small things you can show.

## Before you start

You need four things, and you probably have most of them already:

1. **A phone or computer** with a web browser. A shared device is fine; one lesson in this track is about exactly that.
2. **An email address you control,** with a password only you know. Every platform asks for one.
3. **Some data or WiFi.** Much less than you might think, if you use the tips in this track.
4. **A notebook or notes app** for your goal, your plan and what you learn.

If any of these are missing, the Digital Skills Bridge roadmap covers them first.

## How to use this track

Each lesson ends with a short practice task. Do it before moving on, even if it feels small. By the final lesson you will have a goal, a chosen course, a study timetable and a first session already done. That is far more than most people have when they start.

Think of Issahaku, a driver in Navrongo. He has tried online courses three times. Each time he signed up, watched two videos on his phone and stopped. He did not have a clear goal, the courses were too long for his data, and nobody knew he had started. This track is built around those three problems: a clear goal, a course that fits your life, and a plan that keeps you going.`,
      workedExample_md: `**Mariama writes down what she wants**

Mariama sells provisions from a kiosk in Tamale. A customer told her she could learn to keep her accounts on a phone spreadsheet. Before choosing any course, she opens her notes app and writes four lines:

1. **What I want:** to keep my stock and sales on a spreadsheet instead of an exercise book.
2. **Why:** so I know which goods make money and can show a record if I apply for a loan.
3. **When I can study:** after the shop closes, three evenings a week, about thirty minutes.
4. **What I have:** a shared Android phone at home, WiFi at my church on Sundays, a small data bundle.

She notices that her answers already rule things out. A ten week video course would use too much data. A course with a fixed weekly class time would clash with closing the shop. She keeps the note, because the next lessons will help her turn it into a goal and a course choice.`,
      keyTerms: [
        { term: "Online course", definition: "A set of lessons you study through a website or app, often with videos, reading and short tests." },
        { term: "Self paced", definition: "A course you can start any time and move through at your own speed." },
        { term: "Platform", definition: "A website or app that hosts many courses, such as Khan Academy or Microsoft Learn." },
        { term: "Certificate", definition: "A document or online record that says you completed a course or passed a test." },
      ],
      commonMistakes: [
        "Signing up for several courses at once and finishing none of them",
        "Choosing a course before deciding what you want it to do for you",
        "Watching lessons without ever trying the steps yourself",
        "Expecting a certificate alone to get you a job",
      ],
      selfCheck: [
        "What is one thing learning online can do better than a classroom?",
        "What is one thing it cannot do for you?",
        "Which four things do you need before you start?",
        "Why did Issahaku keep stopping his courses?",
      ],
      practice_task_md: `**Goal:** Write down what you want from learning online.

**Steps**

1. Open a notebook or a notes app and title the page "My learning".
2. Write four lines, like Mariama did: what you want to learn, why it matters to you, when you could study each week, and what device, data and WiFi you have.
3. Under that, write one sentence about why a past course or plan did not work out, if you have tried before.
4. Keep this page. You will add to it in every lesson of this track.

**Done looks like:** A page with your four lines and, if it applies, one honest sentence about what stopped you before.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what is the main reason many people start an online course and never finish it?",
            options: [
              "Online lessons are usually less accurate than classroom lessons",
              "Online courses always need a laptop to work properly",
              "Nobody else decides what, when or whether they study",
              "Most online courses close after the first week",
            ],
            answer_index: 2,
            explanation: "The lesson says the freedom to decide everything yourself is also why many people stop.",
          },
          {
            prompt: "What does the lesson say learning online cannot do for you?",
            options: [
              "Do the practice that builds the skill in your own hands",
              "Explain spreadsheets, writing or coding clearly",
              "Let you replay a confusing lesson as many times as you need to",
              "Fit around your work and family timetable",
            ],
            answer_index: 0,
            explanation: "Watching does not build the skill; you have to try each step yourself.",
          },
          {
            prompt: "Which three problems is this track built around, using Issahaku's story?",
            options: [
              "A slow phone, a weak network and an old browser",
              "No laptop, no certificate and no English",
              "Too many videos to watch, too many tests to pass and too many platforms to choose from",
              "No clear goal, a course that did not fit his life, and no plan to keep going",
            ],
            answer_index: 3,
            explanation: "The lesson names a clear goal, a course that fits your life and a plan that keeps you going.",
          },
          {
            prompt: "Which of these is one of the four things you need before you start?",
            options: [
              "A paid certificate from a well known university in Accra or abroad",
              "An email address you control with your own password",
              "A laptop that nobody else uses",
              "A teacher who checks your work each week",
            ],
            answer_index: 1,
            explanation: "Every platform asks for an email address, and you need to control it.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "why-learn-online": {
      outcomes: [
        "Name the main formats of online learning",
        "Match a format to your time, data and goal",
        "Tell self paced courses from scheduled ones",
        "Choose one format to try first",
      ],
      explanation_md: `When people say "learning online" they can mean very different things. A three minute video on how to share a file is learning online. So is a twelve week course with weekly tests and a final project. Knowing the main formats helps you pick something that fits your goal, your time and your data, instead of whatever appears first in a search.

## Why adults learn online

Adults usually learn online for practical reasons:

* **To get or keep a job.** Many entry level adverts in Ghana ask for basic computer skills, email and office software.
* **To grow a business.** A trader may want to keep records on a spreadsheet or sell on social media.
* **To fix one problem today.** How to merge two PDFs, how to set up two step verification, how to reply to a customer politely.
* **To prepare for something bigger,** such as a mentoring programme, a certificate or a return to formal study.

Your reason matters, because it decides which format makes sense.

## The main formats

**Short how to videos and articles.** One small task, explained in a few minutes. Good for fixing a problem today. Weak for building a whole skill, because they jump around and nobody checks you understood.

**Tutorial series.** A set of short lessons on one topic in a sensible order, such as the GCFGlobal LearnFree series on email or internet safety. Good for everyday skills. Usually free and light on data because much of it is text and pictures.

**Self paced courses.** A full course with modules, practice and often a quiz at the end of each part. You can start any day and move at your own speed. Most courses on Microsoft Learn, Khan Academy and freeCodeCamp work like this.

**Scheduled courses.** A course with a start date, weekly deadlines and sometimes live sessions. Some courses on Coursera and edX run like this. The deadlines help some people keep going, but they are hard to keep if your work hours change.

**Cohorts and mentored programmes.** A group that learns together with a mentor or teacher, often meeting on video calls or in person. More support, but fewer places and fixed times.

**Live classes and webinars.** One session at a set time on a video call. Useful for questions, but heavy on data and easy to miss.

## Matching a format to your life

Ask three questions:

1. **How much time do I have each week, and is it the same every week?** If your hours change, self paced is safer than scheduled.
2. **How much data do I have?** Text lessons and downloadable notes use far less data than live video.
3. **What do I want at the end?** To fix one problem, a short video is enough. To change jobs, you need a full course with practice and something you can show.

Many people mix formats. They follow one self paced course as their main path and use short videos to get past a confusing step.

## How a typical online course works

Most full courses share the same parts, whatever the platform:

* **An account.** You sign up with your email address.
* **A syllabus or outline.** The list of modules and what each one teaches.
* **Lessons.** Videos, reading or interactive exercises.
* **Practice.** Exercises, quizzes, or a small project.
* **Progress tracking.** Ticks or a bar that shows how much you have done.
* **A certificate or badge** at the end, sometimes free and sometimes paid.

Once you recognise these parts, a new platform stops feeling strange. You look for the outline first, then the first lesson, then the practice.

## Learning is active

Whatever format you choose, the same rule applies: you learn by doing, not by watching. Pause the video and repeat the step. Answer the quiz before looking at the answer. Write a summary in your own words. The later lessons in this track show you how.`,
      workedExample_md: `**Abdul-Rahman picks a format**

Abdul-Rahman works shifts at a fuel station in Bolgatanga. His shifts change every week, and he has a small data bundle plus WiFi at a relative's house on weekends. He wants to learn spreadsheets well enough to apply for a stores assistant job.

1. **Short videos?** Useful when he gets stuck, but they will not take him from zero to confident on their own.
2. **Scheduled course with weekly deadlines?** His changing shifts make weekly deadlines risky. He sets this aside.
3. **Mentored cohort?** He likes the idea, but there is none starting near him this month. He notes it for later.
4. **Self paced course with practice?** This fits. He can study on any free evening and download notes on weekend WiFi.

He chooses a self paced spreadsheet course as his main path and decides to use short videos only when a step confuses him.`,
      keyTerms: [
        { term: "Tutorial series", definition: "A set of short lessons on one topic, in order, often as text and pictures." },
        { term: "Scheduled course", definition: "A course with a start date and weekly deadlines that every learner follows together." },
        { term: "Cohort", definition: "A group of learners who start and move through a programme together, often with a mentor." },
        { term: "Syllabus", definition: "The outline of a course: its modules, what each one teaches and how long it takes." },
        { term: "Webinar", definition: "A live online talk or class at a set time, usually on a video call." },
      ],
      commonMistakes: [
        "Trying to learn a whole skill only from random short videos",
        "Picking a course with weekly deadlines when your work hours change every week",
        "Choosing live classes when your data cannot cover long video calls",
        "Skipping the practice parts of a course because they take longer",
      ],
      selfCheck: [
        "What is the difference between a self paced course and a scheduled one?",
        "Which formats are usually lightest on data?",
        "Which three questions help you match a format to your life?",
        "What do most full online courses have in common?",
      ],
      practice_task_md: `**Goal:** Choose the format you will try first.

**Steps**

1. On your "My learning" page, answer the three questions from the lesson: your weekly time, your data, and what you want at the end.
2. List the six formats from the lesson and put a tick next to the ones that fit your answers and a cross next to the ones that do not.
3. Choose one main format and, if useful, one helper format (for example, a self paced course plus short videos for stuck moments).
4. Write one sentence explaining your choice.

**Done looks like:** Your three answers, the ticked list and a one sentence reason for your main format.`,
      quiz: {
        questions: [
          {
            prompt: "Abdul-Rahman's work shifts change every week. Why did he set aside the scheduled course?",
            options: [
              "Scheduled courses never include practice tasks",
              "Weekly deadlines are risky when your hours keep changing",
              "Scheduled courses can only be followed on a laptop or desktop computer",
              "Scheduled courses do not give any certificate",
            ],
            answer_index: 1,
            explanation: "Fixed weekly deadlines are hard to meet when your free time moves around.",
          },
          {
            prompt: "Which format does the lesson describe as good for fixing one problem today but weak for building a whole skill?",
            options: [
              "Mentored cohorts with a teacher",
              "Self paced courses with modules and quizzes",
              "Tutorial series on one topic in order",
              "Short how to videos and articles",
            ],
            answer_index: 3,
            explanation: "Short videos explain one task well but jump around and nobody checks your understanding.",
          },
          {
            prompt: "Which part of an online course should you look for first on a new platform?",
            options: [
              "The syllabus or outline of modules",
              "The certificate at the end",
              "The comments under the first video",
              "The payment page",
            ],
            answer_index: 0,
            explanation: "The lesson says to look for the outline first, then the first lesson, then the practice.",
          },
          {
            prompt: "According to the lesson, which formats usually use the least data?",
            options: [
              "Live classes and webinars on video calls",
              "Long video lectures watched in high quality",
              "Text lessons and downloadable notes",
              "Mentored cohorts that meet on video every week",
            ],
            answer_index: 2,
            explanation: "Text and downloadable notes use far less data than live or long video.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "setting-a-learning-goal": {
      outcomes: [
        "Turn a vague wish into a clear learning goal",
        "Add a finish line and a time frame to a goal",
        "Break a goal into weekly steps",
      ],
      explanation_md: `"I want to learn computers" is a wish, not a goal. It is too big to finish and too vague to check. Nobody can ever say "done" to it, so it quietly fades. A clear goal is small enough to finish, specific enough to check and linked to something you care about, such as a job, a business or a programme you want to join.

Employers notice the difference too. When someone asks "what are you learning?", the answer "Google Sheets, so I can keep stock records for a shop" sounds far more serious than "computers".

## From wish to goal

A useful learning goal answers four questions.

1. **What exactly will I be able to do?** Use an action you could show someone. "Make a sales record in a spreadsheet that adds up the total" is better than "know Excel".
2. **Why does it matter to me?** One line that links the goal to your life: a job advert, your business, a programme.
3. **How will I know I am done?** A finish line you can see, such as a finished file, a passed quiz or a short task done without help.
4. **By when?** A realistic time frame. For a first goal, four to eight weeks is a good size.

Put together, a wish such as "learn computers" can become:

> In six weeks, I will be able to type and format a one page letter in a word processor and send it as a PDF attachment, so I can apply for office assistant jobs. I will know I am done when I have sent a letter to a friend who checks it.

That is a goal you can plan for.

## Keep the first goal small

The biggest mistake adults make is choosing a first goal that is far too big, such as "become a data analyst" or "learn coding". Those are fine long term directions, but they need many smaller goals on the way. A first goal should be something you can finish in a month or two, so you feel the success of finishing. That feeling is what keeps you going to the next one.

A useful test: could you explain your finish line to a friend in one breath? If not, it is too big.

## Break it into weekly steps

Once you have a goal, split it into weekly steps. Each step should be one or two sessions of work.

For the letter goal above, the steps could be:

* **Week 1:** Open a word processor, type a short paragraph and save it with a clear name.
* **Week 2:** Change fonts, sizes and line spacing; add a heading.
* **Week 3:** Set up a letter layout with an address and date.
* **Week 4:** Check spelling and grammar with the built in tools.
* **Week 5:** Save as a PDF and attach it to an email.
* **Week 6:** Write a real letter and send it to a friend to check.

Now each week has something concrete to do, and you always know what comes next.

## Check the goal against your life

Look back at your "My learning" page. Does the goal fit the time and data you wrote down? If you can study only one hour a week, a six week goal may need ten weeks. That is fine. A slower goal you finish is worth more than a fast one you abandon.

## Goals can change

After two or three weeks you may find the goal was too easy, too hard or not what you wanted. Change it on purpose and write down the new version. Changing a goal because you learned something is good planning. Dropping it without a word is how courses get abandoned.

When this goal is finished, set the next one, a little bigger. A chain of finished small goals is how people move from complete beginner to job ready.`,
      workedExample_md: `**Hawa sharpens her goal**

Hawa lives in Nalerigu and helps at her aunt's tailoring shop. Her first note says: "Learn social media for business."

1. **What exactly?** She narrows it down: "Post clear photos of finished dresses with prices on a WhatsApp Business catalogue."
2. **Why?** "Customers keep asking what styles we have, and my aunt wants fewer wasted calls."
3. **Finish line?** "Ten items in the catalogue with photo, name and price, and my aunt can share it."
4. **By when?** "Four weeks, studying two evenings a week."

Her weekly steps: week 1, set up the business profile; week 2, take and edit good photos; week 3, add items to the catalogue; week 4, share it and fix anything customers find confusing.

Her new goal is small, linked to a real need, and she will know exactly when she has done it.`,
      keyTerms: [
        { term: "Learning goal", definition: "A clear statement of what you will be able to do, why, how you will know and by when." },
        { term: "Finish line", definition: "The visible sign that a goal is done, such as a finished file or a task done without help." },
        { term: "Time frame", definition: "The number of weeks you give yourself to reach a goal." },
        { term: "Weekly step", definition: "A small part of a goal that you can finish in one or two study sessions." },
      ],
      commonMistakes: [
        "Using a vague wish such as learn computers as your goal",
        "Choosing a first goal that would take a year or more",
        "Having no finish line, so you never know when you are done",
        "Setting a time frame that ignores your real weekly hours",
        "Dropping a goal quietly instead of changing it on purpose",
      ],
      selfCheck: [
        "What four questions does a useful learning goal answer?",
        "Why should a first goal be small?",
        "How would you split your goal into weekly steps?",
        "What should you do if a goal turns out to be too hard?",
      ],
      practice_task_md: `**Goal:** Write your first learning goal and its weekly steps.

**Steps**

1. On your "My learning" page, write your wish in one line.
2. Answer the four questions: what exactly you will be able to do, why it matters, how you will know you are done and by when.
3. Combine your answers into one goal of two or three sentences.
4. Split the goal into weekly steps, one line per week.
5. Read your goal to a friend or family member in one breath. If you cannot, make it smaller.

**Done looks like:** A written goal with a finish line and time frame, plus a list of weekly steps that fits the hours you have.`,
      quiz: {
        questions: [
          {
            prompt: "Why is \"I want to learn computers\" called a wish rather than a goal?",
            options: [
              "It does not mention a particular brand of computer",
              "It does not name a paid course or a certificate",
              "It is too big and vague to finish or check",
              "It is written in the first person",
            ],
            answer_index: 2,
            explanation: "A goal needs to be specific enough to check and small enough to finish.",
          },
          {
            prompt: "What does the lesson suggest as a good size for a first goal?",
            options: [
              "One single study session",
              "Four to eight weeks",
              "One full year of study",
              "As long as the full course takes, however long that is",
            ],
            answer_index: 1,
            explanation: "A first goal you can finish in a month or two lets you feel the success of finishing.",
          },
          {
            prompt: "Which of these is a finish line in the lesson's sense?",
            options: [
              "Feeling more confident with computers in general",
              "Watching every video in a course playlist",
              "Studying for at least one hour on most days",
              "A finished letter sent to a friend who checks it",
            ],
            answer_index: 3,
            explanation: "A finish line is something visible that shows the goal is done.",
          },
          {
            prompt: "Your goal turns out to be much harder than expected. What does the lesson advise?",
            options: [
              "Change it on purpose and write down the new version",
              "Drop it and start a different course straight away instead",
              "Keep going exactly as planned, whatever happens",
              "Pay for a certificate so the effort is not wasted",
            ],
            answer_index: 0,
            explanation: "Changing a goal because you learned something is good planning; dropping it quietly is how courses get abandoned.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "choosing-a-course": {
      outcomes: [
        "Read a course syllabus and judge if it fits your goal",
        "Check who made a course and what learners say about it",
        "Work out the real time and data cost of a course",
        "Choose between two courses with a simple checklist",
      ],
      explanation_md: `Searching for "free Excel course" gives you hundreds of results. Some are excellent. Some are old, some are mostly adverts for a paid product, and some are simply too long or too heavy on data for your life. A few minutes of checking before you sign up can save you weeks on the wrong course.

This lesson gives you a checklist. Use it every time.

## 1. Does the syllabus match your goal?

Open the course page and find the syllabus, outline or list of modules. It is often under a heading such as "What you will learn", "Syllabus" or "Course content".

* Compare each module with your goal. If your goal is a sales record in a spreadsheet, you need modules on entering data, simple formulas and totals. A course that spends half its time on charts and macros is not the right first course.
* Check the level. Words like "beginner", "introduction" or "no experience needed" are good signs for a first course. "Intermediate" or "requires" followed by a list of skills means it expects you to know things already.
* Look for practice. Good courses include exercises, quizzes or a small project, not only videos.

## 2. Who made it?

* **The organisation.** A course from a known university, a large company that makes the software, or a well known nonprofit is more likely to be accurate and kept up to date.
* **The teacher.** Is there a name and a short biography? Can you find them anywhere else?
* **The date.** Software changes. A course on a tool that was last updated many years ago may show menus that no longer exist. Look for "last updated" or a date on the page.

## 3. What do other learners say?

Reviews and ratings help, but read them with care.

* Read a few of the lowest reviews as well as the highest. They often tell you about real problems, such as broken links or a sudden payment request.
* Look for detail. "Great course" says little. "The spreadsheet exercises were clear and I could do them on my phone" says a lot.
* Be wary of a course with only perfect reviews that all sound the same, or reviews that appear only on the seller's own WhatsApp status.
* Ask people you trust. A study group, a mentor or a friend who has taken the course is often the best review of all.

## 4. What will it really cost?

Cost is not only money. Work out three costs.

* **Money.** Is the course free to study? Is the certificate free or paid? Is there a free trial that becomes a payment later? Prices and free options change, so check the official course page on the day you sign up.
* **Time.** Look for the stated hours or weeks. Then compare with your own weekly hours. A "four week" course that expects five hours a week will take ten weeks at two hours a week.
* **Data.** Count the video. A course made of long videos can use a lot of data, while a text and quiz course uses much less. Check whether videos can be downloaded on WiFi or watched at a lower quality, and whether there are transcripts or notes to read instead.

## 5. Can you try it first?

Most good free courses let you open the first lesson before you commit. Do it. Notice whether the teacher's English is clear for you, whether the pages load well on your device and whether you understood what was taught. If the first lesson already loses you, that is useful information, not a failure. Look for a course that starts one step earlier, then come back to this one later.

## Making the choice

If two courses both pass the checklist, choose the shorter one with more practice. Finishing a good course beats starting a perfect one. Write down the course name, the link and why you chose it on your "My learning" page.`,
      workedExample_md: `**Fuseini compares two spreadsheet courses**

Fuseini, in Wa, wants to keep records for his phone accessories stall. He finds two free courses.

| Check | Course A | Course B |
|:---|:---|:---|
| Syllabus | Data entry, formulas, totals, sorting | Charts, macros, pivot tables, dashboards |
| Level | Beginner | Intermediate |
| Made by | A well known nonprofit, updated last year | Unknown channel, no date |
| Practice | Exercises after every lesson | Videos only |
| Time | About 8 hours | About 20 hours |
| Data | Mostly text and pictures | Long videos |

Course B covers more, but it is not built for a beginner, has no practice and would use most of his bundle. He opens the first lesson of Course A on his phone, understands it and signs up. He writes the link and his reasons on his "My learning" page.`,
      keyTerms: [
        { term: "Course outline", definition: "Another name for the syllabus: the list of modules and topics in a course." },
        { term: "Prerequisite", definition: "Something you are expected to know before starting a course." },
        { term: "Free trial", definition: "A period of free access that turns into a payment unless you cancel." },
        { term: "Transcript", definition: "The words of a video written out as text, which you can read instead of watching." },
      ],
      commonMistakes: [
        "Signing up because a course appeared first in a search",
        "Ignoring the level and starting with an intermediate course",
        "Trusting a page full of identical five star reviews",
        "Forgetting to count the data a video course will use",
        "Starting a free trial and forgetting that it turns into a payment",
      ],
      selfCheck: [
        "Where on a course page do you usually find the syllabus?",
        "What three costs should you work out before you start?",
        "Why should you read some of the lowest reviews?",
        "If two courses both pass the checklist, which should you choose?",
      ],
      practice_task_md: `**Goal:** Choose your course with the checklist.

**Steps**

1. Search for two or three free courses that match the goal you wrote in the last lesson.
2. For each one, write down: does the syllabus match your goal, what level is it, who made it and when, what reviews say, and the money, time and data costs.
3. Open the first lesson of your favourite and note whether you understood it on your device.
4. Choose one course and write its name, link and two reasons on your "My learning" page.

**Done looks like:** A short comparison of at least two courses, and one chosen course with a link and your reasons.`,
      quiz: {
        questions: [
          {
            prompt: "A course says \"four weeks, five hours a week\". You can study two hours a week. About how long will it take you?",
            options: [
              "About ten weeks",
              "Exactly four weeks, since that is the stated length",
              "About two weeks if you skip the practice",
              "About five weeks, one for each weekly hour",
            ],
            answer_index: 0,
            explanation: "Twenty hours of work at two hours a week takes about ten weeks.",
          },
          {
            prompt: "Why does the lesson suggest reading some of the lowest reviews?",
            options: [
              "Low reviews are almost always written by the course's competitors to hurt its sales",
              "Low reviews decide whether the certificate is accepted",
              "They often describe real problems, such as broken links or surprise payments",
              "Platforms delete high reviews after a few months",
            ],
            answer_index: 2,
            explanation: "Detailed low reviews often warn you about real problems.",
          },
          {
            prompt: "Which course page detail suggests a course is NOT a good first course for a beginner?",
            options: [
              "It says no experience is needed",
              "It is marked intermediate and lists skills you need first",
              "It has exercises after every lesson",
              "It was updated last year by the organisation that made it",
            ],
            answer_index: 1,
            explanation: "Intermediate level with prerequisites means it expects knowledge you may not have yet.",
          },
          {
            prompt: "Fuseini found two courses that both looked useful. Why did he choose Course A?",
            options: [
              "It covered far more topics, including pivot tables, macros and dashboards",
              "It had the longest videos and the most hours",
              "It came from an unknown channel with no date",
              "It matched his goal, suited beginners, had practice and used less data",
            ],
            answer_index: 3,
            explanation: "Course A fitted his goal, his level and his data, and included practice.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "free-places-to-learn": {
      outcomes: [
        "Explain why free courses can be as good as paid ones",
        "Name the kinds of free platform and what each suits",
        "Check whether a free offer is really free",
      ],
      explanation_md: `You do not need money to start learning digital skills. Some of the clearest, most up to date lessons on the internet are free, made by large companies that want people to use their software, by universities, and by nonprofits whose whole purpose is free education. Knowing where to look saves you from paying for something you could have learned for nothing, and from wasting data on poor quality videos.

This section introduces well known free platforms as **examples**. SydCrest names them to help you look and does not endorse one over another. Other good options exist, and new ones appear every year. What matters is that you learn to judge a platform yourself.

## Why something good can be free

It is fair to ask why anyone would teach you for free. There are a few honest reasons.

* **Software companies** such as Google and Microsoft want more people to know their tools well, so they publish free training for them.
* **Nonprofits** such as Khan Academy, freeCodeCamp and GCFGlobal exist to give free education, and are funded by donations and grants.
* **Universities and companies on course sites** such as Coursera and edX often let you study the lessons free, and charge only for extras such as graded tests and a certificate.
* **Video creators** on YouTube earn from adverts, so the video is free to you.

Knowing the reason helps you understand what is free and what is not. A software company's training will be very good on its own products, but it will not compare them fairly with a competitor's. A course site may keep the certificate behind a payment.

## The kinds of free platform

**Everyday skills.** GCFGlobal LearnFree and Khan Academy teach computer basics, internet safety, email, maths, reading and study skills in short, clear lessons. A good place to fill gaps.

**Work tools from the companies that make them.** Google Skillshop and Grow with Google, and Microsoft Learn, teach the tools many offices and businesses use, often with a free badge or certificate.

**Coding and data.** freeCodeCamp teaches web development and more through practice in the browser, with free certifications earned by building projects.

**Courses from universities and companies.** Coursera and edX host full courses. Many can be studied free through an option often called auditing.

**Video.** YouTube has lessons on almost anything, from very good to very poor.

The next three lessons look at each group more closely.

## Is it really free?

"Free" can mean different things. Before you invest your time, check:

* **Free to study, or free to try?** A free trial ends and becomes a payment. Free to study means you can keep learning without paying.
* **Is the certificate free?** On some platforms the lessons are free and the certificate is paid.
* **Do you need a card to sign up?** A request for card details on a "free" course is a reason to slow down and read the terms.
* **Does it cost data?** Free lessons still use your bundle. Text costs less than video.

Free options and prices change often. Whatever this track says about a platform, the official page on the day you sign up is the one to trust.

## One account, many platforms

Most platforms let you sign up with your email address, and many let you sign in with a Google or Microsoft account. Use the same email address you control for all of them, write down which platforms you joined, and keep your password safe. You will use these accounts for months, and they will hold your progress and certificates.

## Start with one

There are more free courses than any person could finish in a lifetime. The danger is not a lack of courses; it is jumping between them. Pick one platform and one course that match your goal, and stay with it until you reach your finish line.`,
      workedExample_md: `**Amina checks a "free" offer**

Amina, in Walewale, sees a post: "FREE digital marketing course with certificate! Sign up now." She runs the checks from the lesson.

1. **Free to study or free to try?** The small print says seven days free, then a monthly charge.
2. **Is the certificate free?** Only for paying members.
3. **Card details?** The sign up page asks for a card before the first lesson.
4. **Data?** Every lesson is a long video.

She decides this is a free trial of a paid course, not a free course. Instead, she looks up Google Skillshop and Grow with Google, which have free digital marketing lessons, and opens the official pages to check what is free today before signing up.`,
      keyTerms: [
        { term: "Nonprofit", definition: "An organisation that does not exist to make a profit, often funded by donations and grants." },
        { term: "Free to study", definition: "You can keep using the lessons without paying, although extras may cost money." },
        { term: "Auditing", definition: "Studying a course's lessons for free without the graded tests or certificate." },
        { term: "Endorsement", definition: "Saying one product or company is the one to choose. SydCrest names platforms only as examples." },
      ],
      commonMistakes: [
        "Paying for a course when a free one teaches the same thing well",
        "Mistaking a free trial for a free course",
        "Signing up to many platforms and finishing nothing",
        "Using a different email address on every platform and losing track of them",
      ],
      selfCheck: [
        "Give two honest reasons why a good course might be free.",
        "What is the difference between free to study and free to try?",
        "Which kind of platform suits your current goal?",
        "Why should you use one email address for all your learning accounts?",
      ],
      practice_task_md: `**Goal:** Start a list of your learning accounts and check one free offer.

**Steps**

1. On your "My learning" page, start a table with three columns: platform, email used, what I am doing there.
2. Add any learning platform you have already joined.
3. Find one "free" course offer, from a search or a message someone sent you, and run the four checks from the lesson.
4. Write one sentence: is it free to study, free to try, or something else?

**Done looks like:** A started accounts table and one offer checked with a clear verdict.`,
      quiz: {
        questions: [
          {
            prompt: "Why does a software company such as Google or Microsoft publish free training?",
            options: [
              "Ghanaian law requires every software company to train users for free",
              "It wants more people to know its own tools well",
              "It is paid by universities to send them new students",
              "It wants to compare its tools fairly with its competitors' tools",
            ],
            answer_index: 1,
            explanation: "Software companies train people on their own products so more people use them well.",
          },
          {
            prompt: "Amina's course was free for seven days and then charged monthly. What was it?",
            options: [
              "A nonprofit course funded by donations",
              "An audited university course",
              "A free tutorial series with no account needed",
              "A free trial of a paid course",
            ],
            answer_index: 3,
            explanation: "Free for a few days, then a charge, is a free trial, not a free course.",
          },
          {
            prompt: "What should you trust about whether a platform is free on the day you sign up?",
            options: [
              "The platform's official page on that day",
              "What this track said when you read it",
              "A WhatsApp post shared by a friend",
              "The first comment under a YouTube video about it",
            ],
            answer_index: 0,
            explanation: "Free options and prices change, so the official page on the day is the one to trust.",
          },
          {
            prompt: "According to the lesson, what is the real danger when there are so many free courses?",
            options: [
              "Running out of courses to take after the first year",
              "Free courses being removed as soon as you start them",
              "Jumping between courses instead of finishing one",
              "Certificates from free courses being banned by employers",
            ],
            answer_index: 2,
            explanation: "The lesson says to pick one course and stay with it until your finish line.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "work-skills-platforms": {
      outcomes: [
        "Describe what Google Skillshop, Grow with Google, Microsoft Learn and freeCodeCamp offer",
        "Find a beginner course on one of them",
        "Explain how badges and certificates are earned on each",
      ],
      explanation_md: `Many office, marketing and tech jobs use tools made by a few large companies: email, documents and spreadsheets, online advertising, and the web itself. Some of the best free training for these tools comes from the companies that make them, or from nonprofits that teach practical skills. This lesson looks at four examples. None is the only good choice, and their offers change, so always check the official page before you sign up.

## Google Skillshop

**What it is.** Google's training site for its business products, such as Google Ads, Google Analytics and Google Workspace. Courses are self paced, written and filmed by Google, and organised into short modules.

**What you can earn.** Skillshop offers certifications for some products, such as Google Ads. You study the course, then take an online assessment. Google's Skillshop help pages say its certifications are valid for a limited time, so you renew them by passing the assessment again. Many people take Skillshop courses without paying, but check Skillshop's own pages for any fee and the current rules before you start.

**Who it suits.** People heading towards digital marketing, online advertising or office roles that use Google tools. Some courses assume you already understand basic marketing, so start with the beginner ones.

## Grow with Google

**What it is.** Google's site for free and low cost training for careers and small businesses. It points to beginner digital skills courses, digital marketing basics, tools for practising job interviews and resources for small businesses.

**A note on certificates.** Grow with Google also promotes longer Google Career Certificates in areas such as IT support, data analytics and UX design. These are delivered on Coursera, which is a different arrangement from free Skillshop training. The official page shows whether they cost money and whether any funded places exist, so read the details carefully before you commit.

## Microsoft Learn

**What it is.** Microsoft's free training site. Lessons are organised into **modules** (short units, often under an hour) and **learning paths** (a few modules in order). Topics range from using Word, Excel and Teams to cloud computing, data and AI.

**What you can earn.** Finishing modules earns you badges and trophies on your Microsoft Learn profile. Microsoft also offers formal credentials: **Certifications**, earned by passing an exam, and **Applied Skills**, earned by completing tasks in a hands on assessment. Certification exams usually have a fee, and Microsoft lets you renew many certifications online at no cost. Check the credentials page for current details.

**Who it suits.** Anyone who will use Microsoft Office at work, and people interested in IT support, cloud or data. Text based modules work well on limited data.

## freeCodeCamp

**What it is.** A nonprofit that teaches coding and related skills for free, funded by donations. You learn by writing small pieces of code in the browser and checking them straight away.

**What you can earn.** freeCodeCamp's certifications are free. To earn one, you build a set of required projects that show you can apply what you learned. This is why many people respect them: you cannot get one without building things.

**Who it suits.** Anyone curious about building websites or working with data. A computer makes the practice much easier, although you can read and try small exercises on a phone.

## Getting started on any of them

1. Open the platform's official site directly, not through an advert.
2. Create an account with the email address you control.
3. Use the search or browse page with a beginner word, such as "beginner", "fundamentals" or "introduction".
4. Before starting, read the course outline and check the time it needs against your weekly hours.
5. Finish one module before browsing for more.

## Badges are a start, not the end

Badges and progress trophies are good for motivation, and a recognised certification can strengthen a CV. But an employer will still want to see that you can use the tool. Whatever you study, keep a small piece of work as proof: a spreadsheet you built, an advert you planned or a page you coded.`,
      workedExample_md: `**Sumaila starts on Microsoft Learn**

Sumaila, a national service person at a district office in Bolgatanga, is asked to help prepare reports in Word and Excel. He has a work computer and limited data on his phone.

1. He types the Microsoft Learn address himself instead of clicking an advert.
2. He signs in with his personal email address, so his progress stays with him after national service ends.
3. He searches "Excel" and filters for beginner level. He finds a short learning path on getting started with Excel.
4. He reads the outline: a few modules, a few hours in total. That fits two lunch breaks a week for a month.
5. After each module he practises on a real office report and keeps a copy of his own practice file.
6. He finishes the path, collects the badge, and saves his practice file as proof that he can use what he learned.`,
      keyTerms: [
        { term: "Module", definition: "On Microsoft Learn, a short unit of lessons on one topic, often under an hour." },
        { term: "Learning path", definition: "A few modules arranged in order to build one larger skill." },
        { term: "Certification", definition: "A credential earned by passing an assessment that tests a skill, often issued by the company that makes the tool." },
        { term: "Applied Skills", definition: "A Microsoft credential earned by completing practical tasks in a hands on assessment." },
        { term: "Badge", definition: "A small online award for finishing a module or course, shown on your profile." },
      ],
      commonMistakes: [
        "Starting with an advanced course because its title sounds impressive",
        "Signing up through an advert instead of the official site",
        "Using a work or school email that you will lose when you leave",
        "Collecting badges without keeping any work to show",
        "Assuming every Google or Microsoft certificate is free without checking",
      ],
      selfCheck: [
        "How do you earn a freeCodeCamp certification?",
        "What is the difference between a Microsoft Learn module and a learning path?",
        "Where are Google Career Certificates delivered, and where do you check their cost?",
        "Why should you keep a piece of work as well as a badge?",
      ],
      practice_task_md: `**Goal:** Find one beginner course on a work skills platform.

**Steps**

1. Choose the platform that best fits your goal: Skillshop or Grow with Google, Microsoft Learn, or freeCodeCamp.
2. Open its official site by typing the address yourself.
3. Search for a beginner course that matches your goal. Write down its name, link, number of modules and the time it needs.
4. Note whether it gives a badge, a certificate or nothing, and whether any part costs money today.
5. Add the platform to your accounts table on your "My learning" page.

**Done looks like:** One beginner course written down with its time, what it awards and its cost status, checked on the official page.`,
      quiz: {
        questions: [
          {
            prompt: "How do you earn a freeCodeCamp certification, according to the lesson?",
            options: [
              "By paying a fee after you finish the videos",
              "By watching every lesson in the curriculum",
              "By building a set of required projects",
              "By passing a timed exam at a test centre",
            ],
            answer_index: 2,
            explanation: "freeCodeCamp certifications are free and need required projects to be built.",
          },
          {
            prompt: "On Microsoft Learn, what is a learning path?",
            options: [
              "A paid exam that leads to a certification",
              "A few modules arranged in order to build one larger skill",
              "A forum where learners ask each other questions about Microsoft products",
              "A video call with a Microsoft trainer",
            ],
            answer_index: 1,
            explanation: "A learning path groups several modules in order.",
          },
          {
            prompt: "Why did Sumaila sign in with his personal email rather than a work email?",
            options: [
              "So his progress would stay with him after national service ended",
              "Because Microsoft Learn does not accept work or government email addresses at all",
              "Because personal accounts get extra free certifications",
              "So his manager could not see which modules he took",
            ],
            answer_index: 0,
            explanation: "A work or school email can be lost when you leave, taking your progress with it.",
          },
          {
            prompt: "What does the lesson say about Google Career Certificates promoted on Grow with Google?",
            options: [
              "They are always free for anyone in Ghana",
              "They are taught in person at Google offices",
              "They replace the need to show any practical work to an employer",
              "They are delivered on Coursera, so check the official page for cost",
            ],
            answer_index: 3,
            explanation: "The lesson says they are delivered on Coursera and the official page shows the cost and any funded places.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "everyday-skills-platforms": {
      outcomes: [
        "Use GCFGlobal LearnFree and Khan Academy to fill gaps in basic skills",
        "Judge whether a YouTube lesson is worth your data",
        "Build a short playlist of trusted lessons",
      ],
      explanation_md: `Not every gap needs a full course. Sometimes you need to understand how email folders work, refresh fractions before a spreadsheet course, or see how someone formats a CV. For everyday skills like these, three free places are worth knowing: GCFGlobal LearnFree, Khan Academy and YouTube. Each works differently, and each needs a slightly different approach.

## GCFGlobal LearnFree

**What it is.** A free learning site run by a nonprofit, with short tutorial series on computer basics, internet safety, email, Google tools, Microsoft Office, job search, CVs, money and more. GCFGlobal tutorials are now served from learnfree.org.

**Why it is useful.** Lessons are short, mostly text and pictures with some short videos, and written for complete beginners. That makes them light on data and easy to follow on any device.

**How to use it well.** Pick one series that matches a gap, such as "Internet Safety" or "Resume Writing", and go through it in order. Do the small interactive checks at the end of lessons when they appear. There is no formal certificate, so keep notes or a small piece of practice as your proof.

## Khan Academy

**What it is.** A nonprofit learning site with free courses, mostly in maths, science, computing and economics, from early school level to early university level. You can create an account to track your progress.

**Why it is useful.** Many digital careers need some maths: percentages for sales records, averages for data, simple algebra for spreadsheets and code. Khan Academy lets you practise exactly the level you need, with many exercises that tell you straight away if your answer is right.

**How to use it well.** Do the practice exercises, not just the videos. Use "course challenges" or unit tests to find what you already know, so you can skip it. If videos use too much data, read the article version of the lesson where one exists, and spend your data on practice.

## YouTube

**What it is.** The largest free video library in the world, including lessons from universities, companies, nonprofits and individual teachers.

**Why it is useful.** Almost any question has a video answer, and seeing someone do a task step by step can be clearer than reading about it.

**The problem.** Quality varies enormously. Some videos are outdated, wrong, or mostly an advert for something paid. Video also uses much more data than text.

**How to use it well.**

* **Check the channel.** Is it an official channel from the company that makes the tool, a known nonprofit or a university? Or an unknown account?
* **Check the date.** For software, prefer recent videos, since menus change.
* **Read the description and the top comments** before watching. If people say it did not work, move on.
* **Watch the first minute only,** then decide. If the teacher is unclear or keeps promoting a paid product, stop.
* **Lower the video quality** to save data. Most screen lessons are still readable at a low setting.
* **Make a playlist.** When you find good videos, save them to a playlist named after your goal, so you do not search and waste data again.
* **Download when you can.** In some places, including Ghana at the time of writing, the YouTube app lets you download some videos to watch offline. The next section covers this.

## Using them together

These three work well alongside a main course. For example: your main course is a spreadsheet course on Microsoft Learn, Khan Academy helps you with percentages, a GCFGlobal series refreshes saving and naming files, and one or two trusted YouTube videos help you past a step you found confusing. Keep the main course as your path, and use the others only to fill gaps.

A simple rule helps: if a helper lesson is taking longer than your main course session, stop and write down the question instead. Bring it to a study group or the community, then return to your main course. Gaps should slow you down a little, not pull you off your path.`,
      workedExample_md: `**Wumpini fills a gap before her course**

Wumpini, in Tamale, is about to start a beginner data course. The first quiz asks about percentages and averages, and she gets most of it wrong.

1. She does not abandon the course. She opens Khan Academy and searches for percentages.
2. She tries the unit test first. She already knows some parts, so she skips those lessons.
3. She works through the practice exercises for the parts she missed, reading the text explanations instead of watching every video.
4. One idea still confuses her, so she searches YouTube. She skips a video from an unknown channel that opens with an advert for a paid course, and watches a short one from an education channel instead, at low quality.
5. She saves that video to a playlist called "Data course help".
6. A week later she retakes the first quiz of her data course and passes.`,
      keyTerms: [
        { term: "Tutorial series", definition: "A set of short lessons on one topic in order, as GCFGlobal LearnFree offers." },
        { term: "Unit test", definition: "A test covering a whole unit, which can show what you already know so you can skip it." },
        { term: "Channel", definition: "The account a YouTube video comes from. Official channels are usually more reliable." },
        { term: "Playlist", definition: "A saved list of videos you can return to without searching again." },
      ],
      commonMistakes: [
        "Watching Khan Academy videos but skipping the practice exercises",
        "Trusting a YouTube video without checking the channel or date",
        "Watching lesson videos at high quality and running out of data",
        "Treating YouTube as your main course instead of a helper",
        "Searching again for a video you already found instead of saving it",
      ],
      selfCheck: [
        "Why are GCFGlobal LearnFree lessons light on data?",
        "How can Khan Academy show you what you already know?",
        "Name three checks before you trust a YouTube lesson.",
        "How should these three platforms fit around your main course?",
      ],
      practice_task_md: `**Goal:** Fill one small gap and save a trusted lesson.

**Steps**

1. Look at your goal and your chosen course. Write down one small skill you are unsure of, such as percentages, saving files or writing a formal email.
2. Find one lesson on it on GCFGlobal LearnFree or Khan Academy and complete it, including any practice.
3. Find one YouTube video on the same skill. Before watching, check the channel, the date and the top comments. Watch at a low quality setting.
4. Save the best lesson or video to a playlist or bookmark named after your goal.

**Done looks like:** One finished lesson with practice, one checked video, and a saved playlist or bookmark.`,
      quiz: {
        questions: [
          {
            prompt: "Why are GCFGlobal LearnFree lessons a good choice when your data is limited?",
            options: [
              "They are mostly text and pictures with some short videos",
              "They only work when your phone is fully offline",
              "They come with a paid certificate that refunds your data",
              "They are only available as long, high quality videos",
            ],
            answer_index: 0,
            explanation: "Text and picture lessons use far less data than long videos.",
          },
          {
            prompt: "What does the lesson suggest doing first on Khan Academy to avoid studying what you already know?",
            options: [
              "Watch every video in the course from the start",
              "Ask a friend to choose the lessons for you",
              "Try a unit test or course challenge",
              "Read the comments on each lesson",
            ],
            answer_index: 2,
            explanation: "Unit tests and course challenges show what you know so you can skip it.",
          },
          {
            prompt: "Which is a sign that you should stop watching a YouTube lesson?",
            options: [
              "It comes from the company that makes the tool",
              "It was uploaded recently and the top comments say the steps worked",
              "It explains the task step by step on screen",
              "It is from an unknown account and keeps promoting a paid course",
            ],
            answer_index: 3,
            explanation: "Unknown channels pushing a paid product are a reason to move on.",
          },
          {
            prompt: "How does the lesson suggest using these three platforms with a main course?",
            options: [
              "Replace your main course with YouTube videos",
              "Use them only to fill gaps while the main course stays your path",
              "Study all three platforms fully before you start any main course",
              "Pick whichever has the newest videos each week",
            ],
            answer_index: 1,
            explanation: "Keep one main course and use the others to fill gaps.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "course-sites-and-auditing": {
      outcomes: [
        "Explain what auditing a course gives you and what it leaves out",
        "Find the free option on a course enrolment page",
        "Avoid signing up for a paid trial by mistake",
        "Explain who can get DataCamp access through SydCrest",
      ],
      explanation_md: `Coursera and edX are large course sites. Universities and companies from around the world put full courses on them, with video lectures, readings, quizzes and assignments. Many of these courses can be studied for free through an option usually called **auditing**. Understanding how auditing works lets you learn from strong courses without paying, and stops you from signing up for a payment you did not intend.

## What auditing means

When you **audit** a course, you can usually watch the lectures and read the materials for free. What you normally do **not** get:

* **Graded assignments.** Some quizzes and projects may be locked, or you can try them but they are not marked.
* **A certificate.** The certificate is normally kept for learners who pay for the course.
* **Unlimited time,** on some sites. On edX, for example, the audit track gives access for a limited number of weeks, and a banner in the course shows when your access ends. Check the enrolment page for each course.

Auditing is not available on every course. Some programmes, especially longer professional certificates, may have no free option at all. And these rules change from time to time. Always read the course's own enrolment page on the day.

## Finding the free option

Course sites are businesses, so the biggest button on a course page usually leads to the paid option or a free trial. The free option is often smaller.

* **On Coursera,** the large enrol button often starts a free trial of a paid subscription, which charges you unless you cancel. Look in the enrolment window for a smaller link, often worded along the lines of "audit the course" or "full course, no certificate". If you cannot find it, the course may not offer auditing.
* **On edX,** the enrolment page usually shows a choice between a paid verified track with a certificate and a free audit track. Read the audit details, including how long your access lasts.
* **If a card is requested** before you have seen any free option, stop and read the page again.

Both sites have help pages explaining their current options. If anything is unclear, read those before entering any payment details.

## Is auditing worth it?

Often, yes. You get lectures and reading from well known universities and companies, for the cost of your data. Auditing makes most sense when:

* You want the knowledge, not the certificate.
* You will prove the skill another way, such as a project.
* You want to try a subject before deciding whether to pay for anything.

It makes less sense when the graded projects are the most useful part of the course, or when an employer specifically asks for that course's certificate. In that case, look for financial aid. Some course sites, edX for example, have offered help with fees to learners who apply, but the rules change; check the official pages.

## Watch the data

University lectures are often long videos. Before you start, check whether you can download videos, read transcripts or lower the video quality. A transcript plus the slides can teach you most of a lecture for a fraction of the data.

## A note on DataCamp

DataCamp is a paid platform for data and AI skills, with short interactive lessons. It runs a programme called **DataCamp Donates**, which gives free access to organisations such as nonprofits, who then invite their learners. Individuals cannot simply sign up for it on their own.

SydCrest programme learners get DataCamp Donates access from February 2027. This is for people enrolled in a SydCrest programme, not for everyone who uses this site. If you are not in a programme, the free platforms in this section teach many of the same data skills.

## Treat audited courses like real ones

A free course is easy to drop, because nothing is lost. Give an audited course the same plan you would give a paid one: a goal, study times and a finish line.`,
      workedExample_md: `**Abdul-Rahman audits a course**

Abdul-Rahman, in Bolgatanga, finds a university course on Coursera about writing for business. He wants the skill, not the certificate.

1. He clicks the large enrol button. A window offers a seven day free trial and asks for card details. He closes it without entering anything.
2. He opens the enrolment window again and reads every option. Near the bottom is a smaller link to audit the course, with no certificate.
3. He chooses it. The lectures and readings open; the graded assignments are marked as unavailable for auditors.
4. He checks the first video's settings and finds a transcript. He reads transcripts on mobile data and saves videos for WiFi.
5. To prove the skill, he rewrites three real letters from his workplace using what he learned and keeps them as examples.`,
      keyTerms: [
        { term: "Audit", definition: "To study a course's lectures and materials for free, usually without graded work or a certificate." },
        { term: "Verified track", definition: "On edX, the paid option that includes graded work and a certificate." },
        { term: "Subscription", definition: "A regular payment, often monthly, for access to many courses." },
        { term: "Financial aid", definition: "Help with course fees that some sites offer to learners who apply." },
        { term: "DataCamp Donates", definition: "A DataCamp programme that gives free access through partner organisations, not to individuals directly." },
      ],
      commonMistakes: [
        "Clicking the biggest button and starting a paid trial by accident",
        "Entering card details before looking for the free option",
        "Assuming every course can be audited",
        "Forgetting that edX audit access can end after a set number of weeks",
        "Believing anyone can get DataCamp through SydCrest",
      ],
      selfCheck: [
        "What do you usually get, and not get, when you audit a course?",
        "Where should you look for the audit option on a course page?",
        "When does auditing make less sense?",
        "Who gets DataCamp Donates access through SydCrest, and from when?",
      ],
      practice_task_md: `**Goal:** Find the free option on a real course page without paying.

**Steps**

1. Search Coursera or edX for a beginner course related to your goal.
2. Open the course page and read the enrolment options carefully. Do not enter card details.
3. Write down: is there an audit or free option, what it includes, what it leaves out, and whether access ends after a time.
4. Check how the videos are delivered: transcripts, downloads, quality settings.
5. Decide whether auditing this course fits your goal, and write one sentence explaining why.

**Done looks like:** Notes on one real course's free option, its limits and its data needs, plus your decision.`,
      quiz: {
        questions: [
          {
            prompt: "What do you normally NOT get when you audit a course?",
            options: [
              "Access to the video lectures",
              "The reading materials",
              "A certificate at the end",
              "The course outline",
            ],
            answer_index: 2,
            explanation: "The certificate is normally kept for learners who pay.",
          },
          {
            prompt: "Abdul-Rahman clicked the large enrol button and was asked for card details. What did he do?",
            options: [
              "Entered his card and planned to cancel within the week",
              "Closed it and looked again for the smaller audit link",
              "Gave up on the course and searched YouTube instead",
              "Asked a friend to pay for the course on his behalf",
            ],
            answer_index: 1,
            explanation: "He closed the window without paying and found the audit option.",
          },
          {
            prompt: "Which statement about DataCamp access matches the lesson?",
            options: [
              "Anyone who creates a free SydCrest account gets full DataCamp access straight away",
              "DataCamp is a free platform for everyone in Ghana",
              "Individuals can apply to DataCamp Donates on their own",
              "SydCrest programme learners get DataCamp Donates access from February 2027",
            ],
            answer_index: 3,
            explanation: "Access is through SydCrest's programme, from February 2027, not for everyone.",
          },
          {
            prompt: "When does the lesson say auditing makes less sense?",
            options: [
              "When the graded projects are the most useful part of the course",
              "When you want the knowledge and not the certificate",
              "When you want to try a subject before paying",
              "When you will prove the skill to employers with a project of your own",
            ],
            answer_index: 0,
            explanation: "If the graded projects matter most, the audit option may leave out what you need.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "certificates": {
      outcomes: [
        "Explain what a certificate can and cannot prove",
        "Tell a certificate of completion from a certification",
        "Decide what proof of skill you need for your goal",
      ],
      explanation_md: `Many learners want a certificate at the end of a course, and that is reasonable. A certificate is something you can attach to a job application, show a family member or add to a profile. It shows you finished something. But not every certificate means the same thing, and an employer reading your CV knows that. This section helps you choose certificates that carry weight, avoid paying for ones that do not, and show them in a way that is easy to check.

## What a certificate can prove

A certificate is a claim: "this person did this". How much it is worth depends on three questions an employer may ask, even without saying them out loud.

1. **Who issued it?** A well known university, the company that makes the tool, a professional body, or a respected nonprofit carries more weight than an unknown website.
2. **How was it earned?** Watching videos and clicking "next" proves very little. Passing a test that checks the skill, or building projects that someone reviewed, proves much more.
3. **Can it be checked?** Many good certificates have a link or an ID number that anyone can use to confirm it is real. A picture with no way to check it is easy to fake, so it is worth less.

## Completion or certification?

Two words are often mixed up.

* A **certificate of completion** says you finished a course. Many free courses give one. It shows effort and commitment, which matters, but it does not prove you can do the work.
* A **certification** says you passed an assessment of a skill, usually set by an organisation that defines the standard, such as a software company or a professional body. Some certifications expire and must be renewed, because tools change.

Both are useful. A completion certificate is a good first step. A certification can matter more when an advert names it.

## What a certificate cannot prove

Even a strong certification does not show that you can do the job day to day. Employers will still ask questions in an interview, set a short test, or ask to see something you made. That is why the best proof is a pair: **a certificate plus a piece of work**. For example: a spreadsheet course certificate plus the stock record you built for a real shop.

A certificate also does not replace experience, references or how you present yourself. It is one part of your story, not the whole story.

## A word on honesty

Only ever claim certificates you earned yourself. Paying someone to take a test for you, or editing a certificate, is dishonest and easy to discover, because good certificates can be checked. One discovered lie can end a job offer, and in a small town employers talk to each other.

## Free or paid?

Some of the most respected certificates are free, and some paid ones are worth very little. Price alone tells you nothing. Before you pay for any certificate, check:

* Does an advert for the job you want actually mention it?
* Could you prove the same skill with a free certificate and a project?
* Is the issuer well known, and can the certificate be checked online?
* Is the price shown on the issuer's official site, not only in a message from a seller?

The next lesson goes through these choices in detail.

## Keep everything in one place

Start a folder now, on your device and in your cloud storage, called "Certificates". Every time you earn something, save the file or link there with a clear name, such as "Amina Seidu Microsoft Excel module 2027". The lesson on showing certificates explains how to use them.

## The real goal

Certificates are a means, not an end. A person who studies only to collect certificates often ends up with many and little skill. A person who studies to be able to do something, and collects a certificate on the way, ends up with both.`,
      workedExample_md: `**Issahaku compares two certificates**

Issahaku, in Navrongo, has two certificates and wonders which to put first on his CV for an office assistant job.

| Question | Certificate 1 | Certificate 2 |
|:---|:---|:---|
| Issuer | Unknown website | Software company that makes the tool |
| How earned | Watched videos, clicked next | Passed an online assessment |
| Can it be checked? | No link or ID | Has a verification link |

Certificate 2 carries more weight, so he lists it first with its link. He also attaches a one page report he typed and formatted himself, so the employer can see the skill, not only the claim.`,
      keyTerms: [
        { term: "Certificate of completion", definition: "A document that says you finished a course, without proving you mastered the skill." },
        { term: "Certification", definition: "A credential earned by passing an assessment of a skill, set by the organisation that defines the standard." },
        { term: "Issuer", definition: "The organisation that gives the certificate and stands behind it." },
        { term: "Verification link", definition: "A web address or ID that lets anyone confirm a certificate is real." },
      ],
      commonMistakes: [
        "Thinking any certificate proves you can do the job",
        "Paying for a certificate that no advert for your target job mentions",
        "Keeping certificates scattered across emails and phone galleries",
        "Studying only to collect certificates instead of building skill",
      ],
      selfCheck: [
        "What three questions decide how much a certificate is worth?",
        "What is the difference between a certificate of completion and a certification?",
        "Why is a certificate plus a piece of work stronger than a certificate alone?",
        "Where will you keep your certificates?",
      ],
      practice_task_md: `**Goal:** Set up your certificates folder and judge what you already have.

**Steps**

1. Create a folder called "Certificates" on your device and, if you use one, in your cloud storage.
2. Gather any certificates you already have from school, courses or training and save them there with clear names.
3. For each one, write down the issuer, how it was earned and whether it can be checked.
4. Next to your learning goal, write one piece of work you could make to go with your future certificate.

**Done looks like:** A named certificates folder, a short note on each certificate you have, and one planned piece of work.`,
      quiz: {
        questions: [
          {
            prompt: "Which certificate is likely to carry the most weight with an employer?",
            options: [
              "One from an unknown site, earned by watching videos",
              "One from an unknown site with a colourful design and a gold seal printed on it",
              "One you printed yourself from a free template",
              "One from the tool's maker, earned by passing a test and checkable online",
            ],
            answer_index: 3,
            explanation: "Issuer, how it was earned and whether it can be checked all count.",
          },
          {
            prompt: "What does a certificate of completion mainly show?",
            options: [
              "That you passed a strict test set by a professional body",
              "That you finished a course",
              "That you have worked in the job for a year",
              "That an employer has already approved your skills",
            ],
            answer_index: 1,
            explanation: "Completion shows you finished, not that you mastered the skill.",
          },
          {
            prompt: "According to the lesson, what is the best proof of a skill?",
            options: [
              "The most expensive certificate you can find",
              "As many certificates as possible from different sites",
              "A certificate plus a piece of work you made",
              "A letter saying you watched every video",
            ],
            answer_index: 2,
            explanation: "A certificate paired with real work shows both the claim and the skill.",
          },
          {
            prompt: "Why are some certifications set to expire and need renewing?",
            options: [
              "Because the tools they cover change over time",
              "Because the issuer wants to stop old learners applying for jobs",
              "Because certificates are only legal in Ghana for one year",
              "Because employers ignore any certificate older than a month",
            ],
            answer_index: 0,
            explanation: "The lesson says some certifications expire because tools change.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "choosing-certificates": {
      outcomes: [
        "Compare certificates by issuer, assessment and cost",
        "Check whether job adverts in your area ask for a certificate",
        "Decide when a paid certificate is worth it",
        "Find the official price and rules before paying",
      ],
      explanation_md: `You can earn certificates from many places, and some cost money. With little money and limited time, you want certificates that help your goal, not a pile of documents that nobody reads. This lesson gives you a way to compare them and decide when paying is worth it.

## Start with the job, not the certificate

The best guide to which certificate matters is the job you want. Look at real job adverts for that role on Ghanaian job sites, in newspapers, on company pages or on notice boards.

* Count how many adverts mention a certificate by name.
* Note what skills they ask for, such as "proficient in Microsoft Excel" or "experience with Google Ads".
* Notice the level. Entry level adverts often ask for skills and attitude, while more senior adverts are more likely to name a certification.

If no advert you read mentions a particular certificate, it is probably not worth paying for yet. A free course plus a project can prove the same skill.

If you cannot find many adverts, ask people who already do the job, such as a shop manager, an NGO officer or an office administrator, what they look for when they hire. Their answer is often more useful than any list on the internet.

## Four ways certificates are earned

From least to most convincing, roughly:

1. **Attendance or completion.** You watched or attended. Shows commitment.
2. **Quiz at the end.** A short multiple choice test. Shows you followed the course.
3. **Proctored or timed exam.** A longer test, sometimes watched by a supervisor through a webcam or at a test centre. Shows knowledge under pressure.
4. **Projects or practical tasks.** You build something, and it is checked. Shows you can do the work. freeCodeCamp certifications and Microsoft Applied Skills are examples of this approach.

The more a certificate tests what you can actually do, the more an employer can trust it.

## Free certificates worth knowing

Several respected issuers give free certificates or badges, though offers change, so check before you start:

* **Google Skillshop** product certifications, such as for Google Ads, earned by an online assessment.
* **Microsoft Learn** badges and trophies for modules and learning paths, shown on your profile.
* **freeCodeCamp** certifications, earned by building required projects.

These are a strong start, especially when paired with your own work.

## When paying can make sense

A paid certificate can be worth it when:

* Adverts for the job you want ask for it by name.
* It comes from the maker of the tool, a university or a professional body, and can be checked online.
* It tests real skills, with an exam or projects.
* You have already learned the material, ideally for free, and feel ready to pass.

It is usually **not** worth it when it comes from an unknown site, when no advert asks for it, or when someone is pressuring you to pay today.

## Before you pay

* **Find the price on the official site.** Prices change and can differ by country. Never trust a price only because someone sent it on WhatsApp.
* **Look for help with fees.** Some issuers and course sites offer discounts, financial aid or funded places at times.
* **Check the rules.** How many attempts do you get? Does it expire? Do you need a webcam, a quiet room or a computer for the exam?
* **Practise first.** Many issuers offer free practice tests. If you cannot pass the practice test, you are not ready to pay.
* **Pay only through the official site,** never to a person who offers to "register" you.

## Building a set that tells a story

A small set of linked certificates is stronger than a random collection. For an office assistant goal, that could be a free completion certificate for computer basics, a free badge for a spreadsheet path and, later, a recognised certification if adverts ask for it, each with a piece of work to go with it.`,
      workedExample_md: `**Hawa decides whether to pay**

Hawa, in Wa, wants a customer service job and sees an advert for a paid "Customer Excellence Diploma" from an online seller.

1. **Job adverts:** She reads ten customer service adverts. None mentions this diploma. Several ask for good communication, email and basic computer skills.
2. **Issuer:** The seller has no website, only a social media page.
3. **How earned:** A ten question quiz after some videos.
4. **Pressure:** "Price goes up tomorrow!"

She decides not to pay. Instead she studies a free GCFGlobal series on business communication, practises writing polite replies to complaints, and earns a free Microsoft Learn badge for a module on Outlook. She puts her best written replies in a folder to show employers.`,
      keyTerms: [
        { term: "Proctored exam", definition: "An exam watched by a supervisor, in person or through a webcam, to stop cheating." },
        { term: "Practice test", definition: "A free sample of an exam that shows whether you are ready." },
        { term: "Funded place", definition: "A place on a paid course or exam where someone else covers the fee." },
        { term: "Professional body", definition: "An organisation that sets standards for a profession and may award certifications." },
      ],
      commonMistakes: [
        "Paying for a certificate before reading any job adverts",
        "Trusting a price sent on WhatsApp instead of checking the official site",
        "Booking a paid exam before passing a free practice test",
        "Paying a person who offers to register you for an exam",
        "Collecting unrelated certificates that do not tell one story",
      ],
      selfCheck: [
        "How can job adverts help you decide which certificate to earn?",
        "Which way of earning a certificate is most convincing, and why?",
        "Name two signs that a paid certificate is not worth it.",
        "What should you do before paying for any exam?",
      ],
      practice_task_md: `**Goal:** Decide which certificate, if any, fits your goal.

**Steps**

1. Find five job adverts for a role linked to your goal. Write down any certificate or tool they name.
2. List two or three certificates you could earn for that skill. For each, note the issuer, how it is earned, whether it can be checked and whether it is free or paid today.
3. For any paid one, find the price and rules on the official site and look for a free practice test.
4. Choose one certificate to aim for and one piece of work to pair with it.

**Done looks like:** A short table of adverts and certificate options, and a written choice with your reasons.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say is the best guide to which certificate matters?",
            options: [
              "Real job adverts for the role you want",
              "Whichever certificate costs the most",
              "The certificate your friends are taking",
              "The first certificate advert you see online",
            ],
            answer_index: 0,
            explanation: "Start with the job: adverts show which certificates and skills employers ask for.",
          },
          {
            prompt: "Which way of earning a certificate is the most convincing, according to the lesson?",
            options: [
              "Attending or watching the whole course",
              "Answering a short quiz at the end of the videos",
              "Building projects or doing practical tasks that are checked",
              "Paying a much higher fee for a printed copy of the certificate",
            ],
            answer_index: 2,
            explanation: "Certificates that test what you can do are the ones employers can trust most.",
          },
          {
            prompt: "Hawa saw no job adverts asking for the paid diploma. What did she decide?",
            options: [
              "To pay quickly before the price went up the next day, as the seller warned",
              "Not to pay, and to prove the skill with free courses and written work",
              "To pay a friend to sit the quiz for her",
              "To stop looking for customer service jobs",
            ],
            answer_index: 1,
            explanation: "No advert asked for it, the issuer was unknown and there was pressure to pay.",
          },
          {
            prompt: "Why should you take a free practice test before paying for an exam?",
            options: [
              "Practice tests give you the certificate for free",
              "Issuers refuse to sell exams to people who skip practice",
              "Practice tests are the only place the real price is shown",
              "If you cannot pass it, you are not ready to pay",
            ],
            answer_index: 3,
            explanation: "A practice test shows whether you are ready before you spend money.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "showing-certificates": {
      outcomes: [
        "Save and name certificates so they are easy to find and send",
        "Add certificates to a CV with their links",
        "Pair each certificate with proof of the skill",
      ],
      explanation_md: `Earning a certificate is only half the job. If an employer cannot find it, open it or check it, it does nothing for you. Many people lose certificates in old email accounts, phone galleries and WhatsApp chats. This lesson shows you how to keep them safe, list them well and pair them with proof.

## Save each certificate the day you earn it

As soon as you earn something:

1. **Download the file,** usually a PDF, if the platform offers one.
2. **Copy the verification link** or ID if there is one. This is the web address that proves the certificate is real.
3. **Name the file clearly,** with your name, the issuer, the course and the year, for example "Fuseini Alhassan Google Skillshop Ads 2027.pdf".
4. **Save it in your "Certificates" folder** on your device, and a copy in cloud storage such as Google Drive or OneDrive, so a lost or broken phone does not take it with it.
5. **Write it in a list:** name, issuer, date, link, and any expiry date.

Use your own email address for every platform. If you earned something with a school or work email, download it now, before you lose access to that account.

## Listing certificates on a CV

On a CV, certificates usually go in a section called "Certificates", "Training" or "Courses", after your education or experience. For each one, give:

* The name of the certificate or course.
* The issuer.
* The month and year.
* A short link, if it can be checked online.

Put the most relevant ones first, not the oldest or the most. Three certificates that match the job are better than twelve that do not. A line such as "Introduction to Excel, Microsoft Learn, March 2027" is clear and honest.

Never list a certificate you did not earn, or describe a course as a certification when it was not. Employers can check, and being caught once can cost you the job.

## Online profiles

Many platforms let you share a certificate to a professional profile, such as LinkedIn, or keep it on a public profile page, as Microsoft Learn and freeCodeCamp do. These pages are easy for an employer to check. Only share what you are comfortable making public, and check that your profile shows your name the same way as on your CV.

## Pair every certificate with proof

The strongest way to show a certificate is next to something you made with the skill. For example:

| Certificate | Proof to pair with it |
|:---|:---|
| Spreadsheet course | A stock or sales record you built |
| Digital marketing course | A simple plan for a local business's posts |
| Typing course | Your speed result and a typed letter |
| Coding certification | A small website and its link |

Keep these in a folder or a simple portfolio page. When you apply, attach or link one example, and mention it in your message: "I recently completed a spreadsheet course and used it to build the stock record I have attached."

## Sending certificates

When an application asks for certificates:

* Send PDFs, not photos of a screen.
* Combine several into one PDF if the form allows only one file.
* Keep file sizes small enough for email, and name the files clearly.
* Include the verification links in the body of your email.

## Keep the list current

Once a month, update your list. Add new certificates, renew any that are about to expire if they still matter, and remove ones that no longer fit the jobs you want. Set a reminder on your phone or computer calendar so you do not forget.

If you do not have a CV yet, start a simple one now with your name, contact details, education and a Certificates section. You can improve it as you learn. What matters today is that your certificates have a home.`,
      workedExample_md: `**Mariama prepares her application**

Mariama, in Tamale, is applying for a records assistant job. She has five certificates, saved in different places.

1. She finds them in her email, gallery and WhatsApp chats and saves each as a PDF in a "Certificates" folder, with copies in her cloud storage.
2. She renames them clearly, such as "Mariama Iddrisu GCFGlobal Excel 2027".
3. She chooses the three most relevant for the job and lists them on her CV with issuer, date and link.
4. She attaches the stock record she built for her kiosk as proof, and writes one sentence about it in her email.
5. She leaves out an unrelated photography certificate, keeping her CV focused.`,
      keyTerms: [
        { term: "PDF", definition: "A file format that keeps a document looking the same on every device; most certificates come as PDFs." },
        { term: "Cloud storage", definition: "Online storage such as Google Drive or OneDrive that keeps a copy of your files safe if your device is lost." },
        { term: "Portfolio", definition: "A small collection of your best work that shows what you can do." },
        { term: "Public profile", definition: "A page on a platform that anyone with the link can see, often showing your certificates." },
      ],
      commonMistakes: [
        "Leaving certificates in an old school or work email account",
        "Sending a blurry photo of a screen instead of the PDF",
        "Listing every certificate instead of the most relevant ones",
        "Calling a completion certificate a certification",
        "Sending certificates with no proof of the skill",
      ],
      selfCheck: [
        "What five things should you do the day you earn a certificate?",
        "What details should each certificate have on a CV?",
        "Why should you pair a certificate with a piece of work?",
        "How should you send several certificates when a form accepts one file?",
      ],
      practice_task_md: `**Goal:** Make your certificates easy to find, check and show.

**Steps**

1. Gather every certificate you have into your "Certificates" folder as PDFs, with copies in cloud storage.
2. Rename each file with your name, issuer, course and year.
3. Write a list with name, issuer, date, link and any expiry.
4. Write a "Certificates" section for your CV with your three most relevant ones.
5. Next to each, note one piece of work that proves the skill, or plan one if you do not have it yet.

**Done looks like:** A tidy folder, a certificate list and a short CV section, each certificate paired with proof or a plan for it.`,
      quiz: {
        questions: [
          {
            prompt: "Which file name follows the lesson's advice?",
            options: [
              "certificate_final_version_2_new_copy_for_jobs.pdf",
              "Fuseini Alhassan Google Skillshop Ads 2027.pdf",
              "IMG_20270314.jpg",
              "download (3).pdf",
            ],
            answer_index: 1,
            explanation: "A clear name includes your name, the issuer, the course and the year.",
          },
          {
            prompt: "You earned a certificate using your school email. What does the lesson advise?",
            options: [
              "Leave it there, since schools keep accounts open for life",
              "Forward the school email to an employer when needed",
              "Ask the school to print it for you each time you apply",
              "Download it now, before you lose access to that account",
            ],
            answer_index: 3,
            explanation: "You may lose a school or work account when you leave, and the certificate with it.",
          },
          {
            prompt: "How many certificates should you put first on a CV for a particular job?",
            options: [
              "The most relevant ones for that job",
              "Every certificate you have ever earned",
              "Only the oldest ones, to show experience",
              "Only the paid ones, to show you invested",
            ],
            answer_index: 0,
            explanation: "A few matching certificates are better than many that do not fit.",
          },
          {
            prompt: "A form allows only one file but you have three certificates. What does the lesson suggest?",
            options: [
              "Send only the newest one and forget the others",
              "Take photos of your screen and send the clearest",
              "Combine them into one PDF",
              "Put them in a WhatsApp chat and send the link",
            ],
            answer_index: 2,
            explanation: "Combining several certificates into one PDF works when only one file is allowed.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "learning-on-limited-data": {
      outcomes: [
        "Estimate which parts of a course use the most data",
        "Plan which lessons to study online, offline and on WiFi",
        "Describe the options for studying without your own device",
      ],
      explanation_md: `For many learners in northern Ghana, the hardest part of an online course is not the content. It is the bundle running out, the phone being needed by someone else, or the light going off just as a lesson starts. These are real problems, and they have practical answers. This section is about learning well even when data, devices and time are limited.

## Where your data goes

Not every part of a course costs the same.

* **Video** uses by far the most data, especially at high quality and when it plays on its own.
* **Live classes** on video calls use a lot, and you cannot pause them to wait for WiFi.
* **Interactive exercises** use a little, because each step sends small amounts of information.
* **Reading** text and looking at pictures uses very little.
* **Downloading** a file uses data once; reading it later uses none.

So the biggest savings come from controlling video: lowering its quality, downloading it on WiFi, or reading a transcript instead.

If a course only works with heavy data, say so. Many platforms have help pages or forums where you can ask whether lessons can be downloaded or whether a text version exists. Your study group may also know a lighter course that teaches the same skill.

If you studied the Digital Skills Bridge, you already know phone level habits such as data saver, WiFi only app updates and checking which apps use data. This section builds on those, for courses specifically.

## Split your study into three kinds

A simple plan helps you use data on purpose, not by accident.

1. **WiFi time.** When you have WiFi, at a hub, a library, a church, a school or a relative's house, download videos, notes and whole lessons, and do anything that needs a lot of data, such as a live class.
2. **Offline time.** Study what you downloaded: watch saved videos, read notes, write summaries, practise.
3. **Light data time.** On your bundle, do the things that use little data: quizzes, interactive exercises, reading text lessons, asking a question in your study group.

Many learners find that most of their study can happen offline or on light data, with WiFi saved for downloading.

## When the device is not only yours

Sharing a phone or computer with family or colleagues is common. It means planning when you can use it, keeping your accounts private and making sure your files and progress are not lost when someone else uses it. One lesson in this section is all about this, including places in your town where you might use a computer or WiFi.

## When the power goes

Light off is part of life in many places. Keep your device charged when you can, carry a power bank if you have one, and lower screen brightness during study. Downloaded lessons and paper notes mean a power cut or a network problem does not stop your session completely.

## What this section covers

* **Downloading lessons and offline modes.** Which apps let you save lessons, how to save a web page or PDF for later, and how to keep your storage under control.
* **Data saving and low data video.** Video quality settings, turning off autoplay, transcripts and other ways to make a bundle last.
* **Shared devices, hubs and libraries.** Studying on a shared phone or computer safely, and finding places with computers or WiFi.

## A note on cost

Data prices and bundle offers change often and differ between networks, so this track does not quote them. Instead, measure your own use. Most phones show data use per app in Settings. Check it before and after a study session to learn what each kind of lesson really costs you.

Remember: limited data slows you down, but it does not stop you. Many people have finished whole courses mostly offline. Planning is what makes the difference.`,
      workedExample_md: `**Sumaila plans a low data week**

Sumaila, in Walewale, has a small weekly bundle and WiFi at a community centre on Saturday mornings.

1. **Saturday, WiFi time:** He downloads the week's three course videos at a low quality, saves the lesson notes as PDFs and joins the course's live question session.
2. **Monday and Wednesday, offline time:** He watches one saved video each evening, pauses to try each step, and writes a short summary in his notebook.
3. **Tuesday and Thursday, light data time:** He does the course's quick quizzes and posts one question in his study group.
4. **Sunday:** He checks his data use in Settings. His course used only a small part of his bundle, so he knows the plan works.`,
      keyTerms: [
        { term: "Bundle", definition: "A prepaid amount of mobile data that lasts for a set period or until it is used up." },
        { term: "Offline", definition: "Using something without an internet connection, such as a lesson you downloaded earlier." },
        { term: "Transcript", definition: "The words of a video written out, so you can read the lesson instead of watching it." },
        { term: "Power bank", definition: "A portable battery for charging a phone when there is no power." },
      ],
      commonMistakes: [
        "Streaming every video on mobile data instead of downloading on WiFi",
        "Joining long live classes on a small bundle",
        "Using WiFi time to browse instead of downloading the week's lessons",
        "Never checking how much data a study session actually used",
      ],
      selfCheck: [
        "Which part of a course usually uses the most data?",
        "What are the three kinds of study time in this lesson?",
        "Where could you get WiFi in your town?",
        "How can you measure what a study session costs in data?",
      ],
      practice_task_md: `**Goal:** Plan one week of study around your data and WiFi.

**Steps**

1. Write down where and when you can get WiFi this week, if at all.
2. List the parts of your course for the week: videos, reading, quizzes, any live sessions.
3. Sort each part into WiFi time, offline time or light data time.
4. Before your next study session, note your data use in Settings. Check it again afterwards and write down the difference.

**Done looks like:** A one week plan with each course activity in a time slot, and one real measurement of what a session used.`,
      quiz: {
        questions: [
          {
            prompt: "Which part of an online course usually uses the most data?",
            options: [
              "Reading text lessons",
              "Doing short interactive quizzes",
              "Video, especially at high quality",
              "Reading a file you downloaded earlier",
            ],
            answer_index: 2,
            explanation: "Video uses by far the most data, so controlling it gives the biggest savings.",
          },
          {
            prompt: "What should you mainly do during WiFi time, according to the lesson?",
            options: [
              "Download videos, notes and lessons, and join any live classes",
              "Scroll through social media and chat with friends while the WiFi is free",
              "Take quick quizzes that use very little data",
              "Write summaries of lessons you already studied",
            ],
            answer_index: 0,
            explanation: "WiFi time is for downloading and anything that needs a lot of data.",
          },
          {
            prompt: "Why does this track not quote data prices?",
            options: [
              "Data is free for registered learners on every network in Ghana",
              "Prices are the same on every network all year",
              "SydCrest pays for every learner's bundle",
              "Prices and offers change often and differ between networks",
            ],
            answer_index: 3,
            explanation: "Instead of quoting prices, the lesson suggests measuring your own use.",
          },
          {
            prompt: "How does the lesson suggest finding out what a study session really costs?",
            options: [
              "Ask the course provider to send you a data report",
              "Check your data use in Settings before and after the session",
              "Count how many videos you watched during the session",
              "Wait until the bundle runs out, then divide it by the number of days",
            ],
            answer_index: 1,
            explanation: "Most phones show data use per app in Settings, so measure before and after.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "downloading-lessons": {
      outcomes: [
        "Download course videos and lessons to study offline",
        "Save a web page or lesson as a PDF",
        "Manage downloads so your storage does not fill up",
      ],
      explanation_md: `Downloading turns a lesson that needs data every time into one that needs data once. If you download on WiFi, it may need no bundle at all. This is the single most useful habit for learning on limited data. It also protects you from network problems: a downloaded lesson works when the signal is weak or gone.

## Three ways to keep a lesson for offline use

### 1. Download inside the app

Many learning and video apps have their own download feature. You download inside the app, and the lesson plays later inside the same app, even without a connection.

* Look for a **download icon**, often a downward arrow, next to a video or lesson.
* Some course apps let you download lecture videos for offline viewing. Look for the download icon on a lesson, or the word offline in the app's settings.
* The **YouTube** app lets you download some videos in some countries. At the time of writing, YouTube's help page lists Ghana among them; in many other places downloads need a paid YouTube Premium membership. Not every video can be downloaded, and the button only appears when it is allowed.
* Downloads inside an app usually stay inside that app. You cannot always find them in your file manager, and some apps need you to reconnect from time to time to keep them working.

Before downloading, look in the app's settings for the **download quality** and a **download over WiFi only** option. Choose a lower quality to save data and storage, and turn on WiFi only so a large download never eats your bundle by accident.

### 2. Save the page as a PDF

For lessons that are mostly text and pictures, such as many GCFGlobal LearnFree or Microsoft Learn pages, you can save the page to read later.

* **On a computer:** open the page, press Ctrl and P (Command and P on a Mac) to print, and choose **Save as PDF** as the printer. The PDF goes to your Downloads folder.
* **On a phone:** in many browsers you can open the menu, choose **Share** or **Print**, and pick **Save as PDF**. Some phone browsers also have a **Download** option in the menu that saves the page for offline reading.

Give the file a clear name, such as "Excel lesson 3 formulas".

### 3. Download the course files

Many courses offer slides, notes, worksheets or transcripts as downloads. Look for "Resources", "Materials" or "Downloads" on the course page. These are often small files and very useful for offline study.

## Offline learning libraries

Some schools, hubs and community centres run **offline learning libraries**, such as Kolibri, an open source platform that holds lessons on a local computer or server so learners can use them without internet. If a centre near you has one, ask what courses are on it.

## Managing storage

Downloads take space. A full phone runs slowly and can stop saving new files.

* **Download one week at a time,** not a whole course.
* **Delete as you finish.** When you have studied a video and written your notes, delete the download. Your notes are what you keep.
* **Check storage before WiFi time.** Make sure you have room, so your trip to the WiFi is not wasted.
* **Use a memory card** if your phone has a slot, and set downloads to go there where the app allows.
* **Watch for duplicates.** If a download fails halfway and you try again, you may end up with two copies. Check and delete the extra one.

## A simple routine

1. Before WiFi time, check storage and decide which lessons you need for the week.
2. On WiFi, set a low download quality and download those lessons, plus any notes and transcripts.
3. During the week, study offline and take notes.
4. After each lesson, delete the download.

This routine turns a short WiFi visit into a full week of study. If you miss a WiFi visit, your notes from earlier weeks still give you something useful to review offline.`,
      workedExample_md: `**Amina saves a week of lessons**

Amina, in Nalerigu, has WiFi at her cousin's shop on Fridays.

1. On Thursday she checks her phone storage and deletes last week's watched videos.
2. On Friday, on WiFi, she opens her course app, sets downloads to a low quality and WiFi only, and downloads the three videos for the week.
3. Her course also has a text lesson. She saves it as a PDF from her browser's Share menu and names it "Week 4 reading".
4. She downloads the week's worksheet from the course's Resources page.
5. During the week she studies offline in the evenings, writing notes in her exercise book.
6. After each video she deletes it. By the next Friday, her storage is ready again.`,
      keyTerms: [
        { term: "Download", definition: "Saving a copy of a file or lesson on your device so you can use it later without data." },
        { term: "Download quality", definition: "An app setting that decides how sharp a downloaded video is, and so how much data and space it uses." },
        { term: "Save as PDF", definition: "A print option that saves a web page as a file you can read offline." },
        { term: "Offline library", definition: "A set of lessons stored on a local computer or server so learners can use them without internet." },
        { term: "Memory card", definition: "A small removable card that adds storage to some phones." },
      ],
      commonMistakes: [
        "Downloading a whole course at once and filling your storage",
        "Leaving download quality on high and using up your WiFi time and space",
        "Forgetting to turn on download over WiFi only",
        "Keeping videos after you have studied them",
        "Using unofficial video downloader sites, which can carry malware",
      ],
      selfCheck: [
        "What are the three ways to keep a lesson for offline use?",
        "How do you save a web page as a PDF on the device you use most?",
        "Why should you choose a lower download quality?",
        "What should you do with a download once you have studied it?",
      ],
      practice_task_md: `**Goal:** Download one lesson and study it offline.

**Steps**

1. Check your device storage and free up space if needed.
2. In your course app or YouTube, find the download quality and WiFi only settings. Set a lower quality and turn on WiFi only, if your app has them.
3. Download one lesson video, or save one text lesson as a PDF with a clear name.
4. Turn off WiFi and mobile data, and study the lesson offline. Write three lines of notes.
5. Delete the downloaded video afterwards, keeping your notes.

**Done looks like:** One lesson studied fully offline, three lines of notes, and the download deleted.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you turn on \"download over WiFi only\" in a learning app?",
            options: [
              "It makes downloaded videos play in higher quality",
              "It stops a large download from using your mobile bundle",
              "It lets you download videos that are normally blocked in Ghana",
              "It moves your downloads onto a memory card",
            ],
            answer_index: 1,
            explanation: "WiFi only means a big download never uses your bundle by accident.",
          },
          {
            prompt: "How do you save a web page as a PDF on a computer, according to the lesson?",
            options: [
              "Take a photo of the screen with your phone",
              "Copy the page address and send it to yourself on WhatsApp later",
              "Bookmark the page and open it again later",
              "Press Ctrl and P, then choose Save as PDF as the printer",
            ],
            answer_index: 3,
            explanation: "Printing to Save as PDF makes a file you can read offline.",
          },
          {
            prompt: "What does the lesson advise doing with a video once you have studied it and taken notes?",
            options: [
              "Delete the download and keep your notes",
              "Share it with everyone in your study group",
              "Download it again in a higher quality",
              "Move it to your gallery so it is safe",
            ],
            answer_index: 0,
            explanation: "Deleting finished downloads keeps storage free; your notes are what you keep.",
          },
          {
            prompt: "What is Kolibri, as described in the lesson?",
            options: [
              "A paid video downloader website",
              "A setting in the YouTube app",
              "An open source platform that holds lessons for use without internet",
              "A special Ghanaian mobile data bundle sold only to registered students",
            ],
            answer_index: 2,
            explanation: "Kolibri stores lessons on a local computer or server for offline learning.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "low-data-video": {
      outcomes: [
        "Lower video quality for one video and by default",
        "Turn off autoplay in video and learning apps",
        "Choose text versions and transcripts instead of video",
        "Set up your browser and phone to save data while you study",
      ],
      explanation_md: `Video is the biggest data cost in most online courses. The good news is that you rarely need high quality video to learn. A lesson showing a spreadsheet, a slide or a person talking is still clear at a low setting. A few settings, changed once, can make the same bundle cover far more study.

## Lower the quality of one video

Most video players have a quality setting.

* **YouTube:** while a video is playing, tap or click the **Settings** icon, often a gear, and choose **Quality**. Pick a lower option. On a computer, the same gear appears at the bottom of the video.
* **Course platforms:** look for a gear or a number such as 720p or 360p on the video player. Lower numbers mean smaller, lower quality video and less data.

Try the lowest setting first. If you cannot read the text on screen, go up one step.

## Set a default for mobile data

Changing every video by hand is tiring. Many apps let you set a default.

* In the **YouTube app**, open your profile, then **Settings**, then **Video quality preferences**. You can choose separate settings for mobile networks and for WiFi. Choosing **Data saver** for mobile networks gives lower quality video whenever you are on your bundle, while WiFi can stay on Auto. You have to set the two separately.
* Other apps have similar options under names such as "streaming quality", "video quality" or "data usage". Search the app's settings.

Menus change between versions, so if you cannot find these exact words, look for the closest match.

## Turn off autoplay

Autoplay starts the next video by itself when one finishes, and it can also play videos as you scroll past them. Both use data you did not choose to spend.

* **YouTube:** there is an autoplay switch on the video player, and an option in Settings.
* **Social media apps:** look in settings for "autoplay" or "media and data" and choose WiFi only or never.
* **Course platforms:** some have an autoplay or "play next automatically" switch in the player settings.

## Choose text when it exists

* **Transcripts:** many course videos have a transcript, a text version of everything said. Reading it uses a tiny fraction of the data, and you can search it for a word.
* **Captions:** turning on captions does not save data, but it helps when the sound is poor or the accent is unfamiliar.
* **Article versions:** Khan Academy, Microsoft Learn and GCFGlobal often have text lessons alongside or instead of video.
* **Audio only:** some lectures are mostly talking. If an app offers audio only, it uses less than video.

Watching at a faster playback speed does not save data on its own, because the whole video still loads. Choosing what to watch, and at what quality, is what saves data.

## Browser and phone settings

* **Data saver on your phone:** if you studied the Bridge, you will have turned this on. It limits background data from other apps while you study.
* **Browser data saving:** some browsers have a data saving or lite mode in their settings, though not all do, and the options change. Look in your browser's settings for words such as "data saver", "lite" or "reduce data".
* **Close other tabs and apps** while streaming, so nothing else is using data at the same time.

## Live classes on a small bundle

If you must join a live class on mobile data, turn off your own camera unless you are asked to show it, and close other apps. Ask whether the class will be recorded so you can download it on WiFi instead.

## Check that it worked

After a week with these settings, check your data use per app in Settings. Compare with an earlier week if you can. Seeing the difference is the best motivation to keep going.

If your data still runs out fast, look at the app at the top of the list. It is often not your course at all, but a social media or video app running in the background.`,
      workedExample_md: `**Fuseini makes his bundle last**

Fuseini, in Wa, found his bundle finished in four days during his course.

1. He opens YouTube's Settings, then Video quality preferences, and sets Data saver on mobile networks. WiFi stays on Auto.
2. He turns autoplay off in the YouTube player and in his social media apps' media settings.
3. In his course, he notices each lecture has a transcript. On mobile data, he reads transcripts and watches only the short parts that show a demonstration, at a low quality.
4. He keeps full videos for WiFi on Saturdays.
5. A week later, Settings shows his video apps used much less data than before, and his bundle lasts the whole week.`,
      keyTerms: [
        { term: "Video quality", definition: "How sharp a video looks; higher quality uses more data." },
        { term: "Data saver", definition: "A setting that lowers data use, for example by playing lower quality video on mobile networks." },
        { term: "Autoplay", definition: "A feature that starts the next video by itself, using data you did not choose to spend." },
        { term: "Captions", definition: "Words shown on screen as people speak; helpful for understanding but they do not save data." },
      ],
      commonMistakes: [
        "Leaving video quality on Auto or high while on mobile data",
        "Setting data saver for WiFi but forgetting mobile networks, or the other way round",
        "Letting autoplay run through a whole playlist",
        "Watching a whole lecture when a transcript covers it",
        "Thinking captions reduce data use",
      ],
      selfCheck: [
        "How do you lower the quality of one video?",
        "Where can you set a default quality for mobile networks in the YouTube app?",
        "What does autoplay do, and why does it waste data?",
        "Which uses less data: watching a lecture or reading its transcript?",
      ],
      practice_task_md: `**Goal:** Set up your device to use less data on video.

**Steps**

1. In your main video or course app, set a lower default quality for mobile data, if the app allows it.
2. Turn off autoplay in that app and in one social media app.
3. Find one lesson in your course that has a transcript or text version, and study it that way.
4. Note your video apps' data use in Settings today, and again in a week.

**Done looks like:** Quality and autoplay settings changed, one lesson studied from text, and two data readings a week apart.`,
      quiz: {
        questions: [
          {
            prompt: "In the YouTube app, what does choosing Data saver for mobile networks do?",
            options: [
              "Turns off all videos completely until you connect to a WiFi network",
              "Downloads every video you watch automatically",
              "Plays lower quality video whenever you are on your bundle",
              "Sets the same quality on WiFi and on mobile data",
            ],
            answer_index: 2,
            explanation: "Mobile networks and WiFi are set separately; Data saver lowers quality on your bundle.",
          },
          {
            prompt: "Which of these does NOT save data, according to the lesson?",
            options: [
              "Reading a transcript instead of watching",
              "Turning off autoplay",
              "Choosing a lower video quality",
              "Turning on captions",
            ],
            answer_index: 3,
            explanation: "Captions help understanding but do not reduce data use.",
          },
          {
            prompt: "Why does the lesson suggest starting at the lowest video quality?",
            options: [
              "You can go up one step only if you cannot read the screen",
              "Low quality videos come with a free certificate",
              "Higher quality settings are only for paid members",
              "Course platforms block high quality video for learners in Ghana",
            ],
            answer_index: 0,
            explanation: "Most lessons are still clear at low quality; raise it only if needed.",
          },
          {
            prompt: "You must join a live class on mobile data. What does the lesson advise?",
            options: [
              "Turn your camera on for the whole class so the teacher can see that you are there",
              "Keep your camera off unless asked, close other apps, and ask about a recording",
              "Open the class in several tabs in case one drops",
              "Join from a computer on a phone hotspot instead",
            ],
            answer_index: 1,
            explanation: "Camera off, other apps closed and a recording to download on WiFi all save data.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "shared-devices-and-hubs": {
      outcomes: [
        "Keep your accounts and files private on a shared device",
        "Plan regular study time on a device you share",
        "Find places in your area with computers or WiFi",
        "Use a public computer safely and leave it clean",
      ],
      explanation_md: `Many learners share a phone with a partner, parent or child, or use a family laptop that everyone needs. Others have no computer at home at all and study at a school, library, community centre or business centre. None of this stops you from learning online. It just needs some planning and a few safety habits.

## Planning study on a shared device

* **Agree times.** Talk to the people you share with and agree on regular study times, for example two evenings a week from seven to eight. Write them down so everyone remembers.
* **Explain why.** People are more willing to give you the device when they know what you are working towards.
* **Prepare before your slot.** Know which lesson you will do, so you do not waste your time choosing.
* **Use paper for the rest.** Notes, plans and practice that do not need the device can happen any time in an exercise book.
* **Hand it back on time.** Keeping your side of the agreement makes it easier to ask again next week.

## Keeping your accounts private

On a shared device, the biggest risk is someone else opening your accounts, by accident or on purpose.

* **Sign out** of your learning platforms and email when you finish, every time.
* **Do not let the browser save your password** on a shared device. When it asks, choose "Never" or "Not now".
* **Use a separate profile** if the device allows it. Many computers let each person have their own user account, and browsers such as Chrome and Edge let you add separate profiles. Some phones also support more than one user.
* **Use a private window** (called Incognito in Chrome) for one off sessions. It does not keep your history or sign ins after you close it. It does not hide what you do from the network or the device owner, and files you download stay on the device.
* **Turn on two step verification** for your email, so a saved password alone is not enough to get in.

## Keeping your files safe

* Save your work to **cloud storage**, such as Google Drive or OneDrive, not only to the shared device. Then it is safe if someone deletes it or the device is lost.
* Use clear file names and one folder, so others do not delete your work thinking it is theirs.
* Delete private files, such as copies of your ID, from shared Downloads folders after you have used them.

## Finding a place to study

If you need a computer or WiFi, ask around in your town. Places that may help include:

* **Public libraries,** some of which have computers or WiFi for members.
* **Schools and colleges,** which sometimes let former students or community members use computer labs at set times.
* **Community centres, ICT centres and innovation hubs,** often run by local government, NGOs or young entrepreneurs.
* **Business centres,** which charge for computer time and printing.
* **Churches, mosques and workplaces,** which may allow WiFi use if you ask.

What is available changes, and it differs from town to town, so call or visit and ask: Do you have computers or WiFi for the public? Is it free or paid? What hours? Do I need to register?

## Using a public computer safely

* Never tick "remember me" or "stay signed in".
* Sign out of every account and close the browser when you finish.
* Do not save files to the desktop; use a flash drive or cloud storage, and delete any copies you made.
* Avoid logging in to MoMo or bank accounts on public computers or public WiFi.
* If the computer looks strange, for example with unknown toolbars or programs, use another one.

## Making it regular

A fixed weekly slot at a hub, plus phone study at home, is a strong combination. Many people do their reading and quizzes on a phone and save hands on practice for computer time.`,
      workedExample_md: `**Wumpini studies on the family laptop**

Wumpini, in Tamale, shares a laptop with her brother, who uses it for his own work.

1. They agree she can use it on Tuesday and Thursday evenings. She writes this on a paper by the door.
2. She adds a separate browser profile with her own name, so her bookmarks and sign ins stay apart from his.
3. When the browser offers to save her password, she chooses Never.
4. She saves her practice spreadsheets to her Google Drive, not the desktop.
5. On Saturdays, she uses the computers at a hub in town for longer practice, and asks about their WiFi rules.
6. At the end of each session she signs out of everything and closes the browser.`,
      keyTerms: [
        { term: "Browser profile", definition: "A separate space in a browser with its own bookmarks, history and sign ins." },
        { term: "Private window", definition: "A browser window that does not keep your history or sign ins after you close it; called Incognito in Chrome." },
        { term: "Hub", definition: "A local centre with computers, internet or training, often run by an NGO, government or entrepreneurs." },
        { term: "Flash drive", definition: "A small removable storage device you plug into a computer to carry files." },
      ],
      commonMistakes: [
        "Letting a shared browser save your passwords",
        "Forgetting to sign out of your email on a shared or public computer",
        "Thinking a private window hides what you do from everyone",
        "Saving your only copy of your work on a shared device",
        "Logging in to MoMo or a bank on a public computer",
      ],
      selfCheck: [
        "What should you say when a shared browser offers to save your password?",
        "What does a private window not protect you from?",
        "What four questions should you ask a hub or library?",
        "Where should you save your work so it is safe?",
      ],
      practice_task_md: `**Goal:** Make your study private and find a place to study.

**Steps**

1. If you share a device, agree and write down your study times with the people you share with.
2. Set up a separate profile or user account if the device allows it, or practise using a private window.
3. Check that your email has two step verification on.
4. List two places in your town that might have computers or WiFi. Call or visit one and ask the four questions from the lesson.

**Done looks like:** Agreed study times, a private setup on the shared device, and answers from at least one local place.`,
      quiz: {
        questions: [
          {
            prompt: "What does a private (Incognito) window NOT do, according to the lesson?",
            options: [
              "Stop your browsing history being saved after you close it",
              "Stop your sign ins being kept after you close it",
              "Let you sign in for a one off session",
              "Hide what you do from the network or the device owner",
            ],
            answer_index: 3,
            explanation: "A private window does not hide activity from the network or device owner, and downloads stay.",
          },
          {
            prompt: "On a shared device, the browser asks to save your password. What should you choose?",
            options: [
              "Save, so you can sign in faster next time",
              "Never or Not now",
              "Save, but change the password every week",
              "Save, then tell the others not to use your account",
            ],
            answer_index: 1,
            explanation: "On a shared device, a saved password lets anyone open your account.",
          },
          {
            prompt: "Where does the lesson suggest saving your work when you use a shared device?",
            options: [
              "In cloud storage such as Google Drive or OneDrive",
              "On the desktop of the shared device, where it is easy to find",
              "In the shared Downloads folder",
              "Only in the browser history",
            ],
            answer_index: 0,
            explanation: "Cloud storage keeps your work safe if the device is lost or files are deleted.",
          },
          {
            prompt: "Why should you call or visit a library or hub before relying on it?",
            options: [
              "Libraries only open on public holidays",
              "Every hub and library in Ghana charges exactly the same fixed price for computer time",
              "What is available, and the rules, differ from place to place and change",
              "Hubs only allow people with their own laptop",
            ],
            answer_index: 2,
            explanation: "Ask whether there are computers or WiFi, the cost, the hours and whether you must register.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "learning-well": {
      outcomes: [
        "Explain why watching a lesson is not the same as learning it",
        "Name study habits that help skills stay with you",
        "Test yourself instead of rereading",
      ],
      explanation_md: `Have you ever watched a whole video lesson, felt that you understood everything, and then found a day later that you could not do it yourself? That is normal. Understanding something while you watch is different from being able to remember it and use it later. The good news is that a few study habits close that gap, and they work for any subject, on any device.

## Feeling of learning versus real learning

Rereading notes and rewatching videos feel productive because the material looks familiar. But familiar is not the same as remembered. Real learning shows when you can do something **without** the lesson in front of you: answer a question from memory, build the spreadsheet from a blank page, explain the idea to a friend.

So the main rule of this section is simple: **spend less time taking things in, and more time getting things out.**

## Habits that help

Researchers who study learning have found several strategies that work well. Groups such as the Learning Scientists share them freely. You do not need the research names to use them, but here they are in plain words.

* **Test yourself.** After a lesson, close it and write or say what you remember. Then check. Pulling information out of your memory makes it stronger. This is often called retrieval practice.
* **Space it out.** Review a little over several days instead of all at once the night before a quiz. Spreading out practice helps you remember for longer.
* **Explain it.** Ask yourself "how?" and "why?" and answer in your own words, as if teaching someone.
* **Use examples.** Link each idea to a real example from your life: a market stall's records, a church group's messages, a shop's prices.
* **Mix your practice.** Once you know a few skills, practise them mixed together, not one block at a time. This trains you to choose the right one, as real work demands.
* **Words and pictures together.** Draw a simple diagram or table next to your notes. Two forms of the same idea help each other.

## Practice is the main event

For digital skills especially, doing is learning. A typing lesson is useless without typing. A spreadsheet lesson is useless without a spreadsheet. Pause the video after each step and do it yourself. Then do a small task of your own that uses it. If you cannot do a step on your device right now, write it down and do it at your next chance.

## Learning with others

You learn faster when you can ask questions, see how others solved the same problem and explain things to someone else. A study partner, a WhatsApp study group or SydCrest's community can all help. One lesson in this section is about asking questions well, so that people can actually help you. If you cannot find a group, start one. Two or three people taking the same course, each sharing one question a week, is enough.

## Fitting it into life

Adults learn around work, family, worship and community duties. Short, regular sessions fit better than long, rare ones, and they also suit spaced review. The last lesson in this section helps you plan your week and keep going when motivation drops.

## What this section covers

* **Notes and spaced review.** Short notes in your own words, and a simple way to review them over days and weeks.
* **Practice and small projects.** How to turn each lesson into practice, and how to plan a small project you can show.
* **Asking good questions in communities.** How to get useful answers quickly.
* **Fitting study around work and family.** Planning time, protecting it and recovering from missed days.

## A quick start

Try this today. After your next lesson, close it and write three things you remember, without looking. Then check what you missed. Tomorrow, before your next lesson, try to write the same three things again. That one habit, repeated, will make more difference than any expensive course.`,
      workedExample_md: `**Issahaku changes how he studies**

Issahaku, in Navrongo, watched every video of a typing and Word course twice, but froze when his cousin asked him to type a letter.

1. He stops rewatching. After each lesson he closes the app and writes the steps from memory, then checks.
2. He pauses each video after every step and does it on the computer at the hub.
3. Instead of studying three hours on Saturday only, he does thirty minutes on four days, starting each session by recalling the last one.
4. He explains each new feature to his cousin in his own words.
5. After two weeks, he types and formats a one page letter without opening the course.`,
      keyTerms: [
        { term: "Retrieval practice", definition: "Testing yourself by bringing information back from memory, which makes it stronger." },
        { term: "Spaced practice", definition: "Reviewing a little over several days instead of all at once." },
        { term: "Interleaving", definition: "Mixing different skills in one practice session so you learn when to use each." },
        { term: "Study group", definition: "A few learners who meet in person or online to ask questions and practise together." },
      ],
      commonMistakes: [
        "Rewatching videos and rereading notes instead of testing yourself",
        "Studying for many hours once a week instead of a little often",
        "Watching a skill being done without ever trying it yourself",
        "Studying alone and never asking anyone for help",
      ],
      selfCheck: [
        "Why can a lesson feel learned when it is not?",
        "What does it mean to test yourself?",
        "Why is spacing out your review better than cramming?",
        "What will you do straight after your next lesson?",
      ],
      practice_task_md: `**Goal:** Try retrieval practice on your own course.

**Steps**

1. Study one lesson of your chosen course as usual.
2. Close it and write down three things you remember, in your own words, without looking.
3. Open the lesson again and check. Mark anything you missed or got wrong.
4. The next day, before your next lesson, write the same three things again from memory.
5. Write one sentence about which day was easier, and why.

**Done looks like:** Two short memory checks a day apart, with corrections, and one sentence of reflection.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main rule of this section?",
            options: [
              "Spend less time taking things in and more time getting things out",
              "Watch each video at least twice, slowly, before moving on to the next one",
              "Study only when you feel motivated",
              "Copy the lesson notes out word for word",
            ],
            answer_index: 0,
            explanation: "Real learning shows when you can recall and do something without the lesson.",
          },
          {
            prompt: "What is retrieval practice?",
            options: [
              "Downloading lessons on WiFi so you can watch them again later offline",
              "Rewatching a video until it feels familiar",
              "Reading your notes aloud several times",
              "Testing yourself by bringing information back from memory",
            ],
            answer_index: 3,
            explanation: "Pulling information out of memory makes it stronger.",
          },
          {
            prompt: "Issahaku switched from one long Saturday session to short sessions on four days. Which habit is that?",
            options: [
              "Mixing different skills together",
              "Spacing out practice",
              "Using words and pictures together",
              "Taking notes in your own words",
            ],
            answer_index: 1,
            explanation: "Spreading study over several days is spaced practice.",
          },
          {
            prompt: "According to the lesson, why does rereading notes feel productive even when it is not?",
            options: [
              "Because notes are always written by experts",
              "Because rereading notes is exactly the same as retrieval practice, only quieter",
              "Because the material looks familiar, which is not the same as remembered",
              "Because rereading uses less data than a video",
            ],
            answer_index: 2,
            explanation: "Familiarity feels like learning, but recall is the real test.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "notes-and-spaced-review": {
      outcomes: [
        "Take short notes in your own words during a lesson",
        "Turn notes into questions you can test yourself on",
        "Plan a spaced review timetable for a course",
      ],
      explanation_md: `Good notes are not a copy of the lesson. They are a short record, in your own words, that you can use to test yourself later. Combined with spaced review, a little review spread over days and weeks, they help you remember what you learned long after the course ends. This matters at work: nobody wants to hire someone who finished a spreadsheet course last month and has already forgotten how to add up a column.

## Taking notes that help

* **Pause, then write.** Watch or read a short part, pause, and write what it meant in your own words. If you write while watching, you end up copying.
* **Keep it short.** A few lines per lesson. Key steps, key words, one example.
* **Use your own examples.** "SUM adds a column, like totalling a week of kiosk sales" sticks better than a definition copied from the screen.
* **Draw when it helps.** A small table, an arrow diagram or a sketch of a screen can say more than a paragraph.
* **Note what confused you.** Mark it with a question mark. These become questions for your study group.

Paper notebook or notes app? Both work. Paper uses no battery or data and helps many people remember. A notes app is searchable and backed up. Choose one and keep all your course notes in one place.

## Turn notes into questions

This is the step most people skip, and it is the one that makes the biggest difference. After each lesson, write two or three questions that your notes answer. For example:

* "What does the SUM function do, and how do you write it?"
* "How do you freeze the top row in a spreadsheet?"
* "What is the difference between Save and Save As?"

Write the questions on one side of a page and the answers on the other, or in a separate list. Later you will cover the answers and test yourself.

## Spaced review

Your memory of a new lesson fades quickly at first, then more slowly. Each time you successfully recall it, it fades more slowly next time. So instead of reviewing everything every day, you review each lesson at growing gaps.

A simple timetable that works:

| When | What you do |
|:---|:---|
| Same day | Write notes and questions |
| Next day | Answer the questions from memory, then check |
| About three days later | Answer them again |
| About a week later | Answer them again |
| About a month later | One final check |

You do not need to follow the days exactly. The idea is that the gaps grow. If you get a question wrong, go back to a shorter gap for that one.

## Making it practical

* **Start each study session with five minutes of review.** Answer a few questions from earlier lessons before starting a new one.
* **Use flashcards if you like them.** Paper cards, or a free flashcard app. Question on one side, answer on the other.
* **Mark what you know.** Put a tick next to questions you answered easily and a dot next to ones you struggled with. Review the dotted ones more often.
* **Review on light data.** Notes and questions need no data at all, so this is ideal offline or bus time study.

## Review the doing, not just the facts

For practical skills, a review question can be a small task. "Make a three column table and total the last column" is a better review than "what is a total?" Keep a few small tasks in your question list and do them when you have the device.

## When the course ends

Keep your notes. Before a job interview or test, your questions are a ready made revision guide. Many people find, months later, that their own notes are clearer to them than the original course.`,
      workedExample_md: `**Mariama reviews her spreadsheet lessons**

Mariama, in Tamale, is on week two of a spreadsheet course.

1. After Monday's lesson on formulas, she pauses the video and writes four lines in her exercise book, using her kiosk as the example.
2. She writes three questions on the right hand page, such as "How do I add up a column of sales?"
3. On Tuesday, before the next lesson, she covers the answers and tries all three. She gets two right and puts a dot next to the third.
4. On Thursday and the following Monday she tries them again. The dotted question now comes easily.
5. At the end of the month, she answers all her questions in one sitting and builds a real sales total for her kiosk without looking at the course.`,
      keyTerms: [
        { term: "Spaced review", definition: "Reviewing what you learned at growing gaps, such as one day, three days, a week and a month." },
        { term: "Flashcard", definition: "A card or screen with a question on one side and the answer on the other." },
        { term: "Recall", definition: "Bringing something back from memory without looking it up." },
        { term: "Review question", definition: "A question or small task, written from your notes, that you use to test yourself later." },
      ],
      commonMistakes: [
        "Copying the lesson word for word instead of using your own words",
        "Writing notes but never testing yourself on them",
        "Reviewing everything every day instead of growing the gaps",
        "Spreading notes across many apps, papers and chats",
        "Throwing notes away when the course ends",
      ],
      selfCheck: [
        "Why should you pause before writing notes?",
        "How do you turn notes into questions?",
        "What does a simple spaced review timetable look like?",
        "What should you do with a question you got wrong?",
      ],
      practice_task_md: `**Goal:** Start a spaced review system for your course.

**Steps**

1. Take notes on your next lesson in your own words: key steps, key words and one example from your life.
2. Write three questions your notes answer, including at least one small practical task.
3. Draw the review timetable from the lesson in your notebook or notes app, and write the dates for this lesson.
4. Tomorrow, answer the questions from memory, check them, and mark each with a tick or a dot.

**Done looks like:** One page of notes, three questions, a dated review timetable and your first review done and marked.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say to pause before writing notes?",
            options: [
              "Writing while watching tends to turn into copying",
              "Pausing saves data on most video platforms",
              "Teachers require notes to be written after the video ends",
              "Notes written later are always longer and more complete",
            ],
            answer_index: 0,
            explanation: "Pausing lets you write the meaning in your own words instead of copying.",
          },
          {
            prompt: "In spaced review, what should happen to the gaps between reviews?",
            options: [
              "They should stay at exactly one day each",
              "They should shrink steadily as the date of the quiz gets closer",
              "They should grow longer each time you recall correctly",
              "They should be decided at random each week",
            ],
            answer_index: 2,
            explanation: "Each successful recall lets you wait longer before the next review.",
          },
          {
            prompt: "You get a review question wrong. What does the lesson suggest?",
            options: [
              "Delete the question so it stops worrying you",
              "Go back to a shorter gap for that question",
              "Start the whole course again from the beginning",
              "Wait a month before trying it again",
            ],
            answer_index: 1,
            explanation: "A wrong answer means that question needs reviewing sooner.",
          },
          {
            prompt: "For a practical skill, which review question does the lesson prefer?",
            options: [
              "What is the definition of a total?",
              "Which of the course videos explained totals in the clearest way?",
              "How long was the lesson about totals?",
              "Make a three column table and total the last column",
            ],
            answer_index: 3,
            explanation: "For practical skills, a small task is a better review than a definition.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "practice-and-projects": {
      outcomes: [
        "Practise each new step straight after you learn it",
        "Plan a small project linked to your goal",
        "Finish and present a project you can show",
        "Use mistakes as part of learning",
      ],
      explanation_md: `You cannot learn to ride a bicycle by watching videos of cyclists, and you cannot learn digital skills only by watching lessons. Practice is where the skill moves from the screen into your hands. Projects take it further: they make you combine several skills to finish something real, and they give you something to show an employer, a client or a mentor.

## Practise straight away

The best time to practise a step is immediately after you see it.

* **Pause and copy.** After each step in a video, pause and do the same thing on your own device.
* **Then change it.** Do it again with something slightly different: your own data, your own words, your own picture.
* **Then do it without help.** Close the lesson and repeat the step from memory.

Three short rounds like this teach more than watching the whole lesson twice.

If you study on a phone and the course needs a computer, write down the steps during phone study and do them at your next computer session. Practise anything you can on the phone in the meantime.

## Why projects matter

A project is a small piece of real work with a clear result. It matters for three reasons.

1. **It joins skills together.** A course teaches skills one at a time; real work needs them together.
2. **It shows you what you do not know.** Gaps appear quickly when you try to finish something real.
3. **It is proof.** A finished project is something you can show. It says "I can do this" more clearly than any certificate.

## Choosing a good first project

A good first project is:

* **Small.** Something you can finish in one to three weeks.
* **Real.** For a real person or need, even a small one: your family, a shop, a church group, a youth association.
* **Linked to your goal.** It uses the skills your course is teaching.
* **Showable.** It ends in a file, a page or a result you can share.

Examples:

* **Spreadsheets:** a stock and sales record for a relative's provisions shop, with totals for each week.
* **Documents:** a one page price list and a letter for a local tailor, formatted neatly and saved as PDF.
* **Digital marketing:** a two week posting plan for a chop bar's WhatsApp status, with photos and short captions.
* **Web:** a simple one page website for a youth group, made with free tools.
* **Typing:** a typed copy of a handwritten community notice, with your speed measured before and after.

## Planning the project

Write a short plan before you start:

1. **Who is it for, and what do they need?**
2. **What will the finished result be?**
3. **Which skills from the course will you use?**
4. **What are the steps, and roughly when will you do each?**
5. **How will you know it is done?**

Keep it to half a page. Then start.

## Mistakes are part of the work

You will get stuck, make errors and redo parts. That is not failure; it is how practice works. When something goes wrong, write down what happened and what fixed it. Over time, this list becomes one of your most useful learning tools, and it gives you real stories to tell in an interview.

## Finishing and presenting

A project that is ninety percent done is hard to show. Aim to finish, even if it is not perfect. Then:

* **Show it to the person it was for** and ask for one thing that works and one thing to improve.
* **Make the improvement.**
* **Save it with a clear name** in a "Projects" folder, with a short note: who it was for, what you did, which skills you used.
* **Pair it with a certificate** if you earned one for the same skill.

One small finished project is worth more than three big unfinished ones.`,
      workedExample_md: `**Abdul-Rahman builds a stock record**

Abdul-Rahman, in Bolgatanga, is learning spreadsheets for a stores assistant job.

1. **Plan:** His uncle sells building materials and keeps stock in a notebook. Abdul-Rahman plans a spreadsheet with item, quantity in, quantity out and quantity left, finished in two weeks.
2. **Practice:** After each course lesson, he pauses and repeats every step on his uncle's data, not the course's sample data.
3. **Stuck:** His totals are wrong because some numbers were typed as text. He searches the error, fixes it and writes it in his "problems and fixes" list.
4. **Feedback:** His uncle says the sheet is useful but asks for the date of each delivery. Abdul-Rahman adds a date column.
5. **Proof:** He saves the file in his "Projects" folder with a short note and mentions it in his next application.`,
      keyTerms: [
        { term: "Project", definition: "A small piece of real work with a clear finished result." },
        { term: "Feedback", definition: "Comments from another person on what works in your work and what could be better." },
        { term: "Problems and fixes list", definition: "A record of errors you met and how you solved them." },
        { term: "Sample data", definition: "Example information a course gives you to practise with, instead of real information." },
      ],
      commonMistakes: [
        "Watching every lesson first and planning to practise later",
        "Only ever using the course's sample data",
        "Choosing a first project that is far too big to finish",
        "Leaving a project ninety percent done",
        "Hiding mistakes instead of writing down how you fixed them",
      ],
      selfCheck: [
        "What are the three short rounds of practice after a new step?",
        "Name the four qualities of a good first project.",
        "What five questions should a project plan answer?",
        "What should you do once a project is finished?",
      ],
      practice_task_md: `**Goal:** Plan a small project linked to your learning goal.

**Steps**

1. Think of a real person or group near you who could use the skill you are learning.
2. Write a half page plan answering the five questions from the lesson.
3. Start a "problems and fixes" list on a new page.
4. Do the first step of the project this week, using real information rather than sample data.

**Done looks like:** A half page project plan, a started problems and fixes list, and the first step of the project done.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, when is the best time to practise a new step?",
            options: [
              "After you have finished the whole course",
              "Only on the day before a test",
              "Immediately after you see it in the lesson",
              "Once you have watched the video at least twice",
            ],
            answer_index: 2,
            explanation: "Pause and do each step straight after you see it.",
          },
          {
            prompt: "Which is the best first project for someone learning spreadsheets?",
            options: [
              "A full accounting system for a large company",
              "Rewatching every spreadsheet lesson on the course",
              "A stock and sales record for a relative's shop, finished in two weeks",
              "Copying the course's sample sheet exactly as it is shown in the video lesson",
            ],
            answer_index: 2,
            explanation: "A good first project is small, real, linked to your goal and showable.",
          },
          {
            prompt: "What should you do when something goes wrong in your project?",
            options: [
              "Start a completely new project instead",
              "Write down what happened and what fixed it",
              "Hide the mistake so nobody sees it",
              "Stop practising until the course explains it",
            ],
            answer_index: 1,
            explanation: "A problems and fixes list turns mistakes into learning and interview stories.",
          },
          {
            prompt: "Why does the lesson say one small finished project beats three big unfinished ones?",
            options: [
              "A finished project can be shown, while an almost finished one is hard to show",
              "Employers only accept projects that took under a week",
              "Big projects are not allowed on most course platforms",
              "Unfinished projects are automatically deleted by cloud storage after a few weeks",
            ],
            answer_index: 0,
            explanation: "A finished result is proof; ninety percent done is hard to present.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "asking-good-questions": {
      outcomes: [
        "Try to solve a problem yourself before asking",
        "Write a question with what you tried, what happened and what you expected",
        "Choose the right place to ask",
        "Follow up and thank people who help",
      ],
      explanation_md: `Everyone who learns online gets stuck. The people who move fastest are not the ones who never get stuck; they are the ones who ask good questions. A clear question gets a quick, useful answer. A vague one, such as "it is not working, please help", often gets no answer at all, or a string of questions back. Asking well is also a work skill: managers and colleagues appreciate people who explain a problem clearly.

## Try first

Before you ask, spend a few minutes trying to solve it yourself.

* **Read the error message** slowly. It often says what is wrong.
* **Go back** to the step in the lesson where it last worked and repeat it carefully.
* **Search** for the exact error message or your question in a few key words.
* **Check the course's help, forum or FAQ.** Someone may have asked already.
* **Take a short break.** Sometimes the answer comes after ten minutes away from the screen.

Even if you do not solve it, you now know more, and your question will be better.

## The three part question

A good question answers three things:

1. **What I am trying to do.** "I am trying to add up a column of sales in Google Sheets."
2. **What I tried and what happened.** "I typed =SUM(B2:B10) and pressed enter. The cell shows 0 instead of the total."
3. **What I expected.** "I expected it to show 450, the total of the numbers in the column."

Then add useful details: the device and app you are using, the lesson you are on, and a **screenshot** if it helps. A screenshot shows exactly what you see. Before sending one, check it does not show private information such as your phone number, email or MoMo balance, and crop it if needed.

Put together, it reads like this:

> Hello, I am on lesson 4 of the spreadsheet course, using Google Sheets on my phone. I am trying to total the sales in column B. I typed =SUM(B2:B10) and pressed enter, but it shows 0 instead of 450. I have checked the formula against the video. Screenshot attached. Does anyone know what I am missing?

Someone who knows the answer can help in one reply.

## Choosing where to ask

* **The course's own forum or discussion board,** for questions about that course. Others on the same lesson may answer.
* **A study group** on WhatsApp or another messaging app, for quick help from people you know.
* **The SydCrest community,** for questions about your learning plan and next steps.
* **A mentor or teacher,** for bigger questions, after you have tried the other places.

Ask in one place at a time. Posting the same question in five groups at once annoys people. If no one answers after a day or two, try another place and mention that you asked before.

## Good manners in learning communities

* **Greet and be polite,** and keep it short.
* **Ask in the group's language,** usually English for course forums.
* **Do not ask people to do your assignment for you.** Ask for help understanding it.
* **Do not send voice notes** in busy groups unless people use them; text is easier to search and read.
* **Respect people's time.** Avoid late night messages to individuals.
* **Keep it on topic.** Learning groups work best when messages stay about learning, so avoid forwarding chain messages or adverts.

## After you get an answer

* **Try it, then reply.** Say whether it worked.
* **Say thank you.** It makes people happy to help again.
* **Share the fix** if you solved it yourself, so the next person can find it.
* **Write it in your notes** or problems and fixes list.

## Answer other people too

Once you know a little, help others. Explaining something is one of the best ways to understand it better. You do not need to be an expert to help someone who is one lesson behind you.`,
      workedExample_md: `**Hawa asks a better question**

Hawa, in Nalerigu, is stuck on a lesson about attaching files in email. Her first message to her study group says: "Please the attachment is not working."

Nobody replies. She tries again, following the lesson.

1. **Try first:** She rereads the lesson and searches the error message she sees: "file too large".
2. **Rewrite:** "Hello, I am on the email lesson using Gmail on my phone. I am trying to attach a 30 MB video to an email. When I tap send, it says the file is too large. I expected it to send like my CV did. What should I do?"
3. **Screenshot:** She crops it so her contacts do not show.
4. Within an hour, a group member explains that large files need to be shared as a link from cloud storage.
5. She tries it, replies "It worked, thank you", and adds the fix to her notes.`,
      keyTerms: [
        { term: "Error message", definition: "Words shown by an app or website when something goes wrong, often explaining the problem." },
        { term: "Screenshot", definition: "A picture of what is on your screen, useful for showing a problem." },
        { term: "Forum", definition: "An online discussion board where learners post questions and answers." },
        { term: "FAQ", definition: "Frequently asked questions: a page answering the questions people ask most." },
      ],
      commonMistakes: [
        "Asking before trying anything yourself",
        "Writing it is not working without saying what you tried",
        "Sending a screenshot that shows private information",
        "Posting the same question in many groups at once",
        "Never replying to say whether the answer worked",
      ],
      selfCheck: [
        "What should you try before asking a question?",
        "What are the three parts of a good question?",
        "What should you check before sending a screenshot?",
        "What should you do after someone answers you?",
      ],
      practice_task_md: `**Goal:** Write and send one good question.

**Steps**

1. Think of a real problem or confusing point in your current course. If you have none, use one from your notes marked with a question mark.
2. Spend five minutes trying to solve it: reread, search and check the course help.
3. Write your question in three parts: what you are trying to do, what you tried and what happened, and what you expected. Add your device, app and lesson.
4. If useful, add a screenshot with private details cropped out.
5. Post it in one suitable place. When you get an answer, try it, reply and say thank you.

**Done looks like:** One three part question posted, and a reply or thank you message once someone answers.`,
      quiz: {
        questions: [
          {
            prompt: "What are the three parts of a good question, according to the lesson?",
            options: [
              "Your name, your town and your phone number",
              "What you are trying to do, what you tried and what happened, and what you expected",
              "The course price, the teacher's name and the date",
              "A greeting, a long voice note and a screenshot of your whole screen with everything showing",
            ],
            answer_index: 1,
            explanation: "These three parts let a helper understand the problem in one reading.",
          },
          {
            prompt: "What should you check before sending a screenshot to a group?",
            options: [
              "That it does not show private details such as your number or balance",
              "That it is in colour and not black and white",
              "That it was taken on a computer rather than a phone",
              "That it shows the full page, including your notifications and the time",
            ],
            answer_index: 0,
            explanation: "Crop out private information before sharing a screenshot.",
          },
          {
            prompt: "No one answers your question in a study group for two days. What does the lesson suggest?",
            options: [
              "Post it in five groups at once",
              "Send private messages to every member late at night",
              "Give up and skip that lesson",
              "Try another place and mention you asked before",
            ],
            answer_index: 3,
            explanation: "Ask in one place at a time, then move on politely if needed.",
          },
          {
            prompt: "Why does the lesson encourage you to answer other learners' questions?",
            options: [
              "Groups remove members who never answer",
              "You earn a free certificate for every answer you give in a group",
              "Explaining something helps you understand it better",
              "It means you can skip your own review sessions",
            ],
            answer_index: 2,
            explanation: "Teaching others is one of the best ways to learn.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "time-and-motivation": {
      outcomes: [
        "Find regular study times in a busy week",
        "Protect your study time from interruptions",
        "Plan for missed days and get back on track",
        "Keep motivated by tracking progress",
      ],
      explanation_md: `Most adults who stop an online course do not stop because it is too hard. They stop because life gets busy: extra shifts, a sick child, a funeral, farming season, a family event. Then a missed week becomes a missed month. Planning your time and motivation is as much a part of learning online as the lessons themselves.

## Find your real time

Start with an honest look at a normal week.

* Write down your fixed commitments: work hours, travel, prayer times, family duties, market days.
* Look for gaps: an early morning before others wake, a lunch break, the evening after children sleep, a quiet Sunday afternoon.
* Note where you can get WiFi or a computer, and when.

Also notice where time leaks away, for example an hour of scrolling after dinner. Swapping half of that for study is often the easiest win.

Many people find more time than they expected, but in small pieces. That is fine. Short, regular sessions work very well for learning, especially with spaced review.

## Choose fixed study slots

Pick two to four slots a week and treat them like appointments. For example:

* Monday and Wednesday, 8.30 to 9.00 pm: lesson and practice on the phone.
* Saturday, 9 to 10 am: download next week's lessons on WiFi and do a longer practice.

Put the slots in your phone's calendar with a reminder, or write them where you will see them. A plan you can see is a plan you are more likely to follow.

If you are not sure how much you can manage, start small: two thirty minute sessions a week. You can add more once the habit is steady.

## Protect the time

* **Tell the people around you.** "From eight thirty I am studying for half an hour." Most people will respect it, especially if they know why.
* **Silence notifications** or put your phone on do not disturb, except for calls you must take.
* **Have everything ready:** charged device, downloaded lesson, notebook and pen.
* **Start with something easy,** such as five minutes of review, so beginning does not feel heavy.

## Plan for missed days

You will miss sessions. Everyone does. What matters is what happens next.

* **Never miss twice.** If you miss Monday, make sure you do Wednesday, even if only for ten minutes.
* **Have a short version.** On a bad day, do the minimum: answer three review questions, or watch one short lesson. It keeps the habit alive.
* **Use catch up slots.** Keep one flexible slot a week for anything you missed.
* **Adjust, do not quit.** If a busy season is coming, such as harvest or exams for your children, plan fewer sessions for those weeks and write the new finish date on your goal.

## Keep motivation going

Motivation rises and falls. Do not wait for it; let routine carry you on low days.

* **Track progress you can see.** Tick each finished session on a calendar or in a table. A row of ticks is encouraging, and you will not want to break it.
* **Remember your why.** Keep the reason you wrote at the start of this track where you will see it.
* **Celebrate small wins:** a finished module, a first formula that works, a project shown to someone.
* **Learn with someone.** A study partner who checks in weekly makes it much harder to drift away. The SydCrest community is a good place to find one.
* **Look back.** Every few weeks, compare what you can do now with what you could do at the start.

## Rest counts too

Study after a long day can feel impossible. Sleep and rest help memory, so a well rested short session beats a tired long one. If you are exhausted, do the short version and go to bed. Your health and your family come first, and a plan that respects them is a plan you can keep.`,
      workedExample_md: `**Amina fits study around family and work**

Amina, in Walewale, has two young children and sells food at the market four days a week.

1. **Real time:** She notices she is free most evenings after nine, and on Sunday afternoons when her sister visits.
2. **Slots:** Tuesday and Thursday, 9.15 to 9.45 pm, and Sunday 3 to 4 pm. She sets phone reminders.
3. **Protect:** She tells her husband the plan and puts her phone on do not disturb during the slots.
4. **Missed day:** One Thursday her child is ill. On Friday she does the short version, three review questions in ten minutes, and catches up on Sunday.
5. **Motivation:** She ticks each session in her notebook. After four weeks she has a page full of ticks and has finished her first module.`,
      keyTerms: [
        { term: "Study slot", definition: "A fixed time in your week set aside for learning, treated like an appointment." },
        { term: "Short version", definition: "A minimum session for bad days, such as ten minutes of review, that keeps the habit going." },
        { term: "Catch up slot", definition: "A flexible time each week for sessions you missed." },
        { term: "Do not disturb", definition: "A phone setting that silences notifications for a while." },
      ],
      commonMistakes: [
        "Waiting to feel motivated before studying",
        "Planning long sessions that never fit into real life",
        "Missing one session and then missing many more",
        "Keeping the study plan secret from the people you live with",
        "Studying when exhausted instead of doing a short version and resting",
      ],
      selfCheck: [
        "Where are the gaps in your normal week?",
        "What does never miss twice mean?",
        "What is your short version for a bad day?",
        "How will you track your progress so you can see it?",
      ],
      practice_task_md: `**Goal:** Set your study slots and a plan for bad days.

**Steps**

1. Write your fixed commitments for a normal week, then mark the gaps.
2. Choose two to four study slots and put them in your phone's calendar or on paper where you will see them.
3. Write your short version for bad days in one line.
4. Choose one catch up slot.
5. Tell one person in your home or a study partner about your plan.

**Done looks like:** Study slots with reminders, a one line short version, a catch up slot, and one person who knows your plan.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, why do most adults stop an online course?",
            options: [
              "The course content is far too difficult for most adult learners",
              "Life gets busy and a missed week becomes a missed month",
              "They finish the course earlier than expected",
              "Their certificate arrives before the end of the course",
            ],
            answer_index: 1,
            explanation: "The lesson says busy life, not difficulty, is the usual reason.",
          },
          {
            prompt: "What does \"never miss twice\" mean?",
            options: [
              "Study twice as long after a missed session",
              "Repeat each lesson two times before moving on",
              "If you miss one session, make sure you do the next one",
              "Only allow yourself two missed sessions in the whole course",
            ],
            answer_index: 2,
            explanation: "One missed session is normal; two in a row starts a drift.",
          },
          {
            prompt: "A busy season such as harvest is coming. What does the lesson suggest?",
            options: [
              "Plan fewer sessions for those weeks and move your finish date",
              "Stop the course and start again next year",
              "Study late every single night so you keep the original finish date",
              "Pay for a faster course so you finish before harvest",
            ],
            answer_index: 0,
            explanation: "Adjust the plan instead of quitting.",
          },
          {
            prompt: "Which habit does the lesson suggest for keeping motivation on low days?",
            options: [
              "Wait until you feel motivated, then study for many hours",
              "Keep your study plan secret so nobody asks about it",
              "Change to a new course whenever you feel bored",
              "Let routine carry you, and tick each finished session",
            ],
            answer_index: 3,
            explanation: "Routine and visible progress keep you going when motivation drops.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "stay-safe-and-start": {
      outcomes: [
        "Explain why learners are targeted by scams",
        "Name the main risks to your money and accounts while learning",
        "Describe what your four week plan will contain",
      ],
      explanation_md: `People who want to learn are hopeful, often short of money and keen to find a job quickly. Sadly, that makes them a target. Some sellers offer "guaranteed job" courses for large fees, resell free lessons as paid ones, or sell certificates that mean nothing. Others try to take over learning accounts to steal personal details. This final section helps you protect your money, your time and your accounts, and then puts everything from this track together into a plan you start straight away.

## Why learners are targeted

Scammers look for people who are in a hurry and hoping for something. A learner who badly wants a job is more likely to believe "pay today, start work next month". A learner new to online platforms may not know that the course they are being sold is free on the official site. And a learner who has never earned a real certificate may not know what one looks like.

Knowing this is already protection. When an offer makes you feel rushed, excited and afraid of missing out all at once, that is the moment to slow down.

## The main risks

* **Fake courses.** A course that does not exist, or takes your fee and disappears.
* **Overpriced courses.** A real but poor course sold for far more than it is worth, often made from free videos.
* **Certificate scams.** "Certificates" sold without any learning, fake accreditation, or fees to "unlock" a certificate from a free course that never arrives.
* **Account theft.** Fake sign in pages and messages that steal your password, then your email, your progress and your certificates.
* **Data and money tricks.** Requests for MoMo payments to personal numbers, ID card photos or verification codes.

The next two lessons go through these in detail, with simple checks you can use every time.

## Safety habits that cover most risks

* **Go to official sites yourself.** Type the address or use a bookmark you saved, rather than tapping a link in a message.
* **Never pay a person** for something that should be paid on an official site, and never pay to receive something that is free.
* **Never share a verification code** or your password, whoever asks.
* **Take your time.** Real opportunities can wait a day while you check.
* **Ask someone you trust:** a mentor, a study group, or the SydCrest community.

## Then get started

Learning about safety is the second part of this section. The final lesson is a practical: you write a four week learning plan and complete its first session before you finish. It brings together:

* **Your goal** from the "Setting a learning goal" lesson.
* **Your course** from "Choosing a course worth your time".
* **Your study slots** and short version from "Fitting study around work and family".
* **Your data plan** from the limited data section.
* **Your notes and review timetable.**
* **A small project** linked to your goal.
* **The certificate** you plan to earn, if any, and where you will save it.

By the end, you will not just know how to learn online. You will be doing it, with a plan for the next four weeks and an idea of which SydCrest track to take next.

## Look back before you move on

Open your "My learning" page. You should already have your four lines from the first lesson, a goal, a chosen course, a list of accounts, a certificates folder, a data plan and study slots. If anything is missing, go back to that lesson now. The final plan is much easier when the pieces are ready.

## When something goes wrong

If you are scammed, it is not because you are foolish; these tricks are designed to work on careful people too. Act quickly: change your passwords, contact your mobile money provider if money was sent, report fake pages to the platform being copied, and tell others in your community so they are warned.`,
      workedExample_md: `**Fuseini pauses before paying**

Fuseini, in Wa, receives a WhatsApp message: "Google Digital Skills Certificate. Only 200 cedis today. Guaranteed job after. Pay to this MoMo number to register."

1. **Rushed?** "Today only" and "guaranteed job" make him feel rushed. He slows down.
2. **Official?** He types the Grow with Google address himself and finds its beginner training is listed there, with no MoMo payment to a person.
3. **Pay a person?** The number belongs to an individual, not a company.
4. **Ask:** He posts in his study group. Two members have seen the same message and call it a scam.

He does not pay, blocks the sender and warns his church youth group.`,
      keyTerms: [
        { term: "Scam", definition: "A trick to take your money, data or account by lying to you." },
        { term: "Accreditation", definition: "Official approval of a course or institution by a recognised body. Fake accreditation is a common trick." },
        { term: "Fake sign in page", definition: "A page made to look like a real login page so it can steal your password." },
        { term: "Verification code", definition: "A short code sent by text or email to prove it is you. Never share it." },
      ],
      commonMistakes: [
        "Believing a course that guarantees a job",
        "Paying a personal MoMo number for a course",
        "Tapping links in messages instead of going to the official site yourself",
        "Feeling too embarrassed to report a scam",
      ],
      selfCheck: [
        "Why are learners a target for scams?",
        "What feeling should make you slow down?",
        "Name three safety habits that cover most risks.",
        "What pieces will your four week plan bring together?",
      ],
      practice_task_md: `**Goal:** Check your safety habits and gather the pieces of your plan.

**Steps**

1. On your "My learning" page, write the five safety habits from the lesson in your own words.
2. Check that you have each piece for your four week plan: goal, course, study slots and short version, data plan, notes and review timetable, project idea, certificate plan.
3. For any missing piece, go back to that lesson and complete its practice task.
4. Bookmark the official sites of the platforms you use, so you never need links from messages.

**Done looks like:** Five safety habits in your own words, every plan piece ready, and bookmarks for your official learning sites.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, when should you slow down before acting on an offer?",
            options: [
              "When it comes from a well known university website you typed yourself",
              "When it is a free course on a platform you already use",
              "When you feel rushed, excited and afraid of missing out all at once",
              "When a study partner recommends a course they finished",
            ],
            answer_index: 2,
            explanation: "That rush of feelings is what scams are designed to create.",
          },
          {
            prompt: "Which is an example of a certificate scam?",
            options: [
              "A free freeCodeCamp certification earned by building projects",
              "A fee to unlock a certificate from a free course that never arrives",
              "A Microsoft Learn badge for finishing a module",
              "A completion certificate from a free GCFGlobal series",
            ],
            answer_index: 1,
            explanation: "Paying to unlock something that never comes is a common certificate scam.",
          },
          {
            prompt: "How does the lesson say you should open a learning site?",
            options: [
              "Type the address yourself or use a bookmark you saved",
              "Tap the link in any message that mentions the course",
              "Use whatever link a seller sends on WhatsApp",
              "Search for an advert and click the first result",
            ],
            answer_index: 0,
            explanation: "Going to official sites yourself avoids fake pages and links.",
          },
          {
            prompt: "If you are scammed, what does the lesson suggest?",
            options: [
              "Keep it quiet and say nothing to anyone, since it was your own fault for paying",
              "Pay the scammer again to get your first payment back",
              "Wait a few months to see if the course appears",
              "Change passwords, contact your MoMo provider, report it and warn others",
            ],
            answer_index: 3,
            explanation: "Quick action limits the damage and protects others.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "fake-courses-and-scams": {
      outcomes: [
        "Spot the warning signs of fake and overpriced courses",
        "Recognise certificate scams and fake accreditation",
        "Check a course or seller before paying",
        "Report a scam and warn others",
      ],
      explanation_md: `Most online courses are honest. But as more people in Ghana look for digital skills, more fake and overpriced offers appear on WhatsApp, Facebook, TikTok and in text messages. They promise fast jobs, famous certificates and big earnings, and they cost real money that families need. Knowing the warning signs protects you and the people around you.

## Warning signs of a fake or overpriced course

* **Guaranteed jobs or income.** No honest course can guarantee you a job or a monthly income. Phrases like "guaranteed job after training" or "earn from your phone in two weeks" are red flags.
* **Pressure to pay now.** "Only three places left!", "Price goes up tonight!" Real courses can wait while you check.
* **Payment to a personal number.** Real organisations usually take payments through an official website, a company account or a registered merchant name, not an individual's MoMo number.
* **Using big names without permission.** Some sellers put Google, Microsoft or a university logo on their posters. Check on the official site whether the course really belongs to them.
* **No clear syllabus or teacher.** If they cannot tell you what you will learn, who teaches it and how long it takes, be careful.
* **Free content resold.** Some paid "courses" are just free YouTube videos or free platform lessons collected together. Search the course title or some lesson names to see if they are free elsewhere.
* **Only perfect reviews, only on their own page.** Look for independent opinions from people you can actually contact.
* **Requests for personal documents** such as your Ghana Card before you have even seen the course.

## Certificate scams

Certificates attract their own tricks.

* **Certificates for sale.** "Get a certificate without the exam." A certificate you did not earn is worthless, and using it to apply for a job is dishonest.
* **Fake accreditation.** Claims that a course is "internationally accredited" or "government approved" with no way to check. Ask who accredited it, then look up that body yourself.
* **Pay to unlock.** Messages saying your certificate from a free course is ready, but you must pay a fee to someone to receive it. Real platforms show any certificate fee on their own site.
* **Fake verification pages.** A certificate with a link to a website that looks official but is not. Check the web address carefully.
* **Fake exam agents.** People who offer to book or pass an official exam for you. Real exams are booked through the issuer's official site.

## Checking before you pay

Use this checklist every time:

1. **Search the name** of the course or seller with words like "review" or "scam".
2. **Find the official site yourself** and check whether the course, price and certificate appear there.
3. **Ask who teaches it,** what the syllabus is, and whether a free first lesson or refund policy exists.
4. **Check the payment route.** Is it an official site or registered business, or a personal number?
5. **Ask someone you trust:** your study group, a mentor or the SydCrest community.
6. **Sleep on it.** If the offer disappears overnight, it was not a real opportunity.

If you cannot answer these questions, do not pay. Remember too that a high price does not mean high quality. Some of the best training in this track is free.

## If you have already paid

* Stop all further payments, even if they promise a refund after "one more fee".
* Contact your mobile money provider through its official number straight away and explain what happened.
* Keep screenshots of messages, numbers and receipts.
* Report the fake page or account to the platform it appears on.
* You can report cybercrime to Ghana's Cyber Security Authority; its official website has a page for reporting incidents.
* Warn your community, so others do not fall for the same trick.

Being scammed is upsetting, but acting quickly can limit the damage, and warning others turns a bad experience into protection for someone else.`,
      workedExample_md: `**Wumpini checks a "Microsoft certificate" offer**

Wumpini, in Tamale, sees a Facebook advert: "Microsoft Office Certificate in 3 days. Internationally accredited. Pay 350 cedis to this MoMo number. Job placement guaranteed."

1. **Search:** She searches the seller's name with "scam" and finds two people complaining they never received anything.
2. **Official site:** She goes to Microsoft Learn herself. The free Office training is there, and the credentials page explains how real certifications are earned by exam.
3. **Accreditation:** The advert does not say who accredited it.
4. **Payment:** The MoMo number belongs to a person.
5. **Guarantee:** A guaranteed job is a red flag.

She does not pay. She starts the free Microsoft Learn training instead, and posts a warning in her community group with a screenshot of the advert.`,
      keyTerms: [
        { term: "Red flag", definition: "A warning sign that something may be a scam." },
        { term: "Fake accreditation", definition: "A false claim that a course has been officially approved." },
        { term: "Registered merchant", definition: "A business officially set up to receive mobile money payments under its own name." },
        { term: "Refund policy", definition: "The rules for getting your money back if a course is not as promised." },
        { term: "Cyber Security Authority", definition: "Ghana's body for cybersecurity, which accepts reports of cybercrime through its official website." },
      ],
      commonMistakes: [
        "Believing a guaranteed job or income promise",
        "Paying a personal MoMo number for a course or certificate",
        "Trusting a Google or Microsoft logo on a poster without checking the official site",
        "Paying one more fee to get a refund from a scammer",
        "Buying a certificate without learning or taking the assessment",
      ],
      selfCheck: [
        "Name four warning signs of a fake or overpriced course.",
        "What is a pay to unlock certificate scam?",
        "What six checks should you make before paying for a course?",
        "What should you do straight away if you have already paid a scammer?",
      ],
      practice_task_md: `**Goal:** Test a real offer against the checklist.

**Steps**

1. Find a course or certificate offer from social media, WhatsApp or a text message. If you cannot find one, use any paid course advert.
2. Go through the six checks from the lesson and write the answer to each.
3. Note any warning signs from the lesson's list.
4. Write a verdict: safe to consider, needs more checking, or likely a scam.
5. If it looks like a scam, write a short, calm warning message you could send to a group.

**Done looks like:** One offer checked against all six points, the warning signs you found, a verdict and, if needed, a warning message.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a warning sign of a fake or overpriced course?",
            options: [
              "A clear syllabus with the teacher's name",
              "A free first lesson you can try",
              "A price shown on the platform's official site",
              "A promise of a guaranteed job after training",
            ],
            answer_index: 3,
            explanation: "No honest course can guarantee a job.",
          },
          {
            prompt: "You get a message saying your free course certificate is ready if you pay a fee to a person. What is this?",
            options: [
              "A normal step on most free platforms",
              "A likely pay to unlock certificate scam",
              "A refund for your study data",
              "An official exam booking",
            ],
            answer_index: 1,
            explanation: "Real platforms show any certificate fee on their own site, not through a person.",
          },
          {
            prompt: "A scammer says you can get your money back if you pay one more small fee. What does the lesson advise?",
            options: [
              "Stop all further payments",
              "Pay quickly before the refund offer ends",
              "Pay half the fee and keep the rest until you get the refund",
              "Ask a friend to pay it for you so your number is not used",
            ],
            answer_index: 0,
            explanation: "Refund fees are another trick; stop paying and report it.",
          },
          {
            prompt: "Where does the lesson say you can report cybercrime in Ghana?",
            options: [
              "Only to the seller who scammed you",
              "To any WhatsApp group you belong to",
              "To Ghana's Cyber Security Authority, through its official website",
              "Only to the course platform that the scammer copied",
            ],
            answer_index: 2,
            explanation: "The Cyber Security Authority's website has a page for reporting incidents.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "protecting-learning-accounts": {
      outcomes: [
        "Set a strong, unique password for each learning account",
        "Turn on two step verification and check recovery details",
        "Spot fake sign in pages and messages",
      ],
      explanation_md: `Your learning accounts hold months of progress, your certificates, your profile and often your email address and phone number. If someone takes over one of them, you can lose your work, and they can use your name or details to trick others. Most account takeovers happen through a few common mistakes, so a few habits protect you well.

## Know which accounts matter

Look at the accounts table on your "My learning" page. Your **email account** is the most important, because it can reset the password of every other account. If you sign in to platforms with a Google or Microsoft account, that account is equally important. Protect these first.

Your phone number matters too, because many verification codes arrive by text message. If your phone lets you, set a SIM PIN in its security settings, and never give your SIM or account details to someone who calls you.

## Strong, unique passwords

* **Long beats complicated.** A password made of four or five unrelated words, such as a short odd sentence only you would think of, is strong and easy to remember.
* **One password per account.** If you use the same password everywhere, one leak from a small site opens all your accounts.
* **Never use** your name, birthday, phone number or "123456".
* **Store them safely.** A password manager app, or the password manager built into your own browser on your own device, can remember them for you. On a shared device, do not let the browser save them. A paper list kept somewhere private is better than reusing one password.

## Two step verification

Two step verification (sometimes called two factor authentication) asks for something extra after your password, usually a code sent to your phone or shown in an app. Even if someone learns your password, they cannot get in without that second step.

Turn it on first for your email account. On a Google account, it is in the security settings; Google's help page "Turn on 2 Step Verification" explains the current steps. Then turn it on for any learning platform that offers it.

**Never share a verification code** with anyone, including people who say they are from the platform, your network, or SydCrest. Real staff do not ask for it.

## Recovery details

If you forget your password or lose your phone, recovery details get you back in.

* Check that your email account has a **recovery phone number** and, if possible, a **recovery email** that you control.
* Update them if you change your SIM or number.
* Some services give you **backup codes**. Write them down and keep them somewhere safe and private.

## Fake sign in pages and messages

Many account thefts start with a message like "Your certificate is ready, sign in here" or "Your account will be closed, verify now". The link opens a page that looks real but sends your password to a thief.

* **Check the address** before typing a password. The real site's name should appear correctly, without extra words or spelling changes.
* **Go to the site yourself** using a bookmark, instead of tapping the link.
* **Be suspicious of urgency.** Real platforms do not usually threaten to delete your account within hours.
* **If you typed your password on a fake page,** change it immediately on the real site, and check your email's recent activity.

## Shared and public devices

Sign out after every session, do not let the browser save passwords, and do not tick "remember me". The shared devices lesson covers this in detail.

## Check in now and then

Every few months:

* Look at your email account's security page for unfamiliar devices or sign ins, and sign them out.
* Make sure your recovery details are up to date.
* Remove access for apps or sites you no longer use.

These checks take a few minutes and keep months of learning safe. Put a reminder in your calendar so they actually happen.`,
      workedExample_md: `**Issahaku secures his accounts**

Issahaku, in Navrongo, uses one Gmail address for Microsoft Learn, Khan Academy and his course on Coursera, and the same password everywhere.

1. He starts with Gmail, changing its password to a long phrase of unrelated words.
2. He turns on two step verification, following Google's help page, with codes sent to his phone.
3. He checks his recovery phone number and adds his sister's email as a recovery address, with her permission.
4. He gives each learning platform its own new password and writes them in a small notebook he keeps at home.
5. A week later he receives an email saying "Your certificate is blocked, sign in to unlock". He does not tap it. He opens the platform from his bookmark and sees no problem.`,
      keyTerms: [
        { term: "Unique password", definition: "A password used for only one account." },
        { term: "Two step verification", definition: "A second check after your password, such as a code sent to your phone." },
        { term: "Recovery details", definition: "A phone number or email used to get back into your account if you are locked out." },
        { term: "Backup codes", definition: "One time codes you can use to sign in if you cannot get your normal verification code." },
        { term: "Password manager", definition: "An app or browser feature that stores your passwords securely." },
      ],
      commonMistakes: [
        "Using the same password for every learning account",
        "Leaving two step verification off on your email",
        "Sharing a verification code with someone who claims to be staff",
        "Letting recovery details go out of date after changing your SIM",
        "Signing in through a link in a message instead of going to the site yourself",
      ],
      selfCheck: [
        "Why is your email account the most important to protect?",
        "What makes a password strong and easy to remember?",
        "What does two step verification protect you from?",
        "What should you do if you typed your password on a fake page?",
      ],
      practice_task_md: `**Goal:** Secure your email and learning accounts.

**Steps**

1. On your email account, check that two step verification is on. If not, turn it on using the provider's help page.
2. Check your recovery phone number and email, and update them if needed.
3. Make sure your email password is long and not used anywhere else.
4. For each learning platform in your accounts table, make sure its password is unique.
5. Look at your email's security page for unfamiliar devices and sign them out.

**Done looks like:** Two step verification on, recovery details correct, unique passwords for your learning accounts, and no unknown devices signed in.`,
      quiz: {
        questions: [
          {
            prompt: "Why is your email account the most important one to protect?",
            options: [
              "It holds the most photos and videos",
              "It is the account employers check first",
              "It uses the most data of all your accounts",
              "It can reset the passwords of your other accounts",
            ],
            answer_index: 3,
            explanation: "Whoever controls your email can reset your other accounts.",
          },
          {
            prompt: "Which password follows the lesson's advice?",
            options: [
              "Your name followed by your year of birth",
              "123456, because it is easy to remember",
              "A phrase of four or five unrelated words used only for this account",
              "The same strong password you use for all your accounts",
            ],
            answer_index: 2,
            explanation: "Long and unique beats short or reused.",
          },
          {
            prompt: "Someone calls saying they are from the course platform and asks for the code just sent to your phone. What should you do?",
            options: [
              "Refuse; never share a verification code with anyone",
              "Read it out, since they called you first",
              "Send it by text instead of reading it out",
              "Share it only if they know your name and email address",
            ],
            answer_index: 0,
            explanation: "Real staff never ask for your verification code.",
          },
          {
            prompt: "You realise you typed your password on a fake sign in page. What should you do first?",
            options: [
              "Wait to see whether anything bad happens",
              "Change the password immediately on the real site",
              "Create a new account and abandon the old one",
              "Send the fake link to friends to see if it works for them",
            ],
            answer_index: 1,
            explanation: "Change it quickly on the real site, then check recent activity.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "four-week-plan": {
      outcomes: [
        "Write a four week learning plan with a goal, course, slots and project",
        "Complete the first session of your plan",
        "Set up weekly check ins to keep the plan on track",
        "Choose the SydCrest track to take next",
      ],
      explanation_md: `This is the final practical of the track. Everything you have done so far comes together here: your goal, your course, your study times, your data plan, your notes, your project and your safety habits. You will write a four week plan, and then, before you finish this lesson, you will complete the first session. A plan you have already started is far more likely to continue.

## Why four weeks

Four weeks is long enough to make real progress and build a habit, and short enough to plan in detail. At the end, you review what happened and plan the next four weeks with better information.

## The plan, part by part

Write your plan on one page of your "My learning" notes, under the heading "My four week plan".

**1. Goal.** Copy your learning goal: what you will be able to do, why, how you will know, and by when. If it is longer than four weeks, write what part of it you will reach in these four weeks.

**2. Course.** The course name and link, and which modules you will cover each week.

**3. Study slots.** Your two to four weekly slots, with days and times, plus one catch up slot and your short version for bad days.

**4. Data plan.** When you have WiFi, what you will download each week, and which sessions are offline or light data.

**5. Review.** Five minutes of review at the start of each session, using questions from your notes.

**6. Project.** Your small project, and which week each step happens.

**7. Certificate.** Whether you will earn one in these four weeks, and where you will save it.

**8. Support.** The person or group you will check in with each week.

A simple layout helps:

| Week | Course work | Project step | Check in |
|:---|:---|:---|:---|
| 1 | Modules 1 and 2 | Plan written, first data entered | Sunday, study partner |
| 2 | Modules 3 and 4 | Main part built | Sunday, study partner |
| 3 | Module 5 and quiz | Feedback from the person it is for | Sunday, study partner |
| 4 | Review all questions | Improvements and save as proof | Sunday, look back |

## Do the first session now

Do not wait for Monday. Open your course and complete the first session: the first lesson, your notes in your own words, two or three review questions, and one practice step. Then tick it on your plan. Starting today, even with a short session, changes the plan from an idea into something you are already doing.

## Weekly check ins

At the end of each week, take ten minutes to answer:

* Which sessions did I do, and which did I miss?
* What did I learn? Can I answer my review questions?
* Where did I get stuck, and did I ask for help?
* Does next week need any change?

Share a short update with your study partner or the SydCrest community. Saying your progress out loud keeps you honest and lets others help.

## After four weeks

In the final check in, compare what you can do now with your first notes. Then decide:

* **Keep going** on the same goal for another four weeks, with an updated plan.
* **Finish and move on** if you reached your finish line. Save your project and any certificate, and set the next goal.
* **Change direction** if you discovered the subject is not for you. That is useful knowledge, not wasted time.

## Your next SydCrest track

This track taught you how to learn online. The next step is choosing what to learn. Each SydCrest roadmap is a free, step by step path built around skills that Ghanaian employers ask for. Some good next steps after this track:

* **AI Tools for Work,** to use AI tools safely in everyday office tasks.
* **Virtual Assistant and Remote Work,** for admin, documents, calendars and supporting clients online.
* **Excel and Power BI,** for spreadsheets, records and reports.
* **Digital Customer Service,** for helping customers by chat, email and phone.
* **Digital Marketer,** for helping businesses sell online.
* **IT Support and Networking,** **Data Analyst** or **Frontend Developer,** if you are ready for more technical work, ideally with regular computer access.

If you are not sure, the "Where do I start" quiz on SydCrest suggests a track based on your goal, time and device. Whichever you choose, you now know how to choose a course, protect your data and your money, and keep going. That is the hardest part done.`,
      workedExample_md: `**Mariama writes and starts her plan**

Mariama, in Tamale, wants to keep her kiosk's stock and sales on a spreadsheet.

1. **Goal:** In eight weeks, a working stock and sales sheet with weekly totals. In these four weeks: data entry, simple formulas and totals.
2. **Course:** A free beginner spreadsheet course; two modules a week.
3. **Slots:** Tuesday and Thursday, 9.15 to 9.45 pm; Sunday 3 to 4 pm. Catch up: Saturday afternoon. Short version: three review questions.
4. **Data:** Download the week's videos at church on Sunday morning; quizzes on her bundle.
5. **Project:** Her real kiosk sheet, one step a week.
6. **Support:** Her friend Hawa, who is taking a course too, every Sunday evening.
7. **First session:** That same evening she watches the first lesson, writes four lines of notes and two review questions, types five real stock items into a new sheet and ticks session one.
8. **Next track:** She notes Excel and Power BI as her next SydCrest track once the four weeks are done.`,
      keyTerms: [
        { term: "Learning plan", definition: "A written plan with your goal, course, study times, project and support for a set period." },
        { term: "Check in", definition: "A short weekly review of what you did, what you learned and what to change." },
        { term: "Roadmap", definition: "On SydCrest, a free step by step path of lessons towards a skill or job." },
        { term: "Next step", definition: "The goal or track you choose after finishing your current plan." },
      ],
      commonMistakes: [
        "Writing a plan and waiting for a perfect day to start",
        "Planning more sessions a week than your life allows",
        "Skipping weekly check ins once the first week goes well",
        "Treating a change of direction as failure",
        "Choosing the next track before finishing the current plan",
      ],
      selfCheck: [
        "What eight parts does your four week plan include?",
        "What four questions do you answer at each weekly check in?",
        "What three choices do you have after four weeks?",
        "Which SydCrest track might you take next, and why?",
      ],
      practice_task_md: `**Goal:** Write your four week plan and complete its first session today.

**Steps**

1. On your "My learning" page, write "My four week plan" with all eight parts from the lesson.
2. Fill in the weekly table: course work, project step and check in for each week.
3. Complete your first session now: one lesson, notes in your own words, two or three review questions and one practice step.
4. Tick session one on your plan.
5. Send a short message to your study partner or the SydCrest community saying you have started, with your goal in one sentence.
6. Write down which SydCrest track you might take next, and why.

**Done looks like:** A complete one page plan, session one done and ticked, a message sent to your support person or group, and a possible next track noted.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson ask you to complete the first session before finishing the lesson?",
            options: [
              "A plan you have already started is far more likely to continue",
              "The course only opens on the day you write your plan",
              "SydCrest needs your first session to issue a certificate",
              "Weekly check ins cannot begin until the second month",
            ],
            answer_index: 0,
            explanation: "Starting turns the plan from an idea into something you are already doing.",
          },
          {
            prompt: "Which of these is NOT one of the four weekly check in questions?",
            options: [
              "Which sessions did I do, and which did I miss?",
              "Where did I get stuck, and did I ask for help?",
              "How many certificates did my friends earn this week?",
              "Does next week need any change?",
            ],
            answer_index: 2,
            explanation: "Check ins are about your own sessions, learning, problems and next week.",
          },
          {
            prompt: "After four weeks you realise the subject is not for you. How does the lesson describe changing direction?",
            options: [
              "A failure that means online learning does not work for you",
              "A reason to pay for a different certificate straight away",
              "Something to hide from your study partner",
              "Useful knowledge, not wasted time",
            ],
            answer_index: 3,
            explanation: "Discovering what does not suit you is part of learning.",
          },
          {
            prompt: "What does the lesson suggest if you are not sure which SydCrest track to take next?",
            options: [
              "Start every track at the same time",
              "Take the \"Where do I start\" quiz on SydCrest",
              "Pick the track with the most lessons",
              "Wait until a friend chooses one for you",
            ],
            answer_index: 1,
            explanation: "The quiz suggests a track based on your goal, time and device.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
