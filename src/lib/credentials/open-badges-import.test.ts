import { describe, expect, it } from "vitest";
import { generateKeyPairSync } from "node:crypto";
import { identityMatchesEmail, importOpenBadge } from "./open-badges-import";
import { EMAIL, ISSUER, issuerKeys, issuerProfile, ob2Site, ob3Credential, signJwt, site } from "./fixtures";
import { buildCredential } from "@/lib/certificates/open-badges";
import { loadSigningKey, signCredentialJwt } from "@/lib/certificates/signing";

const now = new Date("2026-10-28T12:00:00Z");

describe("identityMatchesEmail", () => {
  it("matches hashed and plain identities", () => {
    expect(identityMatchesEmail("Mariama@Example.test", false, null, EMAIL)).toBe(true);
    expect(identityMatchesEmail("sha256$" + "0".repeat(64), true, "x", EMAIL)).toBe(false);
    expect(identityMatchesEmail("anything", false, null, null)).toBe(false);
  });
});

describe("Open Badges 2.0 hosted assertions", () => {
  it("verifies a hosted assertion fetched from the issuer", async () => {
    const { assertionId, docs } = ob2Site();
    const result = await importOpenBadge(assertionId, { fetchDoc: site(docs), email: EMAIL, now });
    expect(result).toMatchObject({
      ok: true,
      obVersion: "2.0",
      verified: true,
      method: "ob2_hosted",
      fields: { title: "SQL Basics", issuer_name: "Tamale Tech Hub", issued_on: "2026-04-02", verification_url: assertionId },
    });
  });

  it("fetches the issuer's copy of a baked assertion and compares it", async () => {
    const { assertion, assertionId, docs } = ob2Site();
    const fetchDoc = site(docs);
    const result = await importOpenBadge(JSON.stringify(assertion), { fetchDoc, email: EMAIL, now });
    expect(result.ok && result.verified).toBe(true);
    expect(fetchDoc.calls).toContain(assertionId);
  });

  it("does not verify a baked assertion the issuer's copy contradicts", async () => {
    const { assertion, docs } = ob2Site();
    const tampered = { ...assertion, recipient: { type: "email", hashed: false, identity: EMAIL } };
    const result = await importOpenBadge(JSON.stringify(tampered), { fetchDoc: site(docs), email: EMAIL, now });
    expect(result).toMatchObject({ ok: true, verified: false });
  });

  it("does not verify someone else's badge", async () => {
    const { assertionId, docs } = ob2Site({ recipientEmail: "fuseini@example.test" });
    const result = await importOpenBadge(assertionId, { fetchDoc: site(docs), email: EMAIL, now });
    expect(result).toMatchObject({ ok: true, verified: false, method: null });
    expect(result.ok && result.note).toContain("different email");
  });

  it("does not verify an assertion hosted away from the issuer", async () => {
    const { assertionId, docs } = ob2Site({ assertionHost: "elsewhere.example" });
    const result = await importOpenBadge(assertionId, { fetchDoc: site(docs), email: EMAIL, now });
    expect(result).toMatchObject({ ok: true, verified: false });
  });

  it("refuses a revoked badge", async () => {
    const { assertionId, docs } = ob2Site({ revoked: true });
    expect(await importOpenBadge(assertionId, { fetchDoc: site(docs), email: EMAIL, now })).toMatchObject({ ok: false });
    const gone = ob2Site();
    expect(await importOpenBadge(gone.assertionId, { fetchDoc: site(gone.docs, { [gone.assertionId]: 410 }), email: EMAIL, now })).toMatchObject({
      ok: false,
    });
  });

  it("keeps a badge whose issuer cannot be reached as added by the learner", async () => {
    const { assertion, assertionId, docs } = ob2Site();
    const fetchDoc = site(docs);
    const offline = (async (url: string) => {
      if (url === assertionId) throw new Error("timeout");
      return fetchDoc(url);
    }) as typeof fetchDoc;
    const result = await importOpenBadge(JSON.stringify(assertion), { fetchDoc: offline, email: EMAIL, now });
    expect(result).toMatchObject({ ok: true, verified: false });
  });
});

describe("Open Badges 3.0 VC JWTs", () => {
  it("verifies a signature with the key the issuer publishes", async () => {
    const { privateKey, jwk } = issuerKeys();
    const jwt = signJwt(ob3Credential(), privateKey);
    const result = await importOpenBadge(jwt, { fetchDoc: site({ [ISSUER]: issuerProfile(jwk) }), email: EMAIL, now });
    expect(result).toMatchObject({
      ok: true,
      obVersion: "3.0",
      verified: true,
      method: "ob3_jwt",
      fields: { title: "Web Foundations", issuer_name: "Tamale Tech Hub", issued_on: "2026-03-01" },
    });
  });

  it("verifies a JWT whose payload wraps the credential in vc", async () => {
    const { privateKey, jwk } = issuerKeys();
    const jwt = signJwt({ iss: ISSUER, vc: ob3Credential() }, privateKey);
    const result = await importOpenBadge(jwt, { fetchDoc: site({ [ISSUER]: issuerProfile(jwk) }), email: EMAIL, now });
    expect(result.ok && result.verified).toBe(true);
  });

  it("rejects a signature made with another key", async () => {
    const { privateKey } = issuerKeys();
    const other = issuerKeys();
    const jwt = signJwt(ob3Credential(), privateKey);
    const result = await importOpenBadge(jwt, { fetchDoc: site({ [ISSUER]: issuerProfile(other.jwk) }), email: EMAIL, now });
    expect(result).toMatchObject({ ok: true, verified: false });
  });

  it("rejects a credential edited after signing", async () => {
    const { privateKey, jwk } = issuerKeys();
    const [h, , s] = signJwt(ob3Credential(), privateKey).split(".");
    const forged = Buffer.from(JSON.stringify(ob3Credential({ name: "Forged" }))).toString("base64url");
    const result = await importOpenBadge(`${h}.${forged}.${s}`, { fetchDoc: site({ [ISSUER]: issuerProfile(jwk) }), email: EMAIL, now });
    expect(result).toMatchObject({ ok: true, verified: false });
  });

  it("does not trust a key that only the badge itself carries", async () => {
    const { privateKey, jwk } = issuerKeys();
    const jwt = signJwt(ob3Credential(), privateKey, "https://attacker.example/keys#1");
    const profile = { ...issuerProfile(issuerKeys().jwk) };
    const result = await importOpenBadge(jwt, {
      fetchDoc: site({ [ISSUER]: profile, "https://attacker.example/keys": { publicKeyJwk: jwk } }),
      email: EMAIL,
      now,
    });
    expect(result).toMatchObject({ ok: true, verified: false });
  });

  it("does not verify a credential for another email or with an unreadable status list", async () => {
    const { privateKey, jwk } = issuerKeys();
    const fetchDoc = site({ [ISSUER]: issuerProfile(jwk) });
    const other = await importOpenBadge(signJwt(ob3Credential(), privateKey), { fetchDoc, email: "hawa@example.test", now });
    expect(other).toMatchObject({ ok: true, verified: false });
    const withStatus = signJwt(ob3Credential({ credentialStatus: { id: "https://x.example/status", type: "1EdTechRevocationList" } }), privateKey);
    expect(await importOpenBadge(withStatus, { fetchDoc, email: EMAIL, now })).toMatchObject({ ok: true, verified: false });
  });

  it("keeps a Data Integrity proof as added by the learner", async () => {
    const credential = ob3Credential({ proof: { type: "DataIntegrityProof", cryptosuite: "eddsa-rdfc-2022" } });
    const result = await importOpenBadge(JSON.stringify(credential), {
      fetchDoc: site({ [credential.id]: credential }),
      email: EMAIL,
      now,
    });
    expect(result).toMatchObject({ ok: true, verified: false, method: null });
  });

  it("round trips a SydCrest signed credential (the shape signing.ts makes)", async () => {
    const { privateKey } = generateKeyPairSync("ed25519");
    const pem = privateKey.export({ format: "pem", type: "pkcs8" }).toString();
    const origin = "https://sydcrest.example";
    const key = loadSigningKey(`${origin}/badges/issuer.json`, { OPEN_BADGES_SIGNING_KEY: pem })!;
    const credential = buildCredential(
      origin,
      { verification_id: "a".repeat(32), recipient_name: "Mariama Seidu", program_title: "Delta Mentoring", specialization_label: null, issued_at: "2026-09-01T00:00:00Z" },
      { slug: "dmp", title: "Delta Mentoring", summary: null, certification_summary: null },
    );
    const jwt = signCredentialJwt(credential, key);
    const fetchDoc = site({
      [`${origin}/badges/issuer.json`]: {
        id: `${origin}/badges/issuer.json`,
        name: "SydCrest Launchpad",
        verificationMethod: [{ id: key.kid, type: "JsonWebKey", publicKeyJwk: key.publicJwk }],
      },
    });
    const result = await importOpenBadge(jwt, { fetchDoc, email: EMAIL, now });
    // The signature checks out, but a name is not an email we can match: not verified as theirs.
    expect(result).toMatchObject({ ok: true, verified: false, fields: { title: "Delta Mentoring", issuer_name: "SydCrest Launchpad" } });
    expect(result.ok && result.note).toContain("different email");
  });
});

describe("inputs that are not badges", () => {
  it("explains instead of guessing", async () => {
    const fetchDoc = site({ "https://example.com/page": "<html></html>" });
    expect(await importOpenBadge("https://example.com/page", { fetchDoc, email: EMAIL, now })).toMatchObject({ ok: false });
    expect(await importOpenBadge("http://example.com/a", { fetchDoc, email: EMAIL, now })).toMatchObject({ ok: false });
    expect(await importOpenBadge('{"hello":1}', { fetchDoc, email: EMAIL, now })).toMatchObject({ ok: false });
  });
});
