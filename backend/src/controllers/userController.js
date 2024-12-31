const User = require('../models/User');
const fs = require('fs').promises;
const path = require('path');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  const allowedUpdates = ['name', 'bio'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: 'Error updating profile' });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Delete old profile image if it exists
    if (req.user.profileImage) {
      const oldImagePath = path.join(__dirname, '..', req.user.profileImage);
      try {
        await fs.unlink(oldImagePath);
      } catch (error) {
        console.error('Error deleting old profile image:', error);
      }
    }

    // Update user with new image path
    req.user.profileImage = '/uploads/profile-images/' + req.file.filename;
    await req.user.save();
    
    res.json({ 
      message: 'Profile image updated successfully',
      profileImage: req.user.profileImage
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile image' });
  }
};

exports.getAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('achievements');
    res.json(user.achievements);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching achievements' });
  }
};