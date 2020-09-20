const path = require('path');
const fs = require('fs');

const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { updateImage, deleteImage } = require('../helpers/update-img');

const uploadFile = async (req = request, res = response) => {
  const { type, id } = req.params;

  const validTypes = ['doctors', 'hospitals', 'users'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: 'El tipo no es valido, necesita ser: ' + validTypes.join(' '),
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ ok: false, msg: 'No se subio ningun archivo.' });
  }

  //Process image
  const { image: file } = req.files;

  const splittedName = file.name.split('.');
  const ext = splittedName[splittedName.length - 1];

  // Validate exts
  const validExts = ['png', 'jpg', 'jpeg', 'gif'];
  if (!validExts.includes(ext)) {
    return res.status(400).json({
      ok: false,
      msg: 'Extension no valida',
    });
  }
  // Filename
  const filename = `${uuidv4()}.${ext}`;

  // file path
  const path = `./uploads/${type}/${filename}`;

  file.mv(path, async (err) => {
    if (err)
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover imagen',
      });

    // Update BD
    const uploadStatus = await updateImage(type, id, filename);

    if (!uploadStatus) {
      deleteImage(path);
      return res.status(500).json({
        ok: false,
        msg: 'Identificador no valido.',
      });
    }

    res.json({ ok: true, msg: 'Archivo subido', filename });
  });
};

const getImage = (req = request, res = response) => {
  const { type, photo } = req.params;

  const imgPath = path.join(__dirname, `../uploads/${type}/${photo}`);

  // default image
  if (fs.existsSync(imgPath)) {
    res.sendFile(imgPath);
  } else {
    const imgPath = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(imgPath);
  }
};

module.exports = {
  uploadFile,
  getImage,
};
