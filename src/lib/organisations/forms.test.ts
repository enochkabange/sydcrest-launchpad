import { describe, expect, it } from "vitest";
import {
  assignableRoles,
  canManageMember,
  canRequestVerification,
  normaliseUrl,
  organisationErrorMessage,
  ORG_SLUG_PATTERN,
  parseOrganisation,
  parseProfileSlug,
  slugify,
  slugWithSuffix,
} from "./forms";

function form(values: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}

describe("slugify", () => {
  it("makes a web address from a name", () => {
    expect(slugify("Tamale Shea Collective")).toBe("tamale-shea-collective");
    expect(slugify("  Wumpini & Sons Ltd. ")).toBe("wumpini-and-sons-ltd");
    expect(slugify("Café Nalerigu")).toBe("cafe-nalerigu");
  });

  it("pads very short names and gives up on symbols only", () => {
    expect(slugify("AB")).toBe("ab-org");
    expect(ORG_SLUG_PATTERN.test(slugify("AB"))).toBe(true);
    expect(slugify("!!!")).toBe("");
  });

  it("stays within 60 characters and never ends with a hyphen", () => {
    const slug = slugify("a".repeat(59) + " b");
    expect(slug.length).toBeLessThanOrEqual(60);
    expect(ORG_SLUG_PATTERN.test(slug)).toBe(true);
  });

  it("adds a suffix within the limit", () => {
    const slug = slugWithSuffix("x".repeat(60), "ab12cd99");
    expect(slug.length).toBeLessThanOrEqual(60);
    expect(slug.endsWith("-ab12cd")).toBe(true);
    expect(ORG_SLUG_PATTERN.test(slug)).toBe(true);
  });
});

describe("normaliseUrl", () => {
  it("adds https and accepts http(s)", () => {
    expect(normaliseUrl("example.com")).toBe("https://example.com");
    expect(normaliseUrl("http://tamale.example/about")).toBe("http://tamale.example/about");
    expect(normaliseUrl("")).toBeNull();
  });

  it("refuses other schemes and junk", () => {
    expect(normaliseUrl("javascript:alert(1)")).toBeUndefined();
    expect(normaliseUrl("ftp://example.com")).toBeUndefined();
    expect(normaliseUrl("not a link")).toBeUndefined();
    expect(normaliseUrl("localhost")).toBeUndefined();
  });
});

describe("parseOrganisation", () => {
  it("fills the slug from the name and keeps optional fields null", () => {
    const { data, errors } = parseOrganisation(form({ name: "Savannah Agritech", kind: "business" }));
    expect(errors).toEqual({});
    expect(data).toMatchObject({
      name: "Savannah Agritech",
      slug: "savannah-agritech",
      kind: "business",
      description: null,
      website: null,
      region: null,
      registration_number: null,
    });
  });

  it("reports each bad field", () => {
    const { errors } = parseOrganisation(
      form({ name: "", slug: "-Bad Slug", kind: "pirates", website: "javascript:x", region: "lagos" }),
    );
    expect(Object.keys(errors).sort()).toEqual(["kind", "name", "region", "slug", "website"]);
  });

  it("accepts a typed slug and region", () => {
    const { data, errors } = parseOrganisation(
      form({ name: "Northern Hub", slug: "northern-hub-tamale", region: "northern", website: "hub.example" }),
    );
    expect(errors).toEqual({});
    expect(data.slug).toBe("northern-hub-tamale");
    expect(data.region).toBe("northern");
    expect(data.website).toBe("https://hub.example");
  });
});

describe("roles", () => {
  it("mirrors the member policies", () => {
    expect(canManageMember("owner", "owner")).toBe(true);
    expect(canManageMember("admin", "owner")).toBe(false);
    expect(canManageMember("admin", "recruiter")).toBe(true);
    expect(canManageMember("recruiter", "recruiter")).toBe(false);
    expect(assignableRoles("owner")).toEqual(["owner", "admin", "recruiter"]);
    expect(assignableRoles("admin")).toEqual(["admin", "recruiter"]);
    expect(assignableRoles("recruiter")).toEqual([]);
  });

  it("only asks for verification from unverified or rejected", () => {
    expect(canRequestVerification("unverified")).toBe(true);
    expect(canRequestVerification("rejected")).toBe(true);
    expect(canRequestVerification("pending")).toBe(false);
    expect(canRequestVerification("verified")).toBe(false);
    expect(canRequestVerification("suspended")).toBe(false);
  });
});

describe("parseProfileSlug", () => {
  it("reads a link, a path or a bare slug", () => {
    expect(parseProfileSlug("https://launchpad.sydcrest.com/u/mariama-iddrisu")).toBe("mariama-iddrisu");
    expect(parseProfileSlug("/u/Fuseini-A/")).toBe("fuseini-a");
    expect(parseProfileSlug("hawa99")).toBe("hawa99");
  });

  it("refuses anything else", () => {
    expect(parseProfileSlug("")).toBeNull();
    expect(parseProfileSlug("https://example.com/u/a/b")).toBeNull();
    expect(parseProfileSlug("someone@example.com")).toBeNull();
  });
});

describe("organisationErrorMessage", () => {
  it("maps database codes", () => {
    expect(organisationErrorMessage("23505", "x")).toMatch(/taken/);
    expect(organisationErrorMessage("42501", "x")).toMatch(/adults/);
    expect(organisationErrorMessage("23514", "x")).toMatch(/owner/);
    expect(organisationErrorMessage(undefined, "fallback")).toBe("fallback");
  });
});
