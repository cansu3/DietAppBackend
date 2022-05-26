const router = require('express').Router();
const User = require('../model/userModel');
const Dietitian = require('../model/dietitianModel');
const DietList = require('../model/dietListModel');
const Question = require('../model/questionModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');

router.post('/askQuestion', authMiddleware, async (req,res,next) => {
    try {
        const findDietList = await DietList.findOne({user:req.user._id});
        const saveQuestion = new Question(req.body);
        saveQuestion.sender=req.user._id;
        saveQuestion.to=findDietList.dietitian;
        const result = await saveQuestion.save(); 
        res.json(saveQuestion);   
        
    } catch (error) {
        next(error);
        console.log("Error occurred while adding question:"+error);   
    }
    
    
    });

    router.get('/readQuestion/:id', authDietitianMiddleware, async (req,res,next) => {
        try {
        const updateQuestion = await Question.findOne({_id:req.params.id});
        const result=await Question.findByIdAndUpdate({_id : updateQuestion._id},{readQuestion:true},{new:true});
        
        if (result) {
            return res.json( {message: "Request successfull"});
        } else {
            return res.status().json({message: "Request failed"});
        }
        } catch (error) {
            next(error);
            console.log("Error occurred while updating question:",error);
        }

}); 

router.get('/NumberOfQuestion', authDietitianMiddleware, async (req,res,next) => {
    try {
        const findQuestions = await Question.find({to:req.dietitian._id, readQuestion : false});

           res.json(findQuestions.length.toString);
        
        
        } catch (error) {
            next(error);
            console.log("Error occurred while updating question:",error);
        }
    

}); 

router.get('/NumberOfAnswer', authMiddleware, async (req,res,next) => {
    try {
    const findAnswers = await Question.find({sender:req.user._id, readAnswer : false});
    const number=0;

       res.json(findAnswers.length.toString);
    
    } catch (error) {
        next(error);
        console.log("Error occurred while updating question:",error);
    }

}); 

router.get('/readAnswer/:id', authMiddleware, async (req,res,next) => {
    try {
    const updateQuestion = await Question.findOne({_id:req.params.id});
    const result=await Question.findByIdAndUpdate({_id : updateQuestion._id},{readAnswer:true},{new:true});
    
    if (result) {
        return res.json( {message: "Request successfull"});
    } else {
        return res.status().json({message: "Request failed"});
    }
    } catch (error) {
        next(error);
        console.log("Error occurred while updating question:",error);
    }

}); 

router.patch('/answerQuestion/:id', authDietitianMiddleware, async (req,res,next) => {
    try {
    const updateQuestion = await Question.findOne({_id:req.params.id});
    const result=await Question.findByIdAndUpdate({_id : updateQuestion._id},req.body,{new:true});
    const result2=await Question.findByIdAndUpdate({_id : updateQuestion._id},{readAnswer:false},{new:true});
    
    if (result && result2) {
        return res.json( {message: "Request successfull"});
    } else {
        return res.status().json({message: "Request failed"});
    }
    } catch (error) {
        next(error);
        console.log("Error occurred while updating question:",error);
    }

}); 

router.get('/getQuestion/:id', authDietitianMiddleware, async (req,res,next) => {
    try {
    const getQuestion = await Question.findOne({_id:req.params.id});
    const findUser = await User.findOne({_id:getQuestion.sender});
    const findDietitian = await Dietitian.findOne({_id:getQuestion.to});
    
    if (getQuestion && findUser && findDietitian) {
        return res.json( {_id: getQuestion._id,
                          sender:findUser.username,
                          to:findDietitian.username,
                          createdAt:getQuestion.createdAt.toDateString(),
                          question:getQuestion.question,
                          subject:getQuestion.subject,
                          answer:getQuestion.answer});
    } else {
        return res.status().json({message: "Request failed"});
    }
    } catch (error) {
        next(error);
        console.log("Error occurred while updating question:",error);
    }

}); 

router.get('/getAnswer/:id', authMiddleware, async (req,res,next) => {
    try {
    const getQuestion = await Question.findOne({_id:req.params.id});
    const findUser = await User.findOne({_id:getQuestion.sender});
    const findDietitian = await Dietitian.findOne({_id:getQuestion.to});
    
    if (getQuestion && findUser && findDietitian) {
        return res.json( {_id: getQuestion._id,
                          sender:findUser.username,
                          to:findDietitian.username,
                          createdAt:getQuestion.createdAt.toDateString(),
                          question:getQuestion.question,
                          subject:getQuestion.subject,
                          answer:getQuestion.answer});
    } else {
        return res.status().json({message: "Request failed"});
    }
    } catch (error) {
        next(error);
        console.log("Error occurred while updating question:",error);
    }

}); 

router.get('/getAnswers', authMiddleware, async (req,res,next) => {
    try {
    const getQuestion = await Question.find({sender:req.user._id});


    
    if (getQuestion) {
        return res.json(getQuestion);
    } else {
        return res.status().json({message: "Request failed"});
    }
    } catch (error) {
        next(error);
        console.log("Error occurred while getting question:",error);
    }

});

router.get('/getQuestions', authDietitianMiddleware, async (req,res,next) => {
    try {
    const getQuestion = await Question.find({to:req.dietitian._id});


    
    if (getQuestion) {
        
        return res.json(getQuestion);
    } else {
        return res.status().json({message: "Request failed"});
    }
    } catch (error) {
        next(error);
        console.log("Error occurred while getting question:",error);
    }

});

module.exports = router;


