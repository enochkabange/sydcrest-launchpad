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
            options: ["When you need rows and columns together", "When you are lining things up in one direction", "When you want to store data", "Only for printing pages"],
            answer_index: 1,
            explanation: "Flexbox handles one direction; grid handles two.",
          },
          {
            prompt: "What does `box-sizing: border-box` do?",
            options: ["Removes all borders", "Includes padding and border in the element's width", "Makes boxes round", "Turns every element into a grid"],
            answer_index: 1,
            explanation: "With border-box, widths include padding and border, so boxes do not overflow.",
          },
          {
            prompt: "What does `repeat(auto-fill, minmax(150px, 1fr))` achieve in a grid?",
            options: ["Exactly three columns on every screen", "As many columns as fit, each at least 150 pixels wide", "One column only", "Columns exactly 1 pixel wide"],
            answer_index: 1,
            explanation: "The grid adds or removes columns depending on the space available.",
          },
          {
            prompt: "Which flexbox property sets the space between items?",
            options: ["gap", "border", "font-size", "alt"],
            answer_index: 0,
            explanation: "The gap property controls spacing between flex or grid items.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "mobile-first-design": {
      explanation_md: `Many people in Ghana browse the web mostly on Android phones, often on small screens and mobile data. Responsive design appears in junior frontend adverts and in skills frameworks, and for SydCrest learners it is the default way to work, not an extra.

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
* **Tap targets.** Buttons and links need enough size and space to tap with a thumb. WCAG asks for at least 24 by 24 CSS pixels, and many teams aim for around 44.
* **Flexible images.** Add \`img { max-width: 100%; height: auto; }\` so pictures never overflow.
* **Relative units.** Prefer \`rem\`, \`%\` and \`fr\` over fixed pixel widths for containers.
* **Sunlight and glare.** Strong contrast between text and background helps people reading outdoors at a market.

## A worked example

Sumaila is building a page listing bus times from Tamale to Kumasi. He starts with a narrow browser window. Each departure is a card stacked vertically with large, clear times. He adds the viewport tag and checks it on his own phone. Only then does he add a media query so that on a laptop the cards sit in a table like layout with three columns. The phone version stays the priority because that is where his users are.

## Test on real devices

Browser developer tools have a device mode for simulating phone sizes, which is useful. But nothing beats opening the page on an actual low cost Android phone. Borrow one if you can, and test with the screen brightness turned up outside.`,
      practice_task_md: `**Goal:** a page that is designed for phones first.

1. Make a page listing at least six items, for example bus departures, church events or market prices.
2. Add the viewport meta tag.
3. Write CSS for a narrow screen first: one column, 16 pixel text, large tap targets.
4. Add one media query at a width where the layout starts to look stretched, and change to two or three columns.
5. Add \`img { max-width: 100%; height: auto; }\` and include at least one image.
6. Test in device mode and on a real phone.

**Done looks like:** no horizontal scrolling on a phone, comfortable tap targets, and a layout that improves on wider screens. Commit and note in your README which breakpoint you chose and why.`,
      quiz: {
        questions: [
          {
            prompt: "What does mobile first mean in CSS?",
            options: ["Writing base styles for small screens, then adding media queries for larger ones", "Building a native Android app", "Hiding the page on laptops", "Designing for laptops and shrinking later"],
            answer_index: 0,
            explanation: "Mobile first starts with the small screen and adds rules as space grows.",
          },
          {
            prompt: "What happens if you leave out the viewport meta tag?",
            options: ["The page loads faster", "Phones show the page as if on a wide screen, making text tiny", "Images stop loading", "JavaScript stops running"],
            answer_index: 1,
            explanation: "Without it, phones pretend to be desktop width and shrink the page.",
          },
          {
            prompt: "How should you choose breakpoints?",
            options: ["Based on one popular phone model", "Where your design starts to look awkward", "Always at exactly 1000 pixels", "Breakpoints are not needed"],
            answer_index: 1,
            explanation: "Breakpoints should follow your content, not specific devices.",
          },
          {
            prompt: "Which rule stops images from overflowing a small screen?",
            options: ["img { width: 2000px; }", "img { display: none; }", "img { max-width: 100%; height: auto; }", "img { position: absolute; }"],
            answer_index: 2,
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
            options: ["It makes the form submit faster", "Tapping the label focuses the field and screen readers announce it", "It hides the field on phones", "It encrypts the data"],
            answer_index: 1,
            explanation: "Linked labels help touch users and screen reader users.",
          },
          {
            prompt: "Which input type shows a number pad for phone numbers?",
            options: ["type=\"text\"", "type=\"email\"", "type=\"tel\"", "type=\"date\""],
            answer_index: 2,
            explanation: "type tel shows a phone style keypad on mobile.",
          },
          {
            prompt: "Why is browser validation not enough on its own?",
            options: ["It never works on phones", "It is a first line of help, and the server must check data again", "It deletes user data", "It only works in Firefox"],
            answer_index: 1,
            explanation: "Anyone can bypass browser checks, so the server must validate too.",
          },
          {
            prompt: "What makes a good error message?",
            options: ["The word Invalid in red", "Clearing the form so the user starts again", "Saying what is wrong and how to fix it, next to the field", "A pop up that blocks the whole page"],
            answer_index: 2,
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
            options: ["Copying is against the law", "Typing, making mistakes and fixing them is how it sticks", "Browsers reject pasted code", "Typing makes code run faster"],
            answer_index: 1,
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
            options: ["JavaScript only works on laptops", "Heavy scripts download to every phone and can make pages feel frozen on low cost devices", "Employers dislike JavaScript", "JavaScript cannot change the page"],
            answer_index: 1,
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

Solve small problems daily and explain each solution out loud. Free sites such as freeCodeCamp have hundreds of short JavaScript exercises. When you are stuck, write down what you expect to happen, then use \`console.log\` to see what actually happens. The gap between the two is where the bug lives.`,
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
            options: ["It checks both value and type, avoiding surprises", "It is faster to type", "It assigns a value", "It only works with strings"],
            answer_index: 0,
            explanation: "Strict equality compares type as well as value.",
          },
          {
            prompt: "What does the array method `filter` do?",
            options: ["Turns each item into something new", "Keeps the items that pass a test", "Adds up all the items", "Sorts the items alphabetically"],
            answer_index: 1,
            explanation: "filter returns a new array containing only matching items.",
          },
          {
            prompt: "What does `totalCost(15, 3)` return if the function multiplies price by quantity?",
            options: ["18", "153", "45", "5"],
            answer_index: 2,
            explanation: "15 multiplied by 3 is 45.",
          },
          {
            prompt: "What is a good first step when you are stuck on a bug?",
            options: ["Delete the whole file", "Write down what you expect, then use console.log to see what actually happens", "Switch to a different language", "Wait for the bug to disappear"],
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
6. Test on a phone.

**Done looks like:** typing filters the list instantly, saved items stay highlighted, and the code uses a single delegated listener. Commit it and add a short screen recording or screenshot to your README.`,
      quiz: {
        questions: [
          {
            prompt: "What is the DOM?",
            options: ["A CSS framework", "A tree of objects the browser builds from your HTML", "A type of server", "A Git command"],
            answer_index: 1,
            explanation: "The browser turns HTML into the Document Object Model, which JavaScript can change.",
          },
          {
            prompt: "Why prefer `textContent` over `innerHTML` for user typed text?",
            options: ["innerHTML is slower to type", "innerHTML treats text as HTML, which can allow harmful code to be injected", "textContent changes colours", "innerHTML only works on laptops"],
            answer_index: 1,
            explanation: "textContent shows text as plain text, which is safer.",
          },
          {
            prompt: "Which event fires on every change in a text field?",
            options: ["submit", "input", "load", "change"],
            answer_index: 1,
            explanation: "The input event fires each time the field's value changes.",
          },
          {
            prompt: "What does `e.preventDefault()` do in a submit handler?",
            options: ["Deletes the form", "Stops the browser's default page reload so your code can handle the form", "Sends the form twice", "Hides the submit button"],
            answer_index: 1,
            explanation: "It stops the default action so JavaScript can take over.",
          },
          {
            prompt: "What is a benefit of event delegation?",
            options: ["It adds one listener per item", "One listener on a parent handles many items, using less memory and working for items added later", "It makes CSS load faster", "It removes the need for buttons"],
            answer_index: 1,
            explanation: "A single parent listener uses e.target to know which item was tapped.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
