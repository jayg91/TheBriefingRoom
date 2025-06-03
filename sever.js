const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5002;

const connectDB = require("./config/db.js");
const bodyParser = require("body-parser");
const path = require("path");
const Video = require("./models/video.model");

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, "public"))); // For static files like CSS/JS
app.set("view engine", "ejs");

// Routes
app.use(require("./routes/auth"));
app.use(require("./routes/routes"));

//connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
