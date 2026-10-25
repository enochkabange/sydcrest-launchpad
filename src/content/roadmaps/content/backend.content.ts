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
* **Git and GitHub.** Teams track every change to their code with Git, and share it on platforms such as GitHub. Adverts for junior roles list Git almost every time, and your GitHub profile becomes part of your CV.

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
      explanation_md: `Git appears in almost every software job advert, from national service placements to remote roles. Teams use it to track every change, work on features without breaking each other's code and review work before it goes live. For you as a job seeker, a GitHub profile with real projects is often the first thing an employer looks at.

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
5. Create an empty repository on GitHub and follow its instructions to push your project. You can use the GitHub website on your phone to check it arrived.

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

Java and C# appear often in bank and large company adverts. They are excellent languages, but they are heavier to set up on a modest machine. You can learn one later if a specific employer needs it.

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
      explanation_md: `A backend spends most of its time waiting: for the database, for a payment provider, for an SMS service. If it simply stopped and waited each time, one slow request would hold up everyone else. Asynchronous code lets a server start a task, deal with other customers while it waits, and come back when the answer arrives. Adverts for Node.js roles often mention asynchronous programming directly, and remote fintech adverts mention asynchronous processing.

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

1. In Node.js 18 or newer, create \`fetch-test.js\`.
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
  },
};

export default content;
