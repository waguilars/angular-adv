const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validators');

const router = Router();

// Path: /api/login

router.post(
  '/',
  [
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
