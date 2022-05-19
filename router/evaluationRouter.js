const router = require('express').Router();
const Evaluation = require('../model/evaluationModel');
const User = require('../model/userModel');
const Dietitian = require('../model/dietitianModel');
const DietList = require('../model/dietListModel');
const Weight = require('../model/weightModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');
const { find } = require('../model/dietitianModel');


router.post('/evaluateMyDietitian', authMiddleware, async (req,res,next) => {
try {
    const findDietList = await DietList.findOne({user:req.user._id});
    const findEvaluation = await Evaluation.findOne({user:req.user._id,dietitian:findDietList.dietitian})
    if(findEvaluation){
        findEvaluation.update(req.body);
        findEvaluation.update({user:req.user._id,
                            dietitian:findDietList.dietitian})
                        
    }
    else{
    const saveEvaluation = new Evaluation(req.body);
    saveEvaluation.user=req.user._id;
    saveEvaluation.dietitian=findDietList.dietitian;
    const result = await saveWeight.save(); 
    }
    
    res.json({message:"succesfull"});   
    
} catch (error) {
    next(error);
    console.log("Error occurred while adding weight:"+error);   
}


});

router.get('/getDietitianScore/:username',  async (req,res,next) => {

    try {
  const findDietitian=Dietitian.findOne({username:req.params.username})

 const allEvaluations=await find({dietitian:findDietitian._id});

var sum=0;
var avg=Number;
var count=0;

    for (let i = 0; i < allEvaluations.length; i++) {
        if(allEvaluations[i].score){
            count++;
         sum=allEvaluations[i].score;   
        }
        avg=sum/count;
    }
    res.json(avg);
  
    } catch (error) {
        next(error);
     console.log("Error occurred while finding weights:"+error);   
        
    }
    
 });


module.exports = router;