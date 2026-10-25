import type { GeneratedQuestion } from "@/lib/content-generation/schema";
import type { TrackContent } from "./types";

/**
 * Original lesson content for the Product Manager roadmap (issue #84).
 * Research and sources: src/content/research/product.md.
 * Three example products recur across lessons so ideas connect: a MoMo
 * savings feature, a farmers' market app in Tamale, and an NGO's beneficiary
 * tracking tool. pass_threshold is a percentage (see content-generation
 * config): 75 for four questions, 80 for five.
 */
const q = (prompt: string, options: string[], answer_index: number, explanation: string): GeneratedQuestion => ({
  prompt,
  options,
  answer_index,
  explanation,
});

const content: TrackContent = {
  roadmap: "product-manager",
  nodes: {
    foundations: {
      explanation_md: `Every app, USSD menu or WhatsApp service you use was shaped by someone who asked: who is this for, what problem does it solve, and is it worth building? In a company that person often works in a product role. In Ghana you will find product teams in banks, telecoms, fintechs, agritech startups, logistics companies and NGOs that build digital tools for their field work.

This first section gives you the ground to stand on before you learn the methods.

## What product work is

Product work sits where three things meet:

* **Users.** The traders, farmers, students or health workers who will use the thing. What do they need, and what gets in their way?
* **The business.** How the product earns money or, for an NGO, how it serves the mission within a budget.
* **The builders.** Engineers and designers who turn an idea into something that works.

A product person does not usually write the code or draw the screens. Their job is to make sure the team builds the right thing, for the right people, in a sensible order, and then to check that it actually helped.

## What this section covers

* **Product roles.** Product manager is only one title. Business analysts, product analysts, product operations staff and associate product managers all do product work, and these are often more realistic first jobs.
* **How products work in Ghana.** Mobile money, USSD, WhatsApp and agent networks shape what people expect and trust here.
* **Business basics and pricing.** Revenue, costs, margins and what customers will pay in cedis.
* **Communicating with stakeholders.** Listening, writing short updates and presenting a recommendation. Job adverts ask for this more than any tool.

## A small example

Wumpini works for a company in Tamale that wants to add a savings feature to its mobile money app. Before anyone builds, she asks market women how they save today. Many use a susu collector who visits daily. Wumpini learns that trust and daily habit matter more than interest rates. That insight, not a clever screen, decides what the team builds first.

Notice what she used: curiosity, a few conversations, and clear notes she could share with her manager. You can practise all of those today with a phone and no special software.

## How to use this roadmap

Each lesson has an explanation, a short practice task and a quiz. The tasks build on each other, so keep one notebook or Google Doc as your product journal. By the end it becomes the raw material for your portfolio.`,
      practice_task_md: `**Goal:** start your product journal and look at one product with fresh eyes.

1. Create a Google Doc or a notebook page called "Product journal".
2. Pick one product you used this week: a MoMo menu, a ride app, a school WhatsApp group, or a bank USSD code.
3. Write three short answers: Who is it for? What problem does it solve for them? How does the company or organisation benefit?
4. Write one thing that annoys you about it and one guess about why it was built that way.

**Done looks like:** one page with the product name and your four answers, in plain sentences. Keep it; later lessons add to this journal.`,
      quiz: {
        questions: [
          q(
            "Which three things does product work sit between?",
            ["Users, the business and the builders", "Sales, marketing and finance", "Phones, laptops and servers", "Managers, interns and customers"],
            0,
            "The lesson describes product work as connecting users, the business and the engineers and designers who build.",
          ),
          q(
            "What does a product person usually focus on?",
            [
              "Writing most of the code themselves",
              "Making sure the team builds the right thing in a sensible order",
              "Designing every screen alone",
              "Handling the company accounts",
            ],
            1,
            "Product people make sure the right thing is built for the right people, then check it helped.",
          ),
          q(
            "In the example, what did Wumpini learn mattered most to market women saving money?",
            ["High interest rates", "A modern app design", "Trust and daily habit", "Fast internet"],
            2,
            "Her conversations showed that trust and the daily susu habit mattered more than interest rates.",
          ),
          q(
            "According to the lesson, which skill do job adverts for product roles ask for more than any tool?",
            ["Advanced coding", "Graphic design", "Clear communication with stakeholders", "Social media marketing"],
            2,
            "The section notes that adverts ask for communication more than any single tool.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "what-product-roles-do": {
      explanation_md: `If you search Ghanaian job boards for "product manager", most adverts ask for several years of experience. That can feel discouraging until you notice the other titles that do product work and accept people earlier in their careers. Knowing these roles tells you where to aim first.

## The main roles

* **Product manager (PM).** Owns a product or feature. Decides what problem to solve next, sets priorities, writes or approves requirements, and checks results after release. Usually a mid or senior role.
* **Associate product manager (APM).** A junior PM who supports a senior one: writing user stories, preparing for releases, gathering research and keeping documentation up to date.
* **Business analyst (BA).** Studies how a business process works today, gathers requirements from staff and customers, writes functional specifications and user stories, and often tests the system before it goes live. Banks, telecoms and manufacturers in Accra and Kumasi hire many BAs.
* **Product analyst.** Uses data to answer product questions: how many users finish sign up, which feature is used, where people drop off. Spreadsheets matter, and some adverts also ask for SQL and dashboard tools.
* **Product operations.** Keeps a live product running smoothly: onboarding and training clients, writing help guides and procedures, handling escalated problems and passing clear issue reports to engineers.

In NGOs you will also meet **monitoring and evaluation (M&E) officers** who manage data tools such as beneficiary trackers. Their work overlaps heavily with product analysis.

## What they share

Every one of these roles needs you to understand users, write clearly, work with engineers and read basic data. The difference is emphasis. A BA leans on process and requirements, an analyst on data, operations on users after launch, and a PM on decisions.

## The same product, four jobs

Imagine a farmers' market app that connects shea and vegetable farmers around Tamale with buyers in Accra.

* Fuseini, the **business analyst**, maps how orders currently move by phone calls and writes requirements for the new order screen.
* Mariama, the **product analyst**, finds that many farmers register but never list produce, and shares a chart showing the drop.
* Issahaku in **product operations** trains farmer group leaders to use the app and writes a simple guide in plain English with pictures.
* Hawa, the **product manager**, uses all of this to decide that fixing listing comes before adding a delivery feature.

Each person did real product work. Fuseini, Mariama and Issahaku are building exactly the evidence Hawa needed to become a PM.

## Reading adverts like a detective

Titles vary a lot between companies. "Product Executive", "Product Officer" or "Product Associate" can mean anything from junior PM to marketing. Ignore the title and read the duties. If you see words like requirements, user stories, testing, documentation, onboarding or data analysis, the role builds product skills.`,
      practice_task_md: `**Goal:** see what product roles in Ghana really ask for.

1. On Jobberman Ghana or a company careers page, find three adverts: one business analyst, one product operations or support role, and one product manager or product analyst role.
2. For each, list five duties in your own words in your product journal. Do not copy the advert text.
3. Underline duties that appear in more than one advert.
4. Write two sentences: which role could you apply for soonest, and which skill is the biggest gap for you?

**Done looks like:** a short table of three roles and their duties, with the shared ones marked, and your two sentence reflection.`,
      quiz: {
        questions: [
          q(
            "Which role mainly studies how a process works today, gathers requirements and often tests systems before go live?",
            ["Product analyst", "Business analyst", "Graphic designer", "Sales executive"],
            1,
            "The lesson describes business analysts as focused on processes, requirements, specifications and testing.",
          ),
          q(
            "What does product operations mainly do?",
            [
              "Sets the company's long term strategy",
              "Writes all the backend code",
              "Keeps a live product running smoothly, including onboarding, guides and escalations",
              "Designs the company logo",
            ],
            2,
            "Product operations covers onboarding, training, help guides, procedures and escalating issues to engineers.",
          ),
          q(
            "In the farmers' market example, what did Mariama the product analyst discover?",
            [
              "Buyers wanted a delivery feature",
              "Many farmers registered but never listed produce",
              "Orders moved by phone calls",
              "Farmer leaders needed training",
            ],
            1,
            "Mariama used data to show the drop between registering and listing produce.",
          ),
          q(
            "When a job title like Product Executive is unclear, what does the lesson advise?",
            [
              "Skip the advert",
              "Apply only if the salary is listed",
              "Ignore the title and read the duties",
              "Assume it is a senior role",
            ],
            2,
            "Titles vary between companies, so the duties tell you whether the role builds product skills.",
          ),
          q(
            "Which skill do all the product roles in the lesson share?",
            ["Writing clearly and understanding users", "Advanced machine learning", "Video editing", "Accounting certification"],
            0,
            "Every role needs understanding of users, clear writing, working with engineers and reading basic data.",
          ),
        ],
        pass_threshold: 80,
      },
    },
    "ghana-product-context": {
      explanation_md: `A product that works well in London or Lagos can fail in Bolgatanga. The reason is rarely the technology. It is the habits, trust and constraints of the people using it. Employers want product people who understand the local market, so this context is a real job skill.

## Mobile money is the default wallet

For many Ghanaians, mobile money is the main way to send, receive and store money. People are used to approving payments with a PIN prompt, checking a confirmation SMS, and cashing out with an agent. A product that only accepts cards shuts out a large group of customers. A product that takes MoMo but sends no clear confirmation makes people nervous.

## USSD and feature phones

Not everyone has a smartphone or data. USSD menus (the short codes starting with a star) work on any phone without internet. They are limited: short text, a few options per screen, and a session that times out. Many serious services offer both an app and a USSD route so nobody is left out.

## WhatsApp is where people already are

Churches, schools, traders and farmer groups organise on WhatsApp. Asking people to download yet another app is a big request when data costs money and phone storage is full. Some of the best first versions of products in Ghana are simply a WhatsApp number backed by a spreadsheet.

## Agents and trusted people

Mobile money agents, susu collectors, extension officers and community leaders help others use services. People often trust a known person more than an app. Products that work with these people, rather than around them, tend to spread faster.

## Constraints to design for

* Prepaid data bundles, so heavy pages and videos cost users real money.
* Shared phones, so privacy and easy logout matter.
* Many languages, including Dagbani, Twi, Ewe, Ga and Hausa, and different reading levels.
* Unreliable power and network in some areas, so offline use and retries matter.

## Example: a MoMo savings feature

Abdul-Rahman is designing a savings feature for a mobile money app. His first idea is a goals screen with charts. After talking to traders in Tamale market, he notices three things: many save small amounts daily, they trust a susu collector they know, and some use basic phones. So the team plans a USSD option, daily automatic saving of small fixed amounts, and an SMS confirming every deposit. The charts can wait.

The lesson: start from how people live today, then design the smallest change that fits.`,
      practice_task_md: `**Goal:** explain why three local services earn or lose trust.

1. Pick three services you or your family use, such as a MoMo wallet, a bank USSD code, a ride app or a WhatsApp ordering line.
2. For each, write in your journal: how you pay, whether it works without data, what confirmation you get, and who helps people who get stuck.
3. Rate how much you trust each one from 1 to 5 and explain why in one sentence.
4. Suggest one change that would make the weakest one more trusted.

**Done looks like:** three short profiles with ratings and one clear improvement idea.`,
      quiz: {
        questions: [
          q(
            "Why do many Ghanaian services offer a USSD option as well as an app?",
            [
              "USSD looks more modern",
              "USSD works on any phone without internet",
              "USSD has unlimited screen space",
              "USSD is required for card payments",
            ],
            1,
            "USSD works on basic phones without data, so nobody is left out.",
          ),
          q(
            "What makes customers nervous when paying with mobile money, according to the lesson?",
            [
              "Receiving a confirmation SMS",
              "Using a PIN prompt",
              "No clear confirmation after paying",
              "Paying an agent",
            ],
            2,
            "A product that takes MoMo but gives no clear confirmation makes people nervous.",
          ),
          q(
            "Why can a WhatsApp number plus a spreadsheet be a good first version of a product?",
            [
              "People already use WhatsApp, and downloading a new app costs data and storage",
              "WhatsApp replaces the need to talk to users",
              "Spreadsheets never make mistakes",
              "Apps are not allowed in Ghana",
            ],
            0,
            "People already organise on WhatsApp, and new apps are a big ask when data and storage are limited.",
          ),
          q(
            "What did Abdul-Rahman change after talking to traders?",
            [
              "He added more charts",
              "He removed SMS confirmations",
              "He planned USSD, small daily saving and SMS confirmations",
              "He made the feature card only",
            ],
            2,
            "Traders saved small amounts daily, trusted known people and some used basic phones, so he adjusted the plan.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "business-basics": {
      explanation_md: `Every product decision eventually meets a money question. Will this feature bring in revenue? Does it cost more to run than it earns? Can customers afford it? Even NGOs ask whether a tool serves people well within its budget. Interviewers for product and analyst roles expect you to talk about these basics with confidence.

## Four words to know

* **Revenue.** Money coming in from customers, such as fees, subscriptions or a share of each sale.
* **Costs.** Money going out: staff, servers, SMS charges, mobile money fees, marketing, agent commissions.
* **Margin.** What is left from each sale after the direct costs of that sale.
* **Unit economics.** The money story for one customer or one transaction. If one order loses money, more orders lose more money.

## How products make money

Common models in Ghana include a small fee per transaction, a monthly subscription, a commission on sales made through the platform, advertising, or a free service paid for by a partner such as an NGO or government programme.

## Pricing in cedis

Price is not just a number. It signals value and affects who can use the product. A few ideas help:

* **Compare with what people pay today.** If a trader pays a susu collector a day's savings each month, that tells you what saving is worth to her.
* **Small, frequent amounts feel easier** than large ones for people with daily income.
* **Fees should be clear before payment.** Surprise charges break trust fast.
* **Remember payment fees.** Mobile money collection usually carries a charge that someone pays, either you or the customer. Check the current rates with the provider rather than guessing.

## Worked example: the farmers' market app

Sumaila's team runs the farmers' market app. They take a commission on each order. Here is one order in made up round numbers:

* Order value: 200 cedis of vegetables
* Commission at 10 percent: 20 cedis revenue
* Mobile money collection fee they cover: 2 cedis
* SMS confirmations to farmer and buyer: 1 cedi
* Margin per order: 20 minus 3 equals 17 cedis

That 17 cedis must eventually cover staff, servers and marketing. If the team offers free delivery that costs 25 cedis an order, every order now loses money. Sumaila suggests delivery only on orders above a certain size, or a small delivery fee shown clearly before checkout.

You do not need to be an accountant. You need to spot when a feature changes the numbers and ask the right question early.`,
      practice_task_md: `**Goal:** work out the unit economics of a small local business.

1. Choose a business you know, such as a chop bar, a phone accessories kiosk or a printing shop.
2. Ask the owner (or estimate if you cannot) the price of one common item and the direct costs of making or buying it.
3. In Google Sheets, make columns for item, price, direct cost and margin, and use a formula to calculate the margin.
4. Add one row imagining a new idea, such as delivery, and show how it changes the margin.

**Done looks like:** a small sheet with at least three items and one "what if" row, plus one sentence recommending whether the idea is worth it.`,
      quiz: {
        questions: [
          q(
            "What is margin?",
            [
              "All the money a company has in the bank",
              "What is left from each sale after its direct costs",
              "The number of customers",
              "The price shown on the app",
            ],
            1,
            "Margin is what remains from a sale once the direct costs of that sale are paid.",
          ),
          q(
            "Why do unit economics matter?",
            [
              "If one order loses money, more orders lose more money",
              "They show how many staff to hire",
              "They decide the app's colour scheme",
              "They only matter for large banks",
            ],
            0,
            "Unit economics show whether a single customer or transaction makes or loses money.",
          ),
          q(
            "In the worked example, what was the margin on a 200 cedi order?",
            ["20 cedis", "3 cedis", "17 cedis", "25 cedis"],
            2,
            "20 cedis commission minus 2 cedis payment fee and 1 cedi SMS leaves 17 cedis.",
          ),
          q(
            "Which pricing advice does the lesson give?",
            [
              "Hide fees until after payment",
              "Always use one large annual fee",
              "Show fees clearly before payment",
              "Ignore mobile money charges",
            ],
            2,
            "Surprise charges break trust, so fees should be clear before people pay.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "stakeholder-communication": {
      explanation_md: `A stakeholder is anyone who cares about or affects your product: your manager, engineers, designers, sales staff, customer support, partners, and of course users. In Ghanaian job adverts for business analyst, product operations and associate product roles, communication skills appear more often than any single tool. A good idea that nobody understands goes nowhere.

## Listen first

Before you persuade anyone, find out what they care about. The sales lead cares about closing deals. The engineer cares about building something that will not break. The NGO country director cares about donor reports and reaching beneficiaries. Ask open questions and repeat back what you heard: "So the main worry is that field officers lose data when the network drops?"

## Write short, clear updates

Busy people skim. A good update fits on a phone screen:

* **What happened** since the last update.
* **What is next.**
* **What you need** from the reader, if anything, and by when.
* **Risks** they should know about.

Use plain words. Put the most important line first. Avoid long paragraphs in WhatsApp or email.

## Present a recommendation, not a pile of facts

When asking for a decision, use a simple shape:

1. The problem, in one sentence.
2. The options you considered, usually two or three.
3. Your recommendation and why.
4. What you need decided.

## Adjust for the audience

An engineer wants detail about how something should behave. A director wants the impact and the cost. A farmer group leader wants to know what changes for their members. The same news, told three ways.

## Worked example: an NGO beneficiary tracker

Amina is a junior analyst at an NGO in Wa. Field officers record beneficiaries of a nutrition programme in a mobile form, but records often duplicate. She sends this update to her manager:

> **Beneficiary tracker, week 3.** Done: found that about one in ten records we checked were duplicates, mostly when officers resubmit after a network failure. Next: test a check that warns when the same name and community are entered twice. Need from you: approval to pilot it with two officers next week. Risk: officers may ignore warnings if there are too many.

The update is short, honest about what she checked, and asks for one clear decision. Her manager approves it in a single reply.

Strong communication is a habit you can practise daily, in any job, starting now.`,
      practice_task_md: `**Goal:** write one decision update a busy manager could approve in a minute.

1. Pick a small real problem: a church WhatsApp group that misses announcements, a shop that runs out of stock, or a class group project.
2. Write an update under 120 words using four parts: done, next, need from you, risk.
3. Then write a second version of the same news for a different audience, such as the people affected.
4. Ask a friend to read the first version and tell you what decision you are asking for. If they cannot, rewrite it.

**Done looks like:** two short versions of the same update in your journal, and a note of what your friend said.`,
      quiz: {
        questions: [
          q(
            "Who counts as a stakeholder?",
            [
              "Only the company's investors",
              "Anyone who cares about or affects the product",
              "Only paying customers",
              "Only the engineering team",
            ],
            1,
            "Stakeholders include managers, engineers, designers, sales, support, partners and users.",
          ),
          q(
            "What should come first in a short update?",
            ["A long background story", "The most important line", "A list of every meeting", "Your job title"],
            1,
            "Busy people skim, so the most important line goes first.",
          ),
          q(
            "Which is the recommended shape for asking for a decision?",
            [
              "Problem, options, recommendation and why, decision needed",
              "Facts only, so people decide for themselves",
              "A long report with every detail",
              "A recommendation with no options",
            ],
            0,
            "The lesson suggests stating the problem, options, your recommendation and what needs deciding.",
          ),
          q(
            "What did Amina ask her manager for?",
            [
              "More field officers",
              "A new phone for every officer",
              "Approval to pilot a duplicate warning with two officers",
              "Permission to delete all records",
            ],
            2,
            "Her update asked for one clear decision: approval for a small pilot.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    // NEXT
  },
};

export default content;
