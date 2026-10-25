/**
 * Facts the public site states, in one place so they can be checked against
 * the planning suite (~/Documents/Vault 77/Sydcrest/Planning) and updated once.
 * Rule: nothing here is invented. If a number is not on record, it is not here.
 */

/** Planning/00 and the old About page: the only public contact on record. */
export const CONTACT_EMAIL = "enochkabange@gmail.com";

/** Planning/00, "The frame". */
export const MISSION =
  "Take motivated Ghanaians, starting in the underserved north, from beginner to employable tech talent, then on to earning from those skills.";

/** Planning/00 Q1 2027 (first free DMP cohort, ~25 seats) and Planning/03 §5 ("Apply for 25 free seats"). */
export const PILOT = { seats: 25, weeks: 12, starts: "January 2027" } as const;

/** Planning/02 §3 and Planning/03 §3. Confirm the current count before launch. */
export const COMMUNITY_SIZE = "500+";

/** Planning/04 §2: the delivered Bolgatanga Skillshop and its feedback form results. */
export const BOLGATANGA = {
  date: "30 December 2025",
  participants: 45,
  hours: 5,
  moreConfident: "84.6%",
  wouldRecommend: "96.2%",
  wouldReturn: "92.3%",
} as const;

/** Planning/04 §3 and Planning/05 §7: the delivered Accra event. */
export const ACCRA_EVENT = {
  date: "19 September 2026",
  title: "Monetizing Your Skills With AI: Building Digital Products",
  venue: "ALX Hub, Accra",
} as const;

/** Planning/01 §3, priority order. Tamale is the first chapter. */
export const CHAPTERS = [
  { city: "Tamale", region: "Northern" },
  { city: "Bolgatanga", region: "Upper East" },
  { city: "Wa", region: "Upper West" },
  { city: "Damongo", region: "Savannah" },
  { city: "Nalerigu", region: "North East" },
] as const;

/** Planning/05 §5. */
export const SPONSOR_TIERS = [
  { name: "Gold", amount: "GHS 7,000" },
  { name: "Silver", amount: "GHS 4,000" },
  { name: "Bronze", amount: "GHS 2,000" },
] as const;

export const MARKETING_NAV = [
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/start", label: "Find your path" },
  { href: "/about", label: "About" },
  { href: "/programme", label: "Programme" },
  { href: "/partners", label: "Partners" },
  { href: "/business", label: "For business" },
] as const;
