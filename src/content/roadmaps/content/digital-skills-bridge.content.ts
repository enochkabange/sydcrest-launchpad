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
      explanation_md: `Many people think you need a laptop to start learning digital skills. You do not. The phone in your hand can already send emails, join a class, fill in a job application and keep records for a small business. If you have a laptop or desktop computer at home, at school or at work, that works too, and the lessons in this section give the computer version wherever it is different. Shops, offices and NGOs in Ghana look for people who are comfortable with smartphones and computers, because so much daily work now happens on them.

This first section is about turning the device you already have from something you use to chat into a tool you use to learn and work.

## What this section covers

* **First steps on a phone or computer.** The taps, swipes and buttons every phone app uses, the clicks and keys that do the same jobs on a computer, and how to turn WiFi and mobile data on and off.
* **Settings, storage and battery.** How to keep your phone or computer fast, with enough space and enough charge to finish a lesson.
* **Saving data and money.** How to make a data bundle last longer, so learning does not become expensive.
* **Installing apps safely.** How to get apps and programs from the right place and check what they are allowed to do.

## Why start here

Think about Wumpini, who lives in Savelugu. She wants to join a digital skills course, but her phone is always full, the battery dies by afternoon and her bundle finishes in three days. None of that means she cannot learn. It means her phone is not set up for learning yet. After a few small changes, she can watch a lesson on WiFi in the morning, read notes offline in the evening and still have data left at the end of the week.

You might already know some of this. That is good. Go through each lesson anyway, because there is usually one small setting you have never seen that saves you time or money.

## How to learn in this section

* Keep your phone or computer in front of you while you read. When a lesson says "open Settings", do it right away.
* Do not worry about breaking anything. The settings in this section are safe, and you can always change them back.
* Phones and computers look a little different from brand to brand. If a menu has a slightly different name on your device, look for the closest match, or type what you want into the search box in Settings. Phones and computers both have one.

By the end of this section you will know your own phone or computer better, and you will feel more in control of it. That confidence matters, because every other part of this roadmap builds on it.`,
      practice_task_md: `**Goal:** Take a snapshot of your phone or computer today, so you can see your progress later.

**Steps**

1. Open Settings. On a phone, find the "About phone" page. On a computer, search Settings for "About". Write down the model or device name.
2. Search Settings for Storage and write down how much space is used and how much is free.
3. Check your battery level now and write down the time. On a desktop computer with no battery, skip this step.
4. Write down how many days your last data bundle lasted, or write "WiFi only" if you do not use bundles.
5. Write one sentence about what annoys you most about your device right now.

**Done looks like:** A short note in your notebook or a notes app with these five answers. Keep it. At the end of this section, check the same things again and see what has improved.`,
      quiz: {
        questions: [
          {
            prompt: "According to this lesson, what do you need to start learning digital skills?",
            options: [
              "A new laptop with Microsoft Office installed",
              "A home internet connection",
              "A paid course certificate",
              "The phone or computer you already have",
            ],
            answer_index: 3,
            explanation: "The lesson explains that the phone you already have can send emails, join classes and fill in applications, and a computer works too.",
          },
          {
            prompt: "Why was Wumpini struggling to learn on her phone?",
            options: [
              "She was not clever enough",
              "Her phone was too old to install any learning apps",
              "Her phone was not set up for learning yet",
              "She did not have a SIM card",
            ],
            answer_index: 2,
            explanation: "Her full storage, short battery life and fast bundle use were setup problems, not a lack of ability.",
          },
          {
            prompt: "What should you do if a menu has a slightly different name on your device?",
            options: [
              "Stop the lesson and buy the exact device the lesson used",
              "Reset the device to factory settings",
              "Find the closest match or search in Settings",
              "Skip that lesson completely",
            ],
            answer_index: 2,
            explanation: "Phones and computers differ by brand, so the lesson suggests finding the closest match or searching in Settings.",
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
      explanation_md: `Every app on a smartphone is controlled with the same few movements, and a computer has its own matching set. Once these feel natural, you can learn any new app quickly, whether it is a work WhatsApp group, a sales app at a shop or a survey app an NGO gives you in the field. Employers notice when someone handles a phone or a computer calmly and confidently.

## The basic movements on a phone

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

## On a computer

The same jobs have computer versions:

* **Click** does what a tap does. **Right click** shows extra options, like a long press.
* **Scroll** with the wheel on the mouse, or slide two fingers on a laptop touchpad.
* **Zoom** in a web browser by holding Ctrl and pressing the plus key, or Ctrl and minus to zoom out. On a Mac, use Command instead of Ctrl.
* **Switch apps** by clicking them on the taskbar at the bottom of the screen, called the Dock on a Mac.
* **WiFi** has the same fan shaped icon, near the clock at the bottom right on Windows or at the top right on a Mac. Click it and choose a network.

If you have never used a mouse, the lesson on mouse and keyboard basics later in this roadmap goes step by step.

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

On a computer, practise the computer versions instead: zoom a web page in and out, right click an empty part of the screen, switch between two open apps using the taskbar or Dock, and click the WiFi icon to see which network you are on.

**Done looks like:** You can do all five steps, or their computer versions, without looking at the instructions. Show a friend or family member how to zoom in and switch apps.`,
      quiz: {
        questions: [
          {
            prompt: "On a phone, which movement do you use to zoom in on a small price list photo?",
            options: [
              "Tap once",
              "Long press",
              "Pinch with two fingers moving apart",
              "Pinch with two fingers moving together",
            ],
            answer_index: 2,
            explanation: "Moving two fingers apart on the screen zooms in.",
          },
          {
            prompt: "You feel lost inside an app. What does the lesson suggest?",
            options: [
              "Press Home and start again",
              "Switch the phone off",
              "Delete the app",
              "Remove the SIM card",
            ],
            answer_index: 0,
            explanation: "Home takes you to your main screen from anywhere, and nothing is lost.",
          },
          {
            prompt: "On a computer, what does the same job as a long press on a phone?",
            options: [
              "A right click with the mouse",
              "Pressing the plus key",
              "Sliding two fingers on the touchpad",
              "Clicking the WiFi icon",
            ],
            answer_index: 0,
            explanation: "A right click shows extra options, like a long press on a phone.",
          },
          {
            prompt: "Why did Fuseini check that he was on the shop's WiFi?",
            options: [
              "So customers could see his screen",
              "So WhatsApp would delete old messages",
              "So his battery would charge faster",
              "So the photos would not use his own data",
            ],
            answer_index: 3,
            explanation: "When WiFi is connected the phone uses it first, which saves your bundle.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "phone-settings-and-storage": {
      explanation_md: `A phone or computer that is full, slow or always out of battery makes learning and working hard. A front desk assistant who cannot take a photo of a receipt because "storage is full" looks unprepared. Keeping your device tidy is a small, real work skill.

## Storage: making space

Storage is where your phone or computer keeps apps, photos, videos and messages. When it is almost full, the device slows down, apps crash and new files will not save.

Open **Settings** and search for **Storage**. This works on phones and computers. You will see what is taking up space. The usual causes are:

* **WhatsApp media.** Every photo, video and voice note from groups is saved on your phone. WhatsApp has its own storage tool. Open WhatsApp's Settings and look for **Storage and data**, then **Manage storage**. It shows the biggest files and chats, and you can delete large videos you no longer need.
* **Videos you recorded.** Move important ones to Google Drive or a computer, then delete them from the phone.
* **Apps you never use.** Each one takes space and may update in the background.
* **The Downloads folder on a computer.** Old installers, videos and copies of the same file pile up there. Open it and delete what you no longer need.

A simple target is to keep a good amount of space free at all times, so the device has room to work.

## Notifications: fewer distractions

Every buzz pulls you away from your lesson. In **Settings**, find **Notifications**. Turn off notifications for games and apps that do not matter, and keep them on for calls, messages and your learning apps. Many phones and computers also have a **Do not disturb** or **Focus** mode you can switch on during a study session.

## Battery: lasting the day

* Lower the screen brightness. The screen uses a lot of power.
* Turn on **Battery saver** when you are below about a third. Laptops have a similar setting, often called battery saver, energy saver or Low Power Mode.
* Close apps and browser tabs you are not using.
* Carry your charger, or charge before a long session if power is unreliable.

## Updates

Phone, computer and app updates fix problems and close security holes. Install them, but do it on WiFi so they do not finish your bundle.

## A worked example

Mariama in Bolgatanga could not download a course PDF because her phone was full. She opened WhatsApp's storage tool and found one church group had saved hundreds of forwarded videos. She deleted them, removed two old games and turned off game notifications. The PDF downloaded, and her phone felt faster too.

Check your storage once a week. It takes two minutes and saves a lot of frustration.`,
      practice_task_md: `**Goal:** Free up space and cut distractions on your own phone or computer.

**Steps**

1. Open Settings, search for Storage, and write down how much space is free.
2. On a phone, find the storage tool in WhatsApp's Settings (look for Storage and data, then Manage storage) and delete at least five large videos you do not need. On a computer, open your Downloads folder and delete at least five large files you do not need.
3. Uninstall one app you have not opened in a month.
4. Turn off notifications for at least two apps that distract you.
5. Check Storage again and write down the new free space.

**Done looks like:** A before and after note showing how much space you freed, and a list of the notifications you turned off.`,
      quiz: {
        questions: [
          {
            prompt: "What usually happens when a device's storage is almost full?",
            options: [
              "The battery lasts longer",
              "Data bundles become cheaper",
              "The device slows down and new files may not save",
              "WhatsApp deletes your oldest chats to make room automatically",
            ],
            answer_index: 2,
            explanation: "A full device slows down, apps crash and new files will not save.",
          },
          {
            prompt: "Where in WhatsApp can you find and delete large videos?",
            options: [
              "The Status tab",
              "The camera button",
              "The storage tool in WhatsApp's own Settings",
              "The group description",
            ],
            answer_index: 2,
            explanation: "WhatsApp's Settings have a storage tool that shows the biggest files so you can delete them.",
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
            prompt: "When should you install phone, computer and app updates?",
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
* **App updates.** On an Android phone, open the Play Store and go to its settings. Find the option for updating apps automatically and choose **WiFi only**.
* **WhatsApp downloads.** In WhatsApp's Settings, look for **Storage and data**. There you can choose when photos, audio, videos and documents download by themselves: only on WiFi, or never. You can still tap any file to download it when you need it.
* **Computers on a hotspot.** A laptop connected to your phone's hotspot can finish a bundle fast, because computers download large updates. On Windows, open the settings for that WiFi network and turn on **Metered connection**, which holds back many updates and background downloads. On a Mac, look in the WiFi settings for a similar low data option.

## Watch and download wisely

* Video uses far more data than reading. When you watch a lesson video, open the settings on the video player and choose a lower quality. You can still follow most lessons clearly.
* When you are on WiFi, download PDFs, notes and any lessons the app allows you to save for offline use. Then read them later without data.
* Turn off **autoplay** in video apps, so the next video does not start on its own.

## Know where your data goes

In **Settings**, search for **Data usage**. This works on most phones and on Windows computers. You will see which apps used the most data this month. If something surprises you, restrict it or delete it.

## A worked example

Issahaku in Yendi used to buy a bundle every few days. He checked Data usage and found that WhatsApp videos and a video app were using most of it. He set WhatsApp media to download on WiFi only, lowered his video quality and turned off autoplay. On Saturdays he downloads the week's notes at the community library's WiFi. Now one bundle lasts him much longer, and he spends that money on transport to his study group instead.

Compare the bundles your network offers before you buy. A bigger bundle that lasts longer is sometimes better value than many small ones, but check the expiry date.`,
      practice_task_md: `**Goal:** Cut your data use for the next week.

**Steps**

1. Open Settings, search for Data usage and write down the three apps that used the most data.
2. Turn on Data saver.
3. In the Play Store settings, set automatic app updates to WiFi only. If you use a laptop on your phone's hotspot, set that connection as metered instead.
4. In WhatsApp's Storage and data settings, set videos and documents to download automatically only on WiFi.
5. Turn off autoplay in one video app you use.
6. After seven days, check Data usage again.

**Done looks like:** A short note comparing your top three apps before and after, and how long your bundle lasted.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these uses the most data?",
            options: [
              "Reading a short text lesson",
              "Reading a downloaded PDF",
              "Writing notes offline",
              "Watching a video lesson",
            ],
            answer_index: 3,
            explanation: "The lesson explains that video uses far more data than reading.",
          },
          {
            prompt: "What does the Data saver setting do?",
            options: [
              "Stops many apps from using data in the background",
              "Makes your bundle cheaper to buy",
              "Turns off WiFi so only your bundle is used for browsing",
              "Deletes old photos to make space",
            ],
            answer_index: 0,
            explanation: "Data saver stops many apps from using data when you are not looking at them.",
          },
          {
            prompt: "How can you see which apps used the most data this month?",
            options: [
              "Dial your network's short code to see your remaining bundle",
              "Look at your Gallery",
              "Check Settings, then Data usage",
              "Restart the phone",
            ],
            answer_index: 2,
            explanation: "The Data usage page in Settings lists apps by how much data they used.",
          },
          {
            prompt: "What should you avoid doing on a public WiFi network you do not trust?",
            options: [
              "Reading a lesson",
              "Downloading free course notes from a trusted website",
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
      explanation_md: `At work you may be asked to install an app: a sales app, a delivery tracking app, or a survey app such as Kobo Collect for an NGO field job. Knowing how to install apps safely, and how to spot a bad one, protects your phone or computer, your money and your employer's information.

## Get apps from the official store

On Android phones, the official store is the **Google Play Store**. On iPhones it is the **App Store**. Apps there are checked before they are listed. The checks are not perfect, so you still need to look carefully, but apps sent to you as files on WhatsApp, or downloaded from random websites, are not checked and can contain harmful software that steals passwords or MoMo details. They are far riskier.

On a computer, get programs from the **Microsoft Store** on Windows, the **App Store** on a Mac, or the official website of the company that makes them. Avoid "free" copies of paid software from random websites, because they often hide harmful software.

If someone sends you an app or program file and says "install this to get your prize", do not open it.

## Check before you install

On the app's page in the store, look at:

* **The developer name.** Is it the real company? Fake apps often copy a famous name with a small spelling change.
* **Reviews and downloads.** Read a few recent reviews, especially the bad ones.
* **What the app says it collects.** The store page often has a data safety section.

## Permissions: what the app can touch

When you open a new app, it may ask for permission to use your camera, microphone, location, contacts or files. Ask yourself: does this app really need this?

* A survey app asking for your location may be fine, because the NGO needs to know where the survey happened.
* A torch app asking for your contacts is a warning sign.

You can change permissions later. On a phone, open **Settings**, find **Apps**, choose the app and look for **Permissions**. On a computer, look in Settings (System Settings on a Mac) for **Privacy and security**, which shows the apps that can use your camera, microphone and location. The names can differ a little from device to device. Turn off anything that does not make sense.

## Clean up regularly

Apps you do not use still take space, may use data and may keep permissions they no longer need. Delete them. On a Windows computer, uninstall programs from Settings, under Apps. On a Mac, drag them from Applications to the Bin. You can always install them again from the store.

## A worked example

Hawa got a job as a temporary enumerator for a household survey near Wa. Her supervisor told her to install the survey app from the Play Store. She searched for it, checked that the developer name matched what her supervisor wrote in the WhatsApp group, and installed it. The app asked for camera and location access, which made sense for photos and survey locations, so she allowed them. When a stranger later sent her a "faster version" of the app as a file, she ignored it and told her supervisor.

Safe habits like these are what employers mean when they ask for someone who is "comfortable with smartphones".`,
      practice_task_md: `**Goal:** Check the apps and permissions on your own phone or computer.

**Steps**

1. Open Settings, then Apps, and count how many apps you have installed.
2. Pick three apps. For each one, open Permissions and write down what it can access. On a computer, use Privacy and security in Settings instead.
3. Turn off any permission that does not make sense for that app.
4. Uninstall at least one app you no longer use.
5. In your app store, open the page of any learning app and write down its developer name and one thing from its data safety or privacy section.

**Done looks like:** A short table with three apps, their permissions and any change you made.`,
      quiz: {
        questions: [
          {
            prompt: "Where should you install apps from on an Android phone?",
            options: [
              "Files sent on WhatsApp",
              "A link in an SMS about a prize",
              "Any website that offers a free download",
              "The official Google Play Store",
            ],
            answer_index: 3,
            explanation: "The Play Store is the official store, and its apps are checked before listing.",
          },
          {
            prompt: "A torch app asks for access to your contacts. What does the lesson say?",
            options: [
              "That is normal for all apps",
              "You must allow it or the phone will break",
              "It is a warning sign of a risky app",
              "It will make the torch brighter",
            ],
            answer_index: 2,
            explanation: "A torch does not need your contacts, so the request is a warning sign.",
          },
          {
            prompt: "On a phone, how can you change an app's permissions after installing it?",
            options: [
              "Open Settings, then Apps, then the app's Permissions",
              "Restart the phone twice",
              "Send the app to a friend",
              "You cannot change them once allowed, only uninstall the app",
            ],
            answer_index: 0,
            explanation: "Permissions can be changed in Settings under Apps.",
          },
          {
            prompt: "Why did Hawa ignore the faster version of the app sent as a file?",
            options: [
              "Apps sent as files are not checked and can be harmful",
              "Files are always too large",
              "Her phone cannot open files",
              "The file version only works on phones with more storage",
            ],
            answer_index: 0,
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
* **Joining a video call.** How to join from a link, use the mute and camera buttons, and keep your data use low. Many online classes and some interviews happen this way.
* **Reading and writing clear English.** How to read short lessons with confidence and write short, polite messages that get a reply.

## Friendly at home, professional at work

The difference between chatting and working is small but important. Look at two messages to a shop owner about a delivery.

The first says: "hw far, the thing no come".

The second says: "Good morning Madam Amina. The rice delivery for today has not arrived yet. Should I call the supplier? Abdul-Rahman."

Both are short. Only the second tells Amina exactly what is wrong and what you suggest. That is the whole idea of professional communication: be polite, be clear, and make it easy for the other person to act.

## Why this matters for the DMP cohort

SydCrest's Delta Mentoring Program is a twelve week cohort with a mentor. In week 1 you send emails, and the weekly assignments are written in English. Your mentor will tell you how sessions run. If you can already write a clear message and use your phone or computer calmly, you can spend your energy on the new skills the cohort teaches.

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
              "Driving and cooking",
              "Video editing, photography and graphic design software",
              "Answering calls, WhatsApp, email and clear English",
            ],
            answer_index: 3,
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
              "Use formal words and long sentences so you sound serious",
              "Always call instead of texting",
              "Be polite, clear and easy for the other person to act on",
              "Never use WhatsApp at work",
            ],
            answer_index: 2,
            explanation: "The lesson sums it up as polite, clear and easy to act on.",
          },
          {
            prompt: "Why do these skills matter for the DMP cohort?",
            options: [
              "The cohort does not use phones at all",
              "You must sell products by phone to join",
              "The cohort only teaches phone calls and customer service scripts",
              "You send emails and write assignments in English from week 1",
            ],
            answer_index: 3,
            explanation: "Week 1 includes email, and the weekly assignments are written in English.",
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

Write it down straight away in a notebook or a notes app, then pass it on. Some offices log calls in a computer system. The idea is the same: accurate, complete records.

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
              "A greeting, the business name, and your name with an offer to help",
              "Your age, your town and your school",
              "Only hello",
              "The date, the price list and the business opening hours",
            ],
            answer_index: 0,
            explanation: "The lesson recommends a greeting, where they have reached, and your name with an offer to help.",
          },
          {
            prompt: "Why should you repeat key details back to the caller?",
            options: [
              "To make the call longer",
              "Because it gives you time to think of an answer",
              "To check you understood and prevent mistakes",
              "To practise your English",
            ],
            answer_index: 2,
            explanation: "Repeating details back checks your understanding and prevents many mistakes.",
          },
          {
            prompt: "Which of these is part of a useful phone message?",
            options: [
              "The caller's favourite colour",
              "The weather that day",
              "Your opinion of the caller",
              "The caller's name and phone number",
            ],
            answer_index: 3,
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
      explanation_md: `In Ghana, a lot of business happens on WhatsApp. Shops take orders on it, offices share schedules in groups, NGOs send field updates, and job adverts for shop attendants and customer service roles often ask for people who are comfortable using it for work. SydCrest itself runs a WhatsApp community. Using WhatsApp well at work is different from chatting with friends.

## Writing clear work messages

* **Start with a greeting and the person's name.** "Good morning Mr Fuseini."
* **Put the main point first.** Do not send "Hello" and wait. Send the full message in one go.
* **Use full words.** Short forms like "hw" and "pls dnt" can confuse people and look careless.
* **One topic per message.** It is easier to reply to and to find later.
* **End with what you need.** "Please confirm by 3pm."

## Voice notes or text?

Voice notes are quick, but the listener must find a quiet place to play them, and they cannot search them later. For prices, addresses, dates and names, send text. Use a short voice note when explaining something takes too long to type, and say the key details clearly.

## Sharing photos and documents

* To share a document such as a CV or a price list as a PDF, tap or click the attach button next to the message box (often a paperclip or a plus sign), choose **Document** and pick the file. Sending as a document keeps it sharp and keeps its name.
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

Amina runs a small fabric shop in Tamale. Her new attendant, Napari, receives an order on WhatsApp. Napari replies (the price here is only an example): "Good afternoon. Thank you for your order. We have the blue wax print, 6 yards, for 180 cedis. Delivery to Lamashegu is possible tomorrow. Please confirm and we will send the MoMo details." Clear, polite and complete. The customer confirms in one reply.`,
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
              "Putting the main point in the very first message",
              "Sending only Hello and waiting for a reply",
              "Using full words",
            ],
            answer_index: 2,
            explanation: "The lesson says to send the full message in one go instead of just Hello.",
          },
          {
            prompt: "Why should you send a CV or price list as a Document instead of a photo?",
            options: [
              "It keeps the file sharp and keeps its name",
              "Documents are always free to send",
              "Photos cannot be sent in groups",
              "Documents delete themselves after reading",
            ],
            answer_index: 0,
            explanation: "Sending as a document keeps it sharp and keeps its name, while photos are made smaller.",
          },
          {
            prompt: "When is text better than a voice note?",
            options: [
              "When you are sharing prices, addresses, dates or names",
              "When you want to sound friendly",
              "When the message is very long and you are telling a story",
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
              "Staying on topic and replying to one person privately",
              "Sharing members' numbers with outside sellers who ask for them",
            ],
            answer_index: 2,
            explanation: "The lesson asks you to stay on topic, reply privately when needed and respect privacy.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "video-calls": {
      explanation_md: `Online classes, team meetings, some mentoring sessions and some job interviews now happen on video calls. Joining on time, with your microphone and camera under control, shows that you are ready for online work. It is a skill you can learn in one afternoon.

## Joining from a link

Most video calls start with a link that someone sends you on WhatsApp or by email. Common tools include Google Meet, Zoom and WhatsApp video calls.

* On a phone, tapping a Google Meet or Zoom link usually asks you to install the app. Install it from the Play Store or App Store, and do it on WiFi before the day of the call.
* On a computer, many calls open straight in the web browser, with nothing to install.
* You may need to sign in with your email account. Use the same account you used to register for the course or interview.
* Join a few minutes early so you have time to fix any problems.

## The buttons that matter

Every video call app has the same few controls, usually at the bottom of the screen:

* **Microphone.** Tap or click to mute or unmute. When it has a line through it, nobody can hear you.
* **Camera.** Tap or click to turn your video on or off.
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
* Prop your phone or laptop up so the camera is steady and at eye level.
* Use earphones if you have them. They cut echo and noise.
* Use your real name as your display name, so the host knows who you are.

## A worked example

Rashida in Damongo has been invited to an online interview for an office job. The interviewer sends her a Google Meet link. The day before, on her school's WiFi, she installs the Meet app and signs in with her email. On the day she joins five minutes early, greets the interviewer and keeps her camera on so they can see her. She sits facing the window and uses earphones, so her voice is clear. When the interviewer shares a slide about the job, she asks if she may turn her camera off for a moment to save data, and the interviewer agrees. She leaves the call feeling prepared, not stressed.`,
      practice_task_md: `**Goal:** Join and control a video call confidently before you need to.

**Steps**

1. Agree a time with a friend who has a smartphone or a computer.
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
              "You never need to install anything",
              "Only after the host calls you",
              "Before the day, preferably on WiFi",
            ],
            answer_index: 3,
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
              "Turning your camera off when you need not be seen",
              "Switching the video to the highest quality setting",
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
              "It makes your camera clearer",
              "It stops background noise disturbing everyone",
              "It makes your own voice louder and clearer when you unmute",
            ],
            answer_index: 2,
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
* **Look up words you need.** On a phone, long press a word to see options such as search or translate. On a computer, select the word and right click it. Write new words in a notebook with a short meaning in your own words.
* **Do not stop for every word.** If you understand the sentence without it, keep going.
* **Explain it to someone.** If you can explain a lesson in Dagbani, Gurene, Waali, Twi or any language you speak, you have understood it.

## Writing clear messages and emails

Short and simple is professional. A good work message or email has:

* A **greeting**: "Dear Mrs Mahama," or "Good morning Sir,".
* The **main point** in the first sentence.
* Any **details** in short sentences, one idea each.
* A **clear request** or next step.
* A **polite close** and your name: "Thank you. Hawa Issah."

Before you send anything important, read it once more. Check names, dates and numbers. Your phone keyboard, and most browsers and writing apps on a computer, underline spelling mistakes in red. Tap or right click the word to see suggestions.

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
              "Translate the whole page into your own language",
              "Skip straight to the quiz",
              "Read all the headings first",
            ],
            answer_index: 3,
            explanation: "Headings tell you what the page is about before you start reading.",
          },
          {
            prompt: "Which of these is part of a good work message or email?",
            options: [
              "The main point in the first sentence",
              "Short forms like pls and u",
              "No greeting at all",
              "Many ideas in one long sentence",
            ],
            answer_index: 0,
            explanation: "The lesson says to put the main point in the first sentence.",
          },
          {
            prompt: "Why is Baba's second message better than his first?",
            options: [
              "It is much longer",
              "It uses longer words and more formal vocabulary",
              "It uses full words and one idea at a time",
              "It has no greeting",
            ],
            answer_index: 2,
            explanation: "His improved message is still short but uses full words and clear sentences.",
          },
          {
            prompt: "How can you check that you have understood a lesson?",
            options: [
              "Explain it to someone in any language you speak",
              "Read only the first line",
              "Read it again several times until it sounds familiar",
              "Close the page quickly",
            ],
            answer_index: 0,
            explanation: "If you can explain it in any language you speak, you have understood it.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "accounts-and-safety": {
      explanation_md: `Almost everything you will do online needs an account: an email address, a course website, a job portal, a video call app. Each account holds your name, your phone number and sometimes your money. Employers also want staff who will not fall for tricks that put customer information or company money at risk. That is why this section comes before you sign up for anything else.

## What this section covers

* **One email address you control.** How to create a personal email address with a sensible name, and make sure you can always get back into it.
* **Strong passwords and two step verification.** How to make passwords that are hard to guess, and add a second lock so a stolen password is not enough.
* **Spotting mobile money and online scams.** The tricks people in Ghana use most often, and simple rules that protect you.
* **Privacy on shared phones and computers.** What to share and not share about yourself, and how to keep your accounts private when other people use your phone or computer.

## Think of accounts like keys

Your email account is like the master key to your house. If someone gets it, they can reset the passwords of your other accounts, read your messages and pretend to be you. Your MoMo PIN is like the key to your money box. You would not give your house key to a stranger who called and said they were from the landlord. Online, the same common sense applies, but the tricks can be harder to spot.

## A quick story

Abdul-Rahman in Walewale created an email address in a hurry at a business centre. He used his sister's phone number for recovery and a password that was his name and birth year. A year later he forgot the password, and his sister had changed her number. He lost the account, along with an online certificate he had earned. Ten minutes of careful setup would have saved it. This section helps you avoid that.

## How this links to the DMP cohort

In week 1 of the Delta Mentoring Program you will use Gmail to send emails with attachments and learn to recognise phishing emails. Later weeks go deeper into privacy settings and judging online sources. This section gives you the foundation: an account that is yours, protected properly, and the habit of pausing before you trust a message.

## A rule to remember

If a message makes you feel rushed, scared or very excited, stop. Scammers want you to act before you think. A real bank, network or employer will still be there in ten minutes, after you have checked.`,
      practice_task_md: `**Goal:** Make a list of the accounts you already have.

**Steps**

1. On a piece of paper, list every online account you can remember: email, WhatsApp, Facebook, MoMo, school portal, and any others.
2. Next to each one, write which phone number it is linked to.
3. Mark any account linked to a number that is not yours, or that you no longer use.
4. Mark any accounts that share the same password. Do not write the passwords themselves.

**Done looks like:** A list with your accounts, the linked numbers, and marks showing which ones need fixing during this section. Keep the paper somewhere private.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson compare your email account to a master key?",
            options: [
              "Because it is made of metal",
              "Because it never needs a password",
              "Because it unlocks your phone and every app without a PIN",
              "Because someone with it can reset your other accounts",
            ],
            answer_index: 3,
            explanation: "Access to your email lets someone reset other passwords and read your messages.",
          },
          {
            prompt: "What went wrong for Abdul-Rahman?",
            options: [
              "He used his own number and a strong password",
              "He never created an email address",
              "He linked his sister's number and used a weak password",
              "His phone was stolen, and the thief reset his email password",
            ],
            answer_index: 2,
            explanation: "A recovery number that was not his and a weak password meant he lost the account.",
          },
          {
            prompt: "A message makes you feel rushed and very excited. What should you do?",
            options: [
              "Stop and check before you act",
              "Reply immediately before the offer ends",
              "Send your PIN to confirm",
              "Forward it to all your groups",
            ],
            answer_index: 0,
            explanation: "Scammers want you to act before you think, so stop and check first.",
          },
          {
            prompt: "What will DMP week 1 do with email?",
            options: [
              "Nothing, email is not used",
              "Only teach phone calls",
              "Teach you to build an email app",
              "Use Gmail for attachments and spotting phishing",
            ],
            answer_index: 3,
            explanation: "The lesson explains that week 1 uses Gmail with attachments and covers phishing.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "email-account": {
      explanation_md: `Every job application, online course, certificate and video call invitation needs an email address. Employers will judge you a little by it, so the name matters. Most importantly, it must be yours: linked to your own phone number, with a password only you know. DMP week 1 uses Gmail, so a Gmail address is a good choice, but any reliable free provider works.

## Choosing a sensible address

Your email address is often the first thing an employer sees. Compare:

* partyboy4real@...
* wumpini.alhassan@...

The second is clear and professional. Good patterns are your first name and surname, perhaps with a dot or a number if the name is taken. Avoid nicknames, jokes and your birth year if you can, since it shares personal information.

## Creating the account

On an Android phone you already have a Google account if you use the Play Store. You can use that, or create a new one just for work and study. To create one:

1. Open the Gmail app, or go to the Google account sign up page in your browser.
2. Choose **Create account**, then **For my personal use**.
3. Enter your real name, your date of birth and choose your address.
4. Create a strong password. The next lesson explains how.
5. Add **your own** phone number when asked.

## Making sure you can always get back in

This is the step many people skip. In your Google Account settings, find the security section (the menu names change from time to time) and check:

* **Recovery phone.** It must be a number you own and will keep. Not a friend's, not a business centre's.
* **Recovery email.** Optional, but useful if you have a second address.

If you ever change your SIM, update the recovery number straight away.

## Signing in and out

If you use a shared phone or a computer at a library or business centre, always **sign out** when you finish. Do not tick "remember me" or save the password on a device that is not yours.

## A worked example

Fuseini used to apply for jobs with an address his cousin made for him years ago. He did not know the password and it was linked to his cousin's old number. He created a new address, fuseini.issahaku, linked it to his own MTN number, and wrote down where to find the recovery settings. When he forgot his password two months later, Google sent a code to his phone and he was back in within a minute.

Once your account is ready, DMP week 1 will teach you to use it fully: writing, replying and sending attachments.`,
      practice_task_md: `**Goal:** Have one professional email address that you fully control.

**Steps**

1. Decide on an address using your real name. Write two backup options in case it is taken.
2. Create the account, or check an existing one if it already uses your real name.
3. Open your account's security settings and confirm the recovery phone is your own current number.
4. Send a short test email to a friend with a clear subject line, and ask them to reply.
5. Sign out, then sign in again to make sure you know your password.

**Done looks like:** A professional email address, linked to your own number, that you can sign in to without help. Write the address (not the password) at the top of your notebook.`,
      quiz: {
        questions: [
          {
            prompt: "Which email address is the most professional?",
            options: [
              "kingwumpini4real2005",
              "bigmoneyking",
              "wumpini.alhassan",
              "cutegirl2005",
            ],
            answer_index: 2,
            explanation: "First name and surname is clear and professional.",
          },
          {
            prompt: "Whose phone number should be your recovery number?",
            options: [
              "A business centre's number",
              "Your friend's number",
              "Your own number that you will keep",
              "No number at all",
            ],
            answer_index: 2,
            explanation: "Only your own current number lets you recover the account yourself.",
          },
          {
            prompt: "What should you do when you change your SIM?",
            options: [
              "Delete your email account",
              "Share your password with a friend",
              "Nothing, it updates itself",
              "Update the recovery number straight away",
            ],
            answer_index: 3,
            explanation: "An old recovery number could stop you getting back into your account.",
          },
          {
            prompt: "What should you do after using email on a library computer?",
            options: [
              "Save the password for next time",
              "Tick remember me",
              "Sign out when you finish",
              "Leave it open for the next person",
            ],
            answer_index: 2,
            explanation: "Always sign out on devices that are not yours.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "passwords-and-two-step": {
      explanation_md: `If someone gets into your email, WhatsApp or MoMo, they can steal money, message your contacts pretending to be you, or lock you out of your own work. At work, a weak password can expose customer records. Two simple habits block most of these problems: strong passwords and two step verification.

## What makes a password strong

A strong password is **long** and **hard to guess**. Length matters more than strange symbols.

Weak passwords include your name, your phone number, your birthday, "123456" or "password". People who know you, or computer programs that try common passwords, can guess these quickly.

A good method is a **passphrase**: three or four random words joined together, perhaps with a number. For example, a phrase like "GuineaFowlRiverLantern7" is long, easy for you to remember and hard to guess. Do not use this exact example.

## One password per important account

If you use the same password everywhere and one website is hacked, criminals try it on your email and other accounts. Use a different password at least for your email, your MoMo or bank app, and your main social media.

Remembering many passwords is hard. Options include a password manager app, or the password saving built into your Google account on your own phone or computer. If you write passwords down, keep the paper at home in a private place, never in your phone case or wallet.

## Two step verification

Two step verification adds a second lock. After your password, the account asks for something only you have, usually a code sent to your phone or a prompt that appears on your phone. A thief with your password still cannot get in.

* **Google account:** open your Google Account settings and find the security section. Look for **2 Step Verification** and follow the steps to turn it on. Google sometimes renames these menus, so if you cannot see it, use the search box in your Google Account. Google also lets you save backup codes. Keep them somewhere safe.
* **WhatsApp:** in WhatsApp's Settings, look under **Account** for **Two step verification**, and create a six digit PIN. This stops someone moving your WhatsApp to their phone.

## The golden rule about codes

**Never share a verification code with anyone.** Not a caller saying they are from your network, not a "Google agent", not a friend who says they sent it to you by mistake. Real companies do not ask you for these codes. If someone asks, it is a scam.

## A worked example

Issahaku received an SMS with a WhatsApp code he had not requested, followed by a message from an unknown number: "Sorry, I sent my code to you by mistake, please send it back." He ignored it. Because he had already set a WhatsApp two step PIN, his account stayed safe. Later he heard that a friend had sent a code like this to a stranger and lost his WhatsApp account for a week.`,
      practice_task_md: `**Goal:** Protect your two most important accounts.

**Steps**

1. Create a new passphrase for your email using three or four random words and a number. Change your email password to it.
2. Turn on 2 Step Verification for your Google account. Look in the security section of your Google Account settings.
3. If you can print or write them down, save your Google backup codes somewhere private at home.
4. In WhatsApp, turn on two step verification and set a PIN you will remember.
5. Write down, without the passwords, which accounts now use different passwords.

**Done looks like:** Two step verification switched on for both email and WhatsApp, and a new strong email password.`,
      quiz: {
        questions: [
          {
            prompt: "Which is the strongest password idea from the lesson?",
            options: [
              "Your phone number",
              "123456",
              "Three or four random words joined with a number",
              "Your name and birth year",
            ],
            answer_index: 2,
            explanation: "A long passphrase of random words is easy to remember and hard to guess.",
          },
          {
            prompt: "Why should important accounts have different passwords?",
            options: [
              "If one site is hacked, criminals try that password elsewhere",
              "Websites require it by law",
              "Each website checks that your password is not used anywhere else",
              "So you can share one of them",
            ],
            answer_index: 0,
            explanation: "Reusing a password lets one leak open many accounts.",
          },
          {
            prompt: "What does two step verification add?",
            options: [
              "A second lock, such as a code sent to your phone",
              "A second email address that receives copies of your mail",
              "Free data",
              "A longer username",
            ],
            answer_index: 0,
            explanation: "It asks for something only you have, so a password alone is not enough.",
          },
          {
            prompt: "Someone says they sent their code to you by mistake and asks for it. What should you do?",
            options: [
              "Send it quickly to help them",
              "Share half of it",
              "Never share it, because it is a scam",
              "Post it in a group so they can find it",
            ],
            answer_index: 2,
            explanation: "Never share verification codes. Real companies and friends do not need them.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "spotting-scams": {
      explanation_md: `Scammers in Ghana target people through mobile money, SMS, phone calls, WhatsApp and fake job adverts. People looking for work are a favourite target. Learning the common tricks protects your money, and employers value staff who can spot fraud before it costs the business. Some Ghanaian job sites even remind applicants never to pay a fee to get a job.

## Common tricks to know

* **The fake wrong transfer.** You get an SMS that looks like a MoMo alert saying money was sent to you. Then someone calls, begging you to send it back. Often no money arrived at all. The "alert" came from an ordinary phone number.
* **The prize or promotion call.** A caller says you have won a prize from your network or a radio station, but you must first send a fee or share a code. Real prizes do not ask you to pay.
* **The fake agent or customer care.** Someone claims to be from your network or bank and asks for your PIN, or tells you to dial a code to "fix" your account. Dialling codes or approving prompts they give you can move your money.
* **The fake job offer.** An advert or message offers an easy, well paid job, then asks for a registration, training or medical fee. Real employers do not charge you to get a job.
* **The family emergency.** A message from a new number says it is a relative with a new phone who urgently needs money.

## Simple rules that protect you

* **Never share your MoMo PIN or any verification code.** Nobody from a real company needs them.
* **Check your real balance yourself** in your MoMo app or the official menu, not by trusting an SMS.
* **Call back on the official number.** If someone says they are from your bank or network, hang up and call the customer care number on the official website, the back of your card, or your SIM pack.
* **Never pay for a job.** Research the company name online and ask people you trust.
* **Slow down.** Pressure and urgency are warning signs.
* **Verify family requests** by calling the person's old number or asking a question only they would know.

## A worked example

Mariama, a shop attendant in Tamale, receives an SMS: "You have received 500 cedis from Issah Abu." (The name and amount are only an example.) A few minutes later a man calls, crying, asking her to send it back. She checks her MoMo balance through the official menu. No money has arrived. She tells him she will report it to her network, and he hangs up. She warns her colleagues in the shop's WhatsApp group so nobody else falls for it.

If you do lose money, contact your network's official customer care immediately and report it. Acting fast gives the best chance of help.`,
      practice_task_md: `**Goal:** Learn to recognise scams quickly.

**Steps**

1. Write down the five common tricks from this lesson in your own words.
2. Look through your SMS and WhatsApp messages for anything that matches one of them. If you find one, write down which trick it was.
3. Find the official customer care number for your mobile network from its official website or your SIM pack, and save it in your contacts.
4. Explain two of the tricks to a family member who uses MoMo.

**Done looks like:** Your list of five tricks, any real examples you found, the official number saved, and one person you warned.`,
      quiz: {
        questions: [
          {
            prompt: "You get an SMS saying money was sent to you, then a caller asks you to send it back. What should you do first?",
            options: [
              "Send the money back, because the caller sounds honest and worried",
              "Forward the SMS to friends",
              "Give the caller your PIN so they can check",
              "Check your real balance in the MoMo app or official menu",
            ],
            answer_index: 3,
            explanation: "Often no money arrived, so check your real balance yourself first.",
          },
          {
            prompt: "A job offer asks you to pay a training fee before you start. What does this suggest?",
            options: [
              "It is a normal part of every job",
              "You should pay quickly before others do",
              "It is likely a scam, because real employers do not charge you",
              "It shows the company is serious about training its new staff",
            ],
            answer_index: 2,
            explanation: "The lesson says never to pay for a job.",
          },
          {
            prompt: "Someone calls saying they are from your bank and asks for your PIN. What is the safe response?",
            options: [
              "Give the PIN if they sound polite",
              "Hang up and call the official customer care number yourself",
              "Dial the code they give you",
              "Send them a verification code instead, since it is not your PIN",
            ],
            answer_index: 1,
            explanation: "Real companies never need your PIN, so call the official number yourself.",
          },
          {
            prompt: "Which of these is a warning sign of a scam?",
            options: [
              "The message gives you plenty of time to check",
              "The message is a class timetable",
              "The message comes from a friend you see daily",
              "The message pressures you to act urgently",
            ],
            answer_index: 3,
            explanation: "Pressure and urgency are common warning signs.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "privacy-and-shared-phones": {
      explanation_md: `Customer service and front desk jobs often involve customer names, phone numbers and payment details. Adverts for these roles ask for people who keep records confidential and check a caller's identity before sharing information. The habits start with your own information. Many people in Ghana also share a phone with family, or use a shared computer at school, a library or a business centre, which makes privacy a practical daily skill.

## What to share, and what to keep private

Before you post or send something, ask: could a stranger use this to trick me, find me, or pretend to be me?

**Usually fine to share:** your name, your town, your skills, your interests, your professional photo.

**Keep private:** your MoMo PIN, passwords and codes, your Ghana Card number, your full date of birth, photos of your ID or bank card, your exact home location, and your daily routine.

Be careful with WhatsApp status and Facebook posts. A photo of a new ID card or a bank card, even partly covered, can help someone steal your identity.

## Privacy settings to check

* **WhatsApp:** in WhatsApp's Settings, open **Privacy**. You can choose who sees your profile photo, last seen, about and status. Choices include **My contacts** and, for most of these, **Nobody**. You can also control who can add you to groups.
* **Facebook and other apps:** look for **Privacy** or **Audience** settings and limit who can see your posts and phone number.

## Using a shared phone or computer safely

* **Screen lock.** Use a PIN, pattern, password or fingerprint that only you know, on your phone and on your own computer.
* **Sign out.** On a shared phone or computer, sign out of email and other accounts when you finish, or use a separate account for yourself if the device allows it. Many Android phones support more than one user profile, and Windows and Mac computers let each person have their own user account.
* **Private browsing.** In Chrome, an Incognito tab does not keep a record of the sites you visited after you close it. It does not hide what you do from the websites themselves, your network or your employer, but it helps on shared devices.
* **Do not save passwords** in the browser on a phone or computer that is not yours.
* **App lock.** Some phones and apps, including WhatsApp, let you lock individual apps with your fingerprint or a PIN.

## Respecting other people's information

At work you will see other people's details. Treat them as you want yours treated. Do not share a customer's number, photos or problems with friends. Ghana has a data protection law, and many employers have rules about customer information. Before giving account details over the phone, a good organisation checks who is calling.

## A worked example

Amina shares a phone with her younger brother. She set a fingerprint lock on WhatsApp, made her profile photo visible only to contacts, and signs out of her email after each study session. When she starts work as a customer service agent, verifying a caller's identity before discussing their parcel feels natural, because she already protects her own information the same way.`,
      practice_task_md: `**Goal:** Tighten your privacy in ten minutes.

**Steps**

1. In WhatsApp, open Settings, then Privacy. Set profile photo, last seen and status to My contacts, and choose who can add you to groups.
2. Check your phone, and your computer if you have one, has a screen lock that only you know.
3. Look at your last ten WhatsApp statuses or social media posts. Delete any that show an ID card, bank card, PIN or your exact home location.
4. If you share a phone or computer, sign out of your email now and practise signing back in.
5. Write down three things you will never post or send.

**Done looks like:** Updated WhatsApp privacy settings, a working screen lock, and your list of three things you keep private.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these should you keep private?",
            options: [
              "Your skills",
              "Your town",
              "A photo of your ID card or bank card",
              "Your interests",
            ],
            answer_index: 2,
            explanation: "Photos of ID or bank cards can help someone steal your identity.",
          },
          {
            prompt: "Where can you choose who sees your WhatsApp profile photo and last seen?",
            options: [
              "Settings, then Privacy",
              "The camera button",
              "The group description",
              "The Play Store",
            ],
            answer_index: 0,
            explanation: "WhatsApp's Privacy settings control who sees these details.",
          },
          {
            prompt: "What does an Incognito tab in Chrome do on a shared phone or computer?",
            options: [
              "Hides everything you do from your network and employer",
              "Speeds up your downloads",
              "Does not save your browsing history after you close it",
              "Locks the device",
            ],
            answer_index: 2,
            explanation: "Incognito does not keep your browsing history, but it does not hide activity from your network.",
          },
          {
            prompt: "Why do customer service jobs care about privacy habits?",
            options: [
              "Staff handle customer details and must keep them private",
              "Staff never see customer information",
              "Privacy makes calls shorter",
              "It is only needed for managers who sign the company contracts",
            ],
            answer_index: 0,
            explanation: "These roles handle names, numbers and payment details that must stay confidential.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "files-and-forms": {
      explanation_md: `Applying for a job usually means attaching a CV and a photo of a certificate. Registering for a course means filling in an online form. Field jobs with NGOs often involve entering survey answers into a form on a phone or tablet all day. Office jobs involve looking things up quickly and correctly. All of these come down to three skills: handling files, filling in forms and finding information.

This section teaches those skills on the phone or computer you already have, with tips for both.

## What this section covers

* **Photos, documents and files.** Where your downloads go, how to make a clear scan of a paper document, how to give files sensible names and how to send them.
* **Filling in online forms.** How to read a form, fill it in correctly, check it and submit it, whether it is a job application, a course registration or a field survey.
* **Searching and judging information.** How to choose good search words and decide whether a website can be trusted.

## Phone or computer, the same ideas

DMP week 1 teaches files and folders on a computer. The ideas are the same on a phone: a file has a name, it lives in a folder, and you can find, move, rename, share and delete it. If you learn this on your phone first, the computer version will feel familiar instead of strange. If you already use a computer, practise there and you will arrive a step ahead.

## A picture of the problem

Hawa from Bawku wanted to apply for an NGO field assistant job. The advert asked for a CV and a copy of her SHS certificate by email, and a short online form. She had a photo of her certificate somewhere in her gallery among hundreds of WhatsApp pictures. Her CV was a file her friend sent months ago, and she could not find it. The form had a question she skipped by mistake, so it would not submit.

None of these problems were hard. She just had not learned where files live, how to scan a document properly, or how to check a form before submitting. After this section, a task like that takes her twenty minutes instead of two frustrating days.

## Skills employers mention

Adverts for office assistants, customer service agents and NGO field officers in Ghana mention accurate records, entering data correctly, using forms and data collection apps, and finding information. Careful, accurate work matters more than speed at the beginning. Speed comes with practice.

## How to work through this section

Have a real document nearby, such as a certificate, a receipt or a school report, so you can practise scanning and sending it. If you can, also ask a friend to share a simple online form with you, or use one from a church, school or youth group.`,
      practice_task_md: `**Goal:** Gather the documents you would need for a job application.

**Steps**

1. Make a list of documents an entry level job might ask for: CV, certificates, Ghana Card, a passport photo.
2. Next to each one, write whether you have a clear digital copy on your phone or computer today.
3. For each one you can find, write where it is: Gallery, Downloads, Documents, WhatsApp, Google Drive or somewhere else.
4. Mark the ones you need to scan or create during this section.

**Done looks like:** A checklist of your documents showing which ones are ready and which you will prepare next.`,
      quiz: {
        questions: [
          {
            prompt: "Which three skills does this section teach?",
            options: [
              "Coding, design and marketing",
              "Selling, driving and cooking",
              "Typing letters, printing documents and photocopying certificates",
              "Handling files, filling in forms and finding information",
            ],
            answer_index: 3,
            explanation: "The section covers files, forms and searching.",
          },
          {
            prompt: "Why does learning files on a phone help before the DMP cohort's computer lessons?",
            options: [
              "Computers do not use files",
              "The ideas are the same, so computers will feel familiar",
              "DMP does not cover files, so phones are the only way to learn",
              "Phones cannot share files",
            ],
            answer_index: 1,
            explanation: "A file has a name and a folder on both phones and computers.",
          },
          {
            prompt: "Why would Hawa's online form not submit?",
            options: [
              "Her phone was too old",
              "She skipped a question by mistake",
              "The NGO had closed",
              "She used WiFi",
            ],
            answer_index: 1,
            explanation: "A skipped question stopped the form from submitting.",
          },
          {
            prompt: "According to the lesson, what matters more than speed at the beginning?",
            options: [
              "Careful, accurate work",
              "Using expensive apps",
              "Having a laptop",
              "Sending many messages",
            ],
            answer_index: 0,
            explanation: "Accuracy matters most at first, and speed comes with practice.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "files-on-your-phone": {
      explanation_md: `Every job application asks you to attach something: a CV, a certificate, an ID. Office and field jobs involve sending receipts, reports and photos of forms. Knowing where your files are, and how to send a clear copy, saves time and makes you look organised.

## Where files live

Phones and computers both store files in **folders**.

* **Downloads.** Files you download from a browser or email usually go here.
* **Pictures or DCIM.** Photos from your camera.
* **WhatsApp.** Photos and documents people send you on WhatsApp are saved in their own folders.

To see them, open your phone's file manager app. It may be called **Files**, **My Files** or **File Manager**. Tap **Downloads** or browse by category, such as Documents or Images. On a computer, open **File Explorer** on Windows or **Finder** on a Mac and click **Downloads** in the side panel.

## Give files clear names

A file called "IMG_20251003_0912" tells nobody anything. A file called "Hawa Issah CV" or "Hawa Issah SHS Certificate" does. In a phone's file manager, long press a file and choose **Rename**. On a computer, right click the file and choose **Rename**. Employers often receive many applications, and clear names help them find yours.

## Making a clear scan of a paper document

A crooked, dark photo of a certificate looks careless. A scan looks neat.

* The **Google Drive** app on Android has a scan tool. Look for the **camera** or **Scan** button in the app. Point the camera at the document, take the photo, and the app helps you crop it and save it as a PDF. Some phone camera apps also have a document scan mode. If you only have a computer, the scanner on a printer at a business centre or office does the same job.
* Place the paper on a dark, flat surface in good daylight.
* Make sure all four corners are visible and the text is sharp.
* Check the result before you save. Retake it if anything is cut off or blurry.

A **PDF** is a file type that looks the same on every phone and computer. It is the usual choice for CVs and certificates.

## Sending a file

* **WhatsApp:** tap or click the attach icon, choose **Document**, then pick the file.
* **Email:** in Gmail, tap or click the paperclip and choose the file. DMP week 1 will practise this in detail.
* **Share button:** in most apps, the share icon lets you send a file to WhatsApp, email or Drive.

## Keeping a backup

Phones and computers get lost, stolen or broken. Keep copies of important documents in Google Drive, which you get free with a Google account. Upload them on WiFi.

## A worked example

Sumaila needed to send his certificate to an employer in Tamale. He placed it on a dark table near a window, used the Drive scan tool, renamed the file "Sumaila Mahama WASSCE Certificate", and saved it in a Drive folder called "Job documents". When the employer asked for it, he sent it as a Document on WhatsApp in under a minute.`,
      practice_task_md: `**Goal:** Create a neat set of job documents.

**Steps**

1. Open your phone's file manager, or File Explorer or Finder on a computer, and find the Downloads folder. Note two files you find there.
2. Use the Google Drive scan tool, your camera's document mode or a scanner at a business centre to scan one paper document such as a certificate or report.
3. Rename it clearly with your name and the document type.
4. Create a folder in Google Drive called Job documents and save the scan there.
5. Send the PDF to a friend as a Document on WhatsApp and ask if it is clear.

**Done looks like:** A sharp, well named PDF in your Job documents folder, and a friend confirming it looks clear.`,
      quiz: {
        questions: [
          {
            prompt: "Where do files you download from a browser usually go?",
            options: [
              "The Downloads folder",
              "Your contacts",
              "The phone's battery settings",
              "Your WhatsApp status",
            ],
            answer_index: 0,
            explanation: "Downloaded files usually go to Downloads.",
          },
          {
            prompt: "Why should you rename a file like IMG_20251003_0912?",
            options: [
              "Long names use more data",
              "It makes the photo sharper",
              "Phones delete files with long number names after a month",
              "A clear name helps the employer find and recognise it",
            ],
            answer_index: 3,
            explanation: "Clear names such as your name and document type help people find your file.",
          },
          {
            prompt: "What is a good way to make a clear copy of a paper certificate?",
            options: [
              "Take a quick photo at night with the flash turned on",
              "Use a scan tool such as the one in Google Drive",
              "Draw a copy by hand",
              "Send a voice note describing it",
            ],
            answer_index: 1,
            explanation: "A scan tool crops the document and saves it as a neat PDF.",
          },
          {
            prompt: "Why keep important documents in Google Drive?",
            options: [
              "So you still have them if your device is lost or broken",
              "So they become public",
              "So they cannot be opened",
              "Because WhatsApp only lets you send files that are saved in Drive",
            ],
            answer_index: 0,
            explanation: "Drive keeps a backup when phones and computers get lost, stolen or broken.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "online-forms": {
      explanation_md: `Online forms are everywhere: job applications, course registrations, scholarship applications, NGO surveys and customer orders. Field officer and enumerator jobs with NGOs in northern Ghana often involve collecting survey answers on a phone or tablet using apps such as Google Forms or Kobo Collect. Office and customer service jobs involve entering customer details into systems. In every case, accuracy is the skill employers want.

## Parts of a form

Most forms use the same few types of question:

* **Short answer boxes** for things like your name or phone number.
* **Long answer boxes** for a few sentences, such as "Why do you want to join?"
* **Multiple choice**, where you tap or click one round button.
* **Checkboxes**, where you can tick more than one square.
* **Dropdowns**, where you tap or click and choose from a list.
* **Date pickers** and **file upload** buttons.

A small red star (an asterisk) next to a question usually means it is **required**. The form will not submit until you answer it.

## Filling in a form well

1. **Read the whole form first.** Scroll to the end so you know what you will need, such as a document to upload.
2. **Prepare your information.** Have your email address, phone number, Ghana Card number and documents ready.
3. **Type carefully.** Check spelling of names and every digit of phone numbers. One wrong digit means nobody can call you.
4. **Answer what is asked.** If a box asks for your district, do not write your full address.
5. **Review before submitting.** Many forms have more than one page. Use Back to check earlier pages.
6. **Submit once.** Then look for a confirmation message. Take a screenshot of it as proof.

## Forms in field work

Survey apps like Kobo Collect let field staff fill in forms even without network, then send them later when there is a connection. The rules are the same: ask each question exactly as written, record the answer exactly as given, and check before you send it. A survey with wrong data can lead an NGO to the wrong decisions about a community.

## A worked example

Alhassan is applying for a youth skills programme through a Google Form. He reads the whole form first and sees it needs a scan of his certificate, so he prepares it. He fills in his details carefully, notices he typed his phone number with a missing digit and fixes it. The form will not submit because he missed a required question marked with a red star. He goes back, answers it, submits, and takes a screenshot of the confirmation page.

Careful form filling is a small skill, but it shows exactly what employers mean by "attention to detail".`,
      practice_task_md: `**Goal:** Fill in a form accurately, then build one of your own.

**Steps**

1. Ask a friend, teacher or group leader for any online form, or find a real registration form for a free course.
2. Read the whole form first, then fill it in carefully, checking every name and number.
3. Take a screenshot of the confirmation message.
4. If you have a Google account, open Google Forms in your browser and create a three question form, for example a chop bar order form with name, phone number and choice of food. Make the phone number required.
5. Send it to two friends and ask them to fill it in.

**Done looks like:** A screenshot of a confirmation message, and your own form with at least two responses.`,
      quiz: {
        questions: [
          {
            prompt: "What does a small red star next to a form question usually mean?",
            options: [
              "The question is optional",
              "The question is required",
              "The question is a bonus",
              "The form is closed",
            ],
            answer_index: 1,
            explanation: "A red asterisk usually marks a required question.",
          },
          {
            prompt: "What should you do before you start typing answers?",
            options: [
              "Submit the form to test it",
              "Close the form and ask a friend to fill it in for you",
              "Fill in only the first page",
              "Read the whole form first so you know what you need",
            ],
            answer_index: 3,
            explanation: "Reading the whole form first shows what you need, such as documents to upload.",
          },
          {
            prompt: "Why is checking every digit of your phone number important?",
            options: [
              "Forms charge per digit",
              "One wrong digit means nobody can call you",
              "The form will correct a wrong digit for you",
              "It makes the form shorter",
            ],
            answer_index: 1,
            explanation: "A single wrong digit makes the number useless.",
          },
          {
            prompt: "What does the lesson say about survey apps like Kobo Collect?",
            options: [
              "They only work in Accra",
              "They replace paper forms but need network for every question",
              "They do not need careful answers",
              "They let you fill in forms offline and send them later",
            ],
            answer_index: 3,
            explanation: "Forms can be filled offline and sent when there is a connection.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "searching-well": {
      explanation_md: `When an office assistant needs a supplier's phone number, when a customer service agent needs to check a policy, or when you are stuck on a lesson, the skill that helps is the same: searching well. Employers value people who can find answers on their own. It is also how you will keep learning long after any course ends.

## Choosing good search words

A search engine like Google looks for pages that contain your words. Better words give better results.

* **Use the key words, not a full story.** Instead of "please how can I make my phone stop finishing my data quickly", try "reduce mobile data use Android".
* **Add a place when it matters.** "Business registration Ghana" gives more useful results than "business registration".
* **Use quotation marks for an exact phrase.** Searching "data protection act" with the quotation marks finds pages with those words together.
* **Search one site.** Typing site:gov.gh before your words shows results only from Ghana government websites.
* **Try again with different words** if the first results are not helpful. Good searchers often try three or four times.

## Judging whether to trust a page

Anyone can put anything on the internet. Before you trust or share information, ask:

* **Who wrote it?** An official organisation, a known news outlet, or someone unknown?
* **Is it official?** For government services, look for addresses ending in .gov.gh. For a company, look for its real website.
* **When was it written?** Prices, rules and app instructions change. Look for a date.
* **Does another good source agree?** Check one more trustworthy site.
* **Is it trying to sell or scare you?** Pages full of adverts, shocking headlines or urgent warnings deserve extra care.

Be careful with forwarded WhatsApp messages. If a message says "forward to everyone", check it before you pass it on.

## A worked example

Wumpini's manager asks her to find out how to register a small business name. She first types "how do I register my business I am in Tamale". The results are messy. She tries "register business name Ghana" and then adds site:gov.gh. Now she finds the official government registration page. She checks the page date, then compares with a well known Ghanaian news article. She sends her manager the official link and a two line summary.

## Searching while you learn

When a lesson uses a word you do not know, search "what is" followed by the word. When an error appears on your phone or computer, search the exact error message in quotation marks. These two habits alone will solve many problems.

DMP week 3 goes deeper into judging online sources. This lesson gives you the everyday habits first.`,
      practice_task_md: `**Goal:** Find a reliable answer to a real question.

**Steps**

1. Pick a real question, such as "How do I apply for a Ghana Card replacement?" or "What are the opening hours of the library in my town?"
2. Search it once in full sentence form and note the first result.
3. Search again using short key words and a place name. Then try adding site:gov.gh if the question is about a government service.
4. Choose the best page and write down who wrote it, when, and one other source that agrees.
5. Write a two line answer you could send to a manager, with the link.

**Done looks like:** Your two searches, your chosen source with its checks, and a short answer with a link.`,
      quiz: {
        questions: [
          {
            prompt: "Which search is likely to give better results?",
            options: [
              "please how can I make my phone stop finishing my data quickly",
              "reduce mobile data use Android",
              "phone data",
              "help me",
            ],
            answer_index: 1,
            explanation: "Short key words work better than a long story.",
          },
          {
            prompt: "What does typing site:gov.gh before your search words do?",
            options: [
              "Shows results only from Ghana government websites",
              "Makes the search free of adverts and sponsored results",
              "Translates the page",
              "Deletes your search history",
            ],
            answer_index: 0,
            explanation: "The site: operator limits results to one website or domain.",
          },
          {
            prompt: "Which question helps you judge whether to trust a page?",
            options: [
              "Is the page colourful?",
              "Who wrote it and when was it written?",
              "Does it load quickly?",
              "Does it appear first in the search results?",
            ],
            answer_index: 1,
            explanation: "Knowing the author and date helps you judge reliability.",
          },
          {
            prompt: "Why do quotation marks help in a search?",
            options: [
              "They find pages with those exact words together",
              "They search for each word separately on different pages",
              "They hide adverts",
              "They search only videos",
            ],
            answer_index: 0,
            explanation: "Quotation marks search for an exact phrase.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "computer-access": {
      explanation_md: `Your phone can do a lot, but many jobs and courses eventually need a computer. Job adverts in Ghana for office assistants, front desk staff and customer service agents often ask for basic computer skills. The Delta Mentoring Program starts in week 1 with computer hardware, files and folders, and then moves to Google Docs, Sheets and Slides. Getting a little comfortable with a keyboard and mouse before the cohort starts makes that first week much less stressful. If you already have a computer at home or at work, use this section to check your basics and build your typing speed.

## What this section covers

* **Finding a computer to practise on.** Places you might get regular access, and how to ask for it.
* **Mouse and keyboard basics.** Clicking, scrolling, dragging and the keys you will use every day.
* **Typing practice.** How to start typing with more fingers, a little each day, using free tools.

## You do not need to own a computer

Plenty of people learn their first computer skills on shared machines at school, a library, a community centre, a church or a business centre. What matters is regular practice, even if it is only an hour or two a week.

## Be kind to yourself at the start

If you have never used a computer, the first session can feel strange. The mouse moves too fast, the keyboard letters are not in alphabetical order and you are not sure what to click. That is normal for everyone. After a few sessions your hands learn the movements, and you stop thinking about them.

## A worked example

Napari in Gushegu had only ever used a phone. She asked her former school's ICT teacher if she could use the computer lab on Saturday mornings, and offered to help tidy the lab in return. In her first session she practised moving the mouse and opening a browser. By her fourth session she could type a short paragraph about herself, slowly but correctly. When she joined a digital skills cohort later, she was not afraid of the computer, so she could focus on learning Google Docs.

## Skills that carry over

If you did the earlier lessons on a phone, much of what you learned carries over. Sending a document, filling in a form and searching work the same way on a computer. You simply click with a mouse instead of tapping, and type on a bigger keyboard instead of a screen.

## Set a goal for this section

A good goal before joining the DMP cohort is to be able to:

* Turn a computer on and off properly.
* Open a web browser and visit a website.
* Click, scroll and drag with a mouse or touchpad.
* Type a short paragraph without looking for every key.

You do not need to be fast. You need to be comfortable enough that the computer does not stop you from learning.`,
      practice_task_md: `**Goal:** Plan your computer practice.

**Steps**

1. Write down any computer experience you already have, even if it is very little.
2. List three places near you where you might be able to use a computer.
3. Choose a realistic weekly time slot you could use, such as Saturday morning.
4. Write the four goals from the end of this lesson in your notebook and tick any you can already do.

**Done looks like:** A short plan with your experience, three possible places, a weekly time slot and your four goals with ticks.`,
      quiz: {
        questions: [
          {
            prompt: "What does DMP week 1 start with?",
            options: [
              "Writing computer programs",
              "Building websites",
              "Running paid adverts",
              "Computer hardware, files and folders",
            ],
            answer_index: 3,
            explanation: "The lesson says week 1 starts with computer hardware, files and folders.",
          },
          {
            prompt: "Do you need to own a computer to start practising?",
            options: [
              "Yes, you must buy one first",
              "No, regular practice on a shared computer is enough",
              "Yes, a phone cannot help at all",
              "No, watching videos about computers is enough practice",
            ],
            answer_index: 1,
            explanation: "Many people learn on shared computers; regular practice matters most.",
          },
          {
            prompt: "How did Napari get access to a computer?",
            options: [
              "She bought a new laptop",
              "She asked her former school's ICT teacher to use the lab",
              "She used her friend's password",
              "She paid a business centre to let her use a computer daily",
            ],
            answer_index: 1,
            explanation: "She asked politely and offered to help tidy the lab.",
          },
          {
            prompt: "Which of these is one of the suggested goals before joining the DMP cohort?",
            options: [
              "Type very fast without any mistakes",
              "Set up a computer network",
              "Repair computer hardware",
              "Type a short paragraph without looking for every key",
            ],
            answer_index: 3,
            explanation: "The goal is comfort, not speed: a short paragraph without searching for every key.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "finding-a-computer": {
      explanation_md: `Many entry level job adverts in Ghana, from office assistants to customer service agents, ask for basic computer skills. You cannot learn a keyboard only by reading about it. You need regular time in front of a real computer. The good news is that you do not have to own one.

## Places to ask

* **Your current or former school.** Many SHS and JHS schools have an ICT lab. Ask the ICT teacher or head teacher if you can use it after classes, at weekends or during holidays.
* **Public and community libraries.** Some libraries have computers for the public.
* **Community centres, youth centres and NGO offices.** Some run digital skills programmes or open computer rooms.
* **Churches and mosques.** Some have an office computer or run classes for young people.
* **Business centres and internet cafes.** You usually pay by the hour, so plan exactly what you will practise before you go.
* **Family, friends and employers.** A relative who owns a laptop, or a shop or office that might let you practise after closing time.

## How to ask

People are more likely to say yes if you are clear and polite, and if you offer something in return. For example:

"Good afternoon Sir. I am preparing for a digital skills programme and I need to practise typing and using a computer. Could I use the lab for one hour on Saturday mornings? I am happy to help keep the lab clean or assist younger students."

If someone says no, thank them and try the next place. One yes is enough.

## Make the most of each session

* **Go with a plan.** Write down what you will practise before you arrive, such as twenty minutes of typing and twenty minutes of mouse practice.
* **Bring what you need.** Your email address and password, earphones if you will watch a video, and a notebook.
* **Sign out when you finish.** Never leave your email or other accounts open on a shared computer.
* **Respect the equipment.** No food or drink near the computer, and shut it down properly if you are asked to.

## Regular beats long

One hour every week for two months builds more skill than one long day. Your hands need repeated practice to remember the keyboard. Put your time slot in your calendar as a reminder.

## A worked example

Abdul-Rahman lives in Tolon and has no computer at home. He asked a youth centre in his area and was told the computers were busy on weekdays. He asked again about Saturday afternoons, and they agreed. He now goes every Saturday with a written plan. In his notebook he keeps a short log: date, what he practised, and one thing he found hard. After a month he can see clear progress.

If you truly cannot find access yet, keep practising the rest of this roadmap on your phone and keep asking. Access often appears once people know you are serious.`,
      practice_task_md: `**Goal:** Secure a regular time to practise on a computer.

**Steps**

1. Choose two places from the lesson that exist near you.
2. Write a short, polite request like the example in the lesson, adapted to your situation.
3. Visit or call at least one place and ask.
4. If you get a yes, put the time slot in your calendar with a reminder.
5. Start a practice log page in your notebook with columns for date, what you practised and what was hard.

**Done looks like:** A confirmed time slot, or a note of who you asked and what they said, plus your practice log page ready to use.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a place the lesson suggests asking for computer access?",
            options: [
              "Your school's ICT lab",
              "A bus station",
              "A football pitch",
              "A mobile money agent's kiosk",
            ],
            answer_index: 0,
            explanation: "Schools with ICT labs are one of the suggested places.",
          },
          {
            prompt: "What makes people more likely to say yes when you ask?",
            options: [
              "Demanding access",
              "Being clear, polite and offering something in return",
              "Asking only once and never again",
              "Asking someone important to call them on your behalf",
            ],
            answer_index: 1,
            explanation: "A clear, polite request with an offer to help works best.",
          },
          {
            prompt: "What should you always do when you finish on a shared computer?",
            options: [
              "Leave your email open for next time",
              "Unplug the keyboard",
              "Change the computer's settings",
              "Sign out of your accounts",
            ],
            answer_index: 3,
            explanation: "Never leave accounts open on a shared computer.",
          },
          {
            prompt: "According to the lesson, which practice pattern builds more skill?",
            options: [
              "One long day once",
              "One hour every week for two months",
              "Only practising the night before a course",
              "Watching others use a computer",
            ],
            answer_index: 1,
            explanation: "Regular, repeated practice helps your hands remember.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "mouse-and-keyboard": {
      explanation_md: `When a job advert asks for basic computer skills, the very first part is using a mouse and keyboard without struggling. In DMP week 1 you will work with files, folders and a browser on a computer, so being comfortable with these tools lets you follow the mentor instead of hunting for buttons.

## The mouse

A mouse moves a small arrow, called the **pointer** or **cursor**, on the screen.

* **Click:** press the left button once. This selects something or presses a button on screen.
* **Double click:** press the left button twice quickly. This opens a file or folder.
* **Right click:** press the right button once. This shows a menu of extra options, like a long press on a phone.
* **Scroll:** roll the wheel in the middle to move up and down a page.
* **Drag:** hold the left button down, move the mouse, then let go. This moves a file or selects a block of text.

Hold the mouse lightly. If you run out of space on the table, lift it and put it back in the middle. The pointer will not move while the mouse is in the air.

Laptops often have a **touchpad** instead. Move one finger to move the pointer, tap to click, and slide two fingers to scroll.

## The keyboard

The letters are not in alphabetical order. This layout is called QWERTY, after the first letters on the top row. Everyone finds it strange at first.

Keys you will use every day:

* **Shift:** hold it while pressing a letter to make a capital letter.
* **Caps Lock:** turns capital letters on until you press it again. If everything you type is in capitals, check this key.
* **Space bar:** the long key at the bottom that makes a space.
* **Enter:** starts a new line, or sends and confirms.
* **Backspace:** deletes the character to the left of the cursor.
* **Delete:** deletes the character to the right of the cursor.
* **Arrow keys:** move the cursor without the mouse.

## Three shortcuts worth learning now

On Windows computers, hold **Ctrl** and press a letter:

* **Ctrl and C** copies selected text.
* **Ctrl and V** pastes it.
* **Ctrl and Z** undoes your last action. This one saves you whenever you make a mistake.

On a Mac, use the **Command** key instead of Ctrl.

## A worked example

Hawa opens a browser on a library computer. She clicks the address bar, types a website address, and presses Enter. On the page, she scrolls down with the wheel, then drags across a sentence to select it, presses Ctrl and C, opens a blank document and presses Ctrl and V. She accidentally deletes a word, so she presses Ctrl and Z and it comes back. Five basic actions, and she has copied information from one place to another, a task office workers do every day.`,
      practice_task_md: `**Goal:** Use the mouse and the most common keys without help.

**Steps**

1. On a computer, open the GCFGlobal LearnFree Mouse Tutorial in a browser and complete it.
2. Open any text editor or a blank Google Doc. Type your full name with capital letters using Shift.
3. Type a sentence, then use Backspace to delete one word and retype it.
4. Select the sentence by dragging, copy it with Ctrl and C, and paste it three times with Ctrl and V.
5. Delete one line, then bring it back with Ctrl and Z.

**Done looks like:** A document with your name and the pasted sentences, and a note in your practice log of which step was hardest.`,
      quiz: {
        questions: [
          {
            prompt: "What does a right click usually do?",
            options: [
              "Shows a menu of extra options",
              "Turns the computer off",
              "Types a capital letter",
              "Deletes the selected file without asking",
            ],
            answer_index: 0,
            explanation: "A right click shows a menu of extra options, like a long press on a phone.",
          },
          {
            prompt: "Which key do you hold to type a single capital letter?",
            options: [
              "Enter",
              "Backspace",
              "Shift",
              "Space bar",
            ],
            answer_index: 2,
            explanation: "Hold Shift while pressing a letter to make it a capital.",
          },
          {
            prompt: "What does Backspace do?",
            options: [
              "Deletes the character to the left of the cursor",
              "Deletes the character to the right of the cursor",
              "Copies text",
              "Opens a folder",
            ],
            answer_index: 0,
            explanation: "Backspace deletes to the left; Delete removes to the right.",
          },
          {
            prompt: "You deleted something by mistake on a Windows computer. Which shortcut brings it back?",
            options: [
              "Ctrl and C",
              "Ctrl and V",
              "Ctrl and Z",
              "Caps Lock",
            ],
            answer_index: 2,
            explanation: "Ctrl and Z undoes your last action.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "typing": {
      explanation_md: `Office assistants type letters and records, customer service agents type notes while customers talk, and DMP week 1 ends with writing a short tip sheet in Google Docs. If you type with one finger while searching for every key, these tasks take a long time and tire you out. Learning to touch type, using all your fingers without looking at the keys, is a skill that pays back in every course and job that follows.

## Start with the home row

Look at the middle row of letters. Rest your fingers like this:

* Left hand: little finger on **A**, then **S**, **D**, and your first finger on **F**.
* Right hand: first finger on **J**, then **K**, **L**, and your little finger on the semicolon key.
* Thumbs rest on the space bar.

Feel the small bumps on **F** and **J**. They let you find the home row without looking. Each finger reaches up and down from its home key to nearby keys, then comes back.

## Accuracy first, speed later

Beginners often rush and make many mistakes. Go slowly and press the right key with the right finger. Speed grows by itself once your fingers know where to go. If you keep making errors, slow down.

## Little and often

Ten to fifteen minutes every day is far better than two hours once a week. Your fingers learn through repetition. Some useful free tools:

* **GCFGlobal LearnFree Typing Tutorial** has short, guided lessons for complete beginners.
* **Monkeytype** gives simple typing tests and shows your speed and accuracy. Use it once you know the home row.

Both run in a web browser and use very little data once a page has loaded.

## Good posture

* Sit up straight with your feet flat on the floor.
* Keep your wrists relaxed, not resting hard on the table edge.
* Look at the screen, not your hands. Covering your hands with a cloth is an old trick that works.
* Take a short break if your hands or eyes feel tired.

## Typing on a phone helps too

You will still type a lot on your phone. Turn on your keyboard's spell check and suggestions, and learn to long press keys for extra characters. But phone typing does not replace keyboard practice, because the finger movements are different.

## A worked example

Issahaku started typing practice at his community library. In week one he could only type slowly, looking at the keys. He did fifteen minutes of the LearnFree typing lessons at each visit and practised the home row on a printed keyboard picture at home. After a month he could type a short paragraph about himself without looking down most of the time. His speed was still modest, but his accuracy was good, and he no longer felt nervous in front of a keyboard.

Track your progress in your practice log. Seeing improvement week by week keeps you motivated.`,
      practice_task_md: `**Goal:** Start a daily typing habit and measure your progress.

**Steps**

1. Open the GCFGlobal LearnFree Typing Tutorial and complete the first lessons on the home row.
2. Place your fingers on the home row and find the bumps on F and J without looking.
3. Type this sentence five times without looking at the keys: "Wumpini sells fresh tomatoes and pepper at the Tamale market."
4. When you are comfortable, take a one minute test on Monkeytype and write down your speed and accuracy.
5. Repeat the test once a week for a month.

**Done looks like:** A practice log showing your weekly speed and accuracy, with accuracy staying high as speed slowly grows.`,
      quiz: {
        questions: [
          {
            prompt: "Which keys have small bumps to help you find the home row?",
            options: [
              "A and L",
              "F and J",
              "Q and P",
              "Shift and Enter",
            ],
            answer_index: 1,
            explanation: "The bumps on F and J let your first fingers find home without looking.",
          },
          {
            prompt: "What should you focus on first when learning to type?",
            options: [
              "Speed",
              "Using only one finger",
              "Typing in capital letters",
              "Accuracy",
            ],
            answer_index: 3,
            explanation: "Accuracy first; speed grows once your fingers know where to go.",
          },
          {
            prompt: "Which practice pattern does the lesson recommend?",
            options: [
              "Two hours once a week",
              "Ten to fifteen minutes every day",
              "Only before an exam",
              "Once a month",
            ],
            answer_index: 1,
            explanation: "Little and often builds finger memory through repetition.",
          },
          {
            prompt: "Why does phone typing not replace keyboard practice?",
            options: [
              "Phones cannot type letters",
              "The finger movements are different",
              "Phone keyboards have fewer letters",
              "Phone typing uses too much data",
            ],
            answer_index: 1,
            explanation: "Typing on a phone uses different movements from a physical keyboard.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "learning-and-earning": {
      explanation_md: `Learning digital skills takes time and effort, so it helps to keep the reason in view: these skills can lead to work and income. Job adverts for shop attendants, cashiers, office assistants and field officers in Ghana ask for accurate records and payment handling. Digital careers in marketing, design, data and software start from the same foundations you are building now.

This section connects what you are learning to that bigger picture.

## What this section covers

* **Study habits that last.** How to keep going week after week, with small daily goals, good notes and a study partner. The DMP cohort runs for twelve weeks, so steady habits matter.
* **Mobile money and simple records.** How to use MoMo confidently, read your transaction history and keep a simple record of money in and out. Employers ask for accurate records again and again.
* **Exploring digital careers.** What jobs in digital marketing, design, data, product and software involve day to day, and how the DMP specialisations fit in.

## Learning is a skill too

Many people start an online course full of energy and stop after two weeks. That is not because they are not clever. It is usually because they tried to do too much at once, or studied alone with nobody to check in with. Learning how to learn is one of the most valuable things you can take from this roadmap.

## Records are everywhere

Think about the jobs around you. A chop bar owner tracks what she spends on ingredients and what she sells. A market trader in Bolgatanga writes down who owes him money. An NGO field officer records how many households were visited. A shop attendant checks at the end of the day that the MoMo payments match the sales. Each one needs accurate, simple records, often on a phone. This habit is useful in any job and in your own business.

## A worked example

Zuweira from Savelugu wanted to work in digital marketing but felt it was far away. She set herself one small goal each day: one lesson, or twenty minutes of typing. She started keeping a simple record of the money she earned plaiting hair, using a notebook and later a simple table on her phone. She then looked at what a social media marketing role involves and realised she already took good photos of her clients' hairstyles and posted them. Her small business suddenly looked like a first portfolio.

## Keep the bigger picture

You do not need to choose a career today. But knowing where these skills can lead makes the daily practice easier. When a lesson feels hard, remember that every skill in this roadmap appears in real job adverts or in the DMP cohort.`,
      practice_task_md: `**Goal:** Connect your learning to a goal you care about.

**Steps**

1. Write one sentence about why you are learning digital skills. Be specific, for example "to get an office job in Tamale" or "to grow my phone accessories business".
2. List any money you handle now, such as pocket money, sales or savings contributions.
3. Write down one digital job you are curious about.
4. Write one small daily learning goal you can keep for the next two weeks.

**Done looks like:** A short page in your notebook with your reason, the money you handle, one curious job and your daily goal.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, why do many people stop online courses early?",
            options: [
              "They are not clever enough",
              "They finish the course too quickly to remember anything",
              "Courses are always too short",
              "They try to do too much at once or study alone",
            ],
            answer_index: 3,
            explanation: "The lesson says it is usually doing too much at once or studying alone.",
          },
          {
            prompt: "Which of these is an example of keeping records from the lesson?",
            options: [
              "A shop attendant matching MoMo payments to sales",
              "Watching a film",
              "Charging customers' phones for a small fee at the shop",
              "Changing a ringtone",
            ],
            answer_index: 0,
            explanation: "Checking MoMo payments against sales is one of the record keeping examples.",
          },
          {
            prompt: "How long does the DMP cohort run?",
            options: [
              "Two weeks",
              "Twelve weeks",
              "One year",
              "Eighteen months",
            ],
            answer_index: 1,
            explanation: "The lesson says the DMP cohort runs for twelve weeks.",
          },
          {
            prompt: "What did Zuweira realise about her hair plaiting photos?",
            options: [
              "They were a waste of time",
              "They could be a first portfolio for social media marketing",
              "They should be deleted",
              "They were only useful for family",
            ],
            answer_index: 1,
            explanation: "Her client photos showed skills relevant to social media marketing.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "study-habits": {
      explanation_md: `The Delta Mentoring Program runs for twelve weeks, with assignments every week. Employers also want people who keep learning new systems and tools on the job. The skill underneath both is the same: steady study habits. Talent helps, but habits are what get people to the end of a course.

## Set a small daily goal

Big goals like "learn digital marketing" are hard to start. Small goals are easy to start and easy to finish:

* "Read one lesson today."
* "Do fifteen minutes of typing."
* "Finish one practice task."

Finishing a small goal every day builds confidence. If you miss a day, do not give up. Just start again the next day.

## Pick a regular time and place

Your brain likes routine. Choose a time that usually works, such as after morning chores or after evening prayers, and study then. Find the quietest place you can. Put your phone on Do not disturb so notifications do not pull you away.

## Take notes in your own words

Copying a lesson word for word does not help much. After reading a section, close it and write down:

* The main idea in one or two sentences.
* One example.
* One question you still have.

A simple notebook works perfectly. Writing in your own words, in English or mixed with your own language, shows you what you have really understood.

## Test yourself

Reading your notes again feels productive, but testing yourself works better. Take the quiz at the end of each lesson. Cover your notes and try to explain the idea out loud. Come back to a topic a few days later and check you still remember it.

## Learn with others

Find a study partner or a small group. You can meet in person or create a WhatsApp group. Agree to share one thing you learned each day, and to ask questions when stuck. Explaining something to someone else is one of the best ways to learn it yourself.

## Look after yourself

Sleep, food and short breaks matter. Studying for twenty five minutes, then resting for five, is a simple pattern many people find helpful. Long screen sessions tire your eyes, so look away from the screen now and then.

## A worked example

Amina and Mariama in Tamale are both preparing to apply for the DMP cohort. They agreed to study for thirty minutes each evening after supper and send each other one sentence about what they learned. When Mariama missed three days because of a family funeral, Amina sent her the lessons she had missed and a short summary. Mariama caught up in a weekend. Neither of them studied for long hours, but they kept going, and that made the difference.`,
      practice_task_md: `**Goal:** Build a study routine you can keep for two weeks.

**Steps**

1. Choose your daily study time and place and write them down.
2. Write a small daily goal for each of the next seven days.
3. Find one study partner and agree to send each other one thing you learned every day.
4. After each lesson, write the main idea, one example and one question in your notebook.
5. At the end of the week, tick the days you met your goal.

**Done looks like:** A one week plan, a study partner, and at least five days ticked off with notes for each lesson.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a good small daily goal?",
            options: [
              "Learn digital marketing this week",
              "Watch videos for five hours today",
              "Become an expert by tomorrow",
              "Do fifteen minutes of typing",
            ],
            answer_index: 3,
            explanation: "Small, specific goals are easy to start and finish.",
          },
          {
            prompt: "What should you write after reading a section?",
            options: [
              "A copy of every sentence you highlighted in the lesson",
              "The main idea, one example and one question",
              "Nothing, notes are not useful",
              "Only the title",
            ],
            answer_index: 1,
            explanation: "Writing in your own words shows what you have understood.",
          },
          {
            prompt: "Which study method does the lesson say works better than reading your notes again?",
            options: [
              "Testing yourself",
              "Highlighting everything",
              "Studying all night",
              "Reading faster",
            ],
            answer_index: 0,
            explanation: "Testing yourself works better than reading your notes again.",
          },
          {
            prompt: "What helped Mariama catch up after missing three days?",
            options: [
              "She quit the course",
              "Her study partner sent her the missed lessons and a summary",
              "She studied alone through the night until she had read everything",
              "She skipped those lessons",
            ],
            answer_index: 1,
            explanation: "Amina, her study partner, shared the lessons and a summary.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "money-records": {
      explanation_md: `Cashiers, shop attendants and front desk staff in Ghana are asked to process MoMo and card payments, issue receipts and keep accurate records of every transaction. Office assistants keep purchase records. Field officers record activities. If you freelance or run a small business later, you will need records to know whether you are making money at all. This lesson builds those habits with tools you already have.

## Mobile money confidently

You may already send and receive MoMo. At work, the extra skills are:

* **Check every payment.** When a customer says they have paid, confirm the money arrived in the business account, through the official app or menu, before handing over goods. Do not rely on a screenshot or an SMS the customer shows you, since these can be faked.
* **Check names and numbers before sending.** The confirmation screen usually shows the receiver's name. Read it before you enter your PIN.
* **Keep the transaction ID.** Every MoMo transaction has a reference number. It helps solve disputes.
* **Know the charges.** Sending and withdrawing usually have fees. Check them in your provider's official information so you are not surprised.

## Reading your transaction history

Your MoMo app or menu shows recent transactions: date, amount, who sent or received, and your balance. Look at it once a week. You will spot mistakes, unknown deductions or a payment you forgot.

## A simple record

A record does not need to be complicated. In a notebook, or a simple table on your phone or computer, use these columns:

* **Date**
* **What happened** (for example, "sold 2 bags of rice" or "bought airtime")
* **Money in**
* **Money out**
* **How** (cash or MoMo, with the transaction ID)

At the end of each day or week, add up money in and money out. The difference shows whether you gained or lost.

## A worked example

Fuseini sells phone accessories in Tamale. Here is part of his record for Monday. The prices are only examples to show how the record works:

* Monday, sold 3 chargers, money in 90 cedis, MoMo, ID noted.
* Monday, sold 1 earphone, money in 25 cedis, cash.
* Monday, bought transport to market, money out 10 cedis, cash.

At the end of the day, money in is 115 cedis and money out is 10 cedis, so he is up 105 cedis before stock costs. When a customer later claimed to have paid twice, Fuseini checked his record and the transaction IDs in his MoMo history and settled it calmly.

## From notebook to spreadsheet

In DMP week 2 you will learn Google Sheets, which can add up these columns for you. If you start a record on paper, a phone or a computer now, you will already understand what a spreadsheet is for when you get there.

Accurate records build trust with employers, customers and anyone who might one day lend to or invest in your business.`,
      practice_task_md: `**Goal:** Keep a simple money record for one week.

**Steps**

1. In a notebook or a table on your phone or computer, create the five columns from the lesson: date, what happened, money in, money out, how.
2. Record every amount of money you receive or spend for seven days, including airtime and data.
3. Open your MoMo transaction history and check it matches your record. Note any differences.
4. At the end of the week, add up money in and money out.
5. Write one thing you learned about where your money goes.

**Done looks like:** A complete one week record with totals, matched against your MoMo history, and one sentence about what you learned.`,
      quiz: {
        questions: [
          {
            prompt: "A customer shows you a screenshot saying they have paid. What should you do?",
            options: [
              "Accept it and hand over the goods",
              "Refuse to sell anything",
              "Ask them to send another screenshot with the transaction ID visible",
              "Confirm the money arrived through the official app or menu",
            ],
            answer_index: 3,
            explanation: "Screenshots and SMS messages can be faked, so confirm the payment yourself.",
          },
          {
            prompt: "Why should you keep the MoMo transaction ID?",
            options: [
              "It makes the next payment free",
              "It helps solve disputes",
              "It is your PIN",
              "It increases your balance",
            ],
            answer_index: 1,
            explanation: "The reference number helps prove and solve payment disputes.",
          },
          {
            prompt: "Which columns does the lesson suggest for a simple record?",
            options: [
              "Date, what happened, money in, money out, how",
              "Name, age, height, colour",
              "Only the total for the year",
              "Customer name, phone number and favourite item",
            ],
            answer_index: 0,
            explanation: "These five columns are enough for a simple, useful record.",
          },
          {
            prompt: "In Fuseini's example, what was his money in for Monday?",
            options: [
              "10 cedis",
              "90 cedis",
              "105 cedis",
              "115 cedis",
            ],
            answer_index: 3,
            explanation: "90 cedis plus 25 cedis makes 115 cedis in.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "digital-careers": {
      explanation_md: `It is easier to keep practising when you know where the practice can lead. Digital skills open doors to many kinds of work, from entry level office and customer service roles to careers in marketing, design, data, product and software. Some of these jobs exist in Tamale, Bolgatanga and Wa, some in Accra and Kumasi, and some can be done remotely. You do not need to choose now, but exploring the options helps you stay motivated.

## Some digital career paths

* **Digital marketing.** Helping businesses reach customers online through social media posts, search engines, email and adverts. The DMP cohort focuses on this area, with specialisations in SEO and content marketing, social media marketing, and Google Ads.
* **UI and UX design.** Designing apps and websites that are easy and pleasant to use, often with tools like Figma.
* **Data.** Collecting, cleaning and studying information to help organisations make decisions. NGOs, banks and research organisations all need people who handle data carefully.
* **Product.** Working out what an app or service should do for its users and helping a team build it.
* **Software.** Writing the code that makes websites, apps and systems work, on the front end that users see or the back end that stores data.

SydCrest has a free roadmap for each of these paths. Open them, read the first few topics and see which ones interest you.

## Questions to ask yourself

* Do I enjoy writing and talking to people? Marketing or customer roles might suit you.
* Do I like drawing, arranging things neatly or noticing what is confusing? Design might suit you.
* Do I like numbers, puzzles and finding patterns? Data might suit you.
* Do I like organising people and solving problems? Product might suit you.
* Do I like building things and following logic step by step? Software might suit you.

There are no wrong answers. Many people try one path and move to another later.

## Talk to real people

If you know anyone who works with computers, at an NGO, a bank, a telecom shop or a business centre, ask them what they do all day. Most people are happy to talk about their work for ten minutes. Write down what surprised you.

## A worked example

Sumaila thought tech only meant coding, which worried him because he disliked maths. He read the digital marketing and UI design roadmaps on SydCrest and spoke to a cousin who manages social media pages for shops in Tamale. He realised he enjoyed writing short, catchy messages and taking product photos. He decided to aim for the social media specialisation in the DMP cohort. Knowing his direction made his typing and English practice feel worthwhile.

Every path above starts with the foundations in this roadmap: confident use of your phone or computer, clear communication, safe accounts, files and forms, and basic computer skills.`,
      practice_task_md: `**Goal:** Explore at least two digital career paths.

**Steps**

1. Open two SydCrest roadmaps that interest you and read the titles and summaries of the first five topics in each.
2. Answer the five questions in the lesson honestly in your notebook.
3. Talk to one person who uses computers or a smartphone for work and ask what a normal day looks like.
4. Write three sentences: which path interests you most right now, why, and one skill from this bridge roadmap it needs.

**Done looks like:** Notes on two roadmaps, your answers to the five questions, notes from one conversation and your three sentences.`,
      quiz: {
        questions: [
          {
            prompt: "Which area does the DMP cohort focus on?",
            options: [
              "Software engineering",
              "Digital marketing",
              "Hardware repair",
              "Accounting",
            ],
            answer_index: 1,
            explanation: "The lesson says the DMP focuses on digital marketing.",
          },
          {
            prompt: "Which DMP specialisation is mentioned in the lesson?",
            options: [
              "Mobile game design",
              "Mobile app development",
              "Cybersecurity",
              "Social media marketing",
            ],
            answer_index: 3,
            explanation: "The specialisations are SEO and content marketing, social media marketing, and Google Ads.",
          },
          {
            prompt: "Someone enjoys numbers, puzzles and finding patterns. Which path might suit them?",
            options: [
              "Data analysis",
              "Customer service only",
              "Driving",
              "Photography only",
            ],
            answer_index: 0,
            explanation: "The lesson links numbers and patterns to data work.",
          },
          {
            prompt: "What did Sumaila learn about tech careers?",
            options: [
              "Tech only means coding",
              "There are paths like marketing that use writing and photos",
              "He had to be good at maths for every role",
              "Digital careers only exist abroad",
            ],
            answer_index: 1,
            explanation: "He discovered social media marketing suited his writing and photo skills.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "ready-for-dmp": {
      explanation_md: `This is the last section of the Digital Skills Bridge. Its job is to check that you are ready for the first week of the Delta Mentoring Program, SydCrest's twelve week mentored cohort in digital skills and digital marketing, and to help you apply.

## What the DMP covers

The cohort starts with the basics and builds up:

* **Week 1:** computer and internet basics. Using computer hardware, managing files and folders, browsing safely and recognising phishing, and using Gmail to send and receive emails with attachments. The first assignment is a short tip sheet about safe internet habits, written in Google Docs.
* **Week 2:** Google Drive, Docs, Slides and Sheets.
* **Week 3:** online communication and digital citizenship.
* **Weeks 4 to 6:** digital marketing ideas, social media and analytics.
* **Weeks 7 to 9:** a specialisation in SEO and content marketing, social media marketing, or Google Ads.
* **Weeks 10 to 12:** a full campaign, a portfolio and a final assessment.

## How this bridge prepared you

Look at week 1 again. Each part builds on something you practised here:

* Computer hardware builds on **mouse and keyboard basics** and **finding a computer**.
* Files and folders builds on **photos, documents and files**.
* Safe browsing and phishing builds on **spotting scams**, **passwords and two step verification** and **privacy**.
* Gmail with attachments builds on **one email address you control** and sending documents on **WhatsApp**.
* The Google Docs tip sheet builds on **typing** and **clear English**.

You are not expected to be an expert. The cohort will teach you. But arriving with these foundations means you can follow your mentor and focus on the new skills.

## What this section covers

* **Readiness checklist.** A practical check of the skills week 1 assumes, with a link back to any lesson you should revisit.
* **Apply to the DMP cohort.** Where to sign up, what to mention about your progress, and what to do if you do not get a seat this time.

## A worked example

Hawa finished the bridge over two months. Before applying, she went through the readiness checklist. She could do everything except join a video call confidently, so she spent one more evening practising with a friend. When the cohort began, she followed along as her mentor explained files and folders, and she already knew where her own files lived. It felt like the next step, not a jump into the unknown.

Whatever happens with your application, the skills you built here are yours. They already make you more ready for many entry level jobs.`,
      practice_task_md: `**Goal:** Map your bridge progress to DMP week 1.

**Steps**

1. Write the four parts of DMP week 1 in your notebook: computer hardware, files and folders, safe browsing and phishing, Gmail with attachments.
2. Next to each one, write the bridge lessons that prepared you for it.
3. Give yourself a score from 1 to 3 for each part: 1 means not yet, 2 means getting there, 3 means confident.
4. For any part scored 1, write which lesson you will revisit this week.

**Done looks like:** A short table with the four week 1 topics, the matching bridge lessons, your scores and your revisit plan.`,
      quiz: {
        questions: [
          {
            prompt: "How long is the Delta Mentoring Program?",
            options: [
              "Four weeks",
              "Twelve weeks",
              "Eighteen months",
              "One year",
            ],
            answer_index: 1,
            explanation: "The DMP is a twelve week mentored cohort.",
          },
          {
            prompt: "Which of these is part of DMP week 1?",
            options: [
              "Running Google Ads campaigns",
              "Writing computer code",
              "Building a portfolio",
              "Using Gmail to send emails with attachments",
            ],
            answer_index: 3,
            explanation: "Week 1 includes Gmail with attachments, files and folders, hardware and safe browsing.",
          },
          {
            prompt: "Which bridge lesson prepares you for files and folders in week 1?",
            options: [
              "Photos, documents and files",
              "Handling work phone calls",
              "Exploring digital careers",
              "Saving data and money",
            ],
            answer_index: 0,
            explanation: "Files on a phone use the same ideas as files and folders on a computer.",
          },
          {
            prompt: "What did Hawa do when the checklist showed a gap?",
            options: [
              "She gave up on applying",
              "She practised video calls with a friend before the cohort",
              "She ignored it",
              "She asked someone else to join for her",
            ],
            answer_index: 1,
            explanation: "She spent one more evening practising video calls.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "readiness-check": {
      explanation_md: `Before you apply to the DMP cohort, or to an entry level job that asks for basic digital skills, it helps to check honestly what you can already do. This checklist covers what DMP week 1 assumes, plus the everyday skills from the rest of this roadmap. It is not an exam. It is a way to find any small gaps so you can fix them before they slow you down.

## How to use the checklist

For each item, do it for real, right now if you can, rather than just thinking "I can probably do that". Mark each one:

* **Yes:** I did it without help.
* **Nearly:** I did it but needed to look something up.
* **Not yet:** I could not do it.

## Device and data

* I can connect to WiFi, and on a phone I can switch mobile data on and off.
* I can free up storage and manage which apps use my data.
* I can install an app from the official store and check its permissions.

## Communication

* I can answer a call professionally and take a complete message.
* I can send a clear WhatsApp message and share a PDF as a Document.
* I can join a video call from a link, mute and unmute, and turn my camera on and off.
* I can write a short, polite message in clear English.

## Accounts and safety

* I can sign in to my own email address, and its recovery number is my own.
* I have two step verification turned on for my email and WhatsApp.
* I can name at least three common MoMo or online scams.
* I have checked my WhatsApp privacy settings.

## Files, forms and searching

* I can find my Downloads folder and rename a file.
* I can scan a paper document into a clear PDF.
* I can fill in an online form carefully and keep the confirmation.
* I can search with key words and judge whether a page is trustworthy.

## Computer and study

* I have regular access to a computer.
* I can click, double click, right click, scroll and drag.
* I can type a short paragraph with my fingers on the home row, even if slowly.
* I have a study routine and a study partner.

## What to do with your results

* **All or mostly Yes:** you are ready. Move on to the next lesson and apply.
* **Some Nearly:** practise those items once more this week. You can still apply.
* **Any Not yet:** go back to that lesson in this roadmap. Each item above matches a lesson by name.

## A worked example

Issahaku went through the list. He had Yes for most items, Nearly for scanning a document and Not yet for two step verification. He spent twenty minutes that evening turning on two step verification for Gmail and WhatsApp, and scanned his certificate with Google Drive. The next day every item was Yes or Nearly, and he applied with confidence.

Keep your completed checklist. It is useful evidence of your progress when you apply.`,
      practice_task_md: `**Goal:** Complete the readiness checklist honestly.

**Steps**

1. Copy the checklist headings and items into your notebook, or take screenshots of this page.
2. Do each item for real and mark it Yes, Nearly or Not yet.
3. For each Not yet, write the name of the lesson to revisit and a day this week when you will do it.
4. Ask a friend or mentor to watch you do three items of your choice, such as joining a video call, sending a PDF and typing a paragraph.
5. Update your marks once you have fixed the gaps.

**Done looks like:** A completed checklist with every item at Yes or Nearly, and a note of which items a friend or mentor watched you do.`,
      quiz: {
        questions: [
          {
            prompt: "How should you use the readiness checklist?",
            options: [
              "Guess your answers quickly",
              "Do each item for real and mark it honestly",
              "Skip items that look hard",
              "Only read the headings",
            ],
            answer_index: 1,
            explanation: "Doing each item for real shows what you can actually do.",
          },
          {
            prompt: "What should you do if an item is marked Not yet?",
            options: [
              "Give up on applying forever",
              "Mark it Yes anyway",
              "Ignore it",
              "Go back to the matching lesson in this roadmap",
            ],
            answer_index: 3,
            explanation: "Each item matches a lesson by name, so revisit it.",
          },
          {
            prompt: "Which item appears in the Accounts and safety part of the checklist?",
            options: [
              "I can type very fast",
              "I have two step verification turned on for my email and WhatsApp",
              "I can build a website",
              "I own a laptop with antivirus software and all the latest updates installed",
            ],
            answer_index: 1,
            explanation: "Two step verification is one of the accounts and safety items.",
          },
          {
            prompt: "Is the checklist an exam you must pass with full marks?",
            options: [
              "Yes, with no mistakes allowed",
              "No, it is a way to find small gaps to fix",
              "Yes, and it is timed",
              "No, it is only a survey for the SydCrest team to read",
            ],
            answer_index: 1,
            explanation: "The lesson says it is not an exam but a way to find gaps.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "apply-to-dmp": {
      explanation_md: `You have built real foundations: confident use of your phone or computer, professional communication, safe accounts, files and forms, and first steps on a computer. The next step is to try for a seat in the Delta Mentoring Program. The first cohort is a free pilot with 25 seats, starting in January 2027. Applying is itself a useful skill, because job applications in Ghana use the same steps: read the instructions, fill in a form, attach documents and write about yourself clearly.

## Before you apply

* **Use the official page.** On the SydCrest website, open the **Programme** page. It explains the cohort and has a waitlist form. Join the waitlist there. The pilot cohort is free, so be careful of anyone who asks you to pay a fee to "secure" a seat for you. Use your scam spotting skills.
* **Read all the instructions.** Read the Programme page and any messages SydCrest sends you. Note any deadline and what you need to prepare.
* **Prepare your details.** Your professional email address, your phone number and any documents asked for, scanned clearly and named properly.
* **Check your time.** The cohort runs for twelve weeks with weekly assignments. Think honestly about the hours you can give each week, and plan around work, family and farming seasons.

## Writing about yourself

Forms like this often ask a few short questions, such as where you are and why you want to join. Use clear English and short sentences. A helpful structure:

1. **Who you are:** your name, where you live and what you do now.
2. **Why you want to join:** a real reason, such as a job you want or a business you want to grow.
3. **What you have already done:** mention your progress on this roadmap. For example, that you completed the Digital Skills Bridge, set up a professional email with two step verification, practise typing every week and kept a money record for a month.
4. **Your commitment:** the time you can give each week.

Specific examples are more convincing than big promises. "I practise typing for fifteen minutes every day at the community library" says more than "I am very hardworking".

## Fill in the form carefully

Use everything from the online forms lesson when you fill in the waitlist form and any form that follows. Read the whole form first, check every name and number, review before submitting, and take a screenshot of the confirmation.

## If you do not get a seat this time

The pilot cohort has only 25 seats, so not everyone who joins the waitlist will get one. That does not mean you are not good enough. Keep learning on SydCrest's free roadmaps, keep your practice log going, and watch the Programme page. If another cohort is announced, apply again with even more progress to show. Everything you learn in the meantime makes you more ready for both the cohort and for jobs.

## A worked example

Wumpini wrote: "My name is Wumpini Alhassan from Savelugu. I sell provisions and want to learn social media marketing to grow sales. I completed the Digital Skills Bridge, I now type a paragraph without looking at the keys, and I keep weekly sales records. I can study for six hours each week in the evenings." It is short, clear and specific.`,
      practice_task_md: `**Goal:** Prepare a strong application.

**Steps**

1. Write a short draft answer to "Why do you want to join the DMP?" using the four part structure from the lesson.
2. Include at least two specific examples of progress from this roadmap.
3. Read it aloud, then shorten any long sentences and check spelling and names.
4. Ask a friend, teacher or mentor to read it and suggest one improvement.
5. Make sure your email address, phone number and scanned documents are ready in your Job documents folder.

**Done looks like:** A final draft of four to six sentences, ready to paste into the application form, and your documents ready to attach.`,
      quiz: {
        questions: [
          {
            prompt: "Where should you sign up for the DMP?",
            options: [
              "From anyone who asks for a small fee to secure your seat early",
              "The waitlist form on the SydCrest website's Programme page",
              "In a random forwarded WhatsApp message",
              "From an unknown caller",
            ],
            answer_index: 1,
            explanation: "The official waitlist is on SydCrest's Programme page, and the pilot is free, so a fee request is a warning sign.",
          },
          {
            prompt: "Which sentence is more convincing in an application?",
            options: [
              "I am very hardworking",
              "I practise typing for fifteen minutes every day at the community library",
              "I am the best candidate",
              "I am passionate about technology and I promise to learn everything very quickly",
            ],
            answer_index: 1,
            explanation: "Specific examples are more convincing than big promises.",
          },
          {
            prompt: "Which of these belongs in the four part structure for writing about yourself?",
            options: [
              "Your favourite food",
              "What you have already done on this roadmap",
              "The phone numbers of two friends who can vouch for you",
              "Your MoMo PIN",
            ],
            answer_index: 1,
            explanation: "The structure includes who you are, why, what you have done and your commitment.",
          },
          {
            prompt: "What should you do if you do not get a seat this time?",
            options: [
              "Stop learning completely",
              "Keep learning on the free roadmaps and apply again",
              "Pay someone who says they can get you a seat next time",
              "Delete your email account",
            ],
            answer_index: 1,
            explanation: "The pilot has only 25 seats, so keep learning and apply again with more progress if another cohort opens.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
