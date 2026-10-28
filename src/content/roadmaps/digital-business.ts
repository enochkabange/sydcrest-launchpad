import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * New track for wave 3, researched from Ghanaian sales and business
 * development adverts, O*NET Online Merchants and official Ghanaian sources.
 * Evidence for every node: src/content/research/digital-business.md.
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const LINKS = {
  orc: r("Office of the Registrar of Companies", "https://orc.gov.gh/"),
  graTin: r("GRA: TIN questions and answers", "https://gra.gov.gh/tin/tin-faq/"),
  graMts: r("GRA: Modified Taxation Scheme", "https://gra.gov.gh/domestic-tax/tax-types/individual/modified-taxation-scheme/"),
  graRegistration: r("GRA: Tax registration", "https://gra.gov.gh/domestic-tax/tax-registration/"),
  fda: r("Food and Drugs Authority Ghana", "https://fdaghana.gov.gh/"),
  bogFraud: r(
    "Bank of Ghana: Digital fraud advisory (October 2026)",
    "https://www.bog.gov.gh/wp-content/uploads/2026/10/PRESS-RELEASE-DIGITAL-FRAUD-AND-THE-COST-OF-IGNORANCE-071026.pdf",
  ),
  ghanaPostGps: r("GhanaPostGPS digital address", "https://www.ghanapostgps.com/"),
  tiktokCreators: r("TikTok Creator Academy", "https://www.tiktok.com/creator-academy", "video"),
  jobberman: r("Jobberman Ghana job listings", "https://www.jobberman.com.gh/", "practice"),
} satisfies Record<string, ResourceDraft>;

export const digitalBusiness: RoadmapDraft = {
  slug: "digital-business",
  title: "Digital Business and Ecommerce",
  description:
    "Run a small business online in Ghana: choose what to sell, price it in cedis, sell on WhatsApp and social media, take mobile money safely, deliver, keep records and register properly. Built for traders, makers and farmers, whether they learn on a phone or a computer.",
  track: "digital-business",
  field_category: "business",
  level: "beginner",
  leads_to: ["freelancing", "digital-marketing"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Starting a small online business",
      summary:
        "Before any app or post, a business needs something people want at a price they will pay. This section helps you pick a product, understand buyers and find reliable supply.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.lfMoney],
    },
    {
      slug: "what-to-sell",
      title: "Choosing what to sell",
      summary:
        "Pick a product you know, can get reliably and can deliver, then test demand with a small batch before you spend more. Shea butter, crafts, food and farm produce are strong starting points in the north.",
      parent: "foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfMoney, RES.lfThinking],
    },
    {
      slug: "customers-and-competitors",
      title: "Customers and competitors",
      summary:
        "Describe who buys, where they are, how they pay and what they compare you with. Studying other sellers shows you the prices, photos and promises customers already expect.",
      parent: "foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfCommunication],
    },
    {
      slug: "sourcing-and-suppliers",
      title: "Sourcing and suppliers",
      summary:
        "Find dependable suppliers or producers, agree quality, quantity and payment terms, and keep a written record. Good supply lets you keep promises to customers when demand grows.",
      parent: "foundations",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "money",
      title: "Prices, profit and records",
      summary:
        "A busy business can still lose money if nobody does the sums. This section covers pricing, profit, cash, records and stock in cedis.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 1,
      careerLevel: "foundation",
      jobs: [],
      resources: [RES.lfMoney, RES.lfSheets],
    },
    {
      slug: "costing-and-pricing",
      title: "Costing and pricing in cedis",
      summary:
        "Add up every cost of one item, including transport, packaging and data, then set a price that covers them and leaves profit. Compare with the market so the price still makes sense to buyers.",
      parent: "money",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfMoney],
    },
    {
      slug: "profit-and-cash-flow",
      title: "Profit, margins and cash flow",
      summary:
        "Learn the difference between sales, profit and the cash you actually hold. Separate business money from personal money so you always know how the business is doing.",
      parent: "money",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfMoney],
    },
    {
      slug: "simple-bookkeeping",
      title: "Simple bookkeeping",
      summary:
        "Record every sale and expense the same day in a notebook or a free spreadsheet. Clean records help you price better, apply for support and deal with tax.",
      parent: "money",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfSheets, RES.lfMoney],
    },
    {
      slug: "stock-control",
      title: "Stock and inventory",
      summary:
        "Track what comes in, what goes out and what is left, so you never sell items you do not have. Count stock regularly and reorder before popular items run out.",
      parent: "money",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfSheets],
    },
    {
      slug: "selling-online",
      title: "Selling online",
      summary:
        "Many Ghanaian customers find, ask about and order products in chat and social apps. This section turns your chats and social pages into a shop window.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Shop Attendant and Social Media Pages Manager", "Sales Attendant"],
      resources: [RES.whatsappBusiness],
    },
    {
      slug: "whatsapp-business",
      title: "Selling on WhatsApp Business",
      summary:
        "Set up a business profile, a catalogue with prices, quick replies, labels and regular Status updates. Treat every chat like a counter where a customer is waiting.",
      parent: "selling-online",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.whatsappBusiness, RES.whatsappFaq],
    },
    {
      slug: "social-and-live-selling",
      title: "Instagram, TikTok and live selling",
      summary:
        "Post short videos and photos that show the product in use, reply to comments and direct messages, and try selling during live streams. Move serious buyers to a chat where you can confirm the order.",
      parent: "selling-online",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.metaLearn, LINKS.tiktokCreators, RES.tiktokBusiness],
    },
    {
      slug: "product-photos",
      title: "Product photos and descriptions",
      summary:
        "Take clear photos in daylight on a plain background and write honest descriptions with size, price and how to order. Good photos answer questions before customers ask them.",
      parent: "selling-online",
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      resources: [RES.lfCanva],
    },
    {
      slug: "online-store",
      title: "A simple online store",
      summary:
        "Compare a chat catalogue, an online marketplace, a free store builder and a Google Business Profile. Start with the simplest option your customers will actually use.",
      parent: "selling-online",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.googleBusiness],
    },
    {
      slug: "payments-and-delivery",
      title: "Payments and delivery",
      summary:
        "Getting paid safely and getting the product to the customer are where trust is won or lost. This section covers mobile money, scams, orders and delivery.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Sales Representative", "Sales and Marketing Officer"],
      resources: [LINKS.bogFraud],
    },
    {
      slug: "mobile-money-payments",
      title: "Taking mobile money payments",
      summary:
        "Use a separate business wallet or merchant account, confirm every payment in your own wallet before you release goods, and keep the transaction ID. Agree clearly whether delivery is paid before or on arrival.",
      parent: "payments-and-delivery",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [LINKS.bogFraud],
    },
    {
      slug: "payment-scams",
      title: "Avoiding payment scams",
      summary:
        "Learn the common tricks, such as fake payment messages and calls asking you to reverse money. Never share a PIN or code, and check your balance yourself every time.",
      parent: "payments-and-delivery",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [LINKS.bogFraud, RES.lfSafety],
    },
    {
      slug: "orders-and-delivery",
      title: "Orders, packing and delivery",
      summary:
        "Keep an order list, pack items so they arrive safe, and choose between pick up, a dispatch rider, a bus parcel service or a courier. Share clear delivery fees, times and a digital address before the customer pays.",
      parent: "payments-and-delivery",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [LINKS.ghanaPostGps, RES.lfSheets],
    },
    {
      slug: "customers-and-growth",
      title: "Customers and marketing",
      summary:
        "Happy customers come back and bring friends. This section covers service, low cost marketing and building loyalty.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Social Media Sales and Growth Associate", "Live Sales Executive", "Marketing and Sales Officer"],
      resources: [RES.lfCommunication],
    },
    {
      slug: "customer-service",
      title: "Customer service and complaints",
      summary:
        "Reply quickly and politely, set clear return and refund rules, and fix problems before they become public. A calm answer to a complaint can win a customer for years.",
      parent: "customers-and-growth",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfCommunication, RES.lfBizWriting],
    },
    {
      slug: "low-cost-marketing",
      title: "Marketing on a small budget",
      summary:
        "Use Status updates, groups you belong to, referrals, market day timing and a clear offer before you spend on ads. Track which channel brings orders, not just likes.",
      parent: "customers-and-growth",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.metaLearn, RES.lfCanva],
    },
    {
      slug: "repeat-customers",
      title: "Repeat customers and loyalty",
      summary:
        "Keep a simple customer list, follow up after delivery and reward people who come back. Selling again to a happy customer usually costs far less effort than finding a new one.",
      parent: "customers-and-growth",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [RES.lfSheets],
    },
    {
      slug: "going-official",
      title: "Making it official",
      summary:
        "Registering, understanding tax and meeting product rules open doors to bigger buyers, payment services and support. This section points you to the official Ghanaian sources.",
      parent: null,
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      careerLevel: "mid",
      jobs: ["Business Development Executive", "Business Development and Client Relations Officer"],
      resources: [LINKS.orc, LINKS.graRegistration],
    },
    {
      slug: "business-registration",
      title: "Registering your business",
      summary:
        "Learn what a business name or sole proprietorship registration is and why it helps. Check the current steps and fees with the Office of the Registrar of Companies.",
      parent: "going-official",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [LINKS.orc],
    },
    {
      slug: "tax-basics",
      title: "Tax basics for small traders",
      summary:
        "Understand that the PIN on your Ghana Card is your personal tax number and that GRA runs simplified arrangements for small businesses. Keep records and confirm what applies to you with GRA.",
      parent: "going-official",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [LINKS.graTin, LINKS.graMts],
    },
    {
      slug: "product-standards",
      title: "Product safety, labels and standards",
      summary:
        "Food, cosmetics like shea butter and some other goods need proper labels and may need approval before wider sale. Learn what a good label shows and where to ask the Food and Drugs Authority.",
      parent: "going-official",
      optional: true,
      difficulty: "intermediate",
      complexity: 3,
      resources: [LINKS.fda],
    },
    {
      slug: "earning",
      title: "Growing and getting hired",
      summary:
        "These skills can grow your own business or get you hired in sales and online retail. This section helps you show your work and take the next step.",
      parent: null,
      optional: false,
      difficulty: "beginner",
      complexity: 2,
      careerLevel: "junior",
      jobs: ["Graduate Trainee Sales", "Sales and Marketing Assistant", "Sales Officer"],
      resources: [RES.lfJobsearch],
    },
    {
      slug: "sales-jobs",
      title: "Sales and online retail jobs",
      summary:
        "Sales, business development and online shop roles look for customer care, record keeping, social selling and follow up. Build a short portfolio from your own business and never pay anyone for a job.",
      parent: "earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 2,
      resources: [LINKS.jobberman, RES.lfResume],
    },
    {
      slug: "growth-and-support",
      title: "Planning growth and finding support",
      summary:
        "Write a one page plan with goals, numbers and next steps, then look for training, grants and mentors from trusted programmes. Check every offer carefully and never pay to receive a grant.",
      parent: "earning",
      optional: false,
      difficulty: "intermediate",
      complexity: 3,
      resources: [RES.lfMoney],
    },
  ],
};
