const { sign } = require('jsonwebtoken');

const generateJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Error al generar JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJwt,
};
