import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve with HTTP 200 (27 October 2026; orc, bogImto and csa re checked 28 October 2026). */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const wikiFreelancer = r("Wikipedia: Freelancer", "https://en.wikipedia.org/wiki/Freelancer");
const onetSkills = r(
  "O*NET: Cross functional skills (negotiation, persuasion, time management)",
  "https://www.onetonline.org/find/descriptor/browse/2.B",
);
const googleSites = r("Google Sites Help: How to use Google Sites", "https://support.google.com/sites/answer/6372878", "practice");
const googleDocs = r("Google Docs Help: How to use Google Docs", "https://support.google.com/docs/answer/7068618");
const googleSheets = r("Google Sheets Help: How to use Google Sheets", "https://support.google.com/docs/answer/6000292");
const googleCalendar = r("Google Calendar Help: Create an event", "https://support.google.com/calendar/answer/72143");
const googleMeet = r("Google Meet Help: Join a meeting", "https://support.google.com/meet/answer/9303069");
const google2sv = r("Google Account Help: Turn on 2 Step Verification", "https://support.google.com/accounts/answer/185839");
const googlePassword = r("Google Account Help: Create a strong password", "https://support.google.com/accounts/answer/32040");
const fccProposal = r(
  "freeCodeCamp: A free web design proposal template",
  "https://www.freecodecamp.org/news/free-web-design-proposal-template/",
);
const contractCreator = r(
  "Freelancers Union: Contract creator (a US template, adapt to Ghana)",
  "https://www.freelancersunion.org/resources/contract-creator/",
  "practice",
);
const wikiSow = r("Wikipedia: Statement of work", "https://en.wikipedia.org/wiki/Statement_of_work");
const wikiInvoice = r("Wikipedia: Invoice", "https://en.wikipedia.org/wiki/Invoice");
const wikiEscrow = r("Wikipedia: Escrow", "https://en.wikipedia.org/wiki/Escrow");
const wipoCopyright = r("WIPO: Copyright basics", "https://www.wipo.int/en/web/copyright");
const bogFx = r(
  "Bank of Ghana: Interbank exchange rates",
  "https://www.bog.gov.gh/treasury-and-the-markets/historical-interbank-fx-rates/",
);
const bogApproved = r(
  "Bank of Ghana: Approved payment and fintech institutions",
  "https://www.bog.gov.gh/fintech-innovation/approved-institutions/",
);
const graRegistration = r("Ghana Revenue Authority: Tax registration", "https://gra.gov.gh/domestic-tax/tax-registration/");
const graIncomeTax = r("Ghana Revenue Authority: Personal income tax", "https://gra.gov.gh/domestic-tax/personal-income-tax/");
const orc = r(
  "Office of the Registrar of Companies: Business name registration",
  "https://orc.gov.gh/service-business-registration.php",
);
const bogImto = r(
  "Bank of Ghana: Guidelines for international money transfer operators (PDF)",
  "https://www.bog.gov.gh/wp-content/uploads/2026/01/GUIDELINES-FOR-THE-REGISTRATION-AND-OPERTIONS-OF-INTERNATIONAL-MONEY-TRANSFER-OPERATORS-IMTO-Guidelines-Dec-2025-Final.pdf",
);
const csaJobScams = r("Cyber Security Authority: Job scams on the rise", "https://csa.gov.gh/cert-gh-alert23.php");
const csa = r("Cyber Security Authority: Report a cyber incident", "https://csa.gov.gh/report");
const cisaPhishing = r("CISA: Recognise and report phishing", "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing");
const khanFinance = r("Khan Academy: Personal finance", "https://www.khanacademy.org/college-careers-more/personal-finance", "video");
const khanEntrepreneurship = r(
  "Khan Academy: Entrepreneurship",
  "https://www.khanacademy.org/college-careers-more/entrepreneurship2",
  "video",
);

export const freelancing: RoadmapDraft = {
  slug: "freelancing",
  title: "Freelancing and Getting Paid",
  description:
    "Turn a skill from any SydCrest track into paid client work, in Tamale or for clients abroad. Learn to choose a service, build a portfolio, find clients locally and online, write proposals, price in cedis, agree simple contracts, get paid safely from Ghana, avoid scams and build a reputation that brings repeat work.",
  track: "freelancing",
  field_category: "business",
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "freelancing-basics",
      title: "How freelancing works",
      summary:
        "Freelancing means selling a skill you already have to clients, one project or one month at a time, instead of working for a single employer. This section explains what that involves, how to choose what to offer, and what you can do on a phone and what needs a laptop.",
      parent: null,
      optional: false,
      resources: [RES.lfFreelancing, wikiFreelancer],
    },
    {
      slug: "what-freelancing-is",
      title: "What freelancing is and is not",
      summary:
        "A freelancer runs a very small business: finding clients, agreeing the work, delivering it and chasing payment all fall on you. Learn how this differs from a salaried job and from tap to earn task apps, and why a real skill from another track comes first.",
      parent: "freelancing-basics",
      optional: false,
      resources: [RES.lfFreelancing, khanEntrepreneurship],
    },
    {
      slug: "choosing-your-service",
      title: "Choosing a service and a niche",
      summary:
        "Clients hire someone for a clear result, such as a logo, a month of Facebook posts or a cleaned spreadsheet, not for general computer skills. Pick one service you can already deliver well and a type of client to aim at, such as schools, NGOs or market traders.",
      parent: "freelancing-basics",
      optional: false,
      resources: [RES.lfThinking, khanEntrepreneurship],
    },
    {
      slug: "freelance-toolkit",
      title: "Your freelance toolkit on a phone or laptop",
      summary:
        "Email, a calendar, cloud storage, document and spreadsheet apps and a messaging app cover most of the admin side of freelancing, and all run on a phone as well as a computer. Some services, such as video editing for clients or web development, are much easier on a laptop, so check what your service needs before you promise deadlines.",
      parent: "freelancing-basics",
      optional: false,
      resources: [RES.lfDrive, googleCalendar, googleMeet],
    },
    {
      slug: "getting-ready",
      title: "Getting ready to be hired",
      summary:
        "Before you look for clients you need proof of your skill, a way to be found and the habit of writing clearly. This section covers your portfolio, your profiles and professional messages.",
      parent: null,
      optional: false,
      resources: [RES.lfFreelancing],
    },
    {
      slug: "portfolio",
      title: "A portfolio that proves your skill",
      summary:
        "Many clients ask for samples or live links before they will even read a proposal, so three to five strong pieces matter more than a long CV. Build samples from practice briefs or real work for a local business, always with permission, and present each one with the problem, what you did and the result.",
      parent: "getting-ready",
      optional: false,
      resources: [googleSites, RES.githubPages, googleDocs],
    },
    {
      slug: "profiles-and-presence",
      title: "Profiles and online presence",
      summary:
        "A clear profile tells a stranger in seconds what you do, who you do it for and how to reach you. Set up honest profiles on the places your clients look, a WhatsApp Business catalogue for local clients and a professional profile for remote ones, using your real name and real work.",
      parent: "getting-ready",
      optional: false,
      resources: [RES.lfLinkedin, RES.whatsappBusiness, RES.googleBusiness],
    },
    {
      slug: "client-communication",
      title: "Writing to clients professionally",
      summary:
        "Short, polite, clear messages win trust, especially with remote clients who only know you through text. Learn to greet properly, answer the question asked, confirm details in writing and reply within an agreed time, even when the reply is only that you need another day.",
      parent: "getting-ready",
      optional: false,
      resources: [RES.lfBizWriting, RES.lfCommunication],
    },
    {
      slug: "finding-clients",
      title: "Finding clients",
      summary:
        "Clients come from people who already know you, from businesses you approach and from online marketplaces and job boards. This section covers all three, starting close to home.",
      parent: null,
      optional: false,
      resources: [RES.lfFreelancing, RES.lfJobsearch],
    },
    {
      slug: "local-clients",
      title: "Finding clients close to home",
      summary:
        "Shops, schools, churches, NGOs and small firms in Tamale, Bolgatanga or Wa often need design, social media, data or admin help and prefer someone they can meet. Start with people who already trust you, show one finished example, and ask every happy client who else might need the same service.",
      parent: "finding-clients",
      optional: false,
      resources: [RES.whatsappBusiness, RES.googleBusiness],
    },
    {
      slug: "online-marketplaces",
      title: "Freelance marketplaces and remote boards",
      summary:
        "Global marketplaces and remote job boards let clients abroad post projects, but beginners face heavy competition, platform fees and some listings closed to applicants in Ghana. Read each platform's rules on who can join, how fees work and how you withdraw money before you spend data building a profile.",
      parent: "finding-clients",
      optional: false,
      resources: [RES.lfFreelancing, RES.lfJobsearch],
    },
    {
      slug: "outreach-and-referrals",
      title: "Outreach, referrals and repeat work",
      summary:
        "Writing directly to a business with one specific idea for them often works better than waiting for adverts. Keep a simple list of everyone you contact and follow up once politely, because past clients and their referrals usually become your steadiest source of work.",
      parent: "finding-clients",
      optional: false,
      resources: [RES.lfBizWriting, googleSheets],
    },
    {
      slug: "staying-safe",
      title: "Staying safe from scams",
      summary:
        "Freelancers are a favourite target for fake jobs, fake clients and account theft. This section helps you recognise scams early and protect your accounts and identity.",
      parent: null,
      optional: false,
      resources: [csaJobScams, RES.lfSafety],
    },
    {
      slug: "spotting-scams",
      title: "Spotting freelance and job scams",
      summary:
        "Warning signs include being asked to pay to get work, tasks that pay you small amounts before demanding a deposit, overpayments you are asked to refund and clients who push you off a platform at once. Ghana's Cyber Security Authority warns about these patterns and takes reports, so check its advice and report scams rather than staying quiet.",
      parent: "staying-safe",
      optional: false,
      resources: [csaJobScams, csa, cisaPhishing],
    },
    {
      slug: "protecting-accounts",
      title: "Protecting your accounts and identity",
      summary:
        "Your email, payment and marketplace accounts are your business, so use strong passwords and 2 Step Verification on each. Never rent out, buy or share an account, and send copies of your Ghana Card or bank details only to clients and services you have verified.",
      parent: "staying-safe",
      optional: false,
      resources: [google2sv, googlePassword, RES.lfSafety],
    },
    {
      slug: "winning-work",
      title: "Winning the work",
      summary:
        "Turning an enquiry into a paid project depends on understanding the need, answering it clearly and setting a fair price. This section covers briefs, proposals and pricing in cedis.",
      parent: null,
      optional: false,
      resources: [fccProposal],
    },
    {
      slug: "reading-a-brief",
      title: "Reading a brief and asking good questions",
      summary:
        "Most freelance problems start with a vague brief, so learn to find out the goal, the audience, the deadline, the budget and what finished looks like. A short call or voice note with five good questions saves days of rework and shows the client you are serious.",
      parent: "winning-work",
      optional: false,
      resources: [RES.lfCommunication, googleMeet],
    },
    {
      slug: "writing-proposals",
      title: "Writing proposals that get replies",
      summary:
        "A good proposal restates the client's problem in their words, explains how you will solve it, points to one relevant sample and gives a clear price and timeline. Answer every screening question the client asked and keep it short enough to read on a phone, because copied general proposals are easy to spot.",
      parent: "winning-work",
      optional: false,
      resources: [fccProposal, RES.lfBizWriting],
    },
    {
      slug: "pricing-in-cedis",
      title: "Pricing your work in cedis",
      summary:
        "Work out your price from the hours a job really takes, your costs such as data, power and software, and what similar local work charges, then decide between a project price, an hourly rate or a monthly retainer. For foreign clients, agree which currency you are paid in and remember that fees and exchange rates change what reaches you in cedis.",
      parent: "winning-work",
      optional: false,
      resources: [RES.lfMoney, bogFx, onetSkills],
    },
    {
      slug: "contracts-and-delivery",
      title: "Contracts and delivering the work",
      summary:
        "Clear written terms and steady delivery protect both you and the client. This section covers simple agreements, deposits and invoices, and managing deadlines and revisions.",
      parent: null,
      optional: false,
      resources: [contractCreator, wikiSow],
    },
    {
      slug: "simple-contracts",
      title: "Simple written agreements",
      summary:
        "Even a short agreement in an email or a shared document should state the work, the deadline, the number of revisions, the price, the payment dates and who owns the finished files. Learn what each part means and why a WhatsApp chat alone is weak protection when a client disagrees later.",
      parent: "contracts-and-delivery",
      optional: false,
      resources: [contractCreator, wikiSow, wipoCopyright],
    },
    {
      slug: "deposits-and-invoices",
      title: "Deposits, milestones and invoices",
      summary:
        "Asking for part of the fee before you start, or splitting big jobs into paid milestones, limits how much you can lose to a client who disappears. Send a clear invoice for every payment due and follow up late payments politely, firmly and in writing.",
      parent: "contracts-and-delivery",
      optional: false,
      resources: [wikiInvoice, wikiEscrow, googleDocs],
    },
    {
      slug: "managing-projects",
      title: "Managing deadlines and revisions",
      summary:
        "Clients judge you as much on reliability as on quality, so track every deadline and give updates before anyone has to ask. Handle revision requests calmly, and when a client asks for more than was agreed, offer to quote for the extra work instead of doing it free.",
      parent: "contracts-and-delivery",
      optional: false,
      resources: [googleCalendar, googleSheets],
    },
    {
      slug: "getting-paid",
      title: "Getting paid and staying official",
      summary:
        "Being paid on time and keeping records is what turns freelancing into real income. This section covers local payments, receiving money from abroad, records and tax.",
      parent: null,
      optional: false,
      resources: [RES.lfMoney],
    },
    {
      slug: "local-payments",
      title: "Getting paid by local clients",
      summary:
        "Most local clients pay by mobile money or bank transfer, so confirm the money has actually arrived in your account before you release final files. Send a receipt for every payment and keep the transaction references, which protects you if a client later says they paid.",
      parent: "getting-paid",
      optional: false,
      resources: [RES.lfMoney, googleSheets],
    },
    {
      slug: "paid-from-abroad",
      title: "Receiving money from abroad",
      summary:
        "Foreign clients can pay through a marketplace's own withdrawal options, a licensed international payment or remittance service, or a bank account able to receive foreign transfers, and each has different fees, limits and speeds. Compare the total cost before you agree terms, keep account names matching your Ghana Card, and check that any payment company is approved by the Bank of Ghana.",
      parent: "getting-paid",
      optional: false,
      resources: [bogApproved, bogImto, bogFx],
    },
    {
      slug: "records-and-tax",
      title: "Records, tax and registration",
      summary:
        "Keep a simple record of every job, invoice, payment and cost, because you will need it for pricing, disputes and tax. Self employed people with taxable income should register with the Ghana Revenue Authority using their Ghana Card number, and registering a business name with the Registrar of Companies can help when clients want an official invoice.",
      parent: "getting-paid",
      optional: false,
      resources: [graRegistration, graIncomeTax, orc],
    },
    {
      slug: "reputation-and-growth",
      title: "Reputation and growth",
      summary:
        "A freelancer's reputation is built one finished job at a time and is easy to damage. This section covers earning good reviews, keeping clients and growing your income steadily.",
      parent: null,
      optional: false,
      resources: [RES.lfFreelancing],
    },
    {
      slug: "reviews-and-reputation",
      title: "Reviews, reputation and repeat clients",
      summary:
        "Honest reviews and recommendations from real clients are what make new clients trust you, so ask for them after good work and never buy or fake them. Keep your promises, own your mistakes quickly and look after client data, which also matters under Ghana's data protection law.",
      parent: "reputation-and-growth",
      optional: false,
      resources: [RES.dpc, RES.lfCommunication],
    },
    {
      slug: "growing-income",
      title: "Growing your freelance income",
      summary:
        "Once you have steady clients you can raise your prices for new work, offer monthly packages, specialise in one industry or team up with other freelancers. Set aside money for slow months and keep learning in your main track, because a deeper skill is what lets you charge more.",
      parent: "reputation-and-growth",
      optional: true,
      resources: [khanFinance, khanEntrepreneurship],
    },
  ],
};
