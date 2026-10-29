import { describe, expect, it } from "vitest";
import {
  achievementCard,
  achievementShareTarget,
  cardFileName,
  certificateCard,
  certificateShareTarget,
  credentialCard,
  credentialShareTarget,
  fitText,
  isCardFormat,
  shareMode,
  shareText,
  CARD_FORMATS,
} from "./card";

const AT = "2026-10-28T10:00:00Z";
const probe = () => ({}) as File;

describe("card formats", () => {
  it("are 9:16 and 1:1 at 1080 wide", () => {
    expect(CARD_FORMATS.story).toEqual({ width: 1080, height: 1920 });
    expect(CARD_FORMATS.square).toEqual({ width: 1080, height: 1080 });
    expect(isCardFormat("story")).toBe(true);
    expect(isCardFormat("square")).toBe(true);
    expect(isCardFormat("landscape")).toBe(false);
    expect(isCardFormat("toString")).toBe(false);
  });
});

describe("achievementCard", () => {
  it("says what was finished, where and how", () => {
    expect(
      achievementCard({ type: "roadmap_node_completed", ref_id: "n", title: "Everyday statistics", roadmapTitle: "Data Analyst", created_at: AT }, "Wumpini Alhassan"),
    ).toEqual({
      kind: "topic",
      label: "Topic finished",
      headline: "Everyday statistics",
      context: "Data Analyst roadmap",
      proof: "Passed the checkpoint quiz",
      name: "Wumpini Alhassan",
      date: "28 October 2026",
    });
    const section = achievementCard({ type: "section_completed", ref_id: "s", title: "Foundations", roadmapTitle: "Data Analyst", created_at: AT }, null);
    expect(section).toMatchObject({ kind: "section", label: "Section finished", headline: "Foundations", name: null });
    const roadmap = achievementCard({ type: "roadmap_completed", ref_id: "r", title: "Data Analyst", created_at: AT }, "  Fuseini   Mahama ");
    expect(roadmap).toMatchObject({ kind: "roadmap", headline: "Data Analyst roadmap", context: null, name: "Fuseini Mahama" });
  });

  it("uses the date in Ghana time", () => {
    const card = achievementCard({ type: "roadmap_node_completed", ref_id: "n", title: "SQL", created_at: "2026-10-28T23:30:00Z" }, null);
    expect(card?.date).toBe("28 October 2026");
  });

  it("never invents a headline", () => {
    expect(achievementCard({ type: "roadmap_node_completed", ref_id: "n", title: null, created_at: AT }, "Mariama")).toBeNull();
    expect(achievementCard({ type: "track_chosen", ref_id: "data", title: null, created_at: AT }, "Mariama")).toBeNull();
    expect(achievementCard({ type: "streak", ref_id: "abc", title: null, created_at: AT }, "Mariama")).toBeNull();
  });

  it("draws a streak card from a streak achievement", () => {
    expect(achievementCard({ type: "streak", ref_id: "7", title: null, created_at: AT }, "Hawa")).toMatchObject({
      kind: "streak",
      headline: "7 days in a row",
    });
  });

  it("has no dashes in any visible copy", () => {
    const cards = [
      achievementCard({ type: "roadmap_node_completed", ref_id: "n", title: "T", roadmapTitle: "R", created_at: AT }, "A"),
      achievementCard({ type: "section_completed", ref_id: "n", title: "T", roadmapTitle: "R", created_at: AT }, "A"),
      achievementCard({ type: "roadmap_completed", ref_id: "n", title: "T", created_at: AT }, "A"),
      achievementCard({ type: "streak", ref_id: "3", title: null, created_at: AT }, "A"),
      certificateCard({ recipient_name: "A", program_title: "P", specialization_label: null, issued_at: AT }),
    ];
    for (const card of cards) {
      for (const text of [card!.label, card!.proof, shareText(card!)]) expect(text).not.toMatch(/[-–—]/);
    }
  });
});

describe("certificateCard", () => {
  it("uses the name on the certificate and the specialisation", () => {
    expect(
      certificateCard({ recipient_name: "Abdul-Rahman Iddrisu", program_title: "Delta Mentoring Program", specialization_label: "Data", issued_at: AT }),
    ).toMatchObject({ kind: "certificate", label: "Certificate earned", headline: "Delta Mentoring Program: Data", name: "Abdul-Rahman Iddrisu" });
  });
});

describe("shareText", () => {
  it("speaks in the first person", () => {
    expect(shareText({ kind: "section", headline: "Foundations", context: "Data Analyst roadmap" })).toBe(
      "I finished the Foundations section of the Data Analyst roadmap on SydCrest Launchpad.",
    );
    expect(shareText({ kind: "certificate", headline: "Delta Mentoring Program", context: null })).toBe(
      "I earned my Delta Mentoring Program certificate on SydCrest Launchpad.",
    );
  });
});

describe("share targets", () => {
  it("point at the existing public pages and the card routes", () => {
    expect(
      achievementShareTarget("abc", { type: "roadmap_completed", ref_id: "r", title: "Data Analyst", created_at: AT }, "https://sydcrest.example"),
    ).toEqual({
      imageBase: "/og/achievements/abc",
      pageUrl: "https://sydcrest.example/a/abc",
      headline: "Data Analyst roadmap",
      text: "I finished the Data Analyst roadmap on SydCrest Launchpad.",
    });
    expect(achievementShareTarget("abc", { type: "track_chosen", ref_id: "x", title: null, created_at: AT }, "https://x")).toBeNull();
    expect(
      certificateShareTarget(
        { verification_id: "f".repeat(32), program_title: "Delta Mentoring Program", specialization_label: null, issued_at: AT },
        "https://sydcrest.example",
      ),
    ).toMatchObject({ imageBase: `/og/certificates/${"f".repeat(32)}`, pageUrl: `https://sydcrest.example/verify/${"f".repeat(32)}` });
  });
});

describe("fitText and cardFileName", () => {
  it("cuts long text on a word", () => {
    expect(fitText("Short", 10)).toBe("Short");
    expect(fitText("Accurate data entry and tidy tables", 20)).toBe("Accurate data entry…");
  });
  it("makes a safe file name", () => {
    expect(cardFileName("Delta Mentoring Program: Data", "story")).toBe("sydcrest-delta-mentoring-program-data-story.png");
    expect(cardFileName("???", "square")).toBe("sydcrest-milestone-square.png");
  });
});

describe("shareMode", () => {
  it("shares the image where files can be shared", () => {
    expect(shareMode({ share: () => {}, canShare: () => true }, probe)).toBe("files");
  });
  it("shares the link where only links can be shared", () => {
    expect(shareMode({ share: () => {}, canShare: () => false }, probe)).toBe("link");
    expect(shareMode({ share: () => {} }, probe)).toBe("link");
    expect(
      shareMode(
        {
          share: () => {},
          canShare: () => {
            throw new TypeError("files not supported");
          },
        },
        probe,
      ),
    ).toBe("link");
  });
  it("falls back to copy and download without a share sheet", () => {
    expect(shareMode({}, probe)).toBe("none");
  });
});

describe("credentialCard (issue #253)", () => {
  const base = { title: "CCNA", issuer_name: "Cisco", issued_on: "2026-05-14", created_at: "2026-10-01T09:00:00Z" };

  it("labels a learner's own entry honestly and never as a SydCrest certificate", () => {
    const card = credentialCard({ ...base, verification: "learner" }, "Hawa Abubakari");
    expect(card).toMatchObject({ kind: "credential", label: "Added by the learner", headline: "CCNA", context: "Issued by Cisco", name: "Hawa Abubakari" });
    expect(card.proof).toContain("Not checked by SydCrest");
    expect(JSON.stringify(card)).not.toMatch(/Verified certificate|[–—]/);
  });

  it("says verified by the issuer only for an issuer checked badge", () => {
    expect(credentialCard({ ...base, verification: "issuer" }, null).label).toBe("Verified by the issuer");
    expect(credentialCard({ ...base, verification: "anything else" }, null).label).toBe("Added by the learner");
  });

  it("uses the issue date, and shares the wallet page", () => {
    expect(credentialCard({ ...base, verification: "learner" }, null).date).toBe("14 May 2026");
    const target = credentialShareTarget("c1", { ...base, verification: "learner" }, "hawa", "https://sydcrest.example");
    expect(target).toMatchObject({ imageBase: "/og/credentials/c1", pageUrl: "https://sydcrest.example/u/hawa/credentials#c-c1" });
    expect(target.text).toBe("CCNA, issued by Cisco. In my wallet on SydCrest Launchpad.");
  });
});
