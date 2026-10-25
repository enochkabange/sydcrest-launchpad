/**
 * The "Where do I start" quiz: questions, answer shape and validation.
 * Pure and client safe: the quiz page, the sign up hand off and the server
 * all share it, so answers mean the same thing everywhere.
 */

export type Option<V extends string> = { value: V; label: string; hint?: string };

export const INTERESTS = [
  { value: "web", label: "Building websites people use on their phones" },
  { value: "apps", label: "Making the systems behind apps work: logins, payments, data" },
  { value: "data", label: "Finding answers in numbers and spreadsheets" },
  { value: "marketing", label: "Helping businesses sell online and on social media" },
  { value: "design", label: "Designing screens that are easy to use" },
  { value: "product", label: "Deciding what a team should build next" },
  { value: "unsure", label: "I am not sure yet" },
] as const satisfies readonly Option<string>[];

export const CONFIDENCE = [
  { value: "low", label: "I am still getting comfortable", hint: "Typing, email and apps beyond WhatsApp are new to me." },
  { value: "some", label: "I get by", hint: "I use email, search and documents, with some help." },
  { value: "high", label: "Very comfortable", hint: "I pick up new apps and tools on my own." },
] as const satisfies readonly Option<string>[];

export const EXPERIENCE = [
  { value: "none", label: "Not yet", hint: "I have not tried learning a tech skill." },
  { value: "tried", label: "I have started", hint: "I have done some tutorials or a short course." },
  { value: "built", label: "I have made things", hint: "I have built or run something real, even small." },
] as const satisfies readonly Option<string>[];

export const GOALS = [
  { value: "first-job", label: "Get my first job in tech" },
  { value: "freelance", label: "Earn from freelance or remote work" },
  { value: "switch", label: "Move into tech from another career" },
  { value: "business", label: "Grow my own business" },
  { value: "explore", label: "Explore and see what fits" },
] as const satisfies readonly Option<string>[];

export const HOURS = [
  { value: "under-3", label: "Under 3 hours a week" },
  { value: "3-6", label: "3 to 6 hours a week" },
  { value: "7-12", label: "7 to 12 hours a week" },
  { value: "over-12", label: "More than 12 hours a week" },
] as const satisfies readonly Option<string>[];

export const DEVICES = [
  { value: "phone", label: "A phone only" },
  { value: "shared-computer", label: "A phone, and a computer I can use sometimes", hint: "At school, work, a café or a friend's place." },
  { value: "own-computer", label: "My own laptop or computer" },
] as const satisfies readonly Option<string>[];

export const DATA = [
  { value: "tight", label: "Small bundles, I watch every cedi" },
  { value: "okay", label: "Enough for most things, videos add up" },
  { value: "steady", label: "Steady WiFi or a big bundle" },
] as const satisfies readonly Option<string>[];

type Values<T extends readonly Option<string>[]> = T[number]["value"];

export type Interest = Values<typeof INTERESTS>;
export type Confidence = Values<typeof CONFIDENCE>;
export type Experience = Values<typeof EXPERIENCE>;
export type Goal = Values<typeof GOALS>;
export type Hours = Values<typeof HOURS>;
export type Device = Values<typeof DEVICES>;
export type DataPlan = Values<typeof DATA>;

/** Bump when a question or option changes meaning; old answers are then retaken. */
export const QUIZ_VERSION = 1;

export type PathAnswers = {
  v: typeof QUIZ_VERSION;
  interests: Interest[];
  confidence: Confidence;
  experience: Experience;
  goal: Goal;
  hours: Hours;
  device: Device;
  data: DataPlan;
};

function pick<T extends readonly Option<string>[]>(options: T, value: unknown): Values<T> | null {
  return options.some((o) => o.value === value) ? (value as Values<T>) : null;
}

/**
 * Accepts anything (localStorage, a cookie, a Server Action argument) and
 * returns clean answers or null. Interests are de duplicated and put in
 * question order so the same choices always produce the same key.
 */
export function parseAnswers(input: unknown): PathAnswers | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  if (raw.v !== QUIZ_VERSION || !Array.isArray(raw.interests)) return null;

  const chosen = new Set(raw.interests);
  const interests = INTERESTS.map((o) => o.value).filter((v) => chosen.has(v));
  if (interests.length === 0 || interests.length !== raw.interests.length) return null;

  const confidence = pick(CONFIDENCE, raw.confidence);
  const experience = pick(EXPERIENCE, raw.experience);
  const goal = pick(GOALS, raw.goal);
  const hours = pick(HOURS, raw.hours);
  const device = pick(DEVICES, raw.device);
  const data = pick(DATA, raw.data);
  if (!confidence || !experience || !goal || !hours || !device || !data) return null;

  return { v: QUIZ_VERSION, interests, confidence, experience, goal, hours, device, data };
}

/** Stable identity for a set of answers, used to avoid saving the same path twice. */
export function answersKey(answers: PathAnswers): string {
  const { v, interests, confidence, experience, goal, hours, device, data } = answers;
  return JSON.stringify([v, interests, confidence, experience, goal, hours, device, data]);
}
