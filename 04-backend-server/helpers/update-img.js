const fs = require('fs');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, filename) => {
  let oldPath = `./uploads/${type}/${filename}`;

  switch (type) {
    case 'doctors':
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;

      deleteImage(oldPath);
      doctor.img = filename;

      await doctor.save();
      return true;

    case 'hospitals':
      const hospital = await Hospital.findById(id);

      if (!hospital) {
        return false;
      }
      oldPath = `./uploads/hospitals/${hospital.img}`;

      deleteImage(oldPath);
      hospital.img = filename;

      await hospital.save();
      return true;

    case 'users':
      const user = await User.findById(id);

      if (!user) {
        return false;
      }
      oldPath = `./uploads/users/${user.img}`;

      deleteImage(oldPath);
      user.img = filename;

      await user.save();
      return true;
    default:
      deleteImage(oldPath);
      return false;
  }
};

module.exports = {
  updateImage,
  deleteImage,
};
