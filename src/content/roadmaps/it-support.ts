import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve (October 2026). */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const gcfTroubleshooting = r(
  "GCFGlobal: Basic troubleshooting techniques",
  "https://edu.gcfglobal.org/en/computerbasics/basic-troubleshooting-techniques/1/",
);
const gcfInside = r("GCFGlobal: Inside a computer", "https://edu.gcfglobal.org/en/computerbasics/inside-a-computer/1/");
const gcfSetup = r("GCFGlobal: Setting up a computer", "https://edu.gcfglobal.org/en/computerbasics/setting-up-a-computer/1/");
const gcfOs = r(
  "GCFGlobal: Understanding operating systems",
  "https://edu.gcfglobal.org/en/computerbasics/understanding-operating-systems/1/",
);
const gcfBackup = r("GCFGlobal: Backing up your files", "https://edu.gcfglobal.org/en/computerbasics/backing-up-your-files/1/");
const gcfProtect = r(
  "GCFGlobal: Protecting your computer",
  "https://edu.gcfglobal.org/en/computerbasics/protecting-your-computer/1/",
);
const gcfConnect = r(
  "GCFGlobal: Connecting to the internet",
  "https://edu.gcfglobal.org/en/computerbasics/connecting-to-the-internet/1/",
);
const messerAplus = r(
  "Professor Messer: free CompTIA A+ training videos",
  "https://www.professormesser.com/free-a-plus-training/220-1201-1202/",
  "video",
);
const netacad = r("Cisco Networking Academy", "https://www.netacad.com/", "practice");
const msWindowsHelp = r("Microsoft Support: Windows help", "https://support.microsoft.com/en-us/windows");
const msPrinter = r(
  "Microsoft Support: Fix printer connection and printing problems",
  "https://support.microsoft.com/en-us/windows/fix-printer-connection-and-printing-problems-in-windows-fb830bff-7702-6349-33cd-9443fe987f73",
);
const msWifi = r(
  "Microsoft Support: Fix wireless connection issues in Windows",
  "https://support.microsoft.com/en-us/windows/fix-wi-fi-connection-issues-in-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c",
);
const msBackup = r(
  "Microsoft Support: Back up your Windows PC",
  "https://support.microsoft.com/en-us/windows/back-up-your-windows-pc-87a81f8a-78fa-456e-b521-ac0560e32338",
);
const msIpconfig = r(
  "Microsoft Learn: ipconfig command",
  "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig",
);
const msPing = r(
  "Microsoft Learn: ping command",
  "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping",
);
const msEntra = r("Microsoft Learn: What is Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/fundamentals/whatis");
const msLearn = r("Microsoft Learn training (free)", "https://learn.microsoft.com/en-us/training/", "practice");
const ubuntuCli = r(
  "Ubuntu tutorial: The Linux command line for beginners",
  "https://ubuntu.com/tutorials/command-line-for-beginners",
  "practice",
);
const ubuntuInstall = r("Ubuntu tutorial: Install Ubuntu Desktop", "https://ubuntu.com/tutorials/install-ubuntu-desktop");
const redhatLinux = r("Red Hat: What is Linux", "https://www.redhat.com/en/topics/linux/what-is-linux");
const androidHelp = r("Android Help Center", "https://support.google.com/android/");
const androidWifi = r(
  "Android Help: Connect to wireless networks",
  "https://support.google.com/android/answer/9075847",
);
const androidBackup = r("Android Help: Back up or restore data", "https://support.google.com/android/answer/2819582");
const androidFind = r("Android Help: Find, lock or erase a lost device", "https://support.google.com/android/answer/6160491");
const mdnInternet = r(
  "MDN: How does the Internet work",
  "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work",
);
const khanInternet = r(
  "Khan Academy: Computers and the Internet",
  "https://www.khanacademy.org/computing/computers-and-internet",
  "video",
);
const fccNetworking = r(
  "freeCodeCamp: Computer networking fundamentals",
  "https://www.freecodecamp.org/news/computer-networking-fundamentals/",
);
const fccDns = r("freeCodeCamp: What is DNS", "https://www.freecodecamp.org/news/what-is-dns/");
const googlePassword = r("Google Account Help: Create a strong password", "https://support.google.com/accounts/answer/32040");
const google2sv = r("Google Account Help: Turn on 2 Step Verification", "https://support.google.com/accounts/answer/185839");
const cisaPasswords = r("CISA: Use strong passwords", "https://www.cisa.gov/secure-our-world/use-strong-passwords");
const cisaPhishing = r("CISA: Recognise and report phishing", "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing");
const cisaUpdates = r("CISA: Update software", "https://www.cisa.gov/secure-our-world/update-software");
const ghanaCsa = r("Cyber Security Authority, Ghana", "https://www.csa.gov.gh/");
const googleForms = r("Google Forms help: How to use Google Forms", "https://support.google.com/docs/answer/6281888", "practice");
const wikiSurge = r("Wikipedia: Surge protector", "https://en.wikipedia.org/wiki/Surge_protector");
const wikiUps = r("Wikipedia: Uninterruptible power supply", "https://en.wikipedia.org/wiki/Uninterruptible_power_supply");
const comptiaAplus = r("CompTIA A+ certification page", "https://www.comptia.org/en-us/certifications/a/");
const comptiaNetwork = r("CompTIA Network+ certification page", "https://www.comptia.org/en-us/certifications/network/");
const googleItSupport = r(
  "Google IT Support Professional Certificate (Coursera)",
  "https://www.coursera.org/professional-certificates/google-it-support",
);
const awsRestart = r("AWS re/Start programme", "https://aws.amazon.com/training/restart/");

export const itSupport: RoadmapDraft = {
  slug: "it-support",
  title: "IT Support and Networking",
  description:
    "Keep computers, phones, printers and networks working for schools, banks, NGOs, shops and offices. Learn hardware, Windows, Linux and Android, networks, accounts, security and backups, plus the calm troubleshooting and customer care that help desk jobs ask for, and the route on to cybersecurity and cloud.",
  track: "it-support",
  field_category: "infrastructure",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "it-support-job",
      title: "The IT support job",
      summary:
        "IT support people keep an organisation's computers, phones and networks working and help staff when something breaks. This section covers the roles, the troubleshooting method and the customer care every role shares.",
      parent: null,
      optional: false,
      resources: [RES.lfComputer, googleItSupport],
    },
    {
      slug: "it-support-roles",
      title: "IT support roles in Ghana",
      summary:
        "Help desk officers, desktop support technicians, school lab technicians and NOC engineers all start from the same foundations. Learn what each role does day to day and what first line and second line support mean.",
      parent: "it-support-job",
      optional: false,
      resources: [googleItSupport],
    },
    {
      slug: "troubleshooting-method",
      title: "The troubleshooting method",
      summary:
        "Good technicians fix problems by following steps, not by guessing. Learn to gather facts, form a theory, test it, fix, verify and write down what you did.",
      parent: "it-support-job",
      optional: false,
      resources: [gcfTroubleshooting, messerAplus],
    },
    {
      slug: "tickets-and-customer-care",
      title: "Tickets, service levels and customer care",
      summary:
        "Every request should become a ticket with a clear description, priority and record of what was done. Learn to talk to stressed users with patience, explain fixes simply and meet agreed response times.",
      parent: "it-support-job",
      optional: false,
      resources: [googleForms, RES.lfCommunication],
    },
    {
      slug: "hardware",
      title: "Computer hardware",
      summary:
        "Before you can fix a computer you need to know what is inside it and how the parts work together. This section covers components, maintenance and upgrades, power protection and printers.",
      parent: null,
      optional: false,
      resources: [gcfInside, messerAplus],
    },
    {
      slug: "computer-components",
      title: "Inside a computer",
      summary:
        "Learn what the processor, memory, storage, motherboard, power supply and ports each do. Knowing the parts lets you read a specification sheet and guess which part is failing.",
      parent: "hardware",
      optional: false,
      resources: [gcfInside, gcfSetup],
    },
    {
      slug: "maintenance-and-upgrades",
      title: "Maintenance, repairs and upgrades",
      summary:
        "Dust, heat and old hard drives cause many slow or failing computers in Ghanaian offices and labs. Learn safe cleaning, preventive maintenance, and the two upgrades that most often save an old machine.",
      parent: "hardware",
      optional: false,
      resources: [messerAplus, gcfInside],
    },
    {
      slug: "power-protection",
      title: "Power, surges and protection in Ghana",
      summary:
        "Outages and surges when power returns damage equipment and corrupt files. Learn the difference between a surge protector, a voltage stabiliser and a UPS, and how to set up a safe workstation.",
      parent: "hardware",
      optional: false,
      resources: [wikiSurge, wikiUps],
    },
    {
      slug: "printers-and-peripherals",
      title: "Printers and peripherals",
      summary:
        "Printers, scanners and copiers are behind many everyday office support calls. Learn how they connect, how to install and share them, and how to clear the most common faults.",
      parent: "hardware",
      optional: false,
      resources: [msPrinter],
    },
    {
      slug: "operating-systems",
      title: "Operating systems",
      summary:
        "Most office computers run Windows, servers often run Linux and almost every staff phone runs Android. This section teaches you to support all three.",
      parent: null,
      optional: false,
      resources: [gcfOs],
    },
    {
      slug: "windows-support",
      title: "Supporting Windows",
      summary:
        "Learn the Windows tools a technician uses every day: Settings, Task Manager, Device Manager, updates and installing software safely. You will also learn when to repair and when to reinstall.",
      parent: "operating-systems",
      optional: false,
      resources: [msWindowsHelp, messerAplus],
    },
    {
      slug: "linux-basics",
      title: "Linux basics and the command line",
      summary:
        "Linux runs many servers, routers and cloud systems, so support roles increasingly expect the basics. Learn files, folders, users and a handful of commands you will use again and again.",
      parent: "operating-systems",
      optional: false,
      resources: [ubuntuCli, redhatLinux, ubuntuInstall],
    },
    {
      slug: "android-and-mobile",
      title: "Android phones and mobile devices",
      summary:
        "Staff phones carry work email, MoMo, WhatsApp and field data apps, so phone support is part of the job. Learn accounts, storage, updates, backups and what to do when a phone is lost.",
      parent: "operating-systems",
      optional: false,
      resources: [androidHelp, androidFind],
    },
    {
      slug: "networking",
      title: "Networks",
      summary:
        "Almost every complaint that starts with the system is down turns out to be a network question. This section covers addresses, names, wireless, routers and the tools that find faults.",
      parent: null,
      optional: false,
      resources: [mdnInternet, khanInternet, netacad],
    },
    {
      slug: "ip-addresses",
      title: "IP addresses and DHCP",
      summary:
        "Every device on a network needs an address, and a router usually hands them out automatically. Learn private and public addresses, the gateway and why two devices with the same address both fail.",
      parent: "networking",
      optional: false,
      resources: [fccNetworking, msIpconfig],
    },
    {
      slug: "dns",
      title: "DNS and how names find servers",
      summary:
        "DNS turns names like a bank's website into the addresses computers use. Learn how it works and how to spot a DNS problem when the internet seems to work for some things but not others.",
      parent: "networking",
      optional: false,
      resources: [fccDns, mdnInternet],
    },
    {
      slug: "wifi-and-routers",
      title: "Wireless, routers and cabling",
      summary:
        "Learn how a small office network fits together: modem or fibre box, router, switch, access points and cables. You will also learn to secure a wireless network and improve weak coverage.",
      parent: "networking",
      optional: false,
      resources: [androidWifi, msWifi, gcfConnect],
    },
    {
      slug: "network-troubleshooting",
      title: "Finding network faults",
      summary:
        "Work from the cable outwards with a few simple tools to find where a connection breaks. Learn to use ping, ipconfig and a traceroute, and to read what they tell you.",
      parent: "networking",
      optional: false,
      resources: [msPing, msIpconfig],
    },
    {
      slug: "accounts-and-security",
      title: "Accounts, security and data",
      summary:
        "Protecting people's accounts and data is now part of every support job. This section covers user accounts and access, everyday security and backups.",
      parent: null,
      optional: false,
      resources: [gcfProtect, ghanaCsa],
    },
    {
      slug: "accounts-and-access",
      title: "User accounts, passwords and access",
      summary:
        "Learn how organisations manage staff accounts centrally, why each person should have only the access they need, and how to reset passwords safely. Microsoft 365 and directory services appear in many Ghanaian adverts.",
      parent: "accounts-and-security",
      optional: false,
      resources: [msEntra, googlePassword, google2sv],
    },
    {
      slug: "security-basics",
      title: "Everyday security for support staff",
      summary:
        "Malware, phishing and unpatched software cause most of the incidents a technician sees. Learn to prevent, spot and respond to them, and to teach staff to do the same.",
      parent: "accounts-and-security",
      optional: false,
      resources: [cisaPhishing, cisaUpdates, cisaPasswords],
    },
    {
      slug: "backups",
      title: "Backups and recovery",
      summary:
        "Hard drives fail, phones get stolen and ransomware locks files, so a tested backup is what saves the day. Learn the three copies rule and how to back up computers and phones cheaply.",
      parent: "accounts-and-security",
      optional: false,
      resources: [gcfBackup, androidBackup, msBackup],
    },
    {
      slug: "career-routes",
      title: "Getting hired and growing",
      summary:
        "Employers want proof you can fix real problems, plus a qualification they recognise. This section covers diplomas and certifications, building experience and where IT support can lead.",
      parent: null,
      optional: false,
      resources: [RES.lfJobsearch, RES.lfResume],
    },
    {
      slug: "qualifications",
      title: "Diplomas and entry certifications",
      summary:
        "Learn the local routes, from technical university diplomas to private hardware and networking courses, and the widely recognised entry certifications. Understand what each one proves so you can choose wisely.",
      parent: "career-routes",
      optional: false,
      resources: [comptiaAplus, comptiaNetwork, googleItSupport],
    },
    {
      slug: "first-job",
      title: "Building experience and your first role",
      summary:
        "Experience can start before your first job: a school lab, a church office, a relative's shop or national service. Learn to keep a fix log, build a small portfolio and handle a technical interview.",
      parent: "career-routes",
      optional: false,
      resources: [RES.lfInterview, RES.lfResume],
    },
    {
      slug: "next-steps",
      title: "Next steps: cybersecurity, networking and cloud",
      summary:
        "IT support is a strong base for security, network engineering and cloud careers. Learn what each path adds and how to start moving towards it while you work.",
      parent: "career-routes",
      optional: false,
      resources: [awsRestart, netacad, msLearn],
    },
  ],
};
