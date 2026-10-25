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
    building: {
      explanation_md: `Product people do not build alone. Once you know what to build, the work moves to engineers and designers, and your job becomes helping them succeed: answering questions, making decisions quickly, protecting focus and checking that what is built actually meets the need. Adverts for associate product, business analyst and product operations roles in Ghana mention Agile methods, working across teams, technical understanding and testing before release.

## Your role during building

* **Be available.** Engineers will find questions nobody thought of. A quick answer keeps work moving; a slow answer wastes days.
* **Keep the why visible.** Remind the team of the problem and the user, so small decisions point the same way.
* **Protect scope.** New requests will arrive mid build. Most should wait for the next cycle.
* **Check the work.** Before anything reaches users, make sure it meets the acceptance criteria.

## Respect and trust

Good relationships with engineers and designers are built on respect for their expertise. You decide what problem to solve and why; they decide how best to build it. Ask questions instead of giving orders: "What would make this easier to build?" is better than "Just add a button."

## What this section covers

* **Agile ways of working.** Sprints, backlogs, boards, standups and retrospectives, and why teams ship in small pieces.
* **Technical literacy.** Enough understanding of APIs, databases, mobile money integrations and releases to judge effort and ask good questions, without coding.
* **Working with designers.** User flows, wireframes and usability tests, and how to give useful feedback.
* **Acceptance testing and release.** Checking the build against the criteria and planning a safe release to real users.

## Worked example: the NGO beneficiary tracker

Sumaila is the associate product manager for an NGO's beneficiary tracking tool. Mid sprint, the engineer asks: "If a field officer registers a household with no phone number, should the form allow it?" The spec does not say.

Sumaila does not guess. He calls two field officers, who explain that many households in remote communities have no phone. He replies within the hour: "Yes, allow it, but require a community name and a household head name instead." He updates the spec so the answer is recorded.

Later the country director asks to add a donor report screen to the current sprint. Sumaila explains that the team is focused on offline registration, which field officers need first, and adds the report to the next sprint's list. The director agrees because the reasoning is clear.

Neither action involved code. Both kept the team building the right thing.`,
      practice_task_md: `**Goal:** practise answering builder questions quickly and clearly.

1. Take the spec or user stories you wrote earlier.
2. Imagine you are the engineer. Write five questions an engineer might ask that your spec does not answer, such as missing data, errors or limits.
3. Answer each question in one or two sentences, explaining the reason.
4. Update your spec with the answers and mark what changed.

**Done looks like:** five questions with clear answers, and an updated spec with a short change log.`,
      quiz: {
        questions: [
          q(
            "Why should a product person answer engineers' questions quickly?",
            [
              "Slow answers waste days of building time",
              "Engineers cannot make any decisions",
              "It is a legal requirement",
              "So they can skip testing",
            ],
            0,
            "A quick answer keeps work moving.",
          ),
          q(
            "In the lesson, who decides how best to build something?",
            ["The product person alone", "The engineers and designers", "The customers", "The finance team"],
            1,
            "Product decides what and why; builders decide how.",
          ),
          q(
            "How did Sumaila answer the question about households without phones?",
            [
              "He guessed",
              "He asked the director",
              "He called field officers, then gave a clear answer and updated the spec",
              "He told the engineer to decide",
            ],
            2,
            "He checked with users and recorded the decision.",
          ),
          q(
            "What did Sumaila do with the request for a donor report screen mid sprint?",
            [
              "Added it immediately",
              "Explained the current focus and moved it to the next sprint's list",
              "Refused forever",
              "Asked the engineer to work overtime",
            ],
            1,
            "He protected the sprint's scope while keeping the request for later.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "agile-basics": {
      explanation_md: `Most software teams in Ghana, from bank digital teams to startups, use some form of Agile. Adverts for business analysts, product operations staff and associate product managers mention Scrum, Kanban and tools like Jira. You do not need a certificate to start; you need to understand the ideas and why they work.

## The core idea

Instead of planning everything for a year and delivering it all at once, Agile teams build in **small pieces**, show working results often, and adjust based on what they learn. If a decision was wrong, you find out in two weeks, not twelve months.

## Key terms

* **Backlog.** A prioritised list of work waiting to be done: user stories, bugs and tasks. The product person usually keeps it in order.
* **Sprint.** A fixed period, often one or two weeks, in which the team commits to finishing a set of backlog items. This rhythm comes from Scrum.
* **Sprint planning.** A meeting at the start of a sprint where the team picks items from the top of the backlog and agrees what they can finish.
* **Standup.** A short daily check in, often 15 minutes: what I did, what I will do, what is blocking me.
* **Review or demo.** At the end of the sprint the team shows what it built to stakeholders.
* **Retrospective.** The team discusses what went well, what did not, and one or two things to improve.
* **Board.** A visual view of work in columns such as To do, In progress, In review, Done. Kanban teams work from a board without fixed sprints, limiting how much is in progress at once.

## Your part as a product person

* Keep the backlog ordered and the top items ready, with clear stories and acceptance criteria.
* Join planning to explain the why behind each item.
* Answer questions during the sprint.
* Accept or reject finished stories against their criteria.
* Listen in retrospectives, because process problems often start with unclear requirements.

## Tools

Jira, Trello, Linear and GitHub Projects are common. Trello and GitHub Projects have free plans. A shared Google Sheet with columns works fine for a small team.

## Worked example: the farmers' market app

Mariama's team works in two week sprints. In planning, the top backlog items are "repeat last order" and "SMS confirmation to farmers". The engineers estimate both fit. Midway, a standup reveals that the SMS provider needs a business registration document. Mariama gets the document from operations the same day, unblocking the work.

At the review, the team demos repeat orders to two chop bar owners over a video call. One asks to edit quantities before confirming. Mariama adds that as a new story to the backlog. In the retrospective, engineers say some stories lacked unhappy paths, so Mariama agrees to add them before planning.

Notice how the short cycle caught a new need quickly.`,
      practice_task_md: `**Goal:** run a mini sprint on your own project.

1. Create a free Trello board or a Google Sheet with columns: Backlog, To do, In progress, Done.
2. Add at least eight cards for a small project, such as preparing your portfolio or running your manual MVP.
3. Order the backlog by priority and pick what you can finish in one week.
4. Each day, spend two minutes on a personal standup: move cards and note any blocker.
5. At the end of the week, write a short retrospective: one thing that went well, one that did not, one change.

**Done looks like:** a screenshot of your board at the start and end of the week, plus your retrospective notes.`,
      quiz: {
        questions: [
          q(
            "What is the core idea of Agile?",
            [
              "Plan everything for a year and deliver once",
              "Build in small pieces, show results often and adjust",
              "Avoid talking to users",
              "Skip testing to go faster",
            ],
            1,
            "Agile teams deliver small pieces and learn quickly.",
          ),
          q(
            "What is a backlog?",
            [
              "A prioritised list of work waiting to be done",
              "A list of finished features",
              "The team's holiday calendar",
              "A bug in the code",
            ],
            0,
            "The backlog holds stories, bugs and tasks in priority order.",
          ),
          q(
            "What happens in a retrospective?",
            [
              "The team demos to customers",
              "The team discusses what went well, what did not and what to improve",
              "The manager assigns salaries",
              "Engineers write code",
            ],
            1,
            "Retrospectives improve how the team works.",
          ),
          q(
            "How does Kanban differ from Scrum in the lesson?",
            [
              "Kanban has no board",
              "Kanban works from a board without fixed sprints",
              "Kanban uses yearly plans",
              "Kanban has no backlog of any kind",
            ],
            1,
            "Kanban teams pull work through a board and limit work in progress, without fixed sprints.",
          ),
          q(
            "What did Mariama do after a chop bar owner asked to edit quantities?",
            [
              "Ignored the request",
              "Changed the code herself",
              "Added it as a new story to the backlog",
              "Cancelled repeat orders",
            ],
            2,
            "New needs found at a review become backlog items.",
          ),
        ],
        pass_threshold: 80,
      },
    },
    "technical-literacy": {
      explanation_md: `You do not need to code to work in product, but you need to understand how software is put together. Adverts for associate product roles ask for technical fluency, and fintech product roles in Accra mention mobile money and payment integrations. Technical literacy helps you judge effort, spot risks early and earn engineers' respect.

## The main parts of most products

* **Frontend.** What users see and touch: an app screen, a web page or a USSD menu.
* **Backend.** Servers that apply the business rules, such as "lock savings for 30 days", and talk to other systems.
* **Database.** Where information is stored: users, orders, balances. Data is kept in tables with rows and columns, a bit like a spreadsheet.
* **APIs.** An API (application programming interface) is a set of agreed requests one system can make to another. Your app's frontend calls the backend's API; your backend calls a payment provider's API.

## How a mobile money payment usually works

The details vary by provider, but the general flow is:

1. Your app asks your backend to charge a customer 50 cedis.
2. Your backend sends a request to the payment provider's API.
3. The provider sends a prompt to the customer's phone asking for their PIN.
4. The customer approves (or ignores it).
5. The provider later tells your backend the result, often through a **callback** or **webhook**, a message sent to an address your backend provides.
6. Your backend updates the order and sends a receipt.

Product questions hide in every step. What if the customer never approves? What if the callback is delayed? How long do you wait before showing "failed"? Engineers will be glad you asked.

## Releases

Mobile apps go through app store review and users must update, so a fix can take days to reach everyone. Web apps and USSD services can usually change faster. This affects how you plan urgent fixes.

## Words to recognise

* **Bug:** something not working as intended.
* **Environment:** a separate copy of the system for testing (often called staging) versus the real one (production).
* **Technical debt:** shortcuts taken earlier that make later changes slower.
* **Integration:** connecting to another company's system, which often depends on their documentation and approval.

## Worked example: the MoMo savings feature

Issahaku asks his engineer how long the daily auto deduction will take. She explains that the payment provider only allows recurring charges after the customer approves each one, so true automatic deduction is not possible with this integration. Because Issahaku understands APIs and approvals, he quickly suggests an alternative: a daily reminder SMS with a one step approval prompt. The engineer estimates it at a third of the original effort.

Technical literacy did not make him an engineer. It made him a better partner to one.`,
      practice_task_md: `**Goal:** explain a real product's technical parts in plain words.

1. Pick a service you use, such as paying for electricity with MoMo or ordering food in an app.
2. Draw a simple diagram on paper with boxes for frontend, backend, database and any outside systems, like a payment provider or SMS service.
3. Draw arrows for what happens when you make one payment or order, numbering each step.
4. Write three things that could go wrong at different steps and how the product should respond.

**Done looks like:** a photographed diagram with numbered steps and three failure cases with suggested responses.`,
      quiz: {
        questions: [
          q(
            "What is an API?",
            [
              "A type of phone",
              "A set of agreed requests one system can make to another",
              "A database table",
              "A design tool",
            ],
            1,
            "APIs let systems such as your backend and a payment provider talk to each other.",
          ),
          q(
            "In a typical mobile money payment, how does the provider often tell your backend the result?",
            ["By a phone call to the engineer", "Through a callback or webhook", "By email to the customer", "It never does"],
            1,
            "Providers usually send the result to an address your backend provides.",
          ),
          q(
            "Why can a fix to a mobile app take days to reach everyone?",
            [
              "Apps go through store review and users must update",
              "Engineers work slowly",
              "Databases are offline at night",
              "USSD menus block updates",
            ],
            0,
            "Store review and user updates slow down app releases.",
          ),
          q(
            "What is a staging environment?",
            [
              "The real system customers use",
              "A separate copy of the system used for testing",
              "A marketing event",
              "A kind of bug",
            ],
            1,
            "Staging is for testing before changes reach production.",
          ),
          q(
            "What alternative did Issahaku suggest when true auto deduction was not possible?",
            [
              "Cancel the feature",
              "Use card payments only",
              "A daily reminder SMS with a one step approval prompt",
              "Ask customers to visit a branch",
            ],
            2,
            "Understanding the integration's limits helped him find a cheaper solution.",
          ),
        ],
        pass_threshold: 80,
      },
    },
    "working-with-design": {
      explanation_md: `Designers decide how a product looks and, more importantly, how it works for the person using it. Product people work with them daily. Adverts for associate product roles mention tools like Figma and user experience skills, and in smaller Ghanaian companies the product person may sketch early screens before a designer joins. You need enough design understanding to collaborate well and give useful feedback.

## Key design ideas

* **User flow.** The steps a user takes to complete a task, from start to finish. For example: open app, choose Savings, set amount, confirm with PIN, see receipt.
* **Wireframe.** A rough sketch of a screen showing layout and content, without colours or polish. Paper is fine.
* **Prototype.** A clickable mock up that feels like the product, used for testing before engineers build. Figma's free plan can make these.
* **Usability test.** Watching real users try to complete a task with a prototype or product, without helping them, to see where they struggle.

## Giving useful feedback

Weak feedback is about taste: "I don't like the blue." Useful feedback is about whether users can succeed:

* Tie comments to the goal: "Traders need to see their savings balance first. Right now it is below the fold."
* Describe problems, not solutions: "Users might not know what 'lock period' means" is better than "Change it to a dropdown." Let the designer solve it.
* Use evidence from research or tests where you can.
* Mention what works well, not just what does not.

## Simple usability principles

* Make the current status visible: show that a payment is pending, succeeded or failed.
* Use words users know.
* Prevent errors: confirm before taking money.
* Keep it easy on small, cheap phones and slow connections: fewer steps, light screens, large touch targets.

## Running a quick usability test

1. Pick one task, like "save 5 cedis".
2. Find three to five people who match your users.
3. Ask them to think aloud while they try. Do not help or explain.
4. Note where they hesitate, make mistakes or give up.

Even a few tests reveal the biggest problems.

## Worked example: the farmers' market app

Ayishetu, the designer, shares a prototype of the farmer listing screen. Wumpini, the product analyst, tests it with four farmers in Savelugu. Three of them stop at a field labelled "SKU". None knows the word. Two struggle to type prices with the decimal point.

Wumpini reports back: "Farmers did not understand 'SKU', and decimals caused errors. The goal is to list produce in under a minute." Ayishetu replaces SKU with a picture menu of common crops and changes prices to whole cedis with preset quantities like "one basket". The next test, all four farmers list produce quickly.

Wumpini described problems with evidence. Ayishetu designed the fix. That is good collaboration.`,
      practice_task_md: `**Goal:** sketch a flow and test it with real people.

1. Choose one task in a product idea from your journal, such as booking a service or saving money.
2. Draw the user flow as numbered steps, then sketch a paper wireframe for each screen.
3. Show the paper screens to three people one at a time. Ask them to "tap" with a finger and think aloud. Do not help.
4. Note every hesitation or mistake.
5. Write three feedback points about your own design, tied to the user's goal, as if giving them to a designer.

**Done looks like:** photos of your flow and wireframes, test notes from three people, and three goal based feedback points.`,
      quiz: {
        questions: [
          q(
            "What is a wireframe?",
            [
              "The final, polished design",
              "A rough sketch of a screen showing layout and content",
              "A type of cable",
              "A database diagram",
            ],
            1,
            "Wireframes are rough layouts without colour or polish.",
          ),
          q(
            "Which is the most useful design feedback?",
            [
              "I don't like the blue",
              "Make it look modern",
              "Traders need to see their balance first, but it is below the fold",
              "Copy a competitor",
            ],
            2,
            "Useful feedback ties the problem to the user's goal.",
          ),
          q(
            "During a usability test, what should you do when a user struggles?",
            ["Explain how it works", "Take over the phone", "Note it and avoid helping", "End the test immediately"],
            2,
            "Not helping lets you see where real users struggle.",
          ),
          q(
            "What problems did Wumpini find in testing the farmer listing screen?",
            [
              "Farmers wanted more colours",
              "Farmers did not understand SKU and struggled with decimal prices",
              "The app was too fast",
              "Farmers had no crops",
            ],
            1,
            "The unfamiliar word and decimals caused errors.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "acceptance-testing": {
      explanation_md: `When engineers say a feature is finished, someone must check it really does what users need before real people depend on it. This is acceptance testing, often called user acceptance testing or UAT. Adverts for business analysts in Ghanaian banks, telecoms and manufacturers, and for associate product roles, list testing before go live and release readiness as duties. Mistakes caught here are far cheaper than mistakes customers find.

## What acceptance testing checks

Engineers test that their code works. Acceptance testing asks a different question: **does this meet the requirements and work for real users in real conditions?** You test against the acceptance criteria you wrote earlier.

## Writing test cases

A test case is a small script:

* **Steps:** exactly what to do.
* **Test data:** which account, amount or phone to use.
* **Expected result:** what should happen, taken from the acceptance criteria.
* **Actual result** and **pass or fail**, filled in while testing.

A Google Sheet with these columns works well. Always include unhappy paths: wrong PIN, empty wallet, no network, very long names.

## Testing in real conditions

Test in the staging environment first, using test accounts. Then think about how users really live:

* Low cost Android phones and basic phones for USSD.
* Slow or dropping networks.
* Different languages or reading levels.
* Shared phones.

## Reporting bugs clearly

A good bug report lets an engineer reproduce the problem quickly:

* A short title: "Savings receipt SMS not sent when balance is exactly equal to amount".
* Steps to reproduce.
* Expected result and actual result.
* Phone model, app version and network, plus a screenshot.
* How serious it is: does it block users or just look untidy?

## Planning the release

Releasing safely matters as much as testing. Consider:

* **A small first release.** Launch to a pilot group before everyone.
* **Communication.** Tell support and operations staff what is changing and give them answers to likely questions.
* **Watching after launch.** Check errors, support messages and key numbers in the first days.
* **A way back.** Know how to switch the feature off if something goes badly wrong.

## Worked example: the NGO beneficiary tracker

Before the new offline registration goes live, Mariama writes 14 test cases. One says: register a household with no network, then reconnect; expected result, the record appears once on the district dashboard. During testing she finds it appears twice when the phone reconnects slowly. She reports it with clear steps and a screenshot, and the engineer fixes it in a day.

Mariama then recommends a pilot with five field officers in one district for two weeks, briefs the support lead, and sets up a daily check of duplicate records. Only after a clean pilot does the tool go to all districts.`,
      practice_task_md: `**Goal:** write and run acceptance tests on a real product.

1. Choose a free app or USSD service you can use safely, or a classmate's project.
2. Write one user story and three acceptance criteria for a feature it already has.
3. In Google Sheets, write at least six test cases with steps, test data, expected result, actual result and pass or fail. Include at least two unhappy paths.
4. Run the tests and record results.
5. Write one clear bug report for anything that failed, or for the most confusing behaviour you found.

**Done looks like:** a test sheet with six or more cases and results, plus one complete bug report.`,
      quiz: {
        questions: [
          q(
            "What question does acceptance testing answer?",
            [
              "Is the code written in the newest language?",
              "Does this meet the requirements and work for real users in real conditions?",
              "How much did the feature cost?",
              "Which engineer wrote it?",
            ],
            1,
            "Acceptance testing checks the build against requirements and real use.",
          ),
          q(
            "Where should the expected result in a test case come from?",
            ["The engineer's opinion", "The acceptance criteria", "A competitor's app", "The release date"],
            1,
            "Test cases check against the acceptance criteria written earlier.",
          ),
          q(
            "Which detail makes a bug report useful to an engineer?",
            [
              "Steps to reproduce, expected and actual results",
              "Only the word broken",
              "Your opinion of the design",
              "The tester's job title",
            ],
            0,
            "Clear steps and results let engineers reproduce and fix the problem.",
          ),
          q(
            "Why release to a small pilot group first?",
            [
              "To find problems before they affect everyone",
              "To keep the feature secret",
              "Because pilots skip testing",
              "To avoid telling support staff",
            ],
            0,
            "A small first release limits the damage if something goes wrong.",
          ),
          q(
            "What bug did Mariama find in the beneficiary tracker?",
            [
              "Records disappeared",
              "Records appeared twice when the phone reconnected slowly",
              "The app would not open",
              "Names were translated wrongly",
            ],
            1,
            "Her unhappy path test revealed duplicate records after slow reconnection.",
          ),
        ],
        pass_threshold: 80,
      },
    },
    "live-product": {
      explanation_md: `Launch day is not the end of product work. It is the start of a new kind of work: helping real people use the product, fixing what breaks, and learning what to improve. Someone has to onboard new users, answer their problems, keep help guides current and tell the builders what is going wrong. In many companies this is called product operations, customer success or product support.

This matters for your career. In the adverts researched for this roadmap, product operations, support and implementation roles were among the most realistic doors into product work for people early in their careers. They teach you how users really behave, which is exactly what product managers need to know.

## What running a live product involves

* **Onboarding.** Helping new users or client organisations get set up and successful in their first days.
* **Training.** Teaching users, agents or field staff how to use the product, often in person or over WhatsApp.
* **Documentation.** Writing help guides, FAQs and standard operating procedures (SOPs) so answers are consistent.
* **Support and escalation.** Solving common problems directly, and passing real bugs to engineers with clear reports.
* **Feedback.** Collecting what users say, spotting patterns and sharing them with the product team.

## Why it builds product skill

When you answer the same question ten times, you learn where the product confuses people. When a client struggles to set up, you learn which requirements were missed. People who do this work well often become the person the product manager trusts most, and later step into product roles themselves.

## What this section covers

* **Product operations.** Onboarding, training, help guides, SOPs and escalating issues to engineers.
* **Customer feedback loops.** Collecting feedback from many channels, finding patterns, sharing them and telling customers what changed.

## Worked example: the farmers' market app

After launch, Fuseini joins the farmers' market team in operations. In his first month he:

* Trains leaders of six farmer groups in Karaga and Savelugu, using a one page picture guide he wrote.
* Answers buyer questions on the WhatsApp Business line, saving common replies as quick replies.
* Notices that many farmers ask the same question: "Why has my money not arrived?" He finds that payouts happen weekly, but nobody told farmers. He suggests an SMS explaining the payout day.
* Escalates a bug where orders over 1,000 cedis fail, with clear steps for the engineer.

Within weeks, payout questions drop and the product manager asks Fuseini to join planning meetings. His operations work has become product work.`,
      practice_task_md: `**Goal:** see a live product from the support side.

1. Choose a product or service you use regularly, such as a MoMo wallet, a school portal or a church giving platform.
2. Find its help channels: FAQ page, WhatsApp line, social media replies or USSD help option.
3. Write down five questions or complaints users commonly raise. App store reviews and public social media replies are good sources.
4. For each, note whether the product's help clearly answers it.
5. Suggest one product change and one help guide change that would reduce the most common question.

**Done looks like:** a list of five common questions, your assessment of the help available, and two concrete suggestions.`,
      quiz: {
        questions: [
          q(
            "Which of these is part of running a live product?",
            ["Choosing the company name", "Onboarding and training users", "Hiring investors", "Designing the logo"],
            1,
            "Onboarding, training, documentation, support and feedback are all part of running a live product.",
          ),
          q(
            "What is an SOP?",
            [
              "A standard operating procedure that keeps answers and processes consistent",
              "A type of software bug",
              "A sales target",
              "A database table",
            ],
            0,
            "SOPs are written procedures so tasks are done the same way every time.",
          ),
          q(
            "Why does operations work build product skill?",
            [
              "It avoids contact with users",
              "It shows where the product confuses people and which requirements were missed",
              "It replaces the need for engineers",
              "It only involves paperwork",
            ],
            1,
            "Repeated questions and setup struggles reveal product problems.",
          ),
          q(
            "What did Fuseini discover about farmers asking where their money was?",
            [
              "The payment system was broken",
              "Payouts were weekly but nobody had told farmers",
              "Farmers had no phones",
              "Buyers were not paying",
            ],
            1,
            "He traced the repeated question to missing communication about payout timing.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "product-operations": {
      explanation_md: `Product operations keeps a product working well for the people who rely on it between releases. Adverts in Ghana and across West Africa for product operations associates, product support officers and implementation roles list duties such as onboarding clients, training users, writing documentation and procedures, resolving issues and working with engineers on fixes. These are skills you can start practising now.

## Onboarding

Onboarding is getting a new user or client organisation from "signed up" to "getting value". Good onboarding:

* Has a clear first goal, such as "make your first sale" or "register your first ten households".
* Removes setup steps that are not needed yet.
* Checks in after a few days to catch people who got stuck.

For business clients, onboarding may include setting up accounts, importing their data and agreeing who to call for help.

## Training

Training works best when it is practical and short. Show the task, let people try it on their own phones, then let them teach each other. Use the language people are most comfortable in. For field staff or agents, a printed one page guide with pictures and a short voice note on WhatsApp can work better than a long manual.

## Help guides and SOPs

* A **help guide** or FAQ answers user questions: "How do I withdraw my savings?"
* An **SOP** tells staff how to handle a situation consistently: "What to do when a customer reports a missing payment."

Good guides use numbered steps, screenshots, plain words and one task per page. Date them and update them whenever the product changes.

## Escalating issues

Not every problem is a bug. Before escalating, check:

1. Can you reproduce it?
2. Is it a known issue or a training gap?
3. How many users does it affect, and how badly?

Then send engineers a clear report with steps, expected and actual results, screenshots and the number of affected users. Track it until it is fixed, and tell the affected users when it is.

## Worked example: the NGO beneficiary tracker

Hawa is a product operations associate for an NGO's beneficiary tracker used by 40 field officers in the Upper East Region. When a new district joins, she:

* Sets up officer accounts and loads the community list.
* Runs a two hour training where officers register a practice household on their own phones.
* Shares a one page guide and a three minute voice note in Gurune and English.
* Writes an SOP for supervisors: how to correct a wrongly registered household.

A week later, three officers report the app "losing" records. Hawa reproduces it: records are only saved after tapping Submit, and officers were closing the app at the summary screen. It is a training and design gap, not a crash. She updates the guide, tells the officers, and suggests to the product manager that the app should save drafts automatically. That suggestion goes into the next sprint.`,
      practice_task_md: `**Goal:** write a help guide and an SOP for a real task.

1. Choose a task people around you find confusing, such as resetting a MoMo PIN, registering for an exam portal or joining a church online giving platform.
2. Write a one page help guide for users with numbered steps and at least two screenshots or drawings.
3. Write a short SOP for someone helping others with the task: common problems and what to do for each.
4. Test the guide by asking someone who has never done the task to follow it. Note where they get stuck and improve it.

**Done looks like:** a tested one page help guide and a short SOP, with notes on what you changed after testing.`,
      quiz: {
        questions: [
          q(
            "What is the aim of onboarding?",
            [
              "To collect as much data as possible",
              "To get a new user from signed up to getting value",
              "To sell more features",
              "To test the code",
            ],
            1,
            "Onboarding helps new users reach their first real benefit.",
          ),
          q(
            "What is the difference between a help guide and an SOP?",
            [
              "A help guide answers user questions; an SOP tells staff how to handle situations consistently",
              "They are the same thing",
              "An SOP is for customers; a help guide is for engineers",
              "Help guides are only videos",
            ],
            0,
            "Help guides are for users; SOPs are for staff.",
          ),
          q(
            "What should you check before escalating an issue to engineers?",
            [
              "Whether you can reproduce it and how many users it affects",
              "Whether the engineer is busy",
              "The weather",
              "Whether a competitor has the same bug",
            ],
            0,
            "Reproducing and sizing the issue makes escalation useful.",
          ),
          q(
            "What was really causing the 'lost' records in Hawa's example?",
            [
              "The server crashed",
              "Officers closed the app before tapping Submit",
              "The network was down for a week",
              "Records were deleted on purpose",
            ],
            1,
            "It was a training and design gap, not a crash.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "customer-feedback": {
      explanation_md: `Customers tell you what is wrong with your product every day, through support chats, calls, app store reviews, social media comments and agents in the field. Product teams that listen systematically improve faster. Adverts for product operations and analyst roles mention feedback loops, first level support and resolving support tickets. Turning scattered complaints into clear evidence is a valuable skill.

## Collect from many channels

Feedback arrives in different places:

* WhatsApp and phone support.
* App store and Google Play reviews.
* Social media comments and messages.
* Agents, field officers or sales staff who hear complaints in person.
* Short surveys after a key action, such as one question by SMS.

No single channel tells the full story. People who write reviews are often the angriest; people who call may be the least confident with technology.

## Record it consistently

A simple Google Sheet works. For each piece of feedback, record the date, channel, user type, a short summary in your own words, a category (for example payments, sign up, confusing wording), and how serious it is. Consistent categories let you count.

## Find patterns

Once a week, sort and count by category. Ask:

* Which problems come up most often?
* Which ones block people completely?
* Is anything new or growing?

A single loud complaint is worth noting. Twenty quiet ones about the same thing are worth acting on.

## Share with the team

Send a short weekly summary to the product team: the top three themes, a count for each, one or two real quotes (with personal details removed) and any suggestion. Quotes make problems feel real to engineers who never meet customers.

## Close the loop

When something is fixed, tell the people who reported it. A simple message such as "You told us payouts were confusing, so we now send an SMS on payout day. Thank you" builds trust and encourages more feedback.

Always handle personal data carefully. Do not share phone numbers or names beyond those who need them.

## Worked example: the MoMo savings feature

Amina reviews a month of feedback for the savings feature. She records 120 items in a sheet. Sorting by category shows:

* 41 about "Where is my money?" after the lock period ends.
* 18 about the evening deduction failing when balance is low.
* 9 asking for group savings.

She discovers that matured savings return to the wallet, but no SMS says so. Her weekly summary leads the team to add a maturity SMS. A month later, "Where is my money?" messages fall sharply, and Amina sends a thank you message to the customers who raised it.`,
      practice_task_md: `**Goal:** turn public feedback into a weekly summary.

1. Pick a Ghanaian app with public reviews on Google Play.
2. Read 30 recent reviews. In Google Sheets, record date, a short summary in your own words, category and seriousness for each. Do not copy names.
3. Sort and count by category.
4. Write a weekly style summary under 150 words: top three themes with counts, one paraphrased example each, and one suggestion.

**Done looks like:** a feedback sheet with 30 rows, category counts, and a short summary ready to share with a team.`,
      quiz: {
        questions: [
          q(
            "Why collect feedback from many channels?",
            [
              "No single channel tells the full story",
              "It makes the sheet longer",
              "Reviews are always accurate",
              "Only phone calls matter",
            ],
            0,
            "Different channels reach different kinds of users.",
          ),
          q(
            "Why use consistent categories when recording feedback?",
            ["So you can count and compare themes", "To hide complaints", "To impress managers", "Categories are not useful"],
            0,
            "Consistent categories make patterns countable.",
          ),
          q(
            "According to the lesson, which deserves action?",
            [
              "One loud complaint",
              "Twenty quiet complaints about the same thing",
              "Only feedback from managers",
              "Only positive reviews",
            ],
            1,
            "Repeated issues show a real pattern.",
          ),
          q(
            "What does closing the loop mean?",
            [
              "Deleting old feedback",
              "Telling people who reported a problem what you changed",
              "Blocking angry users",
              "Ending the support line",
            ],
            1,
            "Closing the loop builds trust and encourages more feedback.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    measuring: {
      explanation_md: `After launch, how do you know whether a product is working? Opinions differ, and the loudest voice is not always right. Data gives you a shared, honest view. Adverts for product analysts, business analysts and data roles in Ghana ask for data analysis, KPI tracking, dashboards and reporting, and some ask for spreadsheets at an advanced level and SQL. Even product managers who do not run the numbers themselves must read them confidently.

## Numbers and stories together

Data tells you **what** is happening: how many people signed up, how many saved twice, where they dropped off. Interviews and feedback tell you **why**. Good product people use both. If the numbers say farmers stop after registering, conversations tell you it is because the price field is confusing.

## Honest reading

Numbers can mislead if you are not careful:

* **Vanity numbers** look good but do not show value. Downloads and sign ups can rise while almost nobody uses the product.
* **Small numbers** jump around. If 4 out of 10 users did something last week and 6 this week, that may be chance.
* **Correlation is not cause.** Savings rose in December, but so do incomes before Christmas. Your new feature may not be the reason.
* **Missing data** hides problems. If only smartphone users are tracked, USSD users disappear from your charts.

## What this section covers

* **Spreadsheets and SQL basics.** How to sort, filter, count and chart product data, and the basic queries analyst roles mention.
* **Product metrics.** Activation, retention and revenue, and choosing one main metric.
* **Running experiments.** Testing a change against a control and deciding fairly, which is optional but useful.

## Free tools to learn with

Google Sheets is free, works on a phone, and is enough for most beginner analysis. For SQL, free interactive lessons let you practise in a browser without installing anything. Looker Studio, a free Google tool, can turn a sheet into a simple dashboard.

## Worked example: the NGO beneficiary tracker

Issahaku is asked whether the new tracker is working. The district director says, "Officers love it." Issahaku looks at the data. In one month, 38 of 40 officers logged in, which looks great. But only 22 registered more than five households. Looking closer, the 18 who registered few households are mostly in areas with weak network.

He calls three of them. They explain that the sync often fails, so they go back to paper. The number showed **what**; the calls showed **why**. Issahaku recommends improving offline sync before adding new features, and he defines "active officer" as one who registers at least five households a week, a measure that reflects real use rather than logins.`,
      practice_task_md: `**Goal:** separate vanity numbers from meaningful ones.

1. Pick a product or community activity you know, such as a WhatsApp group, a church event, or your manual MVP.
2. List five numbers you could track about it.
3. Mark each as vanity (looks good but shows little value) or meaningful (shows people getting real value). Explain each in one sentence.
4. For your most meaningful number, write one question you would ask users to understand why it changes.

**Done looks like:** five numbers classified with reasons, and one follow up question for users.`,
      quiz: {
        questions: [
          q(
            "What does data tell you, and what do interviews tell you?",
            [
              "Data tells you why; interviews tell you what",
              "Data tells you what is happening; interviews tell you why",
              "Both tell you only what",
              "Neither is useful",
            ],
            1,
            "Numbers show what happens; conversations explain why.",
          ),
          q(
            "What is a vanity number?",
            [
              "A number that looks good but does not show real value",
              "A number about design",
              "A secret number",
              "A number that is always accurate",
            ],
            0,
            "Downloads and sign ups can rise while few people use the product.",
          ),
          q(
            "Why might savings rising in December not prove a new feature worked?",
            [
              "Data is always wrong in December",
              "Incomes also rise before Christmas, so correlation is not cause",
              "Nobody saves in December",
              "Features never affect savings",
            ],
            1,
            "Another factor could explain the rise.",
          ),
          q(
            "How did Issahaku define an active officer?",
            [
              "Anyone who logged in once",
              "Someone who registers at least five households a week",
              "Anyone with a smartphone",
              "The director's favourite officers",
            ],
            1,
            "He chose a measure that reflects real use rather than logins.",
          ),
        ],
        pass_threshold: 75,
      },
    },
    "spreadsheets-and-sql": {
      explanation_md: `Product and business analyst adverts in Ghana often ask for strong spreadsheet skills, and analyst roles at fintechs and PAYGO companies add SQL and dashboard tools. Spreadsheets let you answer most beginner product questions. SQL lets you ask the same questions directly of a company's database, which is how analysts work once data grows large.

## Spreadsheet skills that matter

In Google Sheets (free, and it works on a phone), learn to:

* **Sort and filter** rows, for example to see only orders from Tamale.
* **Count and sum with conditions** using functions like COUNTIF and SUMIF.
* **Summarise with a pivot table**, such as orders per week per town.
* **Clean data:** remove duplicates, fix inconsistent spellings ("Tamale", "tamale", "Tamale "), and split or join columns.
* **Chart** a summary so others understand it at a glance.

Example formulas, if orders are in rows with the town in column B and value in column C:

* Count orders from Tamale: =COUNTIF(B:B, "Tamale")
* Total value from Tamale: =SUMIF(B:B, "Tamale", C:C)

## SQL basics

SQL (Structured Query Language) asks questions of database tables. Most beginner questions use just a few parts:

\`\`\`sql
SELECT town, COUNT(*) AS orders, SUM(value) AS total
FROM orders
WHERE created_at >= '2026-09-01'
GROUP BY town
ORDER BY total DESC;
\`\`\`

Reading it in plain English: from the orders table, take orders since 1 September, group them by town, count them and add their values, and show the biggest towns first.

* **SELECT** chooses columns or calculations.
* **FROM** names the table.
* **WHERE** filters rows.
* **GROUP BY** makes groups for counting or summing.
* **ORDER BY** sorts the result.

Later you will learn **JOIN**, which combines tables, such as orders with customers.

## Worked example: the farmers' market app

Mariama is asked: "Which farmer groups bring repeat buyers?" She exports three months of orders to Google Sheets. First she cleans the data: town names have five spellings, and some test orders by staff need removing. Then she builds a pivot table of buyers per farmer group and counts how many bought more than once.

Two groups near Savelugu have far more repeat buyers. She makes a simple bar chart and shares it with one line: "Groups that confirm orders the day before keep more buyers." When the team later moves data into a proper database, she writes the same analysis as a short SQL query, so it can be rerun every week in seconds.

Start small with data you understand. The habit of asking a clear question first, then cleaning, then counting, matters more than any one tool.`,
      practice_task_md: `**Goal:** answer a real question with a spreadsheet, then try SQL.

1. In Google Sheets, create or collect a small dataset of at least 30 rows, such as your feedback sheet, your manual MVP orders, or a made up shop sales list with date, item, town and amount.
2. Clean it: fix spellings, remove duplicates.
3. Use COUNTIF or SUMIF and one pivot table to answer one clear question, such as "Which item sells most per week?"
4. Make one chart and write a one sentence finding.
5. Complete the first few free lessons on SQLBolt (sqlbolt.com) in your browser.

**Done looks like:** a cleaned sheet with a pivot table, a chart and a one sentence finding, plus a screenshot showing SQLBolt lessons completed.`,
      quiz: {
        questions: [
          q(
            "Which spreadsheet function counts rows that match a condition?",
            ["SUM", "COUNTIF", "AVERAGE", "TODAY"],
            1,
            "COUNTIF counts rows that meet a condition, such as town equals Tamale.",
          ),
          q(
            "What does the WHERE part of a SQL query do?",
            ["Sorts the result", "Names the table", "Filters which rows are included", "Makes groups"],
            2,
            "WHERE filters rows, for example orders since a date.",
          ),
          q(
            "What does GROUP BY town do in the example query?",
            [
              "Deletes towns",
              "Makes a group for each town so orders can be counted and summed per town",
              "Sorts towns alphabetically only",
              "Joins two tables",
            ],
            1,
            "GROUP BY creates groups for counting or summing.",
          ),
          q(
            "What did Mariama do before analysing the orders?",
            [
              "Cleaned the data, fixing town spellings and removing test orders",
              "Deleted half the data",
              "Built a new app",
              "Asked buyers for passwords",
            ],
            0,
            "Cleaning comes before counting.",
          ),
          q(
            "According to the lesson, what habit matters more than any one tool?",
            [
              "Using the most expensive software",
              "Asking a clear question first, then cleaning, then counting",
              "Making charts colourful",
              "Writing very long queries",
            ],
            1,
            "Clear questions and clean data lead to useful answers.",
          ),
        ],
        pass_threshold: 80,
      },
    },
    // NEXT
  },
};

export default content;
