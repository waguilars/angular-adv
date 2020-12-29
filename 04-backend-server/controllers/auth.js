const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJwt } = require('../helpers/jwt');
const { getMenu } = require('../helpers/menu');
const { googleVerify } = require('../helpers/google-verify');

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
      menu: getMenu(userDB.role),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el admin',
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { token: googleToken } = req.body;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    // Check if user exists
    const userDB = await User.findOne({ email });

    let user;

    if (!userDB) {
      user = new User({
        name,
        email,
        password: 'none',
        img: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    await user.save();

    const token = await generateJwt(user._id);

    res.json({
      ok: true,
      token,
      menu: getMenu(user.role),
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'Token no es valido',
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const { uid } = req;

  const token = await generateJwt(uid);

  // Get User by UID

  const user = await User.findOne({ _id: uid });

  res.json({
    ok: true,
    token,
    user,
    menu: getMenu(user.role),
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
