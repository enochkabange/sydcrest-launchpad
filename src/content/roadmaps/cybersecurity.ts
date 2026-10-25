import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Track specific links not in the shared pool; each checked to resolve
 * (25 October 2026). Sources and the coverage table are in
 * src/content/research/cybersecurity.md.
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const csaHome = r("Cyber Security Authority, Ghana", "https://www.csa.gov.gh/");
const csaReport = r("CSA: Report a cybersecurity incident", "https://www.csa.gov.gh/report");
const csaCii = r("CSA: Critical information infrastructure", "https://www.csa.gov.gh/cii");
const csaWhatsappAlert = r("CERT GH alert: WhatsApp account takeovers", "https://csa.gov.gh/cert-gh-alert27.php");
const bogFraudNotice = r(
  "Bank of Ghana: Digital fraud press release (October 2026)",
  "https://www.bog.gov.gh/wp-content/uploads/2026/10/PRESS-RELEASE-DIGITAL-FRAUD-AND-THE-COST-OF-IGNORANCE-071026.pdf",
);
const act772 = r(
  "Electronic Transactions Act, 2008 (Act 772), CSA copy",
  "https://csa.gov.gh/resources/Electronic%20Transactions%20Act.pdf",
);
const netacadIntro = r("Cisco Networking Academy: Introduction to Cybersecurity (free)", "https://www.netacad.com/courses/introduction-to-cybersecurity", "practice");
const netacadNetworking = r("Cisco Networking Academy: Networking Basics (free)", "https://www.netacad.com/courses/networking-basics", "practice");
const netacadLinux = r("Cisco Networking Academy: Linux Unhatched (free)", "https://www.netacad.com/courses/linux-unhatched", "practice");
const packetTracer = r("Cisco Packet Tracer (free with an account)", "https://www.netacad.com/courses/packet-tracer", "practice");
const tryhackme = r("TryHackMe (browser labs, free tier)", "https://tryhackme.com/", "practice");
const bandit = r("OverTheWire: Bandit wargame", "https://overthewire.org/wargames/bandit/", "practice");
const ubuntuCli = r("Ubuntu: The Linux command line for beginners", "https://ubuntu.com/tutorials/command-line-for-beginners", "practice");
const wiresharkGuide = r("Wireshark user guide", "https://www.wireshark.org/docs/wsug_html_chunked/");
const windowsSecurity = r("Microsoft Learn: Windows security", "https://learn.microsoft.com/en-us/windows/security/");
const nistCsf = r("NIST Cybersecurity Framework (CSF 2.0)", "https://www.nist.gov/cyberframework");
const nistIr = r("NIST SP 800 61 Rev. 3: Incident response recommendations", "https://csrc.nist.gov/pubs/sp/800/61/r3/final");
const ncscIncident = r("NCSC: Incident management", "https://www.ncsc.gov.uk/collection/incident-management");
const ncscPhishing = r("NCSC: Phishing scams, how to spot and report them", "https://www.ncsc.gov.uk/collection/phishing-scams");
const ncscTips = r("NCSC: Top tips for staying secure online", "https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online");
const cisaMfa = r("CISA: Multifactor authentication", "https://www.cisa.gov/topics/cybersecurity-best-practices/multifactor-authentication");
const cisaRansomware = r("CISA: StopRansomware", "https://www.cisa.gov/stopransomware");
const cisaKev = r("CISA: Known exploited vulnerabilities catalog", "https://www.cisa.gov/known-exploited-vulnerabilities-catalog");
const nvd = r("NIST National Vulnerability Database", "https://nvd.nist.gov/");
const cvss = r("FIRST: Common Vulnerability Scoring System", "https://www.first.org/cvss/");
const mitreAttack = r("MITRE ATT&CK", "https://attack.mitre.org/");
const virustotal = r("VirusTotal (check a file or link)", "https://www.virustotal.com/", "practice");
const hibp = r("Have I Been Pwned", "https://haveibeenpwned.com/", "practice");
const letsdefend = r("LetsDefend: SOC analyst practice", "https://letsdefend.io/", "practice");
const cyberdefenders = r("CyberDefenders: blue team labs", "https://www.cyberdefenders.org/", "practice");
const splunkFree = r("Splunk free training courses", "https://www.splunk.com/en_us/training/free-courses/overview.html", "practice");
const isc2Cc = r("ISC2: Certified in Cybersecurity (CC)", "https://www.isc2.org/certifications/cc");
const comptiaSec = r("CompTIA Security+", "https://www.comptia.org/en-us/certifications/security/");
const googleCyber = r("Google Cybersecurity Certificate", "https://grow.google/certificates/cybersecurity/");
const virtualbox = r("VirtualBox (free virtual machines)", "https://www.virtualbox.org/", "practice");
const dpc = r("Data Protection Commission, Ghana", "https://dpc.gov.gh/");

export const cybersecurity: RoadmapDraft = {
  slug: "cybersecurity-analyst",
  title: "Cybersecurity Analyst",
  description:
    "Learn to defend people, phones and company systems in Ghana, from mobile money fraud and phishing to logs, alerts and incident response. Built for learners who have finished or are taking IT support; theory works on a phone, and hands on labs need a computer.",
  track: "cybersecurity",
  field_category: "infrastructure",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Security foundations",
      summary:
        "Security work starts with a few core ideas and a firm commitment to defend only. This section gives you the language every analyst uses and the legal limits you must never cross.",
      parent: null,
      optional: false,
      resources: [netacadIntro, ncscTips],
    },
    {
      slug: "cia-and-risk",
      title: "The CIA triad and risk",
      summary:
        "Confidentiality, integrity and availability describe what you are protecting, and risk tells you what to fix first. You will use these words in every report, interview and alert.",
      parent: "foundations",
      optional: false,
      resources: [netacadIntro, nistCsf],
    },
    {
      slug: "ethics-and-law",
      title: "Ethics and the law: defend only",
      summary:
        "Accessing a system without permission is a crime in Ghana, however curious or well meaning you are. Learn where the line sits, why written permission matters and how professionals behave.",
      parent: "foundations",
      optional: false,
      resources: [act772, csaHome],
    },
    {
      slug: "systems",
      title: "Networks and systems for security",
      summary:
        "You cannot defend what you do not understand. This section revisits networks, Windows and Linux from a defender's point of view, building on your IT support skills.",
      parent: null,
      optional: false,
      resources: [netacadNetworking, netacadLinux],
    },
    {
      slug: "networking-for-security",
      title: "Networking for defenders",
      summary:
        "Learn how IP addresses, ports, DNS and firewalls look when something goes wrong. Reading network traffic is a core analyst skill named in junior adverts.",
      parent: "systems",
      optional: false,
      resources: [netacadNetworking, wiresharkGuide, packetTracer],
    },
    {
      slug: "windows-security",
      title: "Windows for defenders",
      summary:
        "Most offices in Ghana run Windows, so analysts must know its accounts, updates, built in protection and event logs. You will learn where Windows records what happened and how to read it.",
      parent: "systems",
      optional: false,
      resources: [windowsSecurity],
    },
    {
      slug: "linux-for-security",
      title: "Linux command line for defenders",
      summary:
        "Servers and security tools often run on Linux. Learn to move around, read log files, search them and check file permissions from the command line.",
      parent: "systems",
      optional: false,
      resources: [ubuntuCli, netacadLinux, bandit],
    },
    {
      slug: "ghana-threats",
      title: "Threats common in Ghana",
      summary:
        "Most attacks people in Ghana face start with a phone call, a message or a fake link rather than clever code. This section studies those threats so you can spot them and protect others.",
      parent: null,
      optional: false,
      resources: [bogFraudNotice, csaWhatsappAlert],
    },
    {
      slug: "momo-fraud-sim-swap",
      title: "Mobile money fraud and SIM swap",
      summary:
        "Learn how fraudsters trick people into revealing PINs and codes, and how a stolen phone number can open a mobile wallet. Telcos, banks and fintechs need staff who understand these patterns.",
      parent: "ghana-threats",
      optional: false,
      resources: [bogFraudNotice, csaWhatsappAlert, csaReport],
    },
    {
      slug: "phishing-social-engineering",
      title: "Phishing and social engineering",
      summary:
        "Attackers often target people instead of machines, using urgency, fear and fake authority. You will learn to break down a suspicious message and explain the warning signs to others.",
      parent: "ghana-threats",
      optional: false,
      resources: [ncscPhishing, csaWhatsappAlert],
    },
    {
      slug: "malware-ransomware",
      title: "Malware and ransomware",
      summary:
        "Malware is software built to harm, spy or steal, and ransomware locks files until a payment is made. Learn the common types, how they arrive and the defences that actually help.",
      parent: "ghana-threats",
      optional: false,
      resources: [cisaRansomware, virustotal],
    },
    {
      slug: "protect",
      title: "Protecting people and systems",
      summary:
        "Good defence makes attacks harder before they start. This section covers accounts and access, encryption and training people to be part of the defence.",
      parent: null,
      optional: false,
      resources: [ncscTips, cisaMfa],
    },
    {
      slug: "identity-access",
      title: "Identity and access management",
      summary:
        "Strong passwords, multi factor authentication and least privilege stop a large share of everyday attacks. Learn how organisations decide who can access what, and how to review it.",
      parent: "protect",
      optional: false,
      resources: [cisaMfa, hibp],
    },
    {
      slug: "encryption-data-protection",
      title: "Encryption and protecting data",
      summary:
        "Encryption keeps data private in storage and on the move, and hashing shows whether it has changed. You will also see why Ghana's data protection rules make careful handling a duty.",
      parent: "protect",
      optional: false,
      resources: [dpc, netacadIntro],
    },
    {
      slug: "security-awareness",
      title: "Security awareness for staff and communities",
      summary:
        "Many security roles include teaching colleagues and customers to recognise scams. Learn to run short, respectful awareness sessions that change habits.",
      parent: "protect",
      optional: false,
      resources: [ncscTips, bogFraudNotice],
    },
    {
      slug: "detect-respond",
      title: "Detecting and responding",
      summary:
        "No defence is perfect, so organisations watch for trouble and act fast when it appears. This is the daily work of a junior analyst in a security operations centre.",
      parent: null,
      optional: false,
      resources: [ncscIncident, letsdefend],
    },
    {
      slug: "logging-monitoring",
      title: "Logs and monitoring",
      summary:
        "Logs are the records systems keep about logins, changes and connections. Learn which logs matter, how to read them and how to spot something unusual.",
      parent: "detect-respond",
      optional: false,
      resources: [splunkFree, windowsSecurity],
    },
    {
      slug: "soc-alert-triage",
      title: "SOC work and alert triage",
      summary:
        "A security operations centre watches alerts from tools such as a SIEM and decides which ones are real. Learn how Level 1 analysts triage, document and escalate.",
      parent: "detect-respond",
      optional: false,
      resources: [letsdefend, splunkFree, mitreAttack],
    },
    {
      slug: "incident-response",
      title: "Incident response basics",
      summary:
        "When an attack is confirmed, a calm, practised process limits the damage. Learn the stages of incident response and what a junior analyst is expected to do in each.",
      parent: "detect-respond",
      optional: false,
      resources: [nistIr, ncscIncident, csaReport],
    },
    {
      slug: "vulnerability-management",
      title: "Vulnerability and patch management",
      summary:
        "Weaknesses in software are found every week, and attackers race to use them. Learn how teams find, rank and fix vulnerabilities on systems they own.",
      parent: "detect-respond",
      optional: false,
      resources: [cisaKev, nvd, cvss],
    },
    {
      slug: "rules-frameworks",
      title: "Ghana's rules and recognised frameworks",
      summary:
        "Security in Ghana works within laws, regulators and widely used standards. Knowing them helps you understand why employers ask for certain controls and reports.",
      parent: null,
      optional: false,
      resources: [csaHome, nistCsf],
    },
    {
      slug: "cybersecurity-act-csa",
      title: "The Cybersecurity Act 2020 and the CSA",
      summary:
        "Act 1038 created the Cyber Security Authority, national and sectoral incident response teams and protections for critical systems. Learn what it means for organisations and for your own career.",
      parent: "rules-frameworks",
      optional: false,
      resources: [csaHome, csaCii, csaReport],
    },
    {
      slug: "frameworks-standards",
      title: "Frameworks and standards employers mention",
      summary:
        "Adverts in Ghanaian banks and audit firms name ISO 27001, PCI DSS, the NIST framework and MITRE ATT&CK. Learn what each one is for so the words stop being a mystery.",
      parent: "rules-frameworks",
      optional: false,
      resources: [nistCsf, mitreAttack],
    },
    {
      slug: "job-ready",
      title: "Getting job ready",
      summary:
        "Employers want proof you can do the work, not only certificates. This section helps you practise safely on modest hardware, choose a first certification and present your work.",
      parent: null,
      optional: false,
      resources: [tryhackme, cyberdefenders],
    },
    {
      slug: "home-lab",
      title: "A low cost practice lab",
      summary:
        "Safe, legal practice happens in labs built for learning, not on real networks. Learn what you can do on a phone, what needs a computer and how to keep data costs low.",
      parent: "job-ready",
      optional: false,
      resources: [tryhackme, virtualbox, bandit],
    },
    {
      slug: "entry-certifications",
      title: "Entry certifications",
      summary:
        "A few recognised certificates can help a beginner's CV get noticed. Learn what the common entry options cover so you can choose one that fits your goals and budget.",
      parent: "job-ready",
      optional: true,
      resources: [isc2Cc, comptiaSec, googleCyber],
    },
    {
      slug: "portfolio-job-search",
      title: "Your portfolio and first security role",
      summary:
        "Most analysts enter through IT support, a help desk, national service or an internship. Learn where junior security roles sit in Ghana and remotely, and how to show your skills.",
      parent: "job-ready",
      optional: false,
      resources: [RES.githubDocs, csaHome],
    },
  ],
};
