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
    // NEXT
  },
};

export default content;
