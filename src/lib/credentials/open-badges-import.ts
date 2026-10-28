import { createHash, createPublicKey, verify as cryptoVerify, type JsonWebKey } from "node:crypto";

/**
 * Importing an Open Badge into the credentials wallet (issue #253), and the
 * only path to the "Verified by the issuer" label. Network access is injected
 * (`fetchDoc`, the SSRF guarded fetch in production, fixtures in tests), so
 * everything here is unit tested in open-badges-import.test.ts.
 *
 * What counts as verified, and nothing less:
 *
 * - Open Badges 2.0, hosted verification: the assertion is fetched again from
 *   its own https id on the issuer's domain (or a domain the issuer allows),
 *   it is not revoked, it matches what the learner gave us, and its recipient
 *   is the email address on the learner's SydCrest account.
 * - Open Badges 3.0, VC JWT: the signature checks out with a public key the
 *   issuer publishes in its https profile (EdDSA, ES256 or RS256), the
 *   credential is in its validity window, carries no status list we cannot
 *   read, and names the learner's account email.
 *
 * Anything else (signed 2.0 assertions, Data Integrity proofs that need RDF
 * canonicalisation, DID issuers, a different email) is still imported, as
 * "Added by the learner", with a plain note that says why.
 */

export type FetchedDoc = { url: string; status: number; json: unknown; text: string };
export type FetchDoc = (url: string) => Promise<FetchedDoc>;

export type ImportedFields = {
  title: string;
  issuer_name: string;
  issued_on: string | null;
  expires_on: string | null;
  credential_id: string | null;
  verification_url: string | null;
  /** The badge picture: an https URL or a data: URI. Never shown directly; the server copies it. */
  image: string | null;
};

export type ImportResult =
  | {
      ok: true;
      obVersion: "2.0" | "3.0";
      verified: boolean;
      method: "ob2_hosted" | "ob3_jwt" | null;
      note: string;
      fields: ImportedFields;
      document: Record<string, unknown>;
    }
  | { ok: false; error: string };

type Ctx = { fetchDoc: FetchDoc; email: string | null; now?: Date };
type Json = Record<string, unknown>;

const JWS = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

function isObj(v: unknown): v is Json {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function str(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function types(v: unknown): string[] {
  if (typeof v === "string") return [v];
  return Array.isArray(v) ? v.filter((t): t is string => typeof t === "string") : [];
}

function httpsUrl(v: unknown): string | null {
  const s = str(v);
  if (!s) return null;
  try {
    return new URL(s).protocol === "https:" ? s : null;
  } catch {
    return null;
  }
}

function dateOnly(v: unknown): string | null {
  const s = str(v);
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function idOf(v: unknown): string | null {
  return str(v) ?? (isObj(v) ? str(v.id) : null);
}

function clip(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** Drops embedded images (data URIs can be large) from a stored snapshot. */
function snapshot(doc: unknown): Json {
  const seen = JSON.stringify(doc, (_k, v) => (typeof v === "string" && v.startsWith("data:") ? "[embedded image]" : v));
  const parsed = JSON.parse(seen ?? "{}");
  return seen && seen.length <= 60_000 ? parsed : { note: "The badge document was too large to keep." };
}

function hostOf(url: string | null) {
  if (!url) return null;
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

// Recipient ---------------------------------------------------------------------

/** Compares an Open Badges identity ("sha256$hex", "md5$hex" or plain) with an email. */
export function identityMatchesEmail(identity: string, hashed: boolean, salt: string | null, email: string | null) {
  if (!email) return false;
  const target = email.trim().toLowerCase();
  if (!hashed) return identity.trim().toLowerCase() === target;
  const [alg, hex] = identity.split("$");
  if (!hex || !["sha256", "md5"].includes(alg.toLowerCase())) return false;
  // The spec hashes the identity as written; try it lowercased and as given.
  const candidates = new Set([target, email.trim()]);
  for (const c of candidates) {
    const digest = createHash(alg.toLowerCase()).update(c + (salt ?? "")).digest("hex");
    if (digest === hex.toLowerCase()) return true;
  }
  return false;
}

// Payload classification --------------------------------------------------------

function decodeJws(token: string) {
  const [h, p, s] = token.split(".");
  try {
    const header = JSON.parse(Buffer.from(h, "base64url").toString("utf8"));
    const payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
    if (!isObj(header) || !isObj(payload)) return null;
    return { header, payload, signingInput: `${h}.${p}`, signature: Buffer.from(s, "base64url") };
  } catch {
    return null;
  }
}

function isOb3(doc: Json) {
  const t = types(doc.type);
  return t.includes("OpenBadgeCredential") || t.includes("AchievementCredential") || (t.includes("VerifiableCredential") && isObj(doc.credentialSubject));
}

function isOb2(doc: Json) {
  const t = types(doc.type);
  return t.includes("Assertion") || (doc.badge !== undefined && doc.recipient !== undefined);
}

/**
 * The entry point: `payload` is what the learner gave us (a URL) or what was
 * baked into their file (a URL, JSON or a compact JWT).
 */
export async function importOpenBadge(payload: string, ctx: Ctx): Promise<ImportResult> {
  const text = payload.trim();
  if (!text) return { ok: false, error: "That badge is empty." };
  if (JWS.test(text)) return fromJwt(text, ctx);
  if (text.startsWith("{")) {
    let doc: unknown;
    try {
      doc = JSON.parse(text);
    } catch {
      return { ok: false, error: "The badge data could not be read." };
    }
    return fromJson(doc, ctx, null);
  }
  const url = httpsUrl(text);
  if (!url) return { ok: false, error: "Give the https link to the badge, or upload the badge image." };
  const fetched = await ctx.fetchDoc(url);
  if (fetched.status === 410) return { ok: false, error: "The issuer says this badge has been revoked." };
  if (isObj(fetched.json)) return fromJson(fetched.json, ctx, fetched.url);
  if (JWS.test(fetched.text)) return fromJwt(fetched.text, ctx);
  return { ok: false, error: "That link does not lead to an Open Badge. Try the badge's own link or its image file." };
}

async function fromJson(doc: unknown, ctx: Ctx, fetchedFrom: string | null): Promise<ImportResult> {
  if (!isObj(doc)) return { ok: false, error: "The badge data could not be read." };
  if (isOb3(doc)) return fromOb3Json(doc, ctx);
  if (isOb2(doc)) return fromOb2(doc, ctx, fetchedFrom);
  return { ok: false, error: "That is not an Open Badge we recognise." };
}

// Open Badges 2.0 -------------------------------------------------------------------

async function resolve(v: unknown, ctx: Ctx): Promise<Json | null> {
  if (isObj(v)) return v;
  const url = httpsUrl(v);
  if (!url) return null;
  const res = await ctx.fetchDoc(url);
  return isObj(res.json) ? res.json : null;
}

async function fromOb2(given: Json, ctx: Ctx, fetchedFrom: string | null): Promise<ImportResult> {
  const now = ctx.now ?? new Date();
  const assertionId = httpsUrl(given.id);
  const verificationType = String((isObj(given.verification) ? given.verification.type : null) ?? "hosted").toLowerCase();

  // The hosted copy is the issuer's word; fall back to what we were given for display.
  let hosted: Json | null = null;
  let revoked = given.revoked === true;
  let fetchProblem: string | null = null;
  if (assertionId && (verificationType === "hosted" || verificationType === "hostedbadge")) {
    try {
      const res = fetchedFrom === assertionId ? null : await ctx.fetchDoc(assertionId);
      if (res?.status === 410) revoked = true;
      hosted = res ? (isObj(res.json) ? res.json : null) : given;
      if (hosted?.revoked === true) revoked = true;
    } catch {
      fetchProblem = "The issuer's copy of the badge could not be fetched.";
    }
  }
  const record = hosted ?? given;
  const badge = await resolve(record.badge, ctx).catch(() => null);
  const issuer = badge ? await resolve(badge.issuer, ctx).catch(() => null) : null;
  const title = str(badge?.name);
  const issuerName = str(issuer?.name);
  if (!title || !issuerName) return { ok: false, error: "The badge does not say its name and issuer, so it cannot be added." };

  const fields: ImportedFields = {
    title: clip(title, 200),
    issuer_name: clip(issuerName, 200),
    issued_on: dateOnly(record.issuedOn),
    expires_on: dateOnly(record.expires),
    credential_id: assertionId && assertionId.length <= 200 ? assertionId : null,
    verification_url: (assertionId && assertionId.length <= 2000 ? assertionId : null) ?? fetchedFrom,
    image: idOf(record.image) ?? idOf(badge?.image),
  };
  const document = snapshot({ assertion: record, badge, issuer });
  const result = (verified: boolean, note: string): ImportResult => ({
    ok: true,
    obVersion: "2.0",
    verified,
    method: verified ? "ob2_hosted" : null,
    note,
    fields,
    document,
  });

  if (revoked) return { ok: false, error: "The issuer says this badge has been revoked." };
  if (verificationType === "signed" || verificationType === "signedbadge") {
    return result(false, "This badge uses a signed check we cannot read yet, so it shows as added by you.");
  }
  if (!assertionId) return result(false, "The badge has no hosted link to check with the issuer, so it shows as added by you.");
  if (fetchProblem || !hosted) return result(false, `${fetchProblem ?? "The issuer's copy could not be read."} It shows as added by you.`);
  if (str(hosted.id) !== assertionId) return result(false, "The issuer's copy does not match this badge, so it shows as added by you.");
  if (hosted !== given) {
    const same = idOf(hosted.badge) === idOf(given.badge) && JSON.stringify(hosted.recipient) === JSON.stringify(given.recipient);
    if (!same) return result(false, "The issuer's copy does not match this badge, so it shows as added by you.");
  }

  // The assertion must live where the issuer says its badges live.
  const v = isObj(hosted.verification) ? hosted.verification : {};
  const allowed = (Array.isArray(v.allowedOrigins) ? v.allowedOrigins : v.allowedOrigins ? [v.allowedOrigins] : [])
    .map((o) => String(o).toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, ""));
  const issuerHost = hostOf(httpsUrl(issuer?.id) ?? httpsUrl(issuer?.url));
  const assertionHost = hostOf(assertionId);
  const originOk = allowed.length > 0 ? allowed.includes(assertionHost ?? "") : !!issuerHost && issuerHost === assertionHost;
  if (!originOk) return result(false, "The badge is not hosted on the issuer's own website, so it shows as added by you.");

  const recipient = isObj(hosted.recipient) ? hosted.recipient : null;
  const recipientOk =
    !!recipient &&
    String(recipient.type ?? "email").toLowerCase() === "email" &&
    identityMatchesEmail(String(recipient.identity ?? ""), recipient.hashed === true, str(recipient.salt), ctx.email);
  if (!recipientOk) {
    return result(false, "The issuer's record names a different email address from the one on your account, so it shows as added by you.");
  }
  const expired = fields.expires_on && fields.expires_on < now.toISOString().slice(0, 10);
  return result(true, expired ? "Checked with the issuer. It has expired." : "Checked with the issuer: their hosted record matches.");
}

// Open Badges 3.0 -------------------------------------------------------------------

function ob3Fields(credential: Json, issuer: Json | null): ImportedFields | null {
  const subject = isObj(credential.credentialSubject) ? credential.credentialSubject : null;
  const achievement = subject && isObj(subject.achievement) ? subject.achievement : null;
  const title = str(achievement?.name) ?? str(credential.name);
  const issuerObj = isObj(credential.issuer) ? credential.issuer : null;
  const issuerName = str(issuerObj?.name) ?? str(issuer?.name);
  if (!title || !issuerName) return null;
  const id = str(credential.id);
  return {
    title: clip(title, 200),
    issuer_name: clip(issuerName, 200),
    issued_on: dateOnly(credential.validFrom ?? credential.issuanceDate ?? credential.awardedDate),
    expires_on: dateOnly(credential.validUntil ?? credential.expirationDate),
    credential_id: id && id.length <= 200 ? id : null,
    verification_url: httpsUrl(id),
    image: idOf(credential.image) ?? idOf(achievement?.image),
  };
}

function ob3RecipientMatches(credential: Json, email: string | null) {
  const subject = isObj(credential.credentialSubject) ? credential.credentialSubject : null;
  if (!subject) return false;
  const subjectId = str(subject.id);
  if (subjectId?.toLowerCase().startsWith("mailto:") && identityMatchesEmail(subjectId.slice(7), false, null, email)) return true;
  const ids = Array.isArray(subject.identifier) ? subject.identifier : [];
  return ids.some(
    (i) =>
      isObj(i) &&
      String(i.identityType ?? "") === "emailAddress" &&
      identityMatchesEmail(String(i.identityHash ?? ""), i.hashed === true, str(i.salt), email),
  );
}

async function fromOb3Json(credential: Json, ctx: Ctx): Promise<ImportResult> {
  const issuerId = idOf(credential.issuer);
  const fields = ob3Fields(credential, null);
  if (!fields) return { ok: false, error: "The badge does not say its name and issuer, so it cannot be added." };
  const document = snapshot(credential);
  const proofTypes = (Array.isArray(credential.proof) ? credential.proof : credential.proof ? [credential.proof] : [])
    .map((p) => (isObj(p) ? String(p.type ?? "") : ""));
  // A JSON credential may point at its own signed copy: try that first.
  const selfUrl = httpsUrl(credential.id);
  if (selfUrl) {
    try {
      const res = await ctx.fetchDoc(selfUrl);
      if (JWS.test(res.text)) {
        const viaJwt = await fromJwt(res.text, ctx);
        if (viaJwt.ok && viaJwt.verified) return viaJwt;
      }
    } catch {
      // Fall through to the honest "added by you".
    }
  }
  const note = proofTypes.length
    ? "This badge is signed in a way we cannot check yet, so it shows as added by you."
    : issuerId
      ? "This badge has no signature to check, so it shows as added by you."
      : "This badge does not name its issuer's website, so it shows as added by you.";
  return { ok: true, obVersion: "3.0", verified: false, method: null, note, fields, document };
}

type Jwk = JsonWebKey & { kid?: string };

function keysFrom(doc: Json | null): { id: string | null; jwk: Jwk }[] {
  if (!doc) return [];
  const methods = [doc.verificationMethod, doc.publicKey, doc.assertionMethod].flatMap((m) => (Array.isArray(m) ? m : m ? [m] : []));
  return methods
    .filter(isObj)
    .filter((m) => isObj(m.publicKeyJwk))
    .map((m) => ({ id: str(m.id), jwk: m.publicKeyJwk as Jwk }));
}

const ALGS: Record<string, { hash: string | null; kty: string; crv?: string; dsa?: "ieee-p1363"; pss?: boolean }> = {
  EdDSA: { hash: null, kty: "OKP", crv: "Ed25519" },
  ES256: { hash: "sha256", kty: "EC", crv: "P-256", dsa: "ieee-p1363" },
  RS256: { hash: "sha256", kty: "RSA" },
};

/** Checks a compact JWS signature with a JWK. Exported for tests. */
export function verifyJws(signingInput: string, signature: Buffer, alg: string, jwk: Jwk): boolean {
  const spec = ALGS[alg];
  if (!spec || jwk.kty !== spec.kty || (spec.crv && jwk.crv !== spec.crv)) return false;
  try {
    const key = createPublicKey({ key: jwk, format: "jwk" });
    return cryptoVerify(spec.hash, Buffer.from(signingInput), spec.dsa ? { key, dsaEncoding: spec.dsa } : key, signature);
  } catch {
    return false;
  }
}

async function fromJwt(token: string, ctx: Ctx): Promise<ImportResult> {
  const now = ctx.now ?? new Date();
  const decoded = decodeJws(token);
  if (!decoded) return { ok: false, error: "The badge data could not be read." };
  const { header, payload } = decoded;
  const credential = isObj(payload.vc) ? payload.vc : payload;
  if (!isOb3(credential)) return { ok: false, error: "That is not an Open Badge we recognise." };
  const issuerId = httpsUrl(idOf(credential.issuer) ?? payload.iss);
  let issuerProfile: Json | null = null;
  if (issuerId) {
    try {
      const res = await ctx.fetchDoc(issuerId);
      issuerProfile = isObj(res.json) ? res.json : null;
    } catch {
      issuerProfile = null;
    }
  }
  const fields = ob3Fields(credential, issuerProfile);
  if (!fields) return { ok: false, error: "The badge does not say its name and issuer, so it cannot be added." };
  const document = snapshot(credential);
  const result = (verified: boolean, note: string): ImportResult => ({
    ok: true,
    obVersion: "3.0",
    verified,
    method: verified ? "ob3_jwt" : null,
    note,
    fields,
    document,
  });

  if (!issuerId) return result(false, "The badge's issuer is not a website we can check, so it shows as added by you.");
  if (!issuerProfile) return result(false, "The issuer's profile could not be fetched, so it shows as added by you.");
  if (payload.iss !== undefined && str(payload.iss) !== issuerId && str(payload.iss) !== idOf(credential.issuer)) {
    return result(false, "The badge's signature names a different issuer, so it shows as added by you.");
  }

  // Keys the issuer publishes: in its profile, or in a key document on the same site.
  const kid = str(header.kid);
  let keys = keysFrom(issuerProfile);
  const kidDoc = kid && httpsUrl(kid.split("#")[0]);
  if (kidDoc && kidDoc !== issuerId && hostOf(kidDoc) === hostOf(issuerId)) {
    try {
      const res = await ctx.fetchDoc(kidDoc);
      keys = keys.concat(keysFrom(isObj(res.json) ? res.json : null));
      if (isObj(res.json) && isObj((res.json as Json).publicKeyJwk)) {
        keys.push({ id: str((res.json as Json).id) ?? kid, jwk: (res.json as Json).publicKeyJwk as Jwk });
      }
    } catch {
      // No extra keys.
    }
  }
  const candidates = kid ? keys.filter((k) => k.id === kid || k.jwk.kid === kid) : keys.length === 1 ? keys : [];
  const alg = String(header.alg ?? "");
  if (!ALGS[alg]) return result(false, "This badge is signed in a way we cannot check yet, so it shows as added by you.");
  if (candidates.length === 0) return result(false, "The issuer does not publish the key this badge was signed with, so it shows as added by you.");
  const signed = candidates.some((k) => verifyJws(decoded.signingInput, decoded.signature, alg, k.jwk));
  if (!signed) return result(false, "The badge's signature does not match the issuer's key, so it shows as added by you.");

  const nowSec = now.getTime() / 1000;
  if (typeof payload.nbf === "number" && payload.nbf > nowSec + 300) return result(false, "This badge is not valid yet, so it shows as added by you.");
  const validFrom = str(credential.validFrom);
  if (validFrom && new Date(validFrom).getTime() > now.getTime() + 300_000) return result(false, "This badge is not valid yet, so it shows as added by you.");
  if (credential.credentialStatus) {
    return result(false, "This badge has a revocation list we cannot read yet, so it shows as added by you.");
  }
  if (!ob3RecipientMatches(credential, ctx.email)) {
    return result(false, "The badge names a different email address from the one on your account, so it shows as added by you.");
  }
  const expired =
    (typeof payload.exp === "number" && payload.exp < nowSec) || (fields.expires_on && fields.expires_on < now.toISOString().slice(0, 10));
  return result(true, expired ? "The issuer's signature checks out. It has expired." : "The issuer's signature checks out.");
}
