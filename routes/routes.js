const express = require("express");
const Video = require("../models/video.model");
const User = require("../models/user.model");
const router = express.Router();

// GET route - Fetch All Briefing Room Videos
router.get("/api/videos", async (req, res) => {
  try {
    const briefingVideos = await Video.find(); // Fetch all videos from MongoDB

    // LOGGING JSON RESPONSE PRIOR TO SENDING TO CLIENT
    const originalSend = res.send;
    res.send = function (briefingVideos) {
      console.log("JSON Response:", briefingVideos);
      originalSend.apply(res, arguments);
    };

    res.json(briefingVideos); // Return the result as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET route - Get all users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
