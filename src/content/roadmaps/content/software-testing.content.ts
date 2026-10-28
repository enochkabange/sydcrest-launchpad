import type { TrackContent } from "./types";

/**
 * Lesson content for the Software Testing track. Original SydCrest writing;
 * sources and the coverage table are in src/content/research/software-testing.md.
 * Every person, shop, app and bug in these lessons is invented for teaching.
 * Real tools and companies are named only as examples, never as endorsements.
 * The ISTQB syllabus is referred to by name only; none of its text is used.
 */
const content: TrackContent = {
  roadmap: "software-tester",
  nodes: {
    "testing-basics": {
      explanation_md: `## Why this matters

Every app you use, from a mobile money wallet to a school results portal, was checked by someone before it reached you. When that checking is weak, people lose money, miss exam results or give up on a product. Software testing is the work of finding those problems before customers do. It is one of the more accessible ways into a technology company, because the core skills are careful thinking and clear writing, and you can begin practising them on any phone or computer you already use.

## What testing really is

Testing means comparing what software actually does with what people need it to do, and reporting the gaps clearly. A tester asks questions like these:

* Does the feature do what the team agreed it should?
* What happens when someone types something unexpected, loses network or presses back halfway?
* Would a first time user understand what to do next?
* Did a new change break something that used to work?

A tester does not fix the code. Developers do that. Your job is to give them clear, repeatable evidence of what is wrong, and later to confirm the fix works.

## What this section covers

This first section gives you the picture of the job and the ideas behind it:

* **What testers do and where they work.** The daily tasks, the people you work with, and an honest look at where testing jobs are found, including remote work.
* **Testing principles and the development lifecycle.** Why finding a problem early is cheaper, why you can never test everything, and the names for different levels of testing that teams use in meetings.

## A small example

Mariama is learning testing in Tamale. She opens a website where you can order food from a chop bar. The menu says a plate of jollof costs 40 cedis. She adds two plates, and the basket shows 40 cedis instead of 80. She tries three plates: still 40. She has found a bug. She writes down exactly what she did, what she expected and what she saw, takes a screenshot, and shares it. That is testing in its simplest form: try, observe, compare, report.

## What you need

For the first four sections of this track, a phone or a computer with a browser is enough. Later, automation needs a computer, because the tools run on a desktop operating system. Each lesson says when a device matters.

## How to learn this track

Read each lesson, do the practice task, and keep everything you produce in one folder or notes app. By the end of the track that folder becomes your testing portfolio, which is often more convincing to an employer than a certificate.`,
      practice_task_md: `**Goal:** start your tester's notebook and find your first real observation.

1. Create a note on your phone or computer, or use a paper notebook, called "Testing log".
2. Pick one app or website you use often, such as a mobile money app, a news site or your school portal.
3. Use it for ten minutes with fresh eyes. Write down anything that confused you, looked wrong, was slow or did not do what you expected.
4. For each item write three lines: what you did, what you expected, what happened.

**Done looks like:** a testing log with at least three observations written in that three line format. Do not worry if they are small. Noticing is the first skill.`,
      quiz: {
        questions: [
          {
            prompt: "What is the core of software testing?",
            options: [
              "Comparing what software does with what people need and reporting the gaps",
              "Writing the code for new features",
              "Designing logos and screens for an app",
              "Selling software to customers",
            ],
            answer_index: 0,
            explanation: "Testing compares actual behaviour with what is needed and reports the differences clearly.",
          },
          {
            prompt: "Who usually fixes the bugs a tester finds?",
            options: ["The tester", "The customer", "The marketing team", "The developers"],
            answer_index: 3,
            explanation: "Testers provide clear evidence; developers change the code and testers then confirm the fix.",
          },
          {
            prompt: "In Mariama's example, why was the basket total a bug?",
            options: [
              "The total stayed at 40 cedis when it should have increased with each plate",
              "Jollof should cost more than 40 cedis",
              "The website loaded slowly",
              "The menu had too many items",
            ],
            answer_index: 0,
            explanation: "Two plates at 40 cedis should total 80; the basket did not match what was expected.",
          },
          {
            prompt: "Which part of this track needs a computer rather than any device?",
            options: ["Writing test cases", "Exploratory testing", "Writing bug reports", "Test automation"],
            answer_index: 3,
            explanation: "Automation tools run on a desktop operating system, so that section needs a computer.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "what-testers-do": {
      explanation_md: `## Why this matters

Before you invest months in a career, you should know what the work looks like day to day and where the jobs actually are. Testing suits careful, curious people who like asking "what if?", and it is a real way into software teams. It also helps to be honest about the market from the start.

## A tester's working week

Most testers work inside a product team with developers, a product manager and sometimes a designer. A typical week mixes these tasks:

* **Reading what is planned.** You read the description of a new feature and ask questions early: what should happen if the amount is zero? What if the user has no network?
* **Designing tests.** You write test cases: the steps and data to try, and what should happen.
* **Running tests.** You work through the app on real devices and browsers, following your test cases and also exploring freely.
* **Reporting bugs.** When something is wrong, you write a bug report clear enough that a developer can repeat the problem quickly.
* **Confirming fixes.** When a fix arrives, you check it works and that nothing nearby broke.
* **Summarising.** Before a release, you tell the team what was tested, what passed, and what risks remain.

Job titles vary: QA tester, QA engineer, software tester, test analyst. "QA" stands for quality assurance.

## Where the jobs are: an honest picture

When SydCrest researched this track, we found only a handful of software testing openings in Ghana, mostly in Accra, at fintech, agritech and software companies. Several asked for some experience, and only a few were clearly entry level. So plan for more than one route:

* **Remote work.** Some companies hire testers who work from anywhere, though many remote roles are limited to certain countries. Read each advert's location rules carefully.
* **Automation.** Testers who can write automated tests are asked for more often. This track takes you there.
* **Nearby roles.** Testing skills are valued in developer, IT support, customer support and product roles, where checking quality is part of the job.
* **Fellowships and internships.** Some companies run early career QA programmes.

None of this is a reason to give up. It is a reason to build strong evidence of your skills and look widely.

## A small example

Fuseini joins a small software company in Accra as a junior tester. On Monday he reads a new feature: customers can split a bill between friends. He asks the product manager what happens if one friend's payment fails. Nobody had thought about it. That single question, asked before any code was written, saved the team days of rework. Asking good questions early is as much a part of testing as clicking through screens.

## The qualities that matter

Employers look for attention to detail, clear writing, curiosity, patience and good communication. You can practise every one of these now, on any device, before you ever apply.`,
      practice_task_md: `**Goal:** understand what employers ask testers to do.

1. Search a job board you can access for free (for example Jobberman Ghana, or a remote jobs site) using words like "QA tester", "software tester" or "QA engineer".
2. Open three adverts, including at least one remote role. Note the location rules for each.
3. In your testing log, list the tasks and skills each advert mentions in your own words. Do not copy the advert.
4. Mark which skills you could practise this month with only a phone or computer.

**Done looks like:** a short table of three adverts with skills listed, plus two sentences on what you will focus on first.`,
      quiz: {
        questions: [
          {
            prompt: "What does QA stand for in job titles like QA tester?",
            options: ["Quick access", "Question and answer", "Quarterly audit", "Quality assurance"],
            answer_index: 3,
            explanation: "QA means quality assurance, the work of making sure a product meets the expected standard.",
          },
          {
            prompt: "What did Fuseini do that saved his team rework?",
            options: [
              "He asked what should happen if one friend's payment failed, before coding started",
              "He fixed the payment code himself",
              "He wrote an automated test for every screen",
              "He changed the release date",
            ],
            answer_index: 0,
            explanation: "Asking questions early about unclear cases is a valuable part of testing.",
          },
          {
            prompt: "What did SydCrest's research find about testing openings in Ghana?",
            options: [
              "There are thousands of entry level openings across every region",
              "Testing jobs exist only in Tamale",
              "Only a handful were found, mostly in Accra",
              "No company in Ghana employs testers",
            ],
            answer_index: 2,
            explanation:
              "The research found a handful of openings, mostly in Accra, so learners should also look at remote and nearby roles.",
          },
          {
            prompt: "Why should you read the location rules on a remote testing advert?",
            options: [
              "Remote roles never accept applicants from Africa",
              "Many remote roles are limited to certain countries",
              "Location rules decide the salary",
              "Remote adverts always require relocation",
            ],
            answer_index: 1,
            explanation: "Remote does not always mean anywhere; many roles hire only in specific countries.",
          },
          {
            prompt: "Which task is part of a tester's normal week?",
            options: [
              "Setting the company's prices",
              "Hiring new developers",
              "Managing the office budget",
              "Confirming that a bug fix works and nothing nearby broke",
            ],
            answer_index: 3,
            explanation: "Testers recheck fixes and the areas around them before a release.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "testing-principles": {
      explanation_md: `## Why this matters

In interviews and team meetings you will hear words like "unit tests", "UAT" and "shift left". Knowing the ideas behind them lets you follow the conversation, make sensible choices about what to test, and explain your choices to others.

## A few ideas every tester relies on

**Finding problems early is cheaper.** A confusing rule spotted while the feature is still a written description costs a short conversation to fix. The same mistake found after release can mean angry customers, refunds and an emergency update. That is why testers read plans and ask questions before code exists. Teams call this "shifting left", because testing moves earlier on the project timeline.

**You can never test everything.** Even a simple form with one amount field has millions of possible inputs. Combine that with different phones, browsers and network conditions, and complete testing is impossible. So testers choose: they focus on the features that matter most and the places where failure would hurt most. This is called risk based testing.

**Passing tests do not prove there are no bugs.** Tests can show that problems exist. They cannot show that none remain. When you report results, say what you checked, not "the app has no bugs".

**Bugs tend to gather together.** A part of the app that has produced several bugs often hides more. Spend extra time there.

**Running the same tests forever finds less and less.** Once a set of tests passes repeatedly, it stops finding new problems. Refresh your tests and explore new paths from time to time.

## How testing fits into building software

Most teams build software in a cycle: understand the need, design, build, test, release, then learn and improve. In modern teams these steps repeat in short cycles, often every one or two weeks, and testing happens throughout rather than only at the end.

## Levels of testing

Teams test at different levels, from small pieces to the whole product:

* **Unit testing:** checking one small piece of code, such as a function that calculates a transfer fee. Developers usually write these.
* **Integration testing:** checking that pieces work together, such as the app talking correctly to the payment server.
* **System testing:** checking the complete product end to end, the way a tester walks through a whole flow.
* **Acceptance testing:** checking that the product meets the needs of the customer or business, often with real users. You may hear it called UAT, user acceptance testing.

Most automated checks should be fast unit tests, with fewer slow end to end tests on top. People draw this as a pyramid.

## A small example

Hawa's team is adding a transfer fee to a payment app. A developer writes a unit test that the fee function returns the right amount. Hawa checks integration by confirming the fee appears correctly after the server responds. She then runs a system test of the whole send money flow on two phones. Finally, a few shop owners in Wa try it during acceptance testing and say the fee text is hard to find. Each level caught something different.

## Further reading

The ISTQB Foundation syllabus, in its chapters on fundamentals and on testing throughout the lifecycle, covers these topics in more depth if you want a structured outline.`,
      practice_task_md: `**Goal:** apply risk based thinking to a real app.

1. Pick an app you know, such as a mobile money app, a ride app or a school portal.
2. List six features it has, for example sign in, send money, check balance, change PIN, view history, contact support.
3. For each feature, write how bad a failure would be (high, medium, low) and why, in one sentence.
4. Order the list from highest risk to lowest. This is the order you would test in if you only had one hour.
5. For the top feature, write which level of testing (unit, integration, system or acceptance) you think would catch a typical problem, and why.

**Done looks like:** a ranked risk list of six features with reasons, saved in your testing log.`,
      quiz: {
        questions: [
          {
            prompt: "Why do testers try to find problems early?",
            options: [
              "Early bugs are more interesting",
              "Fixing a problem in a written plan costs far less than fixing it after release",
              "Developers prefer to work on old code",
              "Early testing removes the need for later testing",
            ],
            answer_index: 1,
            explanation:
              "A problem caught at the description stage costs a conversation; after release it can cost refunds and emergency updates.",
          },
          {
            prompt: "Since you can never test everything, how do testers decide what to test?",
            options: [
              "They test features in alphabetical order",
              "They test only what developers ask for",
              "They pick features at random",
              "They focus on the most important features and where failure would hurt most",
            ],
            answer_index: 3,
            explanation: "Risk based testing puts effort where failure would matter most.",
          },
          {
            prompt: "Which level of testing checks one small piece of code, such as a fee calculation function?",
            options: ["Unit testing", "Acceptance testing", "System testing", "Integration testing"],
            answer_index: 0,
            explanation: "Unit tests check a single small piece of code, usually written by developers.",
          },
          {
            prompt: "In Hawa's example, what did acceptance testing reveal?",
            options: [
              "The fee function returned the wrong number",
              "The server did not respond",
              "The app crashed on one phone",
              "Shop owners found the fee text hard to find",
            ],
            answer_index: 3,
            explanation: "Acceptance testing with real users showed a usability problem the other levels missed.",
          },
          {
            prompt: "What is the right way to describe results when all your tests pass?",
            options: [
              "The app has no bugs",
              "Testing is finished forever",
              "Say what you checked, because passing tests cannot prove no bugs remain",
              "The developers made no mistakes",
            ],
            answer_index: 2,
            explanation: "Tests show problems exist; they cannot prove there are none, so report what was checked.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "manual-testing": {
      explanation_md: `## Why this matters

Manual testing is where most testers begin, and many adverts for testing roles ask for it directly. It means a person uses the software the way a customer would, thinks about what could go wrong, and records what happens. No code is needed, and you can practise most of it on the phone or computer you already have, using apps and websites that are free to open.

## What manual testing involves

Manual testing is not random tapping. It is a craft with four parts, and this section gives each one its own lesson:

* **Writing test cases.** Turning "check that sign up works" into clear steps, data and expected results that anyone can repeat.
* **Choosing what to test.** Using simple techniques to pick a small number of tests that catch the most bugs, instead of trying every possible input.
* **Exploratory testing.** Learning the product and designing tests as you go, guided by a mission and a time limit. This is where testers often find the most surprising problems.
* **Writing bug reports.** Describing a problem so clearly that a developer can see it for themselves within minutes.

## Why humans still test by hand

Computers are excellent at repeating the same check quickly. People are better at noticing that a button label is confusing, that a page feels slow, or that a flow makes no sense to a first time user. Good teams use both. Manual testing also comes first in practice: you cannot automate a check until someone has worked out what the check should be.

## A small example

Issahaku is asked to test the sign up page of a new farm produce marketplace. He does not just fill in the form once. He writes test cases for a normal sign up, for a phone number that is too short, and for an empty name. He uses boundary thinking to try a password exactly at the minimum length. He spends twenty minutes exploring what happens if he switches off data halfway. He finds that the page shows "Success" even though the account was not created. He writes a bug report with steps, a screenshot and his phone model. In one morning he used all four skills from this section.

## A tester's mindset

As you work through these lessons, practise three habits:

* **Be curious.** Ask "what if?" constantly: what if the network drops, the amount is zero, the name has an apostrophe?
* **Be precise.** Write exactly what you did, not roughly what you did.
* **Be kind.** Bugs are problems in software, not failures of people. Clear, polite reports get fixed faster.

## What you need

A phone or computer, a free notes app or spreadsheet, and any public app or website to practise on. Only test apps in normal ways a customer could; never try to break into systems or use other people's accounts.`,
      practice_task_md: `**Goal:** see manual testing as four separate skills.

1. Choose a simple public website or app with a form, such as a sign up page or a contact form.
2. Write one test case with steps and an expected result.
3. Write down two unusual inputs you would try, and why.
4. Explore the form for ten minutes and note anything odd.
5. If you find something wrong, write it up in the three line format: what you did, what you expected, what happened.

**Done looks like:** one page in your testing log that shows a test case, two chosen inputs, exploration notes and any problem found.`,
      quiz: {
        questions: [
          {
            prompt: "What is manual testing?",
            options: [
              "Writing code that clicks buttons automatically",
              "Reading the source code line by line",
              "A person using the software like a customer, thinking about what could go wrong and recording results",
              "Installing software on many computers",
            ],
            answer_index: 2,
            explanation: "Manual testing is a person using the product deliberately and recording what happens.",
          },
          {
            prompt: "What are people better at than automated checks?",
            options: [
              "Repeating the same check thousands of times",
              "Running tests overnight",
              "Noticing a confusing label or a flow that makes no sense to a new user",
              "Checking every possible input",
            ],
            answer_index: 2,
            explanation: "Humans notice usability and sense problems that a scripted check would not.",
          },
          {
            prompt: "Why does manual testing usually come before automation?",
            options: [
              "Automation is not allowed until a manager approves",
              "Someone must work out what the check should be before it can be automated",
              "Manual testing is faster than automation",
              "Automated tests cannot run on websites",
            ],
            answer_index: 1,
            explanation: "You cannot automate a check until a person has designed it.",
          },
          {
            prompt: "What serious bug did Issahaku find?",
            options: [
              "The page showed Success even though no account was created",
              "The logo was the wrong colour",
              "The password field accepted long passwords",
              "The page loaded in a different language",
            ],
            answer_index: 0,
            explanation: "Switching off data mid sign up revealed a false success message.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "test-cases": {
      explanation_md: `## Why this matters

Writing test cases is the skill that appears most often in testing adverts we read. A good test case lets anyone on the team repeat a check and get the same answer, which matters when a release is due tomorrow and you are not the one running the tests.

## What a test case contains

A test case is a short, precise recipe. Most teams use these parts:

* **ID and title:** a short name that says what is being checked, such as "TC03 Send money to a valid number".
* **Preconditions:** what must be true before you start. For example, the user is signed in and has at least 100 cedis in the wallet.
* **Test data:** the exact values to use, such as the recipient number and the amount.
* **Steps:** numbered actions, one action per step.
* **Expected result:** what should happen if the software works correctly. This is the most important line.
* **Actual result and status:** filled in when you run it: pass, fail or blocked.

Write steps so that someone who has never seen the app could follow them. Avoid vague words like "check it works". Say what "works" means.

## Positive and negative cases

A **positive** test case checks that the software does the right thing with valid input. A **negative** test case checks that it handles invalid input safely, with a clear message and no damage. Many serious bugs live in negative cases, because developers naturally think about the happy path first.

## A worked example

Amina is testing the send money flow of a mobile money style app. Her first test case:

* **ID:** TC01
* **Title:** Send money to a valid registered number
* **Preconditions:** Signed in; wallet balance 200 cedis
* **Test data:** Recipient 0241234567; amount 50 cedis
* **Steps:** 1. Tap Send money. 2. Enter the recipient number. 3. Enter 50. 4. Tap Continue. 5. Enter the correct PIN. 6. Tap Confirm.
* **Expected result:** A confirmation screen shows 50 cedis sent to the right name and number, and the balance becomes 150 cedis minus any stated fee.

Then she writes negative cases: an amount larger than the balance, a number with only nine digits, and a wrong PIN entered three times. For each, the expected result describes the exact behaviour the team agreed, such as a clear error message and no money leaving the wallet.

## Where test cases live

Small teams keep test cases in a spreadsheet. Larger teams use test management tools or add them to their issue tracker. A free spreadsheet app on any device is perfect for practice, with one row per test case and one column per part.

## Common mistakes

* Combining several checks in one test case, so a failure is hard to pin down.
* Leaving out the starting state, so results differ between testers.
* Writing the expected result after running the test, which tempts you to accept whatever happened.

Write the expected result first. It is your promise of what correct looks like.`,
      practice_task_md: `**Goal:** write a small set of test cases for a familiar flow.

1. Open a free spreadsheet app (Google Sheets works on a phone or computer) or a table in a notes app.
2. Make columns: ID, Title, Preconditions, Test data, Steps, Expected result, Actual result, Status.
3. Choose a flow you know well, such as signing up for a website or buying airtime in an app.
4. Write two positive and three negative test cases. Write every expected result before you run anything.
5. Run them, using only normal customer actions, and fill in actual result and status.

**Done looks like:** five complete test cases with statuses filled in, saved as the first item in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which part of a test case describes what should happen if the software works correctly?",
            options: ["Expected result", "Preconditions", "Test data", "Title"],
            answer_index: 0,
            explanation: "The expected result states what correct behaviour looks like.",
          },
          {
            prompt: "What is a negative test case?",
            options: [
              "A test that always fails",
              "A test that checks the software handles invalid input safely",
              "A test written by an unhappy tester",
              "A test that is skipped",
            ],
            answer_index: 1,
            explanation: "Negative cases check behaviour with invalid input, such as a short phone number.",
          },
          {
            prompt: "Why should preconditions be written down?",
            options: [
              "Because they make the test case longer",
              "So developers can skip reading the steps",
              "Because tools require them",
              "So results do not differ between testers who start from different states",
            ],
            answer_index: 3,
            explanation: "Stating the starting state makes the test repeatable by anyone.",
          },
          {
            prompt: "Which of these was one of Amina's negative test cases?",
            options: [
              "Sending 50 cedis to a valid number",
              "Entering an amount larger than the wallet balance",
              "Checking the balance after a transfer",
              "Opening the app",
            ],
            answer_index: 1,
            explanation: "Trying to send more than the balance checks how invalid input is handled.",
          },
          {
            prompt: "Why write the expected result before running the test?",
            options: [
              "It is faster to type",
              "Because tools hide the actual result",
              "Developers write the actual result",
              "So you are not tempted to accept whatever happened as correct",
            ],
            answer_index: 3,
            explanation: "Deciding what correct looks like first keeps your judgement honest.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "test-design-techniques": {
      explanation_md: `## Why this matters

You can never test every possible input, so the question is which few tests will find the most bugs. Testers who choose well finish faster and catch more, and employers notice. A few simple techniques do most of the work, and you can apply all of them with a pen and paper.

## Equivalence partitioning

Inputs can usually be split into groups (partitions) where the software should behave the same way for every value in the group. You then test one value from each group instead of hundreds.

Imagine a field where you send money, and the rule is: the amount must be between 1 and 5,000 cedis. The groups are:

* Below the range: less than 1 (for example 0 or a negative number). Should be rejected.
* Inside the range: 1 to 5,000. Should be accepted.
* Above the range: more than 5,000. Should be rejected.
* Not a number at all: letters or symbols. Should be rejected.

Four tests, one per group, already cover a lot.

## Boundary value analysis

Bugs love edges. A developer might type "less than 5,000" when they meant "up to and including 5,000". So test the values right at and beside each boundary:

* Lower edge: 0, 1 and 2
* Upper edge: 4,999, 5,000 and 5,001

If 5,000 is rejected, you have found a classic boundary bug. Also think about decimal amounts like 0.50 cedis, if the rules allow pesewas.

## Decision tables

When the result depends on combinations of conditions, a decision table lists every combination and the expected outcome. Say a school canteen app gives a discount only to registered students who pay before 10am:

| Registered | Before 10am | Discount? |
|---|---|---|
| Yes | Yes | Yes |
| Yes | No | No |
| No | Yes | No |
| No | No | No |

Four rows, four tests, and you will notice quickly if the app gives a discount to someone who is not registered.

## State transitions

Some things move through states: an order can be placed, paid, delivered or cancelled. Draw the states and the arrows between them, then test each arrow and some arrows that should not exist, such as cancelling an order that was already delivered.

## Using experience and risk

Techniques are a starting point. Add tests where your experience says bugs hide: empty fields, very long names, names with apostrophes, phone numbers with spaces, and pressing a button twice quickly. Put more tests on features where a failure would hurt most, such as payments.

## A small example

Abdul-Rahman tests an airtime top up screen with a range of 1 to 500 cedis. Using partitions and boundaries he writes nine tests in ten minutes. The test for exactly 500 fails with "Amount too large". The developer fixes the comparison in five minutes. Without the boundary test, customers would have found it first.`,
      practice_task_md: `**Goal:** design tests with partitions, boundaries and a decision table.

1. Invent or find a rule with a numeric range, such as "a delivery order must be between 20 and 1,000 cedis".
2. In your testing log, list the partitions and one value for each.
3. List the boundary values to test at each edge.
4. Invent a rule with two conditions, such as "free delivery for orders over 200 cedis inside Tamale", and build a four row decision table.
5. If you can find a real form with a similar rule, try a few of your values using normal customer actions.

**Done looks like:** a page showing partitions, boundary values and a decision table, each with expected results.`,
      quiz: {
        questions: [
          {
            prompt: "An amount must be between 1 and 5,000 cedis. Which set of values tests the upper boundary?",
            options: ["1, 2 and 3", "2,500 only", "0 and 10,000", "4,999, 5,000 and 5,001"],
            answer_index: 3,
            explanation: "Boundary testing checks values at and just beside each edge of the range.",
          },
          {
            prompt: "What is the idea behind equivalence partitioning?",
            options: [
              "Test every possible value in the range",
              "Split inputs into groups that should behave the same and test one value from each group",
              "Only test values the developer suggests",
              "Test the same value many times",
            ],
            answer_index: 1,
            explanation: "One value per group gives good coverage with few tests.",
          },
          {
            prompt: "When is a decision table most useful?",
            options: [
              "When the result depends on combinations of conditions",
              "When a page has only one button",
              "When checking spelling",
              "When writing a bug title",
            ],
            answer_index: 0,
            explanation: "Decision tables list every combination of conditions and the expected outcome.",
          },
          {
            prompt: "In Abdul-Rahman's example, which test found the bug?",
            options: ["Entering 1 cedi", "Entering letters", "Entering exactly 500 cedis", "Entering 250 cedis"],
            answer_index: 2,
            explanation: "The valid upper boundary of 500 was wrongly rejected.",
          },
          {
            prompt: "Which test belongs to state transition testing?",
            options: [
              "Typing a very long name",
              "Checking text contrast",
              "Entering a decimal amount",
              "Trying to cancel an order that has already been delivered",
            ],
            answer_index: 3,
            explanation:
              "State transition testing checks moves between states, including moves that should not be allowed.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "exploratory-testing": {
      explanation_md: `## Why this matters

Scripted test cases check what the team expected. Real users do things nobody expected. Exploratory testing is how testers find those surprises: you learn the product, design tests and run them all at the same time, using your judgement as you go. It is a skill employers value and one you can practise on any device with any app.

## Exploring is not wandering

Good exploratory testing has structure. Testers often work in short **sessions** with three parts:

* **A charter:** a one line mission that says what to explore and what to look for. For example: "Explore paying a bill with a weak network to discover how the app handles interruptions."
* **A time box:** a fixed period, usually 30 to 90 minutes, so you stay focused.
* **Notes:** a running record of what you tried, what you noticed, questions that came up and bugs found.

At the end you have evidence of what was covered, not just a vague feeling that you "had a look".

## Ideas to guide your exploring

When you are not sure what to try next, use prompts like these:

* **Interruptions:** take a call, switch apps, lock the screen, turn data off and on, rotate the device.
* **Going back:** press back or refresh halfway through a payment or a form.
* **Doubling:** tap a button twice quickly, submit the same form twice.
* **Extremes:** very long text, empty fields, emoji, a name in a local language with unusual letters.
* **Different users:** a first time user, someone in a hurry, someone with low vision who enlarges text.
* **Conditions:** low battery saver mode, little storage left, slow network.

## How it fits with test cases

Exploratory testing does not replace test cases. Many teams run their test cases for the important paths and then add exploratory sessions to find what the scripts miss. When you find a bug while exploring, you can turn it into a new test case so it is checked every time.

## A small example

Sumaila is given a 45 minute session with this charter: "Explore the order history screen of a food delivery app to discover problems with old and cancelled orders." She notices that a cancelled order still shows "On the way". She then tries reordering it and finds she is charged, but no order appears. She writes in her notes the time, the steps and a screen recording, then files two bug reports. Neither problem was in the written test cases.

## Taking good notes

Keep notes short but exact. A simple pattern works well:

* Time and what you tried
* What you saw
* Questions to ask the team
* Bugs, each with a short title

A screen recording, which most phones and computers can make for free, is the best evidence when something strange happens. Watch your data use: record short clips rather than whole sessions.`,
      practice_task_md: `**Goal:** run and document one exploratory session.

1. Choose a free app or website you can use without spending money.
2. Write a charter in one line: "Explore [area] to discover [kind of problem]."
3. Set a timer for 30 minutes.
4. Explore using at least three of the prompts from the lesson, such as interruptions, going back and doubling. Use only normal customer actions.
5. Keep notes in the pattern: time and action, what you saw, questions, bugs.

**Done looks like:** a one page session record with charter, time box, notes and a short summary of what you covered and what you would explore next.`,
      quiz: {
        questions: [
          {
            prompt: "What is a charter in exploratory testing?",
            options: [
              "A contract signed with the client",
              "A list of all the developers",
              "A one line mission saying what to explore and what to look for",
              "A tool that records the screen",
            ],
            answer_index: 2,
            explanation: "A charter gives the session a focus, such as exploring payments with a weak network.",
          },
          {
            prompt: "Why do exploratory sessions use a time box?",
            options: [
              "Because apps close after 30 minutes",
              "To save the developer's time",
              "So that bugs cannot be found after the timer ends",
              "To keep the tester focused for a fixed period",
            ],
            answer_index: 3,
            explanation: "A fixed time keeps the session focused and makes coverage easy to report.",
          },
          {
            prompt: "Which is an example of the interruptions prompt?",
            options: [
              "Typing a very long name",
              "Writing a decision table",
              "Turning data off and on in the middle of a payment",
              "Reading the release notes",
            ],
            answer_index: 2,
            explanation: "Interruptions include network changes, calls and switching apps during a flow.",
          },
          {
            prompt: "What should you do with a bug found during exploring?",
            options: [
              "Report it and consider turning it into a new test case",
              "Keep it secret until the next session",
              "Delete your notes",
              "Ask the user to find it again",
            ],
            answer_index: 0,
            explanation: "Bugs found while exploring are reported and can become repeatable test cases.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "bug-reports": {
      explanation_md: `## Why this matters

A bug that nobody can reproduce rarely gets fixed. Your bug report is often the only thing a developer sees of your work, so it is where you show your value. Clear bug reporting appears again and again in testing adverts, and it is the skill a new tester can demonstrate most easily in a portfolio.

## The parts of a good bug report

* **Title:** short and specific. It should say what fails and where. "Basket total does not increase when adding a second item" is good. "Basket broken" is not.
* **Steps to reproduce:** numbered, exact actions starting from a known state, with the data you used.
* **Expected result:** what should have happened.
* **Actual result:** what did happen, including any error message copied exactly.
* **Environment:** device model, operating system version, browser and version, or app version. Note the network too if it might matter.
* **Evidence:** a screenshot or a short screen recording. Mark the problem area if you can.
* **Severity:** how serious the effect is, such as critical (money lost, app crashes), major, minor or cosmetic.
* **Frequency:** does it happen every time, or only sometimes? If sometimes, say how often in your tries.

## Severity and priority

**Severity** describes how bad the effect is. **Priority** describes how soon the team should fix it. They are not the same. A spelling mistake on the home page is low severity, but the team may make it high priority before a launch. You usually suggest severity; the team decides priority.

## A worked example

Wumpini tests a school fees payment website and writes:

**Title:** Payment confirmation page shows wrong student name after changing student

**Steps:**
1. Sign in as a parent with two children registered.
2. Select the first child, Abiba, and go to Pay fees.
3. Press back and select the second child, Nasir.
4. Enter 100 cedis and pay.

**Expected:** Confirmation shows Nasir's name and 100 cedis.
**Actual:** Confirmation shows Abiba's name and 100 cedis.
**Environment:** Tecno Spark phone, Android 12, Chrome 129; also seen on Windows 11, Firefox 131.
**Evidence:** 20 second screen recording attached.
**Severity:** Major, as parents may think they paid for the wrong child.
**Frequency:** 3 out of 3 tries.

## Habits that help

* Reproduce it at least twice before reporting, and try to find the shortest steps.
* Report one problem per bug report.
* Search the tracker first in case it is already reported.
* Stay factual and polite. Describe the software, never blame a person.
* When the fix arrives, retest using your own steps and then check nearby features.

Most teams log bugs in an issue tracker such as Jira, GitHub Issues or a shared spreadsheet. The tool changes; the parts above stay the same.`,
      practice_task_md: `**Goal:** write two portfolio quality bug reports.

1. Using any public app or website, look for real problems through normal customer use. Your notes from earlier lessons may already contain some.
2. Reproduce each problem twice and find the shortest steps.
3. Write a full report for each with all eight parts: title, steps, expected, actual, environment, evidence, severity, frequency.
4. Take a screenshot or short screen recording as evidence.
5. Ask a friend to follow your steps without your help. If they get stuck, improve the report.

**Done looks like:** two bug reports a stranger can reproduce, saved in your portfolio folder. Do not post them publicly about a real company without care; keep them factual.`,
      quiz: {
        questions: [
          {
            prompt: "Which is the best bug title?",
            options: [
              "App broken",
              "Basket total does not increase when adding a second item",
              "Please fix urgently",
              "Bug found today",
            ],
            answer_index: 1,
            explanation: "A good title says what fails and where.",
          },
          {
            prompt: "What is the difference between severity and priority?",
            options: [
              "They mean the same thing",
              "Severity is decided by customers; priority by testers",
              "Severity is how bad the effect is; priority is how soon the team should fix it",
              "Priority is about the device; severity is about the browser",
            ],
            answer_index: 2,
            explanation: "A minor issue can still be high priority, for example before a launch.",
          },
          {
            prompt: "What belongs in the environment section?",
            options: [
              "The weather on the day of testing",
              "Device model, operating system and browser or app versions",
              "The developer's name",
              "The tester's opinion of the design",
            ],
            answer_index: 1,
            explanation: "Environment details help developers reproduce the problem on the same setup.",
          },
          {
            prompt: "Why did Wumpini rate her bug as major?",
            options: [
              "Parents may think they paid for the wrong child",
              "The page was slow",
              "The colour was wrong",
              "It only happened once",
            ],
            answer_index: 0,
            explanation: "Showing the wrong child's name on a payment has a serious effect on users.",
          },
          {
            prompt: "What should you do before writing a bug report?",
            options: [
              "Reproduce it at least twice and look for the shortest steps",
              "Report it immediately without checking",
              "Combine it with other bugs into one report",
              "Ask the customer to report it",
            ],
            answer_index: 0,
            explanation: "Reproducing and simplifying makes the report reliable and quick to act on.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "testing-web-and-mobile": {
      explanation_md: `## Why this matters

Most products you will test are websites, Android apps, or the services behind them that both talk to. Each has its own tools and its own typical bugs. In Ghana, many users meet these products on budget phones, on prepaid data that comes and goes, and sometimes on shared devices, so a tester who understands those conditions catches problems that others miss.

## Three surfaces, one product

Think of a modern product as three layers:

* **The website**, opened in a browser on a phone or a computer.
* **The mobile app**, installed from an app store, usually Android first in Ghana.
* **The API**, the set of rules the website and app use to talk to the server: sign in, fetch a balance, make a payment.

A bug can hide in any layer. A wrong balance might be a display mistake in the app, or the API might be sending the wrong number. Knowing the layers helps you write better bug reports, because you can say where the problem seems to live.

## What this section covers

* **Testing websites with browser tools.** Checking pages on different browsers and screen sizes, and using the developer tools built into desktop browsers to read errors and simulate slow networks.
* **Testing Android apps on real phones.** Low storage, old Android versions, interruptions, patchy data, and capturing device details and recordings.
* **API testing with Postman.** Sending requests to the server directly to find bugs the screen hides.
* **Accessibility and usability checks** (optional). Making sure people with low vision, unsteady hands or older phones can still use the product.

## Devices in this section

Some of this section works on any device: testing a website's behaviour, testing an Android app, and basic accessibility checks. Two parts are much easier on a computer: browser developer tools, which live in desktop browsers, and API testing, where typing requests and reading long responses needs a bigger screen and keyboard. Each lesson says what you need.

## Local conditions to keep in mind

* **Network:** 3G and weak 4G, data running out mid task, switching between Wi-Fi and mobile data.
* **Devices:** phones with small screens, little free storage and older Android versions.
* **Language and names:** names with apostrophes or unusual spellings, phone numbers typed with spaces or a country code.
* **Payments:** mobile money flows where confirmations can arrive late or twice.

## A small example

Hawa tests a savings app. On her laptop browser the website looks perfect. On a small Android phone the Save button is hidden under the keyboard. Using a request tool, she also notices the API accepts a negative savings amount, which the screen never allows. Three layers, three different bugs, found by one tester who looked at each layer.`,
      practice_task_md: `**Goal:** see one product through its different surfaces.

1. Choose a service that has both a website and an app, such as a bank, a news outlet or an online shop.
2. Do the same simple task (for example, search for an item or read the latest news) on the website and in the app, on whatever devices you have.
3. Note three differences in how they behave or look.
4. For each difference, guess which layer it comes from: website, app or the shared server.

**Done looks like:** a short comparison table in your testing log with three differences and your layer guesses.`,
      quiz: {
        questions: [
          {
            prompt: "What is an API in a modern product?",
            options: [
              "The app's icon",
              "A type of phone screen",
              "The company's marketing plan",
              "The set of rules the website and app use to talk to the server",
            ],
            answer_index: 3,
            explanation: "The API is how the website and app send and receive data from the server.",
          },
          {
            prompt: "Which parts of this section are much easier on a computer?",
            options: [
              "Testing an Android app",
              "Browser developer tools and API testing",
              "Basic accessibility checks",
              "Reading test cases",
            ],
            answer_index: 1,
            explanation:
              "Developer tools live in desktop browsers, and API testing needs room for typing requests and reading responses.",
          },
          {
            prompt: "In Hawa's example, which bug did the screen hide?",
            options: [
              "The Save button under the keyboard",
              "The website colours",
              "The API accepting a negative savings amount",
              "A slow loading page",
            ],
            answer_index: 2,
            explanation: "Testing the API directly revealed it accepted negative amounts the screen never sent.",
          },
          {
            prompt: "Why does knowing the layers help your bug reports?",
            options: [
              "It makes reports longer",
              "Developers only read reports about the API",
              "It removes the need for steps to reproduce",
              "You can say where the problem seems to live",
            ],
            answer_index: 3,
            explanation: "Pointing to the likely layer helps developers find the cause faster.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "web-testing": {
      explanation_md: `## Why this matters

Many Ghanaian businesses, schools and NGOs run websites that customers open on every kind of device. A page that works on the developer's large screen can break on a small phone or an older browser. Web testing adverts ask for cross browser checks and comfort with browser tools, and these are skills you can show quickly in a portfolio.

## What to check on a website

* **Different browsers:** Chrome, Firefox, Edge and Safari can show the same page differently. Opera Mini and other data saving browsers are also used locally.
* **Different screen sizes:** a small phone, a large phone, a tablet and a computer. Look for text that overflows, buttons hidden off screen and menus that cannot be opened.
* **Forms:** required fields, error messages, what happens on refresh, and whether your typed data is lost when you press back.
* **Links and images:** broken links, missing images, pages that never finish loading.
* **Slow networks:** does the page show something useful quickly, or a blank screen for a long time?

You can check page behaviour on any phone or computer. The developer tools below need a desktop browser on a laptop or desktop computer, because phone browsers do not include them.

## Browser developer tools

Desktop browsers include free developer tools. In Chrome or Edge on Windows, press F12 or Ctrl+Shift+I; on a Mac, press Cmd+Option+I. Three panels matter most for testers:

* **Console:** shows errors from the page's code. A red error that appears when you click a button is valuable evidence for a bug report. Copy the message exactly.
* **Network:** lists every request the page makes. You can see which request failed, its status code and how long it took. A failed request with a 500 status points to a server problem.
* **Device mode:** the toolbar icon that looks like a phone and tablet, or Ctrl+Shift+M in Chrome on Windows. It shows the page at phone sizes so you can try many screen widths quickly. It is a simulation, so confirm important findings on a real phone.

The Network panel also has a **throttling** menu where you can choose a slower preset, such as 3G, to feel what users on weak connections experience.

## A small example

Mariama tests a Tamale guesthouse's booking website. On her phone, the Book now button does nothing. On a library computer she opens Chrome's developer tools. The Console shows a red error when she clicks the button, and the Network panel shows no booking request was sent. Using device mode she confirms the problem only appears below a certain screen width. Her bug report includes the exact console message, a screenshot of the Network panel and the widths that fail. The developer fixes it the same day.

## Habits for web testing

* Clear the browser cache or use a private window when retesting, so you are not seeing an old copy of the page.
* Note the browser name and version in every bug report; you can find it in the browser's About page.
* Test with images slow to load, because many users have them turned off or on slow data.`,
      practice_task_md: `**Goal:** use browser tools to inspect a real website.

You need a laptop or desktop computer with Chrome, Edge or Firefox for steps 2 to 5. If you only have a phone today, do step 1 and come back to the rest when you can use a computer at school, a hub or a library.

1. On any device, open a public website you know and check it at your screen size. Note anything broken.
2. On a computer, open developer tools and look at the Console while you use the site. Write down any red errors.
3. Open the Network panel, reload the page and find the slowest request.
4. Use device mode to view the page at two phone sizes. Note any layout problems.
5. Set throttling to a slow preset and reload. Note how long until something useful appears.

**Done looks like:** a short web test report with findings, screenshots of the tools, and browser versions.`,
      quiz: {
        questions: [
          {
            prompt: "Which developer tools panel shows errors from the page's code?",
            options: ["Network", "Console", "Device mode", "Settings"],
            answer_index: 1,
            explanation: "The Console lists code errors, which are useful evidence in bug reports.",
          },
          {
            prompt: "What does a failed request with a 500 status in the Network panel suggest?",
            options: [
              "The user typed a wrong password",
              "The screen is too small",
              "The browser is out of date",
              "A problem on the server",
            ],
            answer_index: 3,
            explanation: "A 500 status points to a server side problem.",
          },
          {
            prompt: "Why should you confirm device mode findings on a real phone?",
            options: [
              "Device mode only works at night",
              "Real phones show the Console",
              "Device mode is a simulation and may not match a real phone exactly",
              "Developers do not accept screenshots",
            ],
            answer_index: 2,
            explanation: "Device mode simulates screen sizes; important bugs should be confirmed on real devices.",
          },
          {
            prompt: "What does the throttling menu let you do?",
            options: [
              "Change the website's colours",
              "Delete the browser history",
              "Translate the page",
              "Simulate a slower connection such as 3G",
            ],
            answer_index: 3,
            explanation: "Throttling simulates slow networks so you can see what users on weak connections experience.",
          },
          {
            prompt: "Why use a private window when retesting a fix?",
            options: [
              "It is faster to type in",
              "So you are not seeing an old cached copy of the page",
              "Private windows show more errors",
              "Developers require it",
            ],
            answer_index: 1,
            explanation: "A private window avoids old cached files hiding whether the fix worked.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "mobile-testing": {
      explanation_md: `## Why this matters

For many people in Ghana, an Android phone is their main way to use the internet, and many of those phones are budget models with limited storage and older software. Testing adverts in Ghana and on remote boards name Android and mobile testing often. If you own an Android phone, you already have a test lab.

## How mobile users really meet an app

Testing on a new, fast phone over office Wi-Fi hides most real problems. Think about the conditions your users live with:

* **Storage almost full:** the app may fail to install, update or save photos.
* **Older Android versions:** features that work on new phones may crash on old ones.
* **Small screens:** buttons hidden under the keyboard, text cut off, dialogs that cannot be closed.
* **Patchy data:** moving between 3G, 4G, Wi-Fi and no signal, or data running out mid payment.
* **Interruptions:** an incoming call, an SMS, a low battery warning, switching to WhatsApp and back.
* **Battery saver and data saver modes:** these can stop background tasks such as notifications.
* **Shared phones:** another family member signs in, or the phone is restarted halfway through.

## Capturing evidence on a phone

* **Device details:** Settings, then About phone, shows the model and Android version. The exact menu names differ between brands.
* **App version:** usually in the app's own Settings or About screen, or on its app store page.
* **Screen recording:** many Android phones have a built in screen recorder in the quick settings panel. A 20 second recording often explains a bug better than paragraphs of text.
* **Screenshots:** usually the power and volume down buttons pressed together.

## Developer options

Android has a hidden Developer options menu. On most phones you open Settings, then About phone, and tap Build number seven times. Exact steps vary by brand. Two settings are useful for testers:

* **Show taps:** draws a dot where you touch, which makes screen recordings much clearer.
* **Don't keep activities:** closes each screen as soon as you leave it, which reveals apps that lose your data when you switch away and come back.

Change only settings you understand, and turn them back off when you finish.

## A small example

Fuseini tests a farm inputs ordering app on an older Android phone with little free storage. He fills a long order, switches to WhatsApp to check a price, and returns. With Don't keep activities switched on, the order form is empty. He records the screen with Show taps on, notes the phone model, Android version and app version, and reports it. On the developer's new phone with lots of memory, the bug had never appeared.

## Testing safely

Use your own accounts and small amounts only, never other people's details. If an app involves money, ask the team for a test account or a test environment rather than using real funds.`,
      practice_task_md: `**Goal:** test an Android app under real world conditions.

You need an Android phone for the developer options steps. If you use an iPhone, do the other steps; iPhones have their own screen recorder in Control Centre.

1. Find your phone's model and software version and write them down.
2. Choose a free app you can use without spending money, such as a notes, news or weather app.
3. Try at least four conditions from the lesson: switch off data mid task, take or simulate a call, switch apps and return, rotate the screen, or turn on battery saver.
4. Turn on Show taps in Developer options and record a short screen recording of anything odd.
5. Turn off any developer settings you changed.

**Done looks like:** a mobile test note listing device details, conditions tried, results and at least one short recording.`,
      quiz: {
        questions: [
          {
            prompt: "Why should mobile testing include phones with nearly full storage?",
            options: [
              "Full phones run apps faster",
              "Storage does not affect apps",
              "Apps may fail to install, update or save on them",
              "App stores block full phones",
            ],
            answer_index: 2,
            explanation: "Low storage is common on budget phones and causes install and save failures.",
          },
          {
            prompt: "On most Android phones, how do you unlock Developer options?",
            options: [
              "Restart the phone three times",
              "Download a special app",
              "Hold the power button for a minute",
              "Tap Build number seven times in About phone",
            ],
            answer_index: 3,
            explanation: "Tapping Build number seven times reveals Developer options, though steps vary by brand.",
          },
          {
            prompt: "What does the Show taps setting do?",
            options: [
              "Draws a dot where you touch, making recordings clearer",
              "Counts how many apps are installed",
              "Shows hidden files",
              "Speeds up the screen",
            ],
            answer_index: 0,
            explanation: "Visible touches help developers follow a screen recording.",
          },
          {
            prompt: "Why did Fuseini's bug never appear on the developer's phone?",
            options: [
              "The developer used a different language",
              "The developer's phone had no WhatsApp",
              "The bug only happens on Fridays",
              "The developer's new phone had plenty of memory, so the screen was not closed",
            ],
            answer_index: 3,
            explanation: "Lower memory phones close screens in the background, revealing lost data bugs.",
          },
          {
            prompt: "What is the safe way to test an app that handles money?",
            options: [
              "Use a friend's account",
              "Ask for a test account or test environment instead of using real funds",
              "Send large amounts to check limits",
              "Use any account you can find",
            ],
            answer_index: 1,
            explanation: "Test accounts and environments let you test payments without risking real money.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "api-testing": {
      explanation_md: `## Why this matters

Apps and websites get their data from servers through APIs. Testing the API directly finds bugs the screen hides, such as a server that accepts a negative amount or confirms the same payment twice. API testing appears in several adverts for testing roles, including remote ones, and Postman is a common tool for it.

## How an API request works

When an app shows your balance, it sends a **request** to the server and receives a **response**. A request has:

* **A method:** what you want to do. GET reads data, POST creates something, PUT or PATCH changes something, DELETE removes something.
* **A URL:** the address, such as \`https://api.example.com/accounts/42\`.
* **Headers:** extra information, often including a token that proves who you are.
* **A body:** for POST and PUT, the data you send, usually written in JSON.

The response has a **status code** and usually a JSON body. Status codes you should know:

* **200** OK, and **201** Created
* **400** Bad request: the data sent was wrong
* **401** Unauthorised: not signed in, or **403** Forbidden: signed in but not allowed
* **404** Not found
* **500** Server error: something broke on the server

## Testing with Postman

Postman lets you build requests, send them and check responses. It runs in a web browser or as a desktop app, and it is free for individuals. A computer is much easier for this work, because you type URLs and JSON and read long responses. Postman's web version can open on a phone browser, but it is cramped.

To practise safely, use a free public practice API such as JSONPlaceholder, which returns made up data and is built for learning. Try:

* GET \`https://jsonplaceholder.typicode.com/users/1\` and check the status is 200 and the body has a name.
* GET \`https://jsonplaceholder.typicode.com/users/9999\` and check you receive 404.
* POST to \`https://jsonplaceholder.typicode.com/posts\` with a small JSON body and check for 201.

Postman lets you save these in a **collection** and add small automatic checks, written in JavaScript, in each request's tests or scripts area. For example:

\`\`\`js
pm.test("status is 200", () => {
  pm.response.to.have.status(200);
});
\`\`\`

## What to test in an API

* Valid requests return the right data and status.
* Invalid data returns a clear 400 error, not a 500 crash.
* Requests without a token are refused.
* The same request sent twice does not create a duplicate payment or order.
* Boundary values work just as on screen: zero, maximum and just over.

## A small example

Amina tests a market traders' app. The screen blocks amounts over 2,000 cedis, but in Postman she sends 5,000 to the API and it is accepted. Anyone who bypassed the app could break the rule. Her bug report includes the request, the response and the status code.

Only test APIs you have permission to test: practice APIs, or your employer's test environment.`,
      practice_task_md: `**Goal:** send and check your first API requests.

A laptop or desktop computer is strongly recommended for this task. The requests use very little data.

1. Open Postman in a browser (create a free account) or install the desktop app.
2. Create a collection called "Practice API".
3. Send the three JSONPlaceholder requests from the lesson. Note each status code.
4. Add the status check script to the first request and confirm it passes.
5. Add one negative request of your own, such as an unknown post number, and write what you expected and what you got.

**Done looks like:** a saved collection with four requests and a short note of results. Postman can export the collection as a file for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which HTTP method is used to read data?",
            options: ["POST", "GET", "DELETE", "PUT"],
            answer_index: 1,
            explanation: "GET reads data; POST creates, PUT and PATCH change, DELETE removes.",
          },
          {
            prompt: "What does a 404 status code mean?",
            options: ["Not found", "Created", "Server error", "OK"],
            answer_index: 0,
            explanation: "404 means the requested resource was not found.",
          },
          {
            prompt: "If you send invalid data, which response is better behaviour?",
            options: [
              "A clear 400 error",
              "A 500 server crash",
              "A 200 OK that saves the bad data",
              "No response at all",
            ],
            answer_index: 0,
            explanation: "Invalid data should be rejected with a clear 400, not crash the server or be accepted.",
          },
          {
            prompt: "What bug did Amina find by testing the API directly?",
            options: [
              "The screen was too small",
              "The app crashed on start",
              "The login page was slow",
              "The API accepted 5,000 cedis although the screen blocked amounts over 2,000",
            ],
            answer_index: 3,
            explanation: "The rule was only enforced on screen, not on the server.",
          },
          {
            prompt: "Which APIs should you test?",
            options: [
              "Any company's API you can find",
              "Practice APIs or your employer's test environment, where you have permission",
              "Bank APIs using real accounts",
              "Government systems",
            ],
            answer_index: 1,
            explanation: "Only test APIs you are allowed to test.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "accessibility-and-usability": {
      explanation_md: `## Why this matters

Some people who use the products you test have low vision, shaky hands, colour blindness or little experience with apps. Others are reading in bright sunlight on a cracked screen. If a product only works for confident users with perfect eyesight, it fails many real customers. Accessibility and usability checks are quick, need no special equipment, and catch problems that functional tests miss.

## Accessibility: can everyone use it?

A few simple checks, all possible on a phone or computer:

* **Text size:** increase the font size in your device settings, or zoom the browser to 200 percent. Does text still fit, or does it overlap and cut off?
* **Contrast:** is light grey text on a white background readable outdoors? Low contrast is one of the most common problems.
* **Colour alone:** if errors are shown only in red, colour blind users may miss them. There should also be text or an icon.
* **Touch targets:** are buttons big enough and far enough apart to tap without hitting the wrong one?
* **Screen readers:** Android's TalkBack and Apple's VoiceOver read the screen aloud for blind users. Turn one on briefly and check that buttons are announced with meaningful names, such as "Send money", not just "Button".
* **Images:** important images on websites should have text alternatives describing them.
* **Keyboard:** on a computer website, can you reach every link and button using only the Tab key, and can you see where you are?

Screen readers change how your device works. Learn how to turn yours off before you turn it on.

## Usability: does it make sense?

Usability is about whether people can complete tasks easily. Ways to check:

* **First time eyes:** try a task as if you have never seen the app. Where do you hesitate?
* **Watch someone:** ask a friend or relative to complete a task while you watch quietly. Note where they get stuck, but do not help unless they ask.
* **Clear words:** are labels and error messages in plain language? "Error 0x45" helps nobody; "Your number is too short" does.

## A small example

Mariama tests a clinic appointment website. Functionally, it works. But when she sets her phone's text to large, the Book button disappears off the screen. With TalkBack on, the date picker is announced only as "Button, button, button". She watches her aunt try to book and sees her give up at a form asking for a "Reference ID" she does not understand. Three findings, all from simple checks.

## Reporting these findings

Write accessibility and usability findings as bug reports with steps, device settings used (such as large text or TalkBack on) and screenshots. Explain who is affected, without exaggerating.`,
      practice_task_md: `**Goal:** run five quick accessibility and usability checks.

1. Choose a public website or free app.
2. Increase text size or zoom to 200 percent and note what breaks.
3. Look for low contrast text and anything shown by colour alone.
4. Learn how to turn your screen reader off first, then turn it on for two minutes and note how buttons are announced.
5. Ask one person to complete a simple task on it while you watch quietly, and note where they hesitate.

**Done looks like:** a short report with at least three findings, each with the setting used and a screenshot where possible.`,
      quiz: {
        questions: [
          {
            prompt: "Why is showing errors only in red a problem?",
            options: [
              "Red uses more battery",
              "Red is not allowed on websites",
              "Red text loads slowly",
              "Colour blind users may miss them without text or an icon",
            ],
            answer_index: 3,
            explanation: "Information should not rely on colour alone.",
          },
          {
            prompt: "What should a screen reader announce for a send money button?",
            options: [
              "Just Button",
              "Nothing at all",
              "A meaningful name such as Send money",
              "The colour of the button",
            ],
            answer_index: 2,
            explanation: "Buttons need meaningful labels so blind users know what they do.",
          },
          {
            prompt: "When watching someone use a product for a usability check, what should you do?",
            options: [
              "Tell them each step to take",
              "Watch quietly and note where they get stuck, helping only if asked",
              "Complete the task for them",
              "Leave the room",
            ],
            answer_index: 1,
            explanation: "Quiet observation reveals where real users struggle.",
          },
          {
            prompt: "What problem did Mariama find when she set her phone's text to large?",
            options: [
              "The Book button disappeared off the screen",
              "The website loaded faster",
              "The colours changed",
              "The date picker was announced correctly",
            ],
            answer_index: 0,
            explanation: "Large text pushed the Book button out of view.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "working-in-a-team": {
      explanation_md: `## Why this matters

Testers rarely work alone. You will sit inside a product team with developers, a product manager and perhaps a designer, all working towards a release date. Knowing how teams organise their work, where bugs and tasks are tracked, and how to report on testing is what turns a careful individual into a useful team member. Several testing adverts we read named Agile ways of working and tools like Jira directly.

## How software teams organise work

Most software teams today work in short cycles. Instead of building for a year and testing at the end, they plan a small piece of work, build it, test it and release it, then repeat. Each cycle might last one or two weeks. This means testing happens all the time, alongside development, and you need to keep up with a steady flow of changes.

Teams track every piece of work in an **issue tracker**: a shared list where each task, feature and bug is a card or ticket with a status such as To do, In progress, In review, Testing and Done. Testers spend a lot of time in these tools: reading feature tickets, logging bugs and moving tickets along when testing passes.

## What this section covers

* **Agile teams and issue trackers.** The vocabulary of sprints, user stories, acceptance criteria and stand ups, and how to work in a tracker such as Jira.
* **Test plans, regression and reporting.** How to plan what will be tested before a release, how to recheck old features after changes, and how to summarise results so the team can decide whether to release.

## Communication is part of the job

Being right about a bug is not enough; you need to share it in a way that helps. Good team habits for testers:

* **Raise risks early,** at the planning stage, not on release day.
* **Be specific,** with ticket numbers, steps and evidence, rather than "the app is buggy".
* **Be calm under pressure.** Releases can be stressful. A clear, factual message helps everyone decide.
* **Respect developers' time.** Group small questions together and check the tracker before asking.
* **Celebrate fixes.** Thank developers when they fix things. Testers and developers are on the same side.

## A small example

Issahaku works as a tester for a company building a crop prices app. On Monday the team plans a two week cycle with four features. He reads each ticket and asks how prices should show when the market has not updated today. Midweek he tests the first feature, logs two bugs in the tracker and links them to the feature ticket. On the second Thursday he reruns his regression checks on the whole app and writes a short summary: all four features tested, one minor bug still open, one area he could not test because the test server was down. The product manager decides to release with a note about the open bug. Issahaku's clear summary made that decision easy.

## Remote teams

Remote testing roles work the same way, but almost everything happens in writing: tickets, chat messages and recorded demos. Strong written communication matters even more when your team is in another country.`,
      practice_task_md: `**Goal:** set up a simple tracker for your own testing work.

1. Use a free board tool such as Trello, GitHub Projects or a spreadsheet, on any device.
2. Create columns: To do, In progress, Testing, Done.
3. Add cards for the testing tasks from earlier lessons and for any bugs you have found.
4. Move each card to the right column and add one comment to each with a short status.
5. Write a three sentence status update as if for a team stand up: what you did, what you will do next, anything blocking you.

**Done looks like:** a small board with at least six cards, plus a written status update.`,
      quiz: {
        questions: [
          {
            prompt: "How do most software teams organise work today?",
            options: [
              "One large build for a year, then testing at the end",
              "Short cycles of planning, building, testing and releasing that repeat",
              "Testing only after customers complain",
              "Developers and testers working in separate companies",
            ],
            answer_index: 1,
            explanation: "Short repeating cycles mean testing happens continuously alongside development.",
          },
          {
            prompt: "What is an issue tracker?",
            options: [
              "A shared list where each task, feature and bug is a ticket with a status",
              "A tool that fixes bugs automatically",
              "A phone's battery monitor",
              "A report sent to customers",
            ],
            answer_index: 0,
            explanation: "Trackers hold every piece of work with its current status.",
          },
          {
            prompt: "What did Issahaku include in his release summary?",
            options: [
              "Only the features that passed",
              "Features tested, an open bug and an area he could not test",
              "A list of developers' mistakes",
              "Nothing, he released the app himself",
            ],
            answer_index: 1,
            explanation: "A good summary includes what passed, what is open and what could not be tested.",
          },
          {
            prompt: "Why does written communication matter even more in remote testing roles?",
            options: [
              "Almost everything happens through tickets, chat and recordings",
              "Remote teams never meet or talk",
              "Remote testers do not report bugs",
              "Writing is faster than testing",
            ],
            answer_index: 0,
            explanation: "Remote work relies on clear writing in tickets and messages.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "agile-and-issue-trackers": {
      explanation_md: `## Why this matters

When you join a team, you will hear words like sprint, story, acceptance criteria and stand up from the first day. Adverts for testing roles in Ghana and on remote boards often mention Agile and Jira. Knowing the vocabulary means you can start contributing quickly instead of spending weeks working out what people mean.

## Agile and Scrum in plain words

**Agile** is a family of ways of working where teams deliver software in small pieces, get feedback and adjust. **Scrum** is one popular Agile method. Its key parts:

* **Sprint:** a fixed cycle, often one or two weeks, in which the team aims to finish a set of work.
* **Backlog:** the ordered list of all work waiting to be done.
* **Sprint planning:** a meeting at the start of each sprint to choose work from the backlog.
* **Stand up:** a short daily meeting where each person says what they did, what they will do and what is blocking them.
* **Review and retrospective:** at the end of the sprint, the team shows what was built and discusses how to work better.

Not every team uses Scrum exactly. Some use **Kanban**, a continuous flow of work across a board without fixed sprints. The habits of small pieces, visible work and regular feedback are common to both.

## User stories and acceptance criteria

Features are often written as **user stories** in a simple pattern: "As a [type of user], I want [something] so that [reason]." For example: "As a market trader, I want to see today's total sales so that I know if I made a profit."

Each story has **acceptance criteria**: the conditions that must be true for the story to be done. These are a tester's best friend, because they tell you what to test. Many teams write them in a Given, When, Then pattern:

* **Given** I have recorded three sales today
* **When** I open the summary screen
* **Then** I see the total of those three sales in cedis

When you read acceptance criteria before development starts, look for gaps. What if there are no sales today? What about refunds? Asking these questions early is one of the most valuable things a tester does. Reviewing written requirements like this, before any code exists, is sometimes called static testing.

## Working in an issue tracker

Tools such as Jira, GitHub Issues, Linear, Trello or Azure Boards all hold work as tickets. As a tester you will:

* Read story tickets and their acceptance criteria.
* Log bugs as new tickets and link them to the story they affect.
* Move tickets through statuses, such as from Testing to Done when your tests pass.
* Comment with findings, evidence and questions.
* Filter and search to find bugs assigned to you or waiting to be retested.

## A small example

Hawa's sprint includes the trader sales story above. Reading the criteria in planning, she asks what the total should show if a sale was refunded. The product manager adds a fourth criterion. During the sprint, Hawa writes test cases from each criterion, finds that refunds are counted twice, logs a bug linked to the story and moves the story back to In progress. When the fix arrives, she retests and moves it to Done.`,
      practice_task_md: `**Goal:** turn a user story into acceptance criteria and tests.

1. Write a user story for a simple feature you can imagine, such as a church WhatsApp group bot that lists this week's events.
2. Write three acceptance criteria in Given, When, Then form.
3. List two questions that expose gaps in the criteria, such as "what if there are no events this week?"
4. Write one test case for each criterion.
5. If you set up a board in the previous lesson, add the story as a card and link your test cases to it.

**Done looks like:** one story, three criteria, two gap questions and three test cases, saved in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What is a sprint in Scrum?",
            options: [
              "A fixed cycle, often one or two weeks, to finish a set of work",
              "A fast way of typing code",
              "A meeting held once a year",
              "A type of bug",
            ],
            answer_index: 0,
            explanation: "A sprint is a short fixed cycle of work.",
          },
          {
            prompt: "Why are acceptance criteria useful to testers?",
            options: [
              "They list the developers on the team",
              "They set the release date",
              "They replace bug reports",
              "They tell you the conditions that must be true, so you know what to test",
            ],
            answer_index: 3,
            explanation: "Acceptance criteria define done, which tells testers what to check.",
          },
          {
            prompt: "Which line follows the Given, When, Then pattern correctly?",
            options: [
              "Given I have three sales, When I open the summary, Then I see their total",
              "When the app is good, Then it is done",
              "Given the developer, Then the bug",
              "Then I test, When I finish, Given I start",
            ],
            answer_index: 0,
            explanation: "Given sets the starting state, When is the action, Then is the expected outcome.",
          },
          {
            prompt: "What happens in a daily stand up?",
            options: [
              "The team releases the app",
              "Customers test the product",
              "Each person shares what they did, what they will do and any blockers",
              "The manager writes all the code",
            ],
            answer_index: 2,
            explanation: "A stand up is a short daily check on progress and blockers.",
          },
          {
            prompt: "In Hawa's example, what did she do after finding that refunds were counted twice?",
            options: [
              "Logged a bug linked to the story and moved the story back to In progress",
              "Ignored it until the next sprint",
              "Fixed the code herself",
              "Deleted the story",
            ],
            answer_index: 0,
            explanation: "Linking the bug and moving the story keeps the team's board accurate.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "test-plans-and-regression": {
      explanation_md: `## Why this matters

Before any release, someone has to answer: what will we test, how, and are we ready? Adverts for testing roles ask for test plans and test reporting, and regression testing is a core part of every tester's routine. This is also where you show the judgement that makes teams trust you.

## Test plans

A test plan is a short document that sets out the testing for a release or project. It does not need to be long. A useful one answers:

* **Scope:** which features are in and which are out.
* **Approach:** what kinds of testing you will do, such as test cases, exploratory sessions, API checks and accessibility checks.
* **Environments and devices:** which browsers, phones, Android versions and test servers.
* **Test data:** what accounts and data you need.
* **Risks:** what could go wrong with the testing itself, such as a late build or no access to a payment test account.
* **Entry and exit criteria:** when testing can start, and what "ready to release" means, for example no open critical bugs.
* **Schedule and people:** who tests what and by when.

A one page plan that the team reads beats a long one nobody opens.

## Regression testing

Every change can break something that used to work. A developer fixing the sign in screen might accidentally break password reset. **Regression testing** means rechecking existing features after changes. Teams keep a **regression suite**: a set of test cases covering the most important flows, rerun before each release.

Because you cannot rerun everything every time, choose by risk:

* The flows customers use most, such as sign in and payments.
* Areas near the change.
* Areas that have broken before.

Regression suites are the first thing teams automate, because the same checks repeat every release. That is one reason the next section matters.

Also note the difference between **retesting**, which checks that a specific bug is fixed, and **regression testing**, which checks that the fix did not break anything else.

## Reporting results

At the end of testing, write a short summary for people deciding whether to release. Use plain language:

* What was tested, on which devices and environments.
* How many test cases passed, failed or were blocked.
* Open bugs, with the serious ones listed by title.
* Risks: anything you could not test and why.
* Your recommendation, clearly labelled as a recommendation.

## A small example

Sumaila writes a one page plan for a new version of a bus ticket booking app: booking and payment in scope, Android 10 and above plus Chrome on desktop, exit criterion of no critical bugs. Before release he runs his twenty case regression suite. Booking passes, but the change to payments has broken the receipt SMS. He logs it as critical. His summary reads: "Booking ready; receipt SMS broken; could not test on iPhone, no device available. Recommend fixing the SMS before release." The team agrees.`,
      practice_task_md: `**Goal:** write a one page test plan and a small regression suite.

1. Choose an app or website you have tested in earlier lessons.
2. Write a one page test plan with the seven headings from the lesson.
3. Pick the five most important flows and write one regression test case for each.
4. Run your suite and record pass, fail or blocked.
5. Write a five line test summary with a clear recommendation.

**Done looks like:** a test plan, a five case regression suite with results, and a summary, all saved in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What is regression testing?",
            options: [
              "Testing a feature for the first time",
              "Testing only on old phones",
              "Rechecking existing features after changes to make sure nothing broke",
              "Removing old features",
            ],
            answer_index: 2,
            explanation: "Regression testing catches changes that break previously working features.",
          },
          {
            prompt: "What is the difference between retesting and regression testing?",
            options: [
              "There is no difference",
              "Retesting is automated; regression is manual",
              "Retesting checks a specific fix; regression testing checks the fix did not break anything else",
              "Regression testing is only for websites",
            ],
            answer_index: 2,
            explanation: "Retesting confirms the bug is fixed; regression checks the wider product.",
          },
          {
            prompt: "Which is an example of an exit criterion?",
            options: [
              "No open critical bugs",
              "The tester's lunch break",
              "The number of developers",
              "The app's colour scheme",
            ],
            answer_index: 0,
            explanation: "Exit criteria define what ready to release means.",
          },
          {
            prompt: "Why are regression suites often the first tests to be automated?",
            options: [
              "They are the hardest to understand",
              "Automation is only allowed for regression",
              "They never find bugs",
              "The same checks repeat every release",
            ],
            answer_index: 3,
            explanation: "Repeated checks are ideal for automation.",
          },
          {
            prompt: "What did Sumaila's summary include besides results?",
            options: [
              "Blame for the developer who broke the SMS",
              "A risk he could not test and a clear recommendation",
              "Only the number of passed tests",
              "A new feature idea",
            ],
            answer_index: 1,
            explanation: "Good summaries name untested risks and give a labelled recommendation.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "test-automation": {
      explanation_md: `## Why this matters

Many testing adverts in Ghana and on remote boards ask for automation alongside manual skills, and testers who can automate have more options, including roles as automation or QA engineers. Automation does not replace manual testing; it takes over the repetitive checks so people can spend their time on thinking and exploring.

## What test automation is

Test automation means writing code that runs checks for you. An automated test might open a browser, go to a sign in page, type a phone number and password, press Sign in, and confirm that the dashboard appears. Once written, it can run hundreds of times, on every change, in minutes.

Good candidates for automation:

* **Regression checks** that repeat every release.
* **Important flows** such as sign in, payments and checkout.
* **Data heavy checks,** such as trying the same form with fifty inputs.
* **API checks** that are fast and stable.

Poor candidates:

* Features that change every week.
* Checks that need human judgement, such as "is this screen confusing?"
* One off tests you will run only once.

## What this section covers

* **Enough programming to automate.** Variables, conditions, loops and functions in JavaScript or Python, plus a little SQL for checking data.
* **Browser and app automation.** Tools such as Playwright, Cypress and Selenium that drive a browser like a person would.
* **Running tests automatically** (optional). Connecting your tests to a pipeline so they run every time someone changes the code.

## You need a computer from here

Automation tools run on Windows, macOS or Linux, and you install a code editor, a language runtime such as Node.js or Python, and browsers. A phone is not enough for this section. If you do not own a laptop, look for one you can use regularly at a school lab, a library, a tech hub or a community centre. A modest laptop with 8 GB of memory is comfortable for small projects; less can work slowly. Installing tools needs a few hundred megabytes of data once, so do it on Wi-Fi if you can.

## Keep your manual skills

Automated tests only check what someone told them to check. The skills from earlier sections, such as choosing tests by risk, boundary values and clear bug reports, decide whether your automation is useful. A badly chosen automated test is just a fast way to check the wrong thing.

## A small example

Wumpini's team releases a delivery app every week. Each release she spent most of a day rerunning thirty regression test cases by hand. Over two months she automated the twenty most stable ones using Playwright. Now they run in about ten minutes whenever a developer pushes code. When a change broke the delivery address form, the automated test failed before the release and the developer fixed it the same hour. Wumpini now spends her freed time on exploratory sessions, where she finds the bugs automation cannot.

## A realistic path

Start small. Automate one test case you already wrote by hand, make it pass reliably, then add another. A handful of solid, well named tests in a public project is more impressive to employers than a large, flaky suite.`,
      practice_task_md: `**Goal:** choose what you would automate first.

1. Look at the test cases and regression suite you wrote in earlier lessons.
2. Sort them into three groups: good to automate, poor to automate, unsure.
3. For each, write one sentence explaining why, using the guidance in the lesson.
4. Pick the single best first candidate and write down the exact steps and checks an automated test would need.
5. Plan where you will get regular computer access for the next lessons.

**Done looks like:** a sorted list with reasons, one chosen test written out step by step, and a note on your computer access plan.`,
      quiz: {
        questions: [
          {
            prompt: "Which is a good candidate for automation?",
            options: [
              "A feature that changes every week",
              "Deciding whether a screen is confusing",
              "A regression check that repeats every release",
              "A one off test",
            ],
            answer_index: 2,
            explanation: "Repeated, stable checks give the most value when automated.",
          },
          {
            prompt: "Why does this section need a computer?",
            options: [
              "Phones cannot open websites",
              "Computers are required by law",
              "Automation needs a printer",
              "Automation tools run on desktop operating systems with an editor, runtime and browsers",
            ],
            answer_index: 3,
            explanation:
              "You install Node.js or Python, a code editor and browsers, which need Windows, macOS or Linux.",
          },
          {
            prompt: "What did Wumpini do with the time automation saved?",
            options: [
              "She spent it on exploratory sessions",
              "She stopped testing",
              "She automated every test including unstable ones",
              "She moved to marketing",
            ],
            answer_index: 0,
            explanation: "Automation freed her to explore and find bugs scripts miss.",
          },
          {
            prompt: "Why do manual testing skills still matter once you automate?",
            options: [
              "Automation tools need manual approval to run",
              "Manual skills make code run faster",
              "Automated tests only check what someone chose to check",
              "They do not matter after automation",
            ],
            answer_index: 2,
            explanation: "Good test choices decide whether automation is useful.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "programming-for-testers": {
      explanation_md: `## Why this matters

Automation adverts ask for a programming language, often Java, Python or JavaScript, and several also list SQL. You do not need to become a full developer first. You need to read code confidently, write small programs, and change a test when the app changes. This lesson shows the building blocks; practise them in short daily sessions.

## Choose one language

Pick JavaScript or Python and stay with it for a few months.

* **JavaScript** is the language of the web. Playwright and Cypress tests are commonly written in it (or TypeScript, which adds types to JavaScript). You install Node.js to run it on your computer.
* **Python** reads almost like English and is popular for scripting and data. Selenium and Playwright both support it.

Both are free. This track's examples use JavaScript, but every idea carries over.

## The four building blocks

**Variables** store values:

\`\`\`js
const price = 40;
let plates = 3;
\`\`\`

**Conditions** choose what to do:

\`\`\`js
if (plates * price > 100) {
  console.log("Free delivery");
} else {
  console.log("Delivery fee applies");
}
\`\`\`

**Loops** repeat work, which is perfect for trying many test inputs:

\`\`\`js
const amounts = [0, 1, 5000, 5001];
for (const amount of amounts) {
  console.log(amount, amount >= 1 && amount <= 5000);
}
\`\`\`

**Functions** package steps so you can reuse them:

\`\`\`js
function isValidAmount(amount) {
  return amount >= 1 && amount <= 5000;
}
\`\`\`

Notice that the loop above is boundary value testing from the manual section, written as code.

## Async code

Browser automation waits for pages to load and buttons to appear, so test code uses \`async\` functions and the \`await\` keyword. \`await\` means "wait for this step to finish before the next one". You will see it on almost every line of a Playwright test.

## A little SQL

Many apps store data in databases. Testers use SQL to confirm what the app saved, for example that a payment record exists after a test:

\`\`\`sql
SELECT id, amount, status
FROM payments
WHERE phone = '0241234567';
\`\`\`

Learn SELECT, WHERE and ORDER BY first. Only run queries on test databases you are allowed to use.

## Tools you need

A computer with a free code editor such as Visual Studio Code, and Node.js for JavaScript or Python. While you are away from your computer, you can still read code and practise small exercises in a free browser based editor, but install the real tools for this section.

## A small example

Abdul-Rahman practises for thirty minutes each evening at a hub in Tamale. After a few weeks he writes a small function that checks whether a Ghanaian phone number has ten digits and starts with 0, and a loop that tests it against twelve numbers he chose with partitioning. That small script later becomes the first file in his automation portfolio.`,
      practice_task_md: `**Goal:** write a tiny program that tests a rule.

You need a computer with Node.js and a code editor, or a free browser based JavaScript editor if you are not yet set up.

1. Write a function \`isValidPhone(number)\` that returns true when the text has exactly ten digits and starts with 0.
2. Make a list of at least eight test inputs using partitions and boundaries: nine digits, ten digits, eleven digits, letters, spaces, and so on.
3. Loop over the list and print each input with the result.
4. Write down which results surprised you and fix the function if needed.

**Done looks like:** a short script file and a printed list of inputs and results. Save it; it starts your automation project.`,
      quiz: {
        questions: [
          {
            prompt: "What does a loop let you do in test code?",
            options: [
              "Repeat work, such as trying many test inputs",
              "Store a single value",
              "Connect to the internet",
              "Make the code run only once",
            ],
            answer_index: 0,
            explanation: "Loops repeat steps, which is ideal for checking many inputs.",
          },
          {
            prompt: "What does the await keyword mean in automation code?",
            options: [
              "Skip this step",
              "Wait for this step to finish before the next one",
              "Run the test tomorrow",
              "Delete the previous line",
            ],
            answer_index: 1,
            explanation: "await pauses until the step completes, which browser automation needs.",
          },
          {
            prompt: "Why might a tester use SQL?",
            options: [
              "To design the app's logo",
              "To send SMS messages",
              "To confirm what the app saved in a test database",
              "To speed up the phone",
            ],
            answer_index: 2,
            explanation: "SQL lets testers check stored data, such as a payment record.",
          },
          {
            prompt:
              "The loop over the amounts 0, 1, 5000 and 5001 is an example of which manual technique written as code?",
            options: ["Exploratory testing", "Usability testing", "Boundary value testing", "Bug reporting"],
            answer_index: 2,
            explanation: "Those values sit at and beside the edges of the 1 to 5,000 range.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "ui-automation": {
      explanation_md: `## Why this matters

Browser automation tools appear across testing adverts: Selenium most often in the ones we read, with Cypress, Playwright and Appium (for mobile apps) also named. They drive a real browser like a person would. Learn one tool well; the ideas transfer between them.

## Setting up Playwright (one example)

On a computer with Node.js installed, open a terminal in an empty folder and run:

\`\`\`bash
npm init playwright@latest
\`\`\`

This installs Playwright, its browsers and an example test. The download is a few hundred megabytes, so use Wi-Fi if you can. Run tests with \`npx playwright test\`.

## A first test

This example uses Playwright's public practice to do app:

\`\`\`js
import { test, expect } from '@playwright/test';

test('adds a to do item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  const box = page.getByPlaceholder('What needs to be done?');
  await box.fill('Buy shea butter');
  await box.press('Enter');
  await expect(page.getByText('Buy shea butter')).toBeVisible();
});
\`\`\`

Every test has the same shape as a manual test case: go somewhere, act, then check an expected result. The \`expect\` line is the expected result from your test case.

## The same idea in Cypress (another example)

\`\`\`js
describe('to do list', () => {
  it('adds an item', () => {
    cy.visit('https://demo.playwright.dev/todomvc');
    cy.get('.new-todo').type('Buy shea butter{enter}');
    cy.contains('Buy shea butter').should('be.visible');
  });
});
\`\`\`

## Finding elements well

Tests break most often because they cannot find a button after the page changes. Prefer locators that match what users see, such as a role, label, placeholder or visible text, or a dedicated test id that developers add for testing. Avoid long, fragile paths based on page layout.

## Keeping tests reliable

A test that sometimes passes and sometimes fails, for no real reason, is called **flaky**. Flaky tests destroy trust. To avoid them:

* **Never use fixed waits** like "wait five seconds". Modern tools wait automatically for elements; use their checks instead.
* **Keep tests independent.** Each test sets up what it needs and does not rely on another test running first.
* **Keep tests short.** One flow and one clear purpose per test.
* **Use stable test data,** created fresh or reset before each run.

## Mobile apps

Appium automates Android and iOS apps, and Android's own testing tools exist for developers. Start with web automation; the concepts carry over when a role needs mobile.

## A small example

Mariama takes five of her manual regression test cases for a practice shop site and automates them with Playwright. One fails every few runs. She finds she had used a fixed wait. Replacing it with an \`expect\` check makes all five pass ten runs in a row. She writes a short README explaining what each test covers.`,
      practice_task_md: `**Goal:** automate two test cases on a public practice site.

You need a computer with Node.js and Wi-Fi or enough data for a one time install of a few hundred megabytes.

1. Create a folder and run \`npm init playwright@latest\` (or install Cypress if you prefer).
2. Write the to do test from the lesson and run it.
3. Write a second test of your own on the same practice site, such as marking an item as completed, with a clear expected result.
4. Run both tests five times. If any run fails, find out why and fix it without adding fixed waits.
5. Add a README listing each test and what it checks.

**Done looks like:** a small project with two reliable tests and a README, ready to push to GitHub in the portfolio lesson.`,
      quiz: {
        questions: [
          {
            prompt: "In an automated test, what does the expect line correspond to in a manual test case?",
            options: ["The title", "The expected result", "The preconditions", "The environment"],
            answer_index: 1,
            explanation: "expect checks the outcome, just like the expected result in a test case.",
          },
          {
            prompt: "What is a flaky test?",
            options: [
              "A test that always fails",
              "A test written in Python",
              "A test that runs very fast",
              "A test that sometimes passes and sometimes fails for no real reason",
            ],
            answer_index: 3,
            explanation: "Flaky tests give inconsistent results and destroy trust.",
          },
          {
            prompt: "Which locator is the most reliable choice?",
            options: [
              "A long path based on page layout",
              "The fifth div on the page",
              "The element's screen position",
              "A role, label, visible text or a dedicated test id",
            ],
            answer_index: 3,
            explanation: "User facing locators and test ids survive layout changes.",
          },
          {
            prompt: "What fixed Mariama's flaky test?",
            options: [
              "Adding a longer fixed wait",
              "Running it only once",
              "Replacing a fixed wait with an expect check",
              "Deleting the test",
            ],
            answer_index: 2,
            explanation: "Built in checks wait for the right condition instead of a guessed time.",
          },
          {
            prompt: "Why should automated tests be independent?",
            options: [
              "So they all share one account",
              "Because tools run only one test",
              "So each test can run without relying on another test running first",
              "So they run in alphabetical order",
            ],
            answer_index: 2,
            explanation: "Independent tests can run in any order and fail for clear reasons.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "tests-in-ci": {
      explanation_md: `## Why this matters

Automated tests are most valuable when they run without anyone remembering to start them. Teams connect tests to a pipeline, a process that runs on a server every time someone pushes code. A few adverts and the occupation frameworks we read mention CI/CD and tools such as Jenkins or GitHub Actions. This lesson is optional, but setting it up for your own project is a strong portfolio signal.

## What CI means

**CI** stands for continuous integration: developers merge their changes often, and each change is checked automatically. **CD**, continuous delivery or deployment, goes further and releases changes that pass. A pipeline usually:

1. Fetches the latest code.
2. Installs what the project needs.
3. Runs the tests.
4. Reports pass or fail, often blocking the change from being merged if tests fail.

Common tools include GitHub Actions, GitLab CI, Jenkins and Azure Pipelines. They all follow the same idea.

## A GitHub Actions example

GitHub Actions is free for public repositories within GitHub's usage limits. You add a file at \`.github/workflows/tests.yml\` in your project:

\`\`\`yaml
name: tests
on: [push]
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
\`\`\`

Each time you push, GitHub starts a fresh Linux machine, installs your project and browsers, and runs your Playwright tests. A green tick means they passed; a red cross means something failed, and you can open the log to see which test and why. The heavy downloads happen on GitHub's servers, not on your data bundle.

## Reading a failed run

When a pipeline fails, do not panic. Open the log and look for:

* **Which step failed:** installing, or the tests themselves?
* **Which test failed** and the error message.
* **Screenshots or traces:** Playwright can save these as artifacts you download from the run page.

Then decide: is the app broken (a real bug), is the test wrong (update it), or is the test flaky (fix its reliability)? Never just rerun until it passes and move on.

## Why this proves the value of automation

A failing test that stops a bad change from being merged is the clearest proof of automation's worth. It is the moment testing moves from "we found it later" to "it never reached customers".

## A small example

Sumaila adds the workflow file to his practice project on GitHub. Two weeks later he changes a test's locator by mistake and pushes. The run goes red within minutes. He reads the log, sees "element not found", fixes his locator and pushes again. Green. In interviews he shows this history to explain how CI catches problems early, using his own project as evidence.`,
      practice_task_md: `**Goal:** run your automated tests in a pipeline.

You need a computer, a free GitHub account and the test project from the previous lesson. Pushing small text files uses very little data.

1. Push your test project to a public GitHub repository.
2. Add the workflow file from the lesson at \`.github/workflows/tests.yml\` and push again.
3. Open the Actions tab and watch the run finish.
4. Break one test on purpose, push, and read the failed log.
5. Fix it, push, and confirm the run is green.

**Done looks like:** a repository with a green Actions history that also shows one deliberate red run you fixed, and a sentence in your README explaining it.`,
      quiz: {
        questions: [
          {
            prompt: "What does CI stand for?",
            options: ["Customer information", "Code inspection", "Central internet", "Continuous integration"],
            answer_index: 3,
            explanation: "Continuous integration means changes are merged often and checked automatically.",
          },
          {
            prompt: "In the GitHub Actions example, when do the tests run?",
            options: [
              "Only on Fridays",
              "When a customer complains",
              "Every time code is pushed",
              "Never automatically",
            ],
            answer_index: 2,
            explanation: "The on: push setting runs the workflow on every push.",
          },
          {
            prompt: "When a pipeline fails, what should you avoid?",
            options: [
              "Just rerunning until it passes and moving on",
              "Reading the log",
              "Checking which step failed",
              "Deciding whether the app or the test is wrong",
            ],
            answer_index: 0,
            explanation: "Rerunning without understanding hides real bugs and flaky tests.",
          },
          {
            prompt: "Why is the pipeline's download use not a problem for your data bundle?",
            options: [
              "Pipelines need no downloads",
              "The downloads happen on GitHub's servers",
              "Data is free on weekends",
              "Tests run on your phone",
            ],
            answer_index: 1,
            explanation: "The fresh machine on GitHub downloads browsers, not your device.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "getting-hired": {
      explanation_md: `## Why this matters

Skills only turn into work when an employer can see them. Testing employers look for careful thinking and clear writing more than certificates, and the good news is that both can be shown in documents you produce yourself. This section helps you package your work, understand where certificates fit, and look widely for a first role.

## Be clear eyed about the market

SydCrest's research found only a handful of testing openings in Ghana, mostly in Accra, and several wanted some experience. Remote roles exist, but many are limited to particular countries. That is the honest picture. It means you should:

* **Build strong public evidence** so you stand out when an opening does appear.
* **Apply widely,** including to remote roles whose location rules include Ghana or Africa.
* **Consider nearby roles,** where testing skills give you an edge: junior developer, IT support, customer support for software products, product operations.
* **Keep learning automation,** which widens the roles open to you.

## What this section covers

* **A testing portfolio.** A public collection of your test plan, test cases, bug reports and automation project, shared on GitHub with a clear README.
* **Certificates and finding work.** What the ISTQB Foundation certificate is, how to use its free syllabus as a study map, and where to look for junior, remote and fellowship roles.
* **Where testing leads** (optional). The careers testers often grow into.

## What employers look for in a junior tester

From the adverts we studied, the recurring asks were:

* Writing test cases and test plans.
* Clear bug reports and use of a tracker.
* Manual testing of web and mobile apps.
* Some API testing.
* Automation basics with a tool such as Selenium, Cypress or Playwright.
* Comfort working in an Agile team.

You have practised every one of these in this track. Your job now is to show it.

## Applying well

* **Tailor each application.** Read the advert, then point to the specific piece of your portfolio that matches each skill they ask for.
* **Write a short, specific cover note.** "I found and reported a booking bug on a public website; here is my report" beats "I am hardworking".
* **Prepare for practical tests.** Many testing interviews ask you to test a page or write test cases on the spot. Practise by giving yourself a random website and twenty minutes.
* **Stay safe.** Never pay a fee to be considered for a job, and be careful with "jobs" that ask for your mobile money PIN or ID before an interview.

## A small example

Amina finished this track with a GitHub portfolio. She applied to two Accra roles and five remote ones over two months, tailoring each note. One remote company invited her to a practical test: write test cases for a sign up page in thirty minutes. Because she had done exactly this in her practice tasks, she finished early and added three boundary tests nobody asked for. She did not get every role, but each application taught her something, and she kept going.`,
      practice_task_md: `**Goal:** map your evidence against real adverts.

1. Find two current testing adverts, one in Ghana and one remote that accepts applicants from Ghana or Africa.
2. List each skill they ask for in your own words.
3. Next to each skill, write which piece of your own work proves it, or "gap" if none does yet.
4. Pick the biggest gap and plan one practice task to close it this month.
5. Draft a five sentence cover note for one of the adverts that points to specific portfolio pieces.

**Done looks like:** a skills to evidence table for two adverts, a gap plan, and a draft cover note.`,
      quiz: {
        questions: [
          {
            prompt: "What do testing employers often value more than certificates?",
            options: [
              "Owning an expensive laptop",
              "Knowing many app names",
              "Careful thinking and clear writing",
              "Speed of typing",
            ],
            answer_index: 2,
            explanation: "Employers look for careful thinking and clear writing, which a portfolio can show.",
          },
          {
            prompt: "What is a good response to the limited number of testing openings in Ghana?",
            options: [
              "Build public evidence, apply widely including remote roles, and consider nearby roles",
              "Give up on testing",
              "Apply only to one company",
              "Wait until more jobs appear",
            ],
            answer_index: 0,
            explanation: "Strong evidence and a wide search make the most of a small market.",
          },
          {
            prompt: "What should you do if a job asks for a fee before considering you?",
            options: [
              "Pay quickly to secure the role",
              "Send your mobile money PIN instead",
              "Treat it as a warning sign and do not pay",
              "Ask a friend to pay",
            ],
            answer_index: 2,
            explanation: "Genuine employers do not charge applicants to be considered.",
          },
          {
            prompt: "Why did Amina do well in her practical test?",
            options: [
              "She had a certificate",
              "She had practised writing test cases in her practice tasks",
              "The test was very easy for everyone",
              "She asked a friend to do it",
            ],
            answer_index: 1,
            explanation: "Repeated practice made the on the spot task familiar.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "testing-portfolio": {
      explanation_md: `## Why this matters

A new tester's biggest problem is proving they can do the job without having had the job. A portfolio solves that. When an employer can open a link and read your test plan, your test cases and a bug report that would let any developer reproduce a problem, they can judge your work directly. Entry level testing adverts ask exactly for these skills.

## What to include

Build your portfolio around one or two real, public products you tested through normal customer use. A strong portfolio has:

* **A test plan:** one page covering scope, approach, devices and risks.
* **Test cases:** ten to twenty clear cases, including negative and boundary cases, in a spreadsheet or markdown table.
* **Bug reports:** three or four of your best, each with steps, expected and actual results, environment, evidence and severity.
* **An exploratory session record:** charter, notes and findings.
* **A test summary:** what you tested, what you found and your recommendation.
* **An automation project:** once you reach that section, two to five reliable automated tests with a README, and ideally a CI workflow.

Quality beats quantity. Four excellent bug reports are better than twenty vague ones.

## Choosing what to test

* **Open source apps** are ideal. Their code and issue trackers are public, and many welcome bug reports from newcomers. A bug you report that the maintainers accept is real, verifiable experience.
* **Public websites** of businesses, NGOs or schools work too. Test only through normal use and keep your reports factual and respectful. If you find a real problem, consider telling the owner privately.
* **Practice sites** built for testers are fine for automation, but employers prefer to see you test real products too.

Never test by attacking systems, guessing other people's passwords or using other people's data. That is not testing; it can be illegal.

## Putting it on GitHub

GitHub is free and widely used by software teams. Create a repository with folders such as \`test-plan\`, \`test-cases\`, \`bug-reports\` and \`automation\`. Write documents in Markdown, a simple text format GitHub displays nicely. You can create and edit files in GitHub's website on any device, but the automation folder needs a computer.

Your **README** is the front door. In a few short paragraphs, say who you are, what you tested and why, and link to your best three pieces. Assume a busy reader with two minutes.

## A small example

Fuseini's portfolio README says: "I tested the sign up and donation flows of a public NGO website and an open source notes app." It links to his test plan, a spreadsheet of fifteen test cases, three bug reports (one accepted by the open source maintainers, with a link to the issue), and a Playwright project with a green CI badge. An interviewer told him she had read his bug reports before the call, and most of the interview was a conversation about them.`,
      practice_task_md: `**Goal:** publish the first version of your testing portfolio.

1. Create a free GitHub account if you do not have one.
2. Create a public repository called "testing-portfolio".
3. Add folders for your test plan, test cases and bug reports, and upload your best work from earlier lessons. Remove any personal data.
4. Write a README with a short introduction and links to your three best pieces.
5. Ask a friend or mentor to read the README for two minutes and tell you what they understood.

**Done looks like:** a public repository link with a clear README and at least a test plan, five test cases and two bug reports. Add your automation project when it is ready.`,
      quiz: {
        questions: [
          {
            prompt: "Why is a portfolio especially valuable for a new tester?",
            options: [
              "It lets employers judge your work directly without previous job experience",
              "It replaces the need to apply for jobs",
              "It is required by law",
              "It guarantees an interview",
            ],
            answer_index: 0,
            explanation: "A portfolio shows real work, which proves skill without prior employment.",
          },
          {
            prompt: "Why are open source apps good to test for your portfolio?",
            options: [
              "They never have bugs",
              "Their issue trackers are public and an accepted bug report is verifiable experience",
              "They pay testers",
              "They are always easy to use",
            ],
            answer_index: 1,
            explanation: "Public trackers let employers see your accepted reports.",
          },
          {
            prompt: "What is the purpose of the README?",
            options: [
              "To store passwords",
              "To list every bug you ever found",
              "To act as the front door, introducing you and linking your best work",
              "To run automated tests",
            ],
            answer_index: 2,
            explanation: "A short README guides a busy reader to your strongest pieces.",
          },
          {
            prompt: "Which of these is not acceptable when building a portfolio?",
            options: [
              "Testing a public website through normal use",
              "Guessing other people's passwords to test a login",
              "Reporting bugs to an open source project",
              "Using a practice site for automation",
            ],
            answer_index: 1,
            explanation: "Attacking systems or using other people's accounts is not testing and can be illegal.",
          },
          {
            prompt: "Which is better for a portfolio?",
            options: [
              "Twenty vague bug reports",
              "No bug reports, only a certificate",
              "Four excellent bug reports",
              "Bug reports without steps",
            ],
            answer_index: 2,
            explanation: "Quality beats quantity in a portfolio.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "certificates-and-first-role": {
      explanation_md: `## Why this matters

You will see the ISTQB Foundation certificate mentioned in some testing adverts, usually as a plus rather than a requirement. You will also need to know where to look for a first role when local openings are few. This lesson covers both honestly.

## The ISTQB Foundation certificate

ISTQB, the International Software Testing Qualifications Board, runs a widely known set of testing certificates. The entry level one is the Certified Tester Foundation Level, often shortened to CTFL. A few points to know:

* **The syllabus is free to download** from the ISTQB website, and it makes a good study outline even if you never sit the exam.
* **The exam costs money** and is taken through approved exam providers, sometimes online. Check current prices and options on official sites only.
* **It is not required** for most junior roles we saw. A strong portfolio usually says more about you.

The syllabus chapters line up with lessons in this track:

* **Fundamentals of Testing:** the testing basics and principles lessons.
* **Testing Throughout the Software Development Lifecycle:** test levels and working in Agile teams.
* **Static Testing:** reviewing stories and acceptance criteria before code exists.
* **Test Analysis and Design:** the test design techniques and exploratory testing lessons.
* **Managing the Test Activities:** test plans, regression, reporting and bug reports.
* **Test Tools:** the automation section.

Use the syllabus to spot topics you want to study more deeply. Its text is copyright ISTQB, so read it there rather than relying on copies elsewhere.

## Where to look for a first role

* **Junior tester and QA roles** on Ghanaian job boards and company career pages, especially fintech, agritech and software companies.
* **Fellowships and internships:** some companies run early career QA programmes. Watch their career pages and social channels.
* **Remote roles:** remote job boards list QA work. Read location rules carefully; many roles are tied to specific countries. Apply to those that include Ghana or Africa.
* **Crowdtesting platforms:** some websites pay testers per accepted bug on real products. Availability by country varies, work is irregular, and you should never pay to join.
* **Nearby roles:** support, junior developer or product operations roles at software companies, where testing is part of the job and can lead to a QA role inside the company.
* **Local communities:** tech hubs, meetups and online testing communities share openings and advice.

## Staying safe

Real employers do not ask you to pay for a job, a test or "training" before hiring. Never share your mobile money PIN, and be wary of offers that sound too good.

## A small example

Hawa studies the free CTFL syllabus alongside this track, using it as a checklist. She decides not to sit the exam yet and instead adds two accepted open source bug reports to her portfolio. She applies to a QA fellowship in Accra and three remote roles. The fellowship interviewer asks about boundary value analysis; she explains it with her airtime top up example and points to her test cases.`,
      practice_task_md: `**Goal:** build your study map and your job search list.

1. Download the free CTFL syllabus from the official ISTQB website (it is a PDF of a few megabytes).
2. Read only the chapter and section titles. Next to each, write which lesson in this track covers it and rate your confidence from 1 to 3.
3. Pick the two weakest areas and plan one practice session for each.
4. Make a list of ten places to look for work: Ghanaian job boards, company career pages, remote boards and communities.
5. Set a weekly reminder to check them.

**Done looks like:** a one page study map and a list of ten job sources with a weekly routine.`,
      quiz: {
        questions: [
          {
            prompt: "How did most testing adverts we read treat the ISTQB Foundation certificate?",
            options: [
              "As a strict requirement for every role",
              "As a reason to reject applicants",
              "They never mentioned testing at all",
              "As a plus rather than a requirement",
            ],
            answer_index: 3,
            explanation: "Where it appeared, it was usually a plus; most junior roles did not require it.",
          },
          {
            prompt: "Which part of the ISTQB Foundation certificate is free?",
            options: ["The exam", "The training course", "The syllabus", "The certificate itself"],
            answer_index: 2,
            explanation: "The syllabus is free to download; the exam costs money.",
          },
          {
            prompt: "Which syllabus chapter matches this track's lessons on boundary values and exploratory testing?",
            options: ["Test Tools", "Static Testing", "Fundamentals of Testing", "Test Analysis and Design"],
            answer_index: 3,
            explanation: "Test Analysis and Design covers choosing and designing tests.",
          },
          {
            prompt: "What should you check before applying for a remote testing role?",
            options: [
              "The colour of the company logo",
              "The location rules, since many roles are tied to specific countries",
              "Whether they charge an application fee you can afford",
              "Nothing, all remote roles accept anyone",
            ],
            answer_index: 1,
            explanation: "Remote does not always mean anywhere, so check that Ghana or Africa is included.",
          },
          {
            prompt: "What is true of crowdtesting platforms?",
            options: [
              "They guarantee a full time salary",
              "They only accept certified testers",
              "They require relocation",
              "Work can be irregular, availability varies by country, and you should never pay to join",
            ],
            answer_index: 3,
            explanation: "Crowdtesting can give experience but is irregular and should never cost money to join.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "where-testing-leads": {
      explanation_md: `## Why this matters

Testing is a career in itself and also a doorway. Because testers learn a product deeply, see every part of it and work with every role in a team, they often grow into other jobs. Knowing the paths helps you choose what to learn next and keeps your options open in a small local market.

## Paths testers commonly take

* **Senior tester or QA lead.** You stay in testing, take on harder products, plan testing for whole releases and mentor newer testers.
* **Automation or QA engineer.** You spend most of your time writing and maintaining automated tests and the frameworks around them. Some companies call this an SDET, a software development engineer in test. This path builds directly on the automation section.
* **Software developer.** Many testers move into development after learning to code for automation. You already know how bugs happen, which makes you a careful developer.
* **Product manager or business analyst.** Testers who are strong at reading stories, asking about edge cases and understanding users often move into defining what gets built.
* **DevOps and release engineering.** If you enjoyed the pipeline lesson, you might work on the systems that build, test and release software.
* **Specialist testing.** Performance testing checks speed under heavy use; security testing looks for weaknesses (with permission); accessibility testing makes products usable for everyone. Each is a deeper area you can grow into.
* **Support and customer success.** Your skill at reproducing and explaining problems is valued in technical support roles at software companies, which can also be a route into QA.

## Skills that carry into every path

* **Clear writing:** bug reports become specifications, documentation and proposals.
* **Asking "what if?":** useful in design, security and product decisions.
* **Understanding users:** the conditions you tested for, like weak networks and small screens, matter in every role.
* **Working with evidence:** you learned to show, not just tell.

## Choosing a direction

You do not have to choose now. After a few months of testing work or practice, notice what you enjoy most:

* If you enjoyed writing Playwright tests, lean into automation and development.
* If you enjoyed acceptance criteria and talking to users, look at product roles.
* If pipelines were the fun part, explore DevOps and cloud.
* If you liked finding weaknesses, read about security testing, always with permission.

SydCrest has other tracks for many of these directions, and your testing portfolio stays useful in all of them.

## A small example

Issahaku started as a manual tester at a software company in Accra. He learned Playwright in his evenings and automated the team's regression checks. Developers began asking him to review their code for missed cases. Two years later he moved into a developer role on the same team, and he still writes the first tests for every feature he builds. His testing habits became his advantage.`,
      practice_task_md: `**Goal:** sketch your own next step.

1. Look back at all the practice tasks you completed in this track.
2. Rank them from most to least enjoyable and write one sentence on why for the top three.
3. Match your top choices to one or two paths from the lesson.
4. For your chosen path, write three skills you would need next and one free way to start each.
5. Share your plan with a mentor or friend and ask for one honest piece of feedback.

**Done looks like:** a one page plan naming a direction, three next skills and how you will start learning them.`,
      quiz: {
        questions: [
          {
            prompt: "What is an SDET?",
            options: [
              "A sales director for enterprise tools",
              "A security device for phones",
              "A software development engineer in test, focused on automated testing",
              "A type of bug report",
            ],
            answer_index: 2,
            explanation: "SDET is a title some companies use for engineers who build automated tests.",
          },
          {
            prompt: "Why do testers often make careful developers?",
            options: [
              "They type faster",
              "They never write code",
              "They avoid testing their own work",
              "They already know how bugs happen",
            ],
            answer_index: 3,
            explanation: "Experience finding bugs helps testers write code that avoids them.",
          },
          {
            prompt: "If you enjoyed acceptance criteria and talking to users most, which path fits best?",
            options: ["DevOps", "Product manager or business analyst", "Performance testing", "Release engineering"],
            answer_index: 1,
            explanation: "Product roles focus on defining what gets built and understanding users.",
          },
          {
            prompt: "Which skill from testing carries into every path?",
            options: ["Memorising app store rankings", "Avoiding teamwork", "Using only one browser", "Clear writing"],
            answer_index: 3,
            explanation: "Clear writing is valuable in development, product, support and beyond.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
