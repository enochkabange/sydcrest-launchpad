import { ImageResponse } from "next/og";
import { Mark } from "@/components/marketing/og-card";

/**
 * Generated images for certificates (next/og). Satori cannot read CSS custom
 * properties, so these are the brand tokens from src/styles/tokens.css by
 * value: keep them in step with --color-blue-*, --color-orange and
 * --color-yellow there.
 */
export const BRAND = {
  blue500: "#1C75BB",
  blue800: "#124E7E",
  blue900: "#0F406A",
  blue100: "#E1EDF6",
  ink: "#211D1D",
  orange: "#F79020",
  yellow: "#F1EF1E",
  white: "#FFFFFF",
} as const;

function fit(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/**
 * The programme badge, a 600px square medal: no personal data, so one image
 * per programme serves every credential (the Achievement image).
 */
export function badgeImage(programTitle: string) {
  const title = fit(programTitle, 48);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
        <div
          style={{
            width: 560,
            height: 560,
            borderRadius: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.yellow})`,
          }}
        >
          <div
            style={{
              width: 520,
              height: 520,
              borderRadius: 260,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              padding: 56,
              color: BRAND.white,
              textAlign: "center",
              background: `linear-gradient(160deg, ${BRAND.blue500} 0%, ${BRAND.blue800} 65%, ${BRAND.ink} 100%)`,
            }}
          >
            <Mark width={120} />
            <div style={{ fontSize: 22, letterSpacing: 6, color: BRAND.blue100, display: "flex" }}>CERTIFIED</div>
            <div style={{ fontSize: title.length > 28 ? 34 : 42, fontWeight: 700, lineHeight: 1.1, display: "flex", justifyContent: "center" }}>
              {title}
            </div>
            <div style={{ display: "flex", height: 8, width: 120, borderRadius: 4, background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.yellow})` }} />
            <div style={{ fontSize: 22, color: BRAND.blue100, display: "flex" }}>SydCrest Launchpad</div>
          </div>
        </div>
      </div>
    ),
    { width: 600, height: 600 },
  );
}

/** The share card for a valid certificate's verification page. */
export function certificateOgImage({
  recipientName,
  title,
  issued,
}: {
  recipientName: string;
  title: string;
  issued: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: BRAND.white,
          background: `linear-gradient(135deg, ${BRAND.blue500} 0%, ${BRAND.blue800} 70%, ${BRAND.ink} 100%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Mark width={72} />
            <div style={{ display: "flex", flexDirection: "column", fontSize: 30, lineHeight: 1 }}>
              <span style={{ fontWeight: 700 }}>SydCrest</span>
              <span>Launchpad</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              fontSize: 26,
              fontWeight: 700,
              color: BRAND.ink,
              background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.yellow})`,
            }}
          >
            Verified certificate
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 32, color: BRAND.blue100, display: "flex" }}>Awarded to</div>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, display: "flex" }}>{fit(recipientName, 32)}</div>
          <div style={{ fontSize: 40, lineHeight: 1.2, display: "flex" }}>{fit(title, 60)}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: BRAND.blue100 }}>
          <span>Issued {issued}</span>
          <div style={{ display: "flex", height: 10, width: 200, borderRadius: 5, background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.yellow})` }} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
