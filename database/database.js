const mongoose = require('mongoose')
require('dotenv').config()

// Connect to MongoDB
exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName:"libraryManager",
    });
    console.log('Database Connection successful');
    
  } catch (error) {
    console.log(error)
  }
}