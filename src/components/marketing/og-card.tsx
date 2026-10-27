import { ImageResponse } from "next/og";

/**
 * Branded share card for marketing pages, rendered by each page's
 * opengraph-image route. Satori cannot run hooks, so the mark is inlined here
 * in its onDark treatment rather than reusing <LogoMark>.
 */

function Mark({ width }: { width: number }) {
  return (
    <svg viewBox="0 0 1186 1069" width={width} height={(width * 1069) / 1186}>
      <defs>
        <linearGradient id="warm" gradientUnits="userSpaceOnUse" x1="655" y1="654.5" x2="1120.5" y2="188.5">
          <stop offset="0" stopColor="#F1EF1E" />
          <stop offset="1" stopColor="#F79020" />
        </linearGradient>
        <linearGradient id="warmRev" gradientUnits="userSpaceOnUse" x1="61.5" y1="833" x2="557.5" y2="400">
          <stop offset="0" stopColor="#F79020" />
          <stop offset="1" stopColor="#F1EF1E" />
        </linearGradient>
      </defs>
      <path fill="#FFFFFF" d="M162 239 775 0 843 174 229 413Z" />
      <path fill="url(#warm)" d="M589 589 1055 122 1186 255 721 720Z" />
      <path fill="url(#warmRev)" d="M0 763 496 330 619 470 123 903Z" />
      <path fill="#FFFFFF" d="M385 900 980 620 1061 788 465 1069Z" />
    </svg>
  );
}

export function ogImage(headline: string, subline: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#FFFFFF",
          background: "linear-gradient(135deg, #1C75BB 0%, #124E7E 70%, #211D1D 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Mark width={96} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 40, lineHeight: 1 }}>
            <span style={{ fontWeight: 700 }}>SydCrest</span>
            <span>Launchpad</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {headline}
          </div>
          <div style={{ fontSize: 34, color: "#E1EDF6" }}>{subline}</div>
        </div>
        <div style={{ display: "flex", height: 12, width: 240, borderRadius: 6, background: "linear-gradient(90deg, #F79020, #F1EF1E)" }} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

/** Headline and subline per public page. Visible copy: no dashes. */
export const OG_CARDS = {
  home: { headline: "Find your path into tech.", subline: "Learn. Get mentored. Earn. Built in Northern Ghana." },
  about: { headline: "Why SydCrest exists", subline: "From “where do I start” to employable and earning." },
  programme: { headline: "The Delta Mentoring Program", subline: "12 weeks. 25 free seats. Starting January 2027." },
  business: { headline: "Hire verified Ghanaian talent", subline: "Create a business account and get verified." },
  partners: { headline: "Partner with SydCrest", subline: "Help turn northern talent into earning talent." },
  start: { headline: "Where do I start?", subline: "Five quick questions. A starting point and a weekly plan." },
  privacy: { headline: "Privacy Policy", subline: "What we collect, why, and the rights you have." },
  terms: { headline: "Terms", subline: "The agreement for using SydCrest Launchpad." },
} as const;

export type OgCard = keyof typeof OG_CARDS;

export function isOgCard(value: string): value is OgCard {
  return Object.hasOwn(OG_CARDS, value);
}
