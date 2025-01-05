const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  estimatedHours: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  learningResources: [{
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    url: String
  }],
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  }
}, { timestamps: true });

const Milestone = mongoose.model('Milestone', milestoneSchema);
module.exports = Milestone;