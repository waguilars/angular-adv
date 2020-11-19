const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJwt } = require('../helpers/jwt');

const getUsers = async (req = request, res = response) => {
  const from = +req.query.from || 0;
  const items = +req.query.limit || 5;

  // const users = await User.find({}, 'name email role google')
  //   .skip(from)
  //   .limit(items);
  // const total = await User.count();

  const [users, total] = await Promise.all([
    User.find({}, 'name email role google img').skip(from).limit(items),
    User.countDocuments(),
  ]);

  res.json({
    ok: true,
    users,
    total,
  });
};

const createUser = async (req = request, res = response) => {
  const { name, password, email } = req.body;

  try {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado',
      });
    }

    const user = new User(req.body);

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    const token = await generateJwt(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... ver logs',
    });
  }
};

// TODO: Validar token y verificar si es el usuario correcto
const updateUser = async (req = request, res = response) => {
  const { id: uid } = req.params;

  try {
    const userDB = await User.findById(uid);

    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: 'No existe ningun usuario con ese id',
      });

    // Update
    const { password, google, email, ...fields } = req.body;
    if (email !== userDB.email) {
      const existEmail = await User.findOne({ email });

      if (existEmail)
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese correo.',
        });
    }

    if (userDB.google && email != userDB.email) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuarios de google no pueden cambiar su correo.',
      });
    }

    fields.email = email;
    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const { id: uid } = req.params;

    const userDB = await User.findById(uid);

    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese id',
      });

    await User.findByIdAndDelete(uid);

    res.json({ ok: true, msg: 'Usuario eliminado' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado...',
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
