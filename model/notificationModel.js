const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const User = require('../model/userModel');
const Dietitian = require('../model/dietitianModel');

const NotificationSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fromDietitian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dietitian'
  },
  toDietitian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dietitian'
  },
  message: {
    type: String,
    required: [true, 'Message should not be empty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  readfromUser: {
    type: Boolean,
    default: false
  },
  readfromDietitian: {
    type: Boolean,
    default: false
  },
});


const Notification = new mongoose.model('Notification', NotificationSchema);

module.exports = Notification;