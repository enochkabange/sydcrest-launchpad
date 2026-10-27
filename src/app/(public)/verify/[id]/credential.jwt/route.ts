import { badgeUrls } from "@/lib/certificates/open-badges";
import { credentialFor, verifyCertificate } from "@/lib/certificates/server";
import { loadSigningKey, signCredentialJwt } from "@/lib/certificates/signing";
import { SITE_URL } from "@/lib/site";

/**
 * The same credential signed as a VC JWT, only when OPEN_BADGES_SIGNING_KEY
 * is configured. Unsigned deployments answer 404 and point at the JSON.
 */
export async function GET(_request: Request, { params }: RouteContext<"/verify/[id]/credential.jwt">) {
  const { id } = await params;
  const urls = badgeUrls(SITE_URL);
  const key = loadSigningKey(urls.issuer);
  const text = (body: string, status: number) =>
    new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
  if (!key) return text("Signed credentials are not enabled here. Use credential.json or the verification page.", 404);
  const cert = await verifyCertificate(id);
  if (!cert) return text("No certificate with this id", 404);
  if (cert.revoked_at) return text("This certificate was revoked", 410);
  return new Response(signCredentialJwt(await credentialFor(cert), key), {
    headers: { "Content-Type": "application/vc+jwt", "Cache-Control": "public, max-age=60, s-maxage=300" },
  });
}
