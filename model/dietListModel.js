const mongoose = require('mongoose');
const dietitian = require('./dietitianModel');
const user = require('./userModel');

const dietListSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    dietitian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dietitian',
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