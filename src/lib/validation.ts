import { isRegionSlug, type RegionSlug } from "./regions";

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD = 8;

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function parseSignUp(form: FormData) {
  const fullName = text(form, "full_name");
  const email = text(form, "email").toLowerCase();
  const password = typeof form.get("password") === "string" ? (form.get("password") as string) : "";
  const errors: FieldErrors<"full_name" | "email" | "password"> = {};

  if (!fullName) errors.full_name = "Tell us your name.";
  else if (fullName.length > 80) errors.full_name = "Keep your name under 80 characters.";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  if (password.length < MIN_PASSWORD) errors.password = `Use at least ${MIN_PASSWORD} characters.`;

  return { data: { fullName, email, password }, errors };
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
