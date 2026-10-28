import type { TrackContent } from "./types";

/**
 * Original lesson content for the Digital Sales roadmap (issue #198, process from issue #84).
 * Research and sources: src/content/research/digital-sales.md. Every scenario, script and name
 * is invented for teaching. Tools and companies are named only as examples; mobile money is
 * described without naming any provider; no income or commission figures are given.
 */
const content: TrackContent = {
  roadmap: "digital-sales",
  nodes: {
    "sales-foundations": {
      explanation_md: `Almost every business in Ghana needs someone who can sell. An internet provider needs people to sign up shops and homes. A seed and fertiliser company needs people to reach farmers and agro dealers. A software company needs people to book demos with schools and clinics. A food manufacturer needs people to get its products onto supermarket shelves. Sales is one of the biggest categories on Ghanaian job boards, and many of the roles accept school leavers and graduates who can show the right habits.

## What digital sales means

Selling used to mean walking from door to door. It still sometimes does, but today much of the work happens on a phone or a computer. You find possible customers online and through referrals, you contact them by call, WhatsApp or email, you keep track of every conversation in a simple system, and you agree payment by bank transfer or mobile money. This track teaches that modern way of selling, for an employer or a client.

It is different from running your own online shop and different from marketing. Marketing makes many people aware of a product at once. Selling is the one to one work of turning a single interested person or business into a paying customer, and then keeping them.

## What this first section covers

* **How selling works.** Selling to individuals versus selling to businesses, the job titles you will meet, and the steps a lead passes through before it becomes a sale.
* **Knowing your product and your customer.** Why people buy, and how to describe value in plain words.
* **Targets and sales numbers.** What sales teams measure, how pay is usually structured, and how to read an offer letter carefully.

## A small example

Wumpini helps her uncle sell solar lanterns in Tamale. At first she told everyone the lantern was "very good". Few people bought. Then she started asking customers how they lit their homes and what they spent on batteries and kerosene each week. She listened, showed how the lantern charges in the sun, and let a customer hold it. Sales improved, not because she talked more, but because she understood the buyer.

That is the heart of this track. Good selling is not pressure or tricks. It is understanding people, being honest about what you offer, and being organised enough to follow up.

## How to use this track

Work through the sections in order: foundations, finding prospects, reaching out, sales conversations, pipeline and CRM, working well, and getting hired. Each lesson ends with a practice task. Keep your finished tasks in one folder, because together they become proof of your skills for an employer or a training programme.`,
      practice_task_md: `**Goal:** Notice the selling that already happens around you.

**Steps:**
1. Open a notes app or a free document on your phone or computer.
2. Think of three times someone sold something to you: a trader, a phone credit seller, a shop attendant or someone on WhatsApp.
3. For each one, write what they sold, how they started the conversation and whether you bought.
4. Under each story, write one sentence on why you bought or did not buy. Was it trust, price, timing, or how they spoke to you?

**Done looks like:** Three short stories, each with a one sentence reason. Keep this note; you will return to it later in the track.`,
      quiz: {
        questions: [
          {
            prompt: "How does the lesson describe the difference between marketing and selling?",
            options: [
              "Marketing is done on phones, while selling only happens face to face in shops",
              "Selling is one to one work turning a single person or business into a customer",
              "Selling and marketing are the same job with different names in different companies",
              "Marketing is for businesses, while selling is only for individual buyers",
            ],
            answer_index: 1,
            explanation: "The lesson says marketing makes many people aware at once, while selling is the one to one work of turning an interested person or business into a paying customer.",
          },
          {
            prompt: "Why did Wumpini's lantern sales improve?",
            options: [
              "She lowered the price below what other sellers charged in the market",
              "She talked for longer and repeated that the lantern was very good",
              "She asked about their lighting costs and listened first",
              "She moved to a busier market where more people walked past",
            ],
            answer_index: 2,
            explanation: "Sales improved because she asked how customers lit their homes, listened, and then showed the lantern working.",
          },
          {
            prompt: "Which of these is part of digital sales as this track describes it?",
            options: [
              "Keeping track of every conversation in a simple system",
              "Running paid advertising campaigns for a large brand on social media",
              "Designing logos and product packaging for a manufacturer",
              "Building and managing your own online shop website from scratch",
            ],
            answer_index: 0,
            explanation: "The lesson lists finding customers, contacting them, keeping track of every conversation and agreeing payment as parts of digital sales.",
          },
          {
            prompt: "According to the lesson, what is good selling mainly about?",
            options: [
              "Using clever tricks so customers decide before they have time to think",
              "Talking more than the customer so they cannot raise any objection",
              "Offering the lowest price in town so that nobody can refuse",
              "Understanding people, being honest and following up in an organised way",
            ],
            answer_index: 3,
            explanation: "The lesson says good selling is understanding people, being honest about what you offer and being organised enough to follow up.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "how-selling-works": {
      explanation_md: `When you read sales adverts in Ghana you will see many job titles: sales representative, sales executive, telesales consultant, field sales officer, business development representative, graduate trainee in sales. They sound different, but they all sit somewhere on the same path from a stranger to a paying customer. Knowing that path helps you understand any sales job you are offered.

## Selling to people and selling to businesses

**B2C** means business to consumer: selling to individuals. A data bundle, a solar lantern, a motor insurance policy or a phone on credit are usually B2C. Decisions are often quick, made by one person or a family, and the amounts are smaller.

**B2B** means business to business: selling to companies, schools, clinics, NGOs or shops. Internet for an office, fertiliser for an agro dealer or accounting software for a pharmacy are B2B. Decisions take longer, several people may be involved, and each sale is usually bigger. You may need a written quote, a meeting and approval from an owner or manager.

## Common roles

* **Telesales.** Selling by phone and WhatsApp from an office or from home, often calling lists of leads.
* **Field sales.** Visiting shops, farms and offices in person, often with a phone app to record visits and orders.
* **Business development representative.** Finding and qualifying new business customers, then booking meetings for a more senior colleague.
* **Sales executive or account manager.** Running deals from first meeting to signed agreement, then looking after the customer so they buy again.

## The path a lead travels

Most sales follow similar steps, even if companies name them differently:

1. **Lead.** Someone who might need what you sell.
2. **Contacted.** You have reached them and they know who you are.
3. **Qualified.** You have checked they have a real need and can buy.
4. **Offer.** You have presented a solution or sent a quote.
5. **Negotiation.** You are agreeing details such as price, delivery and payment.
6. **Won or lost.** They buy, or they decide not to.

After a win, good sellers keep in touch, because a happy customer buys again and refers friends.

## A worked example

Fuseini works in telesales for an internet provider. He receives a list of shops in Tamale that asked about internet on a website form. He calls Mariama, who runs a printing shop. She needs reliable internet for her customers' printing jobs, so she is a qualified lead. Fuseini sends a price on WhatsApp, answers her question about installation time, and she agrees. That is a B2B sale moving through every step in one week. A home customer might move through the same steps in a single call.`,
      practice_task_md: `**Goal:** Map real sales jobs onto the path from lead to customer.

**Steps:**
1. Search a Ghanaian job board on your phone or computer for three entry level sales adverts.
2. For each advert, note the job title, whether it looks B2B or B2C, and whether it is telesales, field sales or business development.
3. Write which steps of the path (lead, contacted, qualified, offer, negotiation, won or lost) the role seems to handle.
4. Do not copy the advert text; use your own words.

**Done looks like:** A short table of three roles with title, B2B or B2C, role type and the steps it covers.`,
      quiz: {
        questions: [
          {
            prompt: "Which sale is the clearest example of B2B?",
            options: [
              "A student buying a data bundle for her own phone",
              "A family buying a solar lantern for their home in Yendi",
              "A pharmacy buying accounting software for its business",
              "A young man buying motor insurance for his personal car",
            ],
            answer_index: 2,
            explanation: "B2B means selling to a business, such as accounting software for a pharmacy.",
          },
          {
            prompt: "What does a business development representative usually do, according to the lesson?",
            options: [
              "Finds and qualifies new business customers, then books meetings",
              "Visits farms to deliver goods after customers have already paid for them",
              "Answers complaints from existing customers about faulty products",
              "Designs the company's adverts and posts them on social media pages",
            ],
            answer_index: 0,
            explanation: "The lesson says a business development representative finds and qualifies new business customers and books meetings for a senior colleague.",
          },
          {
            prompt: "In the path a lead travels, what does the qualified step mean?",
            options: [
              "The customer has signed and paid for the product in full",
              "You have sent a written quote and are waiting for a reply",
              "You have found their phone number on a business directory",
              "You have checked that they have a real need and are able to buy",
            ],
            answer_index: 3,
            explanation: "Qualified means you have checked the lead has a real need and is able to buy.",
          },
          {
            prompt: "Why does the lesson say B2B sales usually take longer than B2C sales?",
            options: [
              "Business customers never use phones, so all contact must happen in person",
              "Several people may be involved and you may need a quote and approval",
              "Businesses are not allowed to pay by bank transfer or mobile money",
              "Sellers are told to wait a month before contacting a business",
            ],
            answer_index: 1,
            explanation: "The lesson says B2B decisions can involve several people and need a quote, a meeting and approval.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "knowing-your-product": {
      explanation_md: `A customer in Bolgatanga does not wake up wanting "a 20 Mbps fibre plan". She wants her shop's card machine to stop failing, her children to finish online homework, and her evening films to stop buffering. People buy solutions to problems. Employers in Ghana regularly ask for product knowledge and a consultative approach, which simply means understanding the customer's problem first and then showing how your product helps.

## Features, benefits and proof

* **A feature** is what the product has or does: a solar lantern has a battery that lasts eight hours.
* **A benefit** is what that means for this customer: your children can study after dark without kerosene smoke.
* **Proof** is why they should believe you: a demonstration, a written warranty, or a customer who is willing to be called.

Beginners list features. Good sellers translate each feature into a benefit for the person in front of them, then offer proof. The same feature can mean different benefits to different people. Long battery life matters to a family for study time, and to a chop bar owner who closes late.

## Know the product honestly

Before you sell anything, learn:

* what it does and what it does not do
* the full price, including delivery, installation or monthly fees
* how payment works, for example mobile money, bank transfer or instalments
* what happens if something goes wrong: warranty, returns, support contacts
* how it compares with the alternatives the customer already uses

Knowing the limits matters as much as knowing the strengths. If a customer asks something you do not know, say "Let me check and come back to you today", and do it. Guessing destroys trust.

## Know who it is for

Write a short picture of your best customer. Which kind of person or business has this problem? What do they use now? What worries them about changing? For B2B, also ask who decides and who pays.

## The one sentence value statement

Practise saying what you sell in one or two plain sentences:

> We help [who] [get what result] by [how], so they can [benefit].

Abdul-Rahman sells a simple stock app to shops. His sentence is: "We help small shops in Tamale know exactly what stock they have, using an app on the owner's phone, so they stop running out of fast selling items." No jargon, no hype, and the shop owner instantly knows if it is relevant.

## A worked example

Hawa sells agro inputs. A farmer asks about a new maize seed. Hawa does not start with the seed's technical name. She asks about his last harvest and the rains. He lost crops to dry spells. She explains that this variety matures earlier, which can help it finish before the rains stop, shows him the company leaflet, and is honest that no seed can guarantee a harvest. The farmer trusts her because she spoke to his problem and did not overpromise.`,
      practice_task_md: `**Goal:** Turn product features into benefits and a value statement.

**Steps:**
1. Choose a real product sold near you: a data bundle, a solar lantern, a phone accessory, school fees software or a seed variety.
2. In a note or a free document, list five features.
3. Next to each feature, write a benefit for one specific customer, for example a Damongo shop owner or a student in Wa.
4. Write one form of proof you could offer for each.
5. Write a one or two sentence value statement using the pattern in the lesson.

**Done looks like:** A table of five features, benefits and proof, plus your value statement. Read it aloud and remove any jargon.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a benefit rather than a feature?",
            options: [
              "The lantern has a battery that lasts eight hours on one charge",
              "The lantern comes with a twelve month written warranty card",
              "The lantern's solar panel folds flat for carrying in a bag",
              "Your children can study after dark without kerosene smoke",
            ],
            answer_index: 3,
            explanation: "A benefit says what a feature means for the customer, such as children studying without kerosene smoke.",
          },
          {
            prompt: "What should you do if a customer asks a question you cannot answer?",
            options: [
              "Say you will check and come back to them today, then do it",
              "Give your best guess so the conversation keeps moving forward smoothly",
              "Change the subject to a feature you know well and talk about that",
              "Tell them the question is not important for their decision",
            ],
            answer_index: 0,
            explanation: "The lesson says to promise to check and come back the same day, because guessing destroys trust.",
          },
          {
            prompt: "What does a consultative approach mean in this lesson?",
            options: [
              "Charging customers a consulting fee before you show them any product",
              "Reading the product brochure aloud so the customer hears every detail",
              "Understanding the customer's problem first, then showing how it helps",
              "Letting a manager speak to every customer instead of doing it yourself",
            ],
            answer_index: 2,
            explanation: "Consultative selling means understanding the customer's problem first and then showing how your product helps.",
          },
          {
            prompt: "Why did the farmer trust Hawa?",
            options: [
              "She promised the seed would guarantee him a good harvest every year",
              "She spoke to his problem and was honest about the seed's limits",
              "She explained the seed's full technical name and its laboratory results",
              "She offered him the seed at half price if he bought that same day",
            ],
            answer_index: 1,
            explanation: "Hawa spoke to his problem with dry spells and was honest that no seed can guarantee a harvest.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "targets-and-numbers": {
      explanation_md: `Sales is one of the most measured jobs there is. Many sales adverts in Ghana mention targets, and interviewers often ask how you handle them. Understanding the numbers early means they help you instead of frightening you.

## What sales teams measure

There are two kinds of number.

**Activity numbers** count what you do:

* calls made and calls answered
* WhatsApp or email messages sent to new leads
* meetings or demos booked
* quotes or proposals sent

**Result numbers** count what happened:

* deals won
* value sold, in cedis
* money actually collected
* customers kept or lost

You control activity directly. Results depend on activity plus skill plus some luck. Managers watch both because activity predicts results. If you make few calls, you will rarely close many deals.

## Conversion rates

A conversion rate tells you how many people move from one step to the next. Suppose Issahaku makes 40 calls in a week, speaks to 20 people, books 5 meetings and wins 1 deal. You can describe that as 1 in 5 meetings becoming a sale, and 1 in 4 conversations becoming a meeting. Knowing your own rates lets you work backwards. If his target is 2 deals a week and nothing else changes, he needs roughly twice the activity, or he must improve one of the steps.

These example numbers are only for practice. Real rates differ a lot between products, customers and companies.

## Daily, weekly and monthly targets

Targets are usually set for a month or a quarter, then broken into weeks and days. Breaking a big target into a daily one makes it manageable: you can check by lunchtime whether you are on track.

## How pay is usually structured

Sales pay is often made of parts:

* a **basic salary** paid every month whatever happens
* a **commission or bonus** linked to results, such as deals won or money collected
* sometimes **allowances** for transport, airtime or data

The mix varies widely between employers. Some roles are salary only. Some are commission only, which means no sale, no pay.

## Read the offer carefully

Before you accept a sales job, read the offer letter or contract and make sure you understand:

* the basic salary, if any, and when it is paid
* exactly how any commission or bonus is calculated, and when it is paid
* whether targets can change and what happens if you miss them
* who pays for transport, airtime and data
* the probation period

Ask questions politely in writing if something is unclear. A good employer will explain. Be very careful with any role that promises big money but offers no basic pay, and never pay money to get a job.`,
      practice_task_md: `**Goal:** Plan your activity from a target.

**Steps:**
1. Use a free spreadsheet app such as Google Sheets on your phone or computer, or a sheet of paper.
2. Imagine a target of 4 deals a month. Assume that 1 in 5 meetings becomes a deal, 1 in 4 conversations becomes a meeting, and 1 in 2 calls is answered.
3. Work backwards: how many meetings, conversations and calls do you need each month, each week and each day (use 20 working days)?
4. Add a short note on which step you would try to improve first, and why.

**Done looks like:** A small table showing calls, conversations, meetings and deals per month, week and day, with your note.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is an activity number rather than a result number?",
            options: [
              "Value sold in cedis this month across all of your customers",
              "Money actually collected from customers this week",
              "Meetings or demos booked with new leads this week",
              "Customers kept or lost over the last quarter of the year",
            ],
            answer_index: 2,
            explanation: "Meetings booked count what you do, so they are an activity number.",
          },
          {
            prompt: "Issahaku books 5 meetings and wins 1 deal. How does the lesson describe that?",
            options: [
              "Five deals for every single meeting that he books in the week",
              "One in five of his meetings becoming a sale that week",
              "One in forty calls becoming a meeting with a customer",
              "A conversion rate that is the same for every product",
            ],
            answer_index: 1,
            explanation: "One deal from five meetings is described as 1 in 5 meetings becoming a sale.",
          },
          {
            prompt: "What does commission only pay mean?",
            options: [
              "A fixed salary is paid whether or not you sell anything",
              "Your employer pays your transport and data but nothing else",
              "You are paid once at the end of your probation period",
              "If you make no sale, you receive no pay for that period",
            ],
            answer_index: 3,
            explanation: "The lesson explains commission only means no sale, no pay.",
          },
          {
            prompt: "Why do managers watch activity numbers as well as results?",
            options: [
              "Activity predicts results, and it is the part you control directly",
              "Results cannot be measured in cedis, so activity is all they have",
              "Activity numbers decide your salary while results are never checked",
              "Customers ask to see how many calls a seller makes each day",
            ],
            answer_index: 0,
            explanation: "The lesson says you control activity directly and it predicts results.",
          },
          {
            prompt: "Which offer letter detail does the lesson tell you to check before accepting?",
            options: [
              "The colour of the company uniform and the office opening hours",
              "How many followers the company has on its social media pages",
              "Exactly how any commission or bonus is calculated and paid",
              "Whether the manager went to the same school as you did",
            ],
            answer_index: 2,
            explanation: "The lesson says to check exactly how commission or bonus is calculated and when it is paid.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "finding-prospects": {
      explanation_md: `No one can buy from you if you never meet them. Prospecting, which means finding people and businesses who might need what you sell, is one of the most common skills in Ghanaian sales adverts. It is also where many new sellers struggle, because they wait for customers to appear. This section teaches you to fill your own list.

## Three ideas to hold on to

**A prospect is not yet a customer.** A prospect, or lead, is someone who might buy. Many will not. That is normal. Your job is to find enough good leads that the ones who do buy add up to your target.

**Quality beats quantity.** Calling two hundred random numbers is tiring and annoys people. Fifty well chosen leads who match your best customer picture will usually give better results and fewer awkward calls. Qualifying, which means checking whether a lead is a good fit, saves you and the customer time.

**Some leads come to you.** When a customer sends a WhatsApp message, fills a form or calls the office, they are an inbound lead. They are often the warmest leads you will get, and a slow reply can lose them to a competitor.

## What this section covers

* **Finding and listing leads.** Where leads come from, from referrals and directories to walking a market street, and how to keep them in a tidy spreadsheet.
* **Qualifying leads.** Simple checks on need, budget, timing and who decides, so you spend time on people who can buy.
* **Responding to inbound enquiries.** Replying quickly and helpfully, asking the right questions and recording every enquiry.

## Outbound and inbound

You will hear two words often:

* **Outbound** means you start the contact: a cold call, a visit, a first email.
* **Inbound** means the customer starts it: a message, a form or a walk in.

Most sales jobs mix both. Telesales teams often call inbound leads from a website or a social media advert, then do outbound calls to older lists. Field sales officers walk into shops unannounced but also receive referrals.

## A small example

Amina sells a school management app. In her first week she called every school she could find, including ones far outside the area her company serves. Many were not interested and some had no internet at all. In her second week she listed only private schools in Tamale and Savelugu with more than one stream, noted the head teacher's name, and asked a friend who teaches to introduce her to two heads. She made fewer calls but booked three meetings.

The lessons that follow show you how to do what Amina learned: find the right leads, check them quickly, and never let a warm enquiry go cold.`,
      practice_task_md: `**Goal:** Describe the leads you would look for.

**Steps:**
1. Pick a product you could sell, such as internet for shops, a stock app, solar lamps or crop insurance.
2. In a note, write a short picture of a good lead: type of person or business, location, size, and the problem they have.
3. List three outbound ways and two inbound ways you could find such leads.
4. Write one sign that a lead is probably not a good fit.

**Done looks like:** A short description of your ideal lead, five sources split into outbound and inbound, and one warning sign.`,
      quiz: {
        questions: [
          {
            prompt: "What is a prospect, as the lesson uses the word?",
            options: [
              "A customer who has already paid and signed an agreement",
              "A sales manager who sets weekly targets for the team",
              "Someone who might buy from you, but has not bought yet",
              "A competitor who sells the same product in your area",
            ],
            answer_index: 2,
            explanation: "The lesson defines a prospect or lead as someone who might buy.",
          },
          {
            prompt: "Which of these is an inbound lead?",
            options: [
              "A shop you walk into without any appointment to introduce yourself",
              "A customer who sends your business a message asking about prices",
              "A school whose number you found on a directory and called today",
              "A clinic you emailed for the first time after seeing its signboard",
            ],
            answer_index: 1,
            explanation: "Inbound means the customer starts the contact, such as by sending a message.",
          },
          {
            prompt: "Why did Amina book more meetings in her second week?",
            options: [
              "She chose leads that fit her company and used introductions",
              "She called every school she could find, including those far away",
              "She sent the same long message to many more numbers than before",
              "She offered every school a large discount on the first call",
            ],
            answer_index: 0,
            explanation: "She listed schools that fit her company's customers and asked a friend for introductions.",
          },
          {
            prompt: "What does the lesson say about quality and quantity of leads?",
            options: [
              "Calling as many random numbers as possible always gives the best results",
              "Quality does not matter, because every person is equally likely to buy",
              "You should only ever call leads that a manager has given you directly",
              "Well chosen leads that fit usually give better results than random ones",
            ],
            answer_index: 3,
            explanation: "The lesson says fifty well chosen leads usually beat two hundred random numbers.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "finding-leads": {
      explanation_md: `Most entry level sales roles in Ghana ask you to generate leads, not just call the ones you are given. Being able to build a clean lead list quickly, with free tools, is a skill you can show in an interview.

## Where leads come from

* **Referrals.** Happy customers, friends, family, church or mosque members and former classmates who know someone with the problem you solve. Referrals are often the warmest leads because trust is borrowed from the person who introduced you.
* **Online maps.** Searching a free maps app for "pharmacy Tamale" or "hotel Wa" shows businesses with their phone numbers and opening hours.
* **Business directories and associations.** Trade associations, chambers of commerce, market queens and district business groups often publish member lists.
* **Social media.** Business pages on Facebook, Instagram and TikTok show who is active and growing. Look at what they post and what they complain about.
* **Events.** Trade fairs, farmer field days, church bazaars and school PTA meetings let you meet many prospects in one place.
* **Walking.** Field sales still works. Walking a market street or an industrial area and noting the businesses is cheap and effective.

## Public does not mean permission

Finding a business's public number is fine for a polite, relevant business call. It is different for private individuals. Do not copy numbers out of WhatsApp groups, buy contact lists of unknown origin, or add strangers to broadcast lists. You will learn more about consent and Ghana's data protection law later in this track.

## A simple lead list

Keep leads in a free spreadsheet such as Google Sheets, which works in a phone browser or app as well as on a computer. Use one row per lead and these columns:

* Business or person name
* Contact person and role
* Phone or WhatsApp number
* Email, if any
* Location
* Source (referral, maps, event and so on)
* Notes on their likely need
* Status (new, contacted, qualified, not a fit)
* Next action and date

Keep it tidy: one number format, the same spelling for towns, and no duplicates. A messy list wastes time and makes you call the same person twice.

## A worked example

Sumaila sells point of sale software to pharmacies. On Monday he searches a maps app for pharmacies in Tamale and lists twenty with phone numbers. He asks a pharmacist friend for two introductions and notes them as referrals. He checks each pharmacy's social media page and writes one line about it, such as "posts new stock daily" or "complains about queues". By Monday evening he has a list he can actually work from, with a reason to call each one.`,
      practice_task_md: `**Goal:** Build a starter lead list of 15 businesses.

**Steps:**
1. Choose a product and a type of business that might need it, in your town.
2. Create a spreadsheet in Google Sheets or another free app with the columns from the lesson.
3. Use a maps app, social media pages and your own knowledge to add 15 businesses with public contact details. Use only business numbers that are publicly listed.
4. Fill the source and notes columns for every row, and set the status to new.
5. Sort by location and check for duplicates.

**Done looks like:** A clean list of 15 leads with no duplicates and a note for each. Remove any real phone numbers before you share it with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why are referrals often the warmest leads?",
            options: [
              "They always have the biggest budget of any kind of lead",
              "Trust is borrowed from the person who introduced you",
              "They come from a paid list so the details are always correct",
              "They never ask about price before deciding to buy",
            ],
            answer_index: 1,
            explanation: "The lesson says referrals are warm because trust is borrowed from the person who introduced you.",
          },
          {
            prompt: "Which way of collecting contacts does the lesson warn against?",
            options: [
              "Searching a maps app for public business numbers in your town",
              "Asking happy customers if they know anyone with the same problem",
              "Copying private numbers out of WhatsApp groups you belong to",
              "Meeting business owners at a trade fair and noting their cards",
            ],
            answer_index: 2,
            explanation: "The lesson says not to copy numbers out of WhatsApp groups or add strangers to broadcast lists.",
          },
          {
            prompt: "What is the purpose of the source column in a lead list?",
            options: [
              "To record where each lead came from, such as a referral or maps",
              "To show how much money the lead is expected to spend with you",
              "To store the customer's home address for delivery of goods",
              "To list which competitor products the lead currently uses",
            ],
            answer_index: 0,
            explanation: "The source column records where the lead came from.",
          },
          {
            prompt: "What did Sumaila add to each row that gave him a reason to call?",
            options: [
              "A discount code for each pharmacy that called back within a day",
              "The pharmacist's personal home number found through a friend",
              "A copy of each pharmacy's licence downloaded from the internet",
              "A one line note from their social media page, such as queue complaints",
            ],
            answer_index: 3,
            explanation: "He wrote one line about each pharmacy from its social media page, giving him a reason to call.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "qualifying-leads": {
      explanation_md: `Every hour you spend on someone who cannot buy is an hour you did not spend on someone who can. Qualifying means checking, early and politely, whether a lead is a real fit. Employers ask for it because unqualified leads clog the pipeline and make forecasts wrong.

## BANT: four quick checks

A common checklist is **BANT**:

* **Budget.** Can they afford it, or can they get the money? Not "Do you have money?" but "How do you pay for this kind of thing now?"
* **Authority.** Who makes the decision and who pays? In a shop it may be the owner; in a school, the head and the board; in a family, a parent.
* **Need.** Do they have the problem your product solves, and does it matter to them?
* **Timing.** When do they want to solve it? Today, after harvest, next school term, or "someday"?

You do not need a perfect yes on all four. A lead with a strong need and the right person, but budget only after harvest, is still worth keeping, with a follow up date in the right month.

## Ask, do not interrogate

Qualifying should feel like a helpful conversation, not a form. Natural questions include:

* "How are you handling this at the moment?"
* "What made you look into it now?"
* "Apart from you, who else would be involved in deciding?"
* "When would you ideally want this working?"
* "Do you have a rough budget in mind?"

Listen to the answers and write them in your lead list or CRM.

## Three outcomes

After qualifying, put each lead in one of three groups:

* **Qualified.** Move forward: book a demo, send a quote, arrange a visit.
* **Not now.** Real need but wrong timing or budget. Set a polite follow up for the right time.
* **Not a fit.** No need, or you cannot help them. Thank them, close the lead, and if possible suggest where they might find help.

Saying "This might not be right for you" honestly builds a reputation. People remember the seller who did not waste their time, and they refer friends.

## A worked example

Mariama sells a bulk SMS service to businesses. A caller from a hair salon in Wa says she wants "messages". Mariama asks how she contacts customers now (by WhatsApp, one by one), what she wants to send (reminders and festive offers), who decides (the owner, herself), and when (before Christmas). Budget is small. Mariama suggests the smallest bundle, notes her as qualified with a decision date, and books a call for Friday. A second caller only wants to "know the price for a friend". Mariama answers kindly, offers to speak to the friend directly, and marks him not a fit for now.`,
      practice_task_md: `**Goal:** Practise qualifying with BANT.

**Steps:**
1. Take five leads from your lead list (or invent five realistic ones).
2. For each, write one natural question for budget, authority, need and timing.
3. With a friend or family member playing the customer, role play two of the conversations by phone or in person.
4. After each role play, record what you learned in the lead list and mark the lead qualified, not now or not a fit, with a next action and date.

**Done looks like:** Twenty questions written in your own words, two role plays done, and two leads updated with an outcome and a next step.`,
      quiz: {
        questions: [
          {
            prompt: "In BANT, what does the A stand for?",
            options: [
              "Appointment, meaning a booked meeting in the diary",
              "Authority, meaning who makes the decision and who pays",
              "Advert, meaning where the lead first saw the product",
              "Amount, meaning how many units the customer will order",
            ],
            answer_index: 1,
            explanation: "A stands for Authority: who makes the decision and who pays.",
          },
          {
            prompt: "A lead has a strong need and is the decision maker, but has money only after harvest. What does the lesson suggest?",
            options: [
              "Close the lead as not a fit and remove it from the list",
              "Push them to borrow money so they can buy straight away",
              "Keep the lead with a follow up in the right month",
              "Send them reminders every day until harvest arrives",
            ],
            answer_index: 2,
            explanation: "The lesson says such a lead is worth keeping, with a follow up in the right month.",
          },
          {
            prompt: "Which question is the lesson's suggested way to ask about budget?",
            options: [
              "Do you have a rough budget in mind?",
              "Do you actually have any money, or am I wasting my time today?",
              "Can you send me a copy of your bank statement before we talk?",
              "How much profit does your business make each month?",
            ],
            answer_index: 0,
            explanation: "The lesson suggests asking about budget gently, for example \"Do you have a rough budget in mind?\"",
          },
          {
            prompt: "Why does the lesson say honestly telling someone a product might not be right for them is good?",
            options: [
              "It means you do not need to record anything in your lead list",
              "It allows you to skip the rest of the BANT checklist entirely",
              "It makes customers feel guilty so they buy something else instead",
              "It builds trust, and people then refer their friends to you",
            ],
            answer_index: 3,
            explanation: "The lesson says this honesty builds a reputation and earns referrals.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "inbound-enquiries": {
      explanation_md: `When someone messages a business to ask about a product, they are already interested. That is the warmest kind of lead. Yet many Ghanaian businesses lose these sales by replying hours later, answering only the price, or forgetting the conversation entirely. Employers hiring telesales and sales executives want people who turn enquiries into sales.

## Speed matters

A person asking about internet, a phone or a course is often asking several sellers at once. The first helpful reply often wins. Aim to reply within minutes during working hours. If you are away, set an automatic greeting in WhatsApp Business that says when you will reply, then keep that promise.

## Do not just send the price

"How much?" is the most common first message. If you reply only with a number, the customer compares numbers and usually picks the cheapest. Instead:

1. **Answer the question.** Give the price or a price range. Hiding it annoys people.
2. **Add one useful fact.** What is included, delivery time, or warranty.
3. **Ask one question** that helps you recommend the right option.

Example: "Hello Sir, thanks for asking. The home plan is from 250 cedis a month, with free installation in Tamale this month. Is it for a home or a business, and how many people will use it?" (The price here is made up for this example.)

## Ask, then recommend

Once they reply, use a few quick qualifying questions: who it is for, what they use now, when they need it. Then recommend one option and explain why, in one or two sentences. Offer a clear next step: "Shall I book the installer for Thursday?" or "Can I call you in five minutes to explain the options?"

## Record every enquiry

An enquiry that is not recorded is easily forgotten. Add each one to your lead list or CRM with the date, channel, what they asked, what you recommended and the next action. Use WhatsApp Business labels such as "new enquiry", "quote sent" and "paid" so you can see at a glance who needs a reply.

## Follow up once or twice, then stop

If someone goes quiet after a quote, a polite follow up the next day and another a few days later is reasonable: "Hello Madam, just checking if you had any questions about the plan." If there is still no answer, mark the lead and leave it. Repeated messages to someone who has gone silent feel like pressure.

## A worked example

Issahaku sells laptops for a shop in Tamale. At 7pm a student messages: "Price of laptop?" Issahaku replies within five minutes with two models and prices, mentions the warranty, and asks what she will use it for. She says coding classes and that her budget is tight. He recommends the cheaper model with more memory, explains why in one sentence, and offers mobile money payment with collection at the shop. He labels the chat "quote sent", adds a row to his sheet, and she pays the next morning.`,
      practice_task_md: `**Goal:** Write replies that turn enquiries into conversations.

**Steps:**
1. Choose a product and invent three typical first messages, such as "How much?", "Do you deliver to Wa?" and "Is it original?".
2. For each, write a reply that answers the question, adds one useful fact and asks one question.
3. Write one polite follow up message for a customer who went quiet after a quote.
4. If you have WhatsApp Business, set up a greeting message and three labels for practice, on a test chat only.

**Done looks like:** Three replies and one follow up, each under 60 words, plus a screenshot of your labels if you made them.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say you should not reply to \"How much?\" with only a number?",
            options: [
              "Customers then compare numbers and usually choose the cheapest",
              "Prices should never be shared on WhatsApp under any circumstances",
              "A number alone makes the message too long to read on a phone",
              "Customers are not allowed to know prices until they visit the shop",
            ],
            answer_index: 0,
            explanation: "The lesson says a bare number leads customers to compare and pick the cheapest.",
          },
          {
            prompt: "What three parts does the lesson suggest for a reply to a price question?",
            options: [
              "A greeting, a long product history and a request for payment",
              "A discount, a deadline and a warning that stock is running out",
              "The price, a photo of the shop and a list of other customers",
              "Answer the question, add one useful fact and ask one question",
            ],
            answer_index: 3,
            explanation: "The lesson's three parts are answer the question, add one useful fact and ask one question.",
          },
          {
            prompt: "What should you do if a customer goes quiet after a quote?",
            options: [
              "Message them every day until they reply or block you",
              "Follow up politely once or twice, then mark the lead and stop",
              "Call their friends and family to ask them to remind the customer",
              "Delete the conversation immediately so it does not distract you",
            ],
            answer_index: 1,
            explanation: "The lesson suggests one or two polite follow ups, then marking the lead and leaving it.",
          },
          {
            prompt: "How did Issahaku help the student choose a laptop?",
            options: [
              "He sent her the full price list of every laptop in the shop",
              "He told her to pick whichever laptop her friends had bought",
              "He asked about her needs, then recommended one and said why",
              "He offered the most expensive model because it was the best",
            ],
            answer_index: 2,
            explanation: "He asked about her use and budget, then recommended the cheaper model with more memory and said why.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "reaching-out": {
      explanation_md: `Once you have a list of leads, someone has to contact them. In Ghana that usually means a phone call or a WhatsApp message, and for businesses often an email or a LinkedIn message too. Adverts for telesales, business development and sales executive roles nearly always ask for confident outreach across several channels.

## Choosing the right channel

Each channel suits different people and moments:

* **Phone calls** are fast and personal. You hear tone, answer questions on the spot and can agree a next step in minutes. They interrupt people, so keep them short and respectful.
* **WhatsApp** is where many Ghanaian customers already talk to businesses. It lets people reply when convenient and lets you send photos, catalogues, voice notes and prices. It is also personal space, so messages must be welcome and relevant.
* **Email** suits business buyers, especially offices, schools, NGOs and larger companies that need written quotes and records.
* **LinkedIn** helps you reach managers in companies and organisations, and lets them check who you are before replying.

A good rule: match the channel to how the customer already communicates. A market trader may never open email; a procurement officer at an NGO may prefer it.

## Polite and persistent, never spam

Most people do not reply to the first contact. They are busy, not rude. Sellers who give up after one try lose many sales. But sellers who message ten times in a week become a nuisance and damage their company's name.

Healthy persistence looks like this:

* a clear first contact with a reason that matters to them
* two or three follow ups spread over a week or two, each adding something useful
* switching channel once, for example a call after an unanswered email
* stopping when someone says no, asks you to stop, or never responds

## Consent and respect

Contacting a business about a relevant product is normal. Adding private individuals to broadcast lists or groups without their agreement is not. Always give people an easy way to say "no thanks" and respect it immediately. Ghana's data protection law, covered later in this track, backs this up.

## What this section covers

* **Cold calls and telesales.** Openings, scripts, handling a quick no and booking the next step.
* **Selling on WhatsApp Business.** Catalogues, labels, quick replies, broadcast lists and the line between follow up and spam.
* **Email and LinkedIn outreach.** Short, personal messages to business buyers, and follow ups that get replies.

## A small example

Napari contacts a guest house in Bolgatanga about a booking app. She emails the manager with one sentence about a problem guest houses share, missed phone bookings at night. No reply. Three days later she calls the front desk, asks for the manager by name, and refers to her email. The manager remembers it and agrees to a short demo on Friday.`,
      practice_task_md: `**Goal:** Plan a respectful outreach sequence.

**Steps:**
1. Pick three leads from your lead list: one individual, one small business, one larger organisation.
2. For each, choose the first channel and write one sentence explaining why it fits that customer.
3. Plan up to three follow ups over two weeks for each, noting the channel and what new, useful thing each one adds.
4. Write the exact words you would use to accept a "no thanks" politely.

**Done looks like:** Three short outreach plans with channels, timing and content, plus your polite closing line.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, which channel often suits a procurement officer at an NGO?",
            options: [
              "A voice note sent late at night to their personal WhatsApp",
              "Adding them to a broadcast list of local market traders",
              "Email, which suits buyers who need written quotes",
              "A visit to their home on a weekend without warning",
            ],
            answer_index: 2,
            explanation: "The lesson says email suits business buyers such as NGOs that need written quotes and records.",
          },
          {
            prompt: "What does healthy persistence look like?",
            options: [
              "Messaging the same lead every day until they finally give an answer",
              "A few useful follow ups spread over a week or two, then stopping",
              "Giving up after the first message because silence always means no",
              "Asking a friend to call the customer pretending to be someone else",
            ],
            answer_index: 1,
            explanation: "The lesson describes two or three useful follow ups spread over a week or two, stopping when there is no response.",
          },
          {
            prompt: "Why did the guest house manager agree to Napari's demo?",
            options: [
              "Napari called and referred to her email about a shared problem",
              "Napari offered the app free for life if the manager agreed that day",
              "Napari sent ten messages in one week until the manager gave in",
              "The manager had already bought the app from another seller",
            ],
            answer_index: 0,
            explanation: "She followed an email about missed night bookings with a call that referred to it, and the manager remembered.",
          },
          {
            prompt: "What rule does the lesson give for choosing a channel?",
            options: [
              "Always use email first because it looks the most professional",
              "Use only phone calls, because written messages are easy to ignore",
              "Use whichever channel is cheapest for your company that week",
              "Match the channel to how the customer already communicates",
            ],
            answer_index: 3,
            explanation: "The lesson says to match the channel to how the customer already communicates.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "calls-and-telesales": {
      explanation_md: `Telesales and outbound calling are among the most common skills in Ghanaian sales adverts. A sales call is short. You have a few seconds to earn the right to a minute, and a minute to earn a next step. The good news is that a simple structure, practised aloud, makes calls much easier.

## Before you dial

* Know who you are calling and why they might care. Check your lead list notes.
* Have one clear goal for the call, usually a next step: a meeting, a demo, a visit or permission to send a quote. Closing a big sale on a cold call is rare.
* Stand or sit up straight, smile and have water nearby. People can hear energy.
* Call at sensible times. Avoid early mornings, prayer times you know of, and late evenings.

## A simple call structure

1. **Greet and introduce.** "Good morning, is this Mr Alhassan? My name is Rashida, I am calling from a company that sells stock apps to shops."
2. **Ask permission.** "Have I caught you at a bad time?" This sounds odd, but it shows respect, and people often say "No, go ahead."
3. **Give the reason.** One sentence linked to their world: "I am calling because many provision shops in Tamale tell us they lose track of fast selling items."
4. **Ask a question.** "How do you keep track of your stock at the moment?" Then listen.
5. **Suggest a next step.** "Could I show you how it works in ten minutes on Thursday at your shop?"
6. **Confirm.** Repeat the day, time and place, and thank them.

## Scripts: guides, not cages

Many telesales teams give you a script. Learn it well, then say it in your own natural voice. A script read word for word sounds robotic and makes people hang up. Treat it as a map: the key points and questions, in order, with room to respond to what you hear.

## Handling a quick no

Many calls end with "Not interested." Stay polite:

* "No problem, thank you for your time. May I ask, is it that you already have something, or that it is not a priority now?"

If they answer, you learn something useful. If they want to go, let them go warmly. Never argue, and never call back the same day.

## After the call

Immediately log the call: outcome, what you learned, next step and date. If you booked a meeting, send a short WhatsApp or email confirmation. Calls that are not logged are wasted, because you or your colleague will not know what happened.

## Language

Speak clearly and a little slower than normal. If the customer is more comfortable in Dagbani, Hausa, Twi or another language you speak, it is often fine to switch, unless your employer requires otherwise. Several employers list local languages as a plus.`,
      practice_task_md: `**Goal:** Write and practise a short call script.

**Steps:**
1. Choose a product and a type of customer from your lead list.
2. Write a script using the six steps in the lesson, in your own words, under 120 words.
3. Write your polite response to "Not interested".
4. Ask a friend or family member to play the customer by phone. Do three practice calls, with them saying yes, maybe and no.
5. Record yourself on one call with your device's voice recorder (with your partner's permission), listen back and note one thing to improve.

**Done looks like:** A script, your "not interested" response, and a short note on what you improved after listening to the recording.`,
      quiz: {
        questions: [
          {
            prompt: "What is usually the goal of a cold call, according to the lesson?",
            options: [
              "To close the full sale and collect payment on the first call",
              "To read the whole script word for word without pausing",
              "To get a next step such as a meeting, demo or visit",
              "To find out the customer's personal details for later use",
            ],
            answer_index: 2,
            explanation: "The lesson says the goal is usually a next step, because closing a big sale on a cold call is rare.",
          },
          {
            prompt: "Why does the lesson suggest asking \"Have I caught you at a bad time?\"",
            options: [
              "It shows respect, and people often say go ahead anyway after hearing it",
              "It gives the customer an easy excuse to end the call politely",
              "It is a legal requirement for every sales call made in Ghana",
              "It lets you skip the introduction and get straight to the price",
            ],
            answer_index: 0,
            explanation: "The lesson says asking permission shows respect and people often say go ahead.",
          },
          {
            prompt: "How should you use a telesales script?",
            options: [
              "Read it word for word so you never make any mistakes at all",
              "Ignore it completely and say whatever comes into your mind",
              "Ask the customer to read the script so they understand the offer",
              "Learn it well, then say it naturally in your own voice",
            ],
            answer_index: 3,
            explanation: "The lesson calls scripts guides, not cages: learn them, then speak naturally.",
          },
          {
            prompt: "What should you do immediately after a call?",
            options: [
              "Call the customer back the same day to ask if they changed their mind",
              "Log the outcome, what you learned and the agreed next step",
              "Delete the number so you do not call the same person again",
              "Send them a broadcast message with all your other products",
            ],
            answer_index: 1,
            explanation: "The lesson says to log the outcome, what you learned and the next step straight away.",
          },
          {
            prompt: "A customer says \"Not interested.\" Which response matches the lesson?",
            options: [
              "Argue that they will regret it and list every feature again",
              "Hang up immediately without saying anything else to them",
              "Thank them, and politely ask if they already have something or it is not a priority",
              "Promise a large discount if they stay on the line for five minutes",
            ],
            answer_index: 2,
            explanation: "The lesson suggests thanking them and politely asking whether they already have something or it is not a priority now.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "selling-on-whatsapp": {
      explanation_md: `For many Ghanaian customers, WhatsApp is the natural place to talk to a business. They ask questions, see photos, agree a price and send mobile money without leaving the chat. Many sales roles expect you to follow up leads on WhatsApp. Doing it well means being organised, quick and respectful.

## Use WhatsApp Business

WhatsApp Business is a free app, separate from personal WhatsApp, made for businesses. Employers often give you a work number. Its main selling tools are:

* **Business profile.** Name, description, address, hours and a link. Customers check it before trusting you.
* **Catalogue.** Products or services with photos, prices and short descriptions. Instead of typing details again and again, you share an item from the catalogue.
* **Quick replies.** Saved answers to common questions, such as delivery areas or payment details, that you insert with a shortcut.
* **Labels.** Colour tags on chats such as "new lead", "quote sent", "awaiting payment", "paid" and "follow up". They turn your chat list into a simple pipeline.
* **Greeting and away messages.** Automatic replies when someone first messages, or outside working hours.

## Broadcast lists and consent

A broadcast list sends one message to many contacts, but each person receives it as a private chat. WhatsApp's help pages say only people who have added your number to their phone's contacts will receive your broadcast. Saving your number is not the same as agreeing to marketing, so only add people who have agreed to hear from you, keep messages relevant and occasional, and include a line such as "Reply STOP if you would rather not receive these." Remove anyone who asks, immediately.

Never add customers to groups without asking. A group exposes everyone's number to strangers, which customers rightly dislike.

## Selling in the chat

* Reply quickly and greet properly: "Good afternoon Madam Ayishetu."
* Send short messages. One idea per message is easier to read.
* Use photos, short videos or a voice note when they help. Many customers prefer voice notes, but keep them under a minute.
* Confirm the order in writing before payment: item, quantity, price, delivery fee, delivery date.
* For mobile money, share the official business number or merchant details only, and ask the customer to send a screenshot or the transaction ID. Check that the money has arrived in the business wallet before releasing goods.

## Follow up without spamming

A good follow up adds value: "The blue one you asked about is back in stock" or "Delivery to Savelugu is free this week." A bad follow up just repeats "Hello?" Three unanswered messages is a sign to stop and label the chat closed.

## A worked example

Mahama sells school uniforms. A parent asks about sizes. Mahama shares the catalogue item, sends a quick reply with the size chart, and asks the child's age. He labels the chat "quote sent". Two days later he sends one follow up saying the size she needs is in stock. She pays by mobile money, he confirms the money has arrived, labels the chat "paid" and books delivery.`,
      practice_task_md: `**Goal:** Set up WhatsApp Business as a small sales tool.

**Steps:**
1. If you can, install WhatsApp Business on a spare number. If not, do steps 2 to 6 in a notes app.
2. Write a business profile description of under 50 words for a real or imaginary shop.
3. Create (or write) three catalogue items with a name, price in cedis and one sentence description.
4. Write three quick replies: delivery areas, how to pay by mobile money safely, and opening hours.
5. Create five labels that match the steps of a sale.
6. Write one broadcast message with a clear way to opt out.

**Done looks like:** A profile, three catalogue items, three quick replies, five labels and one broadcast message, saved as screenshots or a note.`,
      quiz: {
        questions: [
          {
            prompt: "What are WhatsApp Business labels used for in selling?",
            options: [
              "Tagging chats by stage, turning the chat list into a simple pipeline",
              "Printing price stickers to attach to products in the shop",
              "Hiding chats from your manager so they cannot read them",
              "Sending the same message to every contact on your phone",
            ],
            answer_index: 0,
            explanation: "Labels such as new lead, quote sent and paid turn the chat list into a simple pipeline.",
          },
          {
            prompt: "Which practice does the lesson recommend for broadcast lists?",
            options: [
              "Add every number you can find so the message reaches more people",
              "Send several messages a day so customers do not forget you",
              "Add customers to a big group so they can see each other",
              "Only add people who agreed, and include a way to opt out",
            ],
            answer_index: 3,
            explanation: "The lesson says to add only people who agreed and include a way to opt out, removing anyone who asks.",
          },
          {
            prompt: "Before releasing goods paid for by mobile money, what should you check?",
            options: [
              "That the customer has sent a thank you voice note to the business",
              "That the money has actually arrived in the business wallet",
              "That the customer has shared the order with three friends",
              "That the screenshot looks clear enough to post on your status",
            ],
            answer_index: 1,
            explanation: "The lesson says to check the money has arrived in the business wallet before releasing goods.",
          },
          {
            prompt: "Which is an example of a good follow up message?",
            options: [
              "\"Hello?\" sent again after two earlier unanswered messages",
              "A long list of every product in the shop with no prices",
              "\"The size you asked about is now back in stock, shall I keep one?\"",
              "A message telling the customer they will lose out if they wait",
            ],
            answer_index: 2,
            explanation: "A good follow up adds value, such as telling the customer the size they need is in stock.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "email-and-linkedin-outreach": {
      explanation_md: `When you sell to businesses, schools, NGOs or larger companies, the person you need often sits behind a reception desk and a busy phone. A short, personal email or LinkedIn message lets them read your offer when they have time, check who you are, and forward it to colleagues. Adverts for business development and sales executive roles often ask for email and digital outreach.

## What makes outreach work

Busy people decide in seconds whether to read on. A good outreach message is:

* **Short.** Under about 120 words, readable on a phone without scrolling much.
* **Personal.** It mentions something specific about them: their organisation, a recent project, their location or a problem their sector faces.
* **About them, not you.** It starts with their situation, not your company history.
* **Clear about the ask.** One small next step, such as a 15 minute call, not "please buy".

## A simple structure

1. **Subject line.** Specific and plain: "Stock tracking for pharmacies in Tamale". Avoid capital letters, "URGENT" and lots of exclamation marks, which look like spam.
2. **Opening.** Why you are writing to this person: "I saw that your clinic opened a second branch in Savelugu this year."
3. **Value.** One or two sentences on the problem you help with and the result: "We help clinics keep one stock list across branches, so they stop running out of common drugs."
4. **Ask.** "Would a 15 minute call next Tuesday or Wednesday be useful?"
5. **Sign off.** Your full name, role, company and phone number.

## Following up

Most first emails get no reply. Send a short follow up after three to five working days, and perhaps one more a week later. Each should add something: a short example, an answer to a likely question, or a different time. If there is still nothing, close the lead politely: "I will not take more of your time, but feel free to contact me if this becomes useful."

## LinkedIn basics

A clean profile helps before you message anyone. Use a clear photo, a headline that says what you do, and a short summary. When you send a connection request, add a short note explaining why you are connecting. Do not send a sales pitch in the first message. Connect, then share something useful or ask a relevant question. Never use automation tools that send hundreds of messages, which can get your account restricted.

## A worked example

Zuwera sells a staff training app. She finds the HR manager of a microfinance company in Tamale on the company website. Her email subject: "Training new loan officers faster". She mentions the company's recent branch openings, says the app helps new staff learn policies on their phones in short lessons, and asks for a 15 minute call. No reply. Four days later she sends two lines with a short example from a similar business. The manager replies and books a call.`,
      practice_task_md: `**Goal:** Write a business outreach email and two follow ups.

**Steps:**
1. Choose a real type of organisation near you, such as a clinic, school, hotel or NGO, and a product you could sell to it. Do not send the email.
2. Write a subject line and an email using the five part structure, under 120 words.
3. Write two follow ups, each under 60 words, each adding something new.
4. Write a polite closing message for when there is no reply.
5. Optional: write a LinkedIn connection note under 200 characters.

**Done looks like:** One email, two follow ups and a closing message, saved in a document you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which subject line best follows the lesson's advice?",
            options: [
              "URGENT!!! AMAZING OFFER FOR YOU TODAY ONLY!!!",
              "Hello",
              "Our company history and complete list of products and services",
              "Stock tracking for pharmacies in Tamale",
            ],
            answer_index: 3,
            explanation: "The lesson recommends specific, plain subject lines and warns against capitals and exclamation marks.",
          },
          {
            prompt: "What should the ask in an outreach email usually be?",
            options: [
              "One small next step, such as a 15 minute call next week",
              "A request to pay a deposit before you explain the product",
              "A demand that they reply within one hour or lose the offer",
              "A request that they forward your email to all their contacts",
            ],
            answer_index: 0,
            explanation: "The lesson says to ask for one small next step, such as a 15 minute call.",
          },
          {
            prompt: "What does the lesson advise for a first LinkedIn message?",
            options: [
              "Send a full sales pitch with prices as soon as they accept",
              "Use automation tools to message hundreds of people at once",
              "Connect with a short note and avoid pitching straight away",
              "Copy the same message to every person in their company",
            ],
            answer_index: 2,
            explanation: "The lesson says to add a short note, not to pitch in the first message, and to avoid automation tools.",
          },
          {
            prompt: "How should a follow up email differ from simply resending the first one?",
            options: [
              "It should be much longer and include the full price list",
              "It should add something new, such as a short example",
              "It should be copied to the person's manager to add pressure",
              "It should use a louder subject line written in capitals",
            ],
            answer_index: 1,
            explanation: "The lesson says each follow up should add something, such as an example or an answer to a likely question.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "sales-conversations": {
      explanation_md: `You have found a lead, qualified them and got their attention. Now comes the conversation that decides whether they buy. Many people imagine a great salesperson as someone who talks smoothly and never stops. In practice, the best sellers talk less and listen more. They find out what the customer really needs, show how their product fits, deal honestly with doubts, and ask clearly for a decision.

## The shape of a sales conversation

Whether it is a phone call, a WhatsApp chat or a meeting in an office in Wa, most sales conversations move through four parts:

1. **Discovery.** Asking questions to understand the customer's situation, problems and goals. You listen far more than you talk.
2. **Presenting.** Showing how your product solves the problems you heard, often with a quote or short proposal.
3. **Handling objections.** Responding to concerns such as price, timing or trust, honestly and calmly.
4. **Closing.** Agreeing the decision and the details: what, how many, price, delivery and payment.

Sometimes all four happen in ten minutes. In B2B sales they may stretch across several meetings over weeks.

## Why listening wins

When people feel understood, they trust you. When they trust you, they believe your recommendation. A seller who jumps straight into a product speech often recommends the wrong option, misses the real concern, and sounds like every other seller.

Listening also protects you from overpromising. If you understand exactly what the customer needs, you can say honestly whether your product does it.

## What this section covers

* **Discovery questions and listening.** Open questions, follow up questions and summarising back.
* **Presenting offers, quotes and proposals.** Linking your offer to their needs and writing clear quotes.
* **Handling objections.** Simple scripts for price, timing, trust and "I need to ask someone".
* **Negotiating and closing.** Asking for the decision, trading fairly and agreeing payment.

## A small example

Yakubu sells water tanks. A customer comes in asking for "the biggest tank". A pushy seller would just sell it. Yakubu asks what the water is for, how many people live in the house and how often the tap flows. It turns out the household is small and the tap flows most days, so a medium tank is enough, and it fits the space beside the house. The customer buys the medium tank, pays less than expected and, a month later, sends her brother to Yakubu for a tank for his shop.

Honest conversations like this build the repeat customers and referrals that keep a sales career going. The lessons in this section give you the words and habits to have them confidently.`,
      practice_task_md: `**Goal:** Observe the four parts of a sales conversation.

**Steps:**
1. Next time you buy something, at a market, shop or by WhatsApp, pay attention to how the seller talks to you. Or watch a free video of a sales role play online.
2. In a note, write down anything the seller did in each part: discovery, presenting, handling objections and closing.
3. Note which part was strongest and which was missing or weak.
4. Write two sentences on what you would have done differently.

**Done looks like:** A short note covering the four parts, with your two sentences of improvement.`,
      quiz: {
        questions: [
          {
            prompt: "What are the four parts of a sales conversation in this lesson?",
            options: [
              "Greeting, joking, discounting and leaving",
              "Discovery, presenting, handling objections and closing",
              "Calling, emailing, messaging and visiting in that strict order",
              "Pricing, advertising, delivering and collecting money afterwards",
            ],
            answer_index: 1,
            explanation: "The lesson names discovery, presenting, handling objections and closing.",
          },
          {
            prompt: "Why does the lesson say listening helps protect you from overpromising?",
            options: [
              "You can say honestly whether the product does what they need",
              "Customers who are listened to never ask any difficult questions",
              "Listening means you never have to explain the product at all",
              "It gives you more time to think of a clever reply",
            ],
            answer_index: 0,
            explanation: "Understanding exactly what the customer needs lets you say honestly whether your product does it.",
          },
          {
            prompt: "Why did Yakubu's customer later send her brother to him?",
            options: [
              "Yakubu gave her the biggest tank free of charge",
              "Yakubu promised her brother a commission for every referral",
              "He asked questions and recommended a tank that fit",
              "Yakubu was the only tank seller in the whole region",
            ],
            answer_index: 2,
            explanation: "He listened, recommended the medium tank that suited her, and she trusted him enough to refer her brother.",
          },
          {
            prompt: "How does the lesson describe how the best sellers behave?",
            options: [
              "They talk smoothly and never stop so customers cannot object",
              "They avoid asking for a decision so customers never feel pressure",
              "They always offer the cheapest product first to win the sale",
              "They talk less, listen more and then recommend what fits",
            ],
            answer_index: 3,
            explanation: "The lesson says the best sellers talk less and listen more.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "discovery-questions": {
      explanation_md: `Discovery is the part of a sales conversation where you find out what the customer actually needs. Adverts for business development and sales executive roles often mention discovery calls, and interviewers sometimes test it by asking you to "sell me this pen". The strongest answer starts with questions, not a speech.

## Open and closed questions

* **Closed questions** get a short answer, often yes or no: "Do you use a generator?" They are good for checking facts.
* **Open questions** invite the customer to explain: "How do you keep the shop running during power cuts?" They uncover needs, feelings and details you would never guess.

Start mostly open, then use closed questions to confirm specifics.

## Useful discovery questions

Adapt these to your product:

* **Situation.** "How do you handle this today?" "Who else is involved?"
* **Problem.** "What is the hardest part of that?" "What happens when it goes wrong?"
* **Impact.** "How does that affect your sales or your time?" "What has it cost you?"
* **Goal.** "If this worked perfectly, what would be different?"
* **Decision.** "How do you usually decide on things like this?" "When would you want it working?"

Ask one question at a time. Then stop and wait. A short silence feels uncomfortable to you, but it gives the customer time to think and often brings the most useful answer.

## Active listening

Listening is not just staying quiet. Active listening means:

* **Paying attention.** No checking other chats while they talk.
* **Encouraging.** Short sounds or words that show you are following: "I see", "Okay".
* **Following up.** "You said the power cuts are worst in the evening. Tell me more about that."
* **Taking notes.** On paper, in your phone or in the CRM, so you do not forget details.

## Summarise before you suggest

Before you present anything, sum up what you heard and check it:

> "So if I have understood: the fridge stops during evening power cuts, you lose cold drinks sales, and you want something that runs at least four hours, within a budget you can pay monthly. Is that right?"

If they say yes, you have earned the right to recommend. If they correct you, you have avoided presenting the wrong thing. Customers often say a good summary makes them feel truly heard.

## A worked example

Alhassan sells solar systems. A chop bar owner in Tamale says she wants "solar". Instead of quoting the biggest kit, Alhassan asks how power cuts affect her, what she runs during them, and what she spends on fuel for her generator. He learns her main pain is keeping drinks cold in the evening. He summarises, she agrees, and he proposes a smaller system for the fridge and lights only, which she can afford. A seller who skipped discovery would have quoted a system she could never pay for.`,
      practice_task_md: `**Goal:** Run a short discovery conversation and summarise it.

**Steps:**
1. Choose a product and write eight discovery questions: at least six open ones covering situation, problem, impact, goal and decision.
2. Ask a friend or relative to play a customer with a real problem, such as a small shop, a farm or a school.
3. Hold a ten minute conversation by phone or in person, asking one question at a time and taking notes.
4. Finish with a spoken summary and ask if you understood correctly.
5. Write your summary down, with one thing you learned that you would not have guessed.

**Done looks like:** Your question list, your notes and a written summary the "customer" agreed was accurate.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is an open question?",
            options: [
              "Do you use a generator at the shop?",
              "Is your budget more than 500 cedis?",
              "How do you keep the shop running during power cuts?",
              "Are you the owner of this business?",
            ],
            answer_index: 2,
            explanation: "Open questions invite explanation, like asking how they keep the shop running during power cuts.",
          },
          {
            prompt: "What does the lesson say to do after asking a question?",
            options: [
              "Answer it yourself quickly to save the customer time",
              "Ask two more questions straight away so the call moves faster",
              "Check your other chats while the customer thinks about it",
              "Stop and wait, even if a short silence feels uncomfortable",
            ],
            answer_index: 3,
            explanation: "The lesson says to stop and wait, because silence gives the customer time to think.",
          },
          {
            prompt: "Why should you summarise before suggesting a product?",
            options: [
              "To check your understanding before you recommend anything",
              "To make the conversation longer so the customer feels important",
              "To repeat your product's features so the customer remembers them",
              "Because the law requires a summary before every sale in Ghana",
            ],
            answer_index: 0,
            explanation: "A summary checks your understanding, so you either earn the right to recommend or avoid presenting the wrong thing.",
          },
          {
            prompt: "What did Alhassan learn through discovery?",
            options: [
              "That the owner wanted the biggest kit he sold, whatever the price",
              "That her main pain was keeping drinks cold in the evening",
              "That she had already bought solar from another company last year",
              "That she wanted to close the chop bar and open a shop instead",
            ],
            answer_index: 1,
            explanation: "He learned her main pain was keeping drinks cold during evening power cuts.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "presenting-offers": {
      explanation_md: `After discovery, the customer wants to know what you recommend and what it costs. Sales adverts in Ghana often ask for people who can prepare quotes and proposals, and O*NET lists preparing presentations and proposals among the tasks of sales representatives. A clear, honest offer makes saying yes easy.

## Present around their needs

Do not recite every feature. Go back to what you heard in discovery and connect each part of your offer to it:

> "You told me the fridge goes off during evening cuts. This system runs a fridge and four bulbs for about five hours. You said monthly payments suit you better, so here is the instalment option."

Keep to the two or three points that matter most to this customer. If you offer options, give no more than three, and say which one you recommend and why. Too many choices make people delay.

## Show, do not just tell

Where you can, let people see the product working: a short demo on your phone, a video, photos of a real installation, or a sample to hold. For software, a five minute live demo beats a long description. Proof builds confidence more than adjectives.

## Writing a clear quote

A quote, sometimes called a quotation or price offer, is a written statement of what you will supply and for how much. A good quote includes:

* your company name, contact details and the date
* the customer's name and organisation
* each item or service, quantity and unit price in cedis
* any extra costs: delivery, installation, taxes or monthly fees
* the total
* payment terms: how and when to pay, for example deposit and balance, by bank transfer or mobile money to the official business account
* how long the price is valid
* delivery or start date

Avoid hidden costs. If installation is extra, say so in the quote, not after the customer has paid.

## A short proposal for bigger B2B deals

For a school, clinic or company, a one or two page proposal often helps the buyer explain your offer to colleagues. A simple structure:

1. **Their situation**, in their words from discovery.
2. **What you recommend**, and why it fits.
3. **What it costs**, with the quote attached.
4. **What happens next**, with dates.

You can write it in a free word processor such as Google Docs, export it as a PDF and share it by email or WhatsApp.

## End with a clear next step

Every presentation should end with a question about the next step: "Does this match what you need? Shall I book installation for next week?" Then stop talking and let the customer answer.

## A worked example

Ayishetu sells printers to schools. After discovery with a head teacher in Nalerigu, she sends a one page proposal: the school's problem of printing exams in town, a recommended printer, toner costs per term, the quote with delivery included, and a training session for two teachers. The head can show it to the board, and nothing in it surprises them later.`,
      practice_task_md: `**Goal:** Prepare a clear quote and a one page proposal.

**Steps:**
1. Use the discovery summary from the previous lesson, or invent a realistic customer such as a clinic, school or shop.
2. In a free document or spreadsheet, write a quote with every element from the lesson, using realistic prices in cedis.
3. Write a one page proposal using the four part structure.
4. Check: is every cost visible, and is the next step clear?
5. Export it as a PDF if your app allows.

**Done looks like:** A quote and a one page proposal that a mentor could understand without asking you anything.`,
      quiz: {
        questions: [
          {
            prompt: "How many options does the lesson suggest offering a customer at most?",
            options: [
              "One, because choice always confuses people",
              "As many as the company sells, so they can compare everything",
              "Three, with a clear recommendation of one",
              "Ten, sorted from cheapest to most expensive",
            ],
            answer_index: 2,
            explanation: "The lesson says to offer no more than three options and say which you recommend and why.",
          },
          {
            prompt: "Which of these belongs in a quote, according to the lesson?",
            options: [
              "Your personal opinion of the customer's competitors",
              "How long the quoted price stays valid for the customer",
              "A list of other customers' names and phone numbers",
              "The commission you will receive if the customer signs",
            ],
            answer_index: 1,
            explanation: "The lesson lists how long the price is valid as part of a good quote.",
          },
          {
            prompt: "What should you do if installation costs extra?",
            options: [
              "Show it clearly in the written quote, before they pay",
              "Tell the customer after they have paid the main price",
              "Leave it out so the total looks lower and more attractive",
              "Add it quietly to the delivery fee so nobody asks about it",
            ],
            answer_index: 0,
            explanation: "The lesson says to avoid hidden costs and state extras like installation in the quote.",
          },
          {
            prompt: "Why might a school head find a short proposal useful?",
            options: [
              "It replaces the need for any quote or price information",
              "It means the seller never has to speak to the head again",
              "It contains a guarantee that the product will never break",
              "It helps them explain the offer to colleagues such as the board",
            ],
            answer_index: 3,
            explanation: "The lesson says a proposal helps the buyer explain your offer to colleagues.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "handling-objections": {
      explanation_md: `"It is too expensive." "Let me think about it." "I need to ask my husband." "I have been cheated before." Every seller hears these every day. Employers in Ghana list objection handling as a key telesales and sales skill. An objection is not the end of a sale. It often means the customer is interested but has a concern you have not yet answered.

## A simple method: LAER

* **Listen.** Let them finish. Do not interrupt or rush to defend.
* **Acknowledge.** Show you understand: "That is a fair concern." This is not agreeing; it is respecting.
* **Explore.** Ask what lies behind it: "When you say expensive, is it the total, or paying it all at once?"
* **Respond.** Answer the real concern honestly, then check: "Does that help?"

The explore step is where most beginners fail. "Too expensive" can mean "I cannot afford it", "I do not see the value yet", "Another seller is cheaper" or "I am not the one who pays". Each needs a different answer.

## Scripts for common objections

Adapt these in your own words.

**Price.** "I understand, it is a real amount of money. Can I ask what you are comparing it with?" Then, depending on the answer: explain what is included, show the cost of the problem it solves, offer a smaller option, or explain instalments if your company offers them.

**"Let me think about it."** "Of course, it is an important decision. So I can help, what part are you still unsure about?" If they need time, agree a specific follow up: "Shall I call you on Thursday afternoon?"

**"I need to ask someone."** "That makes sense. What do you think they will want to know? I can send you a short summary to share, or speak to them with you."

**Trust.** "I understand, many people have had bad experiences. Here is our registered office, our warranty in writing, and you can pay on delivery." Offer real proof, never pressure.

**"We already have a supplier."** "Good, then you know what works. What would you improve about the current one, if anything?"

## What not to do

* Never argue or make the customer feel foolish.
* Never invent facts, discounts or deadlines to push a decision. "Only today" is dishonest unless it is true.
* Never pressure someone to borrow money they cannot repay.
* If the objection shows the product truly does not fit, say so. Losing one sale honestly is better than a complaint, a refund and a damaged reputation.

## A worked example

Salifu sells a mobile accounting app. A trader in Wa says, "It is too costly." Salifu acknowledges, then asks what she compares it to. She says her exercise book is free. Salifu asks how much time she spends each month adding up debts customers owe her. She admits hours, and some debts are forgotten. Salifu shows the debt reminder feature and offers the cheaper monthly plan. She decides to try it for a month.`,
      practice_task_md: `**Goal:** Build your own objection handling sheet.

**Steps:**
1. Choose a product you could sell.
2. In a document, list the five objections from the lesson plus one you have heard in real life.
3. For each, write your own LAER response: an acknowledgement, an explore question and an honest response, in under 60 words.
4. Practise three of them aloud with a friend playing the customer, by phone or in person.
5. Mark any response that felt pushy and rewrite it.

**Done looks like:** A one page objection sheet with six honest responses, which you can keep and improve as you sell.`,
      quiz: {
        questions: [
          {
            prompt: "What does the E in LAER stand for?",
            options: [
              "Explore, asking what lies behind the concern",
              "Escalate, passing the customer straight to a manager",
              "Exit, ending the call quickly to save time",
              "Exaggerate, making the product sound better than it is",
            ],
            answer_index: 0,
            explanation: "E stands for Explore: asking what lies behind the objection.",
          },
          {
            prompt: "Why is the explore step so important for a price objection?",
            options: [
              "It lets you avoid answering the price question entirely",
              "It gives you time to think of a fake deadline to add urgency",
              "Price objections always mean the customer has no money at all",
              "\"Too expensive\" can mean several different things to different people",
            ],
            answer_index: 3,
            explanation: "The lesson says too expensive can mean cannot afford, cannot see value, found cheaper or not the payer.",
          },
          {
            prompt: "A customer says \"Let me think about it.\" Which response fits the lesson?",
            options: [
              "Tell them the price goes up tomorrow even though it does not",
              "Ask which part they are unsure about, and agree a specific follow up",
              "Say nothing and wait silently until they agree to buy today",
              "Remove them from your list because they are clearly not interested",
            ],
            answer_index: 1,
            explanation: "The lesson suggests asking what they are unsure about and agreeing a specific follow up time.",
          },
          {
            prompt: "What does the lesson say about an objection that shows the product truly does not fit?",
            options: [
              "Offer a bigger discount until the customer agrees to buy anyway",
              "Keep talking until the customer forgets the problem",
              "Say so honestly, even if it means you lose the sale",
              "Promise the company will change the product next month",
            ],
            answer_index: 2,
            explanation: "The lesson says to say so honestly, since losing one sale is better than a complaint, refund and damaged reputation.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "negotiating-and-closing": {
      explanation_md: `Many sales are lost not because the customer said no, but because nobody asked them clearly to say yes. Closing means asking for the decision and agreeing the details. Negotiating means finding terms both sides accept. Adverts for sales executives and business development roles in Ghana list both, and they matter just as much on a WhatsApp chat as in an office.

## Signs a customer is ready

Watch and listen for buying signals:

* questions about delivery, installation or start dates
* asking about payment options or instalments
* talking as if they already own it: "Where would we put it?"
* asking a family member or colleague "What do you think?"

When you notice these, move towards the close.

## Simple, honest ways to close

* **Direct ask.** "Shall we go ahead?" or "Would you like to place the order today?"
* **Choice of details.** "Would you prefer delivery on Tuesday or Thursday?"
* **Summary close.** "So that is two tanks, delivered Thursday, paid half now and half on delivery. Shall I confirm it?"

Then stop talking and let them answer. Silence after the question is normal.

Avoid manipulative closes: false deadlines, fake "last one in stock" claims, or pressuring someone who has said they need time.

## Negotiating fairly

Customers in Ghana often expect some bargaining. Good negotiation is about trading, not just cutting price.

* **Know your limits before you start.** Ask your manager what discounts, payment terms or extras you are allowed to offer.
* **Trade, do not give.** If you give something, ask for something: "I can include free delivery if you pay the full amount today." or "I can reduce the unit price if you order ten instead of five."
* **Discuss value before price.** Remind them what they get before talking numbers.
* **Do not split the difference too quickly.** A small, considered move signals your price is fair.
* **Aim for both sides to be happy.** A customer who feels squeezed rarely returns.

## Agreeing payment

Make payment simple and safe:

* State exactly what is being paid, by when, and how: bank transfer, cheque for businesses, or mobile money.
* For mobile money, give only the official business wallet or merchant details from your employer, never your personal number unless your employer has told you to.
* Confirm the payment has arrived before releasing goods, and send a receipt.
* For B2B, a purchase order or signed agreement may be needed before delivery.

## After the yes

Confirm everything in writing: items, price, delivery date and payment. Thank the customer. Then deliver what you promised, check in after delivery, and ask if they know anyone else who might benefit. Closing is not the end of the relationship; it is the start.

## A worked example

Tahiru sells office chairs to a new NGO in Tamale. The manager asks about delivery dates, a buying signal. Tahiru summarises and asks for the order. The manager wants a lower price. Tahiru offers a small discount if they order twelve chairs instead of eight and pay by bank transfer within a week. They agree. Tahiru sends a written confirmation, delivers on time and calls a week later to check the chairs are fine.`,
      practice_task_md: `**Goal:** Practise closing and fair negotiation.

**Steps:**
1. Use the offer you prepared in the presenting lesson, or invent one.
2. Write three closing questions: a direct ask, a choice of details and a summary close.
3. Write three "trade, do not give" offers, such as a discount for a larger order.
4. Role play with a friend who bargains hard. Use one close and one trade.
5. Write a short confirmation message for WhatsApp or email listing items, price, delivery and payment method.

**Done looks like:** Three closes, three trades, notes from the role play and a confirmation message.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a buying signal?",
            options: [
              "The customer stops replying to messages for two weeks",
              "The customer asks when the product can be delivered",
              "The customer says they already have a supplier they like",
              "The customer asks you not to call again",
            ],
            answer_index: 1,
            explanation: "Questions about delivery or start dates are buying signals.",
          },
          {
            prompt: "What does \"trade, do not give\" mean in negotiation?",
            options: [
              "Never change any part of the offer, whatever the customer asks",
              "Give every discount the customer requests so they stay happy",
              "Swap the product for a different one when the customer complains",
              "If you give something, ask for something in return from them",
            ],
            answer_index: 3,
            explanation: "The lesson says if you give something, such as free delivery, ask for something, such as full payment today.",
          },
          {
            prompt: "Which mobile money practice does the lesson recommend?",
            options: [
              "Share only the official business wallet or merchant details",
              "Give your personal number because it is quicker for everyone",
              "Release the goods as soon as the customer says they have paid",
              "Ask the customer to send cash with the delivery rider instead",
            ],
            answer_index: 0,
            explanation: "The lesson says to give only official business details and confirm payment has arrived before releasing goods.",
          },
          {
            prompt: "Which of these is a manipulative close the lesson warns against?",
            options: [
              "Asking whether the customer prefers delivery on Tuesday or Thursday",
              "Summarising the order and asking if you should confirm it",
              "Claiming it is the last one in stock when it is not",
              "Asking directly whether they would like to go ahead",
            ],
            answer_index: 2,
            explanation: "The lesson warns against false deadlines and fake last one in stock claims.",
          },
          {
            prompt: "What should you do after the customer says yes?",
            options: [
              "Move on to the next lead and never contact this customer again",
              "Confirm in writing, deliver as promised and check in afterwards",
              "Ask for a higher price now that they have agreed to buy",
              "Add them to every broadcast list without asking them first",
            ],
            answer_index: 1,
            explanation: "The lesson says to confirm everything in writing, deliver what you promised and check in after delivery.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "pipeline-and-crm": {
      explanation_md: `Imagine you are talking to forty possible customers at once. Some want a call on Thursday, some are waiting for a quote, some said "after harvest", and one is ready to pay today. Without a system, you will forget someone, and that someone might have bought. A pipeline and a CRM are the system. Sales adverts regularly ask for CRM experience or pipeline management.

## What a pipeline is

A sales pipeline is a picture of every open deal, grouped by stage. Picture columns on a board:

* **New lead**
* **Contacted**
* **Qualified**
* **Offer sent**
* **Negotiation**
* **Won** or **Lost**

Each deal is a card that moves from left to right as it progresses. At a glance you can see how many deals are at each stage, which ones have been stuck too long, and roughly what might close this month.

## What a CRM is

CRM stands for customer relationship management. A CRM is software that stores:

* **contacts** and the organisations they belong to
* **deals**, each with a value, a stage and an expected close date
* **activities**: calls, messages, meetings and notes, with dates
* **tasks**: the next action for each deal, with a due date

Many CRMs have free plans that work in a phone browser or app as well as on a computer. HubSpot's free CRM and Zoho Bigin are two examples. You can also run a simple pipeline in a spreadsheet, which is a great way to learn the idea before using real CRM software.

## Why employers care

A CRM lets your manager see your work without asking. It lets a colleague pick up your deals if you are sick. It shows which activities lead to sales. And it protects customers, because notes mean nobody asks them the same questions twice. In sales, if it is not in the CRM, it did not happen.

## The golden rule: every deal has a next step

The single most useful habit is this: no open deal without a next action and a date. "Call back Thursday 10am." "Send revised quote by Friday." "Check with the owner after Eid." If a deal has no next step, it is quietly dying.

## What this section covers

* **Using a free CRM.** Setting one up and logging contacts, deals and activities.
* **Pipeline stages and follow up.** Defining stages and scheduling follow ups that win deals.
* **Sales reports in a spreadsheet.** Weekly reports with totals, a chart and overdue follow ups highlighted.

## A small example

Memunatu sells internet plans in Tamale. She used to keep leads in her head and WhatsApp chats. After moving them into a simple pipeline, she found eight leads with no next step, including two who had asked for quotes she never sent. She sent them that afternoon, and one signed by the weekend.`,
      practice_task_md: `**Goal:** Draw your first pipeline.

**Steps:**
1. On paper, or in a free spreadsheet or notes app, make six columns: New lead, Contacted, Qualified, Offer sent, Negotiation, Won or Lost.
2. Take ten leads from your lead list (or invent them) and place each one in a column.
3. For every lead not in Won or Lost, write a next action and a date.
4. Circle any lead that had no clear next step before you did this exercise.

**Done looks like:** A pipeline with ten leads, every open one with a next action and date. Take a photo or screenshot for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What does CRM stand for?",
            options: [
              "Customer relationship management",
              "Cash receipt monitor",
              "Central reporting machine for managers",
              "Call recording and messaging",
            ],
            answer_index: 0,
            explanation: "CRM stands for customer relationship management.",
          },
          {
            prompt: "What is the golden rule from this lesson?",
            options: [
              "Every customer must be called at least once a day until they buy",
              "Only managers should ever update the CRM records",
              "No open deal should be without a next action and a date",
              "Deals should be deleted once they reach the negotiation stage",
            ],
            answer_index: 2,
            explanation: "The lesson's golden rule is that every open deal has a next action and a date.",
          },
          {
            prompt: "Which reason for using a CRM does the lesson give?",
            options: [
              "It means customers no longer need to be contacted at all",
              "It replaces the need to ask customers any questions in discovery",
              "It guarantees that every deal in the pipeline will be won",
              "A colleague can pick up your deals if you are sick or away",
            ],
            answer_index: 3,
            explanation: "The lesson says a CRM lets a colleague pick up your deals if you are sick.",
          },
          {
            prompt: "What did Memunatu discover after building a pipeline?",
            options: [
              "That all of her leads had already bought from competitors",
              "Leads with no next step, including two quotes she never sent",
              "That a pipeline was not useful for selling internet plans",
              "That her manager had been updating her deals for her",
            ],
            answer_index: 1,
            explanation: "She found eight leads with no next step, including two quotes she never sent.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "using-a-crm": {
      explanation_md: `Employers often write "CRM experience" in sales adverts, and some name specific tools. You do not need paid software to gain that experience. Free CRM plans let you practise the same daily habits that sales teams use. This lesson walks through them using general steps that apply to most CRMs. HubSpot's free CRM and Zoho Bigin are named only as examples; the habits transfer to whichever CRM an employer uses.

## Getting started

1. Sign up for a free plan with an email address. Most work in a browser on any device, and many have a phone app.
2. Look for the main areas: **Contacts**, **Companies**, **Deals** (sometimes called opportunities or a pipeline) and **Tasks** or **Activities**.
3. Find the pipeline settings and rename the stages to match your sales process, for example New lead, Contacted, Qualified, Offer sent, Negotiation, Won, Lost.

Use invented practice data, not real customers' details, until you are working for an employer with permission to store them.

## Daily CRM habits

**Add contacts properly.** Full name, organisation, role, phone, email, location and source. Use the same format every time, such as phone numbers starting with 0 or with +233, not a mix.

**Create a deal for each sales opportunity.** Give it a clear name ("Savelugu Clinic, stock app"), a value in cedis, a stage and an expected close date. Link it to the contact and company.

**Log every activity.** After each call, message or meeting, add a short note: date, what was discussed, what the customer said, and what happens next. Many CRMs let you log a call in a few taps.

**Set a task for the next step.** "Call Mr Kassim to confirm demo, Thursday 10am." The CRM will remind you.

**Move deals between stages** as they progress, and mark them won or lost honestly. When a deal is lost, choose or write a reason, such as price, timing or chose competitor. Those reasons teach you and your manager what to improve.

## Good notes

A good CRM note is short, factual and useful to someone else:

> "28 Oct. Called Mr Kassim. Clinic uses paper stock cards; ran out of malaria test kits twice last month. Interested; wants demo for himself and pharmacist. Demo booked Thu 30 Oct 10am at clinic."

A poor note says "Called, interested." Your colleague learns nothing.

## Keeping data clean and safe

* Search before adding a contact, to avoid duplicates.
* Never store more personal information than you need for the sale.
* Do not write rude or personal opinions about customers; notes may be seen by others.
* Use a strong password and log out on shared devices.

## A worked example

Kassim's clinic, from the note above, becomes a deal in Hawa's practice CRM. After the demo she moves it to Offer sent, attaches the quote, and sets a task for Monday. On Monday the clinic asks for a small change. She logs it, updates the deal value, and on Wednesday marks it Won. Her manager can follow the whole story without asking her a single question.`,
      practice_task_md: `**Goal:** Set up a practice CRM and log real looking activity.

**Steps:**
1. Sign up for a free CRM plan of your choice, such as HubSpot or Zoho Bigin, using your browser or app. If you cannot, use a spreadsheet with tabs for Contacts, Deals and Activities.
2. Rename the pipeline stages to match the lesson.
3. Add five invented contacts and their companies, and create a deal for each.
4. Log at least two activities with good notes on three deals, and set a next step task on every open deal.
5. Move one deal to Won and one to Lost with a reason.

**Done looks like:** Screenshots of your pipeline and one deal record showing notes and a task, using invented data only.`,
      quiz: {
        questions: [
          {
            prompt: "What data should you use in a practice CRM, according to the lesson?",
            options: [
              "Real phone numbers from your contacts so it feels realistic",
              "Invented practice data, until an employer gives permission",
              "Customer lists bought from a seller online for practice",
              "Numbers copied from your church or school WhatsApp group",
            ],
            answer_index: 1,
            explanation: "The lesson says to use invented practice data until you work for an employer with permission to store real details.",
          },
          {
            prompt: "Which is the better CRM note?",
            options: [
              "\"Called, interested.\"",
              "\"Customer was annoying and talked too much, will try again\"",
              "\"Busy day, many calls, will follow up with everyone later on\"",
              "\"Uses paper stock cards; wants demo; booked Thursday 10am at clinic\"",
            ],
            answer_index: 3,
            explanation: "A good note is short, factual and tells a colleague what happened and what is next.",
          },
          {
            prompt: "Why should you record a reason when a deal is lost?",
            options: [
              "The reasons teach you and your manager what to improve",
              "The CRM deletes the customer if no reason is given",
              "Customers are sent the reason automatically by email",
              "It lets you blame the customer in front of the team",
            ],
            answer_index: 0,
            explanation: "The lesson says lost reasons such as price or timing teach you and your manager what to improve.",
          },
          {
            prompt: "What should you do before adding a new contact?",
            options: [
              "Ask your manager to approve each new contact one at a time",
              "Collect as much personal information about them as possible",
              "Search the CRM first, to avoid creating a duplicate",
              "Message them to ask if they mind being added to the CRM",
            ],
            answer_index: 2,
            explanation: "The lesson says to search before adding a contact to avoid duplicates.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "pipeline-and-follow-up": {
      explanation_md: `Most deals do not close on the first contact. A business may need several conversations before deciding, and a family may need to wait for money to come in. Follow up is where many sales are won, and where many are quietly lost because the seller stopped. Employers ask for pipeline management and follow up because these habits turn interest into revenue.

## Defining clear stages

Each stage in your pipeline should have a clear **exit rule**: what must be true for a deal to move on.

* **New lead:** you have a name and a way to contact them.
* **Contacted:** you have spoken or exchanged messages.
* **Qualified:** need, decision maker, rough budget and timing confirmed.
* **Offer sent:** a quote or proposal is with the customer.
* **Negotiation:** you are agreeing details such as price, quantity or payment.
* **Won:** agreement confirmed and payment or purchase order received.
* **Lost:** they decided no, or stopped responding after your agreed follow ups.

Clear rules stop deals sitting in the wrong stage and make your pipeline honest. A deal is not in Negotiation just because you hope it is.

## A follow up rhythm

Plan follow ups rather than reacting. A simple rhythm after sending an offer might be:

* **Day 1:** confirm they received it and ask if anything is unclear.
* **Day 3 or 4:** share something useful, such as an answer to a common question or a photo of a similar installation.
* **Day 7 to 10:** ask directly whether they are ready to decide, or when would be better.
* **After that:** if there is no response, close the deal as lost and set a reminder months later only if they agreed to it.

Change channel when it makes sense, for example a call after two unanswered WhatsApp messages. Always respect a clear no.

## Make each follow up worth reading

Weak: "Just checking in."
Better: "Good morning Mr Nashiru. You mentioned the board meets on Friday. Would a one page summary of the quote help you present it?"

The better version shows you remember their situation and offers help.

## Keep the pipeline healthy

Once a week, review every open deal:

* Does it have a next action and a date in the future?
* Has it been in the same stage for too long?
* Is the expected close date still realistic?
* Should it be closed as lost so your pipeline reflects reality?

Clearing dead deals feels painful, but a pipeline full of false hope misleads you and your manager.

## A worked example

Azara sells software to private schools. Before the term starts she has fifteen open deals. In her Monday review she finds four with no next step and three stuck in Offer sent for a month. She calls the three; one asks for a smaller package, one wants to wait until next term, and one says no. She updates each: one moves to Negotiation, one gets a follow up date next term, one is closed as lost with the reason. Her pipeline now shows her true position.`,
      practice_task_md: `**Goal:** Define stages and plan follow ups.

**Steps:**
1. In your practice CRM or spreadsheet, write an exit rule for each of your pipeline stages.
2. Choose three deals at the Offer sent stage (real practice deals or invented).
3. For each, plan a follow up rhythm of three contacts with dates, channels and what each message will say.
4. Write the actual text of one valuable follow up message.
5. Do a weekly review: check every open deal has a future next step, and close any that should be lost.

**Done looks like:** Exit rules for every stage, three follow up plans, one written message and a short note on what your review changed.`,
      quiz: {
        questions: [
          {
            prompt: "What is an exit rule for a pipeline stage?",
            options: [
              "A rule for when a salesperson may leave the office for the day",
              "What must be true for a deal to move to the next stage",
              "The date when the customer must pay or lose the offer",
              "The rule that customers can cancel within seven days",
            ],
            answer_index: 1,
            explanation: "An exit rule says what must be true for a deal to move on.",
          },
          {
            prompt: "Which follow up message is stronger?",
            options: [
              "\"Just checking in.\"",
              "\"Hello? Hello? Please reply to my earlier message today.\"",
              "\"Did you see my quote? I have sent it three times already.\"",
              "\"You mentioned the board meets Friday. Would a one page summary help?\"",
            ],
            answer_index: 3,
            explanation: "The stronger message shows you remember their situation and offers help.",
          },
          {
            prompt: "Why does the lesson suggest closing dead deals as lost?",
            options: [
              "False hope in a pipeline misleads you and your manager",
              "Closed deals earn extra points in most CRM software",
              "Customers prefer to be removed from every list immediately",
              "It allows you to contact the same customers again next day",
            ],
            answer_index: 0,
            explanation: "The lesson says clearing dead deals keeps the pipeline honest.",
          },
          {
            prompt: "What did Azara find in her Monday review?",
            options: [
              "Every deal had already closed as won during the holiday",
              "Her CRM had deleted all of her deals by mistake",
              "Four deals with no next step, three stuck",
              "That schools never buy software before the term starts",
            ],
            answer_index: 2,
            explanation: "She found four deals with no next step and three stuck in Offer sent for a month.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "sales-reports": {
      explanation_md: `At the end of each week, most sales managers ask the same questions: What did you sell? What is coming? Where are deals stuck? A clear weekly report answers them in a minute. Sales adverts often mention reporting and targets, and being able to build a tidy report in a spreadsheet makes you stand out.

## What a weekly sales report shows

Keep it short. A useful report covers:

* **Activity:** calls made, messages sent, meetings or demos held.
* **Results:** deals won this week, their value in cedis, and money collected.
* **Pipeline:** number and value of open deals at each stage.
* **Against target:** how the month so far compares with your target.
* **Overdue follow ups:** deals whose next action date has passed.
* **Notes:** one or two lines on what is working, what is not, and any help you need.

## Building it in a spreadsheet

Use Google Sheets (free in a browser or app) or Excel. Start with a deals table, one row per deal, with columns such as:

* Deal name, Customer, Stage, Value (cedis), Expected close date, Next action, Next action date, Owner

Then add a summary area.

**Totals.** Use formulas so numbers update automatically:

\`\`\`
=SUMIF(C2:C50,"Won",D2:D50)
=COUNTIF(C2:C50,"Offer sent")
\`\`\`

The first adds the value of all won deals; the second counts deals in Offer sent.

**Pivot table.** A pivot table can summarise value and count by stage without writing formulas. In Google Sheets, select your table, choose Insert, then Pivot table, and put Stage in rows and Value in values.

**A simple chart.** A bar chart of value by stage shows your pipeline at a glance. Keep it plain: one colour, clear labels, no 3D effects.

**Highlight overdue follow ups.** Use conditional formatting on the next action date column, with a rule such as "date is before today", and a light red fill. Overdue items now jump out.

## Write the notes honestly

Numbers tell what happened; notes explain why. Be honest. "Two deals slipped because the clinic's budget approval is delayed to November" is far more useful than pretending everything is fine. Managers trust sellers whose reports match reality.

## Keep it consistent

Use the same layout every week, update it on the same day, and keep stage names exactly the same as in your pipeline. Consistency lets you and your manager compare weeks and spot trends.

## A worked example

Mohammed works in field sales for an agro input company. Every Friday he updates his deals sheet from his notes, checks the summary, and copies the chart and three lines of notes into an email to his supervisor. His supervisor can see in a minute that pipeline value is growing but two big deals are waiting on farmers' cooperative meetings, and can plan around it.`,
      practice_task_md: `**Goal:** Build a one page weekly sales report.

**Steps:**
1. In Google Sheets or another free spreadsheet, create a deals table with at least twelve invented deals and the columns from the lesson.
2. Add a summary area with SUMIF and COUNTIF formulas for won value and count per stage.
3. Insert a pivot table or a bar chart of value by stage.
4. Add conditional formatting to highlight overdue next action dates.
5. Write three lines of honest notes about the week.

**Done looks like:** A shareable sheet with a deals table, summary, chart or pivot table, highlighted overdue items and notes, ready to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What does the formula =SUMIF(C2:C50,\"Won\",D2:D50) do in the lesson's example?",
            options: [
              "Counts how many deals are at the Offer sent stage",
              "Adds up the value of all the deals marked Won",
              "Finds the newest deal in the table and shows its date",
              "Deletes every lost deal from column C of the table",
            ],
            answer_index: 1,
            explanation: "SUMIF adds the values in column D where the stage in column C is Won.",
          },
          {
            prompt: "How does the lesson suggest highlighting overdue follow ups?",
            options: [
              "Type the word OVERDUE in capital letters next to every deal",
              "Delete the rows whose next action date has already passed",
              "Use conditional formatting with a rule like date is before today",
              "Move overdue deals to a separate file that nobody else sees",
            ],
            answer_index: 2,
            explanation: "The lesson suggests conditional formatting with a date is before today rule and a light red fill.",
          },
          {
            prompt: "Why does the lesson stress honest notes in a sales report?",
            options: [
              "Honest notes are required before the spreadsheet will save",
              "Managers will never read the numbers, only the notes",
              "Notes replace the need for any totals or charts in the report",
              "Managers trust sellers whose reports match reality",
            ],
            answer_index: 3,
            explanation: "The lesson says managers trust sellers whose reports match reality.",
          },
          {
            prompt: "Which chart style does the lesson recommend?",
            options: [
              "A plain bar chart with one colour and clear labels",
              "A 3D pie chart with many bright colours and effects",
              "A chart with no labels so the page looks cleaner",
              "A different style of chart every week to keep it interesting",
            ],
            answer_index: 0,
            explanation: "The lesson recommends a plain bar chart with one colour and clear labels, and no 3D effects.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "working-well-in-sales": {
      explanation_md: `Anyone can make one sale. A sales career is built over years, on trust, good habits and the ability to keep going on difficult days. This section is about the things that decide whether you last in sales and whether customers, employers and colleagues want to work with you again.

## Trust is your main asset

In a town like Tamale, Wa or Bolgatanga, word travels fast. A seller who exaggerates, hides costs or pressures people gets a reputation quickly, and so does the company behind them. A seller known for honest advice gets referrals, repeat customers and a good name with future employers. Over time, honesty is not just right; it is the strategy that works.

## Data and consent

Selling means handling people's names, numbers and sometimes details about their money and their businesses. Customers expect you to keep that safe and to contact them only in ways they agreed to. Ghana has a data protection law, and employers expect sales staff to follow it. You will learn the practical basics for sales outreach in the next lesson.

## Tools that help, used carefully

AI assistants can help draft messages, summarise notes or research a company. Used well, they save time. Used carelessly, they invent facts and can expose private customer information. An optional lesson in this section shows how to use them safely.

## Looking after yourself

Sales involves hearing "no" many times, working towards targets and sometimes dealing with rude people. That can be draining. Sellers who last have routines: they plan their day, take breaks, learn from rejection without taking it personally, and celebrate progress. These are skills you can practise like any other.

## What this section covers

* **Honest selling and customer data.** No misleading claims, no pressure into debt, consent for contact lists and opt outs, and the basics of Ghana's Data Protection Act.
* **Using AI assistants in sales.** Optional: drafting, research and summaries, with checks and privacy rules.
* **Resilience and planning your day.** Treating rejection as information and planning time in blocks so targets feel manageable.

## A small example

Two sellers in the same company sell solar systems. Baba tells customers the battery "lasts forever" and pushes every family towards the biggest kit on credit. His numbers look good for two months, then complaints and missed payments pile up, and customers warn their neighbours about him. Adisa explains what each kit can and cannot power, recommends what customers can afford, and writes clear notes in the CRM. Her numbers grow more slowly but steadily, most of her new leads are referrals, and her manager trusts her with the company's biggest clients.

The rest of this section helps you be the second kind of seller, and stay well while doing it.`,
      practice_task_md: `**Goal:** Write your own sales code of conduct.

**Steps:**
1. In a note or document, write five rules you will follow as a seller, in your own words. Include at least one about honesty, one about customer data and one about looking after yourself.
2. For each rule, write one situation where it might be tempting to break it.
3. Write what you would do instead in each situation.

**Done looks like:** Five rules, five tempting situations and five better choices, on one page. Keep it with your portfolio; interviewers often ask how you handle pressure and ethics.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson call trust a seller's main asset?",
            options: [
              "Honest sellers get referrals and repeat customers over time",
              "Trust means you never need to follow up with customers",
              "Customers who trust you will accept any price you name",
              "Employers only pay sellers that customers say they trust",
            ],
            answer_index: 0,
            explanation: "The lesson says honest sellers earn referrals, repeat customers and a good name.",
          },
          {
            prompt: "What happened to Baba's results after two months?",
            options: [
              "They kept rising because customers liked the biggest kits",
              "His manager gave him the company's biggest clients",
              "Complaints piled up and customers warned others",
              "He moved to a new town where nobody knew him",
            ],
            answer_index: 2,
            explanation: "Baba's exaggeration and pressure led to complaints, missed payments and a bad reputation.",
          },
          {
            prompt: "What risk of AI assistants does this lesson mention?",
            options: [
              "They are too slow to help with drafting messages",
              "They can only be used on a laptop, never on a phone",
              "They always refuse to research companies",
              "They can invent facts and expose private customer information",
            ],
            answer_index: 3,
            explanation: "The lesson says careless use can invent facts and expose private customer information.",
          },
          {
            prompt: "Which habit does the lesson link to sellers who last?",
            options: [
              "Working without breaks until the monthly target is met",
              "Learning from rejection without taking it personally",
              "Avoiding any customer who might say no",
              "Keeping their plans in their head instead of writing them down",
            ],
            answer_index: 1,
            explanation: "The lesson says sellers who last learn from rejection without taking it personally, plan, rest and celebrate progress.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "honest-selling-and-data": {
      explanation_md: `Every sales job in Ghana comes with two kinds of responsibility: telling customers the truth, and treating their personal information with care. Employers expect new sellers to understand both from day one, because mistakes damage customers and the company's name.

## Honest selling

* **No misleading claims.** Never say a product does something it does not, or will last longer than it will. If you are not sure, check.
* **Show the full cost.** Include delivery, installation, monthly fees, interest or penalties for late payment. A customer should never be surprised after paying.
* **No false urgency.** Do not invent deadlines, fake "last one" claims or fake discounts.
* **No pressure into debt.** If a product is sold on credit or instalments, make sure the customer understands the total they will pay and can realistically afford it. Never push someone to borrow from others to buy.
* **Respect a no.** When someone declines or asks you to stop contacting them, stop.
* **Put promises in writing.** Warranties, delivery dates and refund terms should match your company's written policy.

## Data protection for sales

Ghana's **Data Protection Act, 2012 (Act 843)** sets rules for how organisations collect and use personal data, and the **Data Protection Commission** oversees it. You do not need to be a lawyer, but as a seller you should follow these practical principles, together with your employer's policies:

* **Get written consent before direct marketing.** Section 40 of the Act says personal data must not be used for direct marketing without the person's prior written consent. The Act describes direct marketing as advertising or marketing material directed to particular individuals. Follow your employer's process for recording each person's consent.
* **Collect only what you need.** For a sale you may need a name, number and delivery area. You rarely need someone's ID number or family details.
* **Use data only for the purpose given.** A number shared for a delivery is not permission to add someone to a promotion list.
* **Make opting out easy and honour it.** The Act lets a person tell you in writing at any time to stop using their data for direct marketing. Make that easy, for example with a line such as "Reply STOP to opt out", and remove people promptly.
* **Keep it safe.** Use your employer's CRM, not personal notebooks or random spreadsheets. Do not forward customer lists to friends, and never sell or share them.
* **Be accurate.** Update records when customers correct their details.

## Contact lists to avoid

* lists bought from strangers, online sellers or former colleagues
* numbers copied from WhatsApp groups, church registers or school lists
* old customer lists you took from a previous employer

Using these breaks trust, may break the law, and can get a business number reported or banned.

## A worked example

Rashida starts a telesales job. A colleague offers her a list of numbers "from a friend at a bank". She declines and asks her supervisor, who confirms the company only calls people who asked for information or are existing customers who agreed to offers. Later, a customer asks Rashida to stop messaging him. She marks him "do not contact" in the CRM and removes him from the broadcast list that day.`,
      practice_task_md: `**Goal:** Check outreach messages and a contact list for honesty and consent.

**Steps:**
1. Write three marketing messages for a product you could sell. Make sure each shows the full price, makes no claim you cannot prove, and includes a way to opt out.
2. Write a short "consent line" a customer could agree to, for example on an enquiry form: what you will send them and how they can stop.
3. Look at your practice lead list. Mark each row as public business contact, gave consent or unclear. Remove or flag every unclear row.
4. Optional: visit the Data Protection Commission website and note one thing it says organisations must do.

**Done looks like:** Three honest messages, one consent line and a cleaned lead list with a note on what you removed and why.`,
      quiz: {
        questions: [
          {
            prompt: "What is the name of Ghana's main data protection law mentioned in the lesson?",
            options: [
              "The Electronic Transactions Act, 2008 (Act 772)",
              "The Data Protection Act, 2012 (Act 843)",
              "The Electronic Communications Act, 2008 (Act 775)",
              "The Cybersecurity Act, 2020 (Act 1038)",
            ],
            answer_index: 1,
            explanation: "The lesson names the Data Protection Act, 2012 (Act 843), overseen by the Data Protection Commission.",
          },
          {
            prompt: "A customer shared her number for a delivery. Can you add her to a promotion list?",
            options: [
              "Yes, any number you receive can be used for any marketing",
              "Yes, as long as you send promotions less than once a day",
              "Yes, if you remove her number again after one month",
              "No, only for the purpose she gave it",
            ],
            answer_index: 3,
            explanation: "The lesson says a number shared for delivery is not permission to add someone to a promotion list.",
          },
          {
            prompt: "Which contact list does the lesson say to avoid?",
            options: [
              "People who filled in an enquiry form and agreed to hear from you",
              "Existing customers who agreed to receive offers",
              "Numbers copied from WhatsApp groups or church registers",
              "Businesses whose contact details are published for enquiries",
            ],
            answer_index: 2,
            explanation: "The lesson lists numbers copied from WhatsApp groups, church registers or school lists as ones to avoid.",
          },
          {
            prompt: "What does honest selling require when a product is sold on instalments?",
            options: [
              "The customer knows the total cost and can afford it",
              "The seller hides interest so the monthly payment looks smaller",
              "The customer borrows from relatives to pay the deposit",
              "The seller only mentions late fees after the first payment",
            ],
            answer_index: 0,
            explanation: "The lesson says customers must understand the total they will pay and be able to afford it.",
          },
          {
            prompt: "What did Rashida do when a customer asked her to stop messaging?",
            options: [
              "Sent one final offer before stopping, to be sure he meant it",
              "Asked a colleague to message him instead from another number",
              "Kept him on the list but sent messages less often",
              "Marked him do not contact and removed him that day",
            ],
            answer_index: 3,
            explanation: "She marked him do not contact in the CRM and removed him from the broadcast list the same day.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "ai-for-sales": {
      explanation_md: `This lesson is optional. Sales training programmes and some employers now talk about AI assistants, such as ChatGPT, Gemini, Claude or Copilot (named only as examples), as tools for sellers. Used well, they save time on writing and research. Used badly, they produce wrong facts and put customer privacy at risk. If you have done the AI Tools for Work track, this lesson applies those skills to selling.

## Where AI can help

* **Drafting outreach.** Ask for a first draft of a short email or WhatsApp message, then rewrite it in your own voice.
* **Preparing for calls.** Ask for a list of discovery questions for, say, a pharmacy owner considering a stock app.
* **Practising objections.** Ask the assistant to play a customer who says "It is too expensive" and practise your responses.
* **Summarising your own notes.** Turn rough notes from a meeting into a short, clear CRM note, after removing personal details.
* **Researching an organisation.** Get a quick overview of a type of business or sector before a meeting, then check it.

## Rules you must follow

**Check every fact.** AI assistants sometimes state wrong things confidently, including invented prices, features, laws or company details. Never send a customer a claim you have not checked against your company's real information.

**Never paste private customer data.** Do not put customers' names, phone numbers, account details, mobile money records or private conversations into a public AI tool. Replace them with placeholders such as "Customer A" or "a clinic in Tamale". Follow your employer's policy; some companies ban certain tools entirely.

**Keep your own voice.** Customers can often tell when a message is generic. Shorten AI drafts, add details only you know from discovery, and make sure the tone suits Ghanaian customers: warm greetings and respect.

**Do not automate spam.** Using AI to produce hundreds of personalised looking messages to people who never agreed to contact is still spam, and may break data protection rules.

## A good prompt

A clear prompt gets a better draft. Include who the customer is, the goal, the tone, the length and what to avoid:

> "Draft a WhatsApp follow up of under 50 words to a school head teacher who received a quote for a printer three days ago. Friendly and respectful. Offer to answer questions and ask if a call on Thursday suits. No pressure, no discounts."

Then edit the result. Remove anything untrue, add the head teacher's real concern from your notes, and check the length.

## A worked example

Nashiru has a call tomorrow with a hotel manager in Damongo about a booking app. He asks an AI assistant for ten discovery questions for a small hotel and five likely objections. He deletes the questions that do not fit a small hotel and adds two of his own. He checks the app's real prices on his company's price list, because the assistant guessed wrong ones. He never types the manager's name or number into the tool.`,
      practice_task_md: `**Goal:** Use an AI assistant safely for sales preparation.

**Steps:**
1. Open any free AI assistant in your browser or app. If you cannot, write the prompts and imagine the output.
2. Write a prompt for a short follow up message, using the who, goal, tone, length and avoid pattern. Use no real names or numbers.
3. Edit the draft: shorten it, add one detail from an imagined discovery call, and remove anything you cannot verify.
4. Ask the assistant to play a customer with a price objection, and practise two responses.
5. Write two sentences on any mistake or invented fact you spotted.

**Done looks like:** Your prompt, the original draft, your edited version and your notes on errors, with no personal data anywhere.`,
      quiz: {
        questions: [
          {
            prompt: "What should you do before sending a customer a claim drafted by an AI assistant?",
            options: [
              "Send it quickly, because AI tools are always accurate",
              "Ask the customer to check whether it is correct",
              "Check it against your company's real information",
              "Add more exclamation marks so it sounds more confident",
            ],
            answer_index: 2,
            explanation: "The lesson says AI can invent facts, so check every claim against your company's real information.",
          },
          {
            prompt: "How should you handle customer details when using a public AI tool?",
            options: [
              "Replace them with placeholders such as Customer A or a clinic",
              "Paste full names and numbers so the draft is more personal",
              "Share mobile money records so the tool can suggest prices",
              "Upload the entire CRM so the tool learns your customers",
            ],
            answer_index: 0,
            explanation: "The lesson says never paste private customer data; use placeholders instead.",
          },
          {
            prompt: "Which of these is listed as a good use of AI in sales?",
            options: [
              "Sending hundreds of messages to people who never agreed to contact",
              "Practising responses to objections with the assistant playing a customer",
              "Inventing customer reviews to send to new leads as proof",
              "Guessing a competitor's prices and quoting them to customers as fact",
            ],
            answer_index: 1,
            explanation: "The lesson suggests asking the assistant to play a customer so you can practise objections.",
          },
          {
            prompt: "What did Nashiru find when he checked the assistant's output?",
            options: [
              "Every question and price was correct and needed no changes",
              "The assistant refused to write any discovery questions",
              "The manager's details had been saved by the tool",
              "The assistant had guessed the wrong prices for the app",
            ],
            answer_index: 3,
            explanation: "He checked the real price list because the assistant guessed wrong prices.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "resilience-and-planning": {
      explanation_md: `In sales you will hear "no" far more often than "yes". Some people will hang up, ignore your messages or speak rudely. Targets will feel heavy some weeks. Employers know this, which is why interviewers often ask, "How do you handle rejection?" The sellers who do well are not the ones who never feel discouraged. They are the ones with habits that help them recover and keep going.

## Rejection is information

Most noes are not about you. The customer may have no budget this month, already have a supplier, be busy, or simply not need the product. Treat each no as information:

* **What did I learn?** "Shops in this area already have a provider" is useful.
* **Was it the lead, the timing or my approach?** If many people reject the same opening line, change the line.
* **Is there a next step?** "Not now" can become a follow up in three months.

Keep a short note after difficult calls. Over a week, patterns appear, and you improve.

## Look after your energy

* **Take short breaks** between blocks of calls. Stand up, stretch, drink water.
* **Do not carry one bad call into the next.** Take a breath, say something kind to yourself, and dial the next number fresh.
* **Talk to someone.** A colleague, mentor or friend can help you laugh about a hard day and spot what to try next.
* **Rest properly.** Sleep and meals affect your voice, patience and mood. Long hours without rest usually lower results.

The World Health Organization describes stress as a natural human response to challenges, and notes that how we respond makes a big difference. If stress becomes overwhelming or lasts a long time, speak to someone you trust or a health professional.

## Plan your day in blocks

A sales day can disappear in messages and small tasks. Time blocking protects the activities that matter:

* **Morning:** prospecting and calls, when energy is high and businesses are open.
* **Late morning:** follow ups on quotes and messages.
* **After lunch:** meetings, demos or field visits.
* **Late afternoon:** CRM updates, quotes and planning tomorrow's list.

Adjust the times to your job and your customers. Market traders may be busiest early; offices may answer better mid morning.

## Break big targets into small goals

A monthly target can feel impossible. A daily goal such as "20 calls, 5 conversations, 1 meeting booked" feels doable, and you can see by lunchtime whether you are on track. Celebrate small wins, like a good conversation or a booked demo, not only signed deals.

## A worked example

Fuseini's first week in telesales was hard: forty calls a day and only two meetings. He started noting each no. He saw that many shops were too busy in the mornings, so he moved shop calls to mid afternoon and used mornings for offices. He took a five minute walk every hour. His meetings rose the next week, and he felt calmer.`,
      practice_task_md: `**Goal:** Plan a sales day and reflect on rejection.

**Steps:**
1. In a calendar app, spreadsheet or on paper, plan one full sales day in blocks: prospecting, calls, follow ups, meetings and admin, with breaks.
2. Set a daily activity goal based on the targets lesson.
3. Think of a time you were told no, in sales or elsewhere. Write what you learned, whether it was the timing, the person or your approach, and what you would do next time.
4. Write three things you will do to recover after a difficult call.

**Done looks like:** A one day plan with blocks and breaks, a daily goal, a short rejection reflection and your three recovery habits.`,
      quiz: {
        questions: [
          {
            prompt: "How does the lesson suggest you think about a no from a customer?",
            options: [
              "As proof that you are not suited to a sales career",
              "As information about the lead, the timing or your approach",
              "As a reason to call the customer again within the hour",
              "As something to forget immediately without any notes",
            ],
            answer_index: 1,
            explanation: "The lesson says to treat rejection as information about the lead, the timing or your approach.",
          },
          {
            prompt: "What did Fuseini change after noting his rejections?",
            options: [
              "He moved shop calls to mid afternoon and used mornings for offices",
              "He stopped calling shops completely and only sent emails",
              "He doubled his calls and stopped taking breaks",
              "He asked his manager for a smaller target",
            ],
            answer_index: 0,
            explanation: "He noticed shops were busy in the mornings and moved those calls to mid afternoon.",
          },
          {
            prompt: "Why does the lesson suggest breaking a monthly target into daily goals?",
            options: [
              "Daily goals mean you no longer have a monthly target",
              "Managers only check targets once a year",
              "It feels doable and shows early if you are on track",
              "It allows you to work fewer days in the month",
            ],
            answer_index: 2,
            explanation: "The lesson says a daily goal feels doable and you can check by lunchtime.",
          },
          {
            prompt: "What does the lesson say to do if stress becomes overwhelming or lasts a long time?",
            options: [
              "Work longer hours until the feeling passes",
              "Keep it to yourself so your manager does not find out",
              "Change jobs immediately without telling anyone",
              "Speak to someone you trust or a health professional",
            ],
            answer_index: 3,
            explanation: "The lesson advises speaking to someone you trust or a health professional.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-hired-sales": {
      explanation_md: `Sales is one of the most open doors into work in Ghana. Many employers hire school leavers, diploma holders and graduates from any subject into sales, telesales and business development roles, and train them on the product. What they need to see is evidence that you can talk to people, stay organised and keep going when it is hard. This section helps you show that evidence and find your first role.

## What employers look for

Across entry level sales adverts, the same qualities appear again and again:

* **Communication.** Clear speaking on the phone and clear writing on WhatsApp and email.
* **Confidence with people.** Comfort starting conversations with strangers, politely.
* **Organisation.** Keeping track of leads and follow ups, often in a CRM or spreadsheet.
* **Resilience.** Handling rejection and working towards targets.
* **Honesty.** Employers do not want sellers who will damage their reputation.
* **Basic digital skills.** Using a smartphone, WhatsApp Business, email and a spreadsheet confidently.
* **Languages.** English plus local languages are often a plus, especially for field and telesales roles.

## Proof beats claims

Every CV says "excellent communication skills". Few show it. You can stand out with simple proof made during this track:

* a recorded practice call
* a sample pipeline or CRM screenshot with invented data
* a short write up of a real small sale, such as helping a relative sell produce or phone accessories
* your objection handling sheet and a weekly report

## Common entry routes

Without naming any programme, typical routes include:

* **Free or sponsored sales training programmes** for young people, some of which connect graduates to employers.
* **Graduate trainee or national service placements** in sales teams.
* **Telesales and contact centre teams** for telecoms, fintechs, insurers and internet providers.
* **Field sales roles** for consumer goods, agro inputs, solar and phone companies, often across the northern regions.
* **Remote sales roles** for software companies that hire across Africa.

## Stay safe

Some "sales jobs" are traps. Be careful with any offer that asks you to pay a registration fee, buy stock before you start, or recruit friends to earn money. A genuine employer does not charge you to work.

## What this section covers

* **Showing your sales skills.** Building a small portfolio and using it in your CV and interviews.
* **Finding sales roles.** Where to look, how to read adverts and offers, and warning signs to walk away from.

## A small example

Amina had no work experience when she applied for a telesales role with an internet provider. She attached a one page portfolio: a link to a two minute recorded practice call, a screenshot of her practice pipeline, and a paragraph about helping her mother sell shea butter by WhatsApp. In the interview she was asked to handle a price objection and used the method she had practised. She was invited to a second interview the next day.`,
      practice_task_md: `**Goal:** List the evidence you already have and what you still need.

**Steps:**
1. In a note, list each quality employers look for from the lesson.
2. Next to each, write one piece of evidence you already have from this track or your life, such as a task, a story or a screenshot.
3. Mark any quality with no evidence yet, and write one task you will do this week to create it.
4. Write a two sentence summary of why you would be good in sales, using your evidence, not adjectives.

**Done looks like:** A table of qualities and evidence, gaps with a plan, and your two sentence summary.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what helps you stand out more than writing \"excellent communication skills\" on a CV?",
            options: [
              "Listing as many adjectives about yourself as possible",
              "Making the CV several pages long so it looks serious",
              "Proof, such as a recorded practice call",
              "Using a colourful CV design with your photo at the top",
            ],
            answer_index: 2,
            explanation: "The lesson says proof beats claims, such as a recorded call or a sample pipeline.",
          },
          {
            prompt: "Which offer is a warning sign according to the lesson?",
            options: [
              "A role that trains you on the product in your first weeks",
              "A field sales role that covers towns in the northern regions",
              "A telesales team that asks you to role play in the interview",
              "A request to pay a registration fee first",
            ],
            answer_index: 3,
            explanation: "The lesson says a genuine employer does not charge you to work.",
          },
          {
            prompt: "Which of these is listed as a common entry route into sales?",
            options: [
              "Telesales teams for telecoms and insurers",
              "Only senior management roles that need many years of experience",
              "Paying a company to give you a list of customers to sell to",
              "Roles that require a degree in sales from a foreign university",
            ],
            answer_index: 0,
            explanation: "The lesson lists telesales and contact centre teams among typical routes.",
          },
          {
            prompt: "What did Amina include in her one page portfolio?",
            options: [
              "Certificates from many paid courses she had bought online",
              "A practice call, a pipeline and a real selling story",
              "A list of her friends' phone numbers to call as leads",
              "Letters from relatives saying she was good at talking",
            ],
            answer_index: 1,
            explanation: "Her portfolio had a recorded call, a practice pipeline screenshot and the story of selling shea butter by WhatsApp.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "showing-sales-skills": {
      explanation_md: `When a sales manager reads fifty CVs for one telesales post, most say the same things. A short, real portfolio of sales work makes you memorable and gives the interviewer something specific to ask about. You have already built most of it in this track.

## A one page sales portfolio

Gather your best pieces into one shareable document or folder, such as a Google Doc or Google Drive folder with view access. Include:

* **A recorded practice call.** Two to three minutes, using your call script with a friend playing the customer. Upload it to a free cloud drive and share a link. Get your partner's permission to record.
* **A sample pipeline.** A screenshot of your practice CRM or spreadsheet with invented data, showing stages, next steps and a short weekly report.
* **An objection handling sheet.** Your honest LAER responses to common objections.
* **Outreach samples.** One email and one WhatsApp message with a follow up.
* **A real selling story.** A short write up of something you actually sold.

## Writing your real selling story

Many young people have sold something: phone credit, farm produce, shea butter, clothes, snacks at school, tickets for a church event. Write it up in four parts:

1. **Situation.** "My aunt makes groundnut oil in Walewale but sold only at the weekly market."
2. **What you did.** "I listed her regular buyers, asked for referrals and took orders by WhatsApp, with payment by mobile money on delivery."
3. **Result.** Describe it honestly, without inflating it. "She gained several new regular customers in town over two months." Use numbers only if you really recorded them.
4. **What you learned.** "Following up the day before market day brought more orders than posting on my status."

Honest, modest results are fine. Interviewers value truth and reflection over big claims, and they may ask detailed questions.

## Putting it into your CV

* In your summary, mention your sales practice and link to your portfolio.
* Under experience, include informal selling, with the four part story shortened to two lines.
* Under skills, list concrete tools: WhatsApp Business, a free CRM you practised with, Google Sheets, email.

## In the interview

Sales interviews often include a role play: "Sell me this pen" or "Handle this objection". Use what you practised:

* Ask discovery questions before pitching: "What do you usually use a pen for?"
* Link a benefit to their answer.
* Handle the objection with listen, acknowledge, explore, respond.
* Ask for a next step.

Also prepare short stories for common questions: a time you handled rejection, a time you organised many tasks, a time you were honest when it was hard.

## A worked example

Issahaku interviews for a field sales role with an agro input company. When asked about experience, he shares his story of helping his uncle sell maize seed to neighbouring farmers, and shows his practice pipeline on his phone. In the role play he asks the "farmer" about last season before mentioning any product. The interviewer later tells him the questions made the difference.`,
      practice_task_md: `**Goal:** Assemble your sales portfolio.

**Steps:**
1. Create a free document or cloud folder titled "Sales portfolio: your name".
2. Add or link the five items from the lesson. Record the practice call if you have not yet, with your partner's permission.
3. Write your real selling story in the four part structure, under 150 words, with honest results.
4. Update your CV with a portfolio link, your selling story in two lines and a list of tools.
5. Practise "Sell me this pen" aloud three times, starting with questions.

**Done looks like:** A shareable portfolio with five items, an updated CV, and a note on how your pen role play went.`,
      quiz: {
        questions: [
          {
            prompt: "What are the four parts of a real selling story in this lesson?",
            options: [
              "Greeting, product features, price and a polite goodbye",
              "Situation, what you did, result and what you learned",
              "Problem, blame, excuse and apology",
              "Company, salary, commission and target",
            ],
            answer_index: 1,
            explanation: "The lesson uses situation, what you did, result and what you learned.",
          },
          {
            prompt: "How should you describe the result in your selling story?",
            options: [
              "Make the numbers bigger so you look more impressive",
              "Leave out the result so the interviewer has to guess",
              "Copy a result from someone else's story online",
              "Honestly, with numbers only if you recorded them",
            ],
            answer_index: 3,
            explanation: "The lesson says to describe results honestly and use numbers only if you recorded them.",
          },
          {
            prompt: "In a \"Sell me this pen\" role play, what should you do first?",
            options: [
              "Ask what they use a pen for",
              "List every feature of the pen as quickly as you can",
              "Offer a discount before the interviewer says anything",
              "Explain the history of the pen company in detail",
            ],
            answer_index: 0,
            explanation: "The lesson says to ask discovery questions before pitching.",
          },
          {
            prompt: "What must you get before recording a practice call?",
            options: [
              "A certificate from a paid sales course",
              "Approval from a future employer",
              "Your practice partner's permission",
              "A professional microphone and a laptop",
            ],
            answer_index: 2,
            explanation: "The lesson says to get your partner's permission to record.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "finding-sales-roles": {
      explanation_md: `Sales roles are advertised constantly in Ghana, so the challenge is less finding adverts and more choosing well: roles that train you, pay fairly and treat customers honestly. This lesson helps you search, read adverts and offers carefully, and avoid traps.

## Where to look

* **Job boards.** Ghanaian job sites list many sales, telesales and business development roles. Search by title and town, and set alerts.
* **Company career pages.** Telecoms, banks, fintechs, insurers, internet providers, consumer goods, agro input and solar companies often post roles on their own sites.
* **Free training programmes.** Some organisations offer free or sponsored sales and employability training for young people, sometimes with placement support. Check that any programme is genuine and free before signing up.
* **Your network.** Tell friends, family, former teachers and church or mosque members that you are looking for sales work. Many field sales roles are filled by referral.
* **Local businesses.** Walk into shops, distributors and agro dealers in your town with your one page portfolio. Small businesses often hire people who show initiative.
* **Remote roles.** Some software companies hire sales development representatives across Africa to work online. These need a reliable connection, a quiet space and strong written English.

## Reading a sales advert

Look past the title and check:

* **What you will actually do.** Calls, field visits, inbound chats or meetings?
* **What you will sell, and to whom.** B2B or B2C, and is it a product you could honestly recommend?
* **Requirements.** Many entry roles accept SHS, diploma or any degree. Do not rule yourself out because you lack one "nice to have".
* **Location and travel.** Field roles may cover several districts.
* **Pay structure.** Is there a basic salary, commission, or both? Are transport and data covered?

## Warning signs

Walk away, or ask hard questions, if a role:

* asks you to pay a fee for registration, training, uniform or "starter kit"
* offers no basic pay and vague commission, with pressure to sign today
* expects you to buy stock with your own money and resell it
* earns mainly from recruiting other people rather than selling products
* asks for your mobile money PIN, bank details or ID before any formal offer

A genuine employer explains the role, pays you and never charges you to start.

## Before you accept

Ask for the offer in writing. Check the basic pay, how commission works, targets, working hours, probation and who pays for transport and airtime. If something is unclear, ask politely by email or message so you have a record.

## A worked example

Wumpini sees two adverts. One promises "unlimited income" and asks for a starter kit fee. The other, from a solar company, offers a basic salary, field training around Tamale and a written commission plan. She ignores the first, applies to the second with her portfolio, and before accepting asks in writing how targets are set and when commission is paid.`,
      practice_task_md: `**Goal:** Assess real sales adverts and prepare to apply.

**Steps:**
1. Find five current entry level sales adverts on job boards or company pages, using your phone or computer.
2. For each, note in a table: role type, what you would sell and to whom, requirements, location, and pay structure as described. Use your own words.
3. Check each against the warning signs and mark it safe, unclear or avoid.
4. Choose the best fit and write a three sentence cover message that links to your portfolio.
5. Write three questions you would ask before accepting an offer.

**Done looks like:** A table of five adverts with a safety rating, one cover message and three questions for an offer.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a warning sign in a sales job offer?",
            options: [
              "The employer explains the role and gives a written offer",
              "The role includes product training in the first weeks",
              "You must pay for a starter kit before you can begin",
              "The advert lists both basic salary and commission",
            ],
            answer_index: 2,
            explanation: "The lesson says to walk away from roles that charge fees for a starter kit, training or registration.",
          },
          {
            prompt: "What does the lesson say about requirements listed as nice to have?",
            options: [
              "Only apply if you meet every single requirement in full",
              "Do not rule yourself out just because you lack one of them",
              "Nice to have requirements are always the most important",
              "Ignore all requirements because employers never check them",
            ],
            answer_index: 1,
            explanation: "The lesson says not to rule yourself out because you lack one nice to have.",
          },
          {
            prompt: "Why should you ask questions about an offer in writing?",
            options: [
              "So that you have a record of the answers",
              "Because employers never answer questions by phone",
              "So the employer cannot change the job title",
              "Because the law forbids discussing offers in person",
            ],
            answer_index: 0,
            explanation: "The lesson says to ask politely by email or message so you have a record.",
          },
          {
            prompt: "What do remote sales roles need, according to the lesson?",
            options: [
              "A car and a valid driving licence for travel",
              "Your own stock of products to sell to customers",
              "A registration fee paid to the software company",
              "A reliable connection, a quiet space and strong written English",
            ],
            answer_index: 3,
            explanation: "The lesson says remote roles need a reliable connection, a quiet space and strong written English.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
