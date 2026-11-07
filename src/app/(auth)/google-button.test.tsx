import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("./actions", () => ({ signInWithGoogle: vi.fn() }));

const { GoogleButton, GoogleSignIn, OrDivider } = await import("./google-button");

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("GoogleSignIn", () => {
  it("renders nothing while Google sign in is off", () => {
    vi.stubEnv("AUTH_GOOGLE_ENABLED", "");
    expect(GoogleSignIn()).toBeNull();
  });

  it("renders nothing for any value other than true", () => {
    vi.stubEnv("AUTH_GOOGLE_ENABLED", "1");
    expect(GoogleSignIn()).toBeNull();
  });

  it("renders the Google button and the divider once switched on", () => {
    vi.stubEnv("AUTH_GOOGLE_ENABLED", "true");
    const children = GoogleSignIn()?.props.children;
    expect(children.map((c: { type: unknown }) => c.type)).toEqual([GoogleButton, OrDivider]);
  });
});
