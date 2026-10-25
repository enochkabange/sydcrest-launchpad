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
    copywriting: {
      explanation_md: `Words do most of the selling online. A photo catches the eye, but the caption tells people what it is, why they should care and what to do next. Some Ghanaian job adverts for digital marketers ask directly for copywriting and for keeping a brand consistent, and almost every marketing role depends on it. If you can write short, clear, friendly words, you will always be useful.

## The shape of a selling message

Most good posts follow a simple pattern:

* **Hook.** The first line, which people see before tapping "more". Lead with the benefit or a question. "Dry, cracked heels this harmattan?" beats "Good morning everyone".
* **Detail.** What it is, the price in cedis, sizes, delivery days. Answer the questions people would otherwise send in a message.
* **Proof.** A reason to trust: "made by our women's group in Tamale" or a short customer comment shared with permission.
* **Call to action.** Exactly what to do next. "Send 'BUTTER' on WhatsApp to 024 000 0000 and pay with MoMo."

Keep sentences short. Write for someone reading on a small screen, maybe in their second or third language. Read your post aloud; if you run out of breath, cut it.

## Brand voice

A brand voice is the personality in the words. A youth church event might sound lively and warm. A microfinance company should sound calm and trustworthy. Write down three words for the voice, such as "friendly, honest, local", and check every post against them. Consistency helps people recognise the business, even before they see the logo.

## Honest claims only

Never promise what the product cannot do. Do not call shea butter a cure for a disease, and do not invent customer reviews. In Ghana, the Food and Drugs Authority oversees adverts for products such as cosmetics, food and medicines, and the platforms' own policies also expect claims to be truthful, and one exposed lie can destroy trust that took years to build.

## Using AI writing tools

AI chat tools can suggest captions quickly. Treat them as a first draft only. Check every price, date and fact, remove anything that sounds foreign to your audience, and never trust an AI translation into Dagbani or Twi without a fluent speaker checking it.

## A worked example

Sumaila writes for a mobile money vendor running a promotion. His first draft: "We are pleased to inform our esteemed customers of our ongoing promotion." Nobody will read that. His rewrite:

"Do any MoMo cash out this week and get a free loyalty stamp. Five stamps earn you GHS 5 airtime. Only at Sumaila Ventures, opposite Aboabo market. Open 7am to 8pm. Bring your Ghana Card."

Benefit first, clear detail, location and a next step. That is copywriting.`,
      practice_task_md: `**Goal:** Rewrite real posts so they sell more clearly.

**Steps:**
1. Find two posts or WhatsApp Statuses from local businesses that you think are unclear. Screenshot them.
2. For each, rewrite the message using hook, detail, proof and call to action.
3. Choose three words for the business's brand voice and check your rewrite against them.
4. Read both versions aloud to a friend and ask which one makes them more likely to act.

**Done looks like:** Two before and after pairs saved in a Google Doc, each with a one line note on what you changed and why. This makes a good small portfolio piece.`,
      quiz: {
        questions: [
          {
            prompt: "What is the job of the hook in a selling message?",
            options: [
              "To list every product the shop sells",
              "To give the phone number",
              "To catch attention in the first line with a benefit or question",
              "To thank customers for reading",
            ],
            answer_index: 2,
            explanation: "The hook is the first line people see, so it should lead with a benefit or question.",
          },
          {
            prompt: "Which of these is the clearest call to action?",
            options: [
              "Send 'BUTTER' on WhatsApp to our number and pay with MoMo",
              "We have the best butter in town",
              "Contact us for more information",
              "Good morning to all our customers",
            ],
            answer_index: 0,
            explanation: "A call to action tells people exactly what to do next.",
          },
          {
            prompt: "How does the lesson suggest you keep a brand voice consistent?",
            options: [
              "Change the tone every week to keep people guessing",
              "Copy the voice of the biggest competitor",
              "Only post in capital letters",
              "Write down three words for the voice and check every post against them",
            ],
            answer_index: 3,
            explanation: "Three agreed words give you a simple test for every post.",
          },
          {
            prompt: "How should you use AI writing tools, according to the lesson?",
            options: [
              "Publish whatever they write without checking",
              "As a first draft, checking facts, prices and any local language translation",
              "Only for writing customer reviews",
              "Never, because they are banned for marketing",
            ],
            answer_index: 1,
            explanation: "AI drafts must be checked, and local language translations need a fluent speaker.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "graphics-and-photos": {
      explanation_md: `On WhatsApp, Instagram and Facebook, people decide in a second whether to stop scrolling. A clear photo or a clean graphic is often what makes them stop. Some Ghanaian adverts for marketing assistants and interns name Canva and similar design tools. You do not need a camera or paid software to meet that bar. You need daylight, a steady hand and a few simple rules.

## Product photos on a phone

* **Use daylight.** Stand near a window or under a shade tree, out of harsh direct sun. Avoid the phone flash, which makes products look flat and shiny.
* **Clean background.** A plain wall, a cloth or a sheet of paper. Remove clutter so the product is the only thing to look at.
* **Wipe the lens.** Phones live in pockets. A quick wipe makes photos sharper instantly.
* **Fill the frame.** Get close so the product takes up most of the picture. Show a hand or a common object for size, such as a basket next to a chair.
* **Take several.** Shoot from the front, the side and up close on details like weaving or a label. Pick the best.

## Simple graphics

Free design apps such as Canva offer templates for posts, Status images and flyers. Use them, but keep it simple:

* One message per graphic. A church harvest flyer needs the event, date, time, place and a contact. Not five paragraphs.
* Large, readable text with strong contrast, such as dark text on a light background.
* Two or three brand colours and one or two fonts, used every time. This is how people start recognising the business at a glance.
* Use real photos of the business where possible, rather than generic stock images.

## Keep files light

Many customers buy data in small bundles. Large images load slowly or not at all. Export graphics as JPG for photos and keep the size modest; most apps offer a smaller download option. Check how the image looks on a small phone screen before posting.

## A worked example

Wumpini helps a basket weaving group in Bolgatanga. Their old photos were taken indoors at night, with baskets piled together. She moves the shoot outside in the morning, places one basket at a time on a plain cloth, and adds a close up of the weaving. Then she builds one Canva template with the group's colours and logo, so every new basket post looks consistent: photo on top, name, size and price below. The group can now make a new post themselves in a few minutes.`,
      practice_task_md: `**Goal:** Produce a small set of product photos and one branded graphic for a local seller.

**Steps:**
1. Choose three products from a seller you know, or from your own home if needed, such as a jar of shea butter, a basket or a pair of slippers.
2. Photograph each in daylight on a plain background. Take at least three angles per product.
3. Pick the best photo of each and crop it so the product fills the frame.
4. In a free design app, create one graphic using one photo, the product name, the price in cedis and how to order. Use no more than three colours.
5. View the graphic on your phone at normal size and fix anything that is hard to read.

**Done looks like:** Three clean product photos and one readable branded graphic, ready to show a mentor or the seller.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson recommend instead of using the phone flash?",
            options: [
              "Taking photos at night for better colour",
              "Using daylight near a window or in shade",
              "Using a paid filter app",
              "Holding a torch behind the product",
            ],
            answer_index: 1,
            explanation: "Daylight out of harsh sun gives better results than the flash.",
          },
          {
            prompt: "Why should graphics use the same two or three brand colours every time?",
            options: [
              "So people start recognising the business at a glance",
              "Because design apps only allow three colours",
              "So the file size becomes larger",
              "Because bright colours are illegal in adverts",
            ],
            answer_index: 0,
            explanation: "Consistent colours and fonts build recognition.",
          },
          {
            prompt: "Why does the lesson say to keep image files light?",
            options: [
              "Platforms delete large images",
              "Light files always look sharper",
              "Lighter files cost more to post",
              "Many customers have small data bundles, so large images load slowly",
            ],
            answer_index: 3,
            explanation: "Customers on limited data may not load heavy images.",
          },
          {
            prompt: "What did Wumpini create so the basket group could make consistent posts themselves?",
            options: [
              "A paid advert",
              "A new logo for every post",
              "One template with the group's colours and logo",
              "A website with an online shop",
            ],
            answer_index: 2,
            explanation: "A single reusable template made every post look consistent and easy to produce.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "short-video": {
      explanation_md: `Short vertical video now drives much of what people watch on TikTok, Instagram Reels, Facebook and WhatsApp Status. Ghanaian employers, from car dealers to cosmetics shops, are hiring people who can film and edit short clips, and some retail and health product companies ask for staff who can sell during live streams. You can do all of this with a phone.

## What makes a short video work

* **The first few seconds.** People decide almost instantly whether to keep watching. Start with the most interesting moment: the finished basket, the steaming waakye, the before and after.
* **Vertical framing.** Hold the phone upright so the video fills the screen.
* **Clear sound.** Viewers forgive average pictures but not bad sound. Film in a quiet spot, speak close to the phone, or use a cheap clip microphone if you have one.
* **Captions.** Many people watch with the sound off, especially in public. Add on screen text so the message still lands.
* **One idea.** One product, one tip or one story per video.
* **A next step.** End with what to do: "Order on WhatsApp", "Visit us at Tamale Central Market".

## Editing on a phone

Free editing apps such as CapCut, or the editors built into TikTok and Instagram, let you trim clips, add text, music and transitions. Keep edits simple. Cut any pause or shaky moment. When you add music, use the platform's own music library, because songs added from elsewhere can be muted or removed for copyright reasons.

## Trends, carefully

Trends and popular sounds can help a video reach new people. Join a trend only if it fits the brand and you can link it to the product. A funny trend that has nothing to do with the business may get views but no customers.

## Live selling

In a live stream, a seller shows products in real time, answers questions from comments and takes orders. It works well for clothes, cosmetics and accessories. Prepare like a small show: a list of products with prices, good light, a stable phone stand, and a helper who replies to comments and records orders. Platforms set conditions for who can go live, such as age and account requirements, and these change, so check the current rules in the app.

## A worked example

Fuseini films for a Tamale tailor. His first video was a slow, sideways clip of the shop. His new one starts with a customer twirling in a finished kaba, then shows three quick cuts of cutting and sewing, with captions "Made in Tamale" and "Order on WhatsApp", ending on the phone number. Twenty seconds, one idea, clear next step.`,
      practice_task_md: `**Goal:** Film and edit one short vertical video for a local business.

**Steps:**
1. Choose a product or process to show, such as weaving a basket, packaging shea butter or serving food.
2. Plan four or five shots on paper. Start with the most interesting moment.
3. Film vertically in a quiet place with good light. Keep each shot a few seconds long.
4. Edit in a free app: trim pauses, add captions and end with a clear next step. Keep the video under 30 seconds.
5. Watch it with the sound off. If the message is not clear, improve the captions.

**Done looks like:** A finished video saved on your phone that makes sense with the sound off and ends with an action. Ask the business owner before posting it publicly.`,
      quiz: {
        questions: [
          {
            prompt: "Why should short videos have captions?",
            options: [
              "Platforms refuse videos without text",
              "Many people watch with the sound off",
              "Captions make the file smaller",
              "Captions replace the need for a next step",
            ],
            answer_index: 1,
            explanation: "Captions let the message land even when people watch silently.",
          },
          {
            prompt: "What does the lesson say about the first few seconds of a video?",
            options: [
              "They should show the business logo for a long time",
              "They do not matter because people watch to the end",
              "They should start with the most interesting moment",
              "They should always be silent",
            ],
            answer_index: 2,
            explanation: "People decide almost instantly whether to keep watching.",
          },
          {
            prompt: "Why use the platform's own music library when adding songs?",
            options: [
              "Songs added from elsewhere can be muted or removed for copyright reasons",
              "The library songs are always louder",
              "It makes the video vertical automatically",
              "Platforms pay you for using their music",
            ],
            answer_index: 0,
            explanation: "Outside music can trigger copyright muting or removal.",
          },
          {
            prompt: "Which of these is part of preparing for a live selling session?",
            options: [
              "Going live with no product list so it feels natural",
              "Turning off comments so nobody can ask questions",
              "Filming horizontally to fit more products",
              "Having a helper reply to comments and record orders",
            ],
            answer_index: 3,
            explanation: "The lesson suggests a product list, good light, a stand and a helper for comments and orders.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "content-calendar": {
      explanation_md: `Businesses that post only when they remember look unreliable. A content calendar fixes that. It is a simple plan of what to post, where and when, made a few weeks ahead. Agencies and in house teams in Ghana use calendars to agree work with clients and managers before anything goes live. If you can build and keep one, you show that you are organised, which employers value as much as creativity.

## What goes in a calendar

A basic calendar is a table with one row per post:

* **Date and time.** When it goes out.
* **Channel.** WhatsApp Status, Facebook, Instagram, TikTok, email.
* **Format.** Caption with photo, graphic, video, live.
* **Topic and job.** What it is about and whether it shows, helps, proves or asks.
* **Caption draft.** The words, written in advance.
* **Status.** Idea, drafted, approved, posted.

Google Sheets works well. It is free, opens on a phone, and you can share it with a client so they can approve posts with a comment.

## Plan around real life

The best calendars follow the rhythm of the customers' lives:

* **Market days** in the town, when people have cash and are out buying.
* **Holidays and festivals** such as Christmas, Eid, Easter, Independence Day, and local festivals like Damba in Dagbon or Bugum.
* **Seasons.** Harmattan for skin care, rainy season for umbrellas and wellington boots, school reopening for uniforms and stationery.
* **Paydays** near the end of the month for salaried customers.
* **Business events** such as a new stock arrival or an anniversary.

Mark these first, then fill in regular posts around them. Leave a little space for things you cannot plan, like a trending moment or a sudden stock problem.

## How often to post

There is no magic number. A schedule the business can keep for months beats an ambitious one abandoned in two weeks. For a small shop, three good posts a week plus regular Status updates may be plenty.

## A worked example

Hawa's shea butter business plans December in a sheet. She marks the start of harmattan, Christmas and the Tamale market days. Her calendar has a skin care tip every Monday, a product photo with price on market days, a customer story mid month, and a Christmas gift pack offer from the second week. Every caption is drafted by the end of November, so in December she only has to post and reply to customers.`,
      practice_task_md: `**Goal:** Build a two week content calendar for a local business in Google Sheets.

**Steps:**
1. Create a sheet with columns: Date, Channel, Format, Topic, Job, Caption draft, Status.
2. Mark any market days, holidays, seasons or events in the next two weeks.
3. Plan six to ten posts around those dates, using a mix of show, help, prove and ask.
4. Write full caption drafts for at least three posts.
5. Share the sheet with a friend or mentor using a view or comment link and ask for one improvement.

**Done looks like:** A shared Google Sheet with two weeks of planned posts, local dates marked and at least three captions ready to use.`,
      quiz: {
        questions: [
          {
            prompt: "What is a content calendar?",
            options: [
              "A list of all the customers a business has",
              "A plan of what to post, where and when, made ahead of time",
              "A paid tool that posts automatically",
              "A record of how much each post earned",
            ],
            answer_index: 1,
            explanation: "The lesson defines it as a plan of posts made a few weeks ahead.",
          },
          {
            prompt: "Why does the lesson suggest Google Sheets for a calendar?",
            options: [
              "It writes the captions for you",
              "It is the only tool that clients accept",
              "It is free, works on a phone and can be shared for approval",
              "It publishes posts to every platform",
            ],
            answer_index: 2,
            explanation: "Sheets is free, phone friendly and easy to share with a client.",
          },
          {
            prompt: "What should you mark on the calendar first?",
            options: [
              "Market days, holidays, seasons and business events",
              "Random dates for paid ads",
              "Only weekends",
              "The competitor's posting times",
            ],
            answer_index: 0,
            explanation: "Real life dates come first, then regular posts are filled in around them.",
          },
          {
            prompt: "What does the lesson say about how often to post?",
            options: [
              "Every business must post five times a day",
              "Posting once a month is always enough",
              "Posting frequency does not matter at all",
              "A schedule the business can keep for months beats an ambitious one that is abandoned",
            ],
            answer_index: 3,
            explanation: "Consistency the owner can sustain matters more than a high number.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "social-and-messaging": {
      explanation_md: `In Ghana, a lot of buying and selling happens inside chat apps and social media. A customer sees a post, sends "How much?", agrees a price, pays with mobile money and arranges delivery, all without leaving their phone. Organisations like NGOs, schools and think tanks also rely on social pages and email newsletters to keep people informed. Managing these channels well is the most requested skill in junior marketing adverts, so this section is the heart of the roadmap.

## Three kinds of direct channel

* **Messaging apps** such as WhatsApp put you in a private conversation with the customer. They are personal and close to the sale.
* **Social media pages** on Facebook, Instagram and TikTok help new people discover a business and see its products. The platform decides who sees each post.
* **Email newsletters** go to people who agreed to hear from you. You own the list, and no app decides who sees your message.

Each channel needs the same core habits: a complete and trustworthy profile, regular useful posts, and fast, polite replies.

## Working professionally

Running channels for someone else is a position of trust. Good practice includes:

* **Get access properly.** Ask to be added as an admin or editor instead of asking for the owner's password. Facebook and Instagram let page owners add people with limited roles.
* **Keep a record.** Note what you posted and any customer issues, so the owner always knows what is happening.
* **Protect customers.** Never ask people to share PINs, codes or card numbers. Scammers copy business pages; warn customers that the business will never ask for their PIN.
* **Respect privacy.** Ask permission before sharing a customer's photo, name or message.

## What this section covers

* **WhatsApp Business:** the profile, catalogue, quick replies, labels and Status.
* **Facebook and Instagram pages:** running a page and reading insights.
* **Community management and customer care:** replying, handling complaints and working with trusted local voices.
* **Email newsletters:** building a list and sending useful updates.

## A small example

Abdul-Rahman is hired part time by a Tamale pharmacy shop. Instead of taking the owner's phone, he asks to be added as an admin on the Facebook page and helps set up WhatsApp Business on the shop's own phone with quick replies. He keeps a simple log in Google Sheets of questions customers ask most. After a month, the owner can see every reply he sent and which questions keep coming up. That is the kind of trust that turns a short job into a long one.`,
      practice_task_md: `**Goal:** Audit the direct channels of one local business or organisation.

**Steps:**
1. Choose a business, church, school or NGO you know.
2. Find its WhatsApp number, social media pages and any email newsletter.
3. For each channel, check: Is the profile complete? When was the last post? How quickly do they reply? (Send a polite question if appropriate.)
4. Note one thing each channel does well and one thing to improve.
5. Write three practical recommendations the owner could act on this week.

**Done looks like:** A one page channel audit with clear, kind recommendations you could share with the owner.`,
      quiz: {
        questions: [
          {
            prompt: "What is the best way to get access to a client's Facebook page?",
            options: [
              "Ask the owner for their personal password",
              "Create a new page with the same name",
              "Ask to be added as an admin or editor with a proper role",
              "Log in on the owner's phone without telling them",
            ],
            answer_index: 2,
            explanation: "Page roles let owners give you access without sharing their password.",
          },
          {
            prompt: "Which channel lets you own the list, so no app decides who sees your message?",
            options: ["Instagram", "Email newsletters", "TikTok", "Facebook pages"],
            answer_index: 1,
            explanation: "Email goes to people who agreed to hear from you, and you own the list.",
          },
          {
            prompt: "What should a business never ask customers to share?",
            options: [
              "Their PINs, codes or card numbers",
              "Their delivery area",
              "Which product they want",
              "Feedback about the service",
            ],
            answer_index: 0,
            explanation: "Legitimate businesses never ask for PINs or codes, and customers should be warned about scammers.",
          },
          {
            prompt: "Why did Abdul-Rahman keep a log in Google Sheets?",
            options: [
              "To hide his work from the owner",
              "Because Facebook requires it",
              "To count his likes",
              "So the owner could see his replies and the most common customer questions",
            ],
            answer_index: 3,
            explanation: "Keeping a record builds trust and shows patterns in customer questions.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "whatsapp-business": {
      explanation_md: `For many small businesses in Ghana, WhatsApp is the shop counter. Customers ask prices, send photos of what they want, confirm MoMo payments and arrange delivery in chat. Yet many owners still use a personal WhatsApp account, reply late and repeat the same answers all day. Setting up and running WhatsApp Business properly is one of the most practical paid services a beginner marketer can offer, and the app itself is free.

## The WhatsApp Business app

WhatsApp Business is a separate free app made for small businesses. A phone number can only be registered on one WhatsApp account at a time, so many owners move the shop's number over to the business app or use a second SIM. The main tools are:

* **Business profile.** Name, short description, category, address, opening hours and email or website. A complete profile looks trustworthy.
* **Catalogue.** A list of products or services with photos, prices and descriptions that customers can browse inside the chat.
* **Quick replies.** Saved answers to common questions, sent with a short shortcut. For example, a saved message with prices, delivery areas and how to pay.
* **Greeting and away messages.** Automatic replies when someone messages for the first time or outside opening hours, so nobody feels ignored.
* **Labels.** Tags for chats, such as "new order", "paid" and "delivered", so you can track orders without a notebook.
* **Status.** Photos, videos or text that your contacts can see for 24 hours. Many local buyers check Status daily, so it works like a shop window.
* **Short link and QR code.** A link or code that opens a chat with the business, useful on flyers, stickers and social pages.

Broadcast lists let you send one message to many contacts privately, but only people who have saved the business number will receive it. That is a good reason to ask happy customers to save the number.

## Good habits

* Reply quickly during opening hours. A fast answer often decides whether a person buys here or somewhere else.
* Put the price and payment details in replies. Hiding the price makes people leave.
* Confirm payments carefully. Check the MoMo message from the network, not a screenshot a customer sends, because fake screenshots are a common scam.
* Do not spam. Too many broadcasts make people block the number.

## A worked example

Mariama's basket group in Bolgatanga used a personal account, and orders got lost in family chats. You help them install WhatsApp Business on the group's phone. You write a profile, add twelve baskets to the catalogue with sizes and prices, create quick replies for prices, delivery to Accra and MoMo payment, and set an away message for evenings. Labels show which orders are paid and which are packed. Now any member can handle the phone and nothing gets lost.`,
      practice_task_md: `**Goal:** Set up a complete WhatsApp Business profile for a real or practice business.

**Steps:**
1. With the owner's permission, install WhatsApp Business on the business phone. If you are practising, use a spare SIM.
2. Fill in the full profile: name, description, category, address, hours.
3. Add at least five catalogue items with clear photos, prices in cedis and short descriptions.
4. Create three quick replies: prices, delivery and how to pay.
5. Set a greeting message, an away message and four labels for tracking orders.
6. Post one Status that shows a product and tells people how to order.

**Done looks like:** Screenshots of the profile, catalogue, quick replies and labels, collected in one document you can show a mentor or a future client.`,
      quiz: {
        questions: [
          {
            prompt: "What is a quick reply in WhatsApp Business?",
            options: [
              "A saved answer to a common question that you can send with a shortcut",
              "A paid advert inside WhatsApp",
              "A message that disappears after one hour",
              "A way to call many customers at once",
            ],
            answer_index: 0,
            explanation: "Quick replies are saved messages for questions you answer often.",
          },
          {
            prompt: "Who receives a broadcast list message?",
            options: [
              "Every WhatsApp user in the same town",
              "Anyone who has ever visited the shop",
              "Only contacts who have saved the business number",
              "Only people in a WhatsApp group",
            ],
            answer_index: 2,
            explanation: "Broadcast messages only reach people who saved the business number.",
          },
          {
            prompt: "How should a business confirm a mobile money payment?",
            options: [
              "Trust any screenshot the customer sends",
              "Ask the customer to send their PIN",
              "Wait for the customer to say thank you",
              "Check the payment message from the network",
            ],
            answer_index: 3,
            explanation: "Fake screenshots are a common scam, so check the network's own message.",
          },
          {
            prompt: "How long can contacts see a WhatsApp Status update?",
            options: ["One hour", "24 hours", "One week", "Until the business deletes the app"],
            answer_index: 1,
            explanation: "Status updates are visible for 24 hours.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "facebook-instagram": {
      explanation_md: `Facebook is widely used in Ghana by businesses, churches, schools and NGOs, and Instagram matters for fashion, food, beauty, crafts and anything visual. Job adverts for social media roles often expect you to manage pages on both and to use Meta's business tools. The skills are learnable on a phone, and Meta offers free training through Meta Blueprint.

## Pages, profiles and professional accounts

A business should use a Facebook Page, not a personal profile, and an Instagram professional account, not a personal one. Pages and professional accounts give access to insights, scheduling, ads and roles for helpers. Fill in everything: a clear profile picture or logo, a cover image, a short description, location, hours, phone number and a WhatsApp button or link.

Meta Business Suite is a free tool that lets you manage a Facebook Page and a linked Instagram account in one place, schedule posts in advance and see messages from both. Menus and button names change often, so learn what each feature does rather than memorising where it sits.

## Posting well

* **Match the platform.** Facebook suits longer captions, event details, links and community discussion. Instagram is more visual: strong photos, Reels and short captions.
* **Use Reels and Stories.** Short vertical video often reaches more people who do not yet follow you than still photos do.
* **Be consistent.** Follow your content calendar. Steady posting builds trust.
* **Use events and groups.** For a church harvest or an NGO workshop, a Facebook event collects interested people and reminds them.

## Reading insights

Insights tell you how your content performs. The names change from time to time, but they generally show:

* **Reach.** Roughly how many different people saw your content.
* **Engagement.** Reactions, comments, shares and saves.
* **Followers.** How many people follow, and how that is changing.
* **Actions.** Messages started, link clicks, calls or profile visits.

Look for patterns over several weeks, not single posts. Which topics, formats and times lead to messages and sales? Do more of those. A post with many likes but no messages may be entertaining but not selling.

## A worked example

Issahaku manages the Facebook Page of an NGO running a girls' education programme in the Northern Region. He checks insights monthly and notices that photos of classroom activities with short stories get far more shares than flyers with long text. Event posts for community meetings bring messages from parents. He shifts the calendar toward stories and events, schedules them in Business Suite every Friday, and reports the pattern to his manager with screenshots.`,
      practice_task_md: `**Goal:** Plan and schedule a week of posts for a Facebook Page and read its insights.

**Steps:**
1. If you manage a page for a business, church, school or club, use it. If not, create a practice Facebook Page for a made up local business.
2. Complete every profile field, including hours and a WhatsApp link.
3. Write and schedule three posts for the coming week using Meta Business Suite: one photo, one short video, one event or useful tip.
4. After a week, open insights and note reach, engagement and any messages for each post.
5. Write two sentences on what you would do differently next week.

**Done looks like:** Screenshots of the completed page, the scheduled posts and the insights, with your short notes.`,
      quiz: {
        questions: [
          {
            prompt: "Why should a business use a Facebook Page instead of a personal profile?",
            options: [
              "Personal profiles cannot post photos",
              "Pages give access to insights, scheduling, ads and roles for helpers",
              "Pages are the only way to send messages",
              "Pages never show adverts",
            ],
            answer_index: 1,
            explanation: "Pages and professional accounts unlock business tools.",
          },
          {
            prompt: "What does Meta Business Suite let you do?",
            options: [
              "Manage a Facebook Page and linked Instagram account and schedule posts",
              "Send MoMo payments to customers",
              "Edit TikTok videos",
              "Build a full website for free",
            ],
            answer_index: 0,
            explanation: "Business Suite brings both accounts together, with scheduling and messages.",
          },
          {
            prompt: "In insights, what does reach roughly measure?",
            options: [
              "How much money a post earned",
              "How many comments a post received",
              "How many different people saw your content",
              "How many people unfollowed the page",
            ],
            answer_index: 2,
            explanation: "Reach is roughly the number of different people who saw the content.",
          },
          {
            prompt: "What does the lesson say about a post with many likes but no messages?",
            options: [
              "It is always the best kind of post",
              "It should be deleted immediately",
              "It proves the price is too low",
              "It may be entertaining but not selling",
            ],
            answer_index: 3,
            explanation: "Look for content that leads to messages and sales, not only likes.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "community-management": {
      explanation_md: `Every comment, message and review is a conversation that other people are watching. A rude or slow reply can lose more than one customer. A calm, helpful reply can win new ones. Ghanaian adverts for community managers and social media executives ask for audience engagement and community growth, and some senior roles ask for influencer partnerships. This lesson covers all three at a beginner level.

## Replying well

* **Be quick.** Reply to comments and messages as soon as you can during working hours. Agree response times with the owner.
* **Be human.** Use the person's name, keep a friendly tone and match the brand voice.
* **Answer the actual question.** If someone asks the price, give the price.
* **Know when to move to private.** Questions about an order, a payment or personal details should go to WhatsApp or direct messages. Say so politely in public so others see you responded.

## Handling complaints

When someone complains in public, try this order:

* **Acknowledge.** "Sorry to hear this, Amina."
* **Take it private.** "We have sent you a message to sort it out."
* **Fix it.** Work with the owner to solve the real problem.
* **Follow up.** If it is resolved, a short public reply shows others you care.

Do not argue, do not delete genuine complaints just because they are negative, and never share a customer's private details in public.

## Spam and scams

Scammers often comment on business posts pretending to be the business, offering fake promotions and asking for MoMo PINs. Hide or delete those comments, report the accounts, and post a pinned reminder that the business will never ask for a PIN or code.

## Working with trusted local voices

Sometimes a business can reach new people through someone their audience already trusts: a respected pastor, a popular campus figure, a local radio presenter or a creator with a loyal following in Tamale. This is often called influencer or creator marketing. For a small budget, a creator with a smaller but engaged local audience can be more useful than a famous one. Agree in writing what they will post, when, and what they receive, and make sure paid posts are clearly marked as paid partnerships so followers are not misled.

## A worked example

A customer posts on a Tamale restaurant's page: "Ordered jollof yesterday and it came cold. Not happy." Hawa, the page manager, replies within the hour: "Sorry, Wumpini, that is not the standard we want. We have messaged you." In private she arranges a replacement meal. The next day Wumpini comments that the new meal was great. Dozens of people saw a complaint handled well, which builds more trust than a perfect post.`,
      practice_task_md: `**Goal:** Practise replying to real types of comments with a clear, kind process.

**Steps:**
1. Write down six example comments a local business might receive: two questions, two complaints, one compliment and one scam comment.
2. Write a reply for each, following the lesson: quick, human, answer the question, move private when needed.
3. For the scam comment, write the action you would take and a pinned warning post.
4. Write a short note listing two local creators or trusted voices who could suit the business, and why.
5. Ask a friend to act as an angry customer by message and practise replying calmly.

**Done looks like:** A document with six comments and replies, a scam warning, and your short creator note.`,
      quiz: {
        questions: [
          {
            prompt: "Someone asks a question about their payment in a public comment. What should you do?",
            options: [
              "Ignore it so nobody sees it",
              "Ask them to post their MoMo PIN so you can check",
              "Reply publicly that you will message them, then handle it in private",
              "Delete the comment straight away",
            ],
            answer_index: 2,
            explanation: "Payment and personal matters move to private, with a short public reply.",
          },
          {
            prompt: "What is the first step when handling a public complaint?",
            options: ["Acknowledge the problem", "Argue with the customer", "Delete the comment", "Block the customer"],
            answer_index: 0,
            explanation: "The lesson's order is acknowledge, take it private, fix it, follow up.",
          },
          {
            prompt: "What should you do with a comment pretending to be the business and asking for PINs?",
            options: [
              "Reply and thank them",
              "Leave it because deleting comments is never allowed",
              "Share it so customers can see it",
              "Hide or delete it, report the account and remind customers you never ask for PINs",
            ],
            answer_index: 3,
            explanation: "Scam comments should be removed and reported, with a clear warning to customers.",
          },
          {
            prompt: "What does the lesson say about paid posts by creators?",
            options: [
              "They should be hidden so they look natural",
              "They should be clearly marked as paid partnerships",
              "Only famous creators are worth paying",
              "No written agreement is needed",
            ],
            answer_index: 1,
            explanation: "Marking paid partnerships clearly means followers are not misled.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "email-marketing": {
      explanation_md: `Email may feel old fashioned next to TikTok, but several Ghanaian marketing adverts ask for it, from agencies and agritech companies to think tanks and NGOs, and remote marketing assistant roles often do too. The reason is simple: an email list belongs to the business. No algorithm decides whether your subscribers see your message, and if a social account is hacked or blocked, the list is still there.

## Who uses email

* **NGOs and think tanks** send newsletters to donors, partners and journalists.
* **Schools and churches** send updates to parents and members who prefer something they can keep.
* **Online shops and B2B companies** send offers, new stock alerts and reminders.
* **Startups** send welcome messages and tips to new users.

## Building a list the right way

People must agree to receive your emails. Collect addresses through a sign up form, at an event with a clear note of what they are signing up for, or when a customer orders and ticks a box. Never buy lists or add people without asking. Ghana's Data Protection Act, 2012 (Act 843) sets rules for collecting and using personal data, and the Data Protection Commission oversees it. Every marketing email should include a simple way to unsubscribe, and you must honour those requests.

## Writing a good newsletter

* **Subject line.** Short and specific. "Harvest thanksgiving: Sunday 10am" beats "Newsletter".
* **One main message.** One event, one offer or one story, with a clear button or link.
* **Mobile first.** Most people will read on a phone. Short paragraphs, large text and small images.
* **Plain and personal.** Write as one person to another. Use the reader's name if your tool allows it.
* **Regular but not constant.** A steady monthly or fortnightly newsletter is better than a flood followed by silence.

## Tools

You can start with Gmail and a small list, but email marketing tools such as Mailchimp, Brevo or MailerLite add sign up forms, templates, unsubscribe links and reports. Many have free plans with limits that change, so check the current plan before you promise anything to a client. Useful numbers to watch are clicks, replies and unsubscribes.

## A worked example

Amina volunteers for a youth NGO in Wa that only posted on Facebook. She adds a sign up form to their page and collects emails at a community event, with a clear note that people will get a monthly update. Her first newsletter has one story about a training day, two photos, a link to register for the next session and an unsubscribe link at the bottom. Partners reply to say thank you, and two offer to share it.`,
      practice_task_md: `**Goal:** Draft a short newsletter and a simple, consent based sign up form.

**Steps:**
1. Choose an organisation, such as a church, school club, NGO or online shop.
2. Create a free Google Form that collects name and email, with a clear sentence explaining what people will receive and how often.
3. Draft one newsletter in Gmail or Google Docs: a specific subject line, one main message, one link, and a line explaining how to unsubscribe.
4. Send the draft to yourself and read it on your phone. Fix anything hard to read.

**Done looks like:** A working sign up form link and a phone friendly newsletter draft that you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say an email list is valuable to a business?",
            options: [
              "It belongs to the business and no algorithm decides who sees the message",
              "Emails are always opened by every subscriber",
              "Email is the only channel allowed for NGOs",
              "Email lists can be bought cheaply",
            ],
            answer_index: 0,
            explanation: "The list is owned by the business, unlike reach on a social app.",
          },
          {
            prompt: "Which law sets rules for collecting and using personal data in Ghana?",
            options: [
              "The Electronic Transactions Act",
              "The Data Protection Act, 2012 (Act 843)",
              "The Companies Act",
              "The Labour Act",
            ],
            answer_index: 1,
            explanation: "The lesson names the Data Protection Act, 2012 (Act 843), overseen by the Data Protection Commission.",
          },
          {
            prompt: "What should every marketing email include?",
            options: [
              "A long list of every product",
              "The sender's MoMo PIN",
              "A simple way to unsubscribe",
              "At least five large images",
            ],
            answer_index: 2,
            explanation: "Recipients must be able to unsubscribe, and those requests must be honoured.",
          },
          {
            prompt: "Which subject line follows the lesson's advice?",
            options: ["Newsletter", "Important!!!", "Update number 12", "Harvest thanksgiving: Sunday 10am"],
            answer_index: 3,
            explanation: "Short and specific subject lines tell readers exactly what the email is about.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "search-and-local": {
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

Sumaila runs a guest house in Bolgatanga. Travellers kept saying they could not find it, and some went to a competitor whose listing showed up on Maps with photos and reviews. You search "guest house Bolgatanga" on your phone and confirm his business is missing. You help him create a Business Profile with the right location pin, phone number, photos of the rooms and hours, and complete Google's verification steps. Over the next weeks, he asks happy guests to leave honest reviews. Travellers start calling from the listing, and he tells you which calls came from Maps so you can track it.`,
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
              "They cannot see business details",
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
              "Paying for ads above search results",
              "A type of social media video",
              "A rule for email newsletters",
              "The work of getting web pages to rank in ordinary search results",
            ],
            answer_index: 3,
            explanation: "Search engine optimisation aims at organic search results.",
          },
          {
            prompt: "Can a business without a website still improve its search visibility?",
            options: [
              "No, search only works for businesses with websites",
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
              "Customers cannot read long names",
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
              "Apologise, explain what you will do and invite them to get in touch",
              "Argue that the customer is lying",
              "Ask friends to post good reviews to hide it",
            ],
            answer_index: 1,
            explanation: "A polite reply with a plan shows other customers the business cares.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "seo-basics": {
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
              "Whoever registered first always wins",
              "An auction based on what advertisers will pay and how relevant their ads seem",
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
              "Platforms only accept cash payments",
              "Billing methods and currencies differ by country and change over time",
            ],
            answer_index: 3,
            explanation: "The lesson says billing details vary and change, so check current help pages.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "social-ads": {
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

Hawa wants more orders for her shea butter gift packs before Christmas. Abdul-Rahman sets up a campaign with a messaging objective, an audience of adults within a set distance of Tamale, a small daily budget and two versions of the ad: one photo and one short video. After four days the video brings messages at a lower cost, so he pauses the photo and moves its budget to the video. He records every message and sale in a sheet so Hawa can see what the money achieved.`,
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
              "Interested people can ask questions and order the way they already prefer",
              "WhatsApp ads are always free",
              "It removes the need for a budget",
              "It shows the ad only to the owner",
            ],
            answer_index: 0,
            explanation: "Many local customers prefer to order through WhatsApp chat.",
          },
          {
            prompt: "What is an A/B test?",
            options: [
              "Running ads in two countries at once",
              "Doubling the budget every day",
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
              "How many followers your Facebook page has",
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
              "To the business owner's personal profile",
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
  },
};

export default content;
