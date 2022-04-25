const router = require('express').Router();
const User = require('../model/userModel');
const Weight = require('../model/weightModel');
const UserProfile = require('../model/userProfileModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');

router.post('/', authMiddleware, async (req,res,next) => {
try {
    const saveWeight = new Weight(req.body);
    saveWeight.user=req.user._id;
    const result = await saveWeight.save(); 
    res.json(saveWeight);   
    
} catch (error) {
    next(error);
    console.log("Error occurred while adding weight:"+error);   
}


});

router.get('/', authMiddleware,  async (req,res) => {

    try {
     const allWeights = await Weight.find({user:req.user._id});
     res.json(allWeights);
        
    } catch (error) {
     console.log("Error occurred while finding users:"+error);   
        
    }
    
 });

module.exports = router;