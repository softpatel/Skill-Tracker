const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/generate-plan', skillController.generatePlan);
router.post('/', skillController.createSkill);
router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkill);
router.post('/:id/progress', skillController.updateProgress);

module.exports = router;