import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/analytics/track", () => ({ trackRefusal: vi.fn(), trackResult: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
const redirect = vi.fn((to: string) => {
  throw new Error(`redirect:${to}`);
});
vi.mock("next/navigation", () => ({ redirect: (to: string) => redirect(to) }));
vi.mock("@/lib/auth", () => ({ requireUser: async () => ({ id: "hawa-id" }) }));

const rpc = vi.fn();
let existing: { profile_id: string; status: string } | null = null;
const from = vi.fn(() => ({
  select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: existing, error: null }) }) }),
}));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({ from, rpc }) }));

const { applyAsExpert } = await import("./actions");

function form() {
  const f = new FormData();
  const values: Record<string, string | string[]> = {
    slug: "hawa-iddrisu",
    headline: "Data analyst helping beginners in Tamale",
    skills: "Excel, SQL",
    categories: ["data"],
    links: "hawa.dev",
    evidence_links: "https://github.com/hawa/sales-dashboard",
    experience: "",
    motivation: "I want more young people in the north to get data jobs.",
  };
  for (const [k, v] of Object.entries(values)) for (const item of Array.isArray(v) ? v : [v]) f.append(k, item);
  return f;
}

describe("applyAsExpert (issue #249)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    existing = null;
  });

  it("creates the profile and the application in one database call", async () => {
    rpc.mockResolvedValue({ data: "app-id", error: null });
    await expect(applyAsExpert({}, form())).rejects.toThrow("redirect:/experts/apply?sent=1");
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith("apply_as_expert", {
      p_slug: "hawa-iddrisu",
      p_headline: "Data analyst helping beginners in Tamale",
      p_skills: ["Excel", "SQL"],
      p_categories: ["data"],
      p_links: ["https://hawa.dev"],
      p_motivation: "I want more young people in the north to get data jobs.",
      p_experience: "",
      p_evidence_links: ["https://github.com/hawa/sales-dashboard"],
    });
    // Never a direct insert into expert_profiles or expert_applications.
    expect(from).not.toHaveBeenCalledWith("expert_applications");
  });

  it("sends an approved expert to their dashboard without applying again", async () => {
    existing = { profile_id: "hawa-id", status: "approved" };
    await expect(applyAsExpert({}, form())).rejects.toThrow("redirect:/expert");
    expect(rpc).not.toHaveBeenCalled();
  });

  it("asks for another link name when the slug is taken", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "23505", message: "duplicate key" } });
    const state = await applyAsExpert({}, form());
    expect(state.errors?.slug).toBe("That link name is taken. Try another.");
    expect(state.values?.slug).toBe("hawa-iddrisu");
  });

  it("explains the adult rule when the database refuses an under 18", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "42501", message: "Adults only" } });
    expect((await applyAsExpert({}, form())).message).toMatch(/adults aged 18 and over/);
  });

  it("points to the open application instead of making a second one", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "55000", message: "An application is already in review" } });
    expect((await applyAsExpert({}, form())).message).toMatch(/already have an application in review/);
  });

  it("says try again for anything else", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "XX000", message: "boom" } });
    expect((await applyAsExpert({}, form())).message).toBe("We couldn't send your application. Try again.");
  });
});
