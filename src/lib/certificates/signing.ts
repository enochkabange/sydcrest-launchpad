import { createPrivateKey, createPublicKey, sign, type KeyObject } from "node:crypto";

/**
 * Optional signing of Open Badges credentials as a VC JWT (VC JOSE COSE,
 * EdDSA over Ed25519).
 *
 * The key comes ONLY from the environment: OPEN_BADGES_SIGNING_KEY holds an
 * Ed25519 private key as PKCS8 PEM (newlines may be written as "\n"). No key
 * is ever committed. Generate one with:
 *
 *   openssl genpkey -algorithm ed25519
 *
 * Without the key everything still works unsigned: the credential JSON is
 * served as is, the issuer profile lists no key, the .jwt URL answers 404,
 * and the hosted /verify/[id] page is how anyone checks a certificate.
 */

export const SIGNING_KEY_ENV = "OPEN_BADGES_SIGNING_KEY";

export type SigningKey = { privateKey: KeyObject; publicJwk: { kty: "OKP"; crv: "Ed25519"; x: string }; kid: string };

function b64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

/** The configured key, or null (unsigned mode) when unset or not an Ed25519 key. */
export function loadSigningKey(issuerId: string, env: Record<string, string | undefined> = process.env): SigningKey | null {
  const raw = env[SIGNING_KEY_ENV]?.trim();
  if (!raw) return null;
  try {
    const privateKey = createPrivateKey(raw.replace(/\\n/g, "\n"));
    if (privateKey.asymmetricKeyType !== "ed25519") return null;
    const jwk = createPublicKey(privateKey).export({ format: "jwk" });
    if (typeof jwk.x !== "string") return null;
    return { privateKey, publicJwk: { kty: "OKP", crv: "Ed25519", x: jwk.x }, kid: `${issuerId}#key-1` };
  } catch {
    return null;
  }
}

/** The issuer profile's verification methods: the public key when signing is on, else none. */
export function verificationMethods(issuerId: string, key: SigningKey | null) {
  if (!key) return [];
  return [{ id: key.kid, type: "JsonWebKey", controller: issuerId, publicKeyJwk: key.publicJwk }];
}

/** A compact JWS whose payload is the credential itself (typ vc+jwt). */
export function signCredentialJwt(credential: object, key: SigningKey) {
  const header = b64url(JSON.stringify({ alg: "EdDSA", typ: "vc+jwt", cty: "vc", kid: key.kid }));
  const payload = b64url(JSON.stringify(credential));
  const signature = sign(null, Buffer.from(`${header}.${payload}`), key.privateKey);
  return `${header}.${payload}.${b64url(signature)}`;
}
