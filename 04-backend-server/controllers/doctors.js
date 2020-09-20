const { response, request } = require('express');

const Doctor = require('../models/doctor');

const getDoctors = async (req = request, res = response) => {
  const doctors = await Doctor.find()
    .populate('user', 'name img')
    .populate('hospital', 'name img')
    .exec();

  res.json({
    ok: true,
    doctors,
  });
};

const addDoctor = async (req = request, res = response) => {
  const { uid: user } = req;

  const doctor = new Doctor({
    user,
    ...req.body,
  });

  try {
    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con el admin.',
    });
  }
};

const updateDoctor = (req, res = response) => {
  res.json({
    ok: true,
    message: 'update Doctores',
  });
};

const deleteDoctor = (req, res = response) => {
  res.json({
    ok: true,
    message: 'delte Doctores',
  });
};

module.exports = {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};
