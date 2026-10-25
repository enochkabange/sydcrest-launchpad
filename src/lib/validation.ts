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

export function parseProfile(form: FormData) {
  const displayName = text(form, "display_name");
  const region = text(form, "region");
  const errors: FieldErrors<"display_name" | "region"> = {};

  if (!displayName) errors.display_name = "Your name can't be empty.";
  else if (displayName.length > 80) errors.display_name = "Keep your name under 80 characters.";
  if (region && !isRegionSlug(region)) errors.region = "Choose a region from the list.";

  return {
    data: { display_name: displayName, region: (region || null) as RegionSlug | null },
    errors,
  };
}

/** Only same-site paths, so a crafted link can't bounce users to another domain. */
export function safeNextPath(next: string | null | undefined, fallback = "/dashboard") {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}
