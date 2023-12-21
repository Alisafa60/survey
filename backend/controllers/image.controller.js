const User = require('../models/user.model');
const upload = require('../utils/imageUpload');

const uploadProfilePicture = async (req, res) => {
  try {
    //const userId = req.params.userId;
    const user = req.user;

    if (!user) {
      return res.status(400).json({ error: 'User not found in the request.' });
    }

    const imageUrl = req.file ? req.file.path : undefined;

    if (!imageUrl) {
      return res.status(400).json({ error: 'No image uploaded.' });
    }

    user.profilePicture = imageUrl;
    await user.save();

    res.status(201).json({ message: 'Profile picture uploaded successfully', imageUrl });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteProfilePicture = async (req, res) => {
  try {
    const user = req.user; 

    user.profilePicture = undefined;
    await user.save();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { 
    uploadProfilePicture, 
    deleteProfilePicture
 };
