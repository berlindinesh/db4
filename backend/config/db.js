const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn= await mongoose.connect('mongodb://localhost:27017/forms',
      {
     
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
