const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const validator = require('validator');


const userProfileSchema = new mongoose.Schema(
  {
    dietitian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dietitian',
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    photo: {
      type: Object,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
  }
);

const userProfile = mongoose.model('userProfile', userProfileSchema);
module.exports = userProfile;
