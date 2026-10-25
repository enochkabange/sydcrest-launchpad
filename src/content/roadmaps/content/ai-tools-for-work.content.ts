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
    prompting: {
      explanation_md: `## Why this matters

Two people can use the same free AI assistant and get very different results. One types "write a CV" and gets something generic that could belong to anyone. The other explains who the CV is for, what job it targets, what experience to include and how long it should be, and gets a strong first draft in one go. The difference is the **prompt**: the request you give the assistant.

Adverts for content, admin and assistant roles increasingly mention prompting, sometimes called prompt engineering. You do not need a special course or secret formula. You need clear thinking, plain language and the habit of checking what comes back.

## What this section covers

* **Writing clear prompts.** The parts of a strong request: the task, the context, who the result is for and the format you want. You will practise turning vague requests into precise ones.
* **Improving answers step by step.** How to treat AI as a conversation: giving feedback, showing an example of what you want, and splitting big jobs into smaller steps.
* **Checking facts and spotting made up answers.** A simple routine for verifying claims, figures, names and links before anything goes out with your name on it.

## The mindset

Think of an AI assistant as a very fast new helper who has read a lot but knows nothing about your situation. If you were briefing a new helper at a shop in Walewale, you would not just say "sort the stock". You would explain which shelf, what order, and what to do with damaged items. Prompting is the same skill: giving a clear brief.

And just as you would check a new helper's work before a customer sees it, you check AI output before using it. Prompting gets you a better first draft. Checking makes it safe to use.

## A small example

Abdul-Rahman, who helps a youth association in Tamale, first asks: "Write an announcement." The answer is vague and too formal. He tries again: "Write a short, friendly WhatsApp announcement for members of a youth association in Tamale. The clean up exercise is on Saturday at 7am at the central mosque area. Ask members to bring brooms and rakes. Keep it under 60 words and end with a thank you." The new draft is almost ready. He changes one phrase to sound more like himself and checks the date and time. Done in two minutes.

## Practice as you go

Keep a "prompt notebook" section in your AI learning journal. Every time a prompt works well, save it. These saved prompts become the reusable templates you will build later in the automation section, and they are good evidence of skill in a portfolio.`,
      practice_task_md: `**Goal:** feel the difference a clear prompt makes.

1. Choose a real task you need, such as a message to a group, a short bio or a thank you note.
2. Ask a free AI assistant using a vague prompt, for example "Write a bio."
3. Ask again with a clear brief: say what it is for, who will read it, two or three facts to include, the tone and the length.
4. Paste both prompts and both answers into the prompt notebook in your journal. Under them, write two sentences on what changed.

**Done looks like:** a before and after pair you can show a mentor, plus the improved prompt saved for reuse.`,
      quiz: {
        questions: [
          {
            prompt: "What is a prompt?",
            options: [
              "The request you give an AI assistant",
              "A paid upgrade for an AI tool",
              "A type of computer virus",
              "The answer the AI gives back",
            ],
            answer_index: 0,
            explanation: "The lesson defines the prompt as the request you give the assistant.",
          },
          {
            prompt: "According to the lesson, what does prompting mostly require?",
            options: [
              "A paid certificate",
              "Knowing how to write computer code",
              "Clear thinking, plain language and the habit of checking results",
              "A secret formula that only experts know",
            ],
            answer_index: 2,
            explanation: "The lesson says you need clear thinking, plain language and checking, not a secret formula.",
          },
          {
            prompt: "The lesson compares an AI assistant to which of these?",
            options: [
              "A strict examiner",
              "A very fast new helper who knows nothing about your situation",
              "A trusted lawyer",
              "A search engine that is never wrong",
            ],
            answer_index: 1,
            explanation: "The lesson compares it to a fast new helper who needs a clear brief.",
          },
          {
            prompt: "Why did Abdul-Rahman's second prompt work better?",
            options: [
              "He used more difficult words",
              "He asked the AI to guess the details",
              "He paid for a better plan",
              "He gave the audience, details, tone and length",
            ],
            answer_index: 3,
            explanation: "His second prompt included who it was for, the event details, the tone and a word limit.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "prompt-basics": {
      explanation_md: `## Why this matters

Clear prompts save you time, data and frustration. On a phone with a limited bundle, getting a useful answer on the first or second try instead of the fifth matters. It also shows employers that you can communicate clearly, which is a skill in its own right.

## The four parts of a strong prompt

You do not need all four every time, but checking for them improves almost any request.

1. **Task.** What exactly should it do? Use a clear action word: write, summarise, list, explain, rewrite, compare, translate.
2. **Context.** What does it need to know? Who you are, the situation, key facts, what has already happened.
3. **Audience.** Who is the result for? A customer, a manager, a JHS student, a donor, a market women's group. This changes tone and vocabulary.
4. **Format.** What should the result look like? Length, bullet points or paragraphs, a table, a WhatsApp message, three options to choose from.

## Extra tips that help

* **Give it a role** when useful: "Act as a friendly customer service assistant for a small shop."
* **Say what to avoid:** "Do not promise delivery dates. Avoid difficult words."
* **Paste the material** it should work from, after removing personal details, rather than expecting it to know.
* **Ask it to ask you questions:** "Before you write, ask me any questions you need answered." This is a great way to discover what context you forgot.
* **Keep it plain.** Write as you would to a person. Ghanaian English is fine.

## A small example

Vague prompt:

> Write something about my business.

Strong prompt:

> **Task:** Write three short Facebook post options.
> **Context:** I sell handmade shea butter soap in Bolgatanga. It is gentle on skin and made with local shea butter. A bar costs GHS 15 and customers can pay by MoMo.
> **Audience:** Young working women in Bolgatanga and Tamale.
> **Format:** Each post under 50 words, friendly tone, one emoji at most, ending with how to order.

The second prompt gives Napari, the soap maker, three usable options to choose from and edit. The first would have given her a generic paragraph that sounds like every other business.

## Check before you send

Even with a strong prompt, read the answer as the customer would. Are the facts right? Does it sound like you? Would you be comfortable signing it? A great prompt reduces editing; it never removes it.`,
      practice_task_md: `**Goal:** write three strong prompts using the four parts.

1. Pick three real tasks from your life or a business you know, such as a shop announcement, a CV summary and a message to a teacher or employer.
2. For each, write a prompt with the four labelled parts: **Task, Context, Audience, Format.** Remove any personal details you would not want to share.
3. Run each prompt in a free AI assistant. Edit the best answer for each until you would happily send it.
4. Save the three prompts and your edited results in your prompt notebook.

**Done looks like:** three labelled prompts and three edited results. Ask a mentor to judge whether each result is ready to send.`,
      quiz: {
        questions: [
          {
            prompt: "Which list shows the four parts of a strong prompt from the lesson?",
            options: [
              "Task, context, audience, format",
              "Title, colour, font, picture",
              "Password, username, email, phone",
              "Question, guess, answer, score",
            ],
            answer_index: 0,
            explanation: "The lesson names task, context, audience and format as the four parts.",
          },
          {
            prompt: "Why does the audience part of a prompt matter?",
            options: [
              "It makes the answer longer",
              "It changes the tone and vocabulary of the result",
              "It makes the AI search the internet",
              "It is needed to log in",
            ],
            answer_index: 1,
            explanation: "The lesson says the audience changes tone and vocabulary.",
          },
          {
            prompt: "What is a good way to find out what context you forgot to give?",
            options: [
              "Ask the AI to guess everything",
              "Make the prompt as short as possible",
              "Ask the AI to ask you questions before it writes",
              "Write the prompt in capital letters",
            ],
            answer_index: 2,
            explanation: "The lesson suggests asking the assistant to ask you questions first.",
          },
          {
            prompt: "In the soap example, which detail belongs to the format part?",
            options: [
              "Handmade shea butter soap from Bolgatanga",
              "Young working women in Bolgatanga and Tamale",
              "Write three Facebook post options",
              "Each post under 50 words, ending with how to order",
            ],
            answer_index: 3,
            explanation: "Length and how each post ends describe the format.",
          },
          {
            prompt: "After writing a strong prompt and getting an answer, what should you still do?",
            options: [
              "Read it as the reader would and check the facts and tone",
              "Send it immediately without reading",
              "Delete it and start over",
              "Ask the AI to sign your name",
            ],
            answer_index: 0,
            explanation: "The lesson says a great prompt reduces editing but never removes it.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "improving-answers": {
      explanation_md: `## Why this matters

Many beginners give up after one disappointing answer. People who get good results treat the assistant like a conversation: they react to the first draft, say what to change and keep going until it is right. This is faster than writing a perfect prompt from scratch, and it is how real AI assisted work is usually done.

## Techniques that work

**1. Give specific feedback.** "Make it better" is weak. Say exactly what to change:

* "Make it shorter, under 40 words."
* "The tone is too formal. Make it warm, like a message to a regular customer."
* "Remove the second paragraph and add the price."
* "Use simpler words; my readers are new to smartphones."

**2. Show an example.** If you have a message or post you like, paste it and say "Write in a similar style to this example." Showing is often clearer than describing. Giving one or two examples like this is sometimes called few shot prompting.

**3. Break big jobs into steps.** Instead of "Write my whole business plan", go step by step: first ask for an outline, then work on one section at a time, checking each before moving on. Smaller steps give better quality and make mistakes easier to spot.

**4. Ask for options.** "Give me three different headlines" lets you choose and combine the best parts.

**5. Ask it to check itself.** "Review your answer. List anything that might be wrong or that I should verify." This does not replace your own checking, but it can point to weak spots.

**6. Start fresh when stuck.** Long chats can drift. If answers get worse, open a new chat and give one clean, improved prompt that includes what you learned.

## A small example

Amina wants a short flyer text for her tailoring shop in Damongo.

First answer: long and full of words like "exquisite" and "unparalleled".

Her feedback: "Too fancy. Use simple everyday English. Under 35 words. Mention school uniforms and Sallah outfits, and that I am near the lorry station."

Second answer: much closer, but it invents a discount.

Her feedback: "Remove the discount; I do not offer one. Add 'Call or WhatsApp' and leave a blank for my number."

Third answer: ready to use. Three short rounds, under five minutes.

## Keep your improved prompt

When a conversation finally gives you what you want, ask: "Write one prompt I could use next time to get this result in one step." Save that prompt in your notebook. You are turning a conversation into a reusable tool.`,
      practice_task_md: `**Goal:** improve an AI answer through at least three rounds of feedback.

1. Ask a free AI assistant for something short and practical, such as a flyer text, a product description or a short speech for a church or mosque youth event.
2. Give at least three rounds of specific feedback (length, tone, facts, words to remove or add). Correct anything it invents.
3. Ask it to write one prompt that would get the final result in one step.
4. In your journal, record each round: your feedback and one sentence on what changed. Save the final one step prompt.

**Done looks like:** a short record of three or more rounds, the final text, and a saved one step prompt.`,
      quiz: {
        questions: [
          {
            prompt: "Which feedback is the most useful to give an AI assistant?",
            options: [
              "\"Make it better.\"",
              "\"Try again.\"",
              "\"The tone is too formal; make it warm and under 40 words.\"",
              "\"Wrong.\"",
            ],
            answer_index: 2,
            explanation: "The lesson says specific feedback about what to change works best.",
          },
          {
            prompt: "What does showing the assistant one or two examples of what you want help with?",
            options: [
              "It makes the assistant work offline",
              "It shows the style you want more clearly than describing it",
              "It removes the need to check facts",
              "It increases your daily message limit",
            ],
            answer_index: 1,
            explanation: "The lesson says showing is often clearer than describing.",
          },
          {
            prompt: "Why break a big job like a business plan into steps?",
            options: [
              "Smaller steps give better quality and make mistakes easier to spot",
              "The AI cannot read long prompts at all",
              "It uses more data, which is better",
              "So you never have to read the results",
            ],
            answer_index: 0,
            explanation: "The lesson explains that small steps improve quality and make errors easier to catch.",
          },
          {
            prompt: "What should you do if a long chat keeps giving worse answers?",
            options: [
              "Keep typing the same request",
              "Stop using AI forever",
              "Copy the worse answers anyway",
              "Open a new chat with one clean, improved prompt",
            ],
            answer_index: 3,
            explanation: "The lesson suggests starting fresh with a clean prompt when a chat drifts.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "checking-facts": {
      explanation_md: `## Why this matters

When your work goes to a client, an employer or the public, your name is on it, not the AI's. A wrong price, a made up statistic, a fake quote or a link that leads nowhere can embarrass you, mislead people and cost you the job. Content roles that welcome AI use still expect accuracy; that is why adverts say things like "use AI tools while maintaining quality and accuracy". Checking is the skill that makes AI safe to use at work.

## What to check every time

Read AI output looking for anything that could be **true or false**:

* Names of people, places, organisations and laws.
* Dates, prices, figures, percentages and statistics.
* Quotes attributed to anyone.
* Links, references and book or article titles.
* Claims about what a company, government office or product does.
* Instructions where a mistake could cause harm, such as health, money or legal steps.

Opinions and wording are your call. Facts need evidence.

## A simple checking routine

1. **Mark the claims.** Go through the text and mark every factual claim.
2. **Find a reliable source** for each one: an official website (a ministry, the Ghana Statistical Service, a company's own site), a respected news outlet, a textbook, or a person who truly knows, like the shop owner or the event organiser.
3. **Open every link.** Check it loads and actually says what the AI claims. AI tools sometimes invent links that look real.
4. **Fix or remove.** If you cannot confirm a claim, remove it or rewrite it so it no longer states something you cannot back up.
5. **Keep a note** of where you checked, so you can answer if a client asks.

## Useful habits

* Ask the assistant for its sources, then check them yourself. A listed source is a lead, not proof.
* If a tool searches the web, still open the sources; summaries can misread them.
* Be extra careful with numbers. Recalculate totals yourself or in a spreadsheet.
* For news and viral claims in Ghana, independent fact checkers such as GhanaFact and Dubawa publish checks you can search.
* Watch for confident filler like "studies show" with no study named. Remove it or find the study.

## A small example

Wumpini is writing a short article for a farmers' cooperative in Savelugu using AI help. The draft says a government fertiliser programme gives a fixed amount per farmer and cites a website. She opens the link: it does not exist. She checks the Ministry of Food and Agriculture's site and calls the cooperative's extension officer, who explains the real current arrangement. She rewrites the paragraph with the correct information and a real source. The cooperative trusts her with the next article too.`,
      practice_task_md: `**Goal:** fact check an AI answer like a professional.

1. Ask a free AI assistant: "Write a 150 word introduction to [a real Ghanaian organisation, festival or place you know] with three facts and one source link."
2. Mark every factual claim in the answer.
3. Check each claim using an official website, a trusted news source or someone who knows. Open the link it gave you.
4. Make a small table in your journal: claim, true / false / could not confirm, and where you checked.
5. Rewrite the introduction using only claims you confirmed, adding your real sources.

**Done looks like:** the original answer, your checking table and the corrected version. This makes a strong portfolio piece.`,
      quiz: {
        questions: [
          {
            prompt: "Which part of an AI answer most needs checking against evidence?",
            options: [
              "Whether you like the tone",
              "Factual claims such as names, dates, prices, quotes and links",
              "The font it appears in",
              "How long it took to appear",
            ],
            answer_index: 1,
            explanation: "The lesson says wording is your call but factual claims need evidence.",
          },
          {
            prompt: "An AI answer includes a link as its source. What should you do?",
            options: [
              "Trust it because AI provided it",
              "Delete the whole answer",
              "Open it and confirm it loads and says what the AI claims",
              "Share it without opening it",
            ],
            answer_index: 2,
            explanation: "The lesson warns that AI tools sometimes invent links, so open every one.",
          },
          {
            prompt: "If you cannot confirm a claim after checking, what should you do?",
            options: [
              "Remove it or rewrite it so it no longer states something you cannot back up",
              "Keep it because it sounds right",
              "Add more detail to make it convincing",
              "Ask the AI to say it more confidently",
            ],
            answer_index: 0,
            explanation: "Step four of the routine is to fix or remove unconfirmed claims.",
          },
          {
            prompt: "Which of these is a reliable source for checking a fact?",
            options: [
              "A second AI tool's answer with no sources",
              "A forwarded WhatsApp message",
              "A comment on social media",
              "An official website of the organisation involved",
            ],
            answer_index: 3,
            explanation: "The lesson lists official websites, respected news, textbooks and people who know as reliable sources.",
          },
          {
            prompt: "What did Wumpini find when she opened the link in her AI draft?",
            options: [
              "It was correct and needed no changes",
              "It did not exist, so she checked official sources and an extension officer",
              "It was a video",
              "It asked her to pay",
            ],
            answer_index: 1,
            explanation: "The link was invented, so she found the real information from reliable sources.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "everyday-work": {
      explanation_md: `## Why this matters

When Ghanaian and remote adverts mention AI, the jobs themselves are usually familiar: virtual assistant, content writer, social media officer, admin assistant, customer support, research assistant. What has changed is that employers expect these people to use AI to work faster. A virtual assistant who can turn a messy voice note into a clean email, summarise a long report into five points and fix a broken spreadsheet formula in minutes is worth more than one who cannot.

This section is about those everyday tasks. Each one is a skill you can practise on your phone and show to an employer or client.

## The five topics in this section

* **Writing and editing with AI.** Drafting and polishing emails, WhatsApp messages, CVs, reports and social posts, while keeping your own voice and only stating what is true.
* **Summarising and research.** Turning long documents, notes and reports into clear summaries, and using AI to plan research without trusting it blindly.
* **Spreadsheets and data help.** Getting formulas explained or suggested, cleaning messy lists and reading tables, then testing everything on real rows.
* **Images and visuals (optional).** Using AI image tools for illustrations and ideas, knowing their weaknesses and labelling AI images honestly.
* **Translation and local languages.** Using AI translation for English and Ghanaian languages as a first draft, then checking with fluent speakers.

## One method for every task

Every topic in this section follows the same four steps:

1. **Prepare.** Gather the material and remove personal or confidential details.
2. **Prompt.** Give a clear brief: task, context, audience, format.
3. **Improve.** Give feedback until the result is close.
4. **Check and own it.** Verify facts, numbers and translations, then edit so it sounds like you. You are responsible for the final version.

If you remember this method, you can apply AI to tasks this track never mentions.

## A small example of a working day

Mariama works part time as a remote assistant for a small travel business. In one morning she:

* Turns the owner's rushed voice note into a polite email to a hotel (writing).
* Summarises a long tour operator contract into the five points the owner must decide on (summarising), checking each point against the contract.
* Gets help with a formula that totals bookings by month in Google Sheets (data), then tests it on a few rows she can add up by hand.
* Asks for a first draft of a welcome message in Twi for visiting guests (translation), then has a fluent friend correct it.

None of this replaced her judgement. All of it saved her time.

## Doing this on a phone

Every task here works on a phone. Google Docs and Sheets, a notes app and a free AI assistant are enough. Use voice typing to speed up long prompts, and copy text between apps with a long press. When you have access to a computer at school, a library or a community centre, try the same tasks there too; employers like to see that you can work on both.`,
      practice_task_md: `**Goal:** map AI onto real work you could do.

1. Choose one job title you are interested in, such as virtual assistant, social media officer or admin assistant.
2. List five everyday tasks that job involves. If you are unsure, read a few real job adverts on a Ghanaian job site and note the tasks (do not copy the advert).
3. For each task, write which of the five topics in this section could help and one way you would check the AI's work.
4. Save the list in your journal. You will tick tasks off as you practise them in the next lessons.

**Done looks like:** a five row list of tasks, matching AI help and a checking step for each.`,
      quiz: {
        questions: [
          {
            prompt: "What kind of jobs usually mention AI tool skills in adverts, according to the lesson?",
            options: [
              "Only jobs building AI systems",
              "Familiar jobs like virtual assistant, content writer and admin assistant",
              "Only government jobs",
              "Jobs that do not involve computers",
            ],
            answer_index: 1,
            explanation: "The lesson says the jobs are usually familiar ones where employers expect faster work with AI.",
          },
          {
            prompt: "What are the four steps of the method used for every task in this section?",
            options: [
              "Prepare, prompt, improve, check and own it",
              "Copy, paste, send, forget",
              "Search, download, print, file",
              "Guess, post, wait, delete",
            ],
            answer_index: 0,
            explanation: "The lesson names prepare, prompt, improve, and check and own it.",
          },
          {
            prompt: "What happens in the prepare step?",
            options: [
              "You send the final result to the client",
              "You choose a font",
              "You gather the material and remove personal or confidential details",
              "You pay for a subscription",
            ],
            answer_index: 2,
            explanation: "Preparing means gathering material and removing sensitive details first.",
          },
          {
            prompt: "How did Mariama check the formula she got help with?",
            options: [
              "She trusted it because AI wrote it",
              "She asked the hotel",
              "She deleted the spreadsheet",
              "She tested it on a few rows she could add up by hand",
            ],
            answer_index: 3,
            explanation: "She tested the formula on rows she could check by hand.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "writing-editing": {
      explanation_md: `## Why this matters

Writing is part of almost every job: emails to clients, WhatsApp messages to customers, reports for managers, posts for a business page, applications for jobs. AI can help you write faster and more clearly, especially if English is your second or third language. But clients and employers can often tell when text is lazy AI output: too flowery, too general, and not quite true. The skill is using AI to write **better**, not just more.

## What AI is good at in writing

* Turning rough notes or a voice note into a clear draft.
* Rewriting for a different reader: more formal for a manager, simpler for a customer.
* Fixing grammar, spelling and awkward sentences.
* Shortening long messages.
* Suggesting a structure for a report or proposal.
* Giving several options for a headline or opening line.

## Keeping it yours and keeping it true

* **Give it your facts.** Do not ask AI to invent your experience, results or qualifications. On a CV, every line must be true; employers check, and false claims can end a job.
* **Cut the fancy words.** If the draft says "delve", "unparalleled" or "in today's fast paced world", rewrite in plain words you would actually use.
* **Read it aloud.** Does it sound like you? Would you say this to the person's face?
* **Check names, dates and promises.** AI sometimes adds an offer or detail you never mentioned.
* **Respect the reader.** For Ghanaian customers and colleagues, warm greetings and politeness matter. Ask the AI to match that, then adjust.

## A small example

Fuseini is applying for a data entry clerk job in Tamale. He writes rough notes: "SHS certificate, did data entry for my uncle's pharmacy 6 months, know Google Sheets, type fast, reliable." He prompts:

> Using only these facts, write a short, polite cover message for a data entry clerk job at a company in Tamale. Under 120 words. Simple, confident English. Do not add any experience I have not listed.

The draft is good but says he "managed a team". He did not, so he removes it. He replaces "I am thrilled" with "I am glad", which sounds more like him, and adds the name of the company. The final message is clear, true and his.

## Editing someone else's draft

AI is also a good second reader. Paste your own writing and ask: "Point out unclear sentences and grammar mistakes, but do not rewrite the whole thing." You learn from the suggestions instead of handing over your voice entirely. Over time your own writing improves, which matters in interviews and timed tests where AI is not available.`,
      practice_task_md: `**Goal:** produce three pieces of real, AI assisted writing you would happily sign.

1. Write rough notes for three items: a short professional bio, a polite email asking about a job or internship, and a WhatsApp message for a business you know.
2. For each, prompt a free AI assistant with your notes and the instruction "Use only these facts."
3. Edit each draft: remove anything untrue, replace fancy words with plain ones, read it aloud, and make it sound like you.
4. Save your notes, the AI drafts and your final versions side by side in your journal.

**Done looks like:** three before and after pairs showing your edits. Ask a mentor which final version is strongest.`,
      quiz: {
        questions: [
          {
            prompt: "Which is a good use of AI in writing?",
            options: [
              "Inventing work experience for your CV",
              "Turning your rough notes into a clear draft",
              "Writing reviews of products you never used",
              "Making promises to customers you cannot keep",
            ],
            answer_index: 1,
            explanation: "Turning rough notes into a clear draft is listed as a good use; the others are dishonest.",
          },
          {
            prompt: "Why must every line on an AI assisted CV be true?",
            options: [
              "Employers check, and false claims can end a job",
              "AI tools refuse to write CVs",
              "CVs are never read",
              "Only handwritten CVs are accepted",
            ],
            answer_index: 0,
            explanation: "The lesson warns that employers check and false claims can cost you the job.",
          },
          {
            prompt: "What did Fuseini do when the draft said he had managed a team?",
            options: [
              "Left it in because it sounded good",
              "Added more false experience",
              "Removed it because it was not true",
              "Sent the draft without reading it",
            ],
            answer_index: 2,
            explanation: "He removed the untrue claim before sending.",
          },
          {
            prompt: "What is a good way to use AI as a second reader of your own writing?",
            options: [
              "Ask it to rewrite everything in a new style",
              "Ask it to add impressive words",
              "Ask it to make the text longer",
              "Ask it to point out unclear sentences and mistakes without rewriting everything",
            ],
            answer_index: 3,
            explanation: "The lesson suggests asking for pointers so you learn and keep your voice.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "summarising-research": {
      explanation_md: `## Why this matters

Managers, NGO officers and business owners are busy. Someone who can read a long report, contract or set of meeting notes and return a clear, accurate summary saves them hours. Research assistants, virtual assistants and project officers do this every week. AI makes summarising much faster, but a summary that leaves out the key risk or adds a point that was never there is worse than none.

## Asking for the right summary

"Summarise this" gets a generic result. Say what kind of summary you need:

* **Key points:** "List the five most important points in plain English."
* **Decisions and actions:** "List every decision made and every action, with who is responsible and the deadline."
* **For a reader:** "Summarise this for a busy director in under 100 words" or "for community members who did not attend".
* **Questions:** "What questions should a manager ask after reading this?"

Paste the actual text, or upload the file if your tool allows it and the content is not confidential. Long documents may be too big for a free plan; split them into parts and summarise each.

## Checking a summary

The danger with summaries is **what is missing** and **what was added**. After you get one:

1. Read the original's headings, first lines of each section and conclusion.
2. Check that each summary point really appears in the original.
3. Look for anything important the summary skipped, especially numbers, deadlines, risks and conditions.
4. Check numbers and names exactly.

## Using AI for research, carefully

AI can help you **plan** research: suggest questions to ask, explain terms you do not know, and outline what a topic usually covers. Tools with web search can find sources faster. But treat every source as a lead to open and read, not a fact to copy. For anything official in Ghana, go to the original source: the ministry, agency or organisation's own website or documents.

## A small example

Hawa is an intern with an NGO in Bolgatanga. Her supervisor gives her a 20 page field report and asks for a one page brief before a meeting. Hawa removes the names of community members, pastes the report in sections, and asks for "the main findings, the problems reported, and the recommendations, in plain English, with page numbers". She then checks each point against the report. She finds the summary missed a water point breakdown in one community and stated one figure wrongly. She fixes both and adds the page numbers so her supervisor can check. Her brief takes one hour instead of an afternoon, and it is accurate.

## Voice notes and meetings

Some assistants can transcribe and summarise audio. This is handy for meetings and voice notes, but get permission before recording people, and do not upload recordings with private information to public tools.`,
      practice_task_md: `**Goal:** produce a checked summary of a real document.

1. Choose a public document of at least three pages: a news article, a school or church report, a public NGO report or a government press release.
2. Ask a free AI assistant for a summary in the form a busy manager would want: key points, any decisions or actions, and any numbers, under 150 words.
3. Check the summary against the original using the four checking steps. Note anything missing, added or wrong.
4. Write your corrected summary and add a line on what you fixed.

**Done looks like:** the document's title and link, the AI summary, your list of fixes and your final summary.`,
      quiz: {
        questions: [
          {
            prompt: "Why is \"Summarise this\" a weak prompt?",
            options: [
              "It is too long",
              "It does not say what kind of summary or which reader it is for",
              "AI cannot summarise anything",
              "It uses difficult words",
            ],
            answer_index: 1,
            explanation: "The lesson says you should state the type of summary and the reader.",
          },
          {
            prompt: "What are the two main dangers to check for in an AI summary?",
            options: [
              "Spelling and font size",
              "Colour and layout",
              "What is missing and what was added",
              "Length and speed",
            ],
            answer_index: 2,
            explanation: "The lesson names what is missing and what was added as the key dangers.",
          },
          {
            prompt: "What should you do if a long document is too big for a free plan?",
            options: [
              "Split it into parts and summarise each",
              "Give up on the task",
              "Summarise only the title",
              "Pay for every tool available",
            ],
            answer_index: 0,
            explanation: "The lesson suggests splitting long documents into parts.",
          },
          {
            prompt: "How should you treat sources an AI tool gives you during research?",
            options: [
              "As facts to copy straight into your work",
              "As something to ignore",
              "As proof you never need to check",
              "As leads to open and read yourself",
            ],
            answer_index: 3,
            explanation: "The lesson says each source is a lead to open, not a fact to copy.",
          },
          {
            prompt: "What did Hawa do before pasting the field report into the AI tool?",
            options: [
              "Removed the names of community members",
              "Posted it on social media",
              "Translated it into French",
              "Deleted the recommendations",
            ],
            answer_index: 0,
            explanation: "She removed personal names to protect the community members.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "spreadsheets-data": {
      explanation_md: `## Why this matters

Spreadsheets appear in adverts for admin, data entry, assistant and NGO roles across Ghana. Many people get stuck on formulas. AI assistants are very good at explaining what a formula does, suggesting one for a task you describe, and walking you through cleaning a messy list. Used well, this turns spreadsheet problems that used to take an afternoon into minutes. Used carelessly, it produces totals that look right and are wrong.

## Good ways to use AI with spreadsheets

* **Explain a formula** someone else wrote: paste it and ask "Explain what this does, step by step, in simple words."
* **Suggest a formula** for a task: describe your columns and what you want.
* **Plan a cleaning job:** "My column of phone numbers has spaces, some start with +233 and some with 0. How can I make them consistent?"
* **Fix an error:** paste the formula and the error message.
* **Read a table:** paste a small, non confidential table and ask what patterns stand out, then check them yourself.

## Describe your sheet clearly

AI cannot see your sheet. Tell it:

* Which columns hold what, for example "Column A is date, B is item, C is amount in cedis".
* Which rows the data covers, for example rows 2 to 31.
* Which app you use, since Google Sheets and Excel differ slightly.

## Always test

Before you trust any formula:

1. Try it on a few rows you can work out by hand.
2. Check the cell ranges cover all your data, not just part of it.
3. Watch for date formats (day first or month first) and blank cells.
4. Ask the AI what could make the formula give a wrong answer.

## A small example

Sumaila manages records for a chop bar in Tamale. His sheet has the date in column A, the dish in column B and the sale amount in column C, for rows 2 to 31. He asks how to get the total sales of waakye for the month. The assistant suggests:

\`=SUMIF(B2:B31,"Waakye",C2:C31)\`

It explains: look down column B, and wherever it says Waakye, add up the matching amount in column C. Sumaila tests it by adding the first week's waakye sales by hand, and the numbers match. Then he notices some rows say "waakye " with an extra space, which the formula misses. He asks the AI how to remove extra spaces, uses TRIM to clean the column, and now the total is right.

## Keep data safe

Do not paste real customer names, phone numbers or financial records into public AI tools. Describe the columns instead, or make up a few sample rows with fake values that have the same shape as the real data.`,
      practice_task_md: `**Goal:** use AI to build and test a formula on a small sheet.

1. In Google Sheets on your phone, create a made up sales record for a small shop: 15 rows with columns Date, Item (use three items, such as rice, oil and sugar) and Amount (GHS).
2. Ask a free AI assistant for formulas to: total sales for one item, count how many sales were above GHS 50, and find the average sale. Describe your columns and rows clearly.
3. Test each formula against your own hand calculation for a few rows. Note any problem and how you fixed it.
4. Ask the AI to explain one formula in simple words, and write that explanation in a note beside it in the sheet.

**Done looks like:** a sheet with working, tested formulas and short notes explaining them. Share the link with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why must you describe your columns and rows to an AI assistant?",
            options: [
              "It cannot see your sheet, so it needs to know where the data is",
              "It is required to log in",
              "It makes the formula longer",
              "Spreadsheets do not have columns",
            ],
            answer_index: 0,
            explanation: "The lesson says AI cannot see your sheet, so you must describe it.",
          },
          {
            prompt: "What does the formula =SUMIF(B2:B31,\"Waakye\",C2:C31) do in the example?",
            options: [
              "Counts how many dishes there are",
              "Finds the most popular dish",
              "Adds the amounts in column C wherever column B says Waakye",
              "Deletes rows that mention Waakye",
            ],
            answer_index: 2,
            explanation: "The lesson explains it adds matching amounts in column C where column B says Waakye.",
          },
          {
            prompt: "What is the first test the lesson recommends for any AI suggested formula?",
            options: [
              "Share it with all your contacts",
              "Try it on a few rows you can work out by hand",
              "Make the font bold",
              "Ask a different AI if it is correct and stop there",
            ],
            answer_index: 1,
            explanation: "Testing on rows you can calculate by hand comes first.",
          },
          {
            prompt: "Why did Sumaila's first total miss some sales?",
            options: [
              "The AI tool was offline",
              "The sheet was too long",
              "He used the wrong app",
              "Some rows had an extra space after the dish name",
            ],
            answer_index: 3,
            explanation: "Extra spaces meant some rows did not match, so he cleaned them with TRIM.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "images-visuals": {
      explanation_md: `## Why this matters

Social media officers, content creators and small business owners need visuals every day: post graphics, flyer backgrounds, illustrations for a presentation. AI image tools can create pictures from a written description in seconds, and some free design apps now include them. This is optional in this track because image generation can use a lot of data and free limits are often tight, but it is a useful skill for creative roles.

## What AI image tools are good at

* Illustrations and simple scenes for posts, slides or children's materials.
* Backgrounds and patterns for flyers.
* Quick ideas to show a client before real design work.
* Editing help, such as removing a background from a photo you took.

## Where they go wrong

* **Text in images** often comes out misspelled or garbled. Add text yourself in a design app instead.
* **Hands, faces and details** can look strange. Look closely before using an image.
* **Stereotypes.** Ask for "a Ghanaian market" and you may get something that looks like a film set, not Tamale's central market. Describe what you actually want and check it looks respectful and real.
* **Copying.** Asking for an image "in the style of" a living artist or using a company's logo raises fairness and legal problems. Do not do it.

## Honesty rules for images

* **Never present an AI image as a real photo** of your product, your shop, your customers or an event. If you sell shea butter, show real photos of your real shea butter. A made up "happy customer" picture is a fake testimonial.
* Do not create images of real people without their permission, and never in a way that could embarrass or mislead.
* Label AI images where it matters, for example "Illustration made with AI". Some tools add invisible watermarks to AI images, such as Google's SynthID, which helps others detect them. Platforms such as some social media apps also ask you to label realistic AI content.

## Prompting for images

Describe the subject, setting, style and mood: "Simple flat illustration of a young woman selling fruit at a small roadside stall in northern Ghana, bright colours, friendly, no text." Then refine: change colours, simplify, remove odd details.

## A small example

Issahaku runs a phone repair stall in Wa and wants a weekly tips post. He uses an AI tool for a clean illustration of a phone with a cracked screen, then opens a free design app to add his own text, prices and WhatsApp number. For his "our work" posts, he uses only real photos of repairs he did. Customers see honest examples of his work and an eye catching tips graphic.

## Saving data

Generate on Wi Fi when you can, make one image at a time, and download only the version you will use.`,
      practice_task_md: `**Goal:** create an honest, useful graphic using AI for the picture and your own text.

1. Choose a real or imagined small business, such as a tailor, a chop bar or a phone repair stall.
2. Use any free AI image tool you can access to create one illustration for a social media post, using a prompt with subject, setting, style and "no text". Refine it at least once.
3. Open a free design app and add your own text: a short tip or announcement and contact details (use a fake number).
4. Add a small label such as "Illustration made with AI".
5. In your journal, note your prompts and one problem you noticed in the AI image.

**Done looks like:** one finished graphic with your text and a label, plus your prompt notes. If image tools are not available to you, write and save the prompt and a sketch of the layout instead.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you add text to images yourself rather than asking the AI to draw it?",
            options: [
              "AI image tools often misspell or garble text",
              "Text is not allowed on social media",
              "Text makes images use less data",
              "AI tools refuse to make text",
            ],
            answer_index: 0,
            explanation: "The lesson says text in AI images often comes out garbled.",
          },
          {
            prompt: "A shea butter seller wants to show her product online. What does the lesson say?",
            options: [
              "Use AI images of shea butter that look better than the real thing",
              "Use real photos of her real product, not AI images presented as real",
              "Copy photos from another seller",
              "Use a famous company's logo",
            ],
            answer_index: 1,
            explanation: "The lesson says never present AI images as real photos of your product.",
          },
          {
            prompt: "Which of these is a fair use of an AI image tool?",
            options: [
              "Making a fake picture of happy customers",
              "Creating an image of a real person without permission",
              "Copying a living artist's style to sell as your own",
              "A simple illustration for a tips post, labelled as made with AI",
            ],
            answer_index: 3,
            explanation: "A labelled illustration is honest; the others mislead or copy.",
          },
          {
            prompt: "What is SynthID, as mentioned in the lesson?",
            options: [
              "A type of phone screen",
              "A free photo editing app",
              "An invisible watermark that helps detect AI images",
              "A Ghanaian design school",
            ],
            answer_index: 2,
            explanation: "The lesson describes SynthID as an invisible watermark added to some AI images.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "translation-local-languages": {
      explanation_md: `## Why this matters

Most people in northern Ghana speak at least one local language, and many businesses, NGOs and health programmes need messages in Dagbani, Gonja, Dagaare, Gurune, Mampruli, Twi, Hausa and more. Being able to produce a good translation quickly is valuable, and it is also a source of remote work: some AI companies pay native speakers to transcribe, translate and check AI output in Ghanaian languages such as Twi and Dagbani.

AI translation is improving fast. Several general assistants translate, and there are tools built in Ghana, such as Khaya from the Ghana NLP community, that focus on Ghanaian languages. Big technology companies are also working with Ghanaian universities on local language AI. Which languages each tool supports, and how well, differs and changes, so test the language you need.

## What to expect

* **English to Twi, Ewe or Ga** often gives a usable first draft from tools that support them.
* **Languages with less written text online**, which includes many northern languages, may come out weaker, mixed with other languages or simply wrong.
* **Tone and respect** can be lost. Greetings, titles and polite forms matter in every Ghanaian language, and machines often miss them.
* **Names, places and numbers** can be changed by mistake.

## How to use AI translation well

1. **Write simple, clear English first.** Short sentences translate better than long, complex ones. You can ask AI to simplify your English before translating.
2. **Translate with a tool that supports the language.** Try two tools and compare.
3. **Check with a fluent speaker.** This step is not optional for anything public, medical, legal or official. A wrong word in a health message can cause harm.
4. **Back translate.** Translate the result back into English with a different tool and see if the meaning survived. This catches big errors, but it does not replace a fluent speaker.
5. **Keep a glossary** of words your organisation uses, with approved translations, so messages stay consistent.

## A small example

An NGO in Nalerigu asks Abdul-Rahman to prepare a short SMS reminding mothers about a child vaccination day. He writes it in simple English: date, place, what to bring. He tries an AI translation into Mampruli, but the result is mixed with other languages, so he asks a respected community health volunteer to translate and check it instead. For the Twi version for traders who travel to Kumasi, an AI draft is close, and a fluent colleague fixes two words and the greeting. Both messages go out correct and respectful.

## Your languages are a strength

If you speak a northern Ghanaian language fluently and read and write it, you have a skill many AI projects are looking for. Practising careful translation and checking is good preparation for that kind of work.`,
      practice_task_md: `**Goal:** produce a checked translation of a useful message.

1. Write a short, useful message in simple English (40 to 60 words), such as a shop's opening hours, a meeting reminder or a health tip.
2. Translate it into a Ghanaian language you know using two different AI tools, if your language is available. Save both results.
3. Back translate one result into English with another tool. Note any change in meaning.
4. Correct the translation yourself or with a fluent speaker. Record what you changed and why (wrong word, missing greeting, wrong tone).
5. Start a small glossary of five key words with approved translations.

**Done looks like:** your English message, the AI drafts, your corrected final version, a note of changes and your glossary. If no tool supports your language, write the translation yourself and note that the tools could not help, which is useful information too.`,
      quiz: {
        questions: [
          {
            prompt: "Why might AI translation into some northern Ghanaian languages be weaker?",
            options: [
              "These languages are not real languages",
              "There is less written text in them online for AI to learn from",
              "AI tools are banned from translating them",
              "Translation only works for European languages",
            ],
            answer_index: 1,
            explanation: "The lesson says languages with less written text online may come out weaker.",
          },
          {
            prompt: "Which step is not optional for a public health message?",
            options: [
              "Using fancy English first",
              "Using only one tool",
              "Checking with a fluent speaker",
              "Adding emojis",
            ],
            answer_index: 2,
            explanation: "The lesson says checking with a fluent speaker is essential for public, medical, legal or official messages.",
          },
          {
            prompt: "What is back translation used for?",
            options: [
              "Translating the result back into English to see if the meaning survived",
              "Deleting a translation",
              "Translating a message into two languages at once",
              "Replacing the need for a fluent speaker",
            ],
            answer_index: 0,
            explanation: "Back translation checks whether the meaning survived, but does not replace a fluent speaker.",
          },
          {
            prompt: "What did Abdul-Rahman do when the AI Mampruli translation came out mixed with other languages?",
            options: [
              "Sent it anyway",
              "Cancelled the vaccination day",
              "Sent the message only in French",
              "Asked a respected community health volunteer to translate and check it",
            ],
            answer_index: 3,
            explanation: "He turned to a fluent, trusted person when the AI result was not good enough.",
          },
        ],
        pass_threshold: 75,
      },
    },
    automation: {
      explanation_md: `## Why this matters

Much of office and small business work is repetition: answering the same customer questions, sending the same kind of reminder, copying details from one place to another, writing a similar post every week. Every minute saved on routine work is a minute for work that needs a person: solving problems, talking to customers, checking quality. Remote assistant roles and some junior operations roles now mention automation tools in their adverts, but you can start with tools already on your phone.

## Two kinds of time saving

This section has two topics.

* **Reusable prompts and templates.** When a prompt works well, save it with blanks you can fill in next time. A small library of tested prompts gives you fast, steady results and is something you can share with a team or even sell.
* **Automating small repetitive tasks.** Using features like quick replies, text shortcuts, email filters and form to sheet workflows, and later simple no code automation tools, to take routine steps off your hands.

## Ground rules for automation

* **Start small.** Pick one task you do often that is boring but low risk, such as answering "What time do you open?".
* **Keep a person in the loop.** Anything that goes to customers, handles money or affects people should be checked by you, at least at first.
* **Know how to stop it.** Before you switch on any automatic reply or workflow, know how to switch it off.
* **Mind privacy.** Automations often move information between apps. Make sure you are allowed to move it and that each app is trustworthy.
* **Free plans change.** Many automation tools have free plans with limits that change. Build things that still work if you have to do a step by hand.

## A small example

Amina sells fabrics in Tamale through WhatsApp. Every day, customers ask the same five questions: prices, location, opening hours, delivery and payment. She writes clear answers once, with help from an AI assistant to make them friendly and short, and saves them as quick replies in WhatsApp Business. Now a reply takes two taps instead of two minutes of typing. She also saves her best AI prompt for writing her weekly "new arrivals" post, with blanks for fabric names and prices. Her weekly posting time drops, and her messages are more consistent.

Nothing here required code, a laptop or money. It required noticing repetition and deciding to deal with it once.

## Spotting repetition

For one week, keep a note of tasks you do more than three times. Next to each, write how long it takes. The tasks at the top of your list are where templates and automation will help most. This habit alone makes you a more valuable assistant or employee, because you will be the person who finds ways to save time.`,
      practice_task_md: `**Goal:** find the repetition worth automating.

1. For three to seven days, list every task you or a small business you help does more than three times. Note roughly how many minutes each takes.
2. Pick the top three by total time.
3. For each, write: could a saved prompt help, could a quick reply or shortcut help, or could a form or simple workflow help? Note one risk and how a person will check it.
4. Save this list in your journal; you will build solutions in the next two lessons.

**Done looks like:** a short repetition log and a plan for your top three tasks.`,
      quiz: {
        questions: [
          {
            prompt: "What kind of task should you automate first?",
            options: [
              "A task you do often that is boring but low risk",
              "A task that moves large amounts of money",
              "A task you do once a year",
              "A task that needs careful human judgement every time",
            ],
            answer_index: 0,
            explanation: "The lesson says start small with frequent, low risk tasks.",
          },
          {
            prompt: "What does keeping a person in the loop mean?",
            options: [
              "Letting automations run with nobody checking",
              "Having a person check anything that goes to customers or affects people",
              "Hiring more staff for every task",
              "Turning off your phone",
            ],
            answer_index: 1,
            explanation: "The lesson says a person should check customer, money or people related outputs.",
          },
          {
            prompt: "What did Amina save as quick replies in WhatsApp Business?",
            options: [
              "Her MoMo PIN",
              "Her customers' phone numbers",
              "Clear answers to the five questions customers ask every day",
              "AI generated photos of fabrics",
            ],
            answer_index: 2,
            explanation: "She saved answers to common questions as quick replies.",
          },
          {
            prompt: "Why should you build automations that still work if a step is done by hand?",
            options: [
              "Because automation is illegal",
              "Because phones cannot run apps",
              "Because customers dislike quick replies",
              "Because free plans of automation tools can change",
            ],
            answer_index: 3,
            explanation: "The lesson warns that free plans and limits change.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "prompt-templates": {
      explanation_md: `## Why this matters

If you write a good prompt once and then throw it away, you will spend time rebuilding it next week. Professionals who use AI daily keep a small library of tested prompts, often called prompt templates. A template gives steady, predictable results, makes you faster, and can be shared with a team. A well tested set of templates for a specific job can even become a digital product, which you will explore later in this track.

## What a template looks like

A template is a strong prompt with **blanks** in square brackets that you fill in each time:

> Write a polite WhatsApp reminder to a customer named [first name] who has an unpaid balance of GHS [amount] for [item], due on [date]. Tone: warm and respectful, not threatening. Under 50 words. End with how to pay by MoMo and a thank you. Do not add any discount or penalty.

Each time, you replace only the blanks. The tone, length and rules stay the same, so results are consistent.

## How to build a good template

1. **Start from a real success.** Use a prompt that already gave you a great result after a few rounds of improvement.
2. **Turn specifics into blanks.** Names, amounts, dates, products and places become [blanks].
3. **Keep the rules.** Tone, length, format, and what to avoid stay fixed.
4. **Test it three times** with different details. If any result needs heavy editing, improve the template.
5. **Name and store it.** Give it a clear name such as "Payment reminder, friendly" and keep it where you can copy it quickly on your phone: a Google Doc, a notes app or a pinned message to yourself.

## Templates worth having

* Customer replies: delays, complaints, thank yous, payment reminders.
* Social posts: new stock, weekly tips, event announcements.
* Summaries: "Summarise these meeting notes into decisions, actions, owners and deadlines."
* Job hunting: cover message from your facts, interview practice questions for a specific role.
* Checking: "List every factual claim in this text so I can verify it."

## A small example

Mariama does social media for three small businesses in Bolgatanga. She builds one template for weekly posts:

> Write [number] short Facebook post options for [business type] in [town]. This week's focus: [focus]. Key facts: [facts]. Audience: [audience]. Friendly, simple English, under 60 words each, no prices unless listed in key facts, end with how to order or visit.

She fills it in for a pharmacy, a hair salon and a restaurant every Monday, edits the results, and checks every fact with the owners. Her template saves her hours each week, and her clients notice how consistent her posts are.

## Keep templates private where needed

If a template includes a client's details or style rules, treat it as the client's information. Do not share it publicly without permission.`,
      practice_task_md: `**Goal:** build a personal library of five tested prompt templates.

1. Choose five tasks you do often, using your repetition log from the previous lesson if you made one.
2. For each, write a template with [blanks] for the details and fixed rules for tone, length, format and what to avoid.
3. Test each template three times with different made up details in a free AI assistant. Improve any that need heavy editing.
4. Store all five in one Google Doc or note called "My prompt templates", each with a clear name and one example result.

**Done looks like:** a document with five named, tested templates and example results. This goes straight into your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What is a prompt template?",
            options: [
              "A strong prompt with blanks you fill in each time",
              "A paid feature of AI apps",
              "A picture made by AI",
              "A list of passwords",
            ],
            answer_index: 0,
            explanation: "The lesson defines a template as a strong prompt with blanks in square brackets.",
          },
          {
            prompt: "When building a template, what should stay fixed?",
            options: [
              "The customer's name",
              "The amount owed",
              "The tone, length, format and what to avoid",
              "The date",
            ],
            answer_index: 2,
            explanation: "Specifics become blanks; the rules stay the same for consistent results.",
          },
          {
            prompt: "How many times does the lesson suggest testing a new template?",
            options: ["Never", "Once", "Three times with different details", "Only after a client complains"],
            answer_index: 2,
            explanation: "The lesson recommends testing three times with different details.",
          },
          {
            prompt: "What should you do if a template includes a client's details or style rules?",
            options: [
              "Post it publicly to help others",
              "Sell it without asking",
              "Delete the client's account",
              "Treat it as the client's information and not share it without permission",
            ],
            answer_index: 3,
            explanation: "The lesson says such templates belong to the client's information.",
          },
          {
            prompt: "What was the main benefit Mariama got from her weekly post template?",
            options: [
              "It saved hours and made her posts consistent",
              "It meant she never had to check facts",
              "It let her stop talking to her clients",
              "It made her posts longer",
            ],
            answer_index: 0,
            explanation: "Her template saved time and kept posts consistent, while she still checked facts.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "automating-tasks": {
      explanation_md: `## Why this matters

Some remote assistant and junior operations adverts now ask for experience with automation tools, sometimes called no code tools because you connect apps by choosing options rather than writing code. You do not need those to start. Your phone already has features that automate routine steps, and learning to use them builds the same thinking: notice a repeated task, design a simple flow, and keep a person checking.

## Automations you can set up on a phone

* **Quick replies and away messages.** WhatsApp Business lets you save quick replies, a greeting message for new customers and an away message for when you are closed. Write them once (AI can help with wording) and reuse them.
* **Text shortcuts.** Most phone keyboards let you set a short code that expands into a longer phrase, such as typing "addr" to insert your shop's full address and directions.
* **Forms that fill a sheet.** Once you link a Google Form to a Google Sheet, every new response lands in the sheet automatically. Use it for orders, event sign ups or simple surveys instead of copying details from chats by hand.
* **Calendar reminders.** Recurring reminders for weekly posts, monthly invoices or stock checks.

## Automations that are easier on a computer

* **Email filters.** Gmail can automatically label, archive or forward emails that match rules, such as everything from a supplier. Filters are created in Gmail on a computer browser, then work on your phone too.
* **No code automation tools.** Services such as Zapier, Make or n8n connect apps: for example, "when a new form response arrives, add a row to a sheet and send me an email". They often have free plans with limits that change. They are easiest to set up on a computer, so use a school lab, library or community centre computer if you do not have one.

## Designing a safe automation

1. **Write the steps in plain words** first: "When X happens, do Y, then Z."
2. **Ask an AI assistant to check your plan:** "What could go wrong with this workflow? What should a person check?"
3. **Test with fake data** before real customers.
4. **Decide who checks** the results, and how often.
5. **Write down how to turn it off.**

Never automate anything that sends money, shares personal data or makes decisions about people without a person approving each step.

## A small example

Fuseini organises a coding club in Damongo. Sign ups used to arrive in scattered WhatsApp messages. He creates a Google Form with name, age group and phone number, and responses now flow into a Sheet automatically. He asks an AI assistant to help write a friendly confirmation message, which he saves as a quick reply and sends after checking each new row. Sign ups are tidy, nobody is missed, and he spends his time on teaching, not copying details.`,
      practice_task_md: `**Goal:** set up one working automation on your phone and document it.

1. Pick one repeated task from your repetition log, or use this one: collecting orders for a small food business.
2. Write the steps in plain words: "When X happens, do Y, then Z."
3. Ask a free AI assistant what could go wrong and what a person should check. Adjust your plan.
4. Build it with phone friendly tools: for example, a Google Form that fills a Sheet, plus a saved quick reply or text shortcut for the confirmation message.
5. Test it with three fake entries. Write a short note: what it does, who checks it, and how to turn it off.

**Done looks like:** a working form and sheet (or quick replies) plus a one paragraph description. Share it with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What does Google Forms do automatically that saves copying by hand?",
            options: [
              "Sends every response into a linked Google Sheet",
              "Replies to all WhatsApp messages",
              "Pays customers by MoMo",
              "Writes social media posts",
            ],
            answer_index: 0,
            explanation: "The lesson says a linked Form sends every new response into the Sheet automatically.",
          },
          {
            prompt: "Where are Gmail filters created, according to the lesson?",
            options: [
              "Only inside WhatsApp",
              "In Gmail on a computer browser, after which they work on your phone too",
              "By calling the bank",
              "They cannot be created at all",
            ],
            answer_index: 1,
            explanation: "The lesson says filters are set up in Gmail on a computer browser.",
          },
          {
            prompt: "What is the first step in designing a safe automation?",
            options: [
              "Switch it on for all customers immediately",
              "Pay for the most expensive tool",
              "Write the steps in plain words",
              "Share customer data with the tool",
            ],
            answer_index: 2,
            explanation: "Writing the steps in plain words comes first.",
          },
          {
            prompt: "Which of these should never be automated without a person approving each step?",
            options: [
              "A reminder to post every Monday",
              "A text shortcut for your address",
              "A greeting message for new customers",
              "Sending money to someone",
            ],
            answer_index: 3,
            explanation: "The lesson says never automate sending money without a person approving.",
          },
        ],
        pass_threshold: 75,
      },
    },
    earning: {
      explanation_md: `## Why this matters

Learning AI tools is good. Earning with them is better, and for many young people in northern Ghana, earning is the reason to learn. There are three main routes, and this section covers each honestly.

* **A job** where AI skills make you a stronger candidate: assistant, content, social media, customer support, admin and research roles.
* **Freelance and gig work**, locally or remotely: writing, editing, social media management, translation, and remote projects that pay people to transcribe, translate or check AI output in languages like Twi and Dagbani.
* **Your own digital products**: something you make once and sell many times, such as a template pack or a practical guide, built with AI help.

SydCrest's September 2026 event in Accra, "Monetizing Your Skills With AI: Building Digital Products", focused on that third route. This section brings the same ideas to your phone.

## The three topics in this section

* **Jobs and gigs that use AI skills.** What adverts ask for, where to look, how AI data work works, and how to avoid scams.
* **Building simple AI powered digital products.** Choosing a real problem, building a product with free tools, and adding your own knowledge so it is worth paying for.
* **Pricing and selling your product.** Testing demand, setting a fair price, taking payment safely with mobile money and delivering well.

## Honest expectations

We will not promise quick money. Nobody can honestly tell you how much you will earn, and anyone who guarantees big earnings from AI, especially if they ask you to pay first, is a warning sign. Earning usually starts small: one client, one sale, one short contract. Each one builds proof and confidence for the next.

What you can control is the quality of your work, how reliable you are, and how honest you are about what you do. Those three things matter more than any tool.

## A small example

Hawa, in Tamale, combines all three routes over time. She applies for a part time admin role and mentions in her interview how she uses AI to draft and summarise, with examples from her portfolio. While she waits to hear back, she offers to manage social media for two local businesses, using her prompt templates and checking every fact with the owners. She also builds a simple budget template for market traders, tests it with three traders she knows, and starts selling it through WhatsApp. None of these is guaranteed to work, but together they give her several chances to earn and a growing record of real work.

## Before you start

Make sure you have finished the earlier sections, especially privacy, fact checking and prompt templates. Clients pay for reliable, safe work, and those lessons are what make your AI skills trustworthy. The final section, on honesty with clients and building a portfolio, completes the picture.`,
      practice_task_md: `**Goal:** choose your earning route and first step.

1. Write a short note on each of the three routes (job, freelance or gig, digital product): what appeals to you, what skills you already have, and what is missing.
2. Choose one route to focus on for the next month.
3. Write one small, concrete first step you can take this week, such as "Apply for two admin roles that mention AI tools", "Offer social media help to one local business" or "Ask five traders what problem they would pay to solve".
4. Share your choice and first step with a mentor or study buddy.

**Done looks like:** a one page note with your chosen route and a dated first step.`,
      quiz: {
        questions: [
          {
            prompt: "Which three earning routes does this section cover?",
            options: [
              "A job, freelance or gig work, and your own digital products",
              "Lottery, betting and loans",
              "Only government jobs",
              "Only selling phones",
            ],
            answer_index: 0,
            explanation: "The lesson names jobs, freelance or gig work, and digital products.",
          },
          {
            prompt: "Someone promises guaranteed big earnings from AI if you pay them first. What does the lesson say?",
            options: [
              "Pay quickly before the offer ends",
              "It is a warning sign",
              "It is the normal way to start",
              "Borrow money to pay them",
            ],
            answer_index: 1,
            explanation: "The lesson calls guaranteed earnings with upfront payment a warning sign.",
          },
          {
            prompt: "According to the lesson, what matters more than any tool when earning?",
            options: [
              "Having the newest phone",
              "Paying for every AI subscription",
              "The quality of your work, your reliability and your honesty",
              "Posting as often as possible",
            ],
            answer_index: 2,
            explanation: "The lesson says quality, reliability and honesty matter more than tools.",
          },
          {
            prompt: "What was the focus of SydCrest's September 2026 event in Accra?",
            options: [
              "Learning to drive",
              "Farming techniques",
              "Football coaching",
              "Monetizing skills with AI by building digital products",
            ],
            answer_index: 3,
            explanation: "The event was \"Monetizing Your Skills With AI: Building Digital Products\".",
          },
        ],
        pass_threshold: 75,
      },
    },
    "ai-jobs-gigs": {
      explanation_md: `## Why this matters

Knowing where AI skills are actually wanted helps you aim your learning and your applications. When we read recent job adverts from Ghana and remote roles open to African applicants, AI skills appeared in a few clear patterns. We share the patterns, not promises.

## What the adverts asked for

* **Assistant and admin roles** asked for experience using AI chat assistants to research, draft and organise work, usually alongside office tools like Google Workspace and strong written English.
* **Content, communications and marketing roles** asked people to use AI tools to research and draft content **while keeping accuracy and their own voice**, plus editing and fact checking AI drafts.
* **Social media and creative roles** mentioned design apps, AI writing help, and sometimes AI image and video tools.
* **Junior automation roles** mentioned no code tools that connect apps, plus familiarity with AI assistants.
* **AI data work** for remote projects asked for native speakers of languages like Twi, Akan and Dagbani to transcribe audio, write or rate answers, and check other people's work. These asked for fluency, good English, attention to detail and the ability to follow detailed guidelines.

Notice what keeps coming up: accuracy, clear writing, following instructions and judgement. AI skills add to these; they never replace them.

## Where to look

* Ghanaian job sites and company career pages.
* Remote job boards that state they accept applicants from Africa or worldwide. Always check the location rules in each advert.
* Careers pages of companies that run language and AI data projects.
* Freelance platforms, where you create a profile and bid for work. Some platforms have published rules about using AI; read the current rules of any platform you join.
* Your own network: churches, mosques, associations and local businesses often need writing, social media or translation help.

## Avoiding scams

AI data work and remote jobs attract scammers. Protect yourself:

* **Never pay to apply, train or get "activated".** Real employers pay you, not the other way round.
* Check the company has a real website and that the job appears on its official careers page.
* Be wary of offers through random WhatsApp or Telegram messages, or that promise high pay for very little work.
* Share identity documents only through official, secure onboarding with a verified company, never in a chat.
* Never share MoMo PINs, bank logins or one time codes.

## A small example

Issahaku reads and writes Dagbani fluently. He finds a transcription project on a company's careers page that asks for native Dagbani speakers. He checks the company's website, applies through the official page, and completes a test that involves carefully following written guidelines. He also gets a WhatsApp message offering "AI jobs, pay GHS 200 registration". He ignores it and reports it. Careful checking kept him safe and pointed him to real work.`,
      practice_task_md: `**Goal:** research real demand and prepare to apply.

1. Find five current adverts (from Ghanaian job sites, company career pages or remote boards that accept African applicants) that mention AI tools. Do not copy the advert text.
2. For each, note in your own words: job title, location or remote, and which AI and other skills it asks for.
3. Circle the skills that appear most often. Mark which ones you already have proof of from this track and which you need to practise.
4. Check one advert for scam warning signs using the list in the lesson and write what you found.

**Done looks like:** a five row table, a short list of your skill gaps and a scam check note.`,
      quiz: {
        questions: [
          {
            prompt: "What did content and communications adverts commonly ask for, according to the lesson?",
            options: [
              "Using AI to research and draft while keeping accuracy and their own voice",
              "Letting AI publish without any checking",
              "Building AI models from scratch",
              "Avoiding all writing",
            ],
            answer_index: 0,
            explanation: "The lesson says these adverts asked for AI use while keeping accuracy and voice.",
          },
          {
            prompt: "What did AI data work adverts for languages like Twi and Dagbani ask for?",
            options: [
              "A university degree in computer science only",
              "Fluency, good English, attention to detail and following detailed guidelines",
              "A large registration payment",
              "Owning an expensive laptop with no other skills",
            ],
            answer_index: 1,
            explanation: "The lesson lists fluency, English, attention to detail and following guidelines.",
          },
          {
            prompt: "An offer says you must pay to be \"activated\" for an AI job. What should you do?",
            options: [
              "Pay, because all AI jobs charge fees",
              "Send your MoMo PIN instead",
              "Treat it as a scam, since real employers pay you",
              "Share your Ghana Card in the chat",
            ],
            answer_index: 2,
            explanation: "The lesson says never pay to apply, train or get activated.",
          },
          {
            prompt: "Which skills kept coming up across the adverts besides AI?",
            options: [
              "Dancing and singing",
              "Driving and cooking",
              "Football and athletics",
              "Accuracy, clear writing, following instructions and judgement",
            ],
            answer_index: 3,
            explanation: "The lesson highlights accuracy, writing, following instructions and judgement.",
          },
          {
            prompt: "How did Issahaku apply for the Dagbani transcription project?",
            options: [
              "Through the company's official careers page after checking its website",
              "By paying a registration fee on WhatsApp",
              "By sending his PIN to a recruiter",
              "By replying to a random Telegram message",
            ],
            answer_index: 0,
            explanation: "He checked the company and applied through the official page.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "digital-products": {
      explanation_md: `## Why this matters

A digital product is something you make once and can sell many times without making it again: a spreadsheet template, a short practical guide, a set of prompt templates, a planner, a set of lesson note templates. There is no stock to buy and nothing to transport. AI can help you plan, draft and polish one far faster than before. This was the theme of SydCrest's "Monetizing Your Skills With AI: Building Digital Products" event in Accra, and it is something you can start on a phone.

## Start with a real problem

The most common mistake is starting with "What can AI make?" instead of "What problem do people around me have?" Good digital products solve a specific problem for a specific group of people. For example:

* Market traders who struggle to track daily sales and debts: a simple, ready made record template in Google Sheets with instructions.
* JHS teachers who spend hours on lesson notes: a set of note templates and tested prompts for planning lessons.
* Job seekers in the north who are unsure how to write a CV: a short guide with examples and fill in the blank templates.
* Small business owners new to social media: thirty prompt templates for posts, with tips for checking and editing.

Talk to five people in your target group before you build. Ask what wastes their time and what they have tried. Their words will shape your product.

## How AI helps you build

* **Planning:** "Suggest an outline for a short guide on [topic] for [audience]."
* **Drafting:** writing first drafts of sections, examples and instructions.
* **Testing ideas:** "What questions would a [audience] have about this?"
* **Polishing:** simplifying language, fixing grammar, making instructions clearer.

## What makes it worth paying for

Anyone can ask an AI tool for a generic guide. People pay for what AI alone cannot give them:

* **Your local knowledge and experience:** real Ghanaian examples, local prices and practices, your tested methods.
* **Checked, correct information.** Every fact verified.
* **Testing with real users.** A template that three traders have actually used and improved is better than one nobody has tried.
* **Clear design and instructions** that work on a phone.

## Phone or laptop?

Templates, guides, prompt packs and planners can all be built on a phone with free apps such as Google Docs, Google Sheets and a free design app. Building a coded AI app or website that calls an AI service is a bigger project that needs a laptop and programming skills; if that interests you, look at the developer tracks, and use computers at school labs, libraries or community centres to practise.

## A small example

Wumpini notices that women in her savings group in Savelugu keep contributions in exercise books and argue about records. She asks three members what is hardest, then uses AI to help draft a simple Google Sheets template with clear instructions in plain English, plus a short guide. She tests it with the group for two meetings, fixes confusing parts and adds a Dagbani glossary of key terms checked by a fluent member. Now she has a tested product other savings groups might pay for.`,
      practice_task_md: `**Goal:** plan and build a first version of a simple digital product.

1. Choose a group of people you know and talk to at least three of them about a problem that wastes their time or money.
2. Write a one paragraph product idea: who it is for, the problem, and what the product is (template, guide, prompt pack or planner).
3. Use a free AI assistant to help outline and draft the product, then add your own local examples and check every fact.
4. Build a first version with free phone apps.
5. Ask at least one person from the group to try it and give feedback. Note what you will change.

**Done looks like:** your product idea paragraph, the first version and written feedback from one real user.`,
      quiz: {
        questions: [
          {
            prompt: "What is a digital product, as described in the lesson?",
            options: [
              "Something you make once and can sell many times without remaking it",
              "A phone you buy and resell",
              "A service you must deliver in person every time",
              "An AI tool you build from scratch",
            ],
            answer_index: 0,
            explanation: "The lesson defines it as made once and sold many times.",
          },
          {
            prompt: "What should you start with when planning a digital product?",
            options: [
              "Whatever the AI suggests first",
              "A real problem that a specific group of people has",
              "The highest price you can think of",
              "A copy of a popular product",
            ],
            answer_index: 1,
            explanation: "The lesson says start with a real problem for a specific group.",
          },
          {
            prompt: "Which of these makes a product worth paying for?",
            options: [
              "Generic text anyone could get from an AI in seconds",
              "Facts nobody has checked",
              "Local knowledge, checked information and testing with real users",
              "A long title",
            ],
            answer_index: 2,
            explanation: "The lesson lists local knowledge, verified facts, real testing and clear design.",
          },
          {
            prompt: "Which product idea is the hardest to build on a phone alone?",
            options: [
              "A Google Sheets record template",
              "A short practical guide",
              "A set of prompt templates",
              "A coded AI app that calls an AI service",
            ],
            answer_index: 3,
            explanation: "The lesson says a coded AI app needs a laptop and programming skills.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "selling-products": {
      explanation_md: `## Why this matters

A useful product nobody buys earns nothing. Selling is a skill of its own: finding the people who need your product, showing them its value, setting a fair price, getting paid safely and treating customers well so they recommend you. You can do all of it from a phone.

## Test demand before you spend time

Before polishing for weeks, check that people will actually pay:

* Describe the product on your WhatsApp status or in a relevant group (with permission from the group admin) and see who asks about it.
* Offer a free sample page or a short trial to a few people and ask for honest feedback.
* Ask directly: "Would you pay for this? How much would feel fair?"

If nobody is interested, change the product or the audience. That is learning, not failure.

## Setting a price

There is no single right price. Think about:

* **Value to the buyer.** How much time or money does it save them?
* **Similar products.** What do comparable templates or guides sell for, locally and online?
* **Your audience's budget.** A trader in Tamale and a company in Accra can pay different amounts. You can offer a basic version and a fuller version.

Avoid competing only by being the cheapest. Compete on being clear, tested, local and reliable.

## Getting paid and delivering

* **Mobile money** is the simplest option for local buyers. Use a number registered in your name and keep a record of every payment.
* **Payment links** from payment providers that operate in Ghana (for example Paystack or Hubtel, named only as examples) let buyers pay by MoMo or card through a link.
* **Delivery:** share a view only or copy link from Google Drive, or send the file by WhatsApp or email after payment. Keep the original safe.
* **Records:** keep a simple sheet of each sale, date, amount and buyer contact, with their permission. This helps you track progress and handle questions.

## Treat customers well

* Describe the product honestly. Do not promise results you cannot guarantee.
* Answer questions quickly and kindly. Quick replies help.
* Have a clear, fair policy if a file does not work or a buyer is unhappy.
* Ask satisfied buyers if you may share their real feedback. Never invent reviews or testimonials.
* Improve the product based on feedback and tell earlier buyers about updates.

## A small example

Abdul-Rahman made a CV guide with fill in templates for school leavers in Tamale. He posts a sample page on his WhatsApp status and gets questions from several people. He asks a few of them what price feels fair, and chooses a modest price that fits a student budget. Buyers pay by MoMo, and he sends a Google Drive link with a thank you message saved as a quick reply. When two buyers say one template is confusing, he fixes it and sends everyone the updated version. Real feedback from his buyers, shared with their permission, helps him reach the next customers.`,
      practice_task_md: `**Goal:** prepare to sell your product honestly and safely.

1. Write a short, honest product description (under 80 words): who it is for, what problem it solves and what is included. Use AI to help, then edit and check it.
2. Test demand: share a description or sample with at least five people in your target group and record their responses.
3. Choose a price using the three factors in the lesson, and write one sentence explaining your choice.
4. Set up your delivery process: payment method, how you will send the file and a saved thank you message.
5. Create a simple sales record sheet with columns for date, amount, payment reference and notes.

**Done looks like:** your description, demand test notes, price reasoning, delivery steps and an empty sales record sheet ready to use.`,
      quiz: {
        questions: [
          {
            prompt: "Why test demand before spending weeks polishing a product?",
            options: [
              "To check that people will actually pay for it",
              "Because testing is required by law",
              "To make the product longer",
              "Because AI cannot help with products",
            ],
            answer_index: 0,
            explanation: "The lesson says test demand to check people will pay before investing more time.",
          },
          {
            prompt: "Which factor does the lesson suggest when setting a price?",
            options: [
              "Always the lowest price possible",
              "The value of the product to the buyer",
              "Whatever a friend guesses",
              "The price of a new phone",
            ],
            answer_index: 1,
            explanation: "Value to the buyer is one of the three pricing factors in the lesson.",
          },
          {
            prompt: "What does the lesson say about reviews and testimonials?",
            options: [
              "Write some yourself to look popular",
              "Ask AI to invent them",
              "Share only real feedback, with the buyer's permission",
              "Copy reviews from other sellers",
            ],
            answer_index: 2,
            explanation: "The lesson says never invent reviews and share real feedback only with permission.",
          },
          {
            prompt: "Why keep a record sheet of every sale?",
            options: [
              "To share buyers' details publicly",
              "Because MoMo requires a spreadsheet",
              "To make the product look bigger",
              "To track progress and handle questions",
            ],
            answer_index: 3,
            explanation: "The lesson says records help you track progress and handle questions.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "working-professionally": {
      explanation_md: `## Why this matters

By now you can prompt well, check facts, protect privacy, handle everyday tasks, automate small jobs and think about earning. The last step is what turns those skills into trust. Employers and clients in Ghana often hire through recommendations: a pastor tells a shop owner, a manager tells a colleague, a happy customer tells a friend. Those recommendations depend on two things. First, that you are honest about how you work. Second, that people can see proof of what you can do.

Commentary from Ghanaian job sites says the same: AI skills are an advantage, but employers still value human judgement most. This section is about showing that judgement.

## The two topics in this section

* **Honesty and ethics with clients.** When and how to tell people you use AI, respecting a client's rules, never creating fake reviews or fake photos, avoiding copying, watching for bias and taking responsibility for every piece of work you hand in.
* **Your AI skills portfolio.** Bringing your best work from this track together into a short, shareable document that shows the task, your prompt, the AI draft, your edits and checks, and the final result.

These two belong together. Your ethics statement goes into your portfolio, and every portfolio piece is evidence that you check and own your work.

## What professional looks like

A professional who uses AI:

* Agrees with the client at the start how AI will and will not be used.
* Keeps personal and confidential information out of public tools.
* Checks every fact, figure, name and link before delivery.
* Edits so the work sounds human and fits the reader.
* Admits mistakes quickly and fixes them.
* Can explain their process calmly when asked.

None of these depends on a particular tool. Tools will change many times during your working life. These habits will not.

## A small example

Fuseini has been doing small writing and spreadsheet jobs for businesses in Tamale. A new client, a pharmacy owner, asks how he works. Fuseini sends a short message explaining that he uses AI to help draft and build formulas, that he never pastes customer details into AI tools, and that he checks everything. He attaches a link to his portfolio, which shows a fact check where he caught an invented figure, and a tested sales sheet. The owner hires him and later tells another business owner that Fuseini is "careful and honest". That reputation is worth more than any single job.

## Before you begin

Gather your AI learning journal, your prompt templates and any practice pieces you saved during the track. You will use them in both lessons. If you skipped a practice task earlier, this is a good time to go back and complete it, because each one can become a portfolio piece.`,
      practice_task_md: `**Goal:** collect your evidence before the final two lessons.

1. Open your AI learning journal and list every practice task you completed in this track.
2. For each, give it a score from one to three for how proud you are of it and whether it shows checking or editing clearly.
3. Pick your top six candidates for your portfolio.
4. Write three sentences describing how you want clients or employers to see you, for example "careful, honest and quick".

**Done looks like:** a ranked list of your practice pieces and three sentences about the professional you want to be.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what do recommendations from clients and employers depend on?",
            options: [
              "Honesty about how you work and proof of what you can do",
              "Having the most expensive AI subscription",
              "Posting every day on social media",
              "Never using AI at all",
            ],
            answer_index: 0,
            explanation: "The lesson names honesty about your methods and visible proof of your skills.",
          },
          {
            prompt: "What do Ghanaian job site commentaries say employers still value most?",
            options: ["The newest phones", "Human judgement", "Long CVs", "Fast typing only"],
            answer_index: 1,
            explanation: "The lesson says AI skills are an advantage but employers still value human judgement most.",
          },
          {
            prompt: "Which of these is a professional habit when using AI?",
            options: [
              "Pasting customer details into public tools to save time",
              "Hiding mistakes so the client does not notice",
              "Agreeing with the client at the start how AI will be used",
              "Delivering AI drafts without editing",
            ],
            answer_index: 2,
            explanation: "Agreeing on AI use at the start is listed as a professional habit.",
          },
          {
            prompt: "Why did the pharmacy owner hire Fuseini?",
            options: [
              "He offered to work for free",
              "He promised AI would do everything",
              "He used a famous tool",
              "He explained his careful process and shared a portfolio as proof",
            ],
            answer_index: 3,
            explanation: "Fuseini explained his honest process and showed evidence in his portfolio.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "client-ethics": {
      explanation_md: `## Why this matters

Your reputation is the most valuable thing you build as a worker or freelancer. In a city like Tamale or Wa, word travels fast, and online one bad review can follow you. Clients and employers increasingly ask how people use AI. Being honest, careful and fair with AI is what separates professionals from people who will not be hired twice.

## Be open about how you work

There is nothing shameful about using AI well, just as there is nothing shameful about using a spell checker or a calculator. The problem is **hiding it when it matters**.

* **Agree at the start.** When you take on work, say briefly how you use AI, for example: "I use AI tools to help draft and edit, and I check every fact and edit everything myself." Many clients appreciate this.
* **Respect the client's rules.** Some clients or employers do not want AI used on their work, or only approved tools. Follow their rules, and ask if you are unsure.
* **Answer honestly if asked.** Never claim work is entirely your own if AI wrote much of it and the client expected otherwise.
* **Platforms have rules too.** Freelance platforms and employers may have written AI policies. Read them.
* **School and training work.** Follow your school or programme's rules on AI. Handing in AI work as your own where it is not allowed is cheating, and it also robs you of the learning.

## Do not copy or mislead

* Do not use AI to copy another writer's or designer's work, or to imitate a living artist's style to pass off as original.
* Do not create fake reviews, fake testimonials, fake photos of products or fake "results".
* Do not use AI to impersonate real people or to make content that could deceive the public.

## Protect people and data

* Keep client and customer information out of public AI tools unless you have permission and an approved tool.
* Remember that AI can repeat unfair bias about women, ethnic groups, religions or regions. Read output with this in mind, and correct anything unfair before it goes out.

## You are responsible

If AI makes a mistake in your work, it is still your mistake to the client. Good professionals check, take responsibility, fix problems quickly and learn. Put people first: the client, their customers and anyone affected by the work.

## A small example

Mariama is hired to write website text for a guesthouse in Bolgatanga. At the start, she tells the owner she uses AI to help draft and that she checks every detail with him. The AI draft describes a swimming pool the guesthouse does not have. She removes it and checks every room price and service with the owner. Later, the owner asks if AI wrote the text. She explains honestly how she worked. He is pleased with her openness and accuracy, and he recommends her to a friend who runs a restaurant.`,
      practice_task_md: `**Goal:** write your personal AI ethics statement.

1. Write a short statement (100 to 150 words) you could share with clients or employers explaining how you use AI: what you use it for, what you never use it for, how you protect data and how you check work.
2. Write a one sentence script for telling a new client at the start of a job how you use AI.
3. Read this situation and write what you would do: a client asks you to write ten five star reviews for their shop from "customers".
4. Ask a mentor or study buddy to read your statement and suggest one improvement.

**Done looks like:** your ethics statement, your one sentence script and your answer to the reviews situation. Add the statement to your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, when is using AI a problem?",
            options: [
              "Whenever you use it at all",
              "When you hide it where it matters, such as when a client expects otherwise",
              "Only when using a phone",
              "Only on weekends",
            ],
            answer_index: 1,
            explanation: "The lesson says the problem is hiding AI use when it matters.",
          },
          {
            prompt: "What should you do if a client does not want AI used on their work?",
            options: [
              "Follow their rules",
              "Use AI anyway and say nothing",
              "Charge them double",
              "Refuse to talk to them",
            ],
            answer_index: 0,
            explanation: "The lesson says respect the client's rules.",
          },
          {
            prompt: "A client asks you to write fake five star reviews from \"customers\". What does the lesson say?",
            options: [
              "Write them, since AI makes it quick",
              "Write only three instead of ten",
              "Do not create fake reviews",
              "Post them from your own account",
            ],
            answer_index: 2,
            explanation: "The lesson says do not create fake reviews or testimonials.",
          },
          {
            prompt: "If AI makes a mistake in work you hand in, whose mistake is it?",
            options: ["The AI company's", "Nobody's", "The client's", "Yours"],
            answer_index: 3,
            explanation: "The lesson says it is still your mistake to the client.",
          },
          {
            prompt: "Why should you read AI output with bias in mind?",
            options: [
              "AI can repeat unfair views about groups, which you should correct",
              "AI is always perfectly fair",
              "Bias only affects images",
              "Bias makes text shorter",
            ],
            answer_index: 0,
            explanation: "The lesson warns that AI can repeat unfair bias, so you must correct it.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "ai-portfolio": {
      explanation_md: `## Why this matters

Many people now write "skilled in AI tools" on their CV. Few can show it. Employers and clients want **proof**: real examples of how you used AI to do good work, and how you checked it. A small, clear portfolio you can share from your phone puts you ahead of people who only make claims.

Some AI skills programmes in Ghana, free and paid, run in cohorts, often in Accra. If you hope to join one, the work you did in this track and this portfolio are good preparation and good evidence for your application.

## What to include

Choose four to six of your best pieces from this track. For each piece, show:

1. **The task:** what you were trying to do and for whom.
2. **Your prompt** (or template), with personal details removed.
3. **The AI draft**, or a short extract of it.
4. **Your edits and checks:** what you changed, what facts you verified and how.
5. **The final result.**

Good pieces to choose from:

* A fact check table showing errors you caught.
* Before and after writing pieces: a bio, a cover message, a customer message.
* A checked summary of a public document.
* A tested spreadsheet with AI assisted formulas and your notes.
* A checked translation with your glossary.
* Your prompt template library.
* A working automation with its description.
* Your digital product, with real user feedback shared with permission.
* Your AI ethics statement.

## How to present it on a phone

* Create one Google Doc or a simple Google Drive folder named "Your name: AI skills portfolio".
* Start with a short introduction: who you are, what kind of work you want, and two or three sentences on how you use AI responsibly.
* Keep each piece short with clear headings, so it reads well on a small screen.
* Set sharing to "anyone with the link can view" and check it opens on another phone.
* Never include anyone's personal information or a client's confidential work without permission. Use made up details or permitted examples.

## Talking about it

On your CV, describe skills honestly and specifically: "Use AI assistants to draft, summarise and build spreadsheet formulas, with fact checking and editing" says much more than "AI expert". In interviews, walk through one portfolio piece: the task, how you prompted, what the AI got wrong and how you fixed it. That story shows judgement, which is what employers really want.

## A small example

Sumaila builds his portfolio in a Google Doc: a fact check table, a checked NGO report summary, a sales sheet with tested formulas, his prompt templates and his ethics statement. He shares the link in his application for a remote assistant role. In the interview, he explains how he caught an invented link in an AI draft. The interviewer remembers him because he showed what he can do.

## Keep it growing

Update your portfolio as you do real work. Replace practice pieces with real ones (with permission) and keep your best five. Tools will change; your proof of careful, honest work stays valuable.`,
      practice_task_md: `**Goal:** build and share your AI skills portfolio.

1. Create a Google Doc or Drive folder called "[Your name]: AI skills portfolio".
2. Write a short introduction: who you are, the work you want and how you use AI responsibly (you can adapt your ethics statement).
3. Add four to six pieces from this track. For each, include the task, your prompt, the AI draft or extract, your edits and checks, and the final result.
4. Remove all personal and confidential details. Set sharing to view only for anyone with the link, and test the link on another phone.
5. Write one honest CV line describing your AI skills.
6. Share the link with a mentor and ask for feedback on which piece is strongest.

**Done looks like:** a shareable portfolio link with four to six documented pieces, an introduction and a CV line, reviewed by a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why does a portfolio matter more than writing \"skilled in AI tools\" on a CV?",
            options: [
              "It shows proof of real work and how you checked it",
              "Employers never read CVs",
              "Portfolios are required by law",
              "It makes the CV longer",
            ],
            answer_index: 0,
            explanation: "The lesson says employers want proof, not claims.",
          },
          {
            prompt: "Which of these should each portfolio piece show?",
            options: [
              "Only the final result with no explanation",
              "The task, your prompt, the AI draft, your edits and checks, and the final result",
              "Your passwords and phone number",
              "A client's confidential files without permission",
            ],
            answer_index: 1,
            explanation: "The lesson lists these five parts for each piece.",
          },
          {
            prompt: "Which CV line describes AI skills best, according to the lesson?",
            options: [
              "\"AI expert\"",
              "\"I know all AI tools\"",
              "\"Use AI assistants to draft, summarise and build spreadsheet formulas, with fact checking and editing\"",
              "\"AI does my work for me\"",
            ],
            answer_index: 2,
            explanation: "The lesson says specific, honest descriptions say much more.",
          },
          {
            prompt: "What does walking through one portfolio piece in an interview show an employer?",
            options: [
              "That you memorised the advert",
              "That you own an expensive phone",
              "That AI is always right",
              "Your judgement, including what the AI got wrong and how you fixed it",
            ],
            answer_index: 3,
            explanation: "The lesson says the story of catching and fixing mistakes shows judgement.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
