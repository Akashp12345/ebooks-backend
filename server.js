const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors")
const session = require('express-session');
const cookieParser = require("cookie-parser");
const config = require('./config/config');
const {startServer} = require('./config/database');   //import database

const userRoute = require('./routes/userRoutes');    //user routes
const bookRoute = require('./routes/booksRoutes');

const app = express();

// Connecting to Database
startServer()


// Define CORS options
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins =
      process.env.NODE_ENV === "production"
        ? [process.env.ORIGIN]
        : ["http://localhost:5173"];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,PUT,POST,OPTIONS",
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Authorization'],
  headers: [
    "DNT",
    "User-Agent",
    "X-Requested-With",
    "If-Modified-Since",
    "Cache-Control",
    "Content-Type",
    "Authorization"
  ].join(",")
};



// Middleware to parse JSON bodies
app.use(cors(corsOptions))            //managing cors
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({                            
      secret: process.env.SESSION_SECRET, 
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true } 
    }));

// User Routes
app.use("/api/v1/user",userRoute)

// Books endpoints
app.use("/api/v1/books",bookRoute)

// Start Server
const server=app.listen(config.port, () => {
      console.log(`App listening at http://localhost:${config.port}`);
    });



    // Expose a method to close the server
app.close = () => {
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    };

    module.exports = app;