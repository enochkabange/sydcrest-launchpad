import { verifyCertificate } from "@/lib/certificates/server";
import { certificateCard, isCardFormat } from "@/lib/share/card";
import { shareCardImage, withCardCache } from "@/lib/share/image";
import { SITE_URL } from "@/lib/site";

/**
 * Story or square share card for a certificate, by its unguessable
 * verification id. Same gate as /verify/[id]: a revoked or unknown id gets a
 * 404, never a card.
 */
export async function GET(_request: Request, { params }: RouteContext<"/og/certificates/[id]/[format]">) {
  const { id, format } = await params;
  if (!isCardFormat(format)) return new Response("Not found", { status: 404 });
  const cert = await verifyCertificate(id);
  if (!cert || cert.revoked_at) return new Response("Not found", { status: 404 });
  return withCardCache(shareCardImage(certificateCard(cert), format, new URL(SITE_URL).host));
}
