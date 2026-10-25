import { describe, expect, it } from "vitest";
import { parseProfile, parseSignIn, parseSignUp, safeNextPath } from "./validation";

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

describe("parseSignUp", () => {
  it("accepts a valid sign up and normalises the email", () => {
    const { data, errors } = parseSignUp(
      form({ full_name: "  Fuseini Alhassan ", email: "Fuseini@Example.com", password: "kpakpa123" }),
    );
    expect(errors).toEqual({});
    expect(data).toEqual({ fullName: "Fuseini Alhassan", email: "fuseini@example.com", password: "kpakpa123" });
  });

  it("flags every missing or invalid field", () => {
    const { errors } = parseSignUp(form({ full_name: "", email: "not-an-email", password: "short" }));
    expect(Object.keys(errors).sort()).toEqual(["email", "full_name", "password"]);
  });

  it("rejects names over 80 characters", () => {
    const { errors } = parseSignUp(form({ full_name: "A".repeat(81), email: "a@b.co", password: "longenough" }));
    expect(errors.full_name).toBeDefined();
  });
});

describe("parseSignIn", () => {
  it("requires a password but does not length-check it", () => {
    expect(parseSignIn(form({ email: "a@b.co", password: "" })).errors.password).toBeDefined();
    expect(parseSignIn(form({ email: "a@b.co", password: "x" })).errors).toEqual({});
  });
});

describe("parseProfile", () => {
  it("accepts a known region and treats empty as no region", () => {
    expect(parseProfile(form({ display_name: "Wumpini", region: "upper_east" })).data.region).toBe("upper_east");
    expect(parseProfile(form({ display_name: "Wumpini", region: "" })).data.region).toBeNull();
  });

  it("rejects regions outside Ghana's 16", () => {
    expect(parseProfile(form({ display_name: "Wumpini", region: "lagos" })).errors.region).toBeDefined();
  });
});

describe("safeNextPath", () => {
  it("keeps same-site paths", () => {
    expect(safeNextPath("/profile")).toBe("/profile");
  });

  it.each(["https://evil.example", "//evil.example", "/\\evil.example", "", null])(
    "falls back for %s",
    (next) => {
      expect(safeNextPath(next)).toBe("/dashboard");
    },
  );
});
