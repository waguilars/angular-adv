const jwt = require('jsonwebtoken');
const { response, request } = require('express');

validateJWT = (req = request, res = response, next) => {
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

module.exports = {
  validateJWT,
};
