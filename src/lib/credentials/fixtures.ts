import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { deflateSync } from "node:zlib";
import type { FetchDoc } from "./open-badges-import";

/**
 * Test fixtures for Open Badge imports: a fake issuer website (an in memory
 * map of URL to document), Open Badges 2.0 hosted assertions and Open Badges
 * 3.0 VC JWTs signed with a key made for the test, and baked PNG and SVG
 * files. Used only by the unit tests; never imported by the app.
 */

export const EMAIL = "mariama@example.test";
export const ISSUER = "https://badges.tamale-tech.example/issuer.json";

export function hashedEmail(email: string, salt: string) {
  return `sha256$${createHash("sha256").update(email + salt).digest("hex")}`;
}

export function site(docs: Record<string, unknown>, statuses: Record<string, number> = {}): FetchDoc & { calls: string[] } {
  const calls: string[] = [];
  const fetchDoc = (async (url: string) => {
    calls.push(url);
    if (statuses[url]) return { url, status: statuses[url], json: null, text: "" };
    if (!(url in docs)) throw new Error(`not found ${url}`);
    const doc = docs[url];
    return typeof doc === "string" ? { url, status: 200, json: null, text: doc } : { url, status: 200, json: doc, text: JSON.stringify(doc) };
  }) as FetchDoc & { calls: string[] };
  fetchDoc.calls = calls;
  return fetchDoc;
}

// Open Badges 2.0 ---------------------------------------------------------------

export function ob2Site(overrides: { recipientEmail?: string; revoked?: boolean; assertionHost?: string } = {}) {
  const host = overrides.assertionHost ?? "badges.tamale-tech.example";
  const assertionId = `https://${host}/assertions/42.json`;
  const badgeId = "https://badges.tamale-tech.example/badges/sql.json";
  const assertion = {
    "@context": "https://w3id.org/openbadges/v2",
    type: "Assertion",
    id: assertionId,
    recipient: { type: "email", hashed: true, salt: "pepper", identity: hashedEmail(overrides.recipientEmail ?? EMAIL, "pepper") },
    badge: badgeId,
    issuedOn: "2026-04-02T10:00:00Z",
    verification: { type: "hosted" },
    ...(overrides.revoked ? { revoked: true } : {}),
  };
  const docs = {
    [assertionId]: assertion,
    [badgeId]: { type: "BadgeClass", id: badgeId, name: "SQL Basics", issuer: ISSUER, image: "https://badges.tamale-tech.example/sql.png" },
    [ISSUER]: { type: "Issuer", id: ISSUER, name: "Tamale Tech Hub", url: "https://tamale-tech.example" },
  };
  return { assertion, assertionId, docs };
}

// Open Badges 3.0 ---------------------------------------------------------------

export function issuerKeys() {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const jwk = publicKey.export({ format: "jwk" });
  return { privateKey, jwk: { kty: "OKP", crv: "Ed25519", x: jwk.x as string } };
}

export function ob3Credential(overrides: Record<string, unknown> = {}) {
  return {
    "@context": ["https://www.w3.org/ns/credentials/v2", "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"],
    id: "https://badges.tamale-tech.example/credentials/7",
    type: ["VerifiableCredential", "OpenBadgeCredential"],
    issuer: { id: ISSUER, type: ["Profile"], name: "Tamale Tech Hub" },
    validFrom: "2026-03-01T00:00:00Z",
    credentialSubject: {
      type: ["AchievementSubject"],
      identifier: [{ type: "IdentityObject", identityType: "emailAddress", hashed: true, salt: "s1", identityHash: hashedEmail(EMAIL, "s1") }],
      achievement: { id: "https://badges.tamale-tech.example/achievements/web", type: ["Achievement"], name: "Web Foundations" },
    },
    ...overrides,
  };
}

export function signJwt(payload: object, privateKey: ReturnType<typeof issuerKeys>["privateKey"], kid = `${ISSUER}#key-1`) {
  const b64 = (v: object) => Buffer.from(JSON.stringify(v)).toString("base64url");
  const header = b64({ alg: "EdDSA", typ: "vc+jwt", kid });
  const body = b64(payload);
  const signature = sign(null, Buffer.from(`${header}.${body}`), privateKey).toString("base64url");
  return `${header}.${body}.${signature}`;
}

export function issuerProfile(jwk: object) {
  return {
    "@context": ["https://www.w3.org/ns/credentials/v2"],
    id: ISSUER,
    type: ["Profile"],
    name: "Tamale Tech Hub",
    verificationMethod: [{ id: `${ISSUER}#key-1`, type: "JsonWebKey", controller: ISSUER, publicKeyJwk: jwk }],
  };
}

// Baked files ---------------------------------------------------------------------

function chunk(type: string, data: Buffer) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, "latin1");
  return Buffer.concat([head, data, Buffer.alloc(4)]);
}

/** A tiny PNG with an iTXt chunk, compressed or not. */
export function bakedPng(keyword: string, text: string, compressed = false) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(1, 0);
  ihdr.writeUInt32BE(1, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const body = compressed ? deflateSync(Buffer.from(text, "utf8")) : Buffer.from(text, "utf8");
  const itxt = Buffer.concat([Buffer.from(keyword, "latin1"), Buffer.from([0, compressed ? 1 : 0, 0, 0, 0]), body]);
  return Buffer.concat([signature, chunk("IHDR", ihdr), chunk("iTXt", itxt), chunk("IEND", Buffer.alloc(0))]);
}
