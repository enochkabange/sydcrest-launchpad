import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Video and Content Creation track (Wave 3). Original SydCrest outline,
 * written from job advert and skills framework research.
 * Evidence for every node: src/content/research/content-creation.md.
 */

const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

/** Track specific links, each checked to resolve on 2026-10-25 (reviewer updated redirected URLs to their final pages). */
const L = {
  ytCreators: r("YouTube for Creators: start and manage a channel", "https://www.youtube.com/creators/get-started/"),
  ytStrategy: r("YouTube for Creators: optimise your content", "https://www.youtube.com/creators/grow/optimize-your-content/"),
  ytMonetisation: r("YouTube for Creators: earning on YouTube", "https://www.youtube.com/creators/earn/overview/"),
  ytChannel: r("YouTube Help: create a channel", "https://support.google.com/youtube/answer/1646861", "practice"),
  ytUpload: r("YouTube Help: upload videos", "https://support.google.com/youtube/answer/57407", "practice"),
  ytThumbTips: r("YouTube Help: thumbnail and title tips", "https://support.google.com/youtube/answer/12340300"),
  ytCaptions: r("YouTube Help: add subtitles and captions", "https://support.google.com/youtube/answer/2734796", "practice"),
  ytShorts: r("YouTube Help: get started with Shorts", "https://support.google.com/youtube/answer/10059070"),
  ytAnalytics: r("YouTube Help: get started with Analytics", "https://support.google.com/youtube/answer/9002587"),
  ytRetention: r("YouTube Help: audience retention key moments", "https://support.google.com/youtube/answer/9314415"),
  ytCopyright: r("YouTube Help: copyright on YouTube", "https://support.google.com/youtube/answer/2797466"),
  ytFairUse: r("YouTube Help: fair use", "https://support.google.com/youtube/answer/9783148"),
  ytAudioLib: r("YouTube Help: free music in the Audio Library", "https://support.google.com/youtube/answer/3376882", "practice"),
  ytBranded: r("YouTube Help: branded content disclosure", "https://support.google.com/youtube/answer/154235"),
  ytYpp: r("YouTube Help: Partner Program eligibility", "https://support.google.com/youtube/answer/72851"),
  ytYppCountries: r("YouTube Help: Partner Program availability by country", "https://support.google.com/youtube/answer/7101720"),
  ytQuality: r("YouTube Help: change video quality on Android", "https://support.google.com/youtube/answer/91449"),
  ytEncoding: r("YouTube Help: recommended upload settings", "https://support.google.com/youtube/answer/1722171"),
  ytGuidelines: r("YouTube Help: Community Guidelines", "https://support.google.com/youtube/answer/9288567"),
  tiktokAcademy: r("TikTok Creator Academy", "https://www.tiktok.com/creator-academy/", "video"),
  metaLearn: r("Meta Blueprint free courses", "https://www.facebook.com/business/learn", "video"),
  khanStory: r("Khan Academy: Pixar in a Box storytelling", "https://www.khanacademy.org/computing/pixar/storytelling", "video"),
  ccLicenses: r("Creative Commons: about CC licenses", "https://creativecommons.org/cc-licenses/"),
  freesound: r("Freesound: free sound effects", "https://freesound.org/", "practice"),
  snapseed: r("Snapseed Help", "https://support.google.com/snapseed/", "practice"),
  dataProtection: r("Ghana Data Protection Commission", "https://dpc.gov.gh/"),
};

export const contentCreation: RoadmapDraft = {
  slug: "content-creator",
  title: "Video and Content Creation",
  description:
    "Tell stories with your phone: plan, shoot, edit and publish short videos, photos and YouTube content for yourself, local businesses and brands. Learn with free apps and little data, and build a portfolio that clients can see.",
  track: "content-creation",
  field_category: "marketing",
  level: "beginner",
  leads_to: ["social-media-management", "freelancing"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "getting-started",
      title: "Starting as a creator",
      summary:
        "See what content creators, videographers and social media content officers actually do and who pays them. Then set up your phone and habits so you can work well on a small data bundle.",
      parent: null,
      optional: false,
      resources: [L.ytCreators, L.tiktokAcademy],
    },
    {
      slug: "phone-studio",
      title: "Your phone as a studio",
      summary:
        "Learn the camera settings, storage habits and free apps that turn an ordinary phone into a working studio. A clean lens and enough free space matter more than an expensive handset.",
      parent: "getting-started",
      optional: false,
      resources: [L.snapseed, L.ytEncoding],
    },
    {
      slug: "data-saving-workflow",
      title: "Working with little data",
      summary:
        "Plan your work so that shooting and editing happen offline and only the final upload uses data. Use WiFi when you can, small exports for previews and settings that stop apps eating your bundle.",
      parent: "getting-started",
      optional: false,
      resources: [L.ytQuality],
    },
    {
      slug: "storytelling",
      title: "Storytelling and writing",
      summary:
        "Every good video, photo series or post tells a small story that someone wants to finish. This section covers hooks, scripts, captions and creating in the languages your audience speaks.",
      parent: null,
      optional: false,
      resources: [L.khanStory],
    },
    {
      slug: "hooks-and-story",
      title: "Hooks and story structure",
      summary:
        "Open with a reason to keep watching, then move through a clear beginning, middle and end. Short videos use the same structure as a good folktale, only faster.",
      parent: "storytelling",
      optional: false,
      resources: [L.khanStory, L.ytRetention],
    },
    {
      slug: "scripts-and-shot-lists",
      title: "Scripts, storyboards and shot lists",
      summary:
        "Write what will be said and shown before you press record, then list every shot you need. Planning on paper saves battery, data and a second trip to the location.",
      parent: "storytelling",
      optional: false,
      resources: [L.khanStory],
    },
    {
      slug: "captions-and-titles",
      title: "Captions, titles and descriptions",
      summary:
        "Write the words around your content so people stop, understand and act. Good titles and captions are short, honest and tell the viewer what they will get.",
      parent: "storytelling",
      optional: false,
      resources: [L.ytThumbTips],
    },
    {
      slug: "local-languages",
      title: "Creating in local languages",
      summary:
        "Content in Dagbani, Twi, Hausa, Gonja, Dagaare, Ewe or Pidgin can reach and move people that English content misses. Learn to mix languages well and add subtitles so more people can follow.",
      parent: "storytelling",
      optional: false,
      resources: [L.ytCaptions],
    },
    {
      slug: "shooting",
      title: "Shooting with a phone",
      summary:
        "Good footage comes from steady hands, thoughtful framing, decent light and clear sound. This section teaches each one with things you already own or can find cheaply.",
      parent: null,
      optional: false,
      resources: [L.ytCreators],
    },
    {
      slug: "framing-and-composition",
      title: "Framing, angles and steady shots",
      summary:
        "Place your subject with intention, choose the right shot size and keep the phone steady. These habits make phone footage look planned instead of accidental.",
      parent: "shooting",
      optional: false,
      resources: [L.ytCreators],
    },
    {
      slug: "phone-photography",
      title: "Photos for people and products",
      summary:
        "Take portraits, event photos and product shots that local businesses can use straight away. Learn simple backgrounds, natural light and light editing that keeps colours true.",
      parent: "shooting",
      optional: false,
      resources: [L.snapseed],
    },
    {
      slug: "light-on-a-budget",
      title: "Light on a budget",
      summary:
        "Use window light, shade and cheap reflectors to make faces and products look their best. Knowing where light comes from matters more than buying lights.",
      parent: "shooting",
      optional: false,
      resources: [L.ytCreators],
    },
    {
      slug: "sound-on-a-budget",
      title: "Sound on a budget",
      summary:
        "Viewers forgive shaky video sooner than bad sound. Get clear voices by choosing quiet places, moving the phone closer and using a cheap wired or clip microphone when you can.",
      parent: "shooting",
      optional: false,
      resources: [L.freesound],
    },
    {
      slug: "editing",
      title: "Editing on your phone",
      summary:
        "Editing turns a pile of clips into a story people finish. Free phone editors are enough for professional short videos, thumbnails and simple YouTube edits.",
      parent: null,
      optional: false,
      resources: [L.ytAudioLib],
    },
    {
      slug: "editing-basics",
      title: "Cutting, pacing and sequence",
      summary:
        "Import clips, trim the dead moments and order shots so the story flows. Pacing decides whether viewers stay to the end.",
      parent: "editing",
      optional: false,
      resources: [L.ytRetention],
    },
    {
      slug: "music-voice-and-text",
      title: "Music, voice over and on screen text",
      summary:
        "Add music you have the right to use, record clean voice over and place readable text and captions. Many people watch without sound, so text carries the message too.",
      parent: "editing",
      optional: false,
      resources: [L.ytAudioLib, L.ytCaptions],
    },
    {
      slug: "export-and-organise",
      title: "Exporting, thumbnails and file habits",
      summary:
        "Export at the right size for each platform, design a clear thumbnail and keep your files named and backed up. Organised files are what make you dependable for clients.",
      parent: "editing",
      optional: false,
      resources: [L.ytEncoding, L.ytThumbTips],
    },
    {
      slug: "publishing",
      title: "Publishing and growing",
      summary:
        "Different platforms reward different kinds of content. Learn short vertical video, YouTube, audience building and how to read your numbers without chasing them blindly.",
      parent: null,
      optional: false,
      resources: [L.ytStrategy],
    },
    {
      slug: "short-video",
      title: "Short vertical video and live",
      summary:
        "Make Reels, TikToks, Shorts and WhatsApp Status videos that grab attention fast and loop well. Use trends with care and understand how live selling works.",
      parent: "publishing",
      optional: false,
      resources: [L.ytShorts, L.tiktokAcademy, L.metaLearn],
    },
    {
      slug: "youtube-basics",
      title: "YouTube basics",
      summary:
        "Set up a channel, upload properly and write titles, descriptions and thumbnails that help the right people find you. YouTube rewards useful, searchable videos that keep working for years.",
      parent: "publishing",
      optional: false,
      resources: [L.ytChannel, L.ytUpload, L.ytCreators],
    },
    {
      slug: "building-an-audience",
      title: "Building an audience and community",
      summary:
        "Choose a clear focus, post on a rhythm you can keep and talk with the people who watch. A small loyal audience is worth more than a big careless one.",
      parent: "publishing",
      optional: false,
      resources: [L.ytStrategy, L.ytGuidelines],
    },
    {
      slug: "reading-your-numbers",
      title: "Reading your numbers",
      summary:
        "Use the free analytics in each app to see which videos people watch, finish and share. Let the numbers guide your next video rather than your mood.",
      parent: "publishing",
      optional: false,
      resources: [L.ytAnalytics, L.ytRetention],
    },
    {
      slug: "working-and-earning",
      title: "Working, rights and earning",
      summary:
        "Turn your skills into paid work honestly and safely. This section covers clients and brands, copyright and permission, realistic ways to earn and a portfolio that gets you hired.",
      parent: null,
      optional: false,
      resources: [L.ytMonetisation],
    },
    {
      slug: "copyright-and-permission",
      title: "Copyright, consent and permission",
      summary:
        "Use only music, footage and images you have the right to use, and ask people before you film and publish them. Getting this right protects you, your clients and the people in your videos.",
      parent: "working-and-earning",
      optional: false,
      resources: [L.ytCopyright, L.ccLicenses, L.dataProtection],
    },
    {
      slug: "working-with-brands",
      title: "Working with clients and brands",
      summary:
        "Read a brief, agree the deliverables and price in writing and deliver on time. Always tell your audience when content is paid for.",
      parent: "working-and-earning",
      optional: false,
      resources: [L.ytBranded, L.metaLearn],
    },
    {
      slug: "earning-routes",
      title: "Honest ways to earn",
      summary:
        "Compare client work, jobs, platform payouts and selling your own services, and what each really takes. Most beginners earn first from local clients long before any platform pays them.",
      parent: "working-and-earning",
      optional: false,
      resources: [L.ytYpp, L.ytYppCountries, L.ytMonetisation],
    },
    {
      slug: "portfolio-and-first-jobs",
      title: "Portfolio and first jobs",
      summary:
        "Collect your best real work into a simple portfolio and show it to employers and clients. Apply for content roles with proof of what you can do, not just a list of apps.",
      parent: "working-and-earning",
      optional: false,
      resources: [L.ytCreators, L.metaLearn],
    },
  ],
};
