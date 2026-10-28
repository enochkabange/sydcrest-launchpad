/**
 * Sharing a credential (issue #253): LinkedIn's own "add a certification"
 * link, the embed snippet and the honest label every surface shows. Pure,
 * unit tested in share.test.ts.
 *
 * Visible copy: British English, no dashes, device neutral. SydCrest never
 * checks an external certificate, so nothing here says it did.
 */

export type Verification = "sydcrest" | "issuer" | "learner";

/** The three labels, word for word, used everywhere a credential appears. */
export const VERIFICATION_LABEL: Record<Verification, string> = {
  sydcrest: "Verified by SydCrest",
  issuer: "Verified by the issuer",
  learner: "Added by the learner",
};

/** One plain sentence on what the label means. */
export const VERIFICATION_EXPLAINER: Record<Verification, string> = {
  sydcrest: "Earned on SydCrest Launchpad. Anyone can check it on its verification page.",
  issuer: "The issuer's own record of this badge was checked when it was imported. SydCrest did not award it.",
  learner: "SydCrest has not checked this. Ask the issuer, or use their link, to confirm it.",
};

export type LinkedInCertification = {
  name: string;
  organizationName: string;
  issuedOn?: string | null;
  expiresOn?: string | null;
  certUrl?: string | null;
  certId?: string | null;
};

function yearMonth(date: string | null | undefined) {
  const m = date?.match(/^(\d{4})-(\d{2})/);
  return m ? { year: m[1], month: String(Number(m[2])) } : null;
}

/**
 * LinkedIn's documented "Add to profile" link for a certification
 * (https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME...). It
 * opens the learner's own LinkedIn with the form filled in; nothing is sent
 * from SydCrest.
 */
export function linkedInAddUrl(cert: LinkedInCertification): string {
  const params = new URLSearchParams({ startTask: "CERTIFICATION_NAME", name: cert.name.trim() });
  params.set("organizationName", cert.organizationName.trim());
  const issued = yearMonth(cert.issuedOn);
  if (issued) {
    params.set("issueYear", issued.year);
    params.set("issueMonth", issued.month);
  }
  const expires = yearMonth(cert.expiresOn);
  if (expires) {
    params.set("expirationYear", expires.year);
    params.set("expirationMonth", expires.month);
  }
  if (cert.certUrl && /^https:\/\//.test(cert.certUrl)) params.set("certUrl", cert.certUrl);
  if (cert.certId?.trim()) params.set("certId", cert.certId.trim());
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * A static snippet for a personal site or blog: a link with the card image.
 * No scripts, no tracking; it shows the same card as the WhatsApp share.
 */
export function embedSnippet({ pageUrl, imageUrl, title, label }: { pageUrl: string; imageUrl: string; title: string; label: string }) {
  const alt = escapeHtml(`${title}: ${label}`);
  return `<a href="${escapeHtml(pageUrl)}" target="_blank" rel="noopener"><img src="${escapeHtml(imageUrl)}" alt="${alt}" width="270" height="270" loading="lazy" style="border-radius:12px"></a>`;
}

/** Date only values from Postgres ("2026-05-01") as "May 2026". */
export function formatMonthYear(date: string | null | undefined) {
  const m = date?.match(/^(\d{4})-(\d{2})/);
  if (!m) return null;
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, 1)),
  );
}

/** True when a date only expiry is before today (Ghana time is UTC). */
export function isExpired(expiresOn: string | null | undefined, now = new Date()) {
  if (!expiresOn || !/^\d{4}-\d{2}-\d{2}$/.test(expiresOn)) return false;
  return expiresOn < now.toISOString().slice(0, 10);
}
