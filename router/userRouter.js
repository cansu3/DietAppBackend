const router = require('express').Router();
const User = require('../model/userModel');
const DietList = require('../model/dietListModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');
const userController= require('../controller/userController');
const jwt = require('jsonwebtoken');
var CodeGenerator = require('node-code-generator');
const nodemailer = require('nodemailer');
const { error } = require('@hapi/joi/lib/base');



router.get('/',userController.getAllUsers);

 router.get('/me', authMiddleware, userController.getMyProfileInfo);

 router.get('/getUser/:username',userController.getUser);

 router.patch('/me', authMiddleware, userController.updateMyProfile);

router.post('/requestDietPlan/:username',authMiddleware, async (req,res,next) => {
    
    try {
       

    } catch (error) {
        next(error);
        console.log("Error occurred while login:"+error);   
    }
    
});

router.get('/forgotPassword/:email', async (req,res,next) => {
    
    try {
        const findUser=await User.findOne({email:req.params.email});
    

        if (findUser) {

             
        var generator = new CodeGenerator();
        var pattern = '#';
        var howMany = 6;

        var codes = generator.generateCodes(pattern, howMany);
        var code=codes[0]+codes[1]+codes[2]+codes[3]+codes[4]+codes[5];
        console.log(code);


        let transporter= nodemailer.createTransport({
           
            host:'smtp.host.com',
            port: '5000',
            service:'gmail',
            auth:{
                user:'diettracker.00@gmail.com',
                pass:'diettracker00.'
            }
        });

        let mailOptions=({
            from:'diettracker.00@gmail.com',
            to:req.params.email,
            subject:'Forgot Password',
            text:'Hello, we have received the password reset instruction. Here is your one-time code: '+code+' You can login with this code and then update your password in the settings section.'
        });

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          const newCode=await bcrypt.hash(code,5);
          console.log(newCode);
          

          const {error,value}=User.joiValidationforUpdate({password:newCode});
          if (error) {
              next(error);
              
          }

          const result=await User.findByIdAndUpdate({_id : findUser._id},{password:newCode},{new:true});

          if (result) {
              res.json({message:"succesfull"});
              
          }

            
            
        } else {
            res.json({message:"error accured"})
            
        }
      
    } catch (error) {
        next(error);
        console.log("Error occurred while login:"+error);   
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

router.get('/logout', authMiddleware ,async (req,res,next) => {
    
    try {
        //const findUser = await findOne({_id:req.user._id})
  
        const token = await jwt.sign({_id:req.user._id,email:req.user.email},'secretkey',{expiresIn:'1'});
        res.json({token:token});

    } catch (error) {
        next(error);
        console.log("Error occurred while logout:"+error);   
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
          res.json({message:"Your account has been successfully created"});
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




