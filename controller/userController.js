const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User Registration
const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate incoming data
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    } else if (!email) {
      return res.status(400).json({ error: "Email is required" });
    } else if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Check if user is already registered
    const userExists = await User.findOne({
      where: { email },
      attributes: ["email"],
    });

    if (userExists) {
      return res.status(409).json({ error: "User already registered" });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      userID: uuidv4(),
      fullname: name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user is already registered
    const userExists = await User.findOne({
      where: { email },
      attributes: ["email", "password", "userID","fullname"],
    });

    if (!userExists) {
      return res.status(404).json({ error: "User is not registered" });
    }

    // Check password is right or not
    const checkingpassword = await bcrypt.compare(
      password,
      userExists?.dataValues?.password
    );
    if (!checkingpassword) {
      return res.status(401).json({ error: "Passowrd is incorrect." });
    }

    // Create token for successful login
    const token = jwt.sign(
      { email: email, userid: userExists?.dataValues?.userID,fullname:userExists?.dataValues?.fullname },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );


     // Store token in session
     req.session.token = token;

    res.status(200).json(token); 

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registration, signin };
