import { describe, expect, it } from "vitest";
import { hasReasoningIntent, LONG_MESSAGE_CHARS, looksLikeCode, routeMessage } from "./router";

describe("routeMessage", () => {
  it("keeps short routine questions on Haiku", () => {
    for (const text of ["What is a variable?", "Thanks, that helps!", "Can you give me another example?", "What does SQL stand for?"]) {
      expect(routeMessage(text)).toEqual({ tier: "routine", model: "claude-haiku-5-5", reason: "routine" });
    }
  });

  it("sends explain why, compare and debug questions to Sonnet", () => {
    for (const text of [
      "Explain why my loop runs forever",
      "Why does Excel round my numbers?",
      "Compare a list and a dictionary",
      "What is the difference between mean and median?",
      "Can you help me debug this?",
      "I get an error when I open the file",
      "My formula is not working",
    ]) {
      const route = routeMessage(text);
      expect(route.model, text).toBe("claude-sonnet-5-5");
      expect(route.reason, text).toBe("intent");
    }
  });

  it("sends messages with code to Sonnet", () => {
    for (const text of [
      "```python\nprint(total)\n```",
      "const fare = trips * 5;",
      "SELECT name FROM farmers WHERE region = 'Northern'",
      "items.map(x => x.price)",
      "<div class=\"card\">",
    ]) {
      expect(routeMessage(text).reason, text).toBe("code");
    }
  });

  it("sends long messages to Sonnet", () => {
    const text = "Wumpini sells shea butter at the Tamale market and keeps notes. ".repeat(12);
    expect(text.length).toBeGreaterThan(LONG_MESSAGE_CHARS);
    expect(routeMessage(text)).toMatchObject({ tier: "reasoning", reason: "long" });
  });

  it("does not mistake everyday sentences for code or reasoning", () => {
    expect(looksLikeCode("I went to the market (with Mariama) today.")).toBe(false);
    expect(hasReasoningIntent("Why not, let's continue")).toBe(false);
  });
});
