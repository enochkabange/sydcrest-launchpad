import { test } from "@playwright/test";
import { screensSetup, shoot } from "./shoot";

/** Forgot password screens (issue #227) at 390, 1440 and 1920. */
test("screenshots of the forgot and reset password screens", async ({ page }, testInfo) => {
  screensSetup(testInfo, 60_000);
  await shoot(page, testInfo, "forgot-password", "/forgot-password");
  // Signed out, /reset-password shows its expired link state.
  await shoot(page, testInfo, "reset-password-expired", "/reset-password");
});
