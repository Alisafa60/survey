const User = require('../models/user.model');
const UserType = require('../models/userType.model');
const bcrypt = require('bcrypt');

const initializeAdmin = async () => {
  try {
    const adminType = await UserType.findOne({ type: 'admin' });

    if (!adminType) {
      console.error('Admin user type not found. Please run initializeTypes.js first.');
      return;
    }

    const existingAdmin = await User.findOne({ userType: adminType._id });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    const adminUser = new User({
      username: "sara12", 
      password: "aliali", 
      firstName: "sara",
      lastName: "safa",
      profilePicture: "img.url",
      userType: adminType._id,
    });

    await adminUser.save();

    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

module.exports = initializeAdmin;
