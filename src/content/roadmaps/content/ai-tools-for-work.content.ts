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
  },
};

export default content;
