const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors")
const {v4:uuid4}=require("uuid")
const config = require('./config/config');
const {startServer} = require('./config/database');
const User=require("./models/userModel");
const userRoute = require('./routes/userRoutes');
const app = express();

// Connecting to Database
startServer()

// Middleware to parse JSON bodies
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())

// User Routes
app.use("/api/v1/user",userRoute)

// Start Server
app.listen(config.port, () => {
      console.log(`App listening at http://localhost:${config.port}`);
    });
