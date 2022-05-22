const router = require('express').Router();
const User = require('../model/userModel');
const Dietitian = require('../model/dietitianModel');
const Notification = require('../model/notificationModel');
const DietList = require('../model/dietListModel');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');

router.patch('/requestDietList/:username', authMiddleware, async (req,res,next) => {
        try {
        const updateDietitian = await Dietitian.findOne({username:req.params.username});
        console.log(updateDietitian);
        const result=await DietList.findByIdAndUpdate({_id : req.user._id},{user:req.user._id,dietitian:updateDietitian._id},{new:true});

        const saveNotification = new Notification({toDietitian:updateDietitian._id,
                                                   fromUser:req.user._id,
                                                   message: req.user.username+' requested a diet plan from you!'});
                                                
        const result2 = await saveNotification.save(); 

        
        if (result && result2) {
            return res.json( {message: "Request successfull"});
        } else {
            return res.status().json({message: "Request failed"});
        }
        } catch (error) {
            next(error);
            console.log("Error occurred while receiving request:",error);
        }

});

router.patch('/writeDietList/:username', authDietitianMiddleware, async (req,res,next) => {
        try {
        const theUser = await User.findOne({username:req.params.username});
        const result = await DietList.findByIdAndUpdate({_id : theUser._id},req.body,{new:true});

        
        const saveNotification = new Notification({fromDietitian:req.dietitian._id,
                                                   toUser:theUser._id,
                                                   message: req.dietitian.username +' updated your diet plan!'});
         
            const result2 = await saveNotification.save(); 
  
        
        if (result && resultlt2) {
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
router.get('/userList/:username', authDietitianMiddleware, async (req,res,next) => {
    const theUser = await User.findOne({username:req.params.username});
    const result = await DietList.findById({_id : theUser._id});
    res.json(result);

   
});



module.exports = router;