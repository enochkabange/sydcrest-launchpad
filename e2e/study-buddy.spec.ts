import { expect, test } from "@playwright/test";

/**
 * Study Buddy API guard (issue #48). Signed out visitors are refused before
 * any model call or database read, so this needs no Anthropic key.
 */

test("signed out visitors get 401 from Study Buddy", async ({ request }) => {
  const response = await request.post("/api/study-buddy", {
    data: { nodeId: "8f14e45f-ceea-467a-9575-0a1b2c3d4e5f", messages: [{ role: "user", content: "What is a variable?" }] },
  });
  expect(response.status()).toBe(401);
  expect(await response.json()).toMatchObject({ error: "signed_out" });
});
