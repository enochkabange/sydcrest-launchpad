import { inflateSync } from "node:zlib";

/**
 * Reads the Open Badge baked into an image file. Pure (a Buffer in, text out),
 * unit tested in baked.test.ts.
 *
 * - PNG: an iTXt chunk with keyword "openbadges" (Open Badges 2.0: a hosted
 *   assertion URL or the assertion JSON) or "openbadgecredential" (Open
 *   Badges 3.0: the credential JSON or a compact VC JWT).
 * - SVG: an <openbadges:assertion verify="URL"> element (2.0, possibly with
 *   the JSON inside) or an <openbadges:credential> element (3.0) holding the
 *   credential JSON or JWT, often in CDATA.
 */

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const KEYWORDS = new Set(["openbadges", "openbadgecredential"]);
/** Never inflate a chunk past this: a baked badge is a few kilobytes. */
const MAX_TEXT = 256 * 1024;

export function isPng(buf: Buffer) {
  return buf.length > 8 && buf.subarray(0, 8).equals(PNG_SIGNATURE);
}

export function extractFromPng(buf: Buffer): string | null {
  if (!isPng(buf)) return null;
  let at = 8;
  while (at + 12 <= buf.length) {
    const length = buf.readUInt32BE(at);
    const type = buf.toString("latin1", at + 4, at + 8);
    const start = at + 8;
    const end = start + length;
    if (end + 4 > buf.length) return null;
    if (type === "iTXt" || type === "tEXt") {
      const data = buf.subarray(start, end);
      const nul = data.indexOf(0);
      if (nul > 0) {
        const keyword = data.toString("latin1", 0, nul);
        if (KEYWORDS.has(keyword)) {
          if (type === "tEXt") return data.toString("latin1", nul + 1).trim() || null;
          // iTXt: keyword\0 compressionFlag compressionMethod language\0 translatedKeyword\0 text
          const flag = data[nul + 1];
          let p = nul + 3;
          const langEnd = data.indexOf(0, p);
          if (langEnd < 0) return null;
          p = langEnd + 1;
          const transEnd = data.indexOf(0, p);
          if (transEnd < 0) return null;
          const raw = data.subarray(transEnd + 1);
          const text = flag === 1 ? inflateSync(raw, { maxOutputLength: MAX_TEXT }) : raw;
          return text.toString("utf8").trim() || null;
        }
      }
    }
    if (type === "IEND") break;
    at = end + 4;
  }
  return null;
}

function decodeEntities(text: string) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function innerText(body: string) {
  const cdata = body.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (cdata ? cdata[1] : decodeEntities(body)).trim();
}

export function extractFromSvg(svg: string): string | null {
  if (svg.length > 5 * 1024 * 1024 || !/<svg[\s>]/i.test(svg)) return null;
  const credential = svg.match(/<openbadges:credential\b[^>]*>([\s\S]*?)<\/openbadges:credential>/i);
  if (credential) return innerText(credential[1]) || null;
  const assertion = svg.match(/<openbadges:assertion\b([^>]*?)(\/>|>([\s\S]*?)<\/openbadges:assertion>)/i);
  if (!assertion) return null;
  const inner = assertion[3] ? innerText(assertion[3]) : "";
  if (inner) return inner;
  const verify = assertion[1].match(/\bverify\s*=\s*"([^"]*)"|\bverify\s*=\s*'([^']*)'/i);
  return verify ? decodeEntities(verify[1] ?? verify[2] ?? "").trim() || null : null;
}

/** The baked badge from a PNG or SVG file, or null when there is none. */
export function extractBakedBadge(buf: Buffer): string | null {
  if (isPng(buf)) return extractFromPng(buf);
  const head = buf.subarray(0, 1024).toString("utf8");
  if (/<svg[\s>]|<\?xml/i.test(head)) return extractFromSvg(buf.toString("utf8"));
  return null;
}
