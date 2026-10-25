import type { TrackContent } from "./types";

/**
 * Original lesson content for the Digital Skills Bridge (issue #84).
 * Research, sources and coverage: src/content/research/digital-skills-bridge.md.
 * Written for people with very low digital confidence, mostly on a phone.
 * It ends where DMP week 1 begins (src/content/dmp/curriculum.ts).
 */
const content: TrackContent = {
  roadmap: "digital-skills-bridge",
  nodes: {
    "phone-as-a-tool": {
      explanation_md: `Many people think you need a laptop to start learning digital skills. You do not. The phone in your hand can already send emails, join a class, fill in a job application and keep records for a small business. Shops, offices and NGOs in Ghana look for people who are comfortable with a smartphone, because so much daily work now happens on one.

This first section is about turning your phone from something you use to chat into a tool you use to learn and work.

## What this section covers

* **First steps on a smartphone.** The taps, swipes and buttons every app uses, and how to turn WiFi and mobile data on and off.
* **Settings, storage and battery.** How to keep your phone fast, with enough space and enough charge to finish a lesson.
* **Saving data and money.** How to make a data bundle last longer, so learning does not become expensive.
* **Installing apps safely.** How to get apps from the right place and check what they are allowed to do.

## Why start here

Think about Wumpini, who lives in Savelugu. She wants to join a digital skills course, but her phone is always full, the battery dies by afternoon and her bundle finishes in three days. None of that means she cannot learn. It means her phone is not set up for learning yet. After a few small changes, she can watch a lesson on WiFi in the morning, read notes offline in the evening and still have data left at the end of the week.

You might already know some of this. That is good. Go through each lesson anyway, because there is usually one small setting you have never seen that saves you time or money.

## How to learn in this section

* Keep your phone in your hand while you read. When a lesson says "open Settings", do it right away.
* Do not worry about breaking anything. The settings in this section are safe, and you can always change them back.
* Phones look a little different from brand to brand. If a menu has a slightly different name on your phone, look for the closest match, or use the search bar at the top of the Settings app.

By the end of this section you will know your own phone better, and you will feel more in control of it. That confidence matters, because every other part of this roadmap builds on it.`,
      practice_task_md: `**Goal:** Take a snapshot of your phone today, so you can see your progress later.

**Steps**

1. Open your phone's Settings app. Find the "About phone" page and write down your phone's model name.
2. Find the Storage page and write down how much space is used and how much is free.
3. Check your battery level now and write down the time.
4. Write down how many days your last data bundle lasted.
5. Write one sentence about what annoys you most about your phone right now.

**Done looks like:** A short note in your notebook or Notes app with these five answers. Keep it. At the end of this section, check the same things again and see what has improved.`,
      quiz: {
        questions: [
          {
            prompt: "According to this lesson, what do you need to start learning digital skills?",
            options: [
              "A new laptop",
              "The phone you already have",
              "A paid course certificate",
              "A home internet connection",
            ],
            answer_index: 1,
            explanation: "The lesson explains that your phone can already send emails, join classes and fill in applications.",
          },
          {
            prompt: "Why was Wumpini struggling to learn on her phone?",
            options: [
              "She was not clever enough",
              "Her phone was too old to use apps",
              "Her phone was not set up for learning yet",
              "She did not have a SIM card",
            ],
            answer_index: 2,
            explanation: "Her full storage, short battery life and fast bundle use were setup problems, not a lack of ability.",
          },
          {
            prompt: "What should you do if a menu has a slightly different name on your phone?",
            options: [
              "Stop the lesson and buy a different phone",
              "Look for the closest match or use the search bar in Settings",
              "Reset the phone to factory settings",
              "Skip that lesson completely",
            ],
            answer_index: 1,
            explanation: "Phones differ by brand, so the lesson suggests finding the closest match or searching in Settings.",
          },
          {
            prompt: "Which of these is one of the four topics in this section?",
            options: [
              "Building a website",
              "Writing computer code",
              "Saving data and money",
              "Running a Facebook advert",
            ],
            answer_index: 2,
            explanation: "The section covers first steps, settings and storage, saving data, and installing apps safely.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "phone-first-steps": {
      explanation_md: `Every app on a smartphone is controlled with the same few movements. Once these feel natural, you can learn any new app quickly, whether it is a work WhatsApp group, a sales app at a shop or a survey app an NGO gives you in the field. Employers notice when someone handles a phone calmly and confidently.

## The basic movements

* **Tap.** Touch the screen once, lightly, to open an app or press a button.
* **Long press.** Hold your finger on something for about a second. This often shows extra options, such as delete or share.
* **Swipe.** Slide your finger across the screen to move between pages or scroll down a message.
* **Pinch.** Put two fingers on the screen and move them apart to zoom in on a photo or small text. Move them together to zoom out.

## The buttons that get you home

Most Android phones have three controls at the bottom of the screen, or gestures that do the same jobs:

* **Back** takes you one step back.
* **Home** takes you to your main screen from anywhere.
* **Recent apps** shows the apps you have open, so you can switch between them or swipe them away.

If you ever feel lost inside an app, press Home. Nothing is lost, and you can start again.

## WiFi and mobile data

Swipe down from the very top of the screen. You will see a panel of quick settings with small icons.

* The **WiFi** icon looks like a fan of curved lines. Tap it to turn WiFi on, then choose a network and type its password.
* The **Mobile data** icon is often two small arrows. Tap it to turn your bundle on or off.

When WiFi is connected, your phone uses it first, which saves your bundle.

## A worked example

Fuseini works at a provisions shop in Tamale. His manager sends the price list as a photo on WhatsApp. The numbers are small, so Fuseini taps the photo to open it, then pinches outward to zoom in on the price of rice. He swipes down from the top to check he is on the shop's WiFi, so the photos do not use his own data. When a customer calls, he presses Home, answers, then uses Recent apps to jump straight back to the price list.

That is four simple movements and two buttons, used together. Practise them every day and soon you will stop thinking about them at all.`,
      practice_task_md: `**Goal:** Practise every movement and control from this lesson in five minutes.

**Steps**

1. Open your Gallery and tap a photo. Pinch to zoom in, then zoom out.
2. Long press on any app icon on your home screen and look at the options that appear. Tap outside to close them.
3. Open two apps, then use Recent apps to switch between them.
4. Swipe down from the top of the screen and find the WiFi and Mobile data icons. Turn mobile data off, then back on.
5. Press Home from inside any app.

**Done looks like:** You can do all five steps without looking at the instructions. Show a friend or family member how to zoom into a photo and switch apps.`,
      quiz: {
        questions: [
          {
            prompt: "Which movement do you use to zoom in on a small price list photo?",
            options: [
              "Tap once",
              "Long press",
              "Pinch with two fingers moving apart",
              "Press the Back button",
            ],
            answer_index: 2,
            explanation: "Moving two fingers apart on the screen zooms in.",
          },
          {
            prompt: "You feel lost inside an app. What does the lesson suggest?",
            options: [
              "Switch the phone off",
              "Press Home and start again",
              "Delete the app",
              "Remove the SIM card",
            ],
            answer_index: 1,
            explanation: "Home takes you to your main screen from anywhere, and nothing is lost.",
          },
          {
            prompt: "Where do you usually find the WiFi and Mobile data icons quickly?",
            options: [
              "By swiping down from the top of the screen",
              "Inside the Gallery app",
              "By long pressing the Home button",
              "In your WhatsApp chats",
            ],
            answer_index: 0,
            explanation: "Swiping down from the top opens the quick settings panel.",
          },
          {
            prompt: "Why did Fuseini check that he was on the shop's WiFi?",
            options: [
              "So customers could see his screen",
              "So the photos would not use his own data",
              "So his battery would charge faster",
              "So WhatsApp would delete old messages",
            ],
            answer_index: 1,
            explanation: "When WiFi is connected the phone uses it first, which saves your bundle.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "phone-settings-and-storage": {
      explanation_md: `A phone that is full, slow or always out of battery makes learning and working hard. A front desk assistant who cannot take a photo of a receipt because "storage is full" looks unprepared. Keeping your phone tidy is a small, real work skill.

## Storage: making space

Storage is where your phone keeps apps, photos, videos and messages. When it is almost full, the phone slows down, apps crash and new files will not save.

Open **Settings** and search for **Storage**. You will see what is taking up space. The usual culprits are:

* **WhatsApp media.** Every photo, video and voice note from groups is saved on your phone. In WhatsApp, open Settings, then Storage and data, then Manage storage. You can delete large videos you no longer need.
* **Videos you recorded.** Move important ones to Google Drive or a computer, then delete them from the phone.
* **Apps you never use.** Each one takes space and may update in the background.

A simple target is to keep a good amount of space free at all times, so the phone has room to work.

## Notifications: fewer distractions

Every buzz pulls you away from your lesson. In **Settings**, find **Notifications**. Turn off notifications for games and apps that do not matter, and keep them on for calls, messages and your learning apps. Many phones also have a **Do not disturb** or **Focus** mode you can switch on during a study session.

## Battery: lasting the day

* Lower the screen brightness. The screen uses a lot of power.
* Turn on **Battery saver** when you are below about a third.
* Close apps you are not using from Recent apps.
* Carry your charger, or charge before a long session if power is unreliable.

## Updates

Phone and app updates fix problems and close security holes. Install them, but do it on WiFi so they do not finish your bundle.

## A worked example

Mariama in Bolgatanga could not download a course PDF because her phone was full. She opened WhatsApp storage and found one church group had saved hundreds of forwarded videos. She deleted them, removed two old games and turned off game notifications. The PDF downloaded, and her phone felt faster too.

Check your storage once a week. It takes two minutes and saves a lot of frustration.`,
      practice_task_md: `**Goal:** Free up space and cut distractions on your own phone.

**Steps**

1. Open Settings, then Storage, and write down how much space is free.
2. In WhatsApp, open Settings, then Storage and data, then Manage storage. Delete at least five large videos you do not need.
3. Uninstall one app you have not opened in a month.
4. Turn off notifications for at least two apps that distract you.
5. Check Storage again and write down the new free space.

**Done looks like:** A before and after note showing how much space you freed, and a list of the notifications you turned off.`,
      quiz: {
        questions: [
          {
            prompt: "What usually happens when a phone's storage is almost full?",
            options: [
              "The battery lasts longer",
              "The phone slows down and new files may not save",
              "Data bundles become cheaper",
              "WhatsApp sends fewer messages",
            ],
            answer_index: 1,
            explanation: "A full phone slows down, apps crash and new files will not save.",
          },
          {
            prompt: "Where in WhatsApp can you find and delete large videos?",
            options: [
              "Settings, then Storage and data, then Manage storage",
              "The Status tab",
              "The camera button",
              "The group description",
            ],
            answer_index: 0,
            explanation: "Manage storage inside WhatsApp's Storage and data settings shows the large files.",
          },
          {
            prompt: "Which is a good way to make your battery last longer?",
            options: [
              "Turn the screen brightness to maximum",
              "Keep every app open in the background",
              "Lower the screen brightness",
              "Turn on every notification",
            ],
            answer_index: 2,
            explanation: "The screen uses a lot of power, so lower brightness saves battery.",
          },
          {
            prompt: "When should you install phone and app updates?",
            options: [
              "Never, because they are risky",
              "Only when the phone stops working",
              "On WiFi, so they do not finish your bundle",
              "Only on mobile data at night",
            ],
            answer_index: 2,
            explanation: "Updates fix problems and security holes, and WiFi stops them using your bundle.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "saving-data": {
      explanation_md: `Prepaid data is one of the biggest costs of learning online. If your bundle runs out halfway through a course, you lose time and money. Learning to control data use also helps at work: field staff and sales officers often use their own bundles, and the ones who manage data well stay connected when it matters.

## Use WiFi whenever you can

WiFi does not use your bundle. Places that may have WiFi include some schools, libraries, community centres, churches, mosques, offices and business centres. Always ask permission, and remember that you should not log in to your bank or MoMo account on a public network you do not trust.

## Stop apps eating data in the background

* **Data saver.** In Settings, search for **Data saver** and turn it on. It stops many apps from using data when you are not looking at them.
* **App updates.** Open the Play Store, go to its settings and set apps to update over **WiFi only**.
* **WhatsApp downloads.** In WhatsApp, open Settings, then Storage and data. Under media auto download, set photos, audio, videos and documents to download only on WiFi, or never. You can still tap any file to download it when you need it.

## Watch and download wisely

* Video uses far more data than reading. When you watch a lesson video, open the settings on the video player and choose a lower quality. You can still follow most lessons clearly.
* When you are on WiFi, download PDFs, notes and any lessons the app allows you to save for offline use. Then read them later without data.
* Turn off **autoplay** in video apps, so the next video does not start on its own.

## Know where your data goes

In **Settings**, search for **Data usage**. You will see which apps used the most data this month. If something surprises you, restrict it or delete it.

## A worked example

Issahaku in Yendi used to buy a bundle every few days. He checked Data usage and found that WhatsApp videos and a video app were using most of it. He set WhatsApp media to download on WiFi only, lowered his video quality and turned off autoplay. On Saturdays he downloads the week's notes at the community library's WiFi. Now one bundle lasts him much longer, and he spends that money on transport to his study group instead.

Compare the bundles your network offers before you buy. A bigger bundle that lasts longer is sometimes better value than many small ones, but check the expiry date.`,
      practice_task_md: `**Goal:** Cut your data use for the next week.

**Steps**

1. Open Settings, search for Data usage and write down the three apps that used the most data.
2. Turn on Data saver.
3. Set Play Store updates to WiFi only.
4. In WhatsApp, set media auto download to WiFi only for videos and documents.
5. Turn off autoplay in one video app you use.
6. After seven days, check Data usage again.

**Done looks like:** A short note comparing your top three apps before and after, and how long your bundle lasted.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these uses the most data?",
            options: [
              "Reading a short text lesson",
              "Watching a video lesson",
              "Writing notes offline",
              "Reading a downloaded PDF",
            ],
            answer_index: 1,
            explanation: "The lesson explains that video uses far more data than reading.",
          },
          {
            prompt: "What does the Data saver setting do?",
            options: [
              "Makes your bundle cheaper to buy",
              "Stops many apps from using data in the background",
              "Deletes your photos to save space",
              "Turns off your WiFi",
            ],
            answer_index: 1,
            explanation: "Data saver stops many apps from using data when you are not looking at them.",
          },
          {
            prompt: "How can you see which apps used the most data this month?",
            options: [
              "Ask your network by SMS",
              "Check Settings, then Data usage",
              "Look at your Gallery",
              "Restart the phone",
            ],
            answer_index: 1,
            explanation: "The Data usage page in Settings lists apps by how much data they used.",
          },
          {
            prompt: "What should you avoid doing on a public WiFi network you do not trust?",
            options: [
              "Reading a lesson",
              "Downloading course notes",
              "Logging in to your bank or MoMo account",
              "Checking the time",
            ],
            answer_index: 2,
            explanation: "The lesson warns against logging in to bank or MoMo accounts on public networks you do not trust.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "apps-safely": {
      explanation_md: `At work you may be asked to install an app: a sales app, a delivery tracking app, or a survey app such as Kobo Collect for an NGO field job. Knowing how to install apps safely, and how to spot a bad one, protects your phone, your money and your employer's information.

## Get apps from the official store

On Android phones, the official store is the **Google Play Store**. On iPhones it is the **App Store**. Apps there are checked before they are listed. Apps sent to you as files on WhatsApp, or downloaded from random websites, are not checked and can contain harmful software that steals passwords or MoMo details.

If someone sends you an app file and says "install this to get your prize", do not open it.

## Check before you install

On the app's page in the store, look at:

* **The developer name.** Is it the real company? Fake apps often copy a famous name with a small spelling change.
* **Reviews and downloads.** Read a few recent reviews, especially the bad ones.
* **What the app says it collects.** The store page often has a data safety section.

## Permissions: what the app can touch

When you open a new app, it may ask for permission to use your camera, microphone, location, contacts or files. Ask yourself: does this app really need this?

* A survey app asking for your location may be fine, because the NGO needs to know where the survey happened.
* A torch app asking for your contacts is a warning sign.

You can change permissions later. Open **Settings**, then **Apps**, choose the app and tap **Permissions**. Turn off anything that does not make sense.

## Clean up regularly

Apps you do not use still take space, may use data and may keep permissions they no longer need. Delete them. You can always install them again from the store.

## A worked example

Hawa got a job as a temporary enumerator for a household survey near Wa. Her supervisor told her to install the survey app from the Play Store. She searched for it, checked that the developer name matched what her supervisor wrote in the WhatsApp group, and installed it. The app asked for camera and location access, which made sense for photos and survey locations, so she allowed them. When a stranger later sent her a "faster version" of the app as a file, she ignored it and told her supervisor.

Safe habits like these are what employers mean when they ask for someone who is "comfortable with smartphones".`,
      practice_task_md: `**Goal:** Check the apps and permissions on your own phone.

**Steps**

1. Open Settings, then Apps, and count how many apps you have installed.
2. Pick three apps. For each one, open Permissions and write down what it can access.
3. Turn off any permission that does not make sense for that app.
4. Uninstall at least one app you no longer use.
5. In the Play Store, open the page of any learning app and write down its developer name and one thing from its data safety section.

**Done looks like:** A short table with three apps, their permissions and any change you made.`,
      quiz: {
        questions: [
          {
            prompt: "Where should you install apps from on an Android phone?",
            options: [
              "Files sent on WhatsApp",
              "The Google Play Store",
              "Any website that offers a free download",
              "A link in an SMS about a prize",
            ],
            answer_index: 1,
            explanation: "The Play Store is the official store, and its apps are checked before listing.",
          },
          {
            prompt: "A torch app asks for access to your contacts. What does the lesson say?",
            options: [
              "That is normal for all apps",
              "It is a warning sign",
              "You must allow it or the phone will break",
              "It will make the torch brighter",
            ],
            answer_index: 1,
            explanation: "A torch does not need your contacts, so the request is a warning sign.",
          },
          {
            prompt: "How can you change an app's permissions after installing it?",
            options: [
              "Settings, then Apps, choose the app, then Permissions",
              "Restart the phone twice",
              "Send the app to a friend",
              "You cannot change them once allowed",
            ],
            answer_index: 0,
            explanation: "Permissions can be changed in Settings under Apps.",
          },
          {
            prompt: "Why did Hawa ignore the faster version of the app sent as a file?",
            options: [
              "Files are always too large",
              "Apps sent as files are not checked and can be harmful",
              "Her phone cannot open files",
              "Her supervisor banned WhatsApp",
            ],
            answer_index: 1,
            explanation: "Apps shared as files skip the store's checks and can contain harmful software.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "communicating-at-work": {
      explanation_md: `Read entry level job adverts in Ghana for front desk staff, customer service agents, shop attendants or office assistants, and the same skills keep coming up. Answer calls. Reply on WhatsApp. Respond to email. Communicate well in English. These are not "tech" skills in the way coding is, but they are digital skills, and employers look for them first.

The good news is that you already use most of these tools every day. You call family, you chat on WhatsApp and you send voice notes. This section shows you how to use the same tools in a way that makes a manager, a customer or a mentor trust you.

## What this section covers

* **Handling work phone calls.** How to answer, take a message that someone else can act on, and follow up.
* **WhatsApp for work.** How to write clear messages, share photos and documents properly, and behave well in work and class groups.
* **Joining a video call.** How to join from a link, use the mute and camera buttons, and keep your data use low. Mentoring sessions and some interviews happen this way.
* **Reading and writing clear English.** How to read short lessons with confidence and write short, polite messages that get a reply.

## Friendly at home, professional at work

The difference between chatting and working is small but important. Look at two messages to a shop owner about a delivery.

The first says: "hw far, the thing no come".

The second says: "Good morning Madam Amina. The rice delivery for today has not arrived yet. Should I call the supplier? Abdul-Rahman."

Both are short. Only the second tells Amina exactly what is wrong and what you suggest. That is the whole idea of professional communication: be polite, be clear, and make it easy for the other person to act.

## Why this matters for the DMP cohort

SydCrest's Delta Mentoring Program runs partly online. Mentors share links on WhatsApp, sessions happen on video calls, and you will write emails and posts in English from the early weeks. If you can already do these basics calmly, you can spend your energy on the new skills the cohort teaches.

## How to practise

You do not need a job to practise. Use your church or mosque group, your class group, or a family member who runs a business. Each lesson ends with a task you can do with people you already know. Small, daily practice builds the habit faster than you might expect.`,
      practice_task_md: `**Goal:** See how professional your messages already are.

**Steps**

1. Scroll back through your last ten WhatsApp messages to anyone who is not close family.
2. Pick the two that were least clear. Rewrite each one so it includes a greeting, the main point in one sentence, and your name if the person may not have your number saved.
3. Write down one habit you want to change, such as using full words instead of short forms with people you do not know well.

**Done looks like:** Two before and after messages in your notebook or Notes app, plus one habit you will work on during this section.`,
      quiz: {
        questions: [
          {
            prompt: "Which skills does this lesson say keep coming up in entry level job adverts?",
            options: [
              "Coding and web design",
              "Answering calls, WhatsApp, email and clear English",
              "Video editing and photography",
              "Driving and cooking",
            ],
            answer_index: 1,
            explanation: "The lesson lists calls, WhatsApp, email and English as the skills that keep coming up.",
          },
          {
            prompt: "What makes the second message to Madam Amina better than the first?",
            options: [
              "It is much longer",
              "It uses more emojis",
              "It is polite, clear and suggests a next step",
              "It is written in capital letters",
            ],
            answer_index: 2,
            explanation: "It greets her, says exactly what is wrong and suggests calling the supplier.",
          },
          {
            prompt: "According to the lesson, what is the idea of professional communication?",
            options: [
              "Use as many big words as possible",
              "Be polite, be clear and make it easy for the other person to act",
              "Always call instead of texting",
              "Never use WhatsApp at work",
            ],
            answer_index: 1,
            explanation: "The lesson sums it up as polite, clear and easy to act on.",
          },
          {
            prompt: "Why do these skills matter for the DMP cohort?",
            options: [
              "The cohort does not use phones at all",
              "Mentors use WhatsApp and video calls, and you write in English early on",
              "The cohort only teaches phone calls",
              "You must sell products by phone to join",
            ],
            answer_index: 1,
            explanation: "The DMP runs partly online, with links on WhatsApp, video sessions and writing in English.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "phone-calls-at-work": {
      explanation_md: `Customer service agents, front desk staff, call centre workers and office assistants all spend a lot of their day on the phone. A caller cannot see your face or your office. Your voice and what you say are all they have to judge you and your employer. Good phone habits are simple to learn and very easy for a manager to notice.

## Answering a call

When the phone rings at work, answer within a few rings and say three things:

1. A greeting: "Good morning" or "Good afternoon".
2. Where they have reached: the name of the shop, office or organisation.
3. Your name and an offer to help.

For example: "Good afternoon, Zaa Prints, this is Mariama speaking. How can I help you?"

Speak a little slower than normal, and smile while you talk. People can hear a smile.

## Listening and checking

Let the caller finish. Then repeat the key details back to check you understood: "So you want 50 wedding invitations by Friday, is that right?" This one habit prevents many mistakes.

If you do not know the answer, do not guess. Say: "Let me check that for you. Can I call you back within the hour?" Then make sure you do.

## Taking a message someone can act on

If the person they want is not available, take a message. A useful message has:

* The caller's name and phone number.
* The date and time of the call.
* What they want, in one or two sentences.
* What you promised, for example "Manager will call back today".

Write it down straight away in a notebook or your phone's Notes app, then pass it on. Some offices log calls in a computer system. The idea is the same: accurate, complete records.

## Ending the call and following up

Summarise what will happen next, thank them and let them hang up first. If you promised a callback, keep that promise even if you only have a partial answer.

## A worked example

Sumaila works at the front desk of a small hotel in Tamale. A caller asks for the manager, who is out. Sumaila writes: "Tuesday 10:15am. Mr Alhassan, 024 000 0000. Wants to book the hall for a naming ceremony on 14th. Promised manager will call back before 2pm." He sends this to the manager on WhatsApp. The manager calls back on time, and the booking is made. A two minute habit helped win a customer.

Making calls to customers, sometimes called outbound calls, uses the same skills: greet, say who you are and why you are calling, listen, and record what was agreed.`,
      practice_task_md: `**Goal:** Practise answering a work call and taking a clear message.

**Steps**

1. Ask a friend or family member to call you pretending to be a customer of a business you choose, such as a chop bar or a tailoring shop.
2. Answer with a greeting, the business name and your name.
3. Repeat the key details back to check you understood.
4. Pretend the owner is not available and take a full message: name, number, date and time, request, and what you promised.
5. Swap roles and try again.

**Done looks like:** Two written phone messages with all five parts, and one thing your friend said you did well.`,
      quiz: {
        questions: [
          {
            prompt: "What three things should you say when you answer a work call?",
            options: [
              "Your age, your town and your school",
              "A greeting, the business name, and your name with an offer to help",
              "Only hello",
              "The price list and opening hours",
            ],
            answer_index: 1,
            explanation: "The lesson recommends a greeting, where they have reached, and your name with an offer to help.",
          },
          {
            prompt: "Why should you repeat key details back to the caller?",
            options: [
              "To make the call longer",
              "To check you understood and prevent mistakes",
              "Because the caller cannot hear well",
              "To practise your English",
            ],
            answer_index: 1,
            explanation: "Repeating details back checks your understanding and prevents many mistakes.",
          },
          {
            prompt: "Which of these is part of a useful phone message?",
            options: [
              "The caller's favourite colour",
              "The caller's name and phone number",
              "Your opinion of the caller",
              "The weather that day",
            ],
            answer_index: 1,
            explanation: "A useful message includes the caller's name and number, the time, the request and what you promised.",
          },
          {
            prompt: "A caller asks something you do not know. What should you do?",
            options: [
              "Guess the answer quickly",
              "Hang up politely",
              "Say you will check and call back, then do it",
              "Tell them to call another business",
            ],
            answer_index: 2,
            explanation: "The lesson says not to guess, but to check and keep your promise to call back.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "whatsapp-for-work": {
      explanation_md: `In Ghana, a lot of business happens on WhatsApp. Shops take orders on it, offices share schedules in groups, NGOs send field updates, and job adverts for shop attendants and customer service roles often ask for people who are comfortable using it for work. Mentors in the DMP cohort will also share links and updates this way. Using WhatsApp well at work is different from chatting with friends.

## Writing clear work messages

* **Start with a greeting and the person's name.** "Good morning Mr Fuseini."
* **Put the main point first.** Do not send "Hello" and wait. Send the full message in one go.
* **Use full words.** Short forms like "hw" and "pls dnt" can confuse people and look careless.
* **One topic per message.** It is easier to reply to and to find later.
* **End with what you need.** "Please confirm by 3pm."

## Voice notes or text?

Voice notes are quick, but the listener must find a quiet place to play them, and they cannot search them later. For prices, addresses, dates and names, send text. Use a short voice note when explaining something takes too long to type, and say the key details clearly.

## Sharing photos and documents

* To share a document such as a CV or a price list as a PDF, tap the attach icon (a paperclip on Android, a plus on iPhone), choose **Document** and pick the file. Sending as a document keeps it sharp and keeps its name.
* Sending a picture through the camera or gallery option makes it smaller and less clear. That is fine for a quick look, but not for something someone will print or read closely.
* Before you send a photo of a receipt or form, check it is in focus and nothing important is cut off.

## Group manners

* Stay on topic in work and class groups. Do not forward chain messages, jokes or political posts.
* Reply in private if your answer is only for one person.
* Do not post at night unless it is urgent.
* Respect privacy. Do not share someone's number or photo outside the group without asking.

## WhatsApp Business

Some shops use **WhatsApp Business**, a separate free app with a business profile, quick replies for common questions and labels to organise chats. If a job uses it, the skills above still apply.

## A worked example

Amina runs a small fabric shop in Tamale. Her new attendant, Napari, receives an order on WhatsApp. Napari replies: "Good afternoon. Thank you for your order. We have the blue wax print, 6 yards, for 180 cedis. Delivery to Lamashegu is possible tomorrow. Please confirm and we will send the MoMo details." Clear, polite and complete. The customer confirms in one reply.`,
      practice_task_md: `**Goal:** Use WhatsApp the way a professional would.

**Steps**

1. Make a simple one page PDF, for example a price list, using any free app, or ask someone to send you one.
2. Send it to a friend as a **Document**, not as a photo.
3. Write a clear work style message to go with it: greeting, main point, what you need from them.
4. Send the same price list as a photo too, and ask your friend which is easier to read.
5. Check your WhatsApp profile: use a clear photo and a sensible name you would be happy for an employer to see.

**Done looks like:** A screenshot of your clear message with the PDF attached, and an updated profile.`,
      quiz: {
        questions: [
          {
            prompt: "What should you avoid when starting a work message on WhatsApp?",
            options: [
              "Greeting the person by name",
              "Sending only Hello and waiting for a reply",
              "Putting the main point first",
              "Using full words",
            ],
            answer_index: 1,
            explanation: "The lesson says to send the full message in one go instead of just Hello.",
          },
          {
            prompt: "Why should you send a CV or price list as a Document instead of a photo?",
            options: [
              "Documents are always free to send",
              "It keeps the file sharp and keeps its name",
              "Photos cannot be sent in groups",
              "Documents delete themselves after reading",
            ],
            answer_index: 1,
            explanation: "Sending as a document keeps it sharp and keeps its name, while photos are made smaller.",
          },
          {
            prompt: "When is text better than a voice note?",
            options: [
              "When you are sharing prices, addresses, dates or names",
              "When you want to sound friendly",
              "When the message is very long and complicated",
              "Never, voice notes are always better",
            ],
            answer_index: 0,
            explanation: "Text can be searched and read anywhere, so it is better for key details.",
          },
          {
            prompt: "Which is good behaviour in a work or class group?",
            options: [
              "Forwarding chain messages",
              "Posting jokes late at night",
              "Staying on topic and replying privately when the answer is for one person",
              "Sharing members' numbers without asking",
            ],
            answer_index: 2,
            explanation: "The lesson asks you to stay on topic, reply privately when needed and respect privacy.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "video-calls": {
      explanation_md: `Mentoring sessions, online classes, team meetings and some job interviews now happen on video calls. The DMP cohort uses them too. Joining on time, with your microphone and camera under control, shows that you are ready for online work. It is a skill you can learn in one afternoon.

## Joining from a link

Most video calls start with a link that someone sends you on WhatsApp or by email. Common tools include Google Meet, Zoom and WhatsApp video calls.

* On a phone, tapping a Google Meet or Zoom link usually asks you to install the app. Install it from the Play Store or App Store, and do it on WiFi before the day of the call.
* On a computer, many calls open straight in the web browser, with nothing to install.
* You may need to sign in with your email account. Use the same account you used to register for the course or interview.
* Join a few minutes early so you have time to fix any problems.

## The buttons that matter

Every video call app has the same few controls, usually at the bottom of the screen:

* **Microphone.** Tap to mute or unmute. When it has a line through it, nobody can hear you.
* **Camera.** Tap to turn your video on or off.
* **Chat.** A place to type questions or share a link.
* **Raise hand.** A polite way to ask to speak in a large group.
* **Leave.** Often a red button. It ends the call for you only.

A good habit: stay muted unless you are speaking. Background noise from a market, a radio or a generator can make it hard for everyone else to hear.

## Saving data on a call

Video calls use a lot of data. To use less:

* Join on WiFi if you can.
* Turn your camera off when you do not need to be seen, and ask the host if this is acceptable.
* Close other apps that might be downloading in the background.

## Looking and sounding ready

* Sit facing a window or light, not with the light behind you.
* Hold the phone steady, or prop it up at eye level.
* Use earphones if you have them. They cut echo and noise.
* Use your real name as your display name, so the host knows who you are.

## A worked example

Rashida in Damongo has her first mentoring session on Google Meet. The day before, on her school's WiFi, she installs the Meet app and signs in with her email. On the day she joins five minutes early, sees the mentor, says hello, then mutes herself. When she has a question she raises her hand. When the mentor shares slides, she turns her camera off to save data. She leaves the call feeling prepared, not stressed.`,
      practice_task_md: `**Goal:** Join and control a video call confidently before you need to.

**Steps**

1. Agree a time with a friend who has a smartphone.
2. One of you starts a WhatsApp video call, or a Google Meet call if you can, and sends the link or calls the other.
3. Practise muting and unmuting, turning the camera on and off, and typing in the chat if the app has one.
4. Try sitting facing the light, then with the light behind you, and ask your friend which looks better.
5. Leave the call properly.

**Done looks like:** You can join, mute, unmute, turn the camera off and on, and leave without help. Write down the app you used and one problem you solved.`,
      quiz: {
        questions: [
          {
            prompt: "When should you install a video call app for an important session?",
            options: [
              "During the session itself",
              "Before the day, preferably on WiFi",
              "Only after the host calls you",
              "You never need to install anything",
            ],
            answer_index: 1,
            explanation: "Installing early on WiFi avoids delays and saves your bundle.",
          },
          {
            prompt: "What does a microphone icon with a line through it mean?",
            options: [
              "You are muted and nobody can hear you",
              "Your camera is off",
              "The call has ended",
              "Your battery is low",
            ],
            answer_index: 0,
            explanation: "A line through the microphone means you are muted.",
          },
          {
            prompt: "Which of these helps you use less data on a video call?",
            options: [
              "Turning your camera off when you do not need to be seen",
              "Keeping many apps open",
              "Unmuting all the time",
              "Raising your hand often",
            ],
            answer_index: 0,
            explanation: "Video uses a lot of data, so turning your camera off saves data.",
          },
          {
            prompt: "Why is it good to stay muted unless you are speaking?",
            options: [
              "It makes the call cheaper for the host",
              "It stops background noise disturbing everyone",
              "It makes your camera clearer",
              "It is required by law",
            ],
            answer_index: 1,
            explanation: "Background noise from markets, radios or generators can make it hard for others to hear.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "clear-english": {
      explanation_md: `Most free online courses, most job adverts and most office work in Ghana use written English. Job adverts for front desk, call centre and office roles often ask for good spoken and written English. You do not need perfect grammar. You need to understand what you read and write messages that are clear and polite. Both improve quickly with practice.

## Reading lessons with confidence

Many people stop a course because the reading feels hard. Try these habits:

* **Read the headings first.** They tell you what the page is about before you start.
* **Read slowly and more than once.** Going over a paragraph twice is normal, not a weakness.
* **Look up words you need.** Long press a word on your phone to see options such as search or translate. Write new words in a notebook with a short meaning in your own words.
* **Do not stop for every word.** If you understand the sentence without it, keep going.
* **Explain it to someone.** If you can explain a lesson in Dagbani, Gurene, Waali, Twi or any language you speak, you have understood it.

## Writing clear messages and emails

Short and simple is professional. A good work message or email has:

* A **greeting**: "Dear Mrs Mahama," or "Good morning Sir,".
* The **main point** in the first sentence.
* Any **details** in short sentences, one idea each.
* A **clear request** or next step.
* A **polite close** and your name: "Thank you. Hawa Issah."

Before you send anything important, read it once more. Check names, dates and numbers. Your phone's keyboard may underline spelling mistakes in red. Tap the word to see suggestions.

## A worked example

Here is a first draft from Baba, who wants to ask about a course:

"pls i want to no about the course when it start and the price thank u"

Here is his improved version:

"Good morning. My name is Baba Salifu. I would like to know when the next digital skills course starts and how much it costs. Thank you."

The second version is still short. It is clearer because it uses full words, full sentences and one idea at a time.

## Making practice a habit

Spend ten minutes a day reading something in English that interests you: a news article, a lesson, or a story. Then write two or three sentences about it. Free websites such as BBC Learning English have short lessons made for learners. Over a few weeks, reading gets faster and writing feels natural.`,
      practice_task_md: `**Goal:** Read one short lesson and write a clear message about it.

**Steps**

1. Choose any short lesson from this roadmap or a free site such as BBC Learning English.
2. Read the headings first, then read the whole page slowly.
3. Write down three new words and their meanings in your own words.
4. Write a short message to a friend or mentor explaining what the lesson was about. Use a greeting, the main point first, short sentences and a polite close with your name.
5. Read your message once more and fix any spelling, names or numbers before sending.

**Done looks like:** Three new words in your notebook and one clear message of three to five sentences.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson suggest you do first when reading a lesson page?",
            options: [
              "Look up every single word",
              "Read the headings first",
              "Skip straight to the quiz",
              "Translate the whole page",
            ],
            answer_index: 1,
            explanation: "Headings tell you what the page is about before you start reading.",
          },
          {
            prompt: "Which of these is part of a good work message or email?",
            options: [
              "Short forms like pls and u",
              "The main point in the first sentence",
              "No greeting at all",
              "Many ideas in one long sentence",
            ],
            answer_index: 1,
            explanation: "The lesson says to put the main point in the first sentence.",
          },
          {
            prompt: "Why is Baba's second message better than his first?",
            options: [
              "It is much longer",
              "It uses full words, full sentences and one idea at a time",
              "It uses difficult vocabulary",
              "It has no greeting",
            ],
            answer_index: 1,
            explanation: "His improved message is still short but uses full words and clear sentences.",
          },
          {
            prompt: "How can you check that you have understood a lesson?",
            options: [
              "Explain it to someone in any language you speak",
              "Read only the first line",
              "Copy it word for word",
              "Close the page quickly",
            ],
            answer_index: 0,
            explanation: "If you can explain it in any language you speak, you have understood it.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
