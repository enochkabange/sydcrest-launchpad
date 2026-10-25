import { describe, expect, it } from "vitest";
import { formatPhone, normalizePhone, parseProfile, parseSignIn, parseSignUp, safeNextPath } from "./validation";

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

describe("normalizePhone", () => {
  it.each([
    ["024 123 4567", "+233241234567"],
    ["0241234567", "+233241234567"],
    ["+233 24 123 4567", "+233241234567"],
    ["233-55-123-4567", "+233551234567"],
    ["020 123 4567", "+233201234567"],
    ["+44 7911 123456", "+447911123456"],
  ])("normalises %s", (input, expected) => {
    expect(normalizePhone(input)).toBe(expected);
  });

  it.each(["12345", "024 123 456", "0841234567", "+233 84 123 4567", "phone", "+0123456789"])(
    "rejects %s",
    (input) => {
      expect(normalizePhone(input)).toBeNull();
    },
  );

  it("formats Ghana numbers back for display", () => {
    expect(formatPhone("+233241234567")).toBe("024 123 4567");
    expect(formatPhone("+447911123456")).toBe("+447911123456");
    expect(formatPhone(null)).toBe("");
  });
});

describe("parseProfile phone", () => {
  it("treats an empty phone as no phone and flags a bad one", () => {
    expect(parseProfile(form({ display_name: "Wumpini", phone: "" })).data.phone).toBeNull();
    expect(parseProfile(form({ display_name: "Wumpini", phone: "0241234567" })).data.phone).toBe("+233241234567");
    expect(parseProfile(form({ display_name: "Wumpini", phone: "123" })).errors.phone).toBeDefined();
  });
});
