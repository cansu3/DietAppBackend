const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');


const foodSchema = new mongoose.Schema(
  {  
    name: {
      type: String,
      required: [true, 'name is required']
    },
    quantity: {
      type: String,
      required: [true, 'quantity is required']
    },
    calorie: {
      type: Number,
      required: [true, 'calorie is required']
    }
  }
);

const food = mongoose.model('food', foodSchema);
module.exports = food;
