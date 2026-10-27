import { generateKeyPairSync, verify } from "node:crypto";
import { describe, expect, it } from "vitest";
import { SIGNING_KEY_ENV, loadSigningKey, signCredentialJwt, verificationMethods } from "./signing";

const ISSUER = "https://launchpad.example/badges/issuer.json";

function pem() {
  const { privateKey } = generateKeyPairSync("ed25519");
  return privateKey.export({ format: "pem", type: "pkcs8" }).toString();
}

describe("signing", () => {
  it("is off without a key, so credentials stay unsigned", () => {
    expect(loadSigningKey(ISSUER, {})).toBeNull();
    expect(loadSigningKey(ISSUER, { [SIGNING_KEY_ENV]: "  " })).toBeNull();
    expect(verificationMethods(ISSUER, null)).toEqual([]);
  });

  it("ignores a key that is not Ed25519 or not a key at all", () => {
    const { privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
    expect(loadSigningKey(ISSUER, { [SIGNING_KEY_ENV]: privateKey.export({ format: "pem", type: "pkcs8" }).toString() })).toBeNull();
    expect(loadSigningKey(ISSUER, { [SIGNING_KEY_ENV]: "not a key" })).toBeNull();
  });

  it("reads a PEM with escaped newlines and signs a verifiable VC JWT", () => {
    const key = loadSigningKey(ISSUER, { [SIGNING_KEY_ENV]: pem().replace(/\n/g, "\\n") });
    expect(key).not.toBeNull();
    const credential = { type: ["VerifiableCredential", "OpenBadgeCredential"], name: "Test" };
    const jwt = signCredentialJwt(credential, key!);
    const [h, p, s] = jwt.split(".");
    expect(JSON.parse(Buffer.from(h, "base64url").toString())).toEqual({ alg: "EdDSA", typ: "vc+jwt", cty: "vc", kid: `${ISSUER}#key-1` });
    expect(JSON.parse(Buffer.from(p, "base64url").toString())).toEqual(credential);
    const [method] = verificationMethods(ISSUER, key);
    const ok = verify(null, Buffer.from(`${h}.${p}`), { key: method.publicKeyJwk, format: "jwk" }, Buffer.from(s, "base64url"));
    expect(ok).toBe(true);
  });
});
