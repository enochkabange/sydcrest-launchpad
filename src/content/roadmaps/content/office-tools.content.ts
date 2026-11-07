import type { TrackContent } from "./types";

/**
 * Lesson content for the Office tools track (issue #294). Original SydCrest
 * writing; sources, adverts and the coverage table are in
 * src/content/research/office-tools.md. Nodes that share a choice_group are
 * alternatives: a learner does the Google one or the Microsoft one. Every
 * person, office and number in these lessons is invented for teaching.
 */
const content: TrackContent = {
  roadmap: "office-tools",
  nodes: {
    "office-suites": {
      outcomes: [
        "Explain what an office suite is and name the two main ones",
        "Choose Google Workspace or Microsoft 365 to learn first",
        "Set up a free account and know what the free version leaves out",
        "Name your files so anyone can find them",
      ],
      explanation_md: `## Why this matters

Read a few admin, secretary or office assistant adverts in Ghana and the same words keep coming back: "proficient in Microsoft Office", "Word, Excel, PowerPoint and Outlook", and more and more often "Google Workspace". A school bursar in Bolgatanga, an NGO field office in Walewale and a pharmacy chain in Tamale all run their daily work on one of these two families of software. If you can write a clean letter, keep files in order, share them safely and set up a meeting, you are useful from your first week.

This track teaches those everyday skills on free accounts, on the phone or computer you already have.

## What an office suite is

An **office suite** is a set of programs that work together for everyday office jobs. Each suite has the same main parts:

| Job | Google Workspace | Microsoft 365 |
| :--- | :--- | :--- |
| Email | Gmail | Outlook |
| Cloud files | Google Drive | OneDrive |
| Documents | Google Docs | Word |
| Spreadsheets | Google Sheets | Excel |
| Presentations | Google Slides | PowerPoint |
| Forms | Google Forms | Microsoft Forms |
| Calendar and video calls | Google Calendar and Meet | Outlook calendar and Teams |

The parts are linked. A document you write is saved in your cloud storage, you share it by email, and you discuss it in a video call booked on the calendar.

## Choosing which one to learn first

At most steps in this track you pick one suite and do that lesson. Learn the one you are most likely to use soon:

* If an employer, school or client already uses one, learn that one.
* If you have a Gmail address and an Android phone, Google Workspace may feel familiar.
* If the adverts you want mention Word, Excel and Outlook by name, start with Microsoft 365.

Do not worry about picking wrong. The ideas carry over: a heading is a heading, a shared link is a shared link and a calendar invite works the same way. Once you know one suite well, you can learn the other in days, and you can come back later and do the other lessons.

## Free accounts and what they include

You do not need to pay to learn anything in this track.

* **Google:** a free personal Google account gives you Gmail, Drive, Docs, Sheets, Slides, Forms, Calendar and Meet. At the time of writing your account has 15 GB of storage, and Gmail, Drive and Google Photos all share it.
* **Microsoft:** a free Microsoft account gives you Outlook.com email and Word, Excel and PowerPoint for the web, plus Forms, OneDrive and Teams. At the time of writing you get 5 GB of cloud storage, shared by OneDrive, Outlook.com attachments and the Microsoft 365 apps.

The free versions leave some things out, and lessons say so where it matters. Examples are passwords on shared links, longer group video calls and some advanced features in Word and PowerPoint. Paid plans exist, but you will not need one here. If an employer gives you a work account, it may have more features than your free one; the skills are the same.

## Phone or computer

Everything in this track works in a web browser on a computer and in the free apps on a phone. A few jobs are easier on a bigger screen, such as formatting a long report or setting email filters, and some settings only exist in the browser version. Where that is true the lesson says so and gives you another route. If you mostly use a phone, a short session at a school lab, library or internet café now and then is enough.

## Naming files so people can find them

One habit runs through the whole track: give every file a clear name. A good name says what the file is, who or what it is about, and when. Compare:

* "Document 3" tells nobody anything.
* "Minutes staff meeting Tamale office 2026 11 04" can be found by searching for any of those words, and dates written year, month, day sort in the right order.

Avoid "final", "final2" and "final latest". Use the version history your suite keeps for you instead, which later lessons show you.

## How to use this track

Work through the sections in order. In each one, do the shared lessons and the lesson for the suite you chose. Keep everything you make in one folder in your cloud storage. By the end you will have a small portfolio: a professional email, a formatted report, a spreadsheet, a short deck, a form and a full workshop pack.`,
      workedExample_md: `**Mariama chooses her suite**

Mariama has finished senior high school in Tamale and wants an office assistant job. She reads five adverts on a job board. Three ask for "Microsoft Office", one asks for "Google Workspace" and one names both.

1. She already has a Gmail address, but most of the adverts she likes say Word and Outlook, so she decides to learn Microsoft 365 first.
2. She creates a free Microsoft account using her Gmail address, signs in to Microsoft 365 for the web on her phone's browser and opens Word to check it works.
3. She makes a folder in OneDrive called "Office tools track 2026" for everything she will create.
4. She renames her first test file from "Document1" to "Practice letter Mariama 2026 11 07".
5. She writes a note to herself: "Free account, 5 GB storage. Learn Google later; my Gmail already works."

Two weeks later a church secretary asks her to help with a Google Form. Because she already understands forms in Microsoft, she learns the Google version in one evening.`,
      keyTerms: [
        { term: "Office suite", definition: "A family of programs for everyday office work: email, files, documents, spreadsheets, slides, forms and calendars." },
        { term: "Google Workspace", definition: "Google's office suite. A free personal Google account includes Gmail, Drive, Docs, Sheets, Slides, Forms, Calendar and Meet." },
        { term: "Microsoft 365", definition: "Microsoft's office suite. A free Microsoft account includes Outlook.com and Word, Excel and PowerPoint for the web." },
        { term: "Cloud storage", definition: "Space on the company's computers where your files are kept, so you can open them from any device after signing in." },
        { term: "Version history", definition: "A record the suite keeps of earlier versions of a file, so you can see or restore what it looked like before." },
      ],
      commonMistakes: [
        "Waiting until you can buy Microsoft Office before you start practising",
        "Trying to learn both suites at once and finishing neither",
        "Saving files as Document1, final and final2 so nobody can find the right one",
        "Assuming a feature does not exist because the phone app hides it; check the browser version too",
      ],
      selfCheck: [
        "Which suite do the adverts you care about mention most, and which will you learn first?",
        "How much free storage does your account have, and what shares it?",
        "Can you rename a file so a colleague could find it by searching?",
      ],
      practice_task_md: `**Goal:** set up your free account and a home for your work.

1. Read three to five office job adverts on any job board and note which suite each one names.
2. Choose Google Workspace or Microsoft 365 for this track and write one sentence saying why.
3. Sign in to your free Google account, or create a free Microsoft account, on your phone or computer.
4. Open the documents app of your suite (Google Docs or Word) and create a blank document.
5. Rename it with a clear name, for example "Track notes Wumpini 2026 11".
6. In it, write which suite you chose, how much free storage your account has and one feature this lesson said needs a paid plan.
7. Create a folder in your cloud storage named "Office tools track" and move the document into it.

**Done looks like:** a folder in Google Drive or OneDrive containing one clearly named document with your three notes. Show it to a mentor or a friend.`,
      quiz: {
        questions: [
          {
            prompt: "Which pair of programs does the same job in the two suites?",
            options: ["Gmail and Excel", "Google Slides and Microsoft Word", "Google Drive and OneDrive", "Google Forms and Teams"],
            answer_index: 2,
            explanation: "Google Drive and OneDrive are both the cloud storage part of their suite.",
          },
          {
            prompt: "According to the lesson, how should you decide which suite to learn first?",
            options: [
              "Learn the one your employer, school or the adverts you want already use",
              "Always start with Google, because it is newer and every office has moved to it",
              "Always start with Microsoft because Google has no documents app",
              "Learn whichever one has the most storage space",
            ],
            answer_index: 0,
            explanation: "The lesson says to learn the suite you are most likely to use soon, such as the one an employer or advert names.",
          },
          {
            prompt: "What shares the 15 GB of storage in a free Google account?",
            options: ["Only Google Drive", "Gmail, Google Drive and Google Photos", "Google Docs and Google Meet recordings only", "Nothing; each app has 15 GB of its own"],
            answer_index: 1,
            explanation: "The lesson states that Gmail, Drive and Google Photos all share the 15 GB.",
          },
          {
            prompt: "Which file name follows the lesson's advice?",
            options: [
              "Final report latest version 2 for the Tamale office",
              "Document 3",
              "Report",
              "Attendance register Wa youth training 2026 10 15",
            ],
            answer_index: 3,
            explanation: "A good name says what the file is, who or what it is about and when, with the date written year, month, day.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "professional-email": {
      outcomes: [
        "Write a work email with a clear subject, greeting, purpose and sign off",
        "Decide when to use To, Cc and Bcc",
        "Attach files politely and check them before sending",
        "Recognise and report a phishing email",
      ],
      explanation_md: `## Why this matters

Email is often the first piece of your work an employer sees. A clear, polite message gets a reply; a vague one with a missing attachment gets ignored or creates three more emails. In an office you will email managers, partner organisations, suppliers and government offices, and every message represents your employer. Email is also the most common way criminals try to steal passwords and money, so spotting a fake message protects you and your office.

This lesson works the same in Gmail and Outlook. The next lesson shows the buttons in the suite you chose.

## The parts of a good work email

**Subject line.** Say what the email is about in a few words, so it can be found later. "Request: venue for 14 November training" is better than "Hello" or an empty subject.

**Greeting.** Use the person's title and name if you know it: "Dear Mr Issahaku" or "Good morning Madam Hawa". With a colleague you know well, "Hello Fuseini" is fine. Match the tone the other person uses.

**Purpose first.** In the first sentence or two, say why you are writing and what you need. Busy people read the top and decide whether to read on.

**Details.** Give the facts the reader needs: dates, places, amounts in cedis, names. Use short paragraphs or a short list. One email, one topic; a second topic deserves its own email and subject line.

**Clear request and deadline.** Say exactly what you want the reader to do and by when. "Please confirm by Wednesday 12 November whether the hall is free" is easy to act on.

**Sign off and signature.** End with "Kind regards" or "Thank you", then your name, role, organisation and phone number. A signature adds this automatically; you will set one up in the next lesson.

## To, Cc and Bcc

* **To** is for the people who must act or reply.
* **Cc** (carbon copy) is for people who should know but do not need to act, such as your supervisor.
* **Bcc** (blind carbon copy) hides addresses from the other recipients. Use it when you email a list of people who do not know each other, such as all workshop participants, so you do not share everyone's address with everyone.

Think before you press **Reply all**. Only reply to everyone if everyone needs your answer.

## Attachments

Mention the attachment in the text ("I have attached the draft budget") and attach it before you write the message, so you do not forget. Give the file a clear name. Large files, such as videos or many photos, are better shared as a link from your cloud storage, which both suites can do for you. Ask before sending large files to someone on a small data bundle.

## Before you press send

Read the email once from the reader's point of view. Check the names, dates and amounts, the attachment and the recipients. Most mistakes are caught in that one read. Both Gmail and Outlook let you briefly undo a message you have just sent, but do not rely on it.

## Spotting phishing

**Phishing** is a message pretending to come from someone you trust, such as your bank, a mobile money provider, an employer or your own office, to trick you into giving a password, a code or money, or opening a harmful file. Warning signs:

* **Urgency or fear:** "Your account will be closed today", "Pay the processing fee now to secure the job".
* **A sender address that does not match:** the name says your bank, but the address is a free email account or a misspelled company name.
* **Links that go somewhere unexpected:** on a computer, rest the pointer on a link to see where it really goes; on a phone, press and hold the link to preview the address without opening it.
* **Requests for passwords, PINs or verification codes.** Real organisations do not ask for these by email.
* **Unexpected attachments,** especially ones that ask you to enable something before you can read them.
* **Job offers that ask you to pay.** Genuine employers do not charge application or training fees.

If an email looks suspicious, do not click, reply or open attachments. Check with the person or organisation using a phone number or website you already know. Then use the **Report phishing** or **Report** option in your email app so the provider can protect others, and delete it. If you clicked and entered a password, change it at once and tell your supervisor or IT contact.`,
      workedExample_md: `**Fuseini asks for a venue**

Fuseini is an administrative assistant at a small NGO in Tamale. His manager, Madam Amina, asks him to book a hall for a training.

His first draft has the subject "Hi" and says: "Pls is your hall free next week, we want to do a program. Thanks." He reads it as the hall manager would and rewrites it:

**Subject:** Request: hall booking for 14 November training

Dear Mr Sumaila,

I am writing on behalf of Northern Youth Skills to ask whether your conference hall is available on Friday 14 November from 9am to 1pm, for a training of about 30 people.

We would need chairs, two tables and a socket for a projector. I have attached our short programme so you can see the plan.

Could you please confirm availability and the price by Wednesday 12 November?

Kind regards,
Fuseini Mahama
Administrative Assistant, Northern Youth Skills
Phone: 020 000 0000

He puts the hall manager in **To**, copies Madam Amina in **Cc**, checks the attachment name, "Programme youth training 14 Nov 2026", and sends it.`,
      keyTerms: [
        { term: "Subject line", definition: "The short title of an email that appears in the inbox. It should say what the email is about." },
        { term: "Cc", definition: "Carbon copy. People who should see the email but do not need to act on it." },
        { term: "Bcc", definition: "Blind carbon copy. Recipients whose addresses the others cannot see; useful for emailing a group of strangers." },
        { term: "Signature", definition: "Your name, role, organisation and contact details, added at the end of every email automatically." },
        { term: "Phishing", definition: "A fake message that pretends to come from someone you trust to trick you into giving passwords, codes or money." },
      ],
      commonMistakes: [
        "Leaving the subject empty or writing Hello as the subject",
        "Writing that a file is attached and then forgetting to attach it",
        "Putting a whole list of participants in To or Cc so everyone sees everyone's address",
        "Clicking a link in an urgent email before checking where it really goes",
      ],
      selfCheck: [
        "Could someone find your email next month by searching for words in its subject?",
        "Who in your last email should have been in Cc rather than To?",
        "Name three warning signs of phishing without looking back at the lesson.",
      ],
      practice_task_md: `**Goal:** write one professional email and check one suspicious message.

1. Pick a realistic situation: asking a supplier for a price, confirming a meeting time, or sending a report to a supervisor.
2. Write the email to yourself (or to a friend who agrees to read it) with a clear subject line, a greeting, the purpose first, the details, a request with a deadline and a sign off.
3. Attach one clearly named file, such as a short document, and mention it in the text.
4. Read it once as the receiver would and fix anything unclear.
5. Search your inbox or spam folder for one email that looks suspicious. Without clicking anything, list the warning signs you can see.

**Done looks like:** one sent email that a stranger would understand without asking a question, and a short list of phishing warning signs from a real message. Share both with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "You are emailing 40 workshop participants who do not know each other. Where should their addresses go?",
            options: ["In the To field, so everyone feels personally included in it", "In Cc, so they can see who else is coming", "In Bcc, so nobody's address is shown to the others", "In the subject line"],
            answer_index: 2,
            explanation: "Bcc hides addresses from the other recipients, which protects people who do not know each other.",
          },
          {
            prompt: "What should the first sentence or two of a work email do?",
            options: [
              "Say why you are writing and what you need",
              "Apologise for disturbing the reader before anything else",
              "Repeat the subject line word for word",
              "Give your full contact details",
            ],
            answer_index: 0,
            explanation: "The lesson says to put the purpose first, because busy readers decide from the top whether to read on.",
          },
          {
            prompt: "An email says it is from your bank and asks for your PIN to stop your account closing today. What is the best response?",
            options: [
              "Reply with the PIN quickly so the account stays open",
              "Click the link in the email to check whether the message is really from the bank",
              "Forward it to your colleagues so they are aware",
              "Check with the bank using a number you already know, then report it",
            ],
            answer_index: 3,
            explanation: "Urgency and a request for a PIN are warning signs; you check through a channel you already trust and report the message.",
          },
          {
            prompt: "Who belongs in the Cc field?",
            options: ["People who must reply today", "People who should know but do not need to act", "People whose addresses must stay hidden from the others", "Only your manager"],
            answer_index: 1,
            explanation: "Cc is for people who should be kept informed but are not expected to act.",
          },
          {
            prompt: "On a phone, how can you see where a link really goes without opening it?",
            options: ["Tap it twice quickly", "Forward the email to yourself and open it there instead", "Press and hold the link to preview the address", "Reply and ask the sender"],
            answer_index: 2,
            explanation: "The lesson says to press and hold a link on a phone to preview its address, and to hover over it on a computer.",
          },
        ],
        pass_threshold: 80,
      },
    },
    gmail: {
      outcomes: [
        "Organise a Gmail inbox with labels, archiving and stars",
        "Find any email quickly with search",
        "Add an email signature on a computer and on a phone",
        "Send large files as a Drive link instead of an attachment",
      ],
      explanation_md: `## Why this matters

An office inbox fills up fast: requests from your manager, invoices from suppliers, replies from partners, newsletters and the odd scam. If you can find the right email in seconds and nothing urgent gets buried, people trust you with more. Many adverts for secretaries and administrative assistants name Gmail or Google Workspace, and remote assistant work often runs on Gmail too.

This lesson uses a free Gmail account. Gmail works in a browser at gmail.com and in the Gmail app on Android and iPhone. A few settings only exist in the browser version, and the lesson says which.

## Labels, not folders

Gmail organises mail with **labels**. A label is like a tag: one email can carry several labels, for example "Suppliers" and "Invoices 2026". Labels are private; the people who email you never see them. You can give labels colours and nest one under another, such as "Projects" with "Walewale school" under it.

To label an email, open it and choose the label icon (a tag shape), then tick one or more labels or create a new one. In the app, open the email, tap the three dot menu and choose **Change labels**.

## Archive, star and delete

* **Archive** removes an email from your inbox but keeps it in **All mail**, where search and labels still find it. Use it for anything finished that you may need again. Most office email should be archived, not deleted.
* **Star** marks an email you need to act on. Check your **Starred** view each morning and remove the star when the job is done.
* **Delete** sends an email to the bin, where it is removed for good after a period. Deleting an email removes it from every label too.

A simple routine: open each new email once, then reply, star it for later, or archive it. Your inbox then only holds what still needs you.

## Searching

The search bar at the top is Gmail's strongest tool. Type a name, a word or an amount. You can also use **search operators**, short instructions that narrow the search:

* **from:** followed by a name or address, such as from:hawa, finds mail from that person.
* **subject:** finds words in the subject line only.
* **has:attachment** finds emails with files attached.
* **label:** followed by a label name searches inside that label.

You can combine them: from:sumaila has:attachment finds every file Sumaila sent you.

## Filters

A **filter** acts on new emails automatically, for example giving every email from a supplier the label "Suppliers" or skipping the inbox for newsletters. At the time of writing, filters are created in Gmail in a browser on a computer, not in the phone app: search for the emails, open the search options and choose **Create filter**. Filters then work everywhere, including on your phone.

## Your signature

A signature adds your name, role, organisation and phone number to the end of every email. On a computer, open **Settings**, then **See all settings**, and find **Signature** on the General tab. Create one, choose it as the default for new emails and replies, and save at the bottom of the page.

The Gmail app has its own **mobile signature** setting under your account in the app's settings. Set it too, or emails sent from your phone go out without one. Keep it plain text: name, role, organisation, phone number.

## Attachments and large files

Use the paper clip icon to attach a file. At the time of writing Gmail allows attachments up to 25 MB in total per email. If you attach something bigger, Gmail offers to send it as a **Google Drive link** instead, and you can choose the Drive icon yourself to share any file from Drive. A link is better for large files and for people on small data bundles: they decide whether and when to download. Check the sharing setting Gmail asks about; the cloud files section explains it.

## Undo send and scheduling

Gmail holds a sent email for a few seconds so you can choose **Undo**. On a computer you can set this delay in Settings. You can also **schedule send**: write an email in the evening and set it to go at 8am, which suits offices that do not want late night messages.

## Reporting phishing

If an email looks like phishing, do not click anything. Open the three dot menu next to the reply button and choose **Report phishing**. That moves it out of your inbox and helps Gmail protect other users.`,
      workedExample_md: `**Hawa tidies a clinic inbox**

Hawa answers email for a small private clinic in Wa. The shared Gmail inbox has over 900 unread emails.

1. She creates three labels: "Suppliers", "Staff", and "Insurance claims".
2. She searches from:medsupply and selects all results, gives them the "Suppliers" label and archives them. They leave the inbox but stay findable.
3. On the clinic's computer she turns that search into a filter, so future supplier emails get the label automatically.
4. She searches has:attachment subject:claim, labels the results "Insurance claims" and stars the three that still need a reply.
5. She sets a signature on the computer and the mobile signature in the Gmail app on the clinic phone: "Hawa Seidu, Front Desk, Wa clinic, 020 000 0000".

By the afternoon the inbox shows only 14 emails, and each one needs action.`,
      keyTerms: [
        { term: "Label", definition: "A tag you add to Gmail emails to group them. One email can have several labels." },
        { term: "Archive", definition: "Removes an email from the inbox but keeps it in All mail, where search still finds it." },
        { term: "Search operator", definition: "A short instruction in the search bar, such as from: or has:attachment, that narrows the results." },
        { term: "Filter", definition: "A rule that acts on new emails automatically, such as adding a label. Created in Gmail in a browser." },
        { term: "Mobile signature", definition: "A separate signature setting in the Gmail app, used for emails you send from your phone." },
      ],
      commonMistakes: [
        "Deleting finished emails instead of archiving them, then needing them later",
        "Setting a signature on the computer and forgetting the separate one in the phone app",
        "Attaching a very large file instead of sharing a Drive link to someone on a small bundle",
        "Looking for the filter option in the phone app, where it does not appear",
      ],
      selfCheck: [
        "What happens to an email when you archive it, and how do you find it again?",
        "Which search would find every email with a file attached from a person called Issahaku?",
        "Where do you set the signature for emails sent from your phone?",
      ],
      practice_task_md: `**Goal:** set up Gmail the way an office assistant would.

1. Create three labels that fit a real or imagined job, such as "Suppliers", "Reports" and "Training".
2. Find three emails in your inbox, give each a label and archive them. Then find one again using search.
3. Use a search operator, such as has:attachment, and note how many results you get.
4. Set a signature with your name, a role (real or practice), an organisation and a phone number. If you use the Gmail app, set the mobile signature too.
5. Send yourself an email with a file shared as a Drive link rather than an attachment.
6. Optional, on a computer: create one filter that adds a label automatically.

**Done looks like:** a screenshot of your label list, a test email showing your signature and a Drive link, and one sentence on how you would keep this inbox tidy each day.`,
      quiz: {
        questions: [
          {
            prompt: "How are Gmail labels different from ordinary folders?",
            options: [
              "Labels are shown to everyone who emails you, so they know where it went",
              "Labels can only be added on a phone",
              "One email can carry several labels at the same time",
              "Labels delete the email after 30 days",
            ],
            answer_index: 2,
            explanation: "A label works like a tag, so one email can have several, unlike a single folder.",
          },
          {
            prompt: "Which action removes an email from the inbox but keeps it findable in All mail?",
            options: ["Archive", "Delete and then empty the bin straight away", "Report phishing", "Mark as unread"],
            answer_index: 0,
            explanation: "Archiving clears the inbox while keeping the email in All mail for search and labels.",
          },
          {
            prompt: "Where do you create a Gmail filter, at the time of writing?",
            options: [
              "In the Gmail app on Android only",
              "In the Gmail app on iPhone only",
              "By replying to the email with the word filter",
              "In Gmail in a browser on a computer",
            ],
            answer_index: 3,
            explanation: "The lesson says filters are created in the browser version on a computer, then work everywhere.",
          },
          {
            prompt: "You attach a file larger than Gmail's attachment limit. What does Gmail offer?",
            options: [
              "To compress the file into a smaller photo",
              "To send it as a Google Drive link",
              "To split it across several separate emails automatically",
              "To print it",
            ],
            answer_index: 1,
            explanation: "Gmail offers to share a large file as a Drive link, which also helps people on small data bundles.",
          },
        ],
        pass_threshold: 75,
      },
    },
    outlook: {
      outcomes: [
        "Organise an Outlook inbox with folders, archiving and flags",
        "Find any email quickly with search",
        "Add an email signature on the web and in the Outlook app",
        "Share large files as a OneDrive link instead of an attachment",
      ],
      explanation_md: `## Why this matters

Many Ghanaian office adverts list "Word, Excel, PowerPoint and Outlook" together, and offices that use Microsoft 365 run their email, calendar and contacts through Outlook. If you can keep a busy Outlook inbox in order and find any message in seconds, you are ready for the email side of an admin or secretary job.

This lesson uses a free Microsoft account with Outlook.com. You can use Outlook in a browser at outlook.com or in the free Outlook app on Android and iPhone. Some settings only exist in the browser version, and the lesson says which.

## Folders and the folder list

Outlook organises mail with **folders**. Each email lives in one folder at a time. Your account starts with Inbox, Drafts, Sent Items, Deleted Items, Junk Email and Archive. You can add your own, such as "Suppliers" or "Training 2026", and put folders inside folders.

In a browser, find **Create new folder** at the bottom of your folder list, or right click a folder to make one inside it. To move an email, drag it to a folder or use **Move to** at the top. In the app, open the email, tap the three dot menu and choose **Move to folder**.

Outlook also offers **categories**, coloured tags you can add to emails and calendar items. One email can have several categories, which helps when something belongs to two topics.

## Focused, archive, flag and delete

* **Focused Inbox** splits your inbox into **Focused** and **Other** tabs, putting newsletters and automatic mail in Other. You can move a sender between the tabs and Outlook learns.
* **Archive** moves an email out of the inbox into the Archive folder. Use it for anything finished that you may need again.
* **Flag** marks an email you must act on. Flagged emails are easy to list and you can clear the flag when the job is done.
* **Delete** moves the email to Deleted Items, which is emptied later. Do not delete work email you might need.

A daily routine: open each new email once, then reply, flag it, or move it to a folder or Archive.

## Searching

Use the search box at the top. Type a name, a word or a phrase. Outlook suggests people and files as you type. You can narrow the search with the filter options next to the box (from, subject, has attachments, date) or type short instructions such as **from:** followed by a name. Searching from:issahaku with the attachments filter finds every file Issahaku sent.

## Rules

A **rule** acts on new emails automatically, for example moving every email from a supplier into "Suppliers". At the time of writing, rules are created in Outlook in a browser: open **Settings**, then **Mail**, then **Rules**, and add a new rule with a condition and an action. The phone app follows the rules but is not where you make them, so use a computer or a browser for this step. You can also right click an email in the browser and choose to create a rule from it.

## Your signature

A signature adds your name, role, organisation and phone number to every email. In Outlook on the web, open **Settings**, go to **Account** and then **Signatures**. Create one and choose it as the default for new messages and for replies and forwards, then save. If the menu has moved, type "signature" in the settings search box.

The Outlook app has its own signature setting in the app's settings. Change it from the default text, or emails from your phone go out with a line about the app instead of your details.

## Attachments and large files

Use the paper clip to attach a file. Outlook can attach a file from your device or share it from OneDrive. For large files, sharing as a **OneDrive link** is better: the email stays small, the person downloads only if they need to, and everyone works on the same copy. Remember that on a free account, attachments you keep in Outlook.com count towards the 5 GB of cloud storage you share with OneDrive, so links also save your space. Check what the link allows; the cloud files section explains view and edit links.

## Undo send and scheduling

In Outlook on the web you can turn on **Undo send** in Settings, which holds a sent email for a few seconds. You can also schedule an email to go later, for example at 8am the next working day.

## Reporting phishing

If an email looks like phishing, do not click anything. Use the **Report** option at the top of the message and choose **Report phishing**. This removes it from your inbox and helps Microsoft protect others.`,
      workedExample_md: `**Abdul-Rahman sorts a school office inbox**

Abdul-Rahman helps the headteacher of a junior high school in Nalerigu with email. The inbox has hundreds of messages from parents, the district office and suppliers.

1. In Outlook on the web he creates three folders: "District office", "Parents" and "Suppliers".
2. He searches from:district, selects the results and moves them to "District office".
3. In **Settings**, **Mail**, **Rules**, he adds a rule: emails from the textbook supplier go to "Suppliers".
4. He flags the four parent emails that still need a reply.
5. He sets a signature on the web and, on the headteacher's phone, replaces the default app signature with "Office of the Headteacher, Nalerigu JHS, 020 000 0000".

The next morning new supplier emails are already in their folder, and the flagged list shows exactly what is left to do.`,
      keyTerms: [
        { term: "Folder", definition: "A place in Outlook that holds emails. Each email sits in one folder at a time." },
        { term: "Category", definition: "A coloured tag in Outlook. One email or calendar item can have several categories." },
        { term: "Focused Inbox", definition: "An Outlook view that splits mail into Focused and Other, so automatic mail does not bury important messages." },
        { term: "Rule", definition: "An instruction that acts on new emails automatically, such as moving them to a folder. Made in Outlook in a browser." },
        { term: "Flag", definition: "A marker for an email you must act on, which you clear when the task is done." },
      ],
      commonMistakes: [
        "Leaving the default app signature on emails sent from your phone",
        "Keeping every attachment in the mailbox and filling the free 5 GB of cloud storage",
        "Looking for the rules setting in the phone app instead of Outlook in a browser",
        "Deleting finished emails instead of moving them to a folder or Archive",
      ],
      selfCheck: [
        "What is the difference between a folder and a category in Outlook?",
        "Where would you go to make a rule that moves supplier emails automatically?",
        "Why is a OneDrive link often better than a large attachment?",
      ],
      practice_task_md: `**Goal:** set up Outlook the way an office assistant would.

1. Create three folders that fit a real or imagined job, such as "Suppliers", "Reports" and "Training".
2. Move three emails into them. Then find one again using search.
3. Search with a filter such as attachments only and note how many results you get.
4. Set a signature on the web with your name, a role (real or practice), an organisation and a phone number. If you use the Outlook app, change its signature too.
5. Send yourself an email that shares a file as a OneDrive link.
6. Optional, in a browser: create one rule that moves emails from a sender into a folder.

**Done looks like:** a screenshot of your folder list, a test email showing your signature and a OneDrive link, and one sentence on how you would keep this inbox tidy each day.`,
      quiz: {
        questions: [
          {
            prompt: "Where are Outlook rules created, at the time of writing?",
            options: [
              "In the Outlook phone app under Signature",
              "In Outlook in a browser, under Settings, Mail, Rules",
              "In OneDrive, under the sharing settings for each file",
              "In Word",
            ],
            answer_index: 1,
            explanation: "The lesson says rules are made in Outlook in a browser; the phone app follows them.",
          },
          {
            prompt: "Which Outlook feature lets one email carry several coloured tags?",
            options: ["Folders", "Focused Inbox", "Junk Email", "Categories"],
            answer_index: 3,
            explanation: "An email sits in one folder at a time, but it can have several categories.",
          },
          {
            prompt: "Why might emails sent from the Outlook app go out without your details?",
            options: [
              "The app has its own signature setting, which still has the default text",
              "Signatures only work on Fridays",
              "The app removes all signatures to save mobile data on small bundles",
              "Signatures need a paid plan",
            ],
            answer_index: 0,
            explanation: "The phone app has a separate signature setting that you must change yourself.",
          },
          {
            prompt: "On a free Microsoft account, what do attachments kept in Outlook.com count towards?",
            options: [
              "Nothing; attachments are always free and unlimited",
              "The storage of the person who sent them to you",
              "The 5 GB of cloud storage shared with OneDrive",
              "Your mobile data bundle",
            ],
            answer_index: 2,
            explanation: "The lesson explains that attachments count towards the 5 GB of cloud storage shared with OneDrive.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "cloud-files": {
      outcomes: [
        "Explain what cloud storage is and why offices use it",
        "Plan a folder structure that others can follow",
        "Check how much free storage you have left",
        "Describe the risks of sharing files carelessly",
      ],
      explanation_md: `## Why this matters

Imagine Wumpini keeps the attendance registers for a youth programme on her phone. The phone falls into a gutter in Tamale and every register is gone. Or Issahaku saves the office budget on one laptop, and the accountant in Bolgatanga cannot open it while he is on leave. Cloud storage solves both problems. Your files live on the provider's computers, you open them from any device after signing in, and colleagues can work on the same copy.

Every office job that touches documents now expects you to save, find and share files in the cloud. Adverts that ask for "record keeping" and "filing" mean digital filing as much as paper.

## How cloud storage works

When you save to **Google Drive** or **OneDrive**, the file is uploaded and stored online in your account. You can then:

* open it in a browser on any computer, or in the app on any phone, after signing in;
* recover it if your device is lost or broken;
* share a link instead of sending copies back and forth;
* see who changed what, and go back to an earlier version of a document.

The catch is that you need a connection to upload and, usually, to open files. The next lessons show how to keep important files available **offline**, so you can still read and edit them when your bundle runs out or the network drops.

## Your free storage

Free accounts have a fixed amount of space, so it is worth knowing what uses it. At the time of writing:

* A free **Google** account has 15 GB, shared by Gmail, Google Drive and Google Photos. Phone photo backups can fill it quickly.
* A free **Microsoft** account has 5 GB of cloud storage, shared by OneDrive, Outlook.com attachments and the Microsoft 365 apps. Your Outlook.com mailbox itself has separate storage.

Both services show how much you have used in their storage settings. Files in the bin still count until the bin is emptied. If you are running out, delete large videos you no longer need, empty the bin, and stop automatic photo backup to the work account.

## Folders that make sense to others

A folder structure is a map of the work. A good one lets a new colleague find a file without asking you. Some simple rules:

* **Organise by what the work is,** such as programmes, years or clients, not by who made the file.
* **Keep it shallow.** Two or three levels is usually enough. Ten folders inside each other hide files.
* **Use the same pattern everywhere.** If "2026 Training Walewale" has folders for Registration, Materials and Reports, the Navrongo training should have the same three.
* **Name files clearly,** as the first section taught: what, who or where, and when, with dates as year, month, day.
* **Keep one master copy.** Do not save "copy of copy of budget". Share the original and let version history keep the old versions.

An example structure for a small NGO:

1. Admin
   * Staff contacts
   * Policies
2. Programmes 2026
   * Youth training Walewale
   * Farmer groups Nalerigu
3. Finance
   * Budgets
   * Receipts

## Sharing: powerful and risky

Cloud files can be shared with one click, which is why offices love them and why mistakes happen. A link to a staff contact list, a beneficiary register with phone numbers or a payment record can be forwarded far beyond the person you meant. Ghana has a data protection law, and the Data Protection Commission expects organisations to protect personal data they hold. Careless sharing can break that trust and the law. The **Sharing files safely** lesson in this section teaches the settings in detail.

## Data and devices

Uploading large videos or many photos uses a lot of data. Upload big files on WiFi when you can, and check the app's settings for an option to transfer files only over WiFi. Documents, spreadsheets and slides made in the suite's own apps are small and sync quickly. On a shared or public computer, always sign out when you finish, and never tick "stay signed in".

## In this section

* **Google Drive** or **OneDrive:** choose the one for your suite. Uploading, folders, finding files, offline use and storage.
* **Sharing files safely:** view, comment and edit access, the risk of "anyone with the link", and how to stop sharing. This one is for everyone.`,
      workedExample_md: `**Issahaku plans the folders for a farmer project**

Issahaku joins a small farmer support project in Walewale. Files are scattered across three phones and an old laptop. Before uploading anything, he writes a folder plan on paper:

1. **Admin:** staff list, contracts, letters.
2. **Farmer groups 2026:** one folder per community (Walewale, Wungu, Janga), each with Registration, Training and Photos.
3. **Finance:** budget and receipts by month, named such as "Receipts 2026 10".
4. **Reports:** monthly and quarterly reports.

He checks the free storage on the project's account and sees that photo backups from one phone are using most of it. He turns off automatic photo backup for that account and moves only the photos the project needs into the Photos folders.

Then he uploads the files into the plan over the office WiFi and renames them as he goes. His manager can now find the October receipts in two taps.`,
      keyTerms: [
        { term: "Cloud storage", definition: "Online space where your files are kept, so you can open them from any signed in device." },
        { term: "Sync", definition: "Keeping the copy on your device and the copy online the same, by sending changes both ways." },
        { term: "Offline access", definition: "A setting that keeps a copy on your device so you can open or edit it without a connection." },
        { term: "Folder structure", definition: "The way folders are arranged inside each other. A good one lets others find files without asking." },
        { term: "Personal data", definition: "Information about an identifiable person, such as a name with a phone number. It must be protected when shared." },
      ],
      commonMistakes: [
        "Keeping the only copy of important files on one phone or laptop",
        "Building folders ten levels deep so nobody can find anything",
        "Letting phone photo backups fill the free storage of a work account",
        "Staying signed in on a shared or café computer",
      ],
      selfCheck: [
        "What would you lose today if your phone stopped working?",
        "How much of your free storage is used, and by what?",
        "Could a new colleague find last month's report in your folders without asking you?",
      ],
      practice_task_md: `**Goal:** check your storage and plan a folder structure.

1. Open the storage page for your account (Google storage or Microsoft storage) and note how much you have used and what uses most of it.
2. Choose a real or realistic organisation, such as a church, a school club, a shop or an NGO project.
3. Write a folder plan for it with no more than three levels, using the rules in this lesson.
4. Write three example file names that follow the naming pattern (what, who or where, year month day).
5. Write two sentences on which folders would contain personal data and who should be able to open them.

**Done looks like:** a short note or document with your storage figures, a folder plan, three file names and two sentences about personal data. You will build this plan in the next lesson.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a benefit of cloud storage described in the lesson?",
            options: [
              "Files open without any connection, even the first time",
              "You can recover your files if your device is lost or broken",
              "It never uses any mobile data at all, even for large uploads",
              "Nobody can ever see your files, even if you share a link",
            ],
            answer_index: 1,
            explanation: "Because files are stored online, a lost phone does not mean lost work.",
          },
          {
            prompt: "On a free Microsoft account, what shares the 5 GB of cloud storage?",
            options: [
              "OneDrive, Outlook.com attachments and the Microsoft 365 apps",
              "Only Word documents",
              "Your phone's photo gallery and its music",
              "Google Drive and OneDrive together",
            ],
            answer_index: 0,
            explanation: "The lesson states that OneDrive, Outlook.com attachments and the Microsoft 365 apps share the 5 GB.",
          },
          {
            prompt: "Which folder plan follows the lesson's advice?",
            options: [
              "One folder for each staff member, named after them, with everything they ever made",
              "Ten levels of folders so that every file has its own folder",
              "No folders, with every file kept in one long list",
              "Folders by type of work, two or three levels deep, using the same pattern each time",
            ],
            answer_index: 3,
            explanation: "The lesson says to organise by what the work is, keep it shallow and repeat the same pattern.",
          },
          {
            prompt: "Do files in the bin count towards your free storage?",
            options: [
              "No, they stop counting the moment you delete them",
              "Only on a phone",
              "Yes, until the bin is emptied",
              "Only if they are photos taken on a phone",
            ],
            answer_index: 2,
            explanation: "The lesson says files in the bin still count until the bin is emptied.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "google-drive": {
      outcomes: [
        "Upload files and folders to Google Drive on a phone or computer",
        "Organise and find files with folders, stars and search",
        "Make important files available offline",
        "Check and free up your Google storage",
      ],
      explanation_md: `## Why this matters

Google Drive is the filing cabinet of Google Workspace. Every Google Doc, Sheet, Slides deck and Form you make is saved there, and offices that use Google share their working files through it. Knowing Drive well means you never lose work, never send the wrong version and can find any file while your manager is still on the phone.

Drive works in a browser at drive.google.com and in the Google Drive app on Android and iPhone, all with your free Google account.

## Finding your way around

The left side of Drive (or the bottom bar in the app) has the main views:

* **My Drive:** the files and folders you own.
* **Shared with me:** files other people have shared with you. They do not appear in My Drive unless you add a shortcut.
* **Recent:** what you opened or changed lately.
* **Starred:** files you marked with a star because you use them often.
* **Bin:** deleted files, which you can restore until they are removed for good.
* **Storage:** how much of your 15 GB is used, and the largest files.

## Creating folders and uploading

To make a folder, choose **New** then **New folder** in a browser, or the **+** button and **Folder** in the app. Build the folder plan from the previous lesson.

To upload on a computer, choose **New** then **File upload** or **Folder upload**, or drag files from your computer into the Drive window. In the app, tap **+** then **Upload** and pick files from your phone. Uploading a whole folder keeps its inside structure.

Drive can also store Word, Excel and PowerPoint files, PDFs and photos. When you open a Word file in Drive you can view it, and you can edit it with Google Docs; Drive keeps the original format unless you choose to save it as a Google Doc.

## Moving, renaming and starring

Open the three dot menu on any file to **Rename**, **Move** (called **Organise** in some versions) or add to **Starred**. Rename files as you upload them so they follow the naming pattern. Star the few files you open every day, such as the staff contacts sheet.

If you need a file in two places, do not make a copy. Add a **shortcut** instead, so there is still only one real file and nobody edits the wrong copy.

## Searching

The search bar searches file names and the text inside Google Docs and many PDFs. Open the search options to filter by file type, owner, or date modified. Searching "budget" with type set to spreadsheets and date set to the last week finds this week's budget in a second.

## Working offline

Offline access keeps a copy on your device, so you can read and edit when there is no connection, and your changes upload when you are back online.

* **On a computer:** at the time of writing you need Google Chrome or Microsoft Edge (not a private window) and the Google Docs Offline extension. Turn on offline in Drive's **Settings**, then right click a file and choose **Make available offline**.
* **In the Drive app:** open the three dot menu on a file and turn on **Make available offline** (on some versions, **Available offline**).

Make only the files you really need offline, such as today's registration list. Offline copies use space on your device.

## Storage and data

Open **Storage** to see what uses your 15 GB. Large videos and photo backups are the usual cause. Files in the Bin still count, so empty it after you are sure. On a bundle, upload large files on WiFi; check the app's settings for an option to transfer files only over WiFi.

## Version history

For Google Docs, Sheets and Slides, Drive keeps a **version history** automatically. Open the file and look under **File**, then **Version history**, to see earlier versions and who changed what. For uploaded files such as PDFs, you can upload a new version in place of the old one from the file's menu, so the link stays the same.

## Signing out on shared devices

If you use Drive on a café or school computer, sign out of your Google account when you finish and close the browser. Anyone who sits down next can otherwise open every file you have.`,
      workedExample_md: `**Amina builds a church records drive**

Amina volunteers as secretary for a church in Bolgatanga. Records are photos of paper registers on her phone.

1. In the Drive app she taps **+**, then **Folder**, and creates "Church records", with folders inside for "Membership", "Minutes" and "Finance".
2. She uploads the register photos into Membership and renames them, such as "Membership register page 1 2026 10".
3. She stars "Minutes" because she opens it every Sunday.
4. She makes the latest minutes document available offline, so she can read it during the meeting even though the church has no signal.
5. Checking **Storage**, she sees her phone backs up every photo to the same account. She keeps only the register photos in Drive and frees space by emptying the Bin.

When the pastor asks for last month's minutes, she searches "minutes" and finds them before he finishes the sentence.`,
      keyTerms: [
        { term: "My Drive", definition: "The part of Google Drive that holds the files and folders you own." },
        { term: "Shared with me", definition: "A view of files other people have shared with you. They are not in My Drive unless you add a shortcut." },
        { term: "Shortcut", definition: "A pointer to a file or folder in another place, so there is still only one real file." },
        { term: "Make available offline", definition: "A setting that keeps a copy on your device so you can open and edit it without a connection." },
        { term: "Bin", definition: "Where deleted files wait before they are removed for good. They still use storage until then." },
      ],
      commonMistakes: [
        "Looking for a shared file in My Drive when it is under Shared with me",
        "Making copies of a file instead of a shortcut, so two versions drift apart",
        "Trying to work offline on a computer without Chrome or Edge and the offline extension",
        "Leaving a Google account signed in on a café computer",
      ],
      selfCheck: [
        "Where would you look for a file a colleague shared with you yesterday?",
        "How do you make a file available offline in the Drive app?",
        "What is using most of your 15 GB right now?",
      ],
      practice_task_md: `**Goal:** build your folder plan in Google Drive and prepare for offline work.

1. Create the folder structure you planned in the previous lesson (or the example NGO structure).
2. Upload at least five files into the right folders, renaming each with a clear name.
3. Star one file you would use daily and add a shortcut to one file in a second folder.
4. Use search with a filter (file type or date) to find one file.
5. Make one file available offline. Turn off your data or WiFi and check that it opens.
6. Open **Storage** and note your used space.

**Done looks like:** a screenshot of your folder structure, one of the offline file opened without a connection, and a note of your storage use.`,
      quiz: {
        questions: [
          {
            prompt: "A colleague shared a file with you. Where will you find it first?",
            options: ["In the Bin", "In Shared with me", "In Storage", "In My Drive, at the very top of the list of folders"],
            answer_index: 1,
            explanation: "Shared files appear under Shared with me and are not in My Drive unless you add a shortcut.",
          },
          {
            prompt: "What do you need to work offline on Google Docs files on a computer, at the time of writing?",
            options: [
              "Any browser in a private window",
              "A paid Google Workspace plan for offline use",
              "Nothing; it works offline automatically on every browser",
              "Chrome or Edge with the Google Docs Offline extension, and offline turned on in Drive settings",
            ],
            answer_index: 3,
            explanation: "The lesson lists Chrome or Edge, the offline extension and the Drive setting.",
          },
          {
            prompt: "You need the same file in two folders. What does the lesson recommend?",
            options: ["Add a shortcut", "Make a copy in each folder and keep both up to date by hand", "Email it to yourself", "Upload it twice"],
            answer_index: 0,
            explanation: "A shortcut keeps one real file, so nobody edits an out of date copy.",
          },
          {
            prompt: "Where can you see who changed a Google Doc and restore an earlier version?",
            options: [
              "In Shared with me",
              "In the Bin",
              "In the file's version history",
              "In the Storage page of Google Drive",
            ],
            answer_index: 2,
            explanation: "Version history shows earlier versions of Docs, Sheets and Slides and who made changes.",
          },
        ],
        pass_threshold: 75,
      },
    },
    onedrive: {
      outcomes: [
        "Upload files and folders to OneDrive on a phone or computer",
        "Organise and find files with folders, favourites and search",
        "Keep important files available offline on a free account",
        "Check and free up your Microsoft storage",
      ],
      explanation_md: `## Why this matters

OneDrive is the filing cabinet of Microsoft 365. When you create a document in Word for the web, a workbook in Excel for the web or a deck in PowerPoint for the web, it is saved to OneDrive. Offices that use Microsoft share their working files through OneDrive or its work cousin, SharePoint. If you know OneDrive well, you never lose work and you can find any file fast.

OneDrive works in a browser at onedrive.com, in the OneDrive app on Android and iPhone, and on Windows computers, where it is built in and appears as a folder in File Explorer. You need only a free Microsoft account.

## Finding your way around

The main views (on the left in a browser, at the bottom in the app) are:

* **My files:** the files and folders you own.
* **Shared:** files others have shared with you, and files you have shared.
* **Recent:** what you opened or changed lately.
* **Favourites** (or starred items in some versions): files you marked to find quickly.
* **Recycle bin:** deleted files, which you can restore for a while before they are removed for good.

## Folders and uploading

To make a folder, choose **New** (or **Add new**) then **Folder** in a browser, or the **+** button in the app. Build the folder plan from the previous lesson.

To upload in a browser, choose **Upload** then **Files** or **Folder**, or drag files into the window. In the app, tap **+** then **Upload**. On a Windows computer you can also save or drag files into the OneDrive folder in File Explorer and they upload by themselves.

OneDrive stores any type of file: Word, Excel and PowerPoint files, PDFs, photos. Office files open in the free web apps when you click them.

## Renaming, moving and favourites

Select a file and use the three dot menu to **Rename**, **Move to** or **Copy to**. Rename files as you upload them so they follow the naming pattern. Mark the few files you open every day as favourites.

Avoid copies of the same working file. Share or link to the one original instead, and let version history keep the old versions. To see earlier versions of a file, open its menu and choose **Version history**.

## Searching

The search box searches file names and, for many file types, the text inside. Type "budget" and OneDrive shows matching files as you type. Sort by date modified to find the newest.

## Working offline on a free account

OneDrive keeps copies on your device in different ways depending on the device:

* **On a Windows computer:** files in the OneDrive folder can be **online only** (they download when you open them) or **always kept on this device**. Right click a file or folder in File Explorer and choose **Always keep on this device** for the ones you need without a connection.
* **In the OneDrive app:** open the three dot menu on a file and choose **Make available offline**. At the time of writing, Microsoft lists making whole folders available offline in the app as a feature of paid Microsoft 365 plans, so on a free account do it file by file.

Your edits to offline files upload when you are back online. Offline copies use space on your device, so keep this for the files you really need.

## Storage and data

At the time of writing a free Microsoft account has 5 GB of cloud storage, shared by OneDrive, Outlook.com attachments and the Microsoft 365 apps. That fills up faster than you might think, especially if your phone backs up photos to OneDrive. Check your use in OneDrive's settings under storage, delete large files you do not need, empty the Recycle bin and think twice before turning on camera upload for a work account. If OneDrive is full, Outlook.com email can also stop working until you free space, so watch it.

Upload large files on WiFi where you can, and check the app's settings for options that limit uploads on mobile data.

## Opening files from email

When someone sends you an Office file by email, save it to OneDrive rather than downloading it again and again. You can then open it from any device and share a link back if needed.

## Signing out on shared devices

On a café or school computer, sign out of your Microsoft account when you finish and close the browser. On a shared Windows computer, do not set up the OneDrive folder with your own account unless the computer is yours.`,
      workedExample_md: `**Sumaila sets up a shop's files**

Sumaila manages records for a phone accessories shop in Tamale. Receipts and stock lists are scattered across WhatsApp chats.

1. In OneDrive on the shop's laptop he creates "Shop records" with folders "Stock", "Receipts" and "Suppliers".
2. He saves the stock list from Excel for the web as "Stock list Tamale shop 2026 11" in Stock and marks it as a favourite.
3. He uploads receipt photos from his phone in the OneDrive app, renaming each, such as "Receipt chargers 2026 11 03".
4. On the laptop he right clicks the stock list in File Explorer and chooses **Always keep on this device**, because the shop's internet often drops.
5. In the app he makes the supplier contacts file available offline, one file at a time, since his free account cannot make whole folders offline.
6. He checks storage: 1.2 GB used of 5 GB. He leaves camera upload off on the shop account.`,
      keyTerms: [
        { term: "My files", definition: "The part of OneDrive that holds the files and folders you own." },
        { term: "Online only", definition: "A file that appears on your Windows computer but downloads only when you open it." },
        { term: "Always keep on this device", definition: "A Windows OneDrive setting that keeps a full copy of a file or folder on the computer for offline use." },
        { term: "Recycle bin", definition: "Where deleted OneDrive files wait for a while before they are removed for good." },
        { term: "Camera upload", definition: "An app setting that copies every photo from your phone to OneDrive. It can fill free storage quickly." },
      ],
      commonMistakes: [
        "Turning on camera upload for a work account and filling the free 5 GB with personal photos",
        "Expecting whole folders to be offline in the phone app on a free account",
        "Downloading the same email attachment many times instead of saving it to OneDrive once",
        "Setting up your personal OneDrive on a shared office computer",
      ],
      selfCheck: [
        "How do you keep a file available without a connection on a Windows computer?",
        "What else uses your 5 GB of free Microsoft storage besides OneDrive files?",
        "Where would you find a file a colleague shared with you?",
      ],
      practice_task_md: `**Goal:** build your folder plan in OneDrive and prepare for offline work.

1. Create the folder structure you planned in the previous lesson (or the example NGO structure).
2. Upload at least five files into the right folders, renaming each with a clear name.
3. Mark one file as a favourite.
4. Use search to find one file, and sort a folder by date modified.
5. Make one file available offline (in the app, or with Always keep on this device on Windows). Turn off your data or WiFi and check that it opens.
6. Check your storage and note how much of the 5 GB you have used.

**Done looks like:** a screenshot of your folder structure, one of the offline file opened without a connection, and a note of your storage use.`,
      quiz: {
        questions: [
          {
            prompt: "Where are files you create in Word for the web saved by default?",
            options: ["On a memory card", "In Google Drive", "In OneDrive", "Only in your email drafts"],
            answer_index: 2,
            explanation: "The Microsoft web apps save your files to OneDrive.",
          },
          {
            prompt: "On a free account, how should you keep files offline in the OneDrive phone app, at the time of writing?",
            options: [
              "Mark individual files as available offline, one by one",
              "Make the whole folder offline in one tap; it is free for every account",
              "Email each file to yourself",
              "Turn on camera upload",
            ],
            answer_index: 0,
            explanation: "Microsoft lists whole folders offline in the app as a paid plan feature, so free accounts do it file by file.",
          },
          {
            prompt: "What does Always keep on this device do on a Windows computer?",
            options: [
              "Deletes the online copy of the file to save cloud storage",
              "Shares the file with everyone in your contacts",
              "Moves the file to the Recycle bin",
              "Keeps a full copy on the computer so it opens without a connection",
            ],
            answer_index: 3,
            explanation: "It keeps the file downloaded, so you can open it offline.",
          },
          {
            prompt: "Why does the lesson warn against camera upload on a work account?",
            options: [
              "It makes photos blurry",
              "It can fill the free 5 GB, which is also used by Outlook.com attachments",
              "It only works on Windows computers and never on phones",
              "It shares your photos publicly",
            ],
            answer_index: 1,
            explanation: "Photos copied automatically use the shared free storage, and a full OneDrive can affect Outlook.com too.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "sharing-safely": {
      outcomes: [
        "Choose view, comment or edit access for each person",
        "Explain the risk of a link that anyone can open",
        "Stop sharing a file and check who has access",
        "Decide what should never be shared by open link",
      ],
      explanation_md: `## Why this matters

Sharing files is one of the most useful things the cloud does: no more "please resend", no more five versions of the same report. It is also where offices leak data. A beneficiary list with phone numbers, a staff salary sheet or a scan of someone's Ghana Card shared with the wrong setting can end up in a WhatsApp group of strangers. You cannot take it back once it has been downloaded. An assistant who shares carefully is trusted with sensitive work; one who does not is a risk.

This lesson covers both Google Drive and OneDrive. The ideas are the same; the button names differ slightly.

## Two decisions every time you share

Each time you share, decide **who** can open the file and **what** they can do.

### Who: specific people or a link

* **Specific people (restricted):** you type the email addresses of the people who should have access. Only they can open it, after signing in. This is the safest choice for anything with personal or financial data.
* **Anyone with the link:** anyone who has the link can open the file, usually without signing in. The link can be forwarded, posted or pasted into a group, and you will not know who opened it.

In Google Drive these settings appear under **General access** (Restricted or Anyone with the link). In OneDrive, the link settings let you choose between a link that works for anyone and one that works only for specific people. Work and school accounts may add an option for "people in your organisation".

### What: view, comment or edit

* **View (Viewer):** can read and usually download, but not change anything.
* **Comment (Commenter):** can read and add comments or suggestions, but not change the text directly. Google Drive has this role; in OneDrive, people with view access to an Office file may be able to comment in the web app depending on the file type.
* **Edit (Editor):** can change, delete and, by default in Google Drive, share the file with others.

Give the lowest level that lets the person do their job. A manager reviewing a report needs comment access. A colleague co-writing it needs edit. Workshop participants receiving the programme need view.

## The risk of "anyone with the link"

An open link is convenient for public things: a poster, a programme, a published report. For anything else, remember:

* Links get forwarded. Someone you trusted may paste it into a group of hundreds.
* Edit plus anyone with the link means anyone can change or delete the content.
* Folder links share everything inside, including files added later.

Never use an open link for files containing **personal data** (names with phone numbers, addresses, ID numbers, health or payment details), staff information, passwords, or anything your manager has not approved for the public.

## Extra controls and what is free

* **Google Drive:** you can stop editors from sharing the file further, and stop viewers and commenters from downloading, printing or copying. Expiry dates on access are available only on work and school accounts.
* **OneDrive:** on a personal account, setting an expiry date or a password on a link is listed by Microsoft as a feature of paid Microsoft 365 plans at the time of writing. On a free account you can still choose view or edit, and remove the link when it is no longer needed.

## Checking and stopping sharing

Review access regularly, and always at the end of a project.

* In Google Drive, open **Share** on the file to see everyone with access. Change a person's role or remove them, and set General access back to **Restricted**.
* In OneDrive, open the file's **Manage access** to see people and links. Remove a person, or delete a link so it stops working.

When someone leaves the team, remove their access to working folders.

## A habit for every share

Before you press send, ask three questions:

1. Does this file contain personal or confidential information?
2. Who exactly needs it, and do they need to view, comment or edit?
3. When should their access end?

If the answer to the first is yes, share with specific people only.`,
      workedExample_md: `**Mariama fixes a risky link**

Mariama works with a health NGO in Navrongo. A colleague shared the outreach register (names, villages, phone numbers) in a staff WhatsApp group using "anyone with the link" and edit access, so volunteers could add names.

1. She opens the file's sharing settings and sees the open edit link.
2. She changes general access to **Restricted** (in OneDrive she would remove the open link under **Manage access**).
3. She adds the four volunteers by email with **Editor** access, and the programme manager with **Commenter** access.
4. In Google Drive she turns off the setting that lets editors share the file further.
5. She posts in the group: "The register link has changed. Volunteers, check your email for access."
6. For the public, she shares only the programme timetable, with "anyone with the link" and view access.`,
      keyTerms: [
        { term: "Restricted access", definition: "Only people you have added by email can open the file, after signing in." },
        { term: "Anyone with the link", definition: "A sharing setting where anyone who has the link can open the file, usually without signing in." },
        { term: "Viewer, Commenter, Editor", definition: "Access levels: read only, read and comment, or change the file." },
        { term: "Manage access", definition: "The OneDrive screen that lists who has access and which links exist, so you can remove them." },
        { term: "Personal data", definition: "Information that identifies a person, such as a name with a phone number or ID number." },
      ],
      commonMistakes: [
        "Sharing a list of names and phone numbers with anyone with the link",
        "Giving edit access when view or comment would do",
        "Sharing a whole folder by open link and forgetting that new files inherit it",
        "Never removing access after a project ends or a volunteer leaves",
      ],
      selfCheck: [
        "Which access level would you give a manager who only needs to review your report?",
        "Why is an open link with edit access especially risky?",
        "Where do you go to stop sharing a file in your suite?",
      ],
      practice_task_md: `**Goal:** share files the right way and audit what you have shared.

1. Create two practice files in your cloud storage: a public "Workshop programme" and a private "Participant contacts" with made up names and numbers.
2. Share the programme with "anyone with the link" and view access. Open the link in a private browser window to check it works without signing in.
3. Share the contacts file with one specific person (a friend or your second email address) with edit access, keeping general access restricted.
4. Try opening the contacts link in a private window without signing in and confirm it is blocked.
5. Open the sharing or Manage access screen for each file and take a screenshot.
6. Remove the friend's access, or delete the link, and check again.

**Done looks like:** screenshots of both sharing screens and a short note explaining why each file got the setting it did.`,
      quiz: {
        questions: [
          {
            prompt: "Which sharing setting is safest for a file of beneficiary names and phone numbers?",
            options: [
              "Anyone with the link, view only",
              "Anyone with the link, edit",
              "Specific people added by email, with restricted general access",
              "Post the file in a public WhatsApp group so it is easy to find",
            ],
            answer_index: 2,
            explanation: "Personal data should be shared only with named people, so only they can open it after signing in.",
          },
          {
            prompt: "Your manager needs to review a report and leave notes but should not change the text. Which access fits?",
            options: ["Viewer", "Commenter", "Editor", "Owner of the file, with full control over everything"],
            answer_index: 1,
            explanation: "Commenter access allows comments and suggestions without direct edits.",
          },
          {
            prompt: "Why does the lesson warn about sharing a whole folder by open link?",
            options: [
              "Files added to the folder later are shared too",
              "Folders cannot be shared at all",
              "Open links only work on computers and never on any phone",
              "It deletes the files",
            ],
            answer_index: 0,
            explanation: "A folder link shares everything inside, including files added after you shared it.",
          },
          {
            prompt: "On a free personal OneDrive account, which link feature is listed as needing a paid plan, at the time of writing?",
            options: [
              "Choosing view or edit access for a link",
              "Removing a link from Manage access",
              "Sharing with a specific person by email address",
              "Setting a password or an expiry date on the link",
            ],
            answer_index: 3,
            explanation: "The lesson says passwords and expiry dates on links come with paid Microsoft 365 plans.",
          },
        ],
        pass_threshold: 75,
      },
    },
    documents: {
      outcomes: [
        "Name the common documents an office produces",
        "Explain why structure beats manual formatting",
        "Plan a document before you start typing",
      ],
      explanation_md: `## Why this matters

Letters to the district assembly, minutes of a staff meeting, a monthly activity report for a donor, a memo about new office hours, a CV: most office jobs produce documents every day. Adverts for administrative assistants and secretaries list "preparing correspondence, reports and minutes" again and again. A document that looks tidy, reads clearly and prints properly makes your organisation look professional. One full of odd spacing and random fonts does the opposite, even if the words are good.

## The documents you will meet

* **Letters:** formal messages to people outside the organisation, often printed or sent as PDF, with an address, date, reference, subject line and signature.
* **Memos:** short internal notices, such as a change of meeting day.
* **Minutes:** a record of a meeting: who attended, what was discussed, what was decided and who will do what by when.
* **Reports:** longer documents with headings, tables and sometimes charts, such as a quarterly activity report.
* **Forms and templates:** documents with blanks to fill in again and again, such as a leave request.

## Structure, not decoration

The single most important skill in this section is using **styles** instead of formatting text by hand.

A beginner makes a heading by typing it, making it bold, changing the size to 16 and pressing Enter twice. The next heading gets size 14 by accident. When the manager asks for all headings in blue, every one must be changed by hand.

A professional selects the heading and chooses **Heading 1** from the styles menu. Every Heading 1 then looks the same, and changing the style changes all of them at once. Styles also:

* build an automatic **table of contents** from your headings;
* show a clickable **outline** so you can jump between sections, which helps a lot on a small screen;
* help screen readers, used by people with visual impairments, to understand the structure;
* survive when you export to PDF or open the file in the other suite.

The same goes for spacing. Do not press Enter five times to push text to the next page; insert a **page break**. Do not line things up with the space bar; use a **table** or tab stops.

## Plan before you type

Five minutes of planning saves an hour of fixing:

1. **Purpose and reader:** who will read this, and what should they know or do afterwards?
2. **Outline:** write the headings first, such as Background, Activities, Results, Challenges, Next steps.
3. **Template:** check whether your office already has one. Using the agreed template is part of the job.
4. **Page setup:** check that the paper size is **A4**, the size used for printing in Ghana. Some apps default to US Letter, which prints with odd margins.

## Writing for busy readers

* Put the most important point first in each section.
* Keep paragraphs short: three or four sentences.
* Use numbered lists for steps and bulleted lists for items.
* Use tables for information with the same parts, such as names, roles and phone numbers.
* Write dates in full ("Friday 14 November 2026") and amounts clearly ("GHS 1,250" or "1,250 cedis"). Pick one form and keep to it.

## Sharing the final version

Most offices send final letters and reports as **PDF** files. A PDF looks the same on every phone and computer, prints exactly as you designed it and is harder to change by accident. Keep the editable version in your cloud folder and send the PDF.

## Working together

Documents rarely have one author. A report you draft will be checked by your supervisor and perhaps by a programme manager. Both suites let several people work on the same file, leave comments, and propose changes that you can accept or reject. The **Comments, suggestions and tracked changes** lesson covers this.

## In this section

* **Google Docs** or **Word:** choose the one for your suite. Styles and headings, lists, tables, page setup and export to PDF.
* **Comments, suggestions and tracked changes:** reviewing documents with colleagues, in either suite.

Both Docs and Word for the web are free, and both open the other's files. A Word file uploaded to Drive opens in Docs, and a Docs file downloaded as .docx opens in Word. Simple formatting built with styles survives the trip; complicated layouts made by hand often break, which is one more reason to use styles.`,
      workedExample_md: `**Fuseini plans the monthly report**

Fuseini must write the October activity report for a youth programme in Tamale. Before opening any app he writes on paper:

* **Reader:** the programme manager, then the donor.
* **Purpose:** show what happened in October and what comes next.
* **Headings:** Summary, Activities, Attendance, Challenges, Plans for November.
* **Table:** activity, date, place, number of participants.
* **Format:** A4, the office report template, send as PDF.

He opens the template, checks the page size is A4, types the five headings and sets each to Heading 1. Then he fills in each section. When the manager asks him to add a section on spending, it takes one new heading, and the table of contents updates itself.`,
      keyTerms: [
        { term: "Style", definition: "A saved set of formatting, such as Heading 1 or Normal text, applied with one click and changed everywhere at once." },
        { term: "Heading", definition: "A title for a section, set with a heading style so it appears in the outline and table of contents." },
        { term: "Page break", definition: "An instruction that starts a new page, used instead of pressing Enter many times." },
        { term: "Template", definition: "A ready made document with the layout and headings already set, used again and again." },
        { term: "PDF", definition: "A file format that looks and prints the same on every device and is hard to change by accident." },
      ],
      commonMistakes: [
        "Making headings with bold and a bigger size instead of a heading style",
        "Pressing Enter or the space bar many times to position text",
        "Printing on the wrong paper size because the app was set to US Letter",
        "Sending the editable file when the reader only needs the final PDF",
      ],
      selfCheck: [
        "What are two things styles do for you that bold text does not?",
        "What paper size should an office document in Ghana usually use?",
        "Why do offices usually send final letters as PDF?",
      ],
      practice_task_md: `**Goal:** plan a real office document before you write it.

1. Choose one document: a letter requesting a venue, the minutes of a short meeting (a family, church or club meeting is fine), or a one page monthly report.
2. Write down the reader and the purpose in one sentence each.
3. Write the headings you will use, in order.
4. Decide whether a table is needed and what its columns will be.
5. Note the page size and the format you will send it in.

**Done looks like:** a short plan (on paper or in a notes app) with reader, purpose, headings, table columns and format. You will build this document in the next lesson.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you use a heading style instead of making text bold and bigger?",
            options: [
              "Bold text cannot be printed on most office printers",
              "Heading styles look the same everywhere and build the outline and table of contents",
              "Heading styles make the file smaller",
              "Bold text is not allowed in Ghana",
            ],
            answer_index: 1,
            explanation: "Styles keep headings consistent, can be changed at once and feed the outline and table of contents.",
          },
          {
            prompt: "What should you use to start a new page?",
            options: ["Press Enter until the cursor moves down", "Press the space bar many times", "Make the font larger", "A page break"],
            answer_index: 3,
            explanation: "A page break starts a new page reliably, however the text above changes.",
          },
          {
            prompt: "Which paper size does the lesson say to check for printing in Ghana?",
            options: ["A4", "US Letter", "A5", "Legal size, which is longer than the usual office paper"],
            answer_index: 0,
            explanation: "The lesson says to check that page setup is A4 because some apps default to US Letter.",
          },
          {
            prompt: "Why do offices usually send final letters and reports as PDF?",
            options: [
              "PDF files can be edited more easily by the receiver",
              "PDF files are always smaller than every other kind of file",
              "A PDF looks and prints the same on every device and is hard to change by accident",
              "Only PDF files can be attached to email",
            ],
            answer_index: 2,
            explanation: "A PDF keeps the layout exactly and protects the final version from accidental changes.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "google-docs": {
      outcomes: [
        "Apply heading styles and use the document outline in Google Docs",
        "Add lists, a table and page numbers",
        "Set the page to A4 and download the document as a PDF",
        "Recover an earlier version with version history",
      ],
      explanation_md: `## Why this matters

Google Docs is free, works in any browser and in the Docs app, saves itself as you type and lets colleagues work on the same file at once. Offices that run on Google Workspace write their letters, minutes and reports in it. If you can produce a clean, well structured document in Docs and send it as a PDF, you can handle the writing side of most office jobs.

## Starting a document

In Drive choose **New** then **Google Docs**, or open the Docs app and tap **+**. Choose **Blank document** or a template from the template gallery. Give it a clear name straight away by clicking "Untitled document" at the top (in the app, rename it from Drive).

Docs saves automatically. There is no Save button; you will see a note that changes are saved to Drive.

## Page setup first

Open **File**, then **Page setup**. Check:

* **Pages** format, not **Pageless**, if the document will be printed or sent as a letter or report. Pageless is fine for notes read only on screen.
* **Paper size A4.**
* **Orientation** portrait for most documents, landscape for wide tables.
* **Margins** of about 2.5 cm unless your office template says otherwise.

You can tick **Set as default** so new documents start this way.

## Headings and the outline

Select a line and use the styles box on the toolbar (it shows **Normal text**) to choose **Title**, **Heading 1**, **Heading 2** and so on. Use Heading 1 for main sections and Heading 2 for parts within them. Keep body text as Normal text.

The **document outline** (in the panel on the left, or under **View**) lists your headings. Click one to jump there. In the app, headings make long documents easier to scan too.

To change how all Heading 1s look, format one heading the way you want, then open the styles box, point at Heading 1 and choose **Update Heading 1 to match**.

## Lists, tables and breaks

* **Lists:** use the numbered list or bulleted list buttons. Press Tab to indent a sub item and Shift and Tab to move it back.
* **Tables:** choose **Insert**, then **Table**, and pick the number of rows and columns. Put headings in the first row and make them bold. Right click (or tap and hold) a cell to add or delete rows. Use tables for information with the same parts, such as a staff contact list.
* **Page break:** **Insert**, then **Break**, then **Page break**.
* **Page numbers:** **Insert**, then **Page numbers**, and choose where they appear.
* **Table of contents:** **Insert**, then **Table of contents**. It is built from your headings and updates with one click.

## Phone or computer

Typing a long report is faster on a computer with a keyboard, and some menus such as Page setup are easiest there. In the Docs app on a phone you can still write, apply heading styles (with the text format button, an A with lines), add lists and tables, and comment. If you mostly use a phone, write the content in the app and do the final page setup and checking in a browser when you can.

## Version history

Docs keeps every saved version. Open **File**, then **Version history**, then **See version history** to see who changed what and when. You can restore an earlier version or name an important one, such as "Sent to manager 4 Nov". This is why you never need "final2" files.

## Download as PDF and other formats

When the document is final, choose **File**, then **Download**, then **PDF document**. The PDF goes to your device's downloads, ready to attach or upload. In the Docs app, look for **Share and export** in the three dot menu, where you can save or send a copy as PDF or Word. You can also download a Word file (.docx) for someone who uses Microsoft Word.

## Opening Word files

If someone sends you a Word file, upload it to Drive and open it. Docs lets you edit it while keeping the Word format, or you can save it as a Google Doc. Simple formatting made with styles comes across well; complicated layouts may shift, so check before you send it back.

## Typing help

**Tools**, then **Spelling and grammar** checks your writing; set the language to English (UK) under **File**, then **Language**, so it accepts British spellings. **Tools**, then **Word count** helps when a form or donor asks for a word limit.`,
      workedExample_md: `**Wumpini writes meeting minutes**

Wumpini is secretary of a women's savings group in Walewale. After the monthly meeting she opens Google Docs on the group's laptop.

1. She creates a blank document named "Minutes savings group meeting 2026 11 02".
2. In **File**, **Page setup**, she chooses Pages, A4 and portrait.
3. She types the title and sets it to **Title**, then adds Heading 1 sections: Attendance, Matters arising, Decisions, Action points.
4. Under Attendance she uses a numbered list of members present.
5. Under Action points she inserts a table with three columns, What, Who and By when, and fills in four rows.
6. She adds page numbers and checks the outline on the left shows all four headings.
7. She downloads it as a PDF and sends it to the chairperson, keeping the editable file in the group's Drive folder.`,
      keyTerms: [
        { term: "Normal text", definition: "The default style for body text in Google Docs." },
        { term: "Document outline", definition: "A list of the headings in a Google Doc that lets you jump to any section." },
        { term: "Pageless", definition: "A Google Docs format with no page breaks, for reading on screen. Use Pages for anything printed." },
        { term: "Page setup", definition: "The Google Docs settings for paper size, orientation and margins." },
        { term: "Download as PDF", definition: "Saving a copy of the document as a PDF file on your device, under File and Download." },
      ],
      commonMistakes: [
        "Leaving the paper size on US Letter or the format on Pageless for a printed letter",
        "Building headings by hand so they do not appear in the outline",
        "Saving a new copy for every change instead of using version history",
        "Sending a Google Docs link to an outside organisation that needs a PDF",
      ],
      selfCheck: [
        "Where do you set the paper size in Google Docs?",
        "How do you make every Heading 1 look different in one step?",
        "How do you get a PDF of a Google Doc on a computer, and in the app?",
      ],
      practice_task_md: `**Goal:** build the document you planned, properly structured, and export it.

1. Create a Google Doc with a clear name for the document you planned in the section lesson.
2. Set Page setup to Pages, A4, portrait.
3. Add a title and at least three Heading 1 sections, with Normal text underneath.
4. Include one numbered or bulleted list and one table with a bold header row.
5. Add page numbers. If the document has four or more headings, add a table of contents.
6. Open version history and name the current version "First full draft".
7. Download it as a PDF and open the PDF to check it looks right.

**Done looks like:** the Google Doc in your track folder and its PDF. Check that the outline shows every heading.`,
      quiz: {
        questions: [
          {
            prompt: "Where do you change the paper size to A4 in Google Docs?",
            options: ["Insert, then Table", "Tools, then Word count", "File, then Page setup", "Format, then Bullets"],
            answer_index: 2,
            explanation: "Paper size, orientation and margins are under File, then Page setup.",
          },
          {
            prompt: "Which format should you choose for a letter that will be printed?",
            options: ["Pageless", "Pages", "Landscape pageless with no margins at all", "Any; Docs fixes it when printing"],
            answer_index: 1,
            explanation: "Pageless is for screen reading; printed documents need the Pages format.",
          },
          {
            prompt: "How do you update every Heading 1 in a document to a new look?",
            options: [
              "Change each heading by hand, one at a time",
              "Delete all headings and type them again",
              "Download the file as PDF and edit it there",
              "Format one heading, then choose Update Heading 1 to match",
            ],
            answer_index: 3,
            explanation: "Updating the style to match changes every heading that uses it.",
          },
          {
            prompt: "On a computer, how do you save a Google Doc as a PDF?",
            options: [
              "File, then Download, then PDF document",
              "Insert, then Break, then Page break",
              "Share, then Anyone with the link, then Viewer",
              "Tools, then Spelling and grammar",
            ],
            answer_index: 0,
            explanation: "File, then Download, then PDF document saves a PDF copy to your device.",
          },
        ],
        pass_threshold: 75,
      },
    },
    word: {
      outcomes: [
        "Apply heading styles and use the navigation pane in Word",
        "Add lists, a table and page numbers",
        "Set the page to A4 and download the document as a PDF",
        "Know what free Word for the web and the Word app can do",
      ],
      explanation_md: `## Why this matters

"Proficiency in Microsoft Word" appears in a large share of Ghanaian admin, secretary and office assistant adverts. Letters, minutes, memos and reports in many offices, schools and NGOs are written in Word. The good news is that the skills employers mean, such as headings, lists, tables, page layout and PDFs, all work in free Word for the web.

## Which Word you can use for free

* **Word for the web:** sign in with a free Microsoft account at the Microsoft 365 website in any browser and open Word. Files save to OneDrive automatically. It covers everyday documents; some advanced features are only in the paid desktop app.
* **The Word app:** on a phone or small tablet, the free Word app lets you create and edit with a free account. At the time of writing, Microsoft limits free editing to screens of 10.1 inches or smaller.
* **Desktop Word:** the full program on Windows or Mac, which needs a paid Microsoft 365 plan or licence. An employer may give you this. Everything in this lesson works the same way there.

## Starting a document

Open Word for the web and choose **Blank document** or a template. Click the file name at the top (it starts as "Document" with a number) and rename it straight away with a clear name. Word for the web saves automatically to OneDrive.

## Page setup first

On the **Layout** tab check:

* **Size:** A4, the paper size used in Ghana. Some accounts default to Letter.
* **Orientation:** portrait for most documents, landscape for wide tables.
* **Margins:** Normal (about 2.5 cm) unless your office template says otherwise.

## Headings and the navigation pane

On the **Home** tab, the **Styles** gallery holds **Title**, **Heading 1**, **Heading 2** and **Normal**. Select a line and click a style. Use Heading 1 for main sections, Heading 2 for parts inside them, and Normal for body text.

Turn on the **Navigation** pane (on the **View** tab) to see all your headings in a list. Click one to jump there. This is the quickest way to move around a long report.

To change how every Heading 1 looks, format one heading the way you want, then right click Heading 1 in the styles gallery and choose to update it to match the selection, where your version offers it. In the desktop app this option is always there.

## Lists, tables and breaks

* **Lists:** use the numbering or bullets buttons on the Home tab. Press Tab to indent and Shift and Tab to move back.
* **Tables:** on the **Insert** tab choose **Table** and pick rows and columns. Put headings in the first row and make them bold. Use the Table tab that appears to add or delete rows.
* **Page break:** **Insert**, then **Page Break**.
* **Page numbers:** **Insert**, then **Page Numbers**.
* **Table of contents:** on the **References** tab, choose **Table of Contents**. It is built from your headings; update it after changes.

## Phone or computer

Long reports are faster with a keyboard, and the ribbon tabs are easier to use on a bigger screen. In the Word app on a phone you can still type, apply styles from the Home menu, insert tables and comment. If you mostly use a phone, write in the app and do the final layout check in a browser when you can.

## Version history

Because the file lives in OneDrive, Word keeps earlier versions. Open **File**, then **Info**, then **Version History** (or the version history option in the file's OneDrive menu) to see or restore them. You never need "final2" copies.

## Download as PDF

When the document is final, open **File**, then look for **Save as** or **Export**, and choose **Download as PDF**. Word for the web makes a PDF you can save to your device and attach or upload. In the Word app, look under **File** or **Share** for an option to send or save a PDF copy.

## Spelling and language

On the **Review** tab, **Editor** or the spelling tools check your writing. Set the proofing language to English (United Kingdom) so British spellings such as "organise" and "colour" are accepted. **Word Count** is on the Review tab too.

## Working with Google Docs files

If someone shares a Google Doc, they can download it as a Word file (.docx) for you, or you can open the .docx in Word for the web. Documents built with styles move between the two suites well; layouts built with spaces and Enter keys often break.`,
      workedExample_md: `**Sumaila prepares a memo**

Sumaila is an office assistant at a district education office in Bolgatanga. His supervisor asks for a memo about new opening hours.

1. In Word for the web he opens the office memo template from OneDrive and saves a copy as "Memo opening hours 2026 11 10".
2. On **Layout** he confirms A4 and portrait.
3. He sets "Memo" as Title and uses Heading 1 for Background, New hours and Effective date.
4. Under New hours he inserts a table with two columns, Day and Hours, and five rows.
5. He turns on the **Navigation** pane to check all three headings appear.
6. He reads the memo on the **Review** tab with Editor, fixes two typing errors and then chooses **File**, **Save as**, **Download as PDF**.
7. He emails the PDF to his supervisor and keeps the Word file in OneDrive.`,
      keyTerms: [
        { term: "Word for the web", definition: "The free browser version of Word, used with a free Microsoft account. Files save to OneDrive." },
        { term: "Styles gallery", definition: "The set of styles on the Home tab, such as Normal, Title and Heading 1." },
        { term: "Navigation pane", definition: "A side panel listing your headings, so you can jump to any section." },
        { term: "Layout tab", definition: "Where you set paper size, orientation and margins in Word." },
        { term: "Download as PDF", definition: "The Word for the web option that saves a PDF copy of your document to your device." },
      ],
      commonMistakes: [
        "Believing you must buy Word before you can practise",
        "Leaving the page size on Letter for a document that will be printed in Ghana",
        "Typing headings in bold so they never appear in the navigation pane",
        "Sending the editable Word file when a PDF was asked for",
      ],
      selfCheck: [
        "Which tab do you use to set A4 and margins?",
        "How do you see a list of all headings in a long document?",
        "What is the free screen size limit for editing in the Word app, at the time of writing?",
      ],
      practice_task_md: `**Goal:** build the document you planned, properly structured, and export it.

1. In Word for the web (or the Word app), create a document with a clear name for the document you planned in the section lesson.
2. On Layout, set A4, portrait and Normal margins.
3. Add a title and at least three Heading 1 sections, with Normal text underneath.
4. Include one numbered or bulleted list and one table with a bold header row.
5. Add page numbers. If the document has four or more headings, add a table of contents.
6. Turn on the Navigation pane and check every heading appears.
7. Download it as a PDF and open the PDF to check it looks right.

**Done looks like:** the Word document in your track folder in OneDrive and its PDF.`,
      quiz: {
        questions: [
          {
            prompt: "Which tab do you use to set the paper size to A4 in Word?",
            options: ["Layout", "Insert", "Review", "View, under the Navigation pane settings"],
            answer_index: 0,
            explanation: "Size, orientation and margins are on the Layout tab.",
          },
          {
            prompt: "What does the Navigation pane show?",
            options: [
              "A list of everyone who has opened or changed the file",
              "Your headings, so you can jump to any section",
              "The PDF version of the document",
              "Your OneDrive storage use",
            ],
            answer_index: 1,
            explanation: "The Navigation pane lists headings made with heading styles.",
          },
          {
            prompt: "At the time of writing, what does a free Microsoft account allow in the Word phone app?",
            options: [
              "Viewing only, with no editing at all on any phone or tablet of any size",
              "Editing on any tablet of any size",
              "Creating and editing on screens of 10.1 inches or smaller",
              "Editing only documents made in Google Docs",
            ],
            answer_index: 2,
            explanation: "The lesson says free editing in the app is limited to screens of 10.1 inches or smaller.",
          },
          {
            prompt: "Where is the option to make a table of contents in Word?",
            options: ["Home tab, Bullets", "Layout tab, under Margins and Orientation", "Review tab, Word Count", "References tab, Table of Contents"],
            answer_index: 3,
            explanation: "The table of contents is on the References tab and is built from your headings.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "reviewing-documents": {
      outcomes: [
        "Add, reply to and resolve comments",
        "Suggest edits in Google Docs or track changes in Word",
        "Accept or reject proposed changes",
        "Agree a simple review process with colleagues",
      ],
      explanation_md: `## Why this matters

In an office, almost nothing goes out with one person's name on it alone. A letter is drafted by an assistant, checked by a supervisor and signed by a director. A donor report passes through the programme officer, the finance officer and the manager. If everyone edits the same file freely, nobody knows what changed, good sentences disappear and mistakes creep in. Comments and tracked changes solve this: every proposed change is visible, and the author decides what stays.

Being able to review well, and to respond to reviews calmly, is a real workplace skill. It shows care and respect for other people's work.

## Comments

A **comment** is a note attached to a piece of text. It does not change the document.

* **Google Docs:** select the text and choose the comment button (a speech bubble with a plus) or **Insert**, then **Comment**. In the app, select text and tap the comment icon.
* **Word:** select the text and choose **New Comment** on the **Review** tab, or the comment button. In the app, select text and look for the comment option.

Write comments that help: say what the problem is and, where you can, suggest a fix. "Date wrong? The training was on 14 Nov, not 15" is useful. "Wrong" is not.

You can **reply** to a comment to discuss it. When the issue is dealt with, **resolve** it (Google Docs) or mark it resolved (Word). Resolved comments disappear from view but are kept in the comment history.

To get a colleague's attention, type @ followed by their name or email in a comment. They get a notification, and in Google Docs you can assign the comment to them as an action item.

## Suggesting edits in Google Docs

Google Docs has three modes, chosen from the button near the top right (a pencil icon on a computer):

* **Editing:** your changes go straight into the text.
* **Suggesting:** your changes appear as coloured suggestions. Deleted words are crossed out, added words are coloured, and each suggestion shows in the margin with your name.
* **Viewing:** you can read but not change anything.

To review someone's draft, switch to **Suggesting** and edit normally. The author then sees each suggestion and chooses the tick to **accept** or the cross to **reject** it. In the Docs app, look in the three dot menu for **Suggest changes**.

People with commenter access can only suggest and comment, never edit directly, which is one way to protect a document.

## Tracked changes in Word

Word calls this **Track Changes**.

* In Word for the web, use the mode button near the top of the window and choose **Reviewing**. Your changes are then tracked. **Editing** mode does not track changes, and **Viewing** stops changes altogether. You can also turn on **Track Changes** from the **Review** tab.
* Tracked changes appear in colour with your name. The author goes through them on the Review tab, choosing **Accept** or **Reject** for each one, or for all at once.

Microsoft notes that Word for the web has a smaller set of Track Changes options than the desktop app, but the main tasks of tracking, accepting and rejecting work in the free version.

## A simple review process

Agree a few rules with your team so reviews do not get messy:

1. **One owner:** one person (usually the author) accepts or rejects changes. Reviewers suggest; they do not overwrite.
2. **Suggest, do not edit:** reviewers use Suggesting mode or Reviewing mode, or get commenter access.
3. **A deadline for comments,** such as "all comments by Thursday noon".
4. **Resolve everything** before the document is final. No open comments or untracked surprises.
5. **Name the version** that was sent, using version history.

## Receiving feedback

When your work comes back full of red, do not take it personally. Read every comment before changing anything. Accept the ones you agree with, reply politely where you disagree or need clarification, and thank the reviewer. Reviewers notice who handles feedback well.

## Before sending a reviewed document

Check that no suggestions or tracked changes are left and that comments are resolved. Otherwise the PDF or printed copy may show them, or someone outside the office may read internal notes. In Word, check the Review tab; in Docs, check that the margin is clear.`,
      workedExample_md: `**Issahaku reviews a letter**

Abdul-Rahman drafted a letter to the district assembly asking for chairs for a community meeting in Nalerigu. He shares it with his supervisor, Issahaku, with edit access.

1. Issahaku opens it and switches to **Suggesting** in Google Docs (in Word for the web he would choose **Reviewing**).
2. He changes "next week" to "on Saturday 22 November" and deletes a repeated sentence. Both appear as suggestions with his name.
3. He selects "50 chairs" and comments: "@Abdul-Rahman please confirm the number with the chief's office before we send."
4. Abdul-Rahman accepts both suggestions, replies to the comment, "Confirmed, 50 chairs", and resolves it.
5. He checks there are no suggestions or comments left, names the version "Final sent 2026 11 12", downloads the PDF and sends it.`,
      keyTerms: [
        { term: "Comment", definition: "A note attached to text that does not change the document. It can be replied to and resolved." },
        { term: "Resolve", definition: "Mark a comment as dealt with. It disappears from view but stays in the comment history." },
        { term: "Suggesting mode", definition: "A Google Docs mode where your edits appear as suggestions the author can accept or reject." },
        { term: "Track Changes", definition: "The Word feature that records every edit in colour so it can be accepted or rejected. Reviewing mode turns it on." },
        { term: "Accept or reject", definition: "The author's decision to keep or remove a suggested or tracked change." },
      ],
      commonMistakes: [
        "Editing someone's draft directly in Editing mode so they cannot see what changed",
        "Writing vague comments such as wrong or fix this",
        "Sending a PDF that still shows suggestions or open comments",
        "Arguing with every comment instead of reading them all first",
      ],
      selfCheck: [
        "What is the difference between a comment and a suggestion?",
        "Which mode do you choose in Word for the web to track your changes?",
        "What should you check before turning a reviewed document into a PDF?",
      ],
      practice_task_md: `**Goal:** run a full review cycle on one document.

1. Take the document you made in the previous lesson and share it with a friend, mentor or your second account with edit access.
2. Ask them to switch to Suggesting (Google Docs) or Reviewing (Word) and make at least three changes and two comments. If nobody is available, do it yourself from a second account or a second browser.
3. As the author, accept at least two changes and reject one, with a reply explaining why.
4. Reply to each comment and resolve it.
5. Check that no suggestions, tracked changes or open comments remain, then name the version in version history.

**Done looks like:** screenshots of the document with suggestions showing, then the clean final version, plus one sentence on what you learned from the feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Which Google Docs mode shows your edits as changes the author can accept or reject?",
            options: ["Editing", "Viewing", "Pageless view", "Suggesting"],
            answer_index: 3,
            explanation: "Suggesting mode turns your edits into suggestions with your name on them.",
          },
          {
            prompt: "In Word for the web, which mode tracks your changes?",
            options: ["Editing", "Reviewing", "Viewing", "Reading, which hides the ribbon to make more room"],
            answer_index: 1,
            explanation: "Reviewing mode tracks changes; Editing does not, and Viewing stops changes.",
          },
          {
            prompt: "What happens when you resolve a comment?",
            options: [
              "It is hidden from view but kept in the comment history",
              "It is deleted for good along with the text it was attached to",
              "It is emailed to everyone in your contacts",
              "It becomes part of the document text",
            ],
            answer_index: 0,
            explanation: "Resolving marks the comment as dealt with and hides it, but keeps a record.",
          },
          {
            prompt: "Which comment follows the lesson's advice?",
            options: [
              "Wrong",
              "Fix this please",
              "Date wrong? The training was on 14 Nov, not 15",
              "I do not like this paragraph at all",
            ],
            answer_index: 2,
            explanation: "A helpful comment names the problem and suggests the fix.",
          },
          {
            prompt: "Why check for leftover suggestions and comments before making a PDF?",
            options: [
              "PDFs cannot be made while comments exist",
              "Comments make the PDF file far too large to email to anyone outside the office",
              "Suggestions are deleted automatically when you download",
              "The PDF or print may show them, including internal notes",
            ],
            answer_index: 3,
            explanation: "Leftover suggestions or comments can appear in the final copy and expose internal notes.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "sheets-and-slides": {
      outcomes: [
        "Recognise office tasks that need a spreadsheet and ones that need slides",
        "Describe a tidy table with one row per record",
        "Plan a short deck around one message",
      ],
      explanation_md: `## Why this matters

Two more tools show up in nearly every office advert: spreadsheets (Excel or Google Sheets) and presentations (PowerPoint or Google Slides). An office assistant keeps the attendance list, the stock list and the petty cash record in a spreadsheet. A programme officer explains last quarter's work to a board or a community meeting with slides. You do not need to be an expert in either to be useful; you need the basics done neatly and correctly.

This section gives you those basics. For spreadsheets, the separate **Excel and Power BI** track goes much further, into formulas, lookups, PivotTables and dashboards. Here we stop at what most office work needs every day.

## When to use a spreadsheet

Use a spreadsheet when you have a **list of similar things** with the same details for each one, and you may want to sort, count or add them up:

* participants at a training, with name, community, gender and phone number;
* stock in a shop, with item, quantity and price;
* petty cash, with date, item, amount in cedis and who approved it.

If the information is mostly sentences, such as minutes or a letter, use a document instead.

## The tidy table rule

Spreadsheets work best when the data is **tidy**:

* **One row per record:** one participant, one sale, one payment.
* **One column per detail:** name in one column, phone number in another.
* **One header row** at the top, with clear names such as "Amount (GHS)".
* **No blank rows** in the middle and no merged cells in the table.
* **The same spelling every time:** always "Tamale", never a mix of "Tamale ", "TML" and "Tamale Metro".

A tidy table can be sorted, filtered and totalled in seconds. A messy one has to be fixed by hand first.

## When to use slides

Use slides when you must **explain something to a group**, in a meeting or on a screen, or send a short visual summary. A good deck supports the speaker; it is not a document squeezed onto slides. Typical office uses:

* a quarterly update to the board;
* an induction for new volunteers;
* a short pitch to a partner;
* a training session for a community group.

## One message per deck, one idea per slide

Before opening the app, write one sentence that says what the audience should remember, such as "The Walewale training reached more women than planned, and we need two more trainers for next quarter." Then plan the slides around it:

1. Title slide.
2. The problem or background.
3. What you did.
4. What happened, with a simple table or chart.
5. What you need or what comes next.

Each slide should make one point, with a clear title and a few short lines or one picture. If you are reading a paragraph off a slide, it belongs in your speaker notes or a handout instead.

## Data and screens

Spreadsheets and slides made in the suite's own apps are small files. Large photos and videos in a deck make it heavy, which matters for people who will download it on a bundle. The slides lessons show how to export a PDF copy, which is lighter and opens on any phone.

Both tools work in the free web versions and in the phone apps. Building a large spreadsheet or arranging slides is easier on a computer screen, but you can create, edit and present from a phone.

## In this section

* **Google Sheets basics** or **Excel basics:** a tidy list with a frozen header, formats, simple totals, sorting and filtering.
* **Google Slides** or **PowerPoint:** layouts, readable text, speaker notes, presenting and a PDF copy.

Choose the lessons for your suite. If you want to go deeper with numbers afterwards, the Excel and Power BI track picks up where this section stops.

Keep the spreadsheet and the deck you make in this section in your track folder, next to the documents from the last section. The final practical uses all of them together, and a mentor or employer will want to see that your list, your report and your slides tell the same story with the same numbers.`,
      workedExample_md: `**Hawa decides which tool to use**

Hawa works at a youth centre in Wa. Her manager gives her three tasks on Monday.

1. **Keep a list of everyone who attends the computer class this month.** Each person has a name, age, community and phone number. That is a list of similar records, so she uses a spreadsheet with one row per person and one column per detail.
2. **Write to the municipal office asking for a classroom.** That is sentences to an outside reader, so she uses a document and sends a PDF.
3. **Tell the centre's board on Friday how the class is going.** That is explaining to a group, so she plans a five slide deck around one message: "Attendance doubled since September, and we need ten more chairs."

For slide four she copies the attendance totals from her spreadsheet into a small table, so the deck and the list tell the same story.`,
      keyTerms: [
        { term: "Spreadsheet", definition: "A grid of rows and columns for lists of similar records that you can sort, count and total." },
        { term: "Record", definition: "One item in a list, such as one participant or one sale, kept in one row." },
        { term: "Header row", definition: "The first row of a table, with a clear name for each column." },
        { term: "Deck", definition: "A set of slides for a presentation." },
        { term: "Speaker notes", definition: "Notes under each slide that the presenter can see but the audience does not." },
      ],
      commonMistakes: [
        "Typing a list into a document table when it needs sorting and totals",
        "Merging cells and leaving blank rows in a data table",
        "Copying whole paragraphs onto slides and reading them aloud",
        "Filling a deck with large photos so it is too heavy to share",
      ],
      selfCheck: [
        "Name one task from your week that needs a spreadsheet and one that needs slides.",
        "What are the five parts of a tidy table?",
        "What is the one sentence your audience should remember from your next presentation?",
      ],
      practice_task_md: `**Goal:** plan one spreadsheet and one short deck.

1. Choose a realistic situation, such as a training, a shop or a church event.
2. Write the column headers for a spreadsheet that tracks it (for example Name, Community, Gender, Phone, Attended).
3. Write five example rows on paper or in a note, following the tidy table rules.
4. Write the one sentence message for a short presentation about the same situation.
5. List the titles of four or five slides that support that message.

**Done looks like:** a column plan with five example rows and a one sentence message with slide titles. You will build both in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "Which task is best done in a spreadsheet?",
            options: [
              "A letter to the municipal office",
              "Minutes of a staff meeting, written as full sentences",
              "A list of training participants with community and phone number",
              "A thank you note",
            ],
            answer_index: 2,
            explanation: "A list of similar records with the same details for each one belongs in a spreadsheet.",
          },
          {
            prompt: "Which follows the tidy table rule?",
            options: [
              "Merged cells for each community, with blank rows between groups of people",
              "One row per record and one column per detail",
              "Name and phone number together in one cell",
              "Several header rows",
            ],
            answer_index: 1,
            explanation: "A tidy table has one row per record, one column per detail and a single header row.",
          },
          {
            prompt: "What should you write before you start building slides?",
            options: [
              "The full script of everything you will say",
              "A list of every photo you have",
              "The colours of the theme",
              "One sentence saying what the audience should remember",
            ],
            answer_index: 3,
            explanation: "The lesson says to plan the deck around one message first.",
          },
          {
            prompt: "Where does the lesson send you for formulas, lookups and PivotTables?",
            options: ["The Excel and Power BI track", "The Google Slides lesson", "The documents section of this track", "The Sharing files safely lesson"],
            answer_index: 0,
            explanation: "This section stops at the basics; the Excel and Power BI track goes deeper.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "google-sheets": {
      outcomes: [
        "Build a tidy list in Google Sheets with a frozen header row",
        "Format numbers, dates and amounts clearly",
        "Add totals and counts with SUM, AVERAGE and COUNTA",
        "Sort and filter a list without breaking it",
      ],
      explanation_md: `## Why this matters

Google Sheets is free, works in a browser and in the Sheets app, and lets several people fill in the same list at once. Offices that use Google Workspace keep their registers, stock lists and simple budgets in it. Knowing the basics well, such as a clean list, correct formats, a few totals, sorting and filtering, covers a surprising amount of everyday office work. When you want more, the **Excel and Power BI** track teaches deeper skills, and almost everything there also works in Sheets.

## Starting a sheet

In Drive choose **New** then **Google Sheets**, or tap **+** in the Sheets app. Rename it straight away, for example "Attendance computer class Wa 2026 11". A file is called a **spreadsheet**; it can hold several **sheets**, shown as tabs at the bottom. Each box is a **cell**, named by its column letter and row number, such as B4.

## Building the list

Type your headers in row 1, one per column: Name, Community, Gender, Phone, Amount paid (GHS). Then enter one record per row below. Make the header row bold.

**Freeze the header** so it stays visible as you scroll: **View**, then **Freeze**, then **1 row**. On a phone this matters even more, because you can only see a few rows at a time.

Phone numbers starting with 0 lose the zero if Sheets treats them as numbers. Format the Phone column as plain text first (**Format**, then **Number**, then **Plain text**) and then type the numbers.

## Formats

Select a column and use **Format**, then **Number**:

* **Number** with two decimal places for amounts. Put the currency in the header, such as "Amount (GHS)", so nobody is unsure.
* **Date** for dates. Type dates the same way every time; check that the spreadsheet's locale suits day first dates under **File**, then **Settings**, so 03/11/2026 means 3 November. United Kingdom is a common choice.
* **Percent** for rates.

Use **Format**, then **Alternating colours** to shade every other row, which makes long lists easier to read.

## Simple totals

A **formula** starts with an equals sign and calculates an answer. Click an empty cell below your list and type:

* =SUM(E2:E40) to add up the amounts in E2 to E40.
* =AVERAGE(E2:E40) for the average amount.
* =COUNTA(A2:A40) to count how many names are filled in.

E2:E40 is a **range**: every cell from E2 down to E40. When you change a number in the list, the total updates itself. You can also select a column and look at the bottom right corner, where Sheets shows the sum of the selected cells without a formula.

## Sorting and filtering

Never sort just one column, or the names and amounts end up in the wrong rows. Instead:

1. Click any cell in the list.
2. Choose **Data**, then **Create a filter**. Small filter buttons appear in the header row.
3. Use a header's filter button to **sort A to Z** or to show only certain values, such as one community.

Filters hide rows; they do not delete them. Turn the filter off to see everything again.

## Sharing and working together

Use **Share** as you learnt in the cloud files section. Several people can type in the same sheet at once, each shown with a coloured cursor. For lists that others fill in, consider a form instead (the forms lesson shows how), which keeps the data tidy.

## Phone or computer

The Sheets app is good for entering and checking data and for small edits. Building a new layout, formatting many columns and reading wide lists is easier on a computer screen. If you mostly use a phone, turn it sideways for more columns and keep lists narrow.

## Downloading

**File**, then **Download** lets you save the sheet as an Excel file (.xlsx), a PDF or a CSV, which is a plain text format many systems accept.

## Going further

This lesson stops here on purpose. When you need lookups, PivotTables, charts and reports, move on to the Excel and Power BI track.`,
      workedExample_md: `**Amina tracks youth fees**

Amina helps run a computer class at a youth centre in Wa. Students pay a small fee in instalments.

1. She creates "Class fees Wa 2026 11" with headers Name, Community, Phone, Date paid, Amount (GHS).
2. She freezes row 1 and formats the Phone column as plain text so 024 numbers keep their zero.
3. She enters 25 payments, one per row, and formats Amount with two decimals.
4. In the cell below the amounts she types =SUM(E2:E26) and gets the total collected. Below it, =COUNTA(A2:A26) shows 25 payments.
5. She creates a filter and shows only the Nakori community to answer a question from the community leader, then turns the filter off.
6. She downloads an .xlsx copy for the treasurer, who uses Excel.`,
      keyTerms: [
        { term: "Cell", definition: "One box in the grid, named by column letter and row number, such as B4." },
        { term: "Freeze", definition: "Keep the header row visible while you scroll down a long list." },
        { term: "Formula", definition: "A calculation that starts with an equals sign, such as =SUM(E2:E40)." },
        { term: "Range", definition: "A block of cells written as first and last cell, such as E2:E40." },
        { term: "Filter", definition: "A tool that hides rows that do not match what you choose, without deleting them." },
      ],
      commonMistakes: [
        "Sorting one column on its own so the rows get mixed up",
        "Typing phone numbers as numbers so the leading zero disappears",
        "Typing totals by hand instead of using a formula that updates",
        "Writing the same community name three different ways",
      ],
      selfCheck: [
        "How do you keep the header row visible on a long list?",
        "What does =COUNTA(A2:A40) tell you?",
        "Why should you sort with a filter instead of selecting one column?",
      ],
      practice_task_md: `**Goal:** build the tidy list you planned.

1. Create a Google Sheet with a clear name and the headers from your plan.
2. Freeze the header row and make it bold.
3. Format a phone column as plain text and an amount column as a number with two decimals.
4. Enter at least 15 made up records, using Northern names and communities.
5. Add a SUM and a COUNTA below the list.
6. Create a filter, sort by one column, then show only one value.
7. Download an .xlsx copy.

**Done looks like:** a shared link (view only) to a clean sheet with a frozen header, correct formats, two working formulas and a filter.`,
      quiz: {
        questions: [
          {
            prompt: "How do you keep the header row visible as you scroll in Google Sheets?",
            options: ["Data, then Create a filter", "View, then Freeze, then 1 row", "Format, then Alternating colours", "File, then Download"],
            answer_index: 1,
            explanation: "Freezing one row keeps the headers on screen while you scroll.",
          },
          {
            prompt: "Why format a phone number column as plain text before typing?",
            options: [
              "So the numbers can be added up",
              "So the column is easier to sort from smallest to largest",
              "So the zero at the start is not removed",
              "So the numbers turn into links",
            ],
            answer_index: 2,
            explanation: "Treated as numbers, phone numbers lose their leading zero.",
          },
          {
            prompt: "What does =SUM(E2:E40) do?",
            options: [
              "Adds every number from E2 down to E40",
              "Adds only cells E2 and E40",
              "Counts how many names are in column E, including blanks",
              "Sorts column E",
            ],
            answer_index: 0,
            explanation: "The colon makes a range, so SUM adds every cell from E2 to E40.",
          },
          {
            prompt: "What is the safe way to sort a list in Sheets?",
            options: [
              "Select one column and sort only that column",
              "Retype the list in the new order by hand",
              "Delete the header row first, then sort what is left",
              "Create a filter and sort from a header's filter button",
            ],
            answer_index: 3,
            explanation: "Sorting through a filter keeps each row together.",
          },
        ],
        pass_threshold: 75,
      },
    },
    excel: {
      outcomes: [
        "Build a tidy list in free Excel with a frozen header row",
        "Format numbers, dates and amounts clearly",
        "Add totals and counts with SUM, AVERAGE and COUNTA",
        "Sort and filter a list without breaking it",
      ],
      explanation_md: `## Why this matters

"Excel" is one of the most requested skills in Ghanaian office adverts, from administrative assistants to accounts staff. Offices keep registers, stock lists, petty cash records and simple budgets in it. You can practise for free: Excel for the web works in any browser with a free Microsoft account, and the Excel app on a phone allows free editing on screens of 10.1 inches or smaller at the time of writing. This lesson covers the everyday basics. The **Excel and Power BI** track takes you much further, into lookups, PivotTables and dashboards.

## Starting a workbook

In Microsoft 365 for the web, open Excel and choose **Blank workbook**, or tap **+** in the Excel app. Rename it at the top straight away, for example "Petty cash Tamale office 2026 11". The file is a **workbook**; it can hold several **worksheets**, shown as tabs at the bottom. Each box is a **cell**, named by column letter and row number, such as B4. Excel for the web saves to OneDrive automatically.

## Building the list

Type headers in row 1, one per column: Date, Item, Amount (GHS), Approved by. Enter one record per row below and make the header row bold.

**Freeze the header** so it stays visible as you scroll: on the **View** tab choose **Freeze Panes**, then **Freeze Top Row**. On a phone this matters even more, because you see only a few rows at a time.

Phone numbers that start with 0 lose the zero if Excel treats them as numbers. Select the column first and set its format to **Text** in the number format box on the **Home** tab, then type the numbers.

## Formats

Select a column and use the number format box on the **Home** tab:

* **Number** with two decimal places for amounts. Put the currency in the header, such as "Amount (GHS)", so nobody is unsure.
* **Short Date** for dates. Type dates the same way every time, day first, and check one or two to see that Excel has understood them as dates (they line up on the right of the cell).
* **Percentage** for rates.

**Format as Table** on the Home tab turns your list into an Excel table with banded rows and filter buttons, which keeps it tidy as it grows.

## Simple totals

A **formula** starts with an equals sign. Click an empty cell under your list and type:

* =SUM(C2:C40) to add up the amounts in C2 to C40.
* =AVERAGE(C2:C40) for the average amount.
* =COUNTA(B2:B40) to count how many items are filled in.

C2:C40 is a **range**: every cell from C2 down to C40. Change a number in the list and the total updates itself. The **AutoSum** button on the Home tab writes a SUM for you. Selecting cells also shows their sum in the status bar at the bottom of the window.

## Sorting and filtering

Never sort one column on its own, or items and amounts end up in the wrong rows. Instead:

1. Click any cell in the list.
2. Turn on filters with **Sort and Filter**, then **Filter** on the Home tab (or the **Data** tab). If you used Format as Table, the buttons are already there.
3. Use a header's button to sort A to Z or smallest to largest, or to show only some values.

Filters hide rows; they do not delete them. Clear the filter to see everything again.

## Sharing and working together

Use **Share** as you learnt in the cloud files section. Several people can edit the same workbook in Excel for the web at once. For lists that many people fill in, a form keeps the data tidier; the forms lesson shows how.

## Phone or computer

The Excel app is good for entering and checking data and small edits. Building layouts, formatting many columns and reading wide lists is easier on a computer screen. On a phone, turn it sideways and keep lists narrow.

## Downloading

From **File** you can download a copy of the workbook, or a PDF or CSV copy where your version offers it. CSV is a plain text format many systems accept.

## Going further

This lesson stops here on purpose. For XLOOKUP, PivotTables, charts and reports, go on to the Excel and Power BI track, where your first lessons will feel familiar.`,
      workedExample_md: `**Issahaku keeps the petty cash**

Issahaku is an office assistant at an NGO in Tamale and keeps the petty cash record.

1. In Excel for the web he creates "Petty cash Tamale office 2026 11" with headers Date, Item, Amount (GHS), Approved by.
2. He freezes the top row and formats Amount as a number with two decimals.
3. He enters the month's 18 payments, one per row, such as "2026 11 03, Printer paper, 85.00, Mariama".
4. He uses **Format as Table** so each header has a filter button.
5. Below the table he clicks **AutoSum** to total the Amount column, and types =COUNTA(B2:B19) to count the payments.
6. When the accountant asks what Mariama approved, he filters "Approved by" to show only her name, then clears the filter.`,
      keyTerms: [
        { term: "Workbook", definition: "An Excel file. It can hold several worksheets shown as tabs." },
        { term: "Freeze Top Row", definition: "Keeps the header row visible while you scroll, from the View tab." },
        { term: "AutoSum", definition: "A Home tab button that writes a SUM formula for the cells above or beside it." },
        { term: "Format as Table", definition: "Turns a list into an Excel table with banded rows and filter buttons." },
        { term: "Range", definition: "A block of cells written as first and last cell, such as C2:C40." },
      ],
      commonMistakes: [
        "Sorting one column on its own so the rows get mixed up",
        "Typing phone numbers as numbers so the leading zero disappears",
        "Typing totals by hand instead of using a formula that updates",
        "Thinking you need a paid licence to practise Excel",
      ],
      selfCheck: [
        "Where is Freeze Top Row in Excel?",
        "What does AutoSum do?",
        "Why should you sort with filter buttons rather than one selected column?",
      ],
      practice_task_md: `**Goal:** build the tidy list you planned.

1. Create an Excel workbook in Excel for the web or the app, with a clear name and the headers from your plan.
2. Freeze the top row and make it bold.
3. Format a phone column as Text and an amount column as a number with two decimals.
4. Enter at least 15 made up records, using Northern names and communities.
5. Use Format as Table, then add a SUM (or AutoSum) and a COUNTA below the list.
6. Sort by one column, then filter to show only one value.

**Done looks like:** a view only link to a clean workbook with a frozen header, correct formats, two working formulas and filter buttons.`,
      quiz: {
        questions: [
          {
            prompt: "Where do you find Freeze Top Row in Excel?",
            options: ["Home tab, AutoSum", "Insert tab, Table", "View tab, Freeze Panes", "File, then Download a copy of the workbook"],
            answer_index: 2,
            explanation: "Freeze Panes on the View tab includes Freeze Top Row.",
          },
          {
            prompt: "What does the AutoSum button do?",
            options: [
              "Writes a SUM formula for you",
              "Sorts the list from smallest to largest automatically",
              "Saves the file to OneDrive",
              "Turns on filters",
            ],
            answer_index: 0,
            explanation: "AutoSum inserts a SUM formula for the nearby cells.",
          },
          {
            prompt: "At the time of writing, can you edit Excel files for free?",
            options: [
              "No, every version of Excel needs a paid licence",
              "Only on Windows computers bought with Office already installed",
              "Only spreadsheets made in Google Sheets",
              "Yes, in Excel for the web with a free Microsoft account",
            ],
            answer_index: 3,
            explanation: "Excel for the web is free with a Microsoft account, and the app allows free editing on smaller screens.",
          },
          {
            prompt: "What happens to rows you hide with a filter?",
            options: [
              "They are deleted for good",
              "They are hidden, not deleted, and come back when you clear the filter",
              "They move to a new worksheet",
              "They are emailed to the owner of the workbook",
            ],
            answer_index: 1,
            explanation: "Filters only hide rows; clearing the filter shows them again.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "google-slides": {
      outcomes: [
        "Build a short deck in Google Slides with themes and layouts",
        "Keep slides readable with large text and one idea each",
        "Use speaker notes and present from a phone or computer",
        "Download a light PDF copy to share",
      ],
      explanation_md: `## Why this matters

Sooner or later your manager will say "put together a few slides for the meeting". It may be a quarterly update for the board, an induction for new volunteers or a short talk at a community durbar. A clear, simple deck makes you and your organisation look prepared. Google Slides is free, works in a browser and in the Slides app, and saves to Drive, so you can build on a laptop and present from a phone if you must.

## Starting a deck

In Drive choose **New** then **Google Slides**, or tap **+** in the Slides app. Rename it at once, such as "Board update youth training Q4 2026". In a browser, a panel of **themes** appears; pick a simple one with good contrast (dark text on a light background, or the reverse). You can change it later under **Slide**, then **Change theme**.

## Layouts, not text boxes everywhere

Every slide has a **layout**: Title slide, Title and body, Title and two columns, Section header, and so on. Choose one with **Slide**, then **Apply layout**, or from the arrow next to the new slide button. Typing into the layout's placeholders keeps titles in the same place and size on every slide, the way styles do in a document. Avoid adding loose text boxes all over the slide.

Add a new slide with the **+** button, or by pressing Ctrl and M (Cmd and M on a Mac) in a browser.

## Making slides readable

* **One idea per slide,** with a title that states the point, such as "Attendance doubled since September" rather than "Attendance".
* **A few short lines,** not paragraphs. If you need sentences, put them in the speaker notes.
* **Large text.** People at the back of a hall, or on a small phone screen in a video call, must read it. Do not shrink text to fit more in; make another slide.
* **Simple tables or charts** for numbers. A table of four rows is clearer than a paragraph full of figures. You can insert a chart from Google Sheets with **Insert**, then **Chart**, then **From Sheets**, and it can be updated when the sheet changes.
* **Pictures that help,** used with permission. Your own photos of the programme are best. **Insert**, then **Image** lets you add photos from your device or Drive.
* **Alt text:** right click an image (or select it and use the format options) and add a short description for people who use screen readers.

## Speaker notes

Below each slide is a box for **speaker notes**. Write what you want to say there: the details, the story, the numbers you want to mention. Your audience sees the slides; you see the notes. In a browser, open the notes area at the bottom of the screen if it is hidden (**View**, then **Show speaker notes**).

## Presenting

* **On a computer:** choose **Slideshow** at the top right. The arrow next to it offers **Presenter view**, which shows your notes and a timer in a separate window while the audience sees only the slides on the projector or shared screen.
* **On a phone or tablet:** open the deck in the Slides app and tap the play button to present. You can also present on a video call by sharing your screen.

Practise once with a timer. A five slide update rarely needs more than ten minutes.

## Sharing a light copy

Many people will look at your deck on a phone, sometimes on a weak connection. Share it in two ways:

* For colleagues who need to edit or comment, share the Slides file from Drive with the right access.
* For everyone else, download a **PDF**: **File**, then **Download**, then **PDF document**. A PDF opens on any phone, prints well and cannot be changed by accident. Large photos make files heavy, so use only the pictures that matter.

You can also download a PowerPoint copy (.pptx) for someone who uses Microsoft.

## Working together

Several people can work on the same deck at once, each on their own slides, and leave comments just as in Docs. Agree who owns the final version and who presents. Use version history (**File**, then **Version history**) if something gets deleted by mistake.

## Phone or computer

Arranging slides and pictures is easiest on a computer, but the Slides app can create slides, edit text, add images, write notes and present. If you build on a phone, keep designs simple and check the deck in a browser before a big meeting if you can.`,
      workedExample_md: `**Sumaila presents to the board**

Sumaila must give a five minute update on a youth football programme in Savelugu to the board.

1. He creates "Board update football programme 2026 11" in Google Slides with a simple light theme.
2. Slide 1 uses the Title slide layout. Slides 2 to 5 use Title and body, with titles that state the point: "120 players registered", "Girls' teams started in October", "Two pitches need repair", "We ask the board for help with goalposts".
3. On slide 3 he inserts a small table: team, players, coach.
4. He adds one photo of the girls' team, taken with permission, with alt text "Girls' team training on the Savelugu pitch".
5. He writes what he will say for each slide in the speaker notes.
6. He presents with Presenter view on the office laptop, then downloads a PDF and shares it in the board's WhatsApp group.`,
      keyTerms: [
        { term: "Theme", definition: "A set of colours and fonts applied to the whole deck." },
        { term: "Layout", definition: "A slide pattern with placeholders, such as Title and body, that keeps slides consistent." },
        { term: "Speaker notes", definition: "Notes under each slide that the presenter sees but the audience does not." },
        { term: "Presenter view", definition: "A presenting mode that shows your notes and a timer to you while the audience sees only the slides." },
        { term: "Alt text", definition: "A short description of an image, read aloud by screen readers." },
      ],
      commonMistakes: [
        "Putting paragraphs on slides and reading them aloud",
        "Scattering loose text boxes instead of using layouts",
        "Sharing only the editable deck when most people need a light PDF",
        "Using photos of people without asking them",
      ],
      selfCheck: [
        "What makes a good slide title?",
        "Where do the details you want to say go?",
        "How do you make a PDF copy of a Google Slides deck?",
      ],
      practice_task_md: `**Goal:** build the short deck you planned.

1. Create a Google Slides deck with a clear name and a simple, high contrast theme.
2. Make four to six slides using layouts, each with a title that states the point.
3. Include one small table or chart and one picture you are allowed to use, with alt text.
4. Write speaker notes for every slide.
5. Present it once to yourself or a friend with a timer, using Slideshow or the app's play button.
6. Download a PDF copy and check it opens on a phone.

**Done looks like:** the Slides file and its PDF in your track folder, and a note of how long the talk took.`,
      quiz: {
        questions: [
          {
            prompt: "Which slide title follows the lesson's advice?",
            options: ["Attendance", "Slide 3", "Attendance doubled since September", "Some information about attendance figures and other things"],
            answer_index: 2,
            explanation: "A good title states the point the slide makes.",
          },
          {
            prompt: "Where should the detailed sentences you plan to say go?",
            options: [
              "In small text at the bottom of each slide",
              "In the speaker notes",
              "In a separate email sent before the meeting",
              "In the title of each slide",
            ],
            answer_index: 1,
            explanation: "Speaker notes hold the detail for the presenter; slides stay short.",
          },
          {
            prompt: "What does Presenter view show you while the audience sees the slides?",
            options: [
              "Your notes and a timer",
              "The audience's comments, live",
              "The deck's version history",
              "Your Drive storage use and the files using the most space",
            ],
            answer_index: 0,
            explanation: "Presenter view shows your notes and a timer on your screen only.",
          },
          {
            prompt: "Why share a PDF copy of a deck as well as the Slides file?",
            options: [
              "A PDF can be edited more easily than Slides",
              "PDF copies include your speaker notes for the audience",
              "Slides files cannot be opened on phones at all",
              "A PDF opens on any phone, prints well and cannot be changed by accident",
            ],
            answer_index: 3,
            explanation: "The lesson recommends a PDF for people viewing on phones or weak connections.",
          },
        ],
        pass_threshold: 75,
      },
    },
    powerpoint: {
      outcomes: [
        "Build a short deck in free PowerPoint for the web with themes and layouts",
        "Keep slides readable with large text and one idea each",
        "Use speaker notes and present from a phone or computer",
        "Download a light PDF copy to share",
      ],
      explanation_md: `## Why this matters

PowerPoint appears again and again in Ghanaian office adverts alongside Word and Excel. Managers, programme officers and trainers use it for board updates, inductions, donor visits and community meetings. A clear, simple deck makes your organisation look prepared. You can build one for free in PowerPoint for the web with a free Microsoft account, and the PowerPoint app on a phone allows free editing on screens of 10.1 inches or smaller at the time of writing.

## Starting a deck

In Microsoft 365 for the web open PowerPoint and choose **Blank presentation** or a theme, or tap **+** in the app. Rename it at the top straight away, such as "Volunteer induction Bolgatanga 2026 11". It saves to OneDrive automatically.

On the **Design** tab, pick a simple **theme** with good contrast: dark text on a light background, or the reverse. Some design suggestions in PowerPoint need a paid plan; the basic themes are enough.

## Layouts, not text boxes everywhere

Each slide has a **layout**: Title Slide, Title and Content, Two Content, Section Header and others. Choose one from **Layout** on the **Home** tab, or pick it when you add a slide with **New Slide**. Typing into the placeholders keeps titles in the same place and size on every slide, the way styles do in a document. Avoid scattering loose text boxes.

## Making slides readable

* **One idea per slide,** with a title that states the point: "Twelve volunteers trained in October" rather than "Training".
* **A few short lines,** not paragraphs. Sentences belong in the speaker notes.
* **Large text** that people at the back of a hall, or on a phone in a video call, can read. If it does not fit, make another slide instead of shrinking the font.
* **Simple tables or charts** for numbers. **Insert**, then **Table** adds a small table; keep it to a few rows.
* **Pictures that help,** used with permission. **Insert**, then **Pictures** adds photos from your device or OneDrive.
* **Alt text:** right click a picture and choose the alt text option, then describe the image briefly for people who use screen readers.

## Speaker notes

Under each slide is a **Notes** area (turn it on from the **View** tab if hidden). Write what you want to say there: the details, the story, the numbers. The audience sees the slides; you see the notes.

## Presenting

* **On a computer:** on the **Slide Show** tab choose **From Beginning**. Where your version offers **Presenter View**, it shows your notes and a timer while the audience sees only the slides on the projector or shared screen.
* **On a phone or tablet:** open the deck in the PowerPoint app and tap the play button. You can also present on a video call by sharing your screen.

Practise once with a timer. A five slide update rarely needs more than ten minutes.

## Sharing a light copy

People will look at your deck on phones, sometimes on weak connections. Share it in two ways:

* For colleagues who need to edit or comment, share the file from OneDrive with the right access.
* For everyone else, make a **PDF**. In PowerPoint for the web, open **File**, then look under **Download as** or **Export** for **Download as PDF**. A PDF opens on any phone, prints well and cannot be changed by accident. Big photos make files heavy, so keep only the pictures that matter.

## Working together

Several people can edit the same deck in PowerPoint for the web at once and leave comments, as in Word. Agree who owns the final version and who presents. Version history in OneDrive lets you go back if something is deleted by mistake.

## Opening Google Slides files

If a partner uses Google Slides, they can download the deck as a PowerPoint file (.pptx) for you. Decks built with layouts and themes move between the two well; hand placed text boxes may shift, so check every slide.

## Phone or computer

Arranging slides and pictures is easiest on a computer, but the app can create slides, edit text, add pictures, write notes and present. If you build on a phone, keep designs simple and check the deck in a browser before a big meeting if you can.`,
      workedExample_md: `**Mariama runs a volunteer induction**

Mariama coordinates volunteers for a literacy project in Bolgatanga and must induct twelve new volunteers.

1. In PowerPoint for the web she creates "Volunteer induction Bolgatanga 2026 11" and picks a plain light theme on the Design tab.
2. She uses the Title Slide layout, then Title and Content for five slides with titles such as "We meet every Saturday at 9am", "Each volunteer has six learners" and "Report attendance by Sunday evening".
3. On one slide she inserts a small table of the three reading centres with their contact persons.
4. She adds a photo of a reading session, taken with permission, with alt text.
5. She writes her talking points in the Notes area under each slide.
6. She presents from the laptop with **From Beginning**, then downloads a PDF and sends it to the volunteers' WhatsApp group.`,
      keyTerms: [
        { term: "Theme", definition: "A set of colours and fonts for the whole deck, chosen on the Design tab." },
        { term: "Layout", definition: "A slide pattern with placeholders, such as Title and Content, chosen on the Home tab." },
        { term: "Notes", definition: "The area under each slide for what you plan to say. The audience does not see it." },
        { term: "From Beginning", definition: "The Slide Show tab command that starts the presentation from the first slide." },
        { term: "Alt text", definition: "A short description of a picture, read aloud by screen readers." },
      ],
      commonMistakes: [
        "Thinking you must buy PowerPoint before you can practise",
        "Shrinking text to fit a paragraph instead of making another slide",
        "Scattering loose text boxes so slides look different from each other",
        "Sending only the editable deck to people on weak connections",
      ],
      selfCheck: [
        "On which tab do you choose a slide layout?",
        "Where do you write what you plan to say?",
        "How do you make a PDF of your deck in PowerPoint for the web?",
      ],
      practice_task_md: `**Goal:** build the short deck you planned.

1. Create a deck in PowerPoint for the web or the app with a clear name and a simple, high contrast theme.
2. Make four to six slides using layouts, each with a title that states the point.
3. Include one small table and one picture you are allowed to use, with alt text.
4. Write notes for every slide.
5. Present it once to yourself or a friend with a timer.
6. Download a PDF copy and check it opens on a phone.

**Done looks like:** the PowerPoint file and its PDF in your track folder in OneDrive, and a note of how long the talk took.`,
      quiz: {
        questions: [
          {
            prompt: "Where do you choose a layout for a slide in PowerPoint?",
            options: ["Layout on the Home tab", "Slide Show tab, From Beginning", "File, then Info", "Review tab, under the comments and spelling tools"],
            answer_index: 0,
            explanation: "Layouts are on the Home tab and when you add a New Slide.",
          },
          {
            prompt: "Which slide title follows the lesson's advice?",
            options: ["Training", "Slide 2", "More information about the training we did", "Twelve volunteers trained in October"],
            answer_index: 3,
            explanation: "A good title states the point of the slide.",
          },
          {
            prompt: "Your paragraph does not fit on a slide. What does the lesson suggest?",
            options: [
              "Make the font smaller until it fits",
              "Move the detail to the notes or make another slide",
              "Delete the title to make room for more text",
              "Change the theme",
            ],
            answer_index: 1,
            explanation: "Keep text large; put detail in the notes or split it across slides.",
          },
          {
            prompt: "At the time of writing, where can you build a PowerPoint deck for free?",
            options: [
              "Nowhere; PowerPoint always needs a licence",
              "Only on a Windows computer with Office already installed",
              "In PowerPoint for the web with a free Microsoft account",
              "Only in Google Slides",
            ],
            answer_index: 2,
            explanation: "PowerPoint for the web is free with a Microsoft account.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "working-together": {
      outcomes: [
        "Explain when a form beats collecting information by chat or paper",
        "Write a calendar invite that answers what, when, where and how to join",
        "Run a short online meeting that respects people's data",
      ],
      explanation_md: `## Why this matters

Much of an office assistant's day is about other people: collecting information from them and getting them together at the same time. "Please send your names and phone numbers" in a WhatsApp group produces 40 messages in 40 different formats. "We meet on Thursday" without a time, a link or a room produces confusion and late arrivals. Forms, calendars and video meetings fix both. Secretaries and assistants are often hired precisely to organise this well, and adverts name Google Calendar, Meet, Outlook and Teams for that reason.

## Forms: collecting information cleanly

An online **form** is a set of questions people answer through a link, on a phone or a computer. Every answer lands in one tidy table, one row per person, ready for a spreadsheet. Offices use forms for:

* registration for a training or event;
* feedback after a workshop;
* simple surveys, such as which day suits members;
* requests, such as leave or equipment.

Good forms are short, ask only what you need and use the right **question type**: a choice list for community names so everyone spells them the same, a date question for dates, a short answer for a name. Mark the essential questions as **required**.

### Personal data in forms

Every question about a person creates personal data you must protect. Ask only what you need, say at the top why you are collecting it and who will see it, and never ask for passwords, PINs or mobile money codes. Share the responses only with the people who need them, using the sharing rules from the cloud files section.

## Calendars: one invite, every detail

A **calendar invite** is an event in your calendar that you send to guests. It lands in their email and calendar, they reply yes, no or maybe, and they get reminders. A good invite answers four questions in one place:

1. **What:** a clear title, such as "Planning meeting: Walewale youth training".
2. **When:** date, start and end time. If people are in other countries, check the time zone.
3. **Where:** a room and address, or the video meeting link, or both.
4. **Why and what to prepare:** a short agenda in the description, with links to any documents.

Calendars also help you manage your own time and your manager's: blocking time for work, seeing clashes before you accept, and setting reminders.

## Video meetings: free, but mind the limits

Free accounts can hold video meetings with Google Meet or Microsoft Teams. At the time of writing, both free versions allow group meetings of up to 100 people for up to 60 minutes each. For longer group meetings you need a paid plan, or you plan a short meeting and, if needed, start a second one. The lessons give the details for each.

Video uses far more data than email or documents, and many participants in the north join on prepaid bundles. Be considerate:

* Keep meetings short and send the agenda before.
* Ask people to turn cameras off unless needed, and to mute when not speaking.
* Share documents as links in the chat or invite instead of showing them only on screen.
* Offer an audio only option, or a written summary afterwards, for anyone who cannot join.

## Meeting manners

* Join a minute or two early and test your microphone.
* Start on time, follow the agenda and end on time.
* Use the chat for links and questions, not side conversations.
* Agree who takes notes. After the meeting, send short minutes: decisions, actions, who and by when.

## Phone or computer

Forms can be filled in on any phone. Building a form is easiest in a browser on a computer, though it works in a phone browser too. Calendars and video meetings work well in the apps, and a phone is often the best way for people to join. Sharing your screen to present works best from a computer.

## In this section

* **Google Forms** or **Microsoft Forms:** building, sharing and reading a form.
* **Google Calendar and Meet** or **Outlook calendar and Teams:** sending an invite with a meeting link and running the call within the free limits.

Choose the lessons for your suite. The skills transfer: once you can run one, you can join and use the other without trouble.`,
      workedExample_md: `**Abdul-Rahman organises a planning meeting**

Abdul-Rahman supports a farmer cooperative with members in Walewale and Nalerigu. He needs everyone's preferred meeting day and then a short online meeting.

1. Instead of asking in the WhatsApp group, he sends a two question form: name (short answer) and preferred day (multiple choice with four days). The form says the answers are used only to choose a date.
2. By evening 18 members have answered. The responses table shows Wednesday is most popular.
3. He sends a calendar invite titled "Cooperative planning meeting" for Wednesday 4pm to 4.45pm, with the video link, a three point agenda and a link to the budget document.
4. In the description he asks people to keep cameras off to save data.
5. The meeting ends at 4.45pm, inside the free limit, and he emails short minutes the same evening.`,
      keyTerms: [
        { term: "Form", definition: "A set of questions answered through a link. Answers collect in one table, one row per person." },
        { term: "Question type", definition: "The kind of answer a form question accepts, such as short answer, multiple choice or date." },
        { term: "Calendar invite", definition: "An event you send to guests, who reply and receive reminders." },
        { term: "Agenda", definition: "A short list of what a meeting will cover, shared before it starts." },
        { term: "Time zone", definition: "The local time setting of a place. Ghana uses GMT all year." },
      ],
      commonMistakes: [
        "Collecting registrations by chat so names and numbers arrive in every format",
        "Sending an invite with no link, room or end time",
        "Planning a 90 minute group call on a free account and getting cut off",
        "Expecting everyone on a bundle to keep their camera on",
      ],
      selfCheck: [
        "What four questions should a calendar invite answer?",
        "What should a form never ask for?",
        "Name two ways to make an online meeting kinder to people's data bundles.",
      ],
      practice_task_md: `**Goal:** plan the information you need and the meeting you will run.

1. Choose a realistic event, such as a training, a club meeting or a volunteer day.
2. Write four to six form questions you would ask participants, and the question type for each.
3. Write one sentence for the top of the form explaining why you collect the data and who will see it.
4. Write the title, date, time, place or link and a three point agenda for a planning meeting about the event.
5. Write two data saving tips you will include in the invite.

**Done looks like:** a short plan with form questions and types, a privacy sentence and a complete invite text. You will build both in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "Why use a form instead of asking for details in a WhatsApp group?",
            options: [
              "Forms are the only way to reach people who use a phone",
              "Every answer lands in one tidy table instead of many messages in different formats",
              "Forms do not need a link",
              "Forms delete answers after a day",
            ],
            answer_index: 1,
            explanation: "A form collects answers in one table, one row per person.",
          },
          {
            prompt: "Which of these should a form never ask for?",
            options: ["A preferred training day", "A participant's community", "A mobile money PIN", "Feedback on the workshop venue and the food served"],
            answer_index: 2,
            explanation: "Never ask for passwords, PINs or mobile money codes.",
          },
          {
            prompt: "At the time of writing, how long can a free group video meeting last on Meet or Teams?",
            options: ["Up to 60 minutes", "Up to 10 minutes", "Up to 24 hours for any number of people on any account", "There is no limit"],
            answer_index: 0,
            explanation: "The lesson says both free versions allow group meetings of up to 60 minutes.",
          },
          {
            prompt: "Which invite answers all four questions from the lesson?",
            options: [
              "Meeting on Thursday",
              "Planning meeting, please come, it is important for all of us to attend",
              "Thursday 3pm, link to follow",
              "Planning meeting, Thursday 3pm to 3.45pm, video link, agenda and budget link in the description",
            ],
            answer_index: 3,
            explanation: "A complete invite says what, when, where or how to join, and what to prepare.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "google-forms": {
      outcomes: [
        "Build a Google Form with suitable question types and required questions",
        "Share a form by link and close it when you are done",
        "Read responses and send them to Google Sheets",
        "Protect the personal data a form collects",
      ],
      explanation_md: `## Why this matters

Registration for a training, feedback after a workshop, a quick poll of members, an equipment request: Google Forms handles all of these for free, and the answers arrive in one tidy table. An assistant who can turn "please send your details" into a clean form saves hours of copying and gets better data. Forms also feed straight into Google Sheets, which you met in the last section.

## Getting started

Open forms.google.com in a browser, or in Drive choose **New**, then **Google Forms**. Start from a **blank form** or a template such as an event registration. Give the form a clear title, which respondents see, and a description: what it is for, who will see the answers and any deadline. Rename the file in Drive too.

At the time of writing there is no separate Google Forms app for building forms. You build in a browser, which works on a phone, though a computer is easier. Respondents can fill in a form on any phone or computer browser.

## Question types

Click the **+** to add a question, then choose the type that matches the answer you want:

| Answer you want | Question type |
| :--- | :--- |
| A name or phone number | Short answer |
| A longer comment | Paragraph |
| One choice from a list | Multiple choice or Dropdown |
| Several choices from a list | Checkboxes |
| A rating from 1 to 5 | Linear scale |
| A date | Date |

Using choices instead of free text keeps the data clean. If you ask "Which community?" as multiple choice with Walewale, Wungu and Janga, nobody types "Walewalle".

Turn on **Required** for the questions you must have. Leave optional the ones you only would like.

Add **sections** to split a long form into pages, so it does not look endless on a phone. You can also send people to different sections depending on an answer.

A **File upload** question exists, but it makes respondents sign in to a Google account and uploads count against your storage, so avoid it unless you need it.

## Settings worth knowing

Open the **Settings** tab:

* **Collect email addresses** if you need to contact respondents. This can require respondents to sign in or type an address.
* **Limit to 1 response** stops repeat entries but requires respondents to sign in to Google, which some people cannot or will not do. Use it only when needed.
* **Make this a quiz** turns the form into a quiz with answer keys and scores, useful for training checks.

Use the **Preview** button (an eye icon) to see the form as respondents will, and fill it in once yourself.

## Sharing the form

Choose **Send** (or **Publish** in newer versions, then share). Pick the **link** option, tick **Shorten URL**, copy it and post it in your group, email or invite. You can also email the form directly or get code to put it on a website.

Do not confuse the respondent link with sharing the form for editing. Sharing the form file in Drive gives people the power to change questions and see responses; only colleagues who manage it should have that.

## Reading responses

The **Responses** tab shows a **summary** with charts for each question, each **question** on its own, and each **individual** response. To work with the data, choose **Link to Sheets** (or **View in Sheets**). Forms creates a spreadsheet with one row per response and keeps adding to it as new answers arrive. Do your sorting and totals there, not by retyping.

When you have enough answers, turn off **Accepting responses** on the Responses tab. You can add a message, such as "Registration is closed. Contact Hawa on 020 000 0000."

## Protecting the data

* Ask only what you need, and say why at the top of the form.
* Never ask for passwords, PINs or mobile money codes.
* Keep the response sheet restricted to the people who need it.
* Delete responses you no longer need when the project ends, following your organisation's rules.`,
      workedExample_md: `**Hawa runs registration for a training**

Hawa is organising a two day digital skills training in Tamale for 30 young people.

1. She creates "Registration digital skills training Tamale Nov 2026" with a description: dates, venue, and "Your details are used only to plan the training and are seen by the organising team."
2. Questions: Full name (short answer, required), Phone number (short answer, required), Community (dropdown, required), Gender (multiple choice, optional), Has a laptop? (multiple choice, required), Anything we should know? (paragraph, optional).
3. She previews it on her phone and fixes a typo.
4. She sends the shortened link to the youth group and links the responses to a Google Sheet.
5. When 30 people have registered she turns off Accepting responses with a closing message, and shares the sheet only with her two co organisers.`,
      keyTerms: [
        { term: "Question type", definition: "The kind of answer a question accepts, such as short answer, dropdown or date." },
        { term: "Required", definition: "A setting that stops a form being submitted until the question is answered." },
        { term: "Section", definition: "A page break inside a form that splits long forms into shorter pages." },
        { term: "Link to Sheets", definition: "Sends form responses to a Google Sheet, one row per response, updated as answers arrive." },
        { term: "Accepting responses", definition: "The switch that opens or closes a form to new answers." },
      ],
      commonMistakes: [
        "Using short answer for a list of communities so the same place is spelt many ways",
        "Turning on Limit to 1 response when respondents have no Google account",
        "Sharing the form file for editing when you meant to send the respondent link",
        "Leaving the form open after the deadline",
      ],
      selfCheck: [
        "Which question type keeps community names spelt the same way?",
        "How do you send responses to a spreadsheet?",
        "What does Limit to 1 response require from respondents?",
      ],
      practice_task_md: `**Goal:** build and test the form you planned.

1. Create a Google Form with a clear title and a description that says why you collect the data and who will see it.
2. Add four to six questions using at least three different question types, with required set where needed.
3. Preview the form and fill it in yourself on a phone.
4. Send the shortened link to two or three friends and ask them to fill it in.
5. Link the responses to a Google Sheet.
6. Turn off Accepting responses and write a closing message.

**Done looks like:** a form, a linked response sheet with at least three rows, and a screenshot of the closed form message.`,
      quiz: {
        questions: [
          {
            prompt: "You want everyone to pick their community from a fixed list. Which question type fits?",
            options: ["Paragraph", "Short answer", "Linear scale", "Dropdown"],
            answer_index: 3,
            explanation: "A dropdown or multiple choice list keeps names spelt the same way.",
          },
          {
            prompt: "What does Link to Sheets do?",
            options: [
              "Creates a spreadsheet with one row per response, updated as answers arrive",
              "Shares the form with everyone in your contacts so they can edit the questions",
              "Prints the responses",
              "Deletes the form",
            ],
            answer_index: 0,
            explanation: "Linked responses go to a Google Sheet that keeps updating.",
          },
          {
            prompt: "Why might Limit to 1 response cause problems?",
            options: [
              "It removes all required questions",
              "It makes the form close after one day",
              "It requires respondents to sign in to a Google account",
              "It only works on computers",
            ],
            answer_index: 2,
            explanation: "Limiting to one response needs respondents to sign in, which some cannot or will not do.",
          },
          {
            prompt: "Registration is full. What should you do?",
            options: [
              "Delete the form and its responses straight away",
              "Turn off Accepting responses and add a closing message",
              "Make every question optional",
              "Share the response sheet publicly so people can see it is full",
            ],
            answer_index: 1,
            explanation: "Turning off Accepting responses closes the form politely without losing data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "microsoft-forms": {
      outcomes: [
        "Build a Microsoft Form with suitable question types and required questions",
        "Share a form by link or QR code and close it when you are done",
        "Read responses and open them in Excel",
        "Protect the personal data a form collects",
      ],
      explanation_md: `## Why this matters

Registration for a training, feedback after a workshop, a quick poll of members, a short quiz after an induction: Microsoft Forms handles all of these, and it is free with a Microsoft account. Answers arrive in one table that opens in Excel, which you met in the last section. An assistant who turns "please send your details" into a clean form saves hours of copying and gets better data.

## Getting started

Go to forms.office.com in a browser and sign in with your free Microsoft account. Choose **New Form** for surveys and registrations, or **New Quiz** for questions with right answers and scores. Give the form a clear title and a description: what it is for, who will see the answers and any deadline.

You build forms in a browser; a computer is easiest, but a phone browser works. Respondents can fill in a form on any phone or computer.

## Question types

Choose **Add new** (or the **+**) and pick a type:

| Answer you want | Question type |
| :--- | :--- |
| One or several choices from a list | Choice |
| A name, number or comment | Text (turn on Long answer for comments) |
| A score such as 1 to 5 stars | Rating |
| A date | Date |
| An order of preference | Ranking |
| Agreement with several statements | Likert |

A Choice question can allow one answer or **multiple answers**, and can show as a drop down list for long lists. Using choices instead of typed answers keeps the data clean: if "Which community?" is a choice with Bolgatanga, Navrongo and Zebilla, nobody types "Bolga" or "Navrongo town".

Turn on **Required** for the questions you must have. For Text questions you can add a **restriction** so only numbers are accepted, which helps with ages or amounts.

Add a **section** to break a long form into shorter pages, so it does not feel endless on a phone, and use **branching** to send people to different questions depending on an answer.

## Settings worth knowing

Open the **Settings** (from the three dot menu or the settings icon):

* **Who can fill out this form:** for public registration, choose that anyone can respond. Options that ask people to sign in suit work or school accounts more than open registration.
* **Accept responses:** switch it off to close the form, with a message such as "Registration is closed."
* **Start date and end date** where your version offers them, to open and close automatically.
* **Shuffle questions** for quizzes.

Microsoft shows a warning on forms telling respondents never to give out their password. Take the hint: never ask for passwords, PINs or mobile money codes.

Use **Preview** to see the form on a computer and a phone layout before you share it.

## Sharing the form

Choose **Collect responses** (or **Send**). Copy the **link** and post it in your group, email or invite. You can also download a **QR code**, which works well on a printed poster at a venue or market. Shorten the link if the option appears.

Sharing the form for **collaboration** is different: it lets people edit the questions and see results. Give that only to colleagues who manage the form.

## Reading responses

The **Responses** tab shows the number of responses, average completion time and a chart for each question. You can view **individual results** one by one. To work with the data, choose **Open results in Excel** (or **View results in Excel**). You get a workbook with one row per response, ready for the sorting and totals you learnt in Excel basics.

## Free plan limits

Microsoft Forms is free with a personal Microsoft account, and Microsoft gives paid personal plans a higher limit on the number of responses per form. At the time of writing, check the current limit on Microsoft's Forms help pages before using a free account for a very large survey. For a training, a club or a small office, the free version is usually enough.

## Protecting the data

* Ask only what you need, and say why at the top of the form.
* Never ask for passwords, PINs or mobile money codes.
* Keep the results workbook in OneDrive, shared only with the people who need it.
* Delete responses you no longer need when the project ends, following your organisation's rules.`,
      workedExample_md: `**Fuseini collects workshop feedback**

Fuseini helped run a one day bookkeeping workshop for market traders in Bolgatanga and needs feedback.

1. At forms.office.com he creates "Feedback bookkeeping workshop Bolgatanga Nov 2026" with the description "Your answers help us improve. No names are required."
2. Questions: Overall, how useful was the workshop? (Rating, 5 stars, required), Which session helped most? (Choice, required), What should we change? (Text, long answer, optional), Would you attend a follow up? (Choice: Yes, No, Maybe).
3. In Settings he allows anyone to respond.
4. He downloads the QR code, prints it on the last page of the handout and also posts the link in the traders' WhatsApp group.
5. After a week he turns off Accept responses and chooses Open results in Excel to count the follow up answers.`,
      keyTerms: [
        { term: "Choice question", definition: "A Microsoft Forms question with a list of options; it can allow one answer or several." },
        { term: "Required", definition: "A setting that stops the form being submitted until the question is answered." },
        { term: "Branching", definition: "Sending respondents to different questions depending on their answer." },
        { term: "QR code", definition: "A square code people scan with a phone camera to open the form link." },
        { term: "Open results in Excel", definition: "Creates an Excel workbook of the responses, one row per response." },
      ],
      commonMistakes: [
        "Using Text questions for community names so the same place is spelt many ways",
        "Sharing the form for collaboration when you meant to send the response link",
        "Leaving Accept responses on after the deadline",
        "Running a very large survey on a free account without checking the response limit",
      ],
      selfCheck: [
        "Which question type would you use for a 1 to 5 star rating?",
        "How would you share a form at a venue where people have no email?",
        "Where do you go to work with responses in Excel?",
      ],
      practice_task_md: `**Goal:** build and test the form you planned.

1. Create a Microsoft Form with a clear title and a description that says why you collect the data and who will see it.
2. Add four to six questions using at least three question types, with Required set where needed.
3. Preview the form in phone layout and fill it in yourself.
4. Send the link (or the QR code) to two or three friends and ask them to fill it in.
5. Open the results in Excel.
6. Turn off Accept responses and write a closing message.

**Done looks like:** a form, an Excel workbook of responses with at least three rows, and a screenshot of the closed form message.`,
      quiz: {
        questions: [
          {
            prompt: "Which Microsoft Forms question type fits a 1 to 5 star score?",
            options: ["Ranking", "Rating", "Date", "Text with a long answer turned on"],
            answer_index: 1,
            explanation: "Rating questions collect a score such as stars or numbers.",
          },
          {
            prompt: "How can people at a market or venue open your form without typing a link?",
            options: [
              "Scan a QR code printed on a poster or handout",
              "Reply to your email",
              "Open the form's Settings",
              "Open the results in Excel on their phones",
            ],
            answer_index: 0,
            explanation: "Collect responses offers a QR code that opens the form when scanned.",
          },
          {
            prompt: "What does Open results in Excel give you?",
            options: [
              "A copy of the questions only",
              "A PDF of the charts",
              "A shared link that lets anyone edit the form",
              "A workbook with one row per response",
            ],
            answer_index: 3,
            explanation: "The responses open as an Excel workbook ready for sorting and totals.",
          },
          {
            prompt: "What does the lesson say about response limits on a free account?",
            options: [
              "There are none; free and paid accounts are exactly the same in every way",
              "Free forms stop after ten responses",
              "Paid plans allow more responses, so check the current limit before a very large survey",
              "Responses are deleted after one day",
            ],
            answer_index: 2,
            explanation: "Microsoft gives paid personal plans a higher response limit, so check the current figure.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "google-calendar-meet": {
      outcomes: [
        "Create a Google Calendar event and invite guests",
        "Add a Google Meet link and an agenda to the invite",
        "Run a Meet call within the free limits and save data",
        "Check guests' replies and send a follow up",
      ],
      explanation_md: `## Why this matters

Adverts for secretaries and assistants ask for people who can "coordinate meetings using Google Calendar and Meet". In practice that means one clear invite that puts the meeting in everyone's calendar, reminds them and gives them a link to join. Get it right and meetings start on time with the right people. Get it wrong and you spend the morning answering "what time again?"

Google Calendar and Google Meet are free with your Google account, in a browser and in the Calendar and Meet apps.

## Creating an event

In Google Calendar choose **Create** (or tap **+** in the app, then **Event**). Fill in:

* **Title:** clear and specific, such as "Planning meeting: Navrongo health outreach".
* **Date and time:** start and end. Leaving an end time makes it easier for people to plan. If guests are abroad, check the **time zone**; Ghana uses GMT all year, so a colleague in another country may see a different hour.
* **Repeat:** for regular meetings, set it to repeat weekly or monthly instead of creating each one.
* **Location:** a room and address if people meet in person.
* **Description:** a short agenda and links to documents. Share those documents with the guests too.
* **Notification:** a reminder, such as 30 minutes before.

## Inviting guests and adding Meet

Under **Add guests**, type each person's email address. On a computer, **Find a time** can show when guests who share their calendars are free.

Choose **Add Google Meet video conferencing**. A meeting link and dial in details where available appear in the event. When you save, Calendar asks whether to **send invitation emails** to guests; choose to send.

Guests reply **Yes**, **No** or **Maybe** from the email or their calendar, and you can see the replies in the event. Guests without Google accounts can still reply from the email and join with the link.

## Starting and joining a meeting

* From the event, choose **Join with Google Meet**.
* For a quick call, open meet.google.com or the Meet app and choose **New meeting**: you can start an instant meeting or **create a meeting for later** and share the link.
* Guests join by clicking the link in a browser or the app. On a computer, Meet works in the browser with nothing to install.

## Free limits

At the time of writing, Google says a free account can hold meetings with up to 100 participants for up to 60 minutes each, and one to one calls are not limited in the same way. A few minutes before the limit, Meet warns you. Plan group meetings to fit, or agree to start a second meeting if you must continue. Recording and some other features belong to paid plans, so do not promise a recording on a free account.

## Running a good call

As the host:

* Join a few minutes early and check your microphone and camera.
* Start on time with the agenda, and keep to it.
* Ask people to **mute** when not speaking and to turn the **camera off** to save data unless faces are needed.
* Use **chat** for links and written questions.
* Use **present now** (share screen) to show a document, but also put its link in the chat so people on small screens can open it.
* Turn on **captions** if they help people follow.
* Agree who is taking notes.

## After the meeting

Send short minutes by email within a day: decisions, action points, who and by when. Attach or link the notes in the calendar event's description so they are easy to find later. If the meeting repeats, check the next invite is still correct.

## Phone or computer

Creating events and joining calls works well in the Calendar and Meet apps. **Find a time**, some settings and sharing your screen with presenter tools are easier on a computer. Joining by phone is often best for people on the move; audio only uses much less data than video.

## Your manager's calendar

Assistants often manage someone else's calendar. If your manager shares their calendar with you, you can see and sometimes create events for them. Always confirm before accepting meetings on their behalf, and keep private appointments private.`,
      workedExample_md: `**Wumpini sets up a planning call**

Wumpini assists the coordinator of a health outreach project with staff in Navrongo and Tamale.

1. In Google Calendar she creates "Planning meeting: Navrongo outreach" on Tuesday from 10am to 10.45am.
2. She adds five guests by email and chooses **Add Google Meet video conferencing**.
3. In the description she writes a three point agenda, links the outreach budget (shared with the guests) and adds: "Please keep cameras off to save data."
4. She sets a 30 minute reminder, saves and sends the invitation emails.
5. On Monday she checks replies: four Yes, one Maybe. She sends a short reminder to the Maybe.
6. The call ends at 10.45am, well inside the 60 minute free limit. That afternoon she emails minutes with three action points.`,
      keyTerms: [
        { term: "Event", definition: "An item in Google Calendar with a title, time, guests and details." },
        { term: "Guest", definition: "A person invited to an event, who can reply Yes, No or Maybe." },
        { term: "Meet link", definition: "The web address that lets guests join the Google Meet video call." },
        { term: "Find a time", definition: "A Calendar view on a computer that shows when guests are free, if they share their calendars." },
        { term: "Captions", definition: "Live text of what people say in the meeting, shown on screen." },
      ],
      commonMistakes: [
        "Saving the event without sending invitation emails, so guests never see it",
        "Planning a group call longer than the free limit",
        "Showing a document only by screen share instead of also sharing its link",
        "Accepting meetings for your manager without checking first",
      ],
      selfCheck: [
        "Where in the event do you put the agenda?",
        "What is the free group meeting limit in Meet, at the time of writing?",
        "How can people on small bundles join with less data?",
      ],
      practice_task_md: `**Goal:** send a complete invite and run a short Meet call.

1. Create a Google Calendar event for the planning meeting you wrote in the section lesson, with a clear title, start and end time and a reminder.
2. Add at least two guests (friends, a mentor or your second email address).
3. Add Google Meet video conferencing and write a three point agenda with one document link in the description.
4. Save and send the invitations. Check the replies.
5. Hold a call of 15 minutes or less: start on time, share a link in the chat, and ask people to mute when not speaking.
6. Send short minutes by email afterwards.

**Done looks like:** a screenshot of the event showing guests, the Meet link and the agenda, and the minutes email.`,
      quiz: {
        questions: [
          {
            prompt: "At the time of writing, what does Google say a free account allows for group meetings?",
            options: [
              "Up to 10 people for up to 30 minutes",
              "Unlimited people for any length of time, as long as the host has a Gmail address",
              "Up to 100 people for up to 60 minutes per meeting",
              "Group meetings need a paid plan",
            ],
            answer_index: 2,
            explanation: "Google's page lists up to 100 participants and 60 minutes per meeting for free accounts.",
          },
          {
            prompt: "Where should the agenda and document links go?",
            options: ["In the event description", "In the event title", "In the guest list", "In a separate WhatsApp message only, sent the night before"],
            answer_index: 0,
            explanation: "The description keeps the agenda and links with the invite.",
          },
          {
            prompt: "You saved an event with guests. What must you also do so they see it?",
            options: [
              "Print it",
              "Turn on captions before the meeting starts so they can follow",
              "Change the time zone",
              "Send the invitation emails",
            ],
            answer_index: 3,
            explanation: "Calendar asks whether to send invitations; guests only get the invite if you send it.",
          },
          {
            prompt: "Which tip from the lesson helps participants on small data bundles?",
            options: [
              "Ask everyone to keep their camera on",
              "Ask people to turn cameras off and mute when not speaking",
              "Make the meeting longer so nobody has to rejoin",
              "Share documents only by screen share",
            ],
            answer_index: 1,
            explanation: "Cameras off and muting save data; sharing links lets people open documents themselves.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "outlook-calendar-teams": {
      outcomes: [
        "Create an Outlook calendar event and invite attendees",
        "Add a Teams meeting link and an agenda to the invite",
        "Run a Teams call within the free limits and save data",
        "Check replies and send a follow up",
      ],
      explanation_md: `## Why this matters

Office administrator and executive assistant adverts in Ghana often mention managing calendars and appointments in Outlook. Many organisations that run on Microsoft 365 hold their meetings in Teams. One clear invite that puts the meeting in everyone's calendar, reminds them and gives them a link saves you a morning of "what time again?" messages.

With a free Microsoft account you get the Outlook.com calendar and Microsoft Teams (free), in a browser and in the Outlook and Teams apps.

## Creating an event in Outlook

Open the **Calendar** in Outlook on the web (the calendar icon on the left) or in the Outlook app, and choose **New event** (or **+**). Fill in:

* **Title:** clear and specific, such as "Planning meeting: Bolgatanga literacy project".
* **Start and end time.** If attendees are abroad, check the **time zone**; Ghana uses GMT all year, so their clocks may show a different hour.
* **Repeat:** for regular meetings, set it to repeat weekly or monthly.
* **Location:** a room and address if people meet in person.
* **Description:** a short agenda and links to documents in OneDrive, shared with the attendees.
* **Reminder:** such as 30 minutes before.

Under **Invite attendees**, type each person's email address. When you choose **Send**, they get the invite by email and can reply **Yes** (accept), **Maybe** (tentative) or **No** (decline). You see the replies in the event.

## Adding a Teams meeting

There are two common ways, depending on what your version shows:

1. **From Outlook:** if the new event shows a **Teams meeting** switch, turn it on. A join link is added to the invite.
2. **From Teams:** open Teams, go to the meeting or calendar area and schedule a meeting, or choose to meet now and copy the meeting link. Paste the link into the Outlook event's location or description, then send the invite.

Either way, attendees join by clicking the link. They can join in a browser without installing anything, or in the Teams app on a phone or computer. People without a Microsoft account can usually join as guests by typing their name.

## Free limits

At the time of writing, Microsoft's page for Teams (free) lists group meetings of up to 60 minutes with up to 100 participants, and one to one calls of up to 30 hours. Plan group meetings to fit, or agree to start a second meeting if you must go on. Paid plans allow longer group meetings and more features, so do not promise a recording or a long workshop on a free account.

## Running a good call

As the organiser:

* Join a few minutes early and check your microphone and camera.
* Start on time with the agenda and keep to it.
* Ask people to **mute** when not speaking and to turn the **camera off** to save data unless faces are needed.
* Use the meeting **chat** for links and written questions.
* Use **Share** to show a document, and also put its link in the chat so people on small screens can open it.
* Turn on **live captions** if they help people follow, where your version offers them.
* Agree who is taking notes.

## After the meeting

Send short minutes by email within a day: decisions, action points, who and by when. Add the notes link to the Outlook event so it is easy to find later. The meeting chat in Teams also stays available to the people who were in it.

## Managing time

The Outlook calendar is also a planning tool. Block time for focused work, colour code events with **categories** (such as green for training, blue for finance), and check for clashes before you accept. If you manage a manager's calendar and they share it with you, confirm before accepting meetings on their behalf and keep private appointments private.

## Phone or computer

Creating events and joining calls works well in the Outlook and Teams apps. Sharing your screen and handling many attendees is easier on a computer. Joining by phone is often best for people on the move; audio only uses much less data than video.

## Joining a Google Meet

You will sometimes be invited to a Google Meet by a partner. You do not need a Google account to join: click the link, type your name and ask to join. The meeting skills are the same.`,
      workedExample_md: `**Amina sets up a partners' call**

Amina is an administrative assistant for a literacy project in Bolgatanga. Her manager wants a call with three partner schools.

1. In Outlook on the web she creates "Partners call: term 2 reading plan" on Thursday from 2pm to 2.45pm, repeating monthly.
2. She invites the three headteachers and her manager by email.
3. Her event form shows a **Teams meeting** switch, so she turns it on and the join link appears. (If it had not, she would create the meeting in Teams and paste the link.)
4. In the description she writes a three point agenda, links the reading plan in OneDrive (shared with the attendees) and asks people to keep cameras off to save data.
5. She sends the invite, sees three accepts and one tentative, and follows up with the tentative headteacher by phone.
6. The call ends at 2.45pm, inside the 60 minute limit, and she emails minutes that evening.`,
      keyTerms: [
        { term: "Event", definition: "An item in the Outlook calendar with a title, time, attendees and details." },
        { term: "Attendee", definition: "A person invited to an event, who can accept, reply tentative or decline." },
        { term: "Teams meeting link", definition: "The web address that lets attendees join the Teams call in a browser or the app." },
        { term: "Tentative", definition: "A reply meaning maybe: the person might attend." },
        { term: "Category", definition: "A coloured label in Outlook used to group calendar events and emails." },
      ],
      commonMistakes: [
        "Creating a Teams meeting but forgetting to put its link in the invite",
        "Planning a group call longer than the free 60 minute limit",
        "Showing a document only by screen share instead of also sharing its link",
        "Accepting meetings for your manager without checking first",
      ],
      selfCheck: [
        "What are the two ways to add a Teams link to an Outlook invite?",
        "What are the free Teams limits for group meetings, at the time of writing?",
        "What should your minutes contain?",
      ],
      practice_task_md: `**Goal:** send a complete invite and run a short Teams call.

1. Create an Outlook calendar event for the planning meeting you wrote in the section lesson, with a clear title, start and end time and a reminder.
2. Invite at least two attendees (friends, a mentor or your second email address).
3. Add a Teams meeting link, from the switch in Outlook or by creating the meeting in Teams and pasting the link.
4. Write a three point agenda with one OneDrive document link in the description, then send it. Check the replies.
5. Hold a call of 15 minutes or less: start on time, share a link in the chat, and ask people to mute when not speaking.
6. Send short minutes by email afterwards.

**Done looks like:** a screenshot of the event showing attendees, the Teams link and the agenda, and the minutes email.`,
      quiz: {
        questions: [
          {
            prompt: "At the time of writing, what does Microsoft list for group meetings in Teams (free)?",
            options: [
              "Up to 60 minutes with up to 100 participants",
              "Up to 24 hours with any number of people",
              "Up to 10 minutes with 5 people",
              "Group meetings need a paid plan in every case, even short ones with two colleagues",
            ],
            answer_index: 0,
            explanation: "Microsoft's Teams (free) page lists 60 minute group meetings for up to 100 participants.",
          },
          {
            prompt: "Your Outlook event has no Teams meeting switch. What can you do?",
            options: [
              "Cancel the meeting",
              "Ask everyone to install Google Meet",
              "Send the meeting time by text message only, with no link at all",
              "Create the meeting in Teams and paste its link into the invite",
            ],
            answer_index: 3,
            explanation: "The lesson gives two routes; creating it in Teams and pasting the link always works.",
          },
          {
            prompt: "What does a Tentative reply mean?",
            options: ["The person will attend", "The person might attend", "The person has declined", "The person wants to reschedule the meeting to another day"],
            answer_index: 1,
            explanation: "Tentative means maybe.",
          },
          {
            prompt: "Why put a document link in the chat as well as sharing your screen?",
            options: [
              "Screen sharing does not work on computers",
              "Links make the call longer",
              "People on small screens can open the document themselves",
              "Teams deletes shared screens",
            ],
            answer_index: 2,
            explanation: "A link lets everyone read the document on their own device, which helps on phones.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "office-practical": {
      outcomes: [
        "Plan an office task that uses several tools together",
        "Keep files, names and numbers consistent across tools",
        "Check finished work before you share it",
      ],
      explanation_md: `## Why this matters

In a real office nobody asks you to "use Google Docs" or "make a Teams meeting" on its own. They say: "We are running a training for 25 youth leaders in Walewale next month. Can you organise it?" That one sentence needs a form, a spreadsheet, a letter, a short deck, a shared folder and a calendar invite, all telling the same story. This section is where the separate skills become one way of working.

Employers hiring office assistants and administrators want to see that you can carry a task from start to finish without being reminded at every step. A finished, tidy project is also the strongest thing you can show in an interview or put in a portfolio.

## How the tools connect

Think of the workflow as a chain:

1. **Plan** in a document: purpose, dates, who, budget, tasks.
2. **Collect** information with a form, which feeds a spreadsheet.
3. **Organise** the data in the spreadsheet: count participants, check balance by community, total the costs.
4. **Communicate** with documents and email: letters to venues or partners, a confirmation email to participants.
5. **Present** with a short deck: the plan or the results, for a manager or a board.
6. **Meet** using calendar invites and video calls to coordinate with the team.
7. **Store and share** everything in one well named cloud folder with the right access.

Each link uses what you learnt earlier. The skill now is keeping them consistent.

## Consistency is the professional touch

When different pieces of work disagree, people lose trust. Common problems:

* The letter says 25 participants, the spreadsheet counts 23 and the deck shows 30.
* The invite says Thursday 14th, but the 14th is a Friday.
* The form lists "Walewale" and the deck says "Walawale".
* The budget in the deck is from an old version of the spreadsheet.

Avoid this by keeping **one source of truth** for each fact. The participant numbers come from the spreadsheet. The dates come from the calendar. Copy from the source rather than retyping, and check again just before you send anything.

## Planning the work

Before you start, write a short plan:

* **The goal** in one sentence.
* **The deliverables:** each file or message you will produce.
* **The order:** some things must happen first. You cannot confirm the venue before you know the numbers, and you cannot send joining instructions before you have the venue.
* **Deadlines:** working back from the event date.
* **Who sees what:** which files contain personal data and must stay restricted, and which can be shared openly.

A simple table with Task, Tool, Due date and Done works well, and it can live in your spreadsheet.

## Checking before you share

Before anything leaves your hands, run a quick check:

* Names, dates, times and amounts match the source.
* File names follow the pattern.
* Sharing settings are right: personal data restricted, public material view only.
* Documents have no leftover comments or suggestions.
* PDFs open and look right on a phone.
* Invites have a link, an end time and an agenda.

This is the habit that makes managers trust you with bigger tasks.

## Free tools are enough

Everything in the practical works on a free Google account or a free Microsoft account. If you use a phone most of the time, you can do almost all of it in the apps and a mobile browser. A short session on a computer helps with the final layout checks and with building the form, but is not essential.

## Mixing suites

Real projects sometimes mix suites: your office uses Microsoft, a partner sends a Google Form, a donor wants a PDF. That is normal. Because you learnt the ideas and not just the buttons, you can move files across (download as .docx, .xlsx or .pptx, or upload to the other suite) and check that nothing broke.

## In this section

* **Practical: a workshop from start to finish:** one realistic project using every tool in this track.
* **Next steps:** where to go from here and how to describe your skills honestly.`,
      workedExample_md: `**Issahaku's task plan**

Issahaku is asked to organise a one day budgeting workshop for 20 women's group leaders in Nalerigu in four weeks. He writes this plan in a spreadsheet tab called "Tasks":

| Task | Tool | Due |
| :--- | :--- | :--- |
| Registration form | Forms | Week 1 |
| Participant list and counts | Sheets or Excel | Week 2 |
| Venue request letter (PDF) | Docs or Word | Week 2 |
| Team planning call | Calendar with Meet or Teams | Week 2 |
| Welcome deck | Slides or PowerPoint | Week 3 |
| Shared folder and access check | Drive or OneDrive | Week 3 |
| Confirmation email to participants | Gmail or Outlook | Week 4 |

The participant count in the letter, the deck and the email all come from one cell in the spreadsheet, so they always agree.`,
      keyTerms: [
        { term: "Workflow", definition: "The order in which tasks and tools are used to get a piece of work done." },
        { term: "Deliverable", definition: "A finished piece of work you hand over, such as a letter, a list or a deck." },
        { term: "Source of truth", definition: "The one place a fact is kept, which every other document copies from." },
        { term: "Portfolio", definition: "A collection of your work you can show an employer as evidence of your skills." },
      ],
      commonMistakes: [
        "Retyping numbers in each document so they drift apart",
        "Sending joining instructions before the venue is confirmed",
        "Forgetting to check sharing settings on files with personal data",
        "Skipping the final check because each part looked fine on its own",
      ],
      selfCheck: [
        "Which tool is the source of truth for participant numbers in your project?",
        "What must be confirmed before you can send joining instructions?",
        "Name four things you check before sharing anything.",
      ],
      practice_task_md: `**Goal:** plan the final practical before you build it.

1. Read the next lesson's brief, or choose a similar event of your own (a training, a club launch, a volunteer day).
2. Write the goal in one sentence.
3. Make a task table with Task, Tool, Due date and Done, covering at least six deliverables.
4. Mark which deliverables contain personal data and who may see them.
5. Decide which file is the source of truth for numbers and which for dates.

**Done looks like:** a task table and two notes about personal data and sources of truth, saved in your track folder.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson mean by a source of truth?",
            options: [
              "The most senior person in the office",
              "The one place a fact is kept, which other documents copy from",
              "A locked document that nobody in the office is allowed to edit at all",
              "The first draft of a report",
            ],
            answer_index: 1,
            explanation: "Keeping each fact in one place and copying from it keeps all documents consistent.",
          },
          {
            prompt: "Why can't you send joining instructions first?",
            options: [
              "Email only works after a deck is made",
              "Forms must be closed before any email is sent",
              "You need the venue confirmed before you can tell people where to go",
              "Calendar invites cannot be sent in the same week as a registration form is open",
            ],
            answer_index: 2,
            explanation: "Some tasks depend on others; the venue must be confirmed before joining instructions.",
          },
          {
            prompt: "The letter says 25 participants and the spreadsheet counts 23. What is the best fix?",
            options: [
              "Copy the count from the spreadsheet into the letter",
              "Change the spreadsheet to say 25 so both documents match",
              "Leave both; small differences do not matter",
              "Remove the number from the letter",
            ],
            answer_index: 0,
            explanation: "The spreadsheet is the source of truth for counts, so the letter should copy from it.",
          },
          {
            prompt: "Which is part of the lesson's check before sharing?",
            options: [
              "Make every file editable by anyone with the link so nobody has to ask for access",
              "Leave comments in so readers see the discussion",
              "Send the editable files instead of PDFs",
              "Check that personal data is restricted and public material is view only",
            ],
            answer_index: 3,
            explanation: "Checking sharing settings protects personal data before anything is sent.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "office-task-project": {
      outcomes: [
        "Organise a small event from start to finish with office tools",
        "Produce a consistent set of documents, data and slides",
        "Share a finished project folder safely",
        "Present your work as a portfolio piece",
      ],
      explanation_md: `## Why this matters

This is the task that turns a list of skills into evidence. When an employer asks "Can you use Microsoft Office?" or "Do you know Google Workspace?", saying yes is easy. Opening a tidy folder and showing a form, a participant list, a letter, a deck and a meeting invite that all fit together is much more convincing. It shows you can carry a real office task from start to finish, which is what admin, secretary and assistant roles need.

Do the whole project in the suite you chose. If you know both, you may mix them as a real office might, but keep everything in one cloud folder.

## The brief

You are the administrative assistant for **Northern Youth Skills**, a small invented NGO in Tamale. Your manager, Madam Hawa, asks you to organise a one day **"Office tools for beginners" workshop** for 20 young people from Tamale, Savelugu and Walewale, on a Saturday four weeks from now, at a community centre in Tamale. Lunch will be provided. She wants:

1. A **registration form** that collects name, phone number, community, gender (optional), whether they have a laptop, and any needs (such as a disability or a dietary need).
2. A **participant list** in a spreadsheet, with counts by community and a total.
3. A **letter** to the community centre manager, Mr Sumaila, requesting the hall, as a PDF.
4. A short **planning meeting** with the two facilitators, Fuseini and Mariama, with an invite, a video link and an agenda.
5. A **welcome deck** of five or six slides for the morning of the workshop.
6. A **confirmation email** to participants with the date, time, venue and what to bring.
7. One **shared folder** that holds everything, with the right access for each file.

Use invented names and numbers throughout. Never use real people's phone numbers.

## How to approach it

Work in this order, because each step feeds the next:

1. **Folder first.** Create "Workshop office tools Tamale 2026" in Drive or OneDrive, with folders for Registration, Letters, Slides and Meeting notes.
2. **Form.** Build it with the right question types, a privacy sentence and required questions. Fill it in yourself with 12 to 20 invented participants, or ask friends to use invented details.
3. **Spreadsheet.** Link or open the responses in Sheets or Excel. Freeze the header, add a count for each community and a total. This is the **source of truth** for numbers.
4. **Letter.** Write it in Docs or Word with proper headings or letter layout, A4, the expected number of participants copied from the spreadsheet, and a clear request with a deadline. Export a PDF.
5. **Planning meeting.** Send a calendar invite to two practice guests with a Meet or Teams link, a 30 to 45 minute slot, an agenda and a link to the participant list (restricted to them).
6. **Deck.** Five or six slides using layouts: welcome, the day's programme, house rules, what you will learn, contacts. Speaker notes on each. Export a PDF.
7. **Confirmation email.** Write one email to participants using **Bcc**, with a clear subject, the details and the deck PDF or a view only link.
8. **Final check and sharing.** Run the checklist below, then set access: the participant list restricted to the team, the deck and programme view only, the letter as a PDF only to the venue.

## The final checklist

* Every file has a clear name with the date written year, month, day.
* The participant number is the same in the spreadsheet, the letter, the deck and the email.
* The date, time and venue are the same everywhere, and the date falls on a Saturday.
* No file containing phone numbers is shared with "anyone with the link".
* No leftover comments or suggestions in documents.
* PDFs open correctly on a phone.
* The invite has a link, an end time and an agenda, and fits inside the free meeting limit.
* The email uses Bcc for participants and mentions the attachment or link it includes.

## Presenting it

Write a short **README** document at the top of the folder: what the project is, what each file is, which tools you used, and one thing you would do differently. This page is what a mentor or employer reads first. Keep it to half a page.

If you share the folder for review, give **view** access to a copy that uses only invented data. Your real portfolio should never contain anyone's actual personal details.

## Time and data

Most of it works on a phone, using the apps and a mobile browser; building the form and checking layouts is quicker on a computer if you can get one for an hour.

## What reviewers look for

A mentor reviewing this project will ask: Can I find things? Do the numbers agree? Is personal data protected? Would I be happy to send this letter and show this deck? If the answer to each is yes, you have shown the core office skills employers ask for.`,
      workedExample_md: `**Wumpini's README**

**Workshop office tools Tamale 2026: README**

Practice project for the SydCrest Office tools track. All names and numbers are invented.

* **Registration:** Google Form "Registration office tools workshop" (6 questions) and its linked sheet, 18 participants: Tamale 8, Savelugu 6, Walewale 4.
* **Letters:** "Hall request Tamale community centre 2026 12 01.pdf", sent to the venue manager.
* **Meeting notes:** invite for the facilitators' planning call (40 minutes, Google Meet) and the minutes.
* **Slides:** "Welcome deck office tools workshop" (6 slides) and its PDF.
* **Email:** confirmation sent to participants with Bcc.

Sharing: the participant sheet is restricted to the two facilitators; the deck PDF is view only by link.

Next time: I would build the form before choosing the date, so I could ask people which Saturday suits them.`,
      keyTerms: [
        { term: "Brief", definition: "The description of a task you are given: what is needed, by when and for whom." },
        { term: "README", definition: "A short guide at the top of a folder explaining what each file is." },
        { term: "Source of truth", definition: "The one file a fact comes from, such as the spreadsheet for participant numbers." },
        { term: "Invented data", definition: "Made up names and numbers used for practice, so no real person's details are exposed." },
      ],
      commonMistakes: [
        "Building the deck before the participant numbers are final",
        "Using real friends' phone numbers in a portfolio project",
        "Sharing the whole project folder with anyone with the link",
        "Skipping the README, so reviewers cannot find their way around",
      ],
      selfCheck: [
        "Does the participant number match in all four places it appears?",
        "Which files in your folder contain personal data, and who can open them?",
        "What would you do differently next time?",
      ],
      practice_task_md: `**Goal:** complete the workshop project in the brief, end to end, in your chosen suite.

1. Create the project folder and its four inner folders.
2. Build the registration form and enter 12 to 20 invented responses.
3. Build the participant spreadsheet with a frozen header, community counts and a total.
4. Write the venue letter and export it as a PDF.
5. Send the planning meeting invite with a video link and agenda to two practice guests.
6. Build the five or six slide welcome deck with speaker notes and export a PDF.
7. Send the confirmation email to two or more test addresses using Bcc.
8. Run the final checklist, fix what it finds and set sharing for each file.
9. Write the README.

**Done looks like:** one folder containing the form (or its link), the spreadsheet, the letter PDF, the invite screenshot, the deck and its PDF, the email screenshot and a README. Share a view only copy with a mentor and ask them to check it against the final checklist.`,
      quiz: {
        questions: [
          {
            prompt: "In the brief, which file is the source of truth for the number of participants?",
            options: ["The welcome deck", "The venue letter", "The participant spreadsheet", "The confirmation email sent to everyone who registered"],
            answer_index: 2,
            explanation: "The spreadsheet built from form responses holds the count; other files copy from it.",
          },
          {
            prompt: "How should the confirmation email reach the 20 participants?",
            options: [
              "With all addresses in To so they can reply to each other",
              "With the addresses in Bcc",
              "As a public post with the participant list attached",
              "Through the planning meeting invite for the facilitators",
            ],
            answer_index: 1,
            explanation: "Bcc protects participants' addresses from each other.",
          },
          {
            prompt: "Which sharing choice fits the participant spreadsheet?",
            options: [
              "Restricted to the team who need it",
              "Anyone with the link, edit",
              "Anyone with the link, view",
              "Posted in the participants' group so everyone can check their details and correct them",
            ],
            answer_index: 0,
            explanation: "It contains phone numbers, so only the team should be able to open it.",
          },
          {
            prompt: "What is the README for?",
            options: [
              "Storing the participants' phone numbers",
              "Replacing the venue letter",
              "Recording the meeting",
              "Explaining what each file is so a reviewer can find their way around",
            ],
            answer_index: 3,
            explanation: "The README is the first page a mentor or employer reads.",
          },
          {
            prompt: "Why must the portfolio version use invented data?",
            options: [
              "Real data makes files too large",
              "Invented data looks more professional than real data to employers reviewing it",
              "So no real person's personal details are exposed when you share it",
              "Free accounts cannot store real names",
            ],
            answer_index: 2,
            explanation: "A portfolio is shared widely, so it must never contain real people's details.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "next-steps": {
      outcomes: [
        "Choose a next track that builds on office tools",
        "Describe your office software skills honestly on a CV",
        "Prepare to show your skills in an interview or a practical test",
      ],
      explanation_md: `## Why this matters

You can now handle the everyday software that keeps an office running: professional email, cloud files and safe sharing, structured documents with reviews, basic spreadsheets, short decks, forms, calendars and video meetings. That is a real foundation, and it is exactly what admin, office assistant and secretary adverts ask for. The question now is where to take it, and how to show it.

## Where to go next

Three directions build naturally on this track:

**Excel and Power BI.** If you enjoyed the spreadsheet lessons, or the adverts you want mention "advanced Excel", "reports" or "dashboards", this is the next step. It starts where Excel basics stopped: tidy tables, everyday functions, XLOOKUP, PivotTables, charts and then Power BI dashboards. Many accounts, MIS and monitoring and evaluation roles ask for these skills. Most of it works on a phone or computer; Power BI Desktop needs a Windows computer.

**Virtual assistant and remote work.** If you liked organising inboxes, calendars and the workshop project, this track turns those skills into a service. It covers managing a client's email and diary, documents and spreadsheets for clients, online research, communication across time zones, getting paid safely and avoiding scams. It suits people who want remote or freelance work.

**Going deeper in your suite.** Whichever track you choose, keep improving in the suite you use. Try the other suite too: because the ideas carry over, the lessons you skipped in this track will now take far less time, and saying "I use both Google Workspace and Microsoft 365" widens the jobs you can apply for.

## Describing your skills honestly

Employers often test office skills, so describe them accurately. On a CV, list the tools and what you can do with them:

* **Microsoft 365 (Outlook, Word, Excel, PowerPoint, OneDrive, Teams, Forms):** professional email and calendar management, formatted reports and letters with styles and tracked changes, basic spreadsheets with formulas and filters, short presentations.
* **Google Workspace (Gmail, Drive, Docs, Sheets, Slides, Forms, Calendar, Meet):** the same, in Google's tools.

Avoid words like "expert" or "advanced" unless you can prove them. "Working knowledge" or "confident with" is honest for where you are now. Add the workshop project as evidence, for example: "Organised a practice workshop end to end: online registration, participant tracking, venue letter, planning meeting and welcome presentation."

Some people take a paid certification later, such as the Microsoft Office Specialist exams. They are optional. Your portfolio and how you perform in a test matter more for most entry jobs.

## Preparing for a practical test

Some employers ask candidates to do a short task on a computer during the interview: type and format a letter, build a small table, total a column or send an email. To prepare:

* Practise on a computer with a keyboard if you mostly use a phone. Speed and comfort with a keyboard and mouse matter in a timed test. The typing lessons in the Digital Skills Bridge help.
* Practise without the lessons open: a letter in 15 minutes, a list with totals in 10.
* Know where the basics are in both suites, in case the office uses the one you learnt second.
* Read the task twice, do exactly what it asks and check before you say you are done.

## Showing your portfolio

Keep your project folder tidy, with the README at the top and only invented data inside. Share a view only link in applications where it is welcome, or show it on your phone in an interview. Be ready to explain one decision, such as why you used Bcc or restricted the participant list. Explaining your reasons shows judgement, which employers value as much as button knowledge.

## Keeping up

Both suites change their menus and features often. When something moves, search the official help pages for Google or Microsoft rather than guessing, and check the current free limits before you promise anything to a manager. Learning to look things up calmly is one of the most useful office skills of all.`,
      workedExample_md: `**Abdul-Rahman updates his CV**

Abdul-Rahman finished this track using Microsoft 365, then did the Google lessons for email and documents too. He is applying for an administrative assistant role in Tamale.

His old CV said: "Computer skills: Microsoft Office (expert)."

His new CV says:

**Office software**
* Microsoft 365: Outlook (folders, rules, calendar), Word (styles, tables, tracked changes, PDF), Excel (tidy lists, SUM and COUNTA, filters), PowerPoint, Teams, Forms
* Google Workspace: Gmail, Drive, Docs (suggesting mode)
* Portfolio: practice workshop organised end to end, link available on request

In the interview he is asked to format a one page memo. He uses heading styles, sets A4 and exports a PDF in ten minutes. Then he starts the Excel and Power BI track to strengthen his spreadsheet skills.`,
      keyTerms: [
        { term: "Excel and Power BI track", definition: "The SydCrest track that goes deeper into spreadsheets, reports and dashboards." },
        { term: "Virtual assistant track", definition: "The SydCrest track that turns office and organising skills into a remote or freelance service." },
        { term: "Working knowledge", definition: "An honest way to describe skills you can use confidently for everyday tasks." },
        { term: "Practical test", definition: "A short task some employers set during an interview to check your office skills." },
      ],
      commonMistakes: [
        "Calling yourself an expert on a CV before you can prove it",
        "Practising only on a phone when the job test will be on a computer",
        "Sharing a portfolio that contains real people's details",
        "Stopping learning once the track is finished",
      ],
      selfCheck: [
        "Which next track fits the adverts you want to apply for, and why?",
        "How will you describe your office skills on your CV?",
        "Could you format a one page letter and export a PDF in 15 minutes without help?",
      ],
      practice_task_md: `**Goal:** turn this track into a next step and an honest CV entry.

1. Read three adverts for roles you want and note whether they lean towards spreadsheets and reports or towards organising and client support.
2. Choose your next track (Excel and Power BI, or Virtual assistant and remote work) and write two sentences on why.
3. Write an "Office software" section for your CV in the style of the worked example, using honest words.
4. Time yourself formatting a one page letter or memo and exporting it as a PDF. Note the time.
5. Add a README link or a description of your workshop project to your CV notes.

**Done looks like:** your chosen next track with reasons, a CV section, and your timed practice result. Share them with a mentor for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "The adverts you like ask for advanced Excel, reports and dashboards. Which next track fits best?",
            options: ["Virtual assistant and remote work", "Excel and Power BI", "Repeating this track from the beginning", "None; office tools are enough for any role"],
            answer_index: 1,
            explanation: "The Excel and Power BI track goes on to lookups, PivotTables and dashboards.",
          },
          {
            prompt: "Which CV wording does the lesson recommend for where you are now?",
            options: [
              "Expert in all Microsoft and Google software",
              "Advanced user of every office program",
              "Microsoft Office (expert)",
              "Working knowledge of Word, Outlook and Excel, with examples of what you can do",
            ],
            answer_index: 3,
            explanation: "Honest words plus specific examples are more convincing and safer when employers test you.",
          },
          {
            prompt: "Some employers set a practical test. What does the lesson suggest if you mostly use a phone?",
            options: [
              "Practise on a computer with a keyboard before the test",
              "Ask to take the test on your phone",
              "Avoid applying",
              "Memorise menu names only",
            ],
            answer_index: 0,
            explanation: "Comfort with a keyboard and mouse matters in a timed test on a computer.",
          },
          {
            prompt: "A menu has moved since you learnt it. What does the lesson advise?",
            options: [
              "Guess which button it might be",
              "Switch to the other suite permanently",
              "Search the official Google or Microsoft help pages",
              "Tell your manager the feature no longer exists in either suite",
            ],
            answer_index: 2,
            explanation: "Menus change often, so look it up on the official help pages.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
