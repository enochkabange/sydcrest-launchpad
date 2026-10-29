import { describe, expect, it } from "vitest";
import {
  ageOn,
  formatPhone,
  normalizePhone,
  parseAgeAndConsent,
  parseIsoDate,
  parseNewPassword,
  parseProfile,
  parseResetRequest,
  parseSignIn,
  parseSignUp,
  safeNextPath,
  todayInAccra,
} from "./validation";
import { LEGAL_VERSION, UNDER_AGE_MESSAGE, hasAgeAndConsent } from "./legal";

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

/** Noon in Accra (UTC+0) on the given day, so tests don't depend on the machine's timezone. */
function accraNoon(iso: string) {
  return new Date(`${iso}T12:00:00Z`);
}

const NOW = accraNoon("2026-10-25");
const ADULT = { date_of_birth: "2000-03-14", terms: "on", adult: "on" };

describe("parseSignUp", () => {
  it("accepts a valid sign up and normalises the email", () => {
    const { data, errors } = parseSignUp(
      form({ full_name: "  Fuseini Alhassan ", email: "Fuseini@Example.com", password: "kpakpa123", ...ADULT }),
      NOW,
    );
    expect(errors).toEqual({});
    expect(data).toEqual({
      fullName: "Fuseini Alhassan",
      email: "fuseini@example.com",
      password: "kpakpa123",
      dateOfBirth: "2000-03-14",
      termsVersion: LEGAL_VERSION,
    });
  });

  it("flags every missing or invalid field", () => {
    const { errors } = parseSignUp(form({ full_name: "", email: "not-an-email", password: "short" }), NOW);
    expect(Object.keys(errors).sort()).toEqual(["adult", "date_of_birth", "email", "full_name", "password", "terms"]);
  });

  it("rejects names over 80 characters", () => {
    const { errors } = parseSignUp(
      form({ full_name: "A".repeat(81), email: "a@b.co", password: "longenough", ...ADULT }),
      NOW,
    );
    expect(errors.full_name).toBeDefined();
  });

  it("refuses under 18s with the friendly message", () => {
    const { errors } = parseSignUp(
      form({ full_name: "Mariama Iddrisu", email: "m@b.co", password: "longenough", terms: "on", date_of_birth: "2010-06-01" }),
      NOW,
    );
    expect(errors).toEqual({ date_of_birth: UNDER_AGE_MESSAGE });
  });
});

describe("parseAgeAndConsent", () => {
  const dob = (date_of_birth: string, now = NOW) =>
    parseAgeAndConsent(form({ date_of_birth, terms: "on", adult: "on" }), now).errors.date_of_birth;

  it("refuses someone who is 17 years and 364 days old", () => {
    expect(dob("2008-10-26")).toBe(UNDER_AGE_MESSAGE);
  });

  it("accepts someone who turns 18 today", () => {
    expect(dob("2008-10-25")).toBeUndefined();
  });

  it("treats a 29 February birthday as reached on 1 March in a non leap year", () => {
    expect(dob("2008-02-29", accraNoon("2026-02-28"))).toBe(UNDER_AGE_MESSAGE);
    expect(dob("2008-02-29", accraNoon("2026-03-01"))).toBeUndefined();
  });

  it("treats a 29 February birthday as reached on the day in a leap year", () => {
    expect(dob("2010-02-29")).toBe("Enter a real date of birth."); // 2010 had no 29 February
    expect(dob("2012-02-29", accraNoon("2030-02-28"))).toBe(UNDER_AGE_MESSAGE);
    expect(dob("2012-02-29", accraNoon("2030-03-01"))).toBeUndefined();
  });

  it("uses Ghana's date, not the server's", () => {
    // 23:30 on 24 October in Accra is already 25 October in Lagos or Nairobi.
    expect(dob("2008-10-25", new Date("2026-10-24T23:30:00Z"))).toBe(UNDER_AGE_MESSAGE);
    expect(dob("2008-10-25", new Date("2026-10-25T00:00:00Z"))).toBeUndefined();
  });

  it("rejects missing, malformed, impossible, ancient and future dates", () => {
    expect(dob("")).toBe("Enter your date of birth.");
    expect(dob("14/03/2000")).toBe("Enter a real date of birth.");
    expect(dob("2000-3-14")).toBe("Enter a real date of birth.");
    expect(dob("2001-02-30")).toBe("Enter a real date of birth.");
    expect(dob("2000-13-01")).toBe("Enter a real date of birth.");
    expect(dob("1850-01-01")).toBe("Enter a real date of birth.");
    expect(dob("2026-10-26")).toBe("Your date of birth can't be in the future.");
  });

  it("requires the consent box and records the current terms version", () => {
    const { data, errors } = parseAgeAndConsent(form({ date_of_birth: "2000-03-14", adult: "on" }), NOW);
    expect(errors).toEqual({ terms: expect.any(String) });
    expect(data.termsVersion).toBe(LEGAL_VERSION);
  });

  it("requires the 18 or over tick (founder decision D1)", () => {
    const { errors } = parseAgeAndConsent(form({ date_of_birth: "2000-03-14", terms: "on" }), NOW);
    expect(errors).toEqual({ adult: "Tick the box to confirm you are 18 or over." });
  });

  it("says only the under 18 message when the date of birth is under 18, ticked or not", () => {
    const { errors } = parseAgeAndConsent(form({ date_of_birth: "2010-06-01", terms: "on" }), NOW);
    expect(errors).toEqual({ date_of_birth: UNDER_AGE_MESSAGE });
  });

  it("skips the date of birth when it is already on file (it cannot change, #251)", () => {
    const { data, errors } = parseAgeAndConsent(form({ date_of_birth: "1990-01-01", terms: "on", adult: "on" }), NOW, {
      askDateOfBirth: false,
    });
    expect(errors).toEqual({});
    expect(data.dateOfBirth).toBe("");
    expect(parseAgeAndConsent(form({}), NOW, { askDateOfBirth: false }).errors).toEqual({
      terms: expect.any(String),
      adult: expect.any(String),
    });
  });
});

describe("date helpers", () => {
  it("parses only real ISO dates", () => {
    expect(parseIsoDate("2024-02-29")).toEqual({ year: 2024, month: 2, day: 29 });
    expect(parseIsoDate("2023-02-29")).toBeNull();
  });

  it("counts whole years", () => {
    expect(ageOn({ year: 2000, month: 3, day: 14 }, { year: 2026, month: 3, day: 13 })).toBe(25);
    expect(ageOn({ year: 2000, month: 3, day: 14 }, { year: 2026, month: 3, day: 14 })).toBe(26);
  });

  it("reads today in Africa/Accra", () => {
    expect(todayInAccra(new Date("2026-12-31T23:59:59Z"))).toEqual({ year: 2026, month: 12, day: 31 });
  });
});

describe("hasAgeAndConsent", () => {
  it("needs both a date of birth and a terms version", () => {
    expect(hasAgeAndConsent({ date_of_birth: "2000-03-14", terms_version: LEGAL_VERSION })).toBe(true);
    expect(hasAgeAndConsent({ full_name: "Abdul-Rahman Seidu" })).toBe(false);
    expect(hasAgeAndConsent({ date_of_birth: "2000-03-14" })).toBe(false);
    expect(hasAgeAndConsent(undefined)).toBe(false);
  });
});

describe("parseSignIn", () => {
  it("requires a password but does not length-check it", () => {
    expect(parseSignIn(form({ email: "a@b.co", password: "" })).errors.password).toBeDefined();
    expect(parseSignIn(form({ email: "a@b.co", password: "x" })).errors).toEqual({});
  });
});

describe("parseResetRequest", () => {
  it("lower cases a valid email and rejects a malformed one", () => {
    expect(parseResetRequest(form({ email: " Mariama@Example.com " }))).toEqual({ data: { email: "mariama@example.com" }, errors: {} });
    expect(parseResetRequest(form({ email: "mariama@" })).errors.email).toBe("Enter a valid email address.");
    expect(parseResetRequest(new FormData()).errors.email).toBeDefined();
  });
});

describe("parseNewPassword", () => {
  it("accepts a password typed the same way twice", () => {
    expect(parseNewPassword(form({ password: "Tamale-2027", confirm_password: "Tamale-2027" }))).toEqual({
      data: { password: "Tamale-2027" },
      errors: {},
    });
  });

  it("applies the sign up length rule", () => {
    const short = parseNewPassword(form({ password: "short", confirm_password: "short" }));
    expect(short.errors.password).toBe(parseSignUp(form({ password: "short" })).errors.password);
  });

  it("asks for the second copy and refuses a mismatch", () => {
    expect(parseNewPassword(form({ password: "Tamale-2027" })).errors.confirm_password).toBe("Type your new password again.");
    expect(parseNewPassword(form({ password: "Tamale-2027", confirm_password: "Tamale-2028" })).errors).toEqual({
      confirm_password: "The two passwords don't match.",
    });
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
