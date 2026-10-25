import type { TrackContent } from "./types";

/**
 * Original lesson content for the Frontend Developer track (issue #84).
 * Written from scratch for SydCrest; sources and coverage are in
 * src/content/research/frontend.md. Nothing here comes from roadmap.sh.
 */
const content: TrackContent = {
  roadmap: "frontend-developer",
  nodes: {
    "start-here": {
      explanation_md: `Every frontend job, whether at a fintech in Accra or a remote startup abroad, starts with the same things: a working setup, a clear picture of how the web reaches a phone, and the habit of saving your work properly. This section gives you all three, using only free tools.

## Your free setup

You do not need an expensive machine. A modest laptop with 4 GB of memory can run everything in this roadmap. You need three things:

* **A code editor.** Visual Studio Code is free and works on Windows, macOS and Linux. Install it once on WiFi.
* **A modern browser.** Chrome or Firefox both have built in developer tools, which you will use every day to inspect pages and find bugs.
* **A folder for projects.** Make one folder called \`projects\` and keep each project in its own subfolder.

No laptop yet? You can still start. Free browser based editors such as CodePen let you write HTML, CSS and JavaScript on a phone, and you can read every lesson here on your phone between practice sessions.

## Saving data while you learn

Data bundles cost money, so plan around them:

* Download documentation and long videos when you have WiFi, for example at a library, a hub or a school.
* In your browser, save important pages for offline reading.
* Turn off automatic updates on mobile data.

## What this section covers

* **How the web works:** what happens between tapping a link in Wa and seeing a page, and why that journey shapes everything you build.
* **Git and GitHub:** how to track every change and publish your code where employers can see it.

## A worked example

Mariama in Bolgatanga has an old laptop and a phone. On Saturday at the community library she installs VS Code and Chrome, downloads the MDN pages she needs, and creates her \`projects\` folder. During the week she reads lessons on her phone and practises on the laptop at home without using data. By the end of the month she has three small pages saved in Git.

That routine, more than any expensive tool, is what gets people job ready. Set yours up today and keep it simple.`,
      practice_task_md: `**Goal:** a working setup and a study plan that fits your data budget.

1. Install a code editor (VS Code) and a modern browser (Chrome or Firefox) while on WiFi. If you only have a phone, open a free browser editor such as CodePen instead.
2. Create a folder called \`projects\`, and inside it a folder called \`hello\`.
3. In \`hello\`, create a file called \`index.html\` containing one line: \`<h1>Hello from Tamale</h1>\` (use your own town).
4. Open the file in your browser.
5. Write a short weekly plan in a note: which days you study, where you get WiFi, and what you will download in advance.

**Done looks like:** your page opens in the browser, and you have a written plan you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What is the minimum you need to start this roadmap?",
            options: ["A new high end laptop and a paid editor", "A free code editor and a modern browser, or a browser editor on a phone", "A paid hosting account", "A computer science degree"],
            answer_index: 1,
            explanation: "The lesson explains that free tools on a modest laptop, or a browser editor on a phone, are enough to start.",
          },
          {
            prompt: "Why should you download documentation and long videos on WiFi?",
            options: ["Because they only work offline", "Because mobile data costs money and WiFi saves your bundle", "Because browsers block them on mobile data", "Because employers require it"],
            answer_index: 1,
            explanation: "Planning downloads around WiFi saves your prepaid data for practice.",
          },
          {
            prompt: "What are browser developer tools used for, according to the lesson?",
            options: ["Paying for hosting", "Inspecting pages and finding bugs", "Writing emails", "Installing a code editor"],
            answer_index: 1,
            explanation: "Chrome and Firefox include developer tools for inspecting pages and finding bugs.",
          },
          {
            prompt: "Which two topics sit inside this Start here section?",
            options: ["React and TypeScript", "Forms and payments", "How the web works, and Git and GitHub", "Portfolios and interviews"],
            answer_index: 2,
            explanation: "The section covers how the web works and Git and GitHub.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "how-the-web-works": {
      explanation_md: `When an interviewer in Accra asks "what happens when you open a website?", they are checking whether you understand the system you will work in. Knowing this also makes debugging much easier, because you can tell whether a problem is in your code, the network or the server.

## The journey of a page

Imagine Fuseini in Wa taps a link to a shop's website.

1. **The address.** The browser looks up the domain name, such as \`shop.example.com\`, using DNS. DNS works like a phone book: it turns the name into the server's numeric address.
2. **The request.** The browser sends an HTTP request to that server, saying "please give me this page". Almost every site today uses HTTPS, which encrypts the conversation so no one in between can read or change it.
3. **The response.** The server sends back a response with a status code (200 means OK, 404 means not found, 500 means the server failed) and the HTML of the page.
4. **More requests.** The HTML mentions other files: CSS, JavaScript, images and fonts. The browser requests each of them too.
5. **Rendering.** The browser reads the HTML to build the page structure, applies the CSS to style it, and runs the JavaScript to make it interactive.

Every one of those requests travels over Fuseini's mobile network. On a slow or busy connection, each extra file adds waiting time, and each extra kilobyte uses his data.

## The three languages

* **HTML** is the structure: headings, paragraphs, buttons, forms.
* **CSS** is the presentation: colours, spacing, layout.
* **JavaScript** is the behaviour: what happens when someone taps, types or loads data.

A small example. This HTML asks for one stylesheet and one script:

\`\`\`html
<link rel="stylesheet" href="style.css">
<h1>Sumaila's Phone Repairs</h1>
<script src="app.js" defer></script>
\`\`\`

That is three requests: the page, \`style.css\` and \`app.js\`. The \`defer\` word tells the browser to download the script without stopping the page from showing.

## Why this matters for your work

Because you now know every file is a separate trip over the network, you will naturally build pages with fewer, smaller files. That single habit makes your work feel fast on the phones your users actually carry, and it is the base for the performance lesson later.`,
      practice_task_md: `**Goal:** watch a real page load and explain it in your own words.

1. On a laptop, open any simple website in Chrome or Firefox.
2. Open developer tools (F12 or right click, then Inspect) and choose the **Network** tab.
3. Reload the page. Look at the list of requests.
4. Write down: how many requests there were, the status code of the first one, and the largest file by size.
5. Write five sentences explaining the journey from typing the address to seeing the page, as if to a friend.

No laptop? Write the five sentences from the lesson and draw the journey on paper.

**Done looks like:** a short note with the numbers you found and your five sentence explanation.`,
      quiz: {
        questions: [
          {
            prompt: "What does DNS do when you type a domain name?",
            options: ["It styles the page", "It turns the name into the server's numeric address", "It encrypts your password", "It runs the JavaScript"],
            answer_index: 1,
            explanation: "DNS works like a phone book, turning a name into an address.",
          },
          {
            prompt: "What does an HTTP status code of 404 mean?",
            options: ["Everything is OK", "The server failed", "The page was not found", "The page is encrypted"],
            answer_index: 2,
            explanation: "The lesson lists 404 as not found, 200 as OK and 500 as a server failure.",
          },
          {
            prompt: "Which language controls what happens when a user taps a button?",
            options: ["HTML", "CSS", "JavaScript", "DNS"],
            answer_index: 2,
            explanation: "JavaScript is the behaviour layer of a page.",
          },
          {
            prompt: "Why does each extra file matter on a slow mobile network?",
            options: ["Files are free on mobile networks", "Each file is a separate request that adds waiting time and uses data", "Browsers refuse pages with many files", "Extra files make HTTPS stop working"],
            answer_index: 1,
            explanation: "Every file is another trip over the network, which costs time and data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "git-and-github": {
      explanation_md: `Many job adverts we studied, from Accra fintechs to remote startups, list Git. Teams use it every day, and hiring managers often open your GitHub profile before your CV. Learning Git early means every project you build from now on becomes visible proof of your skills.

## What Git is

Git is a free tool that records snapshots of your project over time. Each snapshot is called a **commit**, and it stores what changed and a short message about why. If you break something, you can go back. If two people work on the same project, Git helps combine their changes.

**GitHub** is a website that stores Git projects online. It is where you publish code, collaborate and show employers what you can do.

## The everyday commands

You will use a small handful of commands most of the time:

\`\`\`bash
git init            # start tracking a folder
git status          # see what changed
git add index.html  # stage a file
git commit -m "Add menu prices"
git push            # send commits to GitHub
\`\`\`

The flow is: change files, **add** the ones you want to save, **commit** with a clear message, then **push** to GitHub.

## Branches and pull requests

A **branch** is a separate line of work. Teams create a branch for each feature, for example \`add-momo-checkout\`, so the main version stays working. When the feature is ready, they open a **pull request** on GitHub. A teammate reviews the changes, comments, and then merges them. Several adverts mention pull requests and code review, so practise this even when working alone.

## A worked example

Hawa is building a menu page for her aunt's chop bar in Tamale.

1. She runs \`git init\` in her project folder.
2. She writes the menu and commits with the message "Add waakye and jollof prices".
3. She creates a branch called \`add-photos\`, adds images, and commits.
4. On GitHub she opens a pull request from \`add-photos\` into \`main\`, reads her own changes carefully, then merges.

Her GitHub now shows a clean history. Anyone can see how she works.

## Good habits

* Commit small changes often, with messages that say what changed.
* Never commit passwords or secret keys.
* Write a short README for each project explaining what it does and how to open it.

Git can feel strange for a week. Keep using it and it becomes automatic.`,
      practice_task_md: `**Goal:** your first project on GitHub with a real history.

1. Create a free GitHub account.
2. Install Git (on WiFi), or use GitHub's web editor if you only have a phone.
3. In your \`hello\` project, run \`git init\`, then add and commit your \`index.html\` with a clear message.
4. Create a new repository on GitHub and follow its instructions to push your project.
5. Make a branch, change the heading, commit, push the branch, and open a pull request. Merge it yourself.
6. Add a README with two sentences about the project.

**Done looks like:** a public GitHub repository with at least three commits, one merged pull request and a README.`,
      quiz: {
        questions: [
          {
            prompt: "What is a commit in Git?",
            options: ["A website that hosts code", "A saved snapshot of changes with a message", "A paid GitHub feature", "A type of CSS rule"],
            answer_index: 1,
            explanation: "A commit records what changed and why.",
          },
          {
            prompt: "What is the usual order of everyday Git steps?",
            options: ["push, commit, add", "commit, add, push", "add, commit, push", "push, add, commit"],
            answer_index: 2,
            explanation: "You add changed files, commit them with a message, then push to GitHub.",
          },
          {
            prompt: "Why do teams create a branch for each feature?",
            options: ["To keep the main version working while the feature is built", "To delete old code", "To make the site load faster", "Because GitHub charges per branch"],
            answer_index: 0,
            explanation: "A branch is a separate line of work, so main stays stable.",
          },
          {
            prompt: "Which of these should you never commit?",
            options: ["A README", "Your HTML file", "A password or secret key", "A clear commit message"],
            answer_index: 2,
            explanation: "Secrets in a repository can be read by anyone with access.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "html-and-css": {
      explanation_md: `Frontend job adverts expect you to be comfortable with HTML and CSS, even when they only name a framework such as React. Frameworks still produce HTML and CSS in the end, so this is the foundation everything else stands on.

## Two jobs, two languages

**HTML** describes what things are: this is a heading, this is a list of prices, this is a button. **CSS** describes how they look: this heading is green, these prices sit in two columns, this button has rounded corners.

Keeping these jobs separate matters. When the structure is right, a screen reader can announce it, search engines can understand it, and you can restyle the whole site by changing only the CSS.

\`\`\`html
<h1>Amina's Shea Butter</h1>
<p class="price">GH₵ 25 per tub</p>
\`\`\`

\`\`\`css
.price { color: #1b5e20; font-weight: bold; }
\`\`\`

The HTML says "heading" and "paragraph". The CSS says "make the price green and bold".

## What this section covers

* **Semantic HTML:** choosing the right element for each job, so your pages are accessible and easy to maintain.
* **CSS layout:** placing things on the page with flexbox and grid, the two modern layout tools.
* **Mobile first, responsive pages:** designing for a small Android screen first and then adapting for bigger ones.
* **Forms and input:** building sign up, order and payment forms that people can actually complete on a phone.

## How to learn this section well

Build real things. Pick businesses you know: a chop bar menu, a tailor's price list, a church events page, a phone repair shop in Damongo. Rebuilding something real teaches you more than following a tutorial, and it gives you portfolio pieces.

Check your work on a phone often. Many of your users will only ever see your pages on a small screen, sometimes in bright sunlight, on a slow connection.

## A worked example

Abdul-Rahman wants to practise. He photographs the price board at his uncle's provisions shop, then builds a page with a heading, a short description and a list of items with prices. First he writes only HTML and checks it makes sense with no styling at all. Then he adds CSS for colours and spacing. Finally he opens it on his phone and fixes anything that looks cramped.

Structure first, then style, then test on a phone. Follow that order for every page you build.`,
      practice_task_md: `**Goal:** a simple, real business page using only HTML and CSS.

1. Choose a business you know, such as a chop bar, tailor or provisions shop.
2. Write the HTML first: a heading, a short paragraph about the business, and a list of at least five items with prices in cedis.
3. Open it in the browser with no CSS. It should still make sense.
4. Add a CSS file to set a font, colours and spacing.
5. Open the page on a phone (send the file to yourself or use CodePen) and fix anything hard to read.

**Done looks like:** a page that reads clearly without CSS, looks tidy with CSS, and is easy to read on a phone. Commit it to GitHub.`,
      quiz: {
        questions: [
          {
            prompt: "What is the job of HTML?",
            options: ["To describe how things look", "To describe what things are", "To store data on a server", "To send payments"],
            answer_index: 1,
            explanation: "HTML gives content its structure and meaning.",
          },
          {
            prompt: "Why keep structure (HTML) and style (CSS) separate?",
            options: ["So screen readers and search engines understand the page, and you can restyle by changing CSS", "Because browsers cannot read both in one file", "Because CSS runs on the server", "So the page uses more data"],
            answer_index: 0,
            explanation: "Separation keeps pages accessible, understandable and easy to restyle.",
          },
          {
            prompt: "Which order does the lesson recommend for building a page?",
            options: ["Style first, then structure, then test", "Test first, then style", "Structure first, then style, then test on a phone", "Framework first, then HTML"],
            answer_index: 2,
            explanation: "Write HTML first, add CSS, then check on a phone.",
          },
          {
            prompt: "Why do frameworks such as React not replace learning HTML and CSS?",
            options: ["Frameworks are only for backend work", "Frameworks still produce HTML and CSS in the end", "Frameworks do not work on phones", "Employers have stopped using frameworks"],
            answer_index: 1,
            explanation: "Whatever framework you use, the browser still receives HTML and CSS.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "semantic-html": {
      explanation_md: `Semantic HTML means using the element that matches the meaning of the content. It sounds small, but it decides whether a blind user can navigate your page, whether search engines understand it, and whether the next developer can read your code. Interviewers notice it quickly.

## Meaningful elements

Compare these two snippets:

\`\`\`html
<div class="btn" onclick="order()">Order</div>
\`\`\`

\`\`\`html
<button type="button" onclick="order()">Order</button>
\`\`\`

Both look like a button once styled. But only the second one is a real button. It can be reached with the Tab key, pressed with Enter or Space, and a screen reader announces it as "Order, button". The \`div\` version does none of this unless you add a lot of extra code.

Useful elements to know:

* \`header\`, \`nav\`, \`main\`, \`footer\`: the big regions of a page.
* \`h1\` to \`h6\`: headings in order. One \`h1\` per page, then \`h2\` for sections, \`h3\` inside those.
* \`ul\`, \`ol\`, \`li\`: lists, such as a menu or steps.
* \`a\`: a link that goes somewhere. \`button\`: an action on this page.
* \`img\` with an \`alt\` attribute: a picture plus a text description.
* \`table\`: real tabular data, such as a price list with columns.

## Headings are a map

Screen reader users often jump from heading to heading to find what they need. If you pick heading levels just for their size, the map breaks. Choose the level for its meaning, then use CSS to change the size.

## Alt text

Every meaningful image needs \`alt\` text that says what the image shows in context, for example \`alt="Bowl of tuo zaafi with green soup"\`. Purely decorative images get an empty \`alt=""\` so screen readers skip them. Alt text also shows when an image fails to load on a weak connection.

## A worked example

Issahaku builds a page for a Tamale school's sports day:

\`\`\`html
<header><h1>Sports Day 2026</h1></header>
<main>
  <h2>Events</h2>
  <ol><li>100 metres</li><li>Relay</li></ol>
</main>
\`\`\`

The structure alone tells a screen reader, a search engine and a teammate exactly what the page contains. Search engines use this structure too, which helps small businesses get found.

When in doubt, ask: "what is this content?" Then pick the element that says so.`,
      practice_task_md: `**Goal:** turn a messy page into a semantic one.

1. Take the business page from the previous lesson.
2. Wrap it in \`header\`, \`main\` and \`footer\`. Add a \`nav\` with two links if it makes sense.
3. Check your headings: one \`h1\`, then \`h2\` for sections, in order.
4. Replace any clickable \`div\` with a real \`button\` or \`a\`.
5. Add meaningful \`alt\` text to every image, or \`alt=""\` if decorative.
6. Paste your page into the free W3C validator at validator.w3.org and fix any errors.

**Done looks like:** a page with no validator errors, a clear heading outline and no clickable divs. Commit it with the message "Make page semantic".`,
      quiz: {
        questions: [
          {
            prompt: "Why is a `button` element better than a clickable `div` for an action?",
            options: ["It downloads faster", "It works with the keyboard and screen readers without extra code", "It is the only element CSS can style", "Search engines ignore divs completely"],
            answer_index: 1,
            explanation: "A real button can be focused, pressed with Enter or Space, and is announced as a button.",
          },
          {
            prompt: "How should you choose a heading level?",
            options: ["By the text size you want", "By the meaning and order of the content, then use CSS for size", "Always use h1 for every heading", "Randomly, since browsers ignore headings"],
            answer_index: 1,
            explanation: "Headings form a map; CSS handles size.",
          },
          {
            prompt: "What alt text should a purely decorative image have?",
            options: ["A long description", "The file name", "An empty alt attribute", "The word image"],
            answer_index: 2,
            explanation: "Empty alt text tells screen readers to skip decorative images.",
          },
          {
            prompt: "When should you use an `a` element instead of a `button`?",
            options: ["When the user goes somewhere else", "When the user submits a form", "When the user opens a menu on the same page", "Never, buttons are always better"],
            answer_index: 0,
            explanation: "Links go somewhere; buttons perform an action on the current page.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
