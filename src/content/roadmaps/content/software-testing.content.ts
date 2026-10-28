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
              "Writing the code for new features",
              "Comparing what software does with what people need and reporting the gaps",
              "Designing logos and screens for an app",
              "Selling software to customers",
            ],
            answer_index: 1,
            explanation: "Testing compares actual behaviour with what is needed and reports the differences clearly.",
          },
          {
            prompt: "Who usually fixes the bugs a tester finds?",
            options: ["The tester", "The customer", "The developers", "The marketing team"],
            answer_index: 2,
            explanation: "Testers provide clear evidence; developers change the code and testers then confirm the fix.",
          },
          {
            prompt: "In Mariama's example, why was the basket total a bug?",
            options: [
              "Jollof should cost more than 40 cedis",
              "The total stayed at 40 cedis when it should have increased with each plate",
              "The website loaded slowly",
              "The menu had too many items",
            ],
            answer_index: 1,
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
            options: ["Quick access", "Quality assurance", "Question and answer", "Quarterly audit"],
            answer_index: 1,
            explanation: "QA means quality assurance, the work of making sure a product meets the expected standard.",
          },
          {
            prompt: "What did Fuseini do that saved his team rework?",
            options: [
              "He fixed the payment code himself",
              "He asked what should happen if one friend's payment failed, before coding started",
              "He wrote an automated test for every screen",
              "He changed the release date",
            ],
            answer_index: 1,
            explanation: "Asking questions early about unclear cases is a valuable part of testing.",
          },
          {
            prompt: "What did SydCrest's research find about testing openings in Ghana?",
            options: [
              "There are thousands of entry level openings across every region",
              "Only a handful were found, mostly in Accra",
              "Testing jobs exist only in Tamale",
              "No company in Ghana employs testers",
            ],
            answer_index: 1,
            explanation: "The research found a handful of openings, mostly in Accra, so learners should also look at remote and nearby roles.",
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
              "Confirming that a bug fix works and nothing nearby broke",
              "Setting the company's prices",
              "Hiring new developers",
              "Managing the office budget",
            ],
            answer_index: 0,
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
            explanation: "A problem caught at the description stage costs a conversation; after release it can cost refunds and emergency updates.",
          },
          {
            prompt: "Since you can never test everything, how do testers decide what to test?",
            options: [
              "They test features in alphabetical order",
              "They test only what developers ask for",
              "They focus on the most important features and where failure would hurt most",
              "They pick features at random",
            ],
            answer_index: 2,
            explanation: "Risk based testing puts effort where failure would matter most.",
          },
          {
            prompt: "Which level of testing checks one small piece of code, such as a fee calculation function?",
            options: ["Acceptance testing", "System testing", "Integration testing", "Unit testing"],
            answer_index: 3,
            explanation: "Unit tests check a single small piece of code, usually written by developers.",
          },
          {
            prompt: "In Hawa's example, what did acceptance testing reveal?",
            options: [
              "The fee function returned the wrong number",
              "The server did not respond",
              "Shop owners found the fee text hard to find",
              "The app crashed on one phone",
            ],
            answer_index: 2,
            explanation: "Acceptance testing with real users showed a usability problem the other levels missed.",
          },
          {
            prompt: "What is the right way to describe results when all your tests pass?",
            options: [
              "The app has no bugs",
              "Say what you checked, because passing tests cannot prove no bugs remain",
              "Testing is finished forever",
              "The developers made no mistakes",
            ],
            answer_index: 1,
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
              "A person using the software like a customer, thinking about what could go wrong and recording results",
              "Writing code that clicks buttons automatically",
              "Reading the source code line by line",
              "Installing software on many computers",
            ],
            answer_index: 0,
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
              "The logo was the wrong colour",
              "The page showed Success even though no account was created",
              "The password field accepted long passwords",
              "The page loaded in a different language",
            ],
            answer_index: 1,
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
            options: ["Preconditions", "Test data", "Expected result", "Title"],
            answer_index: 2,
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
              "So results do not differ between testers who start from different states",
              "Because they make the test case longer",
              "So developers can skip reading the steps",
              "Because tools require them",
            ],
            answer_index: 0,
            explanation: "Stating the starting state makes the test repeatable by anyone.",
          },
          {
            prompt: "Which of these was one of Amina's negative test cases?",
            options: [
              "Sending 50 cedis to a valid number",
              "Checking the balance after a transfer",
              "Entering an amount larger than the wallet balance",
              "Opening the app",
            ],
            answer_index: 2,
            explanation: "Trying to send more than the balance checks how invalid input is handled.",
          },
          {
            prompt: "Why write the expected result before running the test?",
            options: [
              "It is faster to type",
              "So you are not tempted to accept whatever happened as correct",
              "Because tools hide the actual result",
              "Developers write the actual result",
            ],
            answer_index: 1,
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
            options: ["1, 2 and 3", "4,999, 5,000 and 5,001", "2,500 only", "0 and 10,000"],
            answer_index: 1,
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
            options: [
              "Entering 1 cedi",
              "Entering letters",
              "Entering exactly 500 cedis",
              "Entering 250 cedis",
            ],
            answer_index: 2,
            explanation: "The valid upper boundary of 500 was wrongly rejected.",
          },
          {
            prompt: "Which test belongs to state transition testing?",
            options: [
              "Typing a very long name",
              "Trying to cancel an order that has already been delivered",
              "Checking text contrast",
              "Entering a decimal amount",
            ],
            answer_index: 1,
            explanation: "State transition testing checks moves between states, including moves that should not be allowed.",
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
              "A one line mission saying what to explore and what to look for",
              "A list of all the developers",
              "A tool that records the screen",
            ],
            answer_index: 1,
            explanation: "A charter gives the session a focus, such as exploring payments with a weak network.",
          },
          {
            prompt: "Why do exploratory sessions use a time box?",
            options: [
              "To keep the tester focused for a fixed period",
              "Because apps close after 30 minutes",
              "To save the developer's time",
              "So that bugs cannot be found after the timer ends",
            ],
            answer_index: 0,
            explanation: "A fixed time keeps the session focused and makes coverage easy to report.",
          },
          {
            prompt: "Which is an example of the interruptions prompt?",
            options: [
              "Typing a very long name",
              "Turning data off and on in the middle of a payment",
              "Writing a decision table",
              "Reading the release notes",
            ],
            answer_index: 1,
            explanation: "Interruptions include network changes, calls and switching apps during a flow.",
          },
          {
            prompt: "What should you do with a bug found during exploring?",
            options: [
              "Keep it secret until the next session",
              "Report it and consider turning it into a new test case",
              "Delete your notes",
              "Ask the user to find it again",
            ],
            answer_index: 1,
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
              "Please fix urgently",
              "Basket total does not increase when adding a second item",
              "Bug found today",
            ],
            answer_index: 2,
            explanation: "A good title says what fails and where.",
          },
          {
            prompt: "What is the difference between severity and priority?",
            options: [
              "They mean the same thing",
              "Severity is how bad the effect is; priority is how soon the team should fix it",
              "Severity is decided by customers; priority by testers",
              "Priority is about the device; severity is about the browser",
            ],
            answer_index: 1,
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
              "The page was slow",
              "The colour was wrong",
              "Parents may think they paid for the wrong child",
              "It only happened once",
            ],
            answer_index: 2,
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
              "The set of rules the website and app use to talk to the server",
              "A type of phone screen",
              "The company's marketing plan",
            ],
            answer_index: 1,
            explanation: "The API is how the website and app send and receive data from the server.",
          },
          {
            prompt: "Which parts of this section are much easier on a computer?",
            options: [
              "Testing an Android app",
              "Basic accessibility checks",
              "Browser developer tools and API testing",
              "Reading test cases",
            ],
            answer_index: 2,
            explanation: "Developer tools live in desktop browsers, and API testing needs room for typing requests and reading responses.",
          },
          {
            prompt: "In Hawa's example, which bug did the screen hide?",
            options: [
              "The Save button under the keyboard",
              "The API accepting a negative savings amount",
              "The website colours",
              "A slow loading page",
            ],
            answer_index: 1,
            explanation: "Testing the API directly revealed it accepted negative amounts the screen never sent.",
          },
          {
            prompt: "Why does knowing the layers help your bug reports?",
            options: [
              "You can say where the problem seems to live",
              "It makes reports longer",
              "Developers only read reports about the API",
              "It removes the need for steps to reproduce",
            ],
            answer_index: 0,
            explanation: "Pointing to the likely layer helps developers find the cause faster.",
          },
        ],
        pass_threshold: 75,
      },
    },
//NEXT
  },
};

export default content;
