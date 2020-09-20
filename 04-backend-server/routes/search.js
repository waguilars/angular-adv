/* Path: /api/all/:search */

const { Router } = require('express');

const { findAllMatches, findCollectionDocs } = require('../controllers/search');
const { validateJWT } = require('../middlewares/jwt');

const router = Router();

router.get('/:search', [validateJWT], findAllMatches);

router.get('/collection/:table/:search', [validateJWT], findCollectionDocs);

module.exports = router;
