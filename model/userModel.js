const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userProfile = require('../model/userProfileModel');
const DietList = require('../model/dietListModel');

const UserSchema = new Schema(
  {    
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
  }
);

const schema = Joi.object({
  email : Joi.string().email(),
  password : Joi.string(),
});

UserSchema.methods.generateToken = async function () {
  
  const loggedInUser = this;
  const token = await jwt.sign({_id:loggedInUser._id},'secretkey',{expiresIn:'1h'});
  return token;

}

UserSchema.statics.login = async function(email,password) {

  const {error,value} = schema.validate({email,password});
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


UserSchema.methods.joiValidation = function (userObject) {
  schema.required();
return schema.validate(userObject);
}

UserSchema.statics.joiValidationforUpdate = function (userObject) {
  return schema.validate(userObject);
  }


 UserSchema.post('save', async function (doc) {
   await userProfile.create({ _id: doc._id });
  });

  UserSchema.post('save', async function (doc) {
    await DietList.create({ _id: doc._id });
   });

const User = mongoose.model('User',UserSchema);


module.exports= User;