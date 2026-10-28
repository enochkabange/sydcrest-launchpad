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
      explanation_md: `Every frontend job, whether at a fintech in Accra or a remote startup abroad, starts with the same things: a working setup, a clear picture of how the web reaches your users' phones and laptops, and the habit of saving your work properly. This section gives you all three, using only free tools.

## Your free setup

You do not need an expensive machine. A modest laptop with 4 GB of memory is enough for most of this roadmap. You need three things:

* **A code editor.** A free code editor such as Visual Studio Code (VS Code), which works on Windows, macOS and Linux. Install it once on WiFi.
* **A modern browser.** Browsers such as Chrome or Firefox have built in developer tools, which you will use every day to inspect pages and find bugs.
* **A folder for projects.** Make one folder called \`projects\` and keep each project in its own subfolder.

No laptop yet? You can still start. Free browser based editors such as CodePen let you write HTML, CSS and JavaScript on a phone, and you can read every lesson here on any device between practice sessions.

## Saving data while you learn

Data bundles cost money, so plan around them:

* Download documentation and long videos when you have WiFi, for example at a library, a hub or a school.
* In your browser, save important pages for offline reading.
* Turn off automatic updates on mobile data.

## What this section covers

* **How the web works:** what happens between tapping a link in Wa and seeing a page, and why that journey shapes everything you build.
* **Git and GitHub:** how to track every change and publish your code where employers can see it.

## A worked example

Mariama in Bolgatanga has an old laptop and a phone. On Saturday at the community library she installs a free code editor and a modern browser, downloads the MDN pages she needs, and creates her \`projects\` folder. During the week she reads lessons on her phone and practises on the laptop at home without using data. By the end of the month she has three small pages saved in Git.

That routine, more than any expensive tool, is what gets people job ready. Set yours up today and keep it simple.`,
      practice_task_md: `**Goal:** a working setup and a study plan that fits your data budget.

1. Install a free code editor (for example VS Code) and a modern browser (for example Chrome or Firefox) while on WiFi. If you only have a phone, open a free browser editor such as CodePen instead.
2. Create a folder called \`projects\`, and inside it a folder called \`hello\`.
3. In \`hello\`, create a file called \`index.html\` containing one line: \`<h1>Hello from Tamale</h1>\` (use your own town).
4. Open the file in your browser.
5. Write a short weekly plan in a note: which days you study, where you get WiFi, and what you will download in advance.

**Done looks like:** your page opens in the browser, and you have a written plan you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What is the minimum you need to start this roadmap?",
            options: ["A free code editor and a browser, or a browser editor on a phone", "A new high end laptop and a paid editor with a yearly licence", "A paid hosting account and a registered domain name for your site", "A computer science degree"],
            answer_index: 0,
            explanation: "The lesson explains that free tools on a modest laptop, or a browser editor on a phone, are enough to start.",
          },
          {
            prompt: "Why should you download documentation and long videos on WiFi?",
            options: ["Because they only work offline", "Because mobile data costs money and WiFi saves your bundle", "Because browsers block large downloads whenever you use mobile data", "Because employers require it"],
            answer_index: 1,
            explanation: "Planning downloads around WiFi saves your prepaid data for practice.",
          },
          {
            prompt: "What are browser developer tools used for, according to the lesson?",
            options: ["Inspecting pages and finding bugs", "Paying for hosting", "Writing emails", "Installing a code editor"],
            answer_index: 0,
            explanation: "Modern browsers such as Chrome and Firefox include developer tools for inspecting pages and finding bugs.",
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
            options: ["It styles the page", "It encrypts your password before it leaves the phone", "It downloads and runs the page's JavaScript", "It turns the name into the server's numeric address"],
            answer_index: 3,
            explanation: "DNS works like a phone book, turning a name into an address.",
          },
          {
            prompt: "What does an HTTP status code of 404 mean?",
            options: ["Everything is OK", "The server failed", "The page is encrypted", "The page was not found"],
            answer_index: 3,
            explanation: "The lesson lists 404 as not found, 200 as OK and 500 as a server failure.",
          },
          {
            prompt: "Which language controls what happens when a user taps a button?",
            options: ["HTML", "CSS", "DNS", "JavaScript"],
            answer_index: 3,
            explanation: "JavaScript is the behaviour layer of a page.",
          },
          {
            prompt: "Why does each extra file matter on a slow mobile network?",
            options: ["Files are free on mobile networks", "Each file is a separate request that costs time and data", "Browsers refuse to open pages made of more than twenty files", "Extra files make HTTPS stop working"],
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
            options: ["A saved snapshot of changes with a message", "A website that hosts code", "A paid GitHub feature", "A type of CSS rule"],
            answer_index: 0,
            explanation: "A commit records what changed and why.",
          },
          {
            prompt: "What is the usual order of everyday Git steps?",
            options: ["push, commit, add", "commit, add, push", "push, add, commit", "add, commit, push"],
            answer_index: 3,
            explanation: "You add changed files, commit them with a message, then push to GitHub.",
          },
          {
            prompt: "Why do teams create a branch for each feature?",
            options: ["So main keeps working while the feature is built", "To delete old code", "To make the live site load faster for visitors on phones", "Because GitHub charges per branch"],
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
* **Forms and input:** building sign up, order and payment forms that people can actually complete on a phone or a computer.

## How to learn this section well

Build real things. Pick businesses you know: a chop bar menu, a tailor's price list, a church events page, a phone repair shop in Damongo. Rebuilding something real teaches you more than following a tutorial, and it gives you portfolio pieces.

Check your work on a phone and on a laptop often. Many of your users will only ever see your pages on a small screen, sometimes in bright sunlight, on a slow connection.

## A worked example

Abdul-Rahman wants to practise. He photographs the price board at his uncle's provisions shop, then builds a page with a heading, a short description and a list of items with prices. First he writes only HTML and checks it makes sense with no styling at all. Then he adds CSS for colours and spacing. Finally he opens it on his phone and on a laptop and fixes anything that looks cramped or stretched.

Structure first, then style, then test on a phone and a computer. Follow that order for every page you build.`,
      practice_task_md: `**Goal:** a simple, real business page using only HTML and CSS.

1. Choose a business you know, such as a chop bar, tailor or provisions shop.
2. Write the HTML first: a heading, a short paragraph about the business, and a list of at least five items with prices in cedis.
3. Open it in the browser with no CSS. It should still make sense.
4. Add a CSS file to set a font, colours and spacing.
5. Open the page on a phone (send the file to yourself or use CodePen) and in a wide browser window on a computer, and fix anything hard to read.

**Done looks like:** a page that reads clearly without CSS, looks tidy with CSS, and is easy to read on a phone and a computer. Commit it to GitHub.`,
      quiz: {
        questions: [
          {
            prompt: "What is the job of HTML?",
            options: ["To describe what things are", "To describe how things look", "To store data on a server", "To send payments"],
            answer_index: 0,
            explanation: "HTML gives content its structure and meaning.",
          },
          {
            prompt: "Why keep structure (HTML) and style (CSS) separate?",
            options: ["Because browsers cannot read both in one file", "Screen readers and search engines understand it, and you can restyle with CSS alone", "Because CSS is processed on the server and HTML on the phone, so mixing them breaks the page", "So the page uses more data"],
            answer_index: 1,
            explanation: "Separation keeps pages accessible, understandable and easy to restyle.",
          },
          {
            prompt: "Which order does the lesson recommend for building a page?",
            options: ["Style first so it looks right, then add structure, then test", "Test first, then style", "Framework first, then HTML", "Structure, then style, then test on a phone and a computer"],
            answer_index: 3,
            explanation: "Write HTML first, add CSS, then check on a phone and a computer.",
          },
          {
            prompt: "Why do frameworks such as React not replace learning HTML and CSS?",
            options: ["Frameworks only run on the server, so phones never see them", "Frameworks do not work on phones", "Frameworks still produce HTML and CSS in the end", "Employers have stopped using frameworks"],
            answer_index: 2,
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
            options: ["It downloads faster", "It is the only element CSS can style", "It works with the keyboard and screen readers without extra code", "Search engines rank pages with buttons higher than pages with divs"],
            answer_index: 2,
            explanation: "A real button can be focused, pressed with Enter or Space, and is announced as a button.",
          },
          {
            prompt: "How should you choose a heading level?",
            options: ["By the text size you want, since that is what heading levels set", "Use h1 for every heading so each one looks equally important", "Randomly, since browsers ignore headings", "By the meaning and order of the content, then use CSS for size"],
            answer_index: 3,
            explanation: "Headings form a map; CSS handles size.",
          },
          {
            prompt: "What alt text should a purely decorative image have?",
            options: ["A long description", "An empty alt attribute", "The file name", "The word image"],
            answer_index: 1,
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
    "css-layout": {
      explanation_md: `Rebuilding a layout from a design or screenshot is one of the most common tasks a junior frontend developer gets. Modern CSS gives you two tools that handle almost every layout: **flexbox** and **grid**. Learn them well and you will rarely fight the page again.

## The box model first

Every element is a box made of content, padding (space inside the border), a border, and margin (space outside). Add this rule at the top of every stylesheet so widths behave predictably:

\`\`\`css
*, *::before, *::after { box-sizing: border-box; }
\`\`\`

With \`border-box\`, padding and border are included in an element's width, so a box set to 100% wide never overflows the screen.

## Flexbox: one direction

Flexbox arranges items in a single row or column. It is ideal for navigation bars, a row of buttons, or a card with an image beside text.

\`\`\`css
.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}
\`\`\`

* \`gap\` sets the space between items.
* \`align-items\` lines items up across the row (top, centre, bottom).
* \`justify-content\` spreads items along the row.
* \`flex-wrap: wrap\` lets items move to a new line when space runs out, which is very useful on narrow phones.

## Grid: two directions

Grid arranges items in rows and columns at the same time. It suits a gallery of products or a page with a sidebar.

\`\`\`css
.products {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
\`\`\`

That one rule says: make as many columns as fit, each at least 150 pixels wide, sharing leftover space equally. On a small phone you get one or two columns; on a laptop, four or five. No extra code needed.

## Choosing between them

A simple rule: if you are lining things up in one direction, use flexbox. If you need rows and columns together, use grid. You will often use both: grid for the page, flexbox inside each card.

## A worked example

Wumpini is rebuilding the product page of a fabric seller in Tamale. She uses grid for the list of fabrics so it adapts to any screen. Inside each fabric card she uses flexbox with \`flex-direction: column\` to stack the photo, name and price, and pushes the "Order on WhatsApp" link to the bottom with \`margin-top: auto\`. Her page looks right on her phone and her laptop without a single fixed width.

Avoid fixed pixel widths for big containers. Let flexbox and grid do the work.`,
      practice_task_md: `**Goal:** rebuild a real layout with flexbox and grid.

1. Take a screenshot of a simple page you like, such as a shop's product list or a school notice board.
2. Build the top bar with flexbox: a name on the left, two links on the right.
3. Build a product or notice list with grid using \`repeat(auto-fill, minmax(150px, 1fr))\`.
4. Inside each card, use flexbox in a column to stack an image, a title and a price.
5. Resize your browser from narrow to wide (or open on a phone) and check nothing overflows.

**Done looks like:** a layout that changes column count on its own as the screen grows, with no horizontal scrolling on a phone. Commit it and add a screenshot to your README.`,
      quiz: {
        questions: [
          {
            prompt: "When should you reach for flexbox rather than grid?",
            options: ["When you need rows and columns that line up with each other", "When you want to store data", "Only for printing pages", "When you are lining things up in one direction"],
            answer_index: 3,
            explanation: "Flexbox handles one direction; grid handles two.",
          },
          {
            prompt: "What does `box-sizing: border-box` do?",
            options: ["Removes all borders", "Makes boxes round", "Adds the border outside the width so boxes grow bigger", "Includes padding and border in the element's width"],
            answer_index: 3,
            explanation: "With border-box, widths include padding and border, so boxes do not overflow.",
          },
          {
            prompt: "What does `repeat(auto-fill, minmax(150px, 1fr))` achieve in a grid?",
            options: ["As many columns as fit, each at least 150 pixels wide", "Exactly three columns on every screen, each 150 pixels wide", "One column only", "Columns exactly 1 pixel wide"],
            answer_index: 0,
            explanation: "The grid adds or removes columns depending on the space available.",
          },
          {
            prompt: "Which flexbox property sets the space between items?",
            options: ["border", "padding", "flex-wrap", "gap"],
            answer_index: 3,
            explanation: "The gap property controls spacing between flex or grid items.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "mobile-first-design": {
      explanation_md: `Many of your users are on Android phones, often with small screens and mobile data, and many others are on laptops and desktops. Responsive design appears in junior frontend adverts and in skills frameworks, and for SydCrest learners it is the default way to work, not an extra.

## What mobile first means

Mobile first means you write your base CSS for a small screen, then add rules for larger screens using media queries. The opposite approach, designing for a laptop and squeezing it down later, usually leaves phones with cramped, broken pages.

\`\`\`css
.menu { display: grid; gap: 12px; }

@media (min-width: 700px) {
  .menu { grid-template-columns: 1fr 1fr; }
}
\`\`\`

On a phone the menu is a single column. When the screen is at least 700 pixels wide, it becomes two columns. Choose breakpoints where your design starts to look awkward, not based on particular phone models.

## The viewport tag

Without this line in your HTML \`head\`, phones pretend to be wide desktop screens and shrink your page to tiny text:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`

Always include it.

## Phone friendly details

* **Readable text.** Use a base font size of at least 16 pixels and good line spacing.
* **Tap targets.** Buttons and links need enough size and space to tap with a thumb. WCAG 2.2 asks for at least 24 by 24 CSS pixels in most cases, and its stricter level asks for 44 by 44.
* **Flexible images.** Add \`img { max-width: 100%; height: auto; }\` so pictures never overflow.
* **Relative units.** Prefer \`rem\`, \`%\` and \`fr\` over fixed pixel widths for containers.
* **Sunlight and glare.** Strong contrast between text and background helps people reading outdoors at a market.

## A worked example

Sumaila is building a page listing bus times from Tamale to Kumasi. He starts with a narrow browser window. Each departure is a card stacked vertically with large, clear times. He adds the viewport tag and checks it on his own phone. Only then does he add a media query so that on a laptop the cards sit in a table like layout with three columns. The phone version stays the priority because that is where most of his users are, but he still checks that the laptop layout uses the extra space well.

## Test on real devices

Browser developer tools have a device mode for simulating phone sizes, which is useful. But nothing beats opening the page on an actual low cost Android phone. Borrow one if you can, and test with the screen brightness turned up outside. Then check a full width window on a laptop or desktop too, because a page that only looks right on phones is not finished.`,
      practice_task_md: `**Goal:** a page that is designed for phones first.

1. Make a page listing at least six items, for example bus departures, church events or market prices.
2. Add the viewport meta tag.
3. Write CSS for a narrow screen first: one column, 16 pixel text, large tap targets.
4. Add one media query at a width where the layout starts to look stretched, and change to two or three columns.
5. Add \`img { max-width: 100%; height: auto; }\` and include at least one image.
6. Test in device mode, on a real phone and in a full width window on a computer.

**Done looks like:** no horizontal scrolling on a phone, comfortable tap targets, and a layout that improves on wider screens. Commit and note in your README which breakpoint you chose and why.`,
      quiz: {
        questions: [
          {
            prompt: "What does mobile first mean in CSS?",
            options: ["Building a native Android app", "Hiding the page on laptops", "Designing for laptops first, then using media queries to shrink it for phones", "Base styles for small screens first, then media queries for larger ones"],
            answer_index: 3,
            explanation: "Mobile first starts with the small screen and adds rules as space grows.",
          },
          {
            prompt: "What happens if you leave out the viewport meta tag?",
            options: ["The page loads faster", "Images stop loading", "Phones show the page as if on a wide screen, making text tiny", "The browser blocks the page because it cannot tell it is on a phone"],
            answer_index: 2,
            explanation: "Without it, phones pretend to be desktop width and shrink the page.",
          },
          {
            prompt: "How should you choose breakpoints?",
            options: ["Based on one popular phone model", "Always at exactly 1000 pixels", "Breakpoints are not needed", "Where your design starts to look awkward"],
            answer_index: 3,
            explanation: "Breakpoints should follow your content, not specific devices.",
          },
          {
            prompt: "Which rule stops images from overflowing a small screen?",
            options: ["img { min-width: 100%; height: auto; }", "img { max-width: 100%; height: auto; }", "img { display: none; }", "img { position: absolute; }"],
            answer_index: 1,
            explanation: "max-width 100% keeps images inside their container while keeping their shape.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "forms": {
      explanation_md: `Forms are where users sign up, place orders and pay. They are also where users give up. A form that is easy to complete on a cheap phone, with a weak connection, is valuable work, and fintech and ecommerce teams in Ghana build them constantly.

## The basics: label every field

Every input needs a visible label linked to it:

\`\`\`html
<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel"
       autocomplete="tel" required>
\`\`\`

The \`for\` and \`id\` match, so tapping the label focuses the field, and screen readers announce "Phone number". Never rely on placeholder text as the only label; it disappears as soon as someone types.

## The right keyboard

On phones, the input \`type\` decides which keyboard appears:

* \`type="tel"\` shows a number pad for phone numbers.
* \`type="email"\` adds the @ key.
* \`inputmode="numeric"\` gives digits for things like a quantity or an amount in cedis, without the quirks of \`type="number"\`.

The \`autocomplete\` attribute lets the phone fill in saved details, which saves typing.

## Built in validation

HTML can check input before anything is sent:

* \`required\` means the field cannot be empty.
* \`minlength\` and \`maxlength\` limit length.
* \`pattern\` checks a format, for example ten digits for a Ghanaian phone number: \`pattern="0[0-9]{9}"\`.

Browser validation is a first line of help, not security. The server must always check data again.

## Helpful errors

When something is wrong, say what and how to fix it, next to the field: "Enter a 10 digit number starting with 0", not just "Invalid". Keep what the user already typed. Do not clear the whole form.

## Group and simplify

* Ask only for what you need. Every extra field is another chance to give up.
* Use \`fieldset\` and \`legend\` to group related options, such as choosing a delivery area.
* Use native \`select\` for choosing from a list; it works well on every phone.
* Make the submit button clearly say what it does: "Place order", not "Submit".

## A worked example

Hawa builds an order form for a shea butter cooperative. It asks for name, phone number and quantity only. The phone field uses \`type="tel"\` with a pattern. The quantity field uses \`inputmode="numeric"\`. When a number is too short, a message appears under the field explaining the format, and nothing else is lost. On her test phone the right keyboard appears for each field. That is a form people will finish.`,
      practice_task_md: `**Goal:** a short, phone friendly order form.

1. Build a form for a real kind of business: name, phone number, delivery area and quantity.
2. Give every field a visible \`label\` connected with \`for\` and \`id\`.
3. Use \`type="tel"\` with a \`pattern\` for the phone number and \`inputmode="numeric"\` for quantity.
4. Use a \`fieldset\` with \`legend\` and radio buttons, or a native \`select\`, for delivery area.
5. Add \`required\` where needed and write a clear hint under the phone field.
6. Test on a phone: check the keyboard changes and the error messages make sense.

**Done looks like:** a form you can complete with one thumb, where each field shows the right keyboard and mistakes are explained clearly. Commit it to GitHub.`,
      quiz: {
        questions: [
          {
            prompt: "Why should every input have a visible label linked with `for` and `id`?",
            options: ["Tapping it focuses the field and screen readers announce it", "It makes the browser check the typed data so the server does not have to", "It hides the field on phones", "It encrypts the data"],
            answer_index: 0,
            explanation: "Linked labels help touch users and screen reader users.",
          },
          {
            prompt: "Which input type shows a number pad for phone numbers?",
            options: ["type=\"text\"", "type=\"tel\"", "type=\"email\"", "type=\"date\""],
            answer_index: 1,
            explanation: "type tel shows a phone style keypad on mobile.",
          },
          {
            prompt: "Why is browser validation not enough on its own?",
            options: ["It never works on phones", "It deletes user data", "It only runs after the data has already reached your server", "It is a first line of help, and the server must check again"],
            answer_index: 3,
            explanation: "Anyone can bypass browser checks, so the server must validate too.",
          },
          {
            prompt: "What makes a good error message?",
            options: ["The word Invalid in red", "Saying what is wrong and how to fix it, next to the field", "Clearing the form so the user starts again", "A pop up listing every rule the form has, shown before typing"],
            answer_index: 1,
            explanation: "Clear, specific messages next to the field help people recover.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "javascript": {
      explanation_md: `JavaScript is the language that makes web pages interactive. It is named in many of the frontend adverts we studied, and the frameworks employers ask for, such as React and Next.js, are all JavaScript underneath. This section is the longest climb in the roadmap, so take it steadily.

## What JavaScript does on a page

HTML gives structure and CSS gives style. JavaScript adds behaviour:

* Filtering a price list as someone types.
* Showing or hiding a menu when a button is tapped.
* Checking a form before it is sent.
* Loading fresh data, such as exchange rates or order status, without reloading the page.

\`\`\`js
const button = document.querySelector("#greet");
button.addEventListener("click", () => {
  alert("Welcome to Mariama's Tailoring!");
});
\`\`\`

Three lines: find the button, listen for a click, then do something.

## What this section covers

* **JavaScript fundamentals:** variables, functions, arrays, objects, loops and conditions. The building blocks of every program.
* **The DOM and events:** reading and changing the page in response to taps, typing and scrolling.
* **Fetching data and async code:** talking to servers and APIs, and handling slow or failed connections gracefully.

## How to learn it without getting stuck

**Practise a little every day.** Twenty focused minutes daily beats a long session once a week. Your brain needs repetition.

**Type the code yourself.** Copying and pasting skips the part where you learn. Typing it, making mistakes and fixing them is how it sticks.

**Read error messages.** When something breaks, the browser console tells you what went wrong and on which line. It looks scary at first. It is actually your best helper.

**Explain your code out loud.** Interviewers will ask you to walk through your thinking. Practise by explaining your solutions to a friend, a study group or even to yourself.

**Build small, real tools.** A cedi to dollar converter, a tip calculator for a chop bar, a quiz for a church youth group. Real problems keep you motivated.

## A note on JavaScript and data

JavaScript files are downloaded to every visitor's phone and must be processed before they run. On a low cost Android phone, heavy JavaScript can make a page feel frozen. Throughout this section, aim to write only the JavaScript you need. Plain HTML and CSS can do more than you might think, and the less script a page depends on, the faster and more reliable it is for your users.`,
      practice_task_md: `**Goal:** your first interactive page and a daily practice habit.

1. Create a page with a button and an empty paragraph.
2. Write JavaScript that, when the button is tapped, writes today's greeting into the paragraph, such as "Good morning from Wa".
3. Open the browser console (F12 on a laptop) and deliberately make a typo in your code. Read the error message and fix it.
4. Make a seven day practice plan: twenty minutes a day, with one small problem for each day, written in a note.

**Done looks like:** a working button, a note of the error message you saw and how you fixed it, and a written seven day plan to show your mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is a job for JavaScript rather than HTML or CSS?",
            options: ["Making a heading", "Choosing a font colour", "Filtering a price list as someone types", "Adding a paragraph"],
            answer_index: 2,
            explanation: "JavaScript adds behaviour such as live filtering.",
          },
          {
            prompt: "Why does the lesson recommend typing code yourself instead of copying it?",
            options: ["Copying is against the law", "Browsers reject pasted code", "Typing it, breaking it and fixing it is how it sticks", "Typed code runs faster in the browser than pasted code"],
            answer_index: 2,
            explanation: "Active practice builds understanding.",
          },
          {
            prompt: "Where can you find out what went wrong when your JavaScript breaks?",
            options: ["The browser console error message", "The page title", "The CSS file", "The image alt text"],
            answer_index: 0,
            explanation: "The console shows the error and the line it happened on.",
          },
          {
            prompt: "Why should you avoid unnecessary JavaScript?",
            options: ["Heavy scripts cost data and can freeze pages on low cost phones", "JavaScript only runs well on laptops, so phones skip it entirely", "Employers dislike JavaScript", "JavaScript cannot change the page"],
            answer_index: 0,
            explanation: "Every script costs data and processing time on the user's phone.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "js-fundamentals": {
      explanation_md: `Interviews for junior roles in Accra and remote teams often include small coding tasks. They test exactly these fundamentals: storing values, making decisions, repeating work and organising code into functions. Master these and frameworks become much easier.

## Variables

Use \`const\` for values that will not be reassigned and \`let\` for values that will. Avoid the older \`var\`.

\`\`\`js
const shopName = "Fuseini Provisions";
let itemsSold = 0;
itemsSold = itemsSold + 1;
\`\`\`

## Types you will use most

* **Strings:** text, such as \`"Tamale"\`.
* **Numbers:** such as \`25\` or \`12.5\`.
* **Booleans:** \`true\` or \`false\`.
* **Arrays:** ordered lists, such as \`["rice", "beans", "gari"]\`.
* **Objects:** named properties, such as \`{ name: "gari", price: 15 }\`.

## Conditions

\`\`\`js
let message;
if (stock === 0) {
  message = "Sold out";
} else if (stock < 5) {
  message = "Only a few left";
} else {
  message = "In stock";
}
\`\`\`

Use \`===\` to compare. It checks both value and type, which avoids surprises.

## Functions

A function is a named, reusable piece of work. It takes inputs and returns a result.

\`\`\`js
function totalCost(price, quantity) {
  return price * quantity;
}
totalCost(15, 3); // 45
\`\`\`

## Working with arrays

Arrays come with helpful methods that you will use constantly:

\`\`\`js
const items = [
  { name: "rice", price: 20 },
  { name: "gari", price: 15 },
];
const cheap = items.filter((i) => i.price < 18);
const names = items.map((i) => i.name);
\`\`\`

* \`filter\` keeps items that pass a test.
* \`map\` turns each item into something new.
* \`find\` returns the first match.
* \`reduce\` combines items into one value, such as a total.

A \`for...of\` loop also works when you need to step through items one by one.

## A worked example

Amina keeps a list of the day's sales at her mother's stall as an array of objects. She writes a function that uses \`reduce\` to add up the total in cedis, and another that uses \`filter\` to list items that need restocking. Two small functions, and she has a tool her mother actually uses.

## How to practise

Solve small problems daily and explain each solution out loud. Free sites such as freeCodeCamp have many short JavaScript exercises. When you are stuck, write down what you expect to happen, then use \`console.log\` to see what actually happens. The gap between the two is where the bug lives.`,
      practice_task_md: `**Goal:** a small stock tool using only JavaScript fundamentals.

1. Create an array of at least five objects, each with \`name\`, \`price\` and \`stock\`, for a shop you know.
2. Write a function \`totalValue(items)\` that returns the value of all stock (price times stock, added up).
3. Write a function \`lowStock(items)\` that returns the names of items with fewer than five in stock.
4. Write a function \`stockMessage(item)\` that returns "Sold out", "Only a few left" or "In stock".
5. Print the results with \`console.log\` and check them by hand.
6. Record a short voice note explaining one of your functions, as practice for interviews.

**Done looks like:** three working functions with correct output in the console, saved to GitHub with a README explaining what each does.`,
      quiz: {
        questions: [
          {
            prompt: "When should you use `const` instead of `let`?",
            options: ["When the value will be reassigned", "When the value will not be reassigned", "Only inside loops", "Never, const is outdated"],
            answer_index: 1,
            explanation: "const is for values that are not reassigned; let is for those that are.",
          },
          {
            prompt: "Why does the lesson recommend `===` for comparisons?",
            options: ["It is faster to type", "It checks both value and type, avoiding surprises", "It assigns a value", "It turns both sides into numbers before comparing them"],
            answer_index: 1,
            explanation: "Strict equality compares type as well as value.",
          },
          {
            prompt: "What does the array method `filter` do?",
            options: ["Turns each item into something new", "Adds up all the items", "Keeps the items that pass a test", "Sorts the items alphabetically"],
            answer_index: 2,
            explanation: "filter returns a new array containing only matching items.",
          },
          {
            prompt: "What does `totalCost(15, 3)` return if the function multiplies price by quantity?",
            options: ["5", "18", "45", "153"],
            answer_index: 2,
            explanation: "15 multiplied by 3 is 45.",
          },
          {
            prompt: "What is a good first step when you are stuck on a bug?",
            options: ["Delete the whole file", "Write down what you expect, then console.log what actually happens", "Switch to a different language", "Copy a full solution from the internet and replace your code with it"],
            answer_index: 1,
            explanation: "Comparing expected and actual values shows where the bug is.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "dom-and-events": {
      explanation_md: `The DOM is how JavaScript sees and changes a web page. Every interactive feature you build, from a menu that opens to a search box that filters results, uses the DOM and events. React and other frameworks are built on top of these same ideas.

## What the DOM is

When the browser reads your HTML, it builds a tree of objects called the Document Object Model. Each element becomes a node you can find, read and change with JavaScript.

\`\`\`js
const title = document.querySelector("h1");
title.textContent = "Today's prices";
\`\`\`

\`querySelector\` uses the same selectors as CSS: \`"#id"\`, \`".class"\` or \`"tag"\`. \`querySelectorAll\` returns every match.

## Changing the page

* \`element.textContent = "..."\` changes text safely.
* \`element.classList.add("open")\` adds a CSS class, so CSS handles the look.
* \`element.hidden = true\` hides an element.
* \`document.createElement("li")\` makes a new element, and \`list.append(item)\` adds it.

Prefer \`textContent\` over \`innerHTML\` when showing anything a user typed. \`innerHTML\` treats text as HTML, which can let attackers inject harmful code.

## Events

Events are things that happen: a tap, a key press, a form submission. You listen for them and respond.

\`\`\`js
const box = document.querySelector("#search");
box.addEventListener("input", () => {
  showMatches(box.value);
});
\`\`\`

Useful events: \`click\`, \`input\` (every change in a text field), \`submit\` (a form is sent) and \`change\` (a select or checkbox changes).

For forms, stop the browser's default reload so your code can handle it:

\`\`\`js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // check and send the data
});
\`\`\`

## Event delegation

If a list has many items, add one listener to the list instead of one per item. Inside the listener, \`e.target\` tells you which item was tapped. This uses less memory, which helps on low cost phones, and it works for items added later.

## A worked example

Abdul-Rahman builds a market price list for Aboabo market. The prices live in a JavaScript array. When the page loads, his code creates an \`li\` for each item. A search box listens for \`input\` events and hides items that do not match what is typed. Each item has a "Save" button, handled by one delegated listener on the list. The whole tool is a few dozen lines, works offline once loaded and uses very little data.

## Keep it accessible

Use real \`button\` elements for things people tap, so keyboard and screen reader users can use them too. When you show or hide content, make sure focus does not get lost.`,
      practice_task_md: `**Goal:** a live filtering price list.

1. In JavaScript, create an array of at least eight market items with names and prices in cedis.
2. When the page loads, create an \`li\` for each item and append it to a \`ul\`.
3. Add a search input with a visible label. On every \`input\` event, hide items whose names do not include the typed text.
4. Add a "Save" button to each item and handle all of them with one listener on the \`ul\` (event delegation). Saved items get a CSS class that highlights them.
5. Use \`textContent\`, not \`innerHTML\`, for any text.
6. Test on a phone and a computer.

**Done looks like:** typing filters the list instantly, saved items stay highlighted, and the code uses a single delegated listener. Commit it and add a short screen recording or screenshot to your README.`,
      quiz: {
        questions: [
          {
            prompt: "What is the DOM?",
            options: ["A CSS framework that styles HTML elements for you", "A tree of objects the browser builds from HTML", "A file on the server that stores your HTML pages", "A Git command"],
            answer_index: 1,
            explanation: "The browser turns HTML into the Document Object Model, which JavaScript can change.",
          },
          {
            prompt: "Why prefer `textContent` over `innerHTML` for user typed text?",
            options: ["innerHTML is slower to type", "innerHTML reads text as HTML, so harmful code can be injected", "textContent changes colours", "innerHTML strips spaces and line breaks from what the user typed"],
            answer_index: 1,
            explanation: "textContent shows text as plain text, which is safer.",
          },
          {
            prompt: "Which event fires on every change in a text field?",
            options: ["submit", "load", "input", "change"],
            answer_index: 2,
            explanation: "The input event fires each time the field's value changes.",
          },
          {
            prompt: "What does `e.preventDefault()` do in a submit handler?",
            options: ["Stops the default page reload so your code handles the form", "Deletes the form", "Sends the form to the server before the page reloads", "Clears every field so the user cannot send the same form twice"],
            answer_index: 0,
            explanation: "It stops the default action so JavaScript can take over.",
          },
          {
            prompt: "What is a benefit of event delegation?",
            options: ["It adds one listener to each item, so every tap is handled separately", "One parent listener handles many items, including ones added later", "It makes CSS load faster", "It removes the need for buttons"],
            answer_index: 1,
            explanation: "A single parent listener uses e.target to know which item was tapped.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "fetch-and-async": {
      explanation_md: `Almost every real product loads data from a server: account balances, order history, product lists. Working with REST APIs is one of the skills that appears most often in the adverts we studied. On Ghanaian mobile networks, handling slow and dropped connections well is just as important as getting the data.

## What an API is

An API is a set of addresses on a server that return data instead of web pages, usually as JSON. JSON looks like JavaScript objects:

\`\`\`json
{ "item": "rice", "price": 20, "inStock": true }
\`\`\`

## Asynchronous code

Network requests take time. JavaScript does not freeze while it waits; it carries on and comes back when the data arrives. This is called asynchronous code. The modern way to write it uses \`async\` and \`await\`:

\`\`\`js
async function loadPrices() {
  const res = await fetch("/api/prices");
  if (!res.ok) throw new Error("Server said " + res.status);
  return res.json();
}
\`\`\`

\`await\` pauses this function, not the whole page, until the response arrives. \`res.ok\` is true for success codes such as 200. \`fetch\` only throws on network failure, so you must check \`res.ok\` yourself for errors like 404 or 500.

## Every request has three states

Design for all of them:

1. **Loading:** show something straight away, such as "Loading prices..." or a simple placeholder.
2. **Success:** show the data.
3. **Error:** explain what happened in plain words and offer a **Retry** button.

\`\`\`js
try {
  status.textContent = "Loading prices...";
  const data = await loadPrices();
  render(data);
  status.textContent = "";
} catch (err) {
  status.textContent = "Could not load. Check your data and retry.";
  retryButton.hidden = false;
}
\`\`\`

## Designing for slow networks

* **Never leave a blank screen.** A visible loading message tells people the app is working.
* **Make retry easy.** Connections drop when someone moves between towns or their bundle runs out.
* **Do not lose user input** when a request fails. Keep what they typed.
* **Prevent double taps.** Disable the button while a request is in flight, especially for orders and payments.
* **Request only what you need.** Smaller responses arrive faster and cost less data.

## A worked example

Mariama builds a page showing today's maize prices from a cooperative's API. On a good connection it loads instantly. She uses developer tools to simulate a slow network and sees a blank page for several seconds, so she adds a loading message. She then switches the network to offline, sees an unhelpful crash, and adds a friendly error with a Retry button. Now the page behaves well for a farmer in Damongo on one bar of signal.

Test every feature with a slow network setting. It is the quickest way to see your app the way many of your users will.`,
      practice_task_md: `**Goal:** load real data with loading, success and error states.

1. Pick a free public API that needs no key, such as one returning sample JSON (for example jsonplaceholder.typicode.com).
2. Write an \`async\` function that uses \`fetch\`, checks \`res.ok\`, and returns the JSON.
3. Show "Loading..." before the request, render a list on success, and show a clear error message with a Retry button on failure.
4. Disable the button while loading so it cannot be tapped twice.
5. In browser developer tools, set the network to a slow preset, then to offline, and check each state appears.

**Done looks like:** a page that never shows a blank screen, explains errors in plain words, and recovers when you tap Retry after going back online. Commit it with notes on how you tested it.`,
      quiz: {
        questions: [
          {
            prompt: "What format do most web APIs return data in?",
            options: ["JSON", "CSS", "PNG", "HTML forms"],
            answer_index: 0,
            explanation: "APIs usually return JSON, which looks like JavaScript objects.",
          },
          {
            prompt: "What does `await` do inside an async function?",
            options: ["Freezes the whole page until the request has finished", "Pauses only that function until the result arrives", "Deletes the request", "Makes the request skip the network"],
            answer_index: 1,
            explanation: "await pauses only the async function, not the page.",
          },
          {
            prompt: "Why must you check `res.ok` after `fetch`?",
            options: ["res.ok turns the response body into a JavaScript object", "It converts JSON to HTML", "It is required for CSS to load", "fetch does not throw for server errors like 404 or 500"],
            answer_index: 3,
            explanation: "fetch only throws on network failure, so status errors must be checked.",
          },
          {
            prompt: "Which three states should every request be designed for?",
            options: ["Red, amber, green", "Start, middle and end", "Loading, success and error", "Online, offline and paused"],
            answer_index: 2,
            explanation: "Users should always see loading, the data, or a helpful error.",
          },
          {
            prompt: "Why disable a button while a request is in flight?",
            options: ["To stop double taps sending an order or payment twice", "To save electricity", "Because a button that is tapped during fetch cancels the request", "To hide the loading message"],
            answer_index: 0,
            explanation: "Disabling prevents duplicate requests.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "quality": {
      explanation_md: `Plenty of people can make a page that looks fine on their own laptop. Professional frontend work is measured differently: can everyone use it, on any phone or computer, on any connection, and does it keep working after the next change? This section covers the habits that separate a hobby page from work a team can rely on.

## The four habits

* **Accessibility:** making pages usable by people with disabilities, and by anyone in difficult conditions such as bright sunlight, a cracked screen or a noisy market.
* **Performance on slow networks and low end phones:** pages that open quickly and cost little data.
* **Debugging with browser DevTools:** finding and fixing problems yourself, which is what makes you independent on a team.
* **Testing:** automated checks that confirm your code still works, so you can change it with confidence.

Skills frameworks for web work list quality assurance, troubleshooting and performance analysis among the essentials, and employers in Accra and remote teams ask for testing, accessibility and performance by name.

## Why this matters especially in Ghana

Your users may be on a budget Android phone with limited storage, a prepaid bundle and patchy signal. A page that downloads several megabytes of images and scripts is not just slow for them; it costs them money. A button that only works with a mouse, or grey text that disappears in sunlight, shuts people out.

Getting these things right is not polish you add at the end. It is part of building the feature.

## A simple quality checklist

Before you call any page finished, check:

1. Can I use it with only a keyboard, pressing Tab to move around?
2. Is the text readable, with strong contrast, at a normal size?
3. Does it load reasonably with the network set to a slow preset in DevTools?
4. Are there any red errors in the browser console?
5. Do my automated tests still pass?

## A worked example

Fuseini finishes a sign up page for a youth football league in Nalerigu. It looks good, so he is tempted to move on. He runs the checklist instead. Pressing Tab skips his "Join" button because it is a \`div\`, so he changes it to a \`button\`. His hero photo is very large, so he compresses it. The console shows an error when the phone field is empty, which he fixes and covers with a test. Ten minutes of checking turned a nice looking page into one that works for everyone.

Make this checklist a habit for every project in your portfolio. Reviewers notice.`,
      practice_task_md: `**Goal:** audit one of your existing projects with the quality checklist.

1. Choose a page you have already built.
2. Use only the keyboard: press Tab through the page and note anything you cannot reach or use.
3. Check text contrast by eye in bright light, or with the contrast checker in DevTools.
4. In DevTools, set the network to a slow preset and reload. Note how long it takes to show something useful.
5. Open the console and note any errors.
6. Write a short report listing at least three problems you found and fix them.

**Done looks like:** a before and after note in your project README listing the problems and your fixes.`,
      quiz: {
        questions: [
          {
            prompt: "Which four habits does this section cover?",
            options: ["Accessibility, animation, deployment and marketing", "Accessibility, performance, debugging and testing", "Marketing, sales, payments and hiring", "HTML, CSS, JavaScript and Git"],
            answer_index: 1,
            explanation: "The quality section covers accessibility, performance, debugging and testing.",
          },
          {
            prompt: "Why can a heavy page be a bigger problem for users on prepaid bundles?",
            options: ["Heavy pages cost them data, which costs money", "Heavy pages cannot be opened on Android", "Browsers block large pages", "Heavy pages use less battery"],
            answer_index: 0,
            explanation: "Every megabyte downloaded comes out of the user's bundle.",
          },
          {
            prompt: "According to the lesson, when should quality work happen?",
            options: ["As part of building the feature", "Only after launch, once users report problems", "Only if a manager asks", "Once a year"],
            answer_index: 0,
            explanation: "Quality is part of building, not polish added at the end.",
          },
          {
            prompt: "Which is one of the checklist questions from the lesson?",
            options: ["Does the page use at least three fonts?", "Can I use it with only a keyboard?", "Is the logo animated?", "Is there a pop up on load?"],
            answer_index: 1,
            explanation: "Keyboard only use is the first checklist item.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "accessibility": {
      explanation_md: `Accessibility means building pages that people with disabilities can use: people who are blind or have low vision, people who cannot use a mouse, people who are deaf, and people with cognitive differences. Employers in Ghana and abroad list it in adverts, and good accessibility also helps everyone reading on a small screen in bright sun.

## The standard: WCAG

The Web Content Accessibility Guidelines (WCAG), published by the W3C, are the international standard. They are organised around four ideas: content must be **perceivable**, **operable**, **understandable** and **robust**. You do not need to memorise it all; start with the checks below.

## Five checks that catch most problems

**1. Semantic HTML.** Use real \`button\`, \`a\`, \`label\`, headings and lists. This gives keyboard and screen reader support for free.

**2. Keyboard use.** Press Tab through the page. Every link, button and field should be reachable, in a sensible order, with a visible focus outline. Never remove the outline without replacing it:

\`\`\`css
:focus-visible {
  outline: 3px solid #0b57d0;
  outline-offset: 2px;
}
\`\`\`

**3. Colour contrast.** Text must stand out from its background. WCAG asks for a contrast ratio of at least 4.5 to 1 for normal text. Light grey on white often fails, and it is unreadable outdoors. Chrome DevTools shows the contrast ratio when you inspect text.

**4. Text alternatives.** Meaningful images need \`alt\` text. Icon only buttons need an accessible name:

\`\`\`html
<button aria-label="Close menu">✕</button>
\`\`\`

**5. Do not rely on colour alone.** If a failed payment is only shown in red, colour blind users may miss it. Add words or an icon: "Payment failed".

## Announcing changes

When content changes without a page reload, such as "Order placed" appearing, screen reader users may not notice. A live region announces it:

\`\`\`html
<p role="status" aria-live="polite"></p>
\`\`\`

Put your status messages inside it.

## ARIA: use sparingly

ARIA attributes add extra meaning for assistive technology. The first rule is to prefer native HTML. A real \`button\` is better than a \`div\` with \`role="button"\`. Use ARIA only to fill gaps HTML cannot.

## A worked example

Wumpini tests a school results page with the free screen reader built into Android, called TalkBack. She discovers her search icon is read as "button" with no name, so she adds an \`aria-label\`. Her grey footnote text fails the contrast check, so she darkens it. Pressing Tab on a laptop, she finds the focus outline invisible and adds a clear one. In twenty minutes the page works for many more students.

Test with a keyboard and a screen reader regularly. It quickly becomes second nature.`,
      practice_task_md: `**Goal:** make one page pass the five accessibility checks.

1. Choose a project page with a form or buttons.
2. Tab through it. Fix any element you cannot reach, and add a visible \`:focus-visible\` style.
3. Inspect your text colours in DevTools and fix anything below a 4.5 to 1 contrast ratio.
4. Add \`alt\` text to images and \`aria-label\` to any icon only buttons.
5. Make sure no information is shown with colour alone.
6. On an Android phone, turn on TalkBack (Settings, Accessibility) and try to use your page. Note what is confusing and fix it.

**Done looks like:** a page you can fully use with a keyboard and with TalkBack, plus a short note in the README listing what you fixed. The free W3C "Easy Checks" page is a helpful reference.`,
      quiz: {
        questions: [
          {
            prompt: "What are the four principles WCAG is organised around?",
            options: ["Fast, cheap, pretty and modern", "HTML, CSS, JavaScript and ARIA", "Contrast, captions, keyboard access and screen readers", "Perceivable, operable, understandable and robust"],
            answer_index: 3,
            explanation: "WCAG content must be perceivable, operable, understandable and robust.",
          },
          {
            prompt: "What minimum contrast ratio does WCAG ask for normal text?",
            options: ["1.5 to 1", "2 to 1", "4.5 to 1", "10 to 1"],
            answer_index: 2,
            explanation: "Normal text needs at least 4.5 to 1 contrast.",
          },
          {
            prompt: "How should an icon only close button get an accessible name?",
            options: ["Add an aria-label such as Close menu", "Make the icon bigger", "Use a div instead", "Remove the button"],
            answer_index: 0,
            explanation: "aria-label gives screen readers a name for icon only buttons.",
          },
          {
            prompt: "What is the first rule of using ARIA?",
            options: ["Prefer native HTML, and use ARIA only to fill gaps", "Add ARIA to every element", "Add ARIA roles to divs so they act like real buttons", "ARIA is only for colour"],
            answer_index: 0,
            explanation: "Native HTML elements come with built in accessibility.",
          },
          {
            prompt: "Why should a failed payment not be shown in red alone?",
            options: ["Red is not allowed on the web", "Colour blind users may miss it, so add words or an icon", "Red uses more data", "Red looks orange on some phone screens, so add a second colour"],
            answer_index: 1,
            explanation: "Information should never depend on colour alone.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "performance-low-bandwidth": {
      explanation_md: `A page that opens in a moment on office WiFi can take a long time on a busy mobile network, and every megabyte comes out of someone's prepaid bundle. Performance appears in Accra and remote adverts, and for products serving northern Ghana it often decides whether people use your site at all.

## Measure first

Do not guess. Use free tools:

* **Lighthouse**, built into Chrome DevTools, scores a page and lists what to fix.
* **PageSpeed Insights** (pagespeed.web.dev) runs similar checks from the web.
* **Network throttling** in DevTools lets you simulate a slow connection, and **CPU throttling** simulates a slower phone.

Watch the total page weight in the Network tab. Smaller is almost always better.

## Images: the biggest win

Images are usually the heaviest part of a page.

\`\`\`html
<img src="kente-600.webp"
     srcset="kente-400.webp 400w, kente-800.webp 800w"
     sizes="(min-width: 700px) 50vw, 100vw"
     width="600" height="400"
     loading="lazy" alt="Kente cloth on display">
\`\`\`

* **Resize** images to the size they are shown. A phone does not need a photo several thousand pixels wide.
* **Compress** and use modern formats such as WebP or AVIF. Free browser tools such as Squoosh can do this.
* **\`srcset\` and \`sizes\`** let the phone choose a smaller file.
* **\`loading="lazy"\`** delays images below the screen until they are needed.
* **\`width\` and \`height\`** reserve space so the page does not jump as images load.

## Less JavaScript

JavaScript costs twice: data to download, then processing time on the phone's slower chip.

* Ask whether you need a library at all. Plain HTML and CSS often do the job.
* Load scripts with \`defer\` so the page can show first.
* Remove unused code and avoid adding large packages for small features.

## Fonts and CSS

* Use system fonts, or one web font with few weights.
* Keep CSS small and remove rules you no longer use.

## Caching

When files are cached, returning visitors do not download them again. Most free hosts set sensible caching for static files. Give files new names when they change so users get updates.

## A worked example

Issahaku builds a site for a Wa tailoring business. Lighthouse shows a poor score and a very heavy page. The cause is six large phone photos. He resizes them to 800 pixels wide, converts them to WebP, adds \`loading="lazy"\` and sets \`width\` and \`height\`. He also removes an animation library used for one effect. With the network throttled to a slow preset, the page now shows its content quickly, and it costs a visitor a small fraction of the data it did before.

Make "how much data does this cost my user?" a question you ask about every feature.`,
      practice_task_md: `**Goal:** make one of your pages measurably lighter and faster.

1. Pick a project with images.
2. Run Lighthouse in Chrome DevTools in mobile mode. Save a screenshot of the score and the total page weight from the Network tab.
3. Resize and compress every image (a free browser tool such as Squoosh works without installing anything). Convert to WebP.
4. Add \`width\`, \`height\` and \`loading="lazy"\` to images below the first screen.
5. Add \`defer\` to scripts and remove anything you do not use.
6. Run Lighthouse again and check the page with a slow network preset.

**Done looks like:** before and after screenshots showing a smaller page weight and a better score, added to your README.`,
      quiz: {
        questions: [
          {
            prompt: "What is the usual biggest win for page weight?",
            options: ["Adding more fonts", "Using longer class names", "Adding animations", "Resizing and compressing images"],
            answer_index: 3,
            explanation: "Images are usually the heaviest part of a page.",
          },
          {
            prompt: "What does `loading=\"lazy\"` do on an image?",
            options: ["Makes the image blurry", "Loads the image twice", "Converts the image to WebP so it downloads in a smaller size", "Delays images below the screen until they are needed"],
            answer_index: 3,
            explanation: "Lazy loading saves data by waiting until the image is near the screen.",
          },
          {
            prompt: "Why set `width` and `height` on images?",
            options: ["To make images download faster", "To hide images on phones", "To make the browser download a smaller copy of each image", "To reserve space so the page does not jump as images load"],
            answer_index: 3,
            explanation: "Known dimensions let the browser keep space for the image.",
          },
          {
            prompt: "Why does JavaScript cost a user twice?",
            options: ["It must be bought from a store", "It runs once on the server and again on the phone's chip", "It is downloaded, then processed on the phone's chip", "It is sent by SMS"],
            answer_index: 2,
            explanation: "Scripts cost data to download and time to run on slower phones.",
          },
          {
            prompt: "Which free tool built into Chrome DevTools scores a page's performance?",
            options: ["Git", "Figma", "Lighthouse", "TalkBack"],
            answer_index: 2,
            explanation: "Lighthouse audits performance and suggests fixes.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "debugging": {
      explanation_md: `Every developer writes bugs. What makes you valuable on a team is finding and fixing them without needing someone to hold your hand. Adverts ask for debugging and DevTools skills, and skills frameworks list troubleshooting websites as essential. Browser DevTools are your main instrument.

## Open DevTools

In Chrome or Firefox on a laptop, press F12, or right click any element and choose Inspect. The panels you will use most:

* **Elements:** see the HTML and the CSS applied to any element. You can edit styles live to test a fix before changing your file.
* **Console:** shows errors and anything you \`console.log\`. You can also type JavaScript here to test ideas.
* **Network:** lists every request with its status code, size and time. Here you can throttle the connection to a slow preset or go offline.
* **Sources:** lets you pause code with breakpoints and step through it line by line.

## A method for any bug

1. **Reproduce it.** Find the exact steps that cause the problem.
2. **Read the error.** The console names the error and the file and line. Click the link to jump there.
3. **Form a guess.** "I think \`items\` is empty when this runs."
4. **Check the guess.** Add \`console.log(items)\` or set a breakpoint and look.
5. **Fix one thing, then test again.** Changing many things at once hides what worked.

## Common bugs and where to look

* **Style not applying:** In Elements, crossed out rules show which CSS was overridden and by what.
* **"Cannot read properties of undefined":** Something you expected to exist is missing. Log the value just before that line.
* **Data not showing:** In Network, check whether the request returned 200, and preview the response.
* **Works on WiFi, fails on mobile:** Throttle the network and look for missing loading or error states.

\`\`\`js
console.log("cart before total:", cart);
debugger; // pauses here when DevTools is open
\`\`\`

The \`debugger\` statement pauses your code at that line, so you can inspect every variable.

## Debugging on a phone

Chrome supports remote debugging: connect an Android phone to a laptop with a USB cable, enable developer options on the phone, and inspect the phone's page from the laptop's DevTools. This shows bugs that only appear on real devices.

## About AI assistants

Some adverts mention AI coding tools. They can suggest causes, but they are often confidently wrong. Use them as a second opinion, and always confirm with DevTools that the fix really works and that you understand why.

## A worked example

Mariama's order total shows "NaN". She logs the cart and sees prices stored as text such as "GH₵ 15", not numbers. She strips the symbol, converts with \`Number()\`, and the total is correct. Five minutes, because she followed the method.`,
      practice_task_md: `**Goal:** practise the debugging method on real bugs.

1. Take one of your JavaScript projects and deliberately add three bugs: a misspelled variable, a CSS rule overridden by another, and a fetch to a wrong address.
2. Ask a friend to add a fourth bug without telling you where, or swap projects with a study partner.
3. For each bug, write down: the steps to reproduce, what the console or Network panel showed, your guess, and the fix.
4. Use at least one breakpoint or \`debugger\` statement.
5. Use the Elements panel to find the overridden CSS rule.

**Done looks like:** a short debugging log with four bugs, each with evidence and a fix. This makes a good story for interviews.`,
      quiz: {
        questions: [
          {
            prompt: "Which DevTools panel shows every request with its status code and size?",
            options: ["Elements", "Network", "Console", "Sources"],
            answer_index: 1,
            explanation: "The Network panel lists requests, sizes, times and status codes.",
          },
          {
            prompt: "What is the first step in the debugging method?",
            options: ["Rewrite the whole file", "Ask an AI to fix it", "Reproduce the bug with exact steps", "Change several things at once"],
            answer_index: 2,
            explanation: "You need reliable steps to reproduce before you can fix.",
          },
          {
            prompt: "What does a crossed out rule in the Elements panel tell you?",
            options: ["That rule was overridden by another rule", "The rule only applies when the page is printed", "The rule is spelled correctly", "The page is offline"],
            answer_index: 0,
            explanation: "Crossed out rules show which styles lost to others.",
          },
          {
            prompt: "What does the `debugger` statement do when DevTools is open?",
            options: ["Deletes the bug", "Sends an error report with the line number to the console", "Speeds up the code", "Pauses code at that line so you can inspect variables"],
            answer_index: 3,
            explanation: "debugger acts like a breakpoint written in code.",
          },
          {
            prompt: "How does the lesson suggest using AI coding assistants?",
            options: ["As a second opinion, checking with DevTools and understanding the fix", "Paste in every suggestion it gives, since it has read more code than you", "Never read their output", "Only for CSS"],
            answer_index: 0,
            explanation: "AI tools can be wrong, so verify and understand.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "testing": {
      explanation_md: `Many of the adverts we studied ask for testing, including entry level roles at a fintech and a National Service placement in Accra. Tests are small programs that check your code does what you expect. They let you change code later without fear, and they show employers you think like a professional.

## Kinds of tests

* **Unit tests** check one small piece, such as a function that calculates a total.
* **Component or integration tests** check pieces working together, such as a form that shows an error when a field is empty.
* **End to end tests** drive a real browser through a full journey, such as adding to cart and checking out.

Start with unit tests. They are the quickest to write and run.

## A first unit test

Free test runners such as Vitest work with modern JavaScript projects. Suppose you have:

\`\`\`js
// cart.js
export function total(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}
\`\`\`

A test file next to it:

\`\`\`js
// cart.test.js
import { test, expect } from "vitest";
import { total } from "./cart.js";

test("adds price times quantity", () => {
  const items = [{ price: 15, qty: 2 }, { price: 5, qty: 1 }];
  expect(total(items)).toBe(35);
});

test("empty cart is zero", () => {
  expect(total([])).toBe(0);
});
\`\`\`

Run \`npx vitest\` and it tells you which tests pass or fail.

## What to test

* **The normal case:** typical input gives the right answer.
* **Edge cases:** an empty list, zero, a very large number, missing data.
* **Bugs you fixed:** when you fix a bug, add a test so it never comes back.

Test what the code does, not how it does it. If you rewrite the inside of \`total\` but the answers stay right, the tests should still pass.

## End to end tests, briefly

Tools such as Playwright open a real browser, tap buttons and check what appears. They are slower, so teams write fewer of them for the most important journeys, like signing up or paying. You can also run them with a phone sized screen and a slow network, which suits products for Ghanaian users.

## Tests and teamwork

Teams run tests automatically on every pull request, a practice called continuous integration (CI). If a test fails, the change is not merged until it is fixed. GitHub Actions offers this free for public repositories.

## A worked example

Sumaila writes a function that formats amounts as cedis. He adds tests for whole numbers, decimals and zero. Later he changes the function to handle thousands with commas, and one test fails because he broke decimals. He fixes it before anyone else sees the bug. That is exactly what tests are for.`,
      practice_task_md: `**Goal:** your first tested function.

1. On a laptop, create a small project folder and run \`npm init -y\`, then \`npm install -D vitest\` (on WiFi). No laptop? Write the function and tests in a free browser editor such as StackBlitz.
2. Write a function \`formatCedis(amount)\` that returns text like "GH₵ 25.00".
3. Write at least four tests: a whole number, a decimal, zero, and a large number.
4. Run \`npx vitest\` and make every test pass.
5. Break the function on purpose, watch a test fail, then fix it.

**Done looks like:** a repository with your function, a test file with four or more passing tests, and a README line explaining how to run them. Bonus: add a GitHub Actions workflow that runs the tests on every push.`,
      quiz: {
        questions: [
          {
            prompt: "What does a unit test check?",
            options: ["A full journey such as checkout, run in a real browser", "The speed of the network", "The design in Figma", "One small piece of code, such as a single function"],
            answer_index: 3,
            explanation: "Unit tests check one small piece in isolation.",
          },
          {
            prompt: "What should you do after fixing a bug?",
            options: ["Add a test so the bug never comes back", "Delete the related tests", "Stop running tests", "Rename the file"],
            answer_index: 0,
            explanation: "A test for a fixed bug prevents it returning.",
          },
          {
            prompt: "Why are end to end tests usually written only for the most important journeys?",
            options: ["They cannot run in browsers", "They are illegal in some countries", "They are slower to run", "They only test CSS"],
            answer_index: 2,
            explanation: "End to end tests drive a real browser, which takes longer.",
          },
          {
            prompt: "What is continuous integration (CI)?",
            options: ["Writing code without breaks", "Publishing the site to a free host every time you save a file", "Running tests automatically on every pull request", "A type of CSS layout"],
            answer_index: 2,
            explanation: "CI runs checks automatically so broken changes are caught before merging.",
          },
          {
            prompt: "What does it mean to test what the code does, not how it does it?",
            options: ["Tests check results, so a rewrite with the same answers still passes", "Tests should check that each internal step runs in the same order as before", "Tests should only check variable names", "Tests should never use real inputs"],
            answer_index: 0,
            explanation: "Testing behaviour keeps tests useful when you refactor.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "frameworks": {
      explanation_md: `Most frontend adverts we studied, from Accra fintechs to remote agencies, name a framework, and React was by far the most common, often paired with TypeScript. Frameworks help teams build large interfaces in an organised way. This section introduces them once plain JavaScript feels comfortable.

## Why frameworks exist

With plain JavaScript, you find elements and update them by hand. That works for a small page. In a big app with many screens, keeping the page in step with changing data becomes messy and bug prone.

Frameworks such as React let you describe what the screen should look like for the current data. When the data changes, the framework updates the page for you. You think in **components**: small, reusable pieces like a \`ProductCard\`, a \`PriceTag\` or a \`MomoCheckout\` button.

## What this section covers

* **React fundamentals:** components, props and state, the core ideas employers test.
* **TypeScript basics:** adding types to JavaScript so mistakes show up before users see them.
* **A full stack framework such as Next.js (optional):** routing, server rendering and data loading on top of React.
* **Turning a design into code:** reading a Figma design and building it as clean, reusable components.

## When to start

Start this section when you can, without looking things up constantly:

* Write functions and use \`map\` and \`filter\` on arrays.
* Change the page in response to events.
* Fetch data and handle loading and errors.

If those still feel shaky, spend another week or two on the JavaScript section. Frameworks build on those skills, and skipping them makes React feel like magic you cannot debug.

## A cost to keep in mind

Frameworks add JavaScript that every visitor downloads and runs. On a low cost Android phone and a slow network, a heavy React app can be slow to start. Good teams manage this: they keep bundles small, render on the server where it helps, and avoid unnecessary libraries. Keep the performance lesson in mind as you learn.

## Tooling you will meet

* **npm**, the package manager that installs libraries.
* **Build tools** such as Vite, for starting and building projects, for example \`npm create vite@latest\`.
* **CSS options** such as Tailwind or a component library, which several adverts mention.

You do not need to master all of them. Learn enough to start a project, install a package and build for production.

## A worked example

Abdul-Rahman rebuilds his market price list in React. His filter, list and save buttons become three components. The search text lives in state, and the list re renders automatically as he types. The code is shorter and easier to extend, and he can now explain in an interview exactly what React changed compared with his plain JavaScript version.`,
      practice_task_md: `**Goal:** start your first framework project and compare it with plain JavaScript.

1. On a laptop with WiFi, run \`npm create vite@latest\`, choose React, then \`npm install\` and \`npm run dev\`. No laptop? Use a free React template in a browser editor such as StackBlitz.
2. Open the page and find the starter component.
3. Change the heading to your project name and save. Watch the page update.
4. Write a short note comparing this with your plain JavaScript projects: what seems easier, what seems harder.
5. Commit the project to GitHub.

**Done looks like:** a running React project on GitHub and a short written comparison you can talk through with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main idea behind frameworks such as React?",
            options: ["They replace HTML entirely, so the browser runs only JavaScript files", "They only work on servers", "You describe the screen for the data and the framework updates it", "They make CSS unnecessary"],
            answer_index: 2,
            explanation: "React updates the page to match your data, so you do not change it by hand.",
          },
          {
            prompt: "What is a component?",
            options: ["A type of server", "A reusable piece of interface such as a ProductCard", "A Git branch that holds one feature of the interface", "An image format"],
            answer_index: 1,
            explanation: "Components are reusable building blocks of an interface.",
          },
          {
            prompt: "When does the lesson suggest starting this section?",
            options: ["Right after HTML and CSS, before writing any JavaScript", "When you can write functions, handle events and fetch data", "Only after getting a job", "After learning a backend language and setting up a database"],
            answer_index: 1,
            explanation: "Frameworks build on solid JavaScript skills.",
          },
          {
            prompt: "What cost do frameworks add for users on low cost phones?",
            options: ["More JavaScript to download and run, which can slow start up", "They require a newer browser that most phones cannot install", "They stop images loading", "They disable accessibility"],
            answer_index: 0,
            explanation: "Framework code adds weight that every visitor must download and process.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "react": {
      explanation_md: `React was the framework named most often in the adverts we studied, for both Ghanaian companies and remote teams. Its core ideas are few: components, props, state and effects. Learn these well and you can work on most React codebases.

## Components and JSX

A component is a function that returns what should appear on screen, written in JSX, which looks like HTML inside JavaScript:

\`\`\`jsx
function PriceTag({ name, price }) {
  return (
    <p>{name}: GH₵ {price}</p>
  );
}
\`\`\`

Curly braces put JavaScript values into the markup. Component names start with a capital letter.

## Props: passing data in

Props are inputs to a component, like function arguments:

\`\`\`jsx
<PriceTag name="Gari" price={15} />
\`\`\`

A component should not change its own props. They flow down from parent to child.

## State: data that changes

State is data a component remembers between renders, such as text typed in a search box. Use the \`useState\` hook:

\`\`\`jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Ordered: {count}
    </button>
  );
}
\`\`\`

When you call \`setCount\`, React re renders the component with the new value. Never change state directly; always use the setter.

## Lists and keys

Render lists with \`map\`, and give each item a stable, unique \`key\`:

\`\`\`jsx
<ul>
  {items.map((i) => <li key={i.id}>{i.name}</li>)}
</ul>
\`\`\`

Keys help React update the right items efficiently.

## Lifting state up

When two components need the same data, move the state to their closest common parent and pass it down as props. For example, a search box and a results list both need the search text, so their parent holds it. Larger apps sometimes use shared state tools, but start with this pattern; it covers a lot.

## Effects

\`useEffect\` runs code after rendering, for things outside React such as fetching data. Many teams now load data through a framework or a data library instead, but you should understand effects when you see them. Remember the three states from the fetch lesson: loading, success and error.

## A worked example

Hawa builds a menu app for a chop bar in Tamale. A \`Menu\` component holds the list of dishes and the search text in state. It passes the filtered dishes to a \`DishList\`, which renders a \`DishCard\` for each, with the dish's \`id\` as the key. Each card has an "Add" button that calls a function passed down as a prop. The data flows down, actions flow up, and every piece is small enough to understand.

## Keep it light

Each library you add increases what phones download. Reach for plain React first, and add packages only when they clearly save effort.`,
      practice_task_md: `**Goal:** a small React app using props, state and lists.

1. In your Vite React project (or a React template in a browser editor such as StackBlitz), create a \`Menu\` component with an array of at least six dishes, each with \`id\`, \`name\` and \`price\`.
2. Create a \`DishCard\` component that receives a dish through props and shows its name and price in cedis.
3. Render the list with \`map\` and a proper \`key\`.
4. Add a search input whose value lives in \`useState\`, and show only matching dishes.
5. Add an "Add to order" button on each card that updates an order count held in \`Menu\` (lifting state up).

**Done looks like:** a working menu that filters as you type and counts orders, with at least three components. Deploy or commit it and explain in the README where state lives and why.`,
      quiz: {
        questions: [
          {
            prompt: "What are props in React?",
            options: ["Data a component remembers between renders", "CSS files", "Server addresses", "Inputs passed from a parent to a child component"],
            answer_index: 3,
            explanation: "Props are inputs, like function arguments, flowing from parent to child.",
          },
          {
            prompt: "What happens when you call the setter from `useState`?",
            options: ["React re renders the component with the new value", "Nothing until the page reloads", "The component is deleted", "React reloads the whole page from the server with the value"],
            answer_index: 0,
            explanation: "Calling the setter tells React to re render with new state.",
          },
          {
            prompt: "Why does each item in a rendered list need a stable, unique `key`?",
            options: ["To style the item", "To make it a link", "Keys tell screen readers how many items are in the list", "To help React update the right items efficiently"],
            answer_index: 3,
            explanation: "Keys let React track which items changed.",
          },
          {
            prompt: "Two sibling components need the same search text. What does the lesson suggest?",
            options: ["Lift the state to their closest common parent and pass it down", "Give each sibling its own copy of the state and keep them in sync", "Store it in a CSS variable", "Reload the page each time"],
            answer_index: 0,
            explanation: "Lifting state up gives both siblings one source of truth.",
          },
          {
            prompt: "Which hook runs code after rendering, for things such as fetching data?",
            options: ["useState", "useKey", "useProps", "useEffect"],
            answer_index: 3,
            explanation: "useEffect handles work outside React after render.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "typescript": {
      explanation_md: `TypeScript appeared in many of the adverts we studied, including entry level roles at an Accra fintech and a National Service placement. It is JavaScript with types added. Types describe what kind of value something is, so your editor can warn you about mistakes before your users find them.

## Why types help

In plain JavaScript, this bug only shows up when someone uses the page:

\`\`\`js
addFee("15", 5); // "155" instead of 20
\`\`\`

In TypeScript, you say what the function expects:

\`\`\`ts
function addFee(price: number, fee: number): number {
  return price + fee;
}
addFee("15", 5); // error before you even run it
\`\`\`

Your editor underlines the mistake immediately. On a team, that saves hours.

## The basic types

\`\`\`ts
let town: string = "Bolgatanga";
let stock: number = 12;
let open: boolean = true;
let items: string[] = ["rice", "beans"];
\`\`\`

Often you do not need to write the type, because TypeScript infers it: \`let stock = 12\` is already known to be a number.

## Describing objects

Use a \`type\` (or an \`interface\`) to describe the shape of an object:

\`\`\`ts
type Product = {
  id: string;
  name: string;
  price: number;
  photo?: string; // optional
};
\`\`\`

The \`?\` means the property may be missing. TypeScript will then remind you to handle that case.

## Union types

A value that can be one of a few options:

\`\`\`ts
type PayStatus = "pending" | "success" | "failed";
\`\`\`

If you mistype \`"sucess"\`, TypeScript catches it. This is very useful for payment states and loading states.

## TypeScript with React

Props get a type too:

\`\`\`tsx
type Props = { name: string; price: number };

function PriceTag({ name, price }: Props) {
  return <p>{name}: GH₵ {price}</p>;
}
\`\`\`

Now anyone using \`PriceTag\` without a price gets a clear error.

## Data from APIs

TypeScript cannot check data arriving from a server at runtime. Describe the shape you expect, but still handle missing or wrong data gracefully, especially on unreliable networks.

## Getting started

TypeScript files end in \`.ts\` or \`.tsx\`. Vite and Next.js projects can be created with TypeScript from the start. Types are removed when the project is built, so they add nothing to what phones download.

## A worked example

Issahaku converts his menu app to TypeScript. He defines a \`Dish\` type and types his component props. Straight away the editor shows two places where he passed a price as text. He fixes them, and a bug that would have shown "GH₵ 155" instead of "GH₵ 20" on a customer's phone never happens.

Start by typing function inputs, props and API data. That covers most of the benefit.`,
      practice_task_md: `**Goal:** convert a small project to TypeScript.

1. Create a new Vite project choosing React with TypeScript, or a TypeScript template in a browser editor such as StackBlitz.
2. Define a \`Dish\` type with \`id\`, \`name\`, \`price\` and an optional \`photo\`.
3. Define a union type \`OrderStatus\` with at least three states.
4. Rebuild your menu components with typed props.
5. Deliberately pass a wrong type (a price as text) and read the error. Then fix it.
6. Run \`npm run build\` and confirm there are no type errors.

**Done looks like:** a TypeScript project that builds with no errors, with your types defined clearly at the top of the file. Commit it and note in the README one bug TypeScript caught for you.`,
      quiz: {
        questions: [
          {
            prompt: "What does TypeScript add to JavaScript?",
            options: ["Faster images", "A new browser", "Types that let your editor catch mistakes early", "A faster engine that makes JavaScript run quicker on phones"],
            answer_index: 2,
            explanation: "TypeScript adds types so errors appear before code runs.",
          },
          {
            prompt: "What does the `?` mean in `photo?: string`?",
            options: ["The property may be missing", "The property is required", "The property is a number", "The property is private"],
            answer_index: 0,
            explanation: "A question mark marks an optional property.",
          },
          {
            prompt: "Why is `type PayStatus = \"pending\" | \"success\" | \"failed\"` useful?",
            options: ["It makes payments faster", "It encrypts the status", "It limits the value to known options, so typos are caught", "It checks the status from the server while the app is running"],
            answer_index: 2,
            explanation: "Union types restrict values to a set of allowed options.",
          },
          {
            prompt: "Does TypeScript check data arriving from a server while the app runs?",
            options: ["Yes, it checks every server response while the app runs", "Only on Android", "Only for numbers", "No, so you must still handle missing or wrong data"],
            answer_index: 3,
            explanation: "Types are removed at build time and cannot check runtime data.",
          },
          {
            prompt: "Do TypeScript types increase what users' phones download?",
            options: ["Yes, a lot", "Yes, each type adds a little extra code to the download", "Only in React", "No, types are removed when the project is built"],
            answer_index: 3,
            explanation: "Types disappear in the built JavaScript.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "nextjs": {
      explanation_md: `Next.js appeared in several of the adverts we studied, both in Accra and remote roles. It is a framework built on React that adds routing, server rendering and data loading. This topic is optional: you can get a junior role knowing React and TypeScript well, but Next.js knowledge makes you a stronger candidate.

## What it adds to React

Plain React runs in the browser. The phone downloads JavaScript, runs it, and only then shows the page. Next.js can do much of that work on the server, so the phone receives ready HTML.

* **Routing from folders.** In the \`app\` folder, each folder is part of an address, and a \`page.tsx\` file inside makes it a page. \`app/menu/page.tsx\` becomes \`/menu\`.
* **Server components.** By default, pages and layouts run on the server. Their code is not sent to the phone, only the result.
* **Client components.** Components that need state or event handlers start with the line \`"use client"\`.
* **Built in tools** for images, fonts and links that help performance.

## Why this matters for slow networks

When the server sends finished HTML, a user on a weak connection sees content sooner and their phone does less work. Search engines also read the content more easily, which helps local businesses get found.

\`\`\`tsx
// app/menu/page.tsx (server component)
export default async function MenuPage() {
  const dishes = await getDishes();
  return (
    <ul>
      {dishes.map((d) => <li key={d.id}>{d.name}</li>)}
    </ul>
  );
}
\`\`\`

The data is loaded on the server. The phone receives a finished list.

## Client components for interactivity

\`\`\`tsx
"use client";
import { useState } from "react";

export function AddButton() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Add ({n})</button>;
}
\`\`\`

A good habit: keep most of the page as server components and use small client components only where you need interaction. That keeps the JavaScript sent to phones small.

## Images

The \`Image\` component from \`next/image\` resizes images, serves modern formats and lazy loads by default, which helps on slow networks.

## Keep up with the docs

Next.js changes often between versions. Always check the official documentation at nextjs.org for the version you are using rather than relying on old tutorials.

## A worked example

Amina rebuilds a church events site in Next.js. The events list is a server component that loads data on the server. Only the "Remind me" button is a client component. With the network throttled in DevTools, the events now appear quickly, because the phone receives ready HTML instead of waiting for a large script.`,
      practice_task_md: `**Goal:** a small Next.js site with server and client components.

1. On WiFi, follow the free Next.js Learn course at nextjs.org/learn far enough to create a project, or start one with \`npx create-next-app@latest\`.
2. Create two pages: a home page and \`/events\`.
3. On \`/events\`, render a list of at least five events from an array in a server component.
4. Add one small client component, such as a "Remind me" button that counts taps.
5. Use the \`Image\` component for one photo.
6. Run Lighthouse in mobile mode and note the score.

**Done looks like:** a two page site where only the button is a client component, committed to GitHub with your Lighthouse result in the README.`,
      quiz: {
        questions: [
          {
            prompt: "How does Next.js create page addresses in the `app` folder?",
            options: ["From a routes.json file where you list every URL and the page it shows", "From the page title", "Routes must be added in CSS", "Folders form the route, and a page.tsx file inside makes it a page"],
            answer_index: 3,
            explanation: "Next.js uses folder based routing.",
          },
          {
            prompt: "Why can server rendering help users on slow networks?",
            options: ["It turns off images", "It makes data free", "The phone receives ready HTML and does less work", "It sends JavaScript first so the phone can build the HTML faster"],
            answer_index: 2,
            explanation: "Sending finished HTML shows content sooner on weak connections.",
          },
          {
            prompt: "Which line marks a component as a client component?",
            options: ["\"use server\"", "\"use react\"", "\"use phone\"", "\"use client\""],
            answer_index: 3,
            explanation: "Client components that need state or events start with use client.",
          },
          {
            prompt: "What habit keeps the JavaScript sent to phones small?",
            options: ["Make every component a client component so the phone does the rendering work", "Avoid HTML", "Mostly server components, with small client components only where needed", "Load every library on every page"],
            answer_index: 2,
            explanation: "Only client components send their code to the browser.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "design-to-code": {
      explanation_md: `Many adverts we studied mention Figma, UI implementation or turning designs into working pages. In agencies and product teams, a designer hands you a design and you build it. Doing that accurately, with reusable pieces, is a daily skill.

## Reading a Figma file

Figma, a common example of a design tool, runs in the browser and has a free plan. When a designer shares a file with you, you can usually inspect it even on a free account:

* Select any element to see its size, spacing, colours and font.
* Look for the **spacing** between elements, not just their sizes.
* Check for **styles or variables**, the named colours and text styles the designer reused.
* Look at every **state**: a button normally, when pressed, when disabled, and any error or empty screens.

## Find the system in the design

Good designs repeat a small set of values. Collect them as CSS custom properties, often called design tokens:

\`\`\`css
:root {
  --color-primary: #1b5e20;
  --color-text: #1f1f1f;
  --space-2: 8px;
  --space-4: 16px;
  --radius: 8px;
}
\`\`\`

Then use them everywhere: \`padding: var(--space-4);\`. If the brand colour changes, you update one line.

## Build components, not pages

Before coding, look at the design and list the pieces that repeat: a button, a card, an input with a label, a header. Build each as a reusable component, then assemble the screens. This is called component driven development, and adverts mention it directly.

## CSS frameworks and component libraries

Several adverts mention Tailwind CSS or a component library. Tailwind gives you small utility classes you combine in your markup:

\`\`\`html
<button class="rounded-lg bg-green-800 px-4 py-2 text-white">
  Order now
</button>
\`\`\`

These tools speed teams up and keep spacing consistent. Learn plain CSS first, so you understand what the classes do, then pick one up when a project or team uses it.

## Mobile designs and missing details

Designs often show only a large screen. Ask the designer for the phone version, or make sensible decisions using your mobile first skills and confirm them. Also ask about anything missing: long names, empty lists, slow loading, errors. Asking good questions early is a sign of a strong developer.

## Accessibility checks on the design

Check the colours in the design for contrast and make sure tap targets are big enough before you build. It is easier to fix in the design than after.

## A worked example

Mariama receives a Figma design for a Bolgatanga craft shop. She notes four colours, three text sizes and a spacing scale, and writes them as tokens. She builds a \`Button\`, a \`ProductCard\` and a \`Header\` component, then assembles the home and product pages. The design shows no empty cart screen, so she asks the designer, who adds one. Her finished pages match the design and are easy to change.`,
      practice_task_md: `**Goal:** turn a free community design into working code.

1. Create a free Figma account and open a free community file of a simple mobile screen, such as a shop or event app (search the Figma Community).
2. Inspect it and write down the colours, font sizes and spacing values as CSS custom properties.
3. List the repeating components (for example button, card, input).
4. Build each component, then assemble one full screen using your tokens.
5. Compare your build with the design side by side on a phone and fix differences.
6. Write down two questions you would ask the designer about missing states.

**Done looks like:** one screen that closely matches the design, built from reusable components and tokens, with your designer questions in the README.`,
      quiz: {
        questions: [
          {
            prompt: "What should you look for when inspecting a Figma design, besides sizes?",
            options: ["Only the logo", "The export settings for turning each frame into one big image", "The file size", "Spacing, colour, text styles and every state of each element"],
            answer_index: 3,
            explanation: "Spacing, styles and states are what make a build accurate.",
          },
          {
            prompt: "What are design tokens in CSS?",
            options: ["Payment codes", "Short codes Figma adds to each layer so developers can find it", "Image formats", "Named custom properties for repeated colours and spacing"],
            answer_index: 3,
            explanation: "Tokens like --color-primary keep values consistent and easy to change.",
          },
          {
            prompt: "What does component driven development mean?",
            options: ["Writing each page as one large component so the code stays in one place", "Designing without a designer", "Using only images for interfaces", "Building reusable components first, then assembling screens from them"],
            answer_index: 3,
            explanation: "You build reusable pieces first and combine them into pages.",
          },
          {
            prompt: "What should you do if a design only shows a large screen?",
            options: ["Refuse to build it", "Build only the large screen and let the phone browser scale it down", "Ask for the phone version, or decide mobile first and confirm", "Shrink it with CSS zoom"],
            answer_index: 2,
            explanation: "Ask or decide using mobile first skills, then confirm with the designer.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "real-products": {
      explanation_md: `Tutorials teach skills. Real products teach judgement. This section applies everything you have learned to features that Ghanaian products actually need, and the projects you build here can become the strongest pieces in your portfolio.

## What makes a product feel local

Products that work well in Ghana share some traits:

* **Mobile money first.** Many people pay with mobile money rather than cards, so checkout screens must handle that flow clearly.
* **Patchy networks.** Signal changes as people move between towns and bundles run out. Products must handle waiting, failure and offline moments gracefully.
* **Low cost phones.** Pages must be light and fast on modest Android devices.
* **Sharing by link.** People share links on WhatsApp, so pages need to load quickly from a shared link and look right in a preview.

## What this section covers

* **Mobile money checkout screens:** entering a number, waiting for the approval prompt, and clearly showing success, failure or pending.
* **Offline friendly apps (optional):** progressive web app techniques that keep useful content available without a connection.
* **Deploying on free hosting:** putting your projects online with a link anyone can open.

## Thinking like a product developer

For every feature, ask:

1. **Who is using this, and on what device?** A trader in Tamale market, a nurse in Wa, a student in Damongo.
2. **What happens on a slow or dropped connection?** Design the loading, error and retry states.
3. **What could go wrong with money or data?** Double payments, lost orders, unclear status.
4. **How do I know it works?** Test it on a real phone with a throttled network.

## Build for real people

Wherever you can, build for someone real: a relative's shop, a school, a church, a cooperative, an NGO. Ask what problem they have, build a small solution, and let them use it. Even a simple, live page that someone actually uses tells an employer far more than a copied tutorial.

Be honest in how you present these projects. If the payment screens use a test mode with no real money, say so. Employers value honesty, and real feedback from a real user is worth more than invented numbers.

## A worked example

Fuseini's aunt sells shea butter in Tamale and takes orders over WhatsApp. He builds her a one page shop: a product list, an order form, and a checkout screen designed for mobile money, running in a provider's test mode. He makes the page light enough to open quickly from a WhatsApp link and deploys it free. His aunt starts sharing the link with customers. In interviews, Fuseini can explain every decision, and that story stands out.`,
      practice_task_md: `**Goal:** plan a real product project.

1. Find one real person or organisation near you with a problem a simple website could help with: a shop, school, church, cooperative or NGO.
2. Talk to them (in person, by call or on WhatsApp). Write down their problem in two sentences.
3. List the users and the devices they likely use.
4. Write the main features (no more than four), and for each, what happens on a slow or dropped connection.
5. Sketch the main screens on paper and take photos.

**Done looks like:** a one page project plan with the problem, users, features, network plan and sketches, ready to share with a mentor before you start building.`,
      quiz: {
        questions: [
          {
            prompt: "Why must Ghanaian checkout screens handle mobile money clearly?",
            options: ["Cards are not allowed in Ghana", "Mobile money works without internet, so the page can stay offline", "Many people pay with mobile money rather than cards", "Mobile money is only used by businesses"],
            answer_index: 2,
            explanation: "Mobile money is a common way people pay.",
          },
          {
            prompt: "Why should pages load quickly from a shared link?",
            options: ["Links expire after one minute", "People often share links on WhatsApp", "Search engines require it by law", "Shared links cannot show images"],
            answer_index: 1,
            explanation: "Sharing by link is common, so pages must load well from a shared link.",
          },
          {
            prompt: "Which question should you ask for every feature, according to the lesson?",
            options: ["What happens on a slow or dropped connection?", "How many animations can I add?", "Which font is most popular?", "How can I hide errors?"],
            answer_index: 0,
            explanation: "Planning for weak connections is part of every feature.",
          },
          {
            prompt: "How should you present a payment project that runs in test mode?",
            options: ["Claim it handles real money", "Invent sales figures", "Hide that it exists", "Say honestly that it uses a test mode"],
            answer_index: 3,
            explanation: "Honesty about what your project does builds trust with employers.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "payment-flows": {
      explanation_md: `Several adverts we studied came from payments companies. Mobile money checkout is a flow where clear design really matters: people are nervous about their money, networks are unreliable, and confusion leads to lost sales or double payments.

## How a mobile money payment usually works

Details vary by provider, but the common flow is:

1. The customer chooses mobile money and enters their number and network (for example MTN MoMo, Telecel Cash or AT Money).
2. Your app asks your **server** to start the payment. The server talks to the payment provider using secret keys. Never put those keys in frontend code.
3. The provider sends an approval prompt to the customer's phone. Some providers send a one time code first, or ask the customer to approve from their mobile money menu. The customer enters their PIN **on their own phone**, not in your app.
4. The payment is **pending** until the customer approves or the request times out.
5. The provider tells your server the result, and your app shows success or failure.

**Never collect a mobile money PIN in your own form.** The provider handles that step. A site asking for a PIN looks like a scam, and it is unsafe.

## Design every state

* **Enter details:** a phone number field with \`type="tel"\`, the network choice, and the amount shown clearly in cedis.
* **Waiting for approval:** "Check your phone and approve the payment of GH₵ 50". Show a simple progress indicator and keep the screen calm.
* **Success:** a clear confirmation with a reference number the customer can screenshot.
* **Failed or declined:** say what happened in plain words and offer to try again.
* **Timed out or unknown:** this is the tricky one. Say "We have not received confirmation yet" and offer to check the status, not just "Try again", which could charge twice.

## Preventing double payments

* Disable the Pay button as soon as it is tapped.
* Show the waiting screen immediately.
* Check the payment status from your server before offering a retry.

\`\`\`ts
type PayState =
  | "idle" | "starting" | "awaiting_approval"
  | "success" | "failed" | "unknown";
\`\`\`

A union type like this makes sure your interface handles every state.

## Test mode

Payment providers offer test or sandbox modes so you can build the whole flow without real money. Use them for portfolio projects and say so clearly.

## A worked example

Wumpini builds a checkout for a school fees demo. After tapping Pay, the button disables and the screen says "Approve GH₵ 300 on your phone". If her test server reports a timeout, the screen shows "Still waiting for confirmation" with a "Check status" button instead of "Pay again". A reviewer at an Accra fintech can see straight away that she understands real payment risks.`,
      practice_task_md: `**Goal:** build the screens for a mobile money checkout using fake data.

1. Build a checkout page with a phone number field, a network choice (native \`select\` or radio buttons) and the amount in cedis.
2. Define a state type like \`idle\`, \`starting\`, \`awaiting_approval\`, \`success\`, \`failed\`, \`unknown\`.
3. Simulate the server with a function that waits a few seconds (using \`setTimeout\`) and returns a random result.
4. Build a clear screen for every state, including a "Check status" option for \`unknown\`.
5. Disable the Pay button after one tap.
6. Make sure there is no PIN field anywhere.

**Done looks like:** a demo you can click through every state of, with a README explaining how you prevent double payments and why there is no PIN field.`,
      quiz: {
        questions: [
          {
            prompt: "Where does the customer enter their mobile money PIN?",
            options: ["In a secure field on your checkout page, sent over HTTPS", "On the approval prompt on their own phone", "In an email", "In the browser console"],
            answer_index: 1,
            explanation: "The provider's prompt on the phone collects the PIN, never your form.",
          },
          {
            prompt: "Why must payment secret keys stay off the frontend?",
            options: ["Anyone can read frontend code and steal the keys", "Keys stop working when the page is reloaded on a phone", "Keys only work in CSS", "Browsers delete keys"],
            answer_index: 0,
            explanation: "Frontend code is visible to users; secrets belong on the server.",
          },
          {
            prompt: "What should the screen offer when the payment result is unknown or timed out?",
            options: ["Say confirmation has not arrived and offer to check the status", "A Pay again button straight away so the customer does not wait", "Nothing, just a blank screen", "A request for the PIN"],
            answer_index: 0,
            explanation: "Checking status first avoids charging the customer twice.",
          },
          {
            prompt: "Which step helps prevent double payments?",
            options: ["Disabling the Pay button as soon as it is tapped", "Making the button bigger", "Hiding the amount", "Removing the waiting screen"],
            answer_index: 0,
            explanation: "Disabling the button stops repeated taps from sending more requests.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "offline-and-pwa": {
      explanation_md: `Many users in Ghana buy small data bundles, travel between towns with patchy signal, or lose connection when a bundle runs out mid task. An app that still shows useful content offline feels far more reliable. Progressive web app (PWA) techniques make this possible with web technology alone. This topic is optional but valuable for products serving northern Ghana.

## What a PWA is

A progressive web app is a website that can:

* Be **installed** to the home screen, opening like an app without an app store.
* **Work offline or on poor connections**, by saving important files on the phone.
* Load faster on repeat visits, because files come from the phone instead of the network.

## The two pieces

**1. A web app manifest.** A small JSON file describing your app's name, icons and colours, linked from your HTML:

\`\`\`html
<link rel="manifest" href="/manifest.json">
\`\`\`

\`\`\`json
{
  "name": "Tamale Market Prices",
  "short_name": "Prices",
  "start_url": "/",
  "display": "standalone",
  "icons": [{ "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" }]
}
\`\`\`

**2. A service worker.** A script that sits between your page and the network. It can save files in a cache and serve them when the network fails.

\`\`\`js
// register it from your page
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
\`\`\`

Inside \`sw.js\`, you decide a caching strategy. Two common ones:

* **Cache first:** serve from the cache, fall back to the network. Good for files that rarely change, like your logo and CSS.
* **Network first:** try the network, fall back to the cache. Good for data that should be fresh but is still useful when slightly old, like today's prices.

Service workers need HTTPS, which free hosts provide. On your own computer, \`localhost\` also works for testing.

## Be honest with users offline

When showing saved data, say so: "You are offline. Showing prices from 8:15 this morning." If someone fills a form offline, either save it and send it later with clear messaging, or tell them plainly it will need a connection.

## Use tools when ready

Writing a service worker by hand teaches you how it works. Libraries such as Workbox help in larger projects. Start by hand with a simple cache, then reach for tools.

## A worked example

Hawa builds a price list app for traders. She adds a manifest so it can be installed, and a service worker that caches the page, CSS and icons with cache first, and fetches prices with network first. When she switches DevTools to offline, the app still opens and shows yesterday's prices with a clear "offline" banner. A trader travelling from Tamale to Yendi can still check prices with no signal.`,
      practice_task_md: `**Goal:** make one of your projects installable and usable offline.

1. Choose a small project, ideally a list of data such as prices or events.
2. Add a \`manifest.json\` with a name, start URL, display mode and at least one icon, and link it from your HTML.
3. Write a simple service worker that caches your HTML, CSS, JavaScript and icon on install, and serves them cache first.
4. Register the service worker from your page.
5. Deploy the project to a free HTTPS host (see the next lesson) or test on localhost.
6. In DevTools, use the Application panel to check the manifest and service worker, then switch the network to offline and reload.
7. Add a visible message when the page is offline.

**Done looks like:** the app opens offline, shows a clear offline message, and can be added to a phone's home screen. Explain your caching choices in the README.`,
      quiz: {
        questions: [
          {
            prompt: "What does a web app manifest describe?",
            options: ["The server's password", "The app's name, icons and colours for installing", "The CSS layout", "The database tables"],
            answer_index: 1,
            explanation: "The manifest tells the phone how to install and display the app.",
          },
          {
            prompt: "What does a service worker do?",
            options: ["Styles the page", "Runs on the server and pushes updated pages to each phone as they change", "Sits between page and network and can serve cached files offline", "Replaces HTML"],
            answer_index: 2,
            explanation: "Service workers can intercept requests and use a cache.",
          },
          {
            prompt: "Which caching strategy suits today's prices that should be fresh but still useful when old?",
            options: ["Cache only", "Never cache", "Network first, falling back to the cache", "Delete the cache every second"],
            answer_index: 2,
            explanation: "Network first tries for fresh data and falls back to saved data.",
          },
          {
            prompt: "What should you tell users when showing saved data offline?",
            options: ["Nothing", "That the server is broken", "That they are offline and when the data was saved", "That they must reinstall the app"],
            answer_index: 2,
            explanation: "Honest messaging helps users trust what they see.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "deploy-free": {
      explanation_md: `A live link you can share on WhatsApp or put on your CV is far more convincing than screenshots. Several adverts mention deployment and CI tools, and putting projects online is a skill in itself. The good news: you can host frontend projects for free.

## Static sites and free hosts

A **static site** is a set of files (HTML, CSS, JavaScript, images) that a host simply serves. Most of your portfolio projects are static, or can be built into static files.

Free options include:

* **GitHub Pages:** serves static sites straight from a GitHub repository.
* **Platforms such as Vercel, Netlify or Cloudflare Pages:** connect your GitHub repository and they build and deploy automatically on every push. They support React, Vite and Next.js projects.

All of these give you HTTPS for free, which is required for service workers and builds trust.

Free plans have limits and terms that change. Read each host's current free plan page before you rely on it.

## Deploying a plain HTML site with GitHub Pages

1. Push your project to a GitHub repository with an \`index.html\` at the top level.
2. In the repository, go to **Settings**, then **Pages**.
3. Choose to deploy from your main branch.
4. After a short wait, your site is live at an address like \`yourname.github.io/project-name\`.

## Deploying a React or Vite project

These projects need a **build** step, which turns your source into optimised static files:

\`\`\`bash
npm run build
\`\`\`

The result usually goes into a \`dist\` or \`build\` folder. Platforms that connect to GitHub run this step for you. You tell them the build command and the output folder, and every push updates the live site.

## Preview deployments

Many platforms create a separate preview link for every pull request. Teams use this to review changes before merging. Using it on your own projects shows employers you know a professional workflow.

## Environment variables and secrets

Never commit API keys. Hosts let you set environment variables in their dashboard. Remember that anything used in frontend code is visible to users, so truly secret keys belong only on a server.

## Check it on a phone and a computer

After deploying, open the live link on a phone using mobile data, and on a laptop or desktop browser. Run Lighthouse or PageSpeed Insights on the live address. Check the link preview by sending it to yourself on WhatsApp.

## A worked example

Sumaila finishes his bus times page. He pushes it to GitHub and turns on GitHub Pages. Five minutes later he sends the link to his study group. One friend reports that an image is missing; Sumaila sees the file name has a capital letter that worked on his laptop but not on the server. He fixes it, pushes, and the site updates. Now every new commit goes live automatically.`,
      practice_task_md: `**Goal:** put two projects online with live links.

1. Deploy a plain HTML project with GitHub Pages using the steps in the lesson.
2. Deploy a React or Vite project by connecting its GitHub repository to a free platform. Set the build command and output folder.
3. Make a small change, push it, and check that the live site updates.
4. Open both live links on a phone with mobile data and on a computer. Run PageSpeed Insights on each.
5. Send one link to yourself on WhatsApp and check the preview.
6. Add the live link to the top of each README.

**Done looks like:** two working live links, each in its README, that load well on a phone and a computer.`,
      quiz: {
        questions: [
          {
            prompt: "What is a static site?",
            options: ["A site with no images", "A site that never changes colour", "Prebuilt HTML, CSS and JavaScript files a host simply serves", "A site whose server builds a fresh page for every single visitor"],
            answer_index: 2,
            explanation: "Static sites are prebuilt files served as they are.",
          },
          {
            prompt: "What does `npm run build` usually produce?",
            options: ["Optimised static files in a folder like dist or build", "A Figma file", "A database", "A new Git branch called build that holds the deployable code"],
            answer_index: 0,
            explanation: "The build step turns source code into files ready to host.",
          },
          {
            prompt: "Why should you read a host's current free plan page?",
            options: ["It is required to use HTML", "Free plans have limits and terms that change", "It makes your site faster", "Reading it unlocks the free plan, which stays free forever"],
            answer_index: 1,
            explanation: "Terms change, so check before you rely on them.",
          },
          {
            prompt: "Where should truly secret API keys live?",
            options: ["In frontend JavaScript", "In the README", "Only on a server", "In the page title"],
            answer_index: 2,
            explanation: "Anything in frontend code is visible, so secrets belong on a server.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-hired": {
      explanation_md: `Skills alone do not get you hired. You also need proof of what you can do, and a way of showing it to the right people. This section is about turning your learning into income, whether through a job at a Ghanaian company, a remote role, or freelancing for local businesses.

## Three routes to income

* **A job in Ghana.** Tech companies, fintechs, agencies, ecommerce businesses and some public institutions hire web developers. Entry routes include internships and National Service placements, which several adverts we studied were for.
* **A remote job.** Some companies hire developers anywhere in the world. Competition is strong, so your portfolio and communication must be excellent.
* **Freelancing.** Local shops, schools, churches and NGOs need simple websites. This can bring income while you look for a job, and it gives you real projects.

Many people combine these: freelancing while applying for jobs.

## What employers look for

Across the adverts we studied, a few things came up again and again beyond technical skills:

* **Proof:** projects with live links and readable code.
* **Communication:** clear written and spoken English, and explaining technical ideas to non technical people.
* **Collaboration:** using Git and pull requests, taking feedback, working in a team.
* **Learning on your own:** picking up new tools without needing a class.

## What this section covers

* **A portfolio employers trust:** choosing and presenting your best projects.
* **Freelancing for local businesses (optional):** finding clients, scoping work and pricing in cedis.
* **Job search and technical interviews:** your CV, profiles, applications and interview practice.

## Be patient and persistent

Getting the first role usually takes many applications. Rejections are normal and are not a judgement of your worth. Treat each one as practice, ask for feedback when you can, and keep building. Many developers find their first opportunity through people they know, such as a mentor, a tech community, a former classmate or a client, so stay connected.

## Stay honest

Never claim skills you do not have, invent experience or present someone else's work as your own. Employers check, and trust is hard to rebuild. It is fine to say "I have not used that yet, but here is how I would learn it."

## A worked example

Amina from Nalerigu finishes this roadmap with four solid projects. She builds a simple site for a local clinic as her first paid freelance job. She puts it, with the clinic's permission, at the top of her portfolio. She applies to National Service placements and junior roles in Accra and to a few remote internships, practising interview questions with her SydCrest study group each week. Her clinic project and clear explanations get her through to interviews.`,
      practice_task_md: `**Goal:** a written plan for getting your first paid work.

1. Decide which route or routes you will pursue first: a Ghanaian job, remote work, freelancing, or a mix.
2. List your current projects and mark which are strong enough to show employers.
3. Write down three people or communities who could help you find opportunities (a mentor, a tech hub, a WhatsApp group, a former teacher).
4. Set a weekly target, for example two applications and one hour of portfolio work.
5. Share your plan with a mentor or study partner.

**Done looks like:** a one page plan with your chosen routes, project list, contacts and weekly targets.`,
      quiz: {
        questions: [
          {
            prompt: "Which three routes to income does the lesson describe?",
            options: ["Only remote jobs", "Selling phones, teaching and farming", "A job in Ghana, a remote job, and freelancing", "Only government jobs"],
            answer_index: 2,
            explanation: "The lesson covers local jobs, remote jobs and freelancing.",
          },
          {
            prompt: "Besides technical skills, what do employers look for, according to the lesson?",
            options: ["Proof, communication, teamwork and learning on your own", "Expensive laptops", "A computer science degree and high university grades", "A large social media following"],
            answer_index: 0,
            explanation: "These came up again and again in the adverts studied.",
          },
          {
            prompt: "How should you treat rejections?",
            options: ["As normal practice, asking for feedback when you can", "As proof you should stop", "As a reason to invent experience", "As a sign to apply to many more jobs without changing anything"],
            answer_index: 0,
            explanation: "Rejections are normal and a chance to improve.",
          },
          {
            prompt: "What should you say about a tool you have not used yet?",
            options: ["Say you have used it, then learn it quickly before your first day", "Change the subject", "Say you have not used it and explain how you would learn it", "Say the tool is useless"],
            answer_index: 2,
            explanation: "Honesty builds trust with employers.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "portfolio": {
      explanation_md: `Hiring managers in Accra and remote teams often look at your projects before they read your CV. A strong portfolio is your best evidence. It does not need to be fancy; it needs to be clear, honest and easy to check on a phone or a laptop.

## Quality over quantity

Show three to five of your best projects, not every exercise you have done. A good mix:

* One project built for a **real person or organisation**, such as a shop, school or NGO.
* One **interactive JavaScript or React app** that loads data and handles loading and errors.
* One project showing **accessibility and performance** care, with before and after results.
* Optionally, a **payment flow** or **offline** project that shows you understand Ghanaian users.

Projects built for real users count for more than copies of tutorials. If you followed a tutorial, change it substantially and say what you added.

## What each project needs

For every project, provide:

1. **A live link** that works on a phone and a computer.
2. **A GitHub repository** with a clean commit history.
3. **A clear README** answering:
   * What problem does this solve, and for whom?
   * What did you build, and with which tools?
   * What was hard, and how did you solve it?
   * How did you test accessibility and performance?
   * What would you improve next?
4. **A screenshot or short screen recording** at the top of the README.

## Your portfolio page

A simple one page site is enough: your name, one line about what you do, your projects with links, and how to contact you. Build it yourself with HTML and CSS, keep it fast, and make it accessible. Your portfolio is itself a sample of your work, so run Lighthouse on it.

## Be honest

* Only include work you did. For team projects, say exactly which parts were yours.
* Do not invent users, clients or results. If a project runs in test mode, say so.
* Ask permission before showing a client's site, and respect any private information.

## Keep it current

Add new projects as you improve and remove weaker ones. Pin your best repositories on your GitHub profile and write a short profile README.

## A worked example

Issahaku's portfolio shows four projects. The first is a live site for a tailoring business in Wa, with a README explaining how he cut the page weight so it loads well on customers' phones. The second is a React menu app with tests. The third is a mobile money checkout demo in test mode, explaining how it prevents double payments. The fourth is an accessible school results page tested with TalkBack. Each README is short and clear. When interviewers ask about his work, he can open any of them on his phone and explain every decision.`,
      practice_task_md: `**Goal:** a portfolio page with your best three to five projects.

1. Choose your three to five strongest projects using the mix in the lesson.
2. For each, make sure there is a live link, a clean repository and a README answering the five questions.
3. Add a screenshot to each README.
4. Build a simple one page portfolio site with HTML and CSS, linking every project.
5. Run Lighthouse on your portfolio and fix any accessibility or performance issues.
6. Deploy it and pin your best repositories on GitHub.

**Done looks like:** a live portfolio link that loads quickly on a phone and a computer, with three to five projects that each have a live link and a clear README. Share it with your mentor for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "How many projects does the lesson suggest showing?",
            options: ["Every exercise you have done", "Exactly one", "At least twenty", "Three to five of your best"],
            answer_index: 3,
            explanation: "Quality matters more than quantity.",
          },
          {
            prompt: "Which kind of project counts for more than a tutorial copy?",
            options: ["A project with the most colours", "A project with no README", "A project built for a real person or organisation", "A project that copies a famous app's design pixel for pixel"],
            answer_index: 2,
            explanation: "Real projects show judgement and real problem solving.",
          },
          {
            prompt: "What should a project README explain?",
            options: ["Only the project name", "Your salary expectations", "The problem, what you built, what was hard, and how you tested it", "The full list of every tool you installed and every command you ran"],
            answer_index: 2,
            explanation: "A good README tells the story of the project.",
          },
          {
            prompt: "What should you do with a team project in your portfolio?",
            options: ["Claim you built all of it", "Say exactly which parts were yours", "Leave out the team", "Remove the link"],
            answer_index: 1,
            explanation: "Being clear about your role keeps your portfolio honest.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "freelancing-for-smes": {
      explanation_md: `Small businesses across Ghana, from shops in Tamale to schools in Bolgatanga, need simple websites and landing pages. Freelancing for them can bring income while you look for a job, and it gives you real projects for your portfolio. One Accra retail company in our research advertised for a web developer who also knew Shopify and WordPress, which shows these skills have local demand.

## What small businesses often need

* A **one page site** with what they sell, prices, location, opening hours and a WhatsApp link.
* A **menu or catalogue** that is easy to update.
* An **order or booking form**.
* Sometimes an **online shop**, often on a platform such as Shopify or WordPress with WooCommerce, which you can customise.

Many owners care most that the site loads quickly, looks trustworthy and brings customers. Keep it simple.

## Finding clients

* Start with people who know you: family, your church or mosque, your old school, local shops you use.
* Build one excellent example site, then show it to similar businesses.
* Ask every happy client for a referral and, with permission, a short honest quote.
* Join local tech and business WhatsApp groups and hubs.

## Scope: agree in writing

Before starting, write a short scope and share it, even on WhatsApp:

* What you will build (for example, a one page site with five sections and a contact form).
* What you will not do (for example, writing all the text or taking photos).
* What the client must provide (logo, photos, prices).
* How many rounds of changes are included.
* The deadline and the price in cedis.
* Who pays for the domain and any hosting.

Clear scope prevents arguments and unpaid extra work.

## Pricing

There is no fixed rate. Consider how long the work will take, what similar local developers charge, and what the site is worth to the business. Ask for part of the payment before you start, for example half, and the rest on delivery. Mobile money makes this easy. Keep a simple record of payments.

## Handing over

* Make sure the client owns their domain and accounts, in their name.
* Show them how to make simple updates, or agree a small monthly fee for updates.
* Give them a short written guide.

## A worked example

Mariama builds a site for a pharmacy in Bolgatanga. She writes a scope on WhatsApp: one page, opening hours, services, location map link and a WhatsApp order button, two rounds of changes, delivered in two weeks, with half paid upfront by mobile money. The owner provides photos. She delivers on time, shows the owner how to change opening hours, and asks for a referral. A month later the owner recommends her to a nearby clinic.`,
      practice_task_md: `**Goal:** prepare to take your first freelance client.

1. Build one example site for a type of local business (real or realistic), such as a chop bar, pharmacy or tailor. Make it fast and phone friendly with a WhatsApp link.
2. Write a scope template you can reuse, covering what is included, what is not, what the client provides, rounds of changes, deadline, price in cedis and payment terms.
3. Write a short message you could send to a business owner offering your service, in plain friendly language.
4. Write a one page handover guide template explaining how to make a simple update.

**Done looks like:** a live example site, a scope template, an outreach message and a handover guide, ready to share with a mentor for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "What do many small business owners care about most in a website?",
            options: ["Complex animations", "Using the newest framework", "That it loads fast, looks trustworthy and brings customers", "Having many pages and animations so it looks like a big brand"],
            answer_index: 2,
            explanation: "Simple, fast and trustworthy sites serve small businesses best.",
          },
          {
            prompt: "Why agree the scope in writing before starting?",
            options: ["It is required by every bank", "It makes the site load faster", "So you can skip testing", "It prevents arguments and unpaid extra work"],
            answer_index: 3,
            explanation: "A clear scope sets expectations on both sides.",
          },
          {
            prompt: "What payment approach does the lesson suggest?",
            options: ["Ask for part before starting and the rest on delivery", "Never ask for payment", "Ask for ten times the price", "Accept the full payment only after the site has run for a year"],
            answer_index: 0,
            explanation: "Partial upfront payment reduces your risk.",
          },
          {
            prompt: "Whose name should the client's domain and accounts be in?",
            options: ["The developer's", "No one's", "The client's", "A random friend's"],
            answer_index: 2,
            explanation: "Clients should own their own domain and accounts.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "job-search": {
      explanation_md: `Finding your first frontend role takes a clear CV, honest profiles, steady applications and interview practice. Remote adverts we studied often stressed written English and communication, and Ghanaian roles included internships and National Service placements. This lesson brings it together.

## Your CV

Keep it to one page:

* **Top:** name, town, phone, email, portfolio link, GitHub link.
* **Summary:** two lines, such as "Frontend developer building fast, accessible sites for phones and laptops. React, TypeScript, testing."
* **Projects:** your best two or three, each with one line on the problem and one on what you built, plus a link.
* **Skills:** only what you can discuss in an interview.
* **Experience and education:** include freelance work, National Service, volunteering and SydCrest.

Tailor the summary and skills order to each advert. Save it as a PDF with a clear file name, such as \`Wumpini-Frontend-CV.pdf\`.

## Your profiles

Keep your GitHub and LinkedIn consistent with your CV. Pin your best repositories. A clear photo and a one line headline help. Post occasionally about what you are building.

## Where to look

* Ghanaian job boards and company career pages.
* Tech hubs, meetups and community WhatsApp groups.
* National Service placements with tech companies.
* Remote job boards that state they hire in Africa or worldwide. Read location rules carefully.

**Beware of scams.** A real employer never asks you to pay to apply or to be trained before starting.

## The interview stages

Many teams use some of these:

1. **Screening call:** tell your story in two minutes and explain why this role.
2. **Technical task:** a small take home project or live coding, often using HTML, CSS, JavaScript or React.
3. **Technical discussion:** walk through a portfolio project. Expect "why did you choose that?" and "what would you change?"
4. **Team or culture conversation:** how you handle feedback, deadlines and disagreements.

## Practising technical interviews

* **Think out loud.** Say what you are trying and why. Interviewers care about your reasoning.
* **Ask questions first.** Clarify the task before coding.
* **Start simple, then improve.** A working simple solution beats an unfinished clever one.
* **Know your projects deeply.** Be ready to explain any line.
* Practise with a study partner who plays the interviewer.

A few common topics: semantic HTML, flexbox versus grid, how \`fetch\` and \`async\` work, React state and props, and how you would make a page faster or more accessible.

## A worked example

Abdul-Rahman applies to a junior role at an Accra agency. For the take home task he builds a small product list, writes tests, handles loading and error states, and explains his choices in the README. In the discussion he walks through his mobile money demo, thinking out loud. He does not get that role, so he asks for feedback, learns that his tests were thin, improves them, and goes into his next application better prepared.`,
      practice_task_md: `**Goal:** a ready to send application pack and interview practice.

1. Write a one page CV using the structure in the lesson and save it as a PDF.
2. Update your GitHub profile: pin your best repositories and write a short profile README.
3. Find three real junior or intern adverts (Ghanaian or remote) and note which of your skills match and which you need to build.
4. Tailor your CV summary for one of them.
5. With a study partner, do a 20 minute mock interview: two minutes telling your story, then walking through one project and solving a small task out loud. Swap roles.

**Done looks like:** a PDF CV, an updated GitHub profile, notes on three adverts, and written feedback from one mock interview.`,
      quiz: {
        questions: [
          {
            prompt: "How long should your CV be for a junior frontend role?",
            options: ["Five pages", "As long as possible", "A single sentence", "One page"],
            answer_index: 3,
            explanation: "A clear one page CV is easiest for employers to read.",
          },
          {
            prompt: "What should you do during a live coding task?",
            options: ["Stay silent until finished", "Think out loud and ask clarifying questions first", "Refuse to start without the internet", "Write the most complex solution possible to show your skill"],
            answer_index: 1,
            explanation: "Interviewers want to follow your reasoning.",
          },
          {
            prompt: "Which is a warning sign of a job scam?",
            options: ["A clear job description", "Being asked to pay to apply or to be trained", "A video interview", "A take home task"],
            answer_index: 1,
            explanation: "Real employers do not ask you to pay to apply.",
          },
          {
            prompt: "What does the lesson suggest after a rejection?",
            options: ["Give up", "Ask for feedback, improve, and keep applying", "Post complaints online", "Stop building projects"],
            answer_index: 1,
            explanation: "Feedback helps you improve for the next application.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
