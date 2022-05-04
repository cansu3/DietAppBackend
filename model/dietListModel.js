const mongoose = require('mongoose');
const Dietitian = require('./dietitianModel');
const User = require('./userModel');

const dietListSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dietitian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dietitian',
    },
    breakfast: {
      type: String
    },
    midMorning: {
        type: String
    },
    lunch: {
        type: String
    },
    eveningSnack: {
        type: String
    },
    dinner: {
        type: String
    },
  }
);




const DietList = mongoose.model('DietList', dietListSchema);

module.exports = DietList;