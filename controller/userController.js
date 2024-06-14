const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");


 // User Registration
const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate incoming data
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
  else  if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
   else if (!password) {
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

module.exports = { registration };
