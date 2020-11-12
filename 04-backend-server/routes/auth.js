// Path: /api/login

const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validators');

const router = Router();

router.post(
  '/',
  [
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  '/google',
  [check('token', 'Token es obligatorio').not().isEmpty(), validateFields],
  googleSignIn
);

module.exports = router;
