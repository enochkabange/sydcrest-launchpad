import type { TrackContent } from "./types";

/**
 * Original lesson content for the Digital Marketer roadmap (issue #84),
 * deepened with the full lesson anatomy for issue #256.
 * Research and sources: src/content/research/digital-marketing.md.
 */
const content: TrackContent = {
  roadmap: "digital-marketer",
  nodes: {
    foundations: {
      outcomes: [
        "Explain why marketing starts with people, not posts",
        "Ask the four marketing questions about a real business",
        "Describe the three foundations this section covers",
      ],
      explanation_md: `Every business in Ghana, from a shea butter seller in Tamale to a salon in Accra, needs people to know it exists, trust it and pay for what it offers. Digital marketing is the work of making that happen using phones, computers and the internet. Employers who hire junior marketers rarely start by asking which apps you know. They ask whether you understand customers and can get results for the business.

## Marketing is not the same as posting

Posting is one activity. Marketing is the thinking behind it: who are we trying to reach, what do they need, what should they believe about us, and what do we want them to do next? If you skip that thinking, you can post every day and sell nothing. If you get it right, even a few posts a week can bring steady orders.

A simple way to hold it in your head is four questions:

* **Who?** The specific people the business wants, such as mothers in Tamale who buy shea butter for their children's skin.
* **What problem?** Dry skin in the harmattan, and worry about fake or mixed products in the market.
* **Why us?** Pure, locally made butter from a women's group the seller knows personally.
* **What next?** Send a WhatsApp message to order and pay with mobile money.

Write the answers in plain words the owner would use. If you cannot answer a question, that is useful too: it tells you what to find out before you create anything.

## How to use the four questions on a new job

When a business asks you to "help with marketing", work through these steps before you touch any app:

1. **Listen first.** Ask the owner who buys most often, what they buy, and how they usually pay. Write down their words, not yours.
2. **Answer the four questions.** One or two sentences each. Keep them on a single page you can read on any screen.
3. **Check with a real customer.** Ask one or two buyers why they chose this business. Their answer to "Why us?" is often different from the owner's, and it is usually the one that sells.
4. **Pick one clear action.** Decide the single "What next?" you want people to take this month, such as sending a message or visiting the shop.
5. **Only then choose content and channels.** The rest of this roadmap shows you how.

This takes an hour or two, and it saves weeks of effort aimed at the wrong people.

## What this section covers

This section gives you three foundations that every later lesson builds on.

* **How customers find and buy.** The stages a person moves through, from first hearing about a business to paying and coming back. You will learn to spot where customers drop off.
* **Knowing your audience and competitors.** How to describe the people you want to reach, the languages they use and the apps they open, and how to learn from what similar businesses already do.
* **The main channels.** The difference between messaging, social media, search, email and paid ads, and how to choose a few channels that suit a small budget.

## Thinking like a marketer

Good marketers stay curious about people. When you walk through a market, notice which stalls are busy and why. When a post on your feed makes you want to buy something, ask yourself what it did right. When a business you like loses customers, ask where the experience went wrong.

You also need honesty. Marketing that promises what a business cannot deliver gets customers once and loses them for ever. Clear prices, true descriptions and quick replies build the trust that brings people back and makes them recommend the business to friends.

Finally, marketing is a cycle, not a single task. You plan, you try something, you look at what happened, and you adjust. Later sections teach you to measure results so that each cycle is better than the last. For now, the habit to build is simple: before you create anything, ask the four questions. That is what employers mean when they ask whether you "understand marketing".`,
      workedExample_md: `Hawa sells shea butter from her home in Tamale. Her nephew Fuseini offers to "do her marketing" and starts posting product photos on Facebook every day. After two weeks, a few people like the posts but nobody orders.

Fuseini stops and works through the steps:

1. **Listen first.** He asks Hawa who buys most. She says women from her church and the market, plus a few nurses who buy for their families.
2. **Answer the four questions.** Who: women in Tamale caring for their families' skin. What problem: harmattan dryness and fear of mixed butter. Why us: pure butter from a women's group Hawa knows. What next: order on WhatsApp and pay with MoMo.
3. **Check with a customer.** A nurse, Amina, tells him she buys because Hawa's butter never smells stale. He had never thought of that.
4. **Pick one action.** Send Hawa a WhatsApp message to order.
5. **Choose content and channel.** Her buyers talk on WhatsApp, not Facebook. He switches to a weekly WhatsApp Status showing fresh butter, the price in cedis, a line about the fresh smell, and how to pay.

Within days, regular customers start sharing her Status with friends. The tools barely changed. The thinking did.`,
      keyTerms: [
        { term: "Marketing", definition: "The thinking and work that helps the right people know, trust and buy from a business." },
        { term: "Digital marketing", definition: "Marketing done through phones, computers and the internet, such as chat apps, social media, search and email." },
        { term: "Target customer", definition: "The specific group of people a business most wants to reach." },
        { term: "Call to action", definition: "The one clear next step you ask people to take, such as sending a message to order." },
        { term: "Value", definition: "The reason a customer chooses this business over another, in the customer's own words." },
      ],
      commonMistakes: [
        "Opening an app and posting before answering who the business is for",
        "Writing the four answers in marketing jargon instead of the owner's plain words",
        "Trusting only the owner's view of why customers buy, without asking a customer",
        "Promising more than the business can deliver just to get attention",
      ],
      selfCheck: [
        "Can you explain to a friend, in two sentences, the difference between marketing and posting?",
        "For a business you know, which of the four questions would be hardest to answer, and how would you find out?",
        "Why might a customer's reason for buying be more useful than the owner's?",
      ],
      practice_task_md: `**Goal:** Practise the four marketing questions on a real business near you.

**Steps:**
1. Pick one small business you know well, such as a provisions shop, a chop bar, a tailor or a church event.
2. In a notes app or Google Docs, answer the four questions: Who? What problem? Why us? What next?
3. Write one or two sentences for each answer, using plain words the owner would understand.
4. Ask one customer why they buy there, and add their answer under "Why us?".
5. Show your page to the owner and ask: "Is this right about your customers?" Note what they correct.

**Done looks like:** A short page with four clear answers, one customer quote and one correction from the owner. Keep it; you will build on it in later lessons.`,
      quiz: {
        questions: [
          {
            prompt: "According to this lesson, what is the difference between marketing and posting?",
            options: [
              "They mean the same thing, since both are about putting content online",
              "Posting is one activity, and marketing is the thinking behind it",
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
              "Pure butter made by a women's group that the seller knows personally",
            ],
            answer_index: 2,
            explanation: "\"What next?\" is the action you want the customer to take, such as ordering on WhatsApp.",
          },
          {
            prompt: "Why does the lesson suggest asking a real customer why they chose the business?",
            options: [
              "Customers can tell you exactly how much to spend on adverts each month",
              "Customers expect to be paid for their opinion",
              "It is a legal requirement before any marketing starts",
              "Their reason is often different from the owner's and is usually the one that sells",
            ],
            answer_index: 3,
            explanation: "Step 3 says a customer's answer to \"Why us?\" often differs from the owner's and usually sells better.",
          },
          {
            prompt: "Why did Fuseini's daily Facebook posts for Hawa not lead to orders?",
            options: [
              "Her buyers mostly talked on WhatsApp, not Facebook",
              "Facebook does not allow businesses to post photos",
              "He posted at the wrong time of day",
              "Her shea butter was priced higher than the butter sold in the market",
            ],
            answer_index: 0,
            explanation: "When he worked through the questions, he found her customers were on WhatsApp, not Facebook.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "customer-journey": {
      outcomes: [
        "Describe the five stages of the customer journey",
        "Find the stage where a business loses most customers",
        "Map the journey for one real business and suggest fixes",
      ],
      explanation_md: `When a business owner says "I need more customers", there is usually a specific problem hiding inside that sentence. Maybe nobody has heard of them. Maybe people hear about them but do not trust them. Maybe people want to buy but the payment is confusing. A marketer who can find where customers drop off is far more useful than one who just posts more. Junior job adverts in Ghana often mention lead generation and conversion; both are parts of this journey.

## The five stages

A simple customer journey has five stages:

* **Aware.** The person learns the business exists, for example from a friend's WhatsApp Status, a TikTok video, a sign by the road or a Google Maps search.
* **Interested.** They want to know more. They check the page, look at photos and prices, or send a question such as "How much?".
* **Decide.** They compare with other options and decide whether to buy. Trust matters most here: reviews, clear prices, a real phone number and a quick, polite reply.
* **Buy.** They pay. In Ghana this is often a mobile money payment after a chat, a card payment online, or cash on delivery.
* **Return and recommend.** A happy customer buys again and tells others, which starts the journey for someone new.

People do not always move neatly from one stage to the next. Some see a post and buy within minutes. Others watch a business for months before their first order. The stages are a thinking tool, not a strict rule.

## Finding the leak

Think of the journey like a water pipe. If water leaks out at one point, pouring more in at the top does not help much. Marketing works the same way. If lots of people message a business but few pay, more posts will not fix it. You need to find out why buyers stop at the decide or buy stage.

Here is a simple way to find the leak:

1. **Write the five stages** down the side of a page or a spreadsheet.
2. **Describe what happens today** at each stage, from the customer's point of view. How do they hear about the business? What do they see when they look closer? How long do they wait for a reply? How do they pay?
3. **Gather small numbers where you can.** How many people viewed the Status this week? How many asked a question? How many paid? Even rough counts from a notebook help.
4. **Look for the biggest drop.** If 40 people asked about prices and 3 paid, the leak is between interested and buy.
5. **Ask why.** Talk to the owner and, if you can, to someone who asked but did not buy. Their answer often points straight at the fix.

## Common leaks and simple fixes

* **Aware:** few people know the business. Fix with a Google Business Profile, regular WhatsApp Status posts or asking happy customers to share.
* **Interested:** people look but do not ask. Show prices, sizes and photos clearly so they do not have to guess.
* **Decide:** slow or rude replies, no reviews, unclear delivery. Reply quickly, collect genuine reviews and explain delivery in one sentence.
* **Buy:** confusing payment. Send the MoMo name and number in one clear message and confirm when money arrives.
* **Return:** no follow up. Send a short thank you and let customers know when new stock arrives, only if they have agreed to hear from you.

## Online and offline together

Many Ghanaian journeys mix both worlds. A customer in Accra might see a salon on Instagram, walk past it on the way to work, ask a friend about it, and then book by phone. A farmer in Damongo might hear about a seed shop on the radio and then message them on WhatsApp. When you map a journey, include the offline steps too. They are often where trust is built.

When you take on any marketing job, sketch the journey first. It tells you where to spend your effort and stops you wasting the client's money on the wrong stage.`,
      workedExample_md: `Abdul-Rahman runs a phone accessories kiosk in Tamale and asks why sales are slow. You map his journey with him in a shared Google Sheet.

| Stage | What happens today | Rough count this week |
| --- | --- | --- |
| Aware | Posts on WhatsApp Status, kiosk on a busy road | About 120 Status views |
| Interested | People send "How much?" | 35 questions |
| Decide | He replies hours later, sometimes the next day | 6 reply back |
| Buy | Customers pay by MoMo without trouble | 5 sales |
| Return | No follow up after a sale | Unknown |

The biggest drop is clear: 35 people asked, but only 6 came back after his slow replies. You call two of the people who never replied. Both say they bought elsewhere because another seller answered first.

Your advice is not "post more". It is:

1. Set up quick replies with his most common prices.
2. Check messages every hour during the day.
3. After each sale, send a short thank you and ask the buyer to share his number with a friend.

Two weeks later he checks his notebook. More of the people who ask are buying, and two new customers say a friend sent them.`,
      keyTerms: [
        { term: "Customer journey", definition: "The stages a person goes through from first hearing about a business to buying and returning." },
        { term: "Awareness", definition: "The stage where a person first learns that a business or product exists." },
        { term: "Lead", definition: "A person who has shown interest, for example by asking a price, but has not yet bought." },
        { term: "Conversion", definition: "When a person takes the action you wanted, such as paying for an order." },
        { term: "Drop off", definition: "The point in the journey where many people stop moving forward." },
        { term: "Repeat customer", definition: "Someone who buys from the business again after their first purchase." },
      ],
      commonMistakes: [
        "Trying to reach more people when the real problem is lower down the journey",
        "Mapping only online steps and ignoring word of mouth, radio or walking past the shop",
        "Guessing the leak without counting even rough numbers at each stage",
        "Forgetting the return stage, where happy customers bring in new ones for free",
      ],
      selfCheck: [
        "Think of the last thing you bought from a small business. Which stages did you pass through, and where did you nearly stop?",
        "If a business gets many questions but few payments, which stages would you look at first, and why?",
        "Which offline steps might matter in the journey of a customer in your town?",
      ],
      practice_task_md: `**Goal:** Map the customer journey for one real business and find its biggest leak.

**Steps:**
1. Choose a business you can observe or ask about, such as a market trader, a salon or a food vendor who sells on WhatsApp.
2. In a notebook, Google Docs or Google Sheets, write the five stages: Aware, Interested, Decide, Buy, Return and recommend.
3. Under each stage, write how a customer experiences it today, including any offline steps. Ask the owner or a customer if you are not sure.
4. Add a rough count for at least two stages, such as questions received and sales made in a week.
5. Mark the stage with the biggest drop, and write two practical changes that would fix it without spending money.

**Done looks like:** A one page journey map with rough numbers, the leak clearly marked and two realistic suggestions you could explain to the owner in a few minutes.`,
      quiz: {
        questions: [
          {
            prompt: "In which stage of the customer journey does trust matter most, according to the lesson?",
            options: ["Aware", "Decide", "Return and recommend", "Interested"],
            answer_index: 1,
            explanation: "The lesson says trust matters most at the decide stage, where reviews, clear prices and quick replies help.",
          },
          {
            prompt: "Many people message a business asking for prices, but few of them pay. What does the lesson suggest?",
            options: [
              "Post more often so that more new people reach the business every day",
              "Lower the price immediately",
              "Find out why buyers stop at the decide or buy stage",
              "Close the WhatsApp account and use only Facebook",
            ],
            answer_index: 2,
            explanation: "Pouring more people in at the top does not fix a leak lower down the journey.",
          },
          {
            prompt: "What did the counts in Abdul-Rahman's journey map show?",
            options: [
              "Hardly anyone viewed his Status",
              "Customers could not pay with MoMo",
              "His prices were higher than those at the other phone accessory kiosks nearby",
              "Many people asked prices but few came back after his slow replies",
            ],
            answer_index: 3,
            explanation: "35 people asked but only 6 replied back, and the calls showed slow replies sent them elsewhere.",
          },
          {
            prompt: "Why does the lesson tell you to include offline steps in a journey map?",
            options: [
              "Offline steps such as a friend's advice or walking past the shop are often where trust is built",
              "Offline steps are easier to measure than online ones",
              "Online steps do not matter for small businesses",
              "Customers in Ghana never buy after seeing a post",
            ],
            answer_index: 0,
            explanation: "The lesson says journeys mix online and offline steps, and offline ones often build trust.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "know-your-audience": {
      outcomes: [
        "Write a clear audience description for a local business",
        "Turn an audience description into a simple persona",
        "Check competitors and name a gap the business can fill",
        "Use audience habits to choose where and when to post",
      ],
      explanation_md: `A message that works for students at a Tamale university will not land the same way with market women in Bolgatanga or civil servants in Wa. Job adverts for junior marketers in Ghana regularly ask for market research and competitor monitoring. Both come down to the same skill: finding out who you are talking to and what else they are already seeing.

## Step 1: describe the audience

Start with a short written description of the people a business wants to reach. Cover five things:

* **Who they are.** Age range, where they live, what they do for a living, whether they buy for themselves or for a family or office.
* **What they need.** The problem the business solves for them, in their words.
* **What worries them.** Price, quality, fake products, delivery, being cheated, wasting a trip.
* **Language.** English, Dagbani, Twi, Hausa, Gurune, Pidgin or a mix. A short line in Dagbani can make people in Tamale feel the post is truly for them.
* **Apps and habits.** WhatsApp, Facebook, TikTok, Instagram, radio, church announcements. When are they online? Many people buy data in small bundles, so they skip heavy videos and long voice notes.

Most businesses have more than one audience. An Accra salon might serve office workers who book after work and students who come at weekends with smaller budgets. Write a separate short description for each group that matters.

## Step 2: turn it into a persona

A persona is a made up person who represents a typical customer, with a name and a short story. For example: "Wumpini, 24, a nurse in Tamale, buys skin care for herself and her mother, checks WhatsApp Status on her break, worries about mixed products, pays by MoMo." Writing for one clear person makes your posts warmer and more specific than writing for "everyone". Keep personas based on what you have actually heard from customers, not on guesses.

## Step 3: find out, do not guess

The best audience facts come from real people. Simple, free ways to learn:

* **Ask the owner** who buys most, what they ask, and what they complain about.
* **Talk to three to five customers.** Ask why they chose the business, where they first heard of it, and which apps they use most.
* **Read the questions** customers send on WhatsApp or in comments. Repeated questions show what the business is not explaining.
* **Look at page insights** if the business already has a Facebook Page or Instagram account. They show broad age groups, towns and the times followers are online.

When you collect any personal details, such as phone numbers or names, ask permission and keep them private. Ghana's Data Protection Act, 2012 (Act 843) sets rules for how personal data is collected and used.

## Step 4: learn from competitors

Next, look at two or three similar businesses. You are not copying them. You are learning what customers in that market already see. For each one, note:

* Which channels they use, and which seem active.
* What prices they show, and whether they show prices at all.
* What customers praise or complain about in comments and reviews.
* What nobody is doing well. That gap is your opportunity.

Spend no more than 20 or 30 minutes on this to save data. A simple table on your phone or computer is enough.

## Step 5: use it to choose platforms

Your audience description tells you where to show up. If the customers are older traders who live on WhatsApp, a TikTok account is not the first priority. If they are students who discover new places through short videos, TikTok or Instagram might be. Match the platform to the people, then match the posting time to their habits: a chop bar might post the lunch menu mid morning, while a salon might post evening booking reminders.

Writing this down takes an hour. It saves weeks of posting the wrong thing to the wrong people, and it gives you a confident answer when a client asks, "Why are we doing it this way?"`,
      workedExample_md: `Mariama's group in Bolgatanga weaves baskets and wants to sell more. You spend one afternoon with them.

1. **Describe the audience.** After talking to the group and four customers, you write two descriptions. Local buyers want strong market baskets at a fair price, speak Gurune and English, use WhatsApp and buy in person. Buyers in Accra and abroad want colourful baskets as gifts, use Instagram and expect clear photos, sizes and delivery details.
2. **Write a persona** for the second group: "Mawuli, 30, works in an Accra office, buys gifts for weddings, scrolls Instagram in the evening, worries about delivery."
3. **Check three competitors.** All post lovely photos. None mention sizes or delivery costs, and their comments are full of people asking.
4. **Name the gap.** Mariama's group can win trust simply by answering those questions in every post.
5. **Choose platforms.** WhatsApp Status for local buyers, posted in the morning before market. Instagram for gift buyers, posted in the evening, with size and delivery in every caption.

The group now has a reason for every choice, and they can explain it to anyone who asks.`,
      keyTerms: [
        { term: "Audience", definition: "The group of people a business wants to reach with its marketing." },
        { term: "Persona", definition: "A made up but realistic customer, with a name and short story, based on what real customers say." },
        { term: "Market research", definition: "Finding out about customers and competitors before deciding what to do." },
        { term: "Competitor", definition: "Another business that customers could choose instead of yours." },
        { term: "Gap", definition: "Something customers want that no competitor is doing well." },
        { term: "Page insights", definition: "Free statistics a social media page shows about its followers and posts." },
      ],
      commonMistakes: [
        "Describing the audience as \"everyone\", which makes every message vague",
        "Inventing a persona from guesses instead of from what real customers say",
        "Copying a competitor's posts instead of looking for what they do badly",
        "Choosing a platform because it is popular rather than because the customers use it",
        "Collecting customer phone numbers without asking permission",
      ],
      selfCheck: [
        "Could you describe the main customers of a business you know in five short lines?",
        "What three questions would you ask a customer to test whether your persona is right?",
        "When you looked at competitors, what did nobody do well?",
      ],
      practice_task_md: `**Goal:** Write an audience description, a persona and a quick competitor check for one local business.

**Steps:**
1. Pick a business, such as a basket weaving group, a salon or a phone repair shop.
2. Ask the owner and at least two customers the questions in Step 3 of the lesson.
3. Write a short audience description covering who they are, what they need, what worries them, language, and apps and habits.
4. Turn it into a one paragraph persona with a name.
5. Look at two or three similar businesses online for no more than 20 minutes, and note their channels, whether they show prices, and one common customer question.
6. Write one sentence naming a gap, and one sentence naming the best platform and posting time for this audience.

**Done looks like:** One page with the description, persona, a small competitor table and a clear gap and platform choice.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest considering the audience's language?",
            options: [
              "Because posts must always be written in formal English to look professional to buyers",
              "Because a short line in a local language can make people feel the post is for them",
              "Because local languages are not allowed on social media",
              "Because language does not affect how people respond",
            ],
            answer_index: 1,
            explanation: "The lesson gives the example of a line in Dagbani making people in Tamale feel included.",
          },
          {
            prompt: "What should a persona be based on?",
            options: [
              "The marketer's own taste",
              "A competitor's follower list",
              "What you have actually heard from real customers",
              "Whatever the most popular app in the country is showing this month",
            ],
            answer_index: 2,
            explanation: "The lesson says to keep personas based on what customers say, not on guesses.",
          },
          {
            prompt: "What is the main purpose of looking at competitors?",
            options: [
              "To copy their posts word for word",
              "To leave negative comments on their pages",
              "To make sure the business always charges a lower price than all of them",
              "To learn what customers already see and spot what nobody is doing well",
            ],
            answer_index: 3,
            explanation: "The lesson says you are not copying; you are learning the market and finding gaps.",
          },
          {
            prompt: "The customers are older traders who use WhatsApp all day. What does the lesson suggest?",
            options: [
              "Match the platform to the people, so WhatsApp comes before a new TikTok account",
              "Open accounts on every platform at once",
              "Use TikTok first because it is popular",
              "Avoid WhatsApp because it is only for personal chats",
            ],
            answer_index: 0,
            explanation: "Step 5 says to match the platform to where the audience already is.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "channels-overview": {
      outcomes: [
        "Name the main digital marketing channels and what each is good for",
        "Sort channels into owned, earned and paid",
        "Choose two or three channels for a goal and give each one a job",
      ],
      explanation_md: `A small business in Ghana cannot be everywhere. It may have a small monthly budget, one phone and one person who also serves customers. Part of your value as a marketer is choosing the right two or three channels and doing them well, rather than spreading thin across every app. A channel is simply a route by which a business reaches people.

## The main channels

* **Messaging (WhatsApp, Telegram).** Direct, personal and close to the sale. Status updates reach people who already have the number saved. Great for repeat customers and local trade.
* **Social media (Facebook, Instagram, TikTok, X, LinkedIn).** Good for being discovered by new people and showing products. Each platform decides who sees a post, so reach can rise and fall without warning.
* **Search and maps (Google Search, Google Maps).** People searching "tailor near me" or "hotel in Wa" already want something. Showing up there catches buyers at the moment they are ready. The work of appearing in free search results is called search engine optimisation, or SEO.
* **Email.** A list of people who agreed to hear from you. Slower, but the business holds the list and no app decides who sees the message. Useful for NGOs, schools, companies that sell to other companies, and online shops.
* **Paid ads.** You pay a platform such as Meta or Google to show your message to people beyond your followers. Fast and measurable, but money is spent whether or not anyone buys.
* **A website.** Not a channel people scroll, but a home base the business controls. Search engines can find it, ads can send people to it, and it still works if a social account is lost.

## Owned, earned and paid

Marketers often group channels three ways:

* **Owned:** things the business controls, such as its website, email list, WhatsApp contacts and its own page.
* **Earned:** attention you do not pay for, such as shares, reviews, mentions on radio and word of mouth.
* **Paid:** reach you buy, such as ads and sponsored posts.

A healthy plan usually mixes them. Paid reach can bring new people in quickly; owned channels let you keep in touch cheaply; earned attention builds trust that ads cannot buy.

## How to choose: a step by step method

1. **Start from the goal.** New customers, repeat sales, more bookings, or trust? Different goals favour different channels. Search and paid ads are strong for new customers; WhatsApp and email are strong for repeat sales.
2. **Check where the customers already are.** Use your audience description. Do not start a channel the customers do not use.
3. **Check what the owner can keep up.** A page that is abandoned after two weeks looks worse than no page. Count the hours each channel will need per week.
4. **Check the budget.** Messaging, a Google Business Profile and organic posts cost time, not cash. Ads cost money every day they run.
5. **Give each chosen channel one clear job.** For example: TikTok for discovery, WhatsApp for questions and orders, Google Business Profile for people searching nearby.
6. **Write down what you are not doing, and why.** This protects the plan when someone says "Why are we not on every app?"

## Channels work together

Customers rarely use one channel alone. Someone might find a salon on Google Maps, look at its Instagram photos, then book on WhatsApp. So make sure the channels point to each other: put the WhatsApp number on the profile, the Instagram handle on the Status, and the same opening hours everywhere. Inconsistent details make people doubt the business.

## Phone or computer

You can run every channel in this lesson from a phone. A computer helps when you manage several accounts at once, build a website, or work with spreadsheets for planning and reporting. Many marketers use both: a phone for replying and posting on the go, and a computer for planning and reports.

The later lessons go deeper into each channel. For now, the skill is choosing: fewer channels, each with a clear job, done consistently.`,
      workedExample_md: `Issahaku helps his church in Tamale promote a youth conference. The goal is to fill the hall with young people from several churches.

1. **Goal:** reach new young people, plus remind members.
2. **Where are they?** Members are in the church WhatsApp group. Young people from other churches use TikTok and Facebook. Few check email.
3. **What can be kept up?** Issahaku and one friend, about three hours a week each.
4. **Budget:** small, and word of mouth is strong.
5. **Jobs for each channel:**
   * WhatsApp group and Status (owned): reminders and the registration link for members.
   * Facebook event (owned): date, venue, map and speakers, easy to share.
   * TikTok clips from last year's conference (owned, hoping for earned shares): discovery by young people from other churches.
6. **Not doing:** email, because members do not read it; paid ads, because the budget is small and sharing is strong. If registrations are low two weeks before, they will review this choice.

Every channel now points to the same registration link and the same date, venue and contact number. Three channels, each with a clear job, kept up by two people.`,
      keyTerms: [
        { term: "Channel", definition: "A route by which a business reaches people, such as WhatsApp, search, email or ads." },
        { term: "Owned media", definition: "Channels the business controls, such as its website, email list and contacts." },
        { term: "Earned media", definition: "Attention the business does not pay for, such as shares, reviews and word of mouth." },
        { term: "Paid media", definition: "Reach the business buys, such as adverts and sponsored posts." },
        { term: "SEO", definition: "Search engine optimisation: helping a business appear in free search results." },
        { term: "Organic", definition: "Unpaid posts and results, as opposed to paid adverts." },
      ],
      commonMistakes: [
        "Opening accounts on every platform and keeping none of them active",
        "Choosing a channel because it is fashionable rather than because the customers use it",
        "Giving several channels the same vague job instead of one clear job each",
        "Showing different phone numbers or opening hours on different channels",
      ],
      selfCheck: [
        "For a business you know, which channels are owned, earned and paid today?",
        "Which channel would you drop first if the owner had only two hours a week, and why?",
        "How would you make sure three chosen channels point customers to the same next step?",
      ],
      practice_task_md: `**Goal:** Choose channels for a real or realistic local campaign and justify each choice.

**Steps:**
1. Pick a goal, such as promoting a church event, a new menu at a chop bar or more weekday bookings at a salon.
2. List the channels: messaging, social media, search and maps, email, paid ads, website.
3. For each, write one sentence on whether it suits this goal and why. Mark each as owned, earned or paid.
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
            prompt: "A customer review on Google and a friend recommending a shop are examples of which kind of media?",
            options: ["Earned", "Owned", "Paid", "Organic search only"],
            answer_index: 0,
            explanation: "Earned media is attention the business does not pay for, such as reviews and word of mouth.",
          },
          {
            prompt: "Why does the lesson recommend writing down what you are not doing?",
            options: [
              "Platforms require a written list of unused channels before you can open any new account",
              "It protects the plan when someone asks why the business is not on every app",
              "It means you never need to review the plan again",
              "It is the main way to save money on ads",
            ],
            answer_index: 1,
            explanation: "Step 6 says the note protects the plan and explains the choice.",
          },
          {
            prompt: "Why is a website described as a home base?",
            options: [
              "Because people scroll websites more than social media",
              "Because a website is always free to build",
              "Because ads cannot send people to a website",
              "Because the business controls it and it keeps working if a social account is lost",
            ],
            answer_index: 3,
            explanation: "The lesson says the business controls its website and it still works if a social account is lost.",
          },
        ],
        pass_threshold: 75,
      },
    },
    content: {
      outcomes: [
        "Explain what counts as marketing content",
        "Give every piece of content one clear job",
        "Plan a balanced week of content for a small business",
      ],
      explanation_md: `When Ghanaian companies hire junior marketers, one of the most common requests after social media management is content creation: posts, graphics, photos and short videos. Agencies, retailers, NGOs and startups all need a steady supply of it. The good news is that you can produce professional content with a phone or computer, daylight and free apps. What makes content good is clear thinking and care, not expensive equipment.

## What counts as content

Content is anything a business shares to inform, help or persuade people. For example:

* A caption that tells people what is on today's chop bar menu and how to order.
* A product photo of shea butter in a clean jar, shot by a window.
* A simple graphic announcing a church harvest with the date, place and a contact number.
* A 20 second video showing how a Bolgatanga basket is woven.
* A WhatsApp Status reminding customers about a weekend offer.
* A short email newsletter or a page of helpful text on a website.

## Give every piece one job

Good content has a job. Before you make anything, decide which of these four it is for:

* **Show** what the business offers, clearly enough that people understand at a glance.
* **Help** people with useful tips, such as how to store shea butter in the dry season or how to keep braids neat for longer.
* **Prove** the business is trustworthy, through behind the scenes clips or genuine customer feedback shared with permission.
* **Ask** people to act: order, call, visit, register.

A healthy mix keeps people interested. If every post is "buy now", people tune out. If no post ever asks, nobody buys. A simple starting rule is to make most posts show, help or prove, and to include a clear ask in some of them every week.

## A simple workflow for making content

Whatever the format, the same steps keep quality high:

1. **Plan.** Decide the job, the audience and the one message. Write it in a sentence: "This post shows mothers in Tamale that our butter is fresh this week."
2. **Gather.** Take the photos, record the clip, or collect the facts: price in cedis, sizes, opening hours, how to pay.
3. **Create.** Write the caption, design the graphic or edit the video. Keep it simple and readable on a small screen.
4. **Check.** Read it aloud. Check every price, date and phone number. Ask: would a busy person understand this in three seconds?
5. **Publish.** Post at a time your audience is online, on the channel where they are.
6. **Learn.** After a few days, look at what got replies, shares or orders, and make more of what worked.

## Make it light on data

Many of your clients' customers buy data in small bundles. Content that loads quickly gets seen more. Keep images to a sensible size, keep videos short, and put the key message in the first few seconds or the first line of text. Your own practice should be light on data too: draft captions offline, and upload when you are on Wi Fi or have a bundle.

## Be honest and get permission

Never use a customer's photo, name or words without asking. Never invent reviews or make claims the product cannot back up. Use your own photos or free images you are allowed to use, and never take another business's pictures from the internet. Honest content is slower to build but lasts.

## What this section covers

* **Writing that sells.** Short, clear words with a consistent voice and a clear next step.
* **Product photos and graphics.** Clean photos and simple branded designs in a free tool.
* **Short video and live selling.** Vertical videos for TikTok, Reels and Status, and selling during live streams.
* **Planning a content calendar.** Planning ahead around market days, holidays and local events, so the business stays consistent.

By the end of this section you will be able to produce a week of useful, honest content for a small business and explain why each piece exists.`,
      workedExample_md: `Amina manages content for a small cosmetics shop in Tamale. On Sunday evening she plans the week in a notes app.

| Day | Piece | Job |
| --- | --- | --- |
| Monday | Photo of the new shea body cream with price | Show |
| Tuesday | Three line tip on caring for skin in the harmattan | Help |
| Wednesday | Short clip of a regular customer, Hawa, who agreed to be filmed saying why she buys | Prove |
| Thursday | Graphic with delivery days and areas | Show |
| Friday | Weekend offer with a clear "Send ORDER on WhatsApp" line | Ask |

For each piece she follows the workflow. For Wednesday, she plans the message ("real customers trust us"), gathers the clip in daylight outside the shop, trims it to 15 seconds, checks Hawa is happy with it, posts at lunchtime when customers are on their phones, and later notes that it got the most replies of the week.

Each piece took under an hour. Together they tell a full story about the shop, and only one of the five asked for a sale.`,
      keyTerms: [
        { term: "Content", definition: "Anything a business shares to inform, help or persuade people, such as posts, photos, videos and emails." },
        { term: "Content mix", definition: "The balance of pieces that show, help, prove and ask over a week or month." },
        { term: "Caption", definition: "The text that goes with a photo or video on social media." },
        { term: "Format", definition: "The type of content, such as a photo, graphic, short video, text post or email." },
        { term: "Permission", definition: "A clear yes from a person before you use their photo, name or words." },
      ],
      commonMistakes: [
        "Making a post without deciding its job first",
        "Making every post a sales request so people stop paying attention",
        "Uploading heavy videos and images that customers on small bundles skip",
        "Using customers' photos or other businesses' pictures without permission",
      ],
      selfCheck: [
        "Look at the last five posts from a business you follow. Which jobs do they do, and which job is missing?",
        "Which step of the workflow do you usually skip, and what could go wrong because of that?",
        "How would you make a piece of content lighter on data without losing its message?",
      ],
      practice_task_md: `**Goal:** Plan and make a small set of content pieces with clear jobs.

**Steps:**
1. Choose a small business you know, such as a salon, a chop bar or a shea butter seller.
2. In a notes app, Google Docs or Google Sheets, plan five pieces for one week, one per day, and label each one show, help, prove or ask.
3. Make two of them for real: for example, one photo with a caption and one short tip.
4. For each of the two, write one line for each workflow step you followed (plan, gather, create, check).
5. Share them with the owner or a friend and ask what they understood in the first three seconds.

**Done looks like:** A one week plan with jobs labelled, two finished pieces, and one note on what you would change after feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Which job does a short clip of a real customer explaining why she buys mainly do?",
            options: [
              "Show what the business offers at a glance",
              "Help with a useful tip",
              "Ask people to order",
              "Prove the business can be trusted",
            ],
            answer_index: 3,
            explanation: "Genuine customer feedback, shared with permission, proves the business is trustworthy.",
          },
          {
            prompt: "What problem does the lesson describe if every post says \"buy now\"?",
            options: [
              "People tune out and stop paying attention",
              "Platforms delete the business account straight away",
              "The business runs out of stock immediately",
              "Posts become too long to read",
            ],
            answer_index: 0,
            explanation: "The lesson says a feed of only sales requests makes people tune out.",
          },
          {
            prompt: "In the content workflow, what happens at the check step?",
            options: [
              "You choose which app to download",
              "You read it aloud and check every price, date and phone number",
              "You count how many likes the post received",
              "You ask a competitor to look over and approve the post before you publish anything",
            ],
            answer_index: 1,
            explanation: "The check step is reading aloud and confirming every fact before publishing.",
          },
          {
            prompt: "Why does the lesson stress keeping content light on data?",
            options: [
              "Platforms charge businesses for every large file",
              "Light files always look more professional",
              "Many customers buy small data bundles and skip heavy content",
              "Short videos are the only format allowed on WhatsApp",
            ],
            answer_index: 2,
            explanation: "Content that loads quickly gets seen more by people on small bundles.",
          },
        ],
        pass_threshold: 75,
      },
    },
    copywriting: {
      outcomes: [
        "Write a post using the hook, detail, proof and call to action pattern",
        "Define a brand voice in three words and keep to it",
        "Write short web page text that uses the words customers search for",
        "Keep claims honest and check AI drafts before using them",
      ],
      explanation_md: `Words do most of the selling online. A photo catches the eye, but the caption tells people what it is, why they should care and what to do next. Ghanaian job adverts for digital marketers often ask for copywriting and for keeping a brand consistent, and almost every marketing role depends on it. If you can write short, clear, friendly words, you will always be useful.

## The shape of a selling message

Most good posts follow a simple pattern:

* **Hook.** The first line, which people see before tapping "more". Lead with the benefit or a question. "Dry, cracked heels this harmattan?" beats "Good morning everyone".
* **Detail.** What it is, the price in cedis, sizes, delivery days. Answer the questions people would otherwise send in a message.
* **Proof.** A reason to trust: "made by our women's group in Tamale" or a short customer comment shared with permission.
* **Call to action.** Exactly what to do next. "Send BUTTER on WhatsApp to 024 000 0000 and pay with MoMo."

Keep sentences short. Write for someone reading on a small screen, maybe in their second or third language. Read your post aloud; if you run out of breath, cut it.

## Benefits before features

A feature is what the product is. A benefit is what it does for the customer. "Hand woven from elephant grass" is a feature. "Strong enough to carry a full market load for years" is a benefit. Customers buy benefits, so lead with them and use features as proof.

## Brand voice

A brand voice is the personality in the words. A youth church event might sound lively and warm. A microfinance company should sound calm and trustworthy. An Accra salon might sound stylish and friendly. Write down three words for the voice, such as "friendly, honest, local", plus a few words the brand always uses and a few it never uses. Check every post against them. Consistency helps people recognise the business before they even see the logo.

## Writing for a web page

The same pattern works on a website, with one addition: people often arrive from a search engine, so use the words they actually type. If customers search "braids salon East Legon", those words should appear naturally in the page title, the main heading and the first paragraph. This is the basic keyword principle. Steps for a simple page:

1. **List the words customers use.** Ask customers how they would search, and type the service plus the town into a search engine to see the suggestions.
2. **Write a clear heading** that says what the business does and where: "Braids and natural hair care in East Legon".
3. **Answer the main questions** in short paragraphs: services, prices or price ranges, opening hours, location and how to book.
4. **Use the words naturally.** Never stuff the same phrase into every sentence; write for people first.
5. **End with one clear action,** such as a WhatsApp button or phone number.

The SEO lesson explains how search engines read pages, and the specialisations roadmap goes much deeper into keyword research.

## Honest claims only

Never promise what the product cannot do. Do not call shea butter a cure for a disease, and do not invent customer reviews. In Ghana, the Food and Drugs Authority sets rules for adverts for regulated products such as cosmetics, food and medicines. The platforms' own advertising policies also expect claims to be truthful. One exposed lie can destroy trust that took years to build.

## Using AI writing tools

AI chat tools can suggest captions quickly. Treat them as a first draft only. Check every price, date and fact, remove anything that sounds foreign to your audience, and never trust an AI translation into Dagbani, Twi or any other language without a fluent speaker checking it.

## A quick editing checklist

Before you post, check: Is the benefit in the first line? Is the price or next step clear? Is every fact true? Does it sound like the brand? Could a busy person on a small screen understand it in a few seconds? If any answer is no, edit once more.`,
      workedExample_md: `Sumaila runs a mobile money and phone accessories shop in Tamale and writes his own posts. For a made up promotion, his first draft reads:

"We are pleased to inform our esteemed customers of our ongoing promotion at our shop."

Nobody will read past "pleased". You help him rewrite it using the pattern:

1. **Hook (benefit first):** "Free airtime for loyal customers this month."
2. **Detail:** "Get a stamp each time you buy a phone accessory. Five stamps earn you airtime."
3. **Proof:** "Serving Aboabo since your big brother's first phone."
4. **Call to action:** "Visit Sumaila Ventures, opposite Aboabo market, 7am to 8pm, or send STAMP on WhatsApp to ask."

You check it against his brand voice words, "friendly, quick, local", and read it aloud. It is short enough for a WhatsApp Status and clear in a few seconds.

Then you adapt it for his simple web page. The customers search "phone accessories Aboabo Tamale", so the heading becomes "Phone accessories and chargers in Aboabo, Tamale", followed by the same benefit, opening hours and a WhatsApp button.`,
      keyTerms: [
        { term: "Copywriting", definition: "Writing words that persuade people to take an action, such as buying or booking." },
        { term: "Hook", definition: "The first line of a post, written to make people stop and read more." },
        { term: "Call to action", definition: "The exact next step you ask the reader to take." },
        { term: "Benefit", definition: "What a product does for the customer, as opposed to what it is." },
        { term: "Brand voice", definition: "The consistent personality in a business's words, such as friendly or formal." },
        { term: "Keyword", definition: "A word or phrase people type into a search engine to find something." },
      ],
      commonMistakes: [
        "Starting with greetings or the business name instead of the benefit",
        "Leaving out the price or the next step, so people must message to ask",
        "Stuffing the same keyword into every sentence of a web page",
        "Making health or results claims the product cannot back up",
        "Posting an AI draft or AI translation without checking it",
      ],
      selfCheck: [
        "Can you turn one feature of a product you know into a clear benefit?",
        "What three words would describe the voice of a business you like, and does every post match them?",
        "What words would a customer type to find a service in your town, and where would you put them on a web page?",
      ],
      practice_task_md: `**Goal:** Rewrite real posts so they sell more clearly, and write a short web page section.

**Steps:**
1. Find three real posts from small businesses near you, on WhatsApp Status, Facebook or Instagram. Screenshot or copy them into a notes app.
2. Rewrite each one using hook, detail, proof and call to action. Keep each under 50 words.
3. Write three words for one business's brand voice and check your rewrites against them.
4. For one of the businesses, write a heading and a short first paragraph for a web page, using the words a customer would search for.
5. Ask a friend which version, old or new, they would act on, and why.

**Done looks like:** Three before and after pairs, a brand voice note, a short web page section, and one piece of feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Which is the best hook for a shea butter post in the harmattan?",
            options: [
              "Good morning everyone, hope you are well",
              "Welcome to our page, please follow us",
              "Dry, cracked heels this harmattan?",
              "We are pleased to inform our esteemed customers",
            ],
            answer_index: 2,
            explanation: "A good hook leads with the benefit or a question the reader cares about.",
          },
          {
            prompt: "\"Strong enough to carry a full market load for years\" is an example of what?",
            options: ["A feature", "A benefit", "A brand voice", "A keyword"],
            answer_index: 1,
            explanation: "It describes what the basket does for the customer, which is a benefit.",
          },
          {
            prompt: "What does the lesson say about using keywords on a web page?",
            options: [
              "Use the words customers type naturally in the title, heading and first paragraph",
              "Repeat the main keyword in every single sentence on the page so that search engines notice it",
              "Keywords only matter for paid adverts",
              "Hide keywords in small text at the bottom of the page",
            ],
            answer_index: 0,
            explanation: "The lesson says to use customers' search words naturally and never stuff them.",
          },
          {
            prompt: "How should you treat a caption suggested by an AI chat tool?",
            options: [
              "Post it straight away, since AI tools are always accurate",
              "Only use it if it is written in formal English",
              "Translate it with the same tool and post both versions",
              "As a first draft, checking every fact and anything that sounds foreign",
            ],
            answer_index: 3,
            explanation: "The lesson says AI output is only a first draft that you must check.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "graphics-and-photos": {
      outcomes: [
        "Take a clean product photo in daylight with any phone camera",
        "Design a simple promotional graphic in a free tool",
        "Keep a brand consistent with a small set of colours and fonts",
        "Export images small enough for customers on limited data",
      ],
      explanation_md: `People decide in a second whether to stop scrolling, and pictures make that decision. A blurry, dark photo makes even good products look cheap. Many Ghanaian adverts for marketing assistants and interns name tools such as Canva for graphics, and clients expect clean product photos. You can do both well with free tools and a little practice.

## Taking a good product photo

You do not need a professional camera. Any recent phone camera is enough if you control the light and the background.

1. **Use daylight.** Stand near a window or in open shade outside. Avoid harsh midday sun, which makes hard shadows, and avoid the camera flash.
2. **Clean the lens.** A quick wipe with a soft cloth fixes many blurry photos.
3. **Choose a plain background.** A white sheet, a clean wall or a wooden table. Remove clutter so the product is the only thing that matters.
4. **Fill the frame.** Move closer rather than zooming. Tap the screen on the product to focus.
5. **Hold steady.** Brace your elbows on a table, or prop the phone against something.
6. **Take several shots.** Try the front, the side, a close up of texture or detail, and one showing size, such as the product in someone's hand.

For food, shoot from above or at a slight angle in good light. For a salon, photograph finished hairstyles from the side and back with the client's permission. For crafts, show the detail of the weaving or stitching.

## Simple edits

Use the editor built into your phone or a free app. Straighten the photo, crop out distractions and lift brightness a little. Do not change colours so much that the product looks different from what customers receive. Honest photos prevent complaints.

## Designing a promotional graphic

A graphic combines a photo or shapes with a few words, for example to announce an offer, an event or new stock. Free tools such as Canva work in a browser on a computer and as an app on a phone. Steps:

1. **Pick the size first.** Square suits many feeds, and a tall vertical size suits Status and Stories. Most tools offer ready made sizes.
2. **Write the words before you design.** Keep it to a short headline, one or two lines of detail (price, date, place) and a call to action. If it takes more than a few seconds to read, cut words.
3. **Choose one strong image** and place it where the eye lands first.
4. **Use the brand's colours and fonts.** Two or three colours and one or two fonts are enough.
5. **Check contrast.** Light text on a dark background or dark on light. Make the text big enough to read on a small screen.
6. **Leave space.** Empty space around words makes a design look calm and professional.
7. **Check every detail.** Price, date, phone number and spelling. A wrong number wastes the whole design.

Templates can save time, but change them enough that the design fits the brand. Use only images you have taken, been given permission to use, or that the tool's licence allows.

## A simple brand kit

Create a small note, or use the brand kit feature in your design tool if it has one, with the logo, two or three colours, one or two fonts, and an example post. Using it every time makes a business recognisable, even when different people make the content.

## Keep files light

Many customers are on small data bundles. When you export, choose a sensible size rather than the largest option, and use JPG for photos. On a computer you can resize before uploading; on a phone, many apps let you choose a smaller export. A graphic that loads quickly gets seen.

## Phone or computer

Both work. A phone is handy for shooting and quick designs. A computer gives a bigger screen for careful layout, checking small text, and organising files into folders by client and month.`,
      workedExample_md: `Hawa sells shea butter in Tamale and wants a graphic for a weekend offer. Fuseini makes it in Canva.

1. **Photo.** He places a jar on a white cloth by the window at about 9am, wipes the lens, taps to focus, and takes six shots. He picks the sharpest, crops it square and lifts the brightness slightly.
2. **Words first.** He writes in his notes app: "Fresh shea butter, 500g jar" (headline), "Weekend price GHS 40, Saturday and Sunday only" (detail), "WhatsApp 024 000 0000 to order" (call to action). The price is an example for practice; he uses Hawa's real price on the live post.
3. **Size.** He makes a square version for Facebook and a tall version for WhatsApp Status.
4. **Brand kit.** He uses Hawa's two colours, deep green and cream, and one bold, easy font.
5. **Check.** He zooms out on his phone to see if the headline is readable at a glance, then checks the number twice.
6. **Export.** He exports as a JPG at a modest size so it loads quickly.

Hawa approves it in two minutes. The design took Fuseini about 30 minutes, and he saves it as a template for next weekend.`,
      keyTerms: [
        { term: "Natural light", definition: "Daylight from a window or open shade, the best free light for product photos." },
        { term: "Composition", definition: "How things are arranged in a photo or design so the eye goes to the right place." },
        { term: "Contrast", definition: "The difference between text and background colours that makes words easy to read." },
        { term: "Template", definition: "A ready made design you adapt with your own words, images and colours." },
        { term: "Brand kit", definition: "A small set of a business's logo, colours and fonts used on every design." },
        { term: "Export", definition: "Saving a finished design as an image file you can post or send." },
      ],
      commonMistakes: [
        "Shooting with the flash or in a dark room, which makes products look cheap",
        "Cramming too many words, colours and fonts into one graphic",
        "Editing colours so much that the product looks different from what customers receive",
        "Exporting very large files that customers on small bundles never load",
        "Using images found online without permission",
      ],
      selfCheck: [
        "What three changes would most improve the product photos of a business you follow?",
        "Can a stranger read your graphic's main message in three seconds on a small screen?",
        "Which two or three colours and fonts would you put in a brand kit for a business you know?",
      ],
      practice_task_md: `**Goal:** Produce one clean product photo and one promotional graphic for a real or realistic business.

**Steps:**
1. Choose a product you can access, such as a jar of shea butter, a basket, a plate of food or a phone case.
2. Take at least five photos in daylight on a plain background, following the steps in the lesson. Pick the best and make simple edits.
3. Write the headline, detail and call to action for an offer in a notes app.
4. In a free design tool, create a square graphic and a tall vertical version using your photo, two or three colours and one or two fonts.
5. Export both at a modest size and check them on a small screen.

**Done looks like:** One edited photo and two graphic sizes, with readable text, correct details and files small enough to send easily on WhatsApp.`,
      quiz: {
        questions: [
          {
            prompt: "What is the best light for a product photo, according to the lesson?",
            options: [
              "Daylight near a window or in open shade",
              "The camera flash in a dark room",
              "Harsh midday sun directly on the product",
              "A coloured bulb to make the product stand out",
            ],
            answer_index: 0,
            explanation: "The lesson recommends daylight from a window or open shade and avoiding flash and harsh sun.",
          },
          {
            prompt: "When designing a promotional graphic, what should you do before you start designing?",
            options: [
              "Choose as many colours as possible",
              "Find a competitor's design to copy",
              "Pick the size and write the words",
              "Export the file at the largest size",
            ],
            answer_index: 2,
            explanation: "The steps say to pick the size first and write the words before designing.",
          },
          {
            prompt: "Why should you avoid changing a product's colours too much when editing?",
            options: [
              "Editing apps charge more for colour changes",
              "Platforms automatically block any photo that has been edited in an app, even slightly",
              "Bright colours use more data",
              "The product would look different from what customers receive, causing complaints",
            ],
            answer_index: 3,
            explanation: "The lesson says honest photos prevent complaints.",
          },
          {
            prompt: "What is a brand kit?",
            options: [
              "A paid subscription to a design tool",
              "A small set of the logo, colours and fonts used on every design",
              "A box of products sent to customers",
              "A folder of photos copied from other businesses",
            ],
            answer_index: 1,
            explanation: "A brand kit keeps designs consistent with the same logo, colours and fonts.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "short-video": {
      outcomes: [
        "Plan a short vertical video with a strong opening and one idea",
        "Film with clear sound and steady framing on a phone",
        "Edit, caption and end a video with a clear next step",
        "Prepare a simple live selling session",
      ],
      explanation_md: `Short vertical video now drives much of what people watch on TikTok, Instagram Reels, Facebook and WhatsApp Status. Ghanaian employers, from car dealers to cosmetics shops, advertise for people who can film and edit short clips, and some retail and health product companies ask for staff who can sell during live streams. Filming is one of the few tasks in this roadmap where a phone is the natural tool, because its camera is always with you. Editing can happen on the phone or on a computer.

## What makes a short video work

* **The first few seconds.** People decide almost instantly whether to keep watching. Start with the most interesting moment: the finished basket, the steaming waakye, the before and after of a hairstyle.
* **Vertical framing.** Hold the phone upright so the video fills the screen.
* **Clear sound.** Viewers forgive average pictures but not bad sound. Film in a quiet spot, speak close to the phone, or use a simple clip microphone if you have one.
* **Captions.** Many people watch with the sound off, especially in public. Add on screen text so the message still lands.
* **One idea.** One product, one tip or one story per video.
* **A next step.** End with what to do: "Order on WhatsApp", "Visit us at Tamale Central Market".

## Plan before you film

A short plan saves data, battery and time. Write three lines:

1. **Opening shot:** the moment that makes people stop.
2. **Middle:** two to four quick shots that show the process, product or tip.
3. **Ending:** the result and the call to action.

Then list the shots you need. For a chop bar: steam rising from the pot, the server dishing up, a close up of the plate, the price on screen, the WhatsApp number.

## Filming steps

1. **Clean the lens** and turn the phone upright.
2. **Find light.** Face a window or film in open shade. Keep the sun behind you, not behind the subject.
3. **Steady the phone.** Lean it against something, brace your arms, or use a cheap stand.
4. **Film each shot for a few seconds longer than you need.** You will trim later.
5. **Check sound.** Record a five second test and listen before filming everything.
6. **Ask permission** before filming customers or staff, and respect anyone who says no.

## Editing

Free editing apps such as CapCut, or the editors built into TikTok and Instagram, let you trim clips, add text, music and transitions. Desktop editors work too if you prefer a bigger screen. Keep edits simple:

* Cut any pause, shaky moment or repeated shot.
* Put the key words on screen in large, high contrast text, away from the edges where app buttons sit.
* Keep most business videos short; many work well at 15 to 30 seconds.
* When you add music, use the platform's own music library, because songs added from elsewhere can be muted or removed for copyright reasons.
* Export at a sensible quality so it uploads on a normal bundle.

## Trends, carefully

Trends and popular sounds can help a video reach new people. Join a trend only if it fits the brand and you can link it to the product. A funny trend that has nothing to do with the business may get views but no customers.

## Live selling

In a live stream, a seller shows products in real time, answers questions from comments and takes orders. It works well for clothes, cosmetics and accessories. Prepare like a small show: a list of products with prices, good light, a stable phone stand, a strong connection, and a helper who replies to comments and records orders in a notebook or spreadsheet. Announce the time a day before on Status and social media. Platforms set conditions for who can go live, such as age and account requirements, and these change, so check the current rules in the app before promising a client a live session.

## Measure what matters

Views are nice, but for a business the useful signs are messages, saves, shares and orders that mention the video. Note them for each video so you learn what to make next. The specialisations roadmap covers storytelling, scripting and editing in more depth.`,
      workedExample_md: `Fuseini films for a Tamale tailor, Madam Sala. His first attempt was a slow, sideways clip of the shop that nobody shared.

His new plan, written in his notes app:

* **Opening:** a customer, Mariama, twirling in a finished kaba, filmed with her permission.
* **Middle:** three quick shots of cutting fabric, sewing a seam, and fitting.
* **Ending:** the finished outfit with on screen text "Made in Tamale, ready in 7 days" and "Order on WhatsApp", plus the number.

He films at 10am near the shop's open door, phone upright and leaning on a sewing machine. He records a five second sound test first and hears a generator, so he moves inside. He films each shot a little longer than needed.

In CapCut he trims everything to 22 seconds, adds large captions away from the screen edges, picks a song from the app's own library and exports at a moderate quality.

After a week he notes the results: more shares than any earlier post, and four WhatsApp messages asking about kaba prices. He saves the plan as a pattern for the next video.`,
      keyTerms: [
        { term: "Vertical video", definition: "Video filmed with the phone upright so it fills a phone screen." },
        { term: "Hook", definition: "The opening seconds of a video that make people keep watching." },
        { term: "Shot list", definition: "A short list of the clips you need to film before you start." },
        { term: "Captions", definition: "On screen text that carries the message when the sound is off." },
        { term: "Live selling", definition: "Showing and selling products in real time during a live stream." },
        { term: "Trend", definition: "A popular format or sound that many people copy for a short time." },
      ],
      commonMistakes: [
        "Starting with a slow logo or greeting instead of the most interesting moment",
        "Filming sideways or with the light behind the subject",
        "Ignoring sound and filming next to traffic or a generator",
        "Adding songs from outside the app, so the video is muted",
        "Joining a trend that has nothing to do with the business",
      ],
      selfCheck: [
        "What would the first two seconds of a video for a business you know show?",
        "Could someone understand your last video with the sound off?",
        "What would you prepare before helping a shop run its first live selling session?",
      ],
      practice_task_md: `**Goal:** Film and edit one short vertical video for a local business.

**Steps:**
1. Choose a business you can film with permission, such as a tailor, a chop bar or a craft seller.
2. Write a three line plan (opening, middle, ending) and a shot list.
3. Film each shot upright in good light, after a quick sound test.
4. Edit to 15 to 30 seconds in a free app, add captions and end with a clear next step.
5. Export at a moderate quality and send it to the owner for approval.

**Done looks like:** A finished vertical video under 30 seconds with a strong opening, readable captions and a clear call to action, plus your written plan.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say captions matter in short videos?",
            options: [
              "Platforms reject videos without captions",
              "Captions make the file smaller",
              "Many people watch with the sound off",
              "Captions replace the need for a call to action",
            ],
            answer_index: 2,
            explanation: "People often watch in public with the sound off, so on screen text carries the message.",
          },
          {
            prompt: "What did Fuseini do when his sound test picked up a generator?",
            options: [
              "Moved inside to film somewhere quieter",
              "Added loud music to cover the noise",
              "Filmed anyway and removed the sound later",
              "Switched to taking photos instead of video",
            ],
            answer_index: 0,
            explanation: "He moved inside, because clear sound matters more than perfect pictures.",
          },
          {
            prompt: "Why should you add music from the platform's own library?",
            options: [
              "It makes the video load faster for viewers",
              "Songs added from elsewhere can be muted or removed for copyright reasons",
              "Only music from the library can be played in a vertical video, because of the screen shape",
              "Library music is always more popular",
            ],
            answer_index: 1,
            explanation: "The lesson warns that outside songs can be muted or removed.",
          },
          {
            prompt: "Which of these is the most useful sign that a business video worked?",
            options: [
              "A high view count",
              "A trending sound",
              "A long video length",
              "Messages and orders that mention the video",
            ],
            answer_index: 3,
            explanation: "The lesson says messages, shares and orders matter more for a business than views.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "content-calendar": {
      outcomes: [
        "Build a two week content calendar in a spreadsheet",
        "Plan posts around market days, holidays and local events",
        "Balance content jobs and channels across a calendar",
        "Present a calendar as part of a short campaign proposal",
      ],
      explanation_md: `Businesses that post only when they remember look unreliable, and customers forget them. A content calendar is a simple plan of what will be posted, where and when. Employers and clients value marketers who can plan ahead, because it means fewer last minute rushes, fewer mistakes and content that matches what is happening in customers' lives. It is also one of the easiest pieces of work to show in a portfolio.

## What a calendar contains

A calendar can be a table in Google Sheets, a free spreadsheet app on your phone, or a page in a notebook. Each row is one piece of content. Useful columns:

* **Date and time** it will go out.
* **Channel**, such as WhatsApp Status, Facebook, Instagram or email.
* **Job**: show, help, prove or ask.
* **Topic or idea** in a few words.
* **Format**: photo, graphic, video, text.
* **Caption draft** or a link to it.
* **Status**: idea, drafted, approved, posted.
* **Result**: replies, shares or orders noticed afterwards.

Spreadsheets are easier to edit and share on a computer, but they work on a phone too. Sharing the sheet with the owner lets them approve posts without long chats.

## Plan around real life

Good calendars follow the rhythm of the customers' lives:

* **Market days.** If Tamale's big market day brings traders to town, post offers the evening before.
* **Paydays and month end.** Many people buy more just after payday and less just before it.
* **Seasons.** Harmattan skin care, rainy season footwear, school resumption for uniforms and stationery.
* **Holidays and festivals.** Christmas, Eid, Easter, Independence Day, Farmers' Day and local celebrations such as Damba in Dagbon. Be respectful: a sales post on a solemn religious day can offend.
* **The business's own events:** new stock, a launch, an anniversary, a workshop.

## How to build a two week calendar

1. **Start from the goal.** For example: "more weekday bookings at the salon".
2. **Decide how often you can post** on each channel. Being consistent with three posts a week beats posting daily for one week and then stopping.
3. **Mark key dates** in the two weeks: market days, holidays, payday, events.
4. **Fill the slots with ideas,** mixing the four jobs so most posts show, help or prove and some ask.
5. **Match format to channel.** Short video for TikTok or Reels, a graphic for Status, a longer caption for Facebook.
6. **Draft captions in batches.** Write all of a week's captions in one sitting. It is faster and keeps the voice consistent.
7. **Get approval** from the owner before posting.
8. **Leave room** for news and replies. A calendar is a plan, not a prison.

## Batching and scheduling

Making content in batches saves time and data: take all the week's photos in one morning, design all the graphics in one sitting. Some platforms let you schedule posts ahead, for example through Meta's business tools for Facebook and Instagram. WhatsApp Status cannot usually be scheduled in the same way, so set a reminder. Menus change, so check what the tools currently offer.

## Review and improve

At the end of each week, fill in the result column. Which posts brought messages or orders? Which got nothing? Make more of what worked next time. This turns the calendar into a learning tool, and the results feed straight into a client report.

## Turning it into a proposal

When you pitch a plan to a client or a mentor, three short slides are often enough:

1. **Strategy:** the goal, the audience, the channels and why.
2. **Example post one:** the finished design and caption.
3. **Example post two:** a different job or format, plus a peek at the two week calendar.

Keep text short on the slides and talk through the reasons. The campaign planning lesson shows how to grow this into a full campaign plan.`,
      workedExample_md: `Wumpini helps an Accra salon, Grace Beauty Lounge, get more weekday bookings. The goal: fill Tuesday to Thursday slots. The salon can manage four posts a week on Instagram and daily WhatsApp Status.

She builds a two week sheet. Week one looks like this:

| Date | Channel | Job | Idea | Format | Status |
| --- | --- | --- | --- | --- | --- |
| Mon | Instagram | Show | Knotless braids finished look | Photo | Approved |
| Tue | Status | Ask | "Weekday slots open, book on WhatsApp" | Graphic | Drafted |
| Wed | Instagram | Help | How to sleep without ruining braids | Short video | Idea |
| Thu | Status | Prove | Client quote, shared with permission | Graphic | Drafted |
| Fri | Instagram | Show | Behind the scenes, Saturday prep | Short video | Idea |

Week two adds month end, so she plans a payday reminder on the Friday and avoids a big offer just before it.

She takes all the photos on Monday morning, drafts all captions on Monday evening and shares the sheet with the owner, who approves it in comments. On Friday she records which posts brought booking messages. The help video brought the most, so week two gets another tip video.`,
      keyTerms: [
        { term: "Content calendar", definition: "A plan showing what will be posted, on which channel and when." },
        { term: "Batching", definition: "Making several pieces of content in one sitting to save time and data." },
        { term: "Scheduling", definition: "Setting a post to publish automatically at a chosen time." },
        { term: "Posting frequency", definition: "How often a business posts on each channel." },
        { term: "Approval", definition: "The owner or client agreeing to content before it is posted." },
      ],
      commonMistakes: [
        "Planning more posts than the business can keep up, then stopping",
        "Ignoring market days, paydays and festivals that change what customers need",
        "Posting sales offers on solemn religious days",
        "Never filling in results, so the calendar teaches you nothing",
      ],
      selfCheck: [
        "Which local dates in the next two weeks would matter for a business you know?",
        "How many posts a week could that business keep up for three months?",
        "What would you put on three slides to convince an owner to approve your calendar?",
      ],
      practice_task_md: `**Goal:** Build a two week content calendar and a three slide proposal for a real or mock business.

**Steps:**
1. Choose a business and write its goal in one sentence.
2. In Google Sheets or another free spreadsheet, create the columns from the lesson.
3. Mark key dates in the next two weeks, then plan at least eight posts across two channels, mixing show, help, prove and ask.
4. Draft captions for at least four of them.
5. Make two of the posts for real, then build three slides: strategy, example post one, example post two.

**Done looks like:** A two week calendar with dates, channels, jobs and captions, plus a three slide proposal you could present in five minutes.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say consistency beats posting daily for one week?",
            options: [
              "Platforms quietly punish and hide accounts that post something new every single day of the week",
              "Daily posting costs more money in fees",
              "Businesses that post only when they remember look unreliable and get forgotten",
              "Customers only check apps once a week",
            ],
            answer_index: 2,
            explanation: "The lesson says a steady rhythm keeps a business remembered and reliable.",
          },
          {
            prompt: "What is batching?",
            options: [
              "Making several pieces of content in one sitting",
              "Posting the same graphic on every channel at once",
              "Deleting old posts in groups",
              "Sending one message to many customers",
            ],
            answer_index: 0,
            explanation: "Batching means producing content in one sitting to save time and data.",
          },
          {
            prompt: "What does the lesson suggest about posting on solemn religious days?",
            options: [
              "Post your biggest sales offer of the year, since many people are online and relaxed",
              "Never post anything during any holiday month",
              "Use only trending sounds on those days",
              "Be respectful, because a sales post on a solemn day can offend",
            ],
            answer_index: 3,
            explanation: "The lesson warns that sales posts on solemn religious days can offend customers.",
          },
          {
            prompt: "In Wumpini's calendar, why did week two get another tip video?",
            options: [
              "The owner asked for more videos only",
              "Her results column showed the help video brought the most booking messages",
              "Tip videos are cheaper to boost",
              "Instagram requires a video every week",
            ],
            answer_index: 1,
            explanation: "She filled in results and made more of what worked.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "social-and-messaging": {
      outcomes: [
        "Explain why chat, social and email are where many Ghanaian businesses sell",
        "Describe the different job each of these channels does",
        "Set professional standards for running a business account",
      ],
      explanation_md: `Walk through any Ghanaian market town and you will see it: traders taking orders on WhatsApp, salons showing hairstyles on Instagram, churches announcing events on Facebook, NGOs sending updates by email. For most small businesses, these channels are not "extra marketing". They are where selling happens. Job adverts for marketing assistants, social media marketers and junior digital marketers ask again and again for people who can run them well.

## Three kinds of channel, three jobs

* **Messaging apps** such as WhatsApp are where conversations turn into sales. Customers ask prices, send photos, pay by MoMo and arrange delivery. Speed and clarity matter most.
* **Social media** such as Facebook, Instagram and TikTok is where people discover a business and decide whether it looks trustworthy. Good pictures, regular posts and polite public replies matter most.
* **Email** is where a business keeps in touch with people who asked to hear from it. It is slower, but the business holds the list, so no app decides who sees the message.

Most businesses use two or three of these together. A shea butter seller might use TikTok to be discovered, WhatsApp to take orders and a monthly email for wholesale buyers.

## What "running it professionally" means

Many owners already have these accounts. What they lack is someone who runs them with care. That is your opportunity. Professional management means:

1. **Complete profiles.** The right name, a clear photo or logo, a short description, opening hours, location and one main contact number, the same on every channel.
2. **Regular, planned posts** that follow a content calendar instead of random bursts.
3. **Fast, polite replies** during opening hours, with prices and next steps included.
4. **Safe handling of money and data.** Never ask customers to share PINs or codes, confirm payments from the network's message rather than a screenshot, and ask permission before adding anyone to a list.
5. **Respect for people's attention.** No spam, no adding strangers to groups, an easy way to stop messages.
6. **Learning from results.** Use the free insights each platform gives to see what brings messages and orders.

## A weekly routine

A simple routine keeps several channels under control without taking over your day:

* **Daily:** check messages and comments at set times, such as morning, midday and evening, and post the planned Status or story.
* **Two or three times a week:** publish the planned posts on social media.
* **Weekly:** look at insights, note which posts brought messages or orders, and adjust next week's plan.
* **Monthly:** send the newsletter, tidy contact lists, remove anyone who asked to stop, and report results to the owner.

Write the routine down and share it with the owner, so everyone knows who replies when.

## Consent and data

When a business collects phone numbers or email addresses, those are personal data. Ghana's Data Protection Act, 2012 (Act 843) sets rules for how personal data is collected, used and kept, and the Data Protection Commission oversees it. In practice: ask clearly, explain what people will receive, keep lists private and stop messaging anyone who asks you to.

## Phone or computer

You can run all of these channels from a phone, and many marketers do. WhatsApp Business also has web and desktop versions, and Facebook, Instagram and email tools work in a browser, which helps when you type long replies, manage several clients or copy reports into a spreadsheet. Use whichever suits the task.

## What this section covers

* **WhatsApp Business.** Setting up a profile, catalogue, quick replies and labels, and using Status and broadcasts responsibly.
* **Facebook and Instagram pages.** Creating a page, posting well and reading the free insights.
* **Community management and customer care.** Replying to comments and messages, handling complaints and working with trusted local voices.
* **Email newsletters.** Building a list with consent and writing short, useful newsletters.

These are the skills local businesses will pay a beginner for first, and they build the habits every later role depends on.`,
      workedExample_md: `Sumaila, a marketing student in Tamale, offers to help a friend's family business, a provisions shop near Aboabo. He starts with a quick audit on his phone, using the six points from the lesson.

1. **Profiles:** the WhatsApp account is personal, the Facebook page has an old number and no opening hours. Not complete.
2. **Posts:** the last Facebook post was four months ago. Not regular.
3. **Replies:** some price questions waited a full day. Slow.
4. **Money and data:** the owner accepts payment screenshots without checking. Risky.
5. **Attention:** customers were added to a big group without being asked. A few have left angry.
6. **Results:** nobody looks at page insights.

He writes a one page plan: move the shop's number to WhatsApp Business with a full profile, fix the Facebook details, post three times a week, reply within the hour, confirm MoMo payments from the network message, and replace the group with a broadcast list for customers who agree to join.

The owner agrees to try it for one month. Sumaila now has a real before and after for his portfolio.`,
      keyTerms: [
        { term: "Messaging app", definition: "An app for direct conversations, such as WhatsApp, where many sales happen." },
        { term: "Social media", definition: "Platforms such as Facebook, Instagram and TikTok where people share and discover content." },
        { term: "Business profile", definition: "The public details of a business account: name, photo, description, hours and contacts." },
        { term: "Insights", definition: "Free statistics a platform gives about a page's followers and posts." },
        { term: "Consent", definition: "A person's clear agreement before you add them to a list or use their data." },
        { term: "Act 843", definition: "Ghana's Data Protection Act, 2012, which sets rules for using personal data." },
      ],
      commonMistakes: [
        "Treating these channels as extras instead of the place where selling happens",
        "Leaving old numbers and missing opening hours on profiles",
        "Adding customers to groups or lists without asking",
        "Asking customers for PINs or trusting payment screenshots",
      ],
      selfCheck: [
        "For a business you know, which channel does discovery, which does sales and which keeps in touch?",
        "How many of the six professional points would that business pass today?",
        "How would you explain consent to an owner who wants to add every customer to a group?",
      ],
      practice_task_md: `**Goal:** Audit how one business uses chat, social media and email.

**Steps:**
1. Pick a business that uses at least two of WhatsApp, Facebook, Instagram, TikTok or email.
2. Check it against the six points in the lesson and write one line for each: what is good and what is missing.
3. Message the business once as a customer would, and note how long the reply takes and whether it includes a price and next step.
4. Write three improvements, starting with the one that would help most this month.

**Done looks like:** A one page audit with notes on all six points, your reply time test, and three prioritised suggestions.`,
      quiz: {
        questions: [
          {
            prompt: "Which channel does the lesson describe as where conversations turn into sales?",
            options: [
              "Email newsletters sent to a list",
              "Search results on Google and Maps",
              "Messaging apps such as WhatsApp",
              "Radio adverts on local stations",
            ],
            answer_index: 2,
            explanation: "The lesson says messaging is where customers ask, pay and arrange delivery.",
          },
          {
            prompt: "How should a business confirm a mobile money payment?",
            options: [
              "Accept the screenshot the customer sends",
              "Ask the customer for their PIN to check",
              "Wait for the customer to post a confirmation in the comments under the latest post",
              "Check the message from the network, not a screenshot",
            ],
            answer_index: 3,
            explanation: "Screenshots can be faked, so confirm from the network's own message.",
          },
          {
            prompt: "Which law sets rules in Ghana for collecting and using customers' phone numbers and emails?",
            options: [
              "The Data Protection Act, 2012 (Act 843)",
              "The Companies Act",
              "The Labour Act",
              "The Food and Drugs Authority guidelines on cosmetics",
            ],
            answer_index: 0,
            explanation: "Act 843 covers personal data, overseen by the Data Protection Commission.",
          },
          {
            prompt: "What does the lesson say about running these channels on a phone or a computer?",
            options: [
              "They only work on a phone",
              "Either works; browser and desktop versions help with long replies and several clients",
              "A computer is required for WhatsApp Business",
              "Email cannot be used on a phone",
            ],
            answer_index: 1,
            explanation: "All can run from a phone, and computers help for some tasks.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "whatsapp-business": {
      outcomes: [
        "Set up a complete WhatsApp Business profile and catalogue",
        "Create quick replies, greeting and away messages and labels",
        "Use Status and broadcast lists without spamming customers",
        "Confirm payments safely and handle customer numbers with consent",
      ],
      explanation_md: `For many small businesses in Ghana, WhatsApp is the shop counter. Customers ask prices, send photos of what they want, confirm MoMo payments and arrange delivery in chat. Yet many owners still use a personal account, reply late and type the same answers all day. Setting up and running WhatsApp Business properly is one of the most practical services a beginner marketer can offer, and the app itself is free.

## The WhatsApp Business app

WhatsApp Business is a separate free app made for small businesses, available for Android and iPhone, with web and desktop versions for typing on a computer. A phone number can only be registered on one WhatsApp account at a time, so many owners move the shop's number to the business app or use a second SIM. The main tools, found in the app's business tools settings, are:

* **Business profile.** Name, short description, category, address, opening hours and email or website. A complete profile looks trustworthy.
* **Catalogue.** Products or services with photos, prices and descriptions that customers can browse inside the chat.
* **Quick replies.** Saved answers to common questions, sent with a short shortcut. For example, one message with prices, delivery areas and how to pay.
* **Greeting and away messages.** Automatic replies when someone messages for the first time or outside opening hours, so nobody feels ignored.
* **Labels.** Tags for chats such as "new order", "paid" and "delivered", so you can track orders without a notebook.
* **Status.** Photos, videos or text your contacts can see for 24 hours. Many local buyers check Status daily, so it works like a shop window.
* **Short link and QR code.** A link or code that opens a chat with the business, useful on flyers, stickers and social pages.

Menus and names change from time to time, so if a tool has moved, look in the app's settings or the WhatsApp Help Center.

## Setting up step by step

1. **Install WhatsApp Business** and register the business number. Back up any old chats first if the number was used on personal WhatsApp.
2. **Complete the profile:** clear logo or shopfront photo, a one line description that says what you sell and where, the right category, address and hours.
3. **Build the catalogue:** start with the best sellers. One good photo, a clear name, the price in cedis and a short description each.
4. **Write quick replies** for the three or four questions customers ask most: prices, delivery, how to pay, location.
5. **Set the greeting and away messages.** Keep them short and warm, and say when you will reply.
6. **Create labels** that match how orders move: new, paid, packed, delivered.
7. **Share the short link or QR code** on social pages, the shop wall and packaging.

## Good habits

* Reply quickly during opening hours. A fast answer often decides whether a person buys here or somewhere else.
* Put the price and payment details in replies. Hiding the price makes people leave.
* Confirm payments carefully. Check the MoMo message from the network, not a screenshot a customer sends, because fake screenshots are a common scam.
* Never ask a customer for a PIN or a verification code, and never share yours.

## Status and broadcasts, with consent

Broadcast lists let you send one message to many contacts privately. Only people who have saved the business number receive it, which is a good reason to ask happy customers to save it. Before adding anyone to a broadcast list or group, ask them. Phone numbers are personal data, and Ghana's Data Protection Act, 2012 (Act 843) requires consent before personal data is used for direct marketing; people can also ask you to stop. Keep broadcasts useful and occasional, and remove anyone who asks. Too many messages make people block the number, and WhatsApp may limit accounts that many people block or report.

For bigger businesses that need many staff on one number or automated messages, WhatsApp offers a separate paid business platform through official partners. For most small clients, the free app is enough.`,
      workedExample_md: `Mariama's basket group in Bolgatanga used a personal account, and orders got lost among family chats. You help them set up WhatsApp Business on the group's phone.

1. **Install and register** the group's number, after backing up old chats.
2. **Profile:** a photo of the weavers' stall, "Hand woven Bolga baskets, made by our women's group, delivery across Ghana", category, address near the market and hours.
3. **Catalogue:** twelve baskets with one daylight photo each, size, colour and price in cedis.
4. **Quick replies:** a shortcut for prices, one for delivery to Accra and Kumasi, one for MoMo payment details.
5. **Away message:** "Thank you for writing to us. We reply from 7am. Feel free to browse our catalogue."
6. **Labels:** new order, paid, packed, sent.
7. **Short link:** added to their Instagram bio and printed on a small card in every basket.

You also agree a rule with the group: payments are confirmed only from the network's message, and customers are added to the monthly broadcast list only after saying yes. Now any member can hold the phone and nothing gets lost.`,
      keyTerms: [
        { term: "WhatsApp Business", definition: "A free WhatsApp app for small businesses with profile, catalogue and messaging tools." },
        { term: "Catalogue", definition: "Products or services with photos and prices that customers browse inside WhatsApp." },
        { term: "Quick reply", definition: "A saved answer sent with a short shortcut to save typing." },
        { term: "Away message", definition: "An automatic reply sent when someone messages outside opening hours." },
        { term: "Label", definition: "A tag on a chat, such as paid or delivered, to track orders." },
        { term: "Broadcast list", definition: "A way to send one message privately to many contacts who have saved your number." },
      ],
      commonMistakes: [
        "Leaving the profile half empty with no hours, address or description",
        "Hiding prices so customers have to ask and often leave",
        "Accepting payment screenshots without checking the network message",
        "Adding customers to broadcasts or groups without asking them first",
        "Sending so many broadcasts that people block the number",
      ],
      selfCheck: [
        "What would you write in a one line description for a business you know?",
        "Which three or four quick replies would save a busy owner the most time?",
        "How would you ask customers for permission to send them updates?",
      ],
      practice_task_md: `**Goal:** Set up a complete WhatsApp Business profile for a real or practice business.

**Steps:**
1. With the owner's permission, or using your own practice number, set up WhatsApp Business.
2. Complete the profile: photo, description, category, address and hours.
3. Add at least five catalogue items with photos and prices.
4. Create three quick replies and a greeting and away message.
5. Create labels for the order stages.
6. Write a short consent message you would send before adding a customer to a broadcast list.

**Done looks like:** Screenshots of the profile, catalogue, quick replies and labels, plus your consent message, ready to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which WhatsApp Business tool lets you send a saved answer with a short shortcut?",
            options: ["Labels", "Product catalogue", "Status", "Quick replies"],
            answer_index: 3,
            explanation: "Quick replies are saved answers sent with a shortcut.",
          },
          {
            prompt: "Who receives a broadcast list message?",
            options: [
              "Only contacts who have saved the business number",
              "Everyone saved in the owner's phone book, whether or not they saved the number",
              "Anyone who has ever visited the shop",
              "All WhatsApp users in the same town",
            ],
            answer_index: 0,
            explanation: "Broadcasts only reach people who have saved the number.",
          },
          {
            prompt: "What should you do before adding a customer to a broadcast list?",
            options: [
              "Nothing, since they already know the business",
              "Ask them first, because consent is needed for direct marketing",
              "Add them and wait to see if they complain",
              "Ask for their MoMo PIN so you can confirm their identity before adding them",
            ],
            answer_index: 1,
            explanation: "The lesson says to ask first, in line with Act 843.",
          },
          {
            prompt: "Why can a phone number not be used on personal WhatsApp and WhatsApp Business at the same time?",
            options: [
              "WhatsApp Business only works on computers",
              "Business numbers must start with a special code",
              "A number can only be registered on one WhatsApp account at a time",
              "Personal accounts are not allowed in Ghana",
            ],
            answer_index: 2,
            explanation: "The lesson explains a number can only be on one WhatsApp account at a time.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "facebook-instagram": {
      outcomes: [
        "Create a Facebook Page and set up its key details",
        "Connect an Instagram professional account to the Page",
        "Write clear, engaging posts that suit each platform",
        "Read basic insights to see which posts work",
      ],
      explanation_md: `Facebook remains one of the places Ghanaians of many ages look for businesses, churches, events and NGOs, and Instagram is strong for anything visual: fashion, beauty, food, crafts and hospitality. Both are run by Meta, and both appear in Ghanaian marketing job adverts again and again. Knowing how to set up and run a page properly is a core skill.

## Profile, Page and Group

* A **personal profile** is for an individual. Do not run a business from one; it mixes private life with the business and limits what you can do.
* A **Facebook Page** is a public presence for a business, organisation or public figure. Anyone can follow it, and it has free insights and the option to run ads.
* A **Facebook Group** is a community space for discussion, such as a group for a church youth wing or a farmers' association. A business might run a group alongside its Page.

## Creating a Facebook Page

You need a personal Facebook account to create and manage a Page, but the Page is shown separately and your personal details stay private. Steps, which work on the app or in a browser:

1. **Open the menu** and find Pages, then choose to create a new Page. The exact wording moves from time to time, so search Facebook's Help Centre for "create a Page" if you cannot find it.
2. **Enter the name** customers know, such as "Hawa's Pure Shea, Tamale", and choose a category.
3. **Write a short bio:** what the business offers and where.
4. **Add contact details:** phone or WhatsApp number, address, opening hours and any website.
5. **Add a profile picture** (a logo or clear shopfront) and a cover photo that shows the products.
6. **Add a button** such as "Send WhatsApp message" or "Call now", if offered.
7. **Invite the first followers:** the owner's friends and loyal customers, without spamming.

Add other people as Page managers through the Page settings, rather than sharing a password. That way, access can be removed later.

## Instagram professional accounts

On Instagram, switch the business's account to a professional account (business or creator) in the settings. This adds contact buttons and insights. You can link it to the Facebook Page so you can manage both, and later run ads, from Meta's business tools.

## Writing posts that work

* **Lead with the picture.** On Instagram especially, the image or video does the first job.
* **Hook in the first line,** then detail, proof and a call to action.
* **Keep a rhythm,** following your content calendar. A few good posts a week beat daily filler.
* **Use local language and humour** where it fits the brand.
* **Hashtags** on Instagram help people find posts by topic. Use a few relevant ones, such as a product and a town, rather than a long list.
* **Reply to comments,** because conversation shows the page is alive.
* **Avoid engagement bait,** such as "Like if you agree, share to win". Meta discourages it and it rarely brings buyers.

## Facebook or Instagram first?

You do not have to use both equally. Facebook suits businesses whose customers are a wide range of ages, events that need details and directions, and organisations that want discussion in a Group. Instagram suits visual products and younger, style conscious audiences. Look at your audience description and start with the one your customers use most, then add the other when you can keep both up.

## Reading insights

Both platforms give free insights for Pages and professional accounts. You will see figures such as:

* **Reach:** how many different people saw a post.
* **Engagement or interactions:** likes, comments, shares and saves.
* **Link clicks and messages:** people taking action.
* **Followers:** growth over time, plus broad age, gender and location data.

Look weekly. Ask: which posts led to messages or orders? Which got reach but no action? Make more of what works. The analytics lesson goes deeper.

## Safety

Turn on two step verification for the personal accounts that manage the Page. Many Ghanaian businesses lose pages to hackers who send fake "copyright warning" messages asking for logins. Meta will not ask for your password in a message.`,
      workedExample_md: `Issahaku sets up a Facebook Page for a youth football academy in Wa, as a practice project for his cohort.

1. **Create the Page** from the menu on his phone, name it "Wa Young Stars Football Academy" and pick a sports category.
2. **Bio:** "Football training for boys and girls aged 8 to 16 in Wa. Weekend sessions, safe coaching."
3. **Contacts:** the coach's WhatsApp number, the training ground location and session times.
4. **Pictures:** the academy badge as profile picture, a team photo (parents agreed) as cover.
5. **Button:** "Send WhatsApp message".
6. **Managers:** he adds the coach, Coach Abdul-Rahman, as an admin through settings, instead of sharing a password, and both turn on two step verification.
7. **First posts:** a welcome post with the hook "Want your child to train with qualified coaches this Saturday?", a training photo, and a short video of a drill.

After two weeks he checks insights. The drill video reached the most people and brought three messages from parents. He plans one drill video every week.`,
      keyTerms: [
        { term: "Facebook Page", definition: "A public Facebook presence for a business or organisation, separate from a personal profile." },
        { term: "Facebook Group", definition: "A community space where members discuss a shared interest." },
        { term: "Professional account", definition: "An Instagram business or creator account with insights and contact options." },
        { term: "Reach", definition: "The number of different people who saw a post." },
        { term: "Engagement", definition: "Likes, comments, shares and saves on a post." },
        { term: "Hashtag", definition: "A word or phrase after a # that groups posts by topic." },
        { term: "Page manager", definition: "A person given access to run a Page without sharing passwords." },
      ],
      commonMistakes: [
        "Running a business from a personal profile instead of a Page",
        "Sharing passwords instead of adding managers through settings",
        "Using long lists of unrelated hashtags",
        "Chasing likes with engagement bait instead of posts that lead to messages",
        "Falling for fake \"copyright warning\" messages that ask for logins",
      ],
      selfCheck: [
        "What is the difference between a Page and a Group, and which would suit a business you know?",
        "Which details would a customer look for first on a new Page?",
        "If a post had high reach but no messages, what would you change next time?",
      ],
      practice_task_md: `**Goal:** Create a Facebook Page or Group for a mock project and write three posts.

**Steps:**
1. Choose a mock project, such as a school club, a shea butter brand or a community clean up.
2. Create a Facebook Page (or a Group, if discussion fits better) with name, category, bio, contacts and pictures.
3. Write three posts using hook, detail, proof and call to action, each with one image.
4. Add a friend or mentor as a manager through settings, not by sharing a password.
5. After a week, note reach and interactions for each post.

**Done looks like:** A complete Page or Group with three posts, screenshots of its details, and a short note on which post worked best and why.`,
      quiz: {
        questions: [
          {
            prompt: "What is the safest way to let another person help run a business Page?",
            options: [
              "Share the owner's password on WhatsApp",
              "Create a second personal profile for the business and share its login with them",
              "Add them as a Page manager through the Page settings",
              "Post the login details in a private group",
            ],
            answer_index: 2,
            explanation: "Adding managers through settings means access can be removed later.",
          },
          {
            prompt: "What does reach measure?",
            options: [
              "How many different people saw a post",
              "How many people bought after seeing a post",
              "How many hashtags a post used",
              "How many times the owner shared a post",
            ],
            answer_index: 0,
            explanation: "Reach is the number of different people who saw a post.",
          },
          {
            prompt: "What does the lesson suggest about hashtags on Instagram?",
            options: [
              "Use as many hashtags as the app allows, including popular ones unrelated to the product",
              "Hashtags only work on Facebook",
              "Never use hashtags on business accounts",
              "Use a few relevant ones, such as a product and a town",
            ],
            answer_index: 3,
            explanation: "A few relevant hashtags help people find posts by topic.",
          },
          {
            prompt: "A message claims to be from Meta and asks for your Page login to avoid a copyright strike. What should you do?",
            options: [
              "Send the password quickly so the Page is not deleted",
              "Ignore it and keep your login private, since Meta will not ask for passwords in a message",
              "Forward it to customers as a warning with your login",
              "Change the Page name",
            ],
            answer_index: 1,
            explanation: "Fake copyright warnings are a common way pages are stolen.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "community-management": {
      outcomes: [
        "Reply to comments and messages quickly, politely and usefully",
        "Handle a public complaint calmly and move details to private chat",
        "Spot scams and harmful comments and deal with them safely",
        "Work with trusted local voices honestly",
      ],
      explanation_md: `Posting is only half of social media. The other half is what happens after: comments, questions, complaints, praise and messages. Community management means looking after those conversations so people feel heard and want to come back. Ghanaian adverts for community managers, social media executives and marketing assistants often mention customer engagement, online reputation and partnerships with influencers. A business with friendly, fast replies wins customers from competitors who post nicer pictures but ignore people.

## Replying well

Every reply is public advertising for how the business treats people. A simple standard:

1. **Reply quickly.** Agree a target with the owner, such as within an hour during opening hours. Check comments and messages at set times if you manage several clients.
2. **Greet and use the name** if you can see it: "Thank you, Hawa".
3. **Answer the actual question,** including price and next step. "It is available in 250g and 500g. Send us a WhatsApp message on 024 000 0000 to order."
4. **Keep the brand voice** consistent, whether friendly, formal or playful.
5. **Close the loop.** If you promised to check something, come back with the answer.

Prepare a small bank of saved answers for common questions, then personalise them. Copy pasted replies that ignore the question annoy people.

## Handling complaints

Complaints in public feel scary, but handled well they build trust because other customers watch how the business responds. Use a calm pattern:

1. **Acknowledge** the problem without arguing: "We are sorry your order arrived late."
2. **Move details to private chat:** "Please send us a message with your order details so we can fix this." Never ask for personal or payment details in public.
3. **Fix it** if the complaint is fair: a replacement, a refund or a clear apology, as agreed with the owner.
4. **Report back** publicly if appropriate: "Thank you for your patience, this has been sorted."

Do not delete honest complaints just because they are negative. Deleting them makes people angrier and others notice. Hide or delete only spam, scams, hate, threats or personal information posted publicly, following the platform's rules.

## Scams and safety

Scammers often comment on business pages pretending to be the business, offering fake deals or asking customers to "verify" by sending a code. Watch for them and:

* Remind customers that the business will never ask for a PIN, password or verification code.
* Hide or delete scam comments and report the accounts.
* Keep one official number on every profile, so customers know which is real.

## Keeping a simple log

When you manage replies for a client, keep a small log in a spreadsheet: the date, the channel, the question or complaint, what you replied and whether it was solved. Over a month this shows the most common questions, which you can answer in posts or saved replies, and the problems the owner needs to fix in the business itself, such as slow delivery. It also gives you real evidence for your monthly report.

## Working with trusted local voices

Some people are trusted in their community: a popular radio presenter in Tamale, a church youth leader, a well known Accra stylist, a respected farmer. When these people speak well of a business, others listen. A simple, honest collaboration might be sending a product to try, inviting them to an event or agreeing a small fee for a post.

Two rules matter. First, choose people whose followers match the audience and whose behaviour fits the brand. Second, any paid or gifted post must be clearly labelled, for example with "paid partnership" or a clear note in the caption. Platforms have their own branded content tools and rules, so check the current ones. Hidden adverts damage trust when people find out. The specialisations roadmap covers finding and pitching micro influencers in detail.

## Building a community

Beyond replies, a community grows when people talk to each other: a question of the week, a customer photo shared with permission, a poll about which product to restock. Small, regular conversation makes followers feel part of something rather than just targets for adverts.`,
      workedExample_md: `Abdul-Rahman manages the Facebook Page of a Tamale bakery. One morning a customer, Amina, comments publicly: "Bought bread yesterday and it was already stale. Very disappointed."

He follows the pattern:

1. **Acknowledge, publicly, within the hour:** "Hello Amina, we are really sorry about yesterday's bread. That is not the standard we want for you."
2. **Move to private:** "Please send us a WhatsApp message on our official number, 024 000 0000, with the day and time you bought it, so we can put this right."
3. **Fix it:** after checking with the owner, he offers Amina a fresh loaf at her next visit. She learns a batch was packed while still warm, so the bakery changes its cooling routine.
4. **Report back:** "Thank you, Amina, for your patience. We have changed how we cool and pack our bread."

The same day, a fake account comments "Bakery giveaway, send your MoMo code to claim". He hides it, reports the account and pins a post reminding followers the bakery never asks for codes.

Amina later comments that the replacement loaf was lovely. Other customers saw the whole exchange.`,
      keyTerms: [
        { term: "Community management", definition: "Looking after the conversations around a brand so people feel heard and come back." },
        { term: "Response time", definition: "How long it takes a business to reply to a message or comment." },
        { term: "Online reputation", definition: "What people think and say about a business on the internet." },
        { term: "Influencer", definition: "A person whose opinion others trust and follow, online or in the community." },
        { term: "Paid partnership", definition: "A post a business has paid or given gifts for, which must be clearly labelled." },
        { term: "Hide a comment", definition: "Making a comment invisible to the public while it stays visible to its writer." },
      ],
      commonMistakes: [
        "Arguing with an angry customer in public",
        "Deleting honest complaints because they look bad",
        "Asking for order or payment details in public comments",
        "Letting scam comments sit on the page",
        "Posting paid or gifted content without labelling it",
      ],
      selfCheck: [
        "How would you reply, in two lines, to a public complaint about late delivery?",
        "Which comments should be hidden or deleted, and which should stay?",
        "Who are the trusted local voices in your town that a business could work with honestly?",
      ],
      practice_task_md: `**Goal:** Practise replying to comments and messages for a mock or real business.

**Steps:**
1. Write five realistic comments for a business you know: a price question, praise, a complaint, a scam comment and a question about delivery.
2. Write your reply to each, following the steps for replying well and handling complaints.
3. Write three saved answers for the most common questions.
4. Write a short pinned post reminding customers how to spot scams.
5. Ask a friend to role play an angry customer in chat for five minutes, and note what you would do differently.

**Done looks like:** Five replies, three saved answers, one safety post and a short note from your role play.`,
      quiz: {
        questions: [
          {
            prompt: "What is the first step when a customer complains publicly?",
            options: [
              "Delete the comment",
              "Acknowledge the problem calmly without arguing",
              "Ask for their MoMo number and order details in a public reply to the comment",
              "Ignore it and post something new",
            ],
            answer_index: 1,
            explanation: "The complaint pattern starts with acknowledging without arguing.",
          },
          {
            prompt: "Which comment is it right to hide or delete?",
            options: [
              "A scam comment asking customers to send codes",
              "An honest complaint from a customer about a late delivery last week",
              "A customer asking about prices",
              "Praise from a regular customer",
            ],
            answer_index: 0,
            explanation: "Only spam, scams, hate, threats and exposed personal data should be removed.",
          },
          {
            prompt: "What must happen when a trusted local voice is paid or gifted to post about a business?",
            options: [
              "Nothing, because posts by local voices do not count as adverts at all",
              "The post must be deleted after a week",
              "The post should pretend to be a normal recommendation",
              "The post must be clearly labelled as paid or a partnership",
            ],
            answer_index: 3,
            explanation: "Paid or gifted posts must be labelled; hidden adverts damage trust.",
          },
          {
            prompt: "Why does the lesson warn against copy pasted replies that ignore the question?",
            options: [
              "Platforms ban saved replies",
              "They are slower to send than typed replies",
              "They annoy people, so saved answers should be personalised",
              "They use more data than typed replies",
            ],
            answer_index: 2,
            explanation: "Saved answers help, but they should be personalised to the question.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "email-marketing": {
      outcomes: [
        "Build an email list with clear consent and an easy way to unsubscribe",
        "Draft a short newsletter with a strong subject line and one main message",
        "Explain the content choices behind a newsletter",
        "Name the numbers to watch after sending",
      ],
      explanation_md: `Email may feel old fashioned next to TikTok, but many Ghanaian marketing adverts ask for it, from agencies and agritech companies to think tanks and NGOs, and remote marketing assistant roles often do too. The reason is simple: an email list belongs to the business. No algorithm decides whether subscribers see the message, and if a social account is hacked or blocked, the list is still there.

## Who uses email

* **NGOs and think tanks** send newsletters to donors, partners and journalists.
* **Schools and churches** send updates to parents and members who want something they can keep.
* **Online shops and companies that sell to other businesses** send offers, new stock alerts and reminders.
* **Startups** send welcome messages and tips to new users.

## Building a list the right way

People must agree to receive your emails. Collect addresses through a sign up form, at an event with a clear note of what people are signing up for, or when a customer orders and ticks a box. Never buy lists or add people without asking. Ghana's Data Protection Act, 2012 (Act 843) requires consent before personal data is used for direct marketing and gives people the right to ask you to stop; the Data Protection Commission oversees it. Every marketing email should include a simple way to unsubscribe, and you must honour those requests promptly.

## Writing a newsletter, step by step

1. **Decide the one main message.** One event, one offer or one story. Everything else is secondary.
2. **Write the subject line.** Short and specific. "Harvest thanksgiving: Sunday 10am" beats "Newsletter". Many tools also let you add preview text, the short line people see next to the subject.
3. **Open with the reader in mind.** A friendly greeting, using their name if your tool allows, then straight to what matters to them.
4. **Keep the body short.** Short paragraphs, large text and one or two small images. Many people read on a phone, others on a computer at work; design for both.
5. **Add one clear button or link** for the main action, such as "Register for Saturday's training".
6. **Add one or two short extras** if useful: a tip, a thank you, a date to remember.
7. **Finish with contact details and an unsubscribe link.**
8. **Test before sending.** Send it to yourself, open it on a phone and a computer, click every link and check every date.

## Explaining your choices

Clients and mentors often ask why you wrote a newsletter the way you did. Be ready to explain: who it is for, why this is the main message, why the subject line should get it opened, why the button says what it says, and what you left out to keep it short. Being able to give reasons shows you think like a marketer, not just a writer.

## How often

Regular but not constant. A steady monthly or fortnightly newsletter is better than a flood followed by months of silence. Tell people at sign up how often to expect it, and keep that promise.

## Tools

You can start with Gmail and a small list, using the blind copy (Bcc) field so subscribers cannot see each other's addresses. Email marketing tools such as Mailchimp, Brevo or MailerLite add sign up forms, templates, automatic unsubscribe links and reports. Many have free plans with limits that change, so check the current plan before you promise anything to a client.

## Numbers to watch

* **Opens:** a rough sign of whether the subject line worked. Some email apps block or fake opens, so treat this number with care.
* **Clicks:** how many people clicked the main link. This is usually more reliable.
* **Replies:** a strong sign that people value the newsletter.
* **Unsubscribes:** a few are normal; a sudden jump means something annoyed people.

Use them to improve the next issue, and include them in client reports.`,
      workedExample_md: `Amina volunteers for a youth NGO in Wa that only posted on Facebook. She adds a sign up form to their page that says "Get one email a month about our trainings. Unsubscribe any time." At a community event she collects more emails on a paper sheet with the same note.

Her first newsletter:

* **Subject:** "Free CV workshop in Wa, Saturday 9am"
* **Preview text:** "Plus photos from last month's coding day"
* **Opening:** "Hello Fuseini, our next free workshop is this Saturday."
* **Body:** two short paragraphs on what participants will learn, where and when.
* **Button:** "Reserve your seat"
* **Extra:** two photos and one line of thanks to volunteers.
* **Footer:** contact number, office address, unsubscribe link.

She tests it on her phone and a library computer, then sends.

When the director asks why she wrote it this way, she explains: the audience is young job seekers, so the workshop is the main message; the subject line gives the what, where and when; there is one button so people know what to do; and she left out a long history of the NGO to keep it short. A week later she reports clicks, three replies and no unsubscribes.`,
      keyTerms: [
        { term: "Email list", definition: "Addresses of people who agreed to receive emails from a business." },
        { term: "Consent", definition: "A person's clear agreement to receive marketing messages." },
        { term: "Subject line", definition: "The title of an email that people see before opening it." },
        { term: "Preview text", definition: "The short line shown next to the subject in many inboxes." },
        { term: "Unsubscribe link", definition: "A link that lets a person stop receiving emails." },
        { term: "Click rate", definition: "The share of people who clicked a link in the email." },
        { term: "Bcc", definition: "Blind copy: a field that hides recipients' addresses from each other." },
      ],
      commonMistakes: [
        "Buying a list or adding people who never agreed",
        "Sending a newsletter with five equal messages and no main one",
        "Putting all addresses in the To field so everyone sees them",
        "Forgetting the unsubscribe link or ignoring unsubscribe requests",
        "Sending without testing links and dates",
      ],
      selfCheck: [
        "What would the one main message be in a newsletter for an organisation you know?",
        "How would you explain your subject line choice to a client?",
        "What would you tell someone who wants to add every customer's email to a list without asking?",
      ],
      practice_task_md: `**Goal:** Draft a short newsletter for a mock organisation's weekly update and explain your content choices.

**Steps:**
1. Choose a mock organisation, such as a church, school club, NGO or shop.
2. Write a one sentence consent note for its sign up form.
3. Draft the newsletter in Google Docs or Gmail: subject, preview text, opening, short body, one button or link, one extra and a footer with unsubscribe.
4. Send it to yourself and check it on at least one screen size.
5. Write a short paragraph explaining your choices: audience, main message, subject line, button and what you left out.

**Done looks like:** A tested newsletter draft and a paragraph explaining your choices, ready to submit or show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say an email list is valuable to a business?",
            options: [
              "The business holds the list, so no algorithm decides who sees the message",
              "Emails always get more replies and more sales than any other marketing channel in Ghana",
              "Email is the only channel that is free",
              "Emails cannot be ignored by the reader",
            ],
            answer_index: 0,
            explanation: "The list belongs to the business, independent of social apps.",
          },
          {
            prompt: "Which subject line follows the lesson's advice?",
            options: [
              "Newsletter",
              "Important update for all our members, please read",
              "Free CV workshop in Wa, Saturday 9am",
              "Hello",
            ],
            answer_index: 2,
            explanation: "Good subject lines are short and specific.",
          },
          {
            prompt: "Why should you treat the open rate with care?",
            options: [
              "Opens are never recorded at all",
              "It only counts people who unsubscribe",
              "It measures clicks, not opens",
              "Some email apps block or fake opens",
            ],
            answer_index: 3,
            explanation: "The lesson notes some apps block or fake opens, so clicks are more reliable.",
          },
          {
            prompt: "When sending from Gmail to a small list, why use the Bcc field?",
            options: [
              "It makes the email arrive faster",
              "It hides subscribers' addresses from each other",
              "It adds an unsubscribe link automatically",
              "It translates the email for each reader",
            ],
            answer_index: 1,
            explanation: "Bcc keeps each person's address private from the others.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "search-and-local": {
      outcomes: [
        "Explain how search differs from social media",
        "Tell apart two kinds of search visibility",
        "Check how visible local businesses are in search",
      ],
      explanation_md: `When someone in Tamale needs a phone repairer, a guest house or a printing shop, many of them open Google or Google Maps and type what they want. Those people are not scrolling for fun. They want something now. Businesses that show up with correct details, good photos and genuine reviews often get the call. Search skills appear in several Ghanaian digital marketing adverts, and they are a full specialisation in SydCrest's Delta Mentoring Program.

## How search differs from social media

On social media, you put content in front of people who were not looking for it. On search, people come looking, and your job is to be found and to look trustworthy when they arrive. That changes how you think:

* You start from the words people type, not from what you want to say.
* Accuracy matters a lot. A wrong phone number or closed hours lose the customer instantly.
* Results build slowly. Search work often takes weeks or months to show, but it keeps working once it does.

## Two kinds of search visibility

* **Local search.** Results on Google Maps and the map box that appears for searches like "pharmacy near me" or "hotel in Bolgatanga". These mostly come from Google Business Profile listings.
* **Organic search.** The ordinary list of web pages that Google ranks for a search. Getting there is the work of search engine optimisation, or SEO.

There are also paid search ads, which appear above or among results. You will meet those in the paid advertising section.

## What this section covers

* **Google Business Profile:** creating and keeping a free listing that shows on Maps and Search.
* **SEO and keyword basics:** how search engines find and rank pages, and how to research what people actually type.

Even businesses without a website can benefit. A complete Business Profile, an active social page and consistent details everywhere already help people find them.

## A small example

Sumaila runs a guest house in Bolgatanga. Travellers kept saying they could not find it, and some went to a competitor whose listing showed up on Maps with photos and reviews. You search "guest house Bolgatanga" and confirm his business is missing. You help him create a Business Profile with the right location pin, phone number, photos of the rooms and hours, and complete Google's verification steps. Over the next weeks, he asks happy guests to leave honest reviews. Travellers start calling from the listing, and he tells you which calls came from Maps so you can track it.`,
      practice_task_md: `**Goal:** Check how visible a few local businesses are in search.

**Steps:**
1. Pick three types of business in your town, such as a pharmacy, a guest house and a tailor.
2. On Google and Google Maps, search for each type plus your town name, for example "tailor Tamale".
3. Note which businesses appear, whether their details look correct, whether they have photos, and whether they have reviews.
4. Find one real business you know that is missing or has a poor listing.
5. Write three things that business could do to be found more easily.

**Done looks like:** A short table of search results for three searches and a note of recommendations for one business.`,
      quiz: {
        questions: [
          {
            prompt: "How do people on search differ from people scrolling social media?",
            options: [
              "They are looking for something specific, often right now",
              "They never buy anything",
              "They only want entertainment",
              "They cannot see business details such as phone numbers or opening hours",
            ],
            answer_index: 0,
            explanation: "On search, people come looking with a need.",
          },
          {
            prompt: "Where do most local results on Google Maps come from?",
            options: [
              "Facebook Pages",
              "WhatsApp catalogues",
              "Google Business Profile listings",
              "Email newsletters",
            ],
            answer_index: 2,
            explanation: "The lesson says local results mostly come from Google Business Profile listings.",
          },
          {
            prompt: "What is SEO?",
            options: [
              "Paying for ads that appear above the ordinary search results",
              "A type of social media video",
              "A rule for email newsletters",
              "The work of getting pages to rank in ordinary search results",
            ],
            answer_index: 3,
            explanation: "Search engine optimisation aims at organic search results.",
          },
          {
            prompt: "Can a business without a website still improve its search visibility?",
            options: [
              "No, search only works for businesses that have their own website",
              "Yes, with a complete Business Profile and consistent details",
              "Only by buying ads",
              "Only if it has more than one branch",
            ],
            answer_index: 1,
            explanation: "The lesson says a complete Business Profile and consistent details already help.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "google-business-profile": {
      outcomes: [
        "Set up a Google Business Profile",
        "Manage reviews",
        "Keep a profile fresh",
      ],
      explanation_md: `A Google Business Profile is the box with a business's name, map pin, photos, hours, phone number and reviews that appears on Google Maps and in Google Search. It is free, it works even without a website, and for a nearby customer it is often the first thing they see. Setting up and maintaining profiles is a simple, valuable service for shops, guest houses, clinics, schools and churches, and it appears in both Google's free Skillshop training and the DMP cohort.

## Setting up a profile

You can create a profile from Google Maps or Google's Business Profile pages. The main fields are:

* **Business name.** The real name the business uses on its signboard. Do not stuff extra keywords into it, such as "Best Cheap Tailor Tamale". That breaks Google's guidelines and can get the profile suspended.
* **Category.** The main type of business, such as "Tailor" or "Guest house". Choose the most accurate one.
* **Location or service area.** A shop customers visit gets an exact map pin. A business that travels to customers, like a plumber, can show a service area instead of a home address.
* **Hours.** Including special hours for holidays.
* **Phone number and website or social link.** A WhatsApp number works if that is how the business takes orders.
* **Photos.** The outside so people can recognise it, the inside, products and staff (with permission).

Google then asks the owner to verify that they really run the business. The methods vary by country and change over time, so follow the steps Google shows.

## Reviews

Reviews strongly influence whether people trust a business. Good practice:

* Ask happy customers to leave an honest review, for example with a short link or a QR code at the counter.
* Never pay or reward people for reviews, never write reviews for your own client, and never post fake ones. Google's policies forbid this and can remove reviews or the profile.
* Reply to every review politely. Thank people for good ones. For bad ones, apologise, explain what you will do and invite them to contact you.

## Keeping it fresh

Update hours before holidays, add new photos regularly, and use the updates or posts feature to share offers and events. A profile with recent activity looks alive.

## A worked example

Fuseini helps a clinic in Tamale whose Maps pin pointed to the wrong street. Patients kept getting lost. He works with the clinic manager to correct the pin, set the right category, add clear photos of the entrance and signboard, and list special Eid and Christmas hours. He prints a small card at reception with a QR code asking patients to share honest feedback. Months later the clinic has a set of genuine reviews and the manager replies to each one.`,
      practice_task_md: `**Goal:** Audit and improve a Google Business Profile, or plan one for a business that has none.

**Steps:**
1. Find a local business on Google Maps. If it has a profile, check every field: name, category, pin, hours, phone, photos and reviews.
2. List anything wrong or missing, and whether reviews get replies.
3. If the business has no profile, write out every field it would need, ready for the owner to create and verify it with you.
4. Draft two review replies: one for a five star review and one for a disappointed customer.
5. Share your findings with the owner, kindly and briefly.

**Done looks like:** A one page audit or setup plan plus two review reply drafts. Do not create or claim a profile for a business without the owner's permission.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you not add extra keywords to the business name on a profile?",
            options: [
              "It breaks Google's guidelines and can get the profile suspended",
              "Google only allows names in capital letters",
              "It makes the map pin move",
              "Customers cannot read long names, so the profile gets fewer calls",
            ],
            answer_index: 0,
            explanation: "The name should match the real business name; keyword stuffing breaks the guidelines.",
          },
          {
            prompt: "A plumber travels to customers' homes. What should their profile show?",
            options: [
              "Their personal home address",
              "No location information at all",
              "A service area instead of a home address",
              "A competitor's address",
            ],
            answer_index: 2,
            explanation: "Businesses that travel to customers can show a service area.",
          },
          {
            prompt: "Which of these is allowed when collecting reviews?",
            options: [
              "Giving free airtime to anyone who leaves five stars",
              "Writing reviews for your own client",
              "Posting reviews from made up names",
              "Asking happy customers to leave an honest review",
            ],
            answer_index: 3,
            explanation: "Asking for honest reviews is fine; paying, rewarding or faking reviews is not.",
          },
          {
            prompt: "How should a business respond to a bad review?",
            options: [
              "Ignore it completely",
              "Apologise, say what you will do and invite them to get in touch",
              "Argue that the customer is lying",
              "Ask friends and family to post good reviews so it gets pushed down",
            ],
            answer_index: 1,
            explanation: "A polite reply with a plan shows other customers the business cares.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "seo-basics": {
      outcomes: [
        "Explain how search engines work",
        "Do free keyword research",
        "Apply on page and off page basics",
      ],
      explanation_md: `Search engine optimisation, or SEO, is the work of helping web pages appear when people search for what a business offers. Several Ghanaian marketing adverts ask for SEO and keyword research, an agritech company wanted content writers who understand it, and it is one of the three DMP specialisations. You can learn the basics without paying for any tools.

## How search engines work

In simple terms, a search engine like Google does three things:

* **Crawls.** Automated programs follow links to discover pages on the web.
* **Indexes.** It stores and organises what each page is about.
* **Ranks.** When someone searches, it chooses which pages are most helpful for that search and in what order.

Google says it aims to show helpful, reliable content made for people. There is no trick that guarantees the top spot, and anyone promising one is not being honest.

## Start with keywords

Keywords are the words and phrases people actually type. You find them by thinking like a customer and checking what Google suggests:

* **Autocomplete.** Start typing "shea butter" and see what Google suggests.
* **Related searches and questions.** Look at the questions and related searches Google shows on the results page.
* **Google Trends.** Compare interest in different phrases over time and by region.
* **Local phrases.** Many searches combine a service and a place: "basket weavers Bolgatanga", "event centre Tamale".

Also think about **intent**: what does the person want? "How to store shea butter" is someone seeking information. "Buy shea butter Tamale" is someone ready to buy. Match the page to the intent.

## On page basics

* **Page title.** Each page gets a clear, unique title containing its main keyword, such as "Handwoven Bolgatanga Baskets | Mariama Weavers".
* **Meta description.** A short summary that may show under the title in results, written to make people click.
* **Headings and content.** Answer the searcher's question clearly. Use the keyword naturally, never stuffed.
* **Fast and mobile friendly.** Many visitors are on phones with limited data, and Google considers page experience.

## Off page basics

Links from other trusted sites help search engines see a page as credible. For a local business, that might be a mention on a local news site, a tourism directory or a partner's website. Never buy links or join link schemes; they break Google's spam policies.

## A worked example

Mariama's basket group has a simple website. Wumpini checks autocomplete and finds people search "Bolgatanga basket price" and "Bolga baskets wholesale". She rewrites the homepage title and adds a clear section on sizes, prices and wholesale orders. She also asks a regional tourism blog that already features local crafts to link to them.`,
      practice_task_md: `**Goal:** Do free keyword research and write search friendly titles for a local business.

**Steps:**
1. Pick a business, such as a shea butter producer, a guest house or a printing shop.
2. Using Google autocomplete, related searches and Google Trends, collect ten keyword phrases people might use.
3. Mark each phrase as information seeking or ready to buy.
4. Write a page title and a meta description for the business's main page, using the best keyword naturally.
5. Suggest two trusted local websites or directories that could mention the business.

**Done looks like:** A short Google Doc with your keyword list, intent labels, a title, a description and two link ideas.`,
      quiz: {
        questions: [
          {
            prompt: "What are the three things a search engine does, in simple terms?",
            options: [
              "Posts, likes and shares",
              "Crawls, indexes and ranks",
              "Designs, prints and delivers",
              "Buys, sells and refunds",
            ],
            answer_index: 1,
            explanation: "Search engines discover pages, store them and choose the order to show them.",
          },
          {
            prompt: "Which search shows someone who is ready to buy?",
            options: [
              "How to store shea butter",
              "History of shea trees",
              "Buy shea butter Tamale",
              "What is shea butter made from",
            ],
            answer_index: 2,
            explanation: "\"Buy\" plus a place shows buying intent; the others seek information.",
          },
          {
            prompt: "What does the lesson say about buying links?",
            options: [
              "It breaks Google's spam policies and should be avoided",
              "It is the fastest safe way to rank",
              "It is required for local businesses",
              "It only works for websites in Ghana",
            ],
            answer_index: 0,
            explanation: "Buying links or joining link schemes breaks Google's spam policies.",
          },
          {
            prompt: "Which of these is a free way to find keywords mentioned in the lesson?",
            options: [
              "Asking a competitor for their password",
              "Guessing without checking",
              "Paying for followers",
              "Google autocomplete suggestions",
            ],
            answer_index: 3,
            explanation: "Autocomplete, related searches and Google Trends are free sources of keywords.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "paid-ads": {
      outcomes: [
        "Explain how online ads work and their building blocks",
        "Follow advertising rules responsibly",
        "Write a simple ad brief",
      ],
      explanation_md: `Free posting only reaches some of the people who follow a page, and growing an audience from nothing takes time. Paid advertising lets a business pay a platform such as Meta, TikTok or Google to show its message to chosen people beyond its followers. Ghanaian adverts for digital marketers often mention Meta Ads and Google Ads, and Google Ads is one of the DMP specialisations. Handling a client's ad money carefully is a big responsibility, so this section starts with the basics.

## How online ads work

Most ad platforms run an **auction**. Many advertisers want to show ads to the same people. Each time there is space for an ad, the platform picks which one to show, based on how much advertisers are willing to pay and how relevant and useful their ad seems. That means a clear, relevant ad can sometimes beat a bigger budget.

Advertisers usually pay in one of a few ways:

* **Per thousand views (impressions).** Common for awareness campaigns.
* **Per click.** Common on search ads.
* **Per result.** The platform optimises toward an action you choose, such as messages or sign ups, and reports what each one cost.

## The building blocks

Whichever platform you use, every campaign needs the same decisions:

* **Goal.** What should happen? Awareness, website visits, WhatsApp messages, sign ups or sales.
* **Audience.** Who should see it? Location, age, interests, or the words they search.
* **Budget and schedule.** How much per day or in total, and for how long.
* **Creative.** The image or video and the words.
* **Destination.** Where people go after clicking: a WhatsApp chat, a page, a form or a website.

## Rules and responsibility

All platforms review ads against their policies. Some topics, such as health products, financial services, jobs, politics and alcohol, have extra rules or restrictions. Read the policy before you build, or the ad may be rejected. Billing methods and currencies also differ by country and change over time, so check each platform's billing help for Ghana before promising a client anything.

## What this section covers

* **Social media ads:** campaigns on Meta and similar platforms.
* **Search ads:** keyword based ads on Google.
* **Budgets and payment for ads:** planning in cedis, records and clear agreements.

## A small example

A church in Tamale wants more young people at a youth conference. Issahaku sets a goal of WhatsApp messages from people aged 18 to 30 within 20 km of Tamale, a modest daily budget for ten days, a short video from last year's event and a button that opens a chat with the youth leader. Every decision is written down and agreed before he spends a cedi.`,
      practice_task_md: `**Goal:** Write a simple ad brief before touching any ad platform.

**Steps:**
1. Choose a real or realistic goal, such as a church event, a MoMo promotion at a vendor or a new product at a shea butter shop.
2. Write down the five building blocks: goal, audience, budget and schedule, creative, destination.
3. Look up the platform's advertising policy for any topic that might be restricted, such as health or finance, and note what you find.
4. Ask a friend or mentor to read the brief and point out anything unclear.

**Done looks like:** A one page ad brief with all five blocks filled in and a note on policy checks. Do not spend money on this task.`,
      quiz: {
        questions: [
          {
            prompt: "How do most ad platforms decide which ad to show?",
            options: [
              "Whoever registered the ad account first always wins the space",
              "An auction based on bids and how relevant each ad seems",
              "Ads are shown in alphabetical order",
              "The platform picks at random",
            ],
            answer_index: 1,
            explanation: "Platforms run auctions that consider both bids and relevance.",
          },
          {
            prompt: "Which payment method is common on search ads?",
            options: ["Per click", "Per follower", "Per month of posting", "Per comment"],
            answer_index: 0,
            explanation: "The lesson notes that paying per click is common on search ads.",
          },
          {
            prompt: "Which of these is one of the five building blocks of every campaign?",
            options: ["Page password", "Logo colour", "Audience", "Competitor's budget"],
            answer_index: 2,
            explanation: "Goal, audience, budget and schedule, creative and destination are the building blocks.",
          },
          {
            prompt: "Why should you check billing help for Ghana before promising a client anything?",
            options: [
              "Ads are banned in Ghana",
              "Billing is always free in Ghana",
              "Platforms only accept cash payments at their offices in Accra",
              "Billing methods differ by country and change over time",
            ],
            answer_index: 3,
            explanation: "The lesson says billing details vary and change, so check current help pages.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "social-ads": {
      outcomes: [
        "Tell boosting from a full campaign",
        "Organise a Meta campaign and choose an audience",
        "Start small, test and follow the rules",
      ],
      explanation_md: `Many small businesses in Ghana have tapped the "Boost" button on a Facebook or Instagram post and wondered where their money went. A marketer who can set up a proper campaign with a clear goal, the right audience and honest tracking is worth paying. Meta Ads appear in Ghanaian digital marketer adverts, and the DMP social media specialisation builds directly on this lesson.

## Boosting versus a full campaign

**Boosting** a post is quick: you pick a post, an audience, a budget and a duration. It suits simple goals. **Ads Manager** gives you more control over goals, audiences, placements and testing. Learn both, but understand why you are choosing one.

## How a Meta campaign is organised

Ads Manager has three levels:

* **Campaign.** Where you choose the objective, such as awareness, traffic, engagement, leads or sales. The names may change, but the idea stays: tell the platform what result you want.
* **Ad set.** Where you choose the audience, budget, schedule and placements (Facebook, Instagram, and others).
* **Ad.** The creative: image or video, text, headline and button.

A popular option for Ghanaian businesses is an ad that opens a WhatsApp chat, so interested people can ask questions and order the way they already prefer.

## Choosing an audience

* **Location.** A town, or a radius around a shop. A Tamale chop bar does not need viewers in Takoradi.
* **Age and other basics** when they truly matter.
* **Interests.** Use them carefully; they are estimates.
* **Custom audiences.** People who have engaged with the page or messaged the business before.

Keep audiences reasonably broad at first and let the platform learn. Very narrow audiences can make ads expensive.

## Start small and test

Run a small test first. Change one thing at a time, such as two different images with the same text, and compare the cost per result after a few days. This is called an A/B test. Keep what works, stop what does not, and only then increase the budget.

## Follow the rules

Ads must follow Meta's advertising standards. Some topics, such as credit, jobs, health products and political or social issues, have extra rules. Never make claims you cannot support.

## A worked example

Hawa wants more orders for her shea butter gift packs before Christmas. Abdul-Rahman sets up a campaign whose goal is WhatsApp messages, with an audience of adults within a set distance of Tamale, a small daily budget and two versions of the ad: one photo and one short video. After four days the video brings messages at a lower cost, so he pauses the photo and moves its budget to the video. He records every message and sale in a sheet so Hawa can see what the money achieved.`,
      practice_task_md: `**Goal:** Build a practice social ad campaign up to the review step without spending money.

**Steps:**
1. Using a practice Facebook Page, open Meta Ads Manager on a phone browser or laptop.
2. Create a campaign with a clear objective that fits a local business goal.
3. Set an ad set with a location, a basic audience, a small daily budget and a short schedule.
4. Create two ad versions with different images or videos but the same text.
5. Stop at the review screen. Take screenshots of each level, then leave the campaign as a draft or delete it. Do not publish or add payment details.

**Done looks like:** Screenshots of the campaign, ad set and two ads, plus two sentences explaining your choices.`,
      quiz: {
        questions: [
          {
            prompt: "At which level of a Meta campaign do you choose the audience and budget?",
            options: ["Campaign", "Ad set", "Ad", "Page settings"],
            answer_index: 1,
            explanation: "The ad set holds the audience, budget, schedule and placements.",
          },
          {
            prompt: "Why might a Ghanaian business choose an ad that opens a WhatsApp chat?",
            options: [
              "People can ask questions and order the way they already prefer",
              "WhatsApp ads are always free",
              "It removes the need for a budget because WhatsApp chats are free",
              "It shows the ad only to the owner",
            ],
            answer_index: 0,
            explanation: "Many local customers prefer to order through WhatsApp chat.",
          },
          {
            prompt: "What is an A/B test?",
            options: [
              "Running ads in two countries at once",
              "Doubling the budget every day until the ad gets more messages",
              "Asking two friends to like the ad",
              "Changing one thing, such as the image, and comparing results",
            ],
            answer_index: 3,
            explanation: "An A/B test compares versions that differ in one thing.",
          },
          {
            prompt: "What did Abdul-Rahman do after the video ad brought messages at a lower cost?",
            options: [
              "Stopped all advertising",
              "Doubled the photo ad budget",
              "Paused the photo ad and moved its budget to the video",
              "Changed every setting at once",
            ],
            answer_index: 2,
            explanation: "He kept what worked and stopped what did not.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "search-ads": {
      outcomes: [
        "Choose keywords for search ads",
        "Write a search ad",
        "Explain how the ad auction works",
      ],
      explanation_md: `Search ads appear when someone types a search on Google, often marked as sponsored, above or among the normal results. Because the person is already looking, these ads can bring customers who are ready to act. Some Ghanaian digital marketer adverts list Google Ads as a must have, and Google Ads (search marketing) is one of the three DMP specialisations. Google's free Skillshop training includes a Google Ads Search certification you can add to your CV.

## Keywords are the heart of it

With search ads, you choose keywords that should trigger your ad. Google offers **match types** that control how closely a search must match:

* **Broad match.** Shows for searches related to your keyword, giving the most reach but less control.
* **Phrase match.** Shows for searches that include the meaning of your phrase.
* **Exact match.** Shows for searches with the same meaning as your keyword, giving the most control.

**Negative keywords** stop your ad showing for searches you do not want. A paid printing service might add "free" so it does not pay for clicks from people looking for free printing.

## Writing the ad

Search ads are mostly text. Google lets you write several headlines and descriptions, then tests combinations. Good search ads:

* Repeat the words the person searched, so it is clearly relevant.
* Give a reason to choose you: location, price, speed, trust.
* End with an action: call, visit, order.
* Send people to a page that matches the ad. If the ad says "Event hall in Tamale", the page should show the hall, prices and how to book.

## How the auction works

You set a budget and a bid strategy. Google's auction looks at your bid and the quality of your ad, including how relevant it is and how useful the landing page seems. Better quality can mean lower costs, so relevance matters as much as money. You usually pay when someone clicks.

## Keyword Planner and practice

Google's Keyword Planner, inside Google Ads, suggests keywords and gives rough search estimates. Skillshop's Google Ads courses walk you through campaign setup with examples, which is a safe way to practise before using a client's money.

## A worked example

Sumaila owns an event centre in Tamale. Amina builds a small search campaign with phrase match keywords like "event centre Tamale" and "wedding venue Tamale", adds negatives like "jobs" and "free", and writes headlines such as "Wedding Venue in Tamale" and "Book a Viewing Today". The ad links to a page with photos, capacity and a WhatsApp booking button. She checks the search terms report weekly and adds new negatives when irrelevant searches appear.`,
      practice_task_md: `**Goal:** Plan a small search campaign and start the free Skillshop training.

**Steps:**
1. Pick a local business that people search for, such as an event centre, a guest house or a printing shop.
2. In Google Sheets, list ten keywords with a match type for each, and five negative keywords.
3. Write three headlines and two descriptions for one ad, keeping them short and relevant.
4. Describe the landing page the ad should send people to.
5. Begin the free Google Ads Search course on Skillshop and note one thing you learned.

**Done looks like:** A shared sheet with keywords, negatives and ad text, plus a note on your Skillshop progress. Do not spend money on this task.`,
      quiz: {
        questions: [
          {
            prompt: "Which match type gives the most control over which searches show your ad?",
            options: ["Broad match", "Phrase match", "Exact match", "Negative match"],
            answer_index: 2,
            explanation: "Exact match gives the most control, while broad match gives the most reach.",
          },
          {
            prompt: "Why would a paid printing service add \"free\" as a negative keyword?",
            options: [
              "So the ad does not show to people looking for free printing",
              "To make the ad cheaper for everyone",
              "Because Google bans the word free",
              "To show the ad only on weekends",
            ],
            answer_index: 0,
            explanation: "Negative keywords stop the ad appearing for unwanted searches.",
          },
          {
            prompt: "What does Google's auction consider besides your bid?",
            options: [
              "How many followers your Facebook page has and how active they are",
              "The colour of your logo",
              "How long the business has existed",
              "The quality and relevance of your ad and landing page",
            ],
            answer_index: 3,
            explanation: "Ad quality, including relevance and landing page usefulness, affects the auction.",
          },
          {
            prompt: "Where should a search ad for \"Event hall in Tamale\" send people?",
            options: [
              "To the business owner's personal profile so people can chat",
              "To a page showing the hall, prices and how to book",
              "To the Google homepage",
              "To a general page about Ghana",
            ],
            answer_index: 1,
            explanation: "The landing page should match what the ad promises.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "budgets-in-cedis": {
      outcomes: [
        "Tell apart the two costs of advertising",
        "Control spend and pay the platform safely",
        "Work out cost per result and keep a record",
      ],
      explanation_md: `Money causes more fights between marketers and clients than anything else. Who paid the platform? Why did the card get charged more than expected? What did the money achieve? If you handle budgets clearly and keep good records, clients trust you with bigger campaigns. Senior adverts in Ghana list budget management as a core duty, and it starts with habits you can build now.

## Two different costs

Always separate:

* **Ad spend.** The money paid to the platform, such as Meta or Google, to show ads.
* **Your fee.** What the client pays you for planning, creating and managing the work.

Write both down in your agreement. Clients should never be surprised by either.

## Who pays the platform

The safest arrangement is that the client adds their own payment method to their own ad account and gives you access to manage it. That way you never hold the client's money, every charge appears in their records, and if you stop working together they keep the account and its history. If you ever do pay on a client's behalf, get the money first, keep every receipt and agree it in writing.

Platforms bill in different ways, and the accepted payment methods and currencies for Ghana change over time. Some charge a card in another currency, so the cost in cedis depends on the exchange rate and bank charges on the day. Check the platform's billing help and tell the client this in advance.

## Controlling spend

* **Daily or total budgets.** Set them for every campaign. Some platforms may spend a little more on some days and less on others while keeping to the overall budget, so read how each one works.
* **Spending limits.** Many ad accounts let you set an overall limit as a safety net.
* **Schedules.** Give campaigns an end date so nothing runs forever by accident.

## Working out cost per result

The key number is what each result cost: total spend divided by the number of results.

If Hawa spends GHS 300 on a campaign and gets 30 WhatsApp messages, each message cost GHS 10. If six of those people bought, each sale cost GHS 50. If a gift pack gives her GHS 80 profit, the campaign made money. If it gives GHS 30 profit, it lost money even though the messages looked good.

This is why you track results that connect to money, not only clicks.

## Keep a simple record

A Google Sheet with columns for date, campaign, platform, amount spent, results and notes is enough. Add screenshots of billing pages each month. When a client asks where the money went, you can show them in a minute.

## A worked example

Mariama's group agrees a monthly fee for Wumpini's work and a separate ad budget. The group adds its own card to its ad account and gives Wumpini access. She sets a monthly spending limit, ends each campaign on a fixed date and sends a short sheet every Friday with spend and messages so far. There are no surprises.`,
      practice_task_md: `**Goal:** Build a budget tracker and practise cost per result calculations.

**Steps:**
1. Create a Google Sheet with columns: Date, Campaign, Platform, Spend (GHS), Results, Cost per result, Notes.
2. Add a formula so Cost per result divides Spend by Results.
3. Enter three made up campaigns for a local business, such as a church event, a MoMo promotion and a shea butter offer.
4. Add a row for profit per sale and work out whether each campaign made or lost money.
5. Write two sentences explaining to the owner which campaign you would keep running and why.

**Done looks like:** A working sheet with formulas and a short recommendation note.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between ad spend and your fee?",
            options: [
              "They are the same thing",
              "Ad spend goes to the platform, your fee pays for your work",
              "Ad spend is paid only after the campaign ends and results are in",
              "Your fee is always paid by the platform",
            ],
            answer_index: 1,
            explanation: "The lesson says to separate money for the platform from payment for your work.",
          },
          {
            prompt: "What is the safest way for a client's ads to be paid for?",
            options: [
              "The client adds their own payment method to their own ad account",
              "The client sends you cash and you pay the platform with your card later",
              "You use your own card and add a secret extra charge",
              "You share one ad account for all your clients",
            ],
            answer_index: 0,
            explanation: "This keeps the client in control and you never hold their money.",
          },
          {
            prompt: "A campaign spends GHS 200 and gets 20 messages. What was the cost per message?",
            options: ["GHS 20", "GHS 4", "GHS 200", "GHS 10"],
            answer_index: 3,
            explanation: "Total spend divided by results: 200 divided by 20 is 10.",
          },
          {
            prompt: "Why might the cost of ads in cedis differ from what you expected?",
            options: [
              "Platforms change prices every hour",
              "Cedis cannot be used online",
              "Some platforms bill in another currency, so exchange rates matter",
              "Ads are always cheaper on weekends, so weekday budgets run out faster",
            ],
            answer_index: 2,
            explanation: "Billing in another currency means the cedi cost depends on the rate and charges.",
          },
        ],
        pass_threshold: 75,
      },
    },
    measurement: {
      outcomes: [
        "Follow the measure and improve loop",
        "Choose the numbers that matter",
        "Track results without a website",
      ],
      explanation_md: `Many small business owners in Ghana have paid someone for "social media" and never known whether it helped. That is why clients often stop paying marketers after a few months. If you can plan a campaign with a clear goal, track what happens and explain the results honestly, you become someone they keep. Adverts for junior and senior roles alike ask for campaign planning, performance monitoring and reporting.

## The loop

Good marketing runs in a loop:

* **Plan.** Decide the goal, audience, message, channels, budget and the number you will watch.
* **Do.** Create and publish the content or ads.
* **Measure.** Collect the numbers and what customers say.
* **Learn.** Decide what to keep, change or stop.
* **Report.** Share it with the client or manager, then plan the next round.

Each round should be a little better than the last because you learned something.

## Numbers that matter

Platforms show many numbers. Some feel good but say little about money. Others connect directly to the business goal.

* **Attention numbers:** reach, views, likes, followers. Useful for awareness, but they do not pay bills on their own.
* **Action numbers:** messages, calls, link clicks, sign ups, direction requests.
* **Money numbers:** orders, sales, revenue, cost per sale.

For most small businesses, action and money numbers matter most. A post with fewer likes that brings five orders is better than a viral post that brings none.

## Tracking without a website

Many of the businesses you work with will not have a website, and that is fine. You can still track:

* Platform insights from WhatsApp Business, Facebook, Instagram and TikTok.
* A simple Google Sheet where the business records each order and asks "Where did you hear about us?"
* Special codes or words in posts, such as "Mention TAMALE10 for the offer", so you know which post brought the sale.

## What this section covers

* **Planning a campaign:** turning a goal into a clear one page plan.
* **Analytics basics:** reading platform insights and website analytics.
* **Reporting to clients:** short, honest monthly reports.

## A small example

Fuseini runs posts for a Tamale tailor. Last month the page got many likes, but the tailor felt business was slow. Fuseini adds a column to the tailor's order book: "How did you find us?" After four weeks, he sees most new customers came from WhatsApp Status and from one video showing a finished kaba. He reports this honestly, suggests more Status updates and videos, and drops the posts that got likes but no customers.`,
      practice_task_md: `**Goal:** Set up simple tracking for a business that has no website.

**Steps:**
1. Choose a business you know, such as a tailor, a chop bar or a phone accessories seller.
2. In Google Sheets, create an order log with columns: Date, Customer first name, Item, Amount (GHS), How they found us.
3. List the options for "How they found us", such as WhatsApp Status, Facebook, TikTok, friend, walked past.
4. Write a short script the owner can use to ask customers this question politely.
5. Ask the owner to try it for one week, or fill it in yourself from made up orders to practise.

**Done looks like:** A shared order log sheet and a one line script for asking customers. Keep customer details minimal and private.`,
      quiz: {
        questions: [
          {
            prompt: "What are the five steps of the marketing loop in the lesson?",
            options: [
              "Post, like, share, comment, repeat",
              "Plan, do, measure, learn, report",
              "Design, print, deliver, invoice, rest",
              "Buy, boost, wait, hope, quit",
            ],
            answer_index: 1,
            explanation: "The loop is plan, do, measure, learn and report.",
          },
          {
            prompt: "Which of these is a money number?",
            options: ["Followers", "Reach", "Cost per sale", "Likes"],
            answer_index: 2,
            explanation: "Orders, sales, revenue and cost per sale connect directly to money.",
          },
          {
            prompt: "How can a business without a website track where sales come from?",
            options: [
              "It cannot track anything without a website and Google Analytics",
              "By buying more followers",
              "By counting likes only",
              "By asking customers how they found the business and logging it",
            ],
            answer_index: 3,
            explanation: "A simple order log with a \"how did you find us\" column works without a website.",
          },
          {
            prompt: "What did Fuseini learn from the tailor's order log?",
            options: [
              "Most new customers came from WhatsApp Status and one video",
              "Likes on Facebook were bringing most of the new customers",
              "Nobody used WhatsApp",
              "The tailor needed paid search ads to bring in new customers",
            ],
            answer_index: 0,
            explanation: "The log showed WhatsApp Status and a kaba video brought new customers.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "campaign-plan": {
      outcomes: [
        "Start a campaign with a clear goal",
        "Write a one page campaign plan",
        "Plan a campaign timeline",
      ],
      explanation_md: `A campaign is a focused push to achieve one goal in a set time, such as filling a church conference, selling Christmas gift packs or getting sign ups for an NGO training. Ghanaian adverts ask marketers to plan and run campaigns, and the DMP cohort's week 10 is built around a full campaign plan. Clients are far more willing to approve spending when they see a clear plan on one page.

## Start with a clear goal

Vague goals like "more awareness" are hard to judge. A better goal is specific, measurable and time bound. For example:

* "Get 60 registrations for the youth conference by 15 December."
* "Sell 40 shea butter gift packs in the two weeks before Christmas."
* "Get 100 new sign ups to the NGO newsletter this quarter."

These numbers are targets you agree with the client, not promises. Base them on what the business has achieved before, and be honest if you are unsure.

## The one page plan

A simple plan has these parts:

* **Goal.** The specific result and date.
* **Audience.** Who you are trying to reach, from your audience description.
* **Message.** The one main thing you want them to know, and why they should act now.
* **Offer.** If there is one: a discount, a free gift, early bird pricing.
* **Channels.** Two or three channels, each with a clear job.
* **Content.** The main pieces you will create: graphics, videos, captions, emails.
* **Budget.** Ad spend and any production costs, in cedis.
* **Timeline.** Key dates: launch, reminders, last day.
* **Measurement.** The number you will watch and how you will collect it.
* **Who does what.** You, the owner, and anyone else involved.

## Think about the timeline

Most campaigns have three phases. **Build up:** tell people something is coming. **Launch:** the main push with the offer or registration open. **Last call:** reminders as the deadline nears, which often bring a burst of action. Put these on your content calendar.

## A worked example

Sumaila runs a mobile money vendor shop and wants more customers in December. Abdul-Rahman writes a one page plan. Goal: 150 transactions in the shop in the first two weeks of December, compared with the usual number. Audience: traders and students around Aboabo market. Message: quick, safe service, open late. Offer: a loyalty card where five transactions earn a small airtime gift. Channels: WhatsApp Status, a printed flyer with a QR code, and a Facebook post for the local community group. Budget: printing costs and a small boost. Measurement: a tally in the shop's record book. Sumaila signs off on it in ten minutes because everything is clear.`,
      practice_task_md: `**Goal:** Write a one page campaign plan for a real or realistic local goal.

**Steps:**
1. Choose a campaign, such as a church event, a MoMo promotion, a Bolgatanga basket sale or an NGO training.
2. Write a specific, measurable, time bound goal.
3. Fill in each part of the plan: audience, message, offer, channels, content, budget, timeline, measurement, who does what.
4. Mark the build up, launch and last call dates.
5. Share the plan with a mentor or the business owner and ask what is unclear.

**Done looks like:** A one page plan in Google Docs or Slides that someone else could follow. This is a strong portfolio piece.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is the clearest campaign goal?",
            options: [
              "More awareness",
              "Be popular online",
              "Sell 40 gift packs in the two weeks before Christmas",
              "Post every day",
            ],
            answer_index: 2,
            explanation: "A good goal is specific, measurable and time bound.",
          },
          {
            prompt: "How does the lesson describe the numbers in a campaign goal?",
            options: [
              "Targets agreed with the client, not promises",
              "Guarantees the marketer must pay back if missed",
              "Numbers copied from big companies",
              "Something to keep secret from the client",
            ],
            answer_index: 0,
            explanation: "Goals are agreed targets based on past results, not promises.",
          },
          {
            prompt: "What are the three phases of a campaign timeline in the lesson?",
            options: [
              "Design, print, deliver",
              "Morning, afternoon, evening",
              "Plan, pay, pause",
              "Build up, launch, last call",
            ],
            answer_index: 3,
            explanation: "The lesson names build up, launch and last call.",
          },
          {
            prompt: "Why did Sumaila approve Abdul-Rahman's plan quickly?",
            options: [
              "It promised to double his income",
              "Everything was clear on one page",
              "It had no budget at all",
              "It used every social media platform",
            ],
            answer_index: 1,
            explanation: "A clear one page plan makes it easy for a client to say yes.",
          },
        ],
        pass_threshold: 75,
      },
    },
    analytics: {
      outcomes: [
        "Read platform insights and website analytics",
        "Use tracking links",
        "Turn numbers into a clear recommendation",
      ],
      explanation_md: `Analytics means collecting and reading data about what people do, so you can make better decisions. Ghanaian adverts for digital marketers ask for Google Analytics and for monitoring campaign performance, and the DMP cohort spends a full week on it. You do not need to be good at maths. You need to know which numbers matter, where to find them and how to spot a pattern.

## Platform insights

Every major platform gives free insights for business accounts:

* **WhatsApp Business** shows basic message statistics, such as messages sent and delivered.
* **Facebook and Instagram** show reach, engagement, followers and actions such as messages and link clicks.
* **TikTok** business accounts show views, watch time, followers and where viewers came from.
* **Google Business Profile** shows how people found the profile and whether they called, asked for directions or visited the website.

The names of these numbers change from time to time, so read each platform's own help pages for the current definitions.

## Website analytics

If a business has a website, Google Analytics is a free tool that records visits. The current version is called Google Analytics 4. Some words you will meet:

* **Users.** People who visited.
* **Sessions.** Visits; one user can have several.
* **Events.** Things people do, such as viewing a page, clicking a button or sending a form.
* **Key events.** Events you mark as important for the business, such as a completed enquiry form. Older guides call these conversions.
* **Traffic sources.** Where visitors came from: search, social media, email or typing the address directly.

## Tracking links

When you share a website link in a post, email or ad, you can add small tags to the end of it, called UTM parameters, that tell Google Analytics where the visit came from. Google offers a free Campaign URL Builder to create them. Then you can see whether the Facebook post or the newsletter brought more visitors.

## Reading the numbers well

* **Compare like with like.** This month against last month, or one post type against another.
* **Look for patterns, not one off spikes.**
* **Connect numbers to the goal.** If the goal is orders, focus on messages and sales.
* **Ask why.** If one video did well, what was different about it?

## A worked example

Mariama's basket group has a small website and a Facebook Page. Wumpini uses tagged links in their Facebook posts and their newsletter. After a month, Google Analytics shows that the newsletter brought fewer visitors than Facebook, but those visitors sent far more wholesale enquiry forms, which are marked as a key event. She recommends keeping both but putting more care into the newsletter, because it brings the buyers who matter most.`,
      practice_task_md: `**Goal:** Read real insights and turn them into one clear recommendation.

**Steps:**
1. Open the insights of any business or practice account you manage, such as a Facebook Page, Instagram professional account or TikTok business account.
2. Record the last ten posts in a Google Sheet with columns: Date, Format, Topic, Reach or Views, Engagement, Messages or Clicks.
3. Sort by messages or clicks and look at the top three posts. What do they have in common?
4. Use Google's free Campaign URL Builder to create one tagged link you could use in a future post.
5. Write a two sentence recommendation based on what you found.

**Done looks like:** A sheet of ten posts, one tagged link and a short, evidence based recommendation.`,
      quiz: {
        questions: [
          {
            prompt: "In Google Analytics 4, what is a session?",
            options: [
              "A visit, and one user can have several",
              "A paid advert",
              "A follower on social media",
              "A customer review",
            ],
            answer_index: 0,
            explanation: "Sessions are visits; one user can make several.",
          },
          {
            prompt: "What are key events in Google Analytics 4?",
            options: [
              "Holidays and market days marked on the calendar in the report",
              "Every page view on the site",
              "Errors on the website",
              "Actions you mark as important, such as a completed form",
            ],
            answer_index: 3,
            explanation: "Key events are the important actions; older guides call them conversions.",
          },
          {
            prompt: "What are UTM parameters used for?",
            options: [
              "Making the website load faster",
              "Telling Google Analytics where a visit came from",
              "Hiding a link from customers",
              "Paying for ads",
            ],
            answer_index: 1,
            explanation: "Tags added to links show which post, email or ad brought the visit.",
          },
          {
            prompt: "What did Wumpini recommend about the newsletter?",
            options: [
              "Stop sending it, because it brought fewer visitors than social posts",
              "Replace it with paid ads",
              "Give it more care, since its visitors sent more wholesale enquiries",
              "Send it every day",
            ],
            answer_index: 2,
            explanation: "Fewer visitors but more valuable actions made the newsletter worth more care.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "client-reporting": {
      outcomes: [
        "Decide what goes in a monthly report",
        "Write for the owner, not for marketers",
        "Report honestly in a light, easy format",
      ],
      explanation_md: `A short, honest report is often what makes a client renew. It shows that you are paying attention, that you understand their business and that their money is being used carefully. Adverts for marketing and communications roles in Ghana, from agencies to think tanks, ask for performance tracking and reporting. Managers inside a company want the same thing.

## What goes in a monthly report

Keep it to one or two pages, or a short set of slides. Cover:

* **The goal.** Remind the client what you agreed to work toward.
* **What we did.** Posts, videos, campaigns, emails, profile updates. Keep it brief.
* **What happened.** The numbers that connect to the goal, compared with last month. Messages, orders, sign ups, calls, cost per result.
* **What worked and what did not.** One or two examples of each, with a reason if you know it.
* **What we will try next.** Specific actions for the coming month.
* **Spend.** Ad spend and any other costs, matching the client's records.

Add a few screenshots so the client can see the evidence for themselves.

## Write for the owner, not for marketers

Many owners are busy and not interested in jargon. Instead of "CTR improved", write "More people who saw the ad tapped it". Instead of a table of twenty numbers, pick the four that matter. Use the language the owner prefers, and offer to explain in person or on a call.

## Be honest

Sometimes a campaign does not work. Say so clearly, explain what you think went wrong, and say what you will change. Never inflate numbers, hide costs or claim credit for sales you did not cause. Owners usually find out, and trust is very hard to win back. An honest report about a weak month often builds more trust than a polished report about a good one.

## Keep it light and easy to share

Send the report as a small PDF or a Google Doc link that opens well on a phone, plus a short WhatsApp summary with the three main points. That way the owner can read it on a busy day.

## A worked example

Issahaku sends his monthly report to the NGO he supports in Tamale. Goal: more parents at community education meetings. He lists what he did: eight Facebook posts, two events and four WhatsApp broadcasts. Results: more parents attended than last month, and most said they heard through the WhatsApp broadcasts. What did not work: a long text flyer got little response. Next month: more short voice notes in Dagbani on WhatsApp, which several parents asked for. The director forwards the report to their funder.`,
      practice_task_md: `**Goal:** Write a one page monthly report for a business or page you manage, or for a practice scenario.

**Steps:**
1. Use real insights from a page you manage, or create realistic practice numbers for a local business.
2. Write the six parts: goal, what we did, what happened, what worked and what did not, what next, spend.
3. Include at least two screenshots or simple charts.
4. Replace any jargon with plain words an owner would understand.
5. Write a three line WhatsApp summary to send with the report.

**Done looks like:** A one page report saved as a small PDF, plus a short WhatsApp summary. Mark practice numbers clearly as practice if you use the report in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these belongs in a monthly client report?",
            options: [
              "A list of every number the platform shows",
              "What worked, what did not, and what you will try next",
              "Only the best results, leaving weak ones out to keep the client happy",
              "Technical words to impress the client",
            ],
            answer_index: 1,
            explanation: "The lesson lists what worked and what did not, and next steps, as core parts.",
          },
          {
            prompt: "How should you write \"CTR improved\" for a busy owner?",
            options: [
              "More people who saw the ad tapped it",
              "Click through rate optimisation achieved",
              "CTR went up, see table",
              "Leave it out entirely",
            ],
            answer_index: 0,
            explanation: "Plain words help owners understand results.",
          },
          {
            prompt: "What should you do when a campaign did not work?",
            options: [
              "Hide it from the report",
              "Change the numbers slightly so the results look better than they were",
              "Blame the client",
              "Say so clearly, explain what went wrong and what you will change",
            ],
            answer_index: 3,
            explanation: "Honesty about weak results builds long term trust.",
          },
          {
            prompt: "Why does the lesson suggest sending a short WhatsApp summary with the report?",
            options: [
              "WhatsApp is the only legal way to send business reports in Ghana",
              "It replaces the need for a report",
              "So the owner can get the main points easily on a busy day",
              "So the report cannot be forwarded",
            ],
            answer_index: 2,
            explanation: "A short summary helps busy owners read the key points.",
          },
        ],
        pass_threshold: 75,
      },
    },
    earning: {
      outcomes: [
        "Compare three paths to paid marketing work",
        "Explain what employers and clients look for",
        "Make a 30 day plan toward paid work",
      ],
      explanation_md: `Skills only change your life when someone pays you for them. Digital marketing has several doors into paid work, and you can start knocking on some of them before you feel "ready". This section helps you choose a path, collect proof of your skills and get your first paying work in Ghana or remotely.

## Three main paths

* **Employed in a company.** Many organisations hire marketing assistants, social media executives, content creators and communications officers: retailers, banks and fintechs, telecoms, hotels, schools, churches, NGOs and think tanks. You get a salary, colleagues to learn from and steady work.
* **Agency work.** Marketing and advertising agencies manage campaigns for many clients at once. Agencies move fast and teach a lot, and they often hire juniors who can show real work.
* **Freelancing.** You work for your own clients, often local businesses, for a monthly fee or per project. You choose your clients, but you also handle your own sales, agreements and invoices.

Many people mix these. You might freelance for two shops in Tamale while applying for agency jobs, or keep one freelance client after you get hired.

## What employers and clients look for

Across Ghanaian and remote adverts for junior marketing roles, the same things keep appearing:

* Evidence you can create good content and manage social pages.
* Comfort with common free tools for design, video, spreadsheets and analytics.
* Clear writing and good communication.
* Some understanding of measuring results.
* Reliability: showing up, meeting deadlines and being honest.

Notice that most of this is about proof, not paper. A certificate helps, but a real page you grew, a real report you wrote and a reference from a real client often help more.

## What this section covers

* **A portfolio from real businesses:** turning your practice work into convincing case studies.
* **Certificates, CVs and applications:** free platform courses, a CV that shows real work, and applying safely.
* **Freelancing and retainers:** packaging services, agreements and getting paid.
* **Joining a mentored cohort:** SydCrest's Delta Mentoring Program, if you want structure and mentors.

## A small example

Amina finished the earlier sections of this roadmap. She volunteers to run her church's youth WhatsApp and Facebook for three months and helps her aunt's shea butter business set up WhatsApp Business. She documents both as case studies, completes a free Skillshop course and applies for a social media assistant role at a Tamale hotel. In the interview she shows her phone: the church page, the content calendar and a simple report. The manager can see exactly what she can do.

Your first paid work rarely arrives by waiting. It comes from doing real work, showing it and asking.`,
      practice_task_md: `**Goal:** Choose your first path and make a 30 day plan to move toward paid work.

**Steps:**
1. Write which path interests you most right now: employed, agency or freelance. Give one reason.
2. List the evidence you already have, such as pages you run, content you made or reports you wrote.
3. List two gaps between what you have and what adverts or clients ask for.
4. Write a 30 day plan with one action per week to close those gaps, such as volunteering for a church page or finishing a free course.
5. Share the plan with a mentor or friend who will check on you.

**Done looks like:** A short written plan with your chosen path, your evidence, two gaps and four weekly actions.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is described as a main path into digital marketing work?",
            options: [
              "Only government jobs",
              "Agency work managing campaigns for many clients",
              "Selling followers online",
              "Waiting until you have a degree",
            ],
            answer_index: 1,
            explanation: "The lesson describes employed roles, agency work and freelancing.",
          },
          {
            prompt: "According to the lesson, what often helps more than a certificate?",
            options: [
              "Real work, such as a page you grew or a report you wrote",
              "A long list of the marketing apps you have downloaded on your phone",
              "Paying for a job placement",
              "A very long CV",
            ],
            answer_index: 0,
            explanation: "Proof of real work often helps more than paper alone.",
          },
          {
            prompt: "What is one downside of freelancing mentioned in the lesson?",
            options: [
              "You can never choose your clients",
              "You are not allowed to work for local businesses in your town",
              "You must work in an office",
              "You handle your own sales, agreements and invoices",
            ],
            answer_index: 3,
            explanation: "Freelancers manage their own business tasks as well as the marketing.",
          },
          {
            prompt: "How did Amina show the hotel manager what she could do?",
            options: [
              "She brought a letter from a celebrity",
              "She promised to work for free forever",
              "She showed her real church page, calendar and report on her phone",
              "She described skills she had read about but not yet used for anyone",
            ],
            answer_index: 2,
            explanation: "Real work shown on her phone made her skills clear.",
          },
        ],
        pass_threshold: 75,
      },
    },
    portfolio: {
      outcomes: [
        "Explain why real work beats mock work",
        "Write a case study in a clear format",
        "Protect your clients' information",
      ],
      explanation_md: `When an agency, company or client in Ghana decides whether to hire you, a portfolio does the talking. One Ghanaian digital marketer advert we studied asked directly for a portfolio of past campaigns, and many others ask for experience. A portfolio is how a beginner shows experience. It does not need to be fancy. It needs to be real, honest and easy to open on a phone or a laptop.

## Real beats mock

Practice projects for made up businesses are fine while you learn, but real work convinces people more. Offer a short, clearly defined trial to two or three local businesses or organisations: a shop, a church, a school club, an NGO or a family business. For example, "I will set up your WhatsApp Business and run your Status for four weeks." Agree what you will do, what access you need, and that you can show the work in your portfolio.

## The case study format

For each project, tell a short story:

* **The client.** Who they are, in one or two sentences.
* **The problem.** What was not working. "Orders were getting lost in personal chats."
* **What you did.** The specific actions: set up a catalogue, created quick replies, planned a calendar, made five videos.
* **The results.** What changed, with honest numbers if you have them and the client agrees. "Messages answered within the hour instead of the next day." "Twelve orders came from Status in four weeks." If results were small, say so and explain what you learned.
* **Evidence.** Before and after screenshots, sample posts, a short report.
* **A quote.** A line from the client, used with their permission. Never invent one.

## Where to put it

Choose something free that opens well on a phone or a laptop with little data:

* A **Google Sites** page, which is also what the DMP cohort uses.
* A **Google Drive folder** with one PDF per case study.
* A **pinned post or highlight** on your own professional social account.

Keep images small so pages load quickly. Put the link in your CV, your WhatsApp profile and your email signature.

## Protect your clients

Hide customers' names, numbers and messages in screenshots. Do not share private data such as sales figures unless the owner agrees. Your care with their information is part of what makes you hireable.

## A worked example

Wumpini's portfolio has three case studies: a Bolgatanga basket group's WhatsApp Business setup, a church youth conference campaign and a practice Google Ads plan clearly labelled as practice. Each has a short story, before and after screenshots and, for the real clients, a quote they agreed to. It lives on a simple Google Sites page that loads quickly on a phone.`,
      practice_task_md: `**Goal:** Write your first portfolio case study and publish it somewhere free.

**Steps:**
1. Choose one piece of work from this roadmap, real if possible, such as a WhatsApp Business setup, a content calendar or a campaign plan.
2. Write the case study: client, problem, what you did, results, evidence and a quote if the client agrees.
3. Blur or crop out any customer names and numbers in your screenshots.
4. Publish it on a free Google Sites page or as a small PDF in a shared Google Drive folder.
5. Open the link on your phone with mobile data and check it loads quickly.

**Done looks like:** A working link to one honest, phone friendly case study you can send to an employer or client.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest offering a short trial to real local businesses?",
            options: [
              "Real work convinces employers and clients more than mock projects",
              "Mock projects are not allowed in portfolios that employers look at",
              "Businesses must pay double for trials",
              "Trials are required by law",
            ],
            answer_index: 0,
            explanation: "Practice is fine while learning, but real work is more convincing.",
          },
          {
            prompt: "Which part of a case study describes what was not working?",
            options: ["The results", "The evidence", "The problem", "The quote"],
            answer_index: 2,
            explanation: "The problem explains what was not working before you started.",
          },
          {
            prompt: "What should you do if a client has not agreed to give a quote?",
            options: [
              "Write one yourself and use their name",
              "Copy a quote from another business",
              "Ask a friend to pretend to be the client",
              "Leave the quote out, because quotes must never be invented",
            ],
            answer_index: 3,
            explanation: "Quotes are only used with permission and are never invented.",
          },
          {
            prompt: "How should you handle customers' names and numbers in screenshots?",
            options: [
              "Hide or crop them out",
              "Make them larger so the work looks real",
              "Share them only with other marketers",
              "Leave them as they are",
            ],
            answer_index: 0,
            explanation: "Protecting client and customer data is part of being hireable.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "job-applications": {
      outcomes: [
        "Choose certificates worth your time",
        "Write a CV that shows real work",
        "Apply well and stay safe",
      ],
      explanation_md: `Once you have some real work to show, it is time to apply. Ghanaian employers advertise marketing roles on job boards such as Jobberman, on their own career pages, through recruiters and through word of mouth. Some ask for Google or Meta certifications. This lesson covers certificates, CVs, applications and staying safe from job scams.

## Certificates worth your time

Free courses from the platforms themselves are respected because they teach the tools employers use:

* **Google Skillshop** offers free courses that lead to certifications in Google Ads (including Search) and Google Analytics, plus training on Google Business Profile. Skillshop certifications are free to take at the time of writing, but check the course page before you start.
* **Meta Blueprint** offers free courses on Facebook, Instagram and Meta ads. Its formal certification exams usually charge a fee, so check before you register and do not feel you must pay to start.

Add completed certifications to your CV with the month you earned them. They show initiative, but they work best alongside real portfolio work.

## A CV that shows real work

* **Keep it short.** One page is usually enough for a junior role.
* **Start with a summary.** Two lines on what you do: "Social media and content marketer in Tamale who helps small businesses sell on WhatsApp and Facebook."
* **Show results, honestly.** "Set up WhatsApp Business for a basket weaving group and created quick replies, cutting reply time from next day to under an hour."
* **List tools.** Canva, CapCut, Meta Business Suite, Google Sheets, Google Analytics, whichever you really use.
* **Link your portfolio.** Make it easy to click.

## Applying well

* **Read the advert carefully.** Match your CV and message to the skills it asks for, using your own words.
* **Write a short cover message.** Say which role, why you fit, and point to one relevant case study.
* **Prepare for practical tests.** Marketing interviews often ask you to write captions, critique a page or plan a small campaign. Practise with the tasks in this roadmap.
* **Remote roles.** Some remote jobs welcome applicants from Ghana, others only hire in certain countries. Read the location rules, working hours and how you will be paid before applying.

## Stay safe

Never pay anyone to get a job, an interview or a "training kit" for a role. Ghanaian job boards warn about this regularly. Be careful with offers that seem too good to be true, ask for your MoMo PIN, or want your Ghana Card details before any proper interview.

## A worked example

Mariama finds an advert for a marketing assistant at a Tamale hotel asking for Canva, social media and email. She updates her CV summary, adds her Skillshop certificate, links a case study about a church newsletter she ran and writes a five line message pointing to it. In the interview she is asked to write three captions for the hotel on the spot, which she has practised.`,
      practice_task_md: `**Goal:** Prepare a one page CV and one tailored application.

**Steps:**
1. Start a free Skillshop course related to your interests and note your progress.
2. Write a one page CV in Google Docs with a two line summary, honest results, tools and a portfolio link.
3. Find one real junior marketing or communications advert in Ghana or a remote role open to Ghana.
4. List the skills it asks for and adjust your CV and summary to match, in your own words.
5. Write a short cover message pointing to one case study.

**Done looks like:** A one page CV, a tailored cover message and a note of which advert you targeted. Never pay any fee to apply.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say about Meta Blueprint certification exams?",
            options: [
              "They are always free",
              "They usually charge a fee, so check before registering",
              "They are only for people in Europe",
              "They replace the need for a portfolio when applying for jobs",
            ],
            answer_index: 1,
            explanation: "Meta's courses are free, but its formal certification exams usually charge a fee.",
          },
          {
            prompt: "Which CV line best follows the lesson's advice?",
            options: [
              "Hardworking person who loves social media",
              "Expert in all marketing tools",
              "Set up WhatsApp Business for a basket group and cut reply time to under an hour",
              "Available for any job",
            ],
            answer_index: 2,
            explanation: "Specific, honest results show what you can do.",
          },
          {
            prompt: "What should you check before applying for a remote role?",
            options: [
              "Location rules, working hours and how you will be paid",
              "Whether you can pay a fee to skip the interview and start sooner",
              "Whether the company has many followers",
              "Nothing, remote jobs are open to everyone",
            ],
            answer_index: 0,
            explanation: "Some remote jobs only hire in certain countries, and hours and payment vary.",
          },
          {
            prompt: "Someone offers you a marketing job if you first pay for a training kit. What should you do?",
            options: [
              "Pay quickly before someone else takes the job",
              "Send your MoMo PIN so they can collect the fee",
              "Pay half now and half later",
              "Refuse, because you should never pay to get a job",
            ],
            answer_index: 3,
            explanation: "Paying for a job or training kit is a common scam.",
          },
        ],
        pass_threshold: 75,
      },
    },
    freelancing: {
      outcomes: [
        "Package your services",
        "Write a simple agreement and invoice",
        "Set up retainers and find clients",
      ],
      explanation_md: `Many small businesses in Ghana need marketing help but cannot afford a full time employee. That is a real opportunity for freelancers. A shea butter seller, a pharmacy shop, a guest house and a church can each pay for a few hours of your time a week. Freelancing well means treating it as a small business: clear services, clear agreements and getting paid on time.

## Package your services

Owners find it hard to buy "digital marketing". They find it easier to buy something specific. Create two or three packages, for example:

* **Setup.** A one time job: WhatsApp Business profile, catalogue and quick replies, plus a Google Business Profile.
* **Monthly content.** A set number of posts and Status updates per month, with replies to comments during agreed hours.
* **Campaign.** A focused push for an event or season, with a plan, content, a small ad budget and a report.

Price each package based on the time it takes and what is fair locally, and quote in cedis. Start modestly while you build a portfolio, but do not work for free for long.

## Write a simple agreement

Even with friends and family, write it down. A one page agreement, shared on WhatsApp or email and confirmed by both sides, should cover:

* What you will do, and what is not included.
* The fee, when it is due and how it is paid, such as MoMo or bank transfer.
* A deposit before you start, especially for new clients.
* Who pays ad spend, and that it is separate from your fee.
* What access you need, and that the client keeps ownership of their accounts.
* How either side can end the arrangement, such as two weeks' notice.

## Retainers

A retainer is a monthly fee for ongoing work. It gives you steady income and gives the client consistent marketing. Monthly reports are what keep retainers going, because they show the value of your work.

## Invoices and records

Send a simple invoice for every payment with your name, the client's name, the work, the amount in cedis and how to pay. Keep a sheet of all income and costs. As your income grows, learn about your tax responsibilities from the Ghana Revenue Authority.

## Getting clients

Many local clients find marketers by word of mouth. Do good work, then ask happy clients to recommend you. Show your portfolio on your WhatsApp Status, offer a free short check of a business's pages, and join local business groups.

## A worked example

Fuseini offers three packages to businesses in Tamale. A pharmacy shop takes the monthly content package. He sends a one page agreement covering twelve posts a month, replies during shop hours, a fee paid by MoMo on the first of each month, and ad spend paid directly by the shop. After three months of clear reports, the owner recommends him to a nearby guest house.`,
      practice_task_md: `**Goal:** Create a simple service menu, agreement and invoice you could use with a first client.

**Steps:**
1. Write two or three service packages with a clear list of what each includes.
2. Estimate the hours each package takes per month and set a fair price in cedis.
3. Draft a one page agreement covering services, fee, deposit, ad spend, access and notice.
4. Create an invoice template in Google Docs or Sheets.
5. Ask a mentor or a business owner you know to read your packages and tell you what is unclear.

**Done looks like:** A one page service menu, an agreement template and an invoice template, ready to adapt for a real client.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest creating packages?",
            options: [
              "Owners find it easier to buy something specific",
              "Packages remove the need for agreements",
              "Packages must always be the same price",
              "Clients are not allowed to buy single services from a freelancer",
            ],
            answer_index: 0,
            explanation: "Specific packages are easier for owners to understand and buy.",
          },
          {
            prompt: "What is a retainer?",
            options: [
              "A one time setup fee",
              "A fine for late payment",
              "A monthly fee for ongoing work",
              "A free trial",
            ],
            answer_index: 2,
            explanation: "A retainer is a regular monthly fee for continuing work.",
          },
          {
            prompt: "Which of these should a freelance agreement include?",
            options: [
              "The client's MoMo PIN",
              "A promise of guaranteed sales",
              "Ownership of the client's accounts by the freelancer",
              "Who pays the ad spend, separate from your fee",
            ],
            answer_index: 3,
            explanation: "The agreement should separate ad spend from your fee and keep account ownership with the client.",
          },
          {
            prompt: "What helps keep retainers going, according to the lesson?",
            options: [
              "Posting without telling the client",
              "Monthly reports that show the value of your work",
              "Raising prices every week",
              "Avoiding contact with the client",
            ],
            answer_index: 1,
            explanation: "Reports show the client what they are getting for their money.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "dmp-cohort": {
      outcomes: [
        "Describe how the twelve week cohort is organised",
        "Explain how this roadmap connects to it",
        "Decide whether it is right for you",
      ],
      explanation_md: `Learning alone takes real discipline. Some people move faster with a group, a schedule and someone experienced checking their work. SydCrest's Delta Mentoring Program, or DMP, is a twelve week cohort for digital skills and digital marketing. This roadmap and the DMP are designed to fit together: the roadmap gives you a broad beginner base, and the DMP adds structure, mentors and a specialisation.

## How the twelve weeks are organised

The program has three parts.

**Weeks 1 to 6 are shared by everyone.** They cover computer and internet basics and safety, Google Drive, Docs, Slides and Sheets, online communication and creating a Facebook Page, an introduction to digital marketing channels and Google Business Profile, social media strategy and content, and analytics.

**Weeks 7 to 9 are your specialisation.** You choose one of three:

* **SEO and Content Marketing:** keyword research, on page SEO, backlinks, local SEO and a content strategy.
* **Social Media Marketing:** ad targeting, video and storytelling, community building and influencer outreach.
* **Google Ads (SEM):** Skillshop search ads training, keywords and ad copy, and optimisation and budgeting.

**Weeks 10 to 12 bring it together.** You plan an integrated campaign across channels, build a portfolio on Google Sites with at least three pieces of work and get mentor feedback, then finish a capstone project in your specialisation, review a classmate's capstone and complete a final quiz for the program certificate.

## How this roadmap connects

Many lessons here line up with DMP weeks:

* Channels, Google Business Profile and SEO basics prepare you for the shared weeks and the SEO specialisation.
* Content, short video, community management and social ads prepare you for the Social Media specialisation.
* Search ads and budgets prepare you for the Google Ads specialisation.
* Campaign planning, reporting and portfolio lessons prepare you for weeks 10 to 12.

If you are unsure which specialisation to pick, look back at which roadmap lessons you enjoyed most and did best on.

## Is it right for you?

The DMP suits you if you want deadlines, feedback from mentors, a group to learn with and a structured capstone. If you prefer to learn at your own pace, keep going with this roadmap; it stands on its own. Either way, the portfolio you build is what shows employers and clients what you can do.

The first DMP cohort is planned as a free pilot with 25 seats, starting in January 2027. Plans can change, so check the programme page on SydCrest's site for the latest details. You can join the waitlist there; joining the waitlist is not a confirmed place. If you do apply later, mention the roadmap lessons you have completed.

## A small example

Hawa completed most of this roadmap on her phone and enjoyed the search lessons most. She joins the DMP waitlist and, once she has a place, chooses the SEO and Content Marketing specialisation. Because she already understands keywords and Google Business Profile, she uses the specialisation weeks to go deeper and builds a capstone around a real Tamale guest house.`,
      practice_task_md: `**Goal:** Decide whether the DMP suits you and which specialisation fits you best.

**Steps:**
1. List the roadmap lessons you have completed and the three you enjoyed most.
2. Match those lessons to the three DMP specialisations: SEO and Content Marketing, Social Media Marketing, or Google Ads.
3. Write two sentences on why you would choose that specialisation.
4. Write two sentences on whether you prefer a structured cohort or learning at your own pace, and why.
5. If you choose the cohort, gather two portfolio pieces you could mention if you apply.

**Done looks like:** A short note naming your preferred specialisation, your reasons and two pieces of work you could share in an application.`,
      quiz: {
        questions: [
          {
            prompt: "How long is the Delta Mentoring Program?",
            options: ["Four weeks", "Twelve weeks", "Six months", "One year"],
            answer_index: 1,
            explanation: "The DMP is a twelve week cohort.",
          },
          {
            prompt: "Which weeks of the DMP are your specialisation?",
            options: ["Weeks 1 to 3", "Weeks 4 to 6", "Weeks 10 to 12", "Weeks 7 to 9"],
            answer_index: 3,
            explanation: "Weeks 7 to 9 fork by specialisation.",
          },
          {
            prompt: "Which of these is one of the three DMP specialisations?",
            options: [
              "Google Ads (SEM)",
              "Mobile app development",
              "Data science",
              "Graphic design for print",
            ],
            answer_index: 0,
            explanation: "The specialisations are SEO and Content Marketing, Social Media Marketing, and Google Ads.",
          },
          {
            prompt: "Where do DMP participants build their portfolio?",
            options: ["On a paid website builder", "In a printed booklet", "On Google Sites", "On a USB drive"],
            answer_index: 2,
            explanation: "Weeks 10 to 12 include building a portfolio on Google Sites.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
