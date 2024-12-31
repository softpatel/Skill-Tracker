const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  targetDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Milestone = mongoose.model('Milestone', milestoneSchema);
module.exports = Milestone;