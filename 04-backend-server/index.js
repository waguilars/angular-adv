require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// App
const app = express();

// CORS
app.use(cors());

// Database
dbConnection();

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Hola mundo',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at port ${process.env.PORT}`);
});
