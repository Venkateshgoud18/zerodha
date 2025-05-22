const express = require("express");
const router = express.Router();
const { Signup, Login } = require("../Controllers/AuthController");

// Auth routes
router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;
