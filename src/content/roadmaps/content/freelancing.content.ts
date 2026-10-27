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
    portfolio: {
      explanation_md: `A portfolio is a small collection of your best work that proves you can deliver the service you offer. For a freelancer it often matters more than a CV. Many clients, especially online, look at samples first and only read your message if the samples are good.

## How many pieces?

Three to five strong pieces are enough to start. A few excellent samples that match your service beat twenty mixed ones. If you offer menu and flyer design for restaurants, show menus and flyers, not your old school drawings.

## Where samples come from

You do not need paid clients to build a first portfolio. Honest ways to get samples:

* **Practice briefs.** Invent a realistic job, such as "a price list for a provisions shop in Wa", and complete it to a professional standard. Label it as a practice project.
* **Redesigns.** Take something that exists, such as a faded church notice, and show how you would improve it. Present it as a concept, not as work the church paid for, and do not publish it in a way that looks official.
* **Small real jobs.** Do a real job for a local business or community group, even for a small fee. Ask permission before you show it.
* **Course projects.** Strong projects from your SydCrest track can count, especially if you add your own improvements.

Never include work you did not do, and never show a client's private information. Blur or replace names, phone numbers, prices and figures that belong to a real client.

## Present each piece as a short story

A client wants to know you understand problems, not only tools. For each sample, write three short parts:

* **The problem.** What did the client need? "A restaurant's menu was handwritten and hard to read on WhatsApp."
* **What you did.** "I designed a one page menu with clear prices and sections, sized to share as an image."
* **The result.** Describe what was delivered and any feedback you really received. Only claim results that truly happened.

## Where to put it

Choose a place that is free and easy to open on any device:

* A simple free website builder, which gives you one link to share.
* A shared cloud folder with clearly named files, set so anyone with the link can view.
* For developers, a code hosting site that can publish a live page.
* The catalogue on your messaging app's business profile, for local clients.

Keep file sizes small so a client on a data bundle can open your work quickly. Test the link from a friend's device to make sure it opens without asking for a login.

## A small example

Abdul-Rahman offers simple websites for small businesses. He has no paying clients yet. He builds a practice site for an imaginary shea butter cooperative in Damongo, a redesign concept for his old school's events page, and a real one page site for his cousin's tailoring shop, done with permission. Each has a live link and three lines: problem, what he did, result. When a hotel owner asks for proof, he sends one link.`,
      practice_task_md: `**Goal:** Build a starter portfolio with three pieces.

**Steps:**
1. Choose three pieces that match your service sentence. If you have fewer than three, write one practice brief and complete it.
2. For each piece, write the problem, what you did and the result in three short lines. Label practice work clearly.
3. Remove any real client's private details.
4. Put the pieces in one free place: a simple site, a shared folder or your business profile catalogue.
5. Open the link on someone else's device to check it loads without a login.

**Done looks like:** One shareable link or catalogue with three labelled samples, each with a three line story. Send the link to a mentor or study partner for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "How many pieces does the lesson suggest for a starter portfolio?",
            options: ["One", "Three to five strong pieces", "At least twenty", "Every piece of work you have ever done"],
            answer_index: 1,
            explanation: "The lesson says three to five strong, matching samples are enough to start.",
          },
          {
            prompt: "How should you present a redesign of something that already exists, such as a church notice?",
            options: [
              "As work the church paid you for",
              "As a concept showing how you would improve it",
              "Without any explanation",
              "As your employer's official work",
            ],
            answer_index: 1,
            explanation: "The lesson says to present a redesign as a concept, not as paid work.",
          },
          {
            prompt: "What are the three parts of each sample's short story?",
            options: [
              "The price, the deadline and the tool used",
              "The problem, what you did and the result",
              "Your name, your age and your school",
              "The client's phone number, address and budget",
            ],
            answer_index: 1,
            explanation: "Each sample should explain the problem, what you did and the real result.",
          },
          {
            prompt: "What should you do with a real client's private information in your portfolio?",
            options: [
              "Show it to prove the work is real",
              "Blur or replace names, numbers and figures that belong to the client",
              "Only show it to foreign clients",
              "Put it in the file name",
            ],
            answer_index: 1,
            explanation: "The lesson says never to show a client's private information.",
          },
          {
            prompt: "Why test your portfolio link on another device?",
            options: [
              "To make sure it opens without asking for a login",
              "To increase the number of views",
              "Because links only work on computers",
              "To change the file sizes automatically",
            ],
            answer_index: 0,
            explanation: "The lesson says to check the link opens for someone else without a login.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "profiles-and-presence": {
      explanation_md: `When a possible client hears your name, they will look you up. What they find in the first few seconds decides whether they contact you. A clear, honest profile answers three questions at once: what do you do, who do you do it for, and how can they reach you?

## Be found where your clients look

Different clients look in different places:

* **Local businesses and groups** often find people through WhatsApp, Facebook and word of mouth. A messaging business profile with a catalogue, and a simple page on a social network, can be enough.
* **Clients abroad** often look at professional networking profiles, marketplace profiles and portfolio links.
* **A business listing on a map service** helps if you have a fixed place where clients can visit, such as a print and design shop.

You do not need to be everywhere. Choose one or two places your niche really uses and do them well.

## What a strong profile contains

* **Your real name and a clear, recent photo of you.** Not a logo, a cartoon or someone else's photo. Clients want to know they are dealing with a real person.
* **A headline that states your service.** For example, "Menu and flyer design for restaurants in Tamale" is better than "Creative. Dreamer. Hustler."
* **A short description.** Two or three sentences: who you help, what result you give, and how you work. Write it in plain English and check spelling.
* **Proof.** A link to your portfolio or a few samples in your catalogue.
* **Contact details and working hours.** Say when you reply, for example "Monday to Saturday, 8am to 6pm".

## Keep it honest

Use only your own name, work and photo. Do not claim degrees, certificates or clients you do not have. Do not create profiles in someone else's name or use another person's account, even if they offer it. Marketplaces close accounts for this, and in a close community people will find out.

Keep personal posts and business posts apart where you can. A client checking your page should not land on arguments or jokes you would not want them to see.

## Keep it current

Update your profile when you finish a strong new piece of work, change your service or change your hours. A profile that still shows last year's samples suggests you are not active.

## A small example

Wumpini offers social media management for salons and boutiques in Tamale. Her business profile on her messaging app says: "Social media for salons and boutiques. I plan, design and post your content each week. Replies within the same day, Monday to Saturday." Her catalogue shows three sample post designs and a sample monthly plan, labelled as samples. Her social page has the same name and photo, so clients who search for her find a matching, professional picture everywhere.`,
      practice_task_md: `**Goal:** Set up or improve one profile that your niche actually uses.

**Steps:**
1. Decide where your clients most likely look: a messaging business profile, a social page, a professional networking site or a marketplace.
2. Add a clear, recent photo of yourself and your real name.
3. Write a headline that states your service and a two or three sentence description.
4. Add your portfolio link or three samples, and your contact hours.
5. Ask someone outside your field to look for ten seconds and tell you what you do. If they cannot, simplify the headline.

**Done looks like:** One complete, honest profile with a photo, headline, description, samples and hours, plus a note of the ten second test result.`,
      quiz: {
        questions: [
          {
            prompt: "What three questions should a clear profile answer?",
            options: [
              "Your age, your school and your hometown",
              "What you do, who you do it for and how to reach you",
              "Your price, your bank and your password",
              "Your favourite tools, apps and music",
            ],
            answer_index: 1,
            explanation: "The lesson says a profile should quickly show your service, your clients and your contact details.",
          },
          {
            prompt: "Which headline follows the lesson's advice?",
            options: [
              "Creative. Dreamer. Hustler.",
              "Menu and flyer design for restaurants in Tamale",
              "Available for anything",
              "Best designer in Ghana",
            ],
            answer_index: 1,
            explanation: "A good headline states your service and who it is for.",
          },
          {
            prompt: "Someone offers you their older marketplace account to save time. What does the lesson advise?",
            options: [
              "Accept it, because the account already has reviews",
              "Accept it but change the photo",
              "Do not use another person's account; use only your own name and work",
              "Buy it if the price is fair",
            ],
            answer_index: 2,
            explanation: "The lesson says never to use another person's account, as marketplaces close accounts for this.",
          },
          {
            prompt: "How many places should a beginner set up profiles on?",
            options: [
              "Every social network and marketplace that exists",
              "One or two places your niche really uses, done well",
              "None; profiles are not needed",
              "Only places for clients abroad",
            ],
            answer_index: 1,
            explanation: "The lesson says you do not need to be everywhere; pick the places your clients use.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "client-communication": {
      explanation_md: `Clients judge you by your messages long before they see your work, especially clients abroad who only know you through text. Clear, polite, prompt writing builds trust. Careless or slow writing makes clients nervous, even if your skill is excellent.

## Five habits of professional client messages

* **Greet properly and use their name.** "Good morning, Madam Hawa" or "Hello Daniel" is better than starting with "pls" or no greeting.
* **Answer the question they asked.** If a client asks for a price and a delivery date, give both in your first reply. Do not make them ask twice.
* **Be short and clear.** Use short sentences. Put one topic in each paragraph. Avoid slang, heavy abbreviations and long voice notes for important details.
* **Confirm important details in writing.** After a call or voice note, send a short written summary: what will be done, by when and for how much. This protects both of you later.
* **Reply within an agreed time.** Tell clients when you usually reply, for example within the same working day. If you need more time, say so: "Thank you, I have received the files. I will send the first draft by Thursday evening."

## Tone with different clients

Local clients may prefer a warmer, more personal tone, voice notes and phone calls. Clients abroad often prefer written messages, email for formal matters, and a more direct style. In both cases, stay respectful and calm. Never argue in anger by message. If a conversation becomes tense, pause, then reply politely with facts.

Pay attention to time zones with clients abroad. Write your working hours in their time as well as yours when it helps, and do not expect instant replies in the middle of their night.

## A message worth copying

Here is a reply to a new enquiry:

> Good afternoon Mr Fuseini,
>
> Thank you for contacting me about a logo for your pharmacy. To give you an accurate price, could you tell me:
> 1. The pharmacy's full name as it should appear
> 2. Any colours you would like or want to avoid
> 3. When you need the final logo
>
> Once I have these, I will send a price and timeline today.
>
> Kind regards,
> Mariama

It greets, thanks, asks only what is needed, and promises a clear next step.

## When things go wrong

If you will miss a deadline, tell the client before the deadline, not after. Explain briefly, apologise once, and give a new date you can keep. Clients forgive delays they hear about early far more readily than silence.

## Check before you send

Read every important message once before sending. Check names, dates, prices and attachments. A wrong price in writing can be hard to take back, and a misspelled client name looks careless.`,
      practice_task_md: `**Goal:** Practise three common client messages.

**Steps:**
1. Write a reply to a new enquiry for your service that greets, thanks and asks two or three useful questions.
2. Write a short written summary you would send after a phone call agreeing a job: what, by when and for how much.
3. Write a message telling a client, before the deadline, that you need one more day, with a reason and a new date.
4. Read each message aloud. Remove slang and shorten long sentences.

**Done looks like:** Three short, polite messages saved in a note, ready to adapt for real clients. Ask a mentor or study partner to review them.`,
      quiz: {
        questions: [
          {
            prompt: "A client asks for your price and delivery date. What should your first reply include?",
            options: [
              "Only a greeting, so they ask again",
              "Both the price and the delivery date, or the questions you need answered to give them",
              "A long voice note about your experience",
              "Your full CV",
            ],
            answer_index: 1,
            explanation: "The lesson says to answer the question asked so the client does not have to ask twice.",
          },
          {
            prompt: "Why should you send a written summary after a call or voice note?",
            options: [
              "To make the conversation longer",
              "To record what was agreed so both sides are protected later",
              "Because calls are not allowed with clients",
              "To ask for a higher price",
            ],
            answer_index: 1,
            explanation: "A written summary of what, when and how much protects both you and the client.",
          },
          {
            prompt: "You realise you will miss a deadline. When should you tell the client?",
            options: [
              "After the deadline has passed",
              "Only if the client asks",
              "Before the deadline, with a brief reason and a new date you can keep",
              "Never; just deliver when you can",
            ],
            answer_index: 2,
            explanation: "The lesson says clients forgive delays they hear about early far more than silence.",
          },
          {
            prompt: "What does the lesson say about writing to clients in other time zones?",
            options: [
              "Expect instant replies at any hour",
              "Avoid email completely",
              "Be aware of their working hours and do not expect replies in the middle of their night",
              "Only write to them at weekends",
            ],
            answer_index: 2,
            explanation: "The lesson advises paying attention to time zones and stating working hours clearly.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "finding-clients": {
      explanation_md: `Finding clients is the part of freelancing that worries most beginners. The skill is learnable, and it gets easier with every client you serve well. Clients usually come from three places, and it makes sense to start with the closest.

## Three sources of clients

* **People who already know you.** Family, friends, former teachers, church members, your old school, shops you buy from. They already trust you, which is the hardest thing to earn.
* **Businesses and organisations you approach.** Shops, schools, NGOs, clinics, hotels and small firms that could use your service. You contact them directly with a specific idea.
* **Online marketplaces and job boards.** Websites where clients, often abroad, post projects and freelancers apply. They offer reach but also heavy competition and their own rules.

Most freelancers use a mix. Local and personal connections often bring the first jobs and the first reviews. Online platforms can add more clients later, once you have samples and some experience.

## Why start close to home

A first client nearby can meet you, see your work and pay through familiar methods such as mobile money. You can learn to scope, price and deliver with lower risk. You also get a real sample and a reference, which make online applications far stronger.

Starting close to home does not mean you must stay local. It means your first wins come where trust already exists.

## Think in a simple pipeline

A pipeline is the path from "possible client" to "paying client":

1. **Contact.** You reach out or they hear about you.
2. **Conversation.** You learn what they need.
3. **Proposal.** You offer a solution, price and timeline.
4. **Agreement.** They accept and you agree terms.
5. **Delivery and payment.** You do the work and get paid.
6. **Follow up.** You ask for feedback, a review and referrals.

Not everyone moves through all steps. Many conversations do not become jobs, and that is normal. What matters is keeping a steady number of contacts at the start of the pipeline, so you are not starting from zero when a project ends.

## Keep a simple list

Use a spreadsheet or notebook with columns for name, business, how you know them, date contacted, what was said and next step. It stops you forgetting promising leads and stops you messaging the same person five times.

## A small example

Amina offers typing and document formatting. In her first month she lists twenty people: five she knows personally, ten local organisations near her in Bolgatanga and five postings online. She contacts them over two weeks. Two personal contacts give her small jobs, one school asks her to format exam papers next term, and the online postings bring no reply yet. She now has samples, a reference from the school and a clearer idea of where her clients are.

## What this section covers

The next lessons go deeper into finding clients close to home, using marketplaces and remote boards, and outreach, referrals and repeat work.`,
      practice_task_md: `**Goal:** Start your client list.

**Steps:**
1. Create a spreadsheet or notebook page with columns: name, business or group, how you know them, date contacted, notes, next step.
2. Add at least five people you know personally who might need your service or know someone who does.
3. Add at least five local businesses or organisations that could use your service.
4. Add two or three online places where your kind of work is posted.
5. Mark the three most promising contacts to reach first.

**Done looks like:** A list of at least twelve possible clients across the three sources, with three marked to contact this week.`,
      quiz: {
        questions: [
          {
            prompt: "What are the three sources of clients named in the lesson?",
            options: [
              "Banks, government offices and radio stations",
              "People who know you, businesses you approach, and online marketplaces and job boards",
              "Only foreign companies",
              "Family, friends and classmates only",
            ],
            answer_index: 1,
            explanation: "The lesson lists personal connections, direct approaches and online platforms.",
          },
          {
            prompt: "Why does the lesson suggest starting close to home?",
            options: [
              "Because online work is illegal for beginners",
              "Because trust already exists, payment is familiar and you gain samples and references",
              "Because local clients always pay more",
              "Because you can never work for clients abroad",
            ],
            answer_index: 1,
            explanation: "Local first clients lower your risk and give you samples and references.",
          },
          {
            prompt: "What is a pipeline in this lesson?",
            options: [
              "A water project for a client",
              "The path from possible client to paying client and follow up",
              "A type of payment app",
              "A tax form",
            ],
            answer_index: 1,
            explanation: "The lesson describes the pipeline as contact, conversation, proposal, agreement, delivery and payment, and follow up.",
          },
          {
            prompt: "Why keep a simple list of contacts?",
            options: [
              "So you can forget about leads once you have one job",
              "So you do not lose promising leads or message the same person too often",
              "Because clients ask to see it",
              "Because it is required for tax registration",
            ],
            answer_index: 1,
            explanation: "The lesson says the list stops you forgetting leads and over messaging people.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "local-clients": {
      explanation_md: `Shops, schools, churches, mosques, NGOs, clinics, hotels and small firms in towns such as Tamale, Bolgatanga, Wa and Damongo all need work that freelancers can do: flyers and banners, price lists, social media pages, typed reports, spreadsheets, simple websites, photos and short videos. Many prefer someone they can meet and call.

## Start with people who already trust you

Tell people you know, clearly and briefly, what you now offer. A message such as "I now design menus and flyers for restaurants and events. Here are two samples. If you or anyone you know needs one, please tell me" works better than a vague "I do graphics". Post it on your status once, not every hour.

## Walk in, with one example

Many small businesses in the north are not active online but respond well to a polite visit. Before you go:

* Look at the business and notice one specific improvement you could make. A handwritten price board, an outdated banner or a page with no posts for months.
* Prepare one example on your device that matches their type of business.
* Choose a quiet time of day, not when the shop is full of customers.

When you visit, greet properly, introduce yourself in one sentence, show the example and make one specific suggestion. "I noticed your price list is handwritten. I make clear printed lists that you can also share on WhatsApp. Here is one I did for a provisions shop." Then ask if they would like a price. If they say no, thank them and leave your contact.

## Local organisations

Schools, churches, mosques, associations and NGOs often need regular help: programmes for events, newsletters, data from surveys, minutes of meetings, social media during big events. Find out who makes decisions, often a secretary, programme officer or head teacher, and approach them respectfully. Be ready to work with their procedures, such as written quotes and receipts.

## Pricing and payment locally

Local clients may compare your price with someone they know. Be clear about what your price includes, take a deposit before starting larger jobs and confirm mobile money payments have arrived before you hand over final files. These are covered in later lessons.

## Turn one client into more

Every happy client knows other people in the same line of business. After finishing a job, ask: "Do you know anyone else who might need something similar?" A caterer knows event planners; a head teacher knows other head teachers.

## A small example

Issahaku notices that several chop bars near the Tamale central market have no printed menus. He designs one practice menu, visits three chop bars at mid afternoon and shows it on his device. One owner agrees to a menu at a small price with half paid upfront. Issahaku delivers in two days, sends the image for WhatsApp and a print ready file, and asks for a referral. The owner introduces him to her sister, who runs a pastry business.`,
      practice_task_md: `**Goal:** Prepare and make one local approach.

**Steps:**
1. Pick one local business or organisation that fits your niche.
2. Write down one specific improvement your service could make for them.
3. Prepare one matching example on your device.
4. Write a one sentence introduction and a one sentence suggestion.
5. Visit or message them at a quiet time, greet properly, show the example and ask if they would like a price.
6. Record the result in your client list, with the next step.

**Done looks like:** One real approach made, with notes on what you said, how they responded and what you will do next. If they said no, note what you would change next time.`,
      quiz: {
        questions: [
          {
            prompt: "What should you prepare before visiting a local business?",
            options: [
              "A long speech about all your skills",
              "One specific improvement you could make and a matching example",
              "A signed contract for them to sign immediately",
              "Nothing; just ask if they have any work",
            ],
            answer_index: 1,
            explanation: "The lesson says to notice one improvement and bring one example that matches their business.",
          },
          {
            prompt: "When is a good time to visit a shop to offer your service?",
            options: [
              "When it is busiest so you meet many customers",
              "At a quiet time of day",
              "Late at night after closing",
              "On a public holiday",
            ],
            answer_index: 1,
            explanation: "The lesson advises choosing a quiet time, not when the shop is full.",
          },
          {
            prompt: "Which message to people you know matches the lesson's advice?",
            options: [
              "I do graphics",
              "I now design menus and flyers for restaurants and events. Here are two samples. Please tell anyone who needs one.",
              "Help me, I need money",
              "Send me any work you have",
            ],
            answer_index: 1,
            explanation: "The lesson recommends a clear, brief message naming the service and showing samples.",
          },
          {
            prompt: "What should you ask a happy client after finishing the job?",
            options: [
              "Whether they can lend you money",
              "Whether they know anyone else who might need something similar",
              "Whether they will pay double next time",
              "Whether they want to stop working with you",
            ],
            answer_index: 1,
            explanation: "Asking for referrals turns one client into more, as in Issahaku's example.",
          },
        ],
        pass_threshold: 75,
      },
    },
    // @@NEXT@@
  },
};

export default content;
