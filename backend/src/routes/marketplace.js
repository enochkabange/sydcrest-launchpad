/**
 * Mentor marketplace — paid sessions via Hubtel MoMo.
 *
 * DELIBERATELY DEFERRED. The pilot cohort is free (MASTER_PLAN §3), which
 * keeps payment integration off the critical path entirely. Note also the
 * strategic caveat: ADPList offers free global mentorship, so the 15-20%
 * commission model needs revisiting before this is built.
 *
 * SCAFFOLD: the router mounts and the contract is fixed, but the handlers are
 * not implemented. Every unimplemented route returns 501 with the phase that
 * owns it, so a caller gets a truthful answer instead of a 404 that looks like
 * a routing bug. Fill these in during Phase F (Apr 2027) at the earliest.
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

router.get('/', notYet('Phase F'));
router.post('/book', notYet('Phase F'));
router.post('/webhook/hubtel', notYet('Phase F'));

module.exports = router;
