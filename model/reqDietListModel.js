const mongoose = require('mongoose');
const userProfile = require('./userProfileModel');
const dietitianProfile = require('./dietitianProfileModel');

const reqDietListSchema = new mongoose.Schema(
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
    cost:      {
        type: Number,
        default:300,
    },
    time:      {
        type: Number,
        default:30,
    },
  }
);




const ReqDietList = mongoose.model('ReqDietList', reqDietListSchema);

module.exports = ReqDietList;