const express = require("express");
const router  = express.Router();
const User    = require("../models/User");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/users/profile
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

// PUT /api/users/profile
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.name)    user.name    = req.body.name;
    if (req.body.phone)   user.phone   = req.body.phone;
    if (req.body.address) user.address = req.body.address;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users  (admin)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
