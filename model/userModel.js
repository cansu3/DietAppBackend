const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DietList = require('../model/dietListModel');

const UserSchema = new Schema(
  {   
      username : {
        type: String,
        unique: true,
        required: true

      },
      email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
      },
      password: {
        type: String,
        required: true
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
      height: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      illness: {
        type:String,
      },
      medicine: {
        type:String,
      },
      photo : {
        type : Object,
      }
  }
);

const schema2 = Joi.object({
  username : Joi.string(),
  email : Joi.string().email(),
  password : Joi.string(),
});

const schema1 = Joi.object({
  username : Joi.string(),
  email : Joi.string().email(),
  password : Joi.string(),
  gender : Joi.string(),
  name : Joi.string(),
  surname : Joi.string(),
  height : Joi.number(),
  weight : Joi.number(),
  medicine : Joi.string(),
  illness : Joi.string(),
  photo : Joi.object(),
  birthday:Joi.date(),


});

UserSchema.methods.generateToken = async function () {
  
  const loggedInUser = this;
  const token = await jwt.sign({_id:loggedInUser._id},'secretkey',{expiresIn:'12h'});
  return token;

}

UserSchema.statics.login = async function(email,password) {

  const {error,value} = schema2.validate({email,password});
  if (error) {
    throw new Error(error);
    
  }

    const user = await User.findOne({email:email});
    if (!user) {
      throw new Error("Email or password is invalid");
    }
    const passwordCheck= await bcrypt.compare(password,user.password);
    if (!passwordCheck) {
      throw new Error("Email or password is invalid"); 
    }
    return user;
}

UserSchema.methods.joiValidation = function (userObject) { schema2.required();
return schema2.validate(userObject);
}

UserSchema.statics.joiValidationforUpdate = function (userObject) {
  return schema1.validate(userObject);
  }


  UserSchema.post('save', async function (doc) {
    await DietList.create({ _id: doc._id });
   });

const User = mongoose.model('User',UserSchema);


module.exports = User;