import type { TrackContent } from "./types";

/**
 * Original lesson content for the Digital Business and Ecommerce roadmap
 * (wave 3). Research and sources: src/content/research/digital-business.md.
 * Fees, tax thresholds and registration steps are deliberately left general:
 * lessons send learners to ORC, GRA and FDA for current figures.
 */
const content: TrackContent = {
  roadmap: "digital-business",
  nodes: {
    foundations: {
      explanation_md: `Across the north, people already run businesses. Women's groups process shea butter in Savelugu, weavers in Bolgatanga make baskets, families in Wa sell groundnuts and guinea fowl, and young people resell phones and clothes. What has changed is that customers now find sellers on their phones. A trader who can sell well through WhatsApp, social media and mobile money can reach buyers in Accra, Kumasi and beyond without renting a shop.

This roadmap teaches you to run a small business online, or to do that work for an employer. Shops and companies in Ghana hire people for sales, online selling and customer care, and they look for the same skills you will practise here: serving customers, keeping records, managing stock and selling through chat and social media.

## The idea: a business is a promise you can keep

Apps come later. A business starts with three simple questions:

* **What do I sell?** Something people want, that you can get reliably.
* **Who buys it?** Real people with a reason to pay, and a way to pay you.
* **Can I deliver it?** At the quality, time and price you promised.

If you cannot answer all three, more posting will not save the business. If you can, the online tools make everything faster.

## What this section covers

* **Choosing what to sell.** How to pick a product and test it small before you spend much money.
* **Customers and competitors.** How to describe your buyers and learn from other sellers.
* **Sourcing and suppliers.** How to find dependable supply and agree clear terms.

## A small example

Mariama lives in Tamale. Her aunt's group makes good shea butter, and Mariama wants to sell it online. Her first idea is to open accounts on every app and post every day.

Before she does, she answers the three questions. **What?** Pure shea butter in small tubs and larger tins. **Who?** Mothers and young women in southern cities who trust northern shea but cannot easily find pure butter there. **Can I deliver?** Her aunt can supply about twenty tubs a week, and a bus parcel service runs to Accra and Kumasi every day.

Now Mariama knows that she needs only a few channels, that she should not promise more than twenty tubs a week, and that delivery fees must be part of her price. The apps have not changed, but her plan is much stronger.

You do not need a big budget to start. You need a clear promise, a phone, and the habits this roadmap will build, one small step at a time.`,
      practice_task_md: `**Goal:** Write the three business questions for a product you could sell.

**Steps:**
1. Think of one product you or your family already make, grow or can buy easily.
2. In your phone's notes app, write one or two sentences for each question: What do I sell? Who buys it? Can I deliver it?
3. Under "Can I deliver it?", write how many you could supply in one week and how you would get the product to a buyer.
4. Read it to a family member or friend and ask: "Would you buy this, and why or why not?" Write down their answer.

**Done looks like:** A short note with three clear answers and one piece of honest feedback. Keep it; later lessons build on it.`,
      quiz: {
        questions: [
          {
            prompt: "According to this lesson, what does a business start with?",
            options: [
              "Opening accounts on every social media app",
              "Three questions: what you sell, who buys it, and whether you can deliver it",
              "A large loan to rent a shop",
              "Posting every day until someone buys",
            ],
            answer_index: 1,
            explanation: "The lesson says a business starts with what you sell, who buys it and whether you can deliver it.",
          },
          {
            prompt: "Why did Mariama decide not to promise more than about twenty tubs a week?",
            options: [
              "Because the bus service only carries twenty parcels",
              "Because customers only want small amounts",
              "Because her aunt's group can only supply about twenty tubs a week",
              "Because the apps limit how many items she can list",
            ],
            answer_index: 2,
            explanation: "Her answer to \"Can I deliver?\" showed that supply was about twenty tubs a week.",
          },
          {
            prompt: "What does the lesson say happens if you cannot answer all three questions?",
            options: [
              "More posting will not save the business",
              "You should post more often to find out",
              "You should lower your price straight away",
              "You should move to a different app",
            ],
            answer_index: 0,
            explanation: "The lesson says that without clear answers, more posting will not save the business.",
          },
          {
            prompt: "Which skills does the lesson say employers look for in sales and online selling roles?",
            options: [
              "Owning a large shop and a car",
              "Coding websites from scratch",
              "Having many followers on social media",
              "Serving customers, keeping records, managing stock and selling through chat and social media",
            ],
            answer_index: 3,
            explanation: "The lesson lists customer service, records, stock and selling through chat and social media.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-to-sell": {
      explanation_md: `Many small businesses fail not because the owner is lazy but because they chose a product that was hard to get, hard to deliver or that few people wanted at that price. Choosing well at the start saves you money and stress. It is also the first question any employer or support programme will ask about your business: why this product?

## Four tests for a product

Before you commit, check your idea against four tests.

* **Do you know it?** You understand the product, can explain it and can tell good quality from bad. Shea butter, dawadawa, smocks, baskets, rice, groundnuts and phone accessories are things many northern sellers already know well.
* **Can you get it reliably?** You have a dependable source, at a steady quality, in the quantities you need.
* **Can you deliver it?** It travels without breaking or spoiling, and the delivery cost does not swallow your profit. Heavy, fragile or quick to spoil items are harder to sell far away.
* **Will people pay enough?** There are buyers who want it, and the price they will pay covers your costs and leaves something for you.

A product that passes all four is a good candidate. One that fails a test is not always wrong, but you need a plan for that weakness.

## Test small before you spend big

The safest way to learn whether people will buy is to try selling a small batch. Buy or make only a little, show it to people, and see what happens. Did people ask the price? Did they actually pay? Did anyone come back for more? Real orders tell you more than compliments.

Write down what you learn. If nobody buys, change one thing (the price, the size, the photos or the customers you show it to) and test again.

## A small example

Issahaku in Bolgatanga is choosing between selling fresh tomatoes and selling woven baskets online.

Tomatoes are easy to buy, but they spoil within days and bruise on a long bus ride. Baskets are light, do not spoil and are made by weavers he knows personally, so he can check quality. He decides baskets pass more tests.

Instead of buying fifty, Issahaku buys five baskets of different sizes, photographs them and shares them on his WhatsApp Status with prices. Three sell within a week, all the medium size. Two buyers ask whether he has the same style in other colours. Now he knows which size to stock and what to ask the weavers for next.

He spent little money, and he learned what his customers actually want. That is the habit to build: choose with the four tests, then let small real sales guide your next step.`,
      practice_task_md: `**Goal:** Compare two product ideas and plan a small test.

**Steps:**
1. Write down two products you could sell.
2. For each one, score the four tests (know it, get it reliably, deliver it, people pay enough) from 1 to 3, with one sentence explaining each score.
3. Pick the product with the better score.
4. Write a small test plan: how many items you will start with, who you will show them to, and how you will know if the test worked (for example, at least three paid orders in two weeks).

**Done looks like:** A short table or list comparing two ideas, a chosen product and a written test plan. If you can, run the test and note the results.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is one of the four tests for a product in this lesson?",
            options: [
              "Is it popular with celebrities?",
              "Can you deliver it without it breaking or spoiling, at a sensible cost?",
              "Is it sold only in big cities?",
              "Does it need a shop to sell it?",
            ],
            answer_index: 1,
            explanation: "\"Can you deliver it?\" is one of the four tests, covering breakage, spoiling and delivery cost.",
          },
          {
            prompt: "Why does the lesson suggest testing with a small batch first?",
            options: [
              "Because suppliers will not sell large amounts",
              "Because small batches always make more profit",
              "Because real orders show whether people will buy, without risking much money",
              "Because apps only allow a few products",
            ],
            answer_index: 2,
            explanation: "A small batch lets you learn from real orders while spending little.",
          },
          {
            prompt: "Why did Issahaku choose baskets over fresh tomatoes?",
            options: [
              "Baskets are light, do not spoil and he can check their quality",
              "Tomatoes are illegal to sell online",
              "Baskets are always cheaper to buy",
              "Nobody in Ghana buys tomatoes",
            ],
            answer_index: 0,
            explanation: "Tomatoes spoil and bruise in transport, while baskets are light, durable and from weavers he knows.",
          },
          {
            prompt: "If nobody buys during your test, what does the lesson suggest?",
            options: [
              "Give up on selling online completely",
              "Buy a much larger batch so you have more choice",
              "Keep everything the same and wait longer",
              "Change one thing, such as the price, size, photos or customers, and test again",
            ],
            answer_index: 3,
            explanation: "The lesson says to change one thing and test again.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "customers-and-competitors": {
      explanation_md: `If you try to sell to everyone, your message speaks to no one. Knowing exactly who buys from you tells you where to post, what to say, which language to use, how to price and how to deliver. Employers in sales also value this: adverts for sales and business development roles often ask for an understanding of customers and of what competitors are doing.

## Describe your customer

Write a short description of your main buyer. Answer these questions:

* **Who are they?** Age, work and where they live, such as young mothers in Kumasi or nurses in Tamale.
* **Why do they buy?** The need or wish behind the purchase, such as soft skin in the harmattan or a gift for a wedding.
* **Where do they spend time?** WhatsApp groups, TikTok, Facebook, church, the market or the office.
* **How do they pay?** Mobile money, cash on delivery or bank transfer.
* **What worries them?** Fake products, late delivery or paying for something that never arrives.

Your answers will guide everything you do later. If your buyers worry about fakes, show how the product is made. If they live far away, explain delivery clearly.

## Study your competitors

Competitors are other sellers your customers could buy from instead. You can learn a lot from them for free. Look at three to five similar sellers online and in the market and note:

* **Prices** for similar sizes and quality.
* **Photos and descriptions**: what looks trustworthy and what looks careless.
* **Delivery and payment** options they offer.
* **Customer comments**: what people praise and what they complain about.

Complaints are especially useful. If buyers often complain that a competitor replies slowly, fast replies can become your strength.

Never copy another seller's photos or words. Learn from them, then do it your own way.

## A small example

Hawa sells smocks from Daboya. At first she described her customer as "anyone who likes smocks". After some thought she rewrote it: young professional men in Accra who want a smock for Friday wear and festivals, who use Instagram and WhatsApp, pay with mobile money, and worry about getting the wrong size.

She then studied four other smock sellers. Their prices were similar, but most did not give clear size guides, and several comments complained about smocks that did not fit.

Hawa added a simple size chart to every post and offered to measure customers on a video call. Her description of the customer showed her where to sell, and her study of competitors showed her how to stand out.

You can do the same for any product, whether you sell to neighbours in Nalerigu or to buyers in other regions.`,
      practice_task_md: `**Goal:** Describe your main customer and study three competitors.

**Steps:**
1. Using the five questions in the lesson (who, why, where, how they pay, what worries them), write a short description of your main customer.
2. Find three sellers of a similar product online or in your market.
3. For each, note their price, how their photos look, their delivery and payment options, and one thing customers praise or complain about.
4. Write two sentences: what customers seem to want that these sellers are not giving them, and how you could give it.

**Done looks like:** One customer description and a simple comparison of three competitors, ending with one clear way you could stand out.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say you should not try to sell to everyone?",
            options: [
              "Because apps block sellers who post too much",
              "Because only rich people buy online",
              "Because a message meant for everyone speaks to no one",
              "Because competitors will copy you",
            ],
            answer_index: 2,
            explanation: "The lesson opens by saying that selling to everyone means your message speaks to no one.",
          },
          {
            prompt: "Which of these is one of the questions for describing your customer?",
            options: [
              "What worries them?",
              "What is their favourite football club?",
              "How many children do they have?",
              "Which phone brand do they use?",
            ],
            answer_index: 0,
            explanation: "\"What worries them?\" is one of the five questions, along with who, why, where and how they pay.",
          },
          {
            prompt: "Why are complaints about competitors especially useful?",
            options: [
              "You can share them to embarrass the competitor",
              "They show problems you can solve to stand out",
              "They prove the product is not worth selling",
              "They tell you which photos to copy",
            ],
            answer_index: 1,
            explanation: "If buyers complain about something, doing it well can become your strength.",
          },
          {
            prompt: "What did Hawa add after studying other smock sellers?",
            options: [
              "Lower prices than everyone else",
              "Copies of their best photos",
              "Free delivery to every region",
              "A size chart on every post and an offer to measure customers on a video call",
            ],
            answer_index: 3,
            explanation: "Competitors lacked size guides and had fitting complaints, so she added a size chart and video measuring.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "sourcing-and-suppliers": {
      explanation_md: `A customer who pays you is trusting that the product will arrive as promised. If your supplier lets you down, you let your customer down. Reliable supply is what allows a small business to keep its promises and grow. Online merchants and shop staff alike spend real time on sourcing, ordering and checking goods, so these habits matter for jobs too.

## Where products come from

Your stock can come from different places:

* **You make it yourself**, such as soap, snacks or sewn clothes.
* **A producer you know**, such as a shea processing group, weavers or farmers.
* **A wholesaler or market trader**, such as a dealer in Tamale Central Market or Makola.
* **A mix**, such as buying fabric wholesale and paying a tailor to sew.

Each source has trade offs. Making it yourself gives you control but takes time. Buying from a wholesaler is quick but you control quality less.

## Agree the terms clearly

Whenever you buy from someone else, agree these points before money changes hands:

* **Quality:** what good looks like. Show a sample and keep a photo of it.
* **Quantity:** how many items, and how many they can supply each week or month.
* **Price:** the cost per item, and whether it drops if you buy more.
* **Timing:** when the goods will be ready.
* **Payment:** whether you pay before, on collection or after you sell. Some trusted suppliers will let you pay after selling, but only agree to what you can keep.

Write the agreement down, even as a short WhatsApp message both of you reply to. A written record prevents arguments later.

## Have a backup

If you depend on one supplier and they fall sick, run out or raise prices, your business stops. Where you can, know at least one other source. Keep in touch with both, and treat suppliers fairly. Paying on time and being polite builds goodwill that helps you when you need a favour.

## A small example

Fuseini sells dried okra and dawadawa to buyers in Kumasi. He buys from two women in Savelugu. Last season, one batch had sand mixed in and a customer complained.

Fuseini now sends each supplier a short message before every order: the quantity, the price per bowl, the date he will collect, and a photo of the clean product he expects. When he collects, he checks a sample before paying. Both women reply "OK" to his messages, so there is a record.

When one supplier travelled for a funeral, the other covered his order. His customers never knew there was a problem. Fuseini did not need a big contract. He needed clear terms, a written record, quality checks and a backup.`,
      practice_task_md: `**Goal:** Write a simple supplier agreement message.

**Steps:**
1. Choose a product and a real or likely supplier (a producer, wholesaler or yourself).
2. Write a short message you could send them that covers quality, quantity, price, timing and payment.
3. Add one sentence about how you will check quality when you collect.
4. List one possible backup supplier and how you would contact them.

**Done looks like:** A ready to send supplier message covering the five terms, a quality check step and a named backup. If you send it for real, save the reply as your record.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say reliable supply matters so much?",
            options: [
              "Because suppliers set your selling price",
              "Because if your supplier lets you down, you let your customer down",
              "Because the government requires two suppliers",
              "Because customers like to meet your supplier",
            ],
            answer_index: 1,
            explanation: "A customer trusts you to deliver, so supply problems become your problem.",
          },
          {
            prompt: "Which list matches the terms the lesson says to agree before buying?",
            options: [
              "Colour, logo, packaging and advertising",
              "Followers, likes, shares and comments",
              "Quality, quantity, price, timing and payment",
              "Rent, electricity, water and security",
            ],
            answer_index: 2,
            explanation: "The lesson lists quality, quantity, price, timing and payment.",
          },
          {
            prompt: "What simple way of recording an agreement does the lesson suggest?",
            options: [
              "A short WhatsApp message that both of you reply to",
              "A lawyer's contract signed at court",
              "A verbal promise with no record",
              "A public post on social media",
            ],
            answer_index: 0,
            explanation: "The lesson suggests writing it down, even as a short WhatsApp message both reply to.",
          },
          {
            prompt: "How did Fuseini keep serving customers when one supplier travelled?",
            options: [
              "He paused all orders until she returned",
              "He bought from a market trader he did not know",
              "He told customers to wait a month",
              "His second supplier covered the order",
            ],
            answer_index: 3,
            explanation: "He had a backup supplier, so customers never noticed a problem.",
          },
        ],
        pass_threshold: 75,
      },
    },
    // NEXT
  },
};

export default content;
