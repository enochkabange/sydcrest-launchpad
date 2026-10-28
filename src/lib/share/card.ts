/**
 * Share cards (issue #233): what a milestone card says, built only from real
 * data the learner already shows publicly. A topic, section or roadmap card
 * comes from an achievement of a public profile (the same gate as /a/[id]);
 * a certificate card from a live certificate (the same gate as /verify/[id]).
 * Pure, so the words are unit tested; src/lib/share/image.tsx draws them.
 *
 * Visible copy: British English, no dashes, device neutral.
 */

export const CARD_FORMATS = {
  /** WhatsApp Status and other stories: 9:16. */
  story: { width: 1080, height: 1920 },
  /** Chats, feeds and profiles: 1:1. */
  square: { width: 1080, height: 1080 },
} as const;

export type CardFormat = keyof typeof CARD_FORMATS;

export function isCardFormat(value: string): value is CardFormat {
  return Object.hasOwn(CARD_FORMATS, value);
}

export type CardKind = "topic" | "section" | "roadmap" | "certificate" | "streak" | "credential";

export type ShareCard = {
  kind: CardKind;
  /** The chip at the top, such as "Section finished". */
  label: string;
  /** The milestone itself: a topic, section, roadmap or programme title. */
  headline: string;
  /** Where it sits, such as "Data Analyst roadmap". */
  context: string | null;
  /** How it was earned, said plainly. */
  proof: string;
  /** The learner's name as their public profile or certificate shows it; null shows no name. */
  name: string | null;
  /** "28 October 2026", Ghana time. */
  date: string;
};

/** "28 October 2026", in Ghana time. */
export function formatCardDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}

function clean(name: string | null | undefined) {
  const trimmed = name?.trim().replace(/\s+/g, " ");
  return trimmed ? trimmed : null;
}

export type CardAchievement = {
  type: string;
  ref_id: string | null;
  /** Title of the topic, section or roadmap the achievement points at. */
  title: string | null;
  /** Title of the roadmap a topic or section belongs to. */
  roadmapTitle?: string | null;
  created_at: string;
};

/**
 * The card for an achievement, or null for kinds that are not milestones
 * worth a card (choosing a track) or when the title is unknown, so a card
 * never shows a made up headline.
 */
export function achievementCard(a: CardAchievement, ownerName: string | null): ShareCard | null {
  const name = clean(ownerName);
  const date = formatCardDate(a.created_at);
  const context = a.roadmapTitle ? `${a.roadmapTitle} roadmap` : null;
  switch (a.type) {
    case "roadmap_node_completed":
      if (!a.title) return null;
      return { kind: "topic", label: "Topic finished", headline: a.title, context, proof: "Passed the checkpoint quiz", name, date };
    case "section_completed":
      if (!a.title) return null;
      return {
        kind: "section",
        label: "Section finished",
        headline: a.title,
        context,
        proof: "Passed every checkpoint quiz in the section",
        name,
        date,
      };
    case "roadmap_completed":
      if (!a.title) return null;
      return {
        kind: "roadmap",
        label: "Roadmap finished",
        headline: `${a.title} roadmap`,
        context: null,
        proof: "Passed the checkpoint quiz for every required topic",
        name,
        date,
      };
    case "streak": {
      const days = Number(a.ref_id);
      if (!Number.isInteger(days) || days < 2) return null;
      return { kind: "streak", label: "Learning streak", headline: `${days} days in a row`, context: null, proof: "Learning on SydCrest Launchpad", name, date };
    }
    default:
      return null;
  }
}

export type CardCertificate = {
  recipient_name: string;
  program_title: string;
  specialization_label: string | null;
  issued_at: string;
};

/** The card for a live certificate. The name is the one the credential is made out to. */
export function certificateCard(c: CardCertificate): ShareCard {
  return {
    kind: "certificate",
    label: "Certificate earned",
    headline: c.specialization_label ? `${c.program_title}: ${c.specialization_label}` : c.program_title,
    context: null,
    proof: "Verified certificate. Anyone can check it online.",
    name: clean(c.recipient_name),
    date: formatCardDate(c.issued_at),
  };
}

export type CardCredential = {
  title: string;
  issuer_name: string;
  issued_on: string | null;
  created_at: string;
  verification: string;
};

/**
 * The card for a certificate from another issuer (issue #253). Says plainly
 * who issued it and how far it was checked: "Verified by the issuer" only
 * when the server confirmed the Open Badge, otherwise "Added by the
 * learner". Never "verified certificate": SydCrest did not award it.
 */
export function credentialCard(c: CardCredential, ownerName: string | null): ShareCard {
  const verified = c.verification === "issuer";
  return {
    kind: "credential",
    label: verified ? "Verified by the issuer" : "Added by the learner",
    headline: c.title,
    context: `Issued by ${c.issuer_name}`,
    proof: verified ? "Checked against the issuer's own record" : "Not checked by SydCrest. Ask the issuer to confirm it.",
    name: clean(ownerName),
    date: formatCardDate(c.issued_on ? `${c.issued_on}T12:00:00Z` : c.created_at),
  };
}

/** Shortens text for a card, on a word boundary where one is near. */
export function fitText(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  // The cut already falls at the end of a word.
  if (/\s/.test(text[max - 1])) return `${cut.trimEnd()}…`;
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

/** The words that go with a shared card: what the learner did, in the first person. */
export function shareText(card: Pick<ShareCard, "kind" | "headline" | "context">) {
  switch (card.kind) {
    case "topic":
      return `I finished ${card.headline}${card.context ? ` in the ${card.context}` : ""} on SydCrest Launchpad.`;
    case "section":
      return `I finished the ${card.headline} section${card.context ? ` of the ${card.context}` : ""} on SydCrest Launchpad.`;
    case "roadmap":
      return `I finished the ${card.headline} on SydCrest Launchpad.`;
    case "certificate":
      return `I earned my ${card.headline} certificate on SydCrest Launchpad.`;
    case "streak":
      return `${card.headline} of learning on SydCrest Launchpad.`;
    case "credential":
      return `${card.headline}${card.context ? `, ${card.context.charAt(0).toLowerCase()}${card.context.slice(1)}` : ""}. In my wallet on SydCrest Launchpad.`;
  }
}

/** A file name for a downloaded card: letters, numbers and hyphens only. */
export function cardFileName(headline: string, format: CardFormat) {
  const slug = headline
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/, "");
  return `sydcrest-${slug || "milestone"}-${format}.png`;
}

/**
 * How the share button can share on this browser: the image itself (phones
 * and some computers), only the link, or neither (copy and download instead).
 */
export type ShareMode = "files" | "link" | "none";

export function shareMode(nav: { share?: unknown; canShare?: (data?: ShareData) => boolean }, probe: () => File): ShareMode {
  if (typeof nav.share !== "function") return "none";
  if (typeof nav.canShare === "function") {
    try {
      if (nav.canShare({ files: [probe()] })) return "files";
    } catch {
      // Some browsers throw for files instead of answering false.
    }
  }
  return "link";
}

/** What the share button needs for one card. */
export type ShareTarget = { imageBase: string; pageUrl: string; headline: string; text: string };

/** Share target for an achievement of a public profile, or null when it has no card. */
export function achievementShareTarget(id: string, a: CardAchievement, siteUrl: string): ShareTarget | null {
  const card = achievementCard(a, null);
  if (!card) return null;
  return { imageBase: `/og/achievements/${id}`, pageUrl: `${siteUrl}/a/${id}`, headline: card.headline, text: shareText(card) };
}

/** Share target for a public external credential on its owner's wallet page. */
export function credentialShareTarget(id: string, c: CardCredential, slug: string, siteUrl: string): ShareTarget {
  const card = credentialCard(c, null);
  return {
    imageBase: `/og/credentials/${id}`,
    pageUrl: `${siteUrl}/u/${slug}/credentials#c-${id}`,
    headline: card.headline,
    text: shareText(card),
  };
}

/** Share target for a live certificate, by its verification id. */
export function certificateShareTarget(
  c: Omit<CardCertificate, "recipient_name"> & { verification_id: string },
  siteUrl: string,
): ShareTarget {
  const card = certificateCard({ ...c, recipient_name: "" });
  return {
    imageBase: `/og/certificates/${c.verification_id}`,
    pageUrl: `${siteUrl}/verify/${c.verification_id}`,
    headline: card.headline,
    text: shareText(card),
  };
}
