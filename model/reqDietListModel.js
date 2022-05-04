const mongoose = require('mongoose');
const User = require('./userModel');
const Dietitian = require('./dietitianModel');

const reqDietListSchema = new mongoose.Schema(
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