import { isRegionSlug, type RegionSlug } from "./regions";
import { LEGAL_VERSION, MINIMUM_AGE, UNDER_AGE_MESSAGE } from "./legal";

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD = 8;

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

type CalendarDate = { year: number; month: number; day: number };

/** Today's calendar date in Ghana (Africa/Accra), whatever the server's timezone. */
export function todayInAccra(now: Date = new Date()): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Accra",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

/** Strict YYYY-MM-DD (what <input type="date"> submits). Null for impossible dates like 2026-02-30. */
export function parseIsoDate(input: string): CalendarDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (!m) return null;
  const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(Date.UTC(year, month - 1, day));
  // Date.UTC rolls 2026-02-30 over to 2 March, so check it round trips.
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return { year, month, day };
}

function compareDates(a: CalendarDate, b: CalendarDate) {
  return a.year - b.year || a.month - b.month || a.day - b.day;
}

/**
 * Whole years old on `today`. Comparing (month, day) pairs means a 29 February
 * birthday counts from 1 March in years without one.
 */
export function ageOn(dob: CalendarDate, today: CalendarDate) {
  const hadBirthday = compareDates({ year: today.year, month: dob.month, day: dob.day }, today) <= 0;
  return today.year - dob.year - (hadBirthday ? 0 : 1);
}

/**
 * The date of birth and consent checks shared by email sign up and the
 * /welcome step for Google sign ups, so the two paths can't drift apart.
 * Date of birth (unless it is already on file: it cannot change once set),
 * the terms tick and the "I confirm I am 18 or over" tick (founder decision
 * D1). Shared by sign up and /welcome.
 */
export function parseAgeAndConsent(form: FormData, now: Date = new Date(), { askDateOfBirth = true }: { askDateOfBirth?: boolean } = {}) {
  const dateOfBirth = askDateOfBirth ? text(form, "date_of_birth") : "";
  const agreed = form.get("terms") === "on";
  const adult = form.get("adult") === "on";
  const errors: FieldErrors<"date_of_birth" | "terms" | "adult"> = {};

  if (askDateOfBirth) {
    const dob = parseIsoDate(dateOfBirth);
    const today = todayInAccra(now);
    if (!dateOfBirth) errors.date_of_birth = "Enter your date of birth.";
    else if (!dob || dob.year < 1900) errors.date_of_birth = "Enter a real date of birth.";
    else if (compareDates(dob, today) > 0) errors.date_of_birth = "Your date of birth can't be in the future.";
    else if (ageOn(dob, today) < MINIMUM_AGE) errors.date_of_birth = UNDER_AGE_MESSAGE;
  }
  if (!adult && errors.date_of_birth !== UNDER_AGE_MESSAGE) errors.adult = "Tick the box to confirm you are 18 or over.";
  if (!agreed) errors.terms = "Tick the box to agree to the Terms and Privacy Policy.";

  return { data: { dateOfBirth, termsVersion: LEGAL_VERSION }, errors };
}

export function parseSignUp(form: FormData, now: Date = new Date()) {
  const fullName = text(form, "full_name");
  const email = text(form, "email").toLowerCase();
  const password = typeof form.get("password") === "string" ? (form.get("password") as string) : "";
  const age = parseAgeAndConsent(form, now);
  const errors: FieldErrors<"full_name" | "email" | "password" | "date_of_birth" | "terms" | "adult"> = { ...age.errors };

  if (!fullName) errors.full_name = "Tell us your name.";
  else if (fullName.length > 80) errors.full_name = "Keep your name under 80 characters.";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  const weak = passwordError(password);
  if (weak) errors.password = weak;

  return { data: { fullName, email, password, ...age.data }, errors };
}

/** The password rule for sign up and for setting a new one after a reset. */
export function passwordError(password: string): string | undefined {
  return password.length < MIN_PASSWORD ? `Use at least ${MIN_PASSWORD} characters.` : undefined;
}

/** The forgot password form: just an email address. */
export function parseResetRequest(form: FormData) {
  const email = text(form, "email").toLowerCase();
  const errors: FieldErrors<"email"> = {};
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  return { data: { email }, errors };
}

/** A new password typed twice, with the same rule as sign up. */
export function parseNewPassword(form: FormData) {
  const raw = (key: string) => (typeof form.get(key) === "string" ? (form.get(key) as string) : "");
  const password = raw("password");
  const confirm = raw("confirm_password");
  const errors: FieldErrors<"password" | "confirm_password"> = {};
  const weak = passwordError(password);
  if (weak) errors.password = weak;
  else if (!confirm) errors.confirm_password = "Type your new password again.";
  else if (confirm !== password) errors.confirm_password = "The two passwords don't match.";
  return { data: { password }, errors };
}

export function parseSignIn(form: FormData) {
  const email = text(form, "email").toLowerCase();
  const password = typeof form.get("password") === "string" ? (form.get("password") as string) : "";
  const errors: FieldErrors<"email" | "password"> = {};

  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";

  return { data: { email, password }, errors };
}

/**
 * Accepts how Ghanaians actually write numbers (024 123 4567, 0241234567,
 * +233 24 123 4567, 233241234567) and returns E.164. Numbers starting with
 * another country code are kept for diaspora learners. Null means invalid.
 */
export function normalizePhone(input: string): string | null {
  const digits = input.replace(/[\s\-().]/g, "");
  let e164: string;
  if (/^0\d{9}$/.test(digits)) e164 = `+233${digits.slice(1)}`;
  else if (/^233\d{9}$/.test(digits)) e164 = `+${digits}`;
  else if (/^\+\d+$/.test(digits)) e164 = digits;
  else return null;

  if (e164.startsWith("+233")) return /^\+233[235]\d{8}$/.test(e164) ? e164 : null;
  return /^\+[1-9]\d{7,14}$/.test(e164) ? e164 : null;
}

/** +233241234567 -> 024 123 4567 for display; other countries unchanged. */
export function formatPhone(e164: string | null) {
  if (!e164) return "";
  const m = /^\+233(\d{2})(\d{3})(\d{4})$/.exec(e164);
  return m ? `0${m[1]} ${m[2]} ${m[3]}` : e164;
}

export function parseProfile(form: FormData) {
  const displayName = text(form, "display_name");
  const region = text(form, "region");
  const phoneInput = text(form, "phone");
  const phone = phoneInput ? normalizePhone(phoneInput) : null;
  const errors: FieldErrors<"display_name" | "region" | "phone"> = {};

  if (!displayName) errors.display_name = "Your name can't be empty.";
  else if (displayName.length > 80) errors.display_name = "Keep your name under 80 characters.";
  if (region && !isRegionSlug(region)) errors.region = "Choose a region from the list.";
  if (phoneInput && !phone) errors.phone = "Enter a Ghana number like 024 123 4567, or start with + for another country.";

  return {
    data: { display_name: displayName, region: (region || null) as RegionSlug | null, phone },
    errors,
  };
}

/** Only same-site paths, so a crafted link can't bounce users to another domain. */
export function safeNextPath(next: string | null | undefined, fallback = "/dashboard") {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}
