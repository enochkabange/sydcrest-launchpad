import type { TrackContent } from "./types";

/**
 * Original lesson content for the Cloud and DevOps track (issue #198). SydCrest
 * writing; sources, verified provider facts and the coverage table are in
 * src/content/research/cloud-devops.md. People, shops and companies in examples are
 * invented for teaching. Provider free tier terms were checked on 28 October 2026.
 */
const content: TrackContent = {
  roadmap: "cloud-devops-engineer",
  nodes: {
    "before-you-start": {
      outcomes: [
        "Explain what cloud and DevOps actually mean",
        "Describe what this track covers",
        "Plan around money and devices before you begin",
      ],
      explanation_md: `## Why this section comes first

When you send money with MoMo, check a bank balance or stream a match, the app on your phone talks to computers that someone has to keep running day and night. In Ghana, banks, fintechs, telcos, logistics firms and software companies all need people who can run those computers, set up the pipelines that deliver new versions of their apps, and keep the monthly cloud bill under control. Those people are called cloud engineers, DevOps engineers, site reliability engineers or infrastructure engineers. The titles differ, but the work overlaps a lot.

This track is not a first step into tech. It builds on skills you learn elsewhere on SydCrest, so this short section checks that you are ready and shows honestly what the jobs look like before you invest months of effort.

## What cloud and DevOps actually mean

**Cloud** means renting computers, storage and databases from a provider such as Amazon Web Services (AWS), Microsoft Azure or Google Cloud, instead of buying machines and keeping them in a back room. You pay for what you use and can add more in minutes.

**DevOps** is a way of working where the people who write software (development) and the people who run it (operations) share responsibility. In practice it means automating the boring, risky steps: testing every change, packaging the app the same way every time and deploying it without someone copying files by hand at midnight.

## What you will learn in this track

* **Linux and networking for servers.** Most cloud servers run Linux and have no screen, so you work through a terminal and need to understand addresses, ports and DNS.
* **Cloud fundamentals.** The ideas shared by every provider: service types, regions, core services, access control and costs.
* **Shipping software automatically.** Git for teams, pipelines and containers.
* **Running at scale.** Infrastructure as code, Kubernetes, monitoring and handling failures.
* **Getting hired.** Certifications, a portfolio project and realistic first roles.

## A word on money and devices

Two promises run through this track. First, you will never be asked to enter card details to practise. Every lab uses free options that do not need a card, and when a provider does require one we say so plainly. Second, we tell you when a device matters. You can read every lesson on any device. From the Linux section onwards the practice needs a laptop or desktop, or a free browser lab that gives you a Linux machine inside a web page.

## A small example

Issahaku finished the IT support track and now looks after computers at a microfinance office in Tamale. His manager wants the loan app moved from an old server under a desk to the cloud. Issahaku already knows networks and Linux basics. This track shows him the next layer: how to rent a server safely, deploy the app automatically and get an alert before customers notice a problem.`,
      practice_task_md: `**Goal:** decide where you stand before you begin.

1. Write down, in a notes app or notebook, which SydCrest tracks you have finished or are working through (IT support, backend developer, or neither yet).
2. List three apps you use that must stay online all the time, for example a MoMo wallet, a bank app or a ride app. For each, write one sentence on what would happen to customers if it went offline for an hour.
3. Write two sentences on why you want to learn cloud and DevOps.

**Done looks like:** a short note with your starting point, three apps and your reason. Keep it at the top of your learning log; you will compare against it at the end of the track.`,
      quiz: {
        questions: [
          {
            prompt: "In this track, what does \"cloud\" mean?",
            options: ["A type of mobile data bundle", "Renting computers, storage and databases from a provider instead of buying your own machines", "Storing photos on your phone's memory card", "A brand of server sold in Accra"],
            answer_index: 1,
            explanation: "Cloud means renting computing resources from a provider and paying for what you use.",
          },
          {
            prompt: "What is the main idea behind DevOps?",
            options: ["Developers and operations share responsibility and automate risky steps like testing and deployment", "Operations staff write all the code", "Developers stop testing so they can work faster", "Every change is copied to the server by hand"],
            answer_index: 0,
            explanation: "DevOps is a shared way of working that automates testing, packaging and deployment.",
          },
          {
            prompt: "When does this track say you need a laptop, desktop or browser lab?",
            options: ["From the Linux section onwards, for the practice tasks", "From the very first lesson", "Only for the certification exam, which has to be taken on a desktop", "Never; everything is reading"],
            answer_index: 0,
            explanation: "You can read every lesson on any device, but the hands on practice from the Linux section needs a computer or a free browser lab.",
          },
          {
            prompt: "What does the track promise about payment details?",
            options: ["You must add a card before the first lesson, but it is never charged", "You will never be asked to enter card details to practise", "A card is needed only for Linux practice", "Payment is required to unlock quizzes"],
            answer_index: 1,
            explanation: "Every lab uses card free options, and the lessons say plainly when a provider requires a card.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-you-need-first": {
      outcomes: [
        "Check your readiness from IT support or backend work",
        "Answer the device question plainly",
        "Fill one gap before you start",
      ],
      explanation_md: `## Why prerequisites matter

Cloud adverts in Ghana rarely ask for cloud skills alone. They ask for Linux, networking, scripting and Git as well, because the cloud is built out of those things. If you skip them, cloud consoles feel like magic buttons and interviews expose the gaps quickly. If you have them, the cloud becomes a set of familiar ideas with a new interface.

SydCrest teaches those foundations in two other tracks, so this lesson points you to them instead of teaching them twice.

## Route one: from IT support

If you come from the [IT support track](/roadmaps/it-support), check that you are comfortable with:

* [Linux basics](/roadmaps/it-support/linux-basics): files, folders, users and simple commands.
* [IP addresses](/roadmaps/it-support/ip-addresses) and [DNS](/roadmaps/it-support/dns): how devices find each other.
* [Network troubleshooting](/roadmaps/it-support/network-troubleshooting): using ping and traceroute to find where a connection breaks.
* [Accounts and access](/roadmaps/it-support/accounts-and-access) and [backups](/roadmaps/it-support/backups).

What you may still need: some Git and a little scripting. You will meet both in this track, but a head start helps.

## Route two: from backend development

If you come from the [backend developer track](/roadmaps/backend-developer), check that you can:

* Work in [the command line](/roadmaps/backend-developer/command-line).
* Use [Git and GitHub](/roadmaps/backend-developer/git-and-github) with branches and pull requests.
* Explain [how servers work](/roadmaps/backend-developer/how-servers-work): requests, responses and status codes.
* [Deploy and monitor](/roadmaps/backend-developer/deploy-and-monitor) a small API.

What you may still need: networking. Read the IT support lessons on IP addresses and DNS before the networking lesson here.

## The device question, answered plainly

You can read all the theory on any device. From the Linux section onwards you need a real Linux terminal for practice. You have three options:

* **A laptop or desktop.** Your own, or one at a school lab, hub or library. Windows users can install Linux inside Windows with WSL; any Linux computer works directly.
* **A free browser lab.** Killercoda (free account, each lab lasts up to an hour, then it is deleted) and GitHub Codespaces (a free monthly allowance on a personal account) give you a Linux machine in a web page. Neither needs a card. They work best on a laptop or desktop; on a phone they are possible but cramped.
* **A cloud shell.** Google Cloud Shell is one example of a free terminal in the browser. If any page asks for payment details, stop and use another option.

Browser labs use data while open, so close the tab when you finish.

## A small example

Mariama finished the backend track and built an API for a Bolgatanga shea butter cooperative. She has never set up a network. Before starting the Linux section she spends a week on the IT support networking lessons. When she later sees subnets and DNS records in a cloud console, they make sense.`,
      practice_task_md: `**Goal:** check your readiness honestly and fill one gap.

1. Copy this checklist into your notes and mark each item yes, partly or no: I can move between folders and edit a file in a terminal; I can explain what an IP address and DNS do; I can make a Git commit and push it; I can explain an HTTP request and response.
2. For every partly or no, open the linked SydCrest lesson above and finish it, including its practice task.
3. Create a free GitHub account if you do not have one. It needs only an email address.
4. Open one free browser lab (for example the Killercoda Ubuntu playground) and type \`whoami\`, then close the tab.

**Done looks like:** a checklist with no "no" left, and a note of which device or lab you will use from the Linux section onwards.`,
      quiz: {
        questions: [
          {
            prompt: "Why does this track send you to the IT support and backend tracks for some topics?",
            options: ["Because those topics are not used in cloud jobs", "Because certifications require it", "Because the cloud track has no lessons of its own and only links to other tracks for everything it covers", "Because cloud work builds on Linux, networking, scripting and Git, and those tracks already teach them"],
            answer_index: 3,
            explanation: "The cloud is built from those foundations, so the lesson links to where SydCrest already teaches them.",
          },
          {
            prompt: "Mariama comes from the backend track. Which topic does the lesson suggest she studies before the Linux section?",
            options: ["Graphic design", "Mobile money APIs", "Printer repair", "Networking, such as IP addresses and DNS"],
            answer_index: 3,
            explanation: "Backend learners often lack networking, so the lesson points them to the IT support networking lessons.",
          },
          {
            prompt: "Which option gives you a Linux machine inside a web page without a card?",
            options: ["A free browser lab such as Killercoda or GitHub Codespaces", "A paid virtual server", "A USSD menu", "A spreadsheet app"],
            answer_index: 0,
            explanation: "Both are named as free browser labs that do not need a card.",
          },
          {
            prompt: "What should you do if a cloud shell or lab page asks for payment details?",
            options: ["Enter them quickly so the lab starts", "Use a friend's card", "Leave the page open and come back later", "Stop and use another option"],
            answer_index: 3,
            explanation: "The track never asks you to enter payment details for practice; stop and choose a card free option.",
          },
          {
            prompt: "What happens to a Killercoda lab after about an hour?",
            options: ["It starts charging money", "It is deleted and you can start a fresh one", "It becomes your permanent server, kept for you until you delete it", "It sends your files to your email"],
            answer_index: 1,
            explanation: "Each Killercoda environment lasts up to an hour and is then deleted.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "cloud-devops-jobs": {
      outcomes: [
        "Recognise the job titles in cloud and DevOps adverts",
        "Explain what the adverts ask for, including experience",
        "Map realistic routes into the work",
      ],
      explanation_md: `## Why look at jobs before learning

It is easier to stay motivated when you know what employers actually ask for. We read cloud and DevOps adverts from Ghanaian banks, telcos, fintechs and software firms, plus remote roles open to Africa based applicants, and noted which skills appeared. This lesson shares what we found, honestly.

## The job titles you will see

* **Cloud engineer** or **cloud support engineer:** builds and looks after an organisation's cloud accounts, servers and storage.
* **DevOps engineer:** builds the pipelines that test and deploy code, and the tools developers use every day.
* **Infrastructure or systems engineer:** looks after servers, networks and backups, whether in the cloud or in a data centre.
* **Site reliability engineer (SRE):** keeps services fast and available, measures reliability and leads the response when things break.

Large companies split these roles; small ones expect one person to do a bit of everything.

## What the adverts ask for

Across the adverts we read, the same skills came up again and again: at least one cloud platform (AWS, Azure or Google Cloud), pipelines for continuous integration and delivery, containers with Docker, infrastructure as code with tools such as Terraform, Linux, scripting in Bash or Python, and monitoring. Banks and telcos also stressed security and access control. Every one of these has a lesson in this track.

## The honest part: experience

Most cloud and DevOps adverts we found asked for one or more years of experience. Very few were labelled junior. This is normal for the field, because companies trust these roles with systems that hold customers' money and data. It does not mean you cannot get in. It means the route usually has a step before the cloud title.

## Realistic routes in

* **Internships and national service placements** in IT, infrastructure or software teams.
* **Cloud support, IT operations and help desk roles**, where you learn the company's systems and grow into cloud work.
* **Developer roles** where you volunteer for the deployment and pipeline work nobody else wants.
* **Free cloud training cohorts** run by employers and training partners, some of which include placement support.

## A small example

Fuseini works on a help desk at a telco in Accra. He finished the IT support track, then this one, and built a small portfolio project with a pipeline and monitoring. When his team needed someone to look after the cloud monitoring dashboards, he could show his project and was given the work. A year later his title changed to cloud support engineer. His help desk job was not a detour; it was the route.`,
      practice_task_md: `**Goal:** read real adverts like an engineer.

1. Search a Ghanaian job board, such as Jobberman Ghana, or a company careers page for "DevOps", "cloud engineer" or "infrastructure engineer". Find three adverts. Text pages use little data; skip videos.
2. For each advert, write down only the skills and tools named (not the advert text): cloud platforms, Linux, scripting, pipelines, containers, monitoring, security.
3. Count which skills appear most often across your three adverts.
4. Mark each skill with the section of this track that teaches it.

**Done looks like:** a small table of skills with a count and a matching track section. Share it with a mentor and ask which skill they would learn first.`,
      quiz: {
        questions: [
          {
            prompt: "Which set of skills appeared again and again in the cloud and DevOps adverts described in the lesson?",
            options: ["Video editing, photography and social media", "Accounting, payroll and tax filing", "A cloud platform, pipelines, Docker, infrastructure as code, Linux, scripting and monitoring", "Only typing speed"],
            answer_index: 2,
            explanation: "The lesson lists those skills as the ones repeated across adverts.",
          },
          {
            prompt: "What does the lesson say about experience in most cloud adverts?",
            options: ["None of them mention experience", "Most ask for one or more years, and few are labelled junior", "They all hire school leavers with no skills and train them on the job for a year", "They require ten years in every case"],
            answer_index: 1,
            explanation: "Most adverts asked for experience, so the route usually has a step before the cloud title.",
          },
          {
            prompt: "Which of these is a realistic route into a cloud role named in the lesson?",
            options: ["Waiting until you hold five certifications from different providers before applying anywhere at all", "Applying only to senior roles", "Starting in cloud support, IT operations or a help desk role and growing into cloud work", "Avoiding any IT job until a cloud job appears"],
            answer_index: 2,
            explanation: "Support and operations roles let you learn real systems and grow into cloud work.",
          },
          {
            prompt: "In the example, how did Fuseini move into cloud work?",
            options: ["He showed a portfolio project and took on monitoring work in his help desk job", "He left IT completely", "He bought a certification without practice and listed it as experience on his CV", "He was promoted on his first day"],
            answer_index: 0,
            explanation: "His project and willingness to take on cloud tasks in his existing job opened the door.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "linux-and-networking": {
      outcomes: [
        "Explain how this section builds on what you know",
        "Set up a free Linux practice space",
        "Practise without wasting data",
      ],
      explanation_md: `## Why this section matters

Almost every server you will touch in the cloud runs Linux, and almost none of them has a screen or mouse. You connect over the network and type commands. When a bank's payment API stops responding at night, the engineer on call opens a terminal, reads logs and checks network settings. Adverts for cloud and infrastructure roles in Ghana list Linux, scripting and networking because this is the daily work.

## How this section builds on what you know

You may have met Linux and networks already in the [IT support track](/roadmaps/it-support) or the command line in the [backend track](/roadmaps/backend-developer/command-line). This section takes those basics and turns them into server skills:

* **Working in the Linux terminal.** Managing files, users, permissions, packages, services and logs on a machine you cannot see.
* **Scripting and automation.** Writing small Bash scripts so a task you do once by hand can run on ten servers, or every night, without you.
* **Networking for the cloud.** IP ranges, subnets, ports, firewalls, DNS and load balancers, and how a request from a phone in Tamale reaches a server in another country and comes back.

## The device you need from here

This is the point where reading is not enough. You need a Linux terminal to practise. Use one of these:

* A laptop or desktop running Linux, or Windows with WSL installed.
* A free browser lab, such as the Killercoda Ubuntu playground, which needs a free account and no card. Each lab lasts up to an hour and is then deleted, so keep your notes outside it.
* GitHub Codespaces, which gives a Linux machine in the browser within a free monthly allowance and blocks use rather than billing you when the allowance runs out, as long as you have not added a payment method. A stopped codespace still uses part of your free storage allowance, so delete codespaces you no longer need.

If you only have a phone today, read the lessons and write the commands in a notebook, then practise when you can reach a computer at a school lab, hub or library.

## How to practise without wasting data

Terminal work sends small amounts of text, so it uses far less data than video. The main cost is keeping a lab open while you are not using it. Plan what you will type before you start, do the task, save your notes and close the tab.

## A small example

Amina runs the IT side of a small courier business in Wa. The company's tracking site runs on a rented Linux server. One morning customers say the site is slow. Amina connects from her laptop, uses a command to see the disk is full of old log files, clears them safely and writes a small script that cleans old logs every week. Then she checks that the server's firewall only allows the ports the site needs. That is this whole section in one morning.`,
      practice_task_md: `**Goal:** get your Linux practice space ready.

1. Choose your practice space from the three options above and write it in your learning log.
2. Open it and run \`uname -a\` and \`cat /etc/os-release\` to see which Linux you are on. Copy the output into your notes.
3. Run \`df -h\` to see disk space and \`free -h\` to see memory. Write one sentence on what each shows.
4. Close the lab tab or stop the codespace when you finish.

**Done looks like:** notes with your chosen practice space, the Linux version and a sentence on disk and memory. If you have no computer access yet, write the four commands and what you expect each to show, and run them at your next chance.`,
      quiz: {
        questions: [
          {
            prompt: "Why do cloud engineers work mainly through a terminal?",
            options: ["Terminals are more colourful than websites", "Cloud providers ban mice", "Most cloud servers run Linux without a screen, so you connect over the network and type commands", "It is the only way to use a phone"],
            answer_index: 2,
            explanation: "Cloud servers usually have no screen, so engineers connect remotely and use commands.",
          },
          {
            prompt: "Which three topics does this section cover?",
            options: ["Logo design, branding and colour", "The Linux terminal, scripting and automation, and networking for the cloud", "Spreadsheets, slides and email", "Hardware repair, printers and toner, and setting up office Wi Fi routers"],
            answer_index: 1,
            explanation: "The section turns Linux, scripting and networking basics into server skills.",
          },
          {
            prompt: "What should you do if you only have a phone today?",
            options: ["Read the lessons, write the commands in a notebook and practise when you reach a computer", "Pay for a server", "Skip the section completely", "Enter a card into a cloud console"],
            answer_index: 0,
            explanation: "The lesson suggests reading and noting commands now, then practising on a computer later.",
          },
          {
            prompt: "How can you avoid wasting data in a browser lab?",
            options: ["Open several labs at once", "Keep the lab open all day so your work is saved and you never need to start again from scratch", "Stream videos while it runs", "Plan what you will type, do the task, save notes and close the tab"],
            answer_index: 3,
            explanation: "Terminal text is light; leaving labs open idle is what wastes data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "linux-command-line": {
      outcomes: [
        "Manage files, users, permissions and sudo",
        "Install packages and manage services",
        "Read logs and connect to remote servers",
      ],
      explanation_md: `## Why it matters

When a cloud server misbehaves, there is no desktop to click. You connect, look around and fix things with commands. Interviewers for cloud support and DevOps roles often ask you to talk through a few commands, and the first weeks of most infrastructure jobs are spent in a terminal. If [Linux basics](/roadmaps/it-support/linux-basics) or [the command line](/roadmaps/backend-developer/command-line) are new to you, finish those lessons first.

## Moving around and managing files

\`\`\`bash
pwd              # where am I?
ls -la           # list files, including hidden
cd /var/log      # move into a folder
mkdir backups    # make a folder
cp a.txt b.txt   # copy a file
less syslog      # read a long file, q to quit
\`\`\`

## Users, permissions and sudo

Every file has an owner and permissions for read, write and execute. \`ls -l\` shows them as a string such as \`rwxr-x---\`: three letters for the owner, three for the group and three for everyone else. \`chmod\` changes permissions and \`chown\` changes the owner. Most admin tasks need \`sudo\`, which runs one command with administrator rights. Use it only when needed; a careless \`sudo\` command can break a server.

## Packages and services

On Ubuntu and Debian you install software with the package manager:

\`\`\`bash
sudo apt update
sudo apt install nginx
systemctl status nginx
\`\`\`

\`systemctl\` starts, stops and checks services, the programs that run in the background such as a web server.

## Reading logs

Logs tell you what went wrong. \`tail -n 50 file\` shows the last lines, \`tail -f\` follows new lines as they arrive, \`grep error file\` finds matching lines, and \`journalctl -u nginx\` shows a service's log.

## Connecting to remote servers

You connect to a cloud server with SSH, using a key instead of a password:

\`\`\`bash
ssh -i mykey.pem ubuntu@203.0.113.10
\`\`\`

Keep private keys secret and never paste them into chats or code.

## A small example

Sumaila looks after the server for a school results portal in Damongo. Parents report errors. He connects with SSH, runs \`systemctl status nginx\` and sees the web server stopped. \`journalctl -u nginx\` shows a typing mistake in a config file he edited yesterday. He fixes the file, checks it with \`sudo nginx -t\`, restarts the service and writes the cause in his log. Five commands, ten minutes, no panic.`,
      practice_task_md: `**Goal:** install and inspect a web server in a free lab.

1. Open the Killercoda Ubuntu playground (free account, no card) or a GitHub codespace.
2. Run \`sudo apt update\` then \`sudo apt install -y nginx\`. (In Killercoda you are already root, so \`sudo\` is optional.)
3. Start it with \`sudo systemctl start nginx\` if needed, then run \`curl -I localhost\` and note the status line. If \`systemctl\` is not available in your codespace, run \`sudo service nginx start\` instead.
4. Create a user called \`wumpini\` with \`sudo adduser wumpini\` (answer the prompts, or press Enter to skip the optional details), make a file, and use \`ls -l\` and \`chmod\` so only its owner can read it.
5. Find the last 20 lines of the nginx access log in \`/var/log/nginx\`.
6. Close the lab or stop the codespace.

**Done looks like:** a note with each command you ran, the status line from \`curl\` and one sentence on what the permission string meant.`,
      quiz: {
        questions: [
          {
            prompt: "What does the command `pwd` show?",
            options: ["The folder you are currently in", "Your password", "The list of running services on the server", "The server's IP address"],
            answer_index: 0,
            explanation: "`pwd` prints the current working directory.",
          },
          {
            prompt: "In the permission string `rwxr-x---`, what can everyone else (the last three letters) do?",
            options: ["Read only", "Read and execute", "Everything", "Nothing"],
            answer_index: 3,
            explanation: "The last three characters are all dashes, so others have no permissions.",
          },
          {
            prompt: "Which command checks whether the nginx service is running?",
            options: ["`ls nginx`", "`systemctl status nginx`", "`mkdir nginx`", "`cd nginx`"],
            answer_index: 1,
            explanation: "`systemctl` starts, stops and checks background services.",
          },
          {
            prompt: "How should you connect to a cloud server, according to the lesson?",
            options: ["With SSH using a private key that you keep secret", "By emailing the server", "By sharing your key in a WhatsApp group so the team can log in too", "Through a USSD code"],
            answer_index: 0,
            explanation: "SSH with a key is the normal way, and private keys must stay secret.",
          },
          {
            prompt: "In Sumaila's example, what caused the results portal errors?",
            options: ["A typing mistake in an nginx config file that stopped the web server", "A broken cable", "A full disk on the server, because exam results files had grown too large to store", "Too many users"],
            answer_index: 0,
            explanation: "The service log showed a config mistake from the day before.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "scripting-and-automation": {
      outcomes: [
        "Write a first Bash script that checks results",
        "Run a script on a schedule",
        "Choose between Bash and Python",
      ],
      explanation_md: `## Why it matters

Doing a task once by hand is fine. Doing it every day on ten servers is how mistakes happen. Cloud and DevOps adverts in Ghana regularly ask for Bash or Python scripting because automation is the heart of the job: backups, health checks, user setup and deployments should run the same way every time, without someone remembering each step.

## Your first Bash script

A Bash script is a text file of commands. Here is one that backs up a folder with the date in the file name:

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail
src="$HOME/records"
dest="$HOME/backups"
mkdir -p "$dest"
tar -czf "$dest/records-$(date +%F).tar.gz" "$src"
echo "Backup done"
\`\`\`

The first line says which program runs the script. \`set -euo pipefail\` makes the script stop on errors instead of carrying on silently. \`$(date +%F)\` inserts today's date. Save it as \`backup.sh\`, make it executable with \`chmod +x backup.sh\` and run it with \`./backup.sh\`.

## Making decisions and checking results

Scripts get useful when they check something and react:

\`\`\`bash
if curl -sf https://example.com > /dev/null; then
  echo "site up"
else
  echo "site DOWN"
fi
\`\`\`

\`curl -sf\` fails quietly if the site does not answer properly, so the script can report it.

## Running on a schedule

Linux has a scheduler called cron. A line in your crontab (edit it with \`crontab -e\`) such as \`0 2 * * * /home/hawa/backup.sh\` runs the backup at 2 in the morning every day. The five fields are minute, hour, day of month, month and day of week.

## Bash or Python?

Use Bash for short jobs that glue commands together. Switch to Python when a script needs real logic, works with JSON from an API or grows past a screen or two. Many teams use both. Cloud providers also offer command line tools so scripts can create and inspect cloud resources.

## Good habits

* Keep scripts in Git so changes are tracked.
* Never put passwords or keys inside a script; read them from environment variables.
* Test on a practice machine before running anything on a real server.

## A small example

Hawa supports an NGO in Nalerigu that collects field surveys on tablets. Every evening she used to copy the survey files to a backup folder by hand and sometimes forgot. She wrote a ten line script and a cron line. Now the backup runs every night, and the script writes a line to a log file so she can check it ran.`,
      practice_task_md: `**Goal:** write and run two small scripts in a free lab.

1. In the Killercoda Ubuntu playground or a codespace, create a folder \`records\` with two text files in it.
2. Type the backup script from the lesson into \`backup.sh\` using \`nano backup.sh\`, make it executable and run it. Check the backup file exists with \`ls backups\`.
3. Write \`check.sh\` that uses \`curl -sf\` to check a website of your choice and prints "up" or "DOWN".
4. Write the crontab line that would run \`check.sh\` every 15 minutes (hint: \`*/15\` in the minute field). You do not need to leave it running.
5. Copy both scripts into your notes or a GitHub repository, then close the lab.

**Done looks like:** two working scripts saved outside the lab and a correct crontab line.`,
      quiz: {
        questions: [
          {
            prompt: "Why do DevOps teams automate tasks with scripts?",
            options: ["Scripts make tasks slower but more fun", "So tasks like backups and checks run the same way every time without someone remembering each step", "Because typing commands is not allowed", "To avoid using Linux"],
            answer_index: 1,
            explanation: "Automation removes forgotten steps and human mistakes from repeated work.",
          },
          {
            prompt: "What does `set -euo pipefail` do at the top of a Bash script?",
            options: ["Deletes the script after it runs", "Runs the script automatically every night at midnight and emails you the output", "Makes the script stop on errors instead of carrying on silently", "Connects to the internet"],
            answer_index: 2,
            explanation: "It makes failures visible by stopping the script when a command fails.",
          },
          {
            prompt: "What does the cron line `0 2 * * * /home/hawa/backup.sh` do?",
            options: ["Runs the backup every two minutes", "Runs the backup on the second day of each month only", "Runs the backup at 2 in the morning every day", "Runs the backup twice a week"],
            answer_index: 2,
            explanation: "Minute 0, hour 2, every day of every month.",
          },
          {
            prompt: "When does the lesson suggest switching from Bash to Python?",
            options: ["Never, because Bash can do everything Python does with less effort and fewer files", "For every one line task", "When the script needs real logic, works with JSON or grows long", "Only on Windows"],
            answer_index: 2,
            explanation: "Bash suits short glue jobs; Python suits more complex logic and data.",
          },
          {
            prompt: "Where should passwords and keys used by a script come from?",
            options: ["Typed directly into the script", "A comment at the top of the script where everyone can read them", "Environment variables, not the script itself", "The script's file name"],
            answer_index: 2,
            explanation: "Secrets in scripts end up in Git and shared copies, so read them from the environment.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "networking-for-cloud": {
      outcomes: [
        "Plan IP ranges and subnets",
        "Use ports, firewalls, DNS and load balancers",
        "Follow one request through a cloud network",
      ],
      explanation_md: `## Why it matters

A server that works but cannot be reached is useless. Many cloud problems are network problems: a firewall rule blocking a port, a DNS record pointing to the wrong address, a database placed where the app cannot see it. An infrastructure advert we read from a Ghanaian company named DNS, VPNs, load balancing and virtual networks. If [IP addresses](/roadmaps/it-support/ip-addresses) and [DNS](/roadmaps/it-support/dns) are new, read those IT support lessons first.

## IP ranges and subnets

In the cloud you create your own private network, often called a virtual private cloud (VPC) or virtual network. You give it a range of private addresses written in CIDR notation, for example \`10.0.0.0/16\`. The number after the slash says how many bits are fixed: a \`/16\` holds far more addresses than a \`/24\`, which holds 256. You split the range into subnets, such as \`10.0.1.0/24\` for web servers and \`10.0.2.0/24\` for databases.

A **public subnet** has a route to the internet. A **private subnet** does not, which is where databases belong so nobody outside can reach them directly.

## Ports and firewalls

An IP address finds the machine; a port finds the program on it. Web traffic uses port 80 (HTTP) and 443 (HTTPS), SSH uses 22, and PostgreSQL uses 5432. Cloud firewalls, often called security groups or network security groups, list which ports are open and to whom. A safe pattern: allow 443 from anywhere to the web server, allow 22 only from your own address, and allow 5432 only from the web servers.

## DNS

DNS turns a name like \`shop.example.com\` into an IP address. An **A record** maps a name to an IPv4 address; a **CNAME** maps a name to another name. When you move a site to the cloud, you update DNS to point at the new address. Changes can take time to spread because answers are cached.

## Load balancers

A load balancer sits in front of several servers and shares requests between them. If one server fails a health check, the load balancer stops sending it traffic. Users never see the broken server.

## Following one request

Abdul-Rahman opens a mobile money merchant site on his phone in Tamale:

1. His phone asks DNS for the site's address.
2. The request travels over his mobile network and the internet to the cloud region.
3. It reaches the load balancer on port 443.
4. The load balancer forwards it to a healthy web server in a public subnet.
5. The web server queries the database in a private subnet on port 5432.
6. The reply travels back the same way.

When something breaks, check each hop in order: DNS, firewall, load balancer health, server, database.

## Tools to check

\`dig shop.example.com\` shows DNS answers, \`curl -I https://site\` shows whether a web server replies, and \`ss -tlnp\` lists which ports a Linux server is listening on.`,
      practice_task_md: `**Goal:** design and check a small cloud network on paper and in a lab.

1. On paper or in a notes app, draw a VPC \`10.0.0.0/16\` with a public subnet \`10.0.1.0/24\` for a web server and a private subnet \`10.0.2.0/24\` for a database.
2. Write the firewall rules for each: which ports, open to whom.
3. In a free lab (Killercoda Ubuntu or a codespace), run \`dig example.com\` (install it with \`sudo apt install -y dnsutils\` if missing) and note the A record. Then run \`curl -I https://example.com\` and note the status line.
4. Install nginx as in the Linux lesson and run \`ss -tlnp\` to confirm it listens on port 80. Close the lab.

**Done looks like:** a labelled diagram, a short rule list and your command outputs. This diagram style is exactly what you will draw for your portfolio project.`,
      quiz: {
        questions: [
          {
            prompt: "Where should a database usually be placed in a cloud network?",
            options: ["In a public subnet open to the internet so the app can reach it from anywhere", "In a private subnet with no direct route from the internet", "On a load balancer", "In the DNS records"],
            answer_index: 1,
            explanation: "Private subnets keep databases out of direct reach from outside.",
          },
          {
            prompt: "Which network range holds 256 addresses?",
            options: ["`10.0.0.0/16`", "Any range with a slash", "`10.0.0.0/8`", "`10.0.1.0/24`"],
            answer_index: 3,
            explanation: "A /24 holds 256 addresses; a /16 holds far more.",
          },
          {
            prompt: "What is a safe firewall rule for SSH on port 22?",
            options: ["Allowed only from your own address", "Open to everyone on the internet", "Allowed only from the database", "SSH does not need a rule"],
            answer_index: 0,
            explanation: "SSH should be limited to the addresses that need it.",
          },
          {
            prompt: "What does a load balancer do when a server fails its health check?",
            options: ["Shuts down every server", "Stops sending that server traffic", "Deletes the DNS record", "Sends all of the traffic to it so the server can recover faster"],
            answer_index: 1,
            explanation: "The load balancer routes around unhealthy servers so users never reach them.",
          },
          {
            prompt: "When a site stops working, what order does the lesson suggest for checking?",
            options: ["Database first, then DNS, then nothing else, since the server is rarely the cause", "Check the user's phone only", "Restart everything first", "DNS, firewall, load balancer health, server, database"],
            answer_index: 3,
            explanation: "Following the request hop by hop finds where it breaks.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "cloud-fundamentals": {
      outcomes: [
        "Name what this section covers",
        "Match the same service across three providers",
        "Practise in the cloud safely",
      ],
      explanation_md: `## Why this section matters

Every cloud advert names at least one provider: Amazon Web Services (AWS), Microsoft Azure or Google Cloud. They look different, with different names for everything, but underneath they sell the same building blocks and follow the same ideas. If you learn the ideas first, switching between providers is mostly learning new names. Entry level cloud exams such as Microsoft's Azure Fundamentals and the AWS Certified Cloud Practitioner test exactly these ideas.

## What this section covers

* **What the cloud really is.** Service types (infrastructure, platform and software as a service), regions and availability zones, and the shared responsibility model that splits security work between you and the provider.
* **Compute, storage and databases.** Virtual machines, object storage, managed databases and serverless functions, and how they fit together in a real app.
* **Identity, access and least privilege.** Who can do what in a cloud account, and why one careless permission can expose a whole company.
* **Free tiers and keeping costs under control.** How free offers work, which ones require a card, and the habits that stop a practice project turning into a bill.

## One name, three providers

The same idea often has three names. A quick reference:

* **Virtual machine:** EC2 on AWS, Azure Virtual Machines, Compute Engine on Google Cloud.
* **Object storage:** Amazon S3, Azure Blob Storage, Google Cloud Storage.
* **Access control:** AWS IAM, Microsoft Entra ID with Azure role based access control, Google Cloud IAM.

You do not need to memorise all three. Pick one provider to go deep on, learn the shared idea, and look up the other names when you need them.

## How to practise safely

You can learn a great deal of this section without any cloud account: reading, drawing diagrams and using free browser labs. When you do want to click around a real console, choose an option that cannot bill you. At the time of writing, AWS offers a Free account plan for new customers that does not charge you unless you upgrade, and says most new customers can sign up without a payment method. Azure's standard free account and Google Cloud's free trial both ask for a card, so in this track we only read about them. Terms change, so always check the provider's own free tier page before you sign up, and never enter card details to practise. The costs lesson explains this fully.

## A small example

Zenabu works at a fintech in Accra that runs on AWS. Her friend Alhassan works at a bank that uses Azure. When they compare notes, they find their jobs are almost the same: both look after virtual machines in private networks, store files in object storage, control access with roles and watch the monthly bill. Only the names on the screen differ. That is why this section teaches ideas first and names second.`,
      practice_task_md: `**Goal:** build your own three provider cheat sheet.

1. In a notes app or notebook, make a table with four columns: idea, AWS, Azure, Google Cloud.
2. Add rows for virtual machine, object storage and access control from the lesson.
3. As you work through this section, add a row each time you meet a new idea, such as managed database, serverless function and budget alert. Look up the other providers' names on their official documentation pages.
4. Choose one provider to focus on and write one sentence on why (for example, it appears most in adverts you read).

**Done looks like:** a cheat sheet with at least six rows by the end of the section, and your chosen provider noted.`,
      quiz: {
        questions: [
          {
            prompt: "Why does this section teach ideas before provider names?",
            options: ["Because provider names never change", "Because exams do not test ideas", "Because only one provider exists in Ghana, so the other names do not matter to learners here", "Because AWS, Azure and Google Cloud sell the same building blocks under different names"],
            answer_index: 3,
            explanation: "The ideas are shared, so learning them first makes switching providers mostly a matter of new names.",
          },
          {
            prompt: "Which service is AWS's object storage?",
            options: ["Amazon S3", "EC2", "Compute Engine", "Azure Virtual Machines"],
            answer_index: 0,
            explanation: "Amazon S3 is AWS object storage; EC2 is its virtual machine service.",
          },
          {
            prompt: "According to the lesson, which free options ask for a card at sign up?",
            options: ["Free browser labs such as Killercoda and GitHub Codespaces", "Azure's standard free account and Google Cloud's free trial", "Reading the documentation", "Drawing diagrams"],
            answer_index: 1,
            explanation: "Both ask for a card, so the track only reads about them.",
          },
          {
            prompt: "What should you always do before signing up for any free cloud offer?",
            options: ["Enter your card details to be safe", "Check the provider's own free tier page, because terms change", "Ask a friend for their account", "Start a large server to test it before the free period runs out"],
            answer_index: 1,
            explanation: "Free tier terms change, so the provider's page is the place to check.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "cloud-concepts": {
      outcomes: [
        "Explain why companies use the cloud",
        "Tell apart service and deployment models",
        "Explain regions, availability zones and shared responsibility",
      ],
      explanation_md: `## Why it matters

Interviewers for cloud support and junior DevOps roles almost always start with concepts: what is the difference between IaaS and SaaS, what is a region, who is responsible for patching. These ideas also shape real decisions, such as where to put a Ghanaian bank's data and how much work the team takes on. They are the core of entry exams like AZ-900.

## Why companies use the cloud

Buying servers means paying a lot up front, waiting for delivery and guessing how much capacity you will need. In the cloud you pay as you go, add capacity in minutes and give it back when you no longer need it. Finance teams call this moving from capital expense (buying equipment) to operating expense (paying for use). The cloud also offers **scalability** (handle more users by adding resources), **elasticity** (adding and removing resources automatically as demand changes) and **high availability** (staying up when one part fails).

## Service models

Think of feeding a team for a church harvest:

* **IaaS (infrastructure as a service):** you rent the kitchen and cook everything yourself. You get virtual machines and networks, and you manage the operating system and everything above it.
* **PaaS (platform as a service):** a caterer provides the kitchen and cooks; you bring the recipe. You give the platform your code and it runs it, handling servers and patching.
* **SaaS (software as a service):** you buy ready plates. You simply use finished software, like web email.

**Serverless** goes further than PaaS: your code runs only when an event happens, and you pay only for that time.

## Regions and availability zones

A **region** is a geographic area where a provider has data centres. Inside a region are **availability zones**: separate data centres with their own power and networking. Running copies of your app in two zones means one fire or power cut does not take you offline. You choose regions for closeness to users (lower delay), for laws about where data may be stored, and for price. Ghana's Data Protection Act and sector rules for banks can affect where personal data may be kept, so teams check these before choosing.

## Deployment models

* **Public cloud:** shared provider infrastructure, rented by many customers.
* **Private cloud:** cloud style infrastructure used by one organisation, often in its own data centre.
* **Hybrid cloud:** a mix, for example a bank keeping core systems on site and running its mobile app in the public cloud.

## The shared responsibility model

Security is split. The provider is always responsible for the physical data centres, hardware and the network between them. You are always responsible for your data, your users and who has access. In between, it depends on the service model: with IaaS you patch the operating system; with PaaS the provider does; with SaaS you mostly manage accounts and data.

## A small example

Rashida's team builds a market price app for traders in Bolgatanga. They choose PaaS so nobody on the small team has to patch servers, run it in two availability zones for resilience, and still take responsibility for who can access the trader data.`,
      practice_task_md: `**Goal:** apply the concepts to a real Ghanaian business.

1. Choose a business you know: a pharmacy chain, a school, a courier company or a chop bar with a delivery app.
2. Write which service model (IaaS, PaaS or SaaS) you would choose for three of its needs, such as email, its website and its stock system, with one sentence each on why.
3. Write two reasons it might choose a region and one thing it must check about where customer data is stored.
4. Draw a two column table of the shared responsibility model for one of your choices: provider's jobs and the business's jobs.

**Done looks like:** a one page note you could talk through in an interview in two minutes.`,
      quiz: {
        questions: [
          {
            prompt: "In the harvest analogy, which service model means you bring the recipe while the caterer provides the kitchen and cooks?",
            options: ["IaaS", "Private cloud", "SaaS", "PaaS"],
            answer_index: 3,
            explanation: "With PaaS you supply the code and the platform runs it.",
          },
          {
            prompt: "What is an availability zone?",
            options: ["A separate data centre within a region with its own power and networking", "A country where using cloud services is legal for banks and government offices", "A discount for new customers", "A type of database"],
            answer_index: 0,
            explanation: "Zones inside a region are independent, so spreading across them improves resilience.",
          },
          {
            prompt: "Under the shared responsibility model, what are you always responsible for?",
            options: ["The provider's physical buildings and the guards who protect them", "Your data, your users and who has access", "The cables between data centres", "The provider's hardware repairs"],
            answer_index: 1,
            explanation: "Data and access are always the customer's responsibility.",
          },
          {
            prompt: "What does elasticity mean?",
            options: ["Paying for servers up front so the price stays the same as demand changes", "Adding and removing resources automatically as demand changes", "Storing data in only one place", "Using only SaaS"],
            answer_index: 1,
            explanation: "Elasticity is automatic scaling up and down with demand.",
          },
          {
            prompt: "Why might a Ghanaian bank keep core systems on site and run its app in the public cloud?",
            options: ["Because it is a private cloud only", "Because the public cloud cannot run apps that handle money in Ghana", "It is using a hybrid cloud, mixing on site and public cloud", "Because SaaS requires it"],
            answer_index: 2,
            explanation: "Mixing on site systems with public cloud is a hybrid model.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "core-cloud-services": {
      outcomes: [
        "Compare virtual machines, managed databases and serverless functions",
        "Choose between object, block and file storage",
        "Host a static site for free",
      ],
      explanation_md: `## Why it matters

Ghanaian infrastructure adverts name compute, storage and database services directly. Almost every cloud app, from a hospital booking system to a MoMo merchant dashboard, is built from four building blocks. Knowing what each is for, and when to choose it, is the bulk of entry level cloud work.

## Compute: virtual machines

A **virtual machine** (VM) is a computer made of software running on a provider's physical server. Virtualisation lets one big physical machine run many separate VMs. You choose the size (CPU and memory), the operating system image and the network, then connect with SSH. VMs give the most control and the most responsibility: you patch and secure the operating system. Examples: Amazon EC2, Azure Virtual Machines, Google Compute Engine.

## Storage: object, block and file

* **Object storage** holds files of any kind (photos, backups, reports) in containers called buckets, reached over the web. It is cheap and nearly unlimited, and it can host a static website. Examples: Amazon S3, Azure Blob Storage, Google Cloud Storage.
* **Block storage** is a virtual hard disk attached to one VM.
* **File storage** is a shared folder several servers can use at once.

A common mistake is leaving a bucket open to the public. Buckets should be private unless you deliberately host public files.

## Databases: managed

You can install PostgreSQL on a VM yourself, but then you handle backups, updates and failover. A **managed database** service does that for you: you choose the engine and size, and the provider runs it. Examples: Amazon RDS, Azure Database for PostgreSQL, Google Cloud SQL. Managed databases usually belong in a private subnet.

## Serverless functions

A **function** is a small piece of code that runs when something happens: a file lands in a bucket, a payment webhook arrives, a timer fires. You do not manage any server, and you pay only while it runs. Examples: AWS Lambda, Azure Functions, Google Cloud Run functions. Functions suit short, event driven jobs, not long running programs.

## Putting it together

Tahiru builds a results portal for a group of schools in the Upper West Region:

* The website files sit in **object storage**, served as a static site.
* An API runs on a small **VM** in a public subnet behind a firewall that only opens port 443.
* Results live in a **managed database** in a private subnet.
* A **function** runs whenever a teacher uploads a spreadsheet, checks it and loads it into the database.

## Choosing between them

Ask: do I need full control of the operating system (VM), do I just want my code to run (platform or function), and who will handle backups (managed database)? Less to manage usually means fewer late night problems for a small team.

## A note on practice

The practice below needs no cloud account. If you choose to use a real account, use only an option that cannot bill you, such as the AWS Free account plan, and delete everything you create the same day.`,
      practice_task_md: `**Goal:** host a static site for free and map a real architecture.

1. Create a public GitHub repository with an \`index.html\` page for an imaginary Tamale tailoring shop (a heading, a price list and a phone number). Turn on GitHub Pages in the repository settings. GitHub Pages is free and needs no card; it plays the same role as static hosting from object storage.
2. Open the published link on any device and note the URL.
3. Draw Tahiru's results portal from the lesson and label each part with its service type and its name on your chosen provider.
4. Optional, only if you already have an AWS Free account plan with no card attached: create a private S3 bucket, upload one file, then delete the file and the bucket the same day. If AWS asks for card details at any point, stop.

**Done looks like:** a live GitHub Pages link and a labelled diagram in your portfolio notes.`,
      quiz: {
        questions: [
          {
            prompt: "Which building block gives you the most control and the most responsibility for patching?",
            options: ["Object storage", "A serverless function", "A SaaS email service", "A virtual machine"],
            answer_index: 3,
            explanation: "With a VM you manage and patch the operating system yourself.",
          },
          {
            prompt: "What is object storage best suited for?",
            options: ["Running a long program all day and night without stopping, such as a busy website's server", "Replacing DNS", "Acting as a firewall", "Storing files such as photos, backups and reports, and hosting static websites"],
            answer_index: 3,
            explanation: "Object storage holds files in buckets and can serve a static site.",
          },
          {
            prompt: "What does a managed database service do for you?",
            options: ["Writes and tunes your SQL queries, so you never need to learn SQL yourself", "Removes the need for any data", "Makes the database public", "Handles backups, updates and failover while you choose the engine and size"],
            answer_index: 3,
            explanation: "The provider runs the database operations; you use it.",
          },
          {
            prompt: "In Tahiru's portal, what happens when a teacher uploads a spreadsheet?",
            options: ["A VM is bought", "A function runs, checks the file and loads it into the database", "The bucket is made public so parents can download the results directly", "DNS is updated"],
            answer_index: 1,
            explanation: "A serverless function reacts to the upload event.",
          },
          {
            prompt: "What is a common storage mistake the lesson warns about?",
            options: ["Using private subnets", "Leaving a bucket open to the public by accident", "Making backups", "Naming buckets clearly by project and environment"],
            answer_index: 1,
            explanation: "Buckets should be private unless you deliberately host public files.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "identity-and-access": {
      outcomes: [
        "Protect the root account",
        "Use users, groups, roles and policies for least privilege",
        "Handle keys and secrets and review access regularly",
      ],
      explanation_md: `## Why it matters

Many serious cloud incidents start with access, not clever hacking: a leaked key in a public code repository, a shared admin password, a contractor who still has access months after leaving. Banks and telcos in Ghana list identity and access management (IAM) and security controls in their cloud adverts because a single careless permission can expose customer data. This builds on [accounts and access](/roadmaps/it-support/accounts-and-access) in the IT support track.

## The main ideas

* **Identity:** who you are. A person (a user) or a program (a service identity or role).
* **Authentication:** proving it, with a password plus a second factor.
* **Authorisation:** what you are allowed to do once you are in.
* **Least privilege:** give each identity only the permissions it needs, for only as long as it needs them.

## The root account

When you create a cloud account, the first sign in (called the root user on AWS) can do everything, including closing the account. Protect it with a strong unique password and multifactor authentication (MFA), then stop using it day to day. Create a separate admin identity for yourself and lower powered identities for everyone else.

## Users, groups and roles

* **Users** represent people.
* **Groups** collect users who need the same access, such as "developers" or "billing". Give permissions to groups, not one person at a time.
* **Roles** are identities that people or programs take on temporarily. A server that reads from a bucket should use a role, not a stored password or key.

## Policies

Permissions are written as policies. An AWS style policy that lets a program read reports from one bucket, and nothing else:

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::school-reports/*"
  }]
}
\`\`\`

It names the effect (allow), the action (read an object) and the resource (that bucket only). Azure and Google Cloud use roles assigned at a scope, but the idea is the same: specific actions on specific resources.

## Keys and secrets

Long lived access keys are risky because anyone who copies them becomes you. Prefer roles and short lived credentials. If you must use a key, never put it in code or Git, rotate it, and delete it when done. If a key leaks, disable it immediately, then investigate.

## Review access regularly

People change jobs. Check who has access every few months and remove what is no longer needed. Turn on audit logs so you can see who did what.

## A small example

Mahama joins a logistics startup in Kumasi and finds that every developer signs in with the same root password. He turns on MFA for root, locks the password away, creates a developers group with only the permissions they need and gives the delivery app a role to read its bucket. When a developer leaves a month later, removing access takes one click instead of changing a password everyone knew.`,
      practice_task_md: `**Goal:** practise least privilege without a cloud account.

1. Turn on two factor authentication for your GitHub account (Settings, then Password and authentication). It is free and needs no card. Save the recovery codes somewhere safe offline.
2. For an imaginary school fees app, list four identities: the head teacher, the bursar, a developer and the app itself. For each, write the smallest set of permissions it needs.
3. Write a policy in the style of the lesson that lets the app read only from a bucket called \`fees-receipts\`.
4. Write a three step plan for what to do if a developer accidentally pushes an access key to a public repository.

**Done looks like:** 2FA turned on, an identity and permission table, one policy and a leak response plan.`,
      quiz: {
        questions: [
          {
            prompt: "What does least privilege mean?",
            options: ["Everyone shares one admin account so nobody is ever blocked from finishing their work", "Only managers can sign in", "Each identity gets only the permissions it needs, for only as long as it needs them", "Permissions are never reviewed"],
            answer_index: 2,
            explanation: "Least privilege limits damage if any identity is misused.",
          },
          {
            prompt: "What should you do with the root account after creating a cloud account?",
            options: ["Share it with the whole team", "Put its password in the code", "Delete it immediately so that nobody can ever use it to sign in again", "Protect it with a strong password and MFA, then stop using it day to day"],
            answer_index: 3,
            explanation: "Root can do everything, so lock it down and use separate identities.",
          },
          {
            prompt: "How should a server get permission to read from a bucket?",
            options: ["With the root password stored on the server", "With a key pasted into the code", "By making the bucket public", "By using a role"],
            answer_index: 3,
            explanation: "Roles give temporary credentials without storing secrets on the machine.",
          },
          {
            prompt: "In the example policy, which resource can the program read?",
            options: ["Objects in the `school-reports` bucket only", "Every bucket in the account", "The billing page", "All databases"],
            answer_index: 0,
            explanation: "The resource line limits access to that one bucket.",
          },
          {
            prompt: "What should you do first if an access key leaks?",
            options: ["Wait to see if anyone uses it", "Post about it publicly", "Disable it immediately, then investigate", "Create another key and keep both active so the program does not stop"],
            answer_index: 2,
            explanation: "Disabling the key stops misuse; investigation comes next.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "cloud-costs": {
      outcomes: [
        "Explain how free offers work and which need a card",
        "Know what costs money on a paid account",
        "Build habits and designs that protect a budget",
      ],
      explanation_md: `## Why it matters

On a paid cloud account you pay for what you use, often in US dollars. A server left running, a forgotten database or a large download can keep billing day and night, and when the cedi moves the bill in cedis moves with it. Ghanaian adverts ask for cost efficient design because cloud bills are a real business cost. For you as a learner, the first rule is simpler: **practise in ways that cannot bill you.**

## How free offers work (and which need a card)

These were the terms on the providers' own pages when this lesson was written. They change, so read the provider's free tier page yourself before signing up.

* **AWS** lets new customers choose a Free account plan or a Paid plan. The Free plan includes credits, lasts up to six months or until the credits run out, does not charge you unless you upgrade, and then closes. AWS says most new customers can sign up without a payment method, but it may ask for one to verify identity.
* **Azure's** standard free account gives credit for a short period plus some free services, and needs a credit card or non prepaid debit card. **Azure for Students** needs a school email address instead of a card; it is for full time university students whose institution qualifies.
* **Google Cloud's** free trial gives credit for a limited period and needs a card or other payment method.

In this track: never enter card details to practise. If any sign up page asks for one, stop and use a card free option: Killercoda, GitHub Codespaces within its free allowance, or the AWS Free plan if it does not ask for a card.

## What actually costs money on a paid account

* **Running compute:** VMs bill while they run, whether anyone uses them or not.
* **Storage:** disks, snapshots and backups bill even when the VM is stopped.
* **Data leaving the cloud:** downloads to users usually cost more than uploads.
* **Idle extras:** load balancers, some network gateways and public IP addresses can bill while doing nothing.

## Habits that protect any budget

1. **Set a budget alert first.** AWS Budgets, Azure Cost Management budgets and Google Cloud budget alerts email you when spending passes an amount you choose. Alerts warn you; they do not stop spending, so you must act on them.
2. **Tag everything** with an owner and project, so you know what each resource is for.
3. **Tear down the same day.** When the practice is done, delete the VM, its disks, snapshots, IP addresses and load balancers. Stopping a VM is not enough; its disk still bills.
4. **Write it as code.** Infrastructure as code (later in this track) lets you rebuild everything with one command and delete it all with another.
5. **Check the billing page** after each session.

## Designing for cost at work

Pick the smallest size that does the job, turn off development servers at night, use serverless for spiky work and store old files in cheaper storage classes. Cost is a design choice, not an afterthought.

## A small example

Iddrisu, a developer in Tamale, practised on a paid account years ago, launched a database to test something and forgot it. A month later the bill arrived in dollars. Now he teaches juniors his rule: no card for practice, budget alert first on any real account, and a teardown checklist ticked before closing the laptop.`,
      practice_task_md: `**Goal:** make your personal cloud safety plan.

1. Write a teardown checklist you will tick after every cloud practice session: VMs deleted, disks and snapshots deleted, IP addresses released, load balancers deleted, buckets emptied and deleted, billing page checked.
2. Visit the free tier pages of AWS, Azure and Google Cloud (text only, little data). For each, write one line: does it need a card, and how long does the free offer last? Note today's date beside your answers.
3. Write which practice options you will use in this track and confirm none needs card details.
4. Read the budgets documentation for one provider and write the steps to set a budget alert, so you are ready when you work on a real account at a job.

**Done looks like:** a teardown checklist, a dated three provider comparison and your card free practice plan.`,
      quiz: {
        questions: [
          {
            prompt: "What is the first rule for learners in this lesson?",
            options: ["Practise in ways that cannot bill you", "Use the biggest server to learn faster", "Always add a card before starting", "Share one account with friends"],
            answer_index: 0,
            explanation: "The lesson's first rule is to practise without any risk of a bill.",
          },
          {
            prompt: "Which offer described in the lesson needs a school email address instead of a card?",
            options: ["Google Cloud's free trial", "Azure for Students", "Azure's standard free account", "A paid AWS plan"],
            answer_index: 1,
            explanation: "Azure for Students uses an academic email rather than a card.",
          },
          {
            prompt: "Why is stopping a VM not enough to stop all charges?",
            options: ["Stopped VMs bill more than running ones", "Stopping deletes your data", "The provider restarts it automatically after a few hours unless you delete it", "Its disk and snapshots still bill while it is stopped"],
            answer_index: 3,
            explanation: "Storage keeps billing, so delete the VM, disks and snapshots.",
          },
          {
            prompt: "What does a budget alert do?",
            options: ["Automatically deletes all resources in the account once spending passes a set amount", "Emails you when spending passes an amount you choose, so you can act", "Gives free credit", "Lowers the exchange rate"],
            answer_index: 1,
            explanation: "Alerts warn you but do not stop spending by themselves.",
          },
          {
            prompt: "What should you do if a sign up page asks for card details during practice?",
            options: ["Enter them and hope for the best, since practice accounts are almost never charged", "Stop and use a card free option such as Killercoda or GitHub Codespaces", "Use a relative's card", "Leave the page open"],
            answer_index: 1,
            explanation: "The track never asks you to enter card details for practice.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "shipping-software": {
      outcomes: [
        "Explain how code, pipelines and containers fit together",
        "Shift your mindset to automated shipping",
        "Map how software ships where you work or study",
      ],
      explanation_md: `## Why this section matters

A developer finishing a feature is only half the job. The change still has to be tested, packaged, delivered to servers and released to users without breaking anything. In many small companies this is done by hand: someone copies files to a server late at night and hopes. DevOps replaces that with automation, so releasing a fix to a MoMo merchant app can happen many times a day, safely. Ghanaian DevOps adverts name continuous integration and delivery (CI/CD) and Docker more than almost anything else after the cloud itself.

## What this section covers

* **Git for teams.** Branches, pull requests, code review and tags. Every pipeline starts with a Git event, so a team's Git habits shape everything after.
* **Continuous integration and delivery.** A pipeline that builds the code, runs tests and deploys it automatically every time someone pushes a change.
* **Containers with Docker.** Packaging an app with everything it needs, so it runs the same on a laptop, in the pipeline and on a server.

## How the three fit together

Picture the journey of one small change:

1. Napari fixes a bug in a school fees app on a new Git branch and opens a pull request.
2. The pipeline starts automatically. It installs dependencies, runs the tests and builds a container image.
3. A teammate reviews the code while the tests run. Both the review and the tests must pass.
4. Napari merges. The pipeline builds the final image, tags it with the version and deploys it.
5. If the new version misbehaves, the team redeploys the previous image in minutes.

No one logged into a server. Every step is recorded, repeatable and reversible.

## What you need

From this section on you need a Linux terminal and a free GitHub account. GitHub Actions is free for public repositories using GitHub's standard runners, so you can build real pipelines without a card. For Docker, use a laptop or desktop with enough memory, or a free browser lab such as a Killercoda Ubuntu playground or a GitHub codespace. If you came from the backend track, you have met [Git and GitHub](/roadmaps/backend-developer/git-and-github) and [containers](/roadmaps/backend-developer/containers) briefly; here you go deeper, from the operations side.

## A mindset shift

The goal is not fancy tools. The goal is that releasing software becomes boring: small changes, tested automatically, delivered the same way every time. When releases are boring, teams release more often, and customers get fixes sooner.

## A small example

A small Accra agency released its clients' websites by copying files over FTP. One Friday a half copied release took a client's shop offline for an evening. The team set up a pipeline that tested each change and deployed it only when the tests passed. Releases became a button press, and Friday evenings became quiet again.`,
      practice_task_md: `**Goal:** map how software is shipped where you work or study.

1. Think of a project you know: one of your own, a school project or an app at a workplace. If you have none, use the school fees app from the lesson.
2. Write each step it takes today to go from a code change to users, and mark each step "by hand" or "automatic".
3. Circle the step that is most likely to go wrong and write why.
4. Write what an automated version of that step would look like in one or two sentences.

**Done looks like:** a short before and after description of the release process. You will turn it into a real pipeline in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "What problem does this section aim to solve?",
            options: ["Developers writing too little code", "Phones having too little storage", "Releasing software by hand, which is slow and error prone", "Cloud providers changing their logos and menu names every year"],
            answer_index: 2,
            explanation: "DevOps automates testing, packaging and delivery so releases are safe and repeatable.",
          },
          {
            prompt: "In Napari's example, what starts the pipeline?",
            options: ["A phone call to the manager", "Opening a pull request with a new Git branch", "Logging into the server by hand and copying the new files", "A weekly meeting"],
            answer_index: 1,
            explanation: "Git events such as pull requests trigger the pipeline automatically.",
          },
          {
            prompt: "How did Napari's team recover if a new version misbehaved?",
            options: ["They rewrote the app from scratch", "They switched cloud providers", "They waited for users to stop complaining and then fixed it in the next release", "They redeployed the previous image in minutes"],
            answer_index: 3,
            explanation: "Tagged images make rolling back to the previous version quick.",
          },
          {
            prompt: "What does the lesson say the goal of DevOps releases should be?",
            options: ["Exciting and rare", "Done once a year", "Done only by the most senior engineer, late at night, so that any mistakes affect fewer users", "Boring: small changes, tested automatically, delivered the same way every time"],
            answer_index: 3,
            explanation: "Boring, repeatable releases let teams ship fixes more often and safely.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "git-for-teams": {
      outcomes: [
        "Work with branches, pull requests and code review",
        "Protect the main branch and resolve merge conflicts",
        "Tag versions and keep secrets out",
      ],
      explanation_md: `## Why it matters

In a DevOps team, Git is not just where code is saved. It is the starting switch for everything: a push starts the tests, a merge starts a deployment, a tag starts a release. Adverts name Git, GitHub and GitLab because a team's Git habits decide whether its pipelines are calm or chaotic. If Git is new, finish [Git and GitHub](/roadmaps/backend-developer/git-and-github) in the backend track first.

## Branches and pull requests

Nobody works directly on the main branch. You make a short lived branch, commit small changes and open a **pull request** (GitLab calls it a merge request) asking to merge into main:

\`\`\`bash
git switch -c fix/receipt-total
git add receipt.js
git commit -m "Fix rounding in receipt total"
git push -u origin fix/receipt-total
\`\`\`

On GitHub you then open the pull request, describe what changed and why, and ask a teammate to review.

## Code review

A reviewer reads the change, asks questions and suggests improvements. Good reviews are kind and specific: "This loop runs once per customer; could we fetch them in one query?" rather than "this is bad". Reviews catch bugs, spread knowledge and stop any one person being the only one who understands a system.

## Protecting main

Teams turn on **branch protection** so nobody can push straight to main. A pull request can only merge when the pipeline's checks pass and at least one reviewer approves. This one setting turns good intentions into a rule.

## Keeping branches short

Long running branches drift away from main and end in painful merge conflicts. Many teams merge small changes at least daily. If a feature is not ready for users, it can be merged but hidden behind a setting until it is.

## Merge conflicts

When two people change the same lines, Git asks you to choose. Open the file, find the markers \`<<<<<<<\`, \`=======\` and \`>>>>>>>\`, keep the right code, delete the markers, then commit. Pull from main often and conflicts stay small.

## Tags and versions

A **tag** marks a commit as a release:

\`\`\`bash
git tag v1.4.0
git push origin v1.4.0
\`\`\`

Many teams use semantic versioning: MAJOR.MINOR.PATCH. Bump PATCH for a bug fix, MINOR for a new feature that does not break anything, MAJOR for a breaking change. Pipelines often deploy to production only when a version tag is pushed.

## Keep secrets out

Add a \`.gitignore\` file listing files Git must never track, such as \`.env\`. Once a password is pushed, assume it is leaked even if you delete it later, because Git history keeps it. Rotate it.

## A small example

Napari and Sumaila share a repository for a clinic appointment app in Wa. Before, both pushed to main and overwrote each other. Now each works on a branch, main is protected, and every pull request needs green tests and one approval. When a release goes out, they tag it, so they always know which version patients are using.`,
      practice_task_md: `**Goal:** run a real team workflow, even on your own.

1. Use the GitHub Pages repository from the core services lesson, or create a new public repository.
2. Turn on branch protection for main (Settings, then Branches or Rules) so changes need a pull request.
3. On a new branch, change the price list in \`index.html\`, push it and open a pull request with a clear description.
4. Ask a friend or mentor to review it. If nobody is available, leave a review comment on your own pull request explaining what you checked.
5. Merge it, then create and push a tag \`v1.0.0\`.
6. Add a \`.gitignore\` containing \`.env\`, through another small pull request, since main is now protected.

**Done looks like:** a merged pull request with a description, a protected main branch and a \`v1.0.0\` tag you can link to.`,
      quiz: {
        questions: [
          {
            prompt: "Why does Git matter so much in DevOps?",
            options: ["It replaces the cloud", "It makes code run faster", "It is only used for backups of code, not for starting anything else in the system", "Git events such as pushes, merges and tags start tests, deployments and releases"],
            answer_index: 3,
            explanation: "Pipelines are triggered by Git events, so Git habits shape the whole delivery process.",
          },
          {
            prompt: "What does branch protection on main do?",
            options: ["Deletes old branches", "Stops direct pushes so changes merge only through pull requests that pass checks and review", "Makes the repository private so only the team can see the main branch and its history at all", "Speeds up downloads"],
            answer_index: 1,
            explanation: "Branch protection makes reviews and passing checks a rule, not just a habit.",
          },
          {
            prompt: "Under semantic versioning, what should change for a bug fix?",
            options: ["The MAJOR number", "The PATCH number", "The MINOR number", "Nothing"],
            answer_index: 1,
            explanation: "PATCH is bumped for bug fixes that do not add features or break anything.",
          },
          {
            prompt: "What should you assume if a password was pushed to Git, even if you deleted it later?",
            options: ["It is safe because it was deleted", "GitHub removes it automatically within a few minutes of the push", "Only you can see it", "It is leaked, because Git history keeps it, so rotate it"],
            answer_index: 3,
            explanation: "Git history keeps old versions, so pushed secrets must be treated as exposed.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "ci-cd-pipelines": {
      outcomes: [
        "Explain continuous integration and delivery",
        "Build a first GitHub Actions workflow",
        "Keep good pipeline habits",
      ],
      explanation_md: `## Why it matters

Continuous integration and delivery (CI/CD) appears in more Ghanaian DevOps adverts than any skill except the cloud itself, under tool names such as GitHub Actions, GitLab CI, Jenkins and Azure DevOps. A pipeline is a robot teammate that checks every change the same way, every time, and never gets tired at 11 at night.

## The idea

* **Continuous integration (CI):** every push is automatically built and tested, so mistakes are caught within minutes, while the change is fresh in the author's mind.
* **Continuous delivery:** every change that passes is packaged and ready to release with one approval.
* **Continuous deployment:** every passing change goes to users automatically, with no human step.

Most teams start with CI, then add delivery to a test environment, and only later deploy to production automatically.

## Parts of a pipeline

* **Trigger:** what starts it, such as a push or pull request.
* **Runner:** the machine that runs the work, usually a fresh Linux VM.
* **Jobs and steps:** the commands, such as install, test, build.
* **Artifacts:** the outputs, such as a container image or a zip file.
* **Secrets:** passwords and tokens the pipeline needs, stored in the platform's secret store and never in the code.

## A first GitHub Actions workflow

Save this as \`.github/workflows/ci.yml\` in a repository:

\`\`\`yaml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Page has a price list
        run: grep -q "Price list" index.html
\`\`\`

On every push or pull request, GitHub starts a fresh Ubuntu runner, checks out the code and runs the test command. \`grep -q\` exits with an error if the text is missing, which turns the check red. In a real project the \`run\` line would be your test command, such as \`npm test\` or \`pytest\`. Look up the current version of \`actions/checkout\` in GitHub's documentation when you build yours.

GitHub Actions is free for public repositories on standard runners, so you can practise without a card.

## Delivery and deployment

After the tests, a later job might build a container image, push it to a registry and deploy it. Deploy jobs need credentials, which live in the repository's secrets, not in the YAML file. Many teams deploy first to a staging environment, check it, then promote the same build to production.

## Good pipeline habits

* Keep it fast. A slow pipeline gets ignored.
* Fail loudly: a red check should block the merge.
* Build once, deploy the same artifact everywhere.
* Treat the pipeline file as code: review changes to it.

## A small example

Wumpini maintains a stock app for a pharmacy chain with branches in Tamale and Yendi. A colleague changed a price calculation and accidentally broke the discount for NHIS patients. The CI tests failed on the pull request within two minutes, the merge was blocked and the bug never reached a pharmacy counter.`,
      practice_task_md: `**Goal:** build a pipeline and watch it catch a broken change.

1. In your public GitHub Pages repository, on a new branch, create \`.github/workflows/ci.yml\` with the workflow from the lesson. Make sure \`index.html\` contains the words "Price list".
2. Push the branch, open a pull request and open the Actions tab. Wait for a green tick, then merge.
3. On a branch, remove "Price list" from the page, push and open a pull request. Watch the check go red.
4. Put the words back, push again and watch it turn green. Merge.
5. Add a second step of your own, for example checking that the page contains a phone number.

**Done looks like:** a repository with a working workflow and a pull request history showing one red run and one green run. This is a portfolio piece: link it in your notes.`,
      quiz: {
        questions: [
          {
            prompt: "What is continuous integration?",
            options: ["Copying files to the server by hand after every change, so each one is checked by a person", "Releasing software once a year", "Automatically building and testing every push so mistakes are caught within minutes", "Writing code without Git"],
            answer_index: 2,
            explanation: "CI checks every change automatically while it is fresh.",
          },
          {
            prompt: "What is the difference between continuous delivery and continuous deployment?",
            options: ["There is no difference", "Deployment only works on Windows", "Delivery skips tests", "Delivery keeps passing changes ready to release with one approval; deployment releases them automatically"],
            answer_index: 3,
            explanation: "Continuous deployment removes the final human approval step.",
          },
          {
            prompt: "In the example workflow, what makes the check turn red?",
            options: ["The repository being public, which blocks workflows from running", "Pushing to a branch", "Using ubuntu-latest", "`grep -q` failing because \"Price list\" is missing from the page"],
            answer_index: 3,
            explanation: "grep exits with an error when the text is missing, which fails the step.",
          },
          {
            prompt: "Where should a pipeline's deploy credentials be stored?",
            options: ["In the YAML file", "In the README", "In a commit message so the history shows who added them", "In the platform's secret store, not in the code"],
            answer_index: 3,
            explanation: "Secrets stay out of code and are injected by the platform at run time.",
          },
          {
            prompt: "In Wumpini's example, what stopped the broken discount reaching customers?",
            options: ["CI tests failing on the pull request and blocking the merge", "A manual check by the manager a week later, before the next sale", "A customer complaint", "Turning off the server"],
            answer_index: 0,
            explanation: "The failing tests blocked the change before it was merged.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "containers": {
      outcomes: [
        "Explain images and containers",
        "Write a first Dockerfile",
        "Build, run, check and clean up containers",
      ],
      explanation_md: `## Why it matters

"It works on my machine" is one of the oldest problems in software. A container solves it by packaging an app with everything it needs: the runtime, libraries and settings. The same container runs on a developer's laptop, in the pipeline and on a cloud server. Docker appears in most Ghanaian DevOps adverts we read, and containers are the input to Kubernetes later in this track.

## Images and containers

* An **image** is a read only package: a recipe already cooked and frozen.
* A **container** is a running copy of an image. You can run many containers from one image.
* A **registry** stores images so others can download them. Docker Hub and the cloud providers' registries are examples.

Containers are lighter than virtual machines because they share the host's Linux kernel instead of each running a full operating system.

## A first Dockerfile

This packages a static site with the nginx web server:

\`\`\`dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
\`\`\`

\`FROM\` picks a base image, \`COPY\` adds your file and \`EXPOSE\` documents the port the app listens on.

## Build, run, check, clean up

\`\`\`bash
docker build -t shop-site:1.0 .
docker run -d -p 8080:80 --name shop shop-site:1.0
curl localhost:8080
docker logs shop
docker stop shop && docker rm shop
\`\`\`

\`-t\` names and tags the image. \`-p 8080:80\` connects port 8080 on the host to port 80 in the container. \`-d\` runs it in the background. Always stop and remove containers you no longer need.

## Good habits

* **Pin versions** of base images in real projects (for example a specific nginx version) so builds do not change by surprise.
* **Keep images small:** start from slim or alpine bases and copy only what you need.
* **Never bake secrets into images.** Pass them as environment variables at run time.
* **One main process per container.** Run the database in its own container, not inside the app's.
* **Use a \`.dockerignore\`** to keep files such as \`.env\` and \`.git\` out of the image.

For apps with several parts, Docker Compose describes them in one file so \`docker compose up\` starts them all together.

## Where to practise

Docker needs a Linux machine with enough memory. Use a laptop or desktop with Docker installed, or a free browser lab such as the Killercoda Ubuntu playground or a GitHub codespace. In a browser lab, image downloads happen on the lab's connection, not your data bundle. If \`docker --version\` fails in your lab, install it first (on Ubuntu, \`sudo apt install -y docker.io\`).

## A small example

Fuseini's team builds a delivery tracking API in Kumasi. One developer used one version of Node.js, another used a different one, and the server had a third. Bugs appeared only in production. They wrote a Dockerfile, built one image in the pipeline and ran that exact image everywhere. The "only in production" bugs stopped.`,
      practice_task_md: `**Goal:** containerise your shop page in a free lab.

1. Open the Killercoda Ubuntu playground or a GitHub codespace. Run \`docker --version\`; if it fails on Ubuntu, run \`sudo apt install -y docker.io\`.
2. Create a folder with your \`index.html\` from earlier (paste it in with \`nano\`) and the Dockerfile from the lesson.
3. Build the image, run it on port 8080 and use \`curl localhost:8080\` to see your page.
4. Change the page, rebuild as \`shop-site:1.1\`, run it and confirm the change.
5. Add a \`.dockerignore\` containing \`.env\` and \`.git\`.
6. Stop and remove your containers, then close the lab or stop the codespace.
7. Commit the Dockerfile and \`.dockerignore\` to your GitHub repository.

**Done looks like:** a Dockerfile in your repository and notes showing the build, run and cleanup commands you used.`,
      quiz: {
        questions: [
          {
            prompt: "What problem do containers solve?",
            options: ["Slow mobile networks", "Apps behaving differently on different machines, by packaging the app with everything it needs", "Expensive phones", "Missing DNS records"],
            answer_index: 1,
            explanation: "Containers make an app run the same everywhere.",
          },
          {
            prompt: "What is the difference between an image and a container?",
            options: ["An image is a read only package; a container is a running copy of it", "They are exactly the same", "A container is stored in a registry and an image is the running copy of it", "Images only work on Windows"],
            answer_index: 0,
            explanation: "You build an image once and run containers from it.",
          },
          {
            prompt: "In `docker run -p 8080:80`, what does `8080:80` mean?",
            options: ["Run 8080 containers", "Connect port 8080 on the host to port 80 in the container", "Use 80 percent of memory and 8080 megabytes of disk for the container", "Wait 8080 seconds"],
            answer_index: 1,
            explanation: "The flag maps a host port to a container port.",
          },
          {
            prompt: "How should secrets reach a container?",
            options: ["Passed as environment variables at run time", "Written in the Dockerfile", "Copied into the image during the build so they are always there", "Included in the image name"],
            answer_index: 0,
            explanation: "Secrets baked into images can be read by anyone who gets the image.",
          },
          {
            prompt: "Why are containers lighter than virtual machines?",
            options: ["They have no files", "They share the host's Linux kernel instead of each running a full operating system", "They only run at night", "They cannot use the network, so they need fewer resources than a full virtual machine"],
            answer_index: 1,
            explanation: "Sharing the kernel avoids the weight of a full operating system per container.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "running-at-scale": {
      outcomes: [
        "Explain why systems must be repeatable and observable",
        "Practise without spending money",
        "Check how repeatable a system is",
      ],
      explanation_md: `## Why this section matters

Getting an app online once is a good start. Keeping it online for thousands of customers, rebuilding it after a disaster and knowing it is broken before customers call is the harder part, and it is where DevOps and cloud engineers earn trust. Ghanaian adverts for DevOps roles list Terraform, Kubernetes, Prometheus, Grafana and disaster recovery alongside the cloud and containers.

## What this section covers

* **Infrastructure as code.** Describing servers, networks and databases in files that can be reviewed, versioned, rebuilt and deleted with a command. Terraform is a common example.
* **Kubernetes basics (optional).** Running many containers across many machines, restarting them when they fail and scaling them up when traffic grows. It appears mostly in mid level adverts, so it is optional here, but knowing the main ideas helps in interviews.
* **Monitoring, logs and alerts.** Collecting numbers and logs, building dashboards and setting alerts that wake the right person for the right reason.
* **Backups, security and incidents.** Tested backups, patching, secrets management and a calm process when something goes wrong.

## The common thread: repeatable and observable

Each topic answers one of two questions:

1. **Can we rebuild it?** If a server dies, a region has an outage or someone deletes something by mistake, can you recreate everything quickly and exactly? Infrastructure as code, containers and tested backups make the answer yes.
2. **Can we see it?** Do you know right now whether the app is healthy, how fast it is and what failed last night? Monitoring, logs and alerts make the answer yes.

Kubernetes combines both: you describe what should be running, and it keeps reality matching that description.

## How to practise without spending

This section is where cloud bills usually surprise people, because real clusters and load balancers cost money while they run. You will not need any of them:

* Terraform can manage files and resources on your own lab machine, so you learn the full plan, apply and destroy cycle with no cloud account.
* Kubernetes runs free in the Killercoda Kubernetes playground, which is deleted after an hour.
* Monitoring can be practised with scripts and free tools in a browser lab.

Never leave anything running when you finish a session.

## A small example

A fintech in Accra had one engineer who knew how the servers were set up, all from memory. When she went on leave and a server failed, nobody could rebuild it for a day. Afterwards the team wrote their infrastructure as code, added monitoring with alerts and practised restoring backups every quarter. The next failure took twenty minutes to fix, and anyone on the team could do it.`,
      practice_task_md: `**Goal:** check how repeatable and observable a system is.

1. Choose a system you know: your shop page project, a school or church website, or a business app you use.
2. Answer in writing: if it disappeared today, what would you need to rebuild it, and how long would it take?
3. Answer: how would you know if it went down at 2 in the morning?
4. List one change for each answer that would make it better, for example "keep the server setup in a file in Git" or "add an uptime check".

**Done looks like:** a short note answering both questions with one improvement each. You will make those improvements in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "What two questions does this section say each topic answers?",
            options: ["How much does it cost and who made it", "Is it fast and is it pretty", "Can we rebuild it, and can we see it", "Which provider and which country"],
            answer_index: 2,
            explanation: "The section is about being repeatable and observable.",
          },
          {
            prompt: "Why is Kubernetes optional in this track?",
            options: ["It is no longer used", "It requires a paid certification before any provider will let you use it", "It only runs on phones", "It appears mostly in mid level adverts, though the main ideas help in interviews"],
            answer_index: 3,
            explanation: "Kubernetes is common in mid and senior roles, so beginners learn the ideas first.",
          },
          {
            prompt: "How does the lesson suggest you practise Kubernetes without spending money?",
            options: ["Rent a large cluster for a month and delete it before the bill arrives", "Skip practice completely", "Borrow a company's production cluster", "Use the free Killercoda Kubernetes playground, which is deleted after an hour"],
            answer_index: 3,
            explanation: "Free browser labs give you a real cluster with no cost and no card.",
          },
          {
            prompt: "In the fintech example, what made the first failure take a day to fix?",
            options: ["Only one engineer knew the setup, and it was kept in her memory", "The internet was slow", "The provider was closed", "The app had too many users at once, so every server crashed at the same time"],
            answer_index: 0,
            explanation: "Without written, repeatable setup, nobody else could rebuild the server.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "infrastructure-as-code": {
      outcomes: [
        "Explain how infrastructure as code works",
        "Run the Terraform cycle with no cloud account",
        "Explain state and why IaC saves money",
      ],
      explanation_md: `## Why it matters

Clicking through a cloud console is fine for learning, but at work it causes problems: nobody remembers exactly what was clicked, test and production drift apart, and rebuilding after a disaster is guesswork. **Infrastructure as code** (IaC) means describing servers, networks and databases in text files kept in Git. Ghanaian DevOps adverts name Terraform and AWS CloudFormation often, and telco and bank cloud roles list IaC directly.

## How it works

You write what you want, not the clicks to get there. The tool compares your files with what exists and makes only the changes needed. Because the files live in Git, every change is reviewed in a pull request, and you can rebuild the whole setup from scratch.

Common tools:

* **Terraform** (and its open source fork **OpenTofu**) works with AWS, Azure, Google Cloud and many other services.
* **AWS CloudFormation**, **Azure Bicep** and Google's tools work with their own clouds.
* **Ansible** is often used next to them for configuration management: installing and configuring software on servers that already exist.

## The Terraform cycle

Terraform uses four main commands:

\`\`\`bash
terraform init      # download providers
terraform plan      # preview changes
terraform apply     # make the changes
terraform destroy   # delete everything
\`\`\`

Always read the **plan** before applying. It lists what will be created, changed or destroyed.

## A first example with no cloud account

The \`local\` provider manages files on your own machine, so you can learn the full cycle at no cost:

\`\`\`hcl
terraform {
  required_providers {
    local = { source = "hashicorp/local" }
  }
}

resource "local_file" "menu" {
  filename = "\${path.module}/menu.txt"
  content  = "Waakye\\nTZ with ayoyo\\n"
}
\`\`\`

Run \`init\`, \`plan\` and \`apply\`, and \`menu.txt\` appears. Change the content and run \`plan\` again: Terraform shows that one resource, the file, will be replaced. Run \`destroy\` and the file is gone. Cloud resources such as a VM or a bucket work exactly the same way, with a different provider and resource type.

## State

Terraform records what it created in a **state file**. On a team, state is stored remotely (for example in a bucket) and locked so two people cannot change things at once. State can contain secrets, so never commit it to Git; add \`*.tfstate\` to \`.gitignore\`.

## Why IaC saves money while learning

Once a practice setup is code, \`terraform destroy\` removes every piece of it, including the forgotten disks and IP addresses that keep billing. On any real account, destroy at the end of every session.

## A small example

Azara's team runs a payroll app for schools across the Northern Region. Test and production were set up by hand months apart and behaved differently. She wrote both in Terraform with the same files and different settings. Now a change is reviewed in a pull request, planned, applied to test, then applied to production, and the two environments stay identical.`,
      practice_task_md: `**Goal:** run the full Terraform cycle with no cloud account.

1. Open a GitHub codespace or the Killercoda Ubuntu playground. Install Terraform by following the Linux steps on HashiCorp's official install page, or install OpenTofu (\`tofu\` instead of \`terraform\`). Check with \`terraform version\`.
2. Create \`main.tf\` with the menu example from the lesson.
3. Run \`terraform init\`, \`terraform plan\` and \`terraform apply\`. Open \`menu.txt\`.
4. Add a line to the menu, run \`plan\` and note what Terraform says will change. Apply it.
5. Add a second \`local_file\` resource for a price list. Apply.
6. Run \`terraform destroy\` and confirm both files are gone. Close the lab.
7. Commit \`main.tf\` and a \`.gitignore\` with \`*.tfstate*\` and \`.terraform/\` to a GitHub repository.

**Done looks like:** a repository with your Terraform file and notes showing the plan output before and after your change.`,
      quiz: {
        questions: [
          {
            prompt: "What is infrastructure as code?",
            options: ["Writing apps that run on servers", "Describing servers, networks and databases in text files kept in Git, so they can be reviewed and rebuilt", "Clicking through a console carefully", "A type of programming language for phones"],
            answer_index: 1,
            explanation: "IaC replaces manual clicks with files that are versioned and repeatable.",
          },
          {
            prompt: "Which Terraform command previews changes without making them?",
            options: ["`terraform apply`", "`terraform init`", "`terraform destroy`", "`terraform plan`"],
            answer_index: 3,
            explanation: "Plan shows what would be created, changed or destroyed.",
          },
          {
            prompt: "Why should the Terraform state file never be committed to Git?",
            options: ["It is too small", "It can contain secrets", "Git cannot store text files", "It deletes itself"],
            answer_index: 1,
            explanation: "State can hold sensitive values, so it is kept out of Git and stored remotely on teams.",
          },
          {
            prompt: "What is Ansible often used for next to Terraform?",
            options: ["Paying cloud bills automatically each month from the account", "Designing logos", "Replacing DNS", "Configuration management: installing and configuring software on existing servers"],
            answer_index: 3,
            explanation: "The lesson describes Ansible as configuration management.",
          },
          {
            prompt: "How does infrastructure as code help control costs while learning?",
            options: ["It gives free credit", "`terraform destroy` removes every piece of a practice setup, including forgotten extras", "It makes servers run faster", "It hides the bill"],
            answer_index: 1,
            explanation: "Destroying from code removes resources you might forget to delete by hand.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "kubernetes-basics": {
      outcomes: [
        "Explain desired state",
        "Name the main Kubernetes pieces and read a manifest",
        "Know when not to use Kubernetes",
      ],
      explanation_md: `## Why it matters

When a company runs dozens of containers across many servers, someone has to decide where each runs, restart them when they crash and add more when traffic spikes on salary day. Kubernetes does that. It appears in many Ghanaian DevOps adverts, mostly at mid and senior level, which is why this lesson is optional. Knowing the main ideas still helps you in interviews and in reading a team's setup on day one.

## The core idea: desired state

You tell Kubernetes what you want ("three copies of the web app, always") and it works continuously to make reality match. If a container crashes or a server dies, Kubernetes notices the difference and starts a replacement. You describe; it maintains.

## The main pieces

* **Cluster:** a group of machines run by Kubernetes.
* **Control plane:** the brain that stores desired state and makes decisions.
* **Nodes:** the worker machines that run your containers.
* **Pod:** the smallest unit, one or more containers that run together.
* **Deployment:** says which image to run and how many pods to keep.
* **Service:** a stable address that sends traffic to the right pods, even as pods come and go.

## A small manifest

Kubernetes is configured with YAML files called manifests:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels: {app: web}
  template:
    metadata:
      labels: {app: web}
    spec:
      containers:
        - name: web
          image: nginx:alpine
\`\`\`

Apply it with \`kubectl apply -f web.yaml\`.

## Everyday kubectl

\`\`\`bash
kubectl get pods
kubectl describe pod <name>
kubectl logs <name>
kubectl scale deployment web --replicas=5
kubectl delete pod <name>
\`\`\`

Delete a pod and run \`kubectl get pods\` again: a new one appears, because the deployment still wants three.

## Managed Kubernetes and cost

Cloud providers run the control plane for you: Amazon EKS, Azure Kubernetes Service and Google Kubernetes Engine. They are paid services, and clusters cost money every hour they exist. Do not create one to practise. Free browser labs give you a real cluster with no card.

## When not to use Kubernetes

Kubernetes is powerful but complex. A small app with a few users is often better on a single VM, a platform service or serverless. Choosing the simpler option is a sign of good judgement, not a lack of skill.

## A small example

Alhassan's team at a ride hailing startup in Accra runs its booking service on Kubernetes. On a Friday evening a bug made one pod crash repeatedly. Kubernetes kept restarting it and routing traffic to the healthy pods, so riders barely noticed. On Monday, Alhassan used \`kubectl logs\` to find the bug.`,
      practice_task_md: `**Goal:** see desired state in action in a free lab.

1. Open the Killercoda Kubernetes playground (free account, no card; it is deleted after an hour).
2. Save the manifest from the lesson as \`web.yaml\` and run \`kubectl apply -f web.yaml\`.
3. Run \`kubectl get pods\` and confirm three pods are running.
4. Delete one pod and run \`kubectl get pods\` again. Note what happened.
5. Scale to five replicas, then back to two.
6. Run \`kubectl expose deployment web --port=80\` and \`kubectl get services\` to see the stable address.
7. Copy your commands and observations into your notes before the lab expires, then close the tab.

**Done looks like:** notes showing a deleted pod being replaced and the deployment scaled up and down, in your own words.`,
      quiz: {
        questions: [
          {
            prompt: "What does desired state mean in Kubernetes?",
            options: ["The state the server was bought in", "You describe what should run, and Kubernetes continuously makes reality match it", "A list of your favourite apps", "The final version of your code, frozen so that it can never be changed by anyone on the team"],
            answer_index: 1,
            explanation: "Kubernetes compares what you asked for with what is running and fixes the difference.",
          },
          {
            prompt: "What is a Kubernetes Service for?",
            options: ["Billing customers", "Storing container images so pods can download them faster when they start", "Giving a stable address that sends traffic to the right pods as they come and go", "Writing manifests"],
            answer_index: 2,
            explanation: "Pods change, so a Service provides a stable way to reach them.",
          },
          {
            prompt: "What happens when you delete one pod managed by a deployment that wants three?",
            options: ["Kubernetes starts a new pod to get back to three", "The app stops forever", "All pods are deleted and must be started again by hand", "The cluster shuts down"],
            answer_index: 0,
            explanation: "The deployment restores the desired number of pods.",
          },
          {
            prompt: "Why does the lesson say not to create a managed Kubernetes cluster to practise?",
            options: ["They do not work", "They are only for banks", "They are paid services that cost money every hour they exist; free browser labs are enough", "They need a special phone"],
            answer_index: 2,
            explanation: "Managed clusters bill by the hour, while free labs give a real cluster without a card.",
          },
          {
            prompt: "When might Kubernetes be the wrong choice?",
            options: ["For a large service with many containers that must keep running when a server fails", "When you use containers", "When you need self healing", "For a small app with a few users, where a VM, platform service or serverless is simpler"],
            answer_index: 3,
            explanation: "Simpler options often suit small apps better.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "monitoring-and-logging": {
      outcomes: [
        "Tell apart metrics, logs and traces",
        "Watch the four key signals",
        "Design alerts people trust and set reliability targets",
      ],
      explanation_md: `## Why it matters

The worst way to learn your service is down is from an angry customer on social media. Good teams know first, and know why. Monitoring and logging appear across Ghanaian cloud and DevOps adverts, with tools such as Prometheus, Grafana, the ELK stack, Amazon CloudWatch and Azure Monitor. If you deployed an API in the backend track's [deploy and monitor](/roadmaps/backend-developer/deploy-and-monitor) lesson, this goes deeper.

## Three kinds of signal

* **Metrics** are numbers over time: requests per minute, error rate, response time, CPU and disk use. Cheap to store and great for dashboards and alerts.
* **Logs** are text records of events: "payment 4821 failed: timeout". Great for finding out why something happened.
* **Traces** follow one request through several services, showing where the time went.

## What to watch: four signals

For any service that users reach, start with four signals:

1. **Latency:** how long requests take.
2. **Traffic:** how many requests arrive.
3. **Errors:** how many fail.
4. **Saturation:** how full the resources are, such as CPU, memory or disk.

A sudden rise in errors or latency usually means users are suffering, whatever the cause.

## Tools you will meet

* **Prometheus** collects metrics by regularly asking each service for its numbers, and stores them.
* **Grafana** draws dashboards from Prometheus and many other sources.
* **ELK** (Elasticsearch, Logstash, Kibana) and similar stacks collect and search logs.
* Each cloud has its own: CloudWatch on AWS, Azure Monitor, and Google Cloud's operations tools.
* **Uptime checks** request your site from outside every minute or so and alert you if it fails.

## Measuring with a script

You can measure response time with nothing but \`curl\`:

\`\`\`bash
curl -o /dev/null -s \\
  -w "%{http_code} %{time_total}\\n" \\
  https://example.com
\`\`\`

It prints the status code and the time in seconds. Run it in a loop and you have a tiny monitor.

## Alerts that people trust

An alert should mean a human must act now. Alert on symptoms users feel (errors, slowness, site down), not on every small cause. Send each alert to the person on call, with a link to the dashboard and a short note on what to check first. Too many noisy alerts teach people to ignore them, which is how real outages get missed.

## Reliability targets

Teams agree on a target, such as "99.9 percent of requests succeed each month". This is called a service level objective (SLO). It turns arguments about "good enough" into a number the team can watch on a dashboard.

## Logging habits

Log useful facts (time, request ID, what failed) in a consistent format. Never log passwords, full card numbers, PINs or other personal data. Ghana's Data Protection Act applies to logs too.

## A small example

Hawa looks after a hospital appointment system in Tamale. She set up an uptime check and an error rate alert. One night the alert fired: errors jumped because the database disk was full. She cleared old logs and added disk space before the morning clinic opened. Patients never knew.`,
      practice_task_md: `**Goal:** build a tiny monitor and design real alerts.

1. In the Killercoda Ubuntu playground or a codespace, write \`monitor.sh\` that runs the \`curl\` command from the lesson against a site of your choice 10 times, 30 seconds apart (use a \`for\` loop and \`sleep 30\`), appending each result with the time (\`date +%T\`) to \`results.txt\`.
2. Run it and look at the results. Write down the slowest time and any non 200 codes.
3. Use \`awk '{ s += $3 } END { print s/NR }' results.txt\` to get the average time (adjust the column number to match your file).
4. On paper, design three alerts for a MoMo merchant API: what triggers each, who receives it and what they check first.
5. Save \`monitor.sh\` to GitHub and close the lab. Do not leave the script running.

**Done looks like:** a working script, a results file summary and three written alerts.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between metrics and logs?",
            options: ["Metrics are numbers over time; logs are text records of individual events", "There is no difference", "Logs are only for security teams, while metrics are for the developers who built the app", "Metrics are stored on paper"],
            answer_index: 0,
            explanation: "Metrics suit dashboards and alerts; logs explain what happened.",
          },
          {
            prompt: "Which of these is one of the four signals the lesson suggests watching?",
            options: ["Number of staff", "Logo colour", "Office temperature", "Errors"],
            answer_index: 3,
            explanation: "Latency, traffic, errors and saturation are the four signals.",
          },
          {
            prompt: "What should an alert mean, according to the lesson?",
            options: ["Something small changed somewhere", "A weekly report is ready", "A human must act now", "The dashboard was opened"],
            answer_index: 2,
            explanation: "Alerts that do not need action create noise and get ignored.",
          },
          {
            prompt: "What does the curl command in the lesson print?",
            options: ["The status code and the total time taken", "The website's full HTML only, without any timing", "The server's password", "The number of users online"],
            answer_index: 0,
            explanation: "The `-w` format prints the status code and time in seconds.",
          },
          {
            prompt: "Which of these should never appear in logs?",
            options: ["The time of the request", "A request ID", "Which step failed", "Passwords and PINs"],
            answer_index: 3,
            explanation: "Logs must never contain secrets or sensitive personal data.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "reliability-and-security": {
      outcomes: [
        "Test backups by restoring them",
        "Design for failure, patch and harden servers",
        "Manage secrets and respond to incidents",
      ],
      explanation_md: `## Why it matters

Things will break: disks fail, someone deletes the wrong folder, a dependency has a security hole, a region has an outage. Employers trust engineers who plan for failure and stay calm when it comes. Ghanaian infrastructure adverts name disaster recovery, backups and security standards, and banks and telcos treat them as essential. This builds on [backups](/roadmaps/it-support/backups) and [security basics](/roadmaps/it-support/security-basics) from IT support and [security](/roadmaps/backend-developer/security) from backend.

## Backups you have actually tested

A backup you have never restored is a hope, not a backup. The three copies rule still applies in the cloud: keep at least three copies of important data, on two kinds of storage, with one copy somewhere else, such as another region or account. Then restore regularly into a test environment and check the data is complete.

Two questions shape a backup plan:

* **Recovery point objective (RPO):** how much recent data can we afford to lose? If backups run nightly, up to a day.
* **Recovery time objective (RTO):** how long can we be down while restoring?

A bank's payments system needs both close to zero; a school newsletter can accept much more.

## Designing for failure

Run important services in more than one availability zone, behind a load balancer with health checks. Keep infrastructure as code so you can rebuild in another region. Avoid single points of failure, including people: document how things work.

## Patching and hardening

Most attacks use known holes that already have fixes. Apply operating system and dependency updates on a schedule, rebuild container images regularly so they pick up fixes, close every port you do not need and turn off password login for SSH in favour of keys.

## Secrets management

Passwords, API keys and database credentials belong in a secrets manager, such as AWS Secrets Manager, Azure Key Vault or Google Secret Manager, or the pipeline's secret store. Never in code, images or chat messages. Encrypt data in transit (HTTPS) and at rest (the storage encryption most cloud services offer).

## When something breaks: incident response

1. **Detect:** an alert or report arrives.
2. **Respond:** one person leads; others help. Communicate early to affected users and managers, even if you do not know the cause yet.
3. **Mitigate:** restore service first, for example by rolling back to the last good version. Investigate later.
4. **Resolve and review:** once stable, write a short review: what happened, the timeline, the cause, and actions to prevent it. Keep it **blameless**: focus on how the system allowed the mistake, not on punishing a person, so people report problems honestly.

## A small example

Issahaku's team ran a microfinance loan app. A developer ran a cleanup script against the wrong database and deleted a day of loan records. Because Issahaku had tested restores monthly, he knew the steps by heart and restored the latest backup within an hour. The blameless review led to two changes: production access now needs a second person's approval, and the script asks for confirmation before deleting anything.`,
      practice_task_md: `**Goal:** run a backup and restore drill and write an incident review.

1. In the Killercoda Ubuntu playground or a codespace, create a folder \`loans\` with a few text files of invented records.
2. Back it up with \`tar -czf loans-backup.tar.gz loans\` and record a checksum with \`sha256sum loans-backup.tar.gz > backup.sha256\`.
3. Delete the folder with \`rm -r loans\`. (This is your "accident".)
4. Check the backup with \`sha256sum -c backup.sha256\`, then restore it with \`tar -xzf loans-backup.tar.gz\` and confirm the files are back.
5. Write a one page blameless incident review for the accident: summary, timeline, cause, how it was fixed, and two actions to prevent it.
6. Close the lab.

**Done looks like:** notes from a successful restore drill and a written incident review you could show an interviewer.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson call an untested backup \"a hope, not a backup\"?",
            options: ["Backups never work", "Backups are illegal", "Until you restore it, you do not know whether the data is complete and usable", "Testing deletes backups"],
            answer_index: 2,
            explanation: "Only a successful restore proves a backup works.",
          },
          {
            prompt: "What does recovery point objective (RPO) describe?",
            options: ["The cost of storage", "How fast the server's CPU is when restoring the data after a failure", "The number of users", "How much recent data you can afford to lose"],
            answer_index: 3,
            explanation: "RPO is about acceptable data loss; RTO is about acceptable downtime.",
          },
          {
            prompt: "Where should API keys and database passwords be stored?",
            options: ["In the code, so they are easy to find when something breaks", "In a secrets manager or the pipeline's secret store", "In the container image", "In a team chat"],
            answer_index: 1,
            explanation: "Secrets managers keep credentials out of code, images and messages.",
          },
          {
            prompt: "During an incident, what should the team do first?",
            options: ["Find someone to blame", "Wait for the problem to fix itself, then write a report on what happened", "Rewrite the whole app", "Restore service, for example by rolling back, and investigate later"],
            answer_index: 3,
            explanation: "Mitigation comes first; the investigation follows once users are served again.",
          },
          {
            prompt: "Why should incident reviews be blameless?",
            options: ["So nobody needs to write anything", "So people report problems honestly and the team fixes how the system allowed the mistake", "Because mistakes never happen", "To hide incidents from managers"],
            answer_index: 1,
            explanation: "Blameless reviews focus on improving systems and encourage honesty.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "getting-hired": {
      outcomes: [
        "Explain what cloud employers look for",
        "Gather your evidence in one place",
        "Stay patient through a long search",
      ],
      explanation_md: `## Why this section matters

Cloud and DevOps employers are trusting you with the systems that hold their customers' money and data. They want evidence that you can build something, run it and fix it, not just a list of courses watched. This section turns everything you have practised into that evidence and points you towards realistic first steps.

## What employers look for

From the Ghanaian and remote adverts we read, three kinds of proof stand out:

* **Hands on experience:** something you built and ran, with a pipeline, containers, infrastructure as code and monitoring. Experience can come from a job, an internship, national service or a serious personal project.
* **A recognised baseline:** some adverts ask for a cloud certification or a degree. A fundamentals certification is a common first one.
* **Clear communication:** documentation, incident write ups and the ability to explain a technical choice to a manager. Adverts mention documentation and teamwork alongside the technical skills.

## What this section covers

* **Cloud certifications.** What the entry level exams test, how to prepare for free, and why a certificate supports hands on work rather than replacing it.
* **A cloud portfolio project.** One small app taken end to end, documented clearly and torn down so it costs nothing.
* **Finding your first cloud role.** The job titles to search for, routes in through support, operations and development roles, and how to talk about your work in interviews.

## Your evidence so far

If you have done the practice tasks, you already have pieces of a portfolio:

* A GitHub repository with a protected main branch, a pull request history and version tags.
* A working CI workflow that caught a broken change.
* A Dockerfile and a Terraform file.
* Scripts for backups and monitoring.
* Network diagrams, an incident review and your teardown checklist.

The next lessons pull these together into one story.

## A word on patience

Moving into cloud work often takes more than one step. Many engineers start in IT support, operations or development and take on cloud tasks until the title catches up. That is a normal path, not a failure. Keep building, keep writing up what you learn and keep applying.

## A small example

Mariama had finished several free courses but got no interviews. A mentor asked to see something she had built. She had nothing to show. Over six weeks she built one small project with a pipeline, a container, Terraform and a clear README, and wrote a short post about a bug her pipeline caught. Her next application led to an interview, and the interviewer spent most of it asking about that project.`,
      practice_task_md: `**Goal:** gather your evidence in one place.

1. Make a list of every practice output you have from this track: repositories, workflows, scripts, diagrams and written notes.
2. For each, write one sentence on what it shows an employer, for example "shows I can build a CI pipeline that blocks broken changes".
3. Mark any gaps: things adverts ask for that you cannot yet show.
4. Pin your best two or three repositories on your GitHub profile.

**Done looks like:** an evidence list with one line per item and a short gaps list. You will fill the gaps in the portfolio lesson.`,
      quiz: {
        questions: [
          {
            prompt: "What do cloud employers most want to see, according to the lesson?",
            options: ["A long list of courses watched and certificates of completion", "Expensive equipment", "A large social media following", "Evidence that you can build something, run it and fix it"],
            answer_index: 3,
            explanation: "Hands on evidence matters more than course lists.",
          },
          {
            prompt: "Which of these is listed as a kind of proof employers look for?",
            options: ["Typing speed certificates", "Owning a cloud company", "Clear communication, such as documentation and incident write ups", "Knowing every provider's prices for servers and storage by heart"],
            answer_index: 2,
            explanation: "Communication skills appear in adverts alongside technical skills.",
          },
          {
            prompt: "What does the lesson say about taking more than one step to reach a cloud role?",
            options: ["It means you have failed", "It is a normal path, often through support, operations or development", "It is impossible", "It only happens outside Ghana"],
            answer_index: 1,
            explanation: "Many engineers grow into cloud work from related roles.",
          },
          {
            prompt: "What changed Mariama's results?",
            options: ["Watching more courses", "Applying only to senior roles so recruiters would take her application seriously", "Paying for a premium account", "Building one documented project and writing about a bug her pipeline caught"],
            answer_index: 3,
            explanation: "A real project gave interviewers something concrete to discuss.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "cloud-certifications": {
      outcomes: [
        "Compare the entry level cloud exams",
        "Prepare for an exam for free",
        "Choose which certification to take first",
      ],
      explanation_md: `## Why it matters

Some Ghanaian cloud adverts ask for a cloud certification, and recruiters use them to filter applications. A fundamentals certification also gives your learning a clear structure and a deadline. But a certificate without hands on practice is easy to spot in an interview. Treat the exam as a milestone on top of real work, never a replacement for it.

## The entry level exams

Each major provider has one. These names were checked on the official pages in October 2026; check them again before you book, because exams are updated and retired.

* **Microsoft Certified: Azure Fundamentals** (exam **AZ-900**). Tests cloud concepts, Azure architecture and services, and Azure management and governance. Microsoft Learn offers free learning paths and a free practice assessment for it.
* **AWS Certified Cloud Practitioner** (exam CLF-C02). Aimed at people new to the cloud; AWS says some exposure to AWS helps but is not required. AWS Skill Builder has free preparation courses. The certification is valid for three years.
* **Cloud Digital Leader** (Google Cloud). No prerequisites; focuses on cloud basics and how Google Cloud services help organisations. Valid for three years.

All three overlap heavily with what you learned in the cloud fundamentals section of this track.

## What comes after

Associate level certifications go deeper and expect hands on skill. Examples are **AWS Certified Solutions Architect Associate** and **Microsoft Certified: Azure Administrator Associate** (exam AZ-104). Aim for these after you have built real projects or started a cloud related job.

## Preparing for free

1. Download the official exam guide or study guide. It lists every topic tested.
2. Work through the provider's free official training.
3. Map each topic to a lesson or practice task in this track and fill gaps.
4. Take the official free practice questions or assessment where offered.
5. Explain each topic aloud, as if to a friend. If you cannot, study it again.

## Money and honesty

Exams have a fee that depends on your country; the official page shows it when you register. Some training programmes and employers offer free vouchers, so ask before paying. Never buy "exam dumps" (leaked real questions). They break the providers' rules, can get your certification cancelled and teach you nothing useful for the job.

## Which one first?

Pick the provider that appears most in adverts you want. If you are unsure, any fundamentals exam teaches the shared ideas. One certificate plus a strong project is better than three certificates and nothing to show.

## A small example

Sumaila noticed that the bank adverts he read in Accra mentioned Azure. He used the free Microsoft Learn paths and practice assessment over six weeks, mapping each topic to his own lab notes. In his interview he talked about his CI pipeline and his Terraform project, and mentioned the AZ-900 at the end as proof he knew the vocabulary. The project got the attention; the certificate got him past the filter.`,
      practice_task_md: `**Goal:** build a free study plan for one fundamentals exam.

1. Choose one exam from the lesson based on adverts you have read.
2. Open its official exam page and study guide (text pages, little data). Copy the main topic areas into your notes, in your own words.
3. Next to each topic, write the lesson in this track that covers it and mark your confidence: strong, okay or weak.
4. Write a six week plan that spends most time on weak topics, using only free official training.
5. If the provider offers a free practice assessment, schedule a date to take it.

**Done looks like:** a topic map with confidence marks and a dated six week study plan.`,
      quiz: {
        questions: [
          {
            prompt: "How should you treat a fundamentals certification, according to the lesson?",
            options: ["As a replacement for hands on work", "As something to avoid", "As a milestone on top of real practice", "As the only thing employers check"],
            answer_index: 2,
            explanation: "Certificates support hands on evidence; they do not replace it.",
          },
          {
            prompt: "What is the exam code for Microsoft Certified: Azure Fundamentals?",
            options: ["AZ-900", "AZ-104", "CLF-C02", "It has no exam code"],
            answer_index: 0,
            explanation: "AZ-900 is the Azure Fundamentals exam; AZ-104 is Azure Administrator.",
          },
          {
            prompt: "Which certification is described as having no prerequisites and focusing on Google Cloud basics?",
            options: ["AWS Certified Solutions Architect Associate", "Microsoft Certified: Azure Administrator Associate", "Cloud Digital Leader", "AWS Certified Cloud Practitioner"],
            answer_index: 2,
            explanation: "Cloud Digital Leader is Google Cloud's entry level certification.",
          },
          {
            prompt: "Why should you never use exam dumps?",
            options: ["They are too expensive", "They make the exam harder", "They are only in French", "They break the providers' rules, can get your certification cancelled and teach nothing useful"],
            answer_index: 3,
            explanation: "Dumps are leaked questions and violate exam rules.",
          },
          {
            prompt: "What is the first step in the free preparation plan?",
            options: ["Book the exam immediately", "Download the official exam guide or study guide", "Buy a paid course", "Memorise practice answers from a question bank"],
            answer_index: 1,
            explanation: "The official guide lists every topic tested, so it shapes your plan.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "cloud-portfolio": {
      outcomes: [
        "Build a cloud portfolio project on a free tier",
        "Write a README that explains the project",
        "Tear down resources when you finish",
      ],
      explanation_md: `## Why it matters

A single well documented project that you built, ran and tore down says more to an employer than a list of certificates. It gives interviewers something real to ask about, and it gives you real stories to tell. This lesson brings every part of the track together into one portfolio project.

## The project

Build one small app end to end. Keep the app itself simple so your effort goes into the infrastructure: a static page for a local business (a Tamale tailor, a Bolgatanga basket weaving cooperative, a Wa pharmacy), or a small API from the backend track if you have one.

Your project should include:

1. **Git:** a public repository with a protected main branch, pull requests and version tags.
2. **CI:** a GitHub Actions workflow that tests every change and blocks broken ones.
3. **Container:** a Dockerfile, built by the pipeline.
4. **Infrastructure as code:** Terraform or OpenTofu files. Using the \`local\` provider is fine; if you have a cloud account that cannot bill you, you may describe a real resource, as long as you destroy it.
5. **Monitoring:** your health check script, or an uptime check, with an alert you have designed.
6. **Safety:** secrets kept out of code, a \`.gitignore\` and a \`.dockerignore\`.
7. **Documentation:** a README that explains it all.

## Hosting for free

GitHub Pages hosts static sites at no cost and needs no card, and your CI workflow can check the page before every change goes live. If you use any other hosting service, read its free tier page first; if it asks for card details, choose another option.

## The README is half the project

Write it for a busy hiring manager:

* **What it is:** one paragraph.
* **Architecture diagram:** a simple drawing of the parts and how a request flows, made with a free diagram tool or drawn neatly and photographed.
* **How to run it:** the exact commands.
* **How it is deployed:** what the pipeline does, step by step.
* **Costs and teardown:** what it would cost to run for real, how you kept it free and how to delete everything (for example \`terraform destroy\`).
* **What I would improve:** two or three honest next steps, such as multiple availability zones or a proper monitoring stack.
* **What I learned:** one problem you hit and how you solved it.

## Tear it down

When you have finished and recorded screenshots or a short screen recording, delete anything that could cost money or keep running: cloud resources, codespaces and lab sessions. The code and README stay on GitHub forever; the infrastructure can be rebuilt with one command. Being able to say "I tore it down and can rebuild it in five minutes" is itself impressive.

## A small example

Abdul-Rahman built a page for his aunt's shea butter business in Bolgatanga. His repository showed a pipeline that checked the page and built a container, Terraform files, a monitor script and a README with a hand drawn diagram. In an interview at a software firm in Accra, he spent twenty minutes explaining how his pipeline caught a broken price list. He was offered an internship.`,
      practice_task_md: `**Goal:** build and document your portfolio project.

1. Choose your app: a business page or a small API. Create a new public repository.
2. Work through the seven parts in the lesson, one per session, committing as you go through pull requests.
3. Draw the architecture diagram and add it to the README.
4. Write the README using every heading in the lesson.
5. Ask a mentor or friend to follow your "how to run it" steps. Fix anything that confuses them.
6. Tear down anything running: stop codespaces, close labs and destroy any cloud resources. Write in the README how you did it.

**Done looks like:** a public repository with all seven parts, a green CI badge or run history, a README with a diagram, and nothing left running anywhere.`,
      quiz: {
        questions: [
          {
            prompt: "Why should the app itself be simple in your portfolio project?",
            options: ["So your effort goes into the infrastructure: Git, CI, containers, IaC and monitoring", "Employers dislike complex apps", "Simple apps are free and complex ones are not", "Because GitHub only accepts small apps"],
            answer_index: 0,
            explanation: "The project is meant to show cloud and DevOps skills, not app features.",
          },
          {
            prompt: "Which of these belongs in the README according to the lesson?",
            options: ["Your password for the cloud account so reviewers can log in and check", "A copy of a job advert", "An architecture diagram and a costs and teardown section", "Nothing; code speaks for itself"],
            answer_index: 2,
            explanation: "The README explains the project, including how it stays free and how to delete it.",
          },
          {
            prompt: "What should you do if a hosting service asks for card details?",
            options: ["Enter them because it is free", "Choose another option, such as GitHub Pages", "Use a friend's card", "Skip hosting entirely and delete the project"],
            answer_index: 1,
            explanation: "The track never asks you to enter card details; free options without cards exist.",
          },
          {
            prompt: "What does the lesson say about tearing the project down?",
            options: ["You should leave it running to show employers", "Delete anything that could cost money or keep running; the code and README stay and you can rebuild it", "Delete the GitHub repository too", "Tearing down is only for paid accounts"],
            answer_index: 1,
            explanation: "Infrastructure as code lets you rebuild, so nothing needs to keep running.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "first-cloud-role": {
      outcomes: [
        "Search for the right job titles",
        "Prepare your CV, profile and interviews",
        "Keep going with a focused search",
      ],
      explanation_md: `## Why it matters

Knowing the skills is one thing; getting the first job is another. Cloud and DevOps titles often ask for experience, so your first role may have a different name. This lesson helps you search smartly, present your work well and use the role you have now as a route in.

## Titles to search for

Search for more than "cloud engineer":

* Cloud support engineer or associate
* Junior DevOps engineer or DevOps intern
* IT infrastructure or systems administrator
* IT operations engineer or NOC (network operations centre) analyst
* Site reliability engineering intern
* Technical support engineer at a software or cloud company

Banks, telcos, fintechs, software companies, consultancies and managed service providers in Accra, Kumasi and Takoradi all hire for these roles. Remote boards that welcome Africa based applicants list cloud support and junior DevOps roles too.

## Routes in

* **Internships and national service.** Ask IT, infrastructure and software teams directly whether they take national service personnel or interns, and say what you can already do.
* **Free training cohorts.** Some employers and training partners run free cloud training with placement support. Check the organisation's own website before applying, never pay to apply for a "free" programme and be wary of anyone promising guaranteed jobs.
* **Inside your current job.** If you work in IT support or as a developer, volunteer for the deployment, monitoring or cloud tasks. Document what you do. Many engineers move into DevOps this way.
* **Freelance and community work.** Set up a pipeline or hosting for a church, school or NGO, with permission and without taking on costs they cannot afford.

## Your CV and profile

* Lead with projects, not course lists: "Built a CI pipeline that tests and containerises a site on every change".
* Name the tools you have actually used.
* Link your GitHub and your portfolio README.
* Keep it to one or two pages, readable on a phone screen.

## Interview preparation

Practise answering these aloud:

* What happens when you type a website address and press enter?
* A site is down. Walk me through how you would find out why.
* What is least privilege, and how have you applied it?
* Explain your portfolio project and one problem you solved.
* How do you keep cloud costs under control?

When you do not know an answer, say how you would find out. Interviewers value honest reasoning.

## Keep going

Join a local tech community or meetup, share short write ups of what you learn, and keep a list of applications with dates and follow ups. Each interview, even an unsuccessful one, shows you what to learn next.

## A small example

Amina applied for six cloud engineer roles without success. She widened her search, applied for a NOC analyst role at a telco, and got it. She used her portfolio to show her monitoring skills, volunteered to help the cloud team with their dashboards and wrote up everything she did. Eighteen months later she moved onto that cloud team.`,
      practice_task_md: `**Goal:** start a focused, realistic job search.

1. Search two job boards or company career pages for three of the titles in the lesson. Save five adverts that fit your current skills or are one step above.
2. Rewrite the top of your CV so it leads with your portfolio project in one or two sentences, and name only tools you have used.
3. Write your answers to the five interview questions in the lesson, then say them aloud, timing each at about two minutes.
4. Start an application tracker (a spreadsheet or notes app) with columns: organisation, role, link, date applied, status, follow up date.
5. If you are in an IT or developer job now, write one cloud related task you could volunteer for this month.

**Done looks like:** five saved adverts, an updated CV top section, written interview answers and a tracker with at least one application.`,
      quiz: {
        questions: [
          {
            prompt: "Why does the lesson suggest searching for more titles than \"cloud engineer\"?",
            options: ["Your first role may have a different name, such as cloud support or IT operations", "Cloud engineer roles do not exist in Ghana", "Other titles pay more", "Recruiters prefer unclear titles"],
            answer_index: 0,
            explanation: "Related roles are realistic first steps into cloud work.",
          },
          {
            prompt: "What should you do before applying to a free cloud training cohort?",
            options: ["Pay the application fee quickly", "Check the organisation's own website, and never pay to apply for a \"free\" programme", "Share your bank details", "Trust any promise of a guaranteed job"],
            answer_index: 1,
            explanation: "Verifying the source and refusing to pay protects you from scams.",
          },
          {
            prompt: "How should your CV present your skills?",
            options: ["As a long list of every course watched", "Leading with projects and naming tools you have actually used", "With as many tool names as possible, whether or not you have used them, so searches find you", "Without any links"],
            answer_index: 1,
            explanation: "Projects and honest tool lists make a stronger CV.",
          },
          {
            prompt: "What should you do in an interview when you do not know an answer?",
            options: ["Make something up confidently", "Stay silent", "Change the subject", "Explain how you would find out"],
            answer_index: 3,
            explanation: "Interviewers value honest reasoning about how you would solve the problem.",
          },
          {
            prompt: "How did Amina move onto a cloud team?",
            options: ["She was hired as a senior engineer straight away because of her certifications", "She bought several certifications", "She took a NOC analyst role, helped the cloud team and documented her work", "She stopped applying"],
            answer_index: 2,
            explanation: "A related role plus volunteering for cloud tasks became her route in.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
