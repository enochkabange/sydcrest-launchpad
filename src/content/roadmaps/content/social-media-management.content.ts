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
  },
};

export default content;
