const router = require('express').Router();
const Dietitian = require('../model/dietitianModel');
const DietList = require('../model/dietListModel');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');

router.get('/', async (req,res) => {

   try {
    const allDietitians = await Dietitian.find({});
    res.json(allDietitians);
       
   } catch (error) {
    console.log("Error occurred while finding dietitians:"+error);   
       
   }
   
});

router.get('/myUsers', authDietitianMiddleware, async (req,res,next) => {
    
    try {
        allUsers = await DietList.find({dietitian:req.dietitian._id});
          res.json(allUsers);
          
           
       } catch (error) {
        console.log("Error occurred while finding users:",error);   
           
       }
       
   
});

router.get('/me', authDietitianMiddleware, (req,res,next) => {
    res.json(req.dietitian);

   
});


router.patch('/me', authDietitianMiddleware, async (req,res,next) => {
    
    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password,5);
        
    } 
    const {error,value}=Dietitian.joiValidationforUpdate(req.body);
    if (error) {
        next(error);
        
    } else {
        try {
        const result = await Dietitian.findByIdAndUpdate({_id : req.dietitian._id},req.body,{new:true});
        if (result) {
            return res.json( {message: "Dietitian updated"});
        } else {
            return res.status().json({message: "Dietitian could not updated"});
        }
        } catch (error) {
            next(error);
            console.log("Error occurred while updating dietitian:"+error);
        }
    }

   
});

router.get('/:id', async (req,res) => {

    try {
     const Dietitian = await Dietitian.find({_id : req.params.id});
     res.json(Dietitian);
        
    } catch (error) {
     console.log("Error occurred while finding dietitian:"+error);   
        
    }
    
 });


 router.post('/login', async (req,res,next) => {
    
    try {
        const dietitian = await Dietitian.login(req.body.email,req.body.password);
        const token = await dietitian.generateToken();
        res.json({
            dietitian:dietitian,
            token:token});

    } catch (error) {
        next(error);
        console.log("Error occurred while login:"+error);   
    }
    
});

router.post('/', async (req,res,next) => {
    
    try {
        const saveDietitian = new Dietitian(req.body);

        saveDietitian.password = await bcrypt.hash(saveDietitian.password,5);

       const {error,result} = saveDietitian.joiValidation(req.body);
       if (error) {
        next(error);
        console.log("Error occurred while registering dietitian:"+error); 
           
       } else {
          const result = await saveDietitian.save(); 
          res.json(result);
       }
        
    } catch (error) {
        next(error);
        console.log("Error occurred while registering dietitian:"+error);   
    }
    

});

router.delete('/:id', async (req,res,next) =>{

    try {
        const result = await Dietitian.findByIdAndDelete({_id : req.params.id});
        if (result) {
            return res.json( {message: "Dietitian deleted"});
        } else {
            throw new Error("Dietitian not found");
        }
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req,res,next) =>{

    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password,5);
        
    } 
    const {error,value}=Dietitian.joiValidationforUpdate(req.body);
    if (error) {
        next(error);
        
    } else {
        try {
        const result = await Dietitian.findByIdAndUpdate({_id : req.params.id},req.body,{new:true});
        if (result) {
            return res.json( {message: "Dietitian updated"});
        } else {
            return res.status().json({message: "Dietitian could not updated"});
        }
        } catch (error) {
            next(error);
            console.log("Error occurred while updating dietitian:"+error);
        }
    }
    
});



module.exports = router;

