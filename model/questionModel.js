const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const User = require('../model/userModel');
const Dietitian = require('../model/dietitianModel');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dietitian'
  },
  question: {
    type: String,
    required: [true, 'Message should not be empty']
  },
  answer: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  seen: {
    type: Boolean,
    default: false
  },
});


const Question = new mongoose.model('Question', QuestionSchema);

module.exports = Question;