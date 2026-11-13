/**
 * Learner profile v2 (epic #320): optional questions that shape a learner's
 * path, reminders and job matches. Every answer is optional and can be
 * changed or cleared at any time.
 *
 * Used for: learning (path, pacing, low data versions, reminders) and
 * matching (filters and ranking). Never an input to the readiness score:
 * verified skills and work count there instead. Never collected: gender,
 * ethnicity, religion, health or disability, marital status.
 *
 * The values here must match the checks on public.learner_profiles
 * (supabase/migrations/20261113200000_learner_profiles.sql); a unit test
 * compares them.
 */
import { REGIONS } from "./regions";

type Option = { value: string; label: string };
const opts = <const T extends readonly (readonly [string, string])[]>(pairs: T) =>
  pairs.map(([value, label]) => ({ value, label })) as { value: T[number][0]; label: string }[];

export const MAIN_GOALS = opts([
  ["job", "Get a job"],
  ["freelance", "Freelance or take gigs"],
  ["business", "Grow my own business"],
  ["upskill", "Do better in my current work"],
  ["exploring", "Still exploring"],
] as const);

export const EMPLOYMENT = opts([
  ["student", "Student"],
  ["national_service", "On national service"],
  ["looking", "Looking for work"],
  ["employed", "Employed"],
  ["self_employed", "Self-employed"],
] as const);

export const EDUCATION = opts([
  ["jhs", "JHS"],
  ["shs", "SHS"],
  ["tvet", "TVET or technical"],
  ["diploma", "Diploma or HND"],
  ["degree", "Bachelor's degree"],
  ["postgraduate", "Postgraduate"],
] as const);

export const FIELDS_OF_STUDY = opts([
  ["business", "Business, accounting or economics"],
  ["computing", "Computing or IT"],
  ["engineering", "Engineering or technical"],
  ["science", "Science or mathematics"],
  ["health", "Health"],
  ["agriculture", "Agriculture"],
  ["education", "Education"],
  ["arts", "Arts, languages or humanities"],
  ["social_science", "Social sciences"],
  ["general", "General studies"],
  ["other", "Something else"],
] as const);

export const EXPERIENCE = opts([
  ["none", "None yet"],
  ["under_1", "Under 1 year"],
  ["1_2", "1 to 2 years"],
  ["3_5", "3 to 5 years"],
  ["over_5", "Over 5 years"],
] as const);

export const CAREER_STAGES = opts([
  ["first_job", "Looking for my first job"],
  ["changing", "Changing career"],
  ["returning", "Returning to work"],
  ["growing", "Growing in my current field"],
] as const);

export const DEVICES = opts([
  ["smartphone", "Smartphone"],
  ["laptop", "Laptop"],
  ["desktop", "Desktop computer"],
  ["tablet", "Tablet"],
  ["shared", "A shared or borrowed device"],
] as const);

export const INTERNET = opts([
  ["mobile_data", "Mobile data"],
  ["home_wifi", "Wi-Fi at home"],
  ["public_wifi", "Wi-Fi at school, work or a café"],
  ["limited", "Limited or unreliable"],
] as const);

export const STUDY_HOURS = opts([
  ["under_3", "Under 3 hours"],
  ["3_5", "3 to 5 hours"],
  ["6_10", "6 to 10 hours"],
  ["over_10", "More than 10 hours"],
] as const);

export const STUDY_TIMES = opts([
  ["morning", "Mornings"],
  ["afternoon", "Afternoons"],
  ["evening", "Evenings"],
  ["weekend", "Weekends"],
] as const);

export const INDUSTRIES = opts([
  ["tech", "Technology"],
  ["finance", "Banking, finance and mobile money"],
  ["telecoms", "Telecoms"],
  ["agriculture", "Agriculture and agribusiness"],
  ["retail", "Retail and trade"],
  ["media", "Media and creative"],
  ["health", "Health"],
  ["education", "Education"],
  ["ngo", "NGOs and development"],
  ["government", "Government and public service"],
  ["hospitality", "Hospitality and tourism"],
  ["logistics", "Logistics and transport"],
  ["energy", "Energy and mining"],
] as const);

export const HEARD_FROM = opts([
  ["whatsapp", "WhatsApp"],
  ["friend", "A friend or family member"],
  ["chapter", "A SydCrest chapter or event"],
  ["school", "School, university or national service"],
  ["social", "Facebook, Instagram, TikTok or X"],
  ["linkedin", "LinkedIn"],
  ["search", "A web search"],
  ["radio_tv", "Radio or TV"],
  ["partner", "A partner organisation"],
  ["other", "Somewhere else"],
] as const);

export const LANGUAGES = opts([
  ["english", "English"],
  ["twi", "Twi"],
  ["dagbani", "Dagbani"],
  ["ewe", "Ewe"],
  ["ga", "Ga"],
  ["hausa", "Hausa"],
  ["fante", "Fante"],
  ["dagaare", "Dagaare"],
  ["gonja", "Gonja"],
  ["french", "French"],
  ["other", "Another language"],
] as const);

export const WORK_STYLES = opts([
  ["remote", "Remote"],
  ["on_site", "On site"],
  ["hybrid", "Hybrid"],
] as const);

export const AVAILABLE_FROM = opts([
  ["now", "Now"],
  ["1_month", "Within a month"],
  ["3_months", "Within three months"],
  ["later", "Later"],
] as const);

/** Monthly pay bands in Ghana cedis. A filter only: never shown to employers. */
export const PAY_BANDS = opts([
  ["under_1000", "Under GH₵1,000"],
  ["1000_2000", "GH₵1,000 to 2,000"],
  ["2000_3500", "GH₵2,000 to 3,500"],
  ["3500_5000", "GH₵3,500 to 5,000"],
  ["over_5000", "Over GH₵5,000"],
] as const);

export const LEARNING_STYLES = opts([
  ["video", "Watching videos"],
  ["reading", "Reading"],
  ["practice", "Doing practice tasks"],
  ["group", "Learning with a group"],
] as const);

export const WORK_REGIONS: Option[] = REGIONS.map((r) => ({ value: r.slug, label: r.label }));

const SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/;
const MAX_TRACKS = 10;

/** Single choice questions: column name and allowed values. */
export const SINGLE = {
  main_goal: MAIN_GOALS,
  employment_status: EMPLOYMENT,
  education: EDUCATION,
  field_of_study: FIELDS_OF_STUDY,
  experience: EXPERIENCE,
  career_stage: CAREER_STAGES,
  main_device: DEVICES,
  internet: INTERNET,
  study_hours: STUDY_HOURS,
  heard_from: HEARD_FROM,
  available_from: AVAILABLE_FROM,
  min_pay_band: PAY_BANDS,
} as const satisfies Record<string, Option[]>;

/** Several choice questions (tracks are checked by shape, against published roadmaps in the form). */
export const MULTI = {
  study_times: STUDY_TIMES,
  industries: INDUSTRIES,
  languages: LANGUAGES,
  work_styles: WORK_STYLES,
  work_regions: WORK_REGIONS,
  learning_styles: LEARNING_STYLES,
} as const satisfies Record<string, Option[]>;

export type SingleKey = keyof typeof SINGLE;
export type MultiKey = keyof typeof MULTI | "tracks";

/** Every answer the form can hold; the analytics event names the field only. */
export const PROFILE_FIELDS = [...(Object.keys(SINGLE) as SingleKey[]), ...(Object.keys(MULTI) as (keyof typeof MULTI)[]), "tracks", "willing_to_relocate"] as const;
export type ProfileField = (typeof PROFILE_FIELDS)[number];

export type LearnerProfile = { [K in SingleKey]: string | null } & { [K in MultiKey]: string[] } & {
  willing_to_relocate: boolean | null;
};

export const EMPTY_PROFILE: LearnerProfile = {
  ...(Object.fromEntries(Object.keys(SINGLE).map((k) => [k, null])) as unknown as { [K in SingleKey]: null }),
  ...(Object.fromEntries([...Object.keys(MULTI), "tracks"].map((k) => [k, [] as string[]])) as unknown as { [K in MultiKey]: string[] }),
  willing_to_relocate: null,
};

/**
 * Reads the form. Unknown values are dropped rather than refused: every
 * question is optional, so the worst case is an answer not saved.
 */
export function parseLearnerProfile(form: FormData): LearnerProfile {
  const out: LearnerProfile = { ...EMPTY_PROFILE };
  for (const [key, options] of Object.entries(SINGLE) as [SingleKey, Option[]][]) {
    const value = form.get(key);
    out[key] = typeof value === "string" && options.some((o) => o.value === value) ? value : null;
  }
  for (const [key, options] of Object.entries(MULTI) as [keyof typeof MULTI, Option[]][]) {
    const values = form.getAll(key).filter((v): v is string => typeof v === "string");
    out[key] = options.filter((o) => values.includes(o.value)).map((o) => o.value);
  }
  out.tracks = [...new Set(form.getAll("tracks").filter((v): v is string => typeof v === "string" && SLUG.test(v)))].slice(0, MAX_TRACKS);
  const relocate = form.get("willing_to_relocate");
  out.willing_to_relocate = relocate === "yes" ? true : relocate === "no" ? false : null;
  return out;
}

/** The fields whose answer changed, for the profile_field_updated event. */
export function changedFields(before: LearnerProfile, after: LearnerProfile): ProfileField[] {
  return PROFILE_FIELDS.filter((key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]));
}

/** How many questions have an answer, out of PROFILE_FIELDS.length. */
export function answeredCount(profile: LearnerProfile): number {
  return PROFILE_FIELDS.filter((key) => {
    const v = profile[key];
    return Array.isArray(v) ? v.length > 0 : v !== null;
  }).length;
}

/** A saved row (nulls for empty arrays from older rows) as a LearnerProfile. */
export function fromRow(row: Partial<Record<string, unknown>> | null | undefined): LearnerProfile {
  const out: LearnerProfile = { ...EMPTY_PROFILE };
  if (!row) return out;
  for (const key of Object.keys(SINGLE) as SingleKey[]) out[key] = typeof row[key] === "string" ? (row[key] as string) : null;
  for (const key of [...Object.keys(MULTI), "tracks"] as MultiKey[]) {
    const v = row[key];
    out[key] = Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  }
  out.willing_to_relocate = typeof row.willing_to_relocate === "boolean" ? row.willing_to_relocate : null;
  return out;
}
