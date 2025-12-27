const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const bcrypt = require('bcryptjs');
const User = require('./moduls/users/userModul');

dotenv.config();

const createAdmin = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

    // Check if admin exists
    const adminExists = await User.findOne({ userId: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists'.red);
      process.exit(1);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    // Create admin user
    const user = await User.create({
      name: 'Admin',
      userId: 'admin',
      password: hashedPassword,
      isAdmin: true,
      active: true,
      group: [1,2,3],
    });

    console.log('Admin user created successfully'.green.inverse);
    console.log('Username (userId): admin');
    console.log('Password: 123456');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

createAdmin();