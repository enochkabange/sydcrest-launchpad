import type { TrackContent } from "./types";

/**
 * Original lesson content for the Video and Content Creation roadmap (Wave 3).
 * Research and sources: src/content/research/content-creation.md.
 * Apps are named only as free examples, never as endorsements.
 */
const content: TrackContent = {
  roadmap: "content-creator",
  nodes: {
    "getting-started": {
      explanation_md: `Look at the businesses around you in Tamale, Wa or Bolgatanga. The phone shop, the hair salon, the church, the NGO running a farming project and the restaurant near the lorry station all want people to see them online. Many of them post blurry photos or nothing at all. Someone who can plan, film, edit and publish good content on a phone is useful to every one of them.

## What creators actually do

The work goes by several names in job adverts:

* **Content creator.** Plans and makes videos, photos and posts for a brand or for their own channel.
* **Videographer or photographer.** Shoots events, products and interviews, then edits them for clients.
* **Video editor.** Turns other people's raw footage into finished videos, often remotely.
* **Social media content officer.** Creates and schedules content for a company's pages and talks with followers.

Ghanaian adverts for these roles keep asking for the same things: shooting video and photos, editing short vertical videos for TikTok, Instagram Reels, Facebook and YouTube Shorts, writing captions, knowing platform trends, and a portfolio that shows real work. Some go further and ask for live streaming, thumbnails, lighting and sound. Very few ask for expensive equipment. They ask for proof that you can tell a story clearly.

## Your own channel or other people's brands

There are two broad paths, and most people mix them. You can build your **own audience** around a topic you care about, such as farming tips in Dagbani or cooking northern dishes. Or you can make **content for others**: businesses, events, NGOs and brands that pay for your skill. The second path usually earns money sooner, because a shop owner can pay you this week while an audience takes months or years to grow.

## Starting with what you have

You do not need a new phone or a laptop to begin. A phone that records clear video, some free editing apps and the habits in this roadmap are enough to make work good enough for a portfolio. Where a laptop would help, such as editing long YouTube videos, a school lab, library or community centre with computers can fill the gap.

This first section covers two practical foundations: setting up your phone as a studio, and working in a way that protects your data bundle.

## A small example

Mariama lives in Damongo and loves filming her friends. She notices that a local shea butter cooperative has a Facebook page with three old posts. She films a short video of the women at work, adds captions, and shows it to the group leader. The leader shares it and asks Mariama to make one video a week. That one video became her first portfolio piece and her first client.`,
      practice_task_md: `**Goal:** Map the content work around you and choose your starting path.

**Steps:**
1. Walk through your area or scroll your WhatsApp contacts and list ten businesses, groups or organisations near you.
2. For each one, write one line on how they show up online now: no page, old posts, good posts, or only WhatsApp Status.
3. Pick the three that would gain most from better photos or video, and write one content idea for each.
4. Write two sentences on whether you want to start with your own channel, client work, or both, and why.

**Done looks like:** A note with the ten names, three ideas and your two sentences. Keep it; you will use these names again in later lessons.`,
      quiz: {
        questions: [
          {
            prompt: "Which skill do Ghanaian content creator adverts most often ask for?",
            options: [
              "Owning a professional cinema camera and a full set of studio lights",
              "Writing computer code for websites",
              "Shooting and editing short vertical videos for social platforms",
              "Running a television station",
            ],
            answer_index: 2,
            explanation: "The lesson notes that adverts repeatedly ask for shooting and editing short vertical videos, not expensive equipment.",
          },
          {
            prompt: "Why does client work often earn money sooner than building your own audience?",
            options: [
              "Because a shop owner can pay you now, while an audience grows slowly",
              "Because platforms start paying beginners from their very first upload",
              "Because audiences grow in a few days",
              "Because client work needs no portfolio",
            ],
            answer_index: 0,
            explanation: "A shop owner can pay for content now, while an audience builds slowly.",
          },
          {
            prompt: "What does a video editor role usually involve?",
            options: [
              "Only taking still photos at weddings",
              "Selling phones in a shop",
              "Managing a company's accounts",
              "Turning raw footage into finished videos, often remotely",
            ],
            answer_index: 3,
            explanation: "The lesson describes a video editor as someone who turns other people's raw footage into finished videos, often remotely.",
          },
          {
            prompt: "Mariama got her first client mainly because she:",
            options: [
              "Bought an expensive camera",
              "Filmed a useful video for a group that needed one and showed it to them",
              "Waited for the cooperative to advertise a paid job on its Facebook page first",
              "Copied another creator's video",
            ],
            answer_index: 1,
            explanation: "She spotted a group that needed content, made a real video and showed it to the leader.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "phone-studio": {
      explanation_md: `Clients do not ask what phone you used. They ask whether the video is sharp, well lit and easy to hear. Most of that comes from how you set up and handle the phone, not from its price. Getting your phone ready before a shoot is the first sign that you take the work seriously.

## Settings worth checking

Open your camera app and look for these. Names differ between phones, but most have them.

* **Resolution and frame rate.** 1080p at 30 frames per second is enough for social media and YouTube. 4K files are much larger, fill storage quickly and are slow to edit on a modest phone.
* **Grid lines.** Turn on the grid. It helps you keep horizons straight and place people well.
* **Focus and exposure lock.** On many phones you can press and hold on the subject to lock focus and brightness, so the picture does not keep changing while you film.
* **Main lens first.** The main back camera is usually the best one. Front cameras and digital zoom often look softer. Walk closer instead of zooming.

## Habits that make a big difference

* **Clean the lens** with a soft cloth before every shoot. Fingerprints and dust make footage look hazy.
* **Free up space.** Clear old videos and backed up photos so the phone does not stop recording halfway through an interview.
* **Charge fully** and carry a power bank if you have one. Video drains batteries fast.
* **Switch on airplane mode or do not disturb** while recording, so calls and notifications do not interrupt a take.
* **Hold the phone horizontally or vertically on purpose.** Vertical for TikTok, Reels, Shorts and Status; horizontal for normal YouTube videos.

## Free apps as a starter kit

You can do a lot with the camera app plus a few free tools. Examples include CapCut, VN or InShot for editing video, Snapseed for photos, Canva for thumbnails and graphics, and the YouTube Studio app for managing a channel. These are examples, not recommendations; many have paid extras you do not need. Pick one editor and learn it well instead of installing five.

## A small example

Fuseini is asked to film a pastor's short message for a church page in Tamale. Before he starts, he cleans his lens, deletes old clips to free space, switches to 1080p, turns on airplane mode and locks focus on the pastor's face. The video comes out sharp and steady, with no ringing phone halfway through. The church asks him back the next week.`,
      practice_task_md: `**Goal:** Set up your phone as a ready studio.

**Steps:**
1. Check your camera settings: set video to 1080p and 30 frames per second if available, and turn on grid lines.
2. Free up at least enough space to record ten minutes of video.
3. Practise focus lock: film the same object for ten seconds with and without holding your finger on it, and compare.
4. Install one free video editor and one free photo editor, if you do not already have them, on WiFi.
5. Write a short checklist of your before shoot habits (lens, space, battery, airplane mode, orientation).

**Done looks like:** Your two test clips and your checklist, saved in a notes app, ready to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which video setting does the lesson suggest is enough for social media and YouTube?",
            options: [
              "1080p at 30 frames per second",
              "4K at 60 frames per second",
              "480p at 15 frames per second",
              "Slow motion only",
            ],
            answer_index: 0,
            explanation: "1080p at 30 frames per second is enough and keeps files manageable.",
          },
          {
            prompt: "Why is walking closer usually better than zooming in?",
            options: [
              "Zooming uses more data when the clip is uploaded later",
              "Walking closer charges the battery",
              "Digital zoom often makes the picture look softer",
              "Zooming deletes your files",
            ],
            answer_index: 2,
            explanation: "Digital zoom on most phones reduces sharpness, so moving closer gives a cleaner image.",
          },
          {
            prompt: "What does locking focus and exposure help with?",
            options: [
              "It makes the video vertical",
              "It stops the picture changing brightness and focus while you film",
              "It adds music automatically",
              "It switches the phone to the front camera so you can see yourself while filming",
            ],
            answer_index: 1,
            explanation: "Holding on the subject keeps focus and brightness fixed during the shot.",
          },
          {
            prompt: "Which orientation suits TikTok, Reels, Shorts and WhatsApp Status?",
            options: [
              "Horizontal",
              "Square only",
              "Upside down",
              "Vertical",
            ],
            answer_index: 3,
            explanation: "These formats are vertical, while normal YouTube videos are horizontal.",
          },
          {
            prompt: "What is the lesson's advice about editing apps?",
            options: [
              "Install as many as possible",
              "Only paid apps give professional results",
              "Never use an editing app",
              "Pick one editor and learn it well",
            ],
            answer_index: 3,
            explanation: "Learning one free editor well is more useful than installing many.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "data-saving-workflow": {
      explanation_md: `Video is heavy. One careless upload or an app updating itself in the background can finish a data bundle you bought for the whole week. Creators who work on prepaid data have to plan where every megabyte goes. Doing this well is not only about saving money: it also means you can still deliver to a client when the network is slow.

## The main idea: offline first

Almost every step of content creation can happen without data. Planning, writing, shooting and editing all work offline once your apps are installed. Only two things truly need the internet: sending files to someone and publishing. So the rule is simple: do the heavy work offline, then connect once, on purpose, to send or upload.

## Settings that protect your bundle

* **Stop automatic downloads in WhatsApp.** In the storage and data settings you can choose to download photos, audio and video only on WiFi, or never automatically.
* **Back up on WiFi only.** Photo backup apps can be set to upload only on WiFi.
* **Update apps on WiFi only** in your app store settings.
* **Lower streaming quality** when watching tutorials. On YouTube you can choose a lower quality for each video or a data saving option in the settings.
* **Turn on data saver** mode on your phone, which limits background data for many apps, or set your WiFi or hotspot as a metered connection on a computer.

## Send small, deliver big

When a client needs to approve a draft, export a small preview, for example at 720p, and send that first. Once they approve, send the full quality file. Remember that WhatsApp compresses videos sent the normal way. If the client needs the full quality version, send it as a document instead, or share it from a cloud drive when you are on WiFi.

## Find free or cheaper connections

Plan big uploads for times and places with WiFi: a school or university lab, a library, a community centre or a friend's home connection. Some networks also sell cheaper night bundles. Keep a short list of where you can upload and when.

## A small example

Hawa in Bolgatanga edits a two minute video for a tailor. She edits fully offline, exports a small 720p preview, and sends it on WhatsApp. The tailor asks for one change. Hawa fixes it, then waits until she is at the community centre with WiFi to upload the final 1080p file to the tailor's Facebook page. Her own bundle covered only the small preview.`,
      practice_task_md: `**Goal:** Build your own data saving setup.

**Steps:**
1. In WhatsApp, open storage and data settings and set media auto download to WiFi only or off.
2. Set your app store to update apps on WiFi only, and set any photo backup to WiFi only.
3. Edit any short clip, export one version at 720p and one at 1080p, and compare the file sizes.
4. Write down two places near you where you could upload on WiFi, and when they are open.

**Done looks like:** A screenshot of your new WhatsApp setting, a note of both file sizes, and your list of upload places.`,
      quiz: {
        questions: [
          {
            prompt: "Which steps of content creation usually need the internet?",
            options: [
              "Sending files and publishing",
              "Planning and writing",
              "Shooting and editing",
              "Charging your phone",
            ],
            answer_index: 0,
            explanation: "Planning, shooting and editing work offline; sending and publishing need data.",
          },
          {
            prompt: "What happens when you send a video the normal way on WhatsApp?",
            options: [
              "It arrives at full quality, exactly as it was recorded",
              "It is deleted after one hour",
              "It is compressed and loses quality",
              "It uses no data",
            ],
            answer_index: 2,
            explanation: "WhatsApp compresses normal video messages; sending as a document keeps full quality.",
          },
          {
            prompt: "Why send a small preview before the final file?",
            options: [
              "Clients prefer blurry videos",
              "It saves data while the client approves or asks for changes",
              "It makes the final video longer",
              "Platforms only accept small files, so the preview is what gets posted",
            ],
            answer_index: 1,
            explanation: "A small preview is cheap to send; the full file goes only after approval.",
          },
          {
            prompt: "Which setting stops WhatsApp using your bundle on media you never asked for?",
            options: [
              "Turning on read receipts so senders know you have seen the media",
              "Changing your profile picture",
              "Setting media auto download to WiFi only or off",
              "Muting a group",
            ],
            answer_index: 2,
            explanation: "Auto download settings control whether photos and videos download over mobile data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    storytelling: {
      explanation_md: `Think about the stories grandparents tell in the evening. Even the youngest children sit still until the end, because they want to know what happens. The best videos and posts work the same way. A client in Ghana does not pay you to press record. They pay you to make people stop scrolling, understand the message and do something: visit the shop, call the number, donate or share.

## Why writing comes before filming

New creators often pick up the phone and start filming, hoping a story will appear later in the edit. Sometimes it does. More often they end up with an hour of clips and no clear message. Experienced creators decide first what the viewer should feel, learn or do, and then plan the words and shots that get them there. Job adverts reflect this: they ask for storytelling, scriptwriting, captions and content ideas alongside camera skills.

## What this section covers

* **Hooks and story structure.** How to open strongly and move through a clear beginning, middle and end, even in fifteen seconds.
* **Scripts, storyboards and shot lists.** How to plan what is said and shown so that a shoot is quick and nothing is forgotten.
* **Captions, titles and descriptions.** The words around your content that decide whether people click, understand and act.
* **Creating in local languages.** How Dagbani, Twi, Hausa, Pidgin and other languages can make content land, and how subtitles widen your reach.

## The one sentence test

Before any piece of content, try to finish this sentence: "This is for (who), and after watching they will (feel, know or do what)." For example: "This is for mothers in Tamale, and after watching they will know that Amina's shop now sells school uniforms and how to order on WhatsApp." If you cannot finish the sentence, you are not ready to film yet.

## A small example

Issahaku is asked to make a video for a borehole project run by an NGO near Nalerigu. His first idea is to film the borehole from many angles with music. Then he tries the one sentence test: "This is for people who might support the project, and after watching they will understand how clean water changed one family's day." Now he knows what to film. He follows one girl, Wumpini, from the long walk she used to make for water to her filling a bucket in two minutes near home. The borehole appears, but the story is about Wumpini's time. The NGO uses the video in its next report.`,
      practice_task_md: `**Goal:** Practise the one sentence test before you film anything.

**Steps:**
1. Choose three of the businesses or groups you listed in the first lesson.
2. For each, write the sentence: "This is for (who), and after watching they will (feel, know or do what)."
3. Under each sentence, write three shots that would help tell that story.
4. Read your sentences aloud to a friend and ask if each one is clear. Rewrite any that are vague.

**Done looks like:** Three clear one sentence briefs, each with three shot ideas, saved in your notes.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what does a client really pay a creator for?",
            options: [
              "Making people stop, understand the message and take an action",
              "Pressing record on a phone",
              "Owning the newest phone and using as many editing apps as possible",
              "Posting every hour",
            ],
            answer_index: 0,
            explanation: "The value is in getting people to stop, understand and act.",
          },
          {
            prompt: "What is the one sentence test?",
            options: [
              "Writing a caption of one sentence",
              "Filming one shot only",
              "Asking the client to sum up the whole finished video in one sentence after you deliver it",
              "Finishing a sentence on who the content is for and what they will feel, know or do",
            ],
            answer_index: 3,
            explanation: "The test checks you know the audience and the goal before filming.",
          },
          {
            prompt: "What problem often happens when creators film first and hope to find the story later?",
            options: [
              "They run out of music",
              "They end up with many clips and no clear message",
              "The phone becomes vertical",
              "The client pays twice",
            ],
            answer_index: 1,
            explanation: "Without planning, footage piles up without a clear story.",
          },
          {
            prompt: "In Issahaku's borehole video, what was the story really about?",
            options: [
              "How clean water near home changed Wumpini's day",
              "How the engineers drilled and installed the new borehole",
              "The NGO's logo",
              "The music he chose",
            ],
            answer_index: 0,
            explanation: "He followed one person so the viewer could feel the change.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "hooks-and-story": {
      explanation_md: `On TikTok, Reels or Shorts, people decide in the first second or two whether to keep watching. On YouTube the opening seconds matter too. Adverts for short form editors, including a remote role open to applicants in Ghana, mention hooks and keeping viewers watching, because a video nobody finishes does nothing for the brand paying for it.

## The hook

A hook is the opening that gives someone a reason to stay. Good hooks are honest and specific. Some common types:

* **A question the viewer wants answered.** "Why does my jollof always burn at the bottom?"
* **A surprising image.** The finished dress first, before showing how it was sewn.
* **A promise.** "Three ways to keep tomatoes fresh without a fridge."
* **A problem people feel.** "Your phone videos look dark? Try this."

Avoid clickbait: a hook that promises something the video does not deliver makes people leave and stop trusting you.

## A simple structure

Most stories, from folktales to adverts, follow the same shape:

1. **Beginning.** Who or what is this about, and what is the problem or question?
2. **Middle.** What happens, what is tried, what changes?
3. **End.** The answer, the result or the lesson, plus what the viewer should do next.

In a thirty second video this might be five seconds of hook and problem, twenty seconds of steps or change, and five seconds of result and call to action, such as "Order on WhatsApp" or "Follow for part two".

## Show, do not just tell

Wherever possible, let the viewer see the change rather than hear about it. Instead of saying "our soap is gentle", show a mother bathing her baby with it. Instead of "we work hard", show hands at work in the early morning.

## Keep them watching

Change the shot every few seconds in short videos, cut out pauses, and save the most satisfying moment, such as the reveal, for near the end so people stay for it. Platforms show creators where viewers drop off, which you will learn to read later.

## A small example

Sumaila makes a video for a barber in Wa. Version one starts with the shop sign and slow music. Version two opens with a close up of a messy haircut and the words "Twenty minutes later...", then quick shots of the barber working, and ends on the fresh cut and the shop's location. The second version gets far more people watching to the end, because the hook made them want to see the result.`,
      practice_task_md: `**Goal:** Write and test hooks for one short video idea.

**Steps:**
1. Pick one idea from your earlier notes.
2. Write four different hooks for it: a question, a surprising image, a promise and a problem.
3. Write the full structure under your favourite hook: beginning, middle and end, with roughly how many seconds each takes in a thirty second video.
4. Film only the first three seconds for two of your hooks and show both to two friends. Ask which one makes them want to see more.

**Done looks like:** Four written hooks, a three part outline and a note of which hook your friends chose and why.`,
      quiz: {
        questions: [
          {
            prompt: "What is a hook?",
            options: [
              "The final logo at the end of a video",
              "A type of microphone",
              "An opening that gives viewers a reason to keep watching",
              "The background music",
            ],
            answer_index: 2,
            explanation: "A hook is the opening that makes people stay.",
          },
          {
            prompt: "Why should you avoid clickbait hooks?",
            options: [
              "They are too short",
              "They promise what the video does not deliver, so viewers stop trusting you",
              "Platforms automatically remove any video that opens with a question or a bold claim",
              "They use too much data",
            ],
            answer_index: 1,
            explanation: "Broken promises lose viewers and trust.",
          },
          {
            prompt: "Which order matches the simple story structure in the lesson?",
            options: [
              "End, beginning, middle",
              "Middle, end, beginning",
              "Logo, music, credits",
              "Beginning, middle, end",
            ],
            answer_index: 3,
            explanation: "Beginning sets up the problem, middle shows change, end gives the result and next step.",
          },
          {
            prompt: "What does show, do not just tell mean for a soap advert?",
            options: [
              "Reading the ingredients aloud",
              "Printing the price and the ingredients in large text on screen",
              "Using a longer title",
              "Showing a mother bathing her baby with the soap",
            ],
            answer_index: 3,
            explanation: "Letting viewers see the benefit is stronger than stating it.",
          },
          {
            prompt: "Why did Sumaila's second barber video keep more viewers?",
            options: [
              "Its hook made people want to see the finished haircut",
              "It was longer",
              "It opened with a long shot of the shop sign and the barber's name",
              "It had no ending",
            ],
            answer_index: 0,
            explanation: "The messy haircut and promise of a result made people stay for the reveal.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "scripts-and-shot-lists": {
      explanation_md: `Shoots in Ghana often happen in tight windows: a shop owner who can give you thirty minutes before customers arrive, a programme that happens once, light that disappears at six. If you arrive without a plan, you forget shots and have to come back, spending more transport money, battery and goodwill. Some content adverts ask for planning and scripted video, and skills frameworks for content creators list scriptwriting and storyboarding, because planning is what makes a creator reliable.

## The script

A script is the words: what will be said on camera, in voice over or as on screen text. For short videos it can be very short. A useful layout on a phone is two columns, or simply alternating lines:

* **Say:** what you or the speaker says.
* **Show:** what the viewer sees at that moment.

For a thirty second video, aim for roughly sixty to eighty spoken words. Read it aloud with a timer. If you rush, cut words.

If you are filming real people, such as a customer giving a testimony, do not write their words for them. Instead, write the questions you will ask, so their answers stay natural and true.

## The storyboard

A storyboard is a row of rough sketches, one per shot. Stick figures are fine. It helps you and the client agree on what the video will look like before anyone films. You can draw on paper and photograph it, or use simple boxes in a notes app.

## The shot list

The shot list is your checklist on the day. For each shot, note:

1. Shot number and a short description.
2. Shot size, such as wide, medium or close up.
3. Location and any props or people needed.
4. A tick when it is done.

Group shots by location so you finish one place before moving to the next. Add a few extra shots called **b roll**: close ups of hands, products, signs and surroundings. Editors use b roll to cover cuts and keep the video moving.

## A small example

Amina is filming a thirty second video for a pharmacy in Bolgatanga. Her script:

* **Say:** "Need your prescription fast?" **Show:** a customer looking at a watch.
* **Say:** "Send a photo of it on WhatsApp." **Show:** close up of a phone sending a photo.
* **Say:** "We prepare it while you travel." **Show:** pharmacist packing medicine.
* **Say:** "Collect in minutes." **Show:** customer smiling at the counter, shop sign.

Her shot list adds b roll of shelves and the street outside. She finishes in twenty five minutes, before the pharmacy gets busy.`,
      practice_task_md: `**Goal:** Plan a thirty second video completely before filming.

**Steps:**
1. Choose a real business or group from your list.
2. Write a Say and Show script of about sixty to eighty spoken words. Time yourself reading it aloud.
3. Draw a rough storyboard of four to six boxes on paper and take a photo of it.
4. Write a shot list grouped by location, with shot sizes and at least three b roll shots.

**Done looks like:** Your script, storyboard photo and shot list together in one note or folder. This is a real planning document you can show a client.`,
      quiz: {
        questions: [
          {
            prompt: "What are the two parts of the simple script layout in the lesson?",
            options: [
              "Price and place",
              "Start and stop",
              "Say and Show",
              "Music and logo",
            ],
            answer_index: 2,
            explanation: "Each line pairs what is said with what is shown.",
          },
          {
            prompt: "When filming a real customer's testimony, what should you write?",
            options: [
              "Their exact words for them to read",
              "The questions you will ask them",
              "A fake review",
              "Nothing at all",
            ],
            answer_index: 1,
            explanation: "Writing questions keeps answers natural and true.",
          },
          {
            prompt: "What is b roll?",
            options: [
              "A backup phone battery",
              "The second draft of a script, rewritten after the client has given feedback",
              "Extra shots, such as close ups of hands or products, used to cover cuts",
              "A type of background music",
            ],
            answer_index: 2,
            explanation: "Editors use b roll to hide cuts and keep the video moving.",
          },
          {
            prompt: "Why group shots by location on your shot list?",
            options: [
              "So you finish one place before moving to the next and save time",
              "Because platforms require it",
              "So the video is longer",
              "To use more data",
            ],
            answer_index: 0,
            explanation: "Grouping avoids going back and forth between places.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "captions-and-titles": {
      explanation_md: `A great video with a weak caption or title can still be ignored. The words around your content tell people what it is, why they should care and what to do next. Several of the content adverts we read list captions, copywriting or thumbnails alongside video skills, because the same person often writes them.

## Captions for social posts

A caption on Instagram, Facebook or TikTok should:

* **Start strong.** Only the first line or two show before "more". Put the most important point there.
* **Be clear before clever.** People should understand it in one read.
* **Give useful details.** Price in cedis, location, opening times, how to order or pay.
* **End with one action.** "Send us a WhatsApp message", "Comment your town", "Share with a friend who needs this".

Hashtags can help people find you, but a few relevant ones are better than a long list. Use a local tag such as your town name when it fits.

## Titles and descriptions on YouTube

YouTube works partly like a search engine. People type what they want, so a good title uses the words they would search for. "How to plant soybeans in Northern Ghana" is easier to find than "My farm day". Keep titles honest and readable, and put the main words near the start.

The description is where you add detail: what the video covers, links, contact details and credits for any music or footage you used with permission. The first lines matter most because they show in search.

## On screen text and hooks

Text on the video itself, often called a text hook, should be short enough to read in a second or two: "Before and after", "Price: 50 cedis", "Part 2". Many people watch without sound, so text carries the message.

## Write in the audience's voice

Think about how your audience speaks. A caption for students can be playful; a caption for a clinic should be calm and clear. Keep the same voice across a brand's posts so it feels like one personality.

## A small example

Abdul-Rahman posts a video for a tailor in Tamale with the caption "Nice work!!". Nobody orders. He rewrites it: "School uniforms sewn in 3 days. From 120 cedis. Send your child's measurements on WhatsApp and pick up near the Central Mosque." The next post brings four messages the same day, because people knew exactly what was offered and how to get it.`,
      practice_task_md: `**Goal:** Rewrite weak captions and titles into strong ones.

**Steps:**
1. Find three real posts from local businesses on any platform with short or vague captions.
2. Rewrite each caption with a strong first line, useful details and one clear action. Do not post them; this is practice.
3. Write three YouTube titles for a video on a topic you know, such as a recipe or farming tip, using words people would search for.
4. Write a two line description for your best title, including where you would credit music.

**Done looks like:** Three before and after captions and three titles with one description, saved together. Note which details you added.`,
      quiz: {
        questions: [
          {
            prompt: "Why should the most important point go in the first line of a caption?",
            options: [
              "Because hashtags must come last",
              "Because platforms delete any caption longer than two short lines",
              "Because it uses less data",
              "Because only the first line or two show before people tap more",
            ],
            answer_index: 3,
            explanation: "The opening lines are all most people see.",
          },
          {
            prompt: "Which YouTube title is easier for searchers to find?",
            options: [
              "My farm day",
              "How to plant soybeans in Northern Ghana",
              "Vibes only",
              "A day on the farm with the family, part two",
            ],
            answer_index: 1,
            explanation: "It uses the words people would type into search.",
          },
          {
            prompt: "What should a caption usually end with?",
            options: [
              "One clear action for the viewer",
              "Twenty hashtags",
              "The creator's full biography",
              "Nothing, to keep it mysterious",
            ],
            answer_index: 0,
            explanation: "A single call to action tells people what to do next.",
          },
          {
            prompt: "Why is on screen text important?",
            options: [
              "It replaces the need for video",
              "Platforms require it on every frame",
              "Many people watch without sound",
              "It makes files smaller",
            ],
            answer_index: 2,
            explanation: "Text carries the message for people watching silently.",
          },
          {
            prompt: "What made Abdul-Rahman's rewritten tailor caption work?",
            options: [
              "More emojis",
              "It stated what was offered, the price, timing and how to order",
              "It was written all in capital letters so it stood out in the feed",
              "It had no location",
            ],
            answer_index: 1,
            explanation: "Clear details and an action helped people order.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "local-languages": {
      explanation_md: `Many people in Northern Ghana think, joke and decide in Dagbani, Gonja, Dagaare, Frafra, Hausa, Mampruli or another home language, not in English. A video in the language your audience loves can feel like a friend talking, not an advert. Some NGO communications adverts in Ghana ask for English plus Ghanaian languages, because messages land better when people hear them in their own words.

## When to use a local language

* **When the audience speaks it at home.** A farming tip for farmers around Savelugu may work far better in Dagbani.
* **When trust matters.** Health, money and safety messages are easier to believe in a familiar language.
* **When humour or emotion is the point.** Jokes and proverbs often lose their power in translation.

English still has a place. It reaches people across Ghana and abroad, and brands may want both. Many creators mix languages, which is natural in Ghana. The key is to choose on purpose, based on who you want to reach.

## Subtitles widen your reach

Subtitles let one video serve more people: those who speak a different language, those watching without sound, and people who are deaf or hard of hearing. Options include:

* **Burned in captions** added in your editing app. Many free editors can create captions from speech automatically, but automatic captions are often wrong for Ghanaian languages and names, so always check and correct them by hand.
* **Uploaded subtitle files** on YouTube, where viewers can switch subtitles on or off and you can add more than one language.

Keep subtitle lines short, two lines at most, and leave them on screen long enough to read.

## Respect and accuracy

* **Get help with languages you do not speak well.** Ask a fluent speaker to check your script and subtitles. A wrong word can change the meaning or offend.
* **Spell names and places correctly.** People notice.
* **Avoid making fun of accents or groups.** Humour that mocks a community can hurt people and damage a brand.

## A small example

Hawa makes a short video about handwashing for a clinic in Tolon. Her first version is in English, and older women in the community scroll past. She records a new voice over in Dagbani with her aunt's help, adds English subtitles for the clinic's partners, and checks every subtitle line by hand. The clinic shares the Dagbani version on its WhatsApp groups and in the waiting area, and people start asking the nurses about it.`,
      practice_task_md: `**Goal:** Make one short message work in two languages.

**Steps:**
1. Write a fifteen second script in English for a simple message, such as a shop's opening hours or a health tip.
2. Translate it into a Ghanaian language you speak, or ask a fluent friend or relative to help.
3. Record the local language version as a short video or voice note.
4. Add subtitles in English, either in a free editing app or as typed text you would upload. Check every line by hand.

**Done looks like:** A short clip in a Ghanaian language with correct English subtitles, plus a note of who checked your translation.`,
      quiz: {
        questions: [
          {
            prompt: "Why might a health message work better in a local language?",
            options: [
              "Because English is not allowed on social media",
              "Because local language videos are always shorter and cheaper to make than English ones",
              "Because subtitles are impossible in English",
              "Because people trust health and money messages more in a familiar language",
            ],
            answer_index: 3,
            explanation: "Familiar language builds trust for important messages.",
          },
          {
            prompt: "What is the lesson's advice about automatic captions?",
            options: [
              "Trust them completely",
              "Never use them",
              "Only use them for English videos, since they are always accurate in English",
              "Check and correct them by hand, especially for Ghanaian languages and names",
            ],
            answer_index: 3,
            explanation: "Automatic captions often get local languages and names wrong.",
          },
          {
            prompt: "Which group do subtitles help?",
            options: [
              "Viewers who speak another language, watch on mute or are deaf or hard of hearing",
              "Only viewers on fast internet, because subtitles load separately and use extra data",
              "Only the creator",
              "Only advertisers",
            ],
            answer_index: 0,
            explanation: "Subtitles make one video useful to more people.",
          },
          {
            prompt: "What should you do when writing in a language you do not speak well?",
            options: [
              "Guess the words",
              "Use only emojis",
              "Ask a fluent speaker to check your script and subtitles",
              "Avoid subtitles in that language and post the video in English only",
            ],
            answer_index: 2,
            explanation: "A fluent check prevents wrong or offensive wording.",
          },
        ],
        pass_threshold: 75,
      },
    },
    shooting: {
      explanation_md: `When a business owner in Tamale scrolls through your portfolio, they judge it in seconds. Is the picture steady? Can they see faces clearly? Can they hear what people say? Many Ghanaian adverts for videographers and content creators ask for shooting and camera skills, and some name lighting, sound and composition directly, because these basics separate content a brand can use from content it cannot.

## Four things that make footage look professional

1. **Steadiness.** Shaky footage feels amateur and can make viewers feel sick. Holding the phone well, using your body as a tripod, or resting it on something solid fixes most of this.
2. **Framing.** Where you place people and objects in the picture tells the viewer what matters. A few simple rules, like the rule of thirds and keeping some space above heads, make shots look planned.
3. **Light.** Cameras need light to see. Most poor phone footage is simply too dark, or lit harshly from above. Learning where to place your subject in relation to the sun or a window improves everything.
4. **Sound.** People will watch slightly soft video, but they leave quickly when they cannot hear. Getting the phone or a cheap microphone close to the speaker and away from noise is the biggest single upgrade you can make.

## Photos count too

Many content jobs in Ghana combine video and photography: product photos for an online shop, portraits for a staff page, event pictures for a church or school. The same four ideas apply to photos, minus the sound.

## Gear: what you need and what can wait

You can start with only your phone. Helpful cheap additions, when you can afford them, are a small tripod or phone clamp, a wired or clip on microphone, and a piece of white card or cloth to bounce light. Learn to get the most from your phone first; gear helps a good creator, but it does not replace skill.

## What this section covers

* **Framing, angles and steady shots.** Shot sizes, the rule of thirds and holding the phone steady.
* **Photos for people and products.** Portraits, events and product shots that sell.
* **Light on a budget.** Using windows, shade and reflectors.
* **Sound on a budget.** Quiet places, mic distance and cheap microphones.

## A small example

Fuseini films a short interview with a shea butter producer in Savelugu. In his first attempt, she stands in harsh midday sun with a busy road behind her, and he holds the phone at arm's length. Faces are squinting and the traffic drowns her voice. For the second attempt he moves her into open shade, turns her away from the road, rests his elbows on a wall to steady the phone and moves closer. Same phone, same person, and now the clip is usable.`,
      practice_task_md: `**Goal:** See the four basics for yourself.

**Steps:**
1. Record a ten second clip of a friend talking, holding the phone at arm's length in a noisy, bright place.
2. Record the same ten seconds again after fixing all four basics: steady phone, better framing, softer light and a quieter spot closer to them.
3. Watch both clips with sound on and write down what improved in each of the four areas.

**Done looks like:** Two clips and a short note listing the changes. Keep the pair; a before and after comparison is a useful thing to show a mentor or client.`,
      quiz: {
        questions: [
          {
            prompt: "Which four basics does this section focus on?",
            options: [
              "Filters, stickers, music and hashtags",
              "Steadiness, framing, light and sound",
              "Price, place, product and promotion",
              "Speed, size, colour and logo",
            ],
            answer_index: 1,
            explanation: "These four make footage look professional.",
          },
          {
            prompt: "According to the lesson, why is sound so important?",
            options: [
              "Platforms automatically delete videos with poor sound before anyone sees them",
              "Sound makes files smaller",
              "People leave quickly when they cannot hear, even if the picture is soft",
              "Clients never watch the picture",
            ],
            answer_index: 2,
            explanation: "Poor sound loses viewers faster than slightly soft video.",
          },
          {
            prompt: "What is the lesson's view on buying gear?",
            options: [
              "Start with your phone; cheap gear helps later but does not replace skill",
              "You must buy a proper camera and microphone before you take on any paid work",
              "Gear replaces skill",
              "Only expensive lights work",
            ],
            answer_index: 0,
            explanation: "Learn your phone first; gear supports skill.",
          },
          {
            prompt: "What did Fuseini change in his second interview attempt?",
            options: [
              "He bought a new phone",
              "He added more music",
              "He waited until night when the road was quiet and filmed with the phone's flash on",
              "He moved to shade, turned from the road, steadied the phone and came closer",
            ],
            answer_index: 3,
            explanation: "He fixed light, noise, steadiness and distance with the same phone.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "framing-and-composition": {
      explanation_md: `Composition is how you arrange what is inside the frame. Good composition makes a viewer look where you want them to look, and makes phone footage feel intentional. Content adverts ask for composition, and public skills frameworks rate composing and framing shots as a core task for camera work. Editors also need a good eye to pick the best framed shots from a pile of footage.

## Shot sizes

Professionals describe shots by how much of the subject you see:

* **Wide shot.** Shows the whole scene: the market stall and the street around it. It tells the viewer where we are.
* **Medium shot.** Shows a person from about the waist up. Good for someone talking to camera.
* **Close up.** A face, hands, or a product filling the frame. Shows emotion and detail.

A short video usually mixes all three: a wide to set the scene, mediums for talking, close ups for detail. Changing shot size between cuts keeps viewers interested.

## The rule of thirds

Turn on your camera grid. It divides the screen into three columns and three rows. Placing a person's eyes or an important object near where the lines cross often looks more natural than putting everything dead centre. If someone is looking or walking to one side, leave space on that side so they are not squashed against the edge.

Rules can be broken on purpose. A centred face talking straight to camera works well in vertical videos. The point is to choose, not to place things by accident.

## Headroom and backgrounds

* Leave a little space above heads, but not too much, and do not cut people off at the joints, such as exactly at the knees or neck.
* Check the background before you record. A tree that seems to grow out of someone's head, a pile of rubbish or a bright window behind a face will distract viewers.

## Angles

Filming at eye level feels honest and equal. A low angle can make someone look strong; a high angle can make them seem small. For products, try a top down angle, for example looking straight down at a plate of waakye.

## Steady shots

* Hold the phone with both hands and tuck your elbows into your body.
* Lean on a wall, table or pole when you can.
* For movement, walk slowly with bent knees, or let the subject move while the phone stays still.
* A cheap tripod or a stack of books works for talking videos.

## A small example

Mariama films a carpenter in Wa. She starts with a wide shot of the workshop, then a medium shot of him explaining his work, then close ups of his hands sanding wood. She keeps him on a third line, with space in the direction he is looking, and checks there is no bright doorway behind him. The result looks planned, even though she used only her phone.`,
      practice_task_md: `**Goal:** Practise shot sizes, the rule of thirds and steady handling.

**Steps:**
1. Turn on your camera grid.
2. Choose a person at work or a product. Film a wide shot, a medium shot and a close up, each for five seconds, holding the phone with both hands and elbows tucked in.
3. Film one more shot with the subject placed on a third line, with space in the direction they face.
4. Check your backgrounds. Reshoot any shot with a distraction behind the subject.

**Done looks like:** Four short clips labelled wide, medium, close and thirds. Put them together as a sequence if you like; that is your first mini edit.`,
      quiz: {
        questions: [
          {
            prompt: "Which shot shows the whole scene and tells the viewer where we are?",
            options: [
              "Close up",
              "Wide shot",
              "Medium shot",
              "Top down shot",
            ],
            answer_index: 1,
            explanation: "A wide shot sets the scene.",
          },
          {
            prompt: "What does the rule of thirds suggest?",
            options: [
              "Place important things near where the grid lines cross",
              "Always place the subject dead centre so the frame looks balanced",
              "Film only three shots",
              "Cut every video into three parts",
            ],
            answer_index: 0,
            explanation: "Placing subjects near grid intersections often looks natural.",
          },
          {
            prompt: "If someone is looking to the right, where should you leave space?",
            options: [
              "On the left",
              "Behind them, so the viewer can see where they have come from",
              "On the right, in the direction they are looking",
              "Nowhere; fill the frame",
            ],
            answer_index: 2,
            explanation: "Space in the direction of the look stops them feeling squashed.",
          },
          {
            prompt: "Which is a good way to keep a handheld shot steady?",
            options: [
              "Hold the phone at arm's length with one hand",
              "Tuck your elbows in and lean on something solid",
              "Run quickly while filming",
              "Zoom in as far as possible",
            ],
            answer_index: 1,
            explanation: "Tucked elbows and support reduce shake.",
          },
          {
            prompt: "Why should you check the background before recording?",
            options: [
              "Busy backgrounds make the exported file much larger and slower to send over WhatsApp",
              "Platforms require plain walls",
              "It saves battery",
              "Things like a bright window or a pole behind someone's head pull attention away",
            ],
            answer_index: 3,
            explanation: "A messy background distracts from the subject.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "phone-photography": {
      explanation_md: `Every small business that sells online needs photos: the boutique's new dresses, the restaurant's menu, the phone shop's accessories, a church's harvest event. Adverts for content creators and photographer roles in Ghana often combine photography with video, and many clients judge you first by a few strong pictures. Good product and people photos are one of the quickest ways to earn from your phone.

## Product photos that sell

* **Simple background.** A plain wall, a clean cloth or a large sheet of card. The product should be the only thing to look at.
* **Soft daylight.** Place the product near a window or in open shade, not in direct midday sun, which creates harsh shadows. Turn off the flash.
* **Several angles.** Front, side, top and a close up of details such as stitching or a label. Online buyers cannot touch the product, so photos do the work.
* **Show scale and use.** A bag on a shoulder, earrings next to a hand or a bowl of food with a spoon helps buyers understand size.
* **Keep colours true.** If a dress is wine red, the photo must show wine red. Customers who receive something different stop trusting the shop.

## Portraits and people

* Stand your subject in soft light facing a window or in open shade.
* Focus on the eyes; tap on them before taking the picture.
* Talk to people so they relax. Natural smiles come between poses.
* Use portrait mode if your phone has it, but check the edges of hair and ears, which it sometimes blurs wrongly.

## Events

At events, move around. Take wide shots that show the crowd and setting, medium shots of key moments, and close ups of details like decorations or hands. Get the important moments first, such as a speech or the cutting of a cake, then experiment.

## Light editing

Free apps such as Snapseed or the phone's own editor let you straighten, crop, brighten and adjust contrast. Edit lightly. Heavy filters and skin smoothing can make products look unlike reality and people look unlike themselves. Save the original photo too.

## Ask before you shoot people

Ask permission before photographing people, and especially before posting pictures of them or of children online. You will learn more about consent later in this roadmap.

## A small example

Amina helps a bead seller in Tamale. The seller's old photos show necklaces piled on a table under a fluorescent tube. Amina lays each necklace on a plain cream cloth near a window, takes a straight on shot, a close up of the clasp and one photo of a friend wearing it. She brightens them slightly in a free editor and keeps the colours true. The seller posts the set on WhatsApp Status with prices, and customers can finally see what they are buying.`,
      practice_task_md: `**Goal:** Produce a small product photo set a seller could use today.

**Steps:**
1. Choose one product at home or from a friend's business.
2. Set up a plain background near a window or in open shade. Turn off the flash.
3. Take five photos: front, side, top, a detail close up and one showing scale or use.
4. Edit lightly in a free app: straighten, crop and adjust brightness, keeping colours true. Keep the originals.
5. Write a one line caption with the product name and a price in cedis.

**Done looks like:** Five edited photos and a caption, ready to show the seller or add to your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What kind of light does the lesson recommend for product photos?",
            options: [
              "Direct midday sun",
              "Phone flash",
              "Coloured party lights",
              "Soft daylight near a window or in open shade",
            ],
            answer_index: 3,
            explanation: "Soft light avoids harsh shadows and shows products clearly.",
          },
          {
            prompt: "Why take several angles of a product?",
            options: [
              "Online buyers cannot touch it, so photos must show it fully",
              "Marketplace platforms require exactly five photos for every product listing",
              "It uses less storage",
              "It makes the product cheaper",
            ],
            answer_index: 0,
            explanation: "Multiple angles replace handling the item.",
          },
          {
            prompt: "Why must product colours stay true in editing?",
            options: [
              "Bright, boosted colours make products look better and sell faster online",
              "Filters are illegal",
              "Customers who receive something different stop trusting the shop",
              "True colours look more blurry",
            ],
            answer_index: 2,
            explanation: "Honest photos protect the seller's reputation.",
          },
          {
            prompt: "Where should you focus in a portrait?",
            options: [
              "The background",
              "The eyes",
              "The shoes",
              "The sky",
            ],
            answer_index: 1,
            explanation: "Sharp eyes make portraits feel alive.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "light-on-a-budget": {
      explanation_md: `Phone cameras have small sensors. In good light they look excellent; in poor light the picture becomes grainy, dull and soft. Lighting appears in some Ghanaian content adverts because it is one of the clearest signs of quality. The good news is that light from the sun is free, and you can control it with simple things.

## Where is the light coming from?

Before you film, look at the light the way the camera does. Ask:

* **Is it hard or soft?** Direct sun at midday is hard: it makes dark shadows under eyes and noses and makes people squint. Light in shade, on a cloudy day, or through a window is soft and flattering.
* **Which direction?** Light on the face from the front or slightly to the side usually looks best. Light from directly above is unflattering. Light from behind the subject, such as a bright window or sky, turns faces into dark shapes.

## Free and cheap ways to get good light

* **Face a window.** Put your subject facing a window, with you between them and the window or just to the side. This is one of the best lights available anywhere, and it is free.
* **Use open shade.** Outdoors, move into the shade of a tree or building where the subject still faces bright open sky. Faces become even and soft.
* **Film at kinder times.** Early morning and late afternoon light is softer and warmer than midday.
* **Bounce light.** A white sheet, a piece of white card or a foil covered board held opposite the light source reflects light back into the shadow side of a face or product.
* **Turn off mixed lights.** Indoor bulbs and daylight have different colours. Mixing them can make faces look orange on one side and blue on the other. Where you can, use one type.

## When it gets dark

If you must film at night or in a dim room, bring the subject close to the brightest lamp, and avoid using digital zoom, which makes noise worse. A small rechargeable LED light is a useful later purchase. Avoid the phone's flash for video; it flattens faces and often fails to reach far.

## Exposure

Tap on the face and lock exposure so the brightness does not change during the shot. If the face is too bright or dark, many phones let you slide brightness up or down after tapping.

## A small example

Sumaila records a cooking video for a chop bar in Damongo inside a dark kitchen. The footage is grainy. He moves the table near the kitchen door so daylight falls on the food and the cook from the side, and asks a friend to hold a white flour sack opposite to brighten the shadows. He turns off the single orange bulb. Now the colours of the soup look rich, and the cook's face is clear.`,
      practice_task_md: `**Goal:** Find and use the best free light around you.

**Steps:**
1. Film a friend saying one sentence in three positions: with a bright window behind them, under a ceiling bulb, and facing a window or in open shade.
2. For the best position, repeat the shot while someone holds a white sheet or card opposite the light to bounce light into the shadows.
3. Watch all four clips and note which looked best and why.

**Done looks like:** Four short clips and a note explaining which light worked best. Add a photo of your setup so a mentor can see how you did it.`,
      quiz: {
        questions: [
          {
            prompt: "What usually happens when a bright window is behind your subject?",
            options: [
              "Their face looks bright and clear",
              "The sound improves",
              "Their face becomes a dark shape",
              "The colours become true",
            ],
            answer_index: 2,
            explanation: "Strong light from behind leaves the face in shadow.",
          },
          {
            prompt: "What is open shade?",
            options: [
              "Shade of a tree or building where the subject still faces open sky",
              "A dark indoor room with the curtains closed and no direct light at all",
              "Filming at midnight",
              "Covering the lens with your hand",
            ],
            answer_index: 0,
            explanation: "Open shade gives soft, even light on faces.",
          },
          {
            prompt: "What does a white sheet or card do in lighting?",
            options: [
              "Absorbs light so the shadows look deeper",
              "Records sound",
              "Makes the video vertical",
              "Bounces light back into shadows",
            ],
            answer_index: 3,
            explanation: "A reflector fills in the dark side of a face or product.",
          },
          {
            prompt: "Why avoid mixing indoor bulbs and daylight?",
            options: [
              "It drains the battery",
              "Their different colours can make one side of a face orange and the other blue",
              "Mixed light confuses the phone's autofocus, so faces keep drifting in and out of focus",
              "It makes the file larger",
            ],
            answer_index: 1,
            explanation: "Mixed colour temperatures look unnatural.",
          },
          {
            prompt: "Which times of day give softer outdoor light?",
            options: [
              "Early morning and late afternoon",
              "Midday",
              "Only midnight",
              "Any time with flash on",
            ],
            answer_index: 0,
            explanation: "The low sun is softer and warmer than midday sun.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "sound-on-a-budget": {
      explanation_md: `Viewers forgive a slightly soft picture much sooner than bad sound. If they cannot hear the speaker, they scroll away. Some videographer adverts list sound alongside lighting, and remote editing roles mention sound design, because clear audio is part of what clients pay for.

## Why phone audio often sounds bad

The microphone on a phone is small and picks up everything around it. When the phone is far from the speaker, it records more of the room, wind, generators, traffic and music than of the voice. The biggest improvements come from two free changes: **get closer** and **get quieter**.

## Choose a quiet place

* Move away from roads, grinding mills, generators and loudspeakers.
* Indoors, rooms with cloth, curtains, mattresses or many objects echo less than bare concrete rooms.
* Switch off fans while recording if it is safe and comfortable, and ask people nearby for a few quiet minutes.
* Listen for a moment with your eyes closed before you record. You will notice sounds you had ignored.

## Get the microphone close

* For a talking video, keep the phone close, around an arm's length or nearer, rather than filming from across the room.
* Point the phone's microphone towards the speaker. Find where it is on your phone, usually a small hole at the bottom or top, and do not cover it with your fingers.
* Outdoors, shield the microphone from wind with your body or a small piece of foam or cloth.

## Cheap upgrades

* **Wired earphones with a mic** can be clipped near the speaker's chest as a basic lapel mic, if your phone supports them.
* **A clip on lapel microphone,** wired or wireless, is one of the most useful first purchases for interviews.
* **Record audio separately.** Put a second phone close to the speaker recording a voice note, and line it up with the video during editing.

## Test and monitor

Always record a ten second test and listen with earphones before the real take. It is much easier to fix a problem then than to discover it after the speaker has left.

## Music and sound effects

Background music can help, but it should never drown the voice. Only use music and effects you have the right to use, such as free libraries like the YouTube Audio Library or sound effect sites with clear licences. You will cover this fully in the editing and copyright lessons.

## A small example

Issahaku interviews a teacher in Bolgatanga beside a busy road. Playing it back, he hears only lorries. He moves to an empty classroom with curtains, sits close, and clips his wired earphones to the teacher's shirt. He records a ten second test, listens with earphones, and only then records the full interview. The voice is clear, and the school uses the video on its page.`,
      practice_task_md: `**Goal:** Hear the difference distance and place make.

**Steps:**
1. Record a friend saying the same sentence three ways: from across a room, from arm's length, and with the phone or wired earphone mic close to them.
2. Repeat the closest version in a noisy spot and then in a quiet room with soft furnishings.
3. Listen to all versions with earphones and rank them from worst to best.

**Done looks like:** Five short recordings and your ranking with one sentence explaining what made the best one clearest.`,
      quiz: {
        questions: [
          {
            prompt: "What are the two biggest free improvements for phone audio?",
            options: [
              "Add filters and stickers",
              "Film in 4K and use slow motion",
              "Get closer and get quieter",
              "Turn up the music and add effects",
            ],
            answer_index: 2,
            explanation: "Distance and background noise matter most.",
          },
          {
            prompt: "Which room usually echoes less?",
            options: [
              "An empty concrete room with bare walls and a high ceiling",
              "A room with curtains, cloth and many objects",
              "A tiled bathroom",
              "A large empty hall",
            ],
            answer_index: 1,
            explanation: "Soft materials absorb sound and reduce echo.",
          },
          {
            prompt: "Why record a ten second test before the real take?",
            options: [
              "Platforms require test clips",
              "To save battery",
              "To make the video longer",
              "To find sound problems while you can still fix them",
            ],
            answer_index: 3,
            explanation: "Testing catches problems before the speaker leaves.",
          },
          {
            prompt: "What is one cheap way to record clearer interview audio?",
            options: [
              "Film from across the street with the phone at full zoom so the speaker feels natural",
              "Cover the microphone with your finger",
              "Play music during the interview",
              "Use a clip on lapel mic, or a voice note on a second phone near the speaker",
            ],
            answer_index: 3,
            explanation: "A mic close to the speaker captures the voice clearly.",
          },
        ],
        pass_threshold: 75,
      },
    },
    editing: {
      explanation_md: `Editing is where raw clips become a story. It is also one of the most requested skills in the adverts we studied: Ghanaian companies ask for content creators who can edit reels and short videos, and some remote agencies hire editors in Ghana to cut TikTok, Reels and Shorts for clients abroad. Some of these adverts name free phone editors such as CapCut or InShot, alongside desktop tools like Premiere Pro.

## You can edit professionally on a phone

Free phone editors can trim clips, arrange them on a timeline, add music, voice over, text, captions and transitions, adjust colour and export in the right shape for each platform. For short vertical videos, many working editors use a phone or a phone style app. For longer YouTube videos with many layers, a laptop becomes more comfortable. If you do not own one, a school lab, library or community centre with computers can help when you need it, and free desktop editors exist for when you get there.

## Choose one editor and learn it deeply

Examples of free editors include CapCut, VN and InShot. They are examples, not endorsements. Some features or exports may need payment or add a watermark, so check the settings before a client job. Whichever you choose, learn these core actions until they feel automatic:

* Import clips and arrange them in order.
* Split and trim clips.
* Add and adjust music and voice over.
* Add text and captions.
* Adjust brightness, contrast and colour.
* Export at the right size and quality.

## Non destructive editing

Editing apps do not change your original clips; they keep a project that refers to them. That means you must keep the original files on your phone until the project is finished and exported. If you delete them to free space, the project breaks.

## What this section covers

* **Cutting, pacing and sequence.** Trimming dead moments and ordering shots so the story flows.
* **Music, voice over and on screen text.** Sound and words that support the story.
* **Exporting, thumbnails and file habits.** Getting the right file to the right place and staying organised.

## A small example

Wumpini films a ten minute walk through a weekend market in Tamale for a food vendor. Her editor app holds forty clips. In editing she keeps only the best moments: the vendor's welcome, steam rising from a pot, close ups of hands serving, a customer's smile, the price board. She trims each to a few seconds, adds a voice over and price text, and exports a forty second vertical video. The vendor says it is the first time the stall has looked as good online as it does in real life.`,
      practice_task_md: `**Goal:** Learn the core actions of one free editing app.

**Steps:**
1. Choose one free editor and open a new project.
2. Import five clips you have already filmed.
3. Practise each core action once: reorder, split and trim, add music at low volume, add one line of text, adjust brightness, and export.
4. Check the export settings for any watermark and note how to remove it, or whether it needs payment.

**Done looks like:** A short exported video of about twenty seconds and a note listing which core actions you found easy and which need more practice.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say about editing on a phone?",
            options: [
              "Free phone editors can make professional short videos; a laptop helps for long ones",
              "Professional editing is impossible on a phone, so you need a laptop before taking any client",
              "Only paid apps can export video",
              "Phones cannot add text",
            ],
            answer_index: 0,
            explanation: "Phones handle short work well; long complex edits are easier on a laptop.",
          },
          {
            prompt: "Why must you keep original clips until a project is exported?",
            options: [
              "Platforms ask for the originals",
              "Keeping the originals on the phone makes the final export much smaller and faster",
              "Editing apps refer to the original files, so deleting them breaks the project",
              "It saves data",
            ],
            answer_index: 2,
            explanation: "Edits are non destructive and depend on the originals.",
          },
          {
            prompt: "What should you check before using a free editor for client work?",
            options: [
              "Whether it can play games",
              "Whether exports add a watermark or some features need payment",
              "Whether it changes your ringtone",
              "Whether it deletes your contacts",
            ],
            answer_index: 1,
            explanation: "Watermarks and paid features can affect client deliveries.",
          },
          {
            prompt: "In Wumpini's market video, what did editing mainly involve?",
            options: [
              "Keeping all forty clips at full length",
              "Adding as many effects as possible",
              "Picking the best moments, trimming them and adding voice over and price text",
              "Turning it into a horizontal ten minute film with a long title sequence at the start",
            ],
            answer_index: 2,
            explanation: "She selected, trimmed and supported the story with voice and text.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "editing-basics": {
      explanation_md: `O*NET, a public skills framework, describes the core of a video editor's job as choosing the best shots and arranging them into a smooth, logical story. Ghanaian and remote adverts say the same thing in their own words: cut footage into engaging short videos and keep viewers watching. That is what this lesson is about.

## Step 1: Review and select

Watch all your footage once before cutting. Mark the best takes: steady, well lit, clearly heard and showing what the story needs. It is normal to use only a small part of what you filmed. Good editors are ruthless.

## Step 2: Build the rough cut

Place your chosen clips on the timeline in story order: hook, beginning, middle, end. Do not worry about polish yet. Watch it through. Does it make sense to someone who was not there?

## Step 3: Trim and tighten

* Cut the moments before people start talking and after they finish.
* Remove "ehh", long pauses and repeated sentences. A **jump cut**, where you cut out a pause and the speaker jumps slightly, is normal and accepted in social videos.
* In short videos, most shots last only a few seconds. If nothing new is happening, cut.

## Step 4: Pacing

Pacing is the rhythm of your edit. Fast cuts feel energetic and suit product reveals or trends. Slower shots suit emotional stories, such as an interview about a family's farm. Match the pace to the message. Cutting on the beat of music, called beat matching, can make a reel feel smooth.

## Step 5: Continuity and covering cuts

If you cut in the middle of someone speaking, cover the cut with **b roll**: a close up of their hands, the product or the setting, while their voice continues underneath. This hides the join and shows the viewer what the speaker is talking about.

Avoid unnecessary transitions such as spins and wipes. A simple straight cut is what professionals use most. Save effects for when they add meaning.

## Step 6: Watch as a stranger

Watch the finished cut on the phone, at normal speed, as if you have never seen it. Better still, show it to someone else and watch where they look away. That moment is where you need to tighten.

## A small example

Mariama has twelve minutes of footage of a youth football tournament in Wa. Her rough cut is three minutes and feels slow. She trims every shot to the action, removes the warm ups, cuts on the beat of a free music track and covers the coach's interview cuts with goal celebrations. The final edit is forty five seconds, and viewers watch to the end to see the winning goal.`,
      practice_task_md: `**Goal:** Turn raw footage into a tight thirty to sixty second edit.

**Steps:**
1. Film about three minutes of something real: a friend cooking, a craftsperson working, or a short interview.
2. Review all footage and note your best moments.
3. Build a rough cut in story order, then trim it to between thirty and sixty seconds.
4. Use at least one jump cut and at least one b roll shot to cover a cut.
5. Show the edit to someone and note where their attention drops. Tighten that part.

**Done looks like:** Your final exported edit, plus one sentence about what you cut after feedback.`,
      quiz: {
        questions: [
          {
            prompt: "What should you do before you start cutting?",
            options: [
              "Review all footage and mark the best takes",
              "Add music",
              "Export the video",
              "Post the raw clips",
            ],
            answer_index: 0,
            explanation: "Selecting first makes the rough cut faster and better.",
          },
          {
            prompt: "What is a jump cut?",
            options: [
              "A fast spinning transition that jumps from one location to another",
              "A video of someone jumping",
              "Moving a clip to another project",
              "A cut that removes a pause so the speaker jumps slightly",
            ],
            answer_index: 3,
            explanation: "Jump cuts tighten talking clips and are normal in social video.",
          },
          {
            prompt: "How can you hide a cut in the middle of someone speaking?",
            options: [
              "Add a long black screen with music while the speaker pauses",
              "Cover it with b roll while their voice continues",
              "Increase the volume",
              "Delete the whole interview",
            ],
            answer_index: 1,
            explanation: "B roll over continuing audio hides the join.",
          },
          {
            prompt: "What does the lesson say about flashy transitions?",
            options: [
              "Use straight cuts mostly and save effects for when they add meaning",
              "Use one between every clip",
              "Platforms reward them, so fast spinning effects push videos to more viewers",
              "They always increase views",
            ],
            answer_index: 0,
            explanation: "Simple cuts keep focus on the story.",
          },
          {
            prompt: "Which pace best suits an emotional interview about a family farm?",
            options: [
              "Very fast cuts on every beat",
              "No cuts at all for ten minutes",
              "Slower shots",
              "Random order of clips",
            ],
            answer_index: 2,
            explanation: "Slower pacing suits emotional stories.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "music-voice-and-text": {
      explanation_md: `Sound and words can make an ordinary edit feel finished. Remote editing adverts open to Ghana mention captions, sound design and motion text, and Ghanaian content adverts mention captions and thumbnails. Done badly, though, music drowns voices, text is unreadable and the video gets muted or blocked for copyright.

## Music

* **Use music you have the right to use.** Popular songs from the radio or another creator's video usually belong to someone else. Uploading them can get your video muted, blocked, or your account warned. Free options include the YouTube Audio Library and music offered inside platform apps for use on that platform. Check the licence and any credit the track asks for.
* **Keep music under the voice.** When someone is speaking, lower the music so the words are clear. Raise it when there is no speech.
* **Match the mood.** Upbeat music for a product launch, calm music for a health message.

## Voice over

A voice over is narration recorded separately and laid over the pictures. It is useful when the people on screen are not speaking, or to explain clearly.

* Record in a quiet room with soft furnishings, phone close to your mouth but slightly to the side to avoid puffs of air.
* Read your script a few times first, then speak a little slower than normal and smile; it changes how you sound.
* Record several takes and pick the best. Many free editors let you record directly onto the timeline.

## On screen text and captions

* **Short and large.** A few words, big enough to read on a small screen, on screen long enough to read twice.
* **High contrast.** White text with a dark outline or a dark box behind it reads on most backgrounds.
* **Keep away from the edges.** In vertical videos, platform buttons and captions cover the bottom and right side. Keep important text in the middle area.
* **Captions for speech.** Many people watch without sound. Burned in captions, which most free editors can generate, help them follow, but always correct the automatic text, especially names and Ghanaian words.

## Sound effects

Small effects such as a whoosh on a transition or a click on a text pop can add energy, but use them lightly. Sites like Freesound offer effects with clear licences; check whether credit is required.

## A small example

Abdul-Rahman edits a promo for a phone repair shop in Tamale. His first version uses a popular Afrobeats hit, has tiny white text over a white wall and music louder than the owner's voice. In the second version he picks a free track from the YouTube Audio Library, lowers it under the speech, records a clear voice over, and uses bold text with a dark box placed in the middle of the frame. He corrects the automatic captions, which had spelled the shop's name wrong. The video plays without copyright problems and is easy to follow on mute.`,
      practice_task_md: `**Goal:** Add music, voice over and text properly to an edit.

**Steps:**
1. Take an edit you made earlier or a new short clip sequence.
2. Choose a free, licensed music track and note where it came from and any credit required.
3. Record a short voice over in a quiet room and place it on the timeline. Lower the music under the voice.
4. Add on screen text with high contrast, kept away from the bottom and right edges.
5. Generate captions if your editor can, and correct every mistake by hand.

**Done looks like:** An exported video that is clear both with sound and on mute, plus a note of the music source and credit.`,
      quiz: {
        questions: [
          {
            prompt: "What can happen if you upload a video using a popular song you do not have rights to?",
            options: [
              "It gets more views automatically because the song is trending",
              "It may be muted, blocked or your account warned",
              "The artist pays you",
              "Nothing ever happens",
            ],
            answer_index: 1,
            explanation: "Unlicensed music can trigger copyright action.",
          },
          {
            prompt: "What should you do with music while someone is speaking?",
            options: [
              "Raise it so the video feels more exciting",
              "Remove the voice",
              "Speed it up",
              "Lower it so the words are clear",
            ],
            answer_index: 3,
            explanation: "Speech must stay clear above music.",
          },
          {
            prompt: "Where should important text go in a vertical video?",
            options: [
              "Along the bottom edge",
              "On the right edge",
              "Outside the frame",
              "In the middle area, away from platform buttons",
            ],
            answer_index: 3,
            explanation: "Platform buttons and captions cover the bottom and right.",
          },
          {
            prompt: "What makes on screen text easy to read?",
            options: [
              "Large, short text with high contrast, like white with a dark outline",
              "Small thin letters",
              "Long paragraphs",
              "Thin decorative fonts in the brand's colours placed over a busy background",
            ],
            answer_index: 0,
            explanation: "Short, large, high contrast text reads on small screens.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "export-and-organise": {
      explanation_md: `A beautiful edit is useless if it arrives late, in the wrong shape, blurry or lost. Some employers in Ghana list keeping a content library and storing files among their requirements, and remote clients expect files delivered on time in the format they asked for. Good habits here are what make you dependable.

## Export settings

* **Shape (aspect ratio).** Vertical 9:16 for TikTok, Reels, Shorts and Status. Horizontal 16:9 for normal YouTube videos. Square or 4:5 for some feed posts. Choose this when you start the project, not at the end, so nothing gets cut off.
* **Resolution.** 1080p is a good standard for most platforms. Export a smaller 720p version for previews on WhatsApp.
* **Frame rate.** Keep it the same as your footage, often 30 frames per second.

YouTube publishes recommended upload settings in its help centre if you want to check details.

## Thumbnails

On YouTube, the thumbnail and title together decide whether people click. A good thumbnail:

* Shows one clear subject, often a face with a visible expression or the finished result.
* Uses a few large words at most, readable at a tiny size.
* Uses strong contrast and colours that stand out.
* Is honest about what the video contains.

You can design one in a free tool such as Canva, or take a still from your video and add text in your editor. Check how it looks at the size of a fingernail, because that is how people first see it.

## File habits

* **Name files clearly.** For example: client, project, version and date, such as "TamaleTailor_Uniforms_v2_20261012". You will thank yourself when a client asks for "the version from last week".
* **Use folders.** One folder per client or project, with subfolders for raw footage, music, graphics and exports.
* **Back up.** Keep important projects in at least two places: phone and a memory card, or phone and a cloud drive uploaded on WiFi.
* **Clean up after delivery.** Once a project is delivered and backed up, delete raw clips you no longer need from the phone to keep space for the next shoot.

## Delivering to clients

Agree how files will be delivered. For full quality, send as a document on WhatsApp or share a cloud link. Keep a simple record of what you delivered and when.

## A small example

Hawa edits weekly videos for a pharmacy and a fashion shop. Early on she sent the shop the pharmacy's video by mistake because both were called "final.mp4". Now each client has a folder, files are named with client, topic, version and date, and finished projects are copied to a memory card. When the shop asks for a three month old video to repost, she finds it in seconds.`,
      practice_task_md: `**Goal:** Set up a professional export and file system.

**Steps:**
1. Create a folder on your phone, computer or memory card called "Clients", with one folder for a real or practice client inside, and subfolders for raw, music, graphics and exports.
2. Export one of your edits twice: 1080p for the final and 720p for a preview. Name both clearly with client, topic, version and date.
3. Make a thumbnail for that video with one clear subject and no more than four words. View it at a very small size to check it reads.
4. Back up the final export in a second place.

**Done looks like:** A screenshot of your folder structure, both named exports and your thumbnail.`,
      quiz: {
        questions: [
          {
            prompt: "Which aspect ratio suits TikTok, Reels, Shorts and Status?",
            options: [
              "16:9 horizontal",
              "4:3",
              "9:16 vertical",
              "21:9 widescreen",
            ],
            answer_index: 2,
            explanation: "These formats are vertical 9:16.",
          },
          {
            prompt: "Why choose the aspect ratio at the start of a project?",
            options: [
              "Because exports fail otherwise",
              "So nothing important gets cut off later",
              "To save battery",
              "Because clients ask for it in the title",
            ],
            answer_index: 1,
            explanation: "Changing shape at the end can crop important parts of the frame.",
          },
          {
            prompt: "Which file name is most useful?",
            options: [
              "final.mp4",
              "video1.mp4",
              "TamaleTailor_Uniforms_v2_20261012.mp4",
              "final_video_edited_latest_version_new.mp4",
            ],
            answer_index: 2,
            explanation: "Client, topic, version and date make files easy to find.",
          },
          {
            prompt: "What makes a good YouTube thumbnail?",
            options: [
              "One clear subject, few large words, strong contrast and honesty",
              "Many small words and several faces so the thumbnail looks full and busy",
              "A blank background",
              "A misleading picture to get clicks",
            ],
            answer_index: 0,
            explanation: "Thumbnails must read at a tiny size and reflect the video.",
          },
          {
            prompt: "What does backing up mean in this lesson?",
            options: [
              "Deleting files after export",
              "Sending files to strangers",
              "Renaming every file final",
              "Keeping important projects in at least two places",
            ],
            answer_index: 3,
            explanation: "Two copies protect against a lost or broken phone.",
          },
        ],
        pass_threshold: 80,
      },
    },
    publishing: {
      explanation_md: `Making a good video is half the job. The other half is putting it in the right place, in the right form, for the right people, and learning from how they respond. Ghanaian adverts for social media content roles ask for platform management, live streaming and audience engagement. Remote roles add YouTube uploads and search friendly titles.

## Platforms are different rooms

Think of each platform as a different room with its own crowd and habits:

* **TikTok, Instagram Reels, Facebook Reels and YouTube Shorts** favour short vertical videos that hook fast. Content can reach people who do not follow you yet.
* **YouTube** favours longer, useful videos that people search for, such as tutorials, reviews and stories. A good video can keep finding viewers for years.
* **Facebook** remains important for many Ghanaian businesses, churches and community groups, including older audiences.
* **WhatsApp Status and groups** reach people who already know you. For many local businesses this is where sales actually happen.

You do not need to be everywhere. Choose one or two platforms where your audience already spends time, and do them well.

## Repurposing

One shoot can serve several platforms. A ten minute YouTube tutorial can become three short clips for Reels and TikTok, a few photos for Facebook and a Status update. Editors who can cut long videos into shorts are in demand in remote job adverts. Repurposing saves time and data.

## Consistency beats bursts

Posting ten videos in one week and then nothing for a month confuses your audience. A steady rhythm you can keep, such as two short videos a week, builds trust. Plan a simple content calendar: what you will post, where and when.

## Rules and safety

Each platform has community guidelines on things like hate, harassment, dangerous acts, misleading claims and spam. Breaking them can get videos removed or accounts restricted. Read the guidelines of the platforms you use; clients expect you to keep their accounts safe.

## What this section covers

* **Short vertical video and live.** Formats, trends and live selling.
* **YouTube basics.** Channel setup, uploading and being found.
* **Building an audience and community.** Focus, rhythm and conversation.
* **Reading your numbers.** Using free analytics to improve.

## A small example

Sumaila runs a channel teaching phone repair tips in Hausa and English from Tamale. He films one longer YouTube tutorial a week. From each, he cuts two short clips for TikTok and Shorts, and posts a photo with a short tip on Facebook. He also shares the YouTube link on his WhatsApp Status. One shoot, four places, and each post points people back to his main videos.`,
      practice_task_md: `**Goal:** Plan where and how often you will publish.

**Steps:**
1. Write down who your audience is and which one or two platforms they use most. Ask three people from that audience if you are not sure.
2. Take one video idea and write how you would repurpose it for two other places, such as a short clip and a Status update.
3. Make a simple two week content calendar in a notes app: date, platform, idea.
4. Read the main points of the community guidelines for one platform you will use and write down three things you must avoid.

**Done looks like:** Your audience note, a repurposing plan, a two week calendar and three guideline points.`,
      quiz: {
        questions: [
          {
            prompt: "Which platform is described as favouring longer, searchable videos that can find viewers for years?",
            options: [
              "WhatsApp Status",
              "YouTube",
              "Facebook Reels",
              "TikTok Live",
            ],
            answer_index: 1,
            explanation: "YouTube rewards useful videos people search for.",
          },
          {
            prompt: "What is repurposing?",
            options: [
              "Turning one shoot into content for several platforms",
              "Deleting old videos",
              "Copying another creator's video",
              "Posting the same file on every platform without any changes",
            ],
            answer_index: 0,
            explanation: "One shoot can become shorts, photos and Status updates.",
          },
          {
            prompt: "Why is a steady posting rhythm better than bursts?",
            options: [
              "Platforms ban bursts",
              "It uses more data",
              "It builds trust and fits what you can keep up",
              "It guarantees that the algorithm will make some videos go viral",
            ],
            answer_index: 2,
            explanation: "Consistency helps audiences know what to expect.",
          },
          {
            prompt: "What can happen if you break a platform's community guidelines?",
            options: [
              "You get extra followers",
              "Videos can be removed or accounts restricted",
              "Your videos become longer",
              "Nothing at all",
            ],
            answer_index: 1,
            explanation: "Guideline breaches can lead to removals or restrictions.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "short-video": {
      explanation_md: `Short vertical video is one of the most common demands in the content adverts we studied, both Ghanaian and remote: TikTok, Instagram Reels, Facebook Reels and YouTube Shorts. Some adverts go further and ask for live streaming, including people who can sell products live. WhatsApp Status videos are the local cousin of this format and often drive real orders.

## What makes short video work

* **Vertical, full screen.** Film and export in 9:16 so the video fills the phone.
* **Hook in the first second or two.** Start with movement, a question, the result or a surprising image. No slow logos.
* **One idea per video.** One tip, one product, one moment. If you have three tips, consider three videos.
* **Fast, clean pacing.** Change shots often, cut pauses, use on screen text.
* **Loop friendly endings.** If the end flows back into the start, people may watch twice.
* **Clear call to action.** Follow for more, order on WhatsApp, comment your town.

Maximum lengths and features change, so check each app's current settings.

## Trends, carefully

Trends are popular sounds, dances, formats or jokes that many people copy for a while. Joining a trend can help new people find you. Use trends with care:

* Make sure it fits the brand. A funny dance may suit a fashion shop, not a funeral home.
* Add your own twist, such as a local setting or language.
* Check that the sound is available for business accounts. Some music in apps is allowed for personal accounts but not for brand or commercial use.
* Do not join trends that mock people or involve danger.

## Formats that work for local businesses

* Before and after: hair, tailoring, repairs, cleaning.
* Behind the scenes: how shea butter, smock or furniture is made.
* Quick tips: how to store grains, choose a phone charger, tie a headwrap.
* Customer moments, with permission.
* Price and product reveals for WhatsApp Status.

## Live streaming and live selling

Going live lets a business show products in real time and answer questions. A good live session is planned: products ready, prices clear, good light, stable connection, a helper reading comments, and a clear way to order and pay, often by mobile money. Live uses a lot of data, so do it on WiFi or with a dedicated bundle. Platforms set rules, such as minimum ages or follower counts, before you can go live; check them in the app.

## A small example

Amina makes Reels for a smock weaver in Bolgatanga. Her best video starts with the finished smock being swung on, then shows ten quick shots of the loom, ending with the weaver smiling and the words "Order via WhatsApp". She posts the same video on Status. Later, the weaver tries a planned live session one evening on WiFi, showing new designs while Amina reads questions aloud.`,
      practice_task_md: `**Goal:** Make one short vertical video for a real local business or cause.

**Steps:**
1. Choose a format: before and after, behind the scenes, quick tip or product reveal.
2. Write a hook, three to six shots and a call to action.
3. Film vertically, edit to under thirty seconds with on screen text, and export in 9:16.
4. Check any music you used is allowed for that use.
5. Share it privately with the business owner for feedback before anything is posted.

**Done looks like:** A finished vertical video under thirty seconds and the owner's feedback in a sentence or two.`,
      quiz: {
        questions: [
          {
            prompt: "What shape should short platform videos be?",
            options: [
              "Horizontal 16:9",
              "Circle",
              "Square only",
              "Vertical 9:16",
            ],
            answer_index: 3,
            explanation: "Vertical 9:16 fills the phone screen.",
          },
          {
            prompt: "Which is a careful way to use a trend for a business?",
            options: [
              "Join every trend, whatever the brand",
              "Use trends that mock people",
              "Copy a popular creator's trend video exactly, since trends belong to everyone",
              "Check it fits the brand, add your own twist and confirm the sound is allowed",
            ],
            answer_index: 3,
            explanation: "Trends must suit the brand and be legally usable.",
          },
          {
            prompt: "Why might music that works on a personal account be a problem for a business account?",
            options: [
              "Some app music is allowed for personal use but not for commercial use",
              "Business accounts cannot use any sound at all, even music they have paid for",
              "Music makes business videos longer",
              "It changes the video shape",
            ],
            answer_index: 0,
            explanation: "Licences for app music can differ by account type.",
          },
          {
            prompt: "Which is part of a well planned live selling session?",
            options: [
              "No prices so people must guess",
              "Going live straight away on a weak connection, with prices shared later in private messages",
              "Products ready, clear prices, good light, someone reading comments and easy payment",
              "Ignoring comments",
            ],
            answer_index: 2,
            explanation: "Planning makes live selling smooth and trustworthy.",
          },
          {
            prompt: "What does one idea per video mean?",
            options: [
              "Only post one video ever",
              "Each short video focuses on one tip, product or moment",
              "Use one shot only",
              "Use one word of text",
            ],
            answer_index: 1,
            explanation: "Focused videos are clearer and easier to finish.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "youtube-basics": {
      explanation_md: `YouTube is different from fast scrolling apps. People often go there to search: how to fix something, learn a skill, compare products or hear a story in depth. A good YouTube video can keep finding viewers for years. Some remote editing adverts ask for YouTube uploads, search friendly titles and thumbnails, so these skills can lead to paid work.

## Setting up a channel

You need a Google account to create a channel. Consider a **brand channel** if you are making it for a business or organisation, so others can help manage it without sharing your personal password. Then:

* Choose a clear name that says what the channel is about.
* Add a profile picture, a banner and a short description of who the channel is for and what they will get.
* Turn on two step verification to protect the account. YouTube requires it for some features.

The free YouTube Studio app lets you upload, edit details, reply to comments and see analytics from your phone.

## Uploading well

When you upload, YouTube asks for details. Fill them in carefully:

* **Title.** Clear, honest and using words people search for, with the main idea near the start.
* **Description.** A few sentences on what the video covers, then links, contacts and credits. The first lines matter most.
* **Thumbnail.** A custom thumbnail with one clear subject and a few large words. Your account may need to be verified to upload custom thumbnails.
* **Audience setting.** You must say whether the video is made for children. This affects features like comments, so answer truthfully.
* **Subtitles.** Add or correct subtitles, especially if you speak a mix of languages.
* **Visibility.** Upload as private or unlisted first, check it, then publish.

## Shorts and long videos together

YouTube Shorts are short vertical videos inside YouTube. Many channels use Shorts to reach new people and point them to longer videos. Both count as part of your channel.

## What grows a channel

Useful topics people search for, clear titles and thumbnails, videos that keep people watching, and a steady upload rhythm. Series help: "Part 1, Part 2" or a weekly show gives people a reason to come back.

## A small example

Fuseini starts a channel teaching smallholder farmers in the Northern Region how to use a phone to check weather and market prices, mostly in Dagbani with English subtitles. He creates a brand channel, writes a clear description and turns on two step verification. Each video has a searchable title like "How to check maize prices on your phone", a simple thumbnail, a correct audience setting and checked subtitles. He uploads as unlisted first, watches it once and then publishes.`,
      practice_task_md: `**Goal:** Prepare a YouTube channel and one upload, without spending much data.

**Steps:**
1. Plan a channel on paper: name, who it is for, a two sentence description and three video ideas.
2. If you are ready, create the channel and turn on two step verification. Do this on WiFi if you can.
3. Choose one short video you have made. Write its title, the first three lines of its description, and decide its audience setting.
4. Upload it as unlisted or private, add or correct subtitles, and check how it looks before deciding whether to publish.

**Done looks like:** Your channel plan, and either a live unlisted video link or a full written upload plan if you are waiting for WiFi.`,
      quiz: {
        questions: [
          {
            prompt: "Why might you use a brand channel for a business?",
            options: [
              "It makes videos longer",
              "It removes the need for titles",
              "Others can help manage it without sharing your personal password",
              "It is the only type of channel allowed to upload Shorts or go live",
            ],
            answer_index: 2,
            explanation: "Brand channels allow shared management safely.",
          },
          {
            prompt: "What must you tell YouTube when uploading?",
            options: [
              "Whether the video is made for children",
              "Your salary",
              "Your phone model",
              "How long you spent editing",
            ],
            answer_index: 0,
            explanation: "The audience setting is required and affects features.",
          },
          {
            prompt: "Why upload as private or unlisted first?",
            options: [
              "Because public uploads cost money until the channel is verified",
              "To hide it forever",
              "To make it a Short",
              "To check everything before the public sees it",
            ],
            answer_index: 3,
            explanation: "A private check catches mistakes before publishing.",
          },
          {
            prompt: "How do many channels use Shorts?",
            options: [
              "To replace all long videos",
              "To reach new people and point them to longer videos",
              "Only for advertising",
              "They cannot be on the same channel",
            ],
            answer_index: 1,
            explanation: "Shorts help discovery for the whole channel.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "building-an-audience": {
      explanation_md: `Followers are not the goal by themselves. What matters is having people who trust you, come back, and act: buy, share, donate or hire you. Some Ghanaian adverts for social media content roles ask for audience engagement, and clients who hire you to grow their pages expect you to understand how this works.

## Choose a clear focus

People follow a channel because they know what they will get. "Everything about my life" is hard to follow. "Easy northern recipes on a budget", "phone repair tips in Hausa" or "daily life on a farm near Yendi" is clear. A clear focus is often called a **niche**. It can be broad enough to give you many ideas, but narrow enough that the right people say "this is for me".

## Serve before you sell

Most of your content should help, teach, move or entertain your audience. If every post is an advert, people tune out. A simple balance is to make most posts useful and only some promotional.

## Talk with people

* Reply to comments, especially early on. Answer questions and thank people.
* Ask questions in captions: "Which town should I visit next?"
* Make videos that answer common questions from comments.
* Use WhatsApp groups or channels where it fits, for people who want updates.

A community grows when people feel seen. A few hundred engaged people can be worth more to a business than many thousands who never respond.

## Be consistent and patient

Growth is usually slow at first. Post on a rhythm you can keep, improve each video a little, and give it months, not days. Comparing yourself with big creators who have years of practice is discouraging and misleading.

## Collaborate

Working with creators who share your audience but are not direct competitors can introduce you to new people. A food creator in Tamale might collaborate with a fashion creator for a "market day outfit and lunch" video.

## Stay safe and kind

* Keep personal details such as your home address and daily routine private.
* Moderate comments: delete abuse and scams on pages you manage, and use blocking and filter tools.
* Do not buy fake followers or engagement. It breaks platform rules, misleads clients and makes your real numbers meaningless.

## A small example

Mariama starts a page sharing northern recipes. At first she posts randomly. Then she focuses on "meals under 30 cedis for students", posts twice a week, replies to every comment and makes a video answering a student's question about cooking beans quickly. Growth is slow, but her viewers start sharing recipes in their hostel groups. A local food vendor notices and asks her to create content for them.`,
      practice_task_md: `**Goal:** Write a simple audience plan for your own channel or a client's page.

**Steps:**
1. Write your focus in one sentence: who it is for and what they get.
2. List ten content ideas that serve that audience, and mark which two are promotional.
3. Write three questions you could ask in captions to start conversations.
4. Write your posting rhythm and two safety rules you will follow.

**Done looks like:** A one page audience plan in your notes that a mentor or client could read and understand.`,
      quiz: {
        questions: [
          {
            prompt: "What is a niche in this lesson?",
            options: [
              "A clear focus that tells the right people the content is for them",
              "A type of microphone",
              "A paid advert",
              "A video length",
            ],
            answer_index: 0,
            explanation: "A niche is a clear focus for a channel.",
          },
          {
            prompt: "What does serve before you sell mean?",
            options: [
              "Only post adverts",
              "Never mention your products, so the audience never feels sold to at all",
              "Make most content helpful or entertaining and only some promotional",
              "Charge for every video",
            ],
            answer_index: 2,
            explanation: "Useful content earns attention for occasional promotion.",
          },
          {
            prompt: "Why should you not buy fake followers?",
            options: [
              "It is too cheap",
              "It breaks platform rules, misleads clients and makes your real numbers useless",
              "It makes videos vertical",
              "Fake followers boost engagement, so the algorithm shows your videos to more real people",
            ],
            answer_index: 1,
            explanation: "Fake numbers damage trust and break rules.",
          },
          {
            prompt: "Which is a good way to build community?",
            options: [
              "Ignore comments",
              "Post only once a year",
              "Turn off comments so that negative replies never appear under your videos",
              "Reply to comments, ask questions and answer common questions in videos",
            ],
            answer_index: 3,
            explanation: "Conversation makes people feel seen and come back.",
          },
          {
            prompt: "What helped Mariama's recipe page grow?",
            options: [
              "Random posts about everything",
              "Buying followers",
              "Copying big creators' videos",
              "A clear focus, a steady rhythm and replying to her audience",
            ],
            answer_index: 3,
            explanation: "Focus, consistency and conversation built her audience.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "reading-your-numbers": {
      explanation_md: `Clients and employers want to know whether content is working. Skills frameworks for content creators list evaluating how content performs, and creators use the same numbers to decide what to make next. Every major platform gives free analytics: YouTube Analytics in YouTube Studio, and insights in TikTok, Instagram and Facebook for professional or business accounts.

## The numbers that matter most

Names differ by platform, but these ideas appear everywhere:

* **Views or plays.** How many times the video started. Useful, but it does not tell you if people liked it.
* **Watch time and average view duration.** How long people actually watched. This is often more important than views.
* **Audience retention.** A graph showing what share of viewers were still watching at each moment. Drops show where people left.
* **Click through rate on YouTube.** Of the people who saw your thumbnail, how many clicked. It tells you how well title and thumbnail work together.
* **Engagement.** Likes, comments, shares and saves. Shares and saves often mean the content was truly useful.
* **Traffic sources.** Where viewers came from: search, suggestions, the For You feed, shares or external links such as WhatsApp.
* **Audience.** Age groups, locations and when your followers are online.

## Turning numbers into decisions

Numbers are only useful if they change what you do. Ask questions like:

* Where does the retention graph drop sharply? Watch that moment. Was the hook slow, a pause too long or the sound unclear?
* Which videos got the most shares or saves? Make more on those topics.
* Is click through low while retention is good? The video is fine, but the title or thumbnail needs work.
* When are followers online? Try posting nearer those times.

## Avoid common traps

* **Vanity metrics.** Likes feel good but may not mean sales. For a business, messages, orders or calls may be the real result.
* **Judging too fast.** Give a video some days before drawing conclusions, especially on YouTube.
* **Copying without thinking.** One viral video does not mean every similar idea will work.

## Reporting to a client

A simple monthly report helps clients trust you. Include what you posted, the key numbers, the best and weakest post with reasons, and what you will try next. Keep it short and in plain language; many business owners do not want jargon.

## A small example

Abdul-Rahman manages videos for a computer training centre in Tamale. Analytics show most viewers leave in the first three seconds of videos that start with the centre's logo. Videos that start with a student's result, like a certificate in hand, keep viewers much longer and get shared on WhatsApp. He drops the logo openings, and in his monthly report explains the change and the improvement in plain words.`,
      practice_task_md: `**Goal:** Read real numbers and turn them into one decision.

**Steps:**
1. Open the free analytics for any account you run, or ask a friend or client to show you theirs. If you have no posts yet, use the practice numbers below.
2. Pick two videos: one that did well and one that did poorly. Compare views, average watch time, shares and, if available, the retention graph.
3. Write three sentences: what was different, why you think so, and what you will change next time.

Practice numbers if needed: Video A had 900 views, 4 seconds average watch time and 2 shares. Video B had 400 views, 18 seconds average watch time and 25 shares.

**Done looks like:** A short three sentence analysis you could paste into a client report.`,
      quiz: {
        questions: [
          {
            prompt: "What does an audience retention graph show?",
            options: [
              "What share of viewers were still watching at each moment",
              "How many followers you have",
              "Your income",
              "How many viewers subscribed to the channel after watching the video",
            ],
            answer_index: 0,
            explanation: "Retention shows where viewers leave.",
          },
          {
            prompt: "If click through rate is low but retention is good, what probably needs work?",
            options: [
              "The video's middle section",
              "The music licence",
              "The title or thumbnail",
              "The file name",
            ],
            answer_index: 2,
            explanation: "People who click stay, so the packaging is the issue.",
          },
          {
            prompt: "Why can shares and saves be especially meaningful?",
            options: [
              "They are the same as views",
              "They often mean the content was truly useful",
              "They cost money",
              "They only count on YouTube",
            ],
            answer_index: 1,
            explanation: "People share and save what they value.",
          },
          {
            prompt: "What is a vanity metric?",
            options: [
              "A required tax form",
              "The length of a video",
              "A number that feels good but may not reflect real results like sales",
              "A type of thumbnail",
            ],
            answer_index: 2,
            explanation: "Likes can look good without bringing customers.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "working-and-earning": {
      explanation_md: `Many young people in Ghana see creators online and imagine instant money. The truth is more ordinary and more hopeful: content skills can earn real income, but usually step by step, through clients and jobs, long before any platform pays you. This section is about earning honestly, protecting yourself and respecting other people's rights.

## What employers and clients want to see

Across the Ghanaian and remote adverts we studied, a few expectations repeat beyond camera and editing skills:

* **A portfolio** or samples of real work.
* **Reliability:** meeting deadlines, communicating clearly and organising files.
* **Understanding of brands:** following a brief, matching a brand's voice and working with a marketing team.
* **Respect for rules:** copyright, platform guidelines and, in some adverts, data protection.

None of these need expensive gear. They need professional habits.

## Ways people earn from content

You will look at these honestly in a later lesson. In short:

* **Client work** for local businesses, churches, schools, events and NGOs.
* **Jobs** as an in house content creator, videographer or social media content officer.
* **Remote editing** for agencies and creators abroad, which usually needs a reliable connection and often a laptop.
* **Platform payouts and brand deals** once you have a real audience, depending on the platform and your country.

## Protect yourself

Scams target young creators: fake "brand deals" asking you to pay a fee, fake job offers asking for registration money, or people who take your work and never pay. A real employer does not ask you to pay to get a job. Job boards in Ghana warn users about this too. Agree terms in writing and ask for part payment before big jobs.

## Respect other people's rights

Music, footage and photos belong to the people who made them, and people you film have a right to say no. Getting permission is not just polite; it protects you from removed videos, account strikes and legal trouble.

## What this section covers

* **Copyright, consent and permission.** Using only what you have the right to use, and filming people respectfully.
* **Working with clients and brands.** Briefs, quotes, agreements and disclosure.
* **Honest ways to earn.** What each route really involves.
* **Portfolio and first jobs.** Showing your work and applying.

## Where this can lead

Some training organisations in Ghana run cohort programmes in content creation and related digital skills. This roadmap can help you prepare for them and stand out when you apply, but you do not need a programme to start earning from local clients.

## A small example

Issahaku has made a few videos for friends in Wa. Then someone on social media offers him a "brand ambassador" deal if he first pays 200 cedis for a "starter kit". He remembers that real clients pay you, not the other way round, and declines. Instead he offers a free trial video to a real local business, a printing shop, which then pays him for four videos a month.`,
      practice_task_md: `**Goal:** Prepare to earn safely.

**Steps:**
1. Write down three kinds of local clients you could approach first, based on your earlier lists.
2. Write three warning signs of a scam offer in your own words.
3. Write a short message you could send a local business offering one sample video, explaining what you would make and how long it would take. Do not send it yet if you are not ready.

**Done looks like:** Your client list, scam warning signs and a draft offer message saved in your notes.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, how do most beginners first earn from content skills?",
            options: [
              "Clients and jobs, step by step",
              "Instant platform payouts",
              "Paying for starter kits",
              "Buying followers",
            ],
            answer_index: 0,
            explanation: "Client work and jobs usually come long before platform income.",
          },
          {
            prompt: "Which is a warning sign of a scam?",
            options: [
              "A client sends a clear brief",
              "A business asks to see your portfolio before agreeing to hire you",
              "A client agrees terms in writing",
              "Someone asks you to pay a fee to get a job or brand deal",
            ],
            answer_index: 3,
            explanation: "Real employers and brands pay you, not the other way round.",
          },
          {
            prompt: "Which expectation appears in adverts beyond camera and editing skills?",
            options: [
              "Owning a studio",
              "A portfolio of real work and reliability",
              "A large number of followers for every role",
              "A driving licence",
            ],
            answer_index: 1,
            explanation: "Portfolios and professional habits are commonly requested.",
          },
          {
            prompt: "Why does getting permission for music and people matter?",
            options: [
              "It protects you from removed videos, strikes and legal trouble",
              "It makes videos longer",
              "It is only a matter of politeness, since nobody checks small creators",
              "Platforms pay you for asking",
            ],
            answer_index: 0,
            explanation: "Permission is both respectful and protective.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "copyright-and-permission": {
      explanation_md: `Clients trust you with their brand. If you use a song, clip or photo you do not have rights to, their video can be muted or removed, their account can receive a strike, and in serious cases there can be legal claims. Content adverts and skills frameworks list copyright, media asset rules and data protection, because creators handle all three every day.

## Copyright in plain words

When someone creates music, a recording, a film, a photo or a design, the law usually gives them control over how it is copied and shared. In Ghana this is set out in the Copyright Act, 2005 (Act 690), which the Copyright Office administers. Most countries have similar laws, and platforms like YouTube use automatic systems to detect copyrighted music and video.

Key points:

* **Found online does not mean free to use.** A song on YouTube or a photo on Google still belongs to someone.
* **Crediting is not permission.** Writing "no copyright intended" or "credit to the owner" does not give you the right to use it.
* **Permitted uses are limited.** Ghana's law allows some uses without permission, such as personal use, short quotations with the source named, teaching and news reporting, under conditions such as fair practice. These are narrow and depend on the situation. Do not rely on them for a business promo. YouTube explains a similar idea called fair use, which comes from United States law and is also judged case by case.
* **Folklore is protected too.** Ghana's law protects folklore, such as traditional songs and kente and adinkra designs whose makers are unknown, on behalf of the people of Ghana. Using folklore beyond the permitted uses, for example in a brand campaign, needs permission from the National Folklore Board and may involve a fee. If a brand wants a campaign built on traditional designs or songs, raise this early.

## Safe sources

* Music you made yourself, or that a musician has agreed in writing that you can use.
* Free libraries with clear terms, such as the YouTube Audio Library.
* Music offered inside a platform's app for use on that platform, checking whether business accounts may use it.
* Creative Commons works, which come with licences. Some allow commercial use with credit; others forbid commercial use or changes. Read the licence each time.
* Your own footage and photos.

## Consent from people you film

People have a right to decide how their image and voice are used. Ghana's Data Protection Act, 2012 (Act 843) sets rules for collecting and using personal information, and a recognisable face or voice can be personal information. Good practice:

* Ask before filming, explain where the video will appear and let people say no.
* For commercial videos, get consent in writing or as a short recorded statement.
* For children, get permission from a parent or guardian, and think twice before showing children's faces with their school or location.
* Be extra careful with sensitive situations, such as health, religion or people in hardship. Protect dignity.

## A small example

Hawa edits an advert for a hotel in Tamale using a popular song. Before delivering, she remembers the risks and replaces it with a track from a free library. She also checks that every guest shown signed a simple consent note, and blurs one person who did not. The hotel's video stays online without problems.`,
      practice_task_md: `**Goal:** Build your own safe media kit and consent form.

**Steps:**
1. Find two free music tracks from a library with clear terms, such as the YouTube Audio Library. Note the name, source and any credit required.
2. Find one Creative Commons image and write down which licence it uses and whether it allows commercial use.
3. Write a simple consent note in plain English that someone you film could sign or say on camera: their name, what you are filming, where it will be used and their agreement.
4. If you speak a Ghanaian language, translate the consent note.

**Done looks like:** A note listing your safe music and image with licences, and your consent note ready to use.`,
      quiz: {
        questions: [
          {
            prompt: "Does writing \"credit to the owner\" give you permission to use a song?",
            options: [
              "Yes, always",
              "Yes, if the video is short",
              "No, crediting is not permission",
              "Yes, on WhatsApp only",
            ],
            answer_index: 2,
            explanation: "You need actual permission or a licence, not just a credit.",
          },
          {
            prompt: "Which is a safe music source for a client video?",
            options: [
              "A popular radio song downloaded online",
              "A free library track with clear terms, such as the YouTube Audio Library",
              "Music ripped from another creator's video, as long as you tag them in the caption",
              "Any song if you add credit",
            ],
            answer_index: 1,
            explanation: "Libraries with clear terms give you the right to use the music.",
          },
          {
            prompt: "What should you check with a Creative Commons work?",
            options: [
              "Nothing, because every Creative Commons work can be used in any way you like",
              "Only the file size",
              "Only the colour",
              "The specific licence, such as whether commercial use is allowed",
            ],
            answer_index: 3,
            explanation: "CC licences differ; some forbid commercial use or changes.",
          },
          {
            prompt: "What is good practice when filming children?",
            options: [
              "Film freely at public events, since anyone outside can be recorded and posted online",
              "Ask the child only",
              "Post first and ask later",
              "Ask a parent or guardian first and be careful about showing their school or location",
            ],
            answer_index: 3,
            explanation: "Children need guardian consent and extra protection.",
          },
          {
            prompt: "Why should a brand campaign built on adinkra designs or traditional songs raise questions early?",
            options: [
              "Using folklore beyond permitted uses needs permission from the National Folklore Board",
              "Folklore cannot appear in videos at all",
              "It always makes videos longer",
              "Platforms automatically block all traditional music and adinkra symbols in paid adverts",
            ],
            answer_index: 0,
            explanation: "Ghana's law protects folklore, and uses such as a brand campaign need the Board's permission.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "working-with-brands": {
      explanation_md: `Brands and businesses are where most creators earn first. Content adverts and skills frameworks ask creators to match a brand's voice, follow brand guidelines, interpret briefs and meet deadlines. One remote advert we read added meeting deadlines in the client's time zone. Clients rehire people who are easy to work with.

## Understand the brief

A brief is the client's description of what they want. If they do not give one, ask questions and write it yourself:

* What is the goal: awareness, sales, sign ups or a message?
* Who is the audience?
* What must be included: product, price, logo, contact details, key message?
* Where will it be posted, and in what shape and length?
* What is the deadline?
* Are there brand colours, fonts or words to use or avoid?

Send the written brief back and ask the client to confirm it. This one step prevents most arguments later.

## Quote and agree in writing

Before you start, agree in writing, even by WhatsApp message:

* **Deliverables:** for example, three vertical videos of up to thirty seconds and ten photos.
* **Price and payment:** amount in cedis, how to pay (often mobile money) and when. Asking for part payment upfront on bigger jobs is normal.
* **Revisions:** how many rounds of changes are included.
* **Deadline:** when drafts and final files are due.
* **Usage:** where the client may use the content, and whether you may show it in your portfolio.

Price based on the time and skill involved, the number of deliverables and what similar local creators charge. Raise prices as your portfolio and results grow.

## Disclose paid content

When a brand pays you or gives you free products to feature them on your own channel, your audience has a right to know. Platforms provide tools for this, such as YouTube's paid promotion setting and branded content labels on other apps. Say it clearly in the video or caption too. Hidden adverts break platform rules and destroy trust.

## Be careful with claims

Do not repeat claims you cannot check, especially about health, money or results: "cures malaria", "guaranteed profit", "lose ten kilos in a week". In Ghana, adverts for regulated products such as food, medicines and cosmetics have their own rules from the Food and Drugs Authority. If a brand asks you to promote such products, ask whether the advert has been approved, and refuse content that could mislead or harm people.

## Deliver professionally

Send drafts on time, label files clearly, respond politely to feedback and keep to the agreed revisions. After delivery, ask how the content performed and whether you may share results in your portfolio.

## A small example

Wumpini is asked by a cosmetics seller in Tamale to make three videos. She writes a short brief, confirms the price, part payment by mobile money, two revision rounds and portfolio permission in a WhatsApp message. When the seller asks her to say a cream "removes all dark spots in three days", Wumpini explains she cannot make that claim and suggests showing real customers' routines instead. The seller agrees, and later books her again.`,
      practice_task_md: `**Goal:** Create a reusable brief and agreement template.

**Steps:**
1. Write a brief template with the questions from this lesson: goal, audience, must include, platform and shape, deadline, brand rules.
2. Fill it in for an imaginary or real local client, such as a chop bar or a phone shop.
3. Write an agreement message covering deliverables, price in cedis, payment method and timing, revisions, deadline and portfolio use.
4. Write one sentence you could use to disclose a paid partnership in a caption.

**Done looks like:** A filled in brief, an agreement message and a disclosure line, saved as templates you can reuse.`,
      quiz: {
        questions: [
          {
            prompt: "Why send a written brief back to the client to confirm?",
            options: [
              "Clients enjoy reading",
              "Platforms require it",
              "It prevents most misunderstandings and arguments later",
              "It replaces payment",
            ],
            answer_index: 2,
            explanation: "A confirmed brief sets clear expectations.",
          },
          {
            prompt: "Which item belongs in a written agreement?",
            options: [
              "Your favourite song",
              "Deliverables, price, payment timing, revisions, deadline and usage",
              "Your follower count only",
              "The client's home address",
            ],
            answer_index: 1,
            explanation: "These terms protect both you and the client.",
          },
          {
            prompt: "What should you do when a brand pays you to feature them on your channel?",
            options: [
              "Hide it so the post looks natural, since followers trust it more that way",
              "Only tell your friends",
              "Disclose it using platform tools and clearly in the video or caption",
              "Delete the video later",
            ],
            answer_index: 2,
            explanation: "Audiences must know when content is paid for.",
          },
          {
            prompt: "A brand asks you to say a cream removes all dark spots in three days. What should you do?",
            options: [
              "Refuse claims you cannot check and suggest an honest alternative",
              "Say it, since the brand takes responsibility for its own product claims",
              "Say it in small text",
              "Make the claim even bigger",
            ],
            answer_index: 0,
            explanation: "Misleading health claims can harm people and break advertising rules.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "earning-routes": {
      explanation_md: `"How much do creators make?" is one of the most common questions young people ask. The honest answer is that it varies hugely, many people earn little at first, and nobody can promise you an income. What we can do is explain the main routes, what each one takes and what to watch out for, so you can choose well.

## Route 1: Local client work

Making videos and photos for businesses, churches, schools, events and NGOs near you. This is often the quickest route for beginners because the need is visible and nearby, payment can come by mobile money, and you can start small with a sample. It needs reliability, a basic portfolio and the confidence to approach people.

## Route 2: A job

Ghanaian companies advertise roles such as content creator, in house videographer, photographer and social media content officer. Many are in Accra and Tema, and some ask for a diploma or degree and experience, though entry level and internship roles also appear. A strong portfolio can help you compete. These roles give steadier income and teach you how brands work.

## Route 3: Remote editing and content work

Agencies and creators abroad hire editors for short form and YouTube videos, sometimes accepting applicants from Ghana. These roles often ask for a strong portfolio, fast turnaround, good English, a reliable internet connection and a laptop that can edit HD video. They may also require working in another time zone. Beware of scams: never pay to apply.

## Route 4: Platform payouts

Some platforms share advertising income with creators who meet their rules. YouTube's Partner Program lists Ghana among available countries, but a channel must first meet eligibility requirements such as a minimum number of subscribers plus enough watch hours or Shorts views, have no active Community Guidelines strikes, turn on two step verification, follow monetization policies and link a payment account. Other platforms, such as TikTok, run creator reward programmes only in certain countries, and Ghana may not be one of them. Do not trust lists on blogs, which often disagree. Rules change, so check each platform's official pages and in app settings. For most creators, platform payouts come late, if at all.

## Route 5: Brand deals and sponsorships

Once you have an engaged audience in a clear niche, brands may pay you to feature them. A smaller, trusted audience can attract local brands. Always disclose paid content and only promote what you believe is honest.

## Route 6: Selling your own services or products

Creators sometimes sell training, such as teaching phone video to small business owners, or their own products, using their audience to reach buyers.

## Mixing routes

Most working creators combine routes: client work for steady money while building an audience slowly, for example. Keep simple records of what you earn and spend so you can see what is really working.

## A small example

Sumaila in Tamale starts by filming events for churches and two shops. He keeps a simple notebook of every job and payment. Meanwhile he posts phone repair tips on his own channel. A year later, his channel is still growing slowly and has not yet qualified for payouts, but his client work is steady and his videos help him win a part time role at a local media house.`,
      practice_task_md: `**Goal:** Choose your first earning route honestly.

**Steps:**
1. For each of the six routes, write one sentence on what it would take for you right now: skills, equipment, connection and time.
2. Pick the one or two routes that fit your situation today.
3. Visit the official YouTube help page on Partner Program eligibility, on WiFi if you can, and write down the current requirements in your own words.
4. Set one small goal for the next month, such as making one sample video for a local business.

**Done looks like:** Your six sentences, chosen route, notes on the current YouTube requirements and a one month goal.`,
      quiz: {
        questions: [
          {
            prompt: "Which route is often quickest for beginners according to the lesson?",
            options: [
              "Platform payouts",
              "Brand deals with no audience",
              "Paying for a starter kit",
              "Local client work",
            ],
            answer_index: 3,
            explanation: "Local needs are visible and payment can start small.",
          },
          {
            prompt: "What does YouTube require before a channel can join its Partner Program?",
            options: [
              "Nothing, because every channel starts earning from its first video once a mobile money account is linked",
              "Meeting minimum subscriber and watch hour or Shorts view rules, plus policies and a payment account",
              "Only a verified phone number",
              "Paying a joining fee",
            ],
            answer_index: 1,
            explanation: "Eligibility thresholds and policies apply before payouts.",
          },
          {
            prompt: "What do remote editing roles often require?",
            options: [
              "A strong portfolio, reliable internet and often a laptop that can edit HD video",
              "A registration fee paid to the agency before they send you any editing work",
              "No portfolio at all",
              "Living in the client's country",
            ],
            answer_index: 0,
            explanation: "Remote roles expect proof of skill and dependable equipment.",
          },
          {
            prompt: "What is the lesson's honest message about creator income?",
            options: [
              "Everyone earns a lot quickly",
              "Platform payouts are guaranteed once you post every day for three months straight",
              "Income varies, many earn little at first and nobody can promise an income",
              "Only famous people earn anything",
            ],
            answer_index: 2,
            explanation: "There are real routes, but no guarantees.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "portfolio-and-first-jobs": {
      explanation_md: `Content adverts, in Ghana and remote, ask for proof that you can shoot and edit, and some ask for a portfolio with the application. Your portfolio is your proof: it shows what you can do far better than a list of apps on a CV.

## What to include

Quality beats quantity. Aim for a small set of your best work, around six to ten pieces, that shows range:

* **Short vertical videos** for a business or cause.
* **A longer video,** such as an interview, event highlight or YouTube tutorial.
* **Product and portrait photos.**
* **A before and after,** such as a raw clip next to your edit, or old product photos next to yours.
* **Captions or a script** you wrote.

For each piece, add one or two lines: who it was for, what the goal was, what you did (filmed, edited, wrote) and any honest result you have permission to share, such as "the shop received more WhatsApp orders that week" if the owner told you so. Never invent results or claim work you did not do.

Only include client work if the client agreed, and only include people who gave consent.

## Where to host it cheaply

* An **unlisted YouTube playlist** for videos.
* A **cloud drive folder** with clearly named files, shared as a view only link.
* An **Instagram or TikTok profile** used as a public showcase, with highlights grouped by type.
* A simple **one page document** with links and short descriptions that you can send as a PDF.

Keep links working and check them on a phone and a computer before sending.

## Getting the first pieces

If you have no clients yet, create real work anyway: a video for a family member's business, a church programme, a school event or a community clean up, with permission. Volunteer projects for NGOs and community groups count when they are real.

## Applying for jobs

* Read the advert and match your portfolio to it. If they want TikTok product videos, put those first.
* Write a short, specific message: who you are, what you can do for them, and two links.
* Mention free tools you use and that you work efficiently on a phone, but let the work speak.
* Look on Ghanaian job boards, company and NGO career pages, and remote boards. Ignore any offer that asks you to pay.
* Prepare for a test task: some employers ask candidates to edit sample footage or shoot a short video.

## Keep growing

Update your portfolio every few months, replacing weaker pieces. Ask clients for a short written reference you may quote.

## A small example

Amina wants a content creator job in Tamale. She builds a one page portfolio with links to an unlisted playlist of five videos, a folder of product photos and a before and after of a tailor's page. Each piece has two lines of context. When a local fashion brand advertises for a social media content assistant, she puts her fashion work first and sends a short message with two links. They invite her to a test shoot.`,
      practice_task_md: `**Goal:** Build version one of your portfolio.

**Steps:**
1. Choose your best four to six pieces from this roadmap's practice tasks or real projects. Check you have permission from clients and people shown.
2. Create an unlisted YouTube playlist or a view only cloud folder for them, uploading on WiFi if you can.
3. Write one or two lines for each piece: who it was for, the goal and what you did.
4. Make a one page document with your name, a sentence about what you offer, your links and contact details.
5. Find one real advert for a content role in Ghana or a remote role open to Ghana, and write a three sentence application message matched to it.

**Done looks like:** A working portfolio link, your one page document and a draft application message to show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say matters most in a portfolio?",
            options: [
              "Having as many pieces as possible, including unfinished drafts",
              "A small set of your best work showing range",
              "Only certificates",
              "Only photos of your equipment",
            ],
            answer_index: 1,
            explanation: "Quality and range beat quantity.",
          },
          {
            prompt: "What should you write beside each portfolio piece?",
            options: [
              "Nothing",
              "Invented view counts",
              "Your phone model only",
              "Who it was for, the goal, what you did and any honest result you may share",
            ],
            answer_index: 3,
            explanation: "Context shows your role and thinking.",
          },
          {
            prompt: "What should you do if you have no clients yet?",
            options: [
              "Wait until someone hires you",
              "Use other creators' best videos as samples until you have finished your own work",
              "Invent client names",
              "Create real work with permission, such as for a family business or church",
            ],
            answer_index: 3,
            explanation: "Real projects, even unpaid, build genuine proof.",
          },
          {
            prompt: "How should you tailor your portfolio when applying for a job?",
            options: [
              "Put the work that matches the advert first",
              "Send the same thing to everyone",
              "Hide your best work",
              "Send only your CV",
            ],
            answer_index: 0,
            explanation: "Matching work to the advert shows you fit the role.",
          },
          {
            prompt: "What might some employers ask candidates to do?",
            options: [
              "Pay an application fee to cover the cost of reviewing your work",
              "Buy their products",
              "Complete a test task such as editing sample footage",
              "Bring their own studio",
            ],
            answer_index: 2,
            explanation: "Test tasks check practical skill.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
