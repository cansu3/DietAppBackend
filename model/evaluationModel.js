const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const User = require('../model/userModel');
const Dietitian = require('../model/dietitianModel');

const EvaluationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dietitian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dietitian'
  },
  scor: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Evaluation = new mongoose.model('Evaluation', EvaluationSchema);

module.exports = Evaluation;