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
    Monday_breakfast: {
      type: String
    },
    Monday_midMorning: {
        type: String
    },
    Monday_lunch: {
        type: String
    },
    Monday_eveningSnack: {
        type: String
    },
    Monday_dinner: {
        type: String
    },
    Tuesday_breakfast: {
        type: String
    },
    Tuesday_midMorning: {
        type: String
    },
    Tuesday_lunch: {
        type: String
    },
    Tuesday_eveningSnack: {
        type: String
    },
    Tuesday_dinner: {
        type: String
    },
    Wednesday_breakfast: {
        type: String
    },
    Wednesday_midMorning: {
        type: String
    },
    Wednesday_lunch: {
        type: String
    },
    Wednesday_eveningSnack: {
        type: String
    },
    Wednesday_dinner: {
        type: String
    },
    Thursday_breakfast: {
        type: String
    },
    Thursday_midMorning: {
        type: String
    },
    Thursday_lunch: {
        type: String
    },
    Thursday_eveningSnack: {
        type: String
    },
    Thursday_dinner: {
        type: String
    },
    Friday_breakfast: {
        type: String
    },
    Friday_midMorning: {
        type: String
    },
    Friday_lunch: {
        type: String
    },  
    Friday_eveningSnack: {
        type: String
    },
    Friday_dinner: {
        type: String
    },
    Saturday_breakfast: {
        type: String
    },
    Saturday_midMorning: {
        type: String
    },
    Saturday_lunch: {
        type: String
    },
    Saturday_eveningSnack: {
        type: String
    },
    Saturday_dinner: {
        type: String
    },
    Sunday_breakfast: {
       type: String
    },
    Sunday_midMorning: {
        type: String
    },
    Sunday_lunch: {
        type: String
    },
    Sunday_eveningSnack: {
        type: String
    },
    Sunday_dinner: {
        type: String
    },
  }
);




const DietList = mongoose.model('DietList', dietListSchema);

module.exports = DietList;