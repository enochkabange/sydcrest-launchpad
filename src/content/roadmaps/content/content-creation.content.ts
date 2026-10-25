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

**Done looks like:** A note on your phone with the ten names, three ideas and your two sentences. Keep it; you will use these names again in later lessons.`,
      quiz: {
        questions: [
          {
            prompt: "Which skill do Ghanaian content creator adverts most often ask for?",
            options: [
              "Owning a professional cinema camera",
              "Shooting and editing short vertical videos for social platforms",
              "Writing computer code for websites",
              "Running a television station",
            ],
            answer_index: 1,
            explanation: "The lesson notes that adverts repeatedly ask for shooting and editing short vertical videos, not expensive equipment.",
          },
          {
            prompt: "Why does client work often earn money sooner than building your own audience?",
            options: [
              "Because platforms pay beginners straight away",
              "Because audiences grow in a few days",
              "Because a business can pay you this week while an audience takes months or years to grow",
              "Because client work needs no portfolio",
            ],
            answer_index: 2,
            explanation: "A shop owner can pay for content now, while an audience builds slowly.",
          },
          {
            prompt: "What does a video editor role usually involve?",
            options: [
              "Turning raw footage into finished videos, often remotely",
              "Only taking still photos at weddings",
              "Selling phones in a shop",
              "Managing a company's accounts",
            ],
            answer_index: 0,
            explanation: "The lesson describes a video editor as someone who turns other people's raw footage into finished videos, often remotely.",
          },
          {
            prompt: "Mariama got her first client mainly because she:",
            options: [
              "Bought an expensive camera",
              "Made a useful video for a group with a weak online presence and showed it to them",
              "Waited for the group to post a job advert",
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
            options: ["4K at 60 frames per second", "1080p at 30 frames per second", "480p at 15 frames per second", "Slow motion only"],
            answer_index: 1,
            explanation: "1080p at 30 frames per second is enough and keeps files manageable.",
          },
          {
            prompt: "Why is walking closer usually better than zooming in?",
            options: [
              "Zoom uses more data",
              "Digital zoom often makes the picture look softer",
              "Walking closer charges the battery",
              "Zooming deletes your files",
            ],
            answer_index: 1,
            explanation: "Digital zoom on most phones reduces sharpness, so moving closer gives a cleaner image.",
          },
          {
            prompt: "What does locking focus and exposure help with?",
            options: [
              "It stops the picture changing brightness and focus while you film",
              "It makes the video vertical",
              "It adds music automatically",
              "It uploads the clip to YouTube",
            ],
            answer_index: 0,
            explanation: "Holding on the subject keeps focus and brightness fixed during the shot.",
          },
          {
            prompt: "Which orientation suits TikTok, Reels, Shorts and WhatsApp Status?",
            options: ["Horizontal", "Square only", "Vertical", "Upside down"],
            answer_index: 2,
            explanation: "These formats are vertical, while normal YouTube videos are horizontal.",
          },
          {
            prompt: "What is the lesson's advice about editing apps?",
            options: [
              "Install as many as possible",
              "Only paid apps give professional results",
              "Pick one editor and learn it well",
              "Never use an editing app",
            ],
            answer_index: 2,
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
* **Use your phone's data saver** mode, which limits background data for many apps.

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
              "Planning and writing",
              "Shooting and editing",
              "Sending files and publishing",
              "Charging your phone",
            ],
            answer_index: 2,
            explanation: "Planning, shooting and editing work offline; sending and publishing need data.",
          },
          {
            prompt: "What happens when you send a video the normal way on WhatsApp?",
            options: [
              "It is compressed and loses quality",
              "It always arrives in 4K",
              "It is deleted after one hour",
              "It uses no data",
            ],
            answer_index: 0,
            explanation: "WhatsApp compresses normal video messages; sending as a document keeps full quality.",
          },
          {
            prompt: "Why send a small preview before the final file?",
            options: [
              "Clients prefer blurry videos",
              "It saves data while the client approves or asks for changes",
              "It makes the final video longer",
              "Platforms only accept small files",
            ],
            answer_index: 1,
            explanation: "A small preview is cheap to send; the full file goes only after approval.",
          },
          {
            prompt: "Which setting stops WhatsApp using your bundle on media you never asked for?",
            options: [
              "Turning on read receipts",
              "Setting media auto download to WiFi only or off",
              "Changing your profile picture",
              "Muting a group",
            ],
            answer_index: 1,
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
              "Pressing record on a phone",
              "Making people stop, understand the message and take an action",
              "Using as many apps as possible",
              "Posting every hour",
            ],
            answer_index: 1,
            explanation: "The value is in getting people to stop, understand and act.",
          },
          {
            prompt: "What is the one sentence test?",
            options: [
              "Writing a caption of one sentence",
              "Finishing the sentence about who the content is for and what they will feel, know or do after",
              "Filming one shot only",
              "Asking the client for one sentence of feedback",
            ],
            answer_index: 1,
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
              "The borehole's engineering",
              "The NGO's logo",
              "How clean water near home changed Wumpini's day",
              "The music he chose",
            ],
            answer_index: 2,
            explanation: "He followed one person so the viewer could feel the change.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "hooks-and-story": {
      explanation_md: `On TikTok, Reels or Shorts, people decide in the first second or two whether to keep watching. On YouTube the first fifteen seconds matter just as much. Ghanaian adverts for short form editors mention hooks and keeping viewers watching, because a video nobody finishes does nothing for the brand paying for it.

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
              "An opening that gives viewers a reason to keep watching",
              "A type of microphone",
              "The background music",
            ],
            answer_index: 1,
            explanation: "A hook is the opening that makes people stay.",
          },
          {
            prompt: "Why should you avoid clickbait hooks?",
            options: [
              "They are too short",
              "They promise something the video does not deliver, so people leave and stop trusting you",
              "Platforms ban all questions",
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
              "Beginning, middle, end",
              "Logo, music, credits",
            ],
            answer_index: 2,
            explanation: "Beginning sets up the problem, middle shows change, end gives the result and next step.",
          },
          {
            prompt: "What does show, do not just tell mean for a soap advert?",
            options: [
              "Reading the ingredients aloud",
              "Showing a mother bathing her baby with the soap",
              "Printing the price in large text only",
              "Using a longer title",
            ],
            answer_index: 1,
            explanation: "Letting viewers see the benefit is stronger than stating it.",
          },
          {
            prompt: "Why did Sumaila's second barber video keep more viewers?",
            options: [
              "It was longer",
              "It opened with the shop sign",
              "Its hook made people want to see the finished haircut",
              "It had no ending",
            ],
            answer_index: 2,
            explanation: "The messy haircut and promise of a result made people stay for the reveal.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "scripts-and-shot-lists": {
      explanation_md: `Shoots in Ghana often happen in tight windows: a shop owner who can give you thirty minutes before customers arrive, a programme that happens once, light that disappears at six. If you arrive without a plan, you forget shots and have to come back, spending more transport money, battery and goodwill. Adverts for content roles ask for content planning, scripts and storyboards because planning is what makes a creator reliable.

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
            options: ["Price and place", "Say and Show", "Start and stop", "Music and logo"],
            answer_index: 1,
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
              "Extra shots like close ups of hands, products and surroundings used to cover cuts",
              "The second version of a script",
              "A type of background music",
            ],
            answer_index: 1,
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
      explanation_md: `A great video with a weak caption or title can still be ignored. The words around your content tell people what it is, why they should care and what to do next. Ghanaian content and social media adverts regularly list captions, copywriting and thumbnails alongside video skills, because the same person usually writes them.

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
              "Because only the first line or two show before people tap more",
              "Because platforms delete long captions",
              "Because it uses less data",
            ],
            answer_index: 1,
            explanation: "The opening lines are all most people see.",
          },
          {
            prompt: "Which YouTube title is easier for searchers to find?",
            options: [
              "My farm day",
              "Vibes only",
              "How to plant soybeans in Northern Ghana",
              "Watch this",
            ],
            answer_index: 2,
            explanation: "It uses the words people would type into search.",
          },
          {
            prompt: "What should a caption usually end with?",
            options: [
              "Twenty hashtags",
              "One clear action for the viewer",
              "The creator's full biography",
              "Nothing, to keep it mysterious",
            ],
            answer_index: 1,
            explanation: "A single call to action tells people what to do next.",
          },
          {
            prompt: "Why is on screen text important?",
            options: [
              "Many people watch without sound",
              "It replaces the need for video",
              "Platforms require it on every frame",
              "It makes files smaller",
            ],
            answer_index: 0,
            explanation: "Text carries the message for people watching silently.",
          },
          {
            prompt: "What made Abdul-Rahman's rewritten tailor caption work?",
            options: [
              "More emojis",
              "It stated what was offered, the price, timing and how to order",
              "It was in capital letters",
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
      explanation_md: `Many people in Northern Ghana think, joke and decide in Dagbani, Gonja, Dagaare, Frafra, Hausa, Mampruli or another home language, not in English. A video in the language your audience loves can feel like a friend talking, not an advert. NGO and communications adverts in Ghana often ask for fluency in English plus one or more Ghanaian languages, because messages land better when people hear them in their own words.

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
              "Because messages about health and money are easier to trust in a familiar language",
              "Because local language videos are always shorter",
              "Because subtitles are impossible in English",
            ],
            answer_index: 1,
            explanation: "Familiar language builds trust for important messages.",
          },
          {
            prompt: "What is the lesson's advice about automatic captions?",
            options: [
              "Trust them completely",
              "Never use them",
              "Check and correct them by hand, especially for Ghanaian languages and names",
              "Only use them in English",
            ],
            answer_index: 2,
            explanation: "Automatic captions often get local languages and names wrong.",
          },
          {
            prompt: "Which group do subtitles help?",
            options: [
              "Only people with fast internet",
              "People who speak another language, watch without sound or are deaf or hard of hearing",
              "Only the creator",
              "Only advertisers",
            ],
            answer_index: 1,
            explanation: "Subtitles make one video useful to more people.",
          },
          {
            prompt: "What should you do when writing in a language you do not speak well?",
            options: [
              "Guess the words",
              "Use only emojis",
              "Ask a fluent speaker to check your script and subtitles",
              "Avoid subtitles",
            ],
            answer_index: 2,
            explanation: "A fluent check prevents wrong or offensive wording.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
