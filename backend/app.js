const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./models/database');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const gifRoutes = require('./routes/gifRoutes');
const adminRoutes = require('./routes/adminRoutes');








app.get('/', (req, res) => {
    res.status(200).json('Welcome to Team Work');
  });

app.use(bodyParser.urlencoded({
    extended: false,
  }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/', articleRoutes);
app.use('/api/v1/', employeeRoutes);
app.use('/api/v1/', gifRoutes);
app.use('/api/v1/', adminRoutes);







module.exports = app;