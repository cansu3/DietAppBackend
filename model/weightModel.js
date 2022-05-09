const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const User = require('../model/userModel');
const Joi = require('@hapi/joi');

const WeightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  weight: {
    type: Number,
    required: [true, 'Please enter your weight']
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const schema = Joi.object({
  user : Joi.object(),
  weight : Joi.number().required(),
  date : Joi.date(),
});

WeightSchema.methods.joiValidation = function (weightObject) { 
  return schema.validate(weightObject);
}


const Weight = new mongoose.model('Weight', WeightSchema);

module.exports = Weight;