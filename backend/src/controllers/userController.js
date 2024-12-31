const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  const allowedUpdates = ['name', 'bio', 'profileImage'];
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

exports.getAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('achievements');
    res.json(user.achievements);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching achievements' });
  }
};