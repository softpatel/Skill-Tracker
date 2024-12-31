const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/fileUpload');

// All routes require authentication
router.use(auth);

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.patch('/profile', userController.updateProfile);

// Update profile image
router.post('/profile/image', upload.single('profileImage'), userController.updateProfileImage);

// Get user achievements
router.get('/achievements', userController.getAchievements);

module.exports = router;