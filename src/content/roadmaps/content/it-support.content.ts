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
    hardware: {
      explanation_md: `## Why this matters

Hardware problems are some of the most common calls in Ghanaian offices, schools and shops: a laptop that will not switch on, a desktop that is painfully slow, a printer that jams, a machine damaged when power came back after an outage. Adverts for IT support, desktop support and lab technician roles ask for hardware installation, repair, preventive maintenance and keeping an inventory of equipment. You do not need to be an electronics engineer. You need to know what each part does, how to look after it, and how to tell which part is failing.

## What this section covers

* **Inside a computer.** The main parts (processor, memory, storage, motherboard, power supply, ports) and what each one does. With this you can read a specification sheet, compare two laptops for a client, and make a good guess about which part is causing a fault.
* **Maintenance, repairs and upgrades.** How to clean a computer safely, why heat and dust shorten its life, and the two upgrades (more memory and a solid state drive) that most often turn a slow machine into a useful one.
* **Power, surges and protection.** Ghana's mains supply, what outages and surges do to equipment, and the difference between a surge protector, a voltage stabiliser and a UPS. This topic alone can save an office a lot of money.
* **Printers and peripherals.** How printers, scanners and copiers connect and share, and how to clear the faults staff call about most.

## Safety first

Whenever you open or move equipment, follow three rules. Switch off and unplug the power before touching anything inside. Touch a bare metal part of the case first to release static electricity, which can damage chips you cannot see. Never open a power supply unit or a swollen battery: the power supply holds dangerous charge even when unplugged, and swollen batteries can catch fire.

## Phone or computer?

You can learn the ideas in this section on a phone. Looking inside a real machine is much better, though. If you do not own a computer, ask at a school computer lab, a library, a community centre, a cyber cafe or a phone and computer repair shop whether you can watch or help when they open one. Many repairers are happy to let a polite learner watch. Old, broken machines that people are throwing away make excellent practice: you cannot damage them further.

## A small example

Amina volunteers in the computer lab of a junior high school in Damongo. Three of the twenty desktops keep switching off by themselves during afternoon classes. Using what she learns in this section, she notices the three share a hot corner, opens one (switched off and unplugged), and finds the fan and heat sink thick with dust. She cleans them with a soft brush, moves the desks away from the wall, and the shutdowns stop. Knowing the hardware turned a mystery into a twenty minute fix.`,
      practice_task_md: `**Goal:** make a hardware inventory, the first thing many IT jobs ask you to keep.

1. Choose a place with several devices: your home, a family shop, a church office or a school lab (ask permission).
2. In a spreadsheet or notebook, list every device: type (laptop, desktop, printer, router, phone), make and model, where it is, who uses it, and its condition.
3. For computers, find the processor, memory (RAM) and storage size. On Windows open Settings, then System, then About. On a phone look in Settings, then About phone.
4. Add a "notes" column for anything worrying: noisy fan, cracked screen, swollen battery, no surge protection.

**Done looks like:** an inventory of at least five devices with specifications and notes. Remove names and serial numbers before sharing it as a portfolio sample.`,
      quiz: {
        questions: [
          {
            prompt: "What should you always do before touching anything inside a computer?",
            options: [
              "Switch it off and unplug the power",
              "Turn the screen brightness down",
              "Connect it to the internet",
              "Open the power supply unit",
            ],
            answer_index: 0,
            explanation: "Safety starts with removing power before you open or touch internal parts.",
          },
          {
            prompt: "Why should you never open a power supply unit?",
            options: [
              "It has no useful parts",
              "It voids the internet contract",
              "It holds dangerous charge even when unplugged",
              "It is glued shut on every computer",
            ],
            answer_index: 2,
            explanation: "Power supplies store charge that can injure you even after unplugging.",
          },
          {
            prompt: "Why do you touch a bare metal part of the case before working inside?",
            options: [
              "To check the temperature",
              "To release static electricity that can damage chips",
              "To switch the computer on",
              "To clean the case",
            ],
            answer_index: 1,
            explanation: "Static discharge can damage components, so you release it first.",
          },
          {
            prompt: "In the Damongo example, what was causing the computers to switch off?",
            options: [
              "A virus",
              "A faulty keyboard",
              "Wrong passwords",
              "Dust and heat in a hot corner of the lab",
            ],
            answer_index: 3,
            explanation: "Dust on the fans and heat sinks caused overheating, which made the machines shut down.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "computer-components": {
      explanation_md: `## Why this matters

When a manager in Ghana asks "which laptop should we buy for the new accounts officer?" or a user says "it is too slow", you need to know what each part of a computer does. Adverts ask for hardware installation and repair, and interviewers often ask you to name the parts and explain what they do.

## The main parts

* **Processor (CPU).** The chip that does the calculations. Faster processors with more cores handle more work at once. You will see names like Intel Core i5 or AMD Ryzen 5; the generation (how new it is) matters as much as the number.
* **Memory (RAM).** Short term working space for programs that are open now. It empties when the computer switches off. Too little RAM makes a computer slow when several programs or browser tabs are open. Office machines today are much more comfortable with 8 GB or more.
* **Storage.** Where files and programs live permanently. A hard disk drive (HDD) has spinning platters and is slow and fragile. A solid state drive (SSD) has no moving parts and is far faster. Storage is measured in gigabytes (GB) or terabytes (TB).
* **Motherboard.** The main board that connects everything. Its design decides which processor, memory and storage types fit.
* **Power supply (PSU).** Converts mains electricity into the low voltages the parts need. Laptops use an external charger plus a battery.
* **Graphics.** Most office computers use graphics built into the processor. Design and gaming machines may add a separate graphics card.
* **Ports.** USB (including the small oval USB C), HDMI or DisplayPort for screens, an Ethernet port for a network cable, and an audio jack.
* **Firmware (BIOS or UEFI).** Small built in software that starts the computer and checks the hardware before the operating system loads. You open its settings with a key such as F2, F10 or Delete at start up; the key depends on the maker.

## Reading a specification

A laptop advert in a Kumasi shop might read: "Core i5 12th gen, 8GB RAM, 256GB SSD, 14 inch". That tells you a reasonably modern processor, enough memory for office work, a fast but small drive, and a portable screen. For an accounts officer that is a sensible choice. For a graphic designer, you might suggest more RAM and storage.

## Matching symptoms to parts

* Slow to start and open files: often an old HDD, or a nearly full drive.
* Slow when many tabs are open: often too little RAM.
* Switches off when busy: often overheating or a failing power supply or battery.
* Clicking noise and missing files: a failing HDD. Back up immediately.
* No display but lights and fans on: check the screen cable, then memory.

## A small example

Sumaila is asked why a Wa NGO's reception desktop takes five minutes to start. He checks: 4 GB RAM and an old HDD that is almost full. He explains to the manager that the drive is the main problem and recommends an SSD, with a memory upgrade if budget allows.`,
      practice_task_md: `**Goal:** read specifications and match them to jobs.

1. Find the specifications of any computer you can use (Settings, then System, then About on Windows) and write down processor, RAM, storage type and size.
2. Find three laptop adverts online from Ghanaian shops or sellers (just browse, do not buy).
3. Make a small table: processor, RAM, storage type and size, screen size, for each advert.
4. For each, write one line: which kind of staff member it suits (receptionist, accountant, designer, field officer) and why.
5. Write one line on which part you would upgrade first on the computer from step 1, and why.

**Done looks like:** a comparison table and short recommendations you could send a manager.`,
      quiz: {
        questions: [
          {
            prompt: "Which part is short term working space that empties when the computer switches off?",
            options: ["The SSD", "The RAM", "The motherboard", "The power supply"],
            answer_index: 1,
            explanation: "RAM holds programs that are open now and loses its contents when power is off.",
          },
          {
            prompt: "What is the main advantage of an SSD over an HDD?",
            options: [
              "It has spinning platters",
              "It always stores more data",
              "It is far faster and has no moving parts",
              "It does not need a motherboard",
            ],
            answer_index: 2,
            explanation: "SSDs have no moving parts and are much faster than hard disk drives.",
          },
          {
            prompt: "A computer makes clicking noises and files are going missing. What should you do first?",
            options: [
              "Back up the files immediately",
              "Add more RAM",
              "Change the screen",
              "Install a new browser",
            ],
            answer_index: 0,
            explanation: "These are signs of a failing hard disk, so protecting the data comes first.",
          },
          {
            prompt: "What does the BIOS or UEFI firmware do?",
            options: [
              "Prints documents",
              "Stores all your photos",
              "Connects to Wi-Fi only",
              "Starts the computer and checks hardware before the operating system loads",
            ],
            answer_index: 3,
            explanation: "Firmware runs first at start up and hands over to the operating system.",
          },
          {
            prompt: "In the Wa example, what did Sumaila identify as the main cause of slow start up?",
            options: [
              "A virus",
              "An old, nearly full hard disk drive",
              "A broken keyboard",
              "The screen size",
            ],
            answer_index: 1,
            explanation: "The old HDD was the main bottleneck, so he recommended an SSD.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "maintenance-and-upgrades": {
      explanation_md: `## Why this matters

Many computers in Ghanaian offices, schools and cyber cafes are older machines that have to keep working because budgets are tight. Harmattan dust, heat and unstable power shorten their lives. Adverts for desktop support and lab roles ask for preventive maintenance and repairs, and a technician who can keep old machines running saves an organisation real money.

## Preventive maintenance

Preventive maintenance means looking after equipment before it fails. A simple routine, done every term or every few months:

* **Clean the outside.** Wipe screens with a soft, slightly damp cloth (never spray liquid directly on). Clean keyboards and mouse.
* **Clear the dust inside.** Switch off, unplug and, on a desktop, open the side panel. Use a soft brush or a can of compressed air to clear fans, vents and heat sinks. Hold fans still while you blow them so they do not spin too fast. Do this outside if you can, especially after harmattan.
* **Check airflow.** Computers need space around vents. Do not let laptops sit on beds or cloth that block the air.
* **Check cables and plugs.** Look for burnt or loose plugs, damaged extension boards and cables trapped under desks.
* **Check health.** Note any strange noises, very hot surfaces or swollen batteries (a laptop whose case is bulging or trackpad is lifting). Stop using a swollen battery and replace it.
* **Software housekeeping.** Install updates, remove programs nobody uses and free space on nearly full drives.

Keep a maintenance record per machine: date, what you did, what you noticed.

## The two upgrades that matter most

For an old but working computer, two upgrades usually make the biggest difference:

1. **Replace the hard disk with a solid state drive (SSD).** Start up and opening programs often become many times faster. Check what the machine accepts: a 2.5 inch SATA drive, or a small M.2 card (which may be SATA or NVMe; the motherboard decides).
2. **Add memory (RAM).** Check the type the motherboard supports (for example DDR4 or DDR5) and whether it is laptop size (SO DIMM) or desktop size. Check how many slots are free and the maximum supported.

Before any upgrade, back up the user's files. After swapping a drive you will need to copy the old drive across (cloning) or install the operating system fresh.

## When to repair and when to replace

If a machine needs several expensive parts, cannot run a supported operating system, or keeps failing, it may be cheaper to replace it. Give the manager the facts and costs and let them decide.

## A small example

Wumpini maintains twelve laptops for a microfinance office in Tamale. After harmattan, several are running hot and slow. She cleans each one, replaces two swollen batteries, and recommends SSD upgrades for the four slowest. Staff stop complaining, and the manager asks her to plan the same routine every term.`,
      practice_task_md: `**Goal:** plan and carry out a safe maintenance check.

1. Write a one page preventive maintenance checklist for a small office, using the routine in this lesson.
2. With permission, use your checklist on one real device (a family laptop, a church desktop, a school lab machine). Only clean the outside and vents unless someone experienced is with you to open it.
3. Record what you found: dust level, temperature, battery condition, free storage, pending updates.
4. Find out (from Settings or the maker's website) what RAM type and drive type the machine supports, and write a short upgrade recommendation.

**Done looks like:** a checklist, a completed maintenance record for one device, and an upgrade recommendation. If you have no device, complete the checklist and the recommendation for a laptop model you find online.`,
      quiz: {
        questions: [
          {
            prompt: "What is preventive maintenance?",
            options: [
              "Looking after equipment before it fails",
              "Buying new computers every year",
              "Only fixing things after they break",
              "Installing games on staff computers",
            ],
            answer_index: 0,
            explanation: "It means regular care that stops failures before they happen.",
          },
          {
            prompt: "Which upgrade usually makes an old computer start up and open programs much faster?",
            options: [
              "A bigger monitor",
              "A new keyboard",
              "Replacing the hard disk with an SSD",
              "A new mouse pad",
            ],
            answer_index: 2,
            explanation: "SSDs are far faster than hard disks, which speeds up start up and loading.",
          },
          {
            prompt: "What should you do with a laptop whose battery has swollen?",
            options: [
              "Keep using it but charge it less",
              "Press the case flat",
              "Leave it in the sun",
              "Stop using the battery and replace it",
            ],
            answer_index: 3,
            explanation: "Swollen batteries are a fire risk and must be replaced.",
          },
          {
            prompt: "Before adding RAM, what should you check?",
            options: [
              "The supported memory type, size format and free slots",
              "The colour of the case",
              "The Wi-Fi password",
              "The printer driver",
            ],
            answer_index: 0,
            explanation: "RAM must match the motherboard's type and format, and there must be room for it.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "power-protection": {
      explanation_md: `## Why this matters

Power cuts, low voltage and sudden surges are part of working life in many parts of Ghana. When power drops suddenly, unsaved work is lost and files can be corrupted. When power returns, a spike can destroy power supplies, routers, printers and phone chargers. Lightning storms in the rainy season add more risk. An IT person who sets up good power protection prevents a whole category of expensive problems.

## Ghana's mains supply

Ghana's mains electricity is 230 volts at 50 hertz, and sockets are mostly the three pin types known as D (round pins) and G (rectangular pins). Equipment from abroad must accept 230 V; most modern laptop chargers say "100 to 240V" on the label, which is fine. Always read the label before plugging something in.

## Three kinds of protection

They solve different problems, and people often confuse them.

* **Surge protector.** An extension board or plug with components that absorb short spikes of high voltage and protect what is plugged in. It does nothing during a power cut and does not fix low voltage. Surge protectors wear out after absorbing big surges, so replace old or damaged ones. A cheap extension board is not necessarily a surge protector: check the packaging says surge protection.
* **Voltage stabiliser (often called an AVR, automatic voltage regulator).** Corrects voltage that is too low or too high and keeps it steady. Useful where supply is weak, for example at the end of a long line or when heavy machines start nearby.
* **UPS (uninterruptible power supply).** A box with a battery that keeps equipment running for a short time when power fails, so people can save work and shut down properly. Many UPS units also include surge protection and voltage regulation. A small office UPS usually lasts minutes, not hours; it is not a generator.

## Good practice

* Put desktops, screens and network equipment on a UPS or at least a surge protector.
* Keep the router and modem on a UPS so the internet survives short cuts.
* Do not plug a laser printer into a small UPS: laser printers draw a lot of power when warming up and can overload it. Use a surge protector instead.
* Switch off and unplug sensitive equipment during lightning storms if you can.
* When power returns after an outage, wait a little before switching everything back on.
* Do not chain extension boards into each other. Look for burnt plugs and loose sockets.
* Generators and solar inverters can produce rough power. Use a stabiliser or UPS between them and computers.
* Check UPS batteries yearly; they weaken with age and heat.

## A small example

Abdul-Rahman supports a pharmacy in Bolgatanga. After a storm, the router and the till computer died. He replaces them, then puts the computer, screen and router on a small UPS and plugs the receipt printer into a surge protector. Months later, during another storm, the lights go off but the till stays on long enough to save the sale and shut down cleanly.`,
      practice_task_md: `**Goal:** do a power safety audit.

1. Choose a workspace: your home, a family shop, a church office or a school lab (with permission).
2. List every device that uses mains power and how it is plugged in: straight into the wall, an ordinary extension board, a surge protector, a stabiliser or a UPS.
3. Note risks: chained extension boards, burnt or loose plugs, laser printer on a UPS, router with no protection, cables across walkways.
4. Write a short recommendation: which devices need a UPS, which need only a surge protector, and what to fix right away. Do not quote prices or brands.

**Done looks like:** a one page power audit with a list of devices, risks and recommendations, which you could hand to the owner.`,
      quiz: {
        questions: [
          {
            prompt: "What is the mains supply in Ghana?",
            options: ["110 volts at 60 hertz", "230 volts at 50 hertz", "12 volts at 50 hertz", "400 volts at 60 hertz"],
            answer_index: 1,
            explanation: "Ghana uses 230 V at 50 Hz, so equipment must accept 230 V.",
          },
          {
            prompt: "What does a UPS do that a surge protector does not?",
            options: [
              "Keeps equipment running for a short time when power fails",
              "Makes the internet faster",
              "Prints documents during an outage",
              "Turns off the lights",
            ],
            answer_index: 0,
            explanation: "A UPS has a battery for short outages; a surge protector only absorbs spikes.",
          },
          {
            prompt: "Which device corrects voltage that is too low or too high?",
            options: ["A network switch", "A USB hub", "A voltage stabiliser", "A printer"],
            answer_index: 2,
            explanation: "Stabilisers, or AVRs, keep the voltage steady.",
          },
          {
            prompt: "Why should a laser printer not be plugged into a small UPS?",
            options: [
              "Laser printers cannot use 230 V",
              "The UPS will change the print colour",
              "Laser printers do not work during the day",
              "It draws a lot of power when warming up and can overload the UPS",
            ],
            answer_index: 3,
            explanation: "The warm up draw of a laser printer is too much for a small UPS.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "printers-and-peripherals": {
      explanation_md: `## Why this matters

In Ghanaian offices, schools and banks, printers, copiers and scanners produce a big share of everyday support calls. Some adverts are entirely about printers: maintaining office printer fleets, servicing multifunction copiers, managing toner and ink. Being the person who can calmly fix the printer before a deadline earns you a lot of goodwill.

## Kinds of printers

* **Inkjet.** Sprays liquid ink. Cheap to buy, good for colour, but ink can dry out if unused. Many small businesses use ink tank models that refill from bottles.
* **Laser.** Uses toner powder fused onto paper with heat. Fast and cheaper per page for lots of black text; common in offices.
* **Thermal.** Uses heat sensitive paper; used for receipts at tills and MoMo agents' printers.
* **Multifunction (MFP).** Prints, copies, scans and sometimes faxes. Larger office copiers are usually multifunction devices.

## How printers connect

* **USB.** One computer, one cable. Simple, but only that computer can print unless it shares the printer.
* **Network.** Through an Ethernet cable or Wi-Fi to the office network, so everyone can print. Give network printers a fixed (reserved) address on the router so computers can always find them.
* **Driver.** Software that lets the operating system talk to the printer. Windows often installs one automatically; otherwise download it from the printer maker's official website only, never from random sites.

## The common faults and fixes

* **Nothing prints.** Check power, paper, and that the right printer is selected (the default printer may have changed). Open the print queue: a stuck job can block everything behind it. Cancel it and try again. On Windows, restarting the print spooler service often clears a frozen queue.
* **Printer offline.** Check its cable or Wi-Fi connection and that its network address has not changed. Print a configuration page from the printer's own menu to see its address.
* **Paper jams.** Switch off, open the doors the printer shows, and pull paper out gently in the direction it travels. Remove torn pieces. Check paper is dry, not curled, and loaded neatly. Harmattan dryness and rainy season damp both affect paper.
* **Faded or streaky prints.** Low toner or ink, or dirty print heads. Run the cleaning cycle from the printer menu.
* **Error codes.** Look up the exact code in the maker's manual or support site.

## Other peripherals

Keyboards, mice, webcams, headsets, projectors and scanners also land on your desk. The same steps apply: check power and cables, try another port, check the driver, test on another computer to see whether the device or the computer is at fault.

## A small example

Hawa, at a Bolgatanga school, gets three calls: nobody can print to the staff room laser printer. She prints a configuration page and sees the printer's address has changed after the router restarted. She reserves a fixed address for it on the router, updates one laptop as a test, then the rest. Printing returns, and it will not break the same way again.`,
      practice_task_md: `**Goal:** build a printer troubleshooting guide for staff.

1. Using this lesson and the printer support pages linked to this topic, write a one page guide called "Before you call IT about the printer" with five checks a staff member can do themselves.
2. Write a second, technician page with the steps for: stuck print queue, printer offline, paper jam and faded prints.
3. If you have access to any printer (home, church, school, cyber cafe), with permission print a configuration or status page from its menu and note how it is connected.

**Done looks like:** a staff guide and a technician checklist, written in plain words, plus notes on one real printer if you could access one.`,
      quiz: {
        questions: [
          {
            prompt: "Which type of printer is commonly used for receipts at tills and MoMo agents?",
            options: ["Laser", "Thermal", "Inkjet", "Plotter"],
            answer_index: 1,
            explanation: "Thermal printers use heat sensitive paper and are common for receipts.",
          },
          {
            prompt: "Nothing is printing and the print queue has a stuck job. What should you try?",
            options: [
              "Buy a new printer",
              "Reinstall Windows",
              "Cancel the stuck job, and restart the print spooler if needed",
              "Unplug the router",
            ],
            answer_index: 2,
            explanation: "A stuck job blocks the queue; clearing it and restarting the spooler usually helps.",
          },
          {
            prompt: "Why should a network printer have a fixed (reserved) address?",
            options: [
              "So computers can always find it",
              "So it prints in colour",
              "So it uses less toner",
              "So it does not need paper",
            ],
            answer_index: 0,
            explanation: "If the address changes, computers lose the printer, as in the Bolgatanga example.",
          },
          {
            prompt: "Where should you download a printer driver from?",
            options: [
              "Any site that appears first in search",
              "A file sent on WhatsApp by a stranger",
              "A pop up advert",
              "The printer maker's official website",
            ],
            answer_index: 3,
            explanation: "Only official sources are safe for drivers.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
