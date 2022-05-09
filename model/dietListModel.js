const mongoose = require('mongoose');
const Dietitian = require('./dietitianModel');
const User = require('./userModel');
const Joi = require('@hapi/joi');

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
    snack: {
      type: String
    },
    totalCalorie: {
      type: Number
    },
    note: {
      type: String
    }
  }
);

const schema = Joi.object({
  createdAt : Joi.date(),
  user : Joi.object(),
  dietitian: Joi.object(),
  breakfast : Joi.string(),
  midMorning : Joi.string(),
  lunch : Joi.string(),
  eveningSnack : Joi.string(),
  lunch : Joi.string(),
  snack : Joi.string(),
  totalCalorie : Joi.number(),
  note : Joi.string()
});

dietListSchema.methods.joiValidation = function (dietListObject) { 
  return schema.validate(dietListObject);
}





const DietList = mongoose.model('DietList', dietListSchema);

module.exports = DietList;