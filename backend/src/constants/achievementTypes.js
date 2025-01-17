const ACHIEVEMENT_TYPES = {
  SKILL_MILESTONES: {
    FIRST_SKILL: {
      id: 'first_skill',
      type: 'skill_milestone',
      title: 'First Steps',
      description: 'Created your first skill',
      emoji: '🌱'
    },
    SKILL_MASTER: {
      id: 'skill_master',
      type: 'skill_milestone',
      title: 'Skill Master',
      description: 'Completed your first skill',
      emoji: '🏆'
    },
    TRIPLE_THREAT: {
      id: 'triple_threat',
      type: 'skill_milestone',
      title: 'Triple Threat',
      description: 'Have three skills in progress simultaneously',
      emoji: '🔄'
    }
  },
  TIME_INVESTMENT: {
    DEDICATED_LEARNER: {
      id: 'dedicated_learner',
      type: 'time_invested',
      title: 'Dedicated Learner',
      description: 'Invested 10 hours in a single skill',
      emoji: '⏱️',
      threshold: 10
    },
    MASTER_PRACTITIONER: {
      id: 'master_practitioner',
      type: 'time_invested',
      title: 'Master Practitioner',
      description: 'Invested 50 hours in a single skill',
      emoji: '⚡',
      threshold: 50
    },
    GRAND_MASTER: {
      id: 'grand_master',
      type: 'time_invested',
      title: 'Grand Master',
      description: 'Invested 100 hours in a single skill',
      emoji: '🌟',
      threshold: 100
    }
  },
  STREAKS: {
    CONSISTENT_LEARNER: {
      id: 'consistent_learner',
      type: 'streak',
      title: 'Consistent Learner',
      description: 'Logged progress for 7 days in a row',
      emoji: '🔥',
      threshold: 7
    },
    UNSTOPPABLE: {
      id: 'unstoppable',
      type: 'streak',
      title: 'Unstoppable',
      description: 'Logged progress for 30 days in a row',
      emoji: '💫',
      threshold: 30
    }
  },
  MILESTONES: {
    MILESTONE_MAKER: {
      id: 'milestone_maker',
      type: 'milestone',
      title: 'Milestone Maker',
      description: 'Completed your first milestone',
      emoji: '🎯'
    },
    MILESTONE_MASTER: {
      id: 'milestone_master',
      type: 'milestone',
      title: 'Milestone Master',
      description: 'Completed 10 milestones across all skills',
      emoji: '🎪',
      threshold: 10
    }
  }
};

module.exports = ACHIEVEMENT_TYPES;