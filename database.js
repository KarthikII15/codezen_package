const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
/**
 * Establishes a connection to MongoDB using Mongoose.
 * Logs the connection host on success or exits the process on failure.
 * @returns {Promise<void>} A Promise that resolves when the connection is successful, or rejects/exits on error.
 */
const connectDB = async () => {ry {
    const mongoURI = process.env.MONGODB_URI;
    const conn = await mongoose.connect(mongoURI, {

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB:`, error.message);
    process.exit(1);
  }
};

// Listen for MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle app termination gracefully
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during MongoDB connection closure:', error);
    process.exit(1);
  }
});

module.exports = connectDB