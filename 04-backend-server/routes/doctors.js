// Path: /api/hopsitals
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validators');
const { validateJWT } = require('../middlewares/jwt');
const {
  addDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
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
router.put('/:id', [], updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;
