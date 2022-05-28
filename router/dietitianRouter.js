const router = require('express').Router();
const Dietitian = require('../model/dietitianModel');
const DietList = require('../model/dietListModel');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');
const dietitianController= require('../controller/dietitianController');
const jwt = require('jsonwebtoken');
var CodeGenerator = require('node-code-generator');
const nodemailer = require('nodemailer');
const { error } = require('@hapi/joi/lib/base');

router.get('/getDietitian/:username',dietitianController.getDietitian);

router.get('/', async (req,res) => {

   try {
    const allDietitians = await Dietitian.find({});
    res.json(allDietitians);

       
   } catch (error) {
    console.log("Error occurred while finding dietitians:"+error);   
       
   }
   
});

router.get('/forgotPassword/:email', async (req,res,next) => {
    
    try {
        const findDietitian=await Dietitian.findOne({email:req.params.email});
    

        if (findDietitian) {

             
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
          

          const {error,value}=Dietitian.joiValidationforUpdate({password:newCode});
          if (error) {
              next(error);
              
          }

          const result=await Dietitian.findByIdAndUpdate({_id : findDietitian._id},{password:newCode},{new:true});

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

router.get('/myUsers', authDietitianMiddleware, async (req,res,next) => {
     
    try {
        allLists = await DietList.find({dietitian:req.dietitian._id});

       // const findUser=Object;
        const users = new Array();

    for (let i in allLists) {
       const findUser=await User.findById({_id:allLists[i].user});

        users.push(findUser);
      }
          res.json(users);
          
           
       } catch (error) {
        console.log("Error occurred while finding users:",error);   
           
       }
       
   
});

router.get('/me', authDietitianMiddleware, async (req,res,next) => {
    const findDietitian = await Dietitian.findById({_id : req.dietitian._id});
    res.json({name:findDietitian.name,
        surname:findDietitian.surname,
        birthday:findDietitian.birthday.toDateString(),
        username:findDietitian.username,
        email:findDietitian.email,
        gender:findDietitian.gender,
        bio:findDietitian.bio});
   
});
 
router.get('/findDietitian/:username', authDietitianMiddleware, async (req,res,next) => {
    const findDietitian = await Dietitian.findOne({username : req.params.username});
    res.json(findDietitian);
   
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

router.get('/logout', authDietitianMiddleware, async (req,res,next) => {
    
    try {
  
        const token = await jwt.sign({_id:req.dietitian._id,email:req.dietitian.email},'secretkey',{expiresIn:'1'});
      
        res.json({token:token});

    } catch (error) {
        next(error);
        console.log("Error occurred while logout:"+error);   
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


