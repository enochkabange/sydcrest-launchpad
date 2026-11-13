import { describe, expect, it } from "vitest";
import { APPLICATION_STAGES, EMPLOYER_STAGES, canWithdraw, parseApplyForm, sharesContact, stageCopy } from "./applications";

function form(values: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}

describe("parseApplyForm (#306)", () => {
  it("accepts a note, an optional portfolio and the contact agreement", () => {
    const { data, errors } = parseApplyForm(
      form({ note: " I sold provisions online for two years. ", portfolio_url: "https://example.test/work", contact_consent: "on" }),
    );
    expect(errors).toEqual({});
    expect(data).toEqual({
      note: "I sold provisions online for two years.",
      portfolio_url: "https://example.test/work",
      contact_consent: true,
      share_readiness: false,
    });
  });

  it("shares the readiness band only when that box is ticked (#336)", () => {
    const base = { note: "I sold provisions online for two years.", contact_consent: "on" };
    expect(parseApplyForm(form(base)).data.share_readiness).toBe(false);
    expect(parseApplyForm(form({ ...base, share_readiness: "on" })).data.share_readiness).toBe(true);
    expect(parseApplyForm(form({ ...base, share_readiness: "on" })).errors).toEqual({});
  });

  it("needs a real note, a real link and the agreement", () => {
    const { errors } = parseApplyForm(form({ note: "Hire me", portfolio_url: "javascript:alert(1)" }));
    expect(errors.note).toBe("Write at least 20 characters about why you fit.");
    expect(errors.portfolio_url).toBe("Enter a full link starting with https://");
    expect(errors.contact_consent).toMatch(/^Tick the box to apply/);
  });
});

describe("stages", () => {
  it("match the database list, and employers cannot withdraw for the learner", () => {
    expect(APPLICATION_STAGES.map((s) => s.value)).toEqual(["new", "shortlisted", "interview", "offer", "hired", "not_selected", "withdrawn"]);
    expect(EMPLOYER_STAGES.map((s) => s.value as string)).not.toContain("withdrawn");
  });

  it("share contact details from shortlisted on", () => {
    expect(sharesContact("new")).toBe(false);
    expect(sharesContact("shortlisted")).toBe(true);
    expect(sharesContact("hired")).toBe(true);
    expect(sharesContact("not_selected")).toBe(false);
  });

  it("can be withdrawn until hired", () => {
    expect(canWithdraw("interview")).toBe(true);
    expect(canWithdraw("hired")).toBe(false);
    expect(canWithdraw("withdrawn")).toBe(false);
  });

  it("have plain copy without dashes, and an unknown stage reads as new", () => {
    for (const s of APPLICATION_STAGES) expect(`${s.label} ${s.learner}`).not.toMatch(/[–—]| - /);
    expect(stageCopy("mystery").value).toBe("new");
  });
});
