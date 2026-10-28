import type { TrackContent } from "./types";

/**
 * Original lesson content for the Project Management roadmap (issue #198,
 * process from issue #84). Research and sources:
 * src/content/research/project-management.md. All scenarios, names and
 * figures are invented for teaching.
 */
const content: TrackContent = {
  roadmap: "project-management",
  nodes: {
    "project-basics": {
      explanation_md: `Every week, NGOs, district assemblies, schools and businesses across northern Ghana start new pieces of work: a borehole for a farming community, a feeding programme for a basic school, a training for women's savings groups, a new shop opening in town. Someone has to keep each of these moving, on time, within the money available and focused on what it was meant to achieve. That someone is doing project management, whatever their job title says.

## Why this matters for work in Ghana

Look at job boards and NGO career pages for Tamale, Bolgatanga and Wa and you will see project assistant, project officer, programme support officer and project coordinator roles again and again. Businesses in construction, events and real estate hire coordinators too. Across these adverts the same skills come up: planning work, tracking a budget, working with communities and partners, keeping records and writing reports. This roadmap teaches those skills with free tools you can use on your phone or computer.

## What this section covers

* **What makes something a project.** How a project differs from routine work, and why time, cost and scope pull against each other.
* **Who does what.** The usual roles on a project, from assistant to donor, and a simple chart that shows who is responsible for each task.
* **The project life cycle.** The stages most projects pass through, so you always know which documents and decisions matter right now.

## Three projects you will follow

To make the ideas concrete, the lessons keep coming back to three invented examples:

1. **A community water project.** An NGO in Tamale drills a borehole and sets up a water committee in a farming community in the Tolon area.
2. **A school feeding programme.** A district education office and a local NGO provide a daily hot meal at four basic schools near Savelugu.
3. **A small business launch.** Hawa opens a shop in Bolgatanga selling shea butter soap and creams she makes with women from her area.

They are very different, yet each one needs a clear goal, a plan, a budget, people who know their roles, and a way to check progress. That is the point: once you understand project management, you can carry it from one kind of work to another.

## A word of encouragement

Many people already manage projects without calling it that. If you have helped organise a funeral, a church harvest, a wedding or a school sports day, you have juggled tasks, money, people and deadlines. This roadmap gives names and tools to things you may already do, and shows you how to do them in a way employers recognise. Most people enter this field as an assistant, intern or national service person, then grow into officer and coordinator roles as they gain experience.`,
      practice_task_md: `**Goal:** Recognise the projects you have already been part of.

**Steps:**
1. Open a notes app or a blank document on your phone or computer.
2. List three events or activities you helped organise, for example a fundraiser, a school event, a family ceremony or a youth group trip.
3. For each one, write: what it was meant to achieve, when it started and ended, roughly what it cost, and who was involved.
4. Write one sentence on what went well and one on what went badly.

**Done looks like:** Three short entries, each with a goal, dates, cost, people and two lessons. Keep this note: you will reuse one of these examples later in the roadmap.`,
      quiz: {
        questions: [
          {
            prompt: "Which skills does the lesson say come up again and again in project job adverts?",
            options: [
              "Coding, graphic design and video editing",
              "Planning work, tracking a budget, working with communities and partners, keeping records and writing reports",
              "Selling products door to door",
              "Repairing computers and networks",
            ],
            answer_index: 1,
            explanation: "The lesson lists planning, budgets, community and partner work, records and reports as the repeated skills.",
          },
          {
            prompt: "Why does the roadmap follow a water project, a school feeding programme and a business launch?",
            options: [
              "Because only these three kinds of project exist",
              "Because they all use the same budget",
              "To show that very different projects all need a goal, plan, budget, roles and progress checks",
              "Because they are all run by the same NGO",
            ],
            answer_index: 2,
            explanation: "The lesson says each example is different yet needs the same core project management elements.",
          },
          {
            prompt: "According to the lesson, how do most people enter project work?",
            options: [
              "As an assistant, intern or national service person",
              "Directly as a country director",
              "Only after ten years in banking",
              "By buying a certificate",
            ],
            answer_index: 0,
            explanation: "The lesson says most people start as an assistant, intern or national service person and grow from there.",
          },
          {
            prompt: "What does the lesson say about organising a funeral or a school sports day?",
            options: [
              "It has nothing to do with project management",
              "It only counts if you were paid",
              "It means you no longer need to learn anything",
              "It involves juggling tasks, money, people and deadlines, like a project",
            ],
            answer_index: 3,
            explanation: "The lesson points out that these activities already involve the core juggling a project needs.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "what-is-a-project": {
      explanation_md: `Employers want people who can tell the difference between running a project and doing routine work, because the two are managed differently. A project needs a plan with an end date; routine work needs a steady system.

## The idea

A **project** is a temporary piece of work with a clear goal. It has:

* **A goal.** Something specific it must produce or change, such as a working borehole or an open shop.
* **A start and an end.** When the goal is reached, or the time runs out, the project closes.
* **Limited resources.** A set budget, a certain number of people, and only so much time.

**Routine work**, sometimes called operations, carries on with no end date. Selling soap every day in Hawa's shop is routine work. Opening the shop is a project. Pumping water from the borehole every morning is routine. Drilling it and training the water committee was the project.

## Scope, time and cost

Every project balances three things:

* **Scope:** what the project will deliver.
* **Time:** how long it has.
* **Cost:** how much money it can spend.

People often call these the triple constraint, because changing one usually changes the others. Quality sits in the middle: squeeze the three too hard and quality suffers.

## A worked example

Hawa plans to open her shop in Bolgatanga in eight weeks with a budget of GHS 6,000. The scope is: paint and shelve the shop, make the first stock of soap and cream, print labels, and hold an opening day.

Three weeks in, her cousin Amina suggests also selling online with a small website. That is a change in scope. Hawa now has three choices:

1. **Add time.** Open in ten weeks instead of eight.
2. **Add cost.** Pay someone to build the website so the date does not move.
3. **Cut something else.** Skip the printed labels for now and use stamped ones.

If she adds the website and changes nothing else, something will break: she will miss the date, overspend, or rush the soap and lower its quality. Seeing this trade off clearly, and explaining it calmly to the people involved, is one of the most useful things a project manager does.

## Why this helps you at work

When a manager or donor asks for "just one more thing", you can say: "We can do that. Here is what it means for the date or the budget. Which would you like?" That answer shows you understand projects and protects the work from slowly growing until it fails. This slow, unplanned growth has a name, **scope creep**, and you will meet it again in later lessons.`,
      practice_task_md: `**Goal:** Tell projects from routine work and practise the scope, time and cost trade off.

**Steps:**
1. On your phone or computer, make two lists: five examples of projects and five examples of routine work from your community, church, school or a business you know.
2. Pick one project. Write its goal, its end date and its budget (an honest guess is fine).
3. Imagine someone asks to add something extra. Write three short options: add time, add money, or cut something else. Say which you would choose and why.

**Done looks like:** Two lists of five, and one project with a clear trade off decision written in three to five sentences.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a project rather than routine work?",
            options: [
              "Selling soap in the shop every day",
              "Pumping water from the borehole every morning",
              "Drilling a borehole and training a water committee",
              "Opening the shop doors at 8 every morning",
            ],
            answer_index: 2,
            explanation: "Drilling and training has a goal and an end; the others continue with no end date.",
          },
          {
            prompt: "What are the three things in the triple constraint?",
            options: ["Scope, time and cost", "People, profit and power", "Donors, staff and community", "Plans, reports and meetings"],
            answer_index: 0,
            explanation: "The lesson names scope, time and cost as the three things every project balances.",
          },
          {
            prompt: "Hawa adds a website to her plan but keeps the same date and budget. What is the likely result?",
            options: [
              "Nothing changes at all",
              "The project finishes earlier",
              "She will miss the date, overspend or lower quality",
              "The budget automatically increases",
            ],
            answer_index: 2,
            explanation: "Changing scope without changing time or cost usually breaks one of them or hurts quality.",
          },
          {
            prompt: "What is scope creep?",
            options: [
              "A tool for drawing schedules",
              "Slow, unplanned growth in what a project must deliver",
              "A type of donor report",
              "Cutting the budget in half",
            ],
            answer_index: 1,
            explanation: "The lesson defines scope creep as the slow, unplanned growth of a project's scope.",
          },
          {
            prompt: "A manager asks you to add an extra activity. What is a strong reply, according to the lesson?",
            options: [
              "Refuse because the plan can never change",
              "Agree and say nothing about the impact",
              "Explain what it means for the date or budget and ask which they prefer",
              "Quietly drop another activity without telling anyone",
            ],
            answer_index: 2,
            explanation: "The lesson recommends showing the effect on time or cost and letting the decision maker choose.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "project-roles": {
      explanation_md: `Projects fail quietly when everybody assumes somebody else is doing a task. Knowing the roles on a project, and writing down who does what, prevents that. It is also how you understand where an entry level job fits.

## Common roles

Titles differ between organisations, but these are the ones you will see most often in NGO and business adverts:

* **Project assistant or programme assistant.** Handles day to day administration: arranging meetings and trainings, keeping attendance sheets and receipts, preparing payment requests, filing, and drafting parts of reports. Often the first job in this field.
* **Project officer.** Runs activities in the field, works with communities, collects data and writes activity reports.
* **Project coordinator or manager.** Owns the plan, budget and risks, leads the team and reports to the organisation and the donor.
* **Monitoring and evaluation (M&E) officer.** Tracks indicators, designs data collection and checks whether the project is achieving its results.
* **Finance officer.** Approves payments, keeps accounts and makes sure spending follows the budget and the donor's rules.
* **Donor or funder.** Provides money and sets reporting rules.
* **Community partners.** Chiefs, assembly members, water committees, head teachers, women's groups: the people whose cooperation the project depends on.

In a small business launch the roles still exist, but one person may hold several. Hawa is the manager, the finance officer and sometimes the assistant too.

## A RACI chart

A **RACI chart** is a simple table that lists tasks down the side and people across the top. In each box you write one letter:

* **R, Responsible:** does the work.
* **A, Accountable:** makes the final decision and answers for the result. Only one person per task.
* **C, Consulted:** gives advice before the work is done.
* **I, Informed:** is told once it is done.

## A worked example

On the community water project, coordinator Fuseini, assistant Mariama, finance officer Abdul-Rahman and the chief's linguist share the work. Part of their chart looks like this:

| Task | Fuseini | Mariama | Abdul-Rahman | Chief |
|---|---|---|---|---|
| Book venue for community meeting | A | R | I | C |
| Pay drilling contractor | A | I | R | I |
| Agree borehole location | A | C | I | R |

Reading the first row: Mariama books the venue, Fuseini approves it, the chief is asked for advice on a suitable place, and Abdul-Rahman is told so he can prepare payment.

## Why it helps

A RACI chart takes ten minutes to make in a spreadsheet and saves hours of confusion. When a task is late, you can see straight away who was responsible. When a new person joins, they can read their letters and know their job. As an assistant, offering to draft one is an easy way to show you think like a project manager.`,
      practice_task_md: `**Goal:** Build a RACI chart for a small real or imagined project.

**Steps:**
1. Open Google Sheets or any free spreadsheet app on your phone or computer.
2. Choose a project, such as a youth group football tournament or a church fundraiser.
3. List six tasks down column A and four people or roles across row 1.
4. Fill each box with R, A, C or I, or leave it empty. Check that every task has exactly one A and at least one R.

**Done looks like:** A chart with six tasks, four people, exactly one A per task, and one sentence under it explaining the busiest person's role.`,
      quiz: {
        questions: [
          {
            prompt: "Which role usually handles attendance sheets, receipts, payment requests and filing?",
            options: ["Donor", "Project assistant", "Chief", "Drilling contractor"],
            answer_index: 1,
            explanation: "The lesson describes these day to day administrative tasks as the project assistant's work.",
          },
          {
            prompt: "In a RACI chart, what does the A stand for?",
            options: ["Assistant", "Advised", "Accountable", "Absent"],
            answer_index: 2,
            explanation: "A means Accountable: the person who makes the final decision and answers for the result.",
          },
          {
            prompt: "How many people should be Accountable for each task?",
            options: ["Exactly one", "At least three", "Everyone on the team", "None"],
            answer_index: 0,
            explanation: "The lesson says only one person per task should be Accountable.",
          },
          {
            prompt: "In the example, what is the chief's letter for booking the venue, and what does it mean?",
            options: [
              "R, he books the venue himself",
              "A, he approves the booking",
              "I, he is only told afterwards",
              "C, he is asked for advice before the booking",
            ],
            answer_index: 3,
            explanation: "The chief is marked C, so he is consulted on a suitable place before booking.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "project-life-cycle": {
      explanation_md: `If you know which stage a project is in, you know what work matters right now and which documents people will ask you for. That makes you useful from your first week on a new team.

## The five stages

Organisations use different names, but most projects pass through these stages:

1. **Starting (initiation).** Someone has an idea or a need. The team agrees the goal, rough budget and who is in charge, often in a short charter or concept note. Funding may be sought or approved.
2. **Planning.** The goal is broken into tasks, dates, a budget, roles and a list of risks. For donor projects, a logframe and work plan are agreed.
3. **Doing (execution).** Activities happen: trainings, construction, purchases, community meetings.
4. **Monitoring.** Progress and spending are checked against the plan, problems are spotted, and reports are written. This runs alongside doing, not after it.
5. **Closing.** Results are handed over, accounts are settled, records are archived and lessons are captured.

Monitoring is drawn as a loop around doing: you do some work, check it, adjust, and keep going.

## A worked example: the school feeding programme

Wumpini works as an assistant on a programme that serves a daily hot meal at four basic schools near Savelugu.

* **Starting:** The NGO and district education office agree the goal: every pupil at the four schools gets one hot meal each school day for one academic year. A charter names Issahaku as coordinator.
* **Planning:** The team lists tasks (hire cooks, buy pots, agree menus, set up food stores), sets a budget per term and notes risks like late funds and rising maize prices.
* **Doing:** Cooks are trained, food is bought from local farmers, meals start.
* **Monitoring:** Wumpini collects daily meal counts from each head teacher and enters them in a shared spreadsheet. Issahaku compares spending with the budget every month and reports to the donor each quarter.
* **Closing:** At the end of the year, kitchens are handed to the schools' parent teacher associations, final accounts are done and a short lessons learned report is written.

## Documents by stage

| Stage | Documents you may be asked for |
|---|---|
| Starting | Concept note, charter |
| Planning | Work plan, budget, risk register, logframe |
| Doing | Attendance sheets, receipts, minutes |
| Monitoring | Tracking sheets, status and donor reports |
| Closing | Handover notes, final report, lessons learned |

## Stages can overlap

Real projects are messy. A long programme may plan the second year while still doing the first. A small business launch may move through all five stages in a few weeks. Some teams, especially in software, repeat short cycles of planning and doing; you will meet that in the optional agile lesson. What matters is asking, "Where are we now, and what does this stage need?"`,
      practice_task_md: `**Goal:** Map a real or imagined project onto the five stages.

**Steps:**
1. Choose one of the projects you listed in the first lesson, or invent one, such as a youth clean up day.
2. On your phone or computer, write the five stage names as headings.
3. Under each, write two or three things that happened (or should happen) in that stage.
4. Next to each stage, name one document that would help.

**Done looks like:** A one page note with five headings, two or three activities each, and one named document per stage.`,
      quiz: {
        questions: [
          {
            prompt: "In which stage is the goal agreed and a coordinator named in a charter?",
            options: ["Closing", "Starting", "Monitoring", "Doing"],
            answer_index: 1,
            explanation: "The lesson places agreeing the goal and writing the charter in the starting stage.",
          },
          {
            prompt: "How does the lesson describe the relationship between monitoring and doing?",
            options: [
              "Monitoring only happens after all the work is finished",
              "Monitoring replaces doing",
              "Monitoring runs alongside doing as a loop of check and adjust",
              "Monitoring happens before planning",
            ],
            answer_index: 2,
            explanation: "The lesson says monitoring runs alongside doing, not after it.",
          },
          {
            prompt: "Which document belongs mainly to the closing stage?",
            options: ["Concept note", "Risk register", "Attendance sheet", "Lessons learned report"],
            answer_index: 3,
            explanation: "The table lists handover notes, the final report and lessons learned under closing.",
          },
          {
            prompt: "In the school feeding example, what did Wumpini do during monitoring?",
            options: [
              "Collected daily meal counts and entered them in a shared spreadsheet",
              "Drilled a borehole",
              "Wrote the charter",
              "Handed kitchens to the parent teacher associations",
            ],
            answer_index: 0,
            explanation: "Wumpini's monitoring work was collecting meal counts and entering them in the spreadsheet.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "starting-a-project": {
      explanation_md: `Many projects that go wrong were in trouble from the first week, because nobody wrote down what success meant, who the project was for, or how anyone would know it had worked. Starting well is cheap. Fixing a badly started project later is expensive and tiring.

## Why this matters for your job

In NGO work, the start of a project often involves a concept note, an inception meeting with partners, and a results framework agreed with the donor. In a business, it might be a short proposal to the owner. Assistants are often asked to take notes at these meetings, gather information about communities, and draft parts of the documents. If you understand what the start of a project is trying to achieve, your notes and drafts will be far more useful.

## What this section covers

* **Goals, scope and a project charter.** Writing down, on one page, why the project exists, what it will and will not deliver, the budget, the dates and who is in charge.
* **Stakeholders and community engagement.** Finding everyone who affects or is affected by the project, and planning how to involve each of them respectfully.
* **Logical frameworks.** The table many donor funded projects use to link activities to results, with indicators that show whether change happened.

## Three questions every start must answer

Before any money is spent, a good team can answer these clearly:

1. **What are we trying to achieve, and how will we know?** Not "help the community with water" but "a working borehole serving about two hundred households by March, managed by a trained committee".
2. **Who cares about this project, and what do they need from it?** Donors want results and clean accounts. The community wants reliable water. The district assembly wants it to fit its plans. The chief wants to be respected and consulted.
3. **What will we do, and what will we not do?** Writing down what is outside the project protects the team from scope creep later.

## A small example

When the NGO in Tamale received funding for the water project, coordinator Fuseini did not send the drilling team out straight away. First he held a meeting with the chief, the assembly member and women who fetch water every day. He learned that the spot first suggested flooded every rainy season, and that women wanted the borehole near the school, not near the chief's palace. Mariama, his assistant, took notes and turned them into a one page summary. That summary became the basis of the charter and saved the project from drilling in the wrong place.

## The habit to build

At the start of anything, from a church harvest to a donor programme, pause and ask: what is the goal, who is involved, and what is out of scope? Writing the answers down, even in a WhatsApp note, puts you ahead of most teams.`,
      practice_task_md: `**Goal:** Practise the three start up questions on a project you know.

**Steps:**
1. Pick a project in your area, real or planned, such as a new market shed, a school library or a youth skills workshop.
2. On your phone or computer, answer the three questions from the lesson in two or three sentences each.
3. Rewrite the goal so it is specific: what, for whom, by when and how you would know it worked.

**Done looks like:** A short note with three answered questions and one specific goal sentence you could show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which goal statement is the most useful, according to the lesson?",
            options: [
              "Help the community with water",
              "Do something good for the village",
              "A working borehole serving about two hundred households by March, managed by a trained committee",
              "Spend the donor's money quickly",
            ],
            answer_index: 2,
            explanation: "The lesson contrasts a vague aim with a specific goal that says what, for whom, by when and how you know.",
          },
          {
            prompt: "Why does the lesson recommend writing down what the project will not do?",
            options: [
              "To make the charter longer",
              "To protect the team from scope creep later",
              "Because donors refuse to read goals",
              "To avoid talking to the community",
            ],
            answer_index: 1,
            explanation: "Stating what is out of scope protects the project from unplanned growth.",
          },
          {
            prompt: "What did Fuseini learn by meeting the community before drilling?",
            options: [
              "That the first suggested spot flooded and women preferred a site near the school",
              "That nobody needed water",
              "That the donor had cancelled funding",
              "That the drilling team was not available",
            ],
            answer_index: 0,
            explanation: "The meeting revealed the flooding problem and the women's preferred location.",
          },
          {
            prompt: "Which of these does the lesson say assistants are often asked to do at the start of a project?",
            options: [
              "Sign the donor contract",
              "Approve the final budget",
              "Take notes at meetings and draft parts of documents",
              "Choose the project coordinator",
            ],
            answer_index: 2,
            explanation: "The lesson says assistants often take notes, gather information and draft parts of documents.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "goals-scope-charter": {
      explanation_md: `A project charter is often the first document a new team member reads, and drafting one is a task assistants and officers are regularly given. It is short, but it settles the arguments that would otherwise come up again and again.

## What a charter is

A **charter** is a one or two page document, agreed at the start, that says why the project exists and the basic terms it runs on. Once the people in charge agree to it, the project has permission to go ahead. Organisations may call it a project brief, inception note or terms of reference, but the content is similar.

## What goes in it

* **Project name and purpose.** One or two sentences on the problem and why it matters.
* **Goal.** Specific and checkable: what will exist or change, for whom, by when.
* **In scope.** The main things the project will deliver.
* **Out of scope.** Things people might expect that the project will not do.
* **Budget.** The total amount and where it comes from.
* **Key dates.** Start, end and a few important milestones.
* **People.** Who is accountable overall, who is on the team, who the main stakeholders are.
* **Main risks or assumptions.** Things that must hold true for success.
* **Sign off.** Names of the people who agreed, with dates.

## Writing a good goal

A useful test is that a goal should be **specific, measurable, achievable, relevant and time bound**, often shortened to SMART. "Improve youth skills" fails the test. "Train 40 young people in Wa in basic spreadsheet and email skills over three Saturdays in June, with at least 30 completing a final task" passes.

## A worked example

Sumaila volunteers with a youth association in Wa. The association wants a skills workshop, so he drafts this charter in Google Docs:

* **Name:** Wa Youth Digital Basics Workshop.
* **Purpose:** Many young people in the association want office jobs but have never used spreadsheets or email professionally.
* **Goal:** Train 40 members in spreadsheet and email basics over three Saturdays in June; at least 30 complete the final task.
* **In scope:** Venue, facilitator, practice exercises, snacks, certificates of attendance.
* **Out of scope:** Buying laptops, job placement, training non members.
* **Budget:** GHS 3,500 from member dues and a local business sponsor.
* **Dates:** Venue booked by 20 May; sessions on three Saturdays in June; short report by 10 July.
* **People:** Association president Amina is accountable; Sumaila coordinates; Fuseini facilitates.
* **Risks:** Power cuts at the venue; members cannot afford transport.
* **Sign off:** Amina and the treasurer, 5 May.

Notice the out of scope list. When a member later asks if the workshop will help them find jobs, Sumaila can point to the charter kindly and explain that job placement is a possible future project.

## Keep it alive

A charter is not filed and forgotten. If the budget, dates or scope change in a big way, update the charter and get it agreed again. That way everyone keeps working from the same page.`,
      practice_task_md: `**Goal:** Write a one page charter for a small project.

**Steps:**
1. Choose a small project you could really run, such as a reading club, a clean up day or a savings group launch.
2. In Google Docs or any notes app on your phone or computer, add the nine headings from the lesson.
3. Fill each heading in one to three lines. Make the goal SMART, and list at least three out of scope items.
4. Ask a friend to read it and tell you anything that is unclear. Improve it.

**Done looks like:** A one page charter with all nine headings, a SMART goal and three or more out of scope items. Save it as the first document in your project portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main purpose of a project charter?",
            options: [
              "To record every daily task in detail",
              "To say why the project exists and the basic terms it runs on, agreed at the start",
              "To list receipts for the auditors",
              "To advertise the project on social media",
            ],
            answer_index: 1,
            explanation: "The lesson describes a charter as a short agreed document stating why the project exists and its basic terms.",
          },
          {
            prompt: "Which goal is SMART?",
            options: [
              "Improve youth skills",
              "Help as many people as possible",
              "Train 40 young people in Wa in spreadsheet and email basics over three Saturdays in June, with at least 30 completing a final task",
              "Make the association better",
            ],
            answer_index: 2,
            explanation: "It is specific, measurable, achievable, relevant and has a time limit.",
          },
          {
            prompt: "In Sumaila's charter, which item is listed as out of scope?",
            options: ["Snacks", "A facilitator", "Certificates of attendance", "Job placement"],
            answer_index: 3,
            explanation: "Job placement is in the out of scope list, alongside buying laptops and training non members.",
          },
          {
            prompt: "What should happen if the budget or scope changes in a big way?",
            options: [
              "Update the charter and get it agreed again",
              "Ignore the charter because it is already filed",
              "Start a completely new project",
              "Tell only the donor",
            ],
            answer_index: 0,
            explanation: "The lesson says to update the charter and get it agreed again so everyone works from the same page.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "stakeholders-and-communities": {
      explanation_md: `In northern Ghana, a project can have the right budget and the right plan and still fail because the wrong people were left out. A chief who was not greeted properly, a women's group that was not asked, or a district officer who heard about the project from the radio can each slow or stop the work. Adverts for project officers and assistants regularly ask for stakeholder engagement and community mobilisation for this reason.

## Who are stakeholders?

A **stakeholder** is anyone who affects the project or is affected by it. On a community project this often includes:

* The **donor** or funder.
* The **district assembly** and its departments, such as education, health or water.
* **Traditional authorities**: the chief, elders and the chief's linguist.
* **Assembly members** and unit committee members.
* **Community groups**: women's groups, youth groups, farmer groups, water committees, parent teacher associations.
* The **people the project serves**, including those who are often missed: people with disabilities, older people, women who cannot attend evening meetings.
* **Suppliers and contractors.**
* Your own **organisation's staff**.

## Mapping influence and interest

A simple tool is a two by two grid. Score each stakeholder as high or low on two questions: how much **influence** do they have over the project, and how much **interest** do they have in it?

* **High influence, high interest: work closely.** Involve them in decisions and meet them regularly. Example: the chief and the district water officer.
* **High influence, low interest: keep satisfied.** Brief them at key moments, keep it short. Example: the district chief executive.
* **Low influence, high interest: keep informed.** Share regular updates. Example: households that will use the borehole.
* **Low influence, lower interest: monitor.** Check in from time to time. Example: a nearby community that may want a borehole later.

The grid is a guide, not a ranking of who matters. People with little formal influence are often the ones the project exists to serve, so their voices need extra care.

## A worked example

On the water project, assistant Mariama builds a stakeholder list in a spreadsheet with columns for name or group, role, influence, interest, what they need, and how to engage them. For the women's group she notes: "Meet in the afternoon after market, in Dagbani, with a female staff member present." For the chief she notes: "Courtesy call with kola before any community meeting; update before drilling starts."

Coordinator Fuseini uses her list to plan an engagement calendar: an entry meeting with the chief, a community durbar, monthly water committee meetings, and a short update to the district assembly each quarter.

## Respectful engagement

* Follow local protocol: greet traditional authorities first and through the right channels.
* Speak the language people are comfortable in, and use interpreters when needed.
* Choose times and places that suit the people you want to hear from.
* Record what people say and show later how their views shaped decisions.
* Never promise what the project cannot deliver.

Good engagement builds trust that lasts beyond the project, and that trust is often what keeps a borehole working years later.`,
      practice_task_md: `**Goal:** Make a stakeholder map for a local project.

**Steps:**
1. Choose a project, such as a new borehole, a market toilet block or a school feeding programme in your area.
2. In a spreadsheet on your phone or computer, list at least eight stakeholders with columns: name or group, role, influence (high or low), interest (high or low), what they need, how to engage them.
3. Sort them into the four groups from the lesson.
4. For two stakeholders who are easy to miss, write one sentence on how you would make sure they are heard.

**Done looks like:** A sheet with eight or more stakeholders sorted into four groups and two notes on reaching people who are often left out.`,
      quiz: {
        questions: [
          {
            prompt: "Which definition of a stakeholder matches the lesson?",
            options: [
              "Only the people who pay for the project",
              "Anyone who affects the project or is affected by it",
              "Only staff of the organisation",
              "People who own shares in a company",
            ],
            answer_index: 1,
            explanation: "The lesson defines a stakeholder as anyone who affects or is affected by the project.",
          },
          {
            prompt: "How should you engage a stakeholder with high influence and high interest?",
            options: ["Monitor them occasionally", "Keep them informed only", "Work closely with them", "Ignore them"],
            answer_index: 2,
            explanation: "High influence and high interest stakeholders should be involved closely in decisions.",
          },
          {
            prompt: "Why does the lesson warn that the grid is not a ranking of who matters?",
            options: [
              "Because people with little formal influence are often the ones the project serves",
              "Because donors do not like grids",
              "Because influence never changes",
              "Because only the chief matters",
            ],
            answer_index: 0,
            explanation: "The people the project exists to serve may have little formal influence but need extra care.",
          },
          {
            prompt: "Which is an example of respectful engagement from the lesson?",
            options: [
              "Holding all meetings in English at night",
              "Promising every community a borehole",
              "Skipping the chief to save time",
              "Greeting traditional authorities first through the right channels",
            ],
            answer_index: 3,
            explanation: "The lesson lists following local protocol and greeting traditional authorities first.",
          },
        ],
        pass_threshold: 75,
      },
    },

    logframes: {
      explanation_md: `Many donor funded projects in Ghana are designed and reported using a **logical framework**, usually called a **logframe**. Officer and coordinator adverts mention donor reporting, indicators and results again and again, and nearly all of that rests on the logframe. You may not write one in your first job, but you will need to read one and collect the information it asks for.

## The idea: a chain of results

A logframe links what the project does to the change it hopes to cause, in a chain of levels:

* **Activities:** the things the team does. Drill a borehole, train a committee.
* **Outputs:** what those activities directly produce. One working borehole; ten committee members trained.
* **Outcome:** the change the outputs should lead to. Households use safe water all year.
* **Goal (or impact):** the bigger, longer term change the project contributes to. Fewer cases of waterborne illness in the community.

Read it as a chain of "if... then": **if** we do these activities, **then** we get these outputs; **if** we have these outputs, **then** the outcome follows, and so on.

## The columns

For each level, a logframe usually has:

* **Indicators:** how you will measure it. Use numbers or clear yes or no checks.
* **Means of verification:** where the evidence comes from, such as attendance sheets, survey results or water quality tests.
* **Assumptions:** things outside the project's control that must hold true for the chain to work.

## A worked example

Here is a short logframe for the community water project:

| Level | Statement | Indicator | Evidence | Assumption |
|---|---|---|---|---|
| Goal | Better health in the community | Fewer reported cases of diarrhoea at the clinic | Clinic records | Other water sources do not get worse |
| Outcome | Households use safe water all year | Number of households collecting from the borehole each month | Water committee log book | The borehole is repaired quickly when it breaks |
| Output | Borehole working and committee trained | Borehole passes water test; ten members trained | Test certificate; attendance sheet | Contractor delivers on time |
| Activity | Drill borehole; train committee; hold durbar | Activities done by planned dates | Work plan; receipts | Roads passable before rains |

## How it shapes your daily work

The logframe tells you what evidence to collect. If an indicator says "ten members trained", then the signed attendance sheet from the training is not just paperwork; it is proof for the donor report. If an assumption says "roads passable before rains", then watching the weather and the roads is part of managing risk.

When you write reports, you follow the logframe level by level: what activities happened, what outputs they produced, and what early signs of the outcome you see.

## Words to watch

Different donors use slightly different terms: results framework, theory of change, intermediate results. The logic is the same chain from activities to long term change. Ask your coordinator which format your donor uses, and keep a copy of the logframe close when you plan, collect data and report.`,
      practice_task_md: `**Goal:** Build a four level logframe for a small project.

**Steps:**
1. Choose a project, such as a school feeding programme, a reading club or a tree planting campaign.
2. In a spreadsheet or document on your phone or computer, make a table with five columns: level, statement, indicator, evidence, assumption.
3. Fill one row each for goal, outcome, output and activity.
4. Check the chain by reading it upwards as "if... then" sentences. If a step does not follow, rewrite it.

**Done looks like:** A four row logframe where every level has an indicator, a source of evidence and an assumption, and the "if... then" chain makes sense.`,
      quiz: {
        questions: [
          {
            prompt: "In a logframe, what is an output?",
            options: [
              "The long term change in the region",
              "What the activities directly produce, such as a working borehole",
              "The money the donor gives",
              "A meeting with the chief",
            ],
            answer_index: 1,
            explanation: "Outputs are the direct products of activities, like one working borehole and a trained committee.",
          },
          {
            prompt: "Which order runs from the most immediate to the longest term?",
            options: [
              "Goal, outcome, output, activity",
              "Outcome, activity, goal, output",
              "Activity, output, outcome, goal",
              "Output, goal, activity, outcome",
            ],
            answer_index: 2,
            explanation: "The chain runs from activities to outputs to outcome to goal.",
          },
          {
            prompt: "What is the means of verification column for?",
            options: [
              "Where the evidence for each indicator comes from",
              "The names of the donors",
              "The budget for each activity",
              "The risks the team controls",
            ],
            answer_index: 0,
            explanation: "Means of verification records the source of evidence, such as attendance sheets or clinic records.",
          },
          {
            prompt: "What is an assumption in a logframe?",
            options: [
              "A guess about the budget",
              "An activity the team will do",
              "A type of indicator",
              "Something outside the project's control that must hold true",
            ],
            answer_index: 3,
            explanation: "Assumptions are external conditions the chain depends on, such as roads being passable.",
          },
          {
            prompt: "Why does the lesson say a signed attendance sheet matters?",
            options: [
              "It is evidence for an indicator in the donor report",
              "It replaces the budget",
              "Donors collect autographs",
              "It is needed to drill the borehole",
            ],
            answer_index: 0,
            explanation: "The attendance sheet proves the 'ten members trained' indicator.",
          },
        ],
        pass_threshold: 80,
      },
    },

    planning: {
      explanation_md: `A plan is what turns a good idea into work that people can actually do on Monday morning. Project adverts in Ghana ask for work plans, activity plans and budgets more than almost anything else, and assistants spend much of their time updating them. This section teaches you to build those plans yourself.

## What a plan answers

A useful project plan answers five questions:

1. **What needs to be done?** A list of deliverables and the tasks under them.
2. **In what order, and by when?** A schedule showing which tasks depend on others.
3. **Who will do it?** A name against every task.
4. **What will it cost?** A budget with every cost line.
5. **What might go wrong?** A list of risks and what you will do about them.

## What this section covers

* **Breaking work into tasks.** Splitting a big goal into pieces small enough to assign and track.
* **Schedules and Gantt charts.** Putting tasks in order, around holidays, market days and the rainy season, and drawing a timeline.
* **Simple project budgets.** Listing costs with quantities and unit prices in cedis, the way donors expect.
* **Risks and issues.** Keeping a register of what might go wrong and what already has.

## One spreadsheet, several tabs

You do not need expensive software. Every plan in this section can be built in a free spreadsheet such as Google Sheets, which works in a browser and as an app on phones. A practical habit is to keep one spreadsheet per project with several tabs:

* **Tasks:** task, owner, start date, end date, status.
* **Budget:** cost line, quantity, unit cost, total.
* **Risks:** risk, likelihood, impact, owner, response.
* **Contacts:** names, roles and phone numbers.

Share it with the team so everyone sees the same, current version. That one shared file stops the confusion of five different plans on five different phones.

## A worked example

Issahaku coordinates the school feeding programme. Before the first term, he and his assistant Wumpini build the plan together in one shared spreadsheet:

* On the tasks tab they list hiring cooks, buying pots, building storage shelves and agreeing menus with head teachers, each with a name and a date.
* On the budget tab they cost food per pupil per day, cooks' allowances, fuel and transport.
* On the risks tab they note that maize prices often rise before harvest and that funds from the donor might arrive late.

When the district director asks, "Are we ready to start in September?", Issahaku opens the sheet and answers with facts rather than guesses.

## Plans change, and that is fine

A plan is a best guess made with the information you have today. When things change, update the plan and tell the people affected. A plan that matches reality is worth far more than a beautiful plan nobody follows.`,
      practice_task_md: `**Goal:** Set up a project planning spreadsheet you can reuse.

**Steps:**
1. Open Google Sheets or another free spreadsheet app on your phone or computer and create a new file named after a small project of your choice.
2. Add four tabs: Tasks, Budget, Risks, Contacts.
3. Add the column headings from the lesson to each tab.
4. Fill in at least three rows on the Tasks tab and two on the Risks tab.

**Done looks like:** A spreadsheet with four labelled tabs, correct headings, and a few real rows. You will keep adding to it in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is NOT one of the five questions a plan answers?",
            options: ["What needs to be done?", "Who will do it?", "What might go wrong?", "Which staff member is the most popular?"],
            answer_index: 3,
            explanation: "The five questions cover tasks, order and dates, owners, cost and risks.",
          },
          {
            prompt: "Why does the lesson recommend one shared spreadsheet per project?",
            options: [
              "So everyone sees the same, current version of the plan",
              "Because spreadsheets cannot be printed",
              "So nobody needs to update it",
              "Because donors require a specific app",
            ],
            answer_index: 0,
            explanation: "One shared file avoids confusion from several different versions on different devices.",
          },
          {
            prompt: "Which columns does the lesson suggest for the Risks tab?",
            options: [
              "Cost line, quantity, unit cost, total",
              "Name, role, phone number",
              "Risk, likelihood, impact, owner, response",
              "Task, owner, start date, end date, status",
            ],
            answer_index: 2,
            explanation: "The lesson lists risk, likelihood, impact, owner and response for the Risks tab.",
          },
          {
            prompt: "What should you do when circumstances change during a project?",
            options: [
              "Keep the original plan and ignore the change",
              "Update the plan and tell the people affected",
              "Delete the plan and start over",
              "Wait until the end of the project to mention it",
            ],
            answer_index: 1,
            explanation: "The lesson says a plan that matches reality is more valuable, so update it and inform people.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "breaking-down-work": {
      explanation_md: `"Organise a three day farmer training" is too big to act on. Nobody can wake up and do it. "Call three venues in Damongo for prices" is a task someone can finish this afternoon. The skill of turning big goals into small, clear tasks is at the heart of the work plans that project jobs ask for.

## The work breakdown structure

A **work breakdown structure**, or **WBS**, splits a project into layers:

1. **The project** at the top.
2. **Deliverables**: the main things the project must produce.
3. **Work packages or tasks**: the pieces of work under each deliverable.

You keep breaking down until each task is small enough that one person can own it, you can estimate how long it takes and what it costs, and everyone will agree when it is done.

A common guide is that most tasks should take no more than a week or two. If a task is longer, it probably hides several smaller tasks.

## Deliverables, not just activities

Start with the things the project must produce, written as nouns: "venue booked", "training materials printed", "participants registered". Then list the actions needed for each. This keeps you focused on results, not just busy work.

## A worked example

Abdul-Rahman works for a farmer support NGO and must organise a three day training for 30 farmers in Damongo. His breakdown:

**1. Venue ready**
* 1.1 Get prices from three venues
* 1.2 Visit and choose venue
* 1.3 Pay deposit and get receipt

**2. Participants confirmed**
* 2.1 Agree selection criteria with the field officer
* 2.2 Call farmer group leaders for names
* 2.3 Send reminders two days before

**3. Facilitation ready**
* 3.1 Confirm facilitator and dates
* 3.2 Review training content
* 3.3 Print handouts and attendance sheets

**4. Logistics arranged**
* 4.1 Book lunch and snacks for three days
* 4.2 Arrange transport refunds
* 4.3 Prepare payment request for finance

**5. Training reported**
* 5.1 Collect signed attendance sheets
* 5.2 Take photos with consent
* 5.3 Write a two page activity report

Each task has a number, which makes it easy to refer to in meetings ("Where are we on 2.2?") and to copy into a schedule and a budget later.

## How to check your breakdown

* **Is anything missing?** Walk through the event in your mind from start to finish. Reports and payments are often forgotten.
* **Is each task clear?** Start with a verb: call, book, print, send.
* **Is anything too big?** Break it down again.
* **Does every task have one owner?** Add a name.

## Tips for doing it with others

Breaking down work is best done as a group. In a short meeting, write the deliverables, then let each person suggest tasks. People closest to the work, like field officers and cooks, often remember steps that managers forget. You can do this on a shared spreadsheet or on paper and type it up afterwards.`,
      practice_task_md: `**Goal:** Create a numbered work breakdown for a small event.

**Steps:**
1. Choose an event, such as a one day youth workshop, a community clean up or a school open day.
2. On your phone or computer, write four or five deliverables as nouns, such as "venue ready".
3. Under each, list two to four tasks starting with a verb, numbered 1.1, 1.2 and so on.
4. Add an owner name to every task and check the list against the four questions in the lesson.

**Done looks like:** A numbered breakdown with four or five deliverables, at least twelve tasks, every task starting with a verb and assigned to one person.`,
      quiz: {
        questions: [
          {
            prompt: "What does WBS stand for?",
            options: ["Weekly budget summary", "Work breakdown structure", "Written briefing sheet", "Workplace benefit scheme"],
            answer_index: 1,
            explanation: "WBS stands for work breakdown structure.",
          },
          {
            prompt: "When should you stop breaking work down?",
            options: [
              "When the list reaches exactly ten items",
              "When the manager is tired",
              "When each task can be owned by one person, estimated and clearly finished",
              "Never; keep breaking it down forever",
            ],
            answer_index: 2,
            explanation: "The lesson says to stop when a task has one owner, can be estimated and has a clear finish.",
          },
          {
            prompt: "Which of these is written as a deliverable rather than a task?",
            options: ["Call three venues", "Venue ready", "Print handouts", "Send reminders"],
            answer_index: 1,
            explanation: "Deliverables are written as nouns describing a result, like 'venue ready'.",
          },
          {
            prompt: "Which items does the lesson say are often forgotten in a breakdown?",
            options: ["Reports and payments", "The project name", "The venue", "Lunch"],
            answer_index: 0,
            explanation: "The lesson notes that reports and payments are often forgotten.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "schedules-and-gantt-charts": {
      explanation_md: `Knowing what to do is half the plan. Knowing when to do it, and in what order, is the other half. Coordinator and assistant adverts ask for scheduling, timelines and activity plans, and many donors want a timeline with every proposal and report.

## Dependencies

Some tasks cannot start until another finishes. You cannot print handouts before the content is agreed. You cannot pay a deposit before you have chosen a venue. These links are called **dependencies**. Mark them clearly, because a delay in one task pushes back every task that depends on it.

A **milestone** is an important point with no length of its own, such as "venue booked" or "first meal served". Milestones help everyone see progress at a glance.

## Estimating time honestly

For each task, estimate how long it will really take, not how long it would take if everything went perfectly. Then think about the local calendar:

* **Public and religious holidays**, when offices close and people travel.
* **Market days**, when traders and many community members are busy.
* **The rainy season**, when some roads become hard to use.
* **Farming seasons**, when farmers have little time for meetings.
* **School terms and exams**, for anything involving schools.

Add some buffer time before important milestones. Things will slip; buffer protects the final date.

## The Gantt chart

A **Gantt chart** is a timeline that lists tasks down the left and dates across the top, with a bar for each task showing when it starts and ends. In one picture you see what happens when, what overlaps, and where the busy weeks are.

You can make a simple Gantt chart in any spreadsheet: put tasks in column A, weeks across row 1, and colour the cells for the weeks each task runs. Some organisations' paid Google Workspace accounts also offer a timeline view that turns rows with start and end dates into bars, but coloured cells work in any free spreadsheet.

## A worked example

Wumpini plans the start of the school feeding programme over six weeks before term begins:

| Task | Wk 1 | Wk 2 | Wk 3 | Wk 4 | Wk 5 | Wk 6 |
|---|---|---|---|---|---|---|
| Hire and train cooks | ■ | ■ | ■ | | | |
| Agree menus with heads | ■ | ■ | | | | |
| Buy pots and utensils | | ■ | ■ | | | |
| Build store shelves | | | ■ | ■ | | |
| Buy first food stock | | | | ■ | ■ | |
| Trial meal day | | | | | | ■ |

Menus must be agreed before food is bought, and shelves must be ready before stock arrives. She notices week 4 includes a public holiday and moves the shelf building to start a few days earlier. Week 6 is buffer plus a trial meal day before the first real school day, which is the milestone.

## Keep it current

Update the schedule each week: mark tasks done, move bars that slipped, and check whether any milestone is now at risk. Share a screenshot in the team WhatsApp group or post the link so nobody works from an old version.`,
      practice_task_md: `**Goal:** Draw a simple Gantt chart in a spreadsheet.

**Steps:**
1. Take the breakdown from the last lesson, or list eight tasks for a small project.
2. In Google Sheets or another free spreadsheet app on your phone or computer, put tasks in column A and weeks 1 to 6 across row 1.
3. Fill the cells with a colour or a symbol for the weeks each task runs.
4. Mark at least two dependencies by writing "after task X" in a notes column, and add one milestone.
5. Check the local calendar and move any task that clashes with a holiday, market day or season.

**Done looks like:** A six week chart with eight tasks, two noted dependencies, one milestone and one change you made for the local calendar.`,
      quiz: {
        questions: [
          {
            prompt: "What is a dependency in a schedule?",
            options: [
              "A task that cannot start until another one finishes",
              "A staff member who depends on their salary",
              "A spare amount of money",
              "A type of chart colour",
            ],
            answer_index: 0,
            explanation: "A dependency links tasks so that one must finish before another starts.",
          },
          {
            prompt: "What is a milestone?",
            options: [
              "The longest task in the project",
              "An important point in the schedule with no length of its own",
              "A distance marker on the road to the site",
              "The final budget total",
            ],
            answer_index: 1,
            explanation: "The lesson defines a milestone as an important point, such as 'venue booked', with no duration.",
          },
          {
            prompt: "Why should you add buffer time before important milestones?",
            options: [
              "To make the chart look longer",
              "Because donors pay more for longer projects",
              "Because things will slip, and buffer protects the final date",
              "So staff can take holidays",
            ],
            answer_index: 2,
            explanation: "Buffer absorbs delays so the key date is still met.",
          },
          {
            prompt: "In Wumpini's plan, why must menus be agreed before food is bought?",
            options: [
              "Because it is the shortest task",
              "Because cooks need to be paid first",
              "Because the donor said so",
              "Because what food to buy depends on the agreed menus",
            ],
            answer_index: 3,
            explanation: "Buying food depends on knowing the menus, so it is a dependency.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "simple-budgets": {
      explanation_md: `Budget and financial tracking skills appear in nearly every project advert, from assistant to coordinator. Donors and managers trust people who can show exactly where money is planned to go and where it went. You do not need to be an accountant, but you do need to build a clear budget and follow it.

## How a project budget is built

A project budget is a table of **cost lines**. Each line has:

* **Description:** what the money is for, such as "Lunch for participants".
* **Unit:** what you are counting, such as person per day, trip or piece.
* **Quantity:** how many units.
* **Unit cost:** price of one unit in cedis.
* **Total:** quantity times unit cost.

Building costs from units makes your budget easy to check and easy to adjust. If the number of participants changes, you change one quantity and the totals update.

Group lines into categories, such as personnel, travel, meetings and training, equipment and supplies, and administration. Many donors give you their own categories; use them exactly.

## A worked example

Fuseini asks Mariama to budget a two day training for ten water committee members. All prices here are invented for practice. She uses a spreadsheet with a formula in the total column, such as =C2*D2 to multiply quantity by unit cost.

| Cost line | Unit | Qty | Unit cost (GHS) | Total (GHS) |
|---|---|---|---|---|
| Lunch and snacks | person per day | 24 | 60 | 1,440 |
| Transport refund | person per day | 20 | 30 | 600 |
| Facilitator fee | day | 2 | 500 | 1,000 |
| Venue hire | day | 2 | 300 | 600 |
| Handouts and stationery | set | 12 | 25 | 300 |
| **Subtotal** | | | | **3,940** |
| Contingency | | | | 200 |
| **Total** | | | | **4,140** |

Notice the quantities. Lunch covers twelve people per day (ten members plus facilitator and Mariama) for two days. Transport covers the ten members for two days.

## Contingency

**Contingency** is a small amount kept aside for unexpected costs, such as a price rise. Some donors allow it as a line; others do not, and expect you to build realistic unit costs instead. Ask before you add it.

## Getting unit costs right

Base prices on real quotes or recent receipts, not guesses. For an NGO, the finance team usually has standard rates for allowances, fuel and meals. Note your sources in a comment or a notes column so anyone checking the budget can see where each figure came from.

## Following donor rules

Once a donor approves a budget, spending usually has to match the approved lines. You may not be able to move money from venue hire to lunch without permission, and some costs may not be allowed at all. Keep a copy of the approved budget and the donor's rules close, and ask finance before spending on anything you are unsure about. In the monitoring section you will learn to track actual spending against this plan.`,
      practice_task_md: `**Goal:** Build a costed budget in a spreadsheet.

**Steps:**
1. Choose a small activity, such as a one day workshop for 20 people.
2. In a spreadsheet on your phone or computer, create the columns: cost line, unit, quantity, unit cost, total.
3. Add at least six cost lines. Use a formula to multiply quantity by unit cost, and another to add up the totals.
4. Ask a trader, a friend or check recent receipts to get realistic prices for two lines, and note the source.
5. Change the number of participants and check the totals update.

**Done looks like:** A working budget with six or more lines, formulas for totals, and two prices with noted sources.`,
      quiz: {
        questions: [
          {
            prompt: "How is the total for a cost line calculated?",
            options: [
              "Quantity times unit cost",
              "Unit cost minus quantity",
              "Whatever the donor suggests",
              "Quantity plus unit cost",
            ],
            answer_index: 0,
            explanation: "The lesson's formula multiplies quantity by unit cost.",
          },
          {
            prompt: "Why is building costs from units and quantities helpful?",
            options: [
              "It makes the budget longer",
              "It hides costs from the donor",
              "It makes the budget easy to check and adjust when numbers change",
              "It removes the need for receipts",
            ],
            answer_index: 2,
            explanation: "Change one quantity and the totals update, and each figure can be checked.",
          },
          {
            prompt: "What is contingency?",
            options: [
              "A fee paid to the facilitator",
              "A small amount set aside for unexpected costs",
              "The donor's profit",
              "The cost of transport",
            ],
            answer_index: 1,
            explanation: "Contingency covers unexpected costs, and some donors do not allow it, so ask first.",
          },
          {
            prompt: "Where should unit costs come from?",
            options: [
              "A random guess",
              "The highest price you can imagine",
              "Last year's budget from a different country",
              "Real quotes, recent receipts or the organisation's standard rates",
            ],
            answer_index: 3,
            explanation: "The lesson says to base prices on quotes, receipts or finance's standard rates.",
          },
          {
            prompt: "After a donor approves a budget, what usually applies?",
            options: [
              "Spending should match the approved lines unless permission is given",
              "You can move money freely between lines",
              "The budget no longer matters",
              "Only the total needs to be correct",
            ],
            answer_index: 0,
            explanation: "Donors usually expect spending to follow approved lines, so ask before moving money.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "risks-and-issues": {
      explanation_md: `Things will go wrong on every project. Funds arrive late, roads flood, a supplier raises prices, a key person falls ill. Good project staff are not people who avoid every problem; they are people who saw it coming and had a plan. Managing risk is listed in coordinator adverts and is part of every serious project plan.

## Risk or issue?

* A **risk** is something that **might** happen and would affect the project. "Heavy rains might make the road to the site impassable in August."
* An **issue** is something that **has already** happened and needs action now. "The road is flooded and the drilling rig cannot reach the site."

You manage risks by preparing. You manage issues by acting. A risk that happens becomes an issue.

## The risk register

A **risk register** is a table, usually a tab in your project spreadsheet, with these columns:

* **Risk:** written as a clear cause and effect. "If funds arrive late, then cooks will not be paid on time."
* **Likelihood:** how likely it is: low, medium or high (or 1 to 3).
* **Impact:** how badly it would hurt the project if it happened: low, medium or high (or 1 to 3).
* **Score:** likelihood times impact, so you know which risks to watch most.
* **Response:** what you will do about it.
* **Owner:** the one person who keeps an eye on it.
* **Status:** open, happening or closed.

## Four ways to respond

1. **Avoid:** change the plan so the risk cannot happen. Schedule drilling before the rains.
2. **Reduce:** make it less likely or less harmful. Get three supplier quotes so one price rise does not stop you.
3. **Transfer:** pass some of it to someone better placed, for example a contract that makes the contractor responsible for delays they cause.
4. **Accept:** for small risks, note it and deal with it if it happens.

## A worked example

Here is part of the register for the school feeding programme, kept by Wumpini:

| Risk | L | I | Score | Response | Owner |
|---|---|---|---|---|---|
| If donor funds arrive late, then food cannot be bought | 2 | 3 | 6 | Agree a two week food reserve; alert donor early | Issahaku |
| If maize prices rise before harvest, then the budget runs short | 3 | 2 | 6 | Buy in bulk after harvest; agree prices with farmer groups | Wumpini |
| If a cook falls ill, then meals stop at one school | 2 | 2 | 4 | Train one backup cook per school | Head teachers |
| If pupils' parents are not informed, then attendance is low | 1 | 2 | 2 | Accept; announce at PTA meetings | Wumpini |

## Logging issues

Keep a short **issue log** too: what happened, date, effect, action taken, who is handling it and when it was resolved. When the donor asks why meals stopped for three days in November, the log answers the question with facts.

## Make it a habit

Review the register at every team meeting. Ask: has anything changed? Are there new risks? Has any risk become an issue? Raising a risk early is never a sign of weakness. Managers would far rather hear "this might go wrong" in good time than "this went wrong" when it is too late to act.`,
      practice_task_md: `**Goal:** Create a risk register for a small project.

**Steps:**
1. Use the Risks tab of your planning spreadsheet, or start a new sheet on your phone or computer.
2. Add the columns from the lesson: risk, likelihood, impact, score, response, owner, status.
3. Write five risks for your project as "If... then..." sentences. Score each from 1 to 3 for likelihood and impact, and use a formula to multiply them.
4. Choose a response type (avoid, reduce, transfer or accept) for each and describe the action.
5. Sort by score so the biggest risks are at the top.

**Done looks like:** A register with five scored risks, sorted from highest to lowest, each with a response and an owner.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between a risk and an issue?",
            options: [
              "A risk might happen; an issue has already happened",
              "A risk is small; an issue is large",
              "A risk is about money; an issue is about people",
              "There is no difference",
            ],
            answer_index: 0,
            explanation: "The lesson defines a risk as something that might happen and an issue as something that already has.",
          },
          {
            prompt: "How is the risk score calculated in the lesson?",
            options: [
              "Likelihood plus owner",
              "Impact minus likelihood",
              "Likelihood times impact",
              "The number of people affected",
            ],
            answer_index: 2,
            explanation: "The score is likelihood multiplied by impact.",
          },
          {
            prompt: "Scheduling drilling before the rains is an example of which response?",
            options: ["Accept", "Transfer", "Reduce", "Avoid"],
            answer_index: 3,
            explanation: "Changing the plan so the risk cannot happen is avoiding it.",
          },
          {
            prompt: "Why does the lesson suggest keeping an issue log?",
            options: [
              "To blame the person responsible",
              "To answer questions later with facts about what happened and what was done",
              "Because donors ban risk registers",
              "To replace the budget",
            ],
            answer_index: 1,
            explanation: "The issue log records events and actions so questions can be answered with facts.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "running-the-work": {
      explanation_md: `Once a plan is agreed, the real work begins: getting people, tasks, supplies and money to meet in the right place at the right time. This is where project assistants and officers spend most of their days, and where employers see whether someone is reliable.

## What running the work involves

Adverts for project assistants and officers in Tamale and across Ghana list duties like coordinating trainings and events, following up on tasks, organising meetings, arranging logistics, processing payment requests and keeping records. None of these is glamorous, but together they decide whether a project delivers.

The job at this stage is mostly **follow through**:

* Checking that each task in the plan is moving.
* Reminding people politely before deadlines, not after.
* Spotting problems early and raising them.
* Making sure the money, materials and transport are ready when activities happen.
* Recording what was done so it can be reported.

## What this section covers

* **Task boards.** A simple visual board, in a free tool or a spreadsheet, that shows what is to do, in progress and done.
* **Meetings, minutes and action points.** How to run short, useful meetings and record decisions so people act on them.
* **Logistics, vendors and procurement.** Arranging venues, transport and materials, getting quotes, and following the rules that keep spending honest.

## A day in the life

Here is an invented but typical day for Mariama, assistant on the community water project:

* **8:00** Checks the team task board. Two tasks are due this week: confirming the drilling date and printing materials for the water committee training.
* **8:30** Calls the contractor to confirm the rig will arrive on Thursday. Updates the board.
* **10:00** Joins the weekly team meeting and takes minutes. Coordinator Fuseini agrees to move the training by one week because of a funeral in the community.
* **11:30** Sends the minutes to the team WhatsApp group with action points, names and dates.
* **13:00** Collects three quotes for printing and prepares a payment request for the finance officer, Abdul-Rahman.
* **15:00** Calls the assembly member to tell him about the new training date.
* **16:30** Files today's receipts and updates the tracking sheet.

Notice how much of the day is communication and follow up. Each small action keeps the plan true to reality.

## Habits that build trust

* **Close the loop.** When you finish a task, tell the person who needs to know.
* **Write things down.** Decisions made in a corridor are forgotten by Friday.
* **Raise problems early.** A late warning is much less useful than an early one.
* **Be consistent.** Update the board and the trackers at the same time each day or week.

These habits matter more than any tool, and they are what managers remember when they write your reference letter.`,
      practice_task_md: `**Goal:** Plan a realistic working day for a project assistant.

**Steps:**
1. Pick one of the three example projects: the water project, the school feeding programme or Hawa's shop launch.
2. On your phone or computer, write a schedule for one working day with at least six time slots, like the example in the lesson.
3. For each slot, write the task and who you would need to contact.
4. Mark which slots involve follow up or communication, and count them.

**Done looks like:** A one day schedule with six or more entries, each with a contact, and a count of how many involve communication. Write one sentence on what that tells you about the job.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say the job is mostly about at this stage?",
            options: ["Designing the logframe", "Follow through", "Raising funds", "Hiring a new director"],
            answer_index: 1,
            explanation: "Running the work is mostly follow through: checking, reminding, spotting problems and recording.",
          },
          {
            prompt: "When should you remind people about deadlines?",
            options: ["After the deadline has passed", "Never; it is rude", "Before the deadline, politely", "Only at the end of the project"],
            answer_index: 2,
            explanation: "The lesson says to remind people politely before deadlines, not after.",
          },
          {
            prompt: "What did Mariama do after taking minutes in the team meeting?",
            options: [
              "Kept them private",
              "Deleted them",
              "Waited a week before sharing",
              "Sent them to the team WhatsApp group with action points, names and dates",
            ],
            answer_index: 3,
            explanation: "She shared the minutes with action points, names and dates the same day.",
          },
          {
            prompt: "What does 'close the loop' mean in the lesson?",
            options: [
              "When you finish a task, tell the person who needs to know",
              "Lock the office at night",
              "End the project early",
              "Stop answering messages",
            ],
            answer_index: 0,
            explanation: "Closing the loop means letting the relevant person know a task is done.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "task-boards": {
      explanation_md: `When a team has dozens of tasks, the questions "Who is doing that?" and "Is it finished?" can eat up hours. A task board answers them at a glance. Coordinator adverts ask for experience with project management tools, and a simple board is the easiest place to start.

## The idea

A **task board** has columns for the stages of work and a **card** for each task. The simplest board has three columns:

* **To do:** tasks not yet started.
* **Doing:** tasks someone is working on now.
* **Done:** finished tasks.

As work moves, you move the card from left to right. Anyone who looks at the board sees where things stand. This style of working is often called **Kanban**, from a Japanese word for a visual card or signboard.

Each card should say:

* What the task is, starting with a verb.
* Who owns it.
* When it is due.
* Any notes, files or checklists needed.

## A useful rule: limit work in progress

If the Doing column fills up with fifteen cards, people are juggling too much and little actually finishes. Many teams agree a limit, such as no more than three cards per person in Doing. Finishing one thing before starting another moves the project faster.

## Tools

You can make a task board in several ways:

* **A free task board app.** Trello, named here only as an example, offers a free plan with boards, lists and cards, and works in a browser and as an app on phones. Other tools like it exist; check each one's current free limits.
* **A shared spreadsheet.** Columns for task, owner, due date and status, with status as a dropdown (To do, Doing, Done). Filter by status or owner to see each list.
* **Paper or a wall.** Sticky notes on a wall in the office still work well for a team in one room.

Choose what your team will actually use. A simple board updated daily beats a clever one nobody opens.

## A worked example

Hawa is launching her shea butter soap shop in Bolgatanga. She sets up a board with her cousin Amina and her friend Napari:

**To do**
* Print 200 labels (Amina, due 12 May)
* Post opening day flyer on WhatsApp status (Napari, due 18 May)

**Doing**
* Paint shop interior (Hawa, due 10 May)
* Make first batch of 300 soaps (Hawa and women's group, due 14 May)

**Done**
* Register business name
* Buy shelves

Each evening Hawa moves cards and adds new ones. When Amina's card for labels stays in To do for four days, Hawa notices and calls to ask what is holding it up. The printer needs payment first, so Hawa pays by MoMo and the card moves the next morning.

## Make it part of the routine

Look at the board at the start of each team meeting and walk through Doing first: what is stuck, and who can help? Board updates should take minutes, not hours. The point is to see problems early, not to produce a pretty display.`,
      practice_task_md: `**Goal:** Set up a working task board for a small project.

**Steps:**
1. Choose a free board app or a shared spreadsheet on your phone or computer.
2. Create three columns or statuses: To do, Doing, Done.
3. Add at least eight cards from your work breakdown, each with a verb, an owner and a due date.
4. Move at least two cards to Doing and one to Done.
5. Agree a work in progress limit for your imaginary team and write it at the top of the board.

**Done looks like:** A board with eight or more complete cards spread across three columns and a written work in progress limit. Take a screenshot for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What are the three columns of the simplest task board?",
            options: ["Plan, budget, report", "Morning, afternoon, evening", "To do, Doing, Done", "Donor, staff, community"],
            answer_index: 2,
            explanation: "The simplest board has To do, Doing and Done columns.",
          },
          {
            prompt: "Why do many teams limit the number of cards in Doing?",
            options: [
              "So that people finish tasks before starting new ones",
              "Because apps only allow three cards",
              "To hide work from managers",
              "Because donors require it",
            ],
            answer_index: 0,
            explanation: "Limiting work in progress helps tasks actually finish and moves the project faster.",
          },
          {
            prompt: "How does the lesson present Trello?",
            options: [
              "As the only tool that works",
              "As a tool you must pay for",
              "As a paper method",
              "As one example of a free task board app",
            ],
            answer_index: 3,
            explanation: "Trello is named only as an example; spreadsheets and paper also work.",
          },
          {
            prompt: "In Hawa's example, how did the board help?",
            options: [
              "It printed the labels automatically",
              "It showed the label card stuck in To do, so she called Amina and fixed the problem",
              "It sent money to the printer",
              "It replaced the need to talk to her team",
            ],
            answer_index: 1,
            explanation: "Seeing the stuck card prompted Hawa to find out why and solve it.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "meetings-and-minutes": {
      explanation_md: `Projects run on meetings: team check ins, partner meetings, community durbars, donor visits. Badly run meetings waste everyone's time and end with nobody sure what was decided. Assistants are very often the person asked to arrange meetings and take minutes, so doing it well is a quick way to stand out.

## Before the meeting

* **Purpose.** Know why the meeting is happening. If an update could be shared in a message, it may not need a meeting.
* **Agenda.** A short list of topics, with a rough time for each and who leads it. Share it a day or two ahead so people come prepared.
* **People.** Invite those who need to decide or contribute, not everyone.
* **Logistics.** Venue or call link, time, refreshments if needed, and any documents people should read.

## During the meeting

* Start on time, and end on time.
* Follow the agenda; park off topic points for later.
* For each topic, make sure the meeting ends with a **decision** or an **action**.
* An **action point** always has three parts: **what** will be done, **who** will do it, and **by when**.

## Minutes

**Minutes** are the written record of a meeting. They do not need to record every word. Good minutes are short and include:

* Meeting name, date, place and who attended.
* Key points discussed, in one or two lines each.
* Decisions made.
* Action points, each with a name and a date.
* Date of the next meeting.

Send them the same day, while memories are fresh. Start the next meeting by reviewing the previous action points.

## A worked example

Here are Mariama's minutes from a water project team meeting, shared on WhatsApp and email:

**Water project team meeting, Tuesday 14 May, NGO office, Tamale**
**Present:** Fuseini (chair), Mariama (minutes), Abdul-Rahman, Salifu (field officer)

**1. Drilling date.** Contractor confirmed rig arrives Thursday 16 May.
**2. Committee training.** A funeral in the community clashes with 21 May. **Decision:** move training to 28 May.
**3. Budget.** Spending on track. Fuel costs higher than planned; Abdul-Rahman to review.

**Action points**
* Salifu to inform the chief and assembly member of the new training date, by 16 May.
* Mariama to rebook the venue for 28 May and confirm in writing, by 17 May.
* Abdul-Rahman to share a fuel cost update, by 21 May.

**Next meeting:** Tuesday 21 May, 10:00.

## Community meetings

For community meetings, follow local protocol, use the language people are comfortable in, and record attendance on a signed sheet, which may also be evidence for the donor. Read the key decisions back at the end so everyone hears the same thing. If you take photos, ask permission first.

## The habit that makes you valuable

Following up on action points is where minutes become useful. A day before each deadline, send a short friendly reminder. Over time, people will notice that meetings you support actually lead to action.`,
      practice_task_md: `**Goal:** Write an agenda and minutes for a short meeting.

**Steps:**
1. Hold or join a short meeting: a family planning talk, a youth group meeting or a study group session. Ask the group's permission to take notes.
2. Before it starts, write a three item agenda on your phone or computer.
3. During the meeting, note decisions and action points with what, who and by when.
4. Afterwards, write minutes using the headings in the lesson and share them with the group the same day.

**Done looks like:** An agenda and one page of minutes with attendance, decisions, at least three complete action points and a next meeting date.`,
      quiz: {
        questions: [
          {
            prompt: "What three parts should every action point have?",
            options: [
              "What, who and by when",
              "Why, where and how much",
              "Title, photo and signature",
              "Agenda, venue and snacks",
            ],
            answer_index: 0,
            explanation: "An action point says what will be done, who will do it and by when.",
          },
          {
            prompt: "When does the lesson say minutes should be sent?",
            options: ["At the end of the month", "Only if someone asks", "Before the meeting", "The same day"],
            answer_index: 3,
            explanation: "Minutes should go out the same day while memories are fresh.",
          },
          {
            prompt: "Which of these do good minutes NOT need?",
            options: [
              "Decisions made",
              "Every word everyone said",
              "Who attended",
              "Action points with names and dates",
            ],
            answer_index: 1,
            explanation: "The lesson says minutes do not need to record every word; they should be short.",
          },
          {
            prompt: "What should you do at the end of a community meeting, according to the lesson?",
            options: [
              "Leave quickly without summarising",
              "Take photos without asking",
              "Read the key decisions back so everyone hears the same thing",
              "Collect money from participants",
            ],
            answer_index: 2,
            explanation: "Reading decisions back helps everyone share the same understanding.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "logistics-and-procurement": {
      explanation_md: `A training with no lunch, a field visit with no vehicle or a workshop where the projector never arrived can undo weeks of planning. Assistants and officers in Ghana spend a large part of their time on logistics and procurement, and adverts ask for it directly: procurement requests, vendors, travel and event arrangements.

## Logistics

**Logistics** means getting people, materials and equipment to the right place at the right time. For any activity, ask:

* **Venue:** booked, confirmed in writing, with enough seats, shade, toilets and power?
* **Transport:** vehicles booked, fuel approved, drivers informed, or transport refunds prepared?
* **Materials:** printed, packed and counted?
* **Food:** caterer confirmed with numbers and timing, including any dietary needs?
* **People:** facilitators, participants and partners reminded?
* **Documents:** attendance sheets, consent forms, receipts book?

A **checklist** for each type of activity saves you from forgetting the same thing twice. Keep it in your project spreadsheet and copy it for each event.

## Procurement

**Procurement** is the process of buying goods and services for the project. Organisations have rules to make sure money is spent fairly and honestly, and donors check that the rules were followed. While each organisation's policy differs, common steps are:

1. **Request.** Fill a purchase request saying what is needed, why, and which budget line it comes from.
2. **Quotes.** For many purchases, collect written quotes from several suppliers. Larger purchases may need a formal tender.
3. **Approval.** The right person approves the chosen supplier, usually on value for money, not just the lowest price.
4. **Purchase.** Issue a purchase order or contract.
5. **Receive.** Check that what arrived matches what was ordered, and sign a delivery note.
6. **Pay.** Finance pays against the invoice, ideally by bank transfer or mobile money so there is a record.
7. **File.** Keep request, quotes, approval, delivery note, invoice and receipt together.

## A worked example

Abdul-Rahman needs 30 sets of training handouts for the Damongo farmer training. He fills a purchase request against the "Handouts and stationery" budget line, gets written quotes from three printers in town, and records them in a comparison table with price, delivery time and quality notes. The second cheapest printer can deliver two days earlier, which matters for the schedule, so he recommends it and explains why. The coordinator approves. When the handouts arrive, he counts them, signs the delivery note and attaches the full set of documents to the payment request.

## Integrity

Procurement rules protect you as well as the project. Never split a purchase into smaller ones to avoid the quote rule, never accept gifts from suppliers, and declare it if a supplier is a relative or friend. If something feels wrong, ask your supervisor or finance. Clean records are what let auditors and donors trust the project, and they build your reputation as someone who can be trusted with money.`,
      practice_task_md: `**Goal:** Create an event checklist and a quote comparison.

**Steps:**
1. On your phone or computer, write a logistics checklist for a one day workshop using the six areas in the lesson. Add at least three checks under each area.
2. Pick one item to buy, such as printing or lunch for 25 people. Get three prices from local suppliers by phone or from recent receipts.
3. Make a comparison table: supplier, price, delivery time, quality notes.
4. Write two sentences recommending a supplier and explaining why.

**Done looks like:** A checklist with eighteen or more checks, a three supplier comparison and a short written recommendation.`,
      quiz: {
        questions: [
          {
            prompt: "What is procurement?",
            options: [
              "Writing the donor report",
              "The process of buying goods and services for the project",
              "Taking minutes at a meeting",
              "Drawing a Gantt chart",
            ],
            answer_index: 1,
            explanation: "Procurement is the process of buying goods and services following the organisation's rules.",
          },
          {
            prompt: "On what basis is a supplier usually approved?",
            options: [
              "Value for money, not just the lowest price",
              "Whoever is a friend of the coordinator",
              "Always the most expensive",
              "Whoever replies first",
            ],
            answer_index: 0,
            explanation: "The lesson says approval is usually on value for money, not only price.",
          },
          {
            prompt: "Why did Abdul-Rahman recommend the second cheapest printer?",
            options: [
              "It was owned by his cousin",
              "It gave him a gift",
              "It could deliver two days earlier, which mattered for the schedule",
              "It had the nicest shop",
            ],
            answer_index: 2,
            explanation: "Faster delivery made it better value for the schedule.",
          },
          {
            prompt: "Which of these breaks good procurement practice?",
            options: [
              "Collecting written quotes",
              "Signing a delivery note",
              "Declaring that a supplier is a relative",
              "Splitting a purchase into smaller ones to avoid the quote rule",
            ],
            answer_index: 3,
            explanation: "The lesson warns never to split purchases to get around the rules.",
          },
          {
            prompt: "Why does the lesson suggest keeping a checklist for each type of activity?",
            options: [
              "So you do not forget the same thing twice",
              "Because donors pay for checklists",
              "To avoid talking to suppliers",
              "To replace the budget",
            ],
            answer_index: 0,
            explanation: "A reusable checklist stops repeat mistakes.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "monitoring-and-reporting": {
      explanation_md: `Donors, managers, district officials and communities all want to know the same things: what has been done, what it cost, and what changed. Monitoring and reporting answer those questions. In Ghanaian NGO adverts, reporting, monitoring and evaluation, and financial tracking are among the most requested skills, from assistant level upwards.

## Monitoring and evaluation

**Monitoring** is the regular, ongoing checking of a project: are activities happening as planned, are outputs being delivered, is spending on track? It happens weekly or monthly, throughout the project.

**Evaluation** is a deeper look, usually at the middle or end, asking whether the project achieved its outcomes and why. It is often led by M&E staff or an outside evaluator.

Together they are called **M&E**. Some organisations add learning and call it MEL or MEAL (with accountability). As an assistant or officer, you will mostly do monitoring: collecting data, updating trackers and helping with reports.

## Where monitoring data comes from

* Attendance sheets from trainings and meetings.
* Activity reports from field staff.
* Receipts and payment records.
* Surveys and field forms, often filled on a phone with free data collection tools such as KoboToolbox or ODK, named here as examples.
* Observation and photos, taken with consent.
* Records kept by partners, such as a water committee log book or a school's meal register.

## What this section covers

* **Tracking progress and spending.** Comparing planned and actual dates, outputs and money in a spreadsheet, and flagging problems early.
* **Status and donor reports.** Writing clear updates, and following the logframe in donor reports.
* **Records and documentation.** Filing evidence so it can be found, and protecting people's personal data.

## A worked example

On the school feeding programme, the logframe has an output indicator: "number of hot meals served". Each school's head teacher records meals in a register. Every Friday, Wumpini collects a photo of each register page through WhatsApp and enters the numbers in the tracking sheet. At the end of each month, she compares meals served with the plan. In October, one school served far fewer meals than expected. She checks with the head teacher and learns the cook was ill for a week. She logs it as an issue, and coordinator Issahaku arranges a backup cook. At the end of the quarter, the donor report shows the numbers, explains the drop and describes the fix.

Notice the cycle: collect, compare, ask why, act, report. That cycle is monitoring.

## Honest reporting

Report what really happened, including problems. Donors understand that projects face challenges; what damages trust is discovering problems that were hidden. A report that says "this went wrong, here is why, and here is what we did" shows a team that is in control.`,
      practice_task_md: `**Goal:** Design a simple monitoring plan for one indicator.

**Steps:**
1. Choose one output from a project you know, such as "number of people trained" or "number of meals served".
2. On your phone or computer, write: where the data comes from, who collects it, how often, and where it is recorded.
3. Create a small table with columns for week, planned and actual, and fill four weeks of invented numbers, including one bad week.
4. Write three sentences explaining what you would do about the bad week, following the collect, compare, ask why, act, report cycle.

**Done looks like:** A one page monitoring plan, a four week table and a short action note.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main difference between monitoring and evaluation?",
            options: [
              "Monitoring is regular ongoing checking; evaluation is a deeper look, often in the middle or at the end",
              "Monitoring is about money; evaluation is about people",
              "They are the same thing",
              "Evaluation happens every day; monitoring once a year",
            ],
            answer_index: 0,
            explanation: "The lesson describes monitoring as ongoing and evaluation as a deeper periodic review.",
          },
          {
            prompt: "Which of these is a source of monitoring data mentioned in the lesson?",
            options: ["Rumours in the market", "Attendance sheets from trainings", "A newspaper horoscope", "The project logo"],
            answer_index: 1,
            explanation: "Attendance sheets are one of the listed data sources.",
          },
          {
            prompt: "What did Wumpini do when one school served far fewer meals?",
            options: [
              "Deleted the numbers",
              "Waited until the end of the year",
              "Asked the head teacher why, logged the issue, and a backup cook was arranged",
              "Reported a higher number to the donor",
            ],
            answer_index: 2,
            explanation: "She followed the cycle: compared, asked why, logged it and the team acted.",
          },
          {
            prompt: "According to the lesson, what damages a donor's trust most?",
            options: [
              "Reporting a challenge with an explanation",
              "Using a spreadsheet",
              "Sending reports on time",
              "Discovering problems that were hidden",
            ],
            answer_index: 3,
            explanation: "The lesson says hidden problems damage trust, while honest reporting builds it.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "tracking-progress-and-spending": {
      explanation_md: `Catching a problem in week three, when there is still time to fix it, is most of what good project management looks like. That is why adverts ask for budget tracking, monitoring progress and keeping records. The tool is usually a spreadsheet, and the skill is comparing **planned** with **actual**.

## Tracking progress

Add three columns to the tasks tab of your project spreadsheet:

* **Planned end date:** from your schedule.
* **Actual end date:** filled in when the task finishes.
* **Status:** not started, on track, late or done.

For outputs, keep a separate table with the indicator, the target, the actual figure so far, and the percentage achieved. For example: "Committee members trained, target 10, actual 8, 80 percent." The percentage formula is simply actual divided by target.

## Tracking spending

On the budget tab, add columns next to each approved line:

* **Budget:** the approved amount.
* **Spent to date:** the total of receipts and payments on that line so far.
* **Remaining:** budget minus spent, using a formula such as =B2-C2.
* **Percent spent:** spent divided by budget.

The difference between budget and actual is called the **variance**. A small variance is normal. A large one needs an explanation and often a decision.

## Flagging problems with colour

Conditional formatting in a spreadsheet changes a cell's colour automatically based on a rule. For example:

* Turn a task row red if the planned end date has passed and the status is not done.
* Turn a budget line orange if more than 90 percent is spent while the activity is not finished.

This turns a long table into something you can scan in seconds on any screen.

## A worked example

Halfway through the water project, Mariama's tracking sheet shows:

| Line | Budget (GHS) | Spent (GHS) | Remaining | % spent |
|---|---|---|---|---|
| Drilling contract | 40,000 | 40,000 | 0 | 100 |
| Committee training | 4,140 | 0 | 4,140 | 0 |
| Fuel and travel | 3,000 | 2,700 | 300 | 90 |
| Water testing | 1,500 | 0 | 1,500 | 0 |

All figures are invented for practice. The fuel line turns orange: 90 percent spent with several field trips still planned. Mariama checks the receipts and finds that two extra trips were needed when the drilling date moved. She tells coordinator Fuseini, who asks the finance officer whether money can be moved from another line within the donor's rules, and plans the remaining trips to share vehicles. The problem is solved months before it could have become an overspend.

## Field data

Many projects collect data in the field with forms on a phone, using free tools such as KoboToolbox or ODK, named here as examples. The forms export to a spreadsheet, so the same planned versus actual comparison works for survey data too.

## A rhythm that works

* **Daily or weekly:** update task status and enter receipts.
* **Monthly:** compare budget with actual spending, and output targets with results.
* **Every report:** use the same sheet as the source of your numbers.

If the tracking sheet is current, writing the report becomes much easier, because the facts are already in one place.`,
      practice_task_md: `**Goal:** Build a planned versus actual tracker with automatic warnings.

**Steps:**
1. Open the budget you made earlier, or create one with five lines, in a spreadsheet on your phone or computer.
2. Add columns: spent to date, remaining (with a formula) and percent spent (with a formula).
3. Enter invented spending figures, making one line close to its limit.
4. Add a conditional formatting rule that colours any line above 90 percent spent. In Google Sheets in a browser it is under Format, then Conditional formatting; menus differ in phone apps and other spreadsheet tools, so search the app's help for "conditional formatting" if you cannot find it.
5. Write two sentences explaining what you would do about the coloured line.

**Done looks like:** A tracker with working formulas, one automatically coloured warning and a short action note.`,
      quiz: {
        questions: [
          {
            prompt: "What is variance in budget tracking?",
            options: [
              "The difference between the budget and actual spending",
              "The name of the donor",
              "A type of chart",
              "The total project budget",
            ],
            answer_index: 0,
            explanation: "The lesson defines variance as the difference between budget and actual.",
          },
          {
            prompt: "How do you calculate the percentage of a target achieved?",
            options: ["Target minus actual", "Actual divided by target", "Actual plus target", "Target divided by budget"],
            answer_index: 1,
            explanation: "The lesson says the percentage achieved is actual divided by target.",
          },
          {
            prompt: "What does conditional formatting do?",
            options: [
              "Deletes old rows",
              "Sends the report to the donor",
              "Changes a cell's colour automatically based on a rule",
              "Locks the spreadsheet",
            ],
            answer_index: 2,
            explanation: "Conditional formatting colours cells automatically when a rule is met.",
          },
          {
            prompt: "Why did the fuel line in Mariama's tracker need attention?",
            options: [
              "It had not been used at all",
              "The donor cancelled it",
              "It was the largest line",
              "It was 90 percent spent with several field trips still planned",
            ],
            answer_index: 3,
            explanation: "Most of the fuel money was spent while trips remained, so it risked an overspend.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "status-and-donor-reports": {
      explanation_md: `Reports are how managers, donors and partners see your work. In NGO adverts in northern Ghana, report writing, narrative and financial reporting, and success stories come up again and again. A clear, honest report makes a project look well run; a confusing one raises questions even when the work was good.

## Two kinds of report

* **Status updates** are short and frequent, often weekly or monthly, for your manager or team. They answer: where are we, what is next, and what needs attention?
* **Donor reports** are longer and follow the donor's template, often quarterly and at the end of the project. They follow the logframe and include financial information.

## A one page status update

A simple structure works for almost any update:

1. **Overall status:** on track, at risk or off track, in one line.
2. **Done since last update:** three to five bullets.
3. **Next period:** the main planned tasks.
4. **Issues and risks:** what needs attention, and what you need from the reader.
5. **Spending:** a line or two on budget versus actual.

Write for a busy reader: put the most important point first, use short sentences, and give numbers rather than adjectives. "Eight of ten members trained" is better than "training went very well".

## Donor reports follow the logframe

A typical narrative donor report includes:

* **Summary** of the period.
* **Progress against the logframe:** activities done, outputs delivered with indicator figures, and early signs of outcomes.
* **Challenges** and how they were handled.
* **Lessons learned.**
* **Success story:** a short, true account of change for one person or group, with their consent.
* **Plans** for the next period.
* **Financial report:** spending by budget line, usually prepared with finance.

Every number should match the tracking sheet and the evidence on file.

## A worked example

Wumpini drafts the quarterly progress section for the school feeding programme:

"**Output 1: Daily hot meals served.** Target for the quarter: 52,000 meals. Achieved: 49,800 meals (96 percent). Meals were lower at one school in October when the cook was ill for a week; a backup cook has since been trained at each school."

All figures are invented. Notice: indicator, target, actual, percentage, an honest explanation of the gap, and the action taken.

Her success story is short: a head teacher in one school describes how pupils who used to leave at break to look for food now stay for afternoon lessons. Wumpini asked the head teacher's permission to use the quote and checked the wording with her.

## Concept notes and proposals

Officers are often asked to help draft **concept notes**, short documents of two or three pages that describe a problem, the proposed project, expected results and a rough budget, to interest a donor. A full **proposal** adds a detailed logframe, work plan and budget. Everything in this roadmap, from charters to logframes and budgets, feeds into these documents.

## Final checks

Before you send any report, check that numbers match, names are spelled correctly, photos have consent, and the reader knows exactly what you need from them.`,
      practice_task_md: `**Goal:** Write a one page status update.

**Steps:**
1. Choose a project you have worked on in this roadmap, or invent one.
2. On your phone or computer, write a status update using the five part structure in the lesson.
3. Include at least two numbers in the done section, one honest issue, and one clear request to the reader.
4. Add a three or four sentence success story about an imaginary participant, written in a respectful way.
5. Read it aloud and cut any sentence that does not help the reader.

**Done looks like:** A one page update with all five parts, numbers, an issue with a request, and a short success story. Add it to your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What is the first part of the one page status update structure?",
            options: ["Success story", "Overall status: on track, at risk or off track", "Financial report", "Lessons learned"],
            answer_index: 1,
            explanation: "The structure starts with a one line overall status.",
          },
          {
            prompt: "Which sentence follows the lesson's advice to use numbers rather than adjectives?",
            options: [
              "Training went very well",
              "Many people came",
              "Eight of ten members trained",
              "The workshop was excellent",
            ],
            answer_index: 2,
            explanation: "The lesson gives 'eight of ten members trained' as the better example.",
          },
          {
            prompt: "What structure does a narrative donor report usually follow for progress?",
            options: ["The logframe", "The staff list", "The order of receipts", "Alphabetical order"],
            answer_index: 0,
            explanation: "Progress is reported against the logframe's activities, outputs and outcomes.",
          },
          {
            prompt: "What did Wumpini do before using the head teacher's quote?",
            options: [
              "Changed it to sound better",
              "Used it without asking",
              "Paid for it",
              "Asked permission and checked the wording with her",
            ],
            answer_index: 3,
            explanation: "Success stories need consent, so she asked and checked the wording.",
          },
          {
            prompt: "What is a concept note?",
            options: [
              "A short document describing a problem, proposed project, expected results and rough budget",
              "The minutes of a team meeting",
              "A receipt for a purchase",
              "A daily task board",
            ],
            answer_index: 0,
            explanation: "The lesson describes a concept note as a short document to interest a donor.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "records-and-documentation": {
      explanation_md: `When an auditor, donor or manager asks, "Can you show me the evidence?", a well kept project can answer in minutes. A badly kept one cannot, and that can mean costs being refused or a project's reputation being damaged. Filing and documentation appear in assistant and officer adverts because they protect the organisation, and they protect you.

## What counts as evidence

Projects keep many kinds of records:

* **Attendance sheets,** signed by participants, for trainings and meetings.
* **Financial records:** purchase requests, quotes, approvals, invoices, receipts, payment confirmations and delivery notes.
* **Agreements:** contracts, memoranda of understanding, consent forms.
* **Reports and minutes.**
* **Photos and videos,** taken with permission.
* **Data:** survey forms, registers, tracking sheets.

## A simple folder system

Use the same structure for every project so anyone can find things. In Google Drive or any shared storage, a project folder might look like this:

* **01 Planning:** charter, logframe, work plan, budget.
* **02 Activities:** one subfolder per activity, named with the date first, for example "2026 05 28 Committee training", holding the attendance sheet, photos and activity report.
* **03 Finance:** one subfolder per month with requests, quotes, invoices and receipts.
* **04 Reports:** status and donor reports.
* **05 Agreements:** contracts and consent forms.
* **06 Closing:** handover documents and the final report.

Numbering the folders keeps them in order. Putting dates at the start of names, year first, makes files sort by date automatically.

## Paper to digital

Many records start on paper. Scan or photograph them soon after the activity, using a scanning feature in a free app such as the Google Drive app, and file the digital copy in the right folder. Keep the paper originals too, in labelled envelopes or box files, because many donors and auditors need to see originals.

## Protecting personal data

Project records often contain names, phone numbers, ages, health or financial details. In Ghana, the Data Protection Act, 2012 (Act 843) sets rules for how personal data is handled, and the Data Protection Commission oversees it. In practice this means:

* Collect only the personal data the project needs.
* Tell people why you collect it and get consent, especially for photos.
* Share files only with people who need them, and remove access when they leave.
* Do not post participants' details or photos in public WhatsApp groups or social media.
* Lock or protect devices that hold project data.

## A worked example

After the committee training, Mariama photographs the signed attendance sheet with the Google Drive app, saves it as "2026 05 28 Committee training attendance" in the right activity folder, and adds the photos taken with consent. She puts the paper original in the training envelope. Six months later the donor's auditor asks for proof of the training. Fuseini shares the folder link in two minutes.

Good records are not extra work added at the end. They are a habit built into every activity.`,
      practice_task_md: `**Goal:** Set up a project folder system.

**Steps:**
1. In Google Drive or another free storage service on your phone or computer, create a folder for a practice project.
2. Create the six numbered subfolders from the lesson.
3. Create one activity subfolder with a date first name, and add at least three files to it: a scanned or photographed document, a short report and a photo you have permission to use.
4. Write a one paragraph note on how you would protect personal data in this project, and save it in the Planning folder.

**Done looks like:** A tidy folder structure with six numbered folders, one dated activity folder with three files, and a data protection note.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest numbering folders, such as 01 Planning and 02 Activities?",
            options: [
              "To keep them in a consistent order",
              "Because Google Drive requires it",
              "To hide them from auditors",
              "To make them load faster",
            ],
            answer_index: 0,
            explanation: "Numbering keeps folders in the same order for every project.",
          },
          {
            prompt: "Why should file names start with the date, year first?",
            options: [
              "Donors only read dates",
              "So files sort by date automatically",
              "It makes files smaller",
              "It is required by law",
            ],
            answer_index: 1,
            explanation: "Putting the date first, year first, sorts files by date automatically.",
          },
          {
            prompt: "Which law sets rules for handling personal data in Ghana?",
            options: [
              "The Road Traffic Act",
              "The Labour Act",
              "The Data Protection Act, 2012 (Act 843)",
              "The Companies Act",
            ],
            answer_index: 2,
            explanation: "The lesson names the Data Protection Act, 2012 (Act 843), overseen by the Data Protection Commission.",
          },
          {
            prompt: "Which action goes against the data protection practices in the lesson?",
            options: [
              "Collecting only the data the project needs",
              "Getting consent for photos",
              "Removing file access when someone leaves",
              "Posting participants' phone numbers in a public WhatsApp group",
            ],
            answer_index: 3,
            explanation: "The lesson says not to post participants' details in public groups or social media.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "closing-and-other-ways": {
      explanation_md: `Many projects end in a rush: the money is spent, staff move on, and nobody quite finishes the paperwork or tells the community what happens next. Months later, a donor asks for a final report or an auditor asks for receipts, and nobody can find them. Finishing well is a skill, and employers value people who see work through to the very end.

## Why closing matters

Closing a project properly:

* **Hands over** the results to the people who will keep them going, such as a water committee or a school's parent teacher association.
* **Settles accounts,** so every cedi is explained and suppliers are paid.
* **Archives records,** so evidence can be found for audits years later.
* **Captures lessons,** so the next project does better.
* **Thanks people,** which keeps relationships strong for future work.

## Other ways of working

Most NGO and donor projects plan the whole project at the start and then follow that plan, adjusting through monitoring. This is sometimes called a **plan driven** or **waterfall** approach. It suits work where the goal is clear and changes are costly, like drilling a borehole or building a classroom.

Some teams, especially in software and some businesses, use **agile** approaches instead. They plan in short cycles, deliver something small, get feedback and adjust. This suits work where the right answer is not clear at the start, such as designing a mobile app for farmers. Many real projects mix the two: a fixed overall plan and budget, with short cycles inside.

## What this section covers

* **Closing a project and lessons learned.** Handover, final accounts, archiving, and running a short lessons learned session.
* **Agile and Scrum basics (optional).** The main ideas and words, so you can follow along if you join a team that uses them.

## A worked example

At the end of the school feeding year, coordinator Issahaku makes a closing checklist with Wumpini:

* Hand over kitchen equipment to each school's parent teacher association, with a signed list of items.
* Pay final cooks' allowances and supplier invoices.
* Prepare the final financial report with the finance officer.
* Write the final narrative report against the logframe.
* Archive all folders and label the paper files.
* Hold a lessons learned session with head teachers, cooks and staff.
* Send thank you letters to the district education office and partners.

Because they worked through it together, nothing is left hanging. When the donor considers funding a second year, the team's tidy close is part of the reason it says yes.

## The mindset

Think of closing as the last activity in your work plan, with its own tasks, owners and dates, not something that happens on its own. Put it in the schedule from the start, and the end of the project becomes calm instead of chaotic.`,
      practice_task_md: `**Goal:** Draft a closing checklist and compare two ways of working.

**Steps:**
1. Pick a project you have used in this roadmap.
2. On your phone or computer, write a closing checklist with at least seven items, each with an owner and a date.
3. Then write two short paragraphs: one describing a project that suits a plan driven approach, and one that suits an agile approach, with a reason for each.

**Done looks like:** A seven item closing checklist with owners and dates, plus two paragraphs comparing approaches.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is part of closing a project well?",
            options: [
              "Leaving receipts with whoever has them",
              "Handing over results to the people who will keep them going",
              "Starting a new project without finishing reports",
              "Deleting the project folders",
            ],
            answer_index: 1,
            explanation: "Handover is one of the main closing activities in the lesson.",
          },
          {
            prompt: "What kind of work suits a plan driven, or waterfall, approach?",
            options: [
              "Work where the goal is clear and changes are costly, like drilling a borehole",
              "Work where nobody knows what the result should be",
              "Only software projects",
              "Work with no budget",
            ],
            answer_index: 0,
            explanation: "The lesson says plan driven work suits clear goals where changes cost a lot.",
          },
          {
            prompt: "How do agile teams work, according to the lesson?",
            options: [
              "They never plan anything",
              "They plan everything once and never change",
              "They plan in short cycles, deliver something small, get feedback and adjust",
              "They only work at night",
            ],
            answer_index: 2,
            explanation: "Agile teams use short cycles with feedback and adjustment.",
          },
          {
            prompt: "How does the lesson suggest you treat closing?",
            options: [
              "As something that happens on its own",
              "As the donor's job only",
              "As optional if the money is spent",
              "As the last activity in the work plan, with tasks, owners and dates",
            ],
            answer_index: 3,
            explanation: "The lesson says to put closing in the schedule like any other activity.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "closing-and-lessons-learned": {
      explanation_md: `Adverts for project assistants and officers mention documenting lessons learned, and donors often ask for them in final reports. The reason is simple: organisations that learn from each project avoid paying for the same mistake twice. Knowing how to close a project and run a lessons learned session makes you useful at the moment many teams struggle.

## Closing step by step

1. **Confirm the work is complete.** Check each deliverable against the charter and logframe. Get written acceptance from whoever receives it, such as a signed handover form from the water committee.
2. **Hand over.** Give the people who will maintain the results what they need: training, spare parts, contact numbers for repairs, records. For the water project, that includes the committee's log book, a list of trained pump repairers and the contractor's warranty.
3. **Close the finances.** Pay outstanding invoices, collect missing receipts, return any unused advances, and help finance prepare the final financial report.
4. **Close contracts.** Confirm suppliers and consultants have delivered and been paid, and that nothing is still open.
5. **Write the final report.** Results against the logframe, challenges, lessons and recommendations.
6. **Archive.** Make sure digital folders are complete and paper files are labelled and stored where the organisation keeps them.
7. **Thank and inform.** Tell the community, partners and district what happens next, and thank them for their work.

## Lessons learned sessions

A **lessons learned session**, sometimes called a retrospective or after action review, is a short, honest discussion with the people involved. Four simple questions work well:

* What did we plan to happen?
* What actually happened?
* Why was there a difference?
* What will we do the same or differently next time?

Invite a mix of people: staff, partners and, where possible, community members. Create a safe atmosphere: the aim is learning, not blaming. Write each lesson as a clear recommendation someone can act on.

## A worked example

Fuseini runs a one hour session at the end of the water project with Mariama, Abdul-Rahman, field officer Salifu and two water committee members, Rahinatu and Alhassan. Mariama takes notes. Some lessons:

* **Went well:** Meeting the women's group before choosing the site avoided a flood prone spot. **Next time:** always hold a separate meeting with women water users before siting.
* **Went badly:** Drilling slipped two weeks when the rains came early, which pushed up fuel costs. **Next time:** schedule drilling at least a month before the usual start of the rains, and keep a fuel contingency.
* **Went badly:** The committee did not know how to reach a pump repairer. **Next time:** include a repairer's contact list and a short repair fund plan in the handover.

Mariama types the lessons into a one page document, saves it in the Closing folder, and shares it with the coordinator of the organisation's next water project.

## Make lessons travel

Lessons only help if the next team reads them. Keep a shared lessons file for the organisation, tag lessons by topic, and read the relevant ones at the start of every new project.`,
      practice_task_md: `**Goal:** Run a short lessons learned session.

**Steps:**
1. Choose a recent activity you took part in: a school event, a church programme, a family gathering or a group assignment.
2. Ask two or three people who were involved to spend fifteen minutes with you, in person or on a call.
3. Ask the four questions from the lesson and take notes on your phone or computer.
4. Write at least three lessons as "Went well or went badly" plus "Next time" recommendations.

**Done looks like:** A one page lessons learned note with the names of who took part, the date and at least three clear "Next time" recommendations.`,
      quiz: {
        questions: [
          {
            prompt: "What should you get from whoever receives the project's results?",
            options: ["A gift", "Written acceptance, such as a signed handover form", "A new budget", "A job offer"],
            answer_index: 1,
            explanation: "The first closing step is confirming completion with written acceptance.",
          },
          {
            prompt: "Which question is one of the four lessons learned questions?",
            options: [
              "Who should we blame?",
              "How much were the staff paid?",
              "Why was there a difference between what we planned and what happened?",
              "Which donor is the richest?",
            ],
            answer_index: 2,
            explanation: "The lesson's questions include why there was a difference between plan and reality.",
          },
          {
            prompt: "What atmosphere should a lessons learned session have?",
            options: [
              "A safe one focused on learning, not blaming",
              "A formal hearing to punish mistakes",
              "A secret meeting for managers only",
              "A celebration with no discussion of problems",
            ],
            answer_index: 0,
            explanation: "The aim is learning, not blaming.",
          },
          {
            prompt: "What did the team learn about pump repairs?",
            options: [
              "Pumps never break",
              "The donor should fix all pumps",
              "Repairs should be done by the chief",
              "Include a repairer's contact list and a repair fund plan in the handover",
            ],
            answer_index: 3,
            explanation: "The committee did not know how to reach a repairer, so the handover should include this next time.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "agile-basics": {
      explanation_md: `This topic is optional. Most NGO project roles in northern Ghana use plan driven methods, but if you work with a tech company, a software team or a hub, you will hear words like sprint, backlog and standup. Knowing what they mean helps you join in from day one, and the habits behind them are useful on any project.

## The agile idea

**Agile** is a family of ways of working built on a few beliefs: deliver something useful early, get feedback often, and change the plan as you learn. Instead of planning everything for a year, an agile team plans a short cycle in detail, does the work, shows the result to the people who will use it, and decides what to do next.

This works well when the right answer is not clear at the start. Building a farmer advice app is a good example: you cannot know which features farmers will actually use until they try an early version.

## Scrum in plain words

**Scrum** is one popular agile framework, described in a free document called the Scrum Guide. Its main parts are:

**Three accountabilities**
* **Product Owner:** decides what is most valuable to work on next and keeps the list of work in order.
* **Scrum Master:** helps the team work well and removes obstacles.
* **Developers:** the people who do the work. In Scrum this means anyone building the product, not only programmers.

**Events**
* **Sprint:** a fixed cycle of one month or less, often two weeks.
* **Sprint Planning:** at the start, the team chooses what to deliver in this sprint.
* **Daily Scrum:** a short daily check in, kept to fifteen minutes, on progress towards the sprint's goal.
* **Sprint Review:** at the end, the team shows what was built and gets feedback.
* **Sprint Retrospective:** the team discusses how to work better next time.

**Artifacts**
* **Product Backlog:** the ordered list of everything that might be built.
* **Sprint Backlog:** the items chosen for this sprint, plus the plan to deliver them.
* **Increment:** the usable piece of work produced.

## Kanban

You met **Kanban** in the task boards lesson: a visual board with columns and a limit on work in progress. Some agile teams use Kanban instead of sprints, pulling new work whenever they finish something.

## A worked example

Nashiru joins a small tech hub in Tamale building a market price app for farmers. The team works in two week sprints. In Sprint Planning, the Product Owner, Ayishetu, picks the three most important items from the backlog: show maize prices for three markets, let users pick their market, and send a weekly SMS summary. Each morning, the team holds a quick Daily Scrum. At the Sprint Review, they show the app to five farmers, who say the SMS is the most useful part and the app screens are too busy. That feedback goes straight into the backlog for the next sprint. At the Retrospective, the team agrees to test with farmers earlier in the sprint next time.

## Borrowing agile habits

Even on a plan driven NGO project, you can borrow agile habits: short regular check ins, showing early drafts to users, and a retrospective at the end of each phase.`,
      practice_task_md: `**Goal:** Plan a two week sprint for a small project.

**Steps:**
1. Imagine a small product, such as a WhatsApp ordering service for Hawa's shop or a simple website for your youth group.
2. On your phone or computer, write a product backlog of at least eight items, ordered from most to least valuable.
3. Choose the items you think can be finished in a two week sprint and write a one sentence sprint goal.
4. Write three questions you would ask users at the Sprint Review.

**Done looks like:** An ordered backlog of eight or more items, a sprint backlog with a goal, and three review questions.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main idea behind agile ways of working?",
            options: [
              "Plan everything in detail for a year and never change",
              "Deliver something useful early, get feedback often and change the plan as you learn",
              "Avoid talking to users until the end",
              "Work without any plan at all",
            ],
            answer_index: 1,
            explanation: "The lesson describes agile as delivering early, getting feedback and adapting.",
          },
          {
            prompt: "In Scrum, who decides what is most valuable to work on next?",
            options: ["The Scrum Master", "The donor", "The Product Owner", "The newest team member"],
            answer_index: 2,
            explanation: "The Product Owner orders the work by value.",
          },
          {
            prompt: "How long is a sprint, according to the lesson?",
            options: [
              "A fixed cycle of one month or less, often two weeks",
              "Exactly one day",
              "One full year",
              "As long as the team likes, with no limit",
            ],
            answer_index: 0,
            explanation: "A sprint is a fixed cycle of one month or less.",
          },
          {
            prompt: "What happens at the Sprint Review?",
            options: [
              "The team chooses what to build",
              "Developers are paid",
              "The budget is approved",
              "The team shows what was built and gets feedback",
            ],
            answer_index: 3,
            explanation: "The review is where the work is shown and feedback is gathered.",
          },
          {
            prompt: "What did Nashiru's team learn at the Sprint Review?",
            options: [
              "Farmers found the SMS most useful and the app screens too busy",
              "Farmers did not want any market prices",
              "The app was perfect and needed no changes",
              "The team should stop holding Daily Scrums",
            ],
            answer_index: 0,
            explanation: "The farmers' feedback about the SMS and busy screens went into the next backlog.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "getting-hired-pm": {
      explanation_md: `You now know how projects start, how they are planned, run, monitored and closed. The last step is turning that knowledge into a first job. This section is about showing employers you can do the work, and choosing whether a certificate is worth your time and money.

## How people usually start

Very few people are hired straight into a project manager role. Common first steps in Ghana include:

* **National service** postings with NGOs, district assemblies or businesses.
* **Internships,** paid or unpaid, often with NGOs and development organisations in Tamale, Bolgatanga and Wa.
* **Project assistant, programme assistant or office support roles,** which handle the administration you have learned about.
* **Field roles,** such as enumerator, field facilitator or community mobiliser on a specific project, which teach you how projects work on the ground.
* **Volunteering** with community groups, churches, mosques, youth associations or student societies, where you can lead real projects.

From these, people grow into officer, coordinator and then manager roles as they build experience.

## What employers look for

Across assistant and officer adverts, the same things appear again and again:

* Organisation and reliability.
* Clear writing, especially reports.
* Spreadsheet and office software skills.
* Experience working with communities and partners.
* Budget and record keeping.
* Local languages such as Dagbani, Gurune, Dagaare or Mampruli, which are often listed as an advantage in the north.
* For many officer roles, a degree or diploma and some years of experience.

You can show most of these with a portfolio, even before your first job.

## What this section covers

* **Entry certifications explained.** What the recognised options are, what they involve, and how to decide whether you need one.
* **Your portfolio and first coordination roles.** How to run a small real project, keep its documents as proof, and apply for first roles.

## A worked example

Azara finished a diploma in Bolgatanga and wanted to work in development. She had no project job, so she volunteered to coordinate her youth association's tree planting day. She wrote a charter, a budget, a task board and a short report with photos taken with consent, using the tools in this roadmap. When she applied for an internship with an NGO, she attached a link to a folder with those four documents. The interviewer asked her to talk through her budget, and she could explain every line. She got the internship, and a year later was hired as a project assistant.

## A realistic mindset

Jobs in this field are competitive and applications often have strict deadlines. Expect to apply many times and to keep improving. Every small project you run adds to your experience, and every application teaches you something. Stay patient, keep building proof, and ask people already in the field for advice.`,
      practice_task_md: `**Goal:** Map your route into project work.

**Steps:**
1. On your phone or computer, list the five common first steps from the lesson.
2. For each one, write whether it is open to you now and one organisation or group in your area where you could try it.
3. Check yourself against the "what employers look for" list and mark each item as strong, developing or missing.
4. Choose one missing item and write a plan to improve it in the next month.

**Done looks like:** A route map with five entry options and named organisations, a self check of seven items, and a one month plan for one gap.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a common first step into project work in Ghana, according to the lesson?",
            options: [
              "Being hired straight in as country director",
              "National service with an NGO or district assembly",
              "Buying a project management company",
              "Waiting for a manager to call you",
            ],
            answer_index: 1,
            explanation: "National service is listed as a common first step.",
          },
          {
            prompt: "Which skill does the lesson list as often an advantage for roles in the north?",
            options: ["Speaking local languages such as Dagbani or Gurune", "Playing football", "Owning a car", "Having a large social media following"],
            answer_index: 0,
            explanation: "Local languages are often listed as an advantage in northern adverts.",
          },
          {
            prompt: "How did Azara show her skills without a project job?",
            options: [
              "She paid for a certificate only",
              "She copied someone else's documents",
              "She ran a small real project and shared its charter, budget, task board and report",
              "She waited until she was offered a job",
            ],
            answer_index: 2,
            explanation: "Azara coordinated a tree planting day and used its documents as proof.",
          },
          {
            prompt: "What mindset does the lesson recommend for job hunting?",
            options: [
              "Apply once and stop if you are not selected",
              "Only apply for manager roles",
              "Avoid asking people in the field for advice",
              "Expect to apply many times, keep improving and keep building proof",
            ],
            answer_index: 3,
            explanation: "The lesson recommends patience, repeated applications and building proof.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "entry-certifications": {
      explanation_md: `Certificates can help you learn in a structured way and show commitment on your CV. They can also cost money and time you might spend better elsewhere. The project assistant adverts studied for this roadmap did not ask for a project management certificate; they asked for skills, experience and often a degree or diploma. So treat a certificate as a possible extra, not a requirement, and decide carefully.

## The recognised entry options

These are named as examples, not recommendations. Rules, prices and formats change, so always check the official page before you decide.

* **Project DPro.** A guide to project management written for the development sector, published by the organisation PM4NGOs. The guide itself can be downloaded at no cost under a Creative Commons licence, and a certification exam based on the guide is available in several languages; see the PM4NGOs site for how it works. Because it is written for NGO and development work, its topics match much of this roadmap.
* **CAPM (Certified Associate in Project Management).** An entry level certification from the Project Management Institute (PMI), a large international professional body. It has eligibility rules, an exam and a fee. Check PMI's official website for the current requirements.
* **Google Project Management Certificate.** An online programme from Google offered on Coursera. Its page describes it as beginner level, needing no degree or experience, and says completing it counts as project management education towards PMI credentials such as CAPM. Check the Coursera page for current pricing and whether any financial aid is offered.
* **PRINCE2 Foundation.** An entry level exam in the PRINCE2 method, which is widely used in the United Kingdom and some other countries. Exams are offered through PeopleCert. Check its official site for details.

## How to decide

Ask yourself these questions:

1. **What do the adverts I want actually ask for?** Read ten adverts for roles you would apply for. If none mention a certificate, your money may be better spent on data and transport for volunteering.
2. **Can I learn the content for free?** Free guides, like the Project DPro guide, and this roadmap teach the main ideas without cost. You can learn first and decide about an exam later.
3. **Can I afford it without hardship?** Never borrow or cut essential spending for a certificate.
4. **Is the certificate recognised by the employers I want?** Development organisations, businesses and tech companies may value different ones.
5. **Is it genuine?** Only use the official provider's website. Be wary of anyone selling guaranteed passes or certificates without an exam.

## A worked example

Kassim, a recent graduate, wants an NGO project officer role in Tamale. He reads the Project DPro guide for free, uses this roadmap to build a portfolio, and volunteers on a community project. After a year as a project assistant, he decides an exam would help him move up, and his employer agrees to support part of the cost. Kassim learned first, built experience, and took an exam only when it clearly helped his next step.

## The bottom line

A certificate does not replace experience, and experience can be built without one. Learn the skills, show them in a portfolio, and add a certificate when it serves a clear goal.`,
      practice_task_md: `**Goal:** Decide whether a certificate fits your plans right now.

**Steps:**
1. Find five to ten current adverts for project assistant, programme assistant or project officer roles on Ghanaian job boards or NGO career pages.
2. In a notes app or spreadsheet on your phone or computer, record for each: the role, the employer type, and whether it mentions any certificate.
3. Visit the official pages of two certification options from the lesson and note the current requirements and costs you find, with the date you checked.
4. Answer the five decision questions from the lesson in writing.

**Done looks like:** A small table of adverts, notes on two official pages with dates, and a written decision: certificate now, later, or not needed yet, with your reasons.`,
      quiz: {
        questions: [
          {
            prompt: "What did the project assistant adverts studied for this roadmap ask for?",
            options: [
              "Always a CAPM certificate",
              "Skills, experience and often a degree or diploma, not a certificate",
              "Only a PRINCE2 certificate",
              "No qualifications of any kind",
            ],
            answer_index: 1,
            explanation: "The lesson says these adverts did not ask for a project management certificate.",
          },
          {
            prompt: "Which option is written specifically for the development sector?",
            options: ["PRINCE2 Foundation", "Project DPro", "A typing certificate", "A driving licence"],
            answer_index: 1,
            explanation: "Project DPro is a guide written for development sector project management.",
          },
          {
            prompt: "Who offers the CAPM certification?",
            options: ["Google", "PM4NGOs", "The Project Management Institute (PMI)", "The Data Protection Commission"],
            answer_index: 2,
            explanation: "CAPM is an entry level certification from PMI.",
          },
          {
            prompt: "Where should you check current rules and costs for any certificate?",
            options: [
              "On the official provider's website",
              "From someone selling guaranteed passes",
              "In an old WhatsApp forward",
              "Nowhere; they never change",
            ],
            answer_index: 0,
            explanation: "The lesson says to always check the official page because rules and prices change.",
          },
          {
            prompt: "What did Kassim do before taking an exam?",
            options: [
              "Borrowed money to pay for three exams at once",
              "Bought a certificate online without an exam",
              "Skipped all work experience",
              "Learned from free materials, built a portfolio and gained experience first",
            ],
            answer_index: 3,
            explanation: "He learned first, built experience, and took an exam only when it clearly helped.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "first-coordination-roles": {
      explanation_md: `Employers hiring for project roles want proof you can plan, organise, track money and report. A portfolio of real project documents gives that proof, even if you have never held a project job. Combined with a clear CV and good interview answers, it can set you apart from applicants who only list qualifications.

## Run a small real project

Pick something small enough to finish in four to eight weeks, but real:

* A reading club for pupils during the long vacation.
* A clean up day in your area, agreed with the assembly member.
* A fundraiser for a church, mosque or school need.
* A savings group launch for your youth association.
* Helping a local shop or trader plan a product launch.

Use the tools from this roadmap as you go. Do not wait until the end to write things up.

## What goes in your portfolio

Keep one shared folder with:

1. **Charter:** goal, scope, budget, dates and people.
2. **Plan:** work breakdown and a simple Gantt chart.
3. **Budget and tracker:** planned versus actual, with receipts summarised.
4. **Risk register:** with at least one risk you managed.
5. **Task board screenshot** or status sheet.
6. **Minutes** from one meeting.
7. **Final report:** results, a short success story with consent, and lessons learned.

Remove other people's personal details before you share it. A short cover note explaining the project in three sentences helps busy readers.

## Where to look for roles

* Ghanaian job boards and their NGO and project categories.
* Career pages of NGOs and development organisations working in the north.
* District assemblies and national service placements.
* Notice boards at hubs, universities and NGO offices in Tamale, Bolgatanga and Wa.
* People: tell mentors, lecturers and people in the field what you are looking for.

Read each advert carefully, note the deadline and exactly what documents it asks for, and tailor your CV to its duties. Never pay anyone to get you a job; genuine employers do not charge applicants.

## Preparing for interviews

Project interviews often ask you to describe a time you organised something, handled a problem or worked with a difficult person. A simple way to answer is: the **situation**, the **task** you had, the **action** you took, and the **result**. Use your portfolio project for examples.

## A worked example

Zakaria ran a two month reading club for 25 pupils in his community in Savelugu with two friends. His folder held a charter, a budget of GHS 800 from local donations, a task board, attendance records with parents' permission, and a two page report. All figures here are invented. When he applied for a project assistant role, the interviewer asked about a problem he faced. He explained that attendance dropped in week three because of the farming season, so they moved sessions to late afternoons and attendance recovered. The answer showed monitoring, problem solving and reporting in one story.

## Keep growing

Once you are in, ask to help with tasks just above your level: drafting a section of a report, updating the budget tracker, or supporting a community meeting. That is how assistants become officers and officers become coordinators.`,
      practice_task_md: `**Goal:** Plan your portfolio project and prepare one interview answer.

**Steps:**
1. Choose a small real project you can run in four to eight weeks, and write a one page charter for it on your phone or computer.
2. Create a portfolio folder in Google Drive or another free storage service with a subfolder for each of the seven documents in the lesson.
3. Find two current project assistant or internship adverts and list the duties each asks for.
4. Write one interview answer using situation, task, action and result, based on any activity you have organised.

**Done looks like:** A charter, an empty but organised portfolio folder ready to fill, notes on two adverts, and one practised interview answer you could say in two minutes.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson recommend running a small real project?",
            options: [
              "To show employers proof that you can plan, organise, track money and report",
              "Because employers only hire event planners",
              "To avoid applying for jobs",
              "Because certificates are banned",
            ],
            answer_index: 0,
            explanation: "A real project produces documents that prove your skills.",
          },
          {
            prompt: "What should you do before sharing your portfolio?",
            options: [
              "Add as many photos of participants as possible",
              "Remove other people's personal details",
              "Delete the budget",
              "Make it private so no one can see it",
            ],
            answer_index: 1,
            explanation: "The lesson says to remove other people's personal details before sharing.",
          },
          {
            prompt: "What does the lesson say about paying someone to get you a job?",
            options: [
              "It is normal for NGO roles",
              "It is the fastest route",
              "Never do it; genuine employers do not charge applicants",
              "Only pay if they promise a contract",
            ],
            answer_index: 2,
            explanation: "Genuine employers do not charge applicants.",
          },
          {
            prompt: "What four parts make up the suggested interview answer structure?",
            options: [
              "Name, age, school, hometown",
              "Plan, budget, risk, report",
              "Question, guess, apology, thanks",
              "Situation, task, action, result",
            ],
            answer_index: 3,
            explanation: "The lesson recommends situation, task, action and result.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
