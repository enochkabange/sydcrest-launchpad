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
    "databases": {
      explanation_md: `Nearly every backend job advert we read mentioned databases: SQL, PostgreSQL, MySQL, SQL Server, and sometimes MongoDB or Redis. That makes sense. An app without stored data forgets every customer, every order and every payment the moment it restarts. The database is the memory of the business, and looking after it well is one of the most trusted jobs a backend developer has.

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
      explanation_md: `SQL showed up in a large share of the backend, software and graduate adverts we read, whether the employer used PostgreSQL, MySQL or SQL Server. It is also useful in data, product and support roles, so time spent here pays off widely. The good news is that a small set of commands covers most daily work.

### Tables, rows and columns

Imagine a table called \`sales\` for Hawa's provisions shop:

| id | item  | qty | price_pesewas | sold_on    |
|----|-------|-----|---------------|------------|
| 1  | rice  | 2   | 3000          | 2026-10-01 |
| 2  | oil   | 1   | 4500          | 2026-10-01 |
| 3  | sugar | 3   | 1200          | 2026-10-02 |

Each row is one sale. Each column is one detail. Prices are stored in pesewas to avoid rounding errors.

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
      explanation_md: `Adverts often ask for "database design" or "data modelling" alongside SQL, and graduate assessments sometimes ask you to sketch tables for a scenario. Good design is what keeps an app's data trustworthy as it grows. Poor design shows up later as duplicate customers, orders that point to nothing, and totals that never match the mobile money statement.

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
3. Run them in SQLite or a free online playground and insert sample data for two customers (for example, Fuseini and Amina) with one order each.
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

Fuseini runs the backend for a cooperative's savings app in Yendi. Members ask to record their community name. He writes migration \`007_add_community.sql\`, opens a pull request, a teammate reviews it, and it runs automatically when they deploy. No one ever logs into the live database to type commands by hand.`,
      practice_task_md: `**Goal:** evolve a database with migrations instead of manual edits.

1. In a GitHub repository, create a \`migrations\` folder.
2. Write \`001_create_members.sql\` for a savings group with \`id\`, \`name\` and \`phone\`.
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
  },
};

export default content;
