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
    money: {
      explanation_md: `Plenty of sellers in Ghana are busy all day and still wonder where the money went. They sell a lot, but they never worked out what each item really cost, they mixed business money with family money, or they ran out of stock just when buyers were ready. Being good with business numbers is what turns hard work into real income. It is also a skill employers check for: shop and sales adverts regularly ask for pricing, cash handling, record keeping and stock management.

## You do not need to be a maths expert

Business sums use simple addition, subtraction, multiplication and division. What matters is doing them honestly and regularly. A notebook and a calculator work. A free spreadsheet app such as Google Sheets on your phone makes it easier, because it adds up for you.

## The four money habits

This section teaches four habits that protect your business:

* **Costing and pricing.** Work out every cost of one item, then set a price that covers those costs and leaves a profit.
* **Profit and cash flow.** Understand the difference between money coming in, profit you actually made, and cash you have available today.
* **Simple bookkeeping.** Write down every sale and every expense the same day.
* **Stock control.** Know what you have, what has sold and when to reorder.

Each habit supports the others. Good records show you your real costs. Real costs give you better prices. Stock counts stop you promising goods you do not have.

## Keep business money separate

One rule underpins all four habits: keep business money separate from personal money. If you pay school fees, airtime and family needs from the same wallet as your stock money, you cannot tell whether the business is doing well. Many sellers use a second mobile money wallet or a separate box for business cash. Then pay yourself a fixed amount from the business, the way an employer would pay a worker.

## A small example

Amina sells fried snacks and sobolo to offices in Wa. She earns about the same amount every day, so she thought she was doing fine. But each month she struggled to buy new ingredients.

She started writing down every cedi spent on flour, oil, sugar, hibiscus, bottles and transport, and every cedi received. After two weeks she saw the problem: oil prices had risen, but she had not changed her prices. Some days she was selling at almost no profit. She was also taking money for family needs from her sales without noting it.

Amina raised her snack price slightly, opened a second wallet for the business and paid herself a set amount each Friday. Within a month she could buy ingredients without stress. Nothing about her cooking changed. Her numbers did.`,
      practice_task_md: `**Goal:** Start separating and tracking business money.

**Steps:**
1. Decide where your business money will live: a second mobile money wallet, a separate envelope or box, or a separate account.
2. Choose a fixed amount you will pay yourself each week or month from the business.
3. Create a simple sheet in Google Sheets or a notebook page with three headings: Date, Money in, Money out.
4. Record every business transaction for three days, even small ones like transport or data.

**Done looks like:** A chosen place for business money, a fixed personal pay amount, and three days of written records you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what kind of maths do business sums mostly need?",
            options: [
              "Advanced algebra and statistics",
              "Simple addition, subtraction, multiplication and division done honestly and regularly",
              "Only percentages",
              "Accounting software that costs money",
            ],
            answer_index: 1,
            explanation: "The lesson says business sums use simple arithmetic; what matters is doing them honestly and regularly.",
          },
          {
            prompt: "Which rule does the lesson say underpins all four money habits?",
            options: [
              "Always sell on credit",
              "Never raise prices",
              "Keep business money separate from personal money",
              "Spend all profit immediately on more stock",
            ],
            answer_index: 2,
            explanation: "Mixing business and personal money makes it impossible to see how the business is doing.",
          },
          {
            prompt: "What was the main problem Amina discovered from her records?",
            options: [
              "Oil prices had risen but her prices had not, so some days she made almost no profit",
              "Her customers had stopped buying sobolo",
              "Her snacks were too expensive",
              "She was selling to the wrong offices",
            ],
            answer_index: 0,
            explanation: "Her records showed rising costs with unchanged prices, plus untracked family withdrawals.",
          },
          {
            prompt: "Which of these is one of the four money habits in this section?",
            options: [
              "Posting on social media every day",
              "Borrowing to buy stock",
              "Hiring an accountant",
              "Stock control: knowing what you have, what has sold and when to reorder",
            ],
            answer_index: 3,
            explanation: "The four habits are costing and pricing, profit and cash flow, bookkeeping and stock control.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "costing-and-pricing": {
      explanation_md: `Pricing is where many small sellers lose money without noticing. They copy a competitor's price or guess a round number, then find that after transport, packaging and data there is little left. Knowing how to cost and price an item is a basic skill for any trader, and shop and sales roles in Ghana often list pricing and basic maths as requirements.

## Step 1: find the full cost of one item

Start with the **cost per item**. List everything you spend to get one item into a customer's hands:

* **Buying or making the product**: the price you pay, or the ingredients and materials.
* **Transport to collect stock**: trotro, taxi or motorbike fare, divided across the items you carried.
* **Packaging**: tubs, bags, labels, tape.
* **Selling costs**: a share of your data bundle and airtime, and any mobile money charges you pay.
* **Waste**: items that break, spoil or go missing.

If you buy in bulk, divide the total cost by the number of items. If one trip to the market costs 20 cedis and you bring back 40 items, that trip adds 50 pesewas to each one.

## Step 2: add your profit

Your price must cover the cost and leave **profit**, the money that pays you and helps the business grow. One simple method is to decide how much profit you want on each item and add it to the cost. Another is to add a percentage of the cost, such as a third or a half, depending on the product.

## Step 3: check against the market

Now compare your price with what similar sellers charge. If yours is much higher, either show clearly why it is worth more (better quality, faster delivery, a nicer tub) or look for ways to reduce your cost. If yours is much lower, ask whether you are giving profit away.

## Delivery: decide who pays

Decide whether delivery is included in the price or charged separately. Either can work. What matters is that it is clear to the customer and that you never pay for delivery out of your profit without meaning to.

## A small example

Wumpini makes beaded bracelets in Tamale. Here is her cost for one bracelet:

* Beads and thread: 6 cedis
* Share of transport to buy beads: 1 cedi
* Small bag and label: 1 cedi
* Share of data and airtime: 1 cedi

Her full cost is 9 cedis. She wants about 6 cedis profit on each bracelet, so she prices it at 15 cedis. Other sellers online charge between 12 and 20 cedis, so 15 cedis is fair. Delivery is charged separately, based on the customer's town.

Before, Wumpini sold bracelets for 10 cedis because "that sounded right". She was making only 1 cedi on each. Now every sale actually pays her.`,
      practice_task_md: `**Goal:** Cost and price one real product.

**Steps:**
1. Choose one product you sell or could sell.
2. List every cost for one item: product or materials, transport share, packaging, data and airtime share, and an allowance for waste.
3. Add them to get the full cost per item.
4. Decide your profit per item and calculate your price.
5. Find the prices of three similar products online or in the market and write whether your price is lower, similar or higher, and why.

**Done looks like:** A short costing sheet (notebook or Google Sheets) showing each cost, the total, your profit and your price, plus a one line market comparison.`,
      quiz: {
        questions: [
          {
            prompt: "What is the first step in pricing according to this lesson?",
            options: [
              "Copy the price of the most popular seller",
              "Find the full cost of getting one item into a customer's hands",
              "Choose a round number that sounds right",
              "Ask customers what they want to pay",
            ],
            answer_index: 1,
            explanation: "Step 1 is to find the full cost per item, including transport, packaging and selling costs.",
          },
          {
            prompt: "One market trip costs 20 cedis and you bring back 40 items. How much does that trip add to the cost of each item?",
            options: ["2 cedis", "20 pesewas", "50 pesewas", "5 cedis"],
            answer_index: 2,
            explanation: "20 cedis divided by 40 items is 50 pesewas per item.",
          },
          {
            prompt: "Which of these does the lesson list as a cost to include?",
            options: [
              "A share of your data bundle and airtime",
              "Your competitor's rent",
              "The price customers saw last year",
              "Money you plan to save for a holiday",
            ],
            answer_index: 0,
            explanation: "Selling costs like data, airtime and mobile money charges are part of the full cost.",
          },
          {
            prompt: "What was Wumpini's full cost for one bracelet?",
            options: ["6 cedis", "10 cedis", "15 cedis", "9 cedis"],
            answer_index: 3,
            explanation: "6 cedis for beads plus 1 each for transport, packaging and data gives 9 cedis.",
          },
          {
            prompt: "If your price is much higher than similar sellers, what does the lesson suggest?",
            options: [
              "Lower it to the cheapest price immediately",
              "Stop selling the product",
              "Show clearly why it is worth more, or look for ways to reduce your cost",
              "Hide the price from customers",
            ],
            answer_index: 2,
            explanation: "The lesson says either show the extra value or reduce your costs.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "profit-and-cash-flow": {
      explanation_md: `"I sold 2,000 cedis this month!" sounds great, but it does not tell you whether the business made money. Understanding the difference between sales, profit and cash is one of the most useful things a trader can learn. Support programmes, lenders and employers who hire people to run shops all expect you to talk about these clearly.

## Three different numbers

* **Sales (revenue)** is all the money customers paid you.
* **Profit** is what is left after you subtract all your costs from sales. It can be small even when sales are big.
* **Cash** is the money you actually have right now, in your wallet, box or account.

These three are often different. You might have high sales but low profit because your costs are high. You might have good profit on paper but little cash, because customers still owe you or because you spent cash on new stock.

## Margin: profit as a share of the price

Your **margin** shows how much of each sale you keep. If you sell something for 20 cedis and it cost you 15 cedis, your profit is 5 cedis. That is a quarter of the price, so your margin is 25 percent.

Products with a thin margin need many sales to earn well. Products with a wider margin can earn more from fewer sales. Knowing your margin helps you decide which products to push, and how much of a discount you can afford.

## Cash flow: timing matters

**Cash flow** is the movement of money in and out over time. A business can run out of cash even when it is profitable, because money goes out before it comes in. Common causes are:

* Buying a lot of stock at once.
* Selling on credit to customers who pay late.
* Big costs arriving at the same time, such as a festival season restock and a rent payment.

To protect cash, buy stock in amounts you can sell quickly, collect payment before or on delivery where you can, and keep a small reserve for emergencies.

## A small example

Sumaila sells phone accessories in Damongo. In December he sold 3,000 cedis of goods. He was happy, until January, when he could not buy new stock.

He worked through his numbers. His stock had cost him 2,400 cedis, so his profit was only 600 cedis. On top of that, he had let two shop owners take goods worth 500 cedis on credit, and they had not paid yet. And he had spent part of his cash on a big order of chargers that were still in a box.

So his profit was 600 cedis, but his cash was almost nothing. Sumaila now limits credit to customers he knows well, with a clear payment date, buys stock in smaller amounts more often, and keeps a reserve in a separate wallet. His sales are similar, but his business no longer runs dry.`,
      practice_task_md: `**Goal:** Calculate sales, profit and margin for a short period.

**Steps:**
1. Use your records from the last lesson, or make up a realistic week for a small product.
2. Add up total sales for the week.
3. Add up the cost of the items you sold, plus other costs like transport and data.
4. Subtract costs from sales to get profit.
5. For one product, calculate the margin: profit on one item divided by its price.
6. Write one sentence about your cash: is any money owed to you, or tied up in unsold stock?

**Done looks like:** A short summary showing sales, costs, profit, one product margin and a note on cash.`,
      quiz: {
        questions: [
          {
            prompt: "What is profit according to this lesson?",
            options: [
              "All the money customers paid you",
              "What is left after you subtract all your costs from sales",
              "The money in your wallet right now",
              "The value of your unsold stock",
            ],
            answer_index: 1,
            explanation: "Profit is sales minus all costs.",
          },
          {
            prompt: "An item sells for 20 cedis and cost you 15 cedis. What is your margin?",
            options: ["5 percent", "75 percent", "25 percent", "15 percent"],
            answer_index: 2,
            explanation: "Profit is 5 cedis, which is a quarter of the 20 cedi price, or 25 percent.",
          },
          {
            prompt: "Which of these can cause a profitable business to run out of cash?",
            options: [
              "Selling on credit to customers who pay late",
              "Collecting payment before delivery",
              "Keeping an emergency reserve",
              "Buying stock in small amounts",
            ],
            answer_index: 0,
            explanation: "Money owed by customers is profit on paper but not cash you can use.",
          },
          {
            prompt: "Why could Sumaila not buy new stock in January?",
            options: [
              "His December sales were very low",
              "His supplier refused to sell to him",
              "He had made a loss on every item",
              "His profit was modest, customers owed him money and cash was tied up in unsold chargers",
            ],
            answer_index: 3,
            explanation: "Profit of 600 cedis, 500 cedis owed on credit and cash spent on stock left him with almost no cash.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "simple-bookkeeping": {
      explanation_md: `Bookkeeping simply means writing down the money that comes in and goes out of your business. It sounds dull, but it is the habit that makes everything else possible: pricing, knowing your profit, applying for support, dealing with tax, and showing an employer that you can be trusted with money. Shop and sales adverts in Ghana regularly ask for record keeping and customer records.

## The basic record

You need just one list, kept every day. Each line records one transaction:

* **Date**
* **What happened**, such as "Sold 2 tubs shea butter to Hawa, Kumasi" or "Bought 10 tubs".
* **Money in** (sales)
* **Money out** (expenses)
* **How paid**, such as MoMo, cash or bank, and the transaction ID for mobile money

At the end of each week, add up money in and money out. The difference shows how much your cash changed.

## Notebook or spreadsheet?

Both work. A notebook is cheap and needs no battery. A free spreadsheet app like Google Sheets on your phone adds up columns for you, can be backed up to your Google account, and is easy to share with a mentor or a programme officer. The **SUM** function totals a column for you; for example, typing \`=SUM(C2:C50)\` adds every number from row 2 to row 50 in column C.

Whatever you choose, use the same format every day.

## Good habits

* **Write it the same day.** Memory fails by the end of the week.
* **Record small things too.** Transport, airtime and data add up.
* **Keep proof.** Screenshot or save mobile money confirmation messages and keep receipts in one envelope or folder.
* **Record what you take for yourself.** If you pay yourself from the business, write it down as money out.
* **Back up.** If your records are on a phone, make sure they are saved online or copied somewhere safe.

## Why it pays off

Clean records answer important questions. Which product sells best? Which month is slow? Are costs rising? They also help with formal steps later. The Ghana Revenue Authority's simplified scheme for small traders asks for sales information, and support programmes and lenders usually want to see records before they help.

## A small example

Abdul-Rahman sells second hand clothes from Tamale through WhatsApp. He started a Google Sheet with the five columns above. Every evening he spends five minutes copying in the day's sales from his mobile money messages and his expenses from his notes.

After one month, the totals showed that children's clothes sold out every week while men's shirts sat for weeks. He changed his next order to more children's clothes. When a youth enterprise programme asked applicants for three months of sales records, he had them ready while many others did not.

Five minutes a day gave Abdul-Rahman better decisions and an opportunity he would otherwise have missed.`,
      practice_task_md: `**Goal:** Set up a working sales and expense record.

**Steps:**
1. Open Google Sheets (free) or a fresh notebook page.
2. Create five columns: Date, Description, Money in, Money out, How paid (with transaction ID).
3. Enter at least ten real or realistic transactions from a week of trading, including small costs like transport and data.
4. At the bottom, total Money in and Money out. In Sheets use the SUM function.
5. Write one sentence about what the totals tell you.

**Done looks like:** A tidy record with ten or more entries, weekly totals and one insight. Take a screenshot to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What does bookkeeping mean in this lesson?",
            options: [
              "Writing a business plan for a bank",
              "Writing down the money that comes in and goes out of your business",
              "Reading books about business",
              "Paying an accountant every month",
            ],
            answer_index: 1,
            explanation: "The lesson defines bookkeeping as recording money in and out.",
          },
          {
            prompt: "Which of these is one of the five columns in the basic record?",
            options: [
              "Customer's favourite colour",
              "Number of likes on the post",
              "How paid, with the transaction ID for mobile money",
              "Weather that day",
            ],
            answer_index: 2,
            explanation: "The record includes how the money was paid and the mobile money transaction ID.",
          },
          {
            prompt: "Why does the lesson say you should write records the same day?",
            options: [
              "Because memory fails by the end of the week",
              "Because spreadsheets delete old entries",
              "Because GRA checks records every evening",
              "Because customers ask to see them",
            ],
            answer_index: 0,
            explanation: "Writing it the same day avoids forgetting transactions.",
          },
          {
            prompt: "What did Abdul-Rahman's records show him after one month?",
            options: [
              "That WhatsApp selling does not work",
              "That he should stop selling clothes",
              "That his prices were too low on everything",
              "That children's clothes sold out weekly while men's shirts sat for weeks",
            ],
            answer_index: 3,
            explanation: "His totals showed which products sold fast, so he changed his next order.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "stock-control": {
      explanation_md: `Few things lose a customer faster than taking their money and then saying the item is finished. On the other side, stock that sits unsold for months is cash you cannot use. Stock control, also called inventory management, keeps you in the middle: enough of what sells, not too much of what does not. It is one of the most common requirements in Ghanaian shop and sales adverts, often alongside cash handling and stock reconciliation.

## The stock record

A stock record tracks each product with a few numbers:

* **Opening stock**: how many you had at the start.
* **Stock in**: how many you received or made.
* **Stock out**: how many you sold, gave away, or lost to damage.
* **Closing stock**: what should be left. Opening stock plus stock in, minus stock out.

You can keep this in a notebook or a simple spreadsheet with one row per product.

## Count and compare

Your record tells you what should be there. A physical count tells you what is actually there. Comparing the two is called **reconciliation**. If the numbers do not match, find out why: a sale you forgot to record, a damaged item, a mistake, or theft. Count often enough to catch problems early. Many small sellers count their fast moving items every week.

## Know when to reorder

For each product, decide a **reorder level**: the number at which you order more. Base it on how fast the item sells and how long your supplier takes. If you sell about ten tubs a week and new stock takes a week to arrive, reorder when you have about ten or a few more left, so you never run out while waiting.

## Watch slow movers

Some items sell slowly. Do not keep reordering them. Consider a small discount, bundling them with popular items, or simply not restocking. Perishable goods like food need extra care: sell the oldest stock first and watch expiry dates.

## Online selling needs honest stock

When you sell online, your catalogue and posts are a promise. If something is out of stock, mark it clearly or remove it. Tell customers honestly when new stock will arrive rather than taking payment and hoping.

## A small example

Mariama, who sells shea butter, keeps a simple sheet with four columns for each size: opening, in, out and closing. On Monday she has 12 small tubs. Her aunt delivers 20 on Wednesday, and she sells 25 during the week. Her record says she should have 7 left.

On Saturday she counts and finds only 6. She checks her chats and finds a tub she gave her cousin and forgot to record. She notes it as stock out.

Since she sells about 25 small tubs a week and her aunt needs four days to make more, she sets her reorder level at 15. Customers no longer hear "finished" from her, and she does not have tubs sitting in a corner.`,
      practice_task_md: `**Goal:** Build a stock record for three products and practise reconciliation.

**Steps:**
1. In Google Sheets or a notebook, make columns: Product, Opening, In, Out, Closing (should be), Counted, Difference.
2. Add three products you sell or could sell, with realistic numbers for one week.
3. Calculate closing stock for each: Opening plus In minus Out.
4. Count real items if you have them, or invent a count, and fill in the difference.
5. For each product, write a reorder level and one sentence explaining it.

**Done looks like:** A small stock sheet for three products with closing figures, a reconciliation column and reorder levels.`,
      quiz: {
        questions: [
          {
            prompt: "How do you calculate closing stock in this lesson?",
            options: [
              "Stock in minus opening stock",
              "Opening stock plus stock in, minus stock out",
              "Stock out multiplied by price",
              "Opening stock minus stock in",
            ],
            answer_index: 1,
            explanation: "Closing stock is opening plus stock in, minus stock out.",
          },
          {
            prompt: "What is reconciliation?",
            options: [
              "Making peace with an angry customer",
              "Ordering new stock from a supplier",
              "Comparing what your record says with what a physical count shows",
              "Giving discounts on slow items",
            ],
            answer_index: 2,
            explanation: "Reconciliation compares recorded stock with actual stock.",
          },
          {
            prompt: "What should a reorder level be based on?",
            options: [
              "How fast the item sells and how long your supplier takes",
              "The number of followers you have",
              "Your competitor's stock",
              "A fixed number used for every product",
            ],
            answer_index: 0,
            explanation: "The lesson bases the reorder level on sales speed and supplier delivery time.",
          },
          {
            prompt: "When Mariama's count showed one tub fewer than her record, what was the cause?",
            options: [
              "Theft by a customer",
              "Her aunt delivered fewer tubs",
              "A tub broke in transit",
              "She gave a tub to her cousin and forgot to record it",
            ],
            answer_index: 3,
            explanation: "She checked and found an unrecorded tub given to her cousin.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "selling-online": {
      explanation_md: `In Ghana a great deal of buying now starts in a chat. A customer sees a Status update or a TikTok video, sends a message asking "How much?", agrees a price, pays with mobile money and waits for delivery. Businesses that do this well can sell far beyond their town. Employers have noticed too: Ghanaian adverts for shop staff, sales officers and online sales roles regularly ask for experience selling through WhatsApp, Instagram and TikTok, and some ask for live selling.

## Your phone as a shop window

Think of selling online as running a shop with four parts:

* **The counter:** where customers ask questions and order. For most small sellers this is WhatsApp.
* **The window display:** where people discover you. This is your Status, Instagram, TikTok or Facebook posts and videos.
* **The goods on the shelf:** your product photos and descriptions, which must be clear enough that people trust what they will receive.
* **The shop sign and address:** a catalogue, an online store or a business listing that people can find and share.

## What this section covers

* **Selling on WhatsApp Business.** Setting up a profile, a catalogue, quick replies and labels so every chat is handled well.
* **Instagram, TikTok and live selling.** Showing products in short videos, replying to messages, and selling during live streams.
* **Product photos and descriptions.** Taking clear photos with a phone and writing descriptions that answer questions.
* **A simple online store.** Choosing between a chat catalogue, a marketplace, a free store builder or a business listing.

## Choose a few channels

You do not need to be everywhere. Go where your customers already are, and do two or three channels well rather than five badly. A seller whose buyers are mostly church members and neighbours may need only WhatsApp. A seller targeting young people in cities may need TikTok or Instagram as the window and WhatsApp as the counter.

## Safety and honesty from the start

Online selling only works if people trust you. Use real photos of your own products, state prices clearly, answer honestly about sizes and delivery times, and never ask customers for PINs or codes. Trust takes months to build and one bad deal to lose.

## A small example

Issahaku's baskets from Bolgatanga sold slowly when he only told friends. He set up WhatsApp Business with a catalogue, began posting short videos on TikTok showing the weaving process, and added his WhatsApp link to his TikTok profile.

His TikTok videos became the window: people in Accra discovered the baskets there. WhatsApp became the counter: they messaged to ask sizes and prices, and he confirmed orders and payment there. He did not try Facebook, Instagram and a website all at once. Two channels, done well, were enough to bring many more people asking about his baskets.

The lessons in this section show you how to set up each part of your online shop step by step.`,
      practice_task_md: `**Goal:** Plan your online shop.

**Steps:**
1. Write down where your main customers spend time online (use your customer description from earlier).
2. Choose your counter (where people will order) and one or two windows (where people will discover you).
3. For each channel, write one sentence on why it suits your customers.
4. List the three products you would show first, and note whether you already have good photos of them.

**Done looks like:** A short plan naming your counter and windows, with reasons, and a first list of products to show.`,
      quiz: {
        questions: [
          {
            prompt: "In this lesson's shop comparison, what is \"the counter\" for most small sellers?",
            options: [
              "A physical table in the market",
              "TikTok videos",
              "WhatsApp, where customers ask questions and order",
              "A printed flyer",
            ],
            answer_index: 2,
            explanation: "The counter is where customers ask and order, which for most small sellers is WhatsApp.",
          },
          {
            prompt: "What does the lesson advise about the number of channels?",
            options: [
              "Go where your customers are and do two or three channels well",
              "Open accounts on every app at once",
              "Use only a website",
              "Change channels every week",
            ],
            answer_index: 0,
            explanation: "The lesson recommends a few channels done well, chosen by where customers are.",
          },
          {
            prompt: "In Issahaku's example, what role did TikTok play?",
            options: [
              "It was where he took payments",
              "It replaced WhatsApp completely",
              "It was where he kept his stock records",
              "It was the window where people discovered his baskets",
            ],
            answer_index: 3,
            explanation: "TikTok videos helped people find him; WhatsApp was where orders were confirmed.",
          },
          {
            prompt: "Which practice does the lesson say builds trust when selling online?",
            options: [
              "Using photos copied from bigger sellers",
              "Using real photos of your own products and stating prices clearly",
              "Hiding prices until the customer pays",
              "Promising very fast delivery to everyone",
            ],
            answer_index: 1,
            explanation: "Real photos, clear prices and honest answers build trust.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "whatsapp-business": {
      explanation_md: `For many Ghanaian businesses, WhatsApp is the shop counter. Customers ask questions, place orders and send payment confirmations there. Sellers who manage WhatsApp well reply faster, lose fewer orders and look more professional. Ghanaian adverts for shop and sales staff mention WhatsApp and WhatsApp Business by name, so this is a job skill as well as a business skill.

## WhatsApp Business is a separate free app

WhatsApp Business is a free app made for small businesses. It works like ordinary WhatsApp, but adds business tools. Many sellers use it on a separate number from their personal WhatsApp, so business chats do not get lost among family messages. Download it from your phone's official app store.

## Key features to set up

* **Business profile:** your business name, a short description, your town or address, opening hours and a clear profile photo or logo. This is the first thing customers check.
* **Catalogue:** a list of your products with photos, prices and short descriptions. Customers can browse it without asking you to resend pictures, and you can share a single item or the whole catalogue in a chat.
* **Quick replies:** saved answers to common questions, such as delivery fees, payment details or how to order. You type a short shortcut and the full message appears.
* **Labels:** coloured tags for chats, such as "New order", "Paid", "Delivered" and "Follow up". They help you see at a glance where each customer is.
* **Greeting and away messages:** automatic replies that welcome new customers or let them know when you will reply.

Features change from time to time, so check the app's own settings and the official WhatsApp help pages if something looks different.

## Status as your daily display

WhatsApp Status shows photos and short videos to your contacts for a day. Post regularly: new stock, a customer receiving their order (with permission), a behind the scenes video, a reminder of prices. Keep it varied and useful, not just "buy, buy, buy".

## Good chat habits

* Reply as quickly as you reasonably can, and use your away message when you cannot.
* Confirm every order in writing: item, quantity, price, delivery fee, total and delivery date.
* Keep payment instructions in a quick reply so they are always correct.
* Never ask customers to send a PIN or code, and never send yours.

## A small example

Hawa sells smocks. She set up WhatsApp Business with a profile, a catalogue showing each smock with sizes and prices, and three quick replies: "/delivery" for delivery fees by region, "/pay" for her business MoMo name and number, and "/size" for her size chart.

When a customer in Takoradi asks about a smock, Hawa shares the catalogue item, sends "/size", confirms the order with a full summary, and labels the chat "New order". When payment arrives she checks her own wallet, then changes the label to "Paid". At the end of the day she can see every order's stage at a glance. She handles twice as many chats as before, with fewer mistakes.`,
      practice_task_md: `**Goal:** Set up a WhatsApp Business profile ready for customers.

**Steps:**
1. Install WhatsApp Business (free) or open it if you already have it. If you cannot use a second number, plan the setup on paper.
2. Complete the profile: name, description, location, hours and photo.
3. Add at least three products to the catalogue with a photo, price and short description.
4. Create three quick replies: delivery fees, how to pay, and how to order.
5. Create four labels: New order, Paid, Delivered, Follow up.

**Done looks like:** Screenshots of your profile, catalogue and quick replies (with any personal number blurred) that you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why do many sellers use WhatsApp Business on a separate number?",
            options: [
              "Because ordinary WhatsApp does not allow photos",
              "So business chats do not get lost among personal messages",
              "Because WhatsApp Business only works on a new SIM",
              "Because customers cannot message personal numbers",
            ],
            answer_index: 1,
            explanation: "A separate number keeps business chats apart from family and friends.",
          },
          {
            prompt: "What is a quick reply in WhatsApp Business?",
            options: [
              "A saved answer you send by typing a short shortcut",
              "A reply that customers must send within one minute",
              "A paid feature for big companies",
              "An automatic payment request",
            ],
            answer_index: 0,
            explanation: "Quick replies are saved messages you insert using a shortcut.",
          },
          {
            prompt: "What are labels used for?",
            options: [
              "Printing stickers for your products",
              "Blocking difficult customers",
              "Tagging chats to show where each customer is, such as New order or Paid",
              "Setting your prices",
            ],
            answer_index: 2,
            explanation: "Labels help you see each order's stage at a glance.",
          },
          {
            prompt: "What should an order confirmation include, according to the lesson?",
            options: [
              "Only the item name",
              "The customer's PIN for payment",
              "A list of your other customers",
              "Item, quantity, price, delivery fee, total and delivery date",
            ],
            answer_index: 3,
            explanation: "Confirming every detail in writing prevents misunderstandings.",
          },
          {
            prompt: "What did Hawa do before changing a chat's label to Paid?",
            options: [
              "She checked her own wallet to confirm the payment arrived",
              "She trusted the customer's screenshot",
              "She waited for the customer to call",
              "She asked the customer for their PIN",
            ],
            answer_index: 0,
            explanation: "She confirmed payment in her own wallet before marking it Paid.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "social-and-live-selling": {
      explanation_md: `Instagram, TikTok and Facebook are where many customers, especially younger ones in cities, discover products. Ghanaian companies now hire people specifically to sell through these apps: adverts ask for selling in direct messages, creating short videos and hosting live sales sessions. Even if you only run your own small business, these skills bring buyers who would never pass your stall.

## Show the product in use

On social apps, people scroll quickly. Short videos that show a product being used work better than a plain list of prices. Ideas that suit small sellers:

* **How it is made:** shea butter being kneaded, a smock being sewn, baskets being woven.
* **Before and after:** dry hands, then soft hands after shea butter.
* **Unboxing or packing an order:** shows that you deliver.
* **Answering a common question** in a short clip, such as how to choose a smock size.

Hold the phone upright, film in good light, speak clearly or add text on screen, and get to the point in the first few seconds.

## Reply and move to the counter

Comments and direct messages are where interest turns into sales. Reply politely and quickly. When someone is ready to buy, move them to WhatsApp or your usual order channel, where you can confirm the order and payment properly. Put your WhatsApp link or number in your profile so people can find it.

Do not post prices that differ from your catalogue, and do not argue in public comments. Calmly offer to help in private.

## Live selling

In a live stream, you show products in real time while viewers ask questions in the comments. Live selling works because people can see the product, hear you explain it and ask questions instantly, a bit like a market stall online.

To run a simple live session:

* **Plan:** choose a few products, prepare prices and have stock ready.
* **Announce:** tell followers the day and time on Status and your page.
* **During the live:** greet viewers by name, show each product closely, repeat prices, and answer questions.
* **After:** follow up every buyer in chat to confirm orders and payment.

Each app has its own rules for who can go live, such as minimum age or follower numbers, so check the current rules in the app.

## Paid ads can wait

Social apps let you pay to show posts to more people. Learn to sell with free posts first. When free posts are already bringing orders, a small, carefully tracked ad budget can help. The Digital Marketer roadmap covers ads in depth.

## A small example

Mariama started posting short TikTok videos of her aunt's group making shea butter, with captions in English and Dagbani. One video of the kneading process was shared widely. She added her WhatsApp number to her profile and answered comments with "Please message me on WhatsApp to order."

She then held a 20 minute live session each Friday evening, showing each tub size and answering questions. After each live she followed up every person who said "I want one". Most of her new customers now find her on TikTok and buy on WhatsApp.`,
      practice_task_md: `**Goal:** Plan and film one short product video and plan a live session.

**Steps:**
1. Choose one product and one video idea from the lesson (how it is made, before and after, packing an order, or answering a question).
2. Film a vertical video of 15 to 30 seconds in daylight. Add a short caption with the price and how to order.
3. Save it to your phone. You do not have to post it if you are not ready.
4. Write a simple live session plan: date, time, three products, prices, and how you will follow up buyers.

**Done looks like:** One finished short video and a written live session plan you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest videos that show a product in use?",
            options: [
              "Because apps ban photos of products",
              "Because people scroll quickly and such videos work better than a plain price list",
              "Because videos are always free to boost",
              "Because customers prefer long videos",
            ],
            answer_index: 1,
            explanation: "Short videos showing the product in use catch attention while people scroll.",
          },
          {
            prompt: "When someone in your comments is ready to buy, what does the lesson advise?",
            options: [
              "Ask them to post their payment details in the comments",
              "Ignore them until they message again",
              "Move them to WhatsApp or your usual order channel to confirm order and payment",
              "Send them a different, lower price in public",
            ],
            answer_index: 2,
            explanation: "Move serious buyers to your counter, where orders and payment can be confirmed properly.",
          },
          {
            prompt: "Which of these is a step in running a simple live session?",
            options: [
              "Announce the day and time to followers in advance",
              "Go live without stock and take orders anyway",
              "Avoid repeating prices",
              "Never follow up after the live",
            ],
            answer_index: 0,
            explanation: "Announcing in advance helps followers join; the lesson lists it as a step.",
          },
          {
            prompt: "What does the lesson say about paid ads?",
            options: [
              "Start every business with a large ad budget",
              "Ads are banned for small sellers in Ghana",
              "Ads replace the need for good photos",
              "Learn to sell with free posts first, then try a small tracked budget",
            ],
            answer_index: 3,
            explanation: "The lesson advises getting free posts working before spending on ads.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "product-photos": {
      explanation_md: `Online, customers cannot touch your product. Your photos and descriptions do the job your hands would do at a market stall. Clear photos make people trust you, reduce questions and cut down on complaints. Shop and sales adverts in Ghana increasingly ask for photo and video skills, and online merchants list product photography and descriptions among their core tasks.

## Taking good photos with a phone

You do not need an expensive camera. You need light, a clean background and a steady hand.

* **Use daylight.** Shoot near a window or outside in shade. Avoid harsh midday sun, which makes strong shadows, and avoid dark rooms.
* **Use a plain background.** A white wall, a clean cloth, a sheet of paper or a wooden table. Remove clutter.
* **Fill the frame.** Get close so the product is the main thing in the picture.
* **Take several angles.** Front, back, side and a close up of details like stitching, texture or the label.
* **Show size.** Place the item next to something familiar, such as a hand, a phone or a coin, or show it being worn or used.
* **Clean the lens** on your phone with a soft cloth before shooting.
* **Keep it true.** Light editing to fix brightness is fine. Do not use filters that change the colour, because customers will complain when the real item looks different.

Large photo files use more of your customers' data. Most phones and apps shrink photos when sending, which is usually fine for selling.

## Writing descriptions that answer questions

A good description saves you answering the same questions again and again. Include:

* **Name** of the product.
* **Price** in cedis.
* **Size, weight or quantity**, such as 250 grams, medium, or 40 cm across.
* **What it is made of** and anything special about it.
* **Colours or options** available.
* **How to order and pay**, and delivery information.

Keep sentences short. Be honest, and do not make health or medical claims you cannot prove. Food and cosmetics in particular must not promise to cure illnesses.

## A small example

Fuseini's first photo of his dawadawa was taken at night under a yellow bulb, on a table full of other items. It looked dark and nobody asked about it.

He took new photos in the morning near the doorway, with the dawadawa in a clean bowl on a white cloth, and a close up showing its texture. He added a photo of a sealed pack next to his hand for size.

His new description read: "Dawadawa from Savelugu. 250 g sealed pack. 25 cedis. Clean, sun dried and hand sorted. Order on WhatsApp and pay by MoMo. Delivery to Kumasi and Accra by bus parcel, fee depends on town." Customers stopped asking "How much?" and "How big?" and started asking "When can I get it?"`,
      practice_task_md: `**Goal:** Produce a product listing with good photos and a full description.

**Steps:**
1. Choose one product.
2. Take at least four photos in daylight on a plain background: front, another angle, a close up of detail, and one that shows size.
3. Choose the best two or three and check that the colours look true.
4. Write a description with name, price in cedis, size, material, options, and how to order, pay and get delivery.
5. Ask someone to look at your photos and description and tell you one question they still have. Add the answer.

**Done looks like:** A complete product listing (photos plus description) ready for your catalogue or a post.`,
      quiz: {
        questions: [
          {
            prompt: "What kind of light does the lesson recommend for product photos?",
            options: [
              "A yellow bulb at night",
              "Harsh midday sun",
              "Daylight near a window or outside in shade",
              "A camera flash in a dark room",
            ],
            answer_index: 2,
            explanation: "Soft daylight gives clear photos without harsh shadows.",
          },
          {
            prompt: "Why does the lesson warn against filters that change colour?",
            options: [
              "Customers will complain when the real item looks different",
              "Filters are illegal on business pages",
              "Filters use too much battery",
              "Filters make photos too small",
            ],
            answer_index: 0,
            explanation: "Changed colours mislead customers and lead to complaints.",
          },
          {
            prompt: "Which of these does the lesson say a good description should include?",
            options: [
              "Your personal phone PIN",
              "Size, weight or quantity",
              "A list of competitor prices",
              "Claims that the product cures illness",
            ],
            answer_index: 1,
            explanation: "Size, weight or quantity is one of the description items listed.",
          },
          {
            prompt: "How can you show the size of a product in a photo?",
            options: [
              "Write \"big\" on the photo",
              "Use a zoom filter",
              "Take the photo from far away",
              "Place it next to something familiar, such as a hand or a phone",
            ],
            answer_index: 3,
            explanation: "A familiar object or showing it in use helps customers judge size.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "online-store": {
      explanation_md: `As your business grows, sharing photos one chat at a time becomes slow. An online store, in its simplest form, is one place where customers can see all your products, prices and how to buy. Ghanaian employers hiring online sales staff mention running a company website, uploading products and prices, and managing stores on online marketplaces, so understanding the options is useful for jobs as well as for your own business.

## Four simple options

**1. A chat catalogue.** The WhatsApp Business catalogue is free, lives inside the app your customers already use, and can be shared as a link. For many small sellers, this is all the store they need at first.

**2. An online marketplace.** Marketplaces such as Jiji or Jumia (named only as examples) let many sellers list products in one place where buyers already search. Some are free to list on and some charge fees or commissions, and each has its own seller rules. Read the seller terms carefully before you sign up.

**3. A free store or website builder.** Some services let you build a simple store page with product photos, prices and an order button, often with a free starter plan. This looks professional and is easy to share, but free plans usually have limits, and taking card payments directly on the page often needs a payment provider that asks for business registration documents.

**4. A Google Business Profile.** This free listing shows your business on Google Search and Maps with your phone number, location, hours, photos and reviews. It helps people nearby find you, even if you sell mostly on WhatsApp.

## How to choose

Ask three questions:

* **Where do my customers already look?** If they live on WhatsApp, start there.
* **What can I keep up to date?** An out of date store with wrong prices or sold out items hurts trust. Choose something you can maintain on your phone.
* **What does it cost?** Count listing fees, commissions, data and time.

Start with the simplest option that works, and add another only when you have a clear reason.

## Keep it consistent

Whatever you choose, use the same business name, photos, prices and contact details everywhere. Customers who see you on TikTok, WhatsApp and Google should recognise the same business.

## A small example

Abdul-Rahman sells second hand clothes from Tamale. He started with a WhatsApp catalogue, which worked well for regular customers. As more strangers asked about him, he created a free Google Business Profile with his shop location near the market, his hours and photos, so people could find him and see that he was real.

He considered a marketplace too, but after reading the seller terms and working out the fees on his small margins, he decided to wait. He shares his catalogue link in his TikTok profile and on his Google profile. Two simple, well kept tools serve him better than four neglected ones.`,
      practice_task_md: `**Goal:** Choose and set up, or fully plan, one simple online store.

**Steps:**
1. Write down which of the four options suits you best, using the three questions in the lesson.
2. If you chose the WhatsApp catalogue, add at least five products and copy the catalogue link.
3. If you chose a Google Business Profile, a marketplace or a store builder, read its help or seller pages and write the steps you would follow, plus any fees or documents it asks for.
4. Write the business name, contact details and price list you will use everywhere so they stay consistent.

**Done looks like:** A working catalogue link or a clear written setup plan, plus a one page list of consistent business details.`,
      quiz: {
        questions: [
          {
            prompt: "What is an online store in its simplest form, according to the lesson?",
            options: [
              "A website built by a professional developer",
              "One place where customers can see your products, prices and how to buy",
              "A shop in a shopping mall",
              "A paid advert on social media",
            ],
            answer_index: 1,
            explanation: "The lesson describes a simple online store as one place showing products, prices and how to buy.",
          },
          {
            prompt: "What does a Google Business Profile help with?",
            options: [
              "Taking mobile money payments automatically",
              "Writing your product descriptions",
              "Showing your business on Google Search and Maps so nearby people can find you",
              "Delivering parcels",
            ],
            answer_index: 2,
            explanation: "It is a free listing on Search and Maps with your contact details, hours and photos.",
          },
          {
            prompt: "What does the lesson say you should do before signing up to an online marketplace?",
            options: [
              "Read the seller terms carefully, including any fees or commissions",
              "Pay a large deposit to reserve a space",
              "Copy another seller's listings",
              "Close your WhatsApp catalogue",
            ],
            answer_index: 0,
            explanation: "Marketplaces have their own rules and costs, so read the terms first.",
          },
          {
            prompt: "Why did Abdul-Rahman decide to wait before joining a marketplace?",
            options: [
              "Marketplaces do not allow clothes",
              "His customers asked him not to",
              "He did not have a phone",
              "After reading the terms, the fees did not suit his small margins",
            ],
            answer_index: 3,
            explanation: "He worked out the fees against his margins and decided to wait.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "payments-and-delivery": {
      explanation_md: `An online sale is only finished when the money is safely in your wallet and the product is safely in your customer's hands. These two moments are where trust is built or broken. A customer who pays and receives the right item on time will come back and tell friends. A seller who loses money to a scam, or a customer whose parcel goes missing, may never trust online buying again. Online merchants and ecommerce staff in Ghana spend much of their time on exactly these tasks: checking payments, processing orders and coordinating deliveries.

## Mobile money is the main way to get paid

Most small online sales in Ghana are paid with mobile money. It is fast and works on any phone, even without internet. But it also attracts fraudsters, who target busy sellers with fake messages and tricks. Learning to handle payments carefully protects your income.

## Delivery is part of the product

For the customer, delivery is part of what they are buying. A beautiful smock that arrives late, damaged or not at all is a bad product, whatever its quality. Clear delivery options, honest timing, good packing and a way to track the order all make your business look professional.

## What this section covers

* **Taking mobile money payments.** Setting up a business wallet, confirming payments properly and deciding when customers pay.
* **Avoiding payment scams.** Recognising the common tricks and building habits that make you hard to cheat.
* **Orders, packing and delivery.** Keeping an order list, packing safely and choosing delivery methods.

## One simple order flow

A clear routine stops mistakes. Here is a flow many small sellers use:

1. **Confirm the order in writing:** item, quantity, price, delivery fee, total and delivery date.
2. **Receive payment** by mobile money to your business wallet.
3. **Check your own wallet** to make sure the money really arrived. Never rely only on a screenshot or a message the customer forwards.
4. **Record the sale** with the transaction ID.
5. **Pack and send** the item, and share the delivery details with the customer.
6. **Follow up** to make sure it arrived safely.

## A small example

Sumaila sells phone accessories from Damongo to buyers across the north. In his first month, he lost money twice: once to a fake payment message, and once when a power bank broke in a parcel because he wrapped it only in a plastic bag.

He set up the six step flow above. Now he always checks his own wallet before sending anything, wraps fragile items in cardboard and paper, sends customers the bus parcel waybill number and calls the next day to confirm arrival. He has not lost money since, and customers often mention his careful packing when they recommend him.

The next three lessons go through each part of this flow in detail.`,
      practice_task_md: `**Goal:** Write your own order flow.

**Steps:**
1. Copy the six step flow from the lesson into your notes.
2. For each step, write how you will do it for your own business. For example, which wallet you will use and how you will deliver.
3. Write the exact order confirmation message you would send a customer, with spaces for item, quantity, price, delivery fee, total and date.
4. Save the confirmation message as a quick reply if you use WhatsApp Business.

**Done looks like:** A personal six step order flow and a ready to use order confirmation template.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, when is an online sale finished?",
            options: [
              "When the customer says they will pay",
              "When the money is safely in your wallet and the product is safely with the customer",
              "When you post the product online",
              "When the customer likes your post",
            ],
            answer_index: 1,
            explanation: "The sale is finished when both payment and delivery are safely complete.",
          },
          {
            prompt: "In the order flow, what should you do after receiving payment?",
            options: [
              "Send the item immediately based on the customer's screenshot",
              "Ask the customer for their PIN to confirm",
              "Check your own wallet to make sure the money really arrived",
              "Delete the chat",
            ],
            answer_index: 2,
            explanation: "Always confirm payment in your own wallet, not from a forwarded message or screenshot.",
          },
          {
            prompt: "Why does the lesson say delivery is part of the product?",
            options: [
              "A good item that arrives late, damaged or not at all is a bad product for the customer",
              "Delivery companies set your prices",
              "Customers only care about delivery speed",
              "Delivery is always free in Ghana",
            ],
            answer_index: 0,
            explanation: "From the customer's view, a poor delivery spoils even a good product.",
          },
          {
            prompt: "What changes did Sumaila make after losing money twice?",
            options: [
              "He stopped selling outside Damongo",
              "He only accepted cash",
              "He raised all his prices",
              "He checked his own wallet before sending, packed fragile items carefully and followed up deliveries",
            ],
            answer_index: 3,
            explanation: "He adopted the order flow: wallet checks, better packing, waybill numbers and follow up calls.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "mobile-money-payments": {
      explanation_md: `Mobile money is how most Ghanaian customers pay small online sellers. Handling it well means more than sharing a number. It means getting paid into the right place, confirming every payment properly, keeping a record and agreeing clearly when the customer pays. Shop and sales adverts often mention cash handling and electronic payments, and online merchants list payment processing among their core tasks.

## Use a business wallet

Keep your business payments separate from your personal ones. There are two common ways:

* **A second personal wallet used only for the business.** Simple to set up, though the name customers see is your own name.
* **A merchant or business account** from your mobile money provider. These let customers pay a business name or a merchant number, which can look more professional. Providers set their own requirements and charges, which may include business registration, so ask your provider directly for current details.

Whichever you use, give customers the exact wallet name they should see when they pay. If the name on their screen does not match, they will know something is wrong, which protects them from scammers pretending to be you.

## Confirm every payment yourself

When a customer says "I have paid", do not send anything yet. Check your own wallet: look at the official confirmation message from your provider and, if you are unsure, check your balance using your provider's official USSD code or app. The confirmation shows the amount, the sender and a **transaction ID**.

Screenshots and forwarded messages can be faked. Only your own wallet tells the truth.

## Record the transaction ID

Write the transaction ID in your sales record next to the order. If there is ever a dispute, or you need to ask your provider about a payment, this number is what they will ask for.

## When should the customer pay?

Decide your rule and state it clearly before the customer orders:

* **Full payment before delivery.** Safest for you, but some customers worry about paying first. Build trust with real photos, a clear business profile and quick replies.
* **Part payment before, the rest on delivery.** A middle path, common for bigger or custom orders.
* **Payment on delivery.** Customers like it, but you risk paying for delivery and getting nothing if the customer refuses or disappears. If you offer it, consider asking for the delivery fee in advance.

## Charges

Mobile money providers may charge fees for some transactions, and rules change. Include any charges you pay in your costs when you set prices, and check current charges with your provider rather than guessing.

## A small example

Amina sells sobolo by the crate to offices in Wa. She set up a second wallet just for the business. Her quick reply for payment says: "Please pay [total] to 024 000 0000. Name shown: Amina Sobolo Business. Send me the transaction ID after paying."

When a customer pays, she checks her own wallet for the provider's confirmation, writes the ID in her Google Sheet next to the order, then sends the crate. For new office clients ordering large amounts, she takes half before delivery and half on arrival. Her records now match her wallet every week.`,
      practice_task_md: `**Goal:** Set up a safe payment routine.

**Steps:**
1. Decide whether you will use a second wallet or ask your provider about a merchant account. Write down why.
2. Write a payment quick reply that includes the amount, the number (use a made up number like 024 000 0000 for practice), the exact wallet name the customer will see, and a request for the transaction ID.
3. Write your rule for when customers pay (before, part, or on delivery) in one or two sentences you could share with customers.
4. Add a Transaction ID column to your sales record if it does not have one.

**Done looks like:** A payment quick reply, a written payment rule and an updated sales record.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you tell customers the exact wallet name they will see when paying?",
            options: [
              "So they can follow you on social media",
              "So they know something is wrong if the name does not match, which protects them from scammers",
              "Because providers charge less for named wallets",
              "So they can share it in public groups",
            ],
            answer_index: 1,
            explanation: "A matching name reassures customers and helps them spot impostors.",
          },
          {
            prompt: "When a customer says \"I have paid\", what should you do first?",
            options: [
              "Send the item right away",
              "Ask them to send a screenshot and trust it",
              "Check your own wallet for the provider's official confirmation",
              "Ask for their PIN",
            ],
            answer_index: 2,
            explanation: "Screenshots can be faked; only your own wallet confirms payment.",
          },
          {
            prompt: "Why should you record the transaction ID?",
            options: [
              "Your provider will ask for it if there is a dispute or a question about a payment",
              "It is your customer's password",
              "It increases your wallet limit",
              "It is needed to post on TikTok",
            ],
            answer_index: 0,
            explanation: "The transaction ID identifies the payment if you need to raise a dispute.",
          },
          {
            prompt: "What risk does the lesson mention with payment on delivery?",
            options: [
              "Customers always pay twice",
              "It is not allowed in Ghana",
              "It makes customers trust you less",
              "You may pay for delivery and get nothing if the customer refuses or disappears",
            ],
            answer_index: 3,
            explanation: "If a customer refuses, you lose the delivery cost and time.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "payment-scams": {
      explanation_md: `Busy sellers are a favourite target for fraudsters, because they receive many payments and want to serve customers quickly. A single scam can wipe out a week's profit. The good news is that most scams follow a few patterns, and simple habits stop nearly all of them. Being careful with money is also something employers value in anyone who handles sales or payments.

## The golden rule

The Bank of Ghana has warned the public to protect mobile money PINs, passwords and one time codes, and it states that no legitimate bank, mobile money operator or payment provider will ask for them by phone, text, email or social media. So:

* **Never share your PIN or any code sent to your phone**, with anyone, for any reason. Not a "customer", not someone claiming to be from your provider, not even a friend.

## Common tricks

**Fake payment message.** You receive a text that looks like a payment alert, but it comes from an ordinary phone number, not your provider. The scammer then asks you to send the goods. Defence: always check your balance or the official confirmation in your own wallet.

**"I sent it by mistake, please send it back."** Someone claims to have sent money to you by error and begs you to return it. Often no money arrived, or the payment will be reversed later. Defence: check your balance yourself. Do not send money back on your own; ask the person to contact their provider's official customer service, which can handle genuine mistakes.

**Fake screenshot.** A customer sends a screenshot of a "successful" payment. Screenshots are easy to edit. Defence: only trust your own wallet.

**Caller pretending to be your provider.** Someone says your account will be blocked, or you have won a prize, and asks for your PIN or a code, or asks you to dial a number. Defence: hang up. Call your provider's official customer care number yourself.

**Overpayment.** A "buyer" pays more than the price and asks you to send back the difference, then the original payment disappears. Defence: refuse, and wait until any payment is confirmed in your own wallet before discussing refunds.

**Links that "confirm your order".** Messages with links that ask you to log in or enter details. Defence: do not click links from unknown senders.

## Habits that protect you

* Check your own wallet before releasing goods. Every time.
* Use a strong PIN that is not your birthday or phone number.
* Lock your phone, and do not let others use your mobile money menu.
* Slow down when someone rushes you. Pressure is a warning sign.
* If you are scammed, contact your provider's official customer service quickly and report to the police. Act fast, because quick reports give the best chance of help.

## A small example

Wumpini received a message: "You have received GHS 150.00 from Hawa. Your new balance is..." Minutes later a caller said, "I have paid, please send the bracelets now, I am in a hurry." The message had come from an ordinary mobile number, so Wumpini checked her balance using her provider's official code. Nothing had arrived. She told the caller politely that she would send the order once payment showed in her wallet. The caller hung up and never called back.`,
      practice_task_md: `**Goal:** Build your personal anti scam checklist.

**Steps:**
1. Write the six common tricks from the lesson in your notes, each with your one line defence.
2. Find and save your mobile money provider's official customer care number and the official way to check your balance.
3. Check that your mobile money PIN is not your birthday or phone number, and change it if it is.
4. Explain two of the tricks to a family member or friend who trades, in your own words.

**Done looks like:** A saved checklist with six tricks and defences, your provider's official contact saved in your phone, and one conversation with someone else about staying safe.`,
      quiz: {
        questions: [
          {
            prompt: "What has the Bank of Ghana said about PINs and codes?",
            options: [
              "Customers should share them only with their mobile money agent",
              "No legitimate bank, mobile money operator or payment provider will ask for them by phone, text, email or social media",
              "PINs should be changed every day",
              "Providers will call you to confirm your PIN once a year",
            ],
            answer_index: 1,
            explanation: "The Bank of Ghana warning says no legitimate provider asks for PINs, passwords or codes.",
          },
          {
            prompt: "Someone says they sent you money by mistake and asks you to send it back. What does the lesson advise?",
            options: [
              "Send it back immediately to be polite",
              "Send back half to be safe",
              "Check your balance yourself and ask them to contact their provider's official customer service",
              "Give them your PIN so they can reverse it",
            ],
            answer_index: 2,
            explanation: "Often no money arrived; let the provider handle genuine mistakes.",
          },
          {
            prompt: "Why should you not trust a payment screenshot?",
            options: [
              "Screenshots are easy to edit",
              "Screenshots cost data to open",
              "Providers ban screenshots",
              "Screenshots never show the amount",
            ],
            answer_index: 0,
            explanation: "Only your own wallet proves money arrived.",
          },
          {
            prompt: "What made Wumpini suspicious of the payment message?",
            options: [
              "It was written in capital letters",
              "It mentioned the wrong product",
              "It arrived at night",
              "It came from an ordinary mobile number, not her provider",
            ],
            answer_index: 3,
            explanation: "Real alerts come from the provider; she checked her balance and found nothing.",
          },
          {
            prompt: "According to the lesson, what is a warning sign during a sale?",
            options: [
              "The customer asks about delivery",
              "Someone rushes you and puts you under pressure",
              "The customer asks for a size chart",
              "The customer pays in full before delivery",
            ],
            answer_index: 1,
            explanation: "Pressure to hurry is a common scam tactic, so slow down.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "orders-and-delivery": {
      explanation_md: `Getting the right item to the right person, on time and in good condition, is what turns a one time buyer into a regular customer. Ecommerce adverts in Ghana list order processing, order fulfilment and delivery coordination as core duties, so this is directly useful for jobs too.

## Keep an order list

When orders come in through several chats, it is easy to forget one. Keep a simple order list in a notebook or Google Sheet with these columns:

* **Order date**
* **Customer name and phone**
* **Item and quantity**
* **Total and payment status** (paid, part paid, pay on delivery)
* **Delivery method and address**
* **Status** (to pack, sent, delivered)
* **Tracking details**, such as a waybill number or rider's phone

Check the list every morning and every evening.

## Pack to protect

* **Fragile items** like glass jars or electronics need padding: cardboard, old newspaper or cloth, and a firm box.
* **Liquids and creams** need sealed lids, tape around the lid, and a plastic bag in case of leaks.
* **Food** must be clean, sealed and labelled, and sent by a fast route.
* **Clothes** can go in a clean, sealed bag.

Write the customer's name and phone number clearly on the parcel. Many sellers add a small thank you note with their WhatsApp number, which invites repeat orders.

## Delivery options

* **Pick up:** the customer collects from you or a safe meeting point. Cheapest, good for local buyers.
* **Dispatch rider or okada delivery:** quick within a town. Agree the fee before the rider leaves.
* **Bus or transport parcel services:** many intercity bus companies and lorry stations carry parcels between towns. The sender usually receives a waybill or receipt, and the customer collects at the destination station.
* **Courier companies:** offer door to door delivery and tracking, usually at higher cost.

Prices and services change, so ask locally and compare.

## Addresses and clear information

Ghana has a national digital address system, GhanaPostGPS, which gives each location a short code. Asking customers for their digital address, plus a landmark and phone number, makes delivery easier.

Before the customer pays, tell them clearly: the delivery method, the fee, who pays it, and how long it should take. After sending, share the tracking details and follow up to confirm arrival.

## A small example

Hawa in Tamale received an order for two smocks from a customer in Ho. She added it to her order list, confirmed the total including the bus parcel fee, and checked that payment arrived in her wallet.

She folded the smocks into a clean sealed bag with a thank you note, wrote the customer's name and phone on it, and took it to the bus station. She sent the customer a photo of the waybill and the expected arrival day, and marked the order as "sent". The next day she messaged to check it had been collected, then marked it "delivered". The customer later ordered three more for her brothers.`,
      practice_task_md: `**Goal:** Build an order list and a delivery information message.

**Steps:**
1. Create an order list in Google Sheets or a notebook with the seven columns from the lesson.
2. Enter three realistic orders: one local pick up, one dispatch rider delivery and one to another region.
3. Find out (by asking at a station, or online) one intercity parcel option from your town, and write down how sending and collecting works.
4. Write a short message you would send customers explaining your delivery options, fees and times.

**Done looks like:** An order list with three sample orders, notes on one parcel option and a ready to send delivery message.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson recommend keeping an order list?",
            options: [
              "Because customers must sign it",
              "Because with orders in many chats, it is easy to forget one",
              "Because GRA needs it every day",
              "Because delivery companies require it",
            ],
            answer_index: 1,
            explanation: "An order list keeps every order visible so none is missed.",
          },
          {
            prompt: "How should you pack creams or liquids?",
            options: [
              "In an open container so they can breathe",
              "Wrapped only in newspaper",
              "With sealed lids, tape around the lid and a plastic bag in case of leaks",
              "Loose inside a cardboard box",
            ],
            answer_index: 2,
            explanation: "Sealing and bagging prevents leaks from ruining the parcel.",
          },
          {
            prompt: "What is GhanaPostGPS?",
            options: [
              "Ghana's national digital address system that gives each location a short code",
              "A courier company",
              "A mobile money service",
              "A bus parcel service",
            ],
            answer_index: 0,
            explanation: "GhanaPostGPS gives locations a digital address code that helps delivery.",
          },
          {
            prompt: "What should you tell customers about delivery before they pay?",
            options: [
              "Nothing; explain after payment",
              "Only the name of the rider",
              "Only that delivery is fast",
              "The method, the fee, who pays it and how long it should take",
            ],
            answer_index: 3,
            explanation: "Clear delivery information before payment prevents disputes.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "customers-and-growth": {
      explanation_md: `A small business grows in two ways: by finding new customers and by keeping the ones it already has. Both depend on how people feel after dealing with you. In Ghana, word of mouth is powerful. A satisfied customer tells her church group, her colleagues and her family WhatsApp group. An unhappy one tells them too. Customer service is one of the skills that appears most often in Ghanaian sales and shop adverts, so getting good at this section pays off whether you run your own business or work for someone else.

## Service, marketing and loyalty work together

* **Service** is how you treat people before, during and after a sale: how fast you reply, how polite you are, and how you handle problems.
* **Marketing** is how new people hear about you and decide to try you.
* **Loyalty** is what makes customers come back and recommend you.

Good service makes marketing easier, because happy customers become your advertisers. Good marketing brings new people, and good service turns them into loyal customers. It is a cycle.

## What this section covers

* **Customer service and complaints.** Replying well, setting clear return and refund rules, and turning complaints into trust.
* **Marketing on a small budget.** Using Status, groups, referrals and timing before you spend money on ads.
* **Repeat customers and loyalty.** Keeping a simple customer list, following up and rewarding people who return.

## Start with how you want customers to feel

Write one sentence describing how you want every customer to feel after buying from you. For example: "I want customers to feel that buying from me is easy, honest and safe." Then check your habits against it. Do slow replies make buying feel easy? Does a vague delivery promise feel honest? This sentence becomes your guide.

## Listen and learn

Customers tell you how to improve, if you listen. Ask a simple question after each delivery: "Was everything fine with your order?" Note the answers. If several people mention the same thing, such as wanting a smaller size or a faster reply, act on it.

## A small example

Abdul-Rahman's second hand clothes business in Tamale had steady sales but few repeat customers. He wrote his sentence: "Buying from me should feel friendly and reliable."

He started replying to messages within an hour during the day, sending a "thank you, did everything arrive well?" message after every delivery, and keeping a list of regular customers and their sizes. When new stock arrived, he messaged regulars first with items in their size.

Within two months, most of his orders came from people who had bought before or who were sent by them. He had not spent anything on advertising. He had simply made people feel looked after.

The next lessons show you how to do the same, step by step.`,
      practice_task_md: `**Goal:** Define your customer promise and start listening.

**Steps:**
1. Write one sentence describing how you want every customer to feel after buying from you.
2. List three of your current habits (or likely habits) and say whether each supports that sentence.
3. Write a short follow up message to send after each delivery, asking if everything was fine.
4. If you have customers, send it to at least three and note what they say.

**Done looks like:** A customer promise sentence, a short habit check, a follow up message and, if possible, three pieces of customer feedback.`,
      quiz: {
        questions: [
          {
            prompt: "What are the two ways a small business grows, according to the lesson?",
            options: [
              "Raising prices and cutting quality",
              "Finding new customers and keeping existing ones",
              "Opening more shops and hiring more staff",
              "Buying ads and using more apps",
            ],
            answer_index: 1,
            explanation: "The lesson says growth comes from new customers and keeping current ones.",
          },
          {
            prompt: "How does good service make marketing easier?",
            options: [
              "It lets you charge more for ads",
              "It removes the need for any product",
              "Happy customers become your advertisers",
              "It makes apps show your posts more",
            ],
            answer_index: 2,
            explanation: "Satisfied customers recommend you, which is free marketing.",
          },
          {
            prompt: "What simple question does the lesson suggest asking after each delivery?",
            options: [
              "\"Was everything fine with your order?\"",
              "\"Can you pay more next time?\"",
              "\"Can you give me your PIN?\"",
              "\"Why did you not order more?\"",
            ],
            answer_index: 0,
            explanation: "Asking after delivery helps you learn and shows you care.",
          },
          {
            prompt: "What did Abdul-Rahman do when new stock arrived?",
            options: [
              "Posted it on every app at once",
              "Raised his prices",
              "Waited for customers to ask",
              "Messaged regular customers first with items in their size",
            ],
            answer_index: 3,
            explanation: "He used his list of regulars and their sizes to offer them first choice.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "customer-service": {
      explanation_md: `Customer service is one of the skills Ghanaian sales and shop employers ask for most often. For a small online seller it matters even more, because customers cannot see your face or your shop. Every message you send is your shop counter, your smile and your reputation.

## Reply well

* **Reply quickly.** You do not have to answer instantly, but a long silence makes people buy elsewhere. Use an away message when you are busy.
* **Greet and use names.** "Good morning, Hawa. Thank you for your message" feels warmer than "Yes?".
* **Answer the actual question.** If someone asks the price and delivery to Ho, give both.
* **Be clear and honest.** Do not promise delivery tomorrow if you are not sure.
* **Use the customer's language** where you can. A reply in Dagbani, Twi or Pidgin can make a customer feel at home.

## Set clear rules before problems happen

Decide and share your rules on:

* **Returns and exchanges:** can a customer return an item? Within how many days? In what condition?
* **Refunds:** when will you refund, and how quickly?
* **Damaged or wrong items:** what you will do, and what proof (such as a photo) you need.

Put these rules in your catalogue, profile or a quick reply, and apply them fairly to everyone.

## Handling complaints

Complaints are a chance to show you are trustworthy. A simple approach:

1. **Listen** and let the customer explain fully.
2. **Acknowledge** the problem: "I am sorry the jar arrived cracked."
3. **Ask for details** you need, such as a photo.
4. **Offer a fair solution** based on your rules: replace, repair, refund or discount.
5. **Follow through** quickly, and **check** the customer is satisfied.

Stay calm, even if the customer is rude. Never argue in public comments. Reply briefly and politely in public, then move the conversation to a private chat.

If the problem was your fault, admit it. If the customer is asking for something unfair, explain your rules politely. Some problems cannot be fixed in a way that pleases everyone, and that is all right. Treat people with respect and keep your word.

## A small example

A customer in Kumasi messaged Mariama angrily: her shea butter tub had arrived cracked and butter had leaked into the bag. She also posted a complaint in the comments on Mariama's TikTok.

Mariama replied in the comments: "I am very sorry about this. I have sent you a message so I can fix it." In the chat, she apologised, asked for a photo, and offered to send a replacement tub at no cost. She sent it the same day, packed in a sealed bag with tape around the lid.

When the replacement arrived, the customer updated her comment to say the problem had been solved quickly. Mariama also changed her packing for every order. A complaint became a public example of good service and a better process.`,
      practice_task_md: `**Goal:** Write your service rules and practise handling a complaint.

**Steps:**
1. Write your return, refund and damaged item rules in three short sentences.
2. Save them as a quick reply or a note you can paste.
3. Imagine a complaint: a customer says their item arrived late and damaged. Write your public reply (one or two sentences) and your private reply following the five steps.
4. Ask a friend to role play an angry customer by text and practise staying calm.

**Done looks like:** Written service rules, a sample public and private complaint reply, and one role play completed.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is good reply practice according to the lesson?",
            options: [
              "Reply \"Yes?\" to save time",
              "Answer the actual question, such as giving both the price and the delivery cost",
              "Promise next day delivery to everyone",
              "Wait until evening to reply to all messages",
            ],
            answer_index: 1,
            explanation: "Answering exactly what was asked saves time and builds trust.",
          },
          {
            prompt: "What is the first step in handling a complaint?",
            options: [
              "Offer a refund straight away",
              "Explain why the customer is wrong",
              "Listen and let the customer explain fully",
              "Block the customer",
            ],
            answer_index: 2,
            explanation: "The five steps start with listening.",
          },
          {
            prompt: "What should you do when a customer complains in public comments?",
            options: [
              "Reply briefly and politely in public, then move to a private chat",
              "Delete the comment and ignore it",
              "Argue in the comments to defend yourself",
              "Post the customer's phone number",
            ],
            answer_index: 0,
            explanation: "A calm public reply plus private resolution shows good service.",
          },
          {
            prompt: "Why should you set return and refund rules before problems happen?",
            options: [
              "So you can refuse every complaint",
              "Because apps require written rules",
              "So you can charge customers for complaining",
              "So customers know what to expect and you can apply the rules fairly to everyone",
            ],
            answer_index: 3,
            explanation: "Clear rules shared in advance make complaints easier and fairer to handle.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "low-cost-marketing": {
      explanation_md: `Most small businesses start with almost no money for advertising, and that is fine. Many successful Ghanaian sellers grew through Status updates, groups, referrals and good timing before they ever paid for an ad. Shop and sales adverts often list promotions and social media among the duties, so knowing how to market well on a small budget is useful in a job too.

## Free and low cost channels

* **WhatsApp Status:** seen by your contacts who have also saved your number, depending on your privacy settings. Post regularly: new stock, a product in use, a happy customer (with permission), and prices.
* **Your own groups:** church, school, alumni, association and community groups. Share only where selling is welcome, follow group rules, and do not spam.
* **Referrals:** ask happy customers to tell friends, and thank them when they do, perhaps with a small discount on their next order.
* **Social media posts and short videos:** free to post, and a good video can travel far.
* **Your Google Business Profile:** free, and helps nearby people find you.
* **Offline still works:** a small sign at your stall, a sticker on your parcel with your WhatsApp number, or telling people at the market.

## Timing and offers

People buy more at certain times. Plan around them:

* **Market days** in your town.
* **Festivals and holidays,** such as Eid, Christmas and local festivals like Damba.
* **Seasons,** such as the harmattan for shea butter and skin care, or the school reopening period for school items.
* **Pay days** at the end of the month for workers.

A clear offer at the right time works well: "Christmas gift pack: two tubs and a small soap for 60 cedis, order by 20 December."

## Measure what brings orders

Likes feel nice, but orders pay the bills. When a new customer messages, ask: "How did you hear about us?" Note the answer in your records. After a few weeks you will know which channel actually brings buyers, and you can spend your time there.

## When to consider paid ads

Social media platforms let you pay to show posts to more people. Try a small, carefully tracked budget only after free posts are already bringing orders and you know your profit per item, so you can tell whether the ad paid for itself. If you want to go deeper into ads, the Digital Marketer roadmap covers them.

## A small example

Amina sells sobolo and snacks in Wa. She posts on her Status every morning with that day's menu and prices. She shares in her church WhatsApp group only on Fridays, which the group admin agreed to. She gives regular customers a free snack when they bring a new office colleague.

During Ramadan she created an iftar pack and announced it a week ahead. She asked every new customer how they heard about her and found that most came from referrals and her Status, while her occasional Facebook posts brought almost none. She now spends her time on what works.`,
      practice_task_md: `**Goal:** Plan two weeks of low cost marketing.

**Steps:**
1. List the free channels you can use (Status, groups, referrals, posts, Google profile, offline).
2. Identify any market days, festivals, seasons or pay days in the next month.
3. Plan one post or action for each day for two weeks in a simple table: date, channel, what you will post or do.
4. Write one clear offer with a product, a price and a deadline.
5. Add a "How did you hear about us?" column to your order list.

**Done looks like:** A two week marketing plan, one offer and an updated order list ready to track where customers come from.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, who sees your WhatsApp Status updates?",
            options: [
              "Everyone in Ghana",
              "Only people in your groups",
              "Your contacts who have also saved your number, depending on privacy settings",
              "Only people who pay for them",
            ],
            answer_index: 2,
            explanation: "The lesson says Status is seen by your contacts who have also saved your number, depending on privacy settings.",
          },
          {
            prompt: "What does the lesson advise when sharing in community or church groups?",
            options: [
              "Share only where selling is welcome, follow group rules and do not spam",
              "Post in every group many times a day",
              "Add strangers to new groups without asking",
              "Ignore group rules if your product is good",
            ],
            answer_index: 0,
            explanation: "Respecting group rules keeps goodwill and avoids being removed.",
          },
          {
            prompt: "Why should you ask new customers \"How did you hear about us?\"",
            options: [
              "To collect their personal details for others",
              "To decide whether to serve them",
              "Because it is required by law",
              "To learn which channel actually brings orders",
            ],
            answer_index: 3,
            explanation: "Tracking the answers shows which channels bring buyers, not just likes.",
          },
          {
            prompt: "When does the lesson suggest trying a small paid ad budget?",
            options: [
              "Before you have any customers",
              "After free posts are already bringing orders and you know your profit per item",
              "Only during festivals",
              "Never",
            ],
            answer_index: 1,
            explanation: "Knowing your profit lets you judge whether an ad paid for itself.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "repeat-customers": {
      explanation_md: `Finding a new customer takes effort: posts, replies, building trust from nothing. Selling again to someone who already trusts you is usually much easier. Repeat customers also recommend you to others. That is why online selling courses teach customer loyalty, and why Ghanaian sales adverts ask for customer records, follow up and account management.

## Keep a simple customer list

You cannot look after customers you cannot remember. Keep a list in a notebook, a Google Sheet, or by labelling chats in WhatsApp Business. Useful columns:

* **Name and phone**
* **Town**
* **What they bought and when**
* **Notes,** such as size, favourite product or special dates like a child's birthday
* **Permission to send updates** (yes or no)

Store this information carefully. Do not share customers' details with anyone else, and only send updates to people who have agreed to receive them. Ghana has a data protection law, so treat personal details with respect.

## Follow up

* **After delivery:** "Did your order arrive well? Thank you for buying."
* **When they might need more:** if shea butter usually lasts a customer a month, a friendly message after four weeks is helpful, not pushy.
* **When something new arrives** that matches what they like.

Keep messages short, personal and not too frequent. One useful message beats five generic ones.

## Broadcast lists

WhatsApp Business lets you send one message to many contacts at once using a broadcast list. Each person receives it as a private message. Broadcasts are only delivered to people who have saved your number, which is another reason to ask happy customers to save it. Use broadcasts for real news, such as new stock or a seasonal offer, not daily adverts.

## Reward loyalty

Simple rewards work well:

* A small discount or a free extra item on the fifth order.
* Early access to new stock for regulars.
* A thank you gift for customers who refer friends.

Keep track of rewards in your list so you are fair and do not forget.

## A small example

Hawa keeps a Google Sheet of her smock customers with their sizes and favourite colours. When she receives a new batch of indigo smocks, she messages only the customers who like indigo, with a photo and their size already noted: "Good afternoon, Issahaku. New indigo smocks in your size, XL, have arrived. Would you like me to keep one for you?"

She gives a small discount on the fourth purchase and notes it in the sheet. Many of her customers now buy for every festival, and several have ordered for weddings, bringing in whole families. Her customer list has become the most valuable thing in her business.`,
      practice_task_md: `**Goal:** Start a customer list and a follow up routine.

**Steps:**
1. Create a customer list in Google Sheets or a notebook with the five columns from the lesson.
2. Add at least five real or realistic customers.
3. Write three short follow up messages: after delivery, when they might need more, and when something new arrives.
4. Choose one simple loyalty reward and write how you will track it.

**Done looks like:** A customer list with five entries, three follow up messages and a written loyalty reward rule.`,
      quiz: {
        questions: [
          {
            prompt: "Why are repeat customers valuable according to the lesson?",
            options: [
              "They always pay more",
              "Selling to someone who already trusts you is usually easier, and they recommend you",
              "They never complain",
              "They do not need delivery",
            ],
            answer_index: 1,
            explanation: "Existing customers already trust you and bring others.",
          },
          {
            prompt: "Which column does the lesson suggest including in a customer list?",
            options: [
              "Their mobile money PIN",
              "Their salary",
              "Permission to send updates, yes or no",
              "Their political views",
            ],
            answer_index: 2,
            explanation: "Recording permission ensures you only message people who agreed.",
          },
          {
            prompt: "Who receives a WhatsApp broadcast message?",
            options: [
              "Only contacts on the list who have saved your number",
              "Everyone on WhatsApp in your town",
              "All members of your groups",
              "Anyone who searches your business name",
            ],
            answer_index: 0,
            explanation: "Broadcasts only reach people who have saved your number.",
          },
          {
            prompt: "Why did Hawa message only customers who like indigo about the new smocks?",
            options: [
              "Because broadcast lists are limited to five people",
              "Because other customers had blocked her",
              "Because WhatsApp charges per message",
              "Because personal, relevant messages work better than generic ones",
            ],
            answer_index: 3,
            explanation: "She used her list to send short, personal messages to the right people.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "going-official": {
      explanation_md: `Many small businesses in Ghana start informally, and that is a normal first step. As you grow, making your business official opens doors. Some bigger buyers, such as shops, hotels, schools and companies, prefer to deal with registered businesses. Online payment services and merchant accounts often ask for registration documents. Support programmes, loans and grants usually ask for them too. And staying on the right side of tax and product rules protects you from fines or having goods seized.

## Three areas to understand

* **Business registration** with the Office of the Registrar of Companies (ORC). This gives your business a legal name and identity.
* **Tax** with the Ghana Revenue Authority (GRA). Every business that earns income has tax duties, and GRA has simplified arrangements for small traders.
* **Product rules,** especially for food, cosmetics and similar goods, overseen by the Food and Drugs Authority (FDA). These protect customers' health and require proper labels.

## Always check the official source

Fees, forms and rules change. Information shared in WhatsApp groups, on social media or by agents can be out of date or simply wrong. This roadmap explains the ideas and points you to the official websites, but it does not give fees or exact steps, because those can change. Before you act, check:

* The ORC website for registration.
* The GRA website for tax.
* The FDA website for food and cosmetics.

You can also visit their offices. Several of these agencies have regional offices, including in the north.

## Watch out for fake helpers

Some people offer to "register your business fast" or "sort your tax" for a fee, then disappear or file wrong information. If you use an agent, choose someone recommended by people you trust, ask for receipts, and check the result yourself on the official website. Never share your Ghana Card details or mobile money PIN with strangers.

## Your records make this easier

Everything you learned about bookkeeping pays off here. Tax arrangements for small traders ask for information about your sales. Support programmes ask about your income and costs. Clean, regular records turn a stressful process into a simple one.

## A small example

Fuseini sells dried okra and dawadawa to buyers in Kumasi. A supermarket in Tamale showed interest in stocking his dawadawa, but asked whether his business was registered and whether his packaging was properly labelled.

Fuseini did not panic. He visited the ORC website to read about business name registration, checked the GRA website to understand his tax position, and read the FDA's information about food products. He also asked the FDA regional office what his labels needed to show. It took some weeks and a little money, but when he returned to the supermarket with his registration certificate and improved labels, he secured a regular order.

Going official is not something to fear. It is a step that helps a growing business reach bigger customers.`,
      practice_task_md: `**Goal:** Find the official sources for your business.

**Steps:**
1. Visit the ORC website (orc.gov.gh) and write down the types of registration it offers.
2. Visit the GRA website (gra.gov.gh) and find the page about Taxpayer Identification Numbers. Write one sentence on what it says about the Ghana Card.
3. If you sell food, cosmetics or similar goods, visit the FDA website (fdaghana.gov.gh) and note where to find information for small producers.
4. Find the nearest office of each agency to you, using their websites.

**Done looks like:** A short note with links, one key fact from each site and the nearest offices.`,
      quiz: {
        questions: [
          {
            prompt: "Which agency handles business registration in Ghana, according to the lesson?",
            options: [
              "The Ghana Revenue Authority",
              "The Office of the Registrar of Companies",
              "The Food and Drugs Authority",
              "The Bank of Ghana",
            ],
            answer_index: 1,
            explanation: "The ORC handles business registration.",
          },
          {
            prompt: "Why does this roadmap not give exact fees and steps?",
            options: [
              "Because registration is free and quick",
              "Because fees and rules change, so you should check the official source",
              "Because only agents know the steps",
              "Because the steps are secret",
            ],
            answer_index: 1,
            explanation: "The lesson sends you to official websites because fees and rules change.",
          },
          {
            prompt: "What does the lesson advise if you use an agent to help with registration or tax?",
            options: [
              "Give them your mobile money PIN to pay fees",
              "Pay in cash with no receipt",
              "Choose someone recommended by people you trust, ask for receipts and check the result yourself",
              "Let them keep your Ghana Card",
            ],
            answer_index: 2,
            explanation: "Use trusted agents, keep receipts and verify on the official site.",
          },
          {
            prompt: "Why did the supermarket hesitate to stock Fuseini's dawadawa at first?",
            options: [
              "It asked whether his business was registered and his packaging properly labelled",
              "His price was too low",
              "It only stocks imported food",
              "He had no WhatsApp account",
            ],
            answer_index: 0,
            explanation: "The supermarket asked about registration and labelling before ordering.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "business-registration": {
      explanation_md: `Registering your business gives it a legal identity. It can help you open a business bank account, get a merchant mobile money account, sign up for some online payment services, apply for support programmes and sell to larger buyers who need invoices from a registered business. Even if you do not register straight away, understanding the options means you can make the choice with confidence.

## Who registers businesses in Ghana

The **Office of the Registrar of Companies (ORC)** registers businesses in Ghana. Its website, orc.gov.gh, explains the types of registration and links to its online services.

## Common types for small businesses

* **Business name (sole proprietorship).** The ORC describes this as a one person business. It is the most common starting point for a single trader. You own the business personally, and the business is not separate from you in law, which means its debts are your debts.
* **Partnership.** Two or more people running a business together.
* **Company.** A separate legal body from its owners, such as a company limited by shares. It involves more paperwork and duties, and suits bigger or growing businesses, especially those with several owners or investors.

Most people starting a small online shop begin with a business name. Whether you must register depends on things like whether you trade under a name other than your own, so check the current rules with the ORC.

## What you usually need

Requirements can change, but you should expect to need:

* Your **Ghana Card**, which also serves as your tax number for individuals.
* A **business name** that is not already in use. The ORC can check whether a name is available.
* Your **business address**, including a GhanaPostGPS digital address.
* A description of what the business does.
* Payment of the **registration fee**.

Check the ORC website or office for the current list and fees before you start.

## Renewal

Registration is not a one time event. Business names must be renewed, and the ORC offers renewal online and by USSD. Put the renewal date in your phone calendar so you do not forget.

## Choosing a name

Pick a name that is easy to say, spell and remember, fits what you sell, and works on WhatsApp, TikTok and a Google profile. Check that no one else is using it online either.

## A small example

Wumpini has sold beaded bracelets for a year. A boutique in Accra wants to stock them but needs invoices from a registered business. Wumpini reads the ORC website, decides a business name registration suits her as a sole trader, and chooses "Wumpini Beads".

She gathers her Ghana Card, her GhanaPostGPS address and a short description of her business. She checks the current fee and steps on the official website, completes the registration, and saves the certificate safely, both a paper copy and a photo backed up online. She also sets a reminder for her renewal date. Now she can issue invoices with her registered business name, and the boutique places its first order.`,
      practice_task_md: `**Goal:** Prepare a registration plan for your business.

**Steps:**
1. Decide which type of registration would suit your business now (business name, partnership or company) and write one sentence explaining why.
2. Write three possible business names and check each one by searching online and on social apps.
3. List the documents and details you would need, based on the lesson, and tick the ones you already have.
4. Visit orc.gov.gh and note the current steps and fee. Do not pay anything unless you are ready and sure you are on the official site.

**Done looks like:** A one page plan with your chosen registration type, three name options, a document checklist and notes from the official ORC site.`,
      quiz: {
        questions: [
          {
            prompt: "How does the ORC describe a business name registration?",
            options: [
              "A company with many shareholders",
              "A one person business, also known as a sole proprietorship",
              "A partnership of two or more people",
              "A non profit organisation",
            ],
            answer_index: 1,
            explanation: "The ORC describes a business name as a sole proprietorship, a one person business.",
          },
          {
            prompt: "What is one key difference between a sole proprietorship and a company?",
            options: [
              "A sole proprietorship cannot sell online",
              "A company does not need registration",
              "In a sole proprietorship the business is not separate from you in law, so its debts are your debts",
              "A company can only have one owner",
            ],
            answer_index: 2,
            explanation: "A company is a separate legal body; a sole proprietorship is not.",
          },
          {
            prompt: "Which document does the lesson say also serves as your tax number as an individual?",
            options: [
              "Your Ghana Card",
              "Your voter ID",
              "Your birth certificate",
              "Your school certificate",
            ],
            answer_index: 0,
            explanation: "For individuals, the Ghana Card PIN serves as the tax number.",
          },
          {
            prompt: "What does the lesson say about renewal?",
            options: [
              "Registration lasts forever",
              "Only companies need to renew",
              "Renewal can only be done in Accra",
              "Business names must be renewed, and the ORC offers renewal online and by USSD",
            ],
            answer_index: 3,
            explanation: "Registration must be renewed, so set a reminder.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "tax-basics": {
      explanation_md: `Tax can feel confusing and frightening, but the basics are straightforward. Understanding them helps you plan your prices, avoid penalties, and be ready when a buyer, a lender or a support programme asks about your tax position. This lesson gives you the general picture. For anything specific to your business, check with the Ghana Revenue Authority (GRA).

## The Ghana Revenue Authority

The **GRA** collects taxes in Ghana. Its website, gra.gov.gh, has information on tax types, registration and payment, and it has offices across the country.

## Your tax number

Every taxpayer has a **Taxpayer Identification Number (TIN)**. The GRA states that for individuals, the PIN on your Ghana Card is now your TIN. So if you have a Ghana Card, you already have your personal tax number. Registered businesses may also have their own TIN.

## Simplified tax for small traders

The GRA runs a **Modified Taxation Scheme** for individuals in the informal sector, such as traders, food vendors, tailors and craftspeople, who earn from skills, crafts or sales. In general:

* It has **categories based on the size of your annual sales**. The smallest businesses pay a fixed amount, while larger ones pay based on their sales or their profit.
* You register with your Ghana Card, a digital address, a phone number and some basic information about your sales.
* Registration can be done through a GRA app, at a GRA office, with a GRA field officer, or through a trade association.
* Payment can be made with mobile money through the GRA's official channels.
* You file a yearly return reporting your actual sales.

The amounts and sales limits for each category can change, so read the current details on the GRA website rather than relying on what someone tells you.

The GRA also mentions a **tax stamp** given to small informal businesses as proof that they have paid.

## VAT and growing businesses

Value Added Tax (VAT) is a tax on sales that applies to businesses once their sales pass certain levels, and there are special schemes for some retailers. Most very small sellers will not start here, but if your business grows, check the GRA's VAT pages to see whether you need to register.

## Records are your best friend

Tax works on numbers: your sales, and for some schemes your costs. The daily records you learned to keep in the bookkeeping lesson give you those numbers. Keep mobile money confirmations, receipts and your sales record safe for several years.

## Beware of tax scams

Only pay tax through official GRA channels. Be careful with calls or messages claiming to be from the GRA that ask for urgent payment to a personal number. When in doubt, contact the GRA directly using details from its official website.

## A small example

Sumaila's phone accessory business in Damongo is growing. A friend told him tax was "too complicated" and to ignore it. Instead, Sumaila read the GRA's pages on TINs and the Modified Taxation Scheme. He learned that his Ghana Card PIN is his TIN and that small traders can register through the GRA app or a field officer and pay with mobile money.

Because he had kept a year of sales records, he could see which category he probably fell into, and he confirmed it with a GRA officer during a market visit. He now sets aside a little money each week so the payment never comes as a shock.`,
      practice_task_md: `**Goal:** Understand your own tax starting point.

**Steps:**
1. Find your Ghana Card PIN and note that it serves as your TIN as an individual. Do not share it publicly.
2. Visit the GRA website and read the Modified Taxation Scheme page. Write three short points about who it is for and how to register.
3. Using your sales records (real or practice), estimate your sales for a year.
4. Write down one question you would want to ask a GRA officer about your situation.
5. Add a "tax savings" line to your weekly money routine.

**Done looks like:** A short note with three points about the scheme, your estimated annual sales, one question for the GRA and a plan to set money aside.`,
      quiz: {
        questions: [
          {
            prompt: "According to the GRA, what is the TIN for individuals?",
            options: [
              "Your phone number",
              "Your mobile money wallet number",
              "The PIN on your Ghana Card",
              "Your voter ID number",
            ],
            answer_index: 2,
            explanation: "The GRA states that for individuals, the Ghana Card PIN is now the TIN.",
          },
          {
            prompt: "Who is the Modified Taxation Scheme for?",
            options: [
              "Large companies with many branches",
              "Individuals in the informal sector who earn from skills, crafts or sales",
              "Foreign investors only",
              "Government workers",
            ],
            answer_index: 1,
            explanation: "The scheme is for informal sector individuals such as traders and craftspeople.",
          },
          {
            prompt: "How are categories in the Modified Taxation Scheme decided?",
            options: [
              "By the size of your annual sales",
              "By your age",
              "By the region you live in",
              "By the number of followers you have",
            ],
            answer_index: 0,
            explanation: "The scheme has categories based on annual sales.",
          },
          {
            prompt: "Why does the lesson say records are your best friend for tax?",
            options: [
              "Records let you avoid tax completely",
              "GRA pays you for keeping records",
              "Records replace the need for a TIN",
              "Tax works on numbers like your sales, and records give you those numbers",
            ],
            answer_index: 3,
            explanation: "Daily records provide the sales and cost figures tax arrangements ask for.",
          },
          {
            prompt: "What should you do if someone calls claiming to be from the GRA and asks for urgent payment to a personal number?",
            options: [
              "Pay quickly to avoid penalties",
              "Contact the GRA directly using details from its official website",
              "Send half now and half later",
              "Share your Ghana Card details to confirm",
            ],
            answer_index: 1,
            explanation: "Only pay through official channels and verify with the GRA directly.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "product-standards": {
      explanation_md: `This lesson matters most if you sell food, drinks, cosmetics such as shea butter or soap, herbal products or similar goods. These products go into or onto people's bodies, so Ghana has rules to protect customers' health. Following them helps you sell to supermarkets, pharmacies and bigger buyers, and protects you from complaints, fines or having goods taken off the market. If you sell items like clothes, baskets or phone accessories, you can treat this lesson as optional background.

## Who oversees food and cosmetics

The **Food and Drugs Authority (FDA)** regulates food, drugs, cosmetics and related products in Ghana. Depending on the product and where you sell it, you may need FDA approval before selling widely, especially in shops and supermarkets. The FDA has offices in the regions, including the north, and its website, fdaghana.gov.gh, has information and contacts.

News reports from Tamale have described the FDA and partners training shea butter and cosmetic processors, and noted that labelling problems are one of the main reasons products are not approved. The FDA has also said it has taken steps to make registration easier for small producers. So it is worth asking early rather than guessing.

## What a good label usually shows

Exact requirements depend on the product, so confirm them with the FDA. A good label typically includes:

* **Product name** and what it is.
* **Ingredients**, listed clearly.
* **Net weight or volume**, such as 250 g or 500 ml.
* **Producer's name and address**, including a phone number.
* **Batch or lot number**, so problems can be traced.
* **Date of manufacture and expiry or best before date.**
* **How to store and use** the product.

The label must be honest. Do not claim a product cures diseases or has effects you cannot prove.

## Hygiene and safety

Even before formal approval, good habits protect your customers:

* Prepare food and cosmetics in a clean space with clean water and clean containers.
* Use sealed, food safe packaging.
* Keep products away from heat and sunlight if needed.
* Write down each batch: date made, ingredients used and quantity.

## Standards

The Ghana Standards Authority sets national standards for many products. Some buyers, especially exporters and large retailers, may ask whether your product meets a recognised standard. If you plan to grow into those markets, ask about standards early.

## A small example

Mariama's aunt's group in Savelugu makes excellent shea butter, but their tubs had only a handwritten sticker saying "Pure Shea". A pharmacy in Tamale wanted to stock it but asked about FDA approval.

Mariama visited the FDA regional office to ask what was needed. She learned what the label should show and how the approval process works for small producers. The group designed a new printed label with the product name, ingredients, net weight, the group's name and phone number, a batch number and dates. They also started a batch notebook. The process took time, but it opened the door to shops that had previously said no.`,
      practice_task_md: `**Goal:** Review and improve a product label.

**Steps:**
1. Choose a food or cosmetic product you or someone you know sells. If you do not sell one, choose a packaged product from a shop.
2. Check the label against the seven items in the lesson and tick what is present.
3. Design an improved label on paper or in a free design app such as Canva, including everything that was missing.
4. Visit fdaghana.gov.gh and find the contact details of the office nearest to you.
5. Write one question you would ask the FDA about selling this product.

**Done looks like:** A label checklist, an improved label design and the contact details of your nearest FDA office.`,
      quiz: {
        questions: [
          {
            prompt: "Which agency regulates food and cosmetics in Ghana?",
            options: [
              "The Office of the Registrar of Companies",
              "The Ghana Revenue Authority",
              "The Food and Drugs Authority",
              "The Bank of Ghana",
            ],
            answer_index: 2,
            explanation: "The FDA regulates food, drugs, cosmetics and related products.",
          },
          {
            prompt: "What did news reports from Tamale say is one of the main reasons products are not approved?",
            options: [
              "Labelling problems",
              "Prices that are too high",
              "Lack of social media accounts",
              "Selling only in the north",
            ],
            answer_index: 0,
            explanation: "Reports said labelling problems were one of the main hurdles.",
          },
          {
            prompt: "Why should a label include a batch or lot number?",
            options: [
              "To make the label look official",
              "To set the price",
              "To show how many followers you have",
              "So problems can be traced",
            ],
            answer_index: 3,
            explanation: "Batch numbers let you and the FDA trace a problem to a specific batch.",
          },
          {
            prompt: "What does the lesson say about health claims on labels?",
            options: [
              "Claim cures to sell more",
              "Do not claim a product cures diseases or has effects you cannot prove",
              "Only claim cures in local languages",
              "Health claims are required on all food",
            ],
            answer_index: 1,
            explanation: "Labels must be honest and avoid unproven claims.",
          },
        ],
        pass_threshold: 75,
      },
    },
    earning: {
      explanation_md: `The skills in this roadmap can earn you money in two ways. You can grow your own business, or you can be hired by a business that needs someone to sell, serve customers and manage online orders. Many people do both: they work in sales while building a side business, or they run a business and take on freelance work helping others sell online. In Ghana, sales and business development are among the largest categories of job adverts on Jobberman, and many adverts now ask for exactly the skills you have practised here.

## Two paths, one set of skills

**Running your own business** means you choose what to sell, set your prices and keep the profit. It also means you carry the risk and must be disciplined with money and time.

**Working for a business** means a regular income, structure and the chance to learn from others. Roles include shop attendant, sales representative, sales and marketing officer, telesales, field sales, online sales or social media sales officer, and ecommerce officer. Entry level roles often ask for customer service, communication, record keeping, stock management, comfort with WhatsApp and social media, and basic computer skills like email and spreadsheets.

## Your experience counts

If you have run even a small online business while following this roadmap, you have real evidence of skills employers want. You have priced products, served customers, handled payments, kept records and sold through chat and social media. That is far more convincing than saying "I am hardworking".

## What this section covers

* **Sales and online retail jobs.** What these roles involve, how to build a simple portfolio from your own trading, and how to apply safely.
* **Planning growth and finding support.** How to write a one page plan, and how to find trustworthy training, mentoring and funding programmes.

## Honest expectations

Neither path is instant. Businesses grow step by step, and job searches can take time. Keep learning, keep records of what you do, and keep showing up. Many local support programmes run in cohorts and are based in Accra or other big cities. You can use this roadmap to prepare, so that when an opportunity opens, you already have the skills and the evidence.

## A small example

Abdul-Rahman has been selling second hand clothes through WhatsApp from Tamale for a year. He has records, a customer list, and screenshots of his catalogue and order process.

When a retail company opened an online sales role, he applied. In the interview, instead of general claims, he showed his order list, explained how he checks mobile money payments, and described how he handled a complaint. He got the job, and he keeps his small business running on weekends.

His friend Mariama chose the other path. She used her records to apply to a youth enterprise programme, received training and mentoring, and is now growing her shea butter business to supply shops.`,
      practice_task_md: `**Goal:** Decide your next path and gather your evidence.

**Steps:**
1. Write which path interests you most right now: growing your own business, getting a sales or online retail job, or both. Give one reason.
2. List five pieces of evidence from this roadmap that show your skills, such as your costing sheet, catalogue, order list, stock record or customer list.
3. Save screenshots or photos of each in one folder on your phone or Google Drive, with any personal customer details hidden.
4. Write one next step you will take this week.

**Done looks like:** A chosen path, a folder with five pieces of evidence and one clear next step.`,
      quiz: {
        questions: [
          {
            prompt: "What are the two ways this roadmap's skills can earn you money?",
            options: [
              "Investing and lending",
              "Growing your own business or being hired by a business",
              "Buying ads and reselling them",
              "Only through government jobs",
            ],
            answer_index: 1,
            explanation: "The lesson describes running your own business and working for one.",
          },
          {
            prompt: "Which of these skills does the lesson say entry level sales roles often ask for?",
            options: [
              "Advanced programming",
              "A university degree in economics only",
              "Customer service, record keeping, stock management and comfort with WhatsApp and social media",
              "Owning a car",
            ],
            answer_index: 2,
            explanation: "The lesson lists these as common entry level requirements.",
          },
          {
            prompt: "Why is running a small business while following this roadmap useful for job applications?",
            options: [
              "It gives you real evidence of skills employers want",
              "Employers only hire business owners",
              "It means you do not need an interview",
              "It guarantees a higher salary",
            ],
            answer_index: 0,
            explanation: "Real records and examples are more convincing than general claims.",
          },
          {
            prompt: "What did Abdul-Rahman show in his interview?",
            options: [
              "Only his school certificates",
              "His social media follower count",
              "A letter from a friend",
              "His order list, how he checks payments and how he handled a complaint",
            ],
            answer_index: 3,
            explanation: "He used concrete evidence from his own business.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "sales-jobs": {
      explanation_md: `Sales and business development roles are among the most advertised jobs on Jobberman Ghana. Many are open to people with little formal experience, as long as they can communicate well, serve customers, keep records and use a phone and basic computer tools confidently. The skills from this roadmap fit these roles closely.

## What these roles involve

Common job titles and what they usually mean:

* **Shop or sales attendant:** serving customers, handling cash and mobile money, managing stock, keeping the shop tidy. Some roles now include managing the shop's social media pages.
* **Sales representative or sales officer:** finding and serving customers, explaining products, meeting sales targets and reporting results.
* **Telesales:** selling and following up by phone, often using a list of leads.
* **Field sales:** visiting customers, shops or communities in person to sell or sign people up.
* **Social media or live sales officer:** selling through WhatsApp, Instagram and TikTok, including direct messages and live streams.
* **Ecommerce officer:** uploading products and prices to a website or marketplace, processing orders and coordinating delivery.
* **Business development officer:** finding new clients and partners, preparing proposals and building relationships.

## Skills that keep appearing

Across Ghanaian adverts, the same skills appear again and again: customer service, communication, selling through WhatsApp and social media, meeting targets and reporting, lead generation and follow up, record keeping, stock management, product knowledge, negotiation, and office tools like email and spreadsheets. Some roles ask for a **CRM**, a customer relationship management tool, which is software for tracking customers, leads and sales. Examples include Zoho and HubSpot. If you have kept a customer list and order list, you already understand the idea.

## Build a simple portfolio

Turn your roadmap work into evidence:

* Your **costing sheet** and **sales record** (with customer details hidden).
* Your **WhatsApp Business** profile and catalogue screenshots.
* A **product listing** with your own photos.
* Your **order list** and **stock record**.
* A short note on a **complaint you resolved**.
* Any simple results, such as "sold 40 baskets in three months", stated honestly.

## Applying

* Write a short CV that lists your trading experience as real work, with what you did and what happened.
* Speaking local languages such as Dagbani, Gonja, Dagaare, Twi or Hausa can be an advantage in sales; list them.
* Practise answering "Tell me about a time you handled a difficult customer" using a real example.

## Stay safe

Jobberman states that it never asks job seekers for payment. Never pay anyone to get a job, an interview or training that "guarantees" a job. Be careful with "sales jobs" that require you to buy stock first or recruit others before you are paid.

## A small example

Hawa, who sells smocks, applied for a social media sales officer role. Her CV listed "Online smock business, Tamale: managed WhatsApp Business catalogue, sold through TikTok and live sessions, handled mobile money payments and deliveries to several regions." She brought screenshots of her catalogue, order list and a live session plan. The interviewer asked about a difficult customer, and Hawa described how she handled a size complaint. She was offered a trial week, and then the job.`,
      practice_task_md: `**Goal:** Prepare to apply for a sales or online retail role.

**Steps:**
1. Visit Jobberman Ghana or another trusted job site and read three sales, online sales or ecommerce adverts. Do not apply yet.
2. For each, list the skills they ask for and tick the ones you can show evidence for.
3. Update or create a short CV that includes your trading or roadmap work as real experience.
4. Prepare a portfolio folder with at least four items from the list in the lesson, with customer details hidden.
5. Write a short answer to "Tell me about a time you handled a difficult customer".

**Done looks like:** A skills check against three adverts, an updated CV, a portfolio folder and one practised interview answer.`,
      quiz: {
        questions: [
          {
            prompt: "What does an ecommerce officer typically do, according to the lesson?",
            options: [
              "Repair phones and laptops",
              "Upload products and prices, process orders and coordinate delivery",
              "Only post on TikTok",
              "Audit company accounts",
            ],
            answer_index: 1,
            explanation: "The lesson describes ecommerce officers handling listings, orders and delivery.",
          },
          {
            prompt: "What is a CRM?",
            options: [
              "A type of mobile money wallet",
              "A government licence for sales staff",
              "Software for tracking customers, leads and sales",
              "A delivery company",
            ],
            answer_index: 2,
            explanation: "CRM stands for customer relationship management software.",
          },
          {
            prompt: "What does Jobberman state about payment from job seekers?",
            options: [
              "It never asks job seekers for payment",
              "Job seekers must pay to apply",
              "Payment guarantees an interview",
              "Only sales jobs require payment",
            ],
            answer_index: 0,
            explanation: "Jobberman says it never asks job seekers for payment.",
          },
          {
            prompt: "Which of these does the lesson suggest including in your portfolio?",
            options: [
              "Customers' phone numbers and addresses",
              "Your mobile money PIN",
              "Copies of other sellers' photos",
              "Your order list and stock record with customer details hidden",
            ],
            answer_index: 3,
            explanation: "Real work samples with private details hidden make a strong portfolio.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "growth-and-support": {
      explanation_md: `Once your business is running steadily, the next questions are where to take it and who can help. Growth without a plan can strain your cash and your energy. Support from the right programme can speed things up. Support from the wrong one can cost you money. This lesson helps you plan and choose wisely.

## Write a one page plan

You do not need a thick business plan. One page is enough to guide you and to show a programme or lender. Include:

* **What you sell and to whom**, in two or three sentences.
* **Where you are now:** your monthly sales, profit and number of regular customers, taken from your records.
* **Your goal for the next six to twelve months**, such as "sell to two shops in Tamale" or "reach customers in Kumasi every week".
* **What you need to get there:** more stock, better packaging, registration, a second supplier, a helper.
* **The steps and timeline**, month by month.
* **Risks** and what you will do about them, such as a supplier falling ill or prices rising.

Review the plan every month and compare it with your records.

## Ways to grow

* **Sell more to existing customers:** new sizes, gift packs, related products.
* **Reach new customers:** a new town, a new channel, or shops and institutions.
* **Improve margins:** buy in larger amounts at better prices, reduce waste, or raise prices where your quality justifies it.
* **Work with others:** join or form a cooperative or association, which can help with bulk buying, training and access to bigger buyers.

Grow one step at a time, and keep enough cash to keep operating.

## Finding support

Support can include training, mentoring, market access, equipment and sometimes grants or loans. Possible sources include:

* **Government agencies** for small businesses, such as the Ghana Enterprises Agency.
* **Trade associations and cooperatives**, such as shea, crafts or farmer groups.
* **NGOs and development programmes** working with women and young people in the north.
* **Training providers**, including online courses. Google's Digital Marketing and E-commerce certificate is one paid option if you can afford it.

Many programmes run in cohorts with set application dates, and some are based in Accra or other cities. Use this roadmap to prepare, so you can apply with records, a plan and evidence of what you have done.

## Check before you trust

* **Never pay to receive a grant or loan.** Genuine grant programmes do not ask you to pay a fee to receive money.
* Check that the programme has an official website and real contact details, and ask people who have taken part.
* Read terms carefully, especially for loans: the total amount you must repay, the schedule and any penalties.
* Do not share your PIN or passwords with anyone offering help.

## A small example

Mariama wrote a one page plan for her shea butter business: currently selling about 25 tubs a week, with a goal of supplying three pharmacies in Tamale within a year. She listed what she needed: FDA approval, printed labels and a second production day each week.

She found a training programme for women in shea processing through her aunt's cooperative, checked its official contacts and spoke to past participants. It was free and offered help with labelling. She applied with her plan and her records. A few weeks later, a message offered her a "guaranteed grant" for a processing fee. She recognised it as a scam and ignored it. Her growth came through careful steps, not shortcuts.`,
      practice_task_md: `**Goal:** Write your one page growth plan and a support shortlist.

**Steps:**
1. Using your records, write a one page plan with the six parts from the lesson.
2. Choose one way to grow from the list and explain why it suits you.
3. Research two possible sources of support (a government agency, association, NGO or course). For each, note its official website or office, what it offers and how to apply.
4. Check each against the "check before you trust" list and note anything that worries you.

**Done looks like:** A one page plan and a shortlist of two checked support options, ready to share with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these does the lesson say a one page plan should include?",
            options: [
              "Your personal PIN for safekeeping",
              "Where you are now, using figures from your records",
              "A list of every competitor's customers",
              "A promise of guaranteed profit",
            ],
            answer_index: 1,
            explanation: "The plan includes your current sales, profit and customers from your records.",
          },
          {
            prompt: "What does the lesson say about paying to receive a grant?",
            options: [
              "It is normal to pay a small processing fee",
              "Pay only if the amount is large",
              "Never pay to receive a grant or loan",
              "Pay through mobile money to be safe",
            ],
            answer_index: 2,
            explanation: "Genuine grant programmes do not ask for fees to release money.",
          },
          {
            prompt: "How can a cooperative or association help a small business grow?",
            options: [
              "With bulk buying, training and access to bigger buyers",
              "By paying all your costs",
              "By removing the need for records",
              "By guaranteeing loans without terms",
            ],
            answer_index: 0,
            explanation: "The lesson lists bulk buying, training and access to bigger buyers.",
          },
          {
            prompt: "What did Mariama do when she was offered a guaranteed grant for a processing fee?",
            options: [
              "She paid the fee quickly",
              "She shared it with her customers",
              "She asked for a bigger grant",
              "She recognised it as a scam and ignored it",
            ],
            answer_index: 3,
            explanation: "Asking for a fee to release a grant is a scam warning sign.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
