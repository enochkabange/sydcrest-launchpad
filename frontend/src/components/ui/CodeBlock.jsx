/**
 * CodeBlock — the second-most-used element in a coding curriculum after prose.
 *
 * WHY THERE IS NO HIGHLIGHTER DEPENDENCY
 * Prism costs ~22KB gzipped once you add core plus markup/css/javascript —
 * about a 30% increase on the whole app bundle, paid by every learner on
 * metered MTN data on every visit. That is a bad trade for colour.
 *
 * So: highlighting happens ONCE, server-side, when a lesson is saved, and the
 * result is stored alongside the lesson. The client ships zero highlighter.
 * The tokenizer below is a ~40-line fallback for the three languages the DMP
 * curriculum actually uses, so authoring preview and any un-processed content
 * still reads correctly.
 *
 * SAFETY: the default path takes plain text and produces React elements, so
 * injection is structurally impossible. `html` is opt-in and must ONLY ever
 * receive server-generated markup — never learner input. Project submissions
 * are learner input; render those through `children`, not `html`.
 */
import { useState } from "react";
import Icon from "./Icon.jsx";

/* Order matters: comments and strings win before keywords, so a keyword
   inside a string is not re-tokenized. */
const RULES = [
  ["com", /\/\/[^\n]*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|(?:^|\s)#[^\n]*/],
  ["str", /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/],
  ["key", /\b(?:const|let|var|function|return|if|else|for|while|of|in|class|extends|new|await|async|import|from|export|default|try|catch|throw|typeof|null|undefined|true|false|this)\b/],
  ["fn",  /\b[a-zA-Z_$][\w$]*(?=\s*\()/],
  ["num", /\b\d+(?:\.\d+)?\b/],
];

function tokenize(src) {
  const out = [];
  let rest = src;
  let guard = 0;

  while (rest && guard++ < 10000) {
    let best = null;
    for (const [cls, re] of RULES) {
      const m = re.exec(rest);
      if (m && (best === null || m.index < best.index)) best = { cls, index: m.index, text: m[0] };
    }
    if (!best) break;
    if (best.index > 0) out.push({ text: rest.slice(0, best.index) });
    out.push({ cls: best.cls, text: best.text });
    rest = rest.slice(best.index + best.text.length);
  }
  if (rest) out.push({ text: rest });
  return out;
}

export default function CodeBlock({
  children,
  html,
  language,
  filename,
  copyable = true,
  className = "",
  ...props
}) {
  const [copied, setCopied] = useState(false);
  const code = typeof children === "string" ? children.replace(/\n$/, "") : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard is unavailable over plain http and in some Android webviews.
         Failing silently is right — the code is still selectable by hand. */
    }
  };

  return (
    <figure className={`full-bleed my-6 overflow-hidden rounded-lg border border-line bg-surface-sunken ${className}`} {...props}>
      {(filename || language || copyable) && (
        <figcaption className="flex items-center gap-2 border-b border-line bg-surface px-3 py-1.5">
          {filename && (
            <span className="font-mono text-xs font-medium text-content-2">{filename}</span>
          )}
          {language && !filename && (
            <span className="text-xs font-semibold uppercase tracking-wider text-content-3">
              {language}
            </span>
          )}
          {copyable && code && (
            <button
              type="button"
              onClick={copy}
              className="ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-content-2 transition-colors hover:bg-surface-sunken hover:text-content"
            >
              <Icon name={copied ? "check" : "document"} size="sm" />
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </figcaption>
      )}

      <div className="overflow-x-auto">
        <pre className="p-4 text-[0.8125rem] leading-relaxed">
          {html ? (
            /* Server-generated only. See the safety note at the top. */
            <code dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <code>
              {tokenize(code).map((t, i) =>
                t.cls ? <span key={i} className={`tok-${t.cls}`}>{t.text}</span> : t.text
              )}
            </code>
          )}
        </pre>
      </div>
    </figure>
  );
}
