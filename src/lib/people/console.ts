/**
 * People console (issue #332): labels and parsing for the account panel and
 * the admin audit log. Pure, so it is unit tested.
 */
import type { Json } from "@/lib/supabase/database.types";

export const AUDIT_ACTIONS = {
  learner_searched: "Searched",
  learner_viewed: "Opened the page",
  confirmation_resent: "Resent the confirmation email",
  role_changed: "Changed the role",
  account_paused: "Paused the account",
  account_reactivated: "Reactivated the account",
  support_note: "Support note",
  account_deleted: "Account deleted",
} as const;

export function auditActionLabel(action: string): string {
  return (AUDIT_ACTIONS as Record<string, string>)[action] ?? action;
}

export const ROLES = [
  { value: "learner", label: "Learner" },
  { value: "mentor", label: "Mentor" },
  { value: "admin", label: "Admin" },
] as const;

const PROVIDERS: Record<string, string> = { email: "Email and password", google: "Google" };

export function providersLabel(providers: string[] | null | undefined): string {
  if (!providers?.length) return "Not known";
  return providers.map((p) => PROVIDERS[p] ?? p).join(", ");
}

export type ConsentRow = { kind: string; version: string; granted_at: string; revoked_at: string | null };
export type MembershipRow = { kind: "cohort" | "application" | "chapter"; label: string; role: string | null; status: string; at: string };

function rows(value: Json | null | undefined): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return (value as unknown[]).filter((v): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v));
}

const str = (v: unknown) => (typeof v === "string" ? v : null);

export function parseConsents(value: Json | null | undefined): ConsentRow[] {
  return rows(value)
    .map((r) => ({ kind: str(r.kind) ?? "", version: str(r.version) ?? "", granted_at: str(r.granted_at) ?? "", revoked_at: str(r.revoked_at) }))
    .filter((r) => r.kind);
}

export function parseMemberships(value: Json | null | undefined): MembershipRow[] {
  return rows(value)
    .map((r) => ({
      kind: str(r.kind) as MembershipRow["kind"],
      label: str(r.label) ?? "",
      role: str(r.role),
      status: str(r.status) ?? "",
      at: str(r.at) ?? "",
    }))
    .filter((r) => r.kind === "cohort" || r.kind === "application" || r.kind === "chapter");
}

const CONSENT_KINDS: Record<string, string> = {
  terms: "Terms",
  privacy: "Privacy",
  whatsapp: "WhatsApp updates",
  age_confirmation: "18 or over",
};

/** "Terms 2026-10-01, agreed 2026-10-03" or "... withdrawn 2026-11-01". */
export function consentLine(c: ConsentRow): [string, string] {
  const when = c.revoked_at ? `withdrawn ${c.revoked_at.slice(0, 10)}` : `agreed ${c.granted_at.slice(0, 10)}`;
  return [`${CONSENT_KINDS[c.kind] ?? c.kind} ${c.version}`, when];
}

/** Whether the member has a live terms consent for the current legal version. */
export function onCurrentTerms(consents: ConsentRow[], legalVersion: string): boolean {
  return consents.some((c) => c.kind === "terms" && c.version === legalVersion && !c.revoked_at);
}

/** Feedback after an admin action, from ?done= or ?error= on the learner page. */
export const ACTION_NOTICES: Record<string, { tone: "success" | "danger" | "info"; text: string }> = {
  note: { tone: "success", text: "Note saved to the audit log." },
  role: { tone: "success", text: "Role updated." },
  paused: { tone: "success", text: "Account paused. They cannot sign in until it is reactivated." },
  reactivated: { tone: "success", text: "Account reactivated." },
  resent: { tone: "success", text: "Confirmation email sent." },
  confirmed: { tone: "info", text: "Their email is already confirmed, so nothing was sent." },
  unkeyed: { tone: "info", text: "Email sending is not set up here (no SUPABASE_SECRET_KEY), so nothing was sent." },
  "last-admin": { tone: "danger", text: "That would leave SydCrest with no admin. Make someone else an admin first." },
  "admin-pause": { tone: "danger", text: "Admins cannot be paused. Change their role first." },
  "bad-note": { tone: "danger", text: "A note is 1 to 500 characters." },
  failed: { tone: "danger", text: "That did not work. Please try again." },
};
