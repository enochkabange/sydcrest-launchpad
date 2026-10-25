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

Adverts mention tools, but the qualities that come up most are reliability, discretion with private information, clear English and following through without being chased. An assistant who says "Done, here is the link" before the deadline is worth more than one who knows ten apps.

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
            prompt: "Which qualities does the lesson say come up most in what clients value?",
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
* **Let the calendar do the maths.** Google Calendar and Outlook can show a second time zone and will show invitations in your local time. Set your own time zone correctly on your phone.
* **Use a 24 hour clock when unsure.** 15:00 cannot be confused with 3am.
* **Check the day as well as the hour.** A Monday morning meeting in Sydney can be Sunday evening in Ghana.

## Planning your day

If your client is in New York, their working morning is your afternoon. Agree on an overlap of a few hours when you are both online, and do focused work outside it. Protect your rest too: being available at all hours is not sustainable, so agree reasonable hours at the start.

## A small example

Hawa supports a client in New York. In January the client asks for a call "at 10am my time". Hawa knows New York is five hours behind Ghana in winter, so she adds five hours: 3pm in Ghana. She replies, "Confirmed: Thursday 10am New York time, which is 3pm GMT," and accepts the calendar invitation. In April she checks again, because the gap is now four hours.`,
      practice_task_md: `**Goal:** Convert times correctly and practise writing time zones in messages.

**Steps:**
1. Open the Clock app on your phone and add world clocks for London, New York and Dubai.
2. In Google Calendar settings, look for the option to show a secondary time zone, and turn it on for one client city.
3. Write down today's time difference between Ghana and each of the three cities.
4. Write three practice messages confirming a meeting, each stating both times, for example: "Confirmed: Wednesday 9am London time, which is 8am GMT."

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
      explanation_md: `For an assistant, communication is the job. Clients rarely see you, so every email, chat message and call is how they judge your work. Ghanaian admin adverts and remote VA adverts both ask for excellent written and spoken English, and remote adverts often ask for it first.

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
      explanation_md: `Not everything happens in writing. Clients will call you, add you to work chats and invite you to video meetings. Some adverts ask assistants to join meetings, take notes and follow up on actions. Doing this well, even on a phone, makes you far more useful.

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
      explanation_md: `If you read through assistant adverts in Ghana and abroad, two tasks appear more than any others: managing email and managing calendars. Executive assistant adverts talk about diary management. Remote VA adverts talk about inbox management and scheduling. Learn these two well and you can already offer a valuable service.

## Why these two tasks

Busy people lose hours every week to their inbox and their diary. Important emails get buried under newsletters. Meetings clash. Someone forgets to send the documents before a meeting. An assistant who keeps the inbox under control and the calendar accurate saves the client time and embarrassment every day.

These tasks also need trust. You may see private emails and know where your client will be. Discretion, meaning keeping what you see to yourself, is part of the job, and adverts for executive assistants mention it often.

## The tools

The two most common tool sets are Google Workspace (Gmail and Google Calendar) and Microsoft 365 (Outlook for both email and calendar). Both have free versions for personal use and free phone apps. The ideas are the same in each, so if you learn one well you can switch to the other quickly. This roadmap uses Gmail and Google Calendar in examples because they are free and work well on phones.

## What this section covers

* **Managing a client's inbox.** How to sort email into action, waiting and reference, using labels, filters and saved replies, and how to agree what you may answer for the client.
* **Managing calendars and bookings.** How to schedule meetings without clashes, send clear invitations, protect focus time and handle travel or event arrangements.

## Access done safely

Clients give assistants access in different ways. The safest is **delegation**, where the client shares their inbox or calendar with your own account, so you never need their password. Gmail and Google Calendar both support this. If a client sends you their password instead, suggest delegation or a password manager, and never share the password with anyone else.

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
            prompt: "According to the lesson, which two tasks appear most often in assistant adverts?",
            options: [
              "Video editing and coding",
              "Managing email and managing calendars",
              "Driving and deliveries",
              "Accounting and tax returns",
            ],
            answer_index: 1,
            explanation: "The lesson says email and calendar management appear more than any other tasks.",
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
1. In your practice Google Calendar, create a new calendar called "Client practice".
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
  },
};

export default content;
