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
  },
};

export default content;
