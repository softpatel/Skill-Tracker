const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  targetLevel: {
    type: String,
    enum: ['Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  timeCommitment: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  milestones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone'
  }],
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  }
}, { 
  timestamps: true 
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;