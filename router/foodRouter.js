const router = require('express').Router();
const food = require('../model/foodModel');

router.get('/:name', async (req,res) => {

    try {
     const findFood = await food.findOne({name : req.params.name});
     res.json(findFood);
        
    } catch (error) {
     console.log("Error occurred while finding food:"+error);   
        
    }
    
 });


 
 router.post('/', async (req,res,next) => {
    
    try {
        const addFood = new food(req.body);
        const result = await addFood.save(); 
        res.json(result);

    } catch (error) {
        next(error);
        console.log("Error occurred while add food:"+error);   
    }
    
});

 module.exports = router;