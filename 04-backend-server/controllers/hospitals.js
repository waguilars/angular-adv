const { response, request } = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async (req = request, res = response) => {
  const hospitals = await Hospital.find().populate('user', 'name img').exec();

  res.json({
    ok: true,
    hospitals,
  });
};

const addHospital = async (req = request, res = response) => {
  const { uid: user } = req;
  const hospital = new Hospital({ user, ...req.body });

  try {
    await hospital.save();

    res.json({
      ok: true,
      hospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con el administrador.',
    });
  }
};

const updateHospital = (req, res = response) => {
  res.json({
    ok: true,
    message: 'update Hospitales',
  });
};

const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    message: 'delte Hospitales',
  });
};

module.exports = {
  getHospitals,
  addHospital,
  updateHospital,
  deleteHospital,
};
