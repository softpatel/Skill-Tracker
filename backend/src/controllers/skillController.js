const Skill = require('../models/Skill');
const Milestone = require('../models/Milestone');
const User = require('../models/User');
const Progress = require('../models/Progress');
const Anthropic = require('@anthropic-ai/sdk');
const AchievementService = require('../services/achievementService');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const populateSkillData = (query) => {
  return query
    .populate({
      path: 'progressHistory',
      options: { sort: { date: -1 } } // Sort progress entries by date descending
    })
    .populate('milestones');
};

exports.generatePlan = async (req, res) => {
  try {
    const { title, description, currentLevel, targetLevel, timeCommitment } = req.body;

    const user = await User.findById(req.user._id);
    let userBio = "";

    if (user.bio !== undefined && user.bio !== "") {
      userBio = "Here is some background info about the user: " + user.bio;
    }

    const prompt = `Create a structured learning plan for someone wanting to learn ${title}. 
    Current level: ${currentLevel}
    Target level: ${targetLevel}
    Weekly time commitment: ${timeCommitment} hours
    Goal: ${description}
    ${userBio}
    
    Format the response as a JSON object with a milestones array. Each milestone should have: id, title, description, estimatedHours, and learningResources array. Make sure the output is valid JSON.`;

    const completion = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      messages: [{ 
        role: "user", 
        content: prompt 
      }],
      system: "You are an expert in creating structured learning plans. Always respond with valid JSON containing an array of milestones."
    });

    const plan = JSON.parse(completion.content[0].text);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate learning plan' });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const { title, description, currentLevel, targetLevel, timeCommitment, plan } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    // Create the skill
    const skill = new Skill({
      title,
      description,
      currentLevel: currentLevel || 'Beginner',
      targetLevel: targetLevel || 'Intermediate',
      timeCommitment: timeCommitment || 0,
      user: req.user._id,
      progress: 0,
      timeSpent: 0
    });

    await skill.save();

    // Create milestones if they exist in the plan
    if (plan && plan.milestones && Array.isArray(plan.milestones)) {      
      const milestonePromises = plan.milestones.map(milestone => {
        const newMilestone = new Milestone({
          title: milestone.title,
          description: milestone.description,
          estimatedHours: milestone.estimatedHours,
          learningResources: Array.isArray(milestone.learningResources) 
            ? milestone.learningResources.map(resource => ({
                type: 'link',
                title: resource,
                url: ''
              }))
            : [],
          skill: skill._id
        });
        return newMilestone.save();
      });

      const savedMilestones = await Promise.all(milestonePromises);
      
      // Update skill with milestone references
      skill.milestones = savedMilestones.map(m => m._id);
      await skill.save();

      // Check for skill-related achievements
      const newAchievements = await AchievementService.checkSkillAchievements(req.user._id);
    }
    
    // Fetch the complete skill with populated milestones
    const populatedSkill = await populateSkillData(Skill.findById(skill._id));

    res.status(201).json(populatedSkill);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error creating skill' });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await populateSkillData(Skill.find({ user: req.user._id }));
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skills' });
  }
};

exports.getSkill = async (req, res) => {
  try {
    const skill = await populateSkillData(Skill.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    }));
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skill' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    // Find the skill and ensure it belongs to the user
    const skill = await populateSkillData(Skill.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    }));

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    // Delete associated milestones
    await Milestone.deleteMany({ skill: skill._id });

    // Delete the skill
    await skill.deleteOne();

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting skill' });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { duration, notes, date } = req.body;
    
    // Validate input
    if (!duration || duration <= 0) {
      return res.status(400).json({ error: 'Invalid duration' });
    }

    // Find the skill and ensure it exists
    const skill = await populateSkillData(Skill.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    }));
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    // Create new progress entry
    const progress = new Progress({
      skill: skill._id,
      user: req.user._id,
      duration: Number(duration), // Ensure duration is a number
      notes: notes || '',
      date: date || new Date()
    });

    // Save the progress entry
    await progress.save();

    // Update skill's time spent
    const newTimeSpent = (skill.timeSpent || 0) + Number(duration);
    skill.timeSpent = newTimeSpent;
    
    // Calculate progress percentage
    const totalEstimatedHours = await Milestone.aggregate([
      { $match: { skill: skill._id } },
      { $group: { _id: null, total: { $sum: '$estimatedHours' } } }
    ]);

    // Add progress entry to history if not already present
    if (!skill.progressHistory) {
      skill.progressHistory = [];
    }
    skill.progressHistory.push(progress._id);

    // Save skill updates
    await skill.save();

    // Return updated skill with populated progress history
    const updatedSkill = await populateSkillData(Skill.findById(skill._id));

    res.json(updatedSkill);
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ 
      error: 'Error updating progress',
      details: error.message 
    });
  }
};

exports.updateMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const updates = req.body;

    // Find the milestone and populate the skill reference
    const milestone = await Milestone.findById(milestoneId).populate('skill');

    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    // Verify that the milestone belongs to a skill owned by the user
    if (milestone.skill.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this milestone' });
    }

    // Update the milestone
    Object.keys(updates).forEach(key => {
      milestone[key] = updates[key];
    });

    await milestone.save();

    // Check for milestone-related achievements
    const newAchievements = await AchievementService.checkMilestoneAchievements(req.user._id, milestone._id);

    // If milestone is marked as completed, check if all milestones are completed
    // and update the skill progress accordingly
    if (updates.completed !== undefined) {
      const skill = await populateSkillData(Skill.findById(milestone.skill._id));
      const allMilestones = await Milestone.find({ skill: skill._id });
      const completedCount = allMilestones.filter(m => m.completed).length;
      const progress = Math.round((completedCount / allMilestones.length) * 100);
      
      skill.progressPercentage = progress;
      if (progress === 100) {
        skill.status = 'completed';
      }
      await skill.save();
    }

    res.json(milestone);
  } catch (error) {
    console.error('Error updating milestone:', error);
    res.status(500).json({ error: 'Error updating milestone' });
  }
};