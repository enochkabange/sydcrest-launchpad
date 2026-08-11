/**
 * Learning routes — curriculum delivery, progress, AI study buddy.
 *
 * The core loop. `learning_paths`, `learning_weeks`, and `chat_messages`
 * already exist in schema.sql; this is where the 12-week DMP curriculum is
 * served and where Study Buddy streams over SSE.
 *
 * SCAFFOLD: the router mounts and the contract is fixed, but the handlers are
 * not implemented. Every unimplemented route returns 501 with the phase that
 * owns it, so a caller gets a truthful answer instead of a 404 that looks like
 * a routing bug. Fill these in during Phase B (Sep 2026), with the AI endpoints in Phase C.
 */
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const notYet = (phase) => (req, res) =>
  res.status(501).json({
    error: 'Not implemented',
    detail: `${req.method} ${req.baseUrl}${req.path} is scheduled for ${phase}.`,
  });

router.use(auth);

router.get('/paths', notYet('Phase B'));
router.post('/paths/generate', notYet('Phase C'));
router.get('/weeks/:pathId', notYet('Phase B'));
router.post('/weeks/:weekId/complete', notYet('Phase B'));
router.post('/chat', notYet('Phase C — SSE, verify streaming through the Railway proxy early'));
router.post('/quiz/generate', notYet('Phase C'));

module.exports = router;
