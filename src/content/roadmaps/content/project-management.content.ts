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
    // NEXT_NODES
  },
};

export default content;
