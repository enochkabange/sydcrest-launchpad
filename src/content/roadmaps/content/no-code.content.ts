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
    "data-first": {
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
  },
};

export default content;
