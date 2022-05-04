const router = require('express').Router();
const User = require('../model/userModel');
const Dietitian = require('../model/dietitianModel');
const DietList = require('../model/dietListModel');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');

router.patch('/:username/requestDietList', authMiddleware, async (req,res,next) => {
    //const list = await DietList.find({user:req.user._id});
    //console.log(list._id);
        try {
        const updateDietitian = await Dietitian.findOne({username:req.params.username});
        console.log(updateDietitian);
        const updateUser = await Dietitian.findOne({username:req.params.username});
        const result=await DietList.findByIdAndUpdate({_id : req.user._id},{user:req.user._id,dietitian:updateDietitian._id},{new:true});
        
        if (result) {
            return res.json( {message: "Request successfull"});
        } else {
            return res.status().json({message: "Request failed"});
        }
        } catch (error) {
            next(error);
            console.log("Error occurred while receiving request:",error);
        }

});

router.patch('/:username/writeDietList', authDietitianMiddleware, async (req,res,next) => {
    //const list = await DietList.find({user:req.user._id});
    //console.log(list._id);
        try {
        const theUser = await User.findOne({username:req.params.username});
        const result = await DietList.findByIdAndUpdate({_id : theUser._id},req.body,{new:true});
        
        if (result) {
            return res.json( {message: "List updated"});
        } else {
            return res.status().json({message: "List could not updated"});
        }
        } catch (error) {
            next(error);
            console.log("Error occurred while updating List:",error);
        }

});

router.get('/myList', authMiddleware, async (req,res,next) => {
    const result = await DietList.findById({_id : req.user._id})
    res.json(result);

   
});



module.exports = router;