import type { TrackContent } from "./types";

/**
 * Lesson content for the AI Tools for Work track. Original SydCrest writing;
 * sources and the coverage table are in src/content/research/ai-tools-for-work.md.
 * Tools are named only as examples, never as endorsements, and every lesson
 * that names one reminds learners that free plans change. People, shops and
 * scenarios are invented for teaching.
 */
const content: TrackContent = {
  roadmap: "ai-tools-for-work",
  nodes: {
    "ai-basics": {
      explanation_md: `## Why this matters

Job adverts in Ghana and remote roles open to Ghanaians now ask for things like "comfortable using AI tools", "uses AI to research and draft while keeping accuracy" or "experience using ChatGPT or similar". Employers are not asking you to build AI. They want people who can use an AI assistant to get ordinary work done faster and still hand in work that is correct, honest and safe.

That is what this track teaches. Everything in it works on a phone with a data bundle, using free tools.

## What an AI assistant is

An AI assistant is an app or website where you type (or speak) a request in plain language and get a written answer back. Examples include ChatGPT, Gemini, Copilot and Claude, and some messaging and office apps now have one built in. We name these only as examples. They change often, and none of them is the "right" one.

You can ask an assistant to draft a message, explain a hard idea in simple words, suggest a spreadsheet formula, summarise a long document, translate a paragraph or brainstorm ideas for a business. It answers in seconds. That speed is useful, but it comes with real limits, and the people who earn with AI are the ones who understand those limits.

## The three topics in this section

* **What AI can and cannot do.** How these tools work in simple terms, why they sometimes state wrong things with confidence, and which tasks suit them.
* **Choosing and setting up a free assistant.** How to compare free tools on things that matter to you, and how to set one up on your phone.
* **Privacy and safe use.** What you must never paste into an AI tool, how to change your settings, and how Ghana's data protection law affects you when you handle other people's information.

## A small example

Hawa runs a small catering business in Tamale and asks an assistant to write a WhatsApp message announcing her new jollof and chicken package. In ten seconds she has a friendly draft. But the draft says "free delivery across Ghana", which she never offered. Hawa removes that line, adds her real prices and her MoMo number, and sends it. The AI saved her time. Her own checking saved her business from a promise she could not keep.

That pattern, **AI drafts, you decide**, runs through every lesson in this track.

## How to use this track

Work through the sections in order. Each lesson has a short practice task you can do on your phone and save as proof of your skills. By the end you will have a small portfolio showing an employer or client exactly how you use AI well.`,
      practice_task_md: `**Goal:** start your AI learning journal and try an assistant for the first time.

1. Create a new note or Google Doc called "AI learning journal".
2. Open any free AI assistant in your phone browser or app. If you have not signed up for one yet, you can do this task after the next lesson.
3. Ask it: "Explain in five simple sentences what you are and what you are not good at."
4. Copy the answer into your journal. Underneath, write two things in your own words: one thing you think it explained well, and one claim you are not sure is true.

**Done looks like:** a journal entry with the assistant's answer and your two comments. Keep this journal; you will add to it in every lesson.`,
      quiz: {
        questions: [
          {
            prompt: "What do most employers mean when an advert asks for AI tool skills?",
            options: [
              "You can build your own AI model from scratch",
              "You can use AI assistants to work faster while keeping your work correct and honest",
              "You have paid for the most expensive AI subscription",
              "You can let AI do the whole job without checking",
            ],
            answer_index: 1,
            explanation: "The lesson explains that employers want people who use AI to get ordinary work done faster while keeping it correct, honest and safe.",
          },
          {
            prompt: "Why does this track name tools like ChatGPT, Gemini, Copilot and Claude?",
            options: [
              "Because SydCrest recommends one of them above the others",
              "Because only these tools are allowed in Ghana",
              "Only as examples, since tools change often and none is the single right one",
              "Because they are the only tools that work on a phone",
            ],
            answer_index: 2,
            explanation: "The lesson says the tools are named only as examples because they change often.",
          },
          {
            prompt: "In the example, what did Hawa do after the AI wrote her WhatsApp message?",
            options: [
              "Sent it straight away because AI is always right",
              "Deleted it and wrote nothing",
              "Asked the AI to promise even more",
              "Removed a promise she never made and added her real prices before sending",
            ],
            answer_index: 3,
            explanation: "Hawa checked the draft, removed the false free delivery line and added her real details.",
          },
          {
            prompt: "Which phrase sums up the approach used throughout this track?",
            options: ["AI drafts, you decide", "AI decides, you send", "Never use AI at work", "Copy whatever the AI says"],
            answer_index: 0,
            explanation: "The lesson names \"AI drafts, you decide\" as the pattern behind every lesson.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-ai-can-do": {
      explanation_md: `## Why this matters

The fastest way to lose a client's trust is to hand in AI work with a confident mistake in it. The fastest way to impress one is to use AI for what it is good at and catch what it gets wrong. Both depend on understanding, in simple terms, how these tools work.

## How it works, simply

An AI chat assistant is built on a **large language model**. During training, it studied a huge amount of text and learned patterns: which words tend to follow which, how a polite email is shaped, what an explanation of photosynthesis usually contains. When you ask a question, it builds an answer by predicting likely next words, one piece at a time.

This explains both its power and its weakness. Because it has seen so much writing, it is very good at producing fluent, well organised text. But it is predicting what sounds right, not looking facts up in a trusted book. So it can produce a sentence that sounds perfectly correct and is completely false. People call this a **hallucination**: an invented fact, name, figure, quote or link, delivered with the same confidence as a true one.

A few other limits follow:

* **Knowledge can be out of date.** A model learns from text up to a certain date. Some tools can also search the web, but not all do, and not always.
* **Local knowledge is thin.** It may know a lot about big cities and famous topics and much less about a market in Bolgatanga or a district office in Damongo.
* **It does not know you.** It cannot see your shop, your client or your community unless you describe them.
* **It can repeat bias.** If its training text contained unfair views about a group of people, its answers can reflect them.
* **It has no judgement or responsibility.** It cannot be accountable for a decision. You are.

## Good jobs and bad jobs for AI

Good jobs: drafting a first version, rewording for a different reader, summarising text you give it, brainstorming ideas, explaining a concept in simpler words, suggesting a structure, spotting spelling and grammar problems.

Risky jobs, where you must check carefully or avoid AI: facts and figures, legal or medical advice, quotes from real people, references and links, anything about a real person's private life, and final decisions that affect people.

## A small example

Issahaku, a teacher in Wa, asks an assistant for a short history of his district to use in a lesson. The answer is well written and includes a founding date and a famous chief's name. He checks both in a library book and with an elder. The date is wrong and the name is invented. He keeps the clear structure the AI suggested, fills in the facts from his real sources, and the lesson is better than either could have made alone.`,
      practice_task_md: `**Goal:** see a hallucination for yourself and learn to spot it.

1. Ask any free AI assistant a question about your own town or community that you know the answer to. For example: "Tell me about the main market in Savelugu and its history."
2. Read the answer slowly. Mark each claim as **true**, **false** or **not sure**, using what you know and what you can check with a quick search or by asking someone.
3. Then ask it a task it is good at: "Rewrite this paragraph in simpler English for a JHS student" and paste a paragraph from a news article.
4. In your AI learning journal, write three sentences: what it got wrong in step 2, what it did well in step 3, and one rule you will follow from now on.

**Done looks like:** a journal entry showing the marked up answer and your three sentences.`,
      quiz: {
        questions: [
          {
            prompt: "How does an AI chat assistant mainly produce its answers?",
            options: [
              "By looking every fact up in a trusted encyclopedia",
              "By predicting likely next words from patterns it learned in training",
              "By asking a human expert each time",
              "By copying one website word for word",
            ],
            answer_index: 1,
            explanation: "The lesson explains that it builds answers by predicting likely next words from patterns learned in training.",
          },
          {
            prompt: "What is a hallucination in AI?",
            options: [
              "When the app crashes on a slow network",
              "When the assistant refuses to answer",
              "An invented fact, name, figure, quote or link stated confidently",
              "A picture made by an image tool",
            ],
            answer_index: 2,
            explanation: "The lesson defines a hallucination as invented information delivered with the same confidence as true information.",
          },
          {
            prompt: "Which of these is a good job to give an AI assistant?",
            options: [
              "Deciding which job applicant to hire",
              "Giving final medical advice to a patient",
              "Supplying exact quotes from a real chief",
              "Rewording a paragraph you wrote for a different reader",
            ],
            answer_index: 3,
            explanation: "Rewording for a different reader is listed as a good job; the others are risky or decisions that need people.",
          },
          {
            prompt: "Why might an AI assistant know little about a district office in Damongo?",
            options: [
              "Its local knowledge is often thin compared with big, well known topics",
              "AI is not allowed to discuss Ghana",
              "It only knows about science",
              "It deliberately hides local information",
            ],
            answer_index: 0,
            explanation: "The lesson says local knowledge is thin because far less has been written about small places.",
          },
          {
            prompt: "Who is responsible for a decision made using AI output?",
            options: ["The AI tool", "The company that made the tool", "You, the person who used it", "Nobody"],
            answer_index: 2,
            explanation: "The lesson says AI has no judgement or responsibility, so you are accountable.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "choosing-tools": {
      explanation_md: `## Why this matters

You do not need to pay for anything to learn this track or to start earning with AI skills. Several companies offer free AI assistants that run in a phone browser or app. But they are not all the same, and the free plans change often: a feature that is free this month may move to a paid plan next month, and limits on how many messages you can send can go up or down. Knowing how to compare tools, rather than memorising one, keeps you ready for those changes.

## What to compare

When you try a free assistant, look at these things:

* **Works on your phone and data.** Does it have a light app or work well in a mobile browser? Some apps are large downloads; a browser may save space.
* **Sign up needs.** Most ask for an email or a phone number. Use an account you control, not a shared one.
* **Limits.** How many messages or files can you use per day on the free plan? What happens when you hit the limit?
* **Web search.** Can it look things up and show where information came from? Sources make checking easier.
* **Files and images.** Can it read a photo of a document or a PDF you upload? Useful for summarising, but think about privacy first.
* **Voice.** Can you speak your request and hear the answer? Handy when typing on a small screen is slow.
* **Languages.** How well does it handle Ghanaian English, Pidgin, Twi, Dagbani or Hausa? Test it yourself.
* **Data settings.** Can you stop your chats being used to improve the tool, or use a temporary chat mode? You will learn more in the privacy lesson.

## Setting up well

Pick one main assistant and learn it properly, then try a second for comparison. On your phone, add it to your home screen if you use it in a browser. Turn on two step verification for the account it uses. Check the settings page for data and history controls before you start real work.

Save data by keeping prompts focused, avoiding long image or video generation on mobile data, and doing heavy tasks on free school, library or community centre Wi Fi when you can.

## A small example

Mariama, in Bolgatanga, tests three free assistants with the same request: "Write a short thank you message in simple English and Twi for customers of a provisions shop." She notes which answer was clearest, which Twi a fluent friend said was most natural, and which app used the least data on her phone. She picks one as her main tool and keeps notes so she can switch quickly if its free plan changes.`,
      practice_task_md: `**Goal:** choose your main free assistant using evidence, not adverts.

1. Try two free AI assistants on your phone (any two you can access).
2. Give both the same three requests:
   * "Explain what a budget is in five simple sentences."
   * "Write a polite WhatsApp message to a customer whose order will be one day late."
   * "Translate 'Thank you for buying from us' into a Ghanaian language you speak."
3. Make a small table in your journal comparing them on: clarity, accuracy of the translation (judged by you or a fluent speaker), daily limits you noticed, data settings available, and how easy it was on your phone.
4. Write one sentence on which you will use as your main tool and why.

**Done looks like:** a comparison table and your choice, ready to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why is it better to learn how to compare tools than to memorise one?",
            options: [
              "Because free plans and features change often",
              "Because all tools are identical",
              "Because paid tools are always required",
              "Because employers ban AI tools",
            ],
            answer_index: 0,
            explanation: "The lesson stresses that free plans change, so comparing skills keep you ready.",
          },
          {
            prompt: "Why is a web search feature with sources useful?",
            options: [
              "It makes the assistant never wrong",
              "It shows where information came from, which makes checking easier",
              "It removes daily limits",
              "It translates everything perfectly",
            ],
            answer_index: 1,
            explanation: "The lesson says sources make checking easier, not that the tool becomes perfect.",
          },
          {
            prompt: "Which account should you use to sign up for an AI assistant?",
            options: [
              "A friend's account to save time",
              "A shared office account",
              "An account you control, with two step verification turned on",
              "No account; always use someone else's phone",
            ],
            answer_index: 2,
            explanation: "The lesson advises using your own account and turning on two step verification.",
          },
          {
            prompt: "What is one way the lesson suggests to save mobile data?",
            options: [
              "Generate long videos on mobile data",
              "Upload every file you have",
              "Keep the app open all day",
              "Do heavy tasks on free Wi Fi at a school, library or community centre",
            ],
            answer_index: 3,
            explanation: "The lesson suggests doing heavy tasks on free Wi Fi when you can.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "privacy-safety": {
      explanation_md: `## Why this matters

When you type into an AI assistant, your words travel to the company's computers. Depending on the tool and your settings, they may be stored, used to improve the tool, or read by human reviewers checking quality. Some providers say this openly in their privacy pages. If you paste a client's customer list or a friend's medical details into a chat, you may have shared it with people who were never meant to see it. Employers and clients care about this a lot, and getting it right is part of being trusted with real work.

## What never goes in

Keep these out of AI tools unless your employer has given you an approved tool and clear permission:

* Passwords, PINs, MoMo PINs and one time codes.
* Ghana Card numbers, bank details and full dates of birth.
* Other people's personal information: names with phone numbers, addresses, health, school results, salaries.
* A client's private business information: customer lists, unreleased plans, contracts, financial records.
* Anything you were told is confidential.

If you need help with a document that contains personal details, **remove or replace them first**. Change "Amina Seidu, 024 000 0000, Nalerigu" to "Customer A, phone removed, town removed". The AI can still help with the wording.

## Settings worth checking

Most assistants have a settings or privacy page. Look for options to:

* Stop your chats being used to train or improve the tool.
* Use a temporary or private chat that is not saved to your history.
* Delete your chat history.
* See which apps or files the assistant can access.

Settings names differ between tools and change over time, so read the current privacy page for whichever tool you use.

## Ghana's data protection law

Ghana has a **Data Protection Act, 2012 (Act 843)**, overseen by the Data Protection Commission. In simple terms, it expects anyone handling other people's personal data to collect it fairly, use it only for the purpose it was collected for, and keep it secure. If you handle customer or survey data for a business or NGO, pasting it into a public AI tool can break that trust and possibly the rules. When unsure, ask your employer, and read the Commission's guidance.

## Staying safe from AI powered scams

Scammers use AI too: realistic fake voices, polished fake job offers and fake "AI investment" schemes. Be careful with messages that rush you, ask for payment to get a job, or ask for codes and PINs.

## A small example

Sumaila does admin work for a clinic in Yendi and wants help writing a reminder letter to patients. Instead of pasting the patient list, he asks the AI for a template with blanks like [Patient name] and [Appointment date], then fills them in himself offline. The clinic gets a clear letter, and no patient details ever leave the office.`,
      practice_task_md: `**Goal:** make your AI use safe before you do real work.

1. Open the settings and privacy page of the AI assistant you chose. Find and note: whether chats are used to improve the tool, whether you can turn that off, whether there is a temporary chat option, and how to delete history. Change the settings you are comfortable changing.
2. Take this made up message and rewrite it with all personal details removed or replaced, so it would be safe to paste into an AI tool:
   "Please help me write a payment reminder to Fuseini Alhassan, 055 000 1111, House 12 Kalpohin, Tamale, who owes GHS 450 for a school uniform order."
3. Write a short personal rule list in your journal: five things you will never paste into an AI tool.

**Done looks like:** notes on your settings, the safe rewritten message, and your five rules.`,
      quiz: {
        questions: [
          {
            prompt: "What can happen to what you type into an AI assistant?",
            options: [
              "It is always deleted the moment you close the app",
              "Depending on settings, it may be stored, used to improve the tool or read by reviewers",
              "Only you can ever see it, no matter the settings",
              "It is printed and posted to you",
            ],
            answer_index: 1,
            explanation: "The lesson explains that chats may be stored, used for improvement or reviewed depending on the tool and settings.",
          },
          {
            prompt: "Which of these should you keep out of a public AI tool?",
            options: [
              "A question about how to write a polite email",
              "A request to explain what a spreadsheet is",
              "A client's customer list with names and phone numbers",
              "A request for ideas for a shop name",
            ],
            answer_index: 2,
            explanation: "Other people's personal information and client business data should not go into AI tools.",
          },
          {
            prompt: "You need AI help with a letter that contains a customer's details. What should you do?",
            options: [
              "Replace the personal details with placeholders before pasting",
              "Paste it as it is; AI tools are private",
              "Post it in a public WhatsApp group first",
              "Add more details so the AI understands better",
            ],
            answer_index: 0,
            explanation: "The lesson says to remove or replace personal details first.",
          },
          {
            prompt: "What does Ghana's Data Protection Act expect, in simple terms?",
            options: [
              "That personal data can be shared with anyone online",
              "That only government offices handle personal data",
              "That AI tools are banned in Ghana",
              "That personal data is collected fairly, used for its purpose and kept secure",
            ],
            answer_index: 3,
            explanation: "The lesson summarises Act 843 as fair collection, use for the stated purpose and keeping data secure.",
          },
          {
            prompt: "A message offers you a job but asks you to pay a fee first. What is the safest view?",
            options: [
              "It is a normal part of every job application",
              "It is a warning sign of a scam",
              "Pay quickly before someone else does",
              "Send your MoMo PIN to confirm",
            ],
            answer_index: 1,
            explanation: "The lesson warns that asking for payment to get a job is a sign of a scam.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
