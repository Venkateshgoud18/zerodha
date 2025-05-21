const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");  // Correctly import the User model
const bcrypt = require("bcrypt");  // bcrypt for password hashing
const jwt = require("jsonwebtoken");  // For generating a token

// userVerification Middleware: Verifies JWT token
const userVerification = (req, res, next) => {
  const token = req.header("Authorization");  // Get the token from the Authorization header

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Store user information in req.user
    next();  // Move to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid token.");
  }
};
// Add this route if you want to handle POST requests at / route
router.post("/", (req, res) => {
  res.status(200).send("POST request to the root URL");
});


// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, createdAt } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      createdAt,
    });

    await newUser.save();
    res.status(201).send("User created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email (or username depending on how you want to authenticate)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // If password matches, generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send token in response
    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Protected Route Example
// You can use the `userVerification` middleware here to protect this route
router.get("/protected", userVerification, (req, res) => {
  // If the token is valid, this route will be reached
  res.status(200).send("This is a protected route. You are authenticated.");
});

module.exports = router;
