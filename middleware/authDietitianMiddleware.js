const jwt = require('jsonwebtoken');
const Dietitian=require('../model/dietitianModel');


    const authDietitian = async(req,res,next)=>{
   try {
        const authHeader = req.get('Authorization'); 
        const token = authHeader.replace('Bearer ', ''); 
        const payload = jwt.verify(token, 'secretkey');
        console.log("result:",payload);

       // req.user=payload;
        req.dietitian = await Dietitian.findById({_id:payload._id});

        next();
        }
    
  catch (error) {

  console.log(error);
    next(error);
  }
}


module.exports = authDietitian;