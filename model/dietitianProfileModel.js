const mongoose = require('mongoose');
const validator = require('validator');


const dietitianProfileSchema = new mongoose.Schema(
  {
    dietitian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dietitian',
    },
    bio: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'gender is required'],
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    surname: {
      type: String,
      required: [true, 'surname is required'],
    },
    birthday: {
      type: Date,
      select: false,
    },
    photo: {
      type: Object,
    },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userProfile',
        select: false,
      },
    ],

  }
);

const dietitianProfile = mongoose.model('dietitianProfile', dietitianProfileSchema);
module.exports = dietitianProfile;

