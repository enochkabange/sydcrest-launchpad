import "server-only";
import { ImageResponse } from "next/og";
import { Mark } from "@/components/marketing/og-card";
import { initialsOf } from "@/components/social/profile-bits";
import { BRAND } from "./brand";
import { CARD_FORMATS, fitText, type CardFormat, type ShareCard } from "./card";

/**
 * Draws a share card (next/og) at story (1080x1920, WhatsApp Status) or
 * square (1080x1080) size. Text is large enough to read on a small screen
 * when the image is shown full width. No photos: a letter avatar from the
 * name, and no avatar at all when there is no name to show.
 */

const SCALE = {
  story: { pad: 96, mark: 132, brand: 52, chip: 44, headline: 112, headlineLong: 88, context: 52, proof: 42, avatar: 132, name: 56, date: 42, footer: 40 },
  square: { pad: 72, mark: 96, brand: 40, chip: 34, headline: 84, headlineLong: 64, context: 40, proof: 32, avatar: 96, name: 44, date: 32, footer: 30 },
} as const;

export function shareCardImage(card: ShareCard, format: CardFormat, host: string) {
  const s = SCALE[format];
  const { width, height } = CARD_FORMATS[format];
  const headline = fitText(card.headline, format === "story" ? 80 : 64);
  const long = headline.length > 32;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: s.pad,
          color: BRAND.white,
          background: `linear-gradient(160deg, ${BRAND.blue500} 0%, ${BRAND.blue800} 60%, ${BRAND.ink} 100%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: s.pad / 3 }}>
          <Mark width={s.mark} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: s.brand, lineHeight: 1.05 }}>
            <span style={{ fontWeight: 700 }}>SydCrest</span>
            <span>Launchpad</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: s.pad / 3 }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                padding: `${s.chip / 3}px ${s.chip / 1.4}px`,
                borderRadius: 999,
                fontSize: s.chip,
                fontWeight: 700,
                color: BRAND.ink,
                background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.yellow})`,
              }}
            >
              {card.label}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: long ? s.headlineLong : s.headline, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {headline}
          </div>
          {card.context && (
            <div style={{ display: "flex", fontSize: s.context, color: BRAND.blue100, lineHeight: 1.2 }}>{fitText(card.context, 60)}</div>
          )}
          <div style={{ display: "flex", fontSize: s.proof, color: BRAND.blue100, lineHeight: 1.25 }}>{card.proof}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: s.pad / 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: s.pad / 3 }}>
            {card.name && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: s.avatar,
                  height: s.avatar,
                  borderRadius: s.avatar,
                  fontSize: s.avatar * 0.4,
                  fontWeight: 700,
                  color: BRAND.blue900,
                  background: BRAND.blue100,
                }}
              >
                {initialsOf(card.name)}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {card.name && <span style={{ fontSize: s.name, fontWeight: 700 }}>{fitText(card.name, 32)}</span>}
              <span style={{ fontSize: s.date, color: BRAND.blue100 }}>{card.date}</span>
            </div>
          </div>
          <div style={{ display: "flex", height: s.footer / 3, width: s.pad * 3, borderRadius: s.footer, background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.yellow})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: s.footer, color: BRAND.blue100 }}>
            <span>Free tech roadmaps for Ghana</span>
            <span style={{ fontWeight: 700, color: BRAND.white }}>{host}</span>
          </div>
        </div>
      </div>
    ),
    { width, height },
  );
}

/**
 * Cards change only when the learner's profile does (a name shown or hidden)
 * or a certificate is revoked, so keep them briefly: a revoked certificate or
 * a profile made private stops showing within minutes.
 */
export function withCardCache(response: Response) {
  response.headers.set("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=300");
  return response;
}
