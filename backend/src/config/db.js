const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    // eslint-disable-next-line no-console
    console.error("DB connection failed: MONGO_URI is missing. Create backend/.env from backend/.env.example.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
