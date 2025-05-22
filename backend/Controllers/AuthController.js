const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Missing fields", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, username });
    await user.save();

    return res.status(201).json({ message: "User signed up successfully", success: true });
  } catch (error) {
    console.error("Signup error:", error.stack || error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Incorrect email or password", success: false });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      secure: false,  // `true` only for HTTPS, false for localhost
      sameSite: "lax", // or "none" with secure:true if cross-site over HTTPS
      httpOnly: true,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
