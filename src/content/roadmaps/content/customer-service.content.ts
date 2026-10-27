import type { TrackContent } from "./types";

/**
 * Original lesson content for the Digital Customer Service roadmap (issue #198,
 * process from issue #84). Research and sources: src/content/research/customer-service.md.
 * Every scenario, script and name is invented for teaching. Tools and companies are named
 * only as examples; mobile money is described without naming any provider.
 */
const content: TrackContent = {
  roadmap: "customer-service",
  nodes: {
    "service-foundations": {
      explanation_md: `Every business that has customers also has customers with questions. A woman in Wa wants to know why her parcel has not arrived. A trader in Tamale sent money from his wallet and it has not reached his supplier. A student in Bolgatanga cannot log in to an app she paid for. Somebody has to answer them, kindly and correctly. That somebody is a customer service agent, and this track teaches you to be a good one.

## Why this is a real route to work

In Ghana, customer service and support is a busy job category. Banks, fintechs, delivery firms, betting companies, internet providers, hospitals, schools and online shops all need people to answer calls, chats, WhatsApp messages and emails. Some of this work happens in call centres and outsourcing companies, often called BPOs, which handle support for other businesses. Some of it is remote, where you work from home for a company in another town or another country.

The good news is that the core skills are learnable without a degree in anything technical. Employers look for people who listen well, write clearly, stay calm and keep good records. You can practise all of these with free tools on a phone or a computer.

## What this first section covers

* **What a support agent does.** The job titles you will see in adverts, a normal shift, and how call centre, chat and remote roles differ.
* **Listening, empathy and tone.** How to make a worried customer feel heard, on a call or in a message.
* **Typing and clear writing.** Speed, accuracy and short friendly sentences, because many interviews include a typing or writing test.
* **English and local languages.** How to speak clear English at work and when switching to Dagbani, Hausa, Twi or another language helps.

## A small example

Fuseini helps at his aunt's phone accessories shop in Tamale. Customers come in angry because a charger stopped working. Fuseini has learned to let them finish talking, check the receipt, test the charger and offer a fair answer. He does not argue, and people leave calmer than they came.

Without knowing it, Fuseini is already doing customer service. What this track adds is the professional version: proper greetings, written records, tickets, safe handling of payments and personal data, and ways to measure good work. These are the things that turn a helpful person into someone a support team will hire.

## How to use this track

Work through the sections in order. Each lesson ends with a practice task you can keep in a folder or notes app. By the end of the track, those tasks become a small portfolio you can show an employer or a training programme. Take your time with the foundations. Everything else in this track depends on them.`,
      practice_task_md: `**Goal:** Notice the customer service you already give and receive.

**Steps:**
1. Open a notes app or a free document on your phone or computer.
2. Write down three times in the last month when you helped someone with a problem: at a shop, in a church or school group, or for a family member.
3. Write down one time a business helped you well and one time it helped you badly. For each, note what the person said or did.
4. Under each story, write one sentence on what made the difference: listening, speed, honesty, clear explanation or something else.

**Done looks like:** Five short stories, each with one sentence naming what made the service good or bad. Keep this note; you will add to it later in the track.`,
      quiz: {
        questions: [
          {
            prompt: "What is a BPO, as described in the lesson?",
            options: [
              "A government office that licenses call centres",
              "A company that handles support work for other businesses",
              "A type of help desk software",
              "A certificate you need before applying for support jobs",
            ],
            answer_index: 1,
            explanation: "The lesson describes call centres and outsourcing companies, often called BPOs, as handling support for other businesses.",
          },
          {
            prompt: "Which skills does the lesson say employers look for in support agents?",
            options: [
              "Coding, design and data analysis",
              "Driving, selling door to door and stock taking",
              "Listening well, writing clearly, staying calm and keeping good records",
              "A degree in a technical subject",
            ],
            answer_index: 2,
            explanation: "The lesson lists listening, clear writing, calm and good records as the core skills, and says no technical degree is needed.",
          },
          {
            prompt: "In the example, what did Fuseini do when an angry customer came in with a broken charger?",
            options: [
              "He let them finish talking, checked the receipt, tested the charger and offered a fair answer",
              "He told them to come back when the shop was less busy",
              "He refunded everyone without checking anything",
              "He argued until the customer accepted the charger was fine",
            ],
            answer_index: 0,
            explanation: "Fuseini listens, checks, tests and offers a fair answer without arguing.",
          },
          {
            prompt: "What does this track add to the helpful habits someone like Fuseini already has?",
            options: [
              "Ways to avoid talking to customers",
              "The professional version: greetings, records, tickets, safe payment and data handling and quality measures",
              "Only typing speed practice",
              "A guaranteed job at a call centre",
            ],
            answer_index: 1,
            explanation: "The lesson says the track adds the professional version of service, and it promises no job.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-support-agents-do": {
      explanation_md: `Before you apply for support work, it helps to know exactly what the job looks like. Adverts use many titles for very similar work, and the interview will go better if you can describe a normal day in your own words.

## Job titles you will see

Customer service representative, customer service agent, call centre agent, contact centre agent, live chat agent, customer support officer, customer experience associate and customer care officer usually mean the same family of work. Some titles point to a special focus. A **lead caller** or **telesales agent** makes outbound calls to people who showed interest. An **app support agent** helps people use a phone app. A **collections agent** follows up on unpaid bills. A **customer success** role looks after existing customers so they keep using a product.

## What the work involves

Most support jobs share the same core tasks:

* Answering questions about products, prices, orders, accounts and policies.
* Solving problems, or logging them and passing them to the right team.
* Writing a record of every contact so the next agent knows what happened.
* Following up when you promised to call or write back.
* Spotting repeated problems and telling your team leader.

## Three kinds of role

**Call centre roles** are mostly voice. You wear a headset, take one call after another and follow scripts for common situations. Many call centres in Ghana run day and night shifts and measure how many calls you handle and how well.

**Chat and messaging roles** are mostly written. You may handle two or three chats at once on a website, an app or WhatsApp. Typing speed and clear writing matter most here.

**Remote roles** can be either voice or chat, done from home for a company elsewhere. They usually expect a reliable computer, a headset and stable internet, and some follow the working hours of another country.

## A normal shift

Hawa works the morning shift for an invented delivery company in Accra, though she grew up in Nalerigu. She logs in at 8am, reads the team notes about any delivery delays, then opens her queue. In the first hour she answers WhatsApp messages about late parcels, updates two addresses in the system, and escalates a damaged item to the claims team with photos and a clear note. After lunch she calls back three customers she promised to update. Before she logs out, she checks that every open ticket has a note saying what happens next.

Nothing in Hawa's day needed advanced technology. It needed attention, honesty and good records. That is the job.`,
      practice_task_md: `**Goal:** Learn the language of support adverts.

**Steps:**
1. Search a Ghanaian job board or a company careers page for "customer service" or "call centre" adverts. Read three of them on your phone or computer.
2. For each advert, write down the job title, the channel (calls, chat, email, WhatsApp or a mix), whether it is office or remote, and the five skills it mentions most.
3. Do not copy the advert text. Use your own short notes.
4. Write a short paragraph describing what a normal shift in one of those roles would look like, like Hawa's day in the lesson.

**Done looks like:** A table or list covering three adverts, plus one paragraph describing a shift in your own words.`,
      quiz: {
        questions: [
          {
            prompt: "What does a lead caller or telesales agent mainly do?",
            options: [
              "Repairs phones for customers",
              "Makes outbound calls to people who showed interest",
              "Writes help articles for the website",
              "Manages the company's social media pages",
            ],
            answer_index: 1,
            explanation: "The lesson describes these roles as making outbound calls to people who showed interest.",
          },
          {
            prompt: "Which skill matters most in chat and messaging roles, according to the lesson?",
            options: [
              "A loud speaking voice",
              "Driving a delivery motorbike",
              "Typing speed and clear writing",
              "Knowing how to fix computers",
            ],
            answer_index: 2,
            explanation: "Chat roles are mostly written, so the lesson says typing speed and clear writing matter most.",
          },
          {
            prompt: "What do remote support roles usually expect?",
            options: [
              "A reliable computer, a headset and stable internet",
              "A shop in a busy market",
              "Owning a delivery vehicle",
              "Living in the same country as the company's head office",
            ],
            answer_index: 0,
            explanation: "The lesson says remote roles usually expect a reliable computer, a headset and stable internet.",
          },
          {
            prompt: "What did Hawa check before logging out at the end of her shift?",
            options: [
              "That she had answered every call in under one minute",
              "That every open ticket had a note saying what happens next",
              "That her team leader had approved her lunch break",
              "That all customers had given her a top rating",
            ],
            answer_index: 1,
            explanation: "Hawa makes sure every open ticket has a note on the next step, so nothing gets lost.",
          },
          {
            prompt: "Which task is part of most support jobs?",
            options: [
              "Writing a record of every contact",
              "Setting the company's prices",
              "Hiring new agents",
              "Designing the company logo",
            ],
            answer_index: 0,
            explanation: "Writing a record of each contact is listed as a core task so the next agent knows what happened.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "listening-and-empathy": {
      explanation_md: `Customers rarely contact support when things are going well. They call because money is missing, a parcel is late or an app has locked them out. They are often worried, and worry can sound like anger. The fastest way to calm a worried person is to show them that you have really heard them. That is why listening and empathy appear in almost every customer service job description.

## Active listening

Active listening means giving the customer your full attention and proving it. On a call it sounds like this:

* Let them finish. Do not interrupt, even if you think you know the answer.
* Use small signals so they know you are there: "Yes", "I see", "Okay".
* Take short notes as they talk: names, dates, amounts, what they already tried.
* **Repeat the problem back** in your own words before you try to fix it.

Repeating back is the most powerful step. It shows you understood, and it catches mistakes early. If you got something wrong, the customer will correct you before you waste time.

## Empathy is not agreeing

Empathy means understanding how the situation feels for the customer. It does not mean you agree they are right about everything, and it does not mean promising what you cannot deliver. You can say "I understand why that is worrying" and still explain the policy honestly.

Useful phrases:

* "I can hear this has been stressful. Let me help you sort it out."
* "Thank you for explaining that so clearly."
* "I would want the same answer if I were in your place."

Avoid phrases that sound cold or blaming, such as "You must have entered it wrong" or "That is not my department."

## Tone in writing

In chat and WhatsApp, the customer cannot hear your voice, so your words carry all the tone. A reply like "Ok. Wait." may be fine between friends but sounds rude to a customer. Compare it with "Thank you, Mariama. Please give me two minutes while I check your order." The second is longer by only a few words, but it feels completely different.

## A worked example

Abdul-Rahman calls an invented internet provider. He says his bundle finished in one day and he wants his money back.

A weak reply: "Bundles cannot be refunded."

A better reply: "I understand, Mr Abdul-Rahman. A bundle that runs out in one day is frustrating. So I have it right: you bought a monthly bundle yesterday morning and it was used up by evening. Is that correct?" He agrees. The agent then checks his usage, sees that a video app was updating in the background, explains how to turn off automatic updates, and tells him honestly what the refund policy allows.

The facts were the same both times. The customer's experience was not.`,
      practice_task_md: `**Goal:** Practise repeating back and warm wording.

**Steps:**
1. Ask a friend or family member to tell you about a recent problem they had with a shop, a service or an app. Let them talk without interrupting.
2. When they finish, repeat the problem back in two or three sentences, starting with "So I have it right..."
3. Ask them if you missed anything. Note what you got wrong.
4. Now rewrite these three cold messages so they sound warm and respectful: "Ok wait", "That is not my department", "You entered the wrong number".

**Done looks like:** A short note of how your repeat back went, and three rewritten messages you would be happy to send to a real customer.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, why is repeating the problem back so powerful?",
            options: [
              "It makes the call last longer, which improves your scores",
              "It shows you understood and catches mistakes early",
              "It means you do not need to take notes",
              "It lets you avoid solving the problem",
            ],
            answer_index: 1,
            explanation: "Repeating back proves you listened and lets the customer correct you before time is wasted.",
          },
          {
            prompt: "What does empathy mean in customer service?",
            options: [
              "Agreeing with everything the customer says",
              "Promising the customer whatever they ask for",
              "Understanding how the situation feels for the customer, while still being honest",
              "Talking about your own problems so the customer feels less alone",
            ],
            answer_index: 2,
            explanation: "The lesson says empathy is understanding how it feels, not agreeing with everything or making promises you cannot keep.",
          },
          {
            prompt: "Which reply has the best tone for a chat customer?",
            options: [
              "Ok. Wait.",
              "Thank you, Mariama. Please give me two minutes while I check your order.",
              "Hold on, I am busy with other chats.",
              "Check your order yourself on the app.",
            ],
            answer_index: 1,
            explanation: "In writing, words carry all the tone, so a polite reply with the name and a time frame feels respectful.",
          },
          {
            prompt: "In the example, what did the agent do after confirming Abdul-Rahman's problem?",
            options: [
              "Ended the call because bundles cannot be refunded",
              "Gave a full refund without checking",
              "Checked his usage, explained the background updates and was honest about the refund policy",
              "Transferred him to another department",
            ],
            answer_index: 2,
            explanation: "The agent checked usage, found the cause, gave a fix and explained the policy honestly.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "typing-and-writing": {
      explanation_md: `If you apply for a chat, email or remote support role, there is a good chance the employer will test your typing and writing before they meet you. Even call centre agents type notes during every call. Fast, accurate typing gives you more time to think about the customer, and clear writing means fewer customers write back confused.

## Typing: accuracy first, then speed

Typing tests usually measure two things: how many words you type per minute and how many mistakes you make. Accuracy matters more than you think. A fast reply full of errors looks careless and can give a customer wrong information, such as a wrong amount or a wrong date.

How to improve:

* Practise a little every day rather than a lot once a week. Ten to fifteen minutes is enough.
* On a computer, learn to touch type: fingers resting on the middle row, eyes on the screen. Free typing sites in your browser can guide you.
* On a phone, use both thumbs and learn your keyboard's shortcuts, but also practise on a computer if you can reach one at school, a hub or a cafe, because many support jobs use a full keyboard.
* Turn autocorrect on, but always reread. Autocorrect can change a customer's name or an order number.

## Clear writing for support

Good support writing is short, correct and friendly. Use these rules:

* **One idea per sentence.** Long sentences are hard to read on a small screen.
* **Plain words.** Say "check" instead of "ascertain", "send" instead of "transmit".
* **Answer first.** Put the answer or the next step at the start, then the detail.
* **Use the customer's name** and be polite, but do not overdo it.
* **Check numbers twice.** Amounts in cedis, dates, phone numbers and reference codes must be exactly right.
* **No slang or text speak** such as "pls", "u" or "tnx" with customers.

## A worked example

Here is a reply a new agent wrote to a customer whose order was delayed:

"Dear customer we wish to inform u that ur order has been delayed due to unforseen circumstances and we will revert when we have further informations on the said order tnx."

Here is the same message rewritten:

"Hello Amina, thank you for your patience. Your order is delayed because the delivery van from Kumasi arrived late. It will reach you in Tamale by Thursday. I will message you on Thursday morning to confirm. Sorry for the wait."

The second reply is clear, gives a reason and a date, promises a follow up and uses the customer's name. It is also free of spelling mistakes.

## Build the habit

Before sending anything, read it once from the customer's point of view. Ask yourself: would I understand this if it was the only message I received today? If not, fix it before you press send.`,
      practice_task_md: `**Goal:** Measure your typing and sharpen your writing.

**Steps:**
1. Open a free typing test in your browser on your phone or computer. Do three one minute tests and write down your words per minute and accuracy each time.
2. Practise for ten minutes a day for one week, then test again and record the new numbers.
3. Rewrite this message so it is clear, polite and correct: "dear customer ur refund is been process pls exercise patience we will revert asap tnx".
4. Read your rewrite aloud. If any sentence is hard to say in one breath, split it.

**Done looks like:** A small table showing your typing results at the start and end of the week, plus your rewritten refund message.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say accuracy matters as much as typing speed?",
            options: [
              "Typing tests only measure accuracy",
              "A fast reply with errors looks careless and can give wrong information",
              "Customers prefer slow replies",
              "Errors are automatically fixed by the help desk",
            ],
            answer_index: 1,
            explanation: "Errors can change amounts, dates or names, so a fast but wrong reply harms the customer.",
          },
          {
            prompt: "What does the rule 'answer first' mean?",
            options: [
              "Reply before the customer has finished their message",
              "Put the answer or next step at the start of the message, then the detail",
              "Always answer the first customer in the queue",
              "Answer with a saved reply before reading the question",
            ],
            answer_index: 1,
            explanation: "Putting the answer or next step first makes replies easy to understand quickly.",
          },
          {
            prompt: "Which of these should you avoid in messages to customers?",
            options: [
              "The customer's name",
              "A clear date for the next update",
              "Text speak such as 'pls', 'u' and 'tnx'",
              "A short apology for a delay",
            ],
            answer_index: 2,
            explanation: "The lesson says to avoid slang and text speak with customers.",
          },
          {
            prompt: "What makes the rewritten message to Amina better than the first version?",
            options: [
              "It is longer and uses more formal words",
              "It gives a reason, a date and a promised follow up, using her name",
              "It avoids saying sorry",
              "It asks her to call the office instead",
            ],
            answer_index: 1,
            explanation: "The rewrite explains the delay, gives a delivery day, promises a follow up and uses her name.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "languages-at-work": {
      explanation_md: `Most customer service in Ghana is done in English, especially email, chat and anything written into records. But many customers are more comfortable in Dagbani, Hausa, Twi, Ga, Ewe, Dagaare, Gurune or another language. Some employers ask for one or more local languages in their adverts, especially fintechs and companies that serve customers outside big cities. If you speak two or three languages, that is a real strength. This lesson helps you use it well.

## Clear spoken English

On the phone, customers cannot see your face, so your voice does all the work. Clear English at work is not about sounding foreign. It is about being easy to understand.

* **Slow down a little.** Nerves make people speak fast.
* **Finish your words.** Say every syllable of names, numbers and amounts.
* **Read numbers in groups.** For a phone number, say it in small groups and repeat it back. For money, say "two hundred and fifty cedis", not "two fifty".
* **Spell carefully.** Use a simple word for each letter when spelling names or codes, for example "M for Mango, A for Apple".
* **Use short sentences**, just as you would in writing.

## When to switch language

Switching to a local language can turn a tense call into a friendly one. A good pattern is to **offer, not assume**:

"I can also help you in Dagbani or Hausa if you prefer."

Let the customer choose. Some people prefer English at work even when they speak your language, and some may feel it is too familiar. Follow their lead.

Rules to keep in mind:

* Only switch if your employer allows it. Some teams record calls for quality and need a language the reviewers understand.
* Keep the record in English (or the company's working language). Your ticket notes must be readable by everyone.
* Technical terms such as "PIN", "reversal" or "transaction ID" are often clearer in English, even in a local language conversation.
* Never use a local language to say something about the customer you would not say in English. Treat every language as if the customer and your supervisor can understand it.

## A worked example

Issahaku works on an outbound team for an invented savings app. He calls an older trader in Damongo who answers in Gonja and says she does not understand "this app English". Issahaku does not speak Gonja well, but he speaks Hausa, so he offers it. She agrees. He explains, step by step, how to check her balance, then repeats the key steps in simple English so she can show her grandson. In his ticket note, in English, he writes: "Customer prefers Hausa. Explained balance check. Follow up in one week."

The next agent who calls her will see that note and can choose the right language from the first word.`,
      practice_task_md: `**Goal:** Practise clear speech and polite language switching.

**Steps:**
1. Use the voice recorder on your phone or computer. Record yourself reading out a made up phone number in small groups, an amount in cedis, and a name spelled letter by letter.
2. Listen back. Note any word you rushed or swallowed. Record again until it is clear.
3. Write one sentence offering a customer help in another language you speak, and one sentence for when the customer says no thanks.
4. Write a short English ticket note for a call held in a local language, like Issahaku's.

**Done looks like:** Two recordings (before and after) and a note with your two offer sentences and one ticket note.`,
      quiz: {
        questions: [
          {
            prompt: "What is the recommended way to switch to a local language with a customer?",
            options: [
              "Switch immediately if their name sounds like they speak it",
              "Offer it and let the customer choose",
              "Never switch, even if the customer asks",
              "Switch only when the customer is angry",
            ],
            answer_index: 1,
            explanation: "The lesson's pattern is to offer, not assume, and to follow the customer's lead.",
          },
          {
            prompt: "In which language should ticket notes usually be written?",
            options: [
              "The language the call was held in",
              "Whatever language is fastest for you to type",
              "English or the company's working language, so everyone can read them",
              "No notes are needed for local language calls",
            ],
            answer_index: 2,
            explanation: "Records must be readable by the whole team, so the lesson says to keep them in the working language.",
          },
          {
            prompt: "How should you say an amount of money on the phone?",
            options: [
              "Say it quickly to save time",
              "Say 'two fifty' and let the customer guess",
              "Say it fully, such as 'two hundred and fifty cedis'",
              "Avoid saying amounts on calls",
            ],
            answer_index: 2,
            explanation: "Saying amounts fully prevents mistakes with money.",
          },
          {
            prompt: "Why might an employer limit which languages agents use on calls?",
            options: [
              "Local languages are not allowed in Ghana",
              "Calls may be recorded and reviewed by people who need to understand them",
              "Local languages make calls longer by law",
              "Customers always prefer English",
            ],
            answer_index: 1,
            explanation: "The lesson notes some teams record calls for quality and need a language reviewers understand.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "support-channels": {
      explanation_md: `A channel is simply the way a customer reaches a business. Years ago that mostly meant walking into an office or calling a landline. Today a customer in Bolgatanga might call a hotline in the morning, send a WhatsApp message at lunch, write an email in the evening and complain on Facebook at midnight, all about the same problem. Support teams have to be ready on every one of those channels.

## The main channels

* **Phone.** Fast and personal. Good for urgent or complicated problems and for customers who prefer talking to typing. Many call centres in Ghana are mostly phone work.
* **Live chat.** A chat window on a website or inside an app. Customers expect a quick reply, and agents often handle more than one chat at once.
* **WhatsApp.** Very popular in Ghana because customers already use it every day. Businesses use WhatsApp Business to answer questions, send updates and share receipts or photos.
* **Email.** Slower, but good for detailed problems, documents and anything that needs a written record.
* **Social media.** Public comments and private messages on platforms such as Facebook, Instagram, TikTok or X. Everyone can see a public reply, so it needs extra care.

Some companies also use SMS for short updates, and many still serve walk in customers at a front desk.

## Each channel has its own habits

The same answer can be right on one channel and wrong on another. On the phone you can explain step by step and hear when the customer is confused. In chat you need short messages and quick updates. In email you need a complete answer with clear next steps, because the customer may not read it until hours later. On social media you must stay calm in public and move private details to a direct message.

Customers also expect different speeds. A customer on live chat may leave after a few minutes of silence. A customer who sent an email is usually happy with a reply the same day, as long as it solves the problem.

## One customer, many channels

Good teams keep one record per customer, whatever channel they use. Imagine Sumaila emails about a missing refund, then calls two days later. If the phone agent can see the email in the customer record, Sumaila does not have to explain everything again. If not, he starts from zero and feels ignored. You will learn more about records in the tools section.

## What this section covers

The next lessons teach phone calls and scripts, live chat and WhatsApp, email replies, and an optional lesson on public replies on social media. You may end up specialising in one channel, but knowing all of them makes you more useful and easier to hire.`,
      practice_task_md: `**Goal:** See how real businesses use different channels.

**Steps:**
1. Pick two Ghanaian businesses you know: for example a bank, a delivery firm, a school or an internet provider.
2. On your phone or computer, look at their website and social media pages. Write down every way a customer can contact them: phone numbers, WhatsApp, email, chat, social media, offices.
3. For each channel, note whether it says when it is open and how fast replies come.
4. Write two sentences about which channel you would use for an urgent problem with each business, and why.

**Done looks like:** A short list of channels for two businesses, with opening hours where shown, and your two sentences of reasoning. Do not contact them just for this task.`,
      quiz: {
        questions: [
          {
            prompt: "Which channel does the lesson describe as best for detailed problems that need a written record?",
            options: ["Phone", "Email", "A public social media comment", "A walk in visit"],
            answer_index: 1,
            explanation: "Email is slower but suits detailed problems, documents and anything needing a written record.",
          },
          {
            prompt: "Why does a public social media reply need extra care?",
            options: [
              "It costs more data to send",
              "Everyone can see it",
              "It can only contain pictures",
              "It is automatically deleted after a day",
            ],
            answer_index: 1,
            explanation: "Public replies are seen by everyone, so agents must stay calm and move private details to a direct message.",
          },
          {
            prompt: "Why is WhatsApp popular for support in Ghana, according to the lesson?",
            options: [
              "It is the only channel allowed by law",
              "Customers already use it every day",
              "It never needs internet",
              "It replaces the need for records",
            ],
            answer_index: 1,
            explanation: "The lesson says customers already use WhatsApp daily, so it is a natural place to ask for help.",
          },
          {
            prompt: "What happens when a team keeps one record per customer across channels?",
            options: [
              "The customer has to repeat the story on every channel",
              "Agents cannot use email",
              "Any agent can see earlier contacts, so the customer does not start from zero",
              "The customer can only use one channel",
            ],
            answer_index: 2,
            explanation: "In the Sumaila example, a shared record means the phone agent already knows about his email.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "phone-support": {
      explanation_md: `Phone support is the heart of most call centres and many bank, telecom and fintech support teams. A call is personal and fast, but it is also live: you cannot delete what you just said. A clear structure helps you stay calm and sound professional, even on your hundredth call of the day.

## The five stages of a call

1. **Greet.** Say the company name, your name and offer help.
2. **Verify.** Confirm who you are speaking to before you discuss any account. Use the checks your company sets, such as full name, registered phone number or a recent transaction.
3. **Understand.** Let the customer explain, ask questions and repeat the problem back.
4. **Solve or log.** Fix it if you can. If you cannot, log it, tell the customer exactly what happens next and when.
5. **Close.** Summarise, check there is nothing else and thank them.

## A sample inbound script

Here is an original script for an invented delivery company. Treat it as a guide, not something to read like a robot.

> **Greet:** "Good morning, thank you for calling QuickParcel. My name is Wumpini. How can I help you today?"
>
> **Verify:** "I can check that for you. Please may I have the full name and phone number on the order?"
>
> **Understand:** "So I have it right, your parcel was due yesterday in Wa and it has not arrived. Is that correct?"
>
> **Hold:** "Please may I put you on hold for about two minutes while I check with the depot?" Then come back on time: "Thank you for holding."
>
> **Solve:** "The van was delayed at Kintampo. Your parcel will reach Wa tomorrow before 2pm. I have added a note and you will get an SMS when it leaves the depot."
>
> **Close:** "Is there anything else I can help with today? Thank you for calling QuickParcel, and have a good day."

## Using a script without sounding like a robot

Scripts exist so that important steps are never skipped, especially verification and the closing summary. But customers can hear when someone is reading. Learn the script well enough to say it in your own natural voice, use the customer's name, and adapt the middle part to their actual problem. Keep the required steps exactly as written.

## Hold and transfer manners

Always ask before putting someone on hold and say roughly how long. If it takes longer, come back and update them. Before transferring a call, tell the customer who you are sending them to and why, and if your system allows, brief the next agent so the customer does not repeat everything.

## Outbound calls

Outbound calls are calls you make: following up on a complaint, reminding about a payment or calling someone who asked for information. Start by saying who you are and why you are calling, check it is a good time, and keep it short. If the person is busy, offer to call back at a time they choose and write that time down.

## Your voice

Smile while you talk; it changes your tone. Sit up, speak a little slower than normal and keep water nearby. A quiet place and a headset with a microphone make a big difference to how you sound.`,
      practice_task_md: `**Goal:** Write and record your own call script.

**Steps:**
1. Invent a small business, for example a solar lamp seller in Bolgatanga or a school fees payment service.
2. Write a five stage script for one common call: greet, verify, understand, solve or log, close. Include a polite hold line.
3. Practise it with a friend playing the customer. Ask them to change the story a little each time.
4. Record one practice call using the voice recorder on your phone or computer (with your friend's permission) and listen back. Note one thing to improve.

**Done looks like:** A written script, a short recording and one improvement note. This recording can go in your practice portfolio later.`,
      quiz: {
        questions: [
          {
            prompt: "What is the correct order of the five call stages in the lesson?",
            options: [
              "Solve, greet, verify, close, understand",
              "Greet, verify, understand, solve or log, close",
              "Verify, close, greet, understand, solve",
              "Greet, solve, verify, understand, close",
            ],
            answer_index: 1,
            explanation: "The lesson lists greet, verify, understand, solve or log, then close.",
          },
          {
            prompt: "Why must you verify the caller before discussing an account?",
            options: [
              "To make the call longer",
              "To confirm you are speaking to the right person before sharing account details",
              "Because the script is boring without it",
              "So you can sell them another product",
            ],
            answer_index: 1,
            explanation: "Verification confirms who you are speaking to before any account is discussed.",
          },
          {
            prompt: "What should you do before putting a customer on hold?",
            options: [
              "Nothing, just press hold",
              "Transfer them to another agent instead",
              "Ask permission and say roughly how long",
              "Tell them to call back later",
            ],
            answer_index: 2,
            explanation: "The lesson says always ask before putting someone on hold and give a rough time.",
          },
          {
            prompt: "What is the right way to use a call script?",
            options: [
              "Read it word for word in a flat voice",
              "Ignore it completely once you are confident",
              "Know it well, say it naturally and keep required steps such as verification exactly",
              "Only use it with angry customers",
            ],
            answer_index: 2,
            explanation: "Scripts protect required steps, but you should say them in your own natural voice.",
          },
          {
            prompt: "On an outbound call, what should you do if the person is busy?",
            options: [
              "Keep talking until you finish your message",
              "Hang up and never call again",
              "Offer to call back at a time they choose and write it down",
              "Send them a long voice note instead",
            ],
            answer_index: 2,
            explanation: "The lesson says to offer a callback at the customer's chosen time and record it.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "chat-and-whatsapp": {
      explanation_md: `Many Ghanaian businesses now do much of their support in writing: a chat window on a website or app, or a WhatsApp number printed on receipts and delivery bags. Chat feels casual to customers, but as an agent you still need to be professional, quick and accurate. The big difference from phone work is that you may handle two or three conversations at the same time.

## Chat manners

* **Reply fast with something useful.** A first reply within a minute or two shows someone is there, even if you need time to check.
* **Keep messages short.** Two or three short messages are easier to read on a small screen than one long block.
* **Never leave silence.** If you are checking something, say so and say how long.
* **Use the customer's name** and full words. No "pls" or "u".
* **One question at a time.** Several questions in one message confuse people.
* **Confirm before you close.** Ask if the problem is solved before ending the chat.

## A simple three message pattern

When a customer asks something you need to check, use **acknowledge, check, update**:

> "Hello Mariama, thank you for your message. I am sorry your order has not arrived."
>
> "Let me check the delivery status for you. This will take about two minutes."
>
> "Thank you for waiting. Your order left our Tamale store this morning and the rider will reach you before 4pm today."

## Handling several chats at once

Multitasking in chat is a skill you build slowly. Start with one chat, then two. Keep a quick note for each customer: name, problem, what you promised. Never paste a reply into the wrong chat; reread the name before you send. If a chat becomes complicated, it is fine to tell the other customers you will be with them shortly.

## WhatsApp Business for support

WhatsApp Business is a free app for small businesses, and larger companies use a business version connected to their support tools. Features that matter for support include:

* **A business profile** with address, opening hours and a short description.
* **Greeting and away messages** that reply automatically when a customer first writes or when the business is closed.
* **Quick replies**, saved answers to common questions that you can insert and then personalise.
* **Labels** to sort chats, for example "new order", "waiting for payment" or "complaint".

## Safety on WhatsApp

Because WhatsApp is personal, customers sometimes send photos of ID cards or bank details without being asked. Only ask for what your company's process requires, never ask for a PIN or password, and do not save customer photos to your personal gallery. Fraudsters also pretend to be businesses on WhatsApp, so teach customers how to recognise your official number.

## A worked example

Amina runs support for an invented fabric shop in Tamale on WhatsApp Business. Her greeting message tells customers her hours and that she replies within an hour. She uses labels to see which orders are waiting for payment and quick replies for delivery prices. When a customer asks for a refund, she does not argue in chat: she says she will check the order, labels it "complaint", checks with the owner and replies with a clear answer the same day.`,
      practice_task_md: `**Goal:** Practise chat replies and set up support features.

**Steps:**
1. Write the acknowledge, check, update pattern for two situations: a customer asking where their order is, and a customer saying they were charged twice.
2. Write a greeting message and an away message for an invented small business. Include opening hours and when the customer can expect a reply.
3. Write three quick replies for common questions, such as delivery cost, opening hours and how to pay.
4. Optional: if you already use WhatsApp Business for a real or practice business, set up the greeting message and one label. Do not create a fake account pretending to be a real company.

**Done looks like:** Two three message chat patterns, a greeting message, an away message and three quick replies, saved in your notes.`,
      quiz: {
        questions: [
          {
            prompt: "What are the three steps of the chat pattern in the lesson?",
            options: [
              "Greet, sell, close",
              "Acknowledge, check, update",
              "Ask, wait, transfer",
              "Apologise, refund, block",
            ],
            answer_index: 1,
            explanation: "The lesson's pattern is acknowledge the customer, say you are checking, then update them.",
          },
          {
            prompt: "What should you do if you need time to check something during a chat?",
            options: [
              "Say nothing until you have the answer",
              "Close the chat and start a new one later",
              "Tell the customer you are checking and how long it will take",
              "Ask the customer to call instead",
            ],
            answer_index: 2,
            explanation: "The lesson says never leave silence; tell the customer what you are doing and how long.",
          },
          {
            prompt: "What is a quick reply in WhatsApp Business?",
            options: [
              "A message that deletes itself",
              "A saved answer to a common question that you insert and personalise",
              "A voice note sent automatically",
              "A way to block customers",
            ],
            answer_index: 1,
            explanation: "Quick replies are saved answers you can insert and then adapt.",
          },
          {
            prompt: "Which habit helps avoid sending a reply to the wrong customer when handling several chats?",
            options: [
              "Typing as fast as possible",
              "Using the same reply for everyone",
              "Rereading the customer's name before you send",
              "Closing chats without confirming",
            ],
            answer_index: 2,
            explanation: "The lesson advises rereading the name before sending to avoid pasting into the wrong chat.",
          },
          {
            prompt: "Which of these should you never ask a customer for on WhatsApp?",
            options: ["Their order number", "Their delivery town", "Their PIN or password", "Their preferred delivery time"],
            answer_index: 2,
            explanation: "The safety section says never ask for a PIN or password.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "email-support": {
      explanation_md: `Email is slower than chat, but it is where many detailed problems are handled: refund requests, account changes, documents, formal complaints and anything a company needs on record. A good support email solves the problem in one go, so the customer does not have to write back asking what you meant. Remote support roles in particular rely heavily on email, so this skill opens doors.

## The shape of a good support email

Use this structure for most replies:

1. **Greeting with the customer's name.** "Hello Sumaila,"
2. **Thank and acknowledge.** One sentence that shows you understood the request.
3. **The answer or outcome.** Put the most important information early.
4. **Steps or details**, in a short numbered list if there is more than one step.
5. **What happens next**, with a clear time if anything is still pending.
6. **A polite close** and your name or team name.

## Subject lines

Reply in the same thread so the history stays together. If you start a new email, write a subject that says what it is about, with any reference number: "Your refund for order 4821" is better than "Update".

## A worked example

Sumaila wrote to an invented online electronics shop: he paid for a radio, received the wrong model, and wants to know what to do.

> Hello Sumaila,
>
> Thank you for letting us know, and I am sorry you received the wrong radio.
>
> We will exchange it for the model you ordered at no cost to you. Here is what to do:
>
> 1. Keep the radio in its box with the receipt.
> 2. Take it to our Tamale pickup point on Bolga Road any weekday between 9am and 5pm.
> 3. Show this email or your order number, 4821.
>
> The correct radio will be ready for you at the same visit. If you cannot get to the pickup point, reply to this email and we will arrange a rider to collect it.
>
> Kind regards,
> Hawa
> Customer Support

Notice that the answer comes in the third line, the steps are numbered, and the customer has a backup option.

## Templates

Most teams keep templates for common emails: refund approved, order delayed, password reset steps. Templates save time and keep answers consistent, but always:

* Replace every placeholder, such as the name and order number.
* Read the customer's email again and make sure the template actually answers it.
* Add one personal sentence that refers to their specific situation.

A template sent with the wrong name, or that ignores the customer's actual question, does more harm than a slower personal reply.

## Before you press send

Check the name, numbers, dates and attachments. Read it once as the customer. If you have promised to do something, make sure it is noted in the ticket so it actually happens.`,
      practice_task_md: `**Goal:** Write two complete support emails.

**Steps:**
1. In any free email or notes app, write a reply to this customer: "I paid 300 cedis for school fees through your app on Monday but the school says they have not received it." Use the six part structure from the lesson. Invent a sensible next step and a time frame.
2. Write a reusable template for "your order is delayed", with placeholders in square brackets such as [name] and [new date].
3. Fill in your template for an invented customer called Issahaku in Wa, and add one personal sentence.
4. Check both emails for names, numbers and spelling.

**Done looks like:** One full reply email, one template and one filled in version of that template, ready to add to your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Where should the main answer go in a support email?",
            options: [
              "At the very end, after all the details",
              "Early in the email, right after the greeting and acknowledgement",
              "In the subject line only",
              "In an attachment",
            ],
            answer_index: 1,
            explanation: "The structure puts the answer or outcome early so the customer sees it straight away.",
          },
          {
            prompt: "Which subject line is best for a new support email?",
            options: ["Update", "Hello", "Your refund for order 4821", "Important!!!"],
            answer_index: 2,
            explanation: "A good subject says what the email is about and includes any reference number.",
          },
          {
            prompt: "What should you always do when using an email template?",
            options: [
              "Send it exactly as written to save time",
              "Replace every placeholder, check it answers the question and add a personal sentence",
              "Remove the customer's name to keep it formal",
              "Attach the template file instead of pasting it",
            ],
            answer_index: 1,
            explanation: "The lesson lists replacing placeholders, checking it fits and adding a personal sentence.",
          },
          {
            prompt: "In the example reply to Sumaila, what did Hawa include in case he could not reach the pickup point?",
            options: [
              "A discount code",
              "A backup option to arrange a rider to collect the radio",
              "Her personal phone number",
              "A request to buy a different radio",
            ],
            answer_index: 1,
            explanation: "The email offers a rider collection if he cannot get to the pickup point.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "social-media-replies": {
      explanation_md: `When a customer complains on a company's Facebook page, Instagram post, TikTok video or X account, the conversation is no longer private. Hundreds of other people may read it, and they will judge the company by how it replies. Many brands and small businesses in Ghana need someone who can handle these replies calmly and quickly. This lesson is optional, but it is a useful extra skill, especially for roles at shops, restaurants, schools and growing brands.

## Why public replies are different

A private chat affects one customer. A public reply affects everyone watching. A rude or defensive reply can spread far beyond the original complaint, while a calm, helpful reply can actually make people trust the business more. Readers do not expect perfection; they want to see that the company listens and acts.

## The public reply pattern

For most complaints, use four short steps in one public reply:

1. **Thank or acknowledge** the person by name.
2. **Apologise for the experience** without arguing about details in public.
3. **Move it private.** Invite them to send a direct message, and never ask for account numbers, phone numbers or ID in public.
4. **Follow up** once it is solved, if appropriate, with a short public note.

Example for an invented restaurant in Tamale:

> "Hello Fuseini, thank you for telling us, and we are sorry your order arrived cold. Please send us a direct message with your order time so we can put this right."

Then in the private message, you solve it like any other support case.

## Things never to do in public

* Argue, blame the customer or share their order details.
* Reveal anyone's personal data, even if they posted part of it themselves.
* Delete fair complaints. Hiding criticism usually makes people angrier. Spam, insults and scams are different: follow your company's policy for those.
* Post the same copied reply under every comment. People notice.
* Promise refunds or compensation in public unless your manager has approved it.

## Scams in the comments

Fraudsters often reply under brand posts pretending to be support, asking customers to message a private number or share a code. Part of your job is to warn customers: your official account will never ask for a PIN, password or verification code. Report fake accounts using the platform's reporting tools and tell your team.

## A worked example

Mariama manages the Facebook page for an invented school uniform tailor in Bolgatanga. A parent posts that uniforms were delivered late on the first day of term. Mariama replies within the hour with the public pattern, gets the details in a private message, finds that a fabric delivery was delayed, offers a small discount on the next order with the owner's approval, and later thanks the parent publicly for their patience. Other parents see the whole exchange and see a business that takes responsibility.`,
      practice_task_md: `**Goal:** Write calm public replies and their private follow ups.

**Steps:**
1. Write three made up public complaints for invented local businesses: a late delivery, a rude staff member and a wrong charge.
2. For each, write a public reply using the four step pattern from the lesson. Keep each reply under 50 words.
3. For one of them, write the first private message you would send after the customer contacts you.
4. Write one short public warning post telling customers that the business will never ask for a PIN, password or code.

**Done looks like:** Three public replies, one private follow up message and one scam warning post, saved in your notes. Do not post these on real company pages.`,
      quiz: {
        questions: [
          {
            prompt: "Why do public social media replies need extra care?",
            options: [
              "They cannot be edited",
              "Many other people read them and judge the company by them",
              "They are only seen by the customer",
              "They must be written in a formal letter style",
            ],
            answer_index: 1,
            explanation: "A public reply affects everyone watching, not just the customer.",
          },
          {
            prompt: "What should you do with private details such as account or phone numbers?",
            options: [
              "Ask for them in the public comment so it is faster",
              "Move the conversation to a direct message and never ask for them in public",
              "Post them to show the customer you found their account",
              "Ignore the customer until they visit the office",
            ],
            answer_index: 1,
            explanation: "The pattern moves the conversation private and never asks for private details publicly.",
          },
          {
            prompt: "Which of these does the lesson say not to do in public?",
            options: [
              "Thank the customer by name",
              "Apologise for the experience",
              "Promise refunds or compensation without your manager's approval",
              "Invite the customer to send a direct message",
            ],
            answer_index: 2,
            explanation: "Public promises of refunds or compensation need approval first.",
          },
          {
            prompt: "What do fraudsters often do in brand comment sections?",
            options: [
              "Post honest product reviews",
              "Pretend to be support and ask customers to share codes or message a private number",
              "Report the business to the platform",
              "Offer to work for the brand",
            ],
            answer_index: 1,
            explanation: "The lesson warns that fraudsters pose as support in the comments to steal codes or details.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
