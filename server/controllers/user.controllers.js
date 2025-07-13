const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.models"); 
require("dotenv").config()
const userControll = {
  // Register
  async registerControllers(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      // Create token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(201).json({ message: "User registered", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Login
  async loginControllers(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Logout (JWT is stateless, so just tell client to delete token)
  async logoutControllers(req, res) {
    try {
      res.json({ message: "Logout successful. Just remove the token from client." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user info (requires token)
  async userInfoControllers(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch (error) {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  }
};

module.exports = userControll;
