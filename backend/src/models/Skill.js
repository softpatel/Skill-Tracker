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
  // Keep the percentage completion as a number
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  // Store progress history as references
  progressHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Progress'
  }],
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

// Add an index to improve query performance
skillSchema.index({ user: 1, status: 1 });

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;