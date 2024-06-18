const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const { startDatabase } = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const userRoute = require("./routes/userRoutes");
const bookRoute = require("./routes/booksRoutes");
const { swaggerfn } = require("./utils/swaggeroptions");

const app = express();

// Connecting to Database
startDatabase();

// Define CORS options
const corsOptions = {
  origin:process.env.ORIGIN,
  credentials: true,
  methods: "GET,PUT,POST,OPTIONS",
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Authorization"],
  headers: [
    "DNT",
    "User-Agent",
    "X-Requested-With",
    "If-Modified-Since",
    "Cache-Control",
    "Content-Type",
    "Authorization",
  ].join(","),
};

const swaggerDocs = swaggerJsdoc(swaggerfn());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set secure flag based on environment
    },
  })
);

// Routes setup
app.use("/api/v1/user", userRoute);
app.use("/api/v1/books", bookRoute);

// Start Server

 let server = app.listen(config.port, () => {
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
