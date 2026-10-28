import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Tier B outline (issue #96): topics and free resources only, lessons to follow.
 * Research and sources: src/content/research/software-testing.md.
 * Track specific links not in the shared pool; each checked to resolve (October 2026).
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const istqbCtfl = r(
  "ISTQB: Certified Tester Foundation Level",
  "https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/",
);
const ministryOfTesting = r("Ministry of Testing (community and free articles)", "https://www.ministryoftesting.com/");
const testPyramid = r("Martin Fowler: The practical test pyramid", "https://martinfowler.com/articles/practical-test-pyramid.html");
const mdnTesting = r(
  "MDN: Cross browser testing",
  "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing",
);
const deviceMode = r("Chrome DevTools: Device mode", "https://developer.chrome.com/docs/devtools/device-mode");
const throttling = r("Chrome DevTools: Network throttling", "https://developer.chrome.com/docs/devtools/settings/throttling");
const androidDevOptions = r(
  "Android Developers: Developer options",
  "https://developer.android.com/studio/debug/dev-options",
);
const androidTesting = r("Android Developers: Test your app", "https://developer.android.com/studio/test");
const postman = r("Postman Learning Center", "https://learning.postman.com/docs/getting-started/overview/");
const atlassianAgile = r("Atlassian: Agile guide", "https://www.atlassian.com/agile");
const atlassianScrum = r("Atlassian: What is Scrum", "https://www.atlassian.com/agile/scrum");
const jiraIntro = r(
  "Atlassian: Introduction to Jira",
  "https://www.atlassian.com/software/jira/guides/getting-started/introduction",
);
const selenium = r("Selenium documentation", "https://www.selenium.dev/documentation/");
const ghActions = r("GitHub Docs: GitHub Actions", "https://docs.github.com/en/actions");

export const softwareTesting: RoadmapDraft = {
  slug: "software-tester",
  title: "Software Testing",
  description:
    "Find the bugs before customers do by testing websites and mobile apps, starting with manual testing you can practise on a phone or a computer. We found only a handful of testing openings in Ghana, mostly in Accra, so this track also prepares you for remote work and for moving into automation or development.",
  track: "software-testing",
  field_category: "software",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "testing-basics",
      title: "Understanding software testing",
      summary:
        "Testing is checking that software does what people need and finding where it does not. This section explains the job and the ideas every tester uses.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [],
    },
    {
      slug: "what-testers-do",
      title: "What testers do and where they work",
      summary:
        "Testers plan what to check, run the checks, report bugs and confirm fixes, working alongside developers and product managers. In Ghana we found only a handful of openings, mostly at fintech, agritech and software firms in Accra, so be ready to look at remote roles too.",
      parent: "testing-basics",
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      resources: [ministryOfTesting],
    },
    {
      slug: "testing-principles",
      title: "Testing principles and the development lifecycle",
      summary:
        "Learn why testing early is cheaper, why you can never test everything and how testing fits into each stage of building software. Know the difference between unit, integration, system and acceptance testing so you can follow team conversations.",
      parent: "testing-basics",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [istqbCtfl, testPyramid],
    },
    {
      slug: "manual-testing",
      title: "Manual testing",
      summary:
        "Manual testing is where most testers start, and you can practise much of it on a phone or a computer. This section covers the core craft of designing tests and reporting what you find.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "junior",
      jobs: ["QA Testers", "Manual Tester", "Application Tester"],
      resources: [],
    },
    {
      slug: "test-cases",
      title: "Writing test cases",
      summary:
        "A test case lists the starting state, the steps, the data and the expected result so anyone can repeat it. Practise by writing test cases for a familiar flow such as sending money with a mobile money app or signing up for a website.",
      parent: "manual-testing",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [ministryOfTesting],
    },
    {
      slug: "test-design-techniques",
      title: "Choosing what to test",
      summary:
        "Techniques such as equivalence partitioning, boundary values and decision tables help you find the most bugs with the fewest tests. Try them on a simple form, like an amount field that must accept between one and five thousand cedis.",
      parent: "manual-testing",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [istqbCtfl],
    },
    {
      slug: "exploratory-testing",
      title: "Exploratory testing",
      summary:
        "In exploratory testing you learn the product and design tests as you go, guided by a short mission and a time limit. It suits phone testing well and is often how testers find the most surprising bugs.",
      parent: "manual-testing",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [ministryOfTesting],
    },
    {
      slug: "bug-reports",
      title: "Writing bug reports that get fixed",
      summary:
        "A good bug report has a clear title, exact steps, expected and actual results, the device and version, and a screenshot or screen recording. Developers fix bugs they can reproduce quickly, so clarity is the most valuable skill a new tester can show.",
      parent: "manual-testing",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [jiraIntro],
    },
    {
      slug: "testing-web-and-mobile",
      title: "Testing web and mobile apps",
      summary:
        "Most products you will test are websites, Android apps or the APIs behind them. This section covers the tools and habits for each, with attention to the phones and networks Ghanaian users actually have.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Junior QA Engineer", "Junior QA Tester", "QA Engineer Fellow"],
      resources: [],
    },
    {
      slug: "web-testing",
      title: "Testing websites with browser tools",
      summary:
        "Check that pages work across browsers and screen sizes, and use developer tools to read errors, inspect requests and simulate a slow connection. This part needs a laptop browser, though you can still test page behaviour on your phone.",
      parent: "testing-web-and-mobile",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [mdnTesting, deviceMode, throttling],
    },
    {
      slug: "mobile-testing",
      title: "Testing Android apps on real phones",
      summary:
        "Test on low cost phones with little storage, older Android versions, patchy data and interrupted sessions, because that is how many users here meet an app. Learn to capture screen recordings and device details, and use developer options to reveal problems.",
      parent: "testing-web-and-mobile",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [androidDevOptions, androidTesting],
    },
    {
      slug: "api-testing",
      title: "API testing with Postman",
      summary:
        "Apps talk to servers through APIs, and testing them directly finds bugs that the screen hides, such as a payment confirmed twice. Learn to send requests, check status codes and responses, and save a collection of tests, which needs a laptop.",
      parent: "testing-web-and-mobile",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [postman, RES.mdnHttp],
    },
    {
      slug: "accessibility-and-usability",
      title: "Accessibility and usability checks",
      summary:
        "Check that people with low vision, unsteady hands or older phones can still use the product, and that the flow makes sense to a first time user. Simple checks like text size, contrast and screen reader labels catch problems that functional tests miss.",
      parent: "testing-web-and-mobile",
      optional: true,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.waiEasyChecks],
    },
    {
      slug: "working-in-a-team",
      title: "Working in a product team",
      summary:
        "Testers work inside teams with deadlines, trackers and frequent releases. This section covers how that work is organised and how you report on it.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["QA Engineer", "Quality Assurance Engineer"],
      resources: [],
    },
    {
      slug: "agile-and-issue-trackers",
      title: "Agile teams and issue trackers",
      summary:
        "Most software teams work in short cycles called sprints and track every task and bug in a tool such as Jira. Learn the vocabulary of stories, acceptance criteria and stand ups so you can test against what the team agreed.",
      parent: "working-in-a-team",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [atlassianAgile, atlassianScrum, jiraIntro],
    },
    {
      slug: "test-plans-and-regression",
      title: "Test plans, regression and reporting",
      summary:
        "A test plan says what will be tested, how and when, and a regression suite rechecks old features after every change. Learn to summarise results for a release decision in plain language, including the risks you could not test.",
      parent: "working-in-a-team",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [istqbCtfl, testPyramid],
    },
    {
      slug: "test-automation",
      title: "Test automation",
      summary:
        "Automation lets a computer repeat checks on every change, and many Ghana testing adverts ask for it alongside manual skills. From here on you will need a laptop.",
      parent: null,
      optional: false,
      difficulty: "advanced",
      complexity: 3,
      careerLevel: "mid",
      jobs: ["Software QA / Test Engineer", "QA Engineer"],
      resources: [],
    },
    {
      slug: "programming-for-testers",
      title: "Enough programming to automate",
      summary:
        "Learn one language well enough to write small programs with variables, conditions, loops and functions, choosing JavaScript or Python. You do not need to become a developer first, but you do need to read and change code confidently.",
      parent: "test-automation",
      optional: false,
      difficulty: "advanced",
      complexity: 4,
      resources: [RES.mdnJs, RES.pythonTutorial],
    },
    {
      slug: "ui-automation",
      title: "Browser and app automation",
      summary:
        "Tools such as Playwright and Selenium drive a browser like a person would, clicking buttons and checking results. Automate a few of your manual test cases first, and keep tests short and independent so they stay reliable.",
      parent: "test-automation",
      optional: false,
      difficulty: "advanced",
      complexity: 5,
      resources: [RES.playwright, selenium],
    },
    {
      slug: "tests-in-ci",
      title: "Running tests automatically",
      summary:
        "Connect your automated tests to a pipeline so they run every time someone pushes code. A failing test that stops a bad release is the clearest proof of what automation is worth.",
      parent: "test-automation",
      optional: true,
      difficulty: "advanced",
      complexity: 4,
      resources: [ghActions],
    },
    {
      slug: "getting-hired",
      title: "Getting hired",
      summary:
        "Testing employers look for careful thinking and clear writing more than certificates. This section helps you show both and find a first role.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Junior QA Engineer", "Manual Tester"],
      resources: [],
    },
    {
      slug: "testing-portfolio",
      title: "A testing portfolio",
      summary:
        "Collect a test plan, a set of test cases and three or four strong bug reports from testing a real public website or open source app. Add a small automated test project once you reach that section, all shared on GitHub with a short readme.",
      parent: "getting-hired",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.githubDocs, RES.markdown],
    },
    {
      slug: "certificates-and-first-role",
      title: "Certificates and finding work",
      summary:
        "Some adverts mention the ISTQB Foundation certificate as a plus, and its free syllabus is a useful study outline even if you never sit the exam. Look for QA fellowships, junior tester roles, remote testing work and developer or support roles where testing is part of the job.",
      parent: "getting-hired",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [istqbCtfl, ministryOfTesting],
    },
    {
      slug: "where-testing-leads",
      title: "Where testing leads",
      summary:
        "Testers often grow into automation engineering, software development, product management or release and DevOps work. Knowing the product and its users deeply is useful in every one of those paths.",
      parent: "getting-hired",
      optional: true,
      difficulty: "intermediate",
      complexity: 2,
      resources: [],
    },
  ],
};
