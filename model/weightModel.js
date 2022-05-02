const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const user = require('../model/userModel');
const Joi = require('@hapi/joi');

const WeightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  weight: {
    type: Number,
    required: [true, 'Message should not be empty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const schema = Joi.object({
  user : Joi.object(),
  weight : Joi.number().required(),
  createdAt : Joi.date(),
});

WeightSchema.methods.joiValidation = function (weightObject) { 
  return schema.validate(weightObject);
}


const Weight = new mongoose.model('Weight', WeightSchema);

module.exports = Weight;