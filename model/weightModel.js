const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const userProfile = require('../model/userProfileModel');

const WeightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userProfile'
  },
  weight: {
    type: String,
    required: [true, 'Message should not be empty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


const Weight = new mongoose.model('Weight', WeightSchema);

module.exports = Weight;