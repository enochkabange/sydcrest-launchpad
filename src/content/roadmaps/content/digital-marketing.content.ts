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

* **Aware:** posts on WhatsApp Status and a kiosk on a busy road. About 120 Status views this week.
* **Interested:** people send "How much?". 35 questions.
* **Decide:** he replies hours later, sometimes the next day. 6 reply back.
* **Buy:** customers pay by MoMo without trouble. 5 sales.
* **Return:** no follow up after a sale. Unknown.

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

Jobs for each channel:

* WhatsApp group and Status (owned): reminders and the registration link for members.
* Facebook event (owned): date, venue, map and speakers, easy to share.
* TikTok clips from last year's conference (owned, hoping for earned shares): discovery by young people from other churches.

**Not doing:** email, because members do not read it; paid ads, because the budget is small and sharing is strong. If registrations are low two weeks before, they will review this choice.

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

* **Monday (show):** photo of the new shea body cream with price.
* **Tuesday (help):** three line tip on caring for skin in the harmattan.
* **Wednesday (prove):** short clip of a regular customer, Hawa, who agreed to be filmed saying why she buys.
* **Thursday (show):** graphic with delivery days and areas.
* **Friday (ask):** weekend offer with a clear "Send ORDER on WhatsApp" line.

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

She builds a two week sheet with columns for date, channel, job, idea, format and status. Week one looks like this:

* **Monday, Instagram, show:** knotless braids finished look. Photo. Approved.
* **Tuesday, Status, ask:** "Weekday slots open, book on WhatsApp". Graphic. Drafted.
* **Wednesday, Instagram, help:** how to sleep without ruining braids. Short video. Idea.
* **Thursday, Status, prove:** client quote, shared with permission. Graphic. Drafted.
* **Friday, Instagram, show:** behind the scenes, Saturday prep. Short video. Idea.

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
        "Explain why search catches customers who are ready to act",
        "Describe how maps, profiles and websites work together in local search",
        "Check how a business appears when someone searches for it",
      ],
      explanation_md: `When someone in Tamale types "tailor near me" or someone in Accra searches "salon open now East Legon", they are not idly scrolling. They want something, often today. Search is the channel that catches people at that moment. If a business does not show up, or shows up with the wrong hours or an old phone number, the customer simply goes to the next result. Junior marketing adverts in Ghana mention SEO, Google tools and local visibility, and it is one of the DMP specialisations.

## Social media and search are different

On social media, you go to people: posts appear in feeds whether or not anyone was looking for them. With search, people come to you: they type what they need, and the search engine decides which results are most useful. That makes search slower to build but very valuable, because the people who arrive already want what the business offers.

## The three pieces of local visibility

For most small Ghanaian businesses, search visibility rests on three pieces:

* **A Google Business Profile.** The box with name, map pin, photos, hours, phone number and reviews that shows on Google Maps and in search. Free, and often the first thing a nearby customer sees.
* **A simple website or web page.** Somewhere the business controls, with clear text about what it offers and where. Search engines read it to understand the business.
* **Mentions elsewhere.** Listings in local directories, a partner's website, a news story or a tourism site. These help search engines and people trust that the business is real.

They work together. A profile might link to the website; the website shows the same address and number; directories repeat the same details. Consistency matters: if the hours or phone number differ from place to place, both customers and search engines get confused.

## How to check a business's visibility

Before you change anything, see what customers see. This takes about fifteen minutes on a phone or computer:

1. **Search the business's name** with its town. Does a profile appear? Are the details correct?
2. **Search the service plus the town,** such as "guest house Wa" or "shea butter Tamale". Does the business appear at all? Who appears instead?
3. **Open Google Maps** and search the same words. Is the map pin in the right place?
4. **Check reviews.** How many are there, how recent, and does the business reply?
5. **Look for a website.** If there is one, does it say clearly what the business does and where? Does it load quickly on a phone?
6. **Write down the gaps:** wrong details, no profile, no reviews, no website, competitors showing up instead.

## Phone and computer searches

Many local searches happen on phones, often on the move, so the profile's phone number, directions and opening hours matter most. Searches on a computer at work or school are more likely to lead to a website visit. Check results on both if you can, because what appears first can look different on each screen.

## Honest expectations

Nobody can guarantee a business the top spot on Google, and anyone who promises it is not being honest. Search engines aim to show the most relevant, trustworthy and helpful results. Your job is to make the business's information complete, correct and useful, and to keep it that way. Results often take weeks or months to change, so set expectations with clients early.

## What this section covers

* **Google Business Profile.** Creating, verifying and keeping a profile fresh, and handling reviews honestly.
* **SEO and keyword basics.** How search engines work, why a website matters, and how to write web content using the words customers search for.

Deeper topics such as detailed keyword research, on page optimisation, backlinks and local listings outreach are covered in the SEO track of the specialisations roadmap. This section gives you the base every one of those builds on, and it is enough to make a real difference for most small local businesses.`,
      workedExample_md: `Hawa sells shea butter in Tamale. Her nephew Fuseini runs a visibility check on his phone.

1. **Name search:** "Hawa's Pure Shea Tamale" shows nothing. No profile exists.
2. **Service search:** "shea butter Tamale" shows two other sellers with profiles, photos and a few reviews each.
3. **Maps:** Hawa's home workshop does not appear at all.
4. **Reviews:** none, since there is no profile.
5. **Website:** none. Her Facebook page has an old phone number.
6. **Gaps written down:** no profile, no reviews, wrong number on Facebook, competitors appear instead of her.

He explains to Hawa that people searching "shea butter Tamale" are ready to buy, and right now they find her competitors. They agree a plan: create and verify a Google Business Profile with a service area rather than her home address, fix the Facebook number so every channel matches, and build a simple one page site later. He also sets honest expectations: it may take weeks before she appears for the service search.

A month later, a customer messages Hawa saying she found her on Google Maps.`,
      keyTerms: [
        { term: "Search engine", definition: "A tool such as Google that finds web pages and places that match what someone types." },
        { term: "Local search", definition: "A search for something nearby, such as a service plus a town or \"near me\"." },
        { term: "Google Business Profile", definition: "A free listing that shows a business on Google Maps and in search results." },
        { term: "Visibility", definition: "How easily a business can be found when people search." },
        { term: "Consistency", definition: "Showing the same name, address, phone number and hours everywhere online." },
      ],
      commonMistakes: [
        "Promising a client the top spot on Google",
        "Leaving different phone numbers and hours on different sites",
        "Changing things before checking what customers currently see",
        "Expecting search results to change in a few days",
      ],
      selfCheck: [
        "What would a customer see today if they searched for a business you know plus its town?",
        "How is reaching people through search different from reaching them on social media?",
        "Which of the three pieces of local visibility is weakest for that business?",
      ],
      practice_task_md: `**Goal:** Run a local visibility check for one business.

**Steps:**
1. Choose a local business, such as a guest house, salon, clinic or shop.
2. Follow the six checking steps in the lesson on your phone or computer.
3. Take screenshots of what you find for the name search and the service search.
4. Write down every gap, and the two or three competitors who appear instead.
5. Write three improvements in order of importance.

**Done looks like:** A one page visibility check with screenshots, a list of gaps and three prioritised improvements you could explain to the owner.`,
      quiz: {
        questions: [
          {
            prompt: "Why are people who search \"tailor near me\" valuable to a business?",
            options: [
              "They are already looking for what the business offers, often today",
              "They always have larger budgets than people who scroll social media apps each evening",
              "They cannot see any competitors in the results",
              "Search engines pay businesses for each visitor",
            ],
            answer_index: 0,
            explanation: "Search catches people at the moment they want something.",
          },
          {
            prompt: "Why does consistency of details matter across profiles, websites and directories?",
            options: [
              "Search engines only read one site per business",
              "Directories charge businesses a fee every time their details are different",
              "Different hours or numbers confuse customers and search engines",
              "It makes the website load faster",
            ],
            answer_index: 2,
            explanation: "The lesson says inconsistent details confuse both customers and search engines.",
          },
          {
            prompt: "What should you do before changing a business's search presence?",
            options: [
              "Delete the old profile and start again",
              "Check what customers currently see when they search",
              "Buy a paid listing on every directory you can find in Ghana",
              "Ask the owner to change the business name",
            ],
            answer_index: 1,
            explanation: "The lesson's first job is a visibility check of what customers see now.",
          },
          {
            prompt: "A company promises your client the top spot on Google within a week. What does the lesson say?",
            options: [
              "Accept quickly before competitors do",
              "Only accept if the price is in cedis",
              "Top spots are guaranteed for verified businesses",
              "Nobody can guarantee the top spot, so the promise is not honest",
            ],
            answer_index: 3,
            explanation: "The lesson says nobody can guarantee rankings.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "google-business-profile": {
      outcomes: [
        "Create a Google Business Profile with accurate details for a shop",
        "Explain how verification works and why methods differ",
        "Ask for, and reply to, genuine reviews within Google's rules",
        "Keep a profile fresh with photos, hours and updates",
      ],
      explanation_md: `A Google Business Profile, once called Google My Business, is the box with a business's name, map pin, photos, hours, phone number and reviews that appears on Google Maps and in Google Search. It is free, it works even without a website, and for a nearby customer it is often the first thing they see. Setting up and maintaining profiles is a simple, valuable service for shops, guest houses, clinics, schools, salons and churches, and it is part of the DMP cohort's week on digital marketing concepts.

## Before you start

Gather the facts first, so you do not enter guesses: the exact name on the signboard, the main category, the address or the areas the business serves, opening hours, the phone or WhatsApp number customers should use, a website or social link, and several good daylight photos. Agree with the owner whose Google account will own the profile. It should be the business's account, with you added as a manager, so the owner never loses control if you stop working together.

## Creating the profile, step by step

You can start from Google Maps or from Google's Business Profile pages, on a phone or a computer. The screens change from time to time, so follow what Google shows, but the main steps are:

1. **Enter the business name** exactly as customers know it. Do not add extra words such as "Best Cheap Tailor Tamale". Stuffing keywords into the name breaks Google's guidelines and can get the profile suspended.
2. **Choose the main category,** the most accurate one, such as "Tailor", "Beauty salon" or "Guest house". You can add a few extra categories later if they are true.
3. **Set the location.** A shop customers visit gets an exact map pin. A business that travels to customers, such as a caterer or a plumber, can show a service area instead of a home address.
4. **Add contact details:** phone number and a website or social link. A WhatsApp number works if that is how the business takes orders.
5. **Verify the business** (see below).
6. **Complete the profile:** hours, special hours for holidays, a short description, services or products, and photos of the outside so people recognise it, the inside, products and staff (with permission).

## Verification

Google asks the owner to prove they really run the business. According to Google's help pages, methods can include a phone call or text, email, a video recording, a live video call or a postcard, and Google chooses which ones are offered based on the business type, region and other factors. You cannot pick the method yourself, and some businesses need more than one step. Read the instructions on screen carefully, and keep the signboard, shop interior and proof of the business ready in case a video is requested.

## Reviews

Reviews strongly influence whether people trust a business. Good practice:

* Ask happy customers to leave an honest review, for example with the review link from the profile or a QR code at the counter.
* Never pay or reward people for reviews, never write reviews for your own client, and never post fake ones. Google's policies forbid this and Google can remove reviews or restrict the profile.
* Reply to every review politely. Thank people for good ones. For bad ones, apologise, explain what you will do and invite them to contact the business privately.

## Keeping it fresh

Update hours before holidays such as Christmas and Eid, add new photos regularly, answer questions customers ask on the profile, and use the updates feature to share offers and events. A profile with recent activity looks alive and trustworthy. Check it monthly: other people can suggest edits to a profile, so make sure the details are still correct.

## What you can report

The profile shows simple performance numbers, such as how many people viewed it, asked for directions, called or clicked to the website. These are useful for client reports because they connect directly to customers taking action.`,
      workedExample_md: `Fuseini helps a small clinic in Tamale whose map pin pointed to the wrong street, so patients kept getting lost.

1. **Gather facts.** With the clinic manager, Mrs Wumpini Alhassan, he notes the exact name on the signboard, the correct location, hours including Sunday emergency hours, and the reception phone number.
2. **Ownership.** The profile already exists under an old staff member's account. The manager requests access through Google's process, and once it is the clinic's own Google account, she adds Fuseini as a manager.
3. **Fix the details.** He moves the map pin to the right street, checks the main category, and adds a short description of services.
4. **Photos.** He takes daylight photos of the entrance and signboard so patients recognise the building, plus the waiting area.
5. **Special hours.** He adds Eid and Christmas hours a week before each holiday.
6. **Reviews.** He prints a small card at reception with a QR code asking patients to share honest feedback, with no reward offered. The manager replies to each review politely.

After three months, the profile's numbers show more requests for directions, and staff report fewer lost patients calling from the wrong street.`,
      keyTerms: [
        { term: "Google Business Profile", definition: "A free Google listing showing a business on Maps and in search, formerly called Google My Business." },
        { term: "Verification", definition: "Google's check that the person managing a profile really runs the business." },
        { term: "Primary category", definition: "The main type of business chosen on the profile, such as Tailor or Guest house." },
        { term: "Service area", definition: "The areas a business serves, shown instead of an address when it travels to customers." },
        { term: "Review", definition: "A customer's public rating and comment about a business." },
        { term: "Manager", definition: "A person given access to edit a profile without owning it." },
      ],
      commonMistakes: [
        "Adding keywords like \"best\" or a town name to the business name",
        "Creating the profile under your own account instead of the owner's",
        "Offering discounts or gifts in exchange for reviews",
        "Forgetting to set special hours for holidays",
        "Never checking the profile again after setting it up",
      ],
      selfCheck: [
        "Whose Google account should own a client's profile, and why?",
        "How would you reply to a fair one star review about long waiting times?",
        "Which photos would help a first time customer find a business you know?",
      ],
      practice_task_md: `**Goal:** Create a Google Business Profile plan for a sample shop, or audit and improve a real one.

**Steps:**
1. Choose a shop near you, or a mock shop if you cannot work with a real owner.
2. Gather the facts: name, category, location or service area, hours, phone, link and at least four photos.
3. If the owner agrees, create or update the profile from their account and add yourself as a manager. Otherwise, write every field in a document as if you were filling it in.
4. Write a short, honest review request card with no reward offered.
5. Write a polite reply to one good and one bad sample review.

**Done looks like:** A live profile or a complete written plan, photos, a review request card and two sample replies.`,
      quiz: {
        questions: [
          {
            prompt: "What was Google Business Profile formerly called?",
            options: ["Google Shop Window", "Google My Business", "Google Shop Finder", "Google Local Pages"],
            answer_index: 1,
            explanation: "The lesson notes it was once called Google My Business.",
          },
          {
            prompt: "Who chooses the verification method for a Google Business Profile?",
            options: [
              "The business owner picks any method they like",
              "The marketer managing the profile",
              "Google, based on factors such as business type and region",
              "The customers who leave reviews",
            ],
            answer_index: 2,
            explanation: "Google decides which methods are offered and they cannot be chosen by the owner.",
          },
          {
            prompt: "Why should the business's own Google account own the profile, with you as a manager?",
            options: [
              "So the owner keeps control if you stop working together",
              "Because managers are not allowed to post photos or reply to any customer reviews",
              "Because profiles owned by marketers rank lower",
              "So Google can charge the owner a monthly fee",
            ],
            answer_index: 0,
            explanation: "Ownership by the business protects the owner if the marketer leaves.",
          },
          {
            prompt: "Which of these breaks Google's rules on reviews?",
            options: [
              "Asking happy customers for an honest review",
              "Replying politely to a negative review",
              "Putting a QR code linking to the review page at the counter",
              "Giving a discount to customers who leave five stars",
            ],
            answer_index: 3,
            explanation: "Rewarding people for reviews is forbidden.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "seo-basics": {
      outcomes: [
        "Explain how search engines crawl, index and rank pages",
        "Explain why a small business benefits from a simple website",
        "Find the words customers search for using free methods",
        "Lay out a homepage that uses keywords naturally",
      ],
      explanation_md: `Search engine optimisation, or SEO, is the work of helping web pages appear when people search for what a business offers. Ghanaian marketing adverts ask for SEO and keyword research, content roles at agritech and media companies expect it, and it is one of the three DMP specialisations. You can learn the basics without paying for any tools.

## How search engines work

In simple terms, a search engine such as Google does three things:

* **Crawls.** Automated programs follow links from page to page to discover what is on the web.
* **Indexes.** It stores and organises what each page is about, like a giant library catalogue.
* **Ranks.** When someone searches, it chooses which indexed pages are most helpful for that search and in what order.

Google says it aims to show helpful, reliable content made for people. There is no trick that guarantees the top spot, and anyone promising one is not being honest. The basics below simply make it easy for search engines and people to understand a page.

## Why a website matters

Many Ghanaian businesses rely only on social media. That works until an account is hacked, a platform changes, or a customer searches Google and finds nothing. A simple website:

* **Is owned by the business,** so it cannot be taken away by a platform's decision.
* **Can be found in search** for the questions customers type, not only by people who already follow the page.
* **Looks credible** to bigger clients, NGOs, tourists and buyers from other regions.
* **Holds the full story:** services, prices or price ranges, location, hours and how to order, all in one place.

It does not need to be expensive. Free and low cost website builders, Google Sites, or a single page with clear information is a strong start.

## Finding keywords

Keywords are the words and phrases people actually type. Find them by thinking like a customer and checking what search engines suggest:

1. **Ask customers** how they would search for the business.
2. **Use autocomplete.** Start typing "shea butter" and note the suggestions.
3. **Look at the results page** for related searches and common questions.
4. **Add places.** Many searches combine a service and a town: "basket weavers Bolgatanga", "event centre Tamale".
5. **Think about intent.** "How to store shea butter" is someone seeking information; "buy shea butter Tamale" is someone ready to buy. Match each page to the intent.

Pick one main phrase for each page, plus a few related ones. The specialisations roadmap covers keyword research tools and keyword mapping in depth.

## Laying out a homepage

A homepage should answer, within a few seconds, "What is this, is it for me, and what do I do next?" A simple layout, from top to bottom:

1. **Header:** logo or name, and a short menu (Home, Products or Services, About, Contact).
2. **Main heading with the main keyword:** "Pure shea butter from Tamale, delivered across Ghana".
3. **A short line underneath** with the main benefit, and one clear button: "Order on WhatsApp".
4. **A strong image** of the product, shop or people at work.
5. **Products or services** in a short list or grid, each with a photo, name and price or price range.
6. **Proof:** a few genuine customer comments shared with permission, or partners.
7. **About in two or three sentences:** who is behind the business and why customers can trust it.
8. **Contact and location:** phone, WhatsApp, address or map, opening hours.

You can sketch this on paper or as boxes on a slide before anyone builds it.

## On page basics

* **Page title:** a clear, unique title with the main keyword, such as "Handwoven Bolgatanga Baskets | Mariama Weavers".
* **Meta description:** a short summary that may show under the title in results.
* **Headings and text:** answer the searcher's question in plain words, using the keyword naturally, never stuffed.
* **Images:** small files with short descriptions (alt text) of what they show.
* **Fast and readable on any screen,** since many visitors are on phones with limited data.`,
      workedExample_md: `Mariama's basket group in Bolgatanga wants a one page website. You plan the homepage with them on Google Slides, using boxes as placeholders.

1. **Keywords.** Customers say they search "Bolga baskets" and "baskets Bolgatanga". Autocomplete also suggests "Bolga basket wholesale". You choose "Bolgatanga baskets" as the main phrase for the homepage, and note "wholesale" for a later page.
2. **Intent.** Most homepage visitors want to see and buy, so the page focuses on products and ordering.
3. **Layout on the slide,** from top to bottom:

* Header: group name and menu.
* Heading: "Handwoven Bolgatanga baskets from Mariama Weavers".
* Line and button: "Strong, colourful, made by our women's group. Order on WhatsApp."
* Image box: weavers at work.
* Product grid: market basket, shopping basket, decorative bowl, each with a price range.
* Proof: two customer comments shared with permission.
* About: three sentences on the group.
* Contact: WhatsApp, location near the market, hours.

**Title and description** written for the page: "Handwoven Bolgatanga Baskets | Mariama Weavers" and a one sentence summary.

The group can now hand this slide to whoever builds the site.`,
      keyTerms: [
        { term: "SEO", definition: "Search engine optimisation: helping pages appear in free search results." },
        { term: "Crawling", definition: "Search engine programs following links to discover pages." },
        { term: "Indexing", definition: "Storing and organising what each page is about so it can be found." },
        { term: "Ranking", definition: "Deciding which pages to show first for a search." },
        { term: "Search intent", definition: "What a person really wants when they type a search, such as to learn or to buy." },
        { term: "Page title", definition: "The clickable headline of a page in search results." },
        { term: "Alt text", definition: "A short description of an image that search engines and screen readers can read." },
      ],
      commonMistakes: [
        "Relying only on social media, so the business cannot be found in search",
        "Choosing keywords the owner likes instead of words customers type",
        "Stuffing the same keyword into every line of a page",
        "Hiding the business's location, prices and contact details deep in the site",
        "Uploading huge images that make pages slow on a phone",
      ],
      selfCheck: [
        "Can you explain crawling, indexing and ranking to a friend in three sentences?",
        "What would a customer type to find a business you know, and is that phrase informational or ready to buy?",
        "Does a homepage you know answer \"What is this, is it for me, and what do I do next?\" within a few seconds?",
      ],
      practice_task_md: `**Goal:** Draft a basic homepage layout for a small business using Google Slides.

**Steps:**
1. Choose a small business and find five phrases customers might search, using the steps in the lesson.
2. Pick one main phrase for the homepage and note its intent.
3. In Google Slides, draw boxes for each part of the layout: header, heading, line and button, image, products, proof, about, contact.
4. Write real text for the heading, button and about section, and label image placeholders with what each photo will show.
5. Write a page title and a one sentence description.

**Done looks like:** One or two slides showing a clear homepage layout with your keyword used naturally, plus a title and description, ready to submit.`,
      quiz: {
        questions: [
          {
            prompt: "What does a search engine do when it indexes a page?",
            options: [
              "Pays the page owner for each visitor",
              "Stores and organises what the page is about",
              "Deletes pages that have too many keywords",
              "Sends a copy of the page to every user's phone in the background",
            ],
            answer_index: 1,
            explanation: "Indexing is storing and organising what each page is about.",
          },
          {
            prompt: "Which search shows someone who is ready to buy?",
            options: [
              "How to store shea butter in the dry season",
              "History of shea trees in northern Ghana",
              "What is shea butter made from",
              "Buy shea butter Tamale",
            ],
            answer_index: 3,
            explanation: "A search with \"buy\" and a town shows intent to purchase.",
          },
          {
            prompt: "Which is a reason the lesson gives for a small business to have a website?",
            options: [
              "It can be found in search and cannot be taken away by a platform's decision",
              "Websites replace the need for any social media",
              "A website guarantees the top spot on Google",
              "Websites are required by law for all shops",
            ],
            answer_index: 0,
            explanation: "A website is owned by the business and can be found in search.",
          },
          {
            prompt: "On the suggested homepage layout, what should come straight after the main heading?",
            options: [
              "A long history of the business",
              "The full price list for every product",
              "A short benefit line and one clear button",
              "A list of all the keywords used on the page so that search engines notice",
            ],
            answer_index: 2,
            explanation: "The layout puts a short benefit line and one clear call to action under the heading.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "paid-ads": {
      outcomes: [
        "Explain how ad auctions and common pricing models work",
        "List the five decisions every campaign needs",
        "Decide whether paid ads make sense for a business right now",
      ],
      explanation_md: `Free posting only reaches some of the people who follow a page, and growing an audience from nothing takes time. Paid advertising lets a business pay a platform such as Meta, TikTok or Google to show its message to chosen people beyond its followers. Ghanaian adverts for digital marketers often mention Meta Ads and Google Ads, and both social and Google Ads are DMP specialisations. Handling a client's ad money carefully is a big responsibility, so this section starts with the basics.

## How online ads work

Most ad platforms run an **auction**. Many advertisers want to show ads to the same people. Each time there is space for an ad, the platform picks which one to show, based on how much advertisers are willing to pay and how relevant and useful their ad seems. That means a clear, relevant ad can sometimes beat a bigger budget.

Advertisers usually pay in one of a few ways:

* **Per thousand views (impressions).** Common for awareness campaigns.
* **Per click.** Common on search ads.
* **Per result.** The platform aims for an action you choose, such as messages or sign ups, and reports what each one cost.

## The five building blocks

Whichever platform you use, every campaign needs the same decisions:

1. **Goal.** What should happen? Awareness, website visits, WhatsApp messages, sign ups or sales. Choose one main goal per campaign.
2. **Audience.** Who should see it? Location, age, interests, past customers, or the words they search.
3. **Budget and schedule.** How much per day or in total, and for how long. Always set an end date.
4. **Creative.** The image or video and the words, following the copywriting and design lessons.
5. **Destination.** Where people go after clicking: a WhatsApp chat, a page, a form or a website. It must match the promise in the ad.

## Is the business ready for ads?

Ads make a good business busier; they rarely rescue a weak one. Before spending, check:

* **The offer is clear,** with a price or price range people can understand.
* **Someone can reply quickly.** Paying for WhatsApp messages that wait a day for a reply wastes money.
* **The profile or page looks trustworthy,** with recent posts and correct contact details.
* **There is a way to count results,** even a notebook tally of messages and sales.
* **The owner can afford to lose the test budget.** Early campaigns are partly for learning.

If several of these fail, fix them first using the free channels in earlier lessons.

## Organic and paid together

Paid ads work best on top of steady organic activity. A post that already gets good comments and shares often makes a strong ad, because people have shown they like it. Ads can also grow the list of people who later see free posts and Status updates.

## Rules and responsibility

All platforms review ads against their policies. Some topics, such as health products, financial services, jobs, housing, politics and alcohol, have extra rules or restrictions. Read the current policy before you build, or the ad may be rejected. In Ghana, the Food and Drugs Authority also sets rules for advertising regulated products such as food, cosmetics and medicines. Billing methods and currencies differ by country and change over time, so check each platform's billing help for Ghana before promising a client anything.

## What this section covers

* **Social media ads:** setting up a simple campaign on Meta and similar platforms, and testing two versions.
* **Search ads:** how keyword based ads on Google work at a basic level.
* **Budgets and payment for ads:** planning in cedis, cost per result, records and clear agreements.

Detailed campaign structure, audience targeting, match types and bidding belong to the specialisations roadmap. This section gives you the judgement to know when ads make sense and how to spend a small amount responsibly.`,
      workedExample_md: `Abdul-Rahman's phone accessories kiosk in Tamale wants to "run ads". Before taking any money, his friend Wumpini, a marketing student, uses the readiness check.

1. **Clear offer?** Partly. Prices are only given in chat. She asks him to add prices for his top ten items to his WhatsApp catalogue.
2. **Quick replies?** He used to reply hours later. Since setting up quick replies, he answers within the hour. Pass.
3. **Trustworthy page?** His Facebook page has recent posts and the right number. Pass.
4. **Counting results?** No. She sets up a simple sheet: date, messages, sales, and "where did you hear about us?".
5. **Affordable test?** He agrees a small test amount he could lose without hurting the business.

Then she writes the five building blocks:

* Goal: WhatsApp messages.
* Audience: adults within a few kilometres of the kiosk.
* Budget and schedule: the small test amount over seven days, with an end date.
* Creative: a short video of phone chargers and cases, price shown, from a post that already got good comments.
* Destination: a WhatsApp chat.

Only after the test and a look at the numbers will they decide whether to spend more.`,
      keyTerms: [
        { term: "Paid advertising", definition: "Paying a platform to show a message to chosen people beyond a page's followers." },
        { term: "Ad auction", definition: "The process a platform uses to choose which ad to show, based on bids and relevance." },
        { term: "Impressions", definition: "The number of times an ad was shown on screen." },
        { term: "Cost per click", definition: "The average amount paid each time someone clicks an ad." },
        { term: "Creative", definition: "The image, video and words that make up an ad." },
        { term: "Destination", definition: "Where people land after clicking an ad, such as a chat or web page." },
      ],
      commonMistakes: [
        "Running ads before the offer, page and replies are ready",
        "Setting no end date, so a campaign runs on by accident",
        "Choosing several goals in one campaign",
        "Sending people to a destination that does not match the ad",
        "Ignoring ad policies for health, finance and other restricted topics",
      ],
      selfCheck: [
        "Which of the readiness checks would a business you know fail today?",
        "Why might a relevant ad beat a bigger budget in an auction?",
        "What would you say to an owner who wants ads but replies to messages a day later?",
      ],
      practice_task_md: `**Goal:** Decide whether a real business is ready for paid ads, and outline a first test.

**Steps:**
1. Choose a business you know.
2. Go through the five readiness checks and mark each as pass or fail, with one line of evidence.
3. For any fail, write the free fix you would make first.
4. Write the five building blocks for a first small test campaign.
5. Write one sentence on what result would make the owner decide to continue.

**Done looks like:** A one page readiness check and a five line campaign outline you could discuss with the owner.`,
      quiz: {
        questions: [
          {
            prompt: "In an ad auction, what besides the bid affects which ad is shown?",
            options: [
              "The age of the business owner",
              "How relevant and useful the ad seems",
              "The number of staff the business has",
              "Whether the business has a website in English",
            ],
            answer_index: 1,
            explanation: "Platforms weigh both bids and how relevant and useful the ad seems.",
          },
          {
            prompt: "Which pricing model is common on search ads?",
            options: ["Per thousand views", "Per follower", "Per click", "Per month"],
            answer_index: 2,
            explanation: "The lesson says paying per click is common on search ads.",
          },
          {
            prompt: "An owner wants ads but replies to WhatsApp messages a day later. What does the lesson suggest?",
            options: [
              "Fix reply speed first, since paid messages that wait a day waste money",
              "Run ads anyway, because more messages will force quicker replies",
              "Double the budget to make up for lost customers",
              "Switch the destination to a phone number nobody answers",
            ],
            answer_index: 0,
            explanation: "Ads make a business busier; they cannot fix slow replies.",
          },
          {
            prompt: "Why can a post that already gets good comments make a strong ad?",
            options: [
              "Platforms show it for free",
              "Comments lower the price of every click",
              "Ads must always use old posts",
              "People have already shown they like it",
            ],
            answer_index: 3,
            explanation: "Organic engagement is a sign the content works, so it often makes a good ad.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "social-ads": {
      outcomes: [
        "Explain the difference between boosting a post and building a campaign",
        "Describe the campaign, ad set and ad levels in Meta's ad tools",
        "Run a fair A/B test on an ad or a post by changing one thing",
        "Judge a test by cost per result and decide what to keep",
      ],
      explanation_md: `Many small businesses in Ghana have tapped the "Boost" button on a Facebook or Instagram post and wondered where their money went. A marketer who can set up a simple campaign with a clear goal, a sensible audience and honest tracking is worth paying. Meta Ads appear in Ghanaian digital marketer adverts, and the DMP social media specialisation builds directly on this lesson. TikTok and other platforms have their own ad tools, but the ideas here carry across.

## Boosting versus a full campaign

**Boosting** a post is quick: you pick a post, an audience, a budget and a duration, all from the post itself. It suits simple goals, such as getting a good post in front of more local people. **Ads Manager**, Meta's main advertising tool, gives you more control over goals, audiences, placements and testing. Learn both, and be able to explain why you chose one.

## How a Meta campaign is organised

Ads Manager has three levels:

* **Campaign.** Where you choose the objective: the result you want, such as awareness, traffic, engagement, leads or sales. Meta renames and regroups objectives from time to time, so pick the one on screen that matches your goal.
* **Ad set.** Where you choose the audience, budget, schedule and placements (where the ad appears, such as Facebook, Instagram or Messenger).
* **Ad.** The creative: image or video, text, headline, button and destination.

A popular option for Ghanaian businesses is an ad that opens a WhatsApp chat, so interested people can ask questions and order the way they already prefer. The specialisations roadmap covers campaign structure and advanced targeting in detail.

## Setting up a simple campaign

1. **Write the goal in one sentence:** "Get WhatsApp messages from people near the shop who might order gift packs."
2. **Choose the matching objective** in Ads Manager.
3. **Set a simple audience:** location (a town or a radius around the shop), age if it truly matters, and keep the rest fairly broad so the platform can learn.
4. **Set a small daily or total budget and an end date.**
5. **Build the ad** using a strong post or a new creative, with the price and a clear button.
6. **Check the preview** on different placements, then submit for review. Meta reviews ads against its advertising standards before they run.

Ads Manager is easiest to use in a browser on a computer, especially for building campaigns. On a phone, you can usually check results and make quick changes through Meta's business apps or a mobile browser; the options change, so check what is available.

## A/B testing: change one thing

An A/B test compares two versions that are identical except for one change, to see which works better. For example:

* Two images with the same text and audience.
* The same image with two different first lines.
* The same ad sent to WhatsApp chat versus a website.

Steps:

1. **Choose one thing to test** and write what you expect: "The video will bring cheaper messages than the photo."
2. **Keep everything else the same:** audience, budget, dates.
3. **Run both long enough** to collect a fair number of results; a few days is usually the minimum, and tiny numbers can mislead.
4. **Compare cost per result,** not likes.
5. **Keep the winner,** pause the loser, and test the next idea.

Meta offers a built in A/B test feature, but you can also run a simple test by hand with two ads. The same idea works for free posts: post two styles at similar times on similar days and compare messages or shares.

## Follow the rules

Ads must follow Meta's advertising standards. Some topics, such as credit, jobs, housing, health products and social or political issues, have extra rules. Never make claims you cannot support, and never target or describe people in a way that singles out personal traits such as health conditions.`,
      workedExample_md: `Hawa wants more orders for her shea butter gift packs before Christmas. Abdul-Rahman plans a small campaign in Ads Manager on a computer at a hub.

1. **Goal:** WhatsApp messages from people near Tamale who might order gift packs.
2. **Objective:** the one on screen that aims for messages.
3. **Audience:** adults within a set distance of Tamale, otherwise broad.
4. **Budget:** a small daily amount Hawa agreed, for eight days, with an end date.
5. **A/B test:** two ads, identical text and button, one with a photo of the gift pack and one with a 15 second video of Hawa packing it. His expectation: the video will bring cheaper messages.
6. **Tracking:** a sheet where Hawa ticks each message and sale, with "ad" or "not ad".

After four days:

* **Photo:** 9 messages, at a higher cost per message.
* **Video:** 21 messages, at about half the photo's cost per message.

The numbers are small, so he waits two more days. The pattern holds. He pauses the photo and moves its budget to the video. At the end he shows Hawa the spend, the messages and the sales from her sheet, so she can see what the money achieved.`,
      keyTerms: [
        { term: "Boost", definition: "A quick way to turn an existing post into an ad from the post itself." },
        { term: "Ads Manager", definition: "Meta's main tool for building, running and measuring ad campaigns." },
        { term: "Objective", definition: "The result you tell the platform you want, such as messages or sales." },
        { term: "Ad set", definition: "The level where audience, budget, schedule and placements are chosen." },
        { term: "Placement", definition: "Where an ad appears, such as Facebook feed, Instagram Stories or Messenger." },
        { term: "A/B test", definition: "Comparing two versions that differ in only one way to see which works better." },
        { term: "Cost per result", definition: "Total spend divided by the number of results, such as messages." },
      ],
      commonMistakes: [
        "Boosting posts with no clear goal and no way to count results",
        "Changing several things at once, so you cannot tell what made the difference",
        "Stopping a test after a few hours with tiny numbers",
        "Judging ads by likes instead of cost per result",
        "Making very narrow audiences that push costs up",
      ],
      selfCheck: [
        "When would you choose a boost, and when Ads Manager?",
        "What one thing would you test first for a business you know, and what do you expect to happen?",
        "How would you explain cost per message to a business owner in one sentence?",
      ],
      practice_task_md: `**Goal:** Plan a mock social ad campaign with an A/B test, without spending money.

**Steps:**
1. Choose a mock or real business and write the campaign goal in one sentence.
2. Write down the objective, audience, budget, dates and destination.
3. Create two versions of the ad that differ in only one way, and write your expectation.
4. If you have access to Ads Manager, build the campaign up to the review step and stop there without publishing. Otherwise, write each setting in a document.
5. Using made up results, calculate cost per result for each version and decide which to keep.

**Done looks like:** A one page campaign plan, two ad versions, your test expectation and a short decision based on cost per result.`,
      quiz: {
        questions: [
          {
            prompt: "At which level of a Meta campaign do you choose the audience and budget?",
            options: ["Campaign", "Ad", "Ad set", "Page"],
            answer_index: 2,
            explanation: "The ad set is where audience, budget, schedule and placements are chosen.",
          },
          {
            prompt: "Which is a fair A/B test?",
            options: [
              "Two ads with different images, text, audiences and budgets",
              "One ad run for a week, then a different ad the next month",
              "Comparing your ad with a competitor's ad",
              "Two ads that are identical except for the image",
            ],
            answer_index: 3,
            explanation: "A fair test changes only one thing.",
          },
          {
            prompt: "How should you judge which version of an ad won?",
            options: [
              "By cost per result, such as cost per message",
              "By which one has more likes and heart reactions from followers",
              "By which one the owner prefers",
              "By which one was published first",
            ],
            answer_index: 0,
            explanation: "The lesson says to compare cost per result, not likes.",
          },
          {
            prompt: "Why did Abdul-Rahman wait two more days before deciding?",
            options: [
              "Meta does not show results before six days",
              "The numbers were small, and tiny numbers can mislead",
              "Hawa was travelling",
              "The budget had not been approved yet",
            ],
            answer_index: 1,
            explanation: "Small numbers can mislead, so he collected more results first.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "search-ads": {
      outcomes: [
        "Explain how search ads differ from social ads",
        "Describe how keywords, ads and landing pages fit together",
        "Write a simple search ad that matches what people type",
        "Start Google's free Skillshop training safely",
      ],
      explanation_md: `Search ads appear when someone types a search on Google, marked as sponsored, above or among the normal results. Because the person is already looking, these ads can bring customers who are ready to act. Some Ghanaian digital marketer adverts list Google Ads as a must have, and Google Ads is one of the three DMP specialisations. This lesson gives you the foundation; the specialisation goes deep.

## Search ads versus social ads

Social ads interrupt people while they scroll, so they must catch attention and create interest. Search ads answer a need someone has just typed, so they must be relevant and make it easy to act. A social ad for an event centre might show a beautiful wedding video to people who are not yet planning anything. A search ad for the same centre appears only when someone types something like "wedding venue Tamale". Both are useful; they do different jobs in the customer journey.

## How the pieces fit together

A simple search campaign has three linked parts:

* **Keywords.** The words and phrases that should trigger the ad, chosen from what customers actually type. Google's Keyword Planner, inside Google Ads, suggests ideas and rough search estimates. You can also control how closely a search must match a keyword and block unwanted searches with negative keywords; the specialisation teaches these settings in detail.
* **The ad.** Mostly text: several headlines and descriptions that Google combines and tests.
* **The landing page.** The page people reach after clicking. It must deliver what the ad promised.

If any one part is weak, the whole campaign suffers. A great ad leading to a confusing page wastes money.

## How Google chooses and charges

Google runs an auction each time someone searches. It looks at what advertisers are willing to pay and at the quality and relevance of their ads and landing pages. Better quality can mean lower costs, so relevance matters as much as money. Advertisers usually pay when someone clicks. You set an average daily budget, and Google's help pages explain that a campaign may spend more than that on some days and less on others, within a monthly limit.

## Writing a search ad, step by step

1. **Start from the search.** Write down two or three phrases the customer would type.
2. **Repeat their words in a headline,** so the ad is clearly relevant: "Wedding Venue in Tamale".
3. **Give a reason to choose this business:** location, capacity, price range, speed, trust. "Seats 300, Parking on Site".
4. **Add a clear action:** "Book a Viewing Today".
5. **Write a description** that adds detail and repeats the action in one or two short sentences.
6. **Check the landing page** shows the same thing: photos, capacity, prices or how to get a quote, and a WhatsApp or call button.
7. **Stay honest.** Google's ad policies forbid misleading claims, and some business types, such as financial services and health products, have extra requirements.

## When search ads make sense

Search ads suit businesses people actively search for: event venues, guest houses, schools, repair services, clinics, courses, and shops that deliver. They are less useful for products nobody searches for yet; social ads or content may work better there. Check the free options first: a complete Google Business Profile often brings local searches at no cost.

## Practising safely with Skillshop

Google's Skillshop offers free online courses on Google Ads, including search campaigns, with examples and assessments. It is a safe way to learn before using a client's money. Some courses lead to a certification; check the current details on Skillshop before relying on any certificate for a job application. Never practise with a real card on a live campaign without the owner's written agreement and a strict budget.

## Phone or computer

You can check campaigns in the Google Ads app on a phone, but building and editing campaigns is easier on a computer with a bigger screen, especially when writing many headlines or reading reports.`,
      workedExample_md: `Sumaila owns an event centre in Tamale. Amina plans a first search campaign with him on a laptop.

1. **Searches customers type:** "event centre Tamale", "wedding venue Tamale", "conference hall Tamale".
2. **Keywords:** she groups wedding phrases together, and notes that "free" and "jobs" should be blocked so the ad does not show for people looking for free halls or work.
3. **Headlines:** three short ones.

* "Wedding Venue in Tamale"
* "Seats 300, Parking on Site"
* "Book a Viewing Today"

**Description:** "Air conditioned hall near the city centre. See photos and prices, then book a viewing on WhatsApp."

**Landing page check:** the existing page only had one dark photo and no prices. Before launching, Sumaila adds bright photos, capacity, a price range and a WhatsApp button.

**Budget:** a small average daily budget agreed in writing, with an end date.

After two weeks, Amina looks at which searches triggered the ad and which led to WhatsApp chats. Wedding searches bring real bookings; "conference" searches bring few. She suggests putting more of the budget behind wedding phrases next month.`,
      keyTerms: [
        { term: "Search ad", definition: "A text ad shown in search results when someone types a related search." },
        { term: "Keyword", definition: "A word or phrase chosen to trigger an ad when people search for it." },
        { term: "Negative keyword", definition: "A word that stops an ad showing for searches you do not want." },
        { term: "Landing page", definition: "The page people reach after clicking an ad." },
        { term: "Pay per click", definition: "A pricing model where the advertiser pays when someone clicks the ad." },
        { term: "Skillshop", definition: "Google's free online training for its advertising and marketing tools." },
      ],
      commonMistakes: [
        "Writing ads that do not repeat the words people searched",
        "Sending clicks to a page that does not match the ad",
        "Running search ads for products nobody searches for",
        "Skipping the free Google Business Profile before paying for ads",
        "Practising on a live campaign without a written budget agreement",
      ],
      selfCheck: [
        "For a business you know, what three phrases would a ready to buy customer type?",
        "What would a visitor need to see on the landing page to act straight away?",
        "Would search ads or social ads suit that business better, and why?",
      ],
      practice_task_md: `**Goal:** Plan a small search campaign on paper and start the free Skillshop training.

**Steps:**
1. Choose a business people actively search for, such as a guest house, a school or a repair service.
2. Write five phrases customers would type and two words you would block.
3. Write three headlines and one description following the steps in the lesson.
4. Check the business's current landing page or profile and list what must change before any ad runs.
5. Open Google Skillshop, find a Google Ads search course, and complete the first module.

**Done looks like:** A one page plan with keywords, blocked words, ad text and landing page fixes, plus a screenshot of your first completed Skillshop module.`,
      quiz: {
        questions: [
          {
            prompt: "How do search ads differ from social ads, according to the lesson?",
            options: [
              "Search ads answer a need someone has just typed",
              "Search ads are always cheaper",
              "Social ads can only use text",
              "Search ads appear in people's feeds while they scroll",
            ],
            answer_index: 0,
            explanation: "Search ads respond to a search; social ads interrupt scrolling.",
          },
          {
            prompt: "What is a negative keyword used for?",
            options: [
              "To show the ad to more people",
              "To lower the price of every click on the campaign by half",
              "To stop the ad showing for searches you do not want",
              "To write negative reviews of competitors",
            ],
            answer_index: 2,
            explanation: "Negative keywords block unwanted searches.",
          },
          {
            prompt: "What did Sumaila have to fix before the campaign launched?",
            options: [
              "The business name on the signboard",
              "The landing page, which had one dark photo and no prices",
              "The headlines, which were too short and did not mention Tamale at all",
              "His Google account password",
            ],
            answer_index: 1,
            explanation: "A weak landing page wastes clicks, so it was fixed first.",
          },
          {
            prompt: "What does the lesson say about certificates from Skillshop?",
            options: [
              "They guarantee a job in Ghana",
              "They must be paid for before any course can be started",
              "They replace the need for real work in a portfolio",
              "Check the current details on Skillshop before relying on one",
            ],
            answer_index: 3,
            explanation: "Courses are free; check certification details on Skillshop.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "budgets-in-cedis": {
      outcomes: [
        "Separate ad spend from your own fee in every agreement",
        "Set up client billing so the client keeps control of the account",
        "Calculate cost per result and check whether a campaign made money",
        "Keep a simple budget record a client can understand in a minute",
      ],
      explanation_md: `Money causes more fights between marketers and clients than anything else. Who paid the platform? Why did the card get charged more than expected? What did the money achieve? If you handle budgets clearly and keep good records, clients trust you with bigger campaigns. Ghanaian adverts for senior marketing roles list budget management as a core duty, and it starts with habits you can build now.

## Two different costs

Always separate:

* **Ad spend.** The money paid to the platform, such as Meta or Google, to show ads.
* **Your fee.** What the client pays you for planning, creating and managing the work.

Write both down in your agreement, with dates. Clients should never be surprised by either.

## Who pays the platform

The safest arrangement is that the client adds their own payment method to their own ad account and gives you access to manage it. That way you never hold the client's money, every charge appears in their records, and if you stop working together they keep the account and its history. If you ever pay on a client's behalf, get the money first, keep every receipt and agree it in writing.

Platforms bill in different ways, and the accepted payment methods and currencies for Ghana change over time. An ad account may be set in a currency other than cedis, so the cost in cedis depends on the exchange rate and bank charges on the day. Check the platform's billing help and tell the client this in advance.

## How budgets behave

* **Daily or total budgets.** Set one for every campaign. Platforms do not spend exactly the same each day. Google's help pages, for example, explain that a campaign can spend up to about twice its average daily budget on a busy day, but over a month it will not charge more than about 30.4 times the average daily budget. Read how each platform works before promising exact figures.
* **Spending limits.** Many ad accounts let you set an overall limit as a safety net.
* **End dates.** Give campaigns an end date so nothing runs for ever by accident.

## Planning a budget, step by step

1. **Start from the goal and a target cost.** How much can the business afford to pay for one result, such as a sale? That depends on the profit on each sale.
2. **Choose a test amount** the owner can afford to lose while you learn.
3. **Split it** across the test period and any versions you are comparing.
4. **Add a buffer** for exchange rates and bank charges if the account is not in cedis.
5. **Agree it in writing,** with the end date and when you will report.

## Working out cost per result

The key number is what each result cost: total spend divided by the number of results.

Imagine Hawa spends GHS 300 on a campaign and gets 30 WhatsApp messages. Each message cost GHS 10. If six of those people bought, each sale cost GHS 50. If a gift pack gives her GHS 80 profit, the campaign made money. If it gives GHS 30 profit, it lost money even though the messages looked good. These numbers are only an example; use the client's real figures.

This is why you track results that connect to money, not only clicks or likes.

## Keep a simple record

A Google Sheet with columns for date, campaign, platform, amount spent, results, sales and notes is enough. Add screenshots or downloads of billing pages each month. When a client asks where the money went, you can show them in a minute. Share the sheet with the client so they can see it at any time.

## Being honest about money

If a campaign loses money, say so early, explain what you learned and suggest what to change or whether to stop. Never hide charges, never add your own markup to ad spend without telling the client, and never keep unused ad money. Trust about money is what turns a one off job into a long relationship.`,
      workedExample_md: `Mariama's basket group hires Wumpini to run a small Instagram campaign for gift baskets.

1. **Agreement:** Wumpini writes a one page agreement with her monthly fee and, separately, the ad budget, with dates.
2. **Billing:** the group adds its own card to its ad account and gives Wumpini access. She never handles the ad money.
3. **Target cost:** each gift basket gives the group about GHS 60 profit (their figure), so a sale must cost well under that.
4. **Test amount:** the group agrees GHS 400 for two weeks, split evenly between two ad versions, plus a small buffer because the card is charged in another currency.
5. **Safety:** she sets an account spending limit and an end date.
6. **Record:** a shared sheet with date, spend, messages and sales, updated every Friday.

After two weeks the sheet shows GHS 400 spent, 32 messages and 8 sales. Cost per sale: GHS 50. That is under the GHS 60 profit, but only just. Wumpini tells the group honestly: the campaign covered its cost, version B did better, and she suggests running only B next time to bring the cost per sale down.`,
      keyTerms: [
        { term: "Ad spend", definition: "Money paid to a platform to show ads." },
        { term: "Fee", definition: "What a client pays the marketer for planning and managing the work." },
        { term: "Daily budget", definition: "The average amount a campaign is set to spend each day." },
        { term: "Spending limit", definition: "A cap on the total an ad account can spend." },
        { term: "Cost per result", definition: "Total spend divided by the number of results." },
        { term: "Exchange rate", definition: "The price of one currency in another, which changes the cedi cost of foreign charges." },
      ],
      commonMistakes: [
        "Mixing ad spend and your fee in one unclear amount",
        "Paying for ads with your own card and being owed money by the client",
        "Forgetting exchange rates and bank charges when the account is not in cedis",
        "Judging a campaign by messages without checking profit per sale",
        "Hiding a losing campaign instead of reporting it early",
      ],
      selfCheck: [
        "How would you explain the difference between ad spend and your fee to a new client?",
        "If a campaign cost GHS 200 and brought 4 sales, what was the cost per sale?",
        "Why is it safer for the client's own card to be on the ad account?",
      ],
      practice_task_md: `**Goal:** Build a budget tracker and practise cost per result calculations.

**Steps:**
1. In Google Sheets or another free spreadsheet, create columns: date, campaign, platform, spend, results, sales, notes.
2. Fill in two weeks of made up data for a small campaign.
3. Add formulas for total spend, cost per result and cost per sale.
4. Choose a profit per sale and write whether the campaign made money.
5. Write a three line agreement that separates ad spend from your fee and says who pays the platform.

**Done looks like:** A working sheet with formulas, a short profit check and a clear three line agreement.`,
      quiz: {
        questions: [
          {
            prompt: "What is the safest way for a client's ads to be paid for?",
            options: [
              "The marketer pays with their own card and sends the client an invoice later",
              "The client sends MoMo to the marketer for each ad",
              "The client's own payment method is on the client's own ad account",
              "The marketer borrows from another client's budget",
            ],
            answer_index: 2,
            explanation: "The client keeps control and every charge appears in their records.",
          },
          {
            prompt: "A campaign spends GHS 300 and brings 30 messages, of which 6 people buy. What is the cost per sale?",
            options: ["GHS 10", "GHS 30", "GHS 6", "GHS 50"],
            answer_index: 3,
            explanation: "GHS 300 divided by 6 sales is GHS 50 per sale.",
          },
          {
            prompt: "According to Google's help pages, what can happen with an average daily budget?",
            options: [
              "Spend can go higher on some days but stays within a monthly limit",
              "Google always spends exactly the daily budget, never more or less",
              "Google charges the full monthly budget on the first day",
              "Budgets only apply to social media ads",
            ],
            answer_index: 0,
            explanation: "Daily spend varies, but monthly charges stay within about 30.4 times the daily average.",
          },
          {
            prompt: "Why might the cedi cost of a campaign differ from what was planned?",
            options: [
              "Platforms change prices every hour",
              "The account may be charged in another currency, with exchange rates and bank charges",
              "Clients always pay late",
              "Cedis cannot be used to plan budgets",
            ],
            answer_index: 1,
            explanation: "Foreign currency billing adds exchange rate and bank charge differences.",
          },
        ],
        pass_threshold: 75,
      },
    },
    measurement: {
      outcomes: [
        "Describe the plan, do, measure, learn and report loop",
        "Sort numbers into attention, action and money numbers",
        "Choose one main number to watch for a goal",
        "Explain how testing one change at a time helps you learn",
      ],
      explanation_md: `Many small business owners in Ghana have paid someone for "social media" and never known whether it helped. That is why clients often stop paying marketers after a few months. If you can plan a campaign with a clear goal, track what happens and explain the results honestly, you become someone they keep. Adverts for junior and senior roles alike ask for campaign planning, performance monitoring and reporting.

## The loop

Good marketing runs in a loop:

1. **Plan.** Decide the goal, audience, message, channels, budget and the number you will watch.
2. **Do.** Create and publish the content or ads.
3. **Measure.** Collect the numbers and what customers say.
4. **Learn.** Decide what to keep, change or stop.
5. **Report.** Share it with the client or manager, then plan the next round.

Each round should be a little better than the last because you learned something. A marketer who skips measuring is guessing, however good the posts look.

## Numbers that matter

Platforms show many numbers. Some feel good but say little about money. Others connect directly to the business goal.

* **Attention numbers:** reach, impressions, views, likes, followers, website visitors. Useful for awareness, but they do not pay bills on their own.
* **Action numbers:** messages, calls, link clicks, sign ups, direction requests, time spent on a page.
* **Money numbers:** orders, sales, revenue, cost per sale.

For most small businesses, action and money numbers matter most. A post with fewer likes that brings five orders is better than a viral post that brings none. Numbers that look impressive but do not connect to the goal are sometimes called vanity metrics.

## Choosing the one number to watch

Every campaign should have one main number that tells you whether it is working, plus a few supporting ones. Pick it from the goal:

* Goal: more orders on WhatsApp. Main number: orders from people who mention the post or ad.
* Goal: more people at an event. Main number: registrations.
* Goal: more visits to a shop. Main number: direction requests and "where did you hear about us?" answers.
* Goal: more newsletter sign ups. Main number: new subscribers.

Write the number and a realistic target in the plan before you start, so you cannot change your mind afterwards about what "success" means.

## Where the numbers come from

* **Platform insights** on Facebook, Instagram, TikTok and WhatsApp Business.
* **Google Business Profile** performance: calls, directions and website clicks.
* **Website analytics,** such as Google Analytics, which the next lesson covers.
* **The business's own records:** a sales book, a MoMo statement, a booking diary.
* **Asking customers** "Where did you hear about us?" and writing the answer down. For many Ghanaian small businesses, this simple question is the most reliable measure of all, because so many sales happen in chat or in person where no app can follow them.

## Keeping it simple

You do not need complicated dashboards. A sheet with one row per week and a column for each number you chose is enough for most small businesses. Fill it in on the same day every week, add a short note about anything unusual, such as a holiday or a power cut, and look at the trend over a month before drawing conclusions.

## Learning by testing

The quickest way to learn is to change one thing at a time and compare. This is called A/B testing. Post two styles of caption on similar days, or run two versions of an ad with everything else the same, and see which brings more of your main number. If you change the picture, the text and the time all at once, you will not know which change made the difference. Use enough results to be fair; one day of tiny numbers can mislead.

## What this section covers

* **Planning a campaign:** turning a goal into a one page plan.
* **Analytics basics:** reading platform insights and Google Analytics.
* **Reporting to clients:** short, honest reports that keep clients.

Phone or computer both work for collecting numbers. A spreadsheet on a computer makes it easier to compare weeks and build a report.`,
      workedExample_md: `Issahaku helps a Tamale chop bar that wants more lunchtime orders by WhatsApp.

1. **Plan:** goal is more lunch orders on WhatsApp in four weeks. Main number: orders where the customer mentions Status or Facebook. Supporting numbers: Status views and messages.
2. **Do:** a daily menu photo on WhatsApp Status at 10am, and three Facebook posts a week.
3. **Measure:** the owner, Madam Hawa, ticks a column in her order book whenever a customer says they saw the menu. Issahaku notes Status views and messages each evening.
4. **Learn:** after two weeks, he tests one change. On Monday, Wednesday and Friday he keeps the photo; on Tuesday and Thursday he adds the price and "send ORDER to 024 000 0000" in large text on the photo. Everything else stays the same.
5. **Report:** after four weeks his one page summary shows Status views were steady, but days with price and order text on the photo brought clearly more ticked orders.

The attention number (views) barely moved; the action and money numbers did. Next month every menu photo carries the price and order line, and he tests a new posting time.`,
      keyTerms: [
        { term: "Metric", definition: "A number that measures something, such as reach or orders." },
        { term: "Vanity metric", definition: "A number that looks good but does not show progress toward the goal." },
        { term: "Action number", definition: "A count of people doing something useful, such as messaging or calling." },
        { term: "Main number", definition: "The one metric chosen in advance to judge whether a campaign is working." },
        { term: "Attribution", definition: "Working out which activity led to a sale or action." },
        { term: "A/B test", definition: "Comparing two versions that differ in one way to see which works better." },
      ],
      commonMistakes: [
        "Reporting likes and followers when the goal was orders",
        "Deciding what success means only after seeing the results",
        "Changing several things at once and not knowing what worked",
        "Forgetting offline sales and the simple question \"Where did you hear about us?\"",
      ],
      selfCheck: [
        "For a business you know, which of its numbers are attention, action and money numbers?",
        "What one main number would you choose for its next campaign, and why?",
        "How would you test one change to a post without changing anything else?",
      ],
      practice_task_md: `**Goal:** Choose and track the right numbers for one small campaign.

**Steps:**
1. Pick a real or mock business and write one goal for the next four weeks.
2. Choose one main number and two supporting numbers, and write a realistic target.
3. List where each number will come from, including at least one offline source.
4. Design one A/B test that changes only one thing.
5. Set up a simple sheet with a row per week and a column per number.

**Done looks like:** A short measurement plan with the goal, main number, sources, an A/B test and a tracking sheet ready to fill in.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a money number?",
            options: [
              "Total reach of the campaign",
              "Number of new followers this month",
              "Cost per sale",
              "Likes on the best post",
            ],
            answer_index: 2,
            explanation: "Cost per sale connects directly to money.",
          },
          {
            prompt: "Why should you choose the main number before a campaign starts?",
            options: [
              "So you cannot change your mind afterwards about what success means",
              "Because platforms need it before you can post",
              "So the client never has to see the results at all",
              "Because the number cannot be measured at all once the campaign has started",
            ],
            answer_index: 0,
            explanation: "Deciding in advance keeps the judgement honest.",
          },
          {
            prompt: "Why is asking \"Where did you hear about us?\" so useful for small Ghanaian businesses?",
            options: [
              "It is required by the platforms",
              "Customers expect a discount for answering",
              "It replaces the need for any planning",
              "Many sales happen in chat or in person where no app can follow them",
            ],
            answer_index: 3,
            explanation: "Apps cannot track sales made in chat or face to face, so asking fills the gap.",
          },
          {
            prompt: "In Issahaku's test, why did he keep everything the same except the text on the photo?",
            options: [
              "Changing the posting time is not allowed on WhatsApp Status for business accounts",
              "So he could tell whether the price and order text made the difference",
              "Because the owner refused any other change",
              "Because photos cannot be tested",
            ],
            answer_index: 1,
            explanation: "Changing one thing at a time shows what caused the result.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "campaign-plan": {
      outcomes: [
        "Write a specific, measurable, time bound campaign goal",
        "Build a one page campaign plan across two or three channels",
        "Set a timeline with launch, reminders and a final push",
        "Share out campaign work clearly in a team",
      ],
      explanation_md: `A campaign is a focused push to achieve one goal in a set time, such as filling a church conference, selling Christmas gift packs or getting sign ups for an NGO training. Ghanaian adverts ask marketers to plan and run campaigns, and the DMP cohort's week 10 is built around a unified campaign plan that a team presents together. Clients are far more willing to approve spending when they see a clear plan on one page.

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
* **Offer.** If there is one: a discount, a free gift, early registration.
* **Channels.** Two or three channels, each with a clear job.
* **Content.** The main pieces you will create: graphics, videos, captions, emails.
* **Budget.** Ad spend and any production costs, in cedis.
* **Timeline.** Key dates: launch, reminders, last day.
* **Measurement.** The main number to watch and where it comes from.
* **Roles.** Who does what, and who approves.

## Making channels work as one

A unified, or integrated, campaign uses several channels that tell the same story and point to the same action. The message, colours, offer and dates match everywhere. Each channel has its own job in the customer journey. For example: TikTok clips create awareness, an Instagram or Facebook post gives details, a WhatsApp chat or a registration form takes the action, and an email or Status reminder brings back people who have not acted yet. If a customer sees the campaign in three places, it should feel like one campaign, not three.

## Building the timeline

1. **Fix the end date** and work backwards.
2. **Set the launch** with enough time for people to hear about it and act, often two to four weeks for a local event.
3. **Plan reminders** at regular points, such as weekly, and a final push in the last few days, when many people decide.
4. **Leave time before launch** to create content, get approvals and test links.
5. **Mark check points** where you look at the main number and adjust.

A simple table in a spreadsheet, with weeks across the top and channels down the side, makes the timeline easy to see on any screen.

## Working as a team

Campaigns are often team work, whether in an agency, a company or a DMP cohort group. Keep it smooth:

* **Agree roles early:** for example, one person on writing, one on design, one on ads and measurement, one coordinating.
* **Keep one shared plan** in Google Docs or Sheets, so everyone works from the same version.
* **Set deadlines for each piece** and a single person who gives final approval.
* **Meet briefly and regularly,** even ten minutes on a call, to check progress against the timeline.
* **Credit each person's work** when you present.

## Presenting the plan

When you present to a client or a panel, keep it short: the goal, who it is for, the message, how the channels work together, the timeline, the budget and how you will measure success. Show one or two finished example pieces so people can picture it. Invite questions, and be ready to explain why you left things out.`,
      workedExample_md: `Issahaku, Hawa and Abdul-Rahman form a team in their cohort to plan a campaign for a Tamale church youth conference.

**Goal:** 60 registrations by 15 December.

**Audience:** young people aged 16 to 30 in Tamale churches, plus friends from nearby towns.

**Message:** "Two days of worship, talks and networking. Free, but places are limited."

**Channels and jobs:**
* TikTok: short clips from last year (awareness).
* Facebook event: details, map, speakers (interest).
* WhatsApp: registration link in the church group and on Status (action).
* Email: reminder to past attendees (bring people back).

**Timeline:** content ready 10 November, launch 15 November, weekly reminders, final push 12 to 14 December.

**Budget:** no ads at first; printing a small poster with a QR code.

**Measurement:** registrations on the form, checked every Monday, plus "How did you hear about us?" on the form.

**Roles:** Hawa writes captions and the email, Abdul-Rahman designs graphics and edits clips, Issahaku coordinates and tracks registrations. The youth leader approves.

They keep everything in one shared Google Doc. At the 1 December check point, registrations are behind target, so they add a short video invitation from the youth leader.`,
      keyTerms: [
        { term: "Campaign", definition: "A focused push to reach one goal in a set time." },
        { term: "SMART goal", definition: "A goal that is specific, measurable, achievable, relevant and time bound." },
        { term: "Integrated campaign", definition: "A campaign where several channels tell one story and point to one action." },
        { term: "Timeline", definition: "The dates for preparation, launch, reminders, check points and the end." },
        { term: "Offer", definition: "A reason to act now, such as a discount, gift or limited places." },
        { term: "Check point", definition: "A planned date to review the main number and adjust the campaign." },
      ],
      commonMistakes: [
        "Setting a vague goal such as \"more awareness\" with no number or date",
        "Using different messages, offers or dates on different channels",
        "Launching too late for people to hear about it and act",
        "Leaving roles unclear in a team so work is duplicated or missed",
        "Promising targets as if they were guaranteed results",
      ],
      selfCheck: [
        "Can you rewrite \"get more customers\" as a specific, measurable, time bound goal?",
        "How would each channel in your plan move people one step along the customer journey?",
        "If your team were behind target at the halfway check point, what would you change first?",
      ],
      practice_task_md: `**Goal:** Write and present a one page unified campaign plan for a real or mock organisation.

**Steps:**
1. Choose an organisation and a campaign, such as an event, a seasonal offer or a sign up drive.
2. Write a specific, measurable, time bound goal.
3. Fill in every part of the one page plan, including roles if you are working in a team.
4. Build a timeline table with weeks across the top and channels down the side.
5. Create one example piece of content, then present the plan in five minutes to a friend, mentor or your cohort group.

**Done looks like:** A one page plan, a timeline table, one example piece and notes on the questions you were asked.`,
      quiz: {
        questions: [
          {
            prompt: "Which is the best campaign goal, according to the lesson?",
            options: [
              "Get more awareness for the church among as many people as possible",
              "Get 60 registrations for the youth conference by 15 December",
              "Post every day on every platform",
              "Become famous in Tamale",
            ],
            answer_index: 1,
            explanation: "It is specific, measurable and time bound.",
          },
          {
            prompt: "What makes a campaign integrated or unified?",
            options: [
              "Each channel uses a different offer and different dates to see which one works best",
              "It only uses one channel",
              "It is run by one person alone",
              "Several channels tell the same story and point to the same action",
            ],
            answer_index: 3,
            explanation: "Integrated campaigns keep message, offer and dates consistent across channels.",
          },
          {
            prompt: "How should you build a campaign timeline?",
            options: [
              "Fix the end date and work backwards",
              "Start posting today and decide the end date later",
              "Post all content on the launch day",
              "Plan reminders only after the campaign ends",
            ],
            answer_index: 0,
            explanation: "The steps start with the end date and work backwards.",
          },
          {
            prompt: "What helps a campaign team avoid working from different versions of the plan?",
            options: [
              "Each person keeping their own notes on their phone",
              "Sending the plan as photos in a group chat",
              "Keeping one shared plan in Google Docs or Sheets",
              "Waiting until the end to combine everyone's work",
            ],
            answer_index: 2,
            explanation: "One shared plan keeps everyone on the same version.",
          },
        ],
        pass_threshold: 75,
      },
    },
    analytics: {
      outcomes: [
        "Explain core web analytics terms such as users, sessions, engagement and key events",
        "Find your way around a Google Analytics report using the free demo account",
        "Read basic social media insights and compare posts fairly",
        "Use tracking links to see which channel sent visitors",
      ],
      explanation_md: `Analytics means collecting and reading data about what people do, so you can make better decisions. Ghanaian adverts for digital marketers ask for Google Analytics and for monitoring campaign performance, and the DMP cohort spends a full week on it. You do not need to be good at maths. You need to know which numbers matter, where to find them and how to spot a pattern.

## Social media insights

Every major platform gives free insights for business accounts:

* **Facebook and Instagram** show reach, impressions, engagement, followers and actions such as messages and link clicks.
* **TikTok** business accounts show views, watch time, followers and where viewers came from.
* **WhatsApp Business** shows basic message statistics.
* **Google Business Profile** shows how people found the profile and whether they called, asked for directions or visited the website.

The names of these numbers change from time to time, so read each platform's help pages for current definitions. When comparing posts, compare like with like: a post shown to many more people will naturally get more likes, so look at rates, such as engagement divided by reach, as well as totals.

## Website analytics with Google Analytics

If a business has a website, Google Analytics is a free tool that records what visitors do. The current version is Google Analytics 4. Terms you will meet:

* **Users.** People who visited. Active users are those who engaged during a period.
* **Sessions.** Visits; one user can have several.
* **Engaged sessions and engagement rate.** Visits where people stayed a while, viewed more than one page or did something important, and the share of all sessions that were engaged.
* **Average engagement time.** Roughly how long the page was actually in use.
* **Events.** Things people do, such as viewing a page, scrolling, clicking a link or sending a form.
* **Key events.** Events you mark as especially important, such as a completed booking form. Older guides call these conversions; Google now uses "conversion" for a separate advertising measure.
* **Traffic sources.** Where visitors came from: search, social media, email, a referral from another site, or typing the address directly.

## Practise with the demo account

You do not need your own website to practise. Google offers a free demo account that any Google account holder can open, with real data from Google's own merchandise shop and a game app. You get view only access, so you cannot break anything. Search for "Google Analytics demo account" on Google's help pages to find the access link.

Steps for a first look, best done on a computer for the bigger screen, though the Google Analytics app also works on a phone:

1. **Open the demo property** and go to Reports.
2. **Set the date range,** for example the last 28 days.
3. **Look at the overview** for users, sessions and engagement.
4. **Open the acquisition reports** to see which traffic sources brought the most users, and which brought the most engaged sessions.
5. **Open the engagement reports** to see which pages and events were most common.
6. **Look at key events** to see which actions the business treats as most important.
7. **Write three sentences:** what you noticed, one possible reason, and one question you would ask the business.

Menus are renamed from time to time; if a report has moved, use the search bar inside Google Analytics.

## Tracking links

When you share a website link in a post, email or ad, you can add tracking tags, often called UTM parameters, so Google Analytics shows exactly which campaign sent the visitor. Google offers a free Campaign URL Builder to create them. Keep names simple and consistent, such as source "whatsapp" and campaign "christmas_gift_packs".

## Reading data sensibly

* **Look for patterns over weeks,** not single days.
* **Compare to last period** and to your target.
* **Connect numbers to the goal.** A rise in visitors means little if bookings fall.
* **Remember what analytics cannot see:** sales in chat or in person. Combine data with the business's own records.
* **Respect privacy.** Analytics should describe groups, not track named individuals, and websites should tell visitors how data is used.`,
      workedExample_md: `Amina is preparing for week 6 of her cohort. She has no website of her own, so she opens the Google Analytics demo account on a library computer.

1. **Date range:** last 28 days.
2. **Overview:** she notes total users and sessions, and the engagement rate.
3. **Acquisition:** organic search brought the most users. Email brought far fewer users but a higher engagement rate.
4. **Engagement:** product pages for one clothing range had the most views.
5. **Key events:** purchases and add to cart actions are marked as key events.
6. **Her three sentences:** "Search brings the most visitors, but email visitors engage more deeply. This may be because email subscribers already know and like the shop. I would ask the business whether email visitors also buy more, and whether they could grow the email list."

She then checks the Instagram insights for a mock salon page she runs for practice. One post reached many people but had a low engagement rate; a smaller tip video had a much higher rate and brought two booking messages. She adds both observations to her one page analytics report.`,
      keyTerms: [
        { term: "Google Analytics 4", definition: "The current version of Google's free website analytics tool." },
        { term: "Session", definition: "One visit to a website; a user can have several." },
        { term: "Engagement rate", definition: "The share of sessions where people engaged, for example by staying a while or acting." },
        { term: "Event", definition: "An action recorded on a website, such as a page view or form sent." },
        { term: "Key event", definition: "An event marked as especially important, formerly called a conversion in Analytics." },
        { term: "Traffic source", definition: "Where a visitor came from, such as search, social or email." },
        { term: "UTM parameters", definition: "Tags added to a link so analytics can show which campaign sent the visitor." },
      ],
      commonMistakes: [
        "Comparing total likes between posts with very different reach",
        "Panicking over a single bad day instead of looking at trends",
        "Assuming analytics shows all sales, when many happen in chat or in person",
        "Using inconsistent names in tracking links, which splits results",
        "Collecting numbers without connecting them to the goal",
      ],
      selfCheck: [
        "Can you explain the difference between a user, a session and a key event?",
        "In the demo account, which traffic source would you investigate further, and why?",
        "How would you fairly compare two posts that reached very different numbers of people?",
      ],
      practice_task_md: `**Goal:** Write a one page analytics report for a mock business using real demo data and social insights.

**Steps:**
1. Open the Google Analytics demo account and follow the seven first look steps in the lesson.
2. Record users, sessions, engagement rate and the top two traffic sources for the last 28 days.
3. If you manage any business or practice page, note reach and engagement for three posts. If not, use the example in the lesson.
4. Write three findings, one possible reason for each, and two next steps.
5. Fit it all on one page with one screenshot.

**Done looks like:** A one page analytics report with key metrics, three findings and two proposed next steps.`,
      quiz: {
        questions: [
          {
            prompt: "What are key events in Google Analytics?",
            options: [
              "Events you mark as especially important, such as a completed booking form",
              "Every page view on the website",
              "Visits that arrive from search engines only, not from social media or from email",
              "The days a website is busiest",
            ],
            answer_index: 0,
            explanation: "Key events are important actions, formerly called conversions in Analytics.",
          },
          {
            prompt: "How can you practise Google Analytics without your own website?",
            options: [
              "Copy a competitor's login details",
              "Pay for a premium Analytics licence",
              "Build a website first, since there is no other option",
              "Use Google's free demo account with view only access",
            ],
            answer_index: 3,
            explanation: "The demo account is free for any Google account holder and view only.",
          },
          {
            prompt: "A post reached far more people than another. How should you compare them fairly?",
            options: [
              "Only compare total likes",
              "Delete the post with fewer likes",
              "Look at rates, such as engagement divided by reach, as well as totals",
              "Assume the post that reached more people was better, whatever the engagement",
            ],
            answer_index: 2,
            explanation: "Rates allow fair comparison between posts with different reach.",
          },
          {
            prompt: "What are UTM parameters used for?",
            options: [
              "Making links shorter for WhatsApp",
              "Showing which campaign sent a visitor to a website",
              "Hiding a website from search engines",
              "Blocking visitors from other countries",
            ],
            answer_index: 1,
            explanation: "Tracking tags tell analytics which campaign the visitor came from.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "client-reporting": {
      outcomes: [
        "Write a one page report with goal, actions, results and next steps",
        "Explain numbers in plain words an owner understands",
        "Report a weak result honestly with a clear plan",
        "Review a classmate's report or capstone fairly with a simple rubric",
      ],
      explanation_md: `A short, honest report is often what makes a client renew. It shows that you are paying attention, that you understand their business and that their money is being used carefully. Adverts for marketing and communications roles in Ghana, from agencies to think tanks, ask for performance tracking and reporting. Managers inside a company want the same thing, and the DMP cohort asks for a one page analytics report in week 6 and a full capstone in week 12.

## What goes in a report

Keep it to one page, or a short set of slides. Cover:

1. **The goal.** Remind the client what you agreed to work toward and the main number.
2. **What we did.** Posts, videos, campaigns, emails, profile updates. Keep it brief.
3. **What happened.** The numbers that connect to the goal, compared with last month or the target: messages, orders, sign ups, calls, cost per result.
4. **What worked and what did not.** One or two examples of each, with a reason if you know it.
5. **What we will try next.** Two or three specific actions for the coming month.
6. **Spend.** Ad spend and any other costs, matching the client's own records.

Add one or two screenshots so the client can see the evidence for themselves.

## Write for the owner, not for marketers

Many owners are busy and not interested in jargon. Instead of "CTR improved", write "More people who saw the ad tapped it". Instead of a table of twenty numbers, pick the four that matter. Round numbers sensibly and show change clearly: "Orders from WhatsApp rose from 12 to 19". Use the language the owner prefers, and offer to explain in person or on a call.

## Be honest

Sometimes a campaign does not work. Say so clearly, explain what you think went wrong, and say what you will change. Never inflate numbers, hide costs or claim credit for sales you did not cause. Owners usually find out, and trust is very hard to win back. An honest report about a weak month often builds more trust than a polished report about a good one.

## Keep it light and easy to share

Many owners will read your report on a phone, often on a small data bundle. A short PDF or a few clear lines in a WhatsApp message with one image works better than a heavy slide deck. A shared Google Doc or Sheet lets them look whenever they like. On a computer you can build the report faster from your tracking sheet; just check that it still reads well on a small screen before sending.

## A steady rhythm

Agree how often you will report, such as monthly, with a short weekly update during busy campaigns. Send it on the same day each time. Reliability itself builds trust.

## Building the report quickly

If you keep a weekly tracking sheet, the report almost writes itself. Copy the month's totals, compare them with last month and the target, pick the best and weakest piece of content, and write two or three next steps. With practice this takes under an hour per client.

## Reviewing someone else's work

In a team, an agency or a cohort, you will often review a colleague's report, plan or capstone. A simple rubric keeps reviews fair and useful. Score each line from 1 (missing) to 3 (strong):

* **Goal is clear** and has a number and date.
* **Evidence supports the claims,** with sources or screenshots.
* **Numbers connect to the goal,** not just likes.
* **Honest about what did not work.**
* **Next steps are specific** and follow from the results.
* **Easy to read** on a small screen, in plain words.

Then write two things that work well and one or two specific suggestions. Be kind and concrete: "The cost per message is clear; adding last month's figure would show the change" is more useful than "Good job" or "Needs work". Receiving feedback well matters just as much: thank the reviewer, ask questions if something is unclear, and decide what to change.`,
      workedExample_md: `Wumpini sends a monthly report to an Accra salon owner, Mrs Mensah, as a one page PDF and a short WhatsApp summary.

**Goal:** more weekday bookings. Main number: Tuesday to Thursday bookings from WhatsApp.

**What we did:** 12 Instagram posts, daily Status, updated Google Business Profile hours, one small ad test.

**What happened:** weekday bookings from WhatsApp rose from 14 last month to 22. The ad spent the agreed amount and brought 18 messages, of which 5 booked.

**What worked:** short tip videos brought the most booking messages.

**What did not:** the ad's photo version brought expensive messages, so it was paused after four days.

**Next month:** two tip videos a week, test a Wednesday offer, ask every client "Where did you hear about us?".

**Spend:** matches the card statement; screenshot attached.

Before sending, her cohort partner Fuseini reviews it with the rubric. He scores it highly on goal, honesty and next steps, and suggests one change: show the cost per booking, not just per message. Wumpini adds it, and the owner replies that the report is the clearest she has received.`,
      keyTerms: [
        { term: "Client report", definition: "A short summary of what was done, what happened and what comes next." },
        { term: "Benchmark", definition: "A figure to compare against, such as last month's result or the target." },
        { term: "Jargon", definition: "Specialist words that people outside the field may not understand." },
        { term: "Next steps", definition: "Specific actions planned for the coming period, based on results." },
        { term: "Rubric", definition: "A simple scoring guide that makes reviews fair and consistent." },
        { term: "Peer review", definition: "Checking a colleague's work and giving helpful feedback." },
      ],
      commonMistakes: [
        "Filling the report with every number the platforms show",
        "Using marketing jargon the owner does not understand",
        "Hiding a weak month or claiming credit for sales you did not cause",
        "Sending a heavy file that will not open on a small data bundle",
        "Giving peer feedback like \"good job\" with nothing specific",
      ],
      selfCheck: [
        "Which four numbers would you put in a report for a business you know?",
        "How would you explain a campaign that lost money in two honest sentences?",
        "What specific, kind suggestion would you give on the last piece of work you reviewed?",
      ],
      practice_task_md: `**Goal:** Write a one page report for a mock business and review a partner's report with the rubric.

**Steps:**
1. Use your tracking sheet from earlier lessons, or invent realistic numbers for a mock business.
2. Write a one page report with all six parts, using plain words and four key numbers.
3. Add one screenshot and save it as a small PDF.
4. Write a three line WhatsApp summary of the same report.
5. Swap with a partner, score each other's report with the rubric and write two strengths and one or two suggestions.

**Done looks like:** A one page report, a WhatsApp summary and a completed rubric for a partner's work.`,
      quiz: {
        questions: [
          {
            prompt: "Which phrasing best suits a report for a busy shop owner?",
            options: [
              "CTR improved significantly across placements",
              "More people who saw the ad tapped it",
              "Impressions optimised via algorithmic delivery",
              "Engagement KPIs exceeded benchmarks",
            ],
            answer_index: 1,
            explanation: "The lesson says to write in plain words, not marketing jargon.",
          },
          {
            prompt: "What should you do when a campaign did not work?",
            options: [
              "Leave it out of the report",
              "Show only the attention numbers that look good and leave out the sales figures",
              "Wait until the client asks",
              "Say so clearly, explain what went wrong and what you will change",
            ],
            answer_index: 3,
            explanation: "Honest reports about weak months build trust.",
          },
          {
            prompt: "Which line is part of the review rubric in the lesson?",
            options: [
              "Next steps are specific and follow from the results",
              "The report uses as many charts and colourful graphics as possible",
              "The report is at least ten pages long",
              "The design uses the reviewer's favourite colours",
            ],
            answer_index: 0,
            explanation: "The rubric checks that next steps are specific and follow from results.",
          },
          {
            prompt: "Why does the lesson suggest a short PDF or WhatsApp summary over a heavy slide deck?",
            options: [
              "Slide decks are not allowed for client work",
              "PDFs always look more professional than slides",
              "Many owners read reports on a phone with a small data bundle",
              "WhatsApp automatically checks numbers for accuracy",
            ],
            answer_index: 2,
            explanation: "Light files are easier for owners reading on a phone with limited data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    earning: {
      outcomes: [
        "Compare employed, agency and freelance paths into marketing work",
        "List what Ghanaian employers and clients look for in junior marketers",
        "Make a 30 day plan to move toward paid work",
      ],
      explanation_md: `Skills only change your life when someone pays you for them. Digital marketing has several doors into paid work, and you can start knocking on some of them before you feel "ready". This section helps you choose a path, collect proof of your skills and get your first paying work in Ghana or remotely.

## Three main paths

* **Employed in a company.** Many organisations hire marketing assistants, social media executives, content creators and communications officers: retailers, banks and fintechs, telecoms, hotels, schools, churches, NGOs and think tanks. You get regular pay, colleagues to learn from and steady work.
* **Agency work.** Marketing and advertising agencies manage campaigns for many clients at once. Agencies move fast and teach a lot, and they often hire juniors who can show real work.
* **Freelancing.** You work for your own clients, often local businesses, for a monthly fee or per project. You choose your clients, but you also handle your own sales, agreements and invoices.

Many people mix these. You might freelance for two shops in Tamale while applying for agency jobs, or keep one freelance client after you get hired. Some remote roles also welcome applicants based in Ghana; read each advert's location and payment rules carefully.

## Choosing where to start

Ask yourself three questions:

1. **Do I want structure or independence?** Employment and agencies give structure and mentors; freelancing gives independence but more uncertainty.
2. **What can I show today?** If you have little real work, a few small freelance or volunteer projects will strengthen any job application.
3. **What does my situation allow?** Steady pay may matter more than flexibility right now, or the reverse. There is no wrong answer.

Many beginners start with two or three small real projects, then apply for jobs with those as proof, while keeping one or two freelance clients.

## What employers and clients look for

Across the Ghanaian and remote adverts for junior marketing roles studied for this roadmap, the same things keep appearing:

* Evidence you can create good content and manage social pages.
* Comfort with common free tools for design, video, spreadsheets and analytics.
* Clear writing and good communication.
* Some understanding of measuring results and reporting them.
* Reliability: showing up, meeting deadlines and being honest.

Notice that most of this is about proof, not paper. A certificate helps, but a real page you grew, a real report you wrote and a reference from a real client often help more.

## Building your network

Many marketing jobs and clients in Ghana come through people you know. Tell friends, church members, lecturers and former classmates what you do, in one clear sentence. Join local business and tech community groups, attend hub events when you can, and help others generously. Keep a short professional profile on the platforms employers in your area use, with a link to your portfolio.

## Keep learning while you earn

Marketing tools and platform rules change often. Set aside a little time each week to read official help pages, try a new feature on a practice account, or take a free course. Employers notice candidates who keep their skills current, and clients trust marketers who can explain what has changed.

## Staying safe

Never pay anyone for a job, an interview or a "training kit". Be careful with offers that seem too good to be true, that ask for your MoMo PIN, or that want copies of your Ghana Card before any proper interview.

## What this section covers

* **A portfolio from real businesses:** turning your work into convincing case studies on a free site you can present.
* **Certificates, CVs and applications:** free platform courses, a CV that shows real work, and applying safely.
* **Freelancing and retainers:** packaging services, agreements and getting paid.
* **Joining a mentored cohort:** SydCrest's Delta Mentoring Program, if you want structure and mentors.

Your first paid work rarely arrives by waiting. It comes from doing real work, showing it and asking.`,
      workedExample_md: `Amina has finished the earlier sections of this roadmap and wants paid work within a few months. She writes a 30 day plan in a notes app.

**Week 1:** offer to run her church youth group's WhatsApp and Facebook for three months, and help her aunt's shea butter business set up WhatsApp Business. Both agree, and both say she can show the work.

**Week 2:** complete a free Skillshop course and start the work for both clients, keeping before screenshots.

**Week 3:** tell ten people, in one sentence, what she does: "I help small businesses in Tamale sell on WhatsApp and Facebook." Join a local business group online.

**Week 4:** write two short case studies, update her CV and apply for a social media assistant role at a Tamale hotel she found on a job board.

In the interview she opens her portfolio on her phone: the church page, the content calendar and a one page report. The manager can see exactly what she can do. Whatever the result, she now has real proof, a growing network and a plan for the next month.`,
      keyTerms: [
        { term: "In house role", definition: "A job working for one company's own marketing, rather than for clients." },
        { term: "Agency", definition: "A business that runs marketing for several client companies." },
        { term: "Freelancer", definition: "A self employed person who works for their own clients." },
        { term: "Portfolio", definition: "A collection of real work that shows what you can do." },
        { term: "Network", definition: "The people you know who can recommend you or tell you about work." },
      ],
      commonMistakes: [
        "Waiting to feel ready instead of starting small real projects",
        "Relying only on certificates with no real work to show",
        "Keeping your skills secret instead of telling people what you do",
        "Paying someone who promises a job or interview",
      ],
      selfCheck: [
        "Which path suits your situation best right now, and why?",
        "What could you show an employer today, and what is missing?",
        "Can you say what you do in one clear sentence?",
      ],
      practice_task_md: `**Goal:** Choose your first path and make a 30 day plan to move toward paid work.

**Steps:**
1. Answer the three questions in "Choosing where to start" in a few lines each.
2. Write one sentence that says what you do and for whom.
3. List two businesses or organisations you could offer a small, real project to.
4. Write a four week plan with one or two specific actions per week.
5. Share the sentence with three people this week and note their reactions.

**Done looks like:** A short note with your chosen path, your one sentence, two possible first clients and a four week plan.`,
      quiz: {
        questions: [
          {
            prompt: "What do the junior marketing adverts studied for this roadmap mostly look for?",
            options: [
              "Expensive equipment and paid software",
              "Proof you can create content, use common tools and report results",
              "A large personal following on TikTok",
              "Only university degrees in marketing",
            ],
            answer_index: 1,
            explanation: "The lesson says the adverts mostly want proof of real skills and reliability.",
          },
          {
            prompt: "Which path means handling your own sales, agreements and invoices?",
            options: ["Agency work", "In house employment", "A hub internship", "Freelancing"],
            answer_index: 3,
            explanation: "Freelancers manage their own clients, agreements and invoices.",
          },
          {
            prompt: "What does the lesson suggest if you have little real work to show?",
            options: [
              "Do a few small freelance or volunteer projects to strengthen applications",
              "Wait until you have collected every certificate available before you apply for anything",
              "Invent past clients for your CV",
              "Only apply for senior roles",
            ],
            answer_index: 0,
            explanation: "Small real projects give you proof for applications.",
          },
          {
            prompt: "An offer asks you to pay for a \"training kit\" before an interview. What should you do?",
            options: [
              "Pay quickly to secure the place",
              "Send your MoMo PIN so they can check your account can cover the training kit fee",
              "Do not pay, since paying for a job or interview is a warning sign",
              "Ask a friend to pay instead",
            ],
            answer_index: 2,
            explanation: "The lesson says never pay for a job, an interview or a training kit.",
          },
        ],
        pass_threshold: 75,
      },
    },
    portfolio: {
      outcomes: [
        "Write a case study with client, problem, actions, results and evidence",
        "Build a simple portfolio site with Google Sites",
        "Present your portfolio clearly in a few minutes",
        "Protect clients' private information in your work samples",
      ],
      explanation_md: `When an agency, company or client in Ghana decides whether to hire you, a portfolio does the talking. Some Ghanaian digital marketer adverts ask directly for a portfolio of past campaigns, and many others ask for experience. A portfolio is how a beginner shows experience. It does not need to be fancy. It needs to be real, honest and easy to open on any screen. The DMP cohort asks for a portfolio with at least three pieces of work in week 11.

## Real beats mock

Practice projects for made up businesses are fine while you learn, but real work convinces people more. Offer a short, clearly defined trial to two or three local businesses or organisations: a shop, a church, a school club, an NGO or a family business. For example: "I will set up your WhatsApp Business and run your Status for four weeks." Agree what you will do, what access you need, and that you can show the work in your portfolio. If a piece is practice work, label it clearly as practice.

## The case study format

For each project, tell a short story:

* **The client.** Who they are, in one or two sentences.
* **The problem.** What was not working: "Orders were getting lost in personal chats."
* **What you did.** Specific actions: set up a catalogue, created quick replies, planned a calendar, made five videos.
* **The results.** What changed, with honest numbers if you have them and the client agrees: "Messages answered within the hour instead of the next day." If results were small, say so and explain what you learned.
* **Evidence.** Before and after screenshots, sample posts, a short report.
* **A quote.** A line from the client, used with their permission. Never invent one.

## Building a portfolio with Google Sites

Google Sites is free with a Google account and builds simple websites without code. It works best in a browser on a computer; on a phone you can view the site but editing is limited, so use a laptop or desktop at school, a hub or a café for building if you can. Steps:

1. **Open Google Sites** and start a blank site or a simple template.
2. **Name it** with your name and what you do: "Hawa Iddrisu, Social Media and Content".
3. **Home page:** a short introduction, a clear photo of you if you are comfortable, the services you offer and how to contact you.
4. **One page or section per case study,** following the format above, with two or three images each.
5. **An about or CV section** with tools you use and any certificates.
6. **Contact:** email, a WhatsApp link and links to your professional profiles.
7. **Preview** on the phone view inside Sites to check it reads well on small screens.
8. **Publish** with a simple web address and test the link on another device.

Keep images small so pages load quickly on a data bundle. Put the link in your CV, your WhatsApp profile and your email signature.

## Presenting your portfolio

In interviews, mentor sessions and client meetings you will often be asked to "walk us through your work". Prepare a three to five minute talk:

1. **One sentence about you** and the kind of work you do.
2. **Your strongest case study:** the problem, what you did, the result and what you learned.
3. **A second, different example** to show range.
4. **What you want to do next** and how you could help them.

Practise aloud, time yourself and have the site open and ready before the meeting. Expect questions such as "What would you do differently?" and answer honestly.

## Protect your clients

Hide customers' names, numbers and messages in screenshots. Do not share private data such as sales figures unless the owner agrees. Your care with their information is part of what makes you hireable.`,
      workedExample_md: `Wumpini builds her portfolio on a hub computer in Tamale for week 11 of her cohort.

1. **Choose three pieces:** a WhatsApp Business setup for a Bolgatanga basket group (real), a church youth conference campaign (real), and a Google Ads plan for a mock event centre (labelled practice).
2. **Write each case study.** For the basket group: client, problem (orders lost in personal chats), what she did (profile, catalogue, quick replies, labels), result (replies within the hour; the group's leader says nothing gets lost now), evidence (before and after screenshots with customer names blurred), and a quote the leader agreed to.
3. **Build the site.** In Google Sites she makes a home page with a short introduction and services, one page per case study, and a contact section with a WhatsApp link.
4. **Check the phone preview,** shrink two large images, and publish.
5. **Present.** She practises a four minute talk: her one sentence, the basket group story, the conference campaign, and what she wants to do next.

At her mentor session, the mentor asks what she would do differently for the conference. She answers honestly: start promotion a week earlier. The mentor marks her portfolio ready, with one suggestion to add the conference's registration numbers.`,
      keyTerms: [
        { term: "Portfolio", definition: "A collection of your real work that shows what you can do." },
        { term: "Case study", definition: "A short story of one project: client, problem, actions, results and evidence." },
        { term: "Google Sites", definition: "A free Google tool for building simple websites without code." },
        { term: "Evidence", definition: "Screenshots, samples and reports that prove what you did." },
        { term: "Testimonial", definition: "A real quote from a client about your work, used with permission." },
      ],
      commonMistakes: [
        "Showing only mock projects when small real ones were possible",
        "Inventing results or client quotes",
        "Leaving customers' names and numbers visible in screenshots",
        "Building a site with huge images that load slowly on a phone",
        "Presenting without practising, and running far over time",
      ],
      selfCheck: [
        "Which three pieces of your work would you choose, and what does each show?",
        "Can you tell your strongest case study in under two minutes?",
        "What would you blur or remove from your screenshots before publishing?",
      ],
      practice_task_md: `**Goal:** Build a portfolio site with at least three pieces of work and present it.

**Steps:**
1. Choose three pieces of work from this roadmap, using real projects where you can and labelling practice work clearly.
2. Write a case study for each using the six part format.
3. Build a Google Sites portfolio with a home page, one page per case study and a contact section.
4. Check the phone preview, then publish and test the link on another device.
5. Present it to a friend, mentor or cohort partner in under five minutes, and note their feedback.

**Done looks like:** A published portfolio link with three case studies, and notes from one practice presentation.`,
      quiz: {
        questions: [
          {
            prompt: "What should you do with a practice project for a made up business in your portfolio?",
            options: [
              "Present it as a real client",
              "Label it clearly as practice",
              "Remove all the evidence",
              "Add an invented client quote",
            ],
            answer_index: 1,
            explanation: "Practice work is fine if it is clearly labelled.",
          },
          {
            prompt: "According to the lesson, where is editing a Google Sites portfolio easiest?",
            options: [
              "In WhatsApp",
              "Only on a phone",
              "In a browser on a computer",
              "In a printed notebook at home",
            ],
            answer_index: 2,
            explanation: "Google Sites editing works best in a browser on a computer; phone editing is limited.",
          },
          {
            prompt: "What should come first in a short portfolio presentation?",
            options: [
              "One sentence about you and the kind of work you do",
              "A list of every tool you have ever opened",
              "Your full life story from primary school onwards",
              "A question about the company's holiday dates",
            ],
            answer_index: 0,
            explanation: "The suggested talk opens with one sentence about you.",
          },
          {
            prompt: "Why should you blur customers' names and numbers in screenshots?",
            options: [
              "Google Sites rejects images with names",
              "It makes the images load faster",
              "Clients prefer blurry pictures",
              "To protect clients' private information, which shows you can be trusted",
            ],
            answer_index: 3,
            explanation: "Care with clients' data is part of what makes you hireable.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "job-applications": {
      outcomes: [
        "Choose free platform courses and check any certificate costs first",
        "Write a one page CV that shows real results honestly",
        "Tailor an application and prepare for a practical marketing test",
        "Recognise and avoid common job scams",
      ],
      explanation_md: `Once you have some real work to show, it is time to apply. Ghanaian employers advertise marketing roles on job boards such as Jobberman, on their own career pages, through recruiters and through word of mouth. Some adverts ask for Google or Meta certifications. This lesson covers certificates, CVs, applications, interviews and staying safe from job scams.

## Certificates worth your time

Free courses from the platforms themselves are respected because they teach the tools employers use:

* **Google Skillshop** offers free online courses on Google Ads, Google Analytics and other Google tools, and some lead to certifications. Check the current details on Skillshop, including whether any assessment has a cost, before you start.
* **Meta Blueprint** offers free courses on Facebook, Instagram and Meta ads. Its formal certification exams are taken through a testing provider and usually charge a fee, so read the details before you register. You do not need to pay to start learning.

Add completed certifications to your CV with the month you earned them. They show initiative, but they work best alongside real portfolio work.

## A CV that shows real work

1. **Keep it short.** One page is usually enough for a junior role.
2. **Start with a summary.** Two lines on what you do: "Social media and content marketer in Tamale who helps small businesses sell on WhatsApp and Facebook."
3. **Show results, honestly.** "Set up WhatsApp Business for a basket weaving group, cutting reply time from next day to under an hour." Use verbs such as set up, planned, wrote, grew, reported.
4. **Include volunteer and freelance work** under experience. Real work counts, paid or not.
5. **List tools you really use:** Canva, CapCut, Google Sheets, Google Analytics, Meta's business tools.
6. **Add certificates and education** briefly.
7. **Link your portfolio** so it is easy to click.

Save it as a PDF with a clear file name, such as "Hawa Iddrisu CV". Check it on a phone and a computer before sending.

## Applying well

* **Read the advert carefully.** Underline the skills and tasks it mentions, then match your CV and message to them, in your own words.
* **Write a short cover message.** Say which role, why you fit, and point to one relevant case study. Five to eight lines is enough.
* **Follow the instructions exactly:** the email subject, the file format, the deadline. Many applicants are rejected for ignoring them.
* **Keep a simple tracker** of where you applied, when and what happened.
* **Remote roles.** Some remote jobs welcome applicants from Ghana; others only hire in certain countries. Read the location rules, working hours and how you will be paid before applying.

## Preparing for interviews and tests

Marketing interviews often include a practical task: write three captions, critique a social page, or outline a small campaign. Prepare by:

* Practising the tasks in this roadmap with a timer.
* Studying the employer's own pages so you can suggest one or two realistic improvements.
* Preparing short stories about your work using your case studies.
* Preparing two questions to ask them, such as how they measure success in the role.

For online interviews, test your connection, camera and microphone beforehand, and find a quiet spot.

## After the interview

Send a short thank you message the same day, repeating one reason you fit the role. If you are not chosen, ask politely for one piece of feedback; many employers will give it. Note what you learned in your tracker and improve your CV or practice before the next application. Rejection is a normal part of every job search, not a judgement on your worth.

## Stay safe

Never pay anyone to get a job, an interview or a "training kit". Ghanaian job boards warn about this regularly. Be careful with offers that seem too good to be true, ask for your MoMo PIN, want your Ghana Card details before any proper interview, or come from personal email addresses claiming to be large companies. Check the company's official website or phone number if you are unsure.`,
      workedExample_md: `Mariama finds an advert for a marketing assistant at a Tamale hotel asking for Canva, social media management and email newsletters.

1. **Read and underline:** Canva, social media, email, "attention to detail", apply by email with "Marketing Assistant" in the subject.
2. **Update her CV summary:** "Content and social media marketer in Tamale who creates graphics and newsletters for local organisations."
3. **Match her experience:** she moves her church newsletter project to the top of her experience and adds "Designed weekly Canva graphics for a church youth page".
4. **Certificate:** she adds the Skillshop course she completed, after checking the course page for details.
5. **Cover message, six lines:** the role, why she fits, a link to her newsletter case study, and thanks.
6. **Follow instructions:** subject line exactly as asked, CV as a PDF, sent two days before the deadline.
7. **Tracker:** she logs the date and role in a sheet.

She is invited to interview and asked to write three captions for the hotel's restaurant on the spot. She has practised this with a timer, so she stays calm, writes them using hook, detail, proof and call to action, and explains her choices.`,
      keyTerms: [
        { term: "CV", definition: "A short document summarising your skills, experience and education for employers." },
        { term: "Cover message", definition: "A short note sent with a CV explaining why you fit the role." },
        { term: "Certification", definition: "A formal record that you passed a course assessment or exam." },
        { term: "Practical test", definition: "A task during hiring, such as writing captions, to show your skills." },
        { term: "Application tracker", definition: "A simple list of where and when you applied and what happened." },
        { term: "Job scam", definition: "A fake offer designed to take money or personal details from job seekers." },
      ],
      commonMistakes: [
        "Sending the same CV and message to every advert",
        "Listing tools you have never really used",
        "Ignoring application instructions such as the subject line or deadline",
        "Paying for an expensive exam before checking whether employers ask for it",
        "Sending a MoMo PIN or Ghana Card copy to an unverified recruiter",
      ],
      selfCheck: [
        "What would your two line CV summary say today?",
        "Which of your case studies best matches the kind of job you want?",
        "What warning signs would make you check whether a job offer is real?",
      ],
      practice_task_md: `**Goal:** Prepare a one page CV and one tailored application.

**Steps:**
1. Find a real junior marketing advert on a job board or company career page.
2. Underline the skills and instructions it lists.
3. Write or update a one page CV with a summary, results based experience, tools, certificates and your portfolio link.
4. Write a six to eight line cover message for this advert.
5. Practise one likely practical task with a 15 minute timer.

**Done looks like:** A tailored CV as a PDF, a cover message, and one timed practice task, ready for a mentor to review.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say about Meta Blueprint certification exams?",
            options: [
              "They are always free",
              "They must be taken before any Meta course",
              "They usually charge a fee, so read the details before registering",
              "They replace the need for a CV",
            ],
            answer_index: 2,
            explanation: "Courses are free, but formal exams usually charge a fee.",
          },
          {
            prompt: "Which CV line follows the lesson's advice?",
            options: [
              "Responsible for social media duties",
              "Hard working and passionate about marketing in every way",
              "Good at computers",
              "Set up WhatsApp Business for a weaving group, cutting reply time to under an hour",
            ],
            answer_index: 3,
            explanation: "It shows a real action and an honest result.",
          },
          {
            prompt: "Why does the lesson stress following application instructions exactly?",
            options: [
              "Many applicants are rejected for ignoring them",
              "It means you can skip the cover message",
              "Employers only read the subject line and never open attachments",
              "Instructions are only suggestions",
            ],
            answer_index: 0,
            explanation: "Ignoring instructions is a common reason for rejection.",
          },
          {
            prompt: "Which is a warning sign of a job scam?",
            options: [
              "An interview scheduled through the company's official email",
              "A request to pay for a training kit before the interview",
              "A practical test asking for three captions",
              "An advert on the company's own career page",
            ],
            answer_index: 1,
            explanation: "Never pay for a job, an interview or a training kit.",
          },
        ],
        pass_threshold: 75,
      },
    },
    freelancing: {
      outcomes: [
        "Package marketing services into two or three clear offers",
        "Write a one page agreement that protects you and the client",
        "Send invoices and keep simple income records",
        "Find clients through referrals and visible work",
      ],
      explanation_md: `Many small businesses in Ghana need marketing help but cannot afford a full time employee. That is a real opportunity for freelancers. A shea butter seller, a pharmacy shop, a guest house and a church can each pay for a few hours of your time a week. Freelancing well means treating it as a small business: clear services, clear agreements and getting paid on time.

## Package your services

Owners find it hard to buy "digital marketing". They find it easier to buy something specific. Create two or three packages, for example:

* **Setup.** A one time job: WhatsApp Business profile, catalogue and quick replies, plus a Google Business Profile.
* **Monthly content.** A set number of posts and Status updates per month, with replies to comments during agreed hours and a short monthly report.
* **Campaign.** A focused push for an event or season, with a plan, content, a small ad budget managed on the client's account, and a report.

For each package, write exactly what is included, how long it takes and what the client must provide, such as photos, approvals and access.

## Setting your prices

There is no single right price, and you should not copy figures from the internet. Work it out:

1. **Estimate the hours** each package really takes, including messages, revisions and reporting.
2. **Add your costs:** data, transport, any paid tools.
3. **Check what is fair locally** by asking other freelancers and mentors, not by guessing.
4. **Quote in cedis,** with a clear total.
5. **Review after three months.** As your portfolio and results grow, your prices can grow too.

Start modestly while you build a portfolio, but do not work for free for long, and never undercut others so far that you cannot keep going.

## Write a simple agreement

Even with friends and family, write it down. A one page agreement, shared on WhatsApp or email and confirmed by both sides, should cover:

* What you will do, and what is not included.
* The fee, when it is due and how it is paid, such as MoMo or bank transfer.
* A deposit before you start, especially for new clients.
* Who pays ad spend, and that it is separate from your fee.
* What access you need, and that the client keeps ownership of their accounts.
* How customer data is handled: kept private and used only for this work, in line with Ghana's Data Protection Act, 2012 (Act 843).
* Whether you can show the work in your portfolio.
* How either side can end the arrangement, such as two weeks' notice.

## Retainers

A retainer is a monthly fee for ongoing work. It gives you steadier income and gives the client consistent marketing. Monthly reports are what keep retainers going, because they show the value of your work.

## Invoices and records

Send a simple invoice for every payment with your name, the client's name, the work, the amount in cedis, the due date and how to pay. Number your invoices. Keep a sheet of all income and costs, and confirm MoMo payments from the network's message, not screenshots. As your work grows, learn about your tax responsibilities from the Ghana Revenue Authority.

## Getting clients

Many local clients find marketers by word of mouth. Do good work, then ask happy clients to recommend you. Show your portfolio on your WhatsApp Status, offer a free short check of a business's pages with two or three practical suggestions, and join local business groups. A free check should be small and clearly limited, not weeks of unpaid work.

## Managing your time

Freelancers often take on too much. Keep a weekly schedule, set reply hours that clients know, and say no politely when you are full. Missing deadlines for five clients is worse than serving three well.`,
      workedExample_md: `Fuseini decides to freelance for businesses in Tamale while he studies.

1. **Packages:** Setup (WhatsApp Business and Google Business Profile), Monthly content (twelve posts, daily Status, replies during shop hours, monthly report), and Campaign.
2. **Pricing:** he times himself on a practice setup, adds data and transport, and asks two experienced freelancers in a local group what is fair. He sets a price for each package in cedis and plans to review them in three months.
3. **First client:** a pharmacy shop owner, Mr Abdul-Rahman, chooses Monthly content after Fuseini offers a free 20 minute check of the shop's Facebook page with three suggestions.
4. **Agreement:** one page on WhatsApp covering the twelve posts, reply hours, the fee due by MoMo on the first of each month, a deposit, ad spend paid directly by the shop, customer data kept private, permission to show the work, and two weeks' notice to end.
5. **Invoices:** numbered invoices each month, and a sheet of income and costs.
6. **Report:** a one page report every month.

After three months of clear reports, the owner recommends him to a nearby guest house. Fuseini checks his weekly schedule before saying yes.`,
      keyTerms: [
        { term: "Package", definition: "A clearly defined service with a set scope and price." },
        { term: "Scope", definition: "Exactly what work is included, and what is not." },
        { term: "Deposit", definition: "Part of the fee paid before work starts." },
        { term: "Retainer", definition: "A regular monthly fee for ongoing work." },
        { term: "Invoice", definition: "A document asking for payment, listing the work, amount and how to pay." },
        { term: "Referral", definition: "A new client sent to you by someone who knows your work." },
      ],
      commonMistakes: [
        "Offering vague \"digital marketing\" instead of clear packages",
        "Starting work without a written agreement or deposit",
        "Mixing ad spend into your own fee",
        "Copying prices from the internet instead of working them out",
        "Taking on more clients than you can serve well",
      ],
      selfCheck: [
        "What would your two or three packages be, and what exactly is in each?",
        "Which line of the agreement would protect you most with a new client?",
        "How would you politely say no to a client when you are already full?",
      ],
      practice_task_md: `**Goal:** Create a simple service menu, agreement and invoice you could use with a first client.

**Steps:**
1. Write two or three packages with what is included, time needed and what the client must provide.
2. Work out a price for each in cedis using the five pricing steps, and note your reasoning.
3. Write a one page agreement covering every point in the lesson.
4. Create an invoice template in Google Docs or Sheets with a number, date, work, amount and payment details.
5. Write a short WhatsApp message offering a free 20 minute page check to one local business.

**Done looks like:** A service menu, a one page agreement, an invoice template and an outreach message, ready to use.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest packaging services?",
            options: [
              "Owners find it easier to buy something specific than \"digital marketing\"",
              "Packages are required by law",
              "Packages let you avoid writing agreements",
              "Platforms only accept services that are sold as packages with fixed prices",
            ],
            answer_index: 0,
            explanation: "Clear packages are easier for owners to understand and buy.",
          },
          {
            prompt: "How does the lesson suggest you set your prices?",
            options: [
              "Copy the highest price you can find online",
              "Charge nothing until you have ten clients",
              "Always charge less than every other freelancer",
              "Estimate hours and costs, and check what is fair locally",
            ],
            answer_index: 3,
            explanation: "Prices come from your real time and costs plus local advice.",
          },
          {
            prompt: "What should the agreement say about ad spend?",
            options: [
              "It is included in your fee without being shown",
              "You keep any ad money that is not spent",
              "It is separate from your fee, and who pays it",
              "Ad spend should never be discussed",
            ],
            answer_index: 2,
            explanation: "The agreement keeps ad spend separate and clear.",
          },
          {
            prompt: "What is a retainer?",
            options: [
              "A one time payment for a logo",
              "A regular monthly fee for ongoing work",
              "A fine for late reports",
              "A deposit returned at the end",
            ],
            answer_index: 1,
            explanation: "A retainer is a monthly fee for ongoing work.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "dmp-cohort": {
      outcomes: [
        "Describe how the twelve DMP weeks are organised",
        "Match this roadmap's lessons to DMP weeks and specialisations",
        "Decide whether a mentored cohort suits you and which specialisation fits",
      ],
      explanation_md: `Learning alone takes real discipline. Some people move faster with a group, a schedule and someone experienced checking their work. SydCrest's Delta Mentoring Program, or DMP, is a twelve week cohort for digital skills and digital marketing. This roadmap and the DMP are designed to fit together: the roadmap gives you a broad beginner base you can study at your own pace, and the DMP adds structure, mentors and a specialisation.

## How the twelve weeks are organised

The programme has three parts.

**Weeks 1 to 6 are shared by everyone.** They cover computer and internet basics and safety, Google Drive, Docs, Slides and Sheets, online communication and creating a Facebook Page, an introduction to digital marketing channels and Google Business Profile, social media strategy and content, and analytics.

**Weeks 7 to 9 are your specialisation.** You choose one of three:

* **SEO and Content Marketing:** keyword research, on page SEO, backlinks, local SEO and a content strategy.
* **Social Media Marketing:** ad campaigns and targeting, video and storytelling, community building and influencer outreach.
* **Google Ads (search marketing):** Skillshop search ads training, keywords and ad copy, and budgets, bidding and optimisation.

**Weeks 10 to 12 bring it together.** You plan an integrated campaign across channels, build a portfolio on Google Sites with at least three pieces of work and get mentor feedback, then finish a capstone project in your specialisation, review a classmate's capstone using a rubric and complete a final quiz for the programme certificate.

## How this roadmap connects

Many lessons here are linked directly to DMP weeks, so cohort members can use them as their reading:

* **Week 3:** Facebook and Instagram pages, and email newsletters.
* **Week 4:** how customers find and buy, the main channels, SEO basics, writing that sells, and Google Business Profile.
* **Week 5:** knowing your audience, the content calendar, product photos and graphics, and community management.
* **Week 6:** campaigns and results, analytics basics, social media ads and reporting to clients.
* **Week 10:** planning a campaign, the main channels, the content calendar and budgets.
* **Weeks 11 and 12:** portfolio, applications, freelancing, planning and reporting.

The specialisation weeks use a companion roadmap, Digital Marketing Specialisations, which goes much deeper into SEO, social media and Google Ads. Weeks 1 and 2 draw on the Digital Skills Bridge roadmap.

## Choosing a specialisation

If you are unsure, look back at the lessons you enjoyed most and did best on:

* Enjoyed search, Google Business Profile and writing web pages? Consider **SEO and Content Marketing**.
* Enjoyed content, short video, community and social ads? Consider **Social Media Marketing**.
* Enjoyed search ads, budgets and numbers? Consider **Google Ads**.

Also think about the clients near you. A town with many guest houses and clinics may need search skills; a busy fashion and beauty scene may need social media skills.

## Getting the most from mentors

Mentors are most helpful when you come prepared. Bring specific questions, share your work before the session, and act on feedback before the next one. Keep a short log of what each mentor suggested and what you changed. That log also makes a useful story for job interviews, because it shows you can take feedback and improve.

## Is it right for you?

The DMP suits you if you want deadlines, feedback from mentors, a group to learn with and a structured capstone. It asks for regular time each week, so check that you can commit before applying. If you prefer to learn at your own pace, keep going with this roadmap; it stands on its own. Either way, the portfolio you build is what shows employers and clients what you can do.

The first DMP cohort is planned as a free pilot with 25 seats, starting in January 2027. Plans can change, so check the Programme page on SydCrest's site for the latest details. You can join the waitlist there; joining the waitlist is not a confirmed place. If you apply, mention the roadmap lessons you have completed and link any work you have done.`,
      workedExample_md: `Hawa has completed most of this roadmap, studying on her phone during the week and on a library computer at weekends. She is deciding about the DMP.

1. **Check commitment.** She looks at her week and finds she can reliably give time on weekday evenings and Saturday mornings.
2. **Review her strengths.** Her best quiz scores and favourite practice tasks were Google Business Profile, SEO basics and the homepage layout.
3. **Look at local need.** Many guest houses and clinics in Tamale have incomplete profiles and no website.
4. **Choose a specialisation:** SEO and Content Marketing.
5. **Prepare to apply.** She joins the waitlist on SydCrest's Programme page, notes which roadmap lessons she has completed, and links the visibility check she did for a guest house.

When she gets a place, the shared weeks feel familiar because she has already done the linked lessons, so she uses the time to help her group. In the specialisation weeks she goes deeper into keyword research and local listings, and builds a capstone around the same Tamale guest house. If she had not got a place, she planned to keep learning on the free roadmaps and apply again.`,
      keyTerms: [
        { term: "DMP", definition: "SydCrest's Delta Mentoring Program, a twelve week mentored cohort." },
        { term: "Cohort", definition: "A group of learners who go through a programme together on the same schedule." },
        { term: "Specialisation", definition: "The focus area chosen for weeks 7 to 9: SEO, social media or Google Ads." },
        { term: "Capstone", definition: "A final project that brings together what you learned in your specialisation." },
        { term: "Waitlist", definition: "A list of people interested in a place, which is not a confirmed seat." },
      ],
      commonMistakes: [
        "Treating a waitlist sign up as a confirmed place",
        "Choosing a specialisation because it sounds impressive rather than because it suits you",
        "Applying without checking you can give time every week",
        "Stopping learning while waiting for a cohort to start",
      ],
      selfCheck: [
        "Which specialisation fits your strengths and the clients near you, and why?",
        "How many hours a week could you reliably give to a twelve week programme?",
        "Which completed lessons and pieces of work would you mention in an application?",
      ],
      practice_task_md: `**Goal:** Decide whether the DMP suits you and which specialisation fits you best.

**Steps:**
1. List the roadmap lessons you have completed and mark the three you enjoyed most.
2. Write how many hours a week you can reliably give, and when.
3. Choose a specialisation using the questions in the lesson, and write two reasons.
4. Note one local business you could build a capstone around.
5. If the DMP suits you, join the waitlist on SydCrest's Programme page; if not, write your next three roadmap goals.

**Done looks like:** A short note with your completed lessons, weekly time, chosen specialisation with reasons, a capstone idea, and your next step.`,
      quiz: {
        questions: [
          {
            prompt: "Which DMP weeks are the specialisation weeks?",
            options: ["Weeks 1 to 3", "Weeks 4 to 6", "Weeks 7 to 9", "Weeks 10 to 12"],
            answer_index: 2,
            explanation: "Weeks 7 to 9 are for SEO, social media or Google Ads.",
          },
          {
            prompt: "What happens in weeks 10 to 12 of the DMP?",
            options: [
              "An integrated campaign, a Google Sites portfolio, a capstone and a final quiz",
              "Computer and internet basics",
              "Only the specialisation lessons",
              "A break with no work",
            ],
            answer_index: 0,
            explanation: "The last three weeks bring everything together.",
          },
          {
            prompt: "What does joining the DMP waitlist mean?",
            options: [
              "You have a confirmed seat",
              "You must pay a deposit",
              "You must stop using the roadmaps",
              "You are interested, but it is not a confirmed place",
            ],
            answer_index: 3,
            explanation: "The lesson says joining the waitlist is not a confirmed place.",
          },
          {
            prompt: "Hawa enjoyed Google Business Profile and SEO basics most. Which specialisation fits?",
            options: [
              "Social Media Marketing",
              "SEO and Content Marketing",
              "Google Ads, because it has the most numbers",
              "None, since she should skip the specialisation",
            ],
            answer_index: 1,
            explanation: "Search and web page lessons point toward SEO and Content Marketing.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
