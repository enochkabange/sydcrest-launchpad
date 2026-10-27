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
    // NEXT_NODES
  },
};

export default content;
