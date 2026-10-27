/**
 * Parsing and checks for the opportunity posting form, shared by the admin
 * area (issue #159) and the organisation area (#161). Pure, so it is unit
 * tested; the database checks the same limits again.
 *
 * Organisation posts never send organisation_name or source_url: the
 * database copies the organisation's own name, so nobody posts as someone
 * else.
 */
import { slugify } from "@/lib/roadmap-admin";
import { FIELD_CATEGORIES, TRACKS } from "@/lib/roadmap-admin";
import { isRegionSlug } from "@/lib/regions";
import { parseIsoDate, type FieldErrors } from "@/lib/validation";
import { OPPORTUNITY_KINDS, OPPORTUNITY_STATUSES, accraToday, type OpportunityKind, type OpportunityStatus } from "./model";

/** Same rule as the opportunities.slug check constraint (3 to 80 characters). */
export const OPPORTUNITY_SLUG = /^[a-z0-9][a-z0-9-]{1,78}[a-z0-9]$/;
/** Static paths beside /opportunities/[slug]. */
export const RESERVED_SLUGS = new Set(["saved", "new"]);

export const LIMITS = {
  title: 140,
  summary: 300,
  description: 8000,
  organisation_name: 120,
  apply_instructions: 1000,
  location: 120,
  eligibility: 2000,
  compensation_note: 200,
  fields: 5,
  skills: 20,
  tracks: 10,
  skill: 60,
} as const;

export type OpportunityFormMode = "admin" | "organisation";

export type OpportunityFields = {
  slug: string;
  kind: OpportunityKind;
  title: string;
  summary: string | null;
  description: string;
  apply_url: string | null;
  apply_instructions: string | null;
  location: string | null;
  region: string | null;
  is_remote: boolean;
  deadline: string | null;
  eligibility: string | null;
  fields: string[];
  skills: string[];
  tracks: string[];
  compensation_note: string | null;
  status: OpportunityStatus;
  /** Admin posts only. */
  organisation_name?: string;
  /** Admin posts only. */
  source_url?: string | null;
};

export type OpportunityFieldName = keyof OpportunityFields | "apply";

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Same rule as private.url_ok: http or https, no spaces or angle brackets, 2000 characters. */
export function isUrl(value: string): boolean {
  return value.length <= 2000 && /^https?:\/\/[^\s<>"]+$/i.test(value) && URL.canParse(value);
}

/** "Excel, Canva ,excel" becomes ["Excel", "Canva"]: trimmed, de-duplicated ignoring case. */
export function parseList(value: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of value.split(/[,\n]/)) {
    const item = raw.trim().replace(/\s+/g, " ");
    if (!item || seen.has(item.toLowerCase())) continue;
    seen.add(item.toLowerCase());
    out.push(item);
  }
  return out;
}

/** A slug from the title with a short random tail, since many posts share a title ("Data intern"). */
export function autoSlug(title: string, tail: string = Math.random().toString(36).slice(2, 6)): string {
  const base = slugify(title).slice(0, 70).replace(/-+$/, "") || "opportunity";
  const slug = `${base}-${tail}`;
  return base.length < 2 ? `opportunity-${tail}` : slug;
}

function checkLength(errors: FieldErrors<OpportunityFieldName>, key: OpportunityFieldName, value: string, max: number) {
  if (value.length > max) errors[key] = `Keep this to ${max} characters.`;
}

export function parseOpportunityForm(
  form: FormData,
  { mode, now = new Date(), tail }: { mode: OpportunityFormMode; now?: Date; tail?: string },
) {
  const errors: FieldErrors<OpportunityFieldName> = {};
  const title = text(form, "title");
  const slugInput = text(form, "slug").toLowerCase();
  const kind = OPPORTUNITY_KINDS.find((k) => k.value === text(form, "kind"))?.value;
  const status = OPPORTUNITY_STATUSES.find((s) => s.value === (text(form, "status") || "draft"))?.value;
  const summary = text(form, "summary");
  const description = text(form, "description");
  const applyUrl = text(form, "apply_url");
  const applyInstructions = text(form, "apply_instructions");
  const location = text(form, "location");
  const region = text(form, "region");
  const deadline = text(form, "deadline");
  const eligibility = text(form, "eligibility");
  const compensation = text(form, "compensation_note");
  const fields = form.getAll("fields").filter((v): v is string => typeof v === "string");
  const tracks = form.getAll("tracks").filter((v): v is string => typeof v === "string");
  const skills = parseList(text(form, "skills"));

  if (!title) errors.title = "Enter a title.";
  else checkLength(errors, "title", title, LIMITS.title);

  const slug = slugInput || autoSlug(title, tail);
  if (!OPPORTUNITY_SLUG.test(slug)) errors.slug = "Use lowercase letters, numbers and hyphens, 3 to 80 characters.";
  else if (RESERVED_SLUGS.has(slug)) errors.slug = "That address is taken by another page. Choose another slug.";

  if (!kind) errors.kind = "Choose a type.";
  if (!status) errors.status = "Choose a status.";
  checkLength(errors, "summary", summary, LIMITS.summary);
  if (!description) errors.description = "Describe the opportunity.";
  else checkLength(errors, "description", description, LIMITS.description);

  if (applyUrl && !isUrl(applyUrl)) errors.apply_url = "Enter a full link starting with https://";
  checkLength(errors, "apply_instructions", applyInstructions, LIMITS.apply_instructions);
  if (!applyUrl && !applyInstructions) errors.apply = "Add an application link or instructions, so people know how to apply.";

  checkLength(errors, "location", location, LIMITS.location);
  if (region && !isRegionSlug(region)) errors.region = "Choose a region from the list.";

  if (deadline) {
    if (!parseIsoDate(deadline)) errors.deadline = "Enter a real date.";
    else if (status === "open" && deadline < accraToday(now)) errors.deadline = "This date has passed. Choose a later date or save it as closed.";
  }

  checkLength(errors, "eligibility", eligibility, LIMITS.eligibility);
  checkLength(errors, "compensation_note", compensation, LIMITS.compensation_note);

  if (fields.some((f) => !FIELD_CATEGORIES.some((c) => c.value === f))) errors.fields = "Choose fields from the list.";
  else if (fields.length > LIMITS.fields) errors.fields = `Choose up to ${LIMITS.fields} fields.`;
  if (tracks.some((t) => !TRACKS.some((c) => c.value === t))) errors.tracks = "Choose tracks from the list.";
  else if (tracks.length > LIMITS.tracks) errors.tracks = `Choose up to ${LIMITS.tracks} tracks.`;
  if (skills.length > LIMITS.skills) errors.skills = `List up to ${LIMITS.skills} skills.`;
  else if (skills.some((s) => s.length > LIMITS.skill)) errors.skills = `Keep each skill to ${LIMITS.skill} characters.`;

  const data: OpportunityFields = {
    slug,
    kind: kind ?? "job",
    title,
    summary: summary || null,
    description,
    apply_url: applyUrl || null,
    apply_instructions: applyInstructions || null,
    location: location || null,
    region: region || null,
    is_remote: form.get("is_remote") === "on",
    deadline: deadline || null,
    eligibility: eligibility || null,
    fields: [...new Set(fields)],
    skills,
    tracks: [...new Set(tracks)],
    compensation_note: compensation || null,
    status: status ?? "draft",
  };

  if (mode === "admin") {
    const organisationName = text(form, "organisation_name");
    const sourceUrl = text(form, "source_url");
    if (!organisationName) errors.organisation_name = "Enter who is offering this.";
    else checkLength(errors, "organisation_name", organisationName, LIMITS.organisation_name);
    if (sourceUrl && !isUrl(sourceUrl)) errors.source_url = "Enter a full link starting with https://";
    data.organisation_name = organisationName;
    data.source_url = sourceUrl || null;
  }

  return { data, errors };
}

/** What a posting Server Action returns to OpportunityForm. */
export type OpportunityFormState = {
  errors?: FieldErrors<OpportunityFieldName>;
  message?: string;
  /** Timestamp of the last successful save, to show "Saved". */
  saved?: number;
  /**
   * What was submitted, returned with errors so the form shows it again
   * (React resets a form after its action runs). Pair with `at`.
   */
  values?: OpportunityFormValues;
  /** Timestamp of this response; the form remounts on it to apply `values`. */
  at?: number;
};

/** The values OpportunityForm starts from when editing. */
export type OpportunityFormValues = Partial<Omit<OpportunityFields, "kind" | "status">> & {
  id?: string;
  kind?: string;
  status?: string;
};

/** The response for a form with errors: the messages plus what was typed. */
export function rejected(
  data: OpportunityFields,
  form: FormData,
  errors: FieldErrors<OpportunityFieldName>,
  message?: string,
): OpportunityFormState {
  const id = form.get("id");
  const slug = form.get("slug");
  return {
    errors,
    message,
    values: { ...data, id: typeof id === "string" ? id : undefined, slug: typeof slug === "string" ? slug : "" },
    at: Date.now(),
  };
}
