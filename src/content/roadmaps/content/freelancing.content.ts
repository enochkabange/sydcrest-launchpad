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
    "online-marketplaces": {
      explanation_md: `Freelance marketplaces and remote job boards let clients anywhere in the world post projects and hire freelancers they have never met. They can open doors to clients abroad, but they come with rules, fees and strong competition. Go in with clear eyes so you do not spend weeks of data and effort on the wrong platform.

## Two kinds of platform

* **Freelance marketplaces.** Clients post projects or browse freelancer profiles. You send proposals, agree terms on the platform, deliver and get paid through it. The platform usually holds the client's payment for a project and releases it when the work is approved, and charges fees.
* **Remote job boards.** Companies post part time, contract or full time remote roles. You apply more like a normal job. Some roles are open worldwide; others are limited to certain countries.

## Read the rules before you build a profile

Each platform is different, and rules change. Before you sign up, find and read:

* **Who can join.** Some platforms do not accept new freelancers from every country, or limit sign ups when they have too many in a category. Some remote roles say "open to applicants in certain countries only". Respect these limits. Never pretend to live somewhere else or use a tool to hide your location; accounts are closed for this and you may lose money held in them.
* **Fees.** How much the platform takes from each payment, and whether you pay to send proposals. Some platforms sell credits for applying.
* **How you withdraw money to Ghana.** Which withdrawal methods work for an account in Ghana, how long they take and what they cost. A later lesson covers this in detail.
* **Identity checks.** Most platforms ask for an ID document and sometimes a video check. Use your own real details.

## Expect competition

A single posting can attract many proposals from around the world. Beginners often send many general proposals and hear nothing. What helps:

* A complete, honest profile focused on one service.
* Samples that match the work being posted.
* Short, specific proposals that answer the client's questions.
* Applying early to small, clearly described jobs you can do excellently.

Some clients ask for a short paid test before ongoing work, which is normal. An unpaid "test" that is really a full project is not.

## Stay on the platform

The platform's payment protection and dispute process only cover work agreed and paid on the platform. A client who asks you to move to a messaging app and be paid outside "to save fees" removes your protection, and is breaking most platforms' rules. This is also a common scam pattern, covered in the scams lesson.

## A small example

Mariama wants to offer short video captioning to creators abroad. Before signing up anywhere, she reads the joining rules, fees and withdrawal options of three platforms. One does not currently accept new sign ups in her category, so she skips it. On another she builds a profile with three labelled samples and applies to two small, clear jobs a day for a month, each with a short tailored proposal. Her first job is small, but it gives her a real review and a client who returns.`,
      practice_task_md: `**Goal:** Research one platform properly before joining.

**Steps:**
1. Choose one freelance marketplace or remote job board where your kind of work appears.
2. Find and note: who can join, the fees, how money can be withdrawn to Ghana and what identity checks they use. Use the platform's own help pages.
3. Look at five current postings for your service. Note what the clients ask for: samples, skills, price type, deadlines.
4. Decide whether this platform is worth your time now, and write why in two sentences.

**Done looks like:** A short note covering joining rules, fees, withdrawals, identity checks and five postings, with your decision and reason. Do not sign up until you have done this.`,
      quiz: {
        questions: [
          {
            prompt: "What should you check before building a profile on a platform?",
            options: [
              "Only how many users it has",
              "Who can join, the fees, how to withdraw money to Ghana and identity checks",
              "Whether it has a nice logo",
              "Whether your friends use it",
            ],
            answer_index: 1,
            explanation: "The lesson lists joining rules, fees, withdrawals and identity checks as things to read first.",
          },
          {
            prompt: "A remote role says it is open only to applicants in certain countries, and Ghana is not one. What should you do?",
            options: [
              "Use a tool to hide your location and apply",
              "Say you live in one of those countries",
              "Respect the limit and look for roles open to you",
              "Apply with a friend's details",
            ],
            answer_index: 2,
            explanation: "The lesson says to respect eligibility limits; faking location can get accounts closed and money lost.",
          },
          {
            prompt: "Why is moving payment off the platform risky?",
            options: [
              "Because it is always slower",
              "Because you lose the platform's payment protection and dispute process, and it is a common scam pattern",
              "Because local banks refuse such payments",
              "Because clients pay less tax",
            ],
            answer_index: 1,
            explanation: "Protection only covers work agreed and paid on the platform, and off platform requests are a scam warning sign.",
          },
          {
            prompt: "Which approach helps a beginner against strong competition?",
            options: [
              "Sending the same long general proposal to every posting",
              "A focused profile, matching samples and short tailored proposals to small clear jobs",
              "Applying only to the biggest, most complex projects",
              "Leaving the profile empty to save time",
            ],
            answer_index: 1,
            explanation: "The lesson lists a focused profile, matching samples and specific proposals as what helps.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "outreach-and-referrals": {
      explanation_md: `Waiting for adverts means competing with everyone who sees the same advert. Writing directly to a business with a specific idea for them, and getting introduced by people who already like your work, often brings better clients with less competition.

## Outreach: contacting clients who did not post a job

Outreach means you contact a possible client first. It works best when the message is about them, not about you. A good outreach message:

* **Greets them by name** and shows you know their business.
* **Notices one specific thing** you could improve. "Your Facebook page has great photos of your rooms, but the last post was in March."
* **Offers a small, clear idea.** "I could plan and post three times a week for a month, starting with your weekend lunch offer."
* **Shows one relevant sample.**
* **Asks a simple question** that is easy to answer. "Would you like me to send a price?"

Keep it short enough to read in under a minute. Never send the same copied message to everyone; people can tell.

## Follow up once, politely

Busy owners often miss messages. If there is no reply after about a week, send one short follow up: "Good morning, I wanted to check if you saw my message about your page. Happy to answer any questions." If there is still no reply, stop and move on. Repeated messages damage your name.

Record every contact in your client list with the date and next step, so you follow up at the right time and not too often.

## Referrals: the steadiest source of work

A referral is when someone recommends you to another person. Referred clients already trust you a little, because someone they know does. To earn referrals:

* Do excellent work and be easy to deal with.
* At the end of a job, ask directly: "Do you know anyone else who might need this?"
* Thank people who refer you, and tell them how it went.

## Repeat work

A client who was happy once will often hire you again, and repeat clients cost you no time to find. Keep in touch without pestering: share a useful idea before a busy season, such as Ramadan, Christmas or school resumption, or remind a client when their monthly content plan is due. Offer a regular arrangement when it makes sense, such as monthly social media management.

## A small example

Abdul-Rahman designs simple websites. He finds five guesthouses in Tamale with outdated or missing websites. He writes to each with one specific observation and a sample. Two reply. One hires him. After delivering, he asks the owner for referrals, and she introduces him to a friend who runs a guesthouse in Bolgatanga. Six months later, the first owner asks him to add a booking page, which is repeat work he did not have to search for.`,
      practice_task_md: `**Goal:** Write and send one outreach message, and plan your follow up.

**Steps:**
1. Choose one business from your client list that has not posted a job.
2. Study their business or online presence and note one specific thing you could improve.
3. Write a short message that greets them, mentions that thing, offers a small idea, shows one sample and asks a simple question.
4. Send it, and record the date and a follow up date one week later in your list.
5. Write the polite one line follow up you will send if there is no reply.

**Done looks like:** One sent outreach message, a follow up date in your list and your follow up message ready to send.`,
      quiz: {
        questions: [
          {
            prompt: "What makes an outreach message effective, according to the lesson?",
            options: [
              "It is long and lists all your skills",
              "It is about the client, notices one specific improvement, offers a small idea and asks a simple question",
              "It is the same copied message sent to everyone",
              "It demands a reply within one hour",
            ],
            answer_index: 1,
            explanation: "The lesson says outreach works best when it is specific to the client and easy to answer.",
          },
          {
            prompt: "There is no reply to your outreach after about a week. What should you do?",
            options: [
              "Send a message every day until they reply",
              "Send one short polite follow up, then move on if there is still no reply",
              "Post about them on social media",
              "Call them late at night",
            ],
            answer_index: 1,
            explanation: "The lesson advises one polite follow up, then stopping, because repeated messages damage your name.",
          },
          {
            prompt: "Why are referred clients valuable?",
            options: [
              "They always pay more",
              "They already trust you a little because someone they know recommended you",
              "They never need contracts",
              "They are always from abroad",
            ],
            answer_index: 1,
            explanation: "The lesson explains that referrals carry trust from the person who recommends you.",
          },
          {
            prompt: "What is one good way to encourage repeat work without pestering?",
            options: [
              "Message the client every day",
              "Share a useful idea before a busy season or offer a regular arrangement",
              "Raise your price without telling them",
              "Refuse new requests so they value you more",
            ],
            answer_index: 1,
            explanation: "The lesson suggests timely ideas before busy seasons and regular arrangements where they make sense.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "staying-safe": {
      explanation_md: `Freelancers are a favourite target for scammers. You are looking for work, you are often contacting strangers, and you may be new to online payments. Scammers know this. Learning the warning signs early can save your money, your accounts and your peace of mind.

## Why freelancers are targeted

* **You want work.** Scammers pretend to be clients or recruiters offering easy, well paid tasks.
* **You share contact details publicly.** Your phone number and email are on your profile, so anyone can message you.
* **You handle payments.** Fake payment screenshots, overpayments and requests to "refund the difference" all target people who receive money.
* **Your accounts are valuable.** A marketplace, email or payment account with good reviews can be stolen and used by criminals.

## What this section covers

* **Spotting freelance and job scams.** The common patterns, including those Ghana's Cyber Security Authority has warned about, and how to report them.
* **Protecting your accounts and identity.** Strong passwords, 2 Step Verification, and why you should never rent out, buy or share an account or send your ID documents carelessly.

## One rule to remember

**Real clients pay you to work. They never ask you to pay them to get work.** If anyone asks for a registration fee, a deposit to unlock tasks, money for "training materials" before a job, or a payment to release your earnings, stop. That one rule catches a large share of the scams beginners meet.

## Slow down when you feel pressure

Scammers create urgency: "Only three spots left", "Pay within one hour", "Your account will be closed". Pressure is designed to stop you thinking. A genuine client will wait while you check things. Give yourself time to verify, and talk to someone you trust before sending money or documents.

## A small example

Hawa receives a WhatsApp message from an unknown number: "We saw your profile. Earn daily from home by rating hotels. No experience needed." The link leads to a site that looks professional. She completes a few tasks and receives a small payment, then is told to deposit money to reach the "gold level" and withdraw her balance.

Hawa remembers the rule: she is being asked to pay to work. She stops, does not deposit anything, blocks the number and reports it to the Cyber Security Authority. Later she sees a friend's post about losing money to the same kind of scheme, and shares what she learned.

## Being safe is part of being professional

Safety is not only about avoiding loss. Clients trust freelancers who handle their files, passwords and data carefully. The habits in this section protect your clients as well as you, and that becomes part of your reputation.`,
      practice_task_md: `**Goal:** Build your personal scam checklist.

**Steps:**
1. In a note, write the one rule from the lesson in your own words.
2. List four reasons freelancers are targeted, from the lesson.
3. Think of any suspicious job or money message you or someone you know has received. Write which warning signs it showed. Do not include anyone's private details.
4. Write the name of one person you trust whom you will talk to before sending money or documents to someone new.

**Done looks like:** A short checklist with the rule, the four reasons, one real or realistic example and your trusted contact. Keep it where you can find it quickly.`,
      quiz: {
        questions: [
          {
            prompt: "What is the one rule the lesson asks you to remember?",
            options: [
              "Always pay a small fee to show you are serious",
              "Real clients pay you to work; they never ask you to pay them to get work",
              "Only accept work from people abroad",
              "Never use mobile money",
            ],
            answer_index: 1,
            explanation: "The lesson says any request to pay for work, tasks or withdrawals is a reason to stop.",
          },
          {
            prompt: "Why do scammers often create urgency?",
            options: [
              "Because real jobs always close within an hour",
              "To stop you from thinking and checking",
              "Because the law requires deadlines",
              "To help you save data",
            ],
            answer_index: 1,
            explanation: "The lesson says pressure is designed to stop you thinking; genuine clients will wait while you check.",
          },
          {
            prompt: "Which is one reason freelancers are targeted by scammers?",
            options: [
              "Freelancers never use passwords",
              "Their accounts with good reviews are valuable and can be stolen",
              "Freelancers are not allowed to report crimes",
              "Freelancers always carry cash",
            ],
            answer_index: 1,
            explanation: "The lesson lists valuable accounts as one reason, along with seeking work, public contacts and handling payments.",
          },
          {
            prompt: "In the example, what did Hawa do when asked to deposit money?",
            options: [
              "Deposited a small amount to test it",
              "Asked a friend to deposit for her",
              "Stopped, blocked the number and reported it",
              "Recruited friends to reach the gold level",
            ],
            answer_index: 2,
            explanation: "She recognised she was being asked to pay to work and reported it to the Cyber Security Authority.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "spotting-scams": {
      explanation_md: `Scams change their story often, but the patterns repeat. If you know the patterns, you can spot new versions quickly. Ghana's Cyber Security Authority (CSA) has issued public alerts about fake jobs and recruitment scams, and takes reports.

## The task scam

The CSA has described this pattern in its alerts:

* You receive an unsolicited message by SMS, email or a messaging app, from someone posing as a recruiter.
* They offer remote or part time work doing simple digital tasks, such as liking posts, rating products or referring friends.
* You are moved to WhatsApp or Telegram and asked to sign up on a website or "portal".
* Early tasks pay small amounts, to build your trust.
* Then you are asked to deposit money to unlock better tasks or to release your earnings.
* After you deposit, you are locked out and the contacts disappear.

## Other common freelance scams

* **Pay to get work.** A "client" or "agency" asks for a registration fee, a fee for training materials, or payment for software before you can start.
* **The overpayment trick.** A client sends more than the agreed amount, or shows a payment screenshot, then asks you to refund the difference quickly. The original payment later turns out to be fake or reversed, and your refund is gone.
* **Fake payment alerts.** You receive a message that looks like a mobile money or bank alert, but no money is in your actual balance.
* **Move off the platform at once.** A new client on a marketplace immediately asks you to continue on a messaging app and be paid outside the platform.
* **Account rental.** Someone offers to pay you to use your marketplace or payment account, or to "verify" an account in your name. Criminals use such accounts for fraud, and you can be held responsible.
* **Free work disguised as a test.** A "test" that is really the full project, with no payment.
* **Cloned websites and impersonation.** Fake pages that copy a real company's name and logo, or messages pretending to be from a well known organisation.

## How to check

* Search the company's name plus words like "scam" or "fraud", and visit its official website by typing the address yourself.
* Check your actual mobile money or bank balance, never a screenshot or SMS alone.
* Ask for a video call or official email address. Scammers often refuse.
* Talk to someone you trust before sending money, documents or codes.

## How to report

The CSA lists these reporting channels in its alert: call or text **292**, WhatsApp **0501603111**, or email **report@csa.gov.gh**. Also report the account to the platform or app where it contacted you. Reporting can protect the next person.

## A small example

Sumaila is offered a data entry job by a "client" who sends a payment alert for more than the agreed fee and asks him to refund the extra by mobile money. Sumaila checks his real balance: nothing has arrived. He declines politely, keeps the messages and reports the number.`,
      practice_task_md: `**Goal:** Practise spotting scam patterns.

**Steps:**
1. Write three short made up messages: one genuine client enquiry, one task scam and one overpayment scam. Use made up names.
2. For each scam message, underline or list the warning signs from the lesson.
3. Write what you would do in response to each scam, including how you would check and where you would report.
4. Save the CSA reporting channels in your phone contacts or notes.

**Done looks like:** Three example messages with warning signs marked, your planned responses, and the reporting channels saved where you can find them.`,
      quiz: {
        questions: [
          {
            prompt: "In the task scam pattern described by the CSA, what usually happens after early small payments?",
            options: [
              "You are offered a permanent contract",
              "You are asked to deposit money to unlock better tasks or release earnings",
              "You are invited to an office interview",
              "You receive a certificate",
            ],
            answer_index: 1,
            explanation: "The CSA describes small early payments followed by deposit demands and then a lockout.",
          },
          {
            prompt: "A client sends more than the agreed amount and asks you to refund the difference quickly. What is this likely to be?",
            options: [
              "A generous tip",
              "The overpayment trick",
              "A normal bank error that you must fix immediately",
              "A tax refund",
            ],
            answer_index: 1,
            explanation: "The lesson describes the overpayment trick, where the original payment is fake or reversed.",
          },
          {
            prompt: "How should you confirm that a mobile money payment has arrived?",
            options: [
              "Trust the screenshot the client sends",
              "Trust any SMS that looks like an alert",
              "Check your actual balance",
              "Ask the client to confirm by voice note",
            ],
            answer_index: 2,
            explanation: "The lesson says to check your real balance, never a screenshot or SMS alone.",
          },
          {
            prompt: "Which of these is a reporting channel the CSA lists in its alert?",
            options: ["Call or text 292", "Call 911", "Email the platform's marketing team", "Post in a community WhatsApp group only"],
            answer_index: 0,
            explanation: "The CSA lists 292 by call or text, WhatsApp 0501603111 and report@csa.gov.gh.",
          },
          {
            prompt: "Someone offers to pay you to use your marketplace account. Why should you refuse?",
            options: [
              "Because the payment will be too small",
              "Because criminals use such accounts for fraud and you can be held responsible",
              "Because accounts can only be used on weekends",
              "Because it uses too much data",
            ],
            answer_index: 1,
            explanation: "The lesson lists account rental as a scam that can leave you responsible for fraud.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "protecting-accounts": {
      explanation_md: `Your email, marketplace, social media and payment accounts are your business. If someone takes over your email, they can reset every other password, message your clients in your name and redirect your payments. Protecting your accounts is basic professional practice.

## Strong, separate passwords

* Use a **long password** for each important account. A phrase of several unrelated words is easier to remember and harder to guess than a short word with a number.
* Use a **different password** for each account. If one site is breached, the others stay safe.
* Never use your name, birthday, phone number or "123" patterns.
* Consider a reputable password manager app to store them, or at least keep them somewhere private and offline, not in a shared notebook or a chat.

## Turn on 2 Step Verification

2 Step Verification (sometimes called two factor authentication) means signing in needs your password plus something else, such as a code sent to your phone or shown in an authenticator app. Even if someone steals your password, they cannot get in without the second step. Turn it on for email first, then for payment, marketplace and social media accounts.

**Never share a verification code.** No genuine bank, platform or mobile money company will ask you for a one time code or your PIN by phone or message. Anyone who asks is trying to take over your account.

## Never rent, buy or share an account

People may offer to buy your account, rent it, or pay you to "verify" an account in your name. Others sell accounts with reviews already on them. Say no to all of these. Platforms close such accounts, often with money still inside, and criminals use rented accounts for fraud that is then traced to the name on the account.

## Be careful with your ID and bank details

You will sometimes need to share your Ghana Card details, for example for a platform's identity check, a bank or the tax office. Share them only with services and clients you have verified, through official channels. Do not post photos of your Ghana Card, send it to strangers for a "job application", or share your mobile money PIN with anyone, including family.

## On shared and public devices

* Use a private or incognito window, and always sign out when you finish.
* Do not let the browser save your password.
* Do not download client files onto a shared computer unless you delete them afterwards.

## If something goes wrong

If you think an account is compromised, act quickly: change the password from a safe device, sign out of all other sessions in the account settings, check that the recovery email and phone are still yours, and warn your clients that messages from you may be fake. Report the incident to the platform and, if money is involved, to your bank or mobile money provider and the Cyber Security Authority.

## A small example

Fuseini gets a call from someone who says they are from his mobile money provider and need "the code we just sent" to fix his account. He hangs up, because no real provider asks for a code. His 2 Step Verification and separate passwords mean that even a leaked password would not be enough.`,
      practice_task_md: `**Goal:** Secure your most important accounts.

**Steps:**
1. List your business accounts: email, messaging, social media, marketplace, payment.
2. For your email account, change to a long, unique password and turn on 2 Step Verification.
3. Repeat for at least two more accounts on your list.
4. In each account's settings, check that the recovery email and phone number are yours and current.
5. Write a one line rule for yourself about sharing your Ghana Card and PIN.

**Done looks like:** At least three accounts with unique passwords and 2 Step Verification turned on, recovery details checked and your one line rule written. Do not write your passwords in the task.`,
      quiz: {
        questions: [
          {
            prompt: "Why is your email account especially important to protect?",
            options: [
              "Because it is the only account with your photo",
              "Because whoever controls it can reset your other passwords and message clients in your name",
              "Because email is free",
              "Because email cannot be used on a phone",
            ],
            answer_index: 1,
            explanation: "The lesson says email takeover lets an attacker reset other passwords and impersonate you.",
          },
          {
            prompt: "What does 2 Step Verification add?",
            options: [
              "A second password that is the same as the first",
              "A second step, such as a code, so a stolen password alone is not enough",
              "Faster sign in without a password",
              "A way to share accounts safely",
            ],
            answer_index: 1,
            explanation: "The lesson explains that sign in needs your password plus something else.",
          },
          {
            prompt: "Someone calls saying they are from your mobile money provider and asks for the code just sent to you. What should you do?",
            options: [
              "Give them the code so they can fix the account",
              "Give them half the code",
              "Refuse and hang up; genuine providers never ask for codes",
              "Send the code by SMS instead",
            ],
            answer_index: 2,
            explanation: "The lesson says no genuine bank, platform or provider asks for one time codes or PINs.",
          },
          {
            prompt: "What does the lesson advise about renting or buying accounts with reviews?",
            options: [
              "It is a good shortcut for beginners",
              "It is fine if the price is low",
              "Say no; platforms close such accounts and they are used for fraud",
              "Only rent accounts from friends",
            ],
            answer_index: 2,
            explanation: "The lesson says never rent, buy or share an account.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "winning-work": {
      explanation_md: `An enquiry is not yet a job. Between "Can you help me?" and "Yes, let's start" there are three steps: understanding what the client really needs, offering a clear solution, and agreeing a price that is fair to both of you. Freelancers who handle these steps well win more of the work they want, and have fewer arguments later.

## Why this stage matters

Most freelance problems that appear at the end of a project, such as an unhappy client, endless changes or an argument about money, actually started at the beginning. The client expected one thing, the freelancer understood another, and nobody wrote it down. A little care at this stage saves a lot of trouble later.

This stage is also where you show professionalism. A client comparing three freelancers will often choose the one who asked sensible questions and sent a clear, simple offer, even if their price was not the lowest.

## What this section covers

* **Reading a brief and asking good questions.** How to find out the goal, the audience, the deadline, the budget and what "finished" looks like, without overwhelming the client.
* **Writing proposals that get replies.** How to restate the client's need, explain your approach, point to a relevant sample and give a clear price and timeline, in a message short enough to read quickly.
* **Pricing your work in cedis.** How to work out a price from your time and costs, choose between project, hourly and monthly pricing, and think about currency when a client is abroad.

## The skills behind this stage

Skills frameworks describe these abilities in general terms: active listening, persuasion, negotiation and managing financial resources. In practice for a freelancer they mean:

* **Listening.** Letting the client explain, and checking you understood.
* **Persuasion.** Showing, with evidence, why your approach suits them.
* **Negotiation.** Finding an arrangement both sides accept, such as adjusting scope to fit a budget instead of simply cutting your price.
* **Money sense.** Knowing your costs so you never agree to a price that leaves you working at a loss.

## A small example

A youth association in Wa asks Amina to "do some posters" for a football tournament. Instead of starting straight away, Amina asks a few questions by message. She learns they need one main poster, three social media versions and a printed banner, all within ten days, with a limited budget.

She sends a short proposal: one poster design adapted into the four formats, two rounds of changes, delivery in seven days, with half the price before she starts. When the association says the budget is lower, she suggests dropping the banner design instead of cutting her rate. They agree. Everyone knows what is included, and nobody is surprised at the end.

## Be patient with yourself

You will not win every proposal. Clients choose someone else for many reasons, including budget and timing. Treat each proposal as practice, note what you would improve, and keep going.`,
      practice_task_md: `**Goal:** Map the steps from enquiry to agreed job.

**Steps:**
1. Write a realistic enquiry for your service, as a client might send it in one short message.
2. List four things you would need to find out before you could quote.
3. Write one way you could adjust the scope if the client's budget is lower than your price, instead of just reducing your rate.
4. Write what you would want to be clear in writing before you start.

**Done looks like:** One sample enquiry, four questions, one scope adjustment idea and a short list of what must be agreed in writing.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, where do many end of project problems really start?",
            options: [
              "At the payment stage",
              "At the beginning, when expectations were not clear or written down",
              "When the client posts a review",
              "When the freelancer buys new software",
            ],
            answer_index: 1,
            explanation: "The lesson says most end of project problems start with unclear expectations at the beginning.",
          },
          {
            prompt: "In the example, what did Amina do when the association's budget was lower than her price?",
            options: [
              "She cut her rate by half",
              "She refused the job",
              "She suggested dropping the banner design so the scope fitted the budget",
              "She agreed to do everything for the lower price",
            ],
            answer_index: 2,
            explanation: "She adjusted the scope instead of simply cutting her rate.",
          },
          {
            prompt: "What does negotiation mean for a freelancer in this lesson?",
            options: [
              "Always accepting the client's first offer",
              "Finding an arrangement both sides accept, such as adjusting scope to fit a budget",
              "Arguing until the client gives up",
              "Refusing to discuss price",
            ],
            answer_index: 1,
            explanation: "The lesson describes negotiation as finding an arrangement both sides accept.",
          },
          {
            prompt: "What does the lesson say about not winning every proposal?",
            options: [
              "It means you should stop freelancing",
              "It is normal; treat each one as practice and keep going",
              "It means your price is always too high",
              "It only happens to beginners abroad",
            ],
            answer_index: 1,
            explanation: "The lesson says clients choose others for many reasons and to treat proposals as practice.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "reading-a-brief": {
      explanation_md: `A brief is the client's description of what they want. Sometimes it is a detailed document. Often, especially with local clients, it is one line in a message: "I need a logo" or "Help me with my Facebook page." Most freelance trouble starts with a vague brief, so learning to turn one line into a clear plan is one of the most valuable skills you can have.

## The five things to find out

Before you quote or start, make sure you know:

* **The goal.** Why do they want this? "A logo" might really be "I am opening a second shop and want to look established." The goal guides every decision you make.
* **The audience.** Who will see or use the work? Students, mothers, farmers, hotel guests, customers abroad? A flyer for a youth programme looks different from one for a law firm.
* **The deadline.** When do they need it, and is there a fixed event date? Ask when they need a first draft as well as the final version.
* **The budget.** What are they able to spend? Many clients will not say at first. You can ask, "Do you have a budget range in mind, so I can suggest an option that fits?"
* **What finished looks like.** What exactly will they receive? How many designs, posts, pages or rows? In which formats? How many rounds of changes?

## Ask few, good questions

Do not send twenty questions; it overwhelms people. Choose the five to seven that matter most for your service and ask them in one clear message, a short call or a voice note followed by a written summary. Number your questions so the client can answer each one.

Useful questions by service:

* **Design:** Where will it be used: print, WhatsApp, a sign? Any colours or examples they like or dislike?
* **Social media:** Which platforms? How many posts a week? Who provides photos? Who approves posts?
* **Data or admin:** What format is the data in now? How many records? What should the final file look like?
* **Websites:** How many pages? Who writes the text? Do they already have a domain name?

## Write it back

After you have the answers, summarise the brief in a few lines and send it to the client: "To confirm, you need ... by ..., for ..., delivered as ..." Ask them to confirm. This catches misunderstandings early and becomes the basis of your proposal and agreement.

## A small example

A clinic manager in Nalerigu messages Wumpini: "We need something for our Facebook." Wumpini replies with five numbered questions. She learns the goal is to tell the community about a free vaccination day, the audience is parents, the date is in two weeks, the clinic has a small budget, and they want three posts and one image for WhatsApp status. She writes this back in four lines. The manager confirms, and Wumpini can now give an accurate price.`,
      practice_task_md: `**Goal:** Turn a vague brief into a clear one.

**Steps:**
1. Write a one line vague brief a client might send for your service, such as "I need help with my page."
2. Write five to seven numbered questions that cover the goal, audience, deadline, budget and what finished looks like.
3. Invent realistic answers.
4. Write a summary of the brief in four or five lines, ending with a request for the client to confirm.

**Done looks like:** A vague brief, your numbered questions, sample answers and a short written summary ready to send. Keep your question list as a template for real enquiries.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is one of the five things to find out from a brief?",
            options: ["The client's age", "What finished looks like", "The client's favourite music", "How many employees they have"],
            answer_index: 1,
            explanation: "The lesson lists the goal, audience, deadline, budget and what finished looks like.",
          },
          {
            prompt: "Why does the lesson suggest asking only five to seven questions?",
            options: [
              "Because clients are not allowed to answer more",
              "Because twenty questions can overwhelm the client",
              "Because questions cost money",
              "Because the law limits questions",
            ],
            answer_index: 1,
            explanation: "The lesson says too many questions overwhelm people, so choose the ones that matter most.",
          },
          {
            prompt: "What is a polite way to ask about budget when the client has not mentioned it?",
            options: [
              "How much money do you have?",
              "Do you have a budget range in mind, so I can suggest an option that fits?",
              "Tell me your budget or I will not work with you",
              "Never ask about budget",
            ],
            answer_index: 1,
            explanation: "The lesson gives this wording as a respectful way to ask.",
          },
          {
            prompt: "Why should you write the brief back to the client?",
            options: [
              "To make the job seem bigger",
              "To catch misunderstandings early and form the basis of your proposal",
              "To avoid sending a proposal",
              "Because clients like long messages",
            ],
            answer_index: 1,
            explanation: "A written summary confirmed by the client catches misunderstandings and supports the agreement.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "writing-proposals": {
      explanation_md: `A proposal is your offer to the client: what you will do, how, by when and for how much. On marketplaces it is the message you send in reply to a posting. With local clients it may be a short message or a one page document after a conversation. Either way, a good proposal is specific, short and easy to say yes to.

## What a good proposal contains

* **The client's problem, in their words.** Show you read and understood. "You need a weekly set of five posts for your boutique's Instagram page, ready for the festive season."
* **How you will solve it.** Two or three sentences on your approach. "I will plan the posts with you each Monday, design them to match your shop's colours and send them for approval by Wednesday."
* **One relevant sample.** A link or image of similar work. One matching sample is better than ten unrelated ones.
* **Price and timeline.** A clear price, what it includes, and when you will deliver. If there are options, give two at most.
* **A simple next step.** "If this suits you, I can start on Monday after the deposit."

## Answer every question the client asked

Many postings ask applicants to answer specific questions, mention a word to prove they read everything, or state availability. Answer every one, clearly. Skipping them is one of the fastest ways to be ignored.

## Keep it short and personal

Clients often read many proposals between other tasks. Aim for a proposal that can be read in about a minute. Use short paragraphs. Use the client's name if you know it.

Do not send the same general proposal to every posting. Copied proposals that begin "Dear Sir or Madam, I am a hardworking professional with many skills" are easy to spot. You can keep a template for structure, but rewrite the opening and approach for each client.

## Be honest

Only claim what you can do. If something in the brief is outside your skills, say so, or suggest the part you can do well. Never promise results you cannot control, such as a certain number of followers or sales. Promise what you control: quality, timing and communication.

## A sample proposal

> Hello Madam Mariama,
>
> Thank you for sharing your plan for the shea butter cooperative's new price list. You need a one page list for print and a version for WhatsApp, ready before the Tamale trade fair.
>
> I will design both versions using your logo and colours, with clear sections for each product size. You will see a first draft in two days and can request two rounds of changes.
>
> Here is a price list I made for a provisions shop: [link]
>
> Price: one fixed fee covering both versions and two rounds of changes, with half before I start and half on delivery. Delivery: four days from the deposit.
>
> If this suits you, I can start tomorrow.
>
> Kind regards,
> Hawa

## After you send

If there is no reply, follow up once after a few days. If the client chooses someone else, thank them politely. They may come back next time.`,
      practice_task_md: `**Goal:** Write a complete proposal for a realistic job.

**Steps:**
1. Find a real posting for your service online, or use the brief summary from the previous lesson.
2. Write a proposal with all five parts: the client's problem in their words, your approach, one sample link, price and timeline, and a next step.
3. Answer every question the posting asked, if any.
4. Check it can be read in about a minute. Remove anything that is not specific to this client.
5. Ask a study partner or mentor to read it and say whether they would hire you.

**Done looks like:** One tailored proposal with all five parts, under about 200 words, plus notes on the feedback you received. Only send it to a real client if you can genuinely do the work.`,
      quiz: {
        questions: [
          {
            prompt: "What should the first part of a good proposal do?",
            options: [
              "List all your qualifications",
              "Restate the client's problem in their words",
              "Ask for payment immediately",
              "Describe your hobbies",
            ],
            answer_index: 1,
            explanation: "The lesson says to show you understood by restating the client's problem.",
          },
          {
            prompt: "A posting asks applicants to state their availability and answer two questions. What should you do?",
            options: [
              "Ignore them and send your usual message",
              "Answer every question clearly",
              "Answer only the easiest question",
              "Ask the client to call you instead",
            ],
            answer_index: 1,
            explanation: "The lesson says skipping the client's questions is one of the fastest ways to be ignored.",
          },
          {
            prompt: "Which promise follows the lesson's honesty advice?",
            options: [
              "I guarantee 1,000 new followers in a month",
              "I will double your sales",
              "You will see a first draft in two days and can request two rounds of changes",
              "Your business will never have problems again",
            ],
            answer_index: 2,
            explanation: "The lesson says to promise what you control: quality, timing and communication.",
          },
          {
            prompt: "How many samples does the lesson suggest including in a proposal?",
            options: [
              "One relevant sample",
              "At least ten of any kind",
              "None, samples are not needed",
              "Your entire portfolio as attachments",
            ],
            answer_index: 0,
            explanation: "The lesson says one matching sample is better than ten unrelated ones.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "pricing-in-cedis": {
      explanation_md: `Pricing worries almost every new freelancer. Charge too much and clients say no; charge too little and you work hard for nothing, and clients may doubt your quality. There is no single right price, but there is a sensible way to work one out. This lesson gives you the method; the numbers are yours to fill in.

## Start with time and costs

Before you think about what clients will pay, know what a job costs you.

* **Time.** Estimate honestly how many hours the job takes, including talking to the client, revisions and sending files. Beginners usually underestimate, so add some extra.
* **Direct costs.** Data bundles, electricity or fuel for a generator, transport to meet the client, printing, paid fonts, stock images or software subscriptions.
* **A share of your tools.** Your phone or laptop wears out and will need replacing. A small part of each job should help pay for that.

Decide what an hour of your time should be worth to you, considering your skill level and your needs. Multiply by the hours, add the costs, and you have a floor: the lowest price at which the job is worth doing.

## Then look at the market

Find out what similar work costs locally and online. Ask freelancers you trust, look at prices shops display, and read postings for your service. You are not trying to copy anyone. You are checking whether your floor is realistic and where your work fits: a beginner with a small portfolio usually prices lower than someone with years of results, and raises prices as proof grows.

## Choose a pricing model

* **Project price.** One price for a defined result, such as a menu design. Clients like knowing the total. You carry the risk if the job takes longer, so define the scope and number of changes clearly.
* **Hourly rate.** Payment for each hour worked. Common on some marketplaces and for ongoing support. You need a way to track your time honestly.
* **Per item.** A price for each post, video or page. Easy to understand for repeated work.
* **Monthly retainer.** A fixed monthly fee for a defined amount of ongoing work, such as twelve posts a month. Gives both sides predictability.

## A worked example

Here is the method with made up numbers, only to show the arithmetic. Issahaku estimates a flyer job takes 5 hours. He decides an hour of his time is worth 30 cedis for now, so time comes to 150 cedis. He adds 20 cedis for data and power and 10 cedis towards his laptop. His floor is 180 cedis. Local prices he has seen suggest that is reasonable, so he quotes 200 cedis with two rounds of changes. Your own numbers will be different.

## Clients abroad and currency

If a client abroad pays you, agree in writing which currency the price is in. Remember that what reaches you in cedis depends on the exchange rate on the day, and on fees charged by the platform and the payment route. The Bank of Ghana publishes reference exchange rates you can check. Work out roughly what you will receive in cedis after fees before you agree a price, not after.

## Be confident and consistent

State your price clearly, without apologising. If a client says it is too high, offer a smaller scope rather than cutting your rate straight away. Keep a note of what you charged each client, so your prices stay consistent.`,
      practice_task_md: `**Goal:** Work out a price for one of your services.

**Steps:**
1. Choose one service you offer and describe exactly what is included.
2. Estimate the hours it takes, including communication and revisions, then add a little extra.
3. List your direct costs for the job: data, power, transport, printing, software.
4. Decide what an hour of your time is worth for now, and calculate your floor: hours times hourly value, plus costs, plus a small amount for your tools.
5. Look at a few local or online prices for similar work and decide your quoted price and pricing model.
6. Write one sentence you would use to offer a smaller scope if a client says your price is too high.

**Done looks like:** A short calculation showing your floor and quoted price, the model you chose and your scope sentence. Keep it in your jobs spreadsheet.`,
      quiz: {
        questions: [
          {
            prompt: "What is the floor price in this lesson?",
            options: [
              "The average price other freelancers charge",
              "The lowest price at which the job is worth doing, based on your time and costs",
              "The price a client first offers",
              "The highest price you can ask for",
            ],
            answer_index: 1,
            explanation: "The lesson calculates the floor from hours, the value of your time and your costs.",
          },
          {
            prompt: "Which of these is a direct cost the lesson tells you to include?",
            options: ["Your favourite meal", "Data bundles and electricity or fuel", "Your friend's school fees", "The client's rent"],
            answer_index: 1,
            explanation: "The lesson lists data, power, transport, printing and software as direct costs.",
          },
          {
            prompt: "What is a monthly retainer?",
            options: [
              "A fine paid for late delivery",
              "A fixed monthly fee for a defined amount of ongoing work",
              "A tax paid each month",
              "A deposit that is never returned",
            ],
            answer_index: 1,
            explanation: "The lesson describes a retainer as a fixed monthly fee for defined ongoing work.",
          },
          {
            prompt: "When a client abroad pays you, what affects the amount that reaches you in cedis?",
            options: [
              "Only the price you agreed",
              "The exchange rate on the day and fees charged by the platform and payment route",
              "Nothing; it is always the same",
              "The client's time zone",
            ],
            answer_index: 1,
            explanation: "The lesson says exchange rates and fees change what reaches you, so work it out before agreeing.",
          },
          {
            prompt: "A client says your price is too high. What does the lesson suggest first?",
            options: [
              "Cut your rate in half straight away",
              "Offer a smaller scope rather than cutting your rate immediately",
              "Stop replying",
              "Add extra work for free",
            ],
            answer_index: 1,
            explanation: "The lesson advises adjusting scope before reducing your rate.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "contracts-and-delivery": {
      explanation_md: `Once a client says yes, two things protect the relationship: clear written terms, and steady, reliable delivery. Neither needs to be complicated. A short written agreement and a simple system for deadlines and changes prevent most disputes before they start.

## Why put things in writing

Memories differ. A client may honestly remember agreeing to "unlimited changes" when you remember "two rounds". A WhatsApp chat scattered over weeks is hard to search and easy to argue about. A short written agreement, even one page or one clear email, means both of you can look back at the same words.

Written terms are not a sign of distrust. Good clients usually welcome them, because they protect the client too: they know what they will receive, when and for how much.

## What this section covers

* **Simple written agreements.** The parts every agreement should have: the work, the deadline, the number of revisions, the price, the payment dates and who owns the finished files.
* **Deposits, milestones and invoices.** How taking part payment before you start, and splitting large jobs into stages, limits how much you can lose. How to write a clear invoice and follow up late payment politely and firmly.
* **Managing deadlines and revisions.** How to track every deadline, give updates before anyone asks, handle change requests calmly and quote for extra work instead of doing it free.

## Delivery is where reputation is made

Clients often remember how working with you felt as much as the final result. Did you reply? Did you deliver on the day you promised? Did you warn them early when something changed? A freelancer with good, reliable delivery often gets more repeat work than a more talented one who is hard to reach.

## Scope creep

Scope creep is when a project slowly grows beyond what was agreed: "Can you just add one more page?" "Can you also do the Facebook cover?" Each request seems small, but together they can double your work for the same price. Written terms give you a polite way to respond: "That is outside what we agreed, but I am happy to do it. It would cost an extra amount and add two days."

## A small example

Abdul-Rahman agrees to build a three page website for a guesthouse in Tamale. He sends a one page agreement listing the three pages, the delivery date, two rounds of changes, the price split into a deposit and a final payment, and that the guesthouse owns the finished site once fully paid. Halfway through, the owner asks for a booking form. Abdul-Rahman points to the agreement and offers a separate price. The owner agrees, and the relationship stays friendly because both sides knew the rules from the start.

## Keep it proportionate

A small job for a neighbour may need only a clear message confirming the work, price and date. A larger or longer project deserves a fuller written agreement. The bigger the job and the less you know the client, the more detail you need.`,
      practice_task_md: `**Goal:** Plan the terms and delivery for one realistic job.

**Steps:**
1. Choose a realistic job for your service, small or medium sized.
2. Write down the six parts an agreement should cover: work, deadline, revisions, price, payment dates, ownership of files. Fill in each for your job.
3. Write one polite sentence you would use if the client asks for extra work outside the agreement.
4. Decide whether this job needs a short message or a fuller agreement, and write why.

**Done looks like:** A filled in list of the six parts for one job, your scope creep sentence and your decision about the level of detail needed.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say a WhatsApp chat alone is weak protection?",
            options: [
              "Because WhatsApp messages are illegal as evidence",
              "Because a chat scattered over weeks is hard to search and easy to argue about",
              "Because clients cannot read WhatsApp",
              "Because chats are automatically deleted every day",
            ],
            answer_index: 1,
            explanation: "The lesson says scattered chats are hard to search and easy to dispute, unlike one clear written agreement.",
          },
          {
            prompt: "What is scope creep?",
            options: [
              "When a client pays early",
              "When a project slowly grows beyond what was agreed",
              "When a freelancer delivers too quickly",
              "When a contract is signed",
            ],
            answer_index: 1,
            explanation: "The lesson defines scope creep as small extra requests that add up beyond the agreement.",
          },
          {
            prompt: "How did Abdul-Rahman respond when the owner asked for a booking form?",
            options: [
              "He added it for free",
              "He refused and stopped the project",
              "He pointed to the agreement and offered a separate price",
              "He ignored the request",
            ],
            answer_index: 2,
            explanation: "He used the written terms to quote for the extra work, keeping things friendly.",
          },
          {
            prompt: "According to the lesson, when do you need more detail in a written agreement?",
            options: [
              "When the job is bigger and you know the client less",
              "Only when the client is a family member",
              "Never; one line is always enough",
              "Only for clients abroad",
            ],
            answer_index: 0,
            explanation: "The lesson says the bigger the job and the less you know the client, the more detail you need.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "simple-contracts": {
      explanation_md: `A contract is simply an agreement between you and a client about what each side will do. It does not need legal language or a lawyer for everyday freelance jobs. What it needs is to be clear, written down and agreed by both sides before work starts. This lesson is general guidance, not legal advice; for a large or unusual contract, ask someone qualified to check it.

## The six parts every agreement should cover

* **The work.** Exactly what you will deliver. "One logo in three file formats" or "twelve Instagram posts in March, designed and scheduled". Also say what is not included if there could be confusion, such as printing or photography.
* **The deadline.** When you will deliver, and any dates for drafts. Note what the client must provide and by when, such as photos or text, because your deadline depends on theirs.
* **Revisions.** How many rounds of changes are included, and how extra changes will be charged.
* **The price.** The total, the currency, and what it covers.
* **Payment dates.** How much is paid before you start, at any milestones and on delivery, and by which method.
* **Ownership and use of the work.** Who owns the finished files and when. A common arrangement is that the client owns the final work once it is fully paid, and you may show it in your portfolio unless the client asks you not to.

## Ownership deserves a sentence

Designs, writing, photos, videos and code are creative work, and the rules about who owns them can surprise both sides. Rather than assuming, write it down. Mention whether you will hand over editable source files, such as the original design file, or only the finished images. If the client wants exclusive rights or to keep the work private, agree that clearly.

Also respect other people's ownership. Only use fonts, images and music you have the right to use, and tell the client if they need to buy a licence.

## Where to write it

* **For small jobs:** a clear message or email that lists the six parts, with the client replying "I agree". Keep that message.
* **For bigger jobs:** a short document of one or two pages, shared as a file both sides keep. A free document app is enough. Some freelancers use free online contract templates as a starting point, but many are written for other countries, so adapt them to your situation.
* **On marketplaces:** the platform's own contract and terms apply. Keep all agreement inside the platform.

## Confirm before you start

Never start serious work until the client has agreed the terms in writing and paid any agreed deposit. Starting early "to show goodwill" often leads to unpaid work when the client changes their mind.

## A small example

Hawa agrees to write five blog articles for a tour company in Mole. Her email lists the five topics, the word length, a draft date and a final date, one round of edits, the price in cedis, half before starting and half on delivery, and that the company owns the articles once paid while Hawa may show them as samples. The manager replies "Agreed". When the manager later asks for a sixth article, both sides can see it was not in the original agreement, and Hawa sends a separate price.`,
      practice_task_md: `**Goal:** Write a one page agreement template for your service.

**Steps:**
1. Open a free document app on your phone or computer.
2. Create six headings: work, deadline, revisions, price, payment dates, ownership and use.
3. Under each, write a sentence for a realistic job, using placeholders like [client name] and [date] where details will change.
4. Add a line for what the client must provide and by when.
5. Add a final line for both names and the date of agreement.

**Done looks like:** A reusable one page template with all six parts, ready to fill in for your next client. Ask a mentor to check that it is clear.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is one of the six parts every agreement should cover?",
            options: ["The client's home address", "The number of revisions included", "Your favourite tools", "Your school results"],
            answer_index: 1,
            explanation: "The six parts are the work, deadline, revisions, price, payment dates and ownership and use.",
          },
          {
            prompt: "What is a common arrangement for ownership of finished work, according to the lesson?",
            options: [
              "The freelancer always keeps all rights forever",
              "The client owns the final work once fully paid, and the freelancer may show it in a portfolio unless asked not to",
              "Nobody owns the work",
              "The marketplace owns all work",
            ],
            answer_index: 1,
            explanation: "The lesson gives this as a common arrangement and says to write it down rather than assume.",
          },
          {
            prompt: "For a small job, what is enough as a written agreement?",
            options: [
              "Nothing; small jobs need no agreement",
              "A clear message or email listing the six parts, with the client replying that they agree",
              "A stamped legal document from a court",
              "A voice note only",
            ],
            answer_index: 1,
            explanation: "The lesson says a clear message with the client's written agreement is enough for small jobs.",
          },
          {
            prompt: "Why should you not start serious work before terms are agreed and any deposit is paid?",
            options: [
              "Because tools do not work without a contract",
              "Because starting early often leads to unpaid work if the client changes their mind",
              "Because clients prefer slow freelancers",
              "Because it is illegal to start early",
            ],
            answer_index: 1,
            explanation: "The lesson warns that starting early to show goodwill often leads to unpaid work.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "deposits-and-invoices": {
      explanation_md: `The biggest money risk for a freelancer is doing all the work and then not being paid. Deposits, milestones and clear invoices reduce that risk and make payment a normal, professional part of the job rather than an awkward favour.

## Deposits

A deposit is part of the price paid before you start. Many freelancers ask for a portion upfront, such as half, for new clients and larger jobs. A deposit:

* Shows the client is serious.
* Covers your early time and costs if the client disappears.
* Makes it less likely you will be left with nothing.

Agree the deposit in writing as part of your terms, and start work only once it has actually arrived in your account.

## Milestones

For bigger or longer jobs, split the work into stages, called milestones, each with its own payment. For a website: a deposit to start, a payment when the design is approved, and a final payment at launch. If the client stops paying at any point, you have lost at most one stage of work.

## Marketplace payment protection

Many freelance marketplaces use a form of escrow: the client pays the platform for a project or milestone before work begins, the platform holds that money, and releases it to you when the work is approved, with a dispute process if there is disagreement. This protection only works if the work is agreed and paid on the platform. Read each platform's own rules on how it holds and releases payments.

## Invoices

An invoice is a document that asks a client to pay for work. Even local clients increasingly expect one, and organisations such as NGOs and schools usually need one for their records. A clear invoice includes:

* The word "Invoice", an invoice number and the date.
* Your name, contact details and, if you have one, your business name.
* The client's name.
* A description of the work, with quantities and prices.
* The total amount due and the currency.
* The payment due date.
* How to pay: your mobile money number and registered name, or bank details.

Number your invoices in order, such as 001, 002, 003, and keep a copy of each. A free document or spreadsheet template is enough.

## Following up late payment

Clients pay late for many reasons, often simply forgetting. Follow up politely, firmly and in writing:

* **On the due date or a day after:** "Good morning, a reminder that invoice 004 for the menu design was due yesterday. Please let me know once it is sent."
* **About a week later:** restate the amount and due date, and ask when you can expect payment.
* **If still unpaid:** pause any further work for that client until the balance is settled, and say so calmly.

Keep every message. Do not post about the client publicly or send threats; it damages your reputation and rarely helps.

## A small example

Sumaila agrees to build a stock spreadsheet for a pharmacy in Bolgatanga in two stages. He asks for a deposit, delivers the first stage, invoices for the second payment and only sends the final file once that payment shows in his mobile money balance. When the second invoice is a week late, his polite reminder is enough.`,
      practice_task_md: `**Goal:** Create a reusable invoice template.

**Steps:**
1. Open a free document or spreadsheet app.
2. Add these parts: the word Invoice, invoice number, date, your name and contacts, client name, description of work with quantity and price, total and currency, due date, and payment details.
3. Fill it in for a realistic made up job, numbered 001.
4. Write the polite reminder message you would send on the due date if it were unpaid.
5. Save the template in your Clients folder.

**Done looks like:** A complete sample invoice and a ready reminder message. Do not put a real PIN or password anywhere in it.`,
      quiz: {
        questions: [
          {
            prompt: "Why ask a new client for a deposit before starting?",
            options: [
              "To make the job finish faster",
              "To show the client is serious and cover your early time if they disappear",
              "Because deposits are a tax requirement",
              "So you never need an invoice",
            ],
            answer_index: 1,
            explanation: "The lesson says deposits show commitment and protect your early time and costs.",
          },
          {
            prompt: "What is the benefit of milestones for a large job?",
            options: [
              "The client never has to pay until the very end",
              "If the client stops paying, you have lost at most one stage of work",
              "They remove the need for written terms",
              "They make the work free",
            ],
            answer_index: 1,
            explanation: "Each stage has its own payment, which limits how much you can lose.",
          },
          {
            prompt: "When does a marketplace's payment protection apply?",
            options: [
              "Whenever you work with someone you met on the platform",
              "Only when the work is agreed and paid on the platform",
              "Only for local clients",
              "Never",
            ],
            answer_index: 1,
            explanation: "The lesson says protection only works if the work is agreed and paid on the platform.",
          },
          {
            prompt: "Which item should a clear invoice include?",
            options: ["Your mobile money PIN", "An invoice number, date, description of work, total and how to pay", "The client's password", "Your school certificate"],
            answer_index: 1,
            explanation: "The lesson lists these items; you never share a PIN.",
          },
          {
            prompt: "An invoice is still unpaid after two polite reminders. What does the lesson suggest?",
            options: [
              "Post about the client on social media",
              "Send threatening messages",
              "Pause further work for that client until the balance is settled, and say so calmly",
              "Do more work for free to keep them happy",
            ],
            answer_index: 2,
            explanation: "The lesson advises pausing work calmly and keeping every message, without threats.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "managing-projects": {
      explanation_md: `Clients judge you on reliability as much as on quality. A freelancer who always delivers on time, keeps the client informed and handles changes calmly becomes the person clients call first. You do not need special software for this, just a few steady habits.

## Track every deadline

Put every deadline into your calendar as soon as it is agreed, with a reminder a day or two before. For each job, work backwards: if the final is due Friday and the client needs a day to review, your draft is due Wednesday, so you must start by Monday. Add those inner dates too.

Keep a simple job list, in a spreadsheet or notebook, with each client, the task, the next deadline and the status: not started, in progress, waiting for client, delivered, paid. Look at it every morning.

## Do not overcommit

Saying yes to every job feels good until three deadlines land on the same day. Before accepting new work, check your calendar and be honest about how many hours you have, including time lost to power cuts, network problems, school or family duties. It is better to offer a later date than to promise one you cannot meet.

## Update before anyone asks

Send short updates at natural points: when you start, when a draft is ready, and if anything changes. "Good afternoon, the first draft of your newsletter is attached. Please send any changes by Thursday so I can deliver the final on Friday." Clients relax when they do not have to chase you.

If something will delay you, such as a long power outage, tell the client as soon as you know, with a new date.

## Handle revisions calmly

Revisions are normal. Treat feedback as information, not criticism. To make revisions smooth:

* Ask the client to send all changes together in one message, not one at a time.
* Repeat back what you will change, if anything is unclear.
* Count rounds against what your agreement includes.

If a client asks for more rounds than agreed, or for new work, respond politely: "I am happy to make these changes. They are beyond the two rounds included, so they would cost an extra amount. Shall I go ahead?" Doing endless extra work for free teaches clients that your time has no value.

## Deliver professionally

When you deliver, send the files in the agreed formats, named clearly, such as "Hawa Catering menu final.pdf". Include a short note of what you are sending and how to use it. Check everything opens before you press send. Keep your own backup copy.

## A small example

Mariama has three clients in one week. On Monday she lists all deadlines in her calendar, sees that two finals land on Friday and asks one client if Saturday morning is acceptable. They agree. When the second client sends changes one at a time, she asks kindly for a single list. Everything is delivered on time, and she ends the week with no late nights and two happy clients asking about next month.`,
      practice_task_md: `**Goal:** Set up a simple project tracker.

**Steps:**
1. In your "Jobs and payments" spreadsheet, add columns: next deadline, status (not started, in progress, waiting for client, delivered, paid).
2. Add two realistic sample jobs with final deadlines.
3. For each, work backwards and add the draft date and start date to your calendar with reminders.
4. Write a short update message for when a draft is ready, and a polite message for when a client asks for changes beyond the agreed rounds.

**Done looks like:** A tracker with two sample jobs, calendar entries for their inner dates, and two ready messages.`,
      quiz: {
        questions: [
          {
            prompt: "The final is due Friday and the client needs a day to review. What does working backwards tell you?",
            options: [
              "Start on Friday morning",
              "Your draft must be ready by about Wednesday, so start earlier",
              "Ask the client to review faster",
              "Deadlines do not need planning",
            ],
            answer_index: 1,
            explanation: "The lesson shows working back from the final date to set draft and start dates.",
          },
          {
            prompt: "What should you do before accepting new work?",
            options: [
              "Accept everything and work out the details later",
              "Check your calendar and be honest about your available hours",
              "Ask for double payment",
              "Cancel an existing client",
            ],
            answer_index: 1,
            explanation: "The lesson warns against overcommitting and says to check your real capacity.",
          },
          {
            prompt: "How should you ask clients to send revision requests?",
            options: [
              "One at a time, as they think of them",
              "All together in one message",
              "Only by phone call",
              "Never; refuse all changes",
            ],
            answer_index: 1,
            explanation: "The lesson suggests asking for all changes together to keep revisions smooth.",
          },
          {
            prompt: "A client asks for more revision rounds than agreed. What does the lesson suggest?",
            options: [
              "Do them free to avoid conflict",
              "Refuse rudely",
              "Politely say they are beyond what was included and offer a price for the extra work",
              "Stop replying",
            ],
            answer_index: 2,
            explanation: "The lesson recommends offering to quote for extra work instead of doing it free.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-paid": {
      explanation_md: `Doing good work is only half of freelancing. The other half is making sure the money actually reaches you, safely and legally, and keeping records so you know where you stand. This section covers getting paid by local clients, receiving money from clients abroad, and keeping records and dealing with tax.

## Why this matters

Freelancers lose money in avoidable ways: releasing final files before checking a payment arrived, trusting a fake alert, using an unlicensed money transfer service, paying unexpected fees, or not knowing at the end of the year how much they earned and spent. Each lesson in this section closes one of those gaps.

Getting paid properly also protects your reputation. Clients trust a freelancer who sends clear invoices and receipts, uses accounts in their own real name and keeps tidy records.

## Your money, your accounts

Always receive payment into accounts in your own name: your own mobile money wallet, your own bank account, your own marketplace account. Never ask a client to pay into a friend's account, and never let someone else receive or hold your earnings for you. Accounts in your own name, matching your Ghana Card, avoid problems when you withdraw money or when a provider checks your identity.

## What this section covers

* **Getting paid by local clients.** Mobile money and bank transfers, confirming money has really arrived, receipts and transaction references.
* **Receiving money from abroad.** The main kinds of route, what to compare, and how to check that a payment or money transfer company is licensed or registered with the Bank of Ghana. This lesson names no companies, because rules and providers change; you will learn how to check instead.
* **Records, tax and registration.** A simple record of jobs, invoices, payments and costs; what the Ghana Revenue Authority says about registering as a self employed person; and registering a business name.

## A habit to start now

Open your "Jobs and payments" spreadsheet whenever money comes in or goes out for your freelance work. Write the date, the client or cost, the amount and a transaction reference. It takes a minute and saves hours later.

## A small example

Issahaku is pleased when a client says, "I have sent the money," and he immediately sends the final logo files. Later he finds the payment never arrived. He learns the hard way.

For his next job he changes his habits. He confirms each payment in his real mobile money balance before releasing files. He sends a short receipt with the transaction reference. He records each payment and each cost, such as data and printing, in his spreadsheet. At the end of the year, he can see exactly what he earned and spent, which he needs for pricing and for tax.

## A note on safety

Nobody legitimate will ask for your mobile money PIN, a verification code or your bank password in order to pay you. To receive money, a client needs only your number or account details and your registered name.`,
      practice_task_md: `**Goal:** Check that your payment setup is in your own name and ready.

**Steps:**
1. List the accounts you could receive payment into: mobile money, bank, any marketplace.
2. For each, confirm it is in your own name and that the name matches your Ghana Card.
3. Write the exact details a client would need to pay you locally, without any PIN or password.
4. Add a "transaction reference" column to your jobs spreadsheet if it does not have one.

**Done looks like:** A short list of your payment accounts, each confirmed in your own name, your payment details written out for clients, and an updated spreadsheet.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you receive payment only into accounts in your own name?",
            options: [
              "Because it is faster for the client",
              "It avoids problems when you withdraw money or when a provider checks your identity",
              "Because friends charge high fees",
              "Because banks do not allow more than one account",
            ],
            answer_index: 1,
            explanation: "The lesson says accounts in your own name, matching your Ghana Card, avoid withdrawal and identity problems.",
          },
          {
            prompt: "What mistake did Issahaku make with his first client?",
            options: [
              "He charged too much",
              "He sent the final files before confirming the payment had arrived",
              "He used a spreadsheet",
              "He sent a receipt",
            ],
            answer_index: 1,
            explanation: "He trusted the client's word and later found the payment never arrived.",
          },
          {
            prompt: "What does a client need from you in order to pay you?",
            options: [
              "Your mobile money PIN",
              "A verification code",
              "Your number or account details and your registered name",
              "Your bank password",
            ],
            answer_index: 2,
            explanation: "The lesson says nobody legitimate needs your PIN, code or password to pay you.",
          },
          {
            prompt: "What does the lesson say about naming money transfer companies?",
            options: [
              "It recommends the cheapest one",
              "It names no companies, because rules and providers change, and teaches you how to check instead",
              "It lists every company in Ghana",
              "It says all companies are licensed",
            ],
            answer_index: 1,
            explanation: "The lesson explains that you will learn how to check licensing with the Bank of Ghana instead.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "local-payments": {
      explanation_md: `Most local clients will pay you by mobile money or bank transfer, and some by cash. Each is fine, as long as you confirm the money has really arrived, give a receipt and keep a record.

## Mobile money

Mobile money is the most common way local clients pay freelancers. To receive it, a client needs your mobile money number and your registered name. Before you release final files:

* **Check your actual balance** or transaction history in your mobile money app or by dialling your provider's official menu. Do not rely on a screenshot, a forwarded message or an SMS that could be faked. Fake payment alerts are a known trick.
* **Check the amount and the sender's name** match what you expect.
* **Note the transaction reference** shown in your history.

Fees and limits apply to mobile money, and they change. Check your provider's current charges, and if a fee applies to receiving or withdrawing, include it in your pricing rather than being surprised.

## Bank transfers

Organisations such as NGOs, schools and companies often pay by bank transfer, sometimes only after receiving a proper invoice. Bank transfers can take longer to arrive. Give your account name exactly as the bank has it, your account number and your branch, and confirm the credit in your own banking app or statement before treating the job as paid. Some organisations follow their own payment schedule, so ask early how and when they pay.

## Cash

If a client pays in cash, count it in front of them, and give a written receipt on the spot. Record it in your spreadsheet the same day; cash is the easiest money to forget.

## Receipts

A receipt confirms that you received payment. Send one for every payment, even a small one. It can be a simple message or document that includes:

* The word "Receipt" and the date.
* Your name and the client's name.
* What the payment was for, with the invoice number if there was one.
* The amount received and the method, such as mobile money.
* The transaction reference.

Receipts protect both sides. If a client later says they paid twice, or that they paid when they did not, your records and references show what really happened.

## Wrong transfers and refund requests

Sometimes a person says they sent money to you by mistake and asks you to send it back. Check your real balance first. If money really did arrive by mistake, contact your provider's official customer service to handle the reversal, rather than sending money to a number given by a stranger. This protects you from a common trick.

## A small example

Hawa finishes flyers for a youth programme in Damongo. The organiser messages a screenshot: "Sent!" Hawa checks her real mobile money history, sees the payment with the correct name and amount, notes the reference, sends the print files and a short receipt, and records it in her spreadsheet. The whole process takes three minutes.`,
      practice_task_md: `**Goal:** Practise the local payment routine.

**Steps:**
1. Find where your mobile money app or menu shows your transaction history, and where it shows a transaction reference. Do not share your PIN with anyone.
2. Look up your provider's current fees for receiving and withdrawing, from the provider's official website or app.
3. Create a receipt template with: Receipt, date, your name, client name, what it was for, invoice number, amount, method and transaction reference.
4. Fill it in for a realistic made up payment.

**Done looks like:** A note of where to check your transaction history and references, your provider's current fees, and a filled in sample receipt.`,
      quiz: {
        questions: [
          {
            prompt: "How should you confirm a mobile money payment before releasing final files?",
            options: [
              "Trust the client's screenshot",
              "Trust any SMS alert",
              "Check your actual balance or transaction history",
              "Ask a friend if they think it arrived",
            ],
            answer_index: 2,
            explanation: "The lesson says screenshots and SMS can be faked, so check your real balance or history.",
          },
          {
            prompt: "What should a receipt include?",
            options: [
              "Your PIN and password",
              "The date, names, what it was for, amount, method and transaction reference",
              "Only the amount",
              "The client's home address and age",
            ],
            answer_index: 1,
            explanation: "The lesson lists these items for a clear receipt.",
          },
          {
            prompt: "Someone says they sent money to you by mistake and asks you to return it to another number. What should you do?",
            options: [
              "Send it back immediately to the number they give",
              "Check your real balance and, if money did arrive by mistake, use the provider's official customer service for the reversal",
              "Ignore your balance and send double",
              "Block them without checking",
            ],
            answer_index: 1,
            explanation: "The lesson says to check your balance and handle genuine reversals through official customer service.",
          },
          {
            prompt: "What does the lesson say about mobile money fees?",
            options: [
              "They are always zero",
              "They apply and change, so check your provider's current charges and include them in your pricing",
              "Only clients abroad pay them",
              "They are set by your client",
            ],
            answer_index: 1,
            explanation: "The lesson tells you to check current charges with your provider and plan for them.",
          },
        ],
        pass_threshold: 75,
      },
    },
    // @@NEXT@@
  },
};

export default content;
