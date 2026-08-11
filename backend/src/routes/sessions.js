/**
 * Mentor session routes — booking and attendance.
 *
 * Backed by the `sessions` table. Timezones matter the moment a diaspora
 * mentor joins: store UTC, render in the learner's zone.
 *
 * SCAFFOLD: the router mounts and the contract is fixed, but the handlers are
 * not implemented. Every unimplemented route returns 501 with the phase that
 * owns it, so a caller gets a truthful answer instead of a 404 that looks like
 * a routing bug. Fill these in during Phase B (Sep 2026).
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

router.get('/', notYet('Phase B'));
router.post('/', notYet('Phase B'));
router.patch('/:id', notYet('Phase B'));
router.post('/:id/attendance', notYet('Phase B'));

module.exports = router;
