const User = require('../models/User');
const Skill = require('../models/Skill');
const Progress = require('../models/Progress');
const Milestone = require('../models/Milestone');
const ACHIEVEMENT_TYPES = require('../constants/achievementTypes');

class AchievementService {
  // Helper method to check if user already has an achievement
  static hasAchievement(user, achievementId) {
    return user.achievements.some(a => a.id === achievementId);
  }

  // Helper method to create achievement object
  static createAchievementObject(achievement) {
    return {
      id: achievement.id,
      type: achievement.type,
      title: achievement.title,
      description: achievement.description,
      emoji: achievement.emoji,
      dateEarned: new Date()
    };
  }

  // Check for new achievements when progress is logged
  static async checkProgressAchievements(userId, skillId) {
    const user = await User.findById(userId);
    const skill = await Skill.findById(skillId);
    const newAchievements = [];

    // Check time investment achievements
    const timeInvested = skill.timeSpent || 0;
    for (const achievement of Object.values(ACHIEVEMENT_TYPES.TIME_INVESTMENT)) {
      if (timeInvested >= achievement.threshold && 
          !this.hasAchievement(user, achievement.id)) {
        newAchievements.push(this.createAchievementObject(achievement));
      }
    }

    // Check streaks
    const progress = await Progress.find({ user: userId })
      .sort({ date: -1 })
      .limit(30);
    
    let currentStreak = 0;
    let lastDate = null;

    for (const entry of progress) {
      const entryDate = new Date(entry.date).toDateString();
      if (!lastDate) {
        currentStreak = 1;
        lastDate = entryDate;
      } else if (new Date(lastDate) - new Date(entryDate) === 86400000) { // 1 day difference
        currentStreak++;
        lastDate = entryDate;
      } else {
        break;
      }
    }

    // Check streak achievements
    for (const achievement of Object.values(ACHIEVEMENT_TYPES.STREAKS)) {
      if (currentStreak >= achievement.threshold &&
          !this.hasAchievement(user, achievement.id)) {
        newAchievements.push(this.createAchievementObject(achievement));
      }
    }

    // Award new achievements if any
    if (newAchievements.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          achievements: {
            $each: newAchievements
          }
        }
      });
    }

    return newAchievements;
  }

  // Check for milestone-related achievements
  static async checkMilestoneAchievements(userId, milestoneId) {
    const user = await User.findById(userId);
    const newAchievements = [];

    // Check first milestone completion
    if (!this.hasAchievement(user, ACHIEVEMENT_TYPES.MILESTONES.MILESTONE_MAKER.id)) {
      newAchievements.push(
        this.createAchievementObject(ACHIEVEMENT_TYPES.MILESTONES.MILESTONE_MAKER)
      );
    }

    // Count total completed milestones
    const completedMilestones = await Milestone.countDocuments({
      skill: { $in: user.skills },
      completed: true
    });

    // Check milestone master achievement
    const milestoneMaster = ACHIEVEMENT_TYPES.MILESTONES.MILESTONE_MASTER;
    if (completedMilestones >= milestoneMaster.threshold &&
        !this.hasAchievement(user, milestoneMaster.id)) {
      newAchievements.push(this.createAchievementObject(milestoneMaster));
    }

    // Award new achievements if any
    if (newAchievements.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          achievements: {
            $each: newAchievements
          }
        }
      });
    }

    return newAchievements;
  }

  // Check for skill-related achievements
  static async checkSkillAchievements(userId) {
    const user = await User.findById(userId);
    const newAchievements = [];

    // Count active and completed skills
    const activeSkills = await Skill.countDocuments({ 
      user: userId,
      status: 'in-progress'
    });
    
    const completedSkills = await Skill.countDocuments({
      user: userId,
      status: 'completed'
    });

    // Check first skill achievement
    if (activeSkills + completedSkills === 1 &&
        !this.hasAchievement(user, ACHIEVEMENT_TYPES.SKILL_MILESTONES.FIRST_SKILL.id)) {
      newAchievements.push(
        this.createAchievementObject(ACHIEVEMENT_TYPES.SKILL_MILESTONES.FIRST_SKILL)
      );
    }

    // Check triple threat achievement
    if (activeSkills >= 3 &&
        !this.hasAchievement(user, ACHIEVEMENT_TYPES.SKILL_MILESTONES.TRIPLE_THREAT.id)) {
      newAchievements.push(
        this.createAchievementObject(ACHIEVEMENT_TYPES.SKILL_MILESTONES.TRIPLE_THREAT)
      );
    }

    // Check skill master achievement
    if (completedSkills > 0 &&
        !this.hasAchievement(user, ACHIEVEMENT_TYPES.SKILL_MILESTONES.SKILL_MASTER.id)) {
      newAchievements.push(
        this.createAchievementObject(ACHIEVEMENT_TYPES.SKILL_MILESTONES.SKILL_MASTER)
      );
    }

    // Award new achievements if any
    if (newAchievements.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          achievements: {
            $each: newAchievements
          }
        }
      });
    }

    return newAchievements;
  }
}

module.exports = AchievementService;