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

You can learn all the ideas in this section on a phone or a computer. Later sections include labs that need a computer; when they do, the lesson will say so and offer the best phone alternative.`,
      practice_task_md: `**Goal:** start your security learning journal.

1. Create a free Google Doc or a notes file on your phone or computer called "Security journal".
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
              "A university degree in mathematics",
              "IT support skills such as computers, accounts and networks",
              "Experience running a hacking team",
            ],
            answer_index: 2,
            explanation: "Security builds on IT support knowledge of how computers, accounts and networks work.",
          },
          {
            prompt: "Which task is a normal part of a junior analyst's day?",
            options: [
              "Reviewing alerts and deciding which ones are real",
              "Breaking into competitors' systems to test them",
              "Writing viruses for practice",
              "Guessing staff passwords to check they are strong",
            ],
            answer_index: 0,
            explanation: "Junior analysts spend much of their time checking alerts and recording what they find.",
          },
          {
            prompt: "In Ghana, what is the legal position on accessing a computer or data without permission?",
            options: [
              "It is allowed if you do not steal anything",
              "It is allowed for students",
              "It is allowed if you report it afterwards",
              "It is a crime",
            ],
            answer_index: 3,
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
            options: [
              "Confidentiality",
              "Integrity",
              "Availability",
              "None, because nothing was leaked",
            ],
            answer_index: 1,
            explanation: "Integrity means data has not been changed without permission.",
          },
          {
            prompt: "Ransomware locks a shop's sales files so staff cannot open them. Which part of the triad is hit most directly?",
            options: [
              "Integrity",
              "Confidentiality",
              "Authentication",
              "Availability",
            ],
            answer_index: 3,
            explanation: "Availability means systems and data are there when people need them.",
          },
          {
            prompt: "Which of these is a vulnerability rather than a threat?",
            options: [
              "A missing software update",
              "A fraudster",
              "A flood",
              "A computer virus",
            ],
            answer_index: 0,
            explanation: "A vulnerability is a weakness, such as a missing update, that a threat could use.",
          },
          {
            prompt: "Using the lesson's method, what is the risk score for likelihood 3 and impact 3?",
            options: [
              "3",
              "6",
              "9",
              "1",
            ],
            answer_index: 2,
            explanation: "Likelihood is multiplied by impact, so 3 times 3 gives 9, the most urgent score.",
          },
          {
            prompt: "Why did Fuseini fix the shared password and missing backup first?",
            options: [
              "They were the cheapest to fix",
              "The owner asked for them by name",
              "They only affected confidentiality",
              "They had the highest risk scores",
            ],
            answer_index: 3,
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
              "Practising on a training platform built for learners",
              "Intentionally accessing an electronic record without authority or permission",
              "Reporting a suspicious message to your supervisor",
            ],
            answer_index: 2,
            explanation: "Section 124 of Act 772 makes access or interception without authority or permission an offence.",
          },
          {
            prompt: "What must you have before testing the security of a real system?",
            options: [
              "A good reason",
              "Written permission from someone with authority to give it",
              "A friend who works there",
              "A certificate from an online course",
            ],
            answer_index: 1,
            explanation: "Professionals test only with written permission stating what may be tested and when.",
          },
          {
            prompt: "Where should you practise security skills?",
            options: [
              "On training labs and your own learning machines",
              "On a café's public Wi Fi",
              "On your school's network after hours",
              "On a neighbour's network with their router password",
            ],
            answer_index: 0,
            explanation: "Practise only in labs built for learning or on systems you own.",
          },
          {
            prompt: "Why did Sumaila refuse to run the \"free tool\"?",
            options: [
              "It was too slow",
              "He had already used a better tool",
              "Using it on others would be unauthorised access and it might carry malware",
              "His phone did not support it",
            ],
            answer_index: 2,
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
              "How could this be misused, and how would I notice?",
              "How do I make it faster?",
              "How much did this cost?",
              "Who installed this?",
            ],
            answer_index: 0,
            explanation: "Security adds thinking about misuse and detection to normal IT knowledge.",
          },
          {
            prompt: "Why do defenders need to know Linux?",
            options: [
              "Because most phones in Ghana run desktop Linux",
              "Because Windows has no logs",
              "Because Linux cannot be attacked",
              "Because many servers and security tools run on it and its logs are read from the command line",
            ],
            answer_index: 3,
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
08:14 ALLOW 192.168.1.20 -> 192.0.2.80:443 TCP
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
   * \`09:03 ALLOW 192.168.1.30 -> 192.0.2.80:443 TCP\`
   * \`23:47 BLOCK 198.51.100.7 -> 192.168.1.10:22 TCP\` (repeated 40 times)
2. For each line, write the source, destination, port, the service the port usually means, and whether it looks normal.
3. Write a two sentence note to a supervisor about anything suspicious.
4. Optional, with a computer: install Cisco Packet Tracer or Wireshark and look at traffic on your own home network only.

**Done looks like:** a short table explaining each record and a clear two sentence note.`,
      quiz: {
        questions: [
          {
            prompt: "Which port is normally used for secure websites (HTTPS)?",
            options: [
              "22",
              "53",
              "3389",
              "443",
            ],
            answer_index: 3,
            explanation: "Port 443 carries HTTPS, the secure web traffic most sites use.",
          },
          {
            prompt: "What does DNS do?",
            options: [
              "Turns names like example.com into IP addresses",
              "Encrypts every file on a computer",
              "Blocks all traffic from outside",
              "Stores passwords for websites",
            ],
            answer_index: 0,
            explanation: "DNS works like a phone book, translating names into addresses.",
          },
          {
            prompt: "Which of these is a private IP address used inside homes and offices?",
            options: [
              "8.8.8.8",
              "192.0.2.80",
              "192.168.1.20",
              "203.0.113.50",
            ],
            answer_index: 2,
            explanation: "Addresses beginning 192.168 are private, used inside local networks.",
          },
          {
            prompt: "Repeated blocked attempts from an outside address to port 3389 at night most likely show what?",
            options: [
              "A staff member printing documents",
              "A normal software update",
              "A DNS lookup",
              "Someone probing for Windows Remote Desktop",
            ],
            answer_index: 3,
            explanation: "Port 3389 is Remote Desktop, and repeated outside attempts suggest probing.",
          },
          {
            prompt: "When is it acceptable to capture network traffic with a tool like Wireshark?",
            options: [
              "On any public Wi Fi",
              "On a neighbour's network if it is unprotected",
              "On your own network or a lab you are responsible for",
              "On a school network if nobody notices",
            ],
            answer_index: 2,
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
            options: [
              "4624",
              "4625",
              "4720",
              "1102",
            ],
            answer_index: 1,
            explanation: "Event ID 4625 records a failed logon attempt.",
          },
          {
            prompt: "Why is a cleared security log (Event ID 1102) a red flag?",
            options: [
              "Attackers often clear logs to hide their tracks",
              "It means the computer needs more storage",
              "It always means Windows Update ran",
              "It shows a successful backup",
            ],
            answer_index: 0,
            explanation: "Clearing the log removes evidence, which attackers try to do.",
          },
          {
            prompt: "Why should staff use standard accounts for daily work?",
            options: [
              "Standard accounts are faster",
              "Administrators cannot use email",
              "A malicious download cannot easily change the whole system",
              "Standard accounts do not need passwords",
            ],
            answer_index: 2,
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
              "The computer installed an update",
              "The security log was cleared",
              "A new user account was created that nobody requested",
            ],
            answer_index: 3,
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

On Ubuntu, login activity is usually recorded in **/var/log/auth.log**. Other Linux families use different names, such as /var/log/secure, and some newer systems keep logs only in the system journal, read with the \`journalctl\` command. Logs are long, so you search them:

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
            prompt: "On Ubuntu, which file usually records login activity?",
            options: [
              "/home/music.txt",
              "/var/log/auth.log",
              "/etc/wallpaper",
              "/bin/games",
            ],
            answer_index: 1,
            explanation: "On Ubuntu, login activity is usually recorded in /var/log/auth.log.",
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
            options: [
              "pwd",
              "cd file",
              "ls -l",
              "tail -n 20 file",
            ],
            answer_index: 3,
            explanation: "tail with -n 20 shows the last 20 lines of a file.",
          },
          {
            prompt: "Why is a customer records file readable by everyone a problem?",
            options: [
              "It is a confidentiality risk even before anyone opens it",
              "It makes the server slower",
              "It stops backups from working",
              "It deletes the file after a day",
            ],
            answer_index: 0,
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

Ghana's Cyber Security Authority (CSA) lists its current reporting channels, such as a short code for calls and texts, WhatsApp, email, an app and an online form, on its official report page at csa.gov.gh/report. Save the details from that page rather than from a forwarded message, because numbers can change and scammers share fake ones. For a wallet or bank account, the victim should also contact their mobile money provider or bank immediately using the official numbers.

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
              "A transaction alert after you send money",
              "A request for your PIN or one time code by phone or text",
              "An invitation to visit a branch",
            ],
            answer_index: 2,
            explanation: "The notice says no legitimate provider will ask for your PIN, password or one time code by phone, text, email or social media.",
          },
          {
            prompt: "How do most attacks people face in Ghana begin?",
            options: [
              "With advanced code written by experts",
              "With physical break ins at telco offices",
              "With satellite interference",
              "With persuasion through calls, messages or fake links",
            ],
            answer_index: 3,
            explanation: "Most everyday attacks start by persuading someone to share a code or open something harmful.",
          },
          {
            prompt: "Where should you get the CSA's current incident reporting channels?",
            options: [
              "From a number forwarded in a WhatsApp group",
              "From the caller who contacted the victim",
              "From the CSA's official report page at csa.gov.gh/report",
              "From any website that appears in a search",
            ],
            answer_index: 2,
            explanation: "The CSA lists its current channels on its official report page, and numbers from other places may be out of date or fake.",
          },
          {
            prompt: "What did Wumpini do after telling her aunt to hang up?",
            options: [
              "Called the scammer back to argue",
              "Checked the balance using the official menu and helped report the number",
              "Shared the code to see what would happen",
              "Deleted the mobile money app",
            ],
            answer_index: 1,
            explanation: "She checked the real balance through the official menu and reported the number.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "momo-fraud-sim-swap": {
      explanation_md: `## Why this matters

Mobile money is how many Ghanaians save, trade and send money home. That makes wallets and phone numbers prime targets. Telcos, banks and fintechs hire analysts and fraud monitoring staff who understand these schemes, and customer facing staff need to explain them clearly.

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
3. Add what to do if something goes wrong: contact your provider or bank through official numbers, and report to the CSA using the channels on its official report page (csa.gov.gh/report).
4. Keep it short enough to read on one phone screen, and do not include any real phone numbers other than official ones.

**Done looks like:** a one page guide you can share in a family or church WhatsApp group, saved in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "You get an SMS that looks like a deposit alert, then a call asking you to send the money back. What should you do first?",
            options: [
              "Check your real balance through the official menu",
              "Send the money back quickly to be kind",
              "Share your PIN so they can reverse it",
              "Forward the SMS to all your contacts",
            ],
            answer_index: 0,
            explanation: "The deposit message may be fake, so check the real balance through the official menu, never the message.",
          },
          {
            prompt: "What happens in a SIM swap?",
            options: [
              "Your phone battery is replaced",
              "Your network provider upgrades you to faster data",
              "A fraudster gets a new SIM issued for your number and receives your calls, texts and codes",
              "Your phone's apps are moved to a memory card",
            ],
            answer_index: 2,
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
              "It unlocks free data",
              "It changes your phone's language",
              "It is often the key that confirms access to a wallet or account",
            ],
            answer_index: 3,
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
            options: [
              "Trust",
              "Urgency",
              "Greed",
              "Encryption",
            ],
            answer_index: 1,
            explanation: "Creating time pressure is the urgency lever.",
          },
          {
            prompt: "How can you check where a link goes on a phone without opening it?",
            options: [
              "Tap it quickly twice",
              "Forward it to a friend first",
              "Turn off mobile data and tap it",
              "Press and hold it to preview the address",
            ],
            answer_index: 3,
            explanation: "A long press previews the address without opening the page.",
          },
          {
            prompt: "What is the safest way to verify a message claiming to be from your bank?",
            options: [
              "Call the bank on the number from its official website or your card",
              "Reply to the message and ask",
              "Call the number given in the message",
              "Click the link and see if the page looks real",
            ],
            answer_index: 0,
            explanation: "Use a contact you already trust, never details from the suspicious message.",
          },
          {
            prompt: "What is smishing?",
            options: [
              "A type of firewall",
              "A strong password method",
              "Phishing by SMS",
              "A backup technique",
            ],
            answer_index: 2,
            explanation: "Smishing is phishing delivered by text message.",
          },
          {
            prompt: "What did Fuseini do with the payroll email?",
            options: [
              "Clicked the link to test the login page",
              "Ignored it because only one person reported it",
              "Replied to the sender asking who they were",
              "Recorded the details, checked who else received it, had the domain blocked and warned staff",
            ],
            answer_index: 3,
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
              "Blocks all advertisements",
              "Encrypts files and demands payment for a key",
              "Backs up files to the cloud",
            ],
            answer_index: 2,
            explanation: "Ransomware locks files with encryption and demands payment.",
          },
          {
            prompt: "Which malware type pretends to be useful software but hides a harmful part?",
            options: [
              "Worm",
              "Trojan",
              "Firewall",
              "Patch",
            ],
            answer_index: 1,
            explanation: "A trojan disguises itself as something useful, like a cracked program.",
          },
          {
            prompt: "Which defence is described as the strongest answer to ransomware?",
            options: [
              "Regular backups with an offline copy that you test",
              "A faster internet connection",
              "A new screen saver",
              "Paying quickly",
            ],
            answer_index: 0,
            explanation: "Tested backups, including an offline copy, let you restore without paying.",
          },
          {
            prompt: "What was Issahaku's first action when he found the ransom note?",
            options: [
              "Paid the ransom",
              "Restarted the computer repeatedly",
              "Unplugged the computer from the network",
              "Emailed the attackers",
            ],
            answer_index: 2,
            explanation: "Disconnecting stops the malware from spreading to other machines.",
          },
          {
            prompt: "Why should you avoid uploading confidential work files to VirusTotal?",
            options: [
              "Uploads can be shared with security researchers",
              "VirusTotal deletes files",
              "It only accepts photos",
              "It costs money per upload",
            ],
            answer_index: 0,
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

The three topics in this section go deeper into each layer: identity and access management, encryption and protecting data, and security awareness for staff and communities. All three can be learned on a phone or a computer, and most practice tasks use free tools you already have.`,
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
              "Hiding the server room underground",
              "Turning off the internet at night",
              "Using several layers of protection that support each other",
            ],
            answer_index: 3,
            explanation: "Defence in depth means layers working together, because no single layer is enough.",
          },
          {
            prompt: "Which layer do strong passwords and multi factor authentication belong to?",
            options: [
              "Data protection",
              "Identity and access",
              "People",
              "Backups",
            ],
            answer_index: 1,
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
              "Authentication checks who you are; authorisation decides what you may do",
              "They mean the same thing",
              "Authorisation checks who you are; authentication decides what you may do",
              "Authentication is only for websites",
            ],
            answer_index: 0,
            explanation: "Authentication proves identity; authorisation sets permissions.",
          },
          {
            prompt: "Why is an authenticator app usually stronger than SMS codes?",
            options: [
              "Apps work without a phone",
              "SMS codes are longer",
              "SMS codes can be stolen through SIM swap",
              "Apps never need updating",
            ],
            answer_index: 2,
            explanation: "SIM swap lets a fraudster receive your texts, including codes.",
          },
          {
            prompt: "A fingerprint is which kind of factor?",
            options: [
              "Something you know",
              "Something you have",
              "Something you share",
              "Something you are",
            ],
            answer_index: 3,
            explanation: "Biometrics like fingerprints are something you are.",
          },
          {
            prompt: "When a staff member changes role, what should happen under least privilege?",
            options: [
              "Add the new access and keep the old",
              "Give them administrator rights",
              "Remove access that the new role does not need",
              "Delete all their files",
            ],
            answer_index: 2,
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

Banks, hospitals, telcos and NGOs in Ghana hold personal data about many people. Laws and regulators expect it to be protected, and adverts for security roles mention data protection controls and encryption. You need to know what encryption does, what it does not do and how to handle personal data responsibly.

## Encryption in plain words

**Encryption** scrambles data so only someone with the right key can read it.

* **Symmetric encryption** uses one shared key to lock and unlock. It is fast and used for files and disks.
* **Asymmetric encryption** uses a key pair: a public key anyone can use to lock, and a private key only the owner holds to unlock. It helps strangers set up secure connections.

You already use both every day. The padlock in your browser means **HTTPS**, which uses these methods to protect data travelling between your device and a website. WhatsApp uses end to end encryption for messages. Phone and laptop **disk encryption** protects stored data if the device is lost.

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

1. On your phone or computer, open a website and tap or click the padlock (or site information icon) to view its certificate details. Note who issued it.
2. Use a free online SHA 256 text hashing tool (with harmless text only). Hash the word \`Tamale\`, then \`tamale\`. Note how different the results are.
3. Check that your phone has a screen lock, and on a laptop check whether BitLocker, device encryption or FileVault is on.
4. Write five personal data handling rules for a small NGO in your journal.

**Done looks like:** a short note with the certificate issuer, the two different hashes, your device encryption status and five handling rules. Never hash or paste real passwords into online tools.`,
      quiz: {
        questions: [
          {
            prompt: "What does encryption protect most directly?",
            options: [
              "Confidentiality",
              "Availability",
              "Battery life",
              "Network speed",
            ],
            answer_index: 0,
            explanation: "Encryption keeps data private so only key holders can read it.",
          },
          {
            prompt: "How is asymmetric encryption different from symmetric encryption?",
            options: [
              "It uses no keys at all",
              "It only works offline",
              "It uses a public and private key pair instead of one shared key",
              "It is used only for passwords",
            ],
            answer_index: 2,
            explanation: "Asymmetric encryption uses a key pair; symmetric uses one shared key.",
          },
          {
            prompt: "Which statement about a hash is true?",
            options: [
              "Changing one letter of the input changes the hash completely",
              "You can turn a hash back into the original data",
              "A hash is the same as a password",
              "Hashes are only used for videos",
            ],
            answer_index: 0,
            explanation: "Small input changes produce completely different hashes, which helps check integrity.",
          },
          {
            prompt: "Under Ghana's Data Protection Act, 2012 (Act 843), what must organisations that process personal data do?",
            options: [
              "Publish all data online",
              "Delete data every week",
              "Store data only on paper",
              "Register with the Data Protection Commission",
            ],
            answer_index: 3,
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

Sumaila volunteers to help his church in Wa after several members lost money to fake "pastor needs urgent help" messages from hacked WhatsApp accounts. He prepares a ten minute talk in Waale and English with three points: never send money because of a message alone, call the person on their usual number to confirm, and turn on two step verification. He demonstrates the setting on his own phone, then helps people turn it on after the service. A month later, a member calls the pastor to check a suspicious request and saves the money. That is awareness working.

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
              "It wastes time in the session",
              "Scams are not important",
              "It is only a problem in large companies",
              "Shame makes people hide mistakes, which is dangerous",
            ],
            answer_index: 3,
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
              "Staff must be told the exact date and time",
              "It must use real customer data",
              "It must be approved by management and planned carefully",
              "It must be run by an outside hacker",
            ],
            answer_index: 2,
            explanation: "Simulations need management approval, careful planning and friendly follow up.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "detect-respond": {
      explanation_md: `## Why this matters

Most junior security jobs advertised by Ghanaian telcos and banks centre on the same duties: monitor security events and alerts, analyse incidents, respond and escalate, and run vulnerability assessments. Some Ghanaian banks run their own security operations centres and organise analysts in levels, with Level 1 analysts watching alerts and Level 2 analysts handling escalations. This section is the heart of the analyst role.

## Prevention is never perfect

However good the protection, something will eventually get through: a staff member clicks a link, a supplier is hacked, a new weakness is found in common software. Organisations therefore plan to **detect** problems quickly and **respond** in a controlled way. The faster an attack is spotted, the less damage it does.

## The four topics in this section

* **Logs and monitoring:** the records systems keep, and how to read them for signs of trouble.
* **SOC work and alert triage:** how a security operations centre (SOC) uses tools such as a SIEM to collect alerts, and how Level 1 analysts decide which are real.
* **Incident response:** the calm, step by step process used once an attack is confirmed, including Ghana's reporting duty under the Cybersecurity Act.
* **Vulnerability management:** finding and fixing weaknesses on systems the organisation owns before attackers use them.

## What the work feels like

SOC work is often shift work, because attacks do not stop at night or at weekends. Much of it is careful and repetitive: reading alerts, checking facts, writing tickets. Most alerts turn out to be harmless. The skill is staying alert so you notice the one that is not, and writing clearly enough that the next analyst can pick up where you stopped.

## A small example

Wumpini is a Level 1 analyst on the night shift at a payments company. At 2 a.m. the monitoring tool raises an alert: a staff account logged in from two countries within ten minutes. She checks the details. The staff member's normal login is from Accra; the second login came from an address with a poor reputation, after several failed attempts. Wumpini records the facts in the ticket, follows the playbook to disable the account temporarily, and escalates to the Level 2 analyst on call. By morning the password is reset, the second factor is enforced and the staff member has been contacted. Her clear notes made the handover smooth.

## Phone and computer

You can learn the ideas and practise reading logs and alerts on a phone or a computer. Hands on SIEM and lab practice works best on a computer; the later lessons point to free browser based options and community computers you can use.`,
      practice_task_md: `**Goal:** understand the detect and respond cycle with a real story.

1. Find a news report about a cyber incident affecting an organisation in Ghana or elsewhere in Africa, from a reputable news site.
2. In your journal, write: how it was detected, who responded, what they did, and what they could have done to detect it sooner.
3. Write three questions you would ask if you had been the analyst on shift.
4. Keep the summary to half a page and do not copy the article's sentences.

**Done looks like:** a half page incident summary in your own words with three analyst questions. Include the article link.`,
      quiz: {
        questions: [
          {
            prompt: "Why do organisations invest in detection and response as well as prevention?",
            options: [
              "Because detection is cheaper than any protection",
              "Because regulators ban prevention",
              "Because attacks only happen at night",
              "Because prevention is never perfect",
            ],
            answer_index: 3,
            explanation: "Something will eventually get through, so fast detection limits the damage.",
          },
          {
            prompt: "In a SOC with levels, what do Level 1 analysts mainly do?",
            options: [
              "Approve budgets",
              "Write the company's laws",
              "Watch and triage alerts, then escalate",
              "Repair printers",
            ],
            answer_index: 2,
            explanation: "Level 1 analysts watch alerts and escalate real issues to Level 2.",
          },
          {
            prompt: "What is true about most alerts in a SOC?",
            options: [
              "Every alert is a confirmed attack",
              "Most turn out to be harmless",
              "Alerts only appear during office hours",
              "Alerts never need writing up",
            ],
            answer_index: 1,
            explanation: "Most alerts are harmless; the skill is spotting the one that is not.",
          },
          {
            prompt: "What made Wumpini's handover smooth?",
            options: [
              "She wrote clear notes in the ticket and escalated through the playbook",
              "She solved everything alone without telling anyone",
              "She waited until morning to look at the alert",
              "She deleted the alert",
            ],
            answer_index: 0,
            explanation: "Clear ticket notes and following the playbook let Level 2 act quickly.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "logging-monitoring": {
      explanation_md: `## Why this matters

Logs are the evidence of what happened on a system. Adverts for analyst roles in Ghana list log analysis and monitoring for malicious activity, and O*NET's description of information security analysts includes monitoring and network tools. Without logs, an investigation is guesswork.

## What a log is

A log is a record a system writes when something happens: a login, a failed password, a file change, a connection, an error. Each entry usually has:

* **When:** a timestamp.
* **Where:** which system or device.
* **Who:** a user name or IP address.
* **What:** the action and whether it succeeded.

## Logs that matter most to defenders

* **Authentication logs:** logins and failures on Windows, Linux, email and business apps.
* **Firewall and network logs:** which connections were allowed or blocked.
* **Endpoint and antivirus logs:** malware detections and suspicious programs.
* **Application logs:** actions inside systems such as a core banking or mobile money platform.
* **Email logs:** messages sent, received and blocked.

## Reading for the unusual

Monitoring means knowing what **normal** looks like so the **abnormal** stands out. Questions to ask:

* Is this login at a strange time or from a strange place?
* Are there many failures followed by a success?
* Is an account doing something it never does, such as an accountant's login creating new users?
* Did a log suddenly stop or get cleared?

Here is an invented example:

\`\`\`
2026-10-20 07:58 login ok    user=hawa.a  ip=10.0.2.14
2026-10-20 23:41 login fail  user=admin   ip=203.0.113.9
2026-10-20 23:41 login fail  user=admin   ip=203.0.113.9
2026-10-20 23:42 login ok    user=admin   ip=203.0.113.9
\`\`\`

The first line is a normal morning login from inside the office. The last three show an outside address failing twice, then succeeding as "admin" late at night. That pattern deserves an immediate escalation.

## Good logging habits

* Make sure clocks on all systems are correct, or timelines will not match.
* Keep logs long enough to investigate, and protect them from being changed.
* Send logs to a central place so one hacked machine cannot erase its own evidence. That central place is often a SIEM, covered in the next lesson.

## A small example

Mariama is asked why a shared folder at a Tamale NGO went missing. She checks the file server's logs and finds the folder was deleted at 16:05 by a staff account, from that person's own computer. It was an accident, not an attack. The logs answered the question in minutes and the folder was restored from backup. Logs protect innocent people too.`,
      practice_task_md: `**Goal:** read a log and write findings.

1. Copy this invented log into your journal or a notes app:
   * \`08:01 login ok user=amina ip=10.0.1.5\`
   * \`12:30 login ok user=fuseini ip=10.0.1.8\`
   * \`01:14 login fail user=amina ip=198.51.100.23\` (repeated 12 times)
   * \`01:16 login ok user=amina ip=198.51.100.23\`
   * \`01:18 user created user=support9 by=amina\`
2. Mark each line normal or suspicious and explain why.
3. Write a five line incident note: what happened, when, which account, why it matters, what you recommend.
4. Optional, with a computer: take a free Splunk introductory course and search sample data.

**Done looks like:** an annotated log and a five line note that a Level 2 analyst could act on.`,
      quiz: {
        questions: [
          {
            prompt: "Which four pieces of information does a typical log entry contain?",
            options: [
              "Price, colour, size and weight",
              "Name, age, address and phone",
              "When, where, who and what",
              "Title, author, page and chapter",
            ],
            answer_index: 2,
            explanation: "Log entries usually record a timestamp, the system, the user or address, and the action.",
          },
          {
            prompt: "In the lesson's log example, why do the last three lines deserve escalation?",
            options: [
              "An outside address failed twice then logged in as admin late at night",
              "They show a normal morning login",
              "The user changed their password as required",
              "The clock was wrong",
            ],
            answer_index: 0,
            explanation: "Failures followed by a late night admin success from outside suggest a guessed password.",
          },
          {
            prompt: "Why should logs be sent to a central place?",
            options: [
              "To make computers run faster",
              "To save printer paper",
              "Because local logs are illegal",
              "So one hacked machine cannot erase its own evidence",
            ],
            answer_index: 3,
            explanation: "Central storage keeps evidence safe even if one machine is compromised.",
          },
          {
            prompt: "Why do correct clocks on all systems matter?",
            options: [
              "So staff arrive on time",
              "So timelines from different logs match during an investigation",
              "So backups are smaller",
              "So passwords expire",
            ],
            answer_index: 1,
            explanation: "Wrong clocks make it hard to line up events from different systems.",
          },
          {
            prompt: "What did the logs show in Mariama's missing folder case?",
            options: [
              "An outside hacker deleted it",
              "A staff member accidentally deleted it from their own computer",
              "The server deleted it automatically",
              "Ransomware encrypted it",
            ],
            answer_index: 1,
            explanation: "The logs showed an accidental deletion, and the folder was restored from backup.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "soc-alert-triage": {
      explanation_md: `## Why this matters

The security operations centre (SOC) is where many analysts start. Ghanaian telcos, banks and fintechs, as well as managed security providers serving clients across Africa, run SOCs. Remote and regional SOC adverts commonly ask for SIEM experience, alert triage, ticketing and clear documentation.

## What a SIEM does

A **SIEM** (security information and event management) system collects logs from many sources: firewalls, servers, laptops, email and business apps. It stores them in one place, lets analysts search them and uses **rules** to raise alerts, such as "ten failed logins then a success within five minutes". Examples named in adverts include Splunk, Microsoft Sentinel, Elastic and QRadar. You do not need to know them all; the thinking is the same.

## Triage: deciding what is real

Triage means sorting alerts by what they really are and how urgent they are. For each alert, a Level 1 analyst:

1. **Reads** the alert: what rule fired, on which system, for which user, when.
2. **Enriches** it: Is the IP address known to be bad? Is the user travelling? Is this a critical server? Has this happened before?
3. **Decides**:
   * **True positive:** real malicious activity. Escalate.
   * **False positive:** the rule fired but nothing bad happened, for example a staff member mistyping a password. Close it with a note, and suggest tuning the rule if it keeps happening.
   * **Benign true positive:** the activity happened and is allowed, such as an approved security scan.
4. **Documents** everything in the ticket: what you checked, what you found and why you decided.
5. **Escalates** using the playbook if needed.

## Speaking the same language

**MITRE ATT&CK** is a free public knowledge base of attacker tactics and techniques, such as phishing or password guessing. SOC teams use it to label alerts consistently. As a beginner, simply learn to look up a technique and read its description and suggested detections.

## Writing a good ticket note

A good note lets someone else understand the case without asking you:

\`\`\`
Alert: 10 failed logins then success, user=issahaku.m
Checked: source IP 203.0.113.9, poor reputation; user is in Tamale office,
no travel. Login at 02:14, outside working hours.
Decision: likely true positive. Escalated to L2 at 02:25.
Action per playbook: account disabled pending reset.
\`\`\`

## A small example

On her first week, Hawa closes an alert about "unusual login location" as a false positive after confirming with the staff member's manager that he was at a workshop in Kumasi. She writes exactly what she checked. Her lead praises the note, not just the decision, because it shows her reasoning.

## Practice options

LetsDefend and CyberDefenders offer browser based SOC style practice with free content; Splunk offers free introductory training. These need a laptop or a large screen. On a phone, practise writing triage notes for the example alerts in this track.`,
      practice_task_md: `**Goal:** triage three invented alerts and write ticket notes.

1. For each alert below, decide true positive, false positive or benign true positive, and write a ticket note using the lesson's format.
   * Alert A: "Login from new country" for a staff member whose manager confirms she is at a conference in Lagos.
   * Alert B: "Malware detected and quarantined" on a reception computer after a flash drive was used.
   * Alert C: "Port scan detected" from the IT team's approved monthly vulnerability scanner.
2. For alert B, look up "Replication Through Removable Media" on MITRE ATT&CK and add the technique name to your note.
3. Optional, with a computer: try a free SOC practice alert on LetsDefend or a free Splunk course.

**Done looks like:** three clear ticket notes with decisions and reasons.`,
      quiz: {
        questions: [
          {
            prompt: "What does a SIEM do?",
            options: [
              "Replaces all antivirus software",
              "Repairs damaged hard drives",
              "Sends marketing emails",
              "Collects logs from many sources, lets analysts search them and raises alerts using rules",
            ],
            answer_index: 3,
            explanation: "A SIEM centralises logs, supports searching and raises rule based alerts.",
          },
          {
            prompt: "A rule fires because a staff member mistyped a password, and nothing bad happened. What is this?",
            options: [
              "False positive",
              "True positive",
              "Benign true positive",
              "Ransomware",
            ],
            answer_index: 0,
            explanation: "The rule fired but there was no malicious activity, so it is a false positive.",
          },
          {
            prompt: "What does enriching an alert mean?",
            options: [
              "Charging money for it",
              "Deleting old alerts",
              "Adding context such as IP reputation, user travel and asset importance",
              "Sending it to every staff member",
            ],
            answer_index: 2,
            explanation: "Enrichment adds context that helps decide whether the alert is real.",
          },
          {
            prompt: "What is MITRE ATT&CK?",
            options: [
              "A paid antivirus product",
              "A Ghanaian law",
              "A type of firewall",
              "A free knowledge base of attacker tactics and techniques",
            ],
            answer_index: 3,
            explanation: "SOC teams use ATT&CK to label and understand attacker behaviour consistently.",
          },
          {
            prompt: "Why did Hawa's lead praise her note about the false positive?",
            options: [
              "It was very long",
              "It used many technical words",
              "It showed exactly what she checked and why she decided",
              "It escalated the alert to the CEO",
            ],
            answer_index: 2,
            explanation: "A good note records the checks and reasoning so others can trust the decision.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "incident-response": {
      explanation_md: `## Why this matters

When an attack is confirmed, panic causes more damage than the attacker. Ghanaian telco and bank adverts list incident response, containment and escalation as core duties. Ghana's Cybersecurity Act, 2020 also sets a reporting duty, so organisations need staff who know the process.

## The incident response stages

Many teams still use the incident response lifecycle from earlier guidance by the US National Institute of Standards and Technology (NIST). NIST's latest version, SP 800 61 Revision 3, now links incident response to the six functions of the NIST Cybersecurity Framework 2.0, but the stages below remain a common, simple way to remember the work:

1. **Preparation:** plans, contact lists, playbooks, backups and training, done before anything happens.
2. **Detection and analysis:** spotting the incident, confirming it is real, and working out scope: which systems, which accounts, which data.
3. **Containment:** stopping it spreading, for example disconnecting a computer from the network or disabling an account.
4. **Eradication:** removing the cause, such as malware or an attacker's backdoor account.
5. **Recovery:** restoring systems and data safely, often from backups, and watching closely for signs of return.
6. **Lessons learned:** a calm review of what happened and what to improve, without blame.

## The junior analyst's part

As a junior you are unlikely to lead an incident, but you will:

* Follow the playbook exactly and escalate quickly.
* **Preserve evidence:** do not wipe or reinstall a machine before the team says so, because it may hold clues.
* Keep a **timeline**: what happened, when, who did what. Write times as you go.
* Communicate only through agreed channels. Never discuss an incident on social media or personal WhatsApp.

## Ghana's reporting duty

Under section 47 of the **Cybersecurity Act, 2020 (Act 1038)**, a person in charge of an institution must report a cybersecurity incident to the relevant Sectoral Computer Emergency Response Team or the National Computer Emergency Response Team within 24 hours of detecting it. The Cyber Security Authority's National CERT (CERT GH) accepts reports through the channels listed on csa.gov.gh/report. Your organisation's managers decide and make the report; your clear timeline helps them do it accurately.

## A small example

At a microfinance company in Wa, Abdul-Rahman notices a staff laptop sending large amounts of data to an unknown address. Following the playbook, he disconnects it from the network but leaves it switched on, starts a timeline, and calls his lead. The team finds malware that arrived in a fake invoice, removes it, resets the affected passwords and restores the laptop from a clean image. Management reports the incident within the required time. At the lessons learned meeting, they add invoice phishing to the next awareness session.`,
      practice_task_md: `**Goal:** write a simple incident response playbook for one scenario.

1. Choose a scenario: a staff WhatsApp account taken over, a laptop infected with malware, or a lost unencrypted phone with customer contacts.
2. Write what should happen at each of the six stages, in short bullet points.
3. Add a contact list with roles only (IT lead, manager, provider support) and the official CSA reporting channels.
4. Add a blank timeline table with columns: time, what happened, who, action taken.

**Done looks like:** a one to two page playbook you could hand to a small organisation, saved in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "Which stage involves stopping an incident from spreading, such as disconnecting a computer?",
            options: [
              "Preparation",
              "Containment",
              "Lessons learned",
              "Recovery",
            ],
            answer_index: 1,
            explanation: "Containment limits the spread before the cause is removed.",
          },
          {
            prompt: "Why should a junior analyst avoid wiping an infected machine straight away?",
            options: [
              "The machine may hold evidence the team needs",
              "Wiping takes too long",
              "Wiping is illegal in Ghana",
              "Backups do not work after wiping",
            ],
            answer_index: 0,
            explanation: "Preserving evidence helps the team understand and fully remove the threat.",
          },
          {
            prompt: "Under section 47 of Act 1038, within what time must a person in charge of an institution report a cybersecurity incident to the relevant CERT?",
            options: [
              "One week",
              "30 days",
              "24 hours after detection",
              "There is no time limit",
            ],
            answer_index: 2,
            explanation: "Section 47(5) sets a maximum of 24 hours after the incident is detected.",
          },
          {
            prompt: "What is the purpose of the lessons learned stage?",
            options: [
              "To calmly review what happened and improve, without blame",
              "To find someone to blame",
              "To delete all logs",
              "To announce the incident on social media",
            ],
            answer_index: 0,
            explanation: "Lessons learned improves defences and plans for next time.",
          },
          {
            prompt: "In the example, what did Abdul-Rahman do with the suspicious laptop?",
            options: [
              "Reinstalled Windows immediately",
              "Posted about it in the staff WhatsApp group",
              "Gave it back to the staff member",
              "Disconnected it from the network, left it on, started a timeline and called his lead",
            ],
            answer_index: 3,
            explanation: "He contained it, preserved evidence, recorded times and escalated.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "vulnerability-management": {
      explanation_md: `## Why this matters

Ghanaian telco and bank adverts list vulnerability scanning, vulnerability assessment and risk based prioritisation among analyst duties. New weaknesses in common software are announced constantly, and attackers move quickly to use them. Organisations need people who can find, rank and track fixes for the systems they own.

## Key words

* **Vulnerability:** a weakness in software, hardware or configuration.
* **CVE:** a public identifier for a known vulnerability, written as CVE, then the year, then a number, in the pattern \`CVE-YYYY-NNNNN\`.
* **CVSS:** a common scoring system from 0 to 10 describing severity. Scores are grouped as low, medium, high and critical.
* **Patch:** an update that fixes a vulnerability.
* **Exploit:** a method of taking advantage of a vulnerability.

## The vulnerability management cycle

1. **Know your assets.** You cannot protect what you do not know you have. Keep a list of computers, servers, network devices and important software.
2. **Find vulnerabilities.** Use authorised scanning tools on systems your organisation owns, and follow vendor security notices. Scanning someone else's systems without permission is illegal.
3. **Prioritise.** Not everything can be fixed today. Consider the severity score, whether the vulnerability is being actively exploited, how exposed the system is (internet facing or internal) and how important it is to the business.
4. **Fix or reduce the risk.** Apply patches, change settings, or add temporary protections if a patch is not yet possible.
5. **Verify.** Scan again to confirm the fix worked.
6. **Report.** Track progress so managers can see what remains open.

## Prioritising wisely

A critical score on an isolated test machine may matter less than a high score on the internet facing customer portal. The US Cybersecurity and Infrastructure Security Agency (CISA) publishes a free **Known Exploited Vulnerabilities catalog** listing vulnerabilities that attackers are actively using. If a vulnerability on your system appears there, it moves to the top of the list.

## A small example

Fuseini is an IT security intern at a hospital in Tamale. The monthly authorised scan lists forty findings. He sorts them: one high severity vulnerability on the internet facing appointment booking server is listed in CISA's catalog, so it goes first. Several medium findings on internal printers can wait for the next maintenance window. He writes a short table with asset, finding, severity, exposure, recommended action and owner. The booking server is patched the same day and a rescan confirms the fix.

## On modest hardware

Running scanners needs a computer and permission. On a phone, you can still practise the most important skill, prioritising: read entries in the National Vulnerability Database and CISA's catalog and decide which would worry you most and why.`,
      practice_task_md: `**Goal:** prioritise invented scan findings like an analyst.

1. Create a table in Google Sheets with columns: asset, finding, CVSS severity, internet facing (yes or no), in CISA's catalog (yes or no), business importance, priority, action.
2. Add six invented findings for a small bank branch, such as an outdated web server on the customer portal, a missing Windows update on a teller computer, and an old printer firmware.
3. Rank them from 1 to 6 and write one sentence explaining the top two choices.
4. Browse CISA's Known Exploited Vulnerabilities catalog and write down one entry for a product you have heard of.

**Done looks like:** a ranked findings table with short reasons, ready for your portfolio. Do not scan any real systems for this task.`,
      quiz: {
        questions: [
          {
            prompt: "What is a CVE?",
            options: [
              "A type of firewall",
              "A public identifier for a known vulnerability",
              "A Ghanaian regulator",
              "A password manager",
            ],
            answer_index: 1,
            explanation: "A CVE identifier gives each known vulnerability a standard name.",
          },
          {
            prompt: "What is the first step in the vulnerability management cycle?",
            options: [
              "Patch everything",
              "Know your assets",
              "Write the report",
              "Buy a new scanner",
            ],
            answer_index: 1,
            explanation: "You cannot protect what you do not know you have.",
          },
          {
            prompt: "Why does a listing in CISA's Known Exploited Vulnerabilities catalog raise a vulnerability's priority?",
            options: [
              "It means the vulnerability is harmless",
              "It means the vendor has stopped trading",
              "It means the system is offline",
              "It means attackers are actively using it",
            ],
            answer_index: 3,
            explanation: "The catalog lists vulnerabilities being actively exploited, so they need urgent fixes.",
          },
          {
            prompt: "When is it acceptable to run a vulnerability scan?",
            options: [
              "On systems your organisation owns, with authorisation",
              "On any website you visit",
              "On a competitor's network to compare",
              "On public Wi Fi to help others",
            ],
            answer_index: 0,
            explanation: "Scanning without permission is illegal; only scan authorised systems.",
          },
          {
            prompt: "Why did Fuseini fix the booking server finding first?",
            options: [
              "It was the oldest finding",
              "It was the easiest to fix",
              "It was high severity, internet facing and listed in CISA's catalog",
              "The printer team asked him to",
            ],
            answer_index: 2,
            explanation: "Severity, exposure and active exploitation together made it the top priority.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "rules-frameworks": {
      explanation_md: `## Why this matters

Security work in Ghana does not happen in a vacuum. Laws set what is a crime and what organisations must do. Regulators such as the Cyber Security Authority and the Bank of Ghana issue directives. International standards give teams a shared checklist. Job adverts in Ghanaian banks and audit firms mention several of these by name, so understanding them helps you read adverts, follow your employer's processes and speak confidently in interviews.

## Three kinds of rules

* **Laws** passed by Parliament, such as the **Cybersecurity Act, 2020 (Act 1038)**, the **Electronic Transactions Act, 2008 (Act 772)** and the **Data Protection Act, 2012 (Act 843)**. Breaking a law can lead to penalties or prosecution.
* **Regulator directives** for particular sectors. Bank adverts mention the Bank of Ghana's Cyber and Information Security Directive, and audit firm adverts mention the Cyber Security Authority's directive for critical information infrastructure. These tell regulated organisations which controls they must have.
* **Frameworks and standards** that organisations choose or are required to follow, such as the NIST Cybersecurity Framework, ISO/IEC 27001 and PCI DSS. These describe good practice in an organised way.

## Who is who

* The **Cyber Security Authority (CSA)** regulates cybersecurity in Ghana, runs the National Computer Emergency Response Team (CERT GH), and licenses cybersecurity service providers.
* The **Bank of Ghana** regulates banks and payment providers, including their cyber and fraud controls.
* The **Data Protection Commission** oversees how personal data is handled.
* The **National Communications Authority** regulates telecommunications, including SIM registration.

## Why a junior analyst should care

You will not write laws or directives, but you will see their effects every day: a rule that incidents must be reported quickly, a requirement for multi factor authentication, an audit that checks whether leavers' accounts were disabled. When you understand why a control exists, you apply it more carefully and explain it better.

## A small example

Hawa starts at a payments company in Accra. Her manager asks her to collect evidence for an upcoming audit: screenshots showing that multi factor authentication is enforced, a list of access reviews done this year, and the incident log. Hawa recognises each item as a control from the standards in this section. Because she understands their purpose, she spots that one access review is missing a manager's sign off and gets it fixed before the auditors arrive.

## Checking the current version

Laws are amended and directives are updated. Always check the official source, such as csa.gov.gh, bog.gov.gh or dpc.gov.gh, for the latest version rather than relying on a summary or an old social media post.`,
      practice_task_md: `**Goal:** build a one page "rules map" for a Ghanaian bank.

1. Draw or type a table with three columns: laws, regulators and directives, frameworks and standards.
2. Fill it using this lesson: at least three laws, three regulators and three frameworks or standards.
3. For each item, write one sentence on what it means for a junior analyst's daily work.
4. Visit csa.gov.gh and note one current announcement or alert.

**Done looks like:** a one page rules map with plain English notes and the date you checked the CSA site.`,
      quiz: {
        questions: [
          {
            prompt: "Which body runs Ghana's National Computer Emergency Response Team (CERT GH)?",
            options: [
              "The Ghana Revenue Authority",
              "The Electoral Commission",
              "The Ghana Tourism Authority",
              "The Cyber Security Authority",
            ],
            answer_index: 3,
            explanation: "The CSA runs CERT GH and regulates cybersecurity in Ghana.",
          },
          {
            prompt: "Which of these is a framework or standard rather than a law?",
            options: [
              "Act 1038",
              "Act 772",
              "ISO/IEC 27001",
              "Act 843",
            ],
            answer_index: 2,
            explanation: "ISO/IEC 27001 is an international standard; the others are Acts of Parliament.",
          },
          {
            prompt: "Which regulator oversees how personal data is handled in Ghana?",
            options: [
              "The National Communications Authority",
              "The Data Protection Commission",
              "The Bank of Ghana",
              "The Cyber Security Authority",
            ],
            answer_index: 1,
            explanation: "The Data Protection Commission oversees personal data handling.",
          },
          {
            prompt: "Where should you check for the latest version of a directive or law?",
            options: [
              "The official source, such as csa.gov.gh or bog.gov.gh",
              "An old social media post",
              "A friend's summary",
              "Any search result",
            ],
            answer_index: 0,
            explanation: "Laws and directives change, so check the official source.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "cybersecurity-act-csa": {
      explanation_md: `## Why this matters

The **Cybersecurity Act, 2020 (Act 1038)** shapes how security works in Ghana. It created the regulator, set up incident response teams, protects critical systems and regulates the people and companies who sell security services. Employers expect security staff to know its basics, and it may affect your own career if you later offer services to clients.

## What the Act does

Act 1038 was passed in 2020. Its main parts include:

* **The Cyber Security Authority (CSA):** established to regulate cybersecurity activities in Ghana and promote the development of cybersecurity in the country.
* **Critical information infrastructure (CII):** computer systems or networks essential for national security or the economic and social well being of citizens. The Act provides for designating, registering and auditing CII. The CSA states that thirteen sectors were designated as CII sectors in 2021.
* **Computer emergency response teams:** a National CERT and Sectoral CERTs that monitor and respond to incidents.
* **Incident reporting:** section 47 requires a person in charge of an institution to report a cybersecurity incident to the relevant Sectoral CERT or the National CERT within 24 hours of detecting it.
* **Licensing and accreditation:** cybersecurity service providers must be licensed (section 49), and the CSA accredits cybersecurity professionals and practitioners (section 57).
* **Public awareness:** the CSA must run programmes to promote awareness and education.
* **Protection online:** offences relating to children online, sexual extortion, and sharing intimate images without consent.

## Licensing and accreditation in practice

The CSA began licensing and accreditation in 2023. Its announcement named five service areas: vulnerability assessment and penetration testing, digital forensics, managed cybersecurity services, governance, risk and compliance, and cybersecurity training. The announcement also said that cybersecurity professionals with the right qualifications and experience would be accredited in those areas. Whether a particular job or person needs a licence or accreditation depends on the CSA's current rules, so check them on the CSA website, and always check before you offer services such as testing, forensics or monitoring to clients.

## Reporting channels

CERT GH lists its reporting channels on the CSA's official report page at **csa.gov.gh/report**. They include a short code you can call or text, WhatsApp, email, the CSA Ghana mobile app and an online form. Share the page with friends and family who are victims of cybercrime, so they always get the current details.

## A small example

Issahaku, a junior analyst at a regional hospital group, helps his manager with a ransomware incident. The manager asks him for an accurate timeline because the hospital must report the incident to the relevant CERT within 24 hours of detecting it. Issahaku's notes show when the first alert fired and when the incident was confirmed, so the report is accurate and on time.

## Remember

You do not need to memorise every section. Know what the CSA is, what CII and CERTs are, the 24 hour reporting duty for institutions, that service providers are licensed and professionals can be accredited, and where to report.`,
      practice_task_md: `**Goal:** explain Act 1038 to someone outside tech.

1. Visit csa.gov.gh and its incident reporting page, and read the CII overview page.
2. Write a short explainer, no more than one phone screen, answering: What is the CSA? What is CERT GH? What must institutions do when an incident happens? Where can ordinary people report cybercrime?
3. Explain it in person or by voice note to a friend or relative, in any language, and note one question they asked.
4. Add your explainer and the question to your journal.

**Done looks like:** a one screen explainer and a note of the conversation. Use only facts from the lesson or the CSA's own site.`,
      quiz: {
        questions: [
          {
            prompt: "Which Act established the Cyber Security Authority?",
            options: [
              "The Data Protection Act, 2012 (Act 843)",
              "The Electronic Transactions Act, 2008 (Act 772)",
              "The Cybersecurity Act, 2020 (Act 1038)",
              "The Payment Systems and Services Act, 2019 (Act 987)",
            ],
            answer_index: 2,
            explanation: "Act 1038 established the CSA.",
          },
          {
            prompt: "What is critical information infrastructure under Act 1038?",
            options: [
              "Computer systems or networks essential for national security or citizens' economic and social well being",
              "Any personal phone",
              "Only government websites",
              "Social media accounts with many followers",
            ],
            answer_index: 0,
            explanation: "CII covers systems essential to national security or economic and social well being.",
          },
          {
            prompt: "Under the Act, who must be licensed by the CSA?",
            options: [
              "Every smartphone owner",
              "All university students",
              "Anyone who uses mobile money",
              "Cybersecurity service providers",
            ],
            answer_index: 3,
            explanation: "Section 49 requires cybersecurity service providers to be licensed.",
          },
          {
            prompt: "Where does CERT GH list its current reporting channels?",
            options: [
              "In a chain message shared on social media",
              "On the CSA's official report page at csa.gov.gh/report",
              "On the back of mobile money receipts",
              "Only in printed newspapers",
            ],
            answer_index: 1,
            explanation: "The CSA's official report page lists the current channels, including a short code, WhatsApp, email, an app and an online form.",
          },
          {
            prompt: "If you later offer penetration testing or forensics to clients, what should you do first?",
            options: [
              "Start immediately and register later",
              "Check the CSA's current licensing and accreditation rules",
              "Ask a friend if it is allowed",
              "Only work for clients outside Ghana",
            ],
            answer_index: 1,
            explanation: "Selling cybersecurity services in Ghana falls under CSA licensing and accreditation.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "frameworks-standards": {
      explanation_md: `## Why this matters

Adverts from Ghanaian banks and audit firms mention ISO/IEC 27001, PCI DSS, the Bank of Ghana's Cyber and Information Security Directive, the CSA's CII Directive, NIST frameworks and MITRE ATT&CK. Senior roles ask for deep knowledge, but even juniors are expected to know what each one is for. Understanding them helps you see why your team does what it does.

## The NIST Cybersecurity Framework 2.0

Published by the US National Institute of Standards and Technology and used worldwide, the CSF 2.0 organises security into six functions:

* **Govern:** set strategy, roles and policies.
* **Identify:** know your assets, risks and suppliers.
* **Protect:** controls such as access management, training and data security.
* **Detect:** find attacks and unusual activity.
* **Respond:** act on incidents.
* **Recover:** restore normal operations.

It is a useful map: every lesson in this track fits under one of these functions.

## ISO/IEC 27001

An international standard for an **information security management system (ISMS)**: a structured way for an organisation to manage security risks, set policies, apply controls and keep improving. Organisations can be audited and certified against it. Bank and fintech adverts in Ghana mention it often, and juniors frequently help collect evidence for audits.

## PCI DSS

The **Payment Card Industry Data Security Standard** applies to organisations that store, process or transmit payment card data. Fintechs and banks handling card payments must follow it. It covers things like protecting card data, restricting access, monitoring and regular testing.

## Sector directives in Ghana

The **Bank of Ghana's Cyber and Information Security Directive** sets cyber requirements for the institutions it regulates. The **CSA's CII Directive** sets requirements for owners of critical information infrastructure. Both appear in Ghanaian job adverts. If you join a bank or a CII sector organisation, ask for the parts that apply to your role.

## MITRE ATT&CK

A free knowledge base describing how attackers behave, organised into tactics (their goals, such as gaining initial access) and techniques (how they do it, such as phishing). SOC teams use it to label alerts and check which attacker behaviours they can detect.

## A small example

Amina is preparing for an interview with a Ghanaian fintech. The advert mentions PCI DSS and ISO 27001. She prepares one plain sentence on each: "PCI DSS protects card payment data; ISO 27001 is a management system for running security across the whole organisation." When the interviewer asks, she adds an example of each from this track. The panel notes that she understands purpose, not just names.

## Keep it practical

You do not need to read every standard in full now. Learn what each is for, and when your employer follows one, read the parts that apply to your job.`,
      practice_task_md: `**Goal:** map this track to the NIST CSF 2.0 functions.

1. Make a table with six columns: Govern, Identify, Protect, Detect, Respond, Recover.
2. Place at least twelve lessons or practice tasks from this track under the function they fit best.
3. Write one plain sentence each for ISO/IEC 27001, PCI DSS and MITRE ATT&CK as you would say it in an interview.
4. Find one Ghanaian security job advert (on any public job board) and note which standards it mentions. Do not copy the advert text.

**Done looks like:** a filled six column table, three interview sentences and a short note on one advert.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is one of the six functions of NIST CSF 2.0?",
            options: [
              "Advertise",
              "Purchase",
              "Celebrate",
              "Govern",
            ],
            answer_index: 3,
            explanation: "The six functions are Govern, Identify, Protect, Detect, Respond and Recover.",
          },
          {
            prompt: "What is ISO/IEC 27001 about?",
            options: [
              "An information security management system for the whole organisation",
              "Payment card data only",
              "A list of attacker techniques",
              "Ghana's data protection law",
            ],
            answer_index: 0,
            explanation: "ISO/IEC 27001 is a standard for managing information security across an organisation.",
          },
          {
            prompt: "Which organisations must follow PCI DSS?",
            options: [
              "Only schools",
              "Only government ministries",
              "Organisations that store, process or transmit payment card data",
              "Every person with a smartphone",
            ],
            answer_index: 2,
            explanation: "PCI DSS applies wherever payment card data is handled.",
          },
          {
            prompt: "In MITRE ATT&CK, what is a tactic?",
            options: [
              "A type of antivirus",
              "A Ghanaian directive",
              "A backup method",
              "An attacker's goal, such as gaining initial access",
            ],
            answer_index: 3,
            explanation: "Tactics are attacker goals; techniques are how they achieve them.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "job-ready": {
      explanation_md: `## Why this matters

Security employers in Ghana and remote employers abroad want evidence that you can do the work: investigate an alert, write a clear note, explain a risk, behave ethically. Certificates can help, but proof of practice and good communication carry great weight. This section helps you get there on modest hardware and a tight budget.

## An honest picture of entry routes

Look at junior security adverts and you will notice that many "entry level" roles still ask for some IT experience. That is why this track builds on IT support. Common routes in include:

* **IT support or help desk** roles where you take on security tasks, then move into a security team.
* **National service or internships** in IT, IT audit or technology risk units at banks, telcos, government bodies and audit firms.
* **Fraud monitoring or operations** roles at telcos and fintechs, where knowledge of MoMo fraud and SIM swap is directly useful.
* **Level 1 SOC analyst** roles at companies running their own SOC or at managed security providers, sometimes remote.

Some cohort based programmes and microdegree schemes in Ghana include cybersecurity. This roadmap can help you prepare for their applications and get more from them if you are accepted.

## The three topics in this section

* **A low cost practice lab:** where and how to practise legally, what works on a phone and what needs a computer.
* **Entry certifications:** what the common beginner options cover, so you can choose one that fits, if you want one.
* **Your portfolio and first security role:** turning your practice into evidence and finding real openings.

## Keep building your journal

If you have followed the practice tasks, you already have: a code of conduct, a risk register, a phishing analysis, a ransomware checklist, triage notes, an incident playbook and an awareness talk. That is the start of a real portfolio.

## A small example

Sumaila finished IT support training and works at a computer shop in Tamale. He does not yet have a laptop powerful enough for virtual machines. He uses his phone for browser based security lessons and spends two evenings a week at a community centre computer for hands on labs. He writes up each lab in his journal. Six months later, he applies for a national service post in a bank's IT unit and brings three short write ups to the interview. The panel asks about one in detail, and he explains it confidently.

## Mind your safety and your money

Be careful of offers that promise a guaranteed security job in exchange for a fee, or "hacking courses" that teach attacking real systems. Genuine employers do not ask you to pay to be hired, and legitimate training stays within the law.`,
      practice_task_md: `**Goal:** write your personal plan for getting job ready.

1. List the devices you have access to (phone, shared computer, own laptop) and when you can use them.
2. Choose one entry route from the lesson that fits you best and explain why in two sentences.
3. Set three goals for the next eight weeks, such as completing two lab write ups, delivering an awareness talk and drafting a CV.
4. Note one free place near you with computers, such as a school ICT lab, public library or community centre, and when it is open.

**Done looks like:** a one page plan with devices, route, three goals and a practice location, saved in your journal.`,
      quiz: {
        questions: [
          {
            prompt: "Why does this track build on IT support?",
            options: [
              "Because security has nothing to do with computers",
              "Because IT support pays the same as security",
              "Because many entry security roles still ask for some IT experience",
              "Because certificates are not allowed in security",
            ],
            answer_index: 2,
            explanation: "Many junior security adverts expect IT experience, so IT support is a common entry route.",
          },
          {
            prompt: "Which is listed as a common route into security?",
            options: [
              "Selling hacking services online",
              "Fraud monitoring at a telco or fintech",
              "Testing your neighbour's Wi Fi",
              "Buying a guaranteed job offer",
            ],
            answer_index: 1,
            explanation: "Fraud monitoring roles use knowledge of MoMo fraud and SIM swap directly.",
          },
          {
            prompt: "How did Sumaila practise without a powerful laptop?",
            options: [
              "He used browser lessons on his phone and a community centre computer for labs",
              "He gave up on labs",
              "He used his employer's customers' computers",
              "He bought an expensive course",
            ],
            answer_index: 0,
            explanation: "He combined phone learning with planned sessions on a community computer.",
          },
          {
            prompt: "What should you think about an offer of a guaranteed security job in exchange for a fee?",
            options: [
              "It is a normal part of hiring",
              "Pay quickly before the offer ends",
              "Be careful: genuine employers do not ask you to pay to be hired",
              "It is required by the CSA",
            ],
            answer_index: 2,
            explanation: "Paying to be hired is a warning sign of a scam.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "home-lab": {
      explanation_md: `## Why this matters

Employers want to hear what you have practised. A lab is a safe, legal place to try tools, break things and learn from mistakes without harming anyone. Remember the rule from the ethics lesson: practise only on systems you own or on platforms built for learning.

## Honest talk about hardware

Real security labs work best on a **computer**. Virtual machines (VMs), Wireshark and SIEM practice all need one. A laptop with more memory runs virtual machines more smoothly, but you can start with what you have.

If you only have a phone, you can still make real progress:

* **Browser based learning platforms** such as TryHackMe offer guided rooms, some free, that run in a browser. A tablet or larger phone helps.
* **Cisco Networking Academy** free courses, including Introduction to Cybersecurity and Linux Unhatched, which has a browser terminal.
* **OverTheWire Bandit**, a legal text based wargame for learning Linux, played through a free SSH app.
* **Reading practice:** the log, alert and phishing exercises in this track only need a screen.

For hands on computer work, use a **school ICT lab, public library or community centre**, with permission from whoever runs it, and never change their settings or install tools without approval.

## Saving data

Labs can use a lot of data. To keep costs down:

* Download large files, such as Linux installation images, on free or shared Wi Fi at a library, school or workplace that allows it.
* Choose lighter Linux versions when your computer is old.
* Prefer text based exercises like Bandit, which use very little data.
* Write your notes offline and upload when you have Wi Fi.

## A simple computer lab

If you have a laptop:

1. Install **VirtualBox**, a free program that runs virtual computers inside your computer.
2. Create a Linux virtual machine. Take a **snapshot** so you can roll back if something breaks.
3. Practise the Linux commands from this track, read the system's own logs and generate your own failed logins to find them.
4. Keep the lab isolated: do not point any tools at other people's devices or networks.

## Write up everything

A lab is only half useful if you forget it. For each session, write: the goal, what you did, what you found, what went wrong and what you learned. Screenshots help. These write ups become portfolio pieces.

## A small example

Mariama has an old laptop that struggles with large programs. She installs a light Linux version in VirtualBox using the library's Wi Fi, takes a snapshot, then practises reading the login log after deliberately mistyping her own password several times. She writes a one page report of how she found the failed attempts. Total data cost from her own bundle: almost nothing.`,
      practice_task_md: `**Goal:** complete and write up your first lab session.

**Phone path:** complete the first three levels of OverTheWire Bandit using a free SSH app, or the first module of Cisco's free Introduction to Cybersecurity course.

**Computer path:** install VirtualBox, create a Linux virtual machine, take a snapshot, mistype your password three times at the login prompt, then find those failures in the logs.

For either path, write a lab report with: goal, steps, findings, problems and lessons learned, plus one screenshot.

**Done looks like:** a one page lab report you can show a mentor or interviewer. Only practise on your own device or learning platforms.`,
      quiz: {
        questions: [
          {
            prompt: "Where is it legal to practise security tools?",
            options: [
              "On systems you own or platforms built for learning",
              "On any network with weak security",
              "On a library's computers without asking",
              "On a friend's phone without telling them",
            ],
            answer_index: 0,
            explanation: "Practise only on your own systems or learning platforms built for it.",
          },
          {
            prompt: "What is a snapshot in VirtualBox useful for?",
            options: [
              "Taking photos with your webcam",
              "Speeding up your internet",
              "Encrypting your phone",
              "Rolling back a virtual machine if something breaks",
            ],
            answer_index: 3,
            explanation: "A snapshot saves the VM's state so you can return to it.",
          },
          {
            prompt: "Which is a good way to save mobile data when building a lab?",
            options: [
              "Stream videos while downloading",
              "Download large installation files on free Wi Fi at a library or school that allows it",
              "Download every tool you can find",
              "Reinstall the VM every day",
            ],
            answer_index: 1,
            explanation: "Using allowed free Wi Fi for large downloads keeps bundle costs low.",
          },
          {
            prompt: "Which practice option works on a phone through a free SSH app?",
            options: [
              "VirtualBox",
              "OverTheWire Bandit",
              "Wireshark capture",
              "A full SIEM install",
            ],
            answer_index: 1,
            explanation: "Bandit is a text based wargame you can play over SSH.",
          },
          {
            prompt: "What should every lab write up include?",
            options: [
              "Only the final screenshot",
              "Your passwords",
              "A copy of a job advert",
              "Goal, steps, findings, problems and lessons learned",
            ],
            answer_index: 3,
            explanation: "A full write up shows your thinking and becomes a portfolio piece.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "entry-certifications": {
      explanation_md: `## Why this matters

Ghanaian and remote security adverts often name certifications. Senior roles ask for certifications such as CISSP, CISM or CISA, which require years of experience. Junior and mid level adverts mention options such as CompTIA Security+ as an advantage, and remote Level 1 SOC adverts sometimes list Security+ or similar as desirable. A beginner certificate will not replace skills, but it can help a CV get noticed. This topic is optional: you can become job ready without one.

## Common entry options

These are listed as examples, not recommendations. Check each provider's official page for current content, cost and any financial aid before deciding.

* **ISC2 Certified in Cybersecurity (CC):** an entry level certification that ISC2 says requires no work experience. Its outline covers security principles, security governance, identity and access management concepts, networking and cloud security concepts, and security operations and incident response.
* **CompTIA Security+:** a widely recognised, vendor neutral certification aimed at roles such as security analyst. CompTIA updates it periodically, and its site announced a new version for late 2026, so check which version you would study for.
* **Google Cybersecurity Certificate:** a beginner programme on Coursera covering security foundations, networks, Linux and SQL, SIEM tools, detection and response, and Python. Coursera charges a subscription, though financial aid may be available.
* **Microsoft Security, Compliance, and Identity Fundamentals (SC 900):** a fundamentals exam focused on Microsoft's security and identity services, useful where employers use Microsoft systems.
* **Cisco Networking Academy Introduction to Cybersecurity:** a free introductory course, a good first step before any paid exam.

## How to choose

Ask yourself:

* **What do adverts I am interested in mention?** Read several and count.
* **What can I afford, including retakes?** Do not borrow money for an exam under pressure.
* **What will I learn?** Choose the one whose content fills your gaps.
* **Do I have the basics?** Most people do better after IT support and networking basics.

## Avoid traps

* Be wary of "exam dumps" that share real exam questions; they break the providers' rules and can lead to your certificate being withdrawn.
* Be careful of unofficial sellers offering discounted vouchers.
* A certificate without practice is weak evidence; pair it with lab write ups.

## A small example

Abdul-Rahman reads ten security adverts and notices that Security+ appears in several junior and mid level ones. He cannot afford the exam yet, so he completes Cisco's free introductory course first, then works through a free study plan while saving. He keeps doing labs throughout. When he finally sits the exam, his lab write ups mean he understands the topics rather than memorising answers.`,
      practice_task_md: `**Goal:** make an informed certification decision.

1. Find five security job adverts you would apply for (Ghana or remote). Do not copy their text.
2. Record which certifications each mentions and whether they are required or an advantage.
3. Visit the official pages of two entry options from the lesson and note what each covers and its current cost in your journal.
4. Write a short decision: which one (if any) you will pursue, why, and a realistic timeline and savings plan.

**Done looks like:** a small table of adverts and certifications, plus a half page decision. It is fine to decide "not yet".`,
      quiz: {
        questions: [
          {
            prompt: "According to ISC2, what work experience does Certified in Cybersecurity (CC) require?",
            options: [
              "None",
              "Five years",
              "Two years in a SOC",
              "A university degree in security",
            ],
            answer_index: 0,
            explanation: "ISC2 describes CC as entry level with no work experience required.",
          },
          {
            prompt: "Which certifications do Ghanaian adverts typically ask for in senior roles?",
            options: [
              "A driving licence only",
              "A typing certificate",
              "CISSP, CISM or CISA",
              "No certifications ever",
            ],
            answer_index: 2,
            explanation: "Senior adverts name certifications such as CISSP, CISM and CISA, which need years of experience.",
          },
          {
            prompt: "Why should you avoid exam dumps?",
            options: [
              "They are too expensive",
              "They only work for networking exams",
              "They require a laptop",
              "They break the providers' rules and can lead to your certificate being withdrawn",
            ],
            answer_index: 3,
            explanation: "Using real leaked questions breaks the rules and risks your certification.",
          },
          {
            prompt: "Which option in the lesson is a free introductory course?",
            options: [
              "CISSP",
              "CISM",
              "Cisco Networking Academy Introduction to Cybersecurity",
              "PCI DSS",
            ],
            answer_index: 2,
            explanation: "Cisco's Introduction to Cybersecurity is a free introductory course, a good first step before any paid exam.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "portfolio-job-search": {
      explanation_md: `## Why this matters

Security roles in Ghana are concentrated in banks, telcos, fintechs, audit firms, managed security providers and government bodies, mostly in Accra, with some IT roles in regional offices. Remote roles exist, but many are restricted to certain countries. A clear portfolio and a focused search help you stand out wherever you apply.

## Build a simple portfolio

Choose your best five or six pieces from this track and present them neatly:

* A **phishing analysis** of real or invented messages.
* **Triage notes** for several alerts.
* An **incident response playbook** for one scenario.
* A **vulnerability prioritisation** table.
* A **lab write up** with screenshots.
* An **awareness talk** you delivered, with a reflection.

Host them in a free Google Drive folder with view only sharing, or on a free GitHub repository as Markdown files. Remove all real names, numbers, passwords and anything from a real employer. Never publish details of a real organisation's weaknesses.

## Write a security focused CV

* Lead with relevant skills: networking, Windows and Linux, log analysis, phishing analysis, incident documentation, security awareness.
* Show IT support experience, including any security tasks, such as resetting compromised accounts or removing malware.
* Link to your portfolio.
* Keep it to one or two pages and tailor it to each advert.

## Where to look

* Public job boards in Ghana, searching for terms such as "security analyst", "information security", "SOC", "IT risk" and "fraud".
* Careers pages of banks, telcos, fintechs and audit firms, including national service and internship openings in IT, IT audit and technology risk.
* Remote job boards, checking carefully that a role accepts applicants based in Ghana before applying.

## Interview preparation

Expect questions like "explain the CIA triad", "what would you do if a staff member clicked a phishing link?", "what is the difference between a vulnerability and a threat?" and "tell me about a lab you did". Practise answering out loud using your portfolio as examples. Be honest about what you do not know yet and explain how you would find out.

## Watch for fake offers

Scammers target job seekers too. Be careful of offers that arrive without an interview, ask for a fee, or ask you to receive and forward money. Check the company's official website and contact details.

## A small example

Wumpini applies for a national service post in a telco's IT security unit. Her CV lists her IT support experience and links to a Drive folder with four write ups. At the interview she is asked how she would handle a suspicious email. She walks through her phishing analysis step by step. She is offered the post, and her supervisor later says the portfolio showed she could already think like an analyst.`,
      practice_task_md: `**Goal:** assemble your portfolio and a tailored CV.

1. Choose your best five pieces of work from this track and tidy them: clear title, date, goal, method, findings.
2. Remove any real names, numbers or employer details. Put them in a view only Google Drive folder or a free GitHub repository.
3. Write or update a one page CV focused on security skills, linking to the portfolio.
4. Find one real junior role (Ghana or remote) and write three sentences on how your portfolio matches its requirements. Do not copy the advert.
5. Ask a mentor to review your CV and portfolio and note their feedback.

**Done looks like:** a shareable portfolio link, a tailored CV and mentor feedback recorded in your journal.`,
      quiz: {
        questions: [
          {
            prompt: "What must you remove before publishing your portfolio?",
            options: [
              "All screenshots",
              "Real names, numbers, passwords and details of real organisations' weaknesses",
              "Your own name",
              "The dates of your work",
            ],
            answer_index: 1,
            explanation: "Portfolios must not expose real people's data or real organisations' weaknesses.",
          },
          {
            prompt: "What should you check before applying for a remote security role?",
            options: [
              "That the role accepts applicants based in Ghana",
              "That the company has a nice logo",
              "That the advert is very short",
              "That no interview is required",
            ],
            answer_index: 0,
            explanation: "Many remote roles are restricted to certain countries.",
          },
          {
            prompt: "Which is a warning sign of a fake job offer?",
            options: [
              "It includes an interview",
              "It lists the company's official website",
              "It asks you to pay a fee or forward money",
              "It describes the duties clearly",
            ],
            answer_index: 2,
            explanation: "Fees and forwarding money are common signs of job scams.",
          },
          {
            prompt: "How did Wumpini answer the question about a suspicious email?",
            options: [
              "She walked through her phishing analysis step by step",
              "She said she would forward it to everyone",
              "She said she had never seen one",
              "She guessed",
            ],
            answer_index: 0,
            explanation: "Using her portfolio piece showed she could already think like an analyst.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
