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
      outcomes: [
        "Explain what no code means",
        "See no code skills inside other jobs",
        "Find tasks in your community a no code tool could take over",
      ],
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
      outcomes: [
        "Name five kinds of no code build",
        "Spot a task that suits no code",
        "Know the limits of no code tools",
      ],
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
              "No code app builders are not able to store the names and ages of children in a football club",
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
      outcomes: [
        "Say honestly what works on a phone and where a computer helps",
        "Save data and power",
        "Make a realistic weekly plan for your devices",
      ],
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
      outcomes: [
        "Explain how free plans usually work",
        "Read a plan page and choose tools a client can keep",
        "Keep accounts safe",
      ],
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
              "Because the tools will not let a personal account create a form or app that strangers can use",
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
    "data-first": {
      outcomes: [
        "Choose a spreadsheet tool",
        "Tell a good table from a bad one",
        "Pick a dataset to improve through this section",
      ],
      explanation_md: `Every form answer, app record and automation step has to be stored somewhere, and in no code work that somewhere is almost always a table. A form saves each response as a new row. An app reads rows to show a list. An automation watches for a new row and acts on it. If the table is badly designed, every build on top of it inherits the mess.

That is why this section comes before forms, apps and automations. It is also a skill employers ask for directly. NGO monitoring and evaluation roles mention spreadsheets and dashboards, and remote operations roles name table based tools such as Airtable, Notion, Monday.com or SharePoint lists. Each of those works on the same ideas you will learn here.

## What this section covers

* **Spreadsheets as a simple database.** How to lay out a table so that apps and automations can read it: one row per record, one kind of information per column, and a unique ID for every row.
* **Clean data and validation.** How to stop mistakes at the door with dropdowns and rules, and how to find and fix the mistakes that still get in.
* **Simple reports and dashboards.** How to turn rows of data into answers with summaries, pivot tables and charts that a manager can read at a glance.

## Which spreadsheet tool?

You can follow this section in any spreadsheet tool: Google Sheets, Microsoft Excel, LibreOffice Calc or a phone spreadsheet app. The ideas are the same, though menus differ. An online spreadsheet has one big advantage for no code work: forms, apps and automation tools can connect to it directly, and several people can work on it at once.

On a phone you can read data, fix cells, sort and filter. Designing a new table, writing formulas across many columns and building pivot tables are more comfortable on a computer, so save those for a session with a bigger screen if you can.

## A picture of good and bad

Imagine Issahaku keeps sales records for his father's cement and building supplies shop in Savelugu. His first sheet looks like this: some rows are days, some are customers, one cell says "3 bags paid half", dates are typed in three different ways, and totals are typed in by hand in the middle of the data.

He can read it, but no app or automation could. Nobody can sort it, add it up reliably or build a report from it.

After this section, his sheet will have one row per sale, separate columns for date, customer, item, quantity, amount and payment status, real dates, dropdowns for item and payment method, and a separate summary tab that calculates totals by itself. Same information, but now it can power a form, an app and a weekly report.

## How to work through it

Build alongside the lessons. Pick one small real dataset you care about, such as your savings group's contributions, a club's members or a shop's stock, and improve it lesson by lesson. Use made up or permission given data, not other people's private details copied without asking. By the end of the section you will have a clean table and a small dashboard to show.`,
      practice_task_md: `**Goal:** Choose the dataset you will improve through this section.

**Steps:**
1. Pick one small topic: a club's members, a savings group's contributions, a shop's stock or a list of your own expenses.
2. Open a spreadsheet tool on your phone or computer and create a new file named after the topic.
3. Type ten rows of realistic data, made up or used with permission, however feels natural to you.
4. Below the data, write three questions you would like the data to answer, such as "who has not paid this month?"

**Done looks like:** A spreadsheet with ten rows and three written questions. Keep it untouched for now; the next lessons will show you how to improve it.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the data section come before forms, apps and automations?",
            options: [
              "Because spreadsheets are the most exciting part of no code work",
              "Because forms, apps and automations store and read their information in tables",
              "Because apps and automations cannot be learned without a computer science degree",
              "Because tables are only used in data jobs",
            ],
            answer_index: 1,
            explanation: "The lesson explains that forms save rows, apps read rows and automations act on rows, so table design comes first.",
          },
          {
            prompt: "What advantage does an online spreadsheet have for no code work?",
            options: [
              "It never needs an internet connection",
              "It hides data so nobody else can ever see it",
              "Other tools can connect to it directly and several people can work on it at once",
              "It automatically writes finished reports in perfect English for any manager who opens the file",
            ],
            answer_index: 2,
            explanation: "The lesson says forms, apps and automations can connect to an online sheet and several people can use it at once.",
          },
          {
            prompt: "What was wrong with Issahaku's first sales sheet?",
            options: [
              "Rows mixed days and customers, dates were typed differently, and totals sat in the data",
              "It was stored online instead of in a notebook",
              "It contained far too few columns to be useful at all, because every detail was typed into one single column",
              "It used a dropdown for the payment method",
            ],
            answer_index: 0,
            explanation: "The lesson describes mixed rows, inconsistent dates and hand typed totals in the middle of the data.",
          },
          {
            prompt: "Which spreadsheet tasks does the lesson say are more comfortable on a computer?",
            options: [
              "Reading data and fixing a single cell",
              "Sorting and filtering a short list",
              "Opening a file someone has shared with you by link",
              "Designing a new table, writing formulas across columns and building pivot tables",
            ],
            answer_index: 3,
            explanation: "The lesson lists designing tables, wide formulas and pivot tables as easier with a bigger screen.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "spreadsheets-as-databases": {
      outcomes: [
        "Follow four rules for a table that works like a database",
        "Split data into several tables",
        "Use the right data types",
      ],
      explanation_md: `A database is an organised store of records that a computer can search, sort and update reliably. Big companies use database software for this. For a shop, a club or a small NGO project, a well designed spreadsheet can do the same job, and it is exactly what app builders and automation tools expect to connect to.

Remote operations roles that name tools such as Airtable or Notion are really asking whether you can design tables well. Learn the rules here and they carry over to any table tool.

## The four rules

1. **One row is one record.** A record is one thing you are tracking: one customer, one order, one survey response, one item of stock. Never use a row for a heading, a note or a total.
2. **One column holds one kind of information.** Name, phone number, district and date each get their own column. Do not put "Hawa, 024..., Tolon" in a single cell.
3. **The first row holds clear headings, and nothing else.** Use short, plain names such as "phone" or "order_date". Avoid merged cells, blank columns and decorative titles above the headings.
4. **Every row has a unique ID.** Names repeat; there may be two Amina Mahamas. An ID such as C001, C002 or an order number lets an app or automation find exactly the right row.

## Keep totals and notes elsewhere

Calculations, summaries and charts belong on a **separate tab** that reads from the data tab. If you type totals into the data, an app will treat them as records, and an automation may send a message to a customer called "TOTAL".

## Splitting into several tables

When information repeats, split it. Suppose Sumaila tracks orders for a shea butter group in Nalerigu. If each order row repeats the customer's name, phone and town, a changed phone number must be fixed in many places.

Instead, use two tabs:

**customers**

| customer_id | name | phone | town |
|---|---|---|---|
| C001 | Amina Mahama | 020 000 0001 | Gambaga |
| C002 | Wumpini Yakubu | 020 000 0002 | Nalerigu |

**orders**

| order_id | order_date | customer_id | item | qty | paid |
|---|---|---|---|---|---|
| O001 | 2026-10-02 | C002 | Shea butter 1kg | 3 | Yes |

The orders tab stores only the customer ID. Lookup formulas, or an app builder's relation setting, fetch the name and phone when needed. The phone number lives in one place.

## Data types

Keep each column to one type: text, number, date, yes or no, or a choice from a list. Format date columns as dates and money columns as numbers, without typing "GHS" into every cell. Apps use these types to show the right input, like a date picker or a number keypad.

## A quick test

Ask yourself: if I sorted this sheet by any column, would anything break? If headings, totals or notes would end up scattered, the sheet is not yet a database.`,
      practice_task_md: `**Goal:** Turn your section dataset into a proper table.

**Steps:**
1. Open the spreadsheet you started in the section lesson.
2. Make a copy of the tab so you keep the original.
3. On the copy, give every row an ID in the first column, put one kind of information in each column, and use clear headings in row one only.
4. Move any totals or notes to a new tab called "summary".
5. If information repeats, such as a member's phone on every contribution row, split it into two tabs joined by an ID.
6. Sort by two different columns to check nothing breaks.

**Done looks like:** A data tab that passes the sort test, every row with a unique ID, and totals moved to their own tab. Take a screenshot of before and after for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Why does every row need a unique ID?",
            options: [
              "IDs make the sheet look more professional to visitors",
              "Spreadsheets refuse to save a file without an ID column",
              "IDs are required by law for any customer list kept in Ghana",
              "Names can repeat, so an ID finds the exact row",
            ],
            answer_index: 3,
            explanation: "The lesson notes there may be two people with the same name, so an ID identifies the exact record.",
          },
          {
            prompt: "Where should totals and summaries go?",
            options: [
              "On a separate tab that reads from the data tab",
              "In the last row of the data tab, in bold",
              "Above the headings in the first row, so they are seen first",
              "In the same cell as each record's amount",
            ],
            answer_index: 0,
            explanation: "The lesson says calculations belong on a separate tab, or apps may treat totals as records.",
          },
          {
            prompt: "In Sumaila's example, why does the orders tab store only the customer ID?",
            options: [
              "Because order tabs cannot hold text",
              "So the phone number lives in one place and is fetched by ID when needed",
              "Because customer names are private and must never be stored anywhere in the business",
              "To make each order row longer and more detailed",
            ],
            answer_index: 1,
            explanation: "Splitting into customers and orders means a changed phone number is fixed in one place only.",
          },
          {
            prompt: "Which column layout follows the rules in the lesson?",
            options: [
              "One cell containing a member's name, phone and town together",
              "A merged title cell above the headings",
              "Separate columns for name, phone and town",
              "A blank column between each pair of headings so the sheet is easier to read",
            ],
            answer_index: 2,
            explanation: "Rule two says each column holds one kind of information.",
          },
          {
            prompt: "What simple test does the lesson give for whether a sheet works as a database?",
            options: [
              "Print it and see whether it fits on one page",
              "Count whether it has more than a hundred rows",
              "Share it and see whether anyone complains",
              "Sort it by any column and check whether anything breaks",
            ],
            answer_index: 3,
            explanation: "If sorting scatters headings, totals or notes, the sheet is not yet a database.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "clean-data": {
      outcomes: [
        "Prevent data mistakes at the start",
        "Find and fix mistakes that slip through",
        "Protect a list from new mistakes",
      ],
      explanation_md: `Data collection roles at NGOs and research firms ask for data quality checks again and again, and for good reason. If one enumerator types "Tamale", another "tamale" and a third "Tml", a report will count three towns instead of one. If a phone number is missing, an automation cannot send the reminder. Clean data is what makes everything you build trustworthy.

There are two jobs: **prevent** mistakes when data goes in, and **find and fix** the ones that still get through.

## Prevent mistakes at the start

* **Dropdowns.** For any column with a fixed set of answers, such as district, item or payment method, use a dropdown list so people pick rather than type. In Google Sheets this is an in cell dropdown; Excel calls it data validation with a list.
* **Validation rules.** Most spreadsheets can reject or warn about values that break a rule: a quantity that is not a whole number, a date in the future, an age above 120.
* **Required fields in forms.** If data arrives through a form, mark the important questions as required so they cannot be skipped.
* **Clear instructions.** A short note in the heading or form question, such as "phone number, 10 digits, no spaces", prevents many errors.
* **Fewer free text boxes.** Every place someone can type freely is a place for spelling variations.

## Find and fix what slips through

* **Sort and filter.** Sorting a column groups odd values together: blanks rise to the top or sink to the bottom, and misspellings sit next to the correct spelling. A filter can show only the rows with a blank in a key column.
* **Look for duplicates.** Sort by name or phone and scan for repeats. Many tools can highlight or remove duplicates, but check before deleting: two rows may be two real people.
* **Standardise.** Pick one spelling or format and fix the others. Find and replace helps, as do functions that trim extra spaces or change text to proper case.
* **Keep the original.** Clean a copy, never the only version, and write down what you changed. If someone questions a number later, you can explain it.

## A worked example

Mariama receives a sheet of 60 women registered for a soap making training in Tolon. She sorts by community and finds "Tolon", "TOLON" and "Tolon " with a trailing space. She filters phone numbers and finds four blanks and two with only nine digits. She sorts by name and finds the same woman entered twice.

She fixes the spellings, flags the phone problems for the field officer to check rather than guessing, and removes the duplicate after confirming it. Then she adds a district dropdown and a phone rule so the next round of registrations arrives cleaner.

## Garbage in, garbage out

Developers say "garbage in, garbage out": a system can only be as good as the data fed to it. Time spent on validation is almost always cheaper than time spent fixing a report after a manager has already seen the wrong numbers.`,
      practice_task_md: `**Goal:** Clean a messy list and protect it from new mistakes.

**Steps:**
1. Make a copy of your section dataset, or type twelve rows of made up member data with some deliberate mistakes: mixed spellings of a town, a blank phone number, one duplicate row and an extra space.
2. Sort and filter to find every mistake. Write each one in a "changes" note.
3. Fix the spellings and spaces, and mark problems you cannot fix yourself as "check".
4. Add a dropdown to one column with fixed answers, and a validation rule to one number or date column.
5. Try to type a wrong value and confirm the sheet warns or rejects it.

**Done looks like:** A clean copy, a short changes note, one working dropdown and one working rule. A screenshot of the warning message makes good portfolio evidence.`,
      quiz: {
        questions: [
          {
            prompt: "Why is a dropdown better than free typing for a district column?",
            options: [
              "Dropdowns make the spreadsheet file much smaller",
              "People pick from a fixed list, so spellings stay consistent",
              "Dropdowns hide the column from anyone without editing access to the sheet",
              "Dropdowns automatically translate district names into English",
            ],
            answer_index: 1,
            explanation: "The lesson says dropdowns let people pick rather than type, which prevents spelling variations.",
          },
          {
            prompt: "How can sorting a column help you find mistakes?",
            options: [
              "It deletes blank cells by itself",
              "It corrects misspelled words automatically",
              "It groups odd values together, so blanks and misspellings stand out",
              "It sends an email listing every error to the person who typed the data",
            ],
            answer_index: 2,
            explanation: "The lesson explains that sorting brings blanks and near spellings next to each other.",
          },
          {
            prompt: "What did Mariama do with the phone numbers she could not fix herself?",
            options: [
              "She flagged them for the field officer to check rather than guessing",
              "She deleted those registrations",
              "She typed in numbers that looked about right",
              "She left them unmarked and hoped nobody would notice them in the report",
            ],
            answer_index: 0,
            explanation: "The example shows her flagging phone problems for checking instead of inventing numbers.",
          },
          {
            prompt: "Why should you clean a copy and keep the original?",
            options: [
              "Because spreadsheets lose data if they are edited twice",
              "Because cleaning is not allowed on shared files",
              "So that you have two files with different totals and can choose whichever looks better",
              "So you can explain or undo changes if a number is questioned later",
            ],
            answer_index: 3,
            explanation: "The lesson advises keeping the original and noting changes so you can explain them later.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "reports-and-dashboards": {
      outcomes: [
        "Start a report from its question",
        "Use summary formulas and pivot tables",
        "Build an honest chart and a small dashboard",
      ],
      explanation_md: `A manager does not want to scroll through 400 rows. She wants answers: how many households did the survey reach in each district, which product sold most this month, how many members still owe dues. NGO monitoring and evaluation roles in Ghana regularly ask for dashboards in Excel or Power BI, and operations roles ask for the same thing in other tools. Turning clean data into clear answers is one of the most valued no code skills.

## Start from the question

Before building anything, write down the questions the report must answer. "Show me everything" is not a question. "How many women attended training in each community this quarter?" is. Each question usually becomes one number, one small table or one chart.

## Summary formulas

Simple functions answer many questions without anything fancy:

* **COUNTIF** counts rows that meet a condition, such as registrations from Tolon.
* **SUMIF** adds amounts that meet a condition, such as sales of rice.
* **AVERAGE**, **MIN** and **MAX** describe a column of numbers.

Put these on your summary tab, pointing at the data tab, so they update as new rows arrive.

## Pivot tables

A **pivot table** summarises a table by groups without any formulas. You choose which column becomes the rows (say, district), what to calculate (say, count of households) and optionally a column for comparison (say, month). Google Sheets, Excel and LibreOffice all have them. Building one is easiest on a computer, but the finished result can be read on any screen.

Pivot tables are perfect for quick exploration: drag a different column in, and you see a new view of the same data in seconds.

## Charts that tell the truth

* Use a **bar chart** to compare groups, such as sales by item.
* Use a **line chart** for change over time, such as weekly registrations.
* Avoid pie charts with many slices; they are hard to read on a small screen.
* Give every chart a plain title that states what it shows, label the axes, and start bar charts at zero so differences are not exaggerated.

## Dashboards

A **dashboard** is a single page that puts the key numbers and charts together. It can simply be a well arranged summary tab, or a report in a tool such as Looker Studio or Power BI connected to your sheet. When the data source is an online sheet fed by a form, the dashboard refreshes as new responses arrive, which is exactly what field projects need.

Keep dashboards small: three to six items, the most important number first, and nothing that needs explaining in a meeting.

## A worked example

Fuseini supports a water project in Damongo. Enumerators submit household surveys into an online sheet. On a summary tab he builds a pivot table of households by community, a COUNTIF of households without a working borehole nearby, and a bar chart of both. He shares the summary with the project officer as view only. Each evening, new submissions appear in the dashboard without Fuseini touching it.

Remember: a report is only as good as the data under it, so clean first, summarise second.`,
      practice_task_md: `**Goal:** Build a small dashboard from your cleaned dataset.

**Steps:**
1. Write the three questions you noted in the section lesson at the top of a new "dashboard" tab.
2. Answer at least one with COUNTIF or SUMIF pointing at your data tab.
3. Answer another with a pivot table, ideally on a computer.
4. Add one bar or line chart with a clear title and labelled axes.
5. Add two new rows to your data and check that the dashboard updates by itself.
6. Share the file as view only with a friend and ask whether they can answer your three questions in under a minute.

**Done looks like:** A dashboard tab with one formula answer, one pivot table and one clear chart that update when data changes, and a friend who could read it quickly.`,
      quiz: {
        questions: [
          {
            prompt: "What should you do before building any report?",
            options: [
              "Pick the most colourful chart style available",
              "Write down the specific questions the report must answer",
              "Copy every row onto the dashboard so nothing is missed",
              "Ask the manager to send you a finished design from another organisation to copy",
            ],
            answer_index: 1,
            explanation: "The lesson says to start from the questions, since each usually becomes one number, table or chart.",
          },
          {
            prompt: "What does COUNTIF do?",
            options: [
              "Adds up every number in a column regardless of conditions",
              "Sorts a column from smallest to largest",
              "Counts rows that meet a condition",
              "Removes rows that contain mistakes",
            ],
            answer_index: 2,
            explanation: "The lesson describes COUNTIF as counting rows that meet a condition, like registrations from Tolon.",
          },
          {
            prompt: "Which chart does the lesson recommend for showing change over time?",
            options: [
              "A pie chart with many slices",
              "A line chart",
              "A bar chart that starts well above zero to make differences clearer",
              "A table of raw rows with no chart",
            ],
            answer_index: 1,
            explanation: "The lesson recommends line charts for change over time, such as weekly registrations.",
          },
          {
            prompt: "Why did Fuseini's dashboard update each evening without him touching it?",
            options: [
              "Its data source was an online sheet fed by the survey submissions",
              "He paid for a special automatic update service out of the water project's budget",
              "The project officer retyped the data every evening",
              "Dashboards always update themselves, whatever the data source",
            ],
            answer_index: 0,
            explanation: "The lesson explains that dashboards built on an online sheet fed by a form refresh as new responses arrive.",
          },
          {
            prompt: "What does the lesson advise for keeping a dashboard useful?",
            options: [
              "Include every possible chart so no one has to ask a question",
              "Use pie charts with many slices for every comparison",
              "Hide the most important number at the bottom so people read the whole page first",
              "Keep it to three to six items with the most important number first",
            ],
            answer_index: 3,
            explanation: "The lesson recommends small dashboards with the key number first.",
          },
        ],
        pass_threshold: 80,
      },
    },
    forms: {
      outcomes: [
        "Tell apart two kinds of form",
        "Handle personal data that comes in through forms",
        "Plan a form before you build it",
      ],
      explanation_md: `Think of a form as the front door of a system. Orders, bookings, registrations, complaints and survey answers all come in through it, and they arrive in the same shape every time, ready to land in a table. If the door is well built, everything behind it works better.

Forms are also where Ghanaian job adverts for no code skills are strongest. Data collection officer, enumerator and monitoring and evaluation roles at NGOs and research firms, including roles based in Tamale, name mobile survey tools such as KoboToolbox, ODK, SurveyCTO and CommCare. Being comfortable with these tools can be the difference between applying and being shortlisted.

## Two kinds of form

**Everyday online forms.** Tools such as Google Forms and Microsoft Forms let anyone with a link fill in a form in a browser. They are great for shop orders, event registrations, feedback and short surveys where respondents have some internet access. Responses can flow straight into a spreadsheet.

**Field survey tools.** KoboToolbox, ODK and similar tools are built for research and humanitarian work. Trained data collectors, often called enumerators, visit households or farms and fill in long questionnaires on Android phones or tablets, often far from network. The apps save everything on the device and upload later. They also handle GPS locations, photos, skip logic and careful checks on answers.

Both kinds share the same skills: asking clear questions, choosing the right question type, checking answers as they come in and connecting responses to a table.

## What this section covers

* **Online forms for orders and bookings:** question types, clear wording, required questions and sending responses to a sheet.
* **Field surveys with KoboToolbox and ODK:** how these tools work from design to upload, and what an enumerator actually does.
* **Skip logic, checks and XLSForm (optional):** making surveys smarter, so they skip questions that do not apply and reject impossible answers, using the XLSForm spreadsheet format.

## Personal data comes in through forms

Most forms collect personal data: names, phone numbers, locations, sometimes health or income details. In Ghana, the Data Protection Act, 2012 (Act 843) sets rules for collecting and using personal data. As a form builder you should only ask what the project truly needs, tell people why you are asking, and keep the responses where only the right people can see them. The privacy lesson later in the track covers this properly; keep it in mind from your very first form.

## A worked example

Amina helps a women's group in Walewale. They want to know which members are interested in a shea butter processing training. Before building anything, she writes down the purpose ("plan the training"), the five things the group truly needs to know, and who will see the answers (only the group leader and herself). Only then does she open a form builder.

Because most members have phones but patchy data, she keeps the form short and asks the leader to also share a printed copy for members without phones, which Amina later types in.

## Device notes

Filling in forms works on any device. Building a short online form works in a phone browser too. Designing long field surveys is much easier on a computer, which the survey logic lesson explains.`,
      practice_task_md: `**Goal:** Plan a form properly before you build it.

**Steps:**
1. Choose a real need: a club registration, a small shop's order list or a feedback form for a training.
2. Write the purpose of the form in one sentence.
3. List every question you might ask, then cross out any you do not truly need for that purpose.
4. Next to each remaining question, note whether it collects personal data.
5. Write who will be allowed to see the responses.
6. Decide whether respondents will use an online form or need a field survey tool that works offline, and write why.

**Done looks like:** A one page plan with a purpose, a short question list with personal data marked, who sees the answers, and your choice of form type with a reason.`,
      quiz: {
        questions: [
          {
            prompt: "What makes field survey tools such as KoboToolbox and ODK different from everyday online forms?",
            options: [
              "They only work on desktop computers in an office",
              "They can only collect yes or no answers",
              "They save data on the device far from network and upload later",
              "They cannot store GPS locations or photos, so teams have to collect those separately on paper",
            ],
            answer_index: 2,
            explanation: "The lesson explains field apps save everything on the device and upload later, and handle GPS and photos.",
          },
          {
            prompt: "Which Ghanaian law sets rules for collecting personal data through forms?",
            options: [
              "The Data Protection Act, 2012 (Act 843)",
              "The Companies Act, which covers how businesses are registered and named",
              "The Road Traffic Act",
              "The Copyright Act",
            ],
            answer_index: 0,
            explanation: "The lesson names the Data Protection Act, 2012 (Act 843) as setting rules for personal data.",
          },
          {
            prompt: "What did Amina do before opening a form builder?",
            options: [
              "Chose a colourful theme for the form",
              "Wrote the purpose, the five things truly needed and who would see the answers",
              "Sent the link to every WhatsApp group she could find so that more people would answer it",
              "Bought a tablet for each member",
            ],
            answer_index: 1,
            explanation: "The example shows Amina planning purpose, questions and access before building.",
          },
          {
            prompt: "What is an enumerator, as described in the lesson?",
            options: [
              "A program that counts form responses",
              "A manager who designs the dashboard after a survey has been completed and uploaded",
              "A type of question in an online form",
              "A trained data collector who visits households or farms to fill in questionnaires",
            ],
            answer_index: 3,
            explanation: "The lesson describes enumerators as trained data collectors who fill in questionnaires in the field.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "online-forms": {
      outcomes: [
        "Choose the right question types and write clear questions",
        "Add required questions, validation and branching",
        "Send responses to a sheet",
      ],
      explanation_md: `An online form is often the first build a small business or group asks for. A chop bar in Tamale wants lunch orders before noon. A church youth group wants members registered for a retreat. A tailor wants customers to book fittings. With a form builder such as Google Forms or Microsoft Forms, you can set any of these up in an afternoon, on a phone or a computer.

## Choose the right question type

Form builders offer several question types. Picking well makes answers easier to give and easier to use.

* **Short answer:** a name, a phone number, a single number.
* **Paragraph:** longer comments or complaints. Use sparingly; free text is hard to summarise.
* **Multiple choice:** pick one, such as "Jollof, waakye or banku".
* **Checkboxes:** pick any number, such as extra toppings.
* **Dropdown:** pick one from a longer list, such as a district.
* **Date and time:** bookings and deadlines.
* **Linear scale:** ratings from 1 to 5.

Prefer choices over typing whenever the answers are known in advance. They are faster on a small screen and keep your data clean.

## Write clear questions

* Ask one thing per question. "Name and phone number" should be two questions.
* Use the words your respondents use.
* Add a short description where a format matters, such as "10 digit phone number".
* Put easy questions first and sensitive ones near the end.
* Keep it short. Every extra question loses some people.

## Required questions and validation

Mark essential questions as **required** so they cannot be skipped. Short answer questions can also have **response validation**, such as accepting only numbers or a certain length, which catches a nine digit phone number before it reaches your sheet.

## Sections and branching

Long forms can be split into **sections**. In Google Forms, multiple choice and dropdown questions can send people to different sections depending on their answer, using "Go to section based on answer". For example, people who answer "Delivery" go to a section asking for their address, while people who answer "Pick up" skip it.

## Send responses to a sheet

Each form keeps its own responses, but the real power comes from linking it to a spreadsheet. In Google Forms you do this from the Responses tab. Every new submission then appears as a new row, one column per question, ready for reports, apps and automations.

## A worked example

Wumpini sets up lunch orders for her aunt's chop bar in Tamale. Her form asks for the customer's name, phone number, the dish (multiple choice), quantity (short answer, numbers only, required), and "Delivery or pick up" with branching to an address section. She links it to a sheet, tests it three times from her phone, deletes the test rows, and shares the link in the chop bar's WhatsApp group. Her aunt now reads a tidy list instead of thirty chat messages.

Because the form collects names and phone numbers, Wumpini adds a line saying why: "so we can call you when your order is ready". That is a good habit, and the privacy lesson explains why it matters under Ghana's Data Protection Act.`,
      practice_task_md: `**Goal:** Build and test a real order or registration form.

**Steps:**
1. Open a form builder such as Google Forms or Microsoft Forms in your browser on your phone or computer.
2. Build a form for a chop bar order, a club registration or a training sign up, with at least five questions using three different question types.
3. Make the key questions required and add validation to a phone or quantity question.
4. Add one branch: an answer that sends people to a different section.
5. Add a sentence at the top saying why you collect any personal data.
6. Link responses to a spreadsheet, submit three test responses, check the rows, then delete the test rows.

**Done looks like:** A working form link, a linked sheet with clean columns, and a screenshot of the branching setting. Ask a friend to fill it in and tell you anything confusing.`,
      quiz: {
        questions: [
          {
            prompt: "Which question type suits choosing one district from a long list?",
            options: [
              "Paragraph",
              "Linear scale",
              "Checkboxes, so people can pick several districts at once if they are not sure",
              "Dropdown",
            ],
            answer_index: 3,
            explanation: "The lesson suggests a dropdown for picking one option from a longer list, such as a district.",
          },
          {
            prompt: "What does response validation on a short answer question do?",
            options: [
              "It checks answers against a rule, such as numbers only or a certain length",
              "It translates the answer into English",
              "It emails each answer to the respondent's family",
              "It hides the question from people who have filled the form before on the same phone",
            ],
            answer_index: 0,
            explanation: "The lesson explains validation can accept only numbers or a certain length, catching wrong phone numbers.",
          },
          {
            prompt: "In Google Forms, which question types can send people to a different section based on their answer?",
            options: [
              "Paragraph and short answer",
              "Date and time",
              "Multiple choice and dropdown",
              "Linear scale and checkbox grid questions, which are the only types with branching",
            ],
            answer_index: 2,
            explanation: "The lesson says multiple choice and dropdown questions can use Go to section based on answer.",
          },
          {
            prompt: "Why did Wumpini add a line explaining why the form asks for a phone number?",
            options: [
              "Because forms will not publish without a description",
              "Telling people why personal data is collected is a good habit under Ghana's data protection rules",
              "To make the form longer so it looks more serious",
              "Because phone numbers cannot be collected at all, so she needed a special exception",
            ],
            answer_index: 1,
            explanation: "The lesson links explaining the purpose of personal data to good practice under Ghana's Data Protection Act.",
          },
          {
            prompt: "What happens once a Google Form is linked to a spreadsheet?",
            options: [
              "The form stops accepting new answers",
              "Responses are deleted from the form after a day, and only the sheet keeps them",
              "Only the first ten responses are copied across",
              "Every new submission appears as a new row, one column per question",
            ],
            answer_index: 3,
            explanation: "The lesson says each submission becomes a row with a column per question.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "field-surveys": {
      outcomes: [
        "Explain why field surveys use special tools",
        "Follow the survey workflow step by step",
        "Work as a good enumerator and protect data",
      ],
      explanation_md: `If you want a job in data collection or monitoring and evaluation in northern Ghana, this lesson matters. Enumerator and data officer adverts from NGOs, research firms and donor projects name tools such as KoboToolbox, ODK, SurveyCTO and CommCare again and again. KoboToolbox and ODK are the examples here; the workflow is similar across all of them.

## Why special survey tools?

A baseline survey might send twenty enumerators to villages across the Savannah Region for two weeks. Many communities have weak or no network. Questionnaires are long, answers must be accurate, and the project needs GPS points or photos as evidence. Paper forms are slow to type up and add errors. Mobile survey tools solve this: data is checked as it is entered, saved on the device and sent to a server when there is a connection.

## The workflow, step by step

1. **Design the form.** The survey is built on a computer, either in a visual form builder (KoboToolbox has one in the browser) or as an XLSForm spreadsheet. ODK forms are usually written as XLSForms.
2. **Deploy it to a server.** The form is uploaded to the project's server account: a KoboToolbox server, or ODK Central, a server an organisation runs or rents. Deploying makes it available to data collectors.
3. **Set up devices.** Enumerators install the collection app on Android phones or tablets: **KoboCollect** for KoboToolbox, **ODK Collect** for ODK. They connect it to the project and download the blank form while they have network.
4. **Collect offline.** In the field, the enumerator opens a new blank form for each household, asks the questions, and saves. Nothing needs network at this stage.
5. **Send finalised forms.** Back in network, they send completed forms to the server.
6. **Download and check.** The data team downloads the data, often as a spreadsheet file, checks it and builds reports.

KoboToolbox also offers **web forms** that open in a browser. Its documentation says these work on Android phones, iPhones, laptops and desktops, and can work offline once the form has been opened and cached while connected. ODK Central also offers web forms in the browser, though the ODK docs say these do not yet work offline. Web forms help when someone does not have an Android device.

## What a good enumerator does

* Charges the device and power bank and downloads the latest form before leaving.
* Explains the purpose of the survey and asks for consent before starting.
* Checks the GPS has a good fix before recording a location.
* Sends forms at the end of each day when network allows, rather than keeping a week of data on one phone that could be lost.
* Reports problems with questions to the supervisor instead of quietly working around them.

## A worked example

Issahaku is hired as an enumerator for a farm survey in Tolon. On day one, the supervisor shows the team how to connect KoboCollect, download the form and fill in two practice households. Issahaku notices that a question about farm size gives no unit and tells the supervisor, who adds "in acres" and redeploys. Each evening Issahaku sends his finalised forms from the district capital. The data officer, Mariama, sees new submissions arrive and checks them for gaps.

## Data protection in the field

Survey data is personal data, sometimes sensitive. Under Ghana's Data Protection Act, 2012 (Act 843), people should know why their data is collected and it must be kept safe. Lock devices with a PIN, never share submissions on WhatsApp, and follow the project's data rules.`,
      practice_task_md: `**Goal:** Experience a field survey from both sides.

**Steps:**
1. On a computer if possible, create an account on a KoboToolbox server and read its current terms.
2. Build a five question household survey: household head's first name only, community (select one), number of people (integer), whether they farm (yes or no), and a GPS point.
3. Deploy the form.
4. Collect three test submissions: either install KoboCollect on an Android device, or open the web form in any browser. If you can, switch off data for one submission and send it later.
5. View the submissions on the server and download them as a spreadsheet.

**Done looks like:** A deployed form, three test submissions including one collected offline, and a downloaded data file. Write three lines on what you would tell a new enumerator.`,
      quiz: {
        questions: [
          {
            prompt: "In the workflow, what must enumerators do before going to a place with no network?",
            options: [
              "Delete the collection app to save space",
              "Download the blank form while they still have network",
              "Print every question on paper and leave the phone at the office to keep it safe",
              "Create a new server account for each household",
            ],
            answer_index: 1,
            explanation: "Step three says enumerators download the blank form while they have network.",
          },
          {
            prompt: "Which app do enumerators use to collect data for an ODK project?",
            options: [
              "ODK Collect on an Android device",
              "A spreadsheet app with a household tab",
              "Any messaging app that can send photos to the supervisor's group chat",
              "A website builder",
            ],
            answer_index: 0,
            explanation: "The lesson names ODK Collect for ODK and KoboCollect for KoboToolbox, installed on Android phones or tablets.",
          },
          {
            prompt: "According to the KoboToolbox documentation described in the lesson, what can its web forms do?",
            options: [
              "They only work on Android phones",
              "They need a constant connection for every question",
              "They work on many devices, including iPhones and laptops, and can work offline once cached",
              "They replace the server, so no data is ever uploaded and the team has to copy it by hand",
            ],
            answer_index: 2,
            explanation: "The lesson says Kobo web forms work on Android phones, iPhones, laptops and desktops, and offline once cached.",
          },
          {
            prompt: "Why should enumerators send finalised forms each day when network allows?",
            options: [
              "Because servers delete forms older than a day",
              "Because supervisors are paid by the number of forms received",
              "Because the app stops working after one day offline and has to be reinstalled",
              "So a week of data is not kept on one phone that could be lost",
            ],
            answer_index: 3,
            explanation: "The lesson advises sending daily rather than risking a week of data on one device.",
          },
          {
            prompt: "What did Issahaku do when he found a question with no unit?",
            options: [
              "He told the supervisor, who fixed the form and redeployed it",
              "He guessed a unit and wrote it in each answer",
              "He skipped the question for every household",
              "He changed the form himself on his phone without telling anyone on the team",
            ],
            answer_index: 0,
            explanation: "Good enumerators report problems to the supervisor instead of working around them.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "survey-logic": {
      outcomes: [
        "Use skip logic, constraints and calculations",
        "Write a small XLSForm",
        "Pilot a survey before deployment",
      ],
      explanation_md: `A survey that asks a non farmer how many acres of maize they planted wastes time and annoys people. A survey that accepts a household size of 250 produces nonsense reports. Smart surveys avoid both, and adverts for data collection roles ask for exactly this kind of quality checking. This lesson is optional, but it is the step that turns a form filler into someone who can design surveys.

## Three tools for smarter surveys

* **Skip logic** (also called relevance or branching) shows a question only when an earlier answer makes it relevant.
* **Constraints** reject answers that break a rule, with a message explaining why.
* **Required questions** cannot be left blank.

Visual form builders such as KoboToolbox's offer these through menus. Behind the scenes, many survey tools, including KoboToolbox and ODK, use a format called **XLSForm**, and learning it gives you full control.

## What XLSForm is

XLSForm is a way of writing a survey as a spreadsheet. You fill in rows and columns, upload the file, and the tool turns it into a form. A workbook has a **survey** sheet and a **choices** sheet, plus an optional **settings** sheet.

On the **survey** sheet, each row is one question. Three columns are required:

* **type:** the kind of question, such as integer, text, date or select_one with a list name.
* **name:** a short unique name with no spaces, used in data and logic.
* **label:** the question text people see.

On the **choices** sheet, each row is one answer option, with **list_name**, **name** and **label** columns. The list name ties the options to a select_one question.

## A small example

| type | name | label | relevant | constraint | constraint_message |
|---|---|---|---|---|---|
| select_one yes_no | farms | Does the household farm? | | | |
| integer | acres | How many acres were planted? | \${farms} = 'yes' | . > 0 and . <= 100 | Enter between 1 and 100 |
| integer | hh_size | How many people live here? | | . >= 1 and . <= 30 | Check household size |

The choices sheet holds a yes_no list with yes and no.

* The **relevant** column on the acres row means the question only appears when the farms answer is yes. The \${farms} syntax points to the earlier question by its name.
* In the **constraint** column, the dot means "this answer". The acres answer must be above 0 and at most 100.
* The **constraint_message** tells the enumerator what went wrong.
* Adding a **required** column with "yes" stops a question being skipped.

## Why this is computer work

XLSForm sheets grow wide, with many columns and long expressions. Editing them is far easier on a computer with a full spreadsheet program. You can still preview and test the resulting form on a phone, which you should always do.

## Pilot before you deploy

Always pilot test: fill in the form yourself with normal answers, odd answers and impossible answers, then with two or three real people. Hawa, a data officer in Tamale, pilots every survey with colleagues in Dagbani and English before deployment, and nearly always finds a confusing question or a constraint that is too strict. Fixing it then is far cheaper than cleaning bad data later.`,
      practice_task_md: `**Goal:** Write a small XLSForm with logic and test it.

**Steps:**
1. On a computer, open a spreadsheet program and create a workbook with sheets named survey and choices.
2. Add at least five questions, including one select_one question, one integer question with a constraint and constraint_message, and one question with a relevant condition based on an earlier answer.
3. Fill in the choices sheet for your select_one list.
4. Save as an Excel file and upload it to a KoboToolbox account or another tool that accepts XLSForm.
5. Preview the form on your phone or computer. Try an impossible number and check the message appears; answer no to your skip question and check the follow up disappears.

**Done looks like:** An uploaded XLSForm with working skip logic and a working constraint, plus screenshots of both. Write one change you made after testing.`,
      quiz: {
        questions: [
          {
            prompt: "Which three columns are required on the XLSForm survey sheet?",
            options: [
              "type, name and label",
              "relevant, constraint and required",
              "list_name, name and label, the same three columns used on the choices sheet",
              "question, answer and score",
            ],
            answer_index: 0,
            explanation: "The lesson lists type, name and label as the required survey sheet columns.",
          },
          {
            prompt: "What does the relevant column control?",
            options: [
              "The order in which choices appear",
              "Whether a question is shown, based on an earlier answer",
              "The colour of the question on screen",
              "How many enumerators can open the form at the same time on different phones",
            ],
            answer_index: 1,
            explanation: "The lesson explains relevant shows a question only when an earlier answer makes it relevant.",
          },
          {
            prompt: "In the constraint . >= 1 and . <= 30, what does the dot mean?",
            options: [
              "The end of the sentence",
              "The household's GPS point",
              "The answer to the very first question in the survey, whatever that question is",
              "The answer to the current question",
            ],
            answer_index: 3,
            explanation: "The lesson says in a constraint the dot means this answer.",
          },
          {
            prompt: "Why does the lesson say editing XLSForms is computer work?",
            options: [
              "Phones cannot open any spreadsheet files",
              "XLSForm files are illegal to edit on phones",
              "The sheets grow wide with many columns and long expressions",
              "Survey servers block uploads from phones, so XLSForms must be sent from a laptop",
            ],
            answer_index: 2,
            explanation: "The lesson explains wide sheets and long expressions are far easier to edit on a computer.",
          },
        ],
        pass_threshold: 75,
      },
    },
    websites: {
      outcomes: [
        "Decide whether a business needs a website",
        "Name the parts of any website",
        "Plan content first",
      ],
      explanation_md: `When a funder hears about a small NGO in Bolgatanga, the first thing they do is search for it online. When someone in Accra wants to order smocks from a weaver in Daboya, they want to see her work and a way to contact her. A simple, honest website helps people trust and find an organisation. Building and looking after these sites is a skill that appears in Ghanaian adverts for communications officers, social media officers, IT officers and web roles, often naming WordPress.

## Do they even need a website?

Start with the honest question. A trader whose customers all come through WhatsApp may be better served by a WhatsApp Business catalogue or a social media page. A website makes sense when people need to find the business through search, when funders or partners expect one, when there is more to say than a social profile allows, or when the business wants a place it controls rather than a platform's page.

## What this section covers

* **Choosing a website builder:** the range from simple page tools to full systems, and how to match one to the client.
* **WordPress basics:** pages, posts, themes, plugins, user roles, updates and backups.
* **Domains, hosting and a findable site:** how a site gets its own address, who should own the accounts, and checks for speed, search and accessibility.

## The parts of any website

Every website, however it is built, has the same basic parts:

* **Content:** the words, photos and contact details.
* **Structure:** which pages exist and how the menu links them. Most small sites need only Home, About, Services or Products, and Contact.
* **Design:** colours, fonts and layout, usually from a theme or template.
* **Address:** the web address people type, either an address on the builder's own domain or the organisation's own domain name.
* **Hosting:** the computer, called a web server, that stores the site and sends it to visitors' browsers.

With no code builders, the tool handles most of the technical parts. Your job is to plan clear content, choose sensible design settings and keep things updated.

## Phone and computer

You can read, test and make small edits to many sites from a phone, such as fixing opening hours or posting news. Setting a site up, choosing a theme and arranging pages are much easier on a computer with a full browser, so plan those for a computer session. Always check the finished site on a phone too, because many of your visitors will arrive on one using mobile data.

## A worked example

Sumaila is asked by a youth NGO in Wa to "make a website". Before choosing any tool he asks four questions: who should find the site, what they need to do on it, who will update it after he leaves, and what the NGO can afford each year. The answers are funders and volunteers; read about projects and get in touch; the programme officer, who is not technical; and very little.

That points to a small site with four pages, a simple builder or a basic WordPress setup, and a short guide for the programme officer. The tool choice comes last, after the questions.

## Content first

Collect the content before building: a short description, a few good photos taken with permission, a list of services, a phone number, an email address and a location. A beautiful empty template helps nobody. Clear words and real contact details do.`,
      practice_task_md: `**Goal:** Plan a small website for a real or imagined organisation.

**Steps:**
1. Pick an organisation you know: a shop, a church, a club, an NGO or a craftsperson.
2. Answer Sumaila's four questions for it: who should find the site, what they need to do, who will update it, and what it can afford.
3. Decide whether it truly needs a website or whether a social page or catalogue would be enough, and write why.
4. If it needs a site, sketch the pages and menu on paper.
5. Write the content for the Home page in under 100 words, and list the photos you would need permission for.

**Done looks like:** Written answers to the four questions, a decision with a reason, a page sketch and draft Home page text.`,
      quiz: {
        questions: [
          {
            prompt: "When does the lesson say a website makes sense for a business?",
            options: [
              "Whenever a business has more than one customer",
              "When people need to find it through search, or funders and partners expect one",
              "Only when the business already sells online and takes card payments through the site",
              "Never, because social media pages always replace websites",
            ],
            answer_index: 1,
            explanation: "The lesson lists search, funder expectations, more to say and wanting control as reasons for a website.",
          },
          {
            prompt: "What is hosting?",
            options: [
              "The colours and fonts a site uses",
              "The menu that links the pages",
              "The web server that stores the site and sends it to visitors' browsers",
              "The person who greets visitors on the Contact page and answers their questions",
            ],
            answer_index: 2,
            explanation: "The lesson defines hosting as the web server that stores the site and sends it to visitors.",
          },
          {
            prompt: "Which website task does the lesson say is much easier on a computer?",
            options: [
              "Choosing a theme and arranging pages",
              "Reading the site to check it loads",
              "Fixing the opening hours on the Contact page",
              "Posting a short news update",
            ],
            answer_index: 0,
            explanation: "The lesson says setting up, choosing a theme and arranging pages are much easier with a full browser.",
          },
          {
            prompt: "In Sumaila's example, when did he choose the tool?",
            options: [
              "Before talking to the NGO, using his favourite builder",
              "After the NGO had already paid for a year of a premium plan",
              "After building the pages",
              "Last, after asking who the site was for, what it must do, who would update it and the budget",
            ],
            answer_index: 3,
            explanation: "The example shows the tool choice coming after the four planning questions.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "site-builders": {
      outcomes: [
        "Compare website builders",
        "Choose a builder",
        "Build and publish a one page site",
      ],
      explanation_md: `No website builder is best for everyone. A good builder for a youth club is a poor one for a growing online shop. Knowing the trade offs lets you advise clients honestly and avoid sites that get abandoned after a month.

## The range of builders

Think of builders on a line from simple to powerful.

**Simple page tools.** Google Sites is an example. You drag text boxes, images and embedded items, such as a Google Form or a map, onto pages. There are few design choices, which makes it hard to make a mess but also limits what the site can do, with no built in shop. Good for a school club, a project page, an internal staff site or a first portfolio.

**All in one builders.** Wix and Squarespace are examples. They offer polished templates, drag and drop layout, and add ons for bookings, blogs or small shops, with hosting and security looked after for you. Easy to start, but you depend on one company: moving the site elsewhere later is usually hard, and the most useful features may need a paid plan.

**WordPress.** The WordPress software is open source and runs many business and NGO sites. It can be run on your own hosting or through hosted services such as WordPress.com. It is the most flexible option, with a large directory of themes and plugins, and the one Ghanaian adverts mention most. It also needs the most care: updates, backups and security. The next lesson covers it.

## How to choose

Ask these questions with the client:

* **Who will update it?** A non technical programme officer needs something simple and a short guide.
* **What must it do?** Information only, a blog, bookings, a shop?
* **What can they afford every year?** Remember domain renewals and any paid plan, now and later.
* **How much control do they need?** Do they need to move the site, add special features, or have several staff with different permissions?
* **Who already has accounts?** An organisation already using Google Workspace may find Google Sites easiest to manage.

Read the current plans page of any builder you consider, because features and limits change.

## Phone and computer

You can view and test all of these on a phone. Google's setup steps for Sites start on a computer, and building pages in any of these tools is far easier with a full screen and mouse. Some builders have apps for small edits, which suits a client who mainly uses a phone.

## A worked example: a one page site

Mariama wants a simple site for her tailoring business in Tamale. She chooses a simple page tool and builds one page with:

1. A heading with the business name and one line about what she sews.
2. Three photos of finished outfits, taken with the customers' permission.
3. Opening hours and location in plain text, not inside an image, so search engines and screen readers can read them.
4. An embedded order request form linked to a sheet.
5. A phone number and a link to her WhatsApp Business chat.

She checks it on her phone and a friend's computer, asks two customers for feedback, then publishes. Later, if she needs online payments or a blog, she can move to a more powerful builder, keeping her content and photos.

## Keep it simple

The most common failure is not a bad builder. It is a site nobody updates. Pick the simplest tool that does the job, and make sure the owner can change the basics without calling you.`,
      practice_task_md: `**Goal:** Build and publish a one page site.

**Steps:**
1. On a computer if possible, open a simple website builder such as Google Sites.
2. Build one page for a real or imagined small business with: a heading and one line description, two or three images you have rights to use, opening hours and location as text, and a contact method.
3. Embed the form you built in the online forms lesson, or add a link to it.
4. Preview the site in phone view and computer view, and fix anything that looks broken.
5. Publish it, open the link on a phone, and send it to one person for feedback.

**Done looks like:** A published one page site link that reads well on a phone, plus one change you made after feedback.`,
      quiz: {
        questions: [
          {
            prompt: "What is one drawback of all in one builders such as Wix and Squarespace, according to the lesson?",
            options: [
              "They cannot show photos",
              "They do not include hosting, so you must always find a separate web server yourself",
              "Moving the site elsewhere later is usually hard, and useful features may need a paid plan",
              "They can only be edited on a phone",
            ],
            answer_index: 2,
            explanation: "The lesson notes dependence on one company, hard migration and paid features as trade offs.",
          },
          {
            prompt: "Why does WordPress need the most care of the options described?",
            options: [
              "It needs updates, backups and attention to security",
              "It only works in one country",
              "It cannot be used by businesses",
              "It deletes every page automatically after a year unless the owner pays for a renewal plan",
            ],
            answer_index: 0,
            explanation: "The lesson says WordPress is the most flexible but needs updates, backups and security care.",
          },
          {
            prompt: "Why did Mariama put her opening hours in plain text rather than inside an image?",
            options: [
              "Images are not allowed on one page sites",
              "Plain text uses less ink when printed",
              "Plain text makes the page load more slowly, which keeps visitors on the page for longer",
              "So search engines and screen readers can read them",
            ],
            answer_index: 3,
            explanation: "The example says text, not images, lets search engines and screen readers read the hours.",
          },
          {
            prompt: "What does the lesson call the most common failure with small business websites?",
            options: [
              "Choosing the wrong colours",
              "A site nobody updates",
              "Using too few plugins and themes, so that the site looks plain next to competitors",
              "Publishing too early",
            ],
            answer_index: 1,
            explanation: "The lesson says the most common failure is a site nobody updates, so choose the simplest tool that works.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "wordpress-basics": {
      outcomes: [
        "Compare two ways to get WordPress",
        "Practise without hosting",
        "Keep a WordPress site healthy",
      ],
      explanation_md: `WordPress appears in Ghanaian adverts for communications officers, social media officers, IT officers and web developers. Often the job is not building a site from nothing but looking after one: adding news, updating pages, installing a plugin, keeping things updated. Those are learnable without code, and they make you useful to many organisations.

## Two ways to get WordPress

* **WordPress software (from WordPress.org):** open source software that you install on hosting you rent. You control everything, and you are responsible for updates and backups.
* **Hosted WordPress (such as WordPress.com):** a company runs the software for you. Less to manage, but some features depend on the plan.

Both use the same dashboard ideas, so the skills transfer.

## Practise without hosting

**WordPress Playground** runs WordPress inside your browser with no hosting needed. It is a good place to explore the dashboard, try themes and break things safely. Treat it as a practice space and check whether your work is kept before you rely on it.

## The core ideas

**Pages and posts.** Pages are for content that rarely changes, such as About, Services and Contact. Posts are dated entries shown newest first, such as news, project updates or a blog. Posts can have categories and tags; pages usually sit in the menu.

**The block editor.** Content is built from blocks: a paragraph, a heading, an image, a button, a list. You add a block, type or choose content, and move it up or down.

**Themes.** A theme controls the design: layout, colours and fonts. Changing the theme changes the look without changing your content. Many modern themes let you adjust headers, footers and colours in the Site Editor.

**Plugins.** Plugins add features, such as a contact form, an image optimiser, extra security or a backup tool. Every plugin is extra code that must be kept updated, so install only what you need, from trusted sources, and remove plugins you no longer use.

**User roles.** WordPress has roles that limit what each person can do. An **Administrator** can manage the whole site. An **Editor** can publish and manage everyone's posts. An **Author** can publish and manage their own posts. A **Contributor** can write and manage their own posts but cannot publish them. A **Subscriber** can only manage their own profile. Give each person the lowest role that lets them do their job.

## Keeping a site healthy

* **Updates.** WordPress itself, themes and plugins all receive updates, many fixing security problems. Check for them regularly.
* **Backups.** Keep regular backups of files and database, stored somewhere other than the site's own hosting.
* **Strong logins.** Use strong passwords, avoid the username "admin", and turn on two step verification where available.

## A worked example

Fuseini becomes the volunteer web person for a farmers' cooperative in Karaga. He gives the secretary an Author account to post market updates, keeps the Administrator role for himself and the chairman, and removes three old plugins nobody uses. Each month he updates WordPress, the theme and plugins, after first making a backup. When the secretary asks to change the homepage design, Fuseini explains why her role cannot, and makes the change for her.

## Phone and computer

The dashboard opens in a phone browser, and posting a short update from a phone works. Choosing themes, editing templates and managing plugins are much easier on a computer.`,
      practice_task_md: `**Goal:** Practise the core WordPress jobs in a safe space.

**Steps:**
1. On a computer if possible, open WordPress Playground in your browser.
2. Create two pages (About and Contact) and two posts (news items for a made up cooperative or club).
3. Add a menu with your two pages.
4. Switch to a different theme and note what changed and what stayed the same.
5. Install one plugin, then deactivate and delete it.
6. Add a user with the Author role and write one sentence explaining why you did not make them an Administrator.

**Done looks like:** Screenshots of your pages, posts, menu and the user list, plus your sentence on roles. If Playground does not keep your work, the screenshots are your evidence.`,
      quiz: {
        questions: [
          {
            prompt: "Which should be a page rather than a post?",
            options: [
              "A dated project update from last week",
              "News about a training held yesterday",
              "A monthly market price update",
              "An About section that rarely changes",
            ],
            answer_index: 3,
            explanation: "The lesson says pages are for content that rarely changes, while posts are dated entries.",
          },
          {
            prompt: "What can a Contributor do in WordPress?",
            options: [
              "Write and manage their own posts but not publish them",
              "Manage the whole site, including themes and plugins",
              "Publish and manage everyone's posts",
              "Only read the site, without any ability to write anything at all",
            ],
            answer_index: 0,
            explanation: "The lesson describes Contributors as able to write and manage their own posts but not publish them.",
          },
          {
            prompt: "Why should you install only the plugins you need?",
            options: [
              "WordPress allows only three plugins on each site",
              "Every plugin is extra code that must be kept updated",
              "Plugins delete your posts when they are switched on",
              "Plugins change the site's domain name every time a new one is installed",
            ],
            answer_index: 1,
            explanation: "The lesson warns every plugin is extra code that must be updated, so remove what you do not use.",
          },
          {
            prompt: "What is WordPress Playground useful for, according to the lesson?",
            options: [
              "Hosting a business site permanently with its own domain",
              "Sending marketing emails to customers",
              "Exploring WordPress in the browser without hosting, as a practice space",
              "Backing up a live site's database every night to another server",
            ],
            answer_index: 2,
            explanation: "The lesson describes Playground as running WordPress in the browser with no hosting, good for practice.",
          },
          {
            prompt: "In the worked example, what did Fuseini do before each monthly update?",
            options: [
              "Deleted all old posts",
              "Changed the theme",
              "Made a backup",
              "Asked every member of the cooperative to log out and change their passwords",
            ],
            answer_index: 2,
            explanation: "The example says he updates WordPress, themes and plugins after first making a backup.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "going-live": {
      outcomes: [
        "Explain domains and hosting and who owns the accounts",
        "Make a site secure and fast on mobile data",
        "Make a site findable and accessible",
      ],
      explanation_md: `A site that sits on a builder's own address can be enough for practice or a club. A real business or NGO usually wants its own address, a site that loads fast on mobile data, and a way for people to find it. Web roles in Ghana mention hosting control panels, accessibility and keeping sites maintained. This lesson explains the pieces in plain terms so you can set them up, or at least advise clients well.

## Domains and hosting

A **domain name** is the human friendly address, such as an imagined **savannahshea.com.gh**. You rent it from a **registrar**, usually for a year at a time, and you must **renew** it or lose it. Choose something short, easy to spell when said aloud, and close to the business name.

**Hosting** is the web server where the site's files live. With builders such as Google Sites or Wix, hosting is included. With WordPress software, you rent hosting, often managed through a control panel.

**DNS** (the Domain Name System) is the directory that connects the name to the server. When you connect a domain to a site, you change DNS settings at the registrar, following the builder's or host's instructions. Changes can take some time to spread.

## Who owns the accounts?

This is where many small organisations get hurt. If the domain is registered in a freelancer's personal account and that person disappears, the business can lose its own address. So:

* Register the domain and hosting in the **client's name and email**.
* Add yourself as a helper or share access safely, not the other way round.
* Write down renewal dates and set reminders.

## HTTPS

Visitors' browsers expect a secure connection, shown by **https** in the address bar, and in many browsers a lock icon. This needs a security certificate. Many builders and hosts provide one, but check it is switched on, because browsers warn visitors away from sites without it.

## Fast on mobile data

Many visitors arrive on phones with prepaid data and weak signal.

* Resize and compress photos before uploading. A huge camera photo can weigh more than the rest of the page.
* Avoid autoplay videos and heavy sliders.
* Use few plugins and fonts.
* Test with a tool such as PageSpeed Insights and fix the biggest problems it lists.

## Findable

* Give every page a clear title and write the business name, what it does and the town in plain text.
* Make the Contact page complete, with phone, email and location.
* Google's SEO starter guide explains the basics of how Google finds and shows pages.

## Accessible

* Add **alt text** to images: a short description for people using screen readers.
* Use real headings in order, not just big bold text.
* Keep strong contrast between text and background.
* Make buttons and links large enough to tap.

## A worked example

Hawa launches a site for a shea butter group in Nalerigu. She registers the domain in the group's name using the group's email, connects it to the builder, checks the address starts with https, compresses six photos, adds alt text and runs a speed test. She writes the renewal date and logins in a handover sheet kept by the group's treasurer.`,
      practice_task_md: `**Goal:** Make your one page site ready for real visitors.

**Steps:**
1. Open the site you built in the site builders lesson.
2. Write three possible domain names for it and choose the best, explaining why in one line. Do not buy one.
3. Check every image: compress any large ones and add alt text.
4. Run PageSpeed Insights on your published address and write down the top two suggestions.
5. Fix at least one of them, then test again.
6. Write a short "account ownership" note saying whose name and email the domain and hosting would be registered under, and where renewal dates would be recorded.

**Done looks like:** A chosen domain name with a reason, images with alt text, before and after speed notes, and a clear ownership note.`,
      quiz: {
        questions: [
          {
            prompt: "What does DNS do?",
            options: [
              "Stores the photos on the website",
              "Connects the domain name to the server where the site lives",
              "Checks the spelling on every page",
              "Sends the site owner an invoice when the hosting plan is close to running out",
            ],
            answer_index: 1,
            explanation: "The lesson describes DNS as the directory that connects the name to the server.",
          },
          {
            prompt: "Whose name and email should a client's domain be registered under?",
            options: [
              "The client's own name and email",
              "The freelancer's personal account, so they can fix problems quickly",
              "Any friend who has a credit card",
              "The web designer's company, which then rents it back to the client every year",
            ],
            answer_index: 0,
            explanation: "The lesson warns that domains in a freelancer's account can be lost, so register them to the client.",
          },
          {
            prompt: "Which change most helps a page load faster on mobile data?",
            options: [
              "Adding an autoplay video to the home page",
              "Installing more fonts",
              "Uploading photos straight from the camera at full size so they look sharp on every screen",
              "Resizing and compressing photos before uploading",
            ],
            answer_index: 3,
            explanation: "The lesson says large camera photos can outweigh the rest of the page, so compress them.",
          },
          {
            prompt: "What is alt text?",
            options: [
              "A backup copy of the page",
              "The secret password for the hosting account",
              "A short image description for people using screen readers",
              "A second version of the site in another language for visitors from outside Ghana",
            ],
            answer_index: 2,
            explanation: "The lesson defines alt text as a short description of an image for screen reader users.",
          },
        ],
        pass_threshold: 75,
      },
    },
    apps: {
      outcomes: [
        "Explain how sheet based apps work",
        "Know when not to build an app",
        "Decide whether a situation needs an app",
      ],
      explanation_md: `A spreadsheet is great for the person who built it. For a shop assistant recording sales on a busy afternoon, or a field officer checking which farmers received seed, scrolling through rows and columns on a small screen is slow and easy to get wrong. A simple app solves this. It sits on top of the same table and shows each person clear screens: a list to search, a form to add a record, a button to mark something done.

No code app builders make this possible without programming. Remote and freelance adverts name tools such as Softr, Glide and Power Apps, and university and corporate roles ask for Power Apps alongside Power Automate. In Ghana, the demand is more often a small client project: a stock app for a shop, a member list for a cooperative, an attendance tracker for a school club.

## How sheet based apps work

1. **Data.** Your table, such as a Google Sheet, an Excel file or an Airtable base, holds the records. Each tab becomes a table in the app.
2. **Screens.** The builder reads your columns and suggests screens: a list of records, a detail view for one record, and a form to add or edit.
3. **Actions.** Buttons do things: add a row, update a status, call a phone number, open a map.
4. **Users.** You decide who can sign in and what each person can see or change.

When someone adds a record in the app, it appears in the table. When you fix a row in the table, the app shows the change. The data lives in one place.

## What this section covers

* **Apps from a spreadsheet:** connecting a table, shaping the screens and testing the app.
* **Planning screens, users and permissions:** sketching first, deciding who sees what, and designing for small screens.

## Your data skills matter here

Everything from the data section pays off now. App builders depend on one row per record, clear headings, unique IDs and consistent data types. A date column becomes a date picker; a column of choices becomes a dropdown; an ID lets one table link to another. A messy sheet produces a confusing app, and no builder can fix that for you.

## Phone and computer

Apps built this way are meant to be used on phones, and many can be added to a phone's home screen. Building them is a different matter: app editors show your data, screens and settings side by side and are designed for a computer browser. Plan to build on a computer and test on the phones your users actually carry.

## Know when not to build an app

An app adds something to maintain. If only one person uses the data, a well organised sheet may be enough. If people only need to submit information, a form may be enough. Build an app when several people need to view and update the same records in a structured way, often on the move.

## A worked example

Abdul-Rahman manages a small agro input shop in Yendi. His two assistants record sales in an exercise book, and stock runs out without warning. He already has a clean sheet with tabs for products, sales and restocks. An app gives the assistants a sales form with a product dropdown and a quantity field, and gives him a list of products with stock below a set level. The exercise book retires, and he spots low stock days before it runs out.

Notice the order: the clean sheet came first, then the app.`,
      practice_task_md: `**Goal:** Decide whether a real situation needs an app.

**Steps:**
1. Choose a situation you know: a shop's stock, a club's attendance, a savings group's contributions or a church's equipment list.
2. Write who uses the information and what each person needs to do with it: view, add, update or only submit.
3. Decide whether a sheet alone, a form, or an app is the right answer, and write two sentences explaining why.
4. If an app is right, list the tables (tabs) it needs and the columns in each, with one ID column per table.

**Done looks like:** A short written decision with reasons and, if needed, a list of tables and columns ready for the next lesson.`,
      quiz: {
        questions: [
          {
            prompt: "Where does the data of a sheet based app live?",
            options: [
              "In a separate copy on each user's phone that never syncs with anything else",
              "In the table the app is built on, so changes appear in both",
              "Inside the app builder only, with no table at all",
              "In an email inbox",
            ],
            answer_index: 1,
            explanation: "The lesson explains records added in the app appear in the table and table changes appear in the app.",
          },
          {
            prompt: "When does the lesson say an app is worth building?",
            options: [
              "When only one person uses the data",
              "Whenever a client has a spreadsheet of any size",
              "When people only need to submit information once",
              "When several people need to view and update the same records, often on the move",
            ],
            answer_index: 3,
            explanation: "The lesson suggests a sheet or form may be enough otherwise, and an app fits shared viewing and updating.",
          },
          {
            prompt: "What happens to a date column when an app builder reads a clean sheet?",
            options: [
              "It can become a date picker on the form",
              "It is deleted because apps cannot show dates",
              "It turns into free text that users type however they like, which keeps things flexible",
              "It becomes a phone number field",
            ],
            answer_index: 0,
            explanation: "The lesson says builders use column types, so a date column becomes a date picker.",
          },
          {
            prompt: "What device advice does the lesson give for app building?",
            options: [
              "Build and test only on the newest phone you can find",
              "Never test on phones, because the apps are only for desktop users",
              "Build on a computer and test on the phones your users actually carry",
              "Build on a phone, because app editors are designed for small screens",
            ],
            answer_index: 2,
            explanation: "The lesson says editors are designed for a computer browser, while testing should use real users' phones.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "apps-from-sheets": {
      outcomes: [
        "Build a working app from a sheet step by step",
        "Keep the sheet behind an app healthy",
        "Name the main sheet based app tools",
      ],
      explanation_md: `Building your first app from a spreadsheet is one of the most satisfying moments in no code work. Within an hour you can turn a tidy sheet into something that looks and feels like a real phone app. This lesson walks through the general steps using tools such as Glide, AppSheet and Power Apps as examples. Their menus differ, but the ideas are the same.

## The tools, briefly

* **AppSheet** (from Google) builds apps from Google Sheets, Excel or Smartsheet. Its documentation describes tables, views such as table, gallery, form, map and dashboard, and security filters that limit which rows each user can see.
* **Glide** builds apps from sheets and its own tables, and apps can be shared by link and added to a phone's home screen.
* **Power Apps** (from Microsoft) is common in organisations that use Microsoft 365, often with SharePoint lists or Excel.
* **Softr** builds apps and portals on top of Airtable and other sources.

Check each tool's current plans page before choosing, because who can use an app and how you share it can depend on the plan.

## Step by step

**1. Prepare the sheet.** One tab per kind of record, headings in row one, an ID column, consistent types. Add five to ten realistic rows so the builder can guess column types and you can see what screens look like.

**2. Connect it.** In the builder, create a new app and choose your sheet. The builder reads each tab as a table and suggests screens.

**3. Check the column types.** Make sure dates are dates, amounts are numbers, phone numbers are phone types and choice columns are lists. This controls the keyboard and inputs users see.

**4. Shape the screens.**
* A **list** or **gallery** screen shows records, often with a search box.
* A **detail** screen shows one record.
* A **form** screen adds or edits records.

Hide columns users do not need, such as internal IDs, and put the most important field first.

**5. Add filters and actions.** A filter can show only items with low stock, or only today's orders. An action can mark an order as delivered, or call a customer's number with one tap.

**6. Link tables.** If your orders tab stores a customer ID, set up a relation so an order screen shows the customer's name and phone.

**7. Test and share.** Use the builder's preview, then open the app on a real phone. Add a record, edit it, and check the sheet updates. Then invite a few real users.

## A worked example

Hawa builds a stock app for a provisions shop in Bolgatanga. Her sheet has a products tab (product_id, name, price, stock, reorder_level) and a sales tab (sale_id, date, product_id, qty, recorded_by). In the builder she sets up a product list with a search box, a sales form with a product dropdown linked to the products tab, and a filtered list called "Reorder" showing products where stock is at or below the reorder level.

Testing on the shop owner's phone, she notices the price field opens a text keyboard. She changes the column type to a number, and the number pad appears. Small fixes like this make an app pleasant to use.

## Keep the sheet healthy

Once an app is live, avoid renaming or deleting columns in the sheet, which can break screens. Make structural changes in a copy, test, then switch.`,
      practice_task_md: `**Goal:** Build a working app from a sheet.

**Steps:**
1. Prepare a sheet with two tabs, such as products and sales, each with an ID column and five to ten made up rows. Your phone is fine for this.
2. On a computer if you can, open an app builder such as AppSheet or Glide and create an app from the sheet.
3. Check and fix column types, especially dates, numbers and choice lists.
4. Build a list screen with search, a form to add records, and one filtered list such as low stock items.
5. Link the sales tab to products using the ID.
6. Preview the app in the builder, and on a phone if your tool's plan allows: add a record and confirm it appears in the sheet.

**Done looks like:** A working app preview, a sheet that updates when you add a record, and three screenshots: the list, the form and the filtered view. Note one fix you made after testing on a phone.`,
      quiz: {
        questions: [
          {
            prompt: "According to its documentation as described in the lesson, which data sources does AppSheet support?",
            options: [
              "Only paper forms that are scanned and uploaded by hand",
              "WhatsApp chats",
              "Google Sheets, Excel and Smartsheet",
              "Only Airtable",
            ],
            answer_index: 2,
            explanation: "The lesson says AppSheet builds apps from Google Sheets, Excel or Smartsheet.",
          },
          {
            prompt: "Why should you check column types after connecting a sheet?",
            options: [
              "They control the keyboard and inputs users see, such as a date picker or number pad",
              "Column types decide the app's colour scheme",
              "Builders refuse to open sheets with more than five columns",
              "Changing column types deletes every row in the sheet, so it must be done before adding any data",
            ],
            answer_index: 0,
            explanation: "The lesson explains column types control inputs, like Hawa's number pad fix.",
          },
          {
            prompt: "What did Hawa's Reorder list show?",
            options: [
              "Every sale ever recorded",
              "All customers who owe money, sorted by the date they last visited the shop",
              "Products with stock at or below the reorder level",
              "Staff who recorded the most sales",
            ],
            answer_index: 2,
            explanation: "The example describes a filtered list of products at or below their reorder level.",
          },
          {
            prompt: "What does linking the sales tab to products by ID allow?",
            options: [
              "Sales and products to be stored in one cell together",
              "A sales screen to show product details using the stored ID",
              "Each sale to be deleted automatically after a week",
              "Users to skip the product field entirely, because the app will guess which product was sold",
            ],
            answer_index: 1,
            explanation: "The lesson's relation step lets one table show details from another through the ID.",
          },
          {
            prompt: "Once an app is live, what does the lesson warn against doing directly in the sheet?",
            options: [
              "Adding new rows of data",
              "Viewing the sheet on a phone",
              "Sorting a copy of the data",
              "Renaming or deleting columns, which can break screens",
            ],
            answer_index: 3,
            explanation: "The lesson advises making structural changes in a copy first, because renaming or deleting columns can break the app.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "planning-app-screens": {
      outcomes: [
        "Start an app plan with people, not screens",
        "Sketch screens on paper first",
        "Decide who sees and changes what",
      ],
      explanation_md: `The fastest way to build a bad app is to open the builder first. The best no code builders spend their first hour with paper and the people who will use the app. Corporate roles that ask for Power Apps also ask for end user support, and good planning is what keeps support calls few.

## Start with people, not screens

List every type of user and what each needs to do. For a cooperative's input loan app:

* **Field officer:** register a farmer, record inputs given, check a farmer's balance.
* **Cashier:** record repayments.
* **Manager:** see totals, overdue loans and each officer's activity.
* **Farmer:** probably does not use the app at all, but may receive a message.

Each user's tasks become screens. A task done ten times a day deserves a big, obvious button. A task done once a month can sit in a menu.

## Sketch on paper first

Draw each screen as a phone sized rectangle. Write what appears at the top, the main content, and the buttons. Draw arrows between screens to show how a person moves. Then walk through a real task with your finger: "A farmer arrives. I search her name, tap her, tap Record inputs, choose fertiliser, enter two bags, save." If you get stuck on paper, you will get stuck in the app.

Paper sketches cost nothing, need no data, and are easy to change. Show them to a real user and ask, "What would you tap next?"

## Who sees and changes what

Permissions protect data and keep apps simple.

* **Show only what each person needs.** A cashier does not need farmers' full loan history.
* **Limit editing.** Field officers add records but cannot delete them; only the manager can.
* **Filter rows by user.** Many builders can show each person only their own records, using their sign in email. AppSheet calls these security filters.
* **Keep sensitive columns out of sight.** If a column is not needed on a screen, hide it, and consider whether it needs to be collected at all.

Write these rules in a simple table before building: user type down the side, screens across the top, and view, add, edit or none in each cell.

## Designing for small screens

* One main task per screen.
* Big tap targets and short labels.
* Put the most important information first; avoid wide tables.
* Use dropdowns, toggles and number fields instead of typing.
* Show clear confirmation after saving, so people do not save twice.
* Test outdoors in sunlight, and on a basic phone, not just a new one.

## A worked example

Amina plans an attendance app for an adult literacy programme in Savelugu. Facilitators need to mark attendance quickly at the start of each class; the coordinator needs weekly totals per centre. Her paper sketch has three screens for facilitators: choose today's class, tick learners present, save. The coordinator gets a summary screen. In her permissions table, facilitators can only see their own centre's learners and cannot delete records.

When she shows the sketch to a facilitator, he points out that some learners share names, so Amina adds each learner's photo with consent, or a short ID, to the list. That one change, found on paper, saved a confusing first week.`,
      practice_task_md: `**Goal:** Plan an app on paper before building it.

**Steps:**
1. Use the situation you chose in the apps section lesson, or a new one.
2. List each type of user and the tasks they need to do.
3. On paper, sketch every screen as a phone sized box with arrows between screens.
4. Make a permissions table: user types down the side, screens across the top, and view, add, edit or none in each cell.
5. Walk one real person through the sketch and ask what they would tap next. Change anything that confused them.

**Done looks like:** A photo of your sketched screens, a permissions table and one change you made after the walk through.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson recommend sketching screens on paper first?",
            options: [
              "App builders cannot be opened until a sketch is uploaded",
              "Paper sketches are free, need no data, are easy to change and reveal problems early",
              "Clients expect a printed design document before any work can legally begin",
              "Paper sketches automatically become working apps",
            ],
            answer_index: 1,
            explanation: "The lesson says paper costs nothing, needs no data, is easy to change, and getting stuck on paper predicts getting stuck in the app.",
          },
          {
            prompt: "What does AppSheet call filters that show each user only certain rows?",
            options: [
              "Security filters",
              "Sort orders",
              "Column types",
              "Reorder levels, which are set on each product in the stock tab",
            ],
            answer_index: 0,
            explanation: "The lesson names AppSheet's security filters as a way to show each person only their records.",
          },
          {
            prompt: "Which design choice suits small screens, according to the lesson?",
            options: [
              "Wide tables showing every column at once",
              "Several main tasks on each screen",
              "Long typed answers instead of dropdowns, because they collect more detail",
              "One main task per screen with big tap targets",
            ],
            answer_index: 3,
            explanation: "The lesson lists one main task per screen and big tap targets for small screens.",
          },
          {
            prompt: "What problem did the facilitator spot in Amina's sketch?",
            options: [
              "The coordinator could not see weekly totals",
              "The app needed a payment screen",
              "Some learners share names, so the list needed a photo or short ID",
              "Facilitators wanted to delete attendance records that they had entered by mistake",
            ],
            answer_index: 2,
            explanation: "The facilitator noticed shared names, so Amina added a photo with consent or a short ID.",
          },
        ],
        pass_threshold: 75,
      },
    },
    automation: {
      outcomes: [
        "Explain what an automation is",
        "Compare three ways to automate",
        "Automate carefully",
      ],
      explanation_md: `Every office has jobs that eat time without needing much thought: copying form answers into another sheet, emailing a confirmation, reminding people about a deadline, telling a manager when stock is low. Automation tools do these jobs by themselves, every time, without forgetting. Remote operations and systems roles name tools such as Zapier, Make and Power Automate, and ask people to build, monitor and fix workflows. Even where no advert mentions automation, a person who can save a team hours each week stands out.

## What an automation is

An automation, sometimes called a workflow, is a set of steps that runs by itself when something happens. It always has:

* a **trigger**: the event that starts it, such as a new form response, a new row, a new email or a set time each Monday;
* one or more **actions**: the things it then does, such as adding a row, sending an email, creating a calendar event or posting a message.

Some workflows add **conditions** (only continue if the amount is over a limit), **formatting** steps (tidy a phone number) or **branches** (do one thing for new customers and another for returning ones).

## Three ways to automate

* **Built in features.** Many tools automate themselves. A form can email you each response; a spreadsheet can highlight overdue rows; a messaging app can send an away message. Always check these first.
* **Connector tools.** Zapier, Make, Power Automate and n8n connect many apps through a visual editor. Zapier calls a workflow a Zap; Make calls it a scenario; Power Automate calls it a flow.
* **Light scripting.** Google Apps Script and similar tools go further with a little code. This is low code territory and optional for this track.

## What this section covers

* **Triggers, actions and workflows:** how to map a manual process before building.
* **Automation tools and their limits:** what each type suits, plan limits, and checking and fixing failed runs.
* **Automatic emails and messages:** helpful confirmations and replies without spamming people.
* **AI steps and agents, used carefully (optional):** where AI helps and where a person must stay in charge.

## Phone and computer

Mapping a process works on paper. Building multi step workflows needs room to see both apps' fields side by side, so use a computer. Checking whether today's runs worked, and switching a workflow off in an emergency, are easy from a phone.

## Automate carefully

An automation does exactly what you tell it, very fast, many times. A mistake can send fifty wrong messages before anyone notices. So start small, test with your own details, watch the first real runs, and make sure someone knows how to switch it off.

## A worked example

Issahaku helps a computer training centre in Tamale. Every registration arrives by form, and the administrator copies each one into a class list, then sends a welcome message by hand. Issahaku maps it: trigger, new form response; action one, add the student to the class list tab; action two, send a welcome email with the start date. He tests with his own email, checks the class list, then switches it on. The administrator now spends her time answering real questions instead of copying.`,
      practice_task_md: `**Goal:** Find and describe automations you already meet.

**Steps:**
1. Think of three automatic messages or actions you have received: a payment confirmation, a delivery update, a reminder or an auto reply.
2. For each, write the likely trigger and the action.
3. Think of one repeated task in a group or business you know that could be automated, and write its trigger and actions in plain words.
4. Write one thing that could go wrong if that automation made a mistake, and who should be able to switch it off.

**Done looks like:** Three trigger and action pairs from real life, one proposed automation in plain words, and one risk with a named person who can stop it.`,
      quiz: {
        questions: [
          {
            prompt: "What is a trigger in an automation?",
            options: [
              "The final message the automation sends",
              "The event that starts the automation, such as a new form response",
              "The password used to connect two apps",
              "A report showing how much time the automation has saved the team since it was switched on",
            ],
            answer_index: 1,
            explanation: "The lesson defines a trigger as the event that starts it.",
          },
          {
            prompt: "What does Make call a workflow?",
            options: [
              "A scenario",
              "A Zap",
              "A flow",
              "A plugin that is installed on a website to send emails",
            ],
            answer_index: 0,
            explanation: "The lesson says Zapier calls it a Zap, Make a scenario and Power Automate a flow.",
          },
          {
            prompt: "What should you check before reaching for a connector tool?",
            options: [
              "Whether a paid plan is available",
              "Whether the client has a website",
              "Whether a script could do it in fewer steps",
              "Whether the tools already have a built in feature that does the job",
            ],
            answer_index: 3,
            explanation: "The lesson says to always check built in features first.",
          },
          {
            prompt: "Why does the lesson say to start small and watch the first real runs?",
            options: [
              "Automations only work during office hours",
              "Automations slow down your phone",
              "A mistake can repeat many times very fast before anyone notices",
              "Watching runs is required before a tool lets you save the workflow or give it a name",
            ],
            answer_index: 2,
            explanation: "The lesson warns that a mistake can send many wrong messages quickly.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "triggers-and-actions": {
      outcomes: [
        "Watch and map a manual process",
        "Mark its triggers, actions and data",
        "Think through what can go wrong",
      ],
      explanation_md: `Most failed automations fail before anyone opens a tool. Someone automates a process they have not fully understood, the workflow does something slightly wrong, and people stop trusting it. The fix is simple and costs nothing: map the process on paper first. Operations roles that ask for automation skills also ask for written procedures, and mapping is where both start.

## Step 1: watch the manual process

Sit with the person who does the job, or ask them to explain it step by step. Write down every step, in order, including the small ones people forget to mention: "I check that the phone number looks right", "if they paid by mobile money I write the reference".

## Step 2: mark the parts

For each step, ask:

* **Is this the start?** That event becomes the **trigger**.
* **Is this a clear rule?** "Add the order to the orders sheet" can be an **action**.
* **Is this a decision?** "Only if the order is over a certain amount" becomes a **condition**. "If delivery, do this; if pick up, do that" becomes a **branch**.
* **Does it need a person's judgement?** Leave it with a person, perhaps with a notification so they know it is waiting.

## Step 3: list the data

Every action needs data from somewhere. Write which fields move from the trigger to each action: customer name, phone, item, amount. This is called **mapping fields**. If a field the action needs does not exist in the trigger, you must collect it, perhaps by adding a question to the form.

## Step 4: think about what goes wrong

* What if a required field is blank?
* What if the same person submits twice?
* What if the email bounces or the phone number is wrong?
* What happens if the workflow stops for a day? Who notices?

Decide now how each case is handled, even if the answer is "a person checks a list each Friday".

## A worked example

Wumpini maps how a hair salon in Tamale handles bookings. Today: a customer messages, the owner checks her notebook, replies with a time, writes the booking down and sometimes forgets to remind the customer.

Her map:

1. **Trigger:** a customer submits the booking form (name, phone, service, preferred date and time).
2. **Action:** add a row to the bookings sheet.
3. **Condition:** if the service is braiding, which takes long, notify the owner to confirm the slot personally.
4. **Action (other services):** send the customer a confirmation email if they gave one.
5. **Scheduled trigger (separate workflow):** each morning, find today's bookings and send the owner a list.

She keeps one step human: the owner confirms long braiding bookings herself, because she knows which stylists are free. Field mapping shows the form lacked an email question, so she adds an optional one with a line explaining why it is asked.

## Draw it simply

A map can be a numbered list, boxes and arrows on paper, or a table with columns for step, type (trigger, action, condition, person) and data needed. Keep it; it becomes part of your handover document later.

## Why this matters for your career

Anyone can click buttons in an automation tool. People who can explain a process clearly, find its weak points and decide what should stay human are the ones trusted with real systems.`,
      practice_task_md: `**Goal:** Map a real manual process ready for automation.

**Steps:**
1. Choose a process from your own life or a business you know, such as orders, bookings, registrations or reminders.
2. Write every step in order. If possible, ask the person who does it.
3. Label each step: trigger, action, condition, branch or person.
4. List the data fields that move between steps, and mark any that are not collected yet.
5. Write at least three things that could go wrong and how each would be handled.

**Done looks like:** A one page process map with labelled steps, a list of fields, and three handled problems. Share it with the person who does the job and ask if anything is missing.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say most failed automations have in common?",
            options: [
              "They were built with the wrong tool brand",
              "They were built on a phone instead of a computer",
              "Someone automated a process they had not fully understood",
              "They used too few actions, so the workflow could not finish the job it was given",
            ],
            answer_index: 2,
            explanation: "The lesson says most failures happen because the process was not understood before building.",
          },
          {
            prompt: "In a process map, what does a step needing a person's judgement become?",
            options: [
              "A step left with a person, perhaps with a notification",
              "A trigger",
              "An action the tool must guess",
              "A step that is deleted from the process because automations cannot include people",
            ],
            answer_index: 0,
            explanation: "The lesson says judgement steps stay with a person, possibly notified by the automation.",
          },
          {
            prompt: "What is mapping fields?",
            options: [
              "Drawing a map of where customers live",
              "Choosing colours for each column in a sheet",
              "Writing which data moves from the trigger to each action",
              "Counting how many fields are in a farmer's land so the survey can record the farm size",
            ],
            answer_index: 2,
            explanation: "The lesson defines mapping fields as listing which fields move from the trigger to each action.",
          },
          {
            prompt: "Why did Wumpini keep the braiding confirmation as a human step?",
            options: [
              "Braiding customers do not have phones",
              "The automation tool cannot send emails",
              "The salon asked for every step to be done by hand",
              "The owner knows which stylists are free for long bookings",
            ],
            answer_index: 3,
            explanation: "The example says the owner confirms braiding personally because she knows stylist availability.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "automation-tools": {
      outcomes: [
        "Compare the main types of automation tool",
        "Watch runs and explain why they fail",
        "Build, break and fix a simple automation",
      ],
      explanation_md: `Once a process is mapped, you choose how to build it. No single tool is best. Remote operations adverts name Zapier, Make and Power Automate, and some ask candidates to monitor workflows and troubleshoot failures. This lesson compares the main types and shows how to keep automations healthy.

## The main types

**Connector tools.** These connect many apps through a visual editor.

* **Zapier:** a workflow is a Zap, with one trigger and one or more actions, built as a list of steps.
* **Make:** a workflow is a scenario, built as a diagram of connected modules, which makes branches and loops easy to see.
* **Power Automate:** a workflow is a flow; it fits organisations already using Microsoft 365.
* **n8n:** its code is publicly available, so teams with technical help can host it themselves, or use it as a hosted service.

**Built in automation.** Google Forms, spreadsheets, messaging apps, website builders and app builders often have their own rules, notifications and scheduled actions. These are usually simplest to keep running, with nothing extra to connect.

**Light scripting.** Google Apps Script can run small programs when a form is submitted or at set times, inside Google tools. It needs some code, which makes it optional here, but it is useful to know it exists.

## Plans and limits

Connector tools measure use in different ways: runs, tasks or operations, the number of steps, how often triggers check for new data, and which apps are available. Some triggers check for new data at intervals rather than instantly. These details differ by tool and plan and change, so for each project:

* Estimate how many times the workflow will run each month and how many steps it has.
* Read the tool's current plans page and note the date.
* Tell the client what happens if usage grows, and who would pay.

## Watching runs

Every connector tool keeps a record of runs. Zapier calls it Zap history and lets you replay failed runs from it; Make keeps a history for each scenario and stores some failed runs as **incomplete executions** that can be resolved; Power Automate shows run history for each flow. Checking it is the first step in any problem.

## Why runs fail

* **Expired connection.** A password changed or permission was removed, so the tool cannot reach an app. Reconnect the account.
* **Changed structure.** Someone renamed a sheet column or form question that a step depended on. Restore the name or update the step.
* **Missing or odd data.** A required field was blank, or a date was in the wrong format. Add validation to the form, or a formatting step.
* **Limits reached.** The plan's monthly usage ran out. Check the plan and usage page.

## A worked example

Every Monday, a workflow emails Sumaila's client in Tamale a list of new orders from a form. One week, nothing arrives. Sumaila opens the run history on his phone and sees the runs failed with an error about a missing column. The owner had renamed "Phone" to "Customer phone" in the sheet. Sumaila updates the step on a computer, replays the failed run where the tool allows, and adds a note to the handover guide: do not rename columns without telling him.

## Choosing well

Prefer built in features when they do the job. Choose a tool the client can understand and afford. Keep workflows short; several small ones are easier to fix than one giant one. Name every workflow clearly, such as "Salon bookings: form to sheet and email", so anyone can find it.`,
      practice_task_md: `**Goal:** Build, break and fix a simple automation.

**Steps:**
1. Sign up for a connector tool such as Zapier, Make or Power Automate, or use a built in option such as a form's email notifications.
2. On a computer if you can, build a two step workflow: when a new form response arrives, add a row to a separate sheet or send yourself an email.
3. Submit a test response and confirm it worked. Give the workflow a clear name.
4. Break it on purpose: rename a column or question the workflow uses, then submit again.
5. Open the run history, find the error and fix it.
6. Read the tool's current plans page and write down how it measures use.

**Done looks like:** A named working workflow, a screenshot of the failed run and the fix, and a dated note on how the tool measures use.`,
      quiz: {
        questions: [
          {
            prompt: "Where should you look first when an automation stops working?",
            options: [
              "The tool's marketing page",
              "The run history for that workflow",
              "The client's social media page",
              "A video about building a new workflow from scratch in a different tool",
            ],
            answer_index: 1,
            explanation: "The lesson says checking the record of runs is the first step in any problem.",
          },
          {
            prompt: "What does Make store some failed runs as?",
            options: [
              "Zap history",
              "Security filters",
              "Plugins",
              "Incomplete executions that can be resolved",
            ],
            answer_index: 3,
            explanation: "The lesson notes Make stores some failed runs as incomplete executions.",
          },
          {
            prompt: "In Sumaila's example, why did the Monday workflow fail?",
            options: [
              "The owner renamed a sheet column the workflow depended on",
              "The tool's servers were switched off for the holidays",
              "The client ran out of airtime on her phone that week",
              "The form was deleted by a customer",
            ],
            answer_index: 0,
            explanation: "The run history showed a missing column after the owner renamed Phone to Customer phone.",
          },
          {
            prompt: "Why does the lesson tell you to read the current plans page for each project?",
            options: [
              "Because every tool measures use the same way",
              "Because plans pages list job openings",
              "Usage measures and limits differ by tool and plan and change over time",
              "Because tools delete any workflow that has not been checked against the plans page that month",
            ],
            answer_index: 2,
            explanation: "The lesson says limits differ by tool and plan and change, so read and date the plans page.",
          },
          {
            prompt: "Which approach to workflow design does the lesson recommend?",
            options: [
              "One giant workflow that handles everything",
              "Leave workflows unnamed so clients cannot change them",
              "Always choose the tool with the most connections, whatever the client can afford",
              "Several small, clearly named workflows",
            ],
            answer_index: 3,
            explanation: "The lesson says small workflows are easier to fix and clear names help anyone find them.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "message-automation": {
      outcomes: [
        "Keep automatic messages helpful, not spammy",
        "Automate emails, WhatsApp Business replies and SMS",
        "Test messages like a customer",
      ],
      explanation_md: `Many automations end with a message: a booking confirmation, a receipt, a reminder, a reply outside working hours. Done well, automatic messages make a small business feel organised and caring. Done badly, they annoy people, break trust and can break rules. Digital and communications roles in Ghana ask for email marketing tools, and many small business clients will ask you about WhatsApp.

## Helpful, not spammy

Good automatic messages are:

* **Expected.** The person did something that makes the message natural, such as booking, ordering or asking a question.
* **Useful.** They contain what the person needs: the time, the price, the reference, what happens next.
* **Short and clear.** Easy to read on a small screen.
* **Honest.** If it is automatic, it does not pretend to be a personal reply, and it says how to reach a person.

Marketing messages are different from confirmations. Only send them to people who agreed to receive them, include a simple way to stop them, and honour every request to stop. Ghana's Data Protection Act, 2012 (Act 843) sets rules for collecting and using personal data, including phone numbers and emails.

## Email automations

Form tools can send a response receipt; connector tools and email marketing tools can send a confirmation from a template when a form arrives. Use the person's name and booking details from the form, check the spelling of every field you insert, and send tests to yourself first. Keep the sender name recognisable, such as the business name.

## WhatsApp Business app features

The WhatsApp Business app has built in tools that need no other software:

* **Greeting messages** greet people who message you for the first time, or again after a long quiet spell.
* **Away messages** reply when you are not available, for example outside opening hours. The phone needs an internet connection for them to go out.
* **Quick replies** save common answers so you can send them quickly, by typing a slash in a chat or choosing them from the attach menu. The app can also suggest replies based on your business profile, such as your hours or address.

These run on the business owner's own phone and account. Sending automated WhatsApp messages from other tools, such as a form or a sheet, is a different matter: it uses WhatsApp's business platform, usually through an approved provider, with its own rules on consent and message formats. Read the official rules before promising a client this.

## SMS

Some businesses send SMS reminders through bulk SMS providers that connect to sheets or automation tools. The same principles apply: expected, useful, short, with consent.

## A worked example

Mariama sets up messages for a tailoring shop in Tamale. In the WhatsApp Business app, she writes a greeting message introducing the shop and its opening hours, an away message saying replies will come the next morning, and three quick replies: prices for common styles, the shop's location, and "your outfit is ready for pick up". For the online order form, a connector tool emails customers a confirmation with their order number.

She shows the owner how to edit the quick replies herself, and they agree never to add customers to a promotions list without asking first.

## Test like a customer

Before switching anything on, send yourself a message as if you were a customer, at different times of day. Read every automatic reply on a phone. If anything feels cold, confusing or pushy, rewrite it.`,
      practice_task_md: `**Goal:** Write a set of helpful automatic messages for a small business.

**Steps:**
1. Choose a real or imagined small business, such as a chop bar, a salon or a phone accessories shop.
2. Write a greeting message, an away message and three quick replies, each under 50 words.
3. Write one booking or order confirmation email that uses at least three fields from a form, such as name, date and item.
4. If you have the WhatsApp Business app, set up your messages on a test account. Otherwise, set up a form's email receipt or a connector tool's confirmation email.
5. Test as a customer and rewrite anything that feels cold or pushy.

**Done looks like:** Five short messages and one confirmation email, tested, with one improvement noted. Screenshots make good portfolio evidence.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a sign of a good automatic message?",
            options: [
              "It pretends to be a personal reply so the customer feels special",
              "It is sent to everyone in the phone's contact list",
              "It contains what the person needs, such as the time, price or reference",
              "It is as long as possible so that nothing is ever left out of the message, even small details",
            ],
            answer_index: 2,
            explanation: "The lesson says good messages are useful, containing the time, price, reference or next step.",
          },
          {
            prompt: "What does the lesson say about marketing messages?",
            options: [
              "Send them only to people who agreed, include a way to stop them, and honour stop requests",
              "Send them to any number you can find",
              "They need no consent if they are short",
              "They are the same as booking confirmations and follow exactly the same rules in every case",
            ],
            answer_index: 0,
            explanation: "The lesson separates marketing from confirmations and lists consent, a way to stop and honouring requests.",
          },
          {
            prompt: "How can you send a saved quick reply in the WhatsApp Business app?",
            options: [
              "By shaking the phone",
              "By typing a slash in a chat or choosing quick replies from the attach menu",
              "By emailing the reply to WhatsApp",
              "By setting it as your profile photo so that customers can read it before they send a message",
            ],
            answer_index: 1,
            explanation: "The lesson says quick replies are sent by typing a slash or choosing them from the attach menu.",
          },
          {
            prompt: "What does the lesson say about sending automated WhatsApp messages from a form or sheet?",
            options: [
              "It works exactly like greeting messages with no extra rules",
              "It is impossible in every case",
              "It only works on computers",
              "It uses WhatsApp's business platform, usually through a provider, with its own consent and format rules",
            ],
            answer_index: 3,
            explanation: "The lesson distinguishes app features from the business platform and says to read its rules first.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "ai-steps": {
      outcomes: [
        "Know where AI steps help and where they go wrong",
        "Take extra care with agents",
        "Put privacy first when testing an AI step",
      ],
      explanation_md: `Automation tools increasingly include AI steps: a step that reads a message and sorts it, summarises a long form answer, drafts a reply, or pulls details such as a name and amount out of free text. Some tools also offer agents, which can decide on several steps by themselves to reach a goal. One remote advert in our research asked for AI implementation alongside table and automation tools, so it is worth understanding. This lesson is optional, and the AI Tools for Work track goes deeper.

## Where AI steps help

AI is useful when a step needs to understand messy language, which ordinary rules cannot do well:

* **Sorting.** Is this message a complaint, an order or a question? Send it to the right person.
* **Summarising.** Turn a long feedback answer into one line for a weekly report.
* **Extracting.** Pull the item, quantity and delivery town out of a chat style order.
* **Drafting.** Suggest a reply that a person reviews before sending.

## Where it goes wrong

AI output can be confidently wrong. It may misread Ghanaian names, places and mixed language messages, invent details that were not in the text, or sort a serious complaint as a simple question. It can also produce different answers to the same input on different days. So:

* **Keep a person in the loop** for anything that matters: money, health, complaints, anything sent to a customer.
* **Use AI to suggest, not to decide.** A drafted reply should wait for approval. A sorted message should be easy to move.
* **Prefer ordinary rules when they work.** If a dropdown on the form can capture "complaint or order", you do not need AI to guess.
* **Check a sample regularly.** Look at ten AI results each week and note mistakes.

## Agents need extra care

An agent can take actions on its own, such as looking things up, updating records or sending messages. That power multiplies mistakes. Give an agent the smallest set of tools and permissions it needs, test it with made up data, and require approval before it sends anything or changes important records.

## Privacy comes first

When an AI step runs, the text is usually sent to an AI service outside your client's own tools. Under Ghana's Data Protection Act, 2012 (Act 843), people should know how their personal data is used, and it must be kept safe. Before adding AI to a workflow:

* Check whether the step would send names, phone numbers, health details or other personal data.
* Read the AI provider's terms on how data is stored and used.
* Get the client's agreement, and tell the people whose data it is where appropriate.
* Remove personal details before the AI step when the task does not need them.

## A worked example

Hawa supports an NGO in Wa that receives hundreds of feedback form answers after each community meeting. She adds an AI step that suggests a category (water, health, schools or other) and a one line summary for each answer, written into new sheet columns. Names and phone numbers are not sent to the AI step; only the feedback text is. The programme officer reviews the categories each week and corrects the ones that are wrong. Urgent issues are flagged by a simple rule instead: any answer containing words the team chose, such as "sick" or "danger", notifies the officer immediately.

AI saves her hours, and people still make every decision.`,
      practice_task_md: `**Goal:** Test an AI step safely and judge its accuracy.

**Steps:**
1. Write ten short made up customer messages for a small business, mixing orders, questions and complaints. Include Ghanaian names and towns, and do not use real people's data.
2. Using any AI chat tool or an automation tool's AI step, ask it to sort each message into order, question or complaint and give a one line summary.
3. Check every result yourself and mark which are wrong.
4. Write which messages it got wrong and why you think it struggled.
5. Write two rules for when a person must review this AI step before anything is sent.

**Done looks like:** A table of ten messages with the AI's category, your check, a short note on mistakes and two review rules.`,
      quiz: {
        questions: [
          {
            prompt: "Which task is a good use of an AI step, according to the lesson?",
            options: [
              "Deciding alone whether to refund a customer's money",
              "Replacing every rule in a workflow",
              "Pulling the item, quantity and town out of a chat style order",
              "Sending replies to customers automatically without anyone ever reading them first",
            ],
            answer_index: 2,
            explanation: "The lesson lists extracting details from messy text as a good use, while decisions stay with people.",
          },
          {
            prompt: "What does the lesson say to prefer when an ordinary rule works?",
            options: [
              "The ordinary rule, such as a dropdown on the form",
              "An agent with full permissions",
              "Two AI steps that check each other",
              "A newer AI tool that promises to understand every Ghanaian language without any mistakes",
            ],
            answer_index: 0,
            explanation: "The lesson says if a dropdown can capture the information, you do not need AI to guess.",
          },
          {
            prompt: "Why do agents need extra care?",
            options: [
              "They only work in English",
              "They can take actions on their own, which multiplies mistakes",
              "They cannot read spreadsheets",
              "They are always slower than doing the whole job by hand, so they waste the team's time",
            ],
            answer_index: 1,
            explanation: "The lesson says agents can act by themselves, so give them few permissions and require approval.",
          },
          {
            prompt: "In Hawa's example, what was sent to the AI step?",
            options: [
              "Names, phone numbers and feedback text",
              "Only phone numbers",
              "Every column of the sheet, including the programme officer's private notes",
              "Only the feedback text",
            ],
            answer_index: 3,
            explanation: "The example says names and phone numbers were not sent; only the feedback text was.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "clients-and-earning": {
      outcomes: [
        "Explain what changes when you build for others",
        "Know there is no single job title for this work",
        "Review a build as if a client depended on it",
      ],
      explanation_md: `Building something for yourself is practice. Building something another person relies on is work, and it brings responsibilities. A shop owner trusts you with her customers' phone numbers. An NGO trusts you with survey answers about households. A school trusts that the fees app will still work when you have moved on. This final section is about earning that trust, and then turning your skills into paid work.

## What changes when you build for others

* **Their data is not yours.** You handle it carefully, collect only what is needed, and protect it.
* **Their build must keep working without you.** That means testing properly and handing over accounts, documents and know how.
* **Their money matters.** You choose tools they can afford to keep, and you are honest about limits.
* **Your reputation travels.** In Tamale, Wa or Bolgatanga, one happy client often leads to the next by word of mouth, and one abandoned project can close doors.

## What this section covers

* **Privacy, consent and sharing:** what Ghana's Data Protection Act, 2012 (Act 843) means for forms, sheets and apps, and how to set sharing permissions so only the right people see data.
* **Testing and handing over:** testing with real users and odd inputs, writing a short guide, handing over accounts safely and agreeing support.
* **Portfolio, jobs and gigs:** where these skills appear in jobs, how to show your work, and how to offer small projects to local businesses and remote clients.

## There is no single job title

Earlier lessons said it, and it matters here: you will rarely see an advert in Ghana titled "no code developer". Instead, these skills help you into or forward in other roles:

* data collection, enumerator and monitoring and evaluation roles at NGOs and research firms;
* communications, social media and IT officer roles that look after a website;
* administration and operations roles that keep shared records and workflows running;
* freelance projects for shops, churches, schools, cooperatives and small offices.

Some remote operations roles do name automation and table tools directly, but check that they accept applicants based in Ghana before applying.

## A worked example

Abdul-Rahman has built a registration form, a member sheet and a small dashboard for his youth football club in Wa. A neighbouring club asks him to build the same thing. Before he agrees, he thinks through this section:

1. **Privacy:** the form collects children's names and parents' phone numbers, so he will collect only what is needed, explain why on the form, and share the sheet with only the coach and treasurer.
2. **Testing and handover:** he will test with two parents, then give the club its own account, a one page guide and a month of free fixes.
3. **Earning:** he will ask for a fair fee agreed in writing, and ask the club to recommend him if they are happy.

Having done the same work once, he already has a portfolio piece, and with the first club's permission he can show it.

## Encouragement

You do not need to be an expert to start earning trust. You need to be careful, honest and reliable. Many clients would rather work with someone who builds something simple and explains it clearly than with someone who builds something clever they cannot use.`,
      practice_task_md: `**Goal:** Review one of your builds as if a client depended on it.

**Steps:**
1. Choose something you built in this track: a form, a sheet, a site, an app or an automation.
2. Write the personal data it collects, if any, and who can currently see it.
3. Write what would happen if you disappeared tomorrow: could someone else run it, and do they have the accounts?
4. List three things you would need to fix before handing it to a real client.

**Done looks like:** A short review with a personal data list, an honest answer about what happens without you, and three fixes. Keep it; the next lessons show how to make those fixes.`,
      quiz: {
        questions: [
          {
            prompt: "What changes when you build something another person relies on?",
            options: [
              "Nothing, because the build is the same either way",
              "You can use their data for your own projects",
              "You must use the most expensive tools available so the client knows you are serious",
              "Their data, money and continuity become your responsibility to handle carefully",
            ],
            answer_index: 3,
            explanation: "The lesson lists their data, their build working without you, their money and your reputation.",
          },
          {
            prompt: "What should you check before applying to a remote operations role that names automation tools?",
            options: [
              "That it accepts applicants based in Ghana",
              "That it pays in cedis",
              "That it is advertised on social media",
              "That it requires no experience at all and promises a permanent contract from the very first day",
            ],
            answer_index: 0,
            explanation: "The lesson says to check that remote roles accept applicants based in Ghana.",
          },
          {
            prompt: "In Abdul-Rahman's plan, who would the registration sheet be shared with?",
            options: [
              "Every parent in the club",
              "Anyone with the link",
              "Only the coach and the treasurer",
              "All the players, so they can check that their own details were entered correctly",
            ],
            answer_index: 2,
            explanation: "His privacy step shares the sheet with only the coach and treasurer.",
          },
          {
            prompt: "What does the lesson say many clients prefer?",
            options: [
              "Someone who builds something clever, even if they cannot use it",
              "Someone who builds something simple and explains it clearly",
              "Someone who never writes anything down",
              "Someone who promises every feature in the first week, even if some of it never arrives",
            ],
            answer_index: 1,
            explanation: "The lesson ends by saying clients often prefer a simple, clearly explained build.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "privacy-and-permissions": {
      outcomes: [
        "Explain Ghana's data law in plain terms",
        "Collect only what you need and tell people why",
        "Set sharing permissions and plan to delete data",
      ],
      explanation_md: `Almost every form, sheet and app you build will hold personal data: names, phone numbers, locations, ages, sometimes health or income details. Mishandling it can embarrass a client, hurt the people whose data it is, and break the law. Being known as someone who handles data carefully is a real advantage, especially for NGO and research work.

## Ghana's law in plain terms

Ghana's **Data Protection Act, 2012 (Act 843)** sets rules for collecting and using personal data, and the **Data Protection Commission** oversees it. The Commission's website lists eight principles:

* **Accountability:** the organisation can show it follows the law.
* **Lawfulness of processing:** there are proper grounds for using the data, used fairly.
* **Specification of purpose:** data is collected for a clear, specific purpose.
* **Quality of information:** data is kept accurate and up to date.
* **Purpose of collection:** later uses of the data fit the purpose it was collected for.
* **Openness:** people are told what happens to their data.
* **Data security safeguards:** suitable technical and organisational protection.
* **Data subject participation:** people can exercise their rights over their own data.

The Commission also says organisations that collect and use personal data must register with it. You do not need to be a lawyer. Know the law exists, follow your client's or employer's policy, and ask when unsure. This lesson is general guidance, not legal advice.

## Collect only what you need

For every question on a form, ask: what will we do with this answer? If there is no clear use, remove it. Do you need a full date of birth, or just an age group? A home address, or just the community? Less data means less to protect and less to lose. Some data, such as health information, needs extra care; avoid collecting it unless the purpose truly requires it.

## Tell people why

At the top of a form, write in plain words who is collecting the data, why, and who will see it. For example: "Our youth football club collects these details to register players and contact parents. Only the coach and treasurer can see them." Where consent is needed, such as for photos, ask with a clear question, not a hidden box.

## Set sharing permissions carefully

* **Restricted sharing.** Share sheets and response files with named people only. Avoid "anyone with the link" for anything containing personal data, because links get forwarded.
* **The lowest role that works.** Give viewer access to people who only read, and editor access only to those who must change data.
* **Separate public and private.** A dashboard showing totals can be shared widely; the raw sheet with names should not be.
* **Review regularly.** Remove people who have left the project.
* **Protect accounts and devices.** Two step verification on accounts, a lock on every phone used for collection.

## Keep and delete

Decide how long data is needed and delete or anonymise it when the purpose is finished. Do not keep old registration sheets forever "just in case". Never copy client data into your personal accounts or chats.

## A worked example

Fuseini reviews a training registration form for an NGO in Damongo. He removes "religion" and "full home address", which the project does not use, replaces date of birth with age group, and adds a short notice explaining the purpose. He changes the responses sheet from "anyone with the link" to three named staff members, gives two of them view only access, and creates a separate summary tab for the funder report with totals and no names.`,
      practice_task_md: `**Goal:** Make one of your forms and sheets privacy friendly.

**Steps:**
1. Open a form you built in this track, or build a short registration form now.
2. For each question, write what the answer will be used for. Remove or simplify any question without a clear use.
3. Add a short notice at the top: who collects the data, why, and who will see it.
4. Open the linked sheet's sharing settings. Make sure it is restricted to named people and that each person has the lowest role that works.
5. Create a separate summary with totals only, suitable for sharing more widely.

**Done looks like:** A before and after list of questions, a notice on the form, a screenshot of restricted sharing settings, and a summary with no personal data.`,
      quiz: {
        questions: [
          {
            prompt: "Which body oversees Ghana's Data Protection Act, 2012 (Act 843)?",
            options: [
              "The Ghana Revenue Authority, which also handles tax registration for businesses",
              "The Data Protection Commission",
              "The Ghana Statistical Service",
              "The National Communications Authority",
            ],
            answer_index: 1,
            explanation: "The lesson names the Data Protection Commission as overseeing the Act.",
          },
          {
            prompt: "What does the specification of purpose principle mean, as the lesson explains it?",
            options: [
              "Data is collected for a clear, specific purpose",
              "Data can be used for any purpose once it is collected",
              "Every form must have a purpose written in English and Dagbani",
              "Data must be shared with the public so that people can check the purpose for themselves",
            ],
            answer_index: 0,
            explanation: "The lesson describes specification of purpose as collecting data for a clear, specific purpose.",
          },
          {
            prompt: "Why should you avoid anyone with the link sharing for a sheet containing personal data?",
            options: [
              "Links stop working after a week",
              "It makes the sheet load slowly",
              "Shared links hide the data from the owner, who then cannot see or change any of the responses",
              "Links get forwarded, so people you never chose could open it",
            ],
            answer_index: 3,
            explanation: "The lesson says links get forwarded, so share personal data with named people only.",
          },
          {
            prompt: "What did Fuseini replace date of birth with?",
            options: [
              "Full home address",
              "Religion",
              "Age group",
              "A photo of each person's birth certificate, which he stored in the same sheet as the responses",
            ],
            answer_index: 2,
            explanation: "He replaced date of birth with age group to collect less data.",
          },
          {
            prompt: "Which data can usually be shared more widely, according to the lesson?",
            options: [
              "The raw sheet with names and phone numbers",
              "Photos of participants taken without consent",
              "Passwords for the form account, so that funders can log in and check the work",
              "A dashboard or summary showing totals with no names",
            ],
            answer_index: 3,
            explanation: "The lesson says a dashboard of totals can be shared widely, unlike the raw sheet.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "testing-and-handover": {
      outcomes: [
        "Test a build in three rounds",
        "Write a short guide for users",
        "Hand over accounts safely and agree support",
      ],
      explanation_md: `A build that works for you is not finished. It is finished when real people can use it, it survives odd inputs, and the client can keep it running without you. Adverts for data collection roles mention pilot testing; operations roles mention written procedures; app roles mention end user support. This lesson covers all three.

## Test in three rounds

**1. Your own checks.** Go through every path: each form branch, each app screen, each automation route. Try normal answers, empty answers, very long answers, wrong formats (a nine digit phone number, letters in a number field) and duplicates. Check that data lands where it should.

**2. Real users.** Watch two or three people from the actual audience use it, on their own devices. Give them a task, such as "register a new member", and stay quiet. Note where they hesitate, tap the wrong thing or ask a question. Five minutes of watching teaches more than an hour of guessing.

**3. A short pilot.** Run it for real with a small group for a few days, such as one class or one market day, before switching everyone over. Keep the old way available until you trust the new one.

Fix what you find, and test the fix.

## Write a short guide

Most clients will not read a long manual. Aim for one or two pages, with screenshots, written for the person who will use it:

* **What it does,** in one paragraph.
* **How to do the common tasks,** step by step: add a record, find a record, read the dashboard.
* **What not to do,** such as renaming sheet columns used by an app or automation.
* **What to do when something goes wrong,** including how to switch an automation off.
* **Accounts and renewals:** which tools are used, under whose account, and any dates to remember.

Writing it in plain English, with a Dagbani or Twi explanation in person if that helps, makes it more likely to be used.

## Hand over accounts safely

* Ideally the client owned every account from the start, with you added as an editor.
* If you created anything under your own account, transfer ownership or rebuild it under theirs.
* Never send passwords in group chats or plain messages. Help the client set their own password in person, and turn on two step verification on their phone.
* After handover, agree whether you keep editor access for support, or remove yourself.

## Agree support

Say clearly what happens after you finish: a period of free fixes, how to contact you, what counts as a fix versus new work, and when paid support would apply. Put it in writing, even a short message the client confirms.

## A worked example

Amina finishes an attendance app for a literacy programme in Savelugu. She tests every screen herself, then watches two facilitators mark a class. One cannot find the save button below the list, so she moves it to the top. A one week pilot at one centre reveals that a learner joined late and is missing from the list, so she adds a simple "add learner" form for facilitators. She hands the coordinator a two page guide, helps her set a new password with two step verification, and agrees one month of free fixes by WhatsApp message, confirmed in writing.`,
      practice_task_md: `**Goal:** Test one of your builds properly and prepare it for handover.

**Steps:**
1. Choose a form, app, site or automation you built in this track.
2. Write a test list of at least eight checks, including empty, wrong format and duplicate inputs. Run them and note results.
3. Watch one person use it to complete a real task, without helping. Write down where they hesitated.
4. Fix at least one problem and test again.
5. Write a one page guide with: what it does, two common tasks step by step, one thing not to do, and what to do when something goes wrong.

**Done looks like:** A completed test list, notes from watching a user, one fix, and a one page guide. Together these make a strong portfolio piece.`,
      quiz: {
        questions: [
          {
            prompt: "During real user testing, what does the lesson say you should do?",
            options: [
              "Give them a task, stay quiet, and note where they hesitate",
              "Explain every screen before they start",
              "Do the task for them so it goes quickly",
              "Test only with friends who already know exactly how the build works and what to tap",
            ],
            answer_index: 0,
            explanation: "The lesson says to give a task, stay quiet and note hesitations and wrong taps.",
          },
          {
            prompt: "Why run a short pilot before switching everyone over?",
            options: [
              "Pilots are required before any tool can be published",
              "To find real world problems with a small group while the old way is still available",
              "To make the project last longer so the client pays more",
              "So the builder can stop testing completely after the first day and move on to the next project",
            ],
            answer_index: 1,
            explanation: "The lesson advises a small real pilot, keeping the old way until the new one is trusted.",
          },
          {
            prompt: "How should passwords be handed over?",
            options: [
              "Posted in the client's staff WhatsApp group",
              "Written on the back of the guide",
              "Sent in a plain text message so the client can copy and paste it easily from their phone",
              "By helping the client set their own password in person, with two step verification",
            ],
            answer_index: 3,
            explanation: "The lesson says never send passwords in chats; help the client set their own with two step verification.",
          },
          {
            prompt: "What did the pilot at one centre reveal in Amina's example?",
            options: [
              "The save button was too large",
              "Facilitators preferred paper",
              "A learner who joined late was missing, so she added a form to add learners",
              "The app did not work on any phone that the facilitators owned",
            ],
            answer_index: 2,
            explanation: "The pilot showed a late joiner missing from the list, so Amina added an add learner form.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "portfolio-and-work": {
      outcomes: [
        "Find where these skills show up in jobs",
        "Build a strong portfolio",
        "Find small paid projects",
      ],
      explanation_md: `Certificates show you studied. A portfolio shows you can build. For no code skills, which rarely have their own job title in Ghana, a small set of real projects is often what convinces an NGO, a business or a client to give you a chance.

## Where these skills show up in jobs

When you read adverts, look past the title to the skills listed:

* **Data collection, enumerator, data officer and M&E roles** at NGOs, research firms and donor projects mention mobile survey tools such as KoboToolbox, ODK, SurveyCTO and CommCare, data quality checks and Excel or Power BI dashboards.
* **Communications, social media and IT officer roles** mention maintaining a WordPress website alongside design and social media work.
* **Administration and operations roles** value people who keep shared records clean and set up reminders and workflows.
* **Remote operations and automation roles** name tools such as Airtable, Zapier and Make. Many are limited to certain countries, so check that applicants based in Ghana are accepted.

Job boards such as Jobberman Ghana are one place to look, alongside NGO websites and notice boards, university and hub networks, and people you know.

## What makes a strong portfolio

Three to five small, real projects beat twenty tutorials. For each, show:

* **The problem,** in the client's words.
* **What you built,** with screenshots or a short screen recording.
* **Your decisions:** why that tool, what you left with a person, how you protected data.
* **The result,** described honestly, such as "the treasurer no longer copies names by hand". Do not invent numbers or outcomes.
* **Permission.** Only show client work with permission, and blur or replace personal data with made up examples.

Good starting projects: a youth group registration form with a clean sheet and dashboard, a shop stock app, a one page site for a craftsperson, a booking automation, or a field survey with skip logic. A simple online page, a shared folder or a document with links is enough to present them.

## Finding small paid projects

* **Start close.** Your church, mosque, school, family business or a local NGO may need a form, a sheet or a site. A first project for a reduced fee or as a volunteer can become a reference.
* **Offer a clear package,** such as "registration form, response sheet and simple dashboard, set up and explained", rather than "I can build anything".
* **Price fairly.** Think about the hours involved, the value to the client and what similar local services cost. Agree the price, what is included and the support period in writing before you start. The Freelancing track covers pricing and agreements in depth.
* **Be reliable.** Reply on time, meet deadlines and hand over properly. Word of mouth travels fast.

## A worked example

Hawa, in Tamale, has a portfolio of four projects: a choir feedback form, a stock app for her aunt's shop, a one page site for a tailor and a field survey she designed in a training. In her applications for data assistant roles, she links two of them and explains her data cleaning steps. Meanwhile she offers a "form, sheet and dashboard" package to small groups and gets her first paid project through a church member.

## Keep learning

Tools change quickly. Keep the principles from this track, stay curious about new features, and read official help pages when something changes.`,
      practice_task_md: `**Goal:** Assemble your portfolio and one clear offer.

**Steps:**
1. Choose three projects from this track. For each, write the problem, what you built, two key decisions and the honest result.
2. Add screenshots, replacing any real personal data with made up examples.
3. Put everything in one shareable place, such as a one page site, a document or a folder with a link.
4. Write one package you could offer a local business or group, in two sentences: what is included and what support follows.
5. Find two adverts that mention any skill from this track and note which skills they ask for. Do not copy the advert text.

**Done looks like:** A shareable portfolio link with three projects, a two sentence offer and notes on two adverts. Send the link to a mentor for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Which job adverts commonly mention mobile survey tools such as KoboToolbox and ODK?",
            options: [
              "Data collection, enumerator and M&E roles",
              "Bank teller roles in shopping malls",
              "Graphic design roles that focus on printing banners",
              "Driving and dispatch roles for delivery companies that serve the main cities",
            ],
            answer_index: 0,
            explanation: "The lesson links mobile survey tools to data collection, enumerator and M&E roles.",
          },
          {
            prompt: "How should you describe the result of a portfolio project?",
            options: [
              "With impressive numbers, even if you have to estimate them",
              "By copying the result section of a similar project online",
              "Leave the result out, because clients never read it",
              "Honestly, without inventing numbers or outcomes",
            ],
            answer_index: 3,
            explanation: "The lesson says to describe results honestly and never invent numbers or outcomes.",
          },
          {
            prompt: "Why offer a clear package rather than saying you can build anything?",
            options: [
              "Packages are required by law for freelancers",
              "Packages mean you never have to talk to the client",
              "A clear package tells a client exactly what they get",
              "Saying you can build anything is the best way to win large contracts from big companies quickly",
            ],
            answer_index: 2,
            explanation: "The lesson recommends a clear package, such as form, sheet and dashboard, set up and explained.",
          },
          {
            prompt: "What must you do before showing client work in your portfolio?",
            options: [
              "Pay the client a fee",
              "Get permission and replace personal data with made up examples",
              "Remove your own name from it",
              "Wait at least five years so that the client has forgotten about the project",
            ],
            answer_index: 1,
            explanation: "The lesson says show client work only with permission, blurring or replacing personal data.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
