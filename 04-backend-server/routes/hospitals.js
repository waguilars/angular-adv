// Path: /api/hopsitals
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validators');
const { validateJWT } = require('../middlewares/jwt');
const {
  getHospitals,
  addHospital,
  deleteHospital,
  updateHospital,
} = require('../controllers/hospitals');

const router = Router();

router.get('/', getHospitals);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre del hostiptal es necesario').not().isEmpty(),
    validateFields,
  ],
  addHospital
);
router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
  ],
  updateHospital
);

router.delete('/:id', [validateJWT], deleteHospital);

module.exports = router;
