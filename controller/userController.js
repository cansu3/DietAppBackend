const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const DietList = require('../model/dietListModel');
const bcrypt = require('bcrypt');

const getAllUsers = async (req,res) => {

    try {
     const allUsers = await User.find({});
     res.json(allUsers);
        
    } catch (error) {
     console.log("Error occurred while finding users:"+error);   
        
    }
    
 };

const getUser =  async (req,res) => {

     try {
      const findUser = await User.find({_id : req.params.id});
      res.json(findUser);
         
     } catch (error) {
      console.log("Error occurred while finding user:"+error);   
         
     }
     
 };

const getMyProfileInfo = async (req,res,next) => {

    const findUser = await UserProfile.findById({_id : req.user._id});
     res.json(findUser);

    
 };

 const updateMyProfile = async (req,res,next) => {
    
    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password,5);
        
    } 
    const {error,value}=User.joiValidationforUpdate(req.body);
    if (error) {
        next(error);
        
    } else {
        try {
        const result = await UserProfile.findByIdAndUpdate({_id : req.user._id},req.body,{new:true});
        if (result) {
            return res.json( {message: "User updated"});
        } else {
            return res.status().json({message: "User could not updated"});
        }
        } catch (error) {
            next(error);
            console.log("Error occurred while updating user:"+error);
        }
    }

   
 };


 module.exports = {
     getAllUsers,
     getUser,
     getMyProfileInfo,
     updateMyProfile,
 }