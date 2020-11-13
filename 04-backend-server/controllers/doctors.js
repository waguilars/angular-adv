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

const updateDoctor = async (req = request, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    const doctor = await Doctor.findOne({ _id: id });

    if (!doctor)
      return (
        res.status(404),
        json({
          ok: false,
          msg: 'No se encontro ningun doctor con ese id.',
        })
      );

    const changes = { ...req.body, user: uid };
    const updatedDoctor = await Doctor.findOneAndUpdate({ _id: id }, changes, {
      new: true,
    })
      .populate('hospital')
      .exec();

    res.json({
      ok: true,
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Contacte con el admin',
    });
  }
};

const deleteDoctor = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findOne({ _id: id });

    if (!doctor)
      return (
        res.status(404),
        json({
          ok: false,
          msg: 'No se encontro ningun doctor con ese id.',
        })
      );

    await Doctor.findOneAndDelete({ _id: id });

    res.json({
      ok: true,
      msg: 'Doctor ha sido eliminado',
    });
  } catch (error) {
    res.json({
      ok: false,
      message: 'Conteacte con el administrador.',
    });
  }
};

module.exports = {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};
