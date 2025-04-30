const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/level3-todo-list');
    console.log('MongoDB Connected on mongodb://localhost:27017/level3-todo-list');
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit if error
  }
};

module.exports = connectDB;
