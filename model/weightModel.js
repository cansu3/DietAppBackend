const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const user = require('../model/userModel');

const WeightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
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