const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const {startServer} = require('./config/database');

const app = express();

// Connecting to Database
startServer()

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Start Server
app.listen(config.port, () => {
      console.log(`App listening at http://localhost:${config.port}`);
    });
