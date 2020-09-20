require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// App
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Parseo Body
app.use(express.json());

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/search'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
  console.log(`App is running at port ${process.env.PORT}`);
});
