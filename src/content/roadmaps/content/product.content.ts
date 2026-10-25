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
    discovery: {
      explanation_md: `Many products fail for a simple reason: nobody needed them. A team spends months building an app, launches it, and finds that people carry on doing things the old way. Discovery is the work you do before building to avoid that waste. Employers value it because it saves money, and job adverts for product and analyst roles mention user research and market research often.

## What discovery means

Discovery is learning, as cheaply as possible, three things:

* **Is the problem real?** Do people actually struggle with this, and how often?
* **Is it worth solving?** Is it painful enough that people would change their habits or pay?
* **Will our idea help?** Does a rough version of the solution get used?

You answer these with conversations, observation, simple data and small tests, not with software.

## The mindset

Good discovery starts from humility. Your first idea is a guess. Your job is to find out where the guess is wrong while being wrong is still cheap. That means listening more than pitching, and being glad when evidence surprises you.

It also means separating the **problem** from the **solution**. "Farmers need an app" is a solution. "Farmers sell tomatoes at a loss because they cannot reach buyers before the produce spoils" is a problem. Many solutions could fix that problem, and an app may not be the best one.

## What this section covers

* **Problem interviews.** How to talk with people about their real past behaviour, without leading them.
* **Choosing which problem to solve.** How to compare problems and check what people and competitors already use.
* **Testing ideas without code.** How to run a service by hand with WhatsApp, Google Forms and a spreadsheet to see if anyone uses it.

## A short example

Napari wants to build a tool that helps an NGO track which households in Damongo received seed support. Her first idea is a full app with maps and dashboards. In discovery she visits two field officers and watches them work. She learns that they already use paper registers and a shared spreadsheet, and that the real pain is matching names spelled differently in different villages. The biggest win is not maps at all. It is a simple way to give each household a unique code and check for duplicates.

One afternoon of discovery changed what the team should build first. That is the value of this section. Everything here can be done with a phone, a notebook and your own curiosity.`,
      practice_task_md: `**Goal:** separate a problem from a solution.

1. Write down three product ideas you have heard or had, such as "an app for booking barbers".
2. For each idea, rewrite it as a problem statement: who struggles, with what, and what it costs them. Avoid naming any technology.
3. For each problem, list two different possible solutions, at least one with no app at all.
4. Pick the problem you know least about and write three questions you would need answered before building.

**Done looks like:** three problem statements, six possible solutions and three open questions in your journal.`,
      quiz: {
        questions: [
          q(
            "What is the main purpose of discovery?",
            [
              "To build the full product quickly",
              "To learn cheaply whether a problem is real and worth solving before building",
              "To design the company logo",
              "To hire engineers",
            ],
            1,
            "Discovery is the learning done before building to avoid wasted effort.",
          ),
          q(
            "Which of these is a problem statement rather than a solution?",
            [
              "Farmers need an app",
              "We should build a dashboard",
              "Farmers sell tomatoes at a loss because they cannot reach buyers before the produce spoils",
              "Let us add a map feature",
            ],
            2,
            "A problem statement describes who struggles and what it costs them, without naming a solution.",
          ),
          q(
            "What attitude does good discovery start from?",
            [
              "Certainty that your first idea is right",
              "Humility, treating your first idea as a guess",
              "Avoiding talking to users",
              "Focusing only on competitors",
            ],
            1,
            "Your first idea is a guess, and discovery finds where it is wrong while that is still cheap.",
          ),
          q(
            "What did Napari learn was the real pain for field officers?",
            [
              "They needed maps",
              "They had no phones",
              "Matching household names spelled differently across villages",
              "They wanted dashboards",
            ],
            2,
            "Watching officers showed the real problem was duplicate and mismatched names.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "problem-interviews": {
      explanation_md: `The fastest way to learn whether a problem is real is to talk to the people who have it. But how you ask matters enormously. Bad questions get polite, misleading answers. Good questions reveal what people actually do. This skill appears in product and analyst job adverts as user research or requirements gathering, and you can practise it anywhere.

## Ask about the past, not the future

People are poor at predicting their own behaviour and kind enough to say what you want to hear. Compare:

* Weak: "Would you use an app to save money every day?" Almost everyone says yes.
* Strong: "Tell me about the last time you saved money. How did you do it? What went wrong?"

The strong version gives you facts about real events. Past behaviour is the best guide to future behaviour.

## Do not pitch your idea

Once you describe your solution, people start reacting to it instead of telling you about their lives. Keep your idea to yourself until the end, if you share it at all.

## Useful questions

* "Walk me through how you do this today."
* "When did this last happen? What did you do next?"
* "What is the hardest part?"
* "What have you tried to fix it? Why did you stop?"
* "How much time or money does it cost you?"

Then keep asking "why?" and "can you tell me more?" Silence is fine; people often add the most useful detail after a pause.

## Practical tips for Ghana

* Speak the language your interviewee is most comfortable in, or bring someone who can.
* Ask permission before taking notes or recording, and explain what the notes are for.
* Meet people where they are: the market, the farm, the church after service.
* Respect their time. Twenty minutes is plenty.
* Do not promise a product or money in return for answers.

## Worked example: the MoMo savings feature

Zuweira interviews six traders in Tamale market about saving. She asks Ayishetu, who sells grains, "Tell me about the last time you needed savings." Ayishetu explains that she withdrew her susu early to pay school fees, and lost part of it as a penalty. Zuweira asks why she uses susu at all. "Because the collector comes to me every day, and I cannot spend money I have already given him."

Zuweira writes down a key insight: the commitment matters. Traders value something that makes the money hard to spend. That is very different from a typical savings app that lets you withdraw anytime.

After six interviews, she looks for patterns that appear again and again, not single dramatic stories. Patterns guide what to build. One person's opinion does not.`,
      practice_task_md: `**Goal:** run three short problem interviews and find a pattern.

1. Choose a group you can reach: traders, students, farmers, or small shop owners.
2. Pick one task they do, such as restocking, saving, or paying school fees.
3. Write five questions about past behaviour using the lesson's examples. Do not mention any solution.
4. Interview three people for 10 to 20 minutes each, with permission. Take notes on your phone.
5. Write down every pain point, then mark those that came up more than once.

**Done looks like:** notes from three interviews and a list of repeated pain points with a one line quote or fact for each.`,
      quiz: {
        questions: [
          q(
            "Why should interview questions focus on the past rather than the future?",
            [
              "Past events are easier to forget",
              "Past behaviour is a better guide than predictions people make to be polite",
              "Future questions take too long",
              "People do not like talking about the past",
            ],
            1,
            "People are poor at predicting their behaviour and often say what you want to hear.",
          ),
          q(
            "Which is the stronger interview question?",
            [
              "Would you use an app to save daily?",
              "Do you like my savings idea?",
              "Tell me about the last time you saved money and what went wrong",
              "How much would you pay for my app?",
            ],
            2,
            "It asks about a real past event rather than a hypothetical.",
          ),
          q(
            "Why should you avoid pitching your idea during the interview?",
            [
              "People start reacting to your idea instead of describing their lives",
              "It is illegal",
              "It makes the interview too short",
              "People always copy ideas",
            ],
            0,
            "Once you describe a solution, the conversation shifts to opinions about it.",
          ),
          q(
            "What insight did Zuweira get from Ayishetu?",
            [
              "Traders want charts",
              "Traders value a commitment that makes money hard to spend",
              "Traders prefer card payments",
              "Traders do not save at all",
            ],
            1,
            "The susu collector's daily visit and the inability to spend given money mattered most.",
          ),
          q(
            "After several interviews, what should guide your decisions?",
            [
              "The most dramatic single story",
              "Your original idea",
              "Patterns that appear again and again",
              "The opinion of the first person you met",
            ],
            2,
            "Repeated patterns across interviews are more reliable than one person's view.",
          ),
        ],
        pass_threshold: 80,
      },
    },
    "choosing-problems": {
      explanation_md: `After interviews you usually have more problems than your team can solve. Choosing well is one of the most important product judgements, and adverts for product roles mention market research and competitor analysis as part of it. The goal is not to pick the most exciting problem but the one where solving it creates the most value.

## Four questions to compare problems

For each problem, ask:

* **How painful is it?** Does it cost people money, time, health or dignity, or is it a small annoyance?
* **How often does it happen?** Daily problems create habits; once a year problems are easy to forget.
* **How many people have it?** One trader or thousands across the region?
* **Do people already spend effort or money on it?** If people pay a susu collector, hire a helper or travel to solve something, the problem is real.

A simple table helps. Score each problem from 1 to 3 on each question and add the scores. The total is not the answer, but it forces you to discuss the reasons.

## Check the alternatives

Every problem already has a solution, even if it is a poor one: a notebook, a phone call, a cousin, doing nothing. Before building, list:

* **What people use today**, including informal methods.
* **Direct competitors**, other products solving the same problem.
* **Why people would switch.** A new product must be clearly better than the habit, not just a little better.

You can do this research cheaply: try competitor apps and USSD menus yourself, read their app store reviews, and ask interviewees what they have tried.

## Write down your reasoning

Write a short note explaining which problem you chose and why, and what evidence would change your mind. That lets your manager or team challenge your thinking, and it shows interviewers how you decide.

## Worked example: the farmers' market app

Salifu's team found three problems among farmers near Tamale:

1. Produce spoils before it reaches buyers. Very painful, weekly in season, many farmers. Farmers already pay middlemen to collect. Score: 3, 3, 3, 3.
2. Farmers struggle to keep records of sales. Mildly painful, daily, many farmers, but few spend money on it. Score: 2, 3, 3, 1.
3. Farmers want weather forecasts. Useful, but free radio and phone services already provide them. Score: 2, 2, 3, 1.

Salifu checks the alternatives for problem 1. Middlemen offer low prices but collect reliably. A new app must match that reliability. His note says: "We focus on spoilage. We will know we are wrong if farmers keep selling to middlemen even when our buyers offer better prices."

He chose a problem with evidence, checked the competition, and stated what would change his mind.`,
      practice_task_md: `**Goal:** choose one problem to focus on, with reasons.

1. Take the repeated pain points from your interviews (or list three problems you see in your community).
2. In Google Sheets, score each on pain, frequency, number of people, and existing spending, from 1 to 3.
3. For your top problem, list what people use today and at least one competitor product. Try the competitor if it is free.
4. Write a short note: the problem you chose, why, and what evidence would change your mind.

**Done looks like:** a scoring table and a note under 150 words that someone else could challenge.`,
      quiz: {
        questions: [
          q(
            "Which is one of the four questions for comparing problems?",
            [
              "Is it the most exciting problem?",
              "Do people already spend effort or money on it?",
              "Can it be solved with AI?",
              "Will it look good in a pitch deck?",
            ],
            1,
            "Existing effort or spending is strong evidence the problem is real.",
          ),
          q(
            "Why should you list what people use today, including informal methods?",
            [
              "Because a new product must be clearly better than the current habit",
              "To copy it exactly",
              "Because informal methods do not count",
              "To avoid talking to users",
            ],
            0,
            "Every problem has an existing solution, and people only switch if the new one is clearly better.",
          ),
          q(
            "What is the purpose of scoring problems in a table?",
            [
              "The total gives the final answer automatically",
              "To impress the manager",
              "To force a discussion of the reasons behind each choice",
              "To avoid making a decision",
            ],
            2,
            "The lesson says the total is not the answer but it helps the team discuss reasons.",
          ),
          q(
            "What did Salifu say would show he was wrong?",
            [
              "If farmers liked the app's colours",
              "If farmers kept selling to middlemen even when buyers offered better prices",
              "If weather forecasts improved",
              "If record keeping became popular",
            ],
            1,
            "He stated in advance what evidence would change his mind.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "no-code-mvp": {
      explanation_md: `An MVP, or minimum viable product, is the smallest thing you can offer that tests whether people want your solution. In Ghana, the cheapest MVP is often not software at all. You run the service by hand using tools people already have, and you watch what happens. If people do not use the manual version, building an app will not change that.

This is also one of the best ways to build portfolio evidence when you have no product job yet.

## The concierge approach

In a concierge MVP, you do the work a future app would automate. Customers get the real benefit, but behind the scenes it is you, a phone and a spreadsheet. This lets you learn:

* Do people actually ask for the service?
* Do they come back a second time?
* Will they pay, and how much?
* What goes wrong that you never expected?

## A free toolkit

* **WhatsApp Business** for taking requests, sending updates and quick replies.
* **Google Forms** for orders or sign ups, which feed straight into a sheet.
* **Google Sheets** for tracking every request, status and payment.
* **Mobile money** for collecting payment, with a clear receipt message.

All of these work on a phone with modest data.

## Decide what success looks like first

Before you start, write down what result would mean the idea is worth continuing. For example: "At least 10 orders in two weeks, and at least 4 repeat customers." Deciding in advance stops you from explaining away weak results later.

## Worked example: the farmers' market app

Before building anything, Mohammed tests the farmers' market idea by hand. He creates a WhatsApp Business number and a Google Form for buyers in Tamale to order vegetables from three farmer groups. Each morning he reads new orders in his sheet, calls the farmers, arranges a tricycle for delivery, and collects payment by MoMo.

His success rule was 15 orders and 5 repeat buyers in three weeks. Results:

* 22 orders, mostly from chop bar owners.
* 9 repeat buyers.
* Two deliveries failed because farmers had already sold to a middleman.

Mohammed learned three things no app would have told him: chop bars are the best first customers, they order the same items weekly, and farmers need a firm commitment before harvest day. His team now knows what the first app version must do: let regular buyers place repeat orders and confirm them with farmers a day early.

## Know when to stop

A manual MVP is a test, not a business plan. When the work becomes too much to do by hand, that is a good sign: you have demand worth automating.`,
      practice_task_md: `**Goal:** design and run a tiny manual test of an idea.

1. Pick a simple service idea, such as weekly gas refill pickup, printing for students, or ordering from a local farm.
2. Write your success rule before you start: how many requests and repeat customers in what time.
3. Set up a Google Form or WhatsApp Business number and a Google Sheet to track requests.
4. Share it with a small group you know and run it for one or two weeks, doing the work by hand.
5. Record what happened against your success rule and list three surprises.

**Done looks like:** your success rule, a sheet of real requests, and a half page summary of what you learned. If you cannot run it, write a full plan instead.`,
      quiz: {
        questions: [
          q(
            "What is a concierge MVP?",
            [
              "A fully built app with every feature",
              "A service run by hand that delivers the real benefit to test demand",
              "A hotel booking app",
              "A marketing campaign",
            ],
            1,
            "In a concierge MVP you do the work a future app would automate.",
          ),
          q(
            "Why should you write your success rule before starting?",
            [
              "To stop you explaining away weak results later",
              "Because the law requires it",
              "To make the test longer",
              "So customers can see it",
            ],
            0,
            "Deciding in advance keeps you honest about what the results mean.",
          ),
          q(
            "Which customers turned out best in Mohammed's test?",
            ["Schools", "Chop bar owners", "Banks", "Tourists"],
            1,
            "Most orders, and the regular ones, came from chop bar owners.",
          ),
          q(
            "What does it mean when the manual work becomes too much to handle?",
            [
              "The idea has failed",
              "You should stop immediately",
              "You may have demand worth automating",
              "You need a new idea",
            ],
            2,
            "Growing manual workload is a sign of real demand.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    defining: {
      explanation_md: `Discovery tells you which problem matters. Defining turns that understanding into clear instructions a team can build from. This is the heart of business analyst work and a big part of associate product manager work. In Ghanaian adverts for these roles, the duties named most often include gathering requirements, writing user stories and functional specifications, and mapping business processes.

## Why clear definition matters

Engineers and designers build what is written down and discussed, not what is in your head. Vague instructions lead to rework, arguments and delays. Clear definition means:

* Everyone agrees what problem is being solved and for whom.
* Everyone knows what "finished" looks like.
* Everyone knows what is **not** included this time.

On small Ghanaian teams, where one engineer may support several products, a clear definition can save weeks.

## The steps in this section

* **Mapping processes.** Draw how work happens today, step by step, to see where time and errors creep in. You cannot improve a process you do not understand.
* **Requirements and user stories.** Turn needs into precise statements of what the system must do, with acceptance criteria that say how you will check it.
* **Writing product specs.** Pull everything into a short document: the problem, users, requirements, success measures and what is out of scope.
* **Prioritisation and roadmaps.** Decide what comes first, what waits, and how to explain the order to everyone.

## Writing is the main tool

You do not need expensive software. Google Docs, a whiteboard photo, or a notebook can hold excellent definitions. What matters is plain language, short sentences and specific details. "The app should be fast" is vague. "The order list loads within three seconds on a 3G connection" is specific and testable.

## Worked example: the NGO beneficiary tracker

Abdul-Rahman joins an NGO team in Bolgatanga that wants to replace paper registers for a school feeding programme. Instead of jumping into screens, he:

1. Maps how a head teacher records meals today and how the numbers reach the district office.
2. Notices that totals are copied by hand three times, and errors appear at each copy.
3. Writes requirements: the head teacher enters daily meal counts once on a phone; the district officer sees totals automatically; entries work offline and sync later.
4. Writes a short spec with a success measure: district reports ready within one day instead of two weeks.
5. Agrees with his manager that offline entry and totals come first, and photo uploads wait.

The engineers start building with confidence because they know exactly what is needed and why.

By the end of this section you will be able to produce each of these pieces yourself.`,
      practice_task_md: `**Goal:** turn a vague request into a clear one.

1. Write down three vague requests you have heard, such as "make the church app better" or "the shop needs a system".
2. For each, ask yourself who it is for, what problem it solves and what "finished" would look like.
3. Rewrite each as one specific, testable sentence, like the lesson's example about load time.
4. For one of them, list two things that are out of scope for a first version.

**Done looks like:** three vague requests and three specific rewrites, plus an out of scope list.`,
      quiz: {
        questions: [
          q(
            "Why does clear definition matter for a team?",
            [
              "Engineers build what is written down and discussed, so vagueness causes rework",
              "It makes the product look professional",
              "It removes the need for testing",
              "It means users never complain",
            ],
            0,
            "Clear definition lets everyone agree on the problem, what finished means and what is excluded.",
          ),
          q(
            "Which statement is specific and testable?",
            [
              "The app should be fast",
              "The order list loads within three seconds on a 3G connection",
              "Users should love the app",
              "Make it modern",
            ],
            1,
            "It names a measurable condition you can check.",
          ),
          q(
            "What did Abdul-Rahman notice when mapping the school feeding process?",
            [
              "Head teachers had no phones",
              "Totals were copied by hand three times, adding errors each time",
              "The district office wanted photos",
              "Meals were not being served",
            ],
            1,
            "Repeated hand copying introduced errors at each step.",
          ),
          q(
            "What did his team agree to leave for later?",
            ["Offline entry", "Automatic totals", "Photo uploads", "Daily meal counts"],
            2,
            "Offline entry and totals came first; photo uploads waited.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "process-mapping": {
      explanation_md: `Before you can improve how something works, you need to see how it works now. A process map is a simple drawing of the steps in a task, who does each one, and where things go wrong. Business analyst adverts from banks, telecoms and manufacturers in Ghana ask for business process analysis again and again, and NGOs use the same skill to improve field work.

## What a process map shows

* **Steps.** Each action, in order: "Officer writes name in register", "Officer sends photo of page on WhatsApp".
* **People or roles.** Who does each step. Drawing a column or lane for each role makes handovers obvious.
* **Decisions.** Points where the path splits: "Is the household already registered? Yes or no."
* **Handovers.** Where work passes from one person to another. Delays and errors love handovers.
* **Pain points.** Mark steps that are slow, repeated, error prone or frustrating.

You can use boxes for steps, diamonds for decisions and arrows for flow. Formal notations such as BPMN exist and some employers mention them, but clear boxes and arrows are enough to start.

## How to map a process

1. **Pick one process with a clear start and end.** For example, "from a customer placing an order to receiving it".
2. **Watch or ask someone who does it.** Do not rely on how managers think it works. Reality is usually messier.
3. **Write each step on paper or sticky notes**, then arrange them.
4. **Mark the pain points** and ask why each happens.
5. **Check with the people involved.** Show them the map and ask, "Is this right? What did I miss?"

After the current map (often called "as is"), you can sketch an improved version ("to be") that removes or automates the painful steps.

## Worked example: MoMo savings sign up

Hawa is a junior analyst at a fintech. Customers complain that signing up for the new savings feature takes too long. She maps the current process:

1. Customer dials the USSD code and picks Savings.
2. Customer enters ID number.
3. System sends ID to a verification partner. **Decision:** verified within one minute?
4. If not, a support agent checks manually the next working day.
5. Agent calls the customer to confirm.
6. Customer dials again to set a daily amount.

The map shows two pain points: manual checks wait a day, and the customer must dial twice. Hawa asks the support team why manual checks are needed and learns that most failures come from customers typing their ID with spaces. Her "to be" map adds a step that removes spaces automatically and lets customers set the amount in the same session.

She did not need to code. She needed to look closely, ask why and draw it clearly.`,
      practice_task_md: `**Goal:** map a real process and find one improvement.

1. Choose a process you can observe: registering for a school exam, a pharmacy filling a prescription, or a shop restocking.
2. Watch it or interview someone who does it.
3. On paper, draw each step as a box, decisions as diamonds, and use one column per role.
4. Circle at least two pain points and write why each happens.
5. Draw a second, improved map that fixes one pain point. Photograph both maps.

**Done looks like:** two photographed maps ("as is" and "to be") with pain points labelled and a two sentence explanation.`,
      quiz: {
        questions: [
          q(
            "Why draw a separate column or lane for each role in a process map?",
            [
              "It makes handovers between people obvious",
              "It looks more colourful",
              "It removes the need for decisions",
              "Roles do not matter in processes",
            ],
            0,
            "Lanes show where work passes between people, which is where delays often happen.",
          ),
          q(
            "Where should you get information for an as is map?",
            [
              "Only from senior managers",
              "From people who actually do the process, by watching or asking",
              "From a competitor's website",
              "From your imagination",
            ],
            1,
            "Reality is usually messier than how managers think it works.",
          ),
          q(
            "What is a to be map?",
            [
              "A map of the current process",
              "An improved version of the process that removes painful steps",
              "A list of staff names",
              "A financial forecast",
            ],
            1,
            "The to be map shows the improved process.",
          ),
          q(
            "What caused most failed ID checks in Hawa's example?",
            [
              "Customers had no ID",
              "The partner was offline",
              "Customers typed their ID with spaces",
              "Support agents were absent",
            ],
            2,
            "Asking why revealed spaces in typed IDs as the main cause.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "requirements-and-user-stories": {
      explanation_md: `If you read adverts for business analyst, associate product manager and product operations roles in Ghana, one duty keeps appearing: turning what users and the business need into clear requirements and user stories. Master this and you can contribute to a product team from your first week.

## Requirements

A requirement is a statement of something the system must do or a quality it must have.

* **Functional requirements** describe behaviour: "The system sends an SMS receipt after every savings deposit."
* **Non functional requirements** describe qualities: "The USSD menu responds within two seconds", "Data is stored securely and only visible to authorised staff."

Good requirements are specific, testable and free of hidden assumptions. "The system should be user friendly" is not testable. "A first time user can save money in under three USSD screens" is.

## User stories

A user story describes a need from the user's point of view. The common template is:

> As a **[type of user]**, I want **[something]**, so that **[benefit]**.

For example: "As a market trader, I want my savings to be deducted automatically each evening, so that I do not have to remember."

The "so that" part is important. It explains why, which lets engineers and designers suggest better ways to meet the need.

## Acceptance criteria

Acceptance criteria are the conditions that must be true for a story to count as done. A popular format is **Given, When, Then**:

* **Given** a trader has set a daily amount of 10 cedis,
* **When** the evening deduction runs and her wallet has enough money,
* **Then** 10 cedis moves to savings and she receives an SMS showing her new balance.

Add criteria for the unhappy paths too: what if the wallet is empty? What if the network fails?

## Gathering requirements

Requirements come from interviews, process maps, support complaints, business rules and regulations. Ask "why?" until you reach the real need, and confirm your written version with the person who asked.

## Worked example: the farmers' market app

Fuseini writes a story for buyers:

> As a chop bar owner, I want to repeat last week's order with one tap, so that I save time every Monday.

Acceptance criteria:

* Given I have at least one past order, when I tap "Repeat order", then the same items and quantities appear in my basket for me to confirm.
* Given an item is no longer available, when I repeat the order, then I see a clear message and the other items still load.

He also adds a non functional requirement: the order screen must work on low cost Android phones with slow connections. His engineer says this story is the clearest she has received all month.`,
      practice_task_md: `**Goal:** write user stories with acceptance criteria for a real need.

1. Choose a product idea from your journal or your manual MVP.
2. Write three user stories using "As a, I want, so that". Use at least two different types of user.
3. For each story, write two acceptance criteria using Given, When, Then. Include at least one unhappy path.
4. Write two non functional requirements, such as speed on slow networks or privacy.
5. Ask a friend to read one story and explain what should be built. Fix anything they misunderstood.

**Done looks like:** three stories, six acceptance criteria and two non functional requirements in a Google Doc.`,
      quiz: {
        questions: [
          q(
            "Which is a non functional requirement?",
            [
              "The system sends an SMS receipt after every deposit",
              "The USSD menu responds within two seconds",
              "A trader can set a daily savings amount",
              "Buyers can repeat an order",
            ],
            1,
            "Non functional requirements describe qualities such as speed or security.",
          ),
          q(
            "Why is the so that part of a user story important?",
            [
              "It makes the story longer",
              "It explains why, so the team can suggest better ways to meet the need",
              "It names the engineer",
              "It sets the deadline",
            ],
            1,
            "The benefit explains the purpose behind the request.",
          ),
          q(
            "What do acceptance criteria describe?",
            [
              "The conditions that must be true for a story to be done",
              "The cost of the project",
              "The team's holiday plans",
              "The marketing message",
            ],
            0,
            "Acceptance criteria define when a story counts as finished.",
          ),
          q(
            "In Given, When, Then, what goes after Then?",
            ["The starting situation", "The action taken", "The expected result", "The user's name"],
            2,
            "Then states the result that should happen.",
          ),
          q(
            "Why did Fuseini write a criterion for an unavailable item?",
            [
              "To cover an unhappy path so the team handles it",
              "To make the story fail",
              "Because all items are always unavailable",
              "To remove the repeat feature",
            ],
            0,
            "Good acceptance criteria include unhappy paths, not only the ideal case.",
          ),
        ],
        pass_threshold: 80,
      },
    },
    "writing-specs": {
      explanation_md: `User stories describe small pieces of work. A product spec (sometimes called a product requirements document or functional specification) puts the bigger picture in one place: why this feature exists, who it is for, what it must do and how you will know it worked. Adverts for analyst and product roles in Ghana list functional specifications and product documentation as core duties.

A good spec lets designers and engineers work without waiting for you to answer the same questions repeatedly.

## What goes in a short spec

Keep it to one or two pages where possible. A useful structure:

1. **Problem.** What is wrong today, with evidence from interviews, data or support.
2. **Users.** Who this is for, and who it is not for.
3. **Goal and success measure.** What will change if this works, stated as something you can measure.
4. **Requirements.** The user stories and key functional and non functional requirements, with acceptance criteria or links to them.
5. **Out of scope.** What you are deliberately not doing this time. This section prevents many arguments.
6. **Risks and open questions.** What you are unsure about and how you plan to find out.
7. **Rough flow or sketch.** A simple diagram or wireframe photo if it helps.

## Tips for writing well

* Write for a busy reader on a phone: short paragraphs, headings, bullets.
* Use the words your users use. If traders say "susu", do not write "periodic savings instrument".
* Be specific about numbers and limits: maximum amounts, time windows, supported languages.
* Mark the spec as a draft and invite comments. A spec is a conversation, not a command.
* Keep it updated. An out of date spec causes more harm than no spec.

## Worked example: the MoMo savings feature

Amina writes a one page spec titled "Daily Lock Savings, version 1".

* **Problem:** Traders we interviewed save daily with susu collectors because the money is hard to spend, but they lose part of it when they withdraw early or the collector disappears.
* **Users:** Traders with daily income who use mobile money. Not for salaried workers in this version.
* **Goal:** Traders save regularly. Success measure: a set share of new savers make at least 20 deposits in their first month (the team will agree the target).
* **Requirements:** automatic daily deduction of a fixed amount; SMS after every deposit; savings locked for a chosen period; early withdrawal possible with a clear warning; works on USSD.
* **Out of scope:** interest, savings goals with pictures, group savings.
* **Risks:** traders may not keep enough balance in the evening. Open question: what time of day suits most traders?

Her engineer and designer read it in five minutes and start work. When the sales team asks about group savings, Amina points to the out of scope section and adds it to the list for later.`,
      practice_task_md: `**Goal:** write a one page spec for a small feature.

1. Use the stories you wrote in the previous lesson, or choose a small feature for a product you know.
2. In Google Docs, write the seven sections from the lesson. Keep it to one page if possible.
3. Include at least two items in Out of scope and one open question.
4. Share it with a friend or mentor and ask: "Could you build or design from this? What is unclear?"
5. Update the spec based on their answer and note what you changed.

**Done looks like:** a one page spec with all seven sections and a short change note. This is a strong portfolio piece.`,
      quiz: {
        questions: [
          q(
            "What is the main purpose of a product spec?",
            [
              "To replace all conversation with the team",
              "To put the why, who, what and success measure in one place so the team can work without waiting",
              "To list every engineer's tasks by hour",
              "To advertise the product",
            ],
            1,
            "A spec gathers the bigger picture so designers and engineers can work independently.",
          ),
          q(
            "Why include an Out of scope section?",
            [
              "It prevents many arguments by stating what is deliberately not being done",
              "It lists features that will never be built",
              "It is required by law",
              "It makes the spec longer",
            ],
            0,
            "Stating what is excluded keeps the team focused and handles extra requests.",
          ),
          q(
            "Which writing tip does the lesson give?",
            [
              "Use technical terms users never say",
              "Never update the spec once written",
              "Use the words your users use",
              "Avoid numbers and limits",
            ],
            2,
            "Using users' own words, such as susu, keeps the spec clear.",
          ),
          q(
            "What did Amina do when the sales team asked about group savings?",
            [
              "Added it immediately",
              "Pointed to the out of scope section and added it to the list for later",
              "Cancelled the project",
              "Ignored them",
            ],
            1,
            "The out of scope section helped her handle the request calmly.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "prioritisation-and-roadmaps": {
      explanation_md: `Every product team has more ideas than time. Customers ask for features, managers have plans, engineers want to fix old problems, and partners make requests. Choosing what to do first, and explaining why, is a core product skill. On small Ghanaian teams, where a few people support a whole product, focus can decide whether the product survives.

## Value and effort

The simplest prioritisation tool is a two by two grid:

* **High value, low effort:** do these first. They are often called quick wins.
* **High value, high effort:** plan these carefully as major projects.
* **Low value, low effort:** fill gaps with these, if at all.
* **Low value, high effort:** avoid.

"Value" means value to users and the business, backed by evidence where possible. "Effort" should come from engineers and designers, not from your guess.

## Scoring when there are many ideas

When the list is long, score each idea. One popular approach multiplies how many people it reaches, how much it helps each one, and how confident you are, then divides by effort. The exact formula matters less than writing your reasons down so others can question them.

## Saying no politely

Prioritising means saying no, or "not now", to most requests. A respectful no:

* Thanks the person and shows you understood the need.
* Explains what the team is focused on and why.
* Says when you will look at the request again.

## From priorities to a roadmap

A roadmap shows what the team plans to work on over time. A helpful format for small teams uses three columns:

* **Now:** what the team is building.
* **Next:** what comes after, fairly confident.
* **Later:** ideas you are considering but not committed to.

Write roadmap items as **problems or goals**, not just features. "Help traders save daily" leaves room for the team to find the best solution. Avoid exact dates for things far away; plans change as you learn.

## Worked example: the farmers' market app

Hawa has six requests: repeat orders, delivery tracking, a farmer loans feature, a Dagbani language option, a new logo, and fixing failed payment confirmations.

She asks engineers for effort and looks at evidence. Failed payment confirmations cause many support calls and lost trust: high value, low effort. Repeat orders came up in every chop bar interview: high value, medium effort. Loans are high effort and need a finance partner: later. The logo has little evidence of value: not now.

Her roadmap:

* **Now:** reliable payment confirmations; repeat orders.
* **Next:** Dagbani option for farmers; delivery status updates.
* **Later:** explore farmer loans with a partner.

She shares it in the team WhatsApp group with one line of reasoning for each item.`,
      practice_task_md: `**Goal:** prioritise a list of ideas and build a simple roadmap.

1. List eight ideas or requests for a product you know, such as your school portal, a church app or your manual MVP.
2. Draw a value and effort grid on paper and place each idea. Write one reason for each placement.
3. Create a Now, Next, Later roadmap with no more than two items in Now. Write each as a problem or goal.
4. Write a polite "not now" message for one request you placed in Later.

**Done looks like:** a photo of your grid, a three column roadmap and one polite message.`,
      quiz: {
        questions: [
          q(
            "On a value and effort grid, which items should usually come first?",
            ["Low value, high effort", "High value, low effort", "Low value, low effort", "Whatever the manager likes"],
            1,
            "High value, low effort items are quick wins.",
          ),
          q(
            "Who should estimate effort?",
            [
              "The product person alone",
              "The engineers and designers doing the work",
              "The customers",
              "Nobody, effort does not matter",
            ],
            1,
            "Effort should come from the people who will build it.",
          ),
          q(
            "Why write roadmap items as problems or goals rather than features?",
            [
              "It leaves room for the team to find the best solution",
              "Features are not allowed on roadmaps",
              "It hides the plan from stakeholders",
              "Goals never change",
            ],
            0,
            "Problem framing lets the team choose how to solve it.",
          ),
          q(
            "Why did Hawa put payment confirmations in Now?",
            [
              "The manager asked for it",
              "It caused many support calls and lost trust, and was low effort",
              "It was the newest idea",
              "It needed a finance partner",
            ],
            1,
            "Evidence of high value and low effort made it a clear first priority.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    // NEXT
  },
};

export default content;
