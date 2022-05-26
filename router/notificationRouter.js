const router = require('express').Router();
const User = require('../model/userModel');
const Dietitian = require('../model/dietitianModel');
const Notification = require('../model/notificationModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');


router.get('/getUserNotifications', authMiddleware,  async (req,res,next) => {

    try {
    const allNotifications = await Notification.find({toUser:req.user._id }).sort({ createdAt: 1 });


     res.json(allNotifications);

     for(let i=0;i<allNotifications.length;i++){
        allNotifications[i].update({readfromUser:true});  
       }
        
    } catch (error) {
        next(error);
     console.log("Error occurred while finding notifications:"+error);   
        
    }
    
 });

 router.get('/getDietitianNotifications', authDietitianMiddleware,  async (req,res,next) => {

    try {
    const allNotifications = await Notification.find({toDietitian:req.dietitian._id }).sort({ createdAt: 1 });


     res.json(allNotifications);

     for(let i=0;i<allNotifications.length;i++){
      allNotifications[i].update({readfromDietitian:true});   
     }
     
        
    } catch (error) {
        next(error);
     console.log("Error occurred while finding notifications:"+error);   
        
    }
    
 });


router.get('/NumberOfDietitianNotification', authDietitianMiddleware, async (req,res,next) => {
try {
   const findNotifications = await Notification.find({toDietitian:req.dietitian._id, readfromDietitian : false});
     if(findNotifications.length!=0){
        res.json(findNotifications.length);
     }
  
      
   
   } catch (error) {
       next(error);
       console.log("Error occurred while updating question:",error);
   }


}); 

router.get('/NumberOfUserNotification', authMiddleware, async (req,res,next) => {
   try {
      const findNotifications = await Notification.find({toUser:req.user._id, readfromUser : false});

      if(findNotifications.length!=0){
         res.json(findNotifications.length);
      }
      
      } catch (error) {
          next(error);
          console.log("Error occurred while updating question:",error);
      }
   
   
   }); 


module.exports = router;