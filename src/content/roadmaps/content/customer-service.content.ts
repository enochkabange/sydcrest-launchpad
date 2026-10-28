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
              "A government office that licenses and inspects call centres in Ghana",
              "A certificate you need before applying for support jobs",
              "A type of help desk software",
              "A company that handles support work for other businesses",
            ],
            answer_index: 3,
            explanation: "The lesson describes call centres and outsourcing companies, often called BPOs, as handling support for other businesses.",
          },
          {
            prompt: "Which skills does the lesson say employers look for in support agents?",
            options: [
              "Coding, design and data analysis",
              "Driving, selling door to door, stock taking and repairing customers' phones",
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
              "He argued politely until the customer accepted that the charger was working fine",
            ],
            answer_index: 0,
            explanation: "Fuseini listens, checks, tests and offers a fair answer without arguing.",
          },
          {
            prompt: "What does this track add to the helpful habits someone like Fuseini already has?",
            options: [
              "Ways to avoid talking to customers",
              "The professional version: greetings, records, tickets, safe payment and data handling and quality measures",
              "Only typing speed practice, since speed is the one thing support employers really test",
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
              "Manages the company's social media pages and posts its adverts",
              "Writes help articles for the website",
              "Makes outbound calls to people who showed interest",
            ],
            answer_index: 3,
            explanation: "The lesson describes these roles as making outbound calls to people who showed interest.",
          },
          {
            prompt: "Which skill matters most in chat and messaging roles, according to the lesson?",
            options: [
              "A loud, clear speaking voice for busy offices",
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
              "That she had answered every call in under one minute that day",
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
              "Setting the prices the company charges customers",
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
              "It shows you understood and catches mistakes early",
              "It makes the call last longer, which improves your scores",
              "It means you do not need to take notes",
              "It lets you avoid solving the problem",
            ],
            answer_index: 0,
            explanation: "Repeating back proves you listened and lets the customer correct you before time is wasted.",
          },
          {
            prompt: "What does empathy mean in customer service?",
            options: [
              "Agreeing with everything the customer says",
              "Promising the customer whatever they ask for",
              "Understanding how the situation feels for the customer, while still being honest",
              "Sharing your own similar problems at length so the customer feels less alone with theirs",
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
              "Gave him a full refund straight away so the call would end on a happy note",
              "Transferred him to another department",
              "Checked his usage, explained the background updates and was honest about the refund policy",
            ],
            answer_index: 3,
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
              "Errors are fixed automatically by the help desk before the customer sees them",
              "Customers prefer slow replies",
              "A fast reply with errors looks careless and can give wrong information",
            ],
            answer_index: 3,
            explanation: "Errors can change amounts, dates or names, so a fast but wrong reply harms the customer.",
          },
          {
            prompt: "What does the rule 'answer first' mean?",
            options: [
              "Reply before the customer has finished their message",
              "Answer with a saved reply as soon as the chat opens, before reading the question",
              "Always answer the first customer in the queue",
              "Put the answer or next step at the start of the message, then the detail",
            ],
            answer_index: 3,
            explanation: "Putting the answer or next step first makes replies easy to understand quickly.",
          },
          {
            prompt: "Which of these should you avoid in messages to customers?",
            options: [
              "The customer's name",
              "A clear date for when the customer will get the next update",
              "Text speak such as 'pls', 'u' and 'tnx'",
              "A short apology for a delay",
            ],
            answer_index: 2,
            explanation: "The lesson says to avoid slang and text speak with customers.",
          },
          {
            prompt: "What makes the rewritten message to Amina better than the first version?",
            options: [
              "It is much longer and uses more formal words, which customers expect from a company",
              "It asks her to call the office instead",
              "It avoids saying sorry",
              "It gives a reason, a date and a promised follow up, using her name",
            ],
            answer_index: 3,
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
              "Offer it and let the customer choose",
              "Switch immediately if their name sounds like they speak it",
              "Never switch, even if the customer asks",
              "Switch only when the customer is angry",
            ],
            answer_index: 0,
            explanation: "The lesson's pattern is to offer, not assume, and to follow the customer's lead.",
          },
          {
            prompt: "In which language should ticket notes usually be written?",
            options: [
              "The language the call was held in",
              "Whatever language is fastest for you to type, since notes are only for you",
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
              "Say 'two fifty' and let the customer work out whether you mean cedis or pesewas",
              "Say it fully, such as 'two hundred and fifty cedis'",
              "Avoid saying amounts on calls",
            ],
            answer_index: 2,
            explanation: "Saying amounts fully prevents mistakes with money.",
          },
          {
            prompt: "Why might an employer limit which languages agents use on calls?",
            options: [
              "Local languages are not allowed on business calls under Ghana's telecom rules",
              "Customers always prefer English",
              "Local languages make calls longer by law",
              "Calls may be recorded and reviewed by people who need to understand them",
            ],
            answer_index: 3,
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
            options: ["Phone", "A walk in visit", "A public social media comment", "Email"],
            answer_index: 3,
            explanation: "Email is slower but suits detailed problems, documents and anything needing a written record.",
          },
          {
            prompt: "Why does a public social media reply need extra care?",
            options: [
              "Everyone can see it",
              "It costs more data to send",
              "It can only contain pictures",
              "It is automatically deleted after a day",
            ],
            answer_index: 0,
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
              "The customer has to repeat the full story every time they switch to a new channel",
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

> **Greet:** "Good morning, thank you for calling Kpalang Parcels. My name is Wumpini. How can I help you today?"
>
> **Verify:** "I can check that for you. Please may I have the full name and phone number on the order?"
>
> **Understand:** "So I have it right, your parcel was due yesterday in Wa and it has not arrived. Is that correct?"
>
> **Hold:** "Please may I put you on hold for about two minutes while I check with the depot?" Then come back on time: "Thank you for holding."
>
> **Solve:** "The van was delayed at Kintampo. Your parcel will reach Wa tomorrow before 2pm. I have added a note and you will get an SMS when it leaves the depot."
>
> **Close:** "Is there anything else I can help with today? Thank you for calling Kpalang Parcels, and have a good day."

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
              "Greet, verify, understand, solve or log, close",
              "Solve, greet, verify, close, understand",
              "Verify, close, greet, understand, solve",
              "Greet, solve, verify, understand, close",
            ],
            answer_index: 0,
            explanation: "The lesson lists greet, verify, understand, solve or log, then close.",
          },
          {
            prompt: "Why must you verify the caller before discussing an account?",
            options: [
              "To make the call longer",
              "So you can check whether they qualify for another product before you help them",
              "Because the script is boring without it",
              "To confirm you are speaking to the right person before sharing account details",
            ],
            answer_index: 3,
            explanation: "Verification confirms who you are speaking to before any account is discussed.",
          },
          {
            prompt: "What should you do before putting a customer on hold?",
            options: [
              "Nothing, just press hold",
              "Transfer them to another agent instead, so they never hear hold music",
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
              "Ignore it completely once you are confident, since natural talk always sounds better",
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
              "Send them a long voice note with the whole message instead of calling back",
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
              "Apologise, refund, then close the chat",
            ],
            answer_index: 1,
            explanation: "The lesson's pattern is acknowledge the customer, say you are checking, then update them.",
          },
          {
            prompt: "What should you do if you need time to check something during a chat?",
            options: [
              "Say nothing until you have the answer",
              "Close the chat and start a fresh one later when you have the full answer",
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
              "A way to block customers",
              "A voice note that WhatsApp sends automatically whenever a customer messages you",
              "A saved answer to a common question that you insert and personalise",
            ],
            answer_index: 3,
            explanation: "Quick replies are saved answers you can insert and then adapt.",
          },
          {
            prompt: "Which habit helps avoid sending a reply to the wrong customer when handling several chats?",
            options: [
              "Typing as fast as possible",
              "Using the same reply for everyone so nothing can be mixed up",
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
              "At the very end, after all the background details and the apology",
              "Early in the email, right after the greeting and acknowledgement",
              "In the subject line only",
              "In an attachment",
            ],
            answer_index: 1,
            explanation: "The structure puts the answer or outcome early so the customer sees it straight away.",
          },
          {
            prompt: "Which subject line is best for a new support email?",
            options: ["Update", "Hello", "Your refund for order 4821", "Important!!! Please read now"],
            answer_index: 2,
            explanation: "A good subject says what the email is about and includes any reference number.",
          },
          {
            prompt: "What should you always do when using an email template?",
            options: [
              "Send it exactly as written to save time",
              "Attach the template file to the email instead of pasting it, so the formatting stays neat",
              "Remove the customer's name to keep it formal",
              "Replace every placeholder, check it answers the question and add a personal sentence",
            ],
            answer_index: 3,
            explanation: "The lesson lists replacing placeholders, checking it fits and adding a personal sentence.",
          },
          {
            prompt: "In the example reply to Sumaila, what did Hawa include in case he could not reach the pickup point?",
            options: [
              "A discount code",
              "A backup option to arrange a rider to collect the radio",
              "Her personal phone number",
              "A request to buy a different radio that could be delivered to his door instead",
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
              "They must be written in a formal letter style with the company's full address",
            ],
            answer_index: 1,
            explanation: "A public reply affects everyone watching, not just the customer.",
          },
          {
            prompt: "What should you do with private details such as account or phone numbers?",
            options: [
              "Ask for them in the public comment so the whole team can see them and reply faster",
              "Ignore the customer until they visit the office",
              "Post them to show the customer you found their account",
              "Move the conversation to a direct message and never ask for them in public",
            ],
            answer_index: 3,
            explanation: "The pattern moves the conversation private and never asks for private details publicly.",
          },
          {
            prompt: "Which of these does the lesson say not to do in public?",
            options: [
              "Thank the customer by name",
              "Apologise for the experience",
              "Promise refunds or compensation without your manager's approval",
              "Invite the customer to send a direct message with their order details",
            ],
            answer_index: 2,
            explanation: "Public promises of refunds or compensation need approval first.",
          },
          {
            prompt: "What do fraudsters often do in brand comment sections?",
            options: [
              "Post honest product reviews",
              "Pretend to be support and ask customers to share codes or message a private number",
              "Report the business to the platform to get its page taken down for poor service",
              "Offer to work for the brand",
            ],
            answer_index: 1,
            explanation: "The lesson warns that fraudsters pose as support in the comments to steal codes or details.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "tickets-and-tools": {
      explanation_md: `Imagine a support team of twenty agents receiving hundreds of calls, chats and emails every day. Without a system, requests would be forgotten, two agents would answer the same customer differently, and nobody would know which problems were still open. Support tools solve this. Help desk and CRM skills are named again and again in Ghanaian and remote support adverts, so this section matters for getting hired.

## The three tools you will meet

* **A help desk or ticketing system.** Every request becomes a ticket with a number, a status and a history. Agents work through queues of tickets. Examples of such tools include Zendesk, Freshdesk and Zoho Desk; they are named here only as examples, and your employer may use a different one or its own system.
* **A CRM (customer relationship management) system.** It stores each customer's details and their full history with the company: purchases, accounts, past contacts and notes.
* **A knowledge base.** A library of help articles and saved replies, some for customers to read themselves and some only for agents.

In many companies these are joined together, so you see the ticket, the customer record and suggested articles on one screen. In smaller businesses they might be a shared spreadsheet, a WhatsApp Business label system and a document of common answers. The ideas are the same.

## Why the tools matter to you

Tools are not just for managers. They protect you as an agent. If a customer says "Nobody ever called me back", a good ticket history shows exactly what was done and when. If you go on leave, your colleague can continue your open tickets without calling you. And when your work is reviewed, clear notes show the care you took.

## The words you will hear

* **Queue:** a list of tickets waiting for an agent.
* **Status:** where a ticket is, such as new, open, pending (waiting for the customer or another team) or solved.
* **Priority:** how urgent a ticket is.
* **Tags:** short labels that group tickets by topic, such as "refund" or "login".
* **Internal note:** a comment only the team can see.
* **Macro or canned response:** a saved reply or set of actions.

## You can practise for free

Many help desk and CRM products offer free plans or free trials you can open in a browser. You do not need a company to practise. Use invented customers and invented problems, never real people's data. Even practising in a simple spreadsheet teaches you the habits that matter: one row per request, a clear status, and a note of every action.

## A small example

Wumpini starts at an invented solar company that sells lamps on credit across the north. On her first day, her team leader shows her the queue, explains that "pending" means waiting for the customer, and asks her to read ten old tickets before answering any. By the end of the day she understands the common problems and how the team writes notes. That is exactly the kind of start this section prepares you for.`,
      practice_task_md: `**Goal:** Build a simple ticket tracker you can practise with.

**Steps:**
1. Open a free spreadsheet app on your phone or computer.
2. Create these columns: Ticket number, Date, Customer name, Channel, Problem, Priority, Status, Tags, Notes.
3. Invent five customer requests for a small business, for example a phone repair shop in Wa. Fill in one row for each. Use invented names only.
4. Change two tickets to "pending" and one to "solved", and write a short note explaining each change.

**Done looks like:** A spreadsheet with five tickets, every column filled, and notes that someone else could understand without asking you.`,
      quiz: {
        questions: [
          {
            prompt: "What does a help desk or ticketing system do?",
            options: [
              "Turns every request into a ticket with a number, status and history",
              "Makes phone calls automatically to every customer who has not been in touch",
              "Designs the company website",
              "Pays agents' salaries",
            ],
            answer_index: 0,
            explanation: "The lesson describes the help desk as turning each request into a tracked ticket.",
          },
          {
            prompt: "What does a 'pending' status usually mean?",
            options: [
              "The ticket has been deleted",
              "The ticket is the most urgent one in the queue and must be answered first",
              "The ticket is solved",
              "The ticket is waiting for the customer or another team",
            ],
            answer_index: 3,
            explanation: "Pending means waiting for the customer or another team.",
          },
          {
            prompt: "How do good ticket notes protect you as an agent?",
            options: [
              "They show exactly what was done and when if a customer says nobody helped",
              "They let you skip talking to customers",
              "They let you leave out your mistakes so your team leader only sees what went well",
              "They make tickets close automatically",
            ],
            answer_index: 0,
            explanation: "A clear history proves the actions taken and lets colleagues continue your work.",
          },
          {
            prompt: "What should you use when practising in a free help desk trial?",
            options: [
              "Real customers' data from a friend's business",
              "Your family's phone numbers",
              "Invented customers and invented problems",
              "Data copied from social media",
            ],
            answer_index: 2,
            explanation: "The lesson says practise with invented data, never real people's data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "helpdesk-tickets": {
      explanation_md: `A ticket is the written story of one customer request from start to finish. If you can create, update and close tickets well, you can slot into almost any support team, whatever tool they use. Interviewers sometimes give candidates a few sample tickets and ask how they would handle them, so this is worth practising.

## What a good ticket contains

* **Who:** the customer's name and how to reach them, taken from the verified record.
* **What:** a clear one line summary, then the details. "Customer cannot log in after changing phone" is better than "App problem".
* **When:** dates and times of the issue and of each contact.
* **Channel:** phone, chat, WhatsApp, email or social media.
* **Priority, status and tags.**
* **Actions and notes:** what you checked, what you told the customer and what happens next.

## Setting priority

Teams usually have levels such as low, normal, high and urgent. Your company will have its own rules, but these questions help:

* Is money missing or at risk? That is usually high or urgent.
* Is the customer completely blocked, such as unable to log in or receive a service?
* Are many customers affected at once? That may be an outage, which needs to go to a team leader quickly.
* Is it a question that can wait, such as a request for information? That is usually low or normal.

Priority is about the problem, not about how loud the customer is. A calm customer with missing money is more urgent than an angry customer asking about opening hours.

## Statuses and the life of a ticket

A typical ticket moves like this: **new** when it arrives, **open** when an agent is working on it, **pending** when waiting for the customer or another team, and **solved** when the problem is fixed and the customer has been told. Some teams **close** tickets automatically a few days after they are solved if the customer does not reply.

Never mark a ticket solved just to empty your queue. If the customer writes back because the problem is not fixed, the ticket reopens and it looks worse than if you had left it open.

## Tags

Tags group similar tickets so the team can spot patterns, such as many "failed payment" tickets in one morning. Use the team's agreed tags exactly. Inventing your own tags makes reports useless.

## A worked example

Here is a ticket written by Issahaku for an invented bus booking app:

> **Summary:** Booked seat Tamale to Kumasi, payment taken, no ticket received.
>
> **Priority:** High (money taken, travel tomorrow).
>
> **Tags:** payment, booking.
>
> **Note:** Customer Mariama called 10:15. Verified name and phone. Payment of 180 cedis shows on our side as successful at 09:40 but booking failed. Sent to payments team with transaction reference. Told customer she will get an SMS with her ticket or a refund update by 2pm today. Status: pending (payments team).

Anyone on the team can read that note and know exactly where things stand.`,
      practice_task_md: `**Goal:** Prioritise and write tickets like a professional.

**Steps:**
1. Read these four invented requests: (a) a customer asking for the office address, (b) a customer whose wallet was debited for airtime that never arrived, (c) twenty customers in one hour saying the app will not open, (d) a customer wanting to change their delivery day next week.
2. Give each a priority (low, normal, high or urgent) and write one sentence explaining why.
3. Write a full ticket for request (b), using the structure from the lesson: summary, priority, tags, note and status.
4. Swap tickets with a friend or mentor if you can and ask if they could continue the case from your note alone.

**Done looks like:** Four priorities with reasons and one complete ticket that someone else could pick up.`,
      quiz: {
        questions: [
          {
            prompt: "Which ticket summary is best?",
            options: [
              "App problem",
              "Help needed urgently!! Customer very upset",
              "Customer cannot log in after changing phone",
              "See below",
            ],
            answer_index: 2,
            explanation: "A good summary states the problem clearly in one line.",
          },
          {
            prompt: "What should decide a ticket's priority?",
            options: [
              "How loud or angry the customer is, since upset customers should always go first",
              "The time of day the ticket arrived",
              "Which agent received the ticket",
              "The problem itself, such as money at risk or a customer completely blocked",
            ],
            answer_index: 3,
            explanation: "The lesson says priority is about the problem, not how loud the customer is.",
          },
          {
            prompt: "Why should you never mark a ticket solved just to empty your queue?",
            options: [
              "Solved tickets cannot be read again",
              "Only team leaders can solve tickets",
              "Solved tickets are charged to the company by the help desk provider, so each one costs money",
              "If the problem is not fixed the customer writes back, the ticket reopens and it looks worse",
            ],
            answer_index: 3,
            explanation: "A falsely solved ticket reopens when the customer returns, which is worse for everyone.",
          },
          {
            prompt: "Why should you use the team's agreed tags exactly?",
            options: [
              "So customers can read the tags and see how their ticket is being handled",
              "Because tags are visible to customers",
              "Because inventing tags deletes the ticket",
              "So tickets close faster",
            ],
            answer_index: 0,
            explanation: "Tags group similar tickets; invented tags make reports useless.",
          },
          {
            prompt: "In Issahaku's example, why was the ticket set to high priority?",
            options: [
              "The customer was shouting",
              "Money had been taken and the customer was travelling the next day",
              "It was the first ticket of the day",
              "The customer asked for a discount on the next purchase as compensation",
            ],
            answer_index: 1,
            explanation: "The note explains high priority because money was taken and travel was the next day.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "crm-records": {
      explanation_md: `A ticket tells the story of one request. A CRM record tells the story of one customer across all their requests, purchases and conversations. When a returning customer calls, the CRM is what lets you say "I can see you contacted us last week about your refund" instead of "Please explain from the beginning." Customers notice that difference, and so do employers. CRM experience is named in many support adverts in Ghana and abroad.

## What a customer record holds

Details vary by company, but a record often includes:

* **Contact details:** name, phone number, email, location.
* **Account details:** account or customer number, products or services they use, plan or package.
* **History:** past tickets, calls, chats, orders, payments and refunds.
* **Notes:** short comments from agents about preferences or important context.
* **Consent and preferences:** for example whether they agreed to receive marketing messages and which language they prefer.

## Searching well

Customers often have similar names, so search carefully. Search by a unique detail first, such as a phone number, customer number or email, and then confirm the name and one more detail with the customer. Opening the wrong record and discussing someone else's account is a serious data protection mistake.

## Updating records

Customers change phone numbers, move towns and change names. Updating a record is simple, but follow your company's verification steps first, because changing a phone number or email can give someone control of an account. Fraudsters sometimes call pretending to be a customer just to change these details. If anything feels wrong, pause and check with a supervisor.

## Writing useful notes

A good CRM note is short, factual and useful to the next person. It answers: what happened, what was done, what is next.

Compare these two notes:

> "Customer was very annoying and kept complaining."

> "Customer called about second late delivery this month. Apologised, gave new date of Friday. Prefers calls after 5pm. Prefers Dagbani."

The first note is unprofessional and useless; customers can sometimes request copies of what a company holds about them. The second helps every future agent.

Rules for notes:

* Write facts, not opinions about the customer's character.
* Never record PINs, passwords or full card numbers.
* Use the agreed format and abbreviations of your team, and nothing else.
* Write the note straight after the contact, while it is fresh.

## A worked example

Hawa works for an invented internet provider. A customer, Abdul-Rahman, calls from a new number. Hawa searches by his customer number, verifies his name and his registered address, and sees three earlier tickets about slow speeds in Nalerigu. Instead of starting basic checks again, she reads the last engineer's note, sees a mast repair was planned, and gives him an honest update. She then updates his phone number after the extra verification steps her company requires, and adds a note: "Customer changed number, verified by address and last payment. Updated on speed issue, mast repair scheduled."`,
      practice_task_md: `**Goal:** Practise keeping customer records clean and useful.

**Steps:**
1. In a free spreadsheet app, create a customer list with columns: Customer number, Name, Phone, Town, Preferred language, Contact history, Notes. Add four invented customers.
2. For two of them, add three past contacts each in the history column, with dates.
3. Rewrite these weak notes into useful factual ones: "rude man", "she called again", "problem solved I think".
4. Write two sentences describing what extra checks you would do before changing a customer's phone number.

**Done looks like:** A small customer list with history, three rewritten notes and your two sentences on safe updates. Use invented data only.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main difference between a ticket and a CRM record?",
            options: [
              "A ticket covers one request; a CRM record covers one customer across all their contacts",
              "A ticket is used for phone calls, while a CRM record is used only for emails and letters",
              "There is no difference",
              "A CRM record is only for sales staff",
            ],
            answer_index: 0,
            explanation: "The lesson says a ticket is one request and a CRM record is one customer's whole history.",
          },
          {
            prompt: "What is the safest way to search for a customer record?",
            options: [
              "Search by first name only",
              "Open the first record that appears",
              "Search by a unique detail such as phone or customer number, then confirm the name and another detail",
              "Ask a colleague which record it might be, then open that one and read out the details",
            ],
            answer_index: 2,
            explanation: "Unique details plus confirmation avoid opening and discussing the wrong customer's account.",
          },
          {
            prompt: "Why should you follow verification steps before changing a phone number or email?",
            options: [
              "Because the extra steps make the call longer, which improves your average handling time score",
              "Because changing them can give someone control of an account, and fraudsters try this",
              "Because customers are not allowed to change numbers",
              "Because the CRM will crash otherwise",
            ],
            answer_index: 1,
            explanation: "Changing contact details can hand over an account, so fraudsters target this step.",
          },
          {
            prompt: "Which of these is a good CRM note?",
            options: [
              "Customer was very annoying",
              "Called again, same thing",
              "Second late delivery this month. Apologised, new date Friday. Prefers calls after 5pm.",
              "PIN is 4321, customer forgot it",
            ],
            answer_index: 2,
            explanation: "Good notes are factual and useful, and never contain opinions about character or PINs.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "knowledge-base": {
      explanation_md: `No support agent remembers every policy, price and process. The good ones know where to find answers quickly. A knowledge base is a library of help articles: some are public, for customers to read themselves, and some are internal, only for agents. Saved replies, sometimes called canned responses or macros, are ready made answers to common questions. Using both well makes you faster, more accurate and more consistent with the rest of your team.

## Finding answers fast

When a customer asks something you are unsure about, do not guess. Guessing wrong about a refund rule or a fee can cause real trouble. Instead:

* Search the knowledge base using the customer's own words, then try other words. Customers say "money not reached"; the article may be called "pending transfers".
* Check the article's date. Policies change, and old articles sometimes stay online.
* If two articles disagree, ask your team leader and report the problem.
* Tell the customer you are checking, so the silence does not worry them.

## Making saved replies sound human

Saved replies save time, but a reply that clearly ignores what the customer wrote is worse than no reply. Every time you use one:

1. Read the customer's message again.
2. Insert the saved reply.
3. Replace the placeholders, such as name, order number and date.
4. Add or change one sentence so it refers to their exact situation.
5. Remove any part that does not apply.

Example of a saved reply before personalising:

> "Hello [name], thank you for contacting us. Refunds take [number] working days to appear in your account."

After personalising for Fuseini, who has already waited a week:

> "Hello Fuseini, thank you for your patience, and I am sorry this has taken a week. Refunds normally take up to five working days, so yours is overdue. I have sent it to our payments team as urgent and will update you by tomorrow afternoon."

The facts came from the saved reply. The care came from the agent.

## Improving the knowledge base

Agents see the same questions every day, so you are in the best position to spot gaps. If you answer the same question three times in a shift and there is no article, suggest one to your team leader. If an article is confusing, suggest a clearer version. Many teams welcome this, and it shows you think beyond your own queue.

## Writing a simple help article

A good help article has:

* A title that matches how customers ask: "How do I reset my PIN?" rather than "Credential recovery".
* A one sentence answer at the top.
* Numbered steps, one action per step.
* What to do if the steps do not work.

## A worked example

Amina, working chat support for an invented school fees platform, notices that many parents ask how to download a payment receipt. There is no article. She writes a short draft with a clear title, four steps and a note on what to do if the receipt does not appear, and sends it to her team leader. Once approved, it becomes a public article, and she creates a saved reply that links to it.`,
      practice_task_md: `**Goal:** Write a help article and a saved reply.

**Steps:**
1. Choose a common question for an invented business, for example "How do I track my parcel?" or "How do I change my delivery address?"
2. Write a help article with a customer friendly title, a one sentence answer, numbered steps and a "still stuck?" line.
3. Write a saved reply for the same question with placeholders in square brackets.
4. Personalise the saved reply for a customer called Wumpini who says she has already tried tracking twice and it shows nothing.

**Done looks like:** One short help article, one saved reply and one personalised version, ready for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What should you do if you are unsure of the answer to a customer's question?",
            options: [
              "Give your best guess quickly",
              "Tell the customer to search online for the answer and come back if it does not work",
              "End the conversation",
              "Search the knowledge base and tell the customer you are checking",
            ],
            answer_index: 3,
            explanation: "The lesson says do not guess; search and keep the customer informed.",
          },
          {
            prompt: "Why should you check the date on a knowledge base article?",
            options: [
              "Policies change and old articles sometimes stay online",
              "Older articles are always more accurate because they have been checked for longer",
              "Customers only trust new articles",
              "Articles are deleted after a month",
            ],
            answer_index: 0,
            explanation: "An outdated article can give wrong information about current policies.",
          },
          {
            prompt: "In the example, what made the reply to Fuseini better than the plain saved reply?",
            options: [
              "It was shorter",
              "It apologised for the week's wait, said the refund was overdue and gave a next step and time",
              "It removed the refund timeline",
              "It asked him to contact his bank, since refunds over a week old are the bank's job to trace",
            ],
            answer_index: 1,
            explanation: "The agent personalised the reply to his actual situation and gave a clear next step.",
          },
          {
            prompt: "Which is the best title for a help article?",
            options: ["Credential recovery", "Article 17", "How do I reset my PIN?", "PIN"],
            answer_index: 2,
            explanation: "Titles should match how customers ask the question.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "solving-problems": {
      explanation_md: `Answering questions is part of the job. Solving problems is the part that customers remember. A customer who arrives worried and leaves with their problem fixed, or at least with a clear plan, will trust the business again. A customer who is passed around, asked the same questions three times and left without an answer will often leave for good and tell others why.

## What problem solving means in support

In support, solving a problem usually follows the same path:

1. **Understand what the customer is experiencing.** What do they see, and what did they expect?
2. **Find the real cause.** The first thing a customer says is often a symptom, not the cause.
3. **Fix it, or find who can.** Some problems you can solve yourself in a minute. Others need a supervisor, a technical team or the payments team.
4. **Tell the customer clearly** what you did or what happens next, and when.
5. **Record it** so the team learns and the next agent knows the story.

## The four lessons in this section

* **Asking questions to find the real problem.** A simple order of questions, plus first level troubleshooting: checking the app version, the network, the account status and what changed recently.
* **Handling complaints and upset customers.** Staying calm, apologising for the experience and agreeing a clear next step, and setting a polite limit if a customer becomes abusive.
* **Escalation and handover.** When to pass a case on, what to write so the customer does not have to repeat everything, and how to explain the next step.
* **Payments, refunds and account security.** Many support roles in Ghana deal with mobile money, card and bank payments. Mistakes here cost real cedis, and fraudsters target both customers and agents.

## Ownership

One idea runs through every lesson in this section: **ownership**. Even if you cannot fix a problem yourself, you can own the customer's experience until it is handed over properly. That means not saying "That is not my department" and leaving it there. It means saying "That is handled by our payments team. I will send it to them now with all the details, and you will hear from us by tomorrow afternoon."

## A worked example

Sumaila contacts an invented electricity token app. He says, "Your app is useless, I paid and got nothing." A weak agent argues about the word "useless". A strong agent ignores the insult, asks when he paid, how much, and from which wallet or card, and checks the transaction. It turns out the payment went through but the token was sent to an old meter number saved in his profile. The agent explains this, sends the payment details to the team that can move the token, updates his profile with the correct meter number, and tells him when to expect the token. Sumaila still had a bad morning, but he ends the chat knowing exactly what will happen.

That is the skill this section builds: calm, careful thinking that turns a vague complaint into a clear fix.`,
      practice_task_md: `**Goal:** Practise the five step problem solving path.

**Steps:**
1. Think of a real problem you or someone you know had with a service: a failed payment, a late delivery or an app that would not open.
2. Write it out using the five steps from the lesson: what the customer experienced, the likely real cause, who could fix it, what the customer should be told, and what record should be kept.
3. Rewrite the sentence "That is not my department" into an ownership sentence for your example.

**Done looks like:** A short five step write up of one real problem and one ownership sentence you could use with a customer.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what is often true about the first thing a customer says?",
            options: [
              "It is always the exact cause of the problem",
              "It is usually untrue",
              "It should be ignored",
              "It is often a symptom, not the cause",
            ],
            answer_index: 3,
            explanation: "The lesson says the first thing a customer describes is often a symptom, so you must find the real cause.",
          },
          {
            prompt: "What does 'ownership' mean in this section?",
            options: [
              "Fixing every problem yourself without asking anyone for help, even when it belongs to another team",
              "Owning shares in the company",
              "Taking care of the customer's experience until the case is properly handed over",
              "Telling the customer which department to call",
            ],
            answer_index: 2,
            explanation: "Ownership means you stay responsible for the customer's experience even when someone else fixes it.",
          },
          {
            prompt: "In the example, what was the real cause of Sumaila's problem?",
            options: [
              "The app was broken for every customer on the network that morning",
              "His payment failed",
              "The token went to an old meter number saved in his profile",
              "He typed the wrong amount",
            ],
            answer_index: 2,
            explanation: "Careful questions showed the payment worked but the token went to an old meter number.",
          },
          {
            prompt: "Which step comes last in the problem solving path?",
            options: [
              "Arguing with the customer",
              "Recording it so the team learns and the next agent knows the story",
              "Asking the customer to call again tomorrow, when a different agent may be able to help",
              "Offering a discount",
            ],
            answer_index: 1,
            explanation: "The fifth step is to record the case.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "finding-the-real-problem": {
      explanation_md: `"My app is not working." "My money has not reached." "The internet is bad." These are the kinds of messages support agents receive all day. None of them tells you what is actually wrong. Your job is to ask the right questions, in the right order, until you know. Employers and training programmes often call this issue identification, and it is tested in interviews with role plays.

## Start broad, then narrow down

A simple order of questions works for most problems:

1. **What exactly happens?** "When you open the app, what do you see on the screen?" Ask them to read out any error message word for word.
2. **What did you expect to happen?**
3. **When did it start?** Today, after an update, after changing phone?
4. **Has it ever worked?** If yes, what changed since then?
5. **Is it only you?** Can a family member log in? Does it happen on another network or device?
6. **What have you already tried?** This saves you asking them to repeat steps.

Use **open questions** (starting with what, when, how) to get the story, and **closed questions** (with yes or no answers) to confirm details: "So it worked yesterday, and today you see 'session expired'. Is that right?"

## First level troubleshooting

Many problems can be fixed with a few basic checks. These are often called first level or tier one troubleshooting:

* **Network:** Is mobile data or wifi on? Does a web page load? Is the signal weak in their area?
* **App version:** Is the app updated? Old versions sometimes stop working.
* **Account status:** Is the account active, blocked, or still waiting for the customer's ID checks (often called KYC, short for "know your customer")?
* **Recent changes:** New phone, new SIM, changed password, low storage, phone date and time wrong.
* **Restart:** Close and reopen the app, or restart the device. Simple, but it often works.

Go through checks one at a time and note the result of each. If the basic checks do not fix it, you have still narrowed the problem, and your notes make escalation much faster.

## Keep it simple for the customer

Many customers are not technical. Instead of "Clear your app cache", say "Let us go into your phone settings together. I will tell you each step." Wait for them to finish each step before giving the next. Never make a customer feel foolish for not knowing.

## A worked example

Hawa takes a chat for an invented savings app. The customer, Issahaku, writes: "App not working since morning."

Hawa asks what he sees. He sends a screenshot showing "Unable to connect". She asks if other apps work; WhatsApp is fine. She asks if anything changed; he says the app asked for an update yesterday and he skipped it. She asks him to update it from his app store. After the update, the app opens normally.

In her note she writes: "Unable to connect error. Other apps fine. Old app version. Updated, resolved." If many customers report the same error, her team leader will see the pattern quickly.`,
      practice_task_md: `**Goal:** Build and test your own question list.

**Steps:**
1. Write your own question list for this message: "I cannot log in to the app." Use the six question order from the lesson and at least three first level checks.
2. Mark each question as open or closed.
3. Role play with a friend. Secretly give them one of these causes: an old app version, a new SIM card, or no data on their bundle. Use your questions to find the cause.
4. Write a one line ticket note for each round.

**Done looks like:** A question list labelled open or closed, and three short ticket notes showing the cause you found each time.`,
      quiz: {
        questions: [
          {
            prompt: "What should you ask a customer to do with an error message?",
            options: [
              "Ignore it and restart the device",
              "Send it to a friend first",
              "Describe it roughly in their own words",
              "Read it out or share it word for word",
            ],
            answer_index: 3,
            explanation: "The lesson says ask them to read out any error message word for word.",
          },
          {
            prompt: "Which of these is a closed question?",
            options: [
              "What do you see on your screen?",
              "How did the problem start?",
              "So it worked yesterday and today it shows 'session expired'. Is that right?",
              "What have you already tried?",
            ],
            answer_index: 2,
            explanation: "Closed questions have yes or no answers and are used to confirm details.",
          },
          {
            prompt: "Which is a first level troubleshooting check from the lesson?",
            options: [
              "Rewriting the app's code",
              "Checking whether the app is updated",
              "Replacing the customer's phone",
              "Changing the company's prices",
            ],
            answer_index: 1,
            explanation: "Checking the app version is one of the basic checks listed.",
          },
          {
            prompt: "Why should you note the result of each check, even if the problem is not fixed?",
            options: [
              "To make the ticket longer",
              "Because it narrows the problem and makes escalation faster",
              "So the customer can be blamed later",
              "Because notes are only needed once a problem has been solved",
            ],
            answer_index: 1,
            explanation: "Notes show what has been ruled out, which helps the next team.",
          },
          {
            prompt: "In the example, what fixed Issahaku's problem?",
            options: [
              "Restarting his network",
              "Resetting his password",
              "Updating the app he had not updated",
              "Escalating it to the technical team after the first check failed",
            ],
            answer_index: 2,
            explanation: "He had skipped an update; updating the app fixed the connection error.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "complaints-and-upset-customers": {
      explanation_md: `Every support agent meets upset customers, sometimes several in one shift. It helps to remember that an angry customer is usually a worried or disappointed one. Their money is stuck, their order is late or they feel ignored. They are angry at the situation, not at you personally, even when it sounds personal. Handling complaints well is one of the most valued skills in support, and it can be learned.

## A calm method: LISTEN

Use this simple sequence:

* **Let them talk.** Do not interrupt. Many customers calm down once they have said everything.
* **Identify the real issue.** Underneath the anger, what went wrong and what do they want?
* **Say sorry for the experience.** "I am sorry this has happened" is honest even when the company followed the rules.
* **Take ownership.** "Let me look into this for you."
* **Explain what you can do.** Be specific and honest about what is possible.
* **Nail down the next step.** Agree what happens next and when, then do it.

## Apologise without blaming anyone

A good apology does not blame the customer, a colleague or another department. "I am sorry your refund has taken longer than we said" is better than "Sorry, the payments team is very slow." Do not admit fault for things you have not checked, but always acknowledge the customer's experience.

## Do not take the bait

When a customer insults the company, do not defend it with an argument. Arguments make calls longer and angrier. Stay with the facts and the next step. Keep your voice low and slow; people often match the tone they hear.

## When a customer becomes abusive

Being upset is normal. Abuse is different: insults aimed at you, threats, or sexist, ethnic or religious slurs. Your company should have a policy, and you should follow it. A common approach is to give a clear, polite warning:

> "I want to help you with this, but I need us to keep the conversation respectful. If the insults continue, I will have to end the call."

If it continues, end the contact politely, write a factual note and tell your team leader. Protecting yourself is part of doing the job well, not a failure.

## Know what you can offer

Find out early what you are allowed to offer: a refund, a replacement, a fee waiver, a callback from a supervisor. Never promise something you are not allowed to give. A broken promise turns one complaint into two.

## A worked example

Mariama works for an invented betting and payments company. A customer calls shouting that his withdrawal has been "stolen". Mariama lets him finish, then says: "I am sorry, I can hear how worrying this is. Let me check it right now." She verifies him and sees the withdrawal is pending because the wallet number he entered does not match his registered number. She explains this calmly, tells him which number is registered, and takes him through the correct steps under her company's process. His voice drops halfway through. At the end he apologises for shouting. Mariama thanks him for his patience and writes a clear note.`,
      practice_task_md: `**Goal:** Practise staying calm under pressure.

**Steps:**
1. Write down the six LISTEN steps on a card or in your notes.
2. Ask a friend to play an angry customer whose order arrived damaged. Ask them to be loud and repeat themselves, but not abusive.
3. Handle the complaint using LISTEN. Afterwards, ask your friend at which point they felt calmer.
4. Write your own polite warning sentence for an abusive customer, in your own words.
5. Write a factual ticket note for the role play, with no opinions about the customer's character.

**Done looks like:** Your LISTEN card, a short note on what calmed your friend, your warning sentence and one factual ticket note.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what is an angry customer usually feeling underneath?",
            options: [
              "Boredom",
              "A wish to waste time",
              "Dislike of the agent personally and of the company",
              "Worry or disappointment about the situation",
            ],
            answer_index: 3,
            explanation: "The lesson says angry customers are usually worried or disappointed about the situation.",
          },
          {
            prompt: "Which is the best apology?",
            options: [
              "Sorry, the payments team is very slow.",
              "Sorry, but you should have read the terms.",
              "I am sorry your refund has taken longer than we said.",
              "Sorry, that is just how it is.",
            ],
            answer_index: 2,
            explanation: "A good apology acknowledges the experience without blaming anyone.",
          },
          {
            prompt: "What should you do if a customer becomes abusive?",
            options: [
              "Shout back so they stop",
              "Give a polite warning, then end the contact if it continues, note it and tell your team leader",
              "Hang up immediately without saying anything",
              "Accept the abuse quietly because the customer is always right, then carry on with the call",
            ],
            answer_index: 1,
            explanation: "The lesson describes a clear warning, then ending politely, a factual note and telling the team leader.",
          },
          {
            prompt: "Why should you never promise something you are not allowed to give?",
            options: [
              "Because promises are against the law",
              "Because only managers are allowed to speak to customers about refunds",
              "Because customers never believe promises",
              "Because a broken promise turns one complaint into two",
            ],
            answer_index: 3,
            explanation: "The lesson warns that broken promises create a second complaint.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "escalation-and-handover": {
      explanation_md: `No agent can fix everything. Some problems need a supervisor's approval, a technical team's access or another department's knowledge. Passing a case to someone with more authority or skill is called escalation. Escalating at the right time, with the right information, is a mark of a strong agent. Escalating too late leaves customers waiting; escalating badly makes them repeat their whole story.

## When to escalate

Every company has its own rules, so learn them early. Common reasons include:

* **It is outside your access or authority.** For example a refund above your limit, or a system you cannot see.
* **You have done the first level checks and it is still not fixed.**
* **Many customers report the same problem at once.** This may be an outage, and team leaders need to know fast.
* **There is risk:** suspected fraud, a threat to someone's safety, a legal complaint or a request from the media.
* **The customer asks for a supervisor** and your policy allows it. Try to help first, but do not block a reasonable request.

## What to write in the handover note

A good escalation note means the next person can act without contacting the customer again. Include:

1. **Customer details** (as recorded in the system, already verified).
2. **The problem in one line.**
3. **What you checked and the results.**
4. **What the customer wants.**
5. **Any deadline or urgency**, such as travel tomorrow or a school fees deadline.
6. **What you told the customer** about next steps and timing.

Example:

> "Customer Fuseini, verified. Bought 50 cedis of airtime from wallet at 08:12, wallet debited, airtime not received. Checked: transaction shows success on our side, his number is correct, no reversal yet. Wants airtime or refund. Told him payments team will reply by 4pm today."

## Telling the customer

Be honest and specific. Avoid "Someone will call you." Say who, roughly when and what they should do in the meantime:

> "I have sent this to our payments team with all the details, so you will not need to explain it again. They usually reply within the day, and I have asked them to contact you by 4pm. If you have not heard by then, reply to this message with your reference number, 7731."

Only give timings your team can actually meet.

## Warm and cold handovers

A **warm handover** is when you speak to the next person before passing the customer, on a call transfer or in a team chat, so they are ready. A **cold handover** is when the case is simply moved to another queue. Warm handovers feel better to customers, so use them when your system and time allow, especially for upset or vulnerable customers.

## Follow up

Escalated does not mean forgotten. If you promised to check back, set a reminder. If the other team has not acted by the time you promised, chase them and update the customer. Your name is on the promise.`,
      practice_task_md: `**Goal:** Write escalation notes that need no follow up questions.

**Steps:**
1. Choose two invented cases: a customer charged twice for a bus ticket, and a customer whose account is blocked after entering a wrong PIN several times.
2. For each, write an escalation note with all six parts from the lesson.
3. Write what you would tell each customer, including who will act, roughly when, and what to do if they hear nothing.
4. Ask a friend or mentor to read one note and tell you if they would need to ask the customer anything else. Improve it if so.

**Done looks like:** Two complete escalation notes and two customer messages, checked by someone else if possible.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a good reason to escalate?",
            options: [
              "The customer has a long name",
              "You want to finish your shift early",
              "Many customers report the same problem at once",
              "The customer asked a simple question about opening hours",
            ],
            answer_index: 2,
            explanation: "Many reports at once may mean an outage, which team leaders need to know about fast.",
          },
          {
            prompt: "What is the main purpose of a handover note?",
            options: [
              "To prove to the next team that the customer was difficult and rude to you",
              "To let the next person act without contacting the customer again",
              "To make the ticket longer",
              "To close the ticket automatically",
            ],
            answer_index: 1,
            explanation: "A complete note means the customer does not have to repeat their story.",
          },
          {
            prompt: "Which message to the customer is best after escalating?",
            options: [
              "Someone will call you.",
              "It is not my department any more.",
              "I have sent this to our payments team with all the details. They will contact you by 4pm. If you hear nothing, reply with reference 7731.",
              "Please wait and do not contact us again.",
            ],
            answer_index: 2,
            explanation: "Good messages say who, when and what to do if nothing happens.",
          },
          {
            prompt: "What is a warm handover?",
            options: [
              "Passing a case after speaking to the next person so they are ready",
              "Moving a case to another queue without telling anyone",
              "Giving the customer a discount before transferring",
              "Ending the call politely and asking the customer to call another number for the right team",
            ],
            answer_index: 0,
            explanation: "A warm handover means briefing the next person before passing the customer.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "payments-and-account-security": {
      explanation_md: `Many support jobs in Ghana involve money: mobile money wallets, bank apps, card payments, school fees platforms, betting accounts and online shops. Customers contact support about failed transfers, money sent to the wrong number, double charges, reversals and refunds. These conversations matter more than most because real cedis are involved, and because fraudsters target exactly these situations.

## Common payment problems

* **Debited but not received.** The customer's wallet or account shows a deduction, but the receiver or service did not get it. Often the transaction is pending or failed on one side and needs checking by transaction ID.
* **Sent to the wrong number.** The customer typed a wrong digit. Your company's process will say what can be done; often it involves the provider contacting the receiver, and the outcome is not guaranteed.
* **Double charge.** The customer paid twice, often after a slow network made them try again.
* **Refunds and reversals.** A refund returns money for a product or service. A reversal undoes a transaction. Each has its own process and timeline at your company.

For every payment problem, collect the facts calmly: date, time, amount, the number or account it came from, the receiver, and the **transaction ID** from the confirmation message. Never promise money back until your process confirms it can be done.

## Verify, never ask for secrets

Before discussing any account, verify the customer using your company's approved checks. But some information must **never** be requested by anyone, ever:

* PINs
* Passwords
* One time codes sent by SMS
* Full card numbers with the security code

If a customer starts to share one of these, stop them: "Please do not share your PIN with me or anyone. We will never ask for it." If they already shared it, follow your process, which usually means advising them to change it straight away.

## Fraud and impersonation tricks

Fraudsters often pretend to be customer service. Learn the common patterns so you can warn customers and spot them yourself:

* **The fake reversal.** Someone sends a message that looks like a payment confirmation, then calls saying they sent money by mistake and asks for it back. The "payment" never arrived. Always tell customers to check their actual balance, not a message.
* **The fake agent.** A caller claims to be from the provider, says the account will be blocked and asks for a PIN or code.
* **The SIM or account takeover.** A fraudster tries to get a replacement SIM for the customer's number, or to change the phone number or email on their account, so that codes and alerts go to the fraudster. That is why SIM replacements and changes to contact details need extra checks.
* **Fake support pages** on social media asking customers to message a private number.

Agents can be targeted too, with requests to look up someone's details "as a favour" or pressure to skip checks. Never do this, and report it. The Bank of Ghana regulates payment services and Ghana's Cyber Security Authority gives public advice on scams; your employer's process comes first, but both are official places to learn more.

## A worked example

Wumpini works for an invented school fees platform. A parent, Amina, calls: she paid 450 cedis twice because the network was slow. Wumpini verifies her, asks for both transaction IDs, sees two successful payments, and logs a refund request for the duplicate under company process. She tells Amina when to expect it, and reminds her never to share her PIN with anyone who calls claiming to help.`,
      practice_task_md: `**Goal:** Handle a payment complaint safely and warn against fraud.

**Steps:**
1. Write a list of the facts you need for any payment complaint, using the lesson as a guide.
2. Write what you would say if a customer begins to read out their PIN to you.
3. Write a short WhatsApp style message, under 60 words, warning customers about the fake reversal trick.
4. Role play with a friend: they are a customer who sent 200 cedis to a wrong number. Collect the facts, explain honestly that recovery is not guaranteed and describe the next step.

**Done looks like:** A fact checklist, a PIN stop sentence, a fraud warning message and notes from your role play.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these should a support agent never ask a customer for?",
            options: [
              "The transaction ID",
              "The date and amount of the payment",
              "The customer's PIN",
              "The receiver's number",
            ],
            answer_index: 2,
            explanation: "PINs, passwords, one time codes and full card details must never be requested.",
          },
          {
            prompt: "What is the fake reversal trick?",
            options: [
              "A real refund that arrives late",
              "A fraudster sends a fake payment message and then asks the person to send the money back",
              "A double charge caused by a slow network, which the company later reverses",
              "A company policy for wrong transfers",
            ],
            answer_index: 1,
            explanation: "The fraudster fakes a confirmation message; the money never arrived, so customers must check their real balance.",
          },
          {
            prompt: "What should you tell a customer who sent money to a wrong number?",
            options: [
              "That the money will definitely be returned to them by the end of today, whatever happens",
              "That nothing can ever be done",
              "The honest next step under your company's process, without promising the outcome",
              "To call the receiver and threaten them",
            ],
            answer_index: 2,
            explanation: "The lesson says follow the process and never promise money back until it is confirmed.",
          },
          {
            prompt: "Why do changes to a customer's phone number or email need extra checks?",
            options: [
              "Because fraudsters try to take over accounts by changing contact details",
              "Because customers are not allowed to change the numbers they first registered with",
              "Because it costs the company money",
              "Because the CRM cannot store new numbers",
            ],
            answer_index: 0,
            explanation: "The account takeover trick relies on changing contact details.",
          },
          {
            prompt: "What should you collect for every payment complaint?",
            options: [
              "Date, time, amount, sender, receiver and transaction ID",
              "The customer's PIN and password",
              "Only the customer's name",
              "A photo of the customer",
            ],
            answer_index: 0,
            explanation: "These facts let you or the payments team find and check the transaction.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "quality-and-wellbeing": {
      explanation_md: `Doing support well for one day is not hard. Doing it well every day, for months, across hundreds of customers, takes three more things: knowing how your work is measured, protecting the personal data you see, and looking after yourself through long shifts. This section covers all three. Employers ask about them in interviews, and they decide whether a new agent thrives or burns out.

## Quality: how your work is measured

Support teams track numbers so they can see how well customers are being served. You will hear terms such as first response time, handling time, first contact resolution and customer satisfaction score. Your targets will usually be built from these. The next lesson explains each one in plain words and, more importantly, how to improve your results without rushing customers or cutting corners.

Many teams also have **quality reviews**, where a team leader or quality analyst listens to some of your calls or reads some of your chats and scores them against a checklist: did you greet properly, verify, understand the issue, give correct information, close well and write a good note? These reviews are not a punishment. They are one of the fastest ways to improve, especially in your first months.

## Data protection: the trust you are given

As an agent you can see names, phone numbers, addresses, account balances and sometimes ID numbers. Customers trust the company with this information, and the company trusts you. Ghana has a data protection law, the Data Protection Act, 2012 (Act 843), overseen by the Data Protection Commission. You do not need to be a lawyer, but you do need safe daily habits. The data protection lesson covers them.

## Wellbeing: lasting in the job

Back to back calls, night shifts, upset customers and targets can wear anyone down. Looking after your body and mind is not a luxury; it is how you stay good at the job. The stress and shifts lesson gives you practical habits for recovery between contacts, sleep and meals around shifts, and asking for help early.

## How the three connect

These topics support each other. A tired agent makes more mistakes, which hurts quality scores and can lead to data mistakes such as discussing the wrong customer's account. A careful agent who follows good habits scores better and feels less stress, because fewer things go wrong.

## A small example

Amina has been on a chat team in Accra for three months, after growing up in Bolgatanga. Her first quality review shows good empathy but weak notes, and her handling time is higher than the team target. Her team leader suggests saved replies for common questions and a simple note format. Amina also notices she skips lunch on busy days and feels foggy by evening, so she starts taking her break on time. A month later her notes are clearer, her handling time is closer to target, and she feels better at the end of each shift. Nothing dramatic changed; small habits did the work.`,
      practice_task_md: `**Goal:** Reflect on quality, privacy and wellbeing in your own routines.

**Steps:**
1. Write a short quality checklist for one customer conversation, with at least six items (for example: greeted by name, verified, repeated the problem back).
2. Use it to score one of your earlier practice role plays or written replies from this track. Note one thing to improve.
3. List three pieces of personal information you have seen in a group chat, school or shop that should have been kept private.
4. Write down your current sleep and meal times for a normal day. Circle one habit you could improve.

**Done looks like:** A six item checklist with one scored example, a list of three privacy observations, and one wellbeing habit to work on.`,
      quiz: {
        questions: [
          {
            prompt: "What is a quality review in a support team?",
            options: [
              "A punishment where agents who make mistakes lose part of their pay for the month",
              "A team leader or analyst scoring some of your calls or chats against a checklist to help you improve",
              "A customer survey sent after every call",
              "A review of the company's prices",
            ],
            answer_index: 1,
            explanation: "The lesson describes quality reviews as checklist scoring of your work, meant to help you improve.",
          },
          {
            prompt: "Which law does the lesson name for personal data in Ghana?",
            options: [
              "The Data Protection Act, 2012 (Act 843)",
              "The Electronic Payments Act",
              "The Customer Service Act",
              "The Telecommunications Charter of Ghana, 2012",
            ],
            answer_index: 0,
            explanation: "The lesson names the Data Protection Act, 2012 (Act 843), overseen by the Data Protection Commission.",
          },
          {
            prompt: "How can tiredness affect an agent's work, according to the lesson?",
            options: [
              "It leads to more mistakes, hurting quality and risking data errors",
              "It has no effect if the agent is experienced, because experience keeps quality steady",
              "It makes calls shorter and better",
              "It only matters on night shifts",
            ],
            answer_index: 0,
            explanation: "The lesson links tiredness to more mistakes, including data mistakes.",
          },
          {
            prompt: "In the example, what helped Amina improve?",
            options: [
              "Working longer hours without breaks",
              "Ignoring her quality review",
              "Changing to a different company",
              "Small habits: saved replies, a note format and taking breaks on time",
            ],
            answer_index: 3,
            explanation: "Small habits in work and rest improved her notes, handling time and energy.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "service-metrics": {
      explanation_md: `Support teams cannot see every conversation, so they use measurements to understand how customers are being served. Adverts in Ghana often mention KPIs (key performance indicators) and targets, and interviewers may ask what you know about them. Understanding the common measures helps you meet your targets and, just as important, helps you see when chasing a number would hurt a customer.

## The common measures

* **First response time.** How long a customer waits before getting a first reply. Important in chat, WhatsApp, email and social media.
* **Average handling time.** How long a contact takes from start to finish, including after call work such as notes.
* **First contact resolution.** Whether the problem was solved in the first contact, without the customer having to come back.
* **Customer satisfaction score (CSAT).** Customers answer a short question after the contact, such as "How satisfied were you?" on a simple scale.
* **Service level.** Whether contacts are answered within an agreed time. A service level agreement, or SLA, is a promise about response or resolution times, either to customers or between teams.
* **Quality score.** The score from a quality review of your calls or chats.
* **Adherence.** Whether you are logged in and available when your schedule says you should be.

Your company will set its own targets for these. Learn them in your first week.

## Measures can pull against each other

Handling time and first contact resolution often pull in opposite directions. If you rush a call to keep handling time low, the customer may call back because the problem was not really fixed. That lowers first contact resolution and satisfaction, and the second call takes more time overall. Good agents aim for the customer's problem to be properly solved, as efficiently as possible.

## Improving your numbers the right way

* **Use the knowledge base and saved replies** so you are not searching from scratch.
* **Ask good questions early** to find the real problem faster.
* **Write notes during the contact**, not long after.
* **Set clear expectations.** Customers who know what happens next are less likely to call back.
* **Check the solution worked** before closing.
* **Learn from your quality reviews.** Ask your team leader for one thing to focus on each week.

What not to do: close tickets before they are solved, transfer customers to avoid hard problems, or rush people off the phone. These may improve one number briefly, but quality reviews and repeat contacts reveal them.

## A worked example

Issahaku works on phone support for an invented internet provider. His handling time is above target. He listens to two of his own recorded calls with his team leader and notices he spends a long time searching for the steps to reset a router. He creates a simple checklist for that problem and practises it. His handling time comes down, but his first contact resolution stays strong because he still checks that the internet works before ending each call.`,
      practice_task_md: `**Goal:** Understand how measures connect and improve your own.

**Steps:**
1. Write each of the seven measures from the lesson in your own words, one sentence each.
2. For first contact resolution and average handling time, write one example of how rushing a contact could improve one and hurt the other.
3. Time yourself writing a full reply to an invented customer email, then use a saved reply you write yourself and time it again. Note the difference and check both answers are complete.
4. Write three things you would ask your team leader in your first week about targets.

**Done looks like:** Seven definitions, one trade off example, two timings with a note, and three questions for a team leader.`,
      quiz: {
        questions: [
          {
            prompt: "What does first contact resolution measure?",
            options: [
              "How fast the phone was answered",
              "Whether the problem was solved in the first contact without the customer coming back",
              "How many customers contacted support in a single day across all channels",
              "The first agent who replied",
            ],
            answer_index: 1,
            explanation: "First contact resolution checks whether the issue was solved the first time.",
          },
          {
            prompt: "What is an SLA?",
            options: [
              "A type of help desk software",
              "A promise about response or resolution times",
              "A customer's complaint letter",
              "A training certificate that agents earn after their first month",
            ],
            answer_index: 1,
            explanation: "A service level agreement is a promise about response or resolution times.",
          },
          {
            prompt: "Why can rushing a call to lower handling time backfire?",
            options: [
              "Because short calls are not allowed",
              "Because customers prefer long calls",
              "Because handling time is not measured on calls, only on chats and emails, so rushing changes nothing",
              "Because the customer may call back, lowering first contact resolution and satisfaction",
            ],
            answer_index: 3,
            explanation: "The lesson explains that unsolved problems lead to repeat contacts.",
          },
          {
            prompt: "Which is a good way to improve your numbers?",
            options: [
              "Close tickets before they are solved",
              "Transfer difficult customers to others so your own scores stay high",
              "Use the knowledge base and write notes during the contact",
              "Skip verification to save time",
            ],
            answer_index: 2,
            explanation: "Using the knowledge base and writing notes during the contact are listed as good habits.",
          },
          {
            prompt: "What does adherence measure?",
            options: [
              "Whether you are logged in and available when your schedule says",
              "How polite you are",
              "How many products you sell",
              "How many languages you speak",
            ],
            answer_index: 0,
            explanation: "Adherence measures whether you are available when scheduled.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "protecting-customer-data": {
      explanation_md: `Every day, support agents see personal information that customers would never share with a stranger: phone numbers, home areas, account balances, payment history and sometimes ID card numbers. Customers trust the company to keep it safe, and the company trusts you. A single careless moment, such as a screenshot shared in a group chat, can harm a customer and cost you your job. This lesson gives you the safe habits employers expect.

## The law in simple words

Ghana's Data Protection Act, 2012 (Act 843) sets rules for how organisations collect, use and store personal data. The Data Protection Commission oversees it. In simple words, the law expects organisations to collect only what they need for a clear purpose, keep it accurate, keep it secure, and use it only for that purpose. Customers also have rights, such as asking what information a company holds about them. A new data protection bill has been proposed to replace Act 843, so check the Commission's website for the current law. Your employer will have policies that put the law into practice. Follow them, and ask when unsure.

## Safe habits for agents

**Verify before you share.** Only discuss an account after the person passes your company's verification checks. A caller who knows the customer's name is not necessarily the customer. Family members, even close ones, usually cannot access someone else's account without proper authority.

**Share the minimum.** Give the customer what they need, nothing more. If someone asks for "all the details" on an account, think about whether they really need each part.

**Never take data outside work systems.**

* Do not take photos or screenshots of customer records.
* Do not copy customer details into your personal WhatsApp, notes app or email.
* Do not discuss customers by name with friends or family, even as a funny story.

**Lock your screen** every time you step away, even for a minute. Use strong passwords for work systems and never share your login with a colleague.

**Watch your surroundings.** In an office, at home or in a shared space, make sure others cannot see your screen or hear sensitive details. Remote agents should work somewhere private and use headphones.

**Be careful with links and attachments.** Fraudsters send fake emails to agents too. If a message asks you to log in through a link or open an unexpected file, check with your team first.

**Report mistakes quickly.** If you send something to the wrong person or open the wrong account, tell your team leader straight away. Fast reporting limits the damage. Hiding it makes it worse.

## A worked example

Fuseini works remotely for an invented health insurance helpline, from his family home in Tamale. His younger brother asks to use the laptop to watch a video while Fuseini is on a break. Fuseini says no, because the laptop has the work system open and is for work only. He locks the screen before leaving his desk. Later a caller says, "I am calling for my uncle, please read me his last claim." Fuseini explains politely that he can only discuss the account with the member or someone formally authorised, and tells the caller how the uncle can add him as an authorised contact.

Fuseini was not unhelpful. He protected his customer, his employer and himself.`,
      practice_task_md: `**Goal:** Build your personal data protection checklist.

**Steps:**
1. Write a checklist of at least eight safe habits from this lesson that you will follow in any support job.
2. Look at the space where you usually use your phone or computer. Write down two things someone nearby could see or hear, and how you would fix them for remote work.
3. Write what you would say politely to a caller who asks for information about a relative's account.
4. Check that your own phone or computer locks automatically after a short time. If it does not, turn that setting on.

**Done looks like:** An eight item checklist, two workspace fixes, one polite script for a relative's request, and your device's automatic lock turned on.`,
      quiz: {
        questions: [
          {
            prompt: "What does Ghana's Data Protection Act expect organisations to do with personal data, in simple terms?",
            options: [
              "Collect as much as possible in case it is useful later, as long as it is stored on company computers",
              "Collect only what they need for a clear purpose, keep it accurate and secure, and use it for that purpose",
              "Share it freely with partner companies",
              "Delete all data every day",
            ],
            answer_index: 1,
            explanation: "The lesson summarises the law as collecting only what is needed, keeping it accurate and secure, and using it for that purpose.",
          },
          {
            prompt: "Which action breaks safe data habits?",
            options: [
              "Locking your screen when you step away",
              "Verifying a caller before discussing the account",
              "Taking a screenshot of a customer record to ask a friend for advice",
              "Reporting a mistake to your team leader quickly",
            ],
            answer_index: 2,
            explanation: "Customer data must never be taken outside work systems, including in screenshots.",
          },
          {
            prompt: "A caller knows the customer's full name. What should you do?",
            options: [
              "Still complete your company's verification checks before discussing the account",
              "Share the account details, because knowing the name is enough",
              "End the call immediately",
              "Ask for the customer's PIN to be sure",
            ],
            answer_index: 0,
            explanation: "Knowing a name is not verification; follow the company's checks, and never ask for a PIN.",
          },
          {
            prompt: "What should you do if you open the wrong customer's account by mistake?",
            options: [
              "Close it and say nothing",
              "Tell your team leader straight away",
              "Delete the record",
              "Ask the customer to keep it secret",
            ],
            answer_index: 1,
            explanation: "Fast reporting limits the damage; hiding mistakes makes them worse.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "stress-and-shifts": {
      explanation_md: `Support work can be demanding. You may take one call after another, handle upset customers, chase targets and work early mornings, late evenings or nights, especially in call centres and remote teams serving other time zones. Stress is a normal response to pressure, but too much of it for too long wears down your health, your mood and your work. Training programmes for support roles teach stress management for good reason. This lesson gives you practical habits that work.

## Recover between contacts

Even short pauses help. After a hard call or chat:

* **Breathe slowly.** Breathe in through your nose for a count of four, out through your mouth for a count of six. Repeat three times.
* **Let it go.** The customer was angry at the situation, not at you. Write your note, then mentally close the case.
* **Move a little.** Stretch your shoulders and neck, or stand up for a moment if your team allows.
* **Drink water.** Talking all day dries your throat and tires you faster.

Use your scheduled breaks fully. Skipping lunch to clear a queue feels helpful but usually makes the afternoon worse.

## Sleep and meals around shifts

Shift work disturbs your body clock, so plan around it:

* Try to sleep at similar times on work days, even if they are unusual times.
* After a night shift, make your sleeping space dark and quiet. Tell family your sleeping hours so they can help.
* Eat proper meals at regular points in your shift. Heavy meals right before a shift can make you sleepy; very sugary snacks give quick energy and then a drop.
* Be careful with too much caffeine late in a shift, as it can stop you sleeping afterwards.
* Plan safe transport if your shift ends late at night.

## Protect your voice and eyes

Speak from a relaxed throat rather than shouting. Use a headset at a comfortable volume. Look away from the screen at something far away every so often to rest your eyes.

## Ask for help early

Signs you may be under too much stress include trouble sleeping, feeling tense all the time, losing interest in things you enjoy, headaches, or dreading every shift. If you notice these, talk to someone you trust: your team leader, a colleague, family, a religious leader or a health worker. Many employers have support for staff wellbeing. Asking early is a strength, not a weakness. If you ever feel overwhelmed or have thoughts of harming yourself, speak to a health worker straight away or go to the nearest clinic or hospital.

## A worked example

Sumaila starts night shifts on a remote chat team serving customers in another time zone. In his first week he sleeps whenever he can, drinks a lot of coffee and feels terrible. He then makes a plan: he sleeps from 8am to 3pm with a cloth over the window, eats a proper meal before each shift, stops coffee after midnight and does the breathing exercise after difficult chats. He also tells his team leader he is struggling, who pairs him with an experienced colleague for a week. By the end of the month he feels much steadier.`,
      practice_task_md: `**Goal:** Make a personal plan for coping with stress and shifts.

**Steps:**
1. Practise the breathing exercise from the lesson three times today and note how you feel afterwards.
2. Imagine you have been given a shift from 10pm to 6am. Write a daily plan showing sleep, meals, travel and rest.
3. Write a list of three people you could talk to if work stress builds up.
4. Write two short sentences you could say to a team leader to ask for help, in your own words.

**Done looks like:** A note on the breathing exercise, a written shift day plan, a list of three support people, and two sentences for asking for help.`,
      quiz: {
        questions: [
          {
            prompt: "What is a good thing to do straight after a difficult call?",
            options: [
              "Take the next call immediately without pausing",
              "Breathe slowly, write your note and mentally close the case",
              "Call the customer back to argue",
              "Skip your next break to make up time",
            ],
            answer_index: 1,
            explanation: "The lesson suggests slow breathing, finishing the note and letting the call go.",
          },
          {
            prompt: "Which habit helps after a night shift?",
            options: [
              "Making your sleeping space dark and quiet and telling family your sleep hours",
              "Drinking strong coffee just before sleeping so you wake up alert for the next shift",
              "Sleeping at a different time every day",
              "Skipping meals to sleep longer",
            ],
            answer_index: 0,
            explanation: "A dark, quiet space and family support help daytime sleep.",
          },
          {
            prompt: "Why does the lesson advise using scheduled breaks fully?",
            options: [
              "Because breaks are the only time agents are allowed to check their phones and social media",
              "Because customers prefer agents who take breaks",
              "Because team leaders measure breaks only",
              "Because skipping them usually makes the rest of the shift worse",
            ],
            answer_index: 3,
            explanation: "Skipping breaks feels helpful but usually leaves you more tired later.",
          },
          {
            prompt: "Which is a sign you may be under too much stress?",
            options: [
              "Enjoying a good conversation with a customer",
              "Trouble sleeping and dreading every shift",
              "Feeling hungry at lunchtime",
              "Wanting to learn a new skill",
            ],
            answer_index: 1,
            explanation: "The lesson lists trouble sleeping and dreading shifts among the warning signs.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-hired-support": {
      explanation_md: `Customer service is one of the more open doors into work for young people in Ghana, but it is still competitive. Many applicants say they are "good with people". Employers want to see it. They test how you write, how you speak and how you solve problems, often before they look closely at certificates. The good news is that all three can be shown with practice you do yourself.

## How support employers usually hire

Hiring steps vary, but these are common:

* **An application or CV**, sometimes with a short written question about why you want the role.
* **A typing test**, measuring speed and accuracy, especially for chat and email roles.
* **A written test**, such as replying to a sample customer email or chat.
* **A voice or phone screening**, where someone checks your spoken English and how clearly you speak.
* **A role play**, where an interviewer plays a customer with a problem.
* **An interview** about your experience, your availability for shifts and how you handle pressure.

Remote roles may also check your internet connection, your computer and your workspace.

## What employers look for

Across adverts and training programmes, the same qualities appear:

* Clear written and spoken English, and sometimes a local language.
* Patience and calm with difficult people.
* Accuracy with details such as numbers and names.
* Comfort using a computer and new software.
* Reliability: arriving on time, available for agreed shifts.
* Willingness to learn from feedback.

Experience helps, but it does not have to be a formal job. Helping at a family shop, running a church or school WhatsApp group, volunteering at an event or serving customers during national service all count, as long as you can describe what you did.

## Show, do not just tell

Your practice tasks from this track become evidence. A sample email reply, a recorded practice call, a few mock tickets and a help article show an employer what you can do far better than a list of adjectives. The next lesson shows you how to put these together into a simple portfolio.

## Where this section goes

* **A practice portfolio for support roles:** collecting and polishing your best work.
* **Finding support roles and programmes:** where to look, how to read adverts, how to prepare for tests and how to spot fake job offers.

## A small example

Hawa from Wa applies for a chat support role. Her CV is short because she has only worked in her mother's provisions shop. But in the written test, she replies to an angry customer with a calm, clear, well structured message, and in the role play she repeats the problem back, checks the facts and agrees a next step. Afterwards she shares a link to her practice portfolio. The interviewer can see what she will be like on the job, and that matters more than a long CV.`,
      practice_task_md: `**Goal:** Prepare your story for support interviews.

**Steps:**
1. Write down three experiences where you helped people, solved a problem or handled a difficult person: at home, in a shop, in school, in church or in a group.
2. For each, write four short lines: the situation, what you did, how you did it, and the result.
3. Practise saying one of them aloud in under one minute. Record it on your phone or computer and listen back.
4. Look back at your earlier practice tasks in this track and list which ones could go in a portfolio.

**Done looks like:** Three written experience stories, one recorded answer under a minute, and a list of practice tasks to include in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a common step in hiring for support roles?",
            options: [
              "A coding test",
              "A typing test and a role play with a pretend customer",
              "A driving test",
              "A drawing test",
            ],
            answer_index: 1,
            explanation: "The lesson lists typing tests and role plays among common hiring steps.",
          },
          {
            prompt: "What kinds of experience does the lesson say can count, even if not a formal job?",
            options: [
              "Only paid work at a large company with a written contract and a reference letter",
              "None; only certificates count",
              "Only experience abroad",
              "Helping at a family shop, running a group, volunteering or national service, if you can describe what you did",
            ],
            answer_index: 3,
            explanation: "Informal experience counts when you can describe it clearly.",
          },
          {
            prompt: "Why does the lesson say to 'show, not just tell'?",
            options: [
              "Because work samples show what you can do better than a list of adjectives",
              "Because employers do not read CVs at all and only look at samples of your work",
              "Because portfolios are required by law",
              "Because telling is rude in interviews",
            ],
            answer_index: 0,
            explanation: "Samples such as emails, recorded calls and tickets prove your skills.",
          },
          {
            prompt: "In the example, what helped Hawa stand out despite a short CV?",
            options: [
              "She had a degree",
              "Her calm written test, strong role play and practice portfolio",
              "She knew the interviewer",
              "She offered to work for the first month without pay to prove herself",
            ],
            answer_index: 1,
            explanation: "Her test, role play and portfolio showed how she would perform on the job.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "support-practice-portfolio": {
      explanation_md: `When you have no formal support experience, a small practice portfolio is one of the strongest things you can show. It proves you can write a clear reply, handle a call and keep proper records before anyone has to take a chance on you. Training programmes and employers both respond well to concrete samples, and putting one together also prepares you for written tests and role plays.

## What to include

Aim for a small, polished collection rather than a big messy one:

* **Two or three email replies:** for example a refund request, a delayed order and a complaint. Show the customer's message and your reply.
* **Two chat conversations:** using the acknowledge, check, update pattern, including one where the customer is upset.
* **One recorded practice call**, two to four minutes long, following the five stage call structure. Record it with a friend playing the customer, with their permission.
* **Three to five mock tickets**, from a free help desk trial or a spreadsheet, each with a clear summary, priority, tags, notes and final status.
* **One help article** with a clear title and numbered steps.
* **One short reflection**, a paragraph on what you learned and what you would do differently.

Optional extras: a public social media reply and its private follow up, an escalation note, or your typing test results.

## Rules for every sample

* **Use invented customers and businesses only.** Never include real people's names, numbers or account details, even friends who agreed. This shows employers you understand data protection.
* **Label it as practice.** Write "practice sample" at the top so no one thinks you are claiming real work you did not do.
* **Check every detail.** Spelling, names, numbers and dates. A portfolio with errors works against you.
* **Keep it short.** An employer should be able to look through it in a few minutes.

## How to put it together

You do not need a website. Simple options include:

* A shared folder in a free cloud storage service with clear file names, such as "01 Refund email reply".
* One free online document with headings for each sample and a link to your recorded call.
* A short PDF made from that document, small enough to send on a low data connection.

Check the sharing settings so anyone with the link can view but not edit. Test the link from another account or device before you send it.

## Talking about it

In an interview, be ready to explain one sample in a minute: what the customer needed, what you did and why. For example: "In this chat, the customer was upset about a double charge. I acknowledged it, collected the transaction IDs, explained the refund process honestly and gave a time for the next update."

## A worked example

Abdul-Rahman from Damongo spends two weekends building his portfolio. He invents a phone accessories shop, writes three emails, two chats and four tickets in a spreadsheet, records a call with his cousin and writes one help article about tracking orders. He saves it all in a shared folder with numbered files and a one page summary at the front. When he applies for a call centre role, he includes the link in his CV.`,
      practice_task_md: `**Goal:** Build your first support practice portfolio.

**Steps:**
1. Gather the best practice tasks you completed in this track: emails, chats, scripts, tickets and help articles.
2. Improve each one: check spelling, numbers, names and structure. Make sure every customer and business is invented.
3. Record one practice call of two to four minutes if you have not already.
4. Put everything in one shared folder or document with numbered, clear titles and a short summary page at the front. Label it as practice samples.
5. Test the link from another device or account, then ask a mentor or friend to look through it and give one piece of feedback.

**Done looks like:** A shared portfolio link with at least six labelled samples, a summary page, and one piece of feedback recorded.`,
      quiz: {
        questions: [
          {
            prompt: "Why should portfolio samples use invented customers and businesses?",
            options: [
              "Because real examples are boring",
              "To protect real people's data and show you understand data protection",
              "Because employers only accept fiction",
              "To make the portfolio longer",
            ],
            answer_index: 1,
            explanation: "Using invented data protects people and shows good data habits.",
          },
          {
            prompt: "Why should you label samples as 'practice'?",
            options: [
              "So no one thinks you are claiming real work you did not do",
              "Because practice samples are worth more to employers than real work samples",
              "Because it is required by help desk tools",
              "So you can charge for them",
            ],
            answer_index: 0,
            explanation: "Honest labelling avoids misleading an employer.",
          },
          {
            prompt: "Which is a good way to share your portfolio on a low data connection?",
            options: [
              "Send a large video of every sample",
              "Paste everything into one long WhatsApp message",
              "Print it and post it by mail only",
              "A shared folder or one online document, or a small PDF",
            ],
            answer_index: 3,
            explanation: "The lesson suggests a shared folder, an online document or a small PDF.",
          },
          {
            prompt: "What should you check before sending your portfolio link?",
            options: [
              "That anyone can edit it",
              "That the sharing settings allow viewing and the link works from another account or device",
              "That it includes real customer numbers, so employers can see you have worked with real data",
              "That it is longer than twenty pages",
            ],
            answer_index: 1,
            explanation: "Set view only sharing and test the link before sending.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "finding-support-roles": {
      explanation_md: `You have the skills; now you need the opening. Support roles in Ghana come through several routes, and knowing them helps you apply widely and safely. This lesson covers where to look, how to read an advert, how to prepare for typing and voice tests, and how to spot an offer that is not genuine.

## Where support roles come from

* **Call centres and BPOs.** Contact centres for banks, telecoms, fintechs and outsourcing companies hire agents, often in groups, especially in Accra and other cities.
* **Company support teams.** Delivery firms, online shops, schools, hospitals, insurance and solar companies often have small support teams of their own.
* **National service placements.** Some service personnel are posted to customer service, front desk or call roles, which can become a first reference.
* **Part time and shift chat roles**, sometimes remote, for companies that need cover in the evenings or at weekends.
* **Remote support teams** serving customers in other countries, which usually need a reliable computer, headset and stable internet.
* **Free training programmes.** Some employers and nonprofit organisations run free customer service training, sometimes with job placement support. Programmes often accept people from certain regions or age groups only, so always check current eligibility, location and dates on the programme's official page before applying.

Look on Ghanaian job boards in the customer service category, on company careers pages, and through your hub, school or church networks.

## Reading an advert

For each advert, note:

* **The channel:** calls, chat, email, WhatsApp or a mix.
* **Shifts and location:** office, remote, day or night.
* **Requirements:** education, languages, typing speed, experience.
* **How to apply** and the closing date.

Do not be put off if you meet most but not all requirements. Apply, and use your portfolio to show what you can do.

## Preparing for tests

* **Typing:** keep practising with a free typing test in your browser. Practise on a full keyboard if you can reach one, because many tests use one.
* **Voice:** record yourself answering "Tell me about yourself" and a role play. Check clarity, pace and warmth.
* **Writing:** practise replying to sample complaints within a time limit.
* **Role plays:** use the five call stages and the LISTEN method.

## Spotting fake offers

Fraudsters target job seekers with fake support jobs. Warning signs include:

* Being asked to **pay** for training, registration, a uniform or a "processing fee" before you start.
* An offer with no interview, or an interview only by text message.
* Pressure to decide immediately.
* Requests for your mobile money PIN, bank login or one time codes.
* A company you cannot find on an official website, or a free email address claiming to be a large company.

Before sharing your ID or any documents, check the company's official website and contact details. Genuine employers do not ask you to pay to get a job.

## A worked example

Mariama in Tamale sees a WhatsApp message offering a "remote customer care job" if she pays a small registration fee. She cannot find the company's website, so she does not pay. Instead she applies to a call centre role she finds on a Ghanaian job board, prepares with typing practice and a recorded role play, and includes her portfolio link.`,
      practice_task_md: `**Goal:** Build a short list of real opportunities and prepare for tests.

**Steps:**
1. Find three current support adverts or training programmes on a Ghanaian job board, a company careers page or an official programme page.
2. For each, note the channel, shift pattern, location or remote, key requirements and closing date, in your own words.
3. Check each one for the fake offer warning signs from the lesson and write "passed" or the sign you found.
4. Do one timed typing test and record one practice answer to "Tell me about yourself" in under one minute.

**Done looks like:** A list of three checked opportunities with notes, your typing result and one recorded answer, ready for your first applications.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a warning sign of a fake job offer?",
            options: [
              "An interview with a role play",
              "Being asked to pay a registration or processing fee before you start",
              "A closing date in the advert",
              "A typing test",
            ],
            answer_index: 1,
            explanation: "Genuine employers do not ask you to pay to get a job.",
          },
          {
            prompt: "What should you check about a free training programme before applying?",
            options: [
              "Current eligibility, location and dates on the programme's official page",
              "Whether a friend has heard of it",
              "Only the programme's social media comments, since past learners say what really happens",
              "Nothing; all programmes accept everyone",
            ],
            answer_index: 0,
            explanation: "The lesson says always check current eligibility, location and dates on the official page, because some programmes only accept people from certain regions.",
          },
          {
            prompt: "What should you do if you meet most but not all requirements in an advert?",
            options: [
              "Apply and use your portfolio to show what you can do",
              "Never apply",
              "Pretend you meet every requirement",
              "Wait a year before applying",
            ],
            answer_index: 0,
            explanation: "The lesson encourages applying and showing your skills through your portfolio.",
          },
          {
            prompt: "What do remote support teams usually need from you?",
            options: [
              "A reliable computer, headset and stable internet",
              "A car and a driving licence",
              "An office in Accra",
              "A university degree in a technology subject such as IT",
            ],
            answer_index: 0,
            explanation: "The lesson notes remote teams usually need a reliable computer, headset and stable internet.",
          },
          {
            prompt: "In the example, why did Mariama refuse the WhatsApp job offer?",
            options: [
              "The pay was too low",
              "It asked for a fee and she could not find the company's website",
              "It was a night shift",
              "It required her to speak a local language she did not know",
            ],
            answer_index: 1,
            explanation: "A fee and no official website are both warning signs of a fake offer.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
