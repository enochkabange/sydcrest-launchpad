import type { TrackContent } from "./types";

/**
 * Original lesson content for the Freelancing and Getting Paid roadmap
 * (issue #198, process from issue #84).
 * Research and sources: src/content/research/freelancing.md.
 * Money from abroad and tax lessons state only what the current Bank of Ghana
 * and Ghana Revenue Authority pages say (read 27 October 2026); everything
 * else tells the learner how to check. No payment company is named.
 */
const content: TrackContent = {
  roadmap: "freelancing",
  nodes: {
    "freelancing-basics": {
      explanation_md: `Many of the skills you learn on SydCrest, such as design, social media, data work, writing, virtual assistance and web development, can be sold directly to clients. You do not have to wait for one employer to hire you full time. A shop in Tamale might need a price list designed this week. An NGO in Bolgatanga might need survey data cleaned this month. A small company in another country might need someone to edit short videos every Friday. Each of these is freelance work.

## What this section covers

* **What freelancing is and is not.** How it differs from a salaried job, and why apps that promise money for liking posts are not freelancing.
* **Choosing a service and a niche.** Why clients hire you for one clear result, and how to pick the result you can deliver well.
* **Your toolkit.** The free apps that handle the admin side, and honest guidance on which services need a laptop.

## Why start here

Freelancing is a very small business with one employee: you. You find the client, agree the work, deliver it, send the invoice and follow up on payment. Nobody else does those jobs for you. That can feel like a lot, but each part is a skill you can learn, and this roadmap teaches them one at a time.

This track sits beside your main skill track, not instead of it. Freelancing does not give you a skill to sell; it helps you sell the skill you are building. If you are still early in graphic design or data, keep learning there and use this roadmap in parallel, so that when your skill is ready you already know how to find clients and get paid safely.

## A small example

Issahaku has finished the first half of the graphic design track. He can make clean flyers and simple logos in a free design app. His aunt runs a catering business in Wa and needs a menu card for weddings and funerals.

If Issahaku only thinks like a designer, he makes the menu and hopes his aunt gives him something. If he thinks like a freelancer, he does a few more things. He asks what she needs the menu for and when. He agrees a price, even a small family price, and writes it down in a message. He delivers on the agreed day. He asks if he can show the menu in his portfolio. He asks her which other caterers or event planners might need the same thing.

The design work is the same in both cases. The second way turns one favour into a sample, a reference and possibly the next client.

## What you will be able to do by the end of the roadmap

* Explain clearly what you offer and who it is for.
* Show proof of your skill in a simple portfolio.
* Find clients near you and online, and spot scams before they cost you.
* Write proposals, set prices in cedis and agree simple written terms.
* Get paid by local clients and clients abroad through legal routes, and keep records for tax.
* Build a reputation that brings repeat work.

Take the lessons in order the first time. Later you can come back to any lesson when a real client situation needs it.`,
      practice_task_md: `**Goal:** Write a one paragraph picture of the freelance work you want to do.

**Steps:**
1. Open a notes app or a document on your phone or computer.
2. Write which SydCrest track or skill you are building, and how far along you are.
3. Write two or three small jobs you could already do for someone today, even if they are simple. For example: a birthday flyer, a cleaned contact list, a week of Facebook posts.
4. Write one person you know who might need one of those jobs, and why.
5. Write one part of the business side (finding clients, pricing, getting paid, contracts) that worries you most.

**Done looks like:** A short paragraph naming your skill, two or three jobs you can do now, one possible first client and the business skill you most want to improve. Keep it; you will build on it in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, why is freelancing described as a very small business?",
            options: [
              "Because freelancers must register a company before they start",
              "Because you do every part yourself: finding clients, agreeing work, delivering and getting paid",
              "Because freelancers only work for small businesses",
              "Because freelancing pays less than a salaried job",
            ],
            answer_index: 1,
            explanation: "The lesson says a freelancer is a business with one employee who handles every stage of the work.",
          },
          {
            prompt: "How does this track relate to your main skill track?",
            options: [
              "It replaces your main track once you start freelancing",
              "It teaches the skill you will sell, so you do not need another track",
              "It sits beside your main track and helps you sell the skill you are building",
              "It should only be started after you have finished every other track",
            ],
            answer_index: 2,
            explanation: "The lesson says freelancing helps you sell a skill and can be learned in parallel with your main track.",
          },
          {
            prompt: "In the example, what did Issahaku do differently when he thought like a freelancer?",
            options: [
              "He used a more expensive design app",
              "He refused to work for family",
              "He asked about the need, agreed a price in writing, delivered on time and asked for permission and referrals",
              "He made the menu faster and skipped talking to his aunt",
            ],
            answer_index: 2,
            explanation: "The design work stayed the same; the business steps around it turned a favour into a sample and possible new clients.",
          },
          {
            prompt: "Which of these is listed as something you will be able to do by the end of the roadmap?",
            options: [
              "Get paid from abroad through legal routes and keep records for tax",
              "Guarantee a fixed monthly income from freelancing",
              "Skip contracts because clients always pay",
              "Avoid learning any new tools",
            ],
            answer_index: 0,
            explanation: "Getting paid locally and from abroad through legal routes, with records for tax, is one of the listed outcomes.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-freelancing-is": {
      explanation_md: `Before you look for clients, be clear about what freelancing really involves. People who start with the wrong picture often give up early, or fall for schemes that only look like work.

## What freelancing is

A freelancer sells a specific service to clients, usually one project at a time or for a fixed number of hours each month. You might design a logo for a school, manage a church's Facebook page for three months, or type up an NGO's survey forms. When the work ends, the arrangement ends, unless the client hires you again.

Because nobody employs you, every business task falls on you:

* **Finding work.** No manager hands you tasks. You look for clients and convince them to hire you.
* **Agreeing terms.** You and the client decide what will be done, by when and for how much.
* **Delivering.** You manage your own time and meet your own deadlines.
* **Getting paid.** You send invoices, check payments arrive and follow up when they do not.
* **Records and tax.** You keep track of income and costs and deal with the tax office yourself.

## How it differs from a salaried job

In a salaried job, someone pays you every month as long as you keep the job, and the employer handles things like tax deductions. As a freelancer, income can be uneven: a busy month can be followed by a quiet one. In return you choose your clients, can work for several at once and can build your own name.

Many people combine the two. A teaching assistant in Damongo might design flyers for local events at weekends. A national service person might take small data entry jobs in the evenings. Starting part time while you build a portfolio is sensible.

## What freelancing is not

Some apps and groups promise money for liking posts, watching videos, rating products or recruiting friends. They often pay a few cedis at first, then ask you to deposit money to unlock bigger tasks or to withdraw what you have earned. Ghana's Cyber Security Authority has warned about exactly this pattern. That is not freelancing. Real clients pay you for a useful result; they never ask you to pay them to work.

Freelancing is also not a shortcut around learning a skill. Clients hire you because you can produce something they need. That is why a real skill from another SydCrest track comes first, and this track helps you sell it.

## A small example

Hawa and Amina both finish a social media course. Hawa joins a group that promises daily pay for following accounts. After two small payments she is asked for a deposit to unlock VIP tasks. She stops and reports it.

Amina offers to run the Instagram page of a hair salon near her house in Tamale for one month at an agreed price. She plans the posts, shares a weekly update with the owner and is paid at the end of the month. At the end, the owner asks her to continue. Amina is freelancing; Hawa was being targeted by a scam.`,
      practice_task_md: `**Goal:** Check that you understand the business tasks a freelancer handles.

**Steps:**
1. In a note on your device, write the five business tasks from the lesson: finding work, agreeing terms, delivering, getting paid, records and tax.
2. Next to each one, write one thing you already do well that could help. For example, "I already keep a notebook of money for my mother's provisions shop" helps with records.
3. Next to each one, write one thing you need to learn.
4. Write two sentences explaining to a friend why a task app that asks for a deposit is not freelancing.

**Done looks like:** A short table or list with five rows, each with a strength and a gap, plus your two sentence explanation. Share it with a mentor or study partner if you have one.`,
      quiz: {
        questions: [
          {
            prompt: "Which statement best describes a freelancer?",
            options: [
              "Someone employed full time by one company who works from home",
              "Someone who sells a specific service to clients, often one project at a time",
              "Someone who earns money by liking posts on social media apps",
              "Someone who must work only for clients in other countries",
            ],
            answer_index: 1,
            explanation: "The lesson defines a freelancer as someone who sells a specific service, usually per project or for a set number of hours.",
          },
          {
            prompt: "What is one honest difference between freelancing and a salaried job?",
            options: [
              "Freelance income can be uneven from month to month",
              "Freelancers never need to deal with tax",
              "Salaried workers choose all their own clients",
              "Freelancers are always paid more",
            ],
            answer_index: 0,
            explanation: "The lesson says a busy freelance month can be followed by a quiet one, unlike a regular salary.",
          },
          {
            prompt: "An app pays you a few cedis for liking posts, then asks for a deposit to unlock bigger tasks. What is it?",
            options: [
              "A normal freelance marketplace",
              "A training programme",
              "A pattern the Cyber Security Authority has warned about as a scam",
              "A salaried job with a probation period",
            ],
            answer_index: 2,
            explanation: "The lesson explains that real clients never ask you to pay to work and that the CSA has warned about this pattern.",
          },
          {
            prompt: "Why does a real skill from another track come before freelancing?",
            options: [
              "Because clients hire you to produce something they need",
              "Because marketplaces only accept people with certificates",
              "Because freelancing is only allowed after age 25",
              "Because tax registration requires a skill certificate",
            ],
            answer_index: 0,
            explanation: "The lesson says freelancing is not a shortcut; clients pay for a useful result you can produce.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "choosing-your-service": {
      explanation_md: `Clients rarely hire "someone who is good with computers". They hire someone to get a specific result: a logo, a month of posts, a cleaned spreadsheet, a working website, a set of typed minutes. The clearer your offer, the easier it is for a client to say yes, and the easier it is for you to price, plan and deliver.

## A service is a result, not a skill

A skill is what you can do, such as "Canva" or "Excel". A service is what a client gets, such as "a full set of price list, flyer and WhatsApp status images for your shop" or "your customer list cleaned and sorted so you can send reminders". Write your service from the client's side: what will they have when you finish?

## Choose something you can already deliver well

Look at what you can produce today without guessing. If you have only just started video editing, offering full promotional films is risky. Offering simple captioned clips from footage the client sends you may be realistic. Start with the smaller service you can do excellently, then grow.

Ask yourself three questions:

* **Can I do it well now?** Could you show a sample this week?
* **Does someone need it and pay for it?** Look at local businesses and online postings. Do they ask for this?
* **Can I deliver it with my tools and data?** Some services need a laptop, strong internet or paid software.

## Choose a type of client, called a niche

A niche is a group of clients with similar needs. Examples: schools, NGOs, churches, market traders, restaurants, small hotels, event planners, or a type of client abroad such as small online shops. You do not need to refuse other clients. The niche guides your samples, your words and where you look for work.

A niche helps because similar clients have similar problems. Once you have made menus for two chop bars, you understand what the third one needs, and your samples speak directly to them.

## A small example

Fuseini can use spreadsheets and has done the data track. At first he describes himself as "data analyst, Excel, Power BI, typing, anything". Nobody responds.

He changes his offer to: "I help NGOs in the Northern Region turn paper survey forms into clean spreadsheets with simple summary charts." He builds one sample from a made up survey about school attendance, clearly labelled as a practice sample. When he contacts two NGO offices in Tamale, they understand at once what he does and one asks for a price.

## Write it in one sentence

A useful pattern is: **I help [type of client] get [result] by [what you do].** For example: "I help caterers in Wa get more event bookings by designing clear menus and WhatsApp flyers." Keep the sentence honest. Only promise results you can deliver and do not promise things you cannot control, such as a certain number of new customers.

Your service can change later as your skill grows. For now, one clear offer beats a long list of everything you might do.`,
      practice_task_md: `**Goal:** Write your service sentence and test it.

**Steps:**
1. List three things you can already produce well, each written as a result a client receives.
2. For each one, answer the three questions from the lesson: can I do it well now, does someone pay for it, can I deliver it with my tools and data?
3. Pick the strongest one and choose one niche, such as schools, NGOs, traders or restaurants.
4. Write your offer as: "I help [client] get [result] by [what you do]."
5. Send the sentence to two people you trust and ask: "Do you understand exactly what I do and who it is for?" Rewrite it if they hesitate.

**Done looks like:** One clear, honest service sentence, with notes on the feedback you received.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between a skill and a service, according to the lesson?",
            options: [
              "There is no difference; the words mean the same thing",
              "A skill is what you can do; a service is the result a client receives",
              "A service is free; a skill is paid",
              "A skill is only for local clients and a service is only for foreign clients",
            ],
            answer_index: 1,
            explanation: "The lesson says to describe your service from the client's side as the result they get.",
          },
          {
            prompt: "What is a niche?",
            options: [
              "A group of clients with similar needs that you aim your offer at",
              "A tool you must pay for before you can freelance",
              "A type of contract used only abroad",
              "A list of every service you could possibly offer",
            ],
            answer_index: 0,
            explanation: "The lesson defines a niche as a group of clients with similar needs, such as schools or NGOs.",
          },
          {
            prompt: "Why did Fuseini start getting responses?",
            options: [
              "He listed more software names in his profile",
              "He lowered his price to zero",
              "He made a clear offer for one type of client and showed a matching sample",
              "He claimed years of experience he did not have",
            ],
            answer_index: 2,
            explanation: "His clear offer to NGOs plus a relevant practice sample made it easy for clients to understand what he does.",
          },
          {
            prompt: "Which of these service sentences follows the lesson's advice best?",
            options: [
              "I do everything on computers for anyone",
              "I guarantee 100 new customers every month",
              "I help schools in Bolgatanga get clear term newsletters by writing and designing them",
              "Excel, Canva, Word, typing, social media, video",
            ],
            answer_index: 2,
            explanation: "It names the client and the result, and it does not promise things outside your control.",
          },
          {
            prompt: "Which question is one of the three to ask before choosing a service?",
            options: [
              "Is this the most expensive service I can think of?",
              "Can I deliver it with my tools and data?",
              "Have I got a business degree?",
              "Will this service make me famous?",
            ],
            answer_index: 1,
            explanation: "The lesson asks whether you can do it well now, whether someone pays for it and whether you can deliver it with your tools and data.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "freelance-toolkit": {
      explanation_md: `Your skill does the work, but a handful of everyday tools keep the business running: talking to clients, tracking deadlines, storing files and sending documents. The good news is that most of these tools are free and work in a browser or an app on any device.

## The core toolkit

* **A professional email address.** Use your real name, such as wumpini.alhassan at a free email service. Avoid nicknames and numbers that look careless. Remote clients in particular expect email.
* **A messaging app with a business profile.** Many local clients prefer WhatsApp. A business profile lets you show your service, hours and a short catalogue, and keeps client chats separate from family groups if you use a separate number.
* **A calendar.** Put every deadline, call and payment date in it, with a reminder a day before.
* **Cloud storage.** Keep client files in folders named by client and project, so they are safe if your device is lost and easy to share with a link.
* **Documents and spreadsheets.** Use them for proposals, simple agreements, invoices and a record of every job and payment.
* **Video calls.** Some clients want a short call before hiring you. Test your microphone and camera, find a quiet spot and join a few minutes early.

All of these are available free from more than one company. Pick one set and use it consistently, so you always know where things are.

## Which services need a laptop

You can handle admin, client messages, simple designs, social media scheduling and much writing on a phone. Some services are much harder without a computer:

* **Video editing for clients**, especially longer videos or work that needs several layers, because editing apps on computers handle large files and precise timing better.
* **Web development**, because you need a code editor, several browser tabs and testing tools side by side.
* **Heavy spreadsheet or data work**, such as large files, pivot tables and dashboards.

Check what your service needs before you promise a deadline. If you share a computer at school, a hub or a cyber cafe, plan your work around the hours you can use it, and never leave client files or logged in accounts on a shared machine.

## Data and power

Large uploads use a lot of data. Upload big files on Wi Fi where you can, compress images before sending, and send links to files in cloud storage instead of attaching them repeatedly. Keep a power bank charged for days when the lights go off near a deadline. Tell clients early if a power or network problem will delay you.

## A small example

Mariama manages social media for two shops in Bolgatanga. Every Sunday she checks her calendar for the week, drafts posts in a shared document, gets approval from each owner by message and schedules the posts. Each client has a folder in her cloud storage. When her phone was stolen, she signed in on a borrowed device, changed her passwords and all her client work was still there.`,
      practice_task_md: `**Goal:** Set up a basic, organised freelance toolkit.

**Steps:**
1. Create or choose a professional email address that uses your real name.
2. In your cloud storage, create a folder called "Clients" with one sample subfolder, for example "Sample client, menu design".
3. Add one test deadline to your calendar with a reminder the day before.
4. Create a blank spreadsheet called "Jobs and payments" with columns: date, client, job, price, deadline, paid (yes or no).
5. Write down which parts of your chosen service you can do on the device you have, and which would need a computer or more data.

**Done looks like:** A professional email, a client folder, a calendar reminder, a jobs spreadsheet and an honest note about your equipment needs.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest keeping client files in cloud storage?",
            options: [
              "Because cloud storage makes files load faster on a slow network",
              "So files are safe if your device is lost and easy to share with a link",
              "Because clients refuse to accept attachments",
              "So you never need a calendar",
            ],
            answer_index: 1,
            explanation: "Mariama's example shows that cloud storage kept her work safe when her phone was stolen.",
          },
          {
            prompt: "Which service does the lesson say is much easier on a computer?",
            options: ["Replying to client messages", "Scheduling social media posts", "Web development", "Adding a deadline to a calendar"],
            answer_index: 2,
            explanation: "Web development needs a code editor, several tabs and testing tools side by side, which is much easier on a computer.",
          },
          {
            prompt: "What is good practice on a shared computer at a hub or cyber cafe?",
            options: [
              "Save client files on the desktop so you can find them next time",
              "Stay logged in to save data",
              "Never leave client files or logged in accounts on the machine",
              "Share your password with the attendant",
            ],
            answer_index: 2,
            explanation: "The lesson warns never to leave client files or logged in accounts on a shared machine.",
          },
          {
            prompt: "How can you reduce data use when sending large files?",
            options: [
              "Send the same attachment several times to be sure",
              "Upload on Wi Fi where possible and share a cloud link instead of repeated attachments",
              "Avoid compressing images",
              "Only send files at night",
            ],
            answer_index: 1,
            explanation: "The lesson suggests Wi Fi uploads, compressing images and sending links instead of repeated attachments.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-ready": {
      explanation_md: `Before you approach your first client, three things need to be in place: proof that you can do the work, a way for clients to find and check you, and the habit of writing clearly and professionally. This section covers all three.

## Why preparation matters

A client who has never met you is taking a risk. They are trusting you with their money, their deadline and sometimes their reputation. Anything that reduces that risk makes them more likely to hire you. A good sample reduces the risk that the work will be poor. A clear profile reduces the risk that you are not who you say you are. A polite, clear message reduces the risk that working with you will be stressful.

Many online postings say clearly that applications without samples or live links will not be considered. Local clients may not say it, but they think the same way: "Show me something you have done."

## What this section covers

* **A portfolio that proves your skill.** Three to five strong pieces, each presented with the problem, what you did and the result. You will learn how to build samples even before you have paid clients, and how to do it honestly.
* **Profiles and online presence.** How to set up profiles that say in seconds what you do, for whom and how to reach you, on the places your clients actually look.
* **Writing to clients professionally.** How to greet, answer the question asked, confirm details in writing and reply on time.

## Honesty is part of being ready

It can be tempting to borrow someone else's design for your portfolio, use a stock photo instead of your face, or claim experience you do not have. Do not do it. Clients and marketplaces check, and one discovered lie can end your reputation in a small town or close an online account for good. Practice work is fine as long as you label it as practice. A real local job for a small fee, done well, is worth more than any invented project.

## A small example

Sumaila wants to offer bookkeeping spreadsheets to small shops in Tamale. Before approaching anyone, he spends two weeks getting ready:

* He builds two sample spreadsheets, one for a provisions shop and one for a phone accessories stall, with made up figures, clearly marked as samples.
* He sets up a business profile on his messaging app with a short description, his working hours and the two samples in the catalogue.
* He writes a short, polite introduction message and asks a friend to read it.

When a shop owner asks, "What do you do?", Sumaila can answer in one sentence and show proof on the spot. That is what being ready looks like.

## How long should this take?

Not long. Getting ready is not an excuse to wait months until everything is perfect. Aim for a small, honest portfolio and one clear profile, then start talking to clients. You will improve both as real work comes in.`,
      practice_task_md: `**Goal:** Check how ready you are and plan the gaps.

**Steps:**
1. Write the three parts of being ready: proof of skill, a way to be found, clear professional writing.
2. Score yourself from 1 to 5 on each, honestly.
3. For each score below 4, write one action you will take this week. For example: "Make one sample price list for a chop bar."
4. Set a date, no more than three weeks away, by which you will contact your first potential client.

**Done looks like:** Three scores, a short action list and a date in your calendar for your first client contact.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, why does preparation make a client more likely to hire you?",
            options: [
              "Because it lets you charge any price you want",
              "Because it reduces the risk the client feels in trusting someone new",
              "Because clients only hire people with long CVs",
              "Because it removes the need for a contract",
            ],
            answer_index: 1,
            explanation: "Samples, a clear profile and clear messages each reduce a part of the client's risk.",
          },
          {
            prompt: "Which of these is acceptable in a portfolio?",
            options: [
              "A friend's design presented as your own",
              "A practice sample clearly labelled as practice",
              "A project you invented and claim was for a real company",
              "Stock photos presented as your own photography",
            ],
            answer_index: 1,
            explanation: "The lesson says practice work is fine as long as it is labelled as practice.",
          },
          {
            prompt: "What did Sumaila prepare before contacting shop owners?",
            options: [
              "A company registration and a printed brochure",
              "Two labelled sample spreadsheets, a business profile and a short introduction message",
              "A paid advert on the radio",
              "A long CV listing every course he has taken",
            ],
            answer_index: 1,
            explanation: "He built samples, set up a profile with them and wrote a clear message.",
          },
          {
            prompt: "What does the lesson say about how long getting ready should take?",
            options: [
              "Months, until everything is perfect",
              "At least one year of study",
              "Not long; get a small honest portfolio and profile, then start talking to clients",
              "No time at all; skip preparation completely",
            ],
            answer_index: 2,
            explanation: "The lesson warns against waiting for perfection and says to improve as real work comes in.",
          },
        ],
        pass_threshold: 75,
      },
    },
    // @@NEXT@@
  },
};

export default content;
