import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// A Tailwind colour utility on a raw palette hue, with any variant prefix
// (hover:, has-checked:, md:) and an optional step (bg-blue-600, text-white).
const RAW_COLOUR =
  "/(^|[^a-z0-9-])(bg|text|border|border-[trblxy]|from|to|via|ring|ring-offset|fill|stroke|outline|decoration|divide|shadow|accent|caret|placeholder)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone|white|black)(-[0-9]+)?([^a-z0-9-]|$)/";
const RAW_COLOUR_MESSAGE =
  "Raw palette colour: use a semantic token from src/styles/tokens.css (bg-surface, text-content-2, bg-action, border-line-selected) so it follows dark mode and higher contrast.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Links go through the data saver wrapper so prefetch is skipped on
  // Save-Data and 2G (issue #40).
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/link.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
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
  // Colours come from the semantic tokens in src/styles/tokens.css
  // (bg-surface, text-content-2, bg-action), never a raw Tailwind palette
  // step: a raw step does not follow dark mode or higher contrast (#204).
  // Add a token when no role fits. Lesson content in src/content is data.
  {
    files: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: `Literal[value=${RAW_COLOUR}]`,
          message: RAW_COLOUR_MESSAGE,
        },
        {
          selector: `TemplateElement[value.raw=${RAW_COLOUR}]`,
          message: RAW_COLOUR_MESSAGE,
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
    // /design-sync inputs (preview fixtures for Claude Design) and its local build output.
    ".design-sync/**",
    ".ds-sync/**",
    "dist-ds/**",
    "ds-bundle/**",
  ]),
]);

export default eslintConfig;
