const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Database Connected...");
  } catch (error) {
    console.log("Mongo Database error: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
