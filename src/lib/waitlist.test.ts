import { describe, expect, it } from "vitest";
import { parseWaitlist } from "./waitlist";

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

describe("parseWaitlist", () => {
  it("accepts a valid entry and normalises the email", () => {
    const { data, errors } = parseWaitlist(
      form({ name: " Mariama Issah ", email: "Mariama@Example.com", region: "northern", interest: "dmp_cohort" }),
    );
    expect(errors).toEqual({});
    expect(data).toEqual({ name: "Mariama Issah", email: "mariama@example.com", region: "northern", interest: "dmp_cohort" });
  });

  it("flags every missing or invalid field", () => {
    const { errors } = parseWaitlist(form({ name: "", email: "nope", region: "tamale", interest: "anything" }));
    expect(Object.keys(errors).sort()).toEqual(["email", "interest", "name", "region"]);
  });

  it("rejects names over 80 characters", () => {
    const { errors } = parseWaitlist(
      form({ name: "A".repeat(81), email: "a@b.co", region: "upper_east", interest: "mentor" }),
    );
    expect(errors.name).toBeDefined();
  });
});
