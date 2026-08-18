/**
 * Public certificate verification — PLATFORM_SPEC.md §7. The
 * admin-facing routes that create certificates (certification-candidates,
 * certify) live in admin.js alongside every other cohort-scoped mutation
 * route; this file is only the public, unauthenticated verification
 * surface, so it's mounted separately.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { renderOgPage, escapeHtml } = require('../utils/ogPage');

// achievements has no certificate_id FK — correlate on the certified
// achievement's own deterministic scope_key (certified:{cohort_id}), set
// at the same time as the certificate.
async function loadCertificate(verificationId) {
  const { data: certificate } = await supabase.from('certificates').select('*').eq('verification_id', verificationId).maybeSingle();
  if (!certificate) return null;
  const { data: achievement } = await supabase
    .from('achievements').select('is_minor').eq('mentee_id', certificate.mentee_id).eq('type', 'certified')
    .eq('scope_key', `certified:${certificate.cohort_id}`).maybeSingle();
  return { ...certificate, is_minor: achievement?.is_minor ?? false };
}

// GET /api/certificates/:verificationId/badge.json – the raw Open Badge
// v3 assertion, for machine verification. Not gated on is_minor: this is
// the same credential payload an employer's ATS would fetch, and it
// carries no more than the badge_json itself already does.
router.get('/certificates/:verificationId/badge.json', async (req, res) => {
  const { data: certificate } = await supabase.from('certificates').select('badge_json').eq('verification_id', req.params.verificationId).maybeSingle();
  if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
  res.json(certificate.badge_json);
});

// GET /api/certificates/:verificationId – the shareable link a mentee
// posts. Server-rendered HTML (see utils/ogPage.js) so LinkedIn/WhatsApp
// crawlers get real Open Graph tags.
router.get('/certificates/:verificationId', async (req, res) => {
  const certificate = await loadCertificate(req.params.verificationId);
  if (!certificate) {
    return res.status(404).send(renderOgPage(req, {
      title: 'Certificate not found', description: 'This verification link is invalid.',
      bodyHtml: '<h1>Not found</h1><p>This verification link is invalid.</p>',
    }));
  }
  if (certificate.is_minor) {
    return res.status(200).send(renderOgPage(req, {
      title: 'Certificate', description: 'This certificate is not publicly shareable.',
      bodyHtml: '<h1>Not available</h1><p>This certificate is not publicly shareable.</p>',
    }));
  }

  const achievement = certificate.badge_json?.credentialSubject?.achievement;
  const title = achievement?.name ?? 'SydCrest Certificate';
  const description = achievement?.description ?? 'A SydCrest Launchpad certificate.';

  res.send(renderOgPage(req, {
    title, description,
    bodyHtml: `
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
      <p style="margin-top:20px;font-size:13px;">Verification ID: ${escapeHtml(certificate.verification_id)}</p>
      <p style="font-size:13px;"><a href="/api/certificates/${escapeHtml(certificate.verification_id)}/badge.json">View credential JSON</a></p>
    `,
  }));
});

module.exports = router;
