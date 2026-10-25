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
  },
};

export default content;
