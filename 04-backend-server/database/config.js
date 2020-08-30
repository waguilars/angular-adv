const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('DB is now online');
  } catch (error) {
    throw new Error('Error al conectar la DB.');
  }
};

module.exports = {
  dbConnection,
};
