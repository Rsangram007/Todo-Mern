const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Show different message based on environment
    if (process.env.NODE_ENV === "production") {
      console.log(
        `MongoDB Connected to PRODUCTION database: ${conn.connection.host}`
      );
    } else {
      console.log(
        `MongoDB Connected to LOCAL database: ${conn.connection.host}`
      );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
