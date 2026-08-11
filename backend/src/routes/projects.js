/**
 * Project routes — submission and mentor review.
 *
 * Phase B's exit test runs through here: a learner submits, a mentor
 * reviews. `projects` and `project_rubrics` exist in schema.sql.
 * File upload is multipart — see FileUpload in the frontend for the client half.
 *
 * SCAFFOLD: the router mounts and the contract is fixed, but the handlers are
 * not implemented. Every unimplemented route returns 501 with the phase that
 * owns it, so a caller gets a truthful answer instead of a 404 that looks like
 * a routing bug. Fill these in during Phase B (Sep 2026); AI assessment in Phase C.
 */
const express = require('express');
const router = express.Router();
const { auth, requireLevel } = require('../middleware/auth');

const notYet = (phase) => (req, res) =>
  res.status(501).json({
    error: 'Not implemented',
    detail: `${req.method} ${req.baseUrl}${req.path} is scheduled for ${phase}.`,
  });

router.use(auth);

router.get('/', notYet('Phase B'));
router.post('/', notYet('Phase B'));
router.get('/:id', notYet('Phase B'));
router.post('/:id/review', notYet('Phase B — mentor only'));
router.post('/:id/ai-assess', notYet('Phase C'));

module.exports = router;
