import { isRegionSlug, type RegionSlug } from "./regions";
import type { FieldErrors } from "./validation";

/** What someone on the waitlist wants from SydCrest. Stored as text in `waitlist.interest` (issue #39). */
export const WAITLIST_INTERESTS = [
  { value: "dmp_cohort", label: "A seat in the free DMP pilot cohort" },
  { value: "roadmaps", label: "Free roadmaps to learn at my own pace" },
  { value: "mentor", label: "Mentoring learners" },
  { value: "hire", label: "Hiring Ghanaian tech talent" },
  { value: "sponsor", label: "Sponsoring seats or partnering" },
] as const;

export type WaitlistInterest = (typeof WAITLIST_INTERESTS)[number]["value"];

export function isWaitlistInterest(value: string): value is WaitlistInterest {
  return WAITLIST_INTERESTS.some((i) => i.value === value);
}

/**
 * A hidden form field people never see or fill. Simple bots fill every input,
 * so a value here marks the submission as automated and it is dropped.
 */
export const WAITLIST_HONEYPOT = "website";

const EMAIL =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export type WaitlistField = "name" | "email" | "region" | "interest";

export function parseWaitlist(form: FormData) {
  const name = text(form, "name");
  const email = text(form, "email").toLowerCase();
  const region = text(form, "region");
  const interest = text(form, "interest");
  const errors: FieldErrors<WaitlistField> = {};

  if (!name) errors.name = "Tell us your name.";
  else if (name.length > 80) errors.name = "Keep your name under 80 characters.";
  if (!EMAIL.test(email) || email.length > 254) errors.email = "Enter a valid email address.";
  if (!isRegionSlug(region)) errors.region = "Choose your region.";
  if (!isWaitlistInterest(interest)) errors.interest = "Choose what you are interested in.";

  return {
    data: { name, email, region: region as RegionSlug, interest: interest as WaitlistInterest },
    errors,
  };
}
