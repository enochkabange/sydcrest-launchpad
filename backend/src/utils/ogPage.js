/**
 * renderOgPage — shared HTML shell for the public achievement/certificate
 * share pages (PLATFORM_SPEC.md §8). A client-rendered Vite SPA can't
 * serve per-URL Open Graph tags to a non-JS social crawler, so these
 * pages are server-rendered here rather than in React Router — the page
 * itself, not a redirect target, since there's no auth or app-shell
 * dependency to route back into.
 *
 * No <script> tags anywhere: index.js's helmet CSP allows
 * styleSrc 'unsafe-inline' but not scriptSrc.
 *
 * og:image is one static branded asset (backend/public/og-share.png), not
 * generated per-achievement — a native image-rendering module isn't
 * guaranteed to resolve the same way on Railway's linux container as it
 * does locally, and text rendering needs a registered font a bare
 * container won't have. LinkedIn/WhatsApp still render a real preview
 * card either way; dynamic per-achievement images are a documented
 * fast-follow, not a silent gap.
 */
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderOgPage(req, { title, description, bodyHtml }) {
  const base = `${req.protocol}://${req.get('host')}`;
  const url = `${base}${req.originalUrl}`;
  const image = `${base}/og-share.png`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:url" content="${escapeHtml(url)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#0f1115; color:#f5f5f7; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; padding:24px; box-sizing:border-box; }
  .card { max-width:420px; width:100%; background:#181b22; border:1px solid #2a2e38; border-radius:12px; padding:32px; text-align:center; }
  .brand { font-weight:800; letter-spacing:-0.02em; margin-bottom:24px; font-size:18px; }
  h1 { font-size:22px; margin:0 0 12px; }
  p { color:#a3a9b8; line-height:1.5; margin:0; }
  a { color:#6ea8fe; }
</style>
</head>
<body>
  <div class="card">
    <div class="brand">SydCrest Launchpad</div>
    ${bodyHtml}
  </div>
</body>
</html>`;
}

module.exports = { renderOgPage, escapeHtml };
