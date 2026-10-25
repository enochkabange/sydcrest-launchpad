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
  },
};

export default content;
