const router = require('express').Router();
const User = require('../model/userModel');
const Weight = require('../model/weightModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const authDietitianMiddleware = require('../middleware/authDietitianMiddleware');

router.post('/', authMiddleware, async (req,res,next) => {
try {
    const saveWeight = new Weight(req.body);
    saveWeight.user=req.user._id;
    const result = await saveWeight.save(); 
    res.json(saveWeight);   
    
} catch (error) {
    next(error);
    console.log("Error occurred while adding weight:"+error);   
}


});

router.get('/', authMiddleware,  async (req,res,next) => {

    let today = new Date();
    let lastYear = new Date();
   // const day = parseInt(today.getFullYear().toString())-1;
    lastYear.setFullYear(parseInt(today.getFullYear().toString())-1);
    lastYear.setMonth(parseInt(today.getMonth().toString())+1);
    //console.log(typeof(day));
    const month = today.toLocaleString('default', { month: 'short' });
    console.log(month);
    console.log(today.toDateString());
    console.log(lastYear.getFullYear());
    try {
    const allWeights = await Weight.find({user:req.user._id,date: { $gte: lastYear, $lte: today } }).sort({ date: 1 });

     let counter=0;
     let sumweights=0;
     let weight=0;
     let newDate=new Date();
     const weights = new Array();
     const months = new Array();
     let sumweights2=0;


    for (let i = 0; i < allWeights.length; i++) {

        weight=allWeights[i].weight;
    
        if (allWeights[i+1] && allWeights[i].date.getMonth()===allWeights[i+1].date.getMonth()) {
            sumweights=sumweights+weight;
            counter ++;
        }
        else {
            if (counter>0) {
                
                sumweights=sumweights+weight;
                counter ++;
                weights.push(sumweights/counter);
                months.push(allWeights[i].date.toLocaleString('default', { month: 'short' }));
                sumweights2=sumweights/counter
                counter=0;
                sumweights=0;
                
            }
            if (allWeights[i+1] && !(((allWeights[i].date.getMonth()%12)+1)===(allWeights[i+1].date.getMonth()))) {
                
                newDate=allWeights[i].date;
                if (sumweights2>0) {
                     weights.pop();
                     months.pop();
                     weight=sumweights2;
                     sumweights2=0;
                }

                    while (!((newDate.getMonth())===allWeights[i+1].date.getMonth())) {

                        weights.push(weight);
                        months.push(newDate.toLocaleString('default', { month: 'short' }));

                        newDate.setMonth((parseInt(newDate.getMonth().toString())%12)+1);
                    }
                    
                
            }
            else if(sumweights2==0){
                weights.push(weight);
                months.push(allWeights[i].date.toLocaleString('default', { month: 'short' }));
            }
        }    
    } 
       
   
 

       console.log(sumweights);
       console.log(weights);
       console.log(months);
           

     //res.json({weights:weights,months:months});
     res.json(allWeights);
        
    } catch (error) {
        next(error);
     console.log("Error occurred while finding weights:"+error);   
        
    }
    
 });

module.exports = router;