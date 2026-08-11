/**
 * Community — feed, events, leaderboard.
 *
 * DELIBERATELY DEFERRED. WhatsApp is the real community channel in Ghana
 * (MASTER_PLAN §7) and is the right answer for the pilot. Build this only
 * once the core loop is proven — an empty in-app feed is worse than none.
 *
 * SCAFFOLD: the router mounts and the contract is fixed, but the handlers are
 * not implemented. Every unimplemented route returns 501 with the phase that
 * owns it, so a caller gets a truthful answer instead of a 404 that looks like
 * a routing bug. Fill these in during Phase F (Apr 2027).
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

router.get('/posts', notYet('Phase F'));
router.post('/posts', notYet('Phase F'));
router.get('/events', notYet('Phase F'));

module.exports = router;
