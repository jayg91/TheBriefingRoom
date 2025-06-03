const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const router = express.Router();

// Serve the signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Serve the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle Login form submission
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, "secretkey", {
    expiresIn: "1h",
  });

  // LOGGING JSON RESPONSE PRIOR TO SENDING TO CLIENT
  const originalSend = res.send;
  res.send = function () {
    console.log("!!!!!!! USER LOGGED IN !!!!!!!!");
    originalSend.apply(res, arguments);
  };

  res.json({ message: "Login successful", token });
});

// Handle signup form submission
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Email already in use");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  try {
    await newUser.save();

    // LOGGING JSON RESPONSE PRIOR TO SENDING TO CLIENT
    const originalSend = res.send;
    res.send = function () {
      console.log("USER CREATED!");
      originalSend.apply(res, arguments);
    };

    res.send("User registered successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
