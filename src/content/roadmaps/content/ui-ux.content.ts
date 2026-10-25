import type { TrackContent } from "./types";

/**
 * Original lesson content for the UI/UX Designer roadmap (issue #84).
 * Written from scratch for Ghanaian learners; research and sources are in
 * src/content/research/ui-ux.md. Tools are named as examples only.
 */
const content: TrackContent = {
  roadmap: "ui-ux-designer",
  nodes: {
    foundations: {
      explanation_md: `## Why design matters for jobs in Ghana

Every week more Ghanaian businesses move onto phones. Banks, mobile money services, hospitals, schools, farm advisory services and online shops all need apps and websites that people can actually use. When a screen is confusing, customers give up, call the support line or walk to the branch instead. Companies hire designers to stop that from happening.

This first section gives you the big picture before you learn any tool. You will see what UX and UI mean, what designers do all day and the simple loop that every design project follows.

## UX and UI in plain words

**UX** stands for user experience. It is about how something works for the person using it. Can Mariama, a fabric seller at Tamale Central Market, check her mobile money balance quickly while serving a customer? Does she understand each step? Does she feel safe?

**UI** stands for user interface. It is what the person sees and touches: the buttons, words, colours, icons and layout on the screen.

A good way to remember the difference: UX is the journey, UI is the road surface and the signposts. A beautiful screen with a confusing journey still fails. A clear journey on an ugly, cramped screen also struggles. Employers want people who care about both.

## What you will learn in this section

* **What UX and UI designers do.** The different kinds of design work, from talking to users to polishing screens, and how job adverts in Ghana and remote teams describe them.
* **The design process.** The loop of understanding people, defining the problem, sketching ideas, testing them and improving. Every later section of this roadmap fits somewhere in that loop.

## A small example

Fuseini works at a small Tamale startup that sells solar lamps on credit. Customers repay through mobile money, but many miss payments. The founder asks Fuseini to "make the app prettier". Fuseini first visits five customers in Savelugu and learns that most of them never open the app at all. They use a basic phone and pay through a USSD code, and the reminder SMS arrives in English, which some of them cannot read well.

So the real problem is not how the app looks. It is that the reminder and the payment steps do not fit the customers' phones or language. Fuseini suggests a shorter SMS, a voice reminder in Dagbani and fewer USSD steps. That is UX thinking: understand the person first, then design.

## How to use this roadmap

Work through the sections in order. Each topic has a short lesson, a practice task you can do on a phone or a modest laptop with free tools, and a quiz. Keep everything you make, even rough sketches. By the end you will have the material for real case studies that show employers how you think.`,
      practice_task_md: `**Goal:** start a design notebook and spot good and bad UX around you.

**Steps**
1. Create a free Google Doc, or use a paper notebook, and title it "Design notebook".
2. Pick three things you used this week: for example a mobile money menu, a bank or school app, and a government or church website.
3. For each one write two lines: one thing that was easy and one thing that confused or annoyed you.
4. For each annoyance, write one sentence on whether it is mostly a UX problem (the steps or journey) or a UI problem (what you saw on the screen).

**Done looks like:** three short entries, each with an easy part, a confusing part and your UX or UI label. Share it with a mentor and keep adding to this notebook as you go.`,
      quiz: {
        questions: [
          {
            prompt: "Which statement best describes UX?",
            options: [
              "The colours and fonts used on a screen",
              "How something works for the person using it, from start to finish",
              "The code that makes an app run",
              "The logo and brand of a company",
            ],
            answer_index: 1,
            explanation: "UX is the experience of using something, including whether each step is clear and quick.",
          },
          {
            prompt: "Which of these is mainly a UI concern?",
            options: [
              "Whether customers understand why they should pay on time",
              "Which steps a trader takes to check her balance",
              "The size, colour and wording of a Pay button",
              "Whether customers own a smartphone",
            ],
            answer_index: 2,
            explanation: "UI is what people see and touch, such as buttons, words and colours.",
          },
          {
            prompt: "In the solar lamp example, why did Fuseini not simply make the app prettier?",
            options: [
              "The founder had no budget for design",
              "He learned that most customers never opened the app and paid through USSD on basic phones",
              "Pretty apps are not allowed in Ghana",
              "He did not know how to use a design tool",
            ],
            answer_index: 1,
            explanation: "Visiting customers showed the real problem was the phone, language and payment steps, not the app's looks.",
          },
          {
            prompt: "What does each topic in this roadmap include?",
            options: [
              "Only a video to watch",
              "A paid course and a certificate",
              "A short lesson, a practice task with free tools and a quiz",
              "A group call with a recruiter",
            ],
            answer_index: 2,
            explanation: "Each topic has a lesson, a practice task you can do with free tools and a quiz.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-ux-and-ui-mean": {
      explanation_md: `## Why this matters for your job search

When you read design job adverts from Accra agencies, fintech companies, NGOs and remote teams, you will see many titles: UI/UX Designer, Product Designer, UX Designer, UX Researcher, Visual Designer. They overlap a lot. Knowing what sits behind each title helps you choose what to learn first and how to describe yourself.

## The main kinds of design work

Think of design work as four connected jobs. In a small Ghanaian startup one person may do all four. In a large bank or a remote company they may be split across a team.

* **User research.** Finding out who the users are, what they need and what gets in their way. This means interviews, watching people use products and running tests.
* **Interaction design.** Deciding how the product behaves: which steps a person takes, what happens when they tap, what the error messages say, how they get back if they make a mistake.
* **Information architecture.** Organising content and features so people can find things. Menus, categories and labels all live here.
* **Visual design.** Making screens clear and pleasant with type, colour, spacing, icons and images, and keeping them consistent.

**UX designer** usually leans towards research, flows and interaction. **UI designer** usually leans towards visual design and polished screens. **Product designer** usually means someone who does the whole range and also thinks about business goals, working closely with product managers and developers.

## What junior adverts tend to ask for

When you read junior and entry level adverts for these roles, the same themes keep appearing:

* a design tool such as Figma, with components and prototypes
* wireframes, user flows and clickable prototypes
* talking to users and running usability tests
* design systems and reusable components
* accessibility and responsive layouts for web and mobile
* working with developers and explaining your decisions
* a portfolio with case studies that show your process

Some adverts add basic HTML and CSS, simple analytics or knowledge of a local market. Some remote adverts now mention AI tools that turn designs into code, which makes clear design thinking even more valuable.

## A small example

Hawa sees two adverts. One, from a fintech, asks for "user research, prototyping and design systems". The other, from a marketing agency, asks for "social media graphics, brand guidelines and motion". The first is a product design role. The second is a graphic design role, even if the title says UI/UX. Reading carefully saves Hawa from applying for the wrong job and helps her see what to build in her portfolio.

## Where you fit

You do not need to master everything at once. This roadmap gives you a solid base in all four kinds of work, with extra attention to designing for the phones, languages and conditions people in Ghana actually live with. That local knowledge is something many employers, local and remote, cannot easily find.`,
      practice_task_md: `**Goal:** read real adverts and see which skills come up most.

**Steps**
1. On your phone, open a public job board such as Jobberman Ghana or a company careers page, and search for "UI/UX designer" or "product designer". Read five adverts. You do not need to log in.
2. In your design notebook, make a simple table with the skills down the side (for example Figma, research, prototyping, design systems, accessibility, HTML and CSS) and the adverts across the top.
3. Tick each skill an advert mentions. Write your own words, not the advert's text.
4. Circle the three skills with the most ticks.

**Done looks like:** a table covering five adverts and a short note saying which three skills you will focus on first and why.`,
      quiz: {
        questions: [
          {
            prompt: "Which kind of design work is mainly about organising content, menus and labels so people can find things?",
            options: ["Visual design", "Information architecture", "User research", "Motion design"],
            answer_index: 1,
            explanation: "Information architecture is about how content and features are organised and labelled.",
          },
          {
            prompt: "What does a product designer usually do?",
            options: [
              "Only draws logos",
              "Only writes code for the app",
              "Works across research, flows and visuals and thinks about business goals with product and engineering",
              "Only manages social media pages",
            ],
            answer_index: 2,
            explanation: "Product designers usually cover the whole range of design work and connect it to business goals.",
          },
          {
            prompt: "Hawa sees an advert titled UI/UX Designer that asks for social media graphics and motion. What is it most likely to be?",
            options: [
              "A user research role",
              "A product design role",
              "A graphic design role",
              "A developer role",
            ],
            answer_index: 2,
            explanation: "The skills listed point to graphic and brand work, whatever the title says.",
          },
          {
            prompt: "Which of these appears again and again in junior design adverts?",
            options: [
              "A portfolio with case studies that show your process",
              "Ten years of management experience",
              "Owning a high end laptop",
              "A degree in fine art only",
            ],
            answer_index: 0,
            explanation: "Junior adverts commonly ask for a portfolio with case studies that show how you work.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "design-process": {
      explanation_md: `## Why a process matters

Design is not guessing. Employers in Ghana and abroad want designers who can explain how they reached a decision, not only show a nice screen. A clear process also saves money: fixing a problem on paper costs almost nothing, while fixing it after developers have built it costs days of work.

## The design loop

Most teams use some version of the same loop. Different companies give the stages different names, but the idea is the same.

1. **Understand.** Learn about the people who will use the product and the setting they use it in. Talk to them, watch them and read what support staff hear every day.
2. **Define.** Turn what you learned into a clear problem. "Traders lose track of who owes them money" is a problem. "Build an app" is not.
3. **Ideate.** Sketch many possible solutions quickly. Quantity matters more than polish at this stage.
4. **Prototype.** Turn the most promising idea into something people can try, from paper sketches to a clickable screen.
5. **Test.** Put the prototype in front of real users, give them a task and watch what happens.
6. **Improve.** Change the design based on what you saw, then test again.

It is called a loop because you go round it more than once. Testing often sends you back to understanding or defining. That is normal and healthy, not a failure.

## Diverge, then converge

A helpful picture is to open up, then narrow down. When you research and sketch, you open up to many possibilities. When you define the problem and choose a design, you narrow down to the best option. Good designers do both on purpose and know which one they are doing.

## A small example

Amina is asked to design a way for parents at a Bolgatanga school to pay fees by mobile money.

* **Understand:** she talks to six parents and the school bursar. She learns that parents often pay in parts and lose the paper receipts.
* **Define:** "Parents need to pay fees in parts and see what they still owe, without keeping paper."
* **Ideate:** she sketches a USSD menu, a WhatsApp message flow and a simple web page.
* **Prototype:** she draws the USSD steps on paper cards.
* **Test:** she asks three parents to "pay 200 cedis towards the fees" using the cards. Two get stuck choosing between "Pay" and "Pay part".
* **Improve:** she merges them into one "Pay fees" step that asks for any amount and then shows the balance left.

Amina spent two days and no money, and avoided building the wrong thing.

## How this roadmap follows the loop

The research section covers understanding and defining. Structure and interface design cover ideas and prototypes. Testing covers testing and improving. Keep this loop in mind and you will always know where you are in a project.`,
      practice_task_md: `**Goal:** walk a small everyday problem round the design loop on paper.

**Steps**
1. Choose a small problem you have seen, such as finding the right trotro or minibus stop, booking a clinic visit or sharing costs for a group contribution (susu).
2. Ask two people who face this problem how they handle it today. Write down what they say.
3. Write one clear problem statement in a single sentence.
4. Sketch three different quick ideas on paper. Stick figures and boxes are fine.
5. Show your favourite idea to one of the two people and write down one thing they would change.

**Done looks like:** one page with notes, a problem statement, three sketches and the feedback, labelled with each stage of the loop. Take a photo for your notebook.`,
      quiz: {
        questions: [
          {
            prompt: "Which is the best example of a defined problem?",
            options: [
              "Build a fees app",
              "Parents need to pay fees in parts and see what they still owe, without keeping paper",
              "Make the school website blue",
              "Use the newest design tool",
            ],
            answer_index: 1,
            explanation: "A defined problem describes what people need and what gets in their way, not a solution.",
          },
          {
            prompt: "Why is the design process called a loop?",
            options: [
              "Because you only do each stage once",
              "Because testing often sends you back to earlier stages to improve the design",
              "Because designs must be round",
              "Because developers start before designers",
            ],
            answer_index: 1,
            explanation: "You go round more than once, using what tests show to improve the design.",
          },
          {
            prompt: "What matters most at the ideate stage?",
            options: [
              "Polished, final screens",
              "Choosing colours",
              "Sketching many possible solutions quickly",
              "Writing the code",
            ],
            answer_index: 2,
            explanation: "Ideation is about producing many ideas quickly; polish comes later.",
          },
          {
            prompt: "In Amina's test, what did parents struggle with?",
            options: [
              "Reading the school's name",
              "Choosing between two similar options, Pay and Pay part",
              "Finding the USSD code",
              "Entering their PIN",
            ],
            answer_index: 1,
            explanation: "Two similar options confused parents, so Amina merged them into one step.",
          },
          {
            prompt: "Why is it cheaper to find problems early in the process?",
            options: [
              "Fixing a paper sketch costs almost nothing compared with changing built software",
              "Developers work for free in the early stages",
              "Users do not notice early problems",
              "Early designs never have problems",
            ],
            answer_index: 0,
            explanation: "Changing a sketch is quick and free, while changing built software takes days of work.",
          },
        ],
        pass_threshold: 80,
      },
    },
    research: {
      explanation_md: `## Why research comes first

Imagine a team in Accra designs a farm advisory app for maize farmers in the Northern Region without ever leaving the office. They assume farmers have smartphones with data, read English comfortably and have time to browse. Then the app launches and almost nobody uses it. Many farmers share one phone in the household, buy small data bundles only when needed, and prefer to listen rather than read. A few days of research would have shown all of this.

User research is how designers replace assumptions with evidence. Employers ask for it in most design adverts, from fintech companies to NGOs, because building the wrong thing is expensive.

## What user research is

User research means learning about the people who will use a product: their goals, their habits, their frustrations and the setting they live and work in. It answers questions like:

* Who are the users, really?
* What are they trying to get done?
* What do they do today, and what gets in the way?
* What devices, languages and connections do they have?

Research is not asking people what features they want. People are poor at predicting what they will use. They are much better at describing what they did last week and showing you how they do things now.

## Research in the Ghanaian setting

Research here often looks different from the textbook picture of a quiet lab. You might sit beside a provisions seller in Aboabo market in Tamale, ride along with a motor king rider, or meet a women's savings group under a tree in a Damongo community. You may need to speak Dagbani, Gurene, Dagaare or Twi, or work with someone who does. You will see shared phones, cracked screens and bright sun. All of this is valuable data, not noise.

## What this section covers

* **Research in markets and communities.** Planning a small study, finding the right people, asking for consent and observing people in their real setting.
* **Interviews and quick surveys.** Asking good questions, listening well and knowing when a short survey helps.
* **Personas, journeys and problem statements.** Turning your notes into clear findings the whole team can use.

## A small example

Issahaku is redesigning a clinic booking service in Wa. He expects patients want an app. After watching the clinic for one morning and talking to eight patients, he finds that most book through a relative who calls the clinic, and that the biggest pain is not booking but waiting without knowing when they will be seen. His research moves the project from "build a booking app" to "tell patients by SMS when their turn is near". That is the power of research: it changes what you build.

## A note on respect

Research involves real people giving you their time and trust. Ask permission, explain what you will do with their information, keep it safe and never make promises you cannot keep. You will learn how in the next lesson.`,
      practice_task_md: `**Goal:** list your assumptions and plan how to check them.

**Steps**
1. Pick a product idea that would serve people near you, for example a stock tracker for a Tamale provisions shop or a reminder service for a church welfare group.
2. Write down five things you assume about the users (their phone, language, habits, time, money).
3. Next to each assumption, write how you could check it in one afternoon: who you would talk to, where, and what you would watch.
4. Mark the assumption that would hurt the project most if it were wrong.

**Done looks like:** a list of five assumptions, each with a simple way to check it, and the riskiest one marked. This becomes the start of your research plan in the next lesson.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main purpose of user research?",
            options: [
              "To make the design look modern",
              "To replace assumptions with evidence about real users",
              "To collect as many feature requests as possible",
              "To test the code for bugs",
            ],
            answer_index: 1,
            explanation: "Research gives you evidence about who users are and what they need, instead of guesses.",
          },
          {
            prompt: "Why is asking people which features they want not a reliable method?",
            options: [
              "People are poor at predicting what they will actually use",
              "It takes too long to ask",
              "Features are decided by law",
              "Users always want the same features",
            ],
            answer_index: 0,
            explanation: "People describe past behaviour well but predict future use badly.",
          },
          {
            prompt: "In Issahaku's clinic research, what was the biggest pain he found?",
            options: [
              "Patients could not find the clinic",
              "Patients wanted a better app design",
              "Waiting without knowing when they would be seen",
              "The clinic had no phone",
            ],
            answer_index: 2,
            explanation: "Patients mostly booked through relatives; the real pain was waiting without information.",
          },
          {
            prompt: "Which of these counts as useful research data in a market setting?",
            options: [
              "Only answers to written questionnaires",
              "Shared phones, cracked screens and bright sun that you observe",
              "Only what the company manager believes",
              "Only data from an online survey",
            ],
            answer_index: 1,
            explanation: "Real conditions you observe are valuable evidence for design.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "field-research": {
      explanation_md: `## Why this matters

Many products in Ghana are used in busy, noisy, sunny places on shared or basic phones. You will only understand that by going there. Employers building for African markets value designers who can plan and run research respectfully in markets, communities, clinics and schools. Some adverts ask for experience of field research, and for languages spoken by the users.

## Plan before you go

A small study can be planned on one page:

* **Goal.** What decision will this research help with? For example: "Should our savings feature use USSD or a smartphone app?"
* **Questions.** Three to five things you need to learn.
* **People.** Who you need to meet. Include people who struggle, not only confident smartphone users.
* **Place and time.** Go where people already are, at a time that does not cost them sales. A market trader is busiest in the morning rush.
* **Language.** Decide who will speak Dagbani, Gurene, Dagaare, Mampruli or Twi if needed, and how you will translate notes.

## Finding the right people

Ask through people you trust: a market queen, an assembly member, a pastor or imam, a teacher, a cooperative leader. Explain the purpose honestly. Offer something fair for people's time, such as a small airtime top up or a drink, and agree it with your team in advance.

## Consent and privacy

Before you start, explain in simple words, in the person's language, who you are, why you are asking, how long it will take and how you will use what they say. Ask before you take a photo or record audio. Tell them they can stop at any time. Do not collect names, phone numbers or MoMo details unless you truly need them, and keep any notes safely. Ghana has a Data Protection Act, 2012 (Act 843), which sets rules for handling personal data, and the Data Protection Commission explains them.

## Observe in context

Watching often teaches more than asking. This is called contextual observation. Notice:

* how people hold the phone, and whether they share it
* light, noise and interruptions
* where they look for help, and who they ask
* workarounds, such as writing a PIN on paper or keeping a notebook of debts

## A small example

Sumaila is researching a bulk payment tool for a shea butter cooperative near Nalerigu. He visits on a market day with the cooperative leader, who introduces him in Mampruli. He watches the treasurer pay twelve women one by one through mobile money while also keeping a paper list. The treasurer types each number twice because she is afraid of sending money to the wrong person. Sumaila asks permission, photographs the paper list without names showing, and notes the fear of mistakes as a key finding.

## Keep it light

You do not need special equipment. A notebook, a pen, a phone for photos with permission, and respect are enough.`,
      practice_task_md: `**Goal:** plan and run a one hour observation in a real place.

**Steps**
1. Write a one page plan: goal, three questions, who, where, when, language and how you will ask consent.
2. Ask a trader, shop owner or group leader you know for permission to watch how they use their phone for business for one hour.
3. Read your consent words aloud to them first, in the language they prefer.
4. Take notes on what you see: devices, sharing, light, noise, workarounds, moments of worry. Take photos only with permission and keep faces and numbers out of them.
5. Afterwards write the five most surprising things you saw.

**Done looks like:** your plan, your consent words, a page of notes and five surprises. Remove any personal details before sharing it with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which should a research plan start with?",
            options: [
              "The colours of the final app",
              "The decision the research will help the team make",
              "A list of every person in the town",
              "The price of the product",
            ],
            answer_index: 1,
            explanation: "A plan starts with the goal: the decision the research will help with.",
          },
          {
            prompt: "What should you do before photographing or recording someone?",
            options: [
              "Nothing, if it is a public market",
              "Ask their permission and explain how you will use it",
              "Only ask if they are older than you",
              "Ask after you have taken the photo",
            ],
            answer_index: 1,
            explanation: "Ask before you photograph or record, and explain the purpose.",
          },
          {
            prompt: "Which Ghanaian law sets rules for handling personal data?",
            options: [
              "The Data Protection Act, 2012 (Act 843)",
              "The Labour Act",
              "The Road Traffic Act",
              "There is no such law in Ghana",
            ],
            answer_index: 0,
            explanation: "The Data Protection Act, 2012 (Act 843) covers personal data, explained by the Data Protection Commission.",
          },
          {
            prompt: "In Sumaila's example, what did the treasurer's habit of typing numbers twice reveal?",
            options: [
              "She did not know how to use a phone",
              "A fear of sending money to the wrong person",
              "The phone keyboard was broken",
              "She wanted a bigger screen",
            ],
            answer_index: 1,
            explanation: "The workaround showed a real fear of mistakes, a key finding for the design.",
          },
          {
            prompt: "When is a good time to observe a market trader?",
            options: [
              "During the morning rush, so you see the busiest moment and take up their selling time",
              "At a time agreed with them that does not cost them sales",
              "Only at night",
              "Without telling them",
            ],
            answer_index: 1,
            explanation: "Choose a time that respects their business and is agreed with them.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "user-interviews": {
      explanation_md: `## Why interviews matter

Interviews are the most common research method named in design adverts, from fintech companies in Accra to remote startups. A good interview tells you what people actually do, why they do it and what frustrates them. A bad interview just tells you what people think you want to hear.

## Ask about the past, not the future

The golden rule: ask about real past behaviour, not opinions or predictions.

* Weak: "Would you use an app to track your sales?" Most people say yes to be polite.
* Strong: "Tell me about the last time you checked how much you sold in a day. What did you do?"

The strong question gets a story, and stories contain the details you need.

## Open, not leading

**Open questions** start with what, how, tell me about, or walk me through. **Closed questions** get yes or no. **Leading questions** push an answer, such as "Don't you find mobile money confusing?" Avoid leading questions completely. Use closed questions only to check a fact.

Useful follow ups: "Why was that?", "What happened next?", "Can you show me?" Then stay quiet. Silence gives people time to add the important part.

## Running the session

* Start with easy questions about their day or work to build trust.
* Have five to eight main questions written down, but follow interesting answers.
* Listen more than you talk. Do not explain your idea or defend it.
* Take notes of exact words where you can. If they agree, a voice recording on your phone helps, kept private and deleted when no longer needed.
* End with "Is there anything I should have asked but didn't?"

Speak in the language the person is most comfortable in. If you use an interpreter, ask them to translate exactly, not to summarise.

## When a quick survey helps

Interviews tell you why. A survey tells you how common something is. After interviews with six traders show that some keep debts in a notebook, a short survey to forty traders can check whether that is rare or normal. Keep surveys very short, use simple words, and offer to read questions aloud. A free tool such as Google Forms works, but in many communities a person with a paper form or a phone call reaches more people than a link.

## A small example

Wumpini is designing a savings feature. Her notes from Mariama, a tomato seller:

> "Last Friday I had small change left so I gave it to my susu collector. I don't put it on MoMo because when it is on the phone I spend it."

That one sentence teaches Wumpini more than any yes or no answer could: for Mariama, keeping money out of easy reach is the point. A savings feature might need a lock or a waiting time, not just a balance screen.`,
      practice_task_md: `**Goal:** run and write up two short interviews.

**Steps**
1. Choose a topic, such as how people pay for data or how a small shop keeps track of stock.
2. Write six open questions about past behaviour. Check none of them is leading.
3. Interview two people for about fifteen minutes each, in the language they prefer. Ask consent first.
4. Write notes straight after, including at least three exact quotes.
5. Rewrite any question that did not work and say why.

**Done looks like:** your question list, two pages of notes with quotes, and your improved questions. Remove names before sharing.`,
      quiz: {
        questions: [
          {
            prompt: "Which interview question is strongest?",
            options: [
              "Would you use an app to track your sales?",
              "Tell me about the last time you checked how much you sold in a day.",
              "Don't you think tracking sales is important?",
              "Do you like apps?",
            ],
            answer_index: 1,
            explanation: "It asks about real past behaviour and invites a story.",
          },
          {
            prompt: "Which of these is a leading question?",
            options: [
              "What happened next?",
              "Can you show me how you did it?",
              "Don't you find mobile money confusing?",
              "How do you usually pay for data?",
            ],
            answer_index: 2,
            explanation: "It pushes the person towards an answer.",
          },
          {
            prompt: "What is a survey better at than an interview?",
            options: [
              "Understanding why people do something",
              "Checking how common something is across many people",
              "Building trust with one person",
              "Watching how people use a phone",
            ],
            answer_index: 1,
            explanation: "Interviews explain why; surveys check how common something is.",
          },
          {
            prompt: "What did Mariama's quote reveal to Wumpini?",
            options: [
              "Mariama wants a brighter app",
              "Keeping money out of easy reach matters to Mariama",
              "Mariama does not own a phone",
              "Mariama prefers banks",
            ],
            answer_index: 1,
            explanation: "She avoids MoMo savings because money on the phone gets spent.",
          },
          {
            prompt: "What should you ask an interpreter to do?",
            options: [
              "Summarise the main idea in a few words",
              "Translate exactly what is said",
              "Answer for the participant",
              "Explain your product idea",
            ],
            answer_index: 1,
            explanation: "Exact translation keeps the details that summaries lose.",
          },
        ],
        pass_threshold: 80,
      },
    },
    synthesis: {
      explanation_md: `## Why this matters

After research you will have pages of notes, quotes and photos. On their own they help nobody. Synthesis turns them into a few clear findings the team can act on. Personas, journey maps and problem statements appear in many design adverts because they are how designers share research with product managers, developers and clients.

## Step one: find patterns

Write each observation or quote on its own small note: a sticky note, a scrap of paper, or a card in a free whiteboard tool such as FigJam or Excalidraw. One idea per note. Then move the notes into groups that belong together and give each group a short name. This is often called affinity mapping.

Look for things several people said or did, strong emotions, workarounds and surprises. One person's opinion is a clue. The same thing from five people is a pattern.

## Step two: personas

A persona is a short, realistic description of a type of user, based on your research, not imagination. Keep it simple:

* a name and short description, such as "Hawa, cloth seller, shares a phone with her son"
* goals: what she is trying to get done
* frustrations: what gets in the way
* context: device, language, connection, where and when she uses it
* one real quote from research

Two or three personas are usually enough. Never invent details to make a persona look complete. If you do not know something, leave it out or research it.

## Step three: journey maps

A journey map shows the steps a person goes through over time, with what they do, think and feel at each step. Draw it as a row of boxes from left to right. Under each step, add a line that goes up for good moments and down for bad ones. The low points are where design can help most.

## Step four: problem statements

Finish with clear problem statements, often written as "How might we" questions:

* Problem: "Treasurers fear sending money to the wrong member, so they check every number twice and keep a paper list."
* How might we: "How might we help treasurers pay many members confidently without double work?"

A good problem statement describes the person, the need and the obstacle, without naming the solution.

## A small example

Abdul-Rahman interviews eight shop owners in Tamale about restocking. He groups his notes and sees three patterns: owners keep stock in their heads, they run out of fast moving items like sugar and sachet water, and they only notice when a customer asks. His persona "Fuseini, provisions shop owner, Kalpohin" and a journey map show the worst moment is the empty shelf. His how might we question: "How might we warn shop owners before fast moving items run out?"`,
      practice_task_md: `**Goal:** turn your interview notes into a persona, a journey map and a problem statement.

**Steps**
1. Take the notes from your interviews. Write each observation or quote on a separate scrap of paper or a card in a free whiteboard tool.
2. Group them and name each group.
3. Write one persona using only what you learned. Include one real quote.
4. Draw a journey map of five to seven steps with a line showing good and bad moments.
5. Write two "How might we" questions from the lowest points.

**Done looks like:** a photo of your grouped notes, one persona, one journey map and two how might we questions on a single page or slide.`,
      quiz: {
        questions: [
          {
            prompt: "What is affinity mapping?",
            options: [
              "Drawing the final screens",
              "Grouping research notes into themes that belong together",
              "Choosing brand colours",
              "Writing code for a map feature",
            ],
            answer_index: 1,
            explanation: "Affinity mapping groups notes into named themes to find patterns.",
          },
          {
            prompt: "What should a persona be based on?",
            options: [
              "The designer's imagination",
              "Research with real users",
              "A stock photo",
              "The company's sales targets",
            ],
            answer_index: 1,
            explanation: "Personas summarise real research; inventing details makes them misleading.",
          },
          {
            prompt: "On a journey map, where can design usually help most?",
            options: [
              "At the high points",
              "At the low points where people struggle",
              "At the first step only",
              "Nowhere, journey maps are only decoration",
            ],
            answer_index: 1,
            explanation: "Low points show frustration, which is where design can help.",
          },
          {
            prompt: "Which is the best problem statement?",
            options: [
              "Build a stock app with charts",
              "Shop owners run out of fast moving items because they only notice when a customer asks",
              "Make the shop look nicer",
              "Use blue buttons",
            ],
            answer_index: 1,
            explanation: "It names the person, the need and the obstacle without naming a solution.",
          },
        ],
        pass_threshold: 75,
      },
    },
// END NODES
  },
};

export default content;
