// Builds dist-ds/: a package-shaped build of the SydCrest component library for
// /design-sync (the app is a Next.js app, not a package, so the converter gets
// a real entry + .d.ts tree + compiled stylesheet from here).
//   node .design-sync/build/build-dist.mjs        (run from the repo root)
// Outputs (gitignored): dist-ds/{package.json,index.js,index.d.ts,types/,styles.css}
//
// - index.js: ESM bundle of .design-sync/build/entry.tsx. react / react-dom stay
//   external (the converter maps them to window.React). Next.js runtime modules
//   are shimmed (shims/), and server-only modules (auth, session readers,
//   "use server" actions, supabase, anthropic) become stubs that read sample
//   data from window.SydCrestPreview, so server components render from props.
// - types/ + index.d.ts: tsc declaration emit, `@/` aliases rewritten relative.
// - styles.css: src/styles/tokens.css compiled with the repo's Tailwind v4 over
//   the bundled source files and the authored previews.
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const REPO = process.cwd();
// esbuild is not a direct dependency; use the copy the repo already installs via tsx.
const { build } = createRequire(fs.realpathSync(path.join(REPO, "node_modules/tsx/package.json")))("esbuild");
if (!fs.existsSync(path.join(REPO, ".design-sync/build/entry.tsx"))) throw new Error("run from the repo root");
const HERE = path.join(REPO, ".design-sync/build");
const SRC = path.join(REPO, "src") + "/";
const OUT = path.join(REPO, "dist-ds");
const shim = (f) => path.join(HERE, "shims", f);
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// ---- 1. runtime bundle ------------------------------------------------------
// Server modules answered from window.SydCrestPreview (sync, so de-asynced server
// components render in the browser).
const OVERRIDES = {
  "lib/nav/viewer": "getNavViewer: function(){ return P().viewer || null; }",
  "lib/auth": "requireUser: function(){ return P().user || { id: 'preview-user' }; }, getCurrentUser: function(){ return P().user || null; }",
  "lib/events/public": "eventPath: function(s){ return \"/events/\" + s; }",
  "lib/notifications/server": "getUnreadCount: function(){ var c = P().unread == null ? null : P().unread; return { catch: function(){ return c; }, then: function(f){ return f(c); } }; }",
  "lib/learning-loop/server": "getLearningLoop: function(){ return P().learningLoop; }",
  "lib/roadmaps/progress": "getMyProgress: function(){ return null; }",
  "components/roadmaps/views/live": "liveView: function(v){ return v; }",
};
const exportNames = (src) => {
  const names = new Set();
  for (const m of src.matchAll(/export\s+(?:async\s+)?(?:function\*?|const|let|var|class)\s+(\w+)/g)) names.add(m[1]);
  for (const m of src.matchAll(/export\s*\{([^}]*)\}/g))
    for (const part of m[1].split(",")) {
      const n = part.trim().split(/\s+as\s+/).pop();
      if (n && !/^type\b/.test(part.trim())) names.add(n);
    }
  return [...names];
};
const stubSource = (rel, src = "") => `var P = function(){ return (typeof window !== "undefined" && window.SydCrestPreview) || {}; };
var noop = ${/^\s*["']use server["']/.test(src) ? "function(){ return Promise.resolve({}); }" : "function(){ return null; }"};
var o = { ${exportNames(src).filter((n) => !(OVERRIDES[rel] || "").includes(n + ":")).map((n) => JSON.stringify(n) + ": noop").concat(OVERRIDES[rel] ? [OVERRIDES[rel]] : []).join(", ")} };
module.exports = new Proxy(o, { get: function(t, k){ if (k in t) return t[k]; if (k === "__esModule") return true; return function(){ return null; }; } });`;

const stubbed = new Set();
const plugin = {
  name: "sydcrest-dist",
  setup(b) {
    b.onResolve({ filter: /^next\/link$/ }, () => ({ path: shim("next-link.js") }));
    b.onResolve({ filter: /^next\/image$/ }, () => ({ path: shim("next-image.js") }));
    b.onResolve({ filter: /^next\/form$/ }, () => ({ path: shim("next-form.js") }));
    b.onResolve({ filter: /^next\/navigation$/ }, () => ({ path: shim("next-navigation.js") }));
    b.onResolve({ filter: /^(next\/.*|server-only|@supabase\/.*|@anthropic-ai\/.*)$/ }, (a) => ({ path: a.path, namespace: "stub" }));
    b.onResolve({ filter: /^@\/lib\/supabase\// }, (a) => ({ path: a.path, namespace: "stub" }));
    b.onLoad({ filter: /.*/, namespace: "stub" }, (a) => { stubbed.add(a.path); return { contents: stubSource(""), loader: "js" }; });
    b.onLoad({ filter: /\/src\/.*\.tsx?$/ }, (a) => {
      if (!a.path.startsWith(SRC)) return undefined;
      let src = fs.readFileSync(a.path, "utf8");
      const rel = a.path.slice(SRC.length).replace(/\.tsx?$/, "");
      const head = src.slice(0, 400);
      if (OVERRIDES[rel] !== undefined || /^\s*["']use server["']/.test(src) || /^import ["']server-only["'];?/m.test(head)) {
        stubbed.add(rel);
        return { contents: stubSource(rel, src), loader: "js" };
      }
      // Server components with request-time islands: their loaders are stubbed to
      // sync preview data above, so the islands render synchronously.
      if (rel.startsWith("components/") && !/^\s*["']use client["']/.test(src) && /\basync function\b/.test(src)) {
        src = src.replace(/\basync function\b/g, "function").replace(/\bawait\s+/g, "");
      }
      return { contents: src, loader: a.path.endsWith("x") ? "tsx" : "ts" };
    });
  },
};
const res = await build({
  entryPoints: [path.join(HERE, "entry.tsx")],
  outfile: path.join(OUT, "index.js"),
  bundle: true, format: "esm", jsx: "automatic", target: "es2020", platform: "browser",
  external: ["react", "react-dom", "react/jsx-runtime", "react-dom/client"],
  tsconfig: path.join(REPO, "tsconfig.json"), absWorkingDir: REPO,
  // Env reads resolve at build time. Share and certificate links show this origin
  // (the domain the repo tests use); see NOTES.md.
  define: { "process.env.NODE_ENV": '"production"', "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify("https://launchpad.sydcrest.com"), "process.env.VERCEL_PROJECT_PRODUCTION_URL": "undefined" },
  plugins: [plugin], metafile: true, logLevel: "warning", legalComments: "none",
});
console.log(`index.js: ${Object.keys(res.metafile.inputs).length} inputs; stubbed: ${[...stubbed].sort().join(", ")}`);

// ---- 2. declarations ----------------------------------------------------------
const tsc = path.join(REPO, "node_modules/typescript/bin/tsc");
try {
  execFileSync(process.execPath, [tsc, "-p", path.join(HERE, "tsconfig.dts.json")], { cwd: REPO, stdio: "pipe" });
} catch (e) {
  // Type errors elsewhere in the program don't stop declaration emit.
  const n = String(e.stdout || "").split("\n").filter((l) => /error TS/.test(l)).length;
  console.log(`tsc: ${n} type error(s) reported (declarations still emitted)`);
}
const TYPES = path.join(OUT, "types");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const rewrite = (file, txt) => txt.replace(/(from\s+|import\()(["'])@\/([^"']+)\2/g, (_, pre, q, p) => {
  let r = path.relative(path.dirname(file), path.join(TYPES, "src", p));
  if (!r.startsWith(".")) r = "./" + r;
  return `${pre}${q}${r}${q}`;
});
let dts = 0;
for (const f of walk(TYPES)) {
  if (!f.endsWith(".d.ts")) continue;
  fs.writeFileSync(f, rewrite(f, fs.readFileSync(f, "utf8")));
  dts++;
}
const entryDts = path.join(TYPES, ".design-sync/build/entry.d.ts");
const idx = path.join(OUT, "index.d.ts");
fs.writeFileSync(idx, rewrite(idx, fs.readFileSync(path.join(HERE, "entry.tsx"), "utf8")));
fs.rmSync(path.dirname(path.dirname(entryDts)), { recursive: true, force: true });
console.log(`types: ${dts} .d.ts files`);

// ---- 3. stylesheet ---------------------------------------------------------------
const req = createRequire(fs.realpathSync(path.join(REPO, "node_modules/@tailwindcss/turbopack/package.json")));
const twNode = req.resolve("@tailwindcss/node");
const { compile, optimize } = await import(twNode);
const { Scanner } = createRequire(twNode)("@tailwindcss/oxide");
let css = fs.readFileSync(path.join(REPO, "src/styles/tokens.css"), "utf8");
const srcs = Object.keys(res.metafile.inputs).filter((p) => p.startsWith("src/") && /\.(tsx?|jsx?)$/.test(p));
const sources = srcs.map((p) => `@source "${path.join(REPO, p)}";`).join("\n") + `\n@source "${path.join(REPO, ".design-sync/previews")}/**/*.tsx";`;
// Designs built in Claude Design get no Tailwind compiler, only this stylesheet. Ship the
// house vocabulary (semantic colour utilities, the type scale, the content widths) whether
// or not a bundled component happens to use each one.
const SEMANTIC = "surface,surface-raised,surface-sunken,content,content-2,content-3,content-inv,content-link,content-accent,line,line-strong,line-selected,action,action-hover,action-fg,info-bg,info-fg,info-line,success-bg,success-fg,warning-bg,warning-fg,danger-bg,danger-fg,sea-blue,ink,orange,yellow";
const SAFELIST = [
  `@source inline("{bg,text,border}-{${SEMANTIC}}");`,
  `@source inline("{hover:,}{bg,text}-{action,action-hover,menu-hover}");`,
  `@source inline("text-{display,h1,h2,h3,title,subtitle,lead,body}");`,
  `@source inline("max-w-{page,wide,reading}");`,
].join("\n");
css = css.replace('@import "tailwindcss";', '@import "tailwindcss" source(none);\n' + sources + "\n" + SAFELIST);
const compiler = await compile(css, { base: path.join(REPO, "src/styles"), onDependency() {} });
const candidates = new Scanner({ sources: compiler.sources }).scan();
let out = optimize(compiler.build(candidates), { minify: false }).code;
fs.writeFileSync(path.join(OUT, "styles.css"),
  "/* SydCrest Launchpad: src/styles/tokens.css compiled with Tailwind v4 for the bundled components and previews. */\n" + out +
  // In the app next/font/local defines --font-urbanist on <html>. Without it the
  // var() in --font-sans is invalid and every font-family falls back to serif.
  "\n/* Host setup next/font does in the app: name the self-hosted face (fonts/fonts.css). */\n@layer base { :root { --font-urbanist: \"Urbanist\"; } }\n");
console.log(`styles.css: ${srcs.length} sources, ${candidates.length} candidates, ${out.length} bytes`);

fs.writeFileSync(path.join(OUT, "package.json"), JSON.stringify({
  name: "sydcrest-launchpad", version: JSON.parse(fs.readFileSync(path.join(REPO, "package.json"), "utf8")).version,
  private: true, type: "module", module: "index.js", types: "index.d.ts",
}, null, 2) + "\n");
