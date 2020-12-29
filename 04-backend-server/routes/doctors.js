// Path: /api/hopsitals
const { Router } = require('express');
const { check, param } = require('express-validator');

const { validateFields } = require('../middlewares/validators');
const { validateJWT } = require('../middlewares/jwt');
const {
  addDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
  getDoctorById,
} = require('../controllers/doctors');

const router = Router();

router.get('/', getDoctors);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre del médico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id no es válido').isMongoId(),
    validateFields,
  ],
  addDoctor
);
router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'El nombre del médico es necesario').not().isEmpty(),
    check('hospital', 'Id de hospital no valido').isMongoId(),
    validateFields,
  ],
  updateDoctor
);

router.delete('/:id', validateJWT, deleteDoctor);

router.get('/:id', validateJWT, getDoctorById);

module.exports = router;
