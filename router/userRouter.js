const router = require('express').Router();
const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const DietList = require('../model/dietListModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');

router.get('/', async (req,res) => {

   try {
    const allUsers = await User.find({});
    res.json(allUsers);
       
   } catch (error) {
    console.log("Error occurred while finding users:"+error);   
       
   }
   
});

//router.get('/:id', async (req,res) => {

   // try {
   //  const findUser = await User.find({_id : req.params.id});
    // res.json(findUser);
        
    //} catch (error) {
     //console.log("Error occurred while finding user:"+error);   
        
    //}
    
 //});

 router.get('/me', authMiddleware, (req,res,next) => {
     res.json(req.user);

    
 });

 router.get('/myUsers', authDietitianMiddleware, async (req,res,next) => {
    
    try {
        allUsers = await UserProfile.find({dietitian:req.dietitian._id});
          res.json(allUsers);
          
           
       } catch (error) {
        console.log("Error occurred while finding users:",error);   
           
       }
       
   
});


 router.patch('/me', authMiddleware, async (req,res,next) => {
    
    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password,5);
        
    } 
    const {error,value}=User.joiValidationforUpdate(req.body);
    if (error) {
        next(error);
        
    } else {
        try {
        const result = await User.findByIdAndUpdate({_id : req.user._id},req.body,{new:true});
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

   
});


 router.post('/login', async (req,res,next) => {
    
    try {
        const user = await User.login(req.body.email,req.body.password);
        const token = await user.generateToken();
        res.json({
            user:user,
            token:token});

    } catch (error) {
        next(error);
        console.log("Error occurred while login:"+error);   
    }
    
});

router.post('/', async (req,res,next) => {
    
    try {
        const saveUser = new User(req.body);

        saveUser.password = await bcrypt.hash(saveUser.password,5);

       const {error,result} = saveUser.joiValidation(req.body);
       if (error) {
        next(error);
        console.log("Error occurred while registering user:"+error); 
           
       } else {
          const result = await saveUser.save(); 
          res.json(result);
       }
        
    } catch (error) {
        next(error);
        console.log("Error occurred while registering user:"+error);   
    }
    

});

router.delete('/:id', async (req,res,next) =>{

    try {
        const result = await User.findByIdAndDelete({_id : req.params.id});
        if (result) {
            return res.json( {message: "User deleted"});
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
       // console.log("Error occurred while deleting user:"+error);
        next(error);
    }
});

router.patch('/:id', async (req,res,next) =>{

    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password,5);
        
    } 
    const {error,value}=User.joiValidationforUpdate(req.body);
    if (error) {
        next(error);
        
    } else {
        try {
        const result = await User.findByIdAndUpdate({_id : req.params.id},req.body,{new:true});
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
    
});



module.exports = router;




