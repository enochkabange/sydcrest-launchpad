import type { TrackContent } from "./types";

/**
 * Original lesson content for the Social Media Management roadmap (issue #198,
 * process from issue #84). Research, sources and platform facts checked on
 * official help pages: src/content/research/social-media-management.md.
 * This track teaches the operating job of running pages for clients; ads,
 * copywriting and campaigns live in the Digital Marketer track and the
 * Digital Marketing Specialisations roadmap.
 */
const content: TrackContent = {
  roadmap: "social-media-manager",
  nodes: {
    "the-job": {
      explanation_md: `A shop owner in Tamale knows that customers look at Facebook, Instagram, TikTok and WhatsApp before they walk in. What the owner usually lacks is time. Replying to every comment, posting every week, watching for scam accounts and checking what worked is a job in itself. A social media manager does that job, so the owner can run the business.

## What the job really is

People often think social media work means making nice graphics. Graphics and videos are part of it, but most of the work is operating someone else's accounts carefully and reliably:

* **Taking on the client.** Understanding the business, agreeing a goal and getting safe access to the pages.
* **Planning.** Deciding what to post, gathering material from the owner and getting posts approved before they go out.
* **Community.** Answering comments and messages, removing scams and handling complaints calmly.
* **Rules.** Following each platform's rules, protecting customers' personal data and labelling paid posts honestly.
* **Results.** Reading the numbers and telling the owner, in plain words, what worked.

This track teaches exactly that operating job. If you want to run paid ad campaigns, write sales copy or build marketing strategy, the Digital Marketer track covers those. If you want to film and edit videos well, the Video and Content Creation track covers that. A good page manager borrows from both, but the core skill here is being the trusted person who looks after a brand online every day.

## Why trust matters most

When a business gives you access to its pages, it is handing you its reputation and often its customers' private messages. One careless post, one hacked account or one rude reply can cost the business real money. That is why this track spends time on safe access, security, privacy and approvals, not just on posting. Employers and clients notice people who are careful.

## A small example

Hawa runs a shea butter business in Bolgatanga. Her page has followers, but posts are random and messages sometimes wait two days for a reply. Fuseini, who has worked through this track, offers to manage the page. He asks Hawa about her customers and goals, gets access through Meta's business tools instead of asking for her password, turns on two step verification, plans a month of posts around her best products, answers messages every morning and evening, and sends her a one page summary at the end of the month. Nothing he does is magic. It is organised, honest and steady, and that is what clients pay for.

## What this section covers

* **Social media roles in Ghana.** The job titles you will see and what each one does in a normal week.
* **Platforms and what each one is for.** How to choose the two or three platforms that fit a client's customers.

By the end of the track you should be able to run a real page for a real organisation and show the results to an employer.`,
      practice_task_md: `**Goal:** Spot the work behind a page you already follow.

**Steps:**
1. Pick a business, church, school or NGO page you follow on any platform.
2. Scroll through its last ten posts and the comments under them.
3. Write down, in a notes app or notebook, every sign of the work this lesson describes: replies to comments, a regular posting pattern, scam comments left unanswered, a complaint handled well or badly.
4. Write three things you would do differently if you managed this page.

**Done looks like:** a short list of at least six observations and three improvements, which you can discuss with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "According to this lesson, what takes up most of a social media manager's work?",
            options: [
              "Designing graphics for every post",
              "Operating someone else's accounts carefully and reliably",
              "Running large paid advertising campaigns",
              "Filming professional videos",
            ],
            answer_index: 1,
            explanation: "The lesson says graphics are only part of it; the core is operating a client's accounts carefully every day.",
          },
          {
            prompt: "Where should you go if you want to learn to run full paid ad campaigns?",
            options: [
              "This track's planning section",
              "The Video and Content Creation track",
              "The Digital Marketer track",
              "The platform rules section",
            ],
            answer_index: 2,
            explanation: "The lesson points to the Digital Marketer track for paid campaigns, copy and strategy.",
          },
          {
            prompt: "Why does this track spend time on access, security and privacy?",
            options: [
              "Because platforms require a certificate first",
              "Because clients are handing you their reputation and customers' private messages",
              "Because posting is no longer important",
              "Because security makes posts reach more people",
            ],
            answer_index: 1,
            explanation: "A careless post, a hacked account or a rude reply can cost the business, so trust is central.",
          },
          {
            prompt: "In the example, how did Fuseini get access to Hawa's page?",
            options: [
              "He asked for her Facebook password",
              "He created a new page with the same name",
              "He used Meta's business tools instead of her password",
              "He used her phone whenever he needed to post",
            ],
            answer_index: 2,
            explanation: "Fuseini got access through Meta's business tools so Hawa never had to share her password.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "roles-in-ghana": {
      explanation_md: `When you search Ghanaian job boards for social media work, the titles vary a lot: social media assistant, social media officer, social media executive, community manager, digital and social media manager, and sometimes live streaming sales officer. Knowing what sits behind each title helps you decide what to apply for and what to practise.

## The common roles

* **Social media assistant.** Usually an entry point. You post content others have prepared, reply to comments and messages, collect stories from followers and pass sales enquiries to the right person. News platforms, agencies and shops hire assistants.
* **Social media officer or executive.** You run the accounts for one organisation: planning posts, scheduling them, watching comments, keeping the brand's reputation clean and preparing reports. Some roles also ask you to update the website or support the people running ads.
* **Community manager.** The focus is people, not posts. You look after groups, comment sections and members, answer questions, run online events and make sure rules are followed. NGOs and tech companies often use this title.
* **Live selling host.** Some retail and health product companies hire people to sell through Facebook or TikTok live streams, presenting products and taking orders in real time.
* **Freelance page manager.** You look after the pages of several small businesses, each paying a monthly fee. This is common for people starting out, because churches, schools, salons and shops all need help.
* **Social media manager.** A more senior title that usually expects some years of experience. You set the strategy, manage others and answer to the business owner or marketing head.

## What a normal week looks like

For an officer at a Tamale microfinance company, a week might include: a Monday check of last week's numbers, a Tuesday meeting to agree next week's posts, writing captions on Wednesday, scheduling posts on Thursday, and replying to comments and messages twice a day every day. A freelance page manager might do the same across three clients, using a separate plan for each one.

## Where this track fits

Many adverts also mention ads, Canva, CapCut or Google Analytics. This track teaches the core operating work. The Digital Marketer track covers ads and analytics in depth, and the Video and Content Creation track covers filming and editing. You do not need all of them on day one.

## Entry level honesty

Officer and executive roles often ask for a diploma or degree and one to three years of experience. Do not let that stop you. The fastest way to show experience is to run real pages now: a church, a school club, a family business or a community project. Each page you run well becomes evidence in your portfolio, which this track helps you build at the end.

Abdul-Rahman started by running his mosque's events page and his aunt's provisions shop page. When he applied for an assistant role, he could show both pages and explain what he had done. That evidence mattered more than a long list of courses.`,
      practice_task_md: `**Goal:** Map the roles to real adverts.

**Steps:**
1. Search a Ghanaian job board, such as Jobberman Ghana, for "social media" and open five adverts. Use the free search; no account is needed.
2. For each advert, write the job title, the type of employer and the three skills mentioned most clearly. Do not copy the advert text; summarise in your own words.
3. Match each advert to one of the roles in this lesson.
4. Circle the role that best fits where you are now, and write one page you could start running this month to build experience for it.

**Done looks like:** a table of five adverts with roles and skills, plus one realistic starting page.`,
      quiz: {
        questions: [
          {
            prompt: "Which role focuses mainly on people, groups and online events rather than on posts?",
            options: ["Social media assistant", "Community manager", "Live selling host", "Freelance page manager"],
            answer_index: 1,
            explanation: "The lesson describes the community manager role as focused on members, groups, questions and events.",
          },
          {
            prompt: "What does a freelance page manager usually do?",
            options: [
              "Works only on one large company's paid ads",
              "Looks after the pages of several small businesses for monthly fees",
              "Films adverts for television",
              "Writes the platform's community standards",
            ],
            answer_index: 1,
            explanation: "The lesson describes freelance page managers looking after several small clients on monthly fees.",
          },
          {
            prompt: "Officer roles often ask for experience. What does the lesson suggest you do about that?",
            options: [
              "Wait until you have a degree before doing any page work",
              "Only apply to senior manager roles",
              "Run real pages now for a church, school, family business or project",
              "Buy followers to make your own page look experienced",
            ],
            answer_index: 2,
            explanation: "Running real pages builds the evidence employers ask for.",
          },
          {
            prompt: "Which skills does this track leave mainly to the Digital Marketer track?",
            options: [
              "Replying to comments and messages",
              "Paid ads and analytics in depth",
              "Getting safe access to a client's page",
              "Writing house rules for a community",
            ],
            answer_index: 1,
            explanation: "The lesson says the Digital Marketer track covers ads and analytics in depth.",
          },
        ],
        pass_threshold: 75,
      },
    },
    platforms: {
      explanation_md: `A small business cannot be everywhere, and neither can you. Posting on six platforms badly is worse than posting on two well. Part of your job is helping a client choose where to spend effort, based on where their customers actually are and how those customers like to buy.

## What each platform is good for

* **Facebook.** Widely used by businesses, churches, schools and NGOs in Ghana. Good for community updates, events, longer captions, groups and conversations in comments. Pages connect to Messenger and WhatsApp for enquiries.
* **Instagram.** Visual. Good for fashion, food, beauty, crafts, salons and anything that looks good in photos and Reels. Stories suit daily updates and offers.
* **TikTok.** Short vertical video and live streams. Good for showing products in use, behind the scenes moments and trends, and for reaching people who do not follow you yet.
* **WhatsApp.** Where many Ghanaian customers actually place orders. A WhatsApp Business account gives a catalogue, quick replies and labels. A WhatsApp channel lets a business broadcast updates to followers, who cannot reply in the channel itself.
* **X.** Fast news and public conversation. Useful for media houses, public bodies and brands that need to respond to topics quickly.
* **LinkedIn.** Professional audiences. Useful for NGOs, training centres, recruitment firms and companies selling to other businesses.
* **YouTube.** Longer videos people search for, such as tutorials and sermons, plus Shorts.

## How to choose

Ask three questions at onboarding:

* **Where are the customers?** Ask the owner where their last ten customers heard about them. Look at which existing page brings real messages, not just likes.
* **What does the business have to show?** A tailor with beautiful outfits suits Instagram and TikTok. A law firm or an NGO with reports may suit Facebook and LinkedIn.
* **How do people buy?** If orders come by WhatsApp, every platform should point people there clearly.

Then recommend two or three platforms and say why. A common pattern for a small Ghanaian shop is one main platform for discovery (Facebook or TikTok), one for showing products (Instagram or WhatsApp status) and WhatsApp for orders.

## The same message, adapted

Each platform rewards a different shape. A new batch of smocks from a Tamale weaver could become a Facebook post with prices and pickup details, an Instagram carousel of close ups, a short TikTok of the weaving and the finished smock, and a WhatsApp channel update with the order number. Same news, four shapes.

## Worked example

Amina runs a catering service in Wa. Her Facebook page gets orders from office workers and church groups. She also has an unused X account and a TikTok with three old videos. Her new manager suggests keeping Facebook as the main page, adding TikTok videos of food being prepared to reach younger customers, and directing every post to her WhatsApp Business number for orders. The X account is left quiet with a pinned post pointing to WhatsApp, so nobody thinks the business has closed. Effort goes where customers are.`,
      practice_task_md: `**Goal:** Recommend platforms for a real business.

**Steps:**
1. Choose a business near you: a chop bar, salon, pharmacy, school or shop.
2. Ask the owner, or observe, where customers come from and how they order.
3. Look up whether the business already has pages on any platform and note how active each one is.
4. Write a short recommendation: two or three platforms, why each fits, and where orders should go.

**Done looks like:** a half page recommendation with reasons for each platform, ready to share with the owner or a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson advise against being on every platform?",
            options: [
              "Platforms charge for each extra account",
              "Posting on six platforms badly is worse than posting on two well",
              "Ghanaian law limits businesses to two platforms",
              "Customers only use one app each",
            ],
            answer_index: 1,
            explanation: "The lesson says effort should go where customers are, and quality on fewer platforms beats weak posting everywhere.",
          },
          {
            prompt: "What is a feature of a WhatsApp channel described in the lesson?",
            options: [
              "Followers can reply to every update inside the channel",
              "It lets a business broadcast updates, but followers cannot reply in the channel",
              "It is only available on LinkedIn",
              "It replaces the need for a business phone number",
            ],
            answer_index: 1,
            explanation: "A channel is a broadcast tool; followers read updates but do not reply in the channel.",
          },
          {
            prompt: "Which question helps you choose platforms at onboarding?",
            options: [
              "Which platform has the newest features?",
              "Where did the last ten customers hear about the business?",
              "Which platform do you personally enjoy?",
              "Which platform has the most celebrities?",
            ],
            answer_index: 1,
            explanation: "Asking where real customers came from shows where the effort should go.",
          },
          {
            prompt: "In the worked example, what was done with Amina's unused X account?",
            options: [
              "It was deleted immediately",
              "It was used for daily posting",
              "It was left quiet with a pinned post pointing to WhatsApp",
              "It was sold to another business",
            ],
            answer_index: 2,
            explanation: "A pinned post pointing to WhatsApp shows the business is still open without spending effort there.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "taking-on-a-client": {
      explanation_md: `The first week with a new client decides a lot. If you rush to post before you understand the business, you will post the wrong things in the wrong voice. If you take a password over WhatsApp, you put the client and yourself at risk. If nobody agrees who approves posts, the first mistake becomes an argument. This section is about doing the beginning properly.

## Why the beginning matters

When a business hires you, it is trusting you with three things: its reputation, its customers' messages and its accounts. Professionals protect all three from day one. That is what separates a page manager people recommend from one they quietly replace.

## The four steps

* **Onboarding.** A short conversation and a written brief: who the customers are, what the business wants from social media, what has worked before, who approves posts and how fast messages must be answered. You also audit the pages that already exist.
* **Brand voice.** A one page style guide so every post and reply sounds like the same business, whoever writes it.
* **Page access.** Getting a proper role on the client's pages through the platforms' business tools, so nobody shares a password and the owner can remove you cleanly when the work ends.
* **Account security.** Two step verification, current recovery details, spotting fake security messages and knowing what to do if a page is hacked.

Each of these has its own lesson. Together they form a checklist you can reuse with every new client.

## A simple onboarding checklist

You can keep this in a notes app or a shared document and tick it off:

* Brief written and agreed with the owner.
* Goal for the next three months written in one sentence.
* Existing pages audited, with notes.
* Style guide drafted and approved.
* Access given through business tools, with the right level.
* Two step verification on for every account you will use.
* Approval process and reply times agreed.

## Worked example

Issahaku is asked to manage the pages of a private basic school in Tamale. Before posting anything, he meets the head teacher for thirty minutes. He learns that the school's goal is more admission enquiries before the new academic year, that parents mostly ask questions on WhatsApp, that photos of pupils need parents' permission, and that the head teacher must approve every post. He writes all of this down in a one page brief and sends it back for confirmation.

Next, the head teacher adds him to the school's Facebook Page from her own account, giving him partial access so he can post and reply but not change settings. He turns on two step verification on his own account. Only then does he start planning posts.

None of this took long, but every later decision is easier because of it. When a parent asks why a photo was posted, Issahaku can point to the agreed permission process. When the head teacher wants faster replies, they can look at the agreed reply times together.

## Your mindset

Treat every client account as if it holds money, because in a sense it does. Be organised, write things down and confirm decisions in writing. These habits are simple, and clients notice them.`,
      practice_task_md: `**Goal:** Build your reusable client onboarding checklist.

**Steps:**
1. Open a notes app, Google Docs or a notebook.
2. Write the seven checklist items from this lesson in your own words.
3. Add two items that would matter for clients in your town, for example "agree which local language posts can use" or "check market day timing".
4. Save it with a clear name such as "Client onboarding checklist" so you can copy it for every new client.

**Done looks like:** a checklist of at least nine items you can show a mentor and reuse.`,
      quiz: {
        questions: [
          {
            prompt: "Which three things is a client trusting you with, according to this section?",
            options: [
              "Its stock, its staff and its building",
              "Its reputation, its customers' messages and its accounts",
              "Its bank account, its tax records and its rent",
              "Its logo, its prices and its opening hours only",
            ],
            answer_index: 1,
            explanation: "The lesson names reputation, customers' messages and accounts as what a client trusts you with.",
          },
          {
            prompt: "Why should page access go through the platforms' business tools?",
            options: [
              "It makes posts reach more people",
              "Nobody shares a password and the owner can remove you cleanly later",
              "It is the only way to post photos",
              "It removes the need for a style guide",
            ],
            answer_index: 1,
            explanation: "Business tools give you a role without a shared password and let the owner remove you when work ends.",
          },
          {
            prompt: "In the worked example, why did Issahaku send the brief back to the head teacher?",
            options: [
              "To ask for payment",
              "For confirmation, so decisions were agreed in writing",
              "Because the platform required it",
              "To share it with parents",
            ],
            answer_index: 1,
            explanation: "Confirming the brief in writing makes later questions easier to settle.",
          },
          {
            prompt: "Which item belongs on the onboarding checklist?",
            options: [
              "Buy followers to make the page look busy",
              "Approval process and reply times agreed",
              "Delete all old posts",
              "Change the business name",
            ],
            answer_index: 1,
            explanation: "Agreeing approvals and reply times is one of the checklist items in the lesson.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "client-onboarding": {
      explanation_md: `A new client usually says something like "I want my page to grow." That is not yet a plan. Onboarding turns a vague wish into a written brief you can work from and be measured against. It also shows the client, from the first meeting, that you are organised.

## The onboarding conversation

Keep it to thirty or forty minutes, in person, on a call or by voice notes. Ask:

* **The business.** What do you sell, to whom, and at what price range? What makes you different from the shop next door?
* **Customers.** Who buys most? Where do they live? How do they usually contact you and pay, for example WhatsApp and MoMo?
* **Goal.** What should social media do for the business in the next three months? More orders, more enquiries, more people at an event, or a better reputation?
* **History.** What has worked before? What went badly? Have there been complaints or scams?
* **People.** Who approves posts? Who answers orders and complaints? Who can make decisions when the owner is busy?
* **Limits.** Topics to avoid, photos that need permission, and how quickly messages must be answered.

## Turning a wish into a goal

A useful goal is specific, linked to the business, and something you can check. Compare:

* "Grow the page." Too vague to measure.
* "Get more WhatsApp orders from the Facebook page by the end of March." Clear, and you can count the messages.

Choose one main goal. Two at most. Too many goals means no goal.

## Auditing existing pages

Before changing anything, look at what exists. For each page, note:

* Name, profile photo, cover image, bio and contact details. Are they correct and the same everywhere?
* How often posts went out recently, and which posts got real comments or messages.
* Unanswered messages or comments, and any scam or impostor accounts using the business name.
* Who currently has access, if the owner can show you.

Write a short audit: what is good, what is broken and the three fixes you suggest first. Fixing a wrong phone number may bring more orders than any new post.

## The written brief

Put everything on one page: business summary, customers, goal, platforms, approver, reply times, limits and first fixes. Send it to the client and ask them to confirm. This page becomes your reference when questions come up later, and the starting point for your monthly reviews.

## Worked example

Mariama owns a fabric shop in Tamale. In onboarding, she says most buyers are women aged twenty five to forty who order on WhatsApp and pay by MoMo. Her goal is more WhatsApp orders for school uniform fabric before the new term. Wumpini, her new page manager, audits the Facebook page and finds the WhatsApp number in the bio is an old one, and an impostor page has been copying her photos. His first fixes are updating the number, reporting the impostor and pinning a post saying which number is genuine. The brief says Mariama approves posts each Monday and orders are answered within two hours during shop hours.`,
      practice_task_md: `**Goal:** Write a one page brief for a real or practice client.

**Steps:**
1. Choose a business you can talk to: a relative's shop, a church, a school club or a friend's side business.
2. Ask the onboarding questions from this lesson in a short conversation or by voice notes.
3. Audit one of its pages using the list in the lesson.
4. Write a one page brief in Google Docs or a notes app with: business summary, customers, one goal, platforms, approver, reply times, limits and three first fixes.

**Done looks like:** a brief the owner has read and confirmed. This is your first portfolio document.`,
      quiz: {
        questions: [
          {
            prompt: "Which goal is the most useful, according to the lesson?",
            options: [
              "Grow the page",
              "Be more popular online",
              "Get more WhatsApp orders from the Facebook page by the end of March",
              "Post as much as possible",
            ],
            answer_index: 2,
            explanation: "A useful goal is specific, linked to the business and something you can check.",
          },
          {
            prompt: "Why should you audit existing pages before posting?",
            options: [
              "To delete all old content",
              "Because simple fixes like a wrong phone number may matter more than new posts",
              "To copy competitors' posts",
              "Because the platform will not let you post otherwise",
            ],
            answer_index: 1,
            explanation: "The audit finds broken basics, such as wrong contact details, that may cost orders.",
          },
          {
            prompt: "Which question belongs to the 'People' part of the onboarding conversation?",
            options: [
              "What price range do you sell at?",
              "Who approves posts and who answers orders?",
              "What has worked before?",
              "Which topics should we avoid?",
            ],
            answer_index: 1,
            explanation: "The People questions are about who approves posts, handles orders and makes decisions.",
          },
          {
            prompt: "What should you do with the written brief once it is ready?",
            options: [
              "Keep it private so the client cannot change it",
              "Post it on the page",
              "Send it to the client and ask them to confirm it",
              "Throw it away after the first month",
            ],
            answer_index: 2,
            explanation: "A confirmed brief is your reference for later questions and monthly reviews.",
          },
          {
            prompt: "In the worked example, what was one of Wumpini's first fixes?",
            options: [
              "Starting a paid ad campaign",
              "Updating the old WhatsApp number in the bio",
              "Changing the shop's name",
              "Deleting the Facebook page",
            ],
            answer_index: 1,
            explanation: "The audit found an old WhatsApp number, so updating it was a first fix.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "brand-voice": {
      explanation_md: `If one post sounds like a cheerful friend, the next sounds like a government notice and a reply to a customer sounds annoyed, followers stop trusting the page. Brand voice is the consistent personality of a business in words. When you manage several clients, or when another person covers for you, a written voice keeps every post and reply sounding like the same business.

## Voice and tone

* **Voice** stays the same. A chop bar might always be warm, playful and local. A microfinance company might always be calm, clear and respectful.
* **Tone** adjusts to the moment while keeping the voice. The same chop bar is playful when announcing a new soup, but serious and kind when replying to a customer who got sick or when sharing condolences.

A helpful way to describe voice is with a few scales: funny or serious, casual or formal, enthusiastic or matter of fact, respectful or cheeky. Place the brand on each scale and you have a starting point.

## The one page style guide

You do not need a thick brand book. One page covers most of what you need:

* **Three voice words.** For example: friendly, proud, practical. Add one line on what each means and what it does not mean.
* **How we address people.** "You", "our customers", "family"? First names in replies?
* **Words to use and avoid.** Product names spelled correctly, local terms the brand likes, words it never uses, such as slang that could offend.
* **Languages.** Is mixing English with Dagbani, Twi or Hausa welcome? In which posts? Who checks the translation?
* **Emojis and punctuation.** A few, many or none.
* **Visual basics.** Brand colours, logo placement, which fonts or templates to use, and photos that fit.
* **Sensitive topics.** Politics, religion, tragedies and competitors: what the brand does and does not comment on.
* **Sample lines.** A good post, a good reply to a question and a good reply to a complaint, written in the voice.

## Reading the voice from what already exists

You rarely start from nothing. Read the owner's WhatsApp messages to customers, listen to how staff greet people, and look at the posts that got the warmest response. The best voice often already exists in how the owner talks; your job is to write it down.

## Worked example

Sumaila manages two clients. One is a Tamale chop bar run by a lively young owner. Its guide says: warm, funny, local; address followers as "family"; mixing English and Dagbani greetings is welcome; plenty of food emojis; never mock customers. A sample reply to a complaint is written too, because humour stops when someone is unhappy.

The other is a savings and loans company. Its guide says: calm, clear, trustworthy; formal English; no slang; no promises about loan approval; every rate or fee must match what the company publishes. Same manager, two very different voices, and each guide keeps Sumaila consistent even on a busy day.

## Keep it alive

Share the guide with the client for approval and update it when something new comes up, such as a new product line or a mistake you want to avoid repeating.`,
      practice_task_md: `**Goal:** Write a one page style guide.

**Steps:**
1. Use the business from your onboarding brief, or any local business you know well.
2. Read some of its existing posts and messages, or talk to the owner for ten minutes.
3. In Google Docs or a notes app, write: three voice words, how to address people, words to use and avoid, languages, emoji use, colours and logo notes, sensitive topics, and three sample lines (a post, a reply to a question, a reply to a complaint).
4. Ask the owner or a friend who knows the business whether it sounds right, and adjust.

**Done looks like:** a one page guide with all eight parts filled in.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between voice and tone?",
            options: [
              "They mean exactly the same thing",
              "Voice stays the same; tone adjusts to the moment",
              "Tone stays the same; voice changes every post",
              "Voice is only about colours and logos",
            ],
            answer_index: 1,
            explanation: "The lesson says voice is the consistent personality and tone adapts to the situation.",
          },
          {
            prompt: "Why does a written voice help when you manage several clients?",
            options: [
              "It lets you post the same caption for every client",
              "It keeps each client's posts and replies consistent, even when someone covers for you",
              "Platforms require a style guide before posting",
              "It replaces the need for approvals",
            ],
            answer_index: 1,
            explanation: "A written guide keeps every post sounding like the same business whoever writes it.",
          },
          {
            prompt: "Where does the lesson suggest you look first to find a brand's voice?",
            options: [
              "In a competitor's posts",
              "In how the owner already talks to customers and the posts that got warm responses",
              "In random trending videos",
              "In a dictionary",
            ],
            answer_index: 1,
            explanation: "The best voice often already exists in how the owner talks, and your job is to write it down.",
          },
          {
            prompt: "Why did the chop bar's guide include a sample reply to a complaint?",
            options: [
              "Because humour stops when someone is unhappy",
              "Because complaints must be deleted",
              "Because the platform asked for it",
              "Because the owner never replies to customers",
            ],
            answer_index: 0,
            explanation: "Even a funny brand changes tone to serious and kind when a customer is unhappy.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "page-access": {
      explanation_md: `"Just send me your password" is the most common mistake in page management. If a client shares a password, they cannot tell what you did, they cannot remove you without changing it, two step codes go to their phone and you get blamed if anything goes wrong. Every major platform has a better way: the owner gives you a role on the page from their own account.

## How Meta does it

On Facebook, a Page can give people different levels of access. The names shift as Meta updates its tools (you may see Business Suite, business portfolio or the older Business Manager), so learn the ideas rather than the exact buttons:

* **Full control.** Can manage everything, including settings, and can give or remove access for other people, even others with full control. Keep this for the owner and perhaps one trusted senior person.
* **Partial access.** Can create, manage and delete content, reply to messages as the Page and see insights, but cannot change settings or manage who has access. This is usually right for a page manager.
* **Task access.** Can work on specific tasks through business tools such as Meta Business Suite or Ads Manager, but cannot switch into the Page on Facebook itself.

A Page must always keep at least one person with full control, or it can be deactivated. That person should be the owner, not you.

When an agency works with a business, Meta also lets the business add the agency's own business portfolio as a **partner**, so the agency can assign its staff without the client adding each person.

A linked Instagram professional account can be managed through the same business tools.

## Other platforms

* **TikTok.** Business accounts can be managed through TikTok Business Center, where members get roles. At the Business Center level there are admins and standard members; ad accounts have admin, operator and analyst roles.
* **LinkedIn.** Pages have admin roles such as super admin, content admin and analyst. Every Page must have at least one super admin.
* **WhatsApp Business app.** This one is different. It runs on one phone number, though linked devices let more than one device use the same account. Agree carefully who uses which device, and never let the account sit on a device you will take away when the work ends.

## Rules to work by

* **You request; the owner grants.** You send your details, the owner adds you from their own account. Never log in as the owner.
* **Lowest level that does the job.** Ask only for the access you need.
* **Keep a record.** For each client, note which platforms you can access, at what level and from what date.
* **Leave cleanly.** When the contract ends, ask the owner to remove you and confirm in writing that they have done so.

## Worked example

Hawa owns the shea butter business and has full control of her Facebook Page. Fuseini asks to be added. From her Page settings, Hawa adds Fuseini with partial access. Fuseini can now post, schedule and answer messages from his own account, protected by his own two step verification. Six months later, Hawa hires her niece to take over. She removes Fuseini's access in two taps and adds her niece. No passwords changed hands at any point.`,
      practice_task_md: `**Goal:** Practise giving access safely, with no real client risk.

**Steps:**
1. Create a practice Facebook Page for an imaginary business, or use a page you already own.
2. Ask a friend or classmate for permission, then add them to the Page with partial access (not full control) from the Page's settings. Menu names change, so look for words like "Page access" or "people".
3. Ask your friend to confirm what they can and cannot do.
4. Remove their access, and write a short record of the date added, the level and the date removed.

**Done looks like:** a three line access record and a short note explaining why partial access was the right choice.`,
      quiz: {
        questions: [
          {
            prompt: "Why is sharing a password with a page manager a bad idea?",
            options: [
              "Passwords are too long to type",
              "The owner cannot tell what was done or remove the manager without changing the password",
              "Platforms delete pages that share passwords immediately",
              "It makes posts load more slowly",
            ],
            answer_index: 1,
            explanation: "A shared password hides who did what and makes removing the manager difficult.",
          },
          {
            prompt: "Which level of Facebook Page access usually suits a page manager?",
            options: ["Full control", "Partial access", "No access", "Owner access to the bank account"],
            answer_index: 1,
            explanation: "Partial access lets you post and reply without changing settings or managing who has access.",
          },
          {
            prompt: "What can someone with full control of a Facebook Page do that partial access cannot?",
            options: [
              "Reply to messages",
              "Create posts",
              "Give or remove other people's access and change settings",
              "See insights",
            ],
            answer_index: 2,
            explanation: "Only full control can manage settings and access.",
          },
          {
            prompt: "Who should keep full control of a client's Facebook Page?",
            options: [
              "The page manager, so they can work quickly",
              "The owner of the business",
              "A friend of the manager",
              "Nobody; full control should be removed",
            ],
            answer_index: 1,
            explanation: "A Page needs at least one person with full control, and that should be the owner.",
          },
          {
            prompt: "What should happen when your contract with a client ends?",
            options: [
              "Keep your access in case they need you again",
              "Ask the owner to remove you and confirm it in writing",
              "Change the page password",
              "Delete the posts you made",
            ],
            answer_index: 1,
            explanation: "Leaving cleanly protects both you and the client.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "account-security": {
      explanation_md: `A hacked business page is a disaster. The criminal can lock the owner out, delete years of posts, and worse, use the trusted page to ask followers for MoMo payments for goods that do not exist. As the person managing the page, you are a target too, because your account has access. Security is part of your job, not an extra.

## Two step verification

Two step verification (also called two factor authentication) means logging in needs your password plus a second proof, usually a code. Even if someone steals your password, they cannot get in without the code.

* **Turn it on** for every account that touches client pages: your Facebook and Instagram accounts, TikTok, LinkedIn and the email account linked to them.
* **Prefer an authenticator app** where offered, such as Google Authenticator or Microsoft Authenticator. Codes from an app are generally safer than SMS codes, which can be intercepted if someone takes over your SIM.
* **Save backup codes.** Meta and other platforms offer recovery codes. Generate them while you still have access and store them somewhere safe and offline, such as a notebook kept at home.

## Recovery details

Check that each account has an email address and phone number that the right person controls today. An old number from a lost SIM or an ex staff member's email is a back door. For client pages, the owner's own account should have current recovery details too.

## Spotting fake security messages

Criminals send messages pretending to be Meta, TikTok or "Page Support", often saying the page will be deleted for copyright problems unless you click a link and log in. Warning signs:

* Urgency: "within 24 hours", "final warning".
* A link to a site that is not the platform's real address.
* Requests for your password, a login code or a payment.
* Messages arriving as ordinary DMs or comments. Instagram, for example, says it will not send you a DM about your account, and its emails come from the mail.instagram.com address.

Check real warnings by opening the app or website yourself and looking at the account status or support area, never through the link you were sent. Never share a login code with anyone, including someone claiming to be from the platform.

## If a page is taken over

* **Act fast.** Tell the owner immediately.
* **Recover.** For Facebook, Meta's recovery route is facebook.com/hacked, used from a device you have logged in from before. Meta's Account Recovery Hub covers Instagram and other Meta accounts. Pages have their own recovery form for people who recently lost access.
* **Warn customers.** Use WhatsApp status, another platform or a staff member's account to tell customers not to pay anyone messaging from the page.
* **Report.** In Ghana, the Cyber Security Authority takes reports by call or SMS to 292 and on WhatsApp at 0501603111.

## Worked example

Abdul-Rahman manages pages for a Wa pharmacy. One morning a message from "Meta Pro Support" tells him the page will be disabled and asks him to verify through a link. He does not click. He opens Meta Business Suite directly, sees no warnings, reports the message as a scam and tells the pharmacist. Because his account uses an authenticator app, even a mistake would have been harder for the criminal to use.`,
      practice_task_md: `**Goal:** Secure your own accounts as if they held client pages.

**Steps:**
1. On your main social media account and the email linked to it, turn on two step verification. Use an authenticator app if you can.
2. Generate backup codes and write them in a notebook you keep at home.
3. Check the recovery email and phone number on each account and update anything out of date.
4. Write a short "if hacked" card for a client: the recovery link, who to call, the Cyber Security Authority contacts and a sample warning message to customers.

**Done looks like:** two step verification on for at least two accounts, and a one page "if hacked" card you can reuse.`,
      quiz: {
        questions: [
          {
            prompt: "What does two step verification add to logging in?",
            options: [
              "A second password that is shorter",
              "A second proof, usually a code, as well as the password",
              "A fee paid by MoMo",
              "A photo of your face on every post",
            ],
            answer_index: 1,
            explanation: "Two step verification needs a second proof so a stolen password alone is not enough.",
          },
          {
            prompt: "Why does the lesson prefer an authenticator app to SMS codes?",
            options: [
              "SMS codes are always wrong",
              "SMS codes can be intercepted if someone takes over your SIM",
              "Authenticator apps post for you",
              "SMS codes cost data",
            ],
            answer_index: 1,
            explanation: "App codes are generally safer because SMS can be intercepted through SIM takeover.",
          },
          {
            prompt: "You receive a DM saying your client's page will be deleted in 24 hours unless you log in through a link. What should you do?",
            options: [
              "Click quickly so the page is not deleted",
              "Send the login code to the sender to prove ownership",
              "Ignore the link and check the account status by opening the app or website yourself",
              "Forward the link to the owner so they can log in",
            ],
            answer_index: 2,
            explanation: "Urgency and a login link are warning signs; check through the real app or website instead.",
          },
          {
            prompt: "Which route does Meta give for recovering a hacked Facebook account?",
            options: [
              "facebook.com/hacked from a device you have used before",
              "Messaging any Page that says it is Meta Support",
              "Creating a new account with the same name",
              "Waiting for the hacker to return it",
            ],
            answer_index: 0,
            explanation: "Meta's recovery route for hacked accounts is facebook.com/hacked, used from a familiar device.",
          },
          {
            prompt: "How can a hacked page be reported to the Cyber Security Authority in Ghana?",
            options: [
              "Only by visiting Accra in person",
              "By calling or texting 292, or on WhatsApp at 0501603111",
              "By posting on the hacked page",
              "By emailing the platform's advertising team",
            ],
            answer_index: 1,
            explanation: "The CSA takes reports by call or SMS to 292 and on WhatsApp at 0501603111.",
          },
        ],
        pass_threshold: 80,
      },
    },
    planning: {
      explanation_md: `Pages that post only when someone remembers look abandoned between bursts. Followers forget them, and the owner feels social media "does not work". Planning fixes that. It does not mean posting every day; it means knowing in advance what will go out, why, and who has approved it.

## Planning as a page manager

The Digital Marketer track teaches how to build a content calendar: the columns, the dates and how often to post. This section is about the part that belongs to running pages for a client:

* **Content pillars.** Choosing three to five themes the brand returns to, so ideas never run dry and every post has a purpose linked to the goal.
* **Getting content from busy clients.** Owners rarely write captions, but they can send photos and voice notes if you ask in a simple, regular way.
* **Scheduling and approvals.** Preparing posts in batches, getting the client's approval before anything goes live and checking that each post went out correctly.

## Why approvals belong in the plan

When you post for yourself, a mistake is your problem. When you post for a client, a wrong price, a misspelled product name or a badly timed joke becomes their problem, and possibly a complaint. An agreed approval step protects both of you. It also makes the client feel involved without needing to do the work.

## A weekly rhythm

Many page managers work in a simple cycle:

* **Early in the week.** Check last week's results and messages. Note questions customers kept asking; they are post ideas.
* **Midweek.** Draft next week's posts from the pillars and the material the client sent.
* **Approval.** Send the drafts to the approver in one message, with a clear deadline.
* **Scheduling.** Load the approved posts into a scheduler.
* **Daily.** Check that scheduled posts went out, and leave space for something unplanned, such as new stock arriving or a community event.

The rhythm matters more than the exact days. Clients learn when to expect drafts, and you never scramble on a Friday night.

## Plans should flex

A plan is a guide, not a cage. If there is sad news in the community, pause cheerful scheduled posts. If a product sells out, swap its post for something else. A good manager checks the plan against real life every day.

## Worked example

Hawa's shea butter business has a goal of more WhatsApp orders from Facebook. Fuseini picks four pillars: products, how to use shea butter, the women who process it, and customer stories. Every Wednesday he sends Hawa a short WhatsApp message asking for three photos and one voice note about anything new. On Thursday he drafts five posts, sends them for approval in one message, and once Hawa replies "OK", he schedules them in Meta Business Suite. Each day he checks they went out and answers the messages they bring in.

When a sudden dust storm hits Bolgatanga, he moves a cheerful post back a day and replaces it with a gentle tip on caring for dry skin, then tells Hawa what he changed and why.

## What you will be able to do

By the end of this section you will be able to plan a month of purposeful posts for a client, collect material without nagging, and run a reliable approval and scheduling routine.`,
      practice_task_md: `**Goal:** Design your weekly page management rhythm.

**Steps:**
1. Using a notes app or a sheet, write the five steps of the weekly rhythm from this lesson.
2. Assign each step to a real day and time that fits your own week, school or work.
3. For each step, write what you need from the client and how long it should take you.
4. Add one rule for pausing or changing posts when something unexpected happens.

**Done looks like:** a one week routine with days, times and a pause rule, ready to share with a client.`,
      quiz: {
        questions: [
          {
            prompt: "Which part of planning does this section focus on, rather than calendar mechanics?",
            options: [
              "Choosing fonts for every post",
              "Pillars, getting content from clients, and scheduling with approvals",
              "Running paid ads",
              "Building a website",
            ],
            answer_index: 1,
            explanation: "Calendar mechanics are in the Digital Marketer track; this section covers the client side of planning.",
          },
          {
            prompt: "Why is an approval step important when posting for a client?",
            options: [
              "Platforms block posts without approval",
              "It protects both you and the client from mistakes like wrong prices",
              "It makes posts reach more people",
              "It replaces the need for a plan",
            ],
            answer_index: 1,
            explanation: "A mistake on a client page becomes their problem, so approval protects both sides.",
          },
          {
            prompt: "What should you do with questions customers kept asking last week?",
            options: [
              "Ignore them",
              "Delete them",
              "Use them as post ideas",
              "Forward them to the platform",
            ],
            answer_index: 2,
            explanation: "Repeated questions show what customers want to know, which makes good posts.",
          },
          {
            prompt: "In the example, what did Fuseini do when a dust storm hit?",
            options: [
              "Posted the cheerful post anyway",
              "Stopped posting for a month",
              "Moved the cheerful post and replaced it with a skin care tip, then told Hawa",
              "Deleted the page",
            ],
            answer_index: 2,
            explanation: "Plans should flex with real life, and the client should be told about changes.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "content-pillars": {
      explanation_md: `"What should I post today?" is the question that kills most business pages. Content pillars answer it in advance. A pillar is a theme the brand returns to again and again, chosen because it supports the goal and suits the audience. With three to five pillars, you never start from a blank page, and every post has a reason to exist.

## Choosing pillars

Start from the onboarding brief. Ask: what do customers need to know, believe or feel before they buy? Typical pillars for a small business include:

* **Products and offers.** What you sell, prices, new stock, bundles.
* **How to use it.** Tips, demonstrations, care instructions, recipes.
* **Proof.** Customer stories, reviews (with permission), before and after.
* **Behind the scenes.** The people, the process, the shop, the farm.
* **Community.** Local events, holidays, the town, causes the business supports.

Pick three to five that fit the client. A school might choose admissions, pupils' achievements (with parents' permission), teaching and learning, and school events. An NGO might choose impact stories, how to get help, volunteer calls and partner news.

## Balance the pillars

If every post sells, followers tune out. If no post sells, the page entertains but does not earn. A simple balance is to make roughly a quarter of posts directly about buying, and the rest helpful, human or community posts that earn attention for those sales posts. Adjust the balance after you see results.

## From pillars to a month of ideas

Make a grid. Pillars go across the top; weeks go down the side. Fill each square with an idea. Then mark the moments that matter to your client's customers:

* Religious and national days: Eid al Fitr, Eid al Adha, Christmas, Easter, Independence Day, Farmers' Day.
* Local festivals: Damba in Dagbon, Fire Festival (Bugum), Kakube in Nandom, Kobine in Lawra and others near you.
* School calendar: reopening, exams, vacation.
* Seasons and life: harmattan, rainy season, market days, month end when salaries arrive.

A month for a Tamale fabric shop could include a back to school uniform fabric post in the products pillar, a "how to wash and keep colours bright" tip, a customer story from a tailor, and a Damba post showing outfits sewn from the shop's fabric.

## Respect the occasion

Not every holiday is a sales opportunity. A short, sincere greeting is often better than a discount attached to a religious festival. Check with the client what fits their values, and write it into the style guide.

## Worked example

Sumaila manages the page of a cold store in Damongo. The goal is more orders from restaurants and households. He chooses four pillars: today's stock and prices; storage and cooking tips; customers and suppliers; and community. Before Eid al Adha he plans a stock post a week ahead, a food safety tip on storing meat in the heat, and a simple Eid greeting on the day itself. Each idea fits a pillar and the goal, and the month's plan fits in a single sheet.`,
      practice_task_md: `**Goal:** Turn pillars into one month of post ideas.

**Steps:**
1. Use the business from your brief. Choose three to five pillars and write one line on why each supports the goal.
2. In Google Sheets or on paper, make a grid with pillars across the top and four weeks down the side.
3. Fill every square with a short post idea.
4. Mark at least two local moments in that month, such as a festival, market day or school reopening, and adjust ideas around them.
5. Check the balance: about a quarter of ideas should be direct sales posts.

**Done looks like:** a filled one month grid with pillars, ideas and marked local moments.`,
      quiz: {
        questions: [
          {
            prompt: "What is a content pillar?",
            options: [
              "A paid advert that runs all month",
              "A theme the brand returns to again and again, chosen to support the goal",
              "The first post on a new page",
              "A tool for scheduling posts",
            ],
            answer_index: 1,
            explanation: "Pillars are recurring themes that support the goal and suit the audience.",
          },
          {
            prompt: "What problem do content pillars solve?",
            options: [
              "Slow internet",
              "Starting from a blank page with no idea what to post",
              "Hacked accounts",
              "Ad payments",
            ],
            answer_index: 1,
            explanation: "Pillars answer 'what should I post today?' in advance.",
          },
          {
            prompt: "What does the lesson suggest about balancing pillars?",
            options: [
              "Every post should sell",
              "No post should ever mention prices",
              "Roughly a quarter of posts directly about buying, the rest helpful, human or community posts",
              "Only post on holidays",
            ],
            answer_index: 2,
            explanation: "A mix keeps followers interested while still supporting sales; adjust after results.",
          },
          {
            prompt: "What does the lesson advise for religious festivals?",
            options: [
              "Always attach a discount",
              "Never mention them",
              "A short sincere greeting is often better than a discount; check the client's values",
              "Post only in English",
            ],
            answer_index: 2,
            explanation: "Not every holiday is a sales opportunity, and the client's values should guide the choice.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-content": {
      explanation_md: `The biggest practical problem in page management is not ideas. It is material. You plan a post about new stock, but the owner never sends the photo. You plan a customer story, but nobody asks the customer. Most small business owners will not write captions, yet almost all of them can send photos and voice notes on WhatsApp. Your job is to make that easy, regular and organised.

## Ask small, ask regularly

A vague request like "send me content" gets nothing. A specific, regular request works:

* **Same day each week.** For example, every Monday morning.
* **Specific items.** "Please send three photos of the new arrivals, one short video of the shop, and a voice note telling me anything new this week."
* **Easy format.** Photos and voice notes on WhatsApp, which the owner already uses.
* **A friendly reminder.** If nothing arrives by Tuesday, send one short follow up. Do not nag more than that; adjust the plan instead.

## Help the owner take usable photos

Send a short guide once, maybe as an image or voice note:

* Clean the lens with a soft cloth.
* Use daylight near a door or window. Avoid harsh midday sun.
* Hold the device still and fill the frame with the product.
* Take a few shots, both upright and sideways.
* Plain backgrounds work best: a wall, a cloth, a table.

For filming and editing in more depth, the Video and Content Creation track is the place to go.

## Turn one shoot into many posts

When you visit the business, plan a short shoot of thirty minutes and capture everything you might need: each product, close ups, the owner at work, the shopfront, a customer (with permission). One shoot can feed a month of posts: single product posts, a carousel, a short behind the scenes video, a Story and a profile photo update.

## Collect stories, not just pictures

Customer stories and follower comments are powerful material. Ask the owner to forward kind messages from customers, then ask the customer whether you may share their words, with or without their name. Watch your comment sections too; a follower's photo of the product in use can become a post if they agree.

## Keep a shared folder

Material gets lost in long WhatsApp chats. Create one folder per client in a free cloud drive such as Google Drive, with simple subfolders: products, people, place, events, approved posts. Name files with the date and a short description. When the work ends, the client keeps the folder; it is their material, not yours.

## Worked example

Amina, who runs the catering service in Wa, is busy with orders all week. Her page manager, Mariama, sends her a voice note every Monday asking for photos of two dishes being prepared and a ten second video of food being served. Amina records them during work. Mariama saves them into a Google Drive folder named "Amina Catering / 2026 / October", writes captions, and once a month visits for a short shoot to refresh product photos. The page now has steady material without Amina ever writing a caption.`,
      practice_task_md: `**Goal:** Set up a content request routine for one client.

**Steps:**
1. Write a weekly WhatsApp request message for your practice client, naming the day, the exact items and the format.
2. Write a five point photo guide for the owner in simple words.
3. Create a free cloud folder for the client with subfolders for products, people, place, events and approved posts.
4. Plan a thirty minute shoot list of at least ten shots you would capture on one visit.

**Done looks like:** a request message, a photo guide, an organised folder and a shoot list.`,
      quiz: {
        questions: [
          {
            prompt: "Which request is most likely to get material from a busy owner?",
            options: [
              "Please send me content when you can",
              "Every Monday: three photos of new arrivals, one short shop video and a voice note about anything new",
              "Write five captions for me this week",
              "Send me everything on your phone",
            ],
            answer_index: 1,
            explanation: "Specific, regular, easy requests work better than vague ones.",
          },
          {
            prompt: "What is the advantage of a planned shoot when you visit a business?",
            options: [
              "It replaces the need for approvals",
              "One shoot can feed a month of posts",
              "It is required by the platforms",
              "It makes the page verified",
            ],
            answer_index: 1,
            explanation: "Capturing many shots at once gives material for many different posts.",
          },
          {
            prompt: "Before sharing a customer's kind message as a post, what should you do?",
            options: [
              "Post it immediately with their name",
              "Change their words to sound better",
              "Ask the customer whether you may share it, with or without their name",
              "Only share it on your personal page",
            ],
            answer_index: 2,
            explanation: "Customer stories should only be shared with the customer's permission.",
          },
          {
            prompt: "Who should keep the shared content folder when the work ends?",
            options: ["The page manager", "The client", "The platform", "Nobody; it should be deleted"],
            answer_index: 1,
            explanation: "The material belongs to the client, so they keep the folder.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "scheduling-and-approvals": {
      explanation_md: `Posting live, one post at a time, every day, is tiring and leads to mistakes. Scheduling lets you prepare a week of posts in one sitting and have them go out on time, even when you are busy or offline. Combined with a clear approval step, it is the routine that makes a page manager reliable.

## Free scheduling tools

* **Meta Business Suite.** Free, on the web and in its mobile app. You can create a post for a Facebook Page and a linked Instagram account, choose a date and time, and see scheduled posts in a planner view. Scheduling limits and menu names change, so check what the tool offers when you use it.
* **TikTok.** Business accounts can schedule videos from the TikTok website on a computer, from at least fifteen minutes up to ten days ahead.
* **LinkedIn.** Page admins can schedule posts when creating them.
* **Third party schedulers.** Tools such as Buffer offer free plans with limits, covering several platforms in one place. They are examples, not requirements.

WhatsApp status cannot be scheduled in the app, so plan to post those by hand.

## The approval step

Agree with the client, during onboarding, exactly how approval works:

* **Who approves.** One named person, with a backup when they travel.
* **How.** One message with all drafts, or a shared document or sheet with a status column.
* **When.** A fixed day, with a deadline. For example, drafts on Thursday, approval by Friday noon.
* **What counts as approval.** A clear "approved" or "OK" in writing. Silence is not approval.
* **What happens if there is no reply.** Agree in advance: either the posts wait, or pre agreed safe posts (tips, greetings) can go out.

Keep a simple record of approvals. A screenshot or a status column saying "approved by Hawa, 14 Nov" is enough. If a post later causes a problem, you can show it was agreed.

## A draft the client can approve quickly

Make it easy to say yes:

* Show the image or video exactly as it will appear, with the caption below it.
* State the platform, date and time.
* Highlight anything the client must check, such as a price, a date or a person's name.

## Check after it goes out

Scheduled does not always mean posted correctly. Videos can fail to process, links can break and a price can change after approval. Check each post shortly after it goes live, read the first comments and fix problems fast.

## Worked example

Issahaku manages the Tamale school's pages. On Thursday he sends the head teacher a single message with five drafts: an admissions reminder, a science fair photo (parents had given permission), a Friday prayer greeting, a parents' meeting notice and a short TikTok of the school choir. He highlights the meeting date. She replies "Approved, but change the meeting to 4pm." He corrects it, schedules the Facebook and Instagram posts in Meta Business Suite and the TikTok from the website, and notes "approved 6 Nov" in his sheet. Each day he checks the posts went out.`,
      practice_task_md: `**Goal:** Run a full draft, approval and schedule cycle on a practice page.

**Steps:**
1. Prepare three posts for your practice page or a page you manage, using your pillars.
2. Send them to a friend or mentor acting as the client, in one message, with the platform, date, time and items to check highlighted.
3. Record their approval in a sheet with a status column.
4. Schedule the posts with a free tool such as Meta Business Suite, then check each one after it goes live.

**Done looks like:** three scheduled posts, an approval record and a note on anything you had to fix after posting.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main benefit of scheduling posts?",
            options: [
              "Scheduled posts always get more reach",
              "You can prepare a week of posts in one sitting and they go out on time",
              "It removes the need for approval",
              "It makes the page verified",
            ],
            answer_index: 1,
            explanation: "Scheduling lets you batch your work and keeps posting reliable.",
          },
          {
            prompt: "According to this lesson, how far ahead can a TikTok business account schedule a video from the website?",
            options: ["Up to one hour", "Up to ten days", "Up to one year", "TikTok does not allow scheduling"],
            answer_index: 1,
            explanation: "TikTok's web scheduler allows from fifteen minutes up to ten days ahead.",
          },
          {
            prompt: "Which of these counts as approval?",
            options: [
              "The client did not reply",
              "The client viewed the message",
              "A clear 'approved' or 'OK' in writing",
              "A friend liked the draft",
            ],
            answer_index: 2,
            explanation: "The lesson says silence is not approval; it should be clear and written.",
          },
          {
            prompt: "Why should you check a post after it goes live?",
            options: [
              "Videos can fail, links can break and details can change after approval",
              "Platforms delete unchecked posts",
              "To count likes every minute",
              "To remove all comments",
            ],
            answer_index: 0,
            explanation: "Scheduled does not always mean posted correctly, so check and fix fast.",
          },
          {
            prompt: "Which feature makes a draft easy for a client to approve?",
            options: [
              "Sending each post in a separate message over several days",
              "Hiding the date and time",
              "Showing the post as it will appear and highlighting items to check",
              "Writing the caption after approval",
            ],
            answer_index: 2,
            explanation: "Clear previews and highlighted details make a quick, accurate yes possible.",
          },
        ],
        pass_threshold: 80,
      },
    },
    community: {
      explanation_md: `Posts start conversations, but conversations make sales. A question about price in the comments, a message asking whether delivery reaches Savelugu, a review on a post: each one is a customer deciding whether to trust the business. For many small businesses in Ghana, the inbox is the shop counter. Whoever runs the page is standing behind it.

## What this section covers

The Digital Marketer track introduces community management: replying well, handling a complaint in public and building trust. This section goes further into the daily operating work of a hired page manager:

* **The inbox.** Agreed reply times, saved replies, labels, passing orders and complaints to the right person, and keeping a simple log.
* **Moderation.** Platform tools for hiding and filtering comments, removing spam, reporting impostor pages that copy the brand to scam followers, and writing house rules.
* **Complaints and bad days.** Who may speak for the brand, a holding reply, when to pause scheduled posts and when to stop and call the client before saying anything.
* **Live selling.** Running a live stream for a brand as a service: the run sheet, taking orders during the stream and following up every order afterwards.

## You speak for someone else

When you reply as the page, the customer hears the business, not you. That changes how you work:

* **Use the brand voice,** not your own mood. Tired, irritated or joking replies all land on the client.
* **Never promise what you cannot deliver.** Prices, delivery times, refunds and discounts must come from the client's rules, not your guess.
* **Pass on what you cannot decide.** Know who handles orders, payments and complaints, and how to reach them quickly.
* **Never argue from your personal account.** If someone attacks the business, do not jump in as yourself to defend it.

## Daily routine

A simple routine keeps a busy page under control:

* **Morning.** Read all new comments and messages. Reply to questions you can answer. Hide or remove obvious spam. Pass orders and complaints on.
* **Midday and evening.** Repeat, more quickly.
* **End of day.** Note anything unresolved and anything unusual, such as several people asking about the same problem.

The reply times you agree with the client at onboarding decide how often you check. A shop that sells mostly through Facebook messages may need checks every couple of hours during opening times.

## Worked example

Wumpini manages Mariama's fabric shop page. Each morning he opens Meta Business Suite and sees eleven new messages and twenty comments. He answers price and stock questions using the price list Mariama sends every Monday. Three people want to order; he labels those conversations "order" and forwards their details to Mariama's shop assistant on WhatsApp. One customer says the fabric faded; he replies politely, asks for a photo by private message and alerts Mariama. Two comments from a fake account offering "promo prices, pay by MoMo to this number" are hidden and reported. By ten o'clock the inbox is clear, and he notes the fading complaint in his log in case others report the same batch.

## The goal

When this section is done well, customers feel answered, scammers find no space, problems get to the right person and the client trusts you with their counter.`,
      practice_task_md: `**Goal:** Write the daily community routine for a client.

**Steps:**
1. Use your practice client or a business you know.
2. Write the agreed reply time for messages and comments during opening hours.
3. List who handles orders, payments and complaints, and how you will reach each person.
4. Write your morning, midday, evening and end of day checks in a few lines each.

**Done looks like:** a one page community routine that a client could read and approve.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson call the inbox 'the shop counter'?",
            options: [
              "Because messages cost money to send",
              "Because for many small businesses, customers decide whether to buy through these conversations",
              "Because the inbox shows the shop's stock automatically",
              "Because only staff can see it",
            ],
            answer_index: 1,
            explanation: "Comments and messages are where customers ask questions and decide to trust the business.",
          },
          {
            prompt: "A customer asks for a discount the client has never offered. What should you do?",
            options: [
              "Promise a small discount to keep them happy",
              "Ignore the message",
              "Pass the question to the person who decides, without promising anything",
              "Reply from your personal account",
            ],
            answer_index: 2,
            explanation: "Prices and discounts come from the client's rules, so pass on what you cannot decide.",
          },
          {
            prompt: "What decides how often you check the inbox?",
            options: [
              "How many followers you have personally",
              "The reply times agreed with the client at onboarding",
              "The platform's default setting",
              "Whenever you have free data",
            ],
            answer_index: 1,
            explanation: "Agreed reply times set the checking routine.",
          },
          {
            prompt: "In the worked example, why did Wumpini note the fading complaint in his log?",
            options: [
              "To use it in an advert",
              "In case others reported the same batch",
              "To delete it later",
              "Because the platform asked him to",
            ],
            answer_index: 1,
            explanation: "Logging unusual issues helps spot patterns, such as a faulty batch.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "inbox-and-messages": {
      explanation_md: `A quick, accurate reply can turn "how much?" into a sale. A slow or wrong reply sends the customer to the next shop. When you manage a client's inbox, you need a system: tools that save time, labels that keep track, and clear routes for orders and complaints.

## One place for messages

Meta Business Suite brings Facebook Page messages, Instagram direct messages and comments into one inbox, on the web and in its mobile app. If the business uses WhatsApp Business connected to its Page, those chats can appear there too. TikTok and LinkedIn messages are handled in their own apps. Know where every kind of message arrives, so nothing waits unseen.

## Tools that save time

* **Saved replies.** Prepared answers for common questions: price list, delivery areas, opening hours, how to pay. You select one and adjust it before sending. Write them in the brand voice and ask the client to approve them.
* **Instant reply.** An automatic first response to someone who messages for the first time, for example: "Thank you for contacting Hawa Shea. We reply between 8am and 6pm. Please tell us what you would like to order."
* **Away message.** Sent automatically when nobody is available, so customers know when to expect a reply.
* **Frequently asked questions and keyword replies.** Meta's tools can send set answers to common questions or messages containing chosen words. Keep them short and honest, and check them whenever prices change.
* **Labels.** Tags you add to conversations, such as "new order", "paid", "delivered", "complaint" or "follow up". You can search the inbox by label later.

On WhatsApp Business, the same ideas exist as quick replies, greeting messages, away messages and labels.

## Agree the routes

During onboarding, agree:

* **Reply times.** For example, within two hours during opening times, by the next morning outside them.
* **Orders.** Who confirms stock, price and delivery? How do you pass the order on? A forwarded WhatsApp message with the customer's name, item and location is often enough.
* **Payments.** You should not collect money into your own MoMo. Payment details come only from the client's official number.
* **Complaints.** Who decides refunds or replacements, and how fast must you tell them?

## Keep a simple log

A shared sheet with columns for date, platform, customer first name, type (question, order, complaint), action taken and status helps you and the client. It shows how many enquiries the page brings, which matters for the monthly review. Keep only what you need; you do not need phone numbers in the log if the conversation is already in the inbox.

## Worked example

Fuseini sets up Hawa's inbox. He writes six saved replies (price list, delivery areas, payment, how to use, wholesale, opening hours) and Hawa approves them. An instant reply tells new customers when to expect an answer. Labels mark each conversation as "order", "paid" or "complaint". When a customer in Navrongo orders two tubs, Fuseini labels it "order" and forwards the details to Hawa's sales line. When Hawa confirms payment, he changes the label to "paid". At month end, his log shows how many orders came from the page, which goes straight into the report.`,
      practice_task_md: `**Goal:** Build an inbox kit for a client.

**Steps:**
1. Write five saved replies for your practice client: price list, delivery or location, payment method, opening hours and one product question. Use the brand voice.
2. Write an instant reply and an away message.
3. Choose four or five labels you would use.
4. Create a simple log in Google Sheets with columns for date, platform, first name, type, action and status, and add three made up rows.
5. If you have WhatsApp Business, set up one quick reply and one label to see how they work.

**Done looks like:** saved replies, automatic messages, labels and a log template ready for a client.`,
      quiz: {
        questions: [
          {
            prompt: "What is a saved reply?",
            options: [
              "A message that deletes itself",
              "A prepared answer to a common question that you select and adjust before sending",
              "A paid advert in the inbox",
              "A backup of the client's password",
            ],
            answer_index: 1,
            explanation: "Saved replies speed up answers to common questions while letting you adjust each one.",
          },
          {
            prompt: "When does an instant reply go out?",
            options: [
              "When someone messages the business for the first time",
              "Only when the owner presses send",
              "At midnight every day",
              "When a post is scheduled",
            ],
            answer_index: 0,
            explanation: "An instant reply is an automatic first response to a new message.",
          },
          {
            prompt: "What are labels used for in the inbox?",
            options: [
              "Changing the page name",
              "Tagging conversations, such as 'new order' or 'complaint', so you can track and search them",
              "Hiding comments from everyone",
              "Paying for boosts",
            ],
            answer_index: 1,
            explanation: "Labels keep track of conversation types and status and can be searched later.",
          },
          {
            prompt: "Where should customer payments go?",
            options: [
              "To the page manager's personal MoMo for safekeeping",
              "To whoever replies first",
              "Only to the client's official payment number",
              "To any number the customer prefers",
            ],
            answer_index: 2,
            explanation: "Payment details come only from the client's official number, never your own.",
          },
          {
            prompt: "Why keep a simple inbox log?",
            options: [
              "To store every customer's phone number",
              "To show how many enquiries and orders the page brings, which feeds the monthly review",
              "Because the platform requires it",
              "To share customers' messages publicly",
            ],
            answer_index: 1,
            explanation: "The log shows the page's real results and only needs the details you actually use.",
          },
        ],
        pass_threshold: 80,
      },
    },
    moderation: {
      explanation_md: `Busy business pages attract trouble: spam links, insults, fake giveaways and, most dangerous of all, impostors. An impostor copies the brand's name and photos, comments under real posts or messages followers, and asks for MoMo payments for goods that will never arrive. Customers who lose money often blame the real business. Moderation protects them and the brand.

## Tools on Facebook and Instagram

Meta gives Page managers several moderation tools. Names and menus shift, but the ideas stay:

* **Hide a comment.** The comment disappears from everyone except the person who wrote it and their friends. Useful for spam and scams, because the scammer does not realise and does not repost elsewhere.
* **Delete a comment.** Removes it completely. Use for clearly harmful content.
* **Ban or block a person.** Stops a person or account from commenting or messaging the Page.
* **Profanity filter.** Hides comments with commonly reported offensive words.
* **Blocked keywords.** You add your own list of words, phrases or emojis, and comments containing them are hidden automatically. Add words scammers use, such as "promo agent" or a known scam phone number. These filters apply to comments on the Page's own posts, including its ads.
* **Report.** Sends the comment or account to the platform for review against its rules.

TikTok and Instagram have similar comment filters and keyword lists in their settings.

## Hide, delete or leave?

* **Spam and scam comments:** hide or delete, and report the account.
* **Insults, hate and threats:** delete, report, and ban if repeated.
* **Genuine complaints, even angry ones:** leave them up and respond. Deleting honest criticism looks like hiding something and often makes people angrier.

## Impostor pages

When you find a page or profile pretending to be the business:

* **Collect evidence.** Take screenshots and copy the link.
* **Report it** through the platform's report option on that page, choosing the option for pretending to be a business.
* **Use the impostor form if needed.** Meta has a form for reporting an account pretending to be your business. It asks for identity documents, so the owner should file it, not you.
* **Warn followers.** Pin a short post: "Our only Facebook page is this one, and our only payment number is 024 XXX XXXX. We never ask for payment from other accounts. Report anyone who does."
* **Report crime.** If customers lost money, the owner can report to the Cyber Security Authority by calling or texting 292, or the police.

Note that fan pages and opinion pages about a business are generally allowed; only accounts falsely claiming to be the business are impostors.

## House rules

A short pinned post or group description sets expectations: be respectful, no hate or threats, no selling in comments, no sharing other people's personal details. When you remove something, you can point to the rules.

## Worked example

Amina's catering page posts a Christmas menu. Within an hour, an account called "Amina Catering Promo" comments: "Order at half price, pay MoMo to 05X XXX XXXX." Her manager Sumaila hides the comment, reports the account as impersonation and adds that phone number to the blocked keywords. He tells Amina, who files Meta's impostor form, and he pins a warning post with the business's real number. A customer later writes that they almost paid the fake account; Sumaila thanks them publicly for checking.`,
      practice_task_md: `**Goal:** Prepare a moderation kit for a client page.

**Steps:**
1. On a practice Page you own, find the moderation settings. Turn on the profanity filter and add five blocked keywords that scammers might use.
2. Write a three line decision guide: what you hide, what you delete and ban, and what you leave up and answer.
3. Write a pinned impostor warning post for your practice client, with placeholders for the real page name and payment number.
4. Write five short house rules for the page or group.

**Done looks like:** working filters on a practice Page, plus a decision guide, a warning post and house rules.`,
      quiz: {
        questions: [
          {
            prompt: "What happens when you hide a comment on a Facebook Page?",
            options: [
              "It is deleted for everyone, including the writer",
              "It disappears from everyone except the writer and their friends",
              "It is sent to the police",
              "It becomes a pinned post",
            ],
            answer_index: 1,
            explanation: "Hidden comments stay visible to the writer and their friends, but not to others.",
          },
          {
            prompt: "How should you treat a genuine but angry complaint in the comments?",
            options: [
              "Delete it quickly",
              "Ban the customer",
              "Leave it up and respond",
              "Hide it with a keyword filter",
            ],
            answer_index: 2,
            explanation: "Deleting honest criticism looks like hiding something and often makes things worse.",
          },
          {
            prompt: "Why should the business owner, not the page manager, file Meta's impostor report form?",
            options: [
              "Because the form asks for identity documents",
              "Because managers are not allowed to see impostor pages",
              "Because it costs money",
              "Because it must be filed in Accra",
            ],
            answer_index: 0,
            explanation: "The impostor form asks for identity documents, so the owner should file it.",
          },
          {
            prompt: "What do blocked keywords do on a Page?",
            options: [
              "Stop the Page from posting those words",
              "Automatically hide comments containing words you choose, on the Page's own posts",
              "Delete the accounts of people who use them",
              "Block those words across all of Facebook",
            ],
            answer_index: 1,
            explanation: "Blocked keywords hide matching comments on content the Page created, including its ads.",
          },
          {
            prompt: "Which account is an impostor?",
            options: [
              "A fan page that praises the business",
              "An opinion page reviewing local food",
              "An account using the business name and photos to ask for MoMo payments",
              "A customer sharing a photo of their order",
            ],
            answer_index: 2,
            explanation: "Impostors falsely claim to be the business; fan and opinion pages generally are not.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "complaints-and-crises": {
      explanation_md: `Every business has bad days online. A customer posts that their order never arrived. A staff member is filmed being rude. A post with a wrong price spreads. Sometimes the problem is small and the reply decides everything; sometimes it is serious and the wrong reply makes it far worse. As a hired page manager, your job is to know which is which and to act in the right order.

The Digital Marketer track covers how to reply to an ordinary complaint: acknowledge, take it private, fix it and follow up. This lesson is about the operating side: how bad it is, who decides, and what you do in the first hour.

## Three levels

Agree these levels with the client at onboarding, so nobody argues in the moment:

* **Level 1: an ordinary complaint.** A late delivery, a wrong size, a rude reply. You respond using the agreed approach and pass it to the person who fixes it.
* **Level 2: a growing problem.** Several people complain about the same thing, a post is being shared widely, or a local influencer or journalist picks it up. You stop and alert the client before saying more than a short holding reply.
* **Level 3: serious.** Safety, health, a legal threat, an accusation against a staff member, a death or injury, or anything involving the police. You say nothing beyond what the client approves, and the client may need advice from a lawyer or senior person.

## Who speaks for the brand

Write down who can approve public statements at each level. At level 1, it may be you, using approved replies. At levels 2 and 3, it should be the owner or a named senior person. Have a backup contact in case the owner is travelling.

## The first hour checklist

* **Screenshot everything.** Posts and comments can be deleted later.
* **Pause scheduled posts.** A cheerful promotion going out during an angry storm looks careless. Check the scheduler.
* **Post a holding reply if agreed.** Short, calm and true: "We have seen this and we are looking into it now. We will update you here by 3pm." Then keep that promise.
* **Alert the client** by call, not just a message.
* **Do not argue, delete genuine criticism or reply from your personal account.**
* **Collect the facts.** What happened, when, to whom, and what is the business doing about it?

## After the storm

Once the client agrees what to say, post one clear update: what happened, what the business is doing, and how affected customers can get help. Do not blame the customer, and do not make promises the business cannot keep. Afterwards, write a short note with the client: what happened, what worked, what you will change. Add any new rule to the style guide.

## When the mistake is yours

If you post a wrong price or the wrong client's post, tell the client immediately, correct it, and, if customers saw it, post an honest correction. Owning a mistake quickly protects your reputation more than hiding it.

## Worked example

A customer posts on the Wa pharmacy's page that a medicine she bought was expired, with a photo. Comments pile up. Abdul-Rahman recognises a level 3 issue: health. He screenshots the post, pauses that week's promotion, posts the agreed holding reply and calls the pharmacist. The pharmacist checks stock, contacts the customer privately and later approves a statement explaining the steps taken. Abdul-Rahman posts it and answers follow up questions only with approved wording.`,
      practice_task_md: `**Goal:** Write a simple crisis plan for a client.

**Steps:**
1. For your practice client, write one example situation for each of the three levels.
2. Next to each level, write who approves public replies and how you contact them, including a backup person.
3. Write a holding reply in the brand voice.
4. Write your first hour checklist in your own words and save it where you can find it quickly on any device.

**Done looks like:** a one page crisis plan with three levels, contacts, a holding reply and a checklist.`,
      quiz: {
        questions: [
          {
            prompt: "Which situation is a level 3 issue in this lesson?",
            options: [
              "A customer says delivery was a day late",
              "A customer says a medicine bought from the business was expired",
              "Someone asks for the price list",
              "A follower dislikes a post's colours",
            ],
            answer_index: 1,
            explanation: "Health and safety issues are serious and need the client's approval for every word.",
          },
          {
            prompt: "Why should you pause scheduled posts during a crisis?",
            options: [
              "Scheduled posts are deleted automatically otherwise",
              "A cheerful promotion during an angry storm looks careless",
              "Platforms charge extra during a crisis",
              "To make the page private",
            ],
            answer_index: 1,
            explanation: "Posting promotions in the middle of a crisis makes the business look like it does not care.",
          },
          {
            prompt: "What makes a good holding reply?",
            options: [
              "A long explanation blaming the customer",
              "Short, calm and true, with a time for the next update that you keep",
              "A joke to lighten the mood",
              "A promise of a full refund to everyone",
            ],
            answer_index: 1,
            explanation: "A holding reply acknowledges the issue without guessing, and promises an update you can keep.",
          },
          {
            prompt: "Why take screenshots in the first hour?",
            options: [
              "To post them on your personal page",
              "Because posts and comments can be deleted later",
              "To report the customer to the police",
              "Because the platform requires it",
            ],
            answer_index: 1,
            explanation: "Screenshots keep a record even if posts are deleted.",
          },
          {
            prompt: "You post the wrong price on a client's page. What should you do?",
            options: [
              "Delete it quietly and say nothing",
              "Blame the client",
              "Tell the client immediately, correct it, and post an honest correction if customers saw it",
              "Leave it and hope nobody noticed",
            ],
            answer_index: 2,
            explanation: "Owning a mistake quickly protects your reputation more than hiding it.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "live-selling": {
      explanation_md: `Some shops and brands in Ghana sell through live streams on Facebook and TikTok. A host shows products one by one, answers questions as they come in and takes orders in real time. Some companies now advertise for live selling hosts or officers. For a page manager, running a live session is a service you can offer, but it only works with careful planning and, above all, careful follow up.

This lesson covers running the live session for a client. For camera, sound and framing skills, see the Video and Content Creation track.

## Before you go live

* **Check eligibility.** Facebook Pages can go live from the app or from a computer. TikTok LIVE requires the account holder to be at least eighteen, and other requirements, such as followers, vary by region and change, so check the account in the app well before the date.
* **Announce it.** Post a day or two ahead and again an hour before: date, time, what will be shown and how to order.
* **Prepare a run sheet.** A simple list of products in order, with price, sizes or colours, stock count and one thing to say about each.
* **Set the payment and order rules.** Orders are confirmed only through the client's official number or inbox. Payment goes only to the client's official MoMo or account. Say this on screen and in the comments.
* **Test.** Check the connection, light and sound with a short private test if the platform allows, or a test call. A charged device and stable data or Wi Fi are essential.

## Roles during the stream

Live selling works best with two people:

* **The host** presents products and talks to viewers.
* **The moderator** reads comments, answers simple questions in writing, hides spam and scam comments, and records every order in a sheet: name, product, size, quantity and how to contact them.

If you only have one person, slow down and read orders aloud so you can note them.

## During the stream

* Greet people by name as they join.
* Show each product clearly, say the price and stock left, and repeat how to order.
* Pin a comment with the ordering and payment rules.
* Watch for fake accounts commenting payment numbers, and hide them fast.
* Do not promise stock you do not have. Check the run sheet.

## After the stream

The follow up is where sales are won or lost:

* Message every person who ordered within a few hours, confirming item, price and delivery.
* Update stock and mark orders as paid, delivered or cancelled in the sheet.
* Thank viewers in a post and share a short clip or the replay if the platform allows.
* Write down what sold, what questions came up and what to change next time.

## Worked example

Wumpini hosts a Friday evening Facebook live for Mariama's fabric shop, with her assistant as moderator. The run sheet lists twelve fabrics. During forty minutes, the moderator records twenty three orders, hides two fake payment comments and pins the shop's real number. By the next morning, every customer has a confirmation message, and Mariama has a clear list of what to deliver.`,
      practice_task_md: `**Goal:** Plan a live selling session.

**Steps:**
1. Choose a real or practice business and five products.
2. Write a run sheet with each product's price, options, stock and one talking point.
3. Write the announcement post and the pinned comment with ordering and payment rules.
4. Create an order sheet in Google Sheets with columns for name, product, option, quantity, contact route and status.
5. If you can, practise a ten minute session with a friend as moderator on a practice account, then fill in the sheet.

**Done looks like:** a run sheet, announcement, pinned comment and order sheet, plus notes from a practice run if you did one.`,
      quiz: {
        questions: [
          {
            prompt: "What does the moderator do during a live selling stream?",
            options: [
              "Presents every product on camera",
              "Reads comments, answers simple questions, hides scams and records orders",
              "Edits the video afterwards",
              "Collects payments into their own MoMo",
            ],
            answer_index: 1,
            explanation: "The moderator manages comments and records orders while the host presents.",
          },
          {
            prompt: "What is the age requirement for hosting a TikTok LIVE mentioned in the lesson?",
            options: ["At least thirteen", "At least sixteen", "At least eighteen", "There is no age requirement"],
            answer_index: 2,
            explanation: "TikTok LIVE requires the account holder to be at least eighteen; other requirements vary by region.",
          },
          {
            prompt: "Why pin a comment with the ordering and payment rules?",
            options: [
              "So viewers know orders and payments go only through the client's official channels",
              "To make the stream longer",
              "Because pinned comments increase reach",
              "To hide other comments",
            ],
            answer_index: 0,
            explanation: "Clear rules protect customers from fake accounts posting payment numbers.",
          },
          {
            prompt: "According to the lesson, where are sales won or lost?",
            options: [
              "In the announcement post",
              "In the follow up after the stream",
              "In the choice of background music",
              "In the number of likes",
            ],
            answer_index: 1,
            explanation: "Confirming every order quickly after the stream turns interest into sales.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
