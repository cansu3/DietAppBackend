const Dietitian = require('../model/dietitianModel');
const DietList = require('../model/dietListModel');
const bcrypt = require('bcrypt');

const getDietitian =  async (req,res) => {

    try {
     const findDietitian = await Dietitian.findOne({username : req.params.username});

     if(findDietitian.birthday){
        res.json({name:findDietitian.name,
                surname:findDietitian.surname,
                birthday:findDietitian.birthday.toDateString(),
                username:findDietitian.username,
                email:findDietitian.email,
                gender:findDietitian.gender,
                bio:findDietitian.bio});

     }else{
        res.json({name:findDietitian.name,
            surname:findDietitian.surname,
            username:findDietitian.username,
            email:findDietitian.email,
            gender:findDietitian.gender,
            bio:findDietitian.bio});
     }
     
        
    } catch (error) {
     console.log("Error occurred while finding user:"+error);   
        
    }
    
};

module.exports = {
    getDietitian,
}