const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    try {
      console.log(
        `database connected sucssefly on ${conn.connection.host}`.cyan.underline
      );
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
