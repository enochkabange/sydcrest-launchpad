import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Links go through the data saver wrapper so prefetch is skipped on
  // Save-Data and 2G (issue #40). Warning, not error, while other branches
  // still import next/link directly.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/link.tsx"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          paths: [
            {
              name: "next/link",
              importNames: ["default"],
              message: 'Use `import Link from "@/components/ui/link"` so prefetch respects Save-Data.',
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
