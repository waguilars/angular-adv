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

const updateHospital = async (req, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    const hospitalDB = await Hospital.findOne({ _id: id });

    if (!hospitalDB)
      return res.status(404).json({
        ok: false,
        msg: 'Hospital no encontrado.',
      });

    const changes = { ...req.body, user: uid };

    const updatedHospital = await Hospital.findOneAndUpdate(
      { _id: id },
      changes,
      { new: true }
    );

    res.json({
      ok: true,
      updatedHospital,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el admin.',
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const { id } = req.params;

  try {
    const hospitalDB = await Hospital.findOne({ _id: id });

    if (!hospitalDB)
      return res.status(404).json({
        ok: false,
        msg: 'Hospital no encontrado.',
      });

    await Hospital.findOneAndDelete({ _id: id });

    res.json({
      ok: true,
      msg: 'Hospital eliminado.',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el admin.',
    });
  }
};

module.exports = {
  getHospitals,
  addHospital,
  updateHospital,
  deleteHospital,
};
