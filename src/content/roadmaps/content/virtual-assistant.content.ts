import type { TrackContent } from "./types";

/**
 * Original lesson content for the Virtual Assistant and Remote Work roadmap
 * (issue #96, process from issue #84).
 * Research and sources: src/content/research/virtual-assistant.md.
 */
const content: TrackContent = {
  roadmap: "virtual-assistant",
  nodes: {
    "getting-started": {
      explanation_md: `Busy people everywhere need help keeping their work organised. A shop owner in Tamale, a director at an NGO in Accra and a small business owner in London all have emails piling up, meetings to arrange, documents to prepare and customers waiting for replies. An assistant takes that load off them. When the assistant works from a distance, using a phone or laptop and the internet, we call them a virtual assistant, or VA.

## Why this is a real route to work

Look at Ghanaian job boards and you will see office assistant, front desk, administrative officer and executive assistant roles posted every week. Look at remote job boards and you will see virtual assistant roles where a company abroad hires someone in another country. Both kinds of job ask for the same core skills: clear communication, calendar and email management, documents and spreadsheets, research, and being reliable. That is what this roadmap teaches.

Many of these skills can be practised on a phone with free apps such as Gmail, Google Calendar, Google Docs and Google Sheets. Some remote clients do expect a laptop and steady internet, and we will be honest about that when it matters.

## What this section covers

* **What a virtual assistant does.** The common tasks, the different kinds of assistant, and how local office jobs and remote VA work connect.
* **How remote work works.** How teams that never meet in person stay organised, and the habits that make a remote worker trusted.
* **Working across time zones.** Ghana keeps the same clock all year, but many client countries do not. You will learn to convert times without mistakes.

## A small example

Mariama finished senior high school in Bolgatanga and helps her uncle run his building materials shop. Without calling it a job, she already answers customer calls, keeps a notebook of orders, sends reminders on WhatsApp and arranges deliveries. These are assistant tasks.

When she starts this roadmap, she learns to do the same things with professional tools: a shared calendar for deliveries, a spreadsheet for orders, polite written updates and a clear system for messages. Six months later she can show a portfolio of real samples and apply for admin roles locally or for remote assistant work.

Nobody starts as an expert. The aim of this section is to give you a clear picture of the work so that every later lesson makes sense. If you are organised, careful and willing to learn, you already have the most important qualities.`,
      practice_task_md: `**Goal:** List the assistant tasks you already do or have seen others do.

**Steps:**
1. Open a notes app or Google Docs on your phone.
2. Write down every organising or communication task you have done for your family, church, school, shop or club in the last month. Examples: collecting contributions, reminding people about a meeting, keeping a list of orders.
3. Next to each task, write which professional skill it matches: communication, calendar, documents, spreadsheets, research or customer support.
4. Circle the two skills you feel least confident about. These are the lessons to give extra time.

**Done looks like:** A list of at least six tasks, each matched to a skill, with two circled for extra practice.`,
      quiz: {
        questions: [
          {
            prompt: "What makes an assistant a virtual assistant?",
            options: [
              "They only work for companies outside Africa",
              "They work for the client from a distance using a phone or laptop and the internet",
              "They are a computer program instead of a person",
              "They only do social media work",
            ],
            answer_index: 1,
            explanation: "The lesson defines a virtual assistant as an assistant who works from a distance using a device and the internet.",
          },
          {
            prompt: "According to the lesson, what do local office jobs and remote VA jobs have in common?",
            options: [
              "They both require a university degree in administration",
              "They both pay in foreign currency",
              "They both ask for the same core skills such as communication, email, calendars and documents",
              "They both require working from an office in Accra",
            ],
            answer_index: 2,
            explanation: "The lesson explains that both kinds of job ask for the same core skills.",
          },
          {
            prompt: "Which of these is mentioned as something some remote clients expect?",
            options: ["A laptop and steady internet", "A car for deliveries", "A printed CV posted by mail", "Their own office building"],
            answer_index: 0,
            explanation: "The lesson notes honestly that some remote clients expect a laptop and steady internet.",
          },
          {
            prompt: "In the example, why were Mariama's tasks at her uncle's shop useful?",
            options: [
              "They earned her a certificate",
              "They were already assistant tasks she could build into professional skills",
              "They meant she did not need to learn any tools",
              "They taught her to write code",
            ],
            answer_index: 1,
            explanation: "Answering calls, keeping orders and arranging deliveries are assistant tasks she later did with professional tools.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-a-va-does": {
      explanation_md: `When a client hires an assistant, they are buying back their own time. Every hour you save them on email, scheduling or paperwork is an hour they can spend on the work only they can do. Understanding this helps you in interviews: clients want to hear how you will save them time, not just which apps you know.

## The common tasks

Across Ghanaian office adverts and remote assistant adverts, the same tasks appear again and again:

* **Email:** sorting the inbox, drafting replies, following up.
* **Calendar:** booking meetings, sending reminders, handling changes.
* **Documents:** letters, reports, meeting notes and forms.
* **Spreadsheets and data entry:** trackers for orders, contacts or invoices.
* **Research:** finding suppliers, venues, prices or contact details.
* **Customer messages:** answering enquiries by email, chat or phone.
* **Coordination:** arranging travel, events and deliveries.

## Different kinds of assistant

Some assistants do a bit of everything. Others focus on one area. An **executive assistant** supports one senior person closely and handles their diary, travel and confidential work. An **administrative assistant** keeps an office or team running. Some VAs specialise in **customer support**, **social media**, or **online shops**, where they process orders and answer buyers. You do not need to choose now. Start general, notice what you enjoy, and specialise later.

## Local and remote

In Ghana, admin roles are often office based, with front desk, filing and visitor duties as well as computer work. Remote VA roles are done entirely online and the client may be in another country. Many people start with local admin work or helping a local business, build experience and samples, then add remote clients. Both are valid. Remote work has extra demands: you must manage time zones, communicate in writing and arrange your own power and internet.

## What clients value most

Adverts list tools, but what clients value most is reliability, discretion with private information, clear English and following through without being chased. An assistant who says "Done, here is the link" before the deadline is worth more than one who knows ten apps.

## A small example

Issahaku runs a small tour company in Damongo that takes visitors to Mole National Park. He hires Amina part time. Each morning she checks his email, replies to booking enquiries using templates he approved, adds confirmed bookings to the calendar and updates a spreadsheet of guests and payments. On Fridays she sends him a short summary. Issahaku now spends his time with guests instead of on his phone.`,
      practice_task_md: `**Goal:** Describe the assistant role in your own words and match it to a real employer.

**Steps:**
1. Think of one real business or organisation near you, such as a school, clinic, NGO, shop or tour company.
2. In Google Docs or a notes app, list five tasks an assistant could take off the owner's hands.
3. For each task, write one sentence on how it would save the owner time.
4. Write two sentences you could use to introduce yourself to that owner, focusing on time saved rather than apps.

**Done looks like:** Five tasks with time saving reasons, plus a two sentence introduction you could actually say or send.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what is a client really buying when they hire an assistant?",
            options: ["New software", "Their own time back", "A bigger office", "A social media following"],
            answer_index: 1,
            explanation: "The lesson says clients are buying back their own time.",
          },
          {
            prompt: "Which kind of assistant supports one senior person closely with their diary, travel and confidential work?",
            options: ["A customer support assistant", "A social media assistant", "An executive assistant", "An online shop assistant"],
            answer_index: 2,
            explanation: "The lesson describes an executive assistant as supporting one senior person closely.",
          },
          {
            prompt: "What extra demands does remote work bring, according to the lesson?",
            options: [
              "Front desk and visitor duties",
              "Managing time zones, writing clearly and arranging your own power and internet",
              "Driving to the client's office every day",
              "Filing paper records in a cabinet",
            ],
            answer_index: 1,
            explanation: "The lesson lists time zones, written communication and arranging power and internet as extra demands of remote work.",
          },
          {
            prompt: "Which qualities does the lesson say clients value most?",
            options: [
              "Knowing as many apps as possible",
              "Reliability, discretion, clear English and follow through",
              "Having a large social media following",
              "Working the most hours each week",
            ],
            answer_index: 1,
            explanation: "The lesson names reliability, discretion, clear English and following through as the qualities that matter most.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "how-remote-work-works": {
      explanation_md: `In an office, your manager can see you working. In remote work, nobody can. Your client only knows what you show them: messages, finished tasks and updates. That is why remote workers who communicate well get trusted with more work, and those who go quiet lose clients even when they are working hard.

## Written first

Remote teams do most of their talking in writing: email, a chat app such as Slack, Microsoft Teams or WhatsApp, and comments inside shared documents. Much of it is **asynchronous**, which means people reply when they are available rather than instantly. A good asynchronous message is complete on its own. Instead of "Hi, are you there?", write the question, the options and what you will do if you do not hear back.

## Agreed hours and availability

Most remote roles state working hours, often in the client's time zone. Some want you online for set hours; others care only that tasks are finished on time. Agree this at the start, then be predictable. If you will be offline, say so in advance.

## Shared tools

Remote teams keep work in shared places so anyone can see it: a shared drive for files, a shared calendar, and a task list or board that shows what is done and what is next. When you finish something, update the shared place, not just your own notes.

## The habits that build trust

* **Acknowledge quickly.** A short "Got it, I will send this by 3pm GMT" tells the client the task is in hand.
* **Give updates without being asked.** A short end of day message saying what you finished, what is in progress and any problem.
* **Flag problems early.** If a deadline is at risk because of a power cut or a missing document, say so as soon as you know, with a new plan.
* **Close the loop.** When a task is done, say so and include the link or file.

## A small example

Sumaila works as a VA for a consultant in the UK. One evening the power goes off in his area of Tamale and his phone battery is low. Before it dies, he sends: "Power cut here. Your report is 80 percent done and saved in the shared folder. I expect to finish by 10am GMT tomorrow, before your meeting. I will message when it is uploaded." The consultant replies with a thumbs up. Sumaila's honesty and clear plan matter more to the client than the delay.`,
      practice_task_md: `**Goal:** Practise the written habits of remote work.

**Steps:**
1. Pick a real task you are doing this week, such as a school assignment, a church programme or helping at a shop.
2. Write three messages in a notes app, as if to a remote client:
   * an acknowledgement when the task is given,
   * an end of day update (done, in progress, any problem),
   * a completion message with what you delivered.
3. Make sure each message would make sense even if the reader saw nothing else.
4. Ask a friend to read them and tell you if anything is unclear.

**Done looks like:** Three short, complete messages that a busy person could act on without asking a follow up question.`,
      quiz: {
        questions: [
          {
            prompt: "What does asynchronous communication mean?",
            options: [
              "Everyone must reply within one minute",
              "People reply when they are available rather than instantly",
              "Communication only happens on video calls",
              "Messages are sent without any words",
            ],
            answer_index: 1,
            explanation: "The lesson defines asynchronous as people replying when they are available.",
          },
          {
            prompt: "Which message is the better asynchronous message?",
            options: [
              "Hi, are you there?",
              "Call me",
              "The question, the options and what you will do if you do not hear back",
              "A message with only an emoji",
            ],
            answer_index: 2,
            explanation: "The lesson says a good asynchronous message is complete on its own, with the question, options and your plan.",
          },
          {
            prompt: "What should you do when you finish a task on a remote team?",
            options: [
              "Keep it in your own notes only",
              "Wait until the client asks about it",
              "Update the shared place and tell the client, with the link or file",
              "Delete the file to save space",
            ],
            answer_index: 2,
            explanation: "The lesson says to update the shared place and close the loop with the link or file.",
          },
          {
            prompt: "In the example, what did Sumaila do when the power went off?",
            options: [
              "Stayed silent until the power returned",
              "Sent a message with the progress, where the work was saved and a new finish time",
              "Asked the client to do the report",
              "Cancelled the work",
            ],
            answer_index: 1,
            explanation: "He flagged the problem early with progress, location of the file and a clear plan.",
          },
          {
            prompt: "Why do remote workers who go quiet lose clients, according to the lesson?",
            options: [
              "Because clients only know what the worker shows them",
              "Because chat apps delete quiet users",
              "Because remote work is always paid per message",
              "Because quiet workers cannot use shared drives",
            ],
            answer_index: 0,
            explanation: "The lesson says the client only knows what you show them, so silence looks like no work.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "time-zones": {
      explanation_md: `Many remote clients are in Europe, North America or the Middle East. A meeting booked for "9am" means nothing until you know whose 9am. Getting this wrong means missed calls and an unhappy client, and it is one of the easiest mistakes to avoid.

## Ghana's clock

Ghana uses Greenwich Mean Time, written GMT, which is the same as UTC (Coordinated Universal Time). Ghana does **not** change its clocks during the year. That makes you a fixed point, which is useful.

## Clients whose clocks move

Many countries move their clocks forward one hour in their summer, called daylight saving time or summer time, and back again later. Some examples:

* **United Kingdom:** the same as Ghana in winter, one hour ahead of Ghana in summer (late March to late October).
* **Eastern United States (New York):** five hours behind Ghana in winter, four hours behind in summer. The US changes its clocks on different dates from the UK.
* **Countries such as the United Arab Emirates:** ahead of Ghana and do not change their clocks.

Because the gap can change twice a year, never memorise one number. Check the current difference whenever it matters.

## Habits that prevent mistakes

* **Always write the time zone.** "Tuesday 3pm GMT" or "Tuesday 10am New York time". Never just "3pm".
* **Let the calendar do the maths.** Google Calendar and Outlook can show a second time zone (in Google Calendar this is set on the web version) and will show invitations in your local time. Set your own time zone correctly on your phone.
* **Use a 24 hour clock when unsure.** 15:00 cannot be confused with 3am.
* **Check the day as well as the hour.** A Monday morning meeting in Sydney can be Sunday evening in Ghana.

## Planning your day

If your client is in New York, their working morning is your afternoon. Agree on an overlap of a few hours when you are both online, and do focused work outside it. Protect your rest too: being available at all hours is not sustainable, so agree reasonable hours at the start.

## A small example

Hawa supports a client in New York. In January the client asks for a call "at 10am my time". Hawa knows New York is five hours behind Ghana in winter, so she adds five hours: 3pm in Ghana. She replies, "Confirmed: Thursday 10am New York time, which is 3pm GMT," and accepts the calendar invitation. In April she checks again, because the gap is now four hours.`,
      practice_task_md: `**Goal:** Convert times correctly and practise writing time zones in messages.

**Steps:**
1. Open the Clock app on your phone and add world clocks for London, New York and Dubai.
2. Open calendar.google.com in your phone browser in desktop mode, or on a shared computer, and turn on a secondary time zone for one client city in Settings. This setting is on the web version, not the phone app.
3. Write down today's time difference between Ghana and each of the three cities.
4. Write three practice messages confirming a meeting, each stating both times, for example: "Confirmed: Wednesday 2pm Dubai time, which is 10am GMT." Dubai is always four hours ahead of Ghana, so this works all year; for London and New York, use today's difference.

**Done looks like:** Three correct time differences for today, and three confirmation messages that state both time zones and the day.`,
      quiz: {
        questions: [
          {
            prompt: "Which time zone does Ghana use?",
            options: ["GMT, the same as UTC", "One hour ahead of GMT", "Five hours behind GMT", "It changes every summer"],
            answer_index: 0,
            explanation: "The lesson says Ghana uses GMT, which is the same as UTC.",
          },
          {
            prompt: "Why should you never memorise just one time difference for a UK or US client?",
            options: [
              "Because Ghana changes its clocks every month",
              "Because those countries move their clocks for summer time, so the gap changes",
              "Because time zones are random",
              "Because calendars cannot show other time zones",
            ],
            answer_index: 1,
            explanation: "The lesson explains that clocks moving for summer time changes the gap during the year.",
          },
          {
            prompt: "Which way of writing a meeting time is clearest?",
            options: ["Tuesday at 3", "3pm", "Tuesday 3pm GMT", "Afternoon"],
            answer_index: 2,
            explanation: "The lesson says to always write the day, time and time zone.",
          },
          {
            prompt: "In January, a New York client wants a call at 10am their time. What time is that in Ghana?",
            options: ["5am", "10am", "2pm", "3pm"],
            answer_index: 3,
            explanation: "New York is five hours behind Ghana in winter, so 10am there is 3pm in Ghana.",
          },
          {
            prompt: "What does the lesson suggest about working hours with a client in another time zone?",
            options: [
              "Be available at all hours",
              "Agree an overlap when you are both online and reasonable hours at the start",
              "Only work at night",
              "Never agree any fixed hours",
            ],
            answer_index: 1,
            explanation: "The lesson advises agreeing an overlap and reasonable hours so the work is sustainable.",
          },
        ],
        pass_threshold: 80,
      },
    },
    communication: {
      explanation_md: `For an assistant, communication is the job. Clients rarely see you, so every email, chat message and call is how they judge your work. Ghanaian admin adverts and remote VA adverts both ask for good written and spoken English.

## Why it matters so much

A client who receives a clear, polite, complete message trusts you with the next task. A client who has to ask three follow up questions starts to wonder whether delegating to you saves time at all. Good communication is not about fancy vocabulary. It is about being clear, correct and considerate of the reader's time.

## English that works

You do not need to sound British or American. You need to be understood quickly. That means short sentences, common words, correct spelling and a polite tone. Many clients read your message on a phone between meetings, so put the important part first.

It also helps to know that some Ghanaian expressions confuse foreign clients. "I am coming" can mean "wait a moment" to us, but a client abroad may expect you to arrive. "Please, I want to find out" can sound unclear. In work messages, say exactly what you mean: "One moment, I am checking the file."

## What this section covers

* **Clear professional writing.** A simple structure for emails and messages, the right tone for different situations, and how to check your work before you send it.
* **Calls, chat and video meetings.** Chat etiquette, phone calls, joining video meetings on a phone with limited data, taking notes and sending a summary afterwards.

## A small example

Fuseini sends his first update to a new remote client: "hello boss, i have done some of the things u said but the other one is not working, will try again".

His mentor shows him a better version: "Hi Sarah, quick update on today's tasks. Done: the supplier list is in the shared folder. Not done: I could not log in to the booking site because the password was rejected. Could you resend it? I will finish the bookings within an hour of receiving it."

The second message uses the client's name, shows what is finished, explains the problem precisely, asks one clear question and gives a plan. It takes one more minute to write and saves the client a lot of guessing.

Your communication will improve fastest if you read good examples, write every day and ask someone to check your writing. The next two lessons give you a structure to practise with.`,
      practice_task_md: `**Goal:** Rewrite unclear messages into clear professional ones.

**Steps:**
1. Find three messages you sent recently in a WhatsApp group or by SMS about something practical, such as a meeting or a payment.
2. Rewrite each one as if a remote client were reading it: use their name, put the main point first, use full words, and end with a clear next step.
3. Check for any Ghanaian expressions a foreign reader might misunderstand and replace them with plain words.
4. Read both versions aloud and note which is quicker to understand.

**Done looks like:** Three before and after pairs saved in a note, with the improved versions ready to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say communication is the job for an assistant?",
            options: [
              "Because assistants only answer phones",
              "Because clients rarely see you, so they judge your work by how you communicate",
              "Because communication is the only skill in job adverts",
              "Because assistants must speak with a foreign accent",
            ],
            answer_index: 1,
            explanation: "The lesson says clients judge your work through your messages and calls because they rarely see you.",
          },
          {
            prompt: "What does good work English mean, according to the lesson?",
            options: [
              "Using long words to sound educated",
              "Copying a British or American accent",
              "Short sentences, common words, correct spelling and a polite tone",
              "Writing in capital letters so it stands out",
            ],
            answer_index: 2,
            explanation: "The lesson says you need to be understood quickly with short, correct, polite writing.",
          },
          {
            prompt: "Why might \"I am coming\" confuse a client abroad?",
            options: [
              "They may think you are about to arrive in person",
              "It is rude in every country",
              "It is too long",
              "It contains a spelling mistake",
            ],
            answer_index: 0,
            explanation: "The lesson notes that a foreign client may expect you to arrive, so it is better to say exactly what you mean.",
          },
          {
            prompt: "What made Fuseini's second message better?",
            options: [
              "It was shorter than the first",
              "It used the client's name, said what was done, explained the problem, asked one question and gave a plan",
              "It used more emojis",
              "It asked the client to call him",
            ],
            answer_index: 1,
            explanation: "The lesson lists these features as what made the improved message clear.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "professional-writing": {
      explanation_md: `Writing is how most assistant work gets done. You will draft emails for clients, reply to customers, send updates and sometimes write on someone's behalf. Clear writing saves everyone time and makes you look professional, which helps you keep clients and win new ones.

## A simple structure for any work message

Use four parts, in this order:

1. **Greeting with the name.** "Hi Amina," or "Dear Mr Alhassan," for a more formal reader.
2. **The main point first.** Say why you are writing in the first sentence.
3. **The details.** Only what the reader needs, in short paragraphs or a short list.
4. **The next step.** What you need from them, or what you will do, and by when.

Add a clear subject line to emails, such as "Invoice 014 for October" or "Please confirm: Thursday meeting at 2pm GMT." The reader should know what the email is about before opening it.

## Tone

Match the tone to the reader and situation. A message to a client's colleague you know well can be friendly. A first message to a new customer, a complaint reply or anything on the client's behalf should be polite and more formal. Avoid slang, text speak such as "u" and "pls", all capital letters and too many exclamation marks.

When something has gone wrong, stay calm and factual. Say what happened, what you have done and what happens next. Apologise once and sincerely, without blaming others.

## Check before you send

* Is the main point in the first two lines?
* Are names, dates, times, amounts and time zones correct?
* Did you attach the file you mention?
* Is the spelling right? Turn on the spell checker in your keyboard and in Google Docs.
* Would you be happy if the client forwarded this to their boss?

Free tools can help. Your phone keyboard and Google Docs underline spelling mistakes. If you use an AI writing tool to improve a draft, read every word yourself, keep private client details out of it unless the client allows it, and make sure the result still sounds like you.

## A small example

Wumpini needs to ask a client to approve a supplier quote. Her draft reads:

"Subject: Approval needed: printing quote for the workshop

Hi David,

Please could you approve the printing quote for the 12 November workshop? It is from a print shop in Tamale and covers 50 programmes and 2 banners. The file is attached.

If I have your approval by Friday, they will deliver on Monday.

Thanks,
Wumpini"

It is short, the request is in the first line and the deadline is clear.`,
      practice_task_md: `**Goal:** Write three professional emails using the four part structure.

**Steps:**
1. Open Gmail or a notes app on your phone.
2. Write these three emails, each with a clear subject line:
   * asking a client to confirm a meeting time, with the time zone,
   * telling a customer their order will be one day late, with an apology and new date,
   * sending a finished document to a client with a one line summary of what is inside.
3. Check each one against the list in the lesson: main point first, details correct, attachment mentioned, spelling checked.
4. Send them to yourself and read them on your phone screen as a client would.

**Done looks like:** Three emails under 120 words each that follow the structure and pass every check.`,
      quiz: {
        questions: [
          {
            prompt: "In the four part structure, what comes straight after the greeting?",
            options: ["Your life story", "The main point", "A list of attachments", "A joke to set the tone"],
            answer_index: 1,
            explanation: "The lesson says to put the main point first, right after the greeting.",
          },
          {
            prompt: "Which is the best email subject line?",
            options: ["Hello", "Urgent!!!", "Please confirm: Thursday meeting at 2pm GMT", "Message"],
            answer_index: 2,
            explanation: "The lesson says the reader should know what the email is about from the subject line.",
          },
          {
            prompt: "How should you write when something has gone wrong?",
            options: [
              "Blame whoever caused it",
              "Stay calm and factual: what happened, what you have done and what happens next",
              "Avoid mentioning the problem",
              "Write in capital letters to show it is serious",
            ],
            answer_index: 1,
            explanation: "The lesson advises a calm, factual message with one sincere apology.",
          },
          {
            prompt: "What does the lesson say about using an AI writing tool on a draft?",
            options: [
              "Send whatever it produces without reading it",
              "Paste in all client details freely",
              "Read every word yourself and keep private client details out unless the client allows it",
              "Never write your own drafts again",
            ],
            answer_index: 2,
            explanation: "The lesson says to check every word and protect private client details.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "calls-and-meetings": {
      explanation_md: `Not everything happens in writing. Clients will call you, add you to work chats and invite you to video meetings. Assistants are often asked to join meetings, take notes and follow up on actions. Doing this well, even on a phone, makes you far more useful.

## Work chat etiquette

Work chat on Slack, Microsoft Teams, Google Chat or WhatsApp is quicker than email but still professional.

* Keep each message complete. Do not send "Hi" and wait; write "Hi Abdul-Rahman, can you confirm the venue for Friday?"
* Reply in the right thread or group so the conversation stays together.
* Use a separate WhatsApp Business number or profile for work if you can, so work and family messages do not mix.
* Avoid voice notes unless the client likes them. Many busy people prefer text they can scan quickly.
* Respect quiet hours. If you must message late, say "No need to reply tonight."

## Phone calls

Answer with your name and, if you answer for a business, its name: "Good morning, Damongo Tours, this is Amina." Keep a notebook or notes app open. Repeat important details back, such as names, numbers and dates. End by saying what will happen next.

## Video meetings on a phone

Free apps such as Google Meet, Zoom and Microsoft Teams work on phones. To save data and avoid problems:

* Test the link and your sound before the meeting starts.
* Join a few minutes early from a quiet place.
* Turn your camera off when you are not speaking if data is low, and tell the host why.
* Mute yourself when not speaking.
* If the connection drops, rejoin and send a quick chat message so people know.

## Notes and follow up

Many clients value an assistant who turns a meeting into action. During the meeting, note three things: **decisions** made, **actions** with who will do them and by when, and **questions** still open. Within a few hours, send a short summary:

"Summary of today's planning call. Decisions: the workshop moves to 19 November. Actions: Mariama books the hall by Friday; David sends the guest list by Monday. Open question: catering budget, to be confirmed by David."

## A small example

Tahiru joins a weekly video call for an NGO client using his phone. His data is low, so he joins with the camera off and explains in the chat. He mutes himself, takes notes in Google Keep and sends the summary within an hour. The programme manager starts forwarding his summaries to the whole team.`,
      practice_task_md: `**Goal:** Practise taking meeting notes and sending a clear summary.

**Steps:**
1. Find a short meeting to observe: a church committee, a school club, a family planning call, or a free recorded meeting or panel video online if you have the data.
2. While it runs, note decisions, actions (who and by when) and open questions.
3. Write a summary under 100 words using those three headings.
4. Ask one person who attended whether your summary is accurate.

**Done looks like:** A summary with decisions, named actions with dates, and open questions, checked by someone who was there.`,
      quiz: {
        questions: [
          {
            prompt: "Which work chat message follows the lesson's advice?",
            options: [
              "Hi",
              "Hi Abdul-Rahman, can you confirm the venue for Friday?",
              "A two minute voice note with no text",
              "Are you there??",
            ],
            answer_index: 1,
            explanation: "The lesson says to keep each chat message complete instead of sending only a greeting.",
          },
          {
            prompt: "What should you do on a video call when your data is low?",
            options: [
              "Leave without telling anyone",
              "Turn your camera off when not speaking and tell the host why",
              "Keep your microphone on all the time",
              "Refuse to join",
            ],
            answer_index: 1,
            explanation: "The lesson suggests turning the camera off when not speaking and explaining why.",
          },
          {
            prompt: "Which three things should your meeting notes capture?",
            options: [
              "Who was late, who spoke most and who left early",
              "Decisions, actions with owner and date, and open questions",
              "The weather, the time and the venue",
              "Only the jokes that were made",
            ],
            answer_index: 1,
            explanation: "The lesson names decisions, actions and open questions.",
          },
          {
            prompt: "How should you answer a phone call for a client's business?",
            options: [
              "Hello, who is this?",
              "With a greeting, the business name and your name",
              "Stay silent until the caller speaks",
              "With your personal nickname",
            ],
            answer_index: 1,
            explanation: "The lesson's example is to give a greeting, the business name and your own name.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "inbox-and-calendar": {
      explanation_md: `If you read through assistant adverts in Ghana and abroad, two tasks appear again and again: managing email and managing calendars. Executive assistant adverts talk about diary management. Remote VA adverts talk about inbox management and scheduling. Learn these two well and you can already offer a valuable service.

## Why these two tasks

Busy people lose hours every week to their inbox and their diary. Important emails get buried under newsletters. Meetings clash. Someone forgets to send the documents before a meeting. An assistant who keeps the inbox under control and the calendar accurate saves the client time and embarrassment every day.

These tasks also need trust. You may see private emails and know where your client will be. Discretion, meaning keeping what you see to yourself, is part of the job, and executive assistant adverts ask for it.

## The tools

The two most common tool sets are Google Workspace (Gmail and Google Calendar) and Microsoft 365 (Outlook for both email and calendar). Both have free versions for personal use and free phone apps. The ideas are the same in each, so if you learn one well you can switch to the other quickly. This roadmap uses Gmail and Google Calendar in examples because they are free and work well on phones.

## What this section covers

* **Managing a client's inbox.** How to sort email into action, waiting and reference, using labels, filters and saved replies, and how to agree what you may answer for the client.
* **Managing calendars and bookings.** How to schedule meetings without clashes, send clear invitations, protect focus time and handle travel or event arrangements.

## Access done safely

Clients give assistants access in different ways. The safest is **delegation**, where the client shares their inbox or calendar with your own account, so you never need their password. In Gmail the client adds you as a delegate, and in Google Calendar they share their calendar with you. Gmail delegates cannot be added from the phone app, only from Gmail on a computer, so plan to do this part on a laptop or a shared computer. If a client sends you their password instead, suggest delegation or a password manager, and never share the password with anyone else.

## A small example

Zuweira starts working for a business coach in Canada. On day one, the coach shares her calendar and delegates her inbox to Zuweira's work Gmail account. Zuweira asks three questions: Which emails can I answer myself? Which meetings can I accept without checking? What hours should I keep free? Writing down those answers on the first day prevents most problems later.`,
      practice_task_md: `**Goal:** Prepare a professional account to practise inbox and calendar skills.

**Steps:**
1. Create a free Gmail account just for work and practice, using a professional name, for example firstname.lastname.va@gmail.com style (do not use a real person's details other than your own).
2. Install the Gmail and Google Calendar apps if they are not on your phone.
3. Set your time zone in Google Calendar and add a simple email signature with your name and "Virtual Assistant".
4. Write down the three questions Zuweira asked a new client, and add two more questions you would ask.

**Done looks like:** A working practice account with signature and time zone set, plus a list of five starting questions for a new client.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, which two tasks appear again and again in assistant adverts?",
            options: [
              "Video editing and coding",
              "Managing email and managing calendars",
              "Driving and deliveries",
              "Accounting and tax returns",
            ],
            answer_index: 1,
            explanation: "The lesson says managing email and managing calendars appear again and again in adverts.",
          },
          {
            prompt: "What does discretion mean in assistant work?",
            options: [
              "Working very fast",
              "Keeping what you see in the client's emails and diary to yourself",
              "Choosing your own working hours",
              "Using many different apps",
            ],
            answer_index: 1,
            explanation: "The lesson defines discretion as keeping what you see to yourself.",
          },
          {
            prompt: "What is the safest way for a client to give you access to their inbox?",
            options: [
              "Send their password on WhatsApp",
              "Write the password on paper",
              "Delegation, which shares the inbox with your own account so you never need their password",
              "Post the login in a shared group",
            ],
            answer_index: 2,
            explanation: "The lesson says delegation is the safest method because you do not need the client's password.",
          },
          {
            prompt: "Why does the lesson say you can switch between Google Workspace and Microsoft 365 quickly?",
            options: [
              "Because they are made by the same company",
              "Because the ideas are the same in each",
              "Because they share one password",
              "Because neither has a phone app",
            ],
            answer_index: 1,
            explanation: "The lesson explains that the ideas are the same, so skills transfer.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "email-management": {
      explanation_md: `Many clients hire an assistant because their inbox is out of control. Hundreds of unread emails, missed invoices and forgotten replies cost them money and reputation. If you can bring order to an inbox and keep it there, you are solving a real and painful problem.

## Agree the rules first

Before touching anything, agree with the client:

* Which emails you may answer yourself, such as booking requests or routine questions.
* Which emails you must flag for them, such as anything about money, contracts or complaints.
* Whether you write as yourself ("I am Amina, assistant to Mr Issahaku") or in the client's name. Writing as yourself is usually clearer and safer.
* How often you check: for example at the start, middle and end of your working day.

## Sort into three groups

Each time you check, move every new email into one of three groups:

1. **Action:** needs a reply or a task. Reply now if it takes under two minutes, otherwise add it to your task list.
2. **Waiting:** you have replied and are waiting for someone else.
3. **Reference:** no action, but worth keeping, such as receipts and confirmations.

Delete or archive what is left, such as promotions the client does not need. Archiving in Gmail removes the email from the inbox without deleting it, so it can still be found by searching.

## Tools that do the sorting for you

* **Labels** (folders in Outlook) group emails, for example "Action", "Waiting", "Invoices", "Clients".
* **Filters** (rules in Outlook) apply labels automatically. A filter can label every email from the accountant as "Finance".
* **Stars or flags** mark the few emails that matter most today.
* **Saved replies** (called templates in Gmail) store answers you send often, like a price list or directions.
* **Search** finds anything fast. In Gmail, typing "from:" followed by a name finds emails from that person.

## Daily summary

End each day with a short note to the client: emails you handled, emails that need their decision, and anything waiting. This keeps them in control without reading everything.

## A small example

Alhassan manages the inbox for a guest house owner in Wa. He creates labels for Bookings, Suppliers, Finance and Waiting. He sets a filter so emails from the booking website get the Bookings label, and saves a template with room prices and directions. Each evening he sends: "Handled: 6 booking enquiries. Need you: 1 supplier price increase. Waiting: 2 guests to send arrival times."`,
      practice_task_md: `**Goal:** Build a simple inbox system in your practice Gmail account.

**Steps:**
Labels work in the Gmail phone app, but filters and templates are set up in Gmail on the web. Open gmail.com in your phone browser and switch to the desktop version, or use a shared computer for steps 2 and 3.

1. In your practice Gmail account, create four labels: Action, Waiting, Reference and Finance.
2. Create one filter, for example so that any email containing the word "invoice" gets the Finance label.
3. Save one template reply for a common question, such as opening hours and prices for an imaginary shop.
4. Ask two friends to send you three emails each about an imaginary business. Sort all six into your labels and reply to at least two using your template.
5. Write a three line daily summary as you would send to a client.

**Done looks like:** Labels and a working filter, a saved template, six sorted emails and a daily summary you could show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What should you agree with a client before managing their inbox?",
            options: [
              "Which emails you may answer, which to flag, how you sign and how often you check",
              "Only the colour scheme of the inbox",
              "Nothing, just start deleting old emails",
              "How many emails you will delete each day",
            ],
            answer_index: 0,
            explanation: "The lesson lists these rules to agree before you start.",
          },
          {
            prompt: "Which three groups does the lesson suggest sorting emails into?",
            options: [
              "Red, yellow and green",
              "Action, waiting and reference",
              "Morning, afternoon and evening",
              "Friends, family and others",
            ],
            answer_index: 1,
            explanation: "The lesson uses action, waiting and reference.",
          },
          {
            prompt: "What does a filter do in Gmail?",
            options: [
              "Deletes all emails older than a week",
              "Applies labels or actions to emails automatically",
              "Translates emails into English",
              "Blocks the client from reading their own email",
            ],
            answer_index: 1,
            explanation: "The lesson explains that filters apply labels automatically, such as labelling emails from the accountant.",
          },
          {
            prompt: "What happens when you archive an email in Gmail?",
            options: [
              "It is deleted forever",
              "It is sent back to the sender",
              "It leaves the inbox but can still be found by searching",
              "It is printed",
            ],
            answer_index: 2,
            explanation: "The lesson says archiving removes the email from the inbox without deleting it.",
          },
          {
            prompt: "Why send the client a daily summary?",
            options: [
              "To show how many hours you worked",
              "To keep them in control without reading everything",
              "Because Gmail requires it",
              "To ask for more pay each day",
            ],
            answer_index: 1,
            explanation: "The lesson says the summary keeps the client in control without reading every email.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "calendar-management": {
      explanation_md: `An executive assistant advert in Accra and a remote VA advert from abroad will both mention the calendar or diary. A well kept calendar means the client is in the right place, at the right time, with the right documents. A badly kept one means double bookings, missed calls and apologies.

## The basics of a good calendar event

Every event you create should include:

* **A clear title:** "Call: Hawa (supplier) about shea prices", not just "Call".
* **The correct time and time zone.** Your calendar should be set to your own time zone; invitations show in each person's local time.
* **Where:** an address, or a video meeting link.
* **What to prepare:** a link to the agenda or document in the description.
* **Guests**, so everyone receives the invitation and can accept or decline.

## Scheduling without endless messages

Agreeing a time by email can take days. Two ways to speed it up:

* **Offer two or three options** with time zones: "Tuesday 10am or Wednesday 2pm London time. Which suits you?"
* **Use a booking page.** Google Calendar's appointment schedules, and other free booking tools, let people pick a free slot themselves.

## Protecting the client's time

Good calendar management is also about what is not booked. Agree with the client:

* **Focus blocks:** time with no meetings for deep work.
* **Buffers:** a short gap between meetings, and travel time if they move between places.
* **Hard limits:** no meetings before or after certain hours, or on prayer times or family days.

## Handling changes

When a meeting moves, update the event rather than creating a new one, so guests get the change automatically. Check that nothing else now clashes. Send a reminder the day before for important meetings, with the agenda attached.

## Travel and events

Assistants are often asked to arrange travel or small events. The same habits apply: put every booking in the calendar with the confirmation number, keep all documents in one shared folder, and send the client a one page plan with times, addresses and contacts. Always double check dates, names on tickets and time zones before paying for anything.

## A small example

Napari manages the calendar for a programme director at an NGO in Tamale. A donor asks for a call. Napari checks the calendar, sees the director has a field visit until 2pm, and offers: "Thursday 3pm GMT or Friday 10am GMT." The donor picks Friday. Napari sends the invitation with a Google Meet link and the project report attached, and adds a 15 minute preparation block before it.`,
      practice_task_md: `**Goal:** Manage a week of calendar events for an imaginary client.

**Steps:**
1. Create a new calendar called "Client practice". This is done in Google Calendar on the web (open calendar.google.com in your phone browser in desktop mode, or use a shared computer). If that is difficult, use your main calendar instead.
2. Add five events for next week for an imaginary client, each with a clear title, time, location or meeting link, and a description with what to prepare.
3. Add two focus blocks and one 15 minute buffer before an important meeting.
4. Move one event to a new time by editing it, and check nothing clashes.
5. Invite a friend to one event and ask them to confirm they received it with the correct time.

**Done looks like:** A tidy week with five complete events, focus blocks, a buffer, one rescheduled event and a confirmed invitation. Take a screenshot for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which is the best calendar event title?",
            options: ["Call", "Meeting", "Call: Hawa (supplier) about shea prices", "Important!!"],
            answer_index: 2,
            explanation: "The lesson says a clear title tells the client who and what at a glance.",
          },
          {
            prompt: "What is a quick way to agree a meeting time without many emails?",
            options: [
              "Ask \"When are you free?\" and wait",
              "Offer two or three options with time zones, or share a booking page",
              "Book any time and hope it works",
              "Call the person at night",
            ],
            answer_index: 1,
            explanation: "The lesson suggests offering options with time zones or using a booking page.",
          },
          {
            prompt: "What is a focus block?",
            options: [
              "A meeting with many guests",
              "Time in the calendar with no meetings for deep work",
              "A block on someone's phone number",
              "A type of video call",
            ],
            answer_index: 1,
            explanation: "The lesson defines focus blocks as time with no meetings for deep work.",
          },
          {
            prompt: "When a meeting moves, what should you do?",
            options: [
              "Create a second event and leave the old one",
              "Update the existing event so guests get the change automatically",
              "Delete the event and tell nobody",
              "Ask the client to fix it",
            ],
            answer_index: 1,
            explanation: "The lesson says to update the event rather than create a new one.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "documents-and-data": {
      explanation_md: `Ghanaian office adverts ask for Word, Excel, PowerPoint and Outlook again and again. Remote assistant adverts ask for Google Workspace or Microsoft 365, data entry and online research. Behind those tool names is one skill: producing accurate, tidy information that other people can find and use.

## Why it matters

Clients ask assistants to type letters, prepare reports, keep lists of customers or orders, compare prices and find information. If a document has errors, or a spreadsheet has missing data, or research is wrong, the client may make a bad decision or look careless in front of their own customers. Accuracy is what makes you trustworthy.

## Free tools you can use on a phone

You do not need to buy software to learn this. Google Docs, Google Sheets and Google Drive are free with a Google account and have phone apps. Microsoft also offers free web versions of Word and Excel with a Microsoft account. The skills carry over between them: headings, tables, sorting, filters and sharing work in similar ways.

Long documents and big spreadsheets are easier on a laptop. If you only have a phone, practise on small files, and use a school lab, library or community centre computer when you need a bigger screen for a longer task.

## Three habits that run through this section

* **Use structure.** Headings in documents, one row per item in spreadsheets, clear folder names in Drive. Structure makes information easy to find.
* **Check twice.** Names, numbers, dates and amounts are where errors hurt most.
* **Share carefully.** Give each person the access they need and no more.

## What this section covers

* **Documents, templates and shared files.** Formatting clean documents, using templates, exporting PDFs, organising folders and sharing safely.
* **Spreadsheets and data entry.** Building tidy tables, entering data accurately, sorting, filtering and a few simple formulas.
* **Online research.** Finding reliable information, checking it and presenting it as a short summary with sources.

## A small example

Dawuda volunteers as secretary for his youth association in Yendi. Before, the minutes were in a notebook, the member list was in WhatsApp messages and nobody could find last year's budget. Over one month he puts the minutes into a Google Docs template, the members into a Google Sheet with one row per person, and everything into a shared Drive folder called "Youth Association" with subfolders by year. When the chairman asks for last March's minutes, Dawuda sends the link in a minute. That organised folder later becomes a portfolio sample.`,
      practice_task_md: `**Goal:** Set up a tidy workspace for your document and spreadsheet practice.

**Steps:**
1. Open Google Drive on your phone.
2. Create a folder called "VA Portfolio" with three subfolders: Documents, Spreadsheets and Research.
3. Create one blank Google Doc and one blank Google Sheet inside the right subfolders, with clear names such as "2026 Practice Letter" and "2026 Order Tracker".
4. Turn on offline access for one of the files so you can open it without data.

**Done looks like:** A clearly named folder structure with two files, ready for the next three lessons, and one file available offline.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what single skill sits behind tool names like Word, Excel and Google Sheets?",
            options: [
              "Typing very fast",
              "Producing accurate, tidy information that others can find and use",
              "Designing logos",
              "Writing computer code",
            ],
            answer_index: 1,
            explanation: "The lesson says the skill behind the tool names is producing accurate, tidy, findable information.",
          },
          {
            prompt: "What does the lesson suggest if you only have a phone and need to work on a long document?",
            options: [
              "Give up on the task",
              "Practise on small files and use a school lab, library or community centre computer for longer tasks",
              "Buy expensive software first",
              "Ask the client to do it",
            ],
            answer_index: 1,
            explanation: "The lesson suggests small files on a phone and a shared computer for bigger tasks.",
          },
          {
            prompt: "Which is one of the three habits that run through this section?",
            options: ["Use bright colours", "Check twice", "Work only at night", "Avoid folders"],
            answer_index: 1,
            explanation: "The three habits are use structure, check twice and share carefully.",
          },
          {
            prompt: "In the example, what made it easy for Dawuda to find last March's minutes?",
            options: [
              "He remembered them by heart",
              "He kept them in a notebook",
              "He organised files in a shared Drive folder with subfolders by year",
              "He asked every member to search WhatsApp",
            ],
            answer_index: 2,
            explanation: "His organised Drive folder with yearly subfolders let him share the link quickly.",
          },
        ],
        pass_threshold: 75,
      },
    },
    documents: {
      explanation_md: `Letters, reports, meeting notes, proposals and forms are everyday assistant work. A clean, consistent document makes your client look professional to their own customers and partners. A messy one, with mixed fonts and random spacing, does the opposite.

## Formatting that looks professional

* **Use built in heading styles** (Heading 1, Heading 2) instead of making text bold and big by hand. Headings create an outline you can navigate and make the document easier to read on any screen.
* **Keep one or two fonts** and a consistent size for body text.
* **Use lists and tables** for steps, options and comparisons instead of long paragraphs.
* **Leave white space.** Short paragraphs are easier to read, especially on phones.
* **Add page numbers and a date** to anything longer than two pages.

## Templates save time

If you write the same kind of document often, such as invoices, meeting minutes or a weekly report, make a template once. Copy it each time and fill in the new details. Google Docs and Word include ready made templates, and you can save your own. Templates also keep your work consistent, which clients notice.

## PDFs

Send a PDF when the reader should not edit the document, such as a final letter, invoice or report. In Google Docs, use File, then Download, then PDF. Name the file clearly before sending.

## Naming and organising files

Good file names make files easy to find: "2026-11-04 Minutes Board Meeting" sorts by date automatically. Avoid names like "final final 2". Keep files in a shared folder structure agreed with the client, for example by year, then by project.

## Sharing safely

In Google Drive you can share a file as **Viewer** (can only read), **Commenter** (can suggest) or **Editor** (can change everything). Give the lowest access that does the job. Be careful with "Anyone with the link": anyone who gets the link can open the file, so do not use it for private documents such as contracts or staff details.

## Track changes and comments

When editing someone else's document, use **Suggesting** mode in Google Docs or **Track Changes** in Word, so the owner can accept or reject each change. Use comments to ask questions instead of guessing.

## A small example

Ayishetu prepares a monthly report for a women's farming cooperative near Walewale. She uses a template with headings for Membership, Sales, Problems and Next Month. She fills it in, adds a small table of sales by crop, downloads it as a PDF named "2026-10 Cooperative Report", and shares the editable version with the chairwoman as a Commenter only.`,
      practice_task_md: `**Goal:** Create a reusable document template and a finished PDF.

**Steps:**
1. In Google Docs, create a template for meeting minutes with headings: Date and attendees, Decisions, Actions (who and by when), Next meeting.
2. Use proper heading styles, one font, and a small table for the actions.
3. Make a copy and fill it in for a real or imaginary meeting.
4. Download the filled copy as a PDF with a clear, dated file name.
5. Share the template with a friend as Viewer and the filled copy as Commenter, and ask them to add one comment.

**Done looks like:** A tidy template, a filled copy, a PDF with a dated name and a comment from a friend. Save all three in your VA Portfolio folder.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you use built in heading styles instead of making text bold and big by hand?",
            options: [
              "They create an outline you can navigate and make the document easier to read",
              "They make the file smaller to download",
              "They are required by law",
              "They change the font colour automatically",
            ],
            answer_index: 0,
            explanation: "The lesson says heading styles create a navigable outline and improve readability.",
          },
          {
            prompt: "When should you send a document as a PDF?",
            options: [
              "When you want the reader to edit it",
              "When the reader should not edit it, such as a final letter or invoice",
              "Only when the document has photos",
              "Never, PDFs are outdated",
            ],
            answer_index: 1,
            explanation: "The lesson says PDFs suit final documents the reader should not edit.",
          },
          {
            prompt: "Which Google Drive access level lets someone read a file but not change or comment on it?",
            options: ["Editor", "Commenter", "Viewer", "Owner"],
            answer_index: 2,
            explanation: "The lesson explains that Viewer can only read.",
          },
          {
            prompt: "Why should you avoid \"Anyone with the link\" for private documents?",
            options: [
              "It makes the file load slowly",
              "Anyone who gets the link can open the file",
              "It deletes the file after a day",
              "It only works on laptops",
            ],
            answer_index: 1,
            explanation: "The lesson warns that anyone with the link can open the file.",
          },
          {
            prompt: "What should you use when editing someone else's document so they can accept or reject each change?",
            options: [
              "Delete and retype the whole document",
              "Suggesting mode in Google Docs or Track Changes in Word",
              "Send a voice note describing changes",
              "Change the file name",
            ],
            answer_index: 1,
            explanation: "The lesson recommends Suggesting mode or Track Changes.",
          },
        ],
        pass_threshold: 80,
      },
    },
    spreadsheets: {
      explanation_md: `Data entry and spreadsheet work appear in many assistant adverts, from remote roles that list Google Sheets to Ghanaian admin roles that ask for Excel. Clients use spreadsheets to track customers, orders, invoices, stock, guests and tasks. An assistant who keeps these accurate becomes hard to replace.

## Build a tidy table

Most problems with spreadsheets come from messy structure. Follow these rules:

* **One row per item:** one customer, one order or one payment per row.
* **One column per detail:** Date, Name, Phone, Item, Amount, Status.
* **A header row** at the top with clear column names. Freeze it so it stays visible when you scroll.
* **One kind of data per column.** Do not mix "GHS 50" and "fifty" in the Amount column. Put numbers only, and write the currency in the header: "Amount (GHS)".
* **Consistent formats** for dates and phone numbers.

## Accurate data entry

Speed matters less than accuracy. Check each entry against the source before moving on. Use **data validation** (a dropdown list) for columns such as Status, so entries are always "Paid", "Unpaid" or "Part paid" and never a misspelling. If something in the source is unclear, mark the cell and ask; do not guess.

## Sorting and filtering

* **Sort** puts rows in order, such as by date or amount. Always sort the whole table, not one column, or the rows get mixed up.
* **Filter** shows only the rows you want, such as unpaid orders, while hiding the rest without deleting them.

## A few simple formulas

Formulas start with an equals sign. These cover most assistant work:

* =SUM(E2:E50) adds the amounts in a column.
* =COUNTIF(F2:F50,"Unpaid") counts how many rows say Unpaid.
* =SUMIF(F2:F50,"Paid",E2:E50) adds only the paid amounts.

## A small example

Fatima tracks orders for a smock maker in Tamale who sells on WhatsApp. Her sheet has columns for Date, Customer, Phone, Item, Amount (GHS), Paid by MoMo (Yes or No) and Delivered. She uses a dropdown for the Yes or No columns, a filter to show orders not yet delivered, and COUNTIF to tell the owner each Friday how many orders are unpaid. The owner stops losing track of who owes money.

## Phone or laptop

The Google Sheets app works for entering data and simple formulas on a phone. For large sheets, a bigger screen helps, so use a laptop or a shared computer when you can.`,
      practice_task_md: `**Goal:** Build a working order tracker with validation, a filter and formulas.

**Steps:**
1. In Google Sheets, create a tracker with columns: Date, Customer, Item, Amount (GHS), Status.
2. Freeze the header row.
3. Add a dropdown on the Status column with the options Paid, Unpaid and Part paid.
4. Enter at least 12 imaginary orders, using made up Northern Ghanaian names and amounts.
5. Add formulas below the table: total of all amounts (SUM), number of unpaid orders (COUNTIF) and total paid (SUMIF).
6. Apply a filter to show only Unpaid orders, then clear it.

**Done looks like:** A tidy tracker of 12 or more rows with a dropdown, three correct formulas and a working filter. Save it in your VA Portfolio folder.`,
      quiz: {
        questions: [
          {
            prompt: "What is the rule for rows in a tidy spreadsheet table?",
            options: [
              "Put several items in one row to save space",
              "One row per item, such as one customer or one order",
              "Leave every second row empty",
              "Put all data in a single row",
            ],
            answer_index: 1,
            explanation: "The lesson says one row per item.",
          },
          {
            prompt: "How should you record amounts in the Amount column?",
            options: [
              "Mix words and numbers as you like",
              "Numbers only, with the currency written in the header",
              "Write the currency before every number in the same cell",
              "Use different formats for each row",
            ],
            answer_index: 1,
            explanation: "The lesson says to keep one kind of data per column and put the currency in the header.",
          },
          {
            prompt: "What does data validation (a dropdown list) help with?",
            options: [
              "Making the sheet colourful",
              "Keeping entries consistent and avoiding misspellings",
              "Sending the sheet by email",
              "Deleting old rows",
            ],
            answer_index: 1,
            explanation: "The lesson says dropdowns keep entries like Status consistent.",
          },
          {
            prompt: "Which formula counts how many rows in F2:F50 say Unpaid?",
            options: ["=SUM(F2:F50)", "=COUNTIF(F2:F50,\"Unpaid\")", "=SUMIF(F2:F50,\"Paid\",E2:E50)", "=SORT(F2:F50)"],
            answer_index: 1,
            explanation: "COUNTIF counts the cells that match a condition.",
          },
          {
            prompt: "What is the difference between sorting and filtering?",
            options: [
              "Sorting deletes rows, filtering adds rows",
              "Sorting puts rows in order, filtering shows only the rows you want without deleting the rest",
              "They do exactly the same thing",
              "Filtering only works on phones",
            ],
            answer_index: 1,
            explanation: "The lesson explains sort orders rows while filter hides rows you do not need.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "online-research": {
      explanation_md: `Clients ask assistants to find things out: the best venue for a workshop, three suppliers of printer paper with prices, contact details for schools in a district, flight options, or what a competitor charges. Research appears in remote VA adverts and in executive assistant duties. Done well, it saves the client hours and helps them decide.

## Start with the question

Before searching, make sure you understand what the client needs. Ask: What decision will this help with? How many options do you want? Any budget, location or date limits? When do you need it? A clear question saves wasted data and time.

## Search smarter

* **Use specific words.** "Conference hall Tamale capacity 100" works better than "hall".
* **Use quotation marks** to search for an exact phrase: "shea butter exporters".
* **Search within one site** by adding site: and the address, for example site:gov.gh to search Ghanaian government sites.
* **Exclude words** with a minus sign directly before the word, such as jobs -scam.
* **Check the date** of what you find. Prices and opening hours change.

## Check that information is reliable

Not everything online is true. Ask:

* **Who published it?** An official site, a known organisation, or an anonymous page?
* **Is it current?** Look for a date.
* **Can you confirm it?** Check important facts, such as prices or phone numbers, with a second source, or call to confirm.

Be especially careful with AI chat tools. They can be useful for ideas, but they sometimes give confident answers that are wrong, including fake phone numbers or prices. Always confirm facts from a real source before giving them to a client.

## Present it clearly

Clients do not want a pile of links. Give them a short summary they can act on:

* One line restating the question.
* A small comparison table: option, price, location, key point, source link.
* Your recommendation, with one reason, if they asked for one.
* Anything you could not confirm.

## A small example

Salifu's client, an NGO in Accra, needs a venue in Bolgatanga for 60 people. Salifu searches, finds five places, and calls three to confirm prices and availability. He sends a table with the three confirmed options, the price per day in cedis, capacity, whether they have a generator, and the phone numbers. He adds: "I recommend the second venue: it has backup power and is near the bus station. The fourth venue did not answer, so it is not included." The client books within the hour.`,
      practice_task_md: `**Goal:** Produce a short research summary a client could act on.

**Steps:**
1. Choose a realistic request, for example: find three places in your town where a small group can hold a two hour training, or three shops that sell a laptop charger for a common model.
2. Search using specific words and at least one of the tricks from the lesson (quotation marks, site:, or excluding a word).
3. Confirm at least one detail for each option by phone or from an official page.
4. In Google Docs or Sheets, make a comparison table with option, price, location, one key point and source.
5. Add a one sentence recommendation and note anything you could not confirm.

**Done looks like:** A one page summary with three options, a source for each, a recommendation and an honest note on gaps. Save it in your Research folder.`,
      quiz: {
        questions: [
          {
            prompt: "What should you do before starting to search for a client?",
            options: [
              "Search as many words as possible",
              "Understand the decision it supports, how many options, any limits and the deadline",
              "Ask an AI tool to decide for the client",
              "Send the client every link you can find",
            ],
            answer_index: 1,
            explanation: "The lesson says to start by understanding the question.",
          },
          {
            prompt: "What does adding site:gov.gh to a search do?",
            options: [
              "Searches only Ghanaian government sites",
              "Blocks government sites",
              "Translates the results",
              "Makes the search faster on slow data",
            ],
            answer_index: 0,
            explanation: "The lesson explains site: limits the search to one site or domain.",
          },
          {
            prompt: "Why should you be careful with AI chat tools for research?",
            options: [
              "They are always out of date by ten years",
              "They can give confident answers that are wrong, including fake phone numbers or prices",
              "They only answer in French",
              "They are illegal in Ghana",
            ],
            answer_index: 1,
            explanation: "The lesson warns that AI tools can be confidently wrong, so facts must be confirmed.",
          },
          {
            prompt: "What is the best way to present research to a client?",
            options: [
              "A long list of links",
              "A short summary with a comparison table, sources, a recommendation and what you could not confirm",
              "A voice note reading out every web page",
              "Only your opinion with no sources",
            ],
            answer_index: 1,
            explanation: "The lesson recommends a short, actionable summary with sources.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "client-tasks": {
      explanation_md: `Inbox, calendar and documents are the core of assistant work, but clients often hand over more. Remote adverts list customer support, social media management, order processing and project coordination alongside admin. Ghanaian adverts ask front desk and office assistants to handle customer enquiries and keep records. This section covers three of the most common extra tasks at a beginner level.

## Why learn these

Each extra task you can do well makes you more useful to a small business owner who cannot afford separate staff for everything. A shop owner in Tamale might want one person who answers WhatsApp enquiries, schedules a few Facebook posts each week and keeps a task list up to date. A remote client might want the same. Being able to say "yes, I can handle that" opens more doors.

At the same time, you do not have to be an expert in everything. Doing these tasks reliably at a basic level is enough to start. If you enjoy one of them, you can go deeper later. SydCrest's digital marketing track goes deeper on social media, for example.

## What this section covers

* **Customer support basics.** Answering customer questions by email, chat and phone, recording every case and knowing when to pass a problem to the client.
* **Social media scheduling.** Planning a simple content calendar, scheduling posts in advance with free tools and reporting back.
* **Task lists, tools and written procedures.** Keeping a shared task board so the client sees progress, and writing step by step procedures for repeated tasks.

## The common thread

All three tasks depend on the same habits you have already learned: clear writing, accurate records and keeping the client informed. Customer support is professional writing under time pressure. Social media scheduling is calendar management for posts. Task tools are a shared version of the to do list you already keep.

## Know your limits

Some tasks need permission or expertise. You should not promise refunds, change prices or post on a client's behalf without clear approval. If a client asks for work you cannot yet do, such as designing a logo or running paid adverts, say so honestly and suggest how it could be done. Honesty protects your reputation.

## A small example

Abdul-Rahman starts as a VA for a small online shop run by a Ghanaian woman living in the UK. At first he only manages her email. Within two months he also answers customer WhatsApp messages using approved replies, schedules three Instagram posts a week from photos she sends, and keeps a Trello board of orders to post. Each new task built on skills he already had.`,
      practice_task_md: `**Goal:** Map which extra tasks a real small business could hand to an assistant.

**Steps:**
1. Choose a small business you know that uses WhatsApp or social media, such as a provisions shop, tailor, caterer or salon.
2. List every customer message, social media and task tracking job the owner does in a normal week.
3. Mark each job as: "I can do this now", "I could do this after this section" or "needs a specialist".
4. Write a short note on one job you would offer to take over first, and what approval you would need from the owner.

**Done looks like:** A list of at least eight jobs sorted into the three groups, plus one clear offer with the approvals you would ask for.`,
      quiz: {
        questions: [
          {
            prompt: "Which three extra tasks does this section cover?",
            options: [
              "Coding, accounting and legal advice",
              "Customer support, social media scheduling and task tools with written procedures",
              "Driving, cooking and cleaning",
              "Logo design, video editing and paid adverts",
            ],
            answer_index: 1,
            explanation: "The section covers customer support, social media scheduling and task tools and procedures.",
          },
          {
            prompt: "Why are these extra tasks valuable to a small business owner?",
            options: [
              "They cannot afford separate staff for everything, so one person who can do several tasks helps",
              "They are required by Ghanaian law",
              "They replace the need for any customers",
              "They are only useful for large companies",
            ],
            answer_index: 0,
            explanation: "The lesson explains that small businesses often want one person who can handle several tasks.",
          },
          {
            prompt: "What should you do if a client asks for work you cannot yet do?",
            options: [
              "Say yes and hope to learn quickly",
              "Ignore the request",
              "Say so honestly and suggest how it could be done",
              "Copy work from someone else",
            ],
            answer_index: 2,
            explanation: "The lesson says honesty protects your reputation.",
          },
          {
            prompt: "Which of these should you not do without clear approval from the client?",
            options: [
              "Keep a task list",
              "Promise refunds or change prices",
              "Write clear notes",
              "Check the inbox",
            ],
            answer_index: 1,
            explanation: "The lesson says not to promise refunds, change prices or post without approval.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "customer-support": {
      explanation_md: `Customer support appears in remote VA adverts, in Ghanaian customer service adverts and in front desk roles. Many of these roles are advertised at entry level, which can make this a realistic first step. It also teaches skills every assistant needs: patience, clear writing and careful records.

## The channels

Support happens by **email**, **chat** (website chat, WhatsApp, Instagram messages), and **phone**. Larger companies use a help desk tool such as Zendesk or Freshdesk, which turns each customer request into a **ticket** that is tracked until it is solved. Small businesses often use WhatsApp Business, with labels and quick replies.

## A good reply in four steps

1. **Greet and acknowledge.** Use the customer's name and show you understand: "Hi Hawa, I am sorry your order has not arrived yet."
2. **Answer or act.** Give the answer, or say exactly what you are doing: "I have checked with the rider and it will arrive by 4pm today."
3. **Confirm the next step.** "I will message you if anything changes."
4. **Close politely.** "Thank you for your patience."

Keep replies short and clear. Use saved replies for common questions, but always adjust them to the customer's situation so they do not sound robotic.

## Handling an upset customer

Stay calm. Do not argue or take it personally. Listen, or read the whole message, then acknowledge the feeling: "I understand this is frustrating." Focus on what you can do. If the customer is rude, remain polite; if they become abusive, follow the client's rules on ending the conversation.

## Know when to pass it on

Agree with the client what you can solve yourself and what you must **escalate**, meaning pass to them or someone senior. Usually you escalate refunds above a limit, legal threats, safety issues and anything you are unsure about. When you escalate, give a short summary so the client does not have to read the whole conversation, and tell the customer when they will hear back.

## Keep a record

Every case should be recorded: who, what the problem was, what you did, and whether it is solved. A help desk does this for you. Otherwise, a simple Google Sheet with Date, Customer, Channel, Issue, Action and Status works. Records help you spot repeated problems, such as many customers asking the same question, which you can report to the client.

## Protect customer information

Only ask for the information you need. Never share one customer's details with another, and never ask for a customer's PIN or password. In Ghana, personal data is protected by the Data Protection Act, so treat it with care.

## A small example

Amina handles WhatsApp support for a solar lamp seller in Bolgatanga. A customer complains his lamp will not charge. Amina apologises, asks for a photo and the purchase date, checks the warranty rules the seller gave her, and arranges a swap at the shop. She logs the case in her sheet and, after the third similar complaint, tells the seller there may be a faulty batch.`,
      practice_task_md: `**Goal:** Practise replying to customers and keeping a case log.

**Steps:**
1. Write five realistic customer messages for an imaginary business, such as a late delivery, a wrong size, a price question, a complaint and a thank you.
2. Reply to each using the four steps: greet and acknowledge, answer or act, confirm the next step, close politely.
3. Decide which of the five you would escalate to the owner, and write the short summary you would send.
4. Record all five in a Google Sheet with Date, Customer, Channel, Issue, Action and Status.

**Done looks like:** Five complete replies, one escalation summary and a five row case log. Ask a friend to play the upset customer and see if your reply calms them.`,
      quiz: {
        questions: [
          {
            prompt: "In a help desk tool, what is a ticket?",
            options: [
              "A bus ticket for the customer",
              "A customer request that is tracked until it is solved",
              "A discount voucher",
              "A complaint about the assistant",
            ],
            answer_index: 1,
            explanation: "The lesson says a help desk turns each request into a ticket tracked until solved.",
          },
          {
            prompt: "What is the first step in a good support reply?",
            options: [
              "Ask for payment",
              "Greet the customer and acknowledge the problem",
              "Close the conversation",
              "Send the price list",
            ],
            answer_index: 1,
            explanation: "The four steps begin with greet and acknowledge.",
          },
          {
            prompt: "What does it mean to escalate a support case?",
            options: [
              "Reply in capital letters",
              "Pass it to the client or someone senior",
              "Delete the conversation",
              "Offer a free product",
            ],
            answer_index: 1,
            explanation: "The lesson defines escalating as passing the case to the client or someone senior.",
          },
          {
            prompt: "Why should you keep a record of every support case?",
            options: [
              "To spot repeated problems and report them to the client",
              "To share customer details with other customers",
              "Because customers ask to see the log",
              "So you can avoid replying",
            ],
            answer_index: 0,
            explanation: "The lesson says records help you spot repeated problems, like Amina's faulty batch.",
          },
          {
            prompt: "Which information should you never ask a customer for?",
            options: ["Their name", "Their order date", "Their PIN or password", "A photo of the faulty item"],
            answer_index: 2,
            explanation: "The lesson says never ask for a customer's PIN or password.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "social-media-scheduling": {
      explanation_md: `Many small businesses know they should post regularly but never find the time. Remote VA adverts often list social media management, and Ghanaian freelance assistants commonly offer content scheduling. Scheduling posts in advance is a practical, phone friendly service you can offer without being a marketing expert.

## What the VA usually does

In most assistant roles, the client or a designer provides the photos and key messages. The VA:

* Keeps a simple **content calendar**: what will be posted, where and when.
* Writes or tidies short captions using the client's approved style.
* **Schedules** posts in advance so they go out on time even when nobody is online.
* Checks comments and messages, replies to simple ones and passes the rest to the client.
* Sends a short weekly report.

Strategy, paid adverts and big campaigns are usually marketing work, which you can learn later in a marketing track.

## Build a content calendar

A Google Sheet is enough. Columns: Date, Time, Platform, Topic, Caption, Image link, Status (Draft, Approved, Scheduled, Posted). Plan two weeks ahead. Mix the kinds of posts: products or services, useful tips, customer questions answered, and behind the scenes.

Always get **approval** before scheduling. Mark each row Approved only after the client says yes.

## Scheduling tools

Meta Business Suite is free and lets you schedule posts for Facebook Pages and connected Instagram accounts, from a phone or computer. Other platforms have their own scheduling features, and there are other scheduling tools with free plans. If the client also uses WhatsApp Status, plan those updates in the same calendar and post them by hand at the right time.

Schedule at times when the business's customers are likely to be online. If the client's customers are in another country, use their time zone, not yours.

## Images and data

Large images use more data for you and for customers. Ask the client for images at a sensible size, and keep a shared folder with the approved images for each week.

## Report back

Each week send a short note: posts that went out, the post that got the most reactions or comments, questions customers asked, and anything that needs the client's reply.

## Be careful with access

Ask the client to add you to their business page with your own account and the right role, instead of sharing their personal password. Never post personal opinions on a client's page.

## A small example

Mariama schedules posts for a caterer in Tamale. Every Thursday she drafts next week's posts in a sheet, the caterer approves them on WhatsApp, and Mariama schedules them in Meta Business Suite for 7pm, when customers browse after work. On Monday she reports which dish got the most questions.`,
      practice_task_md: `**Goal:** Plan and prepare two weeks of posts for a real or imaginary local business.

**Steps:**
1. In Google Sheets, create a content calendar with columns: Date, Time, Platform, Topic, Caption, Image link, Status.
2. Plan six posts over two weeks for a local business, mixing products, tips, customer questions and behind the scenes.
3. Write a short caption for each, with the price in cedis and how to order where it fits.
4. If you manage a page you are allowed to use, such as a club or your own practice page, schedule two of the posts in Meta Business Suite. If not, mark them Approved and write the times you would schedule them.
5. Write a sample weekly report of four lines.

**Done looks like:** A two week calendar with six captioned posts, two scheduled or ready to schedule, and a sample report.`,
      quiz: {
        questions: [
          {
            prompt: "What does an assistant usually do in social media scheduling work?",
            options: [
              "Design the company's brand strategy and run paid adverts",
              "Keep a content calendar, tidy captions, schedule approved posts and report back",
              "Post personal opinions on the client's page",
              "Buy followers",
            ],
            answer_index: 1,
            explanation: "The lesson lists calendar, captions, scheduling, checking messages and reporting as typical VA tasks.",
          },
          {
            prompt: "When should a post be marked Approved in the content calendar?",
            options: [
              "As soon as you write it",
              "Only after the client says yes",
              "After it gets ten likes",
              "Never, approval is not needed",
            ],
            answer_index: 1,
            explanation: "The lesson says to get approval before scheduling.",
          },
          {
            prompt: "Which time zone should you use when scheduling posts for customers in another country?",
            options: ["Always Ghana time", "The customers' time zone", "Any time zone", "Midnight GMT"],
            answer_index: 1,
            explanation: "The lesson says to schedule in the customers' time zone.",
          },
          {
            prompt: "How should a client give you access to their business page?",
            options: [
              "Share their personal password",
              "Add you to the business page with your own account and the right role",
              "Post the password in a group chat",
              "Give you their phone",
            ],
            answer_index: 1,
            explanation: "The lesson says to be added with your own account rather than sharing a password.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "task-tools-and-sops": {
      explanation_md: `A remote client cannot look over your shoulder to see what you are working on. A shared task list shows them. And when you do the same task every week, a written procedure makes sure it is done the same way every time, even if you are sick or someone else takes over. Remote VA adverts mention task tools and keeping procedures up to date, and both are signs of a professional assistant.

## Shared task lists and boards

A task board shows work in columns, for example **To do**, **Doing**, **Waiting** and **Done**. Each task is a card with a title, a due date, the person responsible and any notes or files. Free options include Trello, Asana, Google Tasks, Microsoft To Do and Microsoft Planner. Even a shared Google Sheet with columns for Task, Owner, Due date and Status works.

Good habits:

* **One task, one card**, with a clear title that starts with a verb: "Send invoice to Sahel Farms".
* **Always add a due date.**
* **Move cards as you work**, so the board always shows the truth.
* **Use the Waiting column** for tasks blocked by someone else, with a note on who and since when.

## Written procedures (SOPs)

SOP stands for standard operating procedure. It is a short document that explains how to do a repeated task, step by step. Examples: how to process a new order, how to prepare the monthly report, how to onboard a new customer.

A good SOP has:

1. **A title and purpose:** what the task is and why it matters.
2. **When it happens:** for example every Monday at 10am GMT.
3. **What you need:** tools, logins (stored safely, never written in the SOP itself) and files.
4. **Numbered steps**, each a single action.
5. **What done looks like**, so anyone can check.

Write the SOP the second time you do a task, while it is fresh, and update it when something changes. Screenshots help, but keep them small to save data.

## Why clients love SOPs

SOPs make your work consistent, make it easy to train someone new, and protect the client if you are unavailable. Writing them also shows you understand the business, and clients value an assistant who builds systems as well as doing tasks.

## A small example

Issahaku's tour company gets bookings through email and WhatsApp. His assistant, Amina, creates a Trello board with columns for New enquiry, Quote sent, Paid, and Trip done. She writes a one page SOP called "Handling a new booking" with seven steps, from replying with the price template to adding the guest to the calendar. When Amina travels for a family funeral, her cousin follows the SOP for a week and nothing is missed.`,
      practice_task_md: `**Goal:** Set up a task board and write one SOP.

**Steps:**
1. Create a free task board in Trello, Google Tasks or a Google Sheet with columns To do, Doing, Waiting and Done.
2. Add at least eight real tasks from your week, each starting with a verb and with a due date.
3. Move them as you work for three days.
4. Choose one task you repeat, such as sending a weekly church announcement or updating a shop's price list, and write an SOP with title and purpose, when it happens, what you need, numbered steps and what done looks like.
5. Ask someone to follow your SOP without your help, and note where they got stuck.

**Done looks like:** A board you have used for three days and an SOP that someone else followed successfully, updated with their feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Why is a shared task board useful for a remote client?",
            options: [
              "It shows them what you are working on and what is done",
              "It replaces the need to do the work",
              "It automatically pays you",
              "It hides tasks from the client",
            ],
            answer_index: 0,
            explanation: "The lesson says a shared task list shows the client your progress since they cannot see you working.",
          },
          {
            prompt: "What does SOP stand for?",
            options: [
              "Social online post",
              "Standard operating procedure",
              "Simple office plan",
              "Secure online password",
            ],
            answer_index: 1,
            explanation: "The lesson defines SOP as standard operating procedure.",
          },
          {
            prompt: "Where should logins for a task be kept?",
            options: [
              "Written in the SOP for convenience",
              "Stored safely, never written in the SOP itself",
              "Posted on the task board",
              "Sent to everyone in the team chat",
            ],
            answer_index: 1,
            explanation: "The lesson says logins are stored safely and not written in the SOP.",
          },
          {
            prompt: "In the example, how did the SOP help when Amina travelled?",
            options: [
              "Her cousin followed it for a week and nothing was missed",
              "The business closed for a week",
              "The client did all the work",
              "Customers were told to wait",
            ],
            answer_index: 0,
            explanation: "The SOP let someone else do the task consistently while Amina was away.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "working-reliably": {
      explanation_md: `Remote clients hire assistants they can depend on. They want work delivered on time and their information kept safe. In Ghana, power cuts and patchy data are real challenges, and online accounts are a target for scammers. Clients who have worked with assistants in other countries know these risks exist. What they care about is whether you have a plan.

## What remote adverts ask for

Many remote assistant adverts ask for a reliable laptop and a stable internet connection, and some state a minimum internet speed. Some also expect you to keep their information confidential and follow security rules. These requirements are not there to exclude you. They exist because a VA who disappears for a day without warning, or whose account gets hacked, can cause the client real harm.

Be honest with yourself about your setup. If you only have a phone and prepaid data, you can still learn every skill in this roadmap and do many kinds of work, especially for local clients and for tasks like inbox, scheduling and customer messages. For roles that demand a laptop and fast internet all day, you may need to save towards equipment first, or work some hours from a place with a computer and steady power, such as a school lab, library or community centre.

## Two kinds of reliability

* **Being available when you said you would be.** This means planning for power and data problems before they happen.
* **Keeping accounts and information safe.** This means strong passwords, two step verification, careful sharing and spotting phishing.

## What this section covers

* **Staying reliable with patchy power and data.** Offline tools, backup power, a second network, saving data, and how to warn a client early when something goes wrong.
* **Keeping client accounts and data safe.** Passwords, two step verification, safe access, confidentiality and recognising phishing.

## Honesty is part of reliability

Never pretend your setup is better than it is. If a client asks about your internet or power, describe your real situation and your backup plan. Clients forgive a problem you warned them about. They rarely forgive one you hid.

## A small example

When Wumpini applies for a remote VA role, the client asks about power. She replies: "Power cuts happen in my area a few times a month. I keep a charged power bank and laptop, use two mobile networks, and keep files available offline. If a cut lasts long, I go to a nearby centre with a generator, and I will always message you within 30 minutes if a deadline is at risk." The client hires her because the answer is honest and shows a plan.`,
      practice_task_md: `**Goal:** Write an honest description of your work setup and backup plan.

**Steps:**
1. List your equipment: phone, laptop if any, chargers, power bank, SIM cards.
2. Note how often power and data problems happen where you live and work.
3. List at least two places nearby with a computer or steadier power that you could use if needed.
4. Write a five sentence paragraph you could send a client, describing your setup and what you do when power or data fails.

**Done looks like:** An honest equipment list, two backup places, and a clear paragraph you would be comfortable sending to a client.`,
      quiz: {
        questions: [
          {
            prompt: "Why do remote clients ask about laptops, internet and security?",
            options: [
              "To exclude people from Ghana",
              "Because an assistant who disappears or gets hacked can cause the client real harm",
              "Because it is required by every government",
              "To decide what colour laptop to buy you",
            ],
            answer_index: 1,
            explanation: "The lesson says these requirements exist because unreliability or hacked accounts harm the client.",
          },
          {
            prompt: "What does the lesson suggest if a role demands a laptop and fast internet all day and you only have a phone?",
            options: [
              "Pretend you have a laptop",
              "Save towards equipment or work some hours from a place with a computer and steady power",
              "Never apply for any remote work",
              "Borrow someone's account",
            ],
            answer_index: 1,
            explanation: "The lesson suggests saving for equipment or using a school lab, library or community centre.",
          },
          {
            prompt: "Which two kinds of reliability does the lesson describe?",
            options: [
              "Being cheap and being fast",
              "Being available when you said and keeping accounts and information safe",
              "Owning many phones and many laptops",
              "Working at night and on weekends",
            ],
            answer_index: 1,
            explanation: "The lesson names availability and keeping accounts and information safe.",
          },
          {
            prompt: "Why was Wumpini hired in the example?",
            options: [
              "She said power cuts never happen",
              "She gave an honest answer with a clear backup plan",
              "She offered to work for free",
              "She had the fastest internet in Ghana",
            ],
            answer_index: 1,
            explanation: "The client valued her honesty and her plan.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "power-and-data": {
      explanation_md: `Power cuts, weak signal and running out of data are everyday realities for many people working online in Ghana, especially outside the big cities. They do not have to stop you from being a dependable assistant. The difference between a VA who loses clients and one who keeps them is usually planning.

## Plan for power

* **Charge whenever power is on.** Make it a habit to charge your phone, laptop and power bank fully, not just when they are low.
* **Keep a power bank** big enough to charge your phone at least once. If you use a laptop, learn how long its battery lasts doing your normal work.
* **Lower your power use** when on battery: dim the screen, close apps you are not using, and turn off Bluetooth and location if you do not need them.
* **Know your backup places**, such as a library, school lab, community centre or a shop with a generator, and how long it takes to get there.

## Plan for data and signal

* **Have a second network.** A SIM from a different mobile network helps when one network is down or weak in your area.
* **Work offline when you can.** Google Docs, Sheets and Slides can be made available offline, and Gmail can save drafts. Edits sync when you reconnect.
* **Save data.** Turn off automatic video play and app updates on mobile data, download large files on Wi Fi, join video calls with the camera off when you are not speaking, and send compressed images.
* **Buy data bundles that fit your work**, and keep a small reserve so you are never stuck before an important deadline.

## Plan your work

* **Do important tasks early**, not right before the deadline. Then a power cut becomes a delay instead of a missed deadline.
* **Save to the cloud often**, so if your device dies your work is not lost.
* **Keep a short list of offline tasks**, such as drafting emails or editing a document, for times when you have no connection.

## Communicate early

If something goes wrong, tell the client quickly, before they notice. A good message says what happened, where the work stands, and when you expect to finish. A short text message or WhatsApp from your phone is fine. Agree in advance how you will contact each other if your main channel is down.

## A small example

Fuseini works mornings for a client in Germany. One day the power goes off at 8am. His phone is fully charged because he charged it overnight. He switches the client's report to offline mode, keeps writing, and messages: "Power cut here. I am working offline on your report and will upload it when power returns, or from the library by noon GMT at the latest." The report arrives at 11:30.`,
      practice_task_md: `**Goal:** Build and test your own reliability plan.

**Steps:**
1. Turn on offline access for one Google Doc and one Google Sheet on your phone.
2. Switch on airplane mode, edit both files, then switch it off and check that the changes synced.
3. Check your phone settings and turn off automatic video play and app updates on mobile data.
4. Write a one page reliability plan: how you charge, your backup power, your second network, your backup places, and the message you will send a client when something goes wrong.
5. Time how long your phone or laptop lasts on battery doing normal work, and add that to the plan.

**Done looks like:** Offline editing tested and working, data saving settings changed, and a written reliability plan with a ready to send message.`,
      quiz: {
        questions: [
          {
            prompt: "What charging habit does the lesson recommend?",
            options: [
              "Only charge when the battery is almost empty",
              "Charge your phone, laptop and power bank fully whenever power is on",
              "Never use a power bank",
              "Charge only at night",
            ],
            answer_index: 1,
            explanation: "The lesson says to charge fully whenever power is on.",
          },
          {
            prompt: "Why is a SIM from a second mobile network useful?",
            options: [
              "It doubles your phone's battery life",
              "It helps when one network is down or weak in your area",
              "It is required for using Gmail",
              "It makes video calls free",
            ],
            answer_index: 1,
            explanation: "The lesson says a second network helps when one is down or weak.",
          },
          {
            prompt: "What happens to Google Docs edits made offline?",
            options: [
              "They are lost",
              "They sync when you reconnect",
              "They are emailed to the client automatically",
              "They can only be read, not edited",
            ],
            answer_index: 1,
            explanation: "The lesson says offline edits sync when you reconnect.",
          },
          {
            prompt: "Why should you do important tasks early?",
            options: [
              "So a power cut becomes a delay instead of a missed deadline",
              "Because clients only read work in the morning",
              "Because data is free in the morning",
              "To finish work faster and charge more",
            ],
            answer_index: 0,
            explanation: "The lesson explains that working early gives you room to absorb problems.",
          },
          {
            prompt: "When should you tell a client about a power or data problem?",
            options: [
              "Only if they ask",
              "Quickly, before they notice, with where the work stands and when you expect to finish",
              "After the deadline has passed",
              "Never, it looks unprofessional",
            ],
            answer_index: 1,
            explanation: "The lesson says to communicate early with progress and a new time.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "account-security": {
      explanation_md: `As an assistant you may have access to a client's email, calendar, files, social media pages or customer lists. That makes you a target. Scammers know that if they can break into an assistant's account, they can reach the client. Keeping accounts safe is part of the job, and clients notice assistants who take it seriously.

## Strong passwords

* Use a **different password for every account**. If one is stolen, the others stay safe.
* Make passwords **long**: a phrase of several random words is easier to remember and harder to guess than a short word with symbols.
* Never use names, birthdays or phone numbers.
* Consider a **password manager**, an app that stores your passwords securely behind one strong main password. Some are free, and phones have built in ones.

## Two step verification

Two step verification, also called two factor authentication, means that logging in needs your password **and** a second thing, usually a code from an app or a text message, or a prompt on your phone. Even if someone steals your password, they cannot get in without the second step. Turn it on for your email first, because email is used to reset every other account. Keep your backup codes somewhere safe and offline.

## Safe access to client accounts

The safest way to work in a client's accounts is with **your own login** that the client has given access to, such as a delegated inbox, a shared calendar or a role on their business page. Then nobody shares passwords, and the client can remove your access at any time. If you must use a shared password, keep it in a password manager, never in a chat message, notes app or SOP document.

## Confidentiality

Treat everything you see as private: emails, customer details, prices, plans. Do not discuss client work with friends or post about it online without permission. Ghana's Data Protection Act protects people's personal information, and clients abroad may have their own laws. Do not paste private client information into AI tools or other online services unless the client agrees.

## Recognise phishing

Phishing is a fake message designed to trick you into giving away a password, a code or money. Warning signs:

* Urgency: "Your account will be closed in one hour."
* A link to a login page that looks right but has a strange web address.
* A request for a verification code. **Never share a code** sent to your phone with anyone, even someone claiming to be the client or a bank.
* A sudden request to pay a new bank account or send money, even if it seems to come from the client. Confirm through a different channel, such as a phone call.

## A small example

Hawa receives an email that looks like it is from her client: "Urgent, pay this supplier today, new account details attached." The address is slightly different. Hawa does not pay. She calls the client on WhatsApp, who confirms it is a scam. Hawa has just saved her client money.`,
      practice_task_md: `**Goal:** Secure your own accounts the way you would a client's.

**Steps:**
1. Turn on two step verification for your main email account, and save the backup codes somewhere safe and offline.
2. Change any password you use on more than one important account so that each is different and long.
3. Run the free Google Security Checkup (or the equivalent for your email provider) and fix anything it flags.
4. Write a short note listing three phishing warning signs from this lesson and what you would do if you saw each.

**Done looks like:** Two step verification on, unique long passwords for your key accounts, a completed security checkup and your phishing response note.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you use a different password for every account?",
            options: [
              "So you can forget them all",
              "So that if one is stolen, the others stay safe",
              "Because websites require ten passwords each",
              "To make logging in faster",
            ],
            answer_index: 1,
            explanation: "The lesson says unique passwords stop one theft from opening every account.",
          },
          {
            prompt: "What does two step verification add to logging in?",
            options: [
              "A second password that is the same as the first",
              "A second thing such as a code or prompt, so a stolen password alone is not enough",
              "A longer username",
              "A photo of your face on every email",
            ],
            answer_index: 1,
            explanation: "The lesson explains that a second step blocks someone who only has your password.",
          },
          {
            prompt: "What is the safest way to work in a client's accounts?",
            options: [
              "Use their password sent by chat",
              "Use your own login that the client has given access to",
              "Write their password in the SOP",
              "Share one password among all assistants",
            ],
            answer_index: 1,
            explanation: "The lesson says your own login with delegated access is safest and can be removed by the client.",
          },
          {
            prompt: "Someone claiming to be your client asks you to read out a code sent to your phone. What should you do?",
            options: [
              "Send the code quickly",
              "Never share the code, and check with the client through a different channel",
              "Post the code in the team chat",
              "Send half the code",
            ],
            answer_index: 1,
            explanation: "The lesson says never share a verification code with anyone.",
          },
          {
            prompt: "In the example, what did Hawa do with the urgent payment request?",
            options: [
              "Paid it immediately",
              "Ignored all emails from then on",
              "Did not pay and confirmed with the client by calling them",
              "Forwarded it to the supplier",
            ],
            answer_index: 2,
            explanation: "She confirmed through a different channel and found it was a scam.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "getting-work": {
      explanation_md: `Skills only change your life when someone pays you to use them. This final section is about turning what you have learned into income, safely. It covers how to show your skills, where to find work, how to avoid the many fake jobs that target young people looking for remote work, and how to receive payment.

## Two routes, both valid

* **Local work.** Ghanaian companies, NGOs, schools and small businesses hire office assistants, front desk staff, administrative officers and executive assistants, and many small businesses would pay for part time help with messages, records and social media. Many formal admin jobs on Ghanaian job boards are in Accra and Tema, but small businesses everywhere need help, and local work is easier to verify.
* **Remote work.** Companies and individuals abroad hire virtual assistants. These roles can pay in foreign currency, but competition is strong, many adverts only accept people in certain countries, and scams are common.

Many people start with local or part time work to build experience and samples, then add remote clients. There is no shame in starting small.

## Preparing for a programme

Some training programmes in Ghana and across Africa run virtual assistant or freelancing courses in cohorts, often online or in Accra. If you want to join one, this roadmap is a free way to prepare, so you arrive already confident with the basics. Check any programme carefully on its official website before paying or sharing documents.

## What this section covers

* **Your profile and work samples.** How to show what you can do before you have a client.
* **Finding clients and jobs.** Where to look, how to check whether an advert is open to you, and how to apply well.
* **Spotting job and payment scams.** The common tricks and where to report them in Ghana.
* **Agreements, invoices and getting paid from abroad.** Agreeing terms, invoicing, and understanding the costs of each way to receive money.

## A mindset for this stage

Expect rejections. Every application teaches you something. Keep a simple tracker of where you applied and what happened. Ask for feedback when you can. Keep practising while you search so your samples keep improving.

Above all, protect yourself. A real employer pays you; you do not pay them. If anything about an offer feels wrong, stop and check before you send money, documents or codes.

## A small example

Sumaila finishes this roadmap in Tamale. He offers two local shops a free one week trial managing their WhatsApp orders, and one becomes a paying part time client. With those results and his practice samples, he applies for remote roles that accept applicants from Ghana, checking each one against the scam warning signs. After several rejections he gets a small remote contract and grows from there.`,
      practice_task_md: `**Goal:** Start a job search tracker and decide your first route.

**Steps:**
1. In Google Sheets, create a tracker with columns: Date, Organisation, Role, Local or Remote, Where I found it, Open to Ghana (Yes, No, Unclear), Status, Notes.
2. Write down three local businesses or organisations you could approach for part time assistant work.
3. Find two real assistant adverts (local or remote) and add them to the tracker, filling in every column honestly.
4. Write two sentences on which route you will start with and why.

**Done looks like:** A tracker with at least five rows and a short, honest plan for your first route.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what is one advantage of starting with local work?",
            options: [
              "It always pays more than remote work",
              "It is easier to verify and helps build experience and samples",
              "It never involves customers",
              "It requires no skills",
            ],
            answer_index: 1,
            explanation: "The lesson says local work is easier to verify and builds experience.",
          },
          {
            prompt: "What challenge with remote adverts does the lesson mention?",
            options: [
              "They never pay",
              "Many only accept people in certain countries, and scams are common",
              "They are only for people over 50",
              "They require living in Accra",
            ],
            answer_index: 1,
            explanation: "The lesson notes country restrictions, strong competition and scams.",
          },
          {
            prompt: "How can this roadmap help if you want to join a cohort training programme?",
            options: [
              "It replaces the programme's entry rules",
              "It is a free way to prepare so you arrive confident with the basics",
              "It guarantees a place in any programme",
              "It pays the programme fees",
            ],
            answer_index: 1,
            explanation: "The lesson says the roadmap is a free way to prepare.",
          },
          {
            prompt: "What simple rule does the lesson give about money and employers?",
            options: [
              "Always pay a small fee to show you are serious",
              "A real employer pays you; you do not pay them",
              "Pay for training before any interview",
              "Send money to unlock higher pay",
            ],
            answer_index: 1,
            explanation: "The lesson states that a real employer pays you, not the other way round.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "portfolio-and-profile": {
      explanation_md: `Clients and employers want proof. A certificate says you studied; a work sample shows you can do the job. When you have no paid experience yet, a small, well organised set of samples and a clear profile can be the difference between being ignored and being interviewed.

## What makes a good VA portfolio

You do not need a website. A shared Google Drive folder or a single Google Doc with links works well and costs nothing. Include four to six samples that match the tasks in adverts:

* **Inbox system:** screenshots of your practice labels and filters, with a short explanation.
* **Calendar week:** a screenshot of a well organised practice calendar.
* **Document:** a template you made, such as meeting minutes, and a filled example as a PDF.
* **Spreadsheet:** your order tracker with formulas and a filter.
* **Research summary:** a one page comparison with sources and a recommendation.
* **Procedure:** an SOP someone else followed successfully.
* **Customer replies or a content calendar**, if you want customer support or social media work.

The practice tasks in this roadmap were designed to produce these samples.

## Keep it honest and private

Use imaginary businesses or get permission before showing real work. Remove real names, phone numbers, emails and amounts from anything you share. Never claim experience you do not have or invent reviews. If a sample was practice, say so: "Practice project: order tracker for an imaginary smock seller." Clients respect honesty, and it protects you.

## Your profile

Whether on a job board, a freelance platform, LinkedIn or a one page CV, your profile should answer three questions quickly:

1. **What do you do?** "Virtual assistant for small businesses: inbox, calendar, documents and customer messages."
2. **What can you prove?** Link to your portfolio and name your tools: Gmail, Google Calendar, Docs, Sheets, Trello.
3. **How do you work?** Your time zone (GMT), the hours you are available, how you handle power and data cuts, and how to contact you.

Use a clear, friendly photo of yourself if the platform expects one, a professional email address, and correct spelling everywhere. Ask a friend to check it.

## A short introduction

Prepare three or four sentences you can adapt for every application or message: who you are, what you do, one proof, and a clear next step. For example: "I am Napari, a virtual assistant based in Ghana (GMT). I help small businesses keep their inbox, calendar and orders organised. You can see sample work here: [link]. I would be glad to do a short paid test task."

## A small example

Alhassan has no paid clients yet, so he builds a folder with five samples from this roadmap, all for imaginary businesses and clearly labelled as practice. He writes a one page CV and a short profile. In his first interview, the employer opens his spreadsheet sample and asks him to explain the formulas. He explains confidently and is offered a trial.`,
      practice_task_md: `**Goal:** Assemble a shareable VA portfolio and profile.

**Steps:**
1. Collect four to six of your best practice tasks from this roadmap into your VA Portfolio folder in Google Drive.
2. Check every file and remove any real names, numbers or private details. Label each as a practice project.
3. Create a Google Doc called "Portfolio" with one short paragraph and a link for each sample. Share the folder and the document as Viewer only.
4. Write a profile answering: what you do, what you can prove, how you work (time zone, hours, backup plan).
5. Write your three to four sentence introduction and ask a mentor or friend to review everything.

**Done looks like:** A view only portfolio link with four or more labelled samples, a written profile and an introduction, reviewed by someone else.`,
      quiz: {
        questions: [
          {
            prompt: "Why do work samples matter when you have no paid experience?",
            options: [
              "They show you can actually do the job",
              "They replace the need to apply",
              "They are required by law",
              "They guarantee a job",
            ],
            answer_index: 0,
            explanation: "The lesson says a certificate shows you studied, but a sample shows you can do the job.",
          },
          {
            prompt: "What is the lesson's advice on using real client information in a portfolio?",
            options: [
              "Show everything to prove it is real",
              "Use imaginary businesses or get permission, and remove real names, numbers and amounts",
              "Only include real customer phone numbers",
              "Invent reviews to look more experienced",
            ],
            answer_index: 1,
            explanation: "The lesson says to protect privacy and be honest about practice work.",
          },
          {
            prompt: "Which three questions should your profile answer quickly?",
            options: [
              "Your age, religion and hometown",
              "What you do, what you can prove and how you work",
              "Your favourite apps, music and food",
              "How many followers you have",
            ],
            answer_index: 1,
            explanation: "The lesson lists what you do, what you can prove and how you work.",
          },
          {
            prompt: "Why should you label practice samples as practice projects?",
            options: [
              "Clients respect honesty, and it protects you",
              "Because practice work is worthless",
              "To hide that you made them",
              "Because platforms delete unlabelled files",
            ],
            answer_index: 0,
            explanation: "The lesson says honesty earns respect and protects you.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "finding-clients": {
      explanation_md: `Finding your first assistant work takes effort, but there are more places to look than most beginners realise. The key is to search in several places at once, check every advert carefully, and apply in a way that shows you read it.

## Where to look

* **People and businesses you know.** Small businesses, schools, churches, mosques, NGOs and clinics near you often need help with messages, records or social media. Offer a clear service, and consider a short paid trial.
* **Ghanaian job boards.** Sites such as Jobberman list admin, office assistant, front desk, executive assistant and customer service roles. Many are office based in Accra and Tema, with some elsewhere.
* **Remote job boards.** Some job boards list only remote roles, and a few let you filter by country. Read each advert's location rules.
* **Freelance platforms.** Marketplaces where clients post small jobs and freelancers apply. They take a fee from your earnings, competition is strong at the start, and reviews matter, so begin with small jobs you can do very well.
* **Your network.** Tell friends, former teachers and family abroad what you do. Many first clients come from personal recommendations.

## Check if the advert is really open to you

Remote does not always mean anywhere. Many remote assistant adverts only accept people living in specific countries, and some name countries such as South Africa or India but not Ghana. Before applying, check:

* **Location:** does it say worldwide, Africa, or list Ghana? If it lists other countries only, it is probably not open to you.
* **Hours:** some roles require you to work during a client's office hours, which may mean late evenings in Ghana.
* **Equipment:** laptop, internet speed and quiet space requirements.
* **Payment:** how and when you will be paid, and in what currency.
* **Who is hiring:** can you find the company's own website, and is the job also listed there?

## Apply well

Read the whole advert. Many adverts include a small instruction, such as a word to put in your subject line, to check whether applicants read carefully. Follow it. Then send a short, tailored message: mention the role, two tasks from the advert you can do, a link to a relevant sample, and your time zone and availability. A short, specific application beats a long generic one.

If the employer offers a paid test task, treat it like real work: meet the deadline and communicate clearly.

## Keep going

Track every application. Follow up once, politely, after about a week if you have heard nothing. Keep improving your samples. Rejection is normal at this stage and says nothing about your worth.

## A small example

Ayishetu checks a remote board and finds three VA adverts. One is only for South Africa residents, so she skips it. One requires working 2pm to 11pm GMT, which she can manage. One has no company website and asks her to chat on Telegram, so she treats it as a warning sign. She applies to the second with a tailored message and her calendar sample.`,
      practice_task_md: `**Goal:** Find, check and apply for real opportunities.

**Steps:**
1. Find five assistant adverts from at least two kinds of source: a Ghanaian job board, a remote job board, a freelance platform or a local business.
2. For each, record in your tracker: location rules, hours, equipment, payment method and whether you found the company's own website.
3. Mark each as open to you, not open, or suspicious, with a reason.
4. Write one tailored application for the best match, following any instructions in the advert, and send it if you are ready.
5. Write a short, polite message offering a paid trial to one local business.

**Done looks like:** Five checked adverts in your tracker, one tailored application, and one local offer written or sent.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say about freelance platforms?",
            options: [
              "They are free with no fees and little competition",
              "They take a fee, competition is strong at first and reviews matter, so start with small jobs",
              "They only accept people with degrees",
              "They pay before you do any work",
            ],
            answer_index: 1,
            explanation: "The lesson describes fees, competition and the importance of reviews on freelance platforms.",
          },
          {
            prompt: "A remote VA advert says it is only open to residents of South Africa. What should a Ghana based applicant do?",
            options: [
              "Apply anyway and hide your location",
              "Skip it, because it is probably not open to you",
              "Pay a fee to get an exception",
              "Change your address on your profile",
            ],
            answer_index: 1,
            explanation: "The lesson says to check location rules; if only other countries are listed, it is probably not open to you.",
          },
          {
            prompt: "Why do some adverts include a small instruction, such as a word to put in the subject line?",
            options: [
              "To check whether applicants read carefully",
              "To trick applicants into paying",
              "Because email requires it",
              "To test typing speed",
            ],
            answer_index: 0,
            explanation: "The lesson says these instructions check whether you read the advert.",
          },
          {
            prompt: "What makes a strong application, according to the lesson?",
            options: [
              "A long generic message sent to every advert",
              "A short, tailored message naming the role, two matching tasks, a sample link and your time zone",
              "Only a CV with no message",
              "A voice note explaining your life story",
            ],
            answer_index: 1,
            explanation: "The lesson says a short, specific application beats a long generic one.",
          },
          {
            prompt: "In the example, why did Ayishetu treat one advert as a warning sign?",
            options: [
              "It paid in cedis",
              "It had no company website and asked her to chat on Telegram",
              "It required a calendar sample",
              "It was for afternoon hours",
            ],
            answer_index: 1,
            explanation: "No company website and a move to Telegram were warning signs.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "avoiding-scams": {
      explanation_md: `Young people searching for remote work are a favourite target for scammers. Ghana's Cyber Security Authority (CSA) has repeatedly warned the public about fake job offers spreading by SMS, WhatsApp, Telegram and Facebook, including fake adverts that copy the websites of real organisations. Learning the patterns protects your money, your documents and your accounts.

## The most common tricks

* **Pay to get the job.** You are asked to pay for an application form, training, registration, a uniform, a laptop or a background check. The CSA's advice is clear: genuine employers do not charge any fees for applications, tests or training, and any payment request is a sign of fraud.
* **Task scams.** You are offered easy money for simple online tasks such as liking posts or rating products. Early tasks pay a little to build trust. Then you are asked to deposit money to unlock better tasks or withdraw your earnings, and once you pay, you are locked out.
* **Fake cheques and overpayment.** A "client" sends more money than agreed, or a cheque, and asks you to send the difference back or pay a supplier. The original payment later disappears, and you lose what you sent.
* **Money mule offers.** You are asked to receive money into your bank or mobile money account and forward it to someone else, for a commission. This can make you part of a crime, even if you did not know.
* **Account and identity theft.** You are asked for your Ghana Card number, photos of your ID, bank details, a verification code or your login, often "to set up payroll" before any real interview.

## Warning signs

* The pay is very high for very little work or no experience.
* You were contacted out of nowhere, or the whole process happens on WhatsApp or Telegram.
* No interview, or an interview only by text chat.
* The company has no website, or the email address does not match the company's real website.
* Pressure to decide or pay quickly.
* Poor spelling and grammar in official looking messages.

## How to check

Search the company name with words like "scam" or "reviews". Find the company's official website yourself, not from the link they sent, and check whether the job is listed there. Contact the company using the details on its official site. Never send money, ID documents or codes until you are sure, and even then, never pay to be hired.

## Report it

If you see or fall for a scam, report it. The CSA has a reporting page at csa.gov.gh/report with its current phone, SMS, WhatsApp and email contacts and an online form. Always take the contacts from that official page, not from a message someone forwards you. You can also report to the Cybercrime Unit of the Ghana Police Service. If you sent money by mobile money or bank, contact your provider immediately. Report scam adverts to the job board too.

## A small example

Mariama gets a WhatsApp message offering a remote VA job with high pay and no interview. They ask for a small "registration fee" to send her laptop. She remembers the rule: a real employer pays you. She checks, finds no website, blocks the number and reports it.`,
      practice_task_md: `**Goal:** Learn to spot and report job scams.

**Steps:**
1. Visit the Cyber Security Authority reporting page, csa.gov.gh/report, and save its reporting contacts in your phone.
2. Write down the five common tricks from this lesson in your own words.
3. Look at three remote job messages or adverts you have seen (in WhatsApp groups, social media or job boards). For each, list any warning signs.
4. Write a short message you could send to a friend explaining why they should never pay for a job.

**Done looks like:** CSA contacts saved, the five tricks written in your own words, three adverts checked for warning signs, and a message ready to share.`,
      quiz: {
        questions: [
          {
            prompt: "What does the CSA say about employers charging fees?",
            options: [
              "Small fees are normal for remote jobs",
              "Genuine employers do not charge fees for applications, tests or training",
              "Fees are fine if the company has a logo",
              "Fees are fine if paid by mobile money",
            ],
            answer_index: 1,
            explanation: "The lesson quotes the CSA: genuine employers do not charge any fees, so a payment request is a sign of fraud.",
          },
          {
            prompt: "How does a task scam usually work?",
            options: [
              "You are paid fairly for every task forever",
              "Early tasks pay a little, then you must deposit money to unlock more or withdraw, and you are locked out",
              "You are asked to write a CV",
              "You are sent a free laptop",
            ],
            answer_index: 1,
            explanation: "The lesson describes small early payments followed by deposit demands and lockout.",
          },
          {
            prompt: "A new client sends more money than agreed and asks you to send the difference to a supplier. What is this likely to be?",
            options: [
              "A generous bonus",
              "An overpayment scam",
              "A normal invoice",
              "A tax refund",
            ],
            answer_index: 1,
            explanation: "The lesson describes overpayment as a common scam where the original payment later disappears.",
          },
          {
            prompt: "Why is receiving and forwarding money for a commission dangerous?",
            options: [
              "It uses too much data",
              "It can make you part of a crime, even if you did not know",
              "It is only allowed on weekends",
              "Banks charge a small fee",
            ],
            answer_index: 1,
            explanation: "The lesson explains that money mule activity can make you part of a crime.",
          },
          {
            prompt: "Where can you report a job scam in Ghana, according to the lesson?",
            options: [
              "Only to the scammer",
              "The Cyber Security Authority, the Ghana Police Cybercrime Unit, your payment provider and the job board",
              "Nowhere, scams cannot be reported",
              "Only on social media",
            ],
            answer_index: 1,
            explanation: "The lesson lists the CSA, the police cybercrime unit, your provider and the job board.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "getting-paid": {
      explanation_md: `Getting paid properly is part of being professional. Clear agreements and invoices prevent arguments, and understanding how international payments work stops fees and scams from eating your income. This lesson describes the options in general terms. It does not recommend any provider, and rules and fees change, so always check the provider's own official pages.

## Agree in writing first

Before starting, agree these points by email or in a simple contract:

* **Scope:** the tasks included, and what counts as extra.
* **Rate:** per hour, per task or a monthly retainer, and in which currency.
* **Hours and availability**, including time zones.
* **Payment terms:** how often you invoice, how many days the client has to pay, and the payment method.
* **Confidentiality and how either side can end the arrangement.**

For a first client, a short trial or splitting a project into stages with payment after each stage reduces your risk.

## Invoices

An invoice is a document asking for payment. Include: your name and contact details, the client's name, an invoice number, the date, a list of work done with amounts, the total and currency, the due date and how to pay. Keep a copy of every invoice and record payments in a spreadsheet. A Google Docs template works well.

## Ways to receive money from abroad

There are four common routes. Each has different costs, speeds and requirements.

* **Freelance platform payouts.** If you work through a platform, it pays you and you withdraw using one of the methods it supports in Ghana, such as a bank account. Platforms take a service fee from your earnings, and withdrawals can cost extra.
* **International payment accounts.** Some services give you account details in foreign currencies so clients abroad can pay you as if locally. You then convert and withdraw to Ghana.
* **Bank transfer to a Ghanaian bank account.** Many Ghanaian banks offer foreign currency accounts, sometimes called domiciliary accounts. International bank transfers can involve fees from the sending bank, any intermediary banks and your own bank.
* **Remittance to mobile money.** Some money transfer services can send money from abroad to a mobile money wallet in Ghana.

## Where money is lost

Compare these for any route:

* **Sending fees** the client pays.
* **Receiving fees** taken when money arrives.
* **Conversion margin:** the difference between the rate you get and the rate shown on a neutral source. A "no fee" service may still give a poor rate.
* **Withdrawal fees** to move money to your bank or wallet.
* **Intermediary bank charges** on international transfers.

Read the fee page, do a small test payment first, and work out what actually reaches you.

## Stay safe and legal

Use accounts in your own name, verified with your own documents. Never let anyone else use your account to receive money. Never pay a fee to receive a payment. Banking and foreign exchange in Ghana are regulated by the Bank of Ghana, so use licensed, recognised providers. Income you earn may be taxable, so ask the Ghana Revenue Authority about your situation as your earnings grow.

## A small example

Issahaku agrees a monthly retainer with a client in Canada. They agree the scope, hours and a monthly invoice due within seven days. Before choosing a payment route, he compares two options with a small test payment and records exactly how many cedis arrived. He chooses the one where more money reached him.`,
      practice_task_md: `**Goal:** Prepare your agreement checklist, invoice template and payment comparison.

**Steps:**
1. In Google Docs, write a one page agreement checklist covering scope, rate, hours, payment terms, confidentiality and ending the arrangement.
2. Create an invoice template with all the parts from the lesson. Fill it in for an imaginary client with made up amounts and download it as a PDF.
3. In Google Sheets, make a comparison table for two possible payment routes with columns for sending fee, receiving fee, conversion margin, withdrawal fee and speed. Fill it in from each provider's official fee page, writing "not stated" where you cannot find a figure.
4. Write down the three safety rules from the lesson that you will never break.

**Done looks like:** An agreement checklist, an invoice PDF, a fee comparison table with sources, and your three safety rules.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these should be agreed in writing before starting work?",
            options: [
              "Only your favourite colour",
              "Scope, rate, hours, payment terms, confidentiality and how to end the arrangement",
              "Nothing, agreements slow things down",
              "Only the client's job title",
            ],
            answer_index: 1,
            explanation: "The lesson lists these points to agree first.",
          },
          {
            prompt: "What is a conversion margin?",
            options: [
              "The space at the edge of an invoice",
              "The difference between the rate you get and the rate on a neutral source",
              "A tax charged by the client",
              "The number of days to pay",
            ],
            answer_index: 1,
            explanation: "The lesson explains that the conversion margin is the gap between your rate and a neutral rate.",
          },
          {
            prompt: "Why might a \"no fee\" payment service still cost you money?",
            options: [
              "It may give you a poor exchange rate",
              "It charges for reading emails",
              "It only works on weekends",
              "It deletes small payments",
            ],
            answer_index: 0,
            explanation: "The lesson warns that a poor rate can cost money even without a fee.",
          },
          {
            prompt: "What does the lesson suggest before choosing a payment route?",
            options: [
              "Pick the one with the best advert",
              "Read the fee page, do a small test payment and work out what actually reaches you",
              "Ask a stranger online to choose",
              "Use a friend's account",
            ],
            answer_index: 1,
            explanation: "The lesson recommends checking fees and testing with a small payment.",
          },
          {
            prompt: "Which of these is a safety rule from the lesson?",
            options: [
              "Let others receive money through your account for a commission",
              "Pay a fee to release a payment",
              "Use accounts in your own name and never pay a fee to receive a payment",
              "Share your login with the client's accountant",
            ],
            answer_index: 2,
            explanation: "The lesson says to use your own accounts, never lend them, and never pay to receive money.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
