// path: /api/user

const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const { validateFields } = require('../middlewares/validators');
const {
  validateJWT,
  validateAdminRole,
  validateAdminRoleOrMe,
} = require('../middlewares/jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post(
  '/',
  [
    // validateJWT,
    check('name', 'El nombre es obligatorio').trim().not().isEmpty(),
    check('password', 'La contraseña es obligatoria').trim().not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    validateFields,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    validateAdminRoleOrMe,
    check('name', 'El nombre es obligatorio').trim().not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete('/:id', [validateJWT], deleteUser);

module.exports = router;
