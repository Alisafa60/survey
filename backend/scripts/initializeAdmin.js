const User = require('../models/user.model');
const UserType = require('../models/userType.model');

const initializeAdmins = async (adminsData) => {
  try {
    const adminType = await UserType.findOne({ type: 'admin' });

    if (!adminType) {
      console.error('Admin user type not found. Please run initializeTypes.js first.');
      return;
    }

    for (const adminData of adminsData) {
      const existingAdmin = await User.findOne({ username: adminData.username });

      if (existingAdmin) {
        console.log(`Admin user '${adminData.username}' already exists.`);
        continue;
      }

      const adminUser = new User({
        ...adminData,
        userType: adminType._id,
      });

      await adminUser.save();

      console.log(`Admin user '${adminData.username}' created successfully.`);
    }
  } catch (error) {
    console.error('Error creating admin user(s):', error);
  }
};

module.exports = initializeAdmins;