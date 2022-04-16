const router = require('express').Router();
const User = require('../model/userModel');
const DietList = require('../model/dietListModel');
const authMiddleware = require('../middleware/authMiddleware');



router.patch('/myList', authMiddleware, async (req,res,next) => {
    //const list = await DietList.find({user:req.user._id});
    //console.log(list._id);
        try {
       // const list = await DietList.find({user:req.user._id});
        const result = await DietList.findByIdAndUpdate({_id : req.user._id},req.body,{new:true});
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