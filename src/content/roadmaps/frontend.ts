import { RES } from "./resources";
import type { RoadmapDraft } from "./types";

export const frontend: RoadmapDraft = {
  slug: "frontend-developer",
  title: "Frontend Developer",
  description:
    "Build fast, usable websites and web apps that work well on the phones Ghanaians actually use. Go from your first HTML page to a portfolio that local businesses and remote teams can trust.",
  track: "frontend",
  field_category: "software",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "start-here",
      title: "Start here: how the web reaches a phone",
      summary:
        "Before writing code, understand what happens when someone in Wa opens a website on their phone. This section also sets up the free tools you will use for the whole roadmap.",
      parent: null,
      optional: false,
      resources: [RES.mdnLearn],
    },
    {
      slug: "how-the-web-works",
      title: "Browsers, servers and the internet",
      summary:
        "Learn how a browser asks a server for a page and how HTML, CSS and JavaScript work together to show it. Knowing this makes every later topic easier to debug.",
      parent: "start-here",
      optional: false,
      resources: [RES.mdnHttp, RES.mdnLearn],
    },
    {
      slug: "setup-on-a-budget",
      title: "A free setup on a modest laptop",
      summary:
        "Install a free code editor and a modern browser, and learn to save data by downloading docs and videos on WiFi. A basic laptop is enough, and you can read lessons on your phone between practice sessions.",
      parent: "start-here",
      optional: false,
      resources: [RES.devtools],
    },
    {
      slug: "git-and-github",
      title: "Git and GitHub",
      summary:
        "Track every change to your code with Git and publish it on GitHub. Employers in Accra and abroad often look at your GitHub before they read your CV.",
      parent: "start-here",
      optional: false,
      resources: [RES.githubDocs, RES.gitBook],
    },
    {
      slug: "html-and-css",
      title: "HTML and CSS",
      summary:
        "HTML gives a page its structure and CSS gives it its look. This section takes you from a plain page to a layout that adapts to any screen.",
      parent: null,
      optional: false,
      resources: [RES.fccLearn],
    },
    {
      slug: "semantic-html",
      title: "Semantic HTML",
      summary:
        "Use the right element for each job, such as headings, lists, buttons and links. Good structure helps screen readers, search engines and the next developer who reads your code.",
      parent: "html-and-css",
      optional: false,
      resources: [RES.webdevHtml, RES.mdnHtml],
    },
    {
      slug: "css-layout",
      title: "CSS layout with flexbox and grid",
      summary:
        "Control spacing, alignment and layout with flexbox and grid. Practise by rebuilding the layout of a simple local business page from a screenshot.",
      parent: "html-and-css",
      optional: false,
      resources: [RES.webdevCss, RES.mdnCss],
    },
    {
      slug: "mobile-first-design",
      title: "Mobile first, responsive pages",
      summary:
        "Design for a small Android screen first, then add rules for larger screens. Many of your users will only ever see your work on a phone, so this is the default, not an extra.",
      parent: "html-and-css",
      optional: false,
      resources: [RES.webdevCss, RES.webdevLearn],
    },
    {
      slug: "forms",
      title: "Forms and input",
      summary:
        "Build sign up, order and contact forms with clear labels, the right keyboard for phone numbers and helpful error messages. Forms are where users give up, so getting them right is a valued skill.",
      parent: "html-and-css",
      optional: false,
      resources: [RES.webdevForms],
    },
    {
      slug: "javascript",
      title: "JavaScript",
      summary:
        "JavaScript makes pages interactive and talks to servers. Take this section slowly and practise a little every day.",
      parent: null,
      optional: false,
      resources: [RES.mdnJs, RES.fccLearn],
    },
    {
      slug: "js-fundamentals",
      title: "JavaScript fundamentals",
      summary:
        "Learn variables, functions, arrays, objects, loops and conditions by solving small problems. Aim to explain your code out loud, because interviewers will ask you to.",
      parent: "javascript",
      optional: false,
      resources: [RES.fccLearn, RES.mdnJs],
    },
    {
      slug: "dom-and-events",
      title: "The DOM and events",
      summary:
        "Change what is on the page when a user taps, types or scrolls. Build a small tool like a market price list that filters as you type.",
      parent: "javascript",
      optional: false,
      resources: [RES.mdnLearn, RES.odin],
    },
    {
      slug: "fetch-and-async",
      title: "Fetching data and async code",
      summary:
        "Load data from an API with fetch, show loading and error states, and handle slow or dropped connections gracefully. On Ghanaian mobile networks, a clear retry button is part of good design.",
      parent: "javascript",
      optional: false,
      resources: [RES.mdnFetch],
    },
    {
      slug: "quality",
      title: "Quality: accessible, fast and debuggable",
      summary:
        "Good frontend work is measured by whether everyone can use it on any connection. This section covers the habits that separate a hobby page from professional work.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "accessibility",
      title: "Accessibility",
      summary:
        "Make pages usable with a keyboard, a screen reader, large text and strong sunlight glare. Accessible pages are also clearer for everyone else.",
      parent: "quality",
      optional: false,
      resources: [RES.webdevA11y, RES.waiFundamentals, RES.waiEasyChecks],
    },
    {
      slug: "performance-low-bandwidth",
      title: "Performance on slow networks and low end phones",
      summary:
        "Shrink images, load less JavaScript and measure with free tools so pages open quickly on 3G and cheap phones. Every megabyte you save is data your users do not have to buy.",
      parent: "quality",
      optional: false,
      resources: [RES.webdevPerf, RES.webdevImages, RES.pagespeed],
    },
    {
      slug: "debugging",
      title: "Debugging with browser DevTools",
      summary:
        "Use DevTools to inspect elements, read console errors and simulate a slow phone connection. Learning to find your own bugs is what makes you independent on a team.",
      parent: "quality",
      optional: false,
      resources: [RES.devtools],
    },
    {
      slug: "frameworks",
      title: "Frameworks and tooling",
      summary:
        "Many frontend job adverts ask for a framework, and React is a common choice. Learn it only after plain JavaScript feels comfortable.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "react",
      title: "React fundamentals",
      summary:
        "Build interfaces from components, manage state and pass data with props. Rebuild one of your earlier projects in React so you can see what it changes.",
      parent: "frameworks",
      optional: false,
      resources: [RES.react],
    },
    {
      slug: "typescript",
      title: "TypeScript basics",
      summary:
        "Add types to your JavaScript so mistakes show up before users see them. Many teams expect it, so learn enough to read and write typed components.",
      parent: "frameworks",
      optional: true,
      resources: [RES.ts],
    },
    {
      slug: "nextjs",
      title: "A full stack framework such as Next.js",
      summary:
        "Learn how a framework handles routing, server rendering and data loading. This is useful for faster first loads on slow networks and for SEO.",
      parent: "frameworks",
      optional: true,
      resources: [RES.nextLearn],
    },
    {
      slug: "real-products",
      title: "Building for real Ghanaian products",
      summary:
        "Apply your skills to the kinds of features local products need. These projects become the strongest pieces in your portfolio.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "payment-flows",
      title: "Mobile money checkout screens",
      summary:
        "Design and build the screens around a mobile money payment: entering a number, waiting for the prompt, and showing success, failure or pending clearly. Never collect a PIN in your own form, because the payment provider handles that step.",
      parent: "real-products",
      optional: false,
      resources: [RES.webdevForms],
    },
    {
      slug: "offline-and-pwa",
      title: "Offline friendly apps",
      summary:
        "Turn a site into an installable app that still shows useful content when the network drops. This suits users who buy small data bundles or travel between towns.",
      parent: "real-products",
      optional: true,
      resources: [RES.webdevPwa, RES.mdnPwa],
    },
    {
      slug: "deploy-free",
      title: "Deploying on free hosting",
      summary:
        "Put your projects online with a free tier host so anyone can open them from a link. A live link on WhatsApp or LinkedIn is far more convincing than screenshots.",
      parent: "real-products",
      optional: false,
      resources: [RES.githubPages, RES.vercel],
    },
    {
      slug: "getting-hired",
      title: "Getting hired and getting paid",
      summary:
        "Turn your skills into income through a job, remote work or freelancing. This section is about showing proof of what you can do.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "portfolio",
      title: "A portfolio employers trust",
      summary:
        "Show three to five real projects with live links, clean code on GitHub and a short note on the problem each one solves. Projects built for a real shop, school or NGO count for more than tutorial clones.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.githubPages, RES.lfResume],
    },
    {
      slug: "freelancing-for-smes",
      title: "Freelancing for local businesses",
      summary:
        "Offer simple websites and landing pages to shops, schools and churches near you, with a clear written scope and price in cedis. Start small, deliver on time and ask for a referral when you finish.",
      parent: "getting-hired",
      optional: true,
      resources: [RES.lfFreelancing],
    },
    {
      slug: "job-search",
      title: "Job search and technical interviews",
      summary:
        "Write a one page CV, keep your LinkedIn and GitHub current, and practise explaining your projects and solving small coding tasks aloud. Apply widely to local companies and remote roles, and treat every rejection as practice.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfJobsearch, RES.lfInterview, RES.lfLinkedin],
    },
  ],
};
