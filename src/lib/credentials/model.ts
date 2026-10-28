import type { Verification } from "./share";

/**
 * Shapes and form rules for external credentials (issue #253). No Node only
 * imports: the add form (a client component) shares the limits.
 */

export const CREDENTIALS_BUCKET = "credentials";

/** What the bucket accepts (supabase/migrations/20261029220000_credentials_wallet.sql). */
export const FILE_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
/** A baked badge travels through a Server Action, whose body limit is 1 MB. */
export const MAX_BADGE_BYTES = 900 * 1024;

export type ExternalCredential = {
  id: string;
  profile_id: string;
  title: string;
  issuer_name: string;
  issued_on: string | null;
  expires_on: string | null;
  credential_id: string | null;
  verification_url: string | null;
  file_path: string | null;
  file_url: string | null;
  visibility: string;
  source: string;
  verification: string;
  verified_at: string | null;
  verification_note: string | null;
  hidden_at: string | null;
  created_at: string;
};

/** The label key for an external credential: issuer only when the server recorded it. */
export function externalVerification(row: { verification: string }): Verification {
  return row.verification === "issuer" ? "issuer" : "learner";
}

/** The storage path for a new file: the owner's folder, a fresh uuid, the type's extension. */
export function credentialFilePath(profileId: string, mime: string, uuid: string) {
  const ext = FILE_TYPES[mime];
  return ext ? `${profileId}/${uuid}.${ext}` : null;
}

/** True when a path is a file this person may attach (their own folder, our naming). */
export function isOwnFilePath(profileId: string, path: string) {
  return new RegExp(`^${profileId}/[0-9a-f-]{36}\\.(pdf|png|jpg|webp)$`).test(path);
}

export type CredentialInput = {
  title: string;
  issuer_name: string;
  issued_on: string | null;
  expires_on: string | null;
  credential_id: string | null;
  verification_url: string | null;
  visibility: "private" | "public";
};

export type CredentialErrors = Partial<Record<keyof CredentialInput | "file_path" | "form", string>>;

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function text(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Reads and checks the add or edit form. Messages are plain, British English, no dashes. */
export function parseCredentialForm(form: FormData): { input?: CredentialInput; errors: CredentialErrors } {
  const errors: CredentialErrors = {};
  const title = text(form, "title");
  const issuer = text(form, "issuer_name");
  const issued = text(form, "issued_on");
  const expires = text(form, "expires_on");
  const credentialId = text(form, "credential_id");
  const url = text(form, "verification_url");
  const visibility = text(form, "visibility") === "public" ? "public" : "private";

  if (!title) errors.title = "Give the certificate's name.";
  else if (title.length > 200) errors.title = "Keep the name under 200 characters.";
  if (!issuer) errors.issuer_name = "Say who issued it.";
  else if (issuer.length > 200) errors.issuer_name = "Keep the issuer under 200 characters.";
  if (issued && !DATE.test(issued)) errors.issued_on = "Choose a date.";
  if (expires && !DATE.test(expires)) errors.expires_on = "Choose a date.";
  if (issued && expires && DATE.test(issued) && DATE.test(expires) && expires < issued) {
    errors.expires_on = "The expiry date cannot be before the issue date.";
  }
  if (credentialId.length > 200) errors.credential_id = "Keep the credential ID under 200 characters.";
  if (url) {
    let ok = false;
    try {
      ok = new URL(url).protocol === "https:" && url.length <= 2000 && !/\s/.test(url);
    } catch {
      ok = false;
    }
    if (!ok) errors.verification_url = "Use the full https link the issuer gave you.";
  }
  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    input: {
      title,
      issuer_name: issuer,
      issued_on: issued || null,
      expires_on: expires || null,
      credential_id: credentialId || null,
      verification_url: url || null,
      visibility,
    },
  };
}

/** Reasons for reporting a credential (stored as the report's reason). */
export const CREDENTIAL_REPORT_REASONS = [
  "Fake or misleading certificate",
  "Not this person's certificate",
  "Spam or scam",
  "Inappropriate content",
  "Something else",
] as const;

export type TalentCredential = {
  id: string;
  title: string;
  issuer_name: string;
  issued_on: string | null;
  verification: "issuer" | "learner";
  verification_url: string | null;
};

/** The `external_credentials` column of `talent_directory`: well formed entries only. */
export function parseTalentCredentials(json: unknown): TalentCredential[] {
  if (!Array.isArray(json)) return [];
  return json.flatMap((e) => {
    if (typeof e !== "object" || e === null) return [];
    const r = e as Record<string, unknown>;
    if (typeof r.id !== "string" || typeof r.title !== "string" || typeof r.issuer_name !== "string") return [];
    return [
      {
        id: r.id,
        title: r.title,
        issuer_name: r.issuer_name,
        issued_on: typeof r.issued_on === "string" ? r.issued_on : null,
        verification: r.verification === "issuer" ? ("issuer" as const) : ("learner" as const),
        verification_url: typeof r.verification_url === "string" && r.verification_url.startsWith("https://") ? r.verification_url : null,
      },
    ];
  });
}
