import type { TrackContent } from "./types";

/**
 * Original lesson content for the Backend Developer track (issue #84).
 * Research and sources: src/content/research/backend.md.
 */
const content: TrackContent = {
  roadmap: "backend-developer",
  nodes: {
    "foundations": {
      explanation_md: `When you pay for a bundle with mobile money, check a school result online or order food through an app, a lot happens that you never see. A phone sends a message to a computer somewhere, that computer looks something up, saves a record and sends an answer back. That hidden computer is a **server**, and the code running on it is the **backend**. Backend developers build and look after that part.

Ghanaian fintechs, telcos, banks, logistics startups and software agencies all need people who can do this work, and so do remote teams that hire across Africa. When you read their job adverts, a few basics appear again and again, even for junior roles. This first section gives you those basics before you write a single API.

### What this section covers

* **Clients, servers and HTTP.** Every app you build later is a conversation between a client (a phone, a browser, another server) and your server. HTTP is the language of that conversation. If you understand requests, responses, status codes and headers, debugging becomes much easier.
* **The command line.** Most servers run Linux and have no screen. You talk to them by typing commands. The same skill lets you run your own code, install tools and read logs.
* **Git and GitHub.** Teams track every change to their code with Git, and share it on platforms such as GitHub. Teams expect you to use it from your first day, and your GitHub profile becomes part of your CV.

### Why start here

It is tempting to jump straight to a framework, because frameworks feel productive. The trouble comes later, when something breaks and you cannot tell whether the problem is your code, the network, the database or the server. These foundations give you a mental map, so you know where to look.

They also work well with limited data and a modest device. You can practise HTTP with the developer tools in a browser, practise the command line in a free terminal app on an Android phone or on any laptop, and practise Git offline, only connecting when you want to push your work.

### A picture to keep in mind

Imagine Mariama runs a small provisions shop in Tamale and has a simple ordering app. When Fuseini taps "Order" on his phone:

1. His phone (the client) sends an HTTP request across the internet.
2. Mariama's server receives it, checks the details and saves the order.
3. The server replies with a response saying the order worked, or why it did not.

Everything in this roadmap builds on that loop. Databases are where step 2 saves things. APIs are how step 1 and step 3 are shaped. Payments, SMS and security are extra steps inside that same loop.

Take your time here. Learners who are solid on these basics usually move faster later, not slower.`,
      practice_task_md: `**Goal:** see the client and server loop with your own eyes and set up your tools.

1. Open any website in Chrome or Firefox on a laptop, or use a free HTTP client app on your phone. On a laptop, press F12, open the Network tab and reload the page.
2. Click the first request. Write down the method (such as GET), the status code and two response headers you can see.
3. Install a terminal: Termux on Android, Terminal on a Mac, or Git Bash on Windows. Type \`pwd\` and \`ls\` and note what they show.
4. Create a free GitHub account if you do not have one.

**Done looks like:** a short note in your phone's notes app or a text file with the method, status code, two headers and the output of \`pwd\`, plus your GitHub username. Share it with your mentor.`,
      quiz: {
        questions: [
          {
            prompt: "In backend work, what is a server?",
            options: [
              "The screen of the phone a customer uses",
              "A computer that receives requests, does work such as saving records, and sends back answers",
              "A cable that connects a shop to the internet",
              "A type of mobile money account",
            ],
            answer_index: 1,
            explanation: "The explanation describes the server as the hidden computer that looks things up, saves records and replies.",
          },
          {
            prompt: "Why do backend developers need the command line?",
            options: [
              "Because frameworks only run on Windows",
              "Because Git cannot be used without a mouse",
              "Because most servers run Linux without a screen, so you control them by typing commands",
              "Because HTTP requests must be typed by hand every time",
            ],
            answer_index: 2,
            explanation: "Servers usually have no screen, so typing commands is how you run code and read logs on them.",
          },
          {
            prompt: "In the ordering example, what does Mariama's server do after receiving Fuseini's request?",
            options: [
              "It sends an SMS to every customer",
              "It checks the details, saves the order and replies with a response",
              "It deletes the order to save space",
              "It waits until Fuseini calls the shop",
            ],
            answer_index: 1,
            explanation: "Step 2 and step 3 of the loop are checking and saving, then replying.",
          },
          {
            prompt: "Why does the section suggest learning these basics before a framework?",
            options: [
              "So that when something breaks you can tell whether the problem is the code, network, database or server",
              "Because frameworks are banned in Ghanaian companies",
              "Because frameworks need more data than any other tool",
              "Because employers never ask about frameworks",
            ],
            answer_index: 0,
            explanation: "The foundations give you a mental map that makes debugging possible.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "how-servers-work": {
      explanation_md: `Every backend job, whether at a bank in Accra, a telco or a remote startup, involves HTTP. When a payment fails or an app shows an error, the first question a senior developer asks is "what request was sent, and what came back?" Being able to answer that makes you useful from your first week.

### Requests and responses

HTTP is a set of rules for a client and a server to talk. The client sends a **request** and the server sends back a **response**. A request has:

* a **method**, which says what you want to do: \`GET\` to read, \`POST\` to create, \`PUT\` or \`PATCH\` to change, \`DELETE\` to remove
* a **URL**, which says what you are talking about, such as \`/orders/42\`
* **headers**, extra information such as the type of content or a login token
* sometimes a **body**, the data you are sending, often written as JSON

The response has a **status code**, headers and usually a body.

### Status codes

Status codes are grouped by their first digit:

* **2xx** means it worked. \`200 OK\` and \`201 Created\` are common.
* **3xx** means look somewhere else (a redirect).
* **4xx** means the client made a mistake. \`400\` is a bad request, \`401\` means not logged in, \`403\` means not allowed, \`404\` means not found.
* **5xx** means the server failed. \`500\` is a general server error.

The difference between 4xx and 5xx matters. A 4xx tells the app to fix what it sent. A 5xx tells you, the backend developer, that your code needs attention.

### A worked example

Hawa's school app lets parents check fees. When Abdul-Rahman opens it, his phone might send:

\`\`\`http
GET /students/117/fees
Authorization: Bearer abc123
\`\`\`

The server finds student 117 and replies:

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json

{"balance": 250, "currency": "GHS"}
\`\`\`

If the student did not exist, a good server would reply \`404\` with a short message. If the database crashed, it would reply \`500\`.

### HTTPS and why it matters

HTTPS is HTTP with encryption. On a shared WiFi network or a busy café connection, anyone nearby could read plain HTTP traffic, including passwords. Always use HTTPS for real services. Most free hosting platforms give you HTTPS automatically.

### Slow and dropped connections

Mobile networks can be slow or drop for a few seconds. A request might reach the server but the response might never reach the phone. Keep that in mind: the user may tap again, and your server will see the same request twice. Later lessons show how to handle that safely.`,
      practice_task_md: `**Goal:** read real HTTP traffic and explain it.

1. On a laptop, open a news or weather site, press F12 and go to the Network tab. On a phone, use a free HTTP client app instead.
2. Reload and pick three requests. For each, write the method, the URL path, the status code and the \`Content-Type\` response header.
3. Visit a page that does not exist on the same site, such as \`/this-page-is-missing\`, and note the status code.
4. Open \`https://httpbin.org/get\` in your browser. It shows the request your browser sent. Find your \`User-Agent\` header.

**Done looks like:** a small table (on paper or in a notes app) with four rows and a one line explanation of what each status code means. Send a photo of it to your mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which HTTP method is normally used to create a new record, such as a new order?",
            options: [
              "GET",
              "POST",
              "DELETE",
              "HEAD",
            ],
            answer_index: 1,
            explanation: "The explanation lists POST as the method used to create.",
          },
          {
            prompt: "A server replies with status 404. What does that mean?",
            options: [
              "The request worked and data was created",
              "The server crashed while handling the request",
              "The thing the client asked for was not found",
              "The client must wait and try again tomorrow",
            ],
            answer_index: 2,
            explanation: "404 is a 4xx client error meaning not found.",
          },
          {
            prompt: "Why does the difference between 4xx and 5xx codes matter to a backend developer?",
            options: [
              "4xx codes are always faster than 5xx codes",
              "4xx means the client sent something wrong, while 5xx means the server code needs attention",
              "5xx codes only appear when using HTTPS",
              "There is no real difference; both mean success",
            ],
            answer_index: 1,
            explanation: "The lesson explains that 4xx points at the client and 5xx points at your server.",
          },
          {
            prompt: "What is the main benefit of HTTPS over plain HTTP?",
            options: [
              "It makes pages load without any data",
              "It removes the need for status codes",
              "It lets a server handle only GET requests",
              "It encrypts traffic so people on the same network cannot read things like passwords",
            ],
            answer_index: 3,
            explanation: "HTTPS adds encryption, which protects data on shared networks.",
          },
          {
            prompt: "On a mobile network, a request reaches the server but the reply is lost. What might happen next?",
            options: [
              "The phone automatically gets a refund",
              "The user may tap again, so the server sees the same request twice",
              "The server deletes the first request",
              "Nothing, because lost replies are impossible",
            ],
            answer_index: 1,
            explanation: "The lesson warns that dropped replies lead to repeated requests.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "command-line": {
      explanation_md: `Backend developers spend a lot of time in a terminal. You use it to start your server, install packages, run tests, connect to a database and read logs when something goes wrong in production. Job adverts rarely say "command line" on its own, but they assume it whenever they mention Linux, deployment, Docker or cloud work.

### What the command line is

A terminal is a text window where you type a command and press Enter. A program called a **shell** reads your command, runs it and prints the result. On Linux and Mac the shell is usually Bash or Zsh. On Windows, Git Bash gives you the same commands. On an Android phone, a free app such as Termux gives you a real Linux style shell, which is enough to practise everything in this lesson.

### Finding your way around

Files live in folders (also called directories) arranged like a tree. These commands move you around it:

\`\`\`bash
pwd          # where am I?
ls           # what is here?
cd shop      # go into the shop folder
cd ..        # go up one level
mkdir logs   # make a new folder
\`\`\`

### Working with files

\`\`\`bash
touch notes.txt      # create an empty file
cat notes.txt        # print a file
cp a.txt b.txt       # copy
mv b.txt old.txt     # rename or move
rm old.txt           # delete, with no recycle bin
\`\`\`

Be careful with \`rm\`. There is no undo.

### Reading logs

When a server misbehaves, its logs tell the story. Two commands help a lot:

\`\`\`bash
tail -n 20 app.log        # last 20 lines
grep "ERROR" app.log      # only lines with ERROR
\`\`\`

Imagine Issahaku runs the backend for a delivery service in Wa. Customers say some orders vanished overnight. He connects to the server and runs \`grep "ERROR" app.log\`. In seconds he sees that the database was full at 2am. Without the command line, finding that line in a file with thousands of entries would take hours.

### Running programs

Most tools you install are run from the terminal: \`node server.js\`, \`python app.py\`, \`git status\`, \`npm install\`. If a command fails, read the message carefully. It usually tells you exactly what is wrong, such as a missing file or a typo.

### Environment variables

Programs can read settings from **environment variables**. You will use them later to keep secrets such as API keys out of your code:

\`\`\`bash
export PORT=3000
echo $PORT
\`\`\`

### Habits that help

* Use the Tab key to complete file names and avoid typos.
* Press the up arrow to repeat earlier commands.
* Type \`man ls\` or \`ls --help\` to read the manual for a command.

Practise a little every day. After a week the terminal stops feeling strange and starts feeling fast.`,
      practice_task_md: `**Goal:** build a small folder of shop records using only the terminal.

1. Open a terminal (Termux on Android, Terminal on Mac or Linux, Git Bash on Windows).
2. Make a folder called \`amina-shop\` and go into it.
3. Create a file called \`stock.txt\` and add three lines with \`echo "rice,20" >> stock.txt\` (change the item each time).
4. Create \`app.log\` and add a few lines, at least one containing the word \`ERROR\`.
5. Use \`cat\`, \`tail\` and \`grep\` to show the stock list, the last two log lines and only the error lines.

**Done looks like:** a screenshot of your terminal showing each command and its output. Keep the commands in a file called \`commands.txt\` so your mentor can rerun them.`,
      quiz: {
        questions: [
          {
            prompt: "Which command shows the folder you are currently in?",
            options: [
              "ls",
              "pwd",
              "cd ..",
              "mkdir",
            ],
            answer_index: 1,
            explanation: "The lesson lists pwd as the answer to \"where am I?\".",
          },
          {
            prompt: "Issahaku needs to find only the error lines in a long log file. Which command fits best?",
            options: [
              "rm app.log",
              "cd app.log",
              "grep \"ERROR\" app.log",
              "touch app.log",
            ],
            answer_index: 2,
            explanation: "grep prints only the lines that contain the text you search for.",
          },
          {
            prompt: "Why should you be careful with the rm command?",
            options: [
              "It slows down the server",
              "It deletes files with no recycle bin or undo",
              "It only works on Android phones",
              "It sends files to other users",
            ],
            answer_index: 1,
            explanation: "The lesson warns that rm has no undo.",
          },
          {
            prompt: "What are environment variables used for in later lessons?",
            options: [
              "Changing the colour of the terminal",
              "Making files larger",
              "Replacing the need for Git",
              "Keeping settings and secrets such as API keys out of your code",
            ],
            answer_index: 3,
            explanation: "The lesson introduces environment variables as a way to keep secrets out of code.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "git-and-github": {
      explanation_md: `Teams expect you to use Git from your first day, whether at a national service placement, a local startup or a remote company. Teams use it to track every change, work on features without breaking each other's code and review work before it goes live. For you as a job seeker, a GitHub profile with real projects is often the first thing an employer looks at.

### What Git does

Git is a tool that records snapshots of your project over time. Each snapshot is a **commit**, with a message saying what changed. If you break something, you can look back at older commits or undo a change. Git works offline, which is great when your data bundle is low. You only need the internet when you share your work.

GitHub, GitLab and similar sites host Git projects online so others can see them and work with you.

### The everyday loop

\`\`\`bash
git init                 # start tracking a folder
git status               # what has changed?
git add server.js        # stage a file
git commit -m "Add order route"
git push                 # send commits online
\`\`\`

Write commit messages that explain the change in a few words, such as "Validate phone number on signup". Future you, and your teammates, will thank you.

### Branches

A **branch** is a separate line of work. You might make a branch called \`add-momo-webhook\`, build the feature there and only merge it into the main branch when it works. Meanwhile the main branch stays safe.

\`\`\`bash
git switch -c add-momo-webhook
# ...make changes and commit...
git switch main
git merge add-momo-webhook
\`\`\`

### Pull requests

On a team, you rarely merge your own branch straight away. You push it and open a **pull request**, which asks a teammate to review your change. They might comment, ask questions or approve it. Being calm and clear in reviews is a real skill that employers notice.

### Things that should never go in Git

* Passwords, API keys and other secrets. Put them in environment variables and list the file that holds them (often \`.env\`) in a file called \`.gitignore\`.
* Large folders you can rebuild, such as \`node_modules\`.

If a secret ever lands on GitHub, treat it as stolen. Change it at once, even if you delete the commit.

### A small story

Sumaila and Wumpini are building a church contributions tracker together. Without Git, they email zip files and lose each other's changes. With Git, each works on a branch, opens a pull request and reviews the other's work. When a bug appears, they find the exact commit that caused it and fix it in minutes.

### Your GitHub as a CV

Pin your best projects, give each a clear README that says what it does and how to run it, and commit regularly. A steady history of small, honest commits shows an employer how you work.`,
      practice_task_md: `**Goal:** put a small project under Git and publish it.

1. In your terminal, create a folder \`chop-bar-menu\` with a file \`menu.txt\` listing three dishes and prices in cedis.
2. Run \`git init\`, then add and commit the file with a clear message.
3. Make a branch called \`add-drinks\`, add two drinks to the menu, commit, switch back to \`main\` and merge.
4. Add a \`README.md\` explaining what the project is. Commit it.
5. Create an empty repository on GitHub and follow its instructions to push your project. Open your repository on the GitHub website to check it arrived.

**Done looks like:** a public GitHub link with at least three commits and a README. Send the link to your mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What is a commit in Git?",
            options: [
              "A saved snapshot of your project with a message describing the change",
              "A message sent to a teammate on WhatsApp",
              "A file that deletes old code",
              "A paid feature of GitHub",
            ],
            answer_index: 0,
            explanation: "The lesson defines a commit as a snapshot with a message.",
          },
          {
            prompt: "Why is a branch useful when building a new feature?",
            options: [
              "It makes the code run faster",
              "It removes the need to commit",
              "It lets you work separately while the main branch stays safe",
              "It automatically deploys the code",
            ],
            answer_index: 2,
            explanation: "Branches keep new work apart until it is ready to merge.",
          },
          {
            prompt: "What is the purpose of a pull request?",
            options: [
              "To download someone else's computer",
              "To delete a branch without review",
              "To pay for hosting",
              "To ask teammates to review your change before it is merged",
            ],
            answer_index: 3,
            explanation: "A pull request asks for review before merging.",
          },
          {
            prompt: "You accidentally pushed an API key to GitHub. What should you do?",
            options: [
              "Nothing, because nobody reads GitHub",
              "Treat it as stolen and change the key at once",
              "Rename the file and push again",
              "Make the repository private and keep the key",
            ],
            answer_index: 1,
            explanation: "The lesson says any leaked secret must be changed immediately.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "a-language": {
      explanation_md: `Backend job adverts in Ghana and on remote boards ask for many languages: JavaScript with Node.js, Python, Java, C#, PHP, Go and more. That list can feel overwhelming. The good news is that employers mostly want to see that you can build working things well in **one** language. Once you know one deeply, picking up a second for a new job takes weeks, not years.

### Why one language, learned well

Jumping between languages after every tutorial feels like progress, but it leaves you knowing the first chapter of five books. Interviews test whether you can solve a problem, read an error and finish a small project without help. That comes from depth.

Stay with one language until you can:

* build a small program from a blank file without copying a tutorial
* read an error message and find the cause
* use the language's package manager to install a library
* write a simple test

### Choosing between Node.js and Python

For most beginners in this roadmap, the choice is between JavaScript (running on a server with **Node.js**) and **Python**. Both are free, run well on low spec laptops and have huge amounts of free learning material.

* **Node.js** lets you use the same language as the frontend, which helps if you want full stack roles. Several Ghanaian and remote adverts we studied asked for Node.js with frameworks such as Express or NestJS, often with TypeScript.
* **Python** is popular for backend work with frameworks such as Django, Flask or FastAPI, and it is also the main language for data work. If data interests you, Python keeps that door open.

Java and C# appear in some bank, payments and large company adverts. They are excellent languages, but they are heavier to set up on a modest machine. You can learn one later if a specific employer needs it.

### How to decide

Look at five job adverts you would genuinely apply for, in Ghana or remote. Count which language appears most. If it is close, pick the one whose free course you enjoy more. Enjoyment keeps you going on hard days.

The code examples in this roadmap use JavaScript with Node.js, because it came up often in the junior adverts we read. Every idea, such as routes, validation, webhooks and tests, works the same way in Python.

### What this section covers

* **Programming fundamentals:** variables, functions, data structures, errors and breaking problems into steps.
* **Asynchronous code:** how a server waits for databases and other services without freezing, and how to cope when the network is slow.

### A word on practice

Imagine Wumpini, learning in Damongo, sets herself one rule: write some code every day, even fifteen minutes on her phone. Short, steady practice like that adds up, and it beats long weekend sessions you cannot keep up.`,
      practice_task_md: `**Goal:** make an informed language choice and set it up.

1. Search a job board for five junior or entry level backend or software roles in Ghana or remote. For each, write the employer type (bank, fintech, telco, startup, agency) and the languages mentioned. Do not copy the advert text, just the language names.
2. Count the languages and pick one.
3. Install it: Node.js from nodejs.org or Python from python.org on a laptop, or \`pkg install nodejs\` or \`pkg install python\` in Termux on Android.
4. Write a program that prints "Hello from Tamale" and run it from the terminal.

**Done looks like:** your five row table, your choice with one sentence explaining why, and a screenshot of your program running.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what do employers mostly want to see about languages?",
            options: [
              "That you know at least five languages a little",
              "That you can build working things well in one language",
              "That you only use the newest language",
              "That you have a certificate in every language",
            ],
            answer_index: 1,
            explanation: "The lesson says depth in one language matters more than a long list.",
          },
          {
            prompt: "Which is a reason the lesson gives for choosing Node.js?",
            options: [
              "It only works on expensive laptops",
              "It cannot be used with frameworks",
              "It uses the same language as the frontend, which helps for full stack roles",
              "It is the only language banks use",
            ],
            answer_index: 2,
            explanation: "Node.js lets you use JavaScript on both frontend and backend.",
          },
          {
            prompt: "Which is a reason the lesson gives for choosing Python?",
            options: [
              "It is popular for backend frameworks and is also the main language for data work",
              "It is the only language that runs on Linux",
              "It does not need any practice",
              "It has no free learning material",
            ],
            answer_index: 0,
            explanation: "The lesson notes Python keeps the data path open.",
          },
          {
            prompt: "How does the lesson suggest you decide between languages?",
            options: [
              "Pick whichever language has the longest name",
              "Change language every week until one feels easy",
              "Count which language appears most in five adverts you would apply for",
              "Ask a friend to pick at random",
            ],
            answer_index: 2,
            explanation: "The lesson suggests letting real adverts guide the choice.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "programming-fundamentals": {
      explanation_md: `Graduate programmes and junior roles in Ghana often test data structures, problem solving and clean code before they ask anything about frameworks. Remote employers do the same with short coding exercises. These fundamentals are what let you turn a business need, such as "total today's sales", into code that works.

### The building blocks

* **Variables** hold values: \`const price = 15;\`
* **Types**: numbers, strings (text), booleans (true or false), and empty values such as \`null\`.
* **Conditions** choose what to do: \`if\`, \`else\`.
* **Loops** repeat work: \`for\`, \`while\`, or array methods such as \`map\` and \`filter\`.
* **Functions** give a name to a piece of work so you can reuse it and test it.

### Data structures you will use daily

An **array** is an ordered list. An **object** (a dictionary in Python) stores values by name. Real backend data is usually a mix of both.

\`\`\`js
const sales = [
  { item: "rice", qty: 2, price: 30 },
  { item: "oil", qty: 1, price: 45 },
];
\`\`\`

### A worked example

Hawa runs a stall at Tamale Central Market and wants her total for the day. Break the problem into steps first:

1. For each sale, multiply quantity by price.
2. Add those amounts together.
3. Return the total.

\`\`\`js
function dailyTotal(sales) {
  let total = 0;
  for (const s of sales) {
    total += s.qty * s.price;
  }
  return total;
}
\`\`\`

\`dailyTotal(sales)\` gives 105. Writing the steps in plain words before coding is the habit that matters most here. Interviewers love to hear you do it out loud.

### Money needs care

Computers store decimal numbers in a way that causes tiny errors: in JavaScript \`0.1 + 0.2\` is not exactly \`0.3\`. For cedis, many systems store amounts as whole **pesewas** (GHS 12.50 becomes 1250) and only format them for display. You will see this again when you handle payments.

### Errors are information

When code fails, it throws an **error** with a message and a line number. Read it slowly. Most beginner bugs are typos, a wrong variable name or a value that is \`undefined\`. Use \`try\` and \`catch\` to handle errors you expect, such as bad input, so your program does not crash.

\`\`\`js
try {
  const order = JSON.parse(text);
} catch (err) {
  console.log("Bad order data");
}
\`\`\`

### Debugging

Add \`console.log\` lines to see what values really are, then remove them. Change one thing at a time. Explain the problem to a friend or even to yourself; often you spot the bug while explaining.

### Practise small and often

Short exercises on free sites, or your own small problems from daily life, build skill quickly. Try a tithe calculator, a bus fare splitter or a stock counter for a provisions shop.`,
      practice_task_md: `**Goal:** write and test three small functions using local data.

Create a file \`market.js\` (or \`market.py\`) with:

1. \`dailyTotal(sales)\` as in the lesson, using your own list of five sales.
2. \`bestSeller(sales)\` that returns the item with the highest quantity sold.
3. \`toPesewas(cedis)\` that turns an amount like 12.5 into 1250 as a whole number.

Print the result of each function with sample data. Then break one input on purpose (for example, a sale with no price) and handle it with \`try\` and \`catch\` or a clear check.

**Done looks like:** a file on GitHub that runs with one command and prints three correct answers plus a friendly message for the bad input.`,
      quiz: {
        questions: [
          {
            prompt: "What is the first step the lesson recommends before writing code for a problem?",
            options: [
              "Search for a framework that solves it",
              "Break the problem into steps in plain words",
              "Write the tests for the frontend",
              "Ask the customer to write the code",
            ],
            answer_index: 1,
            explanation: "The worked example starts by listing steps in plain words.",
          },
          {
            prompt: "Why do many systems store cedi amounts as whole pesewas?",
            options: [
              "Because pesewas are no longer used",
              "Because whole numbers use less data on a phone",
              "Because decimal numbers can cause tiny rounding errors in computers",
              "Because banks forbid decimal points",
            ],
            answer_index: 2,
            explanation: "The lesson explains that 0.1 plus 0.2 is not exactly 0.3, so whole pesewas avoid errors.",
          },
          {
            prompt: "In the sales example, what kind of data structure is the list of sales?",
            options: [
              "A single string",
              "A boolean",
              "An array of objects",
              "A loop",
            ],
            answer_index: 2,
            explanation: "The sales are an ordered array where each item is an object with named values.",
          },
          {
            prompt: "What is try and catch used for?",
            options: [
              "Handling errors you expect, such as bad input, so the program does not crash",
              "Making loops run twice as fast",
              "Sending code to GitHub",
              "Converting cedis to dollars",
            ],
            answer_index: 0,
            explanation: "The lesson shows try and catch handling bad order data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "async-programming": {
      explanation_md: `A backend spends most of its time waiting: for the database, for a payment provider, for an SMS service. If it simply stopped and waited each time, one slow request would hold up everyone else. Asynchronous code lets a server start a task, deal with other customers while it waits, and come back when the answer arrives. Some of the remote adverts we read mention asynchronous processing by name.

### The idea, with a chop bar

Picture Amina's chop bar. A good server (the person) takes Fuseini's order, passes it to the kitchen and goes to take the next order. She does not stand at the kitchen door until the food is ready. When the food is ready, she brings it out. That is asynchronous work.

### Promises, async and await

In JavaScript, a task that finishes later returns a **promise**. The \`await\` keyword pauses only the current function until the promise settles, while the server keeps handling other requests.

\`\`\`js
async function getOrder(id) {
  const order = await db.findOrder(id);
  return order;
}
\`\`\`

Python has the same idea with \`async def\` and \`await\`.

### When things fail

Awaited work can fail: the database might be down, or a provider might return an error. Wrap it in \`try\` and \`catch\`:

\`\`\`js
try {
  const res = await fetch(url);
  const data = await res.json();
} catch (err) {
  console.error("Call failed", err);
}
\`\`\`

### Timeouts matter in Ghana

Networks drop, power cuts take routers down and partner services slow down at busy times. A call with no time limit can hang for a very long time and tie up your server. Set a **timeout** so you give up after a sensible wait:

\`\`\`js
const res = await fetch(url, {
  signal: AbortSignal.timeout(5000),
});
\`\`\`

That stops waiting after five seconds and throws an error you can catch. Then you can tell the user to try again, or try again yourself later.

### Doing things at the same time

If you need two independent results, start both and wait for both together instead of one after the other:

\`\`\`js
const [user, wallet] = await Promise.all([
  getUser(id),
  getWallet(id),
]);
\`\`\`

This is often much faster. Only do it when the tasks do not depend on each other.

### A common beginner mistake

Forgetting \`await\` gives you a promise instead of the value. If you print something and see \`Promise { <pending> }\`, you probably forgot it.

### Why this sets up later lessons

Payments, webhooks, SMS and background jobs all depend on handling slow and failed calls calmly. Imagine Sumaila is building a bus ticket app in Bolgatanga. If his calls hang or fail silently, customers see a spinner forever and he has no idea why. Timeouts and clear error handling turn those mysteries into messages he can act on.`,
      practice_task_md: `**Goal:** see asynchronous code, failures and timeouts in action.

1. In Node.js 18 or newer (where \`fetch\` is built in), create \`fetch-test.js\`.
2. Write an \`async\` function that fetches \`https://httpbin.org/delay/2\` (it replies after two seconds) and prints the status code.
3. Add a timeout of one second with \`AbortSignal.timeout(1000)\` and catch the error so it prints "Took too long, please try again".
4. Use \`Promise.all\` to fetch \`https://httpbin.org/get\` twice at the same time and print how long it took using \`Date.now()\`.

**Done looks like:** a script on GitHub that prints a timeout message and a timing result, with a short README explaining what you saw. This uses very little data.`,
      quiz: {
        questions: [
          {
            prompt: "Why does a backend need asynchronous code?",
            options: [
              "So that it never needs a database",
              "So it can handle other requests while waiting for slow tasks such as database calls",
              "So that code runs without errors",
              "So that it uses no electricity",
            ],
            answer_index: 1,
            explanation: "Asynchronous code lets the server keep working while it waits.",
          },
          {
            prompt: "In the chop bar example, what does the server (the person) do after passing an order to the kitchen?",
            options: [
              "Stands at the kitchen door until the food is ready",
              "Closes the chop bar",
              "Goes to take the next order and returns when the food is ready",
              "Cooks the food herself",
            ],
            answer_index: 2,
            explanation: "This is the asynchronous pattern the lesson describes.",
          },
          {
            prompt: "What does setting a timeout on a network call do?",
            options: [
              "Makes the call use less data",
              "Stops waiting after a set time and raises an error you can handle",
              "Guarantees the call succeeds",
              "Repeats the call forever",
            ],
            answer_index: 1,
            explanation: "A timeout gives up after a sensible wait so the server is not tied up.",
          },
          {
            prompt: "When should you use Promise.all?",
            options: [
              "When the second task needs the result of the first",
              "Only when you have no internet",
              "When two or more tasks are independent and can run at the same time",
              "Whenever you want to skip error handling",
            ],
            answer_index: 2,
            explanation: "The lesson says Promise.all is for independent tasks.",
          },
          {
            prompt: "You print a value and see Promise { <pending> }. What is the likely cause?",
            options: [
              "The database is full",
              "The network is down",
              "You used too many functions",
              "You forgot to use await",
            ],
            answer_index: 3,
            explanation: "The lesson names a missing await as the usual cause.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "databases": {
      explanation_md: `Many of the backend job adverts we read mentioned databases: SQL, PostgreSQL, MySQL, SQL Server, and sometimes MongoDB or Redis. That makes sense. An app without stored data forgets every customer, every order and every payment the moment it restarts. The database is the memory of the business, and looking after it well is one of the most trusted jobs a backend developer has.

### What a database does

A database stores data so that it survives restarts, can be searched quickly, and stays correct even when many people use it at once. Think of a market trader's record book, but one that can answer "how many bags of maize did we sell in March?" in a fraction of a second and never loses a page.

### Relational databases first

Most systems start with a **relational database** such as PostgreSQL, MySQL or SQL Server. Data lives in **tables** made of rows and columns, a bit like a spreadsheet, and tables are linked to each other by keys. You talk to them with **SQL**, a language that has been around for decades and is still used in nearly every tech role, including data and product work.

Relational databases are a good default because they protect your data. They can enforce rules, such as "every payment must belong to a real order", and they support **transactions**, which make a group of changes happen completely or not at all. For anything involving money, that matters a lot.

### What this section covers

* **SQL fundamentals:** reading, filtering, joining and summarising data.
* **Designing a database:** turning real things like customers, orders and payments into tables with sensible keys.
* **Migrations and ORMs:** changing a database safely as your app grows, and using code libraries that map tables to objects.
* **Caching and other kinds of databases (optional):** when a fast key value store or a document database helps, and why caching can take pressure off your main database.

### Why learn this before a framework

Frameworks come and go, but data outlives them. A badly designed database causes pain for years: duplicate customers, payments that do not add up, reports nobody trusts. A well designed one makes every later feature easier.

### Working on a budget

You do not need a powerful computer or a paid account. SQLite is a small database stored in a single file that runs almost anywhere, including in Termux on Android. Free online SQL practice sites let you write queries in your browser with very little data. Several hosting platforms also offer free database tiers, usually with limits on size and sometimes pausing when idle, which are fine for learning and portfolio projects.

### A picture to keep in mind

Imagine Abdul-Rahman runs a small shop in Nalerigu that takes orders on WhatsApp. Today he keeps a notebook. As a backend developer, you would turn that notebook into tables for customers, products, orders and payments, so he can see who owes what, what is running low and which products sell best. That is the work this section prepares you for.`,
      practice_task_md: `**Goal:** think like a database designer before you touch any tools.

1. Choose a real record keeping system you know: a shop's credit book, a church dues list, a school fees register or a farmers' group savings book.
2. On paper or in a notes app, list the **things** it tracks (for example: members, payments, meetings).
3. For each thing, list four or five **details** you would store (for example, a member has a name, phone number and join date).
4. Write two questions the owner would love to answer quickly, such as "who has not paid this month?".

**Done looks like:** one page with your things, their details and two questions. Keep it, because you will turn it into real tables in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main job of a database in a backend?",
            options: [
              "To make the app look nicer",
              "To store data so it survives restarts, can be searched quickly and stays correct",
              "To send SMS messages to customers",
              "To replace the need for an API",
            ],
            answer_index: 1,
            explanation: "The lesson describes the database as the memory of the business.",
          },
          {
            prompt: "How is data organised in a relational database?",
            options: [
              "As one long text file with no structure",
              "As images stored on a phone",
              "In tables of rows and columns linked by keys",
              "Only inside the frontend code",
            ],
            answer_index: 2,
            explanation: "Relational databases store data in linked tables.",
          },
          {
            prompt: "Why are transactions important for money related features?",
            options: [
              "They make the database free to use",
              "They make a group of changes happen completely or not at all",
              "They hide data from administrators",
              "They remove the need for backups",
            ],
            answer_index: 1,
            explanation: "The lesson explains transactions as all or nothing changes.",
          },
          {
            prompt: "Which option does the lesson suggest for practising databases on a budget?",
            options: [
              "Buying a dedicated server",
              "Waiting until you get a job",
              "Using SQLite, a small file based database that runs almost anywhere",
              "Only reading about databases without practising",
            ],
            answer_index: 2,
            explanation: "SQLite runs on modest devices, including Android with Termux.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "sql": {
      explanation_md: `SQL showed up in many of the backend, software and graduate adverts we read, whether the employer used PostgreSQL, MySQL or SQL Server. It is also useful in data, product and support roles, so time spent here pays off widely. The good news is that a small set of commands covers most daily work.

### Tables, rows and columns

Imagine a table called \`sales\` for Hawa's provisions shop:

| id | item  | qty | price_pesewas | sold_on    |
|----|-------|-----|---------------|------------|
| 1  | rice  | 2   | 3000          | 2026-10-01 |
| 2  | oil   | 1   | 4500          | 2026-10-01 |
| 3  | sugar | 3   | 1200          | 2026-10-02 |

Each row is one sale. Each column is one detail. Prices are stored in pesewas to avoid rounding errors, and dates are written year first so they sort correctly.

### Reading data with SELECT

\`\`\`sql
SELECT item, qty FROM sales;
\`\`\`

Add \`WHERE\` to filter and \`ORDER BY\` to sort:

\`\`\`sql
SELECT * FROM sales
WHERE qty >= 2
ORDER BY sold_on DESC;
\`\`\`

### Adding, changing and removing

\`\`\`sql
INSERT INTO sales (item, qty, price_pesewas, sold_on)
VALUES ('milk', 4, 800, '2026-10-02');

UPDATE sales SET qty = 3 WHERE id = 1;

DELETE FROM sales WHERE id = 2;
\`\`\`

Always include a \`WHERE\` with \`UPDATE\` and \`DELETE\`. Without it, the command changes or removes **every** row. Some tools ask you to confirm, but many do not.

### Summarising with GROUP BY

To see how many of each item were sold:

\`\`\`sql
SELECT item, SUM(qty) AS total
FROM sales
GROUP BY item;
\`\`\`

Other useful functions are \`COUNT\`, \`AVG\`, \`MIN\` and \`MAX\`.

### Joining tables

Real databases split data across tables. Suppose \`orders\` has a \`customer_id\` that points to a row in \`customers\`. A **join** brings them together:

\`\`\`sql
SELECT customers.name, orders.total_pesewas
FROM orders
JOIN customers
  ON customers.id = orders.customer_id;
\`\`\`

Now you can see each order with the customer's name instead of a number.

### Never build SQL from user input by hand

If you glue a user's text straight into a query, an attacker can type SQL of their own and read or destroy your data. This is called **SQL injection**. Every database library supports **parameters**, where you pass values separately:

\`\`\`js
db.query(
  "SELECT * FROM users WHERE phone = $1",
  [phone]
);
\`\`\`

The library makes sure the value is treated as data, never as code. Use this every time.

### How to practise

Free interactive sites let you type queries in the browser and check results instantly. SQLite lets you practise offline on a laptop or in Termux on Android. Try writing a query for a question you care about, such as "which day did we sell the most?".`,
      practice_task_md: `**Goal:** create and query a small shop database.

1. Install SQLite (\`pkg install sqlite\` in Termux, or download it on a laptop), or use a free online SQL playground.
2. Create a \`sales\` table with columns \`id\`, \`item\`, \`qty\`, \`price_pesewas\` and \`sold_on\`.
3. Insert at least eight sales over three days.
4. Write queries that answer: total quantity per item, total money per day in pesewas, and the single biggest sale.
5. Add a \`customers\` table and an \`orders\` table, then write one join that shows each order with the customer's name (use names such as Mariama and Issahaku).

**Done looks like:** a file \`shop.sql\` on GitHub with your \`CREATE\`, \`INSERT\` and query statements, plus a comment above each query saying what question it answers.`,
      quiz: {
        questions: [
          {
            prompt: "Which SQL command reads data from a table?",
            options: [
              "SELECT",
              "INSERT",
              "DELETE",
              "UPDATE",
            ],
            answer_index: 0,
            explanation: "SELECT is used for reading data.",
          },
          {
            prompt: "What happens if you run DELETE FROM sales with no WHERE clause?",
            options: [
              "Only the first row is deleted",
              "Nothing happens until you confirm",
              "Every row in the table is deleted",
              "The table is copied to a backup",
            ],
            answer_index: 2,
            explanation: "The lesson warns that UPDATE and DELETE without WHERE affect every row.",
          },
          {
            prompt: "What does GROUP BY help you do?",
            options: [
              "Join two databases on different servers",
              "Summarise rows, such as total quantity for each item",
              "Encrypt the data in a table",
              "Sort rows randomly",
            ],
            answer_index: 1,
            explanation: "GROUP BY combines rows into groups for totals and counts.",
          },
          {
            prompt: "What is a join used for?",
            options: [
              "Deleting duplicate tables",
              "Speeding up the internet connection",
              "Bringing related data from different tables together, such as orders with customer names",
              "Turning SQL into JavaScript",
            ],
            answer_index: 2,
            explanation: "The join example shows orders alongside customer names.",
          },
          {
            prompt: "How do you protect a query from SQL injection?",
            options: [
              "Ask users to type carefully",
              "Only use SQL at night",
              "Pass user values as parameters instead of gluing them into the query text",
              "Store all data in a text file",
            ],
            answer_index: 2,
            explanation: "Parameters make the database treat input as data, never as code.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "database-design": {
      explanation_md: `Several adverts we read asked for database design skills alongside SQL, and an interviewer may ask you to sketch tables for a scenario. Good design is what keeps an app's data trustworthy as it grows. Poor design shows up later as duplicate customers, orders that point to nothing, and totals that never match the mobile money statement.

### Start from the real world

List the **things** (entities) the business cares about and how they relate. For a small shop that sells on WhatsApp, run by Mariama in Bolgatanga:

* A **customer** places many **orders**.
* An **order** contains many **order items**, each for one **product**.
* An order can have one or more **payments** (a first attempt might fail).

### Keys

Every table needs a **primary key**, a column that uniquely identifies each row, usually \`id\`. A **foreign key** is a column that points to a row in another table, such as \`orders.customer_id\` pointing to \`customers.id\`. The database can refuse a foreign key that points to nothing, which stops orphan records.

### A worked design

\`\`\`sql
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL
    REFERENCES customers(id),
  status TEXT NOT NULL,
  total_pesewas INT NOT NULL
);
\`\`\`

Notice the rules built into the table: names and phones cannot be empty, and two customers cannot share a phone number. The database enforces these even if your code has a bug.

### Avoid repeating data

If you store the customer's name inside every order, then when Mariama corrects a spelling she must change it in fifty places, and she will miss some. Store each fact **once** and link to it with keys. This idea is called **normalisation**. You do not need to memorise its formal rules at first; just ask "is this fact stored in more than one place?".

### Money and status columns

* Store money as whole pesewas in an integer column, plus a currency if you might handle more than cedis.
* Use clear status values such as \`pending\`, \`paid\`, \`failed\`, \`refunded\`, and decide which changes are allowed. A \`paid\` order should not quietly become \`pending\` again.
* Add \`created_at\` timestamps. When a customer disputes a payment, you will want to know exactly when things happened.

### Indexes

An **index** helps the database find rows quickly, like the index at the back of a book. Primary keys get one automatically. Add an index on columns you search often, such as \`phone\`. Do not add indexes everywhere, because each one slows down writes a little.

### Draw before you build

Sketch boxes for tables and lines for relationships on paper. This kind of diagram is often called an entity relationship diagram. It costs nothing and catches mistakes before you write any code, and a clear diagram in your README impresses reviewers.`,
      practice_task_md: `**Goal:** design the database for a small shop that takes orders on WhatsApp.

1. On paper, draw boxes for \`customers\`, \`products\`, \`orders\`, \`order_items\` and \`payments\`, with lines showing which table points to which.
2. Write the \`CREATE TABLE\` statements with primary keys, foreign keys, \`NOT NULL\` where needed, a \`UNIQUE\` phone number and money in pesewas.
3. Run them in SQLite or a free online playground. \`SERIAL\` is PostgreSQL only, so in SQLite write \`id INTEGER PRIMARY KEY\` instead, and run \`PRAGMA foreign_keys = ON;\` first, because SQLite does not check foreign keys unless you ask. Then insert sample data for two customers (for example, Fuseini and Amina) with one order each.
4. Write one query that lists every order with the customer's name and total.

**Done looks like:** a photo of your diagram and a \`schema.sql\` file in a GitHub repository, with a README paragraph explaining one design choice you made and why.`,
      quiz: {
        questions: [
          {
            prompt: "What is a foreign key?",
            options: [
              "A key used only by foreign customers",
              "A column that points to a row in another table",
              "A password for the database",
              "A column that stores prices",
            ],
            answer_index: 1,
            explanation: "The lesson defines a foreign key as a pointer to another table's row.",
          },
          {
            prompt: "Why should a customer's name not be stored inside every order?",
            options: [
              "Names take too much data on a phone",
              "A correction would need changing in many places, and some would be missed",
              "Orders cannot contain text",
              "It makes the database refuse all orders",
            ],
            answer_index: 1,
            explanation: "Storing each fact once avoids inconsistent copies.",
          },
          {
            prompt: "Why is it useful to add a UNIQUE rule to the phone column?",
            options: [
              "It makes phone numbers shorter",
              "It hides phone numbers from the developer",
              "The database stops two customers sharing a phone number, even if the code has a bug",
              "It lets the database send SMS automatically",
            ],
            answer_index: 2,
            explanation: "Rules in the table are enforced by the database itself.",
          },
          {
            prompt: "What is an index for?",
            options: [
              "Backing up the database",
              "Helping the database find rows quickly in columns you search often",
              "Storing images",
              "Making every write faster",
            ],
            answer_index: 1,
            explanation: "Indexes speed up searches, at a small cost to writes.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "migrations-and-orms": {
      explanation_md: `Once an app is live, its database keeps changing: a new column for delivery address, a new table for refunds, a rule that phone numbers must be unique. Teams never make these changes by hand on the live server, because one typo can break the app for everyone. They use **migrations**. Adverts we read also named ORMs and query tools such as Entity Framework, Hibernate and Prisma, so it helps to know what they are.

### What a migration is

A migration is a small file that describes one change to the database, kept in Git alongside your code. Each file has a timestamp or number so they run in order:

\`\`\`text
migrations/
  001_create_customers.sql
  002_create_orders.sql
  003_add_delivery_area.sql
\`\`\`

The third one might contain:

\`\`\`sql
ALTER TABLE orders
ADD COLUMN delivery_area TEXT;
\`\`\`

A migration tool records which files have already run on each database. When you deploy, it runs only the new ones. Your laptop, your teammate's laptop and the live server all end up with the same structure.

### Why this matters

* **Repeatable:** a new teammate can build the whole database from scratch with one command.
* **Reviewable:** database changes go through pull requests like any other code.
* **Traceable:** when something breaks, you can see exactly which change caused it.

### Changing safely

Some changes are risky on a live database with real customers. A safe habit is **expand, then contract**: first add the new thing alongside the old, update the code to use it, and only remove the old thing in a later migration once nothing depends on it. For example, to rename \`phone\` to \`msisdn\`, add \`msisdn\`, copy the data, switch the code, then drop \`phone\` later.

Always back up before a big migration, and try it on a copy of the data first.

### What an ORM is

An **ORM** (object relational mapper) lets you work with tables as objects in your language instead of writing SQL strings. With a typical JavaScript ORM, fetching an order might look like:

\`\`\`js
const order = await db.order.findUnique({
  where: { id: 42 },
  include: { customer: true },
});
\`\`\`

The ORM writes the SQL for you. Many ORMs can also generate migrations from your model definitions.

### ORM or plain SQL?

ORMs save time on everyday work and reduce some mistakes, and many teams use them. But they can hide slow queries, and when something goes wrong you still need to understand the SQL underneath. That is why this roadmap teaches SQL first. A sensible approach: use an ORM or a light query builder for routine work, and read the SQL it produces when performance matters.

### A local example

Imagine Fuseini runs the backend for a cooperative's savings app in Yendi. Members ask to record their community name. He writes migration \`007_add_community.sql\`, opens a pull request, a teammate reviews it, and it runs automatically when they deploy. No one ever logs into the live database to type commands by hand.`,
      practice_task_md: `**Goal:** evolve a database with migrations instead of manual edits.

1. In a GitHub repository, create a \`migrations\` folder.
2. Write \`001_create_members.sql\` for a savings group with \`id\`, \`name\` and \`phone\`. For SQLite, use \`id INTEGER PRIMARY KEY\` so ids are numbered automatically.
3. Write \`002_create_contributions.sql\` with a foreign key to members and an amount in pesewas.
4. Write \`003_add_community.sql\` that adds a \`community\` column to members.
5. Delete your SQLite database file, then run the three files in order (for example, \`sqlite3 group.db < migrations/001_create_members.sql\` and so on) to rebuild it from scratch.

**Done looks like:** a repository with the three migration files, a README showing the commands to rebuild the database, and one sentence explaining why you should never edit the live database by hand.`,
      quiz: {
        questions: [
          {
            prompt: "What is a database migration?",
            options: [
              "A small versioned file describing one change to the database, kept with the code",
              "Moving a database to another country",
              "A backup stored on a USB drive",
              "A type of SQL injection attack",
            ],
            answer_index: 0,
            explanation: "The lesson defines a migration as a versioned change file kept in Git.",
          },
          {
            prompt: "How does a migration tool know which changes to run on deploy?",
            options: [
              "It runs every file every time",
              "It asks the customer",
              "It records which files have already run and runs only the new ones",
              "It picks files at random",
            ],
            answer_index: 2,
            explanation: "The tool tracks applied migrations and runs only new ones.",
          },
          {
            prompt: "What does expand, then contract mean?",
            options: [
              "Make the database bigger every week",
              "Add the new structure alongside the old, switch the code, then remove the old later",
              "Delete old data before adding new data",
              "Compress the database to save space",
            ],
            answer_index: 1,
            explanation: "This pattern keeps the live app working during a change.",
          },
          {
            prompt: "Why does the lesson teach SQL before ORMs?",
            options: [
              "ORMs cannot connect to databases",
              "SQL is required to install an ORM",
              "ORMs can hide slow queries, and you still need SQL to understand problems",
              "ORMs are only used in Python",
            ],
            answer_index: 2,
            explanation: "Understanding the SQL underneath helps when things go wrong.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "caching-and-nosql": {
      explanation_md: `Some backend adverts we read, especially from fintechs and remote payment teams, listed Redis, MongoDB or "NoSQL" next to PostgreSQL or MySQL. You do not need these for your first project, which is why this lesson is optional. But knowing what they are for helps you understand adverts and answer interview questions sensibly.

### What caching is

A **cache** is a quick place to keep an answer you have already worked out, so you do not have to work it out again. Imagine Issahaku's bus booking app in Tamale. Every time someone opens it, the app asks the database for today's routes and prices. The answer only changes a few times a day, yet the database repeats the same work thousands of times. Caching the answer for a few minutes removes most of that load.

\`\`\`js
async function getRoutes() {
  const hit = await cache.get("routes");
  if (hit) return JSON.parse(hit);
  const routes = await db.getRoutes();
  await cache.set("routes",
    JSON.stringify(routes), { EX: 300 });
  return routes;
}
\`\`\`

\`EX: 300\` means the cached copy expires after 300 seconds, so prices never get more than five minutes out of date.

### The hard part: staleness

A cache can serve old data. If a price changes, either wait for the copy to expire or delete it when you update the price. Never cache things that must always be exact at that moment, such as a wallet balance before a payment.

### Key value stores

Tools such as Redis keep data in memory as simple **key and value** pairs, which makes them very fast. Besides caching, teams use them for:

* counting requests to limit abuse (rate limiting)
* storing short lived things such as one time codes that expire after a few minutes
* simple job queues for background work

### Document databases

A **document database** such as MongoDB stores records as JSON like documents instead of rows in fixed tables. Each document can have a different shape, which suits data that varies a lot, such as NGO survey responses where each form has different questions.

The trade off is that relational databases are usually better at enforcing rules and joining related data, which is why payment and accounting systems normally keep their core records in SQL. Many teams use both: SQL for orders and money, a document store or cache for other jobs.

### HTTP caching

Caching also happens outside your server. A response header such as \`Cache-Control: max-age=60\` tells browsers and networks they can reuse a response for 60 seconds. For users on expensive data bundles, sensible HTTP caching of things that rarely change, such as product images and lists, saves them real money.

### When to reach for these

Start with one relational database. Add a cache when you can see the same slow query repeating, and add a document store when your data truly does not fit tables. Adding tools before you need them just gives you more things to break.`,
      practice_task_md: `**Goal:** feel the difference a cache makes, with no extra tools.

1. In Node.js or Python, write a function \`slowPrices()\` that waits two seconds (use \`setTimeout\` or \`time.sleep\`) and then returns a list of three bus routes with fares in pesewas.
2. Write \`cachedPrices()\` that stores the result in a simple in memory object with the time it was saved, and returns the saved copy if it is less than 30 seconds old.
3. Call \`cachedPrices()\` five times in a row and print how long each call takes.
4. Add a function that clears the cache when a fare changes.

**Done looks like:** a script on GitHub whose output shows the first call taking about two seconds and later calls taking almost no time, plus a README note on one thing you should never cache.`,
      quiz: {
        questions: [
          {
            prompt: "What is a cache?",
            options: [
              "A backup of the whole database stored offline",
              "A quick place to keep an answer you already worked out so you do not repeat the work",
              "A type of SQL join",
              "A list of all users who are logged in",
            ],
            answer_index: 1,
            explanation: "The lesson defines a cache as a store of already computed answers.",
          },
          {
            prompt: "In the caching example, what does EX: 300 do?",
            options: [
              "Limits the cache to 300 users",
              "Makes the request 300 times faster",
              "Makes the cached copy expire after 300 seconds",
              "Deletes the database after 300 seconds",
            ],
            answer_index: 2,
            explanation: "The value expires after 300 seconds so data stays reasonably fresh.",
          },
          {
            prompt: "Which data does the lesson say you should never cache?",
            options: [
              "A list of bus routes that changes a few times a day",
              "Product images",
              "Things that must be exact at that moment, such as a wallet balance before a payment",
              "Public lists that rarely change",
            ],
            answer_index: 2,
            explanation: "Stale balances could cause wrong payments.",
          },
          {
            prompt: "Why do payment systems usually keep core records in a relational database?",
            options: [
              "Relational databases are usually better at enforcing rules and joining related data",
              "Document databases cannot store numbers",
              "Relational databases do not need a server",
              "Key value stores are illegal for payments",
            ],
            answer_index: 0,
            explanation: "The lesson explains the trade off in favour of SQL for money.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "apis": {
      explanation_md: `Building RESTful APIs was the most repeated requirement across the adverts we read, from junior roles at Accra startups to remote payment teams. An API (application programming interface) is how a mobile app, a website, a partner company or another service talks to your server. If the database is the memory of a business, the API is its front counter.

### What an API looks like

A typical web API is a set of URLs, called **endpoints**, that accept HTTP requests and return data, usually as JSON. For a shop it might include:

* \`GET /products\` to list products
* \`POST /orders\` to place an order
* \`GET /orders/42\` to see one order

A phone app, a USSD menu, a WhatsApp bot and an admin dashboard can all use the same API. That is the power of it: build the logic once, and many clients can use it.

### What makes an API good

Developers who use your API, including future you, want it to be:

* **Predictable:** similar things work in similar ways. If one list is at \`/products\`, another should be at \`/customers\`, not \`/getAllCustomersNow\`.
* **Safe:** it checks every input, only lets people do what they are allowed to, and never leaks private data.
* **Honest about errors:** it returns the right status code and a clear message instead of crashing or saying "success" when something failed.
* **Documented:** someone can use it without asking you questions.

### What this section covers

* **REST API design:** routes, methods, status codes, JSON responses and short documentation.
* **Validation and error handling:** checking inputs such as Ghanaian phone numbers and cedi amounts, and returning helpful errors.
* **Authentication and authorisation:** knowing who a user is, often through a phone number and one time code, and what they are allowed to do.

### Frameworks

You can build an API with only your language's built in tools, but most teams use a framework. In Node.js, Express is small and popular for learning, and NestJS appeared in a few of the adverts we read. In Python, Django with its REST tools, Flask and FastAPI are common. Java teams often use Spring Boot, and C# teams use ASP.NET. Ideas carry across all of them, so learn the ideas properly with one.

### A small example in Express

\`\`\`js
const express = require("express");
const app = express();
app.use(express.json());

app.get("/products", (req, res) => {
  res.json([{ id: 1, name: "Shea butter" }]);
});

app.listen(3000);
\`\`\`

Run it, open \`http://localhost:3000/products\` in a browser and you will see JSON. That is a working API.

### Thinking about phone users

Many of your users will be on mobile data. Keep responses small: return only the fields a screen needs, and split long lists into pages (for example \`?page=2\`). A lean API is cheaper and faster for people buying data in small bundles, and it works better on weak signals.

Imagine Amina is building an API for a farmers' cooperative in Savelugu. Officers in the field use cheap phones on patchy networks. By keeping responses small and errors clear, her API stays usable even when the signal is weak.`,
      practice_task_md: `**Goal:** run your first API and call it.

1. Install Node.js (or Python), create a folder and run \`npm init -y\` then \`npm install express\` (or install Flask or FastAPI for Python).
2. Copy the small example from the lesson and change it to return three products from a Tamale shop, each with \`id\`, \`name\` and \`price_pesewas\`.
3. Add a second endpoint \`GET /products/:id\` that returns one product.
4. Call both from your browser or with \`curl http://localhost:3000/products\`.

**Done looks like:** the code on GitHub with a README listing your two endpoints and an example response for each.`,
      quiz: {
        questions: [
          {
            prompt: "What is an endpoint in a web API?",
            options: [
              "A database table",
              "A URL that accepts HTTP requests and returns data",
              "A type of phone",
              "The last line of a program",
            ],
            answer_index: 1,
            explanation: "The lesson describes endpoints as URLs that accept requests and return data.",
          },
          {
            prompt: "Why is it powerful that many clients can use the same API?",
            options: [
              "It means you never need a database",
              "It makes every app free to download",
              "It removes the need for HTTPS",
              "You build the logic once and a phone app, USSD menu and dashboard can all use it",
            ],
            answer_index: 3,
            explanation: "One API can serve many different clients.",
          },
          {
            prompt: "Which is a sign of a predictable API?",
            options: [
              "Similar things work in similar ways, such as /products and /customers",
              "Every endpoint uses a different naming style",
              "Errors always return status 200",
              "Endpoint names change every week",
            ],
            answer_index: 0,
            explanation: "Predictability means consistent patterns.",
          },
          {
            prompt: "How can an API be kinder to users on small data bundles?",
            options: [
              "Send every field for every record",
              "Use larger images",
              "Return only the fields a screen needs and split long lists into pages",
              "Make users download the whole database",
            ],
            answer_index: 2,
            explanation: "Small, paged responses save data and work better on weak signals.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "rest-apis": {
      explanation_md: `Most of the backend adverts we read asked for REST API experience. REST is a style for designing APIs around **resources** (the things your app deals with, like products, orders and payments) and standard HTTP methods. Following it means other developers can guess how your API works before reading a word of documentation.

### Resources and routes

Name routes after things, using plural nouns, and let the HTTP method say what to do:

| Method | Route         | Meaning            |
|--------|---------------|--------------------|
| GET    | /orders       | list orders        |
| POST   | /orders       | create an order    |
| GET    | /orders/42    | get order 42       |
| PATCH  | /orders/42    | change part of it  |
| DELETE | /orders/42    | remove it          |

Avoid verbs in the URL such as \`/createOrder\`. The method already says "create".

### Status codes that mean something

* \`200 OK\` for a successful read or update
* \`201 Created\` after a successful \`POST\`, ideally returning the new record
* \`400 Bad Request\` when the input is wrong
* \`401\` when the user is not logged in, \`403\` when they are logged in but not allowed
* \`404 Not Found\` when the record does not exist
* \`500\` only when your server truly failed

### Consistent JSON

Pick a shape and keep it everywhere. For errors, something like:

\`\`\`json
{
  "error": "invalid_phone",
  "message": "Phone must be 10 digits"
}
\`\`\`

The \`error\` code is for programs; the \`message\` is for people.

### A worked example

Abdul-Rahman is building the order API for a chop bar in Tamale.

\`\`\`js
app.post("/orders", async (req, res) => {
  const order = await saveOrder(req.body);
  res.status(201).json(order);
});

app.get("/orders/:id", async (req, res) => {
  const order = await findOrder(req.params.id);
  if (!order) {
    return res.status(404)
      .json({ error: "not_found" });
  }
  res.json(order);
});
\`\`\`

Creating returns 201 with the new order. A missing order returns 404 with a clear code, not a crash.

### Lists, filters and pages

Use query strings for filtering and paging: \`GET /orders?status=paid&page=2\`. Always limit how many records one request can return. A request for "all orders ever" could be huge, slow and expensive for a user on mobile data.

### Versioning

When you must change an API in a way that would break existing apps, offer the new behaviour under a new version such as \`/v2/orders\`, and keep the old one working for a while. People do not update apps instantly, especially on older phones.

### Document it

Write a short reference: each endpoint, what it expects, what it returns and an example. A README section is enough to start. Many teams use the **OpenAPI** format, which tools can turn into interactive documentation and test clients. Good docs are one of the fastest ways to look professional in a portfolio.

### Test it as you go

Use \`curl\` or a free API client to send requests while you build. Check each status code, not just the happy path.`,
      practice_task_md: `**Goal:** build a small REST API for a chop bar menu and orders.

1. Using Express, Flask or FastAPI, store menu items and orders in arrays in memory for now.
2. Build \`GET /menu\`, \`POST /orders\`, \`GET /orders/:id\` and \`PATCH /orders/:id\` (to change status to \`ready\`).
3. Return \`201\` on create, \`404\` for a missing order and \`400\` if the order has no items.
4. Use one consistent error shape everywhere.
5. Write a README with a table of endpoints and one example \`curl\` command for each.

**Done looks like:** a GitHub repository your mentor can run with two commands, plus a README that lets them test every endpoint without asking you anything.`,
      quiz: {
        questions: [
          {
            prompt: "In REST, which request would you use to create a new order?",
            options: [
              "GET /createOrder",
              "POST /orders",
              "DELETE /orders",
              "GET /orders/new",
            ],
            answer_index: 1,
            explanation: "REST uses a plural noun route and the POST method to create.",
          },
          {
            prompt: "What status code should a successful POST that creates a record usually return?",
            options: [
              "200 OK",
              "404 Not Found",
              "201 Created",
              "500 Internal Server Error",
            ],
            answer_index: 2,
            explanation: "The lesson recommends 201 Created after a successful POST.",
          },
          {
            prompt: "A logged in user tries to view another customer's order they are not allowed to see. Which code fits?",
            options: [
              "401",
              "403",
              "201",
              "500",
            ],
            answer_index: 1,
            explanation: "403 means logged in but not allowed, while 401 means not logged in.",
          },
          {
            prompt: "Why should list endpoints limit how many records one request returns?",
            options: [
              "Because JSON cannot hold more than ten records",
              "Because REST forbids lists",
              "Because databases cannot count",
              "Because huge responses are slow and expensive for users on mobile data",
            ],
            answer_index: 3,
            explanation: "The lesson recommends paging to keep responses small.",
          },
          {
            prompt: "When should you create a new API version such as /v2/orders?",
            options: [
              "When a change would break existing apps that use the old behaviour",
              "Every time you fix a typo",
              "Whenever you add a new teammate",
              "Only when the server restarts",
            ],
            answer_index: 0,
            explanation: "Versioning protects apps that cannot update instantly.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "validation-and-errors": {
      explanation_md: `Every input that reaches your server could be wrong, by accident or on purpose. A missing field, a phone number with a letter in it, a negative amount or a huge block of text can crash your code, corrupt your data or, with payments, cost real money. Adverts mention debugging and security alongside APIs because employers have seen what happens without careful validation.

### Never trust the client

Your app's form might check inputs, but anyone can send requests straight to your API with a tool like \`curl\`, skipping your app entirely. So the **server** must check everything again. Frontend checks are for convenience; backend checks are for safety.

### What to validate

* **Presence:** required fields are there.
* **Type:** a quantity is a number, not text.
* **Format:** a phone number or email has the right shape.
* **Range:** an amount is above zero and below a sensible limit.
* **Length:** names and notes have a maximum size.

### Ghanaian phone numbers

Local mobile numbers are usually written as 10 digits starting with 0, such as \`024 123 4567\`, or in international form with \`+233\` and the leading 0 dropped. People type them with spaces, dashes or the country code. A good approach is to **normalise** first, then check:

\`\`\`js
function normalisePhone(input) {
  let p = String(input).replace(/\\D/g, "");
  if (p.startsWith("233")) p = "0" + p.slice(3);
  return /^0\\d{9}$/.test(p) ? p : null;
}
\`\`\`

This strips anything that is not a digit, converts the \`233\` form to the local form and accepts only 10 digits starting with 0. Store one consistent format in your database, and check what format your SMS or payment provider expects when you send it on.

### Cedi amounts

Accept amounts in a clear unit, ideally whole pesewas, and reject zero, negative and absurd values. Decide on a maximum per transaction that makes sense for the business.

### Using a validation library

Writing every check by hand gets messy. Libraries let you describe the shape you expect and check it in one step. In JavaScript, libraries such as Zod or Joi do this; in Python, Pydantic does it and FastAPI uses it directly. The idea is the same everywhere:

\`\`\`js
const Order = z.object({
  phone: z.string(),
  amount: z.number().int().positive(),
});
\`\`\`

### Returning helpful errors

When validation fails, return \`400\` with a message that helps the person fix it, and do not crash:

\`\`\`json
{
  "error": "invalid_amount",
  "message": "Amount must be more than 0"
}
\`\`\`

Return all problems at once if you can, so a user on a slow network does not have to submit the form five times.

### Handling unexpected errors

Some errors you cannot predict: the database goes down or a bug slips through. Catch them in one central error handler that logs the details for you and returns a plain \`500\` message to the user. Never send stack traces or database messages to users, because they can reveal how your system works to attackers.

### A worked scenario

Hawa's school fees API accepts \`{ phone, amount }\`. A parent types \`+233 24 123 4567\` and \`150\`. Your code normalises the phone to \`0241234567\`, converts GHS 150 to 15000 pesewas, checks both, and saves the record. Another request sends \`amount: -5\`. It gets a clear \`400\` and nothing is saved.`,
      practice_task_md: `**Goal:** protect an endpoint with real validation.

1. Take your orders API from the REST lesson (or start a small one).
2. Add the \`normalisePhone\` function and use it on every incoming phone number.
3. Validate that \`amount\` is a whole number of pesewas above 0 and below a limit you choose.
4. Return \`400\` with a consistent error shape that lists every problem found.
5. Add a central error handler that returns a plain \`500\` message and logs the real error.
6. Test with at least six requests using \`curl\`, including \`0241234567\`, \`+233 24 123 4567\`, \`12345\`, an amount of 0 and a missing phone.

**Done looks like:** your code on GitHub and a README table of the six test inputs with the status code and response each one produced.`,
      quiz: {
        questions: [
          {
            prompt: "Why must the server validate inputs even if the app's form already checks them?",
            options: [
              "Because forms never work on phones",
              "Because anyone can send requests straight to the API and skip the form",
              "Because validation makes the server faster",
              "Because the database cannot store text",
            ],
            answer_index: 1,
            explanation: "The lesson explains that clients can be bypassed, so the server must check again.",
          },
          {
            prompt: "What does the normalisePhone function in the lesson do first?",
            options: [
              "Removes everything that is not a digit",
              "Sends an SMS to the number",
              "Adds a random country code",
              "Saves the number to the database",
            ],
            answer_index: 0,
            explanation: "It strips non digits before converting and checking.",
          },
          {
            prompt: "Which status code should a validation failure return?",
            options: [
              "201",
              "302",
              "400",
              "500",
            ],
            answer_index: 2,
            explanation: "Bad input from the client is a 400 Bad Request.",
          },
          {
            prompt: "Why should you avoid sending stack traces to users?",
            options: [
              "They use too much data",
              "Users cannot read English",
              "They can reveal how your system works to attackers",
              "They make the API return 201 instead of 500",
            ],
            answer_index: 2,
            explanation: "The lesson warns that internal details help attackers.",
          },
          {
            prompt: "Why does the lesson suggest returning all validation problems at once?",
            options: [
              "It hides the errors from the user",
              "It reduces the number of database tables",
              "It is required by HTTPS",
              "So a user on a slow network does not have to resubmit many times",
            ],
            answer_index: 3,
            explanation: "Listing every problem saves round trips on slow connections.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "auth": {
      explanation_md: `Every app that holds personal data or money needs to know **who** is making a request and **what** they are allowed to do. Mistakes here are among the most serious a backend developer can make, which is why adverts list security and data protection, and why broken access control sits at the top of well known security risk lists.

### Two different questions

* **Authentication** asks "who are you?" It is signing in.
* **Authorisation** asks "are you allowed to do this?" It is checking permissions.

A user can be fully signed in and still not be allowed to see someone else's order. Many real breaches come from checking the first question and forgetting the second.

### Passwords, done properly

If you store passwords, never store them as plain text. Store a **hash** made with a slow, purpose built algorithm such as bcrypt or Argon2, which your language has libraries for. When someone signs in, hash what they typed and compare. If your database ever leaks, attackers get hashes, not passwords.

### Phone number and one time code

Many Ghanaian apps sign people in with a phone number, because phone numbers are widely used and not everyone uses email. The flow:

1. The user enters a phone number.
2. Your server creates a random six digit code, stores a hash of it with an expiry of a few minutes, and sends it by SMS.
3. The user types the code. Your server checks it, deletes it so it cannot be reused, and signs them in.

Limit how many codes a number can request and how many guesses are allowed, or attackers can run up your SMS bill or guess codes. Remember that SMS can arrive late on busy networks, so give a fair expiry and a clear "resend" option.

### Sessions and tokens

After sign in, the server needs to recognise the user on later requests without asking again. Two common approaches:

* **Sessions:** the server stores a record and gives the browser a cookie with a random session id.
* **Tokens:** the server gives the app a signed token, often a JWT, which the app sends in a header:

\`\`\`http
Authorization: Bearer eyJhbGciOi...
\`\`\`

Both work. Keep tokens short lived, send them only over HTTPS and never put secrets inside a JWT, because anyone can read its contents.

### Checking permissions on every request

Imagine Wumpini's savings group app in Tamale. Members should see only their own contributions; the treasurer can see everyone's. Check it on the server, every time:

\`\`\`js
app.get("/contributions/:memberId", (req, res) => {
  const me = req.user;
  const own = String(me.id) === req.params.memberId;
  const allowed = own || me.role === "treasurer";
  if (!allowed) return res.status(403).end();
  // ...load and return the data
});
\`\`\`

Never rely on the app hiding a button. Attackers can change the id in the URL and see what comes back.

### Use proven tools

Writing your own sign in system from scratch is a good learning exercise, but for real products teams usually use a well tested library or an authentication service. Your job is to understand the flow well enough to configure it correctly and spot mistakes.`,
      practice_task_md: `**Goal:** build a safe phone and code sign in, with a permission check.

1. In your API, add \`POST /auth/request-code\` that accepts a phone number, creates a six digit code, stores a hash of it with a five minute expiry and prints the code to your terminal instead of sending an SMS.
2. Add \`POST /auth/verify\` that checks the code, deletes it after use and returns a token or sets a session.
3. Limit each phone to three code requests per hour and five wrong guesses.
4. Add \`GET /me/orders\` that only returns orders belonging to the signed in user, and confirm that changing an id in the URL never shows another user's data.

**Done looks like:** code on GitHub with a README that explains the flow in five short steps and lists the limits you added.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between authentication and authorisation?",
            options: [
              "Authentication checks who you are; authorisation checks what you are allowed to do",
              "Authentication is for phones; authorisation is for laptops",
              "They are two words for the same thing",
              "Authorisation happens before the user exists",
            ],
            answer_index: 0,
            explanation: "The lesson separates \"who are you\" from \"are you allowed\".",
          },
          {
            prompt: "How should passwords be stored?",
            options: [
              "As plain text so support staff can read them",
              "In the app's frontend code",
              "In a public spreadsheet",
              "As hashes made with a slow, purpose built algorithm such as bcrypt",
            ],
            answer_index: 3,
            explanation: "Hashing protects passwords if the database leaks.",
          },
          {
            prompt: "In the one time code flow, what should the server do after a correct code is used?",
            options: [
              "Send the same code again",
              "Delete it so it cannot be reused",
              "Email it to the admin",
              "Keep it forever for future logins",
            ],
            answer_index: 1,
            explanation: "Codes must be single use.",
          },
          {
            prompt: "Why should you limit how many codes a phone number can request?",
            options: [
              "To make the app look busy",
              "Because phones cannot receive more than one SMS",
              "To stop attackers running up your SMS bill or guessing codes",
              "Because JWTs require it",
            ],
            answer_index: 2,
            explanation: "Limits protect against abuse and guessing.",
          },
          {
            prompt: "Why is hiding a button in the app not enough to protect data?",
            options: [
              "Buttons are always visible on small screens",
              "Attackers can call the API directly or change an id in the URL",
              "The database ignores buttons",
              "HTTPS removes all buttons",
            ],
            answer_index: 1,
            explanation: "The server must check permissions on every request.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "local-integrations": {
      explanation_md: `This section is where backend skills meet the way Ghana actually does business. Customers pay with mobile money, get updates by SMS or WhatsApp, and sometimes use USSD menus on basic phones. Connections drop, prompts time out and the same message can arrive twice. Fintech and payment adverts we read asked for webhooks, retries, idempotency and reconciliation by name. A developer who handles these calmly is useful to Ghanaian startups, fintechs, telcos and agencies very quickly.

### Talking to other companies' APIs

So far you have built your own API. Now your server becomes the **client** of someone else's: a payment provider, an SMS gateway or a messaging platform. Each provider has its own documentation, test keys and rules, but the pattern is the same:

1. Your server sends a request to the provider, using a secret key.
2. The provider does something in the real world: asks a customer to approve a payment, or sends an SMS.
3. Later, the provider tells your server what happened, often by calling a URL on your server. That call is a **webhook**.

### Why this is harder than it looks

When you call your own database, it answers in milliseconds. When you start a mobile money payment, the customer might take a minute to find their phone and enter a PIN, or ignore the prompt entirely. Meanwhile:

* your request to the provider might time out even though it worked
* the webhook might arrive late, twice, or out of order
* someone might send a fake webhook pretending a payment succeeded

Code that assumes everything happens once, in order and instantly will eventually lose money or annoy customers.

### What this section covers

* **Mobile money payments and webhooks:** starting payments, receiving and verifying webhooks, and reconciling your records with the provider's.
* **Timeouts, retries and idempotency:** handling repeats and failures so nobody is charged twice and no order is lost.
* **SMS and WhatsApp notifications:** sending messages through provider APIs without blocking your app, respecting opt outs, and how USSD menus fit in.

### Learning without spending money

Most payment and messaging providers offer **test** or **sandbox** modes with test keys, where no real money moves and no real SMS is sent. Always build and test there first. Never put live keys in your code or on GitHub, and never test with real customers' money.

To receive webhooks on your laptop, the provider needs a public URL. Free tunnelling tools can give your local server a temporary public address, or you can deploy a small test server on a free hosting tier. There are also free websites that show you any request sent to a temporary URL, which is a cheap way to see what a webhook looks like.

### A note on responsibility

Payment code handles other people's money. Write it slowly, log every important step, and ask for review. A careful junior who asks "what happens if this webhook arrives twice?" earns trust faster than a fast one who never asks.

Imagine Mariama's online store in Tamale. When Fuseini pays for a bag of rice with mobile money, her backend must record the payment exactly once, mark the order paid, and send him a confirmation, even if his network drops halfway. This section teaches you to build exactly that.`,
      practice_task_md: `**Goal:** understand a real provider's flow before writing code.

1. Pick any payment or SMS provider that operates in Ghana and has public developer documentation. You are choosing it only to study, not because it is the best.
2. Find and note: how you get test keys, how you start a payment or send a message, what a webhook (sometimes called a callback) looks like, and how they recommend verifying it.
3. Draw the flow as numbered arrows between Customer, Your Server and Provider.
4. List three things that could go wrong at each arrow.

**Done looks like:** a one page diagram (photo of paper is fine) and your list of failure cases. Share it with your mentor and discuss which failures worry you most.`,
      quiz: {
        questions: [
          {
            prompt: "In this section, what is a webhook?",
            options: [
              "A type of mobile phone",
              "A database index",
              "A call the provider makes to a URL on your server to tell you what happened",
              "A password for an SMS gateway",
            ],
            answer_index: 2,
            explanation: "The lesson defines a webhook as the provider calling your server.",
          },
          {
            prompt: "Why are payment integrations harder than calling your own database?",
            options: [
              "Payment providers do not use HTTP",
              "Real world steps take time, and requests can time out, repeat or arrive out of order",
              "Databases cannot store payments",
              "Webhooks only work at night",
            ],
            answer_index: 1,
            explanation: "The lesson lists timeouts, repeats, late and fake webhooks.",
          },
          {
            prompt: "Where should you build and test payment code first?",
            options: [
              "In the provider's test or sandbox mode with test keys",
              "With real customers' money",
              "Directly on the live server with live keys",
              "Only on paper, never in code",
            ],
            answer_index: 0,
            explanation: "Sandbox modes let you test without moving real money.",
          },
          {
            prompt: "What question does the lesson say earns a junior developer trust?",
            options: [
              "How fast can I merge this?",
              "Can we skip the review?",
              "What happens if this webhook arrives twice?",
              "Which provider is the cheapest?",
            ],
            answer_index: 2,
            explanation: "Thinking about repeats and failures shows care with money.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "payments-and-webhooks": {
      explanation_md: `Mobile money is an everyday way to pay in Ghana, so payment integration is one of the most practical backend skills you can learn here. Fintech and payment adverts we read mentioned payment APIs, webhooks and reconciliation directly. The details differ between providers, but the shape of the work is the same everywhere.

### The flow

1. Fuseini taps "Pay GHS 50" in Mariama's app.
2. Your server creates a \`payments\` row with status \`pending\` and a unique reference, then asks the provider to charge his number.
3. The provider sends a prompt to Fuseini's phone. He approves it with his PIN, or ignores it.
4. The provider calls your **webhook** URL with the result.
5. Your server verifies the webhook, updates the payment to \`paid\` or \`failed\`, and only then marks the order paid.

The key idea: **the initial request does not mean the money moved.** The payment stays pending until a trusted result arrives.

### Receiving a webhook

A webhook is just an HTTP \`POST\` to an endpoint you expose:

\`\`\`js
app.post("/webhooks/payments", async (req, res) => {
  if (!isGenuine(req)) {
    return res.status(401).end();
  }
  await recordResult(req.body);
  res.status(200).end();
});
\`\`\`

Reply quickly with a \`2xx\` so the provider knows you received it. Do slow work, such as sending receipts, afterwards. Many providers retry webhooks that fail or time out, which is good, but it means you will see repeats.

### Verifying it is genuine

Your webhook URL is public, so anyone could post a fake "payment successful" message. Providers usually protect against this by **signing** each webhook: they compute a code from the body using a secret only you and they know, and put it in a header. You compute the same code and compare. In Node.js:

\`\`\`js
const crypto = require("crypto");
const expected = crypto
  .createHmac("sha256", SECRET)
  .update(rawBody)
  .digest("hex");
\`\`\`

Here \`rawBody\` is the body exactly as it arrived, before any JSON parsing. Compare the two with \`crypto.timingSafeEqual\` rather than \`===\`, which leaks timing clues; it throws if the two values differ in length, so check the lengths first. Follow your provider's documentation exactly, since the algorithm, header name and what counts as the body vary. If they offer an endpoint to look up a transaction's status, calling it to confirm before giving value adds another layer of safety.

### Recording each payment once

Use the provider's transaction id or your own reference as a **unique** column. If the same webhook arrives twice, the second insert fails or is skipped, and the order is not processed again. The next lesson goes deeper into this.

### Pending forever?

Sometimes no webhook arrives at all. Run a small scheduled job that finds payments still pending after, say, fifteen minutes, and asks the provider for their status. Tell the customer honestly what is happening instead of leaving a spinner.

### Reconciliation

At the end of each day, compare your \`paid\` payments with the provider's report or statement. Every transaction should match in amount and status. Any difference, such as money received for an order you marked failed, needs investigating. This is called **reconciliation**, and finance teams value developers who make it easy.

### Money handling rules

* Store amounts in pesewas as integers. Some providers expect pesewas and others expect cedis, so convert carefully when you call them.
* Never trust an amount sent by the app; take it from your own order record.
* Log every status change with a timestamp.
* Keep secret keys in environment variables, never in Git.`,
      practice_task_md: `**Goal:** build a safe payment webhook against a simulated provider.

1. Add a \`payments\` table with \`reference\` (unique), \`order_id\`, \`amount_pesewas\`, \`status\` and \`created_at\`.
2. Build \`POST /orders/:id/pay\` that creates a pending payment with a random reference and returns it. Do not call a real provider.
3. Build \`POST /webhooks/payments\` that checks an HMAC signature header using a secret from an environment variable, then marks the payment \`paid\` or \`failed\`.
4. Write a small script that signs a fake webhook body with the same secret and sends it with \`curl\` or \`fetch\`. Send it twice and confirm the order is only marked paid once.
5. Send one with a wrong signature and confirm it is rejected with \`401\`.

**Done looks like:** code on GitHub with a README showing the flow as numbered steps and the outputs of your three test webhooks.`,
      quiz: {
        questions: [
          {
            prompt: "After your server asks the provider to charge a customer, what status should the payment have?",
            options: [
              "Paid, because the request was sent",
              "Pending, until a trusted result arrives",
              "Refunded",
              "Deleted",
            ],
            answer_index: 1,
            explanation: "The lesson stresses that the initial request does not mean the money moved.",
          },
          {
            prompt: "Why must you verify a webhook's signature?",
            options: [
              "To make the webhook arrive faster",
              "Because providers charge for unsigned webhooks",
              "To reduce the size of the response",
              "Because the URL is public and anyone could send a fake success message",
            ],
            answer_index: 3,
            explanation: "Signatures prove the webhook came from the provider.",
          },
          {
            prompt: "Why should a webhook handler reply quickly with a 2xx code?",
            options: [
              "So the provider knows it was received and does not keep retrying",
              "So the customer gets a free bundle",
              "Because slow replies delete the payment",
              "Because 2xx codes skip verification",
            ],
            answer_index: 0,
            explanation: "Quick replies stop needless retries; slow work happens afterwards.",
          },
          {
            prompt: "What is reconciliation?",
            options: [
              "Sending an apology SMS to every customer",
              "Deleting failed payments each night",
              "Comparing your payment records with the provider's report so every transaction matches",
              "Changing the provider every month",
            ],
            answer_index: 2,
            explanation: "The lesson defines reconciliation as matching records.",
          },
          {
            prompt: "Where should the amount to charge come from?",
            options: [
              "From whatever amount the app sends",
              "From the customer's SMS reply",
              "From the webhook alone with no checks",
              "From your own order record on the server",
            ],
            answer_index: 3,
            explanation: "Never trust an amount sent by the client.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "idempotency-and-retries": {
      explanation_md: `Fintech adverts we read listed retries, idempotency, failure recovery and reconciliation as core duties. These words sound advanced, but the problem behind them is everyday Ghana: a customer taps "Pay", the network drops, they tap again. Did they just pay twice? A good backend makes sure the answer is no.

### Timeouts: decide how long to wait

Every call to another service should have a time limit, as you saw in the asynchronous code lesson. But a timeout does **not** mean the call failed. The provider may have received your request and charged the customer; only the reply got lost. That uncertainty is the heart of this lesson.

### Retries: try again, carefully

Many failures are temporary: a brief network drop, a busy server. Retrying often works. Good retries follow a few rules:

* Retry only errors that might be temporary, such as timeouts and \`5xx\` codes, not \`400\` errors caused by bad input.
* Wait a little longer between each attempt, for example 1 second, then 2, then 4. This is called **exponential backoff**, and it avoids hammering a service that is already struggling.
* Stop after a few attempts and record the failure for a person or a scheduled job to follow up.

\`\`\`js
for (let i = 0; i < 3; i++) {
  try { return await callProvider(); }
  catch (e) { await sleep(1000 * 2 ** i); }
}
throw new Error("Provider unavailable");
\`\`\`

### Idempotency: safe to repeat

An operation is **idempotent** if doing it twice has the same effect as doing it once. Reading an order is naturally idempotent. Charging a customer is not, unless you make it so.

The common technique is an **idempotency key**: a unique id for each intended action, created once and sent with every attempt. Some providers accept one in a header; others ask for a unique reference per payment. Your own API can accept one too:

\`\`\`http
POST /payments
Idempotency-Key: order-981-pay
\`\`\`

When your server receives a request:

1. Look up the key. If you have already processed it, return the **same** result as before and do nothing else.
2. If not, process it and store the key with the result, in the same database transaction.

A unique constraint on the key column makes this safe even if two identical requests arrive at the same moment.

### Webhooks repeat too

Providers retry webhooks until you reply with a success code or give up. Treat the provider's transaction id as an idempotency key: if you have already recorded it, reply \`200\` and skip the work. Also ignore updates that would move a payment backwards, such as a late \`pending\` arriving after \`paid\`.

### On the phone side

Help the app avoid repeats too. Disable the Pay button after one tap, show a clear "processing" state and generate the idempotency key in the app before the first attempt, so a retry after a dropped connection reuses it.

### A worked scenario

Issahaku pays GHS 30 for a bus ticket in Tamale. The app sends \`POST /payments\` with key \`k1\`. The server starts the charge, but the reply never reaches his phone. The app retries with the same key \`k1\`. The server finds \`k1\`, sees the payment already in progress and returns its status. Issahaku is charged once, and the ticket is issued once when the webhook confirms payment.

### Recovery and reconciliation

Even with all this, some cases stay unclear. A scheduled job that checks old pending payments with the provider, plus daily reconciliation, catches what slips through. Robust systems assume things will go wrong and plan for it.`,
      practice_task_md: `**Goal:** make a payment endpoint safe to retry.

1. Add an \`idempotency_keys\` table with \`key\` (unique), \`response_json\` and \`created_at\`.
2. Update your \`POST /orders/:id/pay\` endpoint to require an \`Idempotency-Key\` header. If the key exists, return the stored response. If not, create the payment and store the key and response together in one transaction.
3. Write a script that sends the same request three times with the same key, then once with a new key. Confirm there are exactly two payments.
4. Write a retry helper with exponential backoff that calls a fake provider function which fails twice and then succeeds.

**Done looks like:** code on GitHub, plus a README section titled "What happens if the network drops" that explains your design in plain words.`,
      quiz: {
        questions: [
          {
            prompt: "A call to a payment provider times out. What can you safely conclude?",
            options: [
              "The payment definitely failed",
              "The payment definitely succeeded",
              "You do not know yet; the provider may have processed it and only the reply was lost",
              "The customer's account is closed",
            ],
            answer_index: 2,
            explanation: "The lesson stresses that a timeout does not mean failure.",
          },
          {
            prompt: "Which errors are sensible to retry?",
            options: [
              "Temporary ones such as timeouts and 5xx server errors",
              "400 errors caused by bad input",
              "Every error, forever, without waiting",
              "None; retries are never useful",
            ],
            answer_index: 0,
            explanation: "Bad input will fail again, but temporary errors may succeed on retry.",
          },
          {
            prompt: "What does exponential backoff mean?",
            options: [
              "Retrying as fast as possible",
              "Retrying only once a day",
              "Sending requests to many providers at once",
              "Waiting longer between each retry, such as 1, 2 and then 4 seconds",
            ],
            answer_index: 3,
            explanation: "Growing waits avoid hammering a struggling service.",
          },
          {
            prompt: "What does an idempotency key let your server do?",
            options: [
              "Charge the customer twice as fast",
              "Recognise a repeated request and return the earlier result instead of acting again",
              "Skip verifying webhooks",
              "Delete old orders",
            ],
            answer_index: 1,
            explanation: "The key identifies one intended action across retries.",
          },
          {
            prompt: "A late webhook says pending for a payment you already marked paid. What should you do?",
            options: [
              "Change the payment back to pending",
              "Charge the customer again",
              "Ignore the update because it would move the payment backwards",
              "Delete the payment",
            ],
            answer_index: 2,
            explanation: "The lesson says to ignore updates that move a payment backwards.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "sms-and-whatsapp": {
      explanation_md: `Order confirmations, delivery updates, fee reminders and sign in codes reach many Ghanaian customers by SMS or WhatsApp rather than email. Building these features well means integrating with a messaging provider's API, keeping your app fast when messages are slow, and respecting people's right to stop receiving them. Adverts we read mentioned integrations, event based communication and asynchronous processing, which is exactly what this work involves.

### Sending a message through a provider

You do not connect to the mobile network yourself. You sign up with an SMS or messaging provider, get API keys and a sender name, and call their API:

\`\`\`js
await fetch(SMS_API_URL, {
  method: "POST",
  headers: { Authorization: \`Bearer \${KEY}\` },
  body: JSON.stringify({
    to: "0241234567",
    text: "Order 981 is ready. Thank you!",
  }),
});
\`\`\`

Each provider's URL, fields and phone format differ, so read their documentation and use their test mode first. Many also send delivery reports to a webhook, using the same ideas as payment webhooks.

### Do not make users wait for messages

An SMS call might take a few seconds or fail. If your order endpoint waits for it, a slow provider makes your whole app slow. Instead, save the order, reply to the user straight away, and send the message in the **background**:

* Put a row in a \`messages\` table (or a job queue) with status \`queued\`.
* A separate worker picks up queued messages, sends them, and marks them \`sent\` or \`failed\`.
* Failed messages are retried a few times with backoff.

This is the background job pattern, and it is how teams handle anything slow: messages, receipts, reports.

### Keep messages short and useful

A single SMS holds up to 160 basic characters, and longer texts are split into several parts, each usually billed. Emoji or some accented letters cut that limit to 70. Write clearly and briefly: who it is from, what happened, what to do next. Never include passwords or full card or account details.

### Consent and opt outs

Only message people who expect it, and make it easy to stop. Store each person's preference, honour "STOP" replies where your provider supports them, and never send marketing to transactional only contacts. Ghana's Data Protection Act applies to phone numbers like any other personal data.

### WhatsApp

Businesses send WhatsApp messages through an official business platform, either directly or through a provider. Business initiated messages generally need pre approved templates, and customers must have agreed to hear from you. The backend pattern is the same: an API call to send, a webhook to receive replies and delivery updates.

### USSD in one paragraph

USSD menus, the kind you open by dialling a short code, work on basic phones with no data. Behind the scenes, a USSD gateway sends your server a request each time the user picks an option, with a session id and their input so far. Your server replies with the next menu text. Sessions time out quickly, so replies must be fast and menus short. This makes USSD a good fit for customers outside the cities and for cooperatives, schools and NGOs.

Imagine Hawa's school in Bolgatanga. Parents get a fee reminder by SMS, can check balances by USSD, and receive a receipt after paying by mobile money. All three use the same backend and database.`,
      practice_task_md: `**Goal:** send notifications in the background without slowing your API.

1. Add a \`messages\` table with \`id\`, \`to_phone\`, \`text\`, \`status\`, \`attempts\` and \`created_at\`.
2. When an order is created, insert a \`queued\` message instead of sending one directly. Return the order response straight away.
3. Write a worker script that runs every few seconds, picks queued messages, "sends" them by printing to the terminal (or calls a provider's test mode), and marks them \`sent\`.
4. Make the fake sender fail randomly one time in three, and retry failed messages up to three times.
5. Add an \`opted_out\` flag to customers and make sure the worker skips them.

**Done looks like:** code on GitHub with terminal output showing messages queued, a failure retried, and an opted out customer skipped.`,
      quiz: {
        questions: [
          {
            prompt: "Why should an order endpoint not wait for the SMS to send before replying?",
            options: [
              "SMS messages cannot be sent from servers",
              "A slow or failing provider would make the whole app slow",
              "Customers prefer to wait",
              "Databases cannot store messages",
            ],
            answer_index: 1,
            explanation: "Sending in the background keeps the API fast.",
          },
          {
            prompt: "In the background job pattern, what does the worker do?",
            options: [
              "Deletes orders that are older than a day",
              "Designs the frontend",
              "Picks up queued messages, sends them and records whether they were sent or failed",
              "Approves mobile money payments",
            ],
            answer_index: 2,
            explanation: "The worker processes the queue separately from the request.",
          },
          {
            prompt: "Why should SMS messages be kept short?",
            options: [
              "Short messages are encrypted",
              "Long messages cannot contain numbers",
              "Providers refuse any message over ten words",
              "Longer texts are split into several parts, and each part is usually billed",
            ],
            answer_index: 3,
            explanation: "The lesson explains that long texts split into billed parts.",
          },
          {
            prompt: "How does a USSD service work behind the scenes?",
            options: [
              "A gateway sends your server a request for each choice, and your server replies with the next menu",
              "The phone downloads an app from your server",
              "Your server calls the user on the phone",
              "USSD only works with WhatsApp",
            ],
            answer_index: 0,
            explanation: "Each USSD step is a short request and reply.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "production": {
      explanation_md: `"Production" means the real, live system that real customers use. Code that runs perfectly on your laptop faces new challenges there: many users at once, attackers probing for weaknesses, power cuts at the data centre, a provider going down at month end. The adverts we read asked for testing, deployment, cloud experience, debugging and security awareness, even in junior roles, because these habits are what make a service trustworthy.

### What changes in production

* **Real data and money.** Mistakes now affect real people. A bug that marks an unpaid order as paid costs the business.
* **Strangers on the internet.** Your API is public. Automated bots scan the internet and may try common passwords and known attacks soon after you go live.
* **Things fail.** Servers restart, databases fill up, networks drop. You need to notice quickly and recover.
* **You cannot see the screen.** When a customer in Wa says "it did not work", you rely on logs and monitoring to find out why.

### What this section covers

* **Security basics:** common attacks, keeping secrets safe and handling personal data responsibly under Ghana's data protection law.
* **Automated testing:** code that checks your code, especially around money and permissions, so you can change things with confidence.
* **Deploying and monitoring on free tiers:** putting your API online, keeping configuration in environment variables and reading logs when something breaks.
* **Containers with Docker (optional):** packaging your app so it runs the same everywhere.

### A useful mindset

Experienced teams assume things will go wrong and design for it. They ask questions like:

* If this server restarts in the middle of a payment, what happens?
* If someone sends a million requests, what breaks first?
* If a teammate changes this function next month, how will we know it still works?
* If the database is lost tonight, how do we get it back?

You do not need perfect answers yet. Asking the questions already puts you ahead.

### Good habits that cost nothing

* Keep secrets out of code and Git, in environment variables.
* Log important events (sign ins, payments, errors) with enough detail to investigate, but never log passwords, codes or full card numbers.
* Back up your database and practise restoring it once, so you know the backup works.
* Change one thing at a time, and deploy small changes often rather than huge ones rarely.
* Write down what you did when something broke and how you fixed it. Teams call this a post incident review, and it stops the same problem happening twice.

### Learning on a budget

You can practise every part of this section for free. Testing tools are free and open source. Several hosting platforms have free tiers suitable for small projects, with limits such as sleeping when idle or a cap on usage. Free monitoring tools can check your site every few minutes and alert you by email when it goes down.

Imagine Sumaila has built an API for a farmers' cooperative in Yendi. Before telling anyone about it, he adds tests for the payment flow, moves his keys into environment variables, deploys it on a free tier and sets up an uptime check. When the database fills up two months later, an alert tells him before the farmers notice.`,
      practice_task_md: `**Goal:** review one of your own projects with production eyes.

1. Pick an API you built earlier in this roadmap.
2. Answer in writing, for that project: where are the secrets stored? What gets logged? What happens if the server restarts mid request? What would an attacker try first? How would you restore the data?
3. For each answer you are unhappy with, write one concrete fix.
4. Add a \`PRODUCTION.md\` file to the repository with your answers and planned fixes.

**Done looks like:** a \`PRODUCTION.md\` with at least five questions answered honestly and three fixes listed. Talk it through with your mentor; this is exactly the kind of thinking interviewers look for.`,
      quiz: {
        questions: [
          {
            prompt: "What does production mean in this lesson?",
            options: [
              "The code on your laptop before you test it",
              "The real, live system that real customers use",
              "A video about your project",
              "The company's marketing department",
            ],
            answer_index: 1,
            explanation: "Production is the live system serving real users.",
          },
          {
            prompt: "Why do logs and monitoring matter in production?",
            options: [
              "They make the app load faster",
              "They replace the need for tests",
              "You cannot see the user's screen, so they tell you what happened",
              "They are required to write SQL",
            ],
            answer_index: 2,
            explanation: "Logs and monitoring are how you investigate problems you cannot see.",
          },
          {
            prompt: "Which of these should never be written to logs?",
            options: [
              "The time a payment was received",
              "An error message from the database",
              "The route that was called",
              "Passwords and one time codes",
            ],
            answer_index: 3,
            explanation: "Logs must not contain secrets such as passwords and codes.",
          },
          {
            prompt: "Why should you practise restoring a backup at least once?",
            options: [
              "To be sure the backup actually works before you need it",
              "Because backups expire after one restore",
              "To make the database smaller",
              "Because hosting platforms require it",
            ],
            answer_index: 0,
            explanation: "An untested backup might not restore when you need it.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "security": {
      explanation_md: `Banks, fintechs and telcos in Ghana handle money and personal data, so security knowledge appears in their adverts. You do not need to be a security specialist, but you must avoid the common mistakes that let attackers in. A short list of well understood problems is behind many real breaches.

### Common attacks and how to stop them

**Injection.** If user input becomes part of a database query or system command, an attacker can run their own code. Always use parameterised queries, as you learned in the SQL lesson. Never build queries by gluing strings together.

**Broken access control.** A user changes \`/orders/41\` to \`/orders/42\` and sees someone else's order. Check permissions on the server for every request, as in the authorisation lesson. It is the first item (A01) in the OWASP Top Ten 2025 list of web application risks.

**Weak authentication.** Plain text passwords, unlimited login attempts or codes that never expire. Hash passwords, limit attempts and expire codes quickly.

**Exposed secrets.** API keys pushed to GitHub or pasted in chat groups. Bots scan public code for keys constantly. Keep secrets in environment variables and rotate any key that leaks.

**Outdated dependencies.** Old libraries with known security holes. Run your package manager's audit command, such as \`npm audit\`, and update regularly.

### Secrets and configuration

\`\`\`js
const key = process.env.PAYMENT_SECRET;
if (!key) throw new Error("Missing secret");
\`\`\`

Your code reads the key from the environment. Locally it comes from a \`.env\` file listed in \`.gitignore\`; in production it is set in your hosting dashboard. Use different keys for test and live.

### Limit abuse

Add **rate limiting** so one person or bot cannot send thousands of requests a minute, especially to sign in, code request and payment endpoints. Many frameworks have a small library for this.

### HTTPS and headers

Serve everything over HTTPS. Most hosting platforms do this automatically. Security headers, often added with a small library, tell browsers to block some common attacks.

### Personal data and Ghana's law

Ghana's Data Protection Act, 2012 (Act 843) sets rules for how organisations collect and use personal data, and the Data Protection Commission oversees it. As a developer, practical habits that support it include:

* Collect only what you need. If you do not need a date of birth, do not ask.
* Protect what you keep: access controls, encryption in transit, careful backups.
* Do not use data for a different purpose than people agreed to.
* Delete data you no longer need.
* Never copy real customer data onto your laptop for testing. Use made up data.

Your employer will have its own policies and legal advice; your job is to build systems that make following them easy.

### A worked scenario

Imagine Amina reviewing a teammate's endpoint for a Tamale microfinance app. She would spot three problems: the query is built with string joining, there is no check that the loan belongs to the signed in user, and the error response includes the database message. She would suggest parameters, a permission check and a plain error message. Spotting issues like these in code review is a valued junior skill.

### Keep learning

The OWASP Top Ten is a free, regularly updated list of the most important web application risks. Read one item a week and check your own projects against it.`,
      practice_task_md: `**Goal:** run a security review on your own API.

1. Pick your most complete project from this roadmap.
2. Check and fix: every query uses parameters; every endpoint that returns private data checks the user; passwords or codes are hashed and expire; no secrets are in the code or Git history; errors do not reveal internal details.
3. Run your package manager's audit command and update anything flagged that you can.
4. Add rate limiting to your sign in or code request endpoint.
5. Write a \`SECURITY.md\` listing what you checked, what you fixed and what you would still improve.

**Done looks like:** a commit with your fixes and a \`SECURITY.md\` your mentor can read in five minutes.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main defence against SQL injection?",
            options: [
              "Hiding the database password in the frontend",
              "Using parameterised queries instead of joining strings",
              "Turning off HTTPS",
              "Using shorter table names",
            ],
            answer_index: 1,
            explanation: "Parameters make input data, never code.",
          },
          {
            prompt: "A user changes an id in the URL and sees another customer's order. What kind of flaw is this?",
            options: [
              "Injection",
              "Outdated dependencies",
              "Broken access control",
              "Weak password hashing",
            ],
            answer_index: 2,
            explanation: "Missing permission checks are broken access control.",
          },
          {
            prompt: "Where should API keys and secrets live?",
            options: [
              "In the code, so teammates can find them",
              "In a WhatsApp group for the team",
              "In environment variables, kept out of Git",
              "In the README",
            ],
            answer_index: 2,
            explanation: "Environment variables keep secrets out of code and Git.",
          },
          {
            prompt: "Which practice supports Ghana's Data Protection Act?",
            options: [
              "Collecting as much personal data as possible just in case",
              "Copying real customer data to your laptop for testing",
              "Keeping data forever even when not needed",
              "Collecting only what you need and deleting what you no longer need",
            ],
            answer_index: 3,
            explanation: "The lesson lists data minimisation and deletion as good habits.",
          },
          {
            prompt: "What does rate limiting protect against?",
            options: [
              "One person or bot sending huge numbers of requests, such as guessing codes",
              "Users with slow phones",
              "Database migrations",
              "Typos in SQL",
            ],
            answer_index: 0,
            explanation: "Rate limiting caps how many requests can be made in a period.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "testing": {
      explanation_md: `Unit testing, test coverage and quality appeared in several of the backend adverts we read. Tests are small programs that check your code does what you expect. They let you change code without fear, and they show an employer that you care whether things actually work, not just whether they ran once on your laptop.

### Why tests matter for backend work

Imagine you change how amounts are rounded. Without tests, you would have to click through every payment screen to check nothing broke. With tests, you run one command and see in seconds whether every money calculation is still correct. On a team, tests also run automatically on every pull request, so nobody merges a change that breaks something.

### Kinds of tests

* **Unit tests** check one small function, such as \`normalisePhone\` or \`dailyTotal\`.
* **Integration tests** check several parts together, such as calling an API endpoint and checking what it saved in the database.
* **End to end tests** drive the whole system like a user would. They are slower, so teams have fewer of them.

Most of your tests should be fast unit and integration tests.

### A unit test

With a test runner such as Vitest or Jest in JavaScript (or pytest in Python):

\`\`\`js
import { test, expect } from "vitest";
import { normalisePhone } from "./phone.js";

test("accepts the 233 form", () => {
  expect(normalisePhone("+233 24 123 4567"))
    .toBe("0241234567");
});

test("rejects short numbers", () => {
  expect(normalisePhone("12345")).toBe(null);
});
\`\`\`

Each test has a clear name, sets up an input, runs the code and checks the result.

### Testing an API endpoint

Libraries let you send fake HTTP requests to your app without starting a real server:

\`\`\`js
const res = await request(app)
  .post("/orders")
  .send({ items: [] });
expect(res.status).toBe(400);
\`\`\`

This checks that an empty order is rejected. You can do the same for the happy path and for permission checks.

### What to test first

You cannot test everything, so focus where mistakes hurt most:

* money calculations and payment status changes
* permission checks (can user A see user B's data?)
* validation of important inputs
* the idempotency logic: the same request twice creates one payment
* bugs you have fixed, so they never come back

### Testing things you do not control

You should not call a real payment provider in your tests. Replace it with a **fake** (often called a mock) that returns the answers you choose, including failures and timeouts. That way you can test "what if the provider is down?" any time, for free, with no data.

### Make it a habit

Write a test when you write a function, or even before. Run tests before every commit. If a test fails, read the message: it tells you what was expected and what actually happened. Imagine Mariama joins a remote team and her first pull request includes tests for the edge cases she handled. That is often noticed and appreciated more than a clever feature.`,
      practice_task_md: `**Goal:** add meaningful tests to one of your projects.

1. Install a test runner (Vitest or Jest for Node.js, pytest for Python).
2. Write at least four unit tests for your validation functions, including tricky inputs like \`+233\` numbers, spaces, zero amounts and empty strings.
3. Write at least three endpoint tests: a successful order, a rejected invalid order, and a user trying to read someone else's order.
4. Write one test that sends the same payment request twice with the same idempotency key and checks only one payment exists, using a fake provider.
5. Add a "How to run tests" section to your README.

**Done looks like:** at least eight passing tests, a screenshot of the test output, and the command to run them in the README.`,
      quiz: {
        questions: [
          {
            prompt: "What is a unit test?",
            options: [
              "A test that checks one small function, such as a phone number checker",
              "A test that clicks through the whole app in a browser",
              "A survey sent to users",
              "A way to measure server speed",
            ],
            answer_index: 0,
            explanation: "Unit tests check one small piece of code.",
          },
          {
            prompt: "Why should you not call a real payment provider in your tests?",
            options: [
              "Providers do not allow testing at all",
              "Real providers make tests too easy",
              "A fake lets you test failures and timeouts any time, for free, with no data",
              "Tests cannot use the internet under any circumstances",
            ],
            answer_index: 2,
            explanation: "Fakes give you control over provider behaviour.",
          },
          {
            prompt: "Which area does the lesson say to test first?",
            options: [
              "The colour of buttons",
              "The README formatting",
              "The length of variable names",
              "Money calculations, payment status changes and permission checks",
            ],
            answer_index: 3,
            explanation: "Focus tests where mistakes hurt most.",
          },
          {
            prompt: "What is one benefit of tests on a team?",
            options: [
              "They remove the need for code review",
              "They run on every pull request so changes that break things are caught before merging",
              "They make the server use less memory",
              "They replace documentation",
            ],
            answer_index: 1,
            explanation: "Automated tests catch breakage before merging.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "deploy-and-monitor": {
      explanation_md: `A live API with a public link is one of the strongest things you can show an employer. It proves you can take code all the way from your laptop to the internet, which is what adverts mean when they list deployment, cloud platforms and CI/CD. You can do it without paying, using free hosting tiers.

### What deploying means

Deploying is copying your code to a computer that is always on and connected, installing its dependencies, setting its configuration and starting it so anyone can reach it by URL. Modern hosting platforms do most of this for you: you connect your GitHub repository, and every time you push to the main branch, they build and restart your app automatically. That automatic build and release is a simple form of **continuous deployment**.

### Free tiers: what to expect

Several platforms offer free plans for web services and databases. They are great for learning and portfolios, but read the limits before you choose. Common ones include:

* the app **sleeps** after a period with no visitors, so the first request afterwards is slow while it wakes up
* a monthly cap on hours, requests or bandwidth
* small databases that may **pause** when idle or be removed after a period on the free plan
* some platforms ask for a card to verify your identity even on free plans, and others do not

Choose based on what your project needs and what you can access. None is the "right" one. Mention in your README that the first request may be slow if the app has been asleep, so a reviewer is not surprised.

### Configuration with environment variables

Your code should not change between your laptop and production; only the configuration should. Database URLs, API keys and the port all come from environment variables:

\`\`\`js
const port = process.env.PORT || 3000;
app.listen(port);
\`\`\`

Set the real values in your hosting dashboard. Many platforms set \`PORT\` for you, so your app must read it.

### Running migrations

When you deploy a change that needs a database update, run your migrations as part of the release. Many platforms let you add a release command for this.

### Logs

When something breaks, open the platform's log viewer first. Good logs say what happened, when, and with which request:

\`\`\`js
console.log(JSON.stringify({
  event: "payment_failed",
  ref: payment.reference,
  reason: err.message,
}));
\`\`\`

Writing logs as JSON makes them easy to search and filter.

### Health checks and monitoring

Add a simple endpoint that confirms the app and database are working:

\`\`\`js
app.get("/health", async (req, res) => {
  await db.query("SELECT 1");
  res.json({ ok: true });
});
\`\`\`

Free uptime services can call it every few minutes and email you when it fails. Watch for slow responses and error rates too, not only whether the app is up.

### A worked scenario

Imagine Fuseini deploying his chop bar orders API. He connects the repository, sets \`DATABASE_URL\` and \`PAYMENT_SECRET\` in the dashboard, adds a release command for migrations and a \`/health\` endpoint, and sets up a free uptime check. A week later, an alert arrives: the free database has hit its size limit. He finds it in the logs, clears out old test data, and adds a note to his README about the limit. That troubleshooting story is great material for an interview.

### Before you share the link

Use test keys only, add sample data with made up names, and make sure there is no way for strangers to see private data.`,
      practice_task_md: `**Goal:** put one of your APIs online for free and watch it.

1. Choose a hosting platform with a free tier that suits your project. Read its limits and note them in your README.
2. Connect your GitHub repository and set your environment variables in the dashboard. Use a free hosted database or a file based one if the platform allows it.
3. Make sure your app reads \`PORT\` from the environment and has a \`/health\` endpoint.
4. Deploy, then call your endpoints from a browser, on a phone or a computer, or with \`curl\`.
5. Set up a free uptime check on \`/health\`.
6. Push a small change and confirm it deploys automatically.

**Done looks like:** a public URL in your README, a screenshot of the platform's logs, and a short note on the free tier limits you found.`,
      quiz: {
        questions: [
          {
            prompt: "What does continuous deployment mean in this lesson?",
            options: [
              "Deploying by copying files by hand once a year",
              "Running the app only on your laptop",
              "The platform automatically builds and releases your app when you push to the main branch",
              "Paying for a server monthly",
            ],
            answer_index: 2,
            explanation: "The lesson describes automatic build and release on push as continuous deployment.",
          },
          {
            prompt: "A free tier app is slow on the first request after a quiet period. What is the likely reason?",
            options: [
              "The app was sleeping and had to wake up",
              "The database was deleted",
              "The code has a syntax error",
              "HTTPS is turned off",
            ],
            answer_index: 0,
            explanation: "Many free tiers put idle apps to sleep.",
          },
          {
            prompt: "Why should database URLs and keys come from environment variables?",
            options: [
              "So that they appear in the README",
              "Because code cannot contain text",
              "So the same code runs everywhere and only configuration changes",
              "Because hosting platforms cannot read files",
            ],
            answer_index: 2,
            explanation: "Configuration lives outside code, keeping secrets safe.",
          },
          {
            prompt: "What is the purpose of a /health endpoint?",
            options: [
              "To show users their medical records",
              "To list every route in the API",
              "To reset the database",
              "To let monitoring tools confirm the app and database are working",
            ],
            answer_index: 3,
            explanation: "Uptime tools call it to check the service is healthy.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "containers": {
      explanation_md: `Docker appeared in several of the backend and remote adverts we read, often alongside cloud platforms and Kubernetes. It is rarely a hard requirement for a first junior role, which is why this lesson is optional, but understanding containers helps you follow team conversations and makes your projects easier for others to run.

### The problem containers solve

"It works on my machine" is a classic developer complaint. Your app runs on your laptop with a certain version of Node.js or Python, certain libraries and certain settings. A teammate or a server has different versions, and things break. A **container** packages your app together with everything it needs to run, so it behaves the same everywhere.

### Images and containers

* An **image** is the recipe and ingredients: your code, the language runtime, libraries and the command to start.
* A **container** is a running copy of that image. You can start many containers from one image.

You describe an image in a file called a \`Dockerfile\`:

\`\`\`dockerfile
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "server.js"]
\`\`\`

Line by line: start from a small official Node.js image, work in \`/app\`, copy the package files and install dependencies, copy the rest of the code, and set the start command.

Then build and run it:

\`\`\`bash
docker build -t orders-api .
docker run -p 3000:3000 orders-api
\`\`\`

### Running a database alongside

A tool called Docker Compose lets you describe several containers in one file, such as your API and a PostgreSQL database, and start them together with one command. New teammates can then run the whole system in minutes instead of spending a day installing things.

### Configuration and secrets

Pass settings into containers as environment variables, never bake secrets into the image. Images are often shared, and anything inside can be read.

### Where containers run

Many hosting platforms can deploy straight from a \`Dockerfile\`. Larger companies run many containers across many servers using orchestration tools such as Kubernetes. As a junior, you mainly need to write a sensible \`Dockerfile\`, run containers locally and read the logs.

### Working with limited data and older laptops

Docker downloads images, and some are large, so it can eat a data bundle quickly. Prefer small "slim" or "alpine" base images, download them once on a good connection and reuse them. Docker Desktop also needs a reasonable amount of memory, which can be hard on older laptops. It is fine to learn the concepts now, write a \`Dockerfile\` for your project, and test it later on a better connection or let a hosting platform build it for you.

### A worked scenario

Imagine Issahaku joining a remote team. Their README says "run \`docker compose up\`". In one command he has the API, database and a cache running locally, exactly like his teammates. Later he adds a \`Dockerfile\` to his own portfolio project so reviewers can run it the same way, and mentions it in interviews.`,
      practice_task_md: `**Goal:** containerise one of your APIs.

1. Write a \`Dockerfile\` for your orders API using a slim base image, like the lesson's example.
2. Add a \`.dockerignore\` file that excludes \`node_modules\`, \`.env\` and \`.git\`.
3. If you have Docker and enough data, build and run it, then call \`/health\` from your browser.
4. If you cannot run Docker yet, deploy using a hosting platform that builds from a \`Dockerfile\`, or ask your mentor to review the file.
5. Add a README section explaining how to run the project with Docker.

**Done looks like:** a \`Dockerfile\` and \`.dockerignore\` in your repository, plus either a screenshot of the container running or a successful platform build log.`,
      quiz: {
        questions: [
          {
            prompt: "What problem do containers mainly solve?",
            options: [
              "They make code run without electricity",
              "They package an app with everything it needs so it behaves the same everywhere",
              "They replace the need for a database",
              "They make apps free to host",
            ],
            answer_index: 1,
            explanation: "Containers fix the \"works on my machine\" problem.",
          },
          {
            prompt: "What is the difference between an image and a container?",
            options: [
              "They are the same thing",
              "A container is the recipe; an image is a running copy",
              "An image is a type of database",
              "An image is the recipe and contents; a container is a running copy of it",
            ],
            answer_index: 3,
            explanation: "You start containers from images.",
          },
          {
            prompt: "Why should secrets not be baked into a Docker image?",
            options: [
              "Images cannot contain text files",
              "Images are often shared, and anything inside them can be read",
              "Secrets make images run slower",
              "Docker deletes secrets automatically",
            ],
            answer_index: 1,
            explanation: "Pass secrets as environment variables at run time instead.",
          },
          {
            prompt: "What does the lesson suggest if you are on limited data?",
            options: [
              "Never learn Docker",
              "Download the largest images available",
              "Use slim base images, download them once on a good connection and reuse them",
              "Rebuild every image from scratch daily",
            ],
            answer_index: 2,
            explanation: "Small images and reuse save data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-hired": {
      explanation_md: `Backend work is mostly invisible. A frontend developer can show a beautiful screen; you are showing data that saves correctly, payments that never double charge and errors that make sense. So you have to work a little harder to make your skills visible. The good news is that at least one junior advert we read said plainly that personal projects, internships and freelance work count as experience, and a national service advert said GitHub projects give candidates an edge. You can build that proof yourself.

### What employers look for in a junior

Across the junior and graduate adverts we studied, a pattern appears:

* one language used well, plus a framework
* SQL and a relational database
* building and consuming REST APIs
* Git and GitHub, with real projects on show
* testing and debugging
* some awareness of security, deployment and cloud
* teamwork, clear communication and willingness to learn

Notice how much of that you can demonstrate with two or three good projects and a tidy GitHub profile.

### Where the jobs are

In Ghana, backend and software roles appear at fintechs and payment companies, telcos, banks and microfinance institutions, software agencies and consultancies, logistics and e commerce startups, NGOs with digital programmes, and graduate or national service programmes run by tech companies. Remote roles come from companies across Africa and beyond; some say clearly that they hire Africa based developers, and others are limited to certain countries, so read each advert carefully.

Freelance and small business work also counts. A shop, school, church or cooperative near you might need a simple system for orders, fees or records. Done well and documented honestly, that is real experience.

### What this section covers

* **A backend portfolio:** two or three deployed projects that show the skills above, with clear READMEs and short demo videos.
* **Job search, freelancing and interviews:** finding roles, applying well, getting through technical interviews and handling freelance work professionally.

### Showing work that is invisible

Help reviewers see what you built:

* A README that explains the problem, the design and how to run it.
* A diagram of your tables and the payment flow.
* A short screen recording, from your computer or phone, showing requests and responses.
* Notes on trade offs: "I chose X because Y; next I would add Z."

### Be honest

Never claim experience you do not have, and never present a tutorial project as your own design. Interviewers ask follow up questions, and honesty builds trust. "I built this to learn, and here is what I would do differently" is a strong answer.

### Build your support network

Join developer communities, attend meetups when you can, including online ones, and help others with what you know. Opportunities often come from people who have seen your work or your questions in a community. Ask your SydCrest mentor to review your projects before you send them to employers.

Imagine Abdul-Rahman in Wa with two deployed APIs, a clean GitHub profile and a habit of explaining his design choices. Whether he applies to an Accra fintech, a remote startup or a local agency, he can show rather than tell.`,
      practice_task_md: `**Goal:** see where you stand and plan your proof.

1. Copy the list of junior skills from this lesson into a notes app.
2. Next to each skill, write the project or commit that proves it, or "not yet".
3. For every "not yet", write one small task that would fix it, using lessons from this roadmap.
4. Look at three real adverts you would apply for and add any skill they mention that is not on your list.

**Done looks like:** a one page skills map with evidence links and a short plan. Share it with your mentor and agree on your next two projects.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson say backend developers must work harder to make skills visible?",
            options: [
              "Backend work is not important to employers",
              "Backend work is mostly invisible, unlike a screen a frontend developer can show",
              "Backend code cannot be put on GitHub",
              "Employers do not read READMEs",
            ],
            answer_index: 1,
            explanation: "Backend results such as correct data are hard to see without explanation.",
          },
          {
            prompt: "According to the lesson, what did a junior advert say counts as experience?",
            options: [
              "Only paid work at large companies",
              "Only university grades",
              "Personal projects, internships and freelance work",
              "Only certificates",
            ],
            answer_index: 2,
            explanation: "The lesson notes that projects, internships and freelance work were accepted as experience.",
          },
          {
            prompt: "What should you check before applying for a remote role?",
            options: [
              "Nothing, because all remote roles hire from anywhere",
              "Whether it hires Africa based developers or is limited to certain countries",
              "Whether the company uses dark mode",
              "Whether the advert is longer than one page",
            ],
            answer_index: 1,
            explanation: "Some remote roles are restricted by country.",
          },
          {
            prompt: "Which is the best way to talk about a tutorial based project?",
            options: [
              "Say you designed it entirely yourself",
              "Hide it from your profile",
              "Explain honestly that you built it to learn and what you would do differently",
              "Claim it is used by thousands of customers",
            ],
            answer_index: 2,
            explanation: "Honesty builds trust with interviewers.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "portfolio": {
      explanation_md: `A strong backend portfolio is not twenty half finished projects. It is two or three deployed, tested, well explained systems that show the skills employers ask for. When a hiring manager at an Accra fintech or a remote startup opens your GitHub, they should understand in two minutes what you built, why, and how well.

### Project ideas that fit Ghana

Pick projects that solve problems you understand. They are more interesting to build and to talk about:

* **Orders and mobile money for a small shop.** Products, orders, a simulated payment flow with signed webhooks and idempotency, and SMS notifications through a background queue. This one project shows almost every skill in this roadmap.
* **School fees or church dues tracker.** Members, payments, balances, reminders and a treasurer role with permissions. Add a simple USSD style menu endpoint.
* **Farmers' cooperative records.** Members, deliveries in kilograms, payouts in pesewas, and reports by community. Handle offline field officers who sync later, which raises interesting questions about duplicates.
* **Bus or event ticket booking.** Seats that must not be sold twice, which teaches transactions and locking.

Use test keys and made up data only. Never put real customer data in a portfolio.

### What every project should include

* **A live link** on a free hosting tier, with a note if it sleeps when idle.
* **A clear README:** the problem in two sentences, the features, a table of endpoints, how to run it locally and how to run the tests.
* **A diagram** of the database tables and, for payment projects, the flow from request to webhook.
* **Tests** for the important parts, and a badge or screenshot showing they pass.
* **A "decisions" section:** two or three choices you made and why, and what you would improve next.
* **Clean history:** small commits with clear messages.

### A demo video

Many reviewers will not run your code. Record a two minute video on your phone or with a free screen recorder: show a request, the response, the database row it created, and what happens when you send the same payment twice. Keep the file small and upload it somewhere that streams well on mobile data, then link it from the README.

### Your GitHub profile

* Pin your best two or three repositories.
* Add a short profile README: who you are, what you build, and how to reach you.
* Remove or archive abandoned experiments so the good work stands out.

### Quality over quantity

One excellent project beats five rough ones. Imagine Hawa from Bolgatanga with a single shop orders project: deployed, tested, documented, with a payment flow that handles retries correctly and a clear video. In an interview she can talk for twenty minutes about the decisions behind it. That depth is exactly what interviewers test.

### Keep improving

After feedback from your mentor or a reviewer, open issues on your own repository and fix them in small pull requests. That shows you can take feedback and work the way real teams do.`,
      practice_task_md: `**Goal:** turn your best project into a portfolio piece.

1. Choose the most complete API you have built in this roadmap.
2. Make sure it is deployed, has tests and uses only test keys and made up data.
3. Rewrite the README with these sections: Problem, Features, Endpoints, Database diagram, How to run, How to test, Decisions, What next.
4. Record a demo video of two minutes or less and link it.
5. Pin the repository on your GitHub profile and add a profile README.
6. Ask your mentor to review it and open at least two issues from their feedback.

**Done looks like:** a pinned repository with a live link, passing tests, a complete README and a demo video. Share the link with your mentor and your SydCrest community.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say a strong backend portfolio looks like?",
            options: [
              "Twenty small tutorial projects",
              "Two or three deployed, tested, well explained systems",
              "One very long README with no code",
              "A list of every language you have tried",
            ],
            answer_index: 1,
            explanation: "Quality and completeness beat quantity.",
          },
          {
            prompt: "Why does the lesson recommend a short demo video?",
            options: [
              "Videos replace the need for code",
              "Hosting platforms require videos",
              "Many reviewers will not run your code, but they will watch a short video",
              "Videos make the API faster",
            ],
            answer_index: 2,
            explanation: "A video shows your work to people who will not run it.",
          },
          {
            prompt: "Which data should you use in portfolio projects?",
            options: [
              "Test keys and made up data only",
              "Real customer data from a friend's shop",
              "Live payment keys so it feels real",
              "Data copied from a company you worked for",
            ],
            answer_index: 0,
            explanation: "Never use real customer data or live keys in a portfolio.",
          },
          {
            prompt: "What is the purpose of a decisions section in a README?",
            options: [
              "To list your favourite foods",
              "To hide mistakes from reviewers",
              "To show how many lines of code you wrote",
              "To explain choices you made, why, and what you would improve",
            ],
            answer_index: 3,
            explanation: "It shows your thinking, which interviewers value.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "job-search": {
      explanation_md: `You have skills and projects. Now you need someone to hire you, or pay you for a job. Searching takes persistence, and rejections are normal for everyone. Treat it like a project: a plan, steady effort and learning from each attempt.

### Where to look

* **Ghanaian job boards** and company career pages for fintechs, telcos, banks, agencies and startups.
* **Graduate trainee and national service programmes** run by tech companies, which often include training and a path to a full role.
* **Internships** for students, which can lead to offers.
* **Remote job boards** that list roles open to Africa based applicants. Check location rules, time zones and how you would be paid before applying.
* **Communities and meetups**, online and in person, where people share openings before they are advertised.
* **Local businesses** that could use a system you know how to build.

### Applying well

* Read the advert carefully and apply only if you meet most of it. "Junior" adverts can list more than they truly need, so do not rule yourself out over one missing tool.
* Write a short message for each application that links one project to their work: "I built a mobile money orders API with idempotent webhooks, which matches your payments work."
* Keep a one page CV with links to your GitHub, live projects and demo video.
* Track applications in a simple table: company, role, date, status, follow up date.

### Technical interviews

Backend interviews often include:

* **Coding exercises:** small problems with arrays, strings and objects. Talk through your steps before typing, as you practised in the fundamentals lesson.
* **Take home tasks:** build a small API in a few hours. Include tests and a short README; that alone sets you apart.
* **Design questions:** "How would you build a payment system?" Talk about tables, endpoints, webhooks, retries and idempotency. Draw boxes and arrows.
* **Project questions:** "Tell me about something you built." Explain the problem, your decisions, a bug you fixed and what you would do differently.

If you do not know something, say so and explain how you would find out. That is far better than guessing.

### Freelancing

Small integrations, such as adding mobile money to a shop's website or building a fees tracker for a school, are real work. Do it professionally:

* Agree the scope, price and timeline in writing before starting, even in a WhatsApp message.
* Ask for part of the payment upfront for larger jobs.
* Use the client's own payment provider account so their money goes straight to them, never through your personal wallet.
* Hand over documentation and access when you finish.

### Keep going

Imagine Mariama sends ten tailored applications in a month, gets two interviews and one rejection with feedback. She uses the feedback to improve her take home task approach. Each round makes her stronger. Keep building, keep sharing your work, and lean on your SydCrest mentor and community. Persistence and visible work open doors.`,
      practice_task_md: `**Goal:** start a focused job search this week.

1. Make a tracking table (a spreadsheet or notes app) with columns: company, role, link, date applied, status, follow up date.
2. Find five roles you could apply for: at least two in Ghana, one graduate or national service programme and one remote role open to Africa based applicants.
3. For each, write a three sentence message linking one of your projects to their work.
4. Practise one design question out loud, such as "How would you build a mobile money payment flow?", and record yourself on your phone or computer in under five minutes.
5. Identify one local business or organisation that might need a small system, and write a short, honest offer.

**Done looks like:** a tracking table with five entries, five tailored messages and a recorded practice answer. Review the recording with your mentor.`,
      quiz: {
        questions: [
          {
            prompt: "How should you treat a junior advert that lists one tool you have not used?",
            options: [
              "Never apply, because you must match every line",
              "Apply if you meet most of it, since junior adverts can list more than they truly need",
              "Apply and claim you know the tool",
              "Wait a year before applying",
            ],
            answer_index: 1,
            explanation: "The lesson advises not ruling yourself out over one missing tool.",
          },
          {
            prompt: "In a design interview question about payments, what should you talk about?",
            options: [
              "Only the colour scheme of the app",
              "Your favourite programming language",
              "Tables, endpoints, webhooks, retries and idempotency",
              "How quickly you can type",
            ],
            answer_index: 2,
            explanation: "These are the core parts of a payment design.",
          },
          {
            prompt: "What should you do in an interview if you do not know an answer?",
            options: [
              "Guess confidently",
              "Change the subject",
              "End the interview",
              "Say so and explain how you would find out",
            ],
            answer_index: 3,
            explanation: "Honesty and a clear approach beat guessing.",
          },
          {
            prompt: "When freelancing on a payment integration, where should the customer's money go?",
            options: [
              "Through your personal mobile money wallet first",
              "Into a shared account you control",
              "Straight to the client's own payment provider account",
              "To whoever finishes the job first",
            ],
            answer_index: 2,
            explanation: "Using the client's own account keeps their money out of your hands.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
