const mongoose = require('mongoose');
const userProfile = require('./userProfileModel');
const dietitianProfile = require('./dietitianProfileModel');

const dietListSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userProfile',
    },
    dietitian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dietitianProfile',
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