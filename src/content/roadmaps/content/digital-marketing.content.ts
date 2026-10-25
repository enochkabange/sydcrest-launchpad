import type { TrackContent } from "./types";

/**
 * Original lesson content for the Digital Marketer roadmap (issue #84).
 * Research and sources: src/content/research/digital-marketing.md.
 */
const content: TrackContent = {
  roadmap: "digital-marketer",
  nodes: {
    foundations: {
      explanation_md: `Every business in Ghana, from a shea butter seller in Tamale to a fintech in Accra, needs people to know it exists, trust it and pay for what it offers. Digital marketing is the work of making that happen using phones and the internet. Employers who hire junior marketers rarely ask first which apps you know. They ask whether you understand customers and can get results for the business.

## Marketing starts with people

Marketing is not the same as posting. Posting is one activity. Marketing is the thinking behind it: who are we trying to reach, what do they need, what should they believe about us, and what do we want them to do next? If you skip that thinking, you can post every day and sell nothing.

A simple way to hold it in your head is four questions:

* **Who?** The specific people the business wants, such as mothers in Tamale who buy shea butter for their children's skin.
* **What problem?** Dry skin in the harmattan, and worry about fake products in the market.
* **Why us?** Pure, locally made butter from a women's group that the seller knows personally.
* **What next?** Send a WhatsApp message to order and pay with mobile money.

## What this section covers

In this section you will learn three foundations that every later lesson builds on.

* **How customers find and buy.** The steps a person moves through, from first hearing about a business to paying and coming back.
* **Knowing your audience and competitors.** How to describe the people you are trying to reach and learn from what similar businesses already do.
* **The main channels.** The difference between messaging, social media, search, email and paid ads, and how to choose a few channels that suit a small budget.

## A small example

Hawa sells shea butter from her home in Tamale. Her nephew Fuseini offers to "do her marketing" and starts posting product photos on Facebook every day. After two weeks, a few people like the posts but nobody orders.

Fuseini stops and asks the four questions. He realises most of Hawa's buyers are women who already know her through church and the market, and they talk on WhatsApp, not Facebook. He changes plan: a clear WhatsApp Status each week showing fresh butter, the price in cedis, and how to pay. Within days, regular customers start sharing her Status with friends.

Nothing about the tools changed. What changed was the thinking. That is what this section teaches, and it is what employers mean when they ask whether you "understand marketing".`,
      practice_task_md: `**Goal:** Practise the four marketing questions on a real business near you.

**Steps:**
1. Pick one small business you know well, such as a provisions shop, a chop bar, a tailor or a church event.
2. In a notes app or Google Docs, answer the four questions: Who? What problem? Why us? What next?
3. Write one sentence for each answer, using plain words the owner would understand.
4. Show your answers to the owner and ask one question: "Is this right about your customers?" Note what they correct.

**Done looks like:** A short note with four clear answers, plus one correction from the owner. Keep it; you will build on it in later lessons.`,
      quiz: {
        questions: [
          {
            prompt: "According to this lesson, what is the difference between marketing and posting?",
            options: [
              "They mean exactly the same thing",
              "Posting is one activity, while marketing is the thinking about who to reach and what they should do next",
              "Marketing only happens on paid ads, while posting is free",
              "Posting is for big companies and marketing is for small shops",
            ],
            answer_index: 1,
            explanation: "The lesson explains that posting is one activity and marketing is the thinking behind it.",
          },
          {
            prompt: "Which of these is an answer to the question \"What next?\"",
            options: [
              "Mothers in Tamale who buy shea butter",
              "Dry skin during the harmattan",
              "Send a WhatsApp message to order and pay with mobile money",
              "Butter made by a women's group the seller knows",
            ],
            answer_index: 2,
            explanation: "\"What next?\" is the action you want the customer to take, such as ordering on WhatsApp.",
          },
          {
            prompt: "Why did Fuseini's daily Facebook posts for Hawa not lead to orders?",
            options: [
              "Her shea butter was too expensive",
              "Facebook does not allow businesses to post photos",
              "He posted at the wrong time of day",
              "Most of her buyers talked on WhatsApp, so he was using the wrong channel for her customers",
            ],
            answer_index: 3,
            explanation: "When he asked the four questions, he found her customers were on WhatsApp, not Facebook.",
          },
          {
            prompt: "What do employers mean when they ask whether a junior marketer understands marketing?",
            options: [
              "Whether you can think about customers and get results for the business",
              "Whether you own an expensive phone",
              "Whether you have used every social media app",
              "Whether you can post more often than competitors",
            ],
            answer_index: 0,
            explanation: "The lesson says employers care whether you understand customers and can get results.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "customer-journey": {
      explanation_md: `When a business owner says "I need more customers", they usually have a specific problem hiding inside that sentence. Maybe nobody has heard of them. Maybe people hear about them but do not trust them. Maybe people want to buy but the payment is confusing. A marketer who can find where customers are dropping off is far more useful than one who just posts more. Junior job adverts in Ghana often mention lead generation and conversion; both are parts of this journey.

## The five stages

A simple customer journey has five stages:

* **Aware.** The person learns the business exists, for example from a friend's WhatsApp Status or a TikTok video.
* **Interested.** They want to know more. They check the page, look at photos and prices, or ask a question.
* **Decide.** They compare with other options and decide to buy. Trust matters most here: reviews, clear prices, a real phone number.
* **Buy.** They pay. In Ghana this is often a mobile money payment after a chat, or cash on delivery.
* **Return and recommend.** A happy customer buys again and tells others, which starts the journey for someone new.

People do not always move neatly from one stage to the next. Some see a post and buy within minutes. Others watch a business for months before their first order. The stages are a thinking tool, not a strict rule.

## Finding the leak

Think of the journey like a pipe. If water leaks out at one point, pouring more in at the top does not help much. The same is true for marketing. If lots of people message a business but few pay, more posts will not fix it. You need to find out why buyers stop at the decide or buy stage.

## A worked example

Abdul-Rahman runs a phone accessories kiosk in Tamale and asks you why sales are slow. You go through the journey with him:

* **Aware:** his posts get views, and people say they have seen his kiosk. Fine.
* **Interested:** many people send "How much?" on WhatsApp. Fine.
* **Decide:** he replies hours later, sometimes the next day. Many never reply back. Leak found.
* **Buy:** customers who do order pay by MoMo without problems.
* **Return:** he never follows up after a sale.

Your advice is not "post more". It is: set up quick replies with prices, answer within the hour during the day, and send a short thank you message after each sale asking the buyer to share his number with a friend. Those small changes fix the two weakest stages.

When you take on any marketing job, sketch the journey first. It tells you where to spend your effort.`,
      practice_task_md: `**Goal:** Map the customer journey for one real business and find its biggest leak.

**Steps:**
1. Choose a business you can observe or ask about, such as a market trader, a salon or a food vendor who sells on WhatsApp.
2. On paper or in Google Docs, write the five stages: Aware, Interested, Decide, Buy, Return and recommend.
3. Under each stage, write how a customer experiences it today. Ask the owner or a customer if you are not sure.
4. Mark the stage where most people seem to drop off.
5. Write two practical changes that would fix that stage without spending money.

**Done looks like:** A one page journey map with the leak clearly marked and two realistic suggestions you could explain to the owner in a few minutes.`,
      quiz: {
        questions: [
          {
            prompt: "Which stage of the customer journey does trust matter most in, according to the lesson?",
            options: ["Aware", "Decide", "Return and recommend", "Interested"],
            answer_index: 1,
            explanation: "The lesson says trust matters most at the decide stage, where reviews, clear prices and a real number help.",
          },
          {
            prompt: "Many people message a business asking for prices, but few of them pay. What does the lesson suggest?",
            options: [
              "Post more often to reach more people",
              "Lower the price immediately",
              "Find out why buyers stop at the decide or buy stage",
              "Close the WhatsApp account and use only Facebook",
            ],
            answer_index: 2,
            explanation: "Pouring more people in at the top does not fix a leak lower down the journey.",
          },
          {
            prompt: "What was the main leak in Abdul-Rahman's journey?",
            options: [
              "Nobody had heard of his kiosk",
              "Customers could not pay with MoMo",
              "His prices were too high",
              "He replied to price questions very late",
            ],
            answer_index: 3,
            explanation: "Slow replies at the decide stage meant many interested buyers never came back.",
          },
          {
            prompt: "How should you treat the five stages?",
            options: [
              "As a thinking tool, since people do not always move through them neatly",
              "As a strict rule every customer follows in order",
              "As something only large companies need",
              "As a replacement for talking to the business owner",
            ],
            answer_index: 0,
            explanation: "The lesson says the stages are a thinking tool, not a strict rule.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "know-your-audience": {
      explanation_md: `A message that works for students at a Tamale university will not land the same way with market women in Bolgatanga or civil servants in Wa. Job adverts for junior marketers in Ghana regularly ask for market research and competitor monitoring. Both come down to the same skill: finding out who you are talking to and what else they are seeing.

## Describe the audience

Start by writing a short description of the people a business wants to reach. Cover:

* **Who they are.** Age range, where they live, what they do for a living.
* **What they need.** The problem the business solves for them.
* **What worries them.** Price, quality, fake products, delivery, trust.
* **Language.** English, Dagbani, Twi, Hausa, Pidgin or a mix. A short line in Dagbani can make people in Tamale feel the post is truly for them.
* **Apps and habits.** WhatsApp, Facebook, TikTok, radio, church announcements. When are they online? Many people buy data in small bundles, so they skip heavy videos.

Some marketers turn this into a "persona": a made up person who represents the typical customer, with a name and a short story. That helps you write as if you are talking to one real person.

## Learn from competitors

Next, look at two or three similar businesses. You are not copying them. You are learning what customers in that market already see. Note:

* Which channels they use, and which seem active.
* What prices they show, and whether they show prices at all.
* What customers praise or complain about in comments and reviews.
* What nobody is doing well. That gap is your opportunity.

## A worked example

Mariama's group in Bolgatanga weaves baskets and wants to sell more. You write a short audience description with them and end up with two groups:

* **Local buyers** who want strong market baskets at a fair price. They speak Gurune and English, use WhatsApp and buy in person.
* **Buyers in Accra and abroad** who want colourful decorative baskets as gifts. They use Instagram and expect clear photos, sizes and delivery details.

Then you check three other basket sellers online. Most post beautiful photos but never mention sizes or delivery costs, and comments are full of people asking. That is the gap: Mariama's group can win trust simply by answering those questions in every post.

Writing this down takes an hour. It saves weeks of posting the wrong thing to the wrong people.`,
      practice_task_md: `**Goal:** Write an audience description and a quick competitor check for one local business.

**Steps:**
1. Pick a business, such as a basket weaving group, a church event or a phone repair shop.
2. Write a short audience description covering who they are, what they need, what worries them, language, and apps and habits.
3. Find two or three similar businesses on WhatsApp, Facebook, Instagram or TikTok. Spend no more than 20 minutes looking, to save data.
4. For each competitor, note their channels, whether they show prices, and one common customer question or complaint.
5. Write one sentence describing a gap your business could fill.

**Done looks like:** One page with the audience description, a small table of competitors, and a clear gap statement.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest considering the audience's language?",
            options: [
              "Because posts must always be written in English",
              "Because a short line in a local language can make people feel the post is for them",
              "Because local languages are not allowed on social media",
              "Because language does not affect how people respond",
            ],
            answer_index: 1,
            explanation: "The lesson gives the example of a line in Dagbani making people in Tamale feel included.",
          },
          {
            prompt: "What is a persona?",
            options: [
              "A real customer's private contact details",
              "A paid advert aimed at one person",
              "A made up person who represents the typical customer",
              "A competitor's social media page",
            ],
            answer_index: 2,
            explanation: "A persona is an invented, representative customer that helps you write for one person.",
          },
          {
            prompt: "What is the main purpose of looking at competitors?",
            options: [
              "To copy their posts word for word",
              "To leave negative comments on their pages",
              "To always charge a lower price than them",
              "To learn what customers already see and spot what nobody is doing well",
            ],
            answer_index: 3,
            explanation: "The lesson says you are not copying; you are learning the market and finding gaps.",
          },
          {
            prompt: "What gap did you find for Mariama's basket group?",
            options: [
              "Other sellers rarely mentioned sizes or delivery costs",
              "Other sellers had no photos at all",
              "Nobody sold baskets on WhatsApp",
              "Other sellers only posted in Gurune",
            ],
            answer_index: 0,
            explanation: "Competitors posted good photos but left out sizes and delivery details, so customers kept asking.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "channels-overview": {
      explanation_md: `A small business in Ghana cannot be everywhere. It may have a few hundred cedis a month for marketing, one phone and one person who also serves customers. Part of your value as a marketer is choosing the right two or three channels and doing them well, rather than spreading thin across every app.

## The main channels

* **Messaging (WhatsApp, Telegram).** Direct, personal and close to the sale. Status updates reach people who already have the number saved. Great for repeat customers and local trade.
* **Social media (Facebook, Instagram, TikTok, X).** Good for being discovered by new people and showing products. Each platform decides who sees a post, so reach can rise and fall.
* **Search and maps (Google Search, Google Maps).** People searching "tailor near me" or "hotel in Wa" already want something. Showing up there catches buyers at the moment they are ready.
* **Email.** A list of people who agreed to hear from you. Slower, but you own the list, and no app decides who sees your message. Useful for NGOs, schools, B2B companies and online shops.
* **Paid ads.** You pay a platform to show your message to people beyond your followers. Fast and measurable, but money is spent whether or not anyone buys.

Some people group these as **owned** channels (your WhatsApp list, email list, website), **earned** attention (shares, reviews, word of mouth) and **paid** reach (ads). A healthy plan usually mixes them.

## How to choose

Ask three questions:

* **Where are the customers already?** Use your audience description.
* **What does the business need right now?** New customers, repeat sales, or trust?
* **What can the owner keep up?** A channel that is abandoned after two weeks looks worse than no channel at all.

## A worked example

Issahaku helps his church in Tamale promote a youth conference. Members are already in a church WhatsApp group, so messaging is the first channel. To reach young people from other churches, he adds a Facebook event and short TikTok clips from last year's conference. He skips email because most members do not check it, and he skips paid ads because the budget is small and word of mouth is strong.

Three channels, each with a clear job: WhatsApp for members, Facebook for event details, TikTok for discovery. That focus is what makes the plan work.`,
      practice_task_md: `**Goal:** Choose channels for a real or realistic local campaign and justify each choice.

**Steps:**
1. Pick a goal, such as promoting a church event, a MoMo promotion at a mobile money vendor, or a new menu at a chop bar.
2. List the five channels: messaging, social media, search and maps, email, paid ads.
3. For each, write one sentence on whether it suits this goal and why.
4. Choose your top two or three channels and give each one a clear job.
5. Write one sentence on what you are deliberately not doing, and why.

**Done looks like:** A short channel plan on one page that you could explain to the business owner in two minutes.`,
      quiz: {
        questions: [
          {
            prompt: "Which channel catches people who are already looking for something, such as \"tailor near me\"?",
            options: ["Email", "Paid social ads", "Search and maps", "WhatsApp Status"],
            answer_index: 2,
            explanation: "The lesson says search and maps catch buyers at the moment they are ready.",
          },
          {
            prompt: "What is one advantage of email described in the lesson?",
            options: [
              "You own the list and no app decides who sees your message",
              "It is always the fastest way to sell",
              "It reaches people who never gave you their address",
              "It is free of any writing work",
            ],
            answer_index: 0,
            explanation: "Email is slower, but you own the list and reach is not controlled by a social app.",
          },
          {
            prompt: "Why might a marketer choose not to use a channel at all?",
            options: [
              "Because using more channels is always better",
              "Because every business must use exactly one channel",
              "Because paid ads are illegal for small businesses",
              "Because a channel that is abandoned after two weeks looks worse than none",
            ],
            answer_index: 3,
            explanation: "The lesson says to ask what the owner can keep up.",
          },
          {
            prompt: "Why did Issahaku skip email for the church conference?",
            options: [
              "Email is not allowed for churches",
              "Most members do not check email",
              "Email costs too much per message",
              "He had already used up his email list",
            ],
            answer_index: 1,
            explanation: "He skipped email because members rarely check it and they were already on WhatsApp.",
          },
        ],
        pass_threshold: 75,
      },
    },
    content: {
      explanation_md: `When Ghanaian companies hire junior marketers, the most common ask after social media management is content creation: posts, graphics, photos and short videos. Agencies, retailers, NGOs and startups all need a steady supply of it. The good news is that you can produce professional content with only a phone, daylight and free apps. What makes content good is clear thinking and care, not expensive equipment.

## What counts as content

Content is anything a business shares to inform, help or persuade people. For example:

* A caption that tells people what is on today's chop bar menu and how to order.
* A product photo of shea butter in a clean jar, shot by a window.
* A simple graphic announcing a church harvest with the date, place and a contact number.
* A 20 second video showing how a Bolgatanga basket is woven.
* A WhatsApp Status reminding customers about a MoMo discount.

## What good content does

Good content has a job. Before you make anything, decide which of these it is for:

* **Show** what the business offers, clearly enough that people understand at a glance.
* **Help** people with useful tips, such as how to store shea butter in the dry season.
* **Prove** the business is trustworthy, through behind the scenes clips or genuine customer feedback shared with permission.
* **Ask** people to act: order, call, visit, register.

A healthy mix keeps people interested. If every post is "buy now", people tune out. If no post ever asks, nobody buys.

## What this section covers

* **Writing that sells.** Short, clear words with a consistent voice and a clear next step.
* **Product photos and graphics.** Clean phone photos and simple branded designs in a free tool.
* **Short video and live selling.** Vertical videos for TikTok, Reels and Status, and selling during live streams.
* **Planning a content calendar.** Planning ahead around market days, holidays and local events.

## A small example

Amina manages content for a small cosmetics shop in Tamale. For one week she plans five pieces: a product photo with price (show), a tip on caring for skin in the harmattan (help), a short clip of a happy regular customer who agreed to be filmed (prove), a reminder about delivery days (show), and a Friday offer with a clear WhatsApp link (ask). Each one took under an hour on her phone. Together they tell a full story about the shop.`,
      practice_task_md: `**Goal:** Plan and make a small set of content pieces with clear jobs.

**Steps:**
1. Choose a business you know, such as a shea butter seller, a tailor or a church event.
2. Plan four pieces, one for each job: show, help, prove and ask.
3. For each piece, write the format (caption, photo, graphic or video) and one sentence describing it.
4. Make at least one of the four on your phone using free tools.
5. Ask someone who could be a customer which piece they would most likely respond to, and why.

**Done looks like:** A short plan of four pieces with their jobs, one finished piece saved to your phone, and a note of the feedback you got.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what makes content good?",
            options: [
              "Using the most expensive camera",
              "Posting as many times as possible each day",
              "Clear thinking and care",
              "Always using paid design software",
            ],
            answer_index: 2,
            explanation: "The lesson says good content comes from clear thinking and care, not expensive equipment.",
          },
          {
            prompt: "A post explaining how to store shea butter in the dry season has which job?",
            options: ["Help", "Ask", "Prove", "Show"],
            answer_index: 0,
            explanation: "Useful tips are content whose job is to help.",
          },
          {
            prompt: "What happens if every post says \"buy now\"?",
            options: [
              "Sales always double",
              "The platform pays the business",
              "People trust the business more",
              "People tend to tune out",
            ],
            answer_index: 3,
            explanation: "The lesson says a mix keeps people interested; constant selling makes people tune out.",
          },
          {
            prompt: "Which of Amina's pieces had the job of proving the shop is trustworthy?",
            options: [
              "The Friday offer with a WhatsApp link",
              "A short clip of a regular customer who agreed to be filmed",
              "The reminder about delivery days",
              "The product photo with a price",
            ],
            answer_index: 1,
            explanation: "Genuine customer feedback shared with permission is content that proves trust.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
