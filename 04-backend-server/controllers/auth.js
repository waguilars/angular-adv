const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJwt } = require('../helpers/jwt');

const login = async (req = request, res = response, next) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });

    // Check email
    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: 'Credenciales incorrectos',
      });

    // Check password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword)
      return res.status(404).json({
        ok: false,
        msg: 'Credenciales incorrectos',
      });

    // Generate token
    const token = await generateJwt(userDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el admin',
    });
  }
};

module.exports = {
  login,
};
