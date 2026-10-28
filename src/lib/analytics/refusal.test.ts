import { describe, expect, it } from "vitest";
import { classifyError, errorCode } from "./refusal";

describe("classifyError", () => {
  it("maps database codes to refusal types", () => {
    expect(classifyError({ code: "54000" })).toBe("rate_limited");
    expect(classifyError({ code: "42501" })).toBe("forbidden");
    expect(classifyError({ code: "P0002" })).toBe("forbidden");
    expect(classifyError({ code: "23505" })).toBe("validation");
    expect(classifyError({ code: "22023" })).toBe("validation");
    expect(classifyError({ code: "23514" })).toBe("validation");
    expect(classifyError({ code: "XX000" })).toBe("server_error");
    expect(classifyError(null)).toBe("server_error");
  });
});

describe("errorCode", () => {
  it("keeps the code, never the message", () => {
    expect(errorCode({ code: "23505", message: "duplicate key wumpini@example.test" })).toBe("23505");
    expect(errorCode({ code: "has spaces in it" })).toBeUndefined();
    expect(errorCode(undefined)).toBeUndefined();
  });
});
