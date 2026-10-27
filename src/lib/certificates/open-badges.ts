/**
 * Open Badges 3.0 documents for programme certificates (issue #147).
 *
 * Follows the 1EdTech Open Badges 3.0 data model on the W3C Verifiable
 * Credentials Data Model 2.0: an issuer Profile, one Achievement per
 * programme, and an OpenBadgeCredential per certificate. Everything is
 * self hosted at stable URLs on the canonical site origin, so a credential
 * keeps resolving from any deployment.
 *
 * Privacy: the credential names the recipient by their display name only
 * (an IdentityObject of type "name", unhashed, because the verify page
 * shows the name anyway). Never an email, phone or profile id.
 *
 * Signing: credentials are stored and served unsigned. When the
 * OPEN_BADGES_SIGNING_KEY env var holds an Ed25519 key, signing.ts also
 * serves a VC JWT of the same credential. Without a key, verification is
 * hosted: the /verify/[id] page is the source of truth.
 *
 * Pure functions, no I/O: unit tested in open-badges.test.ts.
 */

export const OB_CONTEXT = [
  "https://www.w3.org/ns/credentials/v2",
  "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
] as const;

export const ISSUER_NAME = "SydCrest Launchpad";
export const ISSUER_DESCRIPTION =
  "SydCrest Launchpad helps young people in Northern Ghana find a path into tech, learn with a mentor and start earning.";

/** 32 lowercase hex characters, the shape of certificates.verification_id. */
export const VERIFICATION_ID = /^[0-9a-f]{32}$/;

export function normalizeVerificationId(raw: string): string | null {
  const id = raw.trim().toLowerCase();
  return VERIFICATION_ID.test(id) ? id : null;
}

/** Stable public URLs. `origin` is the canonical site origin (SITE_URL), no trailing slash. */
export function badgeUrls(origin: string) {
  const base = origin.replace(/\/+$/, "");
  return {
    issuer: `${base}/badges/issuer.json`,
    issuerImage: `${base}/icons/icon-512.png`,
    site: base,
    achievement: (programSlug: string) => `${base}/badges/${programSlug}/achievement.json`,
    achievementImage: (programSlug: string) => `${base}/badges/${programSlug}/image.png`,
    verifyPage: (verificationId: string) => `${base}/verify/${verificationId}`,
    credential: (verificationId: string) => `${base}/verify/${verificationId}/credential.json`,
    credentialJwt: (verificationId: string) => `${base}/verify/${verificationId}/credential.jwt`,
  };
}

export type IssuerProfile = {
  "@context": typeof OB_CONTEXT;
  id: string;
  type: ["Profile"];
  name: string;
  url: string;
  description: string;
  image: { id: string; type: "Image" };
};

export function buildIssuerProfile(origin: string): IssuerProfile {
  const urls = badgeUrls(origin);
  return {
    "@context": OB_CONTEXT,
    id: urls.issuer,
    type: ["Profile"],
    name: ISSUER_NAME,
    url: urls.site,
    description: ISSUER_DESCRIPTION,
    image: { id: urls.issuerImage, type: "Image" },
  };
}

export type ProgramForBadge = {
  slug: string;
  title: string;
  summary: string | null;
  certification_summary: string | null;
};

export function achievementDescription(program: ProgramForBadge) {
  return program.summary?.trim() || `A mentored programme on ${ISSUER_NAME}.`;
}

export function achievementCriteria(program: ProgramForBadge) {
  return (
    program.certification_summary?.trim() ||
    "Pass every week's assignment, including the capstone, review a classmate's capstone, and pass the mentor's final review."
  );
}

/** The Achievement definition for a programme (one per programme, no personal data). */
export function buildAchievement(origin: string, program: ProgramForBadge) {
  const urls = badgeUrls(origin);
  return {
    id: urls.achievement(program.slug),
    type: ["Achievement"] as ["Achievement"],
    achievementType: "Certificate" as const,
    name: program.title,
    description: achievementDescription(program),
    criteria: { narrative: achievementCriteria(program) },
    image: { id: urls.achievementImage(program.slug), type: "Image" as const, caption: `${program.title} badge` },
    creator: { id: urls.issuer, type: ["Profile"] as ["Profile"], name: ISSUER_NAME, url: urls.site },
  };
}

/** The Achievement as a standalone JSON-LD document, served at its id. */
export function buildAchievementDocument(origin: string, program: ProgramForBadge) {
  return { "@context": OB_CONTEXT, ...buildAchievement(origin, program) };
}

export type CertificateForBadge = {
  verification_id: string;
  recipient_name: string;
  program_title: string;
  specialization_label: string | null;
  issued_at: string;
};

/**
 * The OpenBadgeCredential for one certificate. Built from the certificate's
 * snapshot (name, programme title, specialization at issue time), so it does
 * not change if the programme or the learner's profile changes later.
 */
export function buildCredential(origin: string, cert: CertificateForBadge, program: ProgramForBadge) {
  const urls = badgeUrls(origin);
  const achievement = { ...buildAchievement(origin, program), name: cert.program_title };
  const title = cert.specialization_label
    ? `${cert.program_title}: ${cert.specialization_label}`
    : cert.program_title;
  return {
    "@context": OB_CONTEXT,
    id: urls.credential(cert.verification_id),
    type: ["VerifiableCredential", "OpenBadgeCredential"] as ["VerifiableCredential", "OpenBadgeCredential"],
    name: `${title} certificate`,
    description: `Awarded to ${cert.recipient_name} for completing ${title} on ${ISSUER_NAME}. Check it at ${urls.verifyPage(cert.verification_id)}.`,
    issuer: { id: urls.issuer, type: ["Profile"] as ["Profile"], name: ISSUER_NAME, url: urls.site },
    validFrom: new Date(cert.issued_at).toISOString(),
    credentialSubject: {
      type: ["AchievementSubject"] as ["AchievementSubject"],
      identifier: [
        {
          type: "IdentityObject" as const,
          identityType: "name" as const,
          hashed: false,
          identityHash: cert.recipient_name,
        },
      ],
      achievement,
    },
    image: { id: urls.achievementImage(program.slug), type: "Image" as const },
    evidence: [
      {
        id: urls.verifyPage(cert.verification_id),
        type: ["Evidence"] as ["Evidence"],
        name: "Public verification page",
      },
    ],
  };
}

export type OpenBadgeCredential = ReturnType<typeof buildCredential>;
