const jwt = require('jsonwebtoken');
const { response, request } = require('express');

const User = require('../models/user');

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token)
    return res.status(401).json({
      ok: false,
      msg: 'Necesita estar autenticado para continuar',
    });

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token No valido',
    });
  }
};

const validateAdminRole = async (req = request, res = response, next) => {
  const uid = req.uid;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe',
      });
    }

    if (userDB.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        msg: 'No tiene permiso para realizar esta acción',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Contactese con el administrador.',
    });
  }
};

const validateAdminRoleOrMe = async (req = request, res = response, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe',
      });
    }

    if (userDB.role !== 'ADMIN_ROLE' && uid !== id) {
      return res.status(403).json({
        ok: false,
        msg: 'No tiene permiso para realizar esta acción',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Contactese con el administrador.',
    });
  }
};

module.exports = {
  validateJWT,
  validateAdminRole,
  validateAdminRoleOrMe,
};
