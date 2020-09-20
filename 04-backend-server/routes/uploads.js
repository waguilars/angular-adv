/* Path: /api/all/:search */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { param } = require('express-validator');

const { uploadFile, getImage } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/jwt');
const { validateFields } = require('../middlewares/validators');

const router = Router();

router.use(expressFileUpload());

router.put(
  '/:type/:id',
  [
    validateJWT,
    param('id', 'Identificador no valido').isMongoId(),
    validateFields,
  ],
  uploadFile
);

router.get('/:type/:photo', getImage);

module.exports = router;
