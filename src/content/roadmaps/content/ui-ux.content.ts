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
              "The logo and brand of a company",
              "The code that makes an app run",
              "How something works for the person using it, from start to finish",
            ],
            answer_index: 3,
            explanation: "UX is the experience of using something, including whether each step is clear and quick.",
          },
          {
            prompt: "Which of these is mainly a UI concern?",
            options: [
              "Whether customers understand why they should pay on time",
              "The size, colour and wording of a Pay button",
              "Which steps a trader takes to check her balance",
              "Whether customers own a smartphone",
            ],
            answer_index: 1,
            explanation: "UI is what people see and touch, such as buttons, words and colours.",
          },
          {
            prompt: "In the solar lamp example, why did Fuseini not simply make the app prettier?",
            options: [
              "He learned that most customers never opened the app and paid through USSD on basic phones",
              "The founder had no budget for design",
              "Pretty apps are not allowed in Ghana",
              "He did not know how to use a design tool",
            ],
            answer_index: 0,
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
            options: [
              "Visual design",
              "Motion design",
              "User research",
              "Information architecture",
            ],
            answer_index: 3,
            explanation: "Information architecture is about how content and features are organised and labelled.",
          },
          {
            prompt: "What does a product designer usually do?",
            options: [
              "Only draws logos",
              "Works across research, flows and visuals and thinks about business goals with product and engineering",
              "Only writes code for the app",
              "Only manages social media pages",
            ],
            answer_index: 1,
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
              "Parents need to pay fees in parts and see what they still owe, without keeping paper",
              "Build a fees app",
              "Make the school website blue",
              "Use the newest design tool",
            ],
            answer_index: 0,
            explanation: "A defined problem describes what people need and what gets in their way, not a solution.",
          },
          {
            prompt: "Why is the design process called a loop?",
            options: [
              "Because you only do each stage once",
              "Because designs must be round",
              "Because testing often sends you back to earlier stages to improve the design",
              "Because developers start before designers",
            ],
            answer_index: 2,
            explanation: "You go round more than once, using what tests show to improve the design.",
          },
          {
            prompt: "What matters most at the ideate stage?",
            options: [
              "Polished, final screens",
              "Choosing colours",
              "Writing the code",
              "Sketching many possible solutions quickly",
            ],
            answer_index: 3,
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
              "Developers work for free in the early stages",
              "Fixing a paper sketch costs almost nothing compared with changing built software",
              "Users do not notice early problems",
              "Early designs never have problems",
            ],
            answer_index: 1,
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
              "To replace assumptions with evidence about real users",
              "To make the design look modern",
              "To collect as many feature requests as possible",
              "To test the code for bugs",
            ],
            answer_index: 0,
            explanation: "Research gives you evidence about who users are and what they need, instead of guesses.",
          },
          {
            prompt: "Why is asking people which features they want not a reliable method?",
            options: [
              "Users always want the same features",
              "It takes too long to ask",
              "Features are decided by law",
              "People are poor at predicting what they will actually use",
            ],
            answer_index: 3,
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
              "Shared phones, cracked screens and bright sun that you observe",
              "Only answers to written questionnaires",
              "Only what the company manager believes",
              "Only data from an online survey",
            ],
            answer_index: 0,
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
              "Ask after you have taken the photo",
              "Only ask if they are older than you",
              "Ask their permission and explain how you will use it",
            ],
            answer_index: 3,
            explanation: "Ask before you photograph or record, and explain the purpose.",
          },
          {
            prompt: "Which Ghanaian law sets rules for handling personal data?",
            options: [
              "The Road Traffic Act",
              "The Labour Act",
              "The Data Protection Act, 2012 (Act 843)",
              "There is no such law in Ghana",
            ],
            answer_index: 2,
            explanation: "The Data Protection Act, 2012 (Act 843) covers personal data, explained by the Data Protection Commission.",
          },
          {
            prompt: "In Sumaila's example, what did the treasurer's habit of typing numbers twice reveal?",
            options: [
              "A fear of sending money to the wrong person",
              "She did not know how to use a phone",
              "The phone keyboard was broken",
              "She wanted a bigger screen",
            ],
            answer_index: 0,
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
              "Don't you think tracking sales is important?",
              "Tell me about the last time you checked how much you sold in a day.",
              "Do you like apps?",
            ],
            answer_index: 2,
            explanation: "It asks about real past behaviour and invites a story.",
          },
          {
            prompt: "Which of these is a leading question?",
            options: [
              "What happened next?",
              "Can you show me how you did it?",
              "How do you usually pay for data?",
              "Don't you find mobile money confusing?",
            ],
            answer_index: 3,
            explanation: "It pushes the person towards an answer.",
          },
          {
            prompt: "What is a survey better at than an interview?",
            options: [
              "Understanding why people do something",
              "Building trust with one person",
              "Checking how common something is across many people",
              "Watching how people use a phone",
            ],
            answer_index: 2,
            explanation: "Interviews explain why; surveys check how common something is.",
          },
          {
            prompt: "What did Mariama's quote reveal to Wumpini?",
            options: [
              "Mariama wants a brighter app",
              "Mariama prefers banks",
              "Mariama does not own a phone",
              "Keeping money out of easy reach matters to Mariama",
            ],
            answer_index: 3,
            explanation: "She avoids MoMo savings because money on the phone gets spent.",
          },
          {
            prompt: "What should you ask an interpreter to do?",
            options: [
              "Translate exactly what is said",
              "Summarise the main idea in a few words",
              "Answer for the participant",
              "Explain your product idea",
            ],
            answer_index: 0,
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
              "Nowhere, journey maps are only decoration",
              "At the first step only",
              "At the low points where people struggle",
            ],
            answer_index: 3,
            explanation: "Low points show frustration, which is where design can help.",
          },
          {
            prompt: "Which is the best problem statement?",
            options: [
              "Build a stock app with charts",
              "Make the shop look nicer",
              "Shop owners run out of fast moving items because they only notice when a customer asks",
              "Use blue buttons",
            ],
            answer_index: 2,
            explanation: "It names the person, the need and the obstacle without naming a solution.",
          },
        ],
        pass_threshold: 75,
      },
    },
    structure: {
      explanation_md: `## Why structure comes before colour

A common beginner mistake is to open a design tool and start choosing colours and fonts on day one. Experienced designers do the opposite. They first decide what the product contains, how it is organised and which steps people take to finish a task. Only then do they make it look good.

The reason is cost. Moving a box on a paper sketch takes seconds. Changing the structure of a finished, coloured design takes hours. Changing it after developers have built it takes days. Employers notice designers who think about structure first, because those designers save the team time and money.

## What this section covers

* **Information architecture.** How to organise content and features into groups and menus, and how to name them in words your users actually use.
* **User flows.** How to map every step a person takes to complete a task, including mistakes, errors and the moment the network drops.
* **Wireframes and sketches.** How to draw simple screens, on paper first, then as plain grey layouts, so you can test ideas cheaply.

These three build on each other. The information architecture decides what exists and where it lives. The flows decide how people move through it. The wireframes show what each step looks like on a screen.

## Structure in the Ghanaian setting

Good structure matters even more when people use small, older phones, pay for data, or are less confident readers. Every extra screen costs time and data. Every confusing label risks someone calling customer care or giving up. A short, clear structure is a kindness to users and a saving for the business.

It also matters for channels that are not apps at all. A USSD menu, an SMS conversation or an interactive voice menu has structure too: options, order and wording. The same thinking applies, and in those channels you have even less room for mistakes because the screen is tiny or there is no screen.

## A small example

Mariama is helping a church in Tamale design a simple website for members. The pastor's first list of pages is long: About, History, Vision, Mission, Leadership, Departments, Youth, Women's Fellowship, Men's Fellowship, Programmes, Calendar, Donations, Tithes, Welfare, Contact, Gallery.

Before designing any page, Mariama asks five members what they come to the website for. Almost all say three things: service times, upcoming events and how to give. So she groups the content into four main sections: **Services and events**, **Give**, **Groups** and **About us**, with the rest placed inside them. Then she sketches the flow for "give towards the building fund by mobile money" in five boxes on paper. Only after members can follow that flow does she start on colours.

## What you will be able to do

By the end of this section you will be able to organise a product's content, draw the steps for its key tasks and sketch screens that you can test with real people in an afternoon, using only paper, a pen and, if you like, a free tool.`,
      practice_task_md: `**Goal:** separate structure from looks in a real app.

**Steps**
1. Choose an app or USSD service you use often, for example a mobile money menu or a bank app.
2. Without worrying about colours, write down its main sections or menu options in a list.
3. Pick one task, such as buying airtime, and write each step as a numbered line.
4. Mark any step that felt unnecessary or any label you did not understand at first.

**Done looks like:** a list of the main sections, a numbered list of steps for one task, and at least two marked problems with one sentence each on why they confuse people.`,
      quiz: {
        questions: [
          {
            prompt: "Why do experienced designers decide structure before colours?",
            options: [
              "Changing structure is cheap early and expensive later",
              "Colours are not important",
              "Design tools do not support colour at first",
              "Clients never ask about colour",
            ],
            answer_index: 0,
            explanation: "Moving boxes on a sketch is quick; changing built structure is slow and costly.",
          },
          {
            prompt: "What does information architecture decide?",
            options: [
              "How fast the server responds",
              "Which font to use",
              "What content exists and how it is grouped and named",
              "The price of the product",
            ],
            answer_index: 2,
            explanation: "Information architecture organises and labels content and features.",
          },
          {
            prompt: "Does structure matter for a USSD menu?",
            options: [
              "No, only apps have structure",
              "Only if it has pictures",
              "Only on smartphones",
              "Yes, options, order and wording are structure, with even less room for mistakes",
            ],
            answer_index: 3,
            explanation: "USSD, SMS and voice menus all have structure, and small screens make it more critical.",
          },
          {
            prompt: "How did Mariama decide the church website's main sections?",
            options: [
              "She asked members what they come for and grouped content around that",
              "She copied another church's website",
              "She used the pastor's full list as it was",
              "She picked the sections with the nicest photos",
            ],
            answer_index: 0,
            explanation: "Members' real needs guided the grouping into four main sections.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "information-architecture": {
      explanation_md: `## Why this matters

If people cannot find something, it might as well not exist. A mobile money service may offer bill payment, but if it is hidden under a menu called "Financial services" that nobody opens, customers will think it is missing and go elsewhere. Information architecture, often shortened to IA, is the skill of organising and labelling content so people find it without thinking hard. Several design adverts list it directly.

## The main ideas

**Group by how users think, not how the company is organised.** A bank may have separate teams for cards, loans and savings, but a customer thinks "I want to send money" or "I want to see my balance". Organise around the customer's tasks.

**Use the user's words.** Companies love internal terms like "Merchant disbursement" or "Value added services". Users say "pay a shop" or "buy data". Your research notes and interview quotes are full of the right words, so use them. If people mix English and a local language, notice which words they keep in English, such as "MoMo", "credit" or "data".

**Keep the top level short.** On a phone, show the few most common tasks first. Put rarer things one level down. A long list of equal options makes everyone read everything.

**Be consistent.** If you call it "Send money" on one screen, do not call it "Transfer" on the next.

## Card sorting: a simple IA method

Card sorting lets users show you how they group things.

1. Write each feature or piece of content on a small card, such as "Buy airtime", "Pay ECG bill", "Check balance", "Change PIN".
2. Ask a participant to sort the cards into groups that make sense to them.
3. Ask them to name each group in their own words.
4. Repeat with five or more people and look for common patterns.

You can do this with paper cards at a market stall or with a free online whiteboard. Paper often works better in person, because it needs no data and anyone can join in.

## Tree testing: checking your structure

Once you have a structure, test it without any visual design. Write the menu as a simple numbered list, then give people a task: "Where would you go to pay for your child's school fees?" Watch which path they choose. If many people go to the wrong place, rename or regroup.

## A small example

Hawa is organising a farm advisory service for an NGO in the Upper East Region. The original menu was: 1. Agronomy, 2. Market linkages, 3. Inputs, 4. Finance. Farmers in her card sort grouped things differently and used different words. The new menu became: 1. Weather and planting, 2. Pests and diseases, 3. Prices at the market, 4. Buy seeds and fertiliser, 5. Loans and savings. In her tree test, more farmers found the right option on their first try, and nobody needed to ask what "agronomy" meant.`,
      practice_task_md: `**Goal:** run a paper card sort and improve a menu.

**Steps**
1. Choose a service, such as a school app for parents or a provisions shop's ordering service.
2. Write twelve to fifteen features or content items on small pieces of paper.
3. Ask three people to sort them into groups and name each group. Write down their names exactly.
4. Design a new top level menu of no more than five items using their words.
5. Test it: give two other people a task and see if they choose the right menu item.

**Done looks like:** photos of the three card sorts, your new menu, and notes from the two quick tests.`,
      quiz: {
        questions: [
          {
            prompt: "How should you group features in a banking app?",
            options: [
              "By the bank's internal departments",
              "By customer tasks such as sending money or checking a balance",
              "Alphabetically, always",
              "By which team built them",
            ],
            answer_index: 1,
            explanation: "Group around how users think and what they want to do.",
          },
          {
            prompt: "Which label is likely to work best for most users?",
            options: [
              "Value added services",
              "Buy data",
              "Merchant disbursement",
              "Ancillary products",
            ],
            answer_index: 1,
            explanation: "It uses the words users actually say.",
          },
          {
            prompt: "What happens in a card sort?",
            options: [
              "Users sort cards of features into groups and name them",
              "Designers sort users by age",
              "Developers test the code",
              "Users rate colours from one to five",
            ],
            answer_index: 0,
            explanation: "Card sorting shows how users group and name content.",
          },
          {
            prompt: "What does a tree test check?",
            options: [
              "Whether the app loads quickly",
              "Whether farmers own phones",
              "Whether the colours look good",
              "Whether people can find things in your structure, without any visual design",
            ],
            answer_index: 3,
            explanation: "A tree test checks the menu structure on its own, as a plain list.",
          },
          {
            prompt: "Why did Hawa change the menu item Agronomy?",
            options: [
              "The NGO asked for longer words",
              "It was too short",
              "Farmers did not use or understand that word",
              "It was spelled wrongly",
            ],
            answer_index: 2,
            explanation: "Farmers used different words, so the new labels matched their language.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "user-flows": {
      explanation_md: `## Why flows matter

A single screen can look perfect and still be part of a broken journey. Users do not experience screens one by one; they experience a task from start to finish. User flows show that whole journey, and they are one of the most commonly requested skills in junior design adverts.

## What a user flow is

A user flow is a diagram of the steps a person takes to complete one task. It shows:

* **Where they start**, for example opening the app or dialling a USSD code
* **Each screen or step** along the way
* **Decisions**, such as "Is the PIN correct?"
* **Where it ends**: success, or a clear way out

Use simple shapes. Rectangles for screens or steps, diamonds for decisions, arrows for movement. You can draw it on paper or in a free tool such as Excalidraw or FigJam.

## Do not forget the unhappy paths

The "happy path" is when everything goes right. Real life is different, especially in places where networks drop and phones are shared. A good flow also covers:

* wrong PIN or wrong number entered
* not enough balance
* the network drops halfway
* the session times out on USSD
* the user presses back or changes their mind
* the payment is pending and nobody knows if it worked

These moments cause the most fear and the most calls to customer care. Many problems hide here, not on the happy path.

## Count the steps

Once a flow is drawn, count the steps. Ask of each step: is it needed? Can two steps become one? Can the system remember something so the user does not retype it? Every step you remove saves time, data and mistakes.

## A small example

Fuseini maps the flow for paying an electricity bill by mobile money:

1. Dial the short code
2. Choose Pay bill
3. Choose Electricity
4. Enter meter number
5. Confirm name on the account
6. Enter amount
7. Enter PIN
8. See success message and receive SMS

Then he adds unhappy paths. At step 4, a wrong meter number shows "Account not found" with no hint, and users start again from the beginning. At step 7, if the network drops, users do not know whether they paid, so some pay twice.

His improvements: let users choose from recently used meter numbers, show the account name clearly before payment so mistakes are caught, and after a dropped session send an SMS that says clearly whether the payment went through. None of these needed new screens; they came from seeing the whole journey.

## Flows for different channels

The same task can have a different flow on a smartphone app, a USSD menu and a phone call to an agent. Draw each channel your users really use, since your research may show that many of them never open the app.`,
      practice_task_md: `**Goal:** draw a complete flow, including what goes wrong.

**Steps**
1. Pick a real task, such as buying a data bundle or registering for an exam online.
2. Do the task yourself (or watch someone) and write down every step.
3. Draw the flow on paper with rectangles, diamonds and arrows.
4. Add at least three unhappy paths: a mistake, a network drop and a change of mind.
5. Mark one step you would remove or merge, and explain why.

**Done looks like:** one flow diagram with happy and unhappy paths and a short note suggesting at least one improvement.`,
      quiz: {
        questions: [
          {
            prompt: "What does a diamond usually show in a user flow?",
            options: [
              "A screen",
              "A decision, such as whether the PIN is correct",
              "The end of the flow",
              "A colour choice",
            ],
            answer_index: 1,
            explanation: "Diamonds show decisions; rectangles show screens or steps.",
          },
          {
            prompt: "Which is an unhappy path?",
            options: [
              "The user pays successfully",
              "The user opens the app",
              "The network drops during payment",
              "The user sees the home screen",
            ],
            answer_index: 2,
            explanation: "Unhappy paths are where something goes wrong, like a network drop.",
          },
          {
            prompt: "Why should designers count the steps in a flow?",
            options: [
              "To make the flow longer",
              "Because developers are paid per step",
              "To decide the price",
              "To find steps that can be removed or merged, saving time and mistakes",
            ],
            answer_index: 3,
            explanation: "Fewer steps mean less time, less data and fewer mistakes.",
          },
          {
            prompt: "What problem did Fuseini find when the network dropped at the PIN step?",
            options: [
              "Users did not know whether they had paid, so some paid twice",
              "Users could not see the colours",
              "Users forgot the short code",
              "Users chose the wrong bill type",
            ],
            answer_index: 0,
            explanation: "Without a clear result, users were unsure and sometimes paid again.",
          },
        ],
        pass_threshold: 75,
      },
    },
    wireframes: {
      explanation_md: `## Why wireframes matter

Wireframes are simple drawings of screens that show layout and content without colour or decoration. They let you and your team agree on what goes on each screen before anyone spends time on visual polish. Almost every junior design advert asks for wireframing, and your sketches are good material for a case study because they show your thinking.

## Start on paper

Paper is fast, free and needs no data or laptop. You can draw ten versions of a screen in the time it takes to draw one carefully on a computer.

A useful method is the quick sketch round:

1. Fold an A4 sheet into eight boxes.
2. Set a timer for eight minutes.
3. Draw a different idea for the same screen in each box, about one minute each.
4. Pick the strongest one or two, and combine the best parts.

Draw phone shaped boxes, use rough lines for text, boxes with a cross for images and clear rectangles for buttons. Write real labels on buttons, such as "Send money", not "Button".

## Low fidelity and high fidelity

* **Low fidelity** wireframes are rough: paper or plain grey boxes. They are for exploring and testing ideas.
* **Mid fidelity** wireframes are neat grey layouts in a tool, with real text and spacing but still no colour.
* **High fidelity** designs look like the finished product, with colour, type and images. You will learn these in the interface design section.

Stay low fidelity for as long as you are still deciding structure. People give more honest feedback on rough sketches, because they do not worry about hurting your feelings.

## What to show in a wireframe

* the most important content and action, placed first
* real or realistic text, including long names, such as "Abdul-Rahman Iddrisu Mahama", to check they fit
* the states of a screen: empty (no data yet), loading, error and success
* where the thumb reaches on a phone, keeping main actions near the bottom or middle

## Testing paper sketches

Paper sketches can be tested in a market or a classroom. Show the first sketch, ask the person "What would you tap to pay for your data?" and when they point, swap to the next sketch. This is called paper prototyping. It works well in places where showing a laptop would draw a crowd or feel intimidating.

## A small example

Amina is designing a stock screen for a provisions shop in Wa. Her first sketch shows a long list of all items. When she tests it with the owner, he scrolls past everything looking for what is about to run out. Her second sketch puts a "Running low" box at the top with three items, then the full list below. The owner points to the box straight away. One minute of drawing saved a week of building the wrong screen.

## Moving to a tool

When the structure is stable, recreate your best sketches as grey wireframes in a free browser tool such as Figma or Penpot. Keep them simple and use them to test flows before adding visual design.`,
      practice_task_md: `**Goal:** sketch, test and improve one screen.

**Steps**
1. Choose one screen from your earlier flow, such as "confirm payment".
2. Fold a sheet into eight boxes and sketch eight different versions in eight minutes.
3. Choose the best and redraw it neatly, with real labels and an error state.
4. Show it to two people and ask them to point to what they would tap to complete the task.
5. Draw an improved version based on what you saw.

**Done looks like:** photos of your eight sketches, your neat version, notes from two tests and your improved sketch.`,
      quiz: {
        questions: [
          {
            prompt: "What does a wireframe show?",
            options: [
              "Final colours and photos",
              "The app's source code",
              "Layout and content without colour or decoration",
              "The marketing plan",
            ],
            answer_index: 2,
            explanation: "Wireframes focus on layout and content, not visual polish.",
          },
          {
            prompt: "Why do people often give more honest feedback on rough sketches?",
            options: [
              "Sketches are harder to understand",
              "They do not worry about hurting the designer's feelings",
              "Sketches are always correct",
              "They cannot see rough sketches clearly",
            ],
            answer_index: 1,
            explanation: "Rough work feels unfinished, so people feel free to criticise it.",
          },
          {
            prompt: "Which of these should a wireframe include?",
            options: [
              "Empty, loading, error and success states",
              "Fake text in Latin",
              "Only the success state",
              "Final brand colours",
            ],
            answer_index: 0,
            explanation: "Showing every state avoids surprises when the product is built.",
          },
          {
            prompt: "What did Amina change after testing the stock screen?",
            options: [
              "She changed the colours",
              "She made the list longer",
              "She removed all items",
              "She added a Running low box at the top",
            ],
            answer_index: 3,
            explanation: "The owner looked for low stock, so she put it first.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "interface-design": {
      explanation_md: `## Why interface design matters

Once the structure works, people still need screens that are clear, comfortable and trustworthy. Interface design is where your wireframes become polished, consistent screens that developers can build. It is the part of the job most visible in a portfolio, and adverts for UI designer and product designer roles always ask for it.

A good interface is not about decoration. It helps people see what matters, understand what to do next and trust that their money, data or time is safe. In fintech especially, a clean and consistent interface signals trust.

## What this section covers

* **Design tool basics.** How to use a browser based design tool with a free plan, such as Figma or Penpot: frames, layers, auto layout, components and simple prototypes.
* **Typography, colour and layout.** How to create clear hierarchy with type sizes, spacing, alignment and colour, with enough contrast to read outdoors in strong sun.
* **Mobile and responsive layouts.** Platform conventions for Android and iOS, touch targets for thumbs, one handed use, and how a layout adapts from a small phone to a laptop.
* **Components and design systems.** Reusable buttons, inputs and cards that keep a product consistent and make developers' work easier.

## Principles that run through all of it

* **Hierarchy.** The most important thing on the screen should be the most noticeable. If everything is bold, nothing stands out.
* **Consistency.** The same action should look and behave the same everywhere. This helps users learn quickly.
* **Feedback.** Every tap should get a response, such as a button changing, a spinner or a message.
* **Forgiveness.** Make mistakes easy to undo, and confirm before anything costly, such as sending money.
* **Restraint.** Fewer colours, fewer fonts and fewer elements usually make a clearer screen.

## Design for the phone in the hand

Many users in Ghana use mid range or older Android phones, often with small screens, cracked glass or low brightness to save battery. They may be outdoors at a market or on a moving trotro. Test your designs on a real, modest phone in daylight, not only on a big laptop screen.

## A small example

Wumpini turns her grey wireframe of a savings screen into a finished design. At first she uses four colours, three fonts and a large photo at the top. On her own phone outside, the photo pushes the balance below the fold and the light grey text disappears in the sun. She removes the photo, uses one font in three sizes, one strong brand colour for the main button and dark text on a light background. The balance is now the first thing anyone sees, the screen loads faster and it reads well outdoors.

## How to approach this section

Learn the tool alongside the principles, not instead of them. A designer who knows every tool shortcut but cannot explain hierarchy is less useful than one who can sketch a clear screen on paper. Practise both, and keep testing on real phones.`,
      practice_task_md: `**Goal:** critique a real interface using the five principles.

**Steps**
1. Take a screenshot of one screen from an app you use, such as a mobile money or bank app home screen.
2. Write one line for each principle: hierarchy, consistency, feedback, forgiveness and restraint. Is it done well or badly here?
3. Open the screenshot on your phone outdoors in daylight and note what becomes hard to read.
4. Sketch one improvement on paper.

**Done looks like:** your screenshot with five notes, an outdoor reading note and one improvement sketch.`,
      quiz: {
        questions: [
          {
            prompt: "What does hierarchy mean in interface design?",
            options: [
              "The company's management structure",
              "Every element is bold",
              "The most important thing on the screen is the most noticeable",
              "The order in which screens were designed",
            ],
            answer_index: 2,
            explanation: "Hierarchy guides the eye to what matters most.",
          },
          {
            prompt: "Which principle is about confirming before costly actions and making mistakes easy to undo?",
            options: [
              "Restraint",
              "Hierarchy",
              "Consistency",
              "Forgiveness",
            ],
            answer_index: 3,
            explanation: "Forgiveness protects users from costly mistakes.",
          },
          {
            prompt: "Why should you test designs on a modest phone outdoors?",
            options: [
              "Because laptops are not allowed",
              "Because many users have older phones and use them in strong sun",
              "Because it is faster to design on a phone",
              "Because colours look the same everywhere",
            ],
            answer_index: 1,
            explanation: "Real conditions reveal problems like low contrast and small text.",
          },
          {
            prompt: "What problem did Wumpini notice when she checked her design outside?",
            options: [
              "Light grey text disappeared in the sun and the photo pushed the balance down",
              "The button was too large",
              "The app would not open",
              "The font was too dark",
            ],
            answer_index: 0,
            explanation: "Outdoor testing showed the photo and low contrast text hurt clarity.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "design-tools": {
      explanation_md: `## Why a design tool matters

Nearly every UI/UX and product design advert, in Ghana and remote, names a design tool, and Figma is the one mentioned most often. Employers expect you to build screens, components and simple prototypes in a tool and share them with developers. The good news: you can learn the core skills for free in a web browser on a modest laptop.

## Choosing a free tool

Two examples that run in the browser and have free plans:

* **Figma** has a free Starter plan with limits on some features, and it is widely used by employers.
* **Penpot** is open source and free, and also runs in the browser.

The ideas below work in both. Learn one well; the skills transfer. If you only have a phone, you can still view and test prototypes on it, but building screens is much easier on a laptop, even an older one. Some learners use a laptop at a community hub, library or school lab for a few hours a week.

To save data, close other tabs, avoid uploading large photos, and work on one file at a time.

## The core building blocks

**Frames.** A frame is a container, usually the size of a phone screen. Start with a common Android size such as 360 by 800. Everything you design sits inside frames.

**Layers and groups.** Each text, shape and image is a layer. Name your layers clearly ("Pay button", not "Rectangle 12"). It helps you and the developers.

**Auto layout.** Auto layout (called flex layout in Penpot) makes elements arrange themselves in a row or column with set spacing. If a button's label gets longer, the button grows. If you add an item to a list, everything moves down. This is how real apps behave, and adverts often mention it.

**Components.** A component is a reusable master element, such as a button. You place copies, called instances, across your screens. Change the master and every copy updates. Variants let one component have versions, such as primary and secondary, or normal and disabled.

**Styles and variables.** Save your colours, text sizes and spacing as named styles so you reuse them consistently.

**Prototyping.** Link frames together so tapping a button moves to the next screen. You can then open the prototype on a phone to test it.

## A small example

Issahaku builds a "Send money" flow in Figma. He makes one frame per step, builds a button component with primary and disabled variants, and uses auto layout for the list of recent contacts. When his mentor asks him to rename "Continue" to "Next", he changes the master component once and all six screens update. He then links the frames into a prototype and tests it on his phone with two friends.

## Good habits from day one

* Keep pages tidy: one page for wireframes, one for final screens, one for components.
* Use real Ghanaian content, such as names, cedi amounts and phone number formats, to see how text fits.
* Learn keyboard shortcuts slowly, a few at a time.
* Use the official help centre and free tutorials from the tool's makers rather than paid courses.`,
      practice_task_md: `**Goal:** build a small reusable screen in a free browser design tool.

**Steps**
1. Create a free account in a browser design tool such as Figma or Penpot.
2. Make a phone sized frame and build a "Buy data" screen: a title, three bundle options and a button.
3. Turn the button into a component with two variants: normal and disabled.
4. Use auto layout (or flex layout) for the list of bundles so it adjusts when you add a fourth.
5. Make a second frame for "Confirm purchase" and link them as a prototype. Open it on your phone.

**Done looks like:** two linked frames, a button component with two variants and a list that adjusts automatically. Share the view link with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What happens when you change a master component?",
            options: [
              "Nothing happens to the copies",
              "Every instance of it updates",
              "The file is deleted",
              "Only the first copy changes",
            ],
            answer_index: 1,
            explanation: "Instances follow their master component, so changes spread everywhere.",
          },
          {
            prompt: "What does auto layout do?",
            options: [
              "Translates text into Dagbani",
              "Chooses colours automatically",
              "Writes the app's code",
              "Arranges elements in a row or column with set spacing and adjusts when content changes",
            ],
            answer_index: 3,
            explanation: "Auto layout makes designs resize and reflow like real apps.",
          },
          {
            prompt: "Which of these is a sensible way to save data while designing?",
            options: [
              "Upload many large photos",
              "Keep twenty tabs open",
              "Avoid large images and work on one file at a time",
              "Download every free template",
            ],
            answer_index: 2,
            explanation: "Fewer heavy files and tabs means less data used.",
          },
          {
            prompt: "Why should you name layers clearly, such as Pay button?",
            options: [
              "It helps you and developers understand the file",
              "Tools refuse unnamed layers",
              "It makes the file smaller",
              "It changes the colour of the layer",
            ],
            answer_index: 0,
            explanation: "Clear names make files easier to work with and hand over.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "visual-design": {
      explanation_md: `## Why visual design matters

Visual design is how a screen guides the eye, builds trust and stays readable. Adverts ask for typography, colour, layout and visual hierarchy because a clear screen helps customers finish tasks and makes a business look reliable. In Ghana it also has a practical side: screens must work on modest phones, in bright sun, for people who may not read quickly.

## Typography

* **Pick one font family.** A clear, free font such as Roboto, Inter or Noto Sans works well. The Noto family also covers many African language characters, such as the letters used in Dagbani and Ewe.
* **Use a small type scale.** Three or four sizes are enough: a large title, a medium heading, body text and small captions. On phones, body text of about 16 pixels is a common comfortable starting point.
* **Use weight for emphasis.** Regular for body, bold for key numbers and headings. Avoid all capitals for long text; it is harder to read.
* **Keep lines short and spacing generous.** Line height of around one and a half times the text size helps reading.

## Colour

* **Start with neutrals.** Dark text on a light background, or the reverse, does most of the work.
* **One main brand colour** for the primary action. If every button is bright, nothing stands out.
* **Meaning colours** for success, warning and error. Never rely on colour alone; add an icon or words, because some people cannot tell red from green.
* **Contrast.** The WCAG guidelines ask for a contrast ratio of at least 4.5 to 1 for normal text and 3 to 1 for large text. Free contrast checkers online will measure it for you. Strong sun makes weak contrast even worse, so aim higher where you can.

## Layout and spacing

* **Use a spacing scale.** Many teams use multiples of 4 or 8 pixels (8, 16, 24, 32) for gaps and padding, so screens feel orderly.
* **Align things.** Text and elements that share a left edge look calm and are easier to scan.
* **Group related items** with closer spacing and separate unrelated ones with more space. This is the idea of proximity.
* **Give the main action room.** White space is not wasted; it helps people focus.

## Hierarchy in practice

Ask: what should someone see first, second and third? On a mobile money home screen the answer might be balance first, main actions second, recent transactions third. Use size, weight, colour and position to match that order.

## A small example

Amina designs a receipt screen for a chop bar's ordering app in Tamale. Version one has the restaurant logo huge at the top, the total in small grey text and four colours. Customers in her test struggle to find the total. Version two puts "Paid: GH₵ 45.00" in large bold text near the top with a green tick and the word "Paid", the order list below in regular text, and one brand colour for the "Order again" button. Now people find the total at a glance, and colour blind users still see "Paid".`,
      practice_task_md: `**Goal:** restyle a screen using a type scale, spacing scale and accessible colours.

**Steps**
1. Take one of your grey wireframes, such as a receipt or balance screen.
2. Choose one free font and define four text sizes. Write them down.
3. Choose one brand colour, one dark text colour, one light background and colours for success and error.
4. Check each text and background pair with a free online contrast checker. Fix any that fail 4.5 to 1.
5. Apply an 8 pixel spacing scale and align everything to a common left edge.
6. View it on your phone outdoors and adjust anything hard to read.

**Done looks like:** a before and after of the same screen, with your type scale, colours and contrast results noted beside it.`,
      quiz: {
        questions: [
          {
            prompt: "What minimum contrast ratio does WCAG ask for normal text?",
            options: [
              "2 to 1",
              "4.5 to 1",
              "10 to 1",
              "3 to 1",
            ],
            answer_index: 1,
            explanation: "WCAG asks for at least 4.5 to 1 for normal text and 3 to 1 for large text.",
          },
          {
            prompt: "Why should you not rely on colour alone to show success or error?",
            options: [
              "Some people cannot tell certain colours apart, so words or icons are needed too",
              "Colours cost more data",
              "Phones cannot show green",
              "WCAG bans the colour red",
            ],
            answer_index: 0,
            explanation: "Adding words or icons makes meaning clear for colour blind users.",
          },
          {
            prompt: "What does proximity mean in layout?",
            options: [
              "Putting everything as far apart as possible",
              "Making all text bold",
              "Grouping related items closer and separating unrelated ones",
              "Using only one colour",
            ],
            answer_index: 2,
            explanation: "Spacing shows which items belong together.",
          },
          {
            prompt: "In Amina's improved receipt, what helped colour blind users?",
            options: [
              "A bigger logo",
              "Four extra colours",
              "Smaller text",
              "The word Paid and a tick next to the green colour",
            ],
            answer_index: 3,
            explanation: "Words and icons carry the meaning even if the colour is not seen.",
          },
          {
            prompt: "Which spacing approach do many teams use?",
            options: [
              "Multiples of 4 or 8 pixels",
              "Random gaps chosen by eye each time",
              "No spacing at all",
              "A different gap for every screen",
            ],
            answer_index: 0,
            explanation: "A spacing scale keeps screens orderly and consistent.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "mobile-patterns": {
      explanation_md: `## Why this matters

In Ghana, the phone is the main way most people go online. Many design adverts ask for mobile and responsive design for web and apps. Designing well for phones means following familiar patterns so people do not have to learn something new, and making layouts that adapt to every screen size.

## Follow platform conventions

Android and iOS each publish free design guidelines: Material Design for Android and the Human Interface Guidelines for Apple. Most phones in Ghana run Android, but check your own research. Conventions to know:

* **Bottom navigation** with three to five main destinations is common and easy to reach with a thumb.
* **The back action** is expected to work. On Android many people use the system back gesture or button, so never trap them.
* **A clear primary button** for the main action on each screen.
* **Standard icons** for common actions, such as a magnifying glass for search, always with a text label when there is room.

Using familiar patterns is not lazy. It means users can spend their attention on their task, not on learning your app.

## Touch targets and thumbs

Fingers are less precise than a mouse. Material Design recommends touch targets of at least 48 by 48 density independent pixels, and Apple suggests at least 44 by 44 points. WCAG 2.2 sets a minimum of 24 by 24 CSS pixels at its AA level. Leave space between targets so people do not tap the wrong one.

Many people use their phone with one hand while carrying goods, holding a child or serving customers. The bottom and middle of the screen are easiest to reach. Put the main actions there and keep rare or risky actions, such as "Delete account", away from the thumb's natural path.

## Forms on phones

* Use the right keyboard: number pad for amounts and phone numbers.
* Keep forms short and ask only for what you need.
* Put labels above fields, not only as placeholder text that disappears.
* Show errors next to the field, in plain words, such as "Phone number should have 10 digits".

## Responsive layouts

A responsive layout adapts to the screen. Design **mobile first**: start with the smallest screen, then decide how the layout grows. On a phone, cards stack in one column. On a tablet they may sit in two columns. On a laptop, navigation may move from the bottom to the side. The points where the layout changes are called breakpoints. In your design tool, make frames for a small phone, a large phone and a laptop to check each one.

## A small example

Hawa designs a market price checker for an NGO. Her first version puts the "Check price" button at the top right, small, and the price list in three columns. Testing with traders in Bolgatanga, she sees people struggle to tap the button with their thumb while holding produce, and the columns are cramped on small screens. She moves a full width button to the bottom, makes it 48 pixels tall, and stacks prices in one column on phones and two on tablets.`,
      practice_task_md: `**Goal:** make one screen work for thumbs and for three screen sizes.

**Steps**
1. Choose a screen you have designed, such as "Buy data" or a price list.
2. Check every button and link is at least 48 by 48 pixels with space between them.
3. Move the main action to where a thumb reaches easily in one handed use.
4. Use the right keyboard type for any input and put labels above fields.
5. Create three versions: a small phone (360 wide), a large phone and a laptop. Decide what changes at each size.

**Done looks like:** three frames of the same screen showing how the layout adapts, with notes on touch targets and thumb reach.`,
      quiz: {
        questions: [
          {
            prompt: "What minimum touch target size does Material Design recommend?",
            options: [
              "There is no recommendation",
              "10 by 10 pixels",
              "100 by 100 pixels",
              "48 by 48 density independent pixels",
            ],
            answer_index: 3,
            explanation: "Material Design recommends at least 48 by 48 dp for touch targets.",
          },
          {
            prompt: "Where should the main action usually go for one handed use?",
            options: [
              "The top right corner",
              "Hidden in a menu",
              "Near the bottom or middle where the thumb reaches",
              "Off the screen",
            ],
            answer_index: 2,
            explanation: "The bottom and middle are easiest to reach with a thumb.",
          },
          {
            prompt: "What does designing mobile first mean?",
            options: [
              "Only designing for phones and ignoring laptops",
              "Starting with the smallest screen, then deciding how the layout grows",
              "Designing on a phone instead of a laptop",
              "Building the mobile app before research",
            ],
            answer_index: 1,
            explanation: "Mobile first starts small and adapts upward at breakpoints.",
          },
          {
            prompt: "Why put labels above form fields instead of only as placeholder text?",
            options: [
              "Labels use less data",
              "Placeholder text disappears when people start typing",
              "Placeholders are not allowed on Android",
              "Labels make the field smaller",
            ],
            answer_index: 1,
            explanation: "Visible labels stay on screen so people remember what the field is for.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "design-systems": {
      explanation_md: `## Why design systems matter

Most junior UI/UX and product design adverts mention design systems, component libraries or style guides. Companies want designers who keep a product consistent and make developers' work faster. A design system is how teams do that at scale.

## What a design system is

A design system is a shared set of reusable parts and rules for building a product. It usually includes:

* **Foundations**, sometimes called design tokens: colours, type sizes, spacing, corner radius and shadows, each with a name, such as "colour primary" or "space 16".
* **Components**: buttons, inputs, cards, lists, tabs, alerts and so on, each with its variants and states.
* **Patterns**: common combinations, such as a login form or an empty state.
* **Guidelines**: when to use each part, and when not to, with plain explanations.

Large public examples include Material Design from Google and the GOV.UK Design System. Reading them is free and teaches a lot.

## States matter

A component is not finished until all its states are designed. For a button that might be:

* default
* pressed
* disabled
* loading

For a text input: empty, focused, filled, error and disabled. Developers need these to build it properly, and users need them to understand what is happening. Missing states are one of the most common gaps in junior portfolios.

## Why it helps developers

When a designer uses a named token like "space 16" and a developer has the same token in code, there is no guessing. When both sides share a "Button primary" component, a change made once updates everywhere. This saves time, reduces bugs and keeps the product looking right. Many adverts mention working closely with engineers for this reason.

## Start small

You do not need a huge system. For a small project, start with:

1. a colour palette and type scale saved as styles
2. a spacing scale
3. five components: button, text input, card, list item and alert
4. one page explaining when to use each

Grow it as the product grows. Every time you design the same thing twice, consider making it a component.

## A small example

Sumaila is the only designer at a small Tamale startup building a school fees app. Different screens have buttons in three shades of green, four corner shapes and different heights. The developer keeps asking which one is right. Sumaila spends a day building a small library: one green token, one corner radius, a button component with primary, secondary, disabled and loading variants, and an input with error state. He updates all screens to use it. The next new feature takes him half the time to design, and the developer stops asking which green to use.

## Think inclusive from the start

Build accessibility into your components: good contrast, large touch targets, visible focus states and labels on every input. Then every screen built from them inherits those good habits.`,
      practice_task_md: `**Goal:** build a small design system for one of your projects.

**Steps**
1. In your free design tool, create a page called "Components".
2. Save colour styles (primary, text, background, success, error) and four text styles.
3. Write down a spacing scale, such as 4, 8, 16, 24, 32.
4. Build five components: button, text input, card, list item and alert, each with its states.
5. Write one short sentence per component explaining when to use it.
6. Rebuild one existing screen using only these components.

**Done looks like:** a components page with all states, a short guideline for each, and one screen rebuilt from the system.`,
      quiz: {
        questions: [
          {
            prompt: "What are design tokens?",
            options: [
              "Icons for mobile money",
              "Payments made to designers",
              "Passwords for design tools",
              "Named values for colours, type sizes and spacing shared by design and code",
            ],
            answer_index: 3,
            explanation: "Tokens give names to foundation values so design and code match.",
          },
          {
            prompt: "Which list shows states a button might need?",
            options: [
              "Red, green and blue",
              "Small, smaller and smallest",
              "Default, pressed, disabled and loading",
              "Monday, Tuesday and Wednesday",
            ],
            answer_index: 2,
            explanation: "Buttons need states that show what is happening.",
          },
          {
            prompt: "How does a design system help developers?",
            options: [
              "Shared names and components remove guessing and keep changes consistent",
              "It makes apps slower",
              "It removes the need for developers",
              "It writes all their tests",
            ],
            answer_index: 0,
            explanation: "Shared tokens and components save time and reduce mistakes.",
          },
          {
            prompt: "What was the problem Sumaila fixed?",
            options: [
              "The app had no screens",
              "The developer left the company",
              "Buttons appeared in three shades of green, different shapes and heights",
              "The school had no fees",
            ],
            answer_index: 2,
            explanation: "Inconsistent buttons confused the developer and users.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "inclusive-design": {
      explanation_md: `## Why inclusive design matters in Ghana

A product that only works for young, literate, English speaking people with new smartphones and steady data leaves out a large part of the country. Think of a grandmother in Nalerigu who receives remittances, a farmer near Damongo who reads little English, a student in Wa with a cracked screen and no data until month end, or a trader in Tamale with poor eyesight. They are all customers. Designing for them reaches more people, builds trust and, for many businesses, means more revenue.

Employers building for African markets value this knowledge. Adverts mention accessibility and inclusive design, and companies serving unbanked or rural users need designers who understand real conditions.

## The four themes in this section

* **Accessibility.** Designing for people with low vision, colour blindness, hearing loss, limited hand movement or who use screen readers, following the WCAG guidelines.
* **Literacy and local languages.** Plain words, clear icons, numbers people recognise, and voice or local language options such as Dagbani, Gurene, Dagaare, Hausa, Twi or Ewe where they help.
* **Low end phones, USSD and SMS.** Designing for small screens, little storage, older Android versions and phones with no internet at all.
* **Offline moments and slow data.** Keeping screens light and designing for the moment the network drops halfway through a task.

## A useful mindset: solve for one, extend to many

When you design for someone with a specific difficulty, the solution often helps everyone. Captions on videos help deaf users and also people in a noisy market. Large, clear buttons help people with shaky hands and also people on a moving trotro. A short SMS confirmation helps people on basic phones and also anyone whose app crashed.

## Do not assume, check

Inclusive design depends on research. Do not guess what people can read, which language they prefer or what phone they have. Ask and observe, as you learned in the research section. Also include people who struggle in your tests, not only confident users. If everyone in your test is a university student in Accra, you have tested for a small slice of your users.

## A small example

Mariama is designing a health reminder service for pregnant women in the Upper East Region. Her first idea is a smartphone app with English text. Research shows many women share a basic phone with their husband, some cannot read English well and data is costly. Her final design uses short voice messages in Gurene and Kusaal, plus an SMS with a simple date. Women can call a number to repeat the message. More women can now use it, and the service costs less to run than an app.

## How to use this section

Treat these four topics as part of every project, not an extra at the end. Checking contrast, labels, language, phone types and offline behaviour early is cheap. Fixing them after launch is expensive and leaves people out in the meantime.`,
      practice_task_md: `**Goal:** check one product against the four inclusive themes.

**Steps**
1. Choose a service many Ghanaians use, such as a mobile money menu, a bank app or a government website.
2. For each theme, write one strength and one weakness: accessibility, literacy and language, low end phones, and offline or slow data.
3. Ask one older relative or neighbour to complete a simple task with it and note where they struggle.
4. Suggest one change for the biggest weakness.

**Done looks like:** a short table with four themes, a note from your real user test and one suggested improvement.`,
      quiz: {
        questions: [
          {
            prompt: "What does solve for one, extend to many mean?",
            options: [
              "Design only for one user",
              "Use one colour everywhere",
              "Build one feature at a time",
              "A solution for a specific difficulty often helps everyone",
            ],
            answer_index: 3,
            explanation: "Fixes like captions or large buttons help many people beyond the original group.",
          },
          {
            prompt: "Why should tests include people who struggle, not only confident users?",
            options: [
              "Testing only confident users covers just a small slice of real users",
              "Confident users are not allowed in tests",
              "People who struggle finish faster",
              "It makes the test shorter",
            ],
            answer_index: 0,
            explanation: "Including a range of people reveals problems many users face.",
          },
          {
            prompt: "What did Mariama's final health reminder design use?",
            options: [
              "A smartphone app in English only",
              "Voice messages in local languages plus a simple SMS",
              "A printed newspaper",
              "Email newsletters",
            ],
            answer_index: 1,
            explanation: "Research showed basic phones, shared use and literacy needs, so voice and SMS fitted better.",
          },
          {
            prompt: "When should inclusive design checks happen?",
            options: [
              "Throughout every project, starting early",
              "Never, they are optional",
              "Only after launch",
              "Only if a customer complains",
            ],
            answer_index: 0,
            explanation: "Early checks are cheap; fixing after launch is costly.",
          },
        ],
        pass_threshold: 75,
      },
    },
    accessibility: {
      explanation_md: `## Why accessibility matters

Accessibility means people with disabilities can use what you design. That includes people who are blind or have low vision, are colour blind, are deaf or hard of hearing, have limited hand movement, or have conditions that affect memory and attention. Many older people have some of these difficulties too. Ghana's Persons with Disability Act, 2006 (Act 715) recognises the rights of persons with disability, and accessibility is named in many design adverts, often with WCAG.

## WCAG in plain words

WCAG stands for Web Content Accessibility Guidelines, published free by the W3C. They are organised around four principles, often remembered as POUR:

* **Perceivable.** People can see or hear the content. Text has enough contrast, images have text alternatives, videos have captions.
* **Operable.** People can use every control, including with a keyboard, a switch or a screen reader, and touch targets are big enough.
* **Understandable.** Words are clear, behaviour is predictable and errors are explained.
* **Robust.** It works with different devices and assistive technologies.

Most teams aim for WCAG level AA, the middle of three levels.

## Practical checks for designers

* **Contrast.** At least 4.5 to 1 for normal text and 3 to 1 for large text.
* **Do not rely on colour alone.** Add words or icons to show errors and success.
* **Text size and scaling.** Make sure layouts still work when someone increases the font size in their phone settings.
* **Touch targets.** Large enough and well spaced.
* **Labels.** Every input has a visible label. Every icon button has a text name that a screen reader can announce.
* **Focus order.** When someone moves through a screen with a keyboard or screen reader, the order should match the visual order.
* **Captions and transcripts** for video and audio.
* **Clear error messages** that explain how to fix the problem.

## Screen readers

A screen reader reads the screen aloud. Android phones include one called TalkBack, and iPhones include VoiceOver, both free in the settings. Turn TalkBack on for five minutes and try your favourite app. You will quickly hear buttons announced as "Button, unlabelled" or images with no description. It is the fastest way to understand why labels matter.

## A small example

Abdul-Rahman is designing a bus ticket app for a transport company between Tamale and Kumasi. He tests it with Issahaku, who has low vision and uses TalkBack. Issahaku cannot buy a ticket because the seat map is a picture with no labels, and the "Pay" button is an icon announced only as "Button". Abdul-Rahman adds a simple list option ("Window seat, row 3, available"), gives the button the label "Pay 150 cedis", and checks that enlarged text does not cut off the price. Sighted users also find the list faster on small phones.

## Test with people

Checklists catch many problems, but nothing replaces testing with disabled users. Organisations of persons with disability in Ghana, such as associations for blind and deaf people, can sometimes help you find participants. Pay or thank people fairly for their time and expertise.`,
      practice_task_md: `**Goal:** run a basic accessibility check on one of your designs.

**Steps**
1. Check every text and background colour pair with a free online contrast checker.
2. Make sure every input has a visible label and every icon button has a written name in your design notes.
3. Turn on TalkBack (Android) or VoiceOver (iPhone) and try to complete one task in any real app for five minutes. Write down three problems you hear.
4. Increase your phone's font size to the largest setting and look at a real app. Note what breaks.
5. Fix at least three issues in your own design.

**Done looks like:** a short checklist with your contrast results, three screen reader findings and a before and after of your fixes.`,
      quiz: {
        questions: [
          {
            prompt: "What does the P in POUR stand for?",
            options: [
              "Pretty",
              "Paid",
              "Perceivable",
              "Portable",
            ],
            answer_index: 2,
            explanation: "Perceivable means people can see or hear the content.",
          },
          {
            prompt: "Which WCAG level do most teams aim for?",
            options: [
              "Level A only",
              "Level AAA always",
              "There are no levels",
              "Level AA",
            ],
            answer_index: 3,
            explanation: "Level AA is the common target, the middle of three levels.",
          },
          {
            prompt: "What is TalkBack?",
            options: [
              "A chat app",
              "A free screen reader built into Android phones",
              "A design tool",
              "A mobile money service",
            ],
            answer_index: 1,
            explanation: "TalkBack reads the screen aloud for blind and low vision users.",
          },
          {
            prompt: "Why could Issahaku not buy a ticket at first?",
            options: [
              "The app was too fast",
              "The colours were too bright",
              "He did not have a phone",
              "The seat map had no labels and the Pay button was announced only as Button",
            ],
            answer_index: 3,
            explanation: "Unlabelled images and buttons are invisible to screen reader users.",
          },
          {
            prompt: "What should you check when someone increases their phone's font size?",
            options: [
              "That the app blocks the change",
              "That the layout still works and text is not cut off",
              "That colours change automatically",
              "Nothing, font size is not your concern",
            ],
            answer_index: 1,
            explanation: "Layouts should adapt to larger text without breaking.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "literacy-and-language": {
      explanation_md: `## Why this matters

Ghana is a country of many languages. In the north alone you will hear Dagbani, Gurene, Dagaare, Gonja, Mampruli, Kusaal, Hausa and more, alongside English and Twi. Many people speak several languages fluently but read none of them comfortably, or read English slowly. A product that assumes fast English reading leaves out many potential customers. Designers who can make products clear for people with different reading levels and languages are valuable to fintechs, agritech companies, health services and NGOs.

Low literacy is not low intelligence. People who read little often manage complex money, stock and family matters entirely in their heads. Your job is to remove reading as a barrier, not to simplify the person.

## Plain language first

* Use short, common words: "Send money", not "Initiate transfer".
* One idea per sentence. Keep sentences short.
* Put the most important word first: "Paid: 50 cedis" rather than "Your transaction of 50 cedis has been completed successfully".
* Avoid abbreviations people may not know.
* Use numbers as digits. Many people who read little words read numbers well, especially money amounts and phone numbers.

## Icons, images and familiar cues

Icons help, but only when people recognise them. A floppy disk "save" icon means nothing to someone who never used one. Pair icons with short labels, and test whether people understand them. Pictures of real items, such as cedi notes, a bag of maize or a phone, can work better than abstract symbols. Colour helps but should not carry meaning alone.

## Voice and audio

For many users, listening is easier than reading. Options include:

* voice prompts or short audio clips in local languages
* an interactive voice menu that people call ("Press 1 for prices")
* voice notes, which many people already use on WhatsApp
* a "listen" button next to important text

## Local languages done well

* **Ask which language people prefer** for this task. Some prefer English for money words like "balance" and "credit" even if they speak Dagbani at home.
* **Translate meaning, not word by word.** Work with a fluent speaker from the community, then test the translation with real users.
* **Allow space.** Translated text can be longer than English, so do not design buttons that only fit short English words.
* **Check the letters.** Many Ghanaian languages use special characters, such as ɛ, ɔ and ŋ. Make sure your font and system support them.
* **Let people switch** language easily and remember their choice.

## A small example

Wumpini is improving a farm loan app. Her test shows farmers near Savelugu skip the repayment schedule because it is a long English paragraph. She replaces it with a simple table: date, amount in large digits and a tick when paid, with a "Listen in Dagbani" button that plays a short recording by a local extension officer. In her next test, farmers can say when their next payment is due and how much it is.`,
      practice_task_md: `**Goal:** make one screen easier for people who read little.

**Steps**
1. Choose a text heavy screen, such as terms, a receipt or an error message, from a real app or your own design.
2. Rewrite every sentence in plain language, using digits for numbers.
3. Add icons with labels or pictures of real items where they help.
4. Ask a fluent speaker to help translate the key words into one local language, and write down any words people prefer to keep in English.
5. Test with two people who read little English: ask them to tell you what the screen says.

**Done looks like:** a before and after, the translated key words, and notes on whether people understood the new version.`,
      quiz: {
        questions: [
          {
            prompt: "Which label is clearest for most users?",
            options: [
              "Send money",
              "Initiate transfer",
              "Execute remittance",
              "Process outbound funds",
            ],
            answer_index: 0,
            explanation: "Short, common words are easiest to understand.",
          },
          {
            prompt: "Why use digits for numbers?",
            options: [
              "Words for numbers are not allowed",
              "Digits use more data",
              "Many people who read few words still read numbers well",
              "Digits look more modern",
            ],
            answer_index: 2,
            explanation: "Numbers such as amounts are often easier to read than words.",
          },
          {
            prompt: "What is the best way to translate an app into a local language?",
            options: [
              "Use word by word translation and skip testing",
              "Work with a fluent community speaker to translate meaning, then test with users",
              "Guess the words yourself",
              "Translate only the logo",
            ],
            answer_index: 1,
            explanation: "Meaning based translation, checked with real users, avoids confusing wording.",
          },
          {
            prompt: "Why leave extra space in buttons when planning for translation?",
            options: [
              "Buttons look better empty",
              "Local languages use fewer letters",
              "Translated text can be longer than English",
              "Space saves data",
            ],
            answer_index: 2,
            explanation: "Text often grows when translated, so tight buttons may break.",
          },
          {
            prompt: "What did Wumpini add to help farmers understand repayments?",
            options: [
              "A table with large digits and a Listen in Dagbani button",
              "A longer English paragraph",
              "A video advert",
              "A new logo",
            ],
            answer_index: 0,
            explanation: "A simple table and local language audio made the schedule clear.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "low-end-phones": {
      explanation_md: `## Why this matters

Many people in Ghana use older or low cost Android phones with small screens, little storage and limited memory, and many still use basic phones with no internet at all. Mobile money, airtime and many banking and farm services reach them through USSD codes and SMS. Product designers at fintech and telecom companies design these channels too, and job adverts for mobile money products mention them. If you only design for new smartphones, you design for only part of the market.

## Designing for low end smartphones

* **Small screens.** Design first for narrow screens, around 360 pixels wide, and check smaller ones. Keep the main action visible without scrolling.
* **Little storage.** People delete apps to make space for photos and WhatsApp. A small app, or a lightweight web app that needs no install, is more likely to stay.
* **Limited memory and older systems.** Heavy animations, large images and long lists slow phones down. Keep screens simple.
* **Battery and brightness.** People often keep brightness low to save battery, so strong contrast matters even more.
* **Shared phones.** Think about privacy: hide balances by default, ask for a PIN before showing sensitive information, and let people log out easily.

## Designing for USSD

USSD is the menu you reach by dialling a code that starts with a star and ends with a hash. It works on any mobile phone, with no data. But it has strict limits:

* only a few short lines of text fit on each screen
* sessions time out if the user is slow, and they may have to start again
* people answer by typing a number, so options must be numbered
* going back is often hard

Good USSD design means:

* **Few steps.** Put the most common tasks first.
* **Short, clear options**, such as "1. Send money", "2. Buy airtime".
* **Confirm before money moves.** Show the name and amount and ask the user to confirm.
* **Forgiving errors.** If a number is wrong, explain briefly and let them try again without starting over.
* **Send an SMS receipt** after important actions, because the USSD screen disappears.

## Designing SMS

A standard SMS holds 160 characters, but if you use special characters, such as the letters ɛ or ɔ found in many Ghanaian languages, a single message may hold far fewer, so it splits into several parts that can arrive out of order. Write the key fact first: "Paid GH₵ 50 to Hawa Alhassan. Ref 4821. Balance GH₵ 120." Avoid links that need data unless you know the person has it.

## A small example

Amina redesigns a USSD menu for a cooperative's savings service. The old menu had nine options and three levels before "Check balance". Members in Bolgatanga often timed out. She moves "Check balance" and "Save" to options 1 and 2, cuts the menu to five options, and sends an SMS after every deposit. Members finish tasks before the session ends, and fewer call the cooperative to ask whether their money arrived.

## Sketching USSD

Draw each USSD screen as a small box with numbered options. Test it on paper: you read the screen aloud and the person says the number they would press. This works anywhere and needs no data at all.`,
      practice_task_md: `**Goal:** design and test a short USSD flow on paper.

**Steps**
1. Pick a service, such as a church welfare contribution or a market association savings scheme.
2. List the tasks and choose the two most common.
3. Draw each USSD screen as a small box with no more than five numbered options and short wording.
4. Add a confirmation screen before money moves, an error message for a wrong entry, and the SMS receipt text.
5. Test with two people: read each screen aloud and ask which number they would press. Time how long it takes.

**Done looks like:** a set of paper USSD screens, your SMS text, and notes from two tests with any changes you made.`,
      quiz: {
        questions: [
          {
            prompt: "Why does USSD matter for design in Ghana?",
            options: [
              "It only works on new smartphones",
              "It is only used for games",
              "It replaces all apps",
              "It works on any mobile phone without data, so it reaches people with basic phones",
            ],
            answer_index: 3,
            explanation: "USSD works on basic phones with no internet.",
          },
          {
            prompt: "Which is a limit of USSD?",
            options: [
              "Unlimited text on each screen",
              "It needs a strong data connection",
              "Sessions can time out if the user is slow",
              "It only works in English",
            ],
            answer_index: 2,
            explanation: "USSD sessions end after a short time, so flows must be short.",
          },
          {
            prompt: "Why send an SMS receipt after a USSD payment?",
            options: [
              "SMS is free for everyone",
              "The USSD screen disappears, so people need a lasting record",
              "It replaces the PIN",
              "It is required for every menu option",
            ],
            answer_index: 1,
            explanation: "An SMS keeps proof of the action after the session ends.",
          },
          {
            prompt: "What can happen when an SMS uses special characters such as ɛ or ɔ?",
            options: [
              "The message cannot be sent at all",
              "It turns into a voice call",
              "It becomes free",
              "Each message holds fewer characters, so it may split into parts",
            ],
            answer_index: 3,
            explanation: "Special characters reduce how much fits in one SMS.",
          },
          {
            prompt: "On a shared phone, which design choice protects privacy?",
            options: [
              "Hide balances by default and ask for a PIN before showing them",
              "Show the balance in large text on the home screen",
              "Save every PIN on the screen",
              "Remove the log out option",
            ],
            answer_index: 0,
            explanation: "Hiding sensitive details protects users who share phones.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "offline-and-slow-data": {
      explanation_md: `## Why this matters

Many people buy small data bundles and switch data off to save it. Networks can be weak in rural areas, inside market buildings and on the road between towns, and power cuts can take masts down. If your design assumes a fast, constant connection, people will see blank screens, lose their work or pay twice by accident. Designing for slow data and offline moments is a real skill that companies serving African markets look for.

## Keep screens light

Every megabyte costs your users money.

* Use images only when they help, and keep them small and compressed.
* Prefer simple shapes, icons and text over large photos and videos.
* Load the important content first and the extras later.
* Avoid auto playing videos.
* Offer a "data saver" option, for example to show images only when tapped.

Talk to developers about image formats and page size. You do not need to code, but you should know that a heavy design is slow and expensive for users.

## Show what is happening

On a slow network, silence feels like failure. Design clear feedback:

* **Loading states.** A simple progress indicator or a grey outline of the content (a skeleton screen) shows something is coming.
* **Timeouts.** After a reasonable wait, say clearly what happened and offer "Try again".
* **Last updated.** If you show saved information, add the time, such as "Prices from 9:15 this morning".

## Design for the moment the network drops

Ask of every important flow: what if the connection drops here?

* **Save progress.** If someone is filling a long form, such as a loan application, keep their answers on the phone so they can continue later.
* **Work offline where possible.** Let people view their last balance, past receipts or saved lessons without data.
* **Queue actions.** Let a field officer record survey answers offline and send them when the network returns, with a clear "Waiting to send" label.
* **Never leave money in doubt.** If a payment's result is unknown, say so honestly ("We are checking your payment. Do not pay again. We will send an SMS.") and make sure the system will not take money twice.

## A small example

Fuseini designs a field survey app for an NGO working in communities around Damongo. Field officers often lose signal halfway through interviews. In the old app, they lost all answers when the connection dropped. His new design saves each answer on the phone as it is entered, shows a small "Offline: 3 surveys waiting to send" bar, and sends them automatically when the network returns, with a tick for each one that arrives. Officers stop writing answers on paper as a backup, and no surveys go missing.

## Test it for real

Most phones let you turn on a data saver mode, and browser developer tools can slow down your connection on purpose. Simplest of all: turn off data halfway through your prototype test and see what happens. Then visit a place with weak signal and try your product there.`,
      practice_task_md: `**Goal:** design the offline and slow network states for one flow.

**Steps**
1. Choose a flow, such as submitting a form, making a payment or loading prices.
2. Mark every point where a dropped connection would cause a problem.
3. Design screens for: loading, slow network with a retry, offline with saved progress, and "result unknown" for a payment or submission.
4. Write the exact message text for each, in plain language.
5. Try a real app with data turned off halfway through a task and note what happens.

**Done looks like:** four state screens for your flow with message text, plus notes from your real app test.`,
      quiz: {
        questions: [
          {
            prompt: "Why should designs keep images small and few?",
            options: [
              "Every megabyte costs users money and slows loading",
              "Images are banned in Ghana",
              "Images make text larger",
              "Developers cannot add images",
            ],
            answer_index: 0,
            explanation: "Heavy images use paid data and slow down screens.",
          },
          {
            prompt: "What is a skeleton screen?",
            options: [
              "A screen with no buttons",
              "A screen about health",
              "An error message",
              "A grey outline of content shown while it loads",
            ],
            answer_index: 3,
            explanation: "It shows the shape of content so people know it is coming.",
          },
          {
            prompt: "If a payment result is unknown after a network drop, what should the design say?",
            options: [
              "Nothing, and let the user try again",
              "Payment failed, even if unsure",
              "That the payment is being checked, not to pay again, and that an SMS will follow",
              "Restart your phone",
            ],
            answer_index: 2,
            explanation: "Honest, clear messages prevent double payments and worry.",
          },
          {
            prompt: "How did Fuseini's survey app stop answers going missing?",
            options: [
              "It asked officers to use paper only",
              "It saved each answer on the phone and sent surveys when the network returned",
              "It made the survey shorter",
              "It required a strong signal to start",
            ],
            answer_index: 1,
            explanation: "Saving locally and queuing uploads protects work during network drops.",
          },
        ],
        pass_threshold: 75,
      },
    },
    testing: {
      explanation_md: `## Why testing matters

You are not your user. However carefully you research and design, people will surprise you. Testing shows whether a design actually works before developers spend weeks building it, and after launch it shows whether it keeps working in real life. Usability testing and prototyping appear in most design adverts, and many also mention working with developers and using data to improve designs.

## What this section covers

* **Clickable prototypes.** Linking your screens so people can try a task on a real phone.
* **Usability testing and expert review.** Watching people use your prototype, and reviewing screens against well known usability rules called heuristics.
* **Working with developers.** Handing over designs clearly, with every state and detail, and staying involved while the product is built.
* **Measuring what happens after launch.** Using simple numbers and feedback to see if the design works for real users, and comparing versions fairly.

## Testing is cheap

You do not need a lab, special software or a big budget. A prototype on your phone, a quiet corner in a market, a school or an office, and a notebook are enough. Paper prototypes work too. A few short sessions with the right people usually reveal the biggest problems, and you can fix them the same day.

## Test with the right people

Test with people who are like your real users. For a market trader app, test with traders, not your classmates. Include people who struggle: older users, less confident readers, people with basic phones. Speak their language. Respect their time, ask consent and thank them.

## Test early, test often

Do not wait until the design is beautiful. Test paper sketches, test grey wireframes, test the polished prototype, and test the built product. Each round catches different problems. Problems found early are cheap; problems found after launch are expensive and may lose customers.

## A small example

Hawa designs a school results checker for parents in Tamale. She is proud of a smart icon menu. In her first test with four parents, three cannot find where to enter the student ID, because the icon looks like a calendar to them. She replaces it with a labelled button, "Check results", and tests again with three more parents. All three finish in under a minute. Two hours of testing saved a confusing launch.

Later, after the service goes live, she looks at simple numbers from the developers. Many parents start the check but stop at the PIN screen. She calls three of them and learns the PIN is printed on a slip many have lost. The school adds a "Get PIN by SMS" option. Testing did not stop at launch.

## Testing is a habit

Good designers build testing into every project. It turns opinions into evidence, settles arguments in the team ("let's test both") and gives you strong stories for your case studies. Employers want to hear what you learned from testing and what you changed because of it.`,
      practice_task_md: `**Goal:** plan a small test for one of your designs.

**Steps**
1. Choose a design you have made, even a paper sketch.
2. Write one task for people to try, in plain words, such as "Buy a 5 cedi data bundle for your sister".
3. Write who you will test with and where you will find them.
4. Write what "success" means for the task, and two things you are unsure about.
5. Run the test with two people and write down where they hesitated.

**Done looks like:** a half page test plan and notes from two sessions with at least one change you will make.`,
      quiz: {
        questions: [
          {
            prompt: "What does you are not your user mean?",
            options: [
              "Designers should never use their own products",
              "People will use your design differently from how you expect, so you must test",
              "Users should design the product",
              "Designers do not need research",
            ],
            answer_index: 1,
            explanation: "Your own view is not enough; testing shows how others really behave.",
          },
          {
            prompt: "Who should you test a market trader app with?",
            options: [
              "Your classmates only",
              "Designers at your company",
              "Anyone online",
              "Market traders like the real users",
            ],
            answer_index: 3,
            explanation: "Testing with real kinds of users gives meaningful results.",
          },
          {
            prompt: "When should testing happen?",
            options: [
              "Only after the product is launched",
              "Only when the design looks finished",
              "At every stage, from paper sketches to the built product",
              "Never, if the designer is experienced",
            ],
            answer_index: 2,
            explanation: "Each round catches different problems, and early fixes are cheap.",
          },
          {
            prompt: "What did Hawa learn after the results checker launched?",
            options: [
              "Parents stopped at the PIN screen because many had lost the PIN slip",
              "Parents wanted more colours",
              "The service was too fast",
              "Nobody used the service",
            ],
            answer_index: 0,
            explanation: "Numbers showed a drop at the PIN screen and calls explained why.",
          },
        ],
        pass_threshold: 75,
      },
    },
    prototyping: {
      explanation_md: `## Why prototypes matter

A prototype is a version of your design that people can try. Adverts for UI/UX and product designers almost always ask for prototyping, because a prototype lets the team and real users experience a flow before any code is written. It is also the clearest way to show your work to a manager, a client or an interviewer.

## Kinds of prototype

* **Paper prototype.** Hand drawn screens on cards. You act as the computer: when the person "taps", you swap in the next card. Free, fast, and great for testing in a market or community where a laptop would draw a crowd.
* **Clickable prototype.** Screens from your design tool linked together, so tapping a button moves to the next screen. You can run it on a phone through the tool's free viewer or mobile app.
* **Coded prototype.** Built by a developer, or with simple web code. Useful later for testing real performance, but slower to change.

Choose the cheapest prototype that answers your question. To test whether people understand a menu, paper is enough. To test whether a payment flow feels trustworthy, a polished clickable prototype is better.

## Focus on one task

A prototype does not need every screen. Build only the path for the task you want to test, such as "buy a data bundle" or "check a school result". Include:

* the starting screen
* each step of the happy path
* at least one error, such as a wrong PIN
* the success screen

Everything else can be a dead end. If a participant taps something you did not build, that is useful information: it shows what they expected.

## Make it realistic

* Use realistic content: Ghanaian names, real cedi amounts, real phone number formats.
* Set the frame size to a common phone and test it on an actual phone, not only on a laptop.
* Add simple feedback, such as a pressed state or a short loading screen, so it feels like a real app.
* For forms, you cannot always type in a prototype. Show the filled field on the next screen, or tell the participant to "pretend you have typed your number".

## Save data when testing

Many design tools need a connection to open a prototype. Before going to a place with weak signal, open the prototype on your phone at home on WiFi and check it still works, or take screenshots and use them as a paper style prototype on the phone's photo gallery.

## A small example

Mariama wants to test a new "Pay school fees" flow with parents in Bolgatanga. She builds seven screens in her design tool: choose school, enter student ID, see name and amount owed, enter amount, confirm, enter PIN, and success. She adds one error screen for a wrong student ID. She links them, opens the prototype on her phone, and checks it loads before leaving home. In the test, a parent taps the student's name expecting to change it, which was not built. Mariama notes that parents with several children need a way to switch between them.`,
      practice_task_md: `**Goal:** build a clickable prototype for one task and run it on a phone.

**Steps**
1. Choose one task from your project, such as buying airtime for someone else.
2. Build only the screens needed: start, each step, one error screen and success.
3. Link them in your free design tool so taps move between screens.
4. Use realistic Ghanaian content.
5. Open the prototype on a phone and run through it yourself. Fix any broken links.
6. Ask one person to try it while you watch.

**Done looks like:** a working prototype link, a list of its screens and one note on what the person did that you did not expect.`,
      quiz: {
        questions: [
          {
            prompt: "When is a paper prototype a good choice?",
            options: [
              "When testing whether people understand a menu, quickly and cheaply",
              "When testing server speed",
              "When the app is already launched",
              "Never, paper is too old fashioned",
            ],
            answer_index: 0,
            explanation: "Paper is ideal for fast, cheap tests of structure and understanding.",
          },
          {
            prompt: "What should a focused prototype include?",
            options: [
              "Every screen in the product",
              "The path for one task, including an error and success screen",
              "Only the logo",
              "Only the home screen",
            ],
            answer_index: 1,
            explanation: "Building one task path keeps the prototype quick and useful.",
          },
          {
            prompt: "What does it mean if a participant taps something you did not build?",
            options: [
              "The test has failed and must be cancelled",
              "They are not a real user",
              "It shows what they expected, which is useful information",
              "The phone is broken",
            ],
            answer_index: 2,
            explanation: "Unexpected taps reveal people's expectations.",
          },
          {
            prompt: "What should you do before testing a prototype in a place with weak signal?",
            options: [
              "Nothing, it will work anyway",
              "Delete the prototype",
              "Make the prototype larger",
              "Open and check it at home on WiFi, or prepare screenshots as a backup",
            ],
            answer_index: 3,
            explanation: "Checking in advance avoids losing the session to a poor connection.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "usability-testing": {
      explanation_md: `## Why usability testing matters

Usability testing means watching real people try to complete tasks with your design. It is named in most design adverts because it is the clearest way to find problems before they reach customers. Expert review, using a list of well known usability rules, is a quick extra check that many teams also ask for.

## Running a simple test

**1. Prepare.** Choose three to five tasks written as real situations: "Your sister in Wa needs 10 cedis of airtime. Send it to her." Do not use the words on your buttons in the task, or you give the answer away.

**2. Recruit.** Find people like your real users. A few sessions with the right people reveal most of the big problems. Test in the place they normally use their phone if you can: a shop, a market stall, a school.

**3. Welcome and consent.** Explain that you are testing the design, not them, and that there are no wrong answers. Ask permission to take notes or record the screen.

**4. Ask them to think aloud.** "Please say what you are looking at and thinking as you go."

**5. Watch quietly.** This is the hardest part. Do not help, explain or point. If they ask "What do I press?", reply "What would you do if I were not here?" Only step in if they are truly stuck and upset.

**6. Take notes.** Write where they hesitate, what they say, what they tap and whether they finish. Note exact words.

**7. Thank them** and offer something fair for their time.

## Making sense of results

After the sessions, list every problem and how many people hit it. Rate each one: does it stop people finishing (critical), slow them down (serious) or just annoy them (minor)? Fix critical problems first, then test again.

## Expert review with heuristics

A heuristic is a rule of thumb. The best known set, ten usability heuristics published by Jakob Nielsen, includes ideas such as:

* **Visibility of system status.** Always show what is happening, such as "Sending..."
* **Match the real world.** Use words and ideas familiar to users.
* **User control and freedom.** Easy undo and a clear way back.
* **Consistency and standards.** Follow familiar patterns.
* **Error prevention.** Stop mistakes before they happen, such as confirming the name before sending money.
* **Help users recover from errors.** Plain messages that explain how to fix the problem.

Walk through your design screen by screen and note where it breaks a heuristic. This is quick and useful, but it does not replace watching real users.

## A small example

Issahaku tests a bus ticket app with four travellers at the Tamale station. Three of four hesitate on the date screen because it shows a calendar starting on Sunday and the dates are tiny. Two choose the wrong day. His heuristic review had flagged the small text but not the confusion. He changes it to three large buttons, "Today", "Tomorrow" and "Pick a date", and in the next round every traveller chooses correctly.`,
      practice_task_md: `**Goal:** run a small usability test and an expert review.

**Steps**
1. Use your prototype from the previous lesson.
2. Write three realistic tasks that do not use your button words.
3. Test with three people who match your users. Ask them to think aloud and do not help.
4. List every problem, how many people hit it and whether it is critical, serious or minor.
5. Separately, review your screens against the six heuristics above and note any breaks.
6. Fix the top two problems and describe what you changed.

**Done looks like:** a task list, notes from three sessions, a ranked problem list, heuristic notes and a before and after for two fixes.`,
      quiz: {
        questions: [
          {
            prompt: "Which task wording is best for a usability test?",
            options: [
              "Your sister in Wa needs 10 cedis of airtime. Send it to her.",
              "Tap the Send Airtime button",
              "Do you like this app?",
              "Find the blue button at the bottom",
            ],
            answer_index: 0,
            explanation: "A realistic situation that does not reveal the button words gives honest results.",
          },
          {
            prompt: "A participant asks What do I press? What should you say?",
            options: [
              "Press the green button",
              "What would you do if I were not here?",
              "You are doing it wrong",
              "Let me do it for you",
            ],
            answer_index: 1,
            explanation: "Staying neutral shows how people would act without help.",
          },
          {
            prompt: "Which problems should you fix first?",
            options: [
              "Problems only you noticed",
              "Minor annoyances",
              "Critical problems that stop people finishing",
              "Colour preferences",
            ],
            answer_index: 2,
            explanation: "Problems that block tasks matter most.",
          },
          {
            prompt: "What does the heuristic visibility of system status mean?",
            options: [
              "The app should hide what it is doing",
              "Use bright colours everywhere",
              "Only show status to developers",
              "Always show users what is happening, such as Sending",
            ],
            answer_index: 3,
            explanation: "People should always know what the system is doing.",
          },
          {
            prompt: "Can an expert review replace testing with real users?",
            options: [
              "No, it is a useful extra check but does not replace watching users",
              "Only for apps in English",
              "Yes, if the expert is senior",
              "Yes, always",
            ],
            answer_index: 0,
            explanation: "Heuristic reviews miss problems that only real users reveal.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "developer-handoff": {
      explanation_md: `## Why this matters

A design only helps people once it is built. Adverts for UI/UX and product designers mention working with engineers, developer handoff and supporting implementation, and some list basic HTML and CSS as a plus. Designers who make developers' lives easier are valued in every team, from a small Tamale startup to a remote company.

## What a good handoff includes

* **All the screens for the flow**, in order, clearly named.
* **Every state**: empty, loading, error, success, disabled, and what happens with very long text or no internet.
* **Spacing, sizes and colours** taken from your design system tokens, so developers do not guess.
* **Interactions**: what happens on tap, what animates, what the back button does.
* **Real content rules**: maximum lengths, number formats (such as GH₵ 1,250.00), phone number formats and date formats.
* **Assets**: icons and images exported in the right formats and sizes, kept light.
* **Accessibility notes**: labels for icon buttons, focus order, text alternatives for images.

Most design tools let developers inspect a design and read sizes and colours directly. That helps, but notes explaining the why and the edge cases still matter.

## Learn a little HTML and CSS

You do not need to be a developer, but basic HTML and CSS helps you understand what is easy and what is costly to build. For example, you will see why a layout built with consistent spacing is simple, and why text placed at random positions over an image breaks on different screens. Free resources such as web.dev and MDN teach the basics. Try building one simple page of your own design.

## Stay involved

Handoff is not the end. Good designers:

* walk developers through the design in a short call or meeting before building starts
* answer questions quickly, often on a shared chat
* review the built screens on a real phone and list differences clearly and politely
* accept trade offs when something is too costly to build, and suggest simpler options

## Talk about trade offs

Sometimes your ideal design takes too long to build. Ask developers: "What would be simpler that still solves the user's problem?" Together you can often find a version that ships sooner. Explain your reasons with evidence from research and testing, not "I like it".

## A small example

Fuseini hands over a "Send money" flow to Abdul-Rahman, a developer. In his first handoff he includes only the happy path. Abdul-Rahman asks: "What if the contact name is very long? What if the network drops after the PIN? What does the button look like while it is sending?" Fuseini adds a long name example, a "result unknown" screen and a loading state for the button, all using existing components. Next time, he includes these from the start, and building takes fewer back and forth messages.

## Version and name things clearly

Keep one source of truth. Mark which screens are final, which are still being explored, and record changes with dates. Developers should never wonder which version to build.`,
      practice_task_md: `**Goal:** prepare a handoff for one flow.

**Steps**
1. Choose a flow you have designed, such as buying data or paying fees.
2. Make a handoff page in your design tool with screens in order and clear names.
3. Add every state: loading, error, empty, success and disabled.
4. Write notes on interactions, content rules (amount and phone formats) and accessibility labels.
5. If you can, build one of the screens as a simple HTML and CSS page using free tutorials, and note what was harder than expected.

**Done looks like:** a handoff page a developer could build from, plus notes on what you learned from trying a little code.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these should a good handoff include?",
            options: [
              "Only the happy path screens",
              "Every state, such as loading, error, empty and success",
              "Only the final colours",
              "Only the logo files",
            ],
            answer_index: 1,
            explanation: "Developers need every state to build the product properly.",
          },
          {
            prompt: "Why is it useful for designers to learn basic HTML and CSS?",
            options: [
              "To replace developers",
              "It is not useful at all",
              "Because design tools need code to open",
              "To understand what is easy and what is costly to build",
            ],
            answer_index: 3,
            explanation: "Basic code knowledge helps you design things that are practical to build.",
          },
          {
            prompt: "What should you do when your ideal design is too costly to build?",
            options: [
              "Refuse to change it",
              "Drop the feature without telling anyone",
              "Ask developers for a simpler option that still solves the user's problem",
              "Ask the user to wait for years",
            ],
            answer_index: 2,
            explanation: "Working together on trade offs gets a useful version shipped sooner.",
          },
          {
            prompt: "What was missing from Fuseini's first handoff?",
            options: [
              "The happy path screens",
              "Edge cases such as long names, network drops and loading states",
              "A logo",
              "The app's name",
            ],
            answer_index: 1,
            explanation: "He only showed the happy path, so the developer asked about edge cases.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "measuring-after-launch": {
      explanation_md: `## Why this matters

Launching a design is not the end. Real users in real conditions will use it in ways no test predicted. Several design adverts mention analytics, conversion, data informed design or A/B testing, especially at fintech and product companies. You do not need to be a data analyst, but you should know which simple numbers tell you whether a design works and how to read them carefully.

## Simple numbers that matter

* **Completion rate.** Of the people who start a task, how many finish? For example, how many people who open "Pay bill" reach the success screen.
* **Drop off.** At which step do people give up? A funnel, a list of steps with the number of people at each, shows this clearly.
* **Time on task.** How long it takes to finish. Shorter is usually better for routine tasks.
* **Errors.** How often people hit error messages, such as wrong account numbers.
* **Support contacts.** What customers call or message customer care about. Support staff hear problems every day; talk to them.

Developers and data colleagues usually set up tracking with free or paid analytics tools. Your job is to say which steps and events matter for the design.

## Numbers tell you what, people tell you why

A funnel might show that many users stop at the PIN screen. It does not tell you why. Call or visit a few of those users, read support messages, or run a quick usability test on that step. Combine the numbers with real conversations before you decide what to change.

## Comparing two versions fairly

An A/B test shows two versions of a screen to different groups of users at the same time and compares the results. For example, version A says "Continue" and version B says "Pay GH₵ 20". Good practice:

* change only one thing at a time, so you know what made the difference
* run both versions at the same time, so market days, holidays or network problems affect both equally
* wait until enough people have used each version before deciding; a few people is not enough
* decide in advance what result counts as better

If your product has few users, a clear usability test may teach you more than an A/B test.

## Be careful with data

Only collect what you need. Do not track personal details such as names, phone numbers or PINs in analytics. Follow your company's privacy rules and Ghana's data protection law.

## A small example

Sumaila's team launches a new loan application in a fintech app. The funnel shows most people finish the first three steps, then many stop at "Upload ID". He talks to support staff and calls four users from Tamale and Yendi. They explain that the camera screen does not work well in low light and the upload fails on slow data with no message. The team adds tips for taking the photo, compresses the image before upload, and shows clear progress. In the next weeks, more applicants reach the end, and support calls about uploads fall.

## Share what you learn

Write short updates: what you changed, what the numbers showed and what users said. These become strong stories for your portfolio.`,
      practice_task_md: `**Goal:** plan how to measure one of your designs after launch.

**Steps**
1. Choose a flow you have designed.
2. List each step and mark the event you would want tracked at each one.
3. Draw an imaginary funnel and mark which step you think will lose the most people, and why.
4. Write two questions you would ask users who drop off at that step.
5. Write one A/B test idea that changes only one thing, and say what result would count as better.
6. List any personal data you would make sure is not tracked.

**Done looks like:** a one page measurement plan with events, a funnel sketch, follow up questions, one A/B test idea and a privacy note.`,
      quiz: {
        questions: [
          {
            prompt: "What does a funnel show?",
            options: [
              "The colours used in the app",
              "The company's profit",
              "The app's source code",
              "How many people reach each step of a task, showing where they drop off",
            ],
            answer_index: 3,
            explanation: "A funnel shows numbers at each step so you can see drop off.",
          },
          {
            prompt: "The numbers show many users stop at the PIN screen. What should you do next?",
            options: [
              "Talk to users, support staff or run a test to learn why",
              "Ignore it",
              "Remove the PIN completely",
              "Change all the colours",
            ],
            answer_index: 0,
            explanation: "Numbers show what happens; people explain why.",
          },
          {
            prompt: "Why change only one thing in an A/B test?",
            options: [
              "To make the test longer",
              "Because tools allow only one change",
              "So you know what caused any difference",
              "So users do not notice",
            ],
            answer_index: 2,
            explanation: "Changing one thing makes the result clear.",
          },
          {
            prompt: "Which should never be tracked in analytics?",
            options: [
              "Users' PINs",
              "How long a task took",
              "Which step a user reached",
              "Whether an error message appeared",
            ],
            answer_index: 0,
            explanation: "Sensitive personal data such as PINs must never be tracked.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-hired": {
      explanation_md: `## Why this section matters

Design hiring is about proof. Employers in Ghana and remote teams cannot see your skills on a certificate. They want to see how you think: how you learned about users, what problems you found, what options you tried and why you chose one. A portfolio of honest case studies does that better than anything else. Most junior adverts ask for a portfolio, often alongside a CV and sometimes a cover letter.

## What this section covers

* **Case study portfolio.** How to write two or three case studies that show your process from research to final design, and the reasons behind your decisions.
* **Freelancing for local businesses (optional).** How to find small paid projects with shops, NGOs, schools and churches near you, agree the scope and get paid fairly.
* **Job search and design interviews.** Where junior design jobs are, how to apply, how to present a case study in a short interview and how to handle a design exercise.

## Where design jobs are

Junior and entry level design work in Ghana and for Ghanaian designers tends to come from:

* **Fintech and mobile money companies**, which need clear, trustworthy flows
* **Digital agencies** in Accra and Kumasi that design for many clients
* **Startups** in health, agriculture, education and logistics
* **Banks and telecoms**, which have growing digital teams
* **NGOs and research organisations** that build services for rural communities
* **Remote companies** that hire across Africa, often for product design
* **Fellowships and internships**, which some companies run for early career designers

## Your local knowledge is an advantage

Many companies want to serve users in northern Ghana and similar places but have nobody who understands them. If you can show that you researched with traders in Tamale, designed a USSD flow, tested in Dagbani or designed for offline moments, you bring something rare. Put it front and centre in your portfolio.

## Honesty matters

Never invent research, users, numbers or results to make a project look more impressive. Interviewers ask follow up questions and fake details fall apart quickly. A small, honest project with five real interviews is stronger than a big, made up one. If a project was a practice redesign, say so.

## A small example

Hawa has finished this roadmap. She has three projects: a redesign of a market association's savings USSD menu, a clinic SMS reminder service researched in Wa, and a practice redesign of a bus ticket app. For each she writes the problem, her research, sketches, tests and what changed. She applies to a fintech, a remote startup and an NGO, tailoring each application to show the most relevant project first. In interviews she explains her decisions clearly, and the interviewer asks most about her USSD work, because few candidates have done it.

## Build a routine

Job hunting takes time. Set a weekly routine: improve one case study, apply to a few well matched roles, and talk to one designer or mentor. Small, steady progress beats one big push.`,
      practice_task_md: `**Goal:** take stock of your work and plan your portfolio.

**Steps**
1. List every project you have done in this roadmap, including small practice tasks.
2. For each, write one sentence on the problem and one on what you learned from real users.
3. Choose the two or three strongest projects. Prefer ones with real research and testing.
4. Write down which kinds of employer you want to apply to first, and why.
5. Set a weekly routine with three small actions.

**Done looks like:** a list of projects with one line each, your chosen two or three, your target employer types and a weekly routine.`,
      quiz: {
        questions: [
          {
            prompt: "What do design employers most want to see in a portfolio?",
            options: [
              "Only beautiful final screens",
              "How you think: research, problems, options and reasons for your decisions",
              "A list of certificates",
              "Your social media followers",
            ],
            answer_index: 1,
            explanation: "Case studies show your process and reasoning, which employers value.",
          },
          {
            prompt: "Why is local knowledge of northern Ghana an advantage?",
            options: [
              "Employers only hire from the north",
              "It means you do not need design skills",
              "It replaces the need for a portfolio",
              "Many companies want to serve these users but lack people who understand them",
            ],
            answer_index: 3,
            explanation: "Real experience with these users is rare and valuable.",
          },
          {
            prompt: "What should you do if a project was a practice redesign?",
            options: [
              "Pretend it was a paid client project",
              "Invent results to make it impressive",
              "Say clearly that it was a practice redesign",
              "Leave it out entirely",
            ],
            answer_index: 2,
            explanation: "Honesty builds trust; made up details fall apart in interviews.",
          },
          {
            prompt: "Why did Hawa's interviewer ask most about her USSD work?",
            options: [
              "It was the prettiest project",
              "Few candidates have done USSD design",
              "It was the longest case study",
              "USSD is a new invention",
            ],
            answer_index: 1,
            explanation: "Rare, relevant experience stands out to employers.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "case-studies": {
      explanation_md: `## Why case studies matter

Most junior design adverts ask for a portfolio, and many say they want to see your process and design rationale, meaning the reasons behind your choices. A case study tells the story of one project from problem to result. Two or three strong case studies are worth more than twenty pretty screens with no explanation.

## A simple structure

Keep each case study short enough to read on a phone in a few minutes. A clear structure:

1. **Summary.** One or two sentences: the problem, who it was for, your role and the outcome.
2. **The problem.** What was wrong and why it mattered to users and the business.
3. **Research.** Who you spoke to or watched, where, and the key findings. Include one or two real quotes (with no personal details).
4. **Ideas and options.** Sketches or wireframes of different ideas, and why you chose one.
5. **Design.** The final screens or flows, with short notes on key decisions.
6. **Testing.** What happened when people tried it, and what you changed.
7. **Outcome and learning.** What changed because of your work, and what you would do differently.

## Show your reasons

For each key decision, say why. "I moved Check balance to option 1 because six of the eight members I interviewed said it was the first thing they do" is far stronger than "I improved the menu". Your reasons should come from research, testing or clear design principles.

## Use honest outcomes

You may not have business results, and that is fine. Honest outcomes include:

* "In the second round of testing, all four parents completed the payment without help."
* "The cooperative treasurer said she would no longer need a paper list."
* "This was a practice redesign; I did not have access to real usage data."

Never invent numbers, quotes, users or clients. If you worked in a team, say clearly which parts were yours.

## Good projects to write up

* A redesign of a real local service, such as a USSD menu, a school portal or a transport booking flow, with research and tests with real users.
* A small project for a real client: a shop, church, NGO or cooperative.
* A project that shows inclusive design: local languages, low literacy, basic phones or offline use.

## Where to publish

Choose something light and free that opens well on a phone: a simple page made with a free website builder, a public design file, or a PDF of a few pages. Keep images compressed so the case study loads quickly on mobile data. Include your name, a short introduction, how to contact you, and links to two or three case studies.

## A small example

Abdul-Rahman writes up his clinic SMS reminder project. His first draft is eight screens of polished designs with one line each. His mentor asks: "Why did you choose SMS and not an app?" He rewrites it to open with what he learned in Wa: most patients booked through relatives and feared missing their turn. He adds his paper sketches, the three options he considered, two rounds of testing and what changed. Now an interviewer can follow his thinking in a few minutes.`,
      practice_task_md: `**Goal:** write one complete case study.

**Steps**
1. Choose your strongest project with real research and testing.
2. Write each of the seven sections in a free document, keeping each to a short paragraph.
3. Add images: one research photo (with permission and no faces or numbers), sketches, final screens and a before and after.
4. For each key decision, add one sentence explaining why.
5. Compress images and put it on a light, free page or a short PDF.
6. Ask a mentor or friend to read it on their phone and tell you the problem and your main decision in their own words.

**Done looks like:** a published case study link or PDF that a reader can understand on a phone in a few minutes.`,
      quiz: {
        questions: [
          {
            prompt: "What does design rationale mean?",
            options: [
              "The reasons behind your design choices",
              "The price you charge for a design",
              "The tool you used",
              "The number of screens you made",
            ],
            answer_index: 0,
            explanation: "Rationale is the why behind each decision.",
          },
          {
            prompt: "Which statement shows a decision best?",
            options: [
              "I improved the menu",
              "I made it look nicer",
              "I used the newest colours",
              "I moved Check balance to option 1 because most members I interviewed said it was the first thing they do",
            ],
            answer_index: 3,
            explanation: "It names the change and the evidence behind it.",
          },
          {
            prompt: "What should you do if you have no real usage data for a project?",
            options: [
              "Invent numbers that look good",
              "Remove the project from your portfolio",
              "Say honestly that you did not have usage data and share test results instead",
              "Copy numbers from another company",
            ],
            answer_index: 2,
            explanation: "Honest outcomes, such as test results, are always better than invented ones.",
          },
          {
            prompt: "Why compress images in an online case study?",
            options: [
              "So it loads quickly on mobile data",
              "To hide the details",
              "Because large images are illegal",
              "To make the text smaller",
            ],
            answer_index: 0,
            explanation: "Light pages load fast and cost readers less data.",
          },
          {
            prompt: "What was missing from Abdul-Rahman's first draft?",
            options: [
              "Polished screens",
              "Colour",
              "A title",
              "His thinking: research findings, options considered and testing",
            ],
            answer_index: 3,
            explanation: "Screens alone did not explain why he chose SMS.",
          },
        ],
        pass_threshold: 80,
      },
    },
    freelancing: {
      explanation_md: `## Why freelancing can help

Before or alongside a full time job, small freelance projects give you real clients, real problems and real case studies. Many shops, schools, churches, NGOs and small businesses around Tamale, Bolgatanga and Wa need simple digital help: a clear website, a menu for WhatsApp ordering, a booking form or a USSD flow for a cooperative. Doing this work well builds your portfolio, your reputation and some income.

## What you can offer

Start with what you can do well:

* a simple one page website or landing page design
* a WhatsApp ordering menu and order form for a chop bar or shop
* improving a confusing form, such as a school admission or event registration form
* a USSD or SMS flow design for a cooperative or association (developers or a provider build it)
* a small usability review of an existing website or app, with clear recommendations

You may also be asked for logos, flyers and social media graphics. These are graphic design rather than UI/UX, but free tools such as Canva can help. Be honest about what you do best.

## Agree the scope before you start

Many freelance problems come from unclear agreements. Before any work, write down and share, even in a WhatsApp message:

* **what you will deliver**, such as "design for a 3 page website: home, menu and contact"
* **what is not included**, such as building the site, writing all the text or taking photos
* **how many rounds of changes** are included
* **the price and how payment works**, such as a part payment by mobile money before you start and the rest on delivery
* **the timeline**, with dates for drafts and final delivery
* **who owns the work** and whether you can show it in your portfolio

Ask the client to reply "Agreed". Keep the message.

## Pricing without guessing

There is no single correct price. Consider how many hours the work will take, what similar local designers charge, and what the client can afford. Charge for the work, not for your nervousness. Raise your prices as your skills and portfolio grow.

## Do the design work properly

Apply what you have learned, even for small jobs. Talk to two or three of the client's customers. Sketch first. Test the menu with real people. A chop bar menu that customers can order from in one message is a real design achievement and a good case study.

## Protect yourself and your clients

* Never ask for or store clients' passwords; ask them to add you with your own account where possible.
* Keep customer data private.
* Do not pay anyone to "unlock" freelance jobs; that is a common scam.
* Send a simple written invoice and receipt for every payment.

## A small example

Amina offers to redesign the WhatsApp ordering for a chop bar near the Tamale Teaching Hospital. She agrees in writing: a menu image, a short order message template and a one page guide for staff, two rounds of changes, part payment first. She watches staff take orders for an hour and sees customers send unclear messages like "1 plate". Her design numbers every dish, shows prices clearly and gives customers a copy and paste template. Staff say orders are easier to read, and the owner agrees she can use it as a case study.`,
      practice_task_md: `**Goal:** prepare a small freelance offer and agreement.

**Steps**
1. Choose one local business or organisation you know that could use simple design help.
2. Write a one paragraph offer describing the problem you noticed and what you would deliver.
3. Write a short scope agreement: deliverables, what is not included, rounds of changes, payment steps, timeline and portfolio permission.
4. Plan how you would talk to two of their customers before designing.
5. If you feel ready, share the offer with the business owner.

**Done looks like:** a written offer and scope agreement you could send on WhatsApp, and a short research plan.`,
      quiz: {
        questions: [
          {
            prompt: "Which should you agree with a client before starting work?",
            options: [
              "Only the colour scheme",
              "Nothing, it is better to start quickly",
              "What you will deliver, what is not included, rounds of changes, price, payment and timeline",
              "Only your favourite font",
            ],
            answer_index: 2,
            explanation: "Clear scope avoids disputes and unpaid extra work.",
          },
          {
            prompt: "Why should you ask the client about showing the work in your portfolio?",
            options: [
              "It is required by the design tool",
              "To agree whether you can use it as a case study",
              "It makes the price higher",
              "Clients always say no",
            ],
            answer_index: 1,
            explanation: "Permission lets you use the project publicly.",
          },
          {
            prompt: "Which is a warning sign of a scam?",
            options: [
              "Being asked to pay to unlock freelance jobs",
              "A client who agrees the scope in writing",
              "A client who pays part upfront",
              "A client who gives clear feedback",
            ],
            answer_index: 0,
            explanation: "Real clients pay you; you should never pay to access jobs.",
          },
          {
            prompt: "What problem did Amina see when she watched the chop bar take orders?",
            options: [
              "The menu had no food",
              "The chop bar had no customers",
              "Staff could not use phones",
              "Customers sent unclear messages like 1 plate",
            ],
            answer_index: 3,
            explanation: "Unclear orders led her to number each dish and create a template.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "job-search": {
      explanation_md: `## Why a smart job search matters

Design roles attract many applicants, and junior roles can be hard to find. A focused, honest search, with a strong portfolio and good interview practice, makes a big difference. This lesson covers where to look, how to apply and what to expect in design interviews.

## Where to look

* **Company career pages** of fintechs, banks, telecoms, agritech and health startups, and design agencies.
* **Ghanaian job boards** such as Jobberman, searching for UI/UX designer, product designer and UX researcher.
* **Remote job boards** that list roles open to people based in Africa. Read each advert carefully for location and time zone requirements.
* **Fellowships and internships** that some companies run for early career designers.
* **Design communities and meetups**, online and at tech hubs, where people share openings.

Read adverts closely. A title like UI/UX Designer can hide a graphic design job, and a junior title can ask for several years of experience. Apply when you match most of the core skills, even if not every line.

## Avoid scams

Never pay to apply for a job, to receive an offer or for "training" that guarantees a job. Reputable job boards, including Jobberman, warn job seekers not to make payments to get jobs. Be careful with any "test task" that looks like real client work for free; a short exercise is normal, but days of unpaid work is not.

## Applying well

* **CV.** One or two pages. Lead with a short summary, your skills, your projects and any work or volunteering. Include your portfolio link near the top.
* **Portfolio.** Two or three case studies, light enough to load on mobile data.
* **Cover note.** A few sentences that show you understand the company's users and why one of your projects is relevant. Tailor it to each role.
* **Follow up** politely once if you hear nothing after a week or two.

## Design interviews

Common stages:

* **Screening call.** A short chat about you, your interest and your availability.
* **Portfolio walkthrough.** You present one case study, often in about fifteen minutes. Practise telling the story: problem, research, options, decision, testing, outcome. Expect "why" questions.
* **Design exercise.** A short live challenge or a take home task, such as "design a way for traders to record credit sales". Ask questions first: who are the users, what device, what constraints? Then sketch, explain your thinking aloud and say what you would test.
* **Team or culture interview.** How you work with developers and product managers, and how you handle feedback.

## Remote roles

Remote teams also look for clear written communication, reliability with time zones and a steady way to work online. Show this through clear case study writing and prompt, polite replies.

## A small example

Issahaku applies to a remote startup building savings products for Africa. In the design exercise he is asked to design a savings goal feature. Before sketching, he asks about users' phones and whether they use USSD. He sketches an app flow and a three step USSD version, and explains how he would test both with traders. The interviewers later say his questions and his thinking about basic phones stood out.`,
      practice_task_md: `**Goal:** prepare for applications and a design interview.

**Steps**
1. Find five real junior design adverts on public job boards or career pages. Note which skills match yours.
2. Update your CV to one or two pages with your portfolio link near the top.
3. Write a tailored cover note for one of the adverts.
4. Practise presenting one case study aloud in fifteen minutes. Record yourself on your phone and listen back.
5. Do a practice design exercise: "Design a way for a Tamale shop owner to record credit sales." Write your questions first, then sketch and explain.

**Done looks like:** an updated CV, one tailored cover note, a recording of your case study talk and your practice exercise sketches with questions.`,
      quiz: {
        questions: [
          {
            prompt: "Which is a sign of a job scam?",
            options: [
              "An employer asks for your portfolio",
              "Being asked to pay money to receive a job offer",
              "A short screening call",
              "A design exercise of an hour",
            ],
            answer_index: 1,
            explanation: "Legitimate employers do not ask candidates to pay for jobs.",
          },
          {
            prompt: "What should you do first in a design exercise?",
            options: [
              "Start drawing final screens immediately",
              "Choose the brand colours",
              "Ask questions about users, devices and constraints",
              "Say you need a week to think",
            ],
            answer_index: 2,
            explanation: "Understanding the problem first shows good design thinking.",
          },
          {
            prompt: "Where should your portfolio link go on your CV?",
            options: [
              "At the very end in small text",
              "Only in the cover note",
              "Nowhere",
              "Near the top",
            ],
            answer_index: 3,
            explanation: "Employers want to find your work quickly.",
          },
          {
            prompt: "What stood out in Issahaku's design exercise?",
            options: [
              "His questions and his thinking about basic phones and USSD",
              "His use of many colours",
              "That he finished in five minutes",
              "That he refused to sketch",
            ],
            answer_index: 0,
            explanation: "Asking about users and designing for basic phones showed real understanding.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
