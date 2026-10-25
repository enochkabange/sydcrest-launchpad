import type { TrackContent } from "./types";

/**
 * Lesson content for the Cybersecurity Analyst track. Original SydCrest
 * writing; sources and the coverage table are in
 * src/content/research/cybersecurity.md. Every person, company, log line and
 * message in these lessons is invented for teaching. Example codes, numbers
 * and addresses are deliberately fake. Everything is defensive: no lesson
 * teaches attacking a system the learner does not own or have written
 * permission to test.
 */
const content: TrackContent = {
  roadmap: "cybersecurity-analyst",
  nodes: {
    foundations: {
      explanation_md: `## Why this matters

Banks, telcos, fintechs, hospitals and government offices in Ghana all run on computers and phones, and all of them are targets. Mobile money fraud, fake links and stolen WhatsApp accounts are part of daily news. Organisations need people who can notice trouble early, respond calmly and help others stay safe. That is the work of a cybersecurity analyst.

This track assumes you have finished, or are working through, IT support. Security builds on those skills: you need to know how computers, accounts and networks work before you can defend them.

## What a junior analyst actually does

The job is mostly careful watching, checking and writing. A typical day might include:

* Reviewing alerts from security tools and deciding which ones are real.
* Checking whether a strange login was the staff member or someone else.
* Helping a colleague who clicked a suspicious link.
* Making sure computers have their updates.
* Writing short, clear notes about what you found and what you did.

It is less like the hacker films and more like being a careful detective with good records.

## Two ideas to start with

The first topic in this section gives you the core language: **confidentiality, integrity and availability**, and the idea of **risk**. Every security decision comes back to these words.

The second topic is about **ethics and the law**. Security skills can be misused. In Ghana, accessing a computer or data without permission is a crime, and professionals only test systems they own or have written permission to test. This track is defensive from start to finish. You will learn to protect, detect and respond, never to break into other people's systems.

## A small example

Hawa works on the help desk at a microfinance company in Tamale. One morning a staff member says her account was locked overnight after many failed logins. Hawa does not panic or guess. She asks three questions. Which information could be at risk? Was anything changed? Can staff still work? Then she checks the login records, sees the attempts came from outside the office, resets the password, turns on a second login step and writes a short note for her manager. That is security thinking: calm questions, evidence, action and a record.

## Phones and computers

You can learn all the ideas in this section on a phone. Later sections include labs that need a computer; when they do, the lesson will say so and offer the best phone alternative.`,
      practice_task_md: `**Goal:** start your security learning journal.

1. Create a free Google Doc or a notes file on your phone called "Security journal".
2. Write one paragraph on why you want to work in cybersecurity and which kind of employer interests you (bank, telco, fintech, NGO, government or remote).
3. Write the five daily tasks of a junior analyst from this lesson in your own words.
4. Add one recent scam or security story you heard about in Ghana (from news or friends). Describe what happened in three sentences, without naming the victim.

**Done looks like:** a one page journal entry you can show a mentor. You will add to this journal throughout the track, and it becomes part of your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which skills does this track assume you have, or are building, before you start?",
            options: [
              "Advanced programming in several languages",
              "IT support skills such as computers, accounts and networks",
              "A university degree in mathematics",
              "Experience running a hacking team",
            ],
            answer_index: 1,
            explanation: "Security builds on IT support knowledge of how computers, accounts and networks work.",
          },
          {
            prompt: "Which task is a normal part of a junior analyst's day?",
            options: [
              "Breaking into competitors' systems to test them",
              "Reviewing alerts and deciding which ones are real",
              "Writing viruses for practice",
              "Guessing staff passwords to check they are strong",
            ],
            answer_index: 1,
            explanation: "Junior analysts spend much of their time checking alerts and recording what they find.",
          },
          {
            prompt: "In Ghana, what is the legal position on accessing a computer or data without permission?",
            options: [
              "It is allowed if you do not steal anything",
              "It is allowed for students",
              "It is a crime",
              "It is allowed if you report it afterwards",
            ],
            answer_index: 2,
            explanation: "Accessing a computer or data without permission is an offence, so professionals only test with written permission.",
          },
          {
            prompt: "In the example, what did Hawa do first when the account was locked?",
            options: [
              "She deleted the account",
              "She asked calm questions about what was at risk, changed or unavailable",
              "She blamed the staff member",
              "She ignored it because the account was already locked",
            ],
            answer_index: 1,
            explanation: "Hawa started with calm questions, then gathered evidence before acting.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "cia-and-risk": {
      explanation_md: `## Why this matters

Interviewers for security roles in Ghana often ask you to explain the CIA triad, and you will use its words in every incident note you write. Risk is the other half: no organisation can fix everything at once, so analysts help decide what to fix first.

## The CIA triad

**Confidentiality** means only the right people can see information. A customer's mobile money balance, a patient's test result and staff salaries should stay private. A leaked customer list is a confidentiality failure.

**Integrity** means information is accurate and has not been changed without permission. If someone edits a loan record so a balance looks paid, integrity has failed, even if nobody else saw the record.

**Availability** means systems and data are there when people need them. If a hospital's records system is down on a busy morning, or ransomware locks a shop's sales files, availability has failed.

Different incidents hit different parts of the triad. A good analyst names which part, because it shapes the response.

## Threats, vulnerabilities and risk

These three words are often mixed up. Keep them separate:

* A **threat** is something that could cause harm: a fraudster, a virus, a flood, a careless insider.
* A **vulnerability** is a weakness that a threat could use: a weak password, a missing update, staff who have never seen a phishing message.
* **Risk** is the chance that a threat uses a vulnerability, combined with how bad the damage would be.

A simple way to rank risks is to score **likelihood** and **impact** from 1 (low) to 3 (high) and multiply them. A score of 9 is urgent; a score of 1 can wait.

## A small example

Fuseini helps a pharmacy in Bolgatanga with its computers. He lists three worries:

| Risk | Likelihood | Impact | Score |
|---|---|---|---|
| Shared password on the sales laptop | 3 | 2 | 6 |
| No backup of the stock records | 2 | 3 | 6 |
| Laptop stolen from the counter | 1 | 3 | 3 |

He also notes which part of the triad each one affects: the shared password threatens confidentiality and integrity, the missing backup threatens availability. He recommends fixing the top two first: separate passwords for each staff member and a weekly backup to an external drive. The owner understands the reasons because Fuseini used plain words and a clear table.

## What to remember

When you see a security problem, ask: which part of CIA is at risk, what is the threat, what is the weakness, and how likely and how bad is it? Those four questions turn worry into a plan.`,
      practice_task_md: `**Goal:** build a small risk register for a place you know.

1. Pick a real or imagined small organisation: a church office, a school in Wa, a phone repair shop, or a family business.
2. List five risks. For each, write the threat and the vulnerability in plain words.
3. Score likelihood and impact from 1 to 3 and multiply them.
4. Mark which part of the CIA triad each risk affects.
5. Sort the list from highest to lowest score and write one sentence of advice for the top two.

**Done looks like:** a five row table in Google Sheets or on paper, sorted by score, with two recommendations. Do not include real passwords or personal details. Save a photo or copy in your security journal.`,
      quiz: {
        questions: [
          {
            prompt: "Someone secretly edits a loan record so a balance looks paid. Which part of the CIA triad has failed?",
            options: ["Confidentiality", "Integrity", "Availability", "None, because nothing was leaked"],
            answer_index: 1,
            explanation: "Integrity means data has not been changed without permission.",
          },
          {
            prompt: "Ransomware locks a shop's sales files so staff cannot open them. Which part of the triad is hit most directly?",
            options: ["Availability", "Integrity", "Confidentiality", "Authentication"],
            answer_index: 0,
            explanation: "Availability means systems and data are there when people need them.",
          },
          {
            prompt: "Which of these is a vulnerability rather than a threat?",
            options: ["A fraudster", "A flood", "A missing software update", "A computer virus"],
            answer_index: 2,
            explanation: "A vulnerability is a weakness, such as a missing update, that a threat could use.",
          },
          {
            prompt: "Using the lesson's method, what is the risk score for likelihood 3 and impact 3?",
            options: ["3", "6", "9", "1"],
            answer_index: 2,
            explanation: "Likelihood is multiplied by impact, so 3 times 3 gives 9, the most urgent score.",
          },
          {
            prompt: "Why did Fuseini fix the shared password and missing backup first?",
            options: [
              "They were the cheapest to fix",
              "They had the highest risk scores",
              "The owner asked for them by name",
              "They only affected confidentiality",
            ],
            answer_index: 1,
            explanation: "Both scored 6, higher than the stolen laptop risk, so they came first.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "ethics-and-law": {
      explanation_md: `## Why this matters

Security skills are powerful, and employers in Ghana hand analysts access to customer data, staff accounts and alerts about weaknesses. They only trust people with sound judgement. One careless "test" of a system you do not own can end a career before it starts and can lead to prosecution.

## What the law says

Ghana's **Electronic Transactions Act, 2008 (Act 772)** makes it an offence to intentionally access or intercept an electronic record without authority or permission (section 124). The Act also covers interfering with records, denial of service and other computer offences. The **Cybersecurity Act, 2020 (Act 1038)** adds offences such as retrieving subscriber information or intercepting communications without lawful authority, and it protects children and adults online, including against sharing intimate images without consent.

You do not need to memorise section numbers. You need one rule: **if you do not own it and you do not have written permission, do not touch it.** Curiosity, good intentions or "I was only checking" are not a defence.

## Defensive professionals behave like this

* **Permission first.** Any test of a real system needs written permission from someone with the authority to give it, stating what may be tested and when. Many organisations hire licensed providers for testing; the Cyber Security Authority licenses cybersecurity service providers in Ghana.
* **Least access.** Look only at the data your task needs. Being able to open a file does not mean you should.
* **Confidentiality.** Never share customer details, passwords or weaknesses you learn about at work, not even as a joke in a WhatsApp group.
* **Honesty.** If you make a mistake, report it straight away. Hidden mistakes do far more damage.
* **Practise only in labs.** Use training platforms and your own virtual machines built for learning, never a school, church, café or neighbour's network.

## A small example

Sumaila is on national service in the IT unit of a district assembly. A friend sends him a "free tool" that claims to show passwords saved on other people's phones on the same Wi Fi. Sumaila does not run it. He knows that using it on others would be unauthorised access, and that unknown tools often carry malware. Instead he reports the message to his supervisor so staff can be warned. His supervisor later asks him to help with the office's security awareness training, because he showed judgement.

## The line in one sentence

Protect what you are responsible for, investigate only within your role, and leave everything else alone.`,
      practice_task_md: `**Goal:** write your personal code of conduct.

1. In your security journal, write a heading "My code of conduct".
2. Write five rules in your own words, covering permission, least access, confidentiality, honesty and where you will practise.
3. For each rule, add one Ghanaian situation where it would matter (for example, a friend asking you to "check" their partner's WhatsApp).
4. Write what you would say to politely refuse that request.

**Done looks like:** five rules, five situations and five polite refusals on one page. Share it with a mentor. This is a strong document to mention in interviews when asked about ethics.`,
      quiz: {
        questions: [
          {
            prompt: "Under Act 772, which of these is an offence?",
            options: [
              "Updating your own laptop",
              "Intentionally accessing an electronic record without authority or permission",
              "Practising on a training platform built for learners",
              "Reporting a suspicious message to your supervisor",
            ],
            answer_index: 1,
            explanation: "Section 124 of Act 772 makes access or interception without authority or permission an offence.",
          },
          {
            prompt: "What must you have before testing the security of a real system?",
            options: [
              "A good reason",
              "A friend who works there",
              "Written permission from someone with authority to give it",
              "A certificate from an online course",
            ],
            answer_index: 2,
            explanation: "Professionals test only with written permission stating what may be tested and when.",
          },
          {
            prompt: "Where should you practise security skills?",
            options: [
              "On a café's public Wi Fi",
              "On your school's network after hours",
              "On training labs and your own learning machines",
              "On a neighbour's network with their router password",
            ],
            answer_index: 2,
            explanation: "Practise only in labs built for learning or on systems you own.",
          },
          {
            prompt: "Why did Sumaila refuse to run the \"free tool\"?",
            options: [
              "It was too slow",
              "Using it on others would be unauthorised access and it might carry malware",
              "He had already used a better tool",
              "His phone did not support it",
            ],
            answer_index: 1,
            explanation: "He recognised both the legal problem and the malware risk, and reported it instead.",
          },
        ],
        pass_threshold: 75,
      },
    },
    systems: {
      explanation_md: `## Why this matters

Security adverts from Ghanaian telcos, banks and IT firms keep naming the same foundations: networking, Windows, Linux, firewalls and logs. An alert that says "unusual connection from 10.0.4.17 on port 3389" means nothing unless you know what an IP address, a port and remote desktop are. Your IT support knowledge is the base; this section turns it towards defence.

## The defender's view of systems

In IT support you ask "how do I make this work?". In security you add "how could this be misused, and how would I notice?". The same knowledge serves both questions.

* **Networks** carry every attack and every alert. You need to read addresses, ports and protocols, and understand what a firewall allows or blocks.
* **Windows** runs most office computers in Ghana. Defenders need to know accounts, updates, built in protection and, most of all, the event logs that record logins and changes.
* **Linux** runs many servers, cloud systems and security tools. Defenders need the command line to read and search log files.

## How this section works on modest hardware

This is the first section where a computer really helps. Wireshark, virtual machines and the Linux command line are easier on a laptop. If you only have a phone right now:

* Read the lessons and do the "read the evidence" tasks, which use short logs you can study on a phone screen.
* Use free browser based courses such as Cisco Networking Academy's Networking Basics and Linux Unhatched, which work in a browser on a larger phone or tablet.
* Book time on a computer at a school ICT lab, a public library or a community centre for the hands on parts, and plan what you will do before you go so you use the time and data well.

## A small example

Mariama is an IT support assistant at a fintech in Accra, preparing to move into security. Her manager shows her a firewall log line: a computer inside the office tried to connect to an unknown overseas address on port 4444 many times overnight. Because Mariama knows ports, she recognises that 4444 is not used by normal office software. Because she knows Windows, she checks that computer's event log and finds a new program installed the evening before. She reports both facts clearly. Her networking and Windows knowledge turned a confusing line into a useful lead.

## What you will be able to do

By the end of this section you will be able to read a simple connection record, find the login events on a Windows computer, and search a Linux log file for failed logins.`,
      practice_task_md: `**Goal:** map your own setup as a defender would.

1. On your phone or computer, find your device's IP address (Settings, then Wi Fi or About).
2. Log in to your home router's page only if it is your own router and you have the password; otherwise skip this step. Note how many devices are connected.
3. In your security journal, draw a simple map: internet, router, and each device that connects to it.
4. For each device, write one way it could be misused and one way you would notice.

**Done looks like:** a hand drawn or digital network map with a short "misuse and notice" note per device. Never log in to a router or network that is not yours.`,
      quiz: {
        questions: [
          {
            prompt: "What question does a defender add to the IT support question \"how do I make this work\"?",
            options: [
              "How do I make it faster?",
              "How could this be misused, and how would I notice?",
              "How much did this cost?",
              "Who installed this?",
            ],
            answer_index: 1,
            explanation: "Security adds thinking about misuse and detection to normal IT knowledge.",
          },
          {
            prompt: "Why do defenders need to know Linux?",
            options: [
              "Because most phones in Ghana run desktop Linux",
              "Because many servers and security tools run on it and its logs are read from the command line",
              "Because Windows has no logs",
              "Because Linux cannot be attacked",
            ],
            answer_index: 1,
            explanation: "Many servers, cloud systems and tools run Linux, and analysts search its logs at the command line.",
          },
          {
            prompt: "What is a sensible plan if you only have a phone for the hands on parts?",
            options: [
              "Skip this section entirely",
              "Use browser based courses and book planned time on a computer at a lab, library or community centre",
              "Download several large virtual machines on mobile data",
              "Practise on a friend's office network",
            ],
            answer_index: 1,
            explanation: "Browser courses and planned sessions on a shared computer keep costs low and practice legal.",
          },
          {
            prompt: "In the example, what made Mariama suspicious of the firewall log line?",
            options: [
              "The computer was switched off",
              "Repeated overnight connections to an unknown overseas address on an unusual port",
              "The connection used port 443",
              "The computer belonged to her manager",
            ],
            answer_index: 1,
            explanation: "Port 4444 is not used by normal office software, and the repeated overnight attempts were unusual.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "networking-for-security": {
      explanation_md: `## Why this matters

Telco and bank security adverts in Ghana ask for an understanding of networks, firewalls and network traffic. Almost every alert you handle will mention an IP address, a port or a domain name, so this is everyday vocabulary for an analyst.

## The pieces you must read fluently

* **IP address:** the number that identifies a device on a network. Addresses such as 192.168.x.x and 10.x.x.x are private, used inside homes and offices. Other addresses are public, on the wider internet.
* **Port:** a numbered door on a device for a particular service. Common ones: 53 for DNS, 80 for web (HTTP), 443 for secure web (HTTPS), 22 for SSH remote login, 3389 for Windows Remote Desktop.
* **Protocol:** the rules for a type of traffic, such as TCP, UDP, HTTP or DNS.
* **DNS:** the internet's phone book, turning names like example.com into IP addresses. Attackers register look alike names, so checking domains is a daily task.
* **Firewall:** a device or program that allows or blocks traffic based on rules, such as "block Remote Desktop from the internet".

## Reading a connection record

Firewalls and other tools write records like this:

\`\`\`
08:14 ALLOW 192.168.1.20 -> 41.0.0.9:443 TCP
02:31 BLOCK 203.0.113.50 -> 192.168.1.5:3389 TCP
02:31 BLOCK 203.0.113.50 -> 192.168.1.5:3389 TCP
\`\`\`

Read each line as: time, action, source, destination and port, protocol. The first line is an office computer visiting a secure website, which is normal. The next lines show an outside address trying to reach Remote Desktop on an inside machine at 2:31 in the morning. The firewall blocked it, which is good, but a pattern like this tells you someone is probing, so you check that Remote Desktop is not open elsewhere.

## Looking at traffic

Tools like **Wireshark** capture packets so you can see conversations on a network you are responsible for. Wireshark needs a computer. On a phone, you can still practise reading connection records like the ones above. Only capture traffic on your own network or in a lab; capturing other people's traffic without authority is illegal.

## A small example

Issahaku works on a help desk in Tamale. Staff complain the internet is slow. He checks the firewall summary and sees one laptop sending large amounts of data to a single unknown address all night on an unusual port. He disconnects the laptop from the network, tells his supervisor and writes down the times and addresses. Networking knowledge turned "slow internet" into an early warning.`,
      practice_task_md: `**Goal:** read and explain connection records.

1. Copy these invented records into your journal:
   * \`09:02 ALLOW 192.168.1.30 -> 8.8.8.8:53 UDP\`
   * \`09:03 ALLOW 192.168.1.30 -> 41.0.0.9:443 TCP\`
   * \`23:47 BLOCK 198.51.100.7 -> 192.168.1.10:22 TCP\` (repeated 40 times)
2. For each line, write the source, destination, port, the service the port usually means, and whether it looks normal.
3. Write a two sentence note to a supervisor about anything suspicious.
4. Optional, with a computer: install Cisco Packet Tracer or Wireshark and look at traffic on your own home network only.

**Done looks like:** a short table explaining each record and a clear two sentence note.`,
      quiz: {
        questions: [
          {
            prompt: "Which port is normally used for secure websites (HTTPS)?",
            options: ["22", "53", "443", "3389"],
            answer_index: 2,
            explanation: "Port 443 carries HTTPS, the secure web traffic most sites use.",
          },
          {
            prompt: "What does DNS do?",
            options: [
              "Encrypts every file on a computer",
              "Turns names like example.com into IP addresses",
              "Blocks all traffic from outside",
              "Stores passwords for websites",
            ],
            answer_index: 1,
            explanation: "DNS works like a phone book, translating names into addresses.",
          },
          {
            prompt: "Which of these is a private IP address used inside homes and offices?",
            options: ["8.8.8.8", "41.0.0.9", "192.168.1.20", "203.0.113.50"],
            answer_index: 2,
            explanation: "Addresses beginning 192.168 are private, used inside local networks.",
          },
          {
            prompt: "Repeated blocked attempts from an outside address to port 3389 at night most likely show what?",
            options: [
              "A staff member printing documents",
              "Someone probing for Windows Remote Desktop",
              "A normal software update",
              "A DNS lookup",
            ],
            answer_index: 1,
            explanation: "Port 3389 is Remote Desktop, and repeated outside attempts suggest probing.",
          },
          {
            prompt: "When is it acceptable to capture network traffic with a tool like Wireshark?",
            options: [
              "On any public Wi Fi",
              "On your own network or a lab you are responsible for",
              "On a neighbour's network if it is unprotected",
              "On a school network if nobody notices",
            ],
            answer_index: 1,
            explanation: "Capturing other people's traffic without authority is illegal; use your own network or labs.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "windows-security": {
      explanation_md: `## Why this matters

Most office computers in Ghanaian banks, schools, hospitals and businesses run Windows. When something goes wrong, the analyst is often asked "what happened on this computer?". The answer usually sits in Windows settings and the Windows event logs.

## Accounts and permissions

Windows has **standard** accounts and **administrator** accounts. Administrators can install software and change settings; standard users cannot. A safe office gives staff standard accounts for daily work, so a malicious download cannot easily change the whole system. Shared accounts such as "Accounts1" with one password for five people make it impossible to know who did what.

## Built in protection

* **Windows Update** installs fixes for security weaknesses. Many attacks succeed only because updates were delayed.
* **Microsoft Defender Antivirus** is built in and scans for malware.
* **Windows Firewall** filters traffic coming into and out of the computer.
* **Disk encryption** (BitLocker or device encryption, depending on the edition and hardware) protects data if a laptop is stolen.

## Event logs: the computer's diary

Open **Event Viewer**, then **Windows Logs**, then **Security**. Each entry has an Event ID. A few to know:

| Event ID | Meaning |
|---|---|
| 4624 | Successful logon |
| 4625 | Failed logon |
| 4720 | A user account was created |
| 4732 | A member was added to a security enabled local group, such as Administrators |
| 1102 | The security log was cleared |

A burst of 4625 events followed by a 4624 can mean someone guessed a password. A new account (4720) added to Administrators (4732) at midnight deserves questions. A cleared log (1102) is a red flag, because attackers try to hide their tracks.

## A small example

Amina is an IT officer at a rural bank in the Upper East. A branch manager reports that his computer "feels strange". Amina opens Event Viewer and filters the Security log for 4625. She finds dozens of failed logons around 1 a.m., then a 4624 success, then a 4720 for a new account called "support2" that nobody requested. She disconnects the computer from the network, records the times and event IDs, and escalates to the security team. Her careful notes help them act fast.

## Phone and computer

Exploring Event Viewer needs a Windows computer. If you do not have one, use a school ICT lab, a library or a community centre computer, and only look at the logs with permission from whoever manages it. On a phone, study the event ID table until you know it well.`,
      practice_task_md: `**Goal:** read the Windows security diary.

**With a Windows computer you own or have permission to use:**
1. Open Event Viewer, then Windows Logs, then Security.
2. Use "Filter Current Log" to show Event ID 4624, then 4625.
3. Write down the time of your own last successful logon and any failed ones.
4. Check that Windows Update and Microsoft Defender are on.

**Phone only:**
1. Copy the event ID table from the lesson into your journal from memory, then check it.
2. Write what you would conclude from this invented sequence: five 4625 events at 01:10, one 4624 at 01:12, one 4720 at 01:15.

**Done looks like:** a short note of what you found and what it means, written so a supervisor can follow it.`,
      quiz: {
        questions: [
          {
            prompt: "Which Windows Event ID records a failed logon?",
            options: ["4624", "4625", "4720", "1102"],
            answer_index: 1,
            explanation: "Event ID 4625 records a failed logon attempt.",
          },
          {
            prompt: "Why is a cleared security log (Event ID 1102) a red flag?",
            options: [
              "It means the computer needs more storage",
              "Attackers often clear logs to hide their tracks",
              "It always means Windows Update ran",
              "It shows a successful backup",
            ],
            answer_index: 1,
            explanation: "Clearing the log removes evidence, which attackers try to do.",
          },
          {
            prompt: "Why should staff use standard accounts for daily work?",
            options: [
              "Standard accounts are faster",
              "A malicious download cannot easily change the whole system",
              "Administrators cannot use email",
              "Standard accounts do not need passwords",
            ],
            answer_index: 1,
            explanation: "Without administrator rights, malware has less power over the system.",
          },
          {
            prompt: "Where do you find the Windows security events in Event Viewer?",
            options: [
              "Windows Logs, then Security",
              "Control Panel, then Sound",
              "File Explorer, then Downloads",
              "Settings, then Display",
            ],
            answer_index: 0,
            explanation: "Security events sit under Windows Logs, then Security, in Event Viewer.",
          },
          {
            prompt: "In the example, what did the 4720 event show Amina?",
            options: [
              "The manager changed his wallpaper",
              "A new user account was created that nobody requested",
              "The computer installed an update",
              "The security log was cleared",
            ],
            answer_index: 1,
            explanation: "Event ID 4720 means a user account was created, and this one was unexpected.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "linux-for-security": {
      explanation_md: `## Why this matters

Many servers, cloud systems and security tools run on Linux, and adverts for analyst roles name Linux alongside Windows. When an alert points at a Linux server, you will need to read its logs from the command line, often with no mouse and no pictures.

## Moving around

The command line takes typed commands. A few essentials:

\`\`\`
pwd              # where am I?
ls -l            # list files with details
cd /var/log      # go to the log folder
less auth.log    # read a file page by page
\`\`\`

## Reading and searching logs

On Ubuntu and Debian systems, login activity is recorded in **/var/log/auth.log**. Other Linux families use different names, such as /var/log/secure. Logs are long, so you search them:

\`\`\`
grep "Failed password" /var/log/auth.log
grep "Failed password" /var/log/auth.log | wc -l
tail -n 20 /var/log/auth.log
\`\`\`

The first command shows lines containing "Failed password". The second counts them. The third shows the last 20 lines. Reading logs usually needs administrator rights, so on real systems you may type \`sudo\` first, and only on systems you are allowed to manage.

## Permissions

\`ls -l\` shows permissions such as \`-rw-r-----\`. The letters mean read (r), write (w) and execute (x) for three groups: the owner, the owner's group, and everyone else. A file of customer records readable by everyone is a confidentiality problem, even if nobody has opened it yet.

## A small example

Abdul-Rahman supports a small web server for an NGO in Damongo. The site has been slow. He connects with permission, runs the failed password search and gets thousands of results from a handful of outside addresses, all trying user names like "admin" and "root". He reports it, and the team disables password logins for remote access in favour of keys and turns on a tool that blocks repeat offenders. Three commands gave him the evidence.

## Phone and computer

The best practice is on a computer, using a free Linux virtual machine or a browser lab. With only a phone, try Cisco Networking Academy's free Linux Unhatched course, which has a terminal in the browser, or play the OverTheWire Bandit wargame, which is a legal training game designed for learners, using a free SSH app. Sessions are text only, so they use very little data.`,
      practice_task_md: `**Goal:** search a log for signs of password guessing.

1. Open Linux Unhatched in a browser, a Linux virtual machine, or the first levels of OverTheWire Bandit (a legal practice game).
2. Practise \`pwd\`, \`ls -l\`, \`cd\` and \`less\` until they feel natural.
3. Create a practice file: \`echo "Failed password for admin from 198.51.100.7" > test.log\`, then add two more lines with different words.
4. Use \`grep\` to find the failed lines and \`wc -l\` to count them.
5. Run \`ls -l test.log\` and explain each part of the permissions in your journal.

**Done looks like:** a screenshot or copied output of your grep and count, plus a short explanation of the permissions.`,
      quiz: {
        questions: [
          {
            prompt: "On Ubuntu and Debian systems, which file records login activity?",
            options: ["/var/log/auth.log", "/home/music.txt", "/etc/wallpaper", "/bin/games"],
            answer_index: 0,
            explanation: "Login activity on Ubuntu and Debian is recorded in /var/log/auth.log.",
          },
          {
            prompt: "What does the grep command do?",
            options: [
              "Deletes a file",
              "Searches for lines that contain a pattern",
              "Changes your password",
              "Restarts the server",
            ],
            answer_index: 1,
            explanation: "grep searches text and shows matching lines, which is ideal for logs.",
          },
          {
            prompt: "Which command shows the last 20 lines of a log?",
            options: ["pwd", "tail -n 20 file", "cd file", "ls -l"],
            answer_index: 1,
            explanation: "tail with -n 20 shows the last 20 lines of a file.",
          },
          {
            prompt: "Why is a customer records file readable by everyone a problem?",
            options: [
              "It makes the server slower",
              "It is a confidentiality risk even before anyone opens it",
              "It stops backups from working",
              "It deletes the file after a day",
            ],
            answer_index: 1,
            explanation: "Loose permissions expose private data, which is a confidentiality issue.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "ghana-threats": {
      explanation_md: `## Why this matters

Ask anyone in Tamale, Wa or Accra about cybercrime and they will tell you a story about a phone call, a fake mobile money message or a friend's hacked WhatsApp. These everyday attacks cost families and businesses real money, and they are exactly what Ghanaian banks, telcos and fintechs hire security staff to fight. An analyst who understands local scams is valuable from day one.

## People first, code second

Most attacks you will meet in Ghana do not start with clever hacking. They start with **persuasion**: a caller pretending to be from a telco, a message pretending to be from a WhatsApp group admin, a link pretending to be a bank page. The attacker's goal is to get a PIN, a password or a one time code, or to make someone run a harmful file.

The Bank of Ghana's public notice on digital fraud (October 2026) is clear: no legitimate bank, mobile money operator or payment provider will ask for your PIN, password or one time code by phone, text, email or social media. Ghana's Cyber Security Authority has warned about WhatsApp account takeovers where scammers pose as trusted contacts or group admins to get verification codes, then use the account to scam the victim's contacts.

## What this section covers

* **Mobile money fraud and SIM swap:** how fraudsters target wallets and phone numbers.
* **Phishing and social engineering:** how fake messages and calls work, and how to break them down.
* **Malware and ransomware:** harmful software, how it arrives and what defences help.

## How analysts use this knowledge

At work you will see these threats from the other side. A fintech analyst might spot many accounts logging in from one new device. A telco analyst might see a burst of SIM replacement requests. A bank analyst might review a phishing email that reached staff. In every case, knowing the scam's pattern helps you spot it faster and explain it to others.

## Where to report

Ghana's Cyber Security Authority runs incident reporting channels listed on its website: call or text 292, WhatsApp 0501603111, or email report@csa.gov.gh. For a wallet or bank account, the victim should also contact their mobile money provider or bank immediately using the official numbers.

## A small example

Wumpini's aunt in Savelugu receives a call from "customer care" saying her mobile money account will be blocked unless she confirms a code just sent to her phone. Wumpini remembers the rule: no genuine provider asks for that code. She tells her aunt to hang up, checks the balance using the official menu, and helps her report the number. Knowing one rule protected a whole savings balance.`,
      practice_task_md: `**Goal:** collect and analyse local scam examples safely.

1. Ask three friends or family members about a scam message or call they received. Do not ask for PINs, codes or account numbers.
2. For each, write in your journal: how it arrived (call, SMS, WhatsApp, social media), who the scammer pretended to be, what they wanted, and the warning sign.
3. Write the official reporting channels from this lesson at the top of the page.
4. Write one sentence of advice you would give each person.

**Done looks like:** three anonymised scam summaries with warning signs and advice. Remove names and numbers before sharing with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "According to the Bank of Ghana notice in the lesson, which request should you never receive from a legitimate bank or mobile money operator?",
            options: [
              "A reminder that a branch is closed on a holiday",
              "A request for your PIN or one time code by phone or text",
              "A transaction alert after you send money",
              "An invitation to visit a branch",
            ],
            answer_index: 1,
            explanation: "The notice says no legitimate provider will ask for your PIN, password or one time code by phone, text, email or social media.",
          },
          {
            prompt: "How do most attacks people face in Ghana begin?",
            options: [
              "With advanced code written by experts",
              "With persuasion through calls, messages or fake links",
              "With physical break ins at telco offices",
              "With satellite interference",
            ],
            answer_index: 1,
            explanation: "Most everyday attacks start by persuading someone to share a code or open something harmful.",
          },
          {
            prompt: "Which is one of the CSA reporting channels listed in the lesson?",
            options: ["Call or text 292", "Call 911", "Email help@bank.example", "Text STOP to any number"],
            answer_index: 0,
            explanation: "The CSA lists call or text 292, WhatsApp 0501603111 and report@csa.gov.gh.",
          },
          {
            prompt: "What did Wumpini do after telling her aunt to hang up?",
            options: [
              "Called the scammer back to argue",
              "Shared the code to see what would happen",
              "Checked the balance using the official menu and helped report the number",
              "Deleted the mobile money app",
            ],
            answer_index: 2,
            explanation: "She checked the real balance through the official menu and reported the number.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "momo-fraud-sim-swap": {
      explanation_md: `## Why this matters

Mobile money is how millions of Ghanaians save, trade and send money home. That makes wallets and phone numbers prime targets. Telcos, banks and fintechs hire analysts and fraud monitoring staff who understand these schemes, and customer facing staff need to explain them clearly.

## Common mobile money tricks

* **Fake customer care calls:** the caller claims your account has a problem and asks you to "confirm" a PIN or a code sent to your phone. The code is really the key to your wallet or account.
* **"Wrong transfer" messages:** you receive an SMS that looks like a deposit alert, then a call begging you to send the money back. No real money arrived; the message was fake. Always check your balance through the official menu, never by trusting a message.
* **Fake promotions and investments:** "You have won a prize, pay a small fee to claim it" or "double your money in a week". The Bank of Ghana warns against double your money and online Ponzi schemes.
* **Account takeover through WhatsApp:** scammers take over a WhatsApp account, then message the victim's contacts asking for urgent loans by mobile money.

## SIM swap

Your phone number is often the key that receives one time codes. In a **SIM swap**, a fraudster gets a new SIM card issued for your number, by tricking or bribing someone or by using stolen identity details. Your phone suddenly loses signal, and the fraudster now receives your calls, texts and codes. They can then reset passwords and try to reach wallets and bank accounts.

Warning signs: your phone shows "no service" for a long time where it normally works, you get messages about a SIM change you did not request, or friends say they received strange messages from you. Act fast: contact your network provider and bank immediately using official channels.

## Defences you can explain

* Never share a PIN, password or one time code with anyone, including people claiming to be staff, friends or family.
* Set a mobile money PIN that is not your birthday or 1234, and cover the keypad when typing it.
* Turn on WhatsApp two step verification.
* Protect your Ghana Card details, which can be used to impersonate you.
* Watch transaction alerts and report anything you did not do.

## A small example

Mariama works in a fintech's fraud team in Accra. She notices several customers whose accounts were accessed from new devices shortly after their numbers had a SIM change. She flags the pattern to her lead, who adds an extra check for withdrawals soon after a SIM change. Spotting the link between SIM changes and account access protected customers she will never meet.`,
      practice_task_md: `**Goal:** make a one page mobile money safety guide.

1. Using only this lesson, write a short guide titled "Keep your MoMo safe" in plain English, or in Dagbani, Twi, Gonja or another language you speak.
2. Include four common tricks, the SIM swap warning signs and five defences.
3. Add what to do if something goes wrong: contact your provider or bank through official numbers, and report to the CSA (call or text 292, WhatsApp 0501603111).
4. Keep it short enough to read on one phone screen, and do not include any real phone numbers other than official ones.

**Done looks like:** a one page guide you can share in a family or church WhatsApp group, saved in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "You get an SMS that looks like a deposit alert, then a call asking you to send the money back. What should you do first?",
            options: [
              "Send the money back quickly to be kind",
              "Check your real balance through the official menu",
              "Share your PIN so they can reverse it",
              "Forward the SMS to all your contacts",
            ],
            answer_index: 1,
            explanation: "The deposit message may be fake, so check the real balance through the official menu, never the message.",
          },
          {
            prompt: "What happens in a SIM swap?",
            options: [
              "Your phone battery is replaced",
              "A fraudster gets a new SIM issued for your number and receives your calls, texts and codes",
              "Your network provider upgrades you to faster data",
              "Your phone's apps are moved to a memory card",
            ],
            answer_index: 1,
            explanation: "SIM swap moves your number to a SIM the fraudster controls.",
          },
          {
            prompt: "Which is a warning sign of a SIM swap?",
            options: [
              "Your phone shows no service for a long time where it normally works",
              "Your phone receives a normal software update",
              "Your data bundle runs out at the end of the month",
              "Your phone charges slowly",
            ],
            answer_index: 0,
            explanation: "Losing service unexpectedly can mean your number has moved to another SIM.",
          },
          {
            prompt: "Why is a one time code sent to your phone so valuable to a fraudster?",
            options: [
              "It can be sold as airtime",
              "It is often the key that confirms access to a wallet or account",
              "It unlocks free data",
              "It changes your phone's language",
            ],
            answer_index: 1,
            explanation: "Codes confirm logins and transactions, which is why they must never be shared.",
          },
          {
            prompt: "In the example, what pattern did Mariama notice?",
            options: [
              "Customers logging in on public holidays",
              "Accounts accessed from new devices shortly after a SIM change",
              "Customers changing their profile photos",
              "Large deposits at month end",
            ],
            answer_index: 1,
            explanation: "She linked SIM changes to account access from new devices, a sign of SIM swap fraud.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "phishing-social-engineering": {
      explanation_md: `## Why this matters

Phishing and social engineering are among the most common ways attackers get into organisations and personal accounts. Security teams in Ghanaian banks, telcos and fintechs review suspicious emails reported by staff every day, and adverts for analyst roles mention phishing analysis. Being able to break down a suspicious message clearly is a core, practical skill.

## What social engineering is

Social engineering means manipulating people into doing something that helps the attacker: sharing a code, clicking a link, opening a file or sending money. **Phishing** is social engineering by message: email, SMS (sometimes called smishing), WhatsApp or social media. Phone based tricks are sometimes called vishing.

Attackers use the same levers again and again:

* **Urgency:** "Your account will be blocked in 30 minutes."
* **Authority:** pretending to be a bank, a telco, a boss or a government office.
* **Fear or greed:** a fine, a prize, a job offer, a loan.
* **Trust:** using a friend's hacked account or a familiar group name.

## How to break down a suspicious message

Check these, in order:

1. **Sender:** does the address or number really belong to the organisation? Look closely: \`support@mybank-gh.example\` is not the same as the bank's real domain.
2. **Links:** on a computer, hover over a link to see where it really goes; on a phone, press and hold to preview the address without opening it. Look for misspellings and odd endings.
3. **Request:** is it asking for a PIN, password, code, payment or a file to open? Legitimate organisations do not ask for PINs or codes.
4. **Pressure:** is it rushing you? Urgency is a warning sign.
5. **Verify another way:** call the organisation on the number from its official website or your card, not the number in the message.

## A small example

Fuseini, a junior analyst at a telco, receives a staff report about an email titled "Payroll update: confirm your bank details today". The sender's address uses a domain one letter different from the company's. The link points to an unfamiliar website with a login page copied from the company's portal. Fuseini records the sender, subject, link and time, checks whether other staff received it, asks the email team to block the domain, and sends a short warning to staff with a screenshot marked "Do not click". He handled it calmly, with evidence, and protected everyone else.

## Your role as a defender

Never click suspicious links "to see what happens". On real systems, analysts examine links using safe, approved tools and processes. Your job as a beginner is to recognise the signs, record the details and report.`,
      practice_task_md: `**Goal:** analyse three suspicious messages like an analyst.

1. Find three suspicious messages in your own SMS, email spam folder or WhatsApp (or write three realistic invented ones). Do not click any links.
2. For each, fill a table with: channel, claimed sender, real sender details, link address (from the long press preview only), what it asks for, pressure used, verdict.
3. Write a two sentence warning you would send to colleagues for the most dangerous one.
4. Blur or remove any personal numbers in screenshots.

**Done looks like:** a three row analysis table plus one staff warning, saved in your portfolio as "Phishing analysis".`,
      quiz: {
        questions: [
          {
            prompt: "\"Your account will be blocked in 30 minutes\" is an example of which lever?",
            options: ["Urgency", "Trust", "Greed", "Encryption"],
            answer_index: 0,
            explanation: "Creating time pressure is the urgency lever.",
          },
          {
            prompt: "How can you check where a link goes on a phone without opening it?",
            options: [
              "Tap it quickly twice",
              "Press and hold it to preview the address",
              "Forward it to a friend first",
              "Turn off mobile data and tap it",
            ],
            answer_index: 1,
            explanation: "A long press previews the address without opening the page.",
          },
          {
            prompt: "What is the safest way to verify a message claiming to be from your bank?",
            options: [
              "Reply to the message and ask",
              "Call the number given in the message",
              "Call the bank on the number from its official website or your card",
              "Click the link and see if the page looks real",
            ],
            answer_index: 2,
            explanation: "Use a contact you already trust, never details from the suspicious message.",
          },
          {
            prompt: "What is smishing?",
            options: ["Phishing by SMS", "A type of firewall", "A strong password method", "A backup technique"],
            answer_index: 0,
            explanation: "Smishing is phishing delivered by text message.",
          },
          {
            prompt: "What did Fuseini do with the payroll email?",
            options: [
              "Clicked the link to test the login page",
              "Ignored it because only one person reported it",
              "Recorded the details, checked who else received it, had the domain blocked and warned staff",
              "Replied to the sender asking who they were",
            ],
            answer_index: 2,
            explanation: "He gathered evidence, limited the spread and warned staff without clicking anything.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "malware-ransomware": {
      explanation_md: `## Why this matters

Malware infects office computers, phones and servers across Ghana, often through files shared in messages or pirated software. Analyst adverts ask for malware awareness and response. Ransomware is especially damaging because it can stop a hospital, school or business from working at all.

## What malware is

Malware is any software built to harm, spy or steal. Common types:

* **Virus and worm:** spread from file to file or computer to computer. Worms spread by themselves across networks.
* **Trojan:** pretends to be something useful, like a free game, a "cracked" program or a fake app, but hides a harmful part.
* **Spyware and info stealers:** quietly collect passwords, banking details and codes. Ghana's Cyber Security Authority has warned about harmful files shared through WhatsApp that try to steal banking logins and codes.
* **Ransomware:** encrypts files so they cannot be opened, then demands payment for a key. Some groups also steal data first and threaten to publish it.

## How it usually arrives

* Opening an attachment or ZIP file from a message or email.
* Installing pirated software or apps from outside official stores.
* Plugging in an infected flash drive, which is common in shared business centres.
* Missing updates that leave known weaknesses open.

## Defences that actually help

* **Updates:** install system and app updates promptly.
* **Antivirus:** keep built in protection such as Microsoft Defender switched on and updated.
* **Least privilege:** staff use standard accounts, not administrator accounts.
* **Backups:** keep regular copies of important files, with at least one copy offline or disconnected, and test that you can restore them. Backups are the strongest answer to ransomware.
* **Caution with files:** only install from official sources, and treat unexpected attachments with suspicion.

Authorities such as the US Cybersecurity and Infrastructure Security Agency (CISA) discourage paying ransoms, because payment does not guarantee recovery and funds further crime.

## A small example

Issahaku supports a printing business in Yendi. One morning, every file on the shared computer has a strange new ending and a note demands payment. He unplugs the computer from the network to stop it spreading, photographs the note, and tells the owner not to pay yet. Luckily, he set up a weekly backup to an external drive that stays unplugged. After a clean reinstall, the business restores last week's files and loses only a few days of work. The backup turned a disaster into an inconvenience.

## Checking a suspicious file

You can check a file's reputation on VirusTotal, which compares it against many antivirus engines. Never upload confidential work files there, because uploads can be shared with security researchers. At work, follow your team's process.`,
      practice_task_md: `**Goal:** write a ransomware readiness checklist for a small business.

1. Pick a small business you know, such as a pharmacy, school office or business centre.
2. Write a checklist with at least eight items covering updates, antivirus, accounts, backups (including one offline copy and a restore test), flash drives and safe installs.
3. Add a short "first five minutes" plan: what to do if ransomware appears (disconnect, photograph the note, inform the owner, do not pay in a panic, contact support).
4. If the owner agrees, walk through the checklist with them and note which items are already done.

**Done looks like:** a one page checklist with a first five minutes plan, ready for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What does ransomware do?",
            options: [
              "Speeds up old computers",
              "Encrypts files and demands payment for a key",
              "Blocks all advertisements",
              "Backs up files to the cloud",
            ],
            answer_index: 1,
            explanation: "Ransomware locks files with encryption and demands payment.",
          },
          {
            prompt: "Which malware type pretends to be useful software but hides a harmful part?",
            options: ["Trojan", "Worm", "Firewall", "Patch"],
            answer_index: 0,
            explanation: "A trojan disguises itself as something useful, like a cracked program.",
          },
          {
            prompt: "Which defence is described as the strongest answer to ransomware?",
            options: [
              "A faster internet connection",
              "Regular backups with an offline copy that you test",
              "A new screen saver",
              "Paying quickly",
            ],
            answer_index: 1,
            explanation: "Tested backups, including an offline copy, let you restore without paying.",
          },
          {
            prompt: "What was Issahaku's first action when he found the ransom note?",
            options: [
              "Paid the ransom",
              "Unplugged the computer from the network",
              "Restarted the computer repeatedly",
              "Emailed the attackers",
            ],
            answer_index: 1,
            explanation: "Disconnecting stops the malware from spreading to other machines.",
          },
          {
            prompt: "Why should you avoid uploading confidential work files to VirusTotal?",
            options: [
              "VirusTotal deletes files",
              "Uploads can be shared with security researchers",
              "It only accepts photos",
              "It costs money per upload",
            ],
            answer_index: 1,
            explanation: "Uploaded files can be shared with researchers, so confidential files must not be uploaded.",
          },
        ],
        pass_threshold: 80,
      },
    },
    protect: {
      explanation_md: `## Why this matters

Detecting attacks is important, but it is far cheaper to stop them in the first place. Ghanaian employers, especially banks and fintechs that follow regulator directives, expect security staff to help set up and check protective controls: who can log in, what they can reach, how data is protected and whether staff can recognise scams.

## Prevention in three layers

Think of protection in three layers that support each other:

* **Identity and access:** making sure only the right people get in, and that each person can reach only what their job needs. Strong passwords, multi factor authentication and least privilege live here.
* **Data protection:** keeping information private and unchanged, even if a device is stolen or traffic is intercepted. Encryption, hashing, backups and careful handling of personal data live here.
* **People:** helping staff and customers recognise scams and know how to report them. Security awareness lives here.

No single layer is enough. A strong password does not help if a staff member reads out a one time code to a scammer. Encryption does not help if everyone shares one administrator account. Layers working together are sometimes called **defence in depth**.

## Where the analyst fits

As a junior analyst you will rarely design these controls alone, but you will often:

* Check that new staff get the right access and that leavers lose it promptly.
* Spot accounts without multi factor authentication.
* Confirm that laptops are encrypted and backups are running.
* Help deliver short awareness sessions and answer "is this message real?" questions.

These tasks build trust with colleagues, and trust is what makes people report problems early.

## A small example

Amina joins the IT team of a savings and loans company in Tamale. In her first month she makes a simple table of every system and who can access it. She finds that three former staff still have active accounts, the shared "Finance" login has no second factor, and two laptops that travel to field offices are not encrypted. She raises all three with her manager, with a suggested fix for each. None of this needed advanced skills, just patience and a clear list, and it closed three real gaps.

## What comes next

The three topics in this section go deeper into each layer: identity and access management, encryption and protecting data, and security awareness for staff and communities. All three can be learned on a phone, and most practice tasks use free tools you already have.`,
      practice_task_md: `**Goal:** audit your own digital protection in three layers.

1. **Identity:** list your five most important accounts (email, mobile money, WhatsApp, social media, banking). Note which have a strong unique password and which have a second factor turned on.
2. **Data:** check whether your phone has a screen lock and whether its storage is encrypted (most modern Android phones and iPhones encrypt when a screen lock is set). Check when you last backed up your photos and contacts.
3. **People:** write down who in your family would most likely fall for a scam call, and one thing you could teach them.
4. Fix at least two gaps you found.

**Done looks like:** a three part checklist with at least two items fixed. Do not write passwords in your journal.`,
      quiz: {
        questions: [
          {
            prompt: "What does defence in depth mean?",
            options: [
              "Buying the most expensive security product",
              "Using several layers of protection that support each other",
              "Hiding the server room underground",
              "Turning off the internet at night",
            ],
            answer_index: 1,
            explanation: "Defence in depth means layers working together, because no single layer is enough.",
          },
          {
            prompt: "Which layer do strong passwords and multi factor authentication belong to?",
            options: ["Identity and access", "Data protection", "People", "Backups"],
            answer_index: 0,
            explanation: "They control who gets in, which is identity and access.",
          },
          {
            prompt: "Which task is typical for a junior analyst in this area?",
            options: [
              "Writing new encryption algorithms",
              "Checking that leavers lose their access promptly",
              "Approving the company budget",
              "Choosing the company's bank",
            ],
            answer_index: 1,
            explanation: "Juniors often check access changes, missing second factors, encryption and backups.",
          },
          {
            prompt: "Which gap did Amina NOT find in her review?",
            options: [
              "Former staff with active accounts",
              "A shared login without a second factor",
              "Unencrypted laptops used in the field",
              "A server with no electricity",
            ],
            answer_index: 3,
            explanation: "She found old accounts, a shared login without a second factor and unencrypted laptops.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "identity-access": {
      explanation_md: `## Why this matters

Stolen or weak passwords are behind many break ins, and Ghana's SIM swap and WhatsApp takeover scams are attacks on identity. Security adverts list identity management, access controls and multi factor authentication. Getting access right is one of the most useful things an organisation can do.

## Two words to keep separate

* **Authentication** answers "are you really who you say you are?" A password, a code or a fingerprint.
* **Authorisation** answers "what are you allowed to do?" A cashier can view accounts; only a manager can approve large reversals.

## Passwords that hold up

Long beats clever. A **passphrase** of several random words, such as \`yam-river-lantern-kola\` (an example, never use it), is easier to remember and harder to guess than \`P@ssw0rd1\`. Every important account needs its own password, because criminals try leaked passwords on many sites. A **password manager** stores them safely so you only remember one strong master passphrase. Have I Been Pwned lets you check whether your email address appeared in known data leaks.

## Multi factor authentication

MFA asks for two or more kinds of proof:

* something you **know** (password or PIN),
* something you **have** (phone, security key),
* something you **are** (fingerprint, face).

MFA stops many attacks even when a password leaks. Not all second factors are equal: codes by SMS can be stolen through SIM swap, so an authenticator app, a passkey or a security key is stronger where available. Any MFA is still better than none.

## Least privilege and the account lifecycle

**Least privilege** means each person gets only the access their job needs, for as long as they need it. Organisations manage this through the account lifecycle:

* **Joiners:** new staff get access matching their role.
* **Movers:** when someone changes role, old access is removed, not just new access added.
* **Leavers:** accounts are disabled on the last day.

Regular **access reviews** ask managers to confirm who should still have access to each system.

## A small example

Abdul-Rahman is doing national service in a bank's IT security unit in Accra. His task is to compare the list of staff who left last quarter with active accounts on the loans system. He finds two leavers whose accounts are still active, one of them used after the person's exit date. He reports it immediately. The accounts are disabled and the login is investigated. A simple comparison of two lists exposed a real risk.`,
      practice_task_md: `**Goal:** strengthen your own identity security and run a mini access review.

1. Check your main email address on Have I Been Pwned. Note which leaks it appears in (if any) and change any reused passwords.
2. Turn on two step verification for your email and WhatsApp. Use an authenticator app where offered.
3. In a spreadsheet, create an invented access list for a small clinic: 6 staff, 3 systems (patient records, payments, email), and who has access to what. Include one leaver and one person with more access than their role needs.
4. Mark each problem and write the fix.

**Done looks like:** two accounts secured, plus a small access review sheet with problems highlighted and fixes written. Never store real passwords in the sheet.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between authentication and authorisation?",
            options: [
              "They mean the same thing",
              "Authentication checks who you are; authorisation decides what you may do",
              "Authorisation checks who you are; authentication decides what you may do",
              "Authentication is only for websites",
            ],
            answer_index: 1,
            explanation: "Authentication proves identity; authorisation sets permissions.",
          },
          {
            prompt: "Why is an authenticator app usually stronger than SMS codes?",
            options: [
              "Apps work without a phone",
              "SMS codes can be stolen through SIM swap",
              "SMS codes are longer",
              "Apps never need updating",
            ],
            answer_index: 1,
            explanation: "SIM swap lets a fraudster receive your texts, including codes.",
          },
          {
            prompt: "A fingerprint is which kind of factor?",
            options: ["Something you know", "Something you have", "Something you are", "Something you share"],
            answer_index: 2,
            explanation: "Biometrics like fingerprints are something you are.",
          },
          {
            prompt: "When a staff member changes role, what should happen under least privilege?",
            options: [
              "Add the new access and keep the old",
              "Remove access that the new role does not need",
              "Give them administrator rights",
              "Delete all their files",
            ],
            answer_index: 1,
            explanation: "Movers should lose old access, not just gain new access.",
          },
          {
            prompt: "How did Abdul-Rahman find the risky accounts?",
            options: [
              "By guessing staff passwords",
              "By comparing the leavers list with active accounts",
              "By reading staff WhatsApp messages",
              "By installing hacking tools",
            ],
            answer_index: 1,
            explanation: "Comparing two lists showed leavers who still had active accounts.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "encryption-data-protection": {
      explanation_md: `## Why this matters

Banks, hospitals, telcos and NGOs in Ghana hold personal data about millions of people. Laws and regulators expect it to be protected, and adverts for security roles mention data protection controls and encryption. You need to know what encryption does, what it does not do and how to handle personal data responsibly.

## Encryption in plain words

**Encryption** scrambles data so only someone with the right key can read it.

* **Symmetric encryption** uses one shared key to lock and unlock. It is fast and used for files and disks.
* **Asymmetric encryption** uses a key pair: a public key anyone can use to lock, and a private key only the owner holds to unlock. It helps strangers set up secure connections.

You already use both every day. The padlock in your browser means **HTTPS**, which uses these methods to protect data travelling between your phone and a website. WhatsApp uses end to end encryption for messages. Phone and laptop **disk encryption** protects stored data if the device is lost.

Encryption protects **confidentiality**. It does not stop someone who already has the password, and it does not help if the key is written on a sticky note.

## Hashing is different

A **hash** turns any data into a fixed length fingerprint. The same input always gives the same hash, but you cannot turn the hash back into the data. Changing one letter changes the hash completely. This makes hashes useful for:

* **Integrity:** checking a downloaded file matches the publisher's published hash.
* **Passwords:** well built systems store password hashes, not the passwords themselves.

## Handling personal data in Ghana

Ghana's **Data Protection Act, 2012 (Act 843)** sets rules for processing personal data, and organisations that process personal data must register with the **Data Protection Commission**. For an analyst, good habits include:

* Collect and view only the data your task needs.
* Never copy customer data to personal phones, flash drives or WhatsApp.
* Share files through approved, access controlled systems.
* Report any accidental exposure immediately.

## A small example

Hawa works for an NGO in Bolgatanga that runs a health survey. A field officer's tablet with survey responses is stolen at a lorry station. Because Hawa had turned on device encryption and a screen lock on every tablet, the thief cannot read the data. She still reports the loss to her manager, records which data was on the device, and confirms the latest responses were already synced to the NGO's secure server. Encryption turned a potential data breach into the loss of a device.`,
      practice_task_md: `**Goal:** see encryption and hashing in action and check your own devices.

1. On your phone, open a website and tap the padlock to view its certificate details. Note who issued it.
2. Use a free online SHA 256 text hashing tool (with harmless text only). Hash the word \`Tamale\`, then \`tamale\`. Note how different the results are.
3. Check that your phone has a screen lock, and on a laptop check whether BitLocker, device encryption or FileVault is on.
4. Write five personal data handling rules for a small NGO in your journal.

**Done looks like:** a short note with the certificate issuer, the two different hashes, your device encryption status and five handling rules. Never hash or paste real passwords into online tools.`,
      quiz: {
        questions: [
          {
            prompt: "What does encryption protect most directly?",
            options: ["Availability", "Confidentiality", "Battery life", "Network speed"],
            answer_index: 1,
            explanation: "Encryption keeps data private so only key holders can read it.",
          },
          {
            prompt: "How is asymmetric encryption different from symmetric encryption?",
            options: [
              "It uses a public and private key pair instead of one shared key",
              "It uses no keys at all",
              "It only works offline",
              "It is used only for passwords",
            ],
            answer_index: 0,
            explanation: "Asymmetric encryption uses a key pair; symmetric uses one shared key.",
          },
          {
            prompt: "Which statement about a hash is true?",
            options: [
              "You can turn a hash back into the original data",
              "Changing one letter of the input changes the hash completely",
              "A hash is the same as a password",
              "Hashes are only used for videos",
            ],
            answer_index: 1,
            explanation: "Small input changes produce completely different hashes, which helps check integrity.",
          },
          {
            prompt: "Under Ghana's Data Protection Act, 2012 (Act 843), what must organisations that process personal data do?",
            options: [
              "Publish all data online",
              "Register with the Data Protection Commission",
              "Delete data every week",
              "Store data only on paper",
            ],
            answer_index: 1,
            explanation: "Organisations that process personal data must register with the Data Protection Commission.",
          },
          {
            prompt: "Why could the thief not read the stolen tablet's survey data?",
            options: [
              "The tablet was switched off",
              "Device encryption and a screen lock were turned on",
              "The data was in a foreign language",
              "The battery was removed",
            ],
            answer_index: 1,
            explanation: "Hawa had enabled encryption and a screen lock on every tablet.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "security-awareness": {
      explanation_md: `## Why this matters

Because so many attacks in Ghana start with persuasion, people are both the most targeted part of any organisation and its best sensors. Security teams in banks, telcos and fintechs run awareness programmes, and adverts mention promoting cyber resilience and security awareness. Junior staff often help deliver them, so being able to teach simply and respectfully is a real job skill.

## What good awareness looks like

Awareness is not a long lecture once a year. It works best when it is:

* **Short and regular:** ten minutes on one topic beats two hours on everything.
* **Local and real:** use scams people actually see, such as fake customer care calls, wrong transfer messages and WhatsApp takeovers.
* **Practical:** end every session with one clear action, such as "turn on WhatsApp two step verification today".
* **Respectful:** never shame people who fell for a scam. Shame makes people hide mistakes, and hidden mistakes are dangerous.
* **In the right language:** a session in Dagbani, Twi, Hausa or another local language may reach people that English slides do not.

## The most important message: report early

The single habit you most want is **"if in doubt, report it"**. A staff member who reports a suspicious email within minutes, even after clicking, gives the security team a chance to act. Make reporting easy: one email address, one phone number or one button, and thank people every time.

## Measuring whether it works

Count behaviours, not attendance. Useful signs include more staff reporting suspicious messages, faster reports, and more accounts with two step verification turned on. Some organisations run **simulated phishing** exercises, sending safe test messages to staff. These must always be approved by management, planned carefully and followed by friendly learning, never punishment.

## A small example

Sumaila volunteers to help his church in Wa after several members lost money to fake "pastor needs urgent help" messages from hacked WhatsApp accounts. He prepares a ten minute talk in Dagbani and English with three points: never send money because of a message alone, call the person on their usual number to confirm, and turn on two step verification. He demonstrates the setting on his own phone, then helps people turn it on after the service. A month later, a member calls the pastor to check a suspicious request and saves the money. That is awareness working.

## Your portfolio

An awareness session you have actually delivered, with your slides or notes and a short reflection, is a strong portfolio piece. It shows employers you can communicate, not only analyse.`,
      practice_task_md: `**Goal:** prepare and deliver a ten minute awareness talk.

1. Choose one threat from this track, such as WhatsApp takeovers or fake customer care calls.
2. Write a plan with: the threat in plain words, one real looking (invented) example, three warning signs, and one action for the audience to take that day.
3. Deliver it to a small group: family, friends, a youth group or a church or mosque group, with their agreement. Use a local language if it helps.
4. Afterwards, write what went well, one question people asked and how many people completed the action.

**Done looks like:** a one page talk plan and a short reflection in your portfolio. Do not collect anyone's personal details.`,
      quiz: {
        questions: [
          {
            prompt: "Which approach to awareness training does the lesson recommend?",
            options: [
              "One long lecture a year",
              "Short, regular, local sessions ending with one clear action",
              "Sending staff a long policy document",
              "Punishing people who fall for scams",
            ],
            answer_index: 1,
            explanation: "Short, regular, practical sessions using real local scams work best.",
          },
          {
            prompt: "Why should you never shame someone who fell for a scam?",
            options: [
              "Shame makes people hide mistakes, which is dangerous",
              "It wastes time in the session",
              "Scams are not important",
              "It is only a problem in large companies",
            ],
            answer_index: 0,
            explanation: "Hidden mistakes stop the security team from acting quickly.",
          },
          {
            prompt: "Which is a good sign that an awareness programme is working?",
            options: [
              "More staff report suspicious messages, and faster",
              "More people attend but reports stay the same",
              "The slides get longer",
              "Fewer people ask questions",
            ],
            answer_index: 0,
            explanation: "Behaviour such as faster, more frequent reporting shows real change.",
          },
          {
            prompt: "What must always happen before a simulated phishing exercise?",
            options: [
              "It must be approved by management and planned carefully",
              "Staff must be told the exact date and time",
              "It must use real customer data",
              "It must be run by an outside hacker",
            ],
            answer_index: 0,
            explanation: "Simulations need management approval, careful planning and friendly follow up.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
