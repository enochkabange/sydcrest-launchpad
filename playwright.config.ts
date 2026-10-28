import { loadEnvConfig } from "@next/env";
import { defineConfig, devices } from "@playwright/test";

// The app under test reads the same env files, so check them before any test
// can create accounts or rows somewhere real.
loadEnvConfig(process.cwd());
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseHost = URL.canParse(supabaseUrl) ? new URL(supabaseUrl).hostname : "";
if (!["127.0.0.1", "localhost", "[::1]"].includes(supabaseHost)) {
  throw new Error(
    `E2E must run against the local Supabase stack, but NEXT_PUBLIC_SUPABASE_URL points at "${supabaseHost || "nothing"}". ` +
      "Run `supabase start` and use its URL and keys (for example in .env.test.local).",
  );
}

// `next start` reads PORT too, so a local run can use another port (PORT=3101 pnpm e2e).
const baseURL = `http://localhost:${process.env.PORT ?? 3000}`;

/**
 * End to end tests against a production build of the app and the LOCAL
 * Supabase stack (`supabase start`). Never point these at staging or
 * production: they create accounts. See docs/ci-cd.md.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    // The design system splits navigation at md (768px): bottom tabs below, sidebar above.
    { name: "phone", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: "pnpm start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
