const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/generate-plan', skillController.generatePlan);
router.post('/', skillController.createSkill);
router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkill);
router.delete('/:id', skillController.deleteSkill);
router.post('/:id/progress', skillController.updateProgress);
router.patch('/milestones/:milestoneId', skillController.updateMilestone);

module.exports = router;