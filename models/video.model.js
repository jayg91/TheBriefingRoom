const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail_url: String,
  video_url: String,
  duration: Number,
  author: String,
  author_avatar_url: String,
  video_id: Number,
  category: String,
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
