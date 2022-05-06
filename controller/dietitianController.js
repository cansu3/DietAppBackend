const Dietitian = require('../model/dietitianModel');
const DietList = require('../model/dietListModel');
const bcrypt = require('bcrypt');

const getDietitian =  async (req,res) => {

    try {
     const findDietitian = await Dietitian.findOne({username : req.params.username});
     res.json(findDietitian);
     //res.json(dietitian:findDietitian,birth:findDietitian.birthday.toDateString());
        
    } catch (error) {
     console.log("Error occurred while finding user:"+error);   
        
    }
    
};

module.exports = {
    getDietitian,
}