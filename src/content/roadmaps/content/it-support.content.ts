import type { TrackContent } from "./types";

/**
 * Lesson content for the IT Support and Networking track. Original SydCrest
 * writing; sources and the coverage table are in src/content/research/it-support.md.
 * Every person, office and device in these lessons is invented for teaching.
 * Example addresses and passwords are made up and deliberately simple.
 */
const content: TrackContent = {
  roadmap: "it-support",
  nodes: {
    "it-support-job": {
      explanation_md: `## Why this matters

Every bank branch, school, hospital, NGO office, telco shop and growing business in Ghana now depends on computers, phones, printers and an internet connection. When any of them stops working, people cannot serve customers, pay staff or send reports. The person they call is IT support. Job adverts in Ghana use many titles for this work: IT support officer, help desk analyst, desktop support technician, ICT officer, IT assistant. Underneath the titles, the job is the same: keep things working and help people when they do not.

## What the work looks like

A normal day mixes planned work and surprises. Planned work includes setting up a laptop for a new staff member, installing updates, checking that backups ran, replacing printer toner and keeping a list of every device the office owns. Surprises are the calls: "my email is not opening", "the printer is jamming", "the internet is off", "I forgot my password". You will also train staff, write short guides and talk to suppliers about repairs under warranty.

## The three skills this section builds

* **Knowing the roles.** Support is organised in levels. First line staff take every request and fix the common ones. Harder problems are passed (escalated) to second line staff with deeper skills. Knowing where you sit tells you what to fix and what to hand over.
* **A troubleshooting method.** Good technicians do not guess. They ask questions, form a theory, test it and write down what worked. This method works on a laptop, a router or a phone.
* **Customer care and tickets.** Most users calling IT are stressed. Being calm, clear and polite matters as much as technical skill. Recording each request as a ticket means nothing is forgotten and the team can see what is happening.

## A small example

Hawa works as the IT assistant at a senior high school in Bolgatanga. On Monday morning a teacher says the staff room computer "is not working". Hawa does not start opening the case. She asks what exactly happens. The teacher says the screen stays black. Hawa checks the simplest things first and finds the monitor cable has come loose after cleaners moved the desk. She pushes it in, the screen comes on, and she writes one line in her log: date, problem, cause, fix. Two minutes of calm questions saved an hour of guessing.

## What you need

You can learn most of this track on a phone. Some practice, such as opening a computer or trying Linux, needs a real computer. When you reach those lessons, look for one you can use at a school lab, a library, a community centre, a church office or a relative's shop, and always ask the owner first.`,
      practice_task_md: `**Goal:** start your IT support learning log and see the job through someone else's eyes.

1. Create a note on your phone or in a notebook called "Fix log". Make columns: date, device, problem, cause, fix, time taken.
2. Talk to someone who looks after computers anywhere near you: a school ICT teacher, a church secretary, a shop owner, a cyber cafe attendant. Ask them the three most common problems they deal with and how they fix them.
3. Write those three problems into your log as your first entries, marking them "heard from someone".
4. Over the next week, write down any tech problem you see around you (a phone that will not charge, Wi-Fi that drops) even if you cannot fix it yet.

**Done looks like:** a fix log with at least five entries and a short note on what surprised you about the job. Keep it: this log grows into your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which description best matches the core of an IT support job?",
            options: [
              "Writing new software products for customers",
              "Keeping computers, phones, printers and networks working and helping people when they do not",
              "Designing the company's logo and website",
              "Selling computers in a shop",
            ],
            answer_index: 1,
            explanation: "Whatever the job title, IT support is about keeping technology working and helping users.",
          },
          {
            prompt: "What does it mean to escalate a support request?",
            options: [
              "Close it without fixing it",
              "Ask the user to call back tomorrow",
              "Pass it to staff with deeper skills when it is beyond first line",
              "Charge the user extra money",
            ],
            answer_index: 2,
            explanation: "First line staff fix common problems and escalate harder ones to second line staff.",
          },
          {
            prompt: "In the Bolgatanga example, what did Hawa do first when the teacher said the computer was not working?",
            options: [
              "Opened the computer case",
              "Reinstalled Windows",
              "Ordered a new monitor",
              "Asked exactly what was happening",
            ],
            answer_index: 3,
            explanation: "She asked questions first, learned the screen was black, and then checked the simplest cause.",
          },
          {
            prompt: "Why do IT teams record each request as a ticket?",
            options: [
              "So nothing is forgotten and the team can see what is happening",
              "Because users enjoy filling in forms",
              "To make the work take longer",
              "Because tickets fix the problem automatically",
            ],
            answer_index: 0,
            explanation: "Tickets keep a record so requests are not lost and progress is visible.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "it-support-roles": {
      explanation_md: `## Why this matters

When you read IT job adverts in Ghana, the titles can be confusing. A bank wants an "ICT officer", a telco wants an "office IT support analyst", a school wants a "lab technician", a manufacturer wants a "NOC and IT support engineer". If you understand what these roles share and how they differ, you can apply with confidence and describe your skills in the employer's language.

## Support levels

Most organisations organise support in levels, sometimes called tiers or lines.

* **First line (level 1).** The first person a user reaches, by phone, email, WhatsApp or a walk to the desk. Resets passwords, connects printers, fixes email settings, answers "how do I" questions, and records everything in a ticket.
* **Second line (level 2).** Takes problems first line cannot solve: a laptop that keeps crashing, a network switch that fails, a shared folder nobody can open. Often visits desks and branches.
* **Third line.** Specialists or the supplier: the network engineer, the bank's core system team, the printer company's technician.

As a beginner you will usually start at first line. That is a good place: you see every kind of problem and learn fast.

## Common roles you will see

* **Help desk or service desk analyst.** Mostly first line, often by phone or chat, sometimes remote for a company abroad.
* **Desktop support technician.** Sets up, repairs and maintains laptops, desktops and printers on site. Some are "dispatch" roles where you travel to clients.
* **ICT officer or IT officer.** Common in banks, rural and community banks, NGOs and public bodies. Mixes support with looking after servers, accounts, backups and suppliers. Senior versions want years of experience.
* **School or university lab technician.** Keeps a computer lab running, installs software for classes and does preventive maintenance.
* **NOC (network operations centre) support.** Watches networks and systems for faults, common at telcos, internet providers and larger firms.
* **Field or installation technician.** Installs equipment such as CCTV, routers and point of sale devices.

## Where the jobs are

Adverts for these roles in Ghana come from banks and microfinance companies, NGOs and international agencies, schools and universities, telcos, manufacturers, print service companies and IT firms that support other businesses. Many are in Accra and Tema, but Kumasi, Takoradi and Tamale also appear, and every district office and school needs someone who can fix things.

## A small example

Issahaku reads two adverts. One, at a community bank, asks for a degree, five years of experience and server administration. The other, at a food company, wants a part time IT support assistant to help staff with hardware, software and network connections. Issahaku sees that the second is first line work he can grow into now, while the first is a goal for later. He applies for the second and keeps the first in his notes as a map of the skills to build next.`,
      practice_task_md: `**Goal:** read real adverts like an IT professional.

1. On a job site that is free to browse, search for "IT support", "ICT officer", "help desk" and "desktop support" in Ghana. Read three adverts (do not apply yet).
2. For each one, note in your fix log notebook: the employer type (bank, NGO, school, telco, business), the location, whether it sounds like first line or second line, and the skills it lists.
3. Circle every skill that appears in at least two of the three adverts.
4. Write one sentence for each advert: "I could apply for this when I can do ...".

**Done looks like:** a one page summary of three adverts with repeated skills circled. Share it with a mentor and ask which skill to learn first.`,
      quiz: {
        questions: [
          {
            prompt: "Who does a user normally reach first when they ask IT for help?",
            options: ["Third line specialists", "The supplier", "First line support", "The network engineer"],
            answer_index: 2,
            explanation: "First line is the first point of contact and handles common requests.",
          },
          {
            prompt: "Which role mainly watches networks and systems for faults, and is common at telcos and internet providers?",
            options: [
              "NOC support",
              "School lab technician",
              "Field installation technician",
              "Graphic designer",
            ],
            answer_index: 0,
            explanation: "A network operations centre (NOC) monitors networks and systems for problems.",
          },
          {
            prompt: "Why is first line a good starting place for a beginner?",
            options: [
              "It pays the most",
              "You never need to talk to users",
              "You only work with servers",
              "You see every kind of problem and learn fast",
            ],
            answer_index: 3,
            explanation: "First line staff meet a wide range of problems, which builds experience quickly.",
          },
          {
            prompt: "In the example, why did Issahaku apply for the food company role rather than the bank role?",
            options: [
              "The bank was too far away",
              "It was first line work he could do now, while the bank role needed years of experience",
              "The food company paid more",
              "He did not want to work in finance",
            ],
            answer_index: 1,
            explanation: "He matched his current level to the advert and kept the senior role as a future goal.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "troubleshooting-method": {
      explanation_md: `## Why this matters

Employers in Ghana list "troubleshooting" in almost every IT support advert, and interviewers often test it by describing a problem and asking what you would do. They are not looking for a lucky guess. They want to hear a calm, logical method. Learn it once and you can use it on a laptop, a printer, a router or a phone.

## The six steps

1. **Gather information.** Ask the user what happens, when it started, what changed, and whether anyone else has the same problem. Try to see the error yourself. Write down exact error messages.
2. **Form a theory.** Based on the facts, list likely causes, simplest first. Is it plugged in? Is it switched on? Has the password expired?
3. **Test the theory.** Check one cause at a time. If the test shows you were wrong, go back to step 2 with your new knowledge.
4. **Plan and apply the fix.** Think about side effects before you act. Will a restart lose unsaved work? Does the user need to back up first? Then fix it.
5. **Verify.** Check the whole thing works, not just the part you touched. Ask the user to try it. Think about how to stop it happening again.
6. **Document.** Write the problem, cause and fix in the ticket or your log. Next time, you or a colleague will solve it in minutes.

## Useful habits

* **Change one thing at a time.** If you change three settings and it works, you do not know which one fixed it.
* **Start simple.** Many problems are a loose cable, a full disk, a switched off router or a wrong password.
* **Divide and conquer.** If the internet is off, check: is it just this laptop, this room, or the whole office? Each answer halves the search.
* **Know when to escalate.** If you are stuck, or the fix risks data or money, pass it on with clear notes of what you already tried.

## A small example

Mariama, a help desk officer at an NGO office in Tamale, gets a call: "I cannot print." She gathers information. Only this user is affected, and the printer worked for others ten minutes ago. Theory one: the laptop is sending to the wrong printer. She asks the user to check, and the laptop has switched to a printer in the Accra office. She sets the correct default printer, prints a test page, and asks the user to print the real document. It works. In the ticket she writes: "Default printer changed after update. Set correct default. Tested." Total time, five minutes.`,
      practice_task_md: `**Goal:** practise the six steps on a real problem.

1. Find any small tech problem around you: a phone that is always out of storage, a slow laptop, a Wi-Fi network that keeps dropping, a family member's app that will not open.
2. Work through the six steps and write a line for each in your fix log: information gathered, theories (simplest first), tests and results, fix, how you verified, what you documented.
3. If you cannot fix it, write what you would escalate and what notes you would hand over.
4. Explain the steps out loud to a friend in under two minutes, as if in an interview.

**Done looks like:** one complete six step write up in your log, and confidence explaining your method without notes.`,
      quiz: {
        questions: [
          {
            prompt: "What is the first step of the troubleshooting method?",
            options: ["Apply a fix", "Gather information", "Document the result", "Reinstall the software"],
            answer_index: 1,
            explanation: "You start by asking questions and collecting facts before forming any theory.",
          },
          {
            prompt: "Why should you change only one thing at a time?",
            options: [
              "So you know which change actually fixed the problem",
              "Because computers can only accept one change per day",
              "To make the job last longer",
              "Because the user will not notice",
            ],
            answer_index: 0,
            explanation: "If you change several things at once you cannot tell which one worked.",
          },
          {
            prompt: "The internet is off. Which question best uses divide and conquer?",
            options: [
              "Which browser do you like?",
              "When did you buy the laptop?",
              "Is it just this laptop, this room, or the whole office?",
              "Have you tried a different website design?",
            ],
            answer_index: 2,
            explanation: "Each answer narrows the search area by a large amount.",
          },
          {
            prompt: "In the Tamale example, what caused the printing problem?",
            options: [
              "The printer was out of paper",
              "The user had forgotten their password",
              "The network cable was cut",
              "The laptop's default printer had changed to another office's printer",
            ],
            answer_index: 3,
            explanation: "Mariama found the laptop sending jobs to the Accra printer and reset the default.",
          },
          {
            prompt: "What does the verify step involve?",
            options: [
              "Checking the whole thing works and asking the user to try it",
              "Sending the user a bill",
              "Closing the ticket before testing",
              "Escalating every problem to the supplier",
            ],
            answer_index: 0,
            explanation: "Verifying means confirming full function with the user, and thinking about prevention.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "tickets-and-customer-care": {
      explanation_md: `## Why this matters

Ghanaian IT support adverts regularly mention customer service, ticketing systems, documentation and resolving incidents within agreed service levels. A technician who fixes problems but forgets requests, or speaks rudely to a stressed bank teller, will not last. A technician who is calm, keeps records and explains clearly gets trusted with more.

## What a ticket is

A ticket is a record of one request or problem. Larger organisations use help desk software (ServiceNow, Zendesk, Jira Service Management and Freshdesk are examples you may see in adverts). Small offices might use a shared spreadsheet or a simple form. The tool matters less than what goes in it:

* **Who and where:** the user, their department or branch, how to reach them.
* **What:** a clear description in plain words, including exact error messages.
* **Priority:** how urgent and how many people are affected. A whole branch unable to serve customers is more urgent than one slow mouse.
* **Actions:** what you tried and what happened, with times.
* **Resolution:** the cause and the fix, written so a colleague could repeat it.

## Service levels

Many organisations agree a service level agreement (SLA): for example, urgent tickets get a response within a set time and a fix or workaround within a longer set time. Meeting SLAs is how support teams are judged, so update tickets promptly and escalate early if you cannot meet the target.

## Talking to users

* **Listen first.** Let the person explain without interrupting. Repeat back what you heard: "So the system logs you out every few minutes since this morning?"
* **Stay calm and kind.** They may be angry because a customer is waiting. It is not personal.
* **Use plain words.** Say "the box that gives out the internet" before you say "router", unless they already know the term. Use the language they are comfortable in, whether English, Dagbani, Twi or another; adverts sometimes ask for a local language for exactly this reason.
* **Set expectations.** Say what you will do and when you will update them, then do it.
* **Close properly.** Confirm it works for them before closing the ticket.

## A small example

Fuseini builds a simple ticket system for a small clinic in Yendi using a free online form. Staff fill in name, department, problem and urgency. Each entry lands in a spreadsheet where Fuseini adds actions, status and the fix. After a month he sorts the sheet and sees that most tickets are about one old printer. He shows the manager the list, and the clinic budgets for a replacement. The tickets did more than track work: they gave evidence for a decision.`,
      practice_task_md: `**Goal:** build a working ticket system with free tools.

1. Using Google Forms (works in a phone browser), create a form called "IT Help Request" with fields: name, department, device, description of the problem, urgency (low, medium, high).
2. Link it to a Google Sheet. Add columns for status, actions taken, cause, resolution and date closed.
3. Submit five pretend tickets for an invented office, such as "printer jams", "forgot email password", "internet off in whole office".
4. For each ticket, fill in the actions and resolution as if you fixed it, and set a priority.
5. Write a short reply message for one ticket that explains the fix in plain words.

**Done looks like:** a form and sheet with five tickets handled end to end. Screenshot it for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which ticket should usually get the highest priority?",
            options: [
              "One user's mouse is a bit slow",
              "A request to change a desktop wallpaper",
              "A whole branch cannot serve customers",
              "A question about a training next month",
            ],
            answer_index: 2,
            explanation: "Priority depends on urgency and how many people are affected.",
          },
          {
            prompt: "What is a service level agreement (SLA)?",
            options: [
              "An agreed target for how quickly tickets get a response and a fix",
              "A contract to buy new laptops",
              "The password policy for staff",
              "A type of network cable",
            ],
            answer_index: 0,
            explanation: "SLAs set response and fix times, and support teams are judged on meeting them.",
          },
          {
            prompt: "Why should the resolution be written clearly in a ticket?",
            options: [
              "So the user is impressed by long words",
              "Because the software deletes short notes",
              "To make the ticket look busy",
              "So a colleague could repeat the fix next time",
            ],
            answer_index: 3,
            explanation: "A clear record lets anyone solve the same problem quickly later.",
          },
          {
            prompt: "In the Yendi clinic example, what did the tickets reveal?",
            options: [
              "Most problems came from one old printer",
              "Staff never had problems",
              "The internet provider was always at fault",
              "The form was too long",
            ],
            answer_index: 0,
            explanation: "Sorting the tickets showed a pattern that supported buying a new printer.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
