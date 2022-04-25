const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const DietitianSchema = new Schema(
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
      bio: {
        type: String,
        trim: true,
      },
      gender: {
        type: String,
        enum: ['male', 'female'],
      },
      name: {
        type: String,
      },
      surname: {
        type: String,
      },
      birthday: {
        type: Date,
        select: false,
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
  bio : Joi.string(),
  gender : Joi.string(),
  name : Joi.string(),
  surname : Joi.string(),
  birthday : Joi.string(),
  photo : Joi.object(),

});

DietitianSchema.methods.generateToken = async function () {
  
  const loggedInDietitian = this;
  const token = await jwt.sign({_id:loggedInDietitian._id,email:loggedInDietitian.email},'secretkey',{expiresIn:'5h'});
  return token;

}

DietitianSchema.statics.login = async function(email,password) {

  const {error,value} = schema2.validate({email,password});
  if (error) {
    throw new Error(error);
    
  }

    const dietitian = await Dietitian.findOne({email:email});
    if (!dietitian) {
      throw new Error("Email or password is invalid");
    }
    const passwordCheck= await bcrypt.compare(password,dietitian.password);
    if (!passwordCheck) {
      throw new Error("Email or password is invalid"); 
    }
    return dietitian;
}


DietitianSchema.methods.joiValidation = function (dietitianObject) {
  schema2.required();
return schema2.validate(dietitianObject);
}

DietitianSchema.statics.joiValidationforUpdate = function (dietitianObject) {
  return schema1.validate(dietitianObject);
  };
 

const Dietitian = mongoose.model('Dietitian',DietitianSchema);

module.exports= Dietitian;