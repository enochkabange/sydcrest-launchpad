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
    "operating-systems": {
      explanation_md: `## Why this matters

An operating system (OS) is the main software that runs a device: it manages the hardware, runs apps and gives people a way to use the machine. In Ghanaian workplaces you will meet three again and again. Most office desktops and laptops run Microsoft Windows. Many servers, routers, internet systems and cloud services run Linux. Almost every staff phone runs Android. Job adverts for IT support in Ghana ask for Windows support most often, with Linux appearing for server and network work and mobile device support appearing for staff phones and tablets.

## What every operating system does

Whatever the brand, an OS handles the same jobs:

* **Starts the device** after the firmware hands over.
* **Manages files and folders** on storage.
* **Runs apps** and shares memory and processor time between them.
* **Manages users and permissions**, deciding who can sign in and what they can change.
* **Talks to hardware** through drivers, small programs that let the OS use a printer, screen or Wi-Fi card.
* **Connects to networks** and keeps settings such as the device's address.
* **Updates itself** with fixes for bugs and security holes.

Once you understand these jobs, moving between Windows, Linux and Android is much easier. You will always look for the same things: where are the settings, where are the files, who is the user, what is installed, is it up to date, is it connected.

## What this section covers

* **Supporting Windows.** The tools a technician uses daily: Settings, Task Manager, Device Manager, updates, safe software installation, remote help, and when to repair or reinstall.
* **Linux basics and the command line.** Files, folders, users and the handful of commands you will use on servers and network devices. This is also the first step towards cybersecurity and cloud work.
* **Android phones and mobile devices.** Accounts, storage, updates, backups, security and what to do when a phone is lost.

## Phone or computer?

The Android lesson can be practised fully on your own phone. The Windows and Linux lessons need a computer for hands on practice. If you do not have one, you can still learn the ideas here, then practise at a school lab, library, community centre or cyber cafe. Linux can run from a USB stick without changing what is installed on the computer, which makes it safe to try on a borrowed machine, but always ask the owner first.

## A small example

Mariama joins a district health office in Savelugu as an IT assistant. On day one she has three requests: a Windows laptop that is very slow, a Linux based server in the corner that needs its updates checked, and a nurse's Android phone that will not receive work email. Different systems, same questions: what changed, is it up to date, is the account right, is it connected. By the end of the week she has solved all three, using the approach in this section.`,
      practice_task_md: `**Goal:** compare operating systems by the jobs they do.

1. On your phone, find: the Android version, available storage, the signed in accounts, and when the last security update was installed (Settings, then About phone, Storage, Accounts and Security).
2. If you can use a Windows computer, find the same four things (Settings, then System and Accounts, plus Windows Update).
3. Make a table with the OS jobs from this lesson (start, files, apps, users, drivers, networks, updates) as rows, and write where you would look for each on Android and on Windows.
4. Leave a Linux column empty for now. You will fill it in after the Linux lesson.

**Done looks like:** a comparison table with at least the Android column complete. Keep it as a quick reference card.`,
      quiz: {
        questions: [
          {
            prompt: "What is an operating system?",
            options: [
              "A type of printer cable",
              "The main software that runs a device, manages hardware and runs apps",
              "A website for buying laptops",
              "A virus scanner only",
            ],
            answer_index: 1,
            explanation: "The OS manages hardware, runs apps and gives people a way to use the device.",
          },
          {
            prompt: "Which operating system runs most office desktops and laptops in Ghanaian workplaces?",
            options: ["Linux", "Android", "Windows", "iOS"],
            answer_index: 2,
            explanation: "Most office computers run Windows, which is why adverts ask for it most.",
          },
          {
            prompt: "What is a driver?",
            options: [
              "A small program that lets the OS use a piece of hardware",
              "The person who delivers computers",
              "A type of password",
              "A backup of all your files",
            ],
            answer_index: 0,
            explanation: "Drivers let the operating system talk to printers, screens, Wi-Fi cards and more.",
          },
          {
            prompt: "Why is running Linux from a USB stick useful on a borrowed computer?",
            options: [
              "It makes the computer faster forever",
              "It deletes viruses automatically",
              "It installs Windows updates",
              "It lets you try Linux without changing what is installed",
            ],
            answer_index: 3,
            explanation: "A live USB runs Linux without touching the installed system.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "windows-support": {
      explanation_md: `## Why this matters

Windows support is the skill Ghanaian IT support adverts mention most: installing and configuring Windows, troubleshooting software, managing updates, supporting Microsoft Office and Microsoft 365, and helping users remotely. If you know your way around Windows calmly and quickly, you can handle a large share of first line calls.

## The tools you will use every day

* **Settings.** Open with the Start menu or the Windows key and I. System, Bluetooth and devices, Network and internet, Accounts, Apps and Windows Update all live here.
* **Task Manager.** Open with \`Ctrl\` + \`Shift\` + \`Esc\`. Shows which apps and processes are using processor, memory and disk. If a machine is slow, look here first. You can end a frozen app from here.
* **Device Manager.** Right click the Start button to find it. Shows every piece of hardware and flags problems with a yellow warning sign. Use it to update or roll back a driver.
* **Storage settings.** A nearly full drive makes Windows slow and stops updates. Storage Sense can clear temporary files.
* **Windows Update.** Installs security fixes. Keep machines up to date, but plan big updates outside busy hours.
* **Command Prompt and PowerShell.** Text tools for quick checks such as \`ipconfig\` (network settings). You will use these in the networking section.

## Installing software safely

Install only from official sources: the Microsoft Store, the software maker's own website or the organisation's approved list. Pirated or "cracked" software is illegal to use and is a common way malware gets into Ghanaian offices. Uninstall programs nobody uses from Settings, then Apps.

## Supported versions

Microsoft stopped regular support for Windows 10 in October 2025, which means no more free security updates for most users. Organisations still on Windows 10 should plan to move to Windows 11 where the hardware allows, or replace machines. Knowing this helps you give managers sound advice.

## Repair or reinstall

Work from the gentlest fix to the strongest:

1. Restart (many problems clear here).
2. Update Windows and drivers, or roll back a recent update or driver that caused the trouble.
3. Start in safe mode, which loads only basic drivers, to remove bad software.
4. Use System Restore to go back to an earlier restore point, if one exists.
5. Use Reset this PC, which reinstalls Windows and offers to keep personal files. Back up first anyway.

## Helping remotely

Windows includes Quick Assist, which lets you see and control a user's screen with their permission. Remote support saves trips between branches, but always confirm who you are talking to and never ask users to share passwords.

## A small example

Fuseini supports an accounts office in Tamale. A user says her laptop "freezes every morning". In Task Manager he sees a startup program using most of the disk. He disables it from the Startup apps list, restarts, and the laptop runs normally. He notes the program in the ticket so other machines can be checked.`,
      practice_task_md: `**Goal:** practise the core Windows tools. This task needs a Windows computer: use your own, a school lab, library, community centre or cyber cafe machine (ask permission, and do not change settings on shared machines beyond looking).

1. Open Task Manager and note the three apps using the most memory.
2. Open Device Manager and check for any warning signs.
3. In Settings, find free storage space, the Windows version and the date of the last update.
4. Open Command Prompt and run \`ipconfig\`. Write down the IPv4 address (you will learn what it means soon).
5. Write a short "slow computer" checklist using what you found.

**If you have no computer access yet:** write the checklist from this lesson and practise naming each tool and what it is for until you can do it from memory.

**Done looks like:** notes from each step and a slow computer checklist.`,
      quiz: {
        questions: [
          {
            prompt: "A computer is slow. Which tool shows which apps are using the processor, memory and disk?",
            options: ["Device Manager", "Task Manager", "Paint", "Calculator"],
            answer_index: 1,
            explanation: "Task Manager shows resource use and lets you end frozen apps.",
          },
          {
            prompt: "Where do you look for hardware problems flagged with a yellow warning sign?",
            options: ["Device Manager", "Windows Update", "The Microsoft Store", "File Explorer"],
            answer_index: 0,
            explanation: "Device Manager lists hardware and flags driver or device problems.",
          },
          {
            prompt: "Which is the gentlest first step when fixing a Windows problem?",
            options: [
              "Reset this PC",
              "Replace the hard drive",
              "Restart the computer",
              "Install cracked software",
            ],
            answer_index: 2,
            explanation: "Start with the gentlest fix, a restart, before stronger steps.",
          },
          {
            prompt: "Why should you avoid pirated or cracked software?",
            options: [
              "It is always slower",
              "It cannot print",
              "It only works at night",
              "It is illegal and a common way malware gets in",
            ],
            answer_index: 3,
            explanation: "Cracked software breaks the law and often carries malware.",
          },
          {
            prompt: "What does Quick Assist let you do?",
            options: [
              "See and control a user's screen with their permission",
              "Print faster",
              "Reset a router",
              "Back up a phone",
            ],
            answer_index: 0,
            explanation: "Quick Assist is the built in Windows remote help tool.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "linux-basics": {
      explanation_md: `## Why this matters

You may not see many Linux desktops in Ghanaian offices, but Linux is everywhere behind the scenes. It runs many web and email servers, the software inside routers and network equipment, cloud systems and security tools. Ghanaian support adverts mention Windows and Linux server administration for second line and NOC roles, and both cybersecurity and cloud careers expect Linux. Learning the basics now opens those doors.

## What Linux is

Linux is a free, open source operating system. It comes in versions called distributions, such as Ubuntu, Debian and Fedora, which package Linux with tools and a desktop. Servers usually run without a desktop at all, so administrators use the command line: a text window (the terminal) where you type commands.

## Files, folders and users

* Everything starts at the root folder, written \`/\`.
* Each user has a home folder such as \`/home/wumpini\`, shortened to \`~\`.
* Settings files live mostly under \`/etc\`, and logs under \`/var/log\`.
* Each file has an owner and permissions: who may read, write or run it.
* Ordinary users cannot change system files. To run an admin command you put \`sudo\` in front and enter your password. Use it carefully.

## The commands to learn first

\`\`\`
pwd           # where am I?
ls -l         # list files with details
cd /etc       # change folder
mkdir notes   # make a folder
cp a.txt b.txt  # copy a file
mv b.txt old/   # move or rename
cat a.txt     # show a file
man ls        # manual for a command
\`\`\`

For system and network checks:

\`\`\`
sudo apt update   # refresh package list (Ubuntu, Debian)
sudo apt upgrade  # install updates
ip a              # show network addresses
ping -c 4 example.com  # test a connection
df -h             # free disk space
\`\`\`

Be very careful with \`rm\`, which deletes files without a recycle bin. Read a command twice before pressing Enter, especially with \`sudo\`.

## How to practise

Linux practice needs a computer. You can make a "live USB" from the official Ubuntu instructions and start a borrowed machine from it without installing anything, or install Ubuntu on an old laptop that is no longer needed. School labs, libraries and community centres sometimes allow this if you ask. If you only have a phone for now, read through the free Ubuntu command line tutorial, copy the commands into your notebook with what each one does, and practise explaining them. When you reach a computer, you will be ready.

## A small example

Abdul-Rahman starts as a junior technician at an internet provider in Kumasi. His supervisor asks him to check why a small Linux server is misbehaving. He signs in, runs \`df -h\` and sees the disk is full. Using \`ls -l\` in \`/var/log\` he finds an enormous log file. He reports it, and the supervisor sets up automatic log clean up. Three commands found the problem.`,
      practice_task_md: `**Goal:** learn the first Linux commands. This needs a computer for full practice.

**With a computer:** follow the free Ubuntu tutorial "The Linux command line for beginners" linked to this topic, using a live USB or an installed Ubuntu. Then:
1. Make a folder called \`it-practice\` in your home folder.
2. Create a file inside it with a short note, copy it, rename the copy, list the folder with details.
3. Run \`ip a\` and \`df -h\` and write down what each shows.

**With only a phone:** read the same tutorial in your browser. In your notebook, write each command from this lesson, what it does, and one example. Then fill in the Linux column of the table you made in the operating systems lesson.

**Done looks like:** screenshots or notes of your commands and outputs, or a complete handwritten command sheet you can explain without looking.`,
      quiz: {
        questions: [
          {
            prompt: "Where is Linux most commonly found in workplaces?",
            options: [
              "Only on staff phones",
              "On servers, network equipment and cloud systems",
              "Only in printers",
              "Only on gaming computers",
            ],
            answer_index: 1,
            explanation: "Linux mainly runs behind the scenes on servers, routers and cloud systems.",
          },
          {
            prompt: "What does the command `pwd` show?",
            options: [
              "Your password",
              "The printer queue",
              "The folder you are currently in",
              "The network speed",
            ],
            answer_index: 2,
            explanation: "`pwd` prints the current working folder.",
          },
          {
            prompt: "Why should you be careful with the `rm` command?",
            options: [
              "It deletes files without a recycle bin",
              "It restarts the router",
              "It sends email to everyone",
              "It changes the screen colour",
            ],
            answer_index: 0,
            explanation: "Files removed with `rm` do not go to a recycle bin.",
          },
          {
            prompt: "What does putting `sudo` in front of a command do?",
            options: [
              "Makes it run faster",
              "Runs it on another computer",
              "Turns it into a comment",
              "Runs it with administrator rights after you enter your password",
            ],
            answer_index: 3,
            explanation: "`sudo` gives a command admin rights, so use it carefully.",
          },
          {
            prompt: "In the Kumasi example, which command showed that the disk was full?",
            options: ["`df -h`", "`pwd`", "`mkdir`", "`cat`"],
            answer_index: 0,
            explanation: "`df -h` shows disk space in human readable sizes.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "android-and-mobile": {
      explanation_md: `## Why this matters

In Ghana the phone is often the main work device. Field officers collect survey data on Android tablets, sales staff take orders on WhatsApp, managers read email on their phones, and MoMo runs on everyone's handset. Adverts for IT support mention supporting mobile devices, and some name mobile device management tools. Phone support is also something you can practise fully on the device in your hand.

## Accounts

An Android phone is tied to a Google account, which controls the Play Store, contacts, backups and the find, lock and erase feature. Work phones may also have a Microsoft 365 or other work account for email. Many "my email stopped working" calls are really account problems: a changed password, an expired sign in or the wrong account selected. Check Settings, then Passwords and accounts (the name varies by maker).

## Storage and performance

A full phone is slow, crashes apps and cannot update. Check Settings, then Storage. Common fixes: clear WhatsApp media you no longer need, move photos to a backup, uninstall unused apps, clear an app's cache. Restarting a phone clears many temporary problems.

## Updates and safe apps

* Keep Android system updates and app updates installed; they fix security holes.
* Install apps only from the Google Play Store or the organisation's approved source. Apps sent as files on WhatsApp (APK files) are a common way scammers take over phones.
* Google Play Protect scans apps for harmful behaviour. Leave it on.
* Set a screen lock (PIN, pattern or fingerprint). Never share MoMo or bank PINs with anyone, including IT staff.

## Backup and lost phones

* Turn on Google backup (Settings, then Google, then Backup) so contacts, photos and settings can be restored on a new phone. Back up WhatsApp chats from inside WhatsApp.
* If a phone is lost or stolen, use Google's find, lock and erase feature from another device, signed in with the same Google account. Then contact the network to block the SIM and change important passwords.
* Before a factory reset, back up and know the Google account password: after a reset, the phone asks for the previous account to stop thieves using it.

## Work phones and device management

Organisations with many phones use mobile device management (MDM) tools, such as Microsoft Intune or Google's endpoint management, to push apps and settings, require screen locks, and wipe work data if a phone is lost. As a technician you may enrol phones and help users through it.

## A small example

Amina supports twenty field officers for an NGO in Nalerigu. One officer cannot submit survey forms. Amina asks questions and finds the phone storage is full of WhatsApp videos. She helps him back up the photos he wants, clear old media, restart, and the forms send. She adds "storage check" to the monthly field visit checklist.`,
      practice_task_md: `**Goal:** give your own phone a full support check. Everything here works on any Android phone.

1. Find the Android version and the date of the last security update. Install any waiting updates when you have Wi-Fi or enough data.
2. Check storage. Free at least some space safely (old WhatsApp media, unused apps) and note how much you freed.
3. Confirm Google backup is on and see when it last ran.
4. Check the screen lock is set and that Play Protect is on.
5. Open the find, lock and erase page (linked to this topic) on another device or browser and confirm your phone appears.
6. Write a one page "phone health check" that a field officer could follow.

**Done looks like:** notes from each step and a phone health checklist for staff.`,
      quiz: {
        questions: [
          {
            prompt: "Which account controls the Play Store, backups and the find, lock and erase feature on Android?",
            options: ["The SIM card", "The Google account", "The WhatsApp account", "The MoMo wallet"],
            answer_index: 1,
            explanation: "Android phones are tied to a Google account for these services.",
          },
          {
            prompt: "A field officer's phone is slow and apps crash. What is a common first check?",
            options: [
              "Whether storage is full",
              "The colour of the case",
              "The brand of the charger",
              "The ringtone volume",
            ],
            answer_index: 0,
            explanation: "Full storage causes slowness, crashes and failed updates.",
          },
          {
            prompt: "Why are app files sent on WhatsApp (APK files) risky?",
            options: [
              "They use too much battery",
              "They cannot be opened",
              "They are a common way scammers take over phones",
              "They only work on tablets",
            ],
            answer_index: 2,
            explanation: "Install apps only from the Play Store or an approved source.",
          },
          {
            prompt: "What do mobile device management tools let an organisation do?",
            options: [
              "Make phone calls cheaper",
              "Charge phones faster",
              "Increase signal strength",
              "Push apps and settings, require screen locks and wipe work data from lost phones",
            ],
            answer_index: 3,
            explanation: "MDM tools manage many phones centrally.",
          },
        ],
        pass_threshold: 75,
      },
    },
    networking: {
      explanation_md: `## Why this matters

"The system is down" is one of the most common calls in any Ghanaian office. A bank teller cannot reach the core banking system, a school cannot open its results portal, a shop's till cannot confirm MoMo payments. Very often the cause is the network: a cable, a router, an expired data bundle, a wrong address or a name that cannot be found. IT support adverts in Ghana ask again and again for network troubleshooting, LAN and Wi-Fi knowledge, router and switch setup and basic networking concepts. Network certifications such as CCNA and Network+ appear as preferred qualifications in several of them.

## The big picture

A network is two or more devices connected so they can share information. A small office network usually looks like this:

* An **internet connection** from a provider: a fibre box, a 4G or 5G router, or a pocket MiFi running on a data bundle.
* A **router** that connects the office to the internet, hands out addresses and often provides Wi-Fi.
* A **switch** with many ports, so several wired computers, printers and phones can join.
* **Access points** that spread Wi-Fi to other rooms.
* **Cables**, usually Ethernet, linking it together.

A local area network (LAN) is the network inside one building. A wide area network (WAN) links distant sites, such as a bank's branches in Tamale and Accra.

## How devices find each other

Two ideas sit under almost everything:

* **Addresses.** Every device needs an IP address, like a house number, so data reaches the right place. The router normally gives these out automatically.
* **Names.** People type names like a bank's website; DNS turns those names into addresses.

When you understand addresses and names, most network faults become puzzles you can solve step by step.

## What this section covers

* **IP addresses and DHCP:** private and public addresses, the gateway and how addresses are handed out.
* **DNS:** how names become addresses and how to spot a DNS problem.
* **Wireless, routers and cabling:** how a small office network fits together and how to secure and improve it.
* **Finding network faults:** the simple tools (\`ping\`, \`ipconfig\`, traceroute) and a step by step approach.

## Phone or computer?

Much of this section works on a phone. Android shows the Wi-Fi network's details, including your device's IP address, the gateway and signal strength, under the Wi-Fi settings. The command tools are best practised on a Windows or Linux computer at a lab or library. Free networking courses from Cisco Networking Academy and others can go deeper when you are ready.

## A small example

Sumaila is called to a hardware shop in Wa where "the internet is off". He checks the pocket router first: its data bundle has run out. After a top up, everything works. He shows the owner how to check the balance and sets a reminder. Not every network fault is technical, but you only find that out by checking in order.`,
      practice_task_md: `**Goal:** draw a real network.

1. Choose a network you can see: your home, a family shop, a church office, a school lab or a cyber cafe (ask permission).
2. Find the internet connection (fibre box, router, MiFi), any switches or access points, and what connects to what.
3. Draw a simple diagram on paper or in a free drawing app: internet, router, switch, devices. Label wired and wireless connections.
4. On your phone, open the Wi-Fi network details and write down your IP address and the gateway address.
5. Write two lines on what would stop working if the router failed, and if the switch failed.

**Done looks like:** a labelled network diagram with your phone's address and gateway, ready to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What is a LAN?",
            options: [
              "A network linking branches in different cities",
              "The network inside one building",
              "A type of printer",
              "A mobile money service",
            ],
            answer_index: 1,
            explanation: "A local area network covers one building or site; a WAN links distant sites.",
          },
          {
            prompt: "Which device connects the office to the internet and usually hands out addresses?",
            options: ["The router", "The monitor", "The keyboard", "The UPS"],
            answer_index: 0,
            explanation: "The router links the LAN to the internet and normally runs DHCP.",
          },
          {
            prompt: "What does a switch do?",
            options: [
              "Turns names into addresses",
              "Stores backups",
              "Provides many ports so several wired devices can join the network",
              "Charges laptops",
            ],
            answer_index: 2,
            explanation: "A switch lets many wired devices connect to the same network.",
          },
          {
            prompt: "In the Wa example, why was the internet off?",
            options: [
              "The router was stolen",
              "A virus had spread",
              "The DNS server was broken",
              "The pocket router's data bundle had run out",
            ],
            answer_index: 3,
            explanation: "Checking in order found a simple cause: an empty data bundle.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "ip-addresses": {
      explanation_md: `## Why this matters

When a computer "has internet but cannot see the printer", or two devices keep knocking each other off the network, the cause is often an addressing problem. IT support adverts in Ghana list TCP/IP, LAN setup and network configuration. Understanding IP addresses lets you read what a device is telling you and fix it quickly.

## What an IP address is

An IP address identifies a device on a network, like a house number on a street. The common kind, IPv4, is four numbers from 0 to 255 separated by dots, for example \`192.168.1.25\`. A newer kind, IPv6, uses longer addresses with letters and colons; you will see both in settings.

## Private and public addresses

* **Private addresses** are used inside a building's network. They usually start with \`192.168.\`, \`10.\` or \`172.16.\` to \`172.31.\`. The same private addresses are reused in millions of homes and offices, which is fine because they never appear on the internet directly.
* **Public addresses** are given by your internet provider and are what the wider internet sees. The router translates between the private addresses inside and the public address outside. This is called NAT (network address translation).

## The settings every device needs

* **IP address:** the device's own address.
* **Subnet mask:** tells the device which addresses are on its local network. \`255.255.255.0\` is common in small offices, meaning devices from \`192.168.1.1\` to \`192.168.1.254\` are neighbours.
* **Default gateway:** the router's address, the door to everything outside the local network.
* **DNS server:** the address that turns names into addresses (next lesson).

## DHCP: addresses handed out automatically

Typing these settings into every device would be slow and error prone. Instead, a DHCP server (usually the router) hands them out when a device joins, for a period called a lease. If a Windows computer shows an address starting \`169.254.\`, it means it asked for an address and nobody answered: check the cable, the Wi-Fi connection or whether DHCP is working.

## Fixed addresses

Printers, servers and cameras should keep the same address so others can always find them. You can set the address on the device itself (static), or better, tell the router to always give that device the same address (a DHCP reservation). If someone types a static address that DHCP also gives out, two devices clash, and both can lose connection. That is an address conflict.

## A small example

Issahaku supports a school in Yendi. The office printer keeps disappearing. He runs \`ipconfig\` on a staff laptop and checks the printer's configuration page: the printer was set by hand to \`192.168.1.20\`, which the router also gives out to laptops. Some mornings a laptop gets that address first and the printer drops off. He creates a DHCP reservation for the printer and removes the manual setting. The conflicts stop.`,
      practice_task_md: `**Goal:** read and explain real address settings.

1. On your phone, open the details of the Wi-Fi network you are connected to and note the IP address, gateway and (if shown) subnet mask or prefix length and DNS.
2. If you can use a Windows computer, run \`ipconfig /all\` in Command Prompt and find the same values, plus the DHCP lease times.
3. Decide for each address: private or public? Explain how you know.
4. Write a short note explaining to a shop owner, in plain words, why their receipt printer should have a reserved address.

**Done looks like:** a filled in table of your settings with each one explained in your own words, plus the plain language note.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a private IPv4 address?",
            options: ["8.8.8.8", "192.168.1.25", "300.1.1.1", "41.66.200.1"],
            answer_index: 1,
            explanation: "Addresses starting 192.168. are in a private range used inside networks.",
          },
          {
            prompt: "What is the default gateway?",
            options: [
              "The router's address, the way out to other networks",
              "The fastest website",
              "The printer's serial number",
              "The Wi-Fi password",
            ],
            answer_index: 0,
            explanation: "Devices send traffic for outside networks to the gateway, usually the router.",
          },
          {
            prompt: "What does DHCP do?",
            options: [
              "Deletes old files",
              "Speeds up printing",
              "Hands out IP settings automatically when devices join",
              "Encrypts email",
            ],
            answer_index: 2,
            explanation: "DHCP gives each device its address, mask, gateway and DNS settings.",
          },
          {
            prompt: "A Windows computer shows an address starting 169.254. What does this suggest?",
            options: [
              "The computer is very fast",
              "It has a public address",
              "It is connected to a printer",
              "It asked for an address and no DHCP server answered",
            ],
            answer_index: 3,
            explanation: "A 169.254 address means DHCP failed, so check the connection and router.",
          },
          {
            prompt: "In the Yendi example, what fixed the disappearing printer?",
            options: [
              "A DHCP reservation for the printer instead of a clashing manual address",
              "Buying a new laptop",
              "Changing the printer's paper",
              "Turning off the internet",
            ],
            answer_index: 0,
            explanation: "The manual address clashed with DHCP; a reservation removed the conflict.",
          },
        ],
        pass_threshold: 80,
      },
    },
    dns: {
      explanation_md: `## Why this matters

Sometimes users say "WhatsApp works but no websites open" or "the internet works but our company portal does not". These half working problems are often DNS problems. IT support adverts in Ghana ask for network troubleshooting and configuration, and DNS is one of the first things an experienced technician checks.

## What DNS does

Computers reach each other using IP addresses, but people remember names. DNS (the Domain Name System) is the internet's directory: it turns a name such as \`example.com\` into the IP address of the server that hosts it.

When you type a website name:

1. Your device checks whether it already knows the answer (it keeps a short memory called a cache).
2. If not, it asks its DNS server, usually given by the router through DHCP. This may be the internet provider's server or a public one.
3. That server finds the answer, asking other DNS servers across the internet if needed, and replies with the address.
4. Your device connects to that address.

All this usually takes a fraction of a second.

## Records you will hear about

* **A record:** links a name to an IPv4 address (AAAA does the same for IPv6).
* **MX record:** says which server receives email for a domain. When an organisation moves its email to a new provider, MX records change.
* **CNAME:** an alias pointing one name at another.

As a support technician you will not usually change these, but knowing them helps you understand what the website or email provider is asking for.

## Spotting a DNS problem

The classic sign: you can reach an IP address but not a name. On a computer:

\`\`\`
ping 8.8.8.8
ping example.com
nslookup example.com
\`\`\`

If the first ping works but the second says it cannot find the host, and \`nslookup\` fails, the connection is fine and DNS is the problem. (\`8.8.8.8\` is a public DNS server run by Google, often used as a test address.)

Fixes to try:

* Restart the router, which often holds the DNS setting.
* Clear the computer's DNS cache with \`ipconfig /flushdns\` on Windows.
* Check the DNS server setting on the device or the router. If the provider's DNS is failing, a reliable public DNS server can be set on the router, with the manager's approval.
* If only one company website fails, the problem may be with that site's own DNS records. Report it to whoever manages the site.

## A small example

Hawa supports an NGO office in Tamale. Staff can use WhatsApp but no websites open. She runs \`ping 8.8.8.8\`, which works, then \`nslookup\` for a news website, which fails. She logs in to the router and sees the DNS server was set by hand to an old address from a previous provider. She sets it back to automatic, restarts the router, and websites load again.`,
      practice_task_md: `**Goal:** watch DNS working.

1. On your phone, open the Wi-Fi network details and find the DNS server address, if shown.
2. If you can use a computer, run \`nslookup\` for three websites you use (for example a Ghanaian news site, a university site and a search engine) and write down the addresses returned.
3. Run \`ping\` to one of those names and check it uses the same address.
4. Write a short "DNS or not?" decision guide: two tests and what each result means.

**With only a phone:** do step 1, then write the decision guide from this lesson and explain it aloud to a friend.

**Done looks like:** your results or notes, and a decision guide a colleague could follow.`,
      quiz: {
        questions: [
          {
            prompt: "What does DNS do?",
            options: [
              "Turns names into IP addresses",
              "Charges laptops",
              "Prints documents",
              "Hands out data bundles",
            ],
            answer_index: 0,
            explanation: "DNS is the directory that turns names into addresses.",
          },
          {
            prompt: "`ping 8.8.8.8` works but `ping example.com` cannot find the host. What is the likely problem?",
            options: ["A broken screen", "DNS", "A paper jam", "Low battery"],
            answer_index: 1,
            explanation: "The connection works by address, so name lookup (DNS) is failing.",
          },
          {
            prompt: "Which DNS record says which server receives email for a domain?",
            options: ["A record", "CNAME", "MX record", "AAAA record"],
            answer_index: 2,
            explanation: "MX records point to the mail server for a domain.",
          },
          {
            prompt: "Which Windows command clears the computer's DNS cache?",
            options: ["`ipconfig /flushdns`", "`ping`", "`mkdir`", "`df -h`"],
            answer_index: 0,
            explanation: "`ipconfig /flushdns` clears stored DNS answers.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "wifi-and-routers": {
      explanation_md: `## Why this matters

Setting up and fixing small office networks is everyday work for IT support in Ghana: a new branch office, a school computer lab, a clinic, a guest house. Adverts mention routers, switches, LAN cabling, Wi-Fi and network security. Getting a small network right the first time prevents months of complaints.

## The pieces

* **Internet connection.** A fibre box from the provider, a 4G or 5G router with a SIM, or a pocket MiFi. Many offices outside big cities rely on mobile data, so watch bundle balances.
* **Router.** Connects the local network to the internet, hands out addresses (DHCP), translates addresses (NAT), usually runs a basic firewall, and often provides Wi-Fi. Many home and small office units combine all these in one box.
* **Switch.** Adds wired ports. Wired connections are faster and more reliable than Wi-Fi, so use them for desktops, printers and servers.
* **Access points.** Extra Wi-Fi radios connected by cable to spread coverage. Better than cheap repeaters, which can halve speed.
* **Cables.** Ethernet cables (category 5e or 6) with RJ45 plugs. A single run should stay under about 100 metres. Protect cables from feet, chairs, rats and sun.

## Wi-Fi basics

* **Bands.** 2.4 GHz reaches further and passes walls better but is slower and more crowded. 5 GHz is faster but shorter range. Many routers offer both.
* **Placement.** Put the router or access point high, central and in the open, not on the floor or inside a metal cabinet. Thick block walls and metal roofs weaken signal.
* **Channels.** If many neighbours use the same channel, try another in the router settings.

## Securing a small network

1. Change the router's default admin password. Many routers ship with a well known one printed on the label.
2. Use WPA2 or, if all devices support it, WPA3 security with a long Wi-Fi password, not something like \`office123\`.
3. Create a separate guest network for visitors and customers, so they cannot see staff computers and printers.
4. Update the router's firmware from the maker's official page.
5. Turn off WPS and remote management unless you really need them.
6. Write down settings in a safe, private place and share passwords only with people who need them.

## A small example

Wumpini sets up Wi-Fi for a guest house in Bolgatanga. Guests complain the signal is weak upstairs. Instead of a cheap repeater, she runs a cable up to a second access point, sets the same network name on both, and creates a separate guest network so guests cannot reach the reception computer. She changes the router's admin password and writes the settings in the owner's private notebook.`,
      practice_task_md: `**Goal:** design and check a small office network.

1. Imagine a two room office in Tamale with four staff laptops, one desktop, one printer and visitors who need Wi-Fi.
2. Draw the network: internet connection, router, switch, access point(s), and which devices are wired or wireless.
3. Write a security checklist for it using the six steps in this lesson.
4. On your own phone or home router (only with the owner's permission), check: which band you are using, the security type (WPA2 or WPA3), and whether a guest network exists. Do not change settings on a router you do not own.

**Done looks like:** a labelled design, a security checklist and notes from the real check.`,
      quiz: {
        questions: [
          {
            prompt: "Why should desktops, printers and servers use wired connections where possible?",
            options: [
              "Cables look nicer",
              "Wired connections are faster and more reliable than Wi-Fi",
              "Wi-Fi cannot reach printers",
              "Cables never need a switch",
            ],
            answer_index: 1,
            explanation: "Wired links are more reliable and faster, so they suit fixed devices.",
          },
          {
            prompt: "Which Wi-Fi band reaches further and passes walls better?",
            options: ["5 GHz", "2.4 GHz", "Both are identical", "Neither carries data"],
            answer_index: 1,
            explanation: "2.4 GHz has more range; 5 GHz is faster but shorter range.",
          },
          {
            prompt: "What is the first security step on a new router?",
            options: [
              "Change the default admin password",
              "Paint the router",
              "Share the Wi-Fi password publicly",
              "Turn on WPS",
            ],
            answer_index: 0,
            explanation: "Default admin passwords are often well known, so change them first.",
          },
          {
            prompt: "Why create a guest network for visitors?",
            options: [
              "To make the internet free",
              "To speed up printing",
              "To charge guests more",
              "So visitors cannot see staff computers and printers",
            ],
            answer_index: 3,
            explanation: "A guest network keeps visitors separate from the staff network.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "network-troubleshooting": {
      explanation_md: `## Why this matters

When a network fault stops a bank branch or a school office, people need it fixed fast, and they need you to stay calm. Adverts for IT support and NOC roles in Ghana ask for network troubleshooting, connectivity support and monitoring. A clear routine with a few free tools lets you find where a connection breaks in minutes.

## Work from near to far

Test in order from the device outwards. Each step that works rules out everything before it.

1. **Physical.** Is the device on? Is the cable plugged in at both ends, with lights on the port? Is Wi-Fi switched on and connected to the right network? Is the router powered, and is the data bundle or fibre service active?
2. **Address.** Run \`ipconfig\` (Windows) or \`ip a\` (Linux), or look in phone Wi-Fi details. A normal private address and a gateway mean DHCP worked. A \`169.254.\` address means it did not.
3. **Local network.** Ping the gateway (the router), for example \`ping 192.168.1.1\`. Replies mean the device can reach the router.
4. **Internet by address.** \`ping 8.8.8.8\`. Replies mean the router reaches the internet.
5. **Internet by name.** \`ping example.com\` or \`nslookup example.com\`. If step 4 works but this fails, it is DNS.
6. **The specific service.** If everything above works, the problem may be the website, the application or the user's account, not the network.

## The tools

\`\`\`
ipconfig          # Windows address settings
ipconfig /all     # more detail, DNS, DHCP
ping 192.168.1.1  # can I reach this address?
tracert 8.8.8.8   # Windows: list each hop on the way
traceroute 8.8.8.8  # Linux version
nslookup example.com  # ask DNS for an address
\`\`\`

Reading \`ping\`: replies with times in milliseconds mean the path works; "request timed out" means no reply (some devices block ping, so confirm with other tests). Very high or jumping times suggest a congested or poor link. \`tracert\` shows where along the path the replies stop, which helps you tell whether the fault is inside the office or with the provider.

## Ask the scope question

Is it one device, one room, or everyone? One device points to that device's cable, Wi-Fi or settings. Everyone points to the router, the switch, the provider or power. Check whether anything changed recently: a new cable, a moved desk, a router restart, a power cut.

## When it is the provider

If the router cannot reach the internet and restarting does not help, contact the provider with facts: what you tested, the results and times. Clear evidence gets faster help.

## A small example

Mariama gets a call from a microfinance branch in Savelugu: no one can reach the core system. She works through the steps remotely with a staff member. Addresses look normal, the gateway replies, but \`ping 8.8.8.8\` times out. The router's internet light is red. She calls the provider with her test results; they confirm a fibre cut nearby and switch the branch to a backup mobile link while they repair it.`,
      practice_task_md: `**Goal:** run the near to far routine and write it up.

**With a computer (lab, library or your own):**
1. Run \`ipconfig\` and note your address and gateway.
2. Ping the gateway, then \`8.8.8.8\`, then a website name. Note the results and times.
3. Run \`tracert\` (Windows) or \`traceroute\` (Linux) to a website and count the hops.
4. Run \`nslookup\` for the same website.

**With only a phone:** check Wi-Fi details for your address and gateway, then switch between Wi-Fi and mobile data and note what changes.

5. Either way, write a one page "network fault checklist" with the six steps, in plain words, that a junior colleague could follow.

**Done looks like:** your test results or phone notes, and a checklist you could pin beside an office router.`,
      quiz: {
        questions: [
          {
            prompt: "Which step comes first in the near to far routine?",
            options: [
              "Call the internet provider",
              "Check physical things like power, cables and Wi-Fi connection",
              "Reinstall the operating system",
              "Run tracert to a website",
            ],
            answer_index: 1,
            explanation: "Start with the physical layer before testing addresses and beyond.",
          },
          {
            prompt: "You can ping the gateway but not 8.8.8.8. Where is the problem most likely?",
            options: [
              "Between the router and the internet",
              "In the user's keyboard",
              "In the DNS cache only",
              "In the printer driver",
            ],
            answer_index: 0,
            explanation: "The device reaches the router, so the break is beyond it, towards the provider.",
          },
          {
            prompt: "What does `tracert` show?",
            options: [
              "Your Wi-Fi password",
              "Free disk space",
              "Each hop along the path and where replies stop",
              "The printer queue",
            ],
            answer_index: 2,
            explanation: "Traceroute lists each router on the path, helping locate the fault.",
          },
          {
            prompt: "Everyone in the office has lost internet. What does this suggest?",
            options: [
              "One user's laptop is broken",
              "A single faulty mouse",
              "A wrong password on one account",
              "A shared device such as the router, switch, provider or power",
            ],
            answer_index: 3,
            explanation: "When everyone is affected, look at shared equipment and services.",
          },
          {
            prompt: "In the Savelugu example, what did Mariama give the provider?",
            options: [
              "Her test results and times",
              "A guess that it might be the weather",
              "The staff passwords",
              "Nothing, she just waited",
            ],
            answer_index: 0,
            explanation: "Clear evidence from tests helps the provider act faster.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
