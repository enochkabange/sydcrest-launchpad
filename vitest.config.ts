import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
    // `pnpm test --coverage` (CI): a report, not a gate. scripts/coverage-summary.ts
    // turns it into the PR's job summary.
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}", "scripts/**/*.ts"],
      exclude: ["**/*.test.ts", "**/*.d.ts", "src/content/**", "src/lib/supabase/database.types.ts"],
      reporter: ["text-summary", "json-summary"],
      reportsDirectory: "coverage",
    },
  },
});
