const User = require('../models/User');
const { createToken, cookieOptions } = require('../utils/jwtUtils');

exports.createJWT = async (req, res) => {
  try {
    const { email } = req.body;
    const token = createToken({ email });

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .send({ token, message: "Token created successfully" });
  } catch (error) {
    console.error("Error creating JWT:", error);
    res.status(500).json({ message: "Error creating JWT" });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .clearCookie("token", cookieOptions)
      .status(200)
      .send({ success: true });
  } catch (error) {
    console.error("Error clearing JWT:", error);
    res.status(500).json({ message: "Error clearing JWT" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.getVerifiedUsers = async (req, res) => {
  try {
    const users = await User.find({ isVerified: true });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching verified users" });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, ...rest } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ email, ...rest });
    const result = await newUser.save();
    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const fieldsToUpdate = req.body;
    const result = await User.findOneAndUpdate({ email }, fieldsToUpdate, { new: true });

    if (!result) {
      return res.status(404).json({ message: "User not found or no changes made" });
    }

    res.json({ message: "User updated successfully", result });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error verifying user" });
  }
};

exports.getUserRole = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    res.json({ role: user?.role });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user role" });
  }
};

exports.isAdmin = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    const isAdmin = user?.role === "admin";
    res.json({ isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error checking admin status" });
  }
};