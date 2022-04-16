const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const DietitianSchema = new Schema(
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

DietitianSchema.methods.generateToken = async function () {
  
  const loggedInDietitian = this;
  const token = await jwt.sign({_id:loggedInDietitian._id,email:loggedInDietitian.email},'secretkey',{expiresIn:'1h'});
  return token;

}

DietitianSchema.statics.login = async function(email,password) {

  const {error,value} = schema.validate({email,password});
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
  schema.required();
return schema.validate(dietitianObject);
}

DietitianSchema.statics.joiValidationforUpdate = function (dietitianObject) {
  return schema.validate(dietitianObject);
  }

const Dietitian = mongoose.model('Dietitian',DietitianSchema);

module.exports= Dietitian;