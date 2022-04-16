const jwt = require('jsonwebtoken');
const User=require('../model/userModel');


    const auth = async(req,res,next)=>{
   try {
        const authHeader = req.get('Authorization'); 
        const token = authHeader.replace('Bearer ', ''); 
        const payload = jwt.verify(token, 'secretkey');
        console.log("result:",payload);

       // req.user=payload;
        req.user = await User.findById({_id:payload._id});

        next();
        }
    
  catch (error) {

  console.log(error);
    next(error);
  }
}


module.exports = auth;