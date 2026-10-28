import type { TrackContent } from "./types";

/**
 * Original lesson content for the No Code and Automation roadmap (issue #198, process from
 * issue #84). Research and sources: src/content/research/no-code.md. Every scenario and name is
 * invented for teaching. Tools are named only as examples, never as recommendations, and the
 * lessons state no prices or free plan limits: learners are told to read each plan page.
 */
const content: TrackContent = {
  roadmap: "no-code-automation",
  nodes: {
    "no-code-basics": {
      explanation_md: `Mariama runs a small provisions shop in Tamale. Every evening she copies the day's sales from a notebook into a spreadsheet, then sends her supplier a WhatsApp message listing what is running low. It takes her an hour. A person with no code skills could set up a simple order form, a stock sheet that flags low items, and an automatic summary, and give Mariama that hour back every day.

That is what this track is about: building useful tools for real people by clicking, dragging and filling in settings, instead of writing programs.

## What "no code" means

No code tools are apps and websites that let you build things through a visual editor. You choose a question type for a form, link a form to a spreadsheet, drag a block onto a web page, or tell an automation tool "when this happens, do that". The tool writes the technical parts for you.

Some tools are called **low code**. They work the same way but let you add a small piece of code when the visual editor is not enough. You do not need any code for this track. Where a little code would help, the lessons say so and leave it as an option.

## Skills inside other jobs

In Ghana you will rarely see an advert titled "no code builder". The skills appear inside other roles instead:

* **Data collection and M&E** (monitoring and evaluation) roles at NGOs and research firms, where staff build and run survey forms and turn the answers into reports.
* **Communications and IT officer** roles, where someone keeps the organisation's website up to date.
* **Operations and admin** roles, where staff keep records in shared tables and set up reminders and handovers.
* **Freelance projects** for shops, churches, schools and small offices that need a form, a simple app or a website.

So think of this track as a toolkit that makes you more useful in many jobs, and that can also earn you small paid projects.

## How the track is organised

1. **Starting with no code:** what you can build, which device suits which task, and how free plans and accounts work.
2. **Data first:** spreadsheets set up as simple databases, clean data, and reports.
3. **Forms and data collection:** online forms and offline field surveys.
4. **Websites without code:** builders, WordPress basics and going live.
5. **Simple apps:** apps built on top of a spreadsheet.
6. **Automations:** workflows that move information by themselves, automatic messages and careful use of AI.
7. **Clients, safety and earning:** privacy, testing, handover, a portfolio and finding work.

Spreadsheets come early because nearly every form, app and automation stores its information in a table. If your tables are messy, everything built on them breaks.

## A mindset to keep

Always start with the problem, not the tool. Ask what the person does by hand today, how often, and what goes wrong. Then pick the simplest tool that fixes it. A well made form and a tidy sheet often beat a fancy app.`,
      practice_task_md: `**Goal:** Find three tasks in your community that a no code tool could take over.

**Steps:**
1. Open a notes app or a document on your phone or computer.
2. Think of three places you know well: a shop, a school, a church or mosque group, a farm group or an office.
3. For each, write one task people do by hand again and again, such as copying sales, collecting names or sending the same reminder.
4. Next to each task, write how often it happens and one thing that goes wrong with it.

**Done looks like:** A list of three repeated tasks, each with how often it happens and its main problem. Keep it; you will choose a project from it later.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between no code and low code tools, as the lesson describes them?",
            options: [
              "Low code tools only run on computers, while no code tools only run on phones",
              "Low code tools also let you add a small piece of code when the visual editor is not enough",
              "No code tools are always free and low code tools always cost money",
              "There is no difference; the two names mean exactly the same thing in every case",
            ],
            answer_index: 1,
            explanation: "The lesson says low code tools work the same way but allow a little code when the visual editor falls short.",
          },
          {
            prompt: "Where do no code skills usually appear in Ghanaian job adverts?",
            options: [
              "Inside other roles, such as data collection and operations",
              "Mainly in adverts with the exact title no code builder, posted by large banks and telecoms",
              "Only in government jobs that require a computer science degree",
              "Nowhere at all, because the skills are only useful as a hobby",
            ],
            answer_index: 0,
            explanation: "The lesson explains that there is rarely a no code job title; the skills sit inside other roles.",
          },
          {
            prompt: "Why does the track teach spreadsheets before apps and automations?",
            options: [
              "Spreadsheets are the only tool that works without internet",
              "Employers test spreadsheet speed before every interview in Ghana",
              "Most builds store their data in a table",
              "Apps and automations are too advanced for anyone to learn at the start",
            ],
            answer_index: 2,
            explanation: "The lesson says messy tables break everything built on them, because most builds store data in a table.",
          },
          {
            prompt: "What should you start with when planning a no code build?",
            options: [
              "The newest tool you have seen advertised online",
              "The tool with the most features, so you never need to switch later",
              "A logo and colour scheme for the finished product",
              "The problem the person faces by hand today",
            ],
            answer_index: 3,
            explanation: "The lesson's mindset is to start with the problem and then pick the simplest tool that fixes it.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-no-code-builds": {
      explanation_md: `Before you learn any tool, learn to see the opportunities. Employers and clients rarely ask for "a no code app". They describe a problem: "we lose track of who has paid", "the survey forms take weeks to type up", "customers keep calling to ask our opening hours". Your value is spotting which kind of build fixes which problem.

## Five kinds of build

Most no code work falls into five families.

* **Forms.** Collect information in a set shape: orders, registrations, bookings, feedback, survey answers. Every answer lands neatly in a table.
* **Tables and reports.** A spreadsheet or table tool used as a simple database, plus summaries and charts that answer questions like "what sold most this week?"
* **Websites.** Pages that tell people who you are, what you offer and how to reach you, built with a website builder or WordPress.
* **Simple apps.** Screens on top of a table, so staff can list, add and update records from a phone or computer without touching the raw sheet.
* **Automations.** Workflows that run by themselves: when something happens in one tool, do something in another, like sending a confirmation when a form is submitted.

Many real projects combine several families. A form feeds a table, the table feeds a report, and an automation sends a message.

## How to spot a good task

Look for work that is:

* **Repeated.** The same steps happen daily or weekly.
* **Rule based.** The steps follow clear rules a person could write down.
* **Copy heavy.** Someone retypes information from paper, chat or one file into another.
* **Easy to forget.** Reminders, follow ups and deadlines slip.

Tasks that need judgement every time, like deciding whether a loan applicant is trustworthy, are poor fits. A build can collect the information, but a person should decide.

## A worked example

Abdul-Rahman volunteers with a youth football club in Wa. Each season, parents register players on paper, the coach copies names into an exercise book, and the treasurer chases fees by calling families one by one.

He breaks the work into pieces and matches each to a family:

1. **Registration:** an online form asking for the player's name, age group, a parent's phone number and consent for photos.
2. **Records:** the form answers flow into a sheet, one row per player, with a column for fees paid.
3. **Report:** a small summary showing how many players each age group has and how many still owe fees.
4. **Automation (later):** a weekly email to the treasurer listing unpaid fees.

He does not start with an app. The form and sheet solve most of the problem in an afternoon. If the club grows, he can add an app on top of the same sheet.

## Know the limits

No code tools are not right for everything. Very large systems, unusual features, or work that must handle sensitive money or health data at scale often need professional developers. Being honest about that with clients builds trust, and it keeps you from promising what a tool cannot deliver.`,
      practice_task_md: `**Goal:** Turn one real problem into a no code plan.

**Steps:**
1. Pick one task from your list in the previous lesson, or think of a group you know, such as a savings group or a school club.
2. Write the problem in one sentence, in the words the people involved would use.
3. Break it into steps and label each step with a family: form, table, report, website, app or automation.
4. Circle the one step you would build first, and write why it gives the most help for the least effort.
5. Write one part of the work that a person should still decide, not a tool.

**Done looks like:** A short plan of three to five labelled steps, a clear first build, and one decision kept for a person. Share it with a friend or mentor and ask if the first step makes sense to them.`,
      quiz: {
        questions: [
          {
            prompt: "Which kind of task is the poorest fit for a no code build?",
            options: [
              "Copying sales from a notebook into a sheet every evening",
              "Deciding each time whether a loan applicant is trustworthy",
              "Sending the same reminder to a group every Friday",
              "Collecting names and phone numbers for a club registration",
            ],
            answer_index: 1,
            explanation: "The lesson says tasks needing judgement every time are poor fits; a build can collect data but a person should decide.",
          },
          {
            prompt: "In the lesson, what does a simple app add on top of a table?",
            options: [
              "Screens for listing, adding and updating records",
              "A public website that search engines can find and rank, with its own domain name",
              "Automatic payments into the shop's mobile money wallet",
              "A way to stop all data from being stored anywhere",
            ],
            answer_index: 0,
            explanation: "The lesson describes simple apps as screens on top of a table for listing, adding and updating records.",
          },
          {
            prompt: "Why did Abdul-Rahman start the football club project with a form and a sheet instead of an app?",
            options: [
              "Apps cannot store phone numbers",
              "The club committee had asked him never to build an app because apps are too expensive to run",
              "A form and sheet solved most of it quickly",
              "Forms are the only no code tool that works in Wa",
            ],
            answer_index: 2,
            explanation: "The example shows that the form and sheet solved most of the problem in an afternoon, with an app possible later.",
          },
          {
            prompt: "Which of these signs suggests a task is a good candidate for a no code build?",
            options: [
              "It happens once every few years",
              "It needs a different expert opinion each time",
              "Nobody can explain how it is done",
              "Someone retypes the same kind of information again and again",
            ],
            answer_index: 3,
            explanation: "Copy heavy, repeated, rule based tasks are the good candidates named in the lesson.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "phone-or-laptop": {
      explanation_md: `You can learn a lot of no code work on a phone. You can also hit walls where a bigger screen saves hours. Knowing which is which helps you plan your time, your data bundle and your trips to a computer, and it helps you give clients honest advice about the devices their staff will use.

## What works well on a phone

* **Filling in forms and surveys.** This is what forms are made for. Field survey apps such as KoboCollect and ODK Collect run on Android phones and keep working without network, then upload later.
* **Building simple online forms.** Form builders open in a phone browser. A short registration or order form is very doable on a phone.
* **Checking and editing spreadsheets.** Spreadsheet apps let you read data, fix a cell, sort and filter.
* **Using finished apps.** Apps built on a spreadsheet are designed to be used on phones.
* **Watching automations.** You can open an automation tool's run history to see whether today's runs worked.
* **Small website edits.** Fixing a phone number or adding a short post is possible from a phone.

## Where a computer really helps

* **Designing large surveys.** Survey designs written as XLSForm spreadsheets have many columns, and editing them on a small screen is slow and error prone.
* **Building apps from sheets.** App builders show your data, screens and settings side by side, and their editors are made for a computer browser.
* **Setting up websites.** Choosing themes, arranging pages and changing settings in WordPress or Google Sites is far easier with a full screen, keyboard and mouse. Google's own setup steps for Sites start on a computer.
* **Multi step automations.** Mapping fields from one app to another needs room to see both at once.

If you do not own a laptop, this is not a reason to stop. Plan focused sessions at a school lab, a hub, a cafe or a friend's computer for the heavy building, and use your phone for learning, testing and small fixes in between.

## Saving data and power

* Download help pages or lessons while on Wi Fi, then read offline.
* Turn off automatic video play in apps and browsers.
* Build and test with a few sample rows, not thousands.
* Many tools save as you go, but power cuts can still interrupt you, so save or publish often and keep a copy of important work.

## A worked example

Hawa is learning in Bolgatanga with an Android phone and two evenings a week at a community hub. On her phone she builds a feedback form for her church choir, tests it with friends and checks the responses sheet. At the hub she uses the computer to design a longer survey and set up a simple website. Between visits she reads lessons offline and notes what she wants to build next.

## Advising clients

The same thinking applies to the people you build for. If an NGO's enumerators carry Android phones, choose tools with a good Android app. If shop staff share one phone, keep screens simple. Always test your build on the kind of device the real users have.`,
      practice_task_md: `**Goal:** Make a realistic weekly plan for your own devices.

**Steps:**
1. Write down the devices you can use and when: your own phone, a shared laptop, a school lab, a hub or a cafe.
2. Make two columns: "On my phone" and "Needs a computer". Sort these tasks into them: fill a survey, build a short form, design a long survey, set up a website theme, check an automation's history, build an app from a sheet.
3. Add one data saving habit you will try this week.
4. Plan one focused computer session in the next two weeks and write what you will build in it.

**Done looks like:** A two column list, one data saving habit and one booked session with a clear goal. Show it to a mentor or study partner.`,
      quiz: {
        questions: [
          {
            prompt: "Which task does the lesson say is far easier on a computer?",
            options: [
              "Filling in a household survey in an offline survey app",
              "Checking whether today's automation runs worked",
              "Fixing one wrong cell in a spreadsheet",
              "Designing a large survey written as an XLSForm spreadsheet",
            ],
            answer_index: 3,
            explanation: "The lesson says XLSForm designs have many columns, so editing them on a small screen is slow and error prone.",
          },
          {
            prompt: "What do field survey apps such as KoboCollect and ODK Collect let enumerators do?",
            options: [
              "Keep collecting data without network and upload it later",
              "Collect data only while connected to fast Wi Fi",
              "Design websites for the NGO",
              "Send money to the households they visit",
            ],
            answer_index: 0,
            explanation: "The lesson notes these Android apps keep working without network and upload later.",
          },
          {
            prompt: "What does the lesson suggest if you do not own a laptop?",
            options: [
              "Wait until you can buy one before starting the track",
              "Book computer sessions for heavy building and use your phone in between",
              "Do every task on the phone, including long survey designs, website themes and multi step automations",
              "Skip the websites and apps sections entirely",
            ],
            answer_index: 1,
            explanation: "The lesson recommends planned computer sessions for heavy building and the phone for learning, testing and small fixes.",
          },
          {
            prompt: "When advising a client, which device should you test your build on?",
            options: [
              "The newest phone available in shops",
              "Whatever device you personally prefer",
              "The kind of device the real users have",
              "Only a desktop computer with a large screen",
            ],
            answer_index: 2,
            explanation: "The lesson says to always test on the kind of device the real users have.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "free-plans-and-limits": {
      explanation_md: `Most no code tools let you start without paying. That is great for learning, but it brings two responsibilities: understanding what the free plan allows, and keeping the accounts safe. When you build for a client, both matter even more, because the client has to live with your choices after you leave.

## How free plans usually work

A free plan is the vendor's way of letting you try the tool. It usually comes with limits, such as:

* how many records or rows you can store;
* how many people can use or edit the build;
* how many automated runs or tasks happen each month;
* which features are switched on, such as publishing, custom branding or certain connections.

These limits are different for every tool and they **change over time**. A plan that suits a project today may not next year. So never rely on a blog post, a video or a friend's memory. Go to the tool's official pricing or plans page, read it on the day, and note the date you checked.

## Reading a plan page

When you open a plans page, look for:

* **The unit of measure.** Is it rows, users, submissions, tasks or storage?
* **What happens at the limit.** Does the tool stop, warn you, or switch features off?
* **Which features are paid only.** Publishing an app or using your own domain may be on a paid plan.
* **Who the plan is meant for.** Some free plans are aimed at personal use, students or nonprofits.

Write down what you found in a few lines. When a client asks "will this keep working?", you can show them.

## Choosing tools a client can keep

For a small business or NGO, the best tool is often not the most powerful. It is one they can afford, understand and keep running. Before you build, ask:

* How many people will use it, and how much data will it hold in a year?
* Who will pay if the free plan is outgrown?
* Does the client already use a suite, such as Google Workspace or Microsoft 365, that includes a suitable tool?

## Keeping accounts safe

Your accounts will hold other people's data, so protect them.

* Use a strong, different password for each tool, kept in a password manager or a safe written place.
* Turn on **two step verification**, which asks for a second proof, such as a code on your phone, when you sign in.
* Create client tools under an account the **client owns**, then add yourself as an editor. If you build everything under your personal account, the client is stuck when you move on.
* Never share passwords in a group chat.

## A worked example

Fuseini is asked to build a booking form and reminder automation for a barbering shop in Tamale. Before building, he reads the plans page of each tool, notes the monthly limit on automated runs, and estimates the shop's bookings. He sets up the tools under a new account in the owner's name with two step verification on, adds himself as an editor, and writes the plan details in a short note for the owner.`,
      practice_task_md: `**Goal:** Read one real plan page and secure one account.

**Steps:**
1. Choose one tool from this track, such as a form builder, an app builder or an automation tool.
2. Open its official pricing or plans page. Write down the date, the unit the free plan measures (rows, users, runs or storage), what happens at the limit, and one feature that needs a paid plan.
3. Open the security settings of an account you already use, such as your Google or Microsoft account, and turn on two step verification if it is off.
4. Write two sentences explaining to an imaginary shop owner why the tool should be set up under their account, not yours.

**Done looks like:** A dated note about one plan page, two step verification switched on, and two clear sentences for a client.`,
      quiz: {
        questions: [
          {
            prompt: "Where should you check the current limits of a tool's free plan?",
            options: [
              "A popular video about the tool from a few years ago",
              "A friend who used the tool for a past project",
              "The official plans page, read on the day",
              "A blog post listing free tools",
            ],
            answer_index: 2,
            explanation: "The lesson says limits change, so read the official plans page on the day and note the date.",
          },
          {
            prompt: "What does two step verification add when you sign in?",
            options: [
              "A second proof, such as a code on your phone",
              "A longer password that is easier to share",
              "Automatic sharing of your account with a backup person",
              "A free upgrade to a paid plan",
            ],
            answer_index: 0,
            explanation: "The lesson defines two step verification as asking for a second proof, such as a code on your phone.",
          },
          {
            prompt: "Why should a client's tools be created under an account the client owns?",
            options: [
              "Tools set up under a personal account cannot store any data",
              "So the client is not stuck when you move on",
              "Because vendors only allow registered businesses to sign up, and personal accounts are blocked",
              "So that you never need to test the build",
            ],
            answer_index: 1,
            explanation: "The lesson warns that building under your own account leaves the client stuck when you leave.",
          },
          {
            prompt: "Which question helps you choose a tool a client can keep running?",
            options: [
              "Which tool has the most impressive features list?",
              "Which tool do most people on social media talk about?",
              "Which tool has the newest design?",
              "Who will pay if the free plan is outgrown?",
            ],
            answer_index: 3,
            explanation: "The lesson lists asking who will pay if the free plan is outgrown as part of choosing tools a client can keep.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
